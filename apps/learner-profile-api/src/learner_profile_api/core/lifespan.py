"""Application lifespan management for startup and shutdown."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

import api_infra
from api_infra.core.redis_cache import get_redis, start_redis, stop_redis

from .database import close_db, init_db
from ..services.phm_client import close_client as close_phm_client

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: Redis + DB connection management."""
    try:
        logger.info("=" * 60)
        logger.info("LEARNER PROFILE API - STARTUP")
        logger.info("=" * 60)

        # Configure shared api-infra library
        from ..config import settings

        api_infra.configure(settings)

        # Initialize Redis (non-blocking)
        logger.info("[INIT] Initializing Redis...")
        await start_redis()

        redis_client = get_redis()
        if redis_client:
            logger.info("[INIT] Redis connected")
        else:
            logger.warning("[INIT] Redis NOT available - caching disabled")

        # Initialize Database
        logger.info("[INIT] Initializing Database...")
        try:
            await init_db()
            logger.info("[INIT] Database initialized")
        except Exception as e:
            logger.error("[INIT] Database initialization failed: %s", e)
            raise

        logger.info("=" * 60)
        logger.info("STARTUP COMPLETE")
        logger.info("=" * 60)

        yield

    finally:
        logger.info("=" * 60)
        logger.info("SHUTDOWN")
        logger.info("=" * 60)

        await close_phm_client()
        await close_db()
        await stop_redis()

        logger.info("Shutdown complete")
