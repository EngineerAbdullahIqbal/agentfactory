### Core Concept
This lesson completes the developer workbench by adding the final two tools -- pytest for automated testing and Git for version control -- and then chains all five tools (uv, ruff, pyright, pytest, Git) into a single verification pipeline. The central idea is that code which passes linting and type checking can still do the wrong thing, and code that works today can be lost forever without version history; pytest and Git close those two remaining gaps, turning the workbench from a partial safety net into a complete discipline stack.

### Key Mental Models
- **Tests as Specifications**: A pytest `assert` statement is not just a check -- it is a machine-readable specification of what the code must do. `assert func(3) == 4` declares expected behavior in code, not in a document that drifts out of date.
- **Version Control as Memory**: Git replaces fallible human memory with permanent digital checkpoints. Each commit is a snapshot you can return to, making every mistake reversible rather than catastrophic.
- **Pipeline as Infrastructure**: Connecting tools with `&&` turns verification from a mental checklist (which you can forget) into automated infrastructure that runs the same way every time, regardless of fatigue or distraction.
- **Ordered Verification (Cheap to Expensive)**: The pipeline runs lint first, then type check, then tests. This order catches the simplest and fastest-to-fix problems first, before investing time in slower behavioral checks.
- **Generate Then Verify**: When working with AI-generated code, the developer's job is not to read every line hoping to spot problems -- it is to run the verification pipeline and let the tools catch what reading alone cannot.

### Key Facts
- **pytest discovers tests by naming convention**: Files starting with `test_` or ending with `_test`, and functions starting with `test_`, are found automatically without configuration beyond pyproject.toml.
- **pytest output characters**: `.` means passed, `F` means failed, `E` means error during setup/teardown, `s` means skipped.
- **`assert` is a plain Python keyword**: pytest requires no special assertion library or setup; the built-in `assert` keyword is all that is needed.
- **Git uses a two-step commit process**: `git add` stages files, then `git commit` records the snapshot. Initialization with `git init` creates the repository but records nothing until the first commit.
- **The `&&` operator stops at first failure**: If ruff fails, pyright and pytest never run. This ensures you fix the earliest and simplest problem first.
- **Five tools complete the workbench**: uv (project management), ruff (linting), pyright (type checking), pytest (testing), and Git (version control) -- each enforcing a specific axiom.

### Critical Patterns
- Always run the full pipeline (`uv run ruff check . && uv run pyright && uv run pytest`) before committing, never just a subset of tools, because bugs hide in the gaps between tools.
- Write tests alongside code rather than deferring them, because specifications fade from memory and late tests end up documenting bugs instead of intended behavior.
- Commit after every meaningful change rather than working for hours without a checkpoint; small frequent commits are safer than large infrequent ones.
- When AI generates code, paste it into the project and run the pipeline instead of visually inspecting it -- the tools catch unused imports, missing type annotations, and behavioral edge cases that reading misses.
- Read pytest failure output by focusing on the `>` line (which assertion failed) and the `E` lines (what the actual vs expected values were) to quickly locate the problem.

### Common Mistakes
- **"Testing later"**: Planning to add tests after the code stabilizes leads to tests that document existing bugs rather than original intent, because the specification has faded from memory.
- **"Not committing early"**: Working for hours without a Git checkpoint means one crash, one bad edit, or one wrong turn destroys all progress with no recovery path.
- **"Skipping the pipeline"**: Running only some tools (e.g., pytest but not ruff, or ruff but not pyright) leaves entire categories of bugs undetected in the gaps between tools.
- **"Manual testing only"**: Checking output by eye verifies one scenario one time, provides no regression protection, and creates no documentation of what "correct" means.

### Connections
- **Builds on**: Lesson 5: Pyright -- Your Type Safety Net (the second verification tool; this lesson adds the third tool and ties all five together)
- **Leads to**: Chapter 14.2: Reading Python -- where students begin writing actual Python code with the complete workbench already in place, using all five tools to verify every line they write
