# Chapter 15: The Enterprise Agent Blueprint — Production Spec

**Status:** Phase 1 — Pedagogical Architecture
**Part:** 3 (Domain Agent Workflows)
**Preceding Chapter:** 14 — The Enterprise Agentic Landscape
**Following Chapter:** 16 — The Knowledge Extraction Method
**Target Path:** `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/`
**Governing Artifact:** Provided by user — full chapter prose (~8,500 words)

---

## 1. Chapter Thesis (One Sentence)

A Cowork plugin has three components with three owners, and understanding the architecture — SKILL.md, config.yaml, connectors — plus the governance layer is the prerequisite for everything in Part 3.

---

## 2. Entry Requirements (What Reader Must Know BEFORE)

All concepts come from Chapter 14:

| Concept | Source |
|---------|--------|
| The Pilot Trap and why enterprise AI stalled | Ch14 L01 |
| The knowledge transfer gap (domain experts vs system builders) | Ch14 L01 |
| What changed in 2026 (platform maturity, governance layers) | Ch14 L02 |
| Knowledge worker as the central figure | Ch14 L03 |
| Cowork vs Frontier — architecture, deployment model, target buyer | Ch14 L04 |
| SKILL.md, config.yaml, MCP connectors (first introduction — high-level only) | Ch14 L04 |
| The four monetisation models | Ch14 L05 |
| Organisational AI Maturity Model | Ch14 L06 |
| The seven professional domains | Ch14 L07 |

**Critical note:** Chapter 14 L04 introduces SKILL.md, config.yaml, and MCP connectors at a surface level (as part of the Cowork architecture). Chapter 15 goes DEEP on all three. Students have heard the terms but do not yet understand the internal structure.

---

## 3. Exit Competencies (What Reader Must Know AFTER)

After Chapter 15, the reader must be able to:

1. **Define** what a Cowork plugin is and name its three components
2. **Describe** the Agent Skills Pattern (Persona, Questions, Principles) and explain the function of each section
3. **Read** a config.yaml and identify the plugin's permission scope and connector access
4. **Explain** what connector scripts do at a conceptual level and identify the failure mode (stale/unavailable data)
5. **Describe** the three-level context hierarchy (platform → organisation → plugin) and the override rules
6. **Diagnose** why a SKILL.md instruction might not be honoured (higher-level override)
7. **Identify** which production MCP connectors exist for their domain
8. **Explain** the four governance mechanisms (permissions, audit trails, shadow mode, HITL gates)
9. **State** the shadow mode protocol (30 days / 95% accuracy threshold)
10. **Map** the three-way ownership model (knowledge worker → SKILL.md, IT → connectors, admin → governance)
11. **Distinguish** between vertical skill packs and connector packages in the marketplace

**These competencies are prerequisites for Chapter 16** (The Knowledge Extraction Method), which teaches HOW to write a SKILL.md. Chapter 15 teaches WHAT a SKILL.md is and what it contains.

---

## 4. Lesson Sequence

### L01: What a Plugin Actually Is (~20 min)
**Governing artifact section:** "What a Plugin Actually Is"
**Thesis:** A Cowork plugin is a domain-specific agent with a defined identity, explicit instructions, data connections, a governance framework, and a performance record — and every aspect is inspectable.
**New concepts:** 3 (Cowork plugin definition, three-component model, transparency as architectural property)
**Bloom's peak:** Understand (A2)
**Key takeaway:** The reader can define a Cowork plugin and name its three components.

### L02: The Intelligence Layer — SKILL.md (~30 min)
**Governing artifact section:** "The Three Components → Component One: The SKILL.md"
**Thesis:** The SKILL.md is a plain-text file that encodes domain expertise through three sections: Persona (identity), Questions (scope), and Principles (operating logic).
**New concepts:** 4 (SKILL.md as intelligence layer, Persona, Questions, Principles)
**Bloom's peak:** Understand (A2)
**Key takeaway:** The reader can explain each section of the Agent Skills Pattern and why specificity matters.

