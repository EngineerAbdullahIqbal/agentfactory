---
sidebar_position: 10
title: "Chapter Summary"
description: "Synthesise the enterprise agent blueprint into a connected architecture: from the three-component model and the Agent Skills Pattern, through the context hierarchy and governance layer, to the marketplace and what makes the SKILL.md the most critical component you will author in Chapter 16."
keywords:
  - chapter summary
  - enterprise agent blueprint
  - SKILL.md
  - three-component model
  - governance layer
  - MCP connectors
  - division of responsibility
  - Cowork marketplace
  - Agent Skills Pattern
  - knowledge transfer
chapter: 15
lesson: 10
duration_minutes: 15

# HIDDEN SKILLS METADATA
skills:
  - name: "Synthesise the Enterprise Agent Blueprint"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can trace the full architecture of a Cowork plugin — three components, three owners, three context levels, four governance mechanisms — and explain how each element connects to the others in a coherent deployment system"

  - name: "Assess Plugin Readiness for a Domain Workflow"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can apply the chapter's complete architecture to a specific workflow and identify which components are in scope, which connectors are needed, what governance requirements apply, and what they would need to author in the SKILL.md"

learning_objectives:
  - objective: "Explain how the three-component model, the context hierarchy, the governance layer, and the ownership model connect as a coherent deployment architecture"
    proficiency_level: "B1"
    bloom_level: "Understand"
    assessment_method: "Student can trace a described plugin deployment from SKILL.md authorship through connector configuration, governance setup, and shadow mode transition, identifying which role acts at each stage"

  - objective: "Identify what makes the SKILL.md the most critical component in a plugin deployment and explain why Chapter 16's methodology is the next logical step"
    proficiency_level: "B1"
    bloom_level: "Understand"
    assessment_method: "Student can articulate why architectural understanding alone is insufficient and what specifically the Knowledge Extraction Method in Chapter 16 addresses"

cognitive_load:
  new_concepts: 0
  concepts_list: []
  assessment: "Synthesis lesson — no new concepts introduced; integrates and connects frameworks from lessons 1-9 into a coherent deployment architecture"

differentiation:
  extension_for_advanced: "Draft a complete deployment plan for a plugin in your domain: identify the SKILL.md sections you would need to write, the connectors required, the governance configuration, the shadow mode rubric, and the HITL gates. Use every element from this chapter's architecture in the plan."
  remedial_for_struggling: "Focus on the ownership table from Lesson 8. For each component — SKILL.md, config.yaml, connectors, governance — write one sentence: who owns it and what they do. If you can write those four sentences accurately, you have the operational core of the chapter."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Architecture, Ownership, and What Comes Next"
  key_points:
    - "The three components are not parallel — they have a hierarchy: SKILL.md is the intelligence, config.yaml is the deployment environment, connectors are the data infrastructure"
    - "The chapter's central insight is that a domain expert can deploy a production-grade agent without writing code — because the SKILL.md is plain English and the other components are owned by IT and administrators"
    - "Governance is not the end of the chapter — it is what makes everything else deployable in regulated industries"
    - "Chapter 16 addresses the one gap this chapter deliberately left open: how to extract and encode domain expertise into the SKILL.md"
  misconceptions:
    - "Students may think they now know how to write a production SKILL.md — this chapter taught the architecture; Chapter 16 teaches the extraction methodology"
    - "Students may underestimate the SKILL.md's criticality — it is the component that determines whether the plugin is trustworthy, not merely functional"
    - "Students may see the ownership model as organisational formality — it is the mechanism that makes failures diagnosable and prevents slow degradation"
  discussion_prompts:
    - "Which of the nine components or mechanisms from this chapter do you expect to be most difficult to configure for your domain? What makes it difficult?"
    - "If you were explaining the three-component model to a colleague who had not taken this course, how would you describe it in two sentences?"
  teaching_tips:
    - "The decision chain table is the most useful teaching artefact in this summary — use it to walk through the chapter's logic in sequence before students attempt the Try With AI prompts"
    - "The bridge to Chapter 16 should be presented as the answer to an obvious question: 'I now understand the architecture — but how do I actually write a good SKILL.md?' Frame Chapter 16 as the methodology that answers that question"
  assessment_checks:
    - question: "Name the three components of a Cowork plugin and their owners."
      expected_response: "SKILL.md (knowledge worker), config.yaml (IT), connector scripts (IT/developer). The knowledge worker also owns validation during shadow mode; the administrator owns governance configuration."
    - question: "Why does a SKILL.md instruction sometimes fail to produce the expected behaviour?"
      expected_response: "Because the three-level context system means higher levels silently override lower levels. Platform context (Anthropic) overrides organisation context (administrator) overrides plugin context (SKILL.md). When a SKILL.md instruction conflicts with an organisation-level policy, the agent simply behaves as the higher level requires, with no announcement."
    - question: "What are the two criteria for transitioning a plugin out of shadow mode?"
      expected_response: "A minimum of 30 days in shadow mode, and 95% accuracy across a representative sample with no critical errors in the preceding 10 days."
