---
sidebar_position: 6
title: "Organisational AI Maturity Model"
description: "Assess any organisation's AI readiness using the five-level Organisational AI Maturity Model and determine the appropriate intervention for each level"
keywords: ["AI maturity model", "organisational readiness", "AI adoption levels", "awareness", "experimentation", "integration", "optimisation", "transformation", "Post-Pilot Trap"]
chapter: 14
lesson: 6
duration_minutes: 30

# HIDDEN SKILLS METADATA
skills:
  - name: "Name the Five Maturity Levels"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can list all five maturity levels in order (Awareness, Experimentation, Integration, Optimisation, Transformation) and provide a one-sentence description of each"

  - name: "Assess Organisation Maturity Level"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can assess a described organisation against the five-level model and correctly identify its current maturity level, citing at least two diagnostic indicators"

  - name: "Recommend Appropriate Intervention by Level"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can recommend the appropriate intervention (education, pilot deployment, structured integration, portfolio optimisation, or organisational redesign) for a given maturity level and explain why other interventions would be premature or insufficient"

learning_objectives:
  - objective: "List the five levels of the Organisational AI Maturity Model in order and describe the defining characteristics of each"
    proficiency_level: "A1"
    bloom_level: "Remember"
    assessment_method: "Student names all five levels and correctly describes at least two characteristics of each"

  - objective: "Assess a described organisation's AI maturity level using diagnostic indicators"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a scenario describing an organisation's AI activities, governance, and leadership, student identifies the correct maturity level and explains the reasoning"

  - objective: "Recommend the appropriate deployment intervention for a given maturity level"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student matches the correct intervention to each maturity level and explains why interventions from higher or lower levels would be inappropriate"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Level 1: Awareness"
    - "Level 2: Experimentation"
    - "Level 3: Integration"
    - "Level 4: Optimisation"
    - "Level 5: Transformation"
  assessment: "5 concepts forming a single linear progression. The levels build sequentially, so each new level extends the prior one rather than introducing unrelated concepts. Cognitive load is manageable because the structure is predictable."

differentiation:
  extension_for_advanced: "Map three real organisations you know to their maturity levels and propose a 6-month plan for each to advance one level"
  remedial_for_struggling: "Focus on Levels 1-3 only and practise distinguishing between them using concrete examples before studying Levels 4 and 5"

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Readiness and Maturity"
  key_points:
    - "Readiness is not a binary property (ready/not ready) -- it is a level, and organisations can move through levels deliberately"
    - "Most large enterprises sit at Level 2 (Experimentation) in early 2026 -- recognising this prevents both overestimation and underestimation of readiness"
    - "The Post-Pilot Trap (the transition zone between Level 2 and Level 3) is where most enterprise AI deployments stall"
    - "Deploying agents to a Level 1 organisation is a recipe for failure -- the appropriate intervention is education, not deployment"
    - "Part 3 agents are most naturally at home in Level 3 organisations -- if your organisation is at Level 2, the first goal is reaching Level 3"
  misconceptions:
    - "Students assume their organisation is more mature than it actually is -- the diagnostic indicators help calibrate honestly"
    - "Students think Level 5 (Transformation) is the goal -- for most organisations, reaching and sustaining Level 3 is the practical objective"
    - "Students believe maturity is purely a technology question -- it also requires governance, leadership, and organisational design changes"
  discussion_prompts:
    - "At what maturity level does your organisation sit today? What evidence supports that assessment?"
    - "What would need to change to move your organisation from its current level to the next one?"
    - "Have you seen an organisation try to deploy AI agents before it was ready? What happened?"
  teaching_tips:
    - "Have students self-assess their organisation before revealing the model -- then let them see where they land, which creates an 'aha moment' when the model validates or challenges their intuition"
    - "Spend extra time on the Level 2 to Level 3 transition (the Post-Pilot Trap) because this is where most readers' organisations currently sit"
    - "Use Level 1 as a reality check: if someone's organisation is at Level 1, the honest advice is 'do not deploy agents yet -- invest in education first'"
  assessment_checks:
    - question: "Why is Level 1 (Awareness) not a good candidate for domain agent deployment?"
      expected_response: "Because there is no governance, no data strategy, no designated AI owner, and individual employees are using consumer tools without organisational sanction. Deploying an agent into this environment would lack the infrastructure needed for it to succeed."
    - question: "What is the Post-Pilot Trap and where does it occur?"
      expected_response: "The Post-Pilot Trap is the transition zone between Level 2 (Experimentation) and Level 3 (Integration), where organisations have run successful pilots but fail to move to structured, governed production deployment. Most enterprise AI stalls here."
