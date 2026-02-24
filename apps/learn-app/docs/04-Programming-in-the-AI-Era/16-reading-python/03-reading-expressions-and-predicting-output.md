---
sidebar_position: 3
title: "Reading Expressions and Predicting Output"
description: "Learn to predict what Python expressions evaluate to — arithmetic, string operations, boolean logic — and build trace tables to track variable state line by line"
keywords: ["python expressions", "operator precedence", "trace tables", "arithmetic operators", "boolean logic", "string operations", "f-strings", "floor division", "modulo", "short-circuit evaluation"]
chapter: 16
lesson: 3
duration_minutes: 30

# HIDDEN SKILLS METADATA
skills:
  - name: "Expression Evaluation"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can predict the result of Python expressions involving arithmetic, string, and boolean operators without running the code, and verify predictions by running the expressions"

  - name: "Trace Table Construction"
    proficiency_level: "A1"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can build a trace table for a short code block (4-6 lines), filling in variable values after each line executes, and use the table to predict the final state"

learning_objectives:
  - objective: "Predict the result of Python expressions involving arithmetic, string, and boolean operators"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student predicts output of 4 expressions of escalating difficulty, then runs each to verify — at least 3 of 4 correct"

  - objective: "Apply operator precedence rules to evaluate compound expressions without parentheses"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student correctly predicts 2 + 3 * 4 as 14 (not 20) and explains the precedence rule that governs the evaluation order"

  - objective: "Construct a trace table for a 4-line code block and predict the final variable values"
    proficiency_level: "A1"
    bloom_level: "Apply"
    assessment_method: "Student fills in a trace table row by row, tracking variable state after each line, and arrives at the correct final values"

cognitive_load:
  new_concepts: 5
  assessment: "5 concepts (arithmetic operators with division subtlety, operator precedence, string operations, boolean short-circuit logic, trace tables) within A2 limit of 7"

differentiation:
  extension_for_advanced: "Explore Python's math module for precision-sensitive calculations, and investigate how the decimal module handles 0.1 + 0.2 correctly"
  remedial_for_struggling: "Focus on arithmetic operators only. Practice predicting single-operator expressions before combining operators. Build trace tables for 2-line blocks before attempting 4-line blocks"
---

# Reading Expressions and Predicting Output

In Lesson 2, you learned to read Python's four primitive types -- `str`, `int`, `float`, `bool` -- and interpret type annotations as labels that tell you what a variable holds. You can look at `price: float = 9.99` and know that `price` is a decimal number. Now you move from reading individual values to reading what Python does with them.

Emma writes five lines on a whiteboard:

```python
x: int = 5
y: int = x + 3
x = x * 2
z: float = x / y
result: int = x + y
```

"Before I run this," she says, "predict the value of every variable at the end." James traces through them. `x` starts at 5, `y` is 8, `x` becomes 10... he pauses at `z`. "Is that 1.25 or 1?" He guesses 1. Emma runs the code. `z` is `1.25` -- a float. "Division always returns a float in Python," she says. James got two values wrong. His brain skipped steps and took shortcuts.

"That is why we trace," Emma says. "Your brain takes shortcuts. The trace table does not."

## Arithmetic Operators

Python has seven arithmetic operators. You already know most of them from math, but three behave in ways that surprise beginners.

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `3 + 4` | `7` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `5 * 4` | `20` |
| `/` | Division | `6 / 3` | `2.0` |
| `//` | Floor division | `7 // 2` | `3` |
| `%` | Modulo (remainder) | `7 % 3` | `1` |
| `**` | Exponentiation | `2 ** 3` | `8` |

The three that surprise you are `/`, `//`, and `**`.

**Division always returns a float.** Even when the result is a whole number, `/` gives you a float:

```python
result: float = 6 / 3
```

**Output:**

```
2.0
```

**Floor division rounds toward negative infinity.** The `//` operator divides and drops the decimal part -- but it floors toward negative infinity, not toward zero:

```python
positive: int = 7 // 2
negative: int = -7 // 2
```

**Output:**

```
3
-4
```

