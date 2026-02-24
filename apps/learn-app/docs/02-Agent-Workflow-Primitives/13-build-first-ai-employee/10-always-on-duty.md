---
sidebar_position: 10
title: "Always On Duty"
sidebar_label: "L10: Always On Duty"
description: "Configure your AI employee to run 24/7 using PM2 for crash recovery, cron for scheduled tasks, and Claude Code Stop hooks for persistent multi-step work."
keywords:
  - PM2
  - cron
  - process management
  - Stop hook
  - always-on
  - scheduled tasks
  - crash recovery
  - Ralph Wiggum loop
chapter: 13
lesson: 10
duration_minutes: 30
tier: "Silver"

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 1 to Layer 2"
layer_progression: "L1 (Manual Foundation) -> L2 (AI Collaboration)"
layer_1_foundation: "Understanding cron syntax, PM2 basics, process lifecycle, Stop hooks"
layer_2_collaboration: "Using AI to configure schedules, troubleshoot processes, and design Stop hook logic"
layer_3_intelligence: "N/A (operations, not intelligence)"
layer_4_capstone: "N/A"

# HIDDEN SKILLS METADATA
skills:
  - name: "PM2 Process Management"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Programming"
    measurable_at_this_level: "Student can start, monitor, and persist processes with PM2 across reboots"
  - name: "Cron Scheduling"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Programming"
    measurable_at_this_level: "Student can write cron expressions and verify scheduled task execution"
  - name: "Claude Code Stop Hook"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can implement a Stop hook that keeps Claude iterating until a task condition is met"
  - name: "Graceful Degradation"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can describe queue-based fallback when a component fails"

learning_objectives:
  - objective: "Use PM2 to keep watcher processes running persistently across terminal closes and reboots"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Watcher survives kill -9 and pm2 list shows it restarted"
  - objective: "Configure cron jobs for scheduled Claude Code tasks and verify execution"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Cron entry triggers a script at a specified time and produces a log file"
  - objective: "Implement a Claude Code Stop hook that keeps Claude iterating until task files are processed"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Stop hook prevents Claude from stopping while tasks remain in Needs_Action"
  - objective: "Distinguish between scheduled, continuous, and project-based operation modes"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student correctly matches each operation type to its trigger mechanism"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (PM2 lifecycle, cron syntax, Stop hooks, operation modes) - within A2 limit with PM2/cron at foundation level"

differentiation:
  extension_for_advanced: "Add Slack/email alerts for PM2 crashes; implement a dead-letter queue for failed tasks"
  remedial_for_struggling: "Start with cron only (simpler than PM2); skip Stop hooks until comfortable with process management"

