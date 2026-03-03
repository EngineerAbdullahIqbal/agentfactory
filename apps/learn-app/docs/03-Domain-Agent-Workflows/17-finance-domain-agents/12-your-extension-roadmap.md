---
sidebar_position: 12
title: "Your Extension Roadmap and Chapter Summary"
description: "Prioritise which of the eleven enterprise extensions to build first using a structured framework, design your organisation's extension roadmap, and synthesise the full chapter — from Claude in Excel through Cowork plugins to enterprise extensions"
keywords:
  [
    "extension roadmap",
    "prioritisation framework",
    "chapter summary",
    "Claude in Excel",
    "Cowork",
    "finance domain agents",
    "enterprise extensions",
    "SKILL.md",
    "Knowledge Extraction Method",
    "MCP connectors",
    "Agent Skills",
    "extension prioritisation",
  ]
chapter: 17
lesson: 12
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Prioritise Enterprise Extensions"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can rank competing extension candidates by applying four prioritisation criteria (frequency of use, current pain level, data availability, expertise availability) and justify the ranking with specific evidence from their organisational context"

  - name: "Design an Extension Roadmap"
    proficiency_level: "B2"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can select three extensions, write a one-sentence value proposition for each, identify the expert to interview and the data sources required, and sequence them into a prioritised implementation plan"

  - name: "Synthesise the Finance Domain Agent Architecture"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can trace the chapter's progression from embedded assistant through orchestrating agent to enterprise extensions, and explain why the same MCP connectors serve both environments at different scope"

learning_objectives:
  - objective: "Evaluate extension candidates using four prioritisation criteria and rank them for implementation sequencing"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student applies the prioritisation matrix to at least three extensions from their professional context and produces a justified ranking that addresses all four criteria"

  - objective: "Design a first-quarter extension roadmap that identifies value propositions, extraction sources, and data dependencies for three selected extensions"
    proficiency_level: "B2"
    bloom_level: "Create"
    assessment_method: "Student produces a written roadmap with one-sentence value propositions, named interview targets, listed data sources, and a priority ranking for three extensions"

  - objective: "Explain the chapter's three-part architecture — embedded assistant, orchestrating agent, and enterprise extensions — and describe how the same MCP connector ecosystem serves all three at different scope"
    proficiency_level: "B1"
    bloom_level: "Understand"
    assessment_method: "Student can trace the progression from single-workbook assistant through multi-app orchestration to domain-specific extensions without conflating the three layers or treating them as separate ecosystems"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Four prioritisation criteria for extension selection"
    - "Parallel sequencing strategy (three extensions in first quarter)"
    - "The three-part chapter architecture as a unified progression"
    - "Same connectors, different scope as the unifying insight"
  assessment: "4 new concepts at B1/B2 level — within the 7-10 cognitive limit for this tier. Most cognitive effort is synthesis rather than new learning, making the load manageable despite the breadth of material being consolidated."

differentiation:
  extension_for_advanced: "After completing the roadmap exercise, write a one-paragraph specification for your highest-priority extension: what the SKILL.md should do, what data sources it needs, what three test scenarios would validate it, and what shadow mode criteria would satisfy your compliance function."
  remedial_for_struggling: "Focus on the prioritisation matrix. For each of the four criteria, write one sentence explaining what it measures. Then pick the extension from Lessons 10-11 that scores highest on pain level alone — that is your starting point."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Roadmap and Synthesis"
  key_points:
    - "Prioritisation is about sequencing, not selecting — all eleven extensions may eventually matter, but building three in the first quarter is the practical starting point"
    - "The four criteria are not equally weighted: regulatory exposure overrides other criteria when compliance is at stake"
    - "The chapter's central architectural insight is that the same MCP connectors serve Claude in Excel and Cowork at different scope — assistant in one workbook vs agent across applications"
    - "The Knowledge Extraction Method from Chapter 16 is what converts each generic extension area into an organisation-specific SKILL.md"
  misconceptions:
    - "Students may think the three parts of the chapter (Claude in Excel, Cowork, enterprise extensions) are separate systems — they are layers of the same architecture sharing the same connector ecosystem"
    - "Students may try to build all eleven extensions simultaneously — the framework exists to force sequencing based on evidence"
    - "Students may underestimate the data availability criterion — an extension without accessible data sources cannot be built regardless of how high the pain level is"
  discussion_prompts:
    - "Which of the four prioritisation criteria is most important in your organisation right now? Why?"
    - "If you had to explain the difference between Claude in Excel and Cowork to a colleague in one sentence, what would you say?"
  teaching_tips:
    - "The prioritisation matrix works best when students fill it in with real data from their organisation — hypothetical data produces hypothetical priorities"
    - "The chapter summary should be framed as an architecture overview, not a content recap — the goal is for students to see how the three parts connect, not to remember every detail"
  assessment_checks:
    - question: "What are the four criteria for prioritising enterprise extensions?"
      expected_response: "Frequency of use (how often the workflow runs), current pain level (how much friction the generic plugin creates), data availability (whether the data sources the extension needs are accessible), and expertise availability (whether you can reach the domain expert whose knowledge the extension encodes)."
    - question: "What is the architectural relationship between Claude in Excel and Cowork?"
      expected_response: "They share the same MCP connector ecosystem but operate at different scope. Claude in Excel is an embedded assistant working within a single workbook. Cowork is an orchestrating agent working across multiple applications. The same connectors serve both — the difference is scope, not infrastructure."
    - question: "Why does the chapter recommend running three extensions in parallel in the first quarter rather than sequencing them?"
      expected_response: "Because the three extensions target different concerns — highest-volume workflow, highest-risk compliance area, and most at-risk knowledge — so they do not compete for the same resources. Running them in parallel produces institutional value faster than waiting for one to finish before starting the next."
