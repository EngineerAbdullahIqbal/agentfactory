---
sidebar_position: 8
title: "What People Are Building"
description: "See how the patterns from this chapter compose into real-world compound workflows, map each use case back to specific building blocks, and honestly assess what remains unsolved"
keywords:
  [
    use cases,
    composability,
    compound workflows,
    CRM,
    knowledge base,
    advisory council,
    agent patterns,
    cron jobs,
    heartbeat,
    agent scheduling,
    autonomous automation,
    HEARTBEAT.md,
  ]
chapter: 7
lesson: 8
duration_minutes: 15

# HIDDEN SKILLS METADATA
skills:
  - name: "Pattern Composability"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can decompose a compound AI Employee workflow into its constituent patterns (skills, scheduling, memory, delegation, integration) and map each to the chapter concept that enables it"

  - name: "Use Case Evaluation"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Critical Thinking"
    measurable_at_this_level: "Student can assess a proposed AI Employee use case for feasibility, identify which building blocks it requires, and name the security/reliability risks"

  - name: "Scheduling Mechanism Selection"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can explain the difference between heartbeat and cron scheduling, identify when each is appropriate, and configure a basic cron job or heartbeat checklist"

learning_objectives:
  - objective: "Decompose compound AI Employee workflows into constituent patterns learned in L03-L07"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Given a use case description, student identifies which chapter concepts (skills, scheduling, memory, delegation, integration) it combines"

  - objective: "Evaluate the feasibility and risks of a proposed AI Employee use case"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student assesses a hypothetical use case, identifying required building blocks, security concerns, and reliability challenges"

  - objective: "Articulate what OpenClaw proved about AI Employees and what hard problems remain unsolved"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student can name at least 3 validated capabilities and 3 unsolved challenges with specific examples"

  - objective: "Explain the difference between heartbeat and cron scheduling and choose the right mechanism for a given automation scenario"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Given three scheduling scenarios, student correctly identifies whether each requires heartbeat, cron (main), or cron (isolated) and explains why"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Pattern composability (combining building blocks into compound workflows)"
    - "Use case decomposition (reverse-engineering workflows into constituent patterns)"
    - "Compound risk (security/reliability concerns multiply with each integration added)"
    - "The generalization gap (personal setups vs reproducible systems)"
  assessment: "4 concepts at B1 Analyze/Evaluate — within 7-10 limit. All concepts build on patterns already learned; no new technical content introduced."

differentiation:
  extension_for_advanced: "Design a complete compound workflow for your domain with a composability diagram, security audit, and cost estimate"
  remedial_for_struggling: "Focus on the Composability Map table. For each use case, just identify which 2-3 lessons from the chapter it draws from"

teaching_guide:
  lesson_type: "supplementary"
  session_group: 4
  session_title: "Composability and Honest Assessment"
  key_points:
    - "Every real-world AI Employee workflow is a composition of 4-5 patterns students already learned — this lesson proves the building blocks are sufficient, not just educational exercises"
    - "The 'Hard Part' section of each use case is the most valuable content — it names specific unsolved problems (memory coherence, hallucinated analysis, relevance decay) that separate demos from production"
    - "Compound risk is multiplicative, not additive — a 5-step pipeline with 99% reliability per step delivers correct results only 95% of the time"
    - "The generalization gap (works for me vs works for others) explains why most AI Employee projects remain single-user experiments — this is the core challenge for the Agent Factory thesis"
  misconceptions:
    - "Students think combining more patterns always means a better system — each additional integration multiplies security attack surface and failure points"
    - "Students assume the 'Hard Part' sections describe future problems — these are current, documented challenges that anyone building compound workflows encounters immediately"
    - "Students think the cross-framework pattern map means all frameworks are equivalent — the patterns are universal but implementations vary significantly in maturity, security, and reliability"
    - "Students treat the use case categories as recipes to follow — they are examples of composability thinking, not blueprints; the student's own domain will have different requirements"
  discussion_prompts:
    - "Pick one of the five use case categories and identify which 'Hard Part' would stop you from deploying it for real. What would need to change?"
    - "The lesson says compound risk is multiplicative. If you have a 5-step pipeline and each step is 99% reliable, why is the whole system only 95% reliable? What does this imply for the advisory council use case with 4 specialist agents?"
    - "The 'Your Own' column in the cross-framework table is intentionally blank. If you were filling it in today, which pattern would you implement first and which would you borrow from an existing framework?"
  teaching_tips:
    - "Use the Composability Map table as a group exercise: give each table group a different use case and have them identify the building blocks, then present to the class"
    - "The 'Hard Part' discussions are the most important teaching moments — resist the urge to rush past them toward the exciting use cases"
    - "Have students calculate the compound reliability math themselves: 0.99^5 = 0.95, 0.99^10 = 0.90 — this makes the abstract 'reliability multiplies' concrete and memorable"
    - "End the lesson by asking each student to name ONE compound workflow they would build for their domain and ONE unsolved challenge that would block them — this bridges to Lesson 9's Agent Factory vision"
  assessment_quick_check:
    - "Give students a use case description and ask them to map it to specific chapter lessons (L03-L07)"
    - "Ask: Name two unsolved challenges in compound AI Employee workflows and explain why each is hard"
    - "Ask students to explain the generalization gap in one sentence — why does 'it works for me' not mean 'it works for everyone'?"
