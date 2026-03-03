---
sidebar_position: 6
title: "Intent Notes — Guardrail 3"
description: "Learn how to create audit-ready Intent Notes — the permanent documentation attached to every AI-generated formula that records the business intent, the verified LaTeX expression, and the Named Range dependencies, ensuring institutional memory survives staff turnover and model updates"
keywords:
  [
    "Intent Notes",
    "Guardrail 3",
    "audit trail",
    "formula documentation",
    "institutional memory",
    "IDFA",
    "Intent-Driven Financial Architecture",
    "Excel Notes",
    "Excel Comments",
    "Named Ranges",
    "formula intent",
    "model audit",
    "finance domain agent",
  ]
chapter: 18
lesson: 6
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Create Audit-Ready Intent Notes"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Content"
    measurable_at_this_level: "Student can write a complete Intent Note for any Named Range formula in the GP Waterfall model, following the five-field format (INTENT, FORMULA, ASSUMPTIONS, GENERATED, MODIFIED), and can explain the purpose of each field"

  - name: "Evaluate Intent Note Completeness"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Analyze"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can review an existing Intent Note against its corresponding formula and identify missing fields, outdated information, or divergence between the stated intent and the actual formula logic"

  - name: "Generate Intent Notes with AI Assistance"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can prompt Claude to generate Intent Notes for a set of Named Range formulas, review the output for accuracy and completeness, and refine any notes that contain inaccuracies or missing dependencies"

learning_objectives:
  - objective: "Write complete Intent Notes for Named Range formulas in the GP Waterfall model, applying the five-field format and explaining the purpose each field serves in the audit trail"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student produces Intent Notes for Revenue_Y2, COGS_Pct_Y2, and Gross_Profit_Y3 that include all five fields with accurate content, and can explain why each field is necessary for audit readiness"

  - objective: "Analyse an existing Intent Note for accuracy by comparing its stated intent and assumptions against the actual formula, identifying any divergence that would indicate the note needs updating"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Given an Intent Note that has drifted from its formula (e.g., assumptions list missing a new dependency), student identifies the specific divergence and explains why it matters for audit integrity"

  - objective: "Use Claude to generate Intent Notes for a set of formulas, then review and refine the output to ensure accuracy, demonstrating the cowork pattern where the agent drafts and the analyst validates"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student prompts Claude to generate Intent Notes for three formulas, identifies at least one inaccuracy or omission in the generated output, and corrects it with a clear explanation of the fix"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Intent Notes as a five-field audit documentation format attached to Excel cells"
    - "The INTENT field — encoding the plain-English business rule a formula represents"
    - "The ASSUMPTIONS field — listing Named Range dependencies for traceability"
    - "Intent-formula divergence as a visible audit signal"
    - "AI-generated Intent Notes with human review as the standard cowork pattern"
  assessment: "5 concepts at B1 level — within the 7-10 cognitive limit for this tier. Students have spent five lessons building Named Range formulas and verifying them in LaTeX; this lesson adds the documentation layer that makes those formulas permanently self-explaining."

