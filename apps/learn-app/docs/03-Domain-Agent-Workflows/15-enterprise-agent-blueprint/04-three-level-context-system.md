---
sidebar_position: 4
title: "The Three-Level Context System"
description: "Understand Cowork's three-level context hierarchy — platform, organisation, and plugin — and apply the diagnostic sequence to identify why a SKILL.md instruction may not be honoured"
keywords:
  [
    "three-level context",
    "platform context",
    "organisation context",
    "plugin context",
    "SKILL.md override",
    "silent override",
    "Cowork governance",
    "context hierarchy",
    "diagnostic sequence",
    "enterprise agent",
  ]
chapter: 15
lesson: 4
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Understand the Three-Level Context Hierarchy"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can describe the three levels — platform, organisation, and plugin — name who sets each level, and explain the override direction (higher levels silently override lower levels)"

  - name: "Diagnose SKILL.md Override Behaviour"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Given a scenario in which an agent does not follow a SKILL.md instruction, student can run the diagnostic sequence (platform → organisation → SKILL.md) to identify the likely cause and determine whether the behaviour can be modified"

  - name: "Recognise Silent Override as an Architectural Property"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can explain why higher-level overrides are silent rather than explicit, and articulate what this means for the knowledge worker when debugging unexpected agent behaviour"

learning_objectives:
  - objective: "Describe the three levels of Cowork's context hierarchy and explain who sets each level"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can name the three levels, identify the setting authority for each, and explain the override direction without reference to the lesson"

  - objective: "Explain why higher-level context overrides lower-level context silently and what this means in practice"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe the silent override mechanism and explain why an agent does not announce that a SKILL.md instruction has been superseded"

  - objective: "Apply the diagnostic sequence to a scenario in which an agent ignores a SKILL.md instruction"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a case study of unexpected agent behaviour, student can correctly run the diagnostic from platform level down and identify the most likely cause"

cognitive_load:
  new_concepts: 3
  concepts_list:
    - "Platform context (Anthropic-set, immutable)"
    - "Organisation context (admin-set, governs all plugins)"
    - "Plugin context as SKILL.md (knowledge worker-set, operates within higher constraints)"
  assessment: "3 concepts at A2-B1 level — well within the 5-7 cognitive limit for this tier. Students have completed L01-L03 and understand SKILL.md, config.yaml, and connectors as distinct components. This lesson adds the governance hierarchy that sits above those components, building on established vocabulary without requiring new vocabulary from scratch."

