"""Content loading with GitHub fetch, caching, and frontmatter parsing."""

import asyncio
import logging
from typing import Any

import httpx
import yaml
from api_infra.core.redis_cache import cache_response

from ..config import settings

logger = logging.getLogger(__name__)

# Reusable httpx client for GitHub fetches (connection pooling)
_http_client: httpx.AsyncClient | None = None
_http_client_lock = asyncio.Lock()


async def _get_http_client() -> httpx.AsyncClient:
    global _http_client
    if _http_client is None:
        async with _http_client_lock:
            if _http_client is None:  # double-check after acquiring lock
                _http_client = httpx.AsyncClient(timeout=10.0)
    return _http_client


def parse_frontmatter(content: str) -> tuple[dict[str, Any], str]:
    """Parse YAML frontmatter from markdown content.

    Args:
        content: Full markdown content, possibly with --- delimited frontmatter.

    Returns:
        Tuple of (frontmatter_dict, body_content).
        Returns ({}, content) if no frontmatter found.
        Returns ({}, content) on malformed YAML (graceful degradation).
    """
    if not content or not content.startswith("---"):
        return {}, content

    # Find the closing ---
    end_idx = content.find("---", 3)
    if end_idx == -1:
        return {}, content

    frontmatter_str = content[3:end_idx].strip()
    body = content[end_idx + 3 :].lstrip("\n")

    try:
        frontmatter = yaml.safe_load(frontmatter_str)
        if not isinstance(frontmatter, dict):
            return {}, content
        return frontmatter, body
    except yaml.YAMLError as e:
        logger.warning("[ContentLoader] Malformed YAML frontmatter: %s", e)
        return {}, content


async def fetch_from_github(lesson_path: str) -> tuple[str, bool]:
    """Fetch lesson content from GitHub raw URLs.

    Args:
        lesson_path: Path like "01-Part/02-chapter/03-lesson"

    Returns:
        Tuple of (content, success)
    """
    if not lesson_path:
        return "", False

    clean_path = lesson_path.strip("/")
    if clean_path.startswith("docs/"):
        clean_path = f"apps/learn-app/{clean_path}"
    elif not clean_path.startswith("apps/"):
        clean_path = f"apps/learn-app/docs/{clean_path}"

    extensions = [""]
    if not clean_path.endswith((".md", ".mdx")):
        extensions = [".md", ".mdx", "/index.md", "/README.md"]

    client = await _get_http_client()
    headers = {}
    if settings.github_token:
        headers["Authorization"] = f"token {settings.github_token}"

    for ext in extensions:
        url = f"https://raw.githubusercontent.com/{settings.github_repo}/main/{clean_path}{ext}"

        try:
            response = await client.get(url, headers=headers)

            if response.status_code == 200:
                logger.debug("Fetched content from GitHub: %s", url)
                return response.text, True

        except Exception as e:
            logger.warning("Failed to fetch from GitHub %s: %s", url, e)
            continue

    return "", False


@cache_response()
async def load_lesson_content(lesson_path: str) -> dict | None:
    """Load lesson content with caching.

    Args:
        lesson_path: Full path relative to docs root
            (e.g., "01-Part/02-chapter/03-lesson" or "01-Part/02-chapter/03-sub/04-lesson")

    Returns:
        Dict with content, frontmatter_dict, chapter_slug, lesson_slug
    """
    segments = lesson_path.strip("/").split("/")
    chapter_slug = segments[-2] if len(segments) >= 2 else ""
    lesson_slug = segments[-1] if segments else ""

    content, success = await fetch_from_github(lesson_path)

    if not success:
        # Return None so @cache_response skips caching not-found results.
        # Otherwise a missing lesson would be cached for 30 days.
        return None

    frontmatter_dict, body = parse_frontmatter(content)

    return {
        "content": body,
        "frontmatter_dict": frontmatter_dict,
        "chapter_slug": chapter_slug,
        "lesson_slug": lesson_slug,
        "found": True,
    }
