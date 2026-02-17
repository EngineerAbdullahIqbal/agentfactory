# The Lindy-AI Software Manifesto

**System Reference Document (SRD)**

**Version:** 2.0  
**Status:** Stable  
**Core Directive:** Master the principles of AI-augmented problem solving, then apply them to build verified, production-grade software.  
**Primary Language:** Typed Python

---

## Preface: Two Layers of Mastery

This manifesto teaches two complementary skills:

**Part I: The Seven Principles** — How to *think* about AI agents and direct them effectively. These principles apply to any agent tool (Claude Code, Cowork, or future systems) and any user (technical or non-technical).

**Part II: The Ten Axioms** — How to *build* production software when AI generates code. This methodology transforms the principles into a rigorous engineering practice using Typed Python, automated testing, and continuous verification.

The progression is intentional:

```
┌─────────────────────────────────────────────────────────────┐
│  PART I: THE SEVEN PRINCIPLES                               │
│  "How to think about and direct AI agents"                  │
│  Foundation for all learners                                │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  PART II: THE TEN AXIOMS                                    │
│  "How to build professional software with AI"               │
│  Methodology for developers                                 │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  PART III: THE PRACTICE                                     │
│  "How to apply both in production"                          │
│  Integration for practitioners                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Abstract

We have entered the **Post-Syntax Era**. The scarcity in software engineering is no longer the ability to produce code, but the ability to **define problems precisely** and **verify solutions rigorously**.

In this era, we rely on a practical interpretation of the **Lindy Effect**: durable technologies and interfaces tend to persist, while novelty churns. We therefore anchor software education and system design on a **multi-generational stack**—the Operating System, Unix tools, SQL, types, tests, and automation—rather than ephemeral frameworks.

**The Meta-Principle:** General agents are most effective when they leverage computing fundamentals (file systems, shells, code execution) rather than fighting against them with elaborate orchestration frameworks.

**Automated Testing** is elevated from "maintenance burden" to **primary specification mechanism**. Code is disposable; specifications and verification are the product.

---

## 2. Key Definitions

| Term | Definition |
|------|------------|
| **Lindy Effect** | The observation that non-perishable things (ideas, technologies) that have survived longest are likely to survive longest into the future. |
| **Post-Syntax Era** | The current period where code generation is cheap; specification and verification are the scarce skills. |
| **General Agent** | An AI system with access to computing fundamentals (shell, files, code execution) that can solve arbitrary problems. |
| **Test-Driven Generation (TDG)** | A workflow where humans write tests first, and AI generates implementations to satisfy them. |
| **Specification** | The combination of types, tests, and narrative documentation that defines what software must do. |
| **Verification** | The automated process of proving that an implementation satisfies its specification. |
| **The Durable Stack** | OS, Bash, SQL, Types, Git, CI—technologies with decades of proven stability. |
| **Typed Python** | Python with static type hints, enforced by Pyright in strict mode, with runtime validation via Pydantic. |
| **The Verification Loop** | Act → Verify → Correct → Repeat until criteria are met. |

---

## 3. The Roles

This paradigm is built on an explicit division of labor:

### 3.1 The Human (The Architect)

Responsible for the **What** and the **Why**:

* Defines the problem as constraints and requirements
* Specifies behavior through types, tests, and examples
* Reviews, integrates, and accepts the result
* Owns security boundaries and production risk decisions
* Makes judgment calls on ambiguity, trade-offs, and edge cases

### 3.2 The AI (The Implementer)

Responsible for the **How**:

* Generates implementations that satisfy types and tests
* Explores file systems and data to understand context
* Produces alternatives and refactors under guidance
* Verifies its own work through execution and testing
* Surfaces edge cases and potential issues for human decision

**Rule:** The AI may propose; the Human must approve.

**Corollary:** If you cannot explain *why* the AI's solution is correct, you have not yet understood the problem.

---

# PART I: THE SEVEN PRINCIPLES

> These principles emerged from real-world agent development at companies like Anthropic, Vercel, and dozens of AI startups. They apply equally to Claude Code (terminal interface) and Claude Cowork (GUI interface)—because both tools run on the same underlying architecture.

---

## Principle 1: Bash Is the Key

> "What if BASH is all you need?" — Andrew Qu, Vercel

### The Discovery

Vercel built an internal agent called d0 to answer data questions. The first version was engineered the "right" way: specialized tools, heavy prompt engineering, elaborate context management.

Then they tried the opposite. They stripped the agent down to a single capability: executing BASH commands with direct file system access.

**The results were dramatic:**

| Metric | Complex Design | BASH-Only Design | Improvement |
|--------|----------------|------------------|-------------|
| Execution time | 274.8 seconds | 77.4 seconds | 3.5× faster |
| Success rate | 80% | 100% | +20% |
| Token usage | ~102k tokens | ~61k tokens | 37% fewer |
| Steps required | ~12 steps | ~7 steps | 42% fewer |

### Why This Works

The Unix philosophy, developed 50+ years ago, turns out to be exactly what AI agents need:

1. **Models are smart**: Modern LLMs don't need elaborate scaffolding. Give them basic tools and let them reason.

2. **Simplicity reduces failure modes**: Every abstraction layer is a potential point of failure. BASH + file system is minimal and robust.

3. **Unix tools are battle-tested**: `grep` has been doing text search for 50 years. Why build a custom "context retrieval tool"?

### Applying This Principle

**For developers (Claude Code):**
- Resist building complex tool hierarchies
- Start with BASH + file access; add tools only when clearly needed
- Let the model explore with basic commands before constraining it

**For all users (Claude Code or Cowork):**
- Frame tasks in terms of files and folders—that's what the agent thinks in
- Don't over-specify steps; describe outcomes and let the agent find the path

**Try This Prompt:**
```
Here's a folder of [data type]. I need to understand [goal].
Explore the files, find patterns, and tell me what you discover.
```

---

## Principle 2: Code Is the Universal Interface

> "All agents will become coding agents." — Davis Treybig

### The Convergence

Anthropic observed something unexpected: Claude Code users weren't just writing software. They were using code generation to manage todo lists, handle emails, organize files, and analyze data.

**Insight:** Code is the most powerful interface for *any* computational task, not just programming.

Why? Because code is:
- **Precise**: No ambiguity in execution
- **Composable**: Small pieces combine into complex workflows
- **Verifiable**: You can test whether it works
- **Reusable**: Write once, run many times
- **Infinitely expressive**: If it's computable, code can do it

### The Five Powers of Code

**1. Code as Reasoning Layer**
LLMs struggle with precise numerical reasoning in "token space." But they excel at writing code that performs calculations correctly.

**2. Code as Tool-Calling Layer**
Instead of: LLM → call tool → LLM → call tool → LLM
Agent writes:
```python
for company in search_companies():
    financials = get_financials(company)
    score = calculate_score(financials)
    save_result(company, score)
