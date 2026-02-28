---
sidebar_position: 7
title: "The Governance Layer"
description: "Understand how governance works in a Cowork plugin through four mechanisms: IAM-integrated permissions, immutable audit trails, shadow mode with the 30-day/95% accuracy threshold, and human-in-the-loop gates where human judgment is non-negotiable"
keywords:
  [
    "enterprise governance",
    "IAM integration",
    "audit trails",
    "shadow mode",
    "human in the loop",
    "HITL",
    "access control",
    "compliance",
    "Cowork governance",
    "agent trust",
    "regulated industries",
    "95% accuracy threshold",
  ]
chapter: 15
lesson: 7
duration_minutes: 30

# HIDDEN SKILLS METADATA
skills:
  - name: "Describe Plugin Permission Architecture"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can explain how IAM-inherited permissions control agent visibility and access, and describe what role-based scoping looks like for a plugin in their domain"

  - name: "Frame Audit Trails as a Compliance Feature"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can explain why immutable audit trails are an asset in regulated industries rather than a burden, and describe what the audit record contains for any given interaction"

  - name: "Apply Shadow Mode Protocol to a Plugin Transition"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can describe the 30-day / 95% accuracy threshold and design a shadow mode scoring rubric for a domain-specific workflow, identifying what constitutes a critical error in their context"

  - name: "Identify Human-in-the-Loop Gates for a Workflow"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can identify which steps in their professional workflow require human judgment as a non-negotiable gate, and articulate why those steps cannot be autonomous regardless of accuracy"

learning_objectives:
  - objective: "Explain how IAM-integrated permissions and role-based scoping control who can access a Cowork plugin and what they can do within it"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe, using their own domain as context, what the permission configuration for their plugin would look like and which roles would receive which access levels"

  - objective: "Explain why immutable audit trails function as a compliance asset in regulated industries rather than a constraint on agent behaviour"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can articulate the difference between a compliance incident and a documented, defensible process, and identify what information the audit log captures for each interaction"

  - objective: "Apply the shadow mode protocol — including the 30-day minimum and 95% accuracy threshold — to design a transition plan for a plugin in their domain"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can describe what a shadow mode scoring rubric for their domain would assess, what constitutes a critical error, and at what point the agent would be eligible for autonomous operation"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "IAM-integrated permissions and role-based scoping"
    - "Immutable audit trails as a compliance feature"
    - "Shadow mode with 30-day / 95% accuracy threshold"
    - "Human-in-the-loop gates as non-negotiable checkpoints"
  assessment: "4 concepts at A2-B1 level — within the 5-7 cognitive limit for the target proficiency band. Concepts build sequentially: permissions govern access, audit trails record what happens, shadow mode builds trust in what was recorded, and HITL gates define the boundaries of autonomy."

