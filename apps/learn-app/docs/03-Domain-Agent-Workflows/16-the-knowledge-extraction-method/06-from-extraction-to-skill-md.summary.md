### Core Concept
The extraction output is raw material — notes, rules, contradiction maps, gap lists, and a north star summary. Translating this into a SKILL.md requires writing a Persona that answers three precise questions, a Questions section with equal precision on capabilities and out-of-scope boundaries, and Principles that are specific enough to test — not vague aspirations.

### Key Mental Models
- **Three Persona Questions**: (1) What is this agent's professional level and authority? (2) What does it value in its own outputs? (3) What does it do when it does not know? These organise extraction output into functional Persona language. Chapter 15's four structural questions define what a Persona contains; these three questions are the writing method for producing it.
- **Questions Section as Two Halves**: The capability list and the out-of-scope list are equally important. Without out-of-scope boundaries, the agent will attempt adjacent queries and produce confident-sounding output in areas where it has no grounded expertise.
- **Testability Criterion for Principles**: A principle must describe a specific behaviour in a specific situation that a reviewer can observe in the output and score as present or absent. "Be accurate" is untestable. "When data contradicts a user-stated figure, surface the discrepancy explicitly" is testable.
- **Uncertainty Calibration Vocabulary**: Five levels — confirmed by data, supported by evidence, suggested by available information, possible but unconfirmed, speculative — each with a distinct meaning. The agent never uses a higher-confidence level than the evidence supports.

### Critical Patterns
- The north star summary is the primary source for the Persona — the expert's quality standards, communication style, and non-negotiable constraints translate directly
- Out-of-scope boundaries prevent the most dangerous failure mode: confident output in areas adjacent to the agent's capabilities but beyond its grounded expertise
- Vague principles produce agents that pass tests by coincidence; testable principles produce agents whose compliance can be verified

### Common Mistakes
- Writing a generic Persona ("helpful financial professional") that does not govern behaviour in ambiguous situations
- Listing capabilities without defining out-of-scope boundaries, allowing the agent to drift into adjacent areas
- Writing aspirational principles ("be accurate") instead of operationally testable ones
- Using generic confidence language instead of a defined calibration vocabulary

### Connections
- **Builds on**: Lessons 1-5 produced the raw extraction material; this lesson translates it into the SKILL.md structure taught in Chapter 15
- **Leads to**: Lesson 7 tests whether the SKILL.md instructions actually work through a structured validation scenario set
