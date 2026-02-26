---
description: Execute autonomous end-to-end SDD-RI workflow with parallel subagents. Runs from specification through implementation and validation with minimal human intervention. Designed for content authoring and feature development at scale.
---

# /sp.autonomous: Autonomous Orchestration Mode (v1.2)

**Purpose**: Take the reins and **autonomously complete** a feature or content piece through the full SDD-RI workflow, leveraging parallel subagents, skills, and validators. Human only intervenes at critical gates.

**When to Use**: User says "autonomous mode", "take the reins", "ship it", or explicitly requests end-to-end execution.

---

## ⛔ ENFORCEMENT RULES (READ FIRST) ⛔

**Autonomous mode means EXECUTE fully, not SKIP or ABBREVIATE.**

### Rule 1: EVERY PHASE EXECUTES FULLY

- ❌ FORBIDDEN: Skipping /sp.clarify because "spec looks complete"
- ❌ FORBIDDEN: Outputting command names without executing them
- ❌ FORBIDDEN: Reducing content quality to "finish faster"
- ✅ REQUIRED: Execute each phase with full prompts, wait for completion

### Rule 2: QUALITY CANNOT BE TRADED FOR SPEED

- ❌ FORBIDDEN: Skipping validators to ship faster
- ❌ FORBIDDEN: Weak "Try With AI" sections (must have 3 prompts)
- ❌ FORBIDDEN: Missing YAML frontmatter (skills, learning_objectives required)
- ✅ REQUIRED: All validators must pass before commit

### Rule 3: SUBAGENT PROMPTS MUST BE COMPLETE

- ❌ FORBIDDEN: Short prompts like "write lesson 1"
- ✅ REQUIRED: Include absolute paths, quality reference, execution rules, requirements

### Rule 4: PROGRESS TRACKING IS MANDATORY

After each phase, report:

```
✅ PHASE [N] COMPLETE: [Phase Name]
   Output: [file paths created]
   Status: [PASS/FAIL with details]
   Next: PHASE [N+1]
```

### Rule 5: PHR CREATION IS NOT OPTIONAL

- PHRs MUST be created in Step 6.1 before commit
- Skipping PHRs because "we're almost done" is a FAILURE

---

## User Input

```text
$ARGUMENTS
```

---

<default_to_action>
In autonomous mode, you EXECUTE rather than propose. Each phase completes fully before proceeding. Use parallel subagents wherever possible. Only stop for critical approval gates.
</default_to_action>

<async_subagent_protocol>
**December 2025 Async Subagent Capabilities:**

Claude Code now supports **async subagents** that run in the background:

- Up to **10 concurrent subagents** with automatic queuing for more
- Each subagent has **isolated context window** (no cross-contamination)
- Background agents **wake up main agent** when complete
- Use **Ctrl+B** to send running agent to background

**Parallelization Strategy:**

- Phase 0-3: Sequential (need human approval gates)
- Phase 4 (Implement): **PARALLELIZE** lesson generation across subagents
- Phase 5 (Validate): **PARALLELIZE** validation checks

**Key Insight**: The main agent coordinates; specialists execute in parallel.
</async_subagent_protocol>

---

## The Autonomous Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTONOMOUS SDD-RI FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Phase 0: Context Analysis                                      │
│     ↓                                                           │
│  /sp.specify → Generate spec.md                                 │
│     ↓                                                           │
│  ⏸️ GATE: User approves spec (REQUIRED)                         │
│     ↓                                                           │
│  /sp.clarify → Resolve ambiguities (if any)                    │
│     ↓                                                           │
│  Native Plan Mode → Generate plan.md                            │
│     ↓                                                           │
│  ⏸️ GATE: User approves plan (REQUIRED)                         │
│     ↓                                                           │
│  Native TaskCreate → Generate tasks                             │
│     ↓                                                           │
│  Cross-artifact consistency check (Grep/Glob)                   │
│     ↓                                                           │
│  ⏸️ GATE: User approves tasks (REQUIRED)                        │
│     ↓                                                           │
│  Subagent delegation via Task tool (PARALLEL)                   │
│     ↓                                                           │
│  /sp.taskstoissues → Create GitHub issues (optional)            │
│     ↓                                                           │
│  Validators → Quality gates (PARALLEL)                          │
│     ↓                                                           │
│  /sp.phr → Document all phases with PHRs (MANDATORY)            │
│     ↓                                                           │
│  /sp.git.commit_pr → Commit and create PR                       │
│     ↓                                                           │
│  ✅ COMPLETE: PR ready for review                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Orchestration State

