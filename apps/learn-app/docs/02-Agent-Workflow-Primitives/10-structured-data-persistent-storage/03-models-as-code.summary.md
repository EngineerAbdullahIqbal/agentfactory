### Core Concept
Your job is to describe data requirements in plain English. The agent's job is to build the correct schema. Vague descriptions produce wrong schemas; precise descriptions get it right on the first try.

### Continuity Bridge
From proving persistence (L1) to defining what shape the persisted data must take -- before writing a single line of code.

### Key Mental Models
- "Exact dollars and cents, no rounding" -- not a Python type, a business requirement that prevents drift across millions of transactions.
- A schema is an enforced contract, not documentation -- the database rejects bad data automatically.
- Foreign key = "must reference an existing [entity]" -- stores a reference, not a copy.
- "Required" means the database is the bouncer, not a polite suggestion.

### Critical Patterns
- Director vocabulary: money → "exact dollars and cents", required → "this field is always required", unique → "no duplicates allowed", FK → "must reference an existing [entity]".
- Schema contract checklist: required/optional, money fields, entity links, unique fields, timestamp behavior -- verify all five before handing to the agent.
- Verify output line-by-line: every constraint you described should appear in the schema output.

### Common Mistake
Describing a field as "a number" instead of "exact dollars and cents" -- the agent picks approximate storage and drift compounds silently. Also: editing the agent's code instead of refining your description -- if you are touching code, you have left the director role.