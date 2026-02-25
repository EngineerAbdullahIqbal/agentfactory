### Core Concept

The refinement phase reverses roles—Claude asks questions and you answer—to surface hidden assumptions and design decisions that would otherwise become expensive mid-implementation pivots, with each ambiguity found saving roughly 10x the time it would cost to fix later.

### Key Mental Models

- **10x Cost Multiplier**: An ambiguity costs 5 minutes during spec writing, 10 minutes during interview, 30 minutes during coding, 2-4 hours after first commit, 8-16 hours in production—the later you find it, the more expensive the fix
- **Role Reversal**: In normal prompting you ask and Claude answers; in refinement Claude interrogates your unstated assumptions—this surfaces gaps you didn't know existed
- **Five Ambiguity Categories**: Data decisions, conflict resolution, pattern selection, failure recovery, and boundary conditions—a repeatable checklist for where assumptions hide

### Critical Patterns

- Trigger prompt: "Here's my spec. Use the ask_user_question tool to surface any ambiguities before we implement."
- Interview answers must persist as spec updates—three questions answered = three mid-implementation pivots prevented
- Stop interviewing when questions become repetitive, trivial, or about implementation details rather than design decisions

### Common Mistakes

- Thinking refinement means "Claude proofreading the spec"—it's Claude interrogating your unstated assumptions, not checking grammar
- Skipping refinement because the spec "feels complete"—the whole point is surfacing assumptions so natural you didn't think to write them down
- Getting annoyed by Claude's questions and cutting the interview short—annoyance often signals you haven't thought through those decisions

### Connections

- **Builds on**: Specification writing (Lesson 6)
- **Leads to**: Task-based implementation with refined, unambiguous specs (Lesson 8)
