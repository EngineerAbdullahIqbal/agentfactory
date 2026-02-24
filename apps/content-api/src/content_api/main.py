"""Content API - book tree, lessons, and progress tracking.

Slim FastAPI app with Redis only (no Postgres, no ChatKit).
"""

import hmac
import logging
import os

from dotenv import load_dotenv

load_dotenv()

from api_infra.core.rate_limit import rate_limit  # noqa: E402
from api_infra.core.redis_cache import get_redis  # noqa: E402
from fastapi import FastAPI, HTTPException, Request, Response  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402
from pydantic import BaseModel  # noqa: E402

from .config import settings  # noqa: E402
from .core.lifespan import lifespan  # noqa: E402
from .routes.content import content_router  # noqa: E402

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Content API",
    description="Book tree, lessons, and progress tracking",
    version="0.1.0",
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount content routes
app.include_router(content_router)


@app.get("/health")
@rate_limit("health", max_requests=500, period_minutes=1)
async def health_check(request: Request, response: Response):
    """Health check endpoint with Redis status."""
    status = {"status": "healthy", "version": "0.1.0", "services": {}}

    redis_client = get_redis()
    if redis_client:
        try:
            await redis_client.ping()
            status["services"]["redis"] = "ok"
        except Exception as e:
            status["services"]["redis"] = f"error: {str(e)}"
    else:
        status["services"]["redis"] = "not_initialized"

    return status


class InvalidateCacheRequest(BaseModel):
    """Request body for cache invalidation."""

    paths: list[str] = []


@app.post("/admin/invalidate-cache")
async def invalidate_cache(
    request: Request,
    body: InvalidateCacheRequest = InvalidateCacheRequest(),
):
    """Invalidate content cache. Called by GitHub Action on push to main."""
    admin_secret = os.getenv("ADMIN_SECRET", "")
    provided_secret = request.headers.get("X-Admin-Secret", "")

    if not admin_secret or not hmac.compare_digest(provided_secret, admin_secret):
        raise HTTPException(status_code=403, detail="Invalid admin secret")

    redis_client = get_redis()
    if not redis_client:
        return {"status": "skipped", "reason": "Redis not available"}

    paths = body.paths

    try:
        invalidated = []
        if paths:
            # Invalidate book tree (structure may have changed)
            await redis_client.delete("book_tree:v1")
            invalidated.append("book_tree:v1")
            # Invalidate specific lesson cache keys
            for path in paths:
                # Cache keys from @cache_response: content_loader.load_lesson_content:{args}
                cursor = 0
                while True:
                    cursor, keys = await redis_client.scan(
                        cursor, match=f"content_loader.*{path}*", count=100
                    )
                    if keys:
                        await redis_client.delete(*keys)
                        invalidated.extend([k for k in keys])
                    if cursor == 0:
                        break
                logger.info("[Cache] Invalidated path: %s by %s", path, request.client.host if request.client else "unknown")
        else:
            # Invalidate book tree and all content
            await redis_client.delete("book_tree:v1")
            invalidated.append("book_tree:v1")
            cursor = 0
            while True:
                cursor, keys = await redis_client.scan(cursor, match="content_loader.*", count=100)
                if keys:
                    await redis_client.delete(*keys)
                    invalidated.extend([k for k in keys])
                if cursor == 0:
                    break
            logger.info("[Cache] Invalidated %d keys by %s", len(invalidated), request.client.host if request.client else "unknown")

        return {
            "status": "ok",
            "invalidated_count": len(invalidated),
        }
    except Exception as e:
        logger.error("[Cache] Invalidation failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    port = settings.port
    logger.info("\n=== Content API v0.1 ===")
    logger.info("Dev Mode: %s", settings.dev_mode)
    logger.info("Health:  http://localhost:%d/health\n", port)

    uvicorn.run(app, host="0.0.0.0", port=port)
