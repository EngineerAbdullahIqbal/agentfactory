---
sidebar_position: 8
title: "Chapter 14.1 Summary: Your Complete Workbench"
description: "Review the complete SmartNotes project state and the five-tool discipline stack you built across this chapter."
keywords: ["chapter summary", "discipline stack", "SmartNotes", "uv", "pyright", "ruff", "pytest", "git", "verification pipeline"]
---

# Chapter 14.1 Summary: Your Complete Workbench

You started this chapter with an empty terminal. You end it with a professional Python development environment -- five tools, one project, and a verification pipeline that catches problems before they reach production. Here is everything you built.

## Your SmartNotes Project

```
smartnotes/
├── .git/                  ← Version control initialized
├── .gitignore             ← Excludes .venv/, __pycache__/, etc.
├── .python-version        ← Pins Python 3.12 for all developers
├── .venv/                 ← Virtual environment (managed by uv, not committed)
├── README.md              ← Project documentation placeholder
├── main.py                ← Entry point: returns "Hello from smartnotes!"
├── pyproject.toml         ← Single source of truth for all configuration
├── tests/
│   └── test_main.py       ← One passing test
└── uv.lock                ← Exact dependency versions (committed to Git)
```

## The Discipline Stack

| Tool | Axiom | What It Enforces | Command |
|------|-------|-----------------|---------|
| **uv** | I -- Shell as Orchestrator | Python versions, environments, dependencies | `uv run`, `uv add` |
| **ruff** | IX -- Verification is a Pipeline | Code quality: linting and formatting | `uv run ruff check .`, `uv run ruff format .` |
| **pyright** | V -- Types Are Guardrails | Type safety in strict mode | `uv run pyright` |
| **pytest** | VII -- Tests Are the Specification | Behavioral correctness via assertions | `uv run pytest` |
| **Git** | VIII -- Version Control is Memory | Every change tracked and reversible | `git add`, `git commit` |

## The Verification Pipeline

The single command that ties everything together:

```bash
uv run ruff check . && uv run pyright && uv run pytest
```

Each `&&` means: only proceed if the previous step passed. Ruff runs first (fastest, cheapest). Pyright runs second. pytest runs last (slowest, most expensive). Fix the simplest problem first.

## What Each Configuration Section Does

Your `pyproject.toml` has seven sections. Each one controls a specific part of the workbench:

| Section | Controls |
|---------|----------|
| `[project]` | Project identity: name, version, Python version |
| `[dependency-groups]` | Development tools: pytest, pyright, ruff |
| `[tool.pyright]` | Type checking: strict mode, Python version |
| `[tool.ruff]` | Linter/formatter: line length, target version |
| `[tool.ruff.lint]` | Which lint rules are enabled |
| `[tool.ruff.format]` | Formatting style: quotes, indentation |
| `[tool.pytest.ini_options]` | Test runner: options, test paths |

## Quick Reference: Commands You Learned

| Command | What It Does |
|---------|-------------|
| `uv init smartnotes` | Create a new project |
| `uv add --dev pytest pyright ruff` | Install dev tools |
| `uv run main.py` | Run a file in the project environment |
| `uv run ruff check .` | Lint the project |
| `uv run ruff check --fix .` | Auto-fix safe lint issues |
| `uv run ruff format .` | Format all files |
| `uv run pyright` | Type check the project |
| `uv run pytest` | Run tests |
| `git init` | Initialize version control |
| `git add .` | Stage all files |
| `git commit -m "message"` | Record a snapshot |
| `git log --oneline` | View commit history |

## Test Your Understanding

Ready to check what you learned? Take the [Chapter 14.1 Quiz](./07-chapter-14-1-quiz.md) -- it covers all six lessons and gives you immediate feedback on each answer.

## What Comes Next

In Chapter 14.2, you will put this workbench to use. James and Emma will start reading Python -- learning how to store values, label their types, and combine them into expressions. Every line of code you encounter will be checked by ruff, type-checked by pyright, and tested by pytest. The workbench is no longer something you are building. It is something you are using.
