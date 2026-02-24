---
sidebar_position: 2
title: "Types as Labels — str, int, float, bool"
description: "Learn to recognize the four primitive Python types and read type annotations as labels that tell you what a variable holds without running the code."
keywords: ["python types", "str", "int", "float", "bool", "type annotations", "type conversion", "truthiness", "falsy", "None", "type hints", "primitive types"]
chapter: 16
lesson: 2
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Python Primitive Types"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Information and Data Literacy"
    measurable_at_this_level: "Identify the four primitive types (str, int, float, bool) and describe what each holds"
  - name: "Type Annotation Reading"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Information and Data Literacy"
    measurable_at_this_level: "Read a variable annotation like name: str = 'Zia' and explain what each part means"

learning_objectives:
  - objective: "Identify the four Python primitive types and describe what each stores"
    proficiency_level: "A1"
    bloom_level: "Remember"
    assessment_method: "Type identification exercise"
  - objective: "Read a type annotation and explain what it means in plain English"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Annotation interpretation exercise"
  - objective: "Predict the result of type conversion functions (int, str, float, bool)"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Read and Predict exercise"

cognitive_load:
  new_concepts: 5
  assessment: "5 concepts (four primitive types, annotation syntax, None, type conversions, truthiness) within A2 limit of 7"

differentiation:
  extension_for_advanced: "Explore str | None annotations and predict how Pyright treats None-safety. Try bool() on unusual values like empty lists, zero-element tuples, and the string 'None'."
  remedial_for_struggling: "Focus on the four primitives and one annotation form (name: str = value). Defer None, conversions, and truthiness to a second reading."
---

# Types as Labels — str, int, float, bool

In Chapter 15, James installed the discipline stack and created SmartNotes with `uv init`. Now he opens the SmartNotes `main.py` and sees something new. The function definition reads `def main() -> str:`. James points at the arrow. "What does `-> str` mean?"

Emma does not rush to answer. She picks up a glass jar from the shelf, the kind with a screw-on lid. It has a label on the front: **SUGAR**. She holds it up. "Before you open this jar, what is inside?" James shrugs. "Sugar. The label says so." Emma nods. "That is exactly what `-> str` does. It is a label. It tells you this function returns text. You know what is inside before you run the code."

James looks at the screen again. `-> str` no longer looks cryptic. It is a label on a jar.

---

## The Four Primitive Types

Python has four primitive types. Each one stores a different kind of value.

| Type | What It Stores | Example Value | Annotation |
|------|---------------|---------------|------------|
| `str` | Text | `"Zia"` | `name: str = "Zia"` |
| `int` | Whole numbers | `25` | `age: int = 25` |
| `float` | Decimal numbers | `9.99` | `price: float = 9.99` |
| `bool` | True or False | `True` | `active: bool = True` |

Here is what those annotations look like together in code:

```python
name: str = "Zia"
age: int = 25
price: float = 9.99
active: bool = True
```

**Output:**

```
(No output — these are declarations, not print statements.)
```

Each line follows the same pattern: **name**, **colon**, **type**, **equals sign**, **value**. The colon and type are the label. The value after the equals sign is what the jar holds.

---

## Type Annotations as Labels

A type annotation is a label you attach to a variable. It tells anyone reading the code — human or tool — what kind of value belongs there.

There are three forms you will see:

**Form 1: Annotation with value** (most common)

```python
greeting: str = "Hello, SmartNotes!"
```

**Output:**

```
Read as: "greeting is labeled str, and holds the text Hello, SmartNotes!"
```

**Form 2: Annotation without value** (declares intent, assigns later)

```python
result: int
result = 42
```

**Output:**

```
Read as: "result will hold an int. It gets assigned 42 on the next line."
```

**Form 3: Function return annotation**

```python
def main() -> str:
    return "Hello from SmartNotes!"
```

**Output:**

```
Read as: "main takes no arguments and returns a str."
```

