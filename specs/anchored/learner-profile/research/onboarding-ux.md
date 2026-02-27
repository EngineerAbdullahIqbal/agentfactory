# Onboarding UX Research: Form vs Chat vs Hybrid

**Author:** Product Designer (Phase 1 Research)
**Date:** 2026-02-26
**Status:** Complete — awaiting user decision on approach

---

## Executive Summary

The learner profile schema contains 6 sections and ~35 discrete fields. Asking all of them upfront is a non-starter — research shows abandonment spikes sharply after 7 fields, and our three personas (Fatima, Raj, Marcus) have radically different patience thresholds. This document presents three onboarding approaches with honest trade-offs, a phase ordering recommendation, skip behavior design, a progressive profiling plan, and persona walkthroughs.

**Key finding:** Only 8-12 fields need to be asked upfront. The rest should be inferred from behavior, skipped with conservative defaults, or collected progressively after the learner has received value.

---

## 1. Options Comparison

### Option A: Stepped Form (5-Phase Wizard)

**How it works:** A multi-step wizard, one step per schema section. Each step shows 3-5 fields with clear labels, dropdowns, and selects. A "Skip this section" button applies Appendix B defaults for the entire section. Progress bar shows completion.

**Strengths:**
- Predictable UX — users know what to expect and how much remains
- High data quality — structured inputs map directly to schema fields
- Fast to implement — standard form components, no AI extraction needed
- Accessible — works with screen readers, keyboard navigation, no AI dependency
- Users maintain control over exactly what they provide

**Weaknesses:**
- Feels like a tax before getting value — especially for impatient users like Raj
- 5 steps is at the upper limit of user patience (research shows 3-4 steps optimal)
- Some fields are awkward as form inputs (e.g., `known_misconceptions`, `notes` fields)
- Doesn't adapt — asks the same questions regardless of who's answering
- Section 2 (Expertise Profile) alone has 4 sub-levels + open text — too dense for one step

**Estimated metrics:**
| Metric | Estimate |
|---|---|
| Completion time | 5-8 minutes |
| Abandonment rate | 35-50% (spikes at step 3-4) |
| Data quality | High for completed fields, zero for skipped sections |
| Implementation effort | Low (2-3 weeks) |

---

### Option B: Conversational Chat

**How it works:** An AI-driven conversation that feels like talking to a tutor. The AI asks natural questions ("What brings you to Agent Factory?"), extracts profile fields from the response, asks clarifying follow-ups, and fills the schema behind the scenes. The learner never sees the schema.

**Strengths:**
- Feels natural and low-friction — especially for non-technical users like Fatima
- Can adapt questions based on earlier answers (if you say "I'm a CS student," skip business questions)
- Open-ended responses capture richer context than dropdowns ever could
- Demonstrates the platform's AI capability — onboarding IS the product demo
- Can extract multiple schema fields from a single answer

**Weaknesses:**
- **Extraction accuracy is the critical risk** — mapping "I kinda know Python" to `programming.level: beginner` is non-trivial. Mis-extractions silently corrupt the profile with no user verification
- Unpredictable completion time — chatty users take 15+ minutes; terse users under-specify
- Users can't see what data was captured or correct it easily
- Implementation is significantly more complex (prompt engineering, extraction validation, edge cases)
- Some users find chat onboarding tedious — "just give me the form" (especially Raj)
- No progress indicator — user doesn't know when they're "done"
- AI hallucination risk — the extraction model might infer fields the user never stated

**Estimated metrics:**
| Metric | Estimate |
|---|---|
| Completion time | 3-15 minutes (high variance) |
| Abandonment rate | 25-40% (lower start, but frustration builds if conversation drags) |
| Data quality | Medium — rich for open fields, risky for structured fields |
| Implementation effort | High (5-8 weeks, plus ongoing prompt maintenance) |

---

### Option C: Hybrid (Form + AI Follow-up)

**How it works:** Structured form for fields with clear answer spaces (dropdowns for levels, selects for preferences). After the form, an optional AI conversation enriches open-ended fields: "You mentioned you're in logistics — tell me about a project you'd like to apply this to." The form captures the skeleton; the AI adds flesh.

