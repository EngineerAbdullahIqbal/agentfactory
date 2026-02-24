---
sidebar_position: 11
title: "Silver Capstone: The CEO Briefing"
sidebar_label: "L11: Silver Capstone"
description: "Build the autonomous Weekly Business Audit that analyzes your goals, completed tasks, and financials to generate a Monday Morning CEO Briefing — the feature that transforms your AI from assistant to business partner."
keywords:
  - CEO Briefing
  - business audit
  - weekly report
  - revenue tracking
  - bottleneck detection
  - proactive suggestions
  - autonomous reporting
  - skill composition
  - cron scheduling
chapter: 13
lesson: 11
duration_minutes: 35
tier: "Silver"

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 4"
layer_progression: "L4 (Spec-Driven Capstone)"
layer_1_foundation: "N/A (capstone builds on L08-L10)"
layer_2_collaboration: "AI helps refine audit logic and briefing quality"
layer_3_intelligence: "Skill encapsulates reusable briefing generation pattern"
layer_4_capstone: "Integrate watchers, HITL, cron, and vault into autonomous reporting system"

# HIDDEN SKILLS METADATA
skills:
  - name: "Business Goals Specification"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student creates Business_Goals.md with revenue targets, KPIs, and subscription audit rules"
  - name: "Data Population for Testing"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Programming"
    measurable_at_this_level: "Student creates realistic sample data in vault folders using bash commands"
  - name: "Audit Skill Design"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student designs ceo-briefing skill that cross-references multiple data sources"
  - name: "Output Verification"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Evaluate"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student verifies generated briefing accuracy against sample data and commits to git"

learning_objectives:
  - objective: "Create Business_Goals.md with revenue targets, key metrics, and subscription audit rules"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Business_Goals.md contains measurable targets and at least 3 alert thresholds"
  - objective: "Populate vault with realistic sample data for briefing generation"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "5 completed task files in /Done/ and 5 log entries in /Logs/ with correct metadata"
  - objective: "Design and implement ceo-briefing skill that cross-references goals, tasks, and logs"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Skill generates briefing with executive summary, revenue, bottlenecks, and proactive suggestions"
  - objective: "Verify briefing output accuracy and schedule autonomous generation"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student confirms briefing data matches sample data and cron job is configured for Sunday night"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (business goals template, sample data creation, audit skill design, output verification) — appropriate for capstone synthesis at B1"

differentiation:
  extension_for_advanced: "Add subscription audit with pattern matching for unused services; integrate real accounting data"
  remedial_for_struggling: "Start with task completion summary only (skip financial analysis and proactive suggestions)"

