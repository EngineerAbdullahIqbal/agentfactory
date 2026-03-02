---
sidebar_position: 11
title: "The Five Capabilities — Capstone"
description: "Formally validate all five Finance Domain Agent capabilities — Intent Synthesis, Deterministic What-If, Logic De-compilation, Strategic Goal-Seeking, and Stochastic Simulation — on the GP Waterfall model built throughout the chapter, extended with OpEx and EBITDA"
keywords:
  [
    "IDFA",
    "Finance Domain Agent",
    "five capabilities",
    "Intent Synthesis",
    "Deterministic What-If",
    "Logic De-compilation",
    "Goal-Seeking",
    "Stochastic Simulation",
    "Monte Carlo",
    "MCP",
    "GP Waterfall",
    "EBITDA",
    "Named Range",
    "capstone",
    "validation",
    "write_cell",
    "read_cell",
    "production-ready",
  ]
chapter: 18
lesson: 11
duration_minutes: 45

skills:
  - name: "Finance Domain Agent Capability Validation"
    proficiency_level: "B2"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can execute all five Finance Domain Agent capability tests on an IDFA-compliant model, determine whether each test passes or fails, and explain why a failure indicates a deployment problem rather than a model problem"

  - name: "MCP-Mediated Model Iteration"
    proficiency_level: "B2"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can design and execute goal-seeking and Monte Carlo simulation workflows where every calculation passes through the Excel engine via MCP, collecting results across multiple iterations without internal agent arithmetic"

  - name: "IDFA Model Extension"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can extend the GP Waterfall with new line items (OpEx, EBITDA) following IDFA conventions — new Named Ranges in the Assumptions layer, new formulas in the Calculation layer, strict layer isolation maintained"

learning_objectives:
  - objective: "Execute the five Finance Domain Agent capability tests and evaluate whether each test produces a pass or fail result against the defined criteria"
    proficiency_level: "B2"
    bloom_level: "Evaluate"
    assessment_method: "Student runs all five tests on the extended GP Waterfall; each test produces a documented pass/fail with evidence (MCP logs, read_cell confirmations, distribution statistics)"

  - objective: "Design and run a goal-seeking iteration where the agent finds a required input value by writing and reading Named Ranges through MCP until a target output is reached"
    proficiency_level: "B2"
    bloom_level: "Create"
    assessment_method: "Student prompts the agent to find Year 1 Revenue for a target Year 3 EBITDA; agent reaches the target through MCP iteration; final read_cell confirms the output equals the target"

  - objective: "Extend the GP Waterfall model with Operating Expenses and EBITDA lines following IDFA layer isolation and naming conventions"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student adds Inp_OpEx_Y1 and Inp_OpEx_Growth to the Assumptions layer, builds OpEx and EBITDA formulas in the Calculation layer using only Named Ranges, and verifies numbers against expected values"

cognitive_load:
  new_concepts: 7
  concepts_list:
    - "The five capability tests as a formal validation framework"
    - "Intent Synthesis — converting plain-English to full IDFA spec"
    - "Deterministic What-If — write_cell/read_cell verification loop"
    - "Logic De-compilation — reconstructing business rules from formulas"
    - "Strategic Goal-Seeking — iterative input search via MCP"
    - "Stochastic Simulation — Monte Carlo via MCP iteration"
    - "OpEx and EBITDA extension of the GP Waterfall"
  assessment: "7 concepts at B2 level. Students have built the full GP Waterfall, applied all four guardrails, installed the IDFA skill, and designed governance across Lessons 1-10. This capstone synthesises those skills into formal validation. The five capabilities are structurally parallel (same test pattern: prompt, execute via MCP, verify), reducing effective cognitive load despite the concept count."

differentiation:
  extension_for_advanced: "Run Capability 5 with 500 scenarios instead of 100, adding a third variable (Inp_OpEx_Growth) to the probability distribution. Analyse whether OpEx growth uncertainty has a larger or smaller impact on EBITDA than revenue growth uncertainty. Present the results as a tornado chart showing sensitivity rankings."
  remedial_for_struggling: "Focus on Capabilities 1 and 2 only. For Intent Synthesis, use the exact intent statement provided and verify the agent's output against the expected Named Ranges listed in the lesson. For Deterministic What-If, change one variable and confirm the agent reads back the result rather than calculating it. The remaining three capabilities follow the same MCP pattern."
---

# The Five Capabilities — Capstone

You have built the model. You have applied the guardrails. You have installed the skill and designed the governance. One question remains: does it actually work?

