"""Production-grade rate limiting with Redis Lua script."""

import logging
from collections.abc import Callable
from functools import wraps
from typing import Annotated

from fastapi import HTTPException, Request, Response
from pydantic import BaseModel, Field

from .redis_cache import get_redis

logger = logging.getLogger(__name__)

# Production-grade atomic rate limiting with Lua
RATE_LIMIT_SCRIPT = """
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local current = redis.call('incr', key)
if current == 1 then
    redis.call('pexpire', key, window)
end
local ttl = redis.call('pttl', key)
if current > limit then
    return {current, window, ttl}
end
return {current, window, 0}
"""


class RateLimitConfig(BaseModel):
    """Configuration for rate limiting."""

    times: Annotated[int, Field(ge=0)] = 20  # 20 requests per window (spec requirement)
    milliseconds: Annotated[int, Field(ge=-1)] = 0
    seconds: Annotated[int, Field(ge=-1)] = 0
    minutes: Annotated[int, Field(ge=-1)] = 1  # Default: 1 minute window
    hours: Annotated[int, Field(ge=-1)] = 0

    def get_window(self) -> int:
        """Calculate total window in milliseconds."""
        return (
            self.milliseconds
            + 1000 * self.seconds
            + 60000 * self.minutes
            + 3600000 * self.hours
        )


class RateLimiter:
    """Production-grade rate limiter with Redis and Lua script."""

    def __init__(
        self,
        redis_key: str,
        config: RateLimitConfig | None = None,
        identifier: Callable[[Request], str] | None = None,
        callback: Callable[[Request, Response, int], None] | None = None,
    ):
        self.redis_key = redis_key
        self.config = config or RateLimitConfig()
        self.identifier = identifier or self._default_identifier
        self.callback = callback or self._default_callback
        self._lua_script_sha: str | None = None

    async def _load_lua_script(self, redis) -> str:
        """Load Lua script into Redis."""
        if not self._lua_script_sha:
            self._lua_script_sha = await redis.script_load(RATE_LIMIT_SCRIPT)
        return self._lua_script_sha

    @staticmethod
    def _default_identifier(request: Request) -> str:
        """Identify clients by authenticated user ID or IP address.

        Prefers the authenticated user attached by the rate_limit wrapper
        (from FastAPI's dependency-injected CurrentUser). Falls back to IP.
        Never trusts client-supplied headers like X-User-ID for identification.
        """
        # Prefer authenticated user from FastAPI dependency injection
        auth_user_id = getattr(request.state, "rate_limit_user_id", None)
        if auth_user_id:
            return f"user:{auth_user_id}"

        # Fall back to IP address (for unauthenticated endpoints like /health)
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return f"ip:{forwarded.split(',')[0].strip()}"
        return f"ip:{request.client.host if request.client else 'unknown'}"

    @staticmethod
    async def _default_callback(
        request: Request, response: Response, retry_after: int
    ) -> None:
        """Default callback when rate limit is exceeded."""
        logger.warning(
            "Rate limit exceeded for %s", request.client.host if request.client else "unknown"
        )
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Rate limit exceeded",
                "retry_after_ms": retry_after,
                "message": f"Too many requests. Retry in {retry_after / 1000:.1f}s.",
            },
        )

    async def _check_rate_limit(self, request: Request) -> dict[str, int | str]:
        """Check rate limit using Redis Lua script."""
        redis_client = get_redis()

        # Fail open if Redis unavailable
        if not redis_client:
            logger.warning("[RateLimit] Redis not available, allowing request (fail-open)")
            return {
                "current": 1,
                "limit": self.config.times,
                "remaining": self.config.times - 1,
                "reset_after": self.config.get_window(),
            }

        try:
            result = await self._execute_lua(redis_client, request)
            return result
        except Exception as e:
            # Fail open but log the error
            logger.error("Rate limit check failed: %s", e)
            return {
                "current": 1,
                "limit": self.config.times,
                "remaining": self.config.times - 1,
                "reset_after": self.config.get_window(),
            }

    async def _execute_lua(
        self, redis_client, request: Request, *, _retried: bool = False
    ) -> dict[str, int | str]:
        """Execute rate limit Lua script with NOSCRIPT retry."""
        script_sha = await self._load_lua_script(redis_client)

        # Get identifier (e.g., user ID or IP address)
        identifier = self.identifier(request)
        key = f"rate_limit:{self.redis_key}:{identifier}"
        window_ms = self.config.get_window()
        logger.info("[RateLimit] Identifier resolved: %s", identifier)

        try:
            # Execute Lua script for atomic operations
            current, window, ttl = await redis_client.evalsha(
                script_sha,
                1,  # number of keys
                key,  # key
                str(self.config.times),  # limit
                str(window_ms),  # window in ms
            )
        except Exception as e:
            # NOSCRIPT = Redis restarted and lost the cached script
            if "NOSCRIPT" in str(e) and not _retried:
                logger.warning("[RateLimit] NOSCRIPT error, reloading Lua script")
                self._lua_script_sha = None
                return await self._execute_lua(redis_client, request, _retried=True)
            raise

        logger.info(
            "[RateLimit] Redis key=%s, current=%d, limit=%d, window=%dms, ttl=%dms",
            key, current, self.config.times, window_ms, ttl,
        )

        remaining = max(0, self.config.times - current)
        if current > self.config.times:
            remaining = -1

        return {
            "current": current,
            "limit": self.config.times,
            "remaining": remaining,
            "reset_after": ttl if ttl > 0 else window_ms,
        }


