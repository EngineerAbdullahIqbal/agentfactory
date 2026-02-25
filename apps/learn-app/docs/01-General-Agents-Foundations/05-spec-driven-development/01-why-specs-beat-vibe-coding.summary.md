### Core Concept

Vibe coding fails systematically for substantial work because three failure modes—context loss, assumption drift, and pattern violations—compound with each iteration. Specifications solve all three by front-loading the information Claude needs upfront rather than discovering it through conversation.

### Key Mental Models

- **Three Failure Modes**: Context loss (earlier decisions fade), assumption drift (reasonable defaults diverge from intent), and pattern violations (generated output ignores your standards)—these are diagnostic categories you apply to any broken AI interaction
- **Compounding Severity**: Failure modes amplify each other over turns—context loss leaves gaps, assumption drift fills them with wrong defaults, pattern violations make the defaults conflict with your architecture
- **Context Engineering Connection**: The three failure modes map directly to context engineering problems from Chapter 4—persistence, constraints, and working memory

### Critical Patterns

- Specifications prevent all three failure modes: written requirements persist (context loss), explicit constraints eliminate guessing (assumption drift), architecture documentation defines patterns (pattern violations)
- Ask Claude to list its assumptions after generating output—the questions it identifies are the outline of a specification
- The "How would I know if this failed?" test converts vague goals into measurable criteria

### Common Mistakes

- Blaming bad prompts for vibe coding failures—the problem is structural, not prompt quality
- Assuming specs are only for code—the report-writing example shows specs apply to any AI-assisted work
- Confusing "context loss" with "AI forgetting"—Claude still has the tokens, but newer instructions receive more weight

### Connections

- **Builds on**: Context engineering principles (Chapter 4)
- **Leads to**: The three SDD implementation levels (Lesson 2) and project constitutions (Lesson 3)
