---
sidebar_position: 8
title: "Retrofitting Existing Models"
description: "Convert legacy coordinate-based financial models to IDFA compliance using a systematic five-phase process — inspect, identify inputs, order dependencies, rewrite formulas one at a time, and validate that every output matches the original"
keywords:
  [
    "IDFA retrofit",
    "financial model conversion",
    "Named Range migration",
    "legacy model rescue",
    "coordinate to logic-first",
    "formula rewriting",
    "dependency ordering",
    "model validation",
    "Intent-Driven Financial Architecture",
    "inspect_model",
  ]
chapter: 18
lesson: 8
duration_minutes: 35

# HIDDEN SKILLS METADATA
skills:
  - name: "Retrofit Coordinate-Based Models to IDFA Compliance"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can take a coordinate-based financial model, execute the five-phase conversion process, and produce an IDFA-compliant model where every formula reads as a business rule and all outputs match pre-retrofit values"

  - name: "Map Formula Dependencies for Safe Rewriting"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can use inspect_model() output to build a dependency graph, identify which calculations depend on which inputs, and determine the correct rewriting order that prevents broken references during conversion"

  - name: "Validate Retrofitted Model Integrity"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can run a retrofitted model on original inputs, compare every output to pre-retrofit values, and correctly classify any discrepancy as either an original model error surfaced by the retrofit or an inference error requiring correction"

learning_objectives:
  - objective: "Execute the five-phase IDFA retrofit process on a coordinate-based model — inspect, identify inputs, order dependencies, rewrite formulas, and validate outputs"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student converts at least three calculations in a coordinate-based model to IDFA compliance, following dependency order, and demonstrates that all outputs match pre-retrofit values"

  - objective: "Analyse formula dependencies to determine the correct rewriting order, ensuring no dependent formula is rewritten before its dependencies"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Student produces a dependency map from inspect_model() output and explains why a specific rewriting sequence is correct while an alternative sequence would produce errors"

  - objective: "Distinguish between original model errors surfaced by a retrofit and inference errors introduced during conversion, and apply the correct response to each"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a validation discrepancy, student correctly identifies whether the cause is an original error or a conversion error, and describes the appropriate next step for each case"

cognitive_load:
  new_concepts: 7
  concepts_list:
    - "Five-phase retrofit process as a systematic workflow"
    - "Input identification — distinguishing raw values from formula cells"
    - "Dependency ordering — rewriting in topological order"
    - "One-formula-at-a-time rewriting discipline"
    - "Output validation against pre-retrofit baseline"
    - "Distinguishing original model errors from inference errors"
    - "The transparency-not-improvement principle"
  assessment: "7 concepts at B1 level — within the 7-10 cognitive limit for this tier. Students enter with four guardrails from L04-L07 and have seen Named Range formulas built from scratch. This lesson applies those skills to an existing model, which is a new context requiring dependency analysis and validation discipline."