---

# Chapter Summary

This chapter began with a definition: a Cowork plugin is a domain-specific agent with three components, three owners, and five structural properties. It ends with a complete deployment architecture. The nine lessons between those two points did not add complexity for its own sake — each one answered a question that the previous lesson raised. The definition raised the question of what the intelligence layer actually looks like. The intelligence layer raised the question of how the deployment environment is configured. The deployment environment raised the question of what happens when the SKILL.md and higher-level policies conflict. That question required the context hierarchy. The context hierarchy pointed to the governance layer. The governance layer required the ownership model to be useful in practice. And the ownership model opened the question of what happens when the expertise encoded in a SKILL.md is generalisable beyond a single organisation.

That chain is the chapter. Understanding it as a chain — not as nine separate lessons — is the synthesis this summary is for.

## The Architecture in Sequence

Each lesson answered a specific question. Each answer led directly to the next question.

| Lesson | Question Answered | Key Output |
| --- | --- | --- |
| L01: What a Plugin Actually Is | What precisely is a Cowork plugin? | Five structural properties; three-component model |
| L02: The Intelligence Layer | What is the knowledge worker actually responsible for? | Agent Skills Pattern: Persona, Questions, Principles |
| L03: Configuration and Integration | What do the other two components do? | config.yaml (deployment env); connectors (data infrastructure) |
| L04: The Three-Level Context System | Why do SKILL.md instructions sometimes fail? | Platform → organisation → plugin hierarchy; silent override; diagnostic sequence |
| L05: The Agent Skills Pattern in Practice | What does a production-quality SKILL.md look like? | Annotated financial research SKILL.md; source integrity; uncertainty calibration |
| L06: The MCP Connector Ecosystem | What enterprise systems can the agent actually access? | Marketplace connectors; custom commissioning process; timeline expectations |
| L07: The Governance Layer | How does trust in a deployed agent accumulate? | Permissions; audit trails; shadow mode (30d/95%); HITL gates |
| L08: The Division of Responsibility | Who is responsible when something goes wrong? | Three-way ownership model; layer independence; SKILL.md maintenance as ongoing discipline |
| L09: The Cowork Plugin Marketplace | What happens when the expertise is generalisable? | Vertical skill packs; connector packages; transferability test |

## Three Insights That Connect the Architecture

Reading the nine lessons as a sequence reveals three insights that no individual lesson states on its own.

The first is that the SKILL.md is not one component among three — it is the component that everything else serves. The config.yaml configures the environment in which the SKILL.md operates. The connectors supply the data the SKILL.md instructs the agent to use. The governance layer enforces the boundaries the SKILL.md defines. Remove the SKILL.md and you have deployment infrastructure without intelligence. A well-written SKILL.md makes the rest of the architecture useful. A poorly written one makes it unreliable regardless of how correctly the other components are configured.

The second insight is that the knowledge worker's role is authorial, not technical. Writing the SKILL.md requires domain expertise, not programming ability. Reading the config.yaml to verify connector scope requires infrastructure literacy, not systems engineering. Designing the shadow mode rubric requires knowing what accuracy means in the domain, not statistical training. Identifying the HITL gates requires understanding which decisions carry professional accountability, not governance theory. The chapter's architecture was designed with a deliberate non-negotiable: the person who holds the domain expertise should be able to deploy without depending on technical intermediaries for the core intelligence layer.

The third insight is that governance is not the end of the deployment story — it is the beginning of the trust story. Shadow mode, audit trails, and HITL gates do not exist to limit what an agent can do. They exist to produce the evidence that allows a sceptical compliance function, a cautious general counsel, or a regulated industry's oversight body to permit the agent to do more. The 30-day shadow mode period produces the corpus that justifies autonomous operation. The immutable audit trail turns a potential compliance incident into a documented, defensible process. Governance is what converts a promising demonstration into a deployable system.

## The Component That Determines Everything

Of the eight components in the ownership table, one is owned entirely by the knowledge worker, is written entirely in plain English, determines the agent's identity, scope, and operating logic, and is the component most likely to drift from production reality without disciplined maintenance. That component is the SKILL.md.

The chapter taught the architecture around it. The Agent Skills Pattern — Persona, Questions, Principles — gave the structure. The annotated financial research example in Lesson 5 showed what production quality looks like. The ownership model in Lesson 8 established that maintaining it is an ongoing professional responsibility, not a one-time authorship task.

What the chapter did not teach is how to extract the domain expertise that goes into it. Writing a production-quality SKILL.md requires articulating, often for the first time in explicit form, the professional standards, decision-making logic, escalation thresholds, and quality criteria that ordinarily exist as institutional memory and professional judgement. This is the hardest part of the process — not because the SKILL.md is technically complex, but because making tacit expertise explicit is genuinely difficult work. The chapter showed the structure. Chapter 16 teaches the methodology for producing the content.

## Self-Assessment Checklist