Every annotation answers the same question: **what type is inside this jar?**

---

## None — The Absence of Value

Sometimes a jar is empty. Python represents "nothing" with `None`.

```python
middle_name: str | None = None
```

**Output:**

```
Read as: "middle_name holds either a str or None. Right now it holds None."
```

The `str | None` annotation means the variable can hold text or nothing. This pattern appears everywhere in real code because many values are optional. A user might not have a middle name. A search might find no results.

You check for `None` with `is`:

```python
middle_name: str | None = None

if middle_name is None:
    print("No middle name provided")
else:
    print(middle_name)
```

**Output:**

```
No middle name provided
```

`None` is also **falsy** — it acts like `False` when used in a condition. You will see why that matters in the truthiness section below.

---

## Type Conversions

Python provides four functions that convert values between types: `int()`, `str()`, `float()`, and `bool()`.

```python
int("42")       # str to int
float("3.14")   # str to float
str(100)        # int to str
bool(1)         # int to bool
```

**Output:**

```
42
3.14
"100"
True
```

These work for clean conversions. But some conversions fail or surprise you.

| Conversion | Result | Why |
|-----------|--------|-----|
| `int("42")` | `42` | Clean: digits only |
| `int("3.14")` | **ValueError** | `int()` cannot parse a decimal string |
| `int(3.14)` | `3` | Truncates toward zero (drops `.14`) |
| `float("3.14")` | `3.14` | Clean: valid decimal string |
| `str(True)` | `"True"` | Converts bool to its text name |
| `bool("0")` | **`True`** | Non-empty string — even "0" is truthy |
| `bool("")` | `False` | Empty string is falsy |
| `bool(0)` | `False` | Zero is falsy |
| `bool(1)` | `True` | Non-zero int is truthy |

The two traps to memorize:

1. **`int("3.14")` raises an error.** Use `int(float("3.14"))` if you need to convert a decimal string to an integer.
2. **`bool("0")` is `True`.** The string `"0"` is not empty, so it is truthy. Only the empty string `""` is falsy.

---

## Truthiness and Falsiness

Every Python value can act as `True` or `False` when used in a condition. A value that acts as `False` is called **falsy**. Everything else is **truthy**.

The complete falsy list:

| Falsy Value | Type | Why It Is Falsy |
|------------|------|-----------------|
| `False` | `bool` | It is literally False |
| `0` | `int` | Zero |
| `0.0` | `float` | Zero |
| `""` | `str` | Empty string |
| `None` | `NoneType` | Absence of value |
| `[]` | `list` | Empty list |
| `{}` | `dict` | Empty dict |

Everything else is truthy. This includes values that look false but are not:

```python
bool("False")   # True — non-empty string
bool("0")       # True — non-empty string
bool([0])       # True — list with one element (not empty)
bool(-1)        # True — non-zero int
```

**Output:**

```
True
True
True
True
```

The rule is simple: **empty or zero means falsy; anything else means truthy.**

---

## Before vs After: Typed vs Untyped

Here is the same function written without types, then with types.

**Without types:**

```python
def process(data):
    total = 0
    for item in data:
        total += item
    return total
```

What is `data`? A list of numbers? A list of strings? A tuple? You cannot tell from the code. You would have to read every line of the body, find where `process` is called, and trace the argument back to its source.

**With types:**

```python
def process(data: list[int]) -> int:
    total: int = 0
    for item in data:
        total += item
    return total
```

**Output:**

```
Read as: "process takes a list of ints and returns an int."
```

The typed version answers three questions without reading the body:

1. What goes in? A `list[int]`.
2. What comes out? An `int`.
3. What is the function's purpose? Summing a list of integers.

Types are documentation that the machine also reads. Pyright uses these annotations to catch bugs before you run the code. You will see exactly how in Lesson 5.

---

## Exercises

### Read and Predict 1: Type Identification

