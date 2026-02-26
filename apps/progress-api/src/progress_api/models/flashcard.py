"""FlashcardCompletion model."""

from datetime import datetime
from typing import Optional

import sqlalchemy as sa
from sqlmodel import Column, DateTime, Field, Relationship, SQLModel, text


class FlashcardCompletion(SQLModel, table=True):
    __tablename__ = "flashcard_completions"
    __table_args__ = (
        sa.Index("ix_flashcard_completions_user_deck", "user_id", "deck_id"),
    )

    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id")
    deck_id: str = Field(max_length=100)
    chapter_slug: str = Field(max_length=200)
    score_pct: int
    cards_correct: int
    cards_total: int
    xp_earned: int = Field(default=0)
    is_first: bool = Field(default=False)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=text("NOW()"))
    )

    # Relationship
    user: Optional["User"] = Relationship(back_populates="flashcard_completions")  # noqa: F821
