### Core Concept

Bash does integer-only arithmetic and LLMs predict text rather than compute — both will silently give you wrong numbers on financial data. The rule: never ask AI to calculate, ask AI to write code that calculates. Python scripts reading from stdin compose with pipes to solve any computation problem.

### Key Mental Models

- **Integer-only trap**: Bash's `$((...))` silently truncates (`10/3` = `3`) or errors on decimals. Every financial calculation involves decimals, so Bash arithmetic is never safe for real data.
- **Silent truncation is worse than an error**: The Vancouver Stock Exchange launched its index at 1000.000 in 1982. Software that truncated instead of rounding silently shed value roughly 2,800 times per day. After 22 months the index read approximately 524 — while its mathematically correct value should have been around 1009. When corrected in November 1983, the index jumped to over 1098 overnight. No errors, no warnings — just a wrong number that looked reasonable. Your Bash terminal truncates to zero decimal places, which is worse.
- **Prediction vs computation**: LLMs generate plausible-looking numbers by predicting text patterns, not executing math. Reliable for 3 numbers, unreliable for 100. "Fraud by algorithm" starts with trusting the wrong tool.
- **stdin composability**: Scripts that read from `sys.stdin` and write to `stdout` chain together with pipes. `cat data.txt | python sum.py` works because each tool handles one job.

### Critical Patterns

- Prompt pattern: "I have [data problem]. Build me a script that reads from stdin and [produces output]."
- Pipe data flow: `cat file | python script.py` connects file reading to Python processing
- The shebang line (`#!/usr/bin/env python3`) tells the OS which interpreter to use
- Describing the data problem (not the implementation) lets the agent choose the right approach

### Key Moment: Try bc/awk Yourself

Before going to Claude Code, the lesson challenges students to solve the decimal problem themselves using `bc` or `awk`:

- `echo "1.2 + 2.3" | bc` works for one-off calculations
- `awk 'BEGIN{print 1.2 + 2.3}'` also works

The challenge: can you make either one read a file of arbitrary numbers and sum all of them? That difficulty is what reveals why an agent-built tool with `sys.stdin` is the better answer — and makes the resulting script feel earned rather than handed over.

### Common Mistakes

- Using Bash for any calculation involving decimals — it either errors or silently truncates
- Asking the AI to "add these numbers" instead of "write a script that adds numbers" — the first hallucinates, the second executes
- Assuming a script is correct because it produced output — exit code 0 means "didn't crash," not "right answer" (the Vancouver Stock Exchange's software ran without errors for 22 months)

### Ending Transition

The lesson closes on an open question: the script produced 186.38 and exited cleanly, but how do you know that number is right? The Vancouver Stock Exchange anecdote is invoked a second time — their software also ran without errors, for 22 months, while producing a number that was roughly half of what it should have been. That question — "how do you know?" — is the bridge to Lesson 2: verification with test data.

### Connections

- **Builds on**: Terminal basics and pipe operator from Chapter 8 (File Processing)
- **Leads to**: Verification with test data (Lesson 2) — how do you know that number is right?