differentiation:
  extension_for_advanced: "Draft an Intent Note template for a complex formula type not covered in the GP Waterfall — for example, WACC or NPV. Include the LaTeX expression in the FORMULA field. Then write a prompt that instructs Claude to generate Intent Notes for every formula in a model, applying your custom template. Test whether Claude follows the template consistently or drifts from it."
  remedial_for_struggling: "Focus on the INTENT and ASSUMPTIONS fields only. For each of the three GP Waterfall formulas (Revenue_Y2, COGS_Pct_Y2, Gross_Profit_Y3), write one sentence that starts 'This formula calculates...' and list the Named Ranges it reads. If you can do that for all three, you have the core of Intent Notes."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "The Four Guardrails"
  key_points:
    - "An Intent Note is not general documentation — it is a structured five-field record attached to a specific cell, documenting what the formula was designed to calculate at the moment it was written"
    - "The power of Intent Notes is divergence detection: when a formula is modified but the Intent Note is not updated, that visible mismatch IS the audit signal"
    - "Claude can generate Intent Notes automatically for formulas built with Named Ranges — the analyst's role is reviewing and refining, not writing from scratch"
    - "Intent Notes are institutional memory: they survive staff turnover, model updates, and layout changes because they travel with the cell, not in a separate document"
  misconceptions:
    - "Students may confuse Intent Notes with general cell comments — Intent Notes follow a specific five-field format designed for audit, not informal annotation"
    - "Students may think Intent Notes are only useful for AI-generated formulas — they are equally valuable for human-written formulas, though the GENERATED field is most relevant for AI output"
    - "Students may assume Intent Notes replace LaTeX verification — they complement it. The FORMULA field in the Intent Note records the LaTeX expression that was verified before writing"
  discussion_prompts:
    - "Think about a model you inherited where you had to figure out what a formula was supposed to calculate. How long did that take? What would have changed if every formula had an Intent Note?"
    - "Consider what happens when an analyst modifies a formula but does not update the Intent Note. How does the divergence become visible, and why is that visibility valuable?"
  teaching_tips:
    - "Open with the narrative about the departed analyst — let students feel the institutional memory problem before presenting the solution"
    - "Show an Intent Note side-by-side with a bare formula so the contrast is immediate and visceral"
    - "The Cowork exercise should feel like a productivity accelerator — Claude drafts 10 Intent Notes in seconds, the student's job is quality review"
  assessment_checks:
    - question: "What are the five fields of an Intent Note and what does each one record?"
      expected_response: "INTENT records the plain-English business rule the formula encodes. FORMULA records the LaTeX expression that was verified before writing. ASSUMPTIONS lists the Named Ranges the formula depends on. GENERATED records the date and session identifier when the formula was first created. MODIFIED records the date and modifier when the formula was last changed."
    - question: "Why is intent-formula divergence valuable rather than a problem?"
      expected_response: "When a formula is modified but the Intent Note is not updated, the mismatch between the documented intent and the actual formula becomes visible. This visibility is the audit signal — it tells an auditor, a regulator, or a new analyst that something has changed and needs verification. Without the Intent Note, the modification would be invisible."
    - question: "Why should analysts review AI-generated Intent Notes rather than accepting them without inspection?"
      expected_response: "Claude generates Intent Notes by reading the formula and inferring the business intent from the Named Range names and structure. While this inference is usually accurate for well-structured IDFA formulas, the agent may miss contextual business logic — for example, that a declining COGS percentage reflects a specific scale efficiency assumption rather than a general trend. The analyst's domain knowledge validates what the agent's structural reading cannot guarantee."
---

# Intent Notes — Guardrail 3

The senior analyst who built the quarterly model retired last month. The model still works. Numbers flow through the Assumptions layer, Named Range formulas calculate in the Calculation layer, and the Output layer produces a clean board deck. LaTeX verification documents confirm the complex formulas are mathematically correct. Everything that Guardrails 1 and 2 protect is intact.

But nobody can explain why the Year 3 COGS formula uses a declining efficiency factor. There is no record of whether that efficiency gain was based on a supplier contract, a manufacturing projection, or a negotiation target. The formula is `COGS_Pct_Y3 = COGS_Pct_Y2 - Inp_COGS_Efficiency` — mechanically clear, but business-silent. The Named Ranges tell you _what_ is being calculated. They do not tell you _why_.

In Lesson 5, you learned to verify that a formula is mathematically correct before committing it to a model. That guardrail ensures the formula does what the analyst intended. But LaTeX verification does not record the intention itself. If the analyst who wrote the formula leaves, the verified math survives — but the business reasoning behind it does not. Intent Notes close that gap. They are the third guardrail: the permanent audit trail that documents _why_ every AI-generated formula exists.