---

# What People Are Building

In Lesson 7, your employee read your real email, checked your actual calendar, and searched your Drive. That was powerful -- but it used one pattern at a time. A single integration, a single task, a single response. Now consider what happens when someone combines ALL the capabilities from this chapter into compound workflows.

Every use case in the wild is a composition of four or five patterns you already learned. The personal CRM that auto-extracts action items from your inbox? That is integrations (Lesson 7) plus memory (Lesson 4) plus scheduling (Lesson 3) plus skills (Lesson 5). The advisory council that analyzes your business from multiple expert perspectives? That is delegation (Lesson 6) plus skills (Lesson 5) plus scheduling (Lesson 3). The building blocks are the same. The combinations create the explosion of what is possible.

This lesson maps real workflows back to those building blocks, then honestly names what remains unsolved. Because the hard problems -- security, reliability, cost, generalizability -- are what separate the builders from the tinkerers.

## The Composability Map

Each lesson in this chapter gave you one pattern. Here is what happens when you layer them:

| Pattern Combination                                | What It Creates              | Example                                                                                                                                      |
| -------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Skills (L05) + Scheduling (L03)                    | Autonomous routines          | Nightly code review that runs at 2 AM and reports results by morning                                                                         |
| Integrations (L07) + Memory (L04)                  | Context-aware automation     | Agent that remembers your email preferences and auto-sorts new messages by learned priority                                                  |
| Delegation (L06) + Skills (L05)                    | Multi-agent workflows        | Research task where employee delegates to specialist agents for competitive analysis, then synthesizes                                       |
| Scheduling (L03) + Delegation (L06) + Skills (L05) | Orchestrated operations      | Daily pipeline: monitor competitors, analyze changes, generate briefing, deliver before standup                                              |
| All five combined                                  | Compound AI Employee systems | Full personal productivity system: reads email, manages calendar, searches files, delegates research, remembers everything, runs on schedule |

The compound case is not five times harder than the single case. It is five times more capable -- and five times more dangerous if any component fails. That tension defines everything below.

## Five Use Case Categories

### Personal Productivity (CRM)

A personal CRM that ingests Gmail, Calendar, and meeting transcripts. It auto-extracts action items from every email and meeting, tracks follow-up commitments, and reminds you before deadlines slip. Over weeks, it builds a relationship graph: who you talk to, what you discussed, what you owe them.

**Chapter 7 Building Blocks:** L07 integrations (Gmail, Calendar, Drive access) + L03 scheduling (daily inbox scan, weekly relationship digest) + L04 memory (contact history, conversation context) + L05 skills (action item extraction, priority scoring)

**The Hard Part:** Memory coherence. After three months and 2,000 emails, your agent's context about each contact grows stale, contradictory, or bloated. The person who changed roles, the project that was cancelled, the priority that shifted -- your agent does not know unless you tell it. Maintaining accurate long-term memory at scale is an unsolved problem in every agent framework.

