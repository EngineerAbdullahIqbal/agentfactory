# Failure History & Lessons

Every error becomes a rule. Review relevant sections before starting work.

---

## Content Failures

### 2025-11-18 Chapter 9: Wrong Pedagogical Layer

**Error**: Applied Layer 4 (Spec-Driven) thinking to a Layer 1 (Manual Foundation) chapter.

**What went wrong**:

- Did NOT read chapter-index.md to check Part number
- Did NOT verify what students know at this stage
- Assumed "no code examples" meant "teach specifications instead of syntax"
- Created 5 new lessons before user pointed out fundamental misunderstanding

**Rule**: Always check Part number via `ls -d` before assuming student knowledge level. Part 3 = students have NO programming yet.

---

### 2025-11-27 Chapter 14: Format Drift

**Error**: Taught wrong skill file format — flat file instead of directory structure.

**What went wrong**:

- Used flat file format instead of directory structure
- Missing YAML frontmatter
- Did NOT read Chapter 5 Lesson 7 which teaches correct format

**Correct format**:

```
.claude/skills/
└── skill-name/
    └── SKILL.md  # With YAML frontmatter
```

**Rule**: Always read canonical source for any pattern being taught.

---

### 2025-12-26 Content Quality (Chapter 2)

**Error**: Hallucinated facts, missing YAML frontmatter, weak "Try With AI" sections.

**What went wrong**: Bypassed subagent orchestration, wrote content directly.

**Rule**: NEVER write lesson content directly — always use content-implementer subagent.

---

### Content Quick Reference

- Confusing chapter and part numbers → `ch 11` ≠ `part 4` (always `ls -d` to discover)
- Skipping chapter README → Wrong pedagogical layer
- Skipping reference lesson → ALWAYS read a reference lesson first
- Teaching patterns without checking canonical source → Format drift
- Writing statistics/dates without web verification → Hallucinated facts
- Skipping full YAML frontmatter → Missing skills, learning objectives
- Minimal "Try With AI" sections → Quality degradation
- Multi-line description in agent YAML → Tool parsing breaks

---

## Platform & Code Failures

### 2026-01-15 DocPageActions: Reinventing the Wheel

**Error**: Implemented GitHub fetch when Turndown library already existed.

**What went wrong**: Started coding before researching existing solutions.

**Rule**: WebSearch for existing plugins/libraries BEFORE implementing any feature.

---

### 2026-02-04 Live Verification Before Commits (CRITICAL)

**Error**: Pushed ChatKit model picker + wrong import path to main without local testing — broke production for 3+ hours.

**What went wrong**: Made code changes, assumed they would work, committed and pushed without running the actual server.

**Rule**: NEVER commit to main branch without live verification:

1. Start the services yourself: `pnpm nx serve study-mode-api`, `pnpm nx serve learn-app`
2. Make a real request through the UI or API
3. Verify the full flow works end-to-end
4. Check logs for errors
5. Only then commit and push

**Especially critical for**:

- Import statements (modules may not exist in all environments)
- API/SDK features (documentation may not match installed version)
- Any changes touching startup/initialization code

**Don't assume user is running services** — start them yourself and test.

---

### 2026-02-10 Server Hot Reload Issues

**Error**: Server errors after code changes due to corrupted hot reload state.

**What went wrong**: Hot reload can leave server in inconsistent state, especially with async code.

**Rule**: When debugging server errors after code changes:

1. Kill all server processes completely: `taskkill /F /IM python.exe`
2. Restart fresh with `PYTHONUNBUFFERED=1` for immediate log output
3. Use `--log-level debug` when debugging
4. Clean restart fixes many "phantom" errors that appear after hot reloads

---

### Platform Quick Reference

- Implementing before researching existing solutions → Reinvented wheel
- Skipping edge case analysis → Missed rate limits, permissions
- Not considering testing context vs production → Browser automation behaves differently
- Writing configs from scratch → Search for tested templates FIRST
- Theoretical research → Reference ACTUAL tested examples, not invented configs

---

## Infrastructure Failures

- Bind mounts for database data → Use named volumes (Docker-managed)
- Not testing clean start → ALWAYS verify `docker-compose down -v && up -d` works
- Hook scripts before directory creation → Always `mkdir -p` before first log
- Skipping infrastructure verification → Add "verify clean restart" as explicit task

---

## Session Productivity Failures

### 2026-02-05 Usage Report: Systemic Patterns

These patterns were identified across 12,260 sessions:

| Anti-Pattern               | Evidence                                  | Impact                      |
| -------------------------- | ----------------------------------------- | --------------------------- |
| **Redundant file reading** | conftest.py 6x, schemas.py 5x per session | Wasted 40%+ tokens and time |
| **No completion criteria** | 336/344 sessions "partially_achieved"     | Work abandoned mid-flight   |
| **Broad interpretation**   | 309 "misunderstood request" instances     | Implemented wrong thing     |
| **Unstructured research**  | 5+ OpenClaw sessions with similar outputs | Redundant exploration       |

**Fixes integrated into workflow**:

- File Memory Protocol in CLAUDE.md
- Session Completion Protocol in CLAUDE.md
- Domain Term Clarification in CLAUDE.md
- Research templates in skills

---

### 2026-02-05 Redundant File Reading

**Error**: Read conftest.py 6+ times and schemas.py 5+ times in single sessions, wasting tokens and time.

**Rule**: Read each file ONCE per session. Create a mental summary immediately. Reference the summary, never re-read.

**Signs of violation**:

- Reading a file "to double-check"
- Opening a file "to see how it handles X" when you already read it
- Re-reading specs "to make sure I understood"

