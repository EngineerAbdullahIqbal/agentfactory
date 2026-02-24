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

Follow the **minimum information principle** (one question, one answer). Keep questions concise but explicit (**under 40 words**). Ensure each card is self-contained and atomic (tests only one concept). Focus on **key terms, formulas, and relationships**. A student should be able to answer in under 5 seconds.

**The test**: Cover the back — can a student who read the lesson produce the answer from memory? If yes, the card works. If the card requires context not on the front, it fails.

**Back length**: Recall backs must be **under 15 words**. Just the fact — no explanation, no elaboration. If you need more words, you're explaining (that's a thinking card) or testing two things (split).

**One question per card**: If the front contains "and" joining two distinct questions, split it into two cards. "What is X and why does it matter?" = two cards.

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

# BAD: Back is a paragraph — just give the fact, not the explanation.
- front: "In the Agent Factory era, what do companies manufacture?"
  back: "AI employees — role-based systems that compose tools, spawn
    specialist agents, and deliver outcomes at scale."
# FIXED: back: "AI employees (Digital FTEs)"
```

### Thinking Cards (half the deck)

Focus on **understanding, not just rote memorization**. The question itself must be a **Why** or **How** question to encourage deeper thinking and force the student to reason, not just retrieve. These cards take 10-30 seconds to answer.

**The test**: Does answering this card require the student to _think_, not just _remember_? If a parrot could answer it, it's not a thinking card.

**The reasoning-chain test**: Read just the back. Does it contain a **BECAUSE** or **THEREFORE** — an actual causal chain? Or is it a fact someone could memorize from a bullet point? If there's no reasoning in the back, it's a disguised recall card. Reclassify or rewrite.

**Back length**: Thinking backs should be **20-40 words**. Lead with the key insight, follow with one reasoning step. Over 40 words = you're testing multiple things or writing an essay.

**Front variety**: Vary thinking card formats across the deck. Use scenarios, comparisons, counterfactuals, and causal questions — not just "Why does the [source] argue that...". **No more than 2 cards per deck** may use the "Why does the [text/lesson/preface] argue/say/recommend..." template.

**Good thinking card**:

```yaml
# Scenario — student must reason about what's missing
- id: "preface-agent-native-002"
  front: "A startup builds great AI agents with solid cloud infrastructure, but revenue stalls. Why?"
  back: "Technology without a business model doesn't generate revenue. The Agent Factory requires all three pillars — agents, infrastructure, AND a model for selling verified outcomes."
  tags: ["agent-factory", "business-model"]
  difficulty: "intermediate"
  why: "What's the difference between selling outcomes and selling software subscriptions?"

# Counterfactual — what breaks if you remove X?
- id: "ch01-example-002"
  front: "What would happen if a company deployed Custom Agents without any Incubation phase first?"
  back: "They'd over-engineer solutions to the wrong problem. Without exploration, requirements are guesses — the resulting agent is brittle and must be rebuilt."
  tags: ["agent-maturity-model", "anti-patterns"]
  difficulty: "advanced"
  why: "How would you recognize premature specialization in a real project?"
```

**Bad thinking card** (and why):

```yaml
# BAD: This is just a recall card with "Why" stapled on.
- front: "Why is SDD important?"
  back: "Because specs are the source of truth."

# BAD: Disguised recall — the back is a memorizable before/after comparison, not reasoning.
- front: "How does the human role change from the SaaS era to the Agent Factory era?"
  back: "From operator to supervisor and verifier."
# FIXED: Make it a recall card, or rewrite to require actual reasoning:
#   front: "Why does shifting from operator to supervisor require new skills, not just less work?"

# BAD: Answer is too short — no reasoning shown.
- front: "A company's AI agents keep failing in production. What's the likely cause?"
  back: "No evaluation."

# BAD: Front is so long it becomes a reading exercise, not a thinking exercise.
- front:
    "Given that a company has deployed agents using Claude Code with MCP integration
    and their specs follow the SDD methodology but they haven't implemented golden
    dataset evaluation and their shadow mode period was only 2 weeks..."
  back: "..."

# BAD: Formulaic — 6 cards in one deck all start with "Why does the lesson argue..."
- front: "Why does the lesson argue that open-source AI models are critical?"
# FIXED: "Open-source AI models are available but governments still build proprietary systems. Why?"
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

- Direct explicit question (**under 40 words**), atomic answer (**under 15 words**)
- Front must end with `?`
- Focus on key terms, formulas, and relationships
- No `why` field
- Difficulty: `basic` or `intermediate`
- Back = just the fact. No reasoning, no elaboration, no "because". If back needs explanation, it's a thinking card.

**Thinking cards**:

- Focus on **understanding, not just rote memorization**
- Front must be an explicit **Why** or **How** question
- Always has `why` field (single question, under 20 words)
- Difficulty: `intermediate` or `advanced`
- Back must contain a **reasoning chain** (BECAUSE/THEREFORE), not just a fact. 20-40 words.
- Vary front formats: scenarios, counterfactuals, comparisons, causal chains. Max 2 per deck using "Why does the [source] argue...".

**Mix them** — alternate recall and thinking cards throughout the deck. Don't cluster all recall cards at the top.

### 5. Self-Check Before Writing

Read through your cards as if you're a student who read the lesson last month:

- [ ] Does every front make sense without seeing the lesson? (self-contained)
- [ ] Could a parrot answer this? If yes, it's recall — make sure it's marked that way
- [ ] Are the thinking cards actually testing understanding, or just recall with extra words?
- [ ] Read each thinking card back: does it contain a BECAUSE/THEREFORE reasoning chain, or just a memorizable fact?
- [ ] Did I skip any concept that a student would be embarrassed not to know?
- [ ] Is any card testing two things? Split it. (Check for "and" joining two questions.)
- [ ] Does any back start with "Yes" or "No"? Rephrase. (The validator script rejects these.)
- [ ] Are recall backs **under 15 words**? If not, trim to just the fact.
- [ ] Are thinking backs **under 40 words**? If not, you're testing too many things.
- [ ] Does every front end with `?`
- [ ] Do all thinking cards include a non-empty `why` field?
- [ ] Do recall cards avoid `why` entirely?
- [ ] Do thinking fronts explicitly contain `Why` or `How`?
- [ ] Are recall/thinking counts roughly 50/50 (target band: 45%-55% each)?
- [ ] Do **no more than 2** thinking fronts use "Why does the [source] argue/say/recommend..."?
- [ ] Difficulty distribution: basic 25-35%, intermediate 45-55%, advanced 15-25%? (If basic >40%, promote some cards.)

### 6. Write the YAML

Write `<lesson-basename>.flashcards.yaml` adjacent to the `.md` file. Follow the schema in `references/YAML-SCHEMA.md`.

### 6.5 Mandatory Quality Gate (Do Not Skip)

Before you finalize, enforce these constraints:

1. Card IDs must match `^{deck.id}-\d{3}$` exactly. Never shorten the prefix (for example `preface-001` is invalid if `deck.id` is `preface-agent-native`).
2. Every card `front` ends with `?`.
3. Every thinking card has a non-empty `why` field.
4. No recall card includes a `why` field.
5. Thinking card fronts explicitly include `Why` or `How`.
6. Recall/thinking balance is within 45%-55% each.
7. Recall fronts remain under 40 words.
8. No card back starts with `Yes` or `No`.
9. **Recall backs under 15 words.** Count them. If over, trim to just the fact.
10. **Thinking backs 20-40 words.** Lead with the insight, add one reasoning step.
11. **No compound questions.** If a front has "and" joining two questions, split into two cards.
12. **Thinking front variety.** No more than 2 cards per deck use "Why does the [source] argue/say/recommend..." — use scenarios, counterfactuals, and comparisons instead.
13. **Difficulty distribution.** basic: 25-35%, intermediate: 45-55%, advanced: 15-25%. If basic >40%, promote cards. If advanced = 0%, promote deepest thinking cards.

