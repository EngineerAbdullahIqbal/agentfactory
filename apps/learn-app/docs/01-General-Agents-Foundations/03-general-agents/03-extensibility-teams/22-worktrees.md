---
slug: /General-Agents-Foundations/general-agents/worktrees
sidebar_position: 22
title: "Worktrees: Parallel Agent Isolation"
description: "Create isolated working copies for parallel Claude Code sessions that cannot interfere with each other — branching, merging, and cleanup in one command"
keywords:
  [
    worktrees,
    git worktree,
    parallel sessions,
    agent isolation,
    claude code,
    subagent isolation,
  ]
chapter: 3
lesson: 22
duration_minutes: 18

# PEDAGOGICAL LAYER METADATA
primary_layer: "Layer 2"
layer_progression: "L2 (AI Collaboration)"
layer_1_foundation: "N/A"
layer_2_collaboration: "Creating worktree sessions, managing lifecycle, configuring subagent isolation"
layer_3_intelligence: "N/A"
layer_4_capstone: "N/A"

# HIDDEN SKILLS METADATA
skills:
  - name: "Worktree Session Management"
    proficiency_level: "B1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital-Content-Creation"
    measurable_at_this_level: "Student can create, name, work in, and clean up worktree sessions using claude --worktree"

  - name: "Agent Isolation Design"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can determine when to use worktrees vs working in the main directory and configure subagent isolation"

  - name: "Worktree Recovery"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can diagnose and recover from orphaned worktrees and understand destructive cleanup risks"

learning_objectives:
  - objective: "Create and name worktree sessions using claude --worktree"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student creates a named worktree, verifies the branch name and directory, and observes cleanup prompt on exit"
  - objective: "Complete full worktree lifecycle: create, work, commit, PR, cleanup"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student commits work in a worktree, pushes the branch, creates a PR, and cleanly removes the worktree"
  - objective: "Configure subagent worktree isolation using isolation: worktree"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student creates a custom subagent definition with isolation: worktree and verifies it runs in an isolated copy"
  - objective: "Recover from orphaned worktrees and understand destructive cleanup risks"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student uses git worktree list and git worktree remove to clean up orphaned worktrees"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (worktree creation, lifecycle management, subagent isolation, recovery) — within B1 limit of 10"

differentiation:
  extension_for_advanced: "Configure WorktreeCreate/WorktreeRemove hooks for non-git VCS integration"
  remedial_for_struggling: "Start with unnamed worktrees (auto-generated names) before named ones"

# Generation metadata
generated_by: "content-implementer v1.0.0"
created: "2026-02-26"
last_modified: "2026-02-26"
git_author: "Claude Code"
version: "1.0.0"

prerequisites:
  - "Lesson 11: Subagents and Orchestration (context isolation, delegation model)"
  - "Lesson 20: Agent Teams (parallel coordination patterns)"
  - "Basic git knowledge (branches, commits, push)"

teaching_guide:
  lesson_type: "core"
  session_group: 8
  session_title: "Worktrees and Remote Sessions"
  key_points:
    - "Worktrees create complete isolated copies of the repository — separate files, separate branch, separate git index"
    - "The base branch gotcha: worktrees branch from the default remote (origin/main), NOT the current branch"
    - "Cleanup is destructive: removing a worktree deletes unpushed commits permanently (recoverable only via git reflog within 30 days)"
    - "Subagent isolation: worktree gives each subagent its own copy of the repo, preventing file conflicts in parallel work"
  misconceptions:
    - "Students think worktrees are just new branches — they are complete directory copies with independent working trees"
    - "Students assume worktrees branch from the current branch — they branch from the default remote branch"
    - "Students think removing a worktree is safe if they committed — commits on the worktree branch are deleted if not pushed to remote"
  discussion_prompts:
    - "When would you want multiple Claude sessions editing the same codebase simultaneously? What could go wrong without isolation?"
    - "Why does Claude branch worktrees from the default remote instead of the current branch? What problems does this prevent?"
  teaching_tips:
    - "Have students create a worktree, make a change, exit without pushing, and observe the cleanup prompt — the 'destructive cleanup' lesson is more impactful when experienced"
    - "Use the --worktree vs manual git worktree add comparison table as a quick decision exercise"
    - "The base branch gotcha is the most common source of confusion — demonstrate it explicitly before students encounter it"
  assessment_quick_check:
    - "What directory does claude --worktree feature-auth create, and what branch name does it use?"
    - "What happens to unpushed commits when you choose to remove a worktree on exit?"
    - "How does isolation: worktree differ from running a subagent without isolation?"
---

# Worktrees: Parallel Agent Isolation

