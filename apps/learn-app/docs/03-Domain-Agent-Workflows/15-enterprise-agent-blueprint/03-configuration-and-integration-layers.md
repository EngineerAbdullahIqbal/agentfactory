---
sidebar_position: 3
title: "The Configuration and Integration Layers"
description: "Understand how config.yaml defines a plugin's deployment environment and permission boundaries, and how MCP connector scripts provide live data integration — while recognising what knowledge workers need to understand versus what IT teams own"
keywords:
  [
    "config.yaml",
    "MCP connector",
    "permission scope",
    "Cowork plugin",
    "enterprise integration",
    "connector failure modes",
    "infrastructure literacy",
    "data connectors",
  ]
chapter: 15
lesson: 3
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Read and Interpret config.yaml"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can read a config.yaml file, identify the plugin's permission scope, list which connectors are attached, and explain what each permission grants the agent"

  - name: "Distinguish Connector States"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can describe what a working connector does, what a failed connector does, and why fabricating data is the dangerous failure mode to watch for"

  - name: "Apply Infrastructure Literacy"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain the concept of infrastructure literacy — knowing enough to detect and accurately describe a connector problem without needing to fix it themselves"

learning_objectives:
  - objective: "Read a config.yaml and identify the plugin's permission scope, connector access, and governance settings"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given an unfamiliar config.yaml, student can annotate each section and explain what the agent is and is not permitted to do"

  - objective: "Explain what an MCP connector does at a conceptual level, including the three states a connector can be in"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe a working connector, a failed connector showing explicit unavailability, and the dangerous failure mode of fabricated data"

  - objective: "Articulate the knowledge worker's infrastructure literacy requirement — enough to detect a connector problem, not enough to fix it"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can explain in their own words what infrastructure literacy means and why it matters for productive collaboration with IT"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "config.yaml structure and sections"
    - "permission scope and connector access"
    - "MCP connector function and lifecycle"
    - "connector failure modes (stale, unavailable, fabricated)"
  assessment: "4 concepts at A2-B1 level — within the 7-10 cognitive budget for intermediate content. The config.yaml example anchors all four concepts concretely."

differentiation:
  extension_for_advanced: "Examine the governance section of the config.yaml and consider the implications of audit_log, output_review_required, and shadow_mode settings for a regulated industry such as financial services or healthcare. What governance configuration would you recommend for an agent operating in each domain, and why?"
  remedial_for_struggling: "Focus on the permission scope section of the config.yaml alone. For the bloomberg_mcp connector, answer three questions: What is the connector's name? What permission level does it have (read or write)? What specific data can it access? Repeat for each connector in the example."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "The Three Components"
  key_points:
    - "config.yaml is the IT-owned layer — it configures the environment, not the intelligence. Knowledge workers read and verify it; they do not author it."
    - "Permission scope is the most important section for knowledge workers to understand — it determines what data the agent can access and with what authority."
    - "MCP connectors are continuously running programmes that handle authentication, query execution, and data format translation."
    - "The dangerous connector failure mode is not unavailability — it is an agent fabricating data when a connector is down. This must be named explicitly."
    - "Infrastructure literacy is a professional skill: enough to detect and describe problems accurately, enabling productive conversation with the people who fix them."
  misconceptions:
    - "Students may think they need to understand how connectors work technically — they need to understand what connectors do and what to watch for, not how to build or debug them"
    - "Students may think that if a connector fails, the agent will show an error message — in poorly configured systems, the agent may silently fabricate data instead"
    - "Students may think config.yaml is something they write — it is authored by IT and reviewed by knowledge workers"
    - "Students may confuse permission scope with data access in general — scope defines specifically which data categories within a connector the agent may query"
  discussion_prompts:
    - "Look at the connectors section of the config.yaml example. Which connector gives the agent access to internal models and deal history? Why might that permission require particularly careful scoping?"
    - "If you were a senior analyst and your research agent gave you market data that seemed oddly specific and coherent, but you had not verified the bloomberg_mcp connector was working — what would you do?"
  teaching_tips:
    - "The config.yaml walkthrough is the centrepiece of this lesson. Walk through each section in order: metadata, model, interface, connectors, governance. Do not rush the connectors section."
    - "The connector failure modes discussion is emotionally important — students need to understand that fabricated data is not a hypothetical edge case. Make it concrete."
    - "Frame infrastructure literacy positively: it is not about knowing less, it is about knowing the right things to be effective and to have productive conversations with IT."
  assessment_checks:
    - question: "What does the permission field in a connector entry mean, and what is the difference between read and write?"
      expected_response: "The permission field defines what authority the agent has with that connector. Read permission means the agent can query data but cannot create, update, or delete anything. Write permission would allow the agent to modify data in the external system."
    - question: "What are the three states a connector can be in, and which one is dangerous?"
      expected_response: "Working (the connector is running, authenticating, and returning live data), explicitly unavailable (the connector is down and the agent reports it cannot access that data source), and fabricated (the most dangerous state — the connector is unavailable but the agent invents data rather than reporting the gap). The fabricated state is dangerous."
    - question: "Who authors the config.yaml, and what is the knowledge worker's role with respect to it?"
      expected_response: "IT authors the config.yaml. The knowledge worker's role is to understand it well enough to verify that the connectors and permission scopes match their intentions, and to flag discrepancies to IT."