differentiation:
  extension_for_advanced: "Take a model with 20+ formulas and retrofit the entire Calculation layer. Track how many original model errors the retrofit surfaces. Document each one with the symptom that would have gone undetected in the coordinate-based version."
  remedial_for_struggling: "Start with a model containing only 5 formulas. Focus on Phase 2 (input identification) and Phase 4 (formula rewriting) for just one formula. Confirm the output matches before attempting a second formula. Build confidence with single-formula success before scaling."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Implementation — Retrofitting Legacy Models"
  key_points:
    - "The five phases must be followed in order: Inspect → Identify Inputs → Order Dependencies → Rewrite Formulas → Validate. Skipping phases causes errors that compound."
    - "The critical principle is transparency, not improvement. Never change business logic during a retrofit. Make the existing logic readable first; improvements come after."
    - "Dependency ordering prevents the most common retrofit failure — rewriting a formula before its inputs have Named Ranges, which produces broken references."
    - "Validation against pre-retrofit values is not optional. Every output must match exactly. Discrepancies reveal either original errors or conversion errors, and the response to each is different."
  misconceptions:
    - "Students may want to 'fix' formulas they find during the retrofit — the rule is transparency first, improvements after. Changing logic during conversion makes it impossible to validate that the retrofit preserved the original model's behavior."
    - "Students may try to retrofit all formulas at once instead of one at a time — this eliminates the ability to isolate which rewrite caused a validation failure."
    - "Students may assume that deleting the old model and rebuilding from scratch is faster — it is not, because the original model contains embedded business decisions that are lost if not systematically extracted."
  discussion_prompts:
    - "Think about a model you inherited. If you had to explain every formula to a new team member, how long would it take? How would that change if every formula read as a business rule?"
    - "When you discover an error in an existing model during a retrofit, what is the right process — fix it immediately, or document it and complete the retrofit first? Why?"
  teaching_tips:
    - "Walk through the cowork example live — let students see Claude propose Named Ranges and rewrite formulas one at a time, with validation after each step"
    - "Emphasize that the 'one formula at a time' discipline is what makes the process safe — if validation fails after rewriting formula 7, you know exactly which formula to check"
    - "The 40-minute business claim is realistic for a model with 20-30 formulas once students have practiced the workflow"
  assessment_checks:
    - question: "What are the five phases of the IDFA retrofit process?"
      expected_response: "Phase 1: Full Inspection via inspect_model(). Phase 2: Input Identification — distinguish raw values from formula cells and propose Inp_ Named Ranges. Phase 3: Dependency Ordering — determine which calculations depend on which inputs and establish rewriting order. Phase 4: Formula Rewriting — rewrite each formula one at a time in dependency order, using Named Ranges, with validation after each. Phase 5: Validation — run on original inputs and confirm every output matches pre-retrofit values."
    - question: "Why must you never change business logic during a retrofit?"
      expected_response: "The objective of a retrofit is transparency — making existing logic readable by replacing coordinates with Named Ranges. If you change the logic at the same time, you cannot validate that the retrofit preserved the original model's behavior. Any output difference could be the intended improvement or an accidental error, and you cannot tell which. Improvements happen after the logic is readable and validated."
    - question: "What does it mean when a validation discrepancy appears after a retrofit?"
      expected_response: "It means either the original model contained an error that the retrofit surfaced — because the business rule is now visible and the error is obvious — or the retrofitted formula has an inference error where the Named Range rewrite does not correctly reproduce the original calculation. The response is different: original errors are documented and discussed with the analyst; inference errors are corrected and re-validated."
---

# Retrofitting Existing Models

In Lessons 4 through 7, you learned to build IDFA-compliant models from scratch — every formula using Named Ranges, every complex calculation verified in LaTeX, every AI-generated formula carrying an Intent Note, every result flowing through MCP. Building from scratch is the ideal. But most financial professionals do not have the luxury of starting with a blank sheet.

You inherited a model. It is 47 tabs, 2,000 formulas, and zero documentation. The person who built it left two years ago. Your manager needs modifications by Friday. This is the reality for most finance teams — and the reason "I inherited this model" is one of the most dreaded sentences in corporate finance. The model works. Probably. But nobody can explain why it works, which formulas encode which business rules, or whether the assumptions are still current. Every modification is a gamble.

IDFA's retrofitting process turns this situation into a systematic workflow. You do not delete the model and start over. You do not guess at what the formulas mean. You use a five-phase process that extracts the business logic that is trapped in coordinates, converts it to Named Range formulas that read as business rules, and validates that every output matches the original — all without changing a single business decision. The inherited model becomes readable. The 40-minute estimate is realistic once you have practiced the workflow on a few models.

## The Five-Phase Retrofit Process

The retrofit is a conversion, not a rebuild. The distinction matters. Rebuilding means constructing a new model from your understanding of the business. Retrofitting means making the existing model's logic visible without altering it. The five phases must be executed in order.

### Phase 1 — Full Inspection

Before touching any formula, you need a complete inventory. Use `inspect_model()` to produce the full picture.

```
inspect_model()
```

**Output:**

```
Named Ranges: 0 defined
Formulas: 47 cells containing formulas
Hardcoded Values: 12 cells containing raw numbers
Dependencies:
  B14 → references B4, C14, F8, D3
  B15 → references B14, C15
  B16 → references B15, D16, F8
  ...
```

This output tells you three things: how many Named Ranges already exist (usually zero in legacy models), which cells contain formulas versus raw values, and which cells depend on which others. All three are required for the next phases.

### Phase 2 — Input Identification

Separate the inputs from the calculations. The rule is simple.

| Cell Type       | How to Identify                   | What It Becomes                |
| --------------- | --------------------------------- | ------------------------------ |
| **Input**       | Contains a raw number, no formula | Named Range with `Inp_` prefix |
| **Calculation** | Contains a formula                | Named Range formula in Phase 4 |

For each input, you need three things:

1. **What it represents** — look at row headers, column headers, proximity to other values
2. **The proposed Named Range** — following the `Inp_` convention: `Inp_Rev_Y1`, `Inp_COGS_Pct_Y1`, `Inp_Tax_Rate`
3. **Analyst confirmation** — confirm your interpretation with someone who knows the model before committing the name

This phase is where you discover how much institutional knowledge is trapped in the model. A cell containing `0.60` in column C might be a COGS percentage, a tax rate, or a discount factor. The coordinate tells you nothing. The header (if it exists) tells you something. The analyst who built the model would know instantly — but they are gone. This is exactly the problem IDFA solves permanently: once the input is named `Inp_COGS_Pct_Y1`, the question never needs to be asked again.

### Phase 3 — Dependency Ordering

Before rewriting any formula, you must determine the order. The rule is strict: never rewrite a dependent formula before its dependencies.

**Why order matters:** If formula B15 references B14, and you rewrite B15 first using a Named Range that B14 does not yet have, the formula breaks. Rewrite B14 first — assign its Named Range — and then B15 can reference it safely.

The dependency map from Phase 1 gives you the ordering. Start from the bottom:

```
Level 0 (inputs):     Inp_Rev_Y1, Inp_COGS_Pct_Y1, Inp_Rev_Growth
Level 1 (direct):     Revenue_Y1 = Inp_Rev_Y1
                      COGS_Pct_Y1 = Inp_COGS_Pct_Y1
Level 2 (derived):    Revenue_Y2 = Revenue_Y1 * (1 + Inp_Rev_Growth)
                      COGS_Y1 = Revenue_Y1 * COGS_Pct_Y1
Level 3 (dependent):  Gross_Profit_Y1 = Revenue_Y1 - COGS_Y1
```

Rewrite Level 0 first (assign input Named Ranges), then Level 1, then Level 2, and so on. Each formula you rewrite can reference any Named Range from previous levels because those names already exist.

### Phase 4 — Formula Rewriting

This is the core of the retrofit. For each formula, in dependency order, follow these seven steps:

1. **Read the original** via `read_formula()`
2. **State the business rule** in plain English
3. **Write the IDFA equivalent** using Named Ranges
4. **LaTeX-verify** if the formula involves WACC, IRR, NPV, DCF, or any multi-step calculation
5. **Confirm the output matches** the original value
6. **Write to the model** via `write_cell()`
7. **Attach an Intent Note**

Here is what this looks like for a single formula.

**Original (coordinate-based):**

```
Cell B14: =B4-(B4*C14)
```

**Step 1 — Read:**

```
read_formula("B14")
→ "=B4-(B4*C14)"
```

**Step 2 — State the business rule:**

"Gross Profit Year 1 equals Revenue Year 1 minus the product of Revenue Year 1 and COGS Percentage Year 1."

**Step 3 — Write the IDFA equivalent:**

```
Gross_Profit_Y1 = Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)
```

**Step 4 — LaTeX-verify:** This formula is a simple subtraction and multiplication. LaTeX verification is not required for formulas at this complexity level — reserve it for WACC, NPV, IRR, DCF, and other multi-step calculations.

**Step 5 — Confirm output matches:**

```
read_cell("Gross_Profit_Y1") → $4,000,000
Original B14 value:          → $4,000,000  ✓
```

**Step 6 — Write to model.** The Named Range formula replaces the coordinate formula.

**Step 7 — Attach Intent Note:**

```
INTENT:      Gross Profit Y1 = Revenue Y1 minus COGS Y1
             (COGS calculated as Revenue × COGS percentage)
FORMULA:     GP₁ = R₁ - (R₁ × COGS%₁)
ASSUMPTIONS: Revenue_Y1, COGS_Pct_Y1
GENERATED:   2026-03-02 / IDFA Retrofit
MODIFIED:    —
```

Then move to the next formula in dependency order. Repeat all seven steps.

:::warning The One-Formula Rule

Never retrofit by deleting the model and rebuilding it. Never rewrite multiple formulas simultaneously. Retrofit one formula at a time, validate the output after each rewrite, and only move to the next formula when the current one matches.

This discipline is what makes the process safe. If validation fails after rewriting formula 7, you know exactly which formula to investigate. If you rewrote formulas 5 through 12 as a batch, the failure could be in any of them.

:::

### Phase 5 — Validation

After all formulas are rewritten, run the model on its original inputs. Every output cell must produce exactly the same value as the pre-retrofit model.

