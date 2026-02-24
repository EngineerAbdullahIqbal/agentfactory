---
sidebar_position: 5
title: "What Python Does (and Doesn't Do) with Types"
description: "Discover that Python ignores type annotations at runtime, learn why annotations still matter for humans and tools, and read the five categories of errors that Pyright catches before your code runs"
keywords: ["python types", "runtime type checking", "static type checking", "pyright errors", "type annotations", "gradual typing", "reportArgumentType", "reportAssignmentType", "reportReturnType", "None safety"]
chapter: 16
lesson: 5
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Runtime vs Static Type Checking"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can explain that Python does not enforce type annotations at runtime, that annotations are metadata stored in __annotations__, and that external tools like Pyright perform static analysis to catch type mismatches before execution"

  - name: "Pyright Error Reading"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can read a Pyright error message, identify the file path, line number, error description, and rule name, and explain what type mismatch triggered the error"

learning_objectives:
  - objective: "Explain why Python does not enforce type annotations at runtime and where annotations are stored"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Given code like age: int = 25; age = 'hello', student predicts that Python runs it without error and explains that annotations are metadata, not enforcement rules"

  - objective: "Identify the five categories of type errors that Pyright catches before code runs"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student classifies given code snippets into the correct Pyright error category (argument mismatch, return mismatch, assignment mismatch, missing return, None safety)"

  - objective: "Read Pyright error output and identify the file, line, description, and rule name"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Given raw Pyright output, student identifies which line caused the error, what types conflicted, and names the rule in parentheses"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (runtime ignores annotations, __annotations__ metadata, static analysis catches errors before execution, five Pyright error categories) within A2 limit of 7"

differentiation:
  extension_for_advanced: "Explore Pyright's full rule list at github.com/microsoft/pyright and categorize which rules apply to argument types, return types, assignment types, and None safety"
  remedial_for_struggling: "Focus on a single example: age: int = 25 then age = 'hello'. Run it in Python (no error), then run uv run pyright (error). Repeat until the distinction between runtime and static checking is clear"
---

# What Python Does (and Doesn't Do) with Types

In Lesson 4, you learned to read function signatures as contracts -- parameter types, return types, and default values. You can now look at `def search_notes(query: str, max_results: int = 10) -> list[str]:` and know exactly what goes in and what comes out without reading the body. But there is a question those signatures raise: does Python actually enforce those contracts? If a function says it takes a `str`, what happens when someone passes an `int`?

James decides to test this. He writes a variable with a type annotation, then immediately reassigns it to the wrong type:

```python
age: int = 25
age = "twenty-five"
print(age)
```

**Output:**

```
twenty-five
```

Python runs it without complaint. No error. No warning. The annotation said `int`, and James stored a string. Python did not care. "See?" James says. "Types don't do anything."

Emma opens the terminal and runs `uv run pyright`. A red error appears:

```
main.py:2:7 - error: Type "str" is not assignable to declared type "int"
  "str" is not assignable to "int" (reportAssignmentType)
```

"Python doesn't enforce types," Emma says. "Pyright does. That annotation is not a suggestion -- it is a guardrail. But only if you have the guardrail turned on."

---

## The Surprising Truth: Python Ignores Types

Python is a dynamically typed language. When you write `age: int = 25`, Python stores two things: the value `25` in the variable `age`, and the annotation `int` in a special dictionary called `__annotations__`. But Python never looks at that dictionary when running your code. It never checks whether the value matches the annotation.

Watch what happens with a function:

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

result = greet(42)
print(result)
```

**Output:**

```
Hello, 42
```

The function declared `name: str`, but James passed `42` -- an integer. Python did not reject the call. The f-string formatted the integer into the greeting, and the program continued as if nothing was wrong. The annotation `str` was completely invisible to Python at runtime.

This is true for every type annotation in Python:

| What You Write | What Python Does at Runtime |
|----------------|----------------------------|
| `age: int = 25` | Stores `25` in `age`. Stores `int` in `__annotations__`. Never checks. |
| `def greet(name: str)` | Defines the function. Stores `str` in `__annotations__`. Never checks callers. |
| `-> str` | Records the return type. Never verifies the actual return value. |
| `count: int = "zero"` | Stores `"zero"` in `count`. No error. |

Annotations are metadata. Python stores them but never enforces them. They exist for something else entirely.

---

## Why Bother with Types Then?

If Python ignores annotations, why write them? Three reasons.

**Types are documentation for humans.** When you see `def add_numbers(a: int, b: int) -> int:`, you know immediately what the function accepts and returns. Without annotations, you would have to read the entire function body to figure that out. In a codebase with hundreds of functions, types save hours of reading time.

**Types enable tools to catch bugs.** Pyright reads your annotations and traces every function call, every assignment, and every return value. It reports mismatches before you run the program. A bug that would crash at 2 AM in production becomes a red underline at 2 PM while you are still editing.

**Types make AI-generated code reviewable.** When AI generates a function with `def process(data: list[str]) -> dict[str, int]:`, you can verify the contract -- what goes in and what comes out -- without reading the implementation. The signature tells you the shape of the data. You check the shape first, then verify the logic.

---

## Gradual Typing

Python does not require you to type everything at once. Code without annotations runs the same as code with annotations. You can add types to one function today and another tomorrow. This is called **gradual typing** -- you adopt types at your own pace.

In this course, every example is typed from day one. Not because Python requires it, but because you are learning to read typed Python. When you encounter AI-generated code in later chapters, every function will have annotations, and you need to know how to read them. Starting typed means you never have to unlearn untyped habits.

---

## What Pyright Catches

Pyright is a static type checker -- it analyzes your code without running it. Where Python sees annotations as optional metadata, Pyright treats them as rules. It reads every annotation, traces how data flows through your program, and reports every place where declared types do not match actual usage.

Pyright catches five categories of errors. Each one represents a bug that Python would silently ignore.

### Category 1: Argument Type Mismatch

You call a function with the wrong type of argument.

```python
def greet(name: str) -> str:
    return f"Hello, {name}"

