---
sidebar_position: 9
title: "The Cowork Plugin Marketplace"
description: "Understand how the Cowork Plugin Marketplace distributes domain expertise through vertical skill packs and connector packages, and assess whether your own knowledge qualifies as publishable"
keywords:
  [
    "Cowork marketplace",
    "plugin marketplace",
    "vertical skill packs",
    "connector packages",
    "domain expertise",
    "monetisation",
    "SKILL.md publishing",
    "knowledge worker",
    "enterprise AI",
    "transferable knowledge",
  ]
chapter: 15
lesson: 9
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Understand the Marketplace Distribution Mechanism"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain how the Cowork Plugin Marketplace enables organisations to discover, subscribe to, and deploy plugins built by external knowledge workers, and describe the difference between marketplace plugins and bespoke plugins"

  - name: "Distinguish Vertical Skill Packs from Connector Packages"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain what each category contains, who customises it after subscription, and what deployment effort is required for each"

  - name: "Assess Expertise Publishability"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can evaluate a described body of domain knowledge and determine whether it crosses the transferability threshold for marketplace publication, citing the IP distinction between general best practice and proprietary institutional context"

learning_objectives:
  - objective: "Explain how the Cowork Plugin Marketplace works as a distribution mechanism for domain expertise"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe in their own words how a knowledge worker publishes a plugin, how an organisation discovers and subscribes to it, and what happens at the point of deployment"

  - objective: "Distinguish between vertical skill packs and connector packages, including what each contains and who customises each after subscription"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Given descriptions of two marketplace listings, student correctly identifies which is a skill pack and which is a connector package, and explains the customisation requirement for each"

  - objective: "Assess a described body of domain knowledge and determine whether it qualifies for marketplace publication based on the transferability principle"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given three knowledge descriptions (one clearly publishable, one clearly unpublishable, one borderline), student correctly classifies each and provides a one-sentence justification for each decision"

cognitive_load:
  new_concepts: 3
  concepts_list:
    - "Marketplace mechanism (discovery, subscription, deployment without original author)"
    - "Vertical skill packs (domain-specific SKILL.md templates as starting points)"
    - "Connector packages (bundled MCP connectors with SKILL.md templates)"
  assessment: "3 concepts at A2-B1 level — within the 5-7 cognitive limit for this tier. All three concepts build directly on SKILL.md and connector knowledge established in earlier lessons. The publishability assessment adds one evaluative judgement, which is appropriate for B1."