| Output Cell     | Pre-Retrofit Value | Post-Retrofit Value | Match? |
| --------------- | ------------------ | ------------------- | ------ |
| Gross_Profit_Y1 | $4,000,000         | $4,000,000          | Yes    |
| Gross_Profit_Y2 | $4,510,000         | $4,510,000          | Yes    |
| Gross_Profit_Y3 | $5,082,200         | $5,082,200          | Yes    |
| EBITDA_Y3       | $3,200,000         | $3,185,000          | **No** |

When a discrepancy appears, it means one of two things:

**Original model error surfaced by the retrofit.** The coordinate-based formula had a bug — perhaps a cell reference that pointed to the wrong row after a past insertion. The retrofit exposed it because the business rule, now written in Named Ranges, does not match the coordinate formula's actual calculation. Document this finding. Discuss it with the analyst or model owner before deciding whether to correct it or preserve the original behavior.

**Inference error in the retrofit.** Your Named Range rewrite does not correctly reproduce the original formula's logic. Perhaps you misidentified which cell an input referred to, or you simplified a conditional that should not have been simplified. Correct the retrofitted formula and re-validate.

The distinction matters. Original model errors are discoveries. Inference errors are mistakes. Both produce discrepancies, but the response is different.

## Cowork: Retrofitting a Revenue Model

Here is what the five-phase process looks like when you and Claude work through it together on a small model. The model has five formulas calculating Revenue and Gross Profit for three years.

**Your request:**

```
I have a coordinate-based revenue model. Use inspect_model() to show
me what is in it, then walk me through converting it to IDFA compliance.
Do not change any business logic — just make the formulas readable.
```

**Claude's inspection:**

```
inspect_model() results:

Hardcoded values (inputs):
  B4: 10,000,000    (header: "Y1 Revenue")
  C5: 0.60          (header: "COGS %")
  C6: 0.10          (header: "Growth Rate")

Formulas:
  B5: =B4*C5                          (Y1 COGS)
  B6: =B4-B5                          (Y1 Gross Profit)
  C4: =B4*(1+C6)                      (Y2 Revenue)
  C7: =C4-(C4*C5)                     (Y2 Gross Profit)
  D4: =C4*(1+C6)                      (Y3 Revenue)

Dependencies:
  B5 → B4, C5
  B6 → B4, B5
  C4 → B4, C6
  C7 → C4, C5
  D4 → C4, C6
```

**Claude's proposed Named Ranges:**

```
I recommend these input Named Ranges:

  B4 → Inp_Rev_Y1          ($10,000,000 — Year 1 base revenue)
  C5 → Inp_COGS_Pct        (0.60 — COGS as percentage of revenue)
  C6 → Inp_Rev_Growth       (0.10 — annual revenue growth rate)

Do these interpretations look correct? I am inferring the meaning
from the column headers but want your confirmation before proceeding.
```

**Your confirmation:**

```
Correct. COGS percentage is the same all three years in this model
(it does not improve with scale — that is a simplification).
Proceed with the rewriting.
```

**Claude's dependency-ordered rewriting:**

```
Rewriting in dependency order:

Level 0: Input Named Ranges assigned ✓
  Inp_Rev_Y1 = 10,000,000
  Inp_COGS_Pct = 0.60
  Inp_Rev_Growth = 0.10

Level 1: Direct calculations
  Revenue_Y1 = Inp_Rev_Y1
  → read_cell("Revenue_Y1") = $10,000,000  ✓ (matches B4)

  COGS_Y1 = Revenue_Y1 * Inp_COGS_Pct
  → read_cell("COGS_Y1") = $6,000,000  ✓ (matches B5)

Level 2: Derived calculations
  Gross_Profit_Y1 = Revenue_Y1 - COGS_Y1
  → read_cell("Gross_Profit_Y1") = $4,000,000  ✓ (matches B6)

  Revenue_Y2 = Revenue_Y1 * (1 + Inp_Rev_Growth)
  → read_cell("Revenue_Y2") = $11,000,000  ✓ (matches C4)

Level 3: Further derived
  Gross_Profit_Y2 = Revenue_Y2 - (Revenue_Y2 * Inp_COGS_Pct)
  → read_cell("Gross_Profit_Y2") = $4,400,000  ✓ (matches C7)

  Revenue_Y3 = Revenue_Y2 * (1 + Inp_Rev_Growth)
  → read_cell("Revenue_Y3") = $12,100,000  ✓ (matches D4)

All 6 outputs match pre-retrofit values. Retrofit complete.
Intent Notes attached to all formula cells.
```