greet(42)
```

**Pyright output:**

```
main.py:4:7 - error: Argument of type "int" is not assignable
  to parameter "name" of type "str"
  "int" is not assignable to "str" (reportArgumentType)
```

The function expects `str`. You passed `int`. Python runs it. Pyright catches it.

### Category 2: Return Type Mismatch

A function declares one return type but actually returns a different type.

```python
def get_count() -> int:
    return "forty-two"
```

**Pyright output:**

```
main.py:2:12 - error: Type "str" is not assignable to return
  type "int" (reportReturnType)
```

The signature promises `int`. The body returns `str`. Python does not notice. Pyright does.

### Category 3: Assignment Type Mismatch

You assign a value to a variable that was declared with a different type.

```python
count: int = "zero"
```

**Pyright output:**

```
main.py:1:14 - error: Type "str" is not assignable to declared
  type "int" (reportAssignmentType)
```

The variable says `int`. The value is `str`. Python stores it anyway. Pyright flags it.

### Category 4: Missing Return

Not all code paths in a function return a value.

```python
def classify(score: int) -> str:
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    # What if score < 80? No return!
```

**Pyright output:**

```
main.py:1:29 - error: Function with declared type of "str" must
  return value on all code paths
  Missing return statement (reportReturnType)
```

If `score` is 70, the function reaches the end without returning anything. Python returns `None` silently. Pyright tells you a code path is missing.

### Category 5: None Safety

You call a method on a value that might be `None`.

```python
def get_username(user_id: int) -> str | None:
    if user_id == 1:
        return "james"
    return None

name = get_username(99)
print(name.upper())
```

**Pyright output:**

```
main.py:7:7 - error: "upper" is not a known attribute of
  "None" (reportOptionalMemberAccess)
```

The function returns `str | None`. That means `name` could be `None`. Calling `.upper()` on `None` would crash at runtime with `AttributeError`. Pyright catches this before you run the code. The fix: check for `None` first.

```python
name = get_username(99)
if name is not None:
    print(name.upper())
```

---

## Before vs After: Bug at 2 AM vs Bug at Edit Time

James writes a function that calculates a total. Another function calls it, passing a string where an integer should go:

```python
def calculate_total(price: int, quantity: int) -> int:
    return price * quantity

total = calculate_total("fifty", 3)
```

**Without Pyright:** Python runs this. The string `"fifty"` gets multiplied by 3 using string repetition: `"fiftyfiftyfifty"`. No crash, no error -- just wrong data flowing silently through the system. The bug surfaces at 2 AM when a report shows impossible totals and someone has to trace it back through dozens of function calls.

**With Pyright:** The error appears the moment you save the file:

```
main.py:4:24 - error: Argument of type "str" is not assignable
  to parameter "price" of type "int" (reportArgumentType)
```

Caught in under a second. No runtime. No production crash. No 2 AM investigation.

This is the connection to Axiom V from Chapter 14: **Types Are Guardrails**. The annotations define the road. Pyright is the inspector that checks whether every vehicle stays in its lane -- before the road opens to traffic.

---

## Reading Pyright Output

Every Pyright error follows the same four-part format:

```
[file path]:[line]:[column] - error: [description] ([rule name])
```

| Part | What It Tells You |
|------|-------------------|
| File path | Which file contains the error |
| Line:Column | Exact location of the problem |
| Description | What types conflicted and why |
| Rule name | Which Pyright rule flagged it (in parentheses) |

When you run `uv run pyright` and see output like this:

```
/home/james/smartnotes/main.py
  /home/james/smartnotes/main.py:4:7 - error: Argument of type "int" is not
    assignable to parameter "name" of type "str"
    "int" is not assignable to "str" (reportArgumentType)
  /home/james/smartnotes/main.py:7:14 - error: Type "str" is not assignable
    to declared type "int" (reportAssignmentType)