differentiation:
  extension_for_advanced: "Design a marketplace listing for a vertical skill pack in your domain. Write the listing description (what the pack contains, what the subscriber must customise, what institutional knowledge is excluded), and draft a one-paragraph justification for why the encoded knowledge crosses the transferability threshold."
  remedial_for_struggling: "Focus on the IP distinction only. For your current role, list five things you know about your work. For each item, ask: could a practitioner at a different organisation in the same field benefit from this knowledge without needing access to your organisation's systems, clients, or internal documents? If yes, it is potentially publishable. If no, it stays internal."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Distribution and Monetisation"
  key_points:
    - "The marketplace is a distribution mechanism — it solves the discovery and deployment problem for generalisable domain expertise. Without it, a well-designed SKILL.md stops at the organisation that built it."
    - "Vertical skill packs are starting points, not finished products. The subscriber receives a well-structured SKILL.md and must customise it with their own jurisdiction settings, clause standards, and escalation routing. The marketplace provides architecture; the knowledge worker provides institutional knowledge."
    - "Connector packages reduce deployment friction by bundling the MCP connectors alongside the SKILL.md template. The subscriber still needs to configure API credentials and permission scopes, but the connector infrastructure is pre-built."
    - "The publishability test is a single question: is this knowledge general enough to be valuable to a practitioner at a different organisation without access to your proprietary context? General best practice = publishable. Specific institutional knowledge = not publishable."
    - "The economics of marketplace publishing (from Chapter 14 Lesson 5) are most attractive when domain expertise is valuable across many organisations but does not depend on any single organisation's proprietary context."
  misconceptions:
    - "Students may think they are selling their organisation's competitive advantage. Clarify: publishable knowledge is general domain best practice, not proprietary institutional context. Publishing what your competitors already know is the model."
    - "Students may assume marketplace plugins are ready to deploy without customisation. Both categories require subscriber customisation — skill packs need institutional knowledge added, connector packages need API credentials and permission scopes configured."
    - "Students may conflate marketplace plugins with bespoke plugins. A marketplace plugin is designed to be general enough to serve many organisations. A bespoke plugin encodes one organisation's specific context and is never appropriate for publication."
  discussion_prompts:
    - "Think about the domain knowledge you use most in your work. How much of it is general best practice that any practitioner in your field would recognise? How much depends on your specific organisation's systems, clients, or internal standards?"
    - "If you could publish one SKILL.md to the marketplace, what would it encode? Who would subscribe? What would the subscriber still need to customise themselves?"
  teaching_tips:
    - "The transferability question is the most important concept in this lesson. Spend time on concrete examples — walk through specific knowledge claims and classify them as publishable or not."
    - "Connect the marketplace economics to Chapter 14 Lesson 5 explicitly, but do not re-explain the four models. The point here is to show which model applies (Marketplace) and why the economics are attractive."
    - "The distinction between starting point and finished product is critical. Students who understand this will not be frustrated when they subscribe to a skill pack and discover it requires significant customisation. That customisation is the feature, not a defect."
  assessment_checks:
    - question: "What is a vertical skill pack?"
      expected_response: "A domain-specific SKILL.md template that encodes general best practice for a professional function — contract triage, financial research, BIM coordination — without organisation-specific customisation. It is a starting point that the subscribing organisation customises with their own jurisdiction settings, clause standards, and escalation routing."
    - question: "What does a connector package contain that a vertical skill pack does not?"
      expected_response: "A connector package bundles MCP connectors alongside a SKILL.md template, enabling more complete deployment from a single subscription. The connectors are pre-configured for standard API patterns, but the subscriber must still configure their own API credentials and permission scopes."
    - question: "What is the test for whether domain knowledge is publishable to the marketplace?"
      expected_response: "The transferability test: is this knowledge valuable to practitioners at other organisations without requiring access to your proprietary systems, client lists, or internal documents? General domain best practice passes. Organisation-specific institutional knowledge does not."
---

# The Cowork Plugin Marketplace

In Lesson 8, you established how the three-component model distributes ownership: you write the SKILL.md, IT configures the connectors, the administrator governs the deployment. The result is a plugin that serves one organisation's domain workflows. But the question this lesson asks is a different one: what happens when the SKILL.md you have built encodes expertise that could benefit not just your organisation, but dozens of others doing similar work?

The answer is the Cowork Plugin Marketplace — a distribution mechanism designed for exactly that situation. When domain expertise is genuinely generalisable, the marketplace provides the infrastructure to publish it, the discovery layer for other organisations to find it, and the deployment pathway that allows a subscribing organisation to use a plugin built by someone they have never met. A published plugin can be subscribed to, configured with the subscriber's own connector settings, and deployed without involvement from the original author.

This changes the economics of expertise. A SKILL.md that took a senior contracts lawyer six weeks to refine can, once published, generate ongoing subscription revenue from every legal practice that benefits from the same contract triage logic. The marginal cost of each additional subscriber is effectively zero. The expertise has become an asset, not just a capability.

## How the Marketplace Works

The marketplace operates on a straightforward subscription model. A knowledge worker publishes a plugin — typically a vertical skill pack, a connector package, or both — with a listing that describes what the plugin does, which professional domain it serves, and what customisation the subscriber will need to perform before deployment.

Subscribing organisations discover plugins through the marketplace's domain filters and search tools. Once a subscription is initiated, the plugin's components are provisioned to the subscriber's Cowork environment. Crucially, the subscriber gains access to the SKILL.md and the connector infrastructure, but they are not deploying the author's plugin as-is. They are deploying a starting point that requires their own institutional knowledge to complete.

This distinction matters because it separates what the marketplace distributes — architectural knowledge, domain structure, general best practice — from what only the subscribing organisation can provide: their specific jurisdiction settings, their clause standards, their escalation routing, their API credentials. The marketplace handles the first category. The knowledge worker inside the subscribing organisation handles the second.

## Vertical Skill Packs

A vertical skill pack is a domain-specific SKILL.md template that encodes best practice for a professional function without encoding any single organisation's proprietary context. Think of it as the architecture of a domain agent: the Persona section establishes the appropriate professional identity, the Questions section defines the scope of the function and its boundaries, and the Principles section captures the operating logic that any competent practitioner in that domain would recognise as sound.

