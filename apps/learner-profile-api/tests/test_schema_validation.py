"""Pure unit tests for Pydantic schema validation — no database required."""

import pytest
from pydantic import ValidationError

from learner_profile_api.schemas.profile import (
    AiFluencyExpertise,
    CommunicationSection,
    DeliverySection,
    DomainExpertise,
    ExpertiseSection,
    MasteredTopic,
    Misconception,
    ProfessionalContextSection,
    ProfileCreate,
    ProfileUpdate,
    SubjectSpecific,
)


# ---------------------------------------------------------------------------
# 1. ExpertiseLevel enum validation
# ---------------------------------------------------------------------------
class TestExpertiseLevelEnum:
    def test_expertise_enum_validation(self):
        """Invalid level 'superexpert' must raise ValidationError."""
        with pytest.raises(ValidationError) as exc_info:
            DomainExpertise(level="superexpert")
        assert "level" in str(exc_info.value)

    def test_all_valid_expertise_levels(self):
        """Every canonical level must be accepted."""
        for level in ("none", "beginner", "intermediate", "advanced", "expert"):
            d = DomainExpertise(level=level)
            assert d.level == level


# ---------------------------------------------------------------------------
# 2. Free-text length limits
# ---------------------------------------------------------------------------
class TestFreetextLengthLimits:
    def test_freetext_length_limits(self):
        """Notes exceeding 300 chars must be rejected."""
        with pytest.raises(ValidationError) as exc_info:
            DomainExpertise(notes="x" * 500)
        assert "notes" in str(exc_info.value)

    def test_notes_at_boundary(self):
        """Exactly 300 chars must be accepted."""
        d = DomainExpertise(notes="a" * 300)
        assert len(d.notes) == 300


# ---------------------------------------------------------------------------
# 3. Misconceptions capped at 5
# ---------------------------------------------------------------------------
class TestMisconceptionsCap:
    def test_misconceptions_capped_at_5(self):
        """More than 5 misconceptions must raise ValidationError."""
        misconceptions = [
            Misconception(topic=f"topic-{i}", misconception=f"wrong-{i}")
            for i in range(6)
        ]
        with pytest.raises(ValidationError) as exc_info:
            SubjectSpecific(known_misconceptions=misconceptions)
        assert "known_misconceptions" in str(exc_info.value)

    def test_misconceptions_at_limit(self):
        """Exactly 5 misconceptions must be accepted."""
        misconceptions = [
            Misconception(topic=f"topic-{i}", misconception=f"wrong-{i}")
            for i in range(5)
        ]
        ss = SubjectSpecific(known_misconceptions=misconceptions)
        assert len(ss.known_misconceptions) == 5


# ---------------------------------------------------------------------------
# 4. Domain entries max 5
# ---------------------------------------------------------------------------
class TestDomainMax:
    def test_domain_max_5(self):
        """More than 5 domain entries must raise ValidationError."""
        domains = [DomainExpertise(domain_name=f"d-{i}") for i in range(6)]
        with pytest.raises(ValidationError) as exc_info:
            ExpertiseSection(domain=domains)
        assert "domain" in str(exc_info.value)

    def test_domain_at_limit(self):
        """Exactly 5 domain entries must be accepted."""
        domains = [DomainExpertise(domain_name=f"d-{i}") for i in range(5)]
        es = ExpertiseSection(domain=domains)
        assert len(es.domain) == 5


# ---------------------------------------------------------------------------
# 5. Real projects max 5
# ---------------------------------------------------------------------------
class TestRealProjectsMax:
    def test_real_projects_max_5(self):
        """More than 5 real projects must raise ValidationError."""
        from learner_profile_api.schemas.profile import RealProject

        projects = [
            RealProject(project_name=f"proj-{i}", description=f"desc-{i}")
            for i in range(6)
        ]
        with pytest.raises(ValidationError) as exc_info:
            ProfessionalContextSection(real_projects=projects)
        assert "real_projects" in str(exc_info.value)

    def test_real_projects_at_limit(self):
        """Exactly 5 real projects must be accepted."""
        from learner_profile_api.schemas.profile import RealProject

        projects = [
            RealProject(project_name=f"proj-{i}", description=f"desc-{i}")
            for i in range(5)
        ]
        pc = ProfessionalContextSection(real_projects=projects)
        assert len(pc.real_projects) == 5


