---
sidebar_position: 2
title: "The Intelligence Layer — SKILL.md"
description: "Understand the three sections of the SKILL.md file — Persona, Questions, and Principles — and explain why each section matters functionally for producing a reliable, domain-specific agent"
keywords:
  [
    "SKILL.md",
    "Agent Skills Pattern",
    "Persona",
    "Questions",
    "Principles",
    "intelligence layer",
    "Anthropic Cowork",
    "domain agent",
    "enterprise AI",
    "knowledge worker",
  ]
chapter: 15
lesson: 2
duration_minutes: 30

# HIDDEN SKILLS METADATA
skills:
  - name: "Understand the SKILL.md as Intelligence Layer"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain in their own words what a SKILL.md file is, who authors it, and why it is described as the intelligence layer rather than a configuration or code file"

  - name: "Explain the Agent Skills Pattern"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Communication and Collaboration"
    measurable_at_this_level: "Student can describe the function of each of the three sections — Persona, Questions, Principles — and explain, with at least one domain-specific example, why each section matters for agent reliability"

  - name: "Distinguish Persona from Rules"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Understand"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can explain why identity specifications in the Persona section govern agent behaviour in ambiguous situations more reliably than individual rules, and apply this insight to a provided scenario"

  - name: "Identify Domain-Specific Principles"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Given a professional domain and a set of candidate operating principles, student can identify which principles are domain-specific (and therefore appropriate) versus generic (and therefore insufficient)"

learning_objectives:
  - objective: "Explain what a SKILL.md file is and why it is the intelligence layer of a Cowork plugin rather than code or configuration"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe SKILL.md in their own words, correctly identifying it as plain English authored by a domain expert, not a developer"

  - objective: "Describe the function of each section of the Agent Skills Pattern — Persona, Questions, and Principles — with a concrete domain example for each"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can walk through each section and explain what it does and why it matters, using examples from at least two different professional domains"

  - objective: "Distinguish between a Persona that governs ambiguous situations through identity and a list of rules that governs behaviour through individual instructions"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a scenario in which an agent encounters an ambiguous request, student can predict how a well-written Persona would guide the agent's response and explain why a list of rules alone would be insufficient"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "SKILL.md as intelligence layer (not code, not configuration)"
    - "Persona as professional identity specification"
    - "Questions as scope document (in-scope and out-of-scope)"
    - "Principles as domain-specific operating logic"
  assessment: "4 concepts at A2 level — within the 5-7 cognitive limit for this tier. Concepts are sequenced progressively: SKILL.md first (what it is), then Persona (who the agent is), then Questions (what it does), then Principles (how it decides). Each concept builds on the previous without requiring new prerequisites."

