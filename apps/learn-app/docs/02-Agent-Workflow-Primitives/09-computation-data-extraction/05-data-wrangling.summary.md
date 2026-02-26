### Core Concept

Dr. Pepper is not a doctor. Simple keyword matching produces false positives that corrupt your data — and on a tax return, corrupted data is a fraudulent deduction. The lesson embeds a reader challenge: spot the bugs in the first categorizer output before they're revealed. Regex word boundaries (`\b`) match whole words only, and false-positive guard lists checked before categories prevent known bad matches. The workflow: build a naive version, discover it's wrong, then fix with precision. Then the lesson proves the entire pattern transfers to a completely different domain — server logs — where the `/health` endpoint returning 404 is the "Dr. Pepper" of server monitoring (expected behavior, not a real error).

### Key Mental Models

- **Iterate, don't anticipate**: Build a first version, run it, and find false positives yourself. Then fix them. This produces better results than trying to anticipate every edge case upfront.
- **Word boundaries as precision**: `\bCVS\b` matches "CVS PHARMACY" but not "CVSMITH." The `\b` marks word edges, turning broad matches into precise ones.
- **Guards-run-first ordering**: False positive patterns are checked BEFORE category patterns. Order matters — Dr. Pepper gets excluded before "DR" can trigger a medical match.
- **Errors have financial stakes**: A $204.99 inflation from two false positives is not an edge case. Multiplied across twelve months of bank statements, it's an incorrect tax return and a real liability.

### Reader Challenge

The lesson deliberately shows the buggy first output and stops — asking readers to spot the false positives before revealing them. This builds the inspection habit: the output "looks right" on casual review but contains two errors hiding in plain sight:

- `MEDICAL: DR PEPPER SNAPPLE: $4.99` — soda, not a doctor
- `MEDICAL: CVSMITH CONSULTING: $200.00` — a consultant, not CVS pharmacy

### Critical Patterns

- Categorization prompt: "Categorize [data] by [criteria]." Start simple, then fix false positives with: "[X] is showing up as [Y]. Fix it."
- Regex word boundaries: `r'\bKEYWORD\b'` for standalone word matching
- Batch processing: `cat folder/*.csv | python script.py` processes multiple files in one command (the capstone covers CSV merging with `head`/`tail` for multi-file workflows)
- **Extending categories without regex**: To add a new merchant, describe what should and shouldn't match — "Add TARGET PHARMACY to medical, but not TARGET by itself." The agent writes the regex; students describe the match/no-match criteria. Students never need to write regex themselves.

### Common Mistakes

- Trusting the first version of a categorizer without scanning the output for false positives — Dr. Pepper as "medical" inflates your tax deductions by $204.99
- Using `if 'CVS' in text` instead of `re.search(r'\bCVS\b', text)` — substring matching catches partial words like CVSMITH
- Processing files one at a time when `find | xargs` handles the batch automatically
- Not filtering for debits before categorizing — credits and refunds should be excluded before the categorization step, or a refund from CVS PHARMACY gets counted as a medical expense

### Connections

- **Builds on**: CSV parsing (Lesson 3) and permanent tools (Lesson 4)
- **Domain transfer**: The server logs section proves the workflow is not finance-specific — FALSE_POSITIVES became KNOWN_BENIGN, word boundaries became endpoint/status_code tuples, but the guard-before-categorize pattern is identical
- **Leads to**: The capstone (Lesson 6) assembles everything into one system: one conversation, one folder of bank statements, one report your accountant can actually use
