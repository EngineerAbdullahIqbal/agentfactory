"""E2E: Onboarding journey flow.

Tests the progressive onboarding experience:
create → check initial status → complete phases → verify progress → verify completion.
"""

BASE = "/api/v1/profiles"


class TestOnboardingJourney:
    """End-to-end onboarding flow tests."""

    async def test_complete_onboarding_journey(self, client):
        """Full onboarding journey from new profile to completion."""

        # 1. Create fresh profile
        create_resp = await client.post(
            BASE + "/", json={"consent_given": True, "name": "Onboarding User"}
        )
        assert create_resp.status_code == 201

        # 2. Check initial onboarding status — all phases incomplete
        status_resp = await client.get(BASE + "/me/onboarding-status")
        assert status_resp.status_code == 200
        status = status_resp.json()

        assert status["overall_completed"] is False
        assert status["onboarding_progress"] == 0.0
        all_phases = [
            "goals", "expertise", "professional_context",
            "accessibility", "communication_preferences", "ai_enrichment",
        ]
        for phase in all_phases:
            assert status["sections_completed"][phase] is False
        assert status["next_section"] == "goals"  # First phase

        # 3. Complete goals phase — with data
        goals_resp = await client.patch(BASE + "/me/onboarding/goals")
        assert goals_resp.status_code == 200

        # 4. Check progress — 1/6 complete
        status_resp = await client.get(BASE + "/me/onboarding-status")
        status = status_resp.json()
        assert status["sections_completed"]["goals"] is True
        assert status["onboarding_progress"] == round(1 / 6, 2)
        assert status["next_section"] == "expertise"
        assert status["overall_completed"] is False

        # 5. Complete expertise phase
        expertise_resp = await client.patch(BASE + "/me/onboarding/expertise")
        assert expertise_resp.status_code == 200

        # 6. Check progress — 2/6 complete
        status_resp = await client.get(BASE + "/me/onboarding-status")
        status = status_resp.json()
        assert status["onboarding_progress"] == round(2 / 6, 2)
        assert status["next_section"] == "professional_context"

        # 7. Complete remaining phases
        for phase in ["professional_context", "accessibility", "communication_preferences", "ai_enrichment"]:
            resp = await client.patch(BASE + f"/me/onboarding/{phase}")
            assert resp.status_code == 200

        # 8. Verify fully complete
        final_status = await client.get(BASE + "/me/onboarding-status")
        final = final_status.json()
        assert final["overall_completed"] is True
        assert final["onboarding_progress"] == 1.0
        assert final["next_section"] is None
        for phase in all_phases:
            assert final["sections_completed"][phase] is True

    async def test_onboarding_with_section_data(self, client):
        """Onboarding phases can carry section data that gets stored."""
        await client.post(BASE + "/", json={"consent_given": True})

        # Complete goals phase with actual goal data
        goals_data = {
            "primary_learning_goal": "Build production AI agents",
            "urgency": "high",
            "career_goal": "ML Engineer",
        }
        resp = await client.patch(
            BASE + "/me/onboarding/goals",
            json=goals_data,
        )
        assert resp.status_code == 200
        profile = resp.json()
        assert profile["goals"]["primary_learning_goal"] == "Build production AI agents"
        assert profile["goals"]["urgency"] == "high"
        assert profile["goals"]["career_goal"] == "ML Engineer"

        # Complete expertise phase with expertise data
        expertise_data = {
            "programming": {"level": "advanced", "languages": ["Python", "TypeScript"]},
            "ai_fluency": {"level": "intermediate"},
        }
        resp = await client.patch(
            BASE + "/me/onboarding/expertise",
            json=expertise_data,
        )
        assert resp.status_code == 200
        profile = resp.json()
        assert profile["expertise"]["programming"]["level"] == "advanced"

        # Verify data persists via GET
        get_resp = await client.get(BASE + "/me")
        assert get_resp.status_code == 200
        final = get_resp.json()
        assert final["goals"]["career_goal"] == "ML Engineer"
        assert final["expertise"]["ai_fluency"]["level"] == "intermediate"

    async def test_completeness_tracks_onboarding(self, client):
        """Completeness endpoint reflects both onboarding and field provenance."""
        await client.post(BASE + "/", json={"consent_given": True})

        # Initial completeness — low
        comp_resp = await client.get(BASE + "/me/completeness")
        assert comp_resp.status_code == 200
        initial = comp_resp.json()
        initial_completeness = initial["profile_completeness"]
        assert initial_completeness == 0.0  # No user-set fields
        assert initial["onboarding_progress"] == 0.0
        assert len(initial["highest_impact_missing"]) > 0

        # Complete goals with data
        await client.patch(
            BASE + "/me/onboarding/goals",
            json={
                "primary_learning_goal": "AI Agents",
                "urgency": "medium",
            },
        )

        # Completeness should increase
        comp_resp = await client.get(BASE + "/me/completeness")
        after_goals = comp_resp.json()
        assert after_goals["profile_completeness"] > initial_completeness
        assert after_goals["onboarding_progress"] == round(1 / 6, 2)

        # Complete expertise with data
        await client.patch(
            BASE + "/me/onboarding/expertise",
            json={
                "programming": {"level": "intermediate"},
                "ai_fluency": {"level": "beginner"},
            },
        )

        # Should increase further
        comp_resp = await client.get(BASE + "/me/completeness")
        after_expertise = comp_resp.json()
        assert after_expertise["profile_completeness"] > after_goals["profile_completeness"]
        assert after_expertise["onboarding_progress"] == round(2 / 6, 2)

    async def test_idempotent_onboarding_completion(self, client):
        """Completing the same phase twice is safe."""
        await client.post(BASE + "/", json={"consent_given": True})

        # Complete goals once
        first = await client.patch(BASE + "/me/onboarding/goals")
        assert first.status_code == 200

        # Complete goals again — should be idempotent
        second = await client.patch(BASE + "/me/onboarding/goals")
        assert second.status_code == 200

        # Still only 1/6 progress
        status = await client.get(BASE + "/me/onboarding-status")
        data = status.json()
        assert data["onboarding_progress"] == round(1 / 6, 2)

    async def test_communication_preferences_phase(self, client):
        """communication_preferences phase stores communication + delivery data."""
        await client.post(BASE + "/", json={"consent_given": True})

        comm_prefs_data = {
            "communication": {
                "language_complexity": "technical",
                "tone": "peer-to-peer",
                "verbosity": "concise",
            },
            "delivery": {
                "include_code_samples": True,
                "code_verbosity": "minimal",
            },
        }
        resp = await client.patch(
            BASE + "/me/onboarding/communication_preferences",
            json=comm_prefs_data,
        )
        assert resp.status_code == 200
        profile = resp.json()

        assert profile["communication"]["language_complexity"] == "technical"
        assert profile["communication"]["tone"] == "peer-to-peer"
        assert profile["communication"]["verbosity"] == "concise"
        assert profile["delivery"]["include_code_samples"] is True
        assert profile["delivery"]["code_verbosity"] == "minimal"

        # Verify field_sources are tracked
        assert profile["field_sources"]["communication.language_complexity"] == "user"
        assert profile["field_sources"]["delivery.include_code_samples"] == "user"

        # Verify onboarding status shows communication_preferences complete
        status_resp = await client.get(BASE + "/me/onboarding-status")
        status = status_resp.json()
        assert status["sections_completed"]["communication_preferences"] is True

    async def test_communication_preferences_without_data(self, client):
        """communication_preferences phase can be marked complete without data."""
        await client.post(BASE + "/", json={"consent_given": True})

        resp = await client.patch(BASE + "/me/onboarding/communication_preferences")
        assert resp.status_code == 200

        status_resp = await client.get(BASE + "/me/onboarding-status")
        status = status_resp.json()
        assert status["sections_completed"]["communication_preferences"] is True

    async def test_field_sources_in_profile_response(self, client):
        """ProfileResponse includes field_sources dict."""
        await client.post(BASE + "/", json={"consent_given": True})

        # Set some data to generate field_sources
        await client.patch(
            BASE + "/me/onboarding/goals",
            json={"primary_learning_goal": "Test goal"},
        )

        resp = await client.get(BASE + "/me")
        assert resp.status_code == 200
        profile = resp.json()
        assert "field_sources" in profile
        assert isinstance(profile["field_sources"], dict)
        assert profile["field_sources"]["goals.primary_learning_goal"] == "user"

    async def test_invalid_onboarding_phase_rejected(self, client):
        """Unknown onboarding phase returns 404."""
        await client.post(BASE + "/", json={"consent_given": True})

        resp = await client.patch(BASE + "/me/onboarding/nonexistent")
        assert resp.status_code == 404
        assert resp.json()["detail"]["error"] == "not_found"
