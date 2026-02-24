# Frontmatter-to-Blended-Approach Reference

How to use each frontmatter field from lesson content to plan your blended discovery cycle.

## Field Mapping to Phases

| Frontmatter Field                         | Phase        | How It Drives Teaching                                                                        |
| ----------------------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `title`                                   | HOOK         | Frame the scenario context                                                                    |
| `description`                             | Planning     | Understand the lesson's scope — DO NOT read aloud                                             |
| `skills`                                  | BUILD        | These are what the learner should DISCOVER (hidden goals)                                     |
| `skills[].proficiency_level`              | BUILD        | Calibrate Socratic question difficulty: A1=leading, B1=open, C1=challenging                   |
| `skills[].bloom_level`                    | LOCK         | Retrieval challenge should match this level                                                   |
| `learning_objectives`                     | LOCK         | What retrieval should verify — each objective is a recall target                              |
| `cognitive_load`                          | Planning     | `low`: single cycle. `medium`: 1-2 cycles. `high`: 2-3 cycles                                 |
| `cognitive_load.new_concepts`             | Planning     | Number of concepts → number of blended cycles                                                 |
| `teaching_guide.key_points[]`             | BUILD + FILL | Must-discover list. Every key point should emerge during BUILD or be covered in FILL          |
| `teaching_guide.misconceptions[]`         | BUILD        | Design questions that surface and correct these during discovery                              |
| `teaching_guide.discussion_prompts[]`     | BUILD        | Use as Socratic question seeds                                                                |
| `teaching_guide.teaching_tips[]`          | Planning     | Author's pedagogical advice for your hidden teaching plan                                     |
| `teaching_guide.assessment_quick_check[]` | BUILD        | Use between concept clusters as formative checks                                              |
| `differentiation`                         | Adaptation   | `extension_for_advanced`: harder BUILD questions. `remedial_for_struggling`: more scaffolding |
| `duration_minutes`                        | Planning     | Pace your cycles — don't rush a 30-min lesson into 5 minutes                                  |
| `practice_exercise`                       | HOOK         | If present, integrate into the scenario — the exercise becomes the hook's build challenge     |
| `keywords`                                | BUILD        | Terms the learner should arrive at through discovery, not be told                             |
| `hide_table_of_contents`                  | Planning     | If true, teach linearly without offering to skip                                              |

## Planning Workflow (Before Engaging Learner)

1. **Read all frontmatter fields** — extract the teaching blueprint
2. **Count `cognitive_load.new_concepts`** → determine cycle count (1-3 cycles)
3. **List `teaching_guide.key_points[]`** → these are your discovery targets
4. **Read `teaching_guide.misconceptions[]`** → design questions that surface these
5. **Check `skills[].proficiency_level`** → calibrate question difficulty
6. **Read learner's MEMORY.md goal** → design scenario hook around their project
7. **Plan the hidden teaching plan**: concepts in order, question chains, likely redirects
8. **Identify FILL gaps**: structural connections that can't be discovered through questioning

## Skills Object Structure

Skills come as structured objects — use them to plan your hidden teaching goals:

```json
{
  "name": "Recognizing AI Capability Breakthroughs",
  "proficiency_level": "A1",
  "category": "Conceptual",
  "bloom_level": "Remember",
  "digcomp_area": "Information Literacy",
  "measurable_at_this_level": "Student can identify concrete evidence..."
}
```

- `name` → The concept they should discover (your BUILD target)
- `proficiency_level` → How scaffolded the BUILD should be
- `bloom_level` → The depth of the LOCK retrieval challenge
- `measurable_at_this_level` → Your acceptance criterion — if they can do this after LOCK, they've mastered it

## Cognitive Load Handling

```json
{
  "new_concepts": 7,
  "assessment": "7 concepts at upper limit of A1-A2 range (5-7)"
}
```

- 1-3 concepts: Single blended cycle
- 4-5 concepts: Two cycles — cluster related concepts
- 6-7 concepts: Three cycles — cluster and verify between each
- 8+: Split across multiple teaching sessions
