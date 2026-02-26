---
sidebar_position: 1
title: "Why Reading Comes Before Writing"
description: "Understand why reading and verifying code is the most important skill in AI-driven development, and learn the PRIMM method for reading Python."
keywords: ["code reading", "PRIMM", "predict run investigate", "AI code review", "reading before writing", "code comprehension"]
chapter: 16
lesson: 1
duration_minutes: 15

# HIDDEN SKILLS METADATA
skills:
  - name: "Code Reading Mindset"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information and Data Literacy"
    measurable_at_this_level: "Explain why reading code before writing it is essential in AI-driven development"
  - name: "AI Output Verification Awareness"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Safety"
    measurable_at_this_level: "Describe why AI-generated code requires human verification"

learning_objectives:
  - objective: "Explain why reading code is more important than writing code in the AI era"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Short answer explanation"
  - objective: "Describe the three stages of the PRIMM framework used in this chapter"
    proficiency_level: "A1"
    bloom_level: "Remember"
    assessment_method: "Identify each PRIMM stage"
  - objective: "Recognize the difference between code generation speed and code verification ability"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Scenario analysis"

cognitive_load:
  new_concepts: 3
  assessment: "Low -- 3 concepts (reading-first mindset, active reading vs passive scanning, PRIMM framework) well within A1 limit. Conceptual framing, no code writing."

differentiation:
  extension_for_advanced: "Research how code review practices differ for AI-generated vs human-written code"
  remedial_for_struggling: "Focus on the language-learning analogy -- reading comprehension before essay writing"
---

# Why Reading Comes Before Writing

In Chapter 15, you built the workbench -- uv, pyright, ruff, pytest, and Git, all configured and ready. Now you will use that workbench for its first real job: reading Python.

James watches AI generate fifty lines of typed Python in four seconds. Variables with type annotations, a function with a return type, an import he has never seen before. He leans back, impressed. "That was fast. Ship it." Emma points at line 12. "What does this do?" James stares at the screen. He reads the line. He reads it again. He cannot explain what it does. Emma does not look surprised. "You just accepted fifty lines of code you cannot explain. That is not programming. That is hoping."

This is the first lesson of a chapter devoted entirely to reading. You will not write a single line of Python here. Instead, you will learn to predict what code does before running it, trace how values change line by line, and explain a function's purpose in plain English. These are the skills that separate someone who uses AI from someone who is used by it.

---

## The AI-Era Shift

In traditional computer science education, the skill was writing. Students sat in front of blank editors and typed programs from scratch. The bottleneck was production: How fast can you translate an idea into working code?

AI removed that bottleneck. A coding assistant can produce a complete function in seconds. The new bottleneck is verification: How do you know the code is correct?

This is not a theoretical concern. GitClear's 2025 research on AI-assisted code quality found that code written with AI assistants has measurably higher churn -- 7.9% of newly added code required revision within two weeks, compared to 5.5% before widespread AI adoption. Code duplication increased while refactoring declined. The code gets generated fast. It does not always get generated right.

| Era | Bottleneck | Primary Skill |
|---|---|---|
| Pre-AI | Production -- typing code from scratch | Writing |
| AI-assisted | Verification -- confirming code is correct | Reading |

James's mistake was not using AI. His mistake was trusting output he could not read. The discipline stack from Chapter 15 catches some errors automatically -- pyright flags type mismatches, ruff catches style violations, pytest verifies behavior. But those tools check what they are designed to check. They do not check whether the code does what *you* intended. Only you can verify that, and you verify it by reading.

---

## Reading Is Not Passive

When most people hear "read code," they picture scanning. Eyes move across lines, words register vaguely, and the reader reaches the end with a general impression but no precise understanding. That is not reading. That is skimming.

Active reading is mentally demanding work. It means three things:

**Predicting** what code will do *before* running it. You look at a line like `result: int = 10 // 3` and commit to an answer -- "result will be 3" -- before the computer confirms or corrects you. The prediction forces your brain to engage with the logic instead of passively absorbing text.

**Tracing** variable state changes line by line. When code has five statements, you track what each variable holds after each line. This is slow, deliberate, and the single most effective technique for building a correct mental model of how Python executes.

**Explaining** a function's purpose in plain English. If you can say "this function takes a name and returns a greeting with the current date," you understand it. If you can only say "it does some string stuff," you do not.

These three activities -- predict, trace, explain -- are the core of reading. They are what this chapter trains.

---

## The PRIMM Method

This chapter follows a research-backed framework called **PRIMM**, developed by Sentance, Waite, and Kallia (2019) for teaching programming through reading. PRIMM has five stages. This chapter uses the first three:

| Stage | What You Do | Example |
|---|---|---|
| **Predict** | Guess what the code will output *before* running it | "I think `10 // 3` will give `3`" |
| **Run** | Execute the code and compare the actual output to your prediction | Run it. Output: `3`. Prediction confirmed. |
| **Investigate** | Trace execution, annotate code, explain logic in plain English | "The `//` operator performs floor division, discarding the remainder" |

The remaining stages -- Modify and Make -- involve changing and writing code. Those come in Chapter 17. For now, you are a reader. You predict, run, and investigate. That is enough.

