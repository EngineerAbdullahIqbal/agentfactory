---
title: "Structured Data Practice Exercises"
practice_exercise: ch10-structured-data
sidebar_position: 10
chapter: 10
lesson: 9
duration_minutes: 120
skills:
  - name: "Director-Role Verification Discipline"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can direct an agent through a database build and collect verification output as evidence"
  - name: "Operational Verification"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Quality Assurance"
    measurable_at_this_level: "Student can prove correctness with agent-generated evidence instead of assumptions"
learning_objectives:
  - objective: "Direct an agent through schema, CRUD, and relationship builds and verify each with output evidence"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student collects evidence artifacts from agent-generated outputs, not from code they wrote"
  - objective: "Produce evidence-based proof of correctness"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student submits EVIDENCE.md with pass/fail results, each backed by output the agent generated"
cognitive_load:
  new_concepts: 0
  assessment: "No new concepts — exercises apply and integrate previously learned material"
differentiation:
  extension_for_advanced: "Complete all Challenge track exercises. Design a new Challenge D exercise and share with classmates."
  remedial_for_struggling: "Complete Core 1 and Core 2 only. Focus on producing clear evidence artifacts rather than rushing through all four exercises."
teaching_guide:
  lesson_type: "hands-on"
  session_group: 3
  session_title: "Cloud Deployment and Verification"
  key_points:
    - "The mantra is 'claim nothing, prove everything' — evidence artifacts (DECISIONS.md, EVIDENCE.md) replace verbal claims"
    - "Core exercises map 1:1 to chapter lessons: model integrity (L3), CRUD reliability (L4), relationship debug (L5), transaction+Neon (L6+L7)"
    - "Getting stuck for 10+ minutes is the signal to move on and return later — later exercises often illuminate earlier blockers"
    - "Incomplete evidence for a finished exercise teaches nothing; complete evidence for half the exercises teaches the discipline that matters"
  misconceptions:
    - "Students think exercises are optional review — they are where the director role becomes instinct, not just understanding"
    - "Students rush through all exercises with minimal evidence rather than producing thorough evidence for fewer exercises"
    - "Students think 'it runs without errors' is sufficient evidence — quality gates require failure-path proof and explicit output artifacts"
    - "Students write the code themselves instead of directing the agent — if a student is editing Python, they have left the director role"
  discussion_prompts:
    - "Which of the four Core exercises felt hardest? What does that tell you about which chapter concept needs another pass?"
    - "Could someone who was not in the room verify your work from EVIDENCE.md alone? What would they need that is missing?"
  teaching_tips:
    - "Set a visible timer for each exercise — timeboxing prevents students from spending 90 minutes on Core 1 and rushing the rest"
    - "Have students swap EVIDENCE.md files and review each other's proof — peer review builds the 'would another engineer accept this?' instinct"
    - "Core 3 (relationship debug) is the hardest for most students — consider pairing struggling students for this exercise"
    - "The self-assessment scoring (0-2 per criterion) is a powerful self-reflection tool — have students score honestly and identify their weakest area"
  assessment_quick_check:
    - "What three artifacts must every exercise submission include?"
    - "What does the quality gate in Core 1 reject and why?"
    - "What is the difference between completing all exercises poorly and completing two exercises with thorough evidence?"
---

# Structured Data Practice Exercises

In the capstone you directed an agent through a complete budget tracker build. Now you apply those director skills under pressure, independently and with a timer running. The agent still writes the code. You still direct, describe, and verify.

Getting stuck is not failure. Quitting is. These exercises are **meant** to be challenging. If everything felt easy, you would not be learning anything new. The moments where you stare at an error message and think "I have no idea what went wrong" are the moments where real understanding forms.

If you are stuck for more than 10 minutes on one part, move on and come back. Sometimes the later exercises give you a new perspective on the earlier ones.

You might be thinking: "I don't know where to start." That is fine. The hints are there. Use them.

One rule above all others:

- **Claim nothing. Prove everything.**

## How to Use

1. Read the exercise brief.
2. Describe the requirement to your agent and direct it to build or fix.
3. Collect evidence artifacts from the agent's output.
4. Write a short postmortem.

## Evidence Format (Use Across All Exercises)

For each exercise, submit:

- `DECISIONS.md`: what you changed and why
- `EVIDENCE.md`: commands run, outputs, and pass/fail summary
- one explicit "known risk" note after completion

This keeps your practice aligned with capstone release discipline.

Timebox suggestion:

- Core 1: 25 minutes
- Core 2: 30 minutes
- Core 3: 30 minutes
- Core 4: 35 minutes

If you run out of time, finish evidence for completed work instead of starting a new unfinished exercise. Incomplete evidence for a finished exercise teaches you nothing. Complete evidence for half the exercises teaches you the discipline that matters in production.

## Core Track (Mandatory)

Complete all four exercises below.

> **Glossary for Core Track**
>
> | Term                | Meaning                                                                                            |
> | ------------------- | -------------------------------------------------------------------------------------------------- |
> | **Schema contract** | The rules you described to your agent: required fields, unique fields, references, exact decimals  |
> | **CRUD**            | Create, Read, Update, Delete: the four basic operations every database application needs           |
> | **Rollback proof**  | Evidence that a failed operation left zero partial writes — proven by reading the row count output |
> | **N+1 query**       | A performance problem where the agent's code makes one database call per row instead of one total  |

