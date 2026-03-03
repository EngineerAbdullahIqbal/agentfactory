---
sidebar_position: 9
title: "The IDFA Skill"
description: "Install the IDFA plugin — a portable Agent Skill following the agentskills.io standard — in Claude Code, GitHub Copilot, VS Code, Codex, and any skills-compatible agent, transforming agent behaviour so every financial model interaction automatically applies all four guardrails"
keywords:
  [
    "IDFA Skill",
    "IDFA plugin",
    "Agent Skill",
    "SKILL.md",
    "agentskills.io",
    "portable methodology",
    "Claude Code plugin",
    "Claude Code skills",
    "GitHub Copilot instructions",
    "VS Code custom instructions",
    "Codex instructions",
    "Named Range Priority",
    "LaTeX Verification",
    "Intent Notes",
    "MCP Dependency",
    "financial modelling",
    "IDFA",
    "Intent-Driven Financial Architecture",
  ]
chapter: 18
lesson: 9
duration_minutes: 25

skills:
  - name: "Agent Skill Installation and Configuration"
    proficiency_level: "B2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can install the IDFA plugin in Claude Code and adapt it for GitHub Copilot and VS Code custom instructions, verifying that the agent applies IDFA methodology without explicit prompting"

  - name: "Skill-Driven Agent Behaviour Verification"
    proficiency_level: "B2"
    category: "Applied"
    bloom_level: "Analyze"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can test whether an installed skill is active by providing an intent statement and verifying that the agent's output includes all four IDFA guardrails — Named Range notation, LaTeX verification for complex formulas, Intent Notes, and MCP workflow — without being prompted for any of them"

  - name: "Cross-Platform Skill Portability"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can describe how to install the same IDFA skill across at least three different agent platforms and explain why the agentskills.io standard enables portability"

learning_objectives:
  - objective: "Install the IDFA plugin in Claude Code and verify that the agent automatically applies all four guardrails when given a financial modelling intent statement"
    proficiency_level: "B2"
    bloom_level: "Apply"
    assessment_method: "Student installs the plugin, gives Claude a new intent statement, and confirms the output includes Named Range notation, LaTeX verification, Intent Notes, and MCP workflow without being explicitly asked"

  - objective: "Analyse agent output to determine whether each of the four IDFA guardrails was applied, identifying any guardrail that was missed and explaining what correct application would look like"
    proficiency_level: "B2"
    bloom_level: "Analyze"
    assessment_method: "Student reviews Claude's response to a financial modelling prompt, checks each guardrail against the compliance criteria from Lessons 4-7, and documents which guardrails were applied and which were not"

  - objective: "Describe the installation path for the IDFA skill across Claude Code, GitHub Copilot, VS Code, and Codex, explaining why a single SKILL.md file works across all four platforms"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can list the correct file path or configuration method for each platform and explain that the agentskills.io standard defines a common format that all skills-compatible agents can read"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Agent Skill as a portable methodology file (SKILL.md)"
    - "agentskills.io standard and cross-platform portability"
    - "Plugin installation vs manual skill placement"
    - "Trigger phrase activation — how agents detect when to apply a skill"
    - "Skill verification — testing that guardrails activate automatically"
  assessment: "5 new concepts at B2 level. Students have built the full IDFA methodology across Lessons 1-8; this lesson packages that knowledge as an installable plugin. The cognitive demand is in installation, inspection, and verification — not in learning new financial concepts. Within the B2 ceiling of 7-10 concepts."

differentiation:
  extension_for_advanced: "Customise the IDFA SKILL.md for your organisation's specific naming conventions — add sector-specific prefixes (IB_, PE_, FP_, TR_, CR_ from the reference guide), modify the worked example to match your domain, and add organisation-specific trigger phrases. Fork the plugin repo, make the changes, and test the customised skill on a real model from your work."
  remedial_for_struggling: "Focus on the Claude Code plugin installation path only. Install the plugin, then test with one intent statement. If Claude produces Named Range formulas with Intent Notes, the skill is working. The other platform paths follow the same principle — making knowledge available to the agent before the conversation starts."
---

# The IDFA Skill

In Lesson 8, you retrofitted a legacy coordinate-based model to IDFA compliance — converting formulas one by one, validating outputs at each step. Now you have the complete methodology: three layers, four guardrails, naming conventions, the MCP workflow, and the retrofitting process. All of that knowledge lives in your head. The IDFA plugin makes it live in every agent you use.