differentiation:
  extension_for_advanced: "Consider a regulated industry where you work or know well. Map out what you would expect to find at each of the three context levels: what would Anthropic likely constrain at platform level, what would your organisation's administrator configure at organisation level, and what would a domain expert author at plugin level? Identify one scenario where an organisation-level policy might conflict with what a knowledge worker wants to achieve, and describe how you would work through that conflict."
  remedial_for_struggling: "Focus on the analogy of a new employee joining a professional firm. They must follow their profession's code of conduct (platform level), their firm's internal policies (organisation level), and then can apply their individual style within those constraints (plugin level). Write two sentences describing something a new employee can customise and something they cannot, using this analogy. Then check: does your answer reflect the same relationship between the three context levels?"

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Context and Governance"
  key_points:
    - "The three-level hierarchy runs in one direction: platform overrides organisation, organisation overrides plugin. Lower levels cannot override higher levels."
    - "Silent override is a feature, not a bug. The agent does not announce when a SKILL.md instruction has been superseded — it simply behaves as the higher level requires. Knowledge workers must understand this before they encounter it in practice."
    - "The diagnostic sequence mirrors the hierarchy: when an agent does not do what the SKILL.md says, check platform constraints first, then organisation policies, then the SKILL.md itself. Starting with the SKILL.md is the most common error."
    - "Plugin-level constraints can only be more restrictive than higher levels, not more permissive. The SKILL.md can narrow the agent's behaviour; it cannot expand it beyond what the organisation or platform allows."
    - "The knowledge worker's practical implication: before rewriting a SKILL.md instruction, confirm the behaviour is actually possible within higher-level constraints."
  misconceptions:
    - "Students almost universally assume that if they write a SKILL.md instruction, it will be followed. The lesson must make vivid that this is conditional on higher-level permissions. Use the concrete scenario of a compliance logging requirement to ground this."
    - "Students may expect the agent to tell them when an override has occurred — 'I cannot do that because your organisation has a policy.' Clarify that overrides are silent: the agent simply does not do the thing, without explanation. This is counterintuitive and important."
    - "Students may think platform-level constraints are about model capability ('the AI can't do this'). Clarify that platform-level constraints are policy decisions made by Anthropic, not technical limitations of the model."
    - "Students may believe they can appeal to a higher authority to change organisation-level policies. Clarify the role boundaries: the knowledge worker configures within the boundaries the admin sets. Changing those boundaries requires working with the administrator, not the SKILL.md."
  discussion_prompts:
    - "Think about a rule your organisation has that applies to everyone regardless of their role — a data handling policy, a compliance requirement, a reporting obligation. How would that rule appear at the organisation context level? What would it prevent an agent from doing, even if a knowledge worker tried to instruct otherwise?"
    - "If an agent in your domain ignored a SKILL.md instruction you were confident was correctly written, what would your first diagnostic step be? Why does it matter to check platform and organisation levels before assuming the SKILL.md has an error?"
  teaching_tips:
    - "Open the lesson with the scenario rather than the framework. Students who encounter the problem first — 'why is my agent ignoring this instruction?' — absorb the three-level explanation more readily than those who receive the framework in the abstract."
    - "The silent override is the most counterintuitive element. Spend time on it. Students who work through the compliance logging example typically understand the mechanism more concretely than those who receive only the conceptual explanation."
    - "Frame the diagnostic sequence as a professional skill, not a debugging workaround. Senior professionals who work with AI agents will run this diagnostic regularly. Building the habit now prevents hours of unnecessary SKILL.md revision later."
    - "The new employee analogy is useful for the remedial path but can be introduced for the whole group: every professional operates within a hierarchy of constraints — professional standards, firm policies, individual discretion. The three context levels are the same structure applied to AI agents."
  assessment_checks:
    - question: "What are the three levels of Cowork's context hierarchy?"
      expected_response: "Platform context (set by Anthropic, applies to all Claude deployments), organisation context (set by the Cowork administrator, applies to all plugins in the organisation), and plugin context (the SKILL.md itself, set by the knowledge worker)"
    - question: "What does 'silent override' mean?"
      expected_response: "When a higher context level constrains a behaviour, the agent does not announce that a SKILL.md instruction has been overridden — it simply behaves as the higher level requires. The knowledge worker sees the outcome but receives no explanation."
    - question: "A knowledge worker rewrites their SKILL.md three times, but the agent still will not produce formatted compliance reports sent directly to an external system. What is the most likely explanation?"
      expected_response: "The output routing behaviour is probably constrained at the organisation level — the administrator has set a policy requiring all compliance-related outputs to be reviewed before external transmission. Rewriting the SKILL.md cannot override an organisation-level policy. The knowledge worker should speak to their administrator."
    - question: "In what order should you run the diagnostic when a SKILL.md instruction is not being followed?"
      expected_response: "Platform level first (is this something no Cowork deployment can do?), organisation level second (has the administrator set a policy that restricts this?), SKILL.md last (is there an error in the instruction itself?)."
---

# The Three-Level Context System

In Lesson 3, you established that the config.yaml sets the deployment environment — the model, the connectors, the permission scope, and the governance settings — and that this file is owned by IT, not the knowledge worker. You also saw that permission boundaries in the config.yaml are enforced by the Cowork runtime: if the SKILL.md were to instruct the agent to access data outside its configured scope, the attempt would fail silently.

That single observation — that a SKILL.md instruction can be overridden without announcement — points to something larger than the config.yaml. There is a hierarchy of contexts in which every Cowork plugin operates, and understanding that hierarchy is what allows you to diagnose why an agent behaves differently from what the SKILL.md describes. Without this understanding, the diagnostic for unexpected agent behaviour almost always starts in the wrong place.

This lesson explains the three-level context system, what each level controls, and how to run the diagnostic correctly when an agent does not do what you expect.

## Why Context Hierarchy Matters

Consider a specific scenario. A compliance analyst at a financial services firm has spent two weeks refining the SKILL.md for a contract review agent. The agent is now capable of producing detailed risk summaries that flag problematic clauses, cross-reference regulatory requirements, and recommend escalation paths. The analyst adds a new instruction to the Principles section: all risk summaries should be automatically formatted as structured reports and logged to the firm's external compliance system.

The agent does not do it. The instruction is clear, syntactically valid, and written with exactly the same specificity as the other Principles. The analyst rewrites it, testing three different phrasings. Nothing changes.

Before the analyst rewrites the SKILL.md a fourth time, she needs to understand that the reason the instruction is being ignored may have nothing to do with the SKILL.md. The behaviour she wants may be constrained at a level above the plugin.

## The Three Levels

Cowork's context system operates at three levels, each set by a different authority, each governing a different scope.

| Level | Set By | Scope | Can the Knowledge Worker Override? |
|-------|--------|-------|------------------------------------|
| **Platform** | Anthropic | All Claude deployments, regardless of plugin configuration | No |
| **Organisation** | Cowork administrator | All plugins within the organisation | No |
| **Plugin** | Knowledge worker | This specific plugin, within the boundaries of levels above | Within limits |

