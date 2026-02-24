# Python for the New AI Era: Course Architecture Plan

**Version:** 2.7
**Status:** Draft
**Date:** 2026-02-20
**Branch:** `learn-python`

---

## 1. The Thesis

We are in the **Post-Syntax Era**. The scarcity in software engineering is no longer the ability to produce code, but the ability to **define problems precisely** and **verify solutions rigorously**.

Traditional Python education teaches **bottom-up**: syntax first, verification last.

- *Python Crash Course* (Matthes, 2023) — teaches features through projects, testing arrives at Chapter 11
- *Learning Python* (Lutz, 2025) — 1,270 pages of deep Python, OOP starts at Chapter 26 (page 687)

This course inverts that order.

**Our approach**: Teach reading and verification first. "Writing" means specifying (types + tests) and verifying AI output — never typing implementation from a blank page.

**Core belief**: A student who can read typed Python, write precise test specifications, and drive AI to correct implementations is more valuable in 2026 than one who memorized list comprehension syntax.

---

## 2. The Pedagogical Shift

### Old Way vs New Way

| Dimension | Old Way (Matthes / Lutz) | New Way (AI Era) |
|---|---|---|
| **Starts with** | `print("Hello World")` | `uv init` + `pyproject.toml` |
| **Core skill** | Memorize syntax | Define specifications |
| **Testing** | Chapter 11 (afterthought) | Chapter 3 (foundational) |
| **Types** | Optional / "dynamic typing interlude" | Non-negotiable from line 1 |
| **OOP** | Part VI, 7 chapters of theory-first | Integrated: dataclasses early, full OOP after testing mastery |
| **Code authoring** | Student writes everything | Student specifies (types + tests), AI implements, student verifies |
| **First project** | Alien invasion game | Typed CLI tool with CI pipeline |
| **"Done" means** | It runs | Types pass, tests pass, CI green |
| **Entry point** | Writing from blank page | Reading AI-generated output |

### The Inversion

```
OLD:  Write syntax → Build things → Maybe test → Ship
NEW:  Read code → Specify with types → Write tests → Prompt AI → Verify → Iterate → Ship
```

---

## 3. The Core Pedagogical Method: Read-First, Type-First, Test-First

### Resolving the Tension

**Tension**: If AI writes code, but students can't verify what they don't understand, how much Python do they need?

**Resolution**: Students must understand every Python feature they encounter. They don't need to memorize how to write it from scratch.

Like language learning: reading comprehension comes before essay writing.

### The Feature Learning Progression

Every Python feature follows this 5-step progression:

```
1. SEE it     → AI generates code containing the feature
2. READ it    → Lesson explains what it does and why
3. PREDICT it → "What will this output?" exercises
4. TEST it    → Student defines expected behavior → prompts AI to help structure the test → verifies test correctness
5. BUILD it   → Student specifies (types + tests) → prompts AI to implement → verifies and iterates (TDG cycle)
```

**Critical principle**: Steps 4 and 5 are done WITH AI, not manually. The student's job is to **specify and verify**, never to write implementation from a blank page. "Writing" in the AI era means defining types, writing test specifications, prompting AI, and verifying output.

### The Specification Sophistication Gradient

Student specification ability increases across phases:

```
Phase 1 (Ch 1-3):    Read + Understand          ← "I can read AI output"
Phase 2 (Ch 4-7):    Specify with types          ← "I can tell AI what shape data has"
Phase 3 (Ch 8-11):   Specify with tests          ← "I can define what correct means"
Phase 4 (Ch 12-15):  Design object models        ← "I can design systems for AI to implement"
Phase 5 (Ch 16-18):  Architect components        ← "I can spec real-world features via TDG"
Phase 6 (Ch 19-21):  Ship production systems     ← "I can spec + ship complete software via TDG"
Phase 7 (Ch 22-23):  Full system architecture    ← "I can architect and deliver via TDG"
```

By Phase 5, students have seen every Python feature 50+ times in AI output. Specifying it precisely for AI feels natural, not forced.

---

## 4. Target Audience

### Dual-Track Design

The course serves **two audiences simultaneously**:

| Audience | What they bring | What they need |
|---|---|---|
| **True beginners** | No programming experience | Everything, but in the right order |
| **Experienced coders** | Know syntax from other languages | The new AI-era workflow and discipline |

### How both are served

- **Beginners** follow the full progression: read → specify → test → prompt AI → verify
- **Experienced coders** can skim reading chapters but gain the TDG workflow, typed Python discipline, and AI collaboration patterns they've never seen before

Each chapter includes:
- **Core content**: Required for all (the new workflow)
- **"If you're new to programming" callouts**: Extra explanation of fundamentals
- **"If you've coded before" callouts**: What's different in this approach

---

## 5. The Python Feature Map (Two Reference Books → Our Framing)

All traditional Python features are taught. The **framing changes**, not the content.

### From Python Crash Course (Matthes)

| Matthes Chapter | Traditional Framing | Our Framing | Our Chapter |
|---|---|---|---|
| Ch 1: Getting Started | Install Python, run a script | The professional workbench: uv, pyright, ruff, pytest | Ch 1 |
| Ch 2: Variables & Types | Variables store data | Reading AI output: what `name: str = "Zia"` means | Ch 2, 4 |
| Ch 3: Lists | Lists store sequences | Typed collections: what `list[str]` tells us about data | Ch 5 |
| Ch 4: Working with Lists | Looping through lists | Iteration: how AI processes every item | Ch 8 |
| Ch 5: If Statements | Conditional execution | Branch logic: predicting which path code takes | Ch 8 |
| Ch 6: Dictionaries | Key-value pairs | Key-value data: why AI uses `dict[str, int]` for lookups | Ch 5 |
| Ch 7: User Input & While | Input and while loops | Control flow through testing: loops that terminate | Ch 8 |
| Ch 8: Functions | Defining functions | Contracts: what a function signature promises | Ch 7 |
| Ch 9: Classes | OOP fundamentals | Domain models → Full OOP arc | Ch 6, 12-15 |
| Ch 10: Files & Exceptions | File I/O | Files and data processing: JSON, CSV, PostgreSQL intro | Ch 16 |
| Ch 11: Testing | pytest basics | pytest as specification language (foundational) | Ch 3, 9 |
| Chs 12-14: Projects | Alien game, data viz, web | CLI tools, async services, AI-powered capstone | Ch 19-23 |

### From Learning Python (Lutz) — OOP Chapters

| Lutz Chapter | Traditional Coverage | Our Framing | Our Chapter |
|---|---|---|---|
| Ch 26: OOP Big Picture | Why classes, inheritance tree | Objects in the AI era: why structure matters for AI-generated code | Ch 12 |
| Ch 27: Class Coding Basics | `class`, `__init__`, `self`, instances | Classes and instances: building typed objects | Ch 12 |
| Ch 28: A More Realistic Example | Step-by-step class hierarchy | Building a real system: from dataclass to full class | Ch 13 |
| Ch 29: Class Coding Details | Inheritance, abstract classes, namespaces | Inheritance and composition: is-a vs has-a design decisions | Ch 13 |
| Ch 30: Operator Overloading | `__iter__`, `__next__`, `__getattr__`, `__repr__` | Special methods: how Python objects really work | Ch 14 |
| Ch 31: Designing with Classes | Composition, delegation, MRO, multiple inheritance | OOP design: composition-first, inheritance-when-justified | Ch 13 |
| Ch 32: Class Odds and Ends | Static/class methods, decorators, metaclasses intro | Decorators and class patterns: real-world Python | Ch 15 |
| Ch 33-36: Exceptions | Exception classes, hierarchies, context managers | Error handling: exception design for typed systems | Ch 11 |
| Ch 38: Managed Attributes | Properties, descriptors, `__getattr__` | Managed attributes: controlling access patterns | Ch 15 |
| Ch 39: Decorators | Function and class decorators, arguments, nesting | Decorators deep dive: from `@pytest.fixture` to custom decorators | Ch 15 |
| Ch 40: Metaclasses | Metaclass protocol, `type`, class creation | Advanced: metaclasses (reference, not core) | Ch 15 (appendix) |

