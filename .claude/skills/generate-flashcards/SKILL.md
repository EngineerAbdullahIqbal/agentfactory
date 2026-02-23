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

Produce `.flashcards.yaml` files grounded in 6 evidence-based cognitive science strategies. Each deck targets 15-25 cards per lesson with variety across 6 card types.

## Project Context

```
Book root:    apps/learn-app/docs/
Structure:    apps/learn-app/docs/{NN-Part}/{NN-chapter}/*.md
Output:       .flashcards.yaml sits adjacent to its .md file
Plugin:       libs/docusaurus/remark-flashcards/ (auto-discovers YAML at build time)
```

**Path resolution**: When user says "ch 5" or "chapter 5", discover the path:

```bash
ls -d apps/learn-app/docs/*/05-*/
```

When user gives a bare lesson name, find it:

```bash
find apps/learn-app/docs -name "*lesson-slug*" -name "*.md"
```

**Existing flashcard files** — check before generating to avoid duplicates:

```bash
find apps/learn-app/docs -name "*.flashcards.yaml"
```

## Workflow

### 1. Resolve Target

```
Single lesson:  User provides path or lesson name → resolve to .md file
Chapter:        User says "ch N" or provides chapter dir → generate for each lesson .md
Bare name:      Search with find/glob to locate the .md file
```

For chapters, process each lesson sequentially. Skip files that already have a `.flashcards.yaml` unless user requests regeneration (bump `deck.version`).

### 2. Check Existing

```bash
# Check if flashcards already exist
ls <lesson-basename>.flashcards.yaml
```

- If exists and user wants regeneration → read existing, bump version, regenerate
- If exists and no regeneration requested → skip with notice
- If not exists → generate fresh (version: 1)

### 3. Read and Extract

Read the lesson `.md` file. Extract:

- **Key concepts** — terms, definitions, frameworks
- **Relationships** — comparisons, hierarchies, cause-effect
- **Processes** — steps, workflows, sequences
- **Applications** — scenarios, use cases, examples

Do NOT hallucinate content. Every card must trace to source material.

### 4. Generate Cards

Apply all 6 learning science strategies from `references/LEARNING-SCIENCE.md`:

| Strategy                  | How Applied                                            |
| ------------------------- | ------------------------------------------------------ |
| Retrieval Practice        | Front = cue requiring reconstruction, not recognition  |
| Elaborative Interrogation | `why` field on 40-60% of cards (intermediate/advanced) |
| Desirable Difficulty      | 30% basic, 50% intermediate, 20% advanced              |
| Interleaving              | Mix card types; no more than 3 consecutive same type   |
| Dual Coding               | Use `\n` for structured comparisons, lists, contrasts  |
| Minimum Information       | One concept per card; atomic fronts, concise backs     |

Use the 6 card types from `references/CARD-TYPES.md`:

| Type        | Target % | When to Use                                           |
| ----------- | -------- | ----------------------------------------------------- |
| Definition  | 20%      | Vocabulary — but convert to Application when possible |
| Comparison  | 15%      | Two concepts with discriminative contrast             |
| Application | 30%      | Scenario + question requiring analysis                |
| Causation   | 15%      | Why/how mechanisms                                    |
| Enumeration | 10%      | Structured recall of components                       |
| Reversal    | 10%      | Answer-as-prompt for bidirectional links              |

### 5. Quality Gates

Before writing output, verify:

- [ ] 10-25 cards (8-12 for short lessons, 15-25 for standard lessons)
- [ ] 75%+ cards at Apply level or higher (not pure recall)
- [ ] `why` field on 40-60% of cards
- [ ] Difficulty split: ~30% basic, ~50% intermediate, ~20% advanced
- [ ] Card types mixed (no more than 3 consecutive same type)
- [ ] IDs follow `{short-prefix}-{NNN}` pattern (zero-padded)
- [ ] Tags on every card (at least 1, prefer 2-3)
- [ ] No hallucinated facts — all content from source lesson
- [ ] YAML valid (proper quoting, escaping)

