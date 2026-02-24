---
sidebar_position: 5
title: "Pyright -- Your Type Safety Net"
description: "Run pyright to catch type errors before your code runs, compare typed vs untyped Python code, and understand why strict mode requires complete type labels"
keywords: ["pyright", "static type checker", "type annotations", "strict mode", "type error", "type safety", "Python types", "uv run pyright", "str | None", "type checking"]
chapter: 14.1
lesson: 5
duration_minutes: 22

# HIDDEN SKILLS METADATA
skills:
  - name: "Type Error Interpretation"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can run uv run pyright, read the error output, identify which line and parameter caused the error, and explain what type mismatch pyright detected"

  - name: "Type Annotation Reading"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can read a typed function signature like def greet(name: str) -> str and explain what each annotation means, including union types like str | None"

learning_objectives:
  - objective: "Run pyright and interpret type error messages to identify the source of a type mismatch"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student runs uv run pyright on a file with deliberate type errors, reads the output, and identifies which line, parameter, and type mismatch caused each error"

  - objective: "Compare typed and untyped function signatures and explain what type annotations add"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Given before/after code examples, student explains which version pyright can check and why the typed version catches bugs that the untyped version misses"

  - objective: "Explain why strict mode catches more errors than basic mode and why this course uses strict"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Student describes at least two categories of errors that strict mode catches but standard mode ignores, and explains why requiring complete annotations leads to safer code"

cognitive_load:
  new_concepts: 5
  assessment: "5 concepts (static type checker, type annotation, str | None union type, strict mode, type error message reading) within A2 limit of 7"

differentiation:
  extension_for_advanced: "Explore pyright's diagnostic rule list at github.com/microsoft/pyright and identify which of the 29 strict-mode-only rules apply to common Python patterns like decorators, generics, and match statements"
  remedial_for_struggling: "Focus on the single before/after example (greet function). Run pyright on just that one file until the error message format becomes familiar before examining strict vs standard differences"
---

# Pyright -- Your Type Safety Net

In Lesson 4, James ran ruff on his first block of Python code and discovered the difference between code that runs and code that is correct. Ruff caught style problems and potential bugs. But there is an entire category of errors that ruff cannot see -- errors where the code uses the wrong kind of data. A piece of code expects a name, and someone passes it a number. Another piece returns text, and someone tries to do math with the result. Python does not complain about any of this until the program is already running. AI assistants can introduce these same errors -- generating code that passes a number where a string is expected -- and neither you nor the AI will notice by reading alone.

Emma gives James two files. Both contain the same piece of code -- called `greet` -- that takes a name and returns a greeting.

:::note You do not need to understand the Python syntax below yet
These code examples use features you will learn in later chapters. Right now, focus on the difference between the two versions — one has type labels, one does not.
:::

The first file has no type information:

```python
def greet(name):
    return f"Hello, {name}"

result = greet(42)
print(result)
```

**Output:**

```
Hello, 42
```

Python runs it without complaint. The code received a number where a name should go, produced nonsense output, and nobody was notified. James shrugs. "It ran fine."

Emma opens the second file. Same code, but with type annotations — labels that tell Python what kind of data each piece expects:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

result = greet(42)
print(result)
```

She runs a single command: `uv run pyright`. The terminal shows:

**Output:**

```
/home/james/smartnotes/main.py
  /home/james/smartnotes/main.py:4:16 - error: Argument of type "int" is not
    assignable to parameter "name" of type "str"
    "int" is not assignable to "str" (reportArgumentType)
