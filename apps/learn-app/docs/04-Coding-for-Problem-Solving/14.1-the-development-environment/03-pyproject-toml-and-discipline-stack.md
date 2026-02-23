---
sidebar_position: 3
title: "The pyproject.toml and the Discipline Stack"
description: "Install the discipline stack with uv add --dev and understand pyproject.toml as the single source of truth for your Python project"
keywords: ["pyproject.toml", "uv add", "dev dependencies", "dependency-groups", "uv.lock", "lockfile", "tool configuration", "ruff", "pyright", "pytest", "discipline stack"]
chapter: 14.1
lesson: 3
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "pyproject.toml Comprehension"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can explain what information pyproject.toml holds and why centralizing project configuration in one file matters for reproducibility and collaboration"

  - name: "Dependency Management with uv"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can run uv add --dev to install development tools and verify that the tools appear in the [dependency-groups] section of pyproject.toml"

  - name: "Tool Configuration Recognition"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can identify and label each major section of a configured pyproject.toml: [project], [dependency-groups], [tool.pyright], [tool.ruff], [tool.pytest.ini_options]"

learning_objectives:
  - objective: "Explain why pyproject.toml is the single source of truth for a Python project"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student describes what information pyproject.toml holds and why centralizing it matters for reproducibility, collaboration, and AI readability"

  - objective: "Install the discipline stack tools as dev dependencies using uv add --dev"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student runs the command and verifies tools appear in [dependency-groups]"

  - objective: "Identify the major sections of a configured pyproject.toml"
    proficiency_level: "A2"
    bloom_level: "Remember"
    assessment_method: "Student labels each section: [project], [dependency-groups], [tool.pyright], [tool.ruff], [tool.pytest.ini_options]"

cognitive_load:
  new_concepts: 6
  assessment: "6 concepts (pyproject.toml as identity, dependency-groups, uv add --dev, uv.lock lockfile, tool config sections, three-steps-in-one model) within A2 limit of 7"

differentiation:
  extension_for_advanced: "Research the full pyproject.toml specification (PEP 621, PEP 518) and compare how different tools (Poetry, Hatch, PDM) use the same file differently"
  remedial_for_struggling: "Focus on the [project] section only. Run uv add --dev for one tool at a time instead of all three, checking pyproject.toml after each addition"
---

# The pyproject.toml and the Discipline Stack

In Lesson 2, James installed uv and created the SmartNotes project with `uv init smartnotes`. He has a clean project directory with five files. But the project cannot do much yet. It has no linter, no type checker, and no test framework. The `pyproject.toml` that uv generated is minimal -- it knows the project name and Python version, but nothing about code quality. James needs to install the discipline stack: pytest, pyright, and ruff. The question is how.

James opens his terminal inside the `smartnotes` directory. His instinct says `pip install pytest`. That is what every tutorial he has ever read tells him to do. Emma stops him before he presses Enter.

"You already have uv," she says. "Use it."

James replaces the command: `uv add --dev pytest pyright ruff`. Three tools, one command, under a second. He opens `pyproject.toml` and sees all three listed in a new section called `[dependency-groups]`. Then Emma shows him something he did not expect. She adds configuration sections for each tool -- pyright strictness, ruff rules, pytest test paths -- all inside the same file. James stares at it. "Everything I need to know about SmartNotes is right here?" Emma nods. "One file. Every dependency, every tool setting, every project detail. That is what a central configuration gives you."

## The Problem Without a Central Config

Before `pyproject.toml` became the standard, a typical Python project scattered its configuration across half a dozen files:

| What | Where It Lived | Problem |
|------|---------------|---------|
| Dependencies | `requirements.txt` | No lockfile, no distinction between dev and production deps |
| Linter config | `.flake8` or `setup.cfg` | Separate file, separate syntax, easy to forget |
| Formatter config | `pyproject.toml` or `.black.toml` | Some tools supported pyproject.toml, others did not |
| Type checker config | `pyrightconfig.json` | JSON file, different format from everything else |
| Test config | `pytest.ini` or `setup.cfg` | Yet another file, yet another format |
| Build system | `setup.py` or `setup.cfg` | Python script that ran arbitrary code during installation |

A new developer joining the project had to find and read six files in three different formats to understand how the project was configured. An AI agent trying to understand the project had to parse JSON, INI, TOML, and Python -- four different parsers for four different formats. And the worst part: none of these files knew about each other. A version constraint in `requirements.txt` could contradict a version constraint in `setup.cfg`, and nothing would catch the conflict until deployment failed.

This is the world James narrowly avoided by not typing `pip install pytest`.

