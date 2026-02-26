---
sidebar_position: 7
title: "Git -- Your Version Control Memory"
description: "Initialize a Git repository, make your first commit, and run the complete verification pipeline that chains ruff, pyright, and pytest into a single command."
keywords: ["git", "version control", "git init", "git add", "git commit", "verification pipeline", "discipline stack", "SmartNotes", "git log"]
chapter: 15
lesson: 7
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Git Commit Workflow"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can initialize a Git repository with git init, stage files with git add, and create a commit with git commit -m, then verify the result with git log --oneline"

  - name: "Pipeline Execution"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can execute the complete verification pipeline (uv run ruff check . && uv run pyright && uv run pytest) and explain why the order matters and what happens if any step fails"

learning_objectives:
  - objective: "Initialize a Git repository and make a first commit"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Student runs git init, git add ., and git commit -m with a descriptive message, then verifies the commit exists with git log --oneline"

  - objective: "Execute the complete verification pipeline: lint, type check, test, commit"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student runs the full pipeline command (uv run ruff check . && uv run pyright && uv run pytest) and explains why each step must pass before the next one runs"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (git init/add/commit, git log, pipeline execution with &&) within comfortable A2 range. Pipeline concept builds on the individual tool commands already learned."

differentiation:
  extension_for_advanced: "Add a second commit that deliberately breaks the pipeline (introduce a type error). Run the pipeline, observe where it stops, fix the error, and commit again. Compare git log before and after to see the project's history grow."
  remedial_for_struggling: "Focus on git init and one commit first. Treat the pipeline command as a bonus step -- understanding the three individual tool commands from previous lessons is more important than memorizing the chained version."
---

# Git -- Your Version Control Memory

In Lesson 6, James wrote his first test with pytest and watched it pass. His code is verified three ways now -- ruff checks style, pyright checks types, pytest checks behavior. Three tools, three green outputs. The SmartNotes project has never been in better shape.

But all of it exists on one machine. In one directory. With no history.

James is still working on `format_title`, a piece of code that capitalizes the first letter of each word in a note title. He typed it carefully, verified it with pytest, and watched it produce the right result. Then he decides the approach is wrong. He selects everything, deletes it, and starts rewriting. Halfway through the rewrite, he realizes the original version was better. He reaches for Ctrl+Z. Nothing. He closed the file between versions. The undo history is gone.

James stares at an empty file. He cannot remember the exact logic. He has a test that documents what the code is supposed to do -- `assert format_title("hello world") == "Hello World"` -- but the implementation that passed that test no longer exists anywhere. The test tells him what "correct" means. It cannot tell him what the code looked like.

Emma finds him rewriting code he already wrote. "How long have you been doing this?" James sighs. "Twenty minutes. And I am not sure this version is as good as the one I deleted." Emma sits down. "Let me show you the last tool in the discipline stack. After today, this never happens again."

---

## The Problem Without Version Control

James's tests can prove his code is correct. Ruff can prove his code is clean. Pyright can prove his types are right. But none of these tools can answer a simple question: what did the code look like yesterday?

| Scenario | What Happens Without Version Control |
|---|---|
| James deletes working code and rewrites | The original is gone permanently -- no undo, no recovery |
| James edits a function and introduces a bug | He cannot compare to the previous version to see what changed |
| The laptop crashes mid-session | Unsaved work is lost; even saved work has no history |
| James wants to try a risky approach | He cannot "bookmark" the current state and return to it if the experiment fails |

The common thread: every change is permanent. There is no undo beyond the editor's buffer. There is no way to see what the project looked like an hour ago, a day ago, or before a specific change. Code that passes all three tools today can be destroyed by a single bad edit tomorrow -- and without version control, the verified version is gone.

---

## Git Defined

> **Git** is a version control system that records every change you make to your project. Each `git commit` is a snapshot -- a checkpoint you can return to at any time. Git does not prevent mistakes. It makes them reversible.