**Strengths:**
- Best of both worlds — structured data is clean, open-ended data is rich
- Form part is fast (2-3 minutes) because it only asks dropdown/select fields
- AI conversation is optional — skip it and defaults apply
- Users see exactly what structured data they provided (transparency)
- AI conversation is scoped and shorter (3-5 targeted questions, not open-ended)
- Progressive — the AI follow-up can happen AFTER first lesson, not blocking onboarding

**Weaknesses:**
- Two-mode UX can feel disjointed if transition is awkward
- Still requires AI extraction engineering (though scoped to fewer fields)
- "Optional" AI follow-up may be ignored by most users (typical opt-in engagement: 20-30%)
- More complex to design well than pure form — must decide field-by-field which mode handles it
- Testing surface area is larger (form + AI + transitions)

**Estimated metrics:**
| Metric | Estimate |
|---|---|
| Completion time | 2-4 min (form) + 0-5 min (optional AI) |
| Abandonment rate | 20-30% (form is short; AI is optional) |
| Data quality | High for structured, variable for enriched |
| Implementation effort | Medium (3-5 weeks) |

---

### Options Comparison Table

| Dimension | A: Stepped Form | B: Conversational Chat | C: Hybrid |
|---|---|---|---|
| **Completion time** | 5-8 min | 3-15 min (high variance) | 2-4 min core + 0-5 min optional |
| **Abandonment risk** | 35-50% | 25-40% | 20-30% |
| **Data quality** | High (structured) | Medium (extraction risk) | High structured + variable enriched |
| **Implementation effort** | Low (2-3 weeks) | High (5-8 weeks) | Medium (3-5 weeks) |
| **Adaptiveness** | None — same for all | High — adapts per response | Medium — AI part adapts |
| **User control** | Full visibility | Low — opaque extraction | High — form visible, AI transparent |
| **Schema coverage** | All fields if patient | Depends on conversation | Core fields guaranteed + enrichment |
| **Maintenance burden** | Low | High (prompt drift, extraction QA) | Medium |
| **Accessibility** | Excellent | Moderate (chat UI challenges) | Good (form) + Moderate (chat) |

---

## 2. Phase Ordering Research

### Option: Goals-First ("What do you want to achieve?")

Start with Section 4 (Goals and Motivation), then Section 2 (Expertise), then the rest.

**Rationale:**
- Opening with goals creates immediate emotional investment — "I want to build an AI agent for my business" is motivating
- Establishes relevance before asking diagnostic questions
- Research shows goal-oriented onboarding produces 30% higher engagement
- Allows the system to frame subsequent questions: "To help you build that agent, we need to understand your background"

**Risk:** If goals are vague (Marcus: "I want to learn about AI agents"), the platform has less to anchor on.

### Option: Expertise-First ("What do you already know?")

Start with Section 2 (Expertise Profile), then Section 4 (Goals), then the rest.

**Rationale:**
- Enables immediate personalization of the FIRST content the learner sees
- Diagnostic data is more objectively measurable than goals
- Prevents the "I want to build production agents" goal from someone who doesn't know what a variable is

**Risk:** Feels like a test — "rate your programming level" can trigger imposter syndrome, especially for Fatima and Marcus.

### Recommendation: Goals-First, with Expertise as Step 2

**Proposed ordering:**
1. **Goals** (Section 4): "What do you want to build/achieve?" + urgency
2. **Expertise** (Section 2): Core levels only (4 dropdowns: domain, programming, AI/ML, business)
3. **Professional Context** (Section 3): Role + industry + tools (3 fields)
4. **Communication Preferences** (Section 5): Can be entirely defaulted and inferred — skip in onboarding
5. **Delivery Preferences** (Section 6): Can be entirely defaulted and inferred — skip in onboarding

**Why this order:**
- Goals create motivation and context for answering subsequent questions
- Expertise levels are quick dropdowns that feel diagnostic rather than invasive
- Professional context enriches personalization examples
- Communication and delivery preferences are best INFERRED from behavior (see Progressive Profiling below)

---

## 3. Skip Behavior Design

