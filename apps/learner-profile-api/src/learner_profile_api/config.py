"""Learner Profile API configuration from environment variables."""

from urllib.parse import urlparse

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Learner Profile API settings loaded from environment."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Database (required for production)
    database_url: str = "sqlite+aiosqlite:///./test.db"

    # Database pool
    db_pool_size: int = 5
    auto_create_schema: bool = False

    # Redis (optional - caching degrades gracefully without it)
    redis_url: str = ""
    redis_password: str = ""
    redis_max_connections: int = 10

    # Redis namespace prefix for cache isolation
    redis_namespace: str = "lp:"

    # Cache TTLs (seconds)
    cache_ttl_profile: int = 1800  # 30 minutes

    # Content cache TTL (required by api_infra)
    content_cache_ttl: int = 2592000

    # SSO (required for production)
    sso_url: str = ""

    # Study Mode API (for PHM sync)
    study_mode_api_url: str = ""

    # CORS
    allowed_origins: str = "http://localhost:3000"

    # Debug
    debug: bool = False
    log_level: str = "INFO"

    # Dev mode - bypasses auth for local development
    dev_mode: bool = False
    dev_user_id: str = "dev-user-123"
    dev_user_email: str = "dev@localhost"
    dev_user_name: str = "Dev User"

    # Server
    port: int = 8004

    # Rate limiting
    rate_limit_enabled: bool = True
    trusted_proxy_count: int = 0  # 0 = ignore X-Forwarded-For entirely

    # PHM settings
    phm_allow_downrank: bool = False

    # GDPR
    gdpr_hash_salt: str = "dev-salt-change-in-production-must-be-32-chars"

    def validate_production_safety(self) -> None:
        """Refuse to start if production-unsafe configuration detected.

        Called during lifespan startup. Guards against accidental
        deployment with dev defaults that would compromise GDPR
        compliance or bypass authentication.
        """
        parsed = urlparse(self.database_url)
        is_local_db = (
            parsed.scheme.startswith("sqlite")
            or parsed.hostname in ("localhost", "127.0.0.1")
        )

        if not self.dev_mode and not is_local_db:
            # Production-like environment checks
            if self.gdpr_hash_salt == "dev-salt-change-in-production-must-be-32-chars":
                raise RuntimeError(
                    "GDPR_HASH_SALT must be set to a unique secret in production. "
                    "Set the GDPR_HASH_SALT environment variable (minimum 32 chars)."
                )

        if self.dev_mode and not is_local_db:
            raise RuntimeError(
                "DEV_MODE=true is not allowed with a non-local DATABASE_URL. "
                "This looks like a production database — disable DEV_MODE or use a local DB."
            )

    @property
    def allowed_origins_list(self) -> list[str]:
        """Parse comma-separated origins into list."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]


settings = Settings()
