### Core Concept
The `pyproject.toml` file is the single source of truth for a Python project, replacing a half-dozen scattered configuration files with one centralized document that declares the project's identity, its dependencies, and every tool's configuration. By using `uv add --dev` to install the discipline stack (pytest, pyright, ruff), the config file, lockfile, and virtual environment stay permanently in sync through one command -- eliminating the drift and fragmentation that plagued older Python workflows.

### Key Mental Models
- **Single Source of Truth**: All project configuration -- identity, dependencies, tool settings -- belongs in one file (`pyproject.toml`) rather than scattered across `requirements.txt`, `.flake8`, `pyrightconfig.json`, and `pytest.ini`. One file for humans to read, one file for AI agents to parse, one file for Git to track.
- **Three Steps in One**: The `uv add --dev` command simultaneously updates `pyproject.toml`, generates/updates `uv.lock`, and syncs the virtual environment. With pip, these would be three separate manual steps prone to drift.
- **Specification vs Resolution**: `pyproject.toml` specifies version ranges (e.g., `pytest>=9.0.2`), while `uv.lock` resolves exact versions including all transitive dependencies. The specification says what you need; the resolution says exactly what you got.
- **Dev vs Production Dependencies**: The `[dependency-groups]` section separates tools needed only during development (ruff, pyright, pytest) from packages needed to run the application. End users never need your linter.
- **Tool Namespacing**: Each tool gets its own `[tool.*]` section inside `pyproject.toml` (e.g., `[tool.pyright]`, `[tool.ruff]`, `[tool.pytest.ini_options]`), so configurations never collide with each other.

### Key Facts
- **PEP 621**: The standard that defines the `[project]` section format, ensuring all Python tools read project metadata the same way.
- **PEP 735**: The standard that defines `[dependency-groups]`, allowing projects to organize dependencies into named groups (dev, test, docs).
- **Ruff Rule Prefixes**: E (pycodestyle errors), F (pyFlakes bugs), I (import sorting), UP (pyUpgrade for modern syntax), B (Bugbear subtle bugs), SIM (simplification opportunities).
- **Lockfile Commitment**: `uv.lock` must be committed to Git -- it is the cross-platform reproducibility guarantee that ensures all developers get identical package versions.
- **TOML Format**: Tom's Obvious Minimal Language -- designed for human readability and machine parseability, with the structure of JSON but without the visual clutter of braces and quotes.
- **Pyright Strict Mode**: Setting `typeCheckingMode = "strict"` enables thorough checking of all type annotations in the project.

### Critical Patterns
- Always use `uv add --dev` instead of `pip install` for development tools -- this keeps the config file, lockfile, and environment in sync automatically rather than requiring manual coordination.
- Place all tool configuration inside `pyproject.toml` under `[tool.*]` sections rather than creating separate files like `.flake8` or `pyrightconfig.json` -- centralization means no configuration is missed or forgotten.
- Commit both `pyproject.toml` and `uv.lock` to version control -- the first declares intent, the second guarantees reproducibility across platforms and teammates.
- Set `requires-python` in `[project]` and maintain `.python-version` in the project root to prevent silent Python version mismatches between local development and CI environments.

### Common Mistakes
- **Using `pip install` instead of `uv add`**: Installs the package but does not update `pyproject.toml` or create a lockfile, leading to dependency drift where different developers get different versions.
- **Installing packages globally instead of per-project**: Causes conflicts across projects where one project's upgrade breaks another. `uv add` always installs into the project's `.venv`.
- **Scattering config across separate files**: Creating `.flake8`, `pyrightconfig.json`, and `pytest.ini` separately means new developers miss configuration files and AI agents must parse four different formats.
- **Not pinning the Python version**: Code works on 3.12 locally but breaks on 3.10 in CI because `requires-python` was never set in the `[project]` section.
- **Using `requirements.txt` without a lockfile**: Different developers resolve different package versions, and builds break randomly with no way to reproduce the exact environment.

### Connections
- **Builds on**: [Lesson 2: Installing uv and Creating SmartNotes] -- the project directory and initial `pyproject.toml` created by `uv init` are the starting point for this lesson.
- **Leads to**: [Lesson 4: Ruff -- Your Code Quality Guardian] -- the ruff tool installed and configured here gets used for the first time when James writes actual Python code.
