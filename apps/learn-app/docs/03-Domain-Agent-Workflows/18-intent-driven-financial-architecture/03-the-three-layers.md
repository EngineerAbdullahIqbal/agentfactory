---
sidebar_position: 3
title: "The Three Layers"
description: "Learn to structure any financial model using IDFA's three layers — Assumptions, Calculations, and Output — with Named Range isolation that makes every formula readable, auditable, and AI-operable"
keywords:
  [
    "IDFA",
    "three layers",
    "Named Ranges",
    "Assumptions layer",
    "Calculations layer",
    "Output layer",
    "financial model architecture",
    "Inp_ prefix",
    "layer separation",
    "Intent-Driven Financial Architecture",
    "Gross Profit Waterfall",
    "Excel Named Ranges",
    "model structure",
  ]
chapter: 18
lesson: 3
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "IDFA Layer Separation"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can classify any cell in a financial model into the correct IDFA layer and explain why mixing layers creates fragility"

  - name: "Named Range Creation and Naming Conventions"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can create a Named Range in Excel, apply the correct naming convention prefix, and verify that the range is accessible in formulas"

  - name: "Intent Statement Decomposition"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Analyze"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can extract every assumption from a plain-English intent statement, assign each assumption to a Named Range with the correct prefix, and verify completeness against the original statement"

learning_objectives:
  - objective: "Structure any financial model into three isolated layers — Assumptions (inputs only), Calculations (Named Range formulas only), and Output (presentation only) — and explain why each layer must remain separate"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a mixed-layer model, student correctly classifies every cell into Layer 1, 2, or 3 and identifies at least two isolation violations"

  - objective: "Create Named Ranges in Excel using the IDFA naming conventions, applying the correct prefix for inputs, calculations, aggregates, and ratios"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student creates four Named Ranges from a given intent statement, each with the correct prefix and dimension suffix, and demonstrates that the ranges are usable in formulas"

  - objective: "Decompose a plain-English intent statement into a complete set of named assumptions for the Assumptions layer, with no missing inputs and no embedded calculations"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Given a new intent statement, student extracts all assumptions, names them correctly, and the agent confirms zero missing inputs"

cognitive_load:
  new_concepts: 7
  concepts_list:
    - "Layer 1 — Assumptions (inputs only, no calculations)"
    - "Layer 2 — Calculations (Named Ranges only, no cell addresses)"
    - "Layer 3 — Output (presentation only, reads from Layer 2)"
    - "The isolation rule (changing Layer 1 cannot break Layer 2)"
    - "Named Ranges in Excel (Name Box method)"
    - "Naming conventions (Inp_, Variable_Yn, Variable_Total, Variable_Pct)"
    - "Intent statement decomposition (extracting assumptions from prose)"
  assessment: "7 concepts at B1 level, within the 7-10 ceiling. Students already understand Formula Rot and the Coordinate-First vs Logic-First distinction from Lessons 1-2, reducing prerequisite load. Each concept is introduced in sequence with the three layers presented first, then Named Ranges as the mechanism, then naming conventions as the discipline."

differentiation:
  extension_for_advanced: "After completing the exercise, add a Year 4 projection to the GP Waterfall by creating two new Named Ranges (Revenue_Y4, Gross_Profit_Y4) that extend the existing pattern. Verify that every new formula references only Named Ranges and that the Output layer updates automatically."
  remedial_for_struggling: "Focus on Layer 1 only. Create just two Named Ranges — Inp_Rev_Y1 and Inp_Rev_Growth — and verify that you can type =Inp_Rev_Y1 in any cell and get the correct value. If you can create a Named Range and reference it in a formula, you understand the core mechanism this lesson teaches."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "IDFA Methodology — Three Layers"
  key_points:
    - "Every IDFA-compliant model has exactly three layers and they must remain separate — mixing layers is the root cause of Formula Rot"
    - "Layer 1 contains inputs only, Layer 2 contains logic only, Layer 3 contains presentation only — no exceptions"
    - "Named Ranges are the mechanism that makes layer separation enforceable — a formula reading Inp_Rev_Y1 does not break when rows move"
    - "The naming convention is not cosmetic — Inp_ prefix tells any reader and any agent which values are user-modifiable assumptions"
    - "Intent statement decomposition is the first step of every IDFA model build — extract assumptions before writing any formula"
  misconceptions:
    - "Students may think the three layers require three separate Excel tabs — layers can be on separate tabs or on separate sections of one tab, as long as they remain functionally isolated"
    - "Students may think Named Ranges are an advanced Excel feature — creating one takes five seconds via the Name Box"
    - "Students may think layer separation is about organisation — it is about correctness, because Layer 2 formulas that reference names instead of positions cannot be broken by structural changes"
  discussion_prompts:
    - "Think of a model you have used where changing one input produced unexpected results in an unrelated part of the model. Would layer separation have prevented that?"
    - "When you hand a model to a colleague, what is the first thing they need to know? How would Named Ranges change that conversation?"
  teaching_tips:
    - "The concept box on Named Ranges is essential — students must create at least one Named Range before the exercise or they will struggle with the mechanics"
    - "Emphasise the isolation rule as the payoff: Layer 2 reads names, not positions, so structural changes to Layer 1 cannot break Layer 2"
  assessment_checks:
    - question: "What are IDFA's three layers, and what does each layer contain?"
      expected_response: "Layer 1 (Assumptions) contains inputs only — every user-modifiable value, each assigned a Named Range with the Inp_ prefix. Layer 2 (Calculations) contains logic only — every formula references Named Ranges, never cell addresses. Layer 3 (Output) contains presentation only — it reads from Layer 2 and performs no calculations."
    - question: "Why does the isolation rule work?"
      expected_response: "Layer 2 formulas read Named Ranges, not cell positions. When you insert rows, move cells, or reorganise the Assumptions layer, the Named Range names do not change — so the formulas that reference them continue to work correctly. This is why changing a Layer 1 input can never break a Layer 2 formula."
    - question: "What is the naming convention for an input assumption versus an annual calculation?"
      expected_response: "Input assumptions use the Inp_ prefix (e.g., Inp_Rev_Y1, Inp_COGS_Pct_Y1). Annual calculations use the pattern Variable_Yn (e.g., Revenue_Y2, Gross_Profit_Y3). This lets any reader immediately distinguish inputs from derived values."
