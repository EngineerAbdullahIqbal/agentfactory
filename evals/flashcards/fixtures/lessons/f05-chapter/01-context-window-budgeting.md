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
