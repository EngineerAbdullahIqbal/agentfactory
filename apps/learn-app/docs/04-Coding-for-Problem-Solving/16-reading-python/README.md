---
sidebar_position: 16
title: "Chapter 16: Reading Python"
description: "Learn to read typed Python code — primitive types, expressions, function signatures, and type annotations — through prediction exercises and code tracing."
keywords:
  [
    "python",
    "type annotations",
    "reading code",
    "typed python",
    "str",
    "int",
    "float",
    "bool",
    "function signatures",
    "code reading",
    "PRIMM",
    "predict output",
  ]
---

# Chapter 16: Reading Python

James watches Claude generate fifty lines of typed Python in under ten seconds. He is impressed by the speed. Emma glances at the screen and points to line twelve. "What does that line do?" James stares at it. He cannot answer. Emma does not look surprised. "Speed means nothing without understanding. If you cannot read the code your tools produce, you cannot verify it, debug it, or trust it."

In Chapter 15, you built the workbench -- uv, pyright, ruff, pytest, and Git. Every tool is installed, every configuration file is in place, and your SmartNotes project has a clean foundation. Now you learn the language those tools process. Before you write Python, you read it. Before you generate code with AI, you learn to predict what code does line by line, so that every function signature, type annotation, and expression is something you understand rather than something you hope works.

This chapter teaches you to read typed Python. You will trace expressions by hand, predict output before running code, and read function signatures the way a mechanic reads a wiring diagram -- understanding what goes in, what comes out, and what the types guarantee. Every lesson uses the same method: predict first, run second, investigate third.

## What You Will Learn

By the end of this chapter, you will be able to:

- Explain why reading code is the foundational skill for working with AI-generated Python
- Recognize the four primitive types -- `str`, `int`, `float`, `bool` -- and read type annotations
- Predict what Python expressions evaluate to using trace tables
- Read function signatures as contracts: parameter types, return types, and what they promise
- Distinguish what Python enforces at runtime from what type checkers enforce statically
- Read a real SmartNotes module and identify types, signatures, and control flow

## The Reading Method

Every lesson in this chapter follows the **Predict-Run-Investigate** method. You see a piece of code. You predict what it does -- on paper or in your head -- before you run it. Then you run it and compare your prediction to the actual result. When your prediction is wrong, you investigate why. This cycle builds the mental model that separates someone who reads code from someone who stares at it.

## Chapter Lessons

| Lesson | Title | What You Do |
|--------|-------|-------------|
| 1 | Why Reading Comes Before Writing | Understand why reading code is the #1 AI-era skill |
| 2 | Types as Labels -- str, int, float, bool | Recognize primitive types and read type annotations |
| 3 | Reading Expressions and Predicting Output | Predict what expressions evaluate to, use trace tables |
| 4 | Reading Function Signatures | Read function contracts -- what goes in, what comes out |
| 5 | What Python Does (and Doesn't Do) with Types | Understand runtime vs static type checking |
| 6 | Reading SmartNotes -- Your First Code Review | Apply all skills to read a real SmartNotes module |

## Prerequisites

- **Chapter 15: The Development Environment** -- You must have the discipline stack installed (uv, pyright, ruff, pytest, Git) and a working SmartNotes project. Every lesson in this chapter runs code inside that project.
