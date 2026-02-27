### Core Concept

Part 3 is organised around seven professional domains chosen because they represent the clearest cases where domain expertise is both highly specific and currently difficult to encode, and where Cowork's connector infrastructure makes production deployment practical. All seven domains share a single underlying problem: institutional knowledge lock-in -- valuable expertise held by individual professionals that is unavailable to the organisation as a whole.

### Key Mental Models

- **Institutional Knowledge Lock-In**: The common thread across all seven domains. When the senior analyst retires or the lead architect changes firms, the organisation loses not just a person but a body of judgment, pattern recognition, and contextual understanding that was never documented.
- **Domain-Specific vs General Knowledge**: General knowledge (running a financial model, reviewing a contract template) can be taught quickly. Domain-specific knowledge (which data sources to trust, which clause patterns are dangerous in which jurisdictions) takes years to develop and is the true deployment target.
- **Cross-Domain Methodology Transfer**: Although expertise types differ, the deployment methodology is identical: identify knowledge at risk, encode it, connect to data sources, deploy with governance, validate against the expert.

### Critical Patterns

- Each domain has a specific type of expertise at risk: analyst judgment (Finance), clause pattern recognition (Legal), qualification heuristics (Sales), policy intent (HR), operational compliance (Healthcare), spatial reasoning (Architecture), specification completeness (Technical Documentation)
- Healthcare Operations sets an explicit boundary excluding clinical decision support -- governance requirements for clinical decisions are different in kind
- Architecture and Engineering requires a custom MCP server for Revit model interaction, making it the most infrastructure-specific domain
- Most professionals will recognise their work in one or two domains; cross-domain mapping is normal and expected

### Common Mistakes

- Assuming these seven domains are the only ones where agent deployment works -- they are the clearest cases with current infrastructure, not the complete list
- Confusing Healthcare Operations with clinical AI -- the chapter explicitly covers operational workflows, not diagnosis or treatment decisions
- Trying to match exactly one domain when professional work often spans two or three
- Treating the domain list as a menu to choose from rather than a framework for identifying where institutional knowledge is at risk in your own context

### Connections

- **Builds on**: Maturity model (Lesson 6) determining readiness for domain deployment; monetisation models (Lesson 5) mapping to specific domains; platform landscape (Lesson 4) providing deployment infrastructure
- **Leads to**: Starting the Conversation (Lesson 8) using domain profiles as vocabulary in deployment discussions; Chapter 15 providing the technical blueprint for deploying within a domain; domain-specific chapters (17-23) providing detailed deployment guides