teaching_guide:
  lesson_type: "capstone"
  session_group: 4
  session_title: "Silver Capstone - CEO Briefing"
  key_points:
    - "Cross-referencing is the core insight — connecting a missed deadline in /Done/ to a revenue shortfall in Business_Goals.md produces intelligence that no single data source contains alone"
    - "The skill file (SKILL.md) is NOT code — it is structured English instructions that Claude interprets at runtime; students are writing audit logic in natural language, not Python"
    - "This capstone wires together L08 watchers (feeding /Done/ and /Logs/ throughout the week), L09 HITL (subscription cancellation goes through /Pending_Approval/), and L10 cron (Sunday 11 PM trigger) — if students missed any of those, this lesson exposes the gap"
    - "The verification checklist (Step 5) is the capstone assessment — students must trace every number in the briefing back to its source file to confirm the skill produced correct output"
  misconceptions:
    - "Students think the CEO Briefing is just a summary of completed tasks — the proactive suggestions section (flagging unused Notion, suggesting process changes for Client B delays) is what elevates it from report to business partner"
    - "Students confuse the briefing template (the markdown output format in Step 3) with the audit logic (the analysis steps that produce it) — the template is just formatting, the logic is the real work"
    - "Students expect the cron job to 'just work' without the vault being properly structured — if /Done/ files lack revenue fields or /Logs/ JSON is malformed, the briefing silently produces garbage"
    - "Students skip the verification step because the briefing 'looks right' — the revenue total ($2,300) must be manually traced to the two revenue-bearing tasks ($1,500 + $800) to confirm correctness"
  discussion_prompts:
    - "The briefing flags Notion ($15/month, 47 days inactive) and Grammarly ($12/month, 60 days inactive). What subscriptions in YOUR life would an audit like this catch?"
    - "Client B's proposal took 3x the expected duration. If you saw this pattern repeat across 4 weeks of briefings, what process change would you make?"
    - "If you received this briefing every Monday morning, what section would you read first — and what would that tell you about your priorities?"
  teaching_tips:
    - "Walk through the verification checklist (Step 5 table) LIVE — have students trace the $2,300 revenue total back to the two /Done/ files that contain revenue fields; this is the capstone's 'aha' moment"
    - "Have students create their OWN Business_Goals.md with real objectives BEFORE building the skill — personal stakes make the briefing output meaningful rather than academic"
    - "Demo the subscription audit by changing Notion's Last Activity date to yesterday and regenerating — show that the flag disappears, proving the audit logic is dynamic not static"
    - "Pace the lesson around Step 3 (skill design) — Steps 1-2 are data setup that students can do quickly, but the SKILL.md structure needs careful explanation of how Claude interprets natural language instructions as audit logic"
  assessment_quick_check:
    - "Name the three data sources and what each provides to the briefing (goals provide targets, /Done/ provides task completions and revenue, /Logs/ provides activity history)"
    - "The briefing shows $2,300 weekly revenue — which two task files does that number come from and what are their individual amounts?"
    - "What is the difference between the briefing template and the audit logic? (Template is output formatting; audit logic is the analysis steps that cross-reference sources)"

# Generation metadata
generated_by: "content-implementer (autonomous execution)"
created: "2026-02-19"
version: "1.0.0"
---

# Silver Capstone: The CEO Briefing

In Lessons 8 through 10, you gave your AI employee perception (watchers), safety (HITL approval), and persistence (cron and PM2). Each capability works independently. But individually, they are infrastructure without purpose.

Now you will build the feature that gives all that infrastructure a reason to exist: the **Monday Morning CEO Briefing**. Every Sunday night, your employee reviews your week -- goals, completed tasks, logs, spending -- and writes a briefing that is waiting in your vault when you wake up Monday morning. Revenue status. Bottlenecks. Proactive suggestions like "Notion has had no activity in 45 days -- cancel the $15/month subscription?"

This is the difference between an assistant that waits for commands and a business partner that thinks ahead. Let's build it.

## The Business Handover

The value of a weekly briefing is not the document itself -- it is the **cross-referencing**. Connecting a missed deadline to a revenue shortfall. Noticing a subscription you forgot to cancel.

Your AI employee reads faster, never forgets to check a folder, and works Sunday night while you sleep. The CEO Briefing is where your Silver tier infrastructure proves its value.

## Step 1: Create Business_Goals.md

Your employee needs to know what matters to you. Without goals, it can report activity but cannot evaluate whether that activity is on track.

Create the goals file in your vault:

```bash
cat > ~/projects/ai-vault/Business_Goals.md << 'EOF'
# Business Goals

## Revenue Targets
- Monthly target: $10,000
- Weekly target: $2,500
- Key revenue sources: consulting, course sales, freelance projects

## Key Metrics
- Email response time: < 4 hours
- Client satisfaction: > 90%
- Task completion rate: > 95%

## Subscription Audit Rules
- Flag subscriptions with no activity in 30+ days
- Alert if monthly software spend exceeds $500
- Track renewal dates 14 days in advance

## Active Subscriptions
| Service | Monthly Cost | Last Activity |
|---------|-------------|---------------|
| GitHub Pro | $4 | 2026-02-18 |
| Notion | $15 | 2026-01-03 |
| Figma | $12 | 2026-02-15 |
| Grammarly | $12 | 2025-12-20 |

## Bottleneck Thresholds
- Flag any task that takes 2x longer than expected duration
- Flag any client response pending more than 3 business days
EOF
```

