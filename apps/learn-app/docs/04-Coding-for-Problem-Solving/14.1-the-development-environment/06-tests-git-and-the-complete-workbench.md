---
sidebar_position: 6
title: "Tests, Git, and the Complete Workbench"
description: "Write your first test with pytest, initialize Git for version control, and run the complete verification pipeline on the SmartNotes project."
keywords: ["pytest", "git", "testing", "version control", "assert", "git init", "git add", "git commit", "verification pipeline", "discipline stack", "SmartNotes"]
chapter: 14.1
lesson: 6
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Test Output Reading"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can run uv run pytest on a test file, identify pass/fail status from the output characters (. for pass, F for fail), and explain what the summary line means"

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
  - objective: "Run pytest and interpret pass/fail output"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student runs uv run pytest on a test file, reads the output characters (. for pass, F for fail), and explains the summary line (N passed in X.XXs)"

  - objective: "Initialize a Git repository and make a first commit"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Student runs git init, git add ., and git commit -m with a descriptive message, then verifies the commit exists with git log --oneline"

  - objective: "Execute the complete verification pipeline: lint, type check, test, commit"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student runs the full pipeline command (uv run ruff check . && uv run pyright && uv run pytest) and explains why each step must pass before the next one runs"

cognitive_load:
  new_concepts: 6
  assessment: "6 concepts (writing a test, the assert keyword, pytest output, git init, git add/commit, pipeline execution) within A2 limit of 7. This is the capstone lesson; 2 of 6 concepts (git add, pipeline) build directly on patterns from earlier lessons rather than introducing fully independent material."

differentiation:
  extension_for_advanced: "Add a second test file with a deliberately failing test. Run the pipeline and observe where it stops. Then fix the test, re-run, and trace the full green path. Compare this experience to debugging without tests."
  remedial_for_struggling: "Focus on pytest first. Write one test, run it, read the output. Only after the test passes, move to Git. Treat the pipeline command as a bonus checkpoint rather than a required step."
---

# Tests, Git, and the Complete Workbench

In Lesson 5, you ran `uv run pyright` on SmartNotes and watched it verify every type label in your code -- catching bugs before a single line executed. Pyright is the second verification tool in your workbench, after ruff. Two tools are checking your code automatically. But two tools are not enough. Code that passes linting and type checking can still do the wrong thing. And code that does the right thing today can be destroyed by a single bad edit tomorrow -- if you have no way to recover what you had before.

This is not the first time James has faced this problem. In Axiom VIII from Chapter 14, he lost the history of a bug fix because his commit messages said nothing useful -- just "wip" and "fix stuff." When his team lead asked him to explain what the original bug looked like, he could not answer. The code had been overwritten and the story was gone. That lesson taught him *why* version control matters. This lesson teaches him *how* to use it.

James is working on a piece of SmartNotes code called `format_title` that capitalizes the first letter of each word in a note title. He typed it carefully, checked the output by eye, watched it produce the right result. Then he decides the code needs a different approach. He selects everything, deletes it, and starts rewriting. Halfway through the rewrite, he realizes the original version was better. He reaches for Ctrl+Z. Nothing. He closed the file between versions. The undo history is gone. The original code -- the one that worked -- no longer exists anywhere.

James stares at an empty file. He cannot remember the exact logic. He cannot recover what he had. He has no tests that document what the code was supposed to do, and no version history that recorded what it looked like before he deleted it. Two separate tools could have saved him: a test that specified the correct behavior, and Git that recorded the last working state. Without either, he has to start from memory.

Emma finds him rewriting code he already wrote. "How long have you been doing this?" James sighs. "Twenty minutes. And I am not sure this version is as good as the one I deleted." Emma sits down. "Let me show you the last two tools in the discipline stack. After today, this never happens again."

---

## The Problem Without Tests and Version Control

James's deleted code is a small loss. Twenty minutes, one piece of code. But the pattern scales dangerously. Someone who works without tests has no specification to check against when behavior changes. Someone who works without version control has no checkpoint to return to when an edit goes wrong. Together, these gaps create a compounding risk: code that nobody can prove is correct, and no way to recover when it breaks.

