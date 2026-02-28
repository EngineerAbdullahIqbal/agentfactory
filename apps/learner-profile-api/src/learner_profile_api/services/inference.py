"""Inference engine for deriving communication/delivery preferences from expertise.

v1.2: Two-axis model (technical x professional) replaces single max-level approach.
User-set values ALWAYS override inferences.
Inference only runs when at least one expertise field has user or phm source.
"""

import logging

from ..schemas.profile import ExpertiseSection
from .provenance import EXPERTISE_LEVEL_ORDER, can_override

logger = logging.getLogger(__name__)


def _get_technical_level(expertise: ExpertiseSection) -> str:
    """max(programming, ai_fluency)"""
    levels = [expertise.programming.level, expertise.ai_fluency.level]
    max_idx = max(
        EXPERTISE_LEVEL_ORDER.index(l) if l in EXPERTISE_LEVEL_ORDER else 0
        for l in levels
    )
    return EXPERTISE_LEVEL_ORDER[max_idx]


def _get_professional_level(expertise: ExpertiseSection) -> str:
    """max(business, primary domain)"""
    levels = [expertise.business.level]
    for domain in expertise.domain:
        if domain.is_primary:
            levels.append(domain.level)
            break
    else:
        levels.append("none")
    max_idx = max(
        EXPERTISE_LEVEL_ORDER.index(l) if l in EXPERTISE_LEVEL_ORDER else 0
        for l in levels
    )
    return EXPERTISE_LEVEL_ORDER[max_idx]


def _bucket(level: str) -> str:
    """Bucket expertise into low/intermediate/advanced+"""
    idx = EXPERTISE_LEVEL_ORDER.index(level) if level in EXPERTISE_LEVEL_ORDER else 0
    if idx <= 1:
        return "low"
    if idx == 2:
        return "intermediate"
    return "advanced+"


def _infer_comms(tech: str, prof: str) -> dict[str, str]:
    """Two-axis communication inference."""
    t = _bucket(tech)
    p = _bucket(prof)

    if t == "advanced+" and p != "low":
        return {"language_complexity": "technical", "tone": "peer-to-peer", "verbosity": "concise"}
    if t == "advanced+" and p == "low":
        return {"language_complexity": "technical", "tone": "conversational", "verbosity": "moderate"}
    if t == "intermediate":
        return {"language_complexity": "professional", "tone": "professional", "verbosity": "moderate"}
    if t == "low" and p != "low":
        return {"language_complexity": "professional", "tone": "professional", "verbosity": "detailed"}
    # both low
    return {"language_complexity": "plain", "tone": "conversational", "verbosity": "detailed"}


def _can_override(current_source: str, new_source: str) -> bool:
    """Check if new_source can override current_source."""
    return can_override(current_source, new_source)


def should_run_inference(field_sources: dict[str, str]) -> bool:
    """Check if inference should run.

    Requires at least one expertise field with user or phm source.
    """
    expertise_fields = [
        "expertise.programming.level",
        "expertise.ai_fluency.level",
        "expertise.business.level",
        "expertise.domain",
    ]
    for field in expertise_fields:
        source = field_sources.get(field, "default")
        if source in ("user", "phm"):
            return True
    return False


def run_inference(
    expertise: ExpertiseSection,
    field_sources: dict[str, str],
) -> tuple[dict[str, str | bool], dict[str, str]]:
    """Run inference rules and return (inferred_values, updated_field_sources).

    Returns only the fields that were actually changed.
    Does NOT modify field_sources in-place.
    """
    if not should_run_inference(field_sources):
        return {}, {}

    tech_level = _get_technical_level(expertise)
    prof_level = _get_professional_level(expertise)
    comms = _infer_comms(tech_level, prof_level)

    changed_values: dict[str, str | bool] = {}
    changed_sources: dict[str, str] = {}

    prog_level = expertise.programming.level
    programming_none = prog_level == "none"

    # Apply communication inferences
    for field_key, inferred_value in comms.items():
        field_path = f"communication.{field_key}"
        current_source = field_sources.get(field_path, "default")
        if _can_override(current_source, "inferred"):
            changed_values[field_path] = inferred_value
            changed_sources[field_path] = "inferred"

    # Code samples: keyed to programming.level only
    if programming_none:
        field_path = "delivery.include_code_samples"
        current_source = field_sources.get(field_path, "default")
        if _can_override(current_source, "inferred"):
            changed_values[field_path] = False
            changed_sources[field_path] = "inferred"
        # code_verbosity is N/A when include_code_samples is false
    else:
        # include_code_samples = True for any programming level > none
        field_path = "delivery.include_code_samples"
        current_source = field_sources.get(field_path, "default")
        if _can_override(current_source, "inferred"):
            changed_values[field_path] = True
            changed_sources[field_path] = "inferred"

        # code_verbosity based on programming level specifically
        code_verb_map = {
            "none": "fully-explained",
            "beginner": "fully-explained",
            "intermediate": "annotated",
            "advanced": "minimal",
            "expert": "minimal",
        }
        code_verb = code_verb_map.get(prog_level, "annotated")
        field_path = "delivery.code_verbosity"
        current_source = field_sources.get(field_path, "default")
        if _can_override(current_source, "inferred"):
            changed_values[field_path] = code_verb
            changed_sources[field_path] = "inferred"

    logger.debug(
        "Inference: tech=%s, prof=%s, programming=%s, changed=%d fields",
        tech_level,
        prof_level,
        prog_level,
        len(changed_values),
    )

    return changed_values, changed_sources
