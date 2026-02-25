---
sidebar_position: 5
title: "Your Permanent Toolkit"
chapter: 9
lesson: 4
layer: L2
duration_minutes: 20
description: "Transform scattered scripts into permanent commands you can run from anywhere, forever"
keywords:
  [
    "alias",
    "chmod",
    "shebang",
    "shell config",
    "bashrc",
    "zshrc",
    "PATH",
    "permanent commands",
    "tools directory",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Creating Permanent Commands"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Create"
    digcomp_area: "System Administration"
    measurable_at_this_level: "Student creates alias in shell config and verifies it persists across terminal sessions"

  - name: "Understanding Shell Configuration"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Digital Environment"
    measurable_at_this_level: "Student can explain the role of .bashrc/.zshrc and how aliases persist"

  - name: "Tool Organization Pattern"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student organizes scripts in ~/tools and creates reusable aliases"

learning_objectives:
  - objective: "Create a persistent shell alias for a Python script"
    proficiency_level: "A2"
    bloom_level: "Create"
    assessment_method: "Student creates alias that works after terminal restart"

  - objective: "Explain how shell config files make aliases permanent"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can describe the role of .bashrc/.zshrc in alias persistence"

  - objective: "Organize scripts into a personal tools directory"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student has ~/tools with executable scripts and working aliases"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (shell config files, aliases, executable permissions) within A2 limit"

differentiation:
  extension_for_advanced: "Add ~/tools to PATH instead of using aliases, explore creating bash completion for custom commands"
  remedial_for_struggling: "Focus on just one alias for sum-expenses. Get that working before adding more."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Real Data and Permanent Tools"
  key_points:
    - "'If you have to remember where a tool lives, it is not a tool yet' is the lesson's thesis — the gap between 'script that works' and 'tool you actually use' is installation"
    - "The four-step installation process (organize in ~/tools, chmod +x, alias in shell config, source to reload) is a repeatable pattern for any script in any language"
    - "The shebang line (#!/usr/bin/env python3) is what makes a script executable without explicitly calling python3 — it bridges the gap between Python scripts and shell commands"
    - "The checkpoint (close terminal, reopen, verify command works) is the only way to prove the alias is truly permanent — not just loaded in the current session"
  misconceptions:
    - "Students think aliases are the same as running 'python3 script.py' — the alias makes the script available by name from any directory, which is a fundamentally different level of accessibility"
    - "Students may skip the checkpoint because 'it worked in this terminal' — the source command only affects the current session, and the alias is not truly permanent until it survives a terminal restart"
    - "Students confuse chmod +x (file permission) with the alias (shell shortcut) — both are needed but serve different purposes in making a script behave like a command"
  discussion_prompts:
    - "Have you ever rebuilt a script from scratch because you could not find where you saved the original? What would have been different if it were an installed command?"
    - "The lesson says 'you described the outcome, the agent handled every step.' How is specifying 'cat file.csv | sum-expenses' as the desired format a design decision?"
    - "Why does the agent check which shell you are using before adding the alias? What would go wrong if it guessed?"
  teaching_tips:
    - "Start with the frustration scenario: type 'sum-expenses' in a random directory and see 'command not found' — that visceral failure motivates the entire lesson"
    - "The command table (mkdir -p, chmod +x, alias, source) with memory tricks is worth putting on the board — students will reference it repeatedly"
    - "Make sure students actually close and reopen their terminals for the checkpoint — many will try 'source' alone and think they are done"
    - "Connect back to Chapter 8 Lesson 4: rename-screenshots.sh was a reusable script, but it was not installed as a command — this lesson shows the missing step"
  assessment_quick_check:
    - "Ask: 'What is the difference between having sum-expenses.py in a folder and having sum-expenses as an alias?' — tests understanding of tool installation"
    - "Ask students to explain what the shebang line does and why it matters for making scripts executable"
    - "Ask: 'You open a new terminal and sum-expenses is not found. What three things should you check?' — tests understanding of the full installation chain"
---

# Your Permanent Toolkit

It's next month. You're sitting in `~/finances/` with a fresh bank statement. You know you built a script that handles CSV parsing perfectly — it dealt with quoted fields, commas inside merchant names, the works. But where did you put it? Was it in `~/projects/chapter8/`? Or `~/Desktop/scripts/`? You try `python3 sum-expenses.py` and get `No such file or directory`. The script exists somewhere on your machine, and you can't find it.

**If you have to remember where a tool lives, it's not a tool yet.**

This isn't hypothetical. People build useful scripts, forget to make them permanent, and six months later rebuild the same thing from scratch because they can't find the original. The script worked. The workflow worked. But it was never installed, so it rotted in a forgotten folder. Twenty minutes of setup now saves hours of "I know I built this already" frustration later.

Real tools are available everywhere, instantly, by name. You type `ls` from any folder, not `/usr/bin/ls`. Your scripts deserve the same treatment. This lesson makes that happen.

## The Problem

Here's what that frustration looks like in practice:

```bash
cd ~/finances
cat january-statement.csv | python3 sum-expenses.py
```

**Output:**

```
python3: can't open file 'sum-expenses.py': No such file or directory
```

You'd need the full path:

```bash
cat january-statement.csv | python3 ~/projects/chapter8/sum-expenses.py
```

That works, but it's fragile. You have to remember the exact path. If you move the script, every command breaks. This is the gap between "a script that works" and "a tool you actually use."

## The Conversation

Ask Claude Code to solve this permanently:

```
You: I want to use sum-expenses from anywhere on my system.
Make it a permanent command I can run like: cat file.csv | sum-expenses
```

```
Claude Code: I'll set that up. First, let me create a dedicated
tools directory and move your script there.

[Runs: mkdir -p ~/tools]
[Runs: cp sum-expenses.py ~/tools/sum-expenses.py]
[Runs: chmod +x ~/tools/sum-expenses.py]

Now I need to check which shell you're using.

[Runs: echo $SHELL]
/bin/zsh

You're using zsh, so I'll add an alias to your .zshrc.

[Appends to ~/.zshrc:]
alias sum-expenses='python3 ~/tools/sum-expenses.py'

[Runs: source ~/.zshrc]

Done! Try it from any directory:
cat any_file.csv | sum-expenses
```

Notice what the agent did: it didn't just create the alias. It organized your script into `~/tools`, made it executable, checked your shell, and reloaded the config. You described the outcome you wanted. The agent handled every step to get there.

And notice where you refined the interaction: you specified the exact command format you wanted (`cat file.csv | sum-expenses`). That specificity told the agent you wanted a pipe-compatible alias, not just "make it accessible." Your clear intent shaped the solution.

## The Agent's Toolkit

Each command the agent ran serves a specific purpose:

| Command                | What It Does                       | Memory Trick                      |
| ---------------------- | ---------------------------------- | --------------------------------- |
| `mkdir -p ~/tools`     | Creates your personal tools folder | **p** = create **p**arents too    |
| `chmod +x script.py`   | Makes file executable              | **ch**ange **mod**e + e**x**ecute |
| `alias name='command'` | Creates a shortcut                 | Like a **nickname** for a command |
| `source ~/.zshrc`      | Reloads shell config               | Load the **source** of settings   |

## How It Works

Two things make this work:

**The shebang line** (`#!/usr/bin/env python3`) tells your OS to use Python when running the file directly. Without it, `chmod +x` alone isn't enough — the file needs to declare what runs it.

**Shell config files** (`.zshrc` or `.bashrc`) run every time you open a terminal. The agent added your alias there so it loads on startup. `source ~/.zshrc` reloads it immediately without closing the terminal.

| Your shell (`echo $SHELL`) | Config file |
| -------------------------- | ----------- |
| `/bin/zsh`                 | `~/.zshrc`  |
| `/bin/bash`                | `~/.bashrc` |

:::warning Checkpoint: Prove It's Permanent

This is the moment where a script becomes a tool. Don't skip it.

1. Close your terminal completely
2. Open a brand new terminal
3. Navigate to your home directory: `cd ~`
4. Type: `sum-expenses`
5. If you see usage info or an error about missing input — your command is installed
6. If you see "command not found" — go back and check your alias

The new terminal has no memory of what you did before. It only knows what's in your shell config file. If `sum-expenses` works here, it works everywhere, forever.

:::

## When It Breaks (And It Will)

Six months from now, something will stop working. Maybe you updated your shell, maybe you reinstalled Python, maybe you moved your scripts to a new machine. The agent won't be there with the exact context of today's session. You need to know what to check.

Here's the diagnostic chain — the three things that can break:

```bash
# 1. Does the alias exist in your current session?
alias sum-expenses
# If "not found" → your shell config didn't load it

# 2. Does the script exist where the alias points?
ls -la ~/tools/sum-expenses.py
# If "not found" → the script was moved or deleted

# 3. Can the script actually run?
python3 ~/tools/sum-expenses.py <<< "10"
# If error → Python version mismatch or missing shebang
```

| Symptom              | Check                            | Fix                                         |
| -------------------- | -------------------------------- | ------------------------------------------- |
| "command not found"  | `alias sum-expenses`             | Re-add alias to shell config, then `source` |
| "No such file"       | `ls ~/tools/sum-expenses.py`     | Script was moved — update the alias path    |
| "Permission denied"  | `ls -la ~/tools/sum-expenses.py` | Re-run `chmod +x ~/tools/sum-expenses.py`   |
| Script errors on run | `python3 --version`              | Python version changed — check shebang line |

This is the difference between someone who set up a tool and someone who _owns_ a tool. Setup is the agent's job. Diagnosis is yours — because when it breaks at 11pm before a deadline, you need to know the three places to look.

:::tip Moving to a New Machine
When you set up a new computer or reinstall your OS, you need two things: the `~/tools` directory (copy it over) and the aliases in your shell config (copy the relevant lines from `~/.zshrc` or `~/.bashrc`). That's it. Your entire toolkit travels in two copy operations.

A more robust approach: keep `~/tools` as a git repository. Then setup on any new machine is:

```bash
git clone your-tools-repo ~/tools
# Copy alias lines to ~/.zshrc
source ~/.zshrc
```

:::

The agent handled the tedious parts (checking your shell, finding the right config file, setting permissions). You made one design decision: "I want `cat file.csv | sum-expenses` to work from anywhere." Everything else followed from that. And now you know what to check when it breaks.

The interesting question is what you DO with permanent tools. Right now, `sum-expenses` gives you one number: the total. Your accountant needs categories — medical, charitable, business — broken out separately. And your bank data is full of merchant names that look like they belong in one category but don't. (How confident are you that "DR PEPPER SNAPPLE" won't end up in your medical deductions?)

