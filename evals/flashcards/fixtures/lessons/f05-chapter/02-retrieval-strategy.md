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
