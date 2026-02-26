---
slug: /General-Agents-Foundations/general-agents/plugins-and-connectors
title: "Plugins and Connectors: Extending Cowork's Reach"
sidebar_position: 28
chapter: 3
lesson: 28
duration_minutes: 16
chapter_type: Concept
running_example_id: connectors-introduction

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 1"
layer_progression: "L1 (Manual Foundation)"
layer_1_foundation: "Understanding Plugins as bundled capability packages and Connectors as the Cowork interface to MCP (Model Context Protocol), enabling external data and service integration"
layer_2_collaboration: "N/A"
layer_3_intelligence: "N/A"
layer_4_capstone: "N/A"

# HIDDEN SKILLS METADATA (Institutional Integration Layer)
skills:
  - name: "Claude Plugins and Connectors Integration"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain what Plugins and Connectors are, how they relate to MCP, and identify scenarios where external data integration would enhance Cowork workflows"

learning_objectives:
  - objective: "Understand what Plugins are and how they bundle Connectors, skills, slash commands, and sub-agents into workflow packages"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Explanation of Plugin architecture and components"
  - objective: "Distinguish between MCP (for developers) and Connectors (for knowledge workers)"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Comparison of MCP vs Connectors use cases"
  - objective: "Identify scenarios where Plugins and Connectors enhance workflows"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Scenario analysis for appropriate Plugin and Connector use"
  - objective: "Set up and use basic Connectors in Cowork"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Successful Connector configuration and first use"

# Cognitive load tracking
cognitive_load:
  new_concepts: 7
  assessment: "7 concepts (Plugins, Connectors, MCP relationship, remote MCP servers, data sources, authentication, combination power) - at A2 limit of 7 ✓"

# Differentiation guidance
differentiation:
  extension_for_advanced: "Explore how developers create new Connectors and the technical architecture of remote MCP server integration"
  remedial_for_struggling: "Focus on the key concept: Plugins bundle everything you need; Connectors bring external data into Cowork conversations"

# Generation metadata
generated_by: "content-implementer v2.0.0"
created: "2025-01-22"
last_modified: "2026-02-26"
git_author: "Claude Code"
workflow: "manual"
version: "2.0.0"

teaching_guide:
  lesson_type: "core"
  session_group: 9
  session_title: "External Integration and Responsible Use"
  key_points:
    - "Plugins are the primary organizational unit — they bundle Connectors, skills, slash commands, and sub-agents into one-click packages"
    - "Connectors are pre-packaged remote MCP servers maintained by Anthropic and partners — students do NOT write code to use them"
    - "The MCP-vs-Connectors distinction maps to developer-vs-knowledge-worker audiences, not different protocols"
    - "Combination power across multiple data sources (Google Sheets + Notion + Slack) is the real unlock, not single-source access"
    - "Department-specific Plugin templates (HR, Finance, Legal, Design, Engineering, Operations) provide ready-to-use workflow packages"
    - "Principle of Least Privilege applies: start read-only, grant write access only for trusted workflows"
  misconceptions:
    - "Students think Connectors are a different technology from MCP — they are MCP servers someone else built and maintains"
    - "Students assume Connectors give real-time streaming data — they fetch current snapshots, not live streams"
    - "Students believe all Connectors support read-write — many are read-only, and write support varies by service"
    - "Students think Plugins and Connectors are the same — Plugins are bundles that can contain Connectors plus skills, commands, and sub-agents"
  discussion_prompts:
    - "Which three data sources in your current work would save the most time if Claude could access them directly — and what task would you automate first?"
    - "What are the risks of granting an AI read-write access to your Google Drive or Slack, and how would you mitigate them?"
  teaching_tips:
    - "Start with the Plugin concept as the container, then zoom into Connectors as one component — this prevents confusion about the hierarchy"
    - "Walk through the quarterly report scenario in 'The Combination Power' section — have students map it to their own multi-source workflows"
    - "Use the MCP vs Connectors comparison table to reinforce that the difference is who builds and maintains the server, not the underlying protocol"
    - "Emphasize the Connector categories (Document, Communication, Development, Business Data, Design, Content) and ask students which category matters most for their role"
    - "Connect back to Lesson 12 (MCP) and Lesson 27 (browser integration) to show the progression: custom MCP → browser automation → pre-built Plugins and Connectors"
  assessment_quick_check:
    - "Name two differences between MCP servers (Lesson 12) and Connectors (this lesson)."
    - "What does a Plugin bundle together?"
    - "Why should you start with read-only Connector permissions?"
    - "Give one example where combining two Connectors in a single prompt creates value neither could alone."

