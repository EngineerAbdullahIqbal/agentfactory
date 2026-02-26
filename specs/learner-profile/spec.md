# Learner Profile System — Specification v1.0

**Status:** Phase 3 — Refinement Complete (all QA blockers resolved)
**Date:** 2026-02-26
**Scope:** Profile CRUD, onboarding, storage, PHM sync, progressive profiling
**Out of Scope:** Personalization engine (LLM calls, content transformation) — separate build

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

| Field | Status | Notes |
|---|---|---|
| `id` | `[NEW]` | Internal UUID v4 primary key. Never exposed in API responses. |
| `learner_id` | `[CLARIFIED]` | Auth subject string from JWT `sub`. NOT auto-generated, NOT UUID v4. This is the stable identity from SSO. |
| `created_at` / `updated_at` | `[RENAMED]` | Was `profile_created` / `last_updated`. Aligned with DB column names. `[P0-R2-5 FIX]` |
| `consent_given` | `[NEW]` | GDPR requirement. Must be `true` for profile to be stored |
| `consent_date` | `[NEW]` | When consent was granted |

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
    "ai_ml": {
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

| Field | Status | Notes |
|---|---|---|
| `domain` | MODIFIED | Now an **array** with `is_primary` flag (was single object) |
| `domain.domain_name` | MODIFIED | Always nullable at API level. UI prompts when `level >= beginner`. `[P0-R3-3]` |
| `ai_ml.level` | MODIFIED | Enum standardized to `none\|beginner\|intermediate\|advanced\|expert` (was `conceptual`) |
| `topics_to_skip` | `[REMOVED]` | Merged into `topics_already_mastered` with `treatment: reference\|skip` |
| All `notes` fields | MODIFIED | Max 300 chars enforced |
| `known_misconceptions` | MODIFIED | Capped at 5 entries max |
| All expertise `level` defaults | MODIFIED | Default is `beginner` (was `intermediate`) |

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

| Field | Status | Notes |
|---|---|---|
| `real_projects[].relevance` | `[REMOVED]` | Engine infers relevance from description + lesson topic |
| `real_projects` | MODIFIED | Capped at 5 entries max |
| `tools_in_use` | MODIFIED | Max 20 items, each max 50 chars |
| All freetext fields | MODIFIED | Character limits enforced |

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

| Field | Status | Notes |
|---|---|---|
| `urgency_context` | MODIFIED | Renamed to `urgency_note` to signal it's supplementary |
| All freetext fields | MODIFIED | Character limits enforced |

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

| Field | Status | Notes |
|---|---|---|
| No structural changes | — | Strongest section per Schema Analyst audit. Defaults added to Appendix B |

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
    "language_proficiency": "native | fluent | intermediate | basic"
  }
}
```

| Field | Status | Notes |
|---|---|---|
| `target_length` | MODIFIED | Clean enum values (word count ranges moved to documentation, not stored) |
| `visual_description_notes` | `[REMOVED]` | Absorbed into accessibility section |
| `language_proficiency` | `[NEW]` | Separates "what language" from "how well they know it" |
| `include_code_samples` default | MODIFIED | Conditional: `false` when `programming.level == none`, `true` otherwise |
| `code_verbosity` | MODIFIED | Only relevant when `include_code_samples == true` (documented dependency) |

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

| Rule | Condition | Behavior |
|---|---|---|
| `analogy_domain` fallback | Field is null | Use `professional_context.industry`. If also null, use generic everyday analogies |
| `include_code_samples` deterministic chain | Evaluation order: (1) If user explicitly set → use user value. (2) If `programming.level == none` → `false`. (3) If `programming.level >= beginner` → `true`. On a fresh profile, `programming.level` is `default`-sourced (`beginner`) → `include_code_samples = true` but also `default`-sourced (not `inferred`). Only becomes `inferred` when `programming.level` has a `user` or `phm` source. `[P1-1 FIX, P2-R4-1 FIX]` |
| `code_verbosity` dependency | `include_code_samples` is `false` | `code_verbosity` is ignored |
| `domain_name` guidance | `domain.level` is `none` | `domain_name` should be null. When `level >= beginner`, UI prompts for `domain_name` but API accepts null (PHM/defaults may not have it). `[P0-R3-3 FIX]` |
| `include_visual_descriptions` conditional | `accessibility.screen_reader` is `true` | Default to `true` (provide alt-text descriptions). Otherwise `false`. `[P1-R2-3 FIX]` |
| Inferred `language_complexity` | Not set by learner | Derive from expertise levels (see Onboarding Inference Rules) |
| Inferred `tone` | Not set by learner | Derive from `language_complexity` |
| Inferred `code_verbosity` | Not set by learner | `programming.level: none→N/A, beginner→fully-explained, intermediate→annotated, advanced/expert→minimal` |

### Validation Rules

| Rule | Enforcement |
|---|---|
| All freetext fields | Max character limits as documented per field |
| All arrays | Max item limits as documented per field |
| `learner_id` | Auth subject string from JWT `sub`. Max 255 chars. Set by system from token, not user-provided. `[P0-1 FIX]` |
| `profile_version` | Semver string, set by system (not user) |
| Expertise level enums | Must be one of: `none\|beginner\|intermediate\|advanced\|expert` |
| `consent_given` | Must be `true` for profile creation |
| `known_misconceptions` | Max 5 entries |
| `real_projects` | Max 5 entries |
| `domain` array | Max 5 entries. Exactly one `is_primary: true` when list is non-empty. **Auto-primary rule `[P1-2 FIX]`:** If no entry has `is_primary: true`, the first entry is auto-marked primary. If multiple entries have `is_primary: true`, only the first is kept as primary, rest set to `false`. Empty array is valid (no domain expertise yet). |
| Duplicate detection | `topics_already_mastered[].topic` — deduplicated, case-normalized |

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

### Five Personalization Dimensions

| Dimension | What Changes | Primary Schema Fields |
|---|---|---|
| **Vocabulary** | Word choice, jargon level, term definitions | `communication.language_complexity`, `expertise.*` |
| **Examples** | Analogies, case studies, illustration domain | `professional_context.*`, `communication.analogy_domain`, `expertise.domain` |
| **Depth** | Expansion vs compression of sections | `expertise.subject_specific.*`, `goals.*`, `communication.verbosity` |
| **Structure** | Organization, flow, formatting | `communication.preferred_structure`, `delivery.output_format`, `delivery.target_length` |
| **Tone** | Voice, register, interpersonal style | `communication.tone`, `communication.language_complexity` |

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

Full transformation rules, conflict resolution matrix, quality gates, and worked examples are documented in `specs/learner-profile/research/engine-spec.md` (656 lines).

---

## 4. Onboarding Specification

### Approach: Hybrid (Option C)

Structured form for fields with clear answer spaces (dropdowns, selects) + optional AI conversation for open-ended enrichment.

### Onboarding Flow

**Phase 1: Goals (45-60 seconds)**
1. `goals.primary_learning_goal` — open text: "What do you want to achieve with Agent Factory?"
2. `goals.urgency` — 3-option select: Low / Medium / High

**Phase 2: Background (30-60 seconds)**
3. `expertise.programming.level` — 5-option dropdown
4. `expertise.ai_ml.level` — 5-option dropdown
5. `expertise.domain[0].level` + `domain_name` — dropdown + text input
6. `expertise.business.level` — 5-option dropdown

**Phase 3: Professional Context (20-45 seconds)**
7. `professional_context.current_role` — text input
8. `professional_context.industry` — text input / dropdown
9. `professional_context.organization_type` — dropdown (optional)

**Phase 3.5: Accessibility (10-20 seconds) `[ACCESSIBILITY FIX]`**
10. `accessibility.screen_reader` — toggle (default off)
11. `accessibility.cognitive_load_preference` — 2-option: Standard / Reduced
12. `accessibility.dyslexia_friendly` — toggle (default off)
13. "Any other accessibility needs?" → `accessibility.notes` (optional text, max 300 chars)

Note: `color_blind_safe` is not asked directly — it's handled by the frontend theme, not content personalization. Kept in schema for future use.

**Phase 4: AI Enrichment (optional, 0-5 minutes)**
After the form, an optional AI conversation enriches open-ended fields:
- "Tell me about a project you'd like to apply this to" → `real_projects`
- "Any specific career goals?" → `career_goal`
- "Anything you've already learned about AI?" → `subject_specific` fields

### Fields NEVER Asked in Onboarding (Inferred or Deferred)

| Field | Handling |
|---|---|
| `communication.language_complexity` | Inferred from expertise levels |
| `communication.preferred_structure` | Default `examples-first`, adjusted from engagement data |
| `communication.verbosity` | Inferred from expertise levels |
| `communication.tone` | Inferred from `language_complexity` |
| `communication.analogy_domain` | Inferred from `industry` |
| `delivery.*` | All defaults or inferred |
| `accessibility.color_blind_safe` | Frontend theme concern, not content personalization — settings page only |
| `expertise.subject_specific.*` | Inferred from quiz performance and engagement |
| `known_misconceptions` | Detected through assessment, never asked |

### Inference Rules (Communication/Delivery from Expertise) — `[B-7 FIX]`

**Algorithm:** Take the **maximum** expertise level across `programming`, `ai_ml`, `domain[primary]`, and `business`. When `expertise.domain` is empty (no entries), treat `domain[primary]` as `none` for max calculation `[P1-R4-2 FIX]`. Map to communication/delivery fields using the table below. User-set values ALWAYS override inferences. Inferred values are stored in the DB when inference runs (not computed on-the-fly).

**When inference runs `[P0-R3-2 FIX]`:** On section update (`PATCH /me/sections/expertise`), on PHM sync, and on onboarding phase completion — but **NOT on initial profile creation** (`POST /`). Rationale: at creation, all expertise fields are `default`-sourced (`beginner`). Inferring communication preferences from default expertise is meaningless — it would produce inferred values that aren't based on real learner data. Inference activates only when at least one expertise field has a `user` or `phm` source. This means a fresh profile has `profile_completeness = 0.0` (all defaults, no inferences). After the user completes onboarding Phase 2 (expertise), inference runs and populates communication/delivery fields.

**Override rule:** If a user manually sets `language_complexity = expert` but their expertise says `beginner`, the manual value sticks. Inferred values have a lower priority than explicit values.

**Field provenance tracking (`field_sources`)** — `[P0-5 FIX]`:

Every non-identity field has a source tracked in `field_sources: dict[str, str]` stored as JSONB metadata (not exposed in API responses). Sparse map: missing key = `default`-sourced `[P1-R4-1 FIX]`. Sources:

| Source | Meaning | Override Priority (highest wins) |
|---|---|---|
| `user` | Explicitly set by user via API, onboarding, or settings | 4 (highest) |
| `phm` | Set by PHM sync from tutoring session data | 3 |
| `inferred` | Derived by inference rules from expertise levels | 2 |
| `default` | System default from Appendix B | 1 (lowest) |

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
    "expertise.ai_ml.level": "phm",
    "goals.primary_learning_goal": "user"
  }
}
```

