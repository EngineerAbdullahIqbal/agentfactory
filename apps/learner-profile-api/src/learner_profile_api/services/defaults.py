"""Appendix B defaults for communication and delivery sections.

Applied at profile creation time (not in Pydantic schemas) to avoid
polluting model_fields_set — defaults should not be tracked as "user" sourced.
"""


def get_communication_defaults() -> dict:
    """Communication section defaults per spec Appendix B."""
    return {
        "language_complexity": "professional",
        "preferred_structure": "examples-first",
        "verbosity": "moderate",
        "analogy_domain": None,
        "tone": "professional",
        "wants_summaries": True,
        "wants_check_in_questions": True,
        "format_notes": None,
    }


def get_delivery_defaults(programming_level: str = "beginner") -> dict:
    """Delivery section defaults per spec Appendix B.

    include_code_samples is conditional on programming.level:
    - "none" → false
    - "beginner" or higher → true

    code_verbosity depends on programming.level:
    - "beginner" → "fully-explained"
    - "intermediate" → "annotated"
    - "advanced"/"expert" → "minimal"
    - "none" → None (N/A)
    """
    include_code = programming_level != "none"

    code_verbosity_map = {
        "none": None,
        "beginner": "fully-explained",
        "intermediate": "annotated",
        "advanced": "minimal",
        "expert": "minimal",
    }

    return {
        "output_format": "structured-with-headers",
        "target_length": "match-source",
        "include_code_samples": include_code,
        "code_verbosity": code_verbosity_map.get(programming_level, "fully-explained"),
        "include_visual_descriptions": False,
        "language": "English",
        "language_proficiency": None,
        "native_language": "en",
        "preferred_code_language": "Python",
    }


def apply_defaults_to_profile_data(
    communication: dict,
    delivery: dict,
    expertise: dict,
    accessibility: dict | None = None,
) -> tuple[dict, dict]:
    """Merge Appendix B defaults into communication and delivery dicts.

    Only fills in fields that are None/missing. Does NOT overwrite
    any value the user explicitly provided.

    Spec Appendix B: include_visual_descriptions defaults to true
    when accessibility.screen_reader is true.
    """
    programming_level = expertise.get("programming", {}).get("level", "beginner")

    comm_defaults = get_communication_defaults()
    for key, default_val in comm_defaults.items():
        if communication.get(key) is None:
            communication[key] = default_val

    delivery_defaults = get_delivery_defaults(programming_level)
    for key, default_val in delivery_defaults.items():
        if delivery.get(key) is None:
            delivery[key] = default_val

    # Conditional default: include_visual_descriptions = true when screen_reader = true
    if accessibility and accessibility.get("screen_reader") is True:
        if delivery.get("include_visual_descriptions") is None or delivery.get("include_visual_descriptions") is False:
            delivery["include_visual_descriptions"] = True

    return communication, delivery
