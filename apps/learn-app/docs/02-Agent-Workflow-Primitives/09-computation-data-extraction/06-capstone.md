---
sidebar_position: 7
title: "Capstone: Tax Season Prep"
chapter: 9
lesson: 6
layer: L2
duration_minutes: 40
description: "Watch Claude Code orchestrate a complete tax preparation workflow, then understand how all Seven Principles came together"
keywords:
  [
    "capstone",
    "workflow orchestration",
    "tax preparation",
    "expense categorization",
    "spec-driven",
    "seven principles",
    "CSV processing",
  ]

skills:
  - name: "Orchestrating Multi-Step Workflows"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Computational Thinking"
    measurable_at_this_level: "Student can direct Claude Code to execute a complete end-to-end workflow with verification"

  - name: "Principle Recognition"
    proficiency_level: "B1"
    category: "Conceptual"
    bloom_level: "Analyze"
    digcomp_area: "Reflective Learning"
    measurable_at_this_level: "Student can identify which Seven Principles appear in a given workflow"

  - name: "Verification-First Approach"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Quality Assurance"
    measurable_at_this_level: "Student insists on test data verification before processing real data"

learning_objectives:
  - objective: "Direct Claude Code to orchestrate a complete tax prep workflow from CSVs to report"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Student successfully prompts agent to produce categorized totals with verification"

  - objective: "Identify Seven Principles in action during workflow execution"
    proficiency_level: "B1"
    bloom_level: "Analyze"
    assessment_method: "Student correctly maps at least 5 principles to specific workflow steps"

  - objective: "Apply verification-first pattern to ensure accuracy before processing real data"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student requests test data verification before running on actual bank statements"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (workflow orchestration, principle mapping, verification-first) - reduced load for synthesis"

differentiation:
  extension_for_advanced: "Add date filtering, multiple currencies, generate CSV output for accountant"
  remedial_for_struggling: "Follow the conversation pattern exactly. The workflow is already structured."

teaching_guide:
  lesson_type: "capstone"
  session_group: 3
  session_title: "Data Wrangling and Capstone"
  key_points:
    - "The verification-first orchestration pattern (test data → verify → real data) is the capstone's central contribution — it combines every lesson into one disciplined workflow"
    - "All Seven Principles appeared naturally in a single workflow — presented as a brief callback to Chapter 6 rather than a full exercise, since students already did the mapping in Ch6 L9"
    - "The 'NEEDS REVIEW' section demonstrates that good automation flags ambiguity for human judgment rather than making silent decisions"
    - "The CSV merging technique (head -1 for header + tail -n +2 -q for data rows) is a practical Unix pattern students will reuse whenever combining structured files"
  misconceptions:
    - "Students think the capstone requires new skills — it actually requires orchestrating Lessons 1-5 in sequence, which is a different and harder challenge than learning each individually"
    - "Students may skip the verification step because they trust the categorizer from Lesson 5 — the capstone insists on verification with test data even for tools that worked before, because data changes"
    - "Students assume 'accountant-ready report' means perfect categorization — the NEEDS REVIEW section shows that flagging ambiguity is more professional than guessing"
  discussion_prompts:
    - "Why does the capstone insist on verification EVEN for the categorizer you already tested in Lesson 5? What could be different about the real data?"
    - "The report includes a NEEDS REVIEW section with 23 items. Is that a failure of the categorizer or a feature? Why?"
    - "Look at the before/after comparison table. Which capability do you think has the most impact outside of tax preparation?"
  teaching_tips:
    - "Let students attempt the capstone independently for 15-20 minutes before showing the reference implementation — struggling builds deeper understanding than following instructions"
    - "The Seven Principles mapping table is the chapter's culmination — walk through it and ask students to point to the specific moment in the workflow where each principle appeared"
    - "The reflection table (what it looked like vs what you actually learned) is a powerful closing tool — have students add their own row for what THEY learned that is not in the table"
    - "End by asking students to name one domain outside tax prep where the verification-first orchestration pattern would apply — this ensures transfer learning"
  assessment_quick_check:
    - "Ask students to describe the five steps of the capstone workflow from memory: test data, build categorizer, verify, process real files, flag ambiguous"
    - "Ask: 'Why does the workflow insist on verification BEFORE processing real files?' — tests understanding of verification-first as a principle, not just a step"
    - "Have students map at least 5 of the 7 principles to specific capstone steps from memory"
---

# Capstone: Tax Season Prep

You spent five lessons building tools. Each works. Each is verified. Now put them together.