teaching_guide:
  lesson_type: "hands-on"
  session_group: 4
  session_title: "Operations - Always-On Infrastructure"
  key_points:
    - "Three distinct operation modes solve three distinct problems: PM2 for continuous (watchers from L08), cron for scheduled (daily briefing), Stop hooks for project-based (batch processing) - students must match each mode to its use case"
    - "PM2's 'pm2 save && pm2 startup' is the single most skipped step - without both commands, processes vanish on reboot and students blame PM2 instead of their setup"
    - "The Stop hook's exit code 2 is the only thing that distinguishes 'keep going' from 'stop' - exit 1 is silently ignored, which causes the most common debugging headache in this lesson"
    - "This lesson completes the Silver tier stack: L08 watchers detect work, L09 HITL gates sensitive actions, L10 ensures the whole system runs without a human babysitting it - all three feed into the CEO Briefing capstone in L11"
  misconceptions:
    - "Students think cron and PM2 do the same thing - cron fires a task at a scheduled time and exits (like an alarm clock), PM2 keeps a process alive continuously and restarts it on crash (like a watchdog)"
    - "Students skip 'pm2 startup' after running 'pm2 save' and wonder why processes disappear after reboot - both commands are required, and the sudo command PM2 outputs must actually be executed"
    - "Students use exit code 1 in their Stop hook expecting it to keep Claude going - exit 1 is a non-blocking error that Claude ignores, only exit 2 triggers continuation"
    - "Students think always-on requires a cloud server - for personal use, their laptop with PM2 and cron is sufficient; the L11 capstone runs entirely on local infrastructure"
  discussion_prompts:
    - "In L09 you built approval gates for sensitive actions. Now those gates run 24/7. What new risks does always-on operation introduce that HITL alone does not cover?"
    - "If you had to choose between scheduled operations (cron) and continuous operations (PM2/watchers) for your first deployment, which would deliver more immediate value for YOUR workflow?"
    - "The Stop hook has a MAX_ITERATIONS safety valve set to 10. What would happen without it, and how would you decide the right number for a batch of 50 expense reports?"
  teaching_tips:
    - "Demo PM2 crash recovery live: start the file watcher, run 'kill -9' on it, then immediately run 'pm2 list' to show the restart count incrementing - this 30-second demo is worth more than any explanation"
    - "Cron syntax is notoriously confusing - open crontab.guru on the projector and have students build expressions interactively before touching the command line"
    - "Connect explicitly to L08: the file_watcher.py in this lesson IS the watcher from L08, now made persistent - show students the evolution from 'runs until I close my terminal' to 'runs forever'"
    - "For the Stop hook, walk through the exit code logic on a whiteboard BEFORE showing the script: draw the loop (Claude responds -> hook fires -> check tasks -> exit 0 or 2) so students see the control flow before reading bash"
  assessment_quick_check:
    - "Write a cron expression for 'every weekday at 8 AM' and explain each of the five fields"
    - "What two PM2 commands make a process survive a system reboot, and why is order important?"
    - "Your Stop hook uses 'exit 1' but Claude keeps stopping after one task. What is wrong and what exit code should you use?"

# Generation metadata
generated_by: "content-implementer"
created: "2026-02-19"
version: "1.0.0"
---

# Always On Duty

In Lesson 8, you gave your employee senses -- watchers that detect new emails and files. In Lesson 9, you added safety gates so it asks permission before taking sensitive actions. But there is a gap: when you close your terminal, your watchers die. You leave for dinner, and eight hours of emails pile up unprocessed. Your employee is capable but fragile.

This lesson makes your employee resilient. You will set up three operation modes that cover every scenario: PM2 keeps your watchers alive through crashes and reboots, cron triggers scheduled tasks like a daily briefing, and a Claude Code Stop hook lets Claude persist through multi-step work without quitting early.

---

## Three Operation Modes

Your employee needs different trigger mechanisms for different kinds of work.

| Operation Type    | Example Task                 | Trigger Mechanism            | Runs For                           |
| ----------------- | ---------------------------- | ---------------------------- | ---------------------------------- |
| **Continuous**    | Watch inbox for new files    | PM2 + watchdog script        | Forever (until you stop it)        |
| **Scheduled**     | Daily briefing at 8:00 AM    | cron / Task Scheduler        | Seconds to minutes, then exits     |
| **Project-Based** | Process 3 months of expenses | Manual file drop + Stop hook | Until all task files are processed |

Each mode solves a different problem. PM2 keeps long-running processes alive. Cron wakes up a task at a specific time. Stop hooks keep Claude iterating on multi-step work until completion.

---

## Hands-On: PM2 for Continuous Operations

PM2 is a process manager for Node.js that works with any script -- including Python watchers. It restarts crashed processes, persists across reboots, and provides monitoring.

### Step 1: Install PM2

```bash
npm install -g pm2
```

**Output:**

```
added 1 package in 3s
```

Verify the installation:

```bash
pm2 --version
```

**Output:**

```
5.4.3
```

### Step 2: Start Your Watcher Under PM2

Use the `inbox_watcher.py` from L08 (or any Python script that runs continuously). If you don't have it, create the minimal version below:

```bash
mkdir -p ~/projects/ai-vault/scripts
```

Create `~/projects/ai-vault/scripts/file_watcher.py`:

```python
"""Minimal file watcher for PM2 testing."""
import time
import os

WATCH_DIR = os.path.expanduser("~/projects/ai-vault/Inbox")
os.makedirs(WATCH_DIR, exist_ok=True)

print(f"Watching {WATCH_DIR} for new files...")

seen = set()
while True:
    current = set(os.listdir(WATCH_DIR))
    new_files = current - seen
    for f in new_files:
        print(f"New file detected: {f}")
    seen = current
    time.sleep(5)
```

