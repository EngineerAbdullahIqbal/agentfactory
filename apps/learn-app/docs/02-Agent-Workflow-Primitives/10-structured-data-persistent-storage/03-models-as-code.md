---
sidebar_position: 3
title: "Models as Code"
chapter: 10
lesson: 2
duration_minutes: 25
description: "Describe your data requirements in plain English so an agent builds a correct database schema"
keywords: ["schema", "data model", "constraints", "foreign key", "exact decimal"]
skills:
  - name: "Schema Requirement Articulation"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student can describe data requirements in plain English so an agent builds a correct schema"
  - name: "Type Safety for Financial Data"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Data Literacy"
    measurable_at_this_level: "Student can explain why money amounts need exact decimal storage, not approximate numbers"
learning_objectives:
  - objective: "Describe your data model clearly enough for an agent to build a correct schema"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student provides a plain-English description and verifies the agent-built schema matches requirements"
  - objective: "Explain why money amounts need exact decimal storage (no Python syntax, just the business reason)"
    proficiency_level: "A1"
    bloom_level: "Understand"
    assessment_method: "Student can articulate the rounding drift problem and why exact decimal prevents it"
cognitive_load:
  new_concepts: 4
  assessment: "4 concepts (required vs optional, exact decimal vs approximate, foreign key references, unique constraints) within A2 limit"
differentiation:
  extension_for_advanced: "Describe a project management schema (User, Project, Task, TimeEntry) to the agent. After it builds the schema, compare the result with a classmate's description — did different wording produce different schemas?"
  remedial_for_struggling: "Focus on describing just one entity (User) first. Add one constraint at a time ('email is required', 'email must be unique') and verify each. Only describe Category and Expense after User works."
teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "From Scripts to Databases"
  key_points:
    - "Approximate numbers drift — 0.1 + 0.2 is not 0.3 in a computer, and that drift compounds across millions of transactions"
    - "A schema is an enforced contract, not documentation — the database rejects bad data automatically"
    - "'Required' means the database refuses empty values — it is the bouncer at the door, not a polite suggestion"
    - "Foreign keys store references, not copies — if Alice changes her email, you update one row instead of 500 expense rows"
  misconceptions:
    - "Students edit code instead of describing requirements — if a student is editing Python, they have left the director role"
    - "Students think rounding fixes the money problem — it shifts responsibility to the developer for every calculation, which is error-prone at scale"
    - "Students want to store user names directly in expense rows instead of using references — leads to update anomalies"
    - "Students assume optional is a safe default — it allows empty required fields that cause downstream bugs"
  discussion_prompts:
    - "If approximate numbers drift by a tiny amount on every transaction, what happens when you sum a million transactions? At what scale does this matter?"
    - "Why does the Expense entity reference users by ID instead of storing Alice's name directly? What breaks when Alice changes her email?"
    - "When would you intentionally make a field optional? Can you think of a field where 'no value' is meaningful, not just lazy?"
  teaching_tips:
    - "The floating-point surprise is visceral — describe it as 'the computer says 0.1 + 0.2 is not 0.3' and watch students react"
    - "The ER diagram is whiteboard-worthy — draw it and have students identify which lines are references and why"
    - "Walk through the vocabulary guide as a conversation, not a table — ask students how they would describe fields from their own domains"
  assessment_quick_check:
    - "How would you describe a 'required' field to an agent?"
    - "Why does money need exact decimal storage?"
    - "What is a foreign key in plain English?"
---

# Models as Code

In Lesson 1, you proved that data survives a process restart. Now you need to answer a harder question: what shape should that data take, and who enforces the rules?

Here is a fact that surprises most people: computers cannot store 0.1 + 0.2 as exactly 0.3. They store it as 0.30000000000000004. That tiny rounding error does not sound like much until you process a million transactions. At one hundred-thousandth of a cent per transaction, you are off by ten dollars. At a billion transactions, you are off by ten thousand. Banks do not tolerate "close enough," and neither should your budget tracker. This is why when you tell the agent to store money amounts, you must be explicit: "store amounts as exact dollars and cents, no rounding."

