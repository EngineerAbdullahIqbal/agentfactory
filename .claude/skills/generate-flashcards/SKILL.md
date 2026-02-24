---
name: generate-flashcards
description: >-
  Generate learning-science-backed flashcard YAML files from lesson content.
  Use when: (1) a lesson .md file needs flashcards generated, (2) a chapter
  directory needs flashcards for all lessons, (3) user says "generate flashcards",
  "create flashcards", "make cards for", or references /generate-flashcards.
  Produces .flashcards.yaml files adjacent to lesson .md files, consumed by
  the remark-flashcards plugin and rendered by Flashcards components.
---

# Generate Flashcards

Generate two kinds of cards from lesson content — **recall cards** that lock in critical facts, and **thinking cards** that force genuine understanding. Half and half. That's it.

## What Makes a Good Card

Read this section first. Everything else is mechanics.

### Recall Cards (half the deck)

One question, one answer. Atomic. Self-contained. A student should be able to answer in under 5 seconds.

**The test**: Cover the back — can a student who read the lesson produce the answer from memory? If yes, the card works. If the card requires context not on the front, it fails.

**Good recall card**:

```yaml
- id: "preface-agent-native-001"
  front: "In the Agent Factory model, what are the three pillars?"
  back: "1. AI Agents\n2. Cloud Infrastructure\n3. Business Model"
  tags: ["agent-factory", "pillars"]
  difficulty: "basic"
```

**Bad recall card** (and why):

```yaml
# BAD: Too vague — what kind of "pillars"? Not self-contained.
- front: "What are the three pillars?"
  back: "Agents, Infrastructure, Business Model"

# BAD: Tests recognition, not recall — the answer is in the question.
- front: "Is SDD the methodology where specs are the source of truth?"
  back: "Yes"

# BAD: Tests two things at once — split into two cards.
- front: "What is SDD and what is MCP?"
  back: "SDD is spec-driven development. MCP is model context protocol."
```

### Thinking Cards (half the deck)

The question itself is a Why or How question that forces the student to reason, not just retrieve. These cards take 10-30 seconds to answer.

**The test**: Does answering this card require the student to _think_, not just _remember_? If a parrot could answer it, it's not a thinking card.

**Good thinking card**:

```yaml
- id: "preface-agent-native-002"
  front: "A startup builds great AI agents with solid cloud infrastructure, but revenue stalls. Why?"
  back: "Technology without a business model doesn't generate revenue. The Agent Factory requires all three pillars — agents, infrastructure, AND a model for selling verified outcomes."
  tags: ["agent-factory", "business-model"]
  difficulty: "intermediate"
  why: "What's the difference between selling outcomes and selling software subscriptions?"
```

**Bad thinking card** (and why):

```yaml
# BAD: This is just a recall card with "Why" stapled on.
- front: "Why is SDD important?"
  back: "Because specs are the source of truth."

# BAD: Answer is too short — no reasoning shown.
- front: "A company's AI agents keep failing in production. What's the likely cause?"
  back: "No evaluation."

# BAD: Front is so long it becomes a reading exercise, not a thinking exercise.
- front:
    "Given that a company has deployed agents using Claude Code with MCP integration
    and their specs follow the SDD methodology but they haven't implemented golden
    dataset evaluation and their shadow mode period was only 2 weeks..."
  back: "..."
```

### The `why` Field

Only on thinking cards. A single question, under 20 words, that pushes one level deeper — implications, mechanisms, or connections to other concepts. It must NOT repeat the front.

**Good**: Front asks "Why did X happen?" → `why` asks "How would you prevent X?"
**Bad**: Front asks "Why did X happen?" → `why` asks "Can you explain why X happened?"

### Self-Contained Rule

Every card must make sense in isolation. A student reviewing cards 3 weeks later has forgotten the lesson structure. If your card front says "What is the third element?" — third element of what? Always anchor terms in their context.

## Card Generation Process

### 1. Find the Lesson

```bash
# "ch N" or "chapter N" — substitute the chapter number:
ls -d apps/learn-app/docs/*/NN-*/

# Bare lesson name:
find apps/learn-app/docs -name "*lesson-slug*" -name "*.md"
```

### 2. Check for Existing Flashcards

```bash
# Use absolute path — CWD may vary
ls "$(dirname /absolute/path/to/lesson.md)/$(basename /absolute/path/to/lesson.md .md).flashcards.yaml" 2>/dev/null
```

- Exists + no regeneration requested → skip with notice
- Exists + regeneration requested → bump `deck.version`, regenerate
- Doesn't exist → generate fresh (version: 1)

### 3. Read the Lesson

Read the full `.md` file. As you read, identify:

- **What's worth memorizing** — key terms, frameworks, numbered lists, definitions that a student must know cold
- **What's worth understanding** — causal mechanisms, tradeoffs, decision frameworks, "why X and not Y" questions

**Prioritization guide** (highest → lowest card-worthiness):

1. Definitions and named concepts (a student who can't define the terms can't think with them)
2. Frameworks and models (pillars, phases, layers — the structural scaffolding)
3. Numbered lists and enumerations (easy to half-remember, cards prevent that)
4. Causal claims and tradeoffs (why X beats Y, what breaks when Z fails)
5. Examples that embody a principle (concrete anchors for abstract ideas)