---

# The Configuration and Integration Layers

In Lesson 2, you examined the SKILL.md — the intelligence layer of a Cowork plugin, written in plain English and owned by the knowledge worker. The SKILL.md tells the agent who it is, what it does, and how it behaves. But a SKILL.md without data is an expert locked in an empty room. The next two components — config.yaml and the MCP connector scripts — provide the deployment environment and the data infrastructure that make the agent operational.

Both components are owned by IT, not by the knowledge worker. This is not a limitation; it is a design choice that reflects where the risk and the technical complexity actually sit. Your role with respect to these layers is not to author them but to understand them well enough to verify that they match your intentions, and to detect when something is wrong. That combination — sufficient understanding without operational responsibility — is what this lesson will build.

There is a professional skill embedded in this lesson that does not have a widely used name but deserves one: **infrastructure literacy**. It means knowing enough about the systems you depend on to detect problems accurately, describe them precisely, and have productive conversations with the people who fix them. It is not about becoming a systems engineer. It is about being a competent professional user of complex infrastructure.

## Component Two: The config.yaml

The config.yaml is the metadata and configuration layer of a Cowork plugin. It is written in YAML — a structured format that is readable without technical training but is simultaneously machine-readable by the Cowork runtime. Where the SKILL.md is written to be read by an agent, the config.yaml is written to be consumed by the platform.

IT configures it. The knowledge worker understands it.

Here is the complete config.yaml for a Financial Research Agent:

```yaml
name: "Financial Research Agent"
version: "1.2.0"
description: "Senior analyst agent for market research, competitor analysis, and financial summarisation"
model: "claude-opus-4-6"

interface:
  input_types: ["text", "document"]
  output_format: "structured_report"
  sidebar_icon: "chart-line"

connectors:
  - name: "bloomberg_mcp"
    permission: "read"
    scope: ["market_data", "company_financials", "news_feed"]
  - name: "snowflake_mcp"
    permission: "read"
    scope: ["internal_models", "deal_history"]
  - name: "sharepoint_mcp"
    permission: "read"
    scope: ["research_templates", "approved_sources"]

governance:
  audit_log: true
  output_review_required: false
  escalation_routing: "finance_review_queue"
  shadow_mode: false
```

Walk through this section by section.

### Metadata

The opening block — `name`, `version`, `description`, and `model` — is the plugin's identity card. The name and description matter because they determine how the plugin appears to users in the Cowork interface. The version matters for change management: when IT updates the config.yaml, the version number makes it possible to trace which configuration was in effect at any point in time.

The `model` field specifies which Claude model powers this plugin. Selecting `claude-opus-4-6` gives the Financial Research Agent access to the most capable reasoning, which is appropriate for analytical work that requires synthesising information across multiple data sources and producing structured reports. Different plugins within the same organisation may run on different models, balancing capability against cost.

### Interface

The `interface` section configures how users interact with the plugin. `input_types: ["text", "document"]` means users can submit both typed queries and uploaded documents. A compliance agent that needs to analyse uploaded contracts would require document input; a simpler assistant might accept text only.

