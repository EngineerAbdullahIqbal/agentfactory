# Chapter 16: The Knowledge Extraction Method — Production Spec

**Status:** Phase 4 — Implementation (Team Orchestration)
**Part:** 3 (Domain Agent Workflows)
**Preceding Chapter:** 15 — The Enterprise Agent Blueprint
**Following Chapter:** 17 — Finance Domain Agents
**Target Path:** `apps/learn-app/docs/03-Domain-Agent-Workflows/16-the-knowledge-extraction-method/`
**Governing Artifact:** Provided by user — full chapter prose (~8,000 words)

---

## 1. Chapter Thesis (One Sentence)

The Knowledge Extraction Method is a structured process for surfacing tacit professional knowledge — from expert heads (Method A) and institutional documents (Method B) — and translating it into production-ready SKILL.md files validated through scenario testing and shadow mode deployment.

---

## 2. Entry Requirements (What Reader Must Know BEFORE)

All concepts come from Chapter 15:

| Concept | Source |
|---------|--------|
| What a Cowork plugin is and its three components | Ch15 L01 |
| The Agent Skills Pattern (Persona, Questions, Principles) | Ch15 L02 |
| config.yaml and connector scripts (IT-owned layers) | Ch15 L03 |
| Three-level context system and diagnostic sequence | Ch15 L04 |
| Production-ready vs amateur SKILL.md (quality signals) | Ch15 L05 |
| MCP connector ecosystem | Ch15 L06 |
| Four governance mechanisms (permissions, audit, shadow mode, HITL) | Ch15 L07 |
| Three-way ownership model | Ch15 L08 |
| Shadow mode protocol (30 days / 95% threshold) | Ch15 L07, L10 |

**Critical note:** Chapter 15 taught WHAT a SKILL.md is and what it contains. Chapter 16 teaches HOW to extract the knowledge that goes into one. Students understand the architecture but have not yet attempted to author a SKILL.md.

---

## 3. Exit Competencies (What Reader Must Know AFTER)

After Chapter 16, the reader must be able to:

1. **Conduct** a Method A expert interview using the five-question framework to surface tacit professional knowledge
2. **Execute** a Method B three-pass document extraction (explicit rules, contradiction mapping, gap identification) on a policy corpus
3. **Choose** and combine Methods A and B based on whether knowledge lives in people, documents, or both
4. **Translate** extraction outputs into a SKILL.md with properly written Persona, Questions, and Principles sections
5. **Build** a validation scenario set with the four-category distribution (standard 50%, edge 25%, adversarial 15%, high-stakes 10%)
6. **Run** the Validation Loop — score outputs, interpret failure patterns, do targeted rewrites, and know when to enter shadow mode

**These competencies are applied in every domain chapter that follows** (Finance, Legal, HR, Healthcare, Architecture, Sales, Operations). Each domain chapter applies this methodology to a specific professional context.

---

## 4. Lesson Sequence

### L01: The Problem That No Platform Solves (~20 min)
**Governing artifact section:** Opening + "The Problem That No Platform Solves"
**Thesis:** The knowledge that makes a domain agent genuinely useful is tacit — it resists articulation — and no platform, model improvement, or prompt engineering technique solves this without a structured extraction methodology.
**New concepts:** 3 (tacit vs explicit knowledge, the articulation gap, the Knowledge Extraction Method as a solution)
**Bloom's peak:** Understand (A2)
**Running example:** Credit analyst — introduce the gap between what she does (reads financials) and what makes her valuable (pattern recognition in the gap between what financials say and what they imply)

### L02: The Five Questions — Expert Interview Framework (~30 min)
**Governing artifact section:** "Method A: The Expert Interview Framework" — the five questions
**Thesis:** Five questions, asked in order, reliably surface the three kinds of tacit knowledge a SKILL.md needs: decision-making logic, exceptions and edge cases, and escalation conditions.
**New concepts:** 5 (the five interview questions as a framework, each with specific purpose)
**Bloom's peak:** Apply (B1) — reader can use the questions in their own domain
**Running example:** Credit analyst answers to each question

### L03: Conducting the Expert Interview (~20 min)
**Governing artifact section:** "Conducting the Interview"
**Thesis:** The interview is a structured conversation, not a form — and the north star summary written immediately after is the anchor for the first SKILL.md draft.
**New concepts:** 3 (briefing protocol, note-taking approach, north star summary)
**Bloom's peak:** Apply (B1)

### L04: The Document Extraction Framework (~25 min)
**Governing artifact section:** "Method B: The Document Extraction Framework"
**Thesis:** Method B uses three passes — explicit rule extraction, contradiction mapping, gap identification — to convert institutional documents into SKILL.md instructions while surfacing the problems naive extraction misses.
**New concepts:** 4 (three-pass framework, temporal/jurisdictional/interpretive contradictions, gap identification)
**Bloom's peak:** Apply (B1)

### L05: Choosing and Combining Methods (~15 min)
**Governing artifact section:** "Choosing Between Methods"
**Thesis:** Finance and sales are primarily Method A; HR and operations are primarily Method B; legal, healthcare, and architecture require both — and the reconciliation principle determines which takes precedence when they conflict.
**New concepts:** 2 (domain-method mapping, reconciliation principle)
**Bloom's peak:** Apply (B1)

