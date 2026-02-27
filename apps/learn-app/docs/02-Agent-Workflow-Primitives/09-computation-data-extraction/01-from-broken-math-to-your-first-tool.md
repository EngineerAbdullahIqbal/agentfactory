---
sidebar_position: 2
title: "From Broken Math to Your First Tool"
chapter: 9
lesson: 1
duration_minutes: 30
layer: L1
description: "Discover why Bash arithmetic and LLM head-math both fail with decimals, then build your first reusable Python utility with Claude Code"
keywords:
  [
    "bash arithmetic",
    "decimal math",
    "python script",
    "stdin",
    "pipe operator",
    "LLM hallucination",
    "calculation accuracy",
    "single-purpose tool",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Recognizing Computation Boundaries"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can explain why Bash fails with decimals and why LLM arithmetic is unreliable at scale"

  - name: "Directing Agent-Built Scripts"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Communication"
    measurable_at_this_level: "Student can direct Claude Code to build a stdin-reading Python script that solves a computation problem"

  - name: "Understanding stdin/pipe Patterns"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can explain how the pipe operator connects Bash commands to Python scripts"

learning_objectives:
  - objective: "Explain why Bash arithmetic fails with decimal numbers and why LLM head-math is unreliable"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student predicts which calculations will fail in Bash and explains why asking AI to calculate is risky"

  - objective: "Direct Claude Code to build a Python script that sums numbers from stdin"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student successfully prompts Claude Code to create working sum.py and runs it on test data"

  - objective: "Trace data flow through a pipe from Bash command to Python script"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student can explain what happens in: cat expenses.txt | python sum.py"

cognitive_load:
  new_concepts: 5
  assessment: "5 concepts (Bash integer-only math, LLM prediction vs computation, stdin reading, pipe data flow, reusable scripts) at A2 ceiling"

differentiation:
  extension_for_advanced: "Research how bc and awk handle decimals, or ask Claude Code to add statistics (count, average, min, max) to sum.py"
  remedial_for_struggling: "Focus on two facts: Bash breaks on decimals, Python doesn't. Run the commands, see the difference. Don't worry about understanding every line of sum.py yet."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Computation Foundations and Testing"
  key_points:
    - "The rule 'if it is math, ask AI to write code that calculates — never ask AI to calculate' is the chapter's central principle and prevents hallucinated arithmetic"
    - "Bash integer-only arithmetic and LLM prediction-vs-computation are TWO different failure modes that converge on the same solution: Python scripts"
    - "The stdin/pipe pattern (cat data.txt | python script.py) is the Unix composability model students will use for every tool in this chapter"
    - "The Dr. Pepper/medical expenses opening scenario motivates the entire chapter — catching that trap requires computation tools, not just file processing"
  misconceptions:
    - "Students think LLM math failures are rare — they work for 3 numbers but fail silently at scale, which is exactly when accuracy matters most"
    - "Students confuse 'Bash truncates silently' with 'Bash errors on decimals' — both happen, but silent truncation (10/3 = 3) is more dangerous because there is no error message"
    - "Students may think sum.py is trivial — the value is not the script itself but the stdin/pipe composability pattern that makes it chainable with any Bash command"
  discussion_prompts:
    - "If you asked an AI to sum 100 expense amounts and it gave you a wrong total, would you notice? What makes silent math errors so dangerous for financial data?"
    - "The lesson says 'describe the data problem, not the implementation.' How is this different from the prompt patterns in the File Processing chapter?"
    - "Why does the script read from stdin instead of opening a specific file? What does that design decision enable?"
  teaching_tips:
    - "Start by having students actually type 'echo $((1.2 + 2.3))' in their terminals — seeing the error firsthand is more convincing than reading about it"
    - "The Bash works-vs-fails table and the silent truncation row (10/3 = 3) are worth putting on the board — truncation without error is the scarier failure"
    - "Make sure students complete the checkpoint (building and running sum.py) before moving on — Lesson 2 builds directly on this script"
    - "The pipe data flow diagram is the key conceptual model — draw it on the board and trace data through cat → pipe → stdin → sum.py → stdout"
  assessment_quick_check:
    - "Ask: 'Why should you never ask an AI to calculate your expenses directly?' — tests the prediction-vs-computation distinction"
    - "Ask students to explain what happens when you run 'cat expenses.txt | python sum.py' step by step — tests understanding of the pipe/stdin data flow"
    - "Ask: 'Bash says 10 divided by 3 equals 3. Is that an error or a feature?' — tests understanding of integer truncation"
---

# From Broken Math to Your First Tool

Bash commands files. `ls`, `find`, `mv`, `cp` — every file operation from the File Processing chapter ran through the same foundation. Now try this: type `echo $((14.50 + 23.75))` in your terminal. Syntax error. The tool that moved a thousand files can't add two prices. This is where Bash hits a wall and Python enters your Unix toolkit.

This chapter teaches you to build Python scripts that slot into your terminal exactly where Bash falls short — reading from stdin, writing to stdout, chaining through pipes. The agent writes the code. You make the decisions. By chapter end, you'll have a library of verified commands that process a full year of bank statements into a tax-ready report. (Along the way, you'll discover that a soda called Dr. Pepper keeps getting flagged as a medical expense — and build the tool that catches it.)