differentiation:
  extension_for_advanced: "For a workflow you know well, design a complete governance specification: the permission matrix (which roles see which capabilities), the audit log fields (what gets recorded for each interaction type), the shadow mode rubric (what constitutes 95% accuracy in your domain, and what counts as a critical error), and the HITL gates (which specific steps can never be autonomous). Then stress-test the design: what would a compliance audit look like against this specification? What would a post-incident review need from the audit log?"
  remedial_for_struggling: "Focus on the shadow mode protocol specifically. Write three sentences: (1) what shadow mode is in plain language, (2) what the 30-day minimum is designed to produce, and (3) what the 95% threshold means in practice. Do not move on until you can explain why these two numbers exist and what happens when the agent meets them."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "The Governance Layer"
  key_points:
    - "Governance in Cowork means four specific things — permissions, audit trails, shadow mode, HITL gates — and each has a distinct purpose and mechanism"
    - "Audit trails are not monitoring tools designed to catch misbehaving knowledge workers — they are defensibility assets that turn potential compliance incidents into documented, reviewable processes"
    - "The shadow mode protocol (30 days minimum, 95% accuracy threshold) is precise and non-negotiable — these are not estimates, they are transition criteria"
    - "The HITL principle is autonomy by default, human judgment where it genuinely matters — not human approval of everything, but human judgment for actions where the cost of error exceeds the value of automation"
    - "Governance is configured by administrators in org admin settings, not in SKILL.md — the knowledge worker understands governance but does not own it"
  misconceptions:
    - "Students may think governance slows agents down or limits their value — governance is what makes deployment possible in regulated industries, not what restricts it"
    - "Students may think audit trails are about catching mistakes after the fact — they are about enabling defensibility before any question arises"
    - "Students may think 95% accuracy means 95% of everything — it means 95% of a representative sample with no critical errors in the preceding 10 days"
    - "Students may think HITL gates are temporary safeguards to be removed once the agent is trusted — for certain action types, HITL is permanent and appropriate"
    - "Students may assume they configure governance in their SKILL.md — governance is configured by administrators in org admin settings, not by the knowledge worker"
  discussion_prompts:
    - "Think about a decision you make at work that genuinely requires your judgment — not just your attention, but your judgment. Would you be comfortable having an agent make that decision autonomously? What makes it different from decisions you would trust an agent to make?"
    - "If your organisation were audited on AI-assisted work, what would you want the audit log to contain? Does the governance layer described in this lesson provide what you would need?"
    - "What would 95% accuracy mean in your domain? How would you define it? What would count as a critical error that would reset the clock?"
  teaching_tips:
    - "The governance-as-coffee-subject-change framing works as an opening hook — but pivot quickly to reframing governance as the mechanism that makes deployment possible, not the mechanism that prevents it"
    - "The audit trail section benefits from a concrete scenario: ask students to imagine walking into a compliance review and being able to produce an exact record of what the agent queried, what it produced, and for whom — contrast this with having no record at all"
    - "Shadow mode is the most technically specific section — the numbers (30 days, 95%) should be stated as facts, not explained as design choices. Students do not need to understand why those numbers were chosen; they need to know what they are and how to plan around them"
    - "HITL gates resonate when grounded in domain-specific examples students recognise — ask them to name the decisions in their own work where they would never want to be removed from the loop, then connect those intuitions to the principle"
  assessment_checks:
    - question: "How does Cowork know which users can access a plugin?"
      expected_response: "Permissions are inherited from the organisation's IAM system (Azure AD, Okta, or equivalent). Users who have access in the IAM system see the plugin; those without access cannot. Role-based scoping can further restrict which capabilities different users can access within the plugin."
    - question: "What does the audit trail record for each agent interaction?"
      expected_response: "The audit trail logs the user's query, the data sources the agent accessed, the output generated, a timestamp, and the user's identity. The log is immutable — it cannot be modified or deleted by the knowledge worker or plugin operator."
    - question: "What are the two criteria for transitioning out of shadow mode?"
      expected_response: "The agent must operate in shadow mode for at least 30 days, and must achieve 95% accuracy across a representative sample with no critical errors in the preceding 10 days."
    - question: "What is the governing principle for HITL gates?"
      expected_response: "Autonomous for everything safe, human for everything that genuinely needs it. HITL gates are not temporary — for certain action types, human judgment is non-negotiable regardless of how accurately the agent performs."
---

# The Governance Layer

In Lesson 6, you surveyed the connector ecosystem that gives a Cowork plugin access to enterprise data — CRM records, document repositories, financial data, clinical systems, and more. A plugin with that reach is genuinely powerful. And powerful systems require clear answers to a set of questions that every enterprise, and every regulator, will ask: who can use this agent, what can it do, what happens to its outputs, and how do you know when something has gone wrong?

These questions constitute governance. The word has a tendency to make knowledge workers reach for their coffee and change the subject. It calls to mind lengthy compliance frameworks, cautious legal reviews, and the general feeling that governance is what happens to ambitious projects on their way to becoming smaller, slower versions of themselves. That framing is wrong, and it is worth spending a moment to understand why — because in the context of a deployed autonomous agent, governance is not what limits deployment. Governance is what makes deployment possible.

Without a clear permission structure, an agent cannot be deployed to a team. Without an immutable audit trail, an agent cannot be used in any regulated workflow. Without a shadow mode transition process, there is no credible path from "this agent is promising" to "this agent is trusted." And without human-in-the-loop gates, the agent will eventually be asked to do something it should not do autonomously, with no mechanism to ensure a human is in the loop when it matters. Governance, in the Cowork model, is the architecture of trust. It has four components.