---

# The Three Layers

In Lesson 2, you saw the difference between a formula that reads `=B14-(C14*$F$8)` and one that reads `=Revenue_Y3 - COGS_Y3`. The first is a coordinate. The second is a business rule. Now you will learn the architecture that makes the second kind of formula possible — and makes the first kind unnecessary.

A CFO gives you a one-paragraph description of what she wants modelled: a three-year Gross Profit Waterfall with revenue growing at 10% and COGS improving by one percentage point annually. That paragraph contains four assumptions, three years of calculations, and an output table. Your job is to turn that prose into a structured, layered model where every formula explains itself and every input is named. IDFA gives you the architecture to do it systematically — and by the end of this lesson, you will have built the Assumptions layer of that model.

## Three Layers, Three Rules

Every IDFA-compliant model has exactly three layers. They must remain separate. No exceptions.

**Layer 1 — Assumptions (Inputs Only).** Every value that a user can change lives here and nowhere else. Each input gets a Named Range before any formula references it. No calculations occur in this layer. If you see a formula in Layer 1, something is wrong.

**Layer 2 — Calculations (Logic Only).** Every formula reads Named Ranges only — zero cell-address references. Every formula must be readable as a plain-English sentence. No hardcoded values; all constants come from Layer 1. If you see `=B14*0.60` in Layer 2, the `0.60` should be a Named Range in Layer 1.

**Layer 3 — Output (Presentation Only).** Reads from Layer 2 only. Never from Layer 1 directly. Performs no calculations — display, formatting, and charts only. If you see arithmetic in Layer 3, it belongs in Layer 2.

The three layers can live on separate Excel tabs or on separate sections of one tab. What matters is functional isolation, not physical location. The important thing is that each layer does exactly one job.

### The Isolation Rule

Here is the architectural payoff: **changing a Layer 1 input can never break a Layer 2 formula**. Why? Because Layer 2 reads names, not positions. When you insert a row in the Assumptions tab, move a cell, or reorganise the layout entirely, the Named Range `Inp_Rev_Y1` still points to the correct value. The formula `=Inp_Rev_Y1 * (1 + Inp_Rev_Growth)` does not care where `Inp_Rev_Y1` lives in the grid. It only cares what it is called.

This is what separates IDFA from conventional modelling. In a coordinate-based model, structural changes break formulas silently. In an IDFA-compliant model, structural changes cannot break formulas at all — because the formulas were never connected to the structure in the first place.

| Property                       | Coordinate-First               | IDFA (Logic-First)                     |
| ------------------------------ | ------------------------------ | -------------------------------------- |
| Formula reads                  | Cell addresses (B14, $F$8)     | Named Ranges (Revenue_Y3, COGS_Pct_Y2) |
| Row insertion breaks formulas? | Often — silently               | Never — names survive moves            |
| New analyst reads formula?     | Must trace every cell          | Reads as business rule                 |
| AI agent reads formula?        | Sees positions, guesses intent | Sees intent directly                   |

---

