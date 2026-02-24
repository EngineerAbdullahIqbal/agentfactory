"""Content API configuration from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Content API settings loaded from environment."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Redis (optional - caching degrades gracefully without it)
    redis_url: str = ""
    redis_password: str = ""
    redis_max_connections: int = 10

    # GitHub content loading
    github_token: str = ""
    github_repo: str = "panaversity/agentfactory"

    # Content cache TTL (seconds) - 30 days (invalidate via GitHub Action on push)
    content_cache_ttl: int = 2592000

    # SSO (required for production)
    sso_url: str = ""

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
    port: int = 8003

    # Token Metering API
    metering_api_url: str = ""
    metering_enabled: bool = False

    # Progress API (for completion tracking)
    progress_api_url: str = ""

    @property
    def allowed_origins_list(self) -> list[str]:
        """Parse comma-separated origins into list."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]


settings = Settings()
