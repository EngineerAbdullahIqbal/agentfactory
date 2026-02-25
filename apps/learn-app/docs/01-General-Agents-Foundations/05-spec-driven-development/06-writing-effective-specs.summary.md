### Core Concept

Effective specifications combine PRD thinking (why we're building this) with SRS precision (how it should behave) using a four-part template, where constraints and measurable success criteria matter more than feature descriptions.

### Key Mental Models

- **Constraints > Requirements**: Constraints prevent Claude from making reasonable but wrong choices specific to your project—without them, Claude optimizes for the general case, which is almost never your case
- **Behavior, Not Implementation**: Describe what the system should do (O(1) user lookup, no duplicate IDs), not how to code it (use HashMap)—Claude often knows better implementation patterns
- **Testability Test**: Ask "How would I know if this failed?" to convert any vague goal into a measurable success criterion

### Critical Patterns

- Four-part template: Reference Architecture Analysis → Current Architecture Analysis → Implementation Plan → Implementation Checklist, plus Constraints and Success Criteria
- Checklist items must pass the "junior developer test"—if you can't explain the task in one sentence, it's not atomic enough for subagent delegation
- Each template section serves a distinct purpose: Reference shows what good looks like, Current shows where you are, Plan provides the path, Checklist enables task extraction

### Common Mistakes

- Writing HOW specs instead of WHAT specs—prescribing implementation details produces worse code than describing behavior
- Treating constraints as optional—without them, you get vibe coding with extra steps
- Writing vague success criteria like "works correctly" or "performs efficiently"—these can't be tested and let anything pass

### Connections

- **Builds on**: Research findings from parallel investigation (Lesson 5)
- **Leads to**: Refinement via interview to surface hidden ambiguities (Lesson 7)