---

# Your Extension Roadmap and Chapter Summary

In Lesson 11, you explored the remaining enterprise extensions — treasury, FP&A, M&A integration, and the rest. You now have eleven extension areas covering the full landscape of institutional financial knowledge. The question is no longer what to build. It is what to build first.

This lesson gives you a structured way to answer that question, then synthesises the full chapter into the architecture that connects Claude in Excel, Cowork, and enterprise extensions as three layers of the same system.

## The Extension Prioritisation Framework

Eleven extensions is too many to build simultaneously. Even a well-resourced team will produce better results by sequencing deliberately. The framework uses four criteria to rank candidates.

| Criterion                  | What It Measures                                                              | Example                                                                                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frequency of use**       | How often the workflow runs                                                   | Monthly close runs twelve times a year; board packs run four times                                                                                                                       |
| **Current pain level**     | How much friction the generic plugin creates                                  | If the generic credit risk plugin misclassifies your institution's internal ratings, every output requires manual correction                                                             |
| **Data availability**      | Whether the data sources the extension needs are accessible                   | An IPS compliance extension requires digitised investment policy statements; if yours are in scanned PDFs without OCR, the extension cannot function until that prerequisite is resolved |
| **Expertise availability** | Whether you can reach the domain expert whose knowledge the extension encodes | The Knowledge Extraction Method requires an expert interview; if the person who holds the tacit knowledge is unavailable for the next six months, that extension waits                   |

### Applying the Criteria

Score each extension on a three-point scale for each criterion: high (3), medium (2), low (1). The total guides sequencing, but one rule overrides the arithmetic: **regulatory exposure takes precedence.** An extension addressing compliance requirements (regulatory reporting, IPS compliance, credit risk classification) moves to the front of the queue regardless of its composite score, because the cost of non-compliance is not a friction cost — it is a risk cost.

| Extension Area     | Frequency | Pain | Data | Expertise | Total | Regulatory? |
| ------------------ | --------- | ---- | ---- | --------- | ----- | ----------- |
| _Your Extension 1_ |           |      |      |           |       |             |
| _Your Extension 2_ |           |      |      |           |       |             |
| _Your Extension 3_ |           |      |      |           |       |             |

**Practical sequencing.** Run three extensions in parallel in the first quarter: one targeting the highest-volume workflow, one targeting the highest-risk compliance area, and one targeting the knowledge most at risk of leaving the organisation. These three do not compete for the same resources because they address different concerns. Sequence the remainder in quarters two and three based on composite scores.

### Where Pain Is Greatest

The right starting point depends on your institution. A corporate bank with a large credit portfolio starts with credit risk classification (Extension 1) or credit portfolio monitoring (Extension 10). A multi-entity group with intercompany complexity starts with multi-entity consolidation (Extension 9). A wealth manager with IPS-constrained portfolios starts with IPS compliance (Extension 6). There is no universal first extension — the framework exists to match the sequence to your context.

### Where Knowledge Is Most at Risk