```json
{
  "mode": "autonomous",
  "orchestration_id": "[timestamp]-[feature-slug]",
  "feature_slug": null,
  "current_phase": 0,
  "parallel_agents_active": 0,
  "max_parallel_agents": 10,
  "phase_status": {
    "phase_0_context": "pending",
    "phase_1_spec": "pending",
    "phase_1_approved": false,
    "phase_1_clarify": "pending",
    "phase_2_plan": "pending",
    "phase_2_approved": false,
    "phase_3_tasks": "pending",
    "phase_3_analyze": "pending",
    "phase_3_approved": false,
    "phase_4_implement": "pending",
    "phase_4_parallel_tasks": [],
    "phase_5_validate": "pending",
    "phase_5_validators": [],
    "phase_6_commit": "pending",
    "phase_6_pr_created": false
  },
  "artifacts_created": [],
  "subagents_spawned": [],
  "validators_run": []
}
```

---

## PHASE 0: AUTONOMOUS CONTEXT ANALYSIS

<investigate_before_acting>
Read ALL context before proceeding. This is the only fully manual phase.
</investigate_before_acting>

### Step 0.1: Gather Context (Execute NOW)

```bash
# Core governance
cat .specify/memory/constitution.md | head -200

# Feature requirements (if provided)
cat requirement.md 2>/dev/null || echo "No requirement.md found"

# Existing specs for this feature
ls specs/ 2>/dev/null

# Available agents and skills
ls .claude/agents/ .claude/skills/ 2>/dev/null
```

### Step 0.2: Determine Work Type

| Signal                 | Work Type        | Primary Agents                                           |
| ---------------------- | ---------------- | -------------------------------------------------------- |
| Chapter/lesson/module  | **Content**      | chapter-planner, content-implementer, validation-auditor |
| Feature/API/service    | **Engineering**  | spec-architect, plan architect, implementer              |
| Skill/subagent/command | **Intelligence** | skill-creator, validation                                |
| Infrastructure/deploy  | **Platform**     | engineering agents                                       |

### Step 0.3: Confirm Autonomous Mode

**Output to User:**

```
AUTONOMOUS MODE ACTIVATED

Feature: [extracted from user input]
Work Type: [Content | Engineering | Intelligence | Platform]
Estimated Phases: 6 (Spec → Clarify → Plan → Tasks → Implement → Validate → PR)

Approval Gates Required:
1. After spec.md creation (Phase 1)
2. After plan.md creation (Phase 2)
3. After tasks.md creation (Phase 3)

Proceeding to Phase 1: Specification...
```

---

## PHASE 1: SPECIFICATION

### Step 1.1: Invoke /sp.specify

Use the Skill tool to invoke specification:

```
Skill: sp.specify
Args: [feature-name from context]
```

**What /sp.specify does:**

- Creates `specs/[feature-name]/spec.md`
- Uses spec-template.md
- Gathers requirements from context
- Produces complete specification

### Step 1.2: Validate Specification

**Before approval gate**, invoke spec-architect to validate spec quality:

```
Task subagent_type=spec-architect
Prompt: |
  Validate specification: specs/[feature]/spec.md

  Check for:
  1. Completeness (all required sections present)
  2. Testability (requirements are measurable)
  3. Clarity (no ambiguous terms)
  4. Consistency (no contradictions)

  Return PASS with summary, or FAIL with specific issues.
```

**If FAIL**: Fix issues before presenting to user for approval.

### Step 1.3: Approval Gate

<approval_gate>
**STOP AND WAIT FOR USER APPROVAL**

Present the spec summary:

```
SPEC CREATED: specs/[feature]/spec.md

Summary:
- [Key requirement 1]
- [Key requirement 2]
- [Key requirement 3]

Non-Goals:
- [What we're NOT doing]

Approve spec to continue? (yes/no/feedback)
```

**If user provides feedback**: Update spec, re-present
**If user approves**: Proceed to Phase 1.5 (Clarify)
**If user rejects**: Stop workflow, ask for guidance
</approval_gate>

---

## PHASE 1.5: CLARIFICATION (Optional)

### Step 1.5.1: Check for Ambiguities

