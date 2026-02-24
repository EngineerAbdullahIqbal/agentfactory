---
sidebar_position: 9
title: "Trust But Verify"
sidebar_label: "L09: Trust But Verify"
description: "Implement Human-in-the-Loop approval workflows so your AI employee pauses before sensitive actions. Build folder-based approval gates, permission boundaries, and a Python watcher that processes approved requests."
keywords:
  - Human-in-the-Loop
  - HITL
  - approval workflow
  - permission boundaries
  - sensitive actions
  - governance
  - AI safety
  - autonomous agent safety
chapter: 13
lesson: 9
duration_minutes: 30
tier: "Silver"

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 2"
layer_progression: "L2 (AI Collaboration) - Designing governance patterns with AI assistance"
layer_1_foundation: "Understanding permission boundaries, approval request format, folder-based workflows"
layer_2_collaboration: "Co-designing permission rules, iterating on approval formats, testing edge cases with AI"
layer_3_intelligence: "N/A (governance pattern, not intelligence design)"
layer_4_capstone: "N/A"

# HIDDEN SKILLS METADATA
skills:
  - name: "Permission Boundary Design"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Evaluate"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can define appropriate auto-approve vs require-approval thresholds for different action categories"
  - name: "Approval Request Format"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can create properly formatted YAML-frontmatter approval request files with all required metadata"
  - name: "Folder-Based Workflow Implementation"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can implement and test the Pending_Approval to Approved/Rejected to Done workflow"
  - name: "Approval Watcher Script"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Programming"
    measurable_at_this_level: "Student can run the approval watcher and verify it processes approved files correctly"

learning_objectives:
  - objective: "Define permission boundaries that separate auto-approved actions from those requiring human review"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student produces a permission table covering at least 4 action categories with justified thresholds"
  - objective: "Create approval request files with YAML frontmatter containing action, target, reason, and expiry"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student creates a valid approval request file that includes all required metadata fields"
  - objective: "Implement folder-based approval workflow with Pending_Approval, Approved, Rejected, and Done directories"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student demonstrates the full file movement cycle: create request, move to Approved, verify processing"
  - objective: "Run and test an approval watcher script that processes approved requests and logs results"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student runs the watcher, moves a file to Approved, and verifies log output and file archival in Done"
  - objective: "Test rejection flow to verify that rejected requests are logged but never executed"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student moves a file to Rejected and confirms the watcher does not process it"

cognitive_load:
  new_concepts: 5
  assessment: "5 concepts (permission boundaries, approval request format, folder workflow, approval watcher, rejection handling) - within B1 limit of 7-10 concepts, building on L08's file-based communication pattern"

differentiation:
  extension_for_advanced: "Add expiry handling (auto-reject expired requests), escalation rules (notify if pending > 24h), and integrate with the L07 orchestrator's action dispatch"
  remedial_for_struggling: "Focus on a single action type (email only) and test the folder workflow manually before running the watcher script"

