### Core Concept

Real-world CSV data has commas inside quoted fields (like `"AMAZON, INC."`) that break simple tools like awk — silently producing wrong results with no error. Python's `csv` module understands quoting rules and handles these edge cases correctly. When data comes from outside your control, always use a proper CSV parser.

### Key Mental Models

- **The CSV parsing trap**: `awk -F','` splits on EVERY comma, including ones inside quotes. A field like `"AMAZON, INC."` becomes two broken fields. The worst part: some rows work fine, so the bug hides in plain sight.
- **Redirecting the agent when it fails**: Claude Code's first instinct was awk — a reasonable but wrong choice for this data. The reader caught the error through verification, then brought a specific failure example back to the agent. That specific description ("commas hide inside quoted fields") let the agent switch to the right tool.
- **Right tool for the job**: awk works for data you control (log files, tab-separated). For any CSV from an external source (bank exports, downloaded datasets), use Python's csv module.

### Critical Patterns

- Run the agent's output against edge-case data yourself — the awk failure only shows up on rows with quoted fields, not on clean rows
- When the agent's first approach fails, describe the exact failure: "The awk approach breaks on rows like 'AMAZON, INC.' where commas hide inside quoted fields. The total is wrong."
- `csv.reader(sys.stdin)` handles quoted fields, escaped quotes, and different line endings automatically
- Mentioning edge cases in your initial prompt guides the agent to choose robust tools over simple ones — "some merchant names have commas" steers away from awk before the failure ever happens

### Common Mistakes

- Splitting CSV on commas with awk or cut — this silently produces wrong results on any field containing a comma
- Accepting the agent's first output without verifying it against known values — the awk total looked plausible; only checking against a specific transaction exposed the bug
- Not mentioning known data quirks in your prompt — "sum the third column" might get awk; "sum the Amount column, some merchants have commas" gets csv module
- Forgetting that `next(reader)` skips the header row — without it, the header line gets processed as data
- Not filtering for debits before summing — bank CSVs mix negative amounts (debits) with positive amounts (credits/refunds). The script checks `if amount < 0` before summing to ensure only expenses are counted. Without this filter, a $500 refund silently inflates your expense total. If your bank uses a different convention (separate Debit/Credit columns, all positive amounts), tell Claude Code about your format and it will adapt

### Connections

- **Builds on**: sum.py (Lesson 1) and verification habit (Lesson 2) — the same "verify before trusting" instinct caught this silent bug
- **Leads to**: Making scripts permanent (Lesson 4) — the lesson ends with a concrete challenge: close your terminal, open a new one, and try to run `sum-expenses`. "Command not found" is the problem Lesson 4 solves