**Output (when run directly):**

```
Watching /Users/you/projects/ai-vault/Inbox for new files...
```

Now start it under PM2:

```bash
pm2 start ~/projects/ai-vault/scripts/file_watcher.py --name file-watcher --interpreter python3
```

**Output:**

```
[PM2] Starting /Users/you/projects/ai-vault/scripts/file_watcher.py in fork_mode (1 instance)
[PM2] Done.
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name         │ namespace   │ version │ mode    │ pid      │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ file-watcher │ default     │ N/A     │ fork    │ 12345    │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┘
```

### Step 3: Verify It Is Running

```bash
pm2 list
```

**Output:**

```
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┐
│ id  │ name         │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │
├─────┼──────────────┼─────────────┼─────────┼─────────┼─────────-┼────────┼──────┤
│ 0   │ file-watcher │ default     │ N/A     │ fork    │ 12345    │ 25s    │ 0    │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┘
```

Check the logs to confirm the watcher is producing output:

```bash
pm2 logs file-watcher --lines 5
```

**Output:**

```
[file-watcher] Watching /Users/you/projects/ai-vault/Inbox for new files...
```

### Step 4: Test Crash Recovery

Find the process ID and kill it forcefully:

```bash
pm2 pid file-watcher
```

**Output:**

```
12345
```

```bash
kill -9 $(pm2 pid file-watcher)
```

Now check PM2 immediately:

```bash
pm2 list
```

**Output:**

```
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┐
│ id  │ name         │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┤
│ 0   │ file-watcher │ default     │ N/A     │ fork    │ 12399    │ 2s     │ 1    │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┘
```

The restart count column shows `1` -- PM2 detected the crash and restarted your watcher automatically. The PID changed, confirming it is a new process.

### Step 5: Persist Across Reboots

This is the step most people skip, then wonder why everything disappears after a restart.

```bash
pm2 save
```

**Output:**

```
[PM2] Saving current process list...
[PM2] Successfully saved in /Users/you/.pm2/dump.pm2
```

```bash
pm2 startup
```

**Output (macOS):**

```
[PM2] Init System found: launchd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/local/bin pm2 startup launchd -u you --hp /Users/you
```

Copy and run the `sudo` command PM2 gives you. On Linux, it generates a systemd unit instead.

**After running the sudo command:**

```
[PM2] Writing init configuration in /Users/you/Library/LaunchAgents/pm2.you.plist
[PM2] Making script booting at startup...
```

Now your watcher survives reboots. The two commands to remember:

| Command       | What It Does                                               |
| ------------- | ---------------------------------------------------------- |
| `pm2 save`    | Saves current process list to disk                         |
| `pm2 startup` | Registers PM2 to start on boot and restore saved processes |

### Step 6: Monitoring

```bash
pm2 monit
```

This opens a real-time dashboard showing CPU, memory, and logs for all managed processes. Press `q` to exit.

---

## Hands-On: Cron for Scheduled Tasks

Cron runs tasks at specific times. Unlike PM2 (which keeps processes alive forever), cron starts a task, lets it run, and exits.

### Cron Syntax

A cron expression has five fields:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-7, 0 and 7 are Sunday)
│ │ │ │ │
* * * * *
```

Common patterns:

| Expression    | Meaning                  |
| ------------- | ------------------------ |
| `0 8 * * *`   | Every day at 8:00 AM     |
| `0 8 * * 1-5` | Every weekday at 8:00 AM |
| `0 20 * * 0`  | Every Sunday at 8:00 PM  |
| `*/5 * * * *` | Every 5 minutes          |

Use [crontab.guru](https://crontab.guru) to verify your expressions.

### Step 1: Create a Scheduled Task Script

Create a script that runs your daily vault audit:

```bash
mkdir -p ~/projects/ai-vault/scripts
```

Create `~/projects/ai-vault/scripts/daily_audit.sh`:

```bash
#!/bin/bash
# daily_audit.sh — Run a vault audit via Claude Code
LOG_DIR="$HOME/projects/ai-vault/logs"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date +%Y-%m-%d_%H%M)
LOG_FILE="$LOG_DIR/audit_${TIMESTAMP}.log"