**Output:**

```
(no output - file created)
```

Verify it exists:

```bash
head -5 ~/projects/ai-vault/Business_Goals.md
```

**Output:**

```
# Business Goals

## Revenue Targets
- Monthly target: $10,000
- Weekly target: $2,500
```

Customize this template for your actual business. The revenue targets and subscriptions are examples -- replace them with your real numbers. The skill works with whatever goals you define.

## Step 2: Populate Sample Data

The briefing needs data to analyze. Create realistic sample data so you can verify the skill works correctly before connecting real sources.

### Create completed task files in /Done/

```bash
mkdir -p ~/projects/ai-vault/Done

cat > ~/projects/ai-vault/Done/2026-02-17_client_a_invoice.md << 'EOF'
---
task: Send invoice to Client A
status: completed
started: 2026-02-15
completed: 2026-02-17
expected_duration: 1 day
actual_duration: 2 days
revenue: 1500
---
Invoice #2026-021 sent to Client A. Payment terms: Net 30.
EOF

cat > ~/projects/ai-vault/Done/2026-02-16_blog_post.md << 'EOF'
---
task: Publish weekly blog post
status: completed
started: 2026-02-16
completed: 2026-02-16
expected_duration: 3 hours
actual_duration: 2 hours
revenue: 0
---
Published "AI Agent Patterns for Business" on company blog.
EOF

cat > ~/projects/ai-vault/Done/2026-02-14_project_alpha.md << 'EOF'
---
task: Project Alpha milestone 3
status: completed
started: 2026-02-10
completed: 2026-02-14
expected_duration: 3 days
actual_duration: 4 days
revenue: 800
---
Delivered milestone 3 to client. One day over estimate due to scope clarification.
EOF

cat > ~/projects/ai-vault/Done/2026-02-13_social_media.md << 'EOF'
---
task: Schedule weekly social media posts
status: completed
started: 2026-02-13
completed: 2026-02-13
expected_duration: 1 hour
actual_duration: 1 hour
revenue: 0
---
Scheduled 5 LinkedIn posts and 3 Twitter posts for the week.
EOF

cat > ~/projects/ai-vault/Done/2026-02-18_client_b_proposal.md << 'EOF'
---
task: Write proposal for Client B
status: completed
started: 2026-02-12
completed: 2026-02-18
expected_duration: 2 days
actual_duration: 6 days
revenue: 0
---
Proposal sent. Significant delay due to waiting for Client B requirements clarification.
EOF
```

**Output:**

```
(no output - 5 files created)
```

### Create log entries in /Logs/

