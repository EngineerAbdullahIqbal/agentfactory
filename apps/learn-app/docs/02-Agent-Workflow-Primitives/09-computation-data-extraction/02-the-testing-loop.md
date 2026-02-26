---
sidebar_position: 3
title: "The Testing Loop"
chapter: 9
lesson: 2
layer: L2
duration_minutes: 25
description: "Discover why exit code 0 doesn't mean correct, then learn the verification pattern that catches silent bugs"
keywords:
  [
    "exit codes",
    "verification",
    "zero-trust",
    "debugging",
    "test data",
    "echo $?",
    "error handling",
  ]

skills:
  - name: "Directing Verification Workflows"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Quality Assurance"
    measurable_at_this_level: "Student can direct Claude Code to verify script output against known test data"

  - name: "Understanding Exit Codes"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Debugging"
    measurable_at_this_level: "Student can explain why exit code 0 means 'didn't crash' not 'correct answer'"

  - name: "Zero-Trust Verification Pattern"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Apply"
    digcomp_area: "Critical Thinking"
    measurable_at_this_level: "Student applies the pattern: create known data, run script, compare to expected"

learning_objectives:
  - objective: "Direct Claude Code to create test data and verify script correctness"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student prompts agent to test sum.py with known-answer data"

  - objective: "Explain the difference between 'exit code 0' and 'correct output'"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can identify when a script runs successfully but produces wrong results"

  - objective: "Apply zero-trust verification to new scripts"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student uses verification pattern on a different calculation script"

cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (verification workflow, exit codes, test data, zero-trust mindset) within A2 limit"

differentiation:
  extension_for_advanced: "Research other exit codes (127=not found, 130=Ctrl+C), write automated test scripts"
  remedial_for_struggling: "Focus on the conversation pattern: 'verify this with test data where I know the answer'"

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Computation Foundations and Testing"
  key_points:
    - "The verification paradox — you built a tool to do work you cannot easily check — is the motivating problem, and known-answer test data is the solution"
    - "'Exit code 0 means did not crash, not correct answer' is the single most important distinction in this lesson — students must internalize this before touching real data"
    - "The buggy_sum.py example (skipping numbers starting with 6-9) demonstrates that logic errors produce exit code 0 and no red text — completely invisible without verification"
    - "The zero-trust workflow (generate code → request verification → create test cases → compare) applies to ALL code from any source, not just scripts built in this chapter"
  misconceptions:
    - "Students equate 'no error message' with 'correct output' — the buggy_sum.py example directly disproves this by producing a wrong answer with exit code 0"
    - "Students think one passing test proves correctness — the buggy script passes the 10,20,30 test but fails on 10,60,30, showing that test data selection matters"
    - "Students may think verification is the agent's job — the lesson shows that the HUMAN chooses test data with known answers, because only the human knows which results are easy to verify mentally"
  discussion_prompts:
    - "The buggy script passes the test with 10, 20, 30 but fails with 10, 60, 30. What does this tell you about how to choose good test data?"
    - "If you cannot verify the answer yourself (say, summing 500 expenses), how can you still use known-answer testing? What would you do?"
    - "The lesson says 'trust is earned through verification, not granted through origin.' Does this change how you think about code from any AI tool?"
  teaching_tips:
    - "Have students run buggy_sum.py themselves and see exit code 0 alongside a wrong answer — the visceral experience of 'no error but wrong' is the lesson's core teaching moment"
    - "The exit code table is reference material, not the main point — spend more time on the verification pattern than on memorizing exit codes"
    - "Emphasize the division of labor: the agent creates multiple test cases (integers, decimals, negatives) but the human chose the known-answer approach in the first place"
    - "Connect back to Chapter 8 Lesson 2's verification pattern — 'verify the backup is complete' uses the same zero-trust philosophy applied to file counts instead of calculations"
  assessment_quick_check:
    - "Ask: 'Your script outputs 186.38 with exit code 0. How do you know if that number is right?' — tests whether students reach for verification, not just trust the exit code"
    - "Give students a buggy scenario: 'A filter script keeps numbers > 20 from input 10, 30, 50 but only returns 30.' Ask what they would check first"
    - "Ask students to recite the zero-trust verification workflow: generate, request verification, create test cases, compare"
---

# The Testing Loop

Unix commands return exit codes for a reason — they tell the next command in the pipeline whether to proceed. But exit code 0 only means "didn't crash." It says nothing about whether the answer is right. Here's a script that sums numbers from stdin, just like yours. Run it:

```python
# buggy_sum.py - Sums numbers from stdin
import sys

total = 0
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    if line[0] in '6789':
        continue
    total += float(line)

print(f"Total: {total}")
```

:::warning Challenge: Find the Bug
Save this as `buggy_sum.py`. Run it on these numbers:

```bash
echo -e "10\n20\n30" | python3 buggy_sum.py
```

Output: `Total: 60.0` — looks correct.

Now try:

```bash
echo -e "10\n60\n30" | python3 buggy_sum.py
```

What happens? Why? You have 90 seconds to figure it out before reading on.
:::

