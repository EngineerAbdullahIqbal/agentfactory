"""Milestone completion endpoint."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import CurrentUser, get_current_user
from ..core.database import get_session
from ..schemas.milestone import MilestoneCompleteRequest, MilestoneCompleteResponse
from ..services.milestone import complete_milestone

router = APIRouter()


@router.post("/milestone/complete", response_model=MilestoneCompleteResponse)
async def milestone_complete(
    request: MilestoneCompleteRequest,
    user: CurrentUser = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> MilestoneCompleteResponse:
    """Mark a milestone as complete.

    Idempotent — marking the same milestone complete twice returns
    already_completed=true without awarding duplicate XP.
    """
    return await complete_milestone(session, user, request)
