# Learner Profile System — Specification v1.4

**Status:** Phase 4 — Implementation Review (v1.4 native language + preferred code language dimensions; remaining gaps tracked in §9)
**Date:** 2026-03-03
**Scope:** Profile CRUD, onboarding, storage, PHM sync, progressive profiling
**Out of Scope:** Personalization engine (LLM calls, content transformation) — separate build

**Governing artifact:** This spec is authoritative for learner-profile behavior. Changes to onboarding/profile UX or API must update `spec.md` and `tasks.md` (and include a verification path: test or manual QA).

---

## 1. System Overview

### What We're Building

The Learner Profile System is the foundational data layer for all AI-native learning features in AgentFactory. It stores, manages, and serves learner profiles that downstream systems (TutorClaw, Teach Me Mode, Personalized Content Tab) consume to personalize the learning experience.

### System Responsibilities

1. **Profile CRUD** — Create, read, update, and delete learner profiles
2. **Onboarding** — Hybrid wizard (form + optional AI follow-up) that collects the minimum viable profile
3. **Progressive Profiling** — Infer and update profile fields from learner behavior over time
4. **PHM Sync** — Auto-update profile from tutoring session data (Appendix A mapping)
5. **Profile Serving** — Expose profiles via API for downstream personalization consumers
6. **GDPR Compliance** — Hard delete, consent tracking, data retention

### What's NOT This System

- **Personalization Engine** — The LLM-based content transformation system that takes profile + lesson → personalized output. Separate build, separate service.
- **Assessment/Grading** — Profile drives presentation, not evaluation
- **Content Authoring** — We personalize existing lessons, not create new ones
- **ML-based Inference** — Progressive profiling in v1 is rule-based, not ML

### Integration Points

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (learn-app)                     │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────────┐   │
│  │ Onboarding   │  │ Personalized    │  │ TutorClaw /       │   │
│  │ Wizard       │  │ Content Tab     │  │ Teach Me Mode     │   │
│  └──────┬───────┘  └───────┬─────────┘  └──────┬────────────┘   │
└─────────┼──────────────────┼───────────────────┼────────────────┘
          │                  │                   │
          │ JWT Bearer       │ JWT Bearer        │ JWT Bearer
          ▼                  ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LEARNER PROFILE API (this service)             │
│                    Port 8004                                      │
│                                                                   │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────────┐   │
│  │ Profile CRUD │  │ Onboarding      │  │ PHM Sync          │   │
│  │ /api/v1/     │  │ State mgmt      │  │ /me/sync-from-phm │   │
│  │ profiles/    │  │                  │  │                    │   │
│  └──────┬───────┘  └─────────────────┘  └──────┬────────────┘   │
│         │                                       │                 │
│         ▼                                       ▼                 │
│  ┌──────────────┐                        ┌───────────────────┐   │
│  │ PostgreSQL   │                        │ httpx Client      │   │
│  │ (Neon)       │                        │ (Study Mode API)  │   │
│  │ profiles     │                        │                    │   │
│  └──────────────┘                        └───────────────────┘   │
│         │                                                         │
│         ▼                                                         │
│  ┌──────────────┐                                                │
│  │ Redis Cache  │                                                │
│  │ (shared)     │                                                │
│  └──────────────┘                                                │
└──────────────────────────────────────────────────────────────────┘

EXTERNAL DEPENDENCIES:
┌──────────────┐    ┌────────────────┐    ┌────────────────┐
│ SSO          │    │ Content API    │    │ Study Mode API │
│ (JWKS auth)  │    │ (lesson source)│    │ (PHM sessions) │
│ port 3001    │    │ port 8003      │    │ port 8000      │
└──────────────┘    └────────────────┘    └────────────────┘
```

- **SSO** → JWT/JWKS authentication. `learner_id` is the raw `sub` claim from JWT — a string identity from the auth provider. No UUID generation, no mapping table.
- **Content API** → Serves lesson content. Frontend orchestrates: gets lesson from content-api, gets profile from this service, sends both to personalization engine
- **Study Mode API** → PHM session data. This service pulls PHM data to update profiles
- **Redis** → Shared instance. Profile cache with `lp:` namespace prefix

---

## 2. Schema v1.1

This is the evolved schema incorporating all Phase 1 research findings and user decisions. Changes from v1.0 are marked with `[NEW]`, `[MODIFIED]`, or `[REMOVED]`.

### SECTION 1 — Identity and Context

```json
{
  "id": "UUID v4 — internal primary key, auto-generated, never exposed in API",
  "learner_id": "string — JWT `sub` claim from auth. NOT a UUID we generate. This is the auth identity string.",
  "name": "string | null",
  "created_at": "ISO-8601 datetime (timezone-aware UTC)",
  "updated_at": "ISO-8601 datetime (timezone-aware UTC) — updated on every profile modification",
  "profile_version": "1.1",
  "consent_given": "boolean — GDPR consent for profile data storage",
  "consent_date": "ISO-8601 datetime | null"
}
```

| Field                       | Status        | Notes                                                                                                      |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`                        | `[NEW]`       | Internal UUID v4 primary key. Never exposed in API responses.                                              |
| `learner_id`                | `[CLARIFIED]` | Auth subject string from JWT `sub`. NOT auto-generated, NOT UUID v4. This is the stable identity from SSO. |
| `created_at` / `updated_at` | `[RENAMED]`   | Was `profile_created` / `last_updated`. Aligned with DB column names. `[P0-R2-5 FIX]`                      |
| `consent_given`             | `[NEW]`       | GDPR requirement. Must be `true` for profile to be stored                                                  |
| `consent_date`              | `[NEW]`       | When consent was granted                                                                                   |

### SECTION 2 — Expertise Profile

```json
{
  "expertise": {
    "domain": [
      {
        "level": "none | beginner | intermediate | advanced | expert",
        "domain_name": "string | null — prompted in UI when level >= beginner, but accepted as null by API (PHM/defaults may not have it) [P0-R3-3 FIX]",
        "is_primary": "boolean — true for the primary domain",
        "notes": "string | null (max 300 chars)"
      }
    ],
    "programming": {
      "level": "none | beginner | intermediate | advanced | expert",
      "languages": ["string"],
      "notes": "string | null (max 300 chars)"
    },
    "ai_fluency": {
      "level": "none | beginner | intermediate | advanced | expert",
      "notes": "string | null (max 300 chars)"
    },
    "business": {
      "level": "none | beginner | intermediate | advanced | expert",
      "notes": "string | null (max 300 chars)"
    },
    "subject_specific": {
      "topics_already_mastered": [
        {
          "topic": "string",
          "treatment": "reference | skip"
        }
      ],
      "topics_partially_known": [
        {
          "topic": "string",
          "knowledge_state": "string (max 300 chars)"
        }
      ],
      "known_misconceptions": [
        {
          "topic": "string",
          "misconception": "string (max 500 chars)"
        }
      ]
    }
  }
}
```

| Field                          | Status      | Notes                                                                                    |
| ------------------------------ | ----------- | ---------------------------------------------------------------------------------------- |
| `domain`                       | MODIFIED    | Now an **array** with `is_primary` flag (was single object)                              |
| `domain.domain_name`           | MODIFIED    | Always nullable at API level. UI prompts when `level >= beginner`. `[P0-R3-3]`           |
| `ai_fluency.level`             | MODIFIED    | Enum standardized to `none\|beginner\|intermediate\|advanced\|expert` (was `conceptual`) |
| `topics_to_skip`               | `[REMOVED]` | Merged into `topics_already_mastered` with `treatment: reference\|skip`                  |
| All `notes` fields             | MODIFIED    | Max 300 chars enforced                                                                   |
| `known_misconceptions`         | MODIFIED    | Capped at 5 entries max                                                                  |
| All expertise `level` defaults | MODIFIED    | Default is `beginner` (was `intermediate`)                                               |

### SECTION 3 — Professional Context

```json
{
  "professional_context": {
    "current_role": "string | null (max 100 chars)",
    "industry": "string | null (max 100 chars)",
    "organization_type": "string | null — e.g. 'enterprise', 'startup', 'university', 'freelance'",
    "team_context": "string | null (max 200 chars)",
    "real_projects": [
      {
        "project_name": "string (max 100 chars)",
        "description": "string (max 500 chars)"
      }
    ],
    "tools_in_use": ["string (max 50 chars each, max 20 items)"],
    "constraints": "string | null (max 300 chars)"
  }
}
```

| Field                       | Status      | Notes                                                   |
| --------------------------- | ----------- | ------------------------------------------------------- |
| `real_projects[].relevance` | `[REMOVED]` | Engine infers relevance from description + lesson topic |
| `real_projects`             | MODIFIED    | Capped at 5 entries max                                 |
| `tools_in_use`              | MODIFIED    | Max 20 items, each max 50 chars                         |
| All freetext fields         | MODIFIED    | Character limits enforced                               |

### SECTION 4 — Goals and Motivation

```json
{
  "goals": {
    "primary_learning_goal": "string | null (max 500 chars) — null until user provides it [P0-R2-6 FIX]",
    "secondary_goals": ["string (max 200 chars each, max 5 items)"],
    "urgency": "low | medium | high",
    "urgency_note": "string | null (max 200 chars)",
    "career_goal": "string | null (max 300 chars)",
    "immediate_application": "string | null (max 300 chars)"
  }
}
```

| Field               | Status   | Notes                                                  |
| ------------------- | -------- | ------------------------------------------------------ |
| `urgency_context`   | MODIFIED | Renamed to `urgency_note` to signal it's supplementary |
| All freetext fields | MODIFIED | Character limits enforced                              |

### SECTION 5 — Communication Preferences

```json
{
  "communication": {
    "language_complexity": "plain | professional | technical | expert",
    "preferred_structure": "examples-first | theory-first | story-narrative | reference-lookup | problem-first",
    "verbosity": "concise | moderate | detailed",
    "analogy_domain": "string | null (max 100 chars)",
    "tone": "formal | professional | conversational | peer-to-peer",
    "wants_summaries": "boolean",
    "wants_check_in_questions": "boolean",
    "format_notes": "string | null (max 200 chars)"
  }
}
```

| Field                 | Status | Notes                                                                    |
| --------------------- | ------ | ------------------------------------------------------------------------ |
| No structural changes | —      | Strongest section per Schema Analyst audit. Defaults added to Appendix B |

**Defaults (Appendix B updates):**

- `language_complexity` → `professional`
- `preferred_structure` → `examples-first`
- `verbosity` → `moderate`
- `tone` → `professional`
- `wants_summaries` → `true`
- `wants_check_in_questions` → `true`

### SECTION 6 — Content Delivery Preferences

```json
{
  "delivery": {
    "output_format": "prose | structured-with-headers | mixed",
    "target_length": "short | medium | long | match-source",
    "include_code_samples": "boolean",
    "code_verbosity": "minimal | annotated | fully-explained",
    "include_visual_descriptions": "boolean",
    "language": "string — default 'English'",
    "language_proficiency": "native | fluent | intermediate | basic",
    "native_language": "string | null — ISO 639-1 code or freetext, max 50 chars",
    "preferred_code_language": "string | null — max 50 chars"
  }
}
```

| Field                          | Status       | Notes                                                                     |
| ------------------------------ | ------------ | ------------------------------------------------------------------------- |
| `target_length`                | MODIFIED     | Clean enum values (word count ranges moved to documentation, not stored)  |
| `visual_description_notes`     | `[REMOVED]`  | Absorbed into accessibility section                                       |
| `language_proficiency`         | `[NEW]`      | Separates "what language" from "how well they know it"                    |
| `native_language`              | `[NEW v1.4]` | Mother tongue — ISO 639-1 code from dropdown or freetext via "Other"      |
| `preferred_code_language`      | `[NEW v1.4]` | Language for code examples — single-select from PROGRAMMING_LANGUAGES     |
| `include_code_samples` default | MODIFIED     | Conditional: `false` when `programming.level == none`, `true` otherwise   |
| `code_verbosity`               | MODIFIED     | Only relevant when `include_code_samples == true` (documented dependency) |

### SECTION 7 — Accessibility `[NEW SECTION]`

```json
{
  "accessibility": {
    "screen_reader": "boolean — default false",
    "cognitive_load_preference": "standard | reduced",
    "color_blind_safe": "boolean — default false",
    "dyslexia_friendly": "boolean — default false",
    "notes": "string | null (max 300 chars)"
  }
}
```

All fields optional. Defaults are conservative (standard, no special needs assumed). This section consolidates accessibility concerns that were previously scattered or missing.

### Field Resolution Rules (Cross-Field Dependencies)

| Rule                                       | Condition                                                                                                                                                                                                                                                                                                                                                                                                                     | Behavior                                                                                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `analogy_domain` fallback                  | Field is null                                                                                                                                                                                                                                                                                                                                                                                                                 | Use `professional_context.industry`. If also null, use generic everyday analogies                                                                         |
| `include_code_samples` deterministic chain | Evaluation order: (1) If user explicitly set → use user value. (2) If `programming.level == none` → `false`. (3) If `programming.level >= beginner` → `true`. On a fresh profile, `programming.level` is `default`-sourced (`beginner`) → `include_code_samples = true` but also `default`-sourced (not `inferred`). Only becomes `inferred` when `programming.level` has a `user` or `phm` source. `[P1-1 FIX, P2-R4-1 FIX]` |
| `code_verbosity` dependency                | `include_code_samples` is `false`                                                                                                                                                                                                                                                                                                                                                                                             | `code_verbosity` is ignored                                                                                                                               |
| `domain_name` guidance                     | `domain.level` is `none`                                                                                                                                                                                                                                                                                                                                                                                                      | `domain_name` should be null. When `level >= beginner`, UI prompts for `domain_name` but API accepts null (PHM/defaults may not have it). `[P0-R3-3 FIX]` |
| `include_visual_descriptions` conditional  | `accessibility.screen_reader` is `true`                                                                                                                                                                                                                                                                                                                                                                                       | Default to `true` (provide alt-text descriptions). Otherwise `false`. `[P1-R2-3 FIX]`                                                                     |
| Inferred `language_complexity`             | Not set by learner                                                                                                                                                                                                                                                                                                                                                                                                            | Derive from expertise levels (see Onboarding Inference Rules)                                                                                             |
| Inferred `tone`                            | Not set by learner                                                                                                                                                                                                                                                                                                                                                                                                            | Derive from `language_complexity`                                                                                                                         |
| Inferred `code_verbosity`                  | Not set by learner                                                                                                                                                                                                                                                                                                                                                                                                            | `programming.level: none→N/A, beginner→fully-explained, intermediate→annotated, advanced/expert→minimal`                                                  |

