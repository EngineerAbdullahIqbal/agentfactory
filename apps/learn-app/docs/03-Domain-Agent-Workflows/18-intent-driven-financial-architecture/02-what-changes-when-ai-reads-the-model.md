---
sidebar_position: 2
title: "What Changes When AI Reads the Model"
description: "Discover the core distinction between Coordinate-First and Logic-First financial modelling by comparing how Claude analyses the same Gross Profit formula written two ways — coordinate references versus Named Ranges — and why the quality gap in AI analysis translates directly into a business capability gap"
keywords:
  [
    "coordinate-first",
    "logic-first",
    "Named Ranges",
    "IDFA",
    "Gross Profit formula",
    "AI readability",
    "financial modelling",
    "Claude in Excel",
    "formula intent",
    "business rules",
    "what-if analysis",
  ]
chapter: 18
lesson: 2
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Distinguish Coordinate-First from Logic-First Modelling"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain the difference between a coordinate-based formula and a Named Range formula, and describe why the Named Range version produces higher-quality AI analysis"

  - name: "Compare AI Analysis Quality Across Formula Styles"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can describe the specific differences in AI output — confidence, business context, actionability — when the same formula is expressed as coordinate references versus Named Ranges"

  - name: "Identify Agent Capability Gaps from Model Architecture"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can explain why coordinate-based models waste agent tokens on inference instead of analysis, and why IDFA-compliant models unlock capabilities like What-If analysis and Intent Synthesis"

learning_objectives:
  - objective: "Explain the Coordinate-First versus Logic-First distinction using the Gross Profit formula as a concrete example, and describe why the difference matters for AI agent analysis"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can write both versions of a Gross Profit formula and explain what information each version makes available to an AI agent"

  - objective: "Describe the quality gap in AI output when analysing coordinate-based versus Named Range formulas, using the dimensions of confidence, business context, and actionability"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can compare two AI responses — one from a coordinate formula, one from a Named Range formula — and identify which provides business insight versus mechanical description"

  - objective: "Explain why model architecture determines agent capability, and identify which IDFA capabilities (Intent Synthesis, What-If, Goal-Seeking) become possible only with Logic-First design"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can list at least two Finance Domain Agent capabilities that require Named Range formulas and explain why coordinate formulas block them"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Coordinate-First modelling — defining business logic by cell location"
    - "Logic-First modelling — defining business logic by Named Range labels"
    - "The AI analysis quality gap — hedged descriptions versus confident business analysis"
    - "Agent capability gap equals business capability gap — architecture determines what agents can do"
    - "Capability preview — Intent Synthesis, What-If, and Goal-Seeking require Logic-First design"
  assessment: "5 concepts at A2 level — within the 5-7 cognitive limit for this tier. Students enter from Lesson 1 with a clear understanding of Formula Rot and why coordinate formulas are problematic; this lesson adds the positive case for Logic-First design through direct comparison."