teaching_guide:
  lesson_type: "hands-on"
  session_group: 4
  session_title: "Human-in-the-Loop Safety"
  key_points:
    - "Permission boundaries are the governance layer that makes autonomous operation trustworthy — without them, watchers from L08 would trigger unrestricted actions; this lesson adds the safety gate that L12 Gold Capstone wires into the full orchestrator"
    - "Folder-based workflow (/Pending_Approval/ -> /Approved/ or /Rejected/ -> /Done/) extends L08's file-based communication pattern from detection to governance — same mechanism, different purpose"
    - "The approval watcher is a polling script (not watchdog-based) because human approval is measured in minutes, not milliseconds — this is a deliberate design choice students should understand"
    - "Rejection testing is equally important as approval testing — the REJECTED_ prefix on archived files creates an audit trail that proves sensitive actions were NOT executed"
  misconceptions:
    - "Students confuse /Pending_Approval/ with /Needs_Action/ — Needs_Action is for INCOMING items detected by watchers (L08), Pending_Approval is for OUTGOING actions the employee wants to take but needs human sign-off for"
    - "Students assume all actions need approval — the permission boundaries table explicitly defines auto-approve thresholds (emails to known contacts, payments under $50 to recurring payees), and the lesson's Trust Spectrum diagram shows this is a continuum, not binary"
    - "Students think HITL means the AI is not trusted — frame it as delegation levels: a junior employee handles routine tasks independently but escalates sensitive decisions, exactly like a real workplace"
    - "Students expect the approval watcher to execute real actions (send emails, make payments) — emphasize it only LOGS and ARCHIVES; the Safety Note at the end explains that connecting to real services is a production concern"
  discussion_prompts:
    - "The permission table says payments under $50 to recurring payees auto-approve. Where would YOU set the threshold for your business, and what factors change that number?"
    - "Why does the approval request include an expiry field? What should happen when a request expires — auto-reject, escalate, or something else?"
    - "Your employee has watchers (L08) detecting new files and emails. Without the approval gate from this lesson, what could go wrong when a watcher triggers an action on a misidentified file?"
  teaching_tips:
    - "Start with the Trust Spectrum diagram (Full Auto to Full Manual) before the permission table — students need the mental model of a continuum before they see specific thresholds"
    - "Demo the folder workflow live in two terminals: run the watcher in one, move files in the other — the 5-second polling delay creates a tangible 'will it catch it?' moment that keeps students engaged"
    - "Have students draft their OWN permission boundaries BEFORE showing the provided table — the gap between their intuition and the structured table reveals how context-dependent governance rules are"
    - "When testing rejection, have students check BOTH the log file AND the Done/ folder — seeing REJECTED_NOT_EXECUTED in the log and the REJECTED_ prefix on the filename reinforces that two separate audit mechanisms confirm no action was taken"
  assessment_quick_check:
    - "What is the difference between /Needs_Action/ (L08) and /Pending_Approval/ (this lesson) — which direction does information flow in each?"
    - "Name two actions from the permission table that auto-approve and explain what condition makes them safe to auto-approve"
    - "A rejected payment request ends up in Done/ — how can you tell from the filename and log file that it was rejected and NOT executed?"

# Generation metadata
generated_by: "content-implementer v1.0.0"
created: "2026-02-19"
version: "1.0.0"
---

# Trust But Verify

In L08, you gave your employee senses -- watchers that detect new emails and files arriving. Now your employee notices things on its own. But noticing and _acting_ are different responsibilities. A junior employee can schedule meetings and order office supplies without asking. But signing contracts, approving expenses over a threshold, or emailing the board? Those go through a manager. Your AI employee needs the same governance structure: clear boundaries defining what it can do autonomously and what requires your explicit sign-off.

You will build a **folder-based approval workflow** where your employee writes requests to a `/Pending_Approval/` folder, waits for you to move them to `/Approved/` or `/Rejected/`, and only then acts (or logs the rejection). By the end, you will have a working safety gate that you can test end-to-end.

---

## The Trust Spectrum

Not every action carries the same risk. Reading a file is harmless. Deleting one could be catastrophic. The goal is not to approve _everything_ -- that defeats the purpose of automation. The goal is to draw the line in the right place.

```
Full Auto                                              Full Manual
  |------------|------------|------------|------------|
  Read files   Reply to     Send email   Delete       Wire
  Analyze      known        to new       files        payment
  Summarize    contacts     contacts     outside      to new
                                         vault        recipient
```

Your permission boundaries define where the line falls for each action category.

---

## Permission Boundaries

This table defines what your employee can do on its own versus what needs your sign-off. These boundaries go into your `AGENTS.md` file so every component in your system respects them.

