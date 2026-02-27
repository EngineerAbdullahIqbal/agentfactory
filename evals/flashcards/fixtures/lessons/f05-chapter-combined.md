=== LESSON 1 ===

# Context Window Budgeting

Agents must budget context tokens deliberately. Treat context as a fixed resource.

A practical split is:

- 40% user task context
- 30% retrieved memory and docs
- 20% tool outputs
- 10% safety and policy constraints

When prompts exceed budget, teams often truncate oldest content first. This can fail when older constraints are still binding.

A better strategy is semantic compression:

1. Keep hard constraints verbatim.
2. Summarize low-risk narrative sections.
3. Drop redundant examples.

Token budgeting improves latency and reduces failure from instruction collisions.

=== LESSON 2 ===

# Retrieval Strategy Selection

Retrieval quality depends on query intent.

Use keyword retrieval when exact terms matter, such as IDs, error codes, and legal clauses.
Use vector retrieval when conceptual similarity matters, such as design patterns and architectural tradeoffs.
Use hybrid retrieval when both exact matches and semantic neighbors are needed.

A reliable strategy is two-stage retrieval:

1. Candidate generation (broad, high recall)
2. Reranking (precise, high precision)

Skipping reranking can flood the context window with loosely related chunks. Overly aggressive reranking can miss edge-case evidence.

Good systems monitor both recall@k and precision@k and tune thresholds by task class.
