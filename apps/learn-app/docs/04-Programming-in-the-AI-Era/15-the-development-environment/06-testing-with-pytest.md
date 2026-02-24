---
sidebar_position: 6
title: "Testing With pytest"
description: "Write your first pytest test for the SmartNotes project, run it, and learn to read pass/fail output to verify that code does what it is supposed to do."
keywords: ["pytest", "testing", "assert", "test output", "pass fail", "test discovery", "naming conventions", "SmartNotes", "verification"]
chapter: 15
lesson: 6
duration_minutes: 18

# HIDDEN SKILLS METADATA
skills:
  - name: "Test Output Reading"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can run uv run pytest on a test file, identify pass/fail status from the output characters (. for pass, F for fail), and explain what the summary line means"

  - name: "Test Writing Basics"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can create a test file following pytest naming conventions (test_ prefix for file and function), write an assert statement comparing expected vs actual values, and place the file in the tests/ directory"

learning_objectives:
  - objective: "Run pytest and interpret pass/fail output"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student runs uv run pytest on a test file, reads the output characters (. for pass, F for fail), and explains the summary line (N passed in X.XXs)"

  - objective: "Write a basic pytest test using assert to specify expected behavior"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Student creates a test file with correct naming conventions (test_ prefix), writes an assert statement comparing a function's return value to an expected result, and explains what the assert keyword does"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (writing a test with assert, pytest discovery conventions, reading pass/fail output) within comfortable A2 range"

differentiation:
  extension_for_advanced: "Add a second test file with a deliberately failing test. Run pytest and practice reading the failure output. Then fix the test and observe the output change from F to dot."
  remedial_for_struggling: "Focus on one test only. Write it, run it, read the single-dot output. Only after that passes, experiment with the deliberate failure in Step 3."
---

# Testing With pytest

In Lesson 5, you ran `uv run pyright` on SmartNotes and watched it verify every type label in your code -- catching bugs before a single line executed. Pyright is the second verification tool in your workbench, after ruff. Two tools are checking your code automatically. But two tools are not enough.

Code that passes linting and type checking can still do the wrong thing. A function can be perfectly formatted, fully typed, and still return the wrong answer. Ruff cannot see that `add(3, 2)` returns `1` instead of `5`. Pyright cannot see it either -- `int - int` returns `int`, and the types are correct. The logic is wrong, but no tool has caught it.

James is working on a piece of SmartNotes code called `format_title` that capitalizes the first letter of each word in a note title. He typed it carefully, checked the output by eye, watched it produce the right result. "Looks good," he says, and moves on. But "looks good" is not a specification. What if the function breaks on edge cases he did not think to try? What if someone changes it next week and the old behavior disappears without anyone noticing? James is trusting his eyes and his memory -- the same two things that ruff and pyright were designed to replace. This becomes even more dangerous when working with AI-generated code: an AI can produce a function that looks correct and runs without errors, but silently handles edge cases wrong. Only a test can prove the code does what you specified.

Emma watches him test by reading terminal output. "You have seen what ruff catches and what pyright catches. Now let me show you what neither of them can see."

---

## The Problem Without Tests

James's visual check is not wrong -- the code does produce the right output. But the check does not scale. It verifies one scenario, one time, and leaves no record. When the code changes, the only way to verify it again is to remember what to check and re-run it by hand.

| Missing Tool | What Happens | The Real Cost |
|---|---|---|
| **No tests** | Code runs, but nobody knows if it does the right thing | A change that breaks existing behavior goes undetected until a user reports it |
| **Manual testing only** | Developer checks output by eye, one scenario at a time | Verifies one case once; no regression protection, no documentation of what "correct" means |

These are not theoretical risks. They are the daily reality of any project that skips Axiom VII.

---

## pytest Defined

> **pytest** is a testing tool that discovers test files, runs them, and reports which ones pass and which ones fail. It uses a plain Python keyword called `assert` -- no special setup required. A passing test means your code does what the test says it should.

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

## Axiom VII in Action

In Axiom VII from Chapter 14, you learned that tests are the specification. pytest does not check that code runs. The Python interpreter already does that. pytest checks that code does *what you specified it should do*.

When James writes `assert format_title("hello world") == "Hello World"`, he is not writing a test. He is writing a specification: this piece of code, given this input, must produce this output. The `assert` keyword is the specification expressed as code. If the assertion is true, the test passes silently. If it is false, pytest reports exactly what went wrong -- what the code returned and what the test expected.

This matters because specifications written as code do not drift. A comment that says "this function capitalizes words" can become outdated the moment someone changes the function. An `assert` that says `format_title("hello world") == "Hello World"` either passes or fails. There is no ambiguity. There is no room for the specification to become stale without someone noticing.

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

