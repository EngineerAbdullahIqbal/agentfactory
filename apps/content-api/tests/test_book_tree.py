"""Tests for book tree builder and content loader utilities."""

import json
from unittest.mock import AsyncMock, MagicMock, patch

import httpx
import pytest

from content_api.services.book_tree import build_book_tree, slug_to_title
from content_api.services.content_loader import parse_frontmatter


class TestSlugToTitle:
    """Test slug to title conversion."""

    def test_basic_slug(self):
        assert slug_to_title("01-my-lesson") == "My Lesson"

    def test_no_number_prefix(self):
        assert slug_to_title("my-lesson") == "My Lesson"

    def test_multi_digit_prefix(self):
        assert slug_to_title("123-deep-topic") == "Deep Topic"

    def test_single_word(self):
        assert slug_to_title("01-foundations") == "Foundations"


class TestParseFrontmatter:
    """Test YAML frontmatter parsing."""

    def test_full_frontmatter(self, sample_frontmatter):
        fm, body = parse_frontmatter(sample_frontmatter)

        assert fm["title"] == "Test Lesson"
        assert fm["description"] == "A test lesson"
        assert fm["sidebar_position"] == 3
        assert fm["skills"] == ["skill-1", "skill-2"]
        assert "# Test Lesson" in body

    def test_no_frontmatter(self):
        content = "# Just a heading\n\nSome content."
        fm, body = parse_frontmatter(content)

        assert fm == {}
        assert body == content

    def test_empty_content(self):
        fm, body = parse_frontmatter("")

        assert fm == {}
        assert body == ""

    def test_malformed_yaml(self):
        content = "---\n: invalid: yaml: [\n---\nbody"
        fm, body = parse_frontmatter(content)

        assert fm == {}
        assert body == content

    def test_non_dict_frontmatter(self):
        content = "---\njust a string\n---\nbody"
        fm, body = parse_frontmatter(content)

        assert fm == {}
        assert body == content

    def test_no_closing_delimiter(self):
        content = "---\ntitle: Test\nno closing"
        fm, body = parse_frontmatter(content)

        assert fm == {}
        assert body == content


class TestBuildBookTree:
    """Test book tree builder."""

    @pytest.mark.asyncio
    async def test_build_tree_from_github_response(self, sample_github_tree_response):
        """Test building tree from GitHub API response."""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = sample_github_tree_response
        mock_response.raise_for_status = MagicMock()

        with patch("api_infra.core.redis_cache._aredis", None):
            with patch("httpx.AsyncClient") as mock_client:
                mock_client_instance = AsyncMock()
                mock_client_instance.get = AsyncMock(return_value=mock_response)
                mock_client.return_value.__aenter__ = AsyncMock(return_value=mock_client_instance)
                mock_client.return_value.__aexit__ = AsyncMock(return_value=None)

                result = await build_book_tree()

        assert len(result.parts) == 2
        assert result.parts[0].slug == "01-Foundations"
        assert result.parts[1].slug == "02-Advanced"

        # Check chapters in first part
        part1 = result.parts[0]
        assert len(part1.chapters) == 2
        assert part1.chapters[0].slug == "01-intro"
        assert part1.chapters[1].slug == "02-basics"

        # Check lessons in first chapter
        ch1 = part1.chapters[0]
        assert len(ch1.lessons) == 2
        assert ch1.lessons[0].slug == "01-welcome"
        assert ch1.lessons[1].slug == "02-setup"

        # Verify totals
        assert result.total_lessons == 5  # 2 + 1 + 2
        assert result.total_chapters == 3  # 2 + 1

    @pytest.mark.asyncio
    async def test_build_tree_cache_hit(self):
        """Test tree is returned from cache."""
        cached_tree = {
            "version": "1",
            "parts": [{"slug": "cached-part", "title": "Cached", "chapters": []}],
            "total_lessons": 0,
            "total_chapters": 0,
        }

        with patch(
            "content_api.services.book_tree.safe_redis_get",
            return_value=json.dumps(cached_tree),
        ):
            result = await build_book_tree()

        assert len(result.parts) == 1
        assert result.parts[0].slug == "cached-part"

    @pytest.mark.asyncio
    async def test_build_tree_github_error(self):
        """Test graceful handling of GitHub API error."""
        with patch("api_infra.core.redis_cache._aredis", None):
            with patch("httpx.AsyncClient") as mock_client:
                mock_client_instance = AsyncMock()
                mock_client_instance.get = AsyncMock(side_effect=httpx.HTTPError("API error"))
                mock_client.return_value.__aenter__ = AsyncMock(return_value=mock_client_instance)
                mock_client.return_value.__aexit__ = AsyncMock(return_value=None)

                result = await build_book_tree()

        assert len(result.parts) == 0
        assert result.total_lessons == 0
