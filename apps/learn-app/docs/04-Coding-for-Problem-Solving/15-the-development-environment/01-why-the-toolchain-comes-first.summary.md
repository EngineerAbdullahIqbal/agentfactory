### Core Concept
Professional Python development begins with tooling infrastructure, not syntax. The five-tool discipline stack (uv, pyright, ruff, pytest, Git) replaces willpower with automated enforcement of engineering axioms from Chapter 14. A project without this stack is not simpler -- it is unprotected, because each missing tool opens a specific, predictable failure mode that discipline alone cannot prevent.

### Key Mental Models
- **Discipline Stack**: The five tools form a unified system, not a loose collection. Removing any single tool leaves a gap that willpower cannot reliably fill -- the stack works because every failure mode is covered by a corresponding tool.
- **Tools as Axiom Enforcement**: Each tool is the physical implementation of a Chapter 14 axiom. The axioms say what matters; the tools make sure you cannot forget. Pyright enforces types-as-guardrails, pytest enforces tests-as-specifications, and so on.
- **Infrastructure Over Willpower**: The philosophy that automated checks replace good intentions. You do not need to remember style rules when ruff enforces them, or remember to test when pytest tells you when something breaks.
- **Workbench Before Work**: Like a carpenter who sets up the workbench before cutting wood, developers configure their toolchain before writing application code. The workbench is where the work happens.
- **Running vs Working**: Code that executes on one machine is merely "running." Code that anyone can clone and reproduce is "working." The distinction is the entire motivation for the discipline stack.

### Key Facts
- **Five tools in the stack**: uv (package management), pyright (type checking), ruff (linting and formatting), pytest (testing), Git (version control).
- **uv replaces four tools**: uv consolidates pip, pyenv, poetry, and virtualenv into a single command, eliminating the fragmentation of traditional Python package management.
- **Axiom-tool mapping**: uv maps to Axiom I (Shell as Orchestrator), pyright to Axiom V (Types Are Guardrails), pytest to Axiom VII (Tests Are the Specification), Git to Axiom VIII (Version Control is Memory), ruff to Axiom IX (Verification is a Pipeline).
- **SmartNotes is the running project**: Every lesson in Chapter 15 builds on the same SmartNotes project, which starts as an empty directory and ends with all five tools configured.
- **AI-era relevance**: The discipline stack is the safety net for verifying AI-generated code, which arrives too fast to review manually without automated checks.

### Critical Patterns
- Set up all five tools before writing any application code -- the cost of retrofitting tooling onto existing code is always higher than configuring it upfront.
- Map each tool to its corresponding axiom to understand why it exists, not just how to use it. This prevents treating tools as arbitrary chores.
- Use the discipline stack as your verification layer for AI-generated code: pyright checks types, ruff catches style issues, pytest verifies behavior -- the tools answer questions you cannot answer by reading code alone.
- Treat the five tools as a single integrated system where each tool covers what the others cannot, rather than evaluating them individually.

### Common Mistakes
- **"Just pip install"**: Installing packages globally instead of per-project leads to dependency conflicts and unreproducible environments. Use project-scoped installation via uv instead.
- **"No virtual environment"**: Running code with system Python masks missing dependencies. Code works locally because of accidentally pre-installed libraries, then fails on every other machine.
- **"No linter"**: Skipping ruff means code reviews become style arguments. Twenty minutes of human review effort replaces what the tool catches in seconds.
- **"Test later"**: Deferring tests until code "stabilizes" means specifications fade from memory, and when bugs appear there is no baseline to catch them. Write the first test before the first feature.
- **Writing code first, tools later**: The most common anti-pattern. James's story shows that code which "runs" on the author's machine fails everywhere else when the toolchain is absent.

### Connections
- **Builds on**: The ten axioms from Chapter 14, particularly Axiom I (Shell as Orchestrator), Axiom V (Types Are Guardrails), Axiom VII (Tests Are the Specification), Axiom VIII (Version Control is Memory), and Axiom IX (Verification is a Pipeline). Students must understand the axioms conceptually before this lesson maps them to concrete tools.
- **Leads to**: Lesson 2 ("Installing uv and Creating SmartNotes"), where students install the first and most foundational tool in the discipline stack and create the SmartNotes project directory with its initial pyproject.toml and main.py.