---

## 6. The Technology Stack

### Non-Negotiable Tools (Every Chapter)

| Layer | Tool | Purpose |
|---|---|---|
| **Package Manager** | uv | Fast, reproducible environment management |
| **Static Types** | Pyright (strict mode) | Catch type errors at edit time |
| **Runtime Validation** | Pydantic v2 | Validate data at boundaries |
| **Linting** | Ruff | Style enforcement and error detection |
| **Formatting** | Ruff formatter | Consistent code style |
| **Testing** | pytest | Behavioral verification |
| **Version Control** | Git | Every change is a diff |

### The Pedagogical Rule

> **Never show untyped Python.**
>
> Students must believe Python requires types because in this curriculum, it does.

**Correct:**
```python
def calculate_total(items: list[Item], tax_rate: float = 0.0) -> int:
    """Calculate total price in cents, including tax."""
    subtotal = sum(item.quantity * item.price_cents for item in items)
    return int(subtotal * (1 + tax_rate))
```

**Never show:**
```python
def calculate_total(items, tax_rate=0.0):  # No types = not allowed
    ...
```

---

## 7. Chapter Plan (23 Chapters, 7 Phases)

---

### Phase 1: The Workbench (Read + Verify)

> Student role: **Reader** — "I can understand what AI generates"

#### Chapter 1: The Development Environment

**Goal**: Student has a professional Python workbench installed and working.

- Why the toolchain matters before a single line of code
- Installing uv (package manager for the AI era)
- Project initialization: `uv init my-project`
- The `pyproject.toml` as project identity
- Installing the discipline stack: pyright, ruff, pytest
- First run: `uv run ruff check .` → clean output
- Git init: every project is version-controlled from minute one

**Student does**: Configures `pyproject.toml`, runs tools, reads output
**AI role**: Generates project scaffolding; student reads and understands the structure

---

#### Chapter 2: Reading Python

**Goal**: Student can read typed Python, predict behavior, and spot errors.

- What is typed Python? (types as documentation for humans AND machines)
- Primitive types: `str`, `int`, `float`, `bool`
- Variables as labeled containers with type annotations
- Reading expressions: `total: int = price * quantity`
- Reading function signatures: `def greet(name: str) -> str:`
- Predicting output: "What will this print?" exercises
- Spotting type errors: "This function returns `str` but we need `int`"
- How AI generates Python (demystifying the process)
- Python's dynamic typing vs our typed discipline (Lutz Ch 6 reframed)

**Student does**: Predicts output, annotates code, traces execution
**AI role**: Generates typed Python samples; student reads, predicts, and explains

---

#### Chapter 3: Your First TDG Cycle

**Goal**: Student experiences the complete Test-Driven Generation loop.

- What is TDG (Test-Driven Generation)?
- The loop: Specify → Type → Test → AI Generates → Verify
- Writing your first test (5 lines that define a requirement)
- Prompting AI: "Implement the function that passes this test"
- Running `uv run pytest` and seeing green
- Running `uv run pyright` and seeing clean
- The first taste: 5 lines of student code → 20 lines of working implementation
- Why this changes everything

**Student does**: Specifies behavior via one test function (5-10 lines), prompts AI, verifies output
**AI role**: Generates implementation (~20 lines) from student's test specification

---

### Phase 2: Types as the Language of Intent (Specify)

> Student role: **Specifier** — "I can tell AI precisely what to build"

#### Chapter 4: Primitive Types and Expressions

**Goal**: Student understands Python's type system as a specification vocabulary.

**Covers Lutz**: Ch 4 (core objects), Ch 5 (numbers), Ch 7 (strings) — reframed as types

- `str` — text, string methods, f-string formatting
- `int` and `float` — numbers, arithmetic operators, precision
- `bool` — truth values, comparisons, logical operators
- Type annotations as contracts: `age: int = 25`
- Operators and expressions (through reading and prediction)
- Type conversions: `int()`, `str()`, `float()`
- Type narrowing: what Pyright catches for you
- Common type errors and how to fix them

**Student does**: Writes type annotations as specifications, reads AI-generated programs using those types
**AI role**: Generates programs using student-defined types; student verifies type correctness

---

#### Chapter 5: Collections — Lists, Dicts, Tuples, Sets

**Goal**: Student can specify structured data using typed collections.

**Covers Lutz**: Ch 8 (lists/dicts), Ch 9 (tuples/files), Ch 4 sets — reframed as typed containers

- `list[str]` — ordered sequences of typed items
- `dict[str, int]` — key-value mappings with typed keys and values
- `tuple[str, int, bool]` — fixed-size typed groups
- `set[str]` — unique collections
- Indexing, slicing, and access patterns (through reading)
- Mutability: which collections can change, which are frozen
- When to use which collection (decision guide)
- Nested collections: `list[dict[str, int]]`
- Type safety: why `list[Any]` is banned

**Student does**: Defines collection types as specifications, predicts behavior of AI-generated collection code
**AI role**: Generates collection processing code; student verifies type safety and correctness

---

#### Chapter 6: Data Models — Dataclasses and Pydantic

**Goal**: Student can model any domain with typed data structures.

**Bridge to OOP**: This chapter introduces the *data side* of objects. Full OOP (behavior, inheritance, design) comes in Phase 4.

- Why raw dicts are dangerous (`dict[str, Any]` hides bugs)
- `@dataclass` — Python's typed data container
- Fields, defaults, and frozen dataclasses
- `@dataclass(frozen=True)` — immutable objects
- Pydantic `BaseModel` — validation at external boundaries
- When to use dataclass vs Pydantic (internal vs external data)
- Modeling a real domain: Order, Customer, Product
- Nested models and relationships
- Preview: dataclasses are simplified classes (full classes come in Phase 4)
- TDG exercise: define models, write tests, AI implements logic

**Student does**: Defines dataclass/Pydantic models (the spec) + writes tests → prompts AI to implement logic → verifies
**AI role**: Generates business logic from student's typed models and tests

---

#### Chapter 7: Functions as Contracts

**Goal**: Student can define function signatures that serve as specifications.

**Covers Lutz**: Ch 16-19 (functions) — reframed as contracts

- A function signature IS a contract: inputs → output
- Type annotations on parameters and return values
- Default values and optional parameters
- `*args` and `**kwargs` (typed): when and why
- Pure functions: same input → same output (predictable, testable)
- Function composition: small functions that combine
- Scope: local, enclosing, global, built-in (LEGB rule)
- First-class functions: functions as values (passing functions to functions)
- The Unix philosophy applied to functions: do one thing well
- Docstrings as specification (what, not how)
- TDG exercise: write signatures + tests, AI implements body

**Student does**: Defines function signatures + docstrings (the contract) + writes tests → prompts AI to implement → verifies
**AI role**: Generates function bodies from student's signatures and test specifications

---

### Phase 3: Tests as Specification (Verify)

> Student role: **Verifier** — "I can prove code is correct"

#### Chapter 8: Control Flow — Through the Lens of Testing

**Goal**: Student understands if/for/while by reading, predicting, and testing them.

**Covers Lutz**: Ch 10-13 (statements, if, while, for) — learned through testing, not memorization

