### Core Concept

The Unix philosophy: build small tools that each do one thing, then chain them with pipes. A monolithic script with 6 flags is impossible to test and impossible to debug. Three single-purpose scripts — each reading stdin and writing stdout — answer questions the monolith never could, because the pipeline changes while the tools stay fixed.

### Key Mental Models

- **The flag trap**: Every flag you add to a script multiplies the things that can go wrong. `sum-expenses.py --sum --average --count --threshold 100 --top --limit 5` is untestable because of flag interaction.
- **Decomposition reveals hidden architecture**: sum-expenses.py was secretly doing three jobs (extract column, filter negatives, sum). Breaking it apart doesn't add work — it reveals the composable architecture hiding inside.
- **Ignorance is a feature**: extract-column.py knows nothing about bank statements. It extracts a column from ANY CSV. The less a tool knows about its context, the more contexts it works in.
- **Same data, different questions**: `cat bank.csv | extract-column Amount | filter "< 0" | stats` gives expense totals. Change the pipeline to `filter "< -100" | stats` and you get large expenses only. Zero code changes.

### Critical Patterns

- Decomposition prompt: "Decompose [big script] into small tools that each do one thing. Each tool reads stdin and writes stdout so I can chain them with pipes."
- Three composable tools: `extract-column.py` (pulls one column from any CSV), `filter.py` (keeps numbers matching a condition), `stats.py` (prints sum, count, average, min, max)
- Pipeline verification: the pipeline output should match sum-expenses output — same answer through a different path proves both approaches are correct

### The Three Tools

| Tool | Usage | What It Does |
|------|-------|-------------|
| extract-column.py | `cat data.csv \| extract-column Amount` | Pulls one column by name or index |
| filter.py | `filter "< 0"` | Keeps numbers matching a condition |
| stats.py | reads numbers from stdin | Prints sum, count, average, min, max |

### Common Mistakes

- Thinking decomposition means more work — it means more flexibility with less debugging, because each tool is independently verifiable
- Making tools too specific (bank-only) instead of general (any CSV) — generic tools compose with everything
- Not verifying that the pipeline produces the same answer as the monolith — verification proves both approaches are correct
- Confusing "small script" with "limited script" — stats.py does five calculations but is still single-purpose because all five operate on the same input type

### Connections

- **Builds on**: sum-expenses.py from Lesson 3 — the monolith being decomposed
- **Principle connection**: P2 (Code as Universal Interface) and P4 (Small, Reversible Decomposition) — small tools become universal interfaces because their simplicity makes them context-independent
- **Leads to**: Tax categorization (Lesson 5) — your tools can extract, filter, and summarize, but they can't look at a merchant name and decide if it's medical, charitable, or business. That requires pattern matching.