If any gate fails, revise cards and re-check before returning the final output.

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

**Target**: 25-35% basic, 45-55% intermediate, 15-25% advanced. Count after generating all cards. If basic >40%, promote complex recall cards to intermediate. If advanced = 0%, promote the deepest thinking cards to advanced. Every deck should have at least 1-2 advanced cards.

## Chapter Mode

When generating for an entire chapter:

1. `ls <chapter-dir>/*.md` — discover lessons
2. Skip README.md, index.md, _category_.json
3. Generate for each lesson sequentially
4. Each lesson gets its own deck with its own `deck.id` — no shared IDs

## Cross-Deck Awareness

When generating for related lessons (same chapter, same part, or book-level pages like thesis/preface):

1. Check for existing `.flashcards.yaml` files in sibling directories
2. If a concept already has a card in a sibling deck, either **skip it** or **card it from a distinctly different angle**
3. Never duplicate the same concept with the same framing across decks

## Common Mistakes

| What goes wrong                                | How to fix it                                                                 |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| All cards feel the same                        | Check: is each card clearly recall OR thinking? Not a muddy mix.              |
| Cards aren't self-contained                    | Add context to the front: "In the Agent Factory model, ..."                   |
| Thinking cards are just recall with "Why"      | Read the back: does it have BECAUSE/THEREFORE reasoning? If not, it's recall. |
| Recall back is a paragraph                     | Under 15 words. Just the fact. No "because", no elaboration.                  |
| Thinking back is an essay                      | 20-40 words. Key insight + one reasoning step. Split if longer.               |
| Front has "X and Y?" compound question         | Split into two cards. One concept per card, always.                           |
| All thinking fronts say "Why does the text..." | Max 2 per deck. Use scenarios, counterfactuals, comparisons instead.          |
| 50% basic difficulty                           | Target: 25-35% basic. Promote complex recall to intermediate.                 |
| 0% advanced cards                              | Target: 15-25%. Promote deepest thinking cards.                               |
| `why` repeats the front                        | Push to a different dimension: implications, prevention, adjacent concepts    |
| Too many cards about minor details             | Would a student be embarrassed not to know this? If not, cut it.              |
| ID uses shortened prefix (e.g. `preface-001`)  | Card IDs must be `deck.id-NNN` (full prefix, no abbreviations).               |
| YAML special chars break parsing               | Quote strings with `: # " '`                                                  |
| Card back starts with "Yes"/"No"               | Validator rejects these. Rephrase directly.                                   |
| Same concept in two sibling decks              | Skip or card from a different angle. Never duplicate.                         |

## Report

After generation, output:

```
Generated: <path>
Cards: <count> total (recall: N, thinking: N)
Why fields: N
Ratios: recall=<0.00>, thinking=<0.00>, thinking-fronts-with-why/how=<0.00>
ID format: PASS/FAIL (`deck.id-NNN`)
Fronts end with '?': PASS/FAIL
Recall backs ≤15 words: PASS/FAIL (longest: N words)
Thinking backs 20-40 words: PASS/FAIL (longest: N words)
Compound questions: PASS/FAIL (N found)
"Why does the [source]..." fronts: N (max 2)
Difficulty: basic: N (NN%), intermediate: N (NN%), advanced: N (NN%)
```

## References

- **`references/LEARNING-SCIENCE.md`** — Cognitive science foundations (retrieval practice, minimum information, elaborative interrogation)
- **`references/CARD-TYPES.md`** — Card type examples and anti-patterns
- **`references/YAML-SCHEMA.md`** — Exact YAML schema, field constraints, escaping rules