- `if/elif/else` — branch logic (reading and prediction exercises)
- `match/case` — structural pattern matching (Python 3.10+)
- `for` loops — iteration over collections
- `while` loops — conditional repetition
- `break`, `continue`, `pass` — flow control
- The `for/else` and `while/else` patterns
- Truthiness in Python: what evaluates to `True` or `False`
- Testing branches: how to ensure every path is covered
- Testing loops: boundary conditions, empty inputs, single items
- The connection: control flow understanding enables better tests

**Student does**: Writes tests that specify branch/loop behavior → prompts AI to implement → verifies all paths covered
**AI role**: Generates control flow implementations; student verifies branch coverage

---

#### Chapter 9: pytest Deep Dive

**Goal**: Student can write comprehensive test suites that serve as specifications.

- Test structure: Arrange → Act → Assert
- `assert` statements and comparison operators
- Fixtures: reusable test setup with `@pytest.fixture`
- Parametrize: testing many cases from one function
- Testing exceptions: `pytest.raises`
- Test organization: files, classes, naming conventions
- Coverage: measuring what's tested with `pytest-cov`
- Markers: `@pytest.mark.skip`, `@pytest.mark.slow`
- Testing objects: verifying class behavior through tests
- Writing tests as specifications: the test IS the requirement document

**Student does**: Writes complete test suites as specifications (20-40 lines) → AI implements against those specs → student verifies
**AI role**: Generates implementations that must pass student-written test suites

---

#### Chapter 10: TDG Mastery — The Complete Cycle

**Goal**: Student can run the full spec → type → test → generate → verify cycle independently.

- The complete TDG workflow, step by step
- Starting from a problem statement (Markdown spec)
- Defining types (dataclasses/Pydantic)
- Writing comprehensive tests (happy path + edge cases)
- Prompting AI effectively (focused context, not entire codebase)
- Reviewing AI output (what to check, what to question)
- Iterating: when tests fail, tighten the spec
- Running the full verification stack: `ruff` → `pyright` → `pytest`
- Capstone exercise: complete TDG cycle for a real problem

**Student does**: Full TDG cycle — specs + types + tests → prompts AI → reviews output → iterates until green
**AI role**: Generates complete implementations; student drives the specify-verify loop

---

#### Chapter 11: Error Handling and Exceptions

**Goal**: Student can anticipate failures and design exception hierarchies.

**Covers Lutz**: Ch 33-36 (exceptions) — reframed for typed systems

- Exceptions: `try/except/else/finally` (full syntax)
- Built-in exception hierarchy: `BaseException` → `Exception` → specific types
- Built-in exceptions: `ValueError`, `TypeError`, `KeyError`, `FileNotFoundError`, etc.
- Raising exceptions: `raise ValueError("quantity must be positive")`
- Exception chaining: `raise NewError() from original_error`
- Custom exception classes (inheriting from `Exception`)
- Exception hierarchies for domains: why `class OrderError(Exception)` matters
- Context managers: `with` statement and `__enter__`/`__exit__`
- Writing custom context managers with `contextlib`
- Pydantic validators: catching bad data at the boundary
- Testing error paths: `pytest.raises(ValueError, match="...")`
- Edge case thinking: empty inputs, None, negative numbers, huge values
- Defensive vs offensive programming (trust types internally)

**Student does**: Designs exception hierarchies + writes error-path tests → prompts AI to implement handling → verifies edge cases
**AI role**: Generates error handling patterns; student specifies what errors should occur and verifies

---

### Phase 4: OOP — The Python Object Model (Model)

> Student role: **Modeler** — "I can design objects that model real domains"

**Why OOP gets its own phase**: Python is fundamentally object-oriented — everything is an object. Understanding the object model unlocks the language. But we teach it AFTER testing mastery, so students can verify every OOP concept they learn.

**Our OOP philosophy**: Composition first, inheritance when justified. Protocols over abstract base classes. Dataclasses for data, classes for behavior. Test every design decision.

#### Chapter 12: Classes and Instances

**Goal**: Student understands how classes create objects with typed state and behavior.

**Covers Lutz**: Ch 26 (OOP big picture), Ch 27 (class basics)

- Why classes? From dataclasses to full classes (the progression)
- The `class` statement: creating a new type
- `__init__`: initializing instance state with types
- `self`: the instance reference
- Instance attributes vs class attributes
- Methods: functions attached to objects
- Type-annotated classes:
  ```python
  class BankAccount:
      def __init__(self, owner: str, balance: int = 0) -> None:
          self.owner = owner
          self.balance = balance

      def deposit(self, amount: int) -> None:
          if amount <= 0:
              raise ValueError("Amount must be positive")
          self.balance += amount
  ```
- Classes vs dataclasses: when to use which
  - Dataclass: mostly data, little behavior
  - Class: significant behavior, complex state management
- Instance creation and the object lifecycle
- Testing classes: creating instances, calling methods, asserting state
- TDG exercise: define a class interface (types + tests), AI implements

**Student does**: Defines class interfaces (types + method signatures) + writes behavioral tests → prompts AI to implement → verifies
**AI role**: Generates class implementations from student's typed interfaces and test specifications

---

#### Chapter 13: Inheritance, Composition, and Design

**Goal**: Student can choose the right relationship between objects.

**Covers Lutz**: Ch 28 (realistic example), Ch 29 (coding details), Ch 31 (designing with classes)

- **Inheritance: "is-a" relationships**
  - Subclassing: `class SavingsAccount(BankAccount):`
  - Method overriding: specializing behavior
  - `super()`: calling parent methods
  - When inheritance makes sense (shared interface, true specialization)
  - The inheritance trap: deep hierarchies are fragile
- **Composition: "has-a" relationships**
  - Embedding objects in objects: `class Car` has `Engine`
  - Delegation: forwarding method calls
  - Why composition is usually preferred over inheritance
- **The Design Decision Framework**:
  ```
  Q: Does B share A's interface AND is truly a specialized version?
     YES → Inheritance (is-a)
     NO  → Composition (has-a)

  When in doubt → Composition
  ```
- Abstract base classes: `ABC` and `@abstractmethod`
- Multiple inheritance and MRO (method resolution order) — understand, use sparingly
- Class namespaces: how Python looks up attributes (instance → class → parent chain)
- Real-world example: building a system with inheritance AND composition
- Testing OOP designs: testing interfaces, not implementations

**Student does**: Designs class hierarchies (inheritance vs composition decisions) + writes interface tests → prompts AI to implement → verifies design
**AI role**: Generates implementations and refactoring suggestions; student makes design decisions and verifies

---

#### Chapter 14: Special Methods and the Python Object Model

**Goal**: Student understands how Python objects really work under the hood.

**Covers Lutz**: Ch 30 (operator overloading), Ch 9 partial (object model)

- **The Python object model**: everything is an object
- **String representation**:
  - `__repr__`: unambiguous representation (for developers)
  - `__str__`: human-friendly representation (for users)
  - `__format__`: custom formatting with f-strings
- **Comparison operators**:
  - `__eq__`, `__lt__`, `__le__`, `__gt__`, `__ge__`
  - `@functools.total_ordering`: implement `__eq__` and `__lt__`, get the rest
- **Arithmetic operators** (when modeling domain types):
  - `__add__`, `__sub__`, `__mul__`
  - `__radd__`: reverse operations
- **Container protocols**:
  - `__len__`: making objects work with `len()`
  - `__getitem__`: making objects indexable
  - `__contains__`: making objects work with `in`
- **Iteration protocol** (critical):
  - `__iter__` and `__next__`: making objects iterable
  - Building custom iterators
  - Why this matters: `for item in my_object:` just works
