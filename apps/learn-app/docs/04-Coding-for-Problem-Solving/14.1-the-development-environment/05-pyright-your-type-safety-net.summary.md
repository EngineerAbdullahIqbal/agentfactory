### Core Concept
Pyright is a static type checker that analyzes Python code without running it, reading type annotations like `: str` and `: int` to verify that every piece of code receives and returns the correct kind of data. In strict mode, it enables 29 additional diagnostic rules beyond standard mode, requiring complete type labels on all code and catching entire categories of bugs -- missing annotations, unknown types, and unused imports -- that would otherwise hide until runtime.

### Key Mental Models
- **Guardrail Inspector**: Pyright walks along every type label in your code before it runs and reports which guardrails are missing, enforcing Axiom V (types are guardrails, not bureaucracy).
- **Static Analysis vs Runtime**: A static type checker finds errors by reading code, not executing it. Bugs surface in seconds after saving rather than hours later in a crash.
- **Double Duty Labels**: Type annotations serve two purposes simultaneously -- they document what kind of data code expects (for humans and AI) and they enable automated verification (for pyright). One label, two benefits.
- **Progressive Strictness**: Pyright's four modes (off, basic, standard, strict) form a spectrum of coverage. Strict mode is the only mode that requires complete type annotations and catches all detectable type issues.
- **Union Types as Explicit Optionality**: The `str | None` pattern makes optional values explicit in the type system rather than leaving them as hidden assumptions that cause runtime surprises.

### Key Facts
- **Creator and Speed**: Pyright is built by Microsoft and analyzes most projects in under a second.
- **Four Modes**: Pyright offers off, basic, standard (CLI default), and strict type checking modes.
- **Strict Mode Rules**: Strict mode enables 29 additional diagnostic rules that are completely disabled in standard mode, plus escalates 7 more rules from warnings to errors.
- **Configuration Location**: Pyright is configured in the `[tool.pyright]` section of `pyproject.toml`, and the run command is always `uv run pyright` regardless of mode.
- **Error Output Format**: Every pyright error follows the format `[file path]:[line]:[column] - error: [description] ([rule name])`.
- **Three Strict-Mode Categories**: The most important strict-mode catches fall into missing annotations, unknown types, and unused code.

### Critical Patterns
- Type errors caught by pyright map to specific rule names like `reportArgumentType` (wrong data passed to a parameter) and `reportAssignmentType` (wrong data stored in a labeled variable), making each error self-classifying.
- Adding types as you write code is fundamentally different from adding them afterward; labels added retroactively describe what the developer intended rather than what the code actually does.
- Starting a new project in strict mode is easier than migrating an existing untyped project, because strict mode errors accumulate over time and become overwhelming to fix in bulk.
- In the AI era, type annotations become a verification mechanism for machine-generated code -- pyright can validate dozens of AI-generated lines in seconds, replacing the need to manually trace every piece of data.

### Common Mistakes
- **Ignoring type errors because "the code works"**: Pyright errors are not suggestions -- they represent missing guardrails, and letting them accumulate leads to eventual crashes from undetected type mismatches.
- **Using `Any` everywhere to silence pyright**: Labeling everything as `Any` means pyright checks nothing, defeating the purpose of type checking entirely. Use the most specific type possible.
- **Disabling strict mode because it "has too many errors"**: Those extra errors represent real coverage gaps. Switching to basic or standard mode hides problems rather than solving them.
- **Treating types as an afterthought**: Writing all code without types and adding labels later as a chore leads to inaccurate annotations that describe intent rather than actual behavior.

### Connections
- **Builds on**: Lesson 4: Ruff -- Your Code Quality Guardian (ruff catches style and potential bugs; pyright catches an entirely different category -- type mismatches that ruff cannot see)
- **Leads to**: Lesson 6: Tests, Git, and the Complete Workbench (adds pytest as the third verification tool and combines ruff, pyright, and pytest into a single verification pipeline)
