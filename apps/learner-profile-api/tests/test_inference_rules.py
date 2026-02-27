"""Tests for the two-axis inference engine (v1.2).

Pure unit tests — no DB, no client, no fixtures needed beyond schema constructors.
"""

from learner_profile_api.schemas.profile import (
    AiFluencyExpertise,
    BusinessExpertise,
    DomainExpertise,
    ExpertiseSection,
    ProgrammingExpertise,
)
from learner_profile_api.services.inference import (
    _bucket,
    _get_professional_level,
    _get_technical_level,
    _infer_comms,
    run_inference,
    should_run_inference,
)


def _make_expertise(
    *,
    programming: str = "beginner",
    ai_fluency: str = "beginner",
    business: str = "beginner",
    domain_level: str | None = None,
    domain_primary: bool = True,
) -> ExpertiseSection:
    """Helper to build an ExpertiseSection with the given levels."""
    domain = []
    if domain_level is not None:
        domain = [
            DomainExpertise(
                level=domain_level,
                domain_name="Test Domain",
                is_primary=domain_primary,
            )
        ]
    return ExpertiseSection(
        programming=ProgrammingExpertise(level=programming),
        ai_fluency=AiFluencyExpertise(level=ai_fluency),
        business=BusinessExpertise(level=business),
        domain=domain,
    )


# ---------------------------------------------------------------------------
# should_run_inference
# ---------------------------------------------------------------------------


class TestShouldRunInference:
    def test_inference_not_run_without_real_data(self):
        """All sources default -> inference should NOT run."""
        field_sources = {
            "expertise.programming.level": "default",
            "expertise.ai_fluency.level": "default",
            "expertise.business.level": "default",
            "expertise.domain": "default",
        }
        assert should_run_inference(field_sources) is False

    def test_inference_not_run_with_empty_sources(self):
        """Empty dict (no keys at all) -> inference should NOT run."""
        assert should_run_inference({}) is False

    def test_inference_runs_with_user_source(self):
        """At least one expertise field sourced from 'user' -> should run."""
        field_sources = {
            "expertise.programming.level": "user",
            "expertise.ai_fluency.level": "default",
            "expertise.business.level": "default",
            "expertise.domain": "default",
        }
        assert should_run_inference(field_sources) is True

    def test_inference_runs_with_phm_source(self):
        field_sources = {
            "expertise.programming.level": "default",
            "expertise.ai_fluency.level": "phm",
            "expertise.business.level": "default",
            "expertise.domain": "default",
        }
        assert should_run_inference(field_sources) is True

    def test_inference_runs_with_domain_user_source(self):
        field_sources = {
            "expertise.programming.level": "default",
            "expertise.ai_fluency.level": "default",
            "expertise.business.level": "default",
            "expertise.domain": "user",
        }
        assert should_run_inference(field_sources) is True

    def test_inferred_source_does_not_trigger(self):
        field_sources = {
            "expertise.programming.level": "inferred",
            "expertise.ai_fluency.level": "default",
            "expertise.business.level": "default",
            "expertise.domain": "default",
        }
        assert should_run_inference(field_sources) is False


# ---------------------------------------------------------------------------
# Axis helpers
# ---------------------------------------------------------------------------


class TestAxisHelpers:
    def test_technical_level_max_of_programming_and_ai(self):
        e = _make_expertise(programming="beginner", ai_fluency="advanced")
        assert _get_technical_level(e) == "advanced"

    def test_technical_level_programming_only(self):
        e = _make_expertise(programming="expert", ai_fluency="none")
        assert _get_technical_level(e) == "expert"

    def test_professional_level_with_primary_domain(self):
        e = _make_expertise(business="beginner", domain_level="expert")
        assert _get_professional_level(e) == "expert"

    def test_professional_level_no_domain(self):
        e = _make_expertise(business="intermediate")
        assert _get_professional_level(e) == "intermediate"

    def test_professional_level_non_primary_domain_ignored(self):
        e = _make_expertise(business="beginner", domain_level="expert", domain_primary=False)
        # Non-primary domain not counted, falls back to "none" for domain
        assert _get_professional_level(e) == "beginner"

    def test_bucket_none(self):
        assert _bucket("none") == "low"

    def test_bucket_beginner(self):
        assert _bucket("beginner") == "low"

    def test_bucket_intermediate(self):
        assert _bucket("intermediate") == "intermediate"

    def test_bucket_advanced(self):
        assert _bucket("advanced") == "advanced+"

    def test_bucket_expert(self):
        assert _bucket("expert") == "advanced+"


