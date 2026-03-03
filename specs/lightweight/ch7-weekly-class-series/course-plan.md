# OpenClaw & NanoClaw Weekly Class Series — Course Plan

## Context

Panaversity announced free weekly classes (Wednesdays 10 PM PKT, Zoom + YouTube) covering Chapter 7 "Meet Your First AI Employee" plus NanoClaw hands-on. Students pre-read L01 before the series. 1-hour sessions, hybrid: ~5 min orient → ~25 min live demo → ~20 min hands-on → ~10 min debrief/Q&A.

**What makes this course unique:** No existing course teaches OpenClaw AND NanoClaw together from an architecture perspective. The Udemy course is "run it and automate stuff." freeCodeCamp is a beginner walkthrough. Our angle: understand what you're building and why it works.

**Goal:** Understand AI Employees, OpenClaw and how to customize it for businesses, and NanoClaw's role as you move beyond SMBs into regulated/enterprise deployment.

**Business maturity narrative (threaded across lessons):**

- L05: Skills as sellable business assets, not just personal convenience
- L08: Compound workflows as business operations; OpenClaw as the SMB platform
- L09: Three-stage maturity path — Personal → Business/SMB (OpenClaw) → Regulated/Enterprise (NanoClaw)
- L10: Business maturity comparison table with platform recommendations per stage

## Research-Backed Design Decisions

| Decision                                 | Rationale                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 7 sessions (not 10+)                     | Free series optimal at 6-8 weeks. Dropout peaks weeks 2-4.                                     |
| Pre-session triage form                  | 24 hours before each class: "Is your setup working? What's your error?" Resolve async.         |
| `openclaw doctor` as mandatory step      | New diagnostic tool catches Node version, Docker, API keys, ports. Mentioned in every session. |
| Every session has a "walk-away artifact" | Research shows tangible output every 2 sessions prevents dropout. We do it every session.      |
| YouTube chapter markers                  | Add timestamps every 10-15 min for recording viewers. Cut install-debugging segments.          |
| Morning briefing thread                  | L03 configures it, L06/L08 revisit it. Creates continuity across weeks.                        |
| Telegram as equal-status channel         | WhatsApp requires dedicated phone. Telegram must be first-class, not a fallback.               |

## Pre-Flight Requirements (Sent 1 Week Before Session 1)

Students must have before the first class:

- Node.js 22+ (`node --version`)
- A terminal (macOS Terminal, Linux shell, Windows PowerShell)
- WhatsApp on a **dedicated phone/number** OR Telegram account (equal alternatives, not primary/fallback)
- Read L01: "The AI Employee Moment" (conceptual foundation, no setup)
- Optional: skim L02 to know what's coming

## Session Structure (7 Sessions)

### Session 1: "Zero to WhatsApp in 60 Minutes"

**Theme:** Everyone leaves with a working AI employee on their phone
**Pre-read:** L02 (Setup Your AI Employee)
**Walk away with:** OpenClaw running + messaging channel connected + employee shaped

### Session 2: "Make It Do Real Work"

**Theme:** Stop chatting. Start delegating. Get artifacts you keep.
**Pre-read:** L03 (Your First Real Work) + L04 (How Your Employee Works)
**Walk away with:** competitors.md + weekly-goals.md + morning briefing configured

### Session 3: "Teach It New Tricks (Without Getting Hacked)"

**Theme:** Your employee is only as good as its skills — and only as safe as your boundaries
**Pre-read:** L05 (Teaching Skills & Staying Safe)
**Walk away with:** One domain-specific custom skill + safety model understood viscerally

### Session 4: "Run Claude Code from Your Phone"

**Theme:** The most powerful thing in Chapter 7 — delegate coding from WhatsApp
**Pre-read:** L06 (Your Employee Orchestrating Agents)
**Walk away with:** ACP working, at least one real task in a real project folder

### Session 5: "Connect Everything — Google Workspace & Secrets"

**Theme:** Your employee reads your email, manages your docs, handles credentials safely
**Pre-read:** L07 (Connecting Google Workspace)
**Walk away with:** Google Workspace connected (or understood), secrets management verified

### Session 6: "Your Employee Works While You Sleep"

**Theme:** Scheduling, automation, compound workflows — the always-on employee
**Pre-read:** L08 (What People Are Building)
**Walk away with:** Heartbeat with personalized checklist + working cron job with announce

### Session 7: "NanoClaw — Beyond SMB"

**Theme:** When your business outgrows shared-process architecture. Container isolation for regulated industries.
**Pre-read:** L09 (NanoClaw and the Agent Factory) + L10 (NanoClaw Hands-On Setup)
**Walk away with:** NanoClaw running, business maturity framework for choosing platforms, Layer-3 design for their profession

## Implementation Status

All content deliverables complete as of 2026-03-02.

| Deliverable                | Status | Notes                                                                                                                           |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Course plan document       | Done   | This file                                                                                                                       |
| L02 edits (Session 1)      | Done   | Node 22+, `openclaw doctor`, starter prompt, Telegram elevated                                                                  |
| L03 edits (Session 2)      | Done   | File location path, Gemini rate limit warning                                                                                   |
| L04 edits (Session 2)      | Done   | Architecture self-description opening, terminal commands, new Try With AI prompt                                                |
| L05 edits (Session 3)      | Done   | Skills path, `openclaw skills list`, lethal trifecta diagram, trigger verification, business asset framing                      |
| L06 edits (Session 4)      | Done   | Claude Code pre-flight, channel checkpoint, `cwd` killer feature callout                                                        |
| L07 edits (Session 5)      | Done   | Test Google account moved to top, Gmail labels test, GCP walkthrough note, Windows path, version compatibility                  |
| L08 edits (Session 6)      | Done   | Compound reliability math, Composability Map career reference, morning briefing revisit, business operations framing            |
| L09 edits (Session 7)      | Done   | "What Connects" moved to top, Docker default, Windows warning, required Layer-3 exercise, three-stage business maturity reframe |
| New L10: NanoClaw Hands-On | Done   | 407 lines, score 87/100, full YAML frontmatter, 3 Try With AI prompts, business maturity comparison table                       |
| Quiz renumbered (10→11)    | Done   | sidebar_position updated, files renamed                                                                                         |
| Chapter README             | Done   | Weekly Class Series section with session table and pre-flight requirements                                                      |