---
sidebar_position: 4
title: "Part 4: Programming in the AI Era"
---

# Part 4: Programming in the AI Era

If AI can write code, why should you learn programming?

It is the most common question in 2026. And the answer is counterintuitive: programming has become **more important, not less** -- but in a fundamentally different way.

Traditional Python education teaches bottom-up: syntax first, verification last. *Python Crash Course* teaches features through projects, with testing arriving at Chapter 11. *Learning Python* devotes 1,270 pages to deep Python, with OOP starting at page 687. Both assume the bottleneck is producing code -- typing functions, loops, and classes from a blank page.

AI eliminated that bottleneck. Tools like Claude Code, Cursor, and GitHub Copilot generate hundreds of lines of working code in seconds. The mechanical act of writing code is no longer the human's job. But someone must still **specify** what the code should do, and someone must **verify** that it does it correctly. The AI handles the process. You handle the input and the output.

This part inverts the traditional order. You learn to read before you write. You learn types before syntax. You learn testing before building. And you learn it all through a single method that defines programming in the AI era: **Test-Driven Generation (TDG)**.

```
OLD:  Write syntax → Build things → Maybe test → Ship
NEW:  Read code → Specify with types → Write tests → Prompt AI → Verify → Ship
```

## How Every Python Feature Is Taught

Every Python feature in this part follows a five-step progression:

1. **See it** -- AI generates code containing the feature
2. **Read it** -- The lesson explains what it does and why
3. **Predict it** -- "What will this output?" exercises build your mental model
4. **Test it** -- You define expected behavior and verify test correctness with AI
5. **Build it** -- You specify types and tests, prompt AI to implement, and verify the output

Steps 4 and 5 are done **with AI**, not manually. Your job is to specify and verify -- never to type implementation from a blank page. "Writing code" in this course means defining types, writing test specifications, prompting AI, and verifying output.

## The Seven Phases

Part 4 is organized into seven phases. Each phase gives you a new capability, and your role evolves from passive reader to full system architect. Your ability to specify what you want from AI grows with each phase.

### Phase 1: The Workbench (Read + Verify)

> Your role: **Reader** -- "I can understand what AI generates"

Phase 1 establishes the foundation that every subsequent phase builds on. You install professional tools, learn to read typed Python, and experience the TDG cycle for the first time.

**Chapter 14: Ten Axioms of Programming in AI-Driven Development** formalizes the engineering rules that govern how you work with AI-generated code. These ten axioms -- organized into Structure (I-IV), Data (V-VI), and Verification (VII-X) -- are the framework every subsequent chapter builds on. Each axiom exists because, without it, a specific thing goes wrong. Together they form a complete engineering system that turns AI from a source of unpredictable complexity into your most reliable collaborator.

**Chapter 15: The Development Environment** installs the five-tool discipline stack -- uv, pyright, ruff, pytest, and Git -- each mapped to a specific axiom. Before you write a single line of Python, you build the foundation that makes every line verifiable. By the end of this chapter, your SmartNotes project has a passing linter, a passing type checker, a passing test suite, and a clean Git history.

**Chapter 16: Reading Python** teaches you to read typed Python before you write it. Using the Predict-Run-Investigate method, you learn to recognize primitive types (`str`, `int`, `float`, `bool`), trace expressions by hand, read function signatures as contracts, distinguish runtime from static type checking, and perform your first code review on a real SmartNotes module.

**Your First TDG Cycle** closes Phase 1 by giving you the complete Test-Driven Generation loop: Specify, Type, Test, AI Generates, Verify. You write your first test -- five lines that define a requirement -- prompt AI to implement the function that passes it, and run `pytest` to see green. Five lines of your code produce twenty lines of working implementation. This changes everything.

### Phase 2: The Python Language (Specify)

> Your role: **Specifier** -- "I can tell AI precisely what to build"

Phase 2 teaches the building blocks of the Python language. You learn the type system, data structures, functions, and control flow -- everything you need to read, write, and direct AI-generated code with precision.

**Primitive Types and Expressions** teaches Python's type system as a specification language. `str`, `int`, `float`, `bool` -- along with string methods, arithmetic operators, f-string formatting, type conversions, and type narrowing -- all framed not as syntax to memorize but as contracts you write so AI knows what to build.

**Collections** introduces typed containers: `list[str]` for ordered sequences, `dict[str, int]` for key-value mappings, `tuple[str, int, bool]` for fixed-size groups, and `set[str]` for unique collections. You learn indexing, slicing, mutability, nested collections, and when to use which structure -- all through the lens of type safety.

**Functions as Contracts** reframes functions as specifications. A function signature IS a contract: inputs, output, and what it promises. You learn type annotations on parameters and return values, default values, `*args` and `**kwargs`, pure functions, composition, scope, first-class functions, and docstrings as specification. TDG exercises have you writing signatures and tests while AI implements the body.

