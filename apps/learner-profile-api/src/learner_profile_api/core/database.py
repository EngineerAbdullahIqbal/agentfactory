"""Database connection management using SQLModel."""

import logging
import ssl
from collections.abc import AsyncGenerator
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

# Async engine/session/pool are not re-exported by SQLModel
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import AsyncAdaptedQueuePool, StaticPool
from sqlmodel.ext.asyncio.session import AsyncSession

from ..config import settings

logger = logging.getLogger(__name__)


def _prepare_asyncpg_url(url: str) -> tuple[str, dict]:
    """Convert psycopg2-style URL to asyncpg-compatible URL.

    Handles:
    - Scheme conversion: postgresql:// -> postgresql+asyncpg://
    - sslmode param: asyncpg uses ssl context instead
    - channel_binding: not supported by asyncpg, stripped
    """
    parsed = urlparse(url)

    # Auto-convert scheme for asyncpg
    scheme = parsed.scheme
    if scheme == "postgresql" or scheme == "postgres":
        scheme = "postgresql+asyncpg"
    elif scheme == "postgresql+psycopg2":
        scheme = "postgresql+asyncpg"
    parsed = parsed._replace(scheme=scheme)

    query_params = parse_qs(parsed.query)
    connect_args: dict = {}

    # Strip sslmode — asyncpg uses ssl context instead
    if "sslmode" in query_params:
        sslmode = query_params.pop("sslmode")[0]
        if sslmode in ("require", "verify-ca", "verify-full"):
            ssl_context = ssl.create_default_context()
            if sslmode == "require":
                ssl_context.check_hostname = False
                ssl_context.verify_mode = ssl.CERT_NONE
            connect_args["ssl"] = ssl_context

    # Strip channel_binding — not supported by asyncpg
    query_params.pop("channel_binding", None)

    new_query = urlencode(query_params, doseq=True)
    new_parsed = parsed._replace(query=new_query)
    clean_url = urlunparse(new_parsed)

    return clean_url, connect_args


def _create_engine():
    """Create the async engine based on configuration."""
    url = settings.database_url

    # SQLite for testing
    if url.startswith("sqlite"):
        return create_async_engine(
            url,
            poolclass=StaticPool,
            echo=settings.debug,
            connect_args={"check_same_thread": False},
        )

    # PostgreSQL for production
    clean_url, connect_args = _prepare_asyncpg_url(url)
    return create_async_engine(
        clean_url,
        poolclass=AsyncAdaptedQueuePool,
        pool_size=settings.db_pool_size,
        max_overflow=5,
        pool_pre_ping=True,
        pool_recycle=1800,
        echo=settings.debug,
        connect_args=connect_args,
    )


engine = _create_engine()

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for getting database sessions."""
    async with async_session() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db() -> None:
    """Initialize database schema using create_all.

    Guarded by AUTO_CREATE_SCHEMA env var (default: False).
    Production uses Alembic migrations. Tests set AUTO_CREATE_SCHEMA=true via conftest.
    """
    from ..config import settings

    if not settings.auto_create_schema:
        logger.info("[DB] Schema auto-creation disabled (set AUTO_CREATE_SCHEMA=true to enable)")
        return

    from sqlmodel import SQLModel

    from ..models.profile import LearnerProfile, ProfileAuditLog  # noqa: F401

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    logger.info("[DB] Schema initialized")


async def close_db() -> None:
    """Close database connections."""
    await engine.dispose()
    logger.info("[DB] Connections closed")
