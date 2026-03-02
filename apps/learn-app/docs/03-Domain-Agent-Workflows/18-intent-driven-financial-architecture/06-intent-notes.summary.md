### Core Concept

Every AI-generated formula in an IDFA-compliant model carries a permanent **Intent Note** — a structured five-field Excel Note documenting the business rule (INTENT), the verified mathematical expression (FORMULA), the Named Range dependencies (ASSUMPTIONS), the creation date (GENERATED), and the last modification date (MODIFIED). Intent Notes are not general comments; they are the third deterministic guardrail, designed to make business intent permanently visible at the cell level so that any reader — human or AI — can understand what a formula was designed to calculate without asking the person who wrote it.

### Key Mental Models

- **Divergence as Audit Trail**: When a formula is modified but the Intent Note is not updated, the mismatch between documented intent and actual formula becomes visible. This divergence is not a problem to fix — it is the audit signal itself. It tells auditors and analysts that something changed and needs investigation. Intent Notes do not prevent modifications; they make modifications visible.
- **Institutional Memory**: Intent Notes survive staff turnover, model updates, and layout changes because they travel with the cell they document. External documentation (separate files, emails, analyst memory) drifts from the model over time. Intent Notes are attached to the formula, making the business logic permanently accessible regardless of who originally built the model.
- **Cowork Pattern — Draft and Review**: Claude generates Intent Notes automatically by reading Named Range formulas and inferring business intent from the variable names and formula structure. The analyst reviews each note for accuracy, catching nuances the agent's structural reading may miss — particularly the business _why_ behind a formula, not just the arithmetic _what_.

### Critical Patterns

- The five-field format is non-negotiable: INTENT, FORMULA, ASSUMPTIONS, GENERATED, MODIFIED — each serves a distinct audit function
- Intent Notes complement LaTeX Verification (Guardrail 2): LaTeX proves the math is correct, the Intent Note records why the math exists
- The ASSUMPTIONS field enables automated dependency tracking — when an input changes, every formula listing that input in ASSUMPTIONS is flagged for review
- Intent Notes make Logic De-compilation (Capability 3 in the capstone) possible — agents reading both formula and Intent Note can reconstruct business logic as a structured narrative

### Common Mistakes

- Confusing Intent Notes with general cell comments — Intent Notes follow a specific five-field format designed for audit, not informal annotation
- Writing INTENT fields that describe the arithmetic ("this cell subtracts COGS from Revenue") instead of the business rule ("Gross Profit represents the margin after cost of goods, where COGS declines annually due to scale efficiency")
- Accepting AI-generated Intent Notes without review — Claude correctly identifies arithmetic from Named Range structure but may miss contextual business reasoning that only the analyst knows
- Omitting Named Ranges from the ASSUMPTIONS field — an incomplete dependency list breaks the traceability chain that makes Intent Notes valuable for audit

### Connections

- **Builds on**: Lesson 4 (Named Range Priority) established the self-documenting formula pattern; Lesson 5 (LaTeX Verification) established the mathematical verification checkpoint — Intent Notes add the business reasoning layer on top of both
- **Leads to**: Lesson 7 (MCP Dependency — Guardrail 4) completes the four guardrails by ensuring every agent-reported number comes from the model's deterministic calculation; Lesson 11 (Capstone) validates Logic De-compilation, which depends on Intent Note quality
