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
  - id: "<deck-id>-001" # Required. Full deck.id + hyphen + zero-padded 3 digits.
    front: "<question text>" # Required. The retrieval cue / question.
    back: "<answer text>" # Required. The answer. Use \n for line breaks.
    tags: ["tag1", "tag2"] # Required. At least 1 tag per card.
    difficulty: "basic" # Required. One of: "basic", "intermediate", "advanced".
    why: "<elaboration>" # Optional. Only on thinking cards. Deepens understanding.
```

## Field Details

### deck.id

- Kebab-case string, globally unique within the book
- Used as the key for localStorage FSRS state
- Convention: `<part-or-chapter>-<lesson-slug>`
- Examples: `preface-agent-native`, `ch05-reusable-skills`, `ch05-03-skills`

### deck.version

- Integer starting at 1
- When bumped, the FSRS hook resets all card progress for this deck
- Always bump when regenerating an existing deck

### card.id

- Pattern: `{deck.id}-{NNN}` where NNN is zero-padded 3 digits
- Uses the **full deck.id** as prefix to guarantee global uniqueness
- Example: deck.id `ch05-reusable-skills` → cards `ch05-reusable-skills-001`, `ch05-reusable-skills-002`
- Must be unique within the deck AND across all decks in the book
- The validator at `apps/learn-app/scripts/validate-flashcards.ts` checks global uniqueness

### card.front

- Plain text (no markdown)
- One concept, one question
- Must be self-contained (makes sense without seeing the lesson)
- Must not contain the answer

### card.back

- Plain text with `\n` for line breaks
- Concise but complete
- **Must NOT start with "Yes" or "No"** (schema validation rejects these)

### card.tags

- Array of kebab-case strings
- At least 1, recommend 2-3
- Use semantic categories: `["methodology", "sdd"]` not `["general"]`

### card.difficulty

- `"basic"` — Remember/Understand (Bloom's L1-2)
- `"intermediate"` — Apply/Analyze (Bloom's L3-4)
- `"advanced"` — Evaluate/Create (Bloom's L5-6)

### card.why

- Optional elaborative interrogation prompt
- Present on thinking cards (Why/How questions), absent on recall cards
- Asks HOW or WHY to push understanding one level deeper
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
- [ ] Card IDs use full `deck.id` as prefix: `{deck.id}-{NNN}`
- [ ] No duplicate card IDs within or across decks
- [ ] All difficulty values are one of: basic, intermediate, advanced
- [ ] Card backs do not start with "Yes" or "No"
- [ ] YAML parses without errors
- [ ] No unescaped special characters in string values