# ---------------------------------------------------------------------------
# 6. tools_in_use item length
# ---------------------------------------------------------------------------
class TestToolsInUseItemLength:
    def test_tools_in_use_item_length(self):
        """A tool name exceeding 50 chars must raise ValidationError."""
        with pytest.raises(ValidationError) as exc_info:
            ProfessionalContextSection(tools_in_use=["x" * 60])
        assert "tools_in_use" in str(exc_info.value)

    def test_tools_in_use_at_boundary(self):
        """A tool name of exactly 50 chars must be accepted."""
        pc = ProfessionalContextSection(tools_in_use=["a" * 50])
        assert len(pc.tools_in_use[0]) == 50


# ---------------------------------------------------------------------------
# 7. secondary_goals item length
# ---------------------------------------------------------------------------
class TestSecondaryGoalsItemLength:
    def test_secondary_goals_item_length(self):
        """A goal text exceeding 200 chars must raise ValidationError."""
        from learner_profile_api.schemas.profile import GoalsSection

        with pytest.raises(ValidationError) as exc_info:
            GoalsSection(secondary_goals=["y" * 250])
        assert "secondary_goals" in str(exc_info.value)

    def test_secondary_goals_at_boundary(self):
        """A goal text of exactly 200 chars must be accepted."""
        from learner_profile_api.schemas.profile import GoalsSection

        gs = GoalsSection(secondary_goals=["b" * 200])
        assert len(gs.secondary_goals[0]) == 200


# ---------------------------------------------------------------------------
# 8. Valid expertise section
# ---------------------------------------------------------------------------
class TestValidExpertiseSection:
    def test_valid_expertise_section(self):
        """A fully-populated ExpertiseSection must pass validation."""
        es = ExpertiseSection(
            domain=[
                DomainExpertise(
                    level="advanced",
                    domain_name="Machine Learning",
                    is_primary=True,
                    notes="Focused on NLP",
                ),
            ],
            programming={"level": "intermediate", "languages": ["Python", "Rust"]},
            ai_fluency=AiFluencyExpertise(level="expert", notes="Published researcher"),
            business={"level": "beginner"},
            subject_specific=SubjectSpecific(
                topics_already_mastered=[
                    MasteredTopic(topic="Linear Algebra", treatment="reference"),
                ],
                known_misconceptions=[
                    Misconception(
                        topic="Gradient Descent",
                        misconception="Always converges to global minimum",
                    ),
                ],
            ),
        )
        assert es.domain[0].domain_name == "Machine Learning"
        assert es.programming.level == "intermediate"
        assert es.ai_fluency.level == "expert"
        assert es.business.level == "beginner"
        assert len(es.subject_specific.topics_already_mastered) == 1


# ---------------------------------------------------------------------------
# 9. Valid communication section
# ---------------------------------------------------------------------------
class TestValidCommunicationSection:
    def test_valid_communication_section(self):
        """A fully-populated CommunicationSection must pass validation."""
        cs = CommunicationSection(
            language_complexity="technical",
            preferred_structure="examples-first",
            verbosity="detailed",
            analogy_domain="cooking",
            tone="conversational",
            wants_summaries=True,
            wants_check_in_questions=False,
            format_notes="Use bullet points",
        )
        assert cs.language_complexity == "technical"
        assert cs.preferred_structure == "examples-first"
        assert cs.verbosity == "detailed"
        assert cs.tone == "conversational"
        assert cs.wants_summaries is True


# ---------------------------------------------------------------------------
# 10. Valid delivery section
# ---------------------------------------------------------------------------
class TestValidDeliverySection:
    def test_valid_delivery_section(self):
        """A fully-populated DeliverySection must pass validation."""
        ds = DeliverySection(
            output_format="structured-with-headers",
            target_length="medium",
            include_code_samples=True,
            code_verbosity="annotated",
            include_visual_descriptions=False,
            language="Urdu",
            language_proficiency="native",
            native_language="ur",
            preferred_code_language="Python",
        )
        assert ds.output_format == "structured-with-headers"
        assert ds.target_length == "medium"
        assert ds.include_code_samples is True
        assert ds.language == "Urdu"
        assert ds.language_proficiency == "native"
        assert ds.native_language == "ur"
        assert ds.preferred_code_language == "Python"