But first: your terminal can't even add decimals.

## Watch Bash Fail

Try this in your terminal:

```bash
echo $((47.50 / 3))
```

```
bash: 47.50 / 3: syntax error: invalid arithmetic operator
```

Bash's `$((...))` does **integer-only** arithmetic. Any decimal point is a syntax error. And when it doesn't error, it's worse — `$((10 / 3))` silently returns `3`, not `3.333...`. No warning. Just wrong.

Every financial calculation involves decimals. Bash simply cannot do them.

### The Stock Exchange That Lost Half Its Value

This isn't academic. In 1982, the Vancouver Stock Exchange launched a new index at 1000.000. Their software truncated to three decimal places instead of rounding — the same thing Bash does with `$((10 / 3))`. Every time a stock price changed (roughly 2,800 times per day), a tiny sliver of value vanished. No errors. No warnings. After 22 months, the index read approximately 524 — while its mathematically correct value should have been around 1009. They'd silently lost nearly half the index to truncation.

When they found the bug and corrected it over a weekend in November 1983, the index jumped from 524 to over 1098 overnight. The market hadn't crashed. The math had just been wrong — silently, invisibly, for almost two years.

That was truncation at three decimal places. Your Bash terminal does worse: `$((10 / 3))` truncates to _zero_ decimal places.

## The Head Math Trap

"Okay, Bash can't do decimals. I'll just ask my AI assistant to calculate it."

Here's the trap: **LLMs don't compute, they predict**. When you ask an AI to add `12.50 + 8.75`, it isn't running arithmetic. It's predicting what text should come next based on patterns. For three numbers, the prediction usually matches reality. For 100 numbers from your expense report, it almost certainly won't.

Asking an LLM to sum your monthly expenses is like asking a poet to recite a calculation from memory. They might get lucky, but you wouldn't bet your tax return on it.

The rule for this chapter:

> **If it's math, it belongs in a script. Don't ask AI to calculate. Ask AI to write code that calculates.**

| Approach                            | Reliability         | Why                              |
| ----------------------------------- | ------------------- | -------------------------------- |
| "What's the sum of these amounts?"  | Unreliable at scale | LLM predicts, doesn't compute    |
| "Write Python to sum these numbers" | Reliable            | Python executes, doesn't predict |

## Building Your First Python Unix Command

You have a file of expenses, one decimal number per line. You need the total. Bash errors out. LLM head-math hallucinates. You need code that executes — and you need it to behave like every other command in your toolkit: read stdin, write stdout, chain with pipes.

:::tip Challenge: 60 Seconds on the Clock
Before asking Claude for help, try to solve this yourself. You need to sum decimal numbers in the terminal. Bash's `$((...))` won't work. Can you find another way?

Hint: Try `echo "1.2 + 2.3" | bc` or `awk 'BEGIN{print 1.2 + 2.3}'`. What do you discover?

Both work for one-off calculations. But can you make either of them read a file of numbers and sum all of them? That's where the problem gets interesting — and where having an agent build you a proper tool starts to make sense.
:::

Open Claude Code and describe your problem:

```
I have a file with decimal numbers, one per line. Build me a script
that reads numbers from stdin and prints the total.
```

Watch what Claude Code does:

```
Claude Code: I'll create a Python script that reads numbers from
standard input and sums them.

[Creates: sum.py]

#!/usr/bin/env python3
# sum.py - Sum numbers from stdin
import sys

total = 0.0
for line in sys.stdin:
    line = line.strip()
    if line:  # Skip empty lines
        total += float(line)

print(f"Total: {total:.2f}")

Let me test it:

[Runs: echo -e "127.89\n45.50\n12.99" | python sum.py]

Total: 186.38
```

In seconds, you have a reusable tool. The agent didn't calculate in its head (which would hallucinate). It wrote code that executes. The script is a contract: given numbers, return their exact sum.

### What the Agent Built

Three lines make sum.py a Unix command: **`for line in sys.stdin`** reads piped input, **`float(line)`** converts text to decimals, and **`print(f"Total: {total:.2f}")`** writes the result to stdout. Your script doesn't know or care where the data came from — a file, another command, or typed input. It just reads lines and sums them.

### How the Pipe Connects Everything

When you run `cat expenses.txt | python sum.py`, the pipe takes whatever `cat` outputs and feeds it directly into your script's `sys.stdin`. Small tools, chained together — like LEGO bricks that snap together through pipes. A tool that reads stdin and writes stdout is **composable**: it connects to any other tool without modification. Every script in this chapter follows that design.