differentiation:
  extension_for_advanced: "Take a domain you know well and draft a one-paragraph Persona for an agent in that domain. Ask yourself: if this agent encountered a query that was technically within its scope but felt ethically uncomfortable, how would the Persona guide its response? Revise the Persona until you are satisfied with how it would govern that edge case."
  remedial_for_struggling: "Focus on the contrast between a SKILL.md and a computer programme. A programme tells a machine what to compute. A SKILL.md tells an agent who to be. Write two sentences: one describing what a programmer writes, one describing what a domain expert writes when authoring a SKILL.md. Then check: does yours make the distinction clear?"

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "The Three Components"
  key_points:
    - "The SKILL.md is plain English authored by a domain expert — this is the defining feature that separates it from code or configuration"
    - "Persona governs ambiguous situations through identity, not rules — a well-specified Persona is more powerful than a long list of individual instructions"
    - "The Questions section defines both what the agent CAN handle and what it should redirect — the out-of-scope boundary is as important as the in-scope list"
    - "Principles must be domain-specific operating logic, not generic platitudes — 'be accurate' is not a principle; 'flag any clause referencing jurisdiction outside England and Wales' is a principle"
    - "This lesson teaches WHAT the sections are and why they matter — Lesson 5 will show a complete, annotated example"
  misconceptions:
    - "Students almost universally assume SKILL.md is a code or configuration file — the word 'file' and the '.md' extension trigger this assumption. Emphasise repeatedly that it is a structured English document written by a domain expert, not a developer. A compliance officer can write it. A project manager can write it. A doctor can write it."
    - "Students may think the Persona section is a marketing exercise or a brand voice document — it is a functional specification. Precision in the Persona shapes how the agent behaves in situations no individual rule anticipated"
    - "Students may assume the Questions section is just a topic list — it is a scope document that must define what the agent will NOT handle, not just what it will. An agent without a defined out-of-scope boundary will attempt queries it cannot handle well"
    - "Students often write Principles that are too generic to be useful ('be helpful', 'be accurate') — domain-specific constraints are the ones that produce reliable, trustworthy agent behaviour"
  discussion_prompts:
    - "Think of a domain you know well. If you were writing the Persona section for an agent in that domain, what would the most important identity constraints be? What authority should the agent project? What should it never claim to be?"
    - "Consider an agent built for your organisation. What are the five most important things it should always redirect to a human? What would happen if those were missing from the Questions section?"
    - "Have you ever dealt with a situation where a general-purpose AI gave you confident-sounding output in an area where it had no grounded expertise? How would a well-written Questions section with a clear out-of-scope boundary have changed that experience?"
  teaching_tips:
    - "The misconception that SKILL.md is code is so persistent that it is worth naming explicitly at the start of the lesson and revisiting at the end"
    - "Use the contrast between generic principles ('be accurate') and domain-specific principles ('flag clauses referencing jurisdiction outside England and Wales') as a concrete exercise — it makes the difference immediately visible"
    - "The financial research agent, legal contract triage agent, and BIM coordination agent are the most illustrative examples for the Persona section because they represent three very different authority levels and relationship types"
    - "Remind students that Lesson 5 will show them a complete, annotated SKILL.md — this lesson is about understanding why each section exists, not yet about writing one"
  assessment_checks:
    - question: "What is a SKILL.md file and who writes it?"
      expected_response: "A plain-English document that tells an agent who it is, what it knows, how to behave, and what it should never do. It is written by a domain expert, not a developer or engineer."
    - question: "Why is Persona described as more powerful than a list of rules for governing ambiguous situations?"
      expected_response: "Rules govern anticipated situations. A Persona governs unanticipated ones. When an agent encounters a query no individual rule covers, its professional identity — as defined in the Persona section — shapes its response. A vague Persona produces inconsistent agents; a precise Persona produces predictable, trustworthy ones."
    - question: "Why is the out-of-scope boundary in the Questions section as important as the in-scope list?"
      expected_response: "An agent without a defined out-of-scope boundary will attempt to answer queries it cannot handle reliably, producing confident-sounding outputs in areas where it has no grounded expertise. The out-of-scope boundary defines where the agent redirects rather than responds — which is critical for trust in high-stakes professional domains."
    - question: "Give an example of a generic principle and a domain-specific principle. What makes the domain-specific one better?"
      expected_response: "Generic: 'Be accurate.' Domain-specific: 'Flag any contract clause that references a jurisdiction outside England and Wales.' The domain-specific principle is actionable — the agent knows exactly what to look for and what to do. The generic principle is aspirational — it gives the agent no concrete guidance on what 'accurate' means in this context."
---

# The Intelligence Layer — SKILL.md

In Lesson 1, you established what a Cowork plugin is: a domain-specific agent with three components — the SKILL.md, the config.yaml, and the connector scripts. You learned that these components have three owners: you (the knowledge worker) own the SKILL.md, IT owns the connectors, and the administrator owns the governance settings. Now it is time to understand what you are actually responsible for. The SKILL.md is the intelligence layer of the plugin. Everything the agent knows about who it is, what it does, and how it decides — that is yours to write.

The description "intelligence layer" is deliberate. The config.yaml configures the deployment environment: model version, token limits, access permissions. The connector scripts connect to external data sources. Neither of these makes the agent intelligent in any domain-specific sense. Intelligence — the ability to apply domain expertise to real professional situations — comes from the SKILL.md. A compliance agent and a financial research agent might run on identical model versions, behind identical governance settings, with identical connector infrastructure. What makes them different, and what makes each of them useful, is the SKILL.md.

This lesson explains the structure of that document. There are three sections, each with a distinct function: Persona, Questions, and Principles. Understanding what each section does — and why the specifics matter — is the prerequisite for everything in this chapter. Lesson 5 will show you a complete, annotated example. This lesson shows you the architecture and the reasoning behind it.

## What a SKILL.md Is (and Is Not)

Before covering the three sections, it is worth stating clearly what a SKILL.md file is, because the name generates consistent confusion.

A SKILL.md is a plain-text file, written in English, using no programming language and no specialised syntax. It is a structured document that tells the agent who it is, what it knows, how to behave in the situations it will encounter, and what it must never do. It requires no programming ability. It requires domain expertise.

