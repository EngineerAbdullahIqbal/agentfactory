---
sidebar_position: 4
title: "Reading Function Signatures"
description: "Read function signatures as contracts -- understand parameters, return types, default values, and the critical distinction between print and return"
keywords: ["function signature", "parameters", "return type", "type annotation", "def", "default value", "print vs return", "function contract", "None", "-> str", "-> int", "-> None"]
chapter: 16
lesson: 4
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Function Signature Reading"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can read a typed function signature and identify the function name, each parameter with its type and any default value, and the return type -- then describe the contract in plain English without reading the function body"

  - name: "Print vs Return Distinction"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can look at a function that uses print() and a function that uses return, predict what each call produces, and explain why one stores a value and the other displays text"

learning_objectives:
  - objective: "Read function parameters and return types from a typed signature"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Given a function signature like def search_notes(query: str, max_results: int = 10) -> list[str]:, student identifies each parameter name, its type, any default value, and the return type -- then states the contract in one sentence"

  - objective: "Distinguish print from return and predict what a function call produces"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Given two functions -- one using print(), one using return -- student correctly predicts what gets displayed to screen, what value the variable holds after calling each, and explains why one is None"

  - objective: "Predict the result of calling a function with specific arguments"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Given a function signature with default values and a function call with fewer arguments than parameters, student correctly maps each argument to its parameter and identifies which parameters use their default values"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (function signature anatomy, default parameter values, return type annotations, print vs return distinction) within A2 limit of 7"

differentiation:
  extension_for_advanced: "Find a function in Python's standard library documentation (such as round() or sorted()) and read its full signature. Identify every parameter, its type, and its default value. Explain the contract in one sentence."
  remedial_for_struggling: "Focus on the simplest signature first: def greet(name: str) -> str:. Practice reading it aloud as a sentence: 'greet accepts a string called name and returns a string.' Repeat with add(a: int, b: int) -> int: before moving to default values."
---

# Reading Function Signatures

In Lesson 3, you traced expressions and predicted output by following Python's evaluation rules. You tracked variables through trace tables and learned to catch traps like `round(2.5)` returning `2` and `-3 ** 2` evaluating to `-9`. Now you step up from expressions to functions -- but you are not going to read function bodies yet. You are going to read function signatures, the single line that tells you everything a function promises before you look at a single line of its implementation.

James finds a SmartNotes function in the codebase: `def search_notes(query: str, max_results: int = 10) -> list[str]:`. He has not read the body. Emma asks: "What does it take? What does it give back?" James studies the signature. "It takes a search query as text... and gives back a list of strings... with a maximum of 10 results by default." Emma nods. "You just read the contract. The signature told you everything you need to know to call this function correctly -- without reading a single line of implementation."

That is the power of a typed signature. It is a contract between the function and everyone who calls it: here is what I need, here is what I promise to give back.

---

## A Signature Is a Contract

Every function in Python starts with a `def` line. When the function is typed, that single line is a complete contract. Here is the simplest possible example:

```python
def greet(name: str) -> str:
```

Read it as a sentence: "The function `greet` accepts one parameter called `name` that must be a `str`, and it promises to return a `str`."

Every piece of this line has a job:

| Part | Example | What It Means |
|------|---------|---------------|
| `def` | `def` | Keyword that starts a function definition |
| Function name | `greet` | The name you use to call this function |
| Parameter name | `name` | What the function calls the value you pass in |
| Parameter type | `: str` | The type of value this parameter expects |
| Return type | `-> str` | The type of value the function promises to give back |
| Colon | `:` | Marks the end of the signature, body follows below |

This is the anatomy of every typed function signature in Python. Once you can read this, you can read any function's contract without looking at its body.

Here are three more signatures. Practice reading each one as a sentence before looking at the plain English translation:

```python
def add(a: int, b: int) -> int:
```

**Contract:** "The function `add` accepts two integers called `a` and `b`, and returns an integer."

```python
def is_valid_email(email: str) -> bool:
```

**Contract:** "The function `is_valid_email` accepts a string called `email`, and returns a boolean -- `True` or `False`."

```python
def format_title(title: str) -> str:
```

**Contract:** "The function `format_title` accepts a string called `title`, and returns a string."

Notice the pattern. Every signature answers the same two questions: what does this function take, and what does it give back?

---

## Reading Parameters

Parameters are the inputs a function requires. A function can have one parameter, several, or none at all.

### Single Parameter

```python
def capitalize_name(name: str) -> str:
```

One input: a string called `name`. The parameter name tells you what kind of value to pass. Good parameter names are documentation.

### Multiple Parameters

```python
def add(a: int, b: int) -> int:
```

Two inputs, both integers. When you call `add(3, 5)`, Python matches arguments to parameters left to right: `a` gets `3`, `b` gets `5`.

### Default Values

This is where signatures become especially useful:

```python
def add(a: int, b: int = 0) -> int:
```

