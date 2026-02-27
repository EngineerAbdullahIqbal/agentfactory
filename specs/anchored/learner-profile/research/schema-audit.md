# Schema Audit — Learner Profile v1.0

**Auditor:** schema-analyst
**Date:** 2026-02-26
**Input:** `learner_profile_schema.md` (508 lines, 6 sections, 3 examples, 2 appendices)
**Scope:** Every field assessed against the 5 personalization dimensions (vocabulary, examples, depth, structure, tone)

---

## Executive Summary

The schema is well-designed for its stated purpose — static content personalization. It covers the right macro categories. However, it has **7 critical issues**:

1. **Inconsistent enum scales** — `ai_ml.level` uses `conceptual` instead of `beginner`, breaking cross-field consistency
2. **Free-text fields that look structured** — `notes`, `knowledge_state`, `constraints` are free-text but will be consumed by an LLM, creating unpredictable personalization
3. **Missing accessibility dimension** — no field for learning disabilities, screen reader needs, cognitive load preferences, or color blindness
4. **No temporal/staleness tracking** — profile has `profile_created` but no `last_updated`, no field-level confidence, no decay signal
5. **`topics_to_skip` duplicates `topics_already_mastered`** — the behavioral difference is too subtle to justify two fields
6. **Dangerous defaults** — `include_code_samples: true` for a non-programmer (Fatima profile) would produce unusable output if the profile is partially filled
7. **No schema versioning strategy** — `profile_version: 1.0` exists but no migration path or backwards-compatibility contract

---

## 1. Schema Audit Table

### SECTION 1 — Identity and Context

| Field | Drives Dimension | Fill Likelihood | Personalization Impact | Verdict |
|---|---|---|---|---|
| `learner_id` | None directly — system field | Always (auto-generated) | None — linkage only | **KEEP** (system requirement) |
| `name` | Tone (personal address) | High | Low — cosmetic personalization | **KEEP** but mark as cosmetic |
| `profile_created` | None | Always (auto-generated) | None | **MODIFY** — add `last_updated` alongside it |
| `profile_version` | None | Always (auto-set) | None — migration support | **KEEP** but define migration contract |

**Section 1 verdict:** Lean and correct. Add `last_updated` timestamp.

### SECTION 2 — Expertise Profile

| Field | Drives Dimension | Fill Likelihood | Personalization Impact | Verdict |
|---|---|---|---|---|
| `domain.level` | Vocabulary, Examples, Depth | High | **Critical** — determines analogy domain, jargon tolerance | **KEEP** |
| `domain.domain_name` | Examples | High | **High** — selects example domain | **KEEP** |
| `domain.notes` | Depth (edge cases) | Low-Medium | Low — LLM may ignore or misinterpret | **MODIFY** — make structured (see below) |
| `programming.level` | Vocabulary, Depth, Structure | High | **Critical** — controls code inclusion/exclusion | **KEEP** |
| `programming.languages` | Examples (code language) | Medium | Medium — picks code language | **KEEP** |
| `programming.notes` | Depth | Low | Low-Medium — useful but unreliable | **MODIFY** — same as domain.notes |
| `ai_ml.level` | Vocabulary, Depth | High | **High** — whether to define LLM/agent/RAG | **MODIFY** — fix enum inconsistency |
| `ai_ml.notes` | Depth | Low-Medium | Low-Medium | **MODIFY** — same as others |
| `business.level` | Vocabulary, Examples | Medium | Medium — business vs technical framing | **KEEP** |
| `business.notes` | Depth | Low | Low | **MODIFY** |
| `topics_already_mastered` | Depth (skip/compress) | Medium | **High** — controls section compression | **KEEP** |
| `topics_partially_known` | Depth (bridge gaps) | Low | **High** when filled — targeted scaffolding | **KEEP** but simplify structure |
| `topics_partially_known.knowledge_state` | Depth | Low | Medium — free text is unreliable | **MODIFY** — see recommendation |
| `known_misconceptions` | Depth (pre-emptive corrections) | Very Low | **Very High** when filled — prevents reinforcing errors | **KEEP** — high value when present |
| `known_misconceptions.misconception` | Depth | Very Low | Very High | **KEEP** |
| `topics_to_skip` | Depth (compress) | Low | Medium | **REMOVE** — duplicates `topics_already_mastered` |