### Validation Rules

| Rule                   | Enforcement                                                                                                                                                                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| All freetext fields    | Max character limits as documented per field                                                                                                                                                                                                                                                                                               |
| All arrays             | Max item limits as documented per field                                                                                                                                                                                                                                                                                                    |
| `learner_id`           | Auth subject string from JWT `sub`. Max 255 chars. Set by system from token, not user-provided. `[P0-1 FIX]`                                                                                                                                                                                                                               |
| `profile_version`      | Semver string, set by system (not user)                                                                                                                                                                                                                                                                                                    |
| Expertise level enums  | Must be one of: `none\|beginner\|intermediate\|advanced\|expert`                                                                                                                                                                                                                                                                           |
| `consent_given`        | Must be `true` for profile creation                                                                                                                                                                                                                                                                                                        |
| `known_misconceptions` | Max 5 entries                                                                                                                                                                                                                                                                                                                              |
| `real_projects`        | Max 5 entries                                                                                                                                                                                                                                                                                                                              |
| `domain` array         | Max 5 entries. Exactly one `is_primary: true` when list is non-empty. **Auto-primary rule `[P1-2 FIX]`:** If no entry has `is_primary: true`, the first entry is auto-marked primary. If multiple entries have `is_primary: true`, only the first is kept as primary, rest set to `false`. Empty array is valid (no domain expertise yet). |
| Duplicate detection    | `topics_already_mastered[].topic` — deduplicated, case-normalized                                                                                                                                                                                                                                                                          |

### Security: Freetext Field Handling

All freetext fields (`notes`, `misconception`, `description`, `constraints`, `analogy_domain`, `format_notes`, `knowledge_state`, `accessibility.notes`) are potential prompt injection vectors when passed to downstream LLM-based systems.

**This system's responsibility:**

1. Enforce max character limits at API validation layer
2. Store values as-is (no sanitization at storage — that's the consumer's job)
3. Document in API contract that all freetext values are user-provided and MUST be sandwiched in consuming system prompts

**Consumer's responsibility (personalization engine, TutorClaw):**

1. Sandwich pattern: system instructions ABOVE and BELOW profile data
2. Inject profile fields as data, not as instructions
3. Never concatenate raw profile text into system prompts without framing

---

## 3. Personalization Engine Requirements (Separate Build — Schema Support)

This section documents what the schema must support for the future personalization engine. The engine is out of scope for this build, but schema design decisions were informed by these requirements.

### Seven Personalization Dimensions `[Updated v1.4 — was Five]`

| Dimension         | What Changes                                          | Primary Schema Fields                                                                   |
| ----------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Vocabulary**    | Word choice, jargon level, term definitions           | `communication.language_complexity`, `expertise.*`                                      |
| **Examples**      | Analogies, case studies, illustration domain          | `professional_context.*`, `communication.analogy_domain`, `expertise.domain`            |
| **Depth**         | Expansion vs compression of sections                  | `expertise.subject_specific.*`, `goals.*`, `communication.verbosity`                    |
| **Structure**     | Organization, flow, formatting                        | `communication.preferred_structure`, `delivery.output_format`, `delivery.target_length` |
| **Tone**          | Voice, register, interpersonal style                  | `communication.tone`, `communication.language_complexity`                               |
| **Language**      | Response language, vocabulary localization, analogies | `delivery.language`, `delivery.native_language`, `delivery.language_proficiency`        |
| **Code Language** | Programming language used in code examples            | `delivery.preferred_code_language`, `expertise.programming.languages`                   |

### Engine Invariants (Schema Must Support)

1. Every **personalization-relevant** schema field drives at least one personalization dimension. `[P2-R3-1 FIX]` Excluded from this invariant: identity fields (`id`, `learner_id`, `created_at`, `updated_at`, `profile_version`), consent fields (`consent_given`, `consent_date`), system metadata (`field_sources`, `onboarding_*`, `deleted_at`), and `accessibility.color_blind_safe` (frontend theme concern, not content personalization).
2. Partial profiles produce progressively better output (never worse than no profile)
3. Personalization changes presentation, never accuracy
4. Conflict resolution follows: Invariants > Explicit preferences > Inferred/defaults > Source fidelity

### Engine Input Contract (What This API Serves)

The profile API serves the complete profile JSON. The consuming engine is responsible for:

- Applying transformation rules per field
- Resolving field conflicts
- Applying defaults for missing fields
- Generating the personalization manifest

Full transformation rules, conflict resolution matrix, quality gates, and worked examples are documented in `research/engine-spec.md`.

---

## 4. Onboarding Specification

### Approach: Hybrid (Option C)

Structured form for fields with clear answer spaces (dropdowns, selects) + optional AI conversation for open-ended enrichment.

### Onboarding Flow

**Phase 1: Goals (45-60 seconds)**

1. `goals.primary_learning_goal` — open text
2. `goals.urgency` — 3-option select: Low / Medium / High
3. Optional: `goals.urgency_note` — short text (deadline/context)
4. Optional: `goals.immediate_application` — "What's the first thing you want to build?"
5. Optional: `goals.secondary_goals[]` — up to 5 items

**Phase 2: Background (30-60 seconds)**

6. `expertise.programming.level` — 5-option dropdown
7. Optional: `expertise.programming.languages[]` — chip multi-select (shown when level != none)
8. `expertise.ai_fluency.level` — 5-option dropdown
9. `expertise.business.level` — 5-option dropdown
10. Optional: `expertise.domain[0].level` + `domain_name` — dropdown + text input

**Phase 3: Professional Context (20-60 seconds)**

11. `professional_context.current_role` — text input
12. `professional_context.industry` — text input
13. Optional: `professional_context.team_context` — single select
14. Optional: `professional_context.organization_type` — dropdown
15. Optional: `professional_context.tools_in_use[]` — chip multi-select
16. Optional: `professional_context.constraints` — short text (limits/requirements)

**Phase 3.5: Quick Preferences (10-25 seconds)**

21. `communication.preferred_structure` — radio group
22. `communication.verbosity` — radio group
23. `communication.tone` — radio group
24. Optional: `communication.wants_summaries` — toggle
25. Optional: `communication.wants_check_in_questions` — toggle
26. `delivery.native_language` — select dropdown (ISO 639-1 + "Other" freetext) `[NEW v1.4]`
27. `delivery.language` + `delivery.language_proficiency` — always visible (locale gate removed v1.4)
28. `delivery.preferred_code_language` — select dropdown from PROGRAMMING_LANGUAGES `[NEW v1.4]`

**Phase 4: AI Enrichment (optional, 0-5 minutes)**

27. Optional: 1 `professional_context.real_projects[0]` (name + description)
28. Optional: `goals.career_goal`
29. Optional: `expertise.subject_specific.*` (skip/partial/misconceptions)

### Fields NEVER Asked in Onboarding v1.0 (Inferred or Deferred)

> **Note:** Many of these gaps are addressed in §9 (v1.2 improvements). Fields marked `[v1.2 FIX]` will be collected in the updated onboarding flow.

| Field                                 | v1.0 Handling                       | v1.2 Status                                                       |
| ------------------------------------- | ----------------------------------- | ----------------------------------------------------------------- |
| `communication.preferred_structure`   | Default `examples-first`            | **`[v1.2 FIX]`** Collected in Quick Preferences step (§9.2.2)     |
| `communication.verbosity`             | Inferred from expertise             | **`[v1.2 FIX]`** Collected in Quick Preferences step (§9.2.2)     |
| `communication.tone`                  | Inferred from `language_complexity` | **`[v1.2 FIX]`** Collected in Quick Preferences step (§9.2.2)     |
| `communication.language_complexity`   | Inferred from expertise levels      | Inferred (improved two-axis engine §9.3)                          |
| `communication.analogy_domain`        | Inferred from `industry`            | Inferred (unchanged)                                              |
| `delivery.language`                   | Default "English"                   | **`[v1.4 FIX]`** Always collected — locale gate removed (§9.2.2)  |
| `delivery.native_language`            | Did not exist                       | **`[v1.4 NEW]`** Select dropdown in Quick Preferences (§9.2.2)    |
| `delivery.preferred_code_language`    | Did not exist                       | **`[v1.4 NEW]`** Select dropdown in Quick Preferences (§9.2.2)    |
| `delivery.*` (other fields)           | All defaults or inferred            | Defaults/inferred (unchanged)                                     |
| `expertise.programming.languages[]`   | Never collected                     | **`[v1.2 FIX]`** Multi-select in Expertise step (§9.2.1)          |
| `goals.immediate_application`         | Never collected                     | **`[v1.2 FIX]`** Optional text in Goals step (§9.2.3)             |
| `professional_context.team_context`   | Never collected                     | **`[v1.2 FIX]`** Single-select in Professional step (§9.2.5)      |
| `professional_context.tools_in_use[]` | Never collected                     | **`[v1.2 FIX]`** Multi-select chips in Professional step (§9.2.4) |
| `accessibility.color_blind_safe`      | Frontend theme concern              | Settings page only (unchanged)                                    |
| `expertise.subject_specific.*`        | Inferred from quiz performance      | Inferred (unchanged — no assessment system yet)                   |
| `known_misconceptions`                | Detected through assessment         | Detected (unchanged)                                              |

### Inference Rules (Communication/Delivery from Expertise) — `[B-7 FIX]`

**Algorithm (v1.2, implemented):** Two-axis inference.

1. **Technical axis:** `technical_level = max(expertise.programming.level, expertise.ai_fluency.level)`
2. **Professional axis:** `professional_level = max(expertise.business.level, expertise.domain[primary].level)`
   - When `expertise.domain` is empty (no entries), treat `expertise.domain[primary].level` as `none` for max calculation `[P1-R4-2 FIX]`.
3. Bucket each axis into: `low` (`none|beginner`), `intermediate`, `advanced+` (`advanced|expert`).
4. Infer communication fields from `(technical_bucket, professional_bucket)` using the rules below.

User-set values ALWAYS override inferences. Inferred values are stored in the DB when inference runs (not computed on-the-fly).

**When inference runs `[P0-R3-2 FIX]`:** On section update (`PATCH /me/sections/expertise`), on PHM sync, and on onboarding phase completion — but **NOT on initial profile creation** (`POST /`). Rationale: at creation, all expertise fields are `default`-sourced (`beginner`). Inferring communication preferences from default expertise is meaningless — it would produce inferred values that aren't based on real learner data. Inference activates only when at least one expertise field has a `user` or `phm` source. This means a fresh profile has `profile_completeness = 0.0` (all defaults, no inferences). After the user completes onboarding Phase 2 (expertise), inference runs and populates communication/delivery fields.

**Override rule:** If a user manually sets `language_complexity = expert` but their expertise says `beginner`, the manual value sticks. Inferred values have a lower priority than explicit values.

**Field provenance tracking (`field_sources`)** — `[P0-5 FIX]`:

Every non-identity field has a source tracked in `field_sources: dict[str, str]` stored as JSONB metadata (**exposed in API responses as read-only metadata** to support UX transparency like "auto-set" badges). Sparse map: missing key = `default`-sourced `[P1-R4-1 FIX]`. Sources:

| Source     | Meaning                                                 | Override Priority (highest wins) |
| ---------- | ------------------------------------------------------- | -------------------------------- |
| `user`     | Explicitly set by user via API, onboarding, or settings | 4 (highest)                      |
| `phm`      | Set by PHM sync from tutoring session data              | 3                                |
| `inferred` | Derived by inference rules from expertise levels        | 2                                |
| `default`  | System default from Appendix B                          | 1 (lowest)                       |

**Rules:**

- A field can only be overwritten by a source with **equal or higher** priority
- `user` always wins (priority 4): PHM and inference never overwrite user-set values
- PHM (priority 3) can overwrite `inferred` and `default` values
- Inference (priority 2) can overwrite `default` AND `inferred` values `[P0-R4-1 FIX]` — inference must recompute previously-inferred fields when expertise changes (e.g., user upgrades `programming.level` → `language_complexity` re-inferred). Same-priority overwrite is allowed because inference is idempotent and always derived from current expertise.
- Inference **never** overwrites `user` or `phm` values
- When PHM downranking is enabled (future): PHM can overwrite `inferred` values in both directions (upgrade AND downgrade)
- `field_sources` is updated atomically with the field value

**Example:**

```json
{
  "field_sources": {
    "communication.language_complexity": "inferred",
    "communication.tone": "user",
    "communication.verbosity": "inferred",
    "delivery.include_code_samples": "inferred",
    "expertise.programming.level": "user",
    "expertise.ai_fluency.level": "phm",
    "goals.primary_learning_goal": "user"
  }
}
```

**Communication inference rules (summary):**