```bash
mkdir -p ~/projects/ai-vault/Logs

cat > ~/projects/ai-vault/Logs/2026-02-17.json << 'EOF'
[
  {"timestamp": "2026-02-17T09:15:00Z", "action": "email_send", "target": "clienta@example.com", "subject": "Invoice #2026-021", "result": "success"},
  {"timestamp": "2026-02-17T14:30:00Z", "action": "email_send", "target": "clientb@example.com", "subject": "Proposal Draft", "result": "success"}
]
EOF

cat > ~/projects/ai-vault/Logs/2026-02-16.json << 'EOF'
[
  {"timestamp": "2026-02-16T10:00:00Z", "action": "file_create", "target": "blog/ai-agent-patterns.md", "result": "success"},
  {"timestamp": "2026-02-16T11:30:00Z", "action": "social_schedule", "target": "linkedin", "posts": 5, "result": "success"}
]
EOF

cat > ~/projects/ai-vault/Logs/2026-02-15.json << 'EOF'
[
  {"timestamp": "2026-02-15T08:00:00Z", "action": "email_triage", "emails_processed": 12, "urgent": 2, "result": "success"},
  {"timestamp": "2026-02-15T09:45:00Z", "action": "invoice_generate", "target": "Client A", "amount": 1500, "result": "success"}
]
EOF

cat > ~/projects/ai-vault/Logs/2026-02-14.json << 'EOF'
[
  {"timestamp": "2026-02-14T16:00:00Z", "action": "file_deliver", "target": "Project Alpha M3", "result": "success"},
  {"timestamp": "2026-02-14T16:30:00Z", "action": "email_send", "target": "alpha-client@example.com", "subject": "Milestone 3 Delivered", "result": "success"}
]
EOF

cat > ~/projects/ai-vault/Logs/2026-02-13.json << 'EOF'
[
  {"timestamp": "2026-02-13T10:00:00Z", "action": "social_schedule", "target": "twitter", "posts": 3, "result": "success"},
  {"timestamp": "2026-02-13T10:15:00Z", "action": "social_schedule", "target": "linkedin", "posts": 5, "result": "success"}
]
EOF
```

**Output:**

```
(no output - 5 log files created)
```

### Verify the data

```bash
ls ~/projects/ai-vault/Done/
echo "---"
ls ~/projects/ai-vault/Logs/
```

**Output:**

```
2026-02-13_social_media.md
2026-02-14_project_alpha.md
2026-02-16_blog_post.md
2026-02-17_client_a_invoice.md
2026-02-18_client_b_proposal.md
---
2026-02-13.json
2026-02-14.json
2026-02-15.json
2026-02-16.json
2026-02-17.json
```

Five completed tasks and five days of logs. This is enough for the briefing to produce meaningful output.

## Step 3: Build the CEO Briefing Skill

Now build the skill that reads all three data sources and generates the briefing.

```bash
mkdir -p ~/projects/ai-vault/.claude/skills/ceo-briefing/references
```

**Output:**

```
(no output - directory created)
```

Create `.claude/skills/ceo-briefing/SKILL.md`:

````yaml
---
name: ceo-briefing
description: "Generate the Monday Morning CEO Briefing by auditing Business_Goals.md, /Done/ folder, and /Logs/ to produce an executive summary with revenue tracking, bottleneck detection, and proactive suggestions. Use when it's time to generate the weekly business report."
---

# CEO Briefing Generator

## Overview

Autonomous weekly audit that cross-references business goals, completed tasks,
and activity logs to produce an actionable Monday Morning CEO Briefing.

## Data Sources

Read these files before generating the briefing:

| Source | Path | What It Provides |
|--------|------|-----------------|
| Business Goals | `Business_Goals.md` | Revenue targets, KPIs, subscription audit rules |
| Completed Tasks | `/Done/*.md` | Tasks finished this week with duration and revenue |
| Activity Logs | `/Logs/*.json` | Action history for the reporting period |

## Reporting Period

- **Default**: Previous 7 days (Monday to Sunday)
- Read all files in /Done/ with dates in the reporting period
- Read all files in /Logs/ with dates in the reporting period

## Analysis Steps

1. **Revenue Calculation**
   - Sum `revenue` fields from all /Done/ tasks in period
   - Compare against weekly target from Business_Goals.md
   - Calculate MTD progress toward monthly target

2. **Task Completion Analysis**
   - List all completed tasks from /Done/
   - Calculate completion rate (completed / total tracked)

3. **Bottleneck Detection**
   - Compare `actual_duration` vs `expected_duration` for each task
   - Flag tasks exceeding the threshold in Business_Goals.md
   - Include delay amount and likely cause from task notes

4. **Subscription Audit**
   - Read Active Subscriptions table from Business_Goals.md
   - Flag any subscription where Last Activity exceeds 30 days
   - Calculate monthly cost of flagged subscriptions

