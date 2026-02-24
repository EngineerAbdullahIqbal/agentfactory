# Agent Memory Basics

Agent memory has three layers:

1. **Episodic memory**: stores specific interaction events.
2. **Semantic memory**: stores stable facts and definitions.
3. **Procedural memory**: stores reusable action patterns.

A robust agent does not retrieve all memory at once. It runs a pipeline:

1. Filter candidate memories by scope and time.
2. Rank candidates by relevance score.
3. Select top results under token budget.
4. Inject selected context into the prompt.

The relevance score can combine keyword match and vector similarity. A simple weighted score is:

`relevance = 0.6 * semantic_similarity + 0.4 * keyword_overlap`

This relationship matters because high semantic similarity with zero keyword overlap can still indicate useful context, but pure keyword overlap often catches exact constraints like IDs or dates.

When the context window is tight, semantic memory should usually win over episodic memory unless the user asks about a specific previous decision. In troubleshooting workflows, procedural memory becomes more valuable because it captures step order and guardrails.