1 error, 0 warnings, 0 informations
```

The bug was caught without executing a single line of code. James reads the message: line 4, the value `42` is a number (`int`), but `name` expects text (`str`). The rule name in parentheses -- `reportArgumentType` -- tells him exactly what kind of error it is.

"That," Emma says, "is why every piece of code in this course has types."

---

## The Problem Without Type Checking

Python does not check what kind of data your code uses ahead of time. When you write code that accepts a `name`, Python does not know or care whether `name` will hold text, a number, or something else entirely. It figures it out only when the code is already running.

This flexibility is convenient for small projects. It becomes dangerous in real ones:

| Scenario | What Happens Without Type Checking |
|----------|----------------------------------|
| Code receives wrong kind of data | Code runs, produces wrong output silently |
| Code returns unexpected kind of data | The next piece of code crashes later, far from the actual bug |
| A value is missing (`None`) | Error appears only when the code runs, not when you write it |
| Someone changes what code returns | Everything that depends on it breaks, but you discover breakage one piece at a time |

The common thread: bugs hide. They do not surface at the point where the mistake was made. They surface later, in a different file, during a different operation. James experienced this pattern in Chapter 14 -- a failure in one part of the system cascaded because nothing checked assumptions early.

A **static type checker** solves this by analyzing code *without running it*. It reads type annotations — those labels like `: str` and `: int` — traces how data moves through your code, and reports every place where the declared types do not match the actual usage. Errors appear in your terminal seconds after you save the file -- not hours later in a crash.

---

## Pyright Defined

> **Pyright** is a static type checker for Python, built by Microsoft. It reads the type labels in your code (like `: str` and `: int`) and verifies that every piece of code receives and returns the correct kind of data -- all without running your program.

| Aspect | Detail |
|--------|--------|
| **Creator** | Microsoft |
| **Version** | 1.1.408 |
| **Speed** | Analyzes most projects in under a second |
| **Modes** | off, basic, standard (default), strict |
| **Configuration** | `[tool.pyright]` section in `pyproject.toml` |
| **Run command** | `uv run pyright` |

Pyright has four type checking modes, each progressively stricter:

| Mode | What It Checks | When to Use |
|------|---------------|-------------|
| `"off"` | Nothing (syntax errors only) | Never in this course |
| `"basic"` | Minimal rules | Legacy projects being gradually typed |
| `"standard"` | Moderate coverage (CLI default) | General-purpose development |
| `"strict"` | All rules enabled; requires complete type annotations | This course, new projects, AI-generated code |

You switch modes by changing one word in `pyproject.toml` — the command to run pyright is always the same (`uv run pyright`):

```toml
# off — pyright does almost nothing
typeCheckingMode = "off"

# basic — catches obvious mismatches only
typeCheckingMode = "basic"

# standard — the default if you don't set anything
typeCheckingMode = "standard"

# strict — checks everything, requires type labels on all code
typeCheckingMode = "strict"
```

Your SmartNotes `pyproject.toml` already has pyright configured in strict mode from Lesson 3:

```toml
[tool.pyright]
typeCheckingMode = "strict"
pythonVersion = "3.12"
```

Strict mode enables 29 additional diagnostic rules that are completely disabled in standard mode, plus escalates 7 more rules from warnings to errors. The most important ones fall into three categories:

| Category | What Strict Mode Catches | Example |
|----------|------------------------|---------|
| **Missing annotations** | Code without type labels on its inputs or outputs | `def greet(name):` -- what kind of data is `name`? Unknown. |
| **Unknown types** | A stored value whose type pyright cannot determine | `result = some_code()` where the return type is not declared |
| **Unused code** | Lines that load libraries or store values that are never used | `import os` when `os` is never used in the file |

---

## Axiom V in Action

In Axiom V from Chapter 14, you learned that types are guardrails -- not bureaucracy. They prevent your code from driving off a cliff by making the rules explicit. Pyright is the guardrail inspector. It walks along every type label in your code before it runs and tells you which guardrails are missing.

This matters more in the AI era than it ever did before. When AI generates code, it generates fast. Dozens of lines in seconds. Without types, you have to read every line and mentally trace every piece of data to verify correctness. With types, pyright does that verification for you. The type labels serve double duty: they document what kind of data your code expects (for humans and AI to read), and they enable automated checking (for pyright to verify). One label, two benefits.

Consider the difference:

:::note You do not need to understand the Python syntax below yet
These code examples use features you will learn in later chapters. Right now, focus on the difference between the two versions — one has type labels, one does not.
:::

```python
# Without types: what kind of data does this code accept? What does it return?
# You have to read the entire code to find out.
def process(data):
    return data.strip().lower()
```

```python
# With types: the labels tell you immediately.
# Pyright verifies that every use passes text (str) and handles text back.
def process(data: str) -> str:
    return data.strip().lower()
```

The typed version tells you everything upfront: `process` expects text and gives back text. You do not need to read the code inside to figure that out — the labels `: str` and `-> str` say it clearly. If someone passes a number or something else instead of text, pyright will catch it before the code runs.

---

## Practical Application

### Step 1: Create a File with Type Errors

Open the SmartNotes `main.py` and replace its contents with the following code. This version has deliberate type problems that Python will run without complaint but pyright will catch:

:::note You do not need to understand this code yet
This code uses Python features — type labels and more — that you will learn in later chapters. Right now, the goal is to see what pyright does with it. Just type the code exactly as shown, run the commands below, and focus on pyright's output.
:::

```python
def greet(name: str) -> str:
    return f"Hello, {name}"


def add_numbers(a: int, b: int) -> int:
    return a + b


def format_title(title: str, prefix: str | None = None) -> str:
    if prefix:
        return f"{prefix}: {title}"
    return title


# Bug 1: passing a number where text is expected
greeting = greet(42)

# Bug 2: passing text where a number is expected
total = add_numbers("five", 10)

