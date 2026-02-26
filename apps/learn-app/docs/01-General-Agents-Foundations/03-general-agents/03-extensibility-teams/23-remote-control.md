---
slug: /General-Agents-Foundations/general-agents/remote-control
sidebar_position: 23
title: "Remote Control: Sessions Without Boundaries"
description: "Control Claude Code sessions from any device — monitor long-running tasks from your phone, pair with colleagues remotely, and keep sessions alive across network changes"
keywords:
  [
    remote control,
    remote session,
    mobile access,
    claude code,
    session management,
    tmux,
  ]
chapter: 3
lesson: 23
duration_minutes: 15

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 2"
layer_progression: "L2 (AI Collaboration)"
layer_1_foundation: "N/A"
layer_2_collaboration: "Starting remote sessions, connecting from other devices, combining with worktrees and tmux"
layer_3_intelligence: "N/A"
layer_4_capstone: "N/A"

# HIDDEN SKILLS METADATA
skills:
  - name: "Remote Session Management"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital-Content-Creation"
    measurable_at_this_level: "Student can start a Remote Control session, connect from another device, and manage session lifecycle"

  - name: "Session Architecture Understanding"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information-Data-Literacy"
    measurable_at_this_level: "Student can explain that Remote Control runs locally with outbound-only HTTPS relay, not cloud execution"

  - name: "Multi-Device Workflow Design"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can choose between Remote Control, Claude Code on the Web, and terminal access based on scenario requirements"

learning_objectives:
  - objective: "Start and connect to a Remote Control session from another device"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student starts a remote-control session, scans the QR code or copies the URL, and sends a message from their phone"
  - objective: "Explain the relay architecture: local execution, outbound HTTPS only, no cloud processing"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student correctly explains that code runs locally and the relay only passes messages, not executes code"
  - objective: "Apply decision framework to choose Remote Control vs Web vs terminal for given scenarios"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Student correctly matches 3 scenarios to the appropriate access method with reasoning"
  - objective: "Combine Remote Control with worktrees and tmux for resilient long-running sessions"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student demonstrates a tmux + remote-control session that survives terminal close"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (remote session lifecycle, relay architecture, multi-device workflow design) — within B1 limit of 10"

differentiation:
  extension_for_advanced: "Combine Remote Control with worktrees and agent teams for multi-device team orchestration"
  remedial_for_struggling: "Start with /rc in an existing session before attempting claude remote-control from scratch"

# Generation metadata
generated_by: "content-implementer v1.0.0"
created: "2026-02-26"
last_modified: "2026-02-26"
git_author: "Claude Code"
version: "1.0.0"

prerequisites:
  - "Lesson 22: Worktrees (parallel isolation concepts)"
  - "Basic terminal usage (running CLI commands)"

teaching_guide:
  lesson_type: "core"
  session_group: 8
  session_title: "Worktrees and Remote Sessions"
  key_points:
    - "Remote Control runs code LOCALLY on your machine — the relay only passes messages, not code execution"
    - "Architecture is outbound HTTPS only — no inbound ports, no firewall changes needed"
    - "The tmux survival trick prevents session death when terminal closes — essential for long-running tasks"
    - "Decision framework: Remote Control for monitoring/mobile, Web for no-machine access, terminal for full control"
  misconceptions:
    - "Students think Remote Control runs code in the cloud — it runs locally, the relay is just a message bridge"
    - "Students assume closing the terminal is safe during remote sessions — it kills the local process and ends the session"
    - "Students confuse Remote Control with Claude Code on the Web — Web is fully cloud-hosted, Remote Control requires your local machine"
  discussion_prompts:
    - "When would you want to monitor a Claude session from your phone? What kinds of tasks benefit from walk-away monitoring?"
    - "Why does Anthropic require a Pro/Max subscription for Remote Control instead of supporting API keys?"
  teaching_tips:
    - "The tmux survival trick is the single most valuable technique — demonstrate it live by closing the terminal and showing the session persists"
    - "Use the 6-scenario comparison table as a quick decision exercise: read each scenario and have students choose the right tool"
    - "The CI/CD runner analogy makes the architecture click immediately for students with DevOps experience"
  assessment_quick_check:
    - "Where does code actually execute during a Remote Control session — on your machine or in the cloud?"
    - "What happens to a Remote Control session if your machine loses network for 15 minutes?"
    - "Name one scenario where Remote Control is better than Claude Code on the Web, and one where Web is better"