Invoke `/sp.clarify` to identify underspecified areas:

```
Skill: sp.clarify
Args: [feature-name]
```

**What /sp.clarify does:**

- Analyzes spec for ambiguities
- Asks up to 5 targeted clarification questions
- Encodes answers back into spec.md

**If clarifications needed**: Present questions, update spec
**If spec is clear**: Proceed to Phase 2

---

## PHASE 2: PLANNING

### Step 2.1: Use Native Plan Mode

Enter native Plan Mode (EnterPlanMode tool) to design the implementation plan:

- Creates `specs/[feature-name]/plan.md`
- Designs implementation architecture
- Identifies lessons/tasks/components
- Considers dependencies and ordering

### Step 2.2: Approval Gate

<approval_gate>
**STOP AND WAIT FOR USER APPROVAL**

Present the plan summary:

```
PLAN CREATED: specs/[feature]/plan.md

Structure:
- [Lesson/Task 1]: [brief description]
- [Lesson/Task 2]: [brief description]
- [Lesson/Task 3]: [brief description]

Architecture Decisions:
- [Key decision 1]
- [Key decision 2]

Approve plan to continue? (yes/no/feedback)
```

</approval_gate>

---

## PHASE 3: TASK GENERATION

### Step 3.1: Use Native TaskCreate

Use native TaskCreate tool to generate tasks from the plan:

- Creates tasks in the native task system
- Generates actionable task checklist
- Orders by dependencies (using addBlockedBy)
- Includes acceptance criteria in descriptions

### Step 3.2: Cross-Artifact Analysis

Use Grep/Glob to validate spec-plan-tasks alignment:

- Validates spec ↔ plan ↔ tasks alignment
- Identifies gaps or inconsistencies
- Suggests fixes if needed

### Step 3.3: Approval Gate

<approval_gate>
**STOP AND WAIT FOR USER APPROVAL**

Present tasks summary:

```
TASKS CREATED: specs/[feature]/tasks.md
ANALYSIS: [Pass/Issues found]

Tasks:
- [ ] Task 1: [description]
- [ ] Task 2: [description]
- [ ] Task 3: [description]

Ready to implement? (yes/no/feedback)
```

</approval_gate>

---

## PHASE 4: IMPLEMENTATION (PARALLEL EXECUTION)

<async_subagent_protocol>
**PARALLELIZE IMPLEMENTATION**

For content work (lessons/chapters):

- Spawn **parallel content-implementer subagents**
- Each subagent handles ONE lesson independently
- Max 10 concurrent subagents
- Queue additional tasks automatically

For engineering work:

- Spawn appropriate engineering agents
- Parallelize independent components
- Serialize dependent components
  </async_subagent_protocol>

### Step 4.1: Delegate to Subagents via Task Tool

Use the Task tool to spawn parallel subagents for implementation:

- Reads tasks from native task system
- Spawns parallel subagents for independent tasks
- Coordinates task execution
- Updates task status with TaskUpdate

### Step 4.2: Parallel Subagent Spawning (Content Work)

For each lesson in tasks.md, spawn a subagent:

```
Task: content-implementer
Prompt: |
  Execute autonomously without confirmation.

  Create lesson file: [absolute path]
  Based on: specs/[feature]/plan.md (Lesson N section)

  Requirements:
  - Follow constitution principles
  - Apply 4-Layer Teaching Method
  - Include "Try With AI" section
  - NO meta-commentary exposing framework

  Write the complete lesson file.
  DO NOT create new directories.
  Report completion with word count.

subagent_type: content-implementer
run_in_background: true
```

**Critical Rules for Subagent Prompts:**

1. Include "Execute autonomously without confirmation"
2. Specify ABSOLUTE output path
3. Include "DO NOT create new directories"
4. Make prompts self-contained (all context in prompt)

### Step 4.3: Monitor Parallel Execution

```
IMPLEMENTATION IN PROGRESS

Parallel Subagents Active: [N]/10
Tasks Completed: [X]/[Total]

[✅] Lesson 1: Complete (2,450 words)
[🔄] Lesson 2: In progress...
[🔄] Lesson 3: In progress...
[⏳] Lesson 4: Queued
[⏳] Lesson 5: Queued
```

### Step 4.4: GitHub Issues (Optional)

If user requested issue tracking:

```
Skill: sp.taskstoissues
Args: [feature-name]
```