Skip: anecdotes, historical color, motivational asides, repeated explanations of the same point.

**Card density**: Aim for ~1 card per 150-200 words of prose content (don't count code blocks or configuration examples). Floor: 8 cards (thinner lessons still have core concepts). Ceiling: 25 cards (longer lessons — pick the most important, don't exhaustively card everything). If a lesson has fewer than 8 card-worthy concepts, generate fewer cards — never pad a deck with filler.

### 4. Generate Cards

Write **recall cards** for things worth memorizing. Write **thinking cards** for things worth understanding. Aim for roughly half and half. Apply the three learning science principles from `references/LEARNING-SCIENCE.md`: **Minimum Information** (one concept per card), **Retrieval Practice** (force recall, never hint at the answer), and **Elaborative Interrogation** (thinking cards push deeper with `why`).

**Recall cards**:

- Direct question, atomic answer
- No `why` field
- Difficulty: `basic` or `intermediate`
- Keep fronts concise. Keep backs crisp — just the fact, no explanation.

**Thinking cards**:

- Scenario-based or Why/How question
- Always has `why` field (single question, under 20 words)
- Difficulty: `intermediate` or `advanced`
- Back includes reasoning, not just the answer word.

**Mix them** — alternate recall and thinking cards throughout the deck. Don't cluster all recall cards at the top.

### 5. Self-Check Before Writing

Read through your cards as if you're a student who read the lesson last month:

- [ ] Does every front make sense without seeing the lesson? (self-contained)
- [ ] Could a parrot answer this? If yes, it's recall — make sure it's marked that way
- [ ] Are the thinking cards actually testing understanding, or just recall with extra words?
- [ ] Did I skip any concept that a student would be embarrassed not to know?
- [ ] Is any card testing two things? Split it.
- [ ] Does any back start with "Yes" or "No"? Rephrase. (The validator script rejects these.)

### 6. Write the YAML

Write `<lesson-basename>.flashcards.yaml` adjacent to the `.md` file. Follow the schema in `references/YAML-SCHEMA.md`.

### 7. Heading Convention

When adding flashcards to a lesson `.md` file, use:

```markdown
## Flashcards Study Aid

<Flashcards />
```

## Card ID Strategy (Prevents Collisions)

Card IDs must be globally unique across all decks in the book. Use the **full `deck.id`** as the card prefix:

```yaml
deck:
  id: "ch05-reusable-skills" # Globally unique deck ID

cards:
  - id: "ch05-reusable-skills-001" # Full deck ID + sequence
  - id: "ch05-reusable-skills-002"
```

This prevents collisions when multiple lessons in the same chapter generate cards. The validator at `apps/learn-app/scripts/validate-flashcards.ts` checks global uniqueness across all decks.

**Deck ID convention**: `<section>-<lesson-slug>` in kebab-case.

- `preface-agent-native`, `ch01-factory-paradigm`, `ch05-reusable-skills`
- For lessons with numeric prefixes: `ch05-03-skills` (chapter 5, lesson 03)

## Difficulty

- `basic` — Can you recall this fact? (definitions, identifications, lists)
- `intermediate` — Can you apply this? (scenarios, comparisons, causal reasoning)
- `advanced` — Can you evaluate or create? (critique, predict consequences, synthesize)

Aim for roughly 30% basic, 50% intermediate, 20% advanced — but don't force it. Some lessons are more conceptual (more thinking cards), some are more vocabulary-heavy (more recall cards).

## Chapter Mode

When generating for an entire chapter:

1. `ls <chapter-dir>/*.md` — discover lessons
2. Skip README.md, index.md, _category_.json
3. Generate for each lesson sequentially
4. Each lesson gets its own deck with its own `deck.id` — no shared IDs

## Common Mistakes

| What goes wrong                           | How to fix it                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| All cards feel the same                   | Check: is each card clearly recall OR thinking? Not a muddy mix.           |
| Cards aren't self-contained               | Add context to the front: "In the Agent Factory model, ..."                |
| Thinking cards are just recall with "Why" | The answer must require reasoning. If it's a single term, it's recall.     |
| `why` repeats the front                   | Push to a different dimension: implications, prevention, adjacent concepts |
| Too many cards about minor details        | Would a student be embarrassed not to know this? If not, cut it.           |
| YAML special chars break parsing          | Quote strings with `: # " '`                                               |
| Card back starts with "Yes"/"No"          | Validator rejects these. Rephrase directly.                                |

## Report

After generation, output:

```
Generated: <path>
Cards: <count> total (recall: N, thinking: N)
Why fields: N
Difficulty: basic: N, intermediate: N, advanced: N
```

## References

- **`references/LEARNING-SCIENCE.md`** — Cognitive science foundations (retrieval practice, minimum information, elaborative interrogation)
- **`references/CARD-TYPES.md`** — Card type examples and anti-patterns
- **`references/YAML-SCHEMA.md`** — Exact YAML schema, field constraints, escaping rules