## What Is an Intent Note?

An Intent Note is a structured Excel Note (or Comment) attached to a cell containing a Named Range formula. It is not a general annotation. It follows a specific five-field format designed for one purpose: making the business intent behind a formula permanently visible, so that any reader — human or AI — can understand what the formula was designed to calculate without asking the person who wrote it.

The format:

```
INTENT:      [Plain-English rule this formula encodes]
FORMULA:     [LaTeX expression verified before writing]
ASSUMPTIONS: [Named Ranges this formula depends on]
GENERATED:   [Date / session identifier]
MODIFIED:    [Date and modifier — updated on each change]
```

Each field serves a distinct purpose in the audit trail:

| Field           | What It Records                                | Why It Matters                                                                                                         |
| --------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **INTENT**      | The business rule in plain English             | An auditor reads this first — it tells them what the formula is _supposed_ to do, without reading the formula itself   |
| **FORMULA**     | The LaTeX-verified mathematical expression     | Cross-references with the Guardrail 2 verification — confirms the math was checked before writing                      |
| **ASSUMPTIONS** | The Named Ranges the formula depends on        | Traces the dependency chain — if any assumption changes, every formula listing it in ASSUMPTIONS is flagged for review |
| **GENERATED**   | When the formula was first created             | Establishes provenance — was this formula built during the original model construction or added later?                 |
| **MODIFIED**    | When the formula was last changed, and by whom | The audit-critical field — when MODIFIED exists, it means the formula has been altered after its original creation     |

## Intent Notes in the GP Waterfall

In Lessons 3 and 4, you built the Gross Profit Waterfall with Named Range formulas. In Lesson 5, you verified the complex formulas in LaTeX. Now each formula gets an Intent Note that documents the business reasoning.

**Intent Note on `Revenue_Y2`:**

```
INTENT:      Year 2 Revenue equals Year 1 Revenue grown by the
             annual revenue growth rate assumption.
FORMULA:     Revenue(n) = Revenue(n-1) x (1 + g)
ASSUMPTIONS: Revenue_Y1, Inp_Rev_Growth
GENERATED:   2026-03-01 / IDFA-session-001
MODIFIED:    —
```

**Intent Note on `COGS_Pct_Y2`:**

```
INTENT:      Year 2 COGS percentage equals Year 1 COGS percentage
             reduced by the annual efficiency gain, reflecting scale
             improvements that lower cost per unit of revenue.
FORMULA:     COGS_Pct(n) = COGS_Pct(n-1) - efficiency_gain
ASSUMPTIONS: COGS_Pct_Y1, Inp_COGS_Efficiency
GENERATED:   2026-03-01 / IDFA-session-001
MODIFIED:    —
```

**Intent Note on `Gross_Profit_Y3`:**

```
INTENT:      Gross Profit equals Revenue minus Cost of Goods Sold.
             COGS is calculated as a percentage of Revenue, where the
             percentage declines each year by the efficiency gain factor.
FORMULA:     Gross_Profit = Revenue - COGS
ASSUMPTIONS: Revenue_Y3, COGS_Y3
GENERATED:   2026-03-01 / IDFA-session-001
MODIFIED:    —
```

Notice what each Intent Note achieves. The `COGS_Pct_Y2` note explains _why_ the percentage declines — scale improvements lowering cost per unit. That reasoning is now permanently attached to the cell. When the original analyst leaves, the logic stays.

## Why Divergence Is the Audit Trail

The real power of Intent Notes is not what they say when they are accurate. It is what they reveal when they are not.

Suppose six months from now, a colleague modifies the COGS efficiency assumption. Instead of a flat 1% annual improvement, they change it to a compounding formula: `COGS_Pct_Y2 = COGS_Pct_Y1 * (1 - Inp_COGS_Efficiency)`. The formula now compounds rather than subtracts. But the Intent Note still says "reduced by the annual efficiency gain" — a subtraction.