| Missing Tool | What Happens | The Real Cost |
|---|---|---|
| **No tests** | Code runs, but nobody knows if it does the right thing | A change that breaks existing behavior goes undetected until a user reports it |
| **No Git** | Every change overwrites the previous version permanently | One bad edit, one accidental deletion, one "let me try something" -- and the working version is gone |
| **Neither** | Code that cannot be verified and cannot be recovered | Every edit is a gamble with no safety net and no way to roll back |

These are not theoretical risks. They are the daily reality of any project that skips Axioms VII and VIII.

---

## pytest and Git Defined

> **pytest** is a testing tool that discovers test files, runs them, and reports which ones pass and which ones fail. It uses a plain Python keyword called `assert` -- no special setup required. A passing test means your code does what the test says it should.

> **Git** is a version control system that records every change you make to your project. Each `git commit` is a snapshot -- a checkpoint you can return to at any time. Git does not prevent mistakes. It makes them reversible.

### pytest Discovery Conventions

pytest finds tests automatically using naming conventions:

| Element | Convention | Example |
|---|---|---|
| Test files | Start with `test_` or end with `_test` | `test_main.py` |
| Test names | Start with `test_` inside the file | `def test_greet():` |
| Test directory | `tests/` (configured in pyproject.toml) | `tests/test_main.py` |

### pytest Output Characters

When pytest runs, each test produces a single character:

| Character | Meaning |
|---|---|
| `.` | Passed |
| `F` | Failed |
| `E` | Error (exception during setup or teardown) |
| `s` | Skipped |

A clean run shows dots. Any `F` means a test found a problem.

---

## From Axiom to Practice

Two axioms complete the discipline stack.

**Axiom VII -- Tests Are the Specification.** pytest does not check that code runs. The Python interpreter already does that. pytest checks that code does *what you specified it should do*. When James writes `assert format_title("hello world") == "Hello World"`, he is not writing a test. He is writing a specification: this piece of code, given this input, must produce this output. The `assert` keyword is the specification expressed as code.

**Axiom VIII -- Version Control is Memory.** Git tracks every change to every file. Every `git commit` creates a permanent checkpoint. If James had committed his working `format_title` code before rewriting it, he could have recovered it in seconds with `git log` and `git diff`. Without Git, memory is human and fallible. With Git, memory is digital and permanent.

Together, these axioms close the final gaps in the discipline stack. Ruff checks style. Pyright checks types. pytest checks behavior. Git preserves history. Four tools, four axioms, four automated protections that replace willpower with infrastructure.

---

## Practical Application

### Step 1: Write a Test File

Your SmartNotes project has a `main.py` file. You need a place for tests. Create a `tests` directory and a test file inside it.

Create the file `tests/test_main.py` with this content:

:::note You do not need to understand this code yet
This code uses Python features -- `def`, `import`, `assert`, type labels, and more -- that you will learn in later chapters. Right now, the goal is not to read the code. The goal is to see what pytest does with it. Just type the code exactly as shown, run the commands below, and focus on the tool's output.
:::

```python static
# tests/test_main.py
from main import main


def test_main_returns_greeting() -> None:
    """Verify that main() returns the expected greeting string."""
    result: str = main()
    assert result == "Hello from smartnotes!"
```

Before this test can work, the `main` piece of code needs to *return* a string instead of printing it. Update `main.py`:

```python static
# main.py
def main() -> str:
    return "Hello from smartnotes!"


if __name__ == "__main__":
    print(main())
```

Two things to notice about the test file. First, `assert` is a plain Python keyword -- pytest does not need any special setup. `assert result == "Hello from smartnotes!"` means: if this condition is false, the test fails. Second, the name starts with `test_` and the file name starts with `test_`. These naming conventions are how pytest discovers what to run. No configuration needed beyond what is already in your `pyproject.toml`.

### Step 2: Run pytest

```bash
uv run pytest
```

**Output (passing):**

```
tests/test_main.py .                                             [100%]
1 passed in 0.12s
```

That single dot is the most important character in this lesson. It means: one test ran, one test passed, your code does what the specification says it should.

### Step 3: Read Pass/Fail Output

To see what a failure looks like, temporarily change the expected value in the test:

```python static
def test_main_returns_greeting() -> None:
    result: str = main()
    assert result == "Wrong value on purpose"
```

Run pytest again:

```bash
uv run pytest
```

**Output (failing):**

```
tests/test_main.py F                                             [100%]
================================ FAILURES =================================
___________________________ test_main_returns_greeting ____________________________

    def test_main_returns_greeting() -> None:
        result: str = main()
>       assert result == "Wrong value on purpose"
E       AssertionError: assert 'Hello from smartnotes!' == 'Wrong value on purpose'

========================= 1 failed in 0.15s ==========================
```

The `F` replaces the dot. pytest shows you exactly which line failed, what the actual value was, and what the expected value was. When `assert` fails, pytest generates a clear message automatically telling you what went wrong.

Change the test back to the correct expected value before continuing.

**Quick Check**: In the passing output, pytest showed a single `.` character. In the failing output, it showed `F`. If you had three tests — two passing and one failing — what characters would pytest display?

### Step 4: Initialize Git

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

### Step 5: Stage and Commit

Git uses a two-step process: *stage* the files you want to record, then *commit* them as a snapshot.

```bash
git add .
git commit -m "Initial SmartNotes project with discipline stack"
```

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

Every file in the project is now recorded. If James deletes `main.py` tomorrow, he can recover it from this commit. If he rewrites `format_title` and regrets it, he can compare the current version to this snapshot and restore what he had. Git does not prevent mistakes. It makes them reversible.

Verify the commit exists:

```bash
git log --oneline
```

**Output:**

```
a1b2c3d Initial SmartNotes project with discipline stack
```

One commit. One checkpoint. The project's memory has begun.

### Step 6: Run the Complete Pipeline

This is the moment the entire chapter has been building toward. Five tools, five axioms, one command chain. Run ruff, pyright, and pytest in sequence -- each step must pass before the next one starts:

```bash
uv run ruff check . && uv run pyright && uv run pytest
```

**Output (all passing):**

```
All checks passed!
0 errors, 0 warnings, 0 informations
tests/test_main.py .                                             [100%]
1 passed in 0.12s
```

Three tools. Three green outputs. The `&&` operator ensures that if ruff finds a lint error, the pipeline stops -- pyright never runs, pytest never runs, and the problem is clear. If ruff passes but pyright finds a type error, the pipeline stops at pyright. Only when all three tools pass do you have a verified, clean project ready for a commit.

This is Axiom IX in its purest form: verification as a pipeline, not a checklist you remember to run. The command does not require willpower. It runs the same way every time.

---

## Anti-Patterns

James has seen all five tools in action. He also knows four new ways to undermine them. Each anti-pattern below seems like a shortcut. Each one has a specific cost.

The first anti-pattern is **"Testing later."** James writes five pieces of code, then plans to add tests "once the code stabilizes." The code never stabilizes. Each new piece changes the behavior of existing ones, and his memory of the original intent fades. By the time tests get written, they test the current behavior -- which may include bugs that have existed since week one.

The second is **"Not committing early."** James works for three hours without a single commit. The code is in a half-finished state. The laptop's battery dies, a forced restart clears unsaved changes, or he takes a wrong turn and cannot remember what the project looked like when it worked. Three hours of progress exist only in memory.

The third is **"Skipping the pipeline."** James runs pytest but not ruff, or runs ruff but not pyright. The tools catch different categories of problems. A codebase that passes tests but fails type checking has undiscovered bugs hiding in type mismatches.

The fourth is **"Manual testing only."** James checks that code works by running it and looking at the output. This verifies exactly one scenario, one time. It does not document what "correct" means, does not run automatically, and does not catch regressions when the code changes.

| Anti-Pattern | The Mistake | The Cost | The Fix |
|---|---|---|---|
| **"Testing later"** | Writing code first, planning tests for some unspecified future date | Specifications fade from memory; tests end up documenting bugs, not intended behavior | Write the first test before or alongside the first piece of code |
| **"Not committing early"** | Working for hours without a Git checkpoint | One mistake or crash destroys all progress with no recovery | Commit after every meaningful change -- small commits are better than large ones |
| **"Skipping the pipeline"** | Running only some tools instead of the full verification chain | Bugs hide in the gaps between tools | Always run the full pipeline: `uv run ruff check . && uv run pyright && uv run pytest` |
| **"Manual testing only"** | Checking output visually instead of writing automated checks | Verifies one scenario once; no regression protection, no documentation | Write an `assert` for every behavior you care about |

