---
sidebar_position: 3
title: "Part 3: Domain Agent Workflows — Building for the Enterprise"
---

# Part 3: Domain Agent Workflows — Building for the Enterprise

## Introduction & Overview

---

### A Different Kind of Builder

The first two parts of this book were addressed to a specific kind of person: someone who writes code, thinks in systems, and is comfortable staring at a terminal. Part 3 is addressed to everyone else.

That is not a small category. The world has roughly 1.2 billion knowledge workers — architects who spend their days navigating Revit models, engineers who own the specifications that shape multi-million-dollar projects, bankers who carry years of deal logic inside their heads, finance analysts who understand the difference between what a model says and what the market actually does, lawyers who read risk between the lines of a contract, and HR directors who have kept an organisation's institutional memory alive through three rounds of redundancies. These professionals are not developers. They have never needed to be. And the arrival of AI does not change that requirement.

What it does change is what they can build.

Anthropic Cowork and the vertical plugin architecture it sits on have made it possible for a CFO to deploy a financial research agent, for a lead architect to stand up a BIM coordination assistant that queries a live Revit model, for a compliance officer to configure a contract triage tool that understands the specific jurisdictions their firm operates in — all without writing a single line of code. The interface is natural language. The logic lives in a plain-text file called a SKILL.md. The connectors to existing enterprise systems are configured by an IT colleague once and then handed over. After that, the knowledge worker is in the driving seat entirely.

This is the fundamental shift Part 3 is built around. We are not teaching you to become a developer. We are teaching you to become the designer, director, and operator of agents that carry your expertise — and to do that work through a natural language interface built precisely for this purpose.

---

### Why Cowork, and Why Now

Anthropic Cowork is not a chatbot with extra features. It is a structured environment for deploying domain agents inside enterprise workflows. Its plugin architecture allows knowledge workers to create purpose-built agents — each with a defined persona, a set of operating principles, and explicit domain constraints — and to connect those agents to the systems they already use. An agent in Cowork can query a financial data source via an MCP connector, draft a contract summary and route it to a lawyer for review, pull a Revit model element by natural language query, or generate a prior authorisation research summary that follows clinical escalation rules.

The reason this matters now, and not two years ago, is maturity. The underlying models have reached a level of capability where domain-specific instructions — the kind a CFO or a senior architect or a banking analyst would write — produce outputs that are genuinely useful in production contexts. Cowork has built the governance layer around those models: permissions, audit trails, approval workflows, the shadow mode mechanism that keeps a human in the loop until an agent has earned its autonomy. The marketplace is emerging. The connectors are being built. The institutional appetite to deploy agents inside real enterprise workflows is, for the first time, ahead of the technology's ability to disappoint.

The window is open. The question is whether the knowledge workers who understand these domains deeply — the people whose expertise is what actually makes an agent valuable — are ready to walk through it.

Part 3 exists to make sure the answer is yes.

---

### Who This Part Is For

Part 3 is written for professionals in seven domain areas:

**Architecture and Engineering.** Architects using Revit who want to query their own models in natural language, automate BIM coordination, surface clash detection issues without opening a dedicated viewer, and build agents that understand their firm's BIM execution plan and specification library. Structural, MEP, and civil engineers who want agents that can trace change impact, generate RFIs, and coordinate across disciplines without the hours of model interrogation that currently consume a senior engineer's time.

**Business and Operations.** Operations leads who need onboarding agents that can answer new-hire questions at any hour of the day. HR directors who want to encode their organisation's institutional knowledge — the policies, the exceptions, the unwritten norms — into a system that doesn't resign or forget. Process owners who need agents that can triage tickets, maintain knowledge bases, and surface the information their teams need without a support request.

**Banking and Financial Services.** FP&A analysts who want research agents that can aggregate market data, surface comparable deals, and produce first-draft financial models in their organisation's template. Corporate finance professionals who need regulatory reporting automation and the ability to query large document sets in seconds. Banking teams who want to deploy agents that understand their credit risk frameworks, their deal approval logic, their jurisdiction-specific compliance requirements.