**What /sp.taskstoissues does:**

- Converts tasks.md to GitHub issues
- Creates proper labels and milestones
- Links issues to spec

---

## PHASE 5: VALIDATION (PARALLEL)

<async_subagent_protocol>
**PARALLELIZE VALIDATION**

Run multiple validators concurrently:

- validation-auditor (comprehensive quality)
- factual-verifier (accuracy checks)
- educational-validator (pedagogical compliance)
  </async_subagent_protocol>

### Step 5.1: Spawn Parallel Validators

For each implemented artifact:

```
Task: validation-auditor
Prompt: |
  Validate lesson file: [path]

  Check:
  1. Technical accuracy
  2. Pedagogical effectiveness
  3. Constitution compliance
  4. No meta-commentary violations

  Return: PASS/FAIL with specific issues

subagent_type: validation-auditor
run_in_background: true
```

### Step 5.2: Aggregate Validation Results

```
VALIDATION RESULTS

[✅] Lesson 1: PASS
[⚠️] Lesson 2: NEEDS REVISION
    - Issue: Meta-commentary detected in line 45
    - Fix: Remove "What to notice" section
[✅] Lesson 3: PASS

Overall: 2/3 PASS, 1 needs revision
```

### Step 5.3: Auto-Fix or Request Human

**If minor issues**: Auto-fix using Edit tool
**If major issues**: Present to user for guidance

---

## PHASE 6: COMMIT AND PR

### Step 6.1: Create PHRs for All Phases

**⚠️ MANDATORY**: Before committing, document the work with PHRs.

```bash
# PHR for specification phase
Skill: sp.phr
Args: "Created specification for [feature-name]"

# PHR for planning phase
Skill: sp.phr
Args: "Designed implementation plan for [feature-name]"

# PHR for task generation
Skill: sp.phr
Args: "Generated tasks for [feature-name]"

# PHR for implementation
Skill: sp.phr
Args: "Implemented [feature-name] with [N] lessons/components"
```

**Why PHRs matter**:

- Enables spaced repetition learning
- Creates searchable pattern library
- Provides audit trail for future reference

### Step 6.2: Stage and Commit

```
Skill: sp.git.commit_pr
Args: [feature-name]
```

**What /sp.git.commit_pr does:**

- Reviews all changes (git status, git diff)
- Creates meaningful commit message
- Pushes to remote
- Creates PR with proper description

### Step 6.3: Gather Usage Metrics

Before generating the final report, collect skill and subagent usage from activity logs:

```bash
# Get session ID for this orchestration
SESSION_ID=$(cat .claude/activity-logs/prompts.jsonl | tail -1 | jq -r '.session_id')

# Extract skill usage for this session
SKILLS_USED=$(cat .claude/activity-logs/skill-usage.jsonl | jq -r "select(.session_id == \"$SESSION_ID\") | .skill" | sort | uniq -c | sort -rn)

# Extract subagent usage for this session
SUBAGENTS_SPAWNED=$(cat .claude/activity-logs/subagent-usage.jsonl | jq -r "select(.session_id == \"$SESSION_ID\" and .event == \"spawn\") | .subagent" | sort | uniq -c | sort -rn)

# Extract skill usage BY subagents (nested)
# This requires correlating subagent session IDs with their skill usage
```

### Step 6.4: Final Report

