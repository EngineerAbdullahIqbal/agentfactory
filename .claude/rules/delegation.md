---
paths:
  - "apps/learn-app/docs/**/*.md"
  - ".claude/skills/**/*.md"
  - ".claude/agents/**/*.md"
---

# Delegation & Agent Orchestration

## Core Rule: Orchestrate, Don't Implement

Main session MANAGES work, agents IMPLEMENT work.

**Main session doing heavy work = guaranteed failure.** Context bloats, strategy lost, quality degrades.

## Delegation Hierarchy: Skill → Subagent → Agent Team

| Mechanism      | When to Use                                                                    | Coordination |
| -------------- | ------------------------------------------------------------------------------ | ------------ |
| **Skill**      | Atomic operation (analysis, evaluation, lookup)                                | None         |
| **Subagent**   | Focused task where only the result matters (Task tool)                         | Report back  |
| **Agent Team** | Complex work requiring discussion, collaboration, or shared state (TeamCreate) | Peer-to-peer |

**Decision rule:**

- Single analysis/generation → **Skill**
- Focused task, no inter-agent communication needed → **Subagent**
- 3+ parallel workers, or workers need to share findings/challenge each other → **Agent Team**

## When to Delegate (ALWAYS)

- Browser automation (Chrome MCP, web scraping)
- Multi-step execution (content creation, deployments)
- SDD phases (`/sp.specify` → native Plan Mode → native TaskCreate → agent delegation)
- Code implementation (new features, bug fixes)
- Long-running operations (anything > 5 minutes)
- Educational content (use content-implementer, educational-validator)

## Main Session ONLY Does

- Read requests and decide approach
- Plan delegation (which agent, what prompt)
- Spawn agents (Task tool for subagents, TeamCreate for teams)
- Read agent output files
- Verify quality before marking complete
- Report results to user
- Escalate when stuck

---

## Agent Teams (TeamCreate)

Use Agent Teams when parallel work requires coordination, shared task lists, or peer-to-peer communication.

### Best Use Cases

- **Research & review**: multiple agents investigate different aspects simultaneously
- **New modules/features**: agents each own separate files without conflicts
- **Debugging competing hypotheses**: agents test different theories in parallel
- **Cross-layer coordination**: frontend + backend + tests, each owned by different agent

### Team Workflow

```
1. TeamCreate → creates team + shared task list
2. TaskCreate → define all work items with dependencies
3. Task tool (with team_name) → spawn named teammates
4. TaskUpdate → assign tasks to teammates
5. Teammates work, claim next tasks when done
6. SendMessage (shutdown_request) → graceful shutdown
7. TeamDelete → clean up after all teammates finish
```

### Team Best Practices

- **3-5 teammates** for most workflows (diminishing returns beyond that)
- **5-6 tasks per teammate** keeps everyone productive
- **Zero file overlap** — each teammate owns different files
- **Named agents** — always refer to teammates by name, not ID
- **Require plan approval** for risky/complex tasks (`mode: "plan"`)
- **Idle is normal** — teammates go idle between turns, send a message to wake them
- **Don't broadcast** unless critical — DMs to specific teammates instead

### Subagents (Task Tool)

For focused tasks where only the result matters and no inter-agent communication is needed.

```
Main: "Feature request arrived"
Main: Task(subagent_type="Plan", prompt="Create spec for...")
Main: *reads spec.md, verifies quality*
Main: Task(subagent_type="general-purpose", prompt="Implement...")
Main: *reads output, verifies quality*
Main: "Work complete"
```

## Content Pipeline (Subagents)

**⛔ DIRECT CONTENT WRITING IS BLOCKED ⛔**

For **educational prose content** (lessons, chapters, modules), you MUST use subagents. Direct writing bypasses quality gates.

**Exempt from this rule** (direct writing allowed):

- Code files (`.py`, `.ts`, `.sh`, etc.)
- Skill definitions (`SKILL.md`)
- Specifications (`spec.md`, `plan.md`, `tasks.md`)
- Configuration files

| Phase      | Subagent                | Purpose                            |
| ---------- | ----------------------- | ---------------------------------- |
| Planning   | `chapter-planner`       | Pedagogical arc, layer progression |
| Per Lesson | `content-implementer`   | Generate with quality reference    |
| Validation | `educational-validator` | Constitutional compliance          |
| Assessment | `assessment-architect`  | Chapter quiz design                |
| Fact-Check | `factual-verifier`      | Verify all claims                  |

## Enforcement Rules

```
IF creating lesson/chapter content:
  1. MUST invoke content-implementer subagent (not write directly)
  2. MUST invoke educational-validator before marking complete
  3. MUST include absolute output path in subagent prompt
  4. MUST include quality reference lesson path
  5. MUST verify file exists after subagent returns: ls -la [path]

IF file doesn't exist after subagent returns:
  - Check agent definition (single-line description?)
  - Check Claude Code UI (/agents → All tools selected?)
  - Restart session if config was recently changed
```

**Why this matters**: Chapter 2 incident - bypassed subagent orchestration → 6 rewrites, 50%+ session wasted.

## Subagent Prompt Requirements

**Always include:**

```
Execute autonomously without confirmation.
Output path: /absolute/path/to/file.md
DO NOT create new directories.
Match quality of reference lesson at [path to high-quality example].
```

**Never include:**

- "Should I proceed?" (causes deadlock)
- Relative paths (causes ambiguity)
- Open-ended exploration (causes bloat)

## Agent & Skill YAML Format Requirements

**⚠️ Claude Code has STRICT YAML format requirements. Violations break parsing.**

**Parser Compatibility Note**: These constraints are specific to the current Claude Code parser (as of 2026-02). Standard YAML parsers prefer arrays (`["Read", "Grep"]`), but Claude Code requires comma-separated strings. If tools fail to load after platform updates, check parser compatibility first.

### Agent Format (`.claude/agents/*.md`)

Valid fields ONLY: `name`, `description`, `tools`, `model`, `permissionMode`, `skills`

```yaml
---
name: my-agent
description: Single line description here (max 1024 chars)
model: opus
tools: Read, Grep, Glob, Edit # Comma-separated, NOT array!
skills: skill1, skill2 # Comma-separated, NOT array!
permissionMode: default
---
```

**❌ WRONG formats that break parsing:**

```yaml
description: | # Multi-line breaks tool parsing!
  Long description
tools: # YAML array breaks tool access!
  - Read
  - Grep
color: red # Invalid field, ignored
```

### Skill Format (`.claude/skills/*/SKILL.md`)

Valid fields ONLY: `name`, `description`, `allowed-tools`, `model`

```yaml
---
name: my-skill
description: Single line description (max 1024 chars)
allowed-tools: Read, Bash(python:*), Write # Comma-separated
model: claude-sonnet-4-20250514
---
```

**❌ WRONG formats that may break:**

```yaml
version: "2.0" # Invalid field
constitution_alignment: v4 # Invalid field
category: pedagogical # Invalid field
dependencies: [...] # Invalid field
```