## Permissions and Access Control

Who can see and use a plugin is determined by the organisation's identity and access management system — Azure AD, Okta, or whichever IAM the organisation operates. Cowork inherits permissions from that system rather than maintaining a separate access layer. Users who have access see the plugin in their environment; users who do not have access cannot see it at all. The plugin does not appear to them. There is no "restricted access" message to click past. It simply is not there.

Within the population of authorised users, role-based scoping allows more granular control. A financial research plugin might be available to the entire finance team for standard market summaries and portfolio analysis, but restrict escalation routing — the capability that routes an output to a senior decision-maker for action — to the FP&A lead. A contract triage plugin might give paralegals access to standard processing workflows while reserving the clause analysis module, which surfaces potential material liability, for users with senior lawyer credentials.

This scoping is defined in the organisation's admin settings, not in the SKILL.md. The knowledge worker who authors the SKILL.md understands what the plugin should do; the administrator configures who can do it and at what level. This division matters because permission decisions are organisational decisions, not domain decisions. The FP&A lead is not defined in the plugin — they are defined in the access control system that the plugin inherits from.

The practical implication for a knowledge worker designing a plugin is to think clearly about which capabilities require different levels of authorisation, and to communicate those distinctions to the administrator during the deployment planning process. The capability matrix — who can do what — does not appear in the SKILL.md, but it needs to be specified somewhere before deployment, and the knowledge worker is best positioned to define it.

## Audit Trails

Every interaction a Cowork plugin has is logged. The log records what the user queried, which data sources the agent accessed, what output was generated, the timestamp, and the user's identity. The log is immutable — it cannot be modified by the knowledge worker who authored the plugin, by the plugin operator, or by the user who invoked the agent. It is retained according to the organisation's data retention policy and is available to compliance and legal teams on request.

For knowledge workers in unregulated industries, this description may read as reasonable but unremarkable. For knowledge workers in financial services, healthcare, legal, or any regulated domain, this description should read as a fundamental enabler. The audit trail is not a surveillance mechanism. It is a defensibility asset.

Consider what the alternative looks like. A compliance officer uses an AI agent to assist with a contract review. The agent surfaces a clause pattern that the officer flags for renegotiation. The counterparty later challenges the basis for that flag. Without an audit trail, there is no record of what the agent queried, what sources it consulted, or what output it produced. The officer's professional judgment is the only record. With an audit trail, the compliance department can produce an exact account of what happened: which version of the contract the agent reviewed, which legal research databases it queried, what output it generated, when, and for whom. The potential compliance incident becomes a documented, defensible process.

This is the reframe that matters. In regulated industries, the ability to demonstrate exactly what an agent produced, on what basis, for which user, at what time does not create compliance risk. It eliminates it. The organisation without that record is the one with the problem.

## Shadow Mode

A new plugin enters production in shadow mode. In shadow mode, the agent operates at full capability — it runs queries, processes data, and generates outputs as it would in autonomous operation — but those outputs do not reach the end user until a qualified human reviewer has approved them. The agent works. The outputs are held for review.

Shadow mode serves two purposes. The first is quality validation. A body of reviewed outputs provides the evidence base for calibrating the plugin: identifying systematic errors in the agent's reasoning, gaps in the SKILL.md that produce inconsistent outputs, and connector issues that cause the agent to work with stale or incomplete data. Shadow mode is not the only place where quality issues surface, but it is the place where they surface before they affect anyone.

The second purpose is organisational confidence-building. Legal, compliance, and operations stakeholders who have legitimate concerns about autonomous agent deployment need evidence, not reassurance. Shadow mode produces that evidence in a form they can review: a corpus of agent outputs with human assessments attached. The conversation with a sceptical general counsel changes materially when the answer to "how do we know it's reliable?" is "here are 340 reviewed outputs from the past six weeks, with this accuracy profile."

The standard shadow mode protocol is specific: a minimum of 30 days, with a 95% accuracy threshold across a representative sample. The agent must operate in shadow mode for at least 30 days. The outputs must be reviewed against a domain-specific scoring rubric. When 95% or more of outputs across a representative sample meet the rubric's criteria — and when there have been no critical errors in the preceding 10 days — the plugin is eligible for transition to autonomous operation.

