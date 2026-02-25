### Core Concept

Task-based implementation transforms Claude from a solo coder into an orchestrated development team: the main agent extracts tasks from the spec, delegates each to a fresh subagent with isolated context, and commits atomically after each task—creating rollback boundaries that single-session implementation cannot provide.

### Key Mental Models

- **Orchestrator vs Executor**: The main agent manages; subagents implement. "You are the main agent and your subagents are your devs" triggers this behavior mode
- **Context Isolation Solves Two Problems**: Agent Amnesia (progress lost on restart, solved by persistent spec + task list) and Context Pollution (accumulated errors contaminate later work, solved by fresh subagent context per task)
- **Backpressure Pattern**: Pre-commit hooks (typecheck, lint, test) act as quality gates that reject broken commits automatically—even when AI writes the code

### Critical Patterns

- Core prompt: "Implement @spec.md. Use the task tool, each task by subagent. After each task do a commit. You are the main agent and your subagents are your devs."
- Four task tools: TaskCreate (define), TaskUpdate (status), TaskList (progress), TaskGet (details)
- Tasks should be 5-15 minutes each—too granular creates coordination overhead, too large loses isolation benefits

### Common Mistakes

- Assuming subagents share context with the main agent—each starts completely fresh, which is the entire point
- Using task-based implementation for everything—a two-line bug fix doesn't justify the overhead of task extraction and subagent coordination
- Skipping pre-commit hooks—fast execution without validation means committing broken code faster

### Connections

- **Builds on**: Refined specification (Lesson 7), context isolation (Chapter 4, Lesson 9), Tasks system (Chapter 4, Lesson 4)
- **Leads to**: Decision framework for when to use SDD vs simpler approaches (Lesson 9)