**Sales and Revenue.** Sales directors, RevOps leaders, and business development professionals who need lead qualification agents that encode their organisation's specific criteria, CRM automation that enriches prospect records without manual data entry, and outreach personalisation that reflects how their best salespeople actually work.

**Legal and Compliance.** In-house counsel and paralegals who want a first-pass contract triage agent that flags the clauses their organisation cares about. Compliance officers who need to track regulatory changes across multiple jurisdictions. Legal operations professionals who want to encode their firm's or department's document standards into an agent that can review against them consistently.

**Healthcare Operations.** Clinical administrators, health IT professionals, and operations teams in healthcare organisations who need prior authorisation research agents, patient communication workflow tools, and compliance tracking systems that can be configured to their specific clinical and regulatory environment — and that are architecturally designed from the ground up to handle protected health information appropriately.

**Technical Documentation and Specification.** Product managers, solutions architects, technical writers, and the professionals who sit between a development team and everyone else. People who need to produce PRDs, technical specifications, API documentation, handover documents, and requirements briefs at a pace and quality level that current manual workflows cannot sustain.

If your work falls into one of these categories, Part 3 is written for you. If it falls into several, you will find the methodology transfers readily: the way we extract domain knowledge from a senior architect is structurally similar to the way we extract it from a CFO. The domain is different. The process is the same.

---

### What You Will Build

Every chapter in Part 3 ends with a deployable artefact. Not a prototype. Not a proof of concept. A production-ready agent, configured in Cowork, connected to at least one real data source or enterprise system, validated against domain-specific scenarios, and documented well enough that a colleague in IT could maintain the connector layer without your involvement.

The artefacts vary by vertical. In the Finance chapter, you will build a financial research agent that connects to your organisation's data sources via MCP and produces structured research outputs in your team's preferred format. In the Architecture and BIM chapter, you will configure an agent that queries a Revit model through natural language and produces coordination reports that a project manager can act on directly. In the Legal chapter, you will build a contract triage agent that applies jurisdiction-specific logic to incoming documents and routes them with a structured risk summary. In Healthcare, you will build a prior authorisation research agent with the clinical escalation logic and PHI safeguards that make it appropriate for a real clinical environment — not just a demo.

In every case, the hands-on work is scoped to a session you can complete in two hours or less. The goal is not exhaustion. It is proof: by the end of each chapter, you should have direct personal evidence that an agent encoding your domain knowledge is not a theoretical possibility. It is a thing you have built, run against real scenarios, and seen produce useful output.

---

### The Methodology Behind the Chapters

Running through all seven domain chapters in Part 3 is a single underlying methodology: the Knowledge Extraction Method.

The core observation behind it is simple but consequential. An agent is only as good as its instructions. And the instructions that make a domain agent genuinely useful — the ones that distinguish it from a generic AI assistant with a custom system prompt — are grounded in expertise that does not live in documentation. It lives in the heads of experienced professionals. It is the CFO's instinct about which financial signals actually predict credit stress. It is the lead architect's judgment about when a coordination issue needs to be escalated to the structural engineer versus resolved in the Revit model directly. It is the senior lawyer's risk tolerance for certain contract clauses in certain jurisdictions. It is the banking analyst's understanding of the difference between what the credit framework says and what the credit committee actually does.

None of that knowledge is written down in a form an agent can use. Extracting it, structuring it, and translating it into agent instructions that produce consistent, reliable outputs is the skill that Part 3 teaches. We call the process the Knowledge Extraction Method. Chapter 16 describes it in full. Every domain chapter that follows applies it.

The method has two primary modes. Method A is an expert interview framework: a structured set of questions that surfaces tacit decision-making logic from domain professionals and translates it into explicit agent instructions. Method B is a document extraction framework: a three-pass process for working through policy documents, compliance manuals, BIM execution plans, and institutional records to produce the same kind of structured, testable instructions. For domains where knowledge lives both in expert heads and in institutional documents — legal, healthcare, architecture — the chapters describe how to apply both methods and reconcile the results when expert instinct and written policy conflict.

