### Core Concept
This lesson introduces pytest as the third verification tool in the discipline stack -- the one that checks whether code does what it is supposed to do. Ruff checks style and pyright checks types, but neither can verify that a function returns the correct value for a given input. pytest fills this gap using plain `assert` statements as machine-readable specifications of expected behavior, with automatic test discovery based on naming conventions.

### Key Mental Models
- **Tests as Specifications**: A pytest `assert` statement is not just a check -- it is a machine-readable specification of what the code must do. `assert func(3) == 4` declares expected behavior in code, not in a document that drifts out of date.
- **Naming as Configuration**: pytest discovers tests automatically through naming conventions (`test_` prefix for files and functions), requiring no configuration beyond what pyproject.toml already provides. Naming replaces setup.
- **Dots and Letters as Diagnostic Language**: Each test produces a single character (`.` for pass, `F` for fail, `E` for error, `s` for skip). Reading these characters is a core skill that provides instant project health at a glance.

### Key Facts
- **pytest discovers tests by naming convention**: Files starting with `test_` or ending with `_test`, and functions starting with `test_`, are found automatically without configuration beyond pyproject.toml.
- **pytest output characters**: `.` means passed, `F` means failed, `E` means error during setup/teardown, `s` means skipped.
- **`assert` is a plain Python keyword**: pytest requires no special assertion library or setup; the built-in `assert` keyword is all that is needed.
- **Failure output is structured**: pytest shows the exact line that failed (marked with `>`), the expected vs actual values (marked with `E`), and uses `-` for expected and `+` for actual in comparisons.
- **Axiom VII**: Tests are the specification -- pytest checks that code does what you specified it should do, not just that it runs.

### Critical Patterns
- Write tests alongside code rather than deferring them, because specifications fade from memory and late tests end up documenting bugs instead of intended behavior.
- Read pytest failure output by focusing on the `>` line (which assertion failed) and the `E` lines (what the actual vs expected values were) to quickly locate the problem.
- Use naming conventions (`test_` prefix) as the sole mechanism for test discovery -- no additional configuration or registration needed.
- Prefer `assert` over `print` for verification because assert statements create permanent, re-runnable specifications while print statements verify one scenario one time.

### Common Mistakes
- **"Testing later"**: Planning to add tests after the code stabilizes leads to tests that document existing bugs rather than original intent, because the specification has faded from memory.
- **"Manual testing only"**: Checking output by eye verifies one scenario one time, provides no regression protection, and creates no documentation of what "correct" means.

### Connections
- **Builds on**: Lesson 5: Pyright -- Your Type Safety Net (the second verification tool; this lesson adds the third)
- **Leads to**: Lesson 7: Git -- Your Version Control Memory (where tested code gets version-controlled and the full pipeline is assembled)