2 errors, 0 warnings, 0 informations
```

Read it from top to bottom: the file path appears first, then each error with its line number, description, and rule. The summary at the bottom tells you the total count. Two errors, zero warnings. Fix both, run again, and aim for the clean line: `0 errors, 0 warnings, 0 informations`.

---

## Exercises

### Spot the Bug 1

Pyright would flag an error in this code. Which line, and what category?

```python
def format_name(first: str, last: str) -> str:
    return f"{first} {last}"

full_name: int = format_name("James", "Chen")
```

*Hint: look at what `format_name` returns and what `full_name` expects.*

### Spot the Bug 2

This function has a type error Pyright would catch. Find it.

```python
def multiply(a: int, b: int) -> int:
    return a * b

result = multiply(10, "three")
```

*Hint: check the type of each argument against the parameter annotations.*

### Spot the Bug 3

Pyright reports a None safety error in this code. Where is it?

```python
def find_note(title: str) -> str | None:
    if title == "welcome":
        return "Welcome to SmartNotes!"
    return None

note = find_note("goodbye")
print(note.lower())
```

*Hint: what does `find_note` return when the title is not "welcome"?*

### Read and Predict

Will Python raise an error at runtime for this code? Will Pyright?

```python
score: int = 95
score = "A+"
print(score)
```

*Think about it before reading the answer.* Python will run this without error and print `A+`. The annotation `int` is metadata -- Python ignores it. But Pyright will report: `Type "str" is not assignable to declared type "int" (reportAssignmentType)` on line 2.

---

## Try With AI

### Prompt 1: Generate a Type Error and Pyright Report

```
Write a Python function with a deliberate type error in the
function call (not in the definition). Show me the exact Pyright
error message it would produce, formatted the same way Pyright
outputs it: file path, line number, column, error description,
and rule name in parentheses. Then explain each part of the
error message.
```

**What you're learning:** How to anticipate what Pyright will report. By asking AI to generate both the buggy code and the error message, you practice reading Pyright output in a controlled setting. You verify that the error message matches the bug -- building the pattern recognition to read these messages independently when they appear in your own projects.

### Prompt 2: Explain Runtime vs Static Type Checking

```
Explain the difference between runtime type checking and static
type checking using Python as the example. Show me one piece of
code that Python runs without error but Pyright flags as wrong.
Then show me one piece of code where Python DOES raise a runtime
error related to types (like calling .upper() on an integer).
Explain why Python catches one but not the other.
```

**What you're learning:** The boundary between what Python enforces and what it ignores. Python catches operations that fail (you cannot call `.upper()` on an integer), but it does not catch type mismatches in annotations. Pyright fills that gap. Understanding this boundary helps you predict which bugs will crash at runtime and which will pass silently -- the silent ones are more dangerous.

### Prompt 3: None Safety Bug and Fix

```
Show me a Python function that returns str | None. Then show
code that calls this function and uses the result without
checking for None -- a None safety bug. Show the exact Pyright
error message. Then show me three different ways to fix the
None safety issue:
1. An if-check (if result is not None)
2. A default value (result or "fallback")
3. An early return pattern
Explain when each fix is appropriate.
```

**What you're learning:** None safety is the most common source of runtime crashes in Python (`AttributeError: 'NoneType' has no attribute ...`). Pyright catches this at edit time by tracking which values could be `None`. Learning the three fix patterns now means you can read and understand None-handling code when you encounter it in AI-generated SmartNotes modules in Lesson 6.

---

## Key Takeaways

1. **Python does not enforce type annotations at runtime.** You can write `age: int = 25` and then assign `age = "hello"` -- Python will not complain. Annotations are metadata stored in `__annotations__`, not enforcement rules.

2. **Types exist for humans and tools, not for Python.** Annotations document what data a function expects (for humans reading the code), enable static analysis (for Pyright to catch bugs), and make AI-generated code reviewable (verify the contract without reading the body).

3. **Pyright catches five categories of errors.** Argument type mismatch, return type mismatch, assignment type mismatch, missing return on code paths, and None safety. Each represents a bug that Python would silently allow.

4. **Every Pyright error follows the same format.** File path, line number, column, description, and rule name in parentheses. Learn this format once and you can read every Pyright error.

5. **None safety is the most dangerous category.** When a function returns `str | None`, every caller must handle the `None` case. Pyright catches callers that skip this check -- preventing the `AttributeError` that would crash at runtime.

---

## Looking Ahead

You now understand what Python does with types (stores them, ignores them) and what Pyright does with types (reads them, enforces them). You can read Pyright error messages and classify them into five categories. In Lesson 6, you put all of your reading skills together. Emma opens the SmartNotes `main.py` -- eighty lines of typed Python generated by AI -- and your job is to read every function, predict what it does, and explain it in plain English. Your first code review.
