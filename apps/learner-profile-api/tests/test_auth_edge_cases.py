"""Auth boundary tests — P0: 401 without token, P1: dev mode bypass.

These tests require overriding the autouse DEV_MODE=true from conftest.
"""

import api_infra

BASE = "/api/v1/profiles"


class TestNoTokenReturns401:
    """P0: All endpoints without JWT should return 401 in production mode."""

    async def test_get_me_no_token(self, client):
        """GET /me without token (dev_mode=false) -> 401."""
        original = api_infra._settings.dev_mode
        api_infra._settings.dev_mode = False
        try:
            resp = await client.get(BASE + "/me")
            assert resp.status_code == 401
        finally:
            api_infra._settings.dev_mode = original

    async def test_post_no_token(self, client):
        """POST / without token (dev_mode=false) -> 401."""
        original = api_infra._settings.dev_mode
        api_infra._settings.dev_mode = False
        try:
            resp = await client.post(BASE + "/", json={"consent_given": True})
            assert resp.status_code == 401
        finally:
            api_infra._settings.dev_mode = original

    async def test_patch_me_no_token(self, client):
        """PATCH /me without token (dev_mode=false) -> 401."""
        original = api_infra._settings.dev_mode
        api_infra._settings.dev_mode = False
        try:
            resp = await client.patch(BASE + "/me", json={"name": "x"})
            assert resp.status_code == 401
        finally:
            api_infra._settings.dev_mode = original

    async def test_delete_me_no_token(self, client):
        """DELETE /me without token (dev_mode=false) -> 401."""
        original = api_infra._settings.dev_mode
        api_infra._settings.dev_mode = False
        try:
            resp = await client.delete(BASE + "/me")
            assert resp.status_code == 401
        finally:
            api_infra._settings.dev_mode = original

    async def test_onboarding_no_token(self, client):
        """GET /me/onboarding-status without token (dev_mode=false) -> 401."""
        original = api_infra._settings.dev_mode
        api_infra._settings.dev_mode = False
        try:
            resp = await client.get(BASE + "/me/onboarding-status")
            assert resp.status_code == 401
        finally:
            api_infra._settings.dev_mode = original


class TestDevModeBypassesAuth:
    """P1: DEV_MODE=true -> requests succeed without real token."""

    async def test_dev_mode_creates_profile_without_token(self, client):
        """Dev mode allows profile creation without JWT."""
        # conftest sets DEV_MODE=true, so this should work
        resp = await client.post(BASE + "/", json={"consent_given": True})
        assert resp.status_code == 201
        data = resp.json()
        # Dev mode user ID from conftest
        assert data["learner_id"] == "dev-user-123"

    async def test_dev_mode_gets_profile_without_token(self, client):
        """Dev mode allows GET /me without JWT."""
        await client.post(BASE + "/", json={"consent_given": True})
        resp = await client.get(BASE + "/me")
        assert resp.status_code == 200


class TestAdminAccessControl:
    """P0: Non-admin users cannot access admin endpoints."""

    async def test_non_admin_cannot_access_other_profile(self, client):
        """GET /admin/by-learner/{id} with non-admin user -> 403.

        In dev mode, the dev user has role="admin". We override to test 403.
        """
        from api_infra.auth import CurrentUser, get_current_user
        from learner_profile_api.config import settings as app_settings
        from learner_profile_api.main import app

        # Save originals
        original_override = app.dependency_overrides.get(get_current_user)
        original_api_dev_mode = api_infra._settings.dev_mode
        original_app_dev_mode = app_settings.dev_mode

        async def _non_admin_user():
            return CurrentUser({
                "sub": "non-admin-user",
                "email": "user@test.com",
                "name": "Regular User",
                "role": "user",
            })

        # Override dev_mode in BOTH api_infra and app config (route checks app config)
        api_infra._settings.dev_mode = False
        app_settings.dev_mode = False
        app.dependency_overrides[get_current_user] = _non_admin_user

        try:
            resp = await client.get(BASE + "/admin/by-learner/some-other-user")
            assert resp.status_code == 403
            detail = resp.json()["detail"]
            assert detail["error"] == "forbidden"
        finally:
            api_infra._settings.dev_mode = original_api_dev_mode
            app_settings.dev_mode = original_app_dev_mode
            if original_override is not None:
                app.dependency_overrides[get_current_user] = original_override
            else:
                app.dependency_overrides.pop(get_current_user, None)