### Knowledge Management

Drop a link -- article, video, tweet thread -- and the AI Employee ingests it into a searchable knowledge base. It extracts key arguments, tags topics, generates summaries, and connects new content to what you saved before. Ask a question months later, and the agent retrieves relevant sources with context.

**Chapter 7 Building Blocks:** L05 skills (content extraction, summarization, tagging) + L04 memory (vector storage, retrieval) + L06 delegation (multi-source ingestion where specialist agents handle different content types)

**The Hard Part:** Two problems compound. First, vector database costs grow linearly with content volume -- storing and searching thousands of documents at useful quality is not free. Second, knowledge goes stale. The article you saved six months ago may be outdated, but your agent retrieves it with the same confidence as yesterday's. No agent framework has solved relevance decay at scale.

### Business Intelligence

A council of expert agents analyzing your competitive landscape from multiple angles: one tracks competitor pricing, another monitors industry reports, a third analyzes your internal metrics. An orchestrator synthesizes their findings into ranked recommendations delivered before your Monday meeting.

**Chapter 7 Building Blocks:** L06 delegation (parallel expert agents, orchestrator synthesis) + L03 scheduling (weekly analysis cycle) + L05 skills (competitor tracking, financial analysis, report generation)

**The Hard Part:** Hallucinated analysis that sounds confident. When one expert agent fabricates a competitor's pricing change or invents a market trend, the orchestrator weaves that fabrication into its synthesis without question. The final report reads beautifully -- and contains claims no one verified. No agent framework has solved factual grounding at scale. The more agents in the chain, the more opportunities for confident fiction.

### Security and Operations

Four specialist agents conduct nightly code reviews from different security perspectives: one checks for dependency vulnerabilities, another scans for credential exposure, a third validates access controls, a fourth tests error handling. Results compile into a morning security briefing. Encrypted backups run on schedule. Dependency updates happen automatically when safe.

**Chapter 7 Building Blocks:** L03 scheduling (nightly execution, morning delivery) + L06 delegation (four specialist agents working in parallel) + L05 skills (vulnerability scanning, credential detection, compliance checking)

**The Hard Part:** A security agent with code access IS an attack vector. The agent guarding the castle also has the keys to the castle. If a malicious skill compromises one of the four specialists (remember ClawHavoc from Lesson 5), it now has the access needed to read your codebase, exfiltrate secrets, or modify security configurations. The lethal trifecta from Lesson 5 compounds with every agent you add to the system.

### Personal Health

A food journal with image recognition. Photograph your meals and your agent logs nutritional estimates, tracks patterns across weeks, correlates food choices with energy levels and symptoms you report. Over months, it identifies patterns you would never notice yourself.

**Chapter 7 Building Blocks:** L04 memory (meal history, symptom logs, pattern storage) + L05 skills (image analysis, nutritional estimation, correlation detection)

**The Hard Part:** Medical-adjacent AI advice and liability. Your agent might identify a correlation between dairy intake and your afternoon headaches. That observation could be genuinely useful -- or it could be a spurious pattern from noisy data that leads you to make dietary changes you should discuss with a doctor. No skill can replace professional medical judgment, and no agent framework includes liability safeguards for health recommendations.

## How Scheduling Actually Works: Cron vs Heartbeat

Every compound workflow above references "scheduling" as a building block. The composability map treats it as a single pattern, but OpenClaw actually provides two distinct scheduling mechanisms -- and choosing the wrong one creates either wasted cost or missed timing.

### Heartbeat: Your Employee's Pulse

A heartbeat is a periodic check-in that runs in your employee's main session. Every 30 minutes (by default), your employee wakes up, reviews a checklist, and decides whether anything needs your attention.

You define the checklist in a `HEARTBEAT.md` file:

```md
# Heartbeat checklist

- Check email for urgent messages
- Review calendar for events in next 2 hours
- If a background task finished, summarize results
- If idle for 8+ hours, send a brief check-in
```

