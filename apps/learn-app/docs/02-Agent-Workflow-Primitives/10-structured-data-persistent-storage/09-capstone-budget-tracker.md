---
sidebar_position: 9
title: "Capstone - Budget Tracker Complete App"
chapter: 10
lesson: 8
duration_minutes: 40
description: "Integrate schema, CRUD, relationships, transactions, Neon, and high-stakes verification in one app"
keywords: ["capstone", "SQLAlchemy", "Neon", "transactions", "verification", "evidence bundle"]
skills:
  - name: "Director-Role System Integration"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can direct an agent through schema, CRUD, transactions, deployment, and verification — all in one end-to-end flow"
  - name: "Operational Judgment"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Evaluate"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can decide SQL-only vs hybrid verification by risk and make an evidence-backed release decision"
learning_objectives:
  - objective: "Act as director through the full build: describe, verify each gate, and make a release decision"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Student produces a complete evidence bundle by reading agent output at each gate"
  - objective: "Make risk-based release decisions using evidence"
    proficiency_level: "B1"
    bloom_level: "Evaluate"
    assessment_method: "Student can block or approve release based on verification gate output, not gut feeling"
cognitive_load:
  new_concepts: 2
  assessment: "2 new concepts (evidence bundle, release gate) — all other concepts are integration of previously learned material"
differentiation:
  extension_for_advanced: "Add a CI/CD pipeline that automatically runs the evidence bundle and blocks deployment on any gate failure. Compare your evidence bundle with a teammate's."
  remedial_for_struggling: "Run the capstone sequence one step at a time. Focus on getting each step to pass before moving to the next. The evidence bundle is just collecting proof of what you already know how to do."
teaching_guide:
  lesson_type: "capstone"
  session_group: 3
  session_title: "Cloud Deployment and Verification"
  key_points:
    - "The capstone introduces no new concepts — it proves all chapter primitives (schema, CRUD, rollback, Neon, verification) hold together under one roof"
    - "An evidence bundle is a JSON artifact that lets another engineer verify readiness without asking questions or trusting verbal claims"
    - "'Ready for demo' means happy path passes; 'ready for release' means failure paths and verification gate also pass — precise language matters"
    - "Publishing despite a blocked verification status is a release process failure, not a query problem"
  misconceptions:
    - "Students think the capstone is a new thing to learn — it is integration of existing primitives, not new concepts"
    - "Students confuse 'it runs without errors' with 'ready for release' — the evidence bundle requires failure-path proof, not just happy-path demos"
    - "Students want to skip the forced rollback drill because 'it already worked in lesson 4' — proving it works in the integrated system is the point"
    - "Students think the evidence bundle is bureaucratic overhead — it is the difference between 'I think it works' and 'here is proof it works'"
  discussion_prompts:
    - "What is the difference between a demo and a release? Why does that distinction matter for anything touching money?"
    - "Could another engineer rerun your evidence bundle without asking you any questions? What would make that possible?"
  teaching_tips:
    - "Have students run the full 7-step capstone sequence end-to-end — the sequential discipline (stop and fix on any failure) teaches operational maturity"
    - "The evidence pipeline diagram is the lesson's structural backbone — walk through it gate by gate and connect each to the lesson where it was taught"
    - "Celebrate the journey: in lesson 0 they had a script that broke with a second user; now they have a cloud-deployed, verified system — make this contrast explicit"
    - "The self-review questions are a powerful wrap-up activity — have students answer honestly and identify their weakest gate"
  assessment_quick_check:
    - "Name the five gates in the evidence pipeline in order"
    - "What is the difference between 'ready for demo' and 'ready for release'?"
    - "What does a blocked verification status mean you should do next?"
---

# Capstone - Budget Tracker Complete App

You started this chapter with a script that couldn't handle a second user. Look where you are now: typed models, safe transactions, cloud deployment, independent verification. That's not a script anymore -- that's a system.

This lesson pulls every piece together. You will wire up your models, CRUD operations, transaction safety, Neon connection, and verification gate into a single application -- then run it end to end and collect the proof that it works.

:::info[Key Terms for This Lesson]
- **Evidence bundle**: A collection of test results that PROVES your system works -- not "I think it works" but "here's the proof it works"
- **Release gate**: A checkpoint that must pass before your code goes to production -- if the gate fails, you stop and fix before shipping
:::

## The Integration Contract

In Lesson 7, you built independent verification for high-stakes outputs. Now you combine every layer into one coherent application with five commitments:

1. **Models enforce schema** (`User`, `Category`, `Expense`).
2. **CRUD paths include rollback** on write failure.
3. **Summary queries avoid N+1** patterns.
4. **Neon connection uses pooled** pre-ping configuration.
5. **High-stakes reports run independent verification** before release.

Each commitment maps to a lesson you already completed. The capstone is not new learning -- it is proof that all the pieces hold together under one roof.

You might be thinking: "Do I really need all these evidence gates?" For a toy project, probably not. For anything touching money, health data, or compliance? Absolutely. This evidence bundle pattern works for any system: e-commerce checkout flows, healthcare record systems, financial trading platforms.

## The Evidence Pipeline

Here is the sequence your capstone will follow. Each gate must pass before the next one runs:

```
Evidence Pipeline:

  Schema Gate         CRUD Gate          Rollback Gate
  ┌──────────┐       ┌──────────┐       ┌──────────┐
  │ Create   │       │ Insert   │       │ Force    │
  │ tables   │──────►│ + Read   │──────►│ failure  │
  │ ✓ pass   │       │ ✓ pass   │       │ 0 partial│
  └──────────┘       └──────────┘       │ ✓ pass   │
                                        └────┬─────┘
                                             │
                     Neon Gate          Verify Gate
                     ┌──────────┐       ┌──────────┐
                     │ SELECT 1 │       │ SQL vs   │
                     │ pooled   │──────►│ raw CSV  │
                     │ ✓ pass   │       │ match?   │
                     └──────────┘       └────┬─────┘
                                             │
                                        ┌────┴─────┐
                                        │ RELEASE  │
                                        │ DECISION │
                                        │ verified │
                                        │ or       │
                                        │ BLOCKED  │
                                        └──────────┘
```

Five gates. One chain. If any gate fails, you stop and fix before continuing. No skipping ahead.

## Directing the Monthly Summary

Tell your agent to produce a grouped monthly summary using a single database call — no loops, no separate per-category queries.

:::conversation[What you tell the agent]
Generate Alice's January 2024 expense summary grouped by category, sorted by highest total first.
Use one database call — no per-category loops.
Return category name, expense count, and total for each group.
Show the query count in the output so I can verify it used one call.
:::

:::output[What you verify]

```
python run_summary.py

Output:
  Alice — January 2024:
  ┌─────────────────┬───────┬──────────┐
  │ Category        │ Count │ Total    │
  ├─────────────────┼───────┼──────────┤
  │ Housing         │   1   │ $1500.00 │
  │ Food            │   3   │  $287.45 │
  │ Transport       │   2   │   $94.20 │
  └─────────────────┴───────┴──────────┘
  Grand total: $1881.65
  Queries used: 1
```

"Queries used: 1" is the signal that matters. One database call produced the full grouped report. Compare that to the Computation & Data Extraction approach: nested loops, manual grouping, custom sorting — all doing what one SQL query handles natively.
:::

## Directing the Release Gate

This is where "ready for demo" becomes "ready for release." Direct the agent to compare the SQL summary against the raw CSV ledger, using $0.01 as the mismatch tolerance.

:::conversation[What you tell the agent]
Verify Alice's January 2024 summary from two independent sources:
1. The database (SQL path)
2. The raw CSV ledger file (CSV path)

For each category, compare the totals. If any category differs by more than $0.01, block the release and show me the mismatch details with the category name, SQL total, CSV total, and the delta.
If all categories match, output: status: verified.
:::

:::output[What you verify]

```
python verify_release.py

Output (verified):
  Checking Alice — January 2024...
  Food:      SQL $287.45 | CSV $287.45 | ✓ match
  Housing:   SQL $1500.00 | CSV $1500.00 | ✓ match
  Transport: SQL $94.20 | CSV $94.20 | ✓ match
  {"status": "verified"}
  Release permitted.

Output (blocked):
  Checking Alice — January 2024...
  Food:      SQL $287.45 | CSV $287.95 | ✗ delta $0.50
  {"status": "blocked", "reason": "verification_mismatch",
   "tolerance": "0.01",
   "mismatches": [{"category": "Food", "sql": "287.45", "raw": "287.95", "delta": "0.50"}]}
  Release BLOCKED — investigate before shipping.
```

When you see BLOCKED, you do not ship. That is your engineering working correctly. Publishing despite a `blocked` status is a release process failure, not a query problem.
:::

## The Evidence Bundle

Your capstone produces one JSON artifact that captures every gate result:

```json
{
  "crud_matrix": "pass",
  "rollback_failure_drill": "pass",
  "neon_connection_resilience": "pass",
  "verification_policy_result": "verified_or_blocked_with_reason"
}
```

## Capstone Run Sequence

Run these seven steps in order. If any step fails, stop and fix before continuing:

1. Create schema and seed deterministic fixture data
2. Run CRUD matrix and capture outputs
3. Run forced rollback drill and capture pre/post counts
4. Run Neon connectivity health check
5. Generate monthly SQL summary for one user
6. Run independent raw verification for same user/month
7. Evaluate mismatch policy and produce release decision artifact

This is deliberate sequencing. Step 3 proves your rollback actually works under failure. Step 6 proves your SQL output matches an independent source. Step 7 turns all of that into a decision artifact another engineer can read without asking you questions.

## Gate Language

When discussing readiness with your team, use precise language:

- **"Ready for demo"** means the happy path passes
- **"Ready for release"** means failure evidence and verification gate both pass
- Never merge release candidates without the evidence bundle attached

The difference matters. A demo proves the system can work. A release proves the system can fail safely and recover correctly.

## One Common Failure

Publishing reports after a mismatch because "the SQL looks right." That is a release process failure, not a query bug. Another failure: claiming "production-ready" without failure-path proof. Passing only the happy path is insufficient for integrity claims.

## Capstone Self-Review

Before you call this done, answer these honestly:

- Can another engineer rerun your evidence bundle without verbal guidance?
- Are all critical thresholds explicit (the $0.01 tolerance, the blocked status rules)?
- Did you demonstrate at least one failure path, not only success?
- Could a reviewer trace from your requirement description to the agent's output to the evidence artifact quickly?
- Did you describe requirements clearly enough that the agent built what you intended on the first try — or did you need to refine?

If any answer is "no," the capstone is still in progress.

:::tip[Pause and Reflect]
Look at what you've built across this chapter. In Lesson 0, you had a script that couldn't handle a second user. Now you have a cloud-deployed, transactionally safe, independently verified system. What's the single most important concept you learned along the way?
:::

Computation & Data Extraction deliverable: one tax report for one person. Structured Data deliverable: a cloud-deployed, multi-user, transactionally safe, independently verified financial system. Same you. Different tools. Different capability.

## Try With AI

### Prompt 1: Integrity Gap Audit

```text
Read my capstone code and classify each critical path:
- guaranteed by schema
- guaranteed by transaction
- guaranteed by verification policy
- still vulnerable
Return a prioritized fix list.
```

**What you're learning:** Classifying guarantees by type teaches you to distinguish between what the system prevents automatically (schema violations, partial writes) and what still requires your judgment (verification mismatches, edge cases). This is how experienced engineers think about production risk.

### Prompt 2: Evidence Bundle Generator

```text
Generate a script that runs:
1) CRUD smoke checks
2) forced rollback drill
3) Neon SELECT 1 health check
4) verification gate run
Then outputs one JSON evidence bundle.
```

**What you're learning:** Automating your evidence collection turns a manual checklist into a repeatable script. This is the difference between "I checked it once" and "anyone can check it anytime." Automated evidence gates are the foundation of continuous deployment.

### Prompt 3: Apply to Your Domain

```text
You're building [your project]. Design an evidence bundle with 4 gates:
1. What proves your data model is correct?
2. What proves your writes are safe?
3. What proves your cloud connection is reliable?
4. What proves your critical outputs are accurate?
For each gate, specify: what you test, what "pass" looks like, and what "fail" means.
```

**What you're learning:** Evidence-driven release decisions transfer to ANY software project. Whether you're shipping a mobile app, deploying an API, or publishing a report -- the pattern is the same: define gates, run tests, collect proof, make decisions based on evidence rather than gut feeling.

Your system is correct. But systems change. Users want new features. Schemas need to evolve. Data needs to migrate. Next chapter: how do you evolve a running system without breaking what works?

## Checkpoint

- [ ] I ran the full capstone sequence: schema → CRUD → rollback drill → Neon health check → summary → verification gate → release decision.
- [ ] I read the evidence bundle output and made an explicit release decision (verified or blocked).
- [ ] I directed the agent through at least one failure path and read the rollback confirmation.
- [ ] I can explain the difference between "ready for demo" and "ready for release" in one sentence.
- [ ] My evidence bundle could be read by another person without me explaining what any of it means.

## Flashcards Study Aid

<Flashcards />