| Max Expertise Level | Inferred `language_complexity` | Inferred `tone` | Inferred `verbosity` | Inferred `code_verbosity` | Inferred `include_code_samples` |
|---|---|---|---|---|---|
| `none` | `plain` | `conversational` | `detailed` | `fully-explained` | `false` |
| `beginner` | `plain` | `conversational` | `detailed` | `fully-explained` | `true` |
| `intermediate` | `professional` | `professional` | `moderate` | `annotated` | `true` |
| `advanced` | `technical` | `peer-to-peer` | `concise` | `minimal` | `true` |
| `expert` | `expert` | `peer-to-peer` | `concise` | `minimal` | `true` |

**Special cases:**
- If `programming.level = none` regardless of other expertise: `include_code_samples = false`, `code_verbosity = N/A`
- If `programming.level = beginner` but max expertise is `advanced` (e.g., domain expert learning to code): `language_complexity = professional` (not `technical`), but `code_verbosity = fully-explained`
- If `business.level = advanced` but `programming.level = none`: `language_complexity = professional` (business vocabulary, not technical)

### Skip Behavior

- Every phase is skippable. "Skip for now" (de-emphasized text link, not button)
- Skipping applies defaults for that section (Appendix B)
- **Skipping counts as completion for `onboarding_progress`** `[P1-R2-2 FIX]` — the user made a deliberate choice. `sections_completed[phase] = true` regardless of skip. The distinction between "skipped" and "filled" is tracked via `field_sources` (skipped fields remain `default`-sourced).
- AI enrichment (Phase 4) skip: counts as completed. `ai_enrichment: true` in `sections_completed`. The phase is explicitly optional — skipping is the expected path for most users.
- `consent_given` is the ONLY required field (GDPR)

