"""Core infrastructure modules for Study Mode API.

Re-exports from shared api_infra library for backwards compatibility.
"""

from api_infra.core.rate_limit import RateLimitConfig, RateLimiter, rate_limit
from api_infra.core.redis_cache import (
    cache_response,
    get_redis,
    safe_redis_get,
    safe_redis_set,
    start_redis,
    stop_redis,
)

from .lifespan import lifespan

__all__ = [
    "start_redis",
    "stop_redis",
    "get_redis",
    "safe_redis_get",
    "safe_redis_set",
    "cache_response",
    "rate_limit",
    "RateLimitConfig",
    "RateLimiter",
    "lifespan",
]
