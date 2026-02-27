### Core Concept
Chapter 10 begins when evolving query demands make loop-based CSV logic too brittle. Schema and relational constraints become the next required primitive.

### Continuity Bridge
- File Processing: Bash for file operations and orchestration
- Computation & Data Extraction: Python for deterministic parsing and computation
- Structured Data: SQLAlchemy + PostgreSQL for persistent relational truth

### Key Mental Models
- New question per loop is a scaling smell.
- Schema reduces ambiguity and bug surface.
- Braintrust/Vercel benchmark: SQL 100% accuracy/$0.51/45s vs Bash 52.7%/$3.34/401s on structured queries.
- Hybrid verification is selective and risk-based.

### Critical Patterns
- Escalate to SQL for multi-user, multi-year, relationship-heavy workloads.
- Keep SQL primary for structured queries.
- Use independent verification only for high-stakes outputs.

### Common Mistake
Patching CSV scripts with more loops instead of recognizing the structural ceiling. The fix is not better loops -- it is a different tool.