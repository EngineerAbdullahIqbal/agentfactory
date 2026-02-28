"""Shared provenance constants and helpers for field-source priority checks."""

# Source priority (higher number = higher priority)
SOURCE_PRIORITY: dict[str, int] = {
    "default": 1,
    "inferred": 2,
    "phm": 3,
    "user": 4,
}

EXPERTISE_LEVEL_ORDER = ["none", "beginner", "intermediate", "advanced", "expert"]


def can_override(current_source: str, new_source: str) -> bool:
    """Check if new_source can override current_source based on provenance priority."""
    return SOURCE_PRIORITY.get(new_source, 0) >= SOURCE_PRIORITY.get(current_source, 0)


def expertise_level_idx(level: str) -> int:
    """Return the index of an expertise level, defaulting to 0 for unknown levels."""
    try:
        return EXPERTISE_LEVEL_ORDER.index(level)
    except ValueError:
        return 0