Look at each variable. What type does the annotation declare? What value does it hold?

```python
city: str = "Karachi"
population: int = 16_000_000
temperature: float = 38.5
is_capital: bool = False
```

Predict first. Then check: `str` holding `"Karachi"`, `int` holding `16000000`, `float` holding `38.5`, `bool` holding `False`. The underscore in `16_000_000` is a visual separator — Python ignores it.

### Read and Predict 2: Truthiness

For each value, predict whether `bool()` returns `True` or `False`:

```python
bool(42)
bool(0)
bool("hello")
bool("")
bool(None)
bool([1, 2])
bool([])
bool("False")
```

Predict first. Answers: `True`, `False`, `True`, `False`, `False`, `True`, `False`, `True`. The last one is the trap — `"False"` is a non-empty string.

### Read and Predict 3: Type Conversions

Predict the result of each conversion. If it raises an error, say so.

```python
int("100")
int("3.14")
float("7")
str(False)
bool(" ")
int(True)
```

Predict first. Answers: `100`, **ValueError**, `7.0`, `"False"`, `True` (space is not empty), `1` (`True` converts to `1`, `False` to `0`).

### Spot the Bug

This function says it returns an `int`, but something is wrong. Find the bug.

```python
def count_words(text: str) -> int:
    words: list[str] = text.split()
    return str(len(words))
```

The annotation promises `-> int`, but `str(len(words))` returns a `str`. The fix: remove the `str()` call and return `len(words)` directly. Pyright would flag this as a return type mismatch.

---

## Try With AI

### Prompt 1: Generate Typed Variables

```
Generate 5 Python variables with different types.
For each one, use a type annotation and assign a value.
Then explain each annotation in plain English using
the format: "[name] is labeled [type] and holds [value]."
```

**What you're learning:** How to ask AI to produce typed examples and verify you can read every annotation. You already know the four types. Now you are checking whether AI's output matches your understanding. If AI generates an annotation you cannot read, that is your next learning target.

### Prompt 2: Truthiness Quiz

```
Show me 10 Python values and ask me to predict whether
bool() returns True or False for each. Include at least
two values that are surprisingly truthy and two that are
surprisingly falsy. After I predict, show the answers.
```

**What you're learning:** How to use AI as a quiz generator for truthiness rules. The values you get wrong reveal gaps in your mental model. Truthiness trips up experienced developers too — practicing with varied examples builds reliable intuition.

### Prompt 3: None in the Real World

```
Explain the difference between str | None and str with
a real-world analogy. Then show me a Python function that
returns str | None and explain when it returns None.
```

**What you're learning:** How to ask AI for conceptual explanations using analogies. `str | None` is a pattern you will see in every serious Python codebase. Understanding it now — before you encounter it in SmartNotes — means you will not be confused when it appears in Lesson 4 and beyond.

---

## Key Takeaways

1. **Python has four primitive types.** `str` stores text, `int` stores whole numbers, `float` stores decimals, `bool` stores `True` or `False`. Every variable in this book carries a type annotation.

2. **Type annotations are labels.** `name: str = "Zia"` reads as "name is labeled str and holds Zia." Labels tell you what is inside a variable without running the code.

3. **None means absence.** `str | None` means the variable holds text or nothing. Check for it with `is None`.

4. **Type conversions have traps.** `int("3.14")` raises an error. `bool("0")` is `True`. Memorize the falsy list: `False`, `0`, `0.0`, `""`, `None`, `[]`, `{}`.

5. **Types make code readable.** A function annotated `def process(data: list[int]) -> int:` tells you what goes in and what comes out — no body reading required.

---

## Looking Ahead

You can now read types and annotations. But real code does more than declare variables — it combines them. In Lesson 3, you will read expressions like `price * quantity + tax` and predict exactly what Python computes, in what order, and what type the result has. You will build your first trace table — tracking variable state line by line — which is the single most reliable technique for predicting output.