### 6. Write Output

Write `<lesson-basename>.flashcards.yaml` adjacent to the lesson `.md` file.

Follow exact schema in `references/YAML-SCHEMA.md`.

### 7. Lesson Heading Convention

When flashcards are added to a lesson `.md` file, the section heading must be:

```markdown
## Flashcards Study Aid

<Flashcards />
```

**Not** `## Flashcards`. The canonical title is "Flashcards Study Aid".

### 8. Report

After generation, output:

```
Generated: <path>
Cards: <count> (basic: N, intermediate: N, advanced: N)
Types: definition: N, comparison: N, application: N, causation: N, enumeration: N, reversal: N
Why fields: N/total (XX%)
```

## Card Writing Rules

### Front (Question Side)

- Plain text, no markdown
- One concept, one question — never "What are X and Y?"
- Under 30 words
- Must NOT contain or hint at the answer
- Prefer scenario-based prompts over "What is X?"

**Anti-pattern**: "What are the 3 pillars?" (retrieval of a list)
**Correct**: "A startup has agents and infrastructure but revenue stalls. Which pillar is missing?"

### Back (Answer Side)

- Plain text with `\n` for line breaks
- Under 60 words
- Concise but complete — no filler
- Use `\n` for visual structure in comparisons and lists
- **NEVER start the answer with "Yes" or "No"** (this fails our strict YAML schema validation). Rephrase to be direct (e.g., instead of "No, societies that...", use "Historically, societies that...").

### Why Field

- Present on 40-60% of cards (prefer intermediate and advanced)
- Asks HOW or WHY to deepen processing
- Must NOT repeat the front question
- Connects concept to prior knowledge or adjacent ideas

### Difficulty

- `basic` — Remember/Understand (Bloom's L1-2): definitions, identifications
- `intermediate` — Apply/Analyze (Bloom's L3-4): scenarios, comparisons, causal reasoning
- `advanced` — Evaluate/Create (Bloom's L5-6): critique, predict, synthesize

### Deck ID and Card ID Convention

**Deck ID** (used as localStorage key):

- Kebab-case: `<section>-<lesson-slug>`
- Examples: `preface-agent-native`, `ch01-factory-paradigm`, `ch05-reusable-skills`

**Card ID prefix** (shortened from deck ID for readability):

- Use the first segment of the deck ID: `preface`, `ch01`, `ch05`
- Card IDs: `preface-001`, `ch01-001`, `ch05-001`

## Common Pitfalls

| Pitfall                       | Fix                                                 |
| ----------------------------- | --------------------------------------------------- |
| All definition cards          | Convert 60%+ to Application or Comparison           |
| `why` repeats the front       | Push further — ask about mechanisms or implications |
| Front contains answer         | Rewrite as scenario or reversal                     |
| Cards clustered by type       | Interleave — alternate types throughout deck        |
| Unescaped YAML special chars  | Quote strings containing `: # " '`                  |
| Hallucinated facts            | Cross-check every claim against source lesson       |
| Cards too long                | Split into multiple atomic cards                    |
| Back starts with "Yes" / "No" | Schema validation fails. Rephrase answer directly   |

## Chapter Mode

When generating for an entire chapter directory:

1. `ls <chapter-dir>/*.md` to discover lessons
2. Skip non-lesson files (README.md, index.md, _category_.json)
3. Generate for each lesson sequentially
4. Use consistent deck ID prefix: `ch{NN}-` where NN is chapter number

## References

- **`references/LEARNING-SCIENCE.md`** — 6 evidence-based strategies with citations and application rules
- **`references/CARD-TYPES.md`** — 6 card types with examples, target distribution, interleaving rule
- **`references/YAML-SCHEMA.md`** — Exact YAML schema, field constraints, escaping rules, validation checklist