```
One LLM call produces code that executes many operations efficiently.

**3. Code for Context Management**
Data lives in files. The agent can `grep` for relevant information, `cat` specific files, or write intermediate results. Context is progressively disclosed rather than loaded all at once.

**4. Code for Universal Interoperability**
You can't pre-build integrations for every system. But you can let the agent write code to process any input format, call any API, or transform any data structure.

**5. Code as Ephemeral Software**
The agent writes micro-apps (artifacts) to display results rather than producing static text.

### Applying This Principle

**Frame problems as computational tasks:**
```
Bad: "Summarize this data"
Better: "Analyze this data and produce a report with calculated metrics"
Best: "Process these files, compute [specific calculations], and generate 
      a formatted output showing [specific visualizations]"
```

**Embrace disposable code:**
Code generated by agents doesn't need to be "production quality." It's solving an immediate problem. Let the agent write quick scripts.

**Use code as verification:**
If you need to verify the agent did something correctly, ask it to show you the code it ran.

---

## Principle 3: Verification as a Core Step

> "Failures are data." — Geoffrey Huntley

### The Verification Loop

Effective agents don't just execute—they verify. Every significant action should include a check that it worked correctly.

**The pattern:**
1. **Act**: Perform the task
2. **Verify**: Check if it succeeded
3. **Correct**: If not, analyze what went wrong
4. **Repeat**: Until verification passes

This loop is why agents running overnight can complete substantial work—they keep trying approaches until they find one that works.

### Types of Verification

| Type | Question | Example Check |
|------|----------|---------------|
| **Output** | Did it produce expected output? | File exists, correct format, sensible result |
| **State** | Is the system in expected state? | Tests pass, files in correct locations |
| **Side Effect** | Any unintended consequences? | No accidental deletions, no data corruption |

### Applying This Principle

**Build verification into requests:**
```
"Organize these files into folders by type. After organizing, list 
the contents of each folder to verify the organization worked correctly."
```

**Use the verification loop for complex tasks:**
```
"Keep improving this [output] until it meets these criteria: [specific criteria].
After each iteration, check whether the criteria are met and explain 
what still needs improvement."
```

**For code-heavy tasks:**
```
"Write tests for this functionality first, then implement until all tests pass."
```

---

## Principle 4: Small, Reversible Decomposition

> "The best way to solve a complex problem is to break it into smaller problems that you can verify individually."

### Why Decomposition Matters

**Large, monolithic actions are dangerous:**
- Hard to verify
- Hard to debug when they fail
- Hard to recover from errors

**Small, incremental actions are safer:**
- Each step can be verified
- Failures are localized
- Easy to backtrack
- Progress is visible

### The Decomposition Pattern

**Bad approach:** "Reorganize my entire document collection"

**Good approach:**
1. List all documents and categorize them (verify: categories make sense)
2. Create folder structure (verify: structure exists)
3. Move documents one category at a time (verify: after each move)
4. Rename files with inconsistent names (verify: naming consistency)
5. Generate summary of changes (verify: completeness)

### Reversibility Strategies

| Strategy | When to Use |
|----------|-------------|
| **Git-based** | Code and text work—every change is a commit |
| **Backup-based** | Files—copy before modify, delete backup after verify |
| **Staged operations** | Transformations—write to temp, verify, move to final |

### Applying This Principle

**Request decomposition explicitly:**
```
"Break this task into steps. Show me your plan before starting, then 
complete each step one at a time, verifying after each."
```

**Require reversibility:**
```
"Before making any changes, create backups. Keep the backups until 
I confirm the changes are correct."
```

---

## Principle 5: Persisting State in Files

> "The file system is the original database—and it's still the best one for agents."

### Files as Memory

AI agents don't have persistent memory between sessions. But files do persist. The file system is the agent's long-term memory.

**The pattern:**
- Write intermediate results to files
- Write plans and progress to files
- Write decisions and rationale to files
- Future sessions read these files for context

### Why Files Beat Other Approaches

| Alternative | Files Win Because... |
|-------------|---------------------|
| Chat history | Files are organized, searchable, version-controlled |
| Databases | No schema needed, human-readable, Git-trackable |
| Memory systems | Explicit, inspectable, no "memory hallucination" risk |

### State Files for Agents

**Progress files** (track what's done):
```markdown
# Task: Organize Downloads Folder
## Completed
- [x] Categorized 186 files
- [x] Created folder structure
## In Progress
- [ ] Renaming generic files
## Remaining
- [ ] Delete duplicates (need confirmation)
```

**Decision files** (record choices):
```markdown
# File Organization Decisions
- Put screenshots in Images/ not Documents/ because they're visual content
- Named files using YYYY-MM-DD prefix for chronological sorting
```

**Context files** (background for future sessions):
```markdown
# Project Context
- This is a financial analysis project
- Data comes from quarterly reports
- Client prefers charts over tables
```

### Applying This Principle

**Request explicit state files:**
```
"As you work, maintain a progress.md file tracking what you've completed, 
what you're working on, and what remains."
```

**Create context for complex projects:**
```
"Before starting, create a context.md file that captures key information 
about this project for future sessions."
```

---

## Principle 6: Constraints Enable Capability

> "Cowork asks before deleting anything. This isn't just UX—it's architectural."

### Why Constraints Enable Capability

Counter-intuitively, constraints often enable *greater* capability:
- Sandboxed execution allows more adventurous operations
- Permission prompts allow more powerful actions
- Bounded access allows deeper access within bounds

**Without constraints, agents must be conservative. With well-designed constraints, they can be bold.**

### Types of Constraints

| Type | Description | Example |
|------|-------------|---------|
| **Boundary** | What the agent CAN'T access | Specific folders only, read-only locations |
| **Action** | Confirmation for dangerous ops | Deletion requires approval |
| **Resource** | Compute/time/cost limits | Timeout, token budget |
| **Output** | What outputs must look like | File format, required sections |

### Applying This Principle

**Define boundaries explicitly:**
```
"You have access to the /project folder only. Do not attempt to 
access any files outside this folder."
```

**Request confirmation gates:**
```
"Before deleting any files, show me the list of files you plan to 
delete and wait for my confirmation."
```

**Set resource bounds:**
```
"Complete this analysis, but stop if you've been working for more 
than 10 minutes without progress and ask for guidance."
```

---

## Principle 7: Observability Is Debuggability

> "If you can't see what the agent is doing, you can't fix it when it goes wrong."

### Why Observability Matters

Agents will make mistakes. The question is: can you understand what went wrong and fix it?

**Observability means:**
- Seeing what the agent is *thinking* (plan)
- Seeing what the agent is *doing* (actions)
- Seeing what the agent *produced* (outputs)
- Seeing what the agent *encountered* (errors)

Without observability, agents are black boxes. With observability, they're debuggable systems.

### Layers of Observability

| Layer | Question | What to Look For |
|-------|----------|------------------|
| **Plan** | What is it trying to do? | Goals, steps, rationale |
| **Action** | What is it actually doing? | Commands, files read/written, APIs called |
| **Output** | What did it produce? | Generated files, artifacts, state changes |
| **Error** | What went wrong? | Error messages, failed attempts, recovery |

### Applying This Principle

**Request explicit reasoning:**
```
"Before each major step, explain your reasoning. After each step, 
report what you did and what the result was."
```

**Use verbose modes:**
```
"Work in verbose mode—show me each command you run and its output."
```

**Create audit trails:**
```
"Log all your actions to actions.log so I can review what was done."
```

---

## Principles Summary

| # | Principle | Core Insight |
|---|-----------|--------------|
| 1 | Bash Is the Key | Simple Unix tools beat complex frameworks |
| 2 | Code Is Universal | Code solves any computational problem |
| 3 | Verification Is Core | Always check that actions succeeded |
| 4 | Small Decomposition | Break big tasks into verifiable chunks |
| 5 | Files Are Memory | Files are the agent's durable state |
| 6 | Constraints Enable | Boundaries enable capability |
| 7 | Observability | If you can't see it, you can't fix it |

**All seven principles derive from one meta-principle:**

> General agents are most effective when they leverage computing fundamentals rather than fighting against them.

---

# PART II: THE TEN AXIOMS

> The Seven Principles establish mindset. The Ten Axioms establish methodology. This part transforms principles into a rigorous engineering practice for building production software.

---

## The Language Choice: Typed Python

### Why Typed Python

Python is **33+ years old** (1991), consistently ranks in the top 2-3 programming languages, and has survived multiple technology waves. By the Lindy Effect, it will persist.

**Strategic Alignment:**

| Factor | Python's Position |
|--------|-------------------|
| **AI/ML Ecosystem** | Dominant—Anthropic SDK, OpenAI SDK, LangChain, all Python-first |
| **Unix Philosophy** | Excellent—clean CLI tooling, natural stdin/stdout handling |
| **Data & SQL** | Superior—sqlite3 in stdlib, SQLAlchemy, Pandas |
| **Type System** | Modern—generics, protocols, dataclasses |

### The Python Discipline Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| **Static Types** | Pyright (strict mode) | Catch type errors at edit time |
| **Runtime Validation** | Pydantic v2 | Validate data at boundaries |
| **Linting** | Ruff | Style, errors, imports |
| **Formatting** | Ruff formatter | Consistent code style |
| **Testing** | pytest | Behavioral verification |
| **Task Running** | uv or make | Reproducible commands |

**Non-Negotiable:** All six layers must be present in every project.

### The Pedagogical Rule: Never Show Untyped Python

Students must believe Python requires types because **in this curriculum, it does**.

**Correct:**
```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    quantity: int
    price_cents: int