| Technical    | Professional  | Inferred `language_complexity` | Inferred `tone`  | Inferred `verbosity` |
| ------------ | ------------- | ------------------------------ | ---------------- | -------------------- |
| advanced+    | intermediate+ | `technical`                    | `peer-to-peer`   | `concise`            |
| advanced+    | low           | `technical`                    | `conversational` | `moderate`           |
| intermediate | any           | `professional`                 | `professional`   | `moderate`           |
| low          | intermediate+ | `professional`                 | `professional`   | `detailed`           |
| low          | low           | `plain`                        | `conversational` | `detailed`           |

**Delivery inference rules (summary):**

| `programming.level`   | Inferred `include_code_samples` | Inferred `code_verbosity` |
| --------------------- | ------------------------------- | ------------------------- |
| `none`                | `false`                         | N/A                       |
| `beginner`            | `true`                          | `fully-explained`         |
| `intermediate`        | `true`                          | `annotated`               |
| `advanced` / `expert` | `true`                          | `minimal`                 |

**Special cases:**

- If `programming.level = none` regardless of other expertise: `include_code_samples = false`, `code_verbosity = N/A`
- If `programming.level = beginner` but **professional axis** is `advanced+` (e.g., domain expert learning to code): `language_complexity = professional` (not `technical`), but `code_verbosity = fully-explained`
- If `business.level = advanced` but `programming.level = none`: `language_complexity = professional` (business vocabulary, not technical), and `include_code_samples = false`

### Skip Behavior

- Every phase is skippable. "Skip for now" (de-emphasized text link, not button)
- No auto-advance on field selection — the user explicitly chooses **Continue** or **Skip** (prevents accidental step skipping and makes completion intentional).
- Skipping applies defaults for that section (Appendix B)
- **Skipping counts as completion for `onboarding_progress`** `[P1-R2-2 FIX]` — the user made a deliberate choice. `sections_completed[phase] = true` regardless of skip. The distinction between "skipped" and "filled" is tracked via `field_sources` (skipped fields remain `default`-sourced).
- AI enrichment (Phase 4) skip: counts as completed. `ai_enrichment: true` in `sections_completed`. The phase is explicitly optional — skipping is the expected path for most users.
- `consent_given` is the ONLY required field (GDPR)

### Onboarding Abandonment

- Save whatever was completed. Profile is valid even with 1 section
- Content served with defaults for missing sections
- **First-session nudge (redirect once):** on the first authenticated visit with **no profile** (404) or **incomplete onboarding**, the frontend redirects to `/onboarding` **once per learner**. After that, do not repeatedly force redirects.
- **Persistent CTA bar (global, full-width):** after the redirect-once latch is satisfied, show a global CTA bar below the navbar on all pages (except `/onboarding` and `/profile`) when setup is still needed:
  - No profile: "Set up your Learner Profile" → CTA: "Start setup"
  - Profile incomplete: "Finish your Learner Profile" → CTA: "Continue setup" + show completeness (%)
  - Opted out: "Personalization is off" → CTA: "Enable personalization"
  - Dismissible; dismissal is remembered for 7 days.
- **Never double-CTA:** do not show the in-content "Profile X% complete" card when the global CTA bar is eligible to display. The in-content card is a fallback shown only when the global bar is dismissed (or unavailable), so there is always at least one path back to setup.
- Profile settings page always accessible from user menu

**Client-side keys (stable UX contract):**

- `learner_profile_onboarding_redirected:{learner_id}` — redirect-once latch
- `profile_nudge_dismissed:{learner_id}` — hides global CTA bar for 7 days
- `learner_profile_opt_out:{learner_id}` — disables profile/personalization until re-enabled

### Progressive Profiling Triggers (v1)

| Trigger                       | What Gets Resurfaced        | UX                                                                                                                                                       |
| ----------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| After first lesson            | "Was this the right level?" | In-lesson feedback widget (too easy / just right / too hard)                                                                                             |
| After 3 lessons               | Communication preferences   | Quick 2-option prompt ("More examples or more theory?")                                                                                                  |
| When learner starts a project | Professional context        | Project creation form collects `real_projects`                                                                                                           |
| After quiz/assessment         | `topics_already_mastered`   | Auto-populated when assessment data available (no assessment system in this build — trigger activates when external assessment data is provided via API) |
| Manually anytime              | All fields                  | "Edit profile" in settings                                                                                                                               |

### Onboarding State Tracking — `[B-4 FIX]`

**Onboarding phases map to schema sections as follows:**

| Onboarding Phase              | Schema Section(s) Updated                                                                                            | Tracking Key           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Phase 1: Goals                | `goals`                                                                                                              | `goals`                |
| Phase 2: Background           | `expertise`                                                                                                          | `expertise`            |
| Phase 3: Professional Context | `professional_context`                                                                                               | `professional_context` |
| Phase 4: AI Enrichment        | `goals` (career_goal, immediate_application), `professional_context` (real_projects), `expertise` (subject_specific) | `ai_enrichment`        |

The onboarding phase keys are the 6 **onboarding phases**, not the 7 schema sections. DB column `onboarding_sections_completed` maps to API response field `sections_completed` `[P1-4 FIX]`:

```json
{
  "sections_completed": {
    "goals": true,
    "expertise": true,
    "professional_context": false,
    "accessibility": false,
    "communication_preferences": false,
    "ai_enrichment": false
  },
  "overall_completed": false,
  "onboarding_progress": 0.33,
  "profile_completeness": 0.65
}
```

`next_section` in `OnboardingStatus` returns one of: `"goals"`, `"expertise"`, `"professional_context"`, `"accessibility"`, `"communication_preferences"`, `"ai_enrichment"`, or `null` (all complete).

---

## 5. Technical Specification

### Stack

| Component    | Technology                                  | Rationale                         |
| ------------ | ------------------------------------------- | --------------------------------- |
| Framework    | FastAPI 0.115+                              | Matches content-api; async-native |
| ORM          | SQLModel 0.0.22+ + SQLAlchemy 2.0 async     | Type-safe, Pydantic integration   |
| Database     | PostgreSQL 16+ (Neon serverless)            | JSONB support, zero ops           |
| Async Driver | asyncpg                                     | Fastest Python PG async driver    |
| Migrations   | Alembic 1.14+                               | Standard, async support           |
| Cache        | Redis (shared instance)                     | Already deployed, `lp:` prefix    |
| HTTP Client  | httpx (async)                               | PHM sync client                   |
| Auth         | api_infra/auth.py (shared)                  | JWT/JWKS, dev_mode bypass         |
| Testing      | pytest + pytest-asyncio + fakeredis + respx | Matches content-api               |
| Port         | 8004                                        | Next available                    |

### Project Structure

```
apps/learner-profile-api/
├── Dockerfile
├── pyproject.toml
├── project.json
├── src/
│   ├── api_infra/                  # Shared auth, rate limiting, Redis
│   └── learner_profile_api/
│       ├── main.py                 # FastAPI app, CORS, lifespan, health
│       ├── config.py               # pydantic-settings from env
│       ├── core/
│       │   ├── lifespan.py         # Startup: Redis + DB; Shutdown: close
│       │   └── database.py         # SQLModel async engine, session factory
│       ├── models/
│       │   └── profile.py          # SQLModel table models
│       ├── schemas/
│       │   └── profile.py          # Pydantic request/response models
│       ├── routes/
│       │   └── profile.py          # Profile CRUD + onboarding
│       └── services/
│           ├── profile_service.py  # Business logic, CRUD
│           ├── inference.py        # Communication/delivery inference rules
│           └── phm_client.py       # HTTP client for PHM sync
└── tests/
    ├── conftest.py
    ├── test_profile_crud.py
    ├── test_profile_routes.py
    ├── test_schema_validation.py
    ├── test_inference_rules.py
    └── e2e/
        ├── conftest.py
        ├── test_profile_flow.py
        └── test_onboarding_flow.py
```

### Database Schema (Hybrid: Core Columns + JSONB)

```python
class LearnerProfile(SQLModel, table=True):
    __tablename__ = "learner_profiles"

    # Identity (relational columns, indexed)
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)  # Internal PK, never exposed in API
    learner_id: str = Field(max_length=255)  # Auth subject string from JWT `sub`. NOT a UUID we generate.
    name: str | None = Field(default=None, max_length=255)
    profile_version: str = Field(default="1.1", max_length=10)

    # GDPR
    consent_given: bool = Field(default=False)
    consent_date: datetime | None = Field(default=None)

    # Profile Sections (JSONB)
    expertise: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    professional_context: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    goals: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    communication: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    delivery: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    accessibility: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))

    # Onboarding State
    onboarding_completed: bool = Field(default=False)
    onboarding_sections_completed: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))

    # Field Provenance (P0-5 FIX, P0-R4-2 FIX) — tracks source of each field value
    # Named `field_sources` (no leading underscore) to avoid Pydantic treating it as private attribute
    field_sources: dict[str, str] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    # Keys: dotted field paths (e.g. "communication.tone"), Values: "user"|"phm"|"inferred"|"default"
    # Excluded from API response schemas (internal metadata only)

    # Timestamps (M-8: use timezone-aware UTC, not deprecated utcnow)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # Soft Delete (for normal ops; GDPR uses hard delete)
    deleted_at: datetime | None = Field(default=None)


class ProfileAuditLog(SQLModel, table=True):
    __tablename__ = "profile_audit_log"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    learner_id: str = Field(index=True, max_length=255)
    action: str = Field(max_length=50)  # created, updated, section_updated, deleted, gdpr_erased
    changed_sections: list[str] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'[]'")))
    previous_values: dict[str, Any] = Field(sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")))
    source: str = Field(max_length=50, default="api")  # api, onboarding, phm_sync, progressive, admin
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
```

### Indexes

```sql
CREATE UNIQUE INDEX idx_profiles_learner_id ON learner_profiles (learner_id);  -- Full unique: one row per auth sub, always
CREATE INDEX idx_profiles_not_deleted ON learner_profiles (learner_id) WHERE deleted_at IS NULL;  -- Fast lookup for active profiles
CREATE INDEX idx_audit_learner_id ON profile_audit_log (learner_id, created_at DESC);
```

### API Endpoints

All endpoints prefixed with `/api/v1/profiles`.

| Method   | Path                             | Purpose                                                                                                                                                                                                             | Auth             | Success | Error                                         |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- | --------------------------------------------- |
| `GET`    | `/health`                        | Health check (Redis + DB ping)                                                                                                                                                                                      | None             | 200     | 503                                           |
| `POST`   | `/`                              | Create profile (requires `consent_given: true`). If soft-deleted profile exists, **restores** it (clears `deleted_at`, preserves data + onboarding). Returns 200 for restore, 201 for new.                          | Required         | 201/200 | 400 (no consent), 409 (active profile exists) |
| `GET`    | `/me`                            | Get current user's profile                                                                                                                                                                                          | Required         | 200     | 404 (no profile)                              |
| `GET`    | `/admin/by-learner/{learner_id}` | Get profile by learner ID (admin/service only). `learner_id` must be URL-encoded (e.g., `auth0%7Cabc123`). Returns active profiles only; soft-deleted profiles return 404 (use DB query for audit). `[P1-R3-1 FIX]` | Required (admin) | 200     | 403, 404                                      |
| `PATCH`  | `/me`                            | Update profile (merge semantics — only explicitly-sent fields updated, see P0-R3-1)                                                                                                                                 | Required         | 200     | 404, 422                                      |
| `PATCH`  | `/me/sections/{section}`         | Update single JSONB section                                                                                                                                                                                         | Required         | 200     | 404 (section or profile)                      |
| `DELETE` | `/me`                            | Soft-delete profile                                                                                                                                                                                                 | Required         | 204     | 404                                           |
| `DELETE` | `/me/gdpr-erase`                 | Hard delete — true erasure (GDPR)                                                                                                                                                                                   | Required         | 204     | 404                                           |
| `GET`    | `/me/onboarding-status`          | Onboarding completion state                                                                                                                                                                                         | Required         | 200     | 404                                           |
| `PATCH`  | `/me/onboarding/{section}`       | Mark onboarding phase complete + store data. Valid `{section}` values: `goals`, `expertise`, `professional_context`, `accessibility`, `ai_enrichment`. Returns 404 for unknown phase names. `[P1-R2-1 FIX]`         | Required         | 200     | 404, 422                                      |
| `POST`   | `/me/sync-from-phm`              | Pull PHM data into profile                                                                                                                                                                                          | Required         | 200     | 404, 502 (PHM unavailable)                    |
| `GET`    | `/me/completeness`               | Profile completeness score + next recommended field                                                                                                                                                                 | Required         | 200     | 404                                           |

**Duplicate handling (I-3):** `POST /` returns 409 Conflict if a profile already exists for this user's JWT `sub`. Use `PATCH /me` to update.

**Valid section names for `/me/sections/{section}` (I-5):** `expertise`, `professional_context`, `goals`, `communication`, `delivery`, `accessibility`. Case-sensitive, lowercase. Returns 404 for unknown sections.

**PATCH semantics `[P0-R3-1 FIX]`:** JSONB sections use **merge** semantics — only explicitly-sent fields are written; omitted fields keep their existing values. This prevents data loss when a client updates one nested field without resending the entire section.

**Concurrency requirement `[P0-R4-2 FIX]`:** To prevent lost updates under concurrent PATCHes, apply merge updates inside a DB transaction that locks the profile row (`SELECT ... FOR UPDATE`) before reading the existing JSONB and writing the merged result.

**Implementation algorithm:**