The output says `Total: 40.0`. The exit code is 0. No errors. No warnings. But the answer should be 100. The script silently skipped "60" because it starts with the digit '6'. Line 7 — `if line[0] in '6789': continue` — drops any number starting with 6, 7, 8, or 9.

And here's the uncomfortable part: **if you'd only tested with 10, 20, 30, you'd never have known.** The bug is invisible on "nice" test data. It only surfaces when your input includes numbers starting with high digits — exactly the kind of thing real financial data is full of.

This is the verification paradox. You built sum.py in Lesson 1. It ran. It produced a number. Exit code 0. But you have no evidence it's correct — you've been trusting code you never proved works.

In Chapter 8's file processing lessons, you learned to verify backups before deleting originals — the Safety-First Pattern from Lesson 2 drilled the habit of "check before you act." The same instinct applies here, except the stakes are different. A missing file is obvious. A wrong number is invisible.

## The Trick

What if you tested with numbers you CAN add in your head — but chose them deliberately to stress the code?

10 + 20 + 30 = 60. That's a start. But it only tests digits 1, 2, 3. Better: 10 + 60 + 30 = 100. Now you're testing a number starting with 6. Even better: test integers, decimals, AND negatives, because each type can trigger different bugs.

Open Claude Code:

```
You: I have sum.py that sums numbers from stdin. I want to verify it
works correctly. Create test data with known answers I can check
in my head. Include numbers starting with every digit 0-9, decimals,
and negatives.
```

```
Claude Code: Good idea -- thorough testing. Let me set that up.

[Creates: test_simple.txt with contents: 10, 20, 30]

[Runs: cat test_simple.txt | python sum.py]
Total: 60.0

Matches expected (60). Let me also test with decimals:

[Creates: test_decimals.txt with contents: 10.5, 20.5, 19.0]

[Runs: cat test_decimals.txt | python sum.py]
Total: 50.0

Matches expected (50). And negative numbers:

[Creates: test_negative.txt with contents: 100, -30, -20]

[Runs: cat test_negative.txt | python sum.py]
Total: 50.0

All three cases verified:
- Simple integers: 60.0 (correct)
- Decimals: 50.0 (correct)
- Negatives: 50.0 (correct)
```

Notice the division of labor. You asked for one test, and the agent volunteered two more — decimals and negatives. The agent creates multiple test cases. But YOU chose the verification approach — "known answers I can check in my head." That's the human contribution the agent can't make on its own. It doesn't know which numbers are easy for you to verify mentally.

But you can push this further. Instead of asking the agent to create test data for you to check, ask the agent to write the tests AND run them:

```
You: Write a test script that generates edge-case data for sum.py
(negatives, floats, empty lines, numbers starting with every digit 0-9)
and asserts the output matches expected values. Run it yourself.
```

Now the agent writes the tests, runs them, and reports pass/fail. Your job shifts from checking math in your head to reviewing the test plan: "Did it test the right edge cases?" That's a higher-leverage use of your attention — and closer to how real agentic workflows operate.

## Why Exit Code 0 Is a Lie

You already saw this with `buggy_sum.py` in the challenge above. But let's make it explicit, because this distinction will save you from silent bugs for the rest of your career.

Every command in Bash produces an exit code. Check it with `$?`:

```bash
echo -e "10\n60\n30" | python3 buggy_sum.py
echo $?
```

**Output:**

```
Total: 40.0
0
```

Exit code 0. No errors. No warnings. The answer is wrong — it should be 100 — but Bash says "success."

| What Exit Code 0 Means | What Exit Code 0 Does NOT Mean |
|---|---|
| The script ran without crashing | The script produced the right answer |
| Python didn't raise an exception | The logic is correct |
| The process terminated normally | Your data is intact |

**Exit codes catch crashes. They don't catch logic errors.** The buggy script from the challenge had perfect exit codes on every run. Only your test data — specifically, testing with numbers starting with 6, 7, 8, 9 — exposed the bug.

:::note Common Exit Codes (Reference)

| Code | Meaning | Example |
|------|---------|---------|
| 0 | Success — didn't crash | Script ran, output appeared |
| 1 | General error | Python raised an exception |
| 127 | Command not found | Typo in script name |
| 130 | Interrupted by Ctrl+C | You cancelled a long run |

`$?` holds the exit code of the **most recent** command — run `echo $?` immediately after the command you care about.
:::

:::note Why Your Totals Might Be Off by a Penny
Python uses floating-point math, which can produce surprises: `0.1 + 0.2` gives `0.30000000000000004`, not `0.3`. For the amounts in this chapter, `round(total, 2)` handles it — and you'll verify the result against known answers anyway. If you ever need penny-perfect precision across thousands of transactions, tell Claude Code: "Use Python's Decimal module for exact arithmetic." For now, `float` plus your verification habit catches any drift before it matters.
:::

### Your Python Scripts Return Exit Codes Too

The scripts you're building aren't just passive files — they're commands, and commands return exit codes. Right now, `sum.py` returns 0 when it works and 1 when Python raises an unhandled exception. But you can make that intentional:

```python
import sys

total = 0.0
lines_processed = 0

for line in sys.stdin:
    line = line.strip()
    if line:
        total += float(line)
        lines_processed += 1

if lines_processed == 0:
    print("Error: no numbers received", file=sys.stderr)
    sys.exit(1)

print(f"Total: {total:.2f}")
sys.exit(0)
```

Two things changed: `sys.exit(1)` signals failure when no input arrived, and the error message goes to `sys.stderr` — a separate output stream from `sys.stdout`. That matters for pipes: stderr messages appear in your terminal without polluting the data flowing to the next command.

```bash
echo "" | python3 sum.py
echo $?
```

**Output:**
```
Error: no numbers received
1
```

Now `$?` means something. A wrapper script or automation tool can check it and know whether to proceed. This is what makes your Python scripts behave like real Unix commands, not just files that happen to run.

## The Verification Pattern

Here's the prompt pattern that works every time:

```
"Verify [tool] works correctly. Create test data with a known answer
[X] and check that output matches."
```

This works because:

1. **Known answer first.** You calculate the expected result before running the tool.
2. **Simple test data.** Numbers you can add in your head (10 + 20 + 30 = 60).
3. **Multiple cases.** Test integers, decimals, negatives, edge cases.
4. **Comparison.** Output must match expectation exactly.

### Pattern Variations

| What You're Testing | The Prompt |
|---------------------|------------|
| Sum script | "Verify sum.py with test data 10, 20, 30 (expected: 60)" |
| Average script | "Verify average.py with test data 10, 20, 30 (expected: 20)" |
| Max script | "Verify max.py with test data 10, 50, 30 (expected: 50)" |
| Filter script | "Verify filter.py keeps only numbers > 20 from 10, 30, 50 (expected: 30, 50)" |

The tool changes. The verification pattern stays the same.

The division of labor here is worth noticing: the agent is fast at generating test cases and knows common failure modes (decimals, negatives, empty input). But only you know which answers are easy to verify in your head, and only you know that real bank data includes amounts starting with every digit 0-9. **You set the evidence criteria, the agent generates the evidence.** The human contribution isn't writing Python — it's knowing what "correct" looks like before the test runs.

## Checkpoint: Verify YOUR sum.py

Stop reading. Create a file called `test_simple.txt` with three numbers: 10, 20, 30. Run your sum.py from Lesson 1 against it. Does it say 60?

```
You: Create test_simple.txt with 10, 20, 30 on separate lines.
Then run: cat test_simple.txt | python sum.py
Expected output: Total: 60.0
```

If it says 60 -- your script works for simple integers. Now try edge cases:

```
You: Test sum.py with these edge cases:
1. Empty file (expected: 0 or 0.0)
2. Single number: just "42.5" (expected: 42.5)
3. File with blank lines mixed in between numbers
```

If any test fails, you've discovered a bug before it touched real data. Fix it now — Lesson 3 builds on a working sum.py.

You now have a verified script and a verification habit. That habit — test with known answers, check the math yourself, never trust exit code 0 — is more valuable than the script itself. The script handles numbers. The habit handles *everything you'll ever build*.

Human provides the evidence criteria. Agent generates the code and tests. Neither alone can guarantee correctness — and that division is not a limitation. It's the primitive.

Now try something. Download your actual bank statement as a CSV. Point sum.py at the amount column. Watch what happens when real-world data — with commas inside merchant names, dollar signs in amounts, and header rows that aren't numbers — hits a script that expects clean numbers, one per line.

---

## Try With AI

### Prompt 1: Discover Edge Cases

```
What edge cases might break a script that sums numbers from stdin?
Think about unusual inputs: empty files, non-numeric lines, very
large numbers, special characters. List cases I should test.
```

**What you're learning:** Getting the agent to surface failure modes you haven't considered. You ask for a list, not an answer. The agent contributes technical knowledge (dollar signs break float(), Unicode crashes, overflow is real). You contribute domain knowledge (which of these actually exist in your bank data). Between you, the test plan is more thorough than either could produce alone.

### Prompt 2: Automate Verification

```
I have 5 test cases for sum.py. Help me write a simple bash script
that runs all tests and reports which passed and which failed. Each
test should compare actual output to expected output.
```

**What you're learning:** Test automation. Instead of manually running tests one at a time, you build a script that runs them all and reports results. This is how professionals keep code correct over time.

### Prompt 3: Debug a Failure

```
My sum.py gives wrong output on this test:
- Input: 10, 60, 30
- Expected: 100
- Actual: 40

The script works fine on other inputs. Exit code is 0.
Help me find the bug. What could cause 60 to be skipped?
```

**What you're learning:** Collaborative debugging. You bring the evidence (expected: 100, actual: 40, exit code: 0). The agent brings mechanism knowledge (line[0] checks, digit ranges, why high-digit numbers get dropped). Neither can debug without the other: you needed to *observe* that 60 was skipped; the agent needed to *know* what code patterns produce that symptom.