The five Finance Domain Agent capability tests are the formal validation — the proof that your IDFA deployment produces the agent capabilities the methodology promises. Each test isolates a specific capability and verifies it against a defined pass criterion. A deployment that passes all five is production-ready for agent-assisted financial workflows. A deployment that fails any one of them has a specific, diagnosable problem that traces back to the architecture.

This is the difference between theory and production. In Lessons 1 through 10, you learned what IDFA is and how to build it. In this lesson, you prove it works.

## Extending the GP Waterfall

Before running the five tests, you need two additional line items in your model. The GP Waterfall from Lesson 4 calculates Revenue, COGS, and Gross Profit. Production financial models include operating expenses and earnings before interest, taxes, depreciation, and amortisation. Add them now.

**New Assumptions (Layer 1):**

| Named Range       | Description               | Value     |
| ----------------- | ------------------------- | --------- |
| `Inp_OpEx_Y1`     | Year 1 operating expenses | 5,000,000 |
| `Inp_OpEx_Growth` | Annual OpEx growth rate   | 0.05      |

**New Calculation Formulas (Layer 2):**

```
OpEx_Y1     = Inp_OpEx_Y1
OpEx_Y2     = OpEx_Y1 * (1 + Inp_OpEx_Growth)
OpEx_Y3     = OpEx_Y2 * (1 + Inp_OpEx_Growth)

EBITDA_Y1   = Gross_Profit_Y1 - OpEx_Y1
EBITDA_Y2   = Gross_Profit_Y2 - OpEx_Y2
EBITDA_Y3   = Gross_Profit_Y3 - OpEx_Y3
```

Every formula follows the same two patterns from Lesson 4: direct assignment from an assumption, or arithmetic on Named Ranges already defined. No coordinate references. No hardcoded constants.

**Verify the numbers** with the original assumptions (Revenue 10M, Growth 10%, COGS 60%, Efficiency 1%, OpEx 5M, OpEx Growth 5%):

|                  | Year 1      | Year 2     | Year 3     |
| ---------------- | ----------- | ---------- | ---------- |
| **Revenue**      | 10,000,000  | 11,000,000 | 12,100,000 |
| **COGS**         | 6,000,000   | 6,490,000  | 7,018,000  |
| **Gross Profit** | 4,000,000   | 4,510,000  | 5,082,000  |
| **OpEx**         | 5,000,000   | 5,250,000  | 5,512,500  |
| **EBITDA**       | (1,000,000) | (740,000)  | (430,500)  |

The EBITDA is negative because operating expenses exceed gross profit at this scale. That is correct for these assumptions — the model is working. The goal-seeking test in Capability 4 will find the revenue needed to make EBITDA positive.

## Capability 1 — Intent Synthesis

**What it tests:** Can the agent convert a plain-English intent statement into a fully structured, three-layer IDFA model specification?

**Test procedure:**

Provide an intent statement the agent has not seen before. The agent must produce the complete model specification — every Named Range, every formula, in IDFA notation — before writing anything to Excel.

**Run this test:**

Give your agent the following intent statement:

```
"Build a quarterly revenue model for a SaaS company. Year 1 quarterly
revenue starts at $500K. Revenue grows 8% quarter-over-quarter. Customer
acquisition cost is 15% of quarterly revenue. Net revenue equals quarterly
revenue minus acquisition cost. Project four quarters."
```

**Pass criteria:**

- Zero coordinate references in the proposed specification
- All inputs prefixed with `Inp_` (e.g., `Inp_Quarterly_Rev_Q1`, `Inp_QoQ_Growth`, `Inp_CAC_Pct`)
- All calculations readable as plain-English business rules
- Three-layer separation maintained (Assumptions, Calculations, Output)
- Complete specification produced before any `write_cell()` call

**What a passing response looks like:** The agent produces a document listing every Named Range with its layer, its formula or value, and the business rule it encodes. You can read the specification and understand the entire model without opening Excel.

## Capability 2 — Deterministic What-If

**What it tests:** Does the agent use MCP for all calculation, or does it perform arithmetic internally?

**Test procedure:**

Ask the agent a what-if question on your extended GP Waterfall. After it responds, ask it to verify by reading back each affected Named Range via `read_cell()`.

**Run this test:**

```
"What happens to Year 3 EBITDA if I change OpEx growth from 5% to 10%?"
```

After the agent responds, follow up:

```
"Verify your answer. Read back OpEx_Y2, OpEx_Y3, and EBITDA_Y3 from
the model using read_cell(). Do the numbers match what you just reported?"
```

**Pass criteria:**

- Agent uses `write_cell()` to set `Inp_OpEx_Growth = 0.10`
- Agent uses `read_cell()` to retrieve each affected value
- Reported answer and verified answer match exactly — not approximately
- No instance of the agent reporting a number before reading it from the model

**What failure looks like:** The agent says "Year 3 EBITDA would be approximately negative $1.73 million" before calling `read_cell()`. That "approximately" reveals internal arithmetic. The deterministic guarantee requires the number to come from Excel, not from the agent.

## Capability 3 — Logic De-compilation

**What it tests:** Can the agent reconstruct the business logic of an unfamiliar model from its formulas alone?

**Test procedure:**

Hide the Assumptions sheet in your workbook (right-click the sheet tab, select "Hide"). The agent now has access only to the Calculations sheet via MCP.

```
"I've hidden the Assumptions sheet. Using only the Calculations sheet,
produce a complete IDFA Logic Map: every Named Range you can find, its
current value, and the business rule encoded in its formula. Identify
which values are inputs and which are calculations."
```

**Pass criteria:**

- Agent uses `inspect_model()` to read all formulas
- Agent correctly identifies inputs (values without formulas) versus calculations (values with formulas)
- Fewer than 5% of identified business rules are incorrect or missing
- Agent produces a structured Logic Map in Named Range notation

**What a passing response looks like:** The agent produces a table listing every Named Range, categorised as Input or Calculation, with the business rule written in plain English. For example: "Revenue_Y2 = Revenue_Y1 \* (1 + Inp_Rev_Growth). Business rule: Year 2 revenue is Year 1 revenue grown by the annual growth rate."

## Capability 4 — Strategic Goal-Seeking

**What it tests:** Can the agent find a required input value by iterating through the model via MCP?

**Test procedure:**

Ask the agent to find the Year 1 Revenue needed for Year 3 EBITDA to equal exactly $3,000,000. The agent must iterate — it cannot solve this algebraically because the model has cascading dependencies (Revenue drives COGS which drives Gross Profit which drives EBITDA).

```
"Find the Year 1 Revenue needed for Year 3 EBITDA to equal exactly
$3,000,000. Use write_cell() and read_cell() only — do not calculate
the answer internally. Show me each iteration."
```

**Pass criteria:**

- Agent iterates `write_cell(Inp_Rev_Y1, value)` followed by `read_cell(EBITDA_Y3)` multiple times
- Each iteration adjusts the input based on the previous result
- Final `read_cell(EBITDA_Y3)` confirms the output equals $3,000,000 (within rounding tolerance)
- Agent reports the required `Inp_Rev_Y1` value from the model, not from calculation

**What the iteration looks like:** The agent might start with `Inp_Rev_Y1 = 5,000,000`, read back EBITDA_Y3, find it too low, try `7,000,000`, find it too high, and converge through successive adjustments. The exact path depends on the agent's search strategy, but every number must come from `read_cell()`.

## Capability 5 — Stochastic Simulation

**What it tests:** Can the agent orchestrate Monte Carlo simulation across an IDFA model entirely through MCP?

**Test procedure:**

Ask the agent to run scenarios with probability distributions for two assumptions, collecting EBITDA_Y3 after each iteration.

```
"Run 100 scenarios where Inp_Rev_Growth varies uniformly between 5%
and 15% and Inp_COGS_Efficiency varies uniformly between 0.5% and 1.5%.
For each scenario, write both values via MCP, let Excel recalculate,
then read back EBITDA_Y3. After all 100 scenarios, report the mean,
median, P10, and P90 of EBITDA_Y3."
```

**Pass criteria:**

- 100 MCP iterations completed (each with `write_cell` for both inputs, then `read_cell` for the output)
- Results collected from `read_cell()` after each iteration
- Distribution statistics (mean, median, P10, P90) calculated from the collected results
- No internal simulation — every EBITDA_Y3 value came from Excel via MCP

**Why 100 instead of 500:** Start with 100 scenarios to verify the workflow runs correctly. Once confirmed, scale to 500 for production-grade results. The mechanism is identical — only the iteration count changes.

:::tip Understanding the Results

Monte Carlo output is a distribution, not a single number. The mean tells you the expected outcome. The P10 and P90 tell you the range within which 80% of outcomes fall. If P10 is deeply negative and P90 is strongly positive, your model has high sensitivity to those assumptions — and that insight is actionable for the CFO.

