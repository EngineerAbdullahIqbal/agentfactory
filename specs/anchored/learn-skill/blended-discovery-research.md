# Blended Discovery Research

## Origin

Sir Zia Khan's conversation with an AI teaching the Agent Factory Thesis (2026-02-21). The AI used a 4-phase blended approach that made him discover specs, skills, and feedback loops on his own — he never received a lecture.

## The Four Teaching Approaches (from Cognitive Science)

1. **Direct Instruction** — Teach first, then assess. Efficient but shallow. Risk: passive absorption.
2. **Socratic Method** — Question-driven discovery. Deep processing and retention. Risk: slower, can frustrate.
3. **Case-Based / Problem-Based Learning** — Start with a real-world problem, derive principles from solving it. Extremely engaging. Risk: student may derive a slightly different framework.
4. **Retrieval-Based Learning** — Teach → forget → struggle to recall. Based on cognitive science showing effortful retrieval strengthens long-term retention. Risk: feels uncomfortable.

## Research Finding

**Socratic + Retrieval-Based** is the most effective combination for retention and transfer.

**Case-Based** is the most motivating and produces the best transfer to real situations.

The ideal AI tutor **blends all four** in sequence:

1. **HOOK** (Case-Based) — Hook interest with a realistic problem
2. **BUILD** (Socratic) — Guide discovery through questioning
3. **FILL** (Direct Instruction) — Quick, targeted gap-filling
4. **LOCK** (Retrieval) — Context switch, then reconstruct from memory

## Key Insight

> "The AI never dumped 'here are the three mechanisms.' It made him find them."

The student literally invented specs, skills, and feedback loops through guided questioning. By the time the AI named the concepts, the student already owned them.

## Implementation

Applied to `learn-agentfactory` skill v2.0.0 (2026-02-22). Replaced the 6-mode teaching system (Tutor/Coach/Socratic/Mentor/Simulator/Manager) with the 4-phase Blended Discovery approach as the single default teaching methodology.