Your employee reads this checklist every cycle, processes each item, and only surfaces what matters. If nothing is urgent, it stays quiet -- no notification, no interruption. The heartbeat runs in the main session, which means your employee has full context from your recent conversations when deciding what to report.

The heartbeat runs every 30 minutes by default, but the checklist starts empty -- so your employee wakes up, finds nothing to do, and goes back to sleep. The real setup is giving it a checklist. Ask your employee:

```
What is my current heartbeat interval? And show me what's in HEARTBEAT.md.
```

It will confirm the 30-minute default and show an empty (or comment-only) checklist. Now give it work:

```
Add these to my heartbeat checklist: remind me of my goals, check email for urgent messages,
review calendar for events in the next 2 hours, and if a background
task finished, summarize results.
```

Your employee updates `HEARTBEAT.md` directly. Next cycle, it processes each item and only surfaces what matters. If nothing is urgent, it stays quiet -- no notification, no interruption.

:::note[Who Configures What?]
Heartbeat **timing** (how often, active hours) is operator-side configuration. The heartbeat **checklist** (`HEARTBEAT.md`) is a workspace file your employee reads and edits through conversation.

Cron is different: your employee has access to the `cron.*` tools and can create, update, and remove cron jobs through conversation. "Remind me in 20 minutes" works -- the employee calls the cron tool API to schedule it.
:::

To change the timing or active hours, ask your employee or use the CLI:

```bash
openclaw config set agents.defaults.heartbeat.every "15m"
openclaw config set agents.defaults.heartbeat.activeHours.start "08:00"
openclaw config set agents.defaults.heartbeat.activeHours.end "22:00"
openclaw gateway stop && openclaw gateway start
```

The `activeHours` setting prevents middle-of-the-night notifications. The timing is approximate -- heartbeats are queue-based, so a "30m" heartbeat might fire at 28 or 33 minutes. That flexibility is intentional: batching multiple checks into one turn is cheaper than running each separately.

### Cron: Precise, Independent Jobs

Cron jobs fire at exact times and can run in isolated sessions -- completely independent of your main conversation. Unlike heartbeat timing, your employee can create cron jobs itself through conversation -- it has access to the Gateway's `cron.*` tools (add, update, remove, run).

#### Delivery Mode Matters

Every cron job has a **delivery mode** that controls what happens with the output:

| Mode       | What Happens                                                                          |
| ---------- | ------------------------------------------------------------------------------------- |
| `none`     | Runs silently. Output only in the job log. No outbound message.                       |
| `announce` | Sends the output as a visible message to your channel. **Default for isolated jobs.** |
| `webhook`  | POSTs the output to an HTTP endpoint                                                  |

Isolated jobs (`--session isolated`) default to `announce` delivery. But when your employee creates a cron job through conversation without specifying delivery, the result depends on how it configures the job. If the job ends up as a main-session system event instead of an isolated job, there is no delivery at all -- main-session jobs cannot use announce.

:::warning[The Silent Reminder Trap]
If you ask your employee "remind me in 20 minutes" and it creates the job as a main-session event (not an isolated job), the job **runs** but you **never see the reminder**. The job log shows `deliveryStatus: not-requested` and you wonder why your employee never came back. Always be explicit: "remind me in 20 minutes **and send me the message**" -- this helps the employee create an isolated job with announce delivery instead of a silent main-session event.
:::

**Through conversation**: Tell your employee "remind me in 20 minutes to check on the deployment **and send me the reminder**." The explicit "send me" phrasing helps the employee set delivery mode to `announce`. For recurring jobs: "set up a daily briefing at 7 AM and announce it to this channel." Both methods write to the same persistent store (`~/.openclaw/cron/jobs.json`).

If the employee confirms "reminder is scheduled" but you do not get a message when it fires, check the delivery mode. Ask your employee: "show me the delivery config for that cron job."

**Through operator CLI**: You can also create jobs directly from your terminal:

```bash
openclaw cron add \
  --name "Morning briefing" \
  --cron "0 7 * * *" \
  --session isolated \
  --announce
```