The `output_format: "structured_report"` tells the Cowork runtime how to render the agent's output. Different formats are rendered differently in the Cowork UI: a `structured_report` produces a formatted document with sections; a `data_table` might produce a sortable grid; a `conversational` output presents as a chat response.

### Connectors and Permission Scope

The `connectors` section is the most important part of the config.yaml for knowledge workers to understand. It defines which external systems the agent can access and — critically — what it is permitted to do with each.

Each connector entry has three fields: `name` (which MCP connector to use), `permission` (what authority the agent has), and `scope` (which specific data categories within that connector are accessible).

For this Financial Research Agent:

| Connector | Permission | Scope |
| --- | --- | --- |
| bloomberg_mcp | read | market_data, company_financials, news_feed |
| snowflake_mcp | read | internal_models, deal_history |
| sharepoint_mcp | read | research_templates, approved_sources |

All three connectors have `read` permission. This means the agent can query data but cannot create, modify, or delete anything in those systems. A connector with `write` permission would allow the agent to act — for example, an agent that drafts and sends emails would need write access to a mail connector. Write permissions require considerably more scrutiny during configuration, because they extend the agent's autonomy into consequential actions.

The `scope` field narrows what the agent can see within a connector. The snowflake_mcp connector gives access to `internal_models` and `deal_history`, but not to all data in the Snowflake instance. Perhaps the same Snowflake environment contains HR data, executive compensation records, or audit logs — none of which this agent should touch. The scope definition enforces that boundary.

**Permission boundaries are enforced by the Cowork runtime, not by the SKILL.md.** If the Financial Research Agent's SKILL.md were somehow to instruct it to access payroll data, the attempt would fail safely — because payroll data is not within the configured scope. The config.yaml is the authority; the SKILL.md is subordinate to it.

### Governance

The `governance` section records four settings that determine how the agent operates within the organisation's oversight framework:

`audit_log: true` means every query and response is recorded in an immutable log. This is standard for any agent operating in a regulated environment — it provides the evidence trail required by compliance and legal functions.

`output_review_required: false` means the agent's outputs go directly to the user without human review. For a research assistant producing internal analysis, this is appropriate. For an agent producing client-facing documents or regulatory filings, this setting would likely be `true`.

`escalation_routing: "finance_review_queue"` specifies where the agent routes queries that exceed its authority or require human judgment. When the agent determines it cannot or should not complete a task autonomously, it does not simply stop — it routes the request to the appropriate queue.

`shadow_mode: false` means the agent is operating autonomously rather than in parallel with human analysts for comparison purposes. Shadow mode, which will be covered in Lesson 7, is how new agents build the performance record that justifies their autonomous operation. Once this agent passed its shadow mode evaluation, that setting was turned off.

## Component Three: Connector Scripts

Behind each entry in the connectors section of the config.yaml is a small programme called an MCP connector. Understanding what these connectors do — and what happens when they do not — is the second half of infrastructure literacy.

An MCP connector is a continuously running service that listens for queries from the agent, retrieves the requested data from an external system, and returns it in a format the agent can use. When the Financial Research Agent needs current market data for a company, it does not connect to Bloomberg directly. It sends a query to the bloomberg_mcp connector, which handles the authentication credentials, executes the API call, translates the response into a consistent format, and returns the data to the agent.

This design has several advantages. The agent does not need to know how to authenticate with each external system — that complexity lives in the connector. The agent does not need to handle different data formats from different sources — the connector normalises them. And when external systems change their APIs or authentication protocols, only the connector needs to be updated, not the agent itself.

### The Three Connector States

The practical literacy question is not how connectors work internally — that is an IT concern — but what state a connector is in at any given moment. There are three states:

**Working.** The connector is running, the authentication is valid, and queries return live data from the external system. When a connector is working, the agent has access to current information. Research reflects today's market data, not last week's cached snapshot.

**Explicitly unavailable.** The connector is not running or cannot authenticate. In a well-configured system, the agent detects this state and tells the user it cannot access that data source. "I was unable to retrieve current Bloomberg data for this analysis. Please verify the bloomberg_mcp connector status with your IT team." This is the correct failure mode — it is transparent about the limitation.

