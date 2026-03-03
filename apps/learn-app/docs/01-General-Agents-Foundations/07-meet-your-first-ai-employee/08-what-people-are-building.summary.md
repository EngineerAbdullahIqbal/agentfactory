---
title: "Summary: What People Are Building"
sidebar_label: "Summary"
sidebar_position: 8.5
---

# Summary: What People Are Building

## Key Concepts

- **Pattern composability** is the core insight: every real-world AI Employee workflow is a composition of the five building blocks from this chapter (scheduling, memory, skills, delegation, integrations)
- Compound workflows are not just additive -- they are multiplicatively more capable AND multiplicatively more dangerous when any component fails
- Five use case categories demonstrate composability: Personal Productivity (CRM), Knowledge Management, Business Intelligence, Security and Operations, and Personal Health
- The patterns transfer across all agent frameworks (OpenClaw, AutoGPT, CrewAI) -- names change, architecture does not
- **Heartbeat**: Periodic batched check-in running in the main session (default 30 min), processing a HEARTBEAT.md checklist, suppressing output when nothing is urgent
- **Cron**: Exact-time scheduling with isolated or main session modes, per-job model selection, and one-shot reminders via `--at`
- **Cron delivery modes**: `none` (silent), `announce` (sends visible message to channel, default for isolated jobs), `webhook` (POSTs to endpoint). Announce requires `--session isolated`. Main-session cron jobs cannot use announce -- they run silently as system events

## The Composability Map

| Pattern Combination               | What It Creates              | Example                                                          |
| --------------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| Skills (L05) + Scheduling (L03)   | Autonomous routines          | Nightly code review that reports results by morning              |
| Integrations (L07) + Memory (L04) | Context-aware automation     | Agent that learns email priorities and auto-sorts                |
| Delegation (L06) + Skills (L05)   | Multi-agent workflows        | Research task with specialist agents synthesizing findings       |
| Scheduling + Delegation + Skills  | Orchestrated operations      | Daily pipeline: monitor, analyze, generate briefing              |
| All five combined                 | Compound AI Employee systems | Full productivity system spanning email, calendar, files, agents |

## Scheduling: Heartbeat vs Cron

| Aspect   | Heartbeat                                        | Cron                                              |
| -------- | ------------------------------------------------ | ------------------------------------------------- |
| Timing   | Approximate intervals (queue-based)              | Exact cron expressions with timezone support      |
| Context  | Full conversation history                        | Isolated sessions start clean                     |
| Cost     | One turn per interval (batched)                  | Full turn per job (but can use cheaper model)     |
| Best for | Multiple routine checks, context-aware           | Exact timing, standalone work, per-job model      |
| Config   | Operator-side (timing); employee edits checklist | Both operator CLI and employee via `cron.*` tools |

## What Remains Unsolved

- **Security at scale** -- the lethal trifecta from L05 multiplies with every integration added; one compromised skill can read email AND modify code
- **Reliability of autonomous workflows** -- a 5-step pipeline at 99% reliability per step delivers correct results only 95% of the time; failures at 3 AM cascade silently
- **Cost management** -- no mainstream agent framework ships with spending limits or cost-per-workflow monitoring built in
- **The generalization gap** -- personal setups run on YOUR patterns and conventions; hand the same setup to a colleague and it breaks

## Common Mistakes

- Treating compound workflows as simply additive rather than recognizing that risk compounds with each integration
- Using cron for multiple routine checks that could be batched into one heartbeat turn (wastes cost)
- Using heartbeat when exact timing is required (heartbeat timing is approximate, not precise)
- Trusting multi-agent synthesis without fact-checking -- hallucinated analysis from one expert agent gets woven into final reports without question
- Building for yourself only without considering the generalization gap between personal setup and reproducible system
- Scheduling a cron reminder without `--announce` delivery mode -- the job runs silently and the student wonders why the employee "never came back"