:::tip If you see an import error
The line `from main import main` works because SmartNotes uses a flat project layout -- `main.py` sits in the project root, and pytest knows how to find it. If you ever see `ModuleNotFoundError: No module named 'main'`, create an empty file called `__init__.py` inside the `tests/` directory. This tells Python to treat `tests/` as a package and helps it locate files in the project root. For SmartNotes, this should not be necessary, but it is a common fix if your setup differs slightly.
:::

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
tests/test_main.py F                                                [100%]
=================================== FAILURES ===================================
_________________________ test_main_returns_greeting ___________________________

    def test_main_returns_greeting() -> None:
        """Verify that main() returns the expected greeting string."""
        result: str = main()
>       assert result == "Wrong value on purpose"
E       AssertionError: assert 'Hello from smartnotes!' == 'Wrong value on purpose'
E
E         - Wrong value on purpose
E         + Hello from smartnotes!

tests/test_main.py:8: AssertionError
=========================== short test summary info ============================
FAILED tests/test_main.py::test_main_returns_greeting - AssertionError: ...
============================== 1 failed in 0.15s ===============================
```

The `F` replaces the dot. pytest shows you exactly which line failed, what the actual value was, and what the expected value was. The lines starting with `E` are the explanation: the `-` line shows what you wrote in the test (the expected value), and the `+` line shows what the code actually returned. When `assert` fails, pytest generates this comparison automatically -- you do not need to write error messages yourself.

Change the test back to the correct expected value before continuing.

**Quick Check**: In the passing output, pytest showed a single `.` character. In the failing output, it showed `F`. If you had three tests -- two passing and one failing -- what characters would pytest display?

:::info Checkpoint: Verify your progress
Run this command in the SmartNotes directory:
```bash
uv run pytest
```
You should see `tests/test_main.py . [100%]` and `1 passed`. If you see `F` instead of `.`, make sure you changed the test back to the correct expected value: `assert result == "Hello from smartnotes!"`
:::

---

## Anti-Patterns

James has seen pytest in action. He also knows two ways to undermine it. Each anti-pattern below seems like a shortcut. Each one has a specific cost.

The first anti-pattern is **"Testing later."** James writes five pieces of code, then plans to add tests "once the code stabilizes." The code never stabilizes. Each new piece changes the behavior of existing ones, and his memory of the original intent fades. By the time tests get written, they test the current behavior -- which may include bugs that have existed since week one.

The second is **"Manual testing only."** James checks that code works by running it and looking at the output. This verifies exactly one scenario, one time. It does not document what "correct" means, does not run automatically, and does not catch regressions when the code changes.

| Anti-Pattern | The Mistake | The Cost | The Fix |
|---|---|---|---|
| **"Testing later"** | Writing code first, planning tests for some unspecified future date | Specifications fade from memory; tests end up documenting bugs, not intended behavior | Write the first test before or alongside the first piece of code |
| **"Manual testing only"** | Checking output visually instead of writing automated checks | Verifies one scenario once; no regression protection, no documentation | Write an `assert` for every behavior you care about |

---

## Try With AI

Open your AI coding assistant. The first two prompts deepen your understanding of testing and the pipeline. The third prompt shows you why `assert` statements are fundamentally different from `print` statements.

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

### Prompt 3: Assert vs Print -- Why Tests Beat Manual Checking

```
I have a Python function that I am checking two ways:

Way 1 (manual): I run the function, print the result, and look at it
Way 2 (pytest): I write assert statements comparing the result to expected values

Here is the function:
def format_title(title: str) -> str:
    return " ".join(word.capitalize() for word in title.split())

Show me:
1. What manual testing looks like (print statements) and what
   information it gives me
2. What a pytest test looks like (assert statements) and what
   additional information it gives me
3. If someone changes format_title next week to handle hyphens
   differently, which approach catches the regression automatically?
4. Give me a concrete example where manual testing says "looks right"
   but a pytest assert would catch the bug
```

**What you're learning:** This prompt makes the case for why `assert` statements matter more than `print` statements. When you check by eye, you verify one scenario, one time, with no record. When you write an assert, you create a permanent specification that runs automatically every time. The AI's examples will show you exactly how a regression -- a change that breaks existing behavior -- slips past manual testing but gets caught by pytest.

---

## Key Takeaways

1. **pytest uses plain `assert` as specifications.** `assert func(3) == 4` means: this code, given 3, must return 4. No special setup, no extra tools. The `assert` keyword is how you express what "correct" means.

2. **pytest discovers tests by naming convention.** Files named `test_*.py`, test names starting with `test_` -- pytest finds and runs them automatically. Naming is the only configuration required.

3. **Reading test output is a core skill.** A dot means passed, `F` means failed. When a test fails, pytest shows the exact line, the expected value, and the actual value. Learning to read this output is as important as learning to write tests.

---

## Looking Ahead

Your code has a specification now. pytest checks that `main()` returns exactly what the test says it should. If someone changes the function, the test catches it. If someone adds a new function, a new test can verify that too. Ruff checks style. Pyright checks types. pytest checks behavior.

But all three of these verifications exist on one machine. One accidental deletion, one bad edit, one crash -- and the verified code is gone. There is no checkpoint. There is no way to go back.

In Lesson 7, James discovers the last tool in the discipline stack: Git. It makes every change reversible.
