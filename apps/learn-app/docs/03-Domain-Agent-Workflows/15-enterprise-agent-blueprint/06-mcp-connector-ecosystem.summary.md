### Core Concept
The Cowork marketplace provides production MCP connectors for most enterprise systems across CRM, communication, knowledge/document, data/analytics, workflow, financial data, legal research, clinical systems, contracting, and enrichment categories. When a required system is not in the marketplace, a custom connector follows a commissioning process with predictable timelines: 2-4 weeks for modern APIs, 4-8 weeks for legacy or complex systems. Connector timelines are planning facts that must appear in deployment plans from the outset.

### Key Mental Models
- **Marketplace vs Custom Connectors**: Marketplace connectors cover standard enterprise systems (Salesforce, Jira, Snowflake, Bloomberg, etc.); custom connectors are built for organisation-specific or niche systems (e.g., a specific Revit installation)
- **Connector Scoping**: Each connector has a scope that restricts what data within the external system the agent can access — a SharePoint connector scoped to one folder is not a limited connector, it is a correctly configured one
- **Custom Connector Specification**: Four elements — which system (precise name/version), what data (specific objects/entities), what queries (filter by X, retrieve by Y), what permissions (read/write, scope restrictions)
- **Timeline as Planning Fact**: 2-4 weeks (modern REST API) and 4-8 weeks (legacy/complex) are not estimates — connector commissioning must start first because it is on the critical path

### Critical Patterns
- Financial data connectors (Bloomberg, Refinitiv) and legal research connectors (LexisNexis, Westlaw) require licensed subscriptions — the connector cannot be activated without a valid licence already in place
- Clinical connectors (Epic, Cerner) require HIPAA-compliant configuration as a prerequisite, not an afterthought
- Custom connector development (SKILL.md) and connector commissioning can run in parallel — but commissioning must start first
- The knowledge worker specifies connector requirements in plain language; IT implements — this is not self-service

### Common Mistakes
- Assuming all connectors are available out of the box — financial and legal connectors require pre-existing licensed subscriptions
- Underestimating custom connector timelines — 2-4 weeks is the floor, not the target
- Conflating connector scoping with connector capability — scope is a security feature

### Connections
- **Builds on**: Lesson 3 introduced connectors conceptually; this lesson maps the full ecosystem and commissioning process
- **Leads to**: Lesson 7 covers the governance layer — the config.yaml governance settings (audit_log, shadow_mode, escalation_routing) that govern how connector-sourced data flows through the plugin
