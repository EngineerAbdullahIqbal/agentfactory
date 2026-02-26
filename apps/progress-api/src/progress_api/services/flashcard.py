"""Flashcard completion service — orchestrates the session completion transaction."""

import asyncio
import logging
from datetime import UTC, date, datetime

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import CurrentUser
from ..models.badge import UserBadge
from ..models.flashcard import FlashcardCompletion
from ..schemas.flashcard import FlashcardCompleteRequest, FlashcardCompleteResponse
from ..schemas.quiz import BadgeEarned, StreakInfo
from ..services.engine.badges import BADGE_DEFINITIONS, evaluate_flashcard_badges
from ..services.engine.streaks import calculate_streak
from .leaderboard import debounced_refresh_leaderboard
from .shared import (
    get_activity_dates,
    invalidate_user_cache,
    record_activity_day,
    update_user_progress,
    upsert_user_from_jwt,
)

logger = logging.getLogger(__name__)


async def complete_flashcard_session(
    session: AsyncSession,
    user: CurrentUser,
    request: FlashcardCompleteRequest,
) -> FlashcardCompleteResponse:
    """Process a flashcard session completion in a single transaction.

    Steps:
    1. UPSERT user from JWT claims
    2. CHECK if first completion of this deck (race-safe with FOR UPDATE)
    3. CALCULATE score, XP, and unique deck count
    4. INSERT flashcard_completion row
    5. UPSERT activity_day
    6. CALCULATE streak
    7. CHECK badge conditions
    8. INSERT new badges
    9. UPDATE user_progress summary (unique decks only)
    10. COMMIT
    """
    today = date.today()

    # 1. UPSERT user
    await upsert_user_from_jwt(session, user)

    # 2. CHECK first completion (lock existing rows for this user+deck)
    result = await session.execute(
        text(
            "SELECT EXISTS("
            "  SELECT 1 FROM flashcard_completions"
            "  WHERE user_id = :uid AND deck_id = :did"
            "  FOR UPDATE"
            ")"
        ),
        {"uid": user.id, "did": request.deck_id},
    )
    has_previous = result.scalar_one()
    is_first = not has_previous

    # 3. CALCULATE score and XP
    score_pct = round(request.cards_correct / request.cards_total * 100)
    xp_earned = round(request.cards_correct / request.cards_total * 50) if is_first else 0

    # 3a. COUNT unique decks BEFORE insert (single query for both badge checks)
    result = await session.execute(
        select(func.count(func.distinct(FlashcardCompletion.deck_id))).where(
            FlashcardCompletion.user_id == user.id
        )
    )
    unique_decks_before = result.scalar_one()
    is_first_deck_ever = unique_decks_before == 0 and is_first
    unique_decks_completed = unique_decks_before + (1 if is_first else 0)

    # 4. INSERT flashcard_completion
    completion = FlashcardCompletion(
        user_id=user.id,
        deck_id=request.deck_id,
        chapter_slug=request.chapter_slug,
        score_pct=score_pct,
        cards_correct=request.cards_correct,
        cards_total=request.cards_total,
        xp_earned=xp_earned,
        is_first=is_first,
    )
    session.add(completion)
    await session.flush()

    # 5. UPSERT activity_day
    await record_activity_day(session, user.id, today, "flashcard", request.deck_id)

    # 6. CALCULATE streak
    activity_dates = await get_activity_dates(session, user.id)
    if today not in activity_dates:
        activity_dates.append(today)
    current_streak, longest_streak = calculate_streak(activity_dates, today=today)

    # 7. CHECK badge conditions
    result = await session.execute(select(UserBadge.badge_id).where(UserBadge.user_id == user.id))
    existing_badge_ids = {row[0] for row in result.all()}

    new_badge_ids = evaluate_flashcard_badges(
        score_pct=score_pct,
        is_first_deck_ever=is_first_deck_ever,
        unique_decks_completed=unique_decks_completed,
        current_streak=current_streak,
        existing_badge_ids=existing_badge_ids,
    )

    # 8. INSERT new badges
    now = datetime.now(UTC)
    new_badges_response: list[BadgeEarned] = []
    for badge_id in new_badge_ids:
        badge = UserBadge(
            user_id=user.id,
            badge_id=badge_id,
            earned_at=now,
            trigger_ref=f"flashcard:{request.deck_id}",
        )
        session.add(badge)
        badge_def = BADGE_DEFINITIONS.get(badge_id)
        new_badges_response.append(
            BadgeEarned(
                id=badge_id,
                name=badge_def.name if badge_def else badge_id,
                earned_at=now,
            )
        )

    # 9. UPDATE user_progress summary (unique decks only)
    progress = await update_user_progress(
        session,
        user.id,
        xp_delta=xp_earned,
        flashcards_delta=1 if is_first else 0,
        badge_count_delta=len(new_badge_ids),
        current_streak=current_streak,
        longest_streak=longest_streak,
        last_activity_date=today,
    )

    # 10. COMMIT
    await session.commit()

    # Invalidate caches
    await invalidate_user_cache(user.id)

    # Refresh leaderboard in background (debounced)
    if xp_earned > 0:
        asyncio.create_task(debounced_refresh_leaderboard())

    return FlashcardCompleteResponse(
        xp_earned=xp_earned,
        total_xp=progress.total_xp,
        is_first_completion=is_first,
        score_pct=score_pct,
        streak=StreakInfo(current=current_streak, longest=longest_streak),
        new_badges=new_badges_response,
    )