The `= 0` after `b: int` means `b` has a **default value** of `0`. If you call `add(3, 5)`, then `a` is `3` and `b` is `5`. If you call `add(3)`, then `a` is `3` and `b` uses its default: `0`.

Default values are visible in the signature. You do not need to read the body to know they exist. Here is the SmartNotes function James read:

```python
def search_notes(query: str, max_results: int = 10) -> list[str]:
```

Two parameters: `query` is required (no default), and `max_results` defaults to `10`. A caller can write `search_notes("meeting")` and get up to 10 results, or `search_notes("meeting", 5)` to limit it to 5.

**Read and Predict:** Given this signature:

```python
def repeat_text(text: str, times: int = 3) -> str:
```

What are the parameter values when you call `repeat_text("ha", 5)`? What about `repeat_text("ha")`?

**Answer:** In `repeat_text("ha", 5)`, `text` is `"ha"` and `times` is `5`. In `repeat_text("ha")`, `text` is `"ha"` and `times` uses its default: `3`.

---

## Reading Return Types

The return type appears after the `->` arrow. It tells you what kind of value the function gives back. Here are the return types you will see most often:

| Return Type | Meaning | Example Signature |
|-------------|---------|-------------------|
| `-> str` | Returns text | `def greet(name: str) -> str:` |
| `-> int` | Returns a whole number | `def count_words(text: str) -> int:` |
| `-> float` | Returns a decimal number | `def average(nums: list[int]) -> float:` |
| `-> bool` | Returns `True` or `False` | `def is_empty(text: str) -> bool:` |
| `-> None` | Returns nothing useful | `def print_greeting(name: str) -> None:` |
| `-> str \| None` | Might return text, might return nothing | `def find_note(id: int) -> str \| None:` |

Two of these deserve special attention.

**`-> None`** means the function does something (a side effect like printing to the screen or saving to a file) but does not give a value back. When you call a `-> None` function and try to store its result, you get `None` -- Python's way of saying "nothing here."

**`-> str | None`** means the function might return a string, or it might return `None`. This is common for search functions: `find_note(42)` might find a note and return its title, or it might not find anything and return `None`. The `|` reads as "or."

---

## Print vs Return: The Critical Distinction

This is the single biggest source of confusion for beginners. Two functions can look similar but behave completely differently depending on whether they use `print()` or `return`.

```python
def greet_print(name: str) -> None:
    print(f"Hello, {name}!")

def greet_return(name: str) -> str:
    return f"Hello, {name}!"
```

Watch what happens when you call each one:

```python
result1 = greet_print("Zia")
result2 = greet_return("Zia")
```

**Output (what appears on screen):**

```
Hello, Zia!
```

Only one line appears. `greet_print` sent text to the screen. `greet_return` did not print anything -- it returned a value silently.

Now check what the variables hold:

```python
print(result1)
print(result2)
```

**Output:**

```
None
Hello, Zia!
```

`result1` is `None` because `greet_print` used `print()` -- it displayed text on screen but did not give a value back. `result2` is `"Hello, Zia!"` because `greet_return` used `return` -- it gave the value back to the caller without displaying anything.

Here is the rule:

| Mechanism | What It Does | Where the Value Goes | Return Type |
|-----------|-------------|---------------------|-------------|
| `print()` | Displays text on screen | Screen (gone forever) | Function returns `None` |
| `return` | Sends value back to caller | Stored in variable | Function returns the value |

**Why this matters:** If you call a `print()` function and try to use its result in another calculation, you get `None`. If you call a `return` function and expect to see output on screen, nothing appears. Knowing which one a function uses -- and the return type annotation tells you -- prevents this entire class of bugs.

The signature is your first clue. A function with `-> None` almost always uses `print()` or writes to a file. A function with `-> str` or `-> int` uses `return`.

---

## Calling Functions: Matching Arguments to Parameters

When you call a function, Python matches your arguments to the function's parameters left to right:

```python
def create_note(title: str, content: str, priority: int = 1) -> str:
```

| Call | `title` | `content` | `priority` |
|------|---------|-----------|------------|
| `create_note("Meeting", "Discuss timeline", 3)` | `"Meeting"` | `"Discuss timeline"` | `3` |
| `create_note("Meeting", "Discuss timeline")` | `"Meeting"` | `"Discuss timeline"` | `1` (default) |

The third call below would be an error:

```python
create_note("Meeting")  # Error: missing required argument 'content'
```

`title` gets `"Meeting"`, but `content` has no default value and no argument was provided. Python raises a `TypeError`.

**Type must match too.** The signature says `title: str` and `priority: int`. If you call `create_note(42, "notes", "high")`, you are passing an `int` where a `str` is expected for `title`, and a `str` where an `int` is expected for `priority`. Python will not stop you at runtime -- but Pyright will flag both mismatches before you run the code. The signature is the contract. Breaking it is a type error.

---

## Exercises

### Exercise 1: Read and Predict

Given this function and call, what value does `result` hold?