```python
# In service layer, after receiving validated ProfileUpdate/SectionUpdate:
def merge_section(existing_json: dict, update_model: BaseModel) -> dict:
    """Merge only explicitly-provided fields into existing section data."""
    merged = existing_json.copy()
    # model_fields_set tracks which fields the client actually sent (Pydantic v2)
    for field_name in update_model.model_fields_set:
        value = getattr(update_model, field_name)
        if isinstance(value, BaseModel):
            # Recurse: nested model (e.g., ProgrammingExpertise within ExpertiseSection)
            merged[field_name] = merge_section(
                merged.get(field_name, {}), value
            )
        else:
            merged[field_name] = value  # Scalar/list: overwrite
    return merged

# For field_sources: only fields in model_fields_set (recursively) get marked "user".
# All other fields preserve their existing field_sources entry.
```

**Example:** Client sends `{ "expertise": { "programming": { "level": "advanced" } } }`:

- `expertise.programming.level` → updated to `"advanced"`, `field_sources = "user"`
- `expertise.ai_fluency.level` → **unchanged** (keeps existing value AND existing `field_sources`)
- `expertise.domain` → **unchanged** (not in `model_fields_set`)
- Concurrent updates to different fields within the same section: safe **when serialized by row lock** (merge preserves untouched fields). Same field: last commit wins.

**Delete lifecycle (I-4, P0-2 FIX):**

- Soft delete (`DELETE /me`): sets `deleted_at`, profile hidden from `GET /me`. Recoverable.
- Restore after soft delete: `POST /` on a soft-deleted profile **restores** the existing row (clears `deleted_at`, preserves all data and onboarding state). Does NOT create a new row. Learner gets their profile back exactly as it was. `[D-13 nuance FIX]` — no onboarding reset on restore; old progress is valid.
- Fresh start: To truly start over, GDPR-erase first (`DELETE /me/gdpr-erase`), then `POST /` creates a new row.
- GDPR erase (`DELETE /me/gdpr-erase`): works on both active AND soft-deleted profiles. Irreversible. After erase, `POST /` creates a genuinely new profile.

### Rate Limits — `[B-6 FIX]`

