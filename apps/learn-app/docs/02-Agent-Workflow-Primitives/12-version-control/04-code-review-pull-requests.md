---
sidebar_position: 4
chapter: 12
lesson: 4
title: "Code Review, Pull Requests & Reusable Patterns"
description: "Review changes before combining them, then master three patterns professionals follow every day"
duration_minutes: 55
keywords: [pull request, code review, diff, merge, github, collaboration, git patterns, workflow]

# HIDDEN SKILLS METADATA
skills:
  - name: "Understand Pull Requests"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Communication"
    measurable_at_this_level: "Student can explain PRs as a review-before-merge step"

  - name: "Create Pull Request"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Communication"
    measurable_at_this_level: "Student can create a PR with clear title and description"

  - name: "Review PR Diff"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can read a diff and verify changes match intent"

  - name: "Document AI Assistance"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Critical Thinking"
    measurable_at_this_level: "Student includes what AI generated vs what they modified in PR description"

  - name: "Recognize Recurring Git Patterns"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student identifies 3 recurring patterns from L01-L03"

  - name: "Apply Patterns to New Scenarios"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student applies documented patterns to new scenarios"

learning_objectives:
  - objective: "Create a pull request from a feature branch to main"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student creates a PR on GitHub with clear title and description"

  - objective: "Review a code diff to verify changes match intent"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Student reads diff output and identifies what changed and whether it's correct"

  - objective: "Document AI assistance transparently in PR descriptions"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student writes PR description that notes which parts AI helped with"

  - objective: "Merge an approved PR into main"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student merges PR and verifies changes on main"

  - objective: "Identify three recurring Git patterns from lessons 1-3"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Student names all three patterns and when to use each"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Pull requests (review before merging)"
    - "Diff review (reading what changed)"
    - "Noting AI assistance in PR descriptions"
    - "Three reusable patterns (synthesis of L01-L03, zero new commands)"
  assessment: "4 concepts (within A2 limit) — patterns section introduces no new Git commands, only names for what students already do ✓"
teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "GitHub and Collaboration"
  key_points:
    - "Pull requests add a forced pause between 'I made changes' and 'changes are live' — this pause prevents mistakes"
    - "The diff review is where you catch problems — read it like checking your work before turning in an exam"
    - "Noting which parts AI helped with is professional practice, not a confession"
    - "Even solo developers benefit from the review habit"
  misconceptions:
    - "Students think PRs are only for teams — solo developers benefit from the review pause"
    - "Students want to hide AI assistance — transparency is a professional strength"
    - "Students think they can skip review if tests pass — tests catch correctness, not intent mismatches"
  discussion_prompts:
    - "If an employer reads your PR description, what impression do they get about how you work with AI?"
    - "You see a function in the diff you don't understand. What should you do before clicking merge?"
  teaching_tips:
    - "Have students create an actual PR during the lesson — the GitHub interface makes it concrete"
    - "Walk through reading a diff aloud, modeling the internal review dialogue"
  assessment_quick_check:
    - "What three things should a PR description include?"
    - "What should you do if you see code in the diff you don't understand?"
    - "Why is noting AI assistance a professional strength?"

generated_by: "content-implementer v2.0.0"
created: "2025-01-17"
last_modified: "2026-02-26"
version: "2.0.0"
---

# Code Review & Pull Requests

Maya spent the weekend updating the volunteer list while Sarah redesigned the budget. Now they need to combine their work. But Maya renamed some columns, and Sarah moved some rows. If they just copy-paste, they'll lose each other's changes.

Sarah already made that mistake once — she merged a branch without looking at the changes and accidentally overwrote Maya's formatting. "I assumed it was fine," she told Maya. "I wrote it, so why would I need to check?"

