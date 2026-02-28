---
sidebar_position: 8
title: "The Division of Responsibility"
description: "Map the three-way ownership model — knowledge worker owns SKILL.md, IT owns connectors, administrator owns governance — and apply it to diagnose problems and assign accountability in a deployed Cowork plugin"
keywords:
  [
    "ownership model",
    "division of responsibility",
    "knowledge worker",
    "IT ownership",
    "governance administrator",
    "SKILL.md ownership",
    "connector maintenance",
    "layer independence",
    "plugin accountability",
    "Cowork enterprise",
    "agent degradation",
    "maintenance discipline",
  ]
chapter: 15
lesson: 8
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Apply the Three-Way Ownership Model"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Given a description of a plugin problem or maintenance task, student can correctly assign it to the knowledge worker, IT, or administrator, and explain why it belongs in that layer rather than another"

  - name: "Diagnose Plugin Failures by Layer"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Given a description of observed plugin degradation or misbehaviour, student can identify which layer is responsible, what the likely cause is within that layer, and who needs to act"

  - name: "Design a Plugin Maintenance Schedule"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can produce a maintenance schedule for a plugin in their domain that assigns specific review responsibilities to each of the three owners and specifies trigger conditions for unscheduled updates"

learning_objectives:
  - objective: "Map each component of a Cowork plugin — SKILL.md sections, config.yaml, connector scripts, and governance configuration — to its correct owner using the three-way ownership model"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a list of plugin components and tasks, student can assign each to knowledge worker, IT, or administrator without error, and articulate the reasoning for ambiguous cases"

  - objective: "Diagnose a described plugin failure by identifying which layer is responsible and what the likely cause is within that layer"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a scenario describing observed degradation (wrong output, stale data, access error, policy mismatch), student can trace it to the correct layer and describe the appropriate remediation action"

  - objective: "Explain the layer independence principle and articulate why each role has no incentive to intrude on the other two layers"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can describe what would happen to diagnosability and accountability if two roles shared ownership of a single component, using a concrete scenario to illustrate the point"

cognitive_load:
  new_concepts: 2
  concepts_list:
    - "Three-way ownership model (knowledge worker → SKILL.md, IT → connectors, admin → governance)"
    - "Layer independence principle (each role operates without incentive to intrude on others)"
  assessment: "2 concepts at B1 level — below the 7-10 cognitive limit for this proficiency band. Both concepts are synthesising, not additive: they reorganise components already taught in L01-L07 into a clean accountability structure. The low concept count is appropriate because the cognitive work here is integration, not acquisition."

