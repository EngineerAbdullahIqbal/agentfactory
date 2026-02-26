# CoWriter Guide: AI-Native Content Creation with SpecKit Plus

**Version**: 2.0.0
**Last Updated**: 2025-11-04
**For**: Domain Experts & Content Collaborators
**Prerequisites**: Access to Claude Code or AI companion, basic understanding of AI collaboration

---

## Welcome, CoWriter! 👋

This guide shows you how to create high-quality educational content using **AI-native Spec-Driven Development** with the SpecKit Plus methodology.

**What Makes This AI-Native?**

- **No manual bash commands** - AI orchestrator handles branch creation, file generation
- **Evals-first thinking** - Define success criteria before writing specs
- **Hybrid workflow** - `/sp.specify` for specs, then native Plan Mode, TaskCreate, and Task tool with subagents for implementation
- **Iterative clarification** - AI asks questions, refines with you at each phase
- **Vertical intelligence** - Constitution → output-styles → subagents → content (all synchronized)

**Reference Material**:

- **Constitution**: Project principles and evals-first philosophy (`.specify/memory/constitution.md`)
- **SDD Workflow**: Spec-Driven Development phases (`.claude/rules/sdd-workflow.md`)
- **Book Content**: Discover chapter structure via `ls apps/learn-app/docs/`

---

## Table of Contents

