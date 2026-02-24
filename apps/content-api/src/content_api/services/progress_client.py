"""HTTP client for progress-api (completion tracking)."""

import asyncio
import logging
from typing import Any

import httpx

from ..config import settings

logger = logging.getLogger(__name__)

PROGRESS_TIMEOUT = 15.0  # Match metering timeout — cold start includes JWKS + DB init


class ProgressClient:
    """Async HTTP client for the progress API."""

    def __init__(self, base_url: str | None = None):
        self.base_url = (base_url or settings.progress_api_url).rstrip("/")
        self._client: httpx.AsyncClient | None = None
        self._lock = asyncio.Lock()

    async def _get_client(self) -> httpx.AsyncClient:
        if self._client is None:
            async with self._lock:
                if self._client is None:  # double-check after acquiring lock
                    self._client = httpx.AsyncClient(
                        base_url=self.base_url,
                        timeout=PROGRESS_TIMEOUT,
                    )
        return self._client

    async def close(self) -> None:
        if self._client:
            await self._client.aclose()
            self._client = None

    async def complete_lesson(
        self,
        chapter_slug: str,
        lesson_slug: str,
        active_duration_secs: int = 0,
        source: str = "platform",
        auth_token: str | None = None,
    ) -> dict[str, Any]:
        """Record lesson completion via progress API."""
        client = await self._get_client()

        payload = {
            "chapter_slug": chapter_slug,
            "lesson_slug": lesson_slug,
            "active_duration_secs": active_duration_secs,
            "source": source,
        }

        try:
            headers = {}
            if auth_token:
                headers["Authorization"] = auth_token

            response = await client.post(
                "/api/v1/lesson/complete",
                json=payload,
                headers=headers,
            )

            if response.status_code == 200:
                return response.json()
            else:
                logger.error(
                    "[Progress] Complete failed: status=%d, body=%s",
                    response.status_code, response.text,
                )
                return {"completed": False, "xp_earned": 0}

        except httpx.TimeoutException as e:
            logger.error("[Progress] Complete timeout: %s", type(e).__name__)
            return {"completed": False, "xp_earned": 0}
        except httpx.HTTPError as e:
            logger.error("[Progress] Complete failed: %s: %s", type(e).__name__, e)
            return {"completed": False, "xp_earned": 0}

    async def get_progress(
        self,
        auth_token: str | None = None,
    ) -> dict[str, Any]:
        """Fetch user progress from progress API."""
        client = await self._get_client()

        try:
            headers = {}
            if auth_token:
                headers["Authorization"] = auth_token

            response = await client.get(
                "/api/v1/progress/me",
                headers=headers,
            )

            if response.status_code == 200:
                return response.json()
            else:
                logger.error(
                    "[Progress] Get progress failed: status=%d, body=%s",
                    response.status_code, response.text,
                )
                return {}

        except httpx.TimeoutException as e:
            logger.error("[Progress] Get progress timeout: %s", type(e).__name__)
            return {}
        except httpx.HTTPError as e:
            logger.error("[Progress] Get progress failed: %s: %s", type(e).__name__, e)
            return {}


# Module-level client instance
_client: ProgressClient | None = None


def get_progress_client() -> ProgressClient | None:
    """Get the global progress client. Returns None if progress API not configured."""
    global _client

    if not settings.progress_api_url:
        return None

    if _client is None:
        _client = ProgressClient()

    return _client