---

# Organisational AI Maturity Model

In Lesson 5, you learned the four models for capturing value from domain agents. But monetisation only works if the organisation is ready for deployment. Not every organisation is.

Readiness is not a binary property -- either ready or not ready. It is a level. Organisations can move through levels deliberately, and understanding where an organisation sits today determines what intervention is appropriate. Deploy too early, and the agent fails not because the technology was wrong but because the organisation could not support it. Wait too long, and competitors move first.

This lesson gives you a five-level model for assessing any organisation's AI maturity. By the end, you will be able to look at your own organisation, diagnose its level honestly, and determine what needs to change to move forward.

## Level 1: Awareness

AI is on the agenda but not in operations.

At Level 1, individual employees are using consumer AI tools -- ChatGPT, Claude, Gemini -- on their own initiative. There is no organisational sanction, no governance, no data strategy, and no designated AI owner. The leadership team talks about AI in meetings. Nobody has deployed anything.

### Diagnostic Indicators

- Employees use personal AI accounts for work tasks
- No AI policy or acceptable use guidelines exist
- No budget allocated specifically for AI tools
- AI appears in strategic plans as a future initiative, not a current programme

### Appropriate Intervention

**Education, not deployment.** Level 1 organisations are not candidates for domain agent deployment. The infrastructure -- governance, data access, designated ownership -- does not exist yet. Attempting to deploy an agent here fails not because the technology is inadequate but because the organisation cannot support it.

The right move: run awareness workshops, establish an AI working group, draft an acceptable use policy, and identify one team willing to run a pilot. That is how you move to Level 2.

## Level 2: Experimentation

Active pilots. At least one team has deployed a real agent.

At Level 2, the organisation has moved beyond talk. A designated AI lead or working group exists, though with limited authority. At least one team has deployed a real agent -- not a demo, not a proof of concept, but an agent that handles real work. Results are promising but isolated.

**This is where most large enterprises sit in early 2026.**

### Diagnostic Indicators

- At least one team has an agent in active use
- A designated AI lead or working group exists (but lacks enterprise-wide authority)
- Budget is allocated for AI experimentation (but not scaled deployment)
- Leadership is interested but not yet sponsoring enterprise-wide adoption

### The Post-Pilot Trap

Level 2 is also where most enterprise AI deployments stall. The pilot worked. Leadership was impressed. And then nothing happened.

This is the **Post-Pilot Trap** -- the transition zone between Experimentation and Integration. Pilots succeed because they operate in controlled conditions: a motivated team, a clear problem, executive attention. Scaling requires governance, cross-team coordination, and sustained investment. Most organisations do not make that leap.

### Appropriate Intervention

Deploy team-level Cowork agents with measurable value and minimal governance overhead. The goal is not enterprise transformation. The goal is building a track record of measurable results that justifies the investment needed to reach Level 3.

Pick one domain. Pick one team. Deploy one agent. Measure the value. Use that evidence to make the case for structured deployment.

## Level 3: Integration

Structured deployment. Agents in production, connected to real systems, with governance.

At Level 3, the organisation has moved beyond experimentation. There is a formal AI strategy with executive sponsorship. IT has a defined role in agent deployment. Agents are connected to production systems -- CRM, ERP, document management -- with real data flowing through governed pipelines.

**This is where Part 3 agents are most naturally at home.**

### Diagnostic Indicators

- Formal AI strategy document exists with executive sponsorship
- IT has a defined role in agent infrastructure (connectors, security, monitoring)
- At least one agent is in production with real system integrations
- Governance policies cover data access, output review, and escalation procedures
- Budget is allocated for sustained deployment, not just experimentation

### Appropriate Intervention

Deploy a single vertical fully: one domain, one team, one agent, full stack. This means SKILL.md authored by the domain expert, connectors to real systems managed by IT, governance policies in place, and measurable value being tracked.

The emphasis at Level 3 is depth over breadth. Do one deployment completely and well. Document what worked, what failed, and what you would change. That documentation becomes the playbook for expanding to additional domains.

## Level 4: Optimisation

Multi-vertical portfolio. Mature governance. Performance measurement driving investment decisions.