## pyproject.toml Defined

> **pyproject.toml** is the single configuration file for a Python project. It declares the project's identity (name, version, Python version), its dependencies, and the configuration for every tool in the development stack. One file replaces six. One format replaces four.

The name is precise: `pyproject` means "Python project" and `.toml` is the format -- Tom's Obvious Minimal Language, a configuration format designed to be easy for humans to read and easy for machines to parse. It has the structured precision of JSON without the visual clutter of braces and quotes.

After running `uv init smartnotes` in the previous lesson, your `pyproject.toml` looks like this:

```toml
[project]
name = "smartnotes"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = []
```

This is the project's identity card. Every field answers a specific question:

| Field | What It Answers | Example Value |
|-------|----------------|---------------|
| `name` | What is this project called? | `"smartnotes"` |
| `version` | What version is it? | `"0.1.0"` |
| `description` | What does it do? (one sentence) | `"A personal note-taking assistant"` |
| `readme` | Where is the detailed description? | `"README.md"` |
| `requires-python` | What Python versions are supported? | `">=3.12"` |
| `dependencies` | What packages does the project need to run? | `[]` (empty for now) |

This is the `[project]` section. It follows a standard called PEP 621 — a set of rules that the Python community agreed on so that every tool reads project files the same way. Before this standard, different tools like Poetry, Hatch, and pip each had their own format, and switching between them meant rewriting your configuration. With PEP 621, you write your project details once and every tool understands it — no matter which tool you or your team prefers.

## From Scattered Files to One Source of Truth

Consider what happens when you add a tool to your project. Without a central config, that knowledge splits: the dependency goes in one file, the configuration goes in another, and the version constraint goes in a third. Three files, three formats, one decision. With `pyproject.toml`, the dependency, the configuration, and the version constraint all live in one file. A human developer opens one file and sees everything. An AI agent reads one file and understands the entire project setup. Git tracks one file and shows every configuration change in a single diff.

## Practical Application

### Installing the Discipline Stack

Open your terminal inside the `smartnotes` directory and run:

```bash
uv add --dev pytest pyright ruff
```

**Output:**

```
Resolved 9 packages in 215ms
Prepared 9 packages in 163ms
Installed 9 packages in 28ms
 + iniconfig==2.1.0
 + nodeenv==1.9.1
 + packaging==24.2
 + pluggy==1.5.0
 + pyright==1.1.408
 + pytest==9.0.2
 + ruff==0.15.2
 + tomli==2.2.1
 + typing-extensions==4.12.2
```

Three tools and their transitive dependencies (packages that your packages depend on), installed in under a second. Your version numbers will likely differ from the ones shown here -- tools release frequently, so newer versions are normal. The workflow is the same regardless of the exact version numbers.

The `--dev` flag is important: it tells uv these tools are for development, not for running the application in production. A user installing your SmartNotes app does not need ruff or pytest -- those are for you, the developer.

### What uv add --dev Actually Does

This single command performs three operations simultaneously:

| Step | What Happens | File Modified |
|------|-------------|---------------|
| 1 | Records the dependency | `pyproject.toml` updated with `[dependency-groups]` |
| 2 | Locks exact versions | `uv.lock` created or updated |
| 3 | Installs into environment | `.venv/` synced with new packages |

This is the "three steps in one" model. With pip, you would need to run `pip install`, then manually update `requirements.txt`, then hope your colleague installs the same versions. With uv, the config file, the lockfile, and the virtual environment are always in sync. One command, three results, zero drift.

### Examining pyproject.toml After Installation

Open `pyproject.toml` again. A new section has appeared:

```toml
[project]
name = "smartnotes"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = []

[dependency-groups]
dev = ["pytest>=9.0.2", "pyright>=1.1.408", "ruff>=0.15.2"]
```

The `[dependency-groups]` section is where development dependencies live. The `dev` group contains your three tools with minimum version constraints. This section follows PEP 735, a standard that allows projects to define named groups of dependencies for different purposes (development, testing, documentation).

### The Lockfile: uv.lock

Look at the new `uv.lock` file that uv created. This file records the exact version of every package installed, including transitive dependencies. While `pyproject.toml` says `"pytest>=9.0.2"` (any version 9.0.2 or higher), the lockfile says exactly which version was resolved.

The lockfile is a cross-platform reproducibility guarantee. When another developer runs `uv sync` on their machine -- whether that machine runs Windows, macOS, or Linux -- they get the exact same package versions. No "it works on my machine" surprises.

**Rule**: Commit `uv.lock` to Git. It belongs in version control alongside `pyproject.toml`.