### L06: From Extraction to SKILL.md (~25 min)
**Governing artifact section:** "From Extraction to SKILL.md"
**Thesis:** The extraction output is raw material; translating it into a SKILL.md requires writing a Persona that answers three precise questions, a Questions section with equal precision on scope and out-of-scope, and Principles that are specific and testable — not vague.
**New concepts:** 3 (Persona's three questions, capability + out-of-scope as equal, testable principles vs vague instructions)
**Bloom's peak:** Apply (B1)

### L07: Building the Validation Scenario Set (~25 min)
**Governing artifact section:** "The Validation Loop" — Building the Scenario Set + Scoring the Output
**Thesis:** A scenario set with four categories (standard, edge, adversarial, high-stakes) at defined proportions, scored on accuracy, calibration, and boundary compliance, is what separates a first draft from a production-ready SKILL.md.
**New concepts:** 4 (four scenario categories with proportions, three scoring components, 95% threshold, minimum 20 scenarios)
**Bloom's peak:** Apply (B1)
**Note:** exercise-designer provides concrete scenario examples for the credit analyst domain

### L08: The Validation Loop — From Draft to Production (~25 min)
**Governing artifact section:** "The Validation Loop" — Interpreting Failure Patterns + Shadow Mode
**Thesis:** Failure patterns cluster by SKILL.md section; targeted rewriting resolves clusters without regression; shadow mode validates against real production inputs that scenario testing cannot anticipate; transition to autonomy is graduated, not binary.
**New concepts:** 4 (failure pattern interpretation, targeted rewriting, shadow mode entry criteria, graduated autonomy)
**Bloom's peak:** Analyse (B1)

### L09: Hands-On Exercise — First Extraction and SKILL.md Draft (~150 min doing)
**Governing artifact section:** "Hands-On Exercise"
**Thesis:** The gap between your first draft and your revised draft — how much more specific you had to become — is a direct measure of how much tacit knowledge your first draft was relying on.
**New concepts:** 0 (application of all prior lessons)
**Bloom's peak:** Create (B2)
**Note:** exercise-designer designs the full 2.5-hour exercise with deliverable SKILL.md artifact

### L10: Chapter Summary (~15 min)
**Governing artifact section:** "Chapter Summary"
**Thesis:** Synthesis — the reader can trace the full methodology from problem identification through extraction (A and B), SKILL.md writing, validation, and shadow mode deployment.
**New concepts:** 0 (synthesis only)
**Bloom's peak:** Understand (B1)

### Quiz: Chapter Quiz (~50 min)
**Format:** 50 scenario-based questions using the `<Quiz>` component
**Coverage:** All 10 lessons, weighted by concept density

---

## 5. Quality Standards

Match Chapter 15 exactly. See `specs/chapter-15-enterprise-agent-blueprint/spec.md` Section 5 for full requirements.

Key non-negotiables:
- Full YAML frontmatter on every lesson
- British English throughout
- No bullet lists in narrative prose (tables acceptable)
- 3 "Try With AI" prompts per lesson with "What you're learning" explanations
- `<Flashcards />` component at lesson end
- Credit analyst as running example throughout
- No forward references to Chapter 17+ content
- Every abstraction grounded in concrete example within 200 words

---

## 6. Wave Structure

### WAVE 1 — No Dependencies (parallel)
| Task | Lesson | Agent |
|------|--------|-------|
| T1 | L01: The Problem That No Platform Solves | content-writer |
| T2 | L02: The Five Questions | content-writer |
| T3 | L04: Document Extraction Framework | content-writer |
| T4 | Scenario set design + exercise design | exercise-designer |

### WAVE 2 — Depends on Wave 1
| Task | Lesson | Blocked By |
|------|--------|------------|
| T5 | L03: Conducting the Expert Interview | T2 |
| T6 | L05: Choosing and Combining Methods | T2, T3 |
| T7 | L06: From Extraction to SKILL.md | T2, T3 |

### WAVE 3 — Depends on Waves 1+2
| Task | Lesson | Blocked By |
|------|--------|------------|
| T8 | L07: Validation Scenario Set | T7, T4 (needs exercise-designer scenarios) |
| T9 | L08: The Validation Loop | T8 |
| T10 | L09: Hands-On Exercise | T4 (exercise-designer design), T7 |

### WAVE 4 — Closure
| Task | Lesson | Blocked By |
|------|--------|------------|
| T11 | L10: Chapter Summary | T1-T10 |
| T12 | README.md | T1-T10 |
| T13 | Chapter Quiz (50 questions) | T1-T10 |

### WAVE 5 — Review + Post-Production
| Task | Deliverable | Blocked By |
|------|-------------|------------|
| T14 | Continuity review | T1-T13 |
| T15 | Quality gate review | T14 |
| T16 | Summaries (x10) | T15 |
| T17 | Flashcards (x10) | T15 |

---

## 7. Running Example: The Credit Analyst

Throughout Chapter 16, use the same credit analyst introduced in the opening:
- **Who:** Senior credit analyst at a bank
- **Explicit knowledge:** Debt service coverage ratio, loan-to-value, sector exposure
- **Tacit knowledge:** Pattern recognition in the gap between what financials say and what they imply
- **Specific examples:** CEO who cannot answer working capital questions, sector being repriced by supply chain shift, covenant structured to matter in stress scenarios
- **This example threads through:** Method A (interview examples), Method B (policy extraction), SKILL.md writing (Persona/Questions/Principles), Validation (scenario design), Exercise (domain application)

---

## 8. Estimated Word Count

| Lesson | Est. Words |
|--------|-----------|
| L01 | 1,500 |
| L02 | 2,500 |
| L03 | 1,500 |
| L04 | 2,000 |
| L05 | 1,200 |
| L06 | 2,000 |
| L07 | 2,000 |
| L08 | 2,000 |
| L09 | 2,000 |
| L10 | 1,000 |
| **Total prose** | **~17,700** |

Plus README (~800 words) and Quiz (~8,000 words with explanations) = **~26,500 words total**.
