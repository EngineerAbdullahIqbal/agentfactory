### Core Concept
Chapter 15 provides the complete architecture for a Cowork plugin: three components (SKILL.md, config.yaml, connectors), three owners (knowledge worker, IT, administrator), three context levels (platform, organisation, plugin), four governance mechanisms (permissions, audit trails, shadow mode, HITL gates), and a marketplace distribution model. The nine lessons form a chain — each lesson answered a question the previous one raised. The SKILL.md is the component that everything else serves, and writing a production-quality one requires Chapter 16's Knowledge Extraction Method.

### Key Mental Models
- **Architecture as Chain**: Each lesson's answer generated the next question — definition → intelligence layer → deployment environment → context hierarchy → production example → connector ecosystem → governance → ownership → marketplace
- **SKILL.md Primacy**: The config.yaml and connectors serve the SKILL.md — they provide the environment and data that the intelligence layer uses. Remove the SKILL.md and you have deployment infrastructure without intelligence.
- **Knowledge Worker's Authorial Role**: Writing SKILL.md requires domain expertise, not programming. Reading config.yaml for verification requires infrastructure literacy, not systems engineering. Designing shadow mode rubrics requires domain knowledge of accuracy, not statistical training.
- **Governance as Trust Architecture**: Shadow mode, audit trails, and HITL gates produce the evidence that converts a promising demonstration into a deployable system — governance is the beginning of the trust story, not the end of the deployment story.

### Critical Patterns
- The three components are not parallel — they have a hierarchy: SKILL.md is intelligence, config.yaml is deployment environment, connectors are data infrastructure
- A domain expert can deploy a production-grade agent without writing code — the SKILL.md is plain English, the other components are owned by IT and administrators
- Chapter 16 addresses the one gap the chapter deliberately left open: how to extract and encode tacit domain expertise into the SKILL.md (the Knowledge Extraction Method)
- Self-assessment checklist: three-component model, Agent Skills Pattern, source integrity/uncertainty calibration, three-level context hierarchy, shadow mode criteria, ownership model (given a failure, can you assign it without deliberating?), and the marketplace transferability test

### Common Mistakes
- Believing architectural understanding means knowing how to write a production SKILL.md — this chapter taught the architecture; Chapter 16 teaches the extraction methodology
- Underestimating the SKILL.md's criticality — it determines whether the plugin is trustworthy, not merely functional
- Treating the ownership model as organisational formality rather than the mechanism that makes failures diagnosable and prevents slow degradation

### Connections
- **Builds on**: All nine lessons of Chapter 15, synthesised into a coherent deployment architecture
- **Leads to**: Chapter 16 — The Knowledge Extraction Method — which addresses how to make tacit domain expertise explicit and encode it into the Persona, Questions, and Principles of a production-quality SKILL.md