From the very first lesson, the README promised you this:

```bash
cat ~/finances/2025/*.csv | tax-prep
```

That command doesn't exist yet. This lesson builds it — then shows you how the same pattern transfers to any domain you work in.

:::tip No bank CSV yet? Start here.

Ask Claude Code to generate realistic test data before doing anything else:

```
Generate a bank statement CSV with 20 transactions.
Include: CVS PHARMACY ($45.67), WALGREENS ($23.45), DR MARTINEZ MEDICAL ($150.00),
DR PEPPER SNAPPLE ($4.99), UNITED WAY DONATION ($100.00), OFFICE DEPOT ($89.50),
CVSMITH CONSULTING ($200.00), and 13 random transactions.
Use columns: Date, Description, Amount (negative for debits).
Save as ~/finances/test-2025.csv.
```

Calculate expected totals by hand BEFORE running anything:
- Medical (CVS + WALGREENS + DR MARTINEZ): $219.12
- Charitable (UNITED WAY): $100.00
- Business (OFFICE DEPOT): $89.50
- POTENTIAL DEDUCTIONS: $408.62

Those hand-calculated numbers are your verification baseline.
:::

## Step 1: Take Inventory

You have three tools in `~/tools`:

| Tool | What It Does |
|------|-------------|
| `sum.py` | Sums decimal numbers from stdin |
| `sum-expenses.py` | Extracts and sums the Amount column from bank CSVs |
| `tax-categorize.py` | Categorizes transactions, prints subtotals by category |

What's missing: a `tax-prep` command that adds a POTENTIAL DEDUCTIONS total and runs from any folder without typing `python3 ~/tools/...`.

## Step 2: Build tax-prep

Open Claude Code:

```
You: I have tax-categorize.py in ~/tools. It categorizes bank transactions and
prints subtotals by Medical, Charitable, and Business categories.

I want a tax-prep command I can run like this:
    cat ~/finances/2025/*.csv | tax-prep

It should do everything tax-categorize.py does, plus print a
POTENTIAL DEDUCTIONS total at the end (the sum of all category subtotals).
```

```
Claude Code: I'll update tax-categorize.py to include the final total,
then install it as a permanent tax-prep command.

[Updates: ~/tools/tax-categorize.py — adds POTENTIAL DEDUCTIONS sum]

#!/usr/bin/env python3
import sys, csv, re

CATEGORIES = {
    'medical': [r'\bCVS\b', r'\bWALGREENS\b', r'\bPHARMACY\b', r'\bMEDICAL\b'],
    'charitable': [r'\bDONATION\b', r'\bRED CROSS\b', r'\bUNITED WAY\b'],
    'business': [r'\bOFFICE DEPOT\b', r'\bSTAPLES\b', r'\bSUBSCRIPTION\b'],
}
FALSE_POSITIVES = [r'\bDR\.?\s*PEPPER\b', r'\bCVSMITH\b']

def categorize(description):
    desc_upper = description.upper()
    for fp_pattern in FALSE_POSITIVES:
        if re.search(fp_pattern, desc_upper, re.IGNORECASE):
            return None
    for category, patterns in CATEGORIES.items():
        for pattern in patterns:
            if re.search(pattern, desc_upper, re.IGNORECASE):
                return category
    return None

reader = csv.DictReader(sys.stdin)
totals = {}
items = {}
for row in reader:
    amount = float(row['Amount'].replace('$', '').replace(',', ''))
    if amount >= 0:  # Skip credits/refunds — only process debits
        continue
    cat = categorize(row['Description'])
    if cat:
        expense = abs(amount)
        totals.setdefault(cat, 0.0)
        items.setdefault(cat, [])
        totals[cat] += expense
        items[cat].append((row['Description'], expense))

for cat, entries in items.items():
    for desc, amount in entries:
        print(f"{cat.upper()}: {desc}: ${amount:.2f}")

print("\n--- TOTALS ---")
potential_deductions = 0.0
for cat, total in totals.items():
    print(f"{cat.title()}: ${total:.2f}")
    potential_deductions += total

print(f"\nPOTENTIAL DEDUCTIONS: ${potential_deductions:.2f}")

[Runs: chmod +x ~/tools/tax-categorize.py]
[Checks: echo $SHELL → /bin/zsh]
[Appends to ~/.zshrc:]
alias tax-prep='python3 ~/tools/tax-categorize.py'
[Runs: source ~/.zshrc]

Done. Try it:
cat ~/finances/test-2025.csv | tax-prep
```

