---
sidebar_position: 4
title: "Part 4: Programming in the AI Era"
---

# Part 4: Programming in the AI Era

In Parts 1-3, you discovered the AI development revolution, mastered AI collaboration tools, applied General Agents to real workflows, and learned specification-driven development. Now you are ready for the question that defines this era: *If AI can write code, what exactly should you learn?*

The answer is not less programming. It is different programming. AI has eliminated the old bottleneck -- typing code from scratch -- and created a new one: verifying that AI-generated code is correct. The highest-leverage skill is no longer writing. It is reading, specifying, and verifying. This part teaches all three.

## The Pedagogical Shift

Traditional Python courses teach bottom-up: syntax first, verification last. This course inverts that order.

```
OLD:  Write syntax → Build things → Maybe test → Ship
NEW:  Read code → Specify with types → Write tests → Prompt AI → Verify → Ship
```

Every Python feature follows a five-step progression: **See** it in AI-generated code, **Read** what it does, **Predict** its output, **Test** it by defining expected behavior, and **Build** with it by specifying types and tests while AI implements. "Writing" in the AI era means specifying and verifying -- never typing implementation from a blank page.

## The Seven Phases

Part 4 is organized into seven phases. Each phase builds a new capability, and your role evolves from passive reader to full system architect.

| Phase | Chapters | Your Role | What You Can Do |
|-------|----------|-----------|-----------------|
| **1. The Workbench** | Ch 14-16 | **Reader** | Read AI output, predict behavior, use professional tools |
| **2. Types as the Language of Intent** | Ch 17-20 | **Specifier** | Tell AI precisely what shape data has using typed specifications |
| **3. Tests as Specification** | Ch 21-24 | **Verifier** | Prove code is correct by writing test specifications |
| **4. OOP -- The Python Object Model** | Ch 25-28 | **Modeler** | Design object systems for AI to implement |
| **5. Real-World Python** | Ch 29-31 | **Practitioner** | Spec real-world features using the full TDG cycle |
| **6. Production Systems** | Ch 32-34 | **Builder** | Spec and ship complete software via TDG |
| **7. Capstone** | Ch 35-36 | **Architect** | Architect and deliver full systems via TDG |

### The Specification Sophistication Gradient

Your ability to specify what you want from AI grows across each phase:

```
Phase 1:  Read + Understand          → "I can read AI output"
Phase 2:  Specify with types          → "I can tell AI what shape data has"
Phase 3:  Specify with tests          → "I can define what correct means"
Phase 4:  Design object models        → "I can design systems for AI to implement"
Phase 5:  Architect components        → "I can spec real-world features via TDG"
Phase 6:  Ship production systems     → "I can spec and ship complete software"
Phase 7:  Full system architecture    → "I can architect and deliver via TDG"
```

By Phase 5, you will have seen every Python feature dozens of times in AI output. Specifying it precisely for AI feels natural, not forced.

## The Core Method: Test-Driven Generation (TDG)

Starting in Phase 1 and maturing through every phase after, you learn the TDG cycle -- the core methodology of this course:

```
Specify → Type → Test → AI Generates → Verify → Iterate
```

You define what the code should do (types and tests). AI writes the implementation. You verify the output. When tests fail, you tighten the specification and iterate. This is programming in the AI era: you hold the specification, AI holds the pen.

## Phase 1: The Workbench (Read + Verify)

The first three chapters establish the foundation that every subsequent phase builds on.

**Chapter 14: Ten Axioms of Programming in AI-Driven Development** formalizes the engineering rules that govern how you work with AI-generated code. These ten axioms -- organized into Structure (I-IV), Data (V-VI), and Verification (VII-X) -- are the framework every subsequent chapter builds on.

**Chapter 15: The Development Environment** installs the five-tool discipline stack -- uv, pyright, ruff, pytest, and Git -- each mapped to a specific axiom. Before you write a single line of Python, you build the foundation that makes every line verifiable.

**Chapter 16: Reading Python** teaches you to read typed Python before you write it. Using the Predict-Run-Investigate method, you learn to trace expressions, read type annotations, interpret function signatures, and perform your first code review on a real module.

## What You Will Learn

By the end of Part 4, you will be able to:

- **Apply engineering axioms** that govern specification, verification, and composition of AI-generated code
- **Use professional Python tooling**: uv for package management, pyright for type checking, ruff for linting, pytest for testing, and Git for version control
- **Read and verify code**: Trace expressions, interpret type annotations, read function signatures, and review AI-generated modules critically
- **Specify with types**: Primitive types, collections, dataclasses, and Pydantic models -- defining the shape of data so AI knows exactly what to build
- **Specify with tests**: pytest fixtures, parametrize, coverage -- writing test suites that serve as requirement documents for AI
- **Design object-oriented systems**: Classes, inheritance, composition, protocols, and special methods -- modeling real domains that AI implements
- **Drive the TDG cycle**: From problem statement to working software through specify, type, test, generate, and verify
- **Ship production systems**: Exception handling, file I/O, async programming, and deployment -- building software that works beyond the tutorial

## What's Next

After completing Part 4, continue to **Part 5: Building Custom Agents** where you apply your Python skills and axiom-grounded thinking to build production AI agents with SDKs like OpenAI Agents, Google ADK, and Claude Agent SDK.

The programming skills you build here become the foundation for every technical part that follows. You are not just learning a language. You are learning to direct and verify the AI systems that write it.
