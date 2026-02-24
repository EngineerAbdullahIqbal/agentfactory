"""Shared API infrastructure: auth, Redis cache, rate limiting.

Usage:
    import api_infra
    api_infra.configure(settings)  # Call once at app startup
"""

from typing import Any

_settings: Any = None


def configure(settings: Any) -> None:
    """Call once at app startup to provide settings to shared modules.

    Settings object must have: sso_url, dev_mode, dev_user_id, dev_user_email,
    dev_user_name, redis_url, redis_password, redis_max_connections, content_cache_ttl.
    """
    global _settings
    _settings = settings
    # Push settings into redis_cache module (it reads settings at module level)
    from .core import redis_cache

    redis_cache._configure_settings(settings)


def get_settings() -> Any:
    """Get the settings object. Raises if configure() hasn't been called."""
    if _settings is None:
        raise RuntimeError("Call api_infra.configure(settings) at app startup first")
    return _settings
