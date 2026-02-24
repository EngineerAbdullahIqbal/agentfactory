"""Tests for lesson access idempotency."""

from unittest.mock import AsyncMock, patch

import pytest


class TestIdempotency:
    """Test lesson access idempotency via Redis keys."""

    @pytest.mark.asyncio
    async def test_first_access_charges_credits(self, mock_redis):
        """Test first lesson access triggers metering check."""
        mock_redis.get = AsyncMock(return_value=None)  # No idempotency key

        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(return_value={"allowed": True, "reservation_id": "res-1"})
        mock_metering.deduct = AsyncMock(return_value={"status": "ok"})

        from content_api.routes.content import get_lesson

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("api_infra.core.redis_cache._aredis", mock_redis):
                with patch("content_api.routes.content.load_lesson_content") as mock_load:
                    mock_load.return_value = {
                        "content": "# Content",
                        "frontmatter_dict": {},
                        "chapter_slug": "ch",
                        "lesson_slug": "ls",
                        "found": True,
                    }

                    from unittest.mock import MagicMock

                    from api_infra.auth import CurrentUser

                    mock_request = MagicMock()
                    mock_request.headers = {}
                    mock_response = MagicMock()
                    mock_response.headers = {}
                    user = CurrentUser({"sub": "user-1", "email": "u@test.com"})

                    result = await get_lesson(
                        request=mock_request,
                        response=mock_response,
                        part="pt",
                        chapter="ch",
                        lesson="ls",
                        user=user,
                    )

        mock_metering.check.assert_called_once()
        assert result.credit_charged is True

    @pytest.mark.asyncio
    async def test_second_access_within_hour_free(self, mock_redis):
        """Test second access within 1h idempotency window skips metering."""
        mock_redis.get = AsyncMock(return_value="1")  # Idempotency key exists

        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(return_value={"allowed": True, "reservation_id": "res-2"})

        from content_api.routes.content import get_lesson

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("api_infra.core.redis_cache._aredis", mock_redis):
                with patch("content_api.routes.content.load_lesson_content") as mock_load:
                    mock_load.return_value = {
                        "content": "# Content",
                        "frontmatter_dict": {},
                        "chapter_slug": "ch",
                        "lesson_slug": "ls",
                        "found": True,
                    }

                    from unittest.mock import MagicMock

                    from api_infra.auth import CurrentUser

                    mock_request = MagicMock()
                    mock_request.headers = {}
                    mock_response = MagicMock()
                    mock_response.headers = {}
                    user = CurrentUser({"sub": "user-1", "email": "u@test.com"})

                    result = await get_lesson(
                        request=mock_request,
                        response=mock_response,
                        part="pt",
                        chapter="ch",
                        lesson="ls",
                        user=user,
                    )

        # Metering should NOT be called because idempotency key was found
        mock_metering.check.assert_not_called()
        assert result.credit_charged is False

    @pytest.mark.asyncio
    async def test_redis_down_charges_normally(self, mock_redis):
        """Test that Redis failure doesn't block metering."""
        mock_redis.get = AsyncMock(side_effect=Exception("Redis down"))

        mock_metering = AsyncMock()
        mock_metering.check = AsyncMock(return_value={"allowed": True, "reservation_id": "res-3"})
        mock_metering.deduct = AsyncMock(return_value={"status": "ok"})

        from content_api.routes.content import get_lesson

        with patch("content_api.routes.content.get_metering_client", return_value=mock_metering):
            with patch("api_infra.core.redis_cache._aredis", mock_redis):
                with patch("content_api.routes.content.load_lesson_content") as mock_load:
                    mock_load.return_value = {
                        "content": "# Content",
                        "frontmatter_dict": {},
                        "chapter_slug": "ch",
                        "lesson_slug": "ls",
                        "found": True,
                    }

                    from unittest.mock import MagicMock

                    from api_infra.auth import CurrentUser

                    mock_request = MagicMock()
                    mock_request.headers = {}
                    mock_response = MagicMock()
                    mock_response.headers = {}
                    user = CurrentUser({"sub": "user-1", "email": "u@test.com"})

                    result = await get_lesson(
                        request=mock_request,
                        response=mock_response,
                        part="pt",
                        chapter="ch",
                        lesson="ls",
                        user=user,
                    )

        # Should still charge (fail-open for idempotency)
        mock_metering.check.assert_called_once()
        assert result.credit_charged is True
