"""Pydantic request/response schemas for Learner Profile API."""

from datetime import datetime
from typing import Annotated, Any, Literal

from pydantic import BaseModel, Field

# === Typed section schemas (shared by request and response) ===

ExpertiseLevel = Literal["none", "beginner", "intermediate", "advanced", "expert"]
FieldSource = Literal["user", "phm", "inferred", "default"]
AuditAction = Literal["created", "updated", "deleted", "restored", "gdpr_erased", "section_updated"]
AuditSource = Literal["api", "onboarding", "phm_sync", "gdpr_erase"]
OnboardingPhase = Literal[
    "goals", "expertise", "professional_context",
    "accessibility", "communication_preferences", "ai_enrichment"
]


class DomainExpertise(BaseModel):
    level: ExpertiseLevel = "beginner"
    domain_name: str | None = Field(None, max_length=100)
    is_primary: bool = False
    notes: str | None = Field(None, max_length=300)


LanguageName = Annotated[str, Field(max_length=50)]


class ProgrammingExpertise(BaseModel):
    level: ExpertiseLevel = "beginner"
    languages: list[LanguageName] = Field(default_factory=list, max_length=10)
    notes: str | None = Field(None, max_length=300)


class AiFluencyExpertise(BaseModel):
    level: ExpertiseLevel = "beginner"
    notes: str | None = Field(None, max_length=300)


class BusinessExpertise(BaseModel):
    level: ExpertiseLevel = "beginner"
    notes: str | None = Field(None, max_length=300)


class MasteredTopic(BaseModel):
    topic: str = Field(max_length=200)
    treatment: Literal["reference", "skip"] = "reference"


class PartialTopic(BaseModel):
    topic: str = Field(max_length=200)
    knowledge_state: str = Field(max_length=300)


class Misconception(BaseModel):
    topic: str = Field(max_length=200)
    misconception: str = Field(max_length=500)


class SubjectSpecific(BaseModel):
    topics_already_mastered: list[MasteredTopic] = Field(
        default_factory=list, max_length=50
    )
    topics_partially_known: list[PartialTopic] = Field(
        default_factory=list, max_length=20
    )
    known_misconceptions: list[Misconception] = Field(
        default_factory=list, max_length=5
    )


class ExpertiseSection(BaseModel):
    domain: list[DomainExpertise] = Field(default_factory=list, max_length=5)
    programming: ProgrammingExpertise = Field(default_factory=ProgrammingExpertise)
    ai_fluency: AiFluencyExpertise = Field(default_factory=AiFluencyExpertise)
    business: BusinessExpertise = Field(default_factory=BusinessExpertise)
    subject_specific: SubjectSpecific = Field(default_factory=SubjectSpecific)


class RealProject(BaseModel):
    project_name: str = Field(max_length=100)
    description: str = Field(max_length=500)


ToolName = Annotated[str, Field(max_length=50)]


class ProfessionalContextSection(BaseModel):
    current_role: str | None = Field(None, max_length=100)
    industry: str | None = Field(None, max_length=100)
    organization_type: str | None = Field(None, max_length=50)
    team_context: str | None = Field(None, max_length=200)
    real_projects: list[RealProject] = Field(default_factory=list, max_length=5)
    tools_in_use: list[ToolName] = Field(default_factory=list, max_length=20)
    constraints: str | None = Field(None, max_length=300)


SecondaryGoal = Annotated[str, Field(max_length=200)]


class GoalsSection(BaseModel):
    primary_learning_goal: str | None = Field(None, max_length=500)
    secondary_goals: list[SecondaryGoal] = Field(default_factory=list, max_length=5)
    urgency: Literal["low", "medium", "high"] | None = None
    urgency_note: str | None = Field(None, max_length=200)
    career_goal: str | None = Field(None, max_length=300)
    immediate_application: str | None = Field(None, max_length=300)


