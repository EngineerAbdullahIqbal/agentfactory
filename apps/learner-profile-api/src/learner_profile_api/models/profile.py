"""SQLModel table models for Learner Profile."""

import uuid
from datetime import UTC, datetime
from typing import Any

from sqlalchemy.dialects.postgresql import JSONB  # dialect-specific, not in SQLModel
from sqlmodel import Column, DateTime, Field, Index, SQLModel, text


def _json_column(server_default: str = "'{}'"):
    """Create a JSONB column that falls back to JSON for SQLite."""
    return Field(
        sa_column=Column(
            JSONB,
            nullable=False,
            server_default=text(server_default),
        )
    )


def _utcnow() -> datetime:
    return datetime.now(UTC)


class LearnerProfile(SQLModel, table=True):
    __tablename__ = "learner_profiles"

    # Identity (relational columns, indexed)
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    learner_id: str = Field(max_length=255, index=True)
    name: str | None = Field(default=None, max_length=255)
    profile_version: str = Field(default="1.1", max_length=10)

    # GDPR
    consent_given: bool = Field(default=False)
    consent_date: datetime | None = Field(
        sa_column=Column(DateTime(timezone=True), nullable=True)
    )

    # Profile Sections (JSONB)
    expertise: dict[str, Any] = _json_column()
    professional_context: dict[str, Any] = _json_column()
    goals: dict[str, Any] = _json_column()
    communication: dict[str, Any] = _json_column()
    delivery: dict[str, Any] = _json_column()
    accessibility: dict[str, Any] = _json_column()

    # Onboarding State
    onboarding_completed: bool = Field(default=False)
    onboarding_sections_completed: dict[str, Any] = _json_column()

    # Field Provenance — tracks source of each field value
    field_sources: dict[str, str] = _json_column()

    # Timestamps
    created_at: datetime = Field(
        default_factory=_utcnow,
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )
    updated_at: datetime = Field(
        default_factory=_utcnow,
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )

    # Soft Delete
    deleted_at: datetime | None = Field(
        sa_column=Column(DateTime(timezone=True), nullable=True)
    )

    __table_args__ = (
        Index("idx_profiles_learner_id", "learner_id", unique=True),
        Index(
            "idx_profiles_not_deleted",
            "learner_id",
            postgresql_where=text("deleted_at IS NULL"),
        ),
    )


class ProfileAuditLog(SQLModel, table=True):
    __tablename__ = "profile_audit_log"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    learner_id: str = Field(max_length=255, index=True)
    action: str = Field(max_length=50)
    changed_sections: list[str] = Field(
        sa_column=Column(JSONB, nullable=False, server_default=text("'[]'"))
    )
    previous_values: dict[str, Any] = _json_column()
    source: str = Field(max_length=50, default="api")
    created_at: datetime = Field(
        default_factory=_utcnow,
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )

    __table_args__ = (
        Index("idx_audit_learner_id", "learner_id", "created_at"),
    )
