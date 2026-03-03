### Core Concept

The same financial formula written two ways produces categorically different AI analysis. **Coordinate-First modelling** (`=B14-(B14*$C$3)`) defines business logic by cell location — the agent must infer what the formula means by tracing grid positions and guessing at column headers. **Logic-First modelling** (`=Revenue_Y1 - (Revenue_Y1 * COGS_Pct_Y1)`) defines business logic by name — the agent reads the business rule directly from the formula and responds with confidence, context, and actionable recommendations. The quality gap between these responses is not incremental; it is categorical. No amount of prompt engineering can overcome a coordinate model's architectural limitation: the intent was never encoded.

### Key Mental Models

- **Coordinate-First vs Logic-First**: Coordinate-First asks "where is this number in the grid?" Logic-First asks "what does this number mean?" The same calculation, the same answer — but a fundamentally different level of information available to anything reading the formula.
- **Three Dimensions of the Quality Gap**: AI responses on coordinate models are hedged (low confidence), mechanical (no business context), and descriptive (no actionability). Named Range models produce definitive, analytical, and prescriptive responses — because the business rule is encoded in the formula.
- **Agent Capability Gap = Business Capability Gap**: Tokens spent on inference (tracing cells, guessing intent) are tokens not spent on analysis (identifying assumptions, running what-if scenarios, recommending actions). Model architecture determines what the agent can do.

### Critical Patterns

- The Named Range formula reads as a sentence; the coordinate formula reads as a grid reference. This is the test for whether a formula encodes business intent.
- The quality gap follows three measurable dimensions: confidence, business context, and actionability. These are not subjective — they appear consistently across any formula comparison.
- Intent Synthesis, Deterministic What-If, and Strategic Goal-Seeking all require Logic-First design. Coordinate models cannot support them because assumptions are not isolated and intent is not encoded.

### Common Mistakes

- Treating Named Ranges as a cosmetic improvement — they change what the AI agent can do, not just how the formula looks to humans
- Believing better prompts can compensate for coordinate formulas — the information gap is architectural, not a prompting problem
- Assuming Named Range Priority is the entire IDFA methodology — it is Guardrail 1 of four; later lessons cover LaTeX Verification, Intent Notes, and MCP Dependency

### Connections

- **Builds on**: Lesson 1 established Formula Rot as the problem — silent breakage, logic diffusion, reverse-engineering burden, and AI opacity; this lesson demonstrates the positive case by showing what Logic-First design enables
- **Leads to**: Lesson 3 introduces the Three Layers (Assumptions, Calculations, Output) — the structural architecture that organises Named Ranges into a coherent, auditable model
