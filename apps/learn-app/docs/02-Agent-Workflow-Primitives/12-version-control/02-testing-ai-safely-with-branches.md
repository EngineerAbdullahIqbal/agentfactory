---
sidebar_position: 2
chapter: 12
lesson: 2
title: "Testing AI Safely with Branches"
description: "Use branches to test multiple ideas without risking your working project — your agent's tool for parallel experimentation"
duration_minutes: 45
keywords: [git branches, parallel testing, merge, feature branch, experimentation]

# HIDDEN SKILLS METADATA
skills:
  - name: "Understand Branch Concept"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain branches as parallel versions of a project that don't interfere with each other"

  - name: "Create and Switch Branches"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can create a branch and switch between branches"

  - name: "Merge Branches"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can merge a tested branch back into main"

  - name: "Branch Cleanup"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can delete branches after merging"

  - name: "Branch vs Commit Decision"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Critical Thinking"
    measurable_at_this_level: "Student can decide when to branch vs when to commit directly"

learning_objectives:
  - objective: "Explain what a branch is and why it enables safe experimentation"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Student describes branches as parallel timelines that protect the main project"

  - objective: "Create a branch, make changes, and switch back to main"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Student observes that changes on a branch disappear when switching to main"

  - objective: "Merge a tested branch into main"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Student merges and verifies changes appear on main"

  - objective: "Decide when to use branches vs direct commits"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Student applies decision framework to three scenarios"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Branches (parallel versions of your project)"
    - "Creating and switching branches"
    - "Merging (combining branch work into main)"
    - "Branch vs commit decision"
  assessment: "4 concepts (within A1 limit of 5-7) ✓"
teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Git Foundations"
  key_points:
    - "Branches are parallel timelines — changes on one are invisible to others until merged"
    - "The file disappearing when switching to main is the most powerful discovery moment"
    - "The create-test-merge-delete workflow is the safe experimentation pattern"
    - "Branch naming communicates intent — feature/, experiment/, bugfix/"
  misconceptions:
    - "Students think creating a branch copies all files — it only creates a pointer to the current commit"
    - "Students fear merging will overwrite main — Git merges add changes, it doesn't replace"
    - "Students think they must always branch — for small confident changes, committing directly is fine"
  discussion_prompts:
    - "You ask AI for two different approaches to solve a problem. How would you test both safely?"
    - "When would you commit directly to main instead of creating a branch?"
  teaching_tips:
    - "Let students discover the file disappearing when switching branches — don't explain it in advance"
    - "The Three Roles should feel like natural conversation, not a labeled framework"
  assessment_quick_check:
    - "What happens to files on a branch when you switch back to main?"
    - "After merging a branch, what happens to the commits if you delete the branch name?"
    - "Name two scenarios where branching is better than committing directly"

generated_by: "content-implementer v2.0.0"
created: "2025-01-17"
last_modified: "2026-02-26"
version: "2.0.0"
---

# Testing AI Safely with Branches

Sarah needs two versions of her fundraiser flyer. One is formal for corporate sponsors. One is casual for social media. She doesn't want to lose either while working on both.

In the real world, you'd make two copies of the file. In Git, you create two **branches** — parallel versions of your entire project that can't interfere with each other.

> **"Branches let you live in two timelines at once — and only keep the one that works."**

---

## What Is a Branch?

You've used Track Changes to compare different versions of a document. Branches take that idea further. Instead of tracking changes to one file, a branch creates a parallel version of your *entire project*.

Your `main` branch is the "real" version — the one you trust. When you create a new branch, Git creates a new label pointing to the current snapshot. It feels like a copy because you can edit safely without touching `main`. If the changes work, you merge them back. If they don't, you throw away the branch name. The original is untouched.