---

# Remote Control: Sessions Without Boundaries

You ask Claude to refactor a large codebase -- restructuring 40 files across six modules. The estimated time: 40 minutes. You need to pick up your kids from school in 10 minutes. Without Remote Control, you have two bad options: cancel the task and lose the progress, or leave your laptop open on the kitchen table and hope nothing needs your approval while you are driving.

Remote Control gives you a third option. You type `/rc` in your running session, scan the QR code with your phone, and walk out the door. From the school parking lot, you watch Claude work through your phone. When it asks "Should I also update the import paths in the test files?", you type "Yes, update all test imports too" from your phone screen. The session never pauses. The work never stops. Your laptop is at home running the actual code; your phone is just a window into that session.

That is the core idea: your machine does the work, and any device with a browser becomes a remote control for that work. Your local filesystem, MCP servers, tools, and project configuration all stay available -- nothing moves to the cloud.

---

## Starting a Remote Control Session

### From a Fresh Start

Navigate to your project directory and run:

```bash
claude remote-control
```

The process stays running in your terminal, waiting for remote connections. It displays a session URL and you can press **spacebar** to show a QR code for quick phone access.

**Output:**

```
Remote Control session started
Session URL: https://claude.ai/code/session/abc123...
Press spacebar to show QR code
Waiting for connections...
```

This command supports two optional flags:

- `--verbose` -- show detailed connection and session logs
- `--sandbox` / `--no-sandbox` -- enable or disable filesystem and network isolation during the session

### From an Existing Session

Already deep into a conversation and realize you need to leave? Use the slash command:

```
/remote-control
```

Or the shorthand:

```
/rc
```

This starts Remote Control within your current session, carrying over your entire conversation history. The `--verbose`, `--sandbox`, and `--no-sandbox` flags are not available with the slash command -- those only work with `claude remote-control`.

**Naming tip**: Use `/rename` before `/remote-control` to give the session a descriptive name like "refactor-auth-module". This makes it easy to find in the session list when you open claude.ai/code on another device.

### Connecting from Another Device

Once a Remote Control session is active, connect from any device in three ways:

1. **Open the session URL** displayed in your terminal -- paste it into any browser to go directly to the session on claude.ai/code
2. **Scan the QR code** with your phone to open it in the Claude mobile app (iOS and Android)
3. **Open claude.ai/code or the Claude app** and find the session by name -- Remote Control sessions show a computer icon with a green status dot when online

The conversation stays in sync across all connected devices. You can send messages from your terminal, browser, and phone interchangeably.

**Subscription requirement**: Remote Control requires a Pro or Max plan. It is not available on Team or Enterprise plans, and API keys are not supported. If you are not on a supported plan, the command will not work.

---

## How It Actually Works

### Your Machine Is the Engine

When you run `claude remote-control`, your local machine does all the work. It reads your files, runs your MCP servers, executes tool calls, and writes changes to your filesystem. None of that moves to the cloud.

The web or mobile interface you connect from is a thin client -- it displays the conversation and sends your messages back to your local machine. Think of it like a TV remote: the remote sends signals, but the TV does the processing.

### The Relay Model

Your machine is like a CI/CD self-hosted runner. A self-hosted runner sits on your infrastructure, does the actual build and test work, but communicates with GitHub through an outbound connection. GitHub never reaches into your network -- the runner calls out.

Remote Control works the same way:

| Component            | Self-Hosted CI Runner      | Remote Control                                    |
| -------------------- | -------------------------- | ------------------------------------------------- |
| Where code runs      | Your infrastructure        | Your machine                                      |
| Connection direction | Runner calls out to GitHub | Claude calls out to Anthropic API                 |
| Inbound ports needed | None                       | None                                              |
| Firewall changes     | None                       | None                                              |
| What the server does | Routes build instructions  | Routes messages between devices                   |
| Security model       | Outbound HTTPS only        | Outbound HTTPS only, TLS, short-lived credentials |

Your local Claude Code session makes outbound HTTPS requests only and never opens inbound ports on your machine. When you start Remote Control, it registers with the Anthropic API and polls for work. When you connect from another device, the server routes messages between the web or mobile client and your local session over a streaming connection. All traffic travels through the Anthropic API over TLS using multiple short-lived credentials, each scoped to a single purpose and expiring independently.

### What This Means for Your Tools

Because code runs locally, everything you have configured locally keeps working:

- **MCP servers** -- your local MCP servers stay connected and available
- **Project configuration** -- CLAUDE.md, .claude/settings.json, all your rules and skills
- **File access** -- reads and writes hit your actual filesystem
- **Git** -- commits, branches, and pushes use your local git config and credentials

Nothing needs cloud configuration. If it works in your terminal, it works through Remote Control.

---

## The tmux Survival Trick

Remote Control has one critical limitation: it runs as a local process. If you close the terminal or stop the `claude` process, the session ends. For a 5-minute task, this does not matter. For a 2-hour refactor, it matters a lot.

The fix is `tmux` -- a terminal multiplexer that keeps processes running even after you close the terminal window.

**Step 1**: Start a tmux session:

```bash
tmux new -s refactor
```

**Step 2**: Inside tmux, start Remote Control:

```bash
claude remote-control
```

**Step 3**: Detach from tmux (the session keeps running):

Press `Ctrl+B`, then `D`.

**Step 4**: Close your terminal entirely. The Claude session is still running inside tmux.

**Step 5**: When you return, reattach:

```bash
tmux attach -t refactor
```

**Output:**

```
[detached (from session refactor)]
$ tmux attach -t refactor
# You're back in the Claude session, exactly where you left off
```

**Why this matters**: Without tmux, closing your laptop lid or your terminal application kills the Claude process and ends your Remote Control session. With tmux, the process survives because it is not attached to your terminal window -- it is attached to the tmux server process, which runs independently.

This is essential for long-running tasks. Start the session in tmux, enable Remote Control, and monitor from your phone. Your laptop can sleep, your terminal can close, and the session persists.

---

## Remote Control vs Claude Code on the Web vs Terminal

Remote Control and Claude Code on the Web both use the claude.ai/code interface, but they are architecturally different. Here is how to choose:

| Scenario                                             | Remote Control                                       | Claude Code on the Web                                  | Terminal                        |
| ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- | ------------------------------- |
| Monitoring a long-running local task from your phone | Best choice -- full local environment, mobile access | Cannot access local files                               | Must stay at desk               |
| Working on a repo you do not have cloned locally     | Cannot use -- requires local machine                 | Best choice -- cloud environment, no local setup needed | Must clone first                |
| Running multiple independent tasks in parallel       | One session per instance                             | Best choice -- spin up multiple cloud sessions          | Multiple terminal tabs          |
| Quick edit while away from desk                      | Good -- continues existing session                   | Good -- starts new cloud session                        | Not available                   |
| Pair programming with a colleague on your codebase   | Best choice -- they see your local environment       | Cannot access your files                                | Screen sharing required         |
| Maximum control over tools, MCP servers, and config  | Best choice -- everything local                      | Limited to cloud-configured tools                       | Best choice -- everything local |

**The decision rule**: If you need your local environment accessible from another device, use Remote Control. If you want to work without any local machine at all, use Claude Code on the Web. If you are at your desk with full terminal access, use your terminal.

---

## The Power Combo: Worktrees + Remote Control

In Lesson 22, you learned that worktrees let you work on multiple branches simultaneously without switching. Combined with Remote Control, you get isolated, monitorable parallel work.

**The pattern**:

```bash
# Terminal 1: Start Claude in a worktree with Remote Control
claude --worktree feature-auth
# Inside the session, type: /rc
```

Now scan the QR code and monitor the feature work from your phone while your main branch stays untouched in the original directory. The worktree gives you isolation; Remote Control gives you mobility.

For even more resilience, wrap it in tmux:

```bash
# Create a tmux session for the worktree
tmux new -s auth-feature

# Inside tmux, start Claude in a worktree
claude --worktree feature-auth
# Inside the session, type: /rc

# Detach: Ctrl+B, then D
# Monitor from phone. Reattach anytime with: tmux attach -t auth-feature
```

This gives you: isolated branch work (worktree) + persistent process (tmux) + mobile monitoring (Remote Control). Each piece solves a different problem; together they create a workflow where long-running tasks run safely in isolation while you stay informed from anywhere.

---

## When Remote Control Goes Wrong

### 1. Terminal Closes, Session Dies

**What it looks like**: You close your terminal, open claude.ai/code on your phone, and the session shows as offline.

**Why it happens**: Remote Control runs as a local process. No terminal process means no session.

**Fix**: Use the tmux survival trick described above. Always start long-running Remote Control sessions inside tmux.

### 2. The 10-Minute Network Timeout

**What it looks like**: Your laptop is awake but your WiFi drops for 15 minutes. When you reconnect, the session is gone.

**Why it happens**: If your machine is awake but cannot reach the network for roughly 10 minutes, the session times out and the process exits.

**Fix**: Run `claude remote-control` again to start a new session. For environments with unreliable network, consider whether Claude Code on the Web (fully cloud-hosted) might be a better fit.

### 3. Multiple Session Confusion

**What it looks like**: You start `claude remote-control` in two different terminal tabs and wonder why only one shows up.

**Why it happens**: Each Claude Code instance supports one remote session at a time. Multiple instances each get their own independent session.

**Fix**: Use `/rename` to give each session a descriptive name before enabling Remote Control. This makes it easy to identify which session is which in the claude.ai/code session list.

### 4. "It's Not Connecting" (Subscription and Auth)

**What it looks like**: You run `claude remote-control` and get an error, or the session starts but no remote device can connect.

**Why it happens**: Remote Control requires a Pro or Max plan. It does not work with API keys, Team plans, or Enterprise plans. You also need to be logged in via `/login`.

**Fix**: Verify your subscription tier. Run `claude` and use `/login` to authenticate through claude.ai. Make sure you have accepted the workspace trust dialog by running `claude` in your project directory at least once.

---

### What's Next

The next section covers **Claude Cowork** -- Claude's desktop application that brings a visual interface to everything you have been doing in the terminal. Where Remote Control extends your terminal session to other devices, Cowork replaces the terminal entirely with a desktop-native experience.

---

## Try With AI

**Exercise 1: Start Remote Control and Connect from Your Phone**

In your terminal, navigate to any project directory and run:

```bash
claude remote-control
```

When the session URL appears, press **spacebar** to show the QR code. Scan it with your phone (or open the URL in any browser). Send a message from your phone and watch it appear in your terminal. Then type a response in your terminal and see it appear on your phone.

**What you're learning:** The basic Remote Control lifecycle -- starting a session, connecting from another device, and seeing the bidirectional sync between terminal and mobile. This is the foundation for all remote workflows.

**Exercise 2: The tmux Survival Trick**

In your terminal:

```bash
# Step 1: Create a tmux session
tmux new -s survival-test

# Step 2: Inside tmux, start Remote Control
claude remote-control
```

Connect from your phone by scanning the QR code. Then:

1. Detach from tmux: press **Ctrl+B**, then **D**
2. Close your terminal application entirely
3. Check your phone -- the session should still be active
4. Send a message from your phone and verify it works
5. Open a new terminal and reattach:

```bash
tmux attach -t survival-test
```

Verify the session continued running the entire time.

**What you're learning:** How to make Remote Control sessions survive terminal closure. This is the single most important technique for long-running tasks -- without it, closing your laptop kills the session.

**Exercise 3: Power Combo — Worktree + Remote Control + Phone Monitoring**

In your terminal:

```bash
# Step 1: Create a tmux session
tmux new -s power-combo

# Step 2: Start Claude in a worktree
claude --worktree power-test
```

Once the Claude session starts, type `/rc` to enable Remote Control. Connect from your phone, then paste this prompt into your phone:

```
Create a file called POWER-COMBO.md with today's date. Then verify
this file does NOT exist in the main repository directory (only in
the worktree).
```

Detach from tmux (**Ctrl+B**, **D**) and verify you can still interact from your phone.

**What you're learning:** Combining three tools -- worktrees for isolation, tmux for persistence, and Remote Control for mobility. Each solves a different problem; together they create a resilient workflow for parallel feature development monitored from anywhere.

**Exercise 4: Decision Framework Practice**

Start a normal Claude session and paste this prompt:

```
For each scenario, tell me whether to use Remote Control, Claude Code
on the Web, or terminal access — and explain why:

1. I want to start a data analysis task on a repo I haven't cloned yet,
   from my tablet at a coffee shop.
2. I kicked off a large refactor at work and want to monitor progress
   from my phone during my commute.
3. I need to run 4 independent code generation tasks simultaneously
   on different repositories.
```

Compare Claude's answers against the decision table in this lesson. Do you agree with its reasoning?

**What you're learning:** The decision framework for choosing between Remote Control, Claude Code on the Web, and terminal access. Matching the right tool to the scenario prevents frustration and wasted time.

## Flashcards Study Aid

<Flashcards />
