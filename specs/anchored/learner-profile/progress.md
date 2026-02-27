# Learner Profile System — Progress Log

## 2026-02-27

- Promoted Learner Profile spec to an anchored spec package under `specs/anchored/learner-profile/`.
- Updated spec to v1.3 and aligned it with the current implementation (AI fluency naming + onboarding polish + subject-specific enrichment).
- Implemented premium onboarding/profile UX fixes (redirect-once, baseUrl-safe navigation, exit confirmation, scroll reset, subject-specific enrichment collection).
- Verification:
  - learn-app: `pnpm vitest run`
  - learner-profile-api: `uv run pytest tests/`

