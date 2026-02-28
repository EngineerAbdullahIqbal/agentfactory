---
sidebar_position: 1
title: "Where Your Agent Lives"
chapter: 11
lesson: 1
layer: L2
duration_minutes: 30
description: "SSH into a Linux server for the first time, direct Claude Code to explore the filesystem, and build a mental model of where your agent will run"
keywords:
  [
    "linux server",
    "ssh",
    "filesystem",
    "terminal",
    "shell",
    "directory structure",
    "agent deployment",
    "server orientation",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Server vs Local Mental Model"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can explain why a server differs from a laptop and why agents need servers"

  - name: "SSH Connection Understanding"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Digital Communication"
    measurable_at_this_level: "Student can describe SSH as a secure tunnel to a remote computer and recognize a successful connection"

  - name: "Filesystem Navigation via Agent"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can direct Claude Code to explore directories and interpret the output to locate key paths"

  - name: "Linux Directory Purpose Recognition"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can identify the purpose of /home, /var, /etc, /opt, and /tmp from a directory listing"

learning_objectives:
  - objective: "Explain why an agent needs a server instead of a laptop"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Student states at least two reasons a server is better for running agents 24/7"

  - objective: "Describe what SSH does and recognize a successful connection"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Student identifies the parts of an SSH command and explains what the blinking cursor means"

  - objective: "Direct Claude Code to explore a Linux filesystem and interpret the output"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student successfully directs Claude Code to list directories and correctly identifies what lives in /home, /var, and /etc"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (server vs laptop, terminal/shell, filesystem tree, SSH) within A2 limit of 5-7"

differentiation:
  extension_for_advanced: "Explore /proc and /sys — ask Claude Code what virtual filesystems are and why Linux exposes hardware as files"
  remedial_for_struggling: "Focus only on /home and /tmp. Ignore other directories for now. The key insight is that everything is a tree starting from /"

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Server Orientation"
  key_points:
    - "A server is a computer that never sleeps — no screen, no keyboard, no desktop. Just raw computing power connected to the internet 24/7"
    - "Terminal is the window, shell is the voice on the other end — students must separate the two concepts"
    - "Everything on Linux lives in a tree starting from / — the five key directories (/home, /var, /etc, /opt, /tmp) each have a clear purpose"
    - "SSH is a secure tunnel between your computer and the server — like a phone call to a computer that has no screen"
  misconceptions:
    - "Students think a server has a desktop they can't see — it has no graphical interface at all"
    - "Students confuse terminal and shell — terminal is the glass window, shell is the program reading commands"
    - "Students think /home is like the C: drive — it only contains user directories, not the whole system"
    - "Students think SSH requires special software — it's built into every modern operating system"
  discussion_prompts:
    - "Why would Ali's agent stop running when he closes his laptop? What's different about a server?"
    - "If you can't see the server's screen, how do you know what's happening on it?"
  teaching_tips:
    - "Start with Ali's panic — the emotional hook makes the technical content feel urgent and necessary"
    - "Use the building analogy for the filesystem — / is the building, directories are floors, files are rooms. Students can visualize navigation"
    - "When Claude Code runs ls, pause and ask students to predict what they'll see before showing output"
  assessment_quick_check:
    - "Name two things a server has that a laptop doesn't (answer: 24/7 uptime, internet connection without user present)"
    - "What directory would you find Ali's files in? (answer: /home/ali or /home/dev)"
    - "What is the difference between a terminal and a shell?"
---

# Where Your Agent Lives

Ali types the SSH command Dev texted him. He presses Enter. The screen goes black for a moment, then a single line appears:

```
dev@server:~$
```

A blinking cursor. Nothing else.

No desktop. No icons. No Start menu. No dock. No file explorer. Just a blinking cursor on a black screen and the quiet hum of a machine he has never touched, sitting in a data center he has never visited.

Ali opens Claude Code in another terminal window on his laptop. He doesn't know Linux. He doesn't know what commands to run. But he knows how to describe what he needs. And right now, he needs to understand where he is.

> **"Your agent doesn't live on your laptop. It lives on a Linux server with no screen, no mouse, no desktop. Just a command line and the truth."**

## Why a Server?

Ali's competitor-analysis agent worked fine on his laptop. It scraped pricing data, stored results in a database, generated summaries. Then he closed his laptop Friday night and went home for the weekend.

The agent stopped. Three days of missing data. Board meeting in twelve hours.

A server is a computer that never sleeps. No screen, no keyboard, no desktop. Just raw computing power connected to the internet 24/7. When you close your laptop, the server keeps running. When you go on vacation, the server keeps running. When the power flickers in your apartment, the server — in a data center with backup generators — keeps running.

That is why your agent needs a server. Not because servers are faster or fancier. Because servers don't go to sleep when you do.

## The Glass Window and the Voice

Before Ali can explore, he needs to understand what he is looking at.

That black screen with the blinking cursor? That is a **terminal**. Think of it as a glass window into the server. You can see through it, but you cannot reach inside.

Behind the glass is the **shell** — a program that listens for instructions, runs them, and shows you what happened. When you type something (or when Claude Code types something for you), the shell is the one doing the work.

Terminal is the glass window. Shell is the voice on the other end.

Ali is not going to type commands. He is going to tell Claude Code what he wants, and Claude Code will talk to the shell for him.

## Exploring the Building

Ali's first instinct: figure out where things are.

**What Ali tells Claude Code:** "I just logged into a Linux server for the first time. I have no idea what's here. Show me the top-level directory structure and explain what each folder is for."

**What Claude Code does:**

```
> ls /

bin   dev  home  lib    mnt  proc  run   srv  tmp  var
boot  etc  host  media  opt  root  sbin  sys  usr
```

**What this means:**

Everything on a Linux server is organized in a tree. The trunk of the tree is `/` — called "root." Every file, every program, every log, every configuration lives somewhere under this one starting point.

Pause. Look at that output again. There are about 20 directories. You do not need to know all of them. You need to know five.

Think of the server as a building. `/` is the front door. Each directory is a floor with a specific purpose:

| Directory | What lives here | Building analogy |
|-----------|----------------|------------------|
| `/home` | User files — Ali's code, configs, data | **Apartments** — each user gets their own space |
| `/var` | Logs, databases, things that change over time | **The mailroom** — where activity accumulates |
| `/etc` | Configuration files for the entire system | **The building manager's office** — rules and settings |
| `/opt` | Optional software installed by hand | **Storage units** — extra stuff tenants bring in |
| `/tmp` | Temporary files, deleted on reboot | **The lobby whiteboard** — notes that get erased every night |

Ali's agent will live in `/home`. Its logs will accumulate in `/var`. Its configuration will sit in `/etc`. That is the mental model.

**What Ali tells Claude Code:** "Show me what's inside /home."

**What Claude Code does:**

```
> ls -la /home

total 8
drwxr-xr-x  3 root root 4096 Jan 15 08:30 .
drwxr-xr-x 20 root root 4096 Jan 15 08:22 ..
drwxr-xr-x  5 dev  dev  4096 Feb 23 14:12 dev
```

**What this means:**

One user on this server: `dev`. That is Dev's home directory. When Ali logs in as `dev` (using Dev's SSH credentials), he lands here. The `~` in that prompt — `dev@server:~$` — means "you are in your home directory."

