---
sidebar_position: 6
title: "The MCP Connector Ecosystem"
description: "Survey the production MCP connectors available across enterprise domains, understand connector scoping and access controls, and learn the process and timeline for commissioning custom connectors when marketplace options do not exist"
keywords:
  [
    "MCP connectors",
    "enterprise integration",
    "Cowork plugins",
    "connector ecosystem",
    "custom connectors",
    "Salesforce MCP",
    "Snowflake MCP",
    "connector commissioning",
    "data access",
    "enterprise AI",
  ]
chapter: 15
lesson: 6
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Identify Domain-Appropriate MCP Connectors"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can survey the connector ecosystem and identify which connectors serve their professional domain, including licensing requirements where applicable"

  - name: "Specify Custom Connector Requirements"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can independently produce a plain-language custom connector specification that identifies the system, data scope, query types, and required permissions — sufficient for a developer to build from"

  - name: "Plan Connector Dependencies for Deployment"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can assess their plugin's connector needs, identify which require commissioning, and incorporate realistic timelines into a deployment plan"

learning_objectives:
  - objective: "Identify which production MCP connectors are available for your professional domain and explain their access type and key capabilities"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Given a professional domain (finance, legal, healthcare, etc.), student can list the relevant connectors from the ecosystem and describe what data access each provides"

  - objective: "Distinguish between marketplace connectors and custom connectors, using Revit as an example of when and why custom commissioning is required"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can explain why Revit required a custom connector rather than a marketplace connector, and identify analogous situations in their own domain"

  - objective: "Draft a custom connector specification and estimate its development timeline based on the underlying system's API maturity"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can produce a connector specification that names the system, defines scope, lists query types, and assigns permissions — and correctly estimate whether it falls in the 2-4 week or 4-8 week category"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Production connector categories (CRM, communication, knowledge, data, workflow, financial, legal, clinical, design, contracting, enrichment)"
    - "Connector scoping (folder-level, site-level, mailbox-level, row-level security)"
    - "Custom connector commissioning process and specification format"
    - "Development timeline expectations based on API maturity"
  assessment: "4 concepts at A2-B1 level — within the 5-7 cognitive limit for the target proficiency band. The connector table serves as a reference to reduce working memory load during initial reading."

differentiation:
  extension_for_advanced: "Research the MCP specification itself and identify what it would take to build a connector to a system in your domain that does not yet have one. Draft both the connector specification and a technical summary of the API endpoints you would need to expose."
  remedial_for_struggling: "Focus on the connector table. For your specific domain, identify the two connectors most relevant to your work and write two sentences each: what data they provide and what access controls they apply. Do not move to custom commissioning until the marketplace picture is clear."

teaching_guide:
  lesson_type: "reference"
  session_group: 3
  session_title: "The Connector Ecosystem"
  key_points:
    - "The marketplace connector ecosystem covers most enterprise integration needs — students should default to marketplace connectors before considering custom"
    - "Custom connectors require a commissioning process: knowledge worker specifies, IT builds — this is not self-service and requires explicit project planning time"
    - "Timeline expectations are not negotiable: 2-4 weeks for modern APIs, 4-8 weeks for complex or legacy systems — these must be in project plans from the start"
    - "Licensing requirements for financial and legal connectors are external dependencies that must be resolved before connector commissioning begins"
    - "Connector scoping is a security feature, not a limitation — it protects data access to what was explicitly configured"
  misconceptions:
    - "Students may assume all connectors are available out of the box — financial and legal connectors require licensed subscriptions that the organisation must already hold"
    - "Students may underestimate custom connector timelines — 2-4 weeks is the floor for modern APIs, and complex or legacy systems take longer"
    - "Students may think they can specify connectors themselves in config.yaml — connectors are IT-owned infrastructure, the knowledge worker specifies requirements in plain language and IT builds"
    - "Students may conflate connector scoping with connector capability — a Confluence connector scoped to one space is not a less capable connector, it is a correctly configured one"
  discussion_prompts:
    - "Which systems in your current role would need MCP connectors for your agent to be useful? Are those systems in the marketplace?"
    - "If your most important system is not in the marketplace, what would your plain-language specification look like? What data access would you need?"
    - "Have you ever waited on an IT integration to move forward with a project? How would knowing the 2-4 week or 4-8 week timeline have changed your planning?"
  teaching_tips:
    - "Walk through the connector table domain-by-domain — students recognise their own domain's connectors most readily, and that recognition builds confidence in the ecosystem's breadth"
    - "Use the Revit example as the pivot point between marketplace and custom — it is concrete enough to make the distinction vivid"
    - "Emphasise that connector scoping is configured by IT, not chosen by the knowledge worker — this prevents students from assuming they have unlimited access once a connector is present"
    - "Timeline expectations should be stated as planning facts, not estimates — 'budget 4-8 weeks' is more useful than 'it might take a few weeks'"
  assessment_checks:
    - question: "What is the difference between a marketplace connector and a custom connector?"
      expected_response: "A marketplace connector is a pre-built, maintained MCP connector available for standard enterprise systems (Salesforce, Jira, Snowflake, etc.). A custom connector is built specifically for a system not available in the marketplace — the knowledge worker specifies what data access is needed and IT builds it."
    - question: "Why do Bloomberg and LexisNexis connectors require licensing?"
      expected_response: "Bloomberg and LexisNexis are licensed data services. The MCP connector provides access to the data, but the organisation must already hold a licensed subscription to those services for the connector to be usable."
    - question: "Why is the Revit connector a custom connector rather than a marketplace connector?"
      expected_response: "Revit is a domain-specific engineering design tool and each organisation's Revit environment is configured differently. There is no generalised Revit connector in the marketplace — a developer builds a custom connector tailored to the specific organisation's Revit setup and data structures."
    - question: "A knowledge worker wants to connect their agent to their company's on-premises ERP system from 2009. What timeline should they budget for the connector?"
      expected_response: "4-8 weeks. Legacy systems typically lack modern REST APIs and require custom integration work. This timeline must be included in the project plan from the start."