### Level 1: Platform Context

Platform context is set by Anthropic and applies to every Claude deployment, everywhere. It defines the model's fundamental capabilities, its safety properties, and its hard constraints — the behaviours that apply regardless of what any organisation or knowledge worker instructs.

The knowledge worker does not configure platform context. There is no access to it, no ability to modify it, and in most circumstances, no need to think about it. Its practical relevance is narrow but important: certain behaviours are not possible in any Cowork plugin, regardless of what the SKILL.md instructs. When an agent consistently refuses to perform an action that seems straightforward, and the refusal does not trace to an organisation-level policy, the behaviour may be a platform-level constraint.

Platform-level constraints are not technical limitations of the model. They are policy decisions. The model is capable of many things that Anthropic has chosen not to allow in production deployments. Knowing that the distinction exists — between "the model cannot do this" and "Anthropic has decided this is not permitted" — is sufficient for the knowledge worker's diagnostic purposes.

### Level 2: Organisation Context

Organisation context is set by the Cowork administrator and applies to all plugins within the organisation. This is the level that governs the operational environment: approved data sources, governance policies, audit requirements, user permission models, and IAM integration.

The compliance analyst's situation almost certainly traces to this level. When a financial services firm deploys Cowork, the administrator configures organisation-wide policies that reflect the firm's regulatory obligations. One such policy might be that all outputs from compliance-related agents must route through an internal review queue before reaching any external system. This policy applies to every compliance plugin in the organisation, regardless of what individual SKILL.md files instruct.

The knowledge worker configures the SKILL.md within the boundaries the administrator has set — not instead of them. If the administrator has established that compliance outputs require internal review before external transmission, no instruction in the SKILL.md can route outputs directly to an external system. The plugin context operates inside the organisation context, not alongside it.

This matters practically because organisation-level policies are often set for legitimate reasons that the knowledge worker may not be fully aware of: regulatory requirements, legal obligations, audit commitments, or risk management decisions made at a level above the operational deployment of any individual plugin.

### Level 3: Plugin Context

Plugin context is the SKILL.md itself. It defines the specific behaviours, knowledge base, operating constraints, and response patterns for this particular agent. Instructions in the SKILL.md that conflict with organisation context are silently overridden. Instructions that conflict with platform context are similarly overridden.

Within the boundaries of levels above, the knowledge worker has genuine authority. The SKILL.md can add more-restrictive constraints than the organisation context requires. It can narrow the agent's scope, restrict the data sources it queries, add escalation thresholds that are more conservative than organisation defaults, and specify response patterns tailored to the specific domain. What the SKILL.md cannot do is expand the agent's permissions or override governance decisions made at higher levels.

The direction of this relationship is one-way and unconditional: higher levels constrain lower levels, without exception and without announcement.

## The Silent Override

The most counterintuitive property of the three-level system is that overrides are silent.

When a SKILL.md instruction conflicts with an organisation-level policy, the agent does not announce it. It does not say "I cannot follow this instruction because your organisation has configured a policy that prevents it." It simply behaves in accordance with the higher-level constraint and produces its output accordingly. From the knowledge worker's perspective, the agent appears to be ignoring a clearly written instruction — with no explanation and no error message.

This behaviour is architectural, not a design oversight. The organisation context is not visible to the knowledge worker at the plugin level by design. Surfacing internal governance policies through agent responses would create its own complications — disclosing the structure of compliance constraints, audit requirements, or permission models to every user who asked the agent a question that happened to touch on a restricted behaviour.

The practical implication is that the knowledge worker must understand the three-level system before encountering a silent override in production. An analyst who does not know that organisation context exists will spend significant time revising a SKILL.md that is not the source of the problem.

## The Diagnostic Sequence

When an agent does not follow a SKILL.md instruction, the diagnostic runs in the same order as the hierarchy: platform level first, organisation level second, SKILL.md last.

| Step | Question | Outcome if True |
|------|----------|-----------------|
| **1. Platform level** | Is this a behaviour that no Cowork deployment can produce? | The constraint is immutable. Find an alternative approach. |
| **2. Organisation level** | Has the administrator set a policy that governs this behaviour? | Speak with your administrator. The constraint may be modifiable; it may be regulatory. |
| **3. Plugin level** | Is there an error or ambiguity in the SKILL.md instruction itself? | Revise the instruction. This is the only level the knowledge worker can modify directly. |

The sequence matters because starting at step 3 — which is the most natural starting point for a knowledge worker — wastes time when the constraint is actually at step 1 or step 2. The compliance analyst who rewrote her SKILL.md three times was running the diagnostic from step 3. Had she started at step 2, she would have recognised the organisation-level policy within minutes and had a productive conversation with her administrator about whether the constraint was mandatory or configurable.

