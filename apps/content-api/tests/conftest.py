"""Shared test fixtures for Content API tests."""

import asyncio
import os
from unittest.mock import AsyncMock, MagicMock

import pytest

# Set test environment variables before importing app modules
os.environ["DEV_MODE"] = "true"
os.environ["REDIS_URL"] = ""
os.environ["ALLOWED_ORIGINS"] = "http://localhost:3000,http://test.com"


@pytest.fixture(scope="session")
def event_loop():
    """Create event loop for async tests."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(autouse=True)
def _configure_api_infra():
    """Configure api_infra with mock settings for every test."""
    import api_infra
    from api_infra.core import redis_cache

    mock_settings = MagicMock()
    mock_settings.sso_url = "https://sso.example.com"
    mock_settings.dev_mode = True
    mock_settings.dev_user_id = "dev-user-123"
    mock_settings.dev_user_email = "dev@localhost"
    mock_settings.dev_user_name = "Dev User"
    mock_settings.redis_url = ""
    mock_settings.redis_password = ""
    mock_settings.redis_max_connections = 10
    mock_settings.content_cache_ttl = 2592000

    api_infra.configure(mock_settings)

    yield

    redis_cache._aredis = None


@pytest.fixture
def mock_redis():
    """Mock Redis client for testing."""
    mock = AsyncMock()
    mock.ping = AsyncMock(return_value=True)
    mock.get = AsyncMock(return_value=None)
    mock.set = AsyncMock(return_value=True)
    mock.setex = AsyncMock(return_value=True)
    mock.delete = AsyncMock(return_value=True)
    mock.evalsha = AsyncMock(return_value=[1, 60000, 0])
    mock.script_load = AsyncMock(return_value="mock_sha")
    mock.aclose = AsyncMock()
    return mock


@pytest.fixture
def sample_jwt_payload():
    """Sample JWT payload for auth testing."""
    return {
        "sub": "user-123",
        "email": "test@example.com",
        "name": "Test User",
        "role": "user",
    }


@pytest.fixture
def sample_frontmatter():
    """Sample lesson with frontmatter."""
    return """---
title: "Test Lesson"
description: "A test lesson"
sidebar_position: 3
skills:
  - skill-1
  - skill-2
learning_objectives:
  - "Understand testing"
cognitive_load: "low"
---

# Test Lesson

Content here.
"""


@pytest.fixture
def sample_github_tree_response():
    """Sample GitHub Trees API response."""
    return {
        "tree": [
            {"path": "apps/learn-app/docs/01-Foundations/README.md", "type": "blob"},
            {"path": "apps/learn-app/docs/01-Foundations/01-intro/01-welcome.md", "type": "blob"},
            {"path": "apps/learn-app/docs/01-Foundations/01-intro/02-setup.md", "type": "blob"},
            {"path": "apps/learn-app/docs/01-Foundations/02-basics/01-first.md", "type": "blob"},
            {"path": "apps/learn-app/docs/02-Advanced/01-deep/01-topic.md", "type": "blob"},
            {"path": "apps/learn-app/docs/02-Advanced/01-deep/02-topic.mdx", "type": "blob"},
            {"path": "other/file.md", "type": "blob"},
            {"path": "apps/learn-app/docs/01-Foundations/01-intro", "type": "tree"},
        ],
    }