## Flashcards Study Aid

<Flashcards />

---

## Try With AI

### Prompt 1: Batch Install Multiple Scripts

```
I have 3 scripts I use regularly: sum.py, sum-expenses.py, and a
count-lines.py I wrote earlier. Help me set up ~/tools with all of
them and create aliases for each one. Show me the final state of
my .zshrc aliases section.
```

**What you're learning:** Scope, not steps. You describe the outcome (3 scripts, all available everywhere, aliases listed in .zshrc) and the agent handles every repetitive step without being told the sequence. You made one decision — "install all three" — and the agent inferred mkdir, chmod, alias, and source for each. That ratio (one director decision → many agent steps) is what makes agentic work efficient.

### Prompt 2: PATH vs Aliases

```
Instead of aliases, can I add ~/tools to my PATH so I can run
scripts directly by name without an alias? What are the pros and
cons of PATH vs aliases?
```

**What you're learning:** Asking the agent to surface a tradeoff so YOU can make the call. You don't need to know whether PATH or aliases is "right" — you need to know your constraints (how many scripts, portability, maintenance burden). The agent knows the mechanics of both. You know your situation. "What are the pros and cons?" is a director's question: gather the options, then decide.

### Prompt 3: Diagnose a Broken Installation

```
I set up sum-expenses as an alias yesterday, but today in a new
terminal it says "command not found." Walk me through how to
diagnose this step by step. What are the most common causes?
```

**What you're learning:** The debug version of directing — observation is yours, diagnosis is the agent's. You supply the evidence: which terminal, which command, what error message, what you changed yesterday. The agent maps your observation to a cause in the installation chain (alias missing from config? config not sourced? script path moved?). Without your observation, the agent is guessing. Without the agent's knowledge of the chain, you're checking random things. Together, you find it fast.