def calculate_total(items: list[Item], tax_rate: float = 0.0) -> int:
    """Calculate total price in cents, including tax."""
    subtotal = sum(item.quantity * item.price_cents for item in items)
    return int(subtotal * (1 + tax_rate))
```

**Never show:**
```python
def calculate_total(items, tax_rate=0.0):  # No types = not allowed
    ...
```

### The Full-Stack Extension

Python cannot render browser interfaces. For full-stack AI applications:

| Domain | Language |
|--------|----------|
| CLI tools, data, agents, APIs | Typed Python |
| Web/mobile frontends | TypeScript + React |

TypeScript is introduced as "the same discipline, different syntax."

---

## Axiom I: The Environment Is the OS (Shell as Orchestrator)

**Connects to:** Principle 1 (Bash Is the Key)

**Rule:** Use shell commands for orchestration, file manipulation, and composing existing tools. Do not use shell for business logic.

**Shell is appropriate for:**
- File and directory operations
- Environment setup and configuration
- Invoking and piping existing programs
- Simple text transformations with `sed`, `awk`, `grep`
- Process management and job control

**The Complexity Threshold:** When any of these arise, transition to Typed Python:
- [ ] Logic requires conditionals beyond simple `if/else`
- [ ] Data structures beyond flat strings or arrays
- [ ] Parsing structured formats (JSON, XML, CSV)
- [ ] HTTP/API interaction
- [ ] Error handling with recovery logic
- [ ] State that persists across operations

**Heuristic:** If your shell script exceeds 50 lines or requires `set -euo pipefail` to be safe, it should be a Python program.

---

## Axiom II: Knowledge Is Markdown (Narrative Spec)

**Connects to:** Principle 5 (Files Are Memory)

**Rule:** Store all problem statements, design notes, prompts, and explanations in Markdown.

**The Specification Stack:**
1. **Markdown** — Intent, constraints, reasoning, acceptance criteria
2. **Type Signatures** — Contracts between components
3. **Tests** — Executable assertions of correctness
4. **Schemas** (OpenAPI, JSON Schema, SQL DDL) — Machine-checkable definitions

Each layer reinforces the others. A specification missing any layer is incomplete.

---

## Axiom III: Programs over Scripts (The Complexity Threshold)

**Connects to:** Principle 2 (Code Is Universal)

**Rule:** When complexity exceeds shell's capacity, transition immediately to Typed Python.

**Constraint:** Programs must follow the Unix philosophy:
- Read from `stdin` (or accept file arguments)
- Write results to `stdout`
- Report failures to `stderr`
- Exit with meaningful codes (0 = success, non-zero = failure)

**Example—Unix-Style Python Tool:**

```python
#!/usr/bin/env python3
"""Filter JSON lines by a field value."""