This is where Ali will put his agent's code.

## The Secure Tunnel

Ali is sitting in his apartment. The server is in a data center. How are they connected?

**SSH** — Secure Shell. A secure, encrypted tunnel between your computer and the server. Like a phone call to a computer that has no screen. Everything you send through SSH is encrypted. Nobody listening on the network can see what you are typing or what the server sends back.

When Ali ran the SSH command, here is what happened:

```
ssh dev@192.168.1.100
```

Read it left to right:

- `ssh` — open a secure tunnel
- `dev` — log in as the user "dev"
- `@` — at
- `192.168.1.100` — this server address

That is it. One command. Ali is now inside the server, looking through the glass window (terminal), talking to the voice (shell), exploring the building (filesystem).

Claude Code runs in a separate terminal on Ali's laptop. When Ali tells Claude Code to explore the server, Claude Code sends commands through its own connection. The output appears in Ali's Claude Code session. Ali reads the output. He does not need to type a single Linux command himself.

## Putting It Together

Ali now knows four things:

1. **Server vs laptop.** A server never sleeps. His agent runs here, not on his laptop.
2. **Terminal and shell.** The terminal is the window. The shell is the voice. He talks to Claude Code; Claude Code talks to the shell.
3. **The filesystem tree.** Everything starts at `/`. His agent's code goes in `/home/dev`. Logs go in `/var`. Configuration goes in `/etc`.
4. **SSH.** A secure tunnel connecting his laptop to the server. Encrypted, reliable, built into every operating system.

He is oriented. The blinking cursor is not scary anymore. It is a doorway.

But Ali still has a problem. Claude Code runs commands, and the output is full of letters, numbers, and symbols he has never seen before. `drwxr-xr-x`? `4096`? `root root`?

Your agent is somewhere in this filesystem. But Claude runs commands and you see output you can't read. That changes next.

---

## Try With AI

### Prompt 1: Explore the deep directories

```
Tell Claude Code to explore /var/log and /etc on this server
(or your local machine if you don't have a server).
What lives in these directories? Why are they separate from /home?
List the five most interesting files you find and explain
what each one tracks.
```

**What you're learning:** The filesystem is not random. Each directory has a purpose. By exploring /var/log, you see where the server records everything that happens. By exploring /etc, you see where every program stores its settings. This separation — data in one place, config in another, user files in a third — is the organizing principle of every Linux server your agent will ever run on.

### Prompt 2: Compare your machine to a server

```
Compare the directory structure of my local machine with a
typical Linux server. Run ls / on my machine and tell me:
What directories exist on both? What's different?
Why would a server have directories my laptop doesn't need?
```

**What you're learning:** Your laptop and a server share the same tree structure because they both run on the same foundation. The differences reveal what makes a server a server — directories for serving web traffic, storing database files, and managing multiple users. Understanding the overlap builds intuition for working on any Linux system.

### Prompt 3: Why ls -la instead of ls?

```
When you explored the server, you used ls -la instead of plain ls.
Why? What does each flag do? Show me the same directory with
just ls, then with ls -l, then with ls -la. What extra information
appears each time? When would I want one over the other?
```

**What you're learning:** Flags modify commands. The `-l` flag switches from a simple list to a detailed view showing permissions, owners, sizes, and dates. The `-a` flag reveals hidden files (files starting with `.`). Knowing when to ask your agent for more detail versus less is a core skill — you will use this judgment in every lesson ahead.

---

## Flashcards Study Aid

<Flashcards />