**Critical issue: `ai_ml.level` enum inconsistency.**
- Domain, programming, business all use: `none | beginner | intermediate | advanced | expert`
- AI/ML uses: `none | conceptual | intermediate | advanced | expert`
- `conceptual` replaces `beginner` — this breaks programmatic handling. Any code that iterates expertise levels must special-case AI/ML.
- **Recommendation:** Standardize to `none | beginner | intermediate | advanced | expert` for all. If `conceptual` captures a real distinction (knows-about vs can-do), add a separate `knowledge_type: theoretical | applied` field.

**Critical issue: `topics_to_skip` vs `topics_already_mastered`.**
- Schema says mastered topics get "compressed to one-sentence references"
- Schema says skip topics "appear in the lesson only as a brief acknowledgment"
- These are the SAME behavior. The difference in the field descriptions is cosmetic. A personalization engine can't meaningfully distinguish between these two compression strategies.
- **Recommendation:** Merge into `topics_already_mastered` with an optional `treatment: compress | skip_entirely` flag if the distinction truly matters.

**Issue: Free-text `notes` fields.**
- There are 4 `notes` fields across expertise sub-objects. These are consumed by an LLM, so they "work" — but they're unpredictable. The same information could be structured.
- **Recommendation:** For v1.0, keep `notes` as escape hatches. For v2.0, analyze the notes content across real profiles and extract recurring patterns into structured fields. Add a `notes` max-length guideline (e.g., 200 chars) to prevent essay-length inputs.

### SECTION 3 — Professional Context

| Field | Drives Dimension | Fill Likelihood | Personalization Impact | Verdict |
|---|---|---|---|---|
| `current_role` | Examples, Vocabulary, Tone | High | **High** — frames entire personalization voice | **KEEP** |
| `industry` | Examples | High | **High** — selects case studies, analogies | **KEEP** |
| `organization_type` | Examples | Medium | Medium — enterprise vs startup framing | **KEEP** |
| `team_context` | Examples, Tone | Low-Medium | Low-Medium — affects collaboration examples | **KEEP** but it's borderline |
| `real_projects` | Examples | Low | **Very High** when filled — the gold standard of personalization | **KEEP** |
| `real_projects.project_name` | Examples | Low | High | **KEEP** |
| `real_projects.description` | Examples, Depth | Low | High | **KEEP** |
| `real_projects.relevance` | Depth | Very Low | Medium — guides where to insert project references | **MODIFY** — this is instructor metadata, not learner-facing. Move to a separate `instructor_notes` section or remove. |
| `tools_in_use` | Examples | Medium | Medium — integration examples | **KEEP** |
| `constraints` | Depth, Examples | Low | **High** when present — prevents suggesting impossible solutions | **KEEP** |

**Issue: `real_projects.relevance` is wrong-level metadata.**
This field describes how the project connects to learning — that's the personalization engine's job, not the profile's job. The engine should determine relevance based on the lesson content being personalized. Asking the learner or instructor to pre-specify relevance per-project adds cognitive burden without clear payoff.
- **Recommendation:** Remove `relevance` from the schema. Let the engine infer relevance from `description` + current lesson topic.

### SECTION 4 — Goals and Motivation

| Field | Drives Dimension | Fill Likelihood | Personalization Impact | Verdict |
|---|---|---|---|---|
| `primary_learning_goal` | Structure, Depth | High | **Critical** — anchors lesson framing | **KEEP** |
| `secondary_goals` | Depth | Low-Medium | Low-Medium — nice enrichment | **KEEP** |
| `urgency` | Depth, Structure | Medium | **High** — controls theory vs practice balance | **KEEP** |
| `urgency_context` | Depth | Low | Low — mostly for human readers | **MODIFY** — consider making this the `urgency` field itself (free text with optional enum tag) |
| `career_goal` | Depth, Examples | Medium | Medium — expands career-relevant sections | **KEEP** |
| `immediate_application` | Structure, Examples | Low-Medium | **High** — scaffolds application section | **KEEP** |

