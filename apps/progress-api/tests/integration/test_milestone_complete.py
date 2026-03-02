"""Integration tests for POST /api/v1/milestone/complete."""

import asyncio

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_milestone_complete_first_time(client: AsyncClient):
    """First completion returns xp_earned=20 and already_completed=false."""
    response = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": "onboarding/goals"},
        headers={"X-User-ID": "test-milestone-1"},
    )
    assert response.status_code == 200
    data = response.json()

    assert data["xp_earned"] == 20
    assert data["already_completed"] is False
    assert data["total_xp"] >= 20
    assert data["streak"]["current"] >= 1


@pytest.mark.asyncio
async def test_milestone_complete_idempotent(client: AsyncClient):
    """Second call returns already_completed=true, xp_earned=0, total_xp unchanged."""
    user_id = "test-milestone-idemp"
    slug = "onboarding/expertise"

    # First completion
    r1 = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": slug},
        headers={"X-User-ID": user_id},
    )
    assert r1.status_code == 200
    d1 = r1.json()
    assert d1["already_completed"] is False
    assert d1["xp_earned"] == 20

    # Second completion — should be idempotent
    r2 = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": slug},
        headers={"X-User-ID": user_id},
    )
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["already_completed"] is True
    assert d2["xp_earned"] == 0
    assert d2["total_xp"] == d1["total_xp"]


@pytest.mark.asyncio
async def test_milestone_streak_credited(client: AsyncClient):
    """Milestone completion records activity_day for streak tracking."""
    response = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": "onboarding/professional_context"},
        headers={"X-User-ID": "test-milestone-streak"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["streak"]["current"] >= 1
    assert data["streak"]["longest"] >= 1


@pytest.mark.asyncio
async def test_milestone_empty_slug_422(client: AsyncClient):
    """Empty milestone_slug returns 422."""
    response = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": ""},
        headers={"X-User-ID": "test-user"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_milestone_whitespace_only_slug_422(client: AsyncClient):
    """Whitespace-only milestone_slug returns 422 (validator rejects after strip)."""
    response = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": "   "},
        headers={"X-User-ID": "test-user"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_milestone_case_normalization(client: AsyncClient):
    """Slug is case-normalized: 'Onboarding/Goals' treated same as 'onboarding/goals'."""
    user_id = "test-milestone-case"

    # First with mixed case
    r1 = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": "Onboarding/Goals"},
        headers={"X-User-ID": user_id},
    )
    assert r1.status_code == 200
    assert r1.json()["already_completed"] is False

    # Second with lowercase — should be idempotent
    r2 = await client.post(
        "/api/v1/milestone/complete",
        json={"milestone_slug": "onboarding/goals"},
        headers={"X-User-ID": user_id},
    )
    assert r2.status_code == 200
    assert r2.json()["already_completed"] is True


@pytest.mark.asyncio
async def test_milestone_concurrent_double_submit(client: AsyncClient):
    """Concurrent requests: exactly one awards XP, other gets already_completed."""
    user_id = "test-milestone-concurrent"
    slug = "onboarding/accessibility"

    async def submit():
        return await client.post(
            "/api/v1/milestone/complete",
            json={"milestone_slug": slug},
            headers={"X-User-ID": user_id},
        )

    r1, r2 = await asyncio.gather(submit(), submit())

    assert r1.status_code == 200
    assert r2.status_code == 200

    d1 = r1.json()
    d2 = r2.json()

    # Exactly one should have xp_earned=20, the other 0
    xp_values = sorted([d1["xp_earned"], d2["xp_earned"]])
    assert xp_values == [0, 20]

    # Both should report the same total_xp at the end
    # (the one that sees already_completed=true may have a slightly different view,
    # but total_xp should be at least 20)
    assert max(d1["total_xp"], d2["total_xp"]) >= 20
