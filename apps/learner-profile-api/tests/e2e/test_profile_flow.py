"""E2E: Full profile lifecycle flow.

Tests the complete user journey through the HTTP layer:
create → read → update → section update → verify → delete → verify gone.
"""

BASE = "/api/v1/profiles"


class TestProfileLifecycle:
    """End-to-end profile CRUD lifecycle."""

    async def test_full_profile_lifecycle(self, client):
        """Complete CRUD journey through the API."""

        # 1. Create profile with initial data
        create_resp = await client.post(
            BASE + "/",
            json={
                "consent_given": True,
                "name": "Alice Johnson",
                "goals": {
                    "primary_learning_goal": "Build AI agents for my business",
                    "urgency": "high",
                },
                "expertise": {
                    "programming": {"level": "intermediate", "languages": ["Python"]},
                    "ai_fluency": {"level": "beginner"},
                },
            },
        )
        assert create_resp.status_code == 201
        profile = create_resp.json()
        assert profile["learner_id"] == "dev-user-123"
        assert profile["name"] == "Alice Johnson"
        assert profile["consent_given"] is True
        assert profile["goals"]["primary_learning_goal"] == "Build AI agents for my business"
        assert profile["expertise"]["programming"]["level"] == "intermediate"
        assert profile["expertise"]["ai_fluency"]["level"] == "beginner"

        # 2. Read back via GET /me
        get_resp = await client.get(BASE + "/me")
        assert get_resp.status_code == 200
        data = get_resp.json()
        assert data["name"] == "Alice Johnson"
        assert data["goals"]["urgency"] == "high"
        assert data["profile_version"] == "1.1"

        # 3. PATCH /me to update goals (should preserve expertise)
        patch_resp = await client.patch(
            BASE + "/me",
            json={
                "goals": {
                    "primary_learning_goal": "Master autonomous AI agents",
                    "career_goal": "AI Product Manager",
                },
            },
        )
        assert patch_resp.status_code == 200
        patched = patch_resp.json()
        assert patched["goals"]["primary_learning_goal"] == "Master autonomous AI agents"
        assert patched["goals"]["career_goal"] == "AI Product Manager"
        # urgency preserved from original
        assert patched["goals"]["urgency"] == "high"
        # expertise untouched
        assert patched["expertise"]["programming"]["level"] == "intermediate"
        assert "Python" in patched["expertise"]["programming"]["languages"]

        # 4. Section update: expertise only
        section_resp = await client.patch(
            BASE + "/me/sections/expertise",
            json={
                "programming": {"level": "advanced", "languages": ["Python", "Rust"]},
            },
        )
        assert section_resp.status_code == 200
        sectioned = section_resp.json()
        assert sectioned["expertise"]["programming"]["level"] == "advanced"
        assert "Rust" in sectioned["expertise"]["programming"]["languages"]
        # ai_fluency preserved
        assert sectioned["expertise"]["ai_fluency"]["level"] == "beginner"

        # 5. Verify completeness increases with data
        comp_resp = await client.get(BASE + "/me/completeness")
        assert comp_resp.status_code == 200
        comp = comp_resp.json()
        assert comp["profile_completeness"] > 0.0
        assert isinstance(comp["per_section"], dict)
        assert comp["learner_id"] == "dev-user-123"

        # 6. Soft delete
        del_resp = await client.delete(BASE + "/me")
        assert del_resp.status_code == 204

        # 7. Verify profile is gone
        gone_resp = await client.get(BASE + "/me")
        assert gone_resp.status_code == 404

        # 8. Restore via POST
        restore_resp = await client.post(
            BASE + "/", json={"consent_given": True}
        )
        assert restore_resp.status_code == 200  # 200 = restored, not 201
        restored = restore_resp.json()
        # Original data preserved
        assert restored["name"] == "Alice Johnson"

        # 9. GDPR erase (hard delete)
        erase_resp = await client.delete(BASE + "/me/gdpr-erase")
        assert erase_resp.status_code == 204

        # 10. Truly gone — cannot restore
        final_get = await client.get(BASE + "/me")
        assert final_get.status_code == 404

    async def test_inference_triggered_by_expertise_update(self, client):
        """Verify inference engine fires when expertise changes."""
        # Create with beginner expertise
        await client.post(
            BASE + "/",
            json={"consent_given": True},
        )

        # Update expertise to advanced on both axes — should trigger inference
        # Two-axis model: tech=max(programming, ai_fluency), prof=max(business, primary domain)
        patch_resp = await client.patch(
            BASE + "/me",
            json={
                "expertise": {
                    "programming": {"level": "advanced"},
                    "ai_fluency": {"level": "advanced"},
                    "business": {"level": "advanced"},
                },
            },
        )
        assert patch_resp.status_code == 200
        profile = patch_resp.json()

        # tech=advanced+, prof=advanced+ -> technical, peer-to-peer, concise
        assert profile["communication"]["language_complexity"] == "technical"
        assert profile["communication"]["tone"] == "peer-to-peer"
        assert profile["communication"]["verbosity"] == "concise"
        assert profile["delivery"]["include_code_samples"] is True
        assert profile["delivery"]["code_verbosity"] == "minimal"

    async def test_user_preferences_override_inference(self, client):
        """User-set communication values must survive inference reruns."""
        # Create profile
        await client.post(
            BASE + "/",
            json={"consent_given": True},
        )

        # User explicitly sets tone to formal
        await client.patch(
            BASE + "/me",
            json={"communication": {"tone": "formal"}},
        )

        # Now update expertise to expert — triggers inference
        patch_resp = await client.patch(
            BASE + "/me",
            json={
                "expertise": {
                    "programming": {"level": "expert"},
                },
            },
        )
        assert patch_resp.status_code == 200
        profile = patch_resp.json()

        # Inference ran for other fields...
        assert profile["communication"]["language_complexity"] is not None
        # ...but user's explicit "formal" tone must be preserved
        assert profile["communication"]["tone"] == "formal"
