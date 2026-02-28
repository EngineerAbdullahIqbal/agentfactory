### Core Concept
A validation scenario set with four categories at defined proportions — standard (50%), edge (25%), adversarial (15%), high-stakes (10%) — scored on three components — accuracy, calibration, and boundary compliance — is what separates a first-draft SKILL.md from a production-ready one. The 95% threshold for shadow mode entry is not negotiable, and zero high-stakes failures is an additional hard constraint.

### Key Mental Models
- **Four Scenario Categories**: Standard cases test core function (does the agent do its job?). Edge cases test boundary awareness (does it know where its scope ends?). Adversarial cases test principle robustness under pressure (can its instructions be circumvented?). High-stakes cases test escalation mechanisms (does it route to a human when the consequences are serious?).
- **Three Scoring Components**: Accuracy (factual and analytical correctness), calibration (appropriate confidence language), boundary compliance (scope adherence and escalation). All three must pass for a scenario to pass. An output can be accurate but poorly calibrated — correct figures with wrong confidence language.
- **Two 95% Gates**: Scenario testing at 95% earns entry into shadow mode. Production accuracy at 95% over 30 days (from Chapter 15) earns exit from shadow mode into autonomous operation. Same number, different stages, validating different things.

### Critical Patterns
- The proportions reflect frequency and criticality: standard cases are most common, high-stakes are least common but most consequential
- Failure patterns cluster by SKILL.md section: standard failures → Persona/Questions problems; edge failures → Out of Scope gaps; adversarial failures → Principles gaps; high-stakes failures → escalation condition gaps
- Scoring should be done by the domain expert or a qualified reviewer, not the SKILL.md author alone

### Common Mistakes
- Overweighting standard cases (testing only the easy scenarios and confirming the agent works for routine queries)
- Focusing exclusively on accuracy and neglecting calibration — an agent that states inferences as facts is dangerous even when accurate
- Undervaluing high-stakes cases because there are only two in a twenty-scenario set — any failure in this category is critical
- Treating adversarial cases as trick questions rather than honest probes of SKILL.md coverage gaps

### Connections
- **Builds on**: Lesson 6 produced the SKILL.md draft; this lesson tests whether the instructions actually work
- **Leads to**: Lesson 8 teaches the Validation Loop — interpreting failure patterns, targeted rewriting, shadow mode, and graduated autonomy