### Onboarding Abandonment

- Save whatever was completed. Profile is valid even with 1 section
- Content served with defaults for missing sections
- Banner: "Profile X% complete — finish for better personalization"
- Profile settings page always accessible from user menu

### Progressive Profiling Triggers (v1)

| Trigger | What Gets Resurfaced | UX |
|---|---|---|
| After first lesson | "Was this the right level?" | In-lesson feedback widget (too easy / just right / too hard) |
| After 3 lessons | Communication preferences | Quick 2-option prompt ("More examples or more theory?") |
| When learner starts a project | Professional context | Project creation form collects `real_projects` |
| After quiz/assessment | `topics_already_mastered` | Auto-populated when assessment data available (no assessment system in this build — trigger activates when external assessment data is provided via API) |
| Manually anytime | All fields | "Edit profile" in settings |

### Onboarding State Tracking — `[B-4 FIX]`

**Onboarding phases map to schema sections as follows:**

| Onboarding Phase | Schema Section(s) Updated | Tracking Key |
|---|---|---|
| Phase 1: Goals | `goals` | `goals` |
| Phase 2: Background | `expertise` | `expertise` |
| Phase 3: Professional Context | `professional_context` | `professional_context` |
| Phase 3.5: Accessibility | `accessibility` | `accessibility` |
| Phase 4: AI Enrichment | `goals` (career_goal, immediate_application), `professional_context` (real_projects), `expertise` (subject_specific) | `ai_enrichment` |

**Sections NOT tracked in onboarding** (inferred or deferred): `communication`, `delivery`. These are populated by inference rules or via the settings page.

The onboarding phase keys are the 5 **onboarding phases**, not the 7 schema sections. DB column `onboarding_sections_completed` maps to API response field `sections_completed` `[P1-4 FIX]`:
```json
{
  "sections_completed": {
    "goals": true,
    "expertise": true,
    "professional_context": false,
    "accessibility": false,
    "ai_enrichment": false
  },
  "overall_completed": false,
  "onboarding_progress": 0.40,
  "profile_completeness": 0.65
}
```

`next_section` in `OnboardingStatus` returns one of: `"goals"`, `"expertise"`, `"professional_context"`, `"accessibility"`, `"ai_enrichment"`, or `null` (all complete).

---

## 5. Technical Specification

### Stack

| Component | Technology | Rationale |
|---|---|---|
| Framework | FastAPI 0.115+ | Matches content-api; async-native |
| ORM | SQLModel 0.0.22+ + SQLAlchemy 2.0 async | Type-safe, Pydantic integration |
| Database | PostgreSQL 16+ (Neon serverless) | JSONB support, zero ops |
| Async Driver | asyncpg | Fastest Python PG async driver |
| Migrations | Alembic 1.14+ | Standard, async support |
| Cache | Redis (shared instance) | Already deployed, `lp:` prefix |
| HTTP Client | httpx (async) | PHM sync client |
| Auth | api_infra/auth.py (shared) | JWT/JWKS, dev_mode bypass |
| Testing | pytest + pytest-asyncio + fakeredis + respx | Matches content-api |
| Port | 8004 | Next available |

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

| Method | Path | Purpose | Auth | Success | Error |
|---|---|---|---|---|---|
| `GET` | `/health` | Health check (Redis + DB ping) | None | 200 | 503 |
| `POST` | `/` | Create profile (requires `consent_given: true`). If soft-deleted profile exists, **restores** it (clears `deleted_at`, preserves data + onboarding). Returns 200 for restore, 201 for new. | Required | 201/200 | 400 (no consent), 409 (active profile exists) |
| `GET` | `/me` | Get current user's profile | Required | 200 | 404 (no profile) |
| `GET` | `/admin/by-learner/{learner_id}` | Get profile by learner ID (admin/service only). `learner_id` must be URL-encoded (e.g., `auth0%7Cabc123`). Returns active profiles only; soft-deleted profiles return 404 (use DB query for audit). `[P1-R3-1 FIX]` | Required (admin) | 200 | 403, 404 |
| `PATCH` | `/me` | Update profile (merge semantics — only explicitly-sent fields updated, see P0-R3-1) | Required | 200 | 404, 422 |
| `PATCH` | `/me/sections/{section}` | Update single JSONB section | Required | 200 | 404 (section or profile) |
| `DELETE` | `/me` | Soft-delete profile | Required | 204 | 404 |
| `DELETE` | `/me/gdpr-erase` | Hard delete — true erasure (GDPR) | Required | 204 | 404 |
| `GET` | `/me/onboarding-status` | Onboarding completion state | Required | 200 | 404 |
| `PATCH` | `/me/onboarding/{section}` | Mark onboarding phase complete + store data. Valid `{section}` values: `goals`, `expertise`, `professional_context`, `accessibility`, `ai_enrichment`. Returns 404 for unknown phase names. `[P1-R2-1 FIX]` | Required | 200 | 404, 422 |
| `POST` | `/me/sync-from-phm` | Pull PHM data into profile | Required | 200 | 404, 502 (PHM unavailable) |
| `GET` | `/me/completeness` | Profile completeness score + next recommended field | Required | 200 | 404 |

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
- `expertise.ai_ml.level` → **unchanged** (keeps existing value AND existing `field_sources`)
- `expertise.domain` → **unchanged** (not in `model_fields_set`)
- Concurrent updates to different fields within the same section: safe **when serialized by row lock** (merge preserves untouched fields). Same field: last commit wins.