The output of the Knowledge Extraction Method is always the same artefact: a SKILL.md file. This is the instruction layer of your Cowork plugin. It defines the agent's persona, the questions it can answer, the principles it applies, and the constraints it operates under. It is written in plain English. It requires no programming knowledge to author or maintain. And it is, ultimately, the thing that makes your agent yours — the encoded expression of expertise that a generic AI tool cannot replicate, because the expertise is specific to you, your organisation, and your domain.

---

### How This Part Is Organised

Part 3 contains eleven chapters. The opening three chapters — Chapters 14, 15, and 16 — build the foundation that every domain chapter depends on.

**Chapter 14: The Enterprise Agentic Landscape** sets the strategic context. It explains why enterprise AI adoption stalled through 2024 and early 2025, what changed in 2026 to unlock it, and why the knowledge worker — not the developer — is the central figure in what comes next. It introduces the seven verticals that form the core of Part 3, maps the four monetisation models that govern how domain agents create financial value, and presents the Organisational AI Maturity Model that helps you qualify which organisations are ready for the kind of deployment this part teaches.

**Chapter 15: The Enterprise Agent Blueprint** describes the anatomy of a Cowork plugin in terms that a knowledge worker can act on. It explains the relationship between the SKILL.md file, the config.yaml metadata layer, and the MCP connector scripts — and, critically, who is responsible for each. The knowledge worker owns the SKILL.md. IT configures the connectors. An administrator controls the governance layer. The chapter describes the full MCP connector ecosystem, the Cowork plugin marketplace, and the decision framework for choosing between Cowork and OpenAI Frontier for a given organisational context.

**Chapter 16: The Knowledge Extraction Method** is the methodology chapter. It describes both extraction methods in full, provides the five-question expert interview framework, documents the three-pass document extraction process, and teaches you to translate extraction outputs into production-ready SKILL.md files. The hands-on exercise at the end of this chapter is the most important in Part 3: it asks you to apply the method to a domain you know, produce a first-draft SKILL.md, test it against five realistic scenarios, score it honestly, rewrite the two weakest instructions, and test again. The gap between your first draft and your revised draft is where the methodology becomes real.

Chapters 17 through 23 are the domain chapters. Each one follows the same structure: a description of the domain Digital FTE and what it can do, an application of the Knowledge Extraction Method to that domain, an implementation walkthrough in Cowork, a governance and validation framework appropriate to the domain's risk profile, a monetisation analysis, and a hands-on exercise that produces a deployable agent.

**Chapter 17: Finance Domain Agents** builds the financial research and analysis agent. It is the only chapter in Part 3 that demonstrates both a Cowork implementation and an OpenAI Frontier implementation side by side, because the finance vertical is where both platforms compete most directly and where the choice between them has the most significant organisational consequences.

**Chapter 18: Legal and Compliance Domain Agents** builds the contract triage and compliance tracking agent. Legal is the domain where the governance layer matters most: the chapter pays particular attention to shadow mode design, approval workflow architecture, and the principle that certain decisions must always involve a qualified attorney regardless of how accurate an agent becomes.

**Chapter 19: Sales Domain Agents** builds the lead qualification and CRM automation agent. Sales is the domain where the return on investment is most immediately measurable and where the success-fee monetisation model is most naturally applicable. The chapter addresses the personalisation paradox directly: the most effective sales agents are not the most automated ones.

**Chapter 20: HR and Operations Domain Agents** builds the onboarding and institutional memory agent. This is the primary use case for Method B: HR knowledge is almost entirely document-based, distributed across handbooks, compliance guides, benefits documentation, and policy archives. The chapter teaches you to treat this document corpus as the raw material for an agent that can answer any employee question at any time of day.