| Endpoint                 | Rate Limit   | Window   |
| ------------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GET /me`                | 120 requests | 1 minute |
| `PATCH /me`              | 30 requests  | 1 hour   |
| `PATCH /me/sections/*`   | 60 requests  | 1 hour   |
| `PATCH /me/onboarding/*` | 60 requests  | 1 hour   |
| `POST /me/sync-from-phm` | 5 requests   | 1 hour   |
| `GET /me/completeness`   | 60 requests  | 1 minute |
| `POST /`                 | 5 requests   | 1 hour   | `[P0-R2-2 FIX]` Unique constraint handles dedup (409). Rate limit prevents abuse, but allows restore-after-soft-delete. |

Uses the same Redis Lua-based atomic rate limiting from `api_infra/core/rate_limit.py`.

### Request Schemas — `[B-1 FIX]`

```python
from pydantic import BaseModel, Field, field_validator
from typing import Any

# === Typed section schemas (shared by request and response) ===

class DomainExpertise(BaseModel):
    level: Literal["none", "beginner", "intermediate", "advanced", "expert"] = "beginner"
    domain_name: str | None = Field(None, max_length=100)
    is_primary: bool = False
    notes: str | None = Field(None, max_length=300)

class ProgrammingExpertise(BaseModel):
    level: Literal["none", "beginner", "intermediate", "advanced", "expert"] = "beginner"
    languages: list[str] = Field(default_factory=list, max_length=10)
    notes: str | None = Field(None, max_length=300)

class AiFluencyExpertise(BaseModel):
    level: Literal["none", "beginner", "intermediate", "advanced", "expert"] = "beginner"
    notes: str | None = Field(None, max_length=300)

class BusinessExpertise(BaseModel):
    level: Literal["none", "beginner", "intermediate", "advanced", "expert"] = "beginner"
    notes: str | None = Field(None, max_length=300)

class MasteredTopic(BaseModel):
    topic: str = Field(max_length=200)
    treatment: Literal["reference", "skip"] = "reference"

class PartialTopic(BaseModel):
    topic: str = Field(max_length=200)
    knowledge_state: str = Field(max_length=300)

class Misconception(BaseModel):
    topic: str = Field(max_length=200)
    misconception: str = Field(max_length=500)

class SubjectSpecific(BaseModel):
    topics_already_mastered: list[MasteredTopic] = Field(default_factory=list, max_length=50)
    topics_partially_known: list[PartialTopic] = Field(default_factory=list, max_length=20)
    known_misconceptions: list[Misconception] = Field(default_factory=list, max_length=5)

class ExpertiseSection(BaseModel):
    domain: list[DomainExpertise] = Field(default_factory=list, max_length=5)
    programming: ProgrammingExpertise = Field(default_factory=ProgrammingExpertise)
    ai_fluency: AiFluencyExpertise = Field(default_factory=AiFluencyExpertise)
    business: BusinessExpertise = Field(default_factory=BusinessExpertise)
    subject_specific: SubjectSpecific = Field(default_factory=SubjectSpecific)

class RealProject(BaseModel):
    project_name: str = Field(max_length=100)
    description: str = Field(max_length=500)

ToolName = Annotated[str, Field(max_length=50)]  # P1-5 FIX: per-item constraint

class ProfessionalContextSection(BaseModel):
    current_role: str | None = Field(None, max_length=100)
    industry: str | None = Field(None, max_length=100)
    organization_type: str | None = Field(None, max_length=50)
    team_context: str | None = Field(None, max_length=200)
    real_projects: list[RealProject] = Field(default_factory=list, max_length=5)
    tools_in_use: list[ToolName] = Field(default_factory=list, max_length=20)  # Each item max 50 chars
    constraints: str | None = Field(None, max_length=300)

SecondaryGoal = Annotated[str, Field(max_length=200)]  # P1-5 FIX: per-item constraint

class GoalsSection(BaseModel):
    primary_learning_goal: str | None = Field(None, max_length=500)
    secondary_goals: list[SecondaryGoal] = Field(default_factory=list, max_length=5)  # Each item max 200 chars
    urgency: Literal["low", "medium", "high"] | None = None
    urgency_note: str | None = Field(None, max_length=200)
    career_goal: str | None = Field(None, max_length=300)
    immediate_application: str | None = Field(None, max_length=300)

class CommunicationSection(BaseModel):
    language_complexity: Literal["plain", "professional", "technical", "expert"] | None = None
    preferred_structure: Literal["examples-first", "theory-first", "story-narrative", "reference-lookup", "problem-first"] | None = None
    verbosity: Literal["concise", "moderate", "detailed"] | None = None
    analogy_domain: str | None = Field(None, max_length=100)
    tone: Literal["formal", "professional", "conversational", "peer-to-peer"] | None = None
    wants_summaries: bool | None = None
    wants_check_in_questions: bool | None = None
    format_notes: str | None = Field(None, max_length=200)

class DeliverySection(BaseModel):
    output_format: Literal["prose", "structured-with-headers", "mixed"] | None = None
    target_length: Literal["short", "medium", "long", "match-source"] | None = None
    include_code_samples: bool | None = None
    code_verbosity: Literal["minimal", "annotated", "fully-explained"] | None = None
    include_visual_descriptions: bool | None = None
    language: str = "English"
    language_proficiency: Literal["native", "fluent", "intermediate", "basic"] | None = None

class AccessibilitySection(BaseModel):
    screen_reader: bool = False
    cognitive_load_preference: Literal["standard", "reduced"] = "standard"
    color_blind_safe: bool = False
    dyslexia_friendly: bool = False
    notes: str | None = Field(None, max_length=300)

# === Request models ===

class ProfileCreate(BaseModel):
    consent_given: bool = False  # Defaults to False so missing field → handler returns 400, not FastAPI 422 (P0-R2-1 FIX)
    name: str | None = Field(None, max_length=255)
    expertise: ExpertiseSection = Field(default_factory=ExpertiseSection)
    professional_context: ProfessionalContextSection = Field(default_factory=ProfessionalContextSection)
    goals: GoalsSection = Field(default_factory=GoalsSection)
    communication: CommunicationSection = Field(default_factory=CommunicationSection)
    delivery: DeliverySection = Field(default_factory=DeliverySection)
    accessibility: AccessibilitySection = Field(default_factory=AccessibilitySection)
    # Route handler checks: if not body.consent_given → return 400 (consent_required).
    # By defaulting to False, missing field reaches the handler instead of triggering FastAPI 422.

class ProfileUpdate(BaseModel):
    """All fields optional. Only provided fields are updated."""
    name: str | None = None
    expertise: ExpertiseSection | None = None
    professional_context: ProfessionalContextSection | None = None
    goals: GoalsSection | None = None
    communication: CommunicationSection | None = None
    delivery: DeliverySection | None = None
    accessibility: AccessibilitySection | None = None
```

### Response Schemas

```python
class ProfileResponse(BaseModel):
    learner_id: str
    name: str | None
    profile_version: str
    consent_given: bool
    consent_date: datetime | None
    expertise: ExpertiseSection
    professional_context: ProfessionalContextSection
    goals: GoalsSection
    communication: CommunicationSection
    delivery: DeliverySection
    accessibility: AccessibilitySection
    onboarding_completed: bool
    onboarding_progress: float  # 0.0-1.0 — user actions only
    profile_completeness: float  # 0.0-1.0 — personalization readiness
    created_at: datetime
    updated_at: datetime

class OnboardingStatus(BaseModel):
    learner_id: str
    sections_completed: dict[str, bool]  # keys: goals, expertise, professional_context, accessibility, communication_preferences, ai_enrichment
    overall_completed: bool
    next_section: str | None  # one of: goals, expertise, professional_context, accessibility, communication_preferences, ai_enrichment, or null
    onboarding_progress: float  # 0.0-1.0 — user actions only (P0-4 FIX)
    profile_completeness: float  # 0.0-1.0 — personalization readiness (includes inferred/defaults)

class CompletenessResponse(BaseModel):
    learner_id: str
    profile_completeness: float  # 0.0-1.0 — personalization readiness (includes inferred/defaults)
    onboarding_progress: float  # 0.0-1.0 — user actions only (completed phases / total phases)
    per_section: dict[str, float]  # per-section completeness (weighted). Keys: section names.
    highest_impact_missing: list[str]  # Dotted FIELD paths (not section names), ordered by impact [P1-R4-3 FIX]
    # Example: ["goals.primary_learning_goal", "expertise.programming.level", "professional_context.current_role"]
    # Returns up to 5 fields. Only includes fields that are `default`-sourced (no user/phm/inferred value).
    # Priority order: goals.primary_learning_goal > expertise.programming.level > expertise.ai_fluency.level > expertise.domain > professional_context.current_role > professional_context.industry > remaining by section weight.

class ErrorResponse(BaseModel):
    """Standard error response for all non-2xx responses."""
    error: str           # Machine-readable code: "consent_required", "profile_exists", "not_found", "validation_error", "forbidden"
    message: str         # Human-readable explanation
    details: dict[str, Any] | None = None  # Field-level errors for 422
```

**Error codes by status — `[B-2 FIX]`:**

| HTTP Status | `error` code           | When                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400         | `consent_required`     | `POST /` with `consent_given: false`. Checked in route handler after Pydantic parses the body. `[P2-R4-4 FIX]` Note: if the request body is malformed JSON or has invalid field types, FastAPI returns 422 before the handler runs — this is expected and correct. The 400 only applies to structurally valid requests where `consent_given` is explicitly `false` or omitted (defaults to `false`). |
| 403         | `forbidden`            | Accessing another user's profile without admin role                                                                                                                                                                                                                                                                                                                                                  |
| 404         | `not_found`            | Profile doesn't exist, or unknown section name                                                                                                                                                                                                                                                                                                                                                       |
| 409         | `profile_exists`       | `POST /` for a user that already has a profile                                                                                                                                                                                                                                                                                                                                                       |
| 422         | `validation_error`     | Invalid enum value, exceeds max length, array too large. `details` contains per-field errors                                                                                                                                                                                                                                                                                                         |
| 429         | `rate_limited`         | Request exceeds rate limit. Response includes `Retry-After` header (seconds). `details: { "limit": 30, "window": "1h", "retry_after": 1742 }` `[P2-1 FIX]`                                                                                                                                                                                                                                           |
| 502         | `upstream_unavailable` | PHM sync failed due to Study Mode API being down                                                                                                                                                                                                                                                                                                                                                     |

### Two Separate Metrics — `[P0-4 FIX]`

The system tracks **two distinct metrics** to avoid conflating user actions with system readiness:

#### 1. `onboarding_progress` (User Actions Only)

Tracks what the learner has **explicitly done**. Used for UX (progress bar, XP, nudges).

- Denominator: 6 onboarding phases (goals, expertise, professional_context, accessibility, communication_preferences, ai_enrichment)
- Numerator: phases the user has completed (stored in `onboarding_sections_completed`)
- Formula: `completed_phases / total_phases` → 0.0 to 1.0
- Inferred/default values do NOT count
- This drives: progress bar, "Profile X% complete" banner, XP rewards

#### 2. `profile_completeness` (Personalization Readiness)

Tracks how ready the profile is for downstream personalization. Includes inferred and default values.

**Section weights** (sum = 1.0):

| Section                | Weight | Rationale                                                                 |
| ---------------------- | ------ | ------------------------------------------------------------------------- |
| `expertise`            | 0.25   | Drives vocabulary, depth, code inclusion — highest personalization impact |
| `goals`                | 0.20   | Drives lesson framing and emphasis allocation                             |
| `professional_context` | 0.20   | Drives example selection and grounding                                    |
| `communication`        | 0.15   | Drives tone and structure (often inferred)                                |
| `delivery`             | 0.10   | Drives format (often inferred or defaulted)                               |
| `accessibility`        | 0.10   | Drives accessibility adaptations                                          |

**Section "filled" scoring — weighted by provenance `[P0-R2-4 FIX]`:**

Each field within a section contributes to completeness based on its `field_sources` entry:

| Source     | Contribution Weight | Rationale                                               |
| ---------- | ------------------- | ------------------------------------------------------- |
| `user`     | 1.0                 | Explicitly provided — highest signal                    |
| `phm`      | 0.8                 | Evidence-based from tutoring — strong signal            |
| `inferred` | 0.5                 | Derived from real user data — genuinely improves output |
| `default`  | 0.0                 | System default — no signal, no contribution             |

> **ADR 2026-02-28: `inferred` weight bumped from 0.4 to 0.5.** Inferred values are derived from real user-set expertise levels (not guesses), so they genuinely improve personalization quality. 0.4 was too punitive and contributed to deflated completeness scores post-onboarding.

**High-signal fields only:** The completeness metric counts only the **20 fields** that directly change content personalization output (see `learner_profile_schema.md` "How this drives personalization" for evidence). Low-signal optional fields (e.g., `subject_specific.known_misconceptions`, `format_notes`, `color_blind_safe`) still exist in the schema and can be filled via profile settings, but don't count toward completeness.

| Section                    | High-Signal Fields (counted)                                               | Excluded (still in schema)                                                             |
| -------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `expertise` (4)            | programming.level, programming.languages, ai_fluency.level, business.level | domain, subject_specific.\* (3 fields)                                                 |
| `goals` (3)                | primary_learning_goal, urgency, career_goal                                | secondary_goals, urgency_note, immediate_application                                   |
| `professional_context` (3) | current_role, industry, tools_in_use                                       | organization_type, team_context, real_projects, constraints                            |
| `communication` (5)        | language_complexity, preferred_structure, verbosity, tone, wants_summaries | analogy_domain, wants_check_in_questions, format_notes                                 |
| `delivery` (3)             | output_format, code_verbosity, language                                    | target_length, include_code_samples, include_visual_descriptions, language_proficiency |
| `accessibility` (2)        | cognitive_load_preference, screen_reader                                   | color_blind_safe, dyslexia_friendly, notes                                             |

> **ADR 2026-02-28: Trimmed from 41 to 20 high-signal fields.** With 41 fields, completing all 6 onboarding phases yielded only ~26% completeness — misleading and deflating for users who did real work. The excluded fields are either (a) too granular for most users (known_misconceptions), (b) redundant with other fields (include_code_samples vs code_verbosity), or (c) CSS-level settings that don't affect content (color_blind_safe, dyslexia_friendly). Post-onboarding completeness now lands in the **50-60% range**, which honestly reflects the personalization quality.

**Section completeness** = (sum of field contribution weights in section) / (count of high-signal fields in section). Then weighted by section weight from table above.

**Result:** A brand new profile with all defaults has `profile_completeness = 0.0`. After completing onboarding, completeness rises to ~50-60% (user-set fields + inferred fields). Filling remaining fields via profile settings pushes toward 100%.

**`highest_impact_missing`:** Returns up to 5 dotted field paths that are still `default`-sourced (i.e., missing from `field_sources`), ordered by impact. Priority order: `goals.primary_learning_goal` > `expertise.programming.level` > `expertise.ai_fluency.level` > `professional_context.current_role` > `professional_context.industry` > remaining by section weight.

### Cache Strategy

| Data              | Cache Key                    | TTL    | Invalidation       |
| ----------------- | ---------------------------- | ------ | ------------------ |
| Profile           | `lp:profile:{learner_id}`    | 30 min | Any profile update |
| Onboarding status | `lp:onboarding:{learner_id}` | 10 min | Section completion |

### Scale & Performance Targets (50k users, 3 AI consumers)

This service is read-heavy. The hot path is `GET /me` during lesson personalization (3 AI consumers: TutorClaw, Teach Me Mode, Personalized Content Tab).

**Targets (v1):**

- Redis caching enabled by default (30 min TTL) with strict invalidation on any update.
- Avoid redundant fetches: orchestrator fetches once per request and passes the profile to downstream AI consumers.
- Keep DB queries per request ≤1 (cache hit → 0 DB queries).

### GDPR Implementation

| Operation               | Behavior                                                                                                                                                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DELETE /me`            | Soft delete — sets `deleted_at`, profile excluded from queries. Recoverable.                                                                                                                                                            |
| `DELETE /me/gdpr-erase` | **Hard delete** — removes profile row entirely. Audit log retains anonymized record (see Appendix D for full protocol: SHA-256 hash of `learner_id`, `previous_values` cleared, `action` overwritten to `"gdpr_erased"`). Irreversible. |
| Consent tracking        | `consent_given: true` required at profile creation. `consent_date` auto-set.                                                                                                                                                            |
| Data export             | `GET /me` returns complete profile JSON (data portability).                                                                                                                                                                             |

### Cold-Start Behavior

| Profile State              | User Experience                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| No profile                 | Redirect-once → onboarding. Afterwards: source content + global CTA bar ("Set up your Learner Profile")                  |
| Profile exists, incomplete | Redirect-once → onboarding. Afterwards: content with defaults + global CTA bar ("Finish your Learner Profile")           |
| Profile exists, complete   | Full profile served to downstream consumers. Optional in-content card: "Profile X% complete" → "Improve personalization" |

---

## 6. Test Scenarios

For the full “ship to 50k users” verification protocol (frontend + backend + staging + load/observability), see `specs/anchored/learner-profile/release-testing.md`.

### P0 — Must Pass Before Any Deployment

| Test                                              | What It Verifies                                                                                   |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `test_create_profile_with_consent`                | POST / with `consent_given: true` → 201. Without consent → 400.                                    |
| `test_get_own_profile`                            | GET /me returns profile matching JWT sub                                                           |
| `test_patch_profile_updates_only_provided_fields` | PATCH /me with only `goals` → only goals updated                                                   |
| `test_section_update`                             | PATCH /me/sections/expertise → only expertise JSONB updated                                        |
| `test_soft_delete`                                | DELETE /me → `deleted_at` set, GET /me returns 404                                                 |
| `test_gdpr_hard_delete`                           | DELETE /me/gdpr-erase → row deleted, audit log has anonymized entry                                |
| `test_no_token_returns_401`                       | All endpoints without JWT → 401                                                                    |
| `test_user_cannot_access_other_profile`           | GET `/admin/by-learner/{other_id}` → 403 for non-admin. `[P2-R4-3 FIX]`                            |
| `test_profile_defaults_applied`                   | Profile with only consent → all defaults from Appendix B applied correctly                         |
| `test_include_code_samples_conditional_default`   | `programming.level: none` → `include_code_samples` defaults to `false`                             |
| `test_freetext_length_limits`                     | Notes field with 500+ chars → 422 validation error                                                 |
| `test_expertise_enum_validation`                  | `expertise.domain[0].level: "superexpert"` → 422                                                   |
| `test_consent_returns_400_not_422`                | `POST /` with `consent_given: false` → 400 (not 422). `[P1-3]`                                     |
| `test_learner_id_is_jwt_sub`                      | Profile's `learner_id` matches JWT `sub` claim exactly. `[P0-1]`                                   |
| `test_restore_after_soft_delete`                  | `POST /` after soft delete → 200, restores existing row with data + onboarding preserved. `[P0-2]` |

### P1 — Must Pass Before v1 Launch

| Test                                          | What It Verifies                                                                                                                                                                                                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_onboarding_status_initially_incomplete` | New profile → all 5 phases incomplete                                                                                                                                                                                                                                                       |
| `test_completing_all_sections_marks_done`     | After all 5 phases → `onboarding_completed: true`                                                                                                                                                                                                                                           |
| `test_partial_onboarding_saves_progress`      | Complete 2 of 5 phases, abandon → profile has 2 phases filled                                                                                                                                                                                                                               |
| `test_onboarding_progress_vs_completeness`    | `onboarding_progress` counts user actions only; `profile_completeness` weights by provenance. New profile: both `0.0`. After filling expertise: `onboarding_progress = 0.2` (1/5 phases), `profile_completeness > 0.0` (user-sourced expertise + inferred comm/delivery). `[P0-4, P0-R3-2]` |
| `test_completeness_highest_impact`            | Missing expertise → `highest_impact_missing` includes expertise fields                                                                                                                                                                                                                      |
| `test_phm_sync_updates_profile`               | PHM data maps to profile fields per Appendix A                                                                                                                                                                                                                                              |
| `test_phm_respects_provenance`                | PHM sync does not overwrite `user`-sourced fields. `[P0-5]`                                                                                                                                                                                                                                 |
| `test_phm_misconception_transform`            | PHM string misconception → `{topic, misconception}` object with placeholder text. `[P0-3]`                                                                                                                                                                                                  |
| `test_inference_rules_from_expertise`         | `programming: none` → inferred `language_complexity: plain`                                                                                                                                                                                                                                 |
| `test_inference_sets_field_sources`           | After inference, `field_sources` records `inferred` for affected fields. `[P0-5]`                                                                                                                                                                                                           |
| `test_user_override_preserves_source`         | User sets `language_complexity` manually → `field_sources` records `user`, inference doesn't overwrite. `[P0-5]`                                                                                                                                                                            |
| `test_domain_array_with_primary`              | Create profile with 2 domains, exactly one `is_primary: true`                                                                                                                                                                                                                               |
| `test_domain_auto_primary`                    | Create profile with 1 domain, no `is_primary` set → auto-marked `true`. `[P1-2]`                                                                                                                                                                                                            |
| `test_misconceptions_capped_at_5`             | Submitting 6 misconceptions → 422 or truncated                                                                                                                                                                                                                                              |
| `test_accessibility_in_onboarding`            | Accessibility phase tracked in `sections_completed`, fields stored correctly                                                                                                                                                                                                                |
| `test_onboarding_skip_counts_as_complete`     | Skip AI enrichment phase → `sections_completed["ai_enrichment"] = true`, fields remain `default`-sourced in `field_sources`. `[P1-R2-2]`                                                                                                                                                    |
| `test_tools_in_use_item_length`               | `tools_in_use` item with 60 chars → 422. `[P1-5]`                                                                                                                                                                                                                                           |
| `test_secondary_goals_item_length`            | `secondary_goals` item with 250 chars → 422. `[P1-5]`                                                                                                                                                                                                                                       |
| `test_dev_mode_bypasses_auth`                 | `DEV_MODE=true` → requests succeed without token                                                                                                                                                                                                                                            |
| `test_cache_invalidated_on_update`            | PATCH /me → Redis cache key deleted                                                                                                                                                                                                                                                         |

### P2 — Edge Cases

| Test                                                      | What It Verifies                                                                                                                                                                                                                                                           |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test_null_vs_missing_vs_empty`                           | `name: null`, omitting name, `name: ""` → all treated as unknown                                                                                                                                                                                                           |
| `test_duplicate_topics_deduplicated`                      | `topics_already_mastered: ["Python", "python"]` → stored as one entry                                                                                                                                                                                                      |
| `test_unicode_in_all_fields`                              | Arabic name, Urdu notes → stored and returned correctly                                                                                                                                                                                                                    |
| `test_profile_version_set_automatically`                  | Client cannot override `profile_version`                                                                                                                                                                                                                                   |
| `test_restore_preserves_data_and_onboarding`              | `POST /` after soft delete → 200, restores existing row with all data + onboarding state intact. `[D-13 nuance]`                                                                                                                                                           |
| `test_merge_patch_preserves_untouched_fields`             | PATCH with `{expertise: {programming: {level: "advanced"}}}` → `expertise.programming.level = "advanced"` AND `expertise.ai_fluency.level` unchanged (not wiped to default). `field_sources["expertise.programming.level"] = "user"`, other sources unchanged. `[P0-R3-1]` |
| `test_completeness_zero_for_fresh_profile`                | New profile with all defaults → `profile_completeness = 0.0`. `[P0-R2-4]`                                                                                                                                                                                                  |
| `test_audit_log_created_on_update`                        | Every PATCH creates an audit log entry                                                                                                                                                                                                                                     |
| `test_rate_limit_returns_429`                             | Exceed `PATCH /me` rate limit → 429 with `Retry-After` header and `rate_limited` error code. `[P2-1]`                                                                                                                                                                      |
| `test_concurrent_updates_different_fields_do_not_clobber` | Two simultaneous PATCHes to the same section updating different fields → both changes persist (no lost update). Requires row lock / equivalent transactional merge. `[P0-R4-2]`                                                                                            |
| `test_concurrent_updates_same_field_last_write_wins`      | Two simultaneous PATCHes updating the same field → last commit wins deterministically. No crash. `[P2-2 FIX]`                                                                                                                                                              |

---

## 7. What NOT to Build

| #   | Feature                                 | Why Excluded                                          | Reconsider When                      |
| --- | --------------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| 1   | Personalization engine                  | Separate system. This service stores/serves profiles. | Separate build phase                 |
| 2   | Real-time collaborative profile editing | Massive complexity for zero v1 value                  | Multi-instructor scenarios validated |
| 3   | ML-based profile inference              | Progressive profiling is rule-based in v1             | After v1 data proves value           |
| 4   | Custom lesson authoring                 | We personalize existing lessons, not create new ones  | Never in this system                 |
| 5   | Profile sharing/export                  | No user need identified                               | Enterprise features scoped           |
| 6   | A/B testing personalization             | Need baseline first                                   | After v1 quality metrics             |
| 7   | Social/peer comparison                  | Privacy concerns outweigh value                       | Probably never                       |
| 8   | Automated profile decay                 | Profiles don't auto-expire                            | v2 progressive profiling             |
| 9   | Multi-profile per learner               | One profile per `learner_id`                          | Distinct learning contexts validated |
| 10  | Offline profile storage                 | Server-side only                                      | If offline learning required         |
| 11  | Profile-driven assessment               | Profile drives presentation, not evaluation           | Assessment system design             |
| 12  | Cache warming / batch pre-generation    | On-demand is sufficient for v1                        | Latency issues at scale              |

---

## 8. Decision Log

| #    | Decision                  | Resolution                                                        | Rationale                                                                                                                                             |
| ---- | ------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------- |
| D-1  | Onboarding approach       | **Hybrid (Option C)**                                             | Form for structured + AI for enrichment. Demos AI capability.                                                                                         |
| D-2  | Default expertise level   | **`beginner`**                                                    | Under-estimating is less harmful than over-estimating                                                                                                 |
| D-3  | `ai_fluency.level` enum   | **Standardize to `beginner`**                                     | Cross-field consistency. Notes captures nuance.                                                                                                       |
| D-4  | Accessibility section     | **Profile Settings Only**                                         | Removed from onboarding to save time. Available in settings.                                                                                          | **Include in v1**        | Schemas don't change daily. Foundational.                                         |
| D-5  | GDPR compliance           | **Hard delete + consent flag**                                    | Right to erasure. Audit log anonymized.                                                                                                               |
| D-6  | Prompt injection          | **Sandwich + length limits**                                      | Length limits at API. Sandwich at consumer.                                                                                                           |
| D-7  | Personalization engine    | **Out of scope**                                                  | Separate build. Profile system serves data.                                                                                                           |
| D-8  | Progressive profiling     | **Basic triggers in v1**                                          | After-lesson feedback, after-3-lessons prompt, settings page                                                                                          |
| D-9  | Multi-domain              | **Array in v1**                                                   | Target audience is multi-domain experts                                                                                                               |
| D-10 | Onboarding abandonment    | **Save partial + nudge**                                          | Never block content access                                                                                                                            |
| D-11 | Database hosting          | **Neon (serverless PG)**                                          | Zero ops, `pool_pre_ping` for cold starts                                                                                                             |
| D-12 | `learner_id` identity     | **Auth sub string**                                               | JWT `sub` claim, not generated UUID. Internal `id` is UUID PK. `[P0-1]`                                                                               |
| D-13 | Soft-delete lifecycle     | **Restore old row**                                               | `POST /` on soft-deleted profile restores it. GDPR-erase first for true fresh start. `[P0-2]`                                                         |
| D-14 | Completeness metrics      | **Two separate metrics**                                          | `onboarding_progress` (user actions) + `profile_completeness` (personalization readiness). XP potential. `[P0-4]`                                     |
| D-15 | Field provenance          | **`field_sources` map**                                           | `user > phm > inferred > default` priority. Enables PHM respect + future downranking. `[P0-5]`                                                        |
| D-16 | PHM downranking           | **Disabled in v1, config flag for future**                        | `PHM_ALLOW_DOWNRANK=false`. When enabled, PHM can lower `inferred`-sourced values.                                                                    |
| D-17 | Accessibility onboarding  | **Removed from Onboarding**                                       | User decided to keep onboarding lean (90s max). Moved strictly to profile settings.                                                                   | **Include in Phase 3.5** | User confirmed: must collect accessibility needs during first-session experience. |
| D-18 | Consent HTTP status       | **400 via handler, not 422 via Pydantic**                         | `consent_given` defaults to `False` in model so missing field reaches handler, not FastAPI validation. `[P0-R2-1]`                                    |
| D-19 | PATCH provenance tracking | **Use `model_fields_set` for explicit-only marking**              | Prevents Pydantic defaults from being marked `user`-sourced. `[P0-R2-3]`                                                                              |
| D-20 | Completeness scoring      | **Weight by `field_sources` provenance, high-signal fields only** | `user=1.0, phm=0.8, inferred=0.5, default=0.0`. 20 high-signal fields (not 41). Post-onboarding ~50-60%. `[P0-R2-4]`                                  |
| D-21 | Restore preserves state   | **No onboarding reset on restore**                                | Old progress is valid. GDPR-erase + recreate for true fresh start. `[D-13 nuance]`                                                                    |
| D-22 | Onboarding skip semantics | **Skip counts as phase complete**                                 | Distinction tracked via `field_sources` (skipped = `default`). `[P1-R2-2]`                                                                            |
| D-23 | PATCH semantics           | **Merge (not replace)**                                           | Use `model_fields_set` recursively. Only explicitly-sent fields are written; omitted fields preserve existing values. Prevents data loss. `[P0-R3-1]` |
| D-24 | Inference timing          | **Deferred until real data exists**                               | Inference does NOT run at profile creation (all defaults = meaningless). Runs after first user/PHM expertise update. `[P0-R3-2]`                      |
| D-25 | `domain_name` requirement | **Optional at API, prompted in UI**                               | PHM and defaults may create domain entries with null `domain_name`. UI encourages filling it. `[P0-R3-3]`                                             |
| D-26 | Admin route path          | **`/admin/by-learner/{learner_id}`**                              | Avoids JWT sub encoding issues (`auth0\|...`) and route shadowing. `[P1-R3-1]`                                                                        |
| D-27 | Concurrent PATCH behavior | **Row-level lock for merge updates**                              | Prevents lost updates when multiple clients/consumers PATCH different fields concurrently. `[P0-R4-2]`                                                |

---

## Appendix A — PHM Field Mapping

| PHM Field                                               | Profile Field                                          | Transform                                                                                                                                                                                                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `expertise_level.domain_expertise`                      | `expertise.domain[0].level` (primary)                  | Direct enum mapping. `[P1-R2-4 FIX]` If `expertise.domain` is empty, auto-create entry: `{ "level": <PHM value>, "domain_name": null, "is_primary": true }`. If non-empty, update the `is_primary: true` entry's level.                                            |
| `expertise_level.programming_experience`                | `expertise.programming.level`                          | Direct enum mapping                                                                                                                                                                                                                                                |
| `expertise_level.ai_fluency_familiarity`                | `expertise.ai_fluency.level`                           | Direct enum mapping                                                                                                                                                                                                                                                |
| `expertise_level.business_experience`                   | `expertise.business.level`                             | Direct enum mapping                                                                                                                                                                                                                                                |
| `knowledge_map.mastered[].topic`                        | `expertise.subject_specific.topics_already_mastered[]` | Each topic → `{ "topic": "<value>", "treatment": "reference" }`. Default `treatment` is `reference` (brief recap allowed). Deduplicate by case-normalized topic name.                                                                                              |
| `knowledge_map.topics_to_skip[]`                        | `expertise.subject_specific.topics_already_mastered[]` | Each topic → `{ "topic": "<value>", "treatment": "skip" }`. Merged into same array. If topic exists with `reference`, PHM `skip` overrides to `skip`.                                                                                                              |
| `knowledge_map.known_misconceptions[]`                  | `expertise.subject_specific.known_misconceptions[]`    | PHM sends strings (topic names where misconception detected). Transform: each string → `{ "topic": "<value>", "misconception": "Detected via tutoring session — details pending review" }`. If topic already exists in array, skip (don't duplicate). Capped at 5. |
| `professional_context.current_role`                     | `professional_context.current_role`                    | Direct string copy                                                                                                                                                                                                                                                 |
| `professional_context.industry`                         | `professional_context.industry`                        | Direct string copy                                                                                                                                                                                                                                                 |
| `professional_context.real_projects[]`                  | `professional_context.real_projects[]`                 | Direct array copy                                                                                                                                                                                                                                                  |
| `motivation_and_goals.primary_goal`                     | `goals.primary_learning_goal`                          | Direct string copy                                                                                                                                                                                                                                                 |
| `motivation_and_goals.urgency`                          | `goals.urgency`                                        | Direct enum mapping                                                                                                                                                                                                                                                |
| `communication_preferences.language_complexity`         | `communication.language_complexity`                    | Direct enum mapping                                                                                                                                                                                                                                                |
| `communication_preferences.preferred_analogy_domain`    | `communication.analogy_domain`                         | Direct string copy                                                                                                                                                                                                                                                 |
| `communication_preferences.verbosity_preference`        | `communication.verbosity`                              | Direct enum mapping                                                                                                                                                                                                                                                |
| `learning_style_signals.prefers_examples_before_theory` | `communication.preferred_structure`                    | `true` → `examples-first`, `false` → `theory-first`                                                                                                                                                                                                                |

**PHM Sync Conflict Rules (uses `field_sources` provenance):**

- PHM **never overwrites** `user`-sourced values. Check `field_sources` before any update.
- PHM can overwrite `inferred` and `default` sourced values. When it does, set `field_sources[field] = "phm"`.
- `topics_already_mastered`: additive — new topics appended, existing topics can be upgraded from `reference` → `skip` but not downgraded.
- **v1 behavior**: PHM can only raise expertise levels (e.g., `beginner` → `intermediate`), never lower them.
- **Future (when downranking enabled)**: PHM will be allowed to downgrade `inferred`-sourced expertise levels based on assessment evidence. `user`-sourced values still never overwritten. Controlled by config flag `PHM_ALLOW_DOWNRANK=false` (default).

---

## Appendix B — Complete Defaults Table (v1.4) `[Updated v1.4 — added native_language, preferred_code_language]`

Every field has an explicit default. This is the full baseline for a brand-new profile with zero user input.

**Identity & System (set by system, not defaults):**

| Field                           | Initial Value          | Notes                                                                                                                                                                                      |
| ------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                            | Auto-generated UUID v4 | Internal PK                                                                                                                                                                                |
| `learner_id`                    | JWT `sub`              | Set from token                                                                                                                                                                             |
| `name`                          | `null`                 |                                                                                                                                                                                            |
| `created_at` / `updated_at`     | Current UTC timestamp  |                                                                                                                                                                                            |
| `profile_version`               | `"1.1"`                |                                                                                                                                                                                            |
| `consent_given`                 | `true`                 | Required at creation                                                                                                                                                                       |
| `consent_date`                  | Current UTC timestamp  | Auto-set when consent given                                                                                                                                                                |
| `onboarding_completed`          | `false`                |                                                                                                                                                                                            |
| `onboarding_sections_completed` | `{}`                   | All phases uncompleted                                                                                                                                                                     |
| `field_sources`                 | `{}`                   | Sparse map — empty means all fields are `default`-sourced. Only non-default sources are stored (e.g., `{"expertise.programming.level": "user"}`). Missing key = `default`. `[P1-R4-1 FIX]` |
| `deleted_at`                    | `null`                 |                                                                                                                                                                                            |

**Expertise (Section 2):**

| Field                                                | Default            | Condition                               |
| ---------------------------------------------------- | ------------------ | --------------------------------------- |
| `expertise.domain`                                   | `[]` (empty array) | No domain expertise until user provides |
| `expertise.programming.level`                        | `beginner`         |                                         |
| `expertise.programming.languages`                    | `[]`               |                                         |
| `expertise.programming.notes`                        | `null`             |                                         |
| `expertise.ai_fluency.level`                         | `beginner`         |                                         |
| `expertise.ai_fluency.notes`                         | `null`             |                                         |
| `expertise.business.level`                           | `beginner`         |                                         |
| `expertise.business.notes`                           | `null`             |                                         |
| `expertise.subject_specific.topics_already_mastered` | `[]`               |                                         |
| `expertise.subject_specific.topics_partially_known`  | `[]`               |                                         |
| `expertise.subject_specific.known_misconceptions`    | `[]`               |                                         |

**Professional Context (Section 3):**

| Field                                    | Default |
| ---------------------------------------- | ------- |
| `professional_context.current_role`      | `null`  |
| `professional_context.industry`          | `null`  |
| `professional_context.organization_type` | `null`  |
| `professional_context.team_context`      | `null`  |
| `professional_context.real_projects`     | `[]`    |
| `professional_context.tools_in_use`      | `[]`    |
| `professional_context.constraints`       | `null`  |

**Goals (Section 4):**

| Field                         | Default                                                                |
| ----------------------------- | ---------------------------------------------------------------------- |
| `goals.primary_learning_goal` | `null` — transient inference in engine (out of scope for this service) |
| `goals.secondary_goals`       | `[]`                                                                   |
| `goals.urgency`               | `null`                                                                 |
| `goals.urgency_note`          | `null`                                                                 |
| `goals.career_goal`           | `null`                                                                 |
| `goals.immediate_application` | `null`                                                                 |

**Communication (Section 5) — applied as defaults, upgraded to `inferred` when expertise is set:**

| Field                                    | Default                                                                         | Condition                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `communication.language_complexity`      | `professional`                                                                  | Overridden by inference when expertise is `user`/`phm`-sourced |
| `communication.preferred_structure`      | `examples-first`                                                                |                                                                |
| `communication.verbosity`                | `moderate`                                                                      | Overridden by inference                                        |
| `communication.analogy_domain`           | `null` → falls back to `professional_context.industry` or generic at query time | Cascading fallback                                             |
| `communication.tone`                     | `professional`                                                                  | Overridden by inference                                        |
| `communication.wants_summaries`          | `true`                                                                          |                                                                |
| `communication.wants_check_in_questions` | `true`                                                                          |                                                                |
| `communication.format_notes`             | `null`                                                                          |                                                                |

**Delivery (Section 6):**

| Field                                  | Default                   | Condition                                                                                                                                                                                   |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delivery.output_format`               | `structured-with-headers` |                                                                                                                                                                                             |
| `delivery.target_length`               | `match-source`            |                                                                                                                                                                                             |
| `delivery.include_code_samples`        | Conditional               | `false` when `programming.level == none`; `true` when `>= beginner`. Since default programming is `beginner`, default is `true` — but as `default`-sourced, contributes 0.0 to completeness |
| `delivery.code_verbosity`              | Conditional               | `beginner→fully-explained, intermediate→annotated, advanced/expert→minimal`. Ignored when `include_code_samples == false`                                                                   |
| `delivery.include_visual_descriptions` | `false`                   | `true` when `accessibility.screen_reader = true`                                                                                                                                            |
| `delivery.language`                    | `"English"`               |                                                                                                                                                                                             |
| `delivery.language_proficiency`        | `null`                    |                                                                                                                                                                                             |
| `delivery.native_language`             | `null`                    | `[NEW v1.4]` ISO 639-1 code or freetext. No default — explicitly collected in onboarding.                                                                                                   |
| `delivery.preferred_code_language`     | `null`                    | `[NEW v1.4]` No default — explicitly collected in onboarding.                                                                                                                               |

**Accessibility (Section 7):**

| Field                                     | Default      |
| ----------------------------------------- | ------------ |
| `accessibility.screen_reader`             | `false`      |
| `accessibility.cognitive_load_preference` | `"standard"` |
| `accessibility.color_blind_safe`          | `false`      |
| `accessibility.dyslexia_friendly`         | `false`      |
| `accessibility.notes`                     | `null`       |

---

## Appendix C — Environment Variables

| Variable             | Required | Default | Description                                                                                         |
| -------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`       | Yes      | —       | Neon PostgreSQL connection string. Format: `postgresql+asyncpg://user:pass@host/db?sslmode=require` |
| `REDIS_URL`          | Yes      | —       | Redis connection string. Format: `redis://host:6379/0`                                              |
| `JWKS_URL`           | Yes      | —       | SSO JWKS endpoint for JWT validation. Example: `http://sso:3001/.well-known/jwks.json`              |
| `JWT_ISSUER`         | Yes      | —       | Expected JWT issuer claim                                                                           |
| `JWT_AUDIENCE`       | Yes      | —       | Expected JWT audience claim                                                                         |
| `STUDY_MODE_API_URL` | Yes      | —       | Study Mode API base URL for PHM sync. Example: `http://study-mode-api:8000`                         |
| `PORT`               | No       | `8004`  | Service port                                                                                        |
| `DEV_MODE`           | No       | `false` | When `true`, bypasses JWT auth (development only — NEVER in production)                             |
| `LOG_LEVEL`          | No       | `info`  | Logging level: `debug`, `info`, `warning`, `error`                                                  |
| `REDIS_NAMESPACE`    | No       | `lp:`   | Redis key prefix for cache isolation                                                                |
| `DB_POOL_SIZE`       | No       | `5`     | SQLAlchemy async pool size                                                                          |
| `DB_POOL_PRE_PING`   | No       | `true`  | Validate connections before use (required for Neon cold starts)                                     |
| `RATE_LIMIT_ENABLED` | No       | `true`  | Enable/disable rate limiting                                                                        |
| `PHM_ALLOW_DOWNRANK` | No       | `false` | When `true`, PHM sync can lower `inferred`-sourced expertise levels. v1 ships with `false`.         |

**Secret management:** All secrets (`DATABASE_URL`, `REDIS_URL`, JWT config) via environment variables only. Never committed to git. `.env.example` provided with placeholder values.

---

## Appendix D — GDPR Erasure Protocol

### Hard Delete Procedure (`DELETE /me/gdpr-erase`)

1. **Load profile** by JWT `sub` (including soft-deleted records — `deleted_at IS NOT NULL` still eligible)
2. **Delete profile row** from `learner_profiles` table entirely (`DELETE FROM learner_profiles WHERE learner_id = ?`)
3. **Anonymize audit trail** — for all `profile_audit_log` entries for this `learner_id`:
   - Replace `learner_id` with SHA-256 hash: `sha256(learner_id + salt)` where salt = `GDPR_HASH_SALT` env var (or service-level constant)
   - Clear `previous_values` → `{}`
   - Clear `changed_sections` → `[]`
   - Set `action` → `"gdpr_erased"` (overwrite original action)
   - Keep `created_at` (timestamp retained for compliance audit counting)
   - Keep `source` → `"gdpr_erase"`
4. **Invalidate cache** — delete `lp:profile:{learner_id}` and `lp:onboarding:{learner_id}` from Redis
5. **Return 204** — empty response

### What's Retained After Erasure

| Field                        | Retained?   | Value                                    |
| ---------------------------- | ----------- | ---------------------------------------- |
| `audit_log.id`               | Yes         | Original UUID (for counting)             |
| `audit_log.learner_id`       | Anonymized  | SHA-256 hash (irreversible without salt) |
| `audit_log.action`           | Overwritten | `"gdpr_erased"`                          |
| `audit_log.changed_sections` | Cleared     | `[]`                                     |
| `audit_log.previous_values`  | Cleared     | `{}`                                     |
| `audit_log.source`           | Overwritten | `"gdpr_erase"`                           |
| `audit_log.created_at`       | Yes         | Original timestamp                       |
| Profile row                  | Deleted     | Nothing retained                         |

### Additional GDPR Environment Variable

| Variable         | Required | Default | Description                                                                            |
| ---------------- | -------- | ------- | -------------------------------------------------------------------------------------- |
| `GDPR_HASH_SALT` | Yes      | —       | Salt for SHA-256 hashing of learner_id in anonymized audit records. Must be ≥32 chars. |

---

## 9. Implementation Review — Gaps & Improvements (v1.3)

**Date:** 2026-02-27
**Reviewer:** End-to-end audit of implemented code vs spec

This section documents gaps discovered during implementation review: data the schema supports but onboarding never collects, inference that's too coarse, and a study mode integration that discards most of the profile.

---

### 9.1 Onboarding Data Collection Gaps

The onboarding wizard now implements the v1.2 additions (Goals context, programming languages, professional tools/team context, and Quick Preferences). The table below reflects the **current implementation** and what remains deferred to settings/progressive profiling.

| Onboarding Step                     | Fields Collected                                                                                                                                                                                                                                                 | Fields Supported but NOT Asked                                                                                          | Impact                                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Step 0: Goals**                   | `primary_learning_goal`, `urgency`, optional `urgency_note`, optional `immediate_application`, optional `secondary_goals[]`                                                                                                                                      | —                                                                                                                       | Strong first-session personalization anchor with explicit urgency context.                                                  |
| **Step 1: Expertise**               | `programming.level`, `programming.languages[]`, `ai_fluency.level`, `business.level`, `domain[0].level` + optional `domain_name`                                                                                                                                 | per-field `notes`, additional `domain[1-4]`                                                                             | Correct code language + depth; deeper per-field nuance deferred.                                                            |
| **Step 2: Professional**            | `current_role`, `industry`, `organization_type`, `team_context`, `tools_in_use[]`, optional `constraints`                                                                                                                                                        | additional `real_projects[]` (captured in Step 5 for 1 project)                                                         | Stronger real-world examples and fewer “this won’t work in my environment” mismatches.                                      |
| **Step 3: Quick Preferences**       | `communication.preferred_structure`, `communication.verbosity`, `communication.tone`, optional `communication.wants_summaries`, optional `communication.wants_check_in_questions`, `delivery.language` (locale-gated) + optional `delivery.language_proficiency` | `communication.language_complexity`, `communication.analogy_domain`, `communication.format_notes`, most of `delivery.*` | AI “voice” is now user-steered early; fine-grained formatting and delivery remain configurable in settings and/or inferred. |
| **Step 4: AI Enrichment (Project)** | 1 `real_project` (name + desc), `career_goal`, optional `expertise.subject_specific.*` (skip/partial/misconceptions)                                                                                                                                             | Up to 4 more `real_projects`                                                                                            | Captures one real project for grounding + high-signal “skip what I already know” guidance; additional projects deferred.    |

**Summary:** ~29+ fields collected / ~45+ supported = **~64% schema utilization at onboarding.**

---

### 9.2 High-Priority Onboarding Additions (v1.2) — Implemented

These additions have the highest personalization impact per second of user time and are now implemented in the onboarding UI. Remaining gaps are tracked in §9.1 and deferred to Profile Settings / progressive profiling.

#### 9.2.1 Step 1 (Expertise): Programming Languages

**What:** Multi-select or freetext for `expertise.programming.languages[]`
**When:** Show only when `programming.level >= beginner`
**Why:** Code examples in the wrong language are worse than no examples. This is the single highest-signal missing field for a developer education platform.
**Time cost:** ~5 seconds (multi-select chips: Python, TypeScript, JavaScript, Go, Rust, Java, C++, Other)

#### 9.2.2 Step 3.75: Quick Preferences (between Accessibility and AI Enrichment)

**What:** Radio groups + selects collecting core communication/delivery preferences: `[Updated v1.4]`

| Field                               | Options                                                                          | Time  |
| ----------------------------------- | -------------------------------------------------------------------------------- | ----- |
| `communication.preferred_structure` | "Show me examples first" / "Explain the theory first" / "Start with the problem" | 3 sec |
| `communication.verbosity`           | "Keep it brief" / "Balanced" / "Give me all the details"                         | 3 sec |
| `communication.tone`                | "Casual & friendly" / "Professional" / "Peer-to-peer (skip the basics)"          | 3 sec |
| `delivery.native_language`          | Select: 20 ISO 639-1 languages + "Other" (freetext input) `[NEW v1.4]`           | 3 sec |
| `delivery.language`                 | Text input, default "English" — **always visible** (locale gate removed v1.4)    | 3 sec |
| `delivery.language_proficiency`     | Radio: native / fluent / intermediate / basic (shown when language ≠ English)    | 3 sec |
| `delivery.preferred_code_language`  | Select: PROGRAMMING_LANGUAGES options `[NEW v1.4]`                               | 3 sec |

**Why:** These fields control 60%+ of how the AI tutor communicates. The two new fields (native language, preferred code language) were identified as high-signal missing dimensions from user feedback: "Meri mother language Urdu hai" and "Kis programming language mein example dekhna pasand karta hoon."
**Time cost:** ~20 seconds total. One screen, 3 radio groups + 2 selects + 1 text input.
**Inference interaction:** User-set values via this step get `field_sources = "user"` (priority 4). Inference engine never overwrites them.

**Onboarding phase key:** `communication_preferences` (new 6th phase)
**Impact on `onboarding_progress`:** Denominator changes from 5 to 6. Existing profiles with all 5 phases complete remain `overall_completed = true` (backward compatible — new phase is optional).

#### 9.2.3 Step 0 (Goals): Immediate Application

**What:** Optional text field: "What's the first thing you want to build?" → `goals.immediate_application`
**When:** Collected as optional "Add more context" in the Goals phase (after urgency).
**Why:** Gives the tutor a concrete anchor for every lesson. "You're learning FastAPI because you want to build [X]" is 10x better than generic framing.
**Time cost:** ~10 seconds (optional, can skip)

#### 9.2.4 Add to Step 2 (Professional): Tools in Use

**What:** Multi-select chips for `professional_context.tools_in_use[]`
**Options:** VS Code, Cursor, Windsurf, IntelliJ/PyCharm, Vim/Neovim, Terminal, Docker, Git, GitHub, Other
**Why:** Book content references specific IDEs (Chapter 11: AI-Native IDEs). Knowing the learner's tools enables relevant examples.
**Time cost:** ~5 seconds (tap applicable chips)

#### 9.2.5 Add to Step 2 (Professional): Team Context

**What:** Single-select: "How do you work?" → `professional_context.team_context`
**Options:** "Solo / side project" / "Small team (2-5)" / "Larger team (5+)" / "Leading a team"
**Why:** Solo learners need different agent architecture framing than team leads. Changes how we present multi-agent collaboration chapters.
**Time cost:** ~3 seconds

---

### 9.3 Inference Engine Improvements (v1.2)

#### Problem: Too Coarse

The current inference table maps `max(expertise levels)` → communication prefs in 5 rows. This produces incorrect defaults for common personas:

| Persona                              | Expertise                           | Current Inference                                                                              | Correct Preference                                                                                                  |
| ------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| PhD researcher, new to coding        | business: expert, programming: none | `language_complexity: expert, tone: peer-to-peer` (from max) but `include_code_samples: false` | `language_complexity: technical` (not expert — they're not CS experts), `tone: professional`, `verbosity: detailed` |
| Senior dev returning to basics       | programming: expert                 | `verbosity: concise`                                                                           | Wants `verbosity: detailed` — they're learning NEW material                                                         |
| Startup founder, beginner everything | all: beginner                       | `tone: conversational`                                                                         | Wants `tone: professional` — business context                                                                       |
| Student, intermediate coder          | programming: intermediate           | `language_complexity: professional`                                                            | May prefer `plain` — "professional" assumes work context                                                            |

#### Recommendation: Two-Axis Inference

Instead of single `max(expertise)` → everything, split into two axes:

1. **Technical axis** (`programming.level`, `ai_fluency.level`) → drives `code_verbosity`, `include_code_samples`, `language_complexity` (technical dimension)
2. **Professional axis** (`business.level`, `domain.level`) → drives `tone`, `language_complexity` (professional dimension)

**New inference table:**

| Technical Level | Professional Level | `language_complexity` | `tone`           | `verbosity` |
| --------------- | ------------------ | --------------------- | ---------------- | ----------- |
| none/beginner   | none/beginner      | `plain`               | `conversational` | `detailed`  |
| none/beginner   | intermediate+      | `professional`        | `professional`   | `detailed`  |
| intermediate    | any                | `professional`        | `professional`   | `moderate`  |
| advanced+       | none/beginner      | `technical`           | `conversational` | `moderate`  |
| advanced+       | intermediate+      | `technical`           | `peer-to-peer`   | `concise`   |

**`code_verbosity` stays keyed to `programming.level` only** (unchanged — this axis is correct).

**Migration:** Recompute inferred values for all profiles where `field_sources[field] = "inferred"`. User-set and PHM values untouched.

#### Recommendation: Flag Inferred Values in UI

When showing inferred communication/delivery preferences in Profile Settings, display a subtle indicator: "Auto-set based on your expertise — tap to customize." This encourages users to override bad inferences without requiring them to.

---

### 9.4 Study Mode Integration Gap

#### Status: Enriched Summary Implemented (v1.2)

The `LearnerProfileSummary` sent to Study Mode API now includes the high-signal fields needed for strong first-response personalization:

```typescript
interface LearnerProfileSummary {
  // Existing
  expertise_level: string;
  communication_prefs: {
    language_complexity: string | null;
    verbosity: string | null;
    tone: string | null;
    preferred_structure: string | null; // NEW
    analogy_domain: string | null; // NEW
  };
  accessibility: {
    screen_reader: boolean;
    cognitive_load_preference: string;
    dyslexia_friendly: boolean;
  };

  // NEW fields
  goals: {
    primary_learning_goal: string | null;
    immediate_application: string | null;
  };
  expertise: {
    programming_level: string;
    programming_languages: string[];
    ai_fluency_level: string;
    domain_name: string | null;
    domain_level: string | null;
  };
  professional: {
    current_role: string | null;
    tools_in_use: string[];
  };
  delivery: {
    language: string;
    language_proficiency: string | null;
    code_verbosity: string | null;
  };
}
```

**Remaining enrichment opportunities (optional):**

- Add `professional_context.industry`, `organization_type`, `team_context`, `constraints` to improve framing.
- Add `goals.urgency` and `career_goal` to bias “shortcut vs foundations” and long-term narrative.
- Add `professional_context.real_projects[0]` for “project-anchored” tutoring (when present).

---

### 9.5 Decision Log Additions (v1.2)

| #    | Decision                            | Resolution                                                                                   | Rationale                                                                                                                                                                                                                                     |
| ---- | ----------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-28 | Programming languages in onboarding | **Add multi-select to Step 1**                                                               | Highest-signal missing field. Code examples in wrong language = negative personalization.                                                                                                                                                     |
| D-29 | Communication preferences step      | **Add new Step 3.75 with 4 radio groups**                                                    | 12 seconds of user time, 60%+ improvement in first-session communication quality.                                                                                                                                                             |
| D-30 | Inference engine granularity        | **Two-axis (technical + professional) instead of single max**                                | Fixes incorrect defaults for 4 common personas (PhD researcher, returning expert, startup founder, student).                                                                                                                                  |
| D-31 | Study mode summary enrichment       | **Expand from 7 to ~20 fields**                                                              | Current summary discards most profile data. Tutor can't personalize without goals, languages, domain, tools.                                                                                                                                  |
| D-32 | Immediate application in onboarding | **Add optional field to Step 0**                                                             | Concrete anchor for every lesson. "You're building X" framing is 10x better than generic.                                                                                                                                                     |
| D-33 | Tools in use in onboarding          | **Add multi-select chips to Step 2**                                                         | Book content references specific IDEs. 5 seconds of user time.                                                                                                                                                                                |
| D-34 | Team context in onboarding          | **Add single-select to Step 2**                                                              | Solo vs team changes agent architecture framing. 3 seconds.                                                                                                                                                                                   |
| D-35 | Inferred value UI indicator         | **Flag inferred values with "auto-set" badge**                                               | Encourages correction without requiring it. Transparent about what's inferred vs explicit.                                                                                                                                                    |
| D-36 | Field definitions canonical file    | **Single `profile-field-definitions.ts` for all UI options**                                 | Eliminates option drift between onboarding and edit pages. One file = one truth for labels, values, and hints. Backend Python equivalent tracked in GitHub #787.                                                                              |
| D-37 | Enum values vs semantic hints       | **Stored profile contains raw enum values only; hints/labels live in the consumption layer** | `profile-field-definitions.ts` (frontend) and future `field_definitions.py` (backend) own the human-readable labels and onboarding hints. Profile JSON stores only the enum value (e.g., `"examples-first"`, not `"Show me examples first"`). |

---

### 9.6 Updated Onboarding Flow (v1.2)

**Phase 1: Goals (45-70 seconds)** — unchanged + additions

- `goals.primary_learning_goal` — open text
- `goals.urgency` — 3-option select
- Optional: `goals.immediate_application` — "What's the first thing you want to build?" `[NEW v1.2]`
- Optional: `goals.secondary_goals[]` — add up to 5 secondary goals

**Phase 2: Background (30-75 seconds)** — unchanged + 1 addition

- `expertise.programming.level` — 5-option dropdown
- `expertise.programming.languages[]` — multi-select chips (shown when level ≥ beginner) `[NEW v1.2]`
- `expertise.ai_fluency.level` — 5-option dropdown
- `expertise.domain[0].level` + `domain_name` — dropdown + text input
- `expertise.business.level` — 5-option dropdown

**Phase 3: Professional Context (25-55 seconds)** — unchanged + 2 additions

- `professional_context.current_role` — text input
- `professional_context.industry` — text input / dropdown
- `professional_context.organization_type` — dropdown (optional)
- `professional_context.team_context` — single-select `[NEW v1.2]`
- `professional_context.tools_in_use[]` — multi-select chips `[NEW v1.2]`

**Phase 3.5: Quick Preferences (10-20 seconds)** `[NEW v1.2, Updated v1.4]`

- `communication.preferred_structure` — 3-option radio
- `communication.verbosity` — 3-option radio
- `communication.tone` — 3-option radio
- `delivery.native_language` — select (20 ISO 639-1 + "Other" freetext) `[NEW v1.4]`
- `delivery.language` — text input, always visible (locale gate removed v1.4)
- `delivery.language_proficiency` — radio (shown when language ≠ English)
- `delivery.preferred_code_language` — select from PROGRAMMING_LANGUAGES `[NEW v1.4]`

**Phase 4: AI Enrichment (optional, 0-5 minutes)** — unchanged

- Optional: `professional_context.real_projects` (currently 1 project via form)
- Optional: `goals.career_goal`
- Optional: `expertise.subject_specific.*` (topics to reference/skip, partially-known topics, misconceptions)

**Total time increase:** ~30-35 seconds (from ~2.5 min to ~3 min). Collects ~22 fields instead of ~12 (**83% improvement** in schema utilization at onboarding).

**Onboarding phase tracking (v1.2):**

| Phase Key                   | Schema Sections Updated                      |
| --------------------------- | -------------------------------------------- |
| `goals`                     | `goals`                                      |
| `expertise`                 | `expertise`                                  |
| `professional_context`      | `professional_context`                       |
| `communication_preferences` | `communication`, `delivery` `[NEW v1.2]`     |
| `ai_enrichment`             | `goals`, `professional_context`, `expertise` |

**Backward compatibility:** Pre-v1.2 profiles that already completed onboarding may not have `communication_preferences` stored in `sections_completed`. The API backfills `communication_preferences: true` whenever `onboarding_completed = true`, so those learners remain `overall_completed = true` and `onboarding_progress = 1.0` under the 6-phase model.

---

### 9.7 2026 Micro-UX Optimizations (The 90-Second Form)

**Context:** The 6-phase wizard is highly efficient (90–180 seconds to complete). To align with 2026 UX expectations of zero-friction setup, we apply a layer of "Micro-UX Polish" to the existing flow rather than reinventing the wheel.

**Enhancement 1: 1-Click Auto-Advance**

- **Trigger:** Any screen with only a single-select requirement (e.g., Tone, Verbosity, Cognitive Load).
- **UX:** Clicking the radio button/card instantly selects it and auto-advances to the next phase after a 400ms delay. The "Next" button click is eliminated.
- **Impact:** Shaves ~15 seconds off total completion time.

**Enhancement 2: Context Pre-fill (OAuth Sync)**

- **Trigger:** Login via GitHub, LinkedIn, or Enterprise SSO.
- **UX:** The server uses the auth context to pre-fill `professional_context.industry`, `current_role`, and `tools_in_use`. The wizard screens for these fields flash past or are simply presented as "Confirm & Next" with the boxes already checked.

**Enhancement 3: Gamified Progress Indicator**

- **Trigger:** User makes any selection in the wizard.
- **UX:** Replace "Step 1 of 6" with a dynamic `"Context Density: XX%"` bar. As the user clicks, the bar fills up, directly correlating form completion with AI performance.

**Enhancement 4: Frictionless "Skip"**

- **Trigger:** A screen requires a text input (e.g., `primary_learning_goal`).
- **UX:** If the text box is empty, the primary green button reads "Skip for now". If the user types a single character, it morphs into "Next". Eliminates the cognitive block of staring at a blank text field.

---

### 9.8 Implementation Priority

**v1.3 ROI items are implemented.** Next priorities focus on remaining high-signal data gaps and downstream consumption.

| Priority | Change                                                                  | Effort | Impact   | Status                  |
| -------- | ----------------------------------------------------------------------- | ------ | -------- | ----------------------- |
| **P0**   | BaseUrl-safe navigation (avoid hardcoded `"/onboarding"`, `"/profile"`) | Small  | High     | Implemented (learn-app) |
| **P0**   | Onboarding “Exit” confirmation + sticky bottom action bar               | Small  | High     | Implemented (learn-app) |
| **P0**   | Expand Study Mode summary with role/industry/team/org + urgency/career  | Small  | High     | Pending                 |
| **P1**   | Collect `expertise.subject_specific.*` via onboarding add-on or prompts | Medium | Med-High | Implemented (learn-app) |
| **P1**   | Add PHM sync trigger (manual button or scheduled auto-sync)             | Small  | Medium   | Pending                 |
| **P2**   | Allow re-onboarding after profile delete (clear redirect-once key)      | Small  | Medium   | Implemented (learn-app) |
| **P0**   | Canonical field definitions file (eliminate option drift)               | Small  | High     | Implemented (learn-app) |
| **P1**   | Backend `field_definitions.py` with `?enrich=true` endpoint             | Small  | Medium   | Pending (GitHub #787)   |
| **P1**   | CI sync check between TS and Python field definitions                   | Small  | Medium   | Pending (GitHub #788)   |

---

### 9.9 Field Definitions Architecture (v1.3)

**Date:** 2026-02-28
**Status:** Frontend implemented; backend pending (GitHub #787, #788)

#### Problem: Option Drift

Field option arrays (dropdowns, radio groups, chip selects) were duplicated across 9+ frontend components. Each copy could — and did — drift independently:

- `ProfessionalEdit.tsx` had `academic` and `nonprofit` for organization type; `ProfessionalStep.tsx` (onboarding) had `education` and `non_profit` for the same field.
- Onboarding wizard showed 8 org types; edit page showed 7 (missing `small_business`).
- Labels differed between onboarding and edit pages for the same enum value.

#### Solution: Canonical Definitions File

**Frontend:** `apps/learn-app/src/lib/profile-field-definitions.ts`

Single source of truth for all UI field options. Exports typed arrays with `{ value, label, hint }` for every dropdown, radio group, toggle, and chip-select in the learner profile system.

**Key types:**

- `FieldOption<V>` — `{ value: V; label: string; hint: string }` for dropdowns/radios
- `ToggleOption` — `{ key: string; label: string; hint: string }` for accessibility toggles

**Coverage:** All 9 refactored components import from this single file:

- Onboarding: `ExpertiseLevelSelect`, `UrgencyRadio`, `QuickPreferencesStep`, `AccessibilityStep`, `ProfessionalStep`
- Edit pages: `CommunicationEdit`, `DeliveryEdit`, `ProfessionalEdit`, `AccessibilityToggles`

**Onboarding subset pattern:** Onboarding shows fewer options than the full set (e.g., 3 of 5 structures, 3 of 4 tones). Implemented via `Set.filter()` on canonical arrays, not separate constant definitions.

#### Backend Sync (Pending)

**GitHub #787:** Create `field_definitions.py` in `learner-profile-api` with Python equivalents. Expose via `GET /api/v1/field-definitions?enrich=true` for dynamic frontend hydration (future).

**GitHub #788:** CI sync check between TypeScript and Python definitions. Ensures enum values never drift between frontend and backend. Depends on #787.

#### Standardizations Applied (v1.3)

| Field               | Old Values (pre-fix)                      | New Values (canonical)                                    |
| ------------------- | ----------------------------------------- | --------------------------------------------------------- |
| `organization_type` | `academic`, `nonprofit`                   | `education`, `non_profit`                                 |
| `organization_type` | (missing)                                 | `small_business` added                                    |
| Tool options        | 12 items (inconsistent across components) | 14 items (unified, includes GitHub Copilot + Claude Code) |

#### Architectural Decision: Enum Values vs Semantic Hints

Stored profile JSON contains only raw enum values (e.g., `"examples-first"`, `"non_profit"`). Human-readable labels and onboarding hints live exclusively in the consumption layer:

- **Frontend:** `profile-field-definitions.ts` maps enum → `{ label, hint }`
- **Backend (future):** `field_definitions.py` provides the same mapping for server-side rendering or API enrichment
- **Rationale:** Decouples display concerns from stored data. Changing a label (e.g., "Casual & friendly" → "Relaxed") requires zero data migration.

---

## References

- Schema Audit: `research/schema-audit.md`
- Engine Spec: `research/engine-spec.md`
- Onboarding UX: `research/onboarding-ux.md`
- Technical Architecture: `research/technical-architecture.md`
- QA Review: `research/qa-review.md`
- Original Schema Research (LEGACY — v1.0, superseded by this spec): `learner_profile_schema.md` — contains Fatima/Raj/Marcus worked examples in v1.0 format
