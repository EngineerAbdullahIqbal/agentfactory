### Core Concept

A Cowork plugin has three layers. Layer 1: the format — a self-contained directory of components that extends Claude Code with custom functionality. Layer 2: knowledge-work specialisation — Anthropic's official plugins use this format to turn a general-purpose agent into a domain specialist through SKILL.md files and MCP connectors. Layer 3: enterprise readiness — Panaversity's evaluation model assesses production readiness across five properties (identity, instructions, connections, governance, performance record). The plugin package components (SKILL.md files, connectors (.mcp.json), commands, hooks, agents, and manifest (plugin.json)) are owned by distinct roles with clear scopes.

### Key Mental Models

- **Enterprise Readiness Properties** (Panaversity's evaluation model): Identity (name, persona, declared capabilities), Instructions (explicit behaviour governance), Connections (MCP links to external systems), Governance (rules for use and outputs), Performance record (audit log of interactions)
- **Plugin Package Components**: SKILL.md files (intelligence, owned by knowledge worker), connectors (.mcp.json) (integration, owned by IT/developer), commands, hooks, agents, and manifest (plugin.json) (orchestration and deployment, owned by IT/plugin developer)
- **Transparency as Architectural Property**: Every aspect of a plugin is inspectable by the right role — not incidentally, but by design. This verifiability is what makes plugins deployable in regulated industries.

### Critical Patterns

- A knowledge-work plugin is architecturally different from a "browser plugin" add-on — it encodes domain expertise and connects to enterprise systems within a platform that provides governance infrastructure
- The plugin package ownership separation is a governance feature: one owner per component means failures are immediately diagnosable
- Transparency replaces trust as the basis for deployment in regulated industries — compliance officers can inspect SKILL.md, connectors, manifest, and audit logs rather than relying on blind trust

### Common Mistakes

- Conflating the three layers: the generic format, the knowledge-work specialisation, and the enterprise readiness evaluation are distinct — presenting them as a single definition misattributes Panaversity's framework to Anthropic
- Assuming transparency means "visible to everyone" — it means every property is inspectable by the _right_ role
- Treating the plugin package components as interchangeable or allowing ownership overlap, which destroys diagnosability

### Connections

- **Builds on**: Chapter 14 established the knowledge transfer gap and the platform that closes it; this lesson defines the precise artifact the knowledge worker will build
- **Leads to**: Lesson 2 goes deep on the SKILL.md (the component the knowledge worker owns); Lesson 3 covers connectors (.mcp.json) and the plugin infrastructure
