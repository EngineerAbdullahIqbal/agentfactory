### Core Concept

SDD separates planning from execution through four sequential phases—Research, Specification, Refinement, Implementation—where each phase produces a concrete deliverable and the spec becomes the source of truth that survives session restarts.

### Key Mental Models

- **Planning vs Execution Separation**: Vibe coding interleaves planning and execution in one conversation; SDD front-loads all planning so implementation becomes execution of a well-understood plan
- **Phase Gates Replace Approval Fatigue**: You review at transitions (after research, after spec, after refinement), not during every file edit—the spec already captures your intent
- **Spec as External Memory**: Conversations vanish on restart; spec.md persists—it captures accumulated decisions so every new session builds on documented state

### Critical Patterns

- Four phases in sequence: Research (parallel subagents) → Specification (written artifact) → Refinement (interview) → Implementation (task delegation with atomic commits)
- Each phase has a clear deliverable: research summaries, spec.md, updated spec, working committed code
- Skipping any phase produces a specific failure: no research = assumption-based spec, no spec = drifting implementation, no refinement = mid-implementation pivots

### Common Mistakes

- Thinking SDD is slower than vibe coding—SDD produces more durable artifacts in the same timeframe
- Confusing "specification" with "to-do list"—specs include constraints, success criteria, and architecture, not just tasks
- Expecting to run all four phases in one session—SDD is designed so the spec persists across sessions

### Connections

- **Builds on**: Why specs beat vibe coding (Lesson 1), constitution as governance (Lesson 3)
- **Leads to**: Deep-dives into each phase: Research (Lesson 5), Specs (Lesson 6), Refinement (Lesson 7), Implementation (Lesson 8)