| What people assume SKILL.md is | What SKILL.md actually is |
|--------------------------------|---------------------------|
| A configuration file with settings and parameters | A structured English document with identity, scope, and operating logic |
| Written by a developer or ML engineer | Written by a domain expert — a lawyer, analyst, architect, or clinician |
| Code that executes when the agent runs | Text that the agent reads and applies to every interaction |
| A technical artefact managed by IT | A professional document managed by the knowledge worker who owns the domain |

This distinction matters because it determines who can build useful agents. A senior compliance officer can write a SKILL.md. A project architect can write a SKILL.md. A clinical pharmacist can write a SKILL.md. None of them can write a Python class, configure an API, or train a model. The SKILL.md is what closes the knowledge transfer gap that Chapter 14 described: it is the pathway through which domain expertise reaches a deployed system.

## The Agent Skills Pattern

The structure of the SKILL.md follows a pattern called the **Agent Skills Pattern**. It has three sections: Persona, Questions, and Principles. Each section performs a specific function, and each section requires a specific kind of thinking to write well.

| Section | What It Defines | Who Benefits |
|---------|-----------------|--------------|
| **Persona** | Professional identity, authority, tone, relationship to user | The agent's behaviour in unanticipated situations |
| **Questions** | Scope — what the agent handles and what it redirects | The reliability boundary of the agent's expertise |
| **Principles** | Operating logic, constraints, escalation thresholds, quality standards | The agent's decision-making in complex or contested situations |

None of these sections is optional. Remove the Persona and the agent has no reliable identity to fall back on when a query does not fit any anticipated pattern. Remove the Questions section and the agent has no boundary — it will attempt queries it cannot handle well. Remove the Principles and the agent has no operating logic for the hard cases, where the right answer is not obvious.

## Persona: Identity as Functional Specification

The Persona section defines who the agent is in professional terms. Not what it can do — who it is. This is a functional specification, not a marketing exercise. The distinction matters.

A marketing exercise describes the agent in appealing terms. A functional specification describes the agent in terms that govern behaviour. Consider the difference between these two Persona statements:

"A helpful financial research assistant that provides insightful analysis and useful recommendations."

"A senior equity research analyst with fifteen years of experience covering FTSE-listed financial services companies. Analytical, precise, and direct. I work with portfolio managers and investment directors who need data-grounded analysis on short notice. I cite sources, flag uncertainty explicitly, and do not speculate beyond what the data supports."

Both describe a financial research agent. Only the second one governs how the agent will behave when a portfolio manager asks a question the evidence does not clearly answer. The first Persona produces an agent that will try to be helpful — which, in the absence of data, means generating plausible-sounding speculation. The second Persona produces an agent that will say "the data does not support a confident position on this" because that is what a senior analyst with a reputation to protect would say.

This is the central insight about the Persona section: **identity governs ambiguous situations more reliably than rules.** Rules govern situations that were anticipated when the rules were written. Professional identity governs situations that were not anticipated, because it provides the agent with a stable reference point — "what would a professional of this standing, in this relationship, do here?" — that is more robust than any finite list of instructions.

The Persona section answers four questions:

| Question | Why It Matters |
|----------|----------------|
| What is the agent's professional standing? | Determines the authority and confidence with which it speaks |
| What is its relationship to the user? | Shapes how it balances deference with expertise |
| What is its characteristic tone? | Determines how it handles disagreement, uncertainty, and complexity |
| What will it never claim to be? | Sets the boundaries of its professional identity |

Consider how these answers differ across domains. A legal contract triage agent describes itself as a legal professional who flags risk clearly and defers to qualified counsel on matters requiring independent legal advice — not an authority, but a rigorous first-pass reviewer. A BIM coordination agent for construction describes itself as a project coordinator who understands all disciplines and escalates when a structural decision falls outside its competence. A clinical pharmacology agent describes itself as a specialist who flags drug interactions against evidence-based thresholds and always defers to the prescribing clinician on patient-specific decisions.

In each case, the professional identity does more work than any individual rule could. When a user asks the legal agent for a definitive answer on a contested clause, the agent's identity — "I flag risk clearly and defer to qualified counsel" — determines the response without requiring a rule that says "if user asks for a definitive legal opinion, respond by...". The Persona handles this implicitly, because that is what a legal professional in that relationship would do.

## Questions: Scope as a Two-Sided Document

The Questions section defines what the agent is for. Not in broad terms, but in specific ones: which tasks it handles, how it handles them, and — critically — what falls outside its remit.