For positive numbers, `7 // 2` gives `3` (drops the `.5`). For negative numbers, `-7 // 2` gives `-4`, not `-3`. The floor goes down to the next lower integer, and `-4` is lower than `-3.5`.

**Exponentiation is right-to-left.** When you chain `**`, Python evaluates from right to left:

```python
result: int = 2 ** 3 ** 2
```

**Output:**

```
512
```

Python reads this as `2 ** (3 ** 2)` = `2 ** 9` = `512`. Not `(2 ** 3) ** 2` = `8 ** 2` = `64`. The exponent on the right evaluates first.

One more trap with `**` and negation:

```python
result: int = -3 ** 2
```

**Output:**

```
-9
```

This is `-(3 ** 2)`, not `(-3) ** 2`. Exponentiation binds tighter than the negation sign. If you want negative three squared, write `(-3) ** 2` to get `9`.

## Operator Precedence

When an expression has multiple operators, Python follows a precedence table to decide which operations happen first. You do not need to memorize every level. You need to know four rules:

| Priority | Operators | What to Remember |
|----------|----------|------------------|
| 1 (highest) | `()` | Parentheses override everything |
| 2 | `**` | Exponentiation, right-to-left |
| 3 | `+x`, `-x` (unary) | Positive/negative sign |
| 4 | `*`, `/`, `//`, `%` | Multiplication family, left-to-right |
| 5 | `+`, `-` | Addition family, left-to-right |
| 6 | `<`, `<=`, `>`, `>=`, `==`, `!=` | Comparisons |
| 7 | `not` | Boolean NOT |
| 8 | `and` | Boolean AND |
| 9 (lowest) | `or` | Boolean OR |

The key insight: multiplication happens before addition, just like in math class.

```python
result: int = 2 + 3 * 4
```

**Output:**

```
14
```

Python evaluates `3 * 4` first (giving `12`), then adds `2`. The answer is `14`, not `20`. If you want left-to-right order, use parentheses: `(2 + 3) * 4` gives `20`.

**Read and Predict:** What does this expression evaluate to?

```python
result: float = 10 - 2 ** 2 + 8 / 4
```

Work through it step by step: `2 ** 2` = `4` (exponentiation first), `8 / 4` = `2.0` (division next), `10 - 4 + 2.0` = `8.0` (left-to-right). The result is `8.0` -- a float, because division produced a float.

## String Operations

Strings have their own set of operators and methods. Here are the ones you will encounter most when reading Python code.

**Concatenation** joins two strings with `+`:

```python
greeting: str = "Hello" + " " + "World"
```

**Output:**

```
Hello World
```

**Repetition** repeats a string with `*`:

```python
divider: str = "-" * 20
```

**Output:**

```
--------------------
```

**Indexing** retrieves a single character. Indices start at `0`. Negative indices count from the end:

```python
word: str = "Python"
first: str = word[0]
last: str = word[-1]
```

**Output:**

```
P
n
```

**Slicing** extracts a range of characters. The syntax is `s[start:stop]` where `start` is included and `stop` is excluded:

```python
word: str = "Python"
middle: str = word[1:4]
```

**Output:**

```
yth
```

**F-strings** embed expressions inside strings:

```python
name: str = "Zia"
age: int = 25
message: str = f"{name} is {age} years old"
```

**Output:**

```
Zia is 25 years old
```

**Common string methods** you will see in code:

| Method | What It Does | Example | Result |
|--------|-------------|---------|--------|
| `.upper()` | All uppercase | `"hello".upper()` | `"HELLO"` |
| `.lower()` | All lowercase | `"Hello".lower()` | `"hello"` |
| `.strip()` | Remove whitespace from both ends | `"  hi  ".strip()` | `"hi"` |
| `.split(",")` | Split into a list | `"a,b,c".split(",")` | `["a", "b", "c"]` |
| `"-".join(["a","b"])` | Join a list into a string | `"-".join(["a","b"])` | `"a-b"` |

## Boolean Logic

