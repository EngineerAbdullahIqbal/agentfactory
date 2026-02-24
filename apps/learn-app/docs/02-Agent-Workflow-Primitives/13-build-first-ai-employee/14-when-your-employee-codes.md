---
sidebar_position: 14
title: "Hackathon 0: Build Your Personal AI Employee"
sidebar_label: "L14: Hackathon 0"
description: "The Hackathon 0 assignment challenges you to build a complete Personal AI Employee from scratch, applying every skill from Chapter 13. Choose your tier, plan your architecture, and start building."
keywords:
  [
    hackathon,
    personal ai employee,
    capstone project,
    agent architecture,
    claude code,
    obsidian vault,
    watchers,
    MCP servers,
    HITL,
    skills,
    subagents,
    digital fte,
  ]
chapter: 13
lesson: 14
duration_minutes: 30

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 4"
layer_progression: "L4 (Spec-Driven Assignment)"
layer_1_foundation: "N/A (capstone assignment builds on all prior lessons)"
layer_2_collaboration: "N/A"
layer_3_intelligence: "N/A"
layer_4_capstone: "Students plan and build a complete Personal AI Employee using spec-driven approach"

# HIDDEN SKILLS METADATA
skills:
  - name: "Architecture Planning"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can design a multi-component AI Employee architecture selecting appropriate skills, subagents, watchers, and MCP integrations for their chosen tier"

  - name: "Spec-First Project Design"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Create"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student can write a PLAN.md specification that defines architecture, weekly goals, component inventory, and technology choices before implementation begins"

  - name: "Tier-Based Scope Management"
    proficiency_level: "A2"
    category: "Soft"
    bloom_level: "Evaluate"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can assess their own skill level and available time to select an appropriate hackathon tier with realistic deliverables"

  - name: "Component Composition"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Programming"
    measurable_at_this_level: "Student can identify which Chapter 13 components (vault, skills, subagents, watchers, MCP, HITL, scheduling) are required for their chosen tier and how they connect"

learning_objectives:
  - objective: "Evaluate your skill level and available time to select an appropriate hackathon tier"
    proficiency_level: "A2"
    bloom_level: "Evaluate"
    assessment_method: "Student submits tier declaration with justification based on time availability and current skills"

  - objective: "Design a Personal AI Employee architecture using PLAN.md as spec-first artifact"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "PLAN.md contains architecture description, weekly goals, component inventory, and technology choices"

  - objective: "Initialize a hackathon repository with correct directory structure for Claude Code projects"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "GitHub repository created with .claude/skills/, .claude/agents/, watchers/, and scripts/ directories"

  - objective: "Map Chapter 13 lessons to hackathon components, identifying which capabilities each tier requires"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Student can trace each tier requirement back to the specific lesson where that capability was taught"

cognitive_load:
  new_concepts: 3
  assessment: "3 new concepts (tier-based scoping, architecture planning from spec, hackathon submission workflow). Most content synthesizes existing knowledge from L01-L13 rather than introducing new material."

differentiation:
  extension_for_advanced: "Platinum tier: cloud deployment with local/cloud work-zone specialization, multi-vault architecture, monitoring dashboards"
  remedial_for_struggling: "Bronze tier with guided checklist: vault first, then one watcher, then 3 skills, then orchestrator. Follow L01-L07 sequence exactly."