- **Boolean protocol**: `__bool__` — truthiness of custom objects
- **Hashability**: `__hash__` — making objects usable as dict keys and in sets
- **Context manager protocol**: `__enter__` and `__exit__` revisited (from Ch 11)
- Testing special methods: verify operator behavior through tests
- The principle: special methods make objects feel "Pythonic"

**Student does**: Specifies special method behavior via tests (e.g., `__eq__`, `__iter__`) → prompts AI to implement → verifies Pythonic behavior
**AI role**: Generates special method implementations; student specifies expected operator behavior via tests

---

#### Chapter 15: Decorators, Properties, and Advanced Patterns

**Goal**: Student can use and understand advanced OOP patterns in real Python code.

**Covers Lutz**: Ch 32 (class odds and ends), Ch 38 (managed attributes), Ch 39 (decorators), Ch 40 (metaclasses preview)

- **Decorators — functions that modify functions**:
  - What decorators do: `@decorator` is just `func = decorator(func)`
  - Built-in decorators: `@staticmethod`, `@classmethod`, `@property`
  - Real-world decorators: `@pytest.fixture`, `@app.get()` (FastAPI), `@dataclass`
  - Writing custom function decorators (with types):
    ```python
    from typing import Callable, TypeVar
    from functools import wraps

    F = TypeVar("F", bound=Callable[..., object])

    def log_calls(func: F) -> F:
        @wraps(func)
        def wrapper(*args: object, **kwargs: object) -> object:
            print(f"Calling {func.__name__}")
            return func(*args, **kwargs)
        return wrapper  # type: ignore[return-value]
    ```
  - Decorator arguments: `@retry(max_attempts=3)`
  - Class decorators: decorating entire classes
  - Decorator stacking: order matters
- **Properties — managed attributes**:
  - `@property`: controlled attribute access
  - Getters, setters, deleters
  - Why properties matter: encapsulation without changing the interface
  - Computed properties: values derived from state
- **Static methods vs class methods**:
  - `@staticmethod`: utility functions in the class namespace
  - `@classmethod`: alternative constructors (`cls` parameter)
  - Factory methods: `User.from_dict(data)`
- **Protocols revisited** (from typing module):
  - `Protocol`: structural subtyping (duck typing with type safety)
  - Protocols vs ABC: when to use which
  - Dependency injection with Protocols
    ```python
    from typing import Protocol

    class Repository(Protocol):
        def save(self, entity: Entity) -> None: ...
        def find_by_id(self, id: str) -> Entity | None: ...
    ```
- **Metaclasses** (reference only, not core):
  - What they are: classes that create classes
  - `type` as the default metaclass
  - When you'd encounter them: ORMs, frameworks
  - The rule: if you need metaclasses, you're building a framework
- Testing advanced patterns: decorators, properties, protocols
- TDG exercise: build a system using decorators, properties, and protocols

**Student does**: Designs protocol interfaces + writes decorator specs + tests → prompts AI to implement patterns → verifies
**AI role**: Generates decorator implementations, protocol-based designs; student architects the patterns and verifies

---

### Phase 5: Real-World Python (Architect + TDG)

> Student role: **Practitioner** — "I can spec real-world features via TDG"

#### Chapter 16: Files, Data Processing, and PostgreSQL Introduction

**Goal**: Student can read, process, and persist real-world data — from flat files to relational databases.

**Covers Lutz**: Ch 9 partial (files), Ch 37 partial (unicode)

- Reading and writing text files (with `pathlib.Path`)
- JSON: `json.loads()`, `json.dumps()`, and typed parsing
- CSV processing with the `csv` module
- Binary files and encoding basics (UTF-8)
- Context managers for files: `with open(...) as f:`
- Processing pipelines: read → transform → write
- `pickle` and `shelve` for object serialization (awareness, not preference)
- Error handling for I/O operations
- **When files aren't enough → PostgreSQL introduction**:
  - The problem: JSON grows to 2,000 records with relationships (reference Axiom VI)
  - Why a real database? Files don't support concurrent access, queries, or relationships
  - Setting up PostgreSQL (local install or cloud-hosted like Neon)
  - Connecting with `psycopg` (the modern PostgreSQL adapter)
  - Creating tables, inserting data, querying with SELECT
  - Parameterized queries (SQL injection prevention)
  - Context managers for database connections
  - When to use JSON files vs a database (complexity threshold)
  - *Full SQL coverage (JOINs, migrations, ORMs, advanced PostgreSQL) comes in later parts of the book*
- TDG exercise: build a data processing tool that starts with JSON and graduates to PostgreSQL

**Student does**: Specifies file/data processing pipelines (types + tests) → prompts AI to implement → verifies I/O and query correctness
**AI role**: Generates file processing and PostgreSQL code; student designs the pipeline and verifies data integrity

---

#### Chapter 17: Modules and Packages

**Goal**: Student can organize code into reusable, importable modules.

**Covers Lutz**: Ch 22-25 (modules and packages)

- Why modules? Organizing code beyond single files
- The `import` statement: `import module`, `from module import name`
- Creating your own modules: any `.py` file is a module
- Packages: directories with `__init__.py`
- Relative vs absolute imports
- The `__name__ == "__main__"` pattern
- Module search path: how Python finds modules
- Namespace packages (awareness)
- Project structure conventions:
  ```
  src/
    my_project/
      __init__.py
      models.py
      services.py
      repository.py
  tests/
    test_models.py
    test_services.py
  ```
- Circular imports: why they happen, how to fix them
- TDG exercise: refactor a single-file project into a proper package

**Student does**: Designs module/package architecture → prompts AI to generate structure → verifies imports and organization
**AI role**: Generates project scaffolding and module organization; student architects the structure

---

#### Chapter 18: Comprehensions, Generators, and Functional Patterns

**Goal**: Student masters Python's expressive power for data transformation.

**Covers Lutz**: Ch 14 (iterations/comprehensions), Ch 20 (comprehensions/generators)

- List comprehensions: `[x * 2 for x in items if x > 0]`
- Dict comprehensions: `{k: v for k, v in pairs}`
- Set comprehensions: `{x for x in items if x > 0}`
- Generator expressions for memory efficiency: `(x for x in big_list)`
- Generator functions: `yield` and lazy evaluation
- The iteration protocol revisited: `__iter__`, `__next__`, `StopIteration`
- `map()`, `filter()`, `sorted()` with key functions
- Lambda functions (sparingly, only when clear)
- `functools`: `reduce`, `partial`, `lru_cache`
- `itertools`: `chain`, `groupby`, `islice` (the useful ones)
- Chaining transformations: readable data pipelines
- When comprehensions help vs when they hurt readability
- Performance: generators vs lists for large datasets

**Student does**: Specifies transformation pipelines (types + tests) → prompts AI to implement → compares AI versions, verifies correctness
**AI role**: Generates comprehensions, generators, and pipelines; student specifies expected transformations and reviews efficiency

---

### Phase 6: Production Systems (Ship)

> Student role: **Builder** — "I can ship production software"

#### Chapter 19: Unix-Style CLI Tools

**Goal**: Student can build professional command-line applications.

- The Unix philosophy applied to Python programs
- `stdin`/`stdout`/`stderr` — the three streams
- Argument parsing with `argparse` or `typer`
- Exit codes: 0 = success, non-zero = failure
- Composable tools: pipe Python programs together
- Environment variables and configuration
- Building a real CLI tool end-to-end with TDG
- Packaging and distributing CLI tools

**Student does**: Designs CLI interface (commands, flags, types) + writes integration tests → prompts AI to implement → verifies end-to-end
**AI role**: Generates CLI boilerplate, argument parsing, command handlers; student architects the user experience

---

#### Chapter 20: Concurrency, async/await, and FastAPI Introduction

**Goal**: Student understands concurrent execution, can write async Python, and sees how it powers web services.