| Action Category     | Auto-Approve                                      | Require Approval                                                      |
| ------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| **Email replies**   | To known contacts (3+ prior exchanges in 90 days) | New contacts, bulk sends, emails to executives                        |
| **Payments**        | Under $50 to recurring payees                     | All new payees, any amount over $100, any amount $50-100 to recurring |
| **Social media**    | Scheduled posts (pre-approved content calendar)   | Replies to comments, DMs, unscheduled posts                           |
| **File operations** | Create, read, copy within vault                   | Delete, move outside vault, rename shared files                       |
| **Calendar**        | Accept meetings during work hours                 | Decline meetings, reschedule, create meetings with external attendees |

Add this table to your `AGENTS.md`:

```markdown
## Permission Boundaries

| Action          | Auto-Approve             | Require Approval               |
| --------------- | ------------------------ | ------------------------------ |
| Email replies   | Known contacts           | New contacts, bulk, executives |
| Payments        | < $50 recurring payees   | New payees, > $100             |
| Social media    | Scheduled posts          | Replies, DMs                   |
| File operations | Create, read             | Delete, move outside vault     |
| Calendar        | Accept during work hours | Decline, reschedule, external  |

### Known Contact Definition

A "known contact" is someone you have exchanged 3+ emails with in the past
90 days AND whose address is in your contacts. Everyone else requires
draft review before sending.
```

**Output:**

After adding this to `AGENTS.md`, verify it saved correctly:

```bash
grep -A 2 "Permission Boundaries" ~/projects/ai-vault/AGENTS.md
```

```
## Permission Boundaries

| Action | Auto-Approve | Require Approval |
```

---

## The Approval Workflow

The workflow uses four folders. If you completed L08, you already have `/Needs_Action/`. Now add three more:

```
ai-vault/
├── Needs_Action/        ← Watchers deposit items here (L08)
├── Pending_Approval/    ← Employee requests approval here (NEW)
├── Approved/            ← You move files here to approve  (NEW)
├── Rejected/            ← You move files here to reject   (NEW)
├── Done/                ← Processed items archived here   (NEW)
└── Logs/                ← Execution logs stored here      (NEW)
```

Create the folders:

```bash
mkdir -p ~/projects/ai-vault/{Pending_Approval,Approved,Rejected,Done,Logs}
```

**Output:**

```bash
ls ~/projects/ai-vault/
```

```
Approved/  Done/  Logs/  Needs_Action/  Pending_Approval/  Rejected/
```

The flow works like this:

```
Employee detects sensitive action
        │
        ▼
Writes request to /Pending_Approval/
        │
        ▼
Human reviews the request
        │
   ┌────┴────┐
   ▼         ▼
/Approved/  /Rejected/
   │         │
   ▼         ▼
Execute    Log rejection
   │       (no action taken)
   ▼
/Done/
(archived with log)
```

---

## Approval Request Format

Each approval request is a Markdown file with YAML frontmatter. The frontmatter contains structured metadata that a script can parse. The body contains human-readable context.

Create a sample approval request to test the workflow:

```bash
cat > ~/projects/ai-vault/Pending_Approval/EMAIL_client_response_2026-01-15.md << 'EOF'
---
type: approval_request
action: send_email
target: "new-client@example.com"
subject: "Project Proposal - Q1 Engagement"
reason: "New client contact requesting project proposal. Not in known contacts list."
created: "2026-01-15T10:30:00Z"
expires: "2026-01-16T10:30:00Z"
status: pending
---

## Proposed Action

Send email to new-client@example.com with subject "Project Proposal - Q1 Engagement"

## Draft Content

Hi Alex,

Thank you for your interest in our services. I have attached our standard
project proposal for Q1 engagement. The key deliverables include...

[Draft continues]

## Why This Needs Approval

This is a NEW contact (first email exchange). Per permission boundaries,
emails to new contacts require human review before sending.

## To Approve

Move this file to the /Approved/ folder.

## To Reject

Move this file to the /Rejected/ folder.
EOF
```

**Output:**

Verify the file was created:

```bash
ls ~/projects/ai-vault/Pending_Approval/
```

```
EMAIL_client_response_2026-01-15.md
```

Read the frontmatter to confirm the structure:

