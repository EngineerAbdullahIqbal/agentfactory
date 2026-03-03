"""Tests for health check endpoints.

Success Criteria SC-005: Health checks should respond in <100ms.
"""

import time
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient


class TestHealthEndpoints:
    """Test health check endpoints."""

    @pytest.fixture
    def client(self):
        """Create test client."""
        with patch("study_mode_api.core.lifespan.lifespan"):
            from study_mode_api.main import app
            return TestClient(app)

    def test_liveness_endpoint_returns_ok(self, client):
        """Test /health returns 200 OK with lightweight response."""
        response = client.get("/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["version"] == "5.1.0"

    def test_liveness_endpoint_fast_response(self, client):
        """Test /health responds in <100ms (SC-005)."""
        start = time.time()
        response = client.get("/health")
        elapsed_ms = (time.time() - start) * 1000

        assert response.status_code == 200
        assert elapsed_ms < 100  # SC-005: <100ms
