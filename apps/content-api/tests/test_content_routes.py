"""Tests for content API routes."""

from unittest.mock import AsyncMock, patch

from fastapi.testclient import TestClient

from content_api.main import app

client = TestClient(app)


def _auth_headers():
    """Dev mode headers (dev mode is on in test env)."""
    return {}


class TestGetTree:
    """Test GET /api/v1/content/tree."""

    def test_get_tree_returns_structure(self):
        """Test tree endpoint returns BookTreeResponse structure."""
        with patch(
            "content_api.routes.content.build_book_tree",
        ) as mock_build:
            from content_api.schemas import BookTreeResponse, ChapterMeta, LessonMeta, PartMeta

            mock_build.return_value = BookTreeResponse(
                parts=[
                    PartMeta(
                        slug="01-Foundations",
                        title="Foundations",
                        chapters=[
                            ChapterMeta(
                                slug="01-intro",
                                title="Intro",
                                lessons=[LessonMeta(slug="01-welcome", title="Welcome")],
                            )
                        ],
                    )
                ],
                total_lessons=1,
                total_chapters=1,
            )

            response = client.get("/api/v1/content/tree", headers=_auth_headers())

        assert response.status_code == 200
        data = response.json()
        assert "parts" in data
        assert data["total_lessons"] == 1
        assert data["parts"][0]["slug"] == "01-Foundations"

    def test_get_tree_requires_auth(self):
        """Test tree endpoint requires authentication when dev_mode is off."""
        import api_infra

        original_dev_mode = api_infra._settings.dev_mode
        api_infra._settings.dev_mode = False

        try:
            with patch("api_infra.core.redis_cache._aredis", None):
                response = client.get("/api/v1/content/tree")
            assert response.status_code == 401
        finally:
            api_infra._settings.dev_mode = original_dev_mode


class TestGetLesson:
    """Test GET /api/v1/content/lesson."""

    def test_get_lesson_returns_content_with_frontmatter(self):
        """Test lesson endpoint returns content with parsed frontmatter."""
        with patch("content_api.routes.content.load_lesson_content") as mock_load:
            mock_load.return_value = {
                "content": "---\ntitle: Test\n---\n# Test",
                "frontmatter_dict": {"title": "Test"},
                "chapter_slug": "01-intro",
                "lesson_slug": "01-welcome",
                "found": True,
            }
            with patch("content_api.routes.content.get_metering_client", return_value=None):
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=01-Foundations&chapter=01-intro&lesson=01-welcome",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 200
        data = response.json()
        assert data["chapter_slug"] == "01-intro"
        assert data["lesson_slug"] == "01-welcome"
        assert data["frontmatter"]["title"] == "Test"

    def test_get_lesson_404_not_found(self):
        """Test 404 when lesson not found."""
        with patch("content_api.routes.content.load_lesson_content") as mock_load:
            mock_load.return_value = None
            with patch("content_api.routes.content.get_metering_client", return_value=None):
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=01-Foundations&chapter=01-intro&lesson=99-nonexistent",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 404

    def test_get_lesson_metering_disabled_serves(self):
        """Test lesson served when metering is disabled."""
        with patch("content_api.routes.content.load_lesson_content") as mock_load:
            mock_load.return_value = {
                "content": "# Free Content",
                "frontmatter_dict": {},
                "chapter_slug": "ch",
                "lesson_slug": "ls",
                "found": True,
            }
            with patch("content_api.routes.content.get_metering_client", return_value=None):
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=pt&chapter=ch&lesson=ls",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 200
        assert response.json()["credit_charged"] is False

    def test_get_lesson_402_insufficient_balance(self):
        """Test 402 when metering returns insufficient balance."""
        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(
            return_value={
                "allowed": False,
                "error_code": "INSUFFICIENT_BALANCE",
                "message": "Not enough credits",
            }
        )

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("api_infra.core.redis_cache._aredis", None):
                response = client.get(
                    "/api/v1/content/lesson?part=pt&chapter=ch&lesson=ls",
                    headers=_auth_headers(),
                )

        assert response.status_code == 402

    def test_get_lesson_no_frontmatter_returns_empty_dict(self):
        """Test lesson without frontmatter returns empty frontmatter."""
        with patch("content_api.routes.content.load_lesson_content") as mock_load:
            mock_load.return_value = {
                "content": "# Plain content, no frontmatter",
                "frontmatter_dict": {},
                "chapter_slug": "ch",
                "lesson_slug": "ls",
                "found": True,
            }
            with patch("content_api.routes.content.get_metering_client", return_value=None):
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=pt&chapter=ch&lesson=ls",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 200
        fm = response.json()["frontmatter"]
        assert fm["title"] == ""
        assert fm["skills"] == []

    def test_get_lesson_releases_on_content_failure(self):
        """CRITICAL: Test metering reservation is released when content load fails."""
        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(return_value={"allowed": True, "reservation_id": "res-123"})
        mock_metering.release = AsyncMock(return_value={"status": "ok"})

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("content_api.routes.content.load_lesson_content") as mock_load:
                mock_load.side_effect = Exception("Content service down")
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=pt&chapter=ch&lesson=ls",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 500
        mock_metering.release.assert_called_once()

    def test_get_lesson_releases_on_not_found(self):
        """Test metering reservation is released when content not found."""
        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(return_value={"allowed": True, "reservation_id": "res-456"})
        mock_metering.release = AsyncMock(return_value={"status": "ok"})

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("content_api.routes.content.load_lesson_content") as mock_load:
                mock_load.return_value = None
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=pt&chapter=ch&lesson=ls",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 404
        mock_metering.release.assert_called_once()

    def test_get_lesson_deducts_credits(self):
        """Test metering deduction on successful content load."""
        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(return_value={"allowed": True, "reservation_id": "res-789"})
        mock_metering.deduct = AsyncMock(return_value={"status": "ok"})

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("content_api.routes.content.load_lesson_content") as mock_load:
                mock_load.return_value = {
                    "content": "# Content",
                    "frontmatter_dict": {},
                    "chapter_slug": "ch",
                    "lesson_slug": "ls",
                    "found": True,
                }
                with patch("api_infra.core.redis_cache._aredis", None):
                    response = client.get(
                        "/api/v1/content/lesson?part=pt&chapter=ch&lesson=ls",
                        headers=_auth_headers(),
                    )

        assert response.status_code == 200
        assert response.json()["credit_charged"] is True
        mock_metering.deduct.assert_called_once()


