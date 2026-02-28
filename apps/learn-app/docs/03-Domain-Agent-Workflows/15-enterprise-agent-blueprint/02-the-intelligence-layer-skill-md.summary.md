### Core Concept
The SKILL.md is a plain-English document written by a domain expert that constitutes the intelligence layer of a Cowork plugin. It follows the Agent Skills Pattern with three sections — Persona, Questions, and Principles — each performing a distinct function. The SKILL.md is what closes the knowledge transfer gap: it is the pathway through which domain expertise reaches a deployed system without requiring programming ability.

### Key Mental Models
- **Agent Skills Pattern**: Three sections that together define who the agent is (Persona), what it does (Questions), and how it decides (Principles)
- **Persona as Functional Specification**: Professional identity governs ambiguous situations more reliably than rules — an agent with a precise identity handles unanticipated situations without requiring a rule for each scenario
- **Questions as Two-Sided Scope Document**: The out-of-scope boundary is as important as the in-scope list; an agent without it will attempt queries it cannot handle reliably
- **Domain-Specific Principles**: Generic principles ("be accurate") provide no actionable guidance; domain-specific principles ("flag any clause referencing jurisdiction outside England and Wales") govern the specific situations that arise in practice

### Critical Patterns
- A SKILL.md is not code or configuration — it is a structured English document that a compliance officer, project manager, or clinician can write
- Identity constraints in the Persona section (e.g., "you are not an investment adviser") govern behaviour across all contexts including situations no rule anticipated; a rule can be argued around, an identity cannot
- The Questions section must define what the agent will NOT handle, not just what it will — an agent with undefined out-of-scope territory will produce confident-sounding output in areas where it has no grounded expertise
- Specificity is the work: making tacit professional knowledge explicit is the hardest part of authoring a SKILL.md

### Common Mistakes
- Assuming SKILL.md is a code or configuration file (the name and .md extension trigger this misconception persistently)
- Writing a Persona as a marketing description rather than a functional specification — only precision shapes agent behaviour in ambiguous situations
- Writing generic Principles that are aspirational ("be helpful") rather than actionable — domain-specific constraints are what produce reliable, trustworthy outputs

### Connections
- **Builds on**: Lesson 1 established the three-component model; this lesson goes deep on the knowledge worker's component
- **Leads to**: Lesson 5 will show a complete, annotated SKILL.md example; Lesson 3 covers the other two components (config.yaml and connectors)