### Adding Tool Configuration Sections

The discipline stack is installed. Now each tool needs to know how to behave. Instead of creating separate config files for each tool, you add configuration sections directly to `pyproject.toml`.

Add the following sections after the `[dependency-groups]` block:

**Pyright configuration:**

```toml
[tool.pyright]
typeCheckingMode = "strict"
pythonVersion = "3.12"
```

Python lets you add **type annotations** — labels that say what kind of data a variable holds or what a function expects and returns. For example, `name: str` says "name is text" and `age: int` says "age is a whole number." You will learn how to write these annotations in later chapters. For now, just know that pyright reads them and warns you when something does not match — like passing text where a number is expected. `"strict"` mode means pyright checks everything thoroughly, and `pythonVersion = "3.12"` tells it which version of Python your project uses.

**Ruff configuration:**

```toml
[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
```

Ruff does two jobs: **linting** (finding mistakes and bad habits in your code) and **formatting** (making your code look consistent). `line-length = 88` means no line of code should be longer than 88 characters — long lines are hard to read. `target-version = "py312"` tells ruff your project uses Python 3.12.

The `select` list tells ruff which categories of problems to look for. Each letter is a code for a category:

| Code | Name | What It Catches |
|------|------|-----------------|
| `"E"` | pycodestyle Errors | Basic style problems — wrong spacing, bad indentation |
| `"F"` | pyFlakes | Real bugs — unused imports, undefined variables, code that cannot run |
| `"I"` | isort | Import ordering — keeps your `import` lines organized alphabetically |
| `"UP"` | pyUpgrade | Old Python syntax — suggests modern replacements available in Python 3.12 |
| `"B"` | Bugbear | Subtle bugs — common mistakes that Python allows but usually cause problems |
| `"SIM"` | Simplify | Unnecessary complexity — code that can be written in a simpler way |

The `[tool.ruff.format]` section controls how ruff formats your code: double quotes around strings (`"hello"` not `'hello'`) and spaces for indentation (not tabs).

**Pytest configuration:**

```toml
[tool.pytest.ini_options]
addopts = "-ra -q"
testpaths = ["tests"]
```

Pytest is the tool that runs your tests — small checks you write to prove your code does what it should. `addopts` sets default options that apply every time you run tests: `-ra` means "after all tests finish, show a summary of which ones passed and which failed," and `-q` means "keep the output short instead of printing every detail." `testpaths = ["tests"]` tells pytest where to find your test files — in a folder called `tests/` inside your project.

### The Complete pyproject.toml

After adding all tool configurations, your SmartNotes `pyproject.toml` looks like this:

```toml
[project]
name = "smartnotes"
version = "0.1.0"
description = "A personal note-taking assistant"
readme = "README.md"
requires-python = ">=3.12"
dependencies = []

[dependency-groups]
dev = ["pytest>=9.0.2", "pyright>=1.1.408", "ruff>=0.15.2"]

[tool.pyright]
typeCheckingMode = "strict"
pythonVersion = "3.12"

[tool.ruff]
line-length = 88
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"

[tool.pytest.ini_options]
addopts = "-ra -q"
testpaths = ["tests"]
```

One file. Four tools configured. Every developer and every AI agent reading this file knows exactly how SmartNotes is built, what tools it uses, and how those tools are configured.

:::info Checkpoint: Your SmartNotes project should now look like this
```
smartnotes/
├── .gitignore
├── .python-version
├── .venv/
├── README.md
├── main.py
├── pyproject.toml      ← now has [dependency-groups] and [tool.*] sections
└── uv.lock             ← updated with exact versions of pytest, pyright, ruff
```
The file list has not changed since Lesson 2. What changed is the *content* of `pyproject.toml` (new sections) and `uv.lock` (new dependency versions).
:::

**Read and Predict**: Look at the `pyproject.toml` above and answer these questions:

1. What happens if you try to use Python 3.11 with this project?
2. Which ruff rules are enabled? What does the `"F"` prefix catch?
3. Where will pytest look for test files?

### Section Map

For reference, here is every section in the final `pyproject.toml` and what it controls:

| Section | Purpose | Standard |
|---------|---------|----------|
| `[project]` | Project identity: name, version, Python version, dependencies | PEP 621 |
| `[dependency-groups]` | Development-only dependencies grouped by purpose | PEP 735 |
| `[tool.pyright]` | Type checker configuration: strictness, Python version | Pyright-specific |
| `[tool.ruff]` | Linter/formatter base settings: line length, target version | Ruff-specific |
| `[tool.ruff.lint]` | Linting rule selection | Ruff-specific |
| `[tool.ruff.format]` | Formatting preferences: quotes, indentation | Ruff-specific |
| `[tool.pytest.ini_options]` | Test runner configuration: options, test paths | Pytest-specific |