import sys
import json
from typing import TextIO

def filter_jsonl(
    input_stream: TextIO,
    output_stream: TextIO,
    field: str,
    value: str
) -> int:
    """Filter JSON lines where field equals value. Returns count."""
    count = 0
    for line in input_stream:
        try:
            record = json.loads(line)
            if record.get(field) == value:
                output_stream.write(line)
                count += 1
        except json.JSONDecodeError:
            print(f"Warning: skipping invalid JSON", file=sys.stderr)
    return count

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} FIELD VALUE", file=sys.stderr)
        sys.exit(1)
    
    count = filter_jsonl(sys.stdin, sys.stdout, sys.argv[1], sys.argv[2])
    print(f"Filtered {count} records", file=sys.stderr)
    sys.exit(0)
```

**Usage:** `cat data.jsonl | python filter.py status active > active.jsonl`

---

## Axiom IV: Composition over Monoliths (Small Tools Win)

**Connects to:** Principle 4 (Small Decomposition)

**Rule:** Build small, discrete tools that do one thing well, then compose them via pipelines and clear interfaces.

**The Composition Test:** Can you describe what this component does in one sentence without using "and"?

**Python Pattern—Composable Functions:**

```python
# Each function does ONE thing
def load_records(path: Path) -> list[Record]:
    """Load records from a JSON file."""
    ...