---

# The MCP Connector Ecosystem

In Lesson 3, you saw that connector scripts are the integration infrastructure of a Cowork plugin — they run continuously, handle authentication, and translate your enterprise systems' data into formats the agent can reason over. That lesson established what connectors do. This lesson maps what connectors exist.

The question every domain professional asks when they begin designing their agent is whether the system they most need to integrate with is already connected. For most enterprise environments, the answer is yes — the Cowork marketplace includes production connectors for the systems that appear on most enterprise software inventories. For the systems that are genuinely specific to your organisation's configuration or industry tooling, there is a commissioning process that follows a predictable timeline. Understanding both sides of this picture is the prerequisite for building a realistic deployment plan.

This lesson is a reference lesson. The connector table is designed to be consulted, not memorised. What you should take from it is the landscape — which categories of integration exist, what access types they provide, and where licensing requirements enter the picture.

## The Marketplace Connector Landscape

The connectors below represent the production ecosystem as of early 2026. They are organised by category. Each connector has been built, maintained, and validated by Cowork's integration team. Configuration and scoping are handled in the plugin's `config.yaml` by IT — the knowledge worker specifies what they need in plain language, and the technical implementation follows.

| Category | Connector | Access Type | Key Feature / Note |
|---|---|---|---|
| **CRM** | Salesforce (Sales Cloud + Service Cloud) | Read/Write | Custom field mapping supported |
| **CRM** | HubSpot (Marketing, Sales, CRM APIs) | Read/Write | Custom field mapping supported |
| **Communication** | Gmail | Read + Write (drafts/sending) | Scoped to specified mailboxes and threads only |
| **Communication** | Outlook | Read + Write (drafts/sending) | Scoped to specified mailboxes and threads only |
| **Knowledge / Document** | Confluence | Read | Folder-level and site-level scoping |
| **Knowledge / Document** | Notion | Read | Folder-level and site-level scoping |
| **Knowledge / Document** | SharePoint Online + On-Premises | Read | Folder-level and site-level scoping |
| **Data / Analytics** | Snowflake | Read (parameterised query) | Row-level security supported |
| **Data / Analytics** | BigQuery | Read (parameterised query) | Parameterised query execution |
| **Workflow / Process** | Jira | Read/Write | Issue creation, comments, status transitions, queries |
| **Workflow / Process** | ServiceNow | Read/Write | Incident and change management |
| **Financial Data** | Bloomberg | Read | Market data, financials, news — licensed subscription required |
| **Financial Data** | Refinitiv | Read | Market data, financials, news — licensed subscription required |
| **Legal Research** | LexisNexis | Read | Legal and compliance use cases — licensed subscription required |
| **Legal Research** | Westlaw | Read | Legal and compliance use cases — licensed subscription required |
| **Clinical Systems** | Epic | Read/Write | HIPAA-compliant configuration required |
| **Clinical Systems** | Cerner | Read/Write | HIPAA-compliant configuration required |
| **Design / Engineering** | Revit MCP Server | Read (structured BIM data) | Custom connector — not a marketplace connector |
| **Contracting / Signature** | DocuSign | Read/Write | Contract workflows, signature status, document repositories |
| **Data Enrichment** | Clay | Read/Write | Prospect databases and enrichment workflows |