# ---------------------------------------------------------------------------
# Two-axis communication inference combos
# ---------------------------------------------------------------------------


class TestTwoAxisComms:
    def test_tech_advanced_prof_advanced(self):
        """tech=advanced+, prof=advanced+ -> technical, peer-to-peer, concise"""
        result = _infer_comms("advanced", "advanced")
        assert result == {
            "language_complexity": "technical",
            "tone": "peer-to-peer",
            "verbosity": "concise",
        }

    def test_tech_advanced_prof_low(self):
        """tech=advanced+, prof=low -> technical, conversational, moderate"""
        result = _infer_comms("advanced", "beginner")
        assert result == {
            "language_complexity": "technical",
            "tone": "conversational",
            "verbosity": "moderate",
        }

    def test_tech_intermediate_prof_any(self):
        """tech=intermediate, prof=any -> professional, professional, moderate"""
        for prof in ("none", "beginner", "intermediate", "advanced", "expert"):
            result = _infer_comms("intermediate", prof)
            assert result == {
                "language_complexity": "professional",
                "tone": "professional",
                "verbosity": "moderate",
            }, f"Failed for prof={prof}"

    def test_tech_low_prof_advanced(self):
        """tech=low, prof=advanced+ -> professional, professional, detailed"""
        result = _infer_comms("beginner", "advanced")
        assert result == {
            "language_complexity": "professional",
            "tone": "professional",
            "verbosity": "detailed",
        }

    def test_tech_low_prof_low(self):
        """tech=low, prof=low -> plain, conversational, detailed"""
        result = _infer_comms("none", "none")
        assert result == {
            "language_complexity": "plain",
            "tone": "conversational",
            "verbosity": "detailed",
        }


# ---------------------------------------------------------------------------
# run_inference — two-axis integration tests
# ---------------------------------------------------------------------------


class TestRunInferenceTwoAxis:
    def _sources_with_user_programming(self) -> dict[str, str]:
        return {"expertise.programming.level": "user"}

    def test_advanced_programmer_advanced_business(self):
        """Both axes advanced -> technical, peer-to-peer, concise."""
        expertise = _make_expertise(
            programming="advanced", business="advanced", domain_level="advanced",
        )
        field_sources = {
            "expertise.programming.level": "user",
            "expertise.business.level": "user",
        }
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["communication.language_complexity"] == "technical"
        assert changed_values["communication.tone"] == "peer-to-peer"
        assert changed_values["communication.verbosity"] == "concise"
        assert changed_values["delivery.include_code_samples"] is True
        assert changed_values["delivery.code_verbosity"] == "minimal"

    def test_advanced_programmer_low_professional(self):
        """Tech advanced, prof low -> technical, conversational, moderate."""
        expertise = _make_expertise(
            programming="advanced", ai_fluency="beginner", business="none",
        )
        field_sources = self._sources_with_user_programming()
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["communication.language_complexity"] == "technical"
        assert changed_values["communication.tone"] == "conversational"
        assert changed_values["communication.verbosity"] == "moderate"

    def test_intermediate_programmer(self):
        """Tech intermediate -> professional, professional, moderate."""
        expertise = _make_expertise(
            programming="intermediate", ai_fluency="none", business="none",
        )
        field_sources = self._sources_with_user_programming()
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["communication.language_complexity"] == "professional"
        assert changed_values["communication.tone"] == "professional"
        assert changed_values["communication.verbosity"] == "moderate"

    def test_low_tech_advanced_professional(self):
        """Tech low, prof advanced -> professional, professional, detailed."""
        expertise = _make_expertise(
            programming="none", ai_fluency="beginner", business="advanced",
            domain_level="expert",
        )
        field_sources = {"expertise.business.level": "user"}
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["communication.language_complexity"] == "professional"
        assert changed_values["communication.tone"] == "professional"
        assert changed_values["communication.verbosity"] == "detailed"

    def test_both_axes_low(self):
        """Both axes low -> plain, conversational, detailed."""
        expertise = _make_expertise(
            programming="none", ai_fluency="beginner", business="beginner",
        )
        field_sources = {"expertise.programming.level": "user"}
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["communication.language_complexity"] == "plain"
        assert changed_values["communication.tone"] == "conversational"
        assert changed_values["communication.verbosity"] == "detailed"

    def test_programming_none_no_code_samples(self):
        """programming=none -> include_code_samples=False, no code_verbosity."""
        expertise = _make_expertise(
            programming="none", ai_fluency="none", business="none",
        )
        field_sources = {"expertise.programming.level": "user"}
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["delivery.include_code_samples"] is False
        assert "delivery.code_verbosity" not in changed_values

    def test_programming_none_with_domain_expert(self):
        """programming=none, domain=expert -> no code samples but professional comms."""
        expertise = _make_expertise(
            programming="none", ai_fluency="none", business="none",
            domain_level="expert",
        )
        field_sources = {"expertise.domain": "user"}
        changed_values, _ = run_inference(expertise, field_sources)

        assert changed_values["delivery.include_code_samples"] is False
        assert "delivery.code_verbosity" not in changed_values
        # Tech is low (prog=none, ai=none), prof is advanced+ (domain=expert)
        assert changed_values["communication.language_complexity"] == "professional"

    def test_code_verbosity_by_programming_level(self):
        """code_verbosity keyed to programming.level specifically."""
        cases = [
            ("beginner", "fully-explained"),
            ("intermediate", "annotated"),
            ("advanced", "minimal"),
            ("expert", "minimal"),
        ]
        for prog_level, expected_verb in cases:
            expertise = _make_expertise(programming=prog_level)
            field_sources = {"expertise.programming.level": "user"}
            changed_values, _ = run_inference(expertise, field_sources)
            assert changed_values["delivery.code_verbosity"] == expected_verb, (
                f"programming={prog_level}: expected {expected_verb}"
            )


# ---------------------------------------------------------------------------
# run_inference — field source protection (user/phm not overwritten)
# ---------------------------------------------------------------------------


class TestInferenceSourceProtection:
    def test_user_set_not_overwritten(self):
        """A field with source='user' should NOT be overwritten by inference."""
        expertise = _make_expertise(programming="advanced")
        field_sources = {
            "expertise.programming.level": "user",
            "communication.language_complexity": "user",
        }
        changed_values, changed_sources = run_inference(expertise, field_sources)

        assert "communication.language_complexity" not in changed_values
        assert "communication.language_complexity" not in changed_sources
        assert "communication.tone" in changed_values

    def test_phm_set_not_overwritten(self):
        """A field with source='phm' should NOT be overwritten by inference."""
        expertise = _make_expertise(programming="intermediate")
        field_sources = {
            "expertise.programming.level": "user",
            "communication.tone": "phm",
        }
        changed_values, changed_sources = run_inference(expertise, field_sources)

        assert "communication.tone" not in changed_values
        assert "communication.language_complexity" in changed_values

    def test_inferred_can_override_previous_inferred(self):
        """A field with source='inferred' CAN be updated by new inference."""
        expertise = _make_expertise(programming="expert")
        field_sources = {
            "expertise.programming.level": "user",
            "communication.language_complexity": "inferred",
        }
        changed_values, changed_sources = run_inference(expertise, field_sources)

        assert "communication.language_complexity" in changed_values
        assert changed_sources["communication.language_complexity"] == "inferred"

    def test_inferred_can_override_default(self):
        expertise = _make_expertise(programming="beginner")
        field_sources = {
            "expertise.programming.level": "user",
            "communication.verbosity": "default",
        }
        changed_values, changed_sources = run_inference(expertise, field_sources)

        assert changed_values["communication.verbosity"] == "detailed"
        assert changed_sources["communication.verbosity"] == "inferred"


# ---------------------------------------------------------------------------
# run_inference — changed_sources output
# ---------------------------------------------------------------------------


class TestInferenceChangedSources:
    def test_inferred_field_sources_updated(self):
        expertise = _make_expertise(programming="intermediate")
        field_sources = {"expertise.programming.level": "user"}
        changed_values, changed_sources = run_inference(expertise, field_sources)

        for field_path in changed_values:
            assert changed_sources[field_path] == "inferred"

    def test_changed_values_and_sources_have_same_keys(self):
        expertise = _make_expertise(programming="advanced", ai_fluency="beginner")
        field_sources = {"expertise.programming.level": "user"}
        changed_values, changed_sources = run_inference(expertise, field_sources)

        assert set(changed_values.keys()) == set(changed_sources.keys())

    def test_no_changes_when_inference_not_triggered(self):
        expertise = _make_expertise(programming="advanced")
        field_sources = {
            "expertise.programming.level": "default",
            "expertise.ai_fluency.level": "default",
        }
        changed_values, changed_sources = run_inference(expertise, field_sources)

        assert changed_values == {}
        assert changed_sources == {}

    def test_does_not_mutate_input_field_sources(self):
        expertise = _make_expertise(programming="expert")
        field_sources = {
            "expertise.programming.level": "user",
            "communication.language_complexity": "default",
        }
        original_sources = field_sources.copy()
        run_inference(expertise, field_sources)

        assert field_sources == original_sources