**Delete lifecycle (I-4, P0-2 FIX):**
- Soft delete (`DELETE /me`): sets `deleted_at`, profile hidden from `GET /me`. Recoverable.
- Restore after soft delete: `POST /` on a soft-deleted profile **restores** the existing row (clears `deleted_at`, preserves all data and onboarding state). Does NOT create a new row. Learner gets their profile back exactly as it was. `[D-13 nuance FIX]` — no onboarding reset on restore; old progress is valid.
- Fresh start: To truly start over, GDPR-erase first (`DELETE /me/gdpr-erase`), then `POST /` creates a new row.
- GDPR erase (`DELETE /me/gdpr-erase`): works on both active AND soft-deleted profiles. Irreversible. After erase, `POST /` creates a genuinely new profile.

### Rate Limits — `[B-6 FIX]`

| Endpoint | Rate Limit | Window |
|---|---|---|
| `GET /me` | 120 requests | 1 minute |
| `PATCH /me` | 30 requests | 1 hour |
| `PATCH /me/sections/*` | 60 requests | 1 hour |
| `PATCH /me/onboarding/*` | 60 requests | 1 hour |
| `POST /me/sync-from-phm` | 5 requests | 1 hour |
| `GET /me/completeness` | 60 requests | 1 minute |
| `POST /` | 5 requests | 1 hour | `[P0-R2-2 FIX]` Unique constraint handles dedup (409). Rate limit prevents abuse, but allows restore-after-soft-delete. |

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

class AiMlExpertise(BaseModel):
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
    ai_ml: AiMlExpertise = Field(default_factory=AiMlExpertise)
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
    sections_completed: dict[str, bool]  # keys: goals, expertise, professional_context, accessibility, ai_enrichment
    overall_completed: bool
    next_section: str | None  # one of: goals, expertise, professional_context, accessibility, ai_enrichment, or null
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
    # Priority order: goals.primary_learning_goal > expertise.programming.level > expertise.ai_ml.level > expertise.domain > professional_context.current_role > professional_context.industry > remaining by section weight.

class ErrorResponse(BaseModel):
    """Standard error response for all non-2xx responses."""
    error: str           # Machine-readable code: "consent_required", "profile_exists", "not_found", "validation_error", "forbidden"
    message: str         # Human-readable explanation
    details: dict[str, Any] | None = None  # Field-level errors for 422
