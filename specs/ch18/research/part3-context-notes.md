# Part 3: Domain-Agent-Workflows — Context Notes for Chapter 18

**Source**: Full read of all 43 lessons across chapters 14-17 (Part 3).
**Date**: 2026-03-02
**Purpose**: Initial research context for Chapter 18 planning.

---

## Part 3 Overview

**Path**: `apps/learn-app/docs/03-Domain-Agent-Workflows/`
**Chapters**: 14-17 (4 chapters, ~43 lessons, all draft status)
**Theme**: Enterprise AI deployment — from strategic landscape to domain-specific application

---

## Ch14: The Enterprise Agentic Landscape (9 lessons + quiz)

### Arc

Why enterprise AI stalled (2024-25 "Pilot Trap") → what changed in 2026 (platform shift) → knowledge worker as central figure → Cowork vs Frontier decision framework → monetisation models → maturity model → seven domains → deployment conversations

### Key Frameworks

- **Pilot Trap**: organisational condition where AI investment produces demos but not deployments
- **Knowledge Transfer Gap**: structural divide between domain experts and system builders
- **Cowork vs Frontier**: plugin-based (knowledge-worker-led) vs unified semantic layer (enterprise-sales-led)
- **4 Monetisation Models**: Success Fee, Subscription, License, Marketplace
- **5-Level AI Maturity Model**: Awareness → Experimentation → Integration → Optimisation → Transformation
- **7 Professional Domains**: Finance/Banking, Legal/Compliance, Sales/Revenue, HR/Operations, Healthcare Operations, Architecture/Engineering, Technical Documentation
- **The Knowledge Question**: "Whose expertise, encoded in what form, available to whom, operating under what constraints?"

### Domain Chapter References (from L07)

- Ch17-18: Finance and Banking
- Ch19: Legal and Compliance
- Ch20: Sales and Revenue
- Ch21: HR and Operations
- Ch22: Healthcare Operations
- Ch23: Architecture and Engineering
- Ch24: Technical Documentation

### Issues Noted

- **HIGH**: "Anthropic Cowork" and "OpenAI Frontier" are fictional/speculative product names — students directed to web-search them will find nothing. Real companies (HP, Intuit, Oracle etc.) named as Frontier adopters without verification
- **MEDIUM**: Pricing benchmarks in L05 ($3-8/lead, $40K-$150K/yr license etc.) are unverified estimates presented as market data
- **LOW**: Forward references to chapters 15-25, some not yet written. YAML keyword format inconsistency in L07

---

## Ch15: The Enterprise Agent Blueprint (10 lessons + quiz)

### Arc

What a Cowork plugin is → SKILL.md (PQP Framework) → plugin infrastructure → three-level context system → PQP in practice → MCP connector ecosystem → governance layer → ownership model → marketplace → synthesis

### Key Frameworks

- **Three-Layer Plugin Model**: generic format → knowledge-work specialisation → enterprise readiness evaluation
- **PQP Framework (Persona-Questions-Principles)**: Panaversity's methodology for structuring SKILL.md
  - Persona: professional identity as functional specification (governs ambiguous situations more reliably than rules)
  - Questions: scope as two-sided document (in-scope AND out-of-scope with positive redirection)
  - Principles: domain-specific operating logic, escalation thresholds — not generic platitudes
- **Three-Level Context Hierarchy**: Platform (Anthropic, immutable) → Organisation (admin) → Plugin (SKILL.md, knowledge worker). Higher levels silently override lower.
- **Shadow Mode Protocol**: 30-day minimum, 95% accuracy threshold, zero critical errors in preceding 10 days
- **Three-Way Ownership Model**: Knowledge worker (SKILL.md) / IT-Developer (connectors, commands, manifest) / Administrator (governance)
- **Marketplace**: Vertical skill packs (SKILL.md templates, general domain) vs connector packages (SKILL.md + pre-built MCP connectors)

### Plugin Package Structure

```
plugin-name/
├── plugin.json          # Manifest (name, version, author)
├── .mcp.json            # MCP server declarations
├── settings.json        # Default behaviour
├── skills/
│   └── SKILL.md         # Intelligence layer (knowledge worker owns)
├── commands/
├── agents/
└── hooks/
```

### Issues Noted

- Agent Skills spec adoption claim ("25+ tools") needs verification
- Plugin counts (11→24 in Jan-Feb 2026) will become stale quickly
- Shadow mode thresholds are Panaversity's recommendation, not platform-documented
- L03 filename/title mismatch

---

## Ch16: The Knowledge Extraction Method (9 lessons + exercise + quiz)