Why start with reading? Because understanding must precede creation. Every prediction you make -- right or wrong -- builds your mental model of how Python works. Every wrong prediction is especially valuable: it reveals a gap between what you assumed and what Python actually does. Those gaps are where learning happens.

---

## What You Will Read in This Chapter

Here is the progression for the six lessons ahead:

| Lesson | What You Read | Skill You Build |
|---|---|---|
| **This lesson** | Why reading matters | The reading-first mindset |
| **Lesson 2** | `str`, `int`, `float`, `bool` | Recognizing type annotations |
| **Lesson 3** | Arithmetic, strings, booleans | Predicting expression output |
| **Lesson 4** | Function signatures | Reading contracts (inputs, outputs) |
| **Lesson 5** | Runtime vs static types | Understanding what Pyright catches |
| **Lesson 6** | A SmartNotes module (~80 lines) | Performing your first code review |

By Lesson 6, you will read a real module of AI-generated typed Python -- the SmartNotes project you configured in Chapter 15 -- and explain every function in plain English. That is the target.

---

## The Language-Learning Analogy

Reading comprehension comes before essay writing. This is true in every natural language, and it is true in programming.

Children read thousands of sentences before writing their first paragraph. Language learners parse restaurant menus, street signs, and news headlines long before composing their own prose. The reason is cognitive: you need a library of patterns in your head before you can produce new combinations of those patterns. Without input, there is no output.

Programming works the same way. Before you write `def greet(name: str) -> str:`, you need to have read dozens of function signatures. Before you write a conditional, you need to have traced how `if`/`else` branches execute. The reading builds the mental library that writing draws from.

This chapter is your reading phase. Thousands of lines of typed Python, observed and explained, before you write your first line in Chapter 17.

---

## Exercises

### Exercise 1: Predict the Output

Read this code. Predict what it will print. Write down your prediction *before* checking the answer below.

```python
greeting: str = "Hello"
name: str = "James"
message: str = greeting + ", " + name + "!"
print(message)
```

**Output:**

```
Hello, James!
```

String concatenation joins three pieces: `"Hello"`, `", "`, and `"James"`, then appends `"!"`. The type annotations confirm every variable holds a `str`.

### Exercise 2: Predict the Output

Read this code. Predict what it will print.

```python
x: int = 10
y: int = 3
result: int = x // y
print(result)
```

**Output:**

```
3
```

The `//` operator is floor division -- it divides and drops the remainder. `10 / 3` would give `3.333...`, but `10 // 3` gives `3`. The type annotation `int` confirms the result is a whole number.

---

## Try With AI

Open your AI coding assistant. Try these three prompts to explore the reading-first mindset.

### Prompt 1: Examine a Generated Function

```
Generate a simple Python function with type annotations that takes
a person's first name (str) and birth year (int), and returns a
greeting string that includes their approximate age.

After generating it, explain each part of the function signature
to me: the parameter names, their types, and the return type.
```

**What you're learning:** You are practicing the skill of reading a function signature -- the contract that tells you what goes in and what comes out. The AI generates the code; your job is to understand the signature before looking at the body. This is the core pattern of this chapter: read the contract first, then read the implementation.

### Prompt 2: Why Type Annotations Help Readers

```
Explain why Python type annotations make code easier to READ
(not write). Give me a specific before/after example showing
the same function without type annotations and with them.
Focus on the reader's experience, not the writer's.
```

**What you're learning:** You are exploring how type annotations serve as documentation for the reader. In this chapter, every code example has type annotations because they reduce guesswork. The AI's explanation will preview what you will experience in Lesson 2 when you read typed variables for the first time.

### Prompt 3: With and Without Types

```
Show me this function in two versions:
1. Without any type annotations
2. With full type annotations

def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count

For each version, explain what a reader can and cannot determine
just from reading the code (without running it).
```

**What you're learning:** You are seeing the difference between code that explains itself and code that forces you to guess. When types are absent, you must run the code or read the documentation to understand what `numbers` holds. When types are present, the signature tells you immediately. This is why this chapter uses typed Python exclusively.

---

## Key Takeaways

1. **Reading code is the primary skill in AI-driven development.** AI generates code fast. Your job is verifying it is correct -- and that requires reading, not writing.

2. **Active reading means predicting, tracing, and explaining -- not scanning.** Predict what code does before running it. Trace variable changes line by line. Explain functions in plain English. If you cannot explain it, you do not understand it.

3. **PRIMM is your method: Predict, Run, Investigate.** These three stages structure every lesson in this chapter. Modify and Make come later, in Chapter 17.

4. **Speed of generation without ability to verify is dangerous.** James accepted fifty lines of code he could not explain. The discipline stack catches some errors, but only a human reader can verify intent.

5. **This chapter focuses on reading only -- writing comes in Chapter 17.** Like learning a natural language, you build a library of patterns through reading before producing your own code.

---

## Looking Ahead

You know why reading matters and how you will practice it. In the next lesson, you will meet Python's four primitive types -- `str`, `int`, `float`, and `bool` -- and learn to read type annotations as labels that tell you what a variable holds without running the code.