You are refactoring your project's API router while fixing a critical login bug. You start Claude Code in your repo, ask it to restructure the route handlers, and while it works you open a second terminal to start another Claude session for the bug fix. Both sessions edit `src/routes/auth.ts`. The bug fix session adds a null check on line 47. The refactoring session rewrites lines 30-60 entirely. When you come back, one session's changes have silently overwritten the other's. The bug fix is gone.

This is the parallel editing problem. Subagents (Lesson 11) avoid it because they run read-only or touch separate files by convention. Agent Teams (Lesson 20) coordinate through shared task lists and messaging. But when you need two Claude sessions making independent, full-scope changes to the same codebase, you need something stronger: complete filesystem isolation where each session works on its own copy of the repository.

That is what worktrees provide. One flag -- `--worktree` -- creates a full copy of your repository in a separate directory with its own branch, its own files, and its own git index. Each session edits its own copy. When you are done, you merge changes back through standard git workflows -- branches, pull requests, code review. No overwrites, no conflicts during work, no lost changes.

---

## One Command, Total Isolation

### What --worktree Does

When you run `claude --worktree feature-auth`, Claude Code does three things:

1. Creates a new directory at `<repo>/.claude/worktrees/feature-auth/`
2. Initializes a git worktree there with a new branch named `worktree-feature-auth`
3. Starts your Claude session inside that directory

Your original repository is untouched. The worktree is a complete, independent working copy -- you can edit any file, run tests, install packages, all without affecting your main directory.

### Naming Your Worktrees

You can name your worktree explicitly or let Claude generate a name:

```bash
# Named worktree
claude --worktree feature-auth

# Short flag
claude -w bugfix-login

# Auto-generated name (something like "bright-running-fox")
claude --worktree
```

Named worktrees are easier to find later. Use descriptive names that match what you are working on -- `feature-auth`, `bugfix-payment-null`, `refactor-db-layer`.

### Where Worktrees Live

All worktrees are created inside your repository:

```
your-project/
  .claude/
    worktrees/
      feature-auth/        # Full copy of your repo
      bugfix-login/         # Another full copy
      bright-running-fox/   # Auto-named worktree
  src/
  package.json
  ...
```

Add `.claude/worktrees/` to your `.gitignore` to prevent worktree contents from appearing as untracked files in your main repository.

---

## The Full Lifecycle: Create, Work, Merge, Cleanup

### Step 1: Create the Worktree

```bash
claude --worktree feature-auth
```

Claude starts in `.claude/worktrees/feature-auth/` on branch `worktree-feature-auth`. You can verify this inside the session:

```
> What branch am I on and what directory am I in?
```

**Output:**

```
You are on branch worktree-feature-auth
Working directory: /home/user/project/.claude/worktrees/feature-auth
```

### Step 2: Work (Commits Stay Local)

Work normally inside the worktree session. Edit files, run tests, ask Claude to implement features. All changes happen in the worktree directory. Your main repository directory remains untouched.

Commit your work as you go:

```
> Commit these auth changes with a descriptive message
```

These commits exist only on the `worktree-feature-auth` branch, which only exists locally. Nobody else can see them yet.

### Step 3: Get Your Changes Back (PR Workflow)

When your work is ready, push the branch and create a pull request:

```
> Push this branch and create a PR to merge into main
```

Claude pushes `worktree-feature-auth` to the remote and opens a PR. Your team reviews the changes through the normal PR process -- code review, CI checks, approval. This is the same workflow you use for any feature branch.

### Step 4: Cleanup

When you exit the Claude session (type `/exit` or press Ctrl+C), Claude checks the state of the worktree:

- **No changes or commits**: The worktree directory and branch are removed automatically. Nothing to clean up.
- **Uncommitted changes or unpushed commits exist**: Claude prompts you to keep or remove the worktree.

If you choose **keep**, the directory and branch remain. You can return later with `cd .claude/worktrees/feature-auth && claude` or start a new worktree session.

If you choose **remove**, Claude deletes the worktree directory and the local branch. This is **destructive** -- any commits that were not pushed to the remote are permanently lost (recoverable only via `git reflog` within 30 days, and only if you know the commit hash).

---

## The Base Branch Gotcha

This catches most people the first time. When you run `claude --worktree feature-auth`, the new branch is created from the **default remote branch** (typically `origin/main`), not from whatever branch you are currently on.

If you are on branch `experiment-v2` with 50 commits of work and you create a worktree, the worktree starts from `origin/main` -- your 50 commits are not there.

**Why this design?** It prevents cascading dependencies. If worktrees branched from your current branch, and that branch had bugs, every worktree would inherit those bugs. Starting from the latest remote main gives each worktree a clean, stable foundation.