---

### 2026-02-05 Premature Session Termination

**Error**: 336 of 344 sessions ended "partially_achieved" — work abandoned mid-flight without clear stopping point.

**Rule**: Before starting ANY task, state: "This task is DONE when [specific deliverable]. Checkpoints at [milestones]."

**For multi-agent work**:

- Each agent must have clear exit criteria
- Parent agent must verify all child agents completed
- If session ends early, document: "STOPPED AT: [state] | NEXT: [action]"

---

### 2026-02-05 Intent Misinterpretation

**Error**: 309 "misunderstood request" instances — interpreted "model costs" as "remove model restrictions" instead of "tiered pricing per model".

**Rule**: When a term could mean multiple things, STOP and ask: "Do you mean (a) X or (b) Y?"

**Common ambiguities to catch**:

- "model costs" → pricing tiers vs access restrictions
- "fix this" → minimal fix vs refactor
- "improve" → which dimension?
- "chapter X" → chapter X vs part X

**Never interpret broadly when narrow interpretation exists.**

---

### Session Flow Quick Reference

- Asking questions and continuing → When blocked, SESSION ENDS with clear question
- Not using background tasks for SDD → Multi-phase work MUST use Task tool
- Context compaction mid-feature → Delegate to subagent before context bloats
- Losing original intent → Write spec.md before implementation
- Getting stuck on blockers → Escalate immediately, don't spin
- Moving to Done without completing → Only Done when ACTUALLY done
- Assuming success → Check return codes, file existence, test results

---

## Agent & Skill Failures

### 2025-11-29 Skill to Spec Bypass

**Error**: Wrote spec directly instead of using `/sp.specify`.

**What went wrong**:

- Used skill for brainstorming (correct)
- Then wrote `specs/*/spec.md` directly with Write tool
- Never invoked `/sp.specify`

**Rule**: Skills INFORM specs, they don't REPLACE the workflow.

---

### 2025-11-29 Folder Naming Inconsistency

**Error**: Used 3 different folder names for same feature.

**Rule**: Before creating any artifact:

```bash
find specs/ history/prompts/ -type d -name "*feature*" | head -1
```

---

### 2025-12-23 Subagent Deadlock

**Error**: Subagents waited for confirmation that never came.

**What went wrong**:

- Launched 12 parallel agents
- 2 included "Is this correct? Should I proceed?"
- Subagents cannot receive human confirmation

**Rule**: Always include "Execute autonomously without confirmation" in subagent prompts.

---

### 2026-02-03 Agent Tool Access

**Error**: Assumed agents without `tools:` field had NO tools.

**What went wrong**: Guessed framework behavior instead of verifying.

**Rule**: Omitting `tools:` = ALL tools. Verify framework behavior, don't assume.

---

### 2026-02-03 Skill References

**Error**: 7 agents referenced 9 non-existent skills.

**What went wrong**: Skills were removed but agent references weren't updated.

**Rule**: When removing a skill, grep all agents for references: `grep -r "skill-name" .claude/agents/`

---

### Agent Quick Reference

- Subagent prompts with "Should I proceed?" → Deadlock
- Letting agents infer output paths → Wrong directories
- Not using available skills → Check skills first, don't improvise
- Skills exist ≠ ready to execute → Skills describe what SHOULD happen

---

## Engineering Anti-Patterns

**Date**: 2026-02-04

Subtle conceptual errors of a "slightly sloppy, hasty junior dev":

| Anti-Pattern               | What It Looks Like                                      |
| -------------------------- | ------------------------------------------------------- |
| **Silent assumptions**     | Filling in ambiguous requirements without checking      |
| **Unmanaged confusion**    | Proceeding despite inconsistencies                      |
| **Missing clarifications** | Not asking when something is unclear                    |
| **Hidden inconsistencies** | Not surfacing conflicts you notice                      |
| **Unexplained tradeoffs**  | Making non-obvious decisions without presenting options |
| **No pushback**            | Implementing bad ideas without objection                |
| **Sycophancy**             | "Of course!" to clearly problematic approaches          |
| **Overcomplicated code**   | 1000 lines when 100 would suffice                       |
| **Bloated abstractions**   | Premature generalization                                |
| **Dead code left behind**  | Not cleaning up after refactors                         |
| **Scope creep**            | "Cleaning up" code orthogonal to the task               |
| **Uninformed deletion**    | Removing things you don't fully understand              |

Each has a corresponding workflow principle in `rules/workflow-principles.md`.

---

### Thinking Quick Reference

- Not checking existing patterns first → "How is this done in this project?"
- Overengineering → "What's the simplest solution that works?"
- Skipping to execution → Read architecture → Check dependencies → THEN execute

---

## Prevention Summary

1. Always read context first (chapter README, reference lesson, existing patterns)
2. Always use absolute paths for subagents
3. Always use `/sp.*` commands for workflows
4. Verify file exists after subagent writes: `ls -la [path]`
5. Research existing solutions before implementing (WebSearch first)
6. Live verify before committing to main (start services, test, then push)
7. Read files ONCE per session — summarize, then reference summary
8. Define "done" upfront — state deliverables before starting
9. Clarify ambiguous terms — ask before assuming
10. Always include "Execute autonomously without confirmation" in subagent prompts
11. Use `ls -d` to discover chapter/part paths — never guess
12. When removing skills, grep all agents for stale references
13. Use named Docker volumes, not bind mounts for database data
14. Always verify clean restart works (`docker-compose down -v && up -d`)
15. When blocked, escalate immediately — don't spin
16. Delegate to subagent before context bloats mid-feature