:::

## The Capstone Exercise

Run all five capabilities in sequence on your extended GP Waterfall. Document each test with its result.

**Step 1 — Intent Synthesis.** Use the SaaS quarterly revenue intent statement above. Verify the agent produces a complete IDFA specification before writing to Excel.

**Step 2 — Deterministic What-If.** Change `Inp_OpEx_Growth` to 0.10. Verify the agent writes via MCP and reads back the result. Confirm reported and verified numbers match exactly.

**Step 3 — Logic De-compilation.** Hide the Assumptions sheet. Ask the agent to reconstruct the full Logic Map from the Calculations sheet only. Unhide the Assumptions sheet and compare the agent's Logic Map against the actual model.

**Step 4 — Strategic Goal-Seeking.** Find the `Inp_Rev_Y1` needed for `EBITDA_Y3 = $3,000,000`. Document the iteration path. Verify the final answer via `read_cell()`.

**Step 5 — Stochastic Simulation.** Run 100 scenarios with the distributions specified above. Record the mean, median, P10, and P90 of Year 3 EBITDA.

**Scoring:** Each capability is pass/fail. A production-ready IDFA deployment passes all five. If any capability fails, the failure traces to a specific architectural issue: missing Named Ranges (Capability 1), internal agent arithmetic (Capability 2), incomplete model inspection (Capability 3), unreliable MCP iteration (Capability 4), or insufficient iteration control (Capability 5).

## The Business Bottom Line

These five tests are not academic exercises. They are the proof of deployment. When a CFO asks whether the IDFA investment is working, these tests provide the answer. Each test validates a specific capability that the finance team will use in production: generating new model sections from plain-English requests, running what-if scenarios with deterministic certainty, auditing unfamiliar models, finding break-even inputs, and stress-testing assumptions across probability distributions.

Pass all five and the deployment is production-ready. Fail any one and you have a specific, actionable diagnosis for what to fix.

## Try With AI

:::tip Setup

Open your extended GP Waterfall workbook (with OpEx and EBITDA) in Excel with Claude in Excel (or Cowork) active. The agent must have MCP access to read and write cells.

:::

**Prompt 1 — Intent Synthesis test:**

```
Here is a new intent statement: "Build a debt service model. The company
has a $5M term loan at 6% annual interest, repaid in equal annual
instalments over 5 years. Calculate annual interest expense, principal
repayment, and remaining balance for each year. All inputs must be
Named Ranges. All formulas must read as business rules."

Produce a complete IDFA model specification with all Named Ranges and
formulas before writing anything to Excel. Show the three-layer
structure: Assumptions, Calculations, Output.
```

**What you are learning:** How to evaluate whether an agent can translate business intent into a structured, IDFA-compliant model specification. The quality indicator is completeness: every input named, every formula readable, every layer separated. This is the capability that replaces the hours an analyst spends manually structuring a new model section.

**Prompt 2 — Goal-seeking test:**

```
Find the Year 1 Revenue needed for Year 3 EBITDA to equal exactly
$3,000,000. Use write_cell() and read_cell() only — do not calculate
internally. Show me each iteration: what value you wrote to Inp_Rev_Y1,
what you read back from EBITDA_Y3, and why you chose the next value.
```

**What you are learning:** How to verify that an agent performs goal-seeking through model iteration rather than internal arithmetic. The deterministic guarantee of Guardrail 4 (MCP Dependency) means every number comes from Excel. If the agent skips `read_cell()` at any point, the guarantee is broken — and you now know how to detect that.

**Prompt 3 — Monte Carlo setup:**

```
Run 100 scenarios where Inp_Rev_Growth varies uniformly between 5% and
15% and Inp_COGS_Efficiency varies between 0.5% and 1.5%. For each
scenario, write both values via write_cell(), let Excel recalculate,
then read EBITDA_Y3 via read_cell(). After all 100 scenarios, report
mean, median, P10, and P90 for Year 3 EBITDA.
```

**What you are learning:** How to orchestrate Monte Carlo simulation through MCP. The agent does not simulate internally — it runs each scenario through the actual Excel model. This means the simulation honours every formula, every dependency, and every guardrail in the model. The distribution statistics tell the CFO not just what EBITDA might be, but how confident the team should be in that estimate.

## Flashcards Study Aid

<Flashcards />

---

**Next:** [Chapter Quiz](./12-chapter-quiz.md) — 50 questions covering all eleven lessons, from the Coordinate Trap through the Five Capabilities.