A SKILL.md file is a structured document that follows the [agentskills.io](https://agentskills.io) open standard. The Panaversity team has packaged the complete IDFA methodology as a Claude Code plugin — [`panaversity/idfa-financial-architect`](https://github.com/panaversity/idfa-financial-architect) — so you install the skill with two commands and it auto-activates on every financial modelling task. The agent reads it at the start of every session. It does not need to be prompted. It does not need to be reminded. The skill becomes part of how the agent thinks — and when someone mentions a financial model, a spreadsheet formula, or a model audit, the agent applies the full IDFA methodology automatically.

## What the Plugin Contains

The IDFA plugin follows the standard Claude Code plugin structure:

```
panaversity/idfa-financial-architect/
├── .claude-plugin/
│   ├── plugin.json            ← Plugin metadata (name, version, author)
│   └── marketplace.json       ← Marketplace catalog (for /plugin marketplace add)
├── skills/
│   └── financial-architect/
│       ├── SKILL.md           ← The complete IDFA methodology
│       └── references/
│           └── IDFA-reference.md  ← Enterprise governance, complex formulas, sector naming
├── README.md
└── LICENSE                    ← Apache-2.0
```

The heart of the plugin is `SKILL.md` — a single file that encodes every concept you learned in Lessons 1 through 8. Here is how it opens:

```yaml
---
name: idfa-financial-architect
description: >-
  Apply the Intent-Driven Financial Architecture (IDFA) when building,
  auditing, retrofitting, or analysing Excel financial models. Activate when
  the user mentions: financial model, spreadsheet, Excel formula, named ranges,
  cell references, formula tracing, model audit, COGS, revenue projection,
  gross profit, EBITDA, DCF, LBO, comps, three-statement model, budget,
  forecast, variance analysis, what-if analysis, scenario modelling, goal
  seeking, Monte Carlo simulation, model review, or model handover...
license: Apache-2.0
metadata:
  author: Panaversity
  version: "1.0"
---
```

The YAML frontmatter tells the agent when to activate. The `description` field lists every trigger phrase — financial model, model audit, what-if analysis, "I inherited this model" — that causes the agent to load the full IDFA methodology. Below the frontmatter, the SKILL.md contains the Core Principle, the Three Layers, all Four Guardrails with compliance tests, the Naming Conventions, the Worked Example, the Agent Decision Table, Common Mistakes, and Trigger Phrase mappings. It is the complete methodology in a machine-readable format.

The `references/` directory contains the extended reference guide — enterprise governance standards, the five capability tests, retrofitting guidance, complex formula reference (WACC, NPV, Terminal Value, IRR), and sector-specific naming extensions. The agent loads this when the main SKILL.md is insufficient for an advanced task.

## Installation Paths

### Claude Code (CLI)

Claude Code distributes plugins through **marketplaces** — catalogs of plugins that you add once, then install individual plugins from. The IDFA plugin repo serves as its own marketplace:

**Step 1 — Add the marketplace** (one-time setup):

```
/plugin marketplace add panaversity/idfa-financial-architect
```

This registers the Panaversity IDFA marketplace with your Claude Code installation. No plugin is installed yet — you have added the catalog.

**Step 2 — Install the plugin:**

```
/plugin install idfa-financial-architect@panaversity-idfa
```

Claude Code downloads the plugin, registers the skill, and makes it available in every session. When a conversation mentions financial models, named ranges, or any trigger phrase listed in the skill, Claude activates the IDFA methodology automatically. The skill is namespaced as `idfa-financial-architect:financial-architect` but you do not need to invoke it manually — it auto-activates based on the conversation context.

**For local testing** (clone the repo and load directly):

```bash
git clone https://github.com/panaversity/idfa-financial-architect.git
claude --plugin-dir ./idfa-financial-architect
```

### Cowork (Claude.ai)

If you use Claude through the Cowork tab on [claude.ai](https://claude.ai):

1. Open the **Cowork** tab
2. Click **Customize** in the left sidebar
3. Click **Browse plugins** or upload the plugin directly from the [GitHub repo](https://github.com/panaversity/idfa-financial-architect)
4. The IDFA skill auto-activates in all Cowork sessions when you mention financial models

Plugins in Cowork are saved locally to your machine. For team-wide deployment, see Lesson 10 on governance.

### Other Agents (GitHub Copilot, VS Code, Codex, Cursor)

The plugin contains a standard SKILL.md file. For agents that do not support the Claude Code plugin format, download `skills/financial-architect/SKILL.md` from the [GitHub repository](https://github.com/panaversity/idfa-financial-architect) and place it in the platform's custom instructions path:

| Agent          | Path                                         |
| -------------- | -------------------------------------------- |
| GitHub Copilot | `.github/copilot-instructions.md`            |
| VS Code        | `.vscode/copilot-instructions.md`            |
| Codex (OpenAI) | Project instructions or system prompt        |
| Cursor         | `.cursorrules` or project-level instructions |

The skill content is identical everywhere. You install the plugin once for Claude Code; for other agents, you copy the same SKILL.md from the plugin repo into the platform-specific directory.

:::tip Portability

The agentskills.io standard means the methodology is identical everywhere. The plugin packages it for Claude Code and Cowork; the SKILL.md inside the plugin works directly in any other skills-compatible agent. When a new agent announces skills support, installation is a single file copy from the plugin repo.

:::

## The Agent Decision Table in Practice

The Agent Decision Table is the operational core of the skill. It tells the agent exactly what to do for every category of financial modelling task. Here is how it works when the skill is active:

| Task                        | What the Agent Does Automatically                                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Building a new model        | Extracts every input from the intent statement, names each with `Inp_`, writes all calculations in Named Range notation, verifies complex formulas in LaTeX, and attaches Intent Notes |
| Auditing an existing model  | Runs `inspect_model()`, checks every Calculation layer formula for coordinate references, flags violations, and reports compliance percentage                                          |
| Retrofitting a legacy model | Runs `inspect_model()`, identifies all hardcoded values, proposes Named Ranges, rewrites formulas one at a time, and validates that outputs match at each step                         |
| What-if analysis            | Uses `write_cell()` to change assumptions and `read_cell()` to report results — never calculates internally                                                                            |
| Goal-seeking                | Iterates `write_cell()`/`read_cell()` until the target output is reached, then reports the required input value                                                                        |
| Explaining a formula        | Reads the formula via `read_formula()`, states the business rule in plain English, and checks for an Intent Note                                                                       |
| Checking compliance         | Verifies all four guardrails: Named Ranges, LaTeX verification, Intent Notes, and MCP workflow                                                                                         |

Without the skill installed, you would need to prompt for each of these behaviours explicitly. With the plugin installed, the agent applies the correct workflow based on what you ask it to do.

## Trigger Phrases: How the Skill Activates

The `description` field in the YAML frontmatter lists specific phrases that activate the skill. When a user says any of these, the agent applies the full IDFA methodology:

| What You Say                    | What Happens                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| "Explain how this model works"  | The agent produces a Logic Map in Named Range notation                                 |
| "This model is a black box"     | The agent offers a full audit via `inspect_model()`                                    |
| "I inherited this model"        | The agent proposes an IDFA compliance audit and retrofitting sequence                  |
| "What if revenue grows at 15%?" | The agent uses MCP to write the assumption and read the result                         |
| "Check this formula"            | The agent verifies Named Range compliance, LaTeX correctness, and Intent Note presence |

The trigger phrases are not rigid pattern matches. They are examples that teach the agent the category of request. "This spreadsheet makes no sense" will activate the skill just as "this model is a black box" does — because the agent understands the intent behind the phrase.

## The Five Common Mistakes

These mistakes appear in the SKILL.md as a safeguard. When the skill is active, the agent checks its own output against these rules:

1. **Never mix layers.** A hardcoded `0.60` in a Calculation formula violates layer isolation. The skill teaches the agent to move it to Assumptions as `Inp_COGS_Pct_Y1`.

2. **Never calculate internally.** If you ask "what is Year 3 Gross Profit?", the agent must use `read_cell()`, not arithmetic. The model's deterministic output and the agent's estimate can differ — and in finance, only the model result is audit-valid.

3. **Never skip LaTeX for WACC, IRR, NPV, or DCF.** These four formulas are where errors are most common and most consequential. The skill requires LaTeX verification before any of them are committed to the model.

4. **Never retrofit by deleting and rebuilding.** The skill enforces one-formula-at-a-time conversion with output validation at each step.

5. **Never name a range with spaces.** `Inp_Rev_Y1`, not `Inp Rev Y1`. Excel rejects spaces in formula references; the skill prevents the agent from creating them.

## Exercise: Install and Test the IDFA Plugin

**Step 1.** Install the IDFA plugin. In Claude Code, run:

```
/plugin marketplace add panaversity/idfa-financial-architect
/plugin install idfa-financial-architect@panaversity-idfa
```

If testing locally, clone the repo and use:

```bash
git clone https://github.com/panaversity/idfa-financial-architect.git
claude --plugin-dir ./idfa-financial-architect
```

In Cowork, open **Customize → Browse plugins** and install or upload the plugin.

**Step 2.** Start a new Claude Code session (or Cowork session) so the plugin is loaded.

**Step 3.** Give Claude this intent statement — a completely new model it has not seen in this chapter:

```
Project a 5-year SaaS revenue model with $5M ARR growing 30% YoY,
70% gross margins improving to 80% by Year 5.
```

**Step 4.** Review Claude's output against the four guardrails:

| Guardrail            | What to Check                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Named Range Priority | Are all inputs named with `Inp_` prefix? Are all formulas written in Named Range notation with zero coordinates? |
| LaTeX Verification   | If the model includes complex formulas, did Claude verify them in LaTeX notation?                                |
| Intent Notes         | Did Claude include Intent Note format for generated formulas?                                                    |
| MCP Dependency       | Did Claude describe the write/read workflow rather than calculating results internally?                          |

If all four guardrails appear in the output without you asking for them, the skill is working. If any guardrail is missing, check that the plugin is installed and that you started a fresh session.

**Step 5.** Open the installed SKILL.md and read the Agent Decision Table. Find the row for "Retrofitting a legacy model" and trace the workflow: `inspect_model()` → identify hardcoded values → propose Named Ranges → rewrite one by one → validate. This is the same five-phase process you learned in Lesson 8, now encoded as an instruction the agent follows automatically.

## The Business Bottom Line

One plugin install. Every agent. Every model interaction governed by the same four guardrails. For non-Claude agents, the same SKILL.md file from the plugin repo installs directly into the platform's custom instructions path.

Everything you learned in Lessons 1 through 8 is knowledge in your head. The IDFA plugin is knowledge in every agent you use. The investment is a single install command — the return is consistent IDFA compliance across every tool that supports the agentskills.io standard.

This also connects back to Chapter 15, where you learned the plugin architecture for Agent Skills. The IDFA plugin is not a custom configuration — it is a standard-format skill that any skills-compatible agent can read. The same investment that makes Claude apply IDFA also makes Copilot, Codex, Gemini CLI, and future agents apply it. The skill travels with your project, not with any single tool.

## Try With AI

:::tip Setup

Open a Claude Code session (or Cowork) where you have installed the IDFA plugin. In Claude Code: `/plugin marketplace add panaversity/idfa-financial-architect` then `/plugin install idfa-financial-architect@panaversity-idfa`. In Cowork: install via **Customize → Browse plugins**. Start a fresh session so the skill is loaded.

:::

**Prompt 1 — Test skill activation with a new intent statement:**

```
I need to build a financial model for a hardware startup.
Year 1 unit sales are 10,000 at $200 per unit. Unit sales grow
25% YoY. Manufacturing cost is $120 per unit in Year 1,
decreasing 5% per year through supply chain optimisation.
Project revenue, COGS, and gross profit for 5 years.
```

**What you are learning:** Whether the skill activates automatically from a financial modelling request. Check the output for `Inp_` prefixed Named Ranges, Named Range-only formulas, and the MCP workflow description. If the agent produces coordinate-based formulas or calculates results internally, the skill is not active — verify the plugin is installed and restart the session.

**Prompt 2 — Test trigger phrase activation:**

```
I inherited this model from a colleague who left the company.
It has 300 formulas across 8 tabs. I need to understand what
it does before the board meeting next week.
```

**What you are learning:** Whether trigger phrases activate the correct IDFA workflow. The phrase "I inherited this model" should trigger the agent to offer an IDFA compliance audit, propose `inspect_model()` to map all formulas, and suggest a retrofitting sequence. If the agent responds with generic spreadsheet advice instead of the IDFA methodology, the skill's trigger phrases are not being read.

**Prompt 3 — Build a complete model with the skill active:**

```
Build a 3-year consulting firm profitability model.
Inputs: 50 consultants at $150K average salary, growing to
65 consultants by Year 3. Average billable rate $250/hour.
Utilisation rate starts at 70% and improves to 78% by Year 3.
Assume 1,800 available hours per consultant per year.
Project revenue, personnel costs, gross profit, and
gross margin percentage for all three years.
```

**What you are learning:** Whether the skill governs a complete model-building workflow end to end. The output should include: every input extracted and named with `Inp_`, all calculation formulas in Named Range notation, LaTeX verification for any multi-step formulas, Intent Notes for each generated formula, and the MCP write/read workflow. This is the full test — if all four guardrails appear without prompting, the IDFA skill is fully operational.

<Flashcards />

---

**Next:** [Lesson 10: Enterprise Governance](./10-enterprise-governance.md) — where you design the organisational controls that the plugin cannot enforce: accountability, tracking, approval workflows, and compliance metrics.
