# Decision Document: Claude Code Exercises Pack

**Date**: 2026-02-08
**Status**: PENDING STAKEHOLDER APPROVAL
**Stakeholder**: Rana (teacher feedback) + MJS (product)

---

## 1. Problem Statement

### Teacher Feedback (Rana, 2026-02-08)

Students are struggling with Chapter 3 (General Agents — 26 lessons). Key issues:

- Students have **no technical background** and don't read extensively
- Chapter 3 teaches too much at once: basics through skills, subagents, MCP, hooks, Cowork
- There is a **cognitive cliff between Lesson 6 (A1/A2) and Lesson 7 (B1)** — students go from "type claude" to "create custom subagents" with zero practice
- Students need hands-on exercises to consolidate learning before advancing

### Root Cause

Chapter 3 has **26 lessons of input with zero output**. Students gain awareness but not fluency. Without repeated practice at each level, every new concept is built on sand.

**Assumption**: The problem is lack of practice, not chapter structure. We will validate this after the first cohort completes the exercises. If retention past Lesson 9 doesn't improve, chapter restructuring is the next lever.

---

## 2. Solution: Two-Pack Exercise Architecture

### Core Insight

Two types of problem-solving, neither requiring programming:

| Pack | Name | What Students Learn | Chapter Placement |
|------|------|-------------------|-------------------|
| **basics/ M1-M4** | Problem Solving (One-Shot) | Give Claude files/topics, describe what you want, get results | After L04 |
| **basics/ M5-M8** | Problem Solving (Systematic) | Reusable patterns, critical evaluation, complex planning | After L05 |
| **skills/** | Reusable Problem Solving | Turn solutions into reusable skills and patterns | After L06-L09 |

### Why This Works

1. **Bridges to coding** — the no-code exercises serve as an on-ramp. Students build confidence with AI problem-solving before Part 4 introduces programming as a power tool, not a prerequisite. When they reach Part 4 (Coding for Problem Solving), they already KNOW what problem-solving looks like. Code becomes a tool they choose, not a barrier they fear.
2. **No programming required** — students with no background can succeed using natural language
3. **Progressive complexity** — first solve problems, then make solutions reusable
4. **Pre-made data files** — messy folders, CSVs, meeting notes, scenario briefs included for all exercises that need them. Students download and start.

---

## 3. Pack Contents

### basics/ — Problem Solving (8 modules, 21 exercises + 3 capstones)

Placed after **Lesson 05 (CLAUDE.md Context Files)**. Students know how to open Claude Code, have conversations, create files, and set up project context.

| Module | Topic | Exercises | Pre-made Data |
|--------|-------|-----------|---------------|
| 1 | File Organization & Digital Housekeeping | 3 (messy downloads, photo album, inbox zero) | 76 files |
| 2 | Research & Information Synthesis | 3 (comparison matrix, literature review, decision doc) | 9 scenario briefs |
| 3 | Data Wrangling & Analysis | 3 (messy spreadsheet, survey analyzer, budget tracker) | 17 data files |
| 4 | Document Creation & Transformation | 3 (meeting notes, report generator, presentation) | 8 source files |
| 5 | Process Automation & Workflows | 3 (batch renamer, template system, weekly report) | 40+ files |
| 6 | Problem Solving & Creative Thinking | 3 (business plan, troubleshooter, event planner) | 7 scenario briefs |
| 7 | Quality Control & Critical Thinking | 3 (fact checker, spec stress test, prompt tournament) | Instructions |
| 8 | Capstone Projects | 3 (knowledge base, business ops, course materials) | 20+ files |

**Total**: 21 exercises + 3 capstones with ~160 pre-made data files.

**Recommended Minimum Path**: Students should complete **Modules 1-3 (9 exercises)** before continuing to Lesson 06. These cover the core skills: file organization, research synthesis, and data wrangling. Modules 4-8 are available for continued practice at the student's own pace — they are not required to proceed.

### skills/ — Reusable Problem Solving (8 modules, 21 exercises + 3 capstones)

Placed after **Lesson 09 (Subagents & Orchestration)**. Students know custom instructions, skills concepts, agent skills, and subagent delegation. Uses its own 6-step "Learning Loop" framework: Read > Test > Identify > Improve > Re-test > Reflect.

| Module | Topic | Exercises |
|--------|-------|-----------|
| 1 | Understanding Skills | 3 (skill anatomy, reading existing skills, skill vs prompt) |
| 2 | First Skills | 3 (create simple skills from scratch) |
| 3 | Skills with Examples | 3 (skills that include example outputs) |
| 4 | Skills with References | 3 (skills that reference documentation) |
| 5 | Testing and Iteration | 3 (test skills, identify failures, improve) |
| 6 | Composing Skills | 3 (combine skills into workflows) |
| 7 | Real-World Skills | 3 (production-quality skills for real use cases) |
| 8 | Capstone | 3 (end-to-end skill creation projects) |

**Total**: 21 exercises + 3 capstones.

**Status**: Content exists and is ready to ship alongside basics/. Both packs will be included in the initial repository push.

---

## 4. Chapter 3 Integration

### Current Chapter 3 Structure (26 lessons)

```
FOUNDATIONS (A1-A2)           EXTENSIBILITY (B1)           COWORK (A2-B1)
L01 Origin Story              L07 Skills Concepts          L17 Cowork Intro
L02 Installation              L08 Agent Skills             L18 Getting Started
L03 Free Setup                L09 Subagents                L19 Practical Workflows
L04 Hello World               L10 MCP Integration          L20 Browser Integration
L05 CLAUDE.md                 L11 Compiling MCP            L21 Connectors
L06 Teach Claude Your Way     L12 Settings Hierarchy       L22 Safety & Limits
                              L13 Hooks                    L23 Built-in Skills
                              L14 Plugins                  L24 Code vs Cowork
                              L15 Ralph Wiggum Loop        L25 Skills to Business
                              L16 Creator Workflow         L26 Chapter Quiz
```

### Exercise Checkpoint Placement

```
L04 Hello World
     ↓
  ┌──────────────────────────────────────┐
  │  EXERCISE CHECKPOINT 1a              │
  │  basics/ Modules 1-4 (12 exercises)  │
  │  "You just talked to Claude.         │
  │   Now solve real problems."          │
  │  One-shot tasks: files, research,    │
  │  data wrangling, documents           │
  └──────────────────────────────────────┘
     ↓
L05 CLAUDE.md Context Files
     ↓
  ┌──────────────────────────────────────┐
  │  EXERCISE CHECKPOINT 1b              │
  │  basics/ Modules 5-8 (9 ex + 3 cap) │
  │  "Now that you can set context,      │
  │   tackle bigger challenges."         │
  │  Automation, problem solving,        │
  │  quality control, capstones          │
  └──────────────────────────────────────┘
     ↓
L06 Teach Claude Your Way
L07 Skills Concepts
L08 Agent Skills
L09 Subagents & Orchestration
     ↓
  ┌──────────────────────────────────────┐
  │  EXERCISE CHECKPOINT 2               │
  │  skills/ (all 8 modules)             │
  │  "You know how to create skills.     │
  │   Now build reusable solutions."     │
  └──────────────────────────────────────┘
     ↓
L10 MCP Integration
...continues
```

---

## 5. Delivery Mechanism

### GitHub Downloadable Repository

**Repository**: https://github.com/panaversity/claude-code-exercises

```
claude-code-exercises/
├── README.md                    ← "Start here" — progression guide
├── EXERCISE-GUIDE.md            ← Shared problem-solving framework
├── basics/                      ← Problem Solving (after L04-L05)
│   ├── README.md
│   ├── module-1/
│   │   ├── exercise-1.1-messy-downloads/
│   │   │   ├── INSTRUCTIONS.md
│   │   │   └── [pre-made data files]
│   │   ├── exercise-1.2-photo-album/
│   │   └── exercise-1.3-inbox-zero/
│   ├── module-2/
│   ├── ...
│   └── module-8/
└── skills/                      ← Reusable Problem Solving (after L06-L09)
    ├── README.md
    ├── module-1-understanding-skills/
    ├── module-2-first-skills/
    ├── ...
    └── module-8-capstone/
```

### Why GitHub Download

1. **One clone, one link** — beginners manage one repo, not two
2. **Pre-made materials** — students download and start immediately ("bani banai")
3. **Teacher-friendly** — teachers can fork and customize for their cohort
4. **Natural for the tool** — students learning Claude Code should be comfortable with git clone
5. **Independent maintenance** — exercise pack updates don't require book content changes
6. **Accessible fallback** — students who struggle with `git clone` can download a ZIP from the GitHub releases page

### Student Workflow

```
1. git clone https://github.com/panaversity/claude-code-exercises.git
2. cd claude-code-exercises/basics/module-1/exercise-1.1-messy-downloads
3. claude    (or point Cowork at the folder)
4. Read INSTRUCTIONS.md and start solving
```

---

## 6. Problem-Solving Framework (Shared)

Every exercise uses this 7-step framework:

1. **Define** — What exactly am I trying to accomplish?
2. **Gather** — What files/data does Claude need?
3. **Specify** — Describe the desired outcome, constraints, and format
4. **Execute** — Run it with Claude Code or Cowork
5. **Verify** — Does the output match what I asked for?
6. **Iterate** — What would I change? Run it again.
7. **Reflect** — What did I learn about specifying problems clearly?

---

## 7. Self-Assessment Rubric

| Criteria | Beginner (1) | Developing (2) | Proficient (3) | Advanced (4) |
|----------|:---:|:---:|:---:|:---:|
| Problem Clarity | Used starter prompt | Added specifics | Clear success criteria | Anticipated edge cases |
| Specification Quality | Vague, one-sentence | Multiple requirements | Structured, unambiguous | Reusable, parameterized |
| Output Verification | Accepted first output | Checked appearance | Verified vs requirements | Tested edge cases |
| Iteration | Single attempt | One revision | Multiple refinements | Systematic approach |
| Reflection | None | Noted outcome | Explained why | Derived principles |

---

## 8. Key Design Principles

1. **No programming knowledge required** — just curiosity and clear thinking
2. **Pre-made data files** — sample data provided for all exercises that need them; some exercises (research, business planning) intentionally let students choose their own topic
3. **Both tools supported** — works with Claude Code (terminal) and Cowork (desktop)
4. **Progressive difficulty** — within each module, exercises build on each other
5. **Real-world scenarios** — messy downloads, meeting notes, budgets, business plans — not toy examples
6. **Reflection built in** — every exercise ends with "what did I learn?" questions

---

## 9. Success Metrics

How we'll know this worked:

| Metric | Measurement | Target |
|--------|-------------|--------|
| **Exercise completion rate** | Students who finish Modules 1-3 (minimum path) | >70% of enrolled students |
| **Progression past Lesson 9** | Students who continue to the extensibility section after exercises | >50% (up from current baseline) |
| **Teacher feedback** | Qualitative feedback from Rana's next cohort | "Students are more engaged and confident" |

We will evaluate these after the first cohort completes the exercises. If retention doesn't improve, chapter restructuring (splitting Ch3) is the next lever.

---

## 10. Teacher Guide

Teachers using this pack should:
- **Assign the minimum path** (Modules 1-3) as required coursework after Lesson 05
- **Use the self-assessment rubric** (Section 7) for evaluating student work
- **Encourage reflection** — the "what did I learn?" questions are where metacognition happens
- **Fork the repo** to add cohort-specific exercises or modify existing ones
- A comprehensive Teacher Guide document will accompany the pack in a future update

---

## 11. Implementation Plan

| Step | Action | Owner | Timeline |
|------|--------|-------|----------|
| 1 | Stakeholder concept approval on this document | MJS + Rana | Now |
| 2 | Restructure exercises-pack/ + skills-exercises/ into unified repo | Team | After approval |
| 3 | Write unified README.md and update EXERCISE-GUIDE.md | Team | Same day |
| 4 | Push to github.com/panaversity/claude-code-exercises | Team | Same day |
| 5 | Update Ch3 to reference exercise checkpoints | Content team | Next session |
| 6 | Add learning objectives to Ch1-6 READMEs | Content team | Following week |

---

## 12. Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Single repo, two subdirectories | One clone for beginners; folder names guide progression |
| 2 | basics/ after L05, skills/ after L09 | Matches cognitive progression: use Claude → extend Claude |
| 3 | GitHub download, not embedded/interactive | Pre-made files need filesystem; real tool practice matters |
| 4 | Keep Ch3 as one chapter | Problem is lack of practice, not chapter length |
| 5 | Exercises first, objectives later | Exercises solve immediate pain; objectives are metadata |
| 6 | No programming in either pack | Meets students where they are; bridges to Part 4 naturally |

---

*Document prepared by Agent Factory Leadership Team (2026-02-08)*
*Senior Consultant + Strategist + Content Lead analysis synthesized by Team Lead*
