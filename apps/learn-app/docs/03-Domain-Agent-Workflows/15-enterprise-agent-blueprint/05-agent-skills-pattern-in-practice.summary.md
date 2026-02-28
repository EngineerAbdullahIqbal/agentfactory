### Core Concept
This lesson presents a complete, annotated SKILL.md for a financial research agent — showing all three sections (Persona, Questions, Principles) working together as a coherent professional specification. The annotated example reveals the quality signals that distinguish a production-ready SKILL.md from a minimal or generic one. The SKILL.md is not a list of settings; it is a document where every design choice prevents a specific failure mode.

### Key Mental Models
- **Identity Constraint vs Rule**: "You are not an investment adviser" (identity) governs all contexts including unanticipated ones; "do not give investment recommendations" (rule) can be argued around in edge cases — encoding constraints as professional identity is more robust
- **Source Integrity**: Do not rely on training memory for specific financial figures; if a figure cannot be grounded in a connected data source or user-provided document, say so explicitly — this prevents confident fabrication of financial data
- **Uncertainty Calibration Vocabulary**: Four levels — "The data indicates..." (directly grounded), "Based on available data, it appears that..." (one inference step), "It is worth considering whether..." (hypothesis), "Never use confident declaratives for inferential conclusions" — gives both agent and user a shared, auditable vocabulary
- **Positive Out-of-Scope Redirection**: The out-of-scope section should not just refuse; it should tell users what to do instead — converting a boundary from a dead end into a routing mechanism

### Critical Patterns
- The Persona section is a functional specification that governs thousands of individual responses — vagueness here produces inconsistent agents
- The out-of-scope section does as much work as the in-scope list — missing out-of-scope boundaries produce confident-sounding outputs in areas where the agent has no grounded expertise
- Escalation principles must be specific (board presentations, transactions above £50M) not generic ("escalate complex matters") — specificity is what makes escalation auditable
- A production SKILL.md is 2-4x longer than the example, with more detailed data source specifications and a fuller escalation taxonomy — the example teaches architecture, not sizing

### Common Mistakes
- Reading "You are not an investment adviser" as a legal disclaimer rather than a Persona-section identity constraint that governs all behaviour
- Assuming a short SKILL.md is complete — the example is structurally complete but not exhaustively detailed
- Treating the four uncertainty calibration levels as arbitrary — they are a professional vocabulary that makes outputs auditable

### Connections
- **Builds on**: Lesson 2 taught the architecture of the three sections; this lesson shows all three working together in a production example
- **Leads to**: Lesson 6 covers the connector ecosystem that provides the data sources referenced in the Source Integrity principle