def filter_active(records: list[Record]) -> list[Record]:
    """Return only active records."""
    ...

def summarize(records: list[Record]) -> Summary:
    """Compute summary statistics."""
    ...

# Composition via clear pipeline
def process_report(path: Path) -> Summary:
    records = load_records(path)
    active = filter_active(records)
    return summarize(active)
```

---

## Axiom V: Types Are Guardrails (Compile the Truth)

**Connects to:** Principle 3 (Verification Is Core)

**Rule:** The type checker is the first line of defense against AI hallucinations.

**The Type Discipline:**

```python
from dataclasses import dataclass
from typing import Protocol
from pydantic import BaseModel

# Domain models with dataclasses (internal)
@dataclass(frozen=True)
class UserId:
    value: str

@dataclass
class User:
    id: UserId
    email: str
    is_active: bool

# API models with Pydantic (external boundaries)
class CreateUserRequest(BaseModel):
    email: str

# Protocols for dependency injection
class UserRepository(Protocol):
    def save(self, user: User) -> None: ...
    def find_by_id(self, user_id: UserId) -> User | None: ...
```

**Type Enforcement Rules:**

| Rule | Implementation |
|------|----------------|
| No `Any` | Treat as tech debt; ban in CI |
| No `# type: ignore` | Fix the issue or document why |
| Validate at boundaries | Pydantic for all external input |
| Trust types internally | After validation, no defensive coding |

---

## Axiom VI: Data Is Relational (SQL as Default)

**Connects to:** Principle 5 (Files Are Memory)

**Rule:** Use SQL for structured data. Do not invent custom formats when a relational model applies.

**SQL is the default when:**
- Data has relationships (foreign keys, joins)
- You need to query data in multiple ways
- Data integrity constraints matter
- Multiple processes access the same data

**Python + SQL Pattern:**

```python
import sqlite3
from contextlib import contextmanager
from typing import Iterator
from dataclasses import dataclass

@dataclass
class Task:
    id: int
    title: str
    is_complete: bool

@contextmanager
def get_connection(db_path: str) -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def get_pending_tasks(conn: sqlite3.Connection) -> list[Task]:
    cursor = conn.execute(
        "SELECT id, title, is_complete FROM tasks WHERE is_complete = 0"
    )
    return [
        Task(id=row["id"], title=row["title"], is_complete=bool(row["is_complete"]))
        for row in cursor.fetchall()
    ]
```

---

## Axiom VII: Tests Are the Specification (Test-Driven Generation)

**Connects to:** Principle 3 (Verification Is Core)

**Rule:** Use Test-Driven Generation (TDG):
1. The Human writes the test first
2. The test becomes the prompt
3. Code is only "correct" when the test suite passes

**TDG Workflow:**

**Step 1: Human writes the test (this IS the specification):**

```python
# test_calculator.py
import pytest
from calculator import calculate_total, Item

class TestCalculateTotal:
    def test_empty_list_returns_zero(self):
        assert calculate_total([]) == 0
    
    def test_single_item(self):
        items = [Item(name="Widget", quantity=2, price_cents=500)]
        assert calculate_total(items) == 1000
    
    def test_with_tax(self):
        items = [Item(name="Widget", quantity=1, price_cents=1000)]
        assert calculate_total(items, tax_rate=0.1) == 1100
    
    def test_negative_quantity_raises(self):
        with pytest.raises(ValueError, match="quantity must be positive"):
            Item(name="Widget", quantity=-1, price_cents=500)
```

**Step 2: Human prompts AI:**

> "Write the implementation in `calculator.py` that passes all tests in `test_calculator.py`. Use Pydantic for the Item model."

**Step 3: Run tests, iterate until green.**

**The Test Hierarchy:**

```
                    ┌─────────────────┐
                    │   E2E Tests     │  ← Few: Critical paths only
                    │   (Minutes)     │
                    ├─────────────────┤
                    │ Integration     │  ← Some: Component boundaries
                    │   (Seconds)     │
                    ├─────────────────┤
                    │   Unit Tests    │  ← Many: Fast, isolated, exhaustive
                    │ (Milliseconds)  │
                    └─────────────────┘
```

---

## Axiom VIII: Version Control Is Memory (Everything Is a Diff)

**Connects to:** Principle 4 (Small Decomposition), Principle 5 (Files Are Memory)

**Rule:** All work must be committed to version control (Git).

**Requirements:**
- Every change is represented as a diff
- AI-generated code must be attributable
- Reverts must be safe and routine
- Branches isolate experimental work

**Commit Message Convention:**