**If you need to branch from a specific commit or branch**, use manual git worktree creation instead:

```bash
# Branch from a specific branch
git worktree add .claude/worktrees/feature-auth -b feature-auth experiment-v2

# Branch from a specific commit
git worktree add .claude/worktrees/feature-auth -b feature-auth abc123f

# Then start Claude in that worktree
cd .claude/worktrees/feature-auth && claude
```

---

## --worktree vs Manual git worktree add

| Dimension            | `claude --worktree name`                     | Manual `git worktree add`              |
| -------------------- | -------------------------------------------- | -------------------------------------- |
| **Convenience**      | One command does everything                  | Multiple commands (add, cd, claude)    |
| **Base branch**      | Always default remote branch                 | Any branch, commit, or tag you specify |
| **Naming**           | Auto-prefixes branch with `worktree-`        | You choose the full branch name        |
| **Cleanup**          | Automatic prompt on session exit             | Manual: `git worktree remove`          |
| **Subagent support** | Works with `isolation: worktree`             | No automatic subagent integration      |
| **VCS hooks**        | Triggers WorktreeCreate/WorktreeRemove hooks | Git-only, no hook integration          |

**Use `--worktree`** when you want fast, disposable isolation for a focused task. **Use manual worktrees** when you need to control the base branch, place the worktree outside the repo, or work with an existing branch.

---

## Subagent Isolation with Worktrees

### Configuring isolation: worktree

In Lesson 11, subagents ran inside the same directory as the parent session. This works when subagents touch different files, but fails when two subagents need to edit overlapping files. Adding `isolation: worktree` to a subagent definition gives each subagent its own complete copy of the repository.

Create a custom subagent at `.claude/agents/isolated-reviewer.md`:

```yaml
---
name: isolated-reviewer
description: "Reviews code changes in an isolated worktree to avoid conflicts with other agents"
isolation: worktree
---
You are a code reviewer. Analyze the codebase for potential issues,
write your findings to REVIEW.md, and suggest improvements.
Focus on security, performance, and maintainability.
```

When Claude spawns this subagent, it creates a temporary worktree, runs the subagent inside it, and automatically removes the worktree when the subagent finishes -- if no changes remain.

You can also ask Claude directly without a custom agent definition:

```
> Use worktrees for your subagents when implementing these three features in parallel
```

### How It Connects to Agent Teams (L20)

Agent Teams coordinate multiple Claude instances through shared task lists and messaging. Worktrees solve a different problem: filesystem isolation. You can combine them:

- **Teams without worktrees**: Teammates coordinate tasks but share the same filesystem. Works when teammates edit different files.
- **Teams with worktrees**: Each teammate gets its own worktree via `isolation: worktree` in agent definitions. Use this when teammates might edit overlapping files.
- **Worktrees without teams**: Independent sessions with no coordination. Each session works alone on its own task.

The decision follows the same pattern from Lesson 20: do agents need to talk to each other (teams), do agents need filesystem isolation (worktrees), or both?

---

## Worktrees + tmux: Multi-Session Visibility

While tmux is primarily used for Agent Teams (`--teammate-mode tmux`), you can also use it to manage multiple worktree sessions side by side. This is a manual workflow, not a built-in feature:

```bash
# Create a tmux session with two panes
tmux new-session -s parallel-work

# In pane 1: start a worktree for auth work
claude --worktree feature-auth

# Split the tmux window (Ctrl+B then %)
# In pane 2: start a worktree for billing work
claude --worktree feature-billing
```

Now you can watch both sessions work simultaneously, switching between panes with `Ctrl+B` then arrow keys. Each session has its own isolated copy of the repository. Neither can interfere with the other.

---

## When Worktrees Go Wrong

### 1. Orphaned Worktrees (Crashed Sessions)

If Claude crashes or your terminal closes unexpectedly, the worktree directory remains but no session is using it. To find and clean up orphaned worktrees:

```bash
# List all worktrees
git worktree list

# Output:
# /home/user/project                    abc123f [main]
# /home/user/project/.claude/worktrees/feature-auth  def456a [worktree-feature-auth]
# /home/user/project/.claude/worktrees/bright-fox    789bcd0 [worktree-bright-fox]

# Remove a specific orphaned worktree
git worktree remove .claude/worktrees/bright-fox
```

If the worktree has uncommitted changes, git refuses to remove it. Use `--force` only if you are certain you do not need those changes:

```bash
git worktree remove --force .claude/worktrees/bright-fox
```

### 2. Destructive Cleanup (Unpushed Commits Lost)