```bash
head -10 ~/projects/ai-vault/Pending_Approval/EMAIL_client_response_2026-01-15.md
```

```
---
type: approval_request
action: send_email
target: "new-client@example.com"
subject: "Project Proposal - Q1 Engagement"
reason: "New client contact requesting project proposal. Not in known contacts list."
created: "2026-01-15T10:30:00Z"
expires: "2026-01-16T10:30:00Z"
status: pending
---
```

**Required frontmatter fields:**

| Field     | Purpose                        | Example                                                |
| --------- | ------------------------------ | ------------------------------------------------------ |
| `type`    | Always `approval_request`      | `approval_request`                                     |
| `action`  | What the employee wants to do  | `send_email`, `payment`, `delete_file`                 |
| `target`  | Who or what is affected        | `client@example.com`, `Vendor Inc`, `/reports/q4.xlsx` |
| `reason`  | Why this action is needed      | `New client, not in known contacts`                    |
| `created` | When the request was generated | ISO 8601 timestamp                                     |
| `expires` | When the request becomes stale | ISO 8601 timestamp (typically 24h later)               |
| `status`  | Current state                  | `pending`, `approved`, `rejected`                      |

---

## Building the Approval Watcher

The approval watcher is a Python script that monitors the `/Approved/` folder. When you move a file there, the watcher detects it, logs the action, and moves the file to `/Done/`.

Create the watcher script:

```python
#!/usr/bin/env python3
"""
Approval Watcher - monitors /Approved/ folder for approved actions.

Workflow:
1. Scans /Approved/ for .md files
2. Logs each approved action with timestamp
3. Moves processed files to /Done/
4. Repeats every 5 seconds

Also scans /Rejected/ to log rejections (no action taken).
"""

import time
import datetime
import shutil
from pathlib import Path

# Configure paths relative to your vault
VAULT = Path.home() / "projects" / "ai-vault"
APPROVED_DIR = VAULT / "Approved"
REJECTED_DIR = VAULT / "Rejected"
DONE_DIR = VAULT / "Done"
LOGS_DIR = VAULT / "Logs"


def log_action(filename: str, status: str, details: str = "") -> None:
    """Append a timestamped entry to today's log file."""
    log_file = LOGS_DIR / f"{datetime.date.today()}.log"
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] {status}: {filename}"
    if details:
        entry += f" | {details}"
    with open(log_file, "a") as f:
        f.write(entry + "\n")
    print(entry)


def process_approved() -> None:
    """Process all files in /Approved/ directory."""
    for filepath in APPROVED_DIR.glob("*.md"):
        log_action(filepath.name, "APPROVED_AND_EXECUTED")
        # Move to Done
        dest = DONE_DIR / filepath.name
        shutil.move(str(filepath), str(dest))
        print(f"  -> Archived to Done/{filepath.name}")


def process_rejected() -> None:
    """Log all files in /Rejected/ directory (no action taken)."""
    for filepath in REJECTED_DIR.glob("*.md"):
        log_action(filepath.name, "REJECTED_NOT_EXECUTED")
        # Move to Done (with rejection prefix for audit trail)
        dest = DONE_DIR / f"REJECTED_{filepath.name}"
        shutil.move(str(filepath), str(dest))
        print(f"  -> Archived to Done/REJECTED_{filepath.name}")


def main() -> None:
    """Main loop: ensure directories exist, then poll."""
    for d in [APPROVED_DIR, REJECTED_DIR, DONE_DIR, LOGS_DIR]:
        d.mkdir(parents=True, exist_ok=True)

    print(f"[HITL Watcher] Monitoring:")
    print(f"  Approved: {APPROVED_DIR}")
    print(f"  Rejected: {REJECTED_DIR}")
    print(f"  Logs:     {LOGS_DIR}")
    print(f"  Archive:  {DONE_DIR}")
    print(f"  Polling every 5 seconds. Press Ctrl+C to stop.\n")

    while True:
        process_approved()
        process_rejected()
        time.sleep(5)


if __name__ == "__main__":
    main()
```