```
<type>: <short description>

[optional body]

[optional footer: AI-assisted, closes #123]
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

---

## Axiom IX: Verification Is a Pipeline (CI Enforces Reality)

**Connects to:** Principle 3 (Verification Is Core), Principle 7 (Observability)

**Rule:** Every project must include a CI pipeline that runs on each change.

**The Verification Pyramid:**

```
Level 0: Formatting     → Immediate feedback
Level 1: Linting        → Style and common errors
Level 2: Type Checking  → Structural correctness  
Level 3: Unit Tests     → Behavioral correctness
Level 4: Integration    → Component interaction
Level 5: Security Scan  → Dependencies + secrets
Level 6: E2E Tests      → Critical path validation
```

**Minimum CI Pipeline (GitHub Actions):**

```yaml
name: CI
on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - uses: astral-sh/setup-uv@v4
      - run: uv sync
      - run: uv run ruff format --check .
      - run: uv run ruff check .
      - run: uv run pyright
      - run: uv run pytest --cov --cov-fail-under=80
      - run: uv run pip-audit
```

**Result:** Code that doesn't pass doesn't merge.

---

## Axiom X: Observability Extends Verification (Production Is the Final Test)

**Connects to:** Principle 7 (Observability)

**Rule:** Instrument systems for observability from the start.

**The Three Pillars:**
1. **Logs:** Structured, contextual, queryable
2. **Metrics:** Quantitative measures of system behavior
3. **Traces:** Request flow across components

**Python Logging Pattern:**

```python
import logging
import json
from typing import Any

class JSONFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        log_data: dict[str, Any] = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
        }
        if hasattr(record, "context"):
            log_data["context"] = record.context
        return json.dumps(log_data)
```

**Minimum Observability:**
- Structured logging (JSON) with correlation IDs
- Health check endpoints for services
- Error rates and latency metrics

---

## Axioms Summary

| # | Axiom | Core Rule |
|---|-------|-----------|
| I | Shell as Orchestrator | Shell for orchestration, Python for logic |
| II | Markdown Spec | All specs in human-readable Markdown |
| III | Programs over Scripts | Unix-style Python tools |
| IV | Composition | Small tools that do one thing well |
| V | Types as Guardrails | Pyright strict mode, Pydantic at boundaries |
| VI | SQL as Default | Relational data in relational stores |
| VII | TDG | Tests first, then generate implementation |
| VIII | Git as Memory | All changes as auditable diffs |
| IX | CI Enforces Reality | Automated verification on every change |
| X | Observability | Logs, metrics, traces from day one |

---

# PART III: THE PRACTICE

> This part integrates principles and axioms into a complete methodology with workflows, project structure, anti-patterns, and curriculum.

---

## The Development Workflow (The Loop)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. SPECIFY ──► 2. TYPE ──► 3. TEST ──► 4. GENERATE           │
│        │                                       │                │
│        │                                       ▼                │
│        │                              5. EXECUTE (CI)           │
│        │                                       │                │
│        │           ┌───────────────────────────┤                │
│        │           │                           │                │
│        │           ▼                           ▼                │
│        │      [PASS]                      [FAIL]                │
│        │           │                           │                │
│        │           ▼                           │                │
│        │    6. REVIEW (Human)                  │                │
│        │           │                           │                │
│        │     ┌─────┴─────┐                     │                │
│        │     ▼           ▼                     │                │
│        │ [APPROVE]  [REJECT]                   │                │
│        │     │           │                     │                │
│        │     ▼           └─────────────────────┤                │
│        │  7. MERGE                             │                │
│        │                                       │                │
│        └───────────── 8. ITERATE ◄─────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Step Details:**

1. **Specification (Markdown):** Describe the problem, constraints, and acceptance criteria
2. **Interface (Types):** Define inputs, outputs, invariants using Typed Python
3. **Verification (Tests):** Write failing tests that assert correct behavior
4. **Generation (AI):** Prompt: *"Write the implementation that passes this test."*
5. **Execution (CI/Local):** Run the full verification pyramid
6. **Review (Human):** Review for correctness, security, alignment with intent
7. **Merge:** Integrate passing, approved changes
8. **Iteration:** If tests fail or review rejects, tighten specs and regenerate

**Operational Rule:** If you cannot test it, you do not understand it well enough to ship it.

---

## The Standard Project Structure

```
project-name/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline
├── src/
│   └── project_name/
│       ├── __init__.py
│       ├── py.typed            # PEP 561 marker
│       ├── models.py           # Domain types (dataclasses)
│       ├── schemas.py          # API types (Pydantic)
│       ├── repository.py       # Data access
│       ├── service.py          # Business logic
│       └── cli.py              # Entry point
├── tests/
│   ├── __init__.py
│   ├── conftest.py             # Shared fixtures
│   ├── test_models.py
│   ├── test_service.py
│   └── test_cli.py
├── specs/
│   ├── README.md               # Project overview
│   ├── requirements.md         # Acceptance criteria
│   └── decisions/              # ADRs
│       └── 001-initial-architecture.md
├── pyproject.toml              # All config
├── uv.lock                     # Locked dependencies
├── README.md                   # Quick start
└── Makefile                    # Common commands
```

**Makefile:**

```makefile
.PHONY: install lint typecheck test ci

