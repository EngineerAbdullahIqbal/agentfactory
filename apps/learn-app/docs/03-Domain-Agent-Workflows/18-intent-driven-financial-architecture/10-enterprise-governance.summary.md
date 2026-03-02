### Core Concept

Individual IDFA practice produces better models; organisational IDFA deployment without governance produces chaos — different naming conventions, inconsistent layer structures, Intent Notes in multiple formats. Enterprise governance solves this through four written artefacts: the **Standards Document** (specification of naming conventions, layer rules, LaTeX protocol, and Intent Note format — version-controlled, reviewed annually), the **Model Registry** (centralised record of every IDFA-compliant model with Intent Note Coverage % as the key compliance metric), the **Validation Protocol** (four formal checks — Named Range compliance, LaTeX verification, Intent Note completeness, and output accuracy — required before any model reaches a board or regulator), and the **Finance Domain Agent Standards Policy** (MCP dependency mandatory, Named Range modifications require Controller sign-off, all agent-generated formulas require LaTeX verification and Intent Notes before production, session logs retained 90 days minimum).

### Key Mental Models

- **Individual vs Institutional Compliance**: The IDFA skill from L09 makes one analyst compliant. The four governance artefacts make the organisation compliant. The difference is the difference between one good model and a portfolio of auditable models.
- **Intent Note Coverage % as a Leading Indicator**: This single metric — AI-generated formulas with Intent Notes divided by total AI-generated formulas — quantifies the gap between current state and full compliance without opening a single model file.
- **Sector Naming as Collision Prevention**: Domain prefixes (IB*, PE*, FP*, TR*, CR\_) are optional for single-domain teams but essential when models from different financial domains appear in the same reporting or consolidation context.

### Critical Patterns

- Governance artefacts map one-to-one to failure modes: inconsistent conventions (Standards Document), lost or unvalidated models (Model Registry), non-compliant models in production (Validation Protocol), uncontrolled agent behaviour (Agent Standards Policy)
- The Agent Standards Policy elevates Guardrail 4 (MCP Dependency) from a technical guardrail to an organisational policy — the distinction between an individual practice and an enforceable rule
- Named Range definitions (the structural skeleton) require approval to modify, while Named Range values (the assumptions) are freely writable by agents during analysis

### Common Mistakes

- Treating governance as optional documentation rather than enforceable specification — the Standards Document must be the authoritative reference that every analyst and agent follows
- Confusing Intent Note Coverage % with overall model quality — a model can have 100% coverage and still contain incorrect formulas; coverage measures documentation completeness, not correctness
- Applying sector prefixes inconsistently — either adopt them in the Standards Document for all models in a domain or do not use them; partial adoption creates more confusion than no adoption

### Connections

- **Builds on**: L04-L07 taught the four guardrails individually; L08 taught retrofitting; L09 made IDFA portable as a skill. This lesson synthesises all previous technical content into governance artefacts that work at the organisational level.
- **Leads to**: Lesson 11 (The Five Capabilities — Capstone) validates all five Finance Domain Agent capabilities on the model built throughout the chapter, using the governance framework from this lesson as the compliance standard.