# Bug 3: the result is text, but the label says number
length: int = format_title("My Note")
```

The code at the top is correct -- it has type labels (`: str`, `: int`) that tell pyright what kind of data each piece expects. The bugs are at the bottom, where the wrong kinds of data are passed or stored.

Note the `str | None` label on `prefix`. This is a **union type** -- it means the code accepts either text (`str`) or nothing (`None`). The `| None` part makes it explicitly optional. Without it, passing `None` would be a type error.

### Step 2: Run Pyright

Run pyright on the project:

```bash
uv run pyright
```

**Output:**

```
/home/james/smartnotes/main.py
  /home/james/smartnotes/main.py:16:21 - error: Argument of type "int" is not
    assignable to parameter "name" of type "str"
    "int" is not assignable to "str" (reportArgumentType)
  /home/james/smartnotes/main.py:19:26 - error: Argument of type "str" is not
    assignable to parameter "a" of type "int"
    "str" is not assignable to "int" (reportArgumentType)
  /home/james/smartnotes/main.py:22:15 - error: Type "str" is not assignable
    to declared type "int" (reportAssignmentType)
3 errors, 0 warnings, 0 informations
```

### Step 3: Read the Error Output

Every pyright error follows the same format:

```
[file path]:[line]:[column] - error: [description] ([rule name])
```

Break down the three errors:

| Error | Line | What Pyright Found | Rule |
|-------|------|-------------------|------|
| 1 | 16 | `42` is a number (`int`), but `name` expects text (`str`) | `reportArgumentType` |
| 2 | 19 | `"five"` is text (`str`), but `a` expects a number (`int`) | `reportArgumentType` |
| 3 | 22 | `format_title` returns text (`str`), but `length` is labeled as number (`int`) | `reportAssignmentType` |

Each error points to the exact line, the exact mismatch, and the exact rule that caught it. No guessing. No searching through error messages. The errors appear before the code runs.

**Quick Check**: Two of the three errors use the rule `reportArgumentType` and one uses `reportAssignmentType`. Based on the rule names alone, what is the difference — is `reportArgumentType` about data being passed in, or data being returned?

**Spot the Bug**: An AI assistant generates the following typed code for James:

```python static
def get_discount(price: float, percent: int) -> float:
    return price * (percent / 100)

final_price: str = get_discount(49.99, 20)
```

Without running pyright, read the type labels and find the type mismatch. Which line has the bug? What type does `get_discount` return, and what type does `final_price` declare? What pyright rule would catch this?

### Step 4: Fix the Type Errors

Replace the buggy calls with corrected versions:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"


def add_numbers(a: int, b: int) -> int:
    return a + b


def format_title(title: str, prefix: str | None = None) -> str:
    if prefix:
        return f"{prefix}: {title}"
    return title


# Fixed: passing text where text is expected
greeting = greet("James")

# Fixed: passing numbers where numbers are expected
total = add_numbers(5, 10)

# Fixed: result is text, so the label should say text
title: str = format_title("My Note")
```

Run pyright again:

```bash
uv run pyright
```

**Output:**

```
0 errors, 0 warnings, 0 informations
```

Clean. Every type label matches. Every piece of code receives the right kind of data. Every stored value has the right type. Pyright verified all of this in under a second, without executing the code.

:::info Checkpoint: Verify your progress
Run this command in the SmartNotes directory:
```bash
uv run pyright
```
You should see `0 errors, 0 warnings, 0 informations`. If you still see errors, compare your `main.py` against the corrected version above — every function and every call must have matching types.
:::

### Strict Mode vs Standard Mode

Your SmartNotes project uses `typeCheckingMode = "strict"`. What would happen with standard mode instead?

In standard mode, pyright would still catch the three explicit type errors above (passing a number where text is expected, etc.) -- those are basic mismatches. But standard mode would NOT catch code that is missing type labels entirely.

Consider this code:

```python
# Standard mode: no error (type labels not required)
# Strict mode: error -- reportUnknownParameterType
def process(data):
    return data.strip()
```

In standard mode, pyright ignores this code because it has no type labels to check. In strict mode, pyright reports an error: `data` has an unknown type. Strict mode requires you to declare what kind of data every piece of code expects. This is why the course uses strict -- it ensures complete coverage, leaving nothing unchecked.

---

## Anti-Patterns

James now understands what pyright catches and why the course runs in strict mode. Here are the patterns Emma warned him to avoid:

| Anti-Pattern | What Happens | The Fix |
|-------------|-------------|---------|
| **Ignoring type errors** | James runs pyright, sees 12 errors, and skips them because "the code works." The errors accumulate. Eventually a type mismatch causes a crash. | Fix every error before committing. Pyright errors are not suggestions -- they are guardrails reporting missing protection. |
| **Using `Any` everywhere** | James labels everything as `Any` to silence pyright. Every piece of code accepts everything, which means pyright checks nothing. | Use the most specific type possible: `str`, `int`, `list[str]`. Reserve `Any` for genuinely dynamic cases. |
| **Disabling strict mode** | James switches to basic or standard mode because strict "has too many errors." Those errors represent real coverage gaps. | Start with strict mode on a new project (like SmartNotes). Fix errors as you write. Strict mode is harder to add later than to start with. |
| **Types as afterthought** | James writes all his code without types, then adds labels later as a chore. The labels become inaccurate because they describe what he intended, not what the code does. | Add types as you write. The type label is part of the design, not a comment added afterward. |