**Why polling instead of watchdog?** The approval workflow doesn't need sub-second response times. A 5-second polling loop is simpler to debug and sufficient for human-paced approvals.

Save this as `approval_watcher.py` in your vault:

```bash
# Save the script (copy the code above into this file)
nano ~/projects/ai-vault/approval_watcher.py
```

**Output:**

Verify the script exists:

```bash
ls -la ~/projects/ai-vault/approval_watcher.py
```

```
-rw-r--r--  1 user  staff  1847 Jan 15 10:45 approval_watcher.py
```

---

## Testing the Full Approval Cycle

This is the critical test. You will run the watcher, approve a request, and verify every step.

### Step 1: Start the Watcher

Open a terminal and run:

```bash
python3 ~/projects/ai-vault/approval_watcher.py
```

**Output:**

```
[HITL Watcher] Monitoring:
  Approved: /Users/you/projects/ai-vault/Approved
  Rejected: /Users/you/projects/ai-vault/Rejected
  Logs:     /Users/you/projects/ai-vault/Logs
  Archive:  /Users/you/projects/ai-vault/Done
  Polling every 5 seconds. Press Ctrl+C to stop.
```

The watcher is now running. Leave this terminal open.

### Step 2: Approve the Request

Open a **second terminal**. Move the approval request from `Pending_Approval` to `Approved`:

```bash
mv ~/projects/ai-vault/Pending_Approval/EMAIL_client_response_2026-01-15.md \
   ~/projects/ai-vault/Approved/
```

### Step 3: Verify Processing

Within 5 seconds, the watcher terminal shows:

**Output:**

```
[2026-01-15 10:32:15] APPROVED_AND_EXECUTED: EMAIL_client_response_2026-01-15.md
  -> Archived to Done/EMAIL_client_response_2026-01-15.md
```

### Step 4: Verify the Audit Trail

Check that the file moved to `/Done/`:

```bash
ls ~/projects/ai-vault/Done/
```

**Output:**

```
EMAIL_client_response_2026-01-15.md
```

Check the log entry:

```bash
cat ~/projects/ai-vault/Logs/$(date +%Y-%m-%d).log
```

**Output:**

```
[2026-01-15 10:32:15] APPROVED_AND_EXECUTED: EMAIL_client_response_2026-01-15.md
```

Confirm `/Approved/` is now empty:

```bash
ls ~/projects/ai-vault/Approved/
```

**Output:**

```
(empty - file has been processed and archived)
```

---

## Testing the Rejection Flow

Rejection testing is equally important. The system must provably NOT execute a rejected action.

### Step 1: Create a Second Approval Request

```bash
cat > ~/projects/ai-vault/Pending_Approval/PAYMENT_vendor_2026-01-15.md << 'EOF'
---
type: approval_request
action: payment
target: "unknown-vendor@billing.com"
amount: 750.00
reason: "Invoice received from new vendor. Not in approved payees list."
created: "2026-01-15T11:00:00Z"
expires: "2026-01-16T11:00:00Z"
status: pending
---

## Proposed Action

Send payment of $750.00 to unknown-vendor@billing.com

## Why This Needs Approval

New payee (never paid before) AND amount exceeds $100 threshold.
Both conditions require human approval per permission boundaries.

## To Approve

Move this file to the /Approved/ folder.

## To Reject

Move this file to the /Rejected/ folder.
EOF
```

### Step 2: Reject the Request

Move it to `/Rejected/`:

```bash
mv ~/projects/ai-vault/Pending_Approval/PAYMENT_vendor_2026-01-15.md \
   ~/projects/ai-vault/Rejected/
```

### Step 3: Verify Rejection Was Logged

The watcher terminal shows:

**Output:**

```
[2026-01-15 11:01:20] REJECTED_NOT_EXECUTED: PAYMENT_vendor_2026-01-15.md
  -> Archived to Done/REJECTED_PAYMENT_vendor_2026-01-15.md
```