```python
def double(n: int) -> int:
    return n * 2

result = double(7)
```

Think before reading the answer.

**Answer:** `result` is `14`. The function takes an integer, multiplies it by 2, and returns the result. `double(7)` returns `7 * 2 = 14`.

### Exercise 2: Read and Predict (Default Values)

Given this function and two calls, what does each variable hold?

```python
def make_tag(text: str, wrapper: str = "*") -> str:
    return f"{wrapper}{text}{wrapper}"

tag1 = make_tag("hello", "**")
tag2 = make_tag("hello")
```

**Answer:** `tag1` is `"**hello**"` -- both arguments provided, `wrapper` is `"**"`. `tag2` is `"*hello*"` -- only `text` provided, `wrapper` defaults to `"*"`.

### Exercise 3: Read and Predict (Print vs Return)

What appears on screen, and what does `x` hold?

```python
def show_total(a: int, b: int) -> None:
    print(f"Total: {a + b}")

x = show_total(3, 4)
```

**Answer:** The screen shows `Total: 7` because the function calls `print()`. But `x` is `None` because the function returns `None` -- it prints to the screen and gives nothing back.

### Exercise 4: Spot the Bug

This function signature says it returns an `int`. Read the body. What is wrong?

```python
def count_words(text: str) -> int:
    words = text.split()
    return f"{len(words)} words"
```

**Answer:** The signature promises `-> int`, but the body returns `f"{len(words)} words"` -- a string. This is a return type mismatch. The function should either return `len(words)` (an `int`, matching the signature) or change the signature to `-> str`. Pyright would flag this: "Type 'str' is not assignable to declared type 'int'."

---

## Try With AI

### Prompt 1: Generate Function Signatures

```
Generate 5 typed function signatures for a note-taking app called SmartNotes.
Each function should have:
- A descriptive name
- At least one parameter with a type annotation
- At least one function with a default parameter value
- A return type annotation

For each signature, explain the contract in one plain English sentence:
what does it accept, and what does it promise to return?
Do NOT write the function bodies -- signatures only.
```

**What you're learning:** How to read function contracts in isolation. When you can describe what a function does from its signature alone, you can navigate any codebase by reading the signatures first and the bodies only when needed. This is the skill that separates someone who reads code from someone who searches for comments.

### Prompt 2: Print vs Return Comparison

```
Create two Python functions that both work with a person's name:
1. A function that PRINTS a greeting (returns None)
2. A function that RETURNS a greeting (returns str)

Then show what happens when you:
- Call each function and store the result in a variable
- Print both variables

Explain step by step: what appears on screen during each call,
and what value each variable holds afterward. Why is one None?
```

**What you're learning:** The distinction between displaying output and returning a value. This is the most common beginner confusion in Python. Understanding it from the signature (`-> None` vs `-> str`) means you can predict behavior before running any code -- which is exactly what a code reviewer does when reading AI-generated functions.

### Prompt 3: Default Parameters in Action

```
Write a function called format_currency with three parameters:
- amount (float, required)
- currency (str, default "USD")
- decimals (int, default 2)

Show the function signature with type annotations.
Then show 4 different ways to call it:
1. All three arguments provided
2. Only amount provided (both defaults used)
3. Amount and currency provided (decimals defaults)
4. Amount and decimals provided using a keyword argument

For each call, show the output and explain which parameters
used their default values.
```

**What you're learning:** How default values create flexible function contracts. A single function can be called in multiple ways depending on how many arguments the caller provides. Reading the signature tells you every possible calling pattern -- without reading the body. This is essential for understanding library functions where you read documentation (signatures) far more than source code.

---

## Key Takeaways

1. **A function signature is a contract.** `def greet(name: str) -> str:` says: "Give me a string, I will give you back a string." You can read this contract without opening the function body.

2. **Default values are visible in the signature.** `max_results: int = 10` means the caller can omit this argument and get 10 automatically. No need to read the body to know defaults exist.

3. **Return types tell you what to expect.** `-> str` means a string comes back. `-> None` means nothing useful comes back -- the function does something (like print) but does not return a value you can store.

4. **Print and return are fundamentally different.** `print()` sends text to the screen and is gone. `return` sends a value back to the caller for storage and reuse. Mixing them up is the most common beginner bug.

5. **Arguments match parameters left to right.** When you call `add(3, 5)`, the first argument maps to the first parameter, the second to the second. Missing a required argument is a `TypeError`. Passing the wrong type is caught by Pyright.

---

## Looking Ahead

You can now read what a function promises -- its signature contract. But there is something strange about these contracts: Python does not enforce them. You can declare `age: int = 25` and then write `age = "twenty-five"` on the next line. Python will not complain. The type annotation is there, but Python ignores it at runtime.

In Lesson 5, you will discover what Python actually does with type annotations (nothing), and why an external tool called Pyright is the one that enforces the contracts you have been reading. The signatures are real contracts -- but the enforcer is not Python itself.