**Covers Lutz**: Ch 31 partial (asyncio concepts), extends beyond Lutz into modern async patterns

- **Why concurrency?** The real world doesn't wait — APIs, databases, file I/O all block
- **Sync vs async**: what "blocking" means and why it matters
- **Threading basics**:
  - `threading.Thread`: running tasks in parallel
  - The GIL (Global Interpreter Lock): what it means for Python threads
  - When threads help (I/O-bound) vs when they don't (CPU-bound)
  - `concurrent.futures.ThreadPoolExecutor`: managed thread pools
- **async/await** (the main event):
  - The event loop: one thread, many tasks
  - `async def` and `await`: writing coroutines
  - `asyncio.run()`: starting the event loop
  - `asyncio.gather()`: running multiple tasks concurrently
  - Async context managers: `async with`
  - Async iteration: `async for`
  - Typed async functions:
    ```python
    async def fetch_user(user_id: int) -> User:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"/users/{user_id}")
            return User.model_validate(response.json())
    ```
- **When to use what**:
  - I/O-bound (API calls, DB queries, file reads) → `async/await`
  - CPU-bound (data processing, calculations) → `multiprocessing` (awareness)
  - Simple parallelism → `ThreadPoolExecutor`
- **Testing async code**: `pytest-asyncio`, `@pytest.mark.asyncio`
- **Putting async to work → FastAPI introduction**:
  - Why FastAPI: types + async + testing unified in one framework
  - One route with Pydantic request/response models
  - `async def` endpoints (the reason you learned async)
  - Testing with `TestClient` — one integration test
  - *Full API development (middleware, dependency injection, database integration, deployment) comes in later parts of the book*
- **Why this matters for Part 5**: FastAPI is async, agent SDKs are async, MCP is async

**Student does**: Specifies async interfaces (typed coroutines + tests) → prompts AI to implement concurrent logic → builds a minimal FastAPI endpoint → verifies async behavior
**AI role**: Generates async implementations, event loop patterns, FastAPI route; student designs concurrency architecture and verifies

---

#### Chapter 21: CI/CD, Git Workflows, and Observability

**Goal**: Student can automate verification and monitor systems.

- Git as persistent memory (branching, committing, reverting)
- GitHub Actions: automated CI pipeline
- The verification pyramid: format → lint → type check → test → security
- Structured logging (JSON format) using classes from Phase 4
- Health check endpoints
- Error tracking basics
- The complete professional workflow: branch → code → test → CI → review → merge

**Student does**: Designs CI pipeline stages + observability requirements → prompts AI to generate configs → verifies pipeline is green
**AI role**: Generates CI YAML, logging setup, monitoring configs; student architects the verification pipeline

---

### Phase 7: Capstone (Prove)

> Student role: **Architect** — "I can design and build complete systems"

#### Chapters 22-23: AI-Powered Application (Capstone)

**Goal**: Student builds a complete, production-grade application using everything learned.

**Project**: **SmartNotes** — the Personal AI Knowledge Base the student has been building since Phase 1, now fully integrated.

| Component | Technologies | Chapters Applied |
|---|---|---|
| Problem Specification | Markdown, requirements | Ch 2, 3, 10 |
| Data Models | Dataclasses, Pydantic, Classes | Ch 6, 12-13 |
| Object Design | Inheritance, composition, protocols | Ch 13-15 |
| Data Layer | PostgreSQL, repository pattern | Ch 16 |
| Business Logic | Typed functions, composition | Ch 7, 18 |
| Concurrency | async/await for API + SDK calls | Ch 20 |
| CLI Interface | `smartnotes` CLI tool | Ch 19 |
| API Service | FastAPI (async) | Ch 20 |
| AI Integration | Anthropic SDK (async) — semantic search, summaries | Ch 10, 20 |
| Test Suite | pytest (80%+ coverage) | Ch 9, 10 |
| CI Pipeline | GitHub Actions | Ch 21 |
| Observability | Structured logging | Ch 21 |

**Deliverables**:
- Specification documents (Markdown)
- Type definitions (dataclasses + Pydantic + classes)
- Object model diagram (class relationships)
- Test suites (passing, 80%+ coverage)
- Implementation (AI-generated, student-reviewed)
- CI pipeline (green)
- Deployed SmartNotes application with CLI + API + AI features

---

## 8. The Student Journey Summary

```
Ch 1-3:    READER       → "I can read and understand AI-generated typed Python"
Ch 4-7:    SPECIFIER    → "I can tell AI precisely what to build using types"
Ch 8-11:   VERIFIER     → "I can prove code is correct with tests"
Ch 12-15:  MODELER      → "I can design object models for AI to implement"
Ch 16-18:  PRACTITIONER → "I can spec real-world features via TDG"
Ch 19-21:  BUILDER      → "I can spec + ship production software via TDG"
Ch 22-23:  ARCHITECT    → "I can architect and deliver complete systems via TDG"
```

---

## 9. OOP Integration Strategy

### Why OOP Comes After Testing (Phase 4, Not Phase 2)

Traditional books teach OOP early because it's "fundamental." We delay it because:

1. **Students can't verify OOP designs without testing skills** — testing classes is harder than testing functions
2. **Dataclasses provide 80% of the value** — students model domains effectively in Phase 2 without full OOP
3. **OOP design decisions require judgment** — inheritance vs composition choices need experience
4. **AI generates OOP code constantly** — by Phase 4, students have read enough AI output to recognize patterns

### The OOP Progression

```
Ch 6  (Phase 2): Dataclasses + Pydantic     → Data modeling (simple objects)
Ch 11 (Phase 3): Exception hierarchies       → First taste of class inheritance
Ch 12 (Phase 4): Classes and instances       → Full class syntax, behavior
Ch 13 (Phase 4): Inheritance & composition   → Design relationships
Ch 14 (Phase 4): Special methods             → Python object model depth
Ch 15 (Phase 4): Decorators & patterns       → Advanced OOP in practice
Ch 16 (Phase 5): Repository pattern          → OOP applied to data access (PostgreSQL intro)
Ch 20 (Phase 6): FastAPI dependency injection → OOP applied to async services (FastAPI intro)
```

### What We Keep from Lutz (Deep Python Knowledge)

| Lutz Topic | Our Treatment | Why |
|---|---|---|
| Classes and instances | Full coverage (Ch 12) | Core to Python |
| `__init__`, `self` | Full coverage (Ch 12) | Can't use classes without it |
| Inheritance | Full coverage with design guidance (Ch 13) | Important but needs guard rails |
| Composition | Emphasized as preferred default (Ch 13) | Better design in AI era |
| Operator overloading | Full coverage (Ch 14) | Makes objects Pythonic |
| Iteration protocol | Full coverage (Ch 14) | Essential for Python fluency |
| Decorators | Full coverage (Ch 15) | Used everywhere in modern Python |
| Properties | Full coverage (Ch 15) | Clean attribute management |
| Protocols | Full coverage (Ch 15) | Modern alternative to ABC |
| MRO | Awareness (Ch 13) | Understand, rarely need to design with |
| Metaclasses | Reference only (Ch 15) | Framework-level, not application-level |
| Descriptors | Awareness (Ch 15) | Properties cover 95% of use cases |

### What We Reframe from Lutz

| Lutz Approach | Our Approach | Why |
|---|---|---|
| OOP as organizing principle | OOP as domain modeling | AI era needs precise models |
| Inheritance-first design | Composition-first design | Less fragile, more testable |
| Dynamic typing celebrated | Static typing enforced | Pyright strict, always |
| Untyped examples | Every example fully typed | No exceptions |
| Theory then practice | Test then understand | Verification-first |
| Classes before testing | Testing before classes | Can't verify what you can't test |

---

