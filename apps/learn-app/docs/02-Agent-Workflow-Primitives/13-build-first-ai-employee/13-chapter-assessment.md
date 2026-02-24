---
sidebar_position: 13
title: "Chapter 13: Build Your First AI Employee Quiz"
sidebar_label: "L13: Assessment"
description: "Validate your Personal AI Employee knowledge with a 20-question tiered quiz covering vault setup, skills, subagents, MCP, watchers, HITL, scheduling, error recovery, and audit logging."
keywords:
  - chapter quiz
  - assessment
  - Personal AI Employee
  - Digital FTE
  - skills
  - subagents
  - MCP
  - watchers
  - HITL
  - error recovery
  - audit logging
chapter: 13
lesson: 13
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Vault Architecture Recall"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can identify the roles of AGENTS.md and CLAUDE.md in the vault"
  - name: "Skill and Subagent Decision-Making"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can determine when to use a skill vs a subagent for a given task"
  - name: "MCP Integration Understanding"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student can explain what MCP provides over direct API calls"
  - name: "Watcher Pattern Comprehension"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Programming"
    measurable_at_this_level: "Student can describe the three watcher methods and the check-process-deposit pattern"
  - name: "HITL Governance Evaluation"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can evaluate which actions require human approval and design permission boundaries"
  - name: "Error Recovery Design"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can distinguish transient from authentication errors and select recovery strategies"
  - name: "System Architecture Synthesis"
    proficiency_level: "B2"
    category: "Conceptual"
    bloom_level: "Evaluate"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can describe the complete pipeline from trigger to log entry across all layers"

learning_objectives:
  - objective: "Recall vault structure components and their governance roles"
    proficiency_level: "A2"
    bloom_level: "Remember"
    assessment_method: "Multiple-choice questions on AGENTS.md, CLAUDE.md, and folder purposes"
  - objective: "Distinguish between skills, subagents, and MCP servers based on task characteristics"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Scenario-based multiple-choice selecting the correct component type"
  - objective: "Evaluate permission boundaries and identify actions requiring human approval"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Multiple-choice on HITL patterns and sensitive action categories"
  - objective: "Analyze error categories and select appropriate recovery strategies"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Multiple-choice mapping error types to recovery approaches"

cognitive_load:
  new_concepts: 0
  assessment: "Assessment lesson — no new concepts introduced. Tests recall and application of concepts from L01-L12."

differentiation:
  extension_for_advanced: "After completing the quiz, design a permission boundary table for a domain not covered in the chapter (e.g., healthcare scheduling, inventory management)"
  remedial_for_struggling: "Review L00 spec sections referenced in each answer explanation before retaking the quiz"

