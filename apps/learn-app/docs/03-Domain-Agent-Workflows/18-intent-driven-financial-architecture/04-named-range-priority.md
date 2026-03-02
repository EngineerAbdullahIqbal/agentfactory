---
sidebar_position: 4
title: "Named Range Priority — Guardrail 1"
description: "Build the GP Waterfall Calculation layer using zero coordinate references — every formula reads as a plain-English business rule that survives row insertions, team handovers, and AI interpretation without a single cell click"
keywords:
  [
    "Named Range",
    "Guardrail 1",
    "IDFA",
    "GP Waterfall",
    "Calculation layer",
    "coordinate-free formulas",
    "Revenue",
    "COGS",
    "Gross Profit",
    "layer isolation",
    "Excel Named Ranges",
    "formula maintenance",
    "Claude in Excel",
    "financial modelling",
    "business rules",
  ]
chapter: 18
lesson: 4
duration_minutes: 25

skills:
  - name: "Named Range Formula Construction"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can write all twelve GP Waterfall calculation formulas using only Named Ranges, with zero coordinate references, and explain why each formula reads as a business rule"

  - name: "Layer Isolation Compliance"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Analyze"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can identify layer isolation violations — hardcoded constants in the Calculation layer, direct Assumptions-to-Output references — and correct them by moving values to the appropriate layer"

  - name: "AI-Assisted Formula Compliance Verification"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can prompt Claude in Excel to scan a range of formulas, identify coordinate references, and confirm that every formula passes the Named Range compliance test"

learning_objectives:
  - objective: "Construct all twelve GP Waterfall calculation formulas using exclusively Named Range references, producing formulas that read as plain-English business rules"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student builds the Calculation layer in Excel; every formula references only Named Ranges; no coordinate addresses appear in any formula bar"

  - objective: "Analyse a formula containing a hardcoded constant and explain why it violates layer isolation, then correct the violation by creating a Named Range in the Assumptions layer"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Given the formula =Revenue_Y1 * 0.60, student identifies 0.60 as a layer violation, creates Inp_COGS_Pct_Y1 in the Assumptions layer, and rewrites the formula as =Revenue_Y1 * COGS_Pct_Y1"

  - objective: "Use Claude in Excel to verify that a set of formulas contains zero coordinate references and follows the Inp_ and Variable_Dimension naming conventions"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student prompts Claude to scan all Calculation layer formulas; Claude confirms zero violations or identifies specific cells to fix"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "The compliance test (read without clicking)"
    - "Twelve GP Waterfall calculation formulas"
    - "Layer isolation violations and their correction"
    - "Naming conventions (Inp_ prefix vs Variable_Dimension)"
    - "Silent breakage elimination through Named Ranges"
  assessment: "5 new concepts at B1 level. Students already understand the three-layer model and Named Range creation from L03, so this lesson focuses on applying those concepts to build a complete Calculation layer. Within the B1 ceiling of 7-10 concepts."

differentiation:
  extension_for_advanced: "Add a fourth year (Y4) to the GP Waterfall. Revenue_Y4 uses the same growth rate; COGS_Pct_Y4 uses the same efficiency gain. Then add an Operating Expenses line with its own Named Range assumptions and calculate EBITDA for all four years."
  remedial_for_struggling: "Focus on the first four formulas only (Revenue_Y1 through Revenue_Y3 and COGS_Pct_Y1). Build them one at a time with Claude, confirming each formula passes the compliance test before moving to the next. The pattern is identical for the remaining eight."
---

# Named Range Priority — Guardrail 1

In Lesson 3, you built the Assumptions layer of the GP Waterfall — every input lives in one place, every input has a Named Range, and no calculations exist in that layer. Now you build the Calculation layer. The rule is absolute: no cell addresses. Every formula must read as a sentence.

This is Guardrail 1 of the Intent-Driven Financial Architecture, and it has a simple compliance test. Select any formula in the Calculation layer. If you can understand what it calculates without clicking on any referenced cell, it passes. If you need to navigate to understand it, it fails. That single test separates formulas that survive team handovers, row insertions, and AI interpretation from formulas that silently break the moment someone edits a row above them.

## The Compliance Test

Here is what failure looks like:

```
=B14-(C14*$F$8)
```

To understand this formula, you must click B14, then C14, then F8. You are reading coordinates, not logic. Now here is the same calculation after Named Range Priority:

```
=Revenue_Y2 - (Revenue_Y2 * COGS_Pct_Y2)
```

No clicking required. The formula is the business rule. Revenue Year 2 minus Revenue Year 2 times COGS Percentage Year 2. Anyone reading it — a colleague, an auditor, or an AI agent — understands the intent immediately.