The `--announce` flag is what makes the output visible. Without it, the job runs but you see nothing. The isolated session starts clean -- no conversation history from your main session -- which means the job produces the same output regardless of what you and your employee discussed yesterday.

:::info[Announce requires isolated sessions]
Announce delivery only works with `--session isolated`. A main-session cron job cannot route output to your channel -- it just enqueues a system event for the next heartbeat. If you need the output pushed to you, use an isolated session.
:::

For a one-shot reminder via CLI:

```bash
openclaw cron add \
  --at "20m" \
  --session isolated \
  --announce \
  --message "Time to check on the deployment" \
  --delete-after-run
```

This fires once in 20 minutes, sends you the reminder, and deletes itself. The `--delete-after-run` flag prevents forgotten one-shot reminders from cluttering your job list.

### When to Use Which

| Scenario                                  | Use                       | Why                                                                         |
| ----------------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| Check inbox + calendar + notifications    | **Heartbeat**             | Multiple routine checks batch into one turn, saving cost                    |
| 9 AM sharp daily briefing                 | **Cron (isolated)**       | Exact timing required; standalone work that should not clutter main history |
| Reminder in 20 minutes                    | **Cron (main, one-shot)** | `--at "20m"` with `--delete-after-run` is built for this                    |
| Nightly code review with different model  | **Cron (isolated)**       | `--model` flag lets you pick a cheaper model for batch work                 |
| Context-aware priority triage             | **Heartbeat**             | Needs recent conversation context to decide what is urgent                  |
| Hourly metric check that is usually quiet | **Heartbeat**             | Suppresses output when nothing is notable; cron would notify every time     |

### The Cost Dimension

Heartbeat costs one LLM turn per interval regardless of how many items it checks. A heartbeat with five checklist items costs the same as one with two -- batching is free.

Cron (isolated) costs a full agent turn per job. Five isolated cron jobs at 9 AM means five separate LLM turns. But isolated jobs can use cheaper models: `--model sonnet` for a summarization job instead of the default model cuts cost without affecting your main session's capabilities.

The optimal setup combines both: heartbeat for routine batched monitoring, cron for precise-timing requirements or jobs that benefit from isolation and dedicated model selection.

---

## What Remains Unsolved

The use cases above are real -- people are building every one of them. But the honest assessment matters more than the excitement.

| Challenge                               | Why It Is Hard                                                                                                                                                                   | What Compounds It                                                                                                                          |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Security at scale**                   | The lethal trifecta from L05 (private data + untrusted content + external communication) multiplies with every integration                                                       | Adding Gmail access + Drive access + code execution means one compromised skill can read your email AND modify your code                   |
| **Reliability of autonomous workflows** | One failed API call at 3 AM cascades silently. Your morning briefing is empty, but you do not know why until you check                                                           | Compound workflows have more failure points. A 5-step pipeline with 99% reliability per step delivers correct results only 95% of the time |
| **Cost management**                     | API calls at scale add up. A chatty agent processing 500 emails daily, searching Drive, and running 4 specialist agents can accumulate significant costs without budget controls | No mainstream agent framework ships with spending limits or cost-per-workflow monitoring built in                                          |
| **The "it works for me" problem**       | Your personal workflow runs on YOUR email patterns, YOUR calendar habits, YOUR file naming conventions. Hand that same setup to a colleague and it breaks                        | The generalization gap between personal setups and reproducible systems is why most AI Employee projects remain single-user experiments    |

These are not reasons to avoid building compound workflows. They are the engineering constraints that define the difference between a weekend project and a production system. When you build your own AI Employee from scratch later in this book, you will confront each of these directly.

## The Ecosystem Response

OpenClaw's patterns were so clearly right that other developers saw them and asked: "What if I optimized for MY constraints?"

The result is an ecosystem of implementations, each making different architectural tradeoffs:

| Project      | Language   | Optimization                                            | Threat Model Fit                                         |
| ------------ | ---------- | ------------------------------------------------------- | -------------------------------------------------------- |
| **OpenClaw** | TypeScript | Feature completeness, 30+ channels, massive community   | Internal tools, personal productivity, rapid prototyping |
| **NanoClaw** | TypeScript | Container isolation, ~500 lines, full auditability      | Regulated data (patient records, financial documents)    |
| **nanobot**  | Python     | 4K lines, kernel architecture, readable in an afternoon | Learning agent internals, Python-native teams            |

Other implementations exist in Rust and Go, proving the patterns are language-agnostic. The Body -- runtime, channels, tools -- is table stakes. Different teams build different Bodies because their threat models demand it.

The insight that matters: **the moat is not which Body you choose. It is the Intelligence Layer -- Agent Skills that encode domain knowledge, MCP servers that connect to domain systems.** That layer is portable across every Body in the table above. Your investment in domain expertise survives any platform change.

## What Transfers

These patterns appear in every agent framework, not just OpenClaw. The names change. The architecture does not.

| Chapter 7 Pattern | OpenClaw                         | AutoGPT               | CrewAI                    | Your Own (Later) |
| ----------------- | -------------------------------- | --------------------- | ------------------------- | ---------------- |
| Scheduling (L03)  | Heartbeat + cron (see above)     | Continuous mode loop  | Task scheduling           | Your design      |
| Memory (L04)      | MEMORY.md + conversation history | JSON file persistence | Shared memory object      | Your design      |
| Skills (L05)      | SKILL.md files on ClawHub        | Plugins in registry   | Tool definitions          | Your design      |
| Delegation (L06)  | ACP + Claude Code integration    | Sub-agent spawning    | Agent-to-agent delegation | Your design      |
| Integration (L07) | gog + OAuth connectors           | Plugin API calls      | Tool integrations         | Your design      |

The "Your Own" column is intentionally blank. When you build your own AI Employee, you fill it in -- choosing how to implement each pattern based on what you learned here.

## Try With AI

### Prompt 1: Compound Workflow Design

```
I've learned 5 AI Employee patterns: scheduling (L03), memory (L04),
skills (L05), delegation (L06), and integrations (L07). Help me
design a compound workflow for [MY DOMAIN]. For each pattern I use,
map it back to the specific lesson where I learned it. Then identify
which pattern combination creates the most value.
```

**What you're learning:** Composability thinking -- seeing individual patterns as building blocks rather than standalone features. This is how professional architects think about systems. The ability to decompose a workflow into constituent patterns and evaluate which combination delivers the most value is the core skill for designing your own AI Employee.

### Prompt 2: Security Risk Evaluation

```
Evaluate this AI Employee use case for security risks: [DESCRIBE A
USE CASE]. For each risk, connect it to the lethal trifecta framework
from L05 (network access + code execution + autonomous operation).
Rate feasibility as Bronze/Silver/Gold based on how many security
boundaries I'd need to cross.
```

**What you're learning:** Risk evaluation as a design constraint. Every capability you add to your AI Employee increases attack surface. Learning to evaluate this tradeoff -- capability versus exposure -- is what separates production systems from demos. The lethal trifecta is not abstract when your agent has OAuth access to your Gmail.

### Prompt 3: Council of Experts Design

```
Design a "council of experts" for [BUSINESS PROBLEM] using the
delegation pattern from L06. Define 3-4 expert agents, what each
analyzes, how they communicate findings, and how the orchestrator
synthesizes recommendations. Then identify the single biggest
failure mode.
```

**What you're learning:** Multi-agent orchestration as a design pattern. The delegation pattern from Lesson 6 scales to complex business problems, but coordination failures multiply with each agent added. Designing for failure -- identifying the single biggest thing that can go wrong -- is what makes the difference between a system that works once and a system that works reliably.

You have now seen what OpenClaw proved, what it left unsolved, and how the ecosystem responded. Individual patterns are powerful. Composed patterns are transformative. And choosing the right Body for your threat model is an engineering decision, not a popularity contest.

In the next lesson, you will look closely at NanoClaw -- the implementation optimized for container isolation and regulated data -- and see how it connects to the Agent Factory blueprint for building AI Employees for every profession.

## Flashcards Study Aid

<Flashcards />