That divergence between the Intent Note and the formula is visible. An auditor reading the cell sees immediately that the documented intent (linear reduction) does not match the actual formula (compounding reduction). The mismatch does not tell the auditor which version is correct — but it tells them that something changed, and that the change needs investigation.

Without the Intent Note, the modification would be invisible. The formula would calculate. The numbers would flow. And nobody would know that the model's COGS logic had shifted from linear to compounding until the variance showed up in the quarterly results.

**The principle:** Intent Notes do not prevent modifications. They make modifications visible. And in financial modelling, visibility _is_ the audit trail.

## Generating Intent Notes with Claude

Writing Intent Notes by hand for every formula in a model would be tedious. The cowork pattern solves this: Claude generates the Intent Notes, and the analyst reviews them for accuracy.

Here is how this works with the GP Waterfall formulas you built in Lessons 3 and 4.

**Your prompt to Claude:**

```
Review the Calculation layer of the GP Waterfall model. For every
Named Range formula, generate an Intent Note using this format:

INTENT:      [Plain-English business rule]
FORMULA:     [LaTeX expression]
ASSUMPTIONS: [Named Ranges this formula depends on]
GENERATED:   [Today's date / current session]
MODIFIED:    —

Start with Revenue_Y1 and work through every formula in dependency order.
```

**Claude's response** includes Intent Notes for all twelve formulas in the model — Revenue (Y1-Y3), COGS_Pct (Y1-Y3), COGS (Y1-Y3), and Gross_Profit (Y1-Y3). Each note follows the format. Each lists the correct Named Range dependencies.

**Your review** checks three things for every generated note:

1. **Is the INTENT field accurate?** Does the plain-English description match what the formula actually does, including the business reasoning? Claude correctly identifies the arithmetic but may miss contextual reasoning — for example, it might say "COGS percentage decreases by 1%" without explaining that this represents scale efficiency.

2. **Is the ASSUMPTIONS field complete?** Does it list every Named Range the formula reads? For simple formulas this is straightforward. For formulas with indirect dependencies, Claude may miss a link.

3. **Is the FORMULA field consistent with the LaTeX verification from Lesson 5?** The LaTeX in the Intent Note should match the verified expression, not a new rendering.

This is the cowork pattern at its most productive. Claude produces twelve Intent Notes in seconds. Your domain knowledge catches the nuances the agent's structural reading misses. The result is faster and more accurate than either party working alone.

## Exercise: Write Intent Notes for Three Formulas

Apply what you have learned. Write complete Intent Notes for these three formulas from the GP Waterfall:

**Formula 1:** `Revenue_Y2 = Revenue_Y1 * (1 + Inp_Rev_Growth)`

**Formula 2:** `COGS_Pct_Y2 = COGS_Pct_Y1 - Inp_COGS_Efficiency`

**Formula 3:** `Gross_Profit_Y3 = Revenue_Y3 - COGS_Y3`

For each formula, write the Intent Note yourself first. Then ask Claude to generate one for the same formula. Compare the two. Where do they differ? Does Claude's version include business context you omitted? Does your version include domain reasoning Claude missed?

The goal is not to produce identical notes. The goal is to understand what each party contributes to the final audit record.

## The Business Bottom Line: Institutional Memory

When a formula and its Intent Note agree, the model is self-documenting. When they diverge, the divergence is visible. Either way, the business logic is permanently recorded at the cell level — not in a separate document that drifts, not in an email that gets deleted, not in the analyst's memory that walks out the door.

Intent Notes are institutional memory. They answer the question every finance team dreads: "The analyst who built this model left. Can anyone explain how it works?" With Intent Notes, the answer is yes — because the explanation is attached to every formula, in a structured format that both human auditors and AI agents can read.