5. **Proactive Suggestions**
   - Generate cost optimization suggestions from subscription audit
   - Identify upcoming deadlines from task metadata
   - Suggest process improvements based on bottleneck patterns

## Output Format

Write the briefing to: `/Briefings/YYYY-MM-DD_Monday_Briefing.md`

Use this template:

```markdown
# Monday Morning CEO Briefing

## Executive Summary
[1-2 sentence overview: revenue status, major accomplishments, key concerns]

## Revenue
- **This Week**: $X,XXX
- **MTD**: $X,XXX (XX% of $target)
- **Trend**: [On track / Behind / Ahead]

## Completed Tasks
- [x] Task description (revenue if applicable)
- [x] Task description
...

## Bottlenecks
| Task | Expected | Actual | Delay | Likely Cause |
|------|----------|--------|-------|-------------|
| ... | ... | ... | ... | ... |

## Proactive Suggestions

### Cost Optimization
- [Subscription]: [Issue]. Cost: $X/month. [Recommendation]

### Upcoming Deadlines
- [Deadline description]: [Date] ([Days remaining])

---
_Generated by Personal AI Employee_
_Period: [start_date] to [end_date]_
````

## After Generation

1. Verify the briefing file exists in /Briefings/
2. Git commit with message: "Weekly CEO Briefing: [date range]"
3. Report completion status

````

Now create the reference file with audit rules. Create `.claude/skills/ceo-briefing/references/audit-rules.md`:

```markdown
# CEO Briefing Audit Rules

## Revenue Classification
- Revenue is extracted from the `revenue` field in /Done/ task files
- Tasks with revenue: 0 are operational (no revenue impact)
- Revenue is only counted for the reporting period

## Bottleneck Severity
| Delay Ratio | Severity | Action |
|-------------|----------|--------|
| 1.5x - 2x expected | Minor | Note in briefing |
| 2x - 3x expected | Moderate | Flag with cause analysis |
| > 3x expected | Critical | Highlight in executive summary |

## Subscription Audit Thresholds
- 30+ days inactive: Flag for review
- 60+ days inactive: Recommend cancellation
- Cost > $50/month AND inactive: Priority flag

## Data Quality Checks
- If /Done/ folder is empty: Report "No completed tasks recorded"
- If /Logs/ folder is empty: Report "No activity logs found"
- If Business_Goals.md is missing: Report error, cannot generate briefing
````

## Step 4: Create Briefings Directory and Run

Set up the output directory and generate your first briefing:

```bash
mkdir -p ~/projects/ai-vault/Briefings
```

**Output:**

```
(no output - directory created)
```

Now run the skill manually:

```bash
cd ~/projects/ai-vault
claude -p "Run the ceo-briefing skill. Generate the Monday Morning CEO Briefing for the period February 12-18, 2026. Read Business_Goals.md, all files in /Done/, and all files in /Logs/. Write the briefing to /Briefings/2026-02-19_Monday_Briefing.md and then git commit."
```

Claude reads your three data sources, cross-references them, and produces the briefing. This is the moment where infrastructure becomes intelligence -- the skill does not just report, it analyzes.

## Step 5: Verify the Output

Check that the briefing was generated:

```bash
cat ~/projects/ai-vault/Briefings/2026-02-19_Monday_Briefing.md
```

