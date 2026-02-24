---
id: "0182"
title: "E2E integration tests for Content API with real JWT auth"
stage: general
date: 2026-02-18
surface: claude-code
model: claude-opus-4-6
feature: content-api
branch: feat/p0-content-api
user: mjs
command: /sp.git.commit_pr
labels: [e2e, testing, jwt, content-api, fakeredis, respx]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/panaversity/agentfactory/pull/754
files:
  - apps/content-api/tests/e2e/conftest.py
  - apps/content-api/tests/e2e/test_full_flow.py
  - apps/content-api/tests/e2e/__init__.py
  - apps/content-api/src/content_api/main.py
  - apps/content-api/pyproject.toml
  - uv.lock
tests:
  - apps/content-api/tests/e2e/test_full_flow.py (25 tests)
---

## Prompt

User requested production-like local E2E testing for P0 Content API, then pivoted to automated E2E tests with fakeredis and real JWT auth (TDD philosophy: tests verify behavior through public interfaces, not implementation details). Tests needed to cover: SSO JWKS auth, content tree/lesson endpoints, frontmatter stripping, idempotency, cache invalidation.

## Response snapshot

Built 25 E2E integration tests in `tests/e2e/` using: RSA key pair for JWT signing/verification, fakeredis for Redis ops, respx to intercept JWKS + GitHub HTTP at transport level. Tests exercise full FastAPI app through httpx AsyncClient with ASGITransport. Discovered and fixed bug: `/admin/invalidate-cache` used bare `paths: list[str]` param that FastAPI couldn't parse from JSON body; replaced with `InvalidateCacheRequest` Pydantic model. All 94 tests pass (54 content-api + 40 api-infra).

## Outcome

- Impact: Full integration test coverage for Content API auth, content serving, caching, and cache invalidation
- Tests: 25 new E2E + 29 existing unit = 54 content-api tests, all passing in 5s
- Files: 3 new test files, 1 bug fix (main.py), 1 dep update (pyproject.toml), 1 lock update
- Next prompts: Production deployment planning, monitoring setup, load testing at 200k scale
- Reflection: E2E tests caught a real endpoint bug (422 on cache invalidation) that unit tests with mocks missed entirely — validates the integration testing approach

## Evaluation notes (flywheel)

- Failure modes observed: Auth fallback to opaque tokens needed SSO userinfo mock; FastAPI bare list params don't parse JSON body objects
- Graders run and results (PASS/FAIL): pytest 54/54 PASS, ruff lint PASS (1 pre-existing E741)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Add CI workflow for E2E tests
