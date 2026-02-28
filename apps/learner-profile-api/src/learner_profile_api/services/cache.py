"""Redis cache layer for profile and onboarding data.

Cache keys:
  lp:profile:{learner_id}     TTL 30min (1800s)
  lp:onboarding:{learner_id}  TTL 10min (600s)

Invalidated on any profile mutation (update, section update, onboarding, PHM sync, delete).
"""

import json
import logging

from api_infra.core.redis_cache import get_redis

from ..config import settings

logger = logging.getLogger(__name__)

# --- Cache failure monitoring (I7) ---
# GIL-safe: simple int increment/reset is atomic enough for a logging counter.
_cache_failure_count = 0
_CACHE_FAILURE_THRESHOLD = 5


def _log_cache_failure(operation: str, error: Exception) -> None:
    global _cache_failure_count
    _cache_failure_count += 1
    count = _cache_failure_count

    if count >= _CACHE_FAILURE_THRESHOLD:
        logger.error("[Cache] %d consecutive failures (operation: %s): %s", count, operation, error)
    else:
        logger.warning("[Cache] Failed %s (failure %d/%d): %s", operation, count, _CACHE_FAILURE_THRESHOLD, error)


def _reset_cache_failure_count() -> None:
    global _cache_failure_count
    _cache_failure_count = 0


def _profile_key(learner_id: str) -> str:
    return f"{settings.redis_namespace}profile:{learner_id}"


def _onboarding_key(learner_id: str) -> str:
    return f"{settings.redis_namespace}onboarding:{learner_id}"


async def get_cached_profile(learner_id: str) -> dict | None:
    """Get cached profile JSON or None if not cached."""
    redis = get_redis()
    if not redis:
        return None
    try:
        data = await redis.get(_profile_key(learner_id))
        if data:
            _reset_cache_failure_count()
            return json.loads(data)
    except Exception as e:
        _log_cache_failure("get_profile", e)
    return None


async def set_cached_profile(learner_id: str, profile_json: dict) -> None:
    """Cache profile JSON with configured TTL."""
    redis = get_redis()
    if not redis:
        return
    try:
        await redis.setex(
            _profile_key(learner_id),
            settings.cache_ttl_profile,
            json.dumps(profile_json, default=str),
        )
        _reset_cache_failure_count()
    except Exception as e:
        _log_cache_failure("set_profile", e)


async def get_cached_onboarding(learner_id: str) -> dict | None:
    """Get cached onboarding status or None."""
    redis = get_redis()
    if not redis:
        return None
    try:
        data = await redis.get(_onboarding_key(learner_id))
        if data:
            _reset_cache_failure_count()
            return json.loads(data)
    except Exception as e:
        _log_cache_failure("get_onboarding", e)
    return None


async def set_cached_onboarding(learner_id: str, status_json: dict) -> None:
    """Cache onboarding status with configured TTL."""
    redis = get_redis()
    if not redis:
        return
    try:
        await redis.setex(
            _onboarding_key(learner_id),
            settings.cache_ttl_onboarding,
            json.dumps(status_json, default=str),
        )
        _reset_cache_failure_count()
    except Exception as e:
        _log_cache_failure("set_onboarding", e)


async def invalidate_profile_cache(learner_id: str) -> None:
    """Delete all cache keys for a learner. Called on any profile mutation."""
    redis = get_redis()
    if not redis:
        return
    try:
        await redis.delete(_profile_key(learner_id), _onboarding_key(learner_id))
        _reset_cache_failure_count()
    except Exception as e:
        _log_cache_failure("invalidate", e)


async def gdpr_invalidate_profile_cache(learner_id: str) -> None:
    """Cache invalidation for GDPR erase — MUST NOT silently fail.

    Unlike regular invalidation, GDPR requires guaranteed cache removal.
    Raises on failure so the caller can abort the erase operation.
    """
    redis = get_redis()
    if not redis:
        raise RuntimeError("Redis unavailable — cannot guarantee GDPR cache invalidation")
    # No try/except — let Redis errors propagate
    await redis.delete(_profile_key(learner_id), _onboarding_key(learner_id))