# Legacy compatibility (Docusaurus)
prerequisites:
  - "Completion of Lesson 12: MCP Integration (for context)"
  - "Completion of Lesson 27: Browser Integration"
  - "Claude Cowork installed and configured"
---

# Plugins and Connectors: Extending Cowork's Reach

In Lesson 27, you explored browser integration for web-based workflows. Now you will connect Cowork to the services where your real data lives — Google Drive, Slack, Jira, and dozens more — through Plugins and Connectors.

You learned about MCP (Model Context Protocol) in Lesson 12 — how developers create servers that expose tools to Claude Code. **Plugins and Connectors bring the same capability to Cowork, but without requiring any development work.**

---

## What Plugins Are

A **Plugin** is a workflow package that bundles multiple capabilities into a single, installable unit. Think of it like an app on your phone — one download gives you everything you need.

A Plugin can contain any combination of:

| Component          | What It Does                      | Example                               |
| ------------------ | --------------------------------- | ------------------------------------- |
| **Connectors**     | Link to external data sources     | Google Drive access, Slack messages   |
| **Skills**         | Add specific capabilities         | Data analysis, report generation      |
| **Slash commands** | Create shortcuts for common tasks | `/weekly-report`, `/standup-summary`  |
| **Sub-agents**     | Enable autonomous workflows       | Research assistant, document reviewer |

You install a Plugin with one click from the Plugin directory, and all its components become available in your Cowork session.

**Department-specific Plugin templates** provide ready-to-use packages for common roles:

- **HR**: Employee onboarding checklists, policy lookup, benefits Q&A
- **Finance**: Expense report analysis, budget tracking, compliance checks
- **Legal**: Contract review, clause comparison, regulatory lookup
- **Design**: Asset management, design system reference, feedback collection
- **Engineering**: Code review summaries, incident response, documentation
- **Operations**: Process automation, vendor management, reporting

These templates are starting points. You can customize them by adding or removing individual components.

---

## What Connectors Are

**Connectors** are one component within a Plugin. They are pre-packaged remote MCP servers that link Claude to external data sources.

Here is how the layers relate:

- **Protocol layer**: MCP (Model Context Protocol) — the open standard
- **Integration layer**: Connector — a single data source connection built on MCP
- **Workflow Package layer**: Plugin — bundles Connectors + skills + slash commands + sub-agents

The Anthropic Connectors Directory lists 50+ Connectors across categories:

| Connector           | Data Source         | What It Provides                         |
| ------------------- | ------------------- | ---------------------------------------- |
| **Google Drive**    | Google Workspace    | Read, search, and modify documents       |
| **Google Calendar** | Google Workspace    | View and manage calendar events          |
| **Gmail**           | Google Workspace    | Read and search email                    |
| **Notion**          | Notion workspace    | Access pages, databases, and docs        |
| **Slack**           | Slack workspace     | Read messages, search conversations      |
| **GitHub**          | GitHub repositories | Read code, issues, and discussions       |
| **Jira**            | Atlassian Jira      | Query tickets, update status             |
| **Salesforce**      | CRM data            | Access accounts, opportunities, reports  |
| **DocuSign**        | Document signing    | Manage agreements and signatures         |
| **Figma**           | Design files        | Access designs, components, and comments |
| **Canva**           | Design platform     | Browse and reference design assets       |
| **WordPress**       | Content management  | Manage posts, pages, and media           |
| **Apollo**          | Sales intelligence  | Contact and account data enrichment      |
| **Clay**            | Data enrichment     | Automated lead research and scoring      |
| **Outreach**        | Sales engagement    | Sequence management and analytics        |
| **Similarweb**      | Web analytics       | Traffic and competitive intelligence     |
| **MSCI**            | Financial data      | ESG ratings and market analytics         |
| **FactSet**         | Financial research  | Market data and company analysis         |
| **LegalZoom**       | Legal services      | Document templates and filings           |
| **Harvey**          | Legal AI            | Legal research and analysis              |

You don't write code. You don't configure servers. You authenticate, grant permissions, and Claude can access the data.

Connectors use **remote MCP servers** — hosted in the cloud by Anthropic and partners — rather than local servers running on your machine. This means Connectors work across all Claude platforms: web, desktop, mobile apps, and API.