Some extensions encode expertise held by a single person or a small team. If that expertise could leave the organisation — through retirement, resignation, or restructuring — the extension that captures it creates durable institutional value that no hiring process can replicate on short notice. This criterion does not appear in the scoring matrix as a number, but it should inform your judgment when two extensions score similarly.

## Exercise: Design Your Extension Roadmap

**Target time: 45 minutes.**

This is the chapter's final exercise. You will produce a concrete artefact — an extension roadmap that you can present to a manager, a compliance officer, or a technology team as the starting point for a real deployment.

### Step 1: Select Three Extensions (10 minutes)

From the eleven extension areas covered in Lessons 10 and 11, identify the three most relevant to your professional context. If you do not work in finance, choose a domain you know well and map the extension areas to analogous knowledge gaps.

### Step 2: Write Value Propositions (10 minutes)

For each of your three selected extensions, write:

- **One-sentence value proposition**: What does this extension do that the generic plugin cannot?
- **The expert to interview**: Who holds the tacit knowledge this extension needs to encode? Name a role, not a person, if you prefer.
- **Data sources required**: What documents, systems, or databases does the extension need access to?

**Example:**

| Extension                  | Value Proposition                                                                                                                                                 | Expert              | Data Sources                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| Credit Risk Classification | Encodes our institution's internal rating methodology so the agent classifies credits the way our credit committee does, not the way a generic model approximates | Head of Credit Risk | Internal rating model documentation, historical rating committee decisions, policy manual for rating overrides |

### Step 3: Prioritise (10 minutes)

Score each of your three extensions on the four criteria. Apply the regulatory override rule. Produce a ranked list with a one-sentence justification for the ranking.

### Step 4: Write the First Extension Specification (15 minutes)

For your highest-priority extension, write a one-paragraph specification:

- What should the SKILL.md do?
- What data sources does it need?
- What three test scenarios would validate it?

This specification is the starting point for a real deployment. It is the input to the Knowledge Extraction Method you learned in Chapter 16 — the five interview questions, the document extraction framework, and the validation scenario set all begin from this paragraph.

## Chapter Summary

This chapter covered three progressively broader layers of Claude's capabilities in finance, each building on the one before.

### Part One: Claude in Excel — The Embedded Assistant

Lessons 1 through 5 taught you to use Claude as an assistant embedded in a single workbook. You learned four general capabilities — model comprehension, scenario testing, error debugging, and model building — and six pre-built Agent Skills: Comparable Company Analysis, Discounted Cash Flow Model, Due Diligence Data Pack, Company Teaser, Earnings Analysis, and Initiating Coverage Report. Each Agent Skill connects to live market data through MCP connectors configured in your Claude settings (such as S&P Global, PitchBook, and Morningstar) and produces a professionally structured financial deliverable. The key insight from Part One: Claude in Excel is a deep companion for financial modelling work — it reads your workbook, reasons about your formulas, and builds within the context of your specific model.

### Part Two: Cowork — The Orchestrating Agent