**Expected output** (content will vary based on Claude's analysis, but should include):

```markdown
# Monday Morning CEO Briefing

## Executive Summary

Revenue slightly below weekly target at $2,300 of $2,500 goal. Five tasks
completed. One significant bottleneck: Client B proposal took 6 days
(expected 2). Two subscriptions flagged for review.

## Revenue

- **This Week**: $2,300
- **MTD**: $2,300 (23% of $10,000 target)
- **Trend**: On track (early in month)

## Completed Tasks

- [x] Client A invoice sent - $1,500
- [x] Project Alpha milestone 3 delivered - $800
- [x] Weekly blog post published
- [x] Social media posts scheduled
- [x] Client B proposal sent

## Bottlenecks

| Task              | Expected | Actual | Delay   | Likely Cause                    |
| ----------------- | -------- | ------ | ------- | ------------------------------- |
| Client B proposal | 2 days   | 6 days | +4 days | Waiting for client requirements |
| Project Alpha M3  | 3 days   | 4 days | +1 day  | Scope clarification             |

## Proactive Suggestions

### Cost Optimization

- **Notion**: No activity since Jan 3 (47 days). Cost: $15/month. Cancel?
- **Grammarly**: No activity since Dec 20 (60 days). Cost: $12/month. Cancel?
- Combined savings if cancelled: $27/month ($324/year)

### Process Improvement

- Client B proposal delay pattern: 3x expected duration. Consider requiring
  complete requirements before starting proposals.

---

_Generated by Personal AI Employee_
_Period: 2026-02-12 to 2026-02-18_
```

### Verification checklist

Compare the generated briefing against your sample data:

| Check                   | Expected               | Look For                                 |
| ----------------------- | ---------------------- | ---------------------------------------- |
| Revenue total           | $2,300 ($1,500 + $800) | Sum matches /Done/ revenue fields        |
| Task count              | 5 completed            | All 5 /Done/ files listed                |
| Bottleneck: Client B    | 6 days vs 2 expected   | Flagged because 3x threshold             |
| Bottleneck: Alpha M3    | 4 days vs 3 expected   | Flagged because > 1.5x threshold         |
| Subscription: Notion    | Inactive 47 days       | Last activity Jan 3 exceeds 30-day rule  |
| Subscription: Grammarly | Inactive 60 days       | Last activity Dec 20 exceeds 30-day rule |

If any data is missing or incorrect, refine the skill instructions. This is the iterative process -- the skill improves as you clarify what "good" looks like.

### Verify the git commit

```bash
cd ~/projects/ai-vault
git log --oneline -1
```

**Output:**

```
a1b2c3d Weekly CEO Briefing: 2026-02-12 to 2026-02-18
```

The briefing is tracked in version control. Over time, you build a history of weekly reports that show business trends.

## Step 6: Schedule With Cron

In L10, you learned cron scheduling. Now connect it to the briefing skill so it runs every Sunday night without your involvement.

```bash
crontab -e
```

Add this line (runs Sunday at 11 PM):

```
0 23 * * 0 cd ~/projects/ai-vault && claude -p "Run the ceo-briefing skill for this week" >> ~/projects/ai-vault/Logs/cron-briefing.log 2>&1
```

**Cron expression breakdown:**

| Field        | Value | Meaning     |
| ------------ | ----- | ----------- |
| Minute       | 0     | At minute 0 |
| Hour         | 23    | At 11 PM    |
| Day of Month | \*    | Every day   |
| Month        | \*    | Every month |
| Day of Week  | 0     | Sunday      |

Verify the cron entry:

```bash
crontab -l | grep briefing
```

**Output:**

```
0 23 * * 0 cd ~/projects/ai-vault && claude -p "Run the ceo-briefing skill for this week" >> ~/projects/ai-vault/Logs/cron-briefing.log 2>&1
```

Every Sunday at 11 PM, your employee wakes up, reads the week's data, generates the briefing, commits it to git, and goes back to sleep. Monday morning, the briefing is waiting.

## How Everything Connects

Here is how the Silver tier components work together for the CEO Briefing:

```
Sunday 11:00 PM
┌─────────────────────────────────────────────────────┐
│ CRON (from L10)                                      │
│ Triggers: claude -p "Run ceo-briefing skill"          │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│ CEO-BRIEFING SKILL (this lesson)                     │
│                                                      │
│  Reads:                                              │
│  ├── Business_Goals.md    → Targets & thresholds     │
│  ├── /Done/*.md           → Completed tasks          │
│  └── /Logs/*.json         → Activity history         │
│                                                      │
│  Analyzes:                                           │
│  ├── Revenue vs targets                              │
│  ├── Duration vs expectations (bottlenecks)          │
│  └── Subscription activity vs audit rules            │
│                                                      │
│  Writes:                                             │
│  └── /Briefings/YYYY-MM-DD_Monday_Briefing.md        │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│ GIT COMMIT                                           │
│ "Weekly CEO Briefing: [date range]"                  │
└─────────────────────────────────────────────────────┘

Monday 7:00 AM
┌─────────────────────────────────────────────────────┐
│ YOU                                                  │
│ Open vault → Read briefing → Start week with clarity │
└─────────────────────────────────────────────────────┘
```

The watchers from L08 feed data into /Done/ and /Logs/ throughout the week. The HITL patterns from L09 ensure sensitive actions (like the subscription cancellation suggestion) go through /Pending_Approval/. The cron scheduling from L10 triggers the briefing generation. This lesson ties them all together.

## What You've Built: Silver Tier Complete

With the CEO Briefing working, your Silver tier is complete. Here is everything your AI employee can now do:

| Capability            | Lesson  | What It Does                                             |
| --------------------- | ------- | -------------------------------------------------------- |
| Memory & Identity     | L01     | Vault structure, AGENTS.md governance, CLAUDE.md context |
| Writing Skills        | L02-L04 | Email drafting, templates, summarization                 |
| Specialist Workers    | L05     | Inbox triage, response suggestions, follow-up tracking   |
| External Actions      | L06     | Gmail MCP with 19 real email operations                  |
| Orchestration         | L07     | Master skill coordinating all email components           |
| Perception            | L08     | Watchers that detect emails and file changes             |
| Safety                | L09     | HITL approval for sensitive actions                      |
| Persistence           | L10     | Cron scheduling and PM2 process management               |
| Business Intelligence | L11     | CEO Briefing with autonomous weekly reporting            |

**Bronze gave you an assistant.** It handled email when you asked.

**Silver gave you a business partner.** It watches for work, asks permission for sensitive actions, runs 24/7, and proactively reports on your business every Monday morning.

If you want to stop here, you have a genuinely useful system. If you want to push further, L12 (Gold Capstone) adds cross-domain integration, error recovery, and full autonomous operation.

## Try With AI

**Prompt 1: Generate a Personalized Briefing**

```
I have the ceo-briefing skill installed. Here are my actual business goals:
- Monthly revenue target: $[YOUR_TARGET]
- Key metrics: [YOUR_METRICS]
- Active subscriptions: [YOUR_SUBSCRIPTIONS]

Update my Business_Goals.md with these real values, then run the ceo-briefing
skill against my current /Done/ and /Logs/ data. Show me the full briefing.
```

**What you're learning:** The skill adapts to YOUR business context. By providing real goals, you see how the cross-referencing produces insights specific to your situation. The same audit logic that flagged Notion in the example will flag whatever is inactive in YOUR subscription list.

**Prompt 2: Improve the Audit Logic**

```
Review my ceo-briefing skill at .claude/skills/ceo-briefing/SKILL.md.
I want the briefing to also:
1. Compare this week's revenue to the previous week
2. Track which clients generate the most revenue over time
3. Flag tasks with no revenue that take more than 4 hours

Update the skill to include these improvements, then regenerate the briefing
so I can see the difference.
```

**What you're learning:** The skill is a living document that improves through iteration. When you ask Claude to enhance the audit logic, watch how it modifies the SKILL.md instructions. Notice what it adds, what it restructures, and whether the new briefing contains the improvements you requested. This is the bidirectional refinement loop -- you specify what matters, Claude implements it, you evaluate the result.

**Always review AI-generated briefings before acting on them.** The CEO Briefing provides analysis, not decisions. You remain responsible for verifying the numbers and choosing which suggestions to follow.
