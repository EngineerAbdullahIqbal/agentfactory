"""Learner Profile API - profile CRUD, onboarding, PHM sync, progressive profiling."""

import logging

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402

from .config import settings  # noqa: E402
from .core.lifespan import lifespan  # noqa: E402
from .routes.profile import profile_router  # noqa: E402

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app — OpenAPI docs enabled in dev mode only
app = FastAPI(
    title="Learner Profile API",
    description="Profile CRUD, onboarding, PHM sync, progressive profiling",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.dev_mode else None,
    redoc_url="/redoc" if settings.dev_mode else None,
    openapi_url="/openapi.json" if settings.dev_mode else None,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=86400,
)

# Mount profile routes
app.include_router(profile_router)


@app.get("/health")
async def health_check():
    """Lightweight health check — no DB or Redis hits.

    Cloud Run uses TCP probes for liveness. This endpoint exists
    for manual checks and uptime monitors only.
    """
    return {"status": "healthy", "version": "0.1.0"}


if __name__ == "__main__":
    import uvicorn

    port = settings.port
    logger.info("\n=== Learner Profile API v0.1 ===")
    logger.info("Dev Mode: %s", settings.dev_mode)
    logger.info("Health:  http://localhost:%d/health\n", port)

    uvicorn.run(app, host="0.0.0.0", port=port)