teaching_guide:
  lesson_type: "capstone"
  session_group: 6
  session_title: "Hackathon 0 Launch"
  key_points:
    - "This is a build assignment, not a reading lesson -- students should finish reading in 30 minutes and immediately start building"
    - "Tier selection is the most important decision: the tier table maps directly to time commitment (Bronze 8-12h, Silver 20-30h, Gold 40h+, Platinum 60h+) -- honest self-assessment prevents Week 2 panic"
    - "PLAN.md is the first graded deliverable, not paperwork -- judges compare plan vs outcome, and the spec-first pattern from L07's master skill applies here to the student's own project"
    - "The Chapter 13 Reference Map table is the lesson's most important resource -- every hackathon component traces to a specific lesson (L01-L12), so nothing requires learning new material"
  misconceptions:
    - "Students underestimate Bronze and skip to Silver -- Bronze requires a working vault, one watcher, 3+ skills, and an orchestrator, which is 8-12 hours of focused work"
    - "Students think PLAN.md is busywork -- it is evaluated by judges (Judging Criteria: Documentation 15%) and drives the entire architecture; skipping it means building without a spec"
    - "Students think Gold/Platinum are just 'more of Silver' -- Gold and Platinum require independent research into technologies not covered in Chapter 13 (CRM integration, multi-vault architecture)"
    - "Students think they must work alone -- Claude Code is their co-builder (the Try With AI prompts demonstrate this), and the Wednesday Research Meeting catches design flaws early"
  discussion_prompts:
    - "Which tier did you choose and why? What was the deciding factor -- available hours, ambition, or honest skill assessment from the L13 quiz results?"
    - "Look at your PLAN.md architecture section. Which of the five layers (Brain, Memory, Senses, Hands, Safety) are you least confident about, and which lesson will you revisit?"
    - "If your Gmail API went down mid-demo, how would your architecture handle it? Trace the graceful degradation path from L12."
  teaching_tips:
    - "Have students declare tiers publicly in the first session -- social commitment increases follow-through, and peers can flag unrealistic scopes"
    - "Review 2-3 PLAN.md submissions live, projecting the component table and asking the class to spot missing dependencies between components"
    - "Remind students that Bronze scores high on Functionality (40% weight) beat incomplete Gold submissions -- the Judging Criteria table is worth reading aloud"
    - "This is the chapter closer -- connect back to L00's specification by asking students to compare their PLAN.md architecture against the original five-layer spec"
  assessment_quick_check:
    - "Show me your GitHub repo. Does it have .claude/skills/, .claude/agents/, watchers/, and scripts/ directories?"
    - "Walk me through your PLAN.md component table. For each component, which Chapter 13 lesson teaches it?"
    - "What is your Week 1 vs Week 2 split, and why did you sequence the components in that order?"

# Generation metadata
generated_by: "content-implementer (autonomous execution)"
created: "2026-02-19"
version: "1.0.0"
---

# Hackathon 0: Build Your Personal AI Employee

In Lessons 01 through 13, you built every piece of a Personal AI Employee: vault memory, skills, subagents, Gmail MCP, watchers, HITL approval, 24/7 scheduling, and full orchestration. Each lesson produced a working component. Now you put them all together into something that is entirely yours.

Hackathon 0 is your first build assignment. This lesson gives you the starting structure -- repository, directory layout, and planning template. The building is up to you. You will design, plan, and construct a complete Personal AI Employee that serves your own goals, your own workflows, and your own ambitions. The result is a working Digital FTE that runs on your machine and serves your life.

## What You Are Building

Your Personal AI Employee has five architectural layers. Every layer maps to lessons you have already completed:

```
Brain:    Claude Code            (the General Agent that executes everything)
Memory:   Obsidian Vault         (AGENTS.md governance, skills, knowledge)
Senses:   Python Watchers        (Gmail watcher, file watcher, cron triggers)
Hands:    MCP Servers            (Gmail MCP, Browser MCP, filesystem tools)
Safety:   HITL Approval          (human-in-the-loop for sensitive actions)
```

The Brain reads the Memory to understand its role. The Senses detect events that need attention. The Brain decides what to do and uses its Hands to act. Safety ensures nothing sensitive happens without your approval. This is the architecture from L00's specification, and every component exists because you built it in a prior lesson.

## Choose Your Tier

Hackathon 0 has four tiers. Each tier builds on the previous one. Choose based on how much time you can invest and how far you want to push.

| Tier         | Time   | What You Build                   | Key Deliverables                                                                                                     |
| ------------ | ------ | -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Bronze**   | 8-12h  | Vault + 1 watcher + basic skills | Working vault with AGENTS.md, one filesystem or Gmail watcher, 3+ skills, basic orchestrator                         |
| **Silver**   | 20-30h | Multiple watchers + scheduling   | All Bronze + Gmail watcher, scheduled tasks via cron or PM2, LinkedIn auto-posting skill, HITL for sensitive actions |
| **Gold**     | 40h+   | Business integration             | All Silver + Odoo/CRM integration via MCP, social media management, CEO Briefing automation, error recovery          |
| **Platinum** | 60h+   | Cloud deployment                 | All Gold + cloud VM deployment, local/cloud work-zone specialization, multi-vault architecture, monitoring dashboard |

