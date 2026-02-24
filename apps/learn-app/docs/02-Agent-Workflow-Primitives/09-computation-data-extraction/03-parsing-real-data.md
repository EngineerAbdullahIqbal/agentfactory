---
sidebar_position: 4
title: "Parsing Real Data"
chapter: 9
lesson: 3
layer: L2
duration_minutes: 25
description: "Direct Claude Code to build a CSV parser that handles the traps hiding in real bank statements"
keywords:
  [
    "CSV",
    "awk",
    "csv module",
    "structured data",
    "bank statement",
    "parsing",
    "data extraction",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Directing CSV Processing"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Data Processing"
    measurable_at_this_level: "Student can direct Claude Code to build a CSV parser that handles real-world edge cases"

  - name: "Understanding CSV Parsing Traps"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can explain why awk/cut fail on quoted CSV fields"

  - name: "Adapting Scripts to Personal Data"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Data Processing"
    measurable_at_this_level: "Student can modify a script to match their specific CSV column layout"

learning_objectives:
  - objective: "Direct Claude Code to build a CSV parser for bank statements"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student prompts agent to create sum-expenses.py that handles quoted fields"

  - objective: "Explain why simple delimiter-based tools fail on real CSV"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student identifies that quoted fields with commas break awk/cut"

  - objective: "Adapt a CSV parsing script to handle a specific bank format"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student modifies column references to match their bank's CSV layout"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (CSV quoting complexity, awk limitation, csv module) within A2 limit of 5"

differentiation:
  extension_for_advanced: "Add command-line column selection, explore csv.DictReader for named columns"
  remedial_for_struggling: "Focus on the conversation - watch how the agent recognizes and solves the CSV trap"

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Real Data and Permanent Tools"
  key_points:
    - "The CSV quoting trap (commas inside quoted fields breaking awk) is the canonical example of 'clean test data behaves, real data cheats'"
    - "The collaboration pattern is the lesson's real teaching: student discovers the failure (awk on AMAZON, INC.), agent provides the solution (csv module) — neither could solve it alone"
    - "Mentioning the edge case in your prompt ('some merchant names have commas') steers the agent to robust solutions instead of naive ones"
    - "The awk-vs-csv decision table is a practical tool: if data comes from outside your control, always use a proper CSV parser"
  misconceptions:
    - "Students think awk is always wrong for CSV — it works fine for tab-separated data and CSVs you control, only failing on external data with quoted fields"
    - "Students may not realize the bug is intermittent — awk works on rows without commas in fields and fails silently on rows with them, making it the worst kind of bug"
    - "Students assume Python's csv module is overkill for simple data — but the edge cases it handles (escaped quotes, different line endings) justify it for any external CSV"
  discussion_prompts:
    - "The awk command returned 'INC.' instead of an error. Why is a wrong value more dangerous than a crash for financial data?"
    - "You discovered the awk failure before asking the agent. How did bringing a specific failure example change the quality of the agent's response?"
    - "The lesson says 'if the CSV came from outside your control, use a proper CSV parser.' Why does the source of the data matter more than its apparent simplicity?"
  teaching_tips:
    - "Have students run the awk command on the AMAZON, INC. line themselves — seeing 'INC.' appear instead of '-89.50' is the lesson's central shock moment"
    - "Walk through the awk field-splitting diagram (4 fields instead of 3) on the board — visual learners need to see how the comma inside quotes creates a phantom field"
    - "The privacy note about bank CSVs is important — remind students they can remove account numbers before processing, or use the provided test data"
    - "Connect to Lesson 2's zero-trust philosophy: even this csv-module script should be verified with known-answer test data before running on real bank statements"
  assessment_quick_check:
    - "Give students the line '2024-01-07,\"AMAZON, INC.\",-89.50' and ask: what does 'awk -F, \"{print $3}\"' return and why?"
    - "Ask: 'When should you use awk and when should you use Python csv module?' — tests understanding of the decision table"
    - "Ask students to write a prompt that would steer the agent toward a robust CSV solution instead of a naive awk approach"
---

# Parsing Real Data

You download your bank statement, point sum-expenses at it, and get a number. It looks reasonable. You almost move on. Then something nags at you — that Amazon order was $89.50, but you can't find it in the output. You scroll through the CSV and spot the problem: `"AMAZON, INC."` — a comma hiding inside quotes. Your script just silently split that merchant name in half and summed the wrong column.

This is the wall that every real-world data task hits. Clean test data behaves. Real data cheats.

:::warning Checkpoint: Use YOUR Bank Data
Download your actual bank statement as CSV. Most banks offer this under "Download Transactions" or "Export" in online banking.

If your bank doesn't offer CSV export, use the test data below instead.

**Privacy note:** Your bank CSV may contain account numbers. Before processing, you can remove sensitive columns. The scripts only need the Description and Amount columns.
:::

## The Problem

Here's what a bank statement CSV looks like:

```csv
Date,Description,Amount
2024-01-02,Coffee Shop,-5.50
2024-01-03,Grocery Store,-127.43
2024-01-07,"AMAZON, INC.",-89.50
```

You need to sum the Amount column. Simple, right? Let's ask Claude Code.

## The First Attempt (Where Claude Gets It Wrong)

```
You: I have a bank statement CSV with Date, Description, and Amount
columns. Help me sum the Amount column.
```

```
Claude Code: I'll extract and sum the third column.

[Runs: awk -F',' '{if(NR>1) sum+=$3} END{print sum}' bank-statement.csv]

-133.43
```

The number looks plausible. But something nags you. That Amazon order was $89.50 — shouldn't the total be higher? You dig into the raw data and spot it:

```bash
echo '2024-01-07,"AMAZON, INC.",-89.50' | awk -F',' '{print $3}'
```

**Output:**

```
 INC."
```

That's garbage. Not `-89.50`. Not even close. awk split on EVERY comma, including the one inside the quoted field `"AMAZON, INC."`. It saw four fields instead of three:

1. `2024-01-07`
2. `"AMAZON`
3. ` INC."`
4. `-89.50`

Field 3 is ` INC."` — awk treated that as a number (silently becoming 0) and kept going. No error. No warning. Just a wrong total that looked reasonable enough to miss.

Try the rows WITHOUT quotes and they work fine:

```bash
echo '2024-01-02,Coffee Shop,-5.50' | awk -F',' '{print $3}'
```

**Output:** `-5.50` — correct. The trap only triggers on quoted fields. Some rows work, some silently fail. This is the worst kind of bug.

**This is a real Claude Code moment.** The agent gave you a working command — it ran, produced output, exited cleanly. But it was wrong. The agent doesn't know your data has commas inside quoted fields unless you tell it. This is where YOUR verification catches what the agent missed.

## Redirecting the Agent

Now bring your discovery back to Claude Code:

```
You: The awk approach breaks on rows like "AMAZON, INC." where
commas hide inside quoted fields. The total is wrong. I need a
solution that handles CSV quoting correctly.
```

```
Claude Code: You're right — awk treats every comma as a delimiter,
even inside quotes. I'll use Python's csv module which understands
quoting rules.

[Creates: sum-expenses.py]

#!/usr/bin/env python3
# sum-expenses.py - Sum the Amount column from bank statement CSV
import sys
import csv

total = 0.0
reader = csv.reader(sys.stdin)
next(reader)  # Skip header row

for row in reader:
    amount_str = row[2]  # Amount is 3rd column (index 2)
    amount = float(amount_str.replace('$', '').replace(',', ''))
    if amount < 0:  # Only sum debits (negative amounts)
        total += abs(amount)

print(f"Total expenses: ${total:.2f}")

[Creates: test_bank.csv]
Date,Description,Amount
2024-01-02,Coffee Shop,-5.50
2024-01-03,Grocery Store,-127.43
2024-01-07,"AMAZON, INC.",-89.50

[Runs: cat test_bank.csv | python sum-expenses.py]

Total: $222.43
```

Look at what just happened. The agent's first instinct (awk) was reasonable but wrong for your data. You caught the error through verification — the same pattern from Lesson 2. Then you told the agent *exactly what went wrong*, and it switched to the right tool. The agent knew about Python's csv module. You knew about your data. Neither could have solved this alone.

:::tip Why Filter for Negatives?
Notice the script checks `if amount < 0` before summing. Bank CSVs use negative numbers for debits (money out) and positive numbers for credits (refunds, deposits). Without this filter, a $500 refund would be counted as a $500 expense — silently inflating your total. This is the kind of bug that passes every test with expense-only data and breaks the moment real data includes a refund. If your bank uses a different convention (separate Debit/Credit columns, all positive amounts), tell Claude Code about your format and it will adapt the filter.
:::

**Python's csv module understands quoting rules.** It knows that commas inside quotes don't count as separators. The module handles:

- Quoted fields with commas inside
- Escaped quotes within quoted fields
- Different line ending styles
- Edge cases you haven't thought of yet

## When to Use Which

| Data Type | Use awk | Use csv module |
|-----------|---------|----------------|
| Log files with consistent delimiters | Yes | |
| Tab-separated data | Yes | |
| Data you control (no embedded delimiters) | Yes | |
| Bank exports | | Yes |
| Downloaded datasets | | Yes |
| Any external CSV | | Yes |

Rule of thumb: If the CSV came from outside your control, use a proper CSV parser.

## The Pattern

Here's the pattern for handling structured data:

```
"I have [structured data type]. Process [specific column/field].
Be careful - [edge case that could break naive parsing]."
```

Mentioning the edge case helps the agent choose robust solutions. Compare:

| Prompt | Agent's Likely Response |
|--------|------------------------|
| "Sum the third column of this CSV" | Might use awk (faster, simpler) |
| "Sum the Amount column. Some merchant names have commas" | Uses csv module (handles edge cases) |

The second prompt gives context that guides the agent to the right tool. You're teaching the agent about your data -- and the agent is teaching you which tools handle that data correctly.

Three lessons in, you've built two scripts that work and one habit that matters more than both of them: never trust output you haven't verified. That habit just saved you from a silent CSV parsing bug that the agent itself introduced.

Your scripts work. But try this: close your terminal, open a new one, navigate to a different folder, and run `sum-expenses`. You'll get "command not found." The script exists somewhere on your machine, and you can't use it without remembering the exact path. That's not a tool — that's a file you'll lose.

---

## Try With AI

### Prompt 1: Understand the CSV Trap

```
Show me what happens when I try to parse "AMAZON, INC.",-89.50 with awk.
Why does it give the wrong result? What does Python's csv module do differently?
```

**What you're learning:** How bringing a specific failure changes what the agent can give you. "Parse this CSV" produces a generic answer. "Parse this CSV — here's the line that breaks it" produces a targeted solution. The failure you discovered through verification is the input that directs the agent to the right tool. Your observation was the work; the agent's knowledge of csv module was the mechanism.

### Prompt 2: Extend the Parser

```
My sum-expenses.py works well. Can you modify it to:
1. Accept a column number as an argument (so I can sum any column)
2. Handle empty lines gracefully
3. Show how many transactions were processed

Keep the stdin pattern so it still works with pipes.
```

**What you're learning:** Iterative improvement. You have working code and clear requirements. The agent extends functionality while preserving the composable pattern.

### Prompt 3: Adapt to Your Bank Format

```
My bank's CSV has different column names than the example. The amount
column is called 'Debit' instead of 'Amount' and there's a separate
'Credit' column. How do I modify sum-expenses.py to handle my specific
bank format?
```

**What you're learning:** The most common director move in data work — you specify your data's actual schema (column name: 'Debit', not 'Amount'; separate credits column), the agent adapts the implementation. You don't need to know how csv.DictReader works. You need to know what your data looks like. That knowledge is yours; the implementation is the agent's.
