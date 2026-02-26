### Core Concept

Plugins are installable workflow packages that bundle Connectors, skills, slash commands, and sub-agents into a single unit. Connectors are the data-source component — pre-packaged MCP servers that link Claude to external services like Google Drive, Slack, and Jira without any coding required.

### Key Mental Models

- **Plugin as Container**: A Plugin holds multiple components — Connectors are just one ingredient. One install gives you everything a workflow needs.
- **Connector = MCP, No Code**: Connectors are MCP servers built and maintained by Anthropic and partners. The protocol is identical to Lesson 12; the difference is you authenticate instead of program.
- **Combination Power**: The real value comes from querying multiple sources in a single prompt — live data from four services in one request, no manual export.

### Critical Patterns

- Install Plugins from the directory with one click; all components activate immediately
- Add a Connector by authenticating to the external service and granting permission scopes
- Start with read-only access; enable read-write only for trusted, well-understood workflows
- Combine local files with multiple Connectors in a single prompt to eliminate manual data gathering

### Common Mistakes

- Treating Connectors as a different technology from MCP — they are MCP servers someone else built
- Expecting real-time data — Connectors fetch a current snapshot, not a live stream
- Confusing Plugins with Connectors — a Plugin bundles Connectors plus skills, commands, and sub-agents

### Connections

- **Builds on**: Lesson 12 (MCP fundamentals), Lesson 27 (browser integration)
- **Leads to**: Lesson 29 (Cowork safety, limitations, and upcoming features)
