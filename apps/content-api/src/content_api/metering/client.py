"""HTTP client for token-metering-api.

Fail-closed: if metering is enabled but unreachable, content is NOT served.
This protects revenue — users must have verified credits to access lessons.
"""

import asyncio
import logging
from dataclasses import dataclass, field
from typing import Any

import httpx

from ..config import settings

logger = logging.getLogger(__name__)

# Timeout for metering API calls (15 seconds - cold start includes JWKS + DB init)
METERING_TIMEOUT = 15.0


@dataclass
class CheckResult:
    """Result of a metering check (balance pre-verification)."""

    allowed: bool
    reservation_id: str | None = None
    error_code: str | None = None
    message: str | None = None
    balance: float = 0
    available_balance: float = 0
    required: float = 0
    is_expired: bool = False
    extra: dict[str, Any] = field(default_factory=dict)

    def get(self, key: str, default: Any = None) -> Any:
        """Dict-compatible get() for backwards compatibility."""
        if hasattr(self, key):
            val = getattr(self, key)
            return val if val is not None else default
        return self.extra.get(key, default)


@dataclass
class MutationResult:
    """Result of a metering deduct or release operation."""

    status: str  # "ok" | "failed"
    error: str | None = None
    extra: dict[str, Any] = field(default_factory=dict)

    def get(self, key: str, default: Any = None) -> Any:
        """Dict-compatible get() for backwards compatibility."""
        if hasattr(self, key):
            val = getattr(self, key)
            return val if val is not None else default
        return self.extra.get(key, default)