> **CONCEPT BOX: What Is a Named Range?**
>
> A **Named Range** is an Excel feature that assigns a human-readable name to a cell or range of cells. Instead of referring to cell B4 as `B4`, you give it a name like `Inp_Rev_Y1` — and every formula in the workbook can reference that name.
>
> **How to create one (5 seconds):**
>
> 1. Select the cell you want to name
> 2. Click the **Name Box** — the small field at the top-left of the spreadsheet that shows the current cell address (e.g., "B4")
> 3. Type the name you want (e.g., `Inp_Rev_Y1`)
> 4. Press **Enter**
>
> That cell is now named. You can type `=Inp_Rev_Y1` in any cell on any tab, and Excel will return the value from that cell.
>
> **Alternative method:** Go to the Formulas tab and click Define Name. This opens a dialog where you can set the name, scope, and add a comment.
>
> **Why Named Ranges survive model changes:** A Named Range is stored as a definition (`Inp_Rev_Y1 = Sheet1!$B$4`). When you insert rows or move cells, Excel updates the definition automatically. The name itself never changes — so every formula referencing that name continues to work.

---

## Naming Conventions

Naming conventions are not cosmetic. They are the system that lets any reader — human or AI — instantly distinguish an input from a calculation, a yearly figure from a total, and a ratio from an absolute value.

| Category                | Prefix / Pattern | Example                                    | What it tells the reader                    |
| ----------------------- | ---------------- | ------------------------------------------ | ------------------------------------------- |
| Input assumptions       | `Inp_`           | `Inp_Rev_Y1`, `Inp_COGS_Pct_Y1`            | This is a user-modifiable input             |
| Annual calculations     | `Variable_Yn`    | `Revenue_Y1`, `COGS_Y2`, `Gross_Profit_Y3` | This is a derived value for a specific year |
| Multi-period aggregates | `Variable_Total` | `Revenue_Total`, `EBITDA_Total`            | This summarises across all periods          |
| Ratios and margins      | `Variable_Pct`   | `Gross_Margin_Pct_Y2`, `EBITDA_Margin_Pct` | This is a percentage or ratio               |

**Rules that prevent confusion:**

