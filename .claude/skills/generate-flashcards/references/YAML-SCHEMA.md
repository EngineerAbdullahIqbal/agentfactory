# Flashcard YAML Schema

Exact format consumed by the `remark-flashcards` plugin and rendered by `<Flashcards />`.

## File Naming

```
<lesson-basename>.flashcards.yaml
```

The file sits adjacent to the lesson `.md` file. The remark plugin discovers it by replacing the `.md` extension with `.flashcards.yaml`.

Examples:

- `01_intro.md` → `01_intro.flashcards.yaml`
- `thesis.md` → `thesis.flashcards.yaml`

## Schema

```yaml
deck:
  id: "<unique-deck-id>" # Required. Kebab-case. Used as localStorage key.
  title: "<Display Title>" # Required. Human-readable deck title.
  description: "<description>" # Required. 1-2 sentence summary of what the deck covers.
  tags: ["tag1", "tag2"] # Required. Array of topic tags.
  version: 1 # Required. Integer. Bump on regeneration (triggers FSRS reset).

cards:
  - id: "<short-prefix>-001" # Required. Pattern: {short-prefix}-{NNN}. Zero-padded 3 digits.
    front: "<question text>" # Required. The retrieval cue / question.
    back: "<answer text>" # Required. The answer. Use \n for line breaks.
    tags: ["tag1", "tag2"] # Required. At least 1 tag per card.
    difficulty: "basic" # Required. One of: "basic", "intermediate", "advanced".
    why: "<elaboration>" # Optional. Elaborative interrogation prompt (40-60% of cards).
```

## Field Details

### deck.id

- Kebab-case string, globally unique within the book
- Used as the key for localStorage FSRS state
- Convention: `<part-or-chapter>-<lesson-slug>`
- Examples: `preface-agent-native`, `ch05-lesson03-skills`

### deck.version

- Integer starting at 1
- When bumped, the FSRS hook resets all card progress for this deck
- Always bump when regenerating an existing deck

### card.id

- Pattern: `{deck-id-short}-{NNN}` where NNN is zero-padded
- `{deck-id-short}` is a shortened prefix derived from deck.id (e.g., deck.id `preface-agent-native` → card prefix `preface`, deck.id `ch01-factory-paradigm` → card prefix `ch01`)
- Must be unique within the deck
- Sequential numbering: 001, 002, 003...

### card.front

- Plain text (no markdown)
- One concept, one question
- Under 30 words
- Must not contain the answer

### card.back

- Plain text with `\n` for line breaks
- Under 60 words
- Concise but complete

### card.tags

- Array of kebab-case strings
- At least 1, recommend 2-3
- Use semantic categories: `["methodology", "sdd"]` not `["general"]`

### card.difficulty

- `"basic"` — Remember/Understand (Bloom's L1-2)
- `"intermediate"` — Apply/Analyze (Bloom's L3-4)
- `"advanced"` — Evaluate/Create (Bloom's L5-6)
- Target: 30% basic, 50% intermediate, 20% advanced

### card.why

- Optional elaborative interrogation prompt
- Present on 40-60% of cards (prefer intermediate and advanced)
- Asks HOW or WHY to deepen processing
- Must NOT repeat the front question

## YAML Escaping

Strings containing `:`, `#`, `"`, or `'` must be quoted:

```yaml
# Correct
front: "SaaS model: pay per seat"
back: "He said: \"yes\""

# Also correct — use block scalars for complex text
back: >-
  First line of answer.
  Second line continues here.
```

When using `\n` for line breaks in quoted strings, use double quotes:

```yaml
back: "Line one\nLine two\nLine three"
```

## Validation Checklist

- [ ] `deck.id` is kebab-case and unique
- [ ] `deck.version` is a positive integer
- [ ] Every card has `id`, `front`, `back`, `tags`, `difficulty`
- [ ] Card IDs follow `{short-prefix}-{NNN}` pattern
- [ ] No duplicate card IDs
- [ ] All difficulty values are one of: basic, intermediate, advanced
- [ ] YAML parses without errors
- [ ] No unescaped special characters in string values