### Arc

Why platforms can't solve tacit knowledge → five-question interview framework (Method A) → conducting interviews → document extraction (Method B) → choosing/combining methods → translation to SKILL.md → validation scenario sets → validation loop → hands-on exercise → synthesis

### Key Frameworks

- **Method A — Expert Interview (5 Questions)**:
  1. Recent success → activates episodic memory, surfaces decision-making logic
  2. Instructive failure → defensive/failure-mode knowledge
  3. Junior vs senior gap → expertise differential, load-bearing heuristics
  4. One-page decision guide → distilled wisdom
  5. Automation boundaries → escalation conditions, human-in-the-loop requirements
- **Method B — Document Extraction (3 Passes)**:
  - Pass 1: Explicit rule extraction (pure transcription)
  - Pass 2: Contradiction mapping (temporal, jurisdictional, interpretive)
  - Pass 3: Gap identification (low-stakes apply-and-flag vs high-stakes escalate)
- **Reconciliation Principle** (when A+B conflict): documented standards take precedence for regulatory compliance; expert judgement takes precedence for operational decisions
- **Domain-Method Mapping**: Finance/Sales = Method A primary; HR/Operations = Method B primary; Legal/Healthcare/Architecture = both
- **Validation Scenario Set**: 4 categories — Standard (50%), Edge (25%), Adversarial (15%), High-stakes (10%)
- **3-Component Scoring**: Accuracy, Calibration, Boundary compliance
- **Dual Threshold**: 95% overall + zero high-stakes failures
- **Validation Loop**: Failure pattern interpretation → targeted rewrite → regression check → shadow mode → graduated autonomy

### Translation to SKILL.md

- Persona: answer three questions — professional level/authority, quality standards, uncertainty behaviour
- Questions: in-scope capability categories + out-of-scope boundaries (equally important halves)
- Principles: must be testable ("can you run a scenario and confirm the agent followed it?")
- **Uncertainty Calibration Vocabulary** (5 levels): data-confirmed, strongly supported, reasonable inference, uncertain, outside scope

### Running Example

Credit analyst throughout — consistent and coherent across all lessons

### Issues Noted

- **Continuity error**: Credit policy threshold is £25M in L02 but £10M in L04 — needs reconciliation
- Quiz Q5 framing doesn't match L02's actual Question 5
- Practitioner assertions stated as facts (60-90 min interview norm, 2-3 iterations, 30-min north star summary deadline)

---

## Ch17: Finance Domain Agents (12 lessons + quiz)

### Arc

Assistant vs agent distinction → understanding inherited workbooks → scenarios/errors/model building → 6 Agent Skills (market analysis) → 6 Agent Skills (deal/research) → Cowork finance plugins → financial services plugin suite → cross-app orchestration → knowledge extraction applied to finance → enterprise extensions (risk/compliance) → enterprise extensions (operations/strategy) → extension roadmap

### Three-Layer Structure

1. **Claude in Excel** (embedded assistant, single-workbook scope): general workbook intelligence + 6 pre-built Agent Skills
2. **Cowork with Excel** (orchestrating agent, multi-app scope): finance plugins orchestrating across Excel/PowerPoint/enterprise systems
3. **Enterprise extensions** (institutional knowledge layer): SKILL.md encoding firm-specific financial judgment

### 6 Pre-Built Agent Skills (Claude in Excel)

1. Comparable Company Analysis (Comps)
2. DCF Model
3. Due Diligence Data Pack
4. Company Teaser / Blind Profile
5. Earnings Analysis
6. Initiating Coverage Report

### Cowork Finance Plugins

- `knowledge-work-plugins/finance`: 5 commands, 6 skills (month-end close, GL reconciliation, variance analysis etc.)
- `financial-services-plugins`: core plugin (11 MCP connectors) + 4 add-ons (investment-banking, equity-research, private-equity, wealth-management) + 2 partner plugins (LSEG, S&P Global)

### 11 Enterprise Extension Areas

1. Credit Risk Framework
2. Regulatory Reporting (Basel III)
3. Treasury and Cash Management
4. Tax Provision and Compliance (ASC 740)
5. FP&A and Budget Ownership
6. IPS Compliance
7. M&A Integration PMO
8. ESG Reporting (CSRD, ISSB)
9. Fund Administration and NAV
10. Portfolio Attribution (Brinson model)
11. Insurance Underwriting and Claims

### Key Finance Concepts Taught (via concept boxes)

WACC, Enterprise Value, LTM, DCF, LBO, EBITDA, three-statement linkages, Basel III ratios (CET1, Total Capital, Leverage), ASC 740 (deferred tax), Brinson attribution, chain ladder reserving

