"""Milestone completion service — concurrency-safe via INSERT RETURNING."""

import asyncio
import logging
from datetime import date

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import CurrentUser
from ..schemas.milestone import MilestoneCompleteRequest, MilestoneCompleteResponse
from ..schemas.quiz import StreakInfo
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

MILESTONE_XP = 20


async def complete_milestone(
    session: AsyncSession,
    user: CurrentUser,
    request: MilestoneCompleteRequest,
) -> MilestoneCompleteResponse:
    """Mark a milestone as complete (idempotent, concurrency-safe).

    Uses INSERT ... ON CONFLICT DO NOTHING RETURNING * to atomically
    detect duplicates — avoids the SELECT-then-INSERT race condition.
    """
    today = date.today()

    # 1. UPSERT user
    await upsert_user_from_jwt(session, user)

    # 2. Atomic INSERT with ON CONFLICT DO NOTHING RETURNING *
    result = await session.execute(
        text(
            "INSERT INTO milestone_completions (user_id, milestone_slug, xp_earned)"
            " VALUES (:user_id, :milestone_slug, :xp_earned)"
            " ON CONFLICT (user_id, milestone_slug) DO NOTHING"
            " RETURNING *"
        ),
        {
            "user_id": user.id,
            "milestone_slug": request.milestone_slug,
            "xp_earned": MILESTONE_XP,
        },
    )
    row = result.first()

    if row is None:
        # Already completed — no XP awarded
        xp_earned = 0
        already_completed = True
    else:
        # New completion
        xp_earned = MILESTONE_XP
        already_completed = False

    # 3. Record activity day (always, for analytics)
    await record_activity_day(session, user.id, today, "milestone", request.milestone_slug)

    # 4. Calculate streak
    activity_dates = await get_activity_dates(session, user.id)
    if today not in activity_dates:
        activity_dates.append(today)
    current_streak, longest_streak = calculate_streak(activity_dates, today=today)

    # 5. Update user progress
    await update_user_progress(
        session,
        user.id,
        xp_delta=xp_earned,
        current_streak=current_streak,
        longest_streak=longest_streak,
        last_activity_date=today,
    )

    # 6. Commit
    await session.commit()

    # 7. Invalidate cache + refresh leaderboard
    await invalidate_user_cache(user.id)
    if xp_earned > 0:
        asyncio.create_task(debounced_refresh_leaderboard())

    # Get updated total_xp
    total_xp_result = await session.execute(
        text("SELECT total_xp FROM user_progress WHERE user_id = :user_id"),
        {"user_id": user.id},
    )
    total_xp_row = total_xp_result.first()
    total_xp = total_xp_row.total_xp if total_xp_row else 0

    return MilestoneCompleteResponse(
        xp_earned=xp_earned,
        total_xp=total_xp,
        streak=StreakInfo(current=current_streak, longest=longest_streak),
        already_completed=already_completed,
    )
