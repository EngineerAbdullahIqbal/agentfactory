# Learner Data Templates

Templates for persistent learner files at `~/.agentfactory/learner/`.

## MEMORY.md

```markdown
# Learner Profile

## Identity

- Name: {asked on first session}
- Tutor name: {what they want to call their AI tutor — e.g., "Coach", "Professor Ada"}
- Started: {date}
- Sessions: {count}

## Goal / Project

- What they want to build: {asked on first session — e.g., "content writing assistant for marketing team"}
- Professional context: {developer / business owner / student / domain expert — observe and note}
- Scenario anchor: {derived from goal — used to personalize HOOK scenarios across lessons}

## Learning Style

- Pace: {fast/steady/careful — observe and update}
- Prefers: {examples/theory/hands-on — observe and update}
- Discovery patterns: {how they respond to Socratic questions — observe and update}
- Strengths: {topics they grasp quickly, concepts discovered easily}
- Struggles: {topics needing review, concepts that required heavy scaffolding}
- Retrieval quality: {strong/developing/weak — tracks LOCK phase performance}

## Progress

- Completed: {X}/{Y} lessons
- Current chapter: {slug}
- Total XP: {number}

## Discovery History

| Date | Lesson | Concepts Discovered | Retrieval Quality | Weak Areas |
| ---- | ------ | ------------------- | ----------------- | ---------- |

## Session Log

| Date | Lessons Covered | Observations |
| ---- | --------------- | ------------ |
```

## session.md

Write this so you can recover after context compaction:

```markdown
# Active Session

- Lesson: {part/chapter/lesson slugs}
- Phase: {greeting | browsing | planning | hook | build | fill | lock | completing}
- Cycle: {1 of N — which blended cycle within the lesson}
- Concepts discovered so far: {list of concepts the learner has found}
- Concepts remaining: {list of concepts still to discover}
- Scenario context: {the hook scenario being used}
- Key context: {what the learner just said or asked}
- Next action: {what you should do next}
```
