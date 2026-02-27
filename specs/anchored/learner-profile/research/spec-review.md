# Specification Review — Learner Profile System v1.0

**Reviewer:** QA Lead (Phase 3)
**Date:** 2026-02-26
**Artifact:** `../spec.md`
**Cross-referenced against:** All 5 research files + 11 user decisions

---

## Summary Verdict

The spec is **well-structured and comprehensive**. It correctly synthesizes the major findings from all 5 research streams and applies all 11 user decisions. The scope boundary (profile system vs personalization engine) is clear and consistently enforced.

**Issues found: 7 BLOCKER, 11 IMPORTANT, 8 MINOR**

Most blockers are missing details a developer would need on Day 1 of implementation — not architectural errors.

---

## 1. Decision Compliance Check (11 Decisions)

| # | Decision | Correctly Applied? | Notes |
|---|----------|-------------------|-------|
| D-1 | Hybrid onboarding (Option C) | YES | Section 4 specifies form + optional AI enrichment. |
| D-2 | Default expertise = `beginner` | YES | Appendix B updated. Schema Section 2 table says "Default is `beginner`". |
| D-3 | `ai_ml.level` standardized | YES | Enum is now `none\|beginner\|intermediate\|advanced\|expert` everywhere. |
| D-4 | Accessibility in v1 | YES | Section 7 added with all 4 fields + notes. |
| D-5 | GDPR hard delete + consent | YES | `DELETE /me/gdpr-erase` endpoint. `consent_given` required. Audit log anonymized. |
| D-6 | Prompt injection: sandwich + limits | YES | Section 2 "Security: Freetext Field Handling" documents responsibility split. |
| D-7 | Personalization engine out of scope | YES | Stated in system overview, "What's NOT This System", and Section 3 header. |
| D-8 | Progressive profiling basic triggers | YES | Section 4 "Progressive Profiling Triggers" table with 5 triggers. |
| D-9 | Multi-domain array in v1 | YES | `domain` is now an array with `is_primary` flag. |
| D-10 | Onboarding abandonment: save partial + nudge | YES | Section 4 "Onboarding Abandonment" specifies banner with completion %. |
| D-11 | Neon (serverless PG) | YES | Stack table says "PostgreSQL 16+ (Neon serverless)". |

**All 11 decisions correctly reflected. No compliance issues.**

---

## 2. BLOCKER Issues

### B-1: No `ProfileCreate` request schema in spec

**Location:** Section 5, API Endpoints (line 570-582) and Response Shapes (line 584-614)

The spec defines `ProfileResponse`, `OnboardingStatus`, and `CompletenessResponse` but NEVER defines the request schemas: `ProfileCreate`, `ProfileUpdate`, or section update payloads. A developer implementing `POST /` or `PATCH /me` has no contract for what the request body looks like.

The architecture research (`technical-architecture.md` line 342-359) defines these schemas but uses `dict[str, Any]` for all JSONB sections — which means no validation. The spec needs typed request models that validate against the schema enums and limits defined in Section 2.

**What a developer needs:**
- `ProfileCreate` with typed expertise, goals, etc. (not `dict[str, Any]`)
- `ProfileUpdate` with all fields optional
- Section-level update payloads per section
- Validation rules embedded in the Pydantic models

**Fix:** Add a "Request Shapes" subsection that mirrors "Response Shapes" with properly typed models. At minimum, define the JSONB section schemas as Pydantic models with enum validation.

---

### B-2: No error response schema

**Location:** Missing entirely