---

## Try With AI

### Prompt 1: Explain a Pyright Error Message

```
I ran uv run pyright on my Python file and got this error:

/home/james/smartnotes/main.py:19:26 - error: Argument of type "str" is not
  assignable to parameter "a" of type "int"
  "str" is not assignable to "int" (reportArgumentType)

I am new to Python and do not fully understand types yet.
Explain this error to me step by step in simple terms:
1. What file and line is the error on?
2. What did I write that caused the error?
3. What kind of data did pyright expect? (Explain what "str" and "int" mean)
4. What kind of data did I actually pass?
5. What is "reportArgumentType" -- what category of error is this?
6. How would I fix this error?
```

**What you're learning:** How to read pyright error messages step by step. Every pyright error follows the same format -- file, line, column, description, rule name. By asking AI to break down a real error in simple terms, you are building the pattern recognition to read these messages on your own. This is the most practical type-checking skill: not writing types, but understanding what pyright tells you when types are wrong.

### Prompt 2: Add Type Labels to Unlabeled Code

```
Here is a piece of Python code without type labels:

def calculate_total(items, tax_rate, discount):
    subtotal = sum(item["price"] * item["quantity"] for item in items)
    tax = subtotal * tax_rate
    discounted = subtotal - discount
    return discounted + tax

It is called like this:
items = [{"price": 9.99, "quantity": 2}, {"price": 4.50, "quantity": 1}]
result = calculate_total(items, 0.08, 5.00)

I am new to Python and learning about type labels for the first time.
Add type labels to this code so it would pass pyright in strict mode.
For each label you add, explain in simple terms:
1. What kind of data it describes
2. Why you chose that type
3. What would go wrong if someone passed the wrong kind of data
```

**What you're learning:** How type labels describe what kind of data flows through your code. By seeing AI add labels and explain each one in plain language, you start to read what labels like `: str`, `: int`, and `: float` mean. You are not writing these labels yourself yet -- you are learning to read and understand them, which is the foundation for every typed Python chapter ahead.

### Prompt 3: Try Standard Mode, Then Ask AI Why Strict Is Better

**Before prompting**, try this experiment. Open `pyproject.toml` and temporarily change `typeCheckingMode` from `"strict"` to `"standard"`. Run `uv run pyright` and note the output. Then change it back to `"strict"`, run `uv run pyright` again, and compare. Now ask AI:

```
I tried switching pyright from strict to standard mode on my project.
In standard mode I got [X] errors. In strict mode I got [Y] errors.

My teammate wants to use standard because strict shows more errors.
Explain:

1. What specific categories of errors does strict mode catch that
   standard mode ignores?
2. Give me 3 concrete code examples where strict catches a real bug
   but standard lets it pass silently.
3. Why is strict mode easier to start with on a new project than to
   add later to an existing one?
4. Is there ever a good reason to use standard instead of strict?
```

**What you're learning:** You saw the difference yourself before asking AI to explain it. The gap between standard and strict is not abstract -- you measured it in error counts on your own project. The AI's explanation will now connect to something you observed, not something you read about. This is the iterative pattern for the entire course: try it yourself, observe the result, ask AI to deepen your understanding, then apply what you learned. The understanding comes from the cycle, not from any single step.

---

## Key Takeaways

1. **A static type checker analyzes code without running it.** Pyright reads type labels, traces how data moves through your code, and reports every type mismatch before your program executes.

2. **Type labels serve double duty.** They document what kind of data your code expects (for humans and AI to read) and they enable automated checking (for pyright to verify). One label, two benefits.

3. **Every pyright error follows the same format:** file path, line number, column, description, and rule name in parentheses. Learning to read this format is the key skill.

4. **Strict mode requires complete type labels.** It enables 29 additional diagnostic rules beyond standard mode, catching missing labels, unknown types, and unused code. New projects should start in strict mode.

5. **`str | None` is a union type.** It means a value can hold either text (`str`) or nothing (`None`). This pattern appears throughout typed Python to make optional values explicit.

---

## Looking Ahead

Your SmartNotes project now has two verification tools running clean: ruff checks code quality and pyright checks type safety. But there is a third question neither tool can answer: does the code do what it is supposed to do? Code can be perfectly formatted, fully typed, and still produce the wrong result.

In Lesson 6, James writes his first test with pytest -- a tool that checks whether your code does what you specified it should do.