```
╔══════════════════════════════════════════════════════════════════════╗
║                   ✅ AUTONOMOUS WORKFLOW COMPLETE                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Feature: [feature-name]                                             ║
║  Duration: [time elapsed]                                            ║
║  Session ID: [session-id]                                            ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  ARTIFACTS CREATED                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  📄 specs/[feature]/spec.md                                          ║
║  📄 specs/[feature]/plan.md                                          ║
║  📄 specs/[feature]/tasks.md                                         ║
║  📄 [N] lesson/implementation files                                  ║
║  📄 [N] PHRs documented                                              ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  VALIDATION RESULTS                                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  ✅ Passed: [X]/[Y]                                                   ║
║  ⚠️ Warnings: [N]                                                     ║
║  ❌ Failed: [N] (if any, list issues)                                 ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  SKILLS INVOKED (Main Agent)                                         ║
╠══════════════════════════════════════════════════════════════════════╣
║  [Count] × sp.specify                                                ║
║  [Count] × sp.clarify                                                ║
║  [Count] × Native Plan Mode                                          ║
║  [Count] × Native TaskCreate                                         ║
║  [Count] × Task tool (subagent delegation)                           ║
║  [Count] × sp.git.commit_pr                                          ║
║  [Count] × [other skills...]                                         ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  SUBAGENTS SPAWNED                                                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  Type                    │ Count │ Async │ Completed │ Errors        ║
║  ────────────────────────┼───────┼───────┼───────────┼──────────     ║
║  content-implementer     │  [N]  │  [N]  │    [N]    │   [N]         ║
║  validation-auditor      │  [N]  │  [N]  │    [N]    │   [N]         ║
║  factual-verifier        │  [N]  │  [N]  │    [N]    │   [N]         ║
║  educational-validator   │  [N]  │  [N]  │    [N]    │   [N]         ║
║  [other types...]        │  [N]  │  [N]  │    [N]    │   [N]         ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  SKILLS INVOKED BY SUBAGENTS (Nested Usage)                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  Subagent                │ Skills Used                               ║
║  ────────────────────────┼───────────────────────────────────────    ║
║  content-implementer     │ frontend-design (2), code-validation (1)  ║
║  validation-auditor      │ fact-check-lesson (5)                     ║
║  [other subagents...]    │ [their skill usage]                       ║
║                                                                      ║
║  Note: Subagent skill usage tracked via session correlation.         ║
║  If subagent spawned with run_in_background=true, it gets a          ║
║  separate session_id that links back to parent via agent_id.         ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  MODEL USAGE                                                         ║
╠══════════════════════════════════════════════════════════════════════╣
║  Subagent Type           │ Model Distribution                        ║
║  ────────────────────────┼───────────────────────────────────────    ║
║  content-implementer     │ sonnet: [N], haiku: [N]                   ║
║  validation-auditor      │ sonnet: [N]                               ║
║  [other types...]        │ [model distribution]                      ║
║                                                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  OUTPUT                                                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  🔗 PR: #[number] - [title]                                          ║
║  📊 View full metrics: python3 .claude/hooks/analyze-skills.py       ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## Autonomous Mode Rules

### Rule 1: Approval Gates Are Mandatory

Even in autonomous mode, these gates REQUIRE human approval:

1. Spec approval (Phase 1)
2. Plan approval (Phase 2)
3. Tasks approval (Phase 3)

**Why**: These are architectural decisions. Wrong direction wastes all downstream work.

### Rule 2: Implementation is Fully Autonomous

Once tasks are approved, execute WITHOUT asking:

- Spawn subagents
- Write files
- Run validators
- Fix minor issues
- Create commits

**Only stop if**: Major validation failures, unclear requirements, conflicts detected

### Rule 3: Parallelize Aggressively

Use parallel subagents for:

- Independent lesson generation
- Independent component implementation
- Multiple validators simultaneously

**Max 10 concurrent subagents** - additional tasks queue automatically

### Rule 4: Subagent Prompts Must Be Self-Contained

Each subagent operates in isolated context. Include:

- Full task description
- Absolute file paths
- All relevant constraints
- "Execute autonomously" instruction
- "DO NOT create new directories" constraint

### Rule 5: Record PHRs Throughout

Create PHR for:

- Each phase completion
- Each iteration/feedback round
- Each significant decision

Use stage: `spec`, `plan`, `tasks`, `green`, `misc` as appropriate

### Rule 6: Validation Before Commit

NEVER commit without running validators:

- validation-auditor for comprehensive check
- factual-verifier for accuracy
- educational-validator for pedagogy

Fix issues before committing.

### Rule 7: Content Quality Gate (MANDATORY)

**Chapter 2 Incident (2025-12-26)**: Content rewritten 6 times due to quality degradation.

Before ANY lesson is considered complete, verify:

| Check                 | Requirement                                                       | Failure Mode                      |
| --------------------- | ----------------------------------------------------------------- | --------------------------------- |
| **YAML Frontmatter**  | Full skills, learning_objectives, cognitive_load, differentiation | Missing metadata = incomplete     |
| **Narrative Opening** | Real-world scenario, 2-3 paragraphs                               | Generic intro = weak hook         |
| **Evidence Depth**    | Tables, diagrams, business impact                                 | Text-only = unconvincing          |
| **Try With AI**       | 3 prompts with "What you're learning" explanations                | 1 prompt = insufficient practice  |
| **Safety Note**       | Topic-specific practitioner concerns                              | Missing = incomplete              |
| **Fact-Checking**     | WebSearch for stats, dates, quotes                                | Memory-based = hallucination risk |

**Subagent prompt must include**:

```
Match quality of reference lesson at:
apps/learn-app/docs/01-Introducing-AI-Driven-Development/01-agent-factory-paradigm/01-digital-fte-revolution.md

