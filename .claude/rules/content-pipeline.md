---
paths:
  - "apps/learn-app/docs/**/*.md"
---

# Content Pipeline

## YAML Frontmatter (Required for Every Lesson)

```yaml
---
sidebar_position: X
title: "..."
description: "..."
keywords: [...]
chapter: X
lesson: X
duration_minutes: X

# HIDDEN SKILLS METADATA
skills:
  - name: "Skill Name"
    proficiency_level: "A1|A2|B1|B2|C1|C2"
    category: "Conceptual|Technical|Applied|Soft"
    bloom_level: "Remember|Understand|Apply|Analyze|Evaluate|Create"
    digcomp_area: "..."
    measurable_at_this_level: "..."

learning_objectives:
  - objective: "..."
    proficiency_level: "..."
    bloom_level: "..."
    assessment_method: "..."

cognitive_load:
  new_concepts: X
  assessment: "..."

differentiation:
  extension_for_advanced: "..."
  remedial_for_struggling: "..."
---
```

## Chapter Creation Protocol (Technical Chapters)

**For new technical chapters (Part 5-6), use `/sp.chapter`:**

### Two-Phase Approach

```
PHASE A: Build Expertise Skill First
├── 1. Fetch official docs (Context7, DeepWiki)
├── 2. Research community patterns (WebSearch)
├── 3. Build programmatic skill with:
│   ├── Persona (expert identity)
│   ├── Logic (decision trees)
│   ├── Context (prerequisites)
│   ├── MCP (tool integrations)
│   ├── Data/Knowledge (API patterns)
│   └── Safety & Guardrails
├── 4. Test skill on real project (TaskManager)
└── 5. Validate and commit skill

PHASE B: Create Chapter Content
├── /sp.specify → Interview/Clarification → Plan Mode (native)
├── Tasks (native TaskCreate) → content-implementer subagent
├── validators (parallel): educational-validator, factual-verifier
├── Update progress.md, mark tasks complete
└── /sp.git.commit_pr
```

### Why Skill-First?

| Without Skill              | With Skill         |
| -------------------------- | ------------------ |
| Hallucinated APIs          | Verified patterns  |
| Memory-based facts         | Researched facts   |
| Inconsistent examples      | Tested examples    |
| 6 rewrites (Ch 2 incident) | First-time quality |

### Skill Components Required

| Component   | Purpose                     |
| ----------- | --------------------------- |
| **Persona** | Expert identity and voice   |
| **Logic**   | Decision trees, when-to-use |
| **Context** | Prerequisites, setup        |
| **MCP**     | Tool integrations           |
| **Data**    | API patterns, examples      |
| **Safety**  | Guardrails, what to avoid   |

**Command**: `/sp.chapter "Chapter N: Title"`

### Skill-First Learning Pattern (Parts 4-6)

**The thesis**: "manufacture Digital FTEs powered by agents, specs, skills"

**The insight**: Traditional learning produces knowledge. Skill-First produces **assets**.

#### Key Principles

| Traditional                                | Skill-First                                 |
| ------------------------------------------ | ------------------------------------------- |
| Learn technology → Maybe build skill later | Build skill FIRST → Learn to improve it     |
| Knowledge from AI memory (unreliable)      | Knowledge from **official docs** (reliable) |
| Assume prior state                         | **Clone fresh each chapter**                |
| Student "figures it out"                   | Student writes **LEARNING-SPEC.md**         |
| Random skill quality                       | **Grounded in documentation**               |

## Content Quality Checklist

Before finalizing ANY lesson, verify:

### 1. Full YAML Frontmatter

See the YAML Frontmatter section above. Every field is required.

### 2. Compelling Narrative Opening

- Real-world scenario connecting to reader's goals
- Business/practical hook (not just technical)
- 2-3 paragraphs before first section

### 3. Deep Evidence Throughout

- Tables comparing concepts
- Architecture diagrams where relevant
- Business impact analysis
- Concrete examples with numbers

### 4. Three "Try With AI" Prompts

- Each prompt targets different skill
- Each has "**What you're learning:**" explanation
- Prompts are copyable (code blocks)
- Final prompt connects to reader's domain

### 5. Fact-Checked Content

- All statistics verified via WebSearch
- All dates verified via WebSearch
- All adoption numbers verified
- All quotes verified

## Fact-Checking (Mandatory)

### Chapter 2 Incident (2025-12-26)

Content was rewritten 6 times due to:

1. Hallucinated facts (wrong dates, percentages, adoption numbers)
2. Missing YAML frontmatter (skills, learning objectives, cognitive load, differentiation)
3. Weak "Try With AI" sections (1 prompt instead of 3, no learning explanations)
4. Missing safety notes
5. Incorrect analogies (said "AAIF is USB" when MCP is the USB equivalent)

**Result**: 50%+ of session time spent fixing quality issues.

### Fact-Checking Protocol

**CRITICAL**: Before finalizing ANY lesson with factual claims:

1. **Identify claims needing verification**:
   - Statistics ("X% of developers...")
   - Dates ("Released November 2024...")
   - Adoption numbers ("60,000+ projects...")
   - Time savings claims ("saves 50-75% time...")
   - Company/project quotes

2. **Verify against authoritative sources** using WebSearch/WebFetch:
   - Official announcements (blog posts, press releases)
   - Primary documentation (docs.anthropic.com, openai.com)
   - Reputable tech journalism (TechCrunch, InfoQ)

3. **Never trust memory for**:
   - Exact percentages or numbers
   - Specific dates (month/day/year)
   - Quotes from executives
   - Tool/framework adoption stats

4. **Distinguish similar concepts**:
   - AAIF = governance body (like USB Implementers Forum)
   - MCP = connectivity standard (like traffic signals - universal meanings across platforms)
   - AGENTS.md = adaptability standard
   - Agent Skills = expertise packaging

### Framing Rules

- Never explain unknown X by referencing unknown Y
- Use universally known analogies (traffic signals, USB, car parts) not technical examples
- Intro lessons = conceptual analogies; later lessons = technical implementation
- Match explanation complexity to lesson position in chapter

**For complex fact-checking**: Use `factual-verifier` agent.

## Quality References

| Content Type                         | Reference Lesson                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| **Conceptual/Theory** (L1)           | Chapter 1, Lesson 1: `01-agent-factory-paradigm/01-digital-fte-revolution.md` |
| **Technical/Skill-Building** (L3/L4) | Chapter 11, Lesson 1: `11-ai-native-ides/01-setup.md`                         |

Match the appropriate reference based on lesson type. Don't force skill-building lessons to match narrative theory style.

## Three Roles Framework (L2)

When teaching AI collaboration, students must EXPERIENCE three roles through action:

- AI teaches student (suggests patterns they didn't know)
- Student teaches AI (corrects/refines output)
- Convergence loop (iterate toward better solution)

**CRITICAL**: Framework must be INVISIBLE. No meta-commentary like "AI as Teacher" or "What to notice."
