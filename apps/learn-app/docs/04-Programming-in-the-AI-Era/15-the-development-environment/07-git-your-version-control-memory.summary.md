### Core Concept
This lesson completes the developer workbench by adding Git for version control and chaining all five tools (uv, ruff, pyright, pytest, Git) into a single verification pipeline. Code that passes linting, type checking, and testing can still be lost forever without version history -- Git closes this final gap by recording every change as a permanent, recoverable snapshot. The pipeline then ties all five tools into a single command that verifies and preserves code in one workflow.

### Key Mental Models
- **Version Control as Memory**: Git replaces fallible human memory with permanent digital checkpoints. Each commit is a snapshot you can return to, making every mistake reversible rather than catastrophic.
- **Pipeline as Infrastructure**: Connecting tools with `&&` turns verification from a mental checklist (which you can forget) into automated infrastructure that runs the same way every time, regardless of fatigue or distraction.
- **Ordered Verification (Cheap to Expensive)**: The pipeline runs lint first, then type check, then tests. This order catches the simplest and fastest-to-fix problems first, before investing time in slower behavioral checks.
- **Generate Then Verify Then Commit**: When working with AI-generated code, the developer's job is to run the verification pipeline and let the tools catch what reading alone cannot, then commit the verified result so it is never lost.

### Key Facts
- **Git uses a two-step commit process**: `git add` stages files, then `git commit` records the snapshot. Initialization with `git init` creates the repository but records nothing until the first commit.
- **The `&&` operator stops at first failure**: If ruff fails, pyright and pytest never run. This ensures you fix the earliest and simplest problem first.
- **Five tools complete the workbench**: uv (project management), ruff (linting), pyright (type checking), pytest (testing), and Git (version control) -- each enforcing a specific axiom.
- **`.gitignore` is created by `uv init`**: It excludes `.venv/` and `__pycache__/` from Git tracking. The `uv.lock` file should be committed for version reproducibility.
- **Axiom VIII**: Version control is memory -- Git makes every change reversible and the project's history permanent and searchable.
- **Axiom IX**: Verification is a pipeline -- the `&&` chain runs tools in order, stopping at the first failure.

### Critical Patterns
- Always run the full pipeline (`uv run ruff check . && uv run pyright && uv run pytest`) before committing, never just a subset of tools, because bugs hide in the gaps between tools.
- Commit after every meaningful change rather than working for hours without a checkpoint; small frequent commits are safer than large infrequent ones.
- When AI generates code, paste it into the project and run the pipeline, then commit the verified result -- the tools catch unused imports, missing type annotations, and behavioral edge cases that reading misses.
- Write descriptive commit messages that tell the story of what changed and why, not "wip" or "fix stuff."

### Common Mistakes
- **"Not committing early"**: Working for hours without a Git checkpoint means one crash, one bad edit, or one wrong turn destroys all progress with no recovery path.
- **"Skipping the pipeline"**: Running only some tools (e.g., pytest but not ruff, or ruff but not pyright) leaves entire categories of bugs undetected in the gaps between tools.

### Connections
- **Builds on**: Lesson 6: Testing With pytest (the third verification tool; this lesson adds the fourth tool and ties all five together)
- **Leads to**: Chapter 16: Reading Python -- where students begin writing actual Python code with the complete workbench already in place, using all five tools to verify every line they write