install:
	uv sync

lint:
	uv run ruff check . && uv run ruff format --check .

typecheck:
	uv run pyright

test:
	uv run pytest

ci: lint typecheck test
```

---

## Anti-Patterns

### Specification Anti-Patterns

| Anti-Pattern | Problem | Remedy |
|--------------|---------|--------|
| Vague Criteria | "It should work well" is untestable | Define specific, measurable outcomes |
| Missing Edge Cases | Happy path only | Enumerate failure modes |
| Spec Drift | Docs diverge from code | Tests are source of truth |

### Python Anti-Patterns

| Anti-Pattern | Problem | Remedy |
|--------------|---------|--------|
| Untyped Functions | AI hallucinates | Type every signature |
| `Any` Proliferation | No safety | Ban in CI |
| Dict-Driven Design | `dict[str, Any]` everywhere | Use dataclasses/Pydantic |
| Bare `except` | Hides bugs | Catch specific exceptions |

### AI Collaboration Anti-Patterns

| Anti-Pattern | Problem | Remedy |
|--------------|---------|--------|
| Prompt and Pray | No verification | Every generation must pass tests |
| Context Overload | Entire codebase in prompt | Focused context: types, tests, dependencies |
| Explanation Substitute | AI explains but you don't understand | If you can't explain why it's correct, don't ship |
| Type Erosion | "Just make it work" | Never compromise type safety |

---

## Escape Hatches

Deviations are acceptable when:
1. **Explicitly Justified:** Documented in ADR
2. **Time-Bounded:** Has expiration date
3. **Isolated:** Doesn't infect the system

**Common Justified Deviations:**

| Default | Deviation |
|---------|-----------|
| Typed Python | TypeScript for frontend, Rust for performance |
| SQL | Graph DB for relationship traversal |
| Pyright strict | Relaxed for legacy migration (with timeline) |

---

## Quick Reference: Python Discipline Stack

### Installation

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv init my-project && cd my-project
uv add pydantic
uv add --dev pytest pytest-cov pyright ruff pip-audit
```

### pyproject.toml Template

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["pydantic>=2.0"]

[project.optional-dependencies]
dev = ["pytest>=8.0", "pytest-cov>=4.0", "pyright>=1.1", "ruff>=0.4", "pip-audit>=2.0"]

[tool.pyright]
typeCheckingMode = "strict"
pythonVersion = "3.12"

[tool.ruff]
target-version = "py312"
line-length = 88

[tool.ruff.lint]
select = ["E", "W", "F", "I", "B", "C4", "UP"]

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-v --tb=short"