The `[project]` and `[dependency-groups]` sections follow Python standards that all tools agree on. The `[tool.*]` sections follow a convention: each tool gets its own namespace under `[tool]`, so configurations never collide.

## Anti-Patterns

James now understands why Emma stopped him from typing `pip install pytest`. Here are the patterns Emma warned him to avoid:

| Anti-Pattern | What Happens | The Fix |
|-------------|-------------|---------|
| **`requirements.txt` without a lockfile** | Different developers get different package versions; builds break randomly | Use `uv add` which generates `uv.lock` automatically |
| **`pip install` globally** | Packages conflict across projects; one project's upgrade breaks another | Use `uv add` which installs into the project's `.venv` automatically |
| **Separate config files per tool** | `.flake8`, `pyrightconfig.json`, `pytest.ini` scattered across the root directory; new developers miss config files | Put all tool config in `pyproject.toml` under `[tool.*]` sections |
| **Not pinning the Python version** | Code works on 3.12 locally, breaks on 3.10 in CI | Set `requires-python` in `[project]` and `.python-version` in the root |

Every anti-pattern shares a root cause: configuration scattered across multiple locations instead of centralized in one file. The fix is always the same: `pyproject.toml`.

## Try With AI

### Prompt 1: Understand Each Section

```
Here is my pyproject.toml file:

[paste your complete pyproject.toml from this lesson]

Explain each section in plain language. For every section, tell me:
1. What it controls
2. What would happen if I deleted it
3. One thing I could change and what the effect would be
```

**What you're learning:** How to read a configuration file as a knowledge document. You are building the ability to treat `pyproject.toml` as a readable specification of your project -- not a mysterious file that tools generate and humans ignore.

### Prompt 2: Generate Tool Configuration

```
I have a Python project using uv with pytest, pyright, and ruff installed
as dev dependencies. I want to configure ruff to also check for:
- Security vulnerabilities (the S rules from flake8-bandit)
- Print statements left in code (the T20 rules)
- Naming conventions (the N rules from pep8-naming)

Show me the updated [tool.ruff.lint] section and explain what each
new rule prefix catches. Also tell me: is there a downside to enabling
too many rules at once?
```

**What you're learning:** How to extend tool configurations beyond the defaults. You are practicing the skill of treating configuration as a design decision -- choosing which rules to enforce based on your project's needs, not just copying a config from the internet.

### Prompt 3: Explain Lockfiles

```
I understand that pyproject.toml lists my dependencies, but I am confused
about uv.lock. My questions:

1. Why do I need both pyproject.toml AND uv.lock?
2. What information does uv.lock contain that pyproject.toml does not?
3. Should I commit uv.lock to Git? Why or why not?
4. What happens if I delete uv.lock and run uv sync?
5. How does uv.lock help when my teammate uses Windows and I use macOS?

Explain each answer with a concrete example using a project called smartnotes.
```

**What you're learning:** The difference between a specification (pyproject.toml says "I need pytest 9 or higher") and a resolution (uv.lock says "I am using pytest 9.0.2 specifically, along with these exact transitive dependencies"). This distinction -- specification vs resolution -- appears throughout software engineering and is fundamental to reproducible builds.

## Key Takeaways

1. **`pyproject.toml` is the single source of truth** for your Python project. It replaces `requirements.txt`, `setup.py`, `.flake8`, `pyrightconfig.json`, and `pytest.ini` with one file in one format.

2. **`uv add --dev` performs three operations in one command**: it updates `pyproject.toml`, generates `uv.lock`, and syncs the virtual environment. Config, lockfile, and environment are always in sync.

3. **`[dependency-groups]` separates dev tools from production dependencies.** Users of your application do not need pytest, pyright, or ruff -- those are for developers only.

4. **`uv.lock` guarantees reproducibility across platforms.** While `pyproject.toml` specifies version ranges, the lockfile records exact versions. Commit it to Git.

5. **Tool configuration lives under `[tool.*]` sections.** Each tool gets its own namespace -- `[tool.pyright]`, `[tool.ruff]`, `[tool.pytest.ini_options]` -- so configurations never collide.

## Looking Ahead

Your SmartNotes project now has three discipline tools installed and configured in one file. But you have not run any of them yet. What does ruff actually catch? What does its output look like? What happens when your code has style violations?

In Lesson 4, James writes his first Python function -- and discovers the difference between code that runs and code that is correct.