### And Sometimes a Script Is the Wrong Tool

Three receipts from lunch? Just ask the AI to add them — even if it's off by a cent, nobody cares. Same for one-off calculations on data you'll never see again. Scripts pay for themselves when data is too large to sanity-check manually, or when being wrong has consequences.

The rule: if the calculation is repeated, financial, or high-stakes, build the script and verify it. If it's one-time and low-stakes, prompt directly.

:::warning Stop. Do This Now.
Open Claude Code. Ask it to build sum.py. Run it on three numbers. Don't proceed to Lesson 2 until you see output in your terminal.

Use this prompt:

```
I have a file with decimal numbers, one per line. Build me a script that reads numbers from stdin and prints the total.
```

Then test it:

```bash
echo -e "100.50\n25.75\n14.25" | python3 sum.py
```

Expected output: `Total: 140.5`
:::

## Designing Unix Commands Through Prompts

The prompt you gave Claude Code was specific in two ways: it named the data format (decimal numbers, one per line) and it specified *stdin*. Those two details are what made the result a composable Unix command instead of a throwaway answer. The same underlying problem — sum decimal numbers — produces three different outcomes depending on how you ask:

| What you said                                                       | What the agent returned                         | Pipeable? | Works next month?          |
| ------------------------------------------------------------------- | ----------------------------------------------- | --------- | -------------------------- |
| "What's 127.89 + 45.50 + 12.99?"                                    | The answer: 186.38                              | No        | Gone after the chat        |
| "Write Python to sum 127.89, 45.50, 12.99"                          | A script for those specific numbers             | No        | Only those three           |
| "Build a script that reads numbers from stdin and prints the total" | `sum.py` — reads any input, composes with pipes | Yes       | Works on any data, forever |

The difference between row 1 and row 3 isn't effort — all three prompts take the same time to write. The difference is **what you're asking the agent to build**. Row 1 asks for an answer. Row 3 asks for a tool.

Two phrases made row 3 work:

- **"reads from stdin"** — signals you want something pipeable, not a hardcoded script
- **"prints the total"** — signals stdout, so the output can flow into the next command

This is the director's move: you describe the interface (data comes in via stdin, result goes out via stdout), the agent handles implementation. You never had to choose Python. You never had to know what `sys.stdin` is. You specified the outcome; the agent handled the how.

Throughout this chapter, every time you build a tool, you're making the same two decisions: what does the data look like coming in, and what does the result look like going out. Get those two things right and the agent builds something composable. Miss either one and you get a one-time answer you'll throw away.

## What You Actually Did

Step back and notice the strategy you just used, because you'll use it for the rest of this chapter:

1. **You described the data problem** — "I have numbers, I need a sum" — not the implementation. The agent chose Python. You didn't have to.
2. **You specified stdin/stdout** — which told the agent you wanted a composable Unix tool, not a one-time answer.
3. **You got a reusable script** — `sum.py` works on ANY file of numbers, not just the one you tested with.

This same approach works for any calculation: averages, maximums, counts, filters. Describe the data problem. Specify stdin. Get a tool.

Your script ran. It produced a number: 186.38. Exit code 0 — no errors, no red text. Everything looks fine.

But remember the Vancouver Stock Exchange. Their software ran without errors too. For 22 months. And the number it produced was half of what it should have been. Nobody noticed because the output _looked reasonable_.

How do you know 186.38 is right?

## Flashcards Study Aid

<Flashcards />

---

## Try With AI

### Prompt 1: Understanding the Bash Limitation

```
I just tried running `echo $((1.2 + 2.3))` in Bash and got a syntax
error. Can you explain why Bash can't handle decimal numbers in
arithmetic? What's happening under the hood that causes this?
```

**What you're learning:** The AI explains technical concepts you encountered through direct experimentation. Notice how it provides context about integer arithmetic and shell design decisions that you wouldn't find by staring at the error message alone.

### Prompt 2: Extend sum.py

```
I have sum.py that reads numbers from stdin and prints the total.
Can you modify it to also print:
- The count of numbers
- The average
- The minimum and maximum values

Keep the stdin reading pattern so it still works with pipes.
```

**What you're learning:** Iterative development with AI. You have a working tool and you're extending it with clear requirements. Notice how specifying "keep the stdin reading pattern" directs the architecture -- you're making design decisions, the agent handles implementation.

### Prompt 3: Handle Bad Input

```
My sum.py crashes when the input has a header line like "Amount"
before the numbers. How do I make it skip non-numeric lines
gracefully instead of crashing?
```

**What you're learning:** Collaborative debugging. You identify the limitation (crashes on headers), the agent suggests the fix (try/except). This is the refinement loop -- you provide real-world context about your data, the AI provides a robust solution.