What the pack does not include is the institutional knowledge that makes a plugin genuinely specific. A contract triage skill pack for the legal domain will encode the general logic of how a contract review agent should approach unfamiliar clause language, when to escalate, and how to categorise risk. It will not encode the specific clause standards your firm has developed over twenty years, the jurisdiction-specific risk thresholds your practice has calibrated against case outcomes, or the escalation routing your internal hierarchy requires.

The subscriber receives a well-structured SKILL.md ready for customisation. The marketplace provides the architecture; the knowledge worker inside the subscribing organisation provides the institutional knowledge that transforms a general template into a deployed agent that actually reflects how their practice works. This is not a deficiency of the skill pack — it is the design. The general cannot substitute for the specific. What the pack sells is the months of structural thinking that the subscriber would otherwise have to do from scratch.

| Property | Vertical Skill Pack |
| --- | --- |
| **What it contains** | SKILL.md template with Persona, Questions, and Principles sections reflecting general domain best practice |
| **What it does not contain** | Organisation-specific jurisdiction settings, clause standards, escalation routing, client conventions |
| **Who customises it** | A knowledge worker inside the subscribing organisation, using the template as a starting point |
| **Deployment effort** | Moderate — the SKILL.md must be customised before deployment; connectors must be configured separately |
| **Best for** | Organisations that have the domain expertise to customise but want to avoid building the structural scaffold from scratch |

Domains with well-developed vertical skill packs in the marketplace include contract review (covering major common law jurisdictions), financial research (covering equity analysis and fixed income), BIM coordination (covering standard building code categories), and clinical triage (covering primary care assessment frameworks). Each pack represents a publishable body of general best practice. None encodes a specific firm's proprietary knowledge.

## Connector Packages

A connector package takes the vertical skill pack concept and extends it: rather than providing the SKILL.md template alone, a connector package bundles MCP connectors alongside the template to enable more complete deployment from a single subscription.

The rationale is practical. Many domain workflows depend on a predictable set of external integrations. A financial research agent reliably needs access to market data, financial databases, and internal data warehouses. Rather than requiring each subscribing organisation to commission these connectors separately — a process that, as Lesson 6 explained, takes two to eight weeks depending on the system — a connector package provides pre-built connectors configured for standard API patterns. The subscriber still needs to provide their own API credentials and configure permission scopes appropriate to their deployment. But the connector infrastructure itself — the scripts that run continuously, handle authentication, and translate data formats — arrives pre-built rather than requiring commissioning.

| Property | Connector Package |
| --- | --- |
| **What it contains** | SKILL.md template plus pre-built MCP connectors for the systems the domain agent typically requires |
| **What it does not contain** | API credentials, organisation-specific permission scopes, proprietary data access |
| **Who customises it** | IT configures connector credentials and scopes; knowledge worker customises the SKILL.md |
| **Deployment effort** | Lower than a skill pack alone — connector infrastructure is pre-built, reducing time-to-deployment |
| **Best for** | Organisations that need the complete deployment package and have IT capacity to configure credentials |

A financial research connector package, for example, bundles connectors for Bloomberg, Snowflake, and common CRM platforms alongside a financial research SKILL.md template. The subscribing organisation connects their Bloomberg terminal credentials, scopes the Snowflake access to their data warehouse, and assigns appropriate CRM read permissions — tasks that are specific to their environment. What they do not have to do is specify and commission the connector infrastructure from scratch.

## The Publishability Test

Not every SKILL.md belongs in the marketplace. The central question for any knowledge worker considering publication is whether their expertise crosses the transferability threshold.

Transferable knowledge is knowledge that a practitioner at a different organisation — a firm they have never worked with, in a city they have never visited — would recognise as sound and would benefit from encoding. General best practice for contract review in English common law jurisdictions is transferable. The standard approach to qualifying a sales lead in enterprise software is transferable. The general framework for reviewing building plans against standard building codes is transferable.

Non-transferable knowledge is knowledge that only has value in the context of your specific organisation's systems, clients, relationships, or internal history. Your firm's interpretation of a particular statutory provision based on twenty years of case outcomes is not publishable — it is your competitive edge. Your client relationship conventions are not publishable — they are your proprietary context. Your internal escalation routing is not publishable — it reflects your specific hierarchy.

