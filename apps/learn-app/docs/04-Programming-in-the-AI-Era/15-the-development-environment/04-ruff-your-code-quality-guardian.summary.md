### Core Concept
Ruff is a single tool that replaces an entire ecosystem of Python quality tools, providing both linting (finding bugs, unused code, and style violations) and formatting (enforcing consistent style). The central insight is that code that runs is not the same as code that is correct -- Python silently ignores unused imports, forgotten variables, and inconsistent spacing, but ruff catches these problems before they accumulate into real trouble.

### Key Mental Models
- **Running vs Correct**: Python will execute code with unused imports, dead variables, and messy spacing without complaint. A linter catches what the language interpreter ignores, distinguishing code that merely runs from code that is actually clean.
- **Linting vs Formatting**: Linting finds problems (bugs, unused code, violations) like a building inspector. Formatting enforces style (spacing, quotes, indentation) like a copy editor. A linting error might be a real bug; a formatting change is never a bug.
- **Rule Code Triage**: Every ruff warning starts with a letter prefix (F for Pyflakes, E for pycodestyle, I for isort, etc.) that tells you the category of the problem. The prefix is your first triage step for understanding severity and type.
- **Conservative Auto-Fix**: Ruff auto-fixes problems where the fix is provably safe (removing unused imports) but only flags problems where human judgment is needed (removing assignments that might be intentional). The `[*]` marker indicates auto-fixable issues.
- **Verification Pipeline (Axiom IX)**: Ruff is the first stage of an automated verification pipeline that catches mechanical problems so humans can focus on judgment problems like design and correctness during code review.

### Key Facts
- **Ruff replaces six older tools**: Flake8, Black, isort, pyupgrade, autoflake, and flake8-bugbear are all replaced by a single ruff binary.
- **Ruff is written in Rust**: This makes it 10 to 100 times faster than the Python-based tools it replaces.
- **Ruff is made by Astral**: The same company that built uv, the package manager introduced earlier in the chapter.
- **Default line length is 88 characters**: This convention is borrowed from Black, the Python formatter ruff replaces.
- **F401 is unused import, F841 is unused variable**: The F prefix means Pyflakes rules, which catch unused code and undefined names.
- **`ruff format --check` verifies without changing**: It exits with a non-zero exit code if files need reformatting, making it useful in CI pipelines.

### Critical Patterns
- Run `ruff check` before `ruff format` -- fix logic problems (potential bugs) before style problems (readability preferences), because linting may remove code that formatting would otherwise reformat unnecessarily.
- Use `--fix` for safe auto-fixes, then manually address what remains -- ruff's conservative approach means anything left after `--fix` genuinely requires your judgment.
- Read ruff output as file:line:column:RULE_CODE format -- parsing this structure lets you jump directly to problems and understand their category from the prefix alone.
- Always expand the rule selection in `pyproject.toml` beyond ruff's minimal defaults (E4, E7, E9, F) to catch import sorting, modernization, and common bug patterns.
- After AI generates code, run `ruff check` and `ruff format` immediately -- AI-generated code frequently includes unused imports and inconsistent style that tools catch in milliseconds.

### Common Mistakes
- **Ignoring lint warnings because "it still runs"**: Warnings accumulate from 3 to 30 to 300 until nobody reads them; fix every warning before committing.
- **Formatting code by hand**: Manual spacing adjustments are slow, inconsistent, and trigger style debates in code review; let `ruff format` handle it.
- **Suppressing warnings with `# noqa` everywhere**: Blanket suppression hides real problems; only use `# noqa` when you have a documented reason to keep the flagged code.
- **Using ruff's default rules without expanding them**: The defaults only cover a small subset of available checks; configuring broader rule selection in `pyproject.toml` catches import sorting, modernization, and common bugs.

### Connections
- **Builds on**: Lesson 3 -- The pyproject.toml and the Discipline Stack (where ruff was installed and configured as a dev dependency with rule selections in pyproject.toml)
- **Leads to**: Lesson 5 -- Pyright -- Your Type Safety Net (which catches type errors that ruff cannot detect, such as passing a number where the code expects text)
