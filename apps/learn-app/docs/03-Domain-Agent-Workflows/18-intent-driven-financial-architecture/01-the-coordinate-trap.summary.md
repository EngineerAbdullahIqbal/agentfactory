### Core Concept

Every financial model built in the last forty years encodes business logic as cell coordinates — formulas like `=B14-(C14*$F$8+D$3)` that record _where_ a number is in the grid but not _what_ the number means. This coordinate-first design produces a pattern of degradation called **Formula Rot**, which has four structural symptoms: silent breakage (row insertion shifts references without warning), logic diffusion (the same assumption scattered across cells with inconsistent updates), audit burden (every formula must be manually traced through cell references), and AI opacity (agents can read coordinates but cannot infer the business rule a formula encodes). These symptoms are not caused by careless analysts — they are inherent in the coordinate-first paradigm and affect even expertly built models.

### Key Mental Models

- **The Coordinate Trap**: Business logic encoded as cell addresses means the model's meaning lives in the analyst's head, not in the spreadsheet. When the analyst leaves, the meaning goes with them.
- **Formula Rot as a Compounding Problem**: The four symptoms reinforce each other — silent breakage goes undetected because audit burden makes verification impractical, and AI opacity prevents agents from flagging logic diffusion.
- **Structural vs Individual Cause**: The problem is the paradigm (coordinates), not the practitioner. Better analysts do not solve Formula Rot; a different architecture does.

### Critical Patterns

- Coordinate-based formulas describe arithmetic (what is being calculated) but not intent (why it is being calculated)
- Documentation that exists outside the formula drifts from the formula over time and becomes unreliable
- AI agents face an amplified version of the audit burden — they can read all cells simultaneously but cannot infer meaning from position
- The business costs of Formula Rot are measurable: audit hours, restatement risk, handover failure, and AI underperformance

### Common Mistakes

- Assuming Formula Rot only affects poorly built models — even expertly constructed coordinate-based models exhibit all four symptoms
- Believing AI agents can "figure out" formula meaning from context — agents can trace dependencies but cannot reliably distinguish business intent from coordinate position
- Thinking better documentation solves the problem — external documentation drifts from the model within months

### Connections

- **Builds on**: Chapter 17 taught students to use Claude in Excel and Cowork on existing financial models — this lesson examines the structural flaw in the models those tools operate on
- **Leads to**: Lesson 2 introduces the core distinction between Coordinate-First and Logic-First modelling and demonstrates the difference through side-by-side Claude analysis of the same business rule in both paradigms