differentiation:
  extension_for_advanced: "Map the three-way ownership model to a plugin failure scenario you have either experienced or can plausibly imagine in your domain. For each layer, write a diagnostic checklist — the specific questions you would ask to determine whether the problem originates there. Then design an escalation protocol: if the problem is in layer A but requires information from layer B to diagnose, how does the communication flow? Who contacts whom, in what order, with what information?"
  remedial_for_struggling: "Focus on the ownership table and one failure scenario. For each row in the table, write a single sentence: 'If [this component] produces [this symptom], I contact [this person].' If you can write those sentences accurately for all eight rows, you have the operational version of the ownership model. Start there before moving to the layer independence principle."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Ownership and Accountability"
  key_points:
    - "The three-way ownership model is not organisational tidiness — it is the mechanism that makes degradation diagnosable. Without clear ownership, a misbehaving agent produces ambiguity about who acts, which delays resolution and allows degradation to continue."
    - "SKILL.md maintenance is ongoing professional discipline, not a one-time authorship task. Domain standards evolve, organisational policies change, new edge cases emerge. The knowledge worker who treats SKILL.md as write-once has not deployed an agent — they have deployed a specification that will drift from reality."
    - "Layer independence is a structural property: each role has no incentive to intrude on the other two layers because each layer contains only what that role understands and controls. This is not enforced by policy — it is a natural consequence of the component design."
    - "The ownership table is the primary operational tool from this lesson. Students should be able to use it to assign any described problem to the correct owner without deliberation."
  misconceptions:
    - "Students may think ownership is about who is allowed to touch something, enforced by access controls. Layer independence is deeper than that — it is about who has the knowledge to make good decisions within each layer. IT could theoretically edit a SKILL.md, but they lack the domain expertise to do it correctly."
    - "Students may think SKILL.md is stable once the agent works well. Domain expertise evolves. Regulatory standards change. Organisational priorities shift. A SKILL.md that is not reviewed is a SKILL.md that is becoming wrong."
    - "Students may assume that when something goes wrong, it is the knowledge worker's problem (since they designed the agent). The ownership model identifies exactly which layer is responsible. If the connector is returning stale data, that is an IT problem, not a knowledge worker problem — and acting as though it is the knowledge worker's problem wastes time and obscures the actual cause."
  discussion_prompts:
    - "Think of a professional standard in your domain — a regulatory requirement, a firm policy, an industry benchmark — that has changed in the past two years. If an agent had been deployed encoding the old standard, what would it be doing wrong today? Whose responsibility would it be to update it?"
    - "When something goes wrong with a piece of software you rely on at work, how easy is it to identify who is responsible for fixing it? Compare that to the ownership model described in this lesson. What would need to be true about your organisation's AI deployments for accountability to be that clear?"
  teaching_tips:
    - "Open with the failure scenario before introducing the model. Students who have felt the friction of ambiguous accountability — the email chain that goes nowhere, the problem that sits between teams — will immediately recognise the value of the ownership model as a solution."
    - "The ownership table is the lesson's most reusable artefact. Spend time on it. Walk through each row and ask students to name a real situation from their domain that would correspond to that row."
    - "On SKILL.md maintenance: frame it as analogous to maintaining a professional standard. A compliance officer who updates their firm's risk criteria updates every process that depends on them. A knowledge worker who owns a SKILL.md has the same obligation."
    - "The layer independence principle can be illustrated by asking what would happen if IT decided to 'help' by editing the Principles section of a SKILL.md. IT does not know enough about the domain to edit it correctly. The model's independence is not restrictive — it is a protection against well-intentioned interference."
  assessment_checks:
    - question: "The agent is returning analyses that reference a regulatory standard that was updated three months ago. Whose problem is this?"
      expected_response: "This is the knowledge worker's problem. The SKILL.md's Principles section likely encodes the old standard. The knowledge worker must review and update the SKILL.md to reflect the current regulatory position. This is an example of why SKILL.md maintenance is ongoing."
    - question: "Users in the compliance department can no longer access the plugin, but the rest of the finance team can. Whose problem is this?"
      expected_response: "This is an IT or administrator problem, depending on whether the issue is a connector permission change (IT) or an access control misconfiguration (admin). The knowledge worker's SKILL.md is not involved — the agent's logic has not changed, only who can reach it."
    - question: "The agent is occasionally drawing on client data from accounts it should not have access to. Whose problem is this?"
      expected_response: "This is an IT problem. Connector scope is configured in the config.yaml and implemented in the connector scripts — both owned by IT. The knowledge worker may have specified the required scope, but the misconfiguration lives in the integration layer."
    - question: "What is the layer independence principle?"
      expected_response: "Each role operates within its own layer and has no incentive to intrude on the other two layers, because each layer contains only what that role understands and controls. IT does not need to read SKILL.md to maintain connectors. The knowledge worker does not need connector code to maintain SKILL.md. The administrator does not need either to configure governance. Dependencies are explicit and interfaces are clean."
---

# The Division of Responsibility

The trouble with ambiguous ownership is that it rarely announces itself. A deployed agent does not send a message saying "no one is sure who is responsible for maintaining me." What it does, instead, is drift. The Principles section encodes a regulatory standard that was updated eight months ago, but no one thought to update the SKILL.md because the knowledge worker assumed IT had done something, and IT assumed it was a content issue, and the administrator assumed the knowledge worker was on top of it. The agent keeps running. The outputs keep looking plausible. And slowly, quietly, the gap between what the agent does and what it should do becomes the kind of gap that surfaces in a compliance review rather than a routine check.