### L03: The Configuration and Integration Layers (~25 min)
**Governing artifact section:** "The Three Components → Component Two: config.yaml" + "Component Three: Connector Scripts"
**Thesis:** The config.yaml configures the deployment environment (IT-owned), while connector scripts provide the data integration infrastructure — the knowledge worker understands both but authors neither.
**New concepts:** 4 (config.yaml structure, permission scope, MCP connector function, connector failure modes)
**Bloom's peak:** Apply (B1) — reader can read a config.yaml and identify permissions
**Key takeaway:** The reader can read a config.yaml, identify what connectors are attached, and explain what happens when a connector fails.

### L04: The Three-Level Context System (~20 min)
**Governing artifact section:** "The Three-Level Context System"
**Thesis:** Cowork's three-level context hierarchy (platform → organisation → plugin) explains why agents behave consistently and how to diagnose override behaviour.
**New concepts:** 3 (platform context, organisation context, plugin context as SKILL.md)
**Bloom's peak:** Apply (B1) — reader can diagnose why a SKILL.md instruction is not honoured
**Key takeaway:** Higher levels silently override lower levels; the diagnostic runs top-down.
**Dependency:** Requires L01-L03 (components must be defined first)

### L05: The Agent Skills Pattern in Practice (~30 min)
**Governing artifact section:** "Writing a SKILL.md: The Agent Skills Pattern in Practice"
**Thesis:** A production-ready SKILL.md is specific, opinionated, and honest about uncertainty — shown through an annotated financial research agent example.
**New concepts:** 3 (annotated SKILL.md walkthrough, source integrity as principle, uncertainty calibration language)
**Bloom's peak:** Analyse (B1) — reader can identify quality signals in a SKILL.md
**Key takeaway:** The reader can analyse a SKILL.md and identify what makes it production-ready vs amateur.
**Dependency:** Requires L02 (Agent Skills Pattern must be taught conceptually first)

### L06: The MCP Connector Ecosystem (~25 min)
**Governing artifact section:** "The MCP Connector Ecosystem"
**Thesis:** The MCP connector ecosystem provides production connectors for most enterprise integrations; custom connectors can be commissioned with a plain-language specification.
**New concepts:** 4 (production connector categories, connector scoping, custom connector commissioning, timeline expectations)
**Bloom's peak:** Apply (B1) — reader can identify which connectors serve their domain
**Key takeaway:** The reader knows which production connectors exist and the process for commissioning custom ones.

### L07: The Governance Layer (~30 min)
**Governing artifact section:** "The Governance Layer"
**Thesis:** Governance means four things: who can use it (permissions), what happens to outputs (audit trails), how trust is built (shadow mode), and what must stay human (HITL gates).
**New concepts:** 4 (IAM integration/permissions, immutable audit trails, shadow mode with 30d/95% threshold, HITL gates)
**Bloom's peak:** Apply (B1) — reader can describe what governance is configured for their plugin
**Key takeaway:** The reader can explain all four governance mechanisms and the shadow mode protocol.

### L08: The Division of Responsibility (~20 min)
**Governing artifact section:** "The Division of Responsibility"
**Thesis:** Clean ownership — knowledge worker owns SKILL.md, IT owns connectors, admin owns governance — is what prevents slow degradation and diagnostic confusion.
**New concepts:** 2 (three-way ownership model, layer independence principle)
**Bloom's peak:** Apply (B1) — reader can assign a problem to the correct owner
**Key takeaway:** The reader can map any plugin issue to the responsible owner using the ownership table.
**Dependency:** Requires L01-L07 (all components and governance must be taught first)

### L09: The Cowork Plugin Marketplace (~20 min)
**Governing artifact section:** "The Cowork Plugin Marketplace"
**Thesis:** The marketplace distributes generalisable domain expertise through vertical skill packs and connector packages — and publishing is a viable monetisation path.
**New concepts:** 3 (marketplace mechanism, vertical skill packs, connector packages)
**Bloom's peak:** Understand (A2) with Apply element (B1) — reader can assess whether their expertise is publishable
**Key takeaway:** The reader distinguishes skill packs from connector packages and understands the monetisation path.
**Dependency:** Requires L01-L08 (full architecture must be established)