At Level 4, the organisation has multiple agents deployed across multiple domains. Governance is mature -- there are clear policies for data access, output quality, escalation, and agent retirement. The strategic question shifts from "should we deploy AI?" to "how do we optimise our AI portfolio?"

### Diagnostic Indicators

- Multiple agents deployed across different departments
- Centralised governance with clear policies and oversight
- Performance dashboards tracking agent value across the portfolio
- Investment decisions driven by measured ROI, not experimentation budgets
- Platform commitment decisions (Cowork, Frontier, or both) are being made

### Appropriate Intervention

This is where platform commitment and build-versus-buy decisions become relevant. At Level 4, the organisation has enough deployment experience to make informed decisions about:

- Which platform to standardise on (or whether to use both)
- Which domains to expand into next
- Where to invest in custom development versus marketplace solutions
- How to balance agent capability against governance requirements

The cross-vertical portfolio strategy in Chapter 24 is addressed primarily to Level 4 organisations. The build-versus-buy decision for SKILL.md development -- whether to invest in internal knowledge extraction capability or engage an external services provider -- becomes relevant at this level.

## Level 5: Transformation

Organisational redesign around agent capability.

At Level 5, the organisation has fundamentally redesigned how it works. Job descriptions have changed. Human-agent boundaries are explicitly negotiated and documented. AI governance is a standing organisational capability, not a project.

**Few organisations are here in 2026.** Level 5 is the long-term destination, not a near-term goal for most Part 3 readers.

### Diagnostic Indicators

- Job descriptions explicitly reference human-agent collaboration
- Organisational structure has changed to reflect agent capabilities
- AI governance is a permanent function (not a temporary project)
- New roles have been created specifically to manage human-agent workflows
- The organisation measures itself differently because of agent capabilities

### Summary Table

| Level | Name | Defining Feature | Appropriate Intervention |
|-------|------|-----------------|------------------------|
| **1** | Awareness | AI on agenda, not in operations | Education and policy |
| **2** | Experimentation | Active pilots, isolated results | Team-level Cowork deployment |
| **3** | Integration | Production agents with governance | Single vertical, full stack |
| **4** | Optimisation | Multi-vertical portfolio | Platform commitment, portfolio management |
| **5** | Transformation | Organisational redesign | Continuous evolution |

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to explore these concepts further.

### Prompt 1: Personal Application

```
I work at [describe your organisation -- size, industry, current AI
usage]. Based on the five-level Organisational AI Maturity Model, help
me assess our current level. Ask me diagnostic questions about:
(1) whether we have any AI agents in active use, (2) whether we have
a designated AI lead or governance policy, (3) whether leadership has
allocated budget for AI beyond experimentation, and (4) whether any
agents are connected to production systems. Then tell me what level
we are at and what the next step should be.
```

**What you're learning:** You are practising honest organisational assessment. The AI's questions force you to evaluate your organisation against specific diagnostic indicators rather than relying on optimistic self-assessment.

### Prompt 2: Framework Analysis

```
Here are three organisations at different maturity levels. For each
one, identify the level and recommend the appropriate intervention.

Organisation A: A 500-person consulting firm where several consultants
use ChatGPT for research. There is no AI policy, no designated owner,
and no budget. The CEO mentioned AI at the last all-hands meeting as
"something we should explore."

Organisation B: A 2,000-person insurance company with a data science
team that built a claims-processing agent six months ago. It handles
30% of routine claims. The CTO sponsors the programme, but no other
department has deployed an agent.

Organisation C: A 10,000-person bank with AI agents in compliance,
fraud detection, customer service, and loan underwriting. A Chief AI
Officer reports to the CEO. Investment decisions are driven by
quarterly performance dashboards.
```

**What you're learning:** You are calibrating your assessment skills across the full maturity spectrum. Getting all three right confirms you can distinguish between adjacent levels (the hardest part of assessment).

### Prompt 3: Domain Research

```
Research the current state of AI maturity in [YOUR INDUSTRY -- e.g.,
"mid-size architecture firms," "regional healthcare systems,"
"financial advisory firms"]. Based on what you find, what maturity
level would you estimate most organisations in my industry are at?
What are the most common barriers preventing them from reaching the
next level? What does that mean for me if I want to be ahead of
the curve?
```

**What you're learning:** You are positioning your own organisation within your industry's maturity landscape. This helps you set realistic expectations and identify competitive advantages available at your current level.


## Flashcards Study Aid

<Flashcards />
