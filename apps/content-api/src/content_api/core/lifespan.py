"""Application lifespan management for startup and shutdown."""

import logging
from contextlib import asynccontextmanager

import api_infra
from api_infra.core.redis_cache import get_redis, start_redis, stop_redis
from fastapi import FastAPI

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: Redis connection management."""
    try:
        logger.info("=" * 60)
        logger.info("CONTENT API - STARTUP")
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

        logger.info("=" * 60)
        logger.info("STARTUP COMPLETE")
        logger.info("=" * 60)

        yield

    finally:
        logger.info("=" * 60)
        logger.info("SHUTDOWN")
        logger.info("=" * 60)

        # Close persistent httpx clients
        from ..metering.client import _client as metering_client
        from ..services import content_loader
        from ..services.progress_client import _client as progress_client

        # content_loader has a bare httpx.AsyncClient
        if content_loader._http_client is not None:
            try:
                await content_loader._http_client.aclose()
                logger.info("[SHUTDOWN] Closed content_loader httpx client")
            except Exception as e:
                logger.warning("[SHUTDOWN] Error closing content_loader: %s", e)

        # metering and progress clients have .close() methods
        for name, client in [("metering", metering_client), ("progress", progress_client)]:
            if client is not None:
                try:
                    await client.close()
                    logger.info("[SHUTDOWN] Closed %s client", name)
                except Exception as e:
                    logger.warning("[SHUTDOWN] Error closing %s: %s", name, e)

        await stop_redis()

        logger.info("Shutdown complete")