**Control Flow** teaches how code makes decisions and repeats. `if/elif/else` for branching, `match/case` for structural pattern matching, `for` loops for iteration, `while` loops for conditional repetition, `break`, `continue`, and truthiness. You predict which path code takes, trace loop execution, and test that every branch behaves correctly.

### Phase 3: Tests as Specification (Verify)

> Your role: **Verifier** -- "I can prove code is correct"

Phase 3 gives you the power to define "correct." You model your domain with typed data structures, then write tests that serve as requirement documents. AI implements against your specifications.

**Data Models** introduces `@dataclass` and Pydantic `BaseModel` as specification tools. You model real domains -- Order, Customer, Product -- with typed data structures. Dataclasses handle internal data; Pydantic validates external boundaries. Now that you know types, functions, and control flow, you combine them all into structured domain models that tell AI exactly what your data looks like.

**pytest Deep Dive** turns you into a specification author. Arrange-Act-Assert structure, fixtures for reusable setup, `@pytest.mark.parametrize` for testing many cases from one function, `pytest.raises` for testing exceptions, coverage measurement, and test organization. By the end, you write complete test suites (20-40 lines) that serve as specifications for AI to implement against.

**TDG Mastery** brings the full cycle together: start from a problem statement, define types, write comprehensive tests (happy path + edge cases), prompt AI effectively, review output, iterate when tests fail, and run the complete verification stack (`ruff` → `pyright` → `pytest`). This is the chapter where the method clicks.

**Error Handling and Exceptions** teaches you to anticipate failures. `try/except/else/finally`, the built-in exception hierarchy, raising and chaining exceptions, custom exception classes, context managers, Pydantic validators for boundary data, and testing error paths with `pytest.raises`. You design exception hierarchies and write error-path tests before AI implements the handling.

### Phase 4: OOP -- The Python Object Model (Model)

> Your role: **Modeler** -- "I can design systems for AI to implement"

Phase 4 teaches object-oriented programming **after** testing mastery, so you can verify every OOP concept you learn. The philosophy: composition first, inheritance when justified, protocols over abstract base classes, test every design decision.

**Classes and Instances** progresses from dataclasses to full classes. The `class` statement, `__init__`, `self`, instance vs class attributes, methods, and the key decision: dataclass for data, class for behavior. You define class interfaces with types and tests, then prompt AI to implement.

**Inheritance, Composition, and Design** teaches the relationships between objects. "Is-a" (inheritance) vs "has-a" (composition), method overriding, `super()`, abstract base classes, multiple inheritance and MRO. The design decision framework: when in doubt, choose composition. You design class hierarchies and write interface tests, then AI implements while you verify.

**Special Methods and the Python Object Model** reveals how Python objects work under the hood. `__repr__`, `__str__`, `__eq__`, `__lt__`, `__len__`, `__getitem__`, `__iter__`, `__next__`, `__bool__`, `__hash__`, and the context manager protocol. You specify special method behavior through tests, then AI implements Pythonic objects.

**Decorators, Properties, and Advanced Patterns** covers `@staticmethod`, `@classmethod`, `@property`, custom decorators, decorator arguments, `Protocol` for structural subtyping, dependency injection, and metaclasses (reference only). You architect patterns and verify -- the full advanced OOP toolkit.

### Phase 5: Real-World Python (Architect + TDG)

> Your role: **Practitioner** -- "I can spec real-world features via TDG"

Phase 5 applies everything to real-world problems. By now, you have seen every Python feature dozens of times in AI output. Specifying it precisely feels natural.

**Files, Data Processing, and PostgreSQL** teaches reading and writing text files with `pathlib`, JSON and CSV processing, binary files and encoding, processing pipelines, and error handling for I/O operations. When files are not enough, you graduate to PostgreSQL -- connecting with `psycopg`, creating tables, parameterized queries, and the repository pattern. You build data processing tools that start with JSON and graduate to a real database.

**Modules and Packages** teaches code organization beyond single files. The `import` statement, creating modules and packages, `__init__.py`, relative vs absolute imports, `__name__ == "__main__"`, project structure conventions, and circular import resolution. You architect module structures and AI generates the scaffolding.

**Comprehensions, Generators, and Functional Patterns** unleashes Python's expressive power for data transformation. List, dict, and set comprehensions, generator expressions for memory efficiency, `yield` and lazy evaluation, `map()`, `filter()`, `sorted()`, lambda functions, `functools`, and `itertools`. You specify transformation pipelines and compare AI versions for correctness and efficiency.

### Phase 6: Production Systems (Ship)

> Your role: **Builder** -- "I can spec and ship complete software"