teaching_guide:
  lesson_type: "supplementary"
  session_group: 5
  session_title: "Chapter Assessment"
  key_points:
    - "Bronze questions (1-10) cover vault governance, skills vs subagents, MCP architecture, and the email-assistant orchestration pattern — these are prerequisites for every tier"
    - "The hardest conceptual distinction tested is skill vs subagent (Q5) and single-line YAML descriptions (Q6) — students who built components in L02-L05 recall these, students who skimmed will guess wrong"
    - "Gold Tier Q20 (full pipeline sequence) is the single best diagnostic question — a correct answer means the student can trace Perception-Reasoning-Approval-Action-Logging end-to-end from L12"
    - "Every answer key entry references the specific lesson where the concept was taught — this makes the assessment double as a targeted review guide for L14 Hackathon prep"
  misconceptions:
    - "Students think Gold Tier questions require Gold Tier implementation experience — they test conceptual understanding of error recovery and audit logging, not whether you built them"
    - "Students confuse the assessment with the L14 Hackathon submission — the quiz tests knowledge recall, the hackathon requires a working GitHub repo with real components"
    - "Students select Q6 answer B (dropdown rendering) because it sounds plausible — the actual reason is YAML parsing reliability across agent frameworks, a subtle but important distinction from L05"
    - "Students assume 'exponential backoff' means 'retry forever' — Q17 specifically tests that transient recovery has a max retry count, and auth errors require human intervention not retries"
  discussion_prompts:
    - "Q20 describes a 2 AM invoice email flowing through every component. Walk through what would happen differently if the Gmail API was down at step 4 — which error category applies and what does the employee do?"
    - "Look at Q14 (permission boundaries). What actions in YOUR domain would you add to the always-approve and always-require-human lists?"
    - "Which question did you get wrong that you were most confident about? What was the gap between what you assumed and what the lesson actually taught?"
  teaching_tips:
    - "Run this as an open-book timed exercise (20 min) — students who built components will finish in 12 minutes, students who only read will need all 20. The time difference reveals depth of understanding"
    - "After grading, have each student identify their single weakest lesson reference from the answer key — that lesson becomes required re-reading before L14 Hackathon"
    - "Use Q9 (master skill orchestration) and Q20 (full pipeline) as whiteboard walkthroughs — draw the flow together as a class, then compare to the L12 pipeline diagram"
    - "Frame the assessment as hackathon prep, not a gate — L14 requires exactly these concepts implemented in code, so every wrong answer is a gap to close before building"
  assessment_quick_check:
    - "Name the three watcher methods from Q11 without looking (check_for_updates, create_action_file, run) — this tests whether L08 stuck"
    - "What are the 7 required fields in an audit log entry? (timestamp, action_type, actor, target, parameters, approval_status, result) — this tests L12 retention"
    - "Explain in one sentence why auth errors cannot use exponential backoff retry — this tests the core distinction from Q17"

generated_by: "content-implementer"
created: "2026-02-19"
version: "1.1.0"
---

# Chapter 13: Build Your First AI Employee Quiz

Test your understanding of the concepts from Lessons 1 through 12. This assessment covers vault setup, skills, subagents, MCP, watchers, HITL, scheduling, error recovery, and audit logging across all three tiers.