### Knowledge Extraction Applied to Finance (L09)

- Five Questions adapted to CFO monthly close context
- Generic plugin response vs CFO actual response comparison (4 scenarios)
- Full worked SKILL.md draft with 5 testable Principles

### Issues Noted

- Unverified stats: teaser NDA rates (15-25), time savings (2-3 hrs→45 min), plugin counts (41 skills, 38 commands)
- MCP endpoint URLs (11 specific) and `claude plugin` CLI syntax — maintenance risk
- Model names "Sonnet 4.6 / Opus 4.6" hardcoded
- CSRD date slightly imprecise on phasing
- LBO IRR approximation (15% stated, ~14.9% actual)
- Cross-app orchestration flagged as "research preview"

---

## Cross-Chapter Patterns

### Quality (Strong)

- **Frontmatter**: All lessons across all 4 chapters have complete, well-formed YAML (skills, learning_objectives, cognitive_load, differentiation, teaching_guide). Strongest frontmatter compliance in the book.
- **Try With AI**: Every lesson has exactly 3 prompts (personal/framework/research), all with "What you're learning:" explanations.
- **Teaching guides**: Present in all lessons with key_points, misconceptions, discussion_prompts, tips, assessment checks.
- **Narrative arc**: Each lesson answers the question raised by the previous one. Chapter-level decision chain tables are strong teaching artifacts.
- **Ch16 is the strongest chapter** — coherent running example, well-scaffolded pedagogy, clean Bloom's progression.

### Risks (Recurring)

- **Fictional product names**: "Anthropic Cowork" and "OpenAI Frontier" mixed with real company names throughout
- **Forward references**: Chapters 18-25 referenced as if they exist — need to verify/write
- **Unverified statistics**: Pricing benchmarks, adoption numbers, time-savings claims across multiple lessons
- **Staleness risk**: Plugin counts, MCP URLs, model names, CLI syntax — all time-sensitive

### Architecture Established for Domain Chapters

Ch17 established the **three-layer domain chapter template**:

1. **Embedded assistant** (single-app, tool-specific features)
2. **Orchestrating agent** (multi-app via Cowork plugins)
3. **Enterprise extensions** (firm-specific SKILL.md via Knowledge Extraction Method)

This template + the Knowledge Extraction Method (Ch16) is what Ch18+ should follow.

### Revised Chapter Plan (as of 2026-03-02)

**Original plan**: Ch18 = Legal and Compliance (Ch14 L07 said Ch19 for Legal, Ch17 L12 bridged to Ch18 as Legal).

**New plan**: Ch18 = **IDFA (Intent-Driven Financial Architecture)** — Panaversity original research. Finance now gets TWO chapters:

- Ch17: Using existing tools (Claude in Excel, plugins, Cowork orchestration)
- Ch18: Redesigning the foundation those tools operate on (IDFA methodology)

Legal/Compliance becomes Ch19. Part 3 now has 6 chapters (14-19) instead of 5.

**Rationale**: Ch17 teaches tools on conventional spreadsheets. Ch18 shows how to redesign spreadsheets so those same tools become categorically more capable. The relationship is "tools vs architecture" — Ch18 gives Ch17's tools something better to work on.

---

## Ch18: Intent-Driven Financial Architecture (IDFA) — Research Artifacts

**Status**: Basic idea document + SKILL.md + reference guide exist. Needs testing/validation.
**Source files**: `specs/ch18/idfa_files/`

### Core Idea

- **Problem**: "Coordinate-First paradigm" — 40 years of encoding business logic in cell addresses (=B14-C14\*$F$8). Causes Formula Rot: silent breakage, logic diffusion, audit burden, AI opacity.
- **Solution**: "Logic-First" design — formulas read as business rules using Named Ranges. `=Revenue_Y3 - COGS_Y3` instead of `=D8-C8`.
- **Core principle**: "Define WHAT, not WHERE."
- **Original research badge**: Explicitly flagged as Panaversity team research, not attributed to external sources.

### Three Layers (must remain separate)

1. **Assumptions Layer** (inputs only): every user-modifiable input, Named Ranges with `Inp_` prefix, zero calculations
2. **Calculation Layer** (logic only): Named Ranges only, zero cell-address references, every formula readable as plain English
3. **Output Layer** (presentation only): reads from Calculation layer only, no calculations, charts/dashboards/reports

### Four Deterministic Guardrails