**Fabricating data.** This is the dangerous failure mode, and it must be named explicitly. In a poorly designed or misconfigured system, when a connector is unavailable, the agent may draw on its training data or internal knowledge to produce responses that appear to be live data but are not. The output looks like a real market data response. The numbers are plausible. The format is correct. But the information is invented.

The reason this is categorically different from the second state is that it is undetectable without external verification. An agent that says "I cannot access Bloomberg" gives you accurate information about its limitations. An agent that generates a plausible-looking market data table without access to Bloomberg has produced a hallucination presented as fact — and in a financial context, acting on fabricated data can have serious consequences.

Cowork's architecture is designed to make the third state unlikely. The governance layer and connector design enforce explicit failure reporting rather than silent substitution. But no architecture eliminates the risk entirely, which is why infrastructure literacy includes knowing this risk exists and building the habit of verifying data provenance when stakes are high.

### What the Knowledge Worker Needs to Know

You do not need to build connectors, debug connector failures, or manage connector authentication. That work belongs to IT. What you need is enough understanding to operate as a competent professional user of the infrastructure.

| Capability | What It Looks Like in Practice |
| --- | --- |
| **Verify connector alignment** | Confirm that the connectors listed in the config.yaml match the data sources your workflow actually requires |
| **Detect data quality issues** | Recognise when an agent's output may be based on unavailable or stale data |
| **Report problems accurately** | Describe a connector problem in terms IT can act on — "the bloomberg_mcp connector appears to be returning stale data, last updated three days ago" is more useful than "the agent seems off" |
| **Trigger verification proactively** | Know when to ask IT to verify connector status before proceeding with high-stakes analysis |

This is infrastructure literacy: not operational depth, but sufficient awareness to be a capable professional user and an effective collaborator with the people who maintain the infrastructure you depend on.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to practise reading and reasoning about plugin configuration.

### Prompt 1: Configuration Annotation

```
I'm going to share a config.yaml for a Cowork plugin. For each section,
annotate what it configures and what it means for the agent's behaviour.
Then identify: (1) what data sources the agent has access to, (2) what
the agent cannot access, and (3) what the governance settings imply about
the expected operating context.

[Paste a config.yaml here]
```

**What you're learning:** Reading a config.yaml requires more than parsing the syntax — it requires interpreting what each setting means for the agent's behaviour and limitations. This prompt practises treating the config.yaml as a source of operational information, not just a technical file.

### Prompt 2: Connector Failure Diagnosis

```
I'm using a Financial Research Agent built on the config.yaml from the
Chapter 15 lesson. The agent has produced a report with detailed market
data and company financials for three competitors. I haven't verified
whether the bloomberg_mcp connector was working when the report was
generated.

Help me think through: (1) what questions I should ask before trusting
this data, (2) how I would verify whether the data is live or fabricated,
and (3) what I should tell IT if I suspect a connector problem. Be
specific about what "fabricated data" looks like versus "live data with
genuine uncertainties."
```

**What you're learning:** Infrastructure literacy includes knowing how to verify data provenance — not just trusting that the agent has access to what it is supposed to have access to. This prompt practises the reasoning process for high-stakes data verification, which is a core professional skill when working with AI-powered research tools.

### Prompt 3: Permission Scope Design

```
I'm working with IT to configure a new Cowork plugin for our legal team.
The agent will review contracts, flag risk clauses, and cross-reference
regulatory guidance. I need to decide what connectors and permission scopes
to request.

We have access to: a LexisNexis MCP connector, a SharePoint connector
(containing both approved legal templates and confidential settlement
records), and a DocuSign connector.

Help me think through what permission scope to request for each connector.
What should the agent be able to access, and what should be explicitly
excluded? What would you recommend for the permission field (read vs write)
for the DocuSign connector, and why?
```

**What you're learning:** Designing permission scope is a knowledge worker responsibility even though IT implements it. You specify what data the agent needs; IT configures it. This prompt practises thinking through data access requirements carefully — including the principle that scope should be as narrow as the workflow allows.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 4: The Three-Level Context System →](./04-three-level-context-system.md)