## The Twelve GP Waterfall Formulas

Your Assumptions layer from L03 contains these Named Ranges:

| Named Range           | Description                             | Example Value |
| --------------------- | --------------------------------------- | ------------- |
| `Inp_Rev_Y1`          | Base year revenue                       | 10,000,000    |
| `Inp_Rev_Growth`      | Annual revenue growth rate              | 0.10          |
| `Inp_COGS_Pct_Y1`     | Base year COGS as percentage of revenue | 0.60          |
| `Inp_COGS_Efficiency` | Annual COGS percentage improvement      | 0.01          |

From those four assumptions, you build twelve calculation formulas. Every one reads as a business rule:

**Revenue (3 formulas)**

```
Revenue_Y1 = Inp_Rev_Y1
Revenue_Y2 = Revenue_Y1 * (1 + Inp_Rev_Growth)
Revenue_Y3 = Revenue_Y2 * (1 + Inp_Rev_Growth)
```

Year 1 revenue equals the base input. Year 2 revenue equals Year 1 grown by the growth rate. Year 3 follows the same pattern. Read each formula aloud — it is a complete English sentence.

**COGS Percentage (3 formulas)**

```
COGS_Pct_Y1 = Inp_COGS_Pct_Y1
COGS_Pct_Y2 = COGS_Pct_Y1 - Inp_COGS_Efficiency
COGS_Pct_Y3 = COGS_Pct_Y2 - Inp_COGS_Efficiency
```

The COGS percentage starts at the base assumption and improves by the efficiency gain each year. Again, the formula is the explanation.

**COGS Dollars (3 formulas)**

```
COGS_Y1 = Revenue_Y1 * COGS_Pct_Y1
COGS_Y2 = Revenue_Y2 * COGS_Pct_Y2
COGS_Y3 = Revenue_Y3 * COGS_Pct_Y3
```

Cost of goods sold equals revenue times the COGS percentage for that year. No ambiguity. No cell addresses.

**Gross Profit (3 formulas)**

```
Gross_Profit_Y1 = Revenue_Y1 - COGS_Y1
Gross_Profit_Y2 = Revenue_Y2 - COGS_Y2
Gross_Profit_Y3 = Revenue_Y3 - COGS_Y3
```

Gross profit equals revenue minus cost of goods sold. The formula is the definition.

:::tip The Pattern

Every formula in the Calculation layer follows one of two patterns:

1. **Direct assignment** from an Assumptions input: `Revenue_Y1 = Inp_Rev_Y1`
2. **Arithmetic on Named Ranges** already defined: `Gross_Profit_Y2 = Revenue_Y2 - COGS_Y2`

No third pattern exists. If your formula does not match one of these two, something is wrong.

:::

## The Common Mistake: Hardcoded Constants

You might be tempted to write:

```
COGS_Y1 = Revenue_Y1 * 0.60
```

This formula has zero coordinate references. It uses a Named Range for revenue. It looks compliant. It is not.

The value `0.60` is a hardcoded constant — an assumption hiding inside the Calculation layer. This violates layer isolation. If someone changes the COGS percentage assumption in the Assumptions layer, this formula will not update. You now have two sources of truth, and the model will produce wrong answers silently.

**The fix:** Move `0.60` to the Assumptions layer as `Inp_COGS_Pct_Y1`. Then write:

```
COGS_Pct_Y1 = Inp_COGS_Pct_Y1
COGS_Y1 = Revenue_Y1 * COGS_Pct_Y1
```

Every constant in a formula is a violation. Every number that is not the result of a Named Range calculation must live in Layer 1.

:::warning Naming Convention

Named Ranges cannot contain spaces. Use underscores:

| Correct           | Incorrect         |
| ----------------- | ----------------- |
| `Inp_Rev_Y1`      | `Inp Rev Y1`      |
| `COGS_Pct_Y2`     | `COGS Pct Y2`     |
| `Gross_Profit_Y3` | `Gross Profit Y3` |

Excel will reject a name with spaces. If you try to create one, you will get an error message. Underscores are universal across Excel, Google Sheets, and every AI agent that reads formulas.

:::

## Exercise: Build the GP Waterfall Calculation Layer

Continue the workbook from L03 where you created the Assumptions layer with four Named Ranges.

**Step 1.** Create a section below or beside your Assumptions layer labelled "Calculations."

**Step 2.** Enter the twelve formulas above, one at a time. For each formula:

- Type the formula using only Named Ranges
- After entering it, click the cell and read the formula bar
- Apply the compliance test: can you understand it without clicking any referenced cell?