- Use underscores only — no spaces, no hyphens
- Include the dimension (year, quarter, period) in every periodic variable
- Prefix all assumptions with `Inp_` so any reader can distinguish inputs from calculations at a glance
- Keep names under 64 characters (Excel's limit for Named Ranges)

The `Inp_` prefix is the most important convention. When you see `Inp_Rev_Growth` in a formula, you know immediately that this value comes from the Assumptions layer and can be changed by the user. When you see `Revenue_Y2`, you know this is calculated — do not overwrite it with a hardcoded number.

## From Intent Statement to Assumptions Layer

Every IDFA model build starts the same way: someone describes what they want in plain English, and you extract every assumption before writing a single formula. This is **intent statement decomposition** — the skill that turns prose into structure.

Here is the intent statement for the model you will build:

> _"Project a 3-year Gross Profit Waterfall. Year 1 Revenue is $10M, growing 10% year over year. COGS starts at 60% of Revenue but improves by 1 percentage point each year due to economies of scale."_

Read that paragraph carefully. How many assumptions does it contain? Four:

| Assumption                  | Named Range           | Value      | Why this name                                  |
| --------------------------- | --------------------- | ---------- | ---------------------------------------------- |
| Year 1 Revenue              | `Inp_Rev_Y1`          | 10,000,000 | `Inp_` = input, `Rev` = revenue, `Y1` = year 1 |
| Revenue growth rate         | `Inp_Rev_Growth`      | 0.10       | No year suffix because it applies to all years |
| Year 1 COGS percentage      | `Inp_COGS_Pct_Y1`     | 0.60       | `Pct` = percentage, `Y1` = starting year       |
| Annual COGS efficiency gain | `Inp_COGS_Efficiency` | 0.01       | No year suffix because it applies uniformly    |

Notice what is not here: there is no `Revenue_Y2`, no `Gross_Profit_Y3`, no formula of any kind. Those belong in Layer 2. The Assumptions layer contains only the raw inputs — the numbers that a user can change to test a different scenario.

---

> **CONCEPT BOX: What Is a Gross Profit Waterfall?**
>
> A **Gross Profit Waterfall** shows how Revenue turns into Gross Profit after subtracting Cost of Goods Sold (COGS). It is called a "waterfall" because each step flows down from the previous one:
>
> **Revenue** minus **COGS** equals **Gross Profit**
>
> In a multi-year projection, you see the waterfall across years — how revenue grows, how COGS percentage changes, and how those two forces combine to produce the gross profit trend.
>
> Gross Profit is the first profitability line item on any income statement. Everything else — operating expenses, interest, tax — comes after it. If Gross Profit is wrong, everything below it is wrong too.

---

## Exercise: Build the Assumptions Layer

Open Excel (or Claude in Excel via Cowork) and build the Assumptions layer for the GP Waterfall.

**Step 1 — Create the four Named Ranges:**

1. In cell B2, type `10000000`. Click the Name Box, type `Inp_Rev_Y1`, press Enter.
2. In cell B3, type `0.10`. Name it `Inp_Rev_Growth`.
3. In cell B4, type `0.60`. Name it `Inp_COGS_Pct_Y1`.
4. In cell B5, type `0.01`. Name it `Inp_COGS_Efficiency`.

**Step 2 — Verify the names work:**

In any empty cell, type `=Inp_Rev_Y1` and press Enter. It should return `10000000`. Do the same for each name. If any returns a `#NAME?` error, the Named Range was not created correctly — go back to the Name Box and check.

**Step 3 — Have the agent verify layer separation:**

If you are working in Claude in Excel (via Cowork), type:

```
Review my Assumptions layer. Confirm that:
1. All four Named Ranges exist and have correct values
2. No cell in this layer contains a formula — only constants
3. All names follow the Inp_ prefix convention
```

The agent should confirm all three checks. If it flags a formula in your Assumptions layer, move it — formulas belong in Layer 2, which you will build in Lesson 4.

**What you have built:** A clean Assumptions layer with four named inputs. Every formula in the Calculations layer (Lesson 4) will reference these names. When someone changes `Inp_Rev_Y1` from $10M to $12M, every downstream calculation will update automatically — and no formula will break, because no formula references a cell position.

## The Business Bottom Line

Model handover is one of the most expensive activities in corporate finance — not because it is technically complex, but because every handover requires reconstructing the model logic from cell addresses. With IDFA's three layers and naming conventions, a new analyst opens the model, reads `=Revenue_Y2 * COGS_Pct_Y2`, and understands the business rule without a walkthrough. Onboarding time drops from days to minutes. The model explains itself.

## Capability Preview: Intent Synthesis

What you did manually in this lesson — reading an intent statement and extracting four assumptions — is exactly what a Finance Domain Agent does automatically. In Lesson 11, you will see the agent take an intent statement it has never seen, decompose it into Named Ranges, propose the complete three-layer structure, and wait for your approval before writing anything to the model. That capability is called **Intent Synthesis**, and it is the first of five Finance Domain Agent capabilities you will validate. The foundation you built today — understanding what belongs in Layer 1 and how to name it — is what lets you evaluate whether the agent got it right.

## Try With AI

Use these prompts in Claude in Excel (via Cowork) or your preferred AI assistant.

### Prompt 1: Extract Assumptions from an Intent Statement

```
Here is an intent statement for a financial model:

"Build a 2-year operating expense forecast. Year 1 headcount
is 50 employees at an average salary of $85,000. Headcount
grows 20% in Year 2. Benefits cost 25% of total salary.
Office rent is $500,000 per year, fixed."

Extract every assumption from this statement. For each one,
give me the Named Range name (using IDFA Inp_ convention),
the value, and which part of the sentence it comes from.

Then tell me: did I miss any assumptions that would be needed
to complete the model?
```

**What you're learning:** Intent statement decomposition is a pattern, not a talent. Every assumption in the prose becomes an `Inp_` Named Range. The agent's ability to identify missing assumptions trains you to write more complete intent statements — which produce better models on the first try.

### Prompt 2: Verify Layer Isolation

```
I have a financial model with these formulas:

Cell D10: =B4*1.10
Cell D11: =D10*0.60
Cell D12: =D10-D11

Check this model for IDFA compliance. Specifically:
1. Are there any hardcoded values that should be Named Ranges?
2. Are there any cell-address references that should be Named
   Range references?
3. Which layer does each cell belong to, and are the layers
   properly separated?

Rewrite the formulas so they are IDFA-compliant.
```

**What you're learning:** Layer isolation violations are easy to create and hard to spot — especially hardcoded numbers like `1.10` and `0.60` that look like "just the formula." Training your eye to catch embedded constants is the first step toward building models where every assumption is visible and changeable.

### Prompt 3: Review Naming Conventions

```
I created these Named Ranges for my model:

- rev_year1 = 10000000
- growth = 0.10
- cogs percent = 0.60
- efficiency_gain = 0.01
- Revenue Y2 = formula
- GP_Y1 = formula

Review each name against IDFA naming conventions. For each
one that does not comply, explain the violation and suggest
the correct name.
```

**What you're learning:** Naming conventions enforce consistency across models and teams. When every model in an organisation uses `Inp_Rev_Y1` instead of `rev_year1` or `Revenue Year 1`, any analyst and any agent can read any model without relearning the naming scheme. The discipline of consistent naming is what makes IDFA scale from one model to an entire finance department.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 4: Named Range Priority — Guardrail 1 →](./04-named-range-priority.md)