This is the central failure mode that clean ownership prevents. Not spectacular breakdowns, but slow degradation — the kind that is hardest to detect precisely because the system continues to function, just not correctly. The seven lessons that preceded this one have built the complete architecture of a Cowork plugin: the three components, the context hierarchy, the connector ecosystem, and the governance layer. This lesson establishes who is responsible for maintaining each part of that architecture, what their responsibilities are, and why the boundaries between responsibilities are drawn where they are.

The ownership model is not bureaucratic convention. It is the mechanism that makes a deployed agent diagnosable — and diagnosability is what separates a managed system from a technical liability.

## Three Roles, Three Layers

A Cowork plugin has three owners. Each owner operates in a distinct layer. Each layer contains only what that owner understands well enough to maintain correctly.

**The knowledge worker** owns the intelligence layer. This means the SKILL.md in its entirety: the Persona that defines the agent's identity and professional positioning, the Questions section that defines scope and out-of-scope handling, and the Principles that encode the operating logic, domain constraints, escalation thresholds, and quality standards. The knowledge worker authored the SKILL.md, tested it against domain scenarios during shadow mode, and takes professional responsibility for what the agent does. If the SKILL.md applies a wrong jurisdictional standard, that is the knowledge worker's error. If the SKILL.md fails to cover a recurring case, it is the knowledge worker's responsibility to update it.

**IT** owns the integration layer. This means the connector scripts that maintain authenticated connections to enterprise systems, and the config.yaml that configures the deployment environment — model version, interface settings, permission scope, connector access, governance flags. When a connector begins returning stale data because an upstream API changed, that is an IT problem. When the plugin needs access to a new enterprise system, IT builds and maintains the connector. The knowledge worker specifies what data access is needed; IT implements and maintains it.

**The administrator** owns the governance layer. This means the organisation-level policies that determine who can access the plugin and at what permission level, the audit trail configuration, the shadow mode settings, and the human-in-the-loop gate enforcement. The knowledge worker does not modify governance configuration without going through the administrator. The administrator does not modify SKILL.md without going through the knowledge worker.

## The Ownership Table

The complete ownership assignment across every plugin component:

| Component | Owner | What They Do |
|---|---|---|
| SKILL.md (Persona) | Knowledge worker | Defines agent identity, authority, and tone |
| SKILL.md (Questions) | Knowledge worker | Defines scope, capabilities, and out-of-scope handling |
| SKILL.md (Principles) | Knowledge worker | Defines operating logic, constraints, and escalation |
| config.yaml | IT (with knowledge worker specification) | Configures model, interface, permissions, and connector access |
| MCP connector scripts | IT / Developer | Builds and maintains data source integrations |
| Organisation governance policy | Cowork administrator | Sets access control, audit requirements, shadow mode |
| Validation and testing | Knowledge worker | Tests outputs against domain scenarios, manages shadow mode transition |
| Performance monitoring | Knowledge worker + IT | Reviews audit logs, identifies degradation, schedules updates |

The final two rows — validation and monitoring — are the only places where responsibilities overlap. Validation belongs primarily to the knowledge worker because assessing whether outputs are correct against domain standards requires domain expertise. Performance monitoring is shared because the knowledge worker reads the quality dimension of the audit log while IT monitors the technical dimension: connector health, latency, error rates. The overlap is explicit and bounded.

## The Layer Independence Principle

The ownership model has a structural property that is worth making explicit, because it does not happen by accident and it does not hold if the ownership boundaries are blurred.

Each role has no incentive to intrude on the other two layers, because each layer contains only what that role understands and controls.

IT does not need to read or understand the SKILL.md to maintain the connectors. The connector scripts operate at the data transport layer — they authenticate, retrieve, and format data. Whether that data is being used to analyse contract clauses or screen investment portfolios is not something IT needs to know. The connector is correct when it retrieves the right data reliably. IT can assess that without opening the SKILL.md.