![Branch diagram showing main branch (stable) with feature branches diverging for development, then merging back after review](https://pub-80f166e40b854371ac7b05053b435162.r2.dev/books/ai-native-dev/static/images/part-2/chapter-09/branch-workflow-diagram.png)

---

## Create Your First Branch

Open your terminal in your fundraiser project (from Lesson 1). Let's create a branch for Sarah's formal flyer.

**What you tell your agent**: "I want to work on a formal version of the flyer without changing the main project."

**What the agent does**:

```bash
git branch formal-flyer
```

That created the branch. But you're still on `main`. Check:

```bash
git branch
```

```
  formal-flyer
* main
```

The asterisk shows you're on `main`. Now switch:

```bash
git switch formal-flyer
```

```
Switched to branch 'formal-flyer'
```

You're now on the `formal-flyer` branch. Everything looks the same because the branch starts as an exact copy of `main`.

---

## Changes Stay on Their Branch

Now make a change that only exists on this branch.

**What you tell your agent**: "Create a formal flyer for the fundraiser."

**What the agent does**:

```bash
echo "FORMAL FLYER: Annual Community Fundraiser Gala" > flyer.txt
echo "Date: March 15 | Venue: Grand Ballroom | Dress Code: Business Formal" >> flyer.txt
git add flyer.txt
git commit -m "Add formal flyer for corporate sponsors"
```

The flyer exists on `formal-flyer`. Now switch back to `main`:

```bash
git switch main
ls
```

**The flyer is gone.** It only exists on the `formal-flyer` branch. Your main project is completely untouched. This is branch isolation in action.

If Sarah decides the formal flyer is terrible, she can delete the branch. Main stays exactly as it was. No risk.

---

## Test Two Ideas at Once

Sarah also wants a casual flyer. Create a second branch from `main`:

```bash
git branch casual-flyer
git switch casual-flyer
```

Make the casual version:

```bash
echo "HEY NEIGHBORS! Community Fundraiser Party!" > flyer.txt
echo "Food, music, fun. Bring the whole family. Donations welcome!" >> flyer.txt
git add flyer.txt
git commit -m "Add casual flyer for social media"
```

Now Sarah has three versions of her project:

- `main` — the original, no flyer yet
- `formal-flyer` — formal version for sponsors
- `casual-flyer` — casual version for social media

Each exists independently. She can switch between them to compare.

---

## Merge the Winner

Sarah decides the casual flyer fits her audience better. Time to bring those changes into `main`.

**Step 1: Switch to main first.**

```bash
git switch main
```

**Step 2: Merge the winning branch.**

```bash
git merge casual-flyer
```

```
Updating abc1234..def5678
Fast-forward
 flyer.txt | 2 ++
 1 file changed, 2 insertions(+)
```

"Fast-forward" means `main` hadn't changed since you branched off — Git simply moved `main` forward to include the new commits. No merging was needed because there was nothing to merge *with*.

The casual flyer now exists on `main`. Verify:

```bash
cat flyer.txt
```

**Step 3: Clean up.**

```bash
git branch -d casual-flyer
git branch -d formal-flyer
```

The branch names are deleted. The commits from `casual-flyer` are preserved in `main`'s history. The `formal-flyer` commits were never merged, so they are no longer part of Sarah's main workflow.

:::tip

`git branch -d` only deletes the branch name, not the work. After merging, the commits live on in `main`. If you try to delete a branch you *haven't* merged, Git warns you. Use `-D` (capital D) only if you're sure you want to throw away unmerged work.

:::

---

## Branch Naming

Good branch names tell you what's happening at a glance:

- `feature/formal-flyer` — adding something new
- `experiment/new-layout` — testing a risky idea
- `bugfix/broken-budget` — fixing a problem

Bad names like `branch1` or `test` tell you nothing in a week. Name branches by what they do, not when you made them.

---

## When to Branch vs When to Commit

Not every change needs a branch.

**Use a branch when:**
- You're testing two or more approaches
- The change might break something
- You want to review before merging
- Someone else might be working on the same project

**Commit directly to main when:**
- You're confident the change is small and correct
- You're the only person working on the project
- The change is a quick fix, not an experiment

**A simple test**: If you're thinking "this might go wrong," create a branch.

---

You can test ideas in two timelines. But both timelines only exist on YOUR computer. What if your hard drive crashes tomorrow?

That's what the next lesson solves.

---

## Try With AI

**Understand branch isolation:**

> "Explain why files I create on a Git branch disappear when I switch to main. Use a real-world analogy that isn't about parallel universes or video games. Help me understand why this is useful, not scary."

**Practice comparison workflows:**

> "I want to test two different approaches to a project — one simple and one advanced. Walk me through the branch workflow: create both branches, work on each one, compare results, merge the winner, and clean up. Include the exact commands my agent would run."

**Explore naming conventions:**

> "What are good Git branch naming conventions? Show me examples for features, experiments, and bug fixes. Then help me decide: should I name branches by what they do (feature/new-flyer) or by when I made them (experiment-march-15)?"

**Know when NOT to branch:**

> "I'm tempted to create a branch for every tiny change. Give me five realistic scenarios and for each one, tell me whether I should branch or commit directly to main — and explain why. Help me build instinct for when branching is overkill."

---

## Flashcards Study Aid

<Flashcards />