```

**Error codes by status — `[B-2 FIX]`:**

| HTTP Status | `error` code | When |
|---|---|---|
| 400 | `consent_required` | `POST /` with `consent_given: false`. Checked in route handler after Pydantic parses the body. `[P2-R4-4 FIX]` Note: if the request body is malformed JSON or has invalid field types, FastAPI returns 422 before the handler runs — this is expected and correct. The 400 only applies to structurally valid requests where `consent_given` is explicitly `false` or omitted (defaults to `false`). |
| 403 | `forbidden` | Accessing another user's profile without admin role |
| 404 | `not_found` | Profile doesn't exist, or unknown section name |
| 409 | `profile_exists` | `POST /` for a user that already has a profile |
| 422 | `validation_error` | Invalid enum value, exceeds max length, array too large. `details` contains per-field errors |
| 429 | `rate_limited` | Request exceeds rate limit. Response includes `Retry-After` header (seconds). `details: { "limit": 30, "window": "1h", "retry_after": 1742 }` `[P2-1 FIX]` |
| 502 | `upstream_unavailable` | PHM sync failed due to Study Mode API being down |

### Two Separate Metrics — `[P0-4 FIX]`

The system tracks **two distinct metrics** to avoid conflating user actions with system readiness:

#### 1. `onboarding_progress` (User Actions Only)

Tracks what the learner has **explicitly done**. Used for UX (progress bar, XP, nudges).

- Denominator: 5 onboarding phases (goals, expertise, professional_context, accessibility, ai_enrichment)
- Numerator: phases the user has completed (stored in `onboarding_sections_completed`)
- Formula: `completed_phases / total_phases` → 0.0 to 1.0
- Inferred/default values do NOT count
- This drives: progress bar, "Profile X% complete" banner, XP rewards

#### 2. `profile_completeness` (Personalization Readiness)

Tracks how ready the profile is for downstream personalization. Includes inferred and default values.

**Section weights** (sum = 1.0):

| Section | Weight | Rationale |
|---|---|---|
| `expertise` | 0.25 | Drives vocabulary, depth, code inclusion — highest personalization impact |
| `goals` | 0.20 | Drives lesson framing and emphasis allocation |
| `professional_context` | 0.20 | Drives example selection and grounding |
| `communication` | 0.15 | Drives tone and structure (often inferred) |
| `delivery` | 0.10 | Drives format (often inferred or defaulted) |
| `accessibility` | 0.10 | Drives accessibility adaptations |

**Section "filled" scoring — weighted by provenance `[P0-R2-4 FIX]`:**

Each field within a section contributes to completeness based on its `field_sources` entry:

| Source | Contribution Weight | Rationale |
|---|---|---|
| `user` | 1.0 | Explicitly provided — highest signal |
| `phm` | 0.8 | Evidence-based from tutoring — strong signal |
| `inferred` | 0.4 | Derived from other fields — moderate signal |
| `default` | 0.0 | System default — no signal, no contribution |

**Section completeness** = (sum of field contribution weights in section) / (count of fields in section). Then weighted by section weight from table above.

**Result:** A brand new profile with all defaults has `profile_completeness = 0.0`. As the user fills in fields or PHM updates fire, completeness rises meaningfully. A profile where half the fields are inferred from expertise maxes out around ~0.45, not 1.0.

**`highest_impact_missing`:** Returns up to 5 dotted field paths that are still `default`-sourced (i.e., missing from `field_sources`), ordered by impact. Priority order: `goals.primary_learning_goal` > `expertise.programming.level` > `expertise.ai_ml.level` > `expertise.domain` > `professional_context.current_role` > `professional_context.industry` > remaining by section weight.

### Cache Strategy

| Data | Cache Key | TTL | Invalidation |
|---|---|---|---|
| Profile | `lp:profile:{learner_id}` | 30 min | Any profile update |
| Onboarding status | `lp:onboarding:{learner_id}` | 10 min | Section completion |

### Scale & Performance Targets (50k users, 3 AI consumers)

This service is read-heavy. The hot path is `GET /me` during lesson personalization (3 AI consumers: TutorClaw, Teach Me Mode, Personalized Content Tab).

**Targets (v1):**
- Redis caching enabled by default (30 min TTL) with strict invalidation on any update.
- Avoid redundant fetches: orchestrator fetches once per request and passes the profile to downstream AI consumers.
- Keep DB queries per request ≤1 (cache hit → 0 DB queries).

### GDPR Implementation

| Operation | Behavior |
|---|---|
| `DELETE /me` | Soft delete — sets `deleted_at`, profile excluded from queries. Recoverable. |
| `DELETE /me/gdpr-erase` | **Hard delete** — removes profile row entirely. Audit log retains anonymized record (see Appendix D for full protocol: SHA-256 hash of `learner_id`, `previous_values` cleared, `action` overwritten to `"gdpr_erased"`). Irreversible. |
| Consent tracking | `consent_given: true` required at profile creation. `consent_date` auto-set. |
| Data export | `GET /me` returns complete profile JSON (data portability). |

### Cold-Start Behavior

| Profile State | User Experience |
|---|---|
| No profile | Unpersonalized source content + banner: "Create your learner profile for personalized content" |
| Profile exists, incomplete | Content with defaults for missing sections + banner: "Profile X% complete" |
| Profile exists, complete | Full profile served to downstream consumers |

---

## 6. Test Scenarios

### P0 — Must Pass Before Any Deployment

| Test | What It Verifies |
|---|---|
| `test_create_profile_with_consent` | POST / with `consent_given: true` → 201. Without consent → 400. |
| `test_get_own_profile` | GET /me returns profile matching JWT sub |
| `test_patch_profile_updates_only_provided_fields` | PATCH /me with only `goals` → only goals updated |
| `test_section_update` | PATCH /me/sections/expertise → only expertise JSONB updated |
| `test_soft_delete` | DELETE /me → `deleted_at` set, GET /me returns 404 |
| `test_gdpr_hard_delete` | DELETE /me/gdpr-erase → row deleted, audit log has anonymized entry |
| `test_no_token_returns_401` | All endpoints without JWT → 401 |
| `test_user_cannot_access_other_profile` | GET `/admin/by-learner/{other_id}` → 403 for non-admin. `[P2-R4-3 FIX]` |
| `test_profile_defaults_applied` | Profile with only consent → all defaults from Appendix B applied correctly |
| `test_include_code_samples_conditional_default` | `programming.level: none` → `include_code_samples` defaults to `false` |
| `test_freetext_length_limits` | Notes field with 500+ chars → 422 validation error |
| `test_expertise_enum_validation` | `expertise.domain[0].level: "superexpert"` → 422 |
| `test_consent_returns_400_not_422` | `POST /` with `consent_given: false` → 400 (not 422). `[P1-3]` |
| `test_learner_id_is_jwt_sub` | Profile's `learner_id` matches JWT `sub` claim exactly. `[P0-1]` |
| `test_restore_after_soft_delete` | `POST /` after soft delete → 200, restores existing row with data + onboarding preserved. `[P0-2]` |

### P1 — Must Pass Before v1 Launch

| Test | What It Verifies |
|---|---|
| `test_onboarding_status_initially_incomplete` | New profile → all 5 phases incomplete |
| `test_completing_all_sections_marks_done` | After all 5 phases → `onboarding_completed: true` |
| `test_partial_onboarding_saves_progress` | Complete 2 of 5 phases, abandon → profile has 2 phases filled |
| `test_onboarding_progress_vs_completeness` | `onboarding_progress` counts user actions only; `profile_completeness` weights by provenance. New profile: both `0.0`. After filling expertise: `onboarding_progress = 0.2` (1/5 phases), `profile_completeness > 0.0` (user-sourced expertise + inferred comm/delivery). `[P0-4, P0-R3-2]` |
| `test_completeness_highest_impact` | Missing expertise → `highest_impact_missing` includes expertise fields |
| `test_phm_sync_updates_profile` | PHM data maps to profile fields per Appendix A |
| `test_phm_respects_provenance` | PHM sync does not overwrite `user`-sourced fields. `[P0-5]` |
| `test_phm_misconception_transform` | PHM string misconception → `{topic, misconception}` object with placeholder text. `[P0-3]` |
| `test_inference_rules_from_expertise` | `programming: none` → inferred `language_complexity: plain` |
| `test_inference_sets_field_sources` | After inference, `field_sources` records `inferred` for affected fields. `[P0-5]` |
| `test_user_override_preserves_source` | User sets `language_complexity` manually → `field_sources` records `user`, inference doesn't overwrite. `[P0-5]` |
| `test_domain_array_with_primary` | Create profile with 2 domains, exactly one `is_primary: true` |
| `test_domain_auto_primary` | Create profile with 1 domain, no `is_primary` set → auto-marked `true`. `[P1-2]` |
| `test_misconceptions_capped_at_5` | Submitting 6 misconceptions → 422 or truncated |
| `test_accessibility_in_onboarding` | Accessibility phase tracked in `sections_completed`, fields stored correctly |
| `test_onboarding_skip_counts_as_complete` | Skip AI enrichment phase → `sections_completed["ai_enrichment"] = true`, fields remain `default`-sourced in `field_sources`. `[P1-R2-2]` |
| `test_tools_in_use_item_length` | `tools_in_use` item with 60 chars → 422. `[P1-5]` |
| `test_secondary_goals_item_length` | `secondary_goals` item with 250 chars → 422. `[P1-5]` |
| `test_dev_mode_bypasses_auth` | `DEV_MODE=true` → requests succeed without token |
| `test_cache_invalidated_on_update` | PATCH /me → Redis cache key deleted |

### P2 — Edge Cases

| Test | What It Verifies |
|---|---|
| `test_null_vs_missing_vs_empty` | `name: null`, omitting name, `name: ""` → all treated as unknown |
| `test_duplicate_topics_deduplicated` | `topics_already_mastered: ["Python", "python"]` → stored as one entry |
| `test_unicode_in_all_fields` | Arabic name, Urdu notes → stored and returned correctly |
| `test_profile_version_set_automatically` | Client cannot override `profile_version` |
| `test_restore_preserves_data_and_onboarding` | `POST /` after soft delete → 200, restores existing row with all data + onboarding state intact. `[D-13 nuance]` |
| `test_merge_patch_preserves_untouched_fields` | PATCH with `{expertise: {programming: {level: "advanced"}}}` → `expertise.programming.level = "advanced"` AND `expertise.ai_ml.level` unchanged (not wiped to default). `field_sources["expertise.programming.level"] = "user"`, other sources unchanged. `[P0-R3-1]` |
| `test_completeness_zero_for_fresh_profile` | New profile with all defaults → `profile_completeness = 0.0`. `[P0-R2-4]` |
| `test_audit_log_created_on_update` | Every PATCH creates an audit log entry |
| `test_rate_limit_returns_429` | Exceed `PATCH /me` rate limit → 429 with `Retry-After` header and `rate_limited` error code. `[P2-1]` |
| `test_concurrent_updates_different_fields_do_not_clobber` | Two simultaneous PATCHes to the same section updating different fields → both changes persist (no lost update). Requires row lock / equivalent transactional merge. `[P0-R4-2]` |
| `test_concurrent_updates_same_field_last_write_wins` | Two simultaneous PATCHes updating the same field → last commit wins deterministically. No crash. `[P2-2 FIX]` |

---

## 7. What NOT to Build

| # | Feature | Why Excluded | Reconsider When |
|---|---|---|---|
| 1 | Personalization engine | Separate system. This service stores/serves profiles. | Separate build phase |
| 2 | Real-time collaborative profile editing | Massive complexity for zero v1 value | Multi-instructor scenarios validated |
| 3 | ML-based profile inference | Progressive profiling is rule-based in v1 | After v1 data proves value |
| 4 | Custom lesson authoring | We personalize existing lessons, not create new ones | Never in this system |
| 5 | Profile sharing/export | No user need identified | Enterprise features scoped |
| 6 | A/B testing personalization | Need baseline first | After v1 quality metrics |
| 7 | Social/peer comparison | Privacy concerns outweigh value | Probably never |
| 8 | Automated profile decay | Profiles don't auto-expire | v2 progressive profiling |
| 9 | Multi-profile per learner | One profile per `learner_id` | Distinct learning contexts validated |
| 10 | Offline profile storage | Server-side only | If offline learning required |
| 11 | Profile-driven assessment | Profile drives presentation, not evaluation | Assessment system design |
| 12 | Cache warming / batch pre-generation | On-demand is sufficient for v1 | Latency issues at scale |

---

## 8. Decision Log

| # | Decision | Resolution | Rationale |
|---|---|---|---|
| D-1 | Onboarding approach | **Hybrid (Option C)** | Form for structured + AI for enrichment. Demos AI capability. |
| D-2 | Default expertise level | **`beginner`** | Under-estimating is less harmful than over-estimating |
| D-3 | `ai_ml.level` enum | **Standardize to `beginner`** | Cross-field consistency. Notes captures nuance. |
| D-4 | Accessibility section | **Include in v1** | Schemas don't change daily. Foundational. |
| D-5 | GDPR compliance | **Hard delete + consent flag** | Right to erasure. Audit log anonymized. |
| D-6 | Prompt injection | **Sandwich + length limits** | Length limits at API. Sandwich at consumer. |
| D-7 | Personalization engine | **Out of scope** | Separate build. Profile system serves data. |
| D-8 | Progressive profiling | **Basic triggers in v1** | After-lesson feedback, after-3-lessons prompt, settings page |
| D-9 | Multi-domain | **Array in v1** | Target audience is multi-domain experts |
| D-10 | Onboarding abandonment | **Save partial + nudge** | Never block content access |
| D-11 | Database hosting | **Neon (serverless PG)** | Zero ops, `pool_pre_ping` for cold starts |
| D-12 | `learner_id` identity | **Auth sub string** | JWT `sub` claim, not generated UUID. Internal `id` is UUID PK. `[P0-1]` |
| D-13 | Soft-delete lifecycle | **Restore old row** | `POST /` on soft-deleted profile restores it. GDPR-erase first for true fresh start. `[P0-2]` |
| D-14 | Completeness metrics | **Two separate metrics** | `onboarding_progress` (user actions) + `profile_completeness` (personalization readiness). XP potential. `[P0-4]` |
| D-15 | Field provenance | **`field_sources` map** | `user > phm > inferred > default` priority. Enables PHM respect + future downranking. `[P0-5]` |
| D-16 | PHM downranking | **Disabled in v1, config flag for future** | `PHM_ALLOW_DOWNRANK=false`. When enabled, PHM can lower `inferred`-sourced values. |
| D-17 | Accessibility onboarding | **Include in Phase 3.5** | User confirmed: must collect accessibility needs during first-session experience. |
| D-18 | Consent HTTP status | **400 via handler, not 422 via Pydantic** | `consent_given` defaults to `False` in model so missing field reaches handler, not FastAPI validation. `[P0-R2-1]` |
| D-19 | PATCH provenance tracking | **Use `model_fields_set` for explicit-only marking** | Prevents Pydantic defaults from being marked `user`-sourced. `[P0-R2-3]` |
| D-20 | Completeness scoring | **Weight by `field_sources` provenance** | `user=1.0, phm=0.8, inferred=0.4, default=0.0`. Prevents always-1.0 trap. `[P0-R2-4]` |
| D-21 | Restore preserves state | **No onboarding reset on restore** | Old progress is valid. GDPR-erase + recreate for true fresh start. `[D-13 nuance]` |
| D-22 | Onboarding skip semantics | **Skip counts as phase complete** | Distinction tracked via `field_sources` (skipped = `default`). `[P1-R2-2]` |
| D-23 | PATCH semantics | **Merge (not replace)** | Use `model_fields_set` recursively. Only explicitly-sent fields are written; omitted fields preserve existing values. Prevents data loss. `[P0-R3-1]` |
| D-24 | Inference timing | **Deferred until real data exists** | Inference does NOT run at profile creation (all defaults = meaningless). Runs after first user/PHM expertise update. `[P0-R3-2]` |
| D-25 | `domain_name` requirement | **Optional at API, prompted in UI** | PHM and defaults may create domain entries with null `domain_name`. UI encourages filling it. `[P0-R3-3]` |
| D-26 | Admin route path | **`/admin/by-learner/{learner_id}`** | Avoids JWT sub encoding issues (`auth0\|...`) and route shadowing. `[P1-R3-1]` |
| D-27 | Concurrent PATCH behavior | **Row-level lock for merge updates** | Prevents lost updates when multiple clients/consumers PATCH different fields concurrently. `[P0-R4-2]` |

---

## Appendix A — PHM Field Mapping

| PHM Field | Profile Field | Transform |
|---|---|---|
| `expertise_level.domain_expertise` | `expertise.domain[0].level` (primary) | Direct enum mapping. `[P1-R2-4 FIX]` If `expertise.domain` is empty, auto-create entry: `{ "level": <PHM value>, "domain_name": null, "is_primary": true }`. If non-empty, update the `is_primary: true` entry's level. |
| `expertise_level.programming_experience` | `expertise.programming.level` | Direct enum mapping |
| `expertise_level.ai_ml_familiarity` | `expertise.ai_ml.level` | Direct enum mapping |
| `expertise_level.business_experience` | `expertise.business.level` | Direct enum mapping |
| `knowledge_map.mastered[].topic` | `expertise.subject_specific.topics_already_mastered[]` | Each topic → `{ "topic": "<value>", "treatment": "reference" }`. Default `treatment` is `reference` (brief recap allowed). Deduplicate by case-normalized topic name. |
| `knowledge_map.topics_to_skip[]` | `expertise.subject_specific.topics_already_mastered[]` | Each topic → `{ "topic": "<value>", "treatment": "skip" }`. Merged into same array. If topic exists with `reference`, PHM `skip` overrides to `skip`. |
| `knowledge_map.known_misconceptions[]` | `expertise.subject_specific.known_misconceptions[]` | PHM sends strings (topic names where misconception detected). Transform: each string → `{ "topic": "<value>", "misconception": "Detected via tutoring session — details pending review" }`. If topic already exists in array, skip (don't duplicate). Capped at 5. |
| `professional_context.current_role` | `professional_context.current_role` | Direct string copy |
| `professional_context.industry` | `professional_context.industry` | Direct string copy |
| `professional_context.real_projects[]` | `professional_context.real_projects[]` | Direct array copy |
| `motivation_and_goals.primary_goal` | `goals.primary_learning_goal` | Direct string copy |
| `motivation_and_goals.urgency` | `goals.urgency` | Direct enum mapping |
| `communication_preferences.language_complexity` | `communication.language_complexity` | Direct enum mapping |
| `communication_preferences.preferred_analogy_domain` | `communication.analogy_domain` | Direct string copy |
| `communication_preferences.verbosity_preference` | `communication.verbosity` | Direct enum mapping |
| `learning_style_signals.prefers_examples_before_theory` | `communication.preferred_structure` | `true` → `examples-first`, `false` → `theory-first` |

**PHM Sync Conflict Rules (uses `field_sources` provenance):**
- PHM **never overwrites** `user`-sourced values. Check `field_sources` before any update.
- PHM can overwrite `inferred` and `default` sourced values. When it does, set `field_sources[field] = "phm"`.
- `topics_already_mastered`: additive — new topics appended, existing topics can be upgraded from `reference` → `skip` but not downgraded.
- **v1 behavior**: PHM can only raise expertise levels (e.g., `beginner` → `intermediate`), never lower them.
- **Future (when downranking enabled)**: PHM will be allowed to downgrade `inferred`-sourced expertise levels based on assessment evidence. `user`-sourced values still never overwritten. Controlled by config flag `PHM_ALLOW_DOWNRANK=false` (default).

---

## Appendix B — Complete Defaults Table (v1.1) `[Updated P2-R3-2]`

Every field has an explicit default. This is the full baseline for a brand-new profile with zero user input.

**Identity & System (set by system, not defaults):**

| Field | Initial Value | Notes |
|---|---|---|
| `id` | Auto-generated UUID v4 | Internal PK |
| `learner_id` | JWT `sub` | Set from token |
| `name` | `null` | |
| `created_at` / `updated_at` | Current UTC timestamp | |
| `profile_version` | `"1.1"` | |
| `consent_given` | `true` | Required at creation |
| `consent_date` | Current UTC timestamp | Auto-set when consent given |
| `onboarding_completed` | `false` | |
| `onboarding_sections_completed` | `{}` | All phases uncompleted |
| `field_sources` | `{}` | Sparse map — empty means all fields are `default`-sourced. Only non-default sources are stored (e.g., `{"expertise.programming.level": "user"}`). Missing key = `default`. `[P1-R4-1 FIX]` |
| `deleted_at` | `null` | |

**Expertise (Section 2):**

| Field | Default | Condition |
|---|---|---|
| `expertise.domain` | `[]` (empty array) | No domain expertise until user provides |
| `expertise.programming.level` | `beginner` | |
| `expertise.programming.languages` | `[]` | |
| `expertise.programming.notes` | `null` | |
| `expertise.ai_ml.level` | `beginner` | |
| `expertise.ai_ml.notes` | `null` | |
| `expertise.business.level` | `beginner` | |
| `expertise.business.notes` | `null` | |
| `expertise.subject_specific.topics_already_mastered` | `[]` | |
| `expertise.subject_specific.topics_partially_known` | `[]` | |
| `expertise.subject_specific.known_misconceptions` | `[]` | |

**Professional Context (Section 3):**

| Field | Default |
|---|---|
| `professional_context.current_role` | `null` |
| `professional_context.industry` | `null` |
| `professional_context.organization_type` | `null` |
| `professional_context.team_context` | `null` |
| `professional_context.real_projects` | `[]` |
| `professional_context.tools_in_use` | `[]` |
| `professional_context.constraints` | `null` |

**Goals (Section 4):**

| Field | Default |
|---|---|
| `goals.primary_learning_goal` | `null` — transient inference in engine (out of scope for this service) |
| `goals.secondary_goals` | `[]` |
| `goals.urgency` | `null` |
| `goals.urgency_note` | `null` |
| `goals.career_goal` | `null` |
| `goals.immediate_application` | `null` |

**Communication (Section 5) — applied as defaults, upgraded to `inferred` when expertise is set:**

| Field | Default | Condition |
|---|---|---|
| `communication.language_complexity` | `professional` | Overridden by inference when expertise is `user`/`phm`-sourced |
| `communication.preferred_structure` | `examples-first` | |
| `communication.verbosity` | `moderate` | Overridden by inference |
| `communication.analogy_domain` | `null` → falls back to `professional_context.industry` or generic at query time | Cascading fallback |
| `communication.tone` | `professional` | Overridden by inference |
| `communication.wants_summaries` | `true` | |
| `communication.wants_check_in_questions` | `true` | |
| `communication.format_notes` | `null` | |

**Delivery (Section 6):**

| Field | Default | Condition |
|---|---|---|
| `delivery.output_format` | `structured-with-headers` | |
| `delivery.target_length` | `match-source` | |
| `delivery.include_code_samples` | Conditional | `false` when `programming.level == none`; `true` when `>= beginner`. Since default programming is `beginner`, default is `true` — but as `default`-sourced, contributes 0.0 to completeness |
| `delivery.code_verbosity` | Conditional | `beginner→fully-explained, intermediate→annotated, advanced/expert→minimal`. Ignored when `include_code_samples == false` |
| `delivery.include_visual_descriptions` | `false` | `true` when `accessibility.screen_reader = true` |
| `delivery.language` | `"English"` | |
| `delivery.language_proficiency` | `null` | |

**Accessibility (Section 7):**

| Field | Default |
|---|---|
| `accessibility.screen_reader` | `false` |
| `accessibility.cognitive_load_preference` | `"standard"` |
| `accessibility.color_blind_safe` | `false` |
| `accessibility.dyslexia_friendly` | `false` |
| `accessibility.notes` | `null` |

---

## Appendix C — Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | — | Neon PostgreSQL connection string. Format: `postgresql+asyncpg://user:pass@host/db?sslmode=require` |
| `REDIS_URL` | Yes | — | Redis connection string. Format: `redis://host:6379/0` |
| `JWKS_URL` | Yes | — | SSO JWKS endpoint for JWT validation. Example: `http://sso:3001/.well-known/jwks.json` |
| `JWT_ISSUER` | Yes | — | Expected JWT issuer claim |
| `JWT_AUDIENCE` | Yes | — | Expected JWT audience claim |
| `STUDY_MODE_API_URL` | Yes | — | Study Mode API base URL for PHM sync. Example: `http://study-mode-api:8000` |
| `PORT` | No | `8004` | Service port |
| `DEV_MODE` | No | `false` | When `true`, bypasses JWT auth (development only — NEVER in production) |
| `LOG_LEVEL` | No | `info` | Logging level: `debug`, `info`, `warning`, `error` |
| `REDIS_NAMESPACE` | No | `lp:` | Redis key prefix for cache isolation |
| `DB_POOL_SIZE` | No | `5` | SQLAlchemy async pool size |
| `DB_POOL_PRE_PING` | No | `true` | Validate connections before use (required for Neon cold starts) |
| `RATE_LIMIT_ENABLED` | No | `true` | Enable/disable rate limiting |
| `PHM_ALLOW_DOWNRANK` | No | `false` | When `true`, PHM sync can lower `inferred`-sourced expertise levels. v1 ships with `false`. |

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