The 30-day minimum is not negotiable. It exists because a representative sample of outputs requires sufficient variety in the inputs — different users, different query types, different data conditions — to surface the failure modes that only appear in edge cases. A week of shadow mode in a quiet period does not produce the same evidence as a month across normal operating conditions.

The 95% threshold reflects a practical cost-benefit calculation. For most workflows, the cost of a human review step is lower than the cost of a systematic error rate above 5%. This threshold is not universal. For higher-stakes domains — clinical decision support, regulatory compliance filing, material contract analysis — the appropriate threshold is higher, and the definition of "critical error" is more stringent. The 30-day / 95% framework is the standard; domain-specific calibration of what accuracy means and what counts as critical is the knowledge worker's contribution to the shadow mode process.

## Human-in-the-Loop Gates

Some actions should never be taken autonomously, regardless of how accurately the agent performs them. This is not a question of trust — it is a question of what kind of decision genuinely requires human judgment, as opposed to human attention or human review.

The distinction is important. Human attention means a person reads or checks something before it is acted upon. Human judgment means a person makes a decision that integrates contextual factors — relationships, institutional history, implicit constraints, professional accountability — that cannot be fully encoded in a SKILL.md and should not be delegated to an agent even when the agent would likely produce the right answer. HITL gates govern the second category.

The governing principle is: autonomous for everything safe, human for everything that genuinely needs it. This principle has two sides. The first is that excessive human review is not governance — it is an agent that does not do anything. If every output requires human approval before it reaches anyone, the agent is not autonomous; it is a sophisticated drafting tool. The productivity gain is real but limited. Governance is not an argument for requiring more human approval; it is an argument for requiring it only where it matters.

The second side is that some actions categorically require human judgment, and those categories should be specified in the SKILL.md's Principles section and enforced through escalation routing rather than left to the agent's discretion.

Domain examples make this concrete.

| Domain | Autonomous (no human required) | HITL Gate (human required) |
|---|---|---|
| **Financial research** | Market summaries, portfolio screening, competitor analysis | Board presentations, investment committee materials, client-facing advisory outputs |
| **Contract triage** | Low-risk NDA processing, standard template review, volume intake sorting | Material liability clauses, indemnification analysis, cross-border regulatory exposure |
| **Healthcare (clinical)** | Administrative summaries, scheduling optimisation, billing pre-review | Clinical decision outputs, medication recommendations, diagnostic summaries reaching patients |
| **Architecture and engineering** | Drawing annotation, specification cross-referencing, regulatory code lookup | Design sign-off, structural calculations requiring professional stamp, safety-critical recommendations |

The healthcare row in that table deserves a specific note. Clinical accuracy requirements for HITL gate configuration are covered in depth in Chapter 21, which addresses the healthcare domain specifically. The clinical context introduces additional considerations — regulatory requirements, professional liability standards, patient safety thresholds — that go beyond what the standard governance layer covers. Healthcare organisations should treat Chapter 21 as required reading before configuring HITL gates for clinical use cases.

What makes a HITL gate non-negotiable is not that the agent is likely to get it wrong. It is that the action carries consequences — reputational, legal, clinical, or organisational — that require a human to be accountable in a way an agent cannot be. A board presentation reaching the board carries the imprimatur of the person who presents it. A contract clause flagged for renegotiation carries the professional judgment of the lawyer who flags it. These are not tasks the agent can take over simply by becoming more accurate. The accountability requirement is structural, not a function of performance.

HITL gates, once defined, are encoded in the SKILL.md's Principles section and executed through the escalation routing that routes certain output types to a human reviewer rather than directly to the user. They are not suggestions the agent can override when it believes it has the answer. They are structural stops.

## What Governance Actually Means for Your Plugin

Governance in Cowork is not a checklist applied to an agent after it is built. It is an architectural property that shapes how the agent is deployed, how trust in it accumulates, and where its autonomy ends. Understanding it before building a plugin is not a compliance exercise — it is the prerequisite for building a plugin that can actually be deployed.

