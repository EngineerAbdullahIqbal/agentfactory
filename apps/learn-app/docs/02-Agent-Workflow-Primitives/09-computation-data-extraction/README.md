---
sidebar_position: 9
title: "Chapter 9: Computation & Data Extraction Workflow"
description: "Build Unix-styled Python utilities that process bank statements and prepare tax reports with 100% accuracy"
---

# Chapter 9: Computation & Data Extraction Workflow

> "If it's math, it belongs in a script. Period."

But here's what this chapter is _actually_ about: it's not about tax prep. Tax prep is the training ground. The real skill is knowing **when to trust AI computation and when to demand verified code** — when a quick prompt gives you a reliable answer, and when you need a tested script with known inputs and expected outputs. Every pattern you learn here transfers to invoice processing, payroll calculations, server log analysis, expense reports, and any domain where a wrong number has consequences.

Here's the rule of thumb you'll internalize: if the answer is one-time and low-stakes, prompt directly. If it's repeated, financial, or where being wrong costs you money or credibility, build the script and verify it. By chapter end, that won't be a rule you recite — it'll be an instinct you act on.

The underlying pattern — **describe the data problem, the agent writes executable code, you provide the verification criteria** — is the workflow primitive this chapter installs. You'll recognize it in invoice processing, log analysis, payroll scripts, and every domain where a wrong number has consequences. The tools change. The primitive doesn't.

## What You'll Build

By the end of this chapter, you'll have a personal toolbox of reusable utilities:

```bash
# Your workflow by chapter end:
cat ~/finances/2025/*.csv | tax-prep

# Output:
# MEDICAL: CVS PHARMACY: $456.70
# MEDICAL: WALGREENS: $234.50
# CHARITABLE: RED CROSS: $200.00
# BUSINESS: ZOOM SUBSCRIPTION: $179.88
#
# --- TOTALS ---
# Medical: $1,891.20
# Charitable: $1,550.00
# Business: $774.32
#
# POTENTIAL DEDUCTIONS: $4,215.52
```

You'll transform from someone who manually categorizes expenses (tedious and error-prone) to someone who builds verified automation tools that work every tax season.

## Prerequisites

**From Seven Principles Chapter**:

- You understand ALL Seven Principles conceptually
- You know why "Bash is the Key" matters (Principle 1)
- You know why "Verification as Core Step" prevents failures (Principle 3)

**From File Processing Chapter**:

- You can navigate directories (`cd`, `ls`, `pwd`)
- You've run basic Bash commands
- You understand the pipe operator (`|`) conceptually

**Technical Requirements**:

- Python 3.x installed (see setup below)
- Unix-like terminal (macOS, Linux, or WSL on Windows)
- Access to Claude Code or similar AI assistant
- A bank statement CSV export (most banks offer this)

**Python Setup** — verify Python is installed before starting Lesson 1:

```bash
# macOS / Linux:
python3 --version

# Windows (Command Prompt or PowerShell):
python --version
```

If you see a version number (3.x), you're ready. If not, install Python from [python.org](https://www.python.org/downloads/) or use your system's package manager:

- **macOS**: `brew install python`
- **Ubuntu/Debian**: `sudo apt install python3`
- **Windows**: Download from python.org and check "Add to PATH" during installation

:::note About the Claude Code Conversations
The conversations shown in this chapter are **illustrative** — they show the flow of interaction and the kind of output you should expect. Your actual Claude Code sessions will look different: the agent may choose different variable names, suggest alternative approaches, or structure its response differently. That's normal. Focus on the **pattern** (what you asked for and why), not the exact words the agent used.
:::

## Sample Data

Use this bank statement CSV throughout the chapter. Save it as `~/finances/sample-2025.csv`:

```csv
Date,Description,Amount
2025-01-02,STARBUCKS #1234,-5.75
2025-01-03,TRADER JOES #567,-87.32
2025-01-04,CVS/PHARMACY #1234,-45.67
2025-01-05,SHELL OIL STATION,-52.10
2025-01-06,NETFLIX SUBSCRIPTION,-15.99
2025-01-07,"AMAZON, INC.",-89.50
2025-01-08,WALGREENS #5678,-23.45
2025-01-09,DR MARTINEZ MEDICAL,-150.00
2025-01-10,WHOLE FOODS MKT,-62.18
2025-01-11,DR PEPPER SNAPPLE,-4.99
2025-01-12,UNITED WAY DONATION,-100.00
2025-01-13,SPOTIFY PREMIUM,-10.99
2025-01-14,OFFICE DEPOT #901,-89.50
2025-01-15,CVSMITH CONSULTING,-200.00
2025-01-16,TARGET STORE #442,-34.56
2025-01-17,RED CROSS DONATION,-50.00
2025-01-18,UBER TRIP,-18.75
2025-01-19,STAPLES #2233,-42.30
2025-01-20,CHEVRON GAS,-48.90
2025-01-21,PHARMACY RX PLUS,-67.80
2025-01-22,APPLE.COM/BILL,-9.99
2025-01-23,COSTCO WHSE #1123,-156.42
2025-01-24,ZOOM VIDEO COMM,-14.99
2025-01-25,DEPOSIT - PAYROLL,3200.00
2025-01-26,ATM WITHDRAWAL,-200.00
2025-01-27,VENMO PAYMENT,-35.00
2025-01-28,GOODWILL DONATION,-75.00
2025-01-29,HULU SUBSCRIPTION,-17.99
2025-01-30,PET SMART #890,-42.15
2025-01-31,INTEREST PAYMENT,2.47
```