### L10: Chapter Summary (~15 min)
**Governing artifact section:** "Chapter Summary"
**Thesis:** Synthesis — the reader can trace the full architecture from plugin definition through three components, context hierarchy, governance, ownership, and marketplace.
**New concepts:** 0 (synthesis only)
**Bloom's peak:** Understand (B1) — integration across all lessons
**Key takeaway:** The reader has the complete mental model Chapter 16 assumes.

### Quiz: Chapter Quiz (~50 min)
**Format:** 50 scenario-based questions using the `<Quiz>` component
**Coverage:** All 10 lessons, weighted by concept density
**Style:** Matches Chapter 14 quiz (scenario-based, 4 options, explanation + source citation)

---

## 5. Quality Standards

These are non-negotiable for every lesson file:

### Format Requirements
- Full YAML frontmatter: sidebar_position, title, description, keywords, chapter (15), lesson (N), duration_minutes, skills (CEFR/Bloom's/DigComp), learning_objectives, cognitive_load, differentiation, teaching_guide
- British English spelling throughout
- Opening epigraph/quote for L01 (chapter opener)
- Narrative opening (2-3 paragraphs before first section) for each lesson
- Three "Try With AI" prompts per lesson (each with "What you're learning" explanation)
- `<Flashcards />` component at lesson end
- No bullet-point lists inside narrative prose (tables are acceptable)
- No forward references to content not yet taught in this chapter
- Every abstraction grounded in a concrete example within 200 words
- Code examples must be syntactically valid YAML/Markdown

### Content Requirements
- Tone: authoritative, direct, no hedging — written for senior professionals
- No re-explanation of Chapter 14 concepts (reference, don't re-teach)
- All statistics/dates must be verifiable (or flagged as illustrative)
- "Continue to Lesson N →" footer on each lesson
- Ownership references consistent: knowledge worker = SKILL.md, IT = connectors, admin = governance

### Per-Lesson Deliverables
Each lesson produces:
1. `NN-slug.md` — the lesson file with full frontmatter and content
2. `NN-slug.summary.md` — lesson summary (generated via /summary-generator)
3. `NN-slug.flashcards.yaml` — flashcard deck (generated via /generate-flashcards)

### Chapter-Level Deliverables
1. `README.md` — chapter overview with lesson table, learning objectives, chapter contract
2. `11-chapter-quiz.md` — 50-question interactive quiz using `<Quiz>` component

---

## 6. Wave Structure (Parallelisation Plan)

### WAVE 1 — No Dependencies (4 parallel tasks)

| Task | Lesson | Content Source |
|------|--------|---------------|
| T1 | L01: What a Plugin Actually Is | Governing artifact §1 |
| T2 | L02: The Intelligence Layer — SKILL.md | Governing artifact §2.1 |
| T3 | L03: The Configuration and Integration Layers | Governing artifact §2.2 + §2.3 |
| T4 | L06: The MCP Connector Ecosystem | Governing artifact §5 |

**Rationale:** These four lessons define independent concepts. L01 defines the plugin. L02, L03 define the three components. L06 defines the connector ecosystem. None references the others internally.

### WAVE 2 — Depends on Wave 1 (3 parallel tasks)

| Task | Lesson | Blocked By |
|------|--------|------------|
| T5 | L04: The Three-Level Context System | T1, T2, T3 (needs components defined) |
| T6 | L05: The Agent Skills Pattern in Practice | T2 (needs SKILL.md concepts) |
| T7 | L07: The Governance Layer | T4 (needs connector ecosystem) |

**Rationale:** L04 builds on all three components. L05 extends the SKILL.md with a full example. L07 adds governance over the connector infrastructure.

### WAVE 3 — Depends on Waves 1+2 (2 parallel tasks)

| Task | Lesson | Blocked By |
|------|--------|------------|
| T8 | L08: The Division of Responsibility | T1-T7 (needs all components + governance) |
| T9 | L09: The Cowork Plugin Marketplace | T1-T7 (needs full architecture) |

**Rationale:** Both lessons synthesise concepts from all prior lessons. L08 assigns ownership. L09 describes distribution.

### WAVE 4 — Depends on Everything (4 tasks, partially parallel)

| Task | Lesson | Blocked By |
|------|--------|------------|
| T10 | L10: Chapter Summary | T1-T9 |
| T11 | README.md (chapter overview) | T1-T9 |
| T12 | Chapter Quiz (50 questions) | T1-T9 |
| T13 | Consistency Review | T1-T12 |

**Rationale:** Summary, README, and quiz can be written in parallel once all lessons exist. Consistency review is the final gate.

### WAVE 5 — Post-Production (parallel, after consistency fixes)

| Task | Deliverable | Per Lesson |
|------|-------------|------------|
| T14 | Summary files (×10) | `NN-slug.summary.md` via /summary-generator |
| T15 | Flashcard files (×10) | `NN-slug.flashcards.yaml` via /generate-flashcards |

---

## 7. Task Specifications

### T1: L01 — What a Plugin Actually Is

**Section:** Lesson 1
**Wave:** 1
**Blocked by:** None

**What to write:**
A lesson that defines a Cowork plugin precisely — not marketing, but architectural definition. Cover: defined identity, explicit instructions, data connections, governance framework, performance record, and the transparency property. Introduce the three-component model (SKILL.md, config.yaml, connectors) as the organising structure for the rest of the chapter. Approximate word count: 1,200-1,500 words of prose content (excluding frontmatter).

**Governing artifact source text:** "What a Plugin Actually Is" section (~500 words). Expand for lesson format: add narrative opening, "Try With AI" prompts, teaching context.

**Quality constraints:**
- Must define "Cowork plugin" in one clear sentence before expanding
- Must introduce the three components without going deep on any of them (that's L02-L03)
- Must establish transparency as an architectural property, not an incidental feature
- No bullet lists in prose — use tables for structured comparisons
- British English
- 3 "Try With AI" prompts with "What you're learning" explanations

**YAML frontmatter requirements:**
- chapter: 15, lesson: 1, sidebar_position: 1
- Skills: 2-3 skills at A1-A2 (Conceptual, Remember/Understand)
- Learning objectives: 2-3 at A1-A2
- Cognitive load: 3 new concepts
- teaching_guide with key_points, misconceptions, discussion_prompts, teaching_tips, assessment_checks

**Input context:**
- Read `CLAUDE.md` and `.claude/rules/content-pipeline.md` for format requirements
- Read `apps/learn-app/docs/03-Domain-Agent-Workflows/14-enterprise-agentic-landscape/01-the-year-that-did-not-deliver.md` as format reference
- Read governing artifact "What a Plugin Actually Is" section as source text
- Read Chapter 14 L04 (`04-two-platforms-one-paradigm.md`) lines covering SKILL.md/config.yaml/connectors to avoid re-explanation

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/01-what-a-plugin-actually-is.md`
- Format: Markdown with full YAML frontmatter
- Length: ~1,200-1,500 words (prose content)

---

### T2: L02 — The Intelligence Layer — SKILL.md

**Section:** Lesson 2
**Wave:** 1
**Blocked by:** None

**What to write:**
A lesson covering the SKILL.md as the intelligence layer of a Cowork plugin. Teach the Agent Skills Pattern in full: Persona (identity, authority, tone, relationship to user), Questions (scope, in-scope tasks, out-of-scope handling), and Principles (operating logic, constraints, escalation thresholds, quality standards). Use the governing artifact's domain examples (financial agent, legal agent, healthcare agent, architecture agent) to ground each section. Approximate word count: 2,000-2,500 words.

**Governing artifact source text:** "Component One: The SKILL.md" section (~2,500 words). This is the richest section in the artifact — maintain its depth.

**Quality constraints:**
- Must explain WHY each section matters functionally (not just describe the format)
- Persona: identity shapes behaviour in ambiguous situations — this is the key insight
- Questions: out-of-scope definition is as important as in-scope — emphasise this
- Principles: domain-specific, not generic — use concrete examples from multiple domains
- Must NOT include the full annotated SKILL.md example (that's L05)
- British English, no bullet lists in prose

**YAML frontmatter requirements:**
- chapter: 15, lesson: 2, sidebar_position: 2
- Skills: 3-4 skills at A2-B1 (Conceptual/Applied, Understand/Apply)
- Learning objectives: 3 at A2-B1
- Cognitive load: 4 new concepts
- teaching_guide with misconceptions about SKILL.md being code (it's plain English)

**Input context:**
- Governing artifact "Component One: The SKILL.md" as source text
- Ch14 L04 for prior SKILL.md introduction (to avoid re-explaining basics)
- Format reference: Ch14 L01

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/02-the-intelligence-layer-skill-md.md`
- Length: ~2,000-2,500 words

---

### T3: L03 — The Configuration and Integration Layers

**Section:** Lesson 3
**Wave:** 1
**Blocked by:** None

**What to write:**
A lesson combining config.yaml (Component Two) and connector scripts (Component Three). The config.yaml section covers: name/version/description, model configuration, interface settings, connector permissions (read/write/scope), and governance settings. Include the full config.yaml example from the governing artifact. The connector scripts section covers: what an MCP connector does (runs continuously, handles auth, translates data formats), what happens when it fails (stale cache or explicit unavailability), and the knowledge worker's "infrastructure literacy" requirement. Approximate word count: 1,800-2,200 words.

**Governing artifact source text:** "Component Two: config.yaml" (~800 words) + "Component Three: Connector Scripts" (~600 words). Combined because each is shorter and they share the "IT-owned" theme.

**Quality constraints:**
- config.yaml section: include the full YAML example with annotations
- Connector section: establish the "infrastructure literacy" concept — enough to know when something is wrong, not enough to fix it yourself
- Must be clear that the knowledge worker READS config.yaml but does not WRITE it
- Connector failure mode (fabricating data) explicitly called out as dangerous
- British English, no bullet lists in prose

**YAML frontmatter requirements:**
- chapter: 15, lesson: 3, sidebar_position: 3
- Skills: 3 at A2-B1 (Conceptual/Technical, Understand/Apply)
- Cognitive load: 4 new concepts

**Input context:**
- Governing artifact Components Two and Three as source text
- Format reference: Ch14 L01

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/03-configuration-and-integration-layers.md`
- Length: ~1,800-2,200 words

---

### T4: L06 — The MCP Connector Ecosystem

**Section:** Lesson 6
**Wave:** 1
**Blocked by:** None

**What to write:**
A lesson cataloguing the production MCP connector ecosystem and the process for commissioning custom connectors. Cover all connector categories from the governing artifact: CRM (Salesforce, HubSpot), Communication (Gmail, Outlook), Knowledge/Document (Confluence, Notion, SharePoint), Data/Analytics (Snowflake, BigQuery), Workflow (Jira, ServiceNow), Financial Data (Bloomberg, Refinitiv), Legal Research (LexisNexis, Westlaw), Clinical Systems (Epic, Cerner), Design/Engineering (Revit MCP server), Contracting (DocuSign), Data Enrichment (Clay). Then cover custom connector commissioning: who specifies, who builds, typical timeline (2-4 weeks modern API, 4-8 weeks legacy). Approximate word count: 1,800-2,200 words.

**Governing artifact source text:** "The MCP Connector Ecosystem" section (~1,200 words).

**Quality constraints:**
- Organise connectors in a table (category | connector | access type | notes) for scannability
- Distinguish marketplace connectors from custom connectors (Revit as custom example)
- Timeline expectations must be explicit (project planning implication)
- Must mention licensing requirements for financial/legal connectors
- British English

**YAML frontmatter requirements:**
- chapter: 15, lesson: 6, sidebar_position: 6
- Skills: 2-3 at A2-B1
- Cognitive load: 4 new concepts

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/06-mcp-connector-ecosystem.md`
- Length: ~1,800-2,200 words

---

### T5: L04 — The Three-Level Context System

**Section:** Lesson 4
**Wave:** 2
**Blocked by:** T1, T2, T3

**What to write:**
A lesson explaining Cowork's three-level context hierarchy: Platform (Anthropic, immutable), Organisation (admin, governance policies), Plugin (SKILL.md, knowledge worker). Key insight: higher levels silently override lower levels. Teach the diagnostic sequence: when an agent misbehaves, check platform constraints first, then organisation policies, then SKILL.md errors. Approximate word count: 1,200-1,500 words.

**Governing artifact source text:** "The Three-Level Context System" section (~800 words). Expand with diagnostic examples.

**Quality constraints:**
- Must read completed L01-L03 files to use consistent terminology
- Must include a concrete diagnostic example (agent ignores a SKILL.md instruction because org policy overrides it)
- The "silent override" behaviour must be made vivid — this is counterintuitive and causes real confusion
- British English

**YAML frontmatter requirements:**
- chapter: 15, lesson: 4, sidebar_position: 4
- Skills: 2-3 at A2-B1 (Conceptual/Applied)
- Cognitive load: 3 new concepts

**Input context:**
- Governing artifact "Three-Level Context System" as source text
- **Must read** completed Wave 1 lessons (L01, L02, L03) for terminology consistency

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/04-three-level-context-system.md`
- Length: ~1,200-1,500 words

---

### T6: L05 — The Agent Skills Pattern in Practice

**Section:** Lesson 5
**Wave:** 2
**Blocked by:** T2

**What to write:**
A lesson presenting a complete, annotated SKILL.md for a financial research agent. Walk through each section (Persona, Questions, Principles) with inline annotations explaining what each element does and why it is written the way it is. Key insights: identity constraints shape behaviour better than rules; the Out of Scope section is as important as In Scope; uncertainty calibration language gives the agent a precise vocabulary. Approximate word count: 2,200-2,800 words.

**Governing artifact source text:** "Writing a SKILL.md: The Agent Skills Pattern in Practice" section (~2,000 words). This is a code-heavy section with annotations.

**Quality constraints:**
- Must read completed L02 to build on its conceptual foundation
- Full SKILL.md code blocks must be syntactically valid Markdown
- Annotations should be clearly distinguished from the example (use blockquotes or callout boxes)
- Must highlight the specific quality signals: identity constraints > rules, out-of-scope as positive guidance, uncertainty calibration vocabulary
- British English

**YAML frontmatter requirements:**
- chapter: 15, lesson: 5, sidebar_position: 5
- Skills: 3 at B1 (Applied/Conceptual, Apply/Analyse)
- Cognitive load: 3 new concepts

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/05-agent-skills-pattern-in-practice.md`
- Length: ~2,200-2,800 words

---

### T7: L07 — The Governance Layer

**Section:** Lesson 7
**Wave:** 2
**Blocked by:** T4

**What to write:**
A lesson covering the four governance mechanisms: permissions and access control (IAM integration, role-based scoping), audit trails (immutable logs as a feature for regulated industries), shadow mode (30-day / 95% accuracy threshold for transition from shadow to autonomous), and human-in-the-loop gates (non-negotiable steps where human judgment is essential). Approximate word count: 2,000-2,500 words.

**Governing artifact source text:** "The Governance Layer" section (~1,500 words).

**Quality constraints:**
- Must read completed L06 to reference connector ecosystem consistently
- Shadow mode protocol (30 days / 95% accuracy) must be stated precisely — this is a key metric
- HITL gates: the principle is "autonomous for everything safe, human for everything that genuinely needs it"
- Audit trail framed as a feature (defensibility in regulated industries), not a constraint
- Must include domain-specific examples for HITL (finance: board presentations; legal: material liability; healthcare: clinical accuracy)
- British English

**YAML frontmatter requirements:**
- chapter: 15, lesson: 7, sidebar_position: 7
- Skills: 3-4 at A2-B1
- Cognitive load: 4 new concepts

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/07-governance-layer.md`
- Length: ~2,000-2,500 words

---

### T8: L08 — The Division of Responsibility

**Section:** Lesson 8
**Wave:** 3
**Blocked by:** T1-T7

**What to write:**
A lesson establishing the three-way ownership model: knowledge worker → SKILL.md, IT → connectors, admin → governance. Explain why each role operates in its own layer with no incentive to intrude on others. Include the full ownership table from the governing artifact. Discuss the maintenance discipline: SKILL.md is a living document. Approximate word count: 1,200-1,500 words.

**Governing artifact source text:** "The Division of Responsibility" section (~900 words).

**Quality constraints:**
- Must read all completed lessons (L01-L07) for terminology consistency
- Ownership table must match the governing artifact exactly
- Must emphasise: SKILL.md maintenance is ongoing (domain evolves, organisation changes)
- Must emphasise: diagnosability — when something goes wrong, the responsible layer is identifiable
- British English

**YAML frontmatter requirements:**
- chapter: 15, lesson: 8, sidebar_position: 8
- Skills: 2-3 at B1 (Applied, Apply)
- Cognitive load: 2 new concepts

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/08-division-of-responsibility.md`
- Length: ~1,200-1,500 words

---

### T9: L09 — The Cowork Plugin Marketplace

**Section:** Lesson 9
**Wave:** 3
**Blocked by:** T1-T7

**What to write:**
A lesson on the marketplace: vertical skill packs (domain-specific SKILL.md templates, starting points not finished products) and connector packages (SKILL.md + MCP connectors bundled). Cover publishing as a monetisation path for knowledge workers. Reference the economics from Chapter 14 L05. Approximate word count: 1,200-1,500 words.

**Governing artifact source text:** "The Cowork Plugin Marketplace" section (~500 words). Expand with examples and "Try With AI" prompts.

**Quality constraints:**
- Must distinguish "starting point" skill packs from "finished product" — organisations customise with their own institutional knowledge
- Must reference Chapter 14's monetisation models (L05) without re-explaining them
- Publishable knowledge = transferable across organisations; unpublishable = proprietary institutional context
- British English

**YAML frontmatter requirements:**
- chapter: 15, lesson: 9, sidebar_position: 9
- Skills: 2-3 at A2-B1
- Cognitive load: 3 new concepts

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/09-cowork-plugin-marketplace.md`
- Length: ~1,200-1,500 words

---

### T10: L10 — Chapter Summary

**Section:** Lesson 10
**Wave:** 4
**Blocked by:** T1-T9

**What to write:**
A synthesis lesson that traces the full architecture: plugin definition → three components → context hierarchy → full SKILL.md example → connector ecosystem → governance → ownership → marketplace. Must bridge to Chapter 16 (The Knowledge Extraction Method). Approximate word count: 800-1,200 words.

**Governing artifact source text:** "Chapter Summary" section (~500 words).

**Quality constraints:**
- Must read ALL completed lessons for accurate synthesis
- Must include the "Continue to Chapter 16: The Knowledge Extraction Method →" footer
- No new concepts introduced
- British English

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/10-chapter-summary.md`
- Length: ~800-1,200 words

---

### T11: README.md — Chapter Overview

**Section:** Chapter README
**Wave:** 4
**Blocked by:** T1-T9

**What to write:**
Chapter README following the exact format of Chapter 14's README.md. Include: title, epigraph, chapter introduction, "What You'll Learn" objectives, "Lesson Flow" table with durations, "Chapter Contract" (5 questions the reader should be able to answer), "After Chapter 15" section (perspective shifts), and "Start with Lesson 1" link.

**Quality constraints:**
- Match Ch14 README format exactly
- YAML frontmatter: sidebar_position: 15, title, description, chapter_number: 15, part_number: 3
- All lesson links must use correct filenames
- Chapter contract must map to exit competencies

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/README.md`

---

### T12: Chapter Quiz (50 Questions)

**Section:** Quiz
**Wave:** 4
**Blocked by:** T1-T9

**What to write:**
50 scenario-based questions using the `<Quiz>` component. Questions must cover all 10 lessons with weighting proportional to concept density. Each question: scenario stem, 4 options, correctOption index, detailed explanation with why wrong answers are wrong, source citation (lesson reference).

**Quality constraints:**
- Match Ch14 quiz format exactly (`<Quiz questions={[...]}/>`)
- Scenarios must be enterprise-realistic (not academic)
- Cover all 7 professional domains across the question set
- Bloom's taxonomy spread: ~40% Understand, ~40% Apply, ~20% Analyse
- Every lesson represented by at least 3 questions

**Output:**
- File: `apps/learn-app/docs/03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/11-chapter-quiz.md`

---

### T13: Consistency Review

**Section:** Cross-chapter review
**Wave:** 4 (after T10-T12)
**Blocked by:** T1-T12

**Review scope:**
Read ALL files in `15-enterprise-agent-blueprint/` and flag:
1. Terminology inconsistencies (plugin vs agent, SKILL.md references, connector terminology)
2. Tone drift (any section that becomes too casual, too academic, or hedges)
3. Redundant explanations (two lessons explaining the same concept)
4. Missing cross-references (lesson N references something lesson M should have introduced)
5. Formatting violations (bullet lists in prose, American spellings, missing frontmatter fields)
6. Forward references to Chapter 16+ content not yet taught
7. Ownership attribution consistency (knowledge worker = SKILL.md everywhere)

**Output:** Consistency report with specific file:line references and recommended fixes.

---

### T14-T15: Post-Production (Summaries + Flashcards)

**Wave:** 5
**Blocked by:** T13 (all fixes applied)

**T14:** Generate `.summary.md` files for all 10 lessons using `/summary-generator` skill.
**T15:** Generate `.flashcards.yaml` files for all 10 lessons using `/generate-flashcards` skill.

---

## 8. Estimated Deliverables

| Deliverable | Count | Total Files |
|-------------|-------|-------------|
| Lesson .md files | 10 | 10 |
| Summary .md files | 10 | 10 |
| Flashcard .yaml files | 10 | 10 |
| README.md | 1 | 1 |
| Chapter quiz .md | 1 | 1 |
| **Total** | — | **32 files** |

---

## 9. Chapter Word Count Estimate

| Lesson | Est. Words |
|--------|-----------|
| L01 | 1,350 |
| L02 | 2,250 |
| L03 | 2,000 |
| L04 | 1,350 |
| L05 | 2,500 |
| L06 | 2,000 |
| L07 | 2,250 |
| L08 | 1,350 |
| L09 | 1,350 |
| L10 | 1,000 |
| **Total prose** | **~17,400** |

Plus README (~800 words) and Quiz (~8,000 words with explanations) = **~26,200 words total**.

---

## 10. Risk Register

| Risk | Mitigation |
|------|-----------|
| Governing artifact has enterprise claims that may need fact-checking (connector availability, shadow mode specifics) | Flag as "book's own architecture" — these describe the Cowork platform as designed in this book's universe, not external products |
| Chapter 14's SKILL.md/config.yaml introduction may overlap with L02/L03 | L02/L03 writers must read Ch14 L04 and avoid re-explaining what was already introduced |
| Connector ecosystem list may become stale | Frame as "as of early 2026" — the list is illustrative, the commissioning process is stable |
| 50-question quiz is token-intensive to generate | Use dedicated quiz-generator teammate with full lesson context |
| Wave 2 depends on reading Wave 1 outputs — context loading adds tokens | Include explicit file paths in Wave 2 spawn prompts so agents load only what they need |
