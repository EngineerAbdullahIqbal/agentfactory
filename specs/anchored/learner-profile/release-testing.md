# Learner Profile System — Release Testing Protocol (Ship to 50k Users)

**Date:** 2026-02-27  
**Scope:** `learn-app` onboarding/profile/nudges + `learner-profile-api` CRUD/onboarding/completeness  
**Goal:** Ship safely to ~50,000 users with zero “setup loops”, no onboarding data loss, and graceful degradation when APIs/cache/localStorage are unavailable.

---

## 1) What Can Go Wrong (Top Risks)

1. **Redirect loops / surprising redirects** (especially with baseUrl, opt-out, or after delete/GDPR erase)
2. **Empty state with no CTA** (user needs setup but sees no banner/card)
3. **Data loss** (PATCH merge semantics violated; onboarding step saves overwrite unrelated fields)
4. **Cross-user data leak** (localStorage cache shows wrong profile after account switch)
5. **Frontend crashes** on refresh/navigation (SSR/hydration + conditional UI)
6. **Perf regressions** (GET `/me` called too often; cache misses; DB hot path)
7. **Privacy failures** (profile stored without consent, delete/erase incomplete, PII stored unexpectedly)

---

## 2) CI Gate (Must Be Green Before Merge/Deploy)

Run from repo root:

### Frontend (learn-app)

- Unit/integration tests: `pnpm nx test learn-app`
- Typecheck: `pnpm nx typecheck learn-app`
- Production build (catches theme/swizzle/baseUrl issues): `pnpm nx build learn-app`

### Backend (learner-profile-api)

- Tests: `pnpm nx test learner-profile-api`
- Lint: `pnpm nx lint learner-profile-api`
- Typecheck: `pnpm nx typecheck learner-profile-api`
- Format check (optional but recommended): `pnpm nx format-check learner-profile-api`

**Hard gate:** no skipped tests, no “only” tests, no console-error spam newly introduced.

---

## 3) Staging Manual QA (High-Signal Flows)

Use a clean browser profile / incognito. Verify in at least: Chrome + Safari (or iOS WebView), plus one mobile viewport.

### A) New user, no profile (redirect-once)

1. Clear site storage for the domain.
2. Sign in and land on `/docs/thesis`.
3. Expect: redirect to `/onboarding` **once**.
4. On Welcome step:
   - **Decline** → expect: no forced redirects later; global CTA bar shows “Personalization is off”.
   - **Agree** → expect: profile created only after consent; step 1 begins.

### B) Incomplete profile (no repeated redirect; CTA bar present)

1. Complete Goals, then Exit.
2. Navigate to `/docs/thesis`.
3. Expect: **global CTA bar** (“Finish your Learner Profile”) + `% complete`.
4. Click “Continue setup” → expect: resumes at correct next step (based on `/me/onboarding-status`).
5. Verify: no auto-advancing on selects; only explicit “Save & Continue”/“Skip for now”.

### C) “Never double-CTA” behavior

1. With incomplete onboarding on a docs page: ensure **only the global CTA bar** is visible (no in-content completeness card).
2. Dismiss the global CTA bar.
3. Expect: in-content “Profile X% complete” card appears as fallback (if enabled on that surface).

### D) Profile page behavior (no auto-create)

1. With **no profile**, go to `/profile`.
2. Expect: message “You don’t have a Learner Profile yet.” + CTA “Start setup”.
3. Verify: merely visiting `/profile` does **not** create a profile.

### E) Delete / GDPR erase (redirect-once re-enabled)

1. Delete profile (soft delete) → confirm redirect-once key is cleared.
2. Refresh and land on a docs page → expect: redirect-once triggers again.
3. Repeat for GDPR erase.

### F) Multi-user switch (cache isolation)

1. Sign in as User A, ensure profile loads.
2. Sign out, sign in as User B.
3. Expect: no stale profile from User A; CTA/keys are user-scoped.

### G) Base URL (prod-like)

Run learn-app under a non-root baseUrl (e.g. `/agentfactory/`) and verify:

- CTA links navigate correctly to `.../agentfactory/onboarding` and `.../agentfactory/profile`
- No full page reloads or broken paths

---

## 4) E2E Automation (Recommended Before 50k)

Add Playwright coverage for the flows above (A–F), plus:

- Refresh on docs pages with/without summaries (regression for hook-order crashes)
- “Dismiss global CTA bar” persistence (7-day TTL) and fallback card presence
- Opt-out path (“Personalization is off” CTA) does not re-enable redirects

**Minimum E2E bar:** redirect-once correctness + no empty state + resume step correctness.

---

## 5) Load & Performance (API + UX)

### Backend hot path

Load test `GET /api/v1/profiles/me` with valid JWT:

- Validate Redis hit ratio is high (expect near-constant cache hits after warmup)
- Confirm DB queries remain ≤1 per request (ideally 0 on cache hit)
- Track p95 latency and error rate under peak concurrency

### Write paths

Stress `PATCH /me/onboarding/*` within rate limits:

- Validate 429 behavior is correct and UI handles it gracefully (retry messaging)

---

## 6) Security & Privacy (Must Pass)

- Profile cannot be created without `consent_given: true`.
- “Delete Profile” and “GDPR erase” do what they claim (soft vs hard delete).
- Ensure no cross-user leakage via localStorage cache keys.
- Review XSS posture: **localStorage contains profile data** → treat XSS as P0 risk; ensure CSP/sanitization posture is acceptable before mass rollout.

---

## 7) Observability, Rollout, Rollback

### Observability

- Add dashboards/alerts for:
  - API 5xx/4xx spikes, p95 latency, Redis error rate, DB connection saturation
  - Frontend crashes (Sentry or equivalent), especially on docs pages
- Track funnel metrics:
  - Redirect-once triggered
  - Setup started / completed
  - Banner shown / dismissed

### Rollout

- Canary to a small % (internal + beta) → ramp in stages (e.g. 1% → 5% → 25% → 100%)
- Validate metrics at each stage (errors, completion rate, support tickets)

### Rollback

- Have an emergency toggle plan:
  - Disable forced redirect behavior
  - Hide CTA banner if it causes layout issues
  - Fail-open to unpersonalized content if API is degraded

