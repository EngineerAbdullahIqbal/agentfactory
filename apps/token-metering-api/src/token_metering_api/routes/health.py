"""Health check endpoint.

Lightweight — no DB or Redis hits. Cloud Run uses TCP probes for liveness.
This endpoint exists for manual checks and uptime monitors only.
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
    """Lightweight health check — no DB or Redis hits."""
    return {"status": "healthy", "version": "6.0.0"}