---

## MCP vs. Connectors: What's the Difference?

**MCP (Lesson 12)** is for developers building custom integrations:

- Requires programming (Python, JavaScript, etc.)
- You design the tools and data structures
- You host and maintain the MCP server
- Full control over the integration
- Best for: proprietary data sources, custom APIs

**Connectors** are for knowledge workers using common services:

- No programming required
- Pre-defined tools and data structures
- Anthropic and partners handle maintenance via remote MCP servers
- Optimized for popular services
- Best for: widely-used SaaS platforms

**The relationship:** Connectors are MCP servers. Someone else built them, packaged them, and maintains them. You just use them.

---

## How Connectors Work

When you add a Connector to Cowork:

1. **Authentication**: You sign in to the external service (Google, Notion, etc.)
2. **Permission Grant**: You authorize what Claude can access
3. **Tool Registration**: The Connector exposes its capabilities as tools
4. **Querying**: Claude can now query, read, and sometimes modify data

From that point forward, Claude can reference data from the connected service alongside your local files.

**Example**: With the Google Drive Connector, you could ask:

> "Look at the project planning document in my Google Drive, compare it to the local project files I showed you, and tell me what's missing from the local version."

Claude reads the Google Doc via Connector, reads your local files, and performs the comparison — all without you manually copying anything.

Some Connectors also render **interactive apps** inline in the chat. For example, a calendar Connector might display an interactive calendar widget where you can select dates directly, rather than typing them out.

---

## Setting Up Connectors

### Step 1: Open Connector Settings

In Claude Desktop (Cowork mode):

1. Click the **Customize** menu (bottom-left of the chat input)
2. Select **Connectors** from the menu
3. You'll see available Connectors organized by category

### Step 2: Add a Connector

1. Click "Add" next to the service you want to connect
2. A browser window opens for authentication
3. Sign in and authorize Claude's access
4. Return to Claude Desktop — connection confirmed

### Step 3: Configure Permissions

Each Connector has permission scopes:

- **Read-only**: Claude can view data but not modify
- **Read-write**: Claude can modify data (use with caution)
- **Specific resources**: Limit access to specific folders or workspaces

Start with read-only access. Only enable read-write when you trust the workflow and understand what Claude will do.

### Access Tiers

Plugins and Connectors require a paid plan:

- **Pro, Max, Team, Enterprise**: Full Connector installation, custom Connectors via MCP URL, and interactive apps
- **Free plan**: No access to Plugins or Connectors

---

## The Combination Power

Connectors shine when combined with local file operations:

**Scenario**: You're preparing a quarterly report. The data lives in:

- Google Sheets (sales figures)
- Notion (product updates)
- Slack (customer feedback)
- Local files (previous quarter's report template)

**Without Connectors**: You download exports from each service, copy-paste into your document, and hope nothing changes.

**With Connectors**:

> "Create a quarterly report using the template in my local files. Pull sales figures from the Q4 Sales Google Sheet, include product updates from the Notion product database, summarize customer feedback from the #customers Slack channel, and compare everything to last quarter's performance."

Claude:

1. Reads the local report template
2. Queries Google Sheets for current sales data
3. Fetches Notion pages for product updates
4. Searches Slack for customer feedback
5. Analyzes everything and generates the report

**The advantage**: Live data, no manual export/import, and one request does the work of accessing four different systems.

---

## Available Connectors

**Document and Knowledge:**

- Google Drive (Docs, Sheets, Slides)
- Notion
- Confluence
- SharePoint

**Communication:**

- Slack
- Microsoft Teams
- Gmail
- Google Calendar

**Development:**

- GitHub
- GitLab
- Linear

**Business Data:**

- Salesforce
- HubSpot
- Jira
- Airtable
- DocuSign

**Design:**

- Figma
- Canva

**Content:**

- WordPress

**New Connectors** are added regularly. The Connectors Directory at claude.com/connectors shows all available integrations, with 50+ and growing.

---

## Slash Commands and Structured Forms

Plugins can expose **slash commands** — shortcuts you type in the chat input (like `/weekly-report` or `/standup-summary`). When you invoke a slash command, Cowork can present a **structured form** — a fill-in UI with labeled fields — instead of requiring you to type a free-text prompt. You fill in the form fields, click submit, and the Plugin executes the workflow with your inputs.

This matters because structured forms reduce ambiguity. Instead of hoping Claude interprets your free-text prompt correctly, the form guides you to provide exactly the inputs the workflow needs.

---

## Building Custom Plugins

You don't have to wait for Anthropic or partners to build a Plugin for your workflow. The **Plugin Create** tool lets you build custom Plugins directly inside Cowork:

1. Describe what your Plugin should do
2. Claude generates the Plugin structure (Connectors, skills, slash commands)
3. You test, refine, and publish

**Private GitHub repositories** can also serve as Plugin sources (currently in beta). This means your team can maintain internal Plugins in version control, with updates deployed through standard git workflows.

---

## Enterprise Features

For organizations deploying Plugins at scale:

- **Organization marketplace**: Admins curate and distribute approved Plugins across the company
- **OpenTelemetry tracking**: Monitor Plugin usage, performance, and errors through standard observability tools
- **Per-user provisioning**: Assign specific Plugin sets to roles or departments automatically
- **Auto-install policies**: New team members get the right Plugins on day one without manual setup

These features mean Plugins scale from individual productivity to organization-wide automation.

---

## Portability: Plugins Beyond Cowork

A key architectural insight: **Plugins are portable file systems you own.** They aren't locked to the Cowork desktop interface. The same Plugin works across:

- **Cowork** (desktop workflows)
- **Claude Agent SDK** (programmatic agent orchestration)
- Any future Claude surface that supports the Plugin format

This portability means investing in Plugin creation isn't a bet on a single interface. The workflows you build today carry forward as Claude's platform evolves.

---

## Current Limitations

Plugins and Connectors are powerful but have constraints:

**Rate Limits**: External APIs have usage limits. Claude queries efficiently, but massive data pulls may hit limits.

**Authentication**: Some services require re-authentication periodically. You'll be prompted when this happens.

**Read-only vs. Read-write**: Not all Connectors support modification. Check capabilities before planning write workflows.

**Service availability**: If the external service is down, the Connector won't work.

**Data freshness**: Connectors fetch current data, not real-time streams. Changes after Claude queries won't be reflected.

---

## When to Use Plugins and Connectors

**Ideal for:**

- Reports combining data from multiple sources
- Research that spans across platforms
- Cross-reference analysis (e.g., GitHub issues vs. Jira tickets)
- Automated reporting from SaaS platforms
- Department-specific workflows using Plugin templates

**Less ideal for:**

- Real-time monitoring (use dedicated dashboards)
- Massive data exports (use native export features)
- Complex data transformations (export, process locally)

---

## Privacy and Security

Plugins and Connectors require granting Claude access to your external accounts. Consider:

**Principle of Least Privilege**: Grant only the access needed. Read-only for reporting, specific folders rather than entire workspaces.

**Regular Audits**: Periodically review which Connectors are active and revoke access you no longer need.

**Sensitive Data**: Be cautious connecting accounts with highly sensitive information (HR data, financial systems).

**Service Terms**: Ensure using Plugins and Connectors complies with your organization's policies on external tool access.

---

## Try With AI

**Map Your Data Sources to Connectors:**

> "List the 5 services where I spend the most time accessing data for my work (e.g., Google Drive, Slack, Jira, Salesforce). For each one, check whether a Connector exists in the Anthropic directory (50+ available). Then identify which 2-3 would save the most time if Claude could query them directly in a single prompt — and describe one specific multi-source task I do today that would benefit."

**What you're learning:** Data source mapping — connecting your real workflow to the Connector ecosystem. This is the first step to replacing manual export/import with live multi-source queries.

**Design a Plugin for Your Role:**

> "Based on what you know about my work, design a custom Plugin for my role. Include: (1) which Connectors it would bundle, (2) two slash commands with structured form fields for tasks I repeat weekly, (3) one custom skill for domain reasoning I apply often. Explain why this bundle is more valuable than using each component separately."

**What you're learning:** Plugin architecture thinking — understanding how bundling Connectors, skills, and slash commands into a single package creates compound value. This is the mental model that separates using Cowork from designing workflows in Cowork.

---

## What's Next

Plugins and Connectors extend Cowork's reach to external data sources and bundled capabilities. But Cowork is still evolving. The next lesson covers current limitations, safety considerations, and what's coming in future updates — including Knowledge Bases that will give Claude persistent memory across sessions.

## Flashcards Study Aid

<Flashcards />
