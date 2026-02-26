# Spec-Driven Development Workflow

## SDD Levels (from Chapter 5)

| Level | Name               | When to Use                                                     | Artifacts                                                   |
| ----- | ------------------ | --------------------------------------------------------------- | ----------------------------------------------------------- |
| 1     | **Spec-First**     | ~80% of tasks. Quick features, bug fixes, single-session work   | Constraints + success criteria in a single lightweight file |
| 2     | **Spec-Anchored**  | Multi-session features, unclear requirements, learning new tech | Full artifact set: spec.md, progress.md, research/, adrs/   |
| 3     | **Spec-as-Source** | Experimental. Generated code from specs                         | Spec IS the implementation                                  |

### Decision Heuristic

Use SDD Level 2+ when ANY of these are true:

- `files_affected > 5`
- `requirements_unclear == true`
- `learning_new_tech == true`
- Work spans multiple sessions

Otherwise, Level 1 (lightweight spec or no spec) is sufficient.

### Lightweight Spec Pattern (Level 1)

```markdown
## [Feature Name]

**Constraints**: [what NOT to do]
**Success criteria**: [how to verify it works]
**Approach**: [1-3 sentences]
```

---

**The Four-Phase SDD Workflow (Level 2)** — front-load thinking so implementation becomes execution.

## Phase 1: Research (Parallel Subagents)

**Deliverable**: Written research summaries in `specs/<feature>/research/`

```
Spawn parallel subagents to investigate:
- Reference implementations
- Existing codebase patterns
- Best practices for this domain
```

## Phase 2: Specification (Written Artifact)

**Deliverable**: `specs/<feature>/spec.md`

Contains:

- What you're building and why
- Patterns discovered in research
- How this fits existing architecture
- Implementation approach with phases
- Explicit constraints (what NOT to build)
- Measurable success criteria

**Why written matters**: The spec becomes your **source of truth** that survives session restarts.

## Phase 3: Refinement (Interview)

**Deliverable**: Updated spec with ambiguities resolved

Use AskUserQuestion to surface design decisions:

- "Should we migrate existing data or start fresh?"
- "The research found two patterns. Which matches your constraints?"

## Phase 4: Implementation (Task Delegation)

**Deliverable**: Working code committed in atomic chunks

```
Implement @specs/<feature>/spec.md
Use the task tool and each task should only be done by a subagent
so that context is clear. After each task do a commit before you continue.
You are the main agent and your subagents are your devs.
```

---

## Artifact Structure (specs/<feature>/)

**All SDD artifacts live together per feature:**

```
specs/<feature>/
├── spec.md        # Specification (source of truth)
├── plan.md        # Implementation plan (from Plan Mode)
├── tasks.md       # Task breakdown
├── progress.md    # Session progress tracking
├── research/      # Research findings from Phase 1
│   ├── codebase-analysis.md
│   └── best-practices.md
├── notes/         # Subagent observations and decisions
│   └── <date>-<topic>.md
└── adrs/          # Architecture Decision Records
    └── 001-why-fastapi.md
```

**Key principle**: One folder = one feature = all context. Nothing scattered elsewhere.

## Progress Tracking (progress.md)

```markdown
# Feature: <feature-name>

## Current Phase

[Research | Specification | Refinement | Implementation]

## Session Log

| Date       | Phase          | Work Done          | Next Steps |
| ---------- | -------------- | ------------------ | ---------- |
| 2026-02-04 | Implementation | Tasks 1-5 complete | Tasks 6-8  |

## Blocked Items

- [Item]: [Reason] → [Who can unblock]

## Task Status

- [x] Task 1: Schema definition
- [x] Task 2: API endpoints
- [ ] Task 3: Tests
```

## When to Create specs/<feature>/

- Any work spanning multiple sessions
- Features with 5+ implementation items
- Content chapters (lessons as tasks)
- Anything needing rollback boundaries

---

## SpecKit Commands (Active)

| Command                | Purpose                              | When to Use            |
| ---------------------- | ------------------------------------ | ---------------------- |
| `/sp.specify`          | Create/update feature specifications | Starting new features  |
| `/sp.git.commit_pr`    | Autonomous git workflows             | Committing and PRs     |
| `/sp.phr`              | Record prompt history                | After significant work |
| `/sp.constitution`     | Update constitution                  | Governance changes     |
| `/sp.chapter`          | Research-first chapter creation      | New technical chapters |
| `/sp.taskstoissues`    | Convert tasks to GitHub issues       | GitHub issue tracking  |
| `/sp.autonomous`       | End-to-end autonomous SDD workflow   | Full feature execution |
| `/sp.adr`              | Architecture Decision Records        | Recording decisions    |
| `/sp.clarify`          | Resolve spec ambiguities             | After spec creation    |
| `/sp.checklist`        | Generate validation checklists       | Pre-commit/pre-publish |
| `/sp.reverse-engineer` | Reverse-engineer existing code       | Understanding legacy   |
| `/sp.git.sync-sso`     | Sync SSO changes                     | SSO deployments        |

**Native replacements for removed commands:**

- Planning: Use native Plan Mode (EnterPlanMode tool) instead of former `/sp.plan`
- Task management: Use native TaskCreate/TaskList/TaskUpdate instead of former `/sp.tasks`
- Implementation: Use subagent delegation via Task tool instead of former `/sp.implement`
- Analysis: Use Grep/Glob directly instead of former `/sp.analyze`