Python's boolean operators are `and`, `or`, and `not`. They look straightforward, but they have a behavior that surprises every beginner: `and` and `or` return actual values, not just `True` or `False`.

**`and` returns the first falsy value, or the last value if all are truthy:**

```python
result_a: int = 5 and 0
result_b: int = 5 and 3
```

**Output:**

```
0
3
```

**`or` returns the first truthy value, or the last value if all are falsy:**

```python
result_a: str = "" or "default"
result_b: str = "hello" or "default"
```

**Output:**

```
default
hello
```

This is **short-circuit evaluation**: Python stops as soon as it knows the answer. With `and`, if the first value is falsy, the result is decided -- no need to check the rest. With `or`, if the first value is truthy, the result is decided.

**Comparison chaining** is a Python feature most languages do not have:

```python
x: int = 5
in_range: bool = 0 < x < 10
```

**Output:**

```
True
```

Python reads `0 < x < 10` as "is x greater than 0 AND less than 10?"

## Trace Tables

A trace table tracks the value of every variable after each line of code executes. It is the most reliable way to predict output -- your brain takes shortcuts, but a trace table forces you to evaluate each line in order.

```python
x: int = 5
y: int = x + 3
x = x * 2
result: int = x + y
```

Build the trace table line by line:

| Line | Code | x | y | result |
|------|------|---|---|--------|
| 1 | `x: int = 5` | 5 | -- | -- |
| 2 | `y: int = x + 3` | 5 | 8 | -- |
| 3 | `x = x * 2` | 10 | 8 | -- |
| 4 | `result: int = x + y` | 10 | 8 | 18 |

**Line 1**: `x` gets `5`. No other variables exist yet. **Line 2**: `y` gets `x + 3` = `5 + 3` = `8`. The value of `x` at this moment is `5`. **Line 3**: `x` gets `x * 2` = `5 * 2` = `10`. This overwrites the old value of `x`. **Line 4**: `result` gets `x + y` = `10 + 8` = `18`. Notice that `x` is now `10`, not `5`.

The common mistake is on Line 4: using `x = 5` instead of `x = 10`. Line 3 changed `x`. If you skip that step -- if your brain takes a shortcut -- you get `13` instead of `18`.

## Common Prediction Traps

These expressions surprise beginners because Python's behavior does not match intuition. Predict each result before reading the answer.

| Expression | Your Prediction | Actual Result | Why It Surprises |
|-----------|----------------|---------------|-----------------|
| `round(2.5)` | 3? | `2` | Banker's rounding: Python rounds to the nearest even number when exactly halfway |
| `round(3.5)` | 4? | `4` | Rounds to 4 (nearest even), which happens to match intuition this time |
| `0.1 + 0.2 == 0.3` | `True`? | `False` | `0.1 + 0.2` equals `0.30000000000000004` due to how computers store decimals in binary (IEEE 754) |
| `bool("0")` | `False`? | `True` | `"0"` is a non-empty string. Only `""` (empty string) is falsy |
| `bool("")` | `False`? | `False` | Empty string is falsy |
| `int(-3.9)` | `-4`? | `-3` | `int()` truncates toward zero, not toward negative infinity (unlike `//`) |
| `-3 ** 2` | `9`? | `-9` | `-(3 ** 2)`, not `(-3) ** 2`. Exponentiation binds tighter than negation |

Python's `round()` uses round half to even: when a number is exactly halfway, it rounds to the nearest even number. This reduces cumulative rounding bias in large datasets. And `0.1 + 0.2` is not a Python bug -- it is how all languages store decimals in binary (IEEE 754). The number `0.1` has no exact binary representation, so tiny approximation errors accumulate.

## Exercises

### Exercise 1: Single Operators

Predict the result of each expression, then check it in Python.

```python
15 / 4
15 // 4
15 % 4
2 ** 5
```

### Exercise 2: Combined Arithmetic

Predict the result. Apply precedence rules.

```python
result: int = 3 + 2 ** 3 - 4 * 2
```

### Exercise 3: Strings and Booleans

Predict each result:

```python
"abc"[1]
"hello"[1:3]
f"Score: {80 + 15}"
0 or "" or "found"
5 and 3 and 0
```

### Exercise 4: Mixed Expressions

Predict each result. Watch for type surprises.

```python
total: float = 10 / 3 + 7 // 2
flag: bool = not (5 > 3 and 2 > 8)
text: str = "py" + "thon" * 2
```

### Exercise 5: Trace Table

Build a trace table for this code block:

```python
width: int = 8
height: int = 5
area: int = width * height
half: float = area / 2
width = width + 2
perimeter: int = 2 * (width + height)
```

| Line | width | height | area | half | perimeter |
|------|-------|--------|------|------|-----------|
| 1 | ? | -- | -- | -- | -- |
| 2 | ? | ? | -- | -- | -- |
| 3 | ? | ? | ? | -- | -- |
| 4 | ? | ? | ? | ? | -- |
| 5 | ? | ? | ? | ? | -- |
| 6 | ? | ? | ? | ? | ? |

## Try With AI

### Prompt 1: Expression Quiz

```
Give me 5 Python expressions and I will predict the result before you
tell me. Rules:
- Use only arithmetic, string, or boolean operators
- Include at least one expression with operator precedence
- Include at least one expression with a common trap (like 0.1 + 0.2 or round)
- After I give my predictions, tell me which ones I got right and explain
  the ones I got wrong
```

**What you're learning:** Predicting expression results is the core reading skill. You are training your brain to trace what Python actually does instead of what you assume it does. Getting predictions wrong is valuable -- each mistake reveals a gap in your mental model.

### Prompt 2: Floating Point Explanation

```
Explain why 0.1 + 0.2 does not equal 0.3 in Python. I am a beginner,
so explain it step by step:
1. What is IEEE 754?
2. Why can't 0.1 be stored exactly in binary?
3. What does Python actually store when I type 0.1?
4. How do the small errors add up?
5. What should I use instead of == to compare floats?
Give a concrete example using Python code for each step.
```

**What you're learning:** The floating-point issue is not a Python bug -- it exists in every programming language that uses IEEE 754 binary arithmetic. Understanding why it happens helps you spot it in real code and know the safe alternative (comparing with a small tolerance instead of exact equality).

### Prompt 3: Trace Table Practice

```
Show me a Python code block with 5-6 lines that uses variables,
arithmetic, and at least one reassignment (like x = x + 1). Do NOT
show me the output yet. Let me build a trace table first. Then check
my trace table row by row and tell me where I went wrong (if anywhere).
```

**What you're learning:** Building trace tables is the method that separates guessing from predicting. When you trace code line by line, you build a mental model of how Python actually executes -- which variable changes when, which old value gets overwritten, and what the state is at any given line.

## Key Takeaways

1. **Division always returns a float.** `6 / 3` gives `2.0`, not `2`. Use `//` for integer division, but remember that `//` floors toward negative infinity (`-7 // 2` is `-4`, not `-3`).

2. **Operator precedence follows math rules with extensions.** Exponentiation before multiplication, multiplication before addition. Parentheses override everything. When in doubt, add parentheses to make your intent explicit.

3. **Boolean operators return actual values, not just True/False.** `and` returns the first falsy value (or the last value), `or` returns the first truthy value (or the last value). Short-circuit evaluation means Python stops checking as soon as it knows the answer.

4. **Trace tables catch what your brain misses.** When a variable gets reassigned (like `x = x * 2`), your brain may skip the update. A trace table forces you to record the new value on every line.

5. **Common traps test your mental model.** `round(2.5)` is `2` (banker's rounding), `0.1 + 0.2 != 0.3` (floating-point representation), `bool("0")` is `True` (non-empty string). Knowing these traps means you will catch them when reading AI-generated code.

## Looking Ahead

You can now predict what expressions evaluate to and trace variable state through a code block. But real Python code is not a list of expressions -- it is organized into functions. In Lesson 4, you will learn to read function signatures as contracts: what a function accepts, what it returns, and what it promises. A function signature tells you everything you need to know before reading a single line of the function body.