class CommunicationSection(BaseModel):
    language_complexity: Literal["plain", "professional", "technical", "expert"] | None = None
    preferred_structure: Literal[
        "examples-first", "theory-first", "story-narrative",
        "reference-lookup", "problem-first"
    ] | None = None
    verbosity: Literal["concise", "moderate", "detailed"] | None = None
    analogy_domain: str | None = Field(None, max_length=100)
    tone: Literal["formal", "professional", "conversational", "peer-to-peer"] | None = None
    wants_summaries: bool | None = None
    wants_check_in_questions: bool | None = None
    format_notes: str | None = Field(None, max_length=200)


class DeliverySection(BaseModel):
    output_format: Literal["prose", "structured-with-headers", "mixed"] | None = None
    target_length: Literal["short", "medium", "long", "match-source"] | None = None
    include_code_samples: bool | None = None
    code_verbosity: Literal["minimal", "annotated", "fully-explained"] | None = None
    include_visual_descriptions: bool | None = None
    language: str = Field("English", max_length=50)
    language_proficiency: Literal["native", "fluent", "intermediate", "basic"] | None = None
    native_language: str | None = Field(None, max_length=50)
    preferred_code_language: str | None = Field(None, max_length=50)


class AccessibilitySection(BaseModel):
    screen_reader: bool = False
    cognitive_load_preference: Literal["standard", "reduced"] = "standard"
    color_blind_safe: bool = False
    dyslexia_friendly: bool = False
    notes: str | None = Field(None, max_length=300)


# === Request models ===


class ProfileCreate(BaseModel):
    consent_given: bool = False
    name: str | None = Field(None, max_length=255)
    expertise: ExpertiseSection = Field(default_factory=ExpertiseSection)
    professional_context: ProfessionalContextSection = Field(
        default_factory=ProfessionalContextSection
    )
    goals: GoalsSection = Field(default_factory=GoalsSection)
    communication: CommunicationSection = Field(default_factory=CommunicationSection)
    delivery: DeliverySection = Field(default_factory=DeliverySection)
    accessibility: AccessibilitySection = Field(default_factory=AccessibilitySection)


class ProfileUpdate(BaseModel):
    """All fields optional. Only provided fields are updated."""

    name: str | None = Field(None, max_length=255)
    expertise: ExpertiseSection | None = None
    professional_context: ProfessionalContextSection | None = None
    goals: GoalsSection | None = None
    communication: CommunicationSection | None = None
    delivery: DeliverySection | None = None
    accessibility: AccessibilitySection | None = None


# Section update type mapping
SECTION_MODELS: dict[str, type[BaseModel]] = {
    "expertise": ExpertiseSection,
    "professional_context": ProfessionalContextSection,
    "goals": GoalsSection,
    "communication": CommunicationSection,
    "delivery": DeliverySection,
    "accessibility": AccessibilitySection,
}

# Onboarding phase names
ONBOARDING_PHASES: list[OnboardingPhase] = [
    "goals",
    "expertise",
    "professional_context",
    "accessibility",
    "communication_preferences",
    "ai_enrichment",
]


# === Response models ===


class ProfileResponse(BaseModel):
    learner_id: str
    name: str | None
    profile_version: str
    consent_given: bool
    consent_date: datetime | None
    expertise: ExpertiseSection
    professional_context: ProfessionalContextSection
    goals: GoalsSection
    communication: CommunicationSection
    delivery: DeliverySection
    accessibility: AccessibilitySection
    # Intentionally exposed per spec §4 for UX transparency (e.g., "auto-set" badges).
    # The DB schema comment saying "internal only" is superseded by the API spec decision.
    field_sources: dict[str, FieldSource] = Field(default_factory=dict)
    onboarding_completed: bool
    onboarding_sections_completed: dict[str, bool] = Field(default_factory=dict)
    onboarding_progress: Annotated[float, Field(ge=0, le=1)] = 0.0
    profile_completeness: Annotated[float, Field(ge=0, le=1)] = 0.0
    created_at: datetime
    updated_at: datetime


class CompletenessResponse(BaseModel):
    learner_id: str
    profile_completeness: float
    onboarding_progress: float
    per_section: dict[str, float]
    highest_impact_missing: list[str]


class ErrorResponse(BaseModel):
    """Standard error response for all non-2xx responses."""

    error: str
    message: str
    details: dict[str, Any] | None = None