Your job in this lesson is not to write code. Your job is to describe your data clearly enough that the agent builds the right schema on the first try. You are the director. The agent is the builder. If the builder gets it wrong, the description was not clear enough.

:::info[Key Terms for This Lesson]
- **Schema**: A formal blueprint that defines every table, every field, and every rule your database enforces. Think of it as the floor plan for your data -- rooms (tables), doors (connections between tables), and locks (rules that reject bad data).
- **Constraint**: A rule the database enforces automatically. When you say "this field is always required," the database becomes the bouncer at the door -- it rejects any data that violates the rule, no exceptions.
- **Exact decimal**: When you tell the agent to store money as "exact dollars and cents," the database stores 0.30, not 0.30000000000000004. Contrast with "approximate number," which can drift by tiny fractions that compound over millions of transactions.
- **Foreign key**: A reference from one entity to another. When you say "each expense must reference an existing user," the database guarantees you cannot create an orphaned expense -- every expense is tied to a real person.
:::

## The Approximate Number Problem (And Its Fix)

You might think: "Can't the computer just round the numbers?" It can. But rounding becomes your responsibility. Every calculation, every sum, every comparison -- someone has to remember to round. Miss one spot and your totals drift. With exact decimal storage, the database handles precision for you. Every value stored, every calculation performed, exact to the penny. No discipline required.

Here is the difference in plain terms:

- **Approximate number** (the default for most computers): 0.1 + 0.2 = 0.30000000000000004. Comparisons break. Totals drift.
- **Exact decimal** (what you tell the agent to use for money): 0.1 + 0.2 = 0.30. Comparisons work. Totals stay accurate.

This is why when you describe money fields to the agent, you must say "exact dollars and cents, no rounding" -- not just "a number." The difference prevents errors that compound across millions of transactions.

## The Schema Contract

A schema is not documentation. It is a contract your database enforces on every insert, every update, every reference. If the data violates the contract, it gets rejected -- no exceptions, no "I forgot to check in the application."

Here is what our budget tracker needs:

```
Entity-Relationship Diagram:

┌──────────────┐         ┌──────────────┐
│    User      │         │   Category   │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ email (UQ)   │         │ name (UQ)    │
│ name         │         │ color        │
│ created_at   │         └──────┬───────┘
└──────┬───────┘                │
       │                        │
       │ 1:many                 │ 1:many
       │                        │
       ▼                        ▼
┌──────────────────────────────────┐
│           Expense                │
├──────────────────────────────────┤
│ id (PK)                          │
│ user_id (FK → users.id)         │
│ category_id (FK → categories.id)│
│ description                      │
│ amount: exact decimal            │
│ date                             │
│ created_at                       │
└──────────────────────────────────┘

PK = Primary Key, FK = Foreign Key (reference), UQ = Unique (no duplicates)
```

Three entities. Two references. One money column that uses exact decimals. This is the shape of every expense that enters your system.

:::tip[Pause and Reflect]
Look at the Expense entity. Why does it reference the user's ID instead of storing the user's name directly? What would go wrong if Alice changed her email and you had her name stored in 500 expense rows?
:::

## How to Describe Your Data to the Agent

This is the core skill of this lesson. When you tell an agent to build a schema, vague descriptions produce wrong results. Precise descriptions produce correct schemas on the first try.

Here is your vocabulary guide:

| Business meaning | How to describe it to the agent |
|---|---|
| Money / price | "exact dollars and cents, no rounding" |
| Required field | "this field is always required" |
| Unique field | "no duplicates allowed" |
| Link to another entity | "must reference an existing [entity]" |
| Timestamp | "record when this was created, UTC" |
| Optional field | "this field can be empty" |
| Default value | "if not provided, default to [value]" |

The pattern is consistent: describe what the data **means to the business**, not what the code should look like. The agent translates your business meaning into the right technical implementation.

## Describing the Budget Tracker Schema

Here is what a complete, precise description looks like in practice.

:::conversation[What you tell the agent]
I need to track users, categories, and expenses for a personal budget tracker.

**User**: email (required, no duplicates allowed), name (required), record when created in UTC.

