### Core Concept
A Cowork plugin is a domain-specific agent deployed inside the Cowork environment with five structural properties: identity, instructions, connections, governance, and a performance record. These properties are not optional features — they are the structural requirements that distinguish a plugin from a prototype. The three-component model (SKILL.md, config.yaml, connector scripts) delivers these properties through three owners with distinct scopes.

### Key Mental Models
- **Five Structural Properties**: Identity (name, persona, declared capabilities), Instructions (explicit behaviour governance), Connections (MCP links to external systems), Governance (rules for use and outputs), Performance record (immutable log of all interactions)
- **Three-Component Model**: SKILL.md (intelligence, owned by knowledge worker), config.yaml (metadata and configuration, owned by IT), connector scripts (MCP integration, owned by IT/developer)
- **Transparency as Architectural Property**: Every aspect of a plugin is inspectable by the right role — not incidentally, but by design. This verifiability is what makes plugins deployable in regulated industries.

### Critical Patterns
- A plugin is architecturally different from a "browser plugin" add-on — it is a managed component with complete governance and performance infrastructure
- The three-component ownership separation is a governance feature: one owner per component means failures are immediately diagnosable
- Transparency replaces trust as the basis for deployment in regulated industries — compliance officers can inspect SKILL.md, config.yaml, and audit logs rather than relying on blind trust

### Common Mistakes
- Confusing a plugin with a prototype: an agent without a governance framework or performance record is not a plugin
- Assuming transparency means "visible to everyone" — it means every property is inspectable by the *right* role
- Treating the three components as interchangeable or allowing ownership overlap, which destroys diagnosability

### Connections
- **Builds on**: Chapter 14 established the knowledge transfer gap and the platform that closes it; this lesson defines the precise artifact the knowledge worker will build
- **Leads to**: Lesson 2 goes deep on the SKILL.md (the component the knowledge worker owns); Lesson 3 covers config.yaml and connector scripts
