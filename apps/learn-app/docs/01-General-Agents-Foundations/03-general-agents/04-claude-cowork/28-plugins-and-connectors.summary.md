### Core Concept

Plugins are the primary organizational unit in Cowork's extension ecosystem — portable workflow packages that bundle Connectors, skills, slash commands, and sub-agents into a single installable unit. Connectors are the data-source component: pre-packaged remote MCP servers that link Claude to external services without any coding. Plugins are portable file systems you own — they work across Cowork, the Claude Agent SDK, and future Claude surfaces.

### Key Mental Models

- **Plugin as Portable Container**: A Plugin holds multiple components — Connectors, skills, structured slash commands, sub-agents. One install gives you everything a workflow needs, and it carries forward across platforms.
- **Connector = MCP, No Code**: Connectors are MCP servers built and maintained by Anthropic and partners. The protocol is identical to Lesson 12; the difference is you authenticate instead of program.
- **Combination Power**: The real value comes from querying multiple sources in a single prompt — live data from four services in one request, no manual export.
- **Enterprise Scale**: Organization marketplaces, OpenTelemetry tracking, per-user provisioning, and auto-install policies let Plugins scale from individual to org-wide automation.

### Critical Patterns

- Install Plugins from the directory via the Customize menu; all components activate immediately
- Slash commands present structured forms (fill-in UI) instead of requiring free-text prompts
- Build custom Plugins with the Plugin Create tool or from private GitHub repos (beta)
- Start with read-only Connector access; enable read-write only for trusted workflows
- Combine local files with multiple Connectors in a single prompt to eliminate manual data gathering

### Common Mistakes

- Treating Connectors as a different technology from MCP — they are MCP servers someone else built
- Expecting real-time data — Connectors fetch a current snapshot, not a live stream
- Confusing Plugins with Connectors — a Plugin bundles Connectors plus skills, commands, and sub-agents
- Assuming Plugins only work in Cowork — they are portable across Claude surfaces

### Connections

- **Builds on**: Lesson 12 (MCP fundamentals), Lesson 27 (browser integration)
- **Leads to**: Lesson 29 (Cowork safety, limitations, and upcoming features)
