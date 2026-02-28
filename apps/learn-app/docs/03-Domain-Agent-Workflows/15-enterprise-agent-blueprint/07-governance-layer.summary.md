### Core Concept

Governance in Cowork has four specific mechanisms: IAM-integrated permissions (who can access the plugin and at what level), audit logging (every interaction recorded through enterprise admin controls), shadow mode (this book's recommended 30-day minimum, 95% accuracy threshold before autonomous operation), and human-in-the-loop gates (structural stops for actions requiring human accountability). Governance is not what limits deployment — it is what makes deployment possible in regulated industries.

### Key Mental Models

- **IAM-Inherited Permissions**: Cowork inherits access control from the organisation's existing identity management system. Users not in the IAM system cannot see the plugin. Role-based scoping further restricts capabilities within the authorised population.
- **Audit Trails as Defensibility Assets**: Every query, data source accessed, output generated, timestamp, and user identity is logged through enterprise admin controls. In regulated industries, this turns a potential compliance incident into a documented, defensible process.
- **Shadow Mode Protocol**: New plugins operate in shadow mode — full capability, outputs held for human review. Transition to autonomous operation requires: ≥30 days in shadow mode AND 95% accuracy across a representative sample with no critical errors in the preceding 10 days. Both criteria are non-negotiable.
- **HITL Gates — Principle**: Autonomous for everything safe, human for everything that genuinely needs human judgment (not just human attention). Some action types require human accountability regardless of agent accuracy — these are structural stops, not temporary safeguards.

### Critical Patterns

- The 30-day minimum exists to surface failure modes that only appear in edge cases across varied inputs — a quiet week does not produce the same evidence as a month across normal operating conditions
- 95% accuracy with no critical errors in 10 days means the threshold is on both overall performance AND absence of high-severity failures
- HITL gates are defined in the SKILL.md's Principles section and enforced through escalation routing — they are not suggestions
- Governance is configured by administrators in org admin settings, not in the SKILL.md — the knowledge worker understands governance but does not own its configuration

### Common Mistakes

- Treating governance as a constraint on agent value rather than the mechanism that makes regulated deployment possible
- Assuming 95% accuracy means 95% of everything — it means 95% of a representative sample with no critical errors
- Treating HITL gates as temporary safeguards to be removed once the agent is trusted — for certain action types, they are permanent
- Assuming governance slows deployment — shadow mode is what accelerates trust accumulation and ultimately enables more autonomy

### Connections

- **Builds on**: Lesson 4 introduced the three-level context hierarchy including organisation-level policies; this lesson details the four specific mechanisms that constitute the governance layer
- **Leads to**: Lesson 8 establishes who owns each governance component (administrator) and how ownership clarity makes failures diagnosable
