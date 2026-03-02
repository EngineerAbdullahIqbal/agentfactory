"""Milestone completion service — concurrency-safe via INSERT RETURNING."""

import asyncio
from datetime import date

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import CurrentUser
from ..models.progress import UserProgress
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
        # Already completed — return without modifying anything
        # Still calculate current streak for the response
        activity_dates = await get_activity_dates(session, user.id)
        current_streak, longest_streak = calculate_streak(activity_dates, today=today)

        result_prog = await session.execute(
            select(UserProgress.total_xp).where(UserProgress.user_id == user.id)
        )
        total_xp = result_prog.scalar_one_or_none() or 0

        return MilestoneCompleteResponse(
            xp_earned=0,
            total_xp=total_xp,
            streak=StreakInfo(current=current_streak, longest=longest_streak),
            already_completed=True,
        )

    # 3. Record activity day
    await record_activity_day(session, user.id, today, "milestone", request.milestone_slug)

    # 4. Calculate streak
    activity_dates = await get_activity_dates(session, user.id)
    if today not in activity_dates:
        activity_dates.append(today)
    current_streak, longest_streak = calculate_streak(activity_dates, today=today)

    # 5. Update user progress
    progress = await update_user_progress(
        session,
        user.id,
        xp_delta=MILESTONE_XP,
        current_streak=current_streak,
        longest_streak=longest_streak,
        last_activity_date=today,
    )

    # 6. Commit
    await session.commit()

    # 7. Invalidate cache + refresh leaderboard
    await invalidate_user_cache(user.id)
    asyncio.create_task(debounced_refresh_leaderboard())

    return MilestoneCompleteResponse(
        xp_earned=MILESTONE_XP,
        total_xp=progress.total_xp,
        streak=StreakInfo(current=current_streak, longest=longest_streak),
        already_completed=False,
    )
