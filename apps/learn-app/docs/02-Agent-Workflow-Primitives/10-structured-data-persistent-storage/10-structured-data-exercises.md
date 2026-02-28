---
title: "Practice: Structured Data Exercises"
practice_exercise: ch10-structured-data
sidebar_position: 10
chapter: 10
lesson: 10
duration_minutes: 180

primary_layer: "Layer 1"
layer_progression: "L1 (Manual Foundation)"
layer_1_foundation: "Hands-on practice applying Lessons 1-8 database workflows through 12 guided exercises and 3 capstone projects"
layer_2_collaboration: "N/A"
layer_3_intelligence: "N/A"
layer_4_capstone: "N/A"

skills:
  - name: "Database Workflow Execution"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student applies data modeling, CRUD operations, relationship design, transaction safety, cloud deployment, and hybrid verification workflows to realistic database scenarios"

  - name: "Database Operation Debugging"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Analyze"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student diagnoses errors in model definitions, CRUD functions, relationship configurations, transaction logic, and connection settings by comparing expected vs actual behavior"

  - name: "Database System Design"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Create"
    digcomp_area: "Digital Content Creation"
    measurable_at_this_level: "Student designs and executes a complete database application from schema design through cloud deployment and verification"

learning_objectives:
  - objective: "Apply all six database development workflows to realistic scenarios with proper verification"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Successful completion of Build exercises across 6 modules"
  - objective: "Diagnose errors in model definitions, CRUD operations, relationship configurations, and transaction logic"
    proficiency_level: "A2"
    bloom_level: "Analyze"
    assessment_method: "Accurate identification of all planted bugs in Debug exercises"
  - objective: "Design and execute a complete database application combining all chapter workflows from schema to deployment"
    proficiency_level: "B1"
    bloom_level: "Create"
    assessment_method: "Capstone project completion with working application and verified results"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (workflow application, systematic debugging, full-stack database design) — within A2 limit. Exercises reinforce existing L01-L08 knowledge."

differentiation:
  extension_for_advanced: "Complete all 3 capstone projects; attempt exercises with minimal prompts; optimize query performance"
  remedial_for_struggling: "Start with Module 1 only; use the starter prompts provided; focus on Build exercises before Debug"

teaching_guide:
  lesson_type: "hands-on"
  session_group: 4
  session_title: "Practice Exercises"
  key_points:
    - "Build + Debug pairing develops two distinct skills: applying database workflows correctly (Build) vs diagnosing what went wrong in someone else's code (Debug)"
    - "The six-step Database Development Framework (Model, Connect, Operate, Protect, Verify, Deploy) is the transferable takeaway that applies to any data-driven application"
    - "Scaffolding is deliberately removed across modules: Modules 1-3 have starter prompts, Modules 4-6 remove them, Capstones remove all guidance"
    - "Capstone C (Disaster Recovery) combines debugging across all layers — model, CRUD, relationships, and transactions — making it the most demanding exercise"
  misconceptions:
    - "Students think Debug exercises are easier than Build — diagnosing someone else's bugs requires deeper understanding than writing fresh code yourself"
    - "Students may skip running tests after each fix because it 'looks correct' — the starter files deliberately include cascading bugs where fixing one reveals another"
    - "Students underestimate Capstone B (CSV Migration) because 'it is just importing data' — normalization decisions and data quality issues make it genuinely challenging"
  discussion_prompts:
    - "In Module 1, how did the Debug exercise (fixing broken models) teach you something different from the Build exercise (designing models from scratch)?"
    - "The assessment rubric goes from Beginner to Advanced. Where do you honestly place yourself after completing the exercises? What would move you up one level?"
    - "Which module's Debug exercise had the hardest bug to find? What made it difficult — the error message, the cascading effects, or something else?"
  teaching_tips:
    - "Assign Module 1 as homework before the exercises workshop — students arrive ready to work on Modules 2-6 with debugging skills already practiced"
    - "For classroom settings, pair students on Debug exercises: one reads the error message, the other proposes the fix. This builds diagnostic communication skills"
    - "The assessment rubric works well as a self-evaluation tool — have students rate themselves before and after completing the exercises to see growth"
    - "Do not skip Module 4 (Transactions) — students who skip atomicity exercises consistently struggle with data integrity in later chapters"
  assessment_quick_check:
    - "Ask students to recite the six-step Database Development Framework from memory — it is the chapter's core deliverable"
    - "Present a new scenario (e.g., 'build an inventory tracker for a bookstore') and ask students which modules' skills they would apply and in what order"
    - "Ask: 'What is the difference between a Build exercise and a Debug exercise? Which one was harder for you, and why?'"
---

import ExerciseCard from '@site/src/components/ExerciseCard';

# Practice: Structured Data Exercises