The IP distinction is not complicated, but it requires honest self-assessment. The easiest test: could a practitioner at a competitor organisation, using only publicly available information and general professional training, arrive at the same knowledge independently? If yes, it is transferable. If the knowledge depends on access to your clients, your cases, your systems, or your internal documents to make sense, it is not transferable.

This test also connects directly to the marketplace economics covered in [Chapter 14 Lesson 5](/docs/03-Domain-Agent-Workflows/14-enterprise-agentic-landscape/05-four-monetisation-models). The Marketplace model is most economically attractive for domain expertise that is valuable across many organisations but not dependent on any single organisation's proprietary context. Revenue per subscriber runs in the range of hundreds of pounds per month. Marginal cost of each additional subscriber is effectively zero. The economic case is strong — but only for knowledge that genuinely qualifies.

## Skill Packs Versus Connector Packages: A Summary

| Dimension | Vertical Skill Pack | Connector Package |
| --- | --- | --- |
| **Included** | SKILL.md template only | SKILL.md template + MCP connectors |
| **Subscriber customises** | SKILL.md with institutional knowledge; configures connectors separately | SKILL.md with institutional knowledge; configures connector credentials |
| **IT involvement** | Connector commissioning or selection required | Credential configuration only |
| **Time to deployment** | Longer (connector work needed) | Shorter (connectors pre-built) |
| **Best use case** | Organisations with strong IT connector infrastructure already | Organisations new to the connector ecosystem |
| **Publisher creates** | SKILL.md template encoding general domain best practice | SKILL.md template plus connector scripts for standard integrations |

Both categories rest on the same foundational principle: the marketplace distributes architecture and general practice; the subscribing organisation provides institutional specificity. The marketplace cannot replace the knowledge worker inside the subscribing organisation. It can, however, eliminate months of structural work that would otherwise be duplicated across every organisation attempting to build a similar capability.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to apply the concepts from this lesson.

### Prompt 1: Assess Your Domain Expertise

```
I work as [YOUR ROLE] in [YOUR INDUSTRY]. I want to assess whether any
of my domain expertise qualifies for publication as a marketplace skill
pack. Ask me about three areas of knowledge I use regularly in my work.
For each one, help me apply the transferability test: is this knowledge
general enough to be valuable to practitioners at other organisations
without access to my firm's proprietary systems, client relationships,
or internal documents? Classify each as "publishable," "not publishable,"
or "borderline — with adjustments."
```

**What you're learning:** The transferability test is not always obvious when applied to your own expertise. Having an AI interlocutor apply the test from the perspective of an external practitioner reveals which knowledge is genuinely general and which has invisible dependencies on your specific organisational context.

### Prompt 2: Design a Vertical Skill Pack Outline

```
I want to design a vertical skill pack for [YOUR DOMAIN — e.g.,
"contract triage for commercial leases in English law," "financial
research for equity analysis," "BIM coordination for multi-storey
residential projects"].

Help me outline the three sections of the SKILL.md:
1. Persona: What professional identity should this agent have? What
   expertise and authority does it carry?
2. Questions: What tasks fall in scope? What should it explicitly
   decline? Where are the boundaries?
3. Principles: What are the five to eight operating principles a
   competent practitioner in this domain would recognise as sound?

After drafting each section, flag any element that might cross from
general best practice into organisation-specific knowledge that should
be excluded from the marketplace listing.
```

**What you're learning:** Designing a skill pack outline is the first concrete step toward publication. The exercise makes the transferability test operational — you will discover which principles are universally sound and which encode your firm's particular approach. The flagging step trains the editorial judgement that distinguishes a publishable skill pack from a proprietary plugin.

### Prompt 3: Evaluate Marketplace Opportunity for Your Industry

```
Research the current state of the [YOUR INDUSTRY — e.g., "legal
technology," "financial services AI," "construction technology"]
marketplace for AI plugins and domain agents. What categories of
expertise are currently being packaged and sold? What gaps exist —
areas where domain experts have not yet built generalisable skill packs?

Based on what you find, assess whether there is a realistic marketplace
opportunity for a skill pack covering [A SPECIFIC FUNCTION IN YOUR
DOMAIN]. Who would subscribe? What would they pay? What would the
competitive landscape look like in two years?
```

**What you're learning:** Marketplace opportunity analysis is not just about what you can publish — it is about what the market needs and what economics make sense. This prompt trains the commercial judgement required to decide whether to invest in publication, not just whether your knowledge qualifies.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 10: Chapter Summary →](./10-chapter-summary.md)