### Step 4: Verify No Action Was Taken

Check the log file -- it should show `REJECTED_NOT_EXECUTED`, confirming no payment was sent:

```bash
cat ~/projects/ai-vault/Logs/$(date +%Y-%m-%d).log
```

**Output:**

```
[2026-01-15 10:32:15] APPROVED_AND_EXECUTED: EMAIL_client_response_2026-01-15.md
[2026-01-15 11:01:20] REJECTED_NOT_EXECUTED: PAYMENT_vendor_2026-01-15.md
```

Check the `Done` folder -- rejected files are prefixed with `REJECTED_` for audit clarity:

```bash
ls ~/projects/ai-vault/Done/
```

**Output:**

```
EMAIL_client_response_2026-01-15.md
REJECTED_PAYMENT_vendor_2026-01-15.md
```

The `REJECTED_` prefix makes it immediately visible during audits which items were declined.

---

## Connecting to Your Orchestrator

You will integrate HITL with your full orchestrator pipeline in L12 (Gold Capstone). For now, your approval watcher works independently -- test it by manually creating approval requests in `/Pending_Approval/`, moving them to `/Approved/` or `/Rejected/`, and verifying the watcher processes them correctly. The workflow you built in this lesson is the complete safety gate; L12 connects it to the orchestrator so your employee writes approval requests automatically when it detects a sensitive action.

---

## Troubleshooting

| Problem                              | Cause                                       | Fix                                                                                             |
| ------------------------------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Watcher does not detect files        | Wrong directory path                        | Verify `VAULT` path matches your actual vault location with `echo $HOME/projects/ai-vault`      |
| Permission denied on file move       | File permissions                            | Run `chmod 644` on the approval request file                                                    |
| Log file not created                 | `Logs/` directory missing                   | The watcher creates it automatically on startup, but verify with `ls ~/projects/ai-vault/Logs/` |
| Watcher crashes on startup           | Python path issue                           | Use `python3` explicitly, not `python`                                                          |
| Files in Pending but never processed | Files must be moved to Approved or Rejected | The watcher only monitors Approved and Rejected, not Pending                                    |

---

## Try With AI

**Setup:** Have your approval watcher running and your vault folders created.

**Prompt 1: Design Your Permission Boundaries**

```
I am building a Personal AI Employee that handles these domains:
- Email (Gmail)
- File management (local vault)
- Calendar (Google Calendar)
- Social media (LinkedIn posts)

Help me design permission boundaries for each domain. For each action
category, define:
1. What should auto-approve (routine, low-risk)
2. What should require my approval (sensitive, irreversible)
3. Where the threshold is and why

Present it as a table I can add to my AGENTS.md file.
```

**What you're learning:** Designing permission boundaries requires thinking about YOUR specific risk tolerance. The AI will suggest reasonable defaults, but you will likely want to adjust thresholds based on your domain. Notice where AI's suggestions feel too permissive or too restrictive -- that friction reveals where your context matters most.

**Prompt 2: Generate Approval Request Templates**

```
I need approval request templates for three sensitive actions
my AI employee might encounter:

1. Sending an email to someone I have never emailed before
2. Deleting a file that is older than 30 days
3. Posting a reply to a LinkedIn comment

For each, create a complete approval request file with YAML
frontmatter (type, action, target, reason, created, expires, status)
and a human-readable body explaining what the employee wants to do
and why it needs approval. Save them to my /Pending_Approval/ folder.
```

**What you're learning:** Approval request templates need enough context for you to make a quick decision. If the request is vague ("wants to send an email"), you have to investigate. If it is specific ("wants to send project proposal to new-client@example.com because they requested it via the contact form"), you can approve in seconds. You are learning to design for fast human review, not just any review.

**Safety Note:** The approval watcher in this lesson logs and archives but does not execute real actions (no actual emails sent, no payments processed). In a production system, the `process_approved` function would call the appropriate MCP tool. Always test with logging-only mode before connecting to real services.