You've built a complete database skill from the ground up. You can design SQLAlchemy models, run CRUD operations, navigate relationships with joins, protect data with transactions, connect to cloud PostgreSQL on Neon, and verify results with hybrid bash-plus-SQL patterns. That's real capability — but knowing the workflows and executing them under pressure are different things. The gap between understanding a database concept and applying it to a broken model with cascading bugs, missing constraints, and silent data corruption is where most people stall.

These 15 exercises close the gap between understanding and fluency. Each module gives you two exercises: a **Build** exercise where you create something from scratch, and a **Debug** exercise where you diagnose what went wrong in someone else's code. Three skills run through every exercise: **database workflow execution** (applying modeling, CRUD, relationship, transaction, deployment, and verification workflows), **systematic debugging** (diagnosing errors by running tests, reading tracebacks, and comparing expected vs actual behavior), and **database system design** (combining workflows into complete applications).

Every exercise uses real starter files — actual Python models, broken code with planted bugs, CSV datasets, and test suites you'll run to verify your fixes. This isn't hypothetical. By the end, you'll have practiced every database workflow on realistic, messy scenarios.

:::info Download Exercise Files
**[Download Structured Data Exercises (ZIP)](https://github.com/panaversity/claude-code-structured-data-exercises/releases/latest/download/structured-data-exercises.zip)**

After downloading, unzip the file. Each exercise has its own folder with an `INSTRUCTIONS.md` and any starter files you need.

If the download link doesn't work, visit the [repository releases page](https://github.com/panaversity/claude-code-structured-data-exercises/releases) directly.
:::

---

## How to Use These Exercises

The workflow for every exercise is the same:

1. **Open the exercise folder** from the `claude-code-structured-data-exercises/` directory
2. **Read the INSTRUCTIONS.md** inside the folder — it describes the scenario and starter files
3. **Read the walkthrough below** for context on what you're practicing and why
4. **Start Claude Code** and point it at the exercise folder
5. **Work through the exercise** — write your own prompts (use starters only if stuck)
6. **Reflect** using the questions provided — this is where the real learning happens

You don't need to complete all 15 in one sitting. Work through one session at a time. Each session builds on the workflows from specific chapter lessons.

---

## Tool Guide

- **Claude Code** — Required for all exercises. Database work involves running Python scripts, executing SQL queries, reading test output, and diagnosing tracebacks. Claude Code handles all of this directly in the terminal.
- **Cowork** — Can be used for Exercise 6.2 (analyzing tool-choice scenarios) and capstone planning where you're designing systems on paper before executing. But Claude Code is strongly preferred since every exercise involves running real code and tests.

---

## Key Differences from Chapter Lessons

In Lessons 1-8, you learned each database workflow in isolation with guided walkthroughs. These exercises are different in three ways:

- **No step-by-step instructions.** The exercises describe the scenario and the goal. You decide the approach, choose the queries, and handle edge cases yourself.
- **Build + Debug pairing.** Every module has a Build exercise (create something from scratch) and a Debug exercise (diagnose someone else's broken code). Debugging someone else's work develops different skills than building your own — you learn to read tracebacks, run tests strategically, and trace root causes through model definitions, session management, and relationship configurations.
- **Increasing independence.** Modules 1-3 provide starter prompts to scaffold your learning. Modules 4-6 remove the scaffolding. Capstones remove everything — you design the entire approach.

By Module 6, you should be able to face a new database problem and instinctively reach for the right workflow without needing to review the chapter lessons.

---

## The Database Development Framework

Use this for every exercise:

1. **Model** — Design your schema: tables, columns, types, constraints, relationships
2. **Connect** — Establish a database connection (SQLite for dev, PostgreSQL for production)
3. **Operate** — Implement CRUD operations with proper session management
4. **Protect** — Wrap multi-step operations in transactions with rollback on failure
5. **Verify** — Run tests, check outputs, compare expected vs actual results
6. **Deploy** — Move from local SQLite to cloud PostgreSQL with environment-based configuration

This framework applies to every data-driven application, not just these exercises. Whether you're building a budget tracker, migrating legacy CSV data, or deploying a student portal to the cloud, these six steps prevent the mistakes that turn a working prototype into a corrupted database. Notice that steps 1-2 happen before any data changes. That's intentional — most database disasters come from skipping schema design and jumping straight to writing queries.

---

## Assessment Rubric

For each exercise, evaluate yourself on:

| Criteria | Beginner (1) | Developing (2) | Proficient (3) | Advanced (4) |
| --- | :-: | :-: | :-: | :-: |
| **Schema Quality** | Missing constraints | Basic types, some constraints | Full constraints with foreign keys | Indexes, validation, edge-case handling |
| **Operation Safety** | No error handling | Basic try/except | Proper session lifecycle and rollback | Atomic transactions with savepoints |
| **Query Correctness** | Raw SQL strings | Basic ORM queries | Joins and relationship navigation | Optimized queries, N+1 prevention |
| **Problem Diagnosis** | Guesses at bugs | Identifies obvious errors | Traces root cause systematically | Identifies root cause AND prevents recurrence |
| **Verification Discipline** | No testing | Runs tests once | Tests after each change | Tests + edge cases + failure paths |

---

:::note[Session 1: Data Foundations]

Modules 1-2 cover the skills from the Models as Code and Creating & Reading Data lessons. You'll design schemas from business requirements, fix broken model definitions, implement CRUD operations, and debug session management issues. Starter prompts are provided for both modules.

:::

## Module 1: Data Modeling

> **Core Skill:** Translating business requirements into SQLAlchemy models with proper types, constraints, and relationships (Lesson 2: Models as Code)

<ExerciseCard id="1.1" title="Exercise 1.1 — Library Catalog" />

### Exercise 1.1 — Library Catalog (Build)

**The Problem:**
Open the `module-1-data-modeling/exercise-1.1-library-catalog/` folder. You'll find `requirements.md` — a business requirements document describing a library's catalog system. The library tracks books, authors, and genres. Books have ISBNs, titles, publication years, and page counts. Authors have names and birth years. A book can belong to multiple genres, and an author can write multiple books. The requirements include sample data and specific constraints: ISBNs must be unique, titles cannot be null, and page counts must be positive.

**Your Task:**
Read `requirements.md` and create a `models.py` file with SQLAlchemy ORM models for Book, Author, and Genre. Choose appropriate column types, add constraints, define foreign keys, and handle the many-to-many relationship between books and genres. Test with an in-memory SQLite database. Verify edge cases: What happens with a duplicate ISBN? A null title? A negative page count?

**What You'll Learn:**

- How to translate business requirements into database schema decisions (which columns, which types, which constraints)
- That choosing the right column type matters: storing ISBNs as integers loses leading zeros, storing page counts without a check constraint allows negative values
- The difference between designing models on paper and testing them against real data — edge cases reveal gaps in your schema

**Starter Prompt (Intentionally Vague):**

> "Build a database for a library catalog."

**Better Prompt (Build Toward This):**

After reading `requirements.md`: "Create SQLAlchemy models for a library catalog with Book, Author, and Genre. Requirements: (1) ISBN must be unique and non-null, (2) book titles cannot be null, (3) page counts must be positive integers, (4) books and genres have a many-to-many relationship through an association table, (5) authors can write multiple books. Test with in-memory SQLite. Try inserting a duplicate ISBN and a null title to verify constraints work."

**Reflection Questions:**

1. Which constraint was hardest to implement correctly? Did you discover it during design or during testing?
2. How did you handle the many-to-many relationship between books and genres? What would break if you used a simple foreign key instead?
3. If the library adds a "co-author" requirement tomorrow (two authors per book), which parts of your schema would need to change?

---

<ExerciseCard id="1.2" title="Exercise 1.2 — Broken Pet Store" />

### Exercise 1.2 — Broken Pet Store (Debug)

**The Problem:**
Open the `module-1-data-modeling/exercise-1.2-broken-pet-store/` folder. You'll find `broken_models.py` — model definitions for a pet store system with Owner, Pet, and Vet models — and `test_models.py` — a test suite that currently fails. The models have 6 bugs: an import error, a wrong attribute name, a wrong column type, a missing foreign key reference, a missing unique constraint, and a missing nullability setting.

**Your Task:**
Run the tests. Read the failure messages. Fix the bugs one at a time, re-running tests after each fix. Document each bug: what the test expected, what the model had wrong, and what you changed. The goal isn't just passing tests — it's understanding WHY each bug caused the specific failure it did.

**What You'll Learn:**

- How to read SQLAlchemy error messages and map them back to specific model definition problems
- That model bugs cascade: a wrong column type causes one test failure, but a missing foreign key reference can cause multiple tests to fail for different reasons
- The discipline of fixing one bug at a time and re-testing — fixing multiple bugs at once makes it impossible to know which fix resolved which failure

**Starter Prompt (Intentionally Vague):**

> "Fix the models so the tests pass."

**Better Prompt (Build Toward This):**

After running the tests and seeing failures: "Run `test_models.py` and show me all failures. For the first failure, trace the error to the specific line in `broken_models.py`. Fix only that one bug, then re-run the tests. Repeat for each remaining failure. After all tests pass, list every bug you fixed with: (1) the test that caught it, (2) the broken code, (3) the fix, (4) why the original code was wrong."

**Reflection Questions:**

1. Which bug was hardest to find from the error message alone? Did the traceback point directly to the problem, or did you have to reason about it?
2. Did fixing one bug reveal another that was previously hidden? Why does this happen with model definitions?
3. If you had written these models yourself, which of the 6 bugs would you be most likely to make? How would you catch it?

---

## Module 2: CRUD Operations

> **Core Skill:** Implementing create, search, import, and aggregate operations with proper session management (Lesson 3: Creating & Reading Data)

<ExerciseCard id="2.1" title="Exercise 2.1 — Recipe Book" />

### Exercise 2.1 — Recipe Book (Build)

**The Problem:**
Open the `module-2-crud-operations/exercise-2.1-recipe-book/` folder. You'll find `models.py` — a correct Recipe model already defined — and `recipes.csv` — a dataset of 55 recipes with names, cuisines, prep times, difficulty levels, and ingredient counts. You need to build four CRUD functions: create a recipe, search with dynamic filters (by cuisine, difficulty, max prep time), import all 55 recipes from CSV, and compute aggregate statistics (average prep time per cuisine, most common difficulty level).

**Your Task:**
Implement all four functions using the provided model. The search function must handle any combination of filters — cuisine only, difficulty only, cuisine plus max prep time, or all three together. The CSV import must handle the full 55-row file without duplicates. The stats function must return meaningful aggregations. Test each function and verify the outputs.

**What You'll Learn:**

- How to build dynamic query filters that compose — adding `.filter()` calls conditionally based on which parameters are provided
- That CSV import is never as simple as "read and insert" — you need to handle type conversions, missing values, and duplicate detection
- The difference between returning a Query object and returning actual results — a subtle bug that causes "no results" when there should be data

**Starter Prompt (Intentionally Vague):**

> "Build CRUD operations for the recipe database."

**Better Prompt (Build Toward This):**

After reviewing `models.py` and `recipes.csv`: "Implement four functions for the recipe database: (1) `create_recipe(session, name, cuisine, prep_time, difficulty, ingredients)` that adds a recipe and returns it, (2) `search_recipes(session, cuisine=None, difficulty=None, max_prep_time=None)` that filters dynamically based on which parameters are provided, (3) `import_csv(session, filepath)` that loads all 55 recipes from CSV with duplicate prevention, (4) `get_stats(session)` that returns average prep time per cuisine and the most common difficulty. Test each function and show outputs."

**Reflection Questions:**

1. How did you handle the dynamic filter composition in the search function? What happens if no filters are provided — should it return all recipes or none?
2. What edge cases did you encounter during CSV import? Were there any rows that needed special handling?
3. How did you compute the aggregate statistics? Did you use Python-side grouping or SQL GROUP BY? What's the tradeoff?

---

<ExerciseCard id="2.2" title="Exercise 2.2 — Broken Task Manager" />

### Exercise 2.2 — Broken Task Manager (Debug)

**The Problem:**
Open the `module-2-crud-operations/exercise-2.2-broken-task-manager/` folder. You'll find `broken_crud.py` — CRUD functions for a task manager with 5 bugs — `models.py` — correct model definitions — and `test_crud.py` — a test suite that catches all 5 bugs. The bugs are: a missing commit after insert, a wrong filter operator (`=` instead of `==`), a session lifecycle issue, missing error handling on invalid input, and a function that returns a Query object instead of results.

**Your Task:**
Run the tests. Read each failure carefully. Fix bugs one at a time, re-testing after each fix. The bugs are in the CRUD functions, not the models — the models are correct. Pay attention to session management: when sessions are opened, committed, and closed matters.

**What You'll Learn:**

- That the five most common CRUD bugs (missing commit, wrong operator, session leak, no error handling, Query vs results) appear in nearly every beginner's database code
- How to distinguish a model bug from a CRUD bug — both can cause "no data returned," but the fix is completely different
- That returning a Query object instead of `.all()` results is a silent failure: it looks like it works but returns nothing useful

**Starter Prompt (Intentionally Vague):**

> "The task manager CRUD functions are broken. Fix them."

**Better Prompt (Build Toward This):**

After running the tests: "Run `test_crud.py` against `broken_crud.py` (models from `models.py` are correct — don't modify them). Show me all test failures. For each failure: (1) which test failed, (2) what the test expected, (3) what actually happened, (4) the root cause in `broken_crud.py`, (5) the fix. Fix one bug at a time and re-run tests after each fix. Pay special attention to session commits, filter operators, and return types."

**Reflection Questions:**

1. Which bug caused the most confusing error message? Did the traceback point to the CRUD function or to the test that called it?
2. The "Query object instead of results" bug is especially tricky because the code runs without errors. How would you catch this bug if there were no tests?
3. After seeing these 5 common bugs, which ones do you think you'd make most often in your own code? What habit would prevent each one?

---

:::note[Session 2: Data Architecture]

Modules 3-4 cover the skills from the Relationships & Joins and Transactions & Atomicity lessons. You'll add relationships to existing models, debug cascade and back-reference issues, implement atomic transactions, and fix race conditions in banking operations. Starter prompts are provided for Module 3 only.

:::

## Module 3: Relationships

> **Core Skill:** Defining bidirectional relationships with proper cascades and navigation (Lesson 4: Relationships & Joins)

<ExerciseCard id="3.1" title="Exercise 3.1 — Music Library" />

### Exercise 3.1 — Music Library (Build)

**The Problem:**
Open the `module-3-relationships/exercise-3.1-music-library/` folder. You'll find `models_no_relationships.py` — Artist, Album, and Track models that have foreign keys defined but NO relationship() definitions — and `sample_data.csv` with 10 artists, 30 albums, and 100+ tracks. The foreign keys exist (Album has `artist_id`, Track has `album_id`), but without `relationship()` definitions you can't navigate from an artist to their albums or from an album to its tracks using Python attributes.

**Your Task:**
Add `relationship()` definitions to all three models with proper `back_populates` for bidirectional navigation. Configure cascade delete so removing an artist also removes their albums and tracks. Load the sample data, then write queries that navigate the relationships: all albums by a specific artist, all tracks on a specific album, which artist a track belongs to (navigating child-to-parent). Test cascade delete by removing one artist and verifying their albums and tracks are also gone.

**What You'll Learn:**

- The difference between having foreign keys (database-level links) and having relationships (Python-level navigation) — foreign keys alone won't let you write `artist.albums`
- How `back_populates` creates bidirectional navigation and why mismatched names cause silent failures
- That cascade delete is powerful but dangerous: deleting an artist removes all their albums and every track on those albums — you must understand the cascade chain before enabling it

**Starter Prompt (Intentionally Vague):**

> "Add relationships to these music library models."

**Better Prompt (Build Toward This):**

After reading `models_no_relationships.py` and the sample CSV: "Add `relationship()` definitions to Artist, Album, and Track models. Requirements: (1) Artist.albums and Album.artist for bidirectional navigation, (2) Album.tracks and Track.album for bidirectional navigation, (3) cascade='all, delete-orphan' on parent-to-child relationships, (4) back_populates on both sides. Load sample_data.csv, then demonstrate: all albums by artist 'X', all tracks on album 'Y', navigating from a track back to its artist. Finally, delete one artist and verify cascade removed their albums and tracks."

**Reflection Questions:**

1. What happens if you set `back_populates` on one side but not the other? Did you discover this through an error or through testing?
2. How many total records were deleted when you cascaded a single artist deletion? Was this more or fewer than you expected?
3. If the music library later needs a "featured_tracks" relationship (tracks can be featured on multiple albums), how would you modify the schema?

---

<ExerciseCard id="3.2" title="Exercise 3.2 — Broken Blog" />

### Exercise 3.2 — Broken Blog (Debug)

**The Problem:**
Open the `module-3-relationships/exercise-3.2-broken-blog/` folder. You'll find `broken_blog.py` — a blogging platform with User, Post, and Comment models that has 5 relationship bugs — and `test_relationships.py` — tests that verify navigation and cascade behavior. The bugs are: a `back_populates` mismatch, a missing `delete-orphan` cascade, a wrong model name in a relationship, a wrong table name in a foreign key, and a missing `__tablename__` attribute.

**Your Task:**
Run the tests. The failures will range from clear (`NoReferencedTableError`) to subtle (navigation returning empty lists). Fix each bug, re-test, and document what was wrong and why it caused that specific failure. The `__tablename__` bug is particularly tricky — missing it causes SQLAlchemy to generate a table name that doesn't match the foreign key reference.

**What You'll Learn:**

- How relationship misconfigurations produce different failure modes: some crash immediately, some silently return empty results, some only fail during cascade operations
- That `__tablename__` is not optional decoration — it determines the actual table name in the database and must match foreign key references exactly
- The debugging skill of tracing a "no results" problem backward: Does the relationship exist? Is `back_populates` correct? Does the foreign key point to the right table?

**Starter Prompt (Intentionally Vague):**

> "Fix the blog models so all the relationship tests pass."

**Better Prompt (Build Toward This):**

After running the tests: "Run `test_relationships.py` against `broken_blog.py`. Show me all failures. I expect 5 relationship bugs: (1) a back_populates mismatch, (2) a missing cascade setting, (3) a wrong model name, (4) a wrong table name in a FK, (5) a missing __tablename__. For each: show the failing test, trace to the exact line in `broken_blog.py`, explain why it's wrong, and fix it. Re-run tests after each fix."

**Reflection Questions:**

1. Which bug produced the most misleading error message? Did the error point to the relationship definition or somewhere else entirely?
2. The `__tablename__` bug is easy to miss because SQLAlchemy auto-generates table names. When would you explicitly set `__tablename__` vs letting SQLAlchemy generate it?
3. If you were reviewing someone's pull request and they added a new relationship, what three things would you check before approving?

---

## Module 4: Transactions

> **Core Skill:** Wrapping multi-step operations in atomic transactions that succeed completely or fail completely (Lesson 5: Transactions & Atomicity)

<ExerciseCard id="4.1" title="Exercise 4.1 — Game Inventory Trading" />

### Exercise 4.1 — Game Inventory Trading (Build)

**The Problem:**
Open the `module-4-transactions/exercise-4.1-game-inventory/` folder. You'll find `models.py` — Player and Item models for a game inventory system. Players have gold balances and own items. You need to implement three functions: `trade_items()` for swapping items and gold between two players, `buy_from_shop()` for purchasing items with gold, and `batch_trade()` for executing multiple trades as a single atomic operation using savepoints.

**Your Task:**
Every trade must be fully atomic: the item transfers AND the gold exchange must both succeed, or neither changes. If a player doesn't have enough gold, the entire trade rolls back. The `batch_trade()` function must use savepoints so a single failed trade in the batch doesn't undo the successful ones. Test with scenarios: successful trade, insufficient gold, item not owned, and a batch where the third of five trades fails.

**What You'll Learn:**

- That atomicity isn't just about try/except — you need to ensure the database state is consistent even when operations partially complete
- How savepoints create nested transaction boundaries that let you roll back one operation without losing others
- The difference between "the code didn't crash" and "the data is correct" — a trade can complete without errors but still leave inconsistent balances

**Reflection Questions:**

1. What happens if you commit after transferring the item but before transferring the gold, and then the gold transfer fails? How does your atomic wrapper prevent this?
2. In `batch_trade()`, how many savepoints did you use? What would happen without savepoints when the third trade fails?
3. How would you test that your atomic trade actually rolls back? What evidence proves the rollback worked?

---

<ExerciseCard id="4.2" title="Exercise 4.2 — Broken Bank" />

### Exercise 4.2 — Broken Bank (Debug)

**The Problem:**
Open the `module-4-transactions/exercise-4.2-broken-bank/` folder. You'll find `broken_bank.py` — banking operations with 5 transaction safety holes — and `test_bank.py` — tests that expose each vulnerability. The bugs are: a partial commit that causes money to vanish, a missing balance check that allows negative balances, a missing rollback that leaves the database in an inconsistent state, a delete operation that removes an account without transferring its balance, and an operation that should be wrapped in a transaction but isn't.

**Your Task:**
Run the tests. Each failure represents a real-world data integrity vulnerability — the kind of bug that causes actual financial discrepancies in production. Fix each bug and verify the fix. For the "money vanishes" bug, trace exactly where the commit happens and why it leaves the database inconsistent.

**What You'll Learn:**

- That transaction bugs are the most dangerous database bugs because they corrupt data silently — the application reports success while money disappears
- How to trace the "commit point" through code to find where partial writes become permanent
- That every multi-step operation involving money, inventory, or any countable resource must be wrapped in a single transaction — there are no exceptions

**Reflection Questions:**

1. The "money vanishes" bug is the most dangerous. How much money would be lost if 1,000 users triggered this bug? What makes it hard to detect in production?
2. Which fix required the most thought: the missing rollback, the missing balance check, or the unwrapped operation? Why?
3. If you were building a real banking application, what additional safety measures would you add beyond transactions?

---

:::note[Session 3: Production & Verification]

Modules 5-6 cover the skills from the Connecting to Neon and Hybrid Patterns lessons. You'll deploy a local app to cloud PostgreSQL, diagnose connection failures, build hybrid verification pipelines, and analyze tool-choice decisions. No starter prompts are provided — you design your own approach.

:::

## Module 5: Cloud Deployment

> **Core Skill:** Migrating local SQLite applications to cloud PostgreSQL with proper configuration (Lesson 6: Connecting to Neon)

<ExerciseCard id="5.1" title="Exercise 5.1 — Contact Book Deploy" />

### Exercise 5.1 — Contact Book Deploy (Build)

**The Problem:**
Open the `module-5-cloud-deployment/exercise-5.1-contact-book-deploy/` folder. You'll find `contact_book.py` — a working contact management app using SQLite — and `deployment_checklist.md` — a step-by-step checklist for cloud migration. The app works perfectly with local SQLite. Your job is to configure it for Neon PostgreSQL: add environment variable management for the database URL, configure connection pooling, add a health check endpoint, and verify the deployment.

**Your Task:**
Follow the deployment checklist. Modify the app to read `DATABASE_URL` from environment variables instead of using a hardcoded SQLite path. Add connection pooling configuration appropriate for Neon's free tier. Add a health check that runs `SELECT 1` and returns the connection status. Deploy to your Neon database and verify all existing CRUD operations still work. Document any differences between SQLite and PostgreSQL behavior you encounter.

**What You'll Learn:**

- That switching from SQLite to PostgreSQL isn't just changing the connection string — data types, auto-increment behavior, and connection management all differ
- How environment variable management prevents credentials from leaking into source code
- Why connection pooling matters for cloud databases: without it, each operation opens a new connection, which exhausts Neon's connection limit quickly

**Reflection Questions:**

1. What differences between SQLite and PostgreSQL did you encounter during migration? Which one surprised you most?
2. Why is connection pooling critical for Neon specifically? What happens if you skip it?
3. If your `DATABASE_URL` environment variable is missing, what should your app do — crash immediately or fall back to SQLite? What are the tradeoffs?

---

<ExerciseCard id="5.2" title="Exercise 5.2 — Connection Doctor" />

### Exercise 5.2 — Connection Doctor (Debug)

**The Problem:**
Open the `module-5-cloud-deployment/exercise-5.2-connection-doctor/` folder. You'll find `error_scenarios.md` — five Neon connection failure scenarios, each with the exact error message a developer would see. The scenarios include: a wrong password, an expired connection, an SSL certificate error, a connection pool exhaustion, and a DNS resolution failure.

**Your Task:**
For each of the 5 scenarios: identify the root cause from the error message, write the exact fix, and describe a prevention strategy that stops the error from recurring. You're not running code — you're practicing diagnostic reasoning. The skill is reading a database error message and knowing immediately what's wrong and how to fix it.

**What You'll Learn:**

- How to read PostgreSQL connection error messages and map them to specific configuration problems
- That the five most common connection failures (auth, timeout, SSL, pool exhaustion, DNS) have distinct error signatures you can learn to recognize
- Prevention strategies that stop connection errors before they happen: connection pool sizing, keep-alive settings, SSL configuration, and credential rotation

**Reflection Questions:**

1. Which error message was most misleading? Did it point to the actual problem or to a symptom of a deeper issue?
2. Which prevention strategy would have the highest impact across all five scenarios?
3. If you saw a new error message you've never seen before, what diagnostic steps would you follow?

---

## Module 6: Hybrid Verification

> **Core Skill:** Using multiple tools (SQL + bash + Python) to verify data integrity through independent cross-checks (Lesson 7: Hybrid Patterns)

<ExerciseCard id="6.1" title="Exercise 6.1 — Expense Audit" />

### Exercise 6.1 — Expense Audit (Build)

**The Problem:**
Open the `module-6-hybrid-verification/exercise-6.1-expense-audit/` folder. You'll find `models.py` — an Expense model with categories, amounts, and dates — and `seed_data.py` — a script that populates the database with 200+ expense records across multiple categories and date ranges. Your job is to build a hybrid verification pipeline: compute expense totals two different ways and compare the results.

**Your Task:**
Compute total expenses per category using two independent methods: (1) SQLAlchemy `GROUP BY` query, and (2) export to CSV and compute totals with bash (`awk`). Compare the results. If they match, the data is verified. If they don't, trace the discrepancy. Then add a date-range filter and verify again. The power of hybrid verification is that bugs in one tool get caught by the other.

**What You'll Learn:**

- That verifying data with the same tool that produced it proves nothing — independent cross-checks using different tools catch bugs that single-tool verification misses
- How to export database results to CSV and process them with bash tools for independent verification
- The pattern of hybrid verification: compute with Tool A, compute with Tool B, compare results — this pattern applies to any data integrity check

**Reflection Questions:**

1. Did your SQL totals and bash totals match on the first try? If not, what caused the discrepancy?
2. Why is it important to use a DIFFERENT tool for verification rather than running the same SQL query twice?
3. Where else could you apply hybrid verification? Think of a scenario outside databases where computing the same result two different ways would catch bugs.

---

<ExerciseCard id="6.2" title="Exercise 6.2 — Wrong Tool" />

### Exercise 6.2 — Wrong Tool (Debug/Analysis)

**The Problem:**
Open the `module-6-hybrid-verification/exercise-6.2-wrong-tool/` folder. You'll find `scenarios.md` — five scenarios where a developer chose the wrong tool for a data task. Each scenario describes what they tried, what went wrong, and asks you to determine: why the tool was wrong, what tool should have been used, and what decision framework would have prevented the mistake.

**Your Task:**
Analyze all 5 scenarios. For each: identify why the chosen tool failed, recommend the right tool (bash, Python, SQL, or a hybrid approach), and explain the reasoning. After analyzing all 5, build a decision tree that someone could use to choose the right tool for any data task. The decision tree should consider: data size, operation type (filter, transform, aggregate, join), need for persistence, and need for verification.

**What You'll Learn:**

- That choosing the wrong tool isn't just inefficient — it can produce wrong results (bash arithmetic on floating-point currency) or miss edge cases (Python loops on million-row datasets)
- How to build a decision framework for tool selection based on data characteristics and operation requirements
- The principle that simple data tasks should use simple tools (bash for counting, SQL for aggregation) while complex tasks need purpose-built tools (Python for transformation logic, SQL for joins)

**Reflection Questions:**

1. Which scenario had the most surprising "right answer"? Did any scenario's best tool choice contradict your initial instinct?
2. Look at your decision tree. Does it cover all five scenarios correctly? Can you think of a sixth scenario that would break it?
3. In the Structured Data & Persistent Storage chapter, when did you use hybrid approaches vs single-tool approaches? Looking back, were all those choices correct?

---

:::note[Session 4: Capstone Projects]

Module 7 synthesizes all six modules into complete projects. Choose one or more. These are substantially larger than the module exercises — plan for 2-4 hours each. No prompts are provided.

:::

## Module 7: Capstone Projects

> **Choose one (or more). This is where everything comes together — no starter prompts provided.**

Capstones are different from the exercises above. There are no guided prompts — you design the entire approach yourself. Each project requires applying all six database workflows together to solve a realistic problem. Where module exercises test individual skills, capstones test your ability to orchestrate those skills into a coherent application. The quality of your code and verification matters as much as getting it to work — someone should be able to review your project and understand your design decisions.

<ExerciseCard id="capstone-A" title="Capstone A — Student Grade Portal" />

### Capstone A — Student Grade Portal

Open the `module-7-capstone/capstone-A-student-portal/` folder. You'll find `requirements.md` — specifications for a student grade management system. Build a complete application: design models (Student, Course, Enrollment with grades), implement CRUD operations, configure relationships with proper cascades, protect grade updates with transactions, compute GPA calculations atomically, and deploy to Neon.

This capstone uses every skill from the chapter: modeling (Module 1), CRUD (Module 2), relationships (Module 3), transactions (Module 4), cloud deployment (Module 5), and verification (Module 6). The requirements specify 20+ students and 10+ courses, so your queries must handle real data volumes, not toy examples.

**What You'll Learn:**

- How all six database workflows connect into a single application — each skill's output feeds the next skill's input
- That GPA calculation requires atomic transactions: updating a grade must recalculate the GPA in the same transaction, or a failure leaves the GPA inconsistent
- The discipline of building from schema to deployment: model first, then CRUD, then relationships, then transactions, then deploy — skipping steps creates cascading problems

---

<ExerciseCard id="capstone-B" title="Capstone B — CSV Migration" />

### Capstone B — CSV Migration

Open the `module-7-capstone/capstone-B-csv-migration/` folder. You'll find `sales_data.csv` — 500 rows of flat sales data with customer names, product names, sales rep names, quantities, prices, and dates, all in a single denormalized table. Normalize this data into a proper relational schema: Customer, Product, SalesRep, and Sale tables with proper foreign keys. Then write 5 analytical queries that the flat CSV couldn't answer: top customers by total spend, sales trends by month, product performance comparisons, sales rep rankings, and customer retention patterns.

The normalization decisions are the hard part. The CSV has "John Smith" appearing 15 times — is that one customer or multiple people with the same name? Product names have slight variations ("Widget Pro" vs "Widget PRO") — are those the same product? You'll need data-cleaning rules before you can normalize.

**What You'll Learn:**

- That data normalization is a judgment call, not a formula — real data has ambiguities that require human decisions about identity, deduplication, and edge cases
- How relational databases unlock analytical queries that flat files can't support: joins, aggregations across tables, and filtered groupings
- The workflow of legacy migration: assess data quality, design target schema, write cleaning rules, transform and load, verify row counts, run analytical queries

---

<ExerciseCard id="capstone-C" title="Capstone C — Disaster Recovery" />

### Capstone C — Disaster Recovery

Open the `module-7-capstone/capstone-C-disaster-recovery/` folder. You'll find `broken_budget_tracker.py` — a budget tracking application with 8+ bugs across all database layers — and `test_budget_tracker.py` — a comprehensive test suite. The bugs span models (wrong types, missing constraints), CRUD (session management errors), relationships (cascade misconfigurations), and transactions (missing atomicity).

This is the most demanding exercise. You must triage all bugs, determine the fix order (some fixes depend on others), repair each one, and write a postmortem documenting: what was broken, the root cause, the fix, and how to prevent each class of bug in the future. The test suite verifies your fixes, but passing all tests isn't enough — your postmortem must demonstrate understanding.

**What You'll Learn:**

- How to triage multiple bugs across different layers and determine the optimal fix order — model bugs must be fixed before CRUD bugs that depend on the models
- That disaster recovery under pressure requires methodical discipline: triaging before fixing, fixing one thing at a time, and testing after every change
- The value of a postmortem: documenting root causes and prevention strategies turns a disaster into an organizational learning opportunity

---

## What's Next

You've practiced all six database development workflows across 15 exercises — modeling, CRUD operations, relationships, transactions, cloud deployment, and hybrid verification. More importantly, you've practiced them on realistic scenarios where bugs cascade, edge cases matter, and getting the code to run is only half the job.

The Database Development Framework you've internalized (Model, Connect, Operate, Protect, Verify, Deploy) transfers to any data-driven application you build with General Agents. Whether you're creating a budget tracker, migrating legacy data, or deploying a student portal, the same six steps prevent the same classes of mistakes.

These patterns become the foundation for the more complex agent workflows in later chapters, where the database skills you practiced here combine with file processing, computation, and API integration to build complete AI-powered applications.
