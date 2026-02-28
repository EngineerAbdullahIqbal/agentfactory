### Core Concept
Cowork operates with a three-level context hierarchy: platform context (set by Anthropic, applies to all deployments), organisation context (set by the Cowork administrator, applies to all plugins in the organisation), and plugin context (the SKILL.md, set by the knowledge worker). Higher levels silently override lower levels — an agent does not announce when a SKILL.md instruction has been superseded, it simply behaves as the higher level requires. Understanding this hierarchy is what allows correct diagnosis of unexpected agent behaviour.

### Key Mental Models
- **Three-Level Hierarchy**: Platform → Organisation → Plugin. Each level governs a narrower scope. Higher levels cannot be overridden by lower levels, unconditionally.
- **Silent Override**: When a higher-level constraint supersedes a SKILL.md instruction, the agent simply does not follow the instruction — no error message, no explanation. The knowledge worker sees the outcome without explanation.
- **Diagnostic Sequence**: When an agent ignores a SKILL.md instruction — check platform level first (is this possible anywhere?), then organisation level (has the admin set a policy?), then SKILL.md last (is there an error in the instruction?). Starting with the SKILL.md is the most common and most wasteful error.
- **Additive Constraints Only**: The SKILL.md can add more-restrictive constraints than higher levels require, but cannot remove or override restrictions established above it.

### Critical Patterns
- Organisation-level policies are often set for legitimate regulatory reasons the knowledge worker may not be fully aware of — they are not arbitrary
- Knowledge workers can add more-restrictive plugin-level constraints (narrower scope, lower escalation thresholds) but cannot expand permissions beyond what the organisation allows
- The correct response to a silent override is to speak with the administrator, not to rewrite the SKILL.md again
- Platform-level constraints are policy decisions by Anthropic, not model capability limitations

### Common Mistakes
- Assuming that a valid SKILL.md instruction will always be followed — it is conditional on higher-level permissions
- Expecting the agent to announce when an override has occurred — overrides are always silent
- Starting the diagnostic at the SKILL.md when the problem is at the organisation or platform level (wasted revision cycles)
- Thinking the knowledge worker can change organisation-level policies by writing a clever SKILL.md instruction

### Connections
- **Builds on**: Lesson 3 showed that config.yaml permissions override SKILL.md instructions; this lesson reveals the full hierarchy above config.yaml
- **Leads to**: Lesson 7 covers the governance layer in detail — the mechanisms (IAM permissions, audit trails, shadow mode, HITL gates) that the administrator configures at the organisation level