---

## Try With AI

Open your AI coding assistant. Try these three prompts to deepen your understanding of testing, version control, and the verification pipeline.

### Prompt 1: Write a Failing Test and Explain the Output

```
I am new to Python and learning about testing tools. I have this
piece of code:

def add(a: int, b: int) -> int:
    return a - b  # Bug: subtracts instead of adding

Write a pytest test for this code that will fail. Then show me
exactly what the pytest output will look like when it fails. Explain
each part of the failure output in simple terms: what the F character
means, what the error message says, and how to tell what went wrong.
```

**What you're learning:** You are building the skill of reading pytest failure output before you encounter it in your own code. The AI will generate a realistic failure message, and by studying it now -- when you are not under pressure -- you will recognize the pattern instantly when your own tests fail. Pay attention to the `>` line (the failing line) and the `E` line (the explanation of what went wrong).

### Prompt 2: Explain the Verification Pipeline Order

```
My Python project has three verification tools that run in this order:
1. ruff check . (linting)
2. pyright (type checking)
3. pytest (testing)

I connect them with && so each step only runs if the previous one passed:
uv run ruff check . && uv run pyright && uv run pytest

Why does the order matter? What would go wrong if I ran pytest first,
then pyright, then ruff? Give me a concrete example where running them
in the wrong order wastes time or misses a bug.
```

**What you're learning:** You are understanding why the pipeline is ordered from fast-and-cheap checks (linting) to slow-and-expensive checks (testing). The AI's explanation will show you that catching a formatting issue before running the full test suite saves time, and that the `&&` operator is doing the work of Axiom IX -- stopping the pipeline at the first failure so you fix the simplest problem first.

### Prompt 3: Generate a .gitignore for a Python Project

```
Generate a .gitignore file for a Python project that uses uv as its
package manager. For each line in the file, add a comment explaining
what it ignores and why that file or directory should not be tracked
in version control.

Include entries for: virtual environments, Python bytecode, IDE files,
OS-specific files, and pytest cache directories.
```

**What you're learning:** You are understanding the purpose of `.gitignore` -- not just what it does, but *why* specific files should never enter version control. The AI's annotated explanation will show you that `.venv/`, `__pycache__/`, and `.pytest_cache/` are generated artifacts that can be recreated from source, while `pyproject.toml` and `uv.lock` are source files that must be tracked. This distinction -- generated vs source -- is fundamental to version control.

---

## Key Takeaways

1. **pytest uses plain `assert` as specifications.** `assert func(3) == 4` means: this piece of code, given 3, must return 4. No special setup, no extra tools. The `assert` keyword is how you express what "correct" means.

2. **pytest discovers tests by naming convention.** Files named `test_*.py`, test names starting with `test_` -- pytest finds and runs them automatically. Naming is the only configuration required.

3. **Git makes every change reversible.** `git init` creates the repository. `git add .` stages your files. `git commit -m "message"` records a snapshot. Every commit is a checkpoint you can return to.

4. **The verification pipeline runs tools in order: lint, type check, test.** The `&&` operator stops at the first failure. Fix the simplest problem first (style), then the next (types), then the deepest (behavior). This is Axiom IX -- verification as infrastructure.

5. **The discipline stack is now complete.** Five tools -- uv, ruff, pyright, pytest, Git -- each enforcing a specific axiom. Together, they replace willpower with automated checks. Every chapter from here forward starts with this workbench.

---

## Looking Ahead

Your workbench is built. uv manages your project. pyproject.toml holds your configuration. ruff checks your style. pyright checks your types. pytest checks your behavior. Git records your history. Five tools, five axioms, one unified system protecting your code from the moment you start writing it.

In Chapter 14.2, you will put this workbench to use. James and Emma will start reading Python -- learning how to store values, label their types, and combine them into expressions. Every line of code you encounter will be checked by ruff, type-checked by pyright, and tested by pytest. The workbench is no longer something you are building. It is something you are using.
