---
sidebar_position: 4
title: "Making Your Agent Unkillable"
chapter: 11
lesson: 4
layer: L2
duration_minutes: 35
description: "Turn your agent from a fragile process that dies when you close your laptop into a production service that survives reboots and restarts after crashes"
keywords:
  [
    "systemd",
    "service",
    "process",
    "daemon",
    "restart policy",
    "resource limits",
    "production",
    "deployment",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Process vs Service Distinction"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can explain why a manually started process dies when the terminal closes while a systemd service survives"

  - name: "systemd Unit File Comprehension"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can read a systemd unit file and explain the purpose of each section and directive"

  - name: "Service Lifecycle Management"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can direct Claude Code to create, enable, start, and verify a systemd service"

  - name: "Restart Policy Selection"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can choose between Restart=always and Restart=on-failure based on the agent's behavior requirements"

learning_objectives:
  - objective: "Explain why closing a terminal kills a manually started process"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student describes the relationship between terminal sessions and child processes"

  - objective: "Direct Claude Code to create and deploy a systemd service for an agent"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student successfully creates a unit file, enables the service, and verifies it runs after terminal closure"

  - objective: "Read a systemd unit file and explain what each line controls"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can annotate each directive in a unit file with its purpose"

  - objective: "Choose appropriate restart policies and resource limits for different agent types"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student selects correct Restart= value and explains the reasoning"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Processes vs services (temporary vs managed)"
    - "systemd unit files (the service job description)"
    - "Restart policies (what happens when the agent crashes)"
    - "Resource limits (preventing runaway memory usage)"
  assessment: "4 concepts at the A2-B1 boundary — the most critical lesson in the chapter for Ch13 dependency"

differentiation:
  extension_for_advanced: "Explore systemd timers as an alternative to cron for scheduled agent execution. Compare Type=simple vs Type=forking for different agent architectures."
  remedial_for_struggling: "Focus on the analogy: process = phone call (dies when you hang up), service = security guard (building makes sure someone is always at the desk). Understand this distinction before worrying about unit file syntax."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Making Agents Production-Ready"
  key_points:
    - "The process-vs-service distinction is the core insight — everything else follows from understanding why the OS needs to manage your agent"
    - "The annotated unit file is the lesson centerpiece — every line matters and students will reference this in Ch13"
    - "The drama moment (close terminal, reconnect, agent still alive) is the emotional peak — let students feel the triumph"
    - "Resource limits prevent a single buggy agent from taking down the entire server — this is production thinking"
  misconceptions:
    - "Students think 'the agent crashed' when they close the terminal — the agent didn't crash, the terminal that owned the process ended"
    - "Students confuse Restart=always with 'never stops' — the service manager restarts it, but RestartSec prevents infinite crash loops"
    - "Students think systemd is optional — on modern Linux, it IS the service manager; there's no alternative on mainstream distributions"
  discussion_prompts:
    - "What would happen to a business if their customer-facing agent died every time a developer closed their laptop?"
    - "Why does systemd wait 5 seconds before restarting a crashed service instead of restarting immediately?"
  teaching_tips:
    - "The annotated unit file should be projected/displayed — walk through each line aloud before students try it"
    - "Have students actually close their terminal and reconnect to feel the triumph of a surviving service"
    - "The tmux mention should be brief — one paragraph max — this lesson is about systemd, not session persistence"
  assessment_quick_check:
    - "What is the difference between a process and a service?"
    - "What happens to your agent if you set Restart=on-failure and the agent exits normally with code 0?"
    - "Why would you set MemoryMax=512M on an agent service?"

generated_by: "content-implementer v2.0.0"
created: "2026-02-28"
version: "1.0.0"
---

# Making Your Agent Unkillable

Ali's agent has a proper home now. Organized directories, secrets in `.env`, logs that persist. He starts the agent with a simple command. It works. He watches the logs scroll by, satisfied.

Then he closes his laptop to go to bed.

Morning. Coffee. He opens the laptop, SSHes back into Dev's server, checks the dashboard. The agent has not run since he went to sleep. Three days of missing data just became four.

He starts it again. It works again. The server reboots for a security update at 3 AM. The agent dies again.

> **"Close your laptop. Your agent dies. Reboot the server. Your agent dies. It's a pet that dies every time you stop watching it."**

The fix is one file.

---

## Why Your Agent Keeps Dying

When you start a program in a terminal, that program becomes a **child** of the terminal session. Close the terminal, and the operating system sends a signal to every child process: "Your parent is gone. Time to die."

This is what happened to Ali's agent. He started it in his SSH session. When he closed his laptop, the SSH connection dropped. The server killed every process that belonged to that session. Including his agent.

Think of it this way. A **process** is a phone call. When you hang up, the conversation is over. Nobody keeps talking.

A **service** is a security guard hired by the building. The building doesn't care if the guard takes a coffee break or swaps shifts. What matters is that someone is always at the desk. If the guard leaves, the building finds a replacement.

Ali's agent is a phone call. He needs it to be a security guard.

---

## The Fix: One File

Linux has a built-in building manager called **systemd**. It manages every service on the server — the database, the web server, the SSH daemon that let Ali connect in the first place. All of them are systemd services. All of them survive reboots.

To make your agent a systemd service, you write a **unit file** — a plain text file that answers five questions:

1. What should run?
2. As which user?
3. When should it start?
4. What if it crashes?
5. How much memory can it use?

That's it. One file. Let's write it.

---

## The Unit File, Line by Line

**What you tell Claude Code**: "Create a systemd service file for my competitor-tracker agent. It should run as user ali, start after the network is available, restart if it crashes, and use no more than 512 MB of memory."

**What the agent creates** at `/etc/systemd/system/competitor-tracker.service`:

```ini
[Unit]
Description=Competitor Tracker Agent
After=network.target
```

- `Description` — A human-readable name. Shows up in logs and status commands.
- `After=network.target` — Don't start this service until the network is ready. Your agent needs internet access to scrape pricing data. Starting before the network is up would cause immediate failures.

```ini
[Service]
Type=simple
User=ali
WorkingDirectory=/opt/agents/competitor-tracker
EnvironmentFile=/opt/agents/competitor-tracker/.env
ExecStart=/usr/bin/python3 /opt/agents/competitor-tracker/src/main.py
Restart=on-failure
RestartSec=5
MemoryMax=512M
```

- `Type=simple` — The process you start IS the service. No forking, no backgrounding. The simplest and most common type.
- `User=ali` — Run as Ali, not as root. Never run agents as root. (More on this in Lesson 5.)
- `WorkingDirectory` — The agent runs as if you `cd`'d into this directory first. Relative paths in your code resolve from here.
- `EnvironmentFile` — Load environment variables from `.env`. Your database password, API keys, and configuration — all available to the agent without hardcoding.
- `ExecStart` — The exact command to run. Full absolute path to Python and the script. No ambiguity.
- `Restart=on-failure` — If the agent crashes (exits with a non-zero code), restart it. If you intentionally stop it with `systemctl stop`, don't restart.
- `RestartSec=5` — Wait 5 seconds before restarting. This prevents crash loops — if the agent has a bug that makes it crash on startup, it won't restart thousands of times per minute and flood your logs.
- `MemoryMax=512M` — If the agent uses more than 512 MB of RAM, kill it. This prevents a memory leak from eating all server resources and crashing everything else.

```ini
[Install]
WantedBy=multi-user.target
```

- `WantedBy=multi-user.target` — Start this service when the server boots into its normal operating mode. This is what makes your agent survive reboots.

Pause.

Read the unit file again. Every line answers one of the five questions. There is no magic here. It's a job description for your agent, written in a format that Linux understands.

---

## Bringing the Service to Life

The file exists, but systemd doesn't know about it yet. Three commands make it real.

**What you tell Claude Code**: "Register the competitor-tracker service, set it to start on boot, and start it now."

**What the agent does**:

```bash
sudo systemctl daemon-reload
sudo systemctl enable competitor-tracker
sudo systemctl start competitor-tracker
```

- `daemon-reload` — "Hey systemd, I added a new service file. Re-read all your files."
- `enable` — "Start this service automatically on every boot."
- `start` — "Start it right now."

**What you tell Claude Code**: "Check if the competitor-tracker service is running."

**What the agent does**:

```bash
systemctl status competitor-tracker
```

**What you see**:

```
● competitor-tracker.service - Competitor Tracker Agent
     Loaded: loaded (/etc/systemd/system/competitor-tracker.service; enabled)
     Active: active (running) since Sun 2026-02-28 02:15:33 UTC; 5s ago
   Main PID: 4821 (python3)
     Memory: 47.2M (max: 512.0M)
```

The green dot. `active (running)`. The agent is alive.

---

## The Moment of Truth

Now for the test that matters.

Close your terminal. Disconnect from the server. Wait ten seconds. SSH back in.

**What you tell Claude Code**: "Is the competitor-tracker service still running?"

**What the agent does**:

```bash
systemctl status competitor-tracker
```

**What you see**:

```
● competitor-tracker.service - Competitor Tracker Agent
     Active: active (running) since Sun 2026-02-28 02:15:33 UTC; 2min ago
```

The agent is alive. You closed the terminal. You disconnected. The agent kept running. The building manager did its job.

This is the moment. A process would have died. A service survived.

---

## What Happens When It Crashes

Ali's agent has a bug. Once every few days, it encounters a malformed API response and crashes.

Before systemd, this meant Ali woke up to a dead agent and missing data. Now, watch what happens.

**What you tell Claude Code**: "Show me the journal log for competitor-tracker from the last hour."

**What the agent does**:

```bash
journalctl -u competitor-tracker --since "1 hour ago"
```

**What you see**:

```
Feb 28 03:42:17 server competitor-tracker[4821]: ERROR: Malformed API response
Feb 28 03:42:17 server systemd[1]: competitor-tracker.service: Main process exited, code=exited, status=1/FAILURE
Feb 28 03:42:22 server systemd[1]: competitor-tracker.service: Scheduled restart job, restart counter is at 1.
Feb 28 03:42:22 server competitor-tracker[4897]: Starting competitor tracker agent...
Feb 28 03:42:23 server competitor-tracker[4897]: Agent running successfully
```

The agent crashed at 03:42:17. Systemd waited 5 seconds (`RestartSec=5`). At 03:42:22, it started a new instance. By 03:42:23, the agent was running again. Ali slept through the entire event.

---

## A Note About tmux

You may have heard of **tmux** — a tool that keeps terminal sessions alive after you disconnect. For interactive sessions you want to keep alive — like a monitoring dashboard or a long-running data migration you're watching — tmux is the right tool.

For agents that run 24/7, systemd is the right tool. tmux keeps a session alive. systemd keeps a service alive, restarts it after crashes, starts it on boot, and enforces resource limits. Your agents need systemd.

---

## The Five systemctl Commands

You'll direct Claude Code to use these. You don't need to memorize them, but recognizing them helps you understand the output.

| Command | What it does |
|---------|-------------|
| `systemctl start <service>` | Start the service now |
| `systemctl stop <service>` | Stop the service now |
| `systemctl restart <service>` | Stop then start |
| `systemctl status <service>` | Show current state, PID, memory |
| `systemctl enable <service>` | Start automatically on boot |

And one for viewing logs:

| Command | What it does |
|---------|-------------|
| `journalctl -u <service>` | Show all logs for this service |
| `journalctl -u <service> -f` | Follow logs in real time (like a live feed) |

---

Ali's agent is unkillable. It survives terminal closures. It survives reboots. It restarts after crashes. It runs under memory limits that protect the rest of the server.

He feels accomplished. Then Dev checks the server and goes pale.

"It's running as root. With password SSH. Anyone on the internet could..." He doesn't finish the sentence.

---

## Try With AI

### Prompt 1: Restart Policies

```
My agent's systemd service uses Restart=on-failure. Explain the
difference between Restart=always and Restart=on-failure. When
would I want each one? What happens if my agent has a bug that
makes it crash immediately on startup and I have Restart=always?
```

**What you're practicing:** Understanding restart behavior. The difference between these two values determines whether your agent recovers gracefully or enters an infinite crash loop.

### Prompt 2: Adapt for a Different Stack

```
I have a Node.js Express server that I want to run as a systemd
service. Take the competitor-tracker unit file from this lesson
and modify it for Node.js. What lines change? What stays the
same? Explain each change.
```

**What you're practicing:** Transferring the systemd pattern to different technologies. The unit file structure is universal — only the ExecStart line changes significantly.

### Prompt 3: History and Context

```
Before systemd, Linux used "init scripts" to manage services.
What problems did init scripts have that systemd solved? Why
does every major Linux distribution use systemd now? Were there
controversies about the switch?
```

**What you're practicing:** Understanding why systemd exists, not just how to use it. Knowing the historical context helps you appreciate what the tool does for you automatically.

---

## Flashcards Study Aid

<Flashcards />