### Principles

1. **Every section is skippable** — no forced fields except `learner_id` (auto-generated) and `name` (optional but encouraged)
2. **"Skip for now"** — not "Skip." The "for now" signals the system will ask again later. De-emphasized as secondary action (text link, not button)
3. **Skipping applies Appendix B defaults** — the system NEVER operates on empty data; it operates on conservative defaults
4. **Skipped sections are surfaced contextually, not on a schedule** — the system re-asks when it has a reason to

### Skip Resurfacing Strategy

| Trigger | What gets resurfaced | How |
|---|---|---|
| After first personalized lesson | "Was this lesson the right level for you?" → leads to expertise calibration | In-lesson feedback widget |
| After 3 lessons completed | Communication preferences: "Do you prefer more examples or more theory?" | Quick 2-option prompt |
| When learner starts a project | Professional context: "Tell us about your project so we can customize examples" | Project creation form |
| After quiz/assessment | `topics_already_mastered` and `topics_partially_known` auto-populated | Automatic — no user action needed |
| Manually anytime | "Edit your profile" link in settings | Full profile editor |

### Skip UX Mockup (conceptual)

```
+------------------------------------------+
|  Step 2 of 3: Your Background            |
|                                           |
|  Programming experience:  [Dropdown v]    |
|  AI/ML familiarity:       [Dropdown v]    |
|  Domain expertise:        [Dropdown v]    |
|  Business experience:     [Dropdown v]    |
|                                           |
|  [Continue ->]     Skip for now           |
|                                           |
|  Progress: =======>------  67%            |
+------------------------------------------+
```

---

## 4. Progressive Profiling Plan

### Which Fields MUST Be Asked vs CAN Be Inferred

| Field | Ask or Infer? | Signal for Inference | Priority |
|---|---|---|---|
| `goals.primary_learning_goal` | **ASK** | Cannot be inferred — fundamental to personalization | Critical |
| `goals.urgency` | **ASK** | Cannot be reliably inferred | High |
| `expertise.programming.level` | **ASK** | Could infer from code exercise performance, but dangerous to get wrong early | Critical |
| `expertise.ai_ml.level` | **ASK** | Same — too important to guess | Critical |
| `expertise.domain.level` | **ASK** | Industry vocabulary in written responses | High |
| `expertise.business.level` | **ASK** | Could infer but low-cost to ask | Medium |
| `professional_context.current_role` | **ASK** | LinkedIn import or chat extraction | High |
| `professional_context.industry` | **ASK** | Directly from role if provided | High |
| `professional_context.tools_in_use` | **INFER** | From role + industry; confirm later | Low |
| `professional_context.real_projects` | **INFER/ASK LATER** | Ask when relevant (project creation flow) | Deferred |
| `professional_context.team_context` | **INFER** | From organization_type | Low |
| `professional_context.organization_type` | **ASK** | Simple dropdown, low friction | Medium |
| `communication.language_complexity` | **INFER** | From expertise levels — none/beginner → plain; advanced/expert → technical | Automatic |
| `communication.preferred_structure` | **INFER** | Track which lesson formats get highest engagement | After 3 lessons |
| `communication.verbosity` | **INFER** | Track lesson completion rates by length | After 5 lessons |
| `communication.tone` | **INFER** | From language_complexity and role | Automatic |
| `communication.analogy_domain` | **INFER** | From `professional_context.industry` (Appendix B already does this) | Automatic |
| `communication.wants_summaries` | **DEFAULT TRUE** | Opt-out in settings | N/A |
| `communication.wants_check_in_questions` | **DEFAULT TRUE** | Opt-out in settings | N/A |
| `delivery.output_format` | **DEFAULT** | `structured-with-headers` — most universally effective | N/A |
| `delivery.target_length` | **DEFAULT** | `match-source` per Appendix B | N/A |
| `delivery.include_code_samples` | **INFER** | `programming.level == none` → false; otherwise true | Automatic |
| `delivery.code_verbosity` | **INFER** | From `programming.level` — none→N/A, beginner→fully-explained, intermediate→annotated, advanced/expert→minimal | Automatic |
| `delivery.language` | **ASK** (if non-English audience) | Browser locale as default | Low |
| `expertise.subject_specific.*` | **INFER** | From quiz performance, lesson completion, skipped content | Over time |
| `goals.career_goal` | **ASK LATER** | After learner has context on what's possible | Deferred |
| `goals.immediate_application` | **ASK LATER** | When starting a specific lesson or project | Deferred |