The spec defines success responses (201, 200, 204) but NEVER defines error responses. A developer needs to know:
- What does a 400 look like (missing consent)?
- What does a 422 look like (validation failure)?
- What does a 404 look like (profile not found)?
- What does a 409 look like (duplicate learner_id)?
- What does a 403 look like (accessing another user's profile)?

This was flagged in QA review Phase 1 (Gap G-4) and remains unaddressed.

**Fix:** Add an `ErrorResponse` schema:
```python
class ErrorResponse(BaseModel):
    error: str           # Machine-readable error code
    message: str         # Human-readable message
    details: dict | None # Field-level errors for 422
```

And document which HTTP status each endpoint returns for each failure mode.

---

### B-3: `profile_completeness` calculation algorithm not specified

**Location:** Spec lines 598, 607, 611-613; Section 4 line 450

`profile_completeness` appears in 3 response schemas (`ProfileResponse`, `OnboardingStatus`, `CompletenessResponse`) and in the onboarding state JSON. But the algorithm for calculating it is never defined.

Questions a developer will ask:
- Is it a simple "filled sections / total sections" ratio?
- Are some fields weighted more heavily? (expertise is more impactful than accessibility)
- Does `highest_impact_missing` use the same weights?
- Is a section "filled" if it has any data, or only when all required fields are present?
- Does the `domain` array count as filled if it has one entry or only when it has a primary?

**Fix:** Define the completeness algorithm. Recommend:
- Section weights: expertise=0.25, goals=0.20, professional_context=0.20, communication=0.15, delivery=0.10, accessibility=0.10
- A section is "filled" if at least one non-default value is set
- `highest_impact_missing` returns the highest-weighted unfilled sections

---

### B-4: `onboarding_sections_completed` keys don't match schema sections

**Location:** Spec line 441-451

The onboarding state example shows:
```json
{
  "goals": true,
  "expertise": true,
  "professional_context": false,
  "ai_enrichment": false
}
```

But the schema has 7 sections: Identity, Expertise, Professional Context, Goals, Communication, Delivery, Accessibility. The onboarding flow (Section 4) has 4 phases: Goals, Background, Professional Context, AI Enrichment. These are different segmentations.

Questions:
- Does "Background" (onboarding phase 2) map to the "expertise" key?
- Why is there no "communication", "delivery", or "accessibility" key? (Because they're inferred/deferred — but that's not documented in the tracking state)
- The `next_section` field in `OnboardingStatus` — what are the valid values? The 4 onboarding phases or the 7 schema sections?

**Fix:** Explicitly define the mapping between onboarding phases and schema sections. Document which keys `onboarding_sections_completed` tracks and what values `next_section` returns.

---

### B-5: PHM sync `topics_already_mastered` mapping is broken by schema change

**Location:** Appendix A, line 736

PHM mapping says:
```
knowledge_map.mastered[].topic → expertise.subject_specific.topics_already_mastered[]
```

But in the v1.1 schema (Section 2, line 136-140), `topics_already_mastered` is now an array of objects `{ topic, treatment }`, not an array of strings. The PHM mapping doesn't specify what `treatment` value to assign for auto-imported topics.

**Fix:** Update Appendix A mapping:
```
knowledge_map.mastered[].topic → expertise.subject_specific.topics_already_mastered[].topic
                                  (treatment defaults to "reference")
```

---

### B-6: No rate limiting specified

**Location:** Missing entirely

The spec mentions Redis and shared `api_infra` (which includes rate limiting infrastructure), but NEVER specifies rate limits for any endpoint. The architecture research proposed 50 personalizations/day (QA countered with 10/day), but personalization is out of scope anyway. However, profile CRUD endpoints also need rate limits:
- Profile creation: prevent abuse (one per user, but what about retries?)
- Section updates: prevent rapid-fire updates that thrash the cache
- PHM sync: prevent excessive external API calls

**Fix:** Add a rate limiting table:
```
| Endpoint | Rate Limit | Window |
| POST / | 1 per user | lifetime (unique constraint handles this) |
| PATCH /me | 30 per user | 1 hour |
| PATCH /me/sections/* | 60 per user | 1 hour |
| POST /me/sync-from-phm | 5 per user | 1 hour |
| GET /me | 120 per user | 1 minute |
```

---

### B-7: `inference.py` service has no specification

**Location:** Project structure line 496

The project structure includes `services/inference.py` — "Communication/delivery inference rules". These rules are partially documented in the Onboarding Specification (Section 4, "Inference Rules" table, lines 407-413) but the specification is incomplete:

- The table has 5 example rows but not exhaustive coverage. What about `programming=intermediate, ai_ml=advanced`? `programming=none, business=none`?
- When does inference run? On profile creation? On every read? On explicit trigger?
- Can a user override an inferred value? If a user manually sets `language_complexity = expert` but their expertise says `beginner`, does the manual value stick?
- Are inferred values stored in the DB or computed on-the-fly?

**Fix:** Either (a) define exhaustive inference rules as a decision matrix, or (b) specify the algorithm: "take the maximum expertise level across all domains; map to language_complexity using [table]; user-set values always override inferences."

---

## 3. IMPORTANT Issues

### I-1: `accessibility` section not in DB model JSONB columns

**Location:** Spec line 532

The DB model shows `accessibility: dict[str, Any]` as a JSONB column — this is correct. But the `ProfileResponse` schema (line 596) includes `accessibility: dict[str, Any]` — also correct. Consistency verified. No issue here.

*Withdrawn after re-verification. Keeping for audit trail.*

---

### I-2: `consent_given` and `consent_date` not in `ProfileResponse`

**Location:** Spec lines 586-600

`ProfileResponse` does NOT include `consent_given` or `consent_date`. This means:
- The frontend cannot display consent status to the user
- GDPR data portability (`GET /me` as export) would be incomplete — the user can't see when they consented
- Admin views can't verify consent status

**Fix:** Add `consent_given: bool` and `consent_date: datetime | None` to `ProfileResponse`.

---

### I-3: Duplicate `learner_id` handling not specified

**Location:** Spec line 572

`POST /` creates a profile. The spec says `consent_given: true` is required but doesn't specify what happens when a profile already exists for the JWT user's `sub`. Options:
- Return 409 Conflict
- Return existing profile (idempotent)
- Update existing profile

The architecture research (line 428) says `test_create_profile_duplicate_learner_id_returns_409`. The spec's test scenarios (line 685) have `test_create_after_soft_delete`. But the spec never explicitly states the behavior.

**Fix:** Add to API endpoint docs: "Returns 409 Conflict if a profile already exists for this user. Use `PATCH /me` to update."

---

### I-4: Soft-delete and hard-delete interaction needs clarification

**Location:** Spec lines 577-578, 626-628

What happens if a user:
1. Creates profile
2. Soft-deletes (`DELETE /me`)
3. Tries `DELETE /me/gdpr-erase` on the soft-deleted profile

Is the GDPR erase endpoint aware of soft-deleted profiles? Can it hard-delete a soft-deleted record? The spec says `DELETE /me` sets `deleted_at` and `GET /me` returns 404. But `DELETE /me/gdpr-erase` — does it look at soft-deleted records?

Also: after soft-delete, can the user create a new profile (`POST /`)? The test scenario `test_create_after_soft_delete` (line 685) implies yes, but the spec doesn't state this.

**Fix:** Document the delete lifecycle:
- Soft delete: sets `deleted_at`, profile is hidden but recoverable
- GDPR erase: works on both active and soft-deleted profiles
- After soft-delete: `POST /` creates a new profile (old record stays soft-deleted unless GDPR erased)

---

### I-5: `PATCH /me/sections/{section}` — valid section names not defined

**Location:** Spec line 576

What are the valid section names? The schema has: `expertise`, `professional_context`, `goals`, `communication`, `delivery`, `accessibility`. But the endpoint documentation doesn't enumerate them. A developer needs to know:
- Is it `/me/sections/expertise` or `/me/sections/Expertise`?
- What about `identity` (name, consent)? Is that a section?
- Can you update `onboarding_sections_completed` via this endpoint?

**Fix:** Add: "Valid section names: `expertise`, `professional_context`, `goals`, `communication`, `delivery`, `accessibility`. Case-sensitive, lowercase. Returns 404 for unknown sections."

---

### I-6: `CompletenessResponse.highest_impact_missing` — no definition of "impact"

**Location:** Spec line 613

`highest_impact_missing: list[str]` is documented as "fields that would most improve personalization". But how is impact measured? This connects to B-3 (completeness algorithm). Without a definition, every developer will implement a different heuristic.

**Fix:** Define explicitly. Recommend static priority: `primary_learning_goal` > `programming.level` > `ai_ml.level` > `domain.level` > `current_role` > `industry` > rest.

---

### I-7: Schema version mismatch between text and DB model

**Location:** Spec line 86 says "Schema v1.1". Line 520 says `profile_version: str = Field(default="1.1")`. But line 95 in the schema JSON says `"profile_version": "1.1"`.

This is consistent within the spec BUT: the original schema research (`learner_profile_schema.md`) and all example profiles use `"1.0"`. The PHM mapping (Appendix A) doesn't mention version translation. If existing PHM profiles have `profile_version: "1.0"`, what happens when they sync?

**Fix:** Document: "PHM sync always writes `profile_version: 1.1` regardless of source version. All v1.0 concepts are forward-compatible."

---

### I-8: `domain` array — empty array vs no domain

**Location:** Spec line 114-121, 310

Validation says "Max 5 entries, exactly one `is_primary: true`". But what if the learner has no domain expertise (like Marcus)? Must they still provide an array with one entry `{ level: "none", is_primary: true }`? Or can the array be empty?

This matters for:
- Onboarding Phase 2: if a learner skips domain, what gets stored?
- Validation: does an empty array pass the "exactly one is_primary" constraint?
- PHM sync: what does `domain[0]` mean when the array is empty?

**Fix:** Document: "Empty array is valid (learner has no domain context). The `is_primary` constraint applies only when array has 1+ entries. Consumers default to generic examples when array is empty."

---

### I-9: Progressive profiling "After quiz/assessment" trigger assumes assessment system exists

**Location:** Spec line 435

Progressive profiling trigger #4: "After quiz/assessment → `topics_already_mastered` → Auto-populated (no user action)"

But the "What NOT to Build" list (line 705) says "Profile-driven assessment — Profile drives presentation, not evaluation." There's no assessment system in scope. This trigger has no upstream data source in v1.

**Fix:** Either remove this trigger from v1 (defer to when assessment exists) or clarify: "Auto-populated from external assessment data when available. No assessment system included in this build."

---

### I-10: No environment variables / configuration documented

**Location:** Missing

The spec says `config.py` uses `pydantic-settings BaseSettings from env` (line 487) but never documents the required environment variables:
- `DATABASE_URL`
- `REDIS_URL`
- `JWKS_URL`
- `DEV_MODE`
- `PHM_API_URL`
- `CORS_ORIGINS`

A developer cannot set up the service without this.

**Fix:** Add a configuration section listing all env vars with types, defaults, and whether required.

---

### I-11: Audit log for GDPR erase — what gets anonymized?

**Location:** Spec line 628

"Audit log retains anonymized record (`learner_id` hashed, `previous_values` cleared, only `action: 'gdpr_erased'` and timestamp kept)."

Questions:
- What hash function for `learner_id`? Needs to be one-way and non-reversible.
- Is `changed_sections` also cleared? It might leak what was in the profile.
- Is `source` retained? (It could indicate how the user interacted with the platform)
- Are ALL prior audit entries for this user also anonymized, or just the erase entry?

**Fix:** Specify precisely: "On GDPR erase, ALL audit log entries for this `learner_id` are updated: `learner_id` replaced with SHA-256 hash (unsalted, for cross-entry linkage without PII), `previous_values` set to `{}`, `changed_sections` set to `[]`. Only `action`, `source`, and `created_at` retained."

---

## 4. MINOR Issues

### M-1: Example profiles not updated to v1.1 schema

The original schema research has 3 example profiles (Fatima, Raj, Marcus) using v1.0 format. The spec doesn't include updated examples for v1.1 (multi-domain array, no `topics_to_skip`, accessibility section, `treatment` field on mastered topics, `language_proficiency`, consent fields). Developers implementing tests will need to construct their own v1.1-compatible profiles.

**Fix:** Add one complete v1.1 example profile to the spec (e.g., Fatima updated).

---

### M-2: `target_length` word count ranges not documented anywhere

Spec says (line 264): "word count ranges moved to documentation, not stored." But the word count ranges don't appear anywhere in the spec itself. The engine-spec has them (short=500-1000, medium=1000-2500, long=2500+), but that's a research file, not the spec.

**Fix:** Add a footnote or reference table for `target_length` word count ranges.

---

### M-3: Spec says `output_format` default is missing from Section 5

Appendix B (line 761) says `delivery.output_format` defaults to `structured-with-headers`. But Section 6 (Delivery Preferences) doesn't mention a default. Not a contradiction (Appendix B is the defaults table), but the inline defaults mentioned for Communication (line 238-244) set a pattern that Delivery doesn't follow.

**Fix:** Add inline defaults to Section 6 for consistency.

---

### M-4: `test_concurrent_updates` — "last write wins" needs more detail

**Location:** Spec line 687

"Two simultaneous PATCHes → no data loss (last write wins on JSONB sections)"

But JSONB sections are entire JSON objects. If User A updates `expertise.programming.level` and User B simultaneously updates `expertise.ai_ml.level`, and both send the full `expertise` section, one update is lost. "Last write wins" means one of these changes is silently dropped.

This is unlikely in v1 (single-user profiles), but the test scenario implies we handle it. The correct approach for JSONB is either:
- Deep merge (complex but no data loss)
- Accept last-write-wins and document the limitation

**Fix:** Clarify: "JSONB sections use replace semantics, not merge. Concurrent updates to the same section may lose changes. Acceptable for v1 (single-user profiles)."

---

### M-5: `delivery.include_visual_descriptions` retained but `visual_description_notes` removed

**Location:** Spec line 265

`visual_description_notes` was removed (absorbed into accessibility). But `include_visual_descriptions` remains in the Delivery section without a corresponding notes field. This is fine — the boolean toggles visual descriptions, and any specifics go into `accessibility.notes`. But the connection isn't documented.

**Fix:** Add a field resolution rule: "`include_visual_descriptions` controls whether visual descriptions are generated. Specifics for how to generate them come from `accessibility.*` fields."

---

### M-6: Cache TTL for profile (30 min) may be too long for active onboarding

**Location:** Spec line 620

During onboarding, the user fills one section at a time. If the profile is cached for 30 minutes, the cache may serve stale data between section completions. The spec says cache is invalidated on update, which handles this — but only if the invalidation is reliable.

**Fix:** Document: "Profile cache is invalidated on every PATCH. The 30-min TTL is a safety net for cache misses, not the primary freshness mechanism."

---

### M-7: No health check endpoint documented

The architecture research mentions `GET /health` with Redis ping and DB check. The spec's project structure mentions `main.py` handles health checks. But the API endpoints table (line 568-582) doesn't list a health check endpoint.

**Fix:** Add `GET /health` to the endpoints table (no auth required).

---

### M-8: `datetime.utcnow` is deprecated in Python 3.12+

**Location:** Spec lines 539-540

```python
created_at: datetime = Field(default_factory=datetime.utcnow)
updated_at: datetime = Field(default_factory=datetime.utcnow)
```

`datetime.utcnow()` is deprecated as of Python 3.12. Should use `datetime.now(timezone.utc)` instead.

**Fix:** Update to `datetime.now(timezone.utc)` in the spec's code examples.

---

## 5. Cross-Reference Validation

### Schema Audit (7 critical issues) — Compliance Check

| Schema Audit Issue | Addressed in Spec? | Notes |
|---|---|---|
| 1. Inconsistent `ai_ml` enum | YES | Standardized per D-3 |
| 2. Freetext `notes` fields unpredictable | YES | Max char limits added (300 chars) |
| 3. Missing accessibility section | YES | Section 7 added per D-4 |
| 4. No `last_updated` | YES | Added to Section 1 |
| 5. `topics_to_skip` duplication | YES | Merged into `topics_already_mastered` with `treatment` |
| 6. `include_code_samples` default dangerous | YES | Conditional default per D-6 |
| 7. No schema versioning strategy | PARTIAL | Version bumped to 1.1, but migration strategy for future versions not specified |

**Additional schema-audit recommendations:**
- Multi-domain as array: YES (D-9)
- Remove `real_projects.relevance`: YES
- `language_proficiency`: YES
- Default expertise to `beginner`: YES (D-2)
- Domain should support multiple: YES

### Engine Spec — Schema Compatibility Check

| Engine Spec Requirement | Spec Supports? | Notes |
|---|---|---|
| 5 invariants (factual, completeness, no hallucination, term integrity, attribution) | N/A — engine is out of scope | Correctly deferred |
| 10 conflict resolution rules | N/A — engine is out of scope | Schema structure supports all 10 rules |
| Personalization manifest | N/A | Engine's responsibility |
| `topics_already_mastered` compression | YES | New `treatment: reference\|skip` field supports this |
| `real_projects` as example vehicle | YES | `relevance` removed, engine infers from `description` |
| Cross-dimensional interactions | N/A | Engine's responsibility, but schema supports it |

**One concern:** Engine spec's Edge Case 4 says "notes override level." The profile system stores both values as-is. The spec does NOT validate that notes and level are consistent. This is correct — validation of semantic consistency is the consumer's job, not the storage system's.

### Onboarding UX — Compliance Check

| UX Recommendation | Spec Matches? | Notes |
|---|---|---|
| Goals-first ordering | YES | Phase 1 is goals |
| 8-field MVP | YES | 9 fields across 3 phases (close enough) |
| 7 fields never in onboarding | YES | Listed in "Fields NEVER Asked" table |
| Skip behavior with defaults | YES | "Skip for now" documented |
| Progressive profiling triggers | YES | 5 triggers listed |
| Partial onboarding saves progress | YES | "Onboarding Abandonment" section |
| Inference rules for comm/delivery | PARTIAL | Table exists but not exhaustive (see B-7) |

### Technical Architecture — Compliance Check

| Architecture Decision | Spec Matches? | Notes |
|---|---|---|
| Hybrid DB (core columns + JSONB) | YES | DB model matches |
| `/me` pattern | YES | Endpoints use `/me` |
| Section-level PATCH | YES | `PATCH /me/sections/{section}` |
| Audit log (not full snapshots) | YES | `ProfileAuditLog` model present |
| Cache strategy with `lp:` prefix | YES | Cache table matches |
| Port 8004 | YES | Stack table says 8004 |
| Content-api patterns replicated | YES | Structure matches |

**Missing from spec that architecture proposed:**
- Personalization-related endpoints (`POST /me/personalize`, `GET /me/personalized/{lesson_id}`, `DELETE /me/personalized-cache`) are correctly EXCLUDED from spec (engine out of scope). Good scope enforcement.
- Redis Lua-based rate limiting: mentioned as a pattern to replicate but not specified (see B-6).

### QA Review — Gap Resolution Check

| QA Gap | Resolved? | Notes |
|---|---|---|
| G-1: Prompt injection | YES | Sandwich + limits. Responsibility documented. |
| G-2: GDPR/PII | YES | Hard delete, consent, anonymized audit. |
| G-3: No validation spec | PARTIAL | Validation rules table exists but not exhaustive (see B-1). |
| G-4: No error response contract | **NO** | Still missing (see B-2). |
| G-5: Schema migration strategy | PARTIAL | Version bumped but no migration functions. |
| G-6: Multi-language profile values | **NO** | Not addressed. If `domain_name: "logistique"`, does the system care? |
| G-7: Field interdependency docs | YES | "Field Resolution Rules" table added. |
| G-8: Rate limiting / cost control | **NO** for this system (see B-6). Engine costs are out of scope. |
| G-9: Accessibility | YES | Section 7 added. |
| G-10: Profile completeness score | YES | `CompletenessResponse` added. But algorithm undefined (B-3). |
| G-11: No temporal model | YES | `last_updated` added. |

---

## 6. Scope Boundary Enforcement

The spec is clean on scope. Section 3 ("Personalization Engine Requirements") explicitly frames engine details as "schema support for future build." No engine endpoints appear in the API table. The "What NOT to Build" list correctly excludes personalization engine.

One borderline area: the inference rules in Section 4 (inferring `language_complexity` from expertise) could be seen as personalization logic living in the profile system. However, these are reasonable — they're profile enrichment (filling in defaults from other profile data), not content transformation. This is correctly scoped.

---

## 7. Ambiguities a Developer Would Escalate

These are questions a developer would ask on Day 1 of implementation that the spec doesn't answer:

1. **How does `PATCH /me` handle JSONB merging?** Does it replace the entire section or deep-merge? (Related to M-4)
2. **When a profile is soft-deleted, can the user log in and see their data?** Or is the profile completely hidden even from the owner?
3. **PHM sync conflict resolution:** If the user manually set `programming.level: advanced` but PHM says `beginner`, which wins?
4. **`domain` array ordering:** If there are 3 domains, is `domain[0]` always the primary, or is it determined solely by `is_primary` flag?
5. **Profile creation flow:** Does the frontend call `POST /` first (creating an empty profile with consent), then `PATCH /me/onboarding/goals` etc.? Or does `POST /` accept the full first-phase data?
6. **`delivery.language` — is this used by this system at all?** The profile system stores it, but if there's no localization in the profile API itself, it's purely for downstream consumers.

---

## 8. Final Scorecard

| Dimension | Score | Notes |
|---|---|---|
| Decision compliance | 11/11 | All decisions correctly applied |
| Research incorporation | 9/10 | Missing: multi-language profile values (G-6), error response schema (G-4) |
| Internal consistency | 8/10 | PHM mapping broken by schema change (B-5), onboarding keys mismatched (B-4) |
| Implementation readiness | 6/10 | Missing: request schemas, error schemas, env vars, rate limits, completeness algorithm, inference spec |
| Scope enforcement | 10/10 | Clean boundary. No scope creep. |

**Overall: GOOD spec that needs 7 targeted additions before a developer can implement without ambiguity.**

The blockers are mostly "missing detail" not "wrong direction." The architecture and design decisions are solid. Recommend fixing B-1 through B-7, then this spec is ready for implementation.
