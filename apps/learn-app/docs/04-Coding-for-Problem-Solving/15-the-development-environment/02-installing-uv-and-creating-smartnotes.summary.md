### Core Concept
uv is a single Rust-based tool that replaces five separate Python tools (python.org installer, venv, pip, pip-tools, pyenv) with one unified interface. Installing uv and running `uv init smartnotes` scaffolds a complete, reproducible Python project in seconds, embodying Axiom I (Shell as Orchestrator) by letting one shell command coordinate Python versioning, environment management, dependency resolution, and script execution.

### Key Mental Models
- **Single Orchestrator**: Instead of coordinating five independent tools that know nothing about each other, uv consolidates all Python project management responsibilities into one binary, eliminating the "which tool caused this?" debugging problem.
- **Axiom I Made Concrete**: The shell coordinates programs; programs do computation. `uv run main.py` is the practical expression of this principle -- one shell command delegates all Python-specific work (version checking, venv creation, dependency syncing, execution) to uv.
- **Scaffolding as Foundation**: `uv init` generates a minimal but complete project skeleton where every file has a specific, non-optional purpose. The project starts small and evolves across chapters, but the structure is correct from the beginning.
- **Invisible Environment Management**: Virtual environments exist but are fully managed by uv. The developer never activates, deactivates, or manually creates them -- `uv run` handles it transparently on every execution.

### Key Facts
- **uv replaces five tools**: python.org installer, venv, pip, pip-tools (lockfiles), and pyenv (version management), all maintained by Astral (the same company that builds ruff).
- **`uv init` generates five files**: `.gitignore`, `.python-version`, `README.md`, `main.py`, and `pyproject.toml` -- each with a distinct, required purpose.
- **`uv run` creates two additional items**: The `.venv/` directory (virtual environment) and `uv.lock` (lockfile) are generated automatically on first execution, not during `uv init`.
- **`.python-version` contains a single line**: Just `3.12`, ensuring every developer on the project uses the same Python version without manual coordination.
- **`uv.lock` should be committed to Git; `.venv/` should not**: The lockfile ensures reproducible dependency versions across machines, while the virtual environment is machine-specific and excluded by `.gitignore`.
- **"command not found" after install**: Requires closing and reopening the terminal because the PATH update needs a new shell session.

### Critical Patterns
- Run first, understand second: Execute `uv init` and `uv run`, observe the results, then ask AI to explain what happened. This anchors abstract concepts in concrete evidence you produced yourself.
- One command replaces a multi-step workflow: Where the old approach required five separate commands across five tools (pyenv install, pyenv local, python -m venv, source activate, pip install), `uv run main.py` handles everything in a single invocation.
- Every generated file enforces a specific discipline: `.python-version` enforces version consistency, `pyproject.toml` enforces project identity, `.gitignore` enforces clean version control. Nothing is decorative.
- Verify installation immediately: After installing any tool, run its version command (`uv --version`) to confirm it works before proceeding to use it.

### Common Mistakes
- **Installing Python from python.org**: Creates PATH conflicts and version inconsistencies across developers. Let uv manage Python versions automatically through `.python-version`.
- **Using pip directly outside a project**: Installs packages globally with no lockfile and no reproducibility. Always use `uv add` inside a project to update `pyproject.toml`, `uv.lock`, and the virtual environment in one step.
- **Manually activating virtual environments**: Platform-specific activation commands (`source .venv/bin/activate` vs `.venv\Scripts\activate`) lead to "works on my machine" problems. Use `uv run` instead -- no activation required.
- **Ignoring `.python-version`**: Without this file, team members use whatever Python version happens to be installed, causing silent breakage from syntax or library differences between versions.

### Connections
- **Builds on**: Lesson 1: Why the Toolchain Comes First -- which introduced the discipline stack, the five axioms, and the rationale for why tools come before code.
- **Leads to**: Lesson 3: pyproject.toml and the Discipline Stack -- which installs pyright, ruff, and pytest, and configures pyproject.toml as the single source of truth for the entire project.
