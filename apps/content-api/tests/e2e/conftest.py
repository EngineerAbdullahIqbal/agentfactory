"""E2E test infrastructure: real JWT auth, fakeredis, mocked external HTTP.

Tests exercise the full FastAPI app through its public HTTP interface.
Auth uses real RSA-signed JWTs verified against test JWKS keys.
Redis operations use fakeredis. GitHub API calls are intercepted by respx.
"""

import os
import time
from typing import Any
from unittest.mock import MagicMock

import fakeredis
import httpx
import pytest
import respx
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from httpx import Response
from jose import jwt
from jose.utils import base64url_encode

# Must set env BEFORE any content_api imports to avoid Settings picking up wrong values
os.environ["DEV_MODE"] = "false"
os.environ["REDIS_URL"] = ""
os.environ["SSO_URL"] = "http://test-sso:3001"
os.environ["GITHUB_REPO"] = "panaversity/agentfactory"
os.environ["ADMIN_SECRET"] = "test-admin-secret"

import api_infra  # noqa: E402
from api_infra.core import redis_cache  # noqa: E402

# ---------------------------------------------------------------------------
# RSA Key Pair (session-scoped, generated once)
# ---------------------------------------------------------------------------

_TEST_KID = "test-key-1"


@pytest.fixture(scope="session")
def rsa_private_key():
    """Generate RSA private key for JWT signing."""
    return rsa.generate_private_key(public_exponent=65537, key_size=2048)


@pytest.fixture(scope="session")
def rsa_private_pem(rsa_private_key):
    """PEM-encoded private key for python-jose."""
    return rsa_private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )


@pytest.fixture(scope="session")
def jwks_dict(rsa_private_key):
    """JWKS dict with the test public key."""
    pub = rsa_private_key.public_key().public_numbers()
    n_bytes = pub.n.to_bytes((pub.n.bit_length() + 7) // 8, "big")
    e_bytes = pub.e.to_bytes((pub.e.bit_length() + 7) // 8, "big")
    return {
        "keys": [
            {
                "kty": "RSA",
                "use": "sig",
                "alg": "RS256",
                "kid": _TEST_KID,
                "n": base64url_encode(n_bytes).decode(),
                "e": base64url_encode(e_bytes).decode(),
            }
        ]
    }


@pytest.fixture(scope="session")
def make_token(rsa_private_pem):
    """Factory that creates signed JWTs.

    Usage:
        token = make_token()                          # default user
        token = make_token(sub="u2", expired=True)   # expired token
    """

    def _make(
        sub: str = "test-user-1",
        email: str = "test@example.com",
        name: str = "Test User",
        expired: bool = False,
        **extra_claims: Any,
    ) -> str:
        now = int(time.time())
        claims = {
            "sub": sub,
            "email": email,
            "name": name,
            "iat": now,
            "exp": (now - 3600) if expired else (now + 3600),
            **extra_claims,
        }
        return jwt.encode(claims, rsa_private_pem, algorithm="RS256", headers={"kid": _TEST_KID})

    return _make


# ---------------------------------------------------------------------------
# fakeredis
# ---------------------------------------------------------------------------


@pytest.fixture
def fake_redis_server():
    """Shared in-memory Redis server (reset per test)."""
    return fakeredis.FakeServer()


@pytest.fixture
def fake_redis_client(fake_redis_server):
    """Async fakeredis client wired to the shared server."""
    return fakeredis.FakeAsyncRedis(server=fake_redis_server, decode_responses=True)


# ---------------------------------------------------------------------------
# api-infra configuration (overrides parent conftest)
# ---------------------------------------------------------------------------


@pytest.fixture(autouse=True)
def _configure_api_infra(fake_redis_client, monkeypatch):
    """Configure api-infra with auth enabled and fakeredis injected.

    This overrides the parent conftest's _configure_api_infra which uses DEV_MODE=true.
    Also clears content-api settings that may leak from the host environment
    (e.g. PROGRESS_API_URL, METERING_API_URL) so tests that don't explicitly
    enable those services get the expected 503.
    """
    from content_api.config import settings as content_settings

    monkeypatch.setattr(content_settings, "progress_api_url", "")
    monkeypatch.setattr(content_settings, "metering_enabled", False)
    monkeypatch.setattr(content_settings, "metering_api_url", "")

    mock_settings = MagicMock()
    mock_settings.sso_url = "http://test-sso:3001"
    mock_settings.dev_mode = False
    mock_settings.dev_user_id = ""
    mock_settings.dev_user_email = ""
    mock_settings.dev_user_name = ""
    mock_settings.redis_url = "redis://fake"
    mock_settings.redis_password = ""
    mock_settings.redis_max_connections = 10
    mock_settings.content_cache_ttl = 2592000

    api_infra.configure(mock_settings)

    # Inject fakeredis into the module-level client
    redis_cache._aredis = fake_redis_client

    # Reset progress client singleton so it picks up monkeypatched settings
    from content_api.services import progress_client as progress_mod

    progress_mod._client = None

    yield

    redis_cache._aredis = None
    progress_mod._client = None

    # Clear JWKS cache so each test starts fresh
    from api_infra import auth

    auth._jwks_cache = None
    auth._jwks_cache_time = 0


# ---------------------------------------------------------------------------
# GitHub API fixtures
# ---------------------------------------------------------------------------

GITHUB_TREE_RESPONSE = {
    "sha": "abc123",
    "tree": [
        {"path": "apps/learn-app/docs/01-Foundations/README.md", "type": "blob"},
        {
            "path": "apps/learn-app/docs/01-Foundations/01-intro/01-welcome.md",
            "type": "blob",
        },
        {
            "path": "apps/learn-app/docs/01-Foundations/01-intro/02-setup.md",
            "type": "blob",
        },
        {
            "path": "apps/learn-app/docs/01-Foundations/02-basics/01-first-steps.md",
            "type": "blob",
        },
        {
            "path": "apps/learn-app/docs/02-Advanced/01-deep-dive/01-topic-a.md",
            "type": "blob",
        },
        {
            "path": "apps/learn-app/docs/02-Advanced/01-deep-dive/02-topic-b.mdx",
            "type": "blob",
        },
    ],
    "truncated": False,
}

LESSON_WITH_FRONTMATTER = """\
---
title: "Welcome to the Course"
description: "An introductory lesson"
sidebar_position: 1
skills:
  - skill-reading
  - skill-comprehension
learning_objectives:
  - "Understand the course structure"
cognitive_load: "low"
---

# Welcome to the Course

This is the first lesson content.

## Getting Started

Follow these steps to begin.
"""

LESSON_BODY_AFTER_STRIP = """\
# Welcome to the Course

This is the first lesson content.

## Getting Started

Follow these steps to begin.
"""

LESSON_NO_FRONTMATTER = """\
# Plain Lesson

This lesson has no frontmatter at all.
"""


def _github_raw_handler(request: httpx.Request) -> Response:
    """Route GitHub raw content requests to fixture data."""
    path = str(request.url.path)
    if "01-welcome" in path:
        return Response(200, text=LESSON_WITH_FRONTMATTER)
    elif "02-setup" in path:
        return Response(200, text=LESSON_NO_FRONTMATTER)
    elif "01-first-steps" in path:
        return Response(200, text=LESSON_WITH_FRONTMATTER)
    else:
        return Response(404, text="Not Found")


# ---------------------------------------------------------------------------
# respx: mock all external HTTP (JWKS + GitHub)
# ---------------------------------------------------------------------------


@pytest.fixture(autouse=True)
def _mock_external_http(jwks_dict):
    """Intercept all external httpx calls.

    Routes:
    - SSO JWKS endpoint     -> test public key
    - GitHub Trees API       -> fixture tree
    - GitHub raw content     -> fixture lessons
    """
    with respx.mock:
        # JWKS from SSO
        respx.get("http://test-sso:3001/api/auth/jwks").mock(
            return_value=Response(200, json=jwks_dict)
        )

        # GitHub Trees API (book_tree.py uses this)
        respx.get(url__regex=r"https://api\.github\.com/repos/.+/git/trees/.+").mock(
            return_value=Response(200, json=GITHUB_TREE_RESPONSE)
        )

        # GitHub raw content (content_loader.py uses this)
        respx.get(url__startswith="https://raw.githubusercontent.com/").mock(
            side_effect=_github_raw_handler
        )

        yield


# ---------------------------------------------------------------------------
# httpx test client
# ---------------------------------------------------------------------------


@pytest.fixture
async def client():
    """Async httpx client hitting the FastAPI app directly (no network)."""
    from content_api.main import app

    # Reset the content_loader's persistent httpx client so respx intercepts it
    from content_api.services import content_loader

    content_loader._http_client = None

    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as c:
        yield c

    # Cleanup: close any httpx client created during the test
    if content_loader._http_client is not None:
        await content_loader._http_client.aclose()
        content_loader._http_client = None


def auth_header(token: str) -> dict[str, str]:
    """Build Authorization header from token."""
    return {"Authorization": f"Bearer {token}"}


# ---------------------------------------------------------------------------
# Metering + Progress fixtures (opt-in per test)
# ---------------------------------------------------------------------------

METERING_BASE = "http://test-metering:9000"
PROGRESS_BASE = "http://test-progress:9001"


@pytest.fixture
async def enable_metering(monkeypatch):
    """Enable metering and mock the metering API at transport level.

    Usage: any test that needs metering enabled just adds `enable_metering`
    to its parameter list. The fixture patches settings and registers
    respx routes within the existing mock context.

    Returns a dict of respx routes for assertion:
        routes["check"], routes["deduct"], routes["release"]
    """
    from content_api.config import settings
    from content_api.metering import client as metering_mod

    monkeypatch.setattr(settings, "metering_enabled", True)
    monkeypatch.setattr(settings, "metering_api_url", METERING_BASE)
    metering_mod._client = None

    # Default happy-path: allow with reservation, deduct ok, release ok
    check_route = respx.post(f"{METERING_BASE}/api/v1/metering/check").mock(
        return_value=Response(
            200,
            json={"allowed": True, "reservation_id": "res-test-001"},
        )
    )
    deduct_route = respx.post(f"{METERING_BASE}/api/v1/metering/deduct").mock(
        return_value=Response(200, json={"status": "ok"})
    )
    release_route = respx.post(f"{METERING_BASE}/api/v1/metering/release").mock(
        return_value=Response(200, json={"status": "ok"})
    )

    yield {"check": check_route, "deduct": deduct_route, "release": release_route}

    # Cleanup: close internal httpx client and reset singleton
    if metering_mod._client is not None:
        await metering_mod._client.close()
    metering_mod._client = None


@pytest.fixture
async def enable_progress(monkeypatch):
    """Enable progress tracking and mock the progress API.

    Returns a dict of respx routes for assertion:
        routes["complete"]
    """
    from content_api.config import settings
    from content_api.services import progress_client as progress_mod

    monkeypatch.setattr(settings, "progress_api_url", PROGRESS_BASE)
    progress_mod._client = None

    complete_route = respx.post(f"{PROGRESS_BASE}/api/v1/lesson/complete").mock(
        return_value=Response(
            200,
            json={"completed": True, "xp_earned": 10},
        )
    )

    progress_route = respx.get(f"{PROGRESS_BASE}/api/v1/progress/me").mock(
        return_value=Response(
            200,
            json={
                "completed_lessons": ["01-intro/01-welcome", "01-intro/02-setup"],
                "total_xp": 20,
            },
        )
    )

    yield {"complete": complete_route, "progress": progress_route}

    if progress_mod._client is not None:
        await progress_mod._client.close()
    progress_mod._client = None