**Issue: `urgency` + `urgency_context` is a split that adds friction.**
The enum `urgency` is useful for programmatic branching. The `urgency_context` explains why. But together, they're two fields for one concept. The context field has very low fill rate in practice.
- **Recommendation:** Keep both but make the relationship explicit in documentation — `urgency` is the machine-readable signal, `urgency_context` is the optional human explanation. Consider renaming to `urgency_note` to signal it's supplementary.

### SECTION 5 — Communication Preferences

| Field | Drives Dimension | Fill Likelihood | Personalization Impact | Verdict |
|---|---|---|---|---|
| `language_complexity` | Vocabulary | High | **Critical** — controls jargon level | **KEEP** |
| `preferred_structure` | Structure | Medium | **Critical** — controls lesson organization pattern | **KEEP** |
| `verbosity` | Depth, Structure | Medium | **High** — controls density | **KEEP** |
| `analogy_domain` | Examples | Low-Medium | Medium — nice personalization touch | **KEEP** |
| `tone` | Tone | Medium | **High** — voice calibration | **KEEP** |
| `wants_summaries` | Structure | Medium | Medium — adds summary blocks | **KEEP** |
| `wants_check_in_questions` | Structure | Medium | Medium — adds reflection prompts | **KEEP** |
| `format_notes` | Structure | Very Low | Low — free text escape hatch | **KEEP** as escape hatch |

**This is the strongest section of the schema.** Every field maps clearly to a personalization dimension. The enum values are well-chosen and mutually exclusive. No changes recommended except minor naming clarity.

**Minor issue: `analogy_domain` fallback.**
The schema says "If null, use `professional_context.industry`." This is a cross-field dependency embedded in documentation, not in the schema itself. The personalization engine needs to know this rule.
- **Recommendation:** Document all cross-field fallback rules in a single "Field Resolution Rules" section rather than scattering them across field descriptions.

### SECTION 6 — Content Delivery Preferences

| Field | Drives Dimension | Fill Likelihood | Personalization Impact | Verdict |
|---|---|---|---|---|
| `output_format` | Structure | Medium | **High** — controls document shape | **KEEP** |
| `target_length` | Depth, Structure | Medium | **High** — controls compression/expansion | **KEEP** |
| `include_code_samples` | Depth, Structure | Medium | **High** — binary toggle for code inclusion | **KEEP** |
| `code_verbosity` | Depth | Low-Medium | Medium — only relevant when code included | **KEEP** but add conditional dependency |
| `include_visual_descriptions` | Structure | Low | Low-Medium — accessibility-adjacent | **KEEP** |
| `visual_description_notes` | Structure | Very Low | Low | **REMOVE** or merge into a broader accessibility section |
| `language` | Vocabulary, Tone (everything) | Medium | **Critical** — output language | **KEEP** |

**Issue: `code_verbosity` is conditional on `include_code_samples`.**
If `include_code_samples: false`, then `code_verbosity` is meaningless. The schema doesn't express this dependency.
- **Recommendation:** Document this as a conditional rule. Optionally restructure as:
```json
"code": {
  "include": true,
  "verbosity": "annotated"
}
```

**Issue: `include_visual_descriptions` is an accessibility concern masquerading as a delivery preference.**
This is really about whether the learner needs alt-text or diagram descriptions. It belongs in an accessibility section, not delivery.
- **Recommendation:** Create a dedicated accessibility section (see Missing Fields below).

---

## 2. Missing Fields Recommendation

### HIGH PRIORITY — Should be in v1.0

