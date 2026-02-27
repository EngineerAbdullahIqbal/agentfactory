# Learner Profile System — Tasks (Governing Checklist)

This checklist is the “spec → implementation” bridge. Any change to learner-profile UX/API should update the relevant item(s) and include verification (automated test preferred).

## Frontend (learn-app)

- [x] Redirect new/incomplete users to onboarding **once per user** (opt-out supported).
  - Evidence: `apps/learn-app/src/components/RequireProfile.tsx`
  - Verification: `apps/learn-app/src/__tests__/learner-profile/RequireProfile.test.tsx`

- [x] Global full-width setup CTA bar shows when setup is needed (no profile / incomplete onboarding), with 7-day dismiss + opt-out variant; never shows on `/onboarding` or `/profile`.
  - Evidence: `apps/learn-app/src/components/profile/ProfileNudgeBanner.tsx`, `apps/learn-app/src/theme/Layout/index.tsx`
  - Verification: manual QA (logged-in + incomplete → see bar; dismiss → hidden; opt-out → “Personalization is off”)

- [x] Avoid double CTAs: suppress the in-content “Profile X% complete” card while the global CTA bar is eligible; show it only as a fallback after dismissal.
  - Evidence: `apps/learn-app/src/components/profile/CompletenessBanner.tsx`
  - Verification: `apps/learn-app/src/__tests__/learner-profile/CompletenessBanner.test.tsx` + manual QA

- [x] Onboarding wizard prevents surprise step jumps and resets scroll on step change.
  - Evidence: `apps/learn-app/src/components/onboarding/OnboardingWizard.tsx`
  - Verification: `apps/learn-app/src/__tests__/learner-profile/OnboardingWizard.test.tsx`

- [x] Onboarding “Exit setup?” confirmation appears when current step is dirty; browser refresh/close warns via `beforeunload`.
  - Evidence: `apps/learn-app/src/components/onboarding/OnboardingWizard.tsx`
  - Verification: manual QA (edit a field → Exit → confirm)

- [x] Navigation is baseUrl-safe and SPA (avoid hardcoded `"/onboarding"`, `"/profile"` redirects).
  - Evidence: `apps/learn-app/src/components/RequireProfile.tsx`, `apps/learn-app/src/components/onboarding/FinishStep.tsx`, `apps/learn-app/src/components/profile/DangerZone.tsx`
  - Verification: manual QA under non-root `baseUrl` (prod-like deploy)

- [x] Naming/copy is consistent and professional (“Learner Profile” across onboarding + profile + menu).
  - Evidence: `apps/learn-app/src/components/onboarding/WelcomeStep.tsx`, `apps/learn-app/src/components/profile/ProfileSettings.tsx`, `apps/learn-app/src/components/NavbarAuth/index.tsx`
  - Verification: manual QA (visual pass)

- [x] Onboarding collects `expertise.subject_specific.*` (skip/partial/misconceptions) as optional enrichment.
  - Evidence: `apps/learn-app/src/components/onboarding/ProjectStep.tsx`, `apps/learn-app/src/components/profile/fields/SubjectSpecificEditors.tsx`
  - Verification: manual QA (Project step → expand optional section → save)

- [x] Onboarding collects optional `goals.urgency_note`, `professional_context.constraints`, and quick-preferences toggles (`communication.wants_summaries`, `communication.wants_check_in_questions`).
  - Evidence: `apps/learn-app/src/components/onboarding/GoalsStep.tsx`, `apps/learn-app/src/components/onboarding/ProfessionalStep.tsx`, `apps/learn-app/src/components/onboarding/QuickPreferencesStep.tsx`
  - Verification: `apps/learn-app/src/__tests__/QuickPreferencesStep.test.tsx` + manual QA (fill optional fields → save)

- [x] Profile delete/GDPR erase clears redirect-once key so re-onboarding works.
  - Evidence: `apps/learn-app/src/components/profile/DangerZone.tsx`
  - Verification: `apps/learn-app/src/__tests__/learner-profile/DangerZone.test.tsx` + manual QA

- [x] Profile cache is user-scoped (prevents cross-user stale profile display).
  - Evidence: `apps/learn-app/src/contexts/LearnerProfileContext.tsx`
  - Verification: `apps/learn-app/src/__tests__/learner-profile/LearnerProfileContext.test.tsx`

- [x] Docs refresh does not crash due to hook-order mismatch (“Rendered more hooks than during the previous render”).
  - Evidence: `apps/learn-app/src/components/LessonContent/index.tsx`
  - Verification: `apps/learn-app/src/__tests__/LessonContent.test.tsx` + manual QA (hard refresh `/docs/*`)

## Backend (learner-profile-api)

- [x] `POST /api/v1/profiles/` requires `consent_given: true` and restores soft-deleted profiles.
  - Evidence: `apps/learner-profile-api/src/learner_profile_api/routes/profile.py`
  - Verification: `apps/learner-profile-api/tests/test_profile_routes.py`

- [x] Onboarding phases: `goals`, `expertise`, `professional_context`, `accessibility`, `communication_preferences`, `ai_enrichment`.
  - Evidence: `apps/learner-profile-api/src/learner_profile_api/schemas/profile.py` (`ONBOARDING_PHASES`)
  - Verification: `apps/learner-profile-api/tests/e2e/test_onboarding_flow.py`

- [x] Backward compatibility: profiles with `onboarding_completed = true` backfill `communication_preferences = true` in status/response.
  - Evidence: `apps/learner-profile-api/src/learner_profile_api/routes/profile.py`
  - Verification: `apps/learner-profile-api/tests/test_edge_cases.py`

- [x] Schema supports `expertise.ai_fluency` (not “ai_literacy”) and `expertise.subject_specific.*`.
  - Evidence: `apps/learner-profile-api/src/learner_profile_api/schemas/profile.py`
  - Verification: `apps/learner-profile-api/tests/test_schema_validation.py`

## Pending / Next

- [ ] Expand Study Mode summary payload to include the highest-impact profile fields (role/industry/team/org + goals/urgency/career/tools/languages).
  - Owner: TBD
  - Verification: add/extend unit tests in learn-app for profile summary builder + e2e validation.

- [ ] Add PHM sync trigger UX (manual button + safe rate limiting/backoff).
  - Owner: TBD
  - Verification: API + learn-app integration tests.
