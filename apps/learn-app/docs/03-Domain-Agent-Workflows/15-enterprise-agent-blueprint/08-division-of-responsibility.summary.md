### Core Concept
A Cowork plugin has three owners with complete layer independence: the knowledge worker owns the SKILL.md (intelligence layer), IT owns the config.yaml and connector scripts (integration layer), and the administrator owns governance configuration. This three-way ownership model is not organisational tidiness — it is the mechanism that makes a deployed agent diagnosable. Without clear ownership, degradation is invisible; with clear ownership, the right person acts immediately when something goes wrong.

### Key Mental Models
- **Three-Way Ownership**: Knowledge worker → SKILL.md (all three sections), IT → config.yaml + connector scripts, Administrator → access control + audit configuration + shadow mode settings + HITL gate enforcement
- **Layer Independence Principle**: Each role operates within its own layer and has no incentive to intrude on others, because each layer contains only what that role understands and controls. IT cannot correctly edit SKILL.md Principles; the knowledge worker cannot correctly configure connector scripts.
- **Ownership Table**: Eight components mapped to owners — with validation/testing (primarily knowledge worker) and performance monitoring (shared knowledge worker + IT) as the only overlapping responsibilities
- **SKILL.md Maintenance as Ongoing Discipline**: Domain expertise evolves, regulatory standards change, organisational priorities shift, new edge cases surface — the SKILL.md requires the same maintenance discipline as a professional standard, not write-once authorship

### Critical Patterns
- Slow degradation (agent continues to function but incorrectly) is the central failure mode the ownership model prevents — it is harder to detect than spectacular failures
- The three failure pattern examples: outdated data in outputs (IT connector problem), incorrect clause classification (knowledge worker SKILL.md update needed), wrong users accessing the plugin (administrator permission configuration problem)
- Layer independence protects against well-intentioned interference — IT editing Principles would create quietly wrong outputs because IT lacks the domain expertise to make those edits correctly
- Performance monitoring is the one shared responsibility: knowledge worker monitors output quality dimension, IT monitors connector health and technical dimension

### Common Mistakes
- Treating SKILL.md as write-once — authoring and deploying is the beginning of the maintenance phase, not the end
- Assuming when something goes wrong it is the knowledge worker's problem by default — the ownership model identifies the correct layer immediately
- Thinking layer independence is enforced by access controls — it is structural: each layer contains only what that role understands

### Connections
- **Builds on**: All previous lessons (L01-L07) taught the components and mechanisms; this lesson establishes the accountability structure that makes the full architecture maintainable
- **Leads to**: Lesson 9 covers the marketplace — what happens when the SKILL.md expertise is generalisable beyond one organisation
