### Core Concept

A project constitution (CLAUDE.md) defines immutable governance principles—architecture, quality, security, workflow—that Claude reads automatically every session, filling the gap between what specs describe (WHAT to build) and how everything must be built (HOW).

### Key Mental Models

- **Specs vs Constitution**: Specs describe features (blueprints for one building); constitutions define structural codes (rules every building must meet)
- **Two-Level Composition**: Global (~/.claude/CLAUDE.md) sets universal standards; project (./CLAUDE.md) adds project-specific rules and overrides global where they conflict
- **Governance Across Agents**: Subagents working in parallel produce consistent output not by communicating with each other, but by inheriting shared constitutional principles

### Critical Patterns

- Five standard categories: architecture principles, technology constraints, code quality standards, security requirements, workflow rules
- Constitution must exist before Phase 1 research begins—research without governance boundaries may explore incompatible patterns
- Include "why" explanations with rules so Claude can extend principles correctly to unanticipated situations
- Never update the constitution mid-task—finish current work under existing rules, then update for the next session

### Common Mistakes

- Treating the constitution as "just another spec"—it's governance, not feature description
- Thinking you need a huge constitution to start—begin small, grow incrementally as standards emerge
- Skipping the constitution because "specs are enough"—specs followed perfectly still produce wrong results when coding standards aren't defined

### Connections

- **Builds on**: Three SDD levels (Lesson 2), CLAUDE.md memory system (Chapter 3)
- **Leads to**: Four-phase workflow (Lesson 4), where constitution governs all phases