[tool.coverage.report]
fail_under = 80
```

### Common Commands

```bash
uv run ruff format .          # Format
uv run ruff check .           # Lint
uv run pyright                # Type check
uv run pytest --cov           # Test with coverage
```

---

## System Prompt for AI Content Generation

> **SYSTEM INSTRUCTION: THE LINDY-AI PROTOCOL (v2.0)**
>
> You are an expert technical author and educator advocating the "Lindy-AI" software engineering philosophy.
>
> **THE SEVEN PRINCIPLES:**
> 1. Bash Is the Key — Simple Unix tools beat complex frameworks
> 2. Code Is Universal — Code solves any computational problem
> 3. Verification Is Core — Always check that actions succeeded
> 4. Small Decomposition — Break tasks into verifiable chunks
> 5. Files Are Memory — Files are durable state
> 6. Constraints Enable — Boundaries enable capability
> 7. Observability — If you can't see it, you can't fix it
>
> **THE TEN AXIOMS:**
> I. Shell as Orchestrator | II. Markdown Spec | III. Programs over Scripts
> IV. Composition | V. Types as Guardrails | VI. SQL as Default
> VII. TDG | VIII. Git as Memory | IX. CI Enforces Reality | X. Observability
>
> **PRIMARY LANGUAGE: TYPED PYTHON**
> - Type hints on all functions
> - Pyright strict mode, Pydantic at boundaries
> - Python 3.12+ syntax
>
> **WHEN GENERATING CONTENT:**
> - Begin with Markdown problem statement
> - Define types before implementation
> - Write tests before showing implementation
> - Follow Unix philosophy for CLI tools
> - Emphasize CI as enforcement
>
> **TONE:** Pragmatic, industrial, rigorous, empowering.

---

## Curriculum Outline

**Title:** *The Architecture of Solutions: Programming in the AI Era*

### Part I: Principles Foundation (Weeks 1-4)

| Week | Focus | Principles |
|------|-------|------------|
| 1 | Environment Setup + Bash Fundamentals | P1: Bash |
| 2 | Code as Problem Solving | P2: Code, P3: Verification |
| 3 | Decomposition + State Management | P4: Decomposition, P5: Files |
| 4 | Constraints + Observability | P6: Constraints, P7: Observability |

**Labs:** Agent-directed tasks in Claude Code and Cowork

### Part II: Typed Python Foundation (Weeks 5-8)

| Week | Focus | Axioms |
|------|-------|--------|
| 5 | Types, Dataclasses, Pydantic | V: Types |
| 6 | Test-Driven Generation | VII: TDG |
| 7 | Unix-Style CLI Tools | I, III: Shell, Programs |
| 8 | CI Pipelines | IX: CI |

**Labs:** Build CLI utilities using TDG workflow

### Part III: Data & Services (Weeks 9-12)

| Week | Focus | Axioms |
|------|-------|--------|
| 9 | SQL + Python Integration | VI: SQL |
| 10 | FastAPI Services | V: Types, VII: TDG |
| 11 | AI Integration (Anthropic SDK) | II: Spec, IV: Composition |
| 12 | Observability in Practice | X: Observability |

**Labs:** Build AI-powered API with full test coverage

### Part IV: Full-Stack (Weeks 13-16)

| Week | Focus |
|------|-------|
| 13 | TypeScript Foundations |
| 14 | React Components |
| 15 | Frontend-Backend Integration |
| 16 | Production Deployment |

**Labs:** Connect React frontend to Python API

### Part V: Capstone (Weeks 17-20)

**Project:** AI-Powered Documentation Assistant

| Component | Technology |
|-----------|------------|
| CLI Ingestion | Typed Python, Unix philosophy |
| Data Layer | SQLite + SQLAlchemy |
| API Service | FastAPI + Pydantic |
| AI Integration | Anthropic SDK |
| Web Frontend | TypeScript + React |
| CI/CD | GitHub Actions |

**Deliverables:**
- [ ] Specification documents
- [ ] Type definitions
- [ ] Test suites (passing)
- [ ] Implementation (AI-generated, human-reviewed)
- [ ] CI pipeline (green)
- [ ] Deployed application

---

## Exercises: Principles in Practice

**🔧 Principle 1 - Bash Simplicity:**
```
"I have a folder of log files. Using only basic Unix commands 
(grep, cat, sort, uniq, wc), analyze these logs and tell me 
the most common error patterns."
```

**💻 Principle 2 - Code as Interface:**
```
"I need to combine data from multiple files and produce a summary. 
Write a Python script to do this, then run it and show me the results."
```

**✓ Principle 3 - Verification:**
```
"Reorganize these files, but verify each step worked. After 
moving any file, confirm it exists in the new location."
```

**📦 Principle 4 - Decomposition:**
```
"This is a complex task: [describe task]. Break it into small, 
verifiable steps. Show me the plan, then execute one step at a time."
```

**💾 Principle 5 - File Persistence:**
```
"As you work, maintain progress.md (what's done), decisions.md 
(why you made choices), and context.md (info for future sessions)."
```

**🔒 Principle 6 - Constraints:**
```
"You have access to this folder only. Before any deletion, 
show me what you plan to delete and wait for approval."
```

**👁 Principle 7 - Observability:**
```
"Work in verbose mode. Before each action, state what you're 
about to do. After each action, report what happened."
```

---

## Glossary

| Term | Definition |
|------|------------|
| **ADR** | Architecture Decision Record |
| **CI** | Continuous Integration |
| **Complexity Threshold** | Point where shell gives way to Python |
| **Dataclass** | Python's typed data container |
| **E2E** | End-to-End testing |
| **General Agent** | AI with shell/file/code access |
| **Lindy Effect** | Durable technologies continue being durable |
| **Protocol** | Python's structural subtyping |
| **Pydantic** | Runtime validation library |
| **Pyright** | Static type checker |
| **Ruff** | Fast Python linter/formatter |
| **TDG** | Test-Driven Generation |
| **Unix Philosophy** | Small tools, text streams, composition |
| **Verification Loop** | Act → Verify → Correct → Repeat |

---

## Non-Goals

This manifesto is **not**:
- A rejection of all new tools (use them when justified)
- A claim that AI replaces judgment (humans remain accountable)
- A guarantee of correctness (tests can have bugs)
- A prescription for all software (embedded, ML training differ)

It **is** a doctrine where:
- **Principles guide mindset**
- **Axioms guide methodology**
- **Verification is mandatory**
- **Durable primitives dominate**
- **Human judgment remains central**
- **AI amplifies but does not replace expertise**

---

## Changelog

### Version 2.0 (Current)

* **Unified Seven Principles + Ten Axioms** into single framework
* Part I (Principles) establishes mindset for all users
* Part II (Axioms) establishes methodology for developers
* Part III (Practice) integrates both with workflows and curriculum
* Added principle-to-axiom connections throughout
* Added exercises for each principle
* Streamlined curriculum to 20 weeks
* Maintained Typed Python as primary language

### Version 1.3

* Established Typed Python as primary language
* Added Python Discipline Stack
* Added Standard Project Structure

### Version 1.2

* Added Key Definitions, Anti-Patterns, Escape Hatches
* Added Axiom X: Observability

### Version 1.1

* Initial stable release with Nine Axioms

---

*End of Document*