The knowledge worker does not need to understand connector code or infrastructure configuration to maintain the SKILL.md. They interact with the connector through the config.yaml specification: they communicate which systems the agent needs access to and what data scope is required. The implementation is IT's. The knowledge worker can assess whether the agent is using the right information without knowing how the connection is built.

The administrator does not need to understand either the domain logic in the SKILL.md or the technical implementation of the connectors to configure governance correctly. The governance layer operates on the output and access dimensions: who sees the plugin, what gets recorded, when human review is required. The administrator can configure those settings without reading a line of the SKILL.md or a line of connector code.

This independence is not restrictive — it is a protection against well-intentioned interference. Consider what happens if IT decides to "help" by editing the SKILL.md's Principles section to make the agent more conservative in response to user complaints. IT does not know enough about the domain to make that edit correctly. They do not know which constraints are regulatory requirements and which are stylistic preferences. They do not know which edge cases the Principles were written to handle and which ones the knowledge worker deliberately left open. The edit will seem reasonable to IT and produce an agent that is quietly wrong in ways neither IT nor the users can easily detect — because the knowledge worker, who would notice, was not part of the change.

The ownership model prevents this not by access control, but by making it immediately clear that the edit is not IT's to make. When the problem is in IT's layer, IT acts. When the problem is in the knowledge worker's layer, the knowledge worker acts. The model eliminates the ambiguity that invites interference.

## SKILL.md Maintenance as Ongoing Discipline

A recurring misconception about the SKILL.md deserves direct attention: it is not write-once. Authoring a SKILL.md and deploying the plugin is not the completion of the knowledge worker's responsibility — it is the beginning of the maintenance phase.

Domain expertise evolves. A financial research agent deployed in early 2026 encodes the regulatory landscape as it existed then. By mid-2026, new guidance has been issued. By 2027, a key piece of legislation has been amended. The Principles section that was accurate at deployment is now incorrect in ways that will not be visible to anyone who does not understand the domain — which is to say, to everyone except the knowledge worker.

Organisational standards change. The firm's risk appetite may shift. A new investment mandate may change which market categories the agent covers. A merger may expand or alter the jurisdictions in which the agent operates. None of these changes affect the connector scripts or the governance configuration. All of them require a SKILL.md update.

New edge cases surface. Shadow mode surfaces quality issues during the transition period, but production use reveals cases that shadow mode did not see. A user query type that was not anticipated in the Questions section. A data condition the connector produces that the Principles do not account for. A recurring escalation pattern that suggests the agent is uncertain about something it should be certain about.

The knowledge worker's relationship to the SKILL.md is the same as a professional's relationship to their practice standards: it requires the same maintenance discipline as any professional standard. A compliance officer who maintains their firm's risk criteria does not write them once and forget them. They review them when regulations change, when the firm's strategy changes, and when an incident reveals a gap. The SKILL.md is maintained the same way.

## Diagnosability in Practice

The reason the ownership model matters as much as it does is that it makes failures diagnosable. When something goes wrong with a deployed plugin, the question "whose problem is this?" has a definitive answer. That answer determines who acts, how quickly, and with what information.

Consider three common failure patterns:

The agent's outputs are referencing outdated information — market data from three weeks ago when the connector should be pulling live feeds. This is an IT problem. The connector is either failing silently, serving from cache beyond its intended refresh window, or the upstream API has changed in a way that breaks the retrieval logic. The knowledge worker did not cause this and cannot fix it. IT needs to know.

The agent is consistently misclassifying a type of contract clause that has become more common in the past six months — a new structure introduced by a major counterparty that the industry has started to adopt. This is a knowledge worker problem. The Principles section does not account for this clause structure because it did not exist when the SKILL.md was authored. The knowledge worker needs to update the classification logic. IT cannot help with this.

The agent is accessible to team members who should not have access to it — junior staff who should be on read-only capability are triggering escalation routing. This is an administrator problem. The permission configuration in the governance layer does not correctly reflect the role-based scoping that was intended. The administrator needs to adjust the access policy. Neither the knowledge worker nor IT owns that configuration.