| Aspect | Detail |
|--------|--------|
| **What it records** | Every file in your project, at the moment you commit |
| **Smallest unit** | A single commit (one snapshot of the entire project) |
| **How you create a snapshot** | `git add .` then `git commit -m "description"` |
| **How you view history** | `git log --oneline` |
| **How you compare versions** | `git diff` (shows what changed since last commit) |

---

## Axiom VIII in Action

In Axiom VIII from Chapter 14, you learned that version control is memory. Human memory is unreliable -- James could not remember the exact logic of his deleted `format_title` code after twenty minutes. Git memory is permanent -- every commit records the complete state of every file in the project.

This matters even more when working with AI assistants. An AI can generate fifty lines of code in seconds. If you experiment with that code, rewrite it, and lose the working version, the AI cannot reproduce the exact same output -- each generation is different. Git solves this by recording every version permanently.

James's lost code was a small problem -- twenty minutes of rewriting. But the pattern scales dangerously. A team of developers working without version control has no way to answer basic questions: Who changed this file? When did this bug appear? What did the project look like before the refactor? These are not edge cases. They are daily questions on any project larger than a single file.

If James had committed his working `format_title` code before rewriting it, recovery would have taken seconds. One command to see the history (`git log`), one command to see the difference (`git diff`), and the original code is back. That is the promise of Axiom VIII: mistakes become reversible, and the project's history becomes a permanent, searchable record.

---

## Practical Application

### Step 1: Initialize Git

Your SmartNotes project already has a `.gitignore` file -- `uv init` created it in Lesson 2. That file tells Git to ignore the `.venv/` directory and `__pycache__/` folders, which should never be committed. The lockfile `uv.lock`, however, *should* be committed -- it ensures every developer and every CI server gets exactly the same dependency versions.

Initialize the repository:

```bash
git init
```

**Output:**

```
Initialized empty Git repository in /path/to/smartnotes/.git/
```

Git is now tracking the SmartNotes directory. But it has not recorded anything yet. An initialized repository with no commits is like a notebook with no entries -- the infrastructure exists, but the memory is empty.

### Step 2: Stage and Commit

Git uses a two-step process: *stage* the files you want to record, then *commit* them as a snapshot.

```bash
git add .
git commit -m "Initial SmartNotes project with discipline stack"
```

The `git add .` command stages every file in the directory. In SmartNotes, this is safe because `.gitignore` already excludes `.venv/` and `__pycache__/`. In future projects, you may want to stage specific files by name (like `git add main.py pyproject.toml`) to avoid accidentally including files that should stay private.

**Output:**

```
[main (root-commit) a1b2c3d] Initial SmartNotes project with discipline stack
 8 files changed, 47 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 .python-version
 create mode 100644 README.md
 create mode 100644 main.py
 create mode 100644 pyproject.toml
 create mode 100644 tests/test_main.py
 create mode 100644 uv.lock
```

Every file in the project is now recorded. If James deletes `main.py` tomorrow, he can recover it from this commit. If he rewrites `format_title` and regrets it, he can compare the current version to this snapshot and restore what he had.

Verify the commit exists:

```bash
git log --oneline
```

**Output:**

```
a1b2c3d Initial SmartNotes project with discipline stack
```

One commit. One checkpoint. The project's memory has begun.

:::info Checkpoint: Your SmartNotes project should now look like this
```
smartnotes/
├── .git/               ← created by git init
├── .gitignore
├── .python-version
├── .venv/
├── README.md
├── main.py             ← returns "Hello from smartnotes!"
├── pyproject.toml      ← all tools configured
├── tests/
│   └── test_main.py    ← one passing test
└── uv.lock
```
Run `git log --oneline` -- you should see one commit. Run `uv run pytest` -- you should see one passing test. If both are true, you are ready for the final step.
:::

### Step 3: Run the Complete Pipeline

This is the moment the entire chapter has been building toward. Five tools, five axioms, one command chain. Run ruff, pyright, and pytest in sequence -- each step must pass before the next one starts:

```bash
uv run ruff check . && uv run pyright && uv run pytest
```

**Output (all passing):**

```
0 errors, 0 warnings, 0 informations
tests/test_main.py .                                             [100%]
1 passed in 0.12s
```