Running the diagnostic correctly also produces better conversations with administrators and IT teams. "The agent is not following my SKILL.md instruction" is a less useful report than "I believe this behaviour is constrained at the organisation level — specifically, I think there may be a policy preventing direct output to external systems. Can you confirm whether that's the case and whether there's a way to configure an exception for compliance reports reviewed by a qualified solicitor?"

## Adding Constraints vs Removing Constraints

One further point that prevents a common misconception: the knowledge worker can always add more-restrictive constraints to the plugin level. The SKILL.md can instruct the agent to escalate to a human reviewer at a lower threshold than the organisation requires, to query only a subset of the approved data sources, or to apply more conservative uncertainty thresholds than the default. These additions are additive and are always honoured.

What the SKILL.md cannot do is remove or override restrictions established at higher levels. A knowledge worker cannot write a SKILL.md instruction that bypasses an organisation-level audit requirement, expands the agent's data access beyond the configured permission scope, or removes a platform-level safety constraint. Attempts to do so are silently overridden, and the agent continues to operate under the higher-level constraint.

The practical read on this: when debugging unexpected behaviour, if the agent is doing something more restrictive than the SKILL.md requires, the cause may be at a higher level. If the agent is failing to do something the SKILL.md instructs, the cause is almost certainly at a higher level. If the agent is doing something the SKILL.md explicitly prohibits, the cause is in the SKILL.md — that is the one case where the plugin level is the relevant diagnostic stop.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to apply the three-level context system to your own domain.

### Prompt 1: Personal Application

```
I work as [YOUR ROLE] in [YOUR INDUSTRY]. I'm designing a Cowork plugin
for [SPECIFIC USE CASE]. Help me think through what constraints I would
expect at each of the three context levels:

1. Platform level: What behaviours might Anthropic have constrained that
   could affect my plugin — for example, around data handling, output
   routing, or sensitive information?

2. Organisation level: Based on my industry's regulatory requirements,
   what organisation-wide policies would a Cowork administrator in my
   field likely configure — for example, around audit logging, output
   review, or data access?

3. Plugin level: Within those constraints, what specific behaviours would
   I configure in the SKILL.md that are particular to my use case?

For each level, give me one example of a constraint that would apply and
one example of something the knowledge worker can still customise within
that constraint.
```

**What you're learning:** The three-level system becomes concrete when you map it to your own domain. By working through each level with a specific use case in mind, you build the diagnostic intuition needed to recognise which level is responsible for unexpected agent behaviour — before you spend time revising a SKILL.md that is not the source of the problem.

### Prompt 2: Diagnostic Practice

```
Here is a scenario: a knowledge worker at a healthcare organisation has
written a SKILL.md for a clinical documentation agent. The agent is
supposed to produce discharge summaries and send them directly to the
hospital's patient records system. Despite a clear instruction in the
Principles section, the agent always routes the summaries to a review
queue instead of sending them directly.

The knowledge worker has rewritten the instruction twice. The summaries
are correctly formatted. The instruction is syntactically clear.

Help me run the three-level diagnostic for this scenario:

1. Is this likely a platform-level constraint?
2. Is this likely an organisation-level constraint? What specific policies
   might a healthcare organisation's Cowork administrator have in place
   that would produce this behaviour?
3. Is this likely a SKILL.md error?

Based on your analysis, what should the knowledge worker do next — and
what should they say to their administrator to have a productive conversation?
```

**What you're learning:** Running the diagnostic as a structured exercise, rather than encountering it for the first time in production, builds the pattern recognition needed to identify override behaviour quickly. The healthcare scenario is representative of how organisation-level policies appear in regulated industries — mandatory review gates that apply regardless of what individual SKILL.md files instruct.

### Prompt 3: Domain Research

```
I want to understand what organisation-level constraints a Cowork
administrator in [YOUR INDUSTRY] might configure.

Research the regulatory requirements that apply to AI systems in
[YOUR INDUSTRY] — for example, data handling obligations, audit
requirements, output review requirements, or restrictions on autonomous
decision-making. For each requirement you find, suggest how it might
appear as an organisation-level context constraint: what behaviour would
it restrict, and how would that restriction appear to a knowledge worker
debugging unexpected agent behaviour?

Present your findings as a table: Regulatory Requirement | Expected
Organisation-Level Constraint | How It Appears to the Knowledge Worker.
```

**What you're learning:** Organisation-level constraints in regulated industries are not arbitrary — they reflect specific regulatory obligations that the administrator is implementing on behalf of the organisation. Understanding the regulatory landscape in your domain helps you anticipate which constraints are likely to be in place and which may be modifiable through a conversation with your administrator versus which are mandatory and non-negotiable.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 5: The Agent Skills Pattern in Practice →](./05-agent-skills-pattern-in-practice.md)