differentiation:
  extension_for_advanced: "Take a real financial model you work with. Find one formula and write it in both coordinate and Named Range form. Ask Claude to analyse each version. Compare the responses against the quality dimensions in this lesson (confidence, business context, actionability). Does the pattern hold?"
  remedial_for_struggling: "Focus on the two formula examples in the Concept Box. Copy both into a text file and read them aloud. Which one sounds like a sentence? Which one sounds like a grid reference? If you can explain why the sentence version helps an AI agent more than the grid reference, you have understood the core distinction."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "The Logic-First Paradigm"
  key_points:
    - "The same Gross Profit calculation written two ways produces categorically different AI analysis — not incrementally different, categorically different"
    - "Coordinate formulas force the agent to infer intent from position; Named Range formulas encode intent in the formula itself"
    - "The quality gap has three measurable dimensions: confidence (hedged vs definitive), business context (mechanical vs analytical), and actionability (description vs recommendation)"
    - "Agent capability gap equals business capability gap — coordinate models waste tokens on inference; IDFA models let agents spend tokens on insight"
  misconceptions:
    - "Students may think Named Ranges are just cosmetic — a readability improvement for humans. The lesson must demonstrate that Named Ranges change what the AI agent can do, not just how the formula looks"
    - "Students may assume the AI is 'smarter' on Named Range models. The AI is the same — the model gives it more information to work with"
    - "Students may think converting to Named Ranges is the whole IDFA methodology. Named Range Priority is Guardrail 1 of four — later lessons cover LaTeX Verification, Intent Notes, and MCP Dependency"
  discussion_prompts:
    - "Think about a time you inherited a spreadsheet from a colleague. How long did it take to understand what the formulas were doing? Would Named Ranges have changed that experience?"
    - "If an AI agent gives you a hedged answer about a formula ('this appears to subtract something from something'), would you trust that analysis in a board presentation? What about a definitive answer that names the business rule?"
  teaching_tips:
    - "The side-by-side comparison is the core of this lesson — ensure students read both AI responses carefully and notice the qualitative difference, not just the length difference"
    - "The business bottom line connects model architecture to real costs. If students are sceptical about Named Ranges, the token-spend argument often resonates: coordinate models make agents do inference work that IDFA models eliminate"
    - "Preview the five capabilities lightly — students should know What-If and Intent Synthesis are coming, but this lesson does not teach them"
  assessment_checks:
    - question: "Write the Gross Profit formula in coordinate form and in Named Range form."
      expected_response: "Coordinate: =B14-(B14*$C$3). Named Range: =Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1). The coordinate version references cell positions; the Named Range version reads as a business rule."
    - question: "What three dimensions distinguish the AI analysis of a coordinate formula from the AI analysis of a Named Range formula?"
      expected_response: "Confidence (hedged guesses vs definitive statements), business context (mechanical cell descriptions vs business rule explanations), and actionability (what-the-formula-does vs what-you-can-do-with-it — including what-if suggestions)."
    - question: "Why does agent capability gap equal business capability gap?"
      expected_response: "When an agent spends tokens inferring what a formula means from cell positions, it cannot spend those tokens on business analysis, what-if scenarios, or audit recommendations. The model architecture determines what the agent can do — and what the agent can do determines what the business gets from its AI investment."
---

# What Changes When AI Reads the Model

> _"The formula is the same calculation. The architecture is the difference between an agent that describes your spreadsheet and an agent that analyses your business."_

In Lesson 1, you saw Formula Rot from the inside: coordinate references that break silently, logic that diffuses across dozens of cells, and a reverse-engineering burden that grows every time the model changes hands. You understand the problem. Now you will see what changes when the problem is solved.

This lesson puts two analysts in the same room with the same model and the same question. One analyst's model uses coordinate references. The other analyst's model has been converted to Named Ranges. Both ask Claude the same question: "Explain the Gross Profit formula." The answers they receive are not incrementally different. They are categorically different — in confidence, in business context, and in actionability. That gap is the reason IDFA exists, and it is the gap that every remaining lesson in this chapter works to close.

---

:::info Concept Box: Coordinate-First vs Logic-First

**Coordinate-First modelling** defines business logic by location. The formula `=B14-(C14*$F$8)` means "the value in B14 minus the product of C14 and F8." The _meaning_ of that calculation is not in the formula. It is in the column headers, in the analyst's memory, in the documentation that may or may not exist.

**Logic-First modelling** defines business logic by name. The formula `=Revenue_Y2 - (Revenue_Y2 * COGS_Pct_Y2)` means "Year 2 Revenue minus the product of Year 2 Revenue and Year 2 COGS Percentage." The meaning is in the formula. The formula reads as the business rule it encodes.

**The shorthand:** Coordinate-First asks _"where is this number in the grid?"_ Logic-First asks _"what does this number mean?"_

:::

## The Same Formula, Two Architectures

Here is a Gross Profit formula for Year 1. It calculates the same number in both versions. The math is identical. The architecture is not.

**Coordinate version:**

```
=B14-(B14*$C$3)
```

**Named Range version:**

```
=Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)
```

Read both formulas aloud. The coordinate version sounds like a grid reference: "B14 minus B14 times C3." The Named Range version sounds like a business rule: "Revenue Year 1 minus Revenue Year 1 times COGS Percentage Year 1." The same calculation. The same answer. A fundamentally different level of information available to anyone — or anything — reading it.

