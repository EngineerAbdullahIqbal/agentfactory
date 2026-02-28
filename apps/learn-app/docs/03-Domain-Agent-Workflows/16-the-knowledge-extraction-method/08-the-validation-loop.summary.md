### Core Concept
The Validation Loop converts a first-draft SKILL.md into a production-ready one through iterative testing: interpret failure patterns to diagnose which SKILL.md section needs revision, execute targeted rewrites without regression, re-run the full scenario set, and repeat until the 95% threshold is met. Shadow mode then validates against real production inputs, and graduated autonomy manages the transition to independent operation.

### Key Mental Models
- **Failure Pattern Interpretation**: Standard case failures indicate Persona or Questions problems. Edge case failures indicate Out of Scope gaps. Adversarial failures indicate Principles gaps. High-stakes failures indicate escalation condition gaps. The pattern, not the individual failure, determines which section to rewrite.
- **Targeted Rewriting Without Regression**: Modify only the specific SKILL.md sections the failure pattern identifies, then re-run the full scenario set — not just the previously failing scenarios. The full re-run catches regressions where a fix for one category breaks another.
- **Shadow Mode**: Production deployment with human review of every output. Minimum thirty days. Validates against real production inputs that no constructed scenario set can fully anticipate. The 95% accuracy rate over shadow mode earns exit into autonomous operation.
- **Graduated Autonomy**: Not a binary switch from full review to no review. Start with partial autonomy (low-stakes outputs bypass review), expand scope as evidence accumulates that the agent handles each category reliably.

### Critical Patterns
- A persistent failure across multiple iterations despite targeted rewrites suggests a structural conflict between SKILL.md sections, not a simple gap
- Shadow mode and scenario testing validate different things: constructed inputs vs real production inputs — both are necessary
- The thirty-day shadow mode minimum exists because production inputs follow patterns (month-end, quarterly cycles) that shorter periods cannot capture
- Graduated autonomy manages risk by allowing the agent to operate independently where its reliability is demonstrated while maintaining oversight where it is not

### Common Mistakes
- Rewriting the entire SKILL.md instead of targeting the specific section the failure pattern indicates
- Re-running only the previously failing scenarios without checking for regression
- Ending shadow mode early because metrics look good — the thirty-day minimum is not negotiable
- Treating the transition to autonomous operation as binary rather than graduated

### Connections
- **Builds on**: Lesson 7 designed the scenario set and scoring rubric; this lesson runs the iterative loop that produces the validated SKILL.md
- **Leads to**: Lesson 9 applies the complete methodology in a hands-on exercise — from extraction through validation