| Proposed Field | Section | Why Needed | Drives Dimension |
|---|---|---|---|
| `last_updated` | Identity | Staleness detection. A 6-month-old profile for a beginner may be stale — they've learned since. Without this, the engine can't discount old data. | All (confidence weighting) |
| `accessibility.screen_reader` | New: Accessibility | Controls whether visual descriptions are mandatory, not optional. Changes structure fundamentally. | Structure |
| `accessibility.cognitive_load_preference` | New: Accessibility | Some learners need shorter sections, more whitespace, simpler sentence structure — distinct from `verbosity`. | Structure, Vocabulary |
| `accessibility.color_blind_safe` | New: Accessibility | Affects how visual descriptions reference color. | Structure |
| `language_proficiency` | Delivery or Accessibility | A Spanish-speaking learner requesting English output needs simpler English than a native speaker. `language` alone doesn't capture this. `language_complexity` partially covers it but conflates technical depth with language fluency. | Vocabulary |
| `learning_pace_preference` | Communication | `slow | standard | accelerated` — related to but distinct from `verbosity`. A learner can want concise text but slow introduction of new concepts. | Depth, Structure |

### MEDIUM PRIORITY — Should be in v1.1

| Proposed Field | Section | Why Needed | Drives Dimension |
|---|---|---|---|
| `prior_lessons_completed` | Identity or Expertise | Enables progressive personalization. The engine should know what the learner has already seen in THIS course, not just general knowledge. | Depth |
| `session_length_preference` | Delivery | `short (15min) | medium (30min) | long (60min+)` — affects chunking and natural break points. | Structure |
| `cohort_id` | Identity | For team/classroom learners, enables shared context ("Your team is working on X"). | Examples |
| `preferred_examples_context` | Professional Context | `work | personal | academic | abstract` — the `analogy_domain` is for analogies, but examples are different. A student might want coding examples from gaming, not from their job. | Examples |
| `content_history` | New section | Array of `{lesson_id, completion_date, comprehension_self_rating}`. Enables the engine to reference prior lessons and avoid re-teaching. | Depth |

### LOW PRIORITY — Consider for v2.0

| Proposed Field | Section | Why Needed | Drives Dimension |
|---|---|---|---|
| `timezone` | Identity | For time-sensitive references ("this morning's API call") | Examples (minor) |
| `device_type` | Delivery | Mobile vs desktop affects formatting | Structure |
| `assessment_comfort` | Communication | Some learners find check-in questions stressful. `wants_check_in_questions` captures the boolean but not the emotional context. | Tone |

---

## 3. Missing Persona Types

The 3 example profiles (Fatima, Raj, Marcus) cover: non-programmer business professional, experienced developer, beginner student. These are good but leave significant gaps.

### Personas that would stress-test the schema differently

| Persona | Why They Break the Schema |
|---|---|
| **Non-English primary language learner** (e.g., Yuki, Japanese data scientist learning in English) | Exposes the gap between `language` (output language) and `language_proficiency` (fluency in that language). Current schema can't distinguish "output in English" from "output in simple English because it's my second language." The `language_complexity` field partially covers this but conflates technical depth with language fluency. |
| **Learner with accessibility needs** (e.g., Dana, visually impaired UX researcher) | Exposes the missing accessibility section. `include_visual_descriptions` is a weak proxy. Needs: screen reader optimization, cognitive load preferences, alt-text requirements, table/list structure preferences. |
| **Team/cohort learner** (e.g., Ahmed, part of a 10-person company training cohort) | Exposes missing `cohort_id` and shared context. Ahmed's personalization should reference what his team is building together, use shared vocabulary established in group sessions, and align with team pace. |
| **Returning learner with stale profile** (e.g., Sarah, filled profile 8 months ago, now intermediate instead of beginner) | Exposes missing `last_updated` and profile confidence decay. Her beginner-level profile would produce over-simplified content, frustrating her. No mechanism to detect or handle staleness. |
| **Multi-domain expert** (e.g., Li, cardiologist AND amateur Python developer) | Exposes that `domain` is singular — only one `domain_name` and one `level`. Li's medical expertise should drive healthcare examples, but her programming should be treated as beginner-level for different content. The schema forces one domain identity. |
| **Learner with learning disability** (e.g., Jordan, has ADHD and dyslexia) | Exposes missing cognitive accessibility fields. Jordan needs: shorter sections, more visual breaks, explicit transitions, less dense text — none of which map cleanly to `verbosity` or existing fields. |
| **Goal-ambiguous explorer** (e.g., Pat, "just curious about AI agents, no specific goal") | Exposes that `primary_learning_goal` is required-feeling but some learners genuinely don't have one. The default "inferred from lesson title" is weak. This learner would get generic personalization despite having strong expertise and communication preferences. |

