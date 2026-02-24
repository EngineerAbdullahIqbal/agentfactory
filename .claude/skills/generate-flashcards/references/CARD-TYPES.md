# Card Types — Good and Bad Examples

Two kinds of cards. Each has a clear test for quality.

## Recall Cards

**Test**: Can a student who read the lesson answer this in under 5 seconds?

### Good Recall Cards

```yaml
# Direct question, atomic answer, self-contained
- id: "ch01-factory-paradigm-001"
  front: "In the Agent Factory model, what are the three pillars?"
  back: "1. AI Agents\n2. Cloud Infrastructure\n3. Business Model"
  tags: ["agent-factory", "pillars"]
  difficulty: "basic"

# Enumeration — count in the question, list in the answer
- id: "ch01-factory-paradigm-003"
  front: "What are the 4 elements of Industrialized Execution in the Agent Factory?"
  back: "1. Specs\n2. Reusable Skills\n3. Standard Tool Protocols (MCP)\n4. Cloud-native Infrastructure"
  tags: ["industrialization"]
  difficulty: "basic"

# Reversal — description as prompt, term as answer
- id: "ch01-factory-paradigm-005"
  front: "A methodology where human-written specifications are the source of truth and agents handle implementation"
  back: "Spec-Driven Development (SDD)"
  tags: ["sdd"]
  difficulty: "intermediate"
```

### Bad Recall Cards

```yaml
# BAD: Not self-contained — "three pillars" of what?
- front: "What are the three pillars?"
  back: "Agents, Infrastructure, Business Model"

# BAD: Yes/No question tests recognition, not recall
- front: "Is SDD the methodology where specs are the source of truth?"
  back: "Yes"

# BAD: Tests two concepts — split into two cards
- front: "What is SDD and what is MCP?"
  back: "SDD is spec-driven development. MCP is model context protocol."

# BAD: Compound question — "and" joins two distinct questions
- front: "What is a Golden Dataset, and what accuracy threshold is recommended?"
  back: "50+ real-world scenarios. 97%+ accuracy."
# FIXED: Split into two cards:
#   Card A front: "What is a Golden Dataset?"  back: "50+ real-world scenarios representing actual agent work."
#   Card B front: "What accuracy threshold is recommended before deploying an agent to production?"  back: "97%+"

# BAD: Answer is a paragraph — violates minimum information principle
- front: "What is a Digital FTE?"
  back: "A Digital FTE is an AI agent that functions as an autonomous employee,
    working 24/7 without breaks, capable of handling tasks that previously
    required human workers, and can be instantly cloned to scale operations
    exponentially rather than linearly."
# FIXED: back: "An AI agent built, hired, and priced like a human employee — working 24/7."

# BAD: Back has explanation — recall backs are JUST the fact
- front: "In the Agent Factory era, what do companies manufacture?"
  back: "AI employees — role-based systems that compose tools, spawn specialist
    agents, and deliver outcomes at scale."
# FIXED: back: "AI employees (Digital FTEs)"
```

## Thinking Cards

**Test**: Does answering this require the student to _think_, not just _remember_? If a parrot could answer it, it's not a thinking card.

### Good Thinking Cards

```yaml
# Scenario → reasoning required
- id: "ch01-factory-paradigm-002"
  front: "A startup builds great AI agents with solid cloud infrastructure, but revenue stalls. Why?"
  back: "Technology without a business model doesn't generate revenue. The Agent Factory requires all three pillars — agents, infrastructure, AND a model for selling verified outcomes."
  tags: ["agent-factory", "business-model"]
  difficulty: "intermediate"
  why: "What's the difference between selling outcomes and selling software subscriptions?"

# Causal mechanism — why did X happen?
- id: "ch01-factory-paradigm-004"
  front: "Why did open-source agent plugins trigger a trillion-dollar repricing in SaaS stocks?"
  back: "Autonomous agents proved they could deliver complex professional work that justified $200/month SaaS subscriptions, making seat-based pricing indefensible."
  tags: ["saaspocalypse"]
  difficulty: "intermediate"
  why: "Why were open-source plugins more threatening than proprietary ones?"

# Comparison — forces discrimination between concepts
- id: "ch01-factory-paradigm-006"
  front: "Old SaaS model vs. Digital FTE model: how does scaling differ?"
  back: "SaaS: Linear — hire more humans, buy more seats.\nDigital FTE: Exponential — clone the agent instantly. No seat, no UI, no training."
  tags: ["paradigm-shift", "scaling"]
  difficulty: "intermediate"
  why: "What happens to SaaS companies whose revenue depends on headcount growth?"
```

### Bad Thinking Cards

```yaml
# BAD: Just a recall card with "Why" stapled on — answer is a single fact
- front: "Why is SDD important?"
  back: "Because specs are the source of truth."

# BAD: Disguised recall — back is a memorizable before/after, not reasoning
- front: "How does the human role change from SaaS to the Agent Factory era?"
  back: "From operator to supervisor and verifier."
# This is a FACT, not reasoning. A parrot could memorize it.
# FIXED as recall: front: "In the Agent Factory, what is the human role?"  back: "Supervisor and verifier."
# FIXED as thinking: front: "Why does shifting from operator to supervisor require fundamentally new skills?"

# BAD: Formulaic front — sounds like an exam, not a flashcard
- front: "Why does the lesson argue that open-source AI models are critical?"
  back: "They prevent monopoly on intelligence."
# FIXED: front: "Open-source AI models are free, yet governments still build proprietary ones. Why?"

# BAD: Answer too short — no reasoning shown
- front: "A company's AI agents keep failing in production. What's the likely cause?"
  back: "No evaluation."

# BAD: Front is a reading exercise, not a thinking exercise
- front:
    "Given that a company has deployed agents using Claude Code with MCP integration
    and their specs follow the SDD methodology but they haven't implemented golden
    dataset evaluation and their shadow mode period was only 2 weeks, what is the
    most critical risk factor?"
  back: "Insufficient evaluation period."

# BAD: `why` just repeats the front in different words
- front: "Why did SaaS stocks crash?"
  back: "Open-source agents replaced expensive subscriptions."
  why: "Can you explain why the stock market reacted to open-source agents?"
```