class TestComplete:
    """Test POST /api/v1/content/complete."""

    def test_complete_forwards_to_progress(self):
        """Test completion forwarded to progress API."""
        mock_progress = AsyncMock()
        mock_progress.complete_lesson = AsyncMock(return_value={"completed": True, "xp_earned": 10})

        with patch(
            "content_api.routes.content.get_progress_client",
            return_value=mock_progress,
        ):
            response = client.post(
                "/api/v1/content/complete",
                json={
                    "chapter_slug": "01-intro",
                    "lesson_slug": "01-welcome",
                    "active_duration_secs": 120,
                },
                headers=_auth_headers(),
            )

        assert response.status_code == 200
        data = response.json()
        assert data["completed"] is True
        assert data["xp_earned"] == 10

    def test_complete_returns_xp(self):
        """Test XP is returned from progress API."""
        mock_progress = AsyncMock()
        mock_progress.complete_lesson = AsyncMock(return_value={"completed": True, "xp_earned": 25})

        with patch(
            "content_api.routes.content.get_progress_client",
            return_value=mock_progress,
        ):
            response = client.post(
                "/api/v1/content/complete",
                json={
                    "chapter_slug": "ch",
                    "lesson_slug": "ls",
                    "active_duration_secs": 60,
                },
                headers=_auth_headers(),
            )

        assert response.status_code == 200
        assert response.json()["xp_earned"] == 25

    def test_complete_503_progress_unavailable(self):
        """Test 503 when progress API not configured."""
        with patch("content_api.routes.content.get_progress_client", return_value=None):
            response = client.post(
                "/api/v1/content/complete",
                json={
                    "chapter_slug": "ch",
                    "lesson_slug": "ls",
                    "active_duration_secs": 0,
                },
                headers=_auth_headers(),
            )

        assert response.status_code == 503