### CRM Connectors

The Salesforce and HubSpot connectors cover the two dominant CRM platforms in enterprise environments. Both provide read and write access across their core data objects — accounts, contacts, opportunities, deals, pipeline stages — and both support custom field mapping. This means your organisation's custom fields are accessible to the agent, not just the standard schema. A sales agent querying deal status or a customer success agent retrieving account health data will find these connectors sufficient for the majority of CRM-driven workflows.

### Communication Connectors

The Gmail and Outlook connectors provide read access to specified mailboxes and threads, and write access for drafting and sending if that permission has been granted in the plugin's configuration. Neither connector accesses mailboxes that were not specified in the config. This is a deliberate security property, not a limitation — the agent can only see what IT has explicitly opened to it. An agent that monitors a shared inbox for incoming contract requests, for example, would be configured with access to that inbox only.

### Knowledge and Document Connectors

Confluence, Notion, and SharePoint — including both the cloud version and on-premises deployments — provide read access to organisational knowledge bases. All three support scoping at the folder level and the site level. A legal team's Confluence space can be connected without granting access to the engineering wiki. SharePoint's on-premises support matters in regulated industries where cloud document storage is restricted by policy.

### Data and Analytics Connectors

The Snowflake and BigQuery connectors provide read access to data warehouses via parameterised query execution. Snowflake additionally supports row-level security, which means data access can be governed at the row level according to existing security policies rather than requiring a separate access control layer. An analyst agent generating competitor benchmarking reports from a Snowflake warehouse, or a finance agent querying BigQuery for revenue data, would use these connectors without requiring raw database access to be extended to the agent.

### Workflow and Process Connectors

Jira and ServiceNow cover the two most common enterprise workflow systems. The Jira connector supports issue creation, comment posting, status transitions, and queries — a project management agent can read the current state of a sprint and create follow-up tickets. The ServiceNow connector covers incident and change management, making it relevant for IT operations agents and service desk automation.

### Financial Data Connectors

The Bloomberg and Refinitiv connectors provide read access to market data, financial statement data, and financial news. A critical dependency applies here: both connectors require the organisation to already hold a licensed subscription to the respective data service. The MCP connector is the integration layer — it does not grant access to data that the organisation has not licensed. A financial research agent would typically need both a CRM connector (for client context) and a Bloomberg or Refinitiv connector (for market data), with the latter requiring a licence procurement conversation before the connector can be activated.

### Legal Research Connectors

LexisNexis and Westlaw are the two primary legal research databases used in enterprise legal and compliance functions. Both are licensed services, and the same dependency applies as with financial data connectors: the connector cannot be activated without a valid subscription. Legal and compliance use cases — contract review agents, regulatory monitoring agents — are the primary consumers of these connectors.

### Clinical System Connectors

Epic and Cerner are the dominant electronic health record platforms in healthcare environments. Both connectors support read and write access, and both require HIPAA-compliant configuration. The specific requirements for clinical connector deployment are covered in detail in Chapter 21, which addresses the healthcare domain specifically. Healthcare organisations should treat the HIPAA configuration requirement as a prerequisite, not an afterthought — it must be established before any clinical connector goes into production.

### Contracting and Data Enrichment Connectors

The DocuSign connector provides read and write access to contract workflows, tracking signature status, accessing document repositories, and managing routing. It is used in legal, procurement, and commercial operations contexts. The Clay connector provides access to prospect databases and enrichment workflows, making it the primary connector for sales domain agents that need enriched contact and company data beyond what a CRM connector provides.

## Custom Connectors: When the Marketplace Does Not Cover Your System

The marketplace covers the systems that appear on most enterprise software inventories. But enterprise environments are not homogeneous. Many organisations run systems that are either too niche for a generalised connector to be viable, or configured in ways that are specific enough to require a connector built for their particular installation.

The Revit connector listed in the table is an example. Revit is Autodesk's building information modelling software, used heavily in architecture, engineering, and construction. There is no generalised Revit connector in the marketplace, because each organisation's Revit environment is structured differently — different project hierarchies, different custom parameters, different data schemas. A developer builds a custom Revit MCP server tailored to the specific organisation's Revit installation, exposing BIM data as queryable structured data. The knowledge worker who uses that connector experiences it the same way as any marketplace connector — they specify what they need in their SKILL.md and the agent queries it — but the connector itself was built specifically for their environment. Chapter 22 covers the construction and engineering domain in detail, including the Revit connector architecture.

The commissioning process for a custom connector follows a consistent pattern. The knowledge worker specifies what they need in plain language: which system to connect to, what data should be accessible, what query types the agent will need to run, and what permissions are appropriate. The developer takes that specification and builds. The knowledge worker does not write code; they write requirements.