Ruff produced no output -- silence means zero issues. Pyright reported zero errors. Pytest showed one passing test. Three tools, three clean results. The `&&` operator is doing the critical work here: it ensures that if ruff finds a lint error, the pipeline stops. Pyright never runs. Pytest never runs. The problem is clear and isolated. If ruff passes but pyright finds a type error, the pipeline stops at pyright. Only when all three tools pass do you have a verified, clean project.

You might notice that `ruff format` is not in the pipeline. The pipeline checks for problems -- `ruff check` finds bugs, pyright finds type errors, pytest finds wrong behavior. Formatting is a pre-step: run `uv run ruff format .` before the pipeline to make your code consistent, then run the pipeline to verify it is correct.

This is Axiom IX in its purest form: verification as a pipeline, not a checklist you remember to run. The command runs the same way every time, regardless of whether you are tired, distracted, or in a rush.

**Read and Predict**: Imagine James introduces a type error in `main.py` -- he changes the return type label from `str` to `int` but keeps the function returning text. He runs the full pipeline command. Which tool stops the pipeline? Does pytest ever run? What would James see in the terminal?

And now that the pipeline passes, the natural next step is to commit the result:

```bash
git add . && git commit -m "Verified: all tools pass"
```

That is the complete cycle: write code, verify it with the pipeline, commit the verified result. Every chapter from here forward follows this pattern.

### Commit Granularity When Working With AI

When James writes code himself, he adds features gradually -- a few lines at a time. A commit naturally captures one small change. But when James asks Claude Code to implement a feature, the AI may produce thirty files and four hundred lines in a single response. If James runs the pipeline, everything passes, and he makes one giant commit called "Add user authentication," he has lost something important: the ability to understand or reverse parts of what the AI built.

The professional habit is to break AI-generated work into logical commits even when the AI delivered it all at once. Review the output, identify the natural seams -- data models, API routes, tests, configuration -- and commit each piece separately with a descriptive message. This means `git log` still tells a story a month from now. It means if the authentication logic needs to be replaced, James can do it without disturbing the test infrastructure the AI also built. Small commits are not just good hygiene -- they are the mechanism that keeps you in control of a codebase that AI is helping you build faster than any one person could review at once.

---

## Anti-Patterns

James now understands both Git and the pipeline. Here are the patterns Emma warned him to avoid:

| Anti-Pattern | The Mistake | The Cost | The Fix |
|---|---|---|---|
| **"Not committing early"** | James works for three hours without a single commit. The code is half-finished. | The laptop's battery dies, a forced restart clears unsaved changes, or he takes a wrong turn and cannot remember what the project looked like when it worked. Three hours of progress exist only in memory. | Commit after every meaningful change -- small commits are better than large ones. |
| **"Skipping the pipeline"** | James runs pytest but not ruff, or runs ruff but not pyright. | The tools catch different categories of problems. A codebase that passes tests but fails type checking has undiscovered bugs hiding in type mismatches. | Always run the full pipeline: `uv run ruff check . && uv run pyright && uv run pytest` |

---

## Try With AI

### Prompt 1: Reading Git History

```
I just initialized a Git repository for a Python project called SmartNotes
and made my first commit with the message "Initial SmartNotes project with
discipline stack".

I am new to Git and version control. Show me what commands I would use to:
1. See the list of all commits (git log --oneline)
2. See what files were included in the commit
3. See the actual content that was committed

For each command, explain the output in simple terms. I want to understand
what Git recorded and how to read its memory.
```

**What you're learning:** You are building the skill of reading Git's memory. The commit you just made recorded every file in your project. By asking AI to walk you through `git log`, `git show`, and `git diff`, you learn to navigate the history that Git keeps -- the same history that would have saved James's deleted code.

### Prompt 2: Writing Good Commit Messages

