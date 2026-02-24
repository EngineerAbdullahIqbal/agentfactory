"""E2E tests for metering integration.

When METERING_ENABLED=true, the Content API calls the metering service
for check/deduct/release via HTTP. These tests exercise the real HTTP flow
through the metering client, mocked at the transport level by respx.

No mocks of internal functions — the MeteringClient makes real httpx calls
that respx intercepts.
"""

import json

import httpx as httpx_mod
from httpx import Response

from .conftest import auth_header

# ═══════════════════════════════════════════════════════════════════════════
# Happy path — metering allows, content served, credit charged
# ═══════════════════════════════════════════════════════════════════════════


class TestMeteringHappyPath:
    """Metering enabled, balance sufficient, full reserve-serve-deduct cycle."""

    async def test_lesson_with_metering_charges_credit(self, client, make_token, enable_metering):
        """When metering allows, credit_charged should be True."""
        token = make_token()

        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 200
        assert resp.json()["credit_charged"] is True

    async def test_check_sends_user_id_and_model(self, client, make_token, enable_metering):
        """Metering check should include user_id and model=content-access."""
        token = make_token(sub="metered-user-1")

        await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        assert enable_metering["check"].called
        check_request = enable_metering["check"].calls.last.request
        body = json.loads(check_request.content)
        assert body["user_id"] == "metered-user-1"
        assert body["model"] == "content-access"

    async def test_deduct_called_after_successful_content(
        self, client, make_token, enable_metering
    ):
        """Both check and deduct should be called for a successful lesson fetch."""
        token = make_token()

        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 200
        assert enable_metering["check"].called
        assert enable_metering["deduct"].called
        assert not enable_metering["release"].called  # no release on success


# ═══════════════════════════════════════════════════════════════════════════
# Denied — insufficient balance, suspended account
# ═══════════════════════════════════════════════════════════════════════════


class TestMeteringDenied:
    """Metering check denies access — user gets appropriate HTTP error."""

    async def test_insufficient_balance_returns_402(self, client, make_token, enable_metering):
        enable_metering["check"].mock(
            return_value=Response(
                402,
                json={
                    "error_code": "INSUFFICIENT_BALANCE",
                    "message": "Not enough credits",
                    "balance": 0,
                    "available_balance": 0,
                    "required": 1,
                },
            )
        )

        token = make_token()
        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 402

    async def test_suspended_account_returns_403(self, client, make_token, enable_metering):
        enable_metering["check"].mock(
            return_value=Response(
                403,
                json={
                    "error_code": "ACCOUNT_SUSPENDED",
                    "message": "Account suspended",
                },
            )
        )

        token = make_token()
        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 403


# ═══════════════════════════════════════════════════════════════════════════
# Resilience — fail-closed on timeout, release on content failure
# ═══════════════════════════════════════════════════════════════════════════


class TestMeteringResilience:
    """Metering API failures block content access (fail-closed)."""

    async def test_check_timeout_blocks_content(self, client, make_token, enable_metering):
        """When metering API times out, content must NOT be served (fail-closed)."""

        def _raise_timeout(request):
            raise httpx_mod.ConnectTimeout("metering check timed out")

        enable_metering["check"].mock(side_effect=_raise_timeout)

        token = make_token()
        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        # Fail-closed: content NOT served when credits can't be verified
        assert resp.status_code == 503
        assert "unavailable" in resp.json()["detail"].lower()

    async def test_check_connection_error_blocks_content(self, client, make_token, enable_metering):
        """When metering API is unreachable, content must NOT be served."""

        def _raise_connection_error(request):
            raise httpx_mod.ConnectError("metering service unreachable")

        enable_metering["check"].mock(side_effect=_raise_connection_error)

        token = make_token()
        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "01-Foundations",
                "chapter": "01-intro",
                "lesson": "01-welcome",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 503

    async def test_release_called_when_content_not_found(self, client, make_token, enable_metering):
        """When metering reserves but content is 404, reservation should be released."""
        token = make_token()

        resp = await client.get(
            "/api/v1/content/lesson",
            params={
                "part": "99-Nonexistent",
                "chapter": "99-fake",
                "lesson": "99-missing",
            },
            headers=auth_header(token),
        )

        assert resp.status_code == 404
        # Check was called (reservation made)
        assert enable_metering["check"].called
        # Release was called (reservation freed because content not found)
        assert enable_metering["release"].called
        # Deduct was NOT called (content never served)
        assert not enable_metering["deduct"].called


# ═══════════════════════════════════════════════════════════════════════════
# Idempotency — second access skips metering
# ═══════════════════════════════════════════════════════════════════════════


class TestMeteringIdempotency:
    """Idempotent access within window skips metering entirely."""

    async def test_second_access_skips_metering_check(
        self, client, make_token, enable_metering, fake_redis_client
    ):
        """After first metered access, second access within window doesn't re-charge."""
        token = make_token(sub="idem-metered-user")
        params = {
            "part": "01-Foundations",
            "chapter": "01-intro",
            "lesson": "01-welcome",
        }

        # First access: metering charged
        resp1 = await client.get(
            "/api/v1/content/lesson", params=params, headers=auth_header(token)
        )
        assert resp1.status_code == 200
        assert resp1.json()["credit_charged"] is True
        first_check_count = enable_metering["check"].call_count

        # Second access: idempotent, skips metering
        resp2 = await client.get(
            "/api/v1/content/lesson", params=params, headers=auth_header(token)
        )
        assert resp2.status_code == 200
        # Metering check should NOT have been called again
        assert enable_metering["check"].call_count == first_check_count