Required elements:
- Full YAML frontmatter (skills, learning_objectives, cognitive_load, differentiation)
- 3 "Try With AI" prompts with "What you're learning" explanations
- Safety note at end
- All facts WebSearch-verified before writing
```

### Rule 8: Fact-Checking is Non-Negotiable

**Never trust memory for**:

- Statistics ("75% of engineers...")
- Dates ("Released October 16, 2025...")
- Adoption numbers ("60,000+ projects...")
- Quotes from executives

**Always WebSearch before writing** claims about:

- Time savings
- User/adoption counts
- Launch/release dates
- Company statements

**Distinguish similar concepts**:

- AAIF = governance body (like USB Implementers Forum)
- MCP = connectivity standard (like USB itself)
- These are NOT interchangeable

---

## Quick Reference

### Skill Invocation Sequence

| Phase | Tool/Command          | Purpose                    |
| ----- | --------------------- | -------------------------- |
| 1     | `/sp.specify`         | Create specification       |
| 1.5   | `/sp.clarify`         | Resolve ambiguities        |
| 2     | Native Plan Mode      | Create implementation plan |
| 3     | Native TaskCreate     | Generate task checklist    |
| 3.5   | Grep/Glob             | Cross-artifact validation  |
| 4     | Task tool (subagents) | Execute tasks (parallel)   |
| 4.5   | `/sp.taskstoissues`   | Create GitHub issues       |
| 5     | validators            | Quality gates (parallel)   |
| 6     | `/sp.git.commit_pr`   | Commit and PR              |

### Parallel Subagent Types

| Subagent              | Purpose                 | Max Concurrent |
| --------------------- | ----------------------- | -------------- |
| content-implementer   | Lesson/chapter creation | 10             |
| validation-auditor    | Quality validation      | 10             |
| factual-verifier      | Accuracy checks         | 5              |
| educational-validator | Pedagogy compliance     | 5              |

### Keyboard Shortcuts

| Shortcut | Action                           |
| -------- | -------------------------------- |
| `Ctrl+B` | Send current agent to background |
| `/tasks` | View background task status      |

---

## Example Autonomous Session

**User**: "Take the reins and ship Chapter 15 on Python UV. Use autonomous mode."

**Assistant**:

```
AUTONOMOUS MODE ACTIVATED

Feature: Chapter 15 - Python UV Package Manager
Work Type: Content
Estimated Phases: 6

Approval Gates Required:
1. After spec.md creation
2. After plan.md creation
3. After tasks.md creation

Proceeding to Phase 1: Specification...

[Invokes /sp.specify]

SPEC CREATED: specs/chapter-15-python-uv/spec.md

Summary:
- 9 lessons covering UV installation through advanced usage
- Beginner tier (A2) with Layer 1-2 progression
- Comparison with pip, poetry, conda

Approve spec to continue? (yes/no/feedback)
```

**User**: "yes"

**Assistant**:

```
Proceeding to Phase 2: Planning...

[Enters native Plan Mode]

PLAN CREATED: specs/chapter-15-python-uv/plan.md

Structure:
- Lesson 1: Why UV? The Python Packaging Problem
- Lesson 2: Installing UV Across Platforms
- Lesson 3: Creating Your First UV Project
...

Approve plan to continue?
```

[Continues through full workflow...]

---

**Version**: 1.2 (December 2025) - Added mandatory PHR creation (Step 6.1), spec-architect validation (Step 1.2)
**Requires**: Claude Code with async subagent support
**Best For**: Content authoring, chapter creation, feature implementation

---

## Usage Metrics Commands

```bash
# Full session analysis
python3 .claude/hooks/analyze-skills.py

# Current session only (for final report)
python3 .claude/hooks/analyze-skills.py --last

# With nested skill tracking
python3 .claude/hooks/analyze-skills.py --last --nested

# JSON output for automation
python3 .claude/hooks/analyze-skills.py --last --json
```