```
I am learning Git for the first time. My first commit message was:
"Initial SmartNotes project with discipline stack"

My teammate's recent commits say:
- "wip"
- "fix stuff"
- "asdf"

Explain why commit messages matter by showing me:
1. What happens when someone runs git log on my teammate's project
   vs mine -- which history tells a story?
2. Give me 5 examples of good commit messages for common changes
   (adding a feature, fixing a bug, updating config, adding tests,
   refactoring code)
3. What is the one-line rule for commit messages and why does it matter?
```

**What you're learning:** This prompt connects directly to Axiom VIII -- version control as memory. Good commit messages are the difference between a useful history and a useless one. James's story from Chapter 14 began with "wip" and "fix stuff" commits that told him nothing when he needed them. By studying good vs bad messages now, you build the habit before it costs you.

### Prompt 3: Generate Code, Then Verify With the Full Pipeline

```
Write a Python function called `count_words` that takes a string
and returns a dictionary mapping each word to how many times it
appears. Include type annotations for strict pyright mode.
Also write one pytest test for this function.
```

**After the AI responds**, do not just read the code. Run it through your complete workbench:

1. Paste the function into `main.py`
2. Paste the test into `tests/test_main.py`
3. Run the full pipeline: `uv run ruff check . && uv run pyright && uv run pytest`
4. If all three pass, commit: `git add . && git commit -m "Add count_words with test"`

**What you're learning:** This is the entire thesis of this chapter in action. AI generates code fast. Your job is not to read every line hoping to spot problems -- your job is to run the tools and then commit the verified result. Did ruff find unused imports? Did pyright catch a missing type annotation? Did pytest reveal an edge case? The workbench catches what reading alone cannot. And Git records the result so you never lose it. This is how professional developers work with AI: generate, verify, commit.

---

## Key Takeaways

1. **Git makes every change reversible.** `git init` creates the repository. `git add .` stages files. `git commit -m "message"` records a snapshot. Every commit is a checkpoint you can return to.

2. **The verification pipeline runs tools in order: lint, type check, test.** The `&&` operator stops at the first failure. Fix the simplest problem first (style), then types, then behavior. This is Axiom IX -- verification as infrastructure.

3. **Your workbench is now complete.** Five tools -- uv, ruff, pyright, pytest, Git -- each enforcing a specific axiom. Together, they automate what used to depend on memory and good intentions. Every chapter from here forward starts with this workbench.

---

## Command Reference

Every command from this chapter in one place. You can copy any command directly into your terminal.

```bash
# Project setup (Lesson 2: Installing uv and Creating SmartNotes)
uv init smartnotes              # Create a new project
uv run main.py                  # Run a file inside the project environment

# Dependencies (Lesson 3: The pyproject.toml and the Discipline Stack)
uv add --dev pytest pyright ruff  # Install dev tools (updates pyproject.toml + uv.lock + .venv)
uv sync                          # Sync environment from lockfile (for teammates)

# Linting and formatting (Lesson 4: Ruff -- Your Code Quality Guardian)
uv run ruff check .              # Find bugs and style violations
uv run ruff check --fix .        # Auto-fix safe issues
uv run ruff format .             # Format code consistently
uv run ruff format --check .     # Check formatting without changing files

# Type checking (Lesson 5: Pyright -- Your Type Safety Net)
uv run pyright                   # Check all type annotations

# Testing (Lesson 6: Testing With pytest)
uv run pytest                    # Run all tests

# Version control (Lesson 7: Git -- Your Version Control Memory)
git init                         # Initialize a repository
git add .                        # Stage all files
git commit -m "message"          # Record a snapshot
git log --oneline                # View commit history

# The complete verification pipeline (Lesson 7: Git -- Your Version Control Memory)
uv run ruff check . && uv run pyright && uv run pytest
```

---

## Looking Ahead

Your workbench is built. uv manages your project. pyproject.toml holds your configuration. ruff checks your style. pyright checks your types. pytest checks your behavior. Git records your history. Five tools, five axioms, one unified system protecting your code from the moment you start writing it.

In Chapter 16, James and Emma will start reading Python -- learning how to store values, label their types, and combine them into expressions. Every line of code will be checked by ruff, type-checked by pyright, and tested by pytest. The workbench is no longer something you are building. It is something you are using.