Notice what happened in this exchange. Claude inspected the model and proposed Named Ranges — but asked for your confirmation before proceeding. You provided domain knowledge that the COGS percentage is constant across years, which is something the coordinates alone could not reveal. Claude then rewrote each formula in strict dependency order, validating after each one. Neither of you could have done this as efficiently alone: Claude handled the systematic rewriting and validation; you provided the business context that coordinates hide.

## The Transparency Principle

One principle governs the entire retrofit process: **do not change business logic during a retrofit.**

This is counterintuitive. When you make the formulas readable, you will see things you want to fix — a growth rate that seems too high, a COGS assumption that has not been updated, a tax calculation that uses last year's rate. The temptation is to fix these while you are already in the model.

Resist it. The retrofit objective is transparency. You are converting coordinates to Named Ranges so that the existing logic becomes visible. If you also change the logic, you cannot validate the retrofit — any output difference could be your intended improvement or an accidental error, and you cannot distinguish between them.

The workflow is:

1. Retrofit for transparency (outputs must match)
2. Review the now-readable logic with stakeholders
3. Improve the logic in a separate, documented change

This separation is what makes IDFA retrofits trustworthy. The first step is provably lossless. The second step is an informed decision. Mixing them produces neither.

## Exercise: Retrofit Three Calculations

Take any existing Excel model you have access to — one you built, one you inherited, or a sample model from an online source. Select the three most important calculations (typically revenue, cost, and profit formulas).

**For each calculation, execute the five-phase process:**

1. **Inspect:** Identify all cells involved — which are inputs, which are formulas, what depends on what
2. **Name inputs:** Propose an `Inp_` Named Range for every raw value the calculation uses
3. **Order dependencies:** Determine which formulas must be rewritten first
4. **Rewrite:** Convert each formula to use Named Ranges, validate the output after each one
5. **Validate:** Confirm the final outputs match the original values exactly

**What to document:** For each formula you rewrite, record the original coordinate formula, the business rule it encodes, the Named Range equivalent, and whether the output matched. If any output does not match, classify the discrepancy as an original model error or an inference error, and explain your reasoning.

**The business bottom line:** The model you just worked on was a black box thirty minutes ago. Now its three most important calculations read as business rules. The analyst who inherits this model next will understand those formulas without clicking through cell references. That is what legacy model rescue looks like — not rebuilding, not guessing, but making the existing logic visible one formula at a time.

## Try With AI

Use these prompts in Claude in Excel or Cowork to practice the retrofit process.

### Prompt 1: Inspect a Model

```
Use inspect_model() to list all formulas in this spreadsheet.
For each cell that contains a raw number (no formula), tell me
what it likely represents based on its row/column headers.
For each cell that contains a formula, list its dependencies.
Then organize everything into two groups: Inputs and Calculations.
```

**What you are learning:** Phase 1 and Phase 2 of the retrofit process — the systematic separation of inputs from calculations. The agent's interpretations of what each input represents may be wrong (remember AI opacity from Lesson 1), which is why Phase 2 requires analyst confirmation before proceeding.

### Prompt 2: Propose Named Ranges

```
For each input you identified in the inspection, propose an
IDFA-compliant Named Range name following the Inp_ convention.
For each calculation, propose a descriptive Named Range that
reads as a business variable (e.g., Revenue_Y2, Gross_Profit_Y1).
Present your proposals in a table: Original Cell | Proposed Name | Reasoning.
```

**What you are learning:** The naming discipline that makes IDFA formulas self-documenting. The agent proposes names based on context clues, but you must verify each one — a cell the agent labels `Inp_Tax_Rate` might actually be a discount factor. Your domain knowledge is what makes the names accurate.

### Prompt 3: Validate a Retrofit

```
After rewriting these formulas with Named Ranges, verify that
all outputs match the original values exactly. For each output
cell, show me: (1) the original coordinate formula and its value,
(2) the new Named Range formula and its value, and (3) whether
they match. If any value does not match, explain whether this is
likely an error in the original model or an error in the retrofit.
```

**What you are learning:** Phase 5 — the validation discipline that makes retrofits trustworthy. The agent compares pre-retrofit and post-retrofit outputs systematically. When a discrepancy appears, the agent must reason about its cause rather than simply flagging it. This is where the transparency principle becomes concrete: if outputs match, the retrofit preserved the logic; if they do not, you have discovered something important.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 9: The IDFA Skill &rarr;](./09-the-idfa-skill.md)
