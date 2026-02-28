### Core Concept
The config.yaml and MCP connector scripts are the two IT-owned components of a Cowork plugin. The config.yaml configures the deployment environment (model, interface, permission scope, governance settings). Connector scripts are continuously running services that handle authentication and data translation from enterprise systems. The knowledge worker's role is not to author these components but to understand them well enough to verify and detect problems — a professional skill called infrastructure literacy.

### Key Mental Models
- **config.yaml Structure**: Five sections — metadata (name, version, model), interface (input types, output format), connectors (external system access), governance (audit, review, escalation, shadow mode settings)
- **Permission Scope**: The connectors section specifies both which systems the agent can access AND what data categories within each system — scope is a security boundary enforced by the Cowork runtime, not by the SKILL.md
- **Three Connector States**: Working (live data), explicitly unavailable (agent reports the gap), fabricating data (the dangerous state — agent invents plausible-looking data when a connector is down)
- **Infrastructure Literacy**: Knowing enough to detect a connector problem, describe it precisely to IT, and verify data provenance before acting on high-stakes analysis — not operational depth, but sufficient awareness

### Critical Patterns
- The config.yaml is authored by IT and verified by the knowledge worker — not the reverse
- Permission boundaries in the config.yaml are enforced by the Cowork runtime, superseding any SKILL.md instruction to access out-of-scope data
- The dangerous connector failure mode is not unavailability (which is transparent) but fabrication — an agent that generates plausible data when a connector is down produces a hallucination presented as fact
- Read permission = can query data, cannot create/modify/delete; write permission = can act on external systems (requires much more scrutiny)

### Common Mistakes
- Thinking knowledge workers write the config.yaml — they specify requirements, IT implements and maintains it
- Assuming a connector failure will produce an obvious error message — in poorly configured systems, the agent may fabricate data silently
- Confusing permission scope with connector capability — a scoped connector is correctly configured, not limited

### Connections
- **Builds on**: Lesson 1 introduced the three-component model; this lesson covers the two IT-owned components in operational detail
- **Leads to**: Lesson 4 reveals that there is a governance hierarchy above config.yaml that can also override SKILL.md instructions