## 10. Design Principles for All Chapters

### Every Chapter Must Have

1. **Typed Python only** — no untyped code ever shown
2. **Reading before writing** — students encounter features in AI output before writing them
3. **Tests as verification** — every concept has a testable exercise
4. **Real-world context** — features introduced because a real task demands them, never in isolation
5. **TDG exercises** — at least one spec → test → generate → verify cycle per chapter
6. **Dual-track callouts** — "If you're new" and "If you've coded before" notes
7. **Syntax Card** — half-page reference at the end of every chapter (see Section 14)

### Every Code Example Must

1. Have full type annotations
2. Be runnable (no pseudo-code)
3. Have an associated test
4. Follow the project structure conventions
5. Use the discipline stack (ruff, pyright, pytest compatible)

---

## 11. Reference Materials

| Resource | Purpose |
|---|---|
| *Python Crash Course* (Matthes, 2023) | Reference for traditional Python feature coverage (beginner-friendly) |
| *Learning Python* (Lutz, 2025) | Reference for deep OOP, object model, advanced patterns (1,270 pages) |
| *The Lindy-AI Software Manifesto* v2.0 | Philosophical foundation and axioms |
| Chapter 14: Ten Axioms of Agentic Development | Bridge chapter connecting principles to practice |
| Python 3.12+ documentation | Language reference |
| Pyright documentation | Type checking rules |
| pytest documentation | Testing patterns |

---

## 12. Complete Lutz Coverage Map

For tracking that all essential Learning Python content is covered:

| Lutz Part | Lutz Chapters | Our Coverage | Notes |
|---|---|---|---|
| **I: Getting Started** | Ch 1-3 | Ch 1-2 | Reframed: workbench + reading |
| **II: Objects & Operations** | Ch 4-9 | Ch 4-5 | Reframed: typed collections |
| **III: Statements & Syntax** | Ch 10-15 | Ch 8 | Reframed: through testing |
| **IV: Functions & Generators** | Ch 16-21 | Ch 7, 18 | Reframed: contracts + generators |
| **V: Modules & Packages** | Ch 22-25 | Ch 17 | Reframed: project organization |
| **VI: Classes & OOP** | Ch 26-32 | **Ch 12-15** | Full coverage, reframed |
| **VII: Exceptions** | Ch 33-36 | Ch 11 | Reframed: typed error handling |
| **VIII: Advanced** | Ch 37-40 | Ch 15, 16 | Selective: decorators yes, metaclasses reference |

---

## 13. Exercise Strategy

### The 5 Exercise Types

Every chapter draws from these 5 exercise types in varying proportions:

| Type | Name | What Student Gets | What Student Does | Skill Trained |
|---|---|---|---|---|
| 1 | **Read & Predict** | AI-generated code | Predict output, trace execution, explain in plain English | Reading comprehension |
| 2 | **Spot the Bug** | AI-generated code with intentional errors | Find type errors, logic bugs, edge case failures | Verification, code review |
| 3 | **Write the Test** | Problem description + function/class signature | Write pytest tests that specify correct behavior | Specification, testing |
| 4 | **TDG Cycle** | Problem statement in plain English | Define types → write tests → prompt AI → verify → iterate | Full AI-era workflow |
| 5 | **Build It** | A spec with tests already written (provided) | Specify approach → prompt AI to implement → review, debug, and iterate until all tests pass | Full TDG ownership, end-to-end delivery |

### Exercise Mix by Phase

The proportion of each exercise type shifts across phases, tracking the writing gradient:

```
                           Type 1      Type 2      Type 3      Type 4      Type 5
                           Read &      Spot the    Write the   TDG         Build It
                           Predict     Bug         Test        Cycle       (Full TDG)
Phase 1 (Reader)         : ████████    ██          ░           ░           ░
Phase 2 (Specifier)      : ████        ████        ████        ██          ░
Phase 3 (Verifier)       : ██          ██          ████████    ████        ██
Phase 4 (Modeler)        : ██          ██          ████        ████        ████
Phase 5 (Practitioner)   : █           █           ██          ████        ██████
Phase 6 (Builder)        : █           █           ██          ██████      ████
Phase 7 (Architect)      : Full capstone project combining all types
```

### Per-Chapter Exercise Structure

Every chapter follows this consistent structure:

```
INLINE EXERCISES (inside lesson content, between sections)
├── Read & Predict (2-3 per chapter)
│   Quick 1-2 minute exercises embedded in the text
│   Format: "Before reading on, predict what this outputs..."
│   Purpose: Active reading, prevent passive consumption
│
└── Spot the Bug (1-2 per chapter)
    AI-generated code with planted errors
    Format: "This AI wrote this code. What's wrong?"
    Purpose: Train critical reading of AI output

END-OF-CHAPTER EXERCISES (after lesson content)
├── Write the Test (2-3 exercises, graded difficulty)
│   Format: Given a specification → write pytest tests
│   Levels: Starter → Intermediate → Challenge
│   Purpose: Specification practice
│
├── TDG Challenge (1 per chapter — CORE exercise)
│   Full cycle: spec → types → tests → prompt AI → verify → iterate
│   This is the signature exercise of the course
│   Purpose: Practice the complete AI-era workflow
│
└── Build It (1 per chapter, starting Phase 3)
    Format: Tests are provided → student drives full TDG cycle to make them pass
    Purpose: Prove you can own the entire specify-prompt-verify loop end-to-end
    Rule: Student must understand every line AI generates — if you can't explain it, iterate
```

### Exercise Quantity Per Chapter

| Chapter Phase | Inline (Read & Predict + Spot Bug) | Write the Test | TDG Challenge | Build It | Total |
|---|---|---|---|---|---|
| Phase 1 (Ch 1-3) | 5 | 1 | 1 | 0 | ~7 |
| Phase 2 (Ch 4-7) | 4 | 2-3 | 1 | 0 | ~8 |
| Phase 3 (Ch 8-11) | 3 | 3 | 1 | 1 | ~8 |
| Phase 4 (Ch 12-15) | 3 | 2 | 1 | 1-2 | ~8 |
| Phase 5 (Ch 16-18) | 2 | 2 | 1 | 2 | ~7 |
| Phase 6 (Ch 19-21) | 2 | 2 | 1-2 | 1 | ~7 |
| Phase 7 (Ch 22-23) | — | — | Full project | Full project | 1 large |

**Total across course**: ~170-180 exercises

### The "Build It" Rule

Starting Phase 3, every chapter includes at least one exercise where **the student owns the entire TDG cycle end-to-end**. Tests are provided. The student must drive the full loop: analyze what the tests require → specify the approach → prompt AI effectively → review every line of AI output → iterate until all tests pass.

**Why this matters**: This proves the student can **own delivery** — the real AI-era skill. It's not about typing code manually; it's about understanding what the tests demand, prompting AI precisely, and verifying that the output is correct. If the student can't explain every line AI generated, they iterate until they can.

**The progression**:
- Phase 3: Drive TDG for a small function (10-20 lines of AI output to review)
- Phase 4: Drive TDG for a class with methods (30-50 lines, design decisions matter)
- Phase 5: Drive TDG for a module with multiple components (50-100 lines, architecture matters)
- Phase 6: Drive TDG for a system component (100+ lines, orchestrating multiple AI prompts)

### The TDG Challenge Format

Every TDG Challenge follows this exact template:

```
## TDG Challenge: [Name]

### Problem Statement
[2-3 sentences describing what to build in plain English]

### Step 1: Specify (Markdown)
Write a brief specification describing the expected behavior.

### Step 2: Define Types
Create dataclasses/Pydantic models for the domain.

### Step 3: Write Tests
Write pytest tests that fully specify correct behavior.
Include: happy path, edge cases, error cases.

### Step 4: Generate
Prompt AI with your types and tests. Ask it to implement.

### Step 5: Verify
Run: uv run ruff check . && uv run pyright && uv run pytest
If anything fails → iterate (tighten spec, fix tests, re-prompt).

### Step 6: Review
Read the AI-generated code. Can you explain every line?
If not → that's your next learning target.
```

### How Exercises Connect Across Chapters

Exercises build on each other. Later chapters reference and extend earlier work:

```
Ch 6:  Define a Note dataclass              → TDG: build note parser
Ch 9:  Write comprehensive tests for Note   → TDG: test edge cases
Ch 12: Convert Note to a full class         → BUILD IT (TDG): add behavior (tags, links)
Ch 13: Add inheritance (SourceNote, etc.)   → BUILD IT (TDG): design note hierarchy
Ch 14: Add __repr__, __eq__, __iter__       → BUILD IT (TDG): make notes Pythonic
Ch 16: Store Notes in PostgreSQL             → TDG: file processing + database persistence
Ch 20: Expose Notes via async FastAPI       → TDG: async service with API endpoint
Ch 22: Full SmartNotes Knowledge Base       → CAPSTONE (full TDG orchestration)
```

This creates a **running project thread** that students evolve across the course.

---

## 14. Syntax Card Strategy

### The Problem

Traditional books teach syntax through repetition. Our course teaches through reading and testing. But students still need a quick reference when they think: "What was the syntax for dict comprehension again?"

### The Solution: Per-Chapter Syntax Cards (Not an Appendix)

**No big appendix.** Instead, every chapter ends with a **half-page Syntax Card** — a compact, typed reference of every new syntax element introduced in that chapter.

### Why Per-Chapter Beats Appendix

| Appendix | Per-Chapter Syntax Card |
|---|---|
| Nobody reads appendices | Students naturally flip to the chapter they remember |
| Disconnected from context | Right where you learned it |
| Adds 30-40 pages of bulk | Half a page per chapter (~12 pages total) |
| Feels like "old way" manual | Feels like a useful cheat sheet |

### Placement in Chapter Structure

```
CHAPTER N: [Title]
├── Lesson content
├── Inline exercises (Read & Predict, Spot the Bug)
├── End-of-chapter exercises (Write Test, TDG Challenge, Build It)
│
└── 📋 SYNTAX CARD           ← Last section, always
    Half-page, no prose
    Every new syntax element from this chapter
    Format: typed code example + one-line comment
```

### Syntax Card Rules

1. **Only new syntax** — don't repeat what was introduced in earlier chapters
2. **Always typed** — every example has type annotations
3. **Code only** — no prose explanations, just `code + # comment`
4. **Runnable** — every snippet can be pasted and executed
5. **Half-page max** — if it's longer, the chapter introduced too much

### Example: Chapter 5 Syntax Card

```python
# Ch 5 Syntax Card: Collections

# List — ordered, mutable, typed
names: list[str] = ["Zia", "Ali", "Sara"]
names.append("Omar")              # Add to end
names[0]                          # Index access → "Zia"
names[1:3]                        # Slice → ["Ali", "Sara"]
len(names)                        # Length → 4
"Zia" in names                    # Membership → True

# Dict — key-value, mutable, typed
ages: dict[str, int] = {"Zia": 30, "Ali": 25}
ages["Zia"]                       # Key access → 30
ages.get("Unknown", 0)            # Safe access → 0
ages.keys()                       # All keys
ages.items()                      # Key-value pairs

# Tuple — ordered, immutable, typed
point: tuple[int, int] = (10, 20)
x, y = point                     # Unpacking

# Set — unique, unordered, typed
tags: set[str] = {"python", "ai"}
tags.add("typed")                 # Add element
tags | {"new"}                    # Union
```

### Example: Chapter 12 Syntax Card

```python
# Ch 12 Syntax Card: Classes and Instances

# Class definition with typed attributes
class BankAccount:
    def __init__(self, owner: str, balance: int = 0) -> None:
        self.owner = owner        # Instance attribute
        self.balance = balance

    def deposit(self, amount: int) -> None:  # Method
        self.balance += amount

# Instance creation
account = BankAccount("Zia", 1000)
account.deposit(500)              # Method call
account.balance                   # Attribute access → 1500

# Class attribute (shared across all instances)
class Counter:
    count: int = 0                # Class attribute
    def __init__(self) -> None:
        Counter.count += 1        # Modify class attribute
```

### The Combined PDF

All 23 Syntax Cards are automatically compiled into a single **"Python Quick Reference" downloadable PDF** (~13 pages). This is generated from the book content — no separate authoring needed.

Students get:
- **In the book**: Per-chapter cards right where they need them
- **As download**: One combined PDF they can print or keep on their phone

---

## 15. The SmartNotes Project — One Running Project Across All Phases

### Why One Project, Not Seven

Students don't build seven throwaway projects. They build **one real application** — **SmartNotes**, a Personal AI Knowledge Base — that grows with them across all 7 phases. Each phase adds a layer that exercises that phase's core skills.

**Why SmartNotes?**:
1. **Students USE it while learning** — they capture their own notes, code snippets, and learnings as they go through the course
2. **AI integration is natural** — semantic search, auto-tagging, and summarization are genuine AI features (not bolted on)
3. **It shows thinking to interviewers** — a portfolio project that demonstrates typed Python, testing, OOP design, async APIs, and AI integration
4. **Every phase has a real deliverable** — not "exercise 3.2" but "my knowledge base now has search"

### Phase-by-Phase SmartNotes Evolution

#### Phase 1: Read & Understand (Ch 1-3) — "SmartNotes v0.1: Explore"

**Student role**: Reader — understand what AI generates

**What students get**: A pre-built SmartNotes prototype (AI-generated, ~200 lines). Students DON'T build it yet. They:
- Read the code: understand `Note` dataclass, `add_note()`, `search_notes()`
- Predict behavior: "What does this function return for this input?"
- Trace execution: follow `uv run smartnotes add "My first note" --tags python`
- Verify with tests: run `uv run pytest` and read what each test checks

**Deliverable**: An annotated code walkthrough — student adds comments explaining every function

---

#### Phase 2: Specify & Model (Ch 4-7) — "SmartNotes v0.2: Type It"

**Student role**: Specifier — define the domain precisely

**What students build**:
- `Note` dataclass with typed fields: `title: str`, `body: str`, `tags: list[str]`, `created_at: datetime`
- `NoteCollection` with typed methods: `add()`, `search()`, `filter_by_tag()`
- Pydantic models for input validation: `NoteCreate`, `NoteUpdate`
- Type-safe configuration: `SmartNotesConfig` dataclass

**Key learning**: The types ARE the specification. Pyright enforces the contract before a single test is written.

**Deliverable**: Typed data model that passes `pyright --strict` — zero implementation yet, just structure

---

#### Phase 3: Test & Verify (Ch 8-11) — "SmartNotes v0.3: Prove It"

**Student role**: Verifier — prove correctness before implementation

**What students build**:
- Complete test suite for `NoteCollection` (happy path + edge cases)
- Tests for search: exact match, partial match, no results, empty collection
- Tests for tags: add tag, remove tag, filter by multiple tags
- AI-generated implementation verified against student-written tests
- Error handling: `NoteNotFoundError`, `DuplicateNoteError`

**Key learning**: Tests written FIRST become the specification that AI implements against. This is TDG in practice.

**Deliverable**: 30+ passing tests with 90%+ coverage of the core domain

---

#### Phase 4: Design & Model (Ch 12-15) — "SmartNotes v0.4: Architect"

**Student role**: Modeler — design objects that represent real concepts