### Summary: Minimum Viable Profile (MVP)

**Must-ask at onboarding (8 fields):**
1. `name` (optional but encouraged)
2. `goals.primary_learning_goal` (open text)
3. `goals.urgency` (3-option select)
4. `expertise.programming.level` (5-option dropdown)
5. `expertise.ai_ml.level` (5-option dropdown)
6. `expertise.domain.level` + `domain_name` (dropdown + text)
7. `expertise.business.level` (5-option dropdown)
8. `professional_context.current_role` (text input)

**Strongly recommended (ask in step 2-3, skippable):**
- `professional_context.industry` (dropdown)
- `professional_context.organization_type` (dropdown)
- `goals.career_goal` (open text)

**Everything else:** Infer from the above, default per Appendix B, or collect progressively.

---

## 5. Persona Walkthroughs

### Fatima (Career-Switching Business Analyst)
**Profile:** Non-technical, goal-driven, high urgency, professional communication

**Goals-first onboarding flow:**

**Step 1 — Goals (45 seconds)**
> "What do you want to achieve with Agent Factory?"

Fatima types: "I want to design an AI agent product and write the spec for it. I'm a senior business analyst transitioning into AI product management."

> "How urgent is this for you?"

Fatima selects: "High — I have a deadline or immediate need"

**Step 2 — Background (60 seconds)**
- Programming: `none` (she sees this is okay — "No code needed for your goal!")
- AI/ML: `conceptual`
- Domain: `advanced` — "logistics operations"
- Business: `advanced`

**Step 3 — Professional Context (45 seconds)**
- Role: "Senior Business Analyst"
- Industry: "Logistics"
- Organization: "Enterprise"

**Done. Total: ~2.5 minutes.**

**What the system infers:**
- `communication.language_complexity` → `professional` (from business:advanced + programming:none)
- `delivery.include_code_samples` → `false` (programming:none)
- `communication.analogy_domain` → "logistics" (from industry)
- `communication.tone` → `professional`

**What gets asked later:**
- After Lesson 1: "Was this the right level? Too basic? Too advanced?"
- When she creates her Shipment Exception Agent project: "Tell us about this project so we can customize examples"

**Fatima's experience:** Fast, professional, respects her time. She's building an agent within 5 minutes of signing up.

---

### Raj (Experienced Full-Stack Developer)
**Profile:** Technical, knows what he wants, low patience for forms

**Goals-first onboarding flow:**

**Step 1 — Goals (30 seconds)**
> "What do you want to achieve?"

Raj types: "Build production-grade AI agents and sell them as SaaS"

> Urgency?

Raj selects: "Medium"

**Step 2 — Background (30 seconds)**
Raj fills in dropdowns instantly — he knows exactly what he is:
- Programming: `advanced`
- AI/ML: `intermediate`
- Domain: `intermediate` — "SaaS product development"
- Business: `intermediate`

**Step 3 — Professional Context (20 seconds)**
- Role: "Senior Full-Stack Developer"
- Industry: "B2B SaaS"
- Organization: "Enterprise"

**Done. Total: ~1.5 minutes.**

**What the system infers:**
- `communication.language_complexity` → `technical`
- `delivery.code_verbosity` → `minimal`
- `communication.tone` → `peer-to-peer`
- `communication.preferred_structure` → default `examples-first`, adjusted after tracking engagement

**Raj's experience:** Fast. No fluff. He'd have been annoyed by a chatbot ("Just let me fill in the form"). Sees his first lesson within 2 minutes.

---

### Marcus (First-Year CS Student)
**Profile:** Student, uncertain goals, needs guidance, conversational preference

**Goals-first onboarding flow:**

**Step 1 — Goals (60 seconds)**
> "What do you want to achieve?"

