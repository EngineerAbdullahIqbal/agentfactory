"""Pydantic models for content API endpoints."""

from typing import Any, Literal

from pydantic import BaseModel, Field


class LessonMeta(BaseModel):
    """Metadata for a single lesson in the book tree."""

    slug: str
    title: str
    sidebar_position: int = 0
    has_exercise: bool = False
    path: str = ""  # Full path relative to docs root (e.g., "01-Part/02-chapter/03-sub/04-lesson")


class ChapterMeta(BaseModel):
    """Metadata for a chapter containing lessons."""

    slug: str
    title: str
    lessons: list[LessonMeta] = Field(default_factory=list)


class PartMeta(BaseModel):
    """Metadata for a part (top-level section) containing chapters."""

    slug: str
    title: str
    chapters: list[ChapterMeta] = Field(default_factory=list)


class BookTreeResponse(BaseModel):
    """Full book tree structure returned by GET /tree."""

    version: str = "1"
    parts: list[PartMeta] = Field(default_factory=list)
    total_lessons: int = 0
    total_chapters: int = 0


class LessonFrontmatter(BaseModel):
    """Parsed YAML frontmatter from a lesson file.

    Skills and learning_objectives are complex structured types in the
    source YAML (lists of dicts with proficiency_level, bloom_level, etc.).
    We accept Any to avoid losing data through schema coercion.

    Extra fields (chapter, lesson, differentiation, teaching_guide, etc.)
    are passed through via model_config extra="allow".
    """

    model_config = {"extra": "allow"}

    title: str = ""
    description: str = ""
    sidebar_position: int = 0
    skills: list[Any] = Field(default_factory=list)
    learning_objectives: list[Any] = Field(default_factory=list)
    cognitive_load: Any = ""
    practice_exercise: str | None = None
    hide_table_of_contents: bool = False
    keywords: list[str] = Field(default_factory=list)
    duration_minutes: int = 0


class LessonContentResponse(BaseModel):
    """Full lesson content returned by GET /lesson."""

    chapter_slug: str
    lesson_slug: str
    content: str
    frontmatter: LessonFrontmatter
    credit_charged: bool = False


class CompleteRequest(BaseModel):
    """Request body for POST /complete."""

    chapter_slug: str
    lesson_slug: str
    active_duration_secs: int = Field(ge=0, default=0)
    source: Literal["platform", "skill"] = "platform"


class CompleteResponse(BaseModel):
    """Response for POST /complete."""

    completed: bool = True
    xp_earned: int = 0


class ProgressResponse(BaseModel):
    """Response for GET /progress — passthrough from progress-api."""

    progress: dict = Field(default_factory=dict)
    total_lessons: int = 0
