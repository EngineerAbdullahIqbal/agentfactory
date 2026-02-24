"""Redis caching infrastructure with retry and exponential backoff."""

import json
import logging
from collections.abc import Callable
from datetime import datetime, time
from functools import wraps
from typing import Any

import redis.asyncio
import redis.asyncio.retry
import redis.backoff
import redis.exceptions
from pydantic import BaseModel

logger = logging.getLogger(__name__)

# Module-level settings, configured via _configure_settings()
_settings: Any = None
_default_cache_ttl: int = 2592000  # 30 days fallback

_aredis: redis.asyncio.Redis | None = None


def _configure_settings(settings: Any) -> None:
    """Called by api_infra.configure() to push settings into this module."""
    global _settings, _default_cache_ttl
    _settings = settings
    _default_cache_ttl = getattr(settings, "content_cache_ttl", 2592000)


async def start_redis() -> None:
    """Initialize Redis connection with retry and exponential backoff."""
    global _aredis

    if _settings is None:
        logger.warning("[Redis] Settings not configured, call api_infra.configure() first")
        return

    if not _settings.redis_url or _settings.redis_url.strip() == "":
        logger.warning("[Redis] REDIS_URL not provided, caching will be disabled")
        return

    # Log connection attempt (mask password)
    url_parts = _settings.redis_url.split("@")
    if len(url_parts) > 1:
        safe_url = f"redis://***@{url_parts[-1]}"
    else:
        safe_url = "redis://***"
    logger.info("[Redis] Connecting to: %s", safe_url)
    logger.info("[Redis] Using SSL: %s", "rediss://" in _settings.redis_url)
    logger.info("[Redis] Password provided: %s", bool(_settings.redis_password))

    try:
        _aredis = redis.asyncio.Redis.from_url(
            _settings.redis_url,
            password=_settings.redis_password if _settings.redis_password else None,
            decode_responses=True,
            max_connections=_settings.redis_max_connections,
            retry=redis.asyncio.retry.Retry(
                backoff=redis.backoff.ExponentialBackoff(),
                retries=5,
            ),
            retry_on_error=[
                redis.exceptions.ConnectionError,
                redis.exceptions.TimeoutError,
                redis.exceptions.ReadOnlyError,
                redis.exceptions.ClusterError,
            ],
        )
        await _aredis.ping()
        logger.info("[Redis] Connected successfully!")
    except redis.exceptions.ConnectionError as e:
        logger.error("[Redis] Connection FAILED: %s", e)
        logger.warning(
            "[Redis] Check: 1) REDIS_URL format (rediss:// for SSL) "
            "2) REDIS_PASSWORD (no prefix)"
        )
        _aredis = None
    except redis.exceptions.AuthenticationError as e:
        logger.error("[Redis] Authentication FAILED: %s", e)
        logger.warning(
            "[Redis] Check REDIS_PASSWORD - should be just the token, "
            "no 'UPSTASH_REDIS_REST_TOKEN=' prefix"
        )
        _aredis = None
    except Exception as e:
        logger.error("[Redis] Unexpected error: %s", e)
        _aredis = None


async def stop_redis() -> None:
    """Close Redis connection."""
    global _aredis
    if _aredis:
        await _aredis.aclose()
        logger.info("Redis connection closed")
        _aredis = None


def get_redis() -> redis.asyncio.Redis | None:
    """Get Redis client instance, returns None if not initialized."""
    return _aredis


class CustomJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder to handle datetime, time, and other non-serializable objects."""

    def default(self, obj: Any) -> Any:
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, time):
            return obj.isoformat()
        return super().default(obj)


async def safe_redis_get(cache_key: str) -> str | None:
    """Safely get value from Redis cache, returns None on error."""
    try:
        if not _aredis:
            return None
        logger.debug("Attempting to get cache for key=%s", cache_key)
        return await _aredis.get(cache_key)
    except Exception as e:
        logger.error("Failed to get cache for key=%s: %s", cache_key, e)
        return None


async def safe_redis_set(cache_key: str, value: str, ttl: int) -> None:
    """Safely set value in Redis cache, logs error on failure."""
    try:
        if not _aredis:
            return
        logger.debug("Attempting to set cache for key=%s", cache_key)
        await _aredis.setex(cache_key, ttl, value)
    except Exception as e:
        logger.error("Failed to set cache for key=%s: %s", cache_key, e)


def serialize_result(result: Any) -> str:
    """Serialize result to JSON, handling Pydantic models properly."""
    if isinstance(result, BaseModel):
        return json.dumps(result.model_dump(), cls=CustomJSONEncoder)
    elif isinstance(result, list):
        if result and len(result) > 0 and isinstance(result[0], BaseModel):
            return json.dumps(
                [item.model_dump() for item in result],
                cls=CustomJSONEncoder,
            )
        return json.dumps(result, cls=CustomJSONEncoder)
    else:
        return json.dumps(result, cls=CustomJSONEncoder)


def cache_response(ttl: int | None = None):
    """
    Caching decorator with Pydantic model handling.

    Features:
    - Automatic cache key generation from function signature
    - Graceful degradation if Redis unavailable
    - Proper serialization of Pydantic models

    Usage:
        @cache_response(ttl=3600)
        async def get_lesson_content(lesson_id: str) -> dict:
            ...
    """
    def decorator(func: Callable[..., Any]):
        @wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            # Resolve TTL at call time so settings.content_cache_ttl is available
            effective_ttl = ttl if ttl is not None else _default_cache_ttl
            if not _aredis:
                logger.debug("Redis not available, executing function directly")
                return await func(*args, **kwargs)

            # Create cache key from function name and arguments
            module_name = func.__module__.split('.')[-1]
            args_str = ':'.join(map(str, args))
            excluded = {'redis_client', 'session', 'request'}
            kwargs_str = ':'.join(f'{k}={v}' for k, v in kwargs.items() if k not in excluded)
            cache_key = f"{module_name}.{func.__name__}:{args_str}:{kwargs_str}"

            # Attempt to retrieve from cache
            cached_data = await safe_redis_get(cache_key)
            if cached_data:
                try:
                    logger.info("Cache hit for key=%s", cache_key)
                    return json.loads(cached_data)
                except Exception as e:
                    logger.error("Error deserializing cache for key=%s: %s", cache_key, e)

            # Call the original function
            result = await func(*args, **kwargs)

            # Store the result in cache
            if result is not None:
                try:
                    cache_value = serialize_result(result)
                    await safe_redis_set(cache_key, cache_value, effective_ttl)
                    logger.info("Cache set for key=%s", cache_key)
                except Exception as e:
                    logger.error("Error serializing result for cache key=%s: %s", cache_key, e)

            return result

        return wrapper

    return decorator