**Category**: name (required, no duplicates allowed), display color (optional, default to red).

**Expense**: must reference an existing user (required), must reference an existing category (required), description (required), amount in exact dollars and cents (required), date (required), record when created in UTC.

Build the database schema and create the tables.
:::

Notice what this description does NOT contain: no programming terms, no type names, no syntax. It describes what the data means and what rules the database should enforce. The agent handles the rest.

:::output[What the agent builds and what you verify]
The agent creates the schema. You run the verification command:

```
python verify_schema.py
```

You see:

```
✓ Table: users (id, email, name, created_at)
  - email: required, no duplicates
  - name: required
✓ Table: categories (id, name, color)
  - name: required, no duplicates
  - color: optional, defaults to red
✓ Table: expenses (id, user_id, category_id, description, amount, date, created_at)
  - user_id: must reference a real user
  - category_id: must reference a real category
  - amount: exact decimal (10 digits, 2 decimal places)
  - description: required
  - date: required
✓ All constraints active
Schema ready.
```

Every line in that output maps back to something you described. If something is missing or wrong, refine your description and ask the agent to rebuild.
:::

## How to Describe Common Field Types

When you encounter a new field, use this guide to tell the agent what you need:

| Business meaning | How to describe it | Why this matters |
|---|---|---|
| Money / price | "exact dollars and cents, no rounding" | Prevents drift across millions of transactions |
| Required field | "this field is always required" | Database rejects missing values -- no silent gaps |
| Unique field | "no duplicates allowed" | Database enforces uniqueness -- no duplicate emails |
| Link to another entity | "must reference an existing [entity]" | Database rejects orphaned references |
| Event timestamp | "record when created, UTC timezone" | Consistent ordering and incident tracing |
| Optional with default | "optional, default to [value]" | Sensible fallback when no value is provided |

The entities change from project to project. The descriptions stay the same. Money is always "exact dollars and cents." References are always "must reference an existing [entity]." Required fields are always "this field is always required."

## Schema Contract Checklist

Before you tell the agent to build, ask yourself these questions:

- "Have I specified which fields are required vs optional?"
- "Have I identified money fields and specified 'exact decimal'?"
- "Have I described the links between entities ('must reference a real X')?"
- "Have I specified which fields must be unique ('no duplicates allowed')?"
- "Have I described timestamp behavior ('record when created, UTC')?"

If you can answer yes to all five, your description is ready. If not, refine it before handing it to the agent. A vague description produces a wrong schema, and fixing a wrong schema after data is in it is much harder than getting it right the first time.

**What comes next?** With the schema in place, the next risk is writing and reading data correctly. Lesson 3 tackles how to create and read data without leaving the database in a half-written state.

## Try With AI

### Prompt 1: Describe Your Own Data Model

```text
I need to track [your entity — for example: recipes, workouts, invoices].
Here is what I know about it: [describe fields in plain English].
Help me describe it precisely enough for an agent to build a correct
database schema. Ask me clarifying questions about required fields,
unique fields, and links between entities.
```

**What you're learning:** The gap between "I need to track recipes" and a precise data description is where most schema bugs hide. By practicing this translation with AI asking clarifying questions, you build the habit of specifying constraints before they become bugs.

### Prompt 2: Review My Description for Completeness

```text
Review my data description for completeness:

[paste your plain-English description here]

Flag any field where the type is ambiguous, any relationship I have
not specified clearly, and any constraint that is missing. Tell me
what questions a database would ask if it could talk.
```

**What you're learning:** Reviewing descriptions for gaps is how you catch "I forgot to say unique" before the agent builds a schema that allows duplicate emails. This verification skill transfers to every project where you direct an agent to build something.

## Checkpoint

- [ ] I can describe a data model to an agent in plain English, including required/optional fields and links between entities.
- [ ] I can explain why money amounts need "exact decimal" storage, not just "a number."
- [ ] I can describe unique constraints without writing code ("no duplicates allowed").
- [ ] I verified the agent built what I described by reading the schema output.

## Flashcards Study Aid

<Flashcards />