<ExerciseCard id="C1" title="Model Integrity Build" />

### Core 1 - Model Integrity Build

**Goal:** Describe a domain schema to your agent and verify the agent-built schema matches your requirements.

Pick a domain you find interesting: a recipe tracker, a reading list, a workout log, a pet adoption registry. The specific domain does not matter. What matters is that you describe real relationships between real entities with real constraints clearly enough that your agent builds exactly what you intended.

Deliverables:

- your plain-English description of the schema (what you told the agent)
- `MODEL-VERIFICATION.md` with 3 verification checks and their outputs

Minimum evidence:

- schema verification output showing all tables and constraints created
- one invalid insert attempt output proving the constraint was enforced
- one explanation of why the agent chose exact decimal storage for money

Quality gate:

- reject any schema that stores money amounts as approximate values
- reject any schema that represents links between entities through free-text names instead of enforced references

<details>
<summary>Hint: Where to start</summary>

Start by listing the entities in your chosen domain in plain English. What are the "things"? What connects them? For a recipe tracker: "A Recipe has a name and serves a number of people. An Ingredient has a name and unit. A RecipeIngredient links a Recipe to an Ingredient with a quantity — a recipe can have many ingredients, and an ingredient can appear in many recipes." Once you have this written out, tell the agent: "Build a database schema from this description. Every ingredient reference must point to a real ingredient. Tell me what constraints you applied and why."

</details>

<ExerciseCard id="C2" title="CRUD Reliability Build" />

### Core 2 - CRUD Reliability Build

**Goal:** Direct your agent to build create/read/update/delete for your domain and verify rollback works on failure.

This is the exercise where the director discipline becomes real. You describe what you need. The agent builds it. You run the verification commands and collect the output as evidence. When the rollback test output shows zero partial rows after a failure, you will feel it click.

Deliverables:

- your plain-English directions to the agent (what you asked it to build)
- `CRUD-EVIDENCE.md` with before/after row-count snapshots

Minimum evidence:

- one successful write output (row stored and read back)
- one failed write output with rollback proof (row count unchanged)
- one query output proving no accidental duplicate rows

Quality gate:

- reject any evidence that only shows the happy path
- reject any evidence that relies on the return message instead of querying the database state

<details>
<summary>Hint: Where to start</summary>

Tell the agent: "For my [domain] database, build four operations: store a new [entity], read all [entities], update a [entity]'s [field], and delete a [entity]. After each operation, show me the current row count. Then try to store a [entity] with an invalid [field] and prove zero rows were added." The agent builds all of this. Your job is to run the commands it gives you, read the output, and capture the results in your evidence file.

</details>

<ExerciseCard id="C3" title="Relationship Query Debug" />

### Core 3 - Relationship Query Debug

**Goal:** Describe broken relationship symptoms to your agent, direct it to diagnose and fix, then verify the corrected query output.

This exercise is different from the others. You are not starting fresh. The agent built a relationship query that is not working correctly. Your job is to describe what is failing, direct the agent to find the cause, review the fix, and prove it works. Diagnosing relationship problems by reading error output and directing a fix is one of the most common real-world tasks.

Deliverables:

- your symptom description (what you told the agent was wrong)
- `RELATIONSHIP-TRACE.md` with the before-state error, the fix direction, and the after-state proof

Minimum evidence:

- output showing navigation works in both directions (parent to child AND child to parent)
- one joined query output returning expected rows
- one output showing the agent identified and resolved an N+1 risk

Quality gate:

- reject evidence that only tests one direction of the relationship
- reject evidence that does not show both the broken state and the fixed state

<details>
<summary>Hint: Where to start</summary>

Start by running the existing query and reading the error output. Then tell the agent: "This relationship query is failing. Here is the error: [paste output]. The expected behavior is: when I ask for a [parent]'s [children], I should get [expected result]. Diagnose what is wrong and fix it." Then verify both directions: ask the agent to show [parent]'s [children] AND [child]'s [parent] in the output. If the numbers look right but the query makes many database calls instead of one, tell the agent: "This is an N+1 problem — rewrite it to use a single joined query."

</details>

<ExerciseCard id="C4" title="Transaction + Neon Ops Drill" />

### Core 4 - Transaction + Neon Ops Drill

**Goal:** Direct your agent to build an atomic multi-step operation and a Neon cloud connection, then verify both with output evidence.

This is the closest exercise to production work. You are combining two verification requirements: the agent's transfer operation must leave zero partial writes on failure, AND the agent's Neon connection must pass a health check. When both outputs are in your evidence file, you have completed the full Chapter 10 skill chain.

Deliverables:

- your plain-English directions for the atomic operation and cloud connection
- `OPS-EVIDENCE.md` with three verified outputs

Minimum evidence:

- forced failure output showing zero partial writes (row count unchanged before and after)
- Neon health check output (`SELECT 1` confirmed)
- pool configuration captured and justified (why those settings for your tier)