## Step 3: Verify Before Touching Real Data

Run it on your test data (or the generated test file from the tip above):

```bash
cat ~/finances/test-2025.csv | tax-prep
```

**Expected output:**

```
MEDICAL: CVS/PHARMACY #1234: $45.67
MEDICAL: WALGREENS #5678: $23.45
MEDICAL: DR MARTINEZ MEDICAL: $150.00
CHARITABLE: UNITED WAY: $100.00
BUSINESS: OFFICE DEPOT #901: $89.50

--- TOTALS ---
Medical: $219.12
Charitable: $100.00
Business: $89.50

POTENTIAL DEDUCTIONS: $408.62
```

DR PEPPER SNAPPLE and CVSMITH CONSULTING are absent. The totals match your hand calculations. That's the verification. Now you can trust it on real data.

:::warning Checkpoint: Prove tax-prep Is Permanent

1. Close your terminal completely
2. Open a brand new terminal
3. Navigate to any folder: `cd ~/Desktop`
4. Run: `cat ~/finances/test-2025.csv | tax-prep`

If you see the report — your command is installed. If you see "command not found" — check your `~/.zshrc` alias.
:::

## Step 4: Process a Full Year

For multiple monthly statements, combine them first:

```bash
# Combine 12 months into one file (single header, all data rows)
head -1 ~/finances/2025/january.csv > ~/finances/combined-2025.csv
tail -n +2 -q ~/finances/2025/*.csv >> ~/finances/combined-2025.csv

# Run tax-prep on the full year
cat ~/finances/combined-2025.csv | tax-prep
```

Or skip the intermediate file entirely:

```bash
# Direct pipeline — no temp file needed
cat ~/finances/2025/*.csv | grep -v "^Date" | \
  { echo "Date,Description,Amount"; cat; } | tax-prep
```

The command from the README works exactly as promised.

## What Just Happened?

Remember the Seven Principles from Chapter 6? You just used all of them in one workflow — without a checklist, without thinking about it. That is the point. Principles are not rules you consult. They are habits you act on.

| Principle | Where It Appeared |
|-----------|------------------|
| **Bash is the Key** | `cat`, `head`, `tail`, pipes orchestrated all data flow |
| **Code as Universal Interface** | Python scripts executed computation — no hallucinated math |
| **Verification as Core Step** | Test data with hand-calculated totals BEFORE real files |
| **Small, Reversible Decomposition** | Five standalone tools, each testable independently |
| **Persisting State in Files** | Scripts in `~/tools`, report saved to a file |
| **Constraints and Safety** | False positive guards prevented miscategorized deductions |
| **Observability** | Every transaction printed before the totals section |

## Worked Example: Server Log Analysis

The same pattern — build tools, verify with known data, process everything — transfers to any domain with CSV data. Here's how it looks on server logs.

```
You: I have a folder ~/logs/2025/ with weekly server log CSVs
(week01.csv through week52.csv). Each has timestamp, endpoint,
status_code, response_time_ms.

Help me:
1. Categorize responses: Success (2xx), Client Error (4xx), Server Error (5xx)
2. Calculate error rates per category
3. Flag endpoints with unusually high error rates

IMPORTANT: Verify with test data before processing real logs.
```

```
Claude Code: Verify first — smart. Let me set up the workflow.

[Creates: test_week01.csv]
timestamp,endpoint,status_code,response_time_ms
2025-01-06T08:00:00,/api/users,200,45
2025-01-06T08:01:00,/api/orders,201,120
2025-01-06T08:02:00,/api/users,404,12
2025-01-06T08:03:00,/health,404,3
2025-01-06T08:04:00,/api/orders,500,5002
2025-01-06T08:05:00,/api/payments,200,89
2025-01-06T08:06:00,/api/payments,502,30001

Expected: Success=3, Client Error=2, Server Error=2

[Creates: log-analyzer.py]
[Runs verification against test data]

NEEDS REVIEW:
  - /health 404 (3ms) — health check failures are often expected during deployment

That /health 404 is the DR PEPPER of server logs. Adding it to known-benign patterns.

[Updates log-analyzer.py with KNOWN_BENIGN list]
[Re-runs — totals match]

Verified. Ready for real logs.
```

```
You: Verified. Process all 52 weekly files.
```