Before continuing, verify that you can answer these questions with specificity. Generic answers indicate a concept that needs review.

- [ ] **The three-component model**: Can you name the three components, their owners, and what each one does — without conflating the intelligence layer with the configuration layer?
- [ ] **The Agent Skills Pattern**: Can you describe what each of the three SKILL.md sections does and explain, for each one, what happens to the agent when that section is missing or poorly written?
- [ ] **Source integrity and uncertainty calibration**: Can you explain why these are domain-specific principles rather than generic quality standards, and identify what failure mode each one prevents?
- [ ] **The three-level context hierarchy**: Can you describe the diagnostic sequence and explain why starting at the SKILL.md level is almost always the wrong place to begin?
- [ ] **Shadow mode**: Can you state the two criteria for transitioning to autonomous operation and explain why the 30-day minimum is not negotiable?
- [ ] **The ownership model**: Given a described plugin failure, can you assign it to the correct owner without deliberating?
- [ ] **The marketplace**: Can you apply the transferability test to a body of domain expertise and correctly classify it as publishable or not?

If any of these are uncertain, revisit the relevant lesson before continuing. Chapter 16 assumes the architecture is understood and proceeds directly to the extraction methodology.

## What Comes Next

Chapter 16 opens the methodology. Where this chapter gave you the complete architecture of a Cowork plugin and established what a production-quality SKILL.md looks like, Chapter 16 gives you the process for producing one. The Knowledge Extraction Method is a structured approach to making tacit expertise explicit — to taking the professional judgement that exists in a domain expert's head and translating it into the Persona, Questions, and Principles that determine what a deployed agent does.

The architecture does not change. The three-component model, the context hierarchy, the governance layer, and the ownership model are the permanent infrastructure. Chapter 16 is about the most critical act within that infrastructure: authoring the document that gives the agent its intelligence.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to integrate the chapter's architecture.

### Prompt 1: Personal Architecture Mapping

```
I have just completed Chapter 15 on the enterprise agent blueprint.
I work as [YOUR ROLE] in [YOUR INDUSTRY]. Help me map the full
chapter architecture to a specific workflow I want to automate:
[DESCRIBE THE WORKFLOW IN 2-3 SENTENCES].

Walk me through each architectural element:
1. SKILL.md: What would the Persona, Questions, and Principles
   sections need to address for this workflow?
2. Connectors: Which marketplace connectors would I need? Which
   systems might require custom commissioning?
3. Governance: What would 95% accuracy mean for this workflow?
   What are the natural HITL gates?
4. Ownership: Who in my organisation would own each component?

Identify any gaps where I would need information I do not currently
have to answer one of these questions.
```

**What you're learning:** How to apply the complete chapter architecture to a real deployment scenario. This synthesis exercise forces you to use every element — SKILL.md, connectors, governance, ownership — in sequence for a specific workflow, revealing which parts of the architecture you have understood deeply and which remain abstract.

### Prompt 2: Comparative Architecture Analysis

```
Compare two plugin deployments with different governance profiles:
(1) A financial research agent at an asset management firm, operating
under FCA oversight, producing analysis that informs board-level
investment decisions. (2) A project coordination agent at a design
consultancy, producing internal meeting summaries and task assignments
for a team of twelve.

For each deployment, trace through:
- What governance configuration would the administrator need to set?
- What shadow mode criteria would be appropriate?
- Where would the HITL gates be?
- How would the ownership model differ in practice?

Explain why the same architectural framework produces very different
governance profiles for these two use cases.
```

**What you're learning:** How the chapter's architecture adapts to context. The three-component model, governance layer, and ownership model are consistent across deployments — but their configuration varies significantly based on stakes, regulatory environment, and user profile. Comparing two contrasting cases makes this adaptation concrete rather than theoretical.

### Prompt 3: Bridge to Chapter 16

```
I understand the architecture of a Cowork plugin from Chapter 15.
The component I am least confident about writing is the SKILL.md —
specifically, the Principles section, which requires encoding domain-
specific operating logic.

For my domain of [YOUR PROFESSIONAL DOMAIN], help me surface what I
actually know that would belong in a Principles section:

Ask me five questions that a skilled interviewer would ask a domain
expert to surface tacit knowledge — the kind of knowledge that experts
apply automatically but rarely articulate explicitly. After I answer
each question, help me translate my answer into a candidate Principle
that is specific enough to be actionable (not generic), domain-specific
enough to be meaningful (not universal), and grounded in a failure
mode it prevents (not aspirational).

This is preparation for Chapter 16's Knowledge Extraction Method.
```

**What you're learning:** The gap between understanding the SKILL.md's architecture and being able to write one is the gap that Chapter 16 addresses. This prompt simulates the extraction process that Chapter 16 will teach systematically — surfacing tacit expertise through structured questioning and translating it into specific, actionable Principles. Starting the process before Chapter 16 makes the methodology more immediately applicable when you encounter it.

## Flashcards Study Aid

<Flashcards />

---

Continue to Chapter 16: The Knowledge Extraction Method →
