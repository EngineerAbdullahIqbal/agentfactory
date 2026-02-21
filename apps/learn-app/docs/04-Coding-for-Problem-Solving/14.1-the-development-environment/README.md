---
sidebar_position: 15
title: "Chapter 14.1: The Development Environment"
description: "Install and configure the five-tool Python discipline stack -- uv, pyright, ruff, pytest, and Git -- each connected to an axiom from Chapter 14."
keywords:
  [
    "uv",
    "python",
    "package manager",
    "pyright",
    "ruff",
    "pytest",
    "git",
    "development environment",
    "discipline stack",
    "pyproject.toml",
    "type checking",
    "linting",
    "testing",
    "version control",
  ]
---

# Chapter 14.1: The Development Environment

James opens his laptop, creates a file called `app.py`, writes a function, and runs it. It works. He pushes the file to a shared folder. Emma pulls it down on her machine and nothing works -- wrong Python version, missing library, different operating system assumptions baked into every line. James stares at the error messages. "But it ran fine on my computer."

Emma has seen this conversation a hundred times. She does not argue. She opens a terminal and types one command: `uv init smartnotes`. A clean project structure appears -- five files, each with a purpose. She adds three development tools in a single line. She runs the linter, the type checker, and the test suite. All green. She commits the result to Git. Total time: under a minute. James has spent more time explaining why his script should have worked.

This is the difference between writing code and building software. Before you write a single line of Python in this course, you build the foundation that makes every line trustworthy. The ten axioms from Chapter 14 told you *what* matters. This chapter puts those axioms into your hands as five concrete tools that enforce them automatically.

## What You Will Learn

By the end of this chapter, you will be able to:

- Install **uv**, the package manager that replaces pip, poetry, and pyenv with a single tool
- Create Python projects with `uv init` and explain every generated file
- Configure **`pyproject.toml`** as the single source of truth for your entire project
- Run **ruff** for automated code quality checks -- both linting and formatting
- Run **pyright** for static type checking in strict mode
- Run **pytest** and read pass/fail output
- Initialize **Git** and make your first version-controlled commit
- Execute the complete verification pipeline: lint, type check, test, commit

## The SmartNotes Project

Every lesson in this chapter builds on the same project: **SmartNotes**, a personal note-taking assistant that you will develop across the remaining chapters of this course. In this chapter, you do not write application logic. You set up SmartNotes as a properly configured, professionally tooled Python project -- the kind of foundation that makes everything built on top of it reliable.

By Lesson 6, your SmartNotes project will have a passing linter, a passing type checker, a passing test suite, and a clean Git history. That is the starting line for real Python development.

## The Axiom Connections

Each tool in the discipline stack maps directly to an axiom you learned in Chapter 14. These are not abstract connections -- each tool is the concrete enforcement mechanism for its axiom.

| Tool | Axiom | Why It Matters |
|------|-------|----------------|
| uv | I -- Shell as Orchestrator | One command orchestrates Python versions, virtual environments, and dependencies |
| pyright | V -- Types Are Guardrails | Catches type errors before your code runs |
| ruff | IX -- Verification is a Pipeline | Automated style and correctness checks on every change |
| pytest | VII -- Tests Are the Specification | Tests define what "correct" means -- not just that code runs |
| Git | VIII -- Version Control is Memory | Every change tracked, every decision reversible |

## Chapter Lessons

| Lesson | Title | What You Do |
|--------|-------|-------------|
| 1 | Why the Toolchain Comes First | Understand the five tools and their axiom connections |
| 2 | Installing uv and Creating SmartNotes | Install uv, scaffold the project, explore generated files |
| 3 | The pyproject.toml and the Discipline Stack | Configure the central project file, install dev tools |
| 4 | Ruff -- Your Code Quality Guardian | Run the linter and formatter, read error output |
| 5 | Pyright -- Your Type Safety Net | Run the type checker, compare typed vs untyped code |
| 6 | Tests, Git, and the Complete Workbench | Run pytest, initialize Git, execute the full pipeline |

## Prerequisites

- **Chapter 14: Ten Axioms of Programming in AI-Driven Development** -- This chapter assumes familiarity with all ten axioms. Each lesson references specific axioms by number and name.