In each case, the correct action is immediate and unambiguous. The ownership model does not just prevent slow degradation — it collapses the time from "something is wrong" to "the right person is working on it."

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to apply the ownership model to your domain.

### Prompt 1: Map Ownership for Your Plugin

```
I'm planning a Cowork plugin for [YOUR ROLE / WORKFLOW] in [YOUR DOMAIN/INDUSTRY].

Help me map ownership responsibilities for this plugin using the three-way ownership model:
knowledge worker → SKILL.md, IT → connectors and config.yaml, administrator → governance.

For each of the following components, identify: (1) who owns it, (2) what their
specific responsibilities are for this plugin, and (3) what trigger conditions
should prompt a review or update of that component.

Components to map:
- SKILL.md (Persona section)
- SKILL.md (Questions section)
- SKILL.md (Principles section)
- config.yaml
- MCP connector scripts
- Organisation governance policy
- Validation and testing
- Performance monitoring

Ask me questions about my workflow if you need more detail to give domain-specific answers.
```

**What you're learning:** How to translate the abstract ownership model into concrete responsibilities for a real plugin. The goal is to leave this exercise with a draft ownership charter — a clear statement of who is responsible for what — that you could share with IT and your administrator before deployment begins. Ambiguity resolved before deployment is ambiguity that does not become an incident later.

### Prompt 2: Diagnose a Failure Scenario

```
I'm going to describe a problem with a deployed Cowork plugin and I want you to
help me diagnose which layer of the ownership model it belongs to.

The plugin: [DESCRIBE YOUR PLUGIN — domain, purpose, connectors]
The observed problem: [DESCRIBE WHAT IS GOING WRONG]

For each of the three ownership layers (knowledge worker / SKILL.md, IT / connectors
and config.yaml, administrator / governance), assess:
1. Could this layer be responsible for the observed problem? Why or why not?
2. What specific component within this layer would you examine first?
3. What question would you ask the owner of this layer to begin diagnosing?

Then give your best assessment of which layer is most likely responsible and
what the owner should do next.
```

**What you're learning:** How to apply the ownership model as a diagnostic tool. The ability to trace a symptom to the correct layer — without deliberating or defaulting to "it must be the knowledge worker's problem" — is the operational skill this lesson is building. Running this exercise on a real or plausible scenario from your domain makes the model concrete rather than abstract.

### Prompt 3: Design a Maintenance Schedule

```
I need to design an ongoing maintenance schedule for a Cowork plugin I'm deploying
in [YOUR DOMAIN]. The plugin handles [DESCRIBE THE WORKFLOW].

Help me create a maintenance schedule that covers all three ownership layers:

1. KNOWLEDGE WORKER maintenance (SKILL.md reviews):
   - What are the trigger conditions for an unscheduled SKILL.md review? (e.g., regulatory changes, new edge cases, shifts in organisational standards)
   - What should a routine SKILL.md review assess? How often?
   - How do I validate that an updated SKILL.md has not introduced new problems?

2. IT maintenance (connector and config.yaml reviews):
   - What monitoring should IT run on connector health?
   - What trigger conditions should prompt a connector update?
   - What is the change management process if the config.yaml needs to be updated?

3. ADMINISTRATOR maintenance (governance reviews):
   - When should the permission configuration be reviewed?
   - What audit log patterns should prompt a governance review?
   - Who is informed when governance configuration changes?

Present the result as a maintenance schedule I could hand to each of the three owners.
```

**What you're learning:** Maintenance planning is the knowledge worker's contribution to long-term plugin reliability. This exercise applies the ownership model prospectively — not to a problem that has already occurred, but to prevent the slow degradation that occurs when no one has a maintenance schedule. A plugin without a maintenance plan is a plugin that will eventually drift from what it should do.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 9: The Cowork Plugin Marketplace →](./09-cowork-plugin-marketplace.md)
