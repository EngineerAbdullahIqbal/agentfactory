### Core Concept

A verification-first workflow tests the entire pipeline with known data before processing real files. The capstone challenge: point Claude Code at a folder of bank statement CSVs and produce a categorized tax report with verified totals in 40 minutes. After the attempt, the lesson briefly calls back to the Seven Principles from Chapter 6 — not as a mapping exercise (students did that in Ch6 L9), but as a short bullet list showing where each principle surfaced naturally in the workflow.

### Key Mental Models

- **Verification-first orchestration**: Create test data with hand-calculated totals, verify the pipeline matches, then process real data. Trust is earned through proof, not assumption. The pipeline filters for debits only (`amount < 0`) before categorizing — credits and refunds are excluded so they don't inflate expense totals.
- **Seven Principles callback**: After the attempt, a brief bullet list shows where each principle surfaced in the workflow. This is a recognition exercise, not a new mapping — students already did the full mapping in Ch6 L9. The point is that the principles appeared without being forced.
- **Decisions over commands**: The agent writes all the code. The reader makes all the decisions that matter — when to trust output, when to redirect, and when to question what looks correct.

### The Reference Implementation's Placement and Realistic Struggle

The reference implementation is positioned after the Reflection section (inside a collapsed `<details>` block), so students attempt the capstone and reflect on it before seeing a worked example. This prevents the reference from becoming a shortcut to copy rather than a comparison point. The implementation shows a realistic failure: Claude Code initially categorizes DR PEPPER BOTTLING as a medical expense (matching "DR" as a doctor prefix). The totals come out wrong — $233.16 instead of the expected $228.17. The agent catches this itself during the verification step and fixes it by adding false positive guards and word boundary patterns. This is the point: the verification-first approach doesn't just protect against bugs in your code — it exposes bugs the agent introduces too. The test data was designed to contain exactly that trap.

### Critical Patterns

- **The verification-first prompt**: "IMPORTANT: First verify your approach with test data before touching real files." This phrase triggers the agent to build a test-first workflow.
- **CSV merging without duplicate headers**: `head -1 first.csv > combined.csv` then `tail -n +2 -q *.csv >> combined.csv` creates one file with a single header row.
- **Ambiguous transaction flagging**: Items that don't match any category or match multiple categories get flagged for human review rather than silently dropped or miscategorized.

### The Decisions That Mattered

The reflection section distinguishes what the workflow looked like from what the reader was actually practicing:

- **Verify before trusting.** The Vancouver Stock Exchange (Lesson 1) trusted truncated math for 22 months. Verifying with known totals before touching real data is the corrective discipline.
- **Catch the agent's mistakes.** Claude suggested awk for CSV parsing (Lesson 3). Catching that failure and redirecting — not just accepting output — is the actual skill.
- **Design for edge cases.** Dr. Pepper (Lesson 5) was $4.99 of categorization fraud, preventable only by thinking ahead about what could go wrong.
- **Make tools permanent.** A script you can't find is a script you'll rebuild from scratch.

### Common Mistakes

- Processing real data before verifying with test data — if the categorization logic is wrong, you won't know until you've already generated an incorrect report
- Not flagging ambiguous items — silently skipping uncategorized transactions means potential deductions are lost
- Treating the workflow as a one-time conversation — converting it into a reusable script (`./tax-prep.sh ~/finances/2026/`) means next year requires zero re-prompting

### Connections

- **Builds on**: All previous lessons — broken math (L1), testing loop (L2), CSV parsing and merging (L3), permanent toolkit (L4), false-positive guards and domain transfer (L5)
- **Challenge section**: Uses student grade data (not finance or server logs) to prove the workflow transfers to any domain — DR CHARLES is the "Dr. Pepper" of gradebooks, EXTRA CREDIT with 0 max points is the division-by-zero trap
- **Leads to**: More complex data workflows in later chapters