def rate_limit(
    redis_key: str,
    max_requests: int = 20,
    period_minutes: int = 1,
    identifier: Callable[[Request], str] | None = None,
    callback: Callable[[Request, Response, int], None] | None = None,
):
    """
    Production-grade rate limiting decorator for FastAPI endpoints.

    Features:
    - Atomic rate limiting using Redis Lua script
    - Per-user identification (user_id param or IP fallback)
    - Rate limit headers in response
    - Graceful degradation (fail-open) if Redis unavailable
    - 429 response with retry information

    Usage:
        @app.get("/api/resource")
        @rate_limit("api", max_requests=20, period_minutes=1)
        async def get_resource(request: Request, response: Response):
            return {"data": "resource"}
    """
    config = RateLimitConfig(times=max_requests, minutes=period_minutes)
    limiter = RateLimiter(redis_key, config, identifier, callback)

    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract request and response
            request = kwargs.get("request")
            response = kwargs.get("response")

            if not request or not response:
                for arg in args:
                    if isinstance(arg, Request):
                        request = arg
                    elif isinstance(arg, Response):
                        response = arg

            if not request or not response:
                logger.error("Rate limit decorator requires Request and Response objects")
                return await func(*args, **kwargs)

            # Attach authenticated user ID to request.state for the identifier.
            # FastAPI resolves Depends() before calling the wrapper, so
            # kwargs["user"] is the CurrentUser when the route declares one.
            user = kwargs.get("user")
            if user and hasattr(user, "id") and user.id:
                request.state.rate_limit_user_id = user.id

            # Check rate limit
            rate_limit_info = await limiter._check_rate_limit(request)

            # Set rate limit headers (T023 requirement)
            response.headers["X-RateLimit-Limit"] = str(rate_limit_info["limit"])
            response.headers["X-RateLimit-Remaining"] = str(rate_limit_info["remaining"])
            response.headers["X-RateLimit-Reset"] = str(rate_limit_info["reset_after"])

            # Handle rate limit exceeded
            if rate_limit_info["remaining"] < 0:
                callback = getattr(limiter, "callback", limiter._default_callback)
                await callback(
                    request, response, rate_limit_info["reset_after"]
                )

            # Execute the endpoint
            return await func(*args, **kwargs)

        return wrapper

    return decorator