Quality gate:

- reject evidence without the rollback drill output showing pre/post row counts
- reject any configuration that puts credentials inside the code instead of a `.env` file

<details>
<summary>Hint: Where to start</summary>

Start with the cloud connection. Tell the agent: "Connect to my Neon database using the DATABASE_URL from my .env file. Run a SELECT 1 health check and show me the output." Once that passes, tell the agent: "Now build an atomic transfer between two [entities] in my domain. Show me a successful transfer output, then force a failure and prove zero partial rows were written." Small steps, each verified before moving to the next. The connection health check first. Then rollback proof. Then collect both outputs in your evidence file.

</details>

## Challenge Track (Optional)

These exercises go beyond the chapter baseline. They simulate real production scenarios where the answer is not obvious and the stakes are higher.

Choose one or more.

> **Glossary for Challenge Track**
>
> | Term                         | Meaning                                                                                   |
> | ---------------------------- | ----------------------------------------------------------------------------------------- |
> | **Verification gate**        | A check that must pass before code ships: if the numbers disagree, the release is blocked |
> | **CSV migration**            | Moving data from flat CSV files into a normalized relational schema without losing rows   |
> | **Incident recovery**        | Diagnosing a broken production state, fixing it safely, and proving nothing else broke    |
> | **Row-count reconciliation** | Confirming that every row in the source data appears in the destination after migration   |
> | **Regression proof**         | Evidence that your fix did not break something that was previously working                |

<ExerciseCard id="A" title="High-Stakes Verification Gate" />

### Challenge A - High-Stakes Verification Gate

Build SQL summary + independent raw-ledger verification.

Evidence:

- `mismatch-policy-result.json`
- clear release block decision when mismatch exceeds tolerance
- mismatch triage notes

Use this challenge if your target role includes finance, compliance, or audit-sensitive workflows.

<ExerciseCard id="B" title="Legacy CSV Migration" />

### Challenge B - Legacy CSV Migration

Normalize a messy multi-file dataset into relational schema.

Evidence:

- row-count reconciliation
- key-field parity checks
- explicit list of non-lossy transformations

<ExerciseCard id="C" title="Recovery Under Incident" />

### Challenge C - Recovery Under Incident

Given a broken budget app state, prioritize fixes and recover safely.

Evidence:

- prioritized fix log
- regression proof after recovery
- short incident postmortem with prevention actions

Use this challenge if your target role includes operations ownership or on-call responsibilities.

## Outcome Mapping

| Outcome                  | Core track coverage | Challenge extension |
| ------------------------ | ------------------- | ------------------- |
| Model correctness        | Core 1              | Challenge B         |
| Safe CRUD                | Core 2              | Challenge C         |
| Relationship correctness | Core 3              | Challenge B         |
| Transaction safety       | Core 4              | Challenge C         |
| Neon reliability         | Core 4              | Challenge C         |
| Hybrid judgment          | —                   | Challenge A         |

If you complete all Core exercises with clear evidence, you meet Chapter 10 baseline mastery. Challenge track pushes you toward production-level judgment.

## Suggested Scoring for Self-Assessment

Use a 0-2 scale for each criterion per exercise:

- `Model correctness`
- `Write safety`
- `Query correctness`
- `Failure-path evidence`
- `Operational clarity`

Interpretation:

- `8-10`: ready for capstone-level work
- `6-7`: repeat one core exercise with stricter evidence
- `<6`: revisit lesson material before continuing

A score below 6 is not a verdict on you. It means the material needs another pass. Go back to the lesson that covers your weakest criterion, re-read the key section, then try the exercise again with that specific gap in mind.

## Try With AI

**Setup:** Open Claude Code, Cursor, or Windsurf in a project directory with your exercise files.

**Prompt 1: Evidence Review**

```
Here is my EVIDENCE.md for the CRUD exercise:

[paste your EVIDENCE.md]

Review this evidence file. For each claim I make:
1. Is the evidence sufficient to prove the claim?
2. What additional evidence would make the proof stronger?
3. Are there any claims I made without supporting output?

Be strict. In production, reviewers will be stricter than you.
```

**What you're learning:** You are building the skill of self-auditing. Production teams reject pull requests with claims like "this works" and no proof. By having AI critique your evidence, you learn what "sufficient proof" actually looks like, and you carry that standard into every future exercise.

**Prompt 2: Failure Scenario Generation**

```
My agent built a database system for [your domain]. Here is the
schema verification output it produced:

[paste your schema verification output]

Generate 5 failure scenarios I should direct the agent to test:
- 2 involving constraint violations
- 2 involving transaction rollback
- 1 involving a relationship navigation problem

For each scenario, tell me what to ask the agent to try AND
what the correct output should look like. I want to verify
these myself by reading the agent's output — not fix them in code.
```

**What you're learning:** You are practicing defensive thinking. Production bugs do not come from the happy path. They come from the cases you did not consider. By asking AI to generate failure scenarios from your schema output, you learn to think about what could go wrong before it goes wrong, which is the core skill behind "claim nothing, prove everything."
