"""Shared test fixtures for Learner Profile API tests."""

import asyncio
import os
from unittest.mock import AsyncMock, MagicMock

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import JSON  # JSON base type for SQLite fallback
from sqlalchemy.dialects.postgresql import JSONB  # dialect-specific, not in SQLModel
from sqlalchemy.ext.asyncio import (  # async engine not in SQLModel
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import StaticPool  # pool classes not in SQLModel
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

# Set test environment variables before importing app modules
os.environ["DEV_MODE"] = "true"
os.environ["REDIS_URL"] = ""
os.environ["DATABASE_URL"] = "sqlite+aiosqlite://"
os.environ["ALLOWED_ORIGINS"] = "http://localhost:3000,http://test.com"
os.environ["GDPR_HASH_SALT"] = "test-salt-must-be-at-least-32-chars-long"
os.environ["AUTO_CREATE_SCHEMA"] = "true"  # Tests need schema auto-creation


@pytest.fixture(scope="session")
def event_loop():
    """Create event loop for async tests."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


def _remap_jsonb_to_json(ddl_compiler, column, **kw):
    """Replace JSONB columns with JSON for SQLite compatibility."""
    if isinstance(column.element.type, JSONB):
        column.element.type = JSON()
    return ddl_compiler.visit_create_column(column, **kw)


@pytest.fixture
async def db_engine():
    """Create an in-memory SQLite async engine for testing."""
    engine = create_async_engine(
        "sqlite+aiosqlite://",
        poolclass=StaticPool,
        connect_args={"check_same_thread": False},
    )

    # Import models to register them
    from learner_profile_api.models.profile import LearnerProfile, ProfileAuditLog  # noqa: F401

    # Rewrite JSONB -> JSON in all table columns so SQLite DDL succeeds
    for table in SQLModel.metadata.tables.values():
        for column in table.columns:
            if isinstance(column.type, JSONB):
                column.type = JSON()

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    yield engine

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)

    await engine.dispose()


@pytest.fixture
async def db_session(db_engine):
    """Create a database session for testing."""
    session_factory = async_sessionmaker(
        db_engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )

    async with session_factory() as session:
        yield session


@pytest.fixture(autouse=True)
def _configure_api_infra():
    """Configure api_infra with mock settings for every test."""
    import api_infra
    from api_infra.core import redis_cache
    from api_infra.core.rate_limit import (
        _memory_store as rl_memory_store,
    )

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
    # Clear in-memory rate limit state between tests
    rl_memory_store.clear()


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
async def client(db_engine, mock_redis):
    """Create an async test client with database session and Redis overrides."""
    from unittest.mock import patch

    from learner_profile_api.core.database import get_session
    from learner_profile_api.main import app

    session_factory = async_sessionmaker(
        db_engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )

    async def _override_get_session():
        async with session_factory() as session:
            yield session

    app.dependency_overrides[get_session] = _override_get_session

    # Provide mock Redis so cache operations (including GDPR invalidation) work.
    # Patch at both the source and the import site to cover all call paths.
    with (
        patch("api_infra.core.redis_cache.get_redis", return_value=mock_redis),
        patch("learner_profile_api.services.cache.get_redis", return_value=mock_redis),
    ):
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            yield ac

    app.dependency_overrides.clear()


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
def sample_profile_create():
    """Minimal profile creation payload."""
    return {"consent_given": True}


@pytest.fixture
def sample_profile_create_full():
    """Full profile creation payload with all sections."""
    return {
        "consent_given": True,
        "name": "Test User",
        "expertise": {
            "domain": [
                {
                    "level": "intermediate",
                    "domain_name": "Finance",
                    "is_primary": True,
                }
            ],
            "programming": {"level": "advanced", "languages": ["Python", "JavaScript"]},
            "ai_fluency": {"level": "beginner"},
            "business": {"level": "intermediate"},
        },
        "delivery": {
            "native_language": "ur",
            "preferred_code_language": "Python",
        },
        "goals": {
            "primary_learning_goal": "Build AI agents for my company",
            "urgency": "high",
        },
        "professional_context": {
            "current_role": "Software Engineer",
            "industry": "Fintech",
        },
    }
