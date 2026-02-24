### Core Concept

Exit code 0 means "didn't crash," not "correct answer." The lesson opens with a hands-on challenge: a buggy script (`buggy_sum.py`) that silently skips any number whose first digit is 6, 7, 8, or 9. It produces `Total: 40.0` on input `10, 60, 30` — exit code 0, no errors, wrong answer. This visceral experience establishes the central problem: logic errors are completely invisible without deliberate verification.

### Key Mental Models

- **Verification paradox**: You need the script because you can't do the math yourself, but that means you can't verify the output. The trick: test with numbers you CAN add in your head (10 + 20 + 30 = 60).
- **Challenge-first discovery**: The buggy script teaches the lesson before the lesson explains it. Passing the test with `10, 20, 30` but failing with `10, 60, 30` proves that test data selection is non-trivial — "nice" test data hides bugs that real data exposes.
- **Zero-trust mindset**: Assume everything is broken until proven otherwise. The agent runs code — it doesn't validate business logic. You supply test data with known answers.
- **Exit code ≠ correctness**: A buggy script can silently skip data, produce wrong totals, and still exit with code 0. Logic errors don't crash — they lie.

### Critical Patterns

- Verification prompt: "Verify [tool] works correctly. Create test data with known answer [X] and check that output matches."
- Check exit codes with `echo $?` immediately after the command you care about — any intervening command overwrites it.
- Test multiple cases: integers, decimals, negatives, edge cases — different input types trigger different bugs.
- Division of labor: the human chooses the known-answer approach (only you know which numbers are easy to verify mentally); the agent creates and runs multiple test cases.

### The Zero-Trust Workflow

1. Agent generates and runs code — script executes, output appears
2. You request verification — "test this with known data"
3. Agent creates test cases — simple data with calculable answers
4. Comparison proves correctness — output matches expectation

### Common Mistakes

- Trusting exit code 0 as proof that a script works correctly — it only proves the script didn't crash
- Testing with only one case — a single passing test can miss entire classes of bugs (buggy_sum passes on `10, 20, 30` but fails on `10, 60, 30`)
- Running `echo $?` after an intervening command — any command between the one you're testing and `echo $?` overwrites the exit code
- Thinking verification is the agent's job — the human selects test data with known answers because only the human knows which results are easy to verify mentally

### Connections

- **Builds on**: sum.py from Lesson 1; zero-trust philosophy from Chapter 8 Lesson 2 (verify the backup is complete)
- **Leads to**: Real bank data with CSV quoting traps (Lesson 3) — the lesson ends by dropping the reader directly into the next problem: what happens when real-world data (commas in merchant names, dollar signs in amounts, header rows) hits a script built for clean numbers