Lessons 6 through 8 shifted from assistant to agent. You learned the architectural difference: Cowork operates across applications, carrying context from Excel analysis through to PowerPoint presentation in a single orchestrated workflow. The finance plugins — the knowledge-work finance plugin for corporate finance teams and the financial-services plugin suite for investment professionals — provide domain-specific commands and passive skills. The Cowork data connectors (Daloopa, FactSet, Moody's, LSEG, S&P Global, PitchBook, Chronograph, MT Newswires, Aiera, Morningstar, Egnyte) are configured by IT through the Cowork platform. The key insight from Part Two: Cowork is a workflow orchestrator that treats Excel as one node in a larger automated process.

### Part Three: Enterprise Extensions — Making Generic Plugins Yours

Lessons 9 through 12 applied the Knowledge Extraction Method from Chapter 16 to the finance domain. You learned to extract domain-specific knowledge through expert interviews, translate it into SKILL.md instructions, and validate those instructions against domain-specific scenarios. The eleven enterprise extension areas — credit risk, regulatory reporting, treasury, FP&A, M&A integration, IPS compliance, sector-specific valuation, board and IR packs, multi-entity consolidation, credit portfolio monitoring, and the Finance Business Partner persona — represent the institutional knowledge that generic plugins cannot provide. The key insight from Part Three: the Knowledge Extraction Method does not change across domains; what changes is the professional knowledge it surfaces.

### The Unifying Architecture

The three parts are not separate systems. They are layers of the same architecture sharing the same MCP connector ecosystem. Claude in Excel uses connectors at workbook scope. Cowork uses the same connectors at multi-application scope. Enterprise extensions add your organisation's knowledge on top of both layers through SKILL.md files that encode the judgment, conventions, and escalation rules that make a generic capability specific to your institution.

Same connectors. Different scope. Your knowledge on top.

## What Comes Next

Every tool you used in this chapter — Claude in Excel, the Cowork finance plugins, the six Agent Skills, the MCP connectors — operated on an assumption that went unexamined: that the spreadsheets those tools read are designed the way spreadsheets have always been designed. Cell addresses encode the logic. Formulas reference coordinates. The model's meaning lives in the analyst's head, not in the workbook.

What if that foundation is the bottleneck?

Chapter 18 introduces the **Intent-Driven Financial Architecture (IDFA)** — Panaversity original research that replaces coordinate-based formulas with Named Range business rules, making every model human-readable, AI-operable, and mathematically audit-proof. IDFA does not replace the tools from Chapter 17. It transforms the foundation those tools operate on — and the result is a categorical improvement in what your finance domain agents can do.

The same Claude in Excel. The same MCP connectors. A fundamentally different architecture underneath. That is what changes everything.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to apply the prioritisation framework to your context.

### Prompt 1: Prioritisation Matrix

```
I work as [YOUR ROLE] at [YOUR ORGANISATION TYPE — e.g., corporate bank,
asset manager, multi-entity group, insurance company]. I have just
completed Chapter 17 on Finance Domain Agents.

Help me apply the extension prioritisation framework to my context.
For each of the eleven enterprise extension areas from the chapter:
1. Score it on the four criteria (frequency of use, current pain level,
   data availability, expertise availability) using high/medium/low
2. Flag any that carry regulatory exposure
3. Identify the top three candidates and explain why

Then suggest a practical first-quarter plan: which three to run in
parallel and what the first step for each would be (expert interview,
document collection, or data access request).
```

**What you're learning:** How to apply a structured prioritisation framework to a real organisational context. The framework forces you to evaluate extensions on evidence rather than intuition — an extension that scores high on pain but low on data availability cannot be built until the data prerequisite is resolved, regardless of how appealing the use case is.

### Prompt 2: Chapter Architecture Synthesis

```
Explain the architecture of Chapter 17 (Finance Domain Agents) as three
layers of the same system, not three separate tools. Cover:

1. Claude in Excel: what it does, what connectors it uses, what scope
   it operates at
2. Cowork: what it adds beyond Claude in Excel, how the plugins work,
   what connectors it uses
3. Enterprise extensions: what they add beyond generic plugins, how
   SKILL.md files encode institutional knowledge

Focus on the relationship between the layers — especially why the same
MCP connectors serve both Claude in Excel and Cowork, and what
"same connectors, different scope" means architecturally.

Then explain how the Knowledge Extraction Method (Chapter 16) connects
to the enterprise extension layer.
```

**What you're learning:** How to see the chapter's content as a connected architecture rather than a list of features. The synthesis exercise forces you to articulate the relationship between layers — understanding this relationship is what distinguishes someone who can use the tools from someone who can design extension strategies for an organisation.

### Prompt 3: Architectural Foundation Analysis

```
I have just completed Chapter 17 on Finance Domain Agents — Claude in
Excel, Cowork plugins, MCP connectors, and enterprise extensions.

Chapter 18 introduces the Intent-Driven Financial Architecture (IDFA),
which replaces coordinate-based formulas with Named Range business rules.

Before I start, help me understand the gap:
1. Take any moderately complex Excel formula (e.g., =B14-(C14*$F$8)).
   What can an AI agent infer about its business purpose from the
   coordinates alone?
2. Now rewrite it as =Revenue_Y2 - (Revenue_Y2 * COGS_Pct_Y2).
   What can the same agent infer now?
3. What capabilities become possible when every formula in a model
   reads as a business rule rather than a coordinate reference?
4. How would this change the quality of the tools I learned in
   Chapter 17 — scenario testing, error debugging, model comprehension?

Help me see why architecture transforms the tools I already have.
```

**What you're learning:** How the foundation underneath your tools determines their ceiling. The same Claude in Excel reading `=B14-(C14*$F$8)` versus `=Revenue_Y2 - (Revenue_Y2 * COGS_Pct_Y2)` gives categorically different answers — not because the agent changed, but because the model became readable. This prompt builds the mental bridge to Chapter 18's central argument: architecture is the multiplier.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Chapter Quiz](./13-chapter-quiz.md)