| Field | Retained? | Value |
|---|---|---|
| `audit_log.id` | Yes | Original UUID (for counting) |
| `audit_log.learner_id` | Anonymized | SHA-256 hash (irreversible without salt) |
| `audit_log.action` | Overwritten | `"gdpr_erased"` |
| `audit_log.changed_sections` | Cleared | `[]` |
| `audit_log.previous_values` | Cleared | `{}` |
| `audit_log.source` | Overwritten | `"gdpr_erase"` |
| `audit_log.created_at` | Yes | Original timestamp |
| Profile row | Deleted | Nothing retained |

### Additional GDPR Environment Variable

| Variable | Required | Default | Description |
|---|---|---|---|
| `GDPR_HASH_SALT` | Yes | — | Salt for SHA-256 hashing of learner_id in anonymized audit records. Must be ≥32 chars. |

---

## References

- Schema Audit: `specs/learner-profile/research/schema-audit.md`
- Engine Spec: `specs/learner-profile/research/engine-spec.md`
- Onboarding UX: `specs/learner-profile/research/onboarding-ux.md`
- Technical Architecture: `specs/learner-profile/research/technical-architecture.md`
- QA Review: `specs/learner-profile/research/qa-review.md`
- Original Schema Research (LEGACY — v1.0, superseded by this spec): `specs/learner-profile/learner_profile_schema.md` — contains Fatima/Raj/Marcus worked examples in v1.0 format