class MeteringClient:
    """
    Async HTTP client for the token-metering-api.

    Provides check/deduct/release operations for the reservation pattern.
    Fail-closed: unreachable metering API blocks content access.
    """

    def __init__(self, base_url: str | None = None):
        self.base_url = (base_url or settings.metering_api_url).rstrip("/")
        self._client: httpx.AsyncClient | None = None
        self._lock = asyncio.Lock()

    async def _get_client(self) -> httpx.AsyncClient:
        if self._client is None:
            async with self._lock:
                if self._client is None:  # double-check after acquiring lock
                    self._client = httpx.AsyncClient(
                        base_url=self.base_url,
                        timeout=METERING_TIMEOUT,
                    )
        return self._client

    async def close(self) -> None:
        if self._client:
            await self._client.aclose()
            self._client = None

    async def check(
        self,
        user_id: str,
        request_id: str,
        estimated_tokens: int,
        model: str,
        lesson_path: str | None = None,
        context: dict[str, Any] | None = None,
        auth_token: str | None = None,
    ) -> CheckResult:
        """Pre-request balance check with reservation."""
        client = await self._get_client()

        payload: dict[str, Any] = {
            "user_id": user_id,
            "request_id": request_id,
            "estimated_tokens": estimated_tokens,
            "model": model,
        }
        if lesson_path or context:
            merged_context = context.copy() if context else {}
            if lesson_path:
                merged_context["lesson_path"] = lesson_path
            payload["context"] = merged_context

        try:
            headers = {"X-User-ID": user_id}
            if auth_token:
                headers["Authorization"] = auth_token

            response = await client.post(
                "/api/v1/metering/check",
                json=payload,
                headers=headers,
            )

            if response.status_code == 200:
                body = response.json()
                return CheckResult(
                    allowed=body.get("allowed", True),
                    reservation_id=body.get("reservation_id"),
                    balance=body.get("balance", 0),
                    available_balance=body.get("available_balance", 0),
                    extra=body,
                )
            elif response.status_code == 402:
                body = response.json()
                return CheckResult(
                    allowed=False,
                    error_code=body.get("error_code", "INSUFFICIENT_BALANCE"),
                    message=body.get("message", "Balance check failed"),
                    balance=body.get("balance", 0),
                    available_balance=body.get("available_balance", 0),
                    required=body.get("required", 0),
                    is_expired=body.get("is_expired", False),
                )
            elif response.status_code == 403:
                body = response.json()
                error_code = body.get("error_code") or body.get("detail", {}).get(
                    "error_code", "ACCOUNT_SUSPENDED"
                )
                message = body.get("message") or body.get("detail", {}).get(
                    "message", "Account suspended"
                )
                return CheckResult(
                    allowed=False,
                    error_code=error_code,
                    message=message,
                )
            elif response.status_code == 409:
                body = response.json()
                return CheckResult(
                    allowed=False,
                    error_code=body.get("error_code", "REQUEST_ID_CONFLICT"),
                    message=body.get("message", "Request ID already used"),
                )
            else:
                logger.error(
                    "[Metering] Check failed: status=%d, body=%s", response.status_code, response.text
                )
                return CheckResult(
                    allowed=False,
                    error_code="SERVICE_UNAVAILABLE",
                    message=f"Credit verification failed (HTTP {response.status_code})",
                )

        except httpx.TimeoutException as e:
            logger.error("[Metering] Check request timeout: %s", type(e).__name__)
            return CheckResult(
                allowed=False,
                error_code="SERVICE_UNAVAILABLE",
                message="Credit verification service timed out",
            )
        except httpx.HTTPError as e:
            logger.error("[Metering] Check request failed: %s: %s", type(e).__name__, e)
            return CheckResult(
                allowed=False,
                error_code="SERVICE_UNAVAILABLE",
                message="Credit verification service unreachable",
            )

    async def deduct(
        self,
        user_id: str,
        request_id: str,
        reservation_id: str,
        input_tokens: int,
        output_tokens: int,
        model: str,
        lesson_path: str | None = None,
        auth_token: str | None = None,
    ) -> MutationResult:
        """Post-request token deduction (finalize reservation)."""
        client = await self._get_client()

        payload: dict[str, Any] = {
            "user_id": user_id,
            "request_id": request_id,
            "reservation_id": reservation_id,
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "model": model,
        }
        if lesson_path:
            payload["context"] = {"lesson_path": lesson_path}

        try:
            headers = {"X-User-ID": user_id}
            if auth_token:
                headers["Authorization"] = auth_token

            response = await client.post(
                "/api/v1/metering/deduct",
                json=payload,
                headers=headers,
            )

            if response.status_code == 200:
                return MutationResult(status="ok", extra=response.json())
            else:
                logger.error(
                    "[Metering] Deduct failed: status=%d, body=%s", response.status_code, response.text
                )
                return MutationResult(status="failed", error=response.text)

        except httpx.TimeoutException as e:
            logger.error("[Metering] Deduct request timeout: %s", type(e).__name__)
            return MutationResult(status="failed", error="timeout")
        except httpx.HTTPError as e:
            logger.error("[Metering] Deduct request failed: %s: %s", type(e).__name__, e)
            return MutationResult(status="failed", error=str(e))

    async def release(
        self,
        user_id: str,
        request_id: str,
        reservation_id: str,
        auth_token: str | None = None,
    ) -> MutationResult:
        """Cancel reservation on failure."""
        client = await self._get_client()

        payload = {
            "user_id": user_id,
            "request_id": request_id,
            "reservation_id": reservation_id,
        }

        try:
            headers = {"X-User-ID": user_id}
            if auth_token:
                headers["Authorization"] = auth_token

            response = await client.post(
                "/api/v1/metering/release",
                json=payload,
                headers=headers,
            )

            if response.status_code == 200:
                return MutationResult(status="ok", extra=response.json())
            else:
                logger.warning(
                    "[Metering] Release failed: status=%d, body=%s",
                    response.status_code, response.text,
                )
                return MutationResult(status="failed", error=response.text)

        except httpx.TimeoutException as e:
            logger.warning("[Metering] Release request timeout: %s", type(e).__name__)
            return MutationResult(status="failed", error="timeout")
        except httpx.HTTPError as e:
            logger.warning("[Metering] Release request failed: %s: %s", type(e).__name__, e)
            return MutationResult(status="failed", error=str(e))


# Module-level client instance (lazy initialization)
_client: MeteringClient | None = None


def get_metering_client() -> MeteringClient | None:
    """Get the global metering client instance. Returns None if metering is disabled."""
    global _client

    if not settings.metering_enabled or not settings.metering_api_url:
        return None

    if _client is None:
        _client = MeteringClient()

    return _client