## What the Agent Sees

When you ask Claude to explain the coordinate formula, here is the kind of response you receive:

**Prompt:** "Explain the formula in cell D14."

**Agent response (coordinate model):**

> "Cell D14 calculates as B14 minus the product of B14 and the value in C3. B14 appears to contain a revenue figure (11,000,000). C3 appears to contain a percentage (0.59). The result is approximately 4,510,000. This may represent a gross profit calculation, though I would need to verify the column headers to confirm."

Notice the language. "Appears to contain." "May represent." "I would need to verify." The agent is hedging because it is inferring intent from position. It can see the numbers. It cannot see the business rule.

Now the same question on the Named Range model:

**Prompt:** "Explain the Gross Profit formula for Year 1."

**Agent response (Named Range model):**

> "Year 1 Gross Profit is calculated as Revenue minus the product of Revenue and COGS Percentage. The business rule: Gross Profit equals Revenue after subtracting Cost of Goods Sold, where COGS is expressed as a percentage of Revenue. At current assumptions (Revenue of $11,000,000 and COGS Percentage of 59%), Gross Profit is $4,510,000. A 1-percentage-point reduction in COGS Percentage would increase Gross Profit by $110,000."

No hedging. No "appears to." The agent names the business rule, states the assumptions, calculates a sensitivity, and offers a what-if scenario — because the formula told it everything it needed to know.

## Three Dimensions of the Quality Gap

The difference between these two responses is not random. It follows a pattern with three measurable dimensions.

| Dimension            | Coordinate Model                                              | Named Range Model                                                               |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Confidence**       | Hedged: "appears to," "may represent," "would need to verify" | Definitive: "is calculated as," "the business rule is"                          |
| **Business context** | Mechanical: describes cell references and values              | Analytical: names the business rule, identifies assumptions, explains the logic |
| **Actionability**    | Descriptive: tells you what the formula does                  | Prescriptive: suggests what-if scenarios and quantifies impact of changes       |

This is not a matter of prompt engineering. You cannot prompt your way out of a coordinate model. The information the agent needs — the business intent behind the formula — is either in the formula or it is not. No prompt can create intent that was never encoded.

## Why This Is a Business Problem, Not a Technical One

Every token an agent spends inferring what a formula means is a token it does not spend analysing what the formula tells you about your business. Coordinate models force agents into inference mode: tracing cells, guessing at column headers, hedging conclusions. IDFA models put agents into analysis mode: naming business rules, identifying assumptions, running sensitivities, recommending actions.

The equation is direct:

**Agent capability gap = Business capability gap**

A finance team using coordinate models gets descriptions of their spreadsheets. A finance team using IDFA-compliant models gets analysis of their business. The agent is the same. The model architecture is the multiplier.

## What Becomes Possible

When every formula reads as a business rule, capabilities emerge that coordinate models cannot support. The full IDFA methodology — which you will build across the remaining lessons in this chapter — unlocks five Finance Domain Agent capabilities. This lesson previews the first three:

**Intent Synthesis.** Because Named Range formulas encode business rules, the agent can synthesise the _intent_ of an entire model section. Instead of reporting "cells D14 through D18 contain formulas referencing column B and C," the agent reports: "The Gross Profit section calculates margin after COGS for each projection year, with COGS expressed as a percentage of Revenue that decreases from 59% to 54% over the five-year forecast, reflecting an assumption of improving cost efficiency at scale."

**Deterministic What-If.** Because assumptions are isolated in Named Ranges, the agent can identify every assumption driving a result and propose what-if scenarios. "What if Revenue grows 15% instead of 10%?" is a question the agent can answer precisely — because it knows which Named Range controls revenue growth and which formulas depend on it.

**Strategic Goal-Seeking.** Because the relationship between assumptions and outputs is explicit, the agent can work backwards: "What COGS Percentage would you need to achieve a 45% Gross Margin?" The agent identifies the assumption to change, the output to target, and the value that achieves the goal — all from the Named Range structure.