That instinct — *I wrote it, so it must be fine* — causes expensive failures. The 2012 Knight Capital incident is a famous example of unreviewed deployment changes causing massive losses. One review pause can prevent this class of mistake. ([Source](https://www.henricodolfing.ch/en/case-study-4-the-440-million-software-error-at-knight-capital/))

> **"Never merge what you don't understand — even if you wrote it yesterday."**

---

## From Solo to Review

So far, everything you've done has been solo — just you and your agent. Pull requests add one more step: a pause to review before changes become permanent. Think of it as an "are you sure?" dialog for your entire project.

Even if you're working alone, this habit matters. You'll catch mistakes. You'll write better descriptions of your work. And when you start collaborating with others, you'll already know the workflow.

---

## What Is a Pull Request?

A **pull request** (PR) is a GitHub feature that says: "Here are my changes. Review them before merging into main."

The workflow:

1. You push a feature branch to GitHub
2. You create a PR on GitHub (comparing feature branch to main)
3. GitHub shows a **diff** — what changed
4. You review the changes
5. You merge when satisfied

![PR lifecycle showing creation, review phase, and merge decision](https://pub-80f166e40b854371ac7b05053b435162.r2.dev/books/ai-native-dev/static/images/part-2/chapter-09/pull-request-lifecycle-workflow.png)

**Why PRs matter**: Commits save snapshots. PRs force you to *evaluate* those snapshots before they reach `main`. It's the difference between writing and proofreading.

---

## Create Your First PR

First, create a feature branch with changes and push it to GitHub.

**What you tell your agent**: "Create a branch for updating the volunteer list, add a change, and push it to GitHub."

**What the agent does**:

```bash
git switch -c feature/update-volunteers
echo "Volunteers: Sarah, Maya, Jordan, Alex" > volunteers.txt
git add volunteers.txt
git commit -m "Add Alex to volunteer list"
git push -u origin feature/update-volunteers
```

`git switch -c` is the modern version of `git checkout -b`: create a branch and switch to it in one command.

Now create the PR on GitHub:

1. Go to your repository on github.com
2. You'll see a banner: "feature/update-volunteers had recent pushes"
3. Click "Compare & pull request"
4. Fill in the title: `Add Alex to volunteer list`
5. Write the description (see below)
6. Click "Create pull request"

---

## Write a Clear PR Description

A good PR description answers three questions:

1. **What changed?** — A brief summary
2. **How was it tested?** — What you verified
3. **What role did AI play?** — Which parts your agent helped with

Here's what a professional PR description looks like:

```markdown
## Summary

Added Alex to the volunteer list for the fundraiser.

## Changes

- Updated volunteers.txt with new volunteer name

## AI Assistance

- Claude Code helped draft the commit message
- I verified the file contents manually

## Testing

- Confirmed file contents with `cat volunteers.txt`
- Verified no other files were changed with `git status`
```

Noting which parts AI helped with isn't a confession. It's professional practice. Employers see someone who works transparently and takes ownership of the final result.

---

## Review the Diff

Before merging, read the diff. On the GitHub PR page, click "Files changed."

```diff
- Volunteers: Sarah, Maya, Jordan
+ Volunteers: Sarah, Maya, Jordan, Alex
```

Red lines show what was removed. Green lines show what was added. Ask yourself:

1. **Does it match my intent?** — "I wanted to add Alex... yes, I see Alex added."
2. **Is anything unexpected?** — "No other files changed. Good."
3. **Do I understand every change?** — "Yes, it's one line."

If you see something you don't understand — especially AI-generated code — don't merge. Ask your agent to explain it first.

Can you read it? Do you understand what changed? If yes, merge. If not, ask questions first.

---

## Merge and Clean Up

On the GitHub PR page, click "Merge pull request." Then "Confirm merge."

Back in your terminal, update your local project:

```bash
git switch main
git pull
```

Your main branch now includes the changes. The feature branch can be deleted on GitHub (it offers a button after merging) and locally:

```bash
git branch -d feature/update-volunteers
```

---

## A Review Checklist

Use this checklist every time you review a PR, whether it's yours or someone else's:

- Does the change match the stated intent?
- Are there unexpected files or changes?
- Do I understand every line in the diff?
- Are there sensitive files (secrets, keys) included by accident?
- Is the PR description clear enough that future-you will understand it?

---

## Three Patterns for the Rest of Your Career

You've now learned every Git concept in this chapter. Here's the thing — you've been following three patterns without realizing it. Professionals don't memorize Git commands. They follow these three patterns and let their agent handle the syntax.

### Pattern 1: Commit Before Experimenting

Before you let your agent try anything risky, take a snapshot first.

**When to use it:** Before asking AI to make changes. Before trying something you're not sure about. Anytime you think "this might go wrong."

**What you tell your agent**: "Save the current state before we try anything risky."

```bash
git status
git add <specific-files>
git commit -m "Before refactoring: working state"
```

If the experiment fails, you can get back to this exact state. Without this snapshot, there's nothing to go back to. Sarah learned this in Lesson 1 — she lost her volunteer list because she hadn't committed it.

### Pattern 2: Branch-Test-Merge

When you're testing something that might break your project, do it on a separate branch.

**When to use it:** Testing multiple approaches. Making changes that could break things. Working on something while keeping `main` stable.

```bash
# 1. Create a branch for your experiment
git switch -c experiment/new-approach

# 2. Make changes, test them
git status
git add <specific-files>
git commit -m "Test new approach"

# 3. If it works → merge into main
git switch main
git merge experiment/new-approach
git branch -d experiment/new-approach

# 3. If it fails → delete the branch
git switch main
git branch -D experiment/new-approach
```

Main stays clean. If the experiment is terrible, you delete the branch and nothing happened.

### Pattern 3: Push for Backup

After meaningful work, push to GitHub. Don't wait until end of day.

**When to use it:** After completing a feature. After merging a branch. Before closing your laptop.

```bash
git push
```

Your laptop can break, get stolen, or run out of battery at the worst moment. If your code is on GitHub, you lose nothing. Sarah's dead laptop in Lesson 3 would have been a catastrophe without this.

### How They Work Together

A typical work session:

```
1. Start: git status          (Where did I leave off?)
2. Before AI: commit          (Pattern 1 — save current state)
3. Risky change: branch       (Pattern 2 — isolate the experiment)
4. Test the changes           (Does it work?)
5. Decision: merge or delete  (Keep the good, discard the bad)
6. Push to GitHub             (Pattern 3 — backup)
```

---

## The Bigger Picture

These patterns aren't just Git habits. They're the [Seven Principles of General Agent Problem Solving](/docs/General-Agents-Foundations/seven-principles) applied to version control — you've been practicing them all chapter without labeling them.

| Git Pattern | Principle It Applies | What You Did |
| --- | --- | --- |
| **Commit Before Experiment** | Small, Reversible Decomposition | Made atomic save points so any change can be undone |
| **Branch-Test-Merge** | Constraints and Safety | Isolated risky work so it can't damage main |
| **Push for Backup** | Persisting State in Files | Saved your project outside your computer so it survives failures |
| `git status` before every action | Verification as Core Step | Checked the current state before making changes |
| Clear commit messages and PR descriptions | Observability | Made your history readable so anyone can see what happened and why |

Five of seven principles, embedded in your daily workflow. You didn't memorize them as theory — you practiced them as habits.

---

You started this chapter pressing Ctrl+Z and hoping. You're ending it with a system that professionals use to protect million-dollar projects. The same system your AI agent uses every time you ask it to help. Now you understand what it's doing — and why.

---

## Try With AI

**Write your PR description:**

> "I just created a pull request where I updated my project with help from my AI agent. Help me write a professional PR description that explains what changed, how I tested it, and what my agent helped with. Make it clear and honest."

**Practice reviewing a diff:**

> "Show me an example code diff and walk me through how to review it step by step. What questions should I ask myself? What red flags should I watch for? Help me build a mental checklist for code review."

**Build your personal workflow reference:**

> "Help me create a one-page Git cheat sheet organized around three patterns: Commit-Before-Experiment, Branch-Test-Merge, and Push-for-Backup. For each pattern, include: when to use it, what to tell my AI agent, the commands it will run, and one safety tip. Format it so I can keep it at my desk."

**Add error recovery to your workflow:**

> "My workflow covers the happy path. What happens when things go wrong? Help me add an error recovery section for: merge conflicts, accidental commits to the wrong branch, and pushing secrets to GitHub. For each, give me the symptom, the fix, and how to prevent it."

---

## Flashcards Study Aid

<Flashcards />