**What students build**:
- Convert `Note` dataclass → full `Note` class with behavior (`.summarize()`, `.add_tag()`, `.link_to()`)
- Note hierarchy: `TextNote`, `CodeNote`, `LinkNote` (inheritance with composition)
- `Repository` Protocol for storage abstraction (in-memory for now)
- Special methods: `Note.__repr__()`, `Note.__eq__()`, `NoteCollection.__iter__()`
- Decorators: `@log_action` for tracking changes, `@validate_input`

**Key learning**: OOP is about modeling real domains, not abstract theory. SmartNotes notes ARE the domain.

**Deliverable**: Refactored SmartNotes with proper object model, all previous tests still passing

---

#### Phase 5: Build & Persist (Ch 16-18) — "SmartNotes v0.5: Store It"

**Student role**: Practitioner — spec real-world features via TDG

**What students build**:
- File-based export: save notes as Markdown files, JSON backup
- PostgreSQL persistence: `NoteRepository` with SQL storage (repository pattern)
- Import/export: read notes from Markdown files, CSV, JSON
- Modular architecture: `smartnotes/models/`, `smartnotes/storage/`, `smartnotes/export/`
- Data transformations: filter, sort, group notes by date/tag/type

**Key learning**: Real applications persist data. The `Repository` Protocol from Phase 4 now gets a real PostgreSQL implementation.

**Deliverable**: SmartNotes that persists to PostgreSQL, imports/exports files, organized as a proper Python package

---

#### Phase 6: Ship & Serve (Ch 19-21) — "SmartNotes v0.6: Ship It"

**Student role**: Builder — ship production software

**What students build**:
- `smartnotes` CLI tool: `smartnotes add`, `smartnotes search`, `smartnotes export` (using typer)
- FastAPI async API: `POST /notes`, `GET /notes/search?q=`, `GET /notes/{id}`
- Async AI integration: semantic search using embeddings, auto-summarization
- CI pipeline: GitHub Actions running format → lint → type check → test on every push
- Structured logging and health check endpoint

**Key learning**: Everything connects. Types define API contracts. Tests verify endpoints. Async handles AI calls without blocking.

**Deliverable**: Deployed SmartNotes with CLI + REST API + CI pipeline, all green

---

#### Phase 7: Integrate & Polish (Ch 22-23) — "SmartNotes v1.0: Complete"

**Student role**: Architect — design and build complete systems

**What students build**:
- Full AI-powered features: semantic search, auto-tagging, note summarization, related notes suggestions
- Complete specification → implementation → verification cycle for a new feature
- Performance optimization and refactoring
- Documentation and deployment

**Deliverable**: Production-grade SmartNotes v1.0 — a portfolio-ready application demonstrating every skill in the course

### The SmartNotes Stack (Final)

```
smartnotes/
├── pyproject.toml          # uv project (Ch 1)
├── src/smartnotes/
│   ├── models/             # Note, NoteCollection, types (Ch 6, 12-14)
│   ├── storage/            # Repository protocol + PostgreSQL impl (Ch 15, 16)
│   ├── search/             # AI-powered semantic search (Ch 10, 20)
│   ├── export/             # Markdown, JSON, CSV (Ch 16)
│   ├── api/                # FastAPI routes (Ch 20)
│   └── cli/                # Typer CLI (Ch 19)
├── tests/                  # pytest suite, 80%+ coverage (Ch 9-10)
├── .github/workflows/      # CI pipeline (Ch 21)
└── README.md               # Project documentation
```

### Why This Works

| Concern | How SmartNotes Addresses It |
|---|---|
| "Exercises feel disconnected" | Every exercise adds to the same project |
| "I never finish anything" | Each phase has a working, shippable version |
| "Portfolio is empty" | One polished project > seven toy exercises |
| "AI features feel bolted on" | Semantic search and summarization are core features |
| "OOP feels abstract" | Notes, tags, collections ARE the domain objects |
| "Testing feels pointless" | Tests protect YOUR knowledge base from regressions |

---

## 16. Open Questions

- [x] ~~Python Crash Course Bridge chapter?~~ → Resolved: No. Dual-track callouts within chapters are sufficient. No extra chapter needed.
- [x] ~~Integration with the broader Agent Factory curriculum (Parts 1-6)?~~ → Resolved: Ch 14 (Ten Axioms) bridges Part 3 into this Python course; course output (typed Python + testing + OOP) feeds directly into Part 5 (building agents). No extra integration chapter needed.
- [x] ~~Should metaclasses get a dedicated advanced appendix?~~ → Resolved: No. Reference-only coverage in Ch 15 is sufficient. Metaclasses are for framework authors, not our audience.
- [x] ~~Specific project designs for each phase (Section 15)?~~ → Resolved: "SmartNotes" Personal AI Knowledge Base — one running project across all 7 phases
- [x] ~~Concurrency chapter?~~ → Resolved: Yes, Ch 20 (async/await + threading + FastAPI intro)
- [x] ~~Exercises format: inline vs separate exercise packs?~~ → Resolved: inline + end-of-chapter (Section 13)
- [x] ~~Python Quick Reference appendix?~~ → Resolved: per-chapter Syntax Cards + combined PDF (Section 14)
- [x] ~~Capstone for beginners vs experienced?~~ → Resolved: no beginners by capstone; per-phase projects instead (Section 15)

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-02-17 | Initial plan based on collaborative discussion |
| 2.0 | 2026-02-17 | Added OOP Phase (Ch 12-15), expanded to 24 chapters, integrated Learning Python (Lutz) coverage, added modules chapter, OOP integration strategy, complete Lutz coverage map |
| 2.1 | 2026-02-17 | Added Exercise Strategy (Section 13): 5 exercise types, phase mix, per-chapter structure, TDG challenge template, cross-chapter exercise thread |
| 2.2 | 2026-02-17 | Added Syntax Card Strategy (Section 14): per-chapter half-page reference cards replacing traditional appendix, with combined downloadable PDF |
| 2.3 | 2026-02-17 | Added Per-Phase Projects direction (Section 15): each phase gets its own project, capstone beginner/experienced question resolved |
| 2.4 | 2026-02-17 | Added Concurrency chapter (Ch 21: async/await + threading), expanded to 25 chapters. Placed before FastAPI. Resolved Crash Course Bridge question (no). Added curriculum integration as open question. |
| 2.5 | 2026-02-17 | Designed "SmartNotes" Personal AI Knowledge Base as the running project across all 7 phases. Updated Section 15 with phase-by-phase deliverables. Updated exercise thread from Order domain to Note/SmartNotes domain. Updated capstone to reference SmartNotes. |
| 2.6 | 2026-02-17 | AI-first philosophy applied throughout entire plan. Steps 4-5 of learning progression now explicitly done WITH AI. Renamed "Writing Gradient" to "Specification Sophistication Gradient". All chapter "Student writes/reads" lines replaced with "Student does/AI role" format reflecting TDG workflow. Phase 5 role renamed from "Writer" to "Practitioner". Exercise Type 5 "Build It" reframed from "no AI" to "full TDG ownership". "Build It Rule" rewritten. Student Journey Summary updated. |
| 2.7 | 2026-02-20 | Folded SQL and FastAPI from standalone chapters into existing chapters per teacher directive. Ch 16 now includes PostgreSQL introduction (was separate Ch 18). Ch 20 (Concurrency) now includes FastAPI introduction (was separate Ch 22). Reduced from 25 to 23 chapters. Renumbered all cross-references: old Ch 19→18, 20→19, 21→20, 23→21, 24-25→22-23. Updated SmartNotes project phases, stack references, Syntax Cards count, exercise thread, and all section cross-references. Full SQL and FastAPI coverage deferred to later parts of the book. |