The last of these is the most commonly underspecified. Domain experts writing their first SKILL.md tend to think of the Questions section as a list of capabilities. It is better understood as a scope document, and a scope document has two sides: in-scope and out-of-scope.

The cost of underspecification in this section is measurable. An agent without a well-defined scope will attempt to answer queries it cannot handle well. This produces confident-sounding outputs in areas where it has no grounded expertise — which is a technical description of hallucination in a professional context. A financial research agent that strays into tax advice because no one specified that tax advice was out of scope will produce tax analysis that sounds authoritative and is functionally unreliable. A contract triage agent that ventures into employment law because no one specified that employment law fell outside its competence will produce employment law analysis with the same problem.

The out-of-scope boundary defines where the agent redirects rather than responds. This is not a limitation — it is a quality guarantee. An agent with a tight, well-defined scope is more trustworthy precisely because it knows where it stops. Users who understand its scope can rely on its outputs within that scope. Users who receive a redirect know they need to look elsewhere. Both outcomes are more useful than confident-sounding output in an area where the agent has no grounded expertise.

Consider what a well-specified Questions section looks like for different domains:

| Domain | Example In-Scope Items | Example Out-of-Scope Items |
|--------|----------------------|---------------------------|
| **Financial research** | Equity analysis on FTSE-listed companies; earnings call summaries; sector comparison tables | Portfolio construction recommendations; tax implications; regulatory filings outside the UK |
| **Legal contract triage** | Risk flagging in commercial contracts under English law; clause pattern analysis; escalation recommendations | Drafting new contract language; advising on employment law; jurisdiction-specific analysis outside England and Wales |
| **Clinical pharmacology** | Drug interaction checking against approved formulary; dosage verification against weight and renal function; contraindication flagging | Prescribing decisions; patient-specific risk assessment; off-formulary authorisations |
| **BIM coordination** | Clash detection across structural, MEP, and architectural models; specification compliance checking; RFI preparation | Structural engineering sign-off; cost estimates; planning authority submissions |

In each case, the out-of-scope items are not arbitrary. They are the areas where the agent's grounded expertise ends and where professional liability, clinical risk, or regulatory accountability begins. The Questions section does not just describe what the agent knows — it maps the boundary of where its knowledge is reliable.

## Principles: Operating Logic for Hard Cases

The Principles section defines how the agent applies its knowledge in practice. This is where operating constraints, escalation thresholds, quality standards, and decision-making logic live.

The critical distinction here is between generic principles and domain-specific principles. Generic principles — "be accurate," "be helpful," "be transparent" — are aspirational statements that give the agent no concrete guidance on what accuracy, helpfulness, or transparency means in a specific professional context. Domain-specific principles are actionable: they tell the agent exactly what to look for, what to prioritise, and what constitutes a situation that requires escalation.

Compare these approaches across domains:

**Generic (insufficient):** "Provide accurate information based on available data."

**Domain-specific (functional):** "For any earnings estimate, cite the analyst consensus source and flag if the most recent revision is more than 30 days old. Do not extrapolate beyond the data; state explicitly when a projection lacks sufficient data support."

**Generic (insufficient):** "Flag potential risks in contracts."

**Domain-specific (functional):** "Flag any clause that modifies the indemnity cap below the contract value, any jurisdiction reference outside England and Wales, any penalty clause with an uncapped liability provision, and any force majeure clause that excludes circumstances beyond a narrowly defined list. For each flag, state the risk and the recommended action."

The difference is not merely stylistic. Generic principles require the agent to determine what "accurate" means in each new situation, producing inconsistent results. Domain-specific principles tell the agent what accuracy looks like in this domain, for this type of output, against these quality standards — producing consistent, reviewable results.

The Principles section also contains escalation thresholds: the operating constraints that define when the agent should stop acting autonomously and refer to a human. These thresholds are domain-specific for the same reason. An escalation threshold for a financial research agent is not the same as an escalation threshold for a clinical pharmacology agent.

| Domain | Illustrative Escalation Thresholds |
|--------|-----------------------------------|
| **Financial research** | Any analysis forming the basis of a board-level investment recommendation; any query involving non-public information |
| **Legal contract triage** | Any clause with potential material liability for the organisation; any dispute resolution mechanism that waives litigation rights |
| **Healthcare** | Any interaction flagged as a critical drug interaction by the approved formulary; any dosage outside the validated range for the patient's renal function category |
| **Architecture/BIM** | Any structural coordination issue that a qualified structural engineer has not reviewed; any clash that cannot be resolved without changing the structural grid |

