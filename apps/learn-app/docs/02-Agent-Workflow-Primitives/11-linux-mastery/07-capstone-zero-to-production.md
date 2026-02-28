---
sidebar_position: 7
title: "Capstone: Zero to Production"
chapter: 11
lesson: 7
layer: L2
duration_minutes: 45
description: "Deploy a second agent from zero using a deployment spec — turning three days of discovery into thirty minutes of execution"
keywords:
  [
    "deployment",
    "spec",
    "capstone",
    "production",
    "checklist",
    "automation",
    "integration",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Deployment Spec Design"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can write a DEPLOYMENT-SPEC.md that captures all server deployment requirements in a structured format"

  - name: "Full Deployment Integration"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can direct Claude Code through a complete deployment using a spec as the guide"

learning_objectives:
  - objective: "Write a deployment spec that captures all requirements for deploying an agent to a Linux server"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Student produces a DEPLOYMENT-SPEC.md with all six sections and no missing steps"

  - objective: "Execute a complete deployment from zero using a spec as the single source of truth"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student directs Claude Code through all spec sections and verifies each stage before proceeding"

  - objective: "Verify a deployment is production-ready using systematic checks"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student runs the verification checklist and identifies any gaps"

cognitive_load:
  new_concepts: 2
  concepts_list:
    - "Deployment spec as structured checklist (the plan IS the execution guide)"
    - "Integration of all prior skills into a single workflow"
  assessment: "2 concepts — capstone lesson integrates L1-L6 skills rather than introducing new material"

differentiation:
  extension_for_advanced: "Add a rollback section to the deployment spec. What happens if the new agent breaks something? Design an automated rollback procedure."
  remedial_for_struggling: "Focus on the spec structure, not the execution. Being able to WRITE the spec is the key skill — Claude Code handles the execution."

teaching_guide:
  lesson_type: "capstone"
  session_group: 3
  session_title: "Zero to Production Capstone"
  key_points:
    - "The transformation from 3 days to 30 minutes is the lesson's emotional payoff — students should feel the acceleration"
    - "The spec is not documentation — it's the execution guide that Claude Code follows section by section"
    - "Each spec section maps directly to a lesson: this makes the chapter feel cohesive and purposeful"
    - "The verification checklist is the quality gate — students must check every box before considering the deployment done"
  misconceptions:
    - "Students think specs are busywork — the speed comparison (3 days vs 30 minutes) proves their value"
    - "Students think they need to remember all the commands — the spec captures the knowledge so they don't have to"
    - "Students skip verification — 'it started, so it works' is not production-ready"
  discussion_prompts:
    - "What would happen if Ali tried to deploy a third agent without a spec? What mistakes would he repeat?"
    - "How is a deployment spec different from a README? Why do you need both?"
  teaching_tips:
    - "Walk through the spec creation collaboratively — let students suggest what each section should contain"
    - "Time the deployment if possible — the 30-minute mark is powerful when students see it on a clock"
    - "The verification checklist should feel satisfying to complete — each green check means one less thing to worry about at 2 AM"
  assessment_quick_check:
    - "Name the six sections of a deployment spec from memory"
    - "Why does the spec include a verification section? What could go wrong if you skip it?"
    - "What's the relationship between the deployment spec and the systemd unit file?"

generated_by: "content-implementer v2.0.0"
created: "2026-02-28"
version: "1.0.0"
---

# Capstone: Zero to Production

Monday morning. The board meeting went well. Ali's competitor-tracker runs on Dev's server. It survives reboots, restarts after crashes, runs under a dedicated user with locked-down permissions.

Ali's client is impressed. "Can you build a second agent? One that monitors our social media mentions and generates a daily sentiment report?"

Ali says yes. Then he thinks about the last three days. The SSH confusion. The scattered files. The process that died when he closed his laptop. The security scare. The empty report at 2 AM.

Three days of discovery, trial, error, and panic to deploy one agent.

What if he could do it in thirty minutes?

---

## The Insight

Ali learned six things in six lessons:

| Lesson | What he learned |
|--------|----------------|
| L1 | Where things live on a Linux server |
| L2 | How to read what the server tells him |
| L3 | How to organize an agent's files |
| L4 | How to make an agent survive reboots |
| L5 | How to lock down access |
| L6 | How to diagnose failures |

The first time, he learned these through experience — one crisis at a time. The second time, he can write them down as a plan and execute them in order.

> **"The spec is the checklist, the executor, and the auditor. All in one file."**

---

## The Deployment Spec

A deployment spec is not documentation. It's an execution guide. You write it before you start, then feed it to Claude Code section by section. Each section corresponds to a lesson you've already learned.

Here's the spec Ali writes for his second agent — the social media sentiment tracker.

**What you tell Claude Code**: "I'm going to write a deployment spec. Help me create a file called DEPLOYMENT-SPEC.md with the following structure."

```markdown
# DEPLOYMENT-SPEC.md — Social Media Sentiment Tracker

## 1. Server Access
- Target: Dev's server (devs-server.com)
- SSH: Key-based authentication as ali
- Verify: Can connect and run commands

## 2. Directory Structure
- Base: /opt/agents/sentiment-tracker/
- Subdirectories: src/, config/, logs/, data/
- Environment: .env with API keys (Twitter API, OpenAI API)
- Permissions: Owned by agentuser, chmod 750, .env chmod 600

## 3. Application Setup
- Copy source code to src/
- Install dependencies (pip install -r requirements.txt)
- Create .env with required variables:
  - TWITTER_API_KEY
  - TWITTER_API_SECRET
  - OPENAI_API_KEY
  - DB_CONNECTION_STRING
- Test: Run manually once, verify output

## 4. Service Configuration
- Create systemd unit: /etc/systemd/system/sentiment-tracker.service
- User: agentuser
- WorkingDirectory: /opt/agents/sentiment-tracker
- EnvironmentFile: /opt/agents/sentiment-tracker/.env
- Restart: on-failure
- RestartSec: 5
- MemoryMax: 256M
- Enable and start

## 5. Security Checklist
- [ ] Service runs as agentuser, NOT root
- [ ] .env permissions are 600
- [ ] SSH password authentication is disabled
- [ ] No secrets in source code (grep for API_KEY, PASSWORD, SECRET)

## 6. Verification
- [ ] Service status: active (running)
- [ ] Survives terminal closure: close SSH, reconnect, check status
- [ ] Survives reboot: sudo reboot, reconnect, check status
- [ ] Logs are writing: journalctl -u sentiment-tracker --since "5 min ago"
- [ ] Output is correct: check data/latest-report.csv has content
- [ ] Resource usage is reasonable: memory under 256M
```

---

## Executing the Spec

Now Ali feeds the spec to Claude Code, one section at a time. Each section is a conversation.

### Section 1: Server Access

**What you tell Claude Code**: "I need to deploy a new agent to devs-server.com. Verify I can connect via SSH key authentication."

Claude connects, confirms access. One minute.

### Section 2: Directory Structure

**What you tell Claude Code**: "Create the directory structure for a new agent called sentiment-tracker at /opt/agents/sentiment-tracker/ with src, config, logs, and data subdirectories. Set ownership to agentuser and permissions to 750. Create a .env file with these variables: TWITTER_API_KEY, TWITTER_API_SECRET, OPENAI_API_KEY, DB_CONNECTION_STRING."

Claude creates the structure, sets permissions, creates the `.env` template. Three minutes.

### Section 3: Application Setup

**What you tell Claude Code**: "Copy the sentiment tracker source code from my local machine to the server. Install the Python dependencies. Then run the agent manually once to verify it produces output."

Claude transfers files, installs dependencies, runs a test. The agent produces a sentiment report. Five minutes.

### Section 4: Service Configuration

**What you tell Claude Code**: "Create a systemd service for the sentiment-tracker. Use the same pattern as the competitor-tracker — run as agentuser, restart on failure, 256 MB memory limit. Enable it and start it."

Claude creates the unit file, enables the service, starts it. Two minutes.

### Section 5: Security Checklist

**What you tell Claude Code**: "Run a security audit on the sentiment-tracker deployment. Check that it doesn't run as root, the .env has correct permissions, and there are no secrets hardcoded in the source code."

Claude checks each item. Reports all clear. Two minutes.

### Section 6: Verification

**What you tell Claude Code**: "Run the full verification checklist. Check the service is running, check it's writing logs, check the output file has content, and check memory usage."

Claude runs each check, reports results. Two minutes.

---

## The Reveal

Ali looks at the clock. Fifteen minutes from first SSH connection to fully deployed, verified, production-ready agent.

The competitor-tracker took three days. Confusion, trial and error, a 2 AM panic, a security scare, and a methodical debugging session.

The sentiment-tracker took fifteen minutes. Same server. Same complexity. Different approach.

The difference wasn't skill — Ali has the same skill level for both. The difference was **structure**. The deployment spec captured everything he learned and turned scattered knowledge into sequential execution.

Three days of discovery. Fifteen minutes with a spec.

---

## Write Your Own Deployment Spec

The real exercise in this capstone is not following Ali's spec. It's writing your own.

**What you tell Claude Code**: "Help me write a DEPLOYMENT-SPEC.md for deploying [your agent] to a Linux server. Use the six-section structure: Server Access, Directory Structure, Application Setup, Service Configuration, Security Checklist, and Verification."

Replace `[your agent]` with whatever you're building — a web scraper, a data pipeline, a chatbot, a monitoring tool. The structure is the same for any agent.

### The Six Sections (Your Template)

| Section | Question it answers | Lesson it comes from |
|---------|-------------------|---------------------|
| 1. Server Access | How do I get in? | L1 (Where Your Agent Lives) |
| 2. Directory Structure | Where do files go? | L3 (Setting Up Your Agent's Home) |
| 3. Application Setup | How do I install and test? | L2, L3 (Reading Output, Organization) |
| 4. Service Configuration | How does it stay alive? | L4 (Making Your Agent Unkillable) |
| 5. Security Checklist | Is it locked down? | L5 (Locking the Door) |
| 6. Verification | Does it actually work? | L6 (When Things Go Wrong) |

Every lesson in this chapter feeds into one section of the deployment spec. This is why the order mattered. This is why the story followed the sequence it did.

---

## The Verification Habit

The most important section is the last one. Verification is not optional.

Deployed services that aren't verified are time bombs. They appear to work until the moment they don't — usually when a client checks the dashboard, a board meeting starts, or you're asleep.

Build the habit now: **no deployment is done until every verification check passes.**

```
DEPLOYMENT VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━

□ Service status: active (running)
□ Survives terminal closure
□ Survives reboot
□ Logs are writing
□ Output is correct
□ Resource usage is within limits
□ Security checklist passed

ALL BOXES CHECKED → DEPLOYMENT COMPLETE
ANY BOX UNCHECKED → NOT DONE YET
```

---

## Ali's Story: Resolution

Ali has two agents running on Dev's server. The competitor-tracker he deployed over three painful days. The sentiment-tracker he deployed in fifteen minutes. Both run as systemd services under dedicated users with locked-down permissions. Both survive reboots. Both write persistent logs. Both can be diagnosed with the LNPS method.

Ali learned Linux not by memorizing fifty commands. He learned it by solving real problems — one at a time — and capturing the solutions in a spec that makes the next deployment effortless.

---

## Try With AI

### Prompt 1: Add Security Depth

```
My deployment spec has a basic security checklist. Extend it for
an agent that handles financial data — customer payment amounts,
invoice numbers, bank account references. What additional security
measures should the spec include? Think about encryption at rest,
audit logging, and data retention policies.
```

**What you're practicing:** Adapting the deployment spec for different risk profiles. A competitor-tracker and a payment processor have different security requirements. The spec structure is the same — the contents change based on what's at stake.

### Prompt 2: Spec for a Different Agent

```
I want to deploy a web scraping agent that runs every 6 hours,
downloads product listings from 5 competitor websites, and stores
the results in a PostgreSQL database. Write a complete
DEPLOYMENT-SPEC.md for this agent. Include all six sections.
```

**What you're practicing:** Writing deployment specs from scratch. The first spec you follow. The second spec you write. The third spec you don't even think about — the structure is automatic.

### Prompt 3: systemd vs Docker

```
This chapter used systemd to deploy agents. I've also heard about
Docker containers. Compare systemd services and Docker containers
for agent deployment. When would you use each? What are the
tradeoffs in complexity, isolation, and portability? Which would
you recommend for a solo developer deploying 2-3 agents?
```

**What you're practicing:** Understanding the landscape of deployment options. systemd is the foundation — it works everywhere Linux runs with zero additional tooling. Docker adds isolation and portability at the cost of complexity. Knowing when each tool is appropriate is an architectural decision.

---

## Flashcards Study Aid

<Flashcards />