**Bronze is not the easy tier.** Bronze is a complete, working Personal AI Employee. It watches for events, processes them with skills, and delivers results. Silver, Gold, and Platinum add breadth and resilience -- but Bronze alone proves you can build a Digital FTE.

Choose the tier that matches your honest assessment of available time. Completing Bronze thoroughly is worth far more than starting Gold and abandoning it halfway.

**Gold and Platinum tiers** require technologies not covered in this chapter (CRM integration, multi-vault architecture). Expect independent research. Start with the MCP server registry at [npmjs.com/search?q=mcp-server](https://npmjs.com/search?q=mcp-server) to find integrations for your target platforms.

## Getting Started

### Step 1: Create Your Hackathon Repository

```bash
mkdir personal-ai-employee
cd personal-ai-employee
git init
```

**Output:**

```
Initialized empty Git repository in /Users/you/personal-ai-employee/.git/
```

### Step 2: Create the Directory Structure

```bash
mkdir -p .claude/skills .claude/agents
mkdir -p watchers scripts
touch AGENTS.md CLAUDE.md PLAN.md README.md
```

**Output:**

```
(no output - directories and files created silently)
```

Your initial structure:

```
personal-ai-employee/
├── .claude/
│   ├── skills/          # Your employee's expertise (L02-L04)
│   └── agents/          # Your employee's specialists (L05)
├── watchers/            # Event detection scripts (L08)
├── scripts/             # Utility scripts (L10)
├── AGENTS.md            # Governance rules (L01)
├── CLAUDE.md            # Context for Claude Code (L01)
├── PLAN.md              # Your architecture spec (this lesson)
└── README.md            # Project documentation
```

### Step 3: Write Your PLAN.md

This is your first deliverable. PLAN.md is not paperwork -- it is the specification that drives your entire build. Write it before you write a single skill.

```markdown
# Hackathon 0 Plan

## Tier: [Bronze / Silver / Gold / Platinum]

## Why This Tier

[1-2 sentences: your available time, your goals, your honest skill assessment]

## Architecture

[Describe your planned architecture. What will each layer do?]

- Brain: Claude Code with [describe AGENTS.md governance approach]
- Memory: Obsidian vault storing [what knowledge?]
- Senses: [which watchers? what events do they detect?]
- Hands: [which MCP servers? what actions can they perform?]
- Safety: [what requires HITL approval?]

## Week 1 Goals

- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

## Week 2 Goals

- [ ] Goal 4
- [ ] Goal 5
- [ ] Goal 6

## Components I Will Build

| Component              | Type  | Description                    | Lesson Reference | Priority |
| ---------------------- | ----- | ------------------------------ | ---------------- | -------- |
| Example: email-drafter | Skill | Draft emails with tone control | L02              | Week 1   |
|                        |       |                                |                  |          |

## Technologies

- Brain: Claude Code
- Memory: Obsidian
- Watchers: [which ones and why]
- MCP Servers: [which ones and why]
- Scheduling: [cron / PM2 / other]
```

### Step 4: Push to GitHub

```bash
git add -A
git commit -m "hackathon 0: initial structure and plan"
git remote add origin https://github.com/YOUR-USERNAME/personal-ai-employee.git
git push -u origin main
```

**Output:**

```
[main (root-commit) abc1234] hackathon 0: initial structure and plan
 6 files changed, 0 insertions(+), 0 deletions(-)
```

## Judging Criteria

This is a self-assessment rubric. Use it to evaluate your own work. If your cohort has peer review, share your repository and have a classmate score you using these criteria.

Your hackathon submission is evaluated across four categories:

| Category          | Weight | What Judges Look For                                                                                        |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| **Functionality** | 40%    | Does it work? Can you demo the full pipeline from event detection through processing to result delivery?    |
| **Architecture**  | 25%    | Clean vault structure, proper skill/agent separation, AGENTS.md governance, components that compose cleanly |
| **Safety**        | 20%    | HITL approval for sensitive actions, audit logging, error handling, no uncontrolled side effects            |
| **Documentation** | 15%    | README with architecture diagram, PLAN.md with clear goals, LESSONS_LEARNED.md with honest reflection       |

A Bronze submission that scores high on Functionality and Safety will outrank a Gold submission that crashes during the demo. Working software wins.

## Submission Requirements

Your final repository must contain:

1. **README.md** -- Project overview with architecture diagram (ASCII or image)
2. **PLAN.md** -- Your original plan (judges compare plan vs outcome)
3. **Working demo** -- Screen recording or live demonstration showing the full pipeline
4. **LESSONS_LEARNED.md** -- What you built, what surprised you, what you would do differently

The LESSONS_LEARNED.md is not optional. Reflection is how you convert a project into lasting skill. Write it honestly -- judges value self-awareness over polish.

## Chapter 13 Reference Map

Every hackathon component traces back to a specific lesson. If you get stuck on a component, revisit the lesson that taught it:

| Component                   | Lesson                               | What You Learned                                             |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| Obsidian vault + AGENTS.md  | L01: Your Employee's Memory          | Vault creation, governance files, Claude Code context        |
| Writing skills              | L02: Teaching Your Employee to Write | SKILL.md format, skill directory structure                   |
| Skill formats and templates | L03: Teaching Professional Formats   | Template skills with variable substitution                   |
| Analysis skills             | L04: Teaching Email Intelligence     | Summarization and extraction patterns                        |
| Subagents                   | L05: Hiring Specialists              | Agent files, when skills vs subagents                        |
| Gmail MCP                   | L06: Granting Email Access           | MCP configuration, 19 Gmail tools                            |
| Orchestration               | L07: Bronze Capstone                 | Master skill pattern, delegation logic, graceful degradation |
| Watchers                    | L08: Your Employee's Senses          | Gmail watcher, file watcher, event detection                 |
| HITL approval               | L09: Trust But Verify                | Approval workflows for sensitive actions                     |
| 24/7 scheduling             | L10: Always On Duty                  | cron, PM2, watchdog patterns                                 |
| CEO Briefing                | L11: Silver Capstone                 | Automated reporting and audit                                |
| Full integration            | L12: Gold Capstone                   | Autonomous employee with error recovery                      |

If your chosen tier requires a component you do not feel confident about, that lesson is your study guide. Re-read it. Rebuild its example. Then adapt it for your hackathon project.

## Wednesday Research Meeting

You are not building alone. The weekly Wednesday Research Meeting is where you bring questions, show progress, and get live help from instructors and peers.

Bring your PLAN.md to the first meeting. Walk through your architecture. Get feedback before you invest 10 hours building something that has a structural flaw. The meeting exists precisely for this -- catching design problems early is faster than fixing implementation problems late.

## Try With AI

### Prompt 1: Architecture Review

```
I am building a Personal AI Employee for Hackathon 0. Here is my
PLAN.md:

[paste your PLAN.md here]

Review my architecture. For each layer (Brain, Memory, Senses, Hands,
Safety), tell me:
1. Is anything missing for my chosen tier?
2. Are there dependencies between components I have not accounted for?
3. What should I build first, second, and third to minimize rework?
```

**What you are learning:** Using AI as an architecture reviewer before you start building. A 5-minute review of your plan can save hours of rework. This is the spec-first pattern from Chapter 13 applied to your own project -- write the spec, validate the spec, then build.

### Prompt 2: Scope Estimation

```
I have [X hours] available over the next two weeks for Hackathon 0.
I chose the [Bronze/Silver/Gold/Platinum] tier.

Here are the components I plan to build:
[paste your component table from PLAN.md]

For each component, estimate:
- How many hours it will take me as a beginner
- What the most common failure point is
- Whether I should build it in Week 1 or Week 2

Then tell me honestly: is my tier realistic for my available time?
```

**What you are learning:** Honest scope estimation is a professional skill. AI can help you calibrate expectations before you commit. If the estimate says your plan needs 40 hours and you have 15, you know to descope now rather than panic later. This is constraint-based planning -- the same pattern your AI Employee uses when it evaluates task feasibility.