Phase 6 takes you from working code to production software. You build real tools, handle concurrency, and automate verification.

**Unix-Style CLI Tools** teaches professional command-line applications. `stdin`/`stdout`/`stderr`, argument parsing, exit codes, composable tools, environment variables, and packaging. You design the CLI interface and write integration tests, then AI implements the handlers.

**Concurrency, async/await, and FastAPI** teaches concurrent execution for the real world where APIs, databases, and file I/O all block. Threading basics and the GIL, `async def` and `await`, the event loop, `asyncio.gather()`, async context managers, and when to use what. Then you put async to work with a FastAPI introduction -- one typed API endpoint with Pydantic request/response models, async handlers, and `TestClient` testing. This matters because FastAPI is async, agent SDKs are async, and MCP is async.

**CI/CD, Git Workflows, and Observability** automates verification and monitoring. Git branching and workflow, GitHub Actions CI pipeline, the verification pyramid (format → lint → type check → test → security), structured logging, health checks, and error tracking. The complete professional workflow: branch → code → test → CI → review → merge.

### Phase 7: Capstone (Prove)

> Your role: **Architect** -- "I can architect and deliver complete systems"

Phase 7 is proof. You build **SmartNotes v1.0** -- the Personal AI Knowledge Base you have been developing since Phase 1, now fully integrated with AI-powered features.

The capstone combines every skill: Markdown specifications, typed data models (dataclasses + Pydantic + classes), object-oriented design (inheritance, composition, protocols), PostgreSQL persistence, typed function composition, async/await for API and SDK calls, a `smartnotes` CLI tool, a FastAPI async API, AI integration (semantic search, auto-summarization via the Anthropic SDK), a pytest suite with 80%+ coverage, a GitHub Actions CI pipeline, and structured logging.

**Deliverables**: Specification documents, type definitions, object model diagram, passing test suites, AI-generated and student-reviewed implementation, green CI pipeline, and a deployed SmartNotes application with CLI + API + AI features. One polished portfolio project that demonstrates every skill in the course.

## The SmartNotes Project

You do not build seven throwaway projects. You build **one real application** -- SmartNotes -- that grows with you across all seven phases. Each phase adds a layer that exercises that phase's core skills.

| Phase | SmartNotes Version | What You Build |
|-------|-------------------|----------------|
| 1 | v0.1: Explore | Read and annotate a pre-built prototype (~200 lines) |
| 2 | v0.2: Type It | Typed variables, functions, and control flow -- structure with no implementation |
| 3 | v0.3: Prove It | Data models + 30 passing tests with 90%+ coverage of the core domain |
| 4 | v0.4: Architect | Full object model with behavior, inheritance, protocols, decorators |
| 5 | v0.5: Store It | PostgreSQL persistence, file import/export, proper package structure |
| 6 | v0.6: Ship It | CLI tool + FastAPI async API + CI pipeline + structured logging |
| 7 | v1.0: Complete | AI-powered semantic search, auto-tagging, summarization -- production-grade |

Every exercise adds to the same project. Each phase produces a working, shippable version. By the end, you have one polished portfolio project that demonstrates typed Python, testing, OOP design, async APIs, and AI integration -- not seven toy exercises.

## What You Will Be Able To Do

By the end of Part 4, you will be able to:

1. **Read and verify** AI-generated typed Python -- tracing expressions, interpreting annotations, reading function signatures, and reviewing modules critically
2. **Specify with types** -- defining primitive types, typed collections, functions as contracts, and control flow that tells AI precisely what to build
3. **Model domains and specify with tests** -- dataclasses, Pydantic models, and pytest suites that serve as requirement documents covering happy paths, edge cases, and error conditions
4. **Drive the TDG cycle** independently -- from problem statement through specification, types, tests, AI generation, verification, and iteration until green
5. **Design object-oriented systems** -- classes, inheritance, composition, protocols, special methods, decorators, and properties -- modeling real domains that AI implements
6. **Build production software** -- CLI tools, async APIs with FastAPI, PostgreSQL persistence, data processing pipelines, and modular package architecture
7. **Automate verification** -- CI/CD pipelines, structured logging, health checks, and the full professional workflow from branch to merge
8. **Architect complete systems** -- combining all skills to spec, build, test, and ship a production-grade AI-powered application

## What's Next

After completing Part 4, continue to **Part 5: Building Custom Agents** where you apply your Python skills and axiom-grounded thinking to build production AI agents with SDKs like OpenAI Agents, Google ADK, and Claude Agent SDK. The async patterns you mastered in Phase 6, the typed interfaces you designed in Phase 4, and the testing discipline you built in Phase 3 feed directly into agent development.

The transformation of software development is underway. You are not just learning a language. You are learning to direct and verify the AI systems that write it.

Let's begin.