echo "Starting daily audit at $(date)" > "$LOG_FILE"

# Run Claude Code in headless mode with a specific task
claude -p "Read my vault via mcp-obsidian. List any tasks in Needs_Action/ that are older than 24 hours. Summarize what needs attention." \
  --output-format text \
  >> "$LOG_FILE" 2>&1

echo "Audit complete at $(date)" >> "$LOG_FILE"
```

Make it executable:

```bash
chmod +x ~/projects/ai-vault/scripts/daily_audit.sh
```

Test it manually first:

```bash
~/projects/ai-vault/scripts/daily_audit.sh
```

**Output (check the log):**

```bash
cat ~/projects/ai-vault/logs/audit_*.log
```

```
Starting daily audit at Wed Feb 19 08:00:01 PST 2026
[Claude's response about vault status]
Audit complete at Wed Feb 19 08:01:23 PST 2026
```

### Step 2: Add to Crontab

```bash
crontab -e
```

Add this line for a daily audit at 8:00 AM:

```
0 8 * * * /Users/you/projects/ai-vault/scripts/daily_audit.sh
```

Replace `/Users/you` with your actual home directory path. Save and exit.

Verify it was saved:

```bash
crontab -l
```

**Output:**

```
0 8 * * * /Users/you/projects/ai-vault/scripts/daily_audit.sh
```

### Step 3: Test With a Near-Future Time

To verify cron works without waiting until tomorrow, set a temporary entry for 2 minutes from now:

```bash
# If current time is 14:30, set for 14:32
crontab -e
```

Add:

```
32 14 * * * /Users/you/projects/ai-vault/scripts/daily_audit.sh
```

Wait 2 minutes, then check:

```bash
ls -la ~/projects/ai-vault/logs/
```

If a new log file appeared, cron is working. Remove the test entry and restore your real schedule.

:::warning macOS Permissions
On macOS, cron needs Full Disk Access. Go to System Settings > Privacy & Security > Full Disk Access and add `/usr/sbin/cron`. Without this, your cron jobs may silently fail.
:::

---

## The Ralph Wiggum Loop: Stop Hooks for Persistent Work

PM2 keeps processes alive. Cron fires at scheduled times. But what about work that spans multiple Claude turns -- like processing a batch of 20 expense reports?

The **Stop hook** solves this. Claude Code has a hook system where scripts run at specific lifecycle points. The `Stop` hook fires every time Claude finishes responding. If your hook script exits with code 2, Claude does not stop -- it keeps going.

This creates a loop: Claude processes a task, tries to stop, the hook checks if more tasks remain, and if so, tells Claude to continue. The community calls this the "Ralph Wiggum loop" -- named after the Simpsons character who keeps going despite all signals to stop -- because Claude cheerfully persists until every task is done.

### How It Works

```
1. Claude starts processing tasks in /Needs_Action/
2. Claude finishes one task and tries to stop
3. Stop hook fires → checks /Needs_Action/ for remaining tasks
4. Tasks remain? → exit 2 (Claude continues)
5. All tasks done? → exit 0 (Claude stops)
6. Safety: max iterations prevent infinite loops
```

### Step 1: Create the Stop Hook Script

Create `~/projects/ai-vault/.claude/hooks/check_tasks.sh`:

```bash
#!/bin/bash
# check_tasks.sh — Stop hook for task persistence
# Exit 2 = keep going, Exit 0 = stop

TASK_DIR="$HOME/projects/ai-vault/Needs_Action"
MAX_ITERATIONS=10
ITERATION_FILE="/tmp/claude_task_iterations"

# Read the hook input from stdin (Claude Code sends JSON)
INPUT=$(cat)

# Track iterations to prevent infinite loops
current=$(cat "$ITERATION_FILE" 2>/dev/null || echo 0)
next=$((current + 1))
echo "$next" > "$ITERATION_FILE"

# Safety valve: stop after MAX_ITERATIONS regardless
if [ "$next" -ge "$MAX_ITERATIONS" ]; then
    echo "Max iterations ($MAX_ITERATIONS) reached. Stopping." >&2
    rm -f "$ITERATION_FILE"
    exit 0
fi

# Check if tasks remain in Needs_Action
if ls "$TASK_DIR"/*.md 1>/dev/null 2>&1; then
    REMAINING=$(ls "$TASK_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "Tasks remaining in Needs_Action: $REMAINING. Continue processing." >&2
    exit 2  # Exit 2 = tell Claude to keep going
fi

# All tasks complete
echo "All tasks processed. Stopping." >&2
rm -f "$ITERATION_FILE"
exit 0
```

Make it executable:

```bash
chmod +x ~/projects/ai-vault/.claude/hooks/check_tasks.sh
```

### Step 2: Configure the Hook in Settings

Edit `~/projects/ai-vault/.claude/settings.json` (create it if it does not exist):

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/check_tasks.sh",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

Key details:

- `$CLAUDE_PROJECT_DIR` resolves to your project root automatically
- The `Stop` event fires every time Claude finishes responding
- `timeout: 10` prevents the hook from hanging

Verify your hooks loaded correctly by checking Claude Code recognizes the configuration. If the hook does not trigger, double-check the JSON nesting -- a misplaced bracket will silently disable all hooks.

### Step 3: Test the Loop

Create some test task files:

```bash
mkdir -p ~/projects/ai-vault/Needs_Action

cat > ~/projects/ai-vault/Needs_Action/task-001.md << 'EOF'
# Summarize this email

From: alice@example.com
Subject: Q4 Budget Review

Please review the attached budget spreadsheet and flag any line items over $10,000.
EOF

cat > ~/projects/ai-vault/Needs_Action/task-002.md << 'EOF'
# Draft a reply

From: bob@example.com
Subject: Meeting Thursday

Bob wants to reschedule Thursday's meeting. Draft a polite reply suggesting Friday at 2 PM instead.
EOF
```

Start Claude Code from the vault:

```bash
cd ~/projects/ai-vault
claude
```

Give Claude the initial instruction:

```
Process all task files in Needs_Action/. For each task, read it, complete the requested action,
write the result to Done/, and move the original task file to Done/ as well.
```

Watch what happens:

1. Claude reads `task-001.md`, processes it, moves it to `Done/`
2. Claude tries to stop -- the Stop hook fires
3. Hook finds `task-002.md` still in `Needs_Action/` -- exits with code 2
4. Claude continues, processes `task-002.md`, moves it to `Done/`
5. Claude tries to stop again -- hook finds no tasks remaining -- exits with code 0
6. Claude stops

**Verify the results:**

```bash
ls ~/projects/ai-vault/Needs_Action/
```

**Output:**

```
(empty - all tasks processed)
```

```bash
ls ~/projects/ai-vault/Done/
```

**Output:**

```
task-001.md
task-002.md
task-001-result.md
task-002-result.md
```

### Safety: Max Iterations

The `MAX_ITERATIONS=10` guard prevents infinite loops. If Claude cannot complete a task (API failure, permission issue), the hook stops after 10 iterations rather than running forever. Adjust this number based on your typical batch size.

---

## Graceful Degradation

Real systems have components that fail. Your employee should queue work when something is down, not crash.

| Failure                      | What Happens                                   | Recovery                                                  |
| ---------------------------- | ---------------------------------------------- | --------------------------------------------------------- |
| Gmail API is down            | Watcher logs error, retries next polling cycle | Emails queue in Gmail until watcher reconnects            |
| Claude API unavailable       | Cron script logs failure, exits                | Next scheduled run retries; tasks stay in `Needs_Action/` |
| Obsidian not running         | MCP calls fail                                 | Watcher catches error, writes to local file instead       |
| PM2 process exits repeatedly | PM2 backs off exponentially                    | Check `pm2 logs` for the root cause                       |

The file-based architecture from L08 provides natural resilience: tasks in `Needs_Action/` are not lost when a component fails. They remain as files on disk, waiting to be processed when the system recovers.

---

## Troubleshooting

**PM2 says "command not found" after install:**

```bash
# Verify npm global bin is in your PATH
npm config get prefix
# Add to your shell profile if needed:
# export PATH="$PATH:$(npm config get prefix)/bin"
```

**Cron job does not fire:**

1. Check cron is running: `ps aux | grep cron`
2. On macOS: System Settings > Privacy & Security > Full Disk Access > add `/usr/sbin/cron`
3. Check system cron logs: `grep CRON /var/log/syslog` (Linux) or `log show --predicate 'process == "cron"' --last 1h` (macOS)
4. Ensure the script uses absolute paths (cron does not load your shell profile)

**Stop hook does not execute:**

1. Verify `.claude/settings.json` is valid JSON: `python3 -c "import json; json.load(open('.claude/settings.json'))"`
2. Check the script is executable: `ls -la .claude/hooks/check_tasks.sh`
3. Test the script manually: `echo '{}' | .claude/hooks/check_tasks.sh; echo "Exit: $?"`
4. Run Claude Code in debug mode: `claude --debug` to see hook execution details

**PM2 processes disappear after reboot:**
You forgot `pm2 startup`. Run both commands again:

```bash
pm2 save
pm2 startup
# Copy and run the sudo command PM2 outputs
```

---

## Platform Notes

| Platform    | PM2 Startup                             | Cron Alternative                       |
| ----------- | --------------------------------------- | -------------------------------------- |
| **macOS**   | `pm2 startup` generates a launchd plist | Built-in cron (needs Full Disk Access) |
| **Linux**   | `pm2 startup` generates a systemd unit  | Built-in cron (works out of the box)   |
| **Windows** | Use `pm2-windows-startup` package       | Use Task Scheduler instead of cron     |

---

## Your Always-On Architecture

After this lesson, your employee infrastructure looks like this:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ALWAYS-ON INFRASTRUCTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CONTINUOUS (PM2)          SCHEDULED (cron)                     │
│  ┌──────────────┐         ┌──────────────┐                     │
│  │ File Watcher │         │ Daily Audit  │                     │
│  │ Gmail Watcher│         │ CEO Briefing │                     │
│  │ (run forever)│         │ (run & exit) │                     │
│  └──────┬───────┘         └──────┬───────┘                     │
│         │                        │                              │
│         ▼                        ▼                              │
│  ┌─────────────────────────────────────────┐                   │
│  │           /Needs_Action/                │                   │
│  │     (tasks waiting for Claude)          │                   │
│  └──────────────────┬──────────────────────┘                   │
│                     │                                           │
│                     ▼                                           │
│  ┌──────────────────────────────────────┐                      │
│  │    Claude Code + Stop Hook           │                      │
│  │    (keeps going until tasks done)    │                      │
│  └──────────────────┬───────────────────┘                      │
│                     │                                           │
│                     ▼                                           │
│              /Done/ + /Pending_Approval/                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

Watchers and cron jobs feed tasks into `Needs_Action/`. Claude processes them with the Stop hook ensuring persistence. Results go to `Done/` or through the HITL approval flow from L09.

---

## Try With AI

**Prompt 1: Design Your Schedule**

```
I want to set up three scheduled tasks for my AI employee:
1. Daily email summary at 7:30 AM on weekdays
2. Weekly vault cleanup every Sunday at 9 PM
3. Monthly expense report on the 1st of each month at 8 AM

Write the cron expressions for each, explain the fields,
and create the shell scripts that would trigger Claude Code for each task.
```

**What you're learning:** Translating business schedules into cron syntax and designing the scripts that bridge cron to Claude Code. The AI can suggest schedule optimizations you might not consider (like staggering tasks to avoid overlap).

**Prompt 2: Debug a Stop Hook**

```
My Stop hook is supposed to keep Claude processing files in Needs_Action/,
but Claude stops after the first task. Here is my hook script:

#!/bin/bash
TASK_DIR="$HOME/projects/ai-vault/Needs_Action"
if ls "$TASK_DIR"/*.md 1>/dev/null 2>&1; then
    echo "Tasks remaining"
    exit 1
fi
exit 0

What is wrong with this script? Fix it and explain why the exit code matters.
```

**What you're learning:** The critical difference between exit codes in Claude Code hooks. Exit 1 is a non-blocking error (Claude ignores it and stops). Exit 2 is the blocking signal that tells Claude to continue. This distinction is specific to the Stop hook and not obvious from general shell scripting knowledge. Asking the AI to diagnose this forces you to understand the hook lifecycle.