Marcus types: "Understand what AI agents are and build a basic one"

> Urgency?

Marcus selects: "Medium — course requirement"

**Step 2 — Background (45 seconds)**
- Programming: `beginner`
- AI/ML: `none` (system shows encouraging message: "Perfect starting point!")
- Domain: (skips — not applicable)
- Business: `none`

**Step 3 — Professional Context (20 seconds)**
- Role: "CS student"
- Industry: (skips)
- Organization: "University"

**Done. Total: ~2 minutes.**

**What the system infers:**
- `communication.language_complexity` → `plain` (programming:beginner + ai_ml:none)
- `delivery.code_verbosity` → `fully-explained`
- `communication.tone` → `conversational`
- `communication.verbosity` → `detailed` (beginner level → more explanation)

**Marcus's experience:** Quick, encouraging, non-intimidating. The system adapts heavily based on his beginner levels. He doesn't need to specify communication preferences — the defaults for his level are exactly right.

---

## 6. UX Flags on Schema Complexity

As Product Designer, I want to flag the following fields as **too complex for any reasonable onboarding UX**. These should NEVER appear in onboarding:

| Field | Problem | Recommendation |
|---|---|---|
| `expertise.subject_specific.topics_already_mastered` | Requires knowledge of the curriculum to answer meaningfully | Infer from quiz performance over time |
| `expertise.subject_specific.topics_partially_known` | Even more granular — needs topic + knowledge_state | Infer from lesson engagement patterns |
| `expertise.subject_specific.known_misconceptions` | Users don't know their own misconceptions | Detect through assessment, never ask directly |
| `expertise.subject_specific.topics_to_skip` | Same as mastered — requires curriculum knowledge | Auto-populate from mastered topics |
| `professional_context.real_projects` | Complex nested object (name + description + relevance) | Ask later in project creation flow |
| `communication.format_notes` | Too meta — users don't know their format preferences | Infer from engagement; offer in advanced settings |
| `delivery.visual_description_notes` | Extremely niche — accessibility setting, not onboarding | Settings page only |

**These 7 fields should be explicitly excluded from onboarding scope and handled through progressive profiling or advanced settings.**

---

## 7. Implementation Recommendation

**I am NOT making the choice — the user should decide.** But here is how I'd frame the decision:

- **If speed-to-market matters most:** Option A (Stepped Form) — ship in 2-3 weeks, iterate based on data
- **If UX differentiation matters most:** Option C (Hybrid) — the AI follow-up demonstrates platform capability
- **If you want to validate the AI extraction approach:** Option B (Conversational) — but budget 5-8 weeks and accept higher risk

For an educational platform teaching AI agent building, Option C has a strategic advantage: the onboarding itself becomes a demonstration of what AI agents can do. But Option A is a perfectly valid MVP that gets learners to content faster.

---

## Sources

- [UserGuiding: 100+ User Onboarding Statistics 2026](https://userguiding.com/blog/user-onboarding-statistics)
- [Formbricks: 7 User Onboarding Best Practices 2026](https://formbricks.com/blog/user-onboarding-best-practices)
- [Userpilot: AI User Onboarding](https://userpilot.com/blog/ai-user-onboarding/)
- [Appcues: Goal-Oriented User Onboarding](https://www.appcues.com/blog/designing-goal-oriented-user-onboarding)
- [Descope: Progressive Profiling 101](https://www.descope.com/learn/post/progressive-profiling)
- [UserGuiding: Progressive Profiling](https://userguiding.com/blog/progressive-profiling)
- [RubyRoid Labs: Onboarding UX in First 60 Seconds](https://rubyroidlabs.com/blog/2026/02/ux-onboarding-first-60-seconds/)
- [Whatfix: AI in User Onboarding](https://whatfix.com/blog/ai-user-onboarding/)
- [DesignerUp: 200+ Onboarding Flows Study](https://designerup.co/blog/i-studied-the-ux-ui-of-over-200-onboarding-flows-heres-everything-i-learned/)
- [Dock: AI for Customer Onboarding](https://www.dock.us/library/ai-for-customer-onboarding)