These capabilities are not theoretical. You will build and test each one in later lessons. For now, the point is architectural: they require Logic-First design. A coordinate model cannot support Intent Synthesis because the intent was never encoded. A coordinate model cannot support precise What-If because the assumptions are not isolated. Architecture enables capability.

---

## Exercise: Write It Both Ways

Take the Gross Profit formula and write it in both forms yourself.

**Step 1.** Write the coordinate version:

```
=B14-(B14*$C$3)
```

Assume B14 contains Revenue for Year 1 ($11,000,000) and C3 contains the COGS Percentage (59%).

**Step 2.** Write the Named Range version:

```
=Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)
```

**Step 3.** Give both formulas to Claude (in Claude in Excel, in Cowork, or in claude.ai) with this prompt:

```
Here is a formula from a financial model:
[paste one version]

Explain what this formula calculates, what business rule it encodes,
and what would happen if the inputs changed by 10%.
```

Run the prompt twice — once with the coordinate version, once with the Named Range version.

**Step 4.** Document the difference. Use the three dimensions from this lesson:

- **Confidence:** Did the agent hedge or state definitively?
- **Business context:** Did the agent describe cells or name business rules?
- **Actionability:** Did the agent offer what-if analysis or stop at description?

The pattern you observe is the pattern this entire chapter addresses.

## Try With AI

Use these prompts in Claude in Excel or your preferred AI assistant to explore the Coordinate-First versus Logic-First distinction hands-on.

### Prompt 1: Formula Readability Comparison

```
I have two versions of the same Gross Profit formula.

Version A (coordinate): =B14-(B14*$C$3)
Version B (Named Range): =Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)

Both calculate the same number. Rate each version on a scale of 1-10
for: (a) how easy it is to explain to a non-technical executive,
(b) how confidently you can describe the business rule it encodes,
and (c) how useful it is for suggesting what-if scenarios.

Explain your ratings.
```

**What you are learning:** This prompt forces the AI to articulate exactly where the information gap lies. The ratings make the quality difference quantitative rather than impressionistic — and the explanations reveal that the gap is architectural (information encoded in the formula), not about AI capability.

### Prompt 2: Business Analysis from Named Ranges

```
Here is a simplified income statement model using Named Ranges:

Revenue_Y1 = 11,000,000
Revenue_Growth_Rate = 0.10
Revenue_Y2 = Revenue_Y1 * (1 + Revenue_Growth_Rate)
COGS_Pct_Y1 = 0.59
COGS_Pct_Y2 = 0.57
Gross_Profit_Y1 = Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)
Gross_Profit_Y2 = Revenue_Y2 - (Revenue_Y2 * COGS_Pct_Y2)

Provide a business analysis of this model. Include:
1. What business assumptions are encoded
2. What trends the assumptions imply
3. Two risks that a CFO should consider
4. One question a board member might ask about these projections
```

**What you are learning:** With Named Range formulas, the agent moves beyond mechanical description into genuine business analysis. It can identify assumptions, infer trends, flag risks, and anticipate stakeholder questions — because the business logic is readable, not hidden in cell coordinates. This is what "analysis mode" looks like.

### Prompt 3: What-If on Both Formats

```
I have two versions of a projection model. Both contain the same data.

VERSION A (coordinate references):
Cell B14 = 11000000
Cell B15 = B14 * 1.10
Cell C3 = 0.59
Cell D14 = B14-(B14*C3)

VERSION B (Named Ranges):
Revenue_Y1 = 11,000,000
Revenue_Y2 = Revenue_Y1 * (1 + Revenue_Growth_Rate)
Revenue_Growth_Rate = 0.10
COGS_Pct_Y1 = 0.59
Gross_Profit_Y1 = Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)

For each version, answer: "What happens to Gross Profit if revenue
grows 15% instead of 10%?"

After answering both, explain why one version let you give a more
complete and confident answer than the other.
```

**What you are learning:** What-If analysis is a core Finance Domain Agent capability — and it depends entirely on model architecture. This prompt demonstrates that the agent can answer the same question on both models, but the Named Range version produces a precise, assumption-aware answer while the coordinate version forces the agent to guess which cells control growth. Architecture determines capability.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 3: The Three Layers -->](./03-the-three-layers.md)
