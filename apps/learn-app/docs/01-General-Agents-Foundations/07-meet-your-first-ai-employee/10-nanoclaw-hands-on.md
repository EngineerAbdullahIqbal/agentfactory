---
sidebar_position: 10
title: "NanoClaw Hands-On Setup"
chapter: 7
lesson: 10
duration_minutes: 40
description: "Install NanoClaw, connect WhatsApp, run the same tasks from Lesson 3, and discover what changes when your AI Employee runs inside container isolation"
keywords:
  [
    "NanoClaw",
    "NanoClaw setup",
    "Docker",
    "container isolation",
    "Claude Code",
    "WhatsApp AI agent",
    "platform comparison",
    "Agent Skills",
    "MCP servers",
    "Intelligence Layer",
    "vertical AI employee",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Container-Based Agent Setup"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can install Docker, clone NanoClaw, run the /setup command, and verify the agent is running inside a container with docker ps"

  - name: "Platform Comparison Analysis"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Critical Thinking"
    measurable_at_this_level: "Student can compare their OpenClaw and NanoClaw experience across setup time, security model, codebase size, and use case fit, and articulate which platform fits their needs"

  - name: "Intelligence Layer Design"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can design a Layer 3 (Intelligence) for their profession by listing Agent Skills (domain knowledge) and MCP servers (domain tools) with concrete justifications"

  - name: "Container Isolation Verification"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can explain that containers isolate each agent task and demonstrate this by running docker ps and describing what the container boundary means for data security"

learning_objectives:
  - objective: "Install NanoClaw using Docker and Claude Code, and verify the setup by connecting WhatsApp"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student has NanoClaw running, WhatsApp connected, and can send a message that receives a response"

  - objective: "Execute the same research and file creation tasks from Lesson 3 on NanoClaw and compare outputs with their OpenClaw experience"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student completes at least one research task and one file creation task on NanoClaw and can name two differences from their OpenClaw experience"

  - objective: "Explain how container isolation separates NanoClaw's security model from OpenClaw's shared-process model"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe what docker ps shows, what stays inside the container, and why this matters for sensitive data"

  - objective: "Design the Intelligence Layer for a profession by listing Agent Skills and MCP servers with justifications"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Student produces a written Layer 3 design with at least 3 Agent Skills and 3 MCP servers for a profession they know, with explanations of what each encodes"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Docker pre-flight check and installation"
    - "NanoClaw clone-and-setup workflow (git clone, claude, /setup)"
    - "WhatsApp connection on NanoClaw (same pattern, different body)"
    - "Container isolation in practice (docker ps, what stays inside)"
    - "35K token advantage (Claude Code loading the entire NanoClaw codebase)"
  assessment: "5 concepts at A2 level, within the 5-7 budget for beginners. Every concept connects to prior experience: WhatsApp setup (L02), task delegation (L03), container isolation and Body+Brain architecture (L09). No concept arrives cold."

differentiation:
  extension_for_advanced: "After completing the Layer 3 design, implement one Agent Skill as a SKILL.md file and test it inside NanoClaw. Compare how the skill behaves in NanoClaw vs Claude Code."
  remedial_for_struggling: "Focus on the installation and WhatsApp connection only. Skip the comparison tasks and container walkthrough. Run one simple task (ask NanoClaw to introduce itself) and confirm it works. Return to the comparison after gaining confidence."

teaching_guide:
  lesson_type: "hands-on"
  session_group: 7
  session_title: "NanoClaw -- The Other Way"
  key_points:
    - "NanoClaw defaults to Docker -- this is the path students should follow regardless of macOS Apple Containers support"
    - "The entire setup is under 5 minutes (git clone, cd, claude, /setup) -- this speed demonstrates the 'agents building agents' pattern from L09"
    - "Running the SAME tasks from L03 on a different platform is the most powerful comparison tool: same input, different architecture, students see the differences firsthand"
    - "The Layer 3 design exercise is NOT optional -- it is the capstone of the entire chapter, where students apply everything they learned to their own profession"
  misconceptions:
    - "Students think they need to choose NanoClaw OR OpenClaw -- both can coexist; this is about understanding architectural tradeoffs, not switching platforms"
    - "Students assume Docker is complicated -- the NanoClaw /setup command handles everything; they just need Docker installed and running"
    - "Students on Windows expect NanoClaw to work -- it does not support Windows; they should use a Linux VM or WSL2 if they want to try it"
    - "Students think the 35K token advantage means NanoClaw is 'better' -- it means Claude Code can understand the ENTIRE codebase, which enables the agents-building-agents pattern; OpenClaw's larger codebase has different advantages (features, community, ecosystem)"
  discussion_prompts:
    - "You ran the same research task on both platforms. What felt different? What felt the same? What does that tell you about the universal patterns from L04?"
    - "If you were building an AI Employee for a hospital, which architecture would you choose and why? What about for a startup with no sensitive data?"
    - "NanoClaw's core is ~500 lines. OpenClaw is 430,000+. What are the tradeoffs of each approach for a solo developer vs a large team?"
  teaching_tips:
    - "Have students run docker --version BEFORE class starts to catch installation issues early"
    - "Demo the setup live -- the speed (under 5 minutes) is itself a teaching moment about what agents building agents looks like"
    - "For the comparison tasks, have students open their L03 artifacts (competitors.md, weekly-goals.md) side by side with NanoClaw's output"
    - "The Layer 3 design exercise works best as a group activity -- students from different professions can compare their designs and see the Agent Factory pattern"
  assessment_quick_check:
    - "Show me your docker ps output with NanoClaw running"
    - "Name two differences you noticed between running the same task on OpenClaw vs NanoClaw"
    - "In your Layer 3 design, what is the difference between an Agent Skill and an MCP server? Give one example of each from your profession"
---

# NanoClaw Hands-On Setup

In Lesson 9, you explored NanoClaw's architecture on paper -- the Body + Brain separation, container isolation, the six-layer reference architecture, and why Layer 3 is the only portable investment. Theory is useful. But you have been using OpenClaw hands-on since Lesson 2, and reading about a different architecture is not the same as touching it. The only way to form a real opinion is to run the same tasks on both platforms and compare what you experience.

That is what this lesson delivers. In the next 40 minutes, you will install NanoClaw, connect WhatsApp, run the same research and file creation tasks from Lesson 3, walk through container isolation in practice, and design the Intelligence Layer for your own profession. You walk away with NanoClaw running on your machine and a written Layer 3 design you can build on for the rest of this book.

:::warning macOS and Linux Only
NanoClaw does not support Windows. If you are on Windows, you have two options: use WSL2 (Windows Subsystem for Linux) to run NanoClaw inside a Linux environment, or follow along by reading the outputs while your classmates run the commands. The concepts -- container isolation, platform comparison, Layer 3 design -- apply regardless of which OS you use.
:::

---

## Docker Pre-Flight

NanoClaw runs agents inside Docker containers. Before installing NanoClaw, confirm Docker is installed and running.

```bash
docker --version
```

**Output:**

```
Docker version 28.1.1, build 4eba377
```

If you see `command not found` or a version error, install Docker first:

- **macOS**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) and run the installer. Open Docker Desktop once to start the daemon.
- **Linux**: Follow the official install guide at [docs.docker.com/engine/install](https://docs.docker.com/engine/install/) for your distribution. Then run `sudo systemctl start docker`.

Verify Docker is running (not just installed):

```bash
docker ps
```

**Output:**

```
CONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES
```

An empty table is correct -- it means Docker is running with no containers yet. If you see `Cannot connect to the Docker daemon`, open Docker Desktop (macOS) or start the service (`sudo systemctl start docker` on Linux).

:::tip NanoClaw Defaults to Docker
NanoClaw supports Apple Containers on macOS, but Docker is the default and recommended path. Stick with Docker for this lesson -- it works the same on macOS and Linux, and the commands match what you will see in documentation and community discussions.
:::

---

## Install NanoClaw

Three commands. Under five minutes.

```bash
git clone https://github.com/gavrielc/nanoclaw.git
cd nanoclaw
claude
```

That last command opens Claude Code inside the NanoClaw directory. Claude Code reads the entire codebase -- all ~500 lines of it. This is the 35K token advantage from Lesson 9: Claude Code can load the complete NanoClaw project into its context window, understand every file, and configure the system without you editing a single configuration file.

Now run the setup command:

```
/setup
```

Claude Code handles everything: installing dependencies, configuring the WhatsApp connection, setting up Docker containers, and starting the service. Watch what happens -- you are seeing the "agents building agents" pattern from Lesson 9 in action. Claude Code is reading the codebase it can fully understand, following the setup skill instructions, and configuring the system.

**Output:**

When setup completes, you see a QR code for WhatsApp authentication and a confirmation that NanoClaw is running.

:::tip If /setup Asks Questions
Answer based on your preferences. For first-time setup, accept the defaults. If it asks about container runtime, choose Docker.
:::

---

## Connect WhatsApp

The WhatsApp connection follows the same pattern as Lesson 2 -- a QR code scan:

1. Open **WhatsApp** on your phone
2. Go to **Settings** > **Linked Devices** > **Link a Device**
3. Scan the QR code displayed in your terminal

The terminal confirms the connection. You now have a second AI Employee running on a different architecture, reachable from the same phone.

:::caution Separate WhatsApp Number
If you connected your primary WhatsApp number to OpenClaw in Lesson 2, you will need a different number for NanoClaw -- WhatsApp allows only one linked device per external service. Use a second phone number, or disconnect OpenClaw first (`openclaw channels logout --channel whatsapp`) and reconnect to NanoClaw.
:::

---

## Run the Same Tasks

Open WhatsApp and send NanoClaw the same tasks you ran on OpenClaw in Lesson 3. Running identical tasks on a different platform is the fastest way to understand architectural differences.

### Task 1: Research

```
Research the top 3 competitors in [your industry]. Create a comparison
table with pricing, features, and target market for each.
```

Use the same industry you used in Lesson 3. When the output arrives, compare it with the `competitors.md` file your OpenClaw employee created six weeks ago. Notice what is similar (the structure, the agent loop phases) and what differs (response time, tool access patterns, output format).

### Task 2: File Creation

```
Create a file called nanoclaw-test.md with 5 professional goals
for this week, formatted as a markdown checklist.
```

The agent creates the file -- but where? Inside the container. This is the first concrete difference: NanoClaw's files live inside isolated containers, not on your shared filesystem. Ask the agent:

```
Where did you save that file? Show me the full path.
```

The path is inside the container's filesystem. In OpenClaw, files lived on your machine's filesystem alongside everything else. In NanoClaw, each task gets its own isolated space.

---

## See Container Isolation in Practice

Open a new terminal (keep the NanoClaw session running) and check what Docker is doing:

```bash
docker ps
```

**Output:**

```
CONTAINER ID   IMAGE          COMMAND   CREATED        STATUS        NAMES
a1b2c3d4e5f6   nanoclaw:dev   ...       2 minutes ago  Up 2 minutes  nanoclaw-agent-...
```

You see NanoClaw's container running. Each agent task executes inside this boundary. What happens in the container stays in the container:

- Files created inside the container do not appear on your host filesystem unless explicitly mounted
- If the agent processes sensitive data (financial records, medical documents), that data never touches your host system
- When the container is destroyed, all temporary data inside it disappears

This is the architectural inversion from Lesson 9 in practice: **nothing accessible unless explicitly granted**, compared to OpenClaw's **everything accessible unless explicitly restricted**.

Run a quick demonstration:

```bash
# See what is running inside the container
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"
```

**Output:**

```
NAMES                    STATUS         IMAGE
nanoclaw-agent-abc123    Up 3 minutes   nanoclaw:dev
```

One container, one agent session, one isolated boundary. When you ran the research task, the web search, the file creation, and the analysis all happened inside this container. Your host system only received the final response on WhatsApp.

---

## The 35K Token Advantage

Remember from Lesson 9: NanoClaw's core is ~500 lines. Claude Code can load the entire codebase into its context window -- roughly 35,000 tokens including documentation and configuration.

Ask your NanoClaw employee:

```
How many files are in your codebase? Can you list all of them
with a one-line description of what each does?
```

NanoClaw responds with a complete map of its own source code. Every file, every purpose, fully understood. Now think about OpenClaw's 430,000+ lines across 52+ modules. No single Claude Code session can hold all of that in context. This is not a judgment of quality -- it is an architectural fact with practical consequences:

- **NanoClaw**: Claude Code understands the entire system. The `/setup` command works because Claude Code can read every file and follow every dependency.
- **OpenClaw**: Claude Code can work with individual modules, but cannot hold the full picture. Extensions require understanding specific subsystems, not the whole.

Both approaches have tradeoffs. OpenClaw's size brings features, community, and ecosystem. NanoClaw's size brings auditability, comprehensibility, and the agents-building-agents pattern.

---

## Platform Comparison

You have now used both platforms hands-on. Fill in this comparison from your own experience:

| Dimension                                 | OpenClaw (Your L02-L08 Experience) | NanoClaw (Today)               |
| ----------------------------------------- | ---------------------------------- | ------------------------------ |
| **Setup time**                            | ~30-45 min (L02)                   | ~5 min                         |
| **Setup method**                          | Install script + wizard            | git clone + Claude Code /setup |
| **WhatsApp connection**                   | QR code scan                       | QR code scan                   |
| **Where files live**                      | Your filesystem (shared)           | Inside container (isolated)    |
| **Security default**                      | Everything accessible              | Nothing accessible             |
| **Codebase size**                         | 430,000+ lines                     | ~500 lines                     |
| **Can Claude Code read the whole thing?** | No                                 | Yes                            |
| **Community and ecosystem**               | 209,000+ stars, ClawHub            | Small, growing                 |
| **Your research task quality**            | [Your assessment]                  | [Your assessment]              |
| **Your file creation experience**         | [Your assessment]                  | [Your assessment]              |

The last two rows are yours to fill in. Neither platform is universally better -- they serve different stages of business maturity:

| Stage                      | Best Fit              | Why                                                                                                |
| -------------------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| **Personal productivity**  | OpenClaw              | Rich features, huge ecosystem, fastest path to a working AI Employee                               |
| **SMB / team deployment**  | OpenClaw              | Community skills, Google Workspace integration, compound workflows                                 |
| **Regulated / enterprise** | NanoClaw architecture | Container isolation, full auditability, Programmatic Tool Calling keeps sensitive data in-boundary |

OpenClaw gets you from zero to business value in an afternoon. NanoClaw's architecture is what you need when that business handles client data you cannot afford to leak. Most of you will start with OpenClaw and grow into NanoClaw's model as the stakes increase -- and because Layer 3 (your skills and MCP servers) is portable, that transition preserves everything you built.

---

## Design Your Intelligence Layer

This is the capstone exercise for the entire chapter. In Lesson 9, you saw the six-layer reference architecture and learned that Layer 3 (Intelligence) is the only fully platform-independent layer. Now design one.

**Choose a profession you know well** -- your own, or one you are deeply familiar with. Then complete this design:

### Layer 3 Design Template

**Profession**: ******\_\_\_******

**Agent Skills (Domain Knowledge -- How to Think)**:

| Skill Name | What Domain Rules It Encodes | Why an AI Employee Needs This |
| ---------- | ---------------------------- | ----------------------------- |
| 1.         |                              |                               |
| 2.         |                              |                               |
| 3.         |                              |                               |

**MCP Servers (Domain Tools -- How to Act)**:

| Server Name | What System It Connects To | What Actions It Enables |
| ----------- | -------------------------- | ----------------------- |
| 1.          |                            |                         |
| 2.          |                            |                         |
| 3.          |                            |                         |

**Container Isolation Requirements**:

- What data must NEVER leave the container boundary? ******\_\_\_******
- Why? (Regulation, privacy, competitive sensitivity) ******\_\_\_******

This exercise is not optional. It is where everything in Chapter 7 comes together: the universal patterns from Lesson 4, the skills from Lesson 5, the security realities from Lesson 5, the Body + Brain architecture from Lesson 9, and the portability standards you just experienced. Your Layer 3 design is the first step toward building an AI Employee for your profession -- and because Skills and MCP are open standards, this design works on any platform.

---

## Try With AI

### Prompt 1: Compare Your Experiences

**Setup:** Use Claude Code or any AI assistant.

```
I just set up both OpenClaw and NanoClaw and ran the same research
task on each. Here are my observations: [paste your comparison table
from above]. Based on my experience, which platform fits better for
someone in [YOUR PROFESSION]? Consider data sensitivity, setup
complexity, feature needs, and community support.
```

**What you're learning:** Platform evaluation as a professional skill. Instead of reading comparison articles, you are generating your own evaluation from hands-on data. The AI helps you weigh tradeoffs you may not have considered, but the experience data is yours.

### Prompt 2: Strengthen Your Layer 3 Design

**Setup:** Use Claude Code or any AI assistant.

```
Here is my Layer 3 (Intelligence) design for a [YOUR PROFESSION]
AI Employee: [paste your design table]. Review it and suggest:
(1) any critical Agent Skills I missed, (2) any MCP servers that
would be high-value additions, and (3) which skill I should build
first and why.
```

**What you're learning:** Iterative design with AI feedback. Your first draft captures your domain expertise. The AI suggests patterns from other domains you may not have considered. Together you converge on a stronger design -- the same bidirectional learning pattern you have been practicing since Lesson 3.

### Prompt 3: Container Boundary Analysis

**Setup:** Use Claude Code or any AI assistant.

```
For a [YOUR PROFESSION] AI Employee, analyze the data flows in
my Layer 3 design: [paste your MCP servers]. For each MCP server,
classify the data it handles as (a) safe to leave the container,
(b) must stay inside the container, or (c) requires encryption
before leaving. Explain each classification.
```

**What you're learning:** Security architecture thinking applied to your own domain. The container boundary is not academic -- it determines whether your AI Employee can legally operate in regulated environments. By classifying your own data flows, you build the instinct to think about data sensitivity before you build, not after a breach.

## Flashcards Study Aid

<Flashcards />