This data includes traps you'll learn to catch: commas inside quoted fields (`"AMAZON, INC."`), false positives (`DR PEPPER`, `CVSMITH`), credits mixed with debits (`DEPOSIT`, `INTEREST`), and enough rows that you can't verify totals by eye. Your hand-calculated expense total (all 28 debits, excluding the two credits): **$1,751.29**.

## Chapter Structure

| Lesson | Title                                | Duration | Key Skill                              |
| ------ | ------------------------------------ | -------- | -------------------------------------- |
| 1      | From Broken Math to Your First Tool  | 30 min   | Build a Python utility from scratch    |
| 2      | The Testing Loop                     | 25 min   | Verify with exit codes and test data   |
| 3      | Parsing Real Data                    | 25 min   | Parse CSV with Python's csv module     |
| 4      | Your Permanent Toolkit               | 20 min   | Make scripts into permanent commands   |
| 5      | Data Wrangling                       | 30 min   | Categorize with regex pattern matching |
| 6      | Capstone: Tax Season Prep            | 40 min   | Generate tax-ready report              |

**Total Duration**: 170 minutes (~3 hours)

## Seven Principles in Action

This chapter applies the principles you learned in Chapter 6:

| Principle                               | How You'll Apply It                                  |
| --------------------------------------- | ---------------------------------------------------- |
| **P1: Bash is the Key**                 | Use `cat`, `find`, `xargs`, pipes as your foundation |
| **P2: Code as Universal Interface**     | Python scripts as reusable components                |
| **P3: Verification as Core Step**       | Zero-trust debugging with exit codes                 |
| **P4: Small, Reversible Decomposition** | Each lesson builds one composable skill              |
| **P5: Persisting State in Files**       | Aliases and scripts as persistent tools              |
| **P6: Constraints and Safety**          | Test data prevents production errors                 |
| **P7: Observability**                   | Exit codes make failures visible                     |

You won't memorize these as rules. You'll internalize them as habits — and then recognize them in every data workflow you run, not just tax prep.

## The Journey

**Lesson 1**: From Broken Math to Your First Tool

- Discover why Bash arithmetic fails with decimals
- Build sum.py — a Python script that reads numbers from stdin and calculates sums

**Lesson 2**: The Testing Loop

- Learn why exit code 0 doesn't mean "correct"
- Create test data with known answers to verify your scripts

**Lesson 3**: Parsing Real Data

- Understand why simple text tools (like awk) fail on real CSV
- Build a CSV parser with Python's csv module

**Lesson 4**: Your Permanent Toolkit

- Transform scripts into permanent commands via chmod, aliases, and shell config
- Close your terminal, open a new one, and your tools still work

**Lesson 5**: Data Wrangling

- Use pattern matching to categorize transactions (Medical, Charitable, Business)
- Handle false positives (Dr. Pepper is not a doctor)

**Lesson 6**: Capstone

- Orchestrate everything into a real-world tax preparation workflow
- Generate a report your accountant can use
- Process a full year of bank statements with one command

## Quick Start for Previous Chapter Graduates

Already comfortable with terminal basics? Here's what's new:

```bash
# Bash math FAILS with decimals (you'll discover why)
echo $((14.50 + 23.75))  # Error!

# Simple text tools FAIL on quoted CSV fields
echo '"Amazon, Inc.",-23.99' | awk -F',' '{print $2}'
# Output: Inc."  -- WRONG! Broke on comma inside quotes

# Python handles both correctly (you'll build this)
cat bank-statement.csv | python sum-expenses.py
# Output: Total: $2,456.78

# Pattern matching categorizes for taxes (you'll learn this)
cat bank-statement.csv | python tax-categorize.py
# Output: Medical: $1,891.20, Charitable: $1,550.00
```

## The Real-World Payoff

This isn't academic. By chapter end, you'll solve a real problem:

**Before this chapter**: Tax season means hours of manual work - opening each bank statement, hunting for medical expenses, trying to remember which "SQ *LOCALSTORE" was business vs personal.

**After this chapter**: Download your bank CSVs, run one command, get a categorized report. Every year. Forever.

The same pattern applies to any data extraction problem - expense reports, invoice processing, log analysis. You're learning to build tools, not just use them.