For the knowledge worker designing a plugin, governance translates into four concrete design questions. Who should be able to see and use this? What should be recorded about every interaction? How will I demonstrate, over 30 days, that the agent meets a 95% accuracy standard in my domain? And which specific steps in my workflow require a human in the loop, not because the agent cannot do them, but because the accountability for those decisions must remain with a person?

The answers to those questions, communicated to the administrator who configures the governance layer, are the governance contribution of the knowledge worker. The configuration itself belongs to the admin. The intelligence that informs the configuration belongs to the domain expert who understands what the workflow actually requires.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to apply the governance layer concepts to your domain.

### Prompt 1: Map Governance Needs for Your Plugin

```
I'm designing a Cowork plugin for [YOUR ROLE / WORKFLOW] in [YOUR DOMAIN/INDUSTRY].

Help me think through the four governance mechanisms for this plugin:

1. PERMISSIONS: Which users or roles should have access? Are there different capability levels that different roles should be able to access? (e.g., everyone can query, but only senior staff can trigger escalation)

2. AUDIT TRAIL: What information would a compliance or legal review of this workflow need from the audit log? What events or outputs would be most important to record?

3. SHADOW MODE: What would 95% accuracy mean for this workflow? How would I design a scoring rubric that a domain-qualified reviewer could apply? What would constitute a critical error that would reset the 10-day clock?

4. HITL GATES: Which specific actions or output types in this workflow require a human to be accountable — not just reviewed by a human, but genuinely requiring human judgment? Why can those actions not be autonomous even if the agent performs them accurately?

Ask me clarifying questions about my workflow if you need more detail to give specific answers.
```

**What you're learning:** How to translate abstract governance concepts into concrete design decisions for your specific domain. The goal is to leave this exercise with a first draft of the governance specification you would hand to your administrator — not a policy document, but a practical description of what the governance layer for your plugin needs to accomplish.

### Prompt 2: Design a Shadow Mode Scoring Rubric

```
I'm preparing to deploy a Cowork plugin for [YOUR WORKFLOW] through shadow mode. I need to design a scoring rubric that a qualified human reviewer can use to assess agent outputs during the 30-day shadow mode period.

Help me build this rubric by working through the following:

1. What are the key quality dimensions for outputs from this workflow? (e.g., accuracy, completeness, appropriate hedging under uncertainty, correct source citation)

2. For each dimension, what does excellent performance look like? What does acceptable performance look like? What is clearly wrong?

3. What constitutes a critical error — the kind of error that would reset the 10-day clock and require the shadow mode period to continue?

4. How would I define "a representative sample"? What input types, query types, or user profiles would I need to see represented before I have confidence the sample is genuinely representative?

The output should be a rubric I could hand to a qualified reviewer and have them apply consistently.
```

**What you're learning:** How to operationalise the 95% accuracy threshold for your specific domain. The shadow mode rubric is the instrument that makes "95%" meaningful rather than abstract — without it, there is no principled way to assess whether the threshold has been met. Designing the rubric is the knowledge worker's contribution to the shadow mode process.

### Prompt 3: Identify HITL Gates for Your Workflow

```
I'm mapping out the human-in-the-loop requirements for a Cowork plugin that handles [YOUR WORKFLOW].

The governing principle is: autonomous for everything safe, human for everything that genuinely needs it.

Help me identify which steps in my workflow require a human in the loop — not because the agent might make a mistake, but because the action requires human accountability.

For each HITL gate you identify:
1. What is the specific action or output type?
2. Why does this require human judgment rather than just human review?
3. Who is the appropriate human in the loop — which role or seniority level?
4. What does the escalation routing look like — how does the output reach the right human?

Also identify which steps in my workflow are genuinely autonomous — actions where requiring human approval would undermine the agent's value without adding meaningful protection.

I'll describe my workflow in detail: [DESCRIBE YOUR WORKFLOW STEP BY STEP]
```

**What you're learning:** How to apply the HITL principle to a workflow you know well. The distinction between "human review" and "human judgment" is the analytical move this exercise develops — it requires understanding what kind of accountability is at stake for each step, not just whether the agent might produce an error.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 8: The Division of Responsibility →](./08-division-of-responsibility.md)
