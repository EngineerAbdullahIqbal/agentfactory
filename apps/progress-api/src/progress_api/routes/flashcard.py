"""Flashcard completion endpoint."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.auth import CurrentUser, get_current_user
from ..core.database import get_session
from ..schemas.flashcard import FlashcardCompleteRequest, FlashcardCompleteResponse
from ..services.flashcard import complete_flashcard_session

router = APIRouter()


@router.post("/flashcard/complete", response_model=FlashcardCompleteResponse)
async def flashcard_complete(
    request: FlashcardCompleteRequest,
    user: CurrentUser = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> FlashcardCompleteResponse:
    """Record a flashcard session completion.

    Awards XP on first unique deck completion, grants streak credit
    on all completions, and evaluates flashcard badges.
    """
    return await complete_flashcard_session(session, user, request)