### Recommendation: Add at minimum 2 more example profiles

1. **Non-English learner** — to validate `language` + `language_proficiency` handling
2. **Accessibility-focused learner** — to validate the accessibility section once added

---

## 4. Appendix B Defaults Review

| Field | Current Default | Recommended Default | Rationale |
|---|---|---|---|
| `expertise.*.level` | `intermediate` | `beginner` | **CHANGE.** Defaulting to intermediate risks over-compressing explanations for actual beginners. Under-estimating expertise (showing extra explanation to an expert) is far less harmful than over-estimating (skipping explanations a beginner needs). The cost of being too simple is low (expert skims); the cost of being too advanced is high (beginner is lost). |
| `communication.language_complexity` | `professional` | `professional` | **KEEP.** Good middle ground. `plain` would be patronizing for most; `technical` would alienate non-technical learners. |
| `communication.preferred_structure` | `examples-first` | `examples-first` | **KEEP.** Research-backed. Good default. |
| `communication.verbosity` | `moderate` | `moderate` | **KEEP.** Safe midpoint. |
| `communication.tone` | `professional` | `professional` | **KEEP.** Safe midpoint. |
| `delivery.target_length` | `match-source` | `match-source` | **KEEP.** Best option — doesn't impose arbitrary length. |
| `delivery.include_code_samples` | `true` | **`false`** | **CHANGE.** This is the most dangerous default. For non-programmers (Fatima's profile type), code samples are noise at best and intimidating at worst. The safe default should be to exclude code unless the profile explicitly includes it or `programming.level` is `beginner` or above. The engine should infer: if `programming.level` is `none` or unknown, default to `false`. |
| `goals.primary_learning_goal` | Inferred from lesson title | Inferred from lesson title | **KEEP** but document the inference mechanism clearly. |
| `communication.analogy_domain` | `professional_context.industry` or generic | Same | **KEEP.** Good cascading default. |

### Dangerous Default Deep-Dive: `include_code_samples`

Consider this scenario:
1. Fatima fills out a partial profile: name, role, industry, goals
2. She skips the delivery section entirely
3. Default kicks in: `include_code_samples: true`
4. Personalized lesson includes Python code examples
5. Fatima (programming level: none) sees code she can't read
6. Personalization made the experience WORSE than the generic version

This is the only default that can actively harm the learning experience. All other defaults degrade gracefully (too much explanation, wrong tone, etc.). Code inclusion for non-programmers is a cliff, not a slope.

**Fix:** Make the default conditional:
- If `programming.level` is `none` or absent: default `include_code_samples` to `false`
- If `programming.level` is `beginner` or above: default to `true`

### Proposed New Defaults (for new fields)

| Proposed Field | Recommended Default | Rationale |
|---|---|---|
| `accessibility.screen_reader` | `false` | Most learners don't use screen readers |
| `accessibility.cognitive_load_preference` | `standard` | Don't assume cognitive load needs |
| `language_proficiency` | `native` | Avoids over-simplifying language for most users |
| `learning_pace_preference` | `standard` | Safe midpoint |

---

## 5. Bloat Candidates

| Field | Fill Likelihood | Personalization Impact | ROI | Verdict |
|---|---|---|---|---|
| `topics_to_skip` | Low | Medium (but duplicated by `topics_already_mastered`) | **Negative** — adds confusion | **REMOVE** |
| `real_projects.relevance` | Very Low | Medium (but engine should infer this) | **Negative** — wrong level of abstraction | **REMOVE** |
| `visual_description_notes` | Very Low | Low (too specific for a general field) | Low | **REMOVE** — fold into accessibility section |
| `urgency_context` | Low | Low | Low | **KEEP** but rename to `urgency_note` and document as optional supplementary |
| `business.notes` | Low | Low | Low | **KEEP** as escape hatch but add max-length guidance |
| `team_context` | Low-Medium | Low-Medium | Marginal | **KEEP** — borderline, but team framing matters for examples |
| `format_notes` | Very Low | Low | Low | **KEEP** as escape hatch |

### Fields that EARN their place despite low fill rate

- `known_misconceptions` — Very low fill rate but transformatively high impact when present. A pre-emptive misconception correction is the highest-value personalization move possible.
- `real_projects` — Low fill rate but when filled, produces the strongest personalization ("In your Shipment Exception Agent, this pattern would..."). Worth the schema weight.
- `constraints` — Low fill rate but prevents harmful recommendations. Without it, the engine might suggest cloud tools to someone with no cloud access.

---

## 6. Structural Recommendations

### 6.1 — Standardize enum scales

All expertise levels should use: `none | beginner | intermediate | advanced | expert`

Remove the `conceptual` anomaly in `ai_ml.level`. If the theoretical/applied distinction matters, add it as a separate dimension:
```json
"ai_ml": {
  "level": "beginner",
  "knowledge_type": "theoretical | applied | both"
}
```

### 6.2 — Add an Accessibility section

```json
{
  "accessibility": {
    "screen_reader": false,
    "cognitive_load_preference": "standard | reduced",
    "color_blind_safe": false,
    "dyslexia_friendly": false,
    "notes": "string | null"
  }
}
```

This consolidates `include_visual_descriptions`, `visual_description_notes`, and the missing accessibility fields into one coherent section.

### 6.3 — Add `last_updated` to Identity

```json
{
  "learner_id": "uuid",
  "name": "string | null",
  "profile_created": "ISO-8601",
  "last_updated": "ISO-8601",
  "profile_version": "1.0"
}
```

### 6.4 — Document cross-field dependencies

Create a "Field Resolution Rules" section that centralizes:
- `analogy_domain` falls back to `professional_context.industry`
- `include_code_samples` should be conditional on `programming.level`
- `code_verbosity` is only relevant when `include_code_samples: true`
- `visual_description_notes` only relevant when `include_visual_descriptions: true`

### 6.5 — Add `language_proficiency` to Delivery

```json
"delivery": {
  "language": "English",
  "language_proficiency": "native | fluent | intermediate | basic"
}
```

This separates "what language" from "how well do they know that language" — critical for non-native speakers.

### 6.6 — Domain should support multiple domains

Change `domain` from a single object to an array:
```json
"domain": [
  { "level": "expert", "domain_name": "cardiology", "is_primary": true },
  { "level": "intermediate", "domain_name": "health informatics" }
]
```

The current single-domain model breaks for multi-domain experts (common in the target audience of "domain experts learning AI").

---

## 7. Summary of Verdicts

| Action | Count | Fields |
|---|---|---|
| **KEEP as-is** | 24 | Most fields earn their place |
| **MODIFY** | 8 | `ai_ml.level` enum, notes fields, `real_projects.relevance`, `urgency_context`, `code_verbosity` dependency, `domain` to array, `include_code_samples` default, `expertise.*.level` default |
| **REMOVE** | 3 | `topics_to_skip`, `real_projects.relevance`, `visual_description_notes` |
| **ADD** | 7 | `last_updated`, `accessibility` section (4 fields), `language_proficiency`, `learning_pace_preference` |

**Net field count change:** +4 (remove 3, add 7)

The schema is solid architecture. These changes tighten it, plug real gaps, and fix the one default (`include_code_samples: true`) that can actively harm the learning experience.