When you exit a worktree session and choose "remove," Claude deletes the worktree directory **and** the local branch. If you committed work but never pushed it, those commits are gone from the branch.

**Recovery**: Within 30 days, git retains commit objects in the reflog. If you know the commit hash (check `git reflog`), you can recover:

```bash
git reflog
# Find the commit hash from the deleted branch
git checkout -b recovered-branch abc123f
```

**Prevention**: Always push your branch before removing a worktree. The PR workflow (Step 3 above) handles this naturally.

### 3. Wrong Base Branch (Expected Current Branch)

You are on branch `feature-v2` and create a worktree expecting it to include your feature-v2 changes. The worktree starts from `origin/main` instead. See "The Base Branch Gotcha" above for the explanation and manual worktree creation as the workaround.

### 4. Dependency Installation in New Worktrees

A worktree is a fresh directory copy. It does not share `node_modules/`, virtual environments, or build artifacts with your main directory. After creating a worktree, you may need to install dependencies:

```bash
# Inside the worktree session
> Run npm install to set up dependencies in this worktree
```

For projects with long installation times, consider using tools that support shared caches (like `pnpm` for Node.js or shared pip caches for Python).

---

### What's Next

Lesson 23 introduces **Remote Control** -- controlling your local Claude Code session from any device. Where worktrees isolate your work across directories, Remote Control lets you monitor and interact with that work from your phone, tablet, or any browser while your machine does the processing.

---

## Try With AI

**Exercise 1: Create Your First Worktree**

In your terminal (not inside Claude), run:

```bash
claude --worktree my-first-worktree
```

Once the session starts, paste this prompt:

```
What branch am I on and what directory am I in? Then create a file called
HELLO.md with the text "Hello from a worktree!" After creating it, check
whether my main repository directory also has this file.
```

When done, type `/exit` and observe the cleanup prompt. Choose "remove" since this was practice.

**What you're learning:** The fundamental isolation model -- a worktree is a complete, independent copy of your repository where changes do not affect the original directory.

**Exercise 2: Verify File Isolation Between Two Worktrees**

Open two terminal windows side by side. In terminal 1:

```bash
claude --worktree workspace-a
```

Paste this prompt:

```
Create a file called WORKSPACE-A.md with "Hello from workspace A"
```

In terminal 2:

```bash
claude --worktree workspace-b
```

Paste this prompt:

```
Create a file called WORKSPACE-B.md with "Hello from workspace B".
Then check: does WORKSPACE-A.md exist in this directory?
```

**What you're learning:** Each worktree is truly isolated from every other worktree. Files created in one do not appear in another, making parallel work safe.

**Exercise 3: Full PR Workflow from a Worktree**

In your terminal:

```bash
claude --worktree pr-practice
```

Paste this prompt:

```
Add a comment to any source file in this project, commit it with a
descriptive message, push the branch to the remote, and create a PR
to merge into main.
```

After the PR is created, type `/exit` and choose "remove." Then verify in your browser that the PR still exists on GitHub even though the local worktree is gone.

**What you're learning:** The complete worktree lifecycle -- create, work, push, PR, cleanup. Once changes are pushed to the remote, the local worktree is safely disposable.

**Exercise 4: Configure a Custom Subagent with Worktree Isolation**

Start a normal Claude session (no worktree needed):

```bash
claude
```

Paste this prompt:

```
Create a custom subagent definition at .claude/agents/isolated-analyst.md
with isolation: worktree in the frontmatter. The agent should analyze code
quality and write findings to QUALITY.md. Then invoke this subagent and
verify it runs in its own worktree directory, separate from this session.
```

**What you're learning:** How `isolation: worktree` gives each subagent its own copy of the repository, preventing file conflicts when multiple agents work in parallel.

**Exercise 5: Simulate and Recover an Orphaned Worktree**

In your terminal:

```bash
claude --worktree orphan-test
```

Paste this prompt:

```
Create a file called ORPHAN-DATA.md and commit it, but do NOT push
the branch to any remote.
```

Now force-quit the session with **Ctrl+C** (skip the cleanup prompt). Then in a new terminal, run these commands yourself:

```bash
# Find the orphaned worktree
git worktree list

# Check what's on the branch
git log worktree-orphan-test --oneline -3

# Clean it up
git worktree remove .claude/worktrees/orphan-test
```

**What you're learning:** How to diagnose and recover from orphaned worktrees -- a common situation when sessions crash or terminals close unexpectedly. The unpushed commit still exists in `git reflog` for 30 days, but the branch and worktree directory are gone after removal.

## Flashcards Study Aid

<Flashcards />
