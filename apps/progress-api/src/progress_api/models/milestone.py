"""MilestoneCompletion model."""

from datetime import datetime

import sqlalchemy as sa
from sqlmodel import Column, DateTime, Field, SQLModel, text


class MilestoneCompletion(SQLModel, table=True):
    __tablename__ = "milestone_completions"

    user_id: str = Field(sa_column=Column(sa.String, sa.ForeignKey("users.id"), primary_key=True))
    milestone_slug: str = Field(sa_column=Column(sa.String, primary_key=True))
    xp_earned: int = Field(default=20)
    completed_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=text("NOW()"))
    )
