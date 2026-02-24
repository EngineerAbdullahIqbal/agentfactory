# Chapter Writing Methodology: Python for the New AI Era

**Version:** 1.0
**Date:** 2026-02-20
**Purpose:** Comprehensive reference for how every chapter in the Python course is written — from research to publication.
**Companion to:** `python-new-era-plan.md` (v2.7)

---

## 1. Why This Document Exists

Writing educational content about fast-moving tools (uv, pyright, ruff, pytest, FastAPI) is dangerous. Facts change. Commands change. Config formats change. If we write from memory, we get:

- Wrong command syntax (uv's CLI has changed 3 times in 12 months)
- Outdated config options (pyright adds new strictness rules regularly)
- Incorrect version numbers (ruff releases weekly)
- Hallucinated features (tools we think exist but don't)

This happened in Chapter 2 of the main book (the "Chapter 2 Incident" — 6 rewrites due to hallucinated facts). This document ensures that never happens again.

**The core principle**: Every command, every config option, every version number shown to students must be verified against official documentation before it appears in a lesson.

---

## 2. MCP Grounding Strategy

### What MCP Servers We Have

We have two MCP (Model Context Protocol) servers configured at both user and project level:

| MCP Server | What It Does | When We Use It |
|------------|-------------|----------------|
| **Context7** | Fetches official library documentation directly from source. Returns structured, up-to-date API docs, CLI references, and configuration guides. | Every time we reference a tool's commands, config options, or API. This is our primary grounding source. |
| **Firecrawl** | Crawls and extracts content from any web page. Converts HTML to clean markdown. Can scrape blog posts, changelogs, GitHub READMEs, and release notes. | When we need information not in structured docs — blog announcements, community patterns, migration guides, changelog entries. |

### How Grounding Works in Practice

**Before writing any lesson that references a tool:**

```
Step 1: Context7 Fetch
  → Query official docs for the specific tool
  → Extract: exact CLI commands, config file format, current options
  → Save key findings in the expertise skill

Step 2: Firecrawl (if needed)
  → Crawl the tool's changelog or blog for recent changes
  → Crawl GitHub issues for known gotchas
  → Extract: version numbers, breaking changes, common problems

Step 3: WebSearch (supplementary)
  → Search for "[tool] common setup problems 2026"
  → Search for "[tool] Windows/Mac/Linux differences"
  → Extract: platform-specific notes, community workarounds

Step 4: Cross-verify
  → If Context7 and Firecrawl disagree, trust Context7 (official docs)
  → If a feature appears in a blog but not in docs, mark it as "unverified"
  → Never show unverified commands to students
```

### Grounding Table Per Chapter

Every chapter gets a grounding table before writing begins. Example for Chapter 14.1:

| Topic | MCP Source | What to Extract | Verified? |
|-------|-----------|-----------------|-----------|
| `uv init` command | Context7 → uv docs | Exact syntax, flags, output | [ ] |
| `pyproject.toml` fields | Context7 → uv docs | Required fields, tool sections | [ ] |
| pyright strict mode | Context7 → pyright docs | `pyrightconfig.json` format, strict options | [ ] |
| ruff configuration | Context7 → ruff docs | `ruff.toml` format, rule selection | [ ] |
| pytest basic usage | Context7 → pytest docs | `pytest` CLI, conftest.py, fixtures | [ ] |
| uv current version | Firecrawl → uv changelog | Latest stable version number | [ ] |
| Platform differences | WebSearch | Windows vs Mac vs Linux install notes | [ ] |

**Rule**: No lesson moves to content-implementer until all rows are checked.

---

## 3. Tone and Narrative Continuity

### Chapter 14's Established Pattern

Chapter 14 (Ten Axioms of Programming in AI-Driven Development) is the bridge chapter that students complete right before entering the Python course. It establishes:

**Characters:**
- **James** — The learner. Enthusiastic, sometimes rushes ahead, makes the mistakes students will make. He represents the student's journey.
- **Emma** — The mentor. Experienced, patient, explains the "why" before the "how." She represents the course's teaching voice.

**Narrative Structure (per lesson):**
1. James faces a real problem (something goes wrong)
2. The problem illustrates why an axiom matters
3. Emma explains the axiom with a clear analogy
4. Concrete code/tool example shows the axiom in action
5. James applies it and sees the improvement
6. Lesson closes with the principle crystallized

**Tone:**
- Conversational but precise — never dumbed down, never jargon-heavy
- Problem-first — always show the pain before the solution
- Practical — every concept connects to something the student will actually do
- Respectful — assumes the student is smart but new to this specific topic

**Named Anti-patterns:** Chapter 14 names specific mistakes (Circular Testing Trap, Green Bar Illusion, Prototype Trap, etc.). These become recurring vocabulary students recognize.

### The Bridge from Chapter 14 to Chapter 14.1

Chapter 14 ends with students understanding the TEN AXIOMS — the principles that govern how you work with AI-generated code. They know the WHY. But they haven't done anything yet. Their laptop is still unconfigured.

**Chapter 14.1 is where theory becomes reality.**

The narrative bridge should feel like this progression:

```
Ch 14 (final words): "You now have ten axioms — a complete engineering system.
                       But axioms on paper don't ship software.
                       It's time to build the workbench."

Ch 14.1 (opening):    James opens his laptop. Empty terminal. No Python tools.
                       Emma: "Every craftsperson starts by setting up their bench.
                       Let's install each tool — and I'll show you which axiom
                       it enforces."
```

**The key insight**: Chapter 14.1 is NOT a generic "install Python" tutorial. It is the PHYSICAL MANIFESTATION of the axioms. Every tool installed ties back to a specific axiom:

| Tool Being Installed | Axiom It Enforces | Connection |
|---------------------|-------------------|------------|
| **uv** (package manager) | Axiom I: Shell as Orchestrator | uv is how you orchestrate Python from the shell |
| **pyproject.toml** | Axiom II: Knowledge is Markdown | Project config IS knowledge, stored as structured text |
| **pyright** (type checker) | Axiom V: Types Are Guardrails | pyright is the guardrail that catches type errors |
| **ruff** (linter/formatter) | Axiom IX: Verification is a Pipeline | ruff is the first stage of the verification pipeline |
| **pytest** (testing) | Axiom VII: Tests Are the Specification | pytest is where specifications become executable |
| **git init** | Axiom VIII: Version Control is Memory | git gives the project persistent memory from day one |

**This axiom-callback pattern is what makes our chapter different from every other Python setup tutorial.** Students don't just install tools — they understand WHY each tool exists in the context of the engineering system they just learned.

### Tone Shift: Ch 14 → Ch 14.1

| Dimension | Ch 14 (Axioms) | Ch 14.1 (Workbench) |
|-----------|----------------|---------------------|
| **Mode** | Philosophical, conceptual | Hands-on, terminal-driven |
| **Student action** | Read, understand, predict | Run commands, read output, verify |
| **James's role** | Asking "why?" questions | Running commands, checking output |
| **Emma's role** | Explaining principles | Guiding setup, explaining each tool's purpose |
| **Code examples** | Illustrative (conceptual) | Runnable (copy-paste and verify) |
| **Pacing** | Ideas per lesson | Steps per lesson |

**What stays the same**: Characters, respect for the reader, problem-first teaching, connecting every action to a bigger purpose.

---

## 4. Chapter Structure Methodology

### Lesson Breakdown for Any Chapter

Every chapter in the Python course follows this internal structure:

```
Chapter N: [Title]
├── Lesson 1: [Opening — the "why" and context]
├── Lesson 2-N: [Core content lessons]
├── Lesson N+1: [Synthesis / putting it together]
└── Quiz: [Assessment]
```

### For Chapter 14.1 Specifically

```
Chapter 14.1: The Development Environment
├── L1: Why This Workbench (bridge from Ch 14 axioms to tools)
├── L2: uv — The Package Manager for the AI Era
├── L3: The Discipline Stack — pyright and ruff
├── L4: pytest — Your First Verification
├── L5: Your First Project — Putting It All Together
└── Quiz: Development Environment Assessment
```

**Why this order?**
- L1 bridges from axioms (conceptual) to tools (practical)
- L2 starts with uv because EVERYTHING else depends on it (you can't run pyright without uv)
- L3 groups pyright + ruff because they're both "static analysis" tools that run before your code executes
- L4 introduces pytest as the verification step (the most important tool in TDG)
- L5 combines everything into one project setup — the student's first complete workbench

### Per-Lesson Internal Structure

Every lesson within a chapter follows this template:

```
YAML Frontmatter (MANDATORY)
├── sidebar_position, title, description, keywords
├── chapter, lesson, duration_minutes
├── skills (name, proficiency_level, category, bloom_level, digcomp_area)
├── learning_objectives (objective, proficiency_level, bloom_level, assessment_method)
├── cognitive_load (new_concepts count, assessment)
└── differentiation (extension_for_advanced, remedial_for_struggling)

Narrative Opening (2-3 paragraphs)
├── James faces a situation / problem
├── Connect to what student already knows (from Ch 14)
└── Set up what this lesson will solve

Core Content (main body)
├── Concept explanation with axiom callback
├── Concrete example (runnable commands with expected output)
├── "Before vs After" comparison where applicable
├── Platform-specific callouts (Windows / Mac / Linux) as needed
├── Inline exercises: Read & Predict (2-3), Spot the Bug (1-2)
└── Tables comparing options, diagrams where helpful

Try With AI Section (3 prompts)
├── Prompt 1: Exploration prompt (understand the tool)
├── Prompt 2: Application prompt (use the tool for a task)
├── Prompt 3: Domain connection prompt (apply to student's own context)
└── Each has "What you're learning:" explanation

Lesson Summary
└── Key takeaways, connection to next lesson
```

---

## 5. The Complete Writing Pipeline

### Phase A: Build Expertise Skill (Research)

**Who does this**: Main agent (orchestrator) using MCP tools

**Duration**: ~30 minutes per chapter

**Process**:

```
1. GROUND with MCP
   ├── Context7: Fetch official docs for each tool in the chapter
   ├── Firecrawl: Crawl changelogs, blog posts, recent updates
   └── WebSearch: Community patterns, common problems, platform differences

2. BUILD the expertise skill
   ├── Persona: Expert identity and voice for this chapter's domain
   ├── Logic: Decision trees (when to use what, common errors and fixes)
   ├── Context: Prerequisites (what student must know before this chapter)
   ├── Data/Knowledge: Verified API patterns, commands, config formats
   ├── MCP: Which tools to use for ongoing verification
   └── Safety/Guardrails: What to avoid, common misconceptions, outdated patterns

3. TEST the skill
   ├── Run every command sequence on a fresh environment
   ├── Verify every config file format parses correctly
   └── Confirm expected output matches actual output

4. COMMIT the skill
   └── Save as .claude/skills/[chapter-domain]/SKILL.md
```

**Output**: A verified expertise skill grounded in official documentation.

### Phase B: Chapter Planning

**Who does this**: Main agent + chapter-planner subagent

**Process**:

```
1. READ Chapter 14 (or previous chapter) for tone/style reference
   └── Note: characters, narrative patterns, exercise style, pacing

2. PLAN lesson breakdown
   ├── chapter-planner subagent → pedagogical arc
   ├── Define lessons (titles, goals, content outline)
   └── Map exercises to lesson positions

3. DEFINE learning objectives
   ├── /learning-objectives skill → measurable outcomes per lesson
   └── /skills-proficiency-mapper → CEFR level (A1 for Ch 14.1), Bloom's taxonomy

4. VALIDATE cognitive load
   ├── Count new concepts per lesson (target: 3-5 for A1 level)
   └── Ensure progressive complexity within the chapter

5. APPROVE plan with user before proceeding to writing
```

**Output**: Approved lesson plan with objectives, proficiency levels, and exercise placement.

### Phase C: Content Creation (Per Lesson)

**Who does this**: content-implementer subagent (NEVER the main agent directly)

**Why subagent?** The main agent is the orchestrator. Writing 500-1000 lines of educational prose in the main session causes context bloat, quality degradation, and loses the strategic view. The content-implementer subagent gets a focused prompt with everything it needs.

**Process for each lesson**:

```
1. PROMPT the content-implementer subagent with:
   ├── The expertise skill (grounded knowledge)
   ├── The lesson plan (objectives, concepts, exercises)
   ├── A reference lesson from Ch 14 (for tone matching)
   ├── Character context (James/Emma, their dynamic)
   ├── The axiom callback for this lesson's tools
   ├── Full YAML frontmatter requirements
   └── Output path (absolute, specific)

2. SUBAGENT WRITES the lesson
   ├── Opens with narrative (James/Emma)
   ├── Covers all planned content with verified commands
   ├── Includes inline exercises
   ├── Includes 3 Try With AI prompts
   ├── Adds Syntax Card if applicable
   └── Outputs complete .md file

3. VALIDATE in parallel:
   ├── educational-validator subagent → constitutional compliance
   ├── factual-verifier subagent → all commands/versions/claims verified
   └── /content-evaluation-framework skill → 6-category rubric scoring

4. FIX any issues found by validators
   └── Re-run content-implementer if needed for specific sections

5. COMMIT the lesson
   └── git add + commit with descriptive message
```

**Output**: One complete, validated, committed lesson file.

### Phase D: Chapter Assembly

**Who does this**: Main agent

**Process**:

```
1. VERIFY all lessons are committed and validated
2. CREATE chapter README.md (overview, prerequisites, lesson list)
3. CREATE quiz using /quiz-generator skill
4. RUN final content-evaluation-framework on full chapter
5. UPDATE progress tracking
6. COMMIT chapter as complete unit
```

---

## 6. Pedagogical Layer System

Every chapter maps to a pedagogical layer from the course plan. This determines what students DO in that chapter.

### The Layers

```
L1 (Manual Foundation): Student learns the concept manually first
    → Used in: Phase 1-2 chapters (Ch 14.1 through Ch 14.7)
    → Student action: Read, run commands, predict output
    → AI role: Minimal — generates scaffolding for student to read

L2 (AI Collaboration): Student knows the concept, now works WITH AI
    → Used in: Phase 3-4 chapters (Ch 14.8 through Ch 14.15)
    → Student action: Write specs/tests, AI implements, student verifies
    → AI role: Active partner — Three Roles Framework applies

L3 (Skill Building): Pattern recurs, student builds reusable skills
    → Used in: Phase 5-6 chapters (Ch 14.16 through Ch 14.21)
    → Student action: Design systems, orchestrate AI, ship software
    → AI role: Tool in student's workflow

L4 (Spec-Driven): Student drives full spec → implement → verify cycle
    → Used in: Phase 7 capstone (Ch 14.22-14.23)
    → Student action: Full architect role
    → AI role: Implementation engine
```

### Chapter 14.1 = L1 (Manual Foundation)

This means:
- Students READ and RUN, they don't write Python code yet
- Every command has expected output shown — student verifies they see the same
- Exercises are Type 1 (Read & Predict) and Type 2 (Spot the Bug)
- The chapter feels like a guided workshop, not a coding session
- Success = "my terminal shows the same output as the book"

---

## 7. Quality Gates

Every lesson must pass through these gates before it's considered done:

### Gate 1: Constitutional Compliance (Pass/Fail)

Checked by: `educational-validator` subagent

- Does it follow the 4-Layer Teaching Method?
- Does it include all required YAML frontmatter?
- Does it maintain the AI-first philosophy?
- Does it avoid the Nine Pillars violations?

**If FAIL**: Content cannot proceed. Must be revised.

### Gate 2: Factual Accuracy

Checked by: `factual-verifier` subagent

- Are all commands verified against official docs (via MCP)?
- Are all version numbers current?
- Are all config file formats correct?
- Are all expected outputs accurate?

**If FAIL**: Specific claims flagged for correction.

### Gate 3: Content Quality Score (must be >= 75%)

Checked by: `/content-evaluation-framework` skill

| Category | Weight | What It Checks |
|----------|--------|----------------|
| Technical Accuracy | 30% | Code correctness, commands work, types present |
| Pedagogical Effectiveness | 25% | Show-then-explain, progressive complexity, exercises |
| Writing Quality | 20% | Readability, grade-level appropriate, clear |
| Structure & Organization | 15% | Learning objectives met, logical flow, transitions |
| AI-First Teaching | 10% | Co-learning shown, Three Roles where applicable |

**Minimum**: 75% overall, no category below 50%.

### Gate 4: Narrative Consistency

Checked by: Main agent (manual review)

- Are James/Emma in character?
- Does the tone match Chapter 14?
- Are axiom callbacks natural (not forced)?
- Does each lesson flow into the next?

---

## 8. The "Before vs After" Teaching Pattern

This is Chapter 14's signature teaching technique and we carry it into every Python chapter.

### How It Works

For every tool or concept, show TWO versions:

**Version 1 — Without the tool (the mess):**
Show what happens when you skip this tool. Make the pain real.

```
Example for pyright:
  "James writes a function that takes a string but passes it an integer.
   Python doesn't complain. The code runs. Then it crashes at 2 AM
   in production with: TypeError: can't multiply str by int"
```

**Version 2 — With the tool (the fix):**
Show the same scenario with the tool active. The problem is caught immediately.

```
Example for pyright:
  "Emma shows James the same code with pyright running.
   A red squiggly appears BEFORE he even runs the code:
   'Argument of type int is not assignable to parameter of type str'
   Problem caught in 0.2 seconds instead of at 2 AM."
```

### Why This Works

1. **Motivation**: Students don't install tools because a book told them to. They install tools because they SAW what happens without them.
2. **Memory**: The contrast between "before" and "after" is more memorable than just showing the "right way."
3. **Axiom reinforcement**: Each "before vs after" demonstrates an axiom in action.

---

## 9. One Running Example Per Chapter

### The Problem with Multiple Examples

Most tutorials use a different example for each concept. By the end, students have seen a calculator, a todo list, a weather app, and a shopping cart — none of which connect.

### Our Approach: One Project Per Chapter

Each chapter uses ONE project that grows across all lessons:

- **Ch 14.1**: `smartnotes-starter` — a starter project that students initialize and configure
- **Ch 14.2**: The same project, now with typed variables and expressions
- **Ch 14.3**: The same project, now with its first TDG cycle

This connects to the **SmartNotes running project** from the course plan. Students aren't doing disconnected exercises — they're building one real thing.

### For Chapter 14.1 Specifically

```
L1: Why This Workbench        → No project yet, just context
L2: uv — Package Manager      → `uv init smartnotes` (project created!)
L3: pyright + ruff             → Configure tools for the smartnotes project
L4: pytest                     → Add first test to smartnotes
L5: Putting It Together        → Run full pipeline on smartnotes, verify all green
```

By the end of Ch 14.1, students have a real project directory on their machine with all tools configured. This is THEIR project that they'll evolve across 22 more chapters.

---

## 10. Platform-Specific Handling

### The Problem

uv installation is different on Windows, Mac, and Linux. pyright behaves slightly differently across platforms. Students will hit platform-specific issues.

### Our Approach: Callout Boxes, Not Separate Sections

We do NOT write three versions of each lesson. Instead:

```markdown
> **Windows users**: Run `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"` instead.

> **Mac/Linux users**: The command above works directly in your terminal.
```

**Rules for platform callouts:**
1. Keep them short (1-2 lines)
2. Place them immediately after the main command
3. Only include when the platform difference actually matters
4. Use consistent formatting (blockquote with bold platform name)
5. Test commands on all platforms during Phase A (expertise skill building)

---

## 11. Exercise Design for Phase 1 Chapters

### Exercise Type Distribution (Phase 1 = Reader)

```
Type 1: Read & Predict  — 70% of exercises (PRIMARY)
Type 2: Spot the Bug    — 20% of exercises
Type 3: Write the Test  — 10% (very simple, introduced late)
Type 4: TDG Cycle       — 0% (not yet)
Type 5: Build It         — 0% (not yet)
```

### What Read & Predict Looks Like in Ch 14.1

```markdown
**Read & Predict**: Look at this `pyproject.toml` file:

​```toml
[project]
name = "smartnotes"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = []

[tool.pyright]
typeCheckingMode = "strict"
​```

Questions:
1. What Python version does this project require?
2. What happens if you try to use Python 3.11?
3. What does `typeCheckingMode = "strict"` tell pyright to do?
```

### What Spot the Bug Looks Like in Ch 14.1

```markdown
**Spot the Bug**: James ran `uv init` and then tried to run his tests:

​```bash
$ pytest
command not found: pytest
​```

What did James forget? (Hint: think about how uv manages tools)
```

Answer: He should use `uv run pytest`, not bare `pytest`. uv manages the virtual environment — tools aren't available globally.

---

## 12. The Checkpoint Pattern

### End-of-Chapter Verification

Every chapter ends with a single checkpoint command that verifies everything taught in that chapter is working:

**Ch 14.1 Checkpoint:**
```bash
uv run ruff check . && uv run pyright && uv run pytest
```

All three must pass (green output). If any fails, the student knows exactly which lesson to revisit.

### Why This Matters

1. **Binary success**: Either it's green or it's not. No ambiguity.
2. **Pipeline preview**: This is a miniature version of the CI pipeline they'll build in Ch 14.21 (CI/CD chapter).
3. **Axiom IX in action**: "Verification is a Pipeline" — demonstrated on day one.
4. **Confidence builder**: Seeing three tools all pass on YOUR project is motivating.

---

## 13. Summary: The Complete Pipeline

```
┌─────────────────────────────────────────────────────┐
│                  CHAPTER WRITING PIPELINE            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. MCP GROUNDING                                   │
│     ├── Context7 → Official docs                    │
│     ├── Firecrawl → Changelogs, blogs               │
│     └── WebSearch → Community patterns              │
│                                                     │
│  2. EXPERTISE SKILL                                 │
│     ├── Persona, Logic, Context                     │
│     ├── Data/Knowledge (from MCP)                   │
│     ├── Safety/Guardrails                           │
│     └── Tested on real project                      │
│                                                     │
│  3. CHAPTER PLANNING                                │
│     ├── chapter-planner subagent                    │
│     ├── /learning-objectives skill                  │
│     ├── /skills-proficiency-mapper skill            │
│     └── User approval                              │
│                                                     │
│  4. CONTENT CREATION (per lesson)                   │
│     ├── content-implementer subagent                │
│     │   ├── Expertise skill as input                │
│     │   ├── Reference lesson for tone               │
│     │   ├── James/Emma characters                   │
│     │   └── Full YAML frontmatter                   │
│     │                                               │
│     ├── PARALLEL VALIDATION                         │
│     │   ├── educational-validator                   │
│     │   ├── factual-verifier                        │
│     │   └── /content-evaluation-framework           │
│     │                                               │
│     └── COMMIT per lesson                           │
│                                                     │
│  5. CHAPTER ASSEMBLY                                │
│     ├── README.md (overview)                        │
│     ├── Quiz (/quiz-generator)                      │
│     ├── Final quality score                         │
│     └── COMMIT chapter                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 14. Key Rules (Non-Negotiable)

1. **Never write lesson prose directly** — always use content-implementer subagent
2. **Never show unverified commands** — MCP ground everything first
3. **Never show untyped Python** — every code example has type annotations
4. **Never skip YAML frontmatter** — full skills, objectives, cognitive load metadata
5. **Never introduce a tool without axiom callback** — every tool connects to Ch 14
6. **Never use multiple disconnected examples** — one running project per chapter
7. **Always show "Before vs After"** — pain first, solution second
8. **Always include 3 Try With AI prompts** — each targeting a different skill
9. **Always end with checkpoint command** — binary pass/fail verification
10. **Always match Chapter 14's tone** — James/Emma, practical, respectful, problem-first

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-20 | Initial methodology document covering MCP grounding, narrative continuity, writing pipeline, quality gates, exercise design, and platform handling |