A sufficient plain-language specification addresses four questions:

**Which system?** Name the system precisely, including the version if relevant. "Our on-premises SAP S/4HANA instance at [environment]" is more useful than "SAP."

**What data?** Specify the data objects or entities the agent needs access to. "Open purchase orders, vendor master records, and goods receipt confirmations" is more useful than "procurement data."

**What queries?** Describe the types of questions the agent will need to ask. "Filter purchase orders by vendor and date range," or "retrieve all open approvals assigned to a specific cost centre." The developer uses these to design the query API.

**What permissions?** Specify read-only or read-write, and any row-level or scope restrictions that should apply. If the agent should only see purchase orders above a certain value threshold, or only within a specific regional entity, that constraint belongs in the specification.

## Timeline Expectations

Custom connector development follows predictable timelines based on the underlying system's API maturity.

| System Characteristic | Typical Timeline |
|---|---|
| Modern API (REST, documented, actively maintained) | 2-4 weeks |
| Complex or legacy system (older protocols, sparse documentation, custom schemas) | 4-8 weeks |

These timelines are not estimates to be adjusted later — they are planning facts. A plugin that requires a custom connector must include that timeline in the project plan from the outset. An agent that depends on a legacy ERP connector cannot go live in three weeks regardless of how quickly the SKILL.md is written. Connector commissioning and SKILL.md development can run in parallel — but connector commissioning must start first, because it is on the critical path.

The 2-4 week figure applies when the target system has a well-documented REST API, an active developer community, and clear authentication flows. Modern SaaS systems and recently rebuilt enterprise applications typically fall here.

The 4-8 week figure applies when the system requires significant investigation — legacy protocols, sparse or inconsistent documentation, custom schemas that require reverse-engineering, or authentication flows that predate modern standards. On-premises systems from the 2000s and 2010s frequently fall in this category. Budget accordingly.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to apply the connector ecosystem to your domain.

### Prompt 1: Map Your Domain's Connector Needs

```
I work as [YOUR ROLE] in [YOUR DOMAIN/INDUSTRY]. Based on the MCP connector ecosystem described in this lesson, help me identify which connectors would be most relevant to my work.

For each connector category (CRM, communication, knowledge/document, data/analytics, workflow, financial, legal, clinical, contracting, enrichment), tell me:
1. Whether it's likely relevant to my domain
2. What specific workflows I might use it for
3. Any licensing or configuration requirements I should be aware of

Then identify which of my important systems are NOT covered by the marketplace, and would require custom connector commissioning.
```

**What you're learning:** How to translate the connector table from an abstract reference into a concrete picture of your own agent's integration requirements. The goal is to leave this exercise with a clear view of which connectors you need, which are available, and which require commissioning.

### Prompt 2: Draft a Custom Connector Specification

```
I need to commission a custom MCP connector for [DESCRIBE YOUR SYSTEM: name, version, whether it's cloud or on-premises, what kind of data it holds].

Help me write a plain-language connector specification that covers the four required elements:
1. System identification (precise system name, version, environment)
2. Data objects needed (specific entities or data types the agent should access)
3. Query types (the questions the agent will need to ask — filter by X, retrieve by Y, etc.)
4. Permission scope (read-only or read-write, any row-level or entity-level restrictions)

Ask me clarifying questions if you need more information. The output should be a specification I can hand to an IT developer.
```

**What you're learning:** How to produce an actionable connector specification rather than a vague request. The difference between "I need access to our CRM" and a specification that a developer can build from is the difference between a connector that takes eight weeks and one that takes two.

### Prompt 3: Build a Connector Deployment Timeline

```
I'm planning to deploy a Cowork plugin for [YOUR USE CASE]. The plugin will need the following connectors:

[LIST YOUR CONNECTORS — include both marketplace connectors you've identified and any custom connectors you need]

For the custom connectors, I believe the underlying systems are: [describe each system's API maturity — modern REST API, or older/legacy system].

Help me build a realistic deployment timeline that:
1. Identifies which connectors can be activated immediately (marketplace)
2. Estimates development timelines for custom connectors (2-4 weeks or 4-8 weeks, with reasoning)
3. Puts connector commissioning on the critical path appropriately
4. Identifies any licensing requirements that must be resolved before connector activation
5. Shows what can run in parallel (SKILL.md development, governance setup) versus what must be sequential
```

**What you're learning:** How to build a realistic deployment plan that treats connector timelines as planning facts rather than optimistic estimates. Connector dependencies are frequently the longest lead-time item in a plugin deployment — understanding this early prevents timeline surprises later.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 7: The Governance Layer →](./07-governance-layer.md)