# ---------------------------------------------------------------------------
# 10b. Native language and preferred code language
# ---------------------------------------------------------------------------
class TestNativeLanguageAndCodeLanguage:
    def test_native_language_default_none(self):
        """native_language defaults to None."""
        ds = DeliverySection()
        assert ds.native_language is None

    def test_preferred_code_language_default_none(self):
        """preferred_code_language defaults to None."""
        ds = DeliverySection()
        assert ds.preferred_code_language is None

    def test_native_language_max_length(self):
        """native_language exceeding 50 chars must raise ValidationError."""
        with pytest.raises(ValidationError) as exc_info:
            DeliverySection(native_language="x" * 51)
        assert "native_language" in str(exc_info.value)

    def test_native_language_at_boundary(self):
        """native_language of exactly 50 chars must be accepted."""
        ds = DeliverySection(native_language="a" * 50)
        assert len(ds.native_language) == 50

    def test_preferred_code_language_max_length(self):
        """preferred_code_language exceeding 50 chars must raise ValidationError."""
        with pytest.raises(ValidationError) as exc_info:
            DeliverySection(preferred_code_language="x" * 51)
        assert "preferred_code_language" in str(exc_info.value)

    def test_preferred_code_language_at_boundary(self):
        """preferred_code_language of exactly 50 chars must be accepted."""
        ds = DeliverySection(preferred_code_language="a" * 50)
        assert len(ds.preferred_code_language) == 50

    def test_valid_iso_code(self):
        """ISO 639-1 codes must be accepted."""
        ds = DeliverySection(native_language="ur")
        assert ds.native_language == "ur"

    def test_valid_programming_language(self):
        """Common programming language names must be accepted."""
        ds = DeliverySection(preferred_code_language="Python")
        assert ds.preferred_code_language == "Python"


# ---------------------------------------------------------------------------
# 11. ProfileCreate defaults
# ---------------------------------------------------------------------------
class TestProfileCreateDefaults:
    def test_profile_create_defaults(self):
        """ProfileCreate() with no args must produce correct defaults."""
        p = ProfileCreate()
        assert p.consent_given is False
        assert p.name is None
        assert isinstance(p.expertise, ExpertiseSection)
        assert isinstance(p.professional_context, ProfessionalContextSection)
        assert isinstance(p.communication, CommunicationSection)
        assert isinstance(p.delivery, DeliverySection)
        # Nested defaults
        assert p.expertise.domain == []
        assert p.expertise.programming.level == "beginner"
        assert p.delivery.language == "English"


# ---------------------------------------------------------------------------
# 12. ProfileUpdate all optional
# ---------------------------------------------------------------------------
class TestProfileUpdateAllOptional:
    def test_profile_update_all_optional(self):
        """ProfileUpdate() with no fields must have empty model_fields_set."""
        pu = ProfileUpdate()
        assert pu.model_fields_set == set()

    def test_profile_update_partial(self):
        """Only supplied fields appear in model_fields_set."""
        pu = ProfileUpdate(name="Ada Lovelace")
        assert pu.model_fields_set == {"name"}
        assert pu.expertise is None


# ---------------------------------------------------------------------------
# 13. Unicode in fields
# ---------------------------------------------------------------------------
class TestUnicodeInFields:
    def test_unicode_in_fields(self):
        """Arabic and Urdu characters in name and notes must be accepted."""
        arabic_name = "\u0645\u062d\u0645\u062f"  # محمد
        urdu_notes = (
            "\u06cc\u06c1 \u0627\u06cc\u06a9 \u0679\u06cc\u0633\u0679 \u06c1\u06d2"
        )  # یہ ایک ٹیسٹ ہے
        p = ProfileCreate(name=arabic_name)
        assert p.name == arabic_name

        d = DomainExpertise(notes=urdu_notes)
        assert d.notes == urdu_notes

    def test_unicode_emoji_in_name(self):
        """Emoji characters in name must be accepted."""
        p = ProfileCreate(name="Student \U0001f393")
        assert "\U0001f393" in p.name


# ---------------------------------------------------------------------------
# 14. MasteredTopic treatment enum
# ---------------------------------------------------------------------------
class TestMasteredTopicTreatmentEnum:
    def test_mastered_topic_treatment_enum(self):
        """Invalid treatment value must raise ValidationError."""
        with pytest.raises(ValidationError) as exc_info:
            MasteredTopic(topic="Algebra", treatment="ignore")
        assert "treatment" in str(exc_info.value)

    def test_valid_treatments(self):
        """Both canonical treatment values must be accepted."""
        for treatment in ("reference", "skip"):
            mt = MasteredTopic(topic="Algebra", treatment=treatment)
            assert mt.treatment == treatment
