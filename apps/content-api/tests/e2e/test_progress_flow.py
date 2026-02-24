"""E2E tests for progress tracking integration.

POST /api/v1/content/complete calls an external progress API via HTTP.
These tests exercise the real ProgressClient HTTP flow, mocked at the
transport level by respx.
"""

import json

from .conftest import auth_header

# ═══════════════════════════════════════════════════════════════════════════
# Progress API configured — completion works
# ═══════════════════════════════════════════════════════════════════════════


class TestProgressComplete:
    """Progress API is configured and healthy."""

    async def test_complete_returns_xp(self, client, make_token, enable_progress):
        """Successful completion returns completed=True and XP earned."""
        token = make_token()

        resp = await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
                "active_duration_secs": 120,
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 200
        data = resp.json()
        assert data["completed"] is True
        assert data["xp_earned"] == 10

    async def test_complete_forwards_auth_to_progress_api(
        self, client, make_token, enable_progress
    ):
        """The Bearer token should be forwarded to the progress API."""
        token = make_token()

        await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
                "active_duration_secs": 60,
            },
            headers=auth_header(token),
        )

        assert enable_progress["complete"].called
        last_request = enable_progress["complete"].calls.last.request
        assert "Bearer" in last_request.headers.get("Authorization", "")

    async def test_complete_sends_lesson_payload(self, client, make_token, enable_progress):
        """Progress API receives the correct chapter/lesson slugs."""
        token = make_token()

        await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "02-basics",
                "lesson_slug": "01-first-steps",
                "active_duration_secs": 300,
            },
            headers=auth_header(token),
        )

        last_request = enable_progress["complete"].calls.last.request
        body = json.loads(last_request.content)
        assert body["chapter_slug"] == "02-basics"
        assert body["lesson_slug"] == "01-first-steps"
        assert body["active_duration_secs"] == 300

    async def test_complete_defaults_source_to_platform(self, client, make_token, enable_progress):
        """Without explicit source, defaults to 'platform'."""
        token = make_token()

        await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
            },
            headers=auth_header(token),
        )

        last_request = enable_progress["complete"].calls.last.request
        body = json.loads(last_request.content)
        assert body["source"] == "platform"

    async def test_complete_forwards_skill_source(self, client, make_token, enable_progress):
        """Skill completions send source='skill' to progress API."""
        token = make_token()

        await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
                "active_duration_secs": 180,
                "source": "skill",
            },
            headers=auth_header(token),
        )

        last_request = enable_progress["complete"].calls.last.request
        body = json.loads(last_request.content)
        assert body["source"] == "skill"

    async def test_complete_rejects_invalid_source(self, client, make_token, enable_progress):
        """Invalid source values are rejected by schema validation."""
        token = make_token()

        resp = await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
                "source": "hacked",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 422


# ═══════════════════════════════════════════════════════════════════════════
# Progress API not configured — 503
# ═══════════════════════════════════════════════════════════════════════════


class TestGetProgress:
    """GET /progress returns user progress + total_lessons."""

    async def test_progress_returns_data_and_total(self, client, make_token, enable_progress):
        """Happy path: returns progress data and total_lessons > 0."""
        token = make_token()

        resp = await client.get(
            "/api/v1/content/progress",
            headers=auth_header(token),
        )

        assert resp.status_code == 200
        data = resp.json()
        assert "progress" in data
        assert data["progress"]["total_xp"] == 20
        assert data["total_lessons"] > 0

    async def test_progress_forwards_auth_token(self, client, make_token, enable_progress):
        """Bearer token is forwarded to the progress API."""
        token = make_token()

        await client.get(
            "/api/v1/content/progress",
            headers=auth_header(token),
        )

        assert enable_progress["progress"].called
        last_request = enable_progress["progress"].calls.last.request
        assert "Bearer" in last_request.headers.get("Authorization", "")

    async def test_progress_503_when_not_configured(self, client, make_token):
        """Without progress API URL, progress returns 503."""
        token = make_token()

        resp = await client.get(
            "/api/v1/content/progress",
            headers=auth_header(token),
        )

        assert resp.status_code == 503


# ═══════════════════════════════════════════════════════════════════════════
# Progress API not configured — 503
# ═══════════════════════════════════════════════════════════════════════════


class TestProgressUnavailable:
    """Progress API not configured (default state)."""

    async def test_complete_503_when_not_configured(self, client, make_token):
        """Without progress API URL, complete returns 503."""
        token = make_token()

        resp = await client.post(
            "/api/v1/content/complete",
            json={
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
                "active_duration_secs": 0,
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 503
