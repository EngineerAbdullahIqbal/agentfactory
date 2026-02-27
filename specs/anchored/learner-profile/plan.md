# Learner Profile System — Plan

**Scope:** Learner Profile API + learn-app onboarding/profile UX.

## Goals

- Ship an AI-first, premium onboarding + profile experience that is stable under Docusaurus `baseUrl` and prevents UX surprises (no step skipping, no scroll jumps, no silent data loss).
- Keep the profile schema + onboarding flow consistent across API, frontend, and spec.
- Ensure “redirect to onboarding” happens only when needed, and never traps users (opt-out supported).

## Milestones

### Milestone A — Core Profile System (Implemented)

- Profile CRUD (`/api/v1/profiles/me`) + per-section updates.
- Onboarding phases + progress status (`/me/onboarding-status`, `/me/onboarding/{phase}`).
- Completeness scoring + recommendations.
- Profile settings UI (edit sections via sheets).

### Milestone B — Premium Onboarding UX (Implemented)

- Single full-screen wizard with sticky bottom action bar.
- “Exit setup?” confirmation when current step is dirty + `beforeunload` guard.
- Scroll reset on step change.
- BaseUrl-safe SPA navigation (no hardcoded `"/onboarding"`, `"/profile"` redirects).
- Redirect-once gating for new/incomplete users + opt-out.

### Milestone C — AI Enrichment Data Gaps (Partially Implemented)

- Collect `expertise.subject_specific.*` during onboarding as an optional add-on.
- Remaining gaps deferred:
  - Study Mode summary should include more profile fields (pending).
  - PHM sync trigger UX (pending).

## Rollback / Safety

- All onboarding steps save via sparse patches; skipping is allowed.
- Redirect-once key is cleared on profile delete/GDPR erase to prevent “can’t re-onboard” traps.
- If localStorage is unavailable, behavior is best-effort with safe fallbacks.

## Verification

- learn-app: `cd apps/learn-app && pnpm vitest run`
- learner-profile-api: `cd apps/learner-profile-api && uv run pytest tests/`

