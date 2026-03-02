"""Tests for the defaults service — Appendix B defaults for communication/delivery."""

from learner_profile_api.services.defaults import (
    apply_defaults_to_profile_data,
    get_communication_defaults,
    get_delivery_defaults,
)


class TestCommunicationDefaults:
    def test_all_communication_defaults_present(self):
        defaults = get_communication_defaults()
        assert defaults["language_complexity"] == "professional"
        assert defaults["preferred_structure"] == "examples-first"
        assert defaults["verbosity"] == "moderate"
        assert defaults["tone"] == "professional"
        assert defaults["wants_summaries"] is True
        assert defaults["wants_check_in_questions"] is True
        assert defaults["analogy_domain"] is None
        assert defaults["format_notes"] is None


class TestDeliveryDefaults:
    def test_delivery_defaults_beginner(self):
        defaults = get_delivery_defaults("beginner")
        assert defaults["output_format"] == "structured-with-headers"
        assert defaults["target_length"] == "match-source"
        assert defaults["include_code_samples"] is True
        assert defaults["code_verbosity"] == "fully-explained"
        assert defaults["include_visual_descriptions"] is False
        assert defaults["language"] == "English"
        assert defaults["native_language"] is None
        assert defaults["preferred_code_language"] is None

    def test_delivery_defaults_none(self):
        defaults = get_delivery_defaults("none")
        assert defaults["include_code_samples"] is False
        assert defaults["code_verbosity"] is None

    def test_delivery_defaults_intermediate(self):
        defaults = get_delivery_defaults("intermediate")
        assert defaults["include_code_samples"] is True
        assert defaults["code_verbosity"] == "annotated"

    def test_delivery_defaults_advanced(self):
        defaults = get_delivery_defaults("advanced")
        assert defaults["include_code_samples"] is True
        assert defaults["code_verbosity"] == "minimal"


class TestApplyDefaultsToProfileData:
    def test_fills_none_fields_with_defaults(self):
        comm = {"language_complexity": None, "tone": None}
        delivery = {"output_format": None, "include_code_samples": None}
        expertise = {"programming": {"level": "beginner"}}

        comm, delivery = apply_defaults_to_profile_data(comm, delivery, expertise)

        assert comm["language_complexity"] == "professional"
        assert comm["tone"] == "professional"
        assert delivery["output_format"] == "structured-with-headers"
        assert delivery["include_code_samples"] is True

    def test_does_not_overwrite_explicit_values(self):
        comm = {"language_complexity": "expert", "tone": "formal"}
        delivery = {
            "output_format": "prose",
            "include_code_samples": False,
            "native_language": "ur",
            "preferred_code_language": "Python",
        }
        expertise = {"programming": {"level": "advanced"}}

        comm, delivery = apply_defaults_to_profile_data(comm, delivery, expertise)

        # User-set values preserved
        assert comm["language_complexity"] == "expert"
        assert comm["tone"] == "formal"
        assert delivery["output_format"] == "prose"
        assert delivery["include_code_samples"] is False
        assert delivery["native_language"] == "ur"
        assert delivery["preferred_code_language"] == "Python"

    def test_screen_reader_enables_visual_descriptions(self):
        """Spec Appendix B: screen_reader=true -> include_visual_descriptions=true."""
        comm = {}
        delivery = {"include_visual_descriptions": None}
        expertise = {"programming": {"level": "beginner"}}
        accessibility = {"screen_reader": True}

        comm, delivery = apply_defaults_to_profile_data(
            comm, delivery, expertise, accessibility
        )
        assert delivery["include_visual_descriptions"] is True

    def test_no_screen_reader_keeps_false(self):
        """screen_reader=false -> include_visual_descriptions stays false."""
        comm = {}
        delivery = {}
        expertise = {"programming": {"level": "beginner"}}
        accessibility = {"screen_reader": False}

        comm, delivery = apply_defaults_to_profile_data(
            comm, delivery, expertise, accessibility
        )
        assert delivery["include_visual_descriptions"] is False

    def test_no_accessibility_param_keeps_false(self):
        """No accessibility dict -> include_visual_descriptions stays false."""
        comm = {}
        delivery = {}
        expertise = {"programming": {"level": "beginner"}}

        comm, delivery = apply_defaults_to_profile_data(comm, delivery, expertise)
        assert delivery["include_visual_descriptions"] is False