```
Claude Code:
[Runs: head -1 week01.csv > all-2025.csv]
[Runs: tail -n +2 -q week*.csv >> all-2025.csv]
[Runs: python log-analyzer.py all-2025.csv > ops-report-2025.txt]

SUCCESS (2xx): 847,892 requests (94.8%) — Avg 78.3ms
CLIENT ERROR (4xx): 38,456 requests (4.3%)
SERVER ERROR (5xx): 7,855 requests (0.9%)

HIGH ERROR ENDPOINTS:
  /api/payments — 8.2% error rate — INVESTIGATE
  /api/search — 6.1% error rate — INVESTIGATE

NEEDS REVIEW (31 items): /api/v1/legacy 503 (892x), /api/webhooks 408 (234x)...

Report saved: ops-report-2025.txt
```

Same five steps. Different domain. The /health 404 is the DR PEPPER of server logs — a false positive with a different name but the same solution. The pattern transferred completely.

## The CSV Merging Technique

The agent combined multiple CSVs without duplicating headers. Worth knowing for any multi-file workflow:

```bash
# Header from first file only
head -1 january.csv > combined.csv

# Data rows from ALL files (skip each file's header)
tail -n +2 -q *.csv >> combined.csv
```

| Command | What It Does |
|---------|-------------|
| `head -1` | First line only (the header row) |
| `tail -n +2` | Everything from line 2 onward (skips header) |
| `-q` | Quiet mode — no filename prefixes in output |
| `>>` | Append (don't overwrite) |

Result: one file, one header row, all data rows.

---

## The Victory

**Before Chapter 9:**

- Bash could not add decimals
- Asking AI to calculate felt risky (because it is)
- Manual spreadsheet work for any numerical analysis
- No systematic way to catch silent bugs in agent-generated code

**After Chapter 9:**

- You know when to prompt directly vs. when to build verified code
- You verify before you trust — regardless of the domain
- You catch the agent's mistakes before they become your mistakes
- You have tools in `~/tools` that work tomorrow, not just today

Tax prep was the exercise. The skill is knowing when a wrong number has consequences — and building the verification habit that catches it before anyone else does.

## Reflection: What You Are Actually Learning

The agent wrote all the code. You made all the decisions that mattered.

| What It Looked Like | What You Actually Learned |
|---------------------|--------------------------|
| Building sum.py | Directing agents to create tools *you* designed |
| Testing with known data | Trusting nothing until you have verified it |
| CSV parsing with Python | Redirecting an agent when its first approach fails |
| Spotting Dr. Pepper | Finding bugs in output that looks correct |
| Installing tax-prep | Assembling verified tools into a permanent workflow |
| Writing the prompts | Specifying outcomes and interfaces — the one contribution the agent cannot make for itself |

The specific tools (Python, regex, find/xargs) will change. The patterns will not. And the role — human as director, agent as implementer — will not change either.

---

## Try With AI

### Prompt 1: Add a NEEDS REVIEW Section

```
My tax-prep command categorizes transactions correctly. But some
transactions don't match any category — they're just silently ignored.

Modify it to print a NEEDS REVIEW section at the end listing all
uncategorized transactions with amounts, so I can review them manually.
```

**What you're learning:** A director decision disguised as a feature request. You're telling the agent the tool must make its own uncertainty visible rather than silently ignore it. "Print what you couldn't categorize" is not an implementation detail — it's a design principle you imposed. The agent wired the NEEDS REVIEW output; you decided that discarding uncategorized data silently was unacceptable. That call was yours.

### Prompt 2: Add Date Filtering

```
My tax-prep processes all transactions in the CSV. For quarterly
estimates, I need to filter by date range:

    cat finances.csv | tax-prep --start 2025-01-01 --end 2025-03-31

Add date filtering. Keep the stdin reading pattern so it still works
with pipes and cat.
```

**What you're learning:** Interface-first directing. Notice the prompt specifies exactly what the command should look like from the outside (`tax-prep --start 2025-01-01 --end 2025-03-31`) before mentioning implementation. You designed the interface; the agent wired argparse to match it. This is the same move as "reads from stdin and prints the total" in Lesson 1 — you specify the contract, the agent writes the code that fulfills it.

### Prompt 3: Transfer to Your Domain

```
I work with [your domain] data in CSV format. The data has
[describe columns]. I need to categorize it by [your categories]
and flag items that don't cleanly fit.

Apply the verification-first pattern: create test data with known
answers first, verify totals match before processing real files,
then build a permanent command I can reuse.
```

**What you're learning:** Full pattern transfer. You're applying the verification-first orchestration to a domain you actually work in. Notice which parts of the pattern carry over unchanged (verify first, flag ambiguous items, make it permanent) and which require domain-specific knowledge (your categories, your false positives).
