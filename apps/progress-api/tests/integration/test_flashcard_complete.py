"""Integration tests for POST /api/v1/flashcard/complete."""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_flashcard_complete_happy_path(client: AsyncClient):
    """First flashcard completion returns XP, first-deck badge, and streak."""
    response = await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "ch01-2025-inflection-point",
            "chapter_slug": "01-foundations/01-agent-factory-paradigm",
            "cards_correct": 17,
            "cards_total": 20,
        },
        headers={"X-User-ID": "test-fc-user-1"},
    )
    assert response.status_code == 200
    data = response.json()

    # XP: round(17/20 * 50) = 42
    assert data["xp_earned"] == 42
    assert data["total_xp"] == 42
    assert data["is_first_completion"] is True
    assert data["score_pct"] == 85
    assert data["streak"]["current"] >= 1

    # Should earn first-deck badge
    badge_ids = [b["id"] for b in data["new_badges"]]
    assert "first-deck" in badge_ids


@pytest.mark.asyncio
async def test_flashcard_repeat_zero_xp(client: AsyncClient):
    """Repeating same deck earns 0 XP but credits streak."""
    user_id = "test-fc-user-repeat"
    deck_payload = {
        "deck_id": "ch02-general-agents",
        "chapter_slug": "01-foundations/02-general-agents",
        "cards_correct": 15,
        "cards_total": 20,
    }

    # First completion
    r1 = await client.post(
        "/api/v1/flashcard/complete",
        json=deck_payload,
        headers={"X-User-ID": user_id},
    )
    assert r1.status_code == 200
    d1 = r1.json()
    assert d1["xp_earned"] == 38  # round(15/20 * 50) = 38
    assert d1["is_first_completion"] is True

    # Repeat
    r2 = await client.post(
        "/api/v1/flashcard/complete",
        json=deck_payload,
        headers={"X-User-ID": user_id},
    )
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["xp_earned"] == 0
    assert d2["is_first_completion"] is False
    assert d2["total_xp"] == 38  # unchanged
    assert d2["streak"]["current"] >= 1


@pytest.mark.asyncio
async def test_flashcard_perfect_recall_badge(client: AsyncClient):
    """100% score awards perfect-recall badge."""
    response = await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "ch03-seven-principles",
            "chapter_slug": "01-foundations/03-seven-principles",
            "cards_correct": 20,
            "cards_total": 20,
        },
        headers={"X-User-ID": "test-fc-user-perfect"},
    )
    assert response.status_code == 200
    data = response.json()

    assert data["xp_earned"] == 50  # round(20/20 * 50) = 50
    assert data["score_pct"] == 100

    badge_ids = [b["id"] for b in data["new_badges"]]
    assert "perfect-recall" in badge_ids
    assert "first-deck" in badge_ids


@pytest.mark.asyncio
async def test_flashcard_deck_master_badge(client: AsyncClient):
    """Completing 10 unique decks awards deck-master-10 badge."""
    user_id = "test-fc-user-master"

    # Complete 10 unique decks
    for i in range(10):
        r = await client.post(
            "/api/v1/flashcard/complete",
            json={
                "deck_id": f"deck-{i:02d}",
                "chapter_slug": f"01-foundations/{i:02d}-lesson",
                "cards_correct": 15,
                "cards_total": 20,
            },
            headers={"X-User-ID": user_id},
        )
        assert r.status_code == 200

    # The 10th submission should have deck-master-10
    data = r.json()
    badge_ids = [b["id"] for b in data["new_badges"]]
    assert "deck-master-10" in badge_ids


@pytest.mark.asyncio
async def test_flashcard_xp_formula(client: AsyncClient):
    """XP formula: round(correct/total * 50) on first completion."""
    response = await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "ch-xp-formula",
            "chapter_slug": "01-foundations/01-lesson",
            "cards_correct": 17,
            "cards_total": 20,
        },
        headers={"X-User-ID": "test-fc-xp-formula"},
    )
    assert response.status_code == 200
    data = response.json()

    assert data["score_pct"] == 85  # round(17/20 * 100) = 85
    assert data["xp_earned"] == 42  # round(17/20 * 50) = 42.5 → 42


@pytest.mark.asyncio
async def test_flashcard_validation_cards_total_zero(client: AsyncClient):
    """cards_total=0 returns 422."""
    response = await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "some-deck",
            "chapter_slug": "some/chapter",
            "cards_correct": 0,
            "cards_total": 0,
        },
        headers={"X-User-ID": "test-user"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_flashcard_validation_correct_exceeds_total(client: AsyncClient):
    """cards_correct > cards_total returns 422."""
    response = await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "some-deck",
            "chapter_slug": "some/chapter",
            "cards_correct": 15,
            "cards_total": 10,
        },
        headers={"X-User-ID": "test-user"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_flashcard_validation_empty_deck_id(client: AsyncClient):
    """Empty deck_id returns 422."""
    response = await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "",
            "chapter_slug": "some/chapter",
            "cards_correct": 5,
            "cards_total": 10,
        },
        headers={"X-User-ID": "test-user"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_flashcard_unauthenticated(client: AsyncClient):
    """No auth header in non-dev mode returns 401."""
    from progress_api.config import settings

    original_dev_mode = settings.dev_mode
    settings.dev_mode = False

    try:
        response = await client.post(
            "/api/v1/flashcard/complete",
            json={
                "deck_id": "some-deck",
                "chapter_slug": "some/chapter",
                "cards_correct": 5,
                "cards_total": 10,
            },
        )
        assert response.status_code == 401
    finally:
        settings.dev_mode = original_dev_mode


@pytest.mark.asyncio
async def test_flashcard_progress_includes_count(client: AsyncClient):
    """flashcards_completed appears in progress response after completion."""
    user_id = "test-fc-progress-user"

    # Complete a deck
    await client.post(
        "/api/v1/flashcard/complete",
        json={
            "deck_id": "ch-progress-test",
            "chapter_slug": "01-foundations/01-lesson",
            "cards_correct": 10,
            "cards_total": 10,
        },
        headers={"X-User-ID": user_id},
    )

    # Check progress
    r = await client.get(
        "/api/v1/progress/me",
        headers={"X-User-ID": user_id},
    )
    assert r.status_code == 200
    data = r.json()
    assert data["stats"]["flashcards_completed"] == 1
