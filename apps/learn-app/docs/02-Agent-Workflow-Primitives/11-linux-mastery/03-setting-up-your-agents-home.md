---
sidebar_position: 3
title: "Setting Up Your Agent's Home"
chapter: 11
lesson: 3
layer: L2
duration_minutes: 30
description: "Create a proper directory structure for your agent, extract secrets into .env files, and set up persistent logging so nothing is lost when the terminal closes"
keywords:
  [
    "directory structure",
    "project layout",
    "env files",
    "environment variables",
    "logging",
    "log persistence",
    "agent deployment",
    "linux",
    "server organization",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Server Directory Organization"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student can direct Claude Code to create a standard project directory structure on a Linux server"

  - name: "Secret Management Basics"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Digital Security"
    measurable_at_this_level: "Student can explain why secrets belong in .env files rather than in source code and can direct Claude Code to extract them"

  - name: "Log Persistence"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Problem Solving"
    measurable_at_this_level: "Student can direct Claude Code to redirect agent output to log files that survive terminal closure"

learning_objectives:
  - objective: "Direct Claude Code to create a standard project directory structure for an agent"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student successfully creates /opt/agents/competitor-tracker/ with correct subdirectories"

  - objective: "Explain why hardcoded secrets in source code are dangerous and how .env files solve the problem"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can articulate the risk of secrets in code and the role of .env files"

  - objective: "Set up log redirection so agent output persists after the terminal closes"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student directs Claude Code to configure log output to a file and verifies it survives terminal disconnection"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (directory structure, .env files, log persistence) within A2 limit of 5-7"

differentiation:
  extension_for_advanced: "Create a log rotation script that archives logs older than 7 days and compresses them with gzip"
  remedial_for_struggling: "Focus on just the directory structure first. Once that makes sense, move to .env files. Treat log persistence as a bonus."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Agent Organization"
  key_points:
    - "The kitchen analogy (knives in the bathroom, spices under the bed) makes the cost of bad organization visceral and immediate"
    - "The /opt/agents/ convention is a real Linux pattern — students are learning professional deployment norms, not toy setups"
    - "Extracting secrets to .env is the single highest-impact security improvement a beginner can make"
    - "Log persistence (tee + redirection) bridges into Lesson 4's systemd journaling — logs are the thread that connects operations lessons"
  misconceptions:
    - "Students think organization is optional cosmetics — the 'house of cards' framing shows that disorganization causes real failures"
    - "Students confuse .env files with environment variables — .env is the file, environment variables are what the OS loads from it"
    - "Students think redirect (>) and tee are the same — redirect replaces terminal output, tee duplicates it to both screen and file"
  discussion_prompts:
    - "If a colleague needed to take over Ali's agent tomorrow, could they find everything? What would they look for first?"
    - "Why is a hardcoded password in source code worse than a weak password in a .env file?"
  teaching_tips:
    - "Have students draw the directory tree on paper before creating it — the spatial act reinforces the mental model"
    - "The before/after table at the end is the lesson's summary — project it and let students compare the two states"
    - "If students have a real project, have them design its directory structure as the exercise instead of following Ali's"
  assessment_quick_check:
    - "Why does the agent live in /opt/agents/ instead of /home/ali/?"
    - "What does chmod 600 on the .env file prevent?"
    - "What happens to terminal output when you close the SSH session? How do you fix it?"
---

# Setting Up Your Agent's Home

Ali can read the server now. Permissions, processes, disk usage -- the cryptic output makes sense. But reading the server revealed an uncomfortable truth: his agent's files are a mess.

The Python script sits in his home directory next to vacation photos and half-finished homework. The database password is hardcoded on line 14 of the source code. Log output goes to the terminal and vanishes every time he closes it. The agent works, but it is a house of cards. One wrong `rm` command, one curious coworker glancing at his screen, one disconnected SSH session -- and something breaks.

Agents dumped in random directories fail. Not because of bad code -- because of bad organization. This lesson creates order from chaos.

> **"A well-organized server is a well-organized mind."**

## The Problem With "It Works on My Desk"

Picture a kitchen where the knives are in the bathroom, the spices are under the bed, and the recipe is tattooed on the chef's arm. The food might taste fine today. But the next chef will burn the place down.

Ali's agent has the same problem:

```
/home/ali/
├── competitor_tracker.py    # Agent code (mixed with personal files)
├── vacation_photo.jpg
├── homework_draft.docx
├── notes.txt
└── (database password is on line 14 of the .py file)
```

No separation between code, data, configuration, and secrets. Everything in one pile.

## Building the Structure

A well-organized server is a well-organized mind. Every professional deployment follows the same pattern -- dedicated directories for code, configuration, data, and logs. Like a well-organized office: documents in the filing cabinet, secrets in the safe, memos in the outbox.

Here is what Ali needs:

```
/opt/agents/competitor-tracker/
├── src/           # Agent code lives here
├── config/        # Configuration files
├── logs/          # Persistent log output
├── data/          # Database files, cache, downloads
└── .env           # Secrets (DB password, API keys)
```

Direct Claude Code to build it:

```
Create a directory structure for my competitor-tracker agent at
/opt/agents/competitor-tracker/ with subdirectories: src, config,
logs, and data. Then move my agent script from ~/competitor_tracker.py
into the src/ directory.
```

```
Claude Code: I'll create that structure and move your script.

> sudo mkdir -p /opt/agents/competitor-tracker/{src,config,logs,data}
> sudo chown ali:ali /opt/agents/competitor-tracker
> mv ~/competitor_tracker.py /opt/agents/competitor-tracker/src/

Done. Your agent now lives at:
/opt/agents/competitor-tracker/src/competitor_tracker.py

The directory structure is:
/opt/agents/competitor-tracker/
├── src/           (1 file: competitor_tracker.py)
├── config/        (empty, ready for config files)
├── logs/          (empty, ready for log output)
└── data/          (empty, ready for database/cache)
```

**Output:**

```
$ ls -la /opt/agents/competitor-tracker/
drwxr-xr-x  6 ali ali 4096 Feb 27 10:15 .
drwxr-xr-x  3 root root 4096 Feb 27 10:15 ..
drwxr-xr-x  2 ali ali 4096 Feb 27 10:15 config
drwxr-xr-x  2 ali ali 4096 Feb 27 10:15 data
drwxr-xr-x  2 ali ali 4096 Feb 27 10:15 logs
drwxr-xr-x  2 ali ali 4096 Feb 27 10:15 src
```

Why `/opt/agents/`? The `/opt` directory is Linux convention for optional software that does not come with the operating system. It is not buried in a user's home folder. Other team members can find it. Other agents can be added beside it: `/opt/agents/social-monitor/`, `/opt/agents/report-generator/`.

## Extracting Secrets

Now for the sticky note on the whiteboard problem. Open Ali's script and look at line 14:

```python
# Line 14 of competitor_tracker.py
db_password = "r3allyS3cret!Pass"
api_key = "sk-proj-abc123def456"
```

Secrets don't belong in code. They belong in a separate file that never gets shared. Think of it like writing the safe combination on a sticky note you keep in your wallet -- not on the whiteboard where everyone can see it.

Pause. Why does this matter? Three reasons:

1. **Git.** If Ali ever pushes this code to GitHub, those credentials are public. Bots scan GitHub for exposed keys. His database gets compromised within minutes.
2. **Teammates.** Anyone who reads the code now knows the password. The code should be shareable. The secrets should not.
3. **Different environments.** The test server uses a different database than production. Hardcoded passwords mean changing the code every time you switch environments.

Direct Claude Code to fix it:

```
My competitor_tracker.py has hardcoded secrets on lines 14-15.
Extract them into a .env file at /opt/agents/competitor-tracker/.env
and update the Python code to read from environment variables instead.
```

```
Claude Code: I'll extract those secrets. First, creating the .env file:

> cat > /opt/agents/competitor-tracker/.env << 'EOF'
DB_PASSWORD=r3allyS3cret!Pass
API_KEY=sk-proj-abc123def456
EOF

> chmod 600 /opt/agents/competitor-tracker/.env

Now updating the Python script to use environment variables:
```

The `.env` file looks like this:

```
DB_PASSWORD=r3allyS3cret!Pass
API_KEY=sk-proj-abc123def456
```

And the Python code changes from this:

```python
# BEFORE: secrets hardcoded
db_password = "r3allyS3cret!Pass"
api_key = "sk-proj-abc123def456"
```

To this:

```python
# AFTER: secrets loaded from environment
import os
db_password = os.environ["DB_PASSWORD"]
api_key = os.environ["API_KEY"]
```

**Output:**

```
$ ls -la /opt/agents/competitor-tracker/.env
-rw-------  1 ali ali  58 Feb 27 10:22 .env
```

Notice `chmod 600` -- that means only Ali can read the file. Not his teammates, not other programs, not anyone else on the server. The safe combination stays in the safe.

:::caution[Never Commit .env Files]
If you use Git, add `.env` to your `.gitignore` file immediately. A `.env` file pushed to a public repository is a security incident, not a mistake.
:::

## Making Logs Survive

Ali starts his agent. It prints status messages to the terminal:

```
[2026-02-27 10:30:01] Fetching pricing data...
[2026-02-27 10:30:04] Found 23 competitors
[2026-02-27 10:30:08] Updated database
[2026-02-27 10:30:08] Sleeping 1 hour...
```

He closes his laptop. Opens it again. The terminal is blank. Every line of output is gone. There is no record of what the agent did, whether it succeeded, or when it last ran.

Output that vanishes is not output. It is a conversation that nobody recorded. Like relying on memory instead of taking notes during an important phone call.

The fix is redirection -- sending output to a file instead of the screen:

```
Set up my competitor-tracker agent to log its output to a file
at /opt/agents/competitor-tracker/logs/agent.log instead of
printing to the terminal. I want to keep both the terminal
output and the log file.
```

```
Claude Code: I'll set up logging with the tee command, which
writes to both the screen and a file simultaneously.

To run your agent with persistent logging:

> cd /opt/agents/competitor-tracker
> python src/competitor_tracker.py 2>&1 | tee -a logs/agent.log
```

Let's break that down:

| Part | Meaning |
|------|---------|
| `python src/competitor_tracker.py` | Run the agent |
| `2>&1` | Combine error messages with normal output |
| `\|` | Pipe: send output to the next command |
| `tee -a logs/agent.log` | Write to both the screen AND the log file (`-a` = append, don't overwrite) |

**Output:**

```
$ python src/competitor_tracker.py 2>&1 | tee -a logs/agent.log
[2026-02-27 10:35:01] Fetching pricing data...
[2026-02-27 10:35:04] Found 23 competitors
[2026-02-27 10:35:08] Updated database

$ cat logs/agent.log
[2026-02-27 10:35:01] Fetching pricing data...
[2026-02-27 10:35:04] Found 23 competitors
[2026-02-27 10:35:08] Updated database
```

The same output appears on screen AND in the file. Close the terminal, disconnect SSH, shut down your laptop -- the log file persists. Tomorrow morning, Ali can check what happened overnight:

```
Show me the last 20 lines of my agent's log file.
```

```
Claude Code:
> tail -20 /opt/agents/competitor-tracker/logs/agent.log
```

The `tail` command shows the end of a file. `-20` means the last 20 lines. This is how you check on an agent without being connected while it runs.

## What Ali Has Now

Before this lesson:

| Component | Where | Problem |
|-----------|-------|---------|
| Code | `~/competitor_tracker.py` | Mixed with personal files |
| Secrets | Line 14 of the script | Exposed to anyone reading the code |
| Logs | Terminal screen | Gone when terminal closes |

After this lesson:

| Component | Where | Benefit |
|-----------|-------|---------|
| Code | `/opt/agents/competitor-tracker/src/` | Isolated, findable, professional |
| Secrets | `/opt/agents/competitor-tracker/.env` | Separated, protected (chmod 600) |
| Logs | `/opt/agents/competitor-tracker/logs/` | Persistent, reviewable, searchable |
| Config | `/opt/agents/competitor-tracker/config/` | Ready for future configuration files |
| Data | `/opt/agents/competitor-tracker/data/` | Ready for database files and cache |

The house is organized. Every file has a place. Secrets are locked up. Logs persist.

---

## Try With AI

### Prompt 1: Extend the Structure

```
My competitor-tracker agent needs to store three types of data:
raw downloads (HTML pages it scrapes), processed reports (the
analysis it generates), and archived results (old reports kept
for historical comparison).

Extend the /opt/agents/competitor-tracker/data/ directory to
handle all three. What naming convention should the subdirectories
follow? Create them.
```

**What you're learning:** Directory design decisions. Flat vs. nested structures, naming conventions that scale, and how to organize data that grows over time.

### Prompt 2: Design for a Different Agent

```
I want to deploy a second agent -- one that monitors social media
mentions of my brand and sends Slack alerts when sentiment turns
negative.

Design a complete directory structure for it at
/opt/agents/social-monitor/. What directories does it need that
the competitor-tracker doesn't? Create the structure.
```

**What you're learning:** Transferring the pattern to a new context. Different agents have different needs (credentials for multiple platforms, queue directories for pending alerts), but the organizational principle stays the same.

### Prompt 3: .env vs config.yaml

```
When should secrets go in a .env file vs a config.yaml file?
What is the security difference? What happens if you accidentally
commit each one to Git? Show me an example of what belongs in
each file for the competitor-tracker agent.
```

**What you're learning:** The boundary between secrets and configuration. Database passwords are secrets (.env). Scraping intervals and retry counts are configuration (config.yaml). Knowing which is which prevents both security incidents and unnecessary complexity.

---

## Flashcards Study Aid

<Flashcards />

The house is built. Ali starts his agent. It works. He closes his laptop. The agent dies. Every. Single. Time. The process is tied to his terminal session -- when the session ends, everything running inside it ends too. Lesson 4 solves this problem permanently.