1. **Named Range Priority**: every business variable is an Excel Defined Name; zero coordinate references in Calculation layer
2. **LaTeX Verification**: complex formulas (WACC, NPV, DCF, IRR) verified in LaTeX before writing to model
3. **Audit-Ready Intent Notes**: every AI-generated formula gets an Excel Note (INTENT / FORMULA / ASSUMPTIONS / GENERATED / MODIFIED)
4. **MCP Dependency**: AI agent prohibited from internal calculation; must use write_cell() / read_cell() via Excel MCP Server

### Five Finance Domain Agent Capabilities (unlocked by IDFA)

1. **Intent Synthesis**: plain-English → full three-layer IDFA model spec
2. **Deterministic What-If**: write assumption via MCP → read result → report (no internal math)
3. **Logic De-compilation**: reverse-engineer coordinate-based model into IDFA Logic Map
4. **Strategic Goal-Seeking**: iterate write_cell/read_cell until target output reached
5. **Stochastic Simulation**: Monte Carlo via MCP — 500+ iterations, probability distributions, percentile reporting

### Chapter Structure (from Chapter18_IDFA.md)

- **Part One**: The Problem — Coordinate Trap, Formula Rot, scale of problem, what changes when AI reads the model
- **Part Two**: IDFA Methodology — three layers, four guardrails, naming conventions, worked example (3-year Gross Profit Waterfall)
- **Part Three**: Building — step-by-step build, LaTeX verification, Intent Notes, MCP what-if workflow, retrofitting existing models, 4 practice exercises
- **Part Four**: Enterprise Scale — CFO's Office as governance function, 4 governance artefacts (Standards Document, Model Registry, Validation Protocol, Agent Standards Policy), five capability tests

### SKILL.md Artifact

- **Name**: `idfa-financial-architect`
- **License**: Apache-2.0
- **Standard**: agentskills.io
- **Structure**: SKILL.md (main) + references/IDFA-reference.md (deep material)
- **Activation triggers**: financial model, spreadsheet, Excel formula, named ranges, formula tracing, model audit, DCF, LBO, comps, etc.
- **Negative triggers**: general accounting, tax advice, investment recommendations

### Reference Guide Contents

- Enterprise governance: 4 artefacts (Standards Document, Model Registry, Validation Protocol, Agent Standards Policy)
- Five capability tests with pass criteria
- Retrofitting extended guidance (5 phases with dependency ordering)
- Complex formula LaTeX reference: WACC, NPV, Terminal Value (Gordon Growth), IRR
- Sector-specific naming extensions (IB*, PE*, FP*, TR*, CR\_ prefixes)

### Worked Example

3-year Gross Profit Waterfall: $10M Y1 revenue, 10% YoY growth, 60% COGS improving 1%/yr.

- 4 named inputs → 12 named calculations → deterministic output
- What-if: change Inp_Rev_Y1 to $12M → read back GP via MCP → Y3 GP = $6,098,400
- Math verified: all figures check out

### Observations / Items Needing Work

1. **Not yet split into lessons** — currently a monolithic document; needs lesson decomposition per chapter template
2. **No YAML frontmatter** on the chapter document (skills, learning objectives, cognitive load, etc.)
3. **No "Try With AI" prompts** — need 3 per lesson when decomposed
4. **Teaching guide sections missing** — key_points, misconceptions, discussion_prompts, tips, assessment_checks
5. **Practice exercises exist** (4 total) but need alignment with lesson boundaries
6. **Does not follow the Ch17 three-layer domain template** (embedded assistant → orchestrating agent → enterprise extensions) — intentionally different since IDFA is a methodology chapter, not a tools chapter
7. **Forward references**: Chapter18_IDFA.md ends with "Continue to Chapter 19: Legal and Compliance" — confirms legal is now Ch19
8. **agentskills.io URL** referenced multiple times — needs verification that site is live
9. **SKILL.md needs installation into `.claude/skills/`** for actual testing
10. **No flashcards, summaries, or quiz** yet
11. **Ch17 forward references need updating** — Ch17 L12 bridges to "Ch18: Legal" which is now wrong; needs to bridge to Ch18: IDFA instead, with Legal becoming Ch19

---

## Ch17 vs Ch18: End Goal Analysis

### Ch17 End Goal: "Use the tools that exist today"

Student can:

- Operate Claude in Excel (trace dependencies, test scenarios, debug errors, invoke 6 Agent Skills)
- Operate Cowork finance plugins (multi-app orchestration across Excel/PowerPoint)
- Encode firm-specific knowledge (apply Ch16's Knowledge Extraction Method to a CFO, produce SKILL.md, prioritise 11 enterprise extensions)

**Unexamined assumption**: all of this operates on spreadsheets built coordinate-first (`=B14-C14*$F$8`). Ch17 never questions the foundation.

**Final state**: "Same connectors. Different scope. Your knowledge on top." Student has tools + institutional knowledge but works on opaque, fragile, formula-rot-prone models.

### Ch18 End Goal: "Redesign the foundation those tools stand on"

Student can:

- Diagnose the Coordinate-First problem (Formula Rot and why it limits Ch17's tools)
- Apply IDFA methodology (3 layers + 4 guardrails)
- Build IDFA-compliant models from scratch and retrofit existing ones
- Unlock 5 agent capabilities impossible on coordinate-based models
- Install and use the IDFA SKILL.md as a portable agent skill
- Design enterprise IDFA governance (Standards Document, Model Registry, Validation Protocol, Agent Standards Policy)

**The relationship**: Ch17 = best AI finance tools available. Ch18 = architecture that makes those same tools categorically more capable. Tools don't change. Foundation does.

### Summary Table

| Dimension         | Ch17                                              | Ch18                                                         |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| What it teaches   | Existing tools (Claude in Excel, Cowork plugins)  | Original methodology (IDFA)                                  |
| Who built it      | Anthropic + financial data providers              | Panaversity team                                             |
| Core metaphor     | "Use the best tools"                              | "Give those tools a better foundation"                       |
| Student produces  | Extension roadmap + first SKILL.md draft          | IDFA-compliant model + installed IDFA skill                  |
| Pedagogical layer | L2 (Collaboration — AI as co-worker)              | L3/L4 (Intelligence — create a reusable skill)               |
| End state         | Can operate finance agents on any model           | Can design models that make finance agents maximally capable |
| Chapter type      | Domain application (tools + knowledge extraction) | Architecture methodology (original research)                 |

---

## Critical Gap: Ch18 Exercise Density

### Ch17 is heavily hands-on (19 exercises)

- L02: Exercise 1 — open real workbook, trace dependencies with Claude
- L03: Exercises 2-4 — scenario testing, error diagnosis, build 3-statement model
- L04: Exercises 5-6 — run Comps, build DCF with sensitivity table
- L05: Exercises 7-10 — due diligence, teaser, post-earnings, initiating coverage
- L07: Exercises A-D — IB, equity research, PE, wealth management workflows
- L08: Exercise 11 — Excel-to-PowerPoint orchestration
- L10-L11: Exercises 12-14 — write SKILL.md files for credit risk, FP&A, fund admin
- L12: Exercise 15 — design extension roadmap (45 min capstone)

Every exercise involves Claude in Excel or Cowork — students type prompts, run Agent Skills, install plugins, invoke commands.

### Ch18 draft is theory-heavy (only 4 exercises, bolted on at end)

1. Build IDFA Gross Profit Waterfall (30 min)
2. LaTeX Verification of WACC Model (20 min)
3. Retrofit a Coordinate-Based Model (40 min)
4. Validate the Five Capabilities (45 min)

### Decision: Ch18 MUST be hands-on

IDFA is a methodology you apply in Excel — Named Ranges, formula rewriting, MCP workflows. The "aha" moment happens in the act, not from reading about it.

### Proposed exercise-per-lesson structure (when decomposed)

| Proposed Lesson       | Hands-On Component                                                |
| --------------------- | ----------------------------------------------------------------- |
| The Coordinate Trap   | Open an inherited model, try to explain a formula — feel the pain |
| Three Layers          | Build Assumptions sheet with Named Ranges from scratch            |
| Named Range Priority  | Rewrite 5 coordinate formulas as Named Range formulas             |
| LaTeX Verification    | Verify a WACC formula with Claude, catch a deliberate error       |
| Intent Notes          | Write Intent Notes for the formulas you just built                |
| MCP Dependency        | Run a what-if via write_cell/read_cell (not manual)               |
| Retrofitting          | Take a real coordinate-based model, convert it                    |
| Enterprise Governance | Design a Standards Document for your team                         |
| Five Capabilities     | Test all 5 — capstone exercise                                    |

Each lesson should make students DO something in Excel with Claude, not just read about IDFA principles. Match Ch17's exercise density.

---

## Bridge Text Needed

Ch17 L12 (line 201-205) currently bridges to "Chapter 18: Legal and Compliance." Must be rewritten to:

1. Name the assumption Ch17 made: every model was coordinate-first
2. Tease the problem: what if the foundation itself is the bottleneck?
3. Preview IDFA: methodology that makes same tools + SKILL.md files operate on models designed to be understood
4. Position as Panaversity original research — a flex chapter, not just tools adoption