In each case, the escalation threshold is defined by the professional standard for that domain — not by a generic rule about when AI should involve a human. A contract that has a complex indemnity structure requires a qualified solicitor to review, not because AI is generally unreliable, but because that specific type of decision carries professional liability that requires human accountability.

The Principles section is also where domain-specific data sourcing rules live. Financial research agents specify which data sources are approved and what happens when a query cannot be answered from approved sources. Legal agents specify which jurisdictions their analysis covers. Clinical agents specify which formulary they check against. These are not generic quality controls — they are the operating constraints that make the agent's outputs auditable and trustworthy.

## Why Specificity Is the Work

The common thread across all three sections is specificity. A vague Persona produces inconsistent behaviour. A Questions section without out-of-scope boundaries produces overreaching. Generic Principles produce unpredictable outputs.

Writing a production-quality SKILL.md is therefore not a formatting exercise. It is a knowledge extraction exercise. The domain expert writing a SKILL.md must articulate, often for the first time in explicit form, the professional standards, decision-making logic, and escalation thresholds that ordinarily exist as institutional memory and professional judgement. This is difficult work. It is also, as Chapter 16 will show, a learnable process with structured techniques.

The good news is that the difficulty of writing a SKILL.md is the difficulty of articulating domain expertise — not the difficulty of learning to code. The compliance officer who has spent a career developing a feel for which clauses represent genuine risk does not need to learn Python to encode that expertise in a SKILL.md. They need to learn how to make their tacit knowledge explicit. That is a different skill, and one they already have more than they realise.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to explore these concepts further.

### Prompt 1: Personal Application

```
I work as [YOUR ROLE] in [YOUR INDUSTRY]. I want to understand how
the three sections of the Agent Skills Pattern — Persona, Questions,
and Principles — would apply to an agent for my specific work.

Help me think through each section:

1. For Persona: What professional identity should this agent have?
   What authority should it project, and what should it never claim to be?

2. For Questions: What are the five most important things this agent
   should handle, and the three most important things it should redirect
   to a human?

3. For Principles: What are two operating constraints that are specific
   to my domain — not generic 'be helpful' statements, but actual rules
   that a professional in my field would recognise as meaningful?

Challenge me if my answers are too generic. Push me toward specificity.
```

**What you're learning:** How to translate abstract section descriptions into concrete domain applications. The AI will push back on generic answers, which is the most effective way to learn the difference between a functional Persona and a marketing exercise.

### Prompt 2: Framework Analysis

```
Here are two SKILL.md Persona statements for a financial research agent.
Analyse them and explain which one would produce more consistent, reliable
agent behaviour in ambiguous situations, and why.

Persona A:
"I am a helpful financial research assistant. I provide clear, accurate
analysis of financial data and help users understand market trends and
investment opportunities. I am professional and responsive."

Persona B:
"I am a senior equity research analyst specialising in FTSE 350 financial
services companies. I work with portfolio managers and investment directors
who require data-grounded analysis under time pressure. I am precise and
direct. I cite all sources, flag uncertainty explicitly, and do not speculate
beyond what the available data supports. I will not produce analysis that
a user might interpret as investment advice."

Explain the specific scenarios where Persona B would produce a different
(and better) response than Persona A. Focus on ambiguous situations —
ones where no individual rule would clearly govern the agent's response.
```

**What you're learning:** How to evaluate Persona quality through the lens of ambiguous situations. The contrast between these two Personas makes concrete the lesson's central claim: that identity governs ambiguous situations more reliably than rules.

### Prompt 3: Domain Research

```
I want to think through the Principles section for an agent in
[YOUR PROFESSIONAL DOMAIN]. Help me identify five operating constraints
that are domain-specific — not generic quality statements, but specific
rules that professionals in [YOUR DOMAIN] would recognise as meaningful
and important.

For each constraint, help me specify:
1. What exactly triggers this constraint (the specific situation)
2. What the agent should do when the constraint is triggered
3. Why this constraint matters professionally (the risk it prevents)

Then tell me: are any of these constraints too generic? Could they apply
to an agent in any professional domain, or are they genuinely specific
to [YOUR DOMAIN]? Revise any that are too generic until they are
domain-specific.
```

**What you're learning:** How to distinguish domain-specific Principles from generic ones, and how to refine generic statements into actionable professional operating constraints. The self-evaluation at the end of the prompt builds the critical skill of recognising when a Principle is doing real work versus filling space.


## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 3: The Configuration and Integration Layers →](./03-configuration-and-integration-layers.md)