<Quiz
title="Chapter 13: Build Your First AI Employee Assessment"
questionsPerBatch={20}
questions={[
{
question: "What is the relationship between AGENTS.md and CLAUDE.md in the vault?",
options: ["AGENTS.md is the file Claude reads first; CLAUDE.md stores governance rules", "CLAUDE.md is the entry point Claude reads first; AGENTS.md defines governance rules like skill and agent formats", "Both files serve the same purpose and are interchangeable", "AGENTS.md lists installed MCP servers; CLAUDE.md stores email templates"],
correctOption: 1,
explanation: "CLAUDE.md is the entry point that Claude Code reads first when it opens your vault. It typically references AGENTS.md with @AGENTS.md. AGENTS.md defines governance: skill format, agent format, and behavioral rules.",
source: "Lesson 1: Your Employee's Memory"
},
{
question: "Why does the Personal AI Employee use Obsidian vault files instead of a database for memory?",
options: ["Databases are too expensive for personal projects", "Obsidian has a built-in AI engine that processes files automatically", "Files are human-readable, version-controllable with git, and editable in any text editor — no special tools required", "Claude Code can only read markdown files and has no database drivers"],
correctOption: 2,
explanation: "Files are human-readable (open in any editor), version-controllable (commit to git for history), and tool-agnostic (no database driver needed). This makes the entire system inspectable and portable.",
source: "Lesson 1: Your Employee's Memory"
},
{
question: "What are the required components of a valid SKILL.md file?",
options: ["A Python script with a main() function and requirements.txt", "YAML frontmatter with name and description fields, plus a markdown body explaining when and how to use the skill", "A JSON configuration file with type, version, and endpoints fields", "An HTML template with embedded JavaScript for the skill interface"],
correctOption: 1,
explanation: "A valid SKILL.md requires YAML frontmatter with at least name and description fields. The description tells Claude when to activate the skill. The markdown body contains instructions, examples, and usage guidance.",
source: "Lesson 2: Teaching Your Employee to Write"
},
{
question: "How does Claude Code know when to activate a specific skill?",
options: ["The user must type the exact skill filename as a command", "Claude reads the skill's description field in the YAML frontmatter and matches it against the current task context", "Skills run on a fixed schedule defined in a cron configuration", "Claude Code loads all skills into memory at startup and runs them in sequence"],
correctOption: 1,
explanation: "Claude Code reads the description field from each skill's YAML frontmatter. When your request matches a description's activation criteria (e.g., 'Use when drafting emails'), Claude selects that skill.",
source: "Lesson 2: Teaching Your Employee to Write"
},
{
question: "When should you create a subagent instead of a skill?",
options: ["When the task requires a different programming language", "When the task needs autonomous reasoning, makes its own decisions, and may produce varied outputs depending on the input", "When the task takes longer than 30 seconds to complete", "When you want to reuse the same logic across multiple projects"],
correctOption: 1,
explanation: "Use a subagent when the task requires autonomous reasoning with varied outputs. Skills are for deterministic, reusable patterns (format an email). Subagents are for tasks needing judgment (triage an inbox and classify priority).",
source: "Lesson 5: Hiring Specialists"
},
{
question: "Why must subagent definition files use a single-line description?",
options: ["Multi-line descriptions exceed the YAML file size limit", "The description is displayed in Claude Code's agent selector dropdown, which only renders one line", "Multi-line descriptions can cause parsing issues in some agent frameworks, making agent discovery unreliable", "Single-line descriptions load faster and reduce memory consumption"],
correctOption: 2,
explanation: "Multi-line YAML descriptions can cause parsing issues in some agent frameworks, making agent discovery unreliable. A single-line description is a best practice that ensures consistent behavior across tools.",
source: "Lesson 5: Hiring Specialists"
},
{
question: "What is the key difference between SMTP App Password and OAuth for Gmail MCP?",
options: ["App Password is free; OAuth requires a paid Google Workspace subscription", "App Password gives send-only access via SMTP and takes 2 minutes to set up; OAuth gives full Gmail API access (read, search, labels, draft, send) and takes about 10 minutes", "App Password works on Windows only; OAuth works on all platforms", "App Password is more secure because it uses two-factor authentication"],
correctOption: 1,
explanation: "App Password provides SMTP send-only access in about 2 minutes of setup. OAuth provides full Gmail API access (read, search, labels, draft, send) in about 10 minutes, requiring a Google Cloud project.",
source: "Lesson 6: Granting Email Access"
},
{
question: "According to the chapter's safety protocols, which email types should ALWAYS go through draft review before sending?",
options: ["Only emails containing attachments larger than 5 MB", "Emails to new contacts and bulk sends — these should never auto-send without human review", "All emails regardless of recipient, with no exceptions", "Only emails written in a language other than English"],
correctOption: 1,
explanation: "Emails to new contacts (people not in your known contacts list) and bulk sends should always go through draft review. Known contacts with 3+ email exchanges in 90 days can auto-approve.",
source: "Lesson 6: Granting Email Access"
},
{
question: "How does the Bronze Capstone master skill (email-assistant) delegate work to its components?",
options: ["It copies the full email content into each component's directory and waits for file changes", "It analyzes the user's intent, selects the appropriate workflow mode (triage, suggest, draft, send), and invokes the right combination of skills, subagents, and MCP tools for that mode", "It sends HTTP requests to each component's REST API endpoint", "It runs all components in parallel and merges their outputs into a single response"],
correctOption: 1,
explanation: "The master skill interprets the user's intent, selects the appropriate workflow mode (triage, suggest, draft, or send), then invokes the right combination of component skills, subagents, and Gmail MCP tools. It coordinates rather than does work itself.",
source: "Lesson 7: Bronze Capstone"
},
{
question: "What does MCP (Model Context Protocol) provide that direct API calls do not?",
options: ["Faster network speeds through protocol-level compression", "A standardized interface so Claude Code can discover and use tools from any MCP server without custom integration code for each service", "Automatic encryption of all data transmitted between Claude and external services", "Built-in rate limiting that prevents API quota exhaustion"],
correctOption: 1,
explanation: "MCP provides a standardized protocol for tool discovery and invocation. Any MCP-compatible server exposes its tools in a uniform way, so Claude Code can use Gmail MCP, filesystem MCP, or any future server without custom integration code per service.",
source: "Lesson 6: Granting Email Access"
},
{
question: "What are the three methods every watcher implements according to the spec?",
options: ["start(), stop(), and restart()", "connect(), listen(), and disconnect()", "check_for_updates(), create_action_file(item), and run()", "init(), process(), and cleanup()"],
correctOption: 2,
explanation: "Every watcher implements check*for_updates() to poll the external source, create_action_file(item) to write a markdown file in /Needs_Action/, and run() for the infinite check-sleep loop.",
source: "Lesson 8: Your Employee's Senses"
},
{
question: "Why does the Gmail watcher use poll-based checking (check every N seconds) instead of event-based push notifications?",
options: ["Gmail does not support any form of push notifications", "Poll-based watching is simpler to implement, works without webhook infrastructure, and runs locally without exposing a public endpoint — important for a personal tool on your laptop", "Event-based systems are slower than polling for email workloads", "Poll-based checking uses less bandwidth than maintaining a persistent WebSocket connection"],
correctOption: 1,
explanation: "Poll-based watching is simpler (no webhook server), works locally (no public endpoint), and runs on your laptop without infrastructure. Event-based push requires exposing a public URL, which is impractical for a personal tool.",
source: "Lesson 8: Your Employee's Senses"
},
{
question: "What happens when a human moves an approval request file to the /Rejected/ folder?",
options: ["Claude Code automatically deletes the rejected file and all related data", "The AI employee retries the action with modified parameters", "The action is cancelled — Claude Code moves the file to /Done/ with a REJECTED* prefix, logs the denial, and does not execute the requested action", "The file is forwarded to a backup approver for a second opinion"],
correctOption: 2,
explanation: "Moving a file to /Rejected/ cancels the action. Claude Code moves the rejected file to /Done/ with a REJECTED\_ prefix, logs it as denied, and does not execute the requested action. The prefixed file in /Done/ serves as the audit record.",
source: "Lesson 9: Trust But Verify"
},
{
question: "According to the spec's permission boundaries table, name two action categories that should ALWAYS require human approval.",
options: ["Reading files and searching emails", "Creating plans and updating the dashboard", "Payments to new payees (or over $100) and social media replies or DMs", "Scheduling cron jobs and restarting watcher processes"],
correctOption: 2,
explanation: "The permission boundaries table specifies that payments to new payees or over $100 always require approval, as do social media replies and DMs. Email to known contacts and file creation can auto-approve.",
source: "Lesson 9: Trust But Verify"
},
{
question: "What two PM2 commands make your watcher processes survive a system reboot?",
options: ["pm2 start and pm2 restart", "pm2 save and pm2 startup", "pm2 enable and pm2 persist", "pm2 daemon and pm2 autostart"],
correctOption: 1,
explanation: "pm2 save saves the current process list so PM2 knows what to restart. pm2 startup generates a system startup script so PM2 launches automatically after reboot. Together they make processes persistent.",
source: "Lesson 10: Always On Duty"
},
{
question: "What three data sources does the CEO Briefing skill read to generate the Monday morning report?",
options: ["Gmail inbox, calendar events, and browser history", "Business_Goals.md, the /Done/ folder, and the /Logs/ folder", "CLAUDE.md, AGENTS.md, and Dashboard.md", "GitHub commits, Slack messages, and Jira tickets"],
correctOption: 1,
explanation: "The CEO Briefing reads Business_Goals.md (your objectives and KPI thresholds), the /Done/ folder (completed tasks this week), and /Logs/ (financial data and transaction history) to generate the Monday morning report.",
source: "Lesson 11: Silver Capstone"
},
{
question: "What is the difference between transient errors and authentication errors in the spec's error handling table?",
options: ["Transient errors are bugs in your code; authentication errors are bugs in the API", "Transient errors (network timeout, rate limit) recover automatically with exponential backoff retry; authentication errors (expired token, revoked access) require alerting the human and pausing operations", "Transient errors affect only email operations; authentication errors affect all domains", "Transient errors happen during development; authentication errors happen only in production"],
correctOption: 1,
explanation: "Transient errors (network timeout, API rate limit) are temporary and recover with exponential backoff retry. Authentication errors (expired token, revoked access) require human intervention: alert the human and pause operations until credentials are refreshed.",
source: "Lesson 12: Gold Capstone"
},
{
question: "According to the spec, what fields must every audit log entry contain?",
options: ["filename, size, encoding, and checksum", "timestamp, action_type, actor, target, parameters, approval_status, and result", "user_id, session_id, ip_address, and browser", "date, description, and category"],
correctOption: 1,
explanation: "Every audit log entry must contain timestamp, action_type, actor, target, parameters, approval_status, and result. Logs are stored as JSON in /Vault/Logs/YYYY-MM-DD.json with 90-day minimum retention.",
source: "Lesson 12: Gold Capstone"
},
{
question: "If the Gmail API goes down, what should the AI employee do according to the spec?",
options: ["Switch to a backup email provider and continue sending", "Alert the human immediately and shut down all operations", "Queue outgoing emails locally and process them when the service is restored", "Retry the Gmail connection every 5 seconds until it recovers"],
correctOption: 2,
explanation: "Queue outgoing emails locally and process them when the service is restored. The spec explicitly states: never retry payments automatically, but email queuing is safe. Watchers continue collecting items for later processing even when Claude Code or APIs are unavailable.",
source: "Lesson 0: Complete Specification"
},
{
question: "Describe the correct sequence when a watcher detects a new urgent email and the employee needs to send a payment in response.",
options: ["Watcher sends payment directly via banking API, then logs the result", "Watcher creates an action file in /Needs_Action/ with email details; Claude Code reads it, reasons about the required payment, and creates an approval request in /Pending_Approval/; human reviews and moves it to /Approved/; Claude Code reads the approval and executes the payment via MCP; the action is logged in /Logs/", "Claude Code monitors Gmail directly, detects the email, processes the payment, and writes a summary to /Done/", "Watcher sends the email to Claude Code via API call; Claude Code responds with a payment command; the watcher executes the payment"],
correctOption: 1,
explanation: "The full pipeline: Watcher detects urgent email and deposits an action file in /Needs_Action/. Claude Code reads it, reasons about the payment need, and writes an approval request to /Pending_Approval/. The human reviews and moves it to /Approved/. Claude Code reads the approval and executes payment via MCP. The action is logged in /Logs/. Every sensitive action flows through this Perception-Reasoning-Approval-Action-Logging sequence.",
source: "Lesson 12: Gold Capstone"
}
]}
/>

## Try With AI

**Prompt 1: Generate your own review questions**

```
I just completed Chapter 13 (Build Your First AI Employee).
Read my vault's AGENTS.md and CLAUDE.md, then generate 5 new
quiz questions about MY specific implementation — not generic
questions, but ones that test whether I truly understand how
my own employee is configured.
```

**What you are practicing**: Turning AI into a personalized assessor. Generic quizzes test textbook knowledge; AI-generated questions based on your actual vault test applied understanding.

**Prompt 2: Identify your weakest concept**

```
Here are the Chapter 13 topics I got wrong on the assessment:
[paste your wrong answers]. For each one, explain the concept
in a different way than the textbook did, and give me a
concrete scenario where getting it wrong would cause a real
problem in my AI employee.
```

**What you are practicing**: Using AI as a targeted tutor. Instead of re-reading entire lessons, you direct AI to the exact gaps in your understanding and ask for alternative explanations with real-world consequences.
