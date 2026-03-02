"""Profile completeness scoring service.

Two separate metrics:
1. onboarding_progress — user actions only (completed phases / total phases)
2. profile_completeness — personalization readiness (weighted by provenance)

SECTION_FIELDS contains only high-signal fields that directly change content
personalization output. Low-signal fields (subject_specific.*, format_notes,
color_blind_safe, etc.) still exist in the schema and can be filled via the
profile settings page, but they don't count toward the completeness metric.

Rationale: Users who complete onboarding should see ~50-60% completeness
(they did real work), not 26% (diluted by 20+ niche optional fields).
See ADR in specs/anchored/learner-profile/adrs/ for the full decision record.
"""

from ..schemas.profile import ONBOARDING_PHASES

# Section weights for profile_completeness (sum = 1.0)
SECTION_WEIGHTS: dict[str, float] = {
    "expertise": 0.25,
    "goals": 0.20,
    "professional_context": 0.20,
    "communication": 0.15,
    "delivery": 0.10,
    "accessibility": 0.10,
}

# Provenance contribution weights
SOURCE_WEIGHTS: dict[str, float] = {
    "user": 1.0,
    "phm": 0.8,
    "inferred": 0.5,
    "default": 0.0,
}

# High-signal fields per section for completeness scoring.
# Only fields that directly change content personalization output.
# See learner_profile_schema.md "How this drives personalization" for evidence.
SECTION_FIELDS: dict[str, list[str]] = {
    "expertise": [
        # Controls code depth, vocabulary calibration, concept definitions
        "expertise.programming.level",
        "expertise.programming.languages",
        "expertise.ai_fluency.level",
        "expertise.business.level",
    ],
    "goals": [
        # Controls anchoring, pacing, section emphasis
        "goals.primary_learning_goal",
        "goals.urgency",
        "goals.career_goal",
    ],
    "professional_context": [
        # Controls example grounding, analogy source, integration examples
        "professional_context.current_role",
        "professional_context.industry",
        "professional_context.tools_in_use",
    ],
    "communication": [
        # Controls vocabulary register, structure, detail level, tone
        "communication.language_complexity",
        "communication.preferred_structure",
        "communication.verbosity",
        "communication.tone",
        "communication.wants_summaries",
    ],
    "delivery": [
        # Controls output format, code annotation depth, language
        "delivery.output_format",
        "delivery.code_verbosity",
        "delivery.language",
        "delivery.native_language",
        "delivery.preferred_code_language",
    ],
    "accessibility": [
        # Controls content density and alt-text inclusion
        "accessibility.cognitive_load_preference",
        "accessibility.screen_reader",
    ],
}

# Highest-impact fields ordered by priority (must be subset of SECTION_FIELDS)
IMPACT_PRIORITY: list[str] = [
    "goals.primary_learning_goal",
    "expertise.programming.level",
    "expertise.ai_fluency.level",
    "professional_context.current_role",
    "professional_context.industry",
    "expertise.business.level",
    "goals.urgency",
    "goals.career_goal",
    "communication.language_complexity",
    "communication.verbosity",
    "communication.tone",
    "delivery.code_verbosity",
    "delivery.native_language",
    "professional_context.tools_in_use",
    "accessibility.cognitive_load_preference",
    "accessibility.screen_reader",
]


def compute_onboarding_progress(
    sections_completed: dict[str, bool],
) -> float:
    """Compute onboarding progress as completed phases / total phases.

    Returns 0.0-1.0.
    """
    total = len(ONBOARDING_PHASES)
    completed = sum(1 for phase in ONBOARDING_PHASES if sections_completed.get(phase, False))
    return completed / total if total > 0 else 0.0


def compute_profile_completeness(
    field_sources: dict[str, str],
) -> tuple[float, dict[str, float]]:
    """Compute profile completeness weighted by provenance.

    Returns (overall_completeness, per_section_completeness).
    """
    per_section: dict[str, float] = {}

    for section_name, fields in SECTION_FIELDS.items():
        if not fields:
            per_section[section_name] = 0.0
            continue

        total_contribution = 0.0
        for field_path in fields:
            source = field_sources.get(field_path, "default")
            total_contribution += SOURCE_WEIGHTS.get(source, 0.0)

        per_section[section_name] = total_contribution / len(fields)

    # Overall = weighted sum of section scores
    overall = sum(
        per_section.get(section, 0.0) * weight
        for section, weight in SECTION_WEIGHTS.items()
    )

    return overall, per_section


def compute_highest_impact_missing(
    field_sources: dict[str, str],
    max_items: int = 5,
) -> list[str]:
    """Return up to max_items field paths that are still default-sourced, ordered by impact."""
    missing = []
    for field_path in IMPACT_PRIORITY:
        if field_path not in field_sources:
            missing.append(field_path)
            if len(missing) >= max_items:
                break
    return missing