1. [Quick Start: Your First Chapter](#quick-start-your-first-chapter)
2. [Understanding AI-Native SDD](#understanding-ai-native-sdd)
3. [The Four-Phase Workflow](#the-four-phase-workflow)
4. [Working with Subagents](#working-with-subagents)
5. [Quality Validation](#quality-validation)
6. [Onboarding Domain Experts](#onboarding-domain-experts)
7. [Common Patterns & Examples](#common-patterns--examples)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start: Your First Chapter

### Phase 0: Think First (Evals-First Methodology)

**Before opening AI companion**, clarify in your mind or notes:

**1. Business Goals** (What matters?)

- What can students DO after this chapter?
- What real-world problems can they solve?
- How does this connect to their career goals?

**2. Success Evals** (How do we measure?)

- Quiz: Student scores 75%+ on end-of-chapter assessment
- Exercise: Student completes "Try With AI" without help
- Application: Student can apply concept to unfamiliar problem

**3. Quality Standards** (What's acceptable?)

- Technical accuracy: 100% (all code tested)
- Constitution alignment: 100% (passes validation-auditor)
- Pedagogical effectiveness: 90%+ (learning objectives met)

**Why This Matters**:
Professional AI development (Anthropic/OpenAI standard) starts with **Evals → Spec → Implement → Validate**. Not "write code, hope it works."

Evals connect to **business goals** (student employability, skill acquisition), not arbitrary technical metrics ("10ms response time").

---

### Phase 1: `/sp.specify` - Create Specification

**Open Claude Code** (or your AI companion) and run:

```
/sp.specify

I want to create Chapter X on [topic].

Business Goal: Students learn [specific skill] to [solve real-world problem].

Core Ideas:
- [Key concept 1]
- [Key concept 2]
- [Key concept 3]

Success Evals:
- Students can [measurable outcome 1]
- Students can [measurable outcome 2]
- Assessment: [how we measure mastery]

Prerequisites: Chapter Y (students already know [prior knowledge])

Audience: [Beginner/Intermediate/Advanced/Professional] (Parts 1-3/4-5/6-8/9-13)
```

**What Happens Next**:

1. **AI asks clarifying questions**:
   - "What's in scope vs. out of scope?"
   - "What are the specific learning objectives?"
   - "What complexity tier? (A1/A2 for beginners, B1 for intermediate, etc.)"
   - "What code examples will demonstrate these concepts?"

2. **You answer and iterate** until spec is clear

3. **AI auto-creates feature branch** (no manual `git checkout -b`)

4. **AI generates `spec.md`** in `specs/part-X-chapter-Y/spec.md`

5. **You review and approve** - this is a checkpoint!

**Optional Refinement**:

```
/sp.clarify

Review the spec and identify any underspecified areas.
Ask me 3-5 targeted questions to improve clarity.
```

AI will ask questions to fill gaps you might have missed.

**Ready to Move Forward?**
When spec has all 6 sections complete (Overview, Scope, Requirements, Acceptance Criteria, Constraints, Success Criteria), proceed to planning.

**Reference**: See `.claude/rules/sdd-workflow.md` for the full SDD specification phase.

---

### Phase 2: Plan Mode - Generate Implementation Plan

**With approved spec**, enter native Plan Mode:

```
Enter Plan Mode and create an implementation plan for this chapter.

Focus on:
- Break chapter into lesson sequence
- Map CEFR proficiency levels (A1/A2/B1/B2/C1)
- Identify all code examples needed
- Apply correct complexity tier for target audience
- Note dependencies and risks

Technical details:
- Use skills from .claude/skills/ (dynamic discovery)
- Reference book-source materials where appropriate
- Follow output-styles formatting (.claude/output-styles/chapters.md, lesson.md)
```

**What Happens Next**:

1. **AI reads your approved spec**

2. **AI generates lesson breakdown**:
   - Lesson 1: [Topic] - 60 minutes
   - Lesson 2: [Topic] - 90 minutes
   - Lesson 3: [Topic] - 120 minutes

3. **AI maps skills proficiency**:
   - Lesson 1: "Specification Writing" - A2 - Technical - "Student writes complete spec with 6 components"
   - Lesson 2: "Iterative Clarity" - B1 - Conceptual - "Student recognizes specs are iterative, provides refinement rationale"

4. **AI identifies code examples** with specifications:
   - Example 1: Basic [concept] demonstration (15 lines, beginner-friendly)
   - Example 2: Real-world [application] (40 lines, intermediate complexity)

5. **AI writes `plan.md`** in `specs/part-X-chapter-Y/plan.md`

6. **You review plan structure** - another checkpoint!

**Questions to Ask AI**:

- "What are the critical dependencies in this plan?"
- "Can lessons be parallelized or must they be sequential?"
- "How does [requirement from spec] appear in the plan?"

**Reference**: See `.claude/rules/sdd-workflow.md` for the full SDD planning phase.

---

### Phase 3: TaskCreate - Decompose Into Atomic Work Units

**With approved plan**, use native task management:

```
Create tasks for this chapter using TaskCreate.

Requirements:
- Each task: 1-4 hours of work
- Clear acceptance criteria per task
- Explicit dependencies between tasks
- Priority levels (MUST/SHOULD/NICE-TO-HAVE)
- Group into phases with human review checkpoints

Example structure:
- Task 1: Research and outline Lesson 1 content
- Task 2: Write Lesson 1 - Intro section
- Task 3: Create code example 1 (with specification)
- Task 4: Write "Try With AI" exercise for Lesson 1
- Task 5: Human review checkpoint - Lesson 1
- [Continue for all lessons...]
```

**What Happens Next**:

1. **AI creates tasks** using TaskCreate with clear subjects and descriptions

2. **AI groups tasks by phase**:
   - **Phase 1: Lesson 1 Implementation** (Tasks 1-5)
   - **Phase 2: Lesson 2 Implementation** (Tasks 6-10)
   - **Phase 3: Lesson 3 Implementation** (Tasks 11-15)

3. **AI establishes dependencies** using TaskUpdate with `addBlockedBy`

4. **Tasks are tracked** in the native task system (visible via TaskList)

5. **You review task breakdown** - verify granularity makes sense

**Manual Refinement** (if needed):

```
Update tasks to:
- Add explicit human review checkpoint after each lesson
- Include validation steps (run validation-auditor) before completion
- Group related tasks for better flow
```

**Reference**: See `.claude/rules/sdd-workflow.md` for the full SDD task phase.

---

### Phase 4: Task Tool + Subagents - Execute Implementation

**With approved tasks**, delegate to subagents:

```
Implement this chapter using the Task tool with content-implementer subagents.

Rules:
- Work through tasks sequentially
- Complete one lesson at a time
- Pause for human review after each lesson
- Apply all domain skills from .claude/skills/
- Follow output-styles formatting
- Include all metadata (YAML frontmatter fields)
- Reference book-source materials
- Create "Try With AI" exercises
- Write end-of-lesson assessments

After each lesson:
- Mark tasks complete via TaskUpdate
- Run validation-auditor validation
- Get human approval before next lesson
```

**What Happens Next**:

1. **AI works through tasks in order**:
   - Task 1: Research Lesson 1 outline → Presents outline
   - **You review and approve** ✓
   - Task 2: Write Lesson 1 intro → Generates content
   - **You review and approve** ✓
   - Task 3: Create code example → Shows specification → AI prompt → generated code → validation
   - **You review and approve** ✓
   - [Continue through all tasks...]

2. **Checkpoint: End of Lesson 1**:
   - AI marks tasks complete via TaskUpdate
   - You review complete lesson content
   - Run validation: `validation-auditor` subagent
   - If passes: Proceed to Lesson 2
   - If fails: Iterate based on feedback

3. **Repeat for all lessons** until chapter complete

4. **Final Integration**:
   - All lessons written and validated
   - Cross-references checked
   - Docusaurus build tested
   - Ready for publication

**Validation at Each Step**:

```
Run validation-auditor on Lesson 1 to validate:
- Technical accuracy
- Code quality
- Constitution alignment
- Pedagogical effectiveness
```

**Reference**: See `.claude/rules/sdd-workflow.md` for the full SDD implementation phase.

---

### Phase 5: Commit and Create PR

**After all validation passes**, use the Git workflow command:

```
/sp.git.commit_pr

Wrap up Chapter X implementation.
All lessons complete, validated, and ready for review.
```

**What Happens**:

- AI creates comprehensive commit message
- AI pushes to remote branch
- AI creates pull request with summary
- You review PR description
- Merge when ready

**You're Done!** Chapter complete and ready for publication.

---

## Understanding AI-Native SDD

### Traditional vs. AI-Native Workflow

**Traditional (Manual, Old Thinking)**:

```bash
# Step 1: Create branch manually
git checkout -b chapter-X-topic

# Step 2: Create directories manually
mkdir -p specs/part-X-chapter-Y
mkdir -p apps/learn-app/docs/part-X-chapter-Y

# Step 3: Create files manually
touch specs/part-X-chapter-Y/spec.md
touch specs/part-X-chapter-Y/plan.md
touch specs/part-X-chapter-Y/tasks.md

# Step 4: Write specification (by hand, from scratch)
# Step 5: Write plan (by hand, from scratch)
# Step 6: Write tasks (by hand, from scratch)
# Step 7: Implement content (by hand, line by line)
# Step 8: Validate (manually, inconsistently)
# Step 9: Commit (manually write commit messages)
# Step 10: Create PR (manually write description)
```

**Problems**:

- High cognitive load (remembering directory structure, file conventions)
- Error-prone (typos in file paths, missing files)
- Inconsistent (different developers format differently)
- Slow (many manual steps)
- Skippable (easy to skip spec/plan and jump to coding)

---

**AI-Native (SpecKit Plus, NEW Thinking)**:

```
# Step 1: Think first (Evals-First)
# Define success criteria in your head or notes

# Step 2: /sp.specify
# Share business idea with AI
# AI clarifies, iterates, auto-creates branch, generates spec.md

# Step 3: Plan Mode (native)
# AI reads spec, generates lesson plan, maps proficiency levels

# Step 4: TaskCreate (native)
# AI breaks plan into atomic tasks with dependencies

# Step 5: Task tool + subagents
# AI delegates to content-implementer subagents, you review at checkpoints

# Step 6: Validate
# Run validation-auditor, fix issues

# Step 7: /sp.git.commit_pr
# AI handles git workflow, creates PR
```

**Benefits**:

- Low cognitive load (AI handles structure, conventions)
- Error-resistant (AI follows constitution, output-styles)
- Consistent (same AI, same templates, same formatting)
- Fast (AI generates, you validate and approve)
- Enforced (workflow prevents skipping steps)

---

### The Vertical Intelligence Stack

**What Is Vertical Intelligence?**
A synchronized 4-layer architecture where every layer references the same authoritative sources:

```
┌─────────────────────────────────────┐
│ Layer 1: Constitution (`.specify/memory/constitution.md`)       │ ← Single source of truth
│ (.specify/memory/constitution.md)  │   (17 core principles, evals-first, domain skills)
└─────────────────────────────────────┘
              ↓ References
┌─────────────────────────────────────┐
│ Layer 2: Output Styles              │ ← Formatting standards
│ (.claude/output-styles/)            │   (chapters.md, lesson.md)
└─────────────────────────────────────┘
              ↓ References
┌─────────────────────────────────────┐
│ Layer 3: Subagents                  │ ← Specialized assistants
│ (.claude/agents/)                   │   (chapter-planner, content-implementer,
│                                     │    validation-auditor)
└─────────────────────────────────────┘
              ↓ Generates
┌─────────────────────────────────────┐
│ Layer 4: Content                    │ ← Book chapters, lessons
│ (apps/learn-app/docs/)                 │   (MDX files with YAML metadata)
└─────────────────────────────────────┘
```

**Why This Matters**:

- **No contradictions** - All layers read same constitution
- **Automatic updates** - Change constitution once, all subagents update
- **Consistent quality** - Same standards applied by all subagents
- **Traceability** - Every decision traces back to constitution principle

**Contrast with Traditional**:

- Traditional: Each developer has own interpretation of standards
- Vertical Intelligence: Single source of truth, synchronized references

---

## The Four-Phase Workflow

### Phase 1: Specify (WHAT to build)

**Purpose**: Define what you're creating and why it matters

**Inputs**: Business idea, success evals, target audience

**Process**:

1. Run `/sp.specify` with your core idea
2. AI asks clarifying questions
3. You answer and iterate
4. AI generates spec.md
5. You approve spec

**Outputs**:

- Feature branch (auto-created)
- `specs/part-X-chapter-Y/spec.md` (6 sections complete)

**Quality Gate**: Spec is ready when all 6 sections are complete, testable, and approved by human.

**Reference**: Constitution (`.specify/memory/constitution.md`) Core Principle #1 (Evals-First Development)

---

### Phase 2: Plan (HOW to build)

**Purpose**: Break WHAT into HOW - lesson sequence, proficiency levels, code examples

**Inputs**: Approved spec.md

**Process**:

1. Enter native Plan Mode
2. AI reads spec
3. AI generates lesson breakdown with CEFR proficiency levels
4. AI identifies code examples needed
5. AI writes plan.md
6. You review plan structure

**Outputs**:

- `specs/part-X-chapter-Y/plan.md` (lesson-by-lesson architecture)
- Skills proficiency metadata (CEFR levels, Bloom's taxonomy, DigComp areas)

**Quality Gate**: Plan is ready when lesson sequence is logical, proficiency progression is sound, and dependencies are clear.

**Subagent Used**: `chapter-planner` (.claude/agents/chapter-planner.md)

---

### Phase 3: Tasks (Atomic work units)

**Purpose**: Decompose HOW into specific, testable work units

**Inputs**: Approved plan.md

**Process**:

1. Use native TaskCreate to define tasks
2. AI breaks plan into individual tasks with clear subjects
3. AI establishes dependencies via TaskUpdate
4. AI groups into phases with checkpoints
5. Tasks tracked in native task system
6. You verify granularity

**Outputs**:

- `specs/part-X-chapter-Y/tasks.md` (atomic checklist)

**Quality Gate**: Tasks are ready when each task is 1-4 hours, has clear acceptance criteria, and dependencies are explicit.

**Manual Refinement**: Common to adjust task breakdown after initial generation (add checkpoints, regroup tasks).

---

### Phase 4: Implement (Execute and validate)

**Purpose**: Generate content, validate quality, iterate based on feedback

**Inputs**: Approved tasks.md

**Process**:

1. AI delegates to content-implementer subagents via Task tool
2. AI works through tasks sequentially
3. You review after each lesson (checkpoint)
4. Run `validation-auditor` validation
5. Iterate if issues found
6. Move to next lesson when validation passes
7. Final integration when all lessons complete

**Outputs**:

- Lesson files: `apps/learn-app/docs/part-X-chapter-Y/lesson-N.md`
- YAML metadata: 7 generation fields + skills proficiency
- Code examples: Specification → AI prompt → generated code → validation steps
- Exercises: "Try With AI" interactive exercises
- Assessments: End-of-lesson quizzes/tests

**Quality Gate**: Chapter is ready when all lessons pass validation-auditor validation and human final review.

**Subagents Used**:

- `content-implementer` (.claude/agents/content-implementer.md) - generates content
- `validation-auditor` (.claude/agents/validation-auditor.md) - validates quality

---

## Working with Subagents

### What Are Subagents?

**Subagents** are specialized AI assistants with isolated context and specific responsibilities. Think of them as expert consultants:

- **chapter-planner**: Architect (designs lesson structure)
- **content-implementer**: Content creator (writes lessons following plan)
- **validation-auditor**: Quality auditor (validates correctness)

**Why Subagents vs. Main AI?**

- **Isolation**: Subagent context doesn't pollute main conversation
- **Specialization**: Each subagent has domain expertise
- **Consistency**: Same subagent applies same standards across all chapters
- **Scalability**: Multiple subagents can work in parallel (future)

**How Subagents Work**:

1. Main AI invokes subagent with task
2. Subagent has access to: Constitution, output-styles, skills, specs
3. Subagent executes task using domain skills
4. Subagent returns result to main AI
5. Main AI presents result to you for review

---

### chapter-planner Subagent

**Location**: `.claude/agents/chapter-planner.md`

**When to Use**: After spec is approved, before writing content

**Responsibilities**:

- Read approved spec.md
- Break chapter into lesson sequence
- Map CEFR proficiency levels to each lesson
- Apply concept-scaffolding (graduated complexity)
- Identify all code examples needed (with specifications)
- Check prerequisites via filesystem (`ls -d apps/learn-app/docs/*/`)
- Generate plan.md with lesson-by-lesson architecture
- Suggest ADRs for significant decisions

**Invocation**:

```
Enter Plan Mode and use chapter-planner to plan this chapter.
```

(Main AI invokes chapter-planner subagent via Task tool)

**Skills Used** (from .claude/skills/):

- learning-objectives
- concept-scaffolding
- book-scaffolding
- skills-proficiency-mapper
- code-example-generator

**Outputs**:

- `specs/part-X-chapter-Y/plan.md`
- Skills proficiency metadata for each lesson

**Quality Checks**:

- Validates spec alignment with constitution (`.specify/memory/constitution.md`)
- Ensures evals defined before implementation
- Verifies proficiency progression (A1 → A2 → B1)
- Applies correct complexity tier for target audience

**Reference**: `.claude/agents/chapter-planner.md` (updated for constitution (`.specify/memory/constitution.md`))

---

### content-implementer Subagent

**Location**: `.claude/agents/content-implementer.md`

**When to Use**: During implementation phase (Task tool delegation)

**Responsibilities**:

- Read approved plan.md and tasks.md
- Implement lesson content following specifications
- Apply all 14 domain skills from constitution
- Generate code examples: Specification → AI prompt → code → validation
- Create "Try With AI" exercises
- Write end-of-lesson assessments
- Include 7 YAML generation metadata fields
- Validate skills proficiency alignment (CEFR levels)
- Follow output-styles formatting

**Invocation**:

```
Use the Task tool to delegate each lesson to a content-implementer subagent.
```

(Main AI invokes content-implementer subagent for each lesson via Task tool)

**Skills Used** (from .claude/skills/):

- learning-objectives
- concept-scaffolding
- code-example-generator
- exercise-designer
- assessment-builder
- technical-clarity
- ai-augmented-teaching
- book-scaffolding

**YAML Metadata Generated**:

```yaml
---
sidebar_position: 1
title: "Lesson Title"
chapter: 1
lesson: 1
duration_minutes: 30
description: "Brief description of the lesson"
keywords: ["keyword1", "keyword2"]

# HIDDEN SKILLS METADATA
skills:
  - name: "Skill Name"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can [specific measurable outcome]"

learning_objectives:
  - objective: "Clear, testable objective"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "How we measure this"

cognitive_load:
  new_concepts: 5
  assessment: "Brief cognitive load assessment"

differentiation:
  extension_for_advanced: "Extension activity for advanced learners"
  remedial_for_struggling: "Support for struggling learners"
---
```

**Quality Checks**:

- Content matches CEFR proficiency level from plan
- Cognitive load within limits (A1: max 5 concepts, A2: max 7, B1: max 10)
- Code examples all tested and validated
- All domain skills applied contextually
- Output-styles formatting followed

**Reference**: `.claude/agents/content-implementer.md` (updated for constitution (`.specify/memory/constitution.md`))

---

### validation-auditor Subagent

**Location**: `.claude/agents/validation-auditor.md`

**When to Use**: After lesson implementation, before moving to next lesson

**Responsibilities**:

- Validate technical accuracy (all code tested)
- Check code quality (Python 3.13+, TypeScript strict mode)
- Verify pedagogical effectiveness (learning objectives met)
- Assess constitution alignment (evals-first, spec-first, validation steps)
- Review output-styles compliance (formatting, structure)
- Check chapter structure (correct chapter number, prerequisites via filesystem)
- Validate skills proficiency alignment (CEFR levels appropriate)

**Invocation**:
After each lesson:

```
Run validation-auditor on Chapter X, Lesson Y.

Validate:
- Technical correctness
- Code quality
- Constitution (`.specify/memory/constitution.md`) alignment
- Pedagogical effectiveness
- Output-styles compliance
```

**Validation Report**:

```markdown
# Validation Report: Chapter X, Lesson Y

## Overall Verdict: PASS / REVISE / FAIL

## Issues Found:

### CRITICAL (must fix):

- Issue description with line reference

### MAJOR (should fix):

- Issue description with line reference

### MINOR (nice to fix):

- Issue description with line reference

## Recommendations:

- Actionable fix for each issue

## Constitution Alignment: 95%

- Principle #1 (Evals-First): ✓ PASS
- Principle #2 (Spec-First): ✓ PASS
- [etc.]
```

**Quality Thresholds**:

- PASS: 0 critical, 0-2 major issues
- REVISE: 1-3 critical OR 3+ major issues
- FAIL: 4+ critical issues

**Reference**: `.claude/agents/validation-auditor.md` (updated for constitution (`.specify/memory/constitution.md`))

---

## Quality Validation

### Why Validation Is Non-Negotiable

**Constitution Principle #14**: "Validation-First Safety - ALL AI-generated code MUST be validated before inclusion in book content."

**The Risk**: AI is powerful but imperfect. It can:

- Misunderstand spec ambiguities
- Generate code with edge case bugs
- Miss security issues
- Optimize in wrong direction

**Your Responsibility**: You validate not because AI is evil, but because AI is literal. Professional development requires systematic validation.

---

### Three-Tier Validation Strategy

#### Tier 1: Continuous Validation (During Implementation)

**When**: After each lesson implementation

**How**:

```
Run validation-auditor on Chapter X, Lesson Y
```

**What's Checked**:

- Technical accuracy
- Code quality
- Constitution alignment
- Pedagogical effectiveness

**Action**:

- PASS: Proceed to next lesson
- REVISE: Fix issues, re-validate
- FAIL: Return to planning, refine spec

---

#### Tier 2: Chapter-Level Validation (After All Lessons)

**When**: All lessons in chapter complete

**How**:

```
Run validation-auditor chapter-level validation for Chapter X.

Check:
- Lesson flow and coherence
- Cross-references correct
- Prerequisites met
- Proficiency progression sound
- All code examples working
```

**What's Checked**:

- Individual lesson quality (from Tier 1)
- Chapter coherence (lessons connect logically)
- Cross-reference accuracy (links to other chapters)
- Proficiency progression (A1 → A2 → B1)

**Action**:

- PASS: Proceed to publication
- REVISE: Fix issues, re-validate chapter
- FAIL: Significant rework needed

---

#### Tier 3: Human Final Review (Before Publication)

**When**: Chapter passes validation-auditor validation

**What You Do**:

1. **Editorial polish**: Voice, tone, flow
2. **Cross-reference validation**: Links to other chapters work
3. **Docusaurus build test**: Chapter renders correctly
4. **Visual inspection**: Formatting, images, code blocks

**Tools**:

```bash
# Build and serve locally
npm run start

# Open browser to chapter
# Visually inspect formatting, images, code blocks
# Test all interactive elements
```

**Action**:

- Approved: Merge PR, publish
- Needs polish: Minor edits, re-review
- Major issues: Return to implementation

---

### Validation Checklist Template

Use this checklist for every chapter:

```markdown
# Chapter X Validation Checklist

## Tier 1: Lesson-Level Validation

- [ ] Lesson 1: validation-auditor PASS
- [ ] Lesson 2: validation-auditor PASS
- [ ] Lesson 3: validation-auditor PASS
- [Continue for all lessons...]

## Tier 2: Chapter-Level Validation

- [ ] All lessons coherent and logically connected
- [ ] Cross-references to other chapters correct
- [ ] Prerequisites verified against filesystem structure
- [ ] Proficiency progression sound (CEFR levels)
- [ ] All code examples tested and working
- [ ] "Try With AI" exercises functional
- [ ] End-of-lesson assessments complete

## Tier 3: Human Final Review

- [ ] Editorial polish (voice, tone, flow)
- [ ] Docusaurus build successful
- [ ] Visual inspection (formatting, images, code blocks)
- [ ] All links working (internal + external)
- [ ] Metadata correct (YAML frontmatter)

## Ready for Publication

- [ ] All validation tiers passed
- [ ] PR created and reviewed
- [ ] Final approval obtained
```

---

## Onboarding Domain Experts

### Who Are Domain Experts?

**Domain experts** are subject matter specialists you onboard to write specific book parts:

- **Part 1-3** (Beginner): Education specialists, technical writers with pedagogy background
- **Part 4-5** (Intermediate): Software engineers with teaching experience
- **Part 6-8** (Advanced): Senior engineers, architects
- **Part 9-13** (Professional): Infrastructure engineers, DevOps specialists, production experts

---

### Onboarding Process

#### Step 1: Share This Guide

**Send**:

- This guide (docs/COWRITER-GUIDE.md)
- Constitution (`.specify/memory/constitution.md`)
- SDD Workflow rules (`.claude/rules/sdd-workflow.md`)

**Ask them to read**:

1. Constitution Core Principles (especially #1: Evals-First)
2. This guide Quick Start section
3. SDD Workflow rules for hands-on workflow phases

---

#### Step 2: Environment Setup

**Prerequisites**:

- AI companion access (Claude Code, Gemini CLI, or similar)
- Git installed and configured
- Repository cloned locally

**Verify setup**:

```bash
# Check repository access
cd /path/to/tutorgpt-build/bbb
git status

# Check AI companion available
# (Claude Code: Cmd+Shift+P > "Claude Code: Start")
# (Gemini CLI: gemini --version)
```

---

#### Step 3: Practice Run (Sandbox Chapter)

**Before real chapter**, do practice run:

```
/sp.specify

Practice Chapter: Introduction to [Your Domain Expertise Area]

Business Goal: Demonstrate the SpecKit Plus workflow with a throwaway chapter.

Core Ideas:
- [Topic 1]
- [Topic 2]

This is just practice - we'll delete this chapter after walkthrough.
```

**Walkthrough**:

1. Complete all 4 phases (/sp.specify → Plan Mode → TaskCreate → Task tool + subagents)
2. Run validation-auditor validation
3. See how iteration and refinement works
4. Delete practice chapter

**Goal**: Build confidence with workflow before real work.

---

#### Step 4: Assign Real Chapters

**Provide context**:

```markdown
# Your Assignment: Part X Chapters

You'll be writing:

- Chapter Y: [Topic] (3 lessons, beginner level)
- Chapter Z: [Topic] (4 lessons, intermediate level)

Prerequisites:

- Students have completed Chapters A, B, C
- Students know: [specific prior knowledge]

Complexity Tier: [Beginner/Intermediate/Advanced/Professional]

- Cognitive load limits: [5/7/10/no limit] new concepts per lesson
- CEFR proficiency: [A1-A2 / B1 / B2 / C1]

Reference Material:

- Book structure: Discover via `ls apps/learn-app/docs/`
- Your chapters fit here: [specific location in book flow]
```

---

#### Step 5: Check-In Cadence

**Schedule regular check-ins**:

**After Spec Phase**:

- Review spec.md together
- Verify evals align with business goals
- Check scope is appropriate
- Approve before planning

**After Plan Phase**:

- Review lesson structure
- Verify proficiency progression
- Check code example specifications
- Approve before implementation

**After Each Lesson**:

- Review lesson content
- Run validation-auditor together
- Discuss any issues found
- Approve before next lesson

**After Chapter Complete**:

- Chapter-level validation
- Human final review
- Merge PR

---

## Common Patterns & Examples

### Pattern 1: Creating a Beginner Chapter (Parts 1-3)

**Complexity Tier**: Beginner (A1-A2 proficiency)

**Constraints**:

- Max 2 options to choose from
- Max 5 new concepts per lesson section
- Max 1 new skill per lesson
- No forward references without explanation
- AI agent handles 3+ options

**Example Specification**:

```
/sp.specify

Chapter 12: Python Package Management for Beginners

Business Goal: Students learn how to install and manage Python packages using AI agent assistance.

Core Ideas:
- What are packages and why they matter
- Two main tools: pip and uv (AI chooses which to use)
- How to install packages for a project
- How to verify packages installed correctly

Success Evals:
- Student can explain what packages are (assessment)
- Student can ask AI to install a package (exercise)
- Student can verify installation worked (hands-on)

Audience: Complete beginners (never coded before)
Complexity: A1-A2 (beginner)

Cognitive Load:
- Lesson 1: 4 new concepts (packages, dependencies, installation, verification)
- Lesson 2: 3 new concepts (requirements file, virtual environment, AI workflow)
```

**Key Principles**:

- **Concept-first pattern**: WHAT → WHY → HOW → PRACTICE
- **AI-as-partner framing**: "Your agent knows which tool to use"
- **Error literacy**: Show what errors mean, how to ask AI for help
- **No memorization required**: Students understand concepts, AI executes

**Reference**: Constitution Principle #12 (Graduated Complexity)

---

### Pattern 2: Creating an Intermediate Chapter (Parts 4-5)

**Complexity Tier**: Intermediate (B1 proficiency)

**Constraints**:

- 3-4 options allowed (show tradeoffs)
- Max 7 new concepts per lesson section
- Expect independent problem-solving with AI assistance
- Introduce architectural thinking

**Example Specification**:

```
/sp.specify

Chapter 28: API Design Patterns with AI Code Generation

Business Goal: Students learn to design clean APIs and use AI to generate boilerplate code.

Core Ideas:
- REST vs. GraphQL vs. RPC (tradeoffs discussed)
- API design principles (consistency, versioning, error handling)
- Using AI to generate API scaffolding from specification
- Validating generated API code

Success Evals:
- Student can compare 3 API patterns and choose appropriately (assessment)
- Student can write API specification that AI understands (exercise)
- Student can validate generated API code (hands-on)

Audience: Intermediate (know one programming language, learning architecture)
Complexity: B1 (intermediate)

Cognitive Load:
- Lesson 1: 6 new concepts (REST, GraphQL, RPC, tradeoffs, when to use each, specification writing)
- Lesson 2: 7 new concepts (endpoints, routes, middleware, error handling, validation, testing, deployment)
```

**Key Principles**:

- **Tradeoffs discussion**: Multiple valid approaches, explain when to use each
- **Specification-first**: Write API spec before generating code
- **Validation emphasis**: Students verify AI-generated code meets requirements
- **Real-world context**: Connect to production systems

**Reference**: Constitution Principle #12 (Graduated Complexity - Tier 2)

---

### Pattern 3: Creating a Professional Chapter (Parts 9-13)

**Complexity Tier**: Professional (B2-C1 proficiency)

**Constraints**:

- No artificial option limits (show ecosystem realistically)
- No concept count limits (synthesis and integration expected)
- Production-ready expectations (security, scale, cost, operations)
- Business context (ROI, SLAs, risk management)

**Example Specification**:

```
/sp.specify

Chapter 47: Production Kubernetes Deployment with AI-Generated Infrastructure Code

Business Goal: Students deploy production-ready Kubernetes clusters using AI to generate infrastructure-as-code with proper security, observability, and cost controls.

Core Ideas:
- Kubernetes production requirements (HA, security, observability, cost)
- Infrastructure-as-code (Terraform, Pulumi, Crossplane - compare and choose)
- Using AI to generate IaC from architectural requirements
- Validating generated infrastructure (security audit, cost estimation, reliability review)
- Deployment strategies (blue-green, canary, rolling updates)
- Operational readiness (monitoring, alerting, runbooks)

Success Evals:
- Student can write infrastructure requirements specification (hands-on)
- Student can use AI to generate complete IaC (exercise)
- Student can perform security audit on generated code (hands-on)
- Student can deploy to production with proper observability (capstone)

Audience: Professional (production experience required)
Complexity: B2-C1 (professional)

Production Validation Checklist:
- Security: Secrets management, IAM roles, network policies, TLS
- Reliability: Health checks, graceful shutdown, retry logic, circuit breakers
- Observability: Structured logging, metrics, tracing, alerting
- Cost: Resource requests appropriate, autoscaling configured, no over-provisioning
```

**Key Principles**:

- **No scaffolding**: Assumes professional competence
- **Real-world complexity**: Security, scale, cost, operations
- **System thinking**: Not just code, entire production system
- **Business context**: ROI, SLAs, risk management
- **Comprehensive validation**: Security audit, cost estimation, reliability review

**Reference**: Constitution Principle #12 (Graduated Complexity - Tier 4)

---

### Pattern 4: Handling Validation Failures

**Scenario**: validation-auditor finds critical issues after lesson implementation

**What Happened**:

```markdown
# Validation Report: Chapter 31, Lesson 2

## Overall Verdict: REVISE

## Issues Found:

### CRITICAL:

- Code example at line 145 has unhandled edge case (division by zero)
- Specification at line 67 is ambiguous ("user can see history" - format unclear)

### MAJOR:

- CEFR proficiency mismatch: Content teaches B1 concepts but marked as A2
- Missing validation steps in code example workflow
```

**How to Fix**:

**Step 1: Analyze root cause**

```
Which issue is upstream?
- Code bug → Implementation issue (fix in lesson)
- Spec ambiguity → Specification issue (fix spec.md, regenerate)
- Proficiency mismatch → Planning issue (fix plan.md, regenerate)
```

**Step 2: Fix at appropriate layer**

**If implementation issue** (code bug):

```
Fix the code example at line 145 to handle division by zero.

Add validation steps:
1. Show specification for error handling
2. Show AI prompt: "Generate division function with zero check"
3. Show generated code with error handling
4. Show validation: Test with zero, verify raises appropriate error
```

**If specification issue** (ambiguity):

```
Update @specs/part-5-chapter-31/spec.md:

OLD: "User can see calculation history"
NEW: "User can see calculation history as JSON array, max 100 entries, sorted newest first"

Then regenerate affected lessons with updated spec.
```

**If planning issue** (proficiency mismatch):

```
Update @specs/part-5-chapter-31/plan.md:

Change Lesson 2 proficiency from A2 to B1.
Rationale: Content requires analysis of tradeoffs (B1 cognitive level).

Adjust content to match B1 complexity (up to 10 concepts allowed).
```

**Step 3: Re-validate**

```
Run validation-auditor on updated Chapter 31, Lesson 2
```

**Step 4: Verify fix**

```
# Validation Report: Chapter 31, Lesson 2 (Revised)

## Overall Verdict: PASS

## Issues Fixed:
✓ Code example handles division by zero
✓ Specification updated with clear format
✓ Proficiency level corrected to B1
✓ Validation steps added to code workflow

## Recommendations:
- Consider adding similar validation examples to other lessons
```

**Reference**: Constitution Principle #14 (Validation-First Safety)

---

## Troubleshooting

### Issue 1: "AI doesn't follow output-styles formatting"

**Symptom**: Generated content doesn't match .claude/output-styles/

**Root Cause**: Subagent not referencing output-styles correctly

**Fix**:

```
Regenerate lesson following output-styles exactly.

Reference:
- .claude/output-styles/chapters.md (chapter structure)
- .claude/output-styles/lesson.md (lesson structure)

Ensure:
- YAML frontmatter matches template
- Section headers match style guide
- Code blocks formatted per standards
```

**Prevention**: Always include output-styles reference when delegating to content-implementer subagent.

---

### Issue 2: "Subagent outputs not written to files"

**Symptom**: AI shows generated content in chat but doesn't create files

**Root Cause**: Subagent returned content without writing

**Fix**:

```
Write the generated content to file:
- Path: apps/learn-app/docs/part-X-chapter-Y/lesson-N.md
- Ensure all YAML metadata included
- Verify file created successfully
```

**Prevention**: After subagent execution, verify files exist:

```bash
ls -la apps/learn-app/docs/part-X-chapter-Y/
```

---

### Issue 3: "CEFR proficiency levels seem wrong"

**Symptom**: Lesson marked A2 but content is too complex (or too simple)

**Root Cause**: Proficiency mapping error during planning

**Fix**:

```
Review @specs/part-X-chapter-Y/plan.md proficiency levels.

CEFR guidelines:
- A1: Recognition only (identify, recall)
- A2: Recognition + simple application with scaffolding
- B1: Application to real, unfamiliar problems independently
- B2: Analysis, evaluation, design decisions
- C1: Advanced synthesis, critique, expert judgment

Adjust lesson proficiency level and regenerate content to match.
```

**Reference**: skills-proficiency-mapper skill (.claude/skills/skills-proficiency-mapper/)

---

### Issue 4: "Chapter structure out of sync"

**Symptom**: Chapter numbers or titles don't match the filesystem

**Root Cause**: Filesystem not updated after planning

**Fix**:

```bash
# Discover actual chapter structure from filesystem (source of truth)
ls -d apps/learn-app/docs/*/

# Verify specific chapter exists
ls -d apps/learn-app/docs/*/XX-*/
```

**Prevention**: Always use `ls -d` to discover chapter paths from the filesystem. Never guess or reference stale index files.

---

### Issue 5: "AI skips evals-first step"

**Symptom**: Spec created without defining success criteria first

**Root Cause**: Not following constitution (`.specify/memory/constitution.md`) Principle #1

**Fix**:

```
STOP implementation.

Return to Phase 0: Think First (Evals-First).

Define before proceeding:
1. Business goals (what matters?)
2. Success evals (how do we measure?)
3. Quality standards (what's acceptable?)

Then regenerate spec.md with evals integrated.
```

**Prevention**: Always start with "Think First" phase before `/sp.specify`.

---

### Issue 6: "Branch not auto-created"

**Symptom**: `/sp.specify` doesn't create feature branch

**Root Cause**: Git workflow command not integrated in slash command

**Fix**:

```bash
# Manually create branch
git checkout -b part-X-chapter-Y-topic

# Then run /sp.specify
```

**Note**: Auto-branch creation may vary by AI companion configuration.

---

## Reference: Available Tools

### Slash Commands

| Command             | Purpose                                  | Phase           | Output                          |
| ------------------- | ---------------------------------------- | --------------- | ------------------------------- |
| `/sp.specify`       | Create specification                     | 1 - Specify     | spec.md                         |
| `/sp.clarify`       | Identify gaps, ask clarifying questions  | 1 - Specify     | Updated spec.md                 |
| Plan Mode (native)  | Generate implementation plan             | 2 - Plan        | plan.md                         |
| TaskCreate (native) | Decompose plan into atomic tasks         | 3 - Tasks       | Task list                       |
| Task tool (native)  | Delegate to subagents for implementation | 4 - Implement   | Lesson files                    |
| `/sp.adr`           | Create Architecture Decision Record      | Any             | history/adr/NNN-title.md        |
| `/sp.phr`           | Create Prompt History Record             | Any             | history/prompts/.../ID-title.md |
| `/sp.git.commit_pr` | Commit and create pull request           | After implement | Git commit + PR                 |

---

### Subagents

| Subagent                | Location                              | Purpose                                   | Invoked By                  |
| ----------------------- | ------------------------------------- | ----------------------------------------- | --------------------------- |
| **chapter-planner**     | .claude/agents/chapter-planner.md     | Plan lesson structure, proficiency levels | Task tool (Plan phase)      |
| **content-implementer** | .claude/agents/content-implementer.md | Generate lesson content                   | Task tool (Implement phase) |
| **validation-auditor**  | .claude/agents/validation-auditor.md  | Validate quality                          | Manual after lessons        |

---

### Domain Skills

Skills are located in `.claude/skills/` and dynamically discovered:

| Skill                         | Purpose                                   | Used By                              |
| ----------------------------- | ----------------------------------------- | ------------------------------------ |
| **learning-objectives**       | Define clear, testable objectives         | chapter-planner, content-implementer |
| **concept-scaffolding**       | Apply graduated complexity                | chapter-planner, content-implementer |
| **code-example-generator**    | Create code examples with specs           | content-implementer                  |
| **exercise-designer**         | Design "Try With AI" exercises            | content-implementer                  |
| **assessment-builder**        | Create end-of-lesson quizzes              | content-implementer                  |
| **technical-clarity**         | Write clear technical explanations        | content-implementer                  |
| **book-scaffolding**          | Maintain book structure, cross-references | chapter-planner, content-implementer |
| **ai-augmented-teaching**     | Frame AI as co-reasoning partner          | content-implementer                  |
| **skills-proficiency-mapper** | Map CEFR/Bloom's/DigComp levels           | chapter-planner                      |

---

### File References

| File                                | Purpose                                        | Used By             |
| ----------------------------------- | ---------------------------------------------- | ------------------- |
| `.specify/memory/constitution.md`   | Project principles, evals-first, domain skills | All subagents       |
| `apps/learn-app/docs/`              | Book structure (discover via `ls -d`)          | chapter-planner     |
| `.claude/output-styles/chapters.md` | Chapter formatting standards                   | content-implementer |
| `.claude/output-styles/lesson.md`   | Lesson formatting standards                    | content-implementer |
| `apps/learn-app/`                   | Source material to reference                   | content-implementer |

---

## Summary

**This is AI-Native Content Creation**:

1. **Think first** (Evals-First): Define success criteria before specifications
2. **Use workflow tools** (/sp.specify for specs, Plan Mode, TaskCreate, Task tool for implementation)
3. **AI orchestrates** (branch creation, file generation, formatting)
4. **You validate** (review, approve, iterate at checkpoints)
5. **Subagents specialize** (planning, writing, validation)
6. **Constitution synchronizes** (single source of truth, vertical intelligence)

**You are now ready** to create high-quality educational content using the SpecKit Plus methodology!

**Questions?** Reference:

- Constitution: Project principles (`.specify/memory/constitution.md`)
- SDD Workflow: Development phases (`.claude/rules/sdd-workflow.md`)
- This guide: AI-native patterns and troubleshooting

**Happy creating!** 🚀