**Chapter 21: Healthcare Domain Agents** builds the prior authorisation research agent. Healthcare is the domain with the most demanding architectural requirements: HIPAA compliance, PHI handling, clinical accuracy thresholds, mandatory escalation logic, and a safety layer that must be non-negotiable regardless of how capable the underlying model becomes. The chapter is honest about which healthcare organisations should not attempt this deployment and why.

**Chapter 22: Architecture and BIM Domain Agents** builds the natural language Revit interface and BIM coordination agent. This chapter introduces the most technically distinctive element in Part 3: a custom MCP server built around a live Revit model. The server is built by IT or a developer and handed to the knowledge worker as a Cowork connector. What the architect does with it — the SKILL.md that encodes spatial reasoning principles, discipline escalation logic, and code compliance as a standing context — is what makes it a genuine enterprise tool rather than a technical demonstration.

**Chapter 23: Technical Documentation and Specification Domain Agents** builds the specification generation and requirements review agent. This chapter is addressed to the professionals who work between technical teams and everyone else: product managers, solutions architects, technical writers, and the people who turn conversation, whiteboard sessions, and fragmented email threads into structured documents that a development team can actually build from.

**Chapter 24: Enterprise Deployment Strategy** closes Part 3 by assembling everything the domain chapters have demonstrated into a coherent commercial and organisational framework. It covers pricing architecture with real numbers from real deployment contexts, portfolio strategy for organisations deploying across multiple verticals, the distribution decision between direct sales and consulting partner channels, platform commitment decisions, and the long-term defensibility of domain agent intellectual property. It is the chapter that turns a practitioner into someone who can advise an organisation on its enterprise AI strategy — not from theory, but from the accumulated experience of building seven real agents across seven real domains.

---

### A Note on What This Part Does Not Teach

Part 3 does not teach you to build MCP servers. It does not teach you to write Python scripts, configure YAML infrastructure, or deploy cloud-native architectures. Those skills are covered in Part 2, and they are genuinely important. They are also not your job.

Your job — the job Part 3 is designed to equip you for — is to understand your domain deeply enough to encode it, to operate a Cowork plugin confidently enough to deploy it, and to validate your agent rigorously enough to trust it. The technical infrastructure that makes this possible is built and maintained by colleagues who have different skills. Part 3 teaches you to work with them productively: to know what to ask for, to understand what they have built, and to take clear ownership of the layer that is genuinely yours.

That layer — the SKILL.md, the domain knowledge it encodes, the validation dataset you have built to test it, the institutional expertise it represents — is also the most valuable layer. Generic AI platforms will commoditise the infrastructure. They will not commoditise the twenty years of deal-making logic in a senior banker's head, or the spatial reasoning a lead architect applies to a coordination clash, or the risk calibration a compliance officer uses to decide which contract clause needs to go to legal counsel. That knowledge is yours. Part 3 teaches you to deploy it.

---

### Where Part 3 Fits in the Larger Story

Parts 1 and 2 of this book described the Agent Factory: the paradigm shift from building software tools to manufacturing AI employees, the technical architecture of agent systems, the development environment that makes agentic coding possible, and the spec-driven methodology that produces reliable, maintainable agents at scale.

Part 3 is the story of those agents arriving in the organisations that need them — carrying not just technical capability, but domain expertise. The architecture team that deploys a BIM coordination agent is not buying a software tool. They are deploying a new kind of team member that understands their project delivery methodology, their BIM standards, their firm's risk appetite, and their client's requirements. The banking team that deploys a financial research agent is not automating a task. They are encoding institutional knowledge that currently lives in one person's head and could walk out the door with them.

This is the promise of the enterprise agentic era: not that AI will replace the knowledge workers who understand complex domains, but that those knowledge workers will be the ones who build and operate the agents that transform how their industries function. The developers in Parts 1 and 2 built the factory. The professionals in Part 3 are the people who know what to manufacture.

Let's begin.

---

*Part 3 begins with Chapter 14: The Enterprise Agentic Landscape.*
