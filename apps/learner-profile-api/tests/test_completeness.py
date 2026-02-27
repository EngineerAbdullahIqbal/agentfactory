"""Pure-unit tests for the completeness scoring service.

No database or HTTP fixtures required — all functions are pure computations
over dicts.
"""

import pytest

from learner_profile_api.services.completeness import (
    SECTION_FIELDS,
    SECTION_WEIGHTS,
    SOURCE_WEIGHTS,
    compute_highest_impact_missing,
    compute_onboarding_progress,
    compute_profile_completeness,
)

# ---------------------------------------------------------------------------
# compute_onboarding_progress
# ---------------------------------------------------------------------------


class TestOnboardingProgress:
    def test_onboarding_progress_empty(self):
        """No sections completed -> 0.0."""
        result = compute_onboarding_progress({})
        assert result == 0.0

    def test_onboarding_progress_partial(self):
        """2 of 6 phases completed -> 2/6."""
        sections = {"goals": True, "expertise": True}
        result = compute_onboarding_progress(sections)
        assert result == pytest.approx(2 / 6)

    def test_onboarding_progress_full(self):
        """All 6 phases completed -> 1.0."""
        sections = {
            "goals": True,
            "expertise": True,
            "professional_context": True,
            "accessibility": True,
            "communication_preferences": True,
            "ai_enrichment": True,
        }
        result = compute_onboarding_progress(sections)
        assert result == pytest.approx(1.0)


# ---------------------------------------------------------------------------
# compute_profile_completeness
# ---------------------------------------------------------------------------


class TestProfileCompleteness:
    def test_completeness_zero_for_fresh_profile(self):
        """Empty field_sources -> 0.0 overall (everything defaults)."""
        overall, per_section = compute_profile_completeness({})
        assert overall == pytest.approx(0.0)

    def test_completeness_increases_with_user_sources(self):
        """Setting some fields to 'user' makes overall > 0."""
        field_sources = {
            "goals.primary_learning_goal": "user",
            "expertise.programming.level": "user",
        }
        overall, _ = compute_profile_completeness(field_sources)
        assert overall > 0.0

    def test_completeness_phm_less_than_user(self):
        """Same field sourced 'phm' vs 'user' — phm contributes less."""
        user_sources = {"goals.primary_learning_goal": "user"}
        phm_sources = {"goals.primary_learning_goal": "phm"}

        overall_user, _ = compute_profile_completeness(user_sources)
        overall_phm, _ = compute_profile_completeness(phm_sources)

        assert overall_phm < overall_user

    def test_completeness_inferred_contributes_partial(self):
        """'inferred' contributes 0.4 weight per field."""
        field_sources = {"goals.primary_learning_goal": "inferred"}
        _, per_section = compute_profile_completeness(field_sources)

        # goals section has 6 fields; 1 inferred at 0.4 weight
        goals_fields = SECTION_FIELDS["goals"]
        expected = SOURCE_WEIGHTS["inferred"] / len(goals_fields)
        assert per_section["goals"] == pytest.approx(expected)

    def test_per_section_scores(self):
        """per_section dict contains all 6 section keys."""
        _, per_section = compute_profile_completeness({})
        assert set(per_section.keys()) == set(SECTION_WEIGHTS.keys())
        assert len(per_section) == 6


# ---------------------------------------------------------------------------
# compute_highest_impact_missing
# ---------------------------------------------------------------------------


class TestHighestImpactMissing:
    def test_highest_impact_missing_default(self):
        """Empty field_sources -> starts with goals.primary_learning_goal."""
        result = compute_highest_impact_missing({})
        assert len(result) > 0
        assert result[0] == "goals.primary_learning_goal"

    def test_highest_impact_excludes_set_fields(self):
        """Fields already present in field_sources are excluded."""
        field_sources = {
            "goals.primary_learning_goal": "user",
            "expertise.programming.level": "phm",
        }
        result = compute_highest_impact_missing(field_sources)
        assert "goals.primary_learning_goal" not in result
        assert "expertise.programming.level" not in result

    def test_highest_impact_max_5(self):
        """Returns at most 5 items by default."""
        result = compute_highest_impact_missing({})
        assert len(result) <= 5
