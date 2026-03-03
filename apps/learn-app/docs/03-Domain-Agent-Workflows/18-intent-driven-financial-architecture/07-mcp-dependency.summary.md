## Core Concept

MCP Dependency (Guardrail 4) prohibits a Finance Domain Agent from performing calculations internally. The agent writes assumptions to Named Ranges via `write_cell`, Excel recalculates deterministically, and the agent reads results via `read_cell`. The result is the model's output, not the agent's estimate — a categorical distinction in finance where only deterministic model results are audit-valid.

## Key Mental Models

The **Write-Calculate-Read** workflow is the single interaction pattern: agent reasons about the input, writes it via MCP, Excel calculates, agent reads back the output. **Deterministic What-If** changes one or more assumptions and reads the cascading impact across all dependent outputs. **Strategic Goal-Seeking** reverses the direction — iterating write and read calls to find the input that produces a target output, without the agent ever solving the equation internally.

## Critical Patterns

The Excel MCP Server provides four tools: `write_cell(name, value)` to set assumptions, `read_cell(name)` to retrieve results, `inspect_model()` to map the model structure, and `read_formula(name)` to verify formula logic. The agent always writes to Named Ranges, never to cell coordinates. Every number reported to the user must trace to a `read_cell` call.

## Common Mistakes

The most dangerous violation is calculating internally then reporting the result as if the model produced it. Internal arithmetic may differ from the model due to rounding, conditional overrides, or stale values. The second mistake is solving goal-seeking algebraically instead of iterating through MCP. The third is reporting a number before calling `read_cell` — any number not read from the model is an opinion, not a fact.

## Connections

Guardrail 4 builds on Named Range Priority (Guardrail 1) — MCP writes to and reads from Named Ranges, not cell coordinates. It depends on the three-layer architecture (Lesson 3) for clean separation of assumptions from calculations. It directly enables Capability 2 (Deterministic What-If) and Capability 4 (Strategic Goal-Seeking) validated in the capstone (Lesson 11). The MCP protocol itself was introduced in Chapter 3 and used in Chapter 17 for Excel integration.