**Step 3.** Create Named Ranges for each calculated result. Select the Revenue Year 1 cell, click the Name Box, type `Revenue_Y1`, press Enter. Repeat for all twelve cells.

**Step 4.** Verify the numbers. With the example assumptions (Revenue 10M, Growth 10%, COGS 60%, Efficiency 1%):

|                  | Year 1     | Year 2     | Year 3     |
| ---------------- | ---------- | ---------- | ---------- |
| **Revenue**      | 10,000,000 | 11,000,000 | 12,100,000 |
| **COGS %**       | 60%        | 59%        | 58%        |
| **COGS $**       | 6,000,000  | 6,490,000  | 7,018,000  |
| **Gross Profit** | 4,000,000  | 4,510,000  | 5,082,000  |

If your numbers match, your Calculation layer is correct and compliant.

**Step 5.** Ask Claude in Excel to verify compliance:

```
Scan all formulas in my Calculation layer. Report any formula that
contains a cell coordinate reference (like B14, $F$8, or C3:C10)
instead of a Named Range. List the cell, the formula, and what
Named Range should replace the coordinate.
```

Claude will scan every formula and confirm zero violations — or identify the specific cells to fix.

## Why This Matters: Silent Breakage Elimination

In a coordinate-based model, inserting a row above your formulas shifts every cell reference. The formula `=B14-C14` becomes `=B15-C15` — and if Excel's automatic adjustment guesses wrong, or if a mixed reference like `$F$8` does not shift when it should, the model produces wrong numbers without any error message.

Named Range formulas are immune to this. `Revenue_Y2` always points to the cell named `Revenue_Y2`, regardless of where that cell sits in the grid. Insert rows, delete columns, move entire sections — the formula still resolves correctly. Formula maintenance drops to near zero because there is nothing positional to maintain.

This is why Guardrail 1 is the foundation of IDFA. The other three guardrails — LaTeX Verification, Intent Notes, and MCP Dependency — all assume that formulas are already Named Range compliant. Without Guardrail 1, the others cannot function.

## Try With AI

:::tip Setup

Open your GP Waterfall workbook in Excel with Claude in Excel (or Cowork) active. You should have the Assumptions layer from L03 and the Calculation layer you just built.

:::

**Prompt 1 — Rewrite coordinate formulas to Named Range equivalents:**

```
I have a legacy financial model section with these formulas:

Cell D8:  =B8*(1+$F$2)
Cell D9:  =D8*C9
Cell D10: =D8-D9

B8 is Revenue Year 1, F2 is the growth rate, C9 is the COGS percentage
for Year 2, D8 is Revenue Year 2, D9 is COGS Year 2.

Rewrite each formula using Named Ranges following IDFA conventions.
For each formula, show the before and after, and confirm the after
version passes the compliance test (understandable without clicking
any cell).
```

**What you are learning:** How to translate coordinate formulas into Named Range equivalents. This is the core conversion skill you will need in L08 when you retrofit entire legacy models. Claude maps each coordinate to its business meaning, then reconstructs the formula using that meaning as the reference.

**Prompt 2 — Compliance check for coordinate violations:**

```
Scan every formula in my Calculation layer (cells [your range]).
For each formula, report:
1. The cell location
2. The formula
3. PASS if it contains only Named Range references
4. FAIL if it contains any coordinate reference (A1-style or R1C1)

Summarise: total formulas checked, total PASS, total FAIL.
If any FAIL, show what Named Range should replace each coordinate.
```

**What you are learning:** How to use an AI agent as a compliance auditor. In a real finance team, this prompt runs after every model edit session. The agent checks every formula against Guardrail 1 in seconds — a task that would take a human analyst minutes per formula in a large model.

**Prompt 3 — Naming convention review:**

```
Review all Named Ranges in this workbook. For each one, check:
1. Does it follow the Inp_ prefix convention for Assumptions layer inputs?
2. Does it follow the Variable_Dimension convention for Calculation results?
3. Does it contain spaces (which Excel disallows but could appear as
   underscores that look like spaces)?
4. Is the name self-documenting (would someone unfamiliar with the model
   understand what it represents)?

List any naming violations and suggest corrections.
```

**What you are learning:** How to enforce naming discipline across an entire workbook. Naming conventions are what make Named Range formulas readable as English sentences. Without consistent conventions, `Rev1` and `Revenue_Y1` might coexist in the same model — creating confusion that Named Ranges were supposed to eliminate.

## Flashcards Study Aid

<Flashcards />

---

**Next:** [Lesson 5: LaTeX Verification — Guardrail 2](./05-latex-verification.md) — where you learn to verify complex formulas (WACC, NPV, Terminal Value) in mathematical notation before committing them to the model.
