"""Milestone complete request/response schemas."""

from pydantic import BaseModel, Field, field_validator

from .quiz import StreakInfo


class MilestoneCompleteRequest(BaseModel):
    """Request body for POST /api/v1/milestone/complete."""

    milestone_slug: str = Field(min_length=1)

    @field_validator("milestone_slug")
    @classmethod
    def normalize_slug(cls, v: str) -> str:
        v = v.strip().lower()
        if not v:
            raise ValueError("milestone_slug must not be blank")
        return v


class MilestoneCompleteResponse(BaseModel):
    """Response body for POST /api/v1/milestone/complete."""

    xp_earned: int
    total_xp: int
    streak: StreakInfo
    already_completed: bool