For audit firms, Intent Notes transform the verification process. Instead of manually tracing every formula back to its business rule — which is what auditors spend weeks doing on coordinate-based models — the auditor reads the INTENT field, compares it to the formula, and flags any divergence. The audit moves from reconstruction to verification.

## Capability Preview: Logic De-compilation

In the capstone lesson (Lesson 11), you will validate all five Finance Domain Agent capabilities. Capability 3 is Logic De-compilation: the agent reads an unfamiliar model's formulas and Intent Notes, then reconstructs the complete business logic as a structured narrative.

Intent Notes make this capability possible. Without them, the agent can only report the arithmetic — "this cell equals that cell minus that cell." With Intent Notes, the agent can report the business logic — "Gross Profit is calculated as Revenue minus COGS, where COGS declines annually due to scale efficiency gains documented in the COGS percentage Intent Note."

The Intent Notes you write in this lesson become the input to that capability test. The quality of the documentation determines the quality of the de-compilation.

## Try With AI

:::tip Setup
Open Claude in Excel (or any Claude interface) with the GP Waterfall model from Lessons 3-4 available. If you do not have the model built, you can describe the formulas to Claude and work from the descriptions.
:::

**Prompt 1 — Generate an Intent Note for a specific formula:**

```
Here is a Named Range formula from my GP Waterfall model:

Revenue_Y2 = Revenue_Y1 * (1 + Inp_Rev_Growth)

Generate a complete Intent Note using this format:
INTENT: [plain-English business rule]
FORMULA: [LaTeX expression]
ASSUMPTIONS: [Named Ranges this formula depends on]
GENERATED: [today's date / this session]
MODIFIED: —

Explain your reasoning for the INTENT field.
```

**What you are learning:** How Claude infers business intent from Named Range structure. The agent reads the variable names and formula pattern to construct the plain-English description. Review whether the INTENT field captures the _why_ (growth assumption) or only the _what_ (multiplication).

**Prompt 2 — Review an existing Intent Note for accuracy:**

```
Here is an Intent Note I wrote for a formula in my GP Waterfall:

INTENT:      COGS percentage for Year 2 is lower than Year 1.
FORMULA:     COGS_Pct(n) = COGS_Pct(n-1) - efficiency_gain
ASSUMPTIONS: COGS_Pct_Y1
GENERATED:   2026-03-01

Review this Intent Note. Is the INTENT field specific enough for
an auditor? Is the ASSUMPTIONS field complete? What is missing?
```

**What you are learning:** How to use Claude as a quality reviewer for your own documentation. The Intent Note above has two deliberate problems: the INTENT field says _what_ happens (lower) but not _why_ (scale efficiency), and the ASSUMPTIONS field is missing `Inp_COGS_Efficiency`. See whether Claude catches both.

**Prompt 3 — Compare a documented formula with an undocumented one:**

```
I have two formulas from two different financial models.

Formula A (with Intent Note):
Formula: Gross_Profit_Y3 = Revenue_Y3 - COGS_Y3
INTENT: Gross Profit equals Revenue minus COGS, where COGS
        declines annually due to scale efficiency.
ASSUMPTIONS: Revenue_Y3, COGS_Y3

Formula B (no Intent Note, coordinate-based):
=B14-(C14*$F$8)

For each formula, tell me:
1. What business rule does this formula encode?
2. What assumptions does it depend on?
3. How confident are you in your answers?
```

**What you are learning:** The difference in agent capability between a documented IDFA formula and an undocumented coordinate-based formula. Claude will answer Formula A with high confidence and specificity. For Formula B, it will describe the arithmetic but qualify that it cannot determine the business intent. This contrast demonstrates why Intent Notes exist.

## Flashcards Study Aid

<Flashcards />

---

**Next:** [Lesson 7: MCP Dependency — Guardrail 4](./07-mcp-dependency.md) — the final guardrail that ensures every number an agent reports comes from the model's deterministic calculation, never from the agent's internal arithmetic.
