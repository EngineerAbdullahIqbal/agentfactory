"""Flashcard completion request/response schemas."""

from pydantic import BaseModel, Field, model_validator

from .quiz import BadgeEarned, StreakInfo


class FlashcardCompleteRequest(BaseModel):
    """Request body for POST /api/v1/flashcard/complete."""

    deck_id: str = Field(min_length=1)
    chapter_slug: str = Field(min_length=1)
    cards_correct: int = Field(ge=0)
    cards_total: int = Field(ge=1)

    @model_validator(mode="after")
    def correct_lte_total(self) -> "FlashcardCompleteRequest":
        if self.cards_correct > self.cards_total:
            msg = "cards_correct cannot exceed cards_total"
            raise ValueError(msg)
        return self


class FlashcardCompleteResponse(BaseModel):
    """Response body for POST /api/v1/flashcard/complete."""

    xp_earned: int
    total_xp: int
    is_first_completion: bool
    score_pct: int
    streak: StreakInfo
    new_badges: list[BadgeEarned]
