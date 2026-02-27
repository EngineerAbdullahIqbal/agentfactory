---
sidebar_position: 7
title: "The Seven Domains"
description: "Explore the seven professional domains where domain expertise is hardest to encode and where Cowork's connector infrastructure makes production deployment practical: Finance, Legal, Sales, HR, Healthcare, Architecture, and Technical Documentation."
keywords:
  - enterprise domains
  - domain expertise
  - institutional knowledge
  - finance agents
  - legal agents
  - sales agents
  - HR agents
  - healthcare operations
  - architecture engineering
  - technical documentation
chapter: 14
lesson: 7
duration_minutes: 35

# HIDDEN SKILLS METADATA
skills:
  - name: "Name the Seven Professional Domains"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can list all seven domains and describe in one sentence what each covers"

  - name: "Identify Domain-Specific Knowledge Types"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can distinguish between general knowledge and domain-specific expertise that is difficult to encode, giving examples from at least three domains"

  - name: "Map Your Expertise to a Domain Profile"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can identify which domain or cross-domain profile best matches their professional background and articulate what institutional knowledge they hold"

learning_objectives:
  - objective: "List the seven professional domains addressed in Part 3 and explain why each was selected"
    proficiency_level: "A1"
    bloom_level: "Remember"
    assessment_method: "Recall exercise naming all seven domains with one-sentence justifications"

  - objective: "Explain why institutional knowledge lock-in is the common problem across all seven domains"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Written explanation connecting at least three domains to the institutional knowledge problem"

  - objective: "Map your own professional expertise to the domain framework and identify your deployable knowledge"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Personal domain mapping exercise identifying specific expertise, institutional knowledge, and deployment potential"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Seven domains as a selection framework"
    - "Domain-specific knowledge vs general knowledge"
    - "Institutional knowledge lock-in"
    - "Cross-domain methodology transfer"
  assessment: "4 new concepts within A2 limit of 5-7; the seven domains themselves are instances of a single framework, not separate concepts"

differentiation:
  extension_for_advanced: "Research how your specific industry sub-domain maps to the seven categories; identify hybrid domains that span two or more categories"
  remedial_for_struggling: "Focus on understanding just two or three domains closest to your own experience before attempting the full seven"

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Domains, Conversations, and Synthesis"
  key_points:
    - "The seven domains were not chosen arbitrarily -- they represent cases where expertise is both highly specific and currently difficult to encode"
    - "Every domain shares the same underlying problem: valuable institutional knowledge locked inside individual professionals"
    - "The methodology transfers across domains -- the chapter-by-chapter deep dives apply the same deployment framework to different expertise types"
  misconceptions:
    - "Students think these are the ONLY domains where AI agents work -- these are the clearest cases with current infrastructure, not the complete list"
    - "Students assume Healthcare means clinical diagnosis -- the chapter explicitly covers operations, NOT clinical decision support"
    - "Students think they need to match exactly one domain -- many professionals span two or three domains"
  discussion_prompts:
    - "Which domain is closest to your day-to-day work, and what institutional knowledge do you hold that a new hire would take months to acquire?"
    - "Can you think of a domain NOT on this list where the same institutional knowledge lock-in problem exists?"
  teaching_tips:
    - "Use the domain table as a quick-reference anchor -- project it and let students self-identify before reading the detailed profiles"
    - "Healthcare is the domain most likely to generate questions about scope -- emphasise the 'operations, not clinical' boundary early"
    - "Ask students to name ONE piece of institutional knowledge from their own work that is currently undocumented -- this makes the abstract concept concrete"
  assessment_checks:
    - question: "Why were these seven domains selected over other possible domains?"
      expected_response: "They represent the clearest cases where domain expertise is both highly specific and difficult to encode, and where Cowork's connector infrastructure supports production deployment today"
    - question: "What problem do all seven domains share?"
      expected_response: "Valuable institutional knowledge locked inside individual professionals, unavailable to the organisation as a whole"
---

# The Seven Domains

In the previous lesson, you assessed your organisation's readiness using the five-level maturity model. Now you need to know where to apply that readiness. Part 3 of this book is organised around seven professional domains, and each one represents a specific type of expertise that is currently locked inside individual professionals. Understanding these domains tells you where the deployment opportunities are -- and which chapter to prioritise when you are ready to build.

These seven were not chosen to be comprehensive. They were chosen because they represent the clearest cases where three conditions converge: the domain expertise is highly specific, encoding that expertise is currently difficult, and the connector infrastructure exists to make production deployment practical. They are also the domains where professionals most consistently identify the same underlying problem: institutional knowledge that is valuable to the organisation but unavailable beyond the individual who holds it.

## The Common Problem: Institutional Knowledge Lock-In

Before examining each domain individually, it is worth understanding what they share. Every organisation has knowledge that exists only in the heads of its most experienced people. When the senior analyst retires, when the lead architect changes firms, when the top sales performer leaves -- the organisation loses not just a person but a body of judgment, pattern recognition, and contextual understanding that was never documented.

This is institutional knowledge lock-in. It is not a technology problem. It is a knowledge transfer problem. The analyst's understanding of which data sources to trust under which conditions. The lawyer's sense of which clause patterns are genuinely dangerous in which jurisdictions. The HR director's memory of which policy exceptions are routinely granted and why. None of this is written down. All of it is valuable.

The seven domains that follow are where this problem is most acute -- and where the deployment frameworks from this chapter can address it.

## The Seven Domains

| Domain | Chapter | Core Expertise at Risk |
| --- | --- | --- |
| Finance and Banking | 17 | Analyst judgment on data trust, risk calibration, regulatory materiality |
| Legal and Compliance | 18 | Clause pattern recognition, jurisdictional risk assessment |
| Sales and Revenue | 19 | Qualification heuristics, signal recognition, outreach personalisation |
| HR and Operations | 20 | Policy intent, exception logic, human context behind processes |
| Healthcare Operations | 21 | Prior authorisation research, compliance monitoring, documentation |
| Architecture and Engineering | 22 | Spatial reasoning, coordination logic, clash detection judgment |
| Technical Documentation | 23 | Specification completeness standards, requirements review patterns |

### Finance and Banking

Corporate FP&A, investment research, credit analysis, regulatory reporting, and banking operations. The expertise at risk here is not the ability to run a financial model -- any competent analyst can do that. The expertise at risk is the senior analyst's understanding of which data sources to trust under which conditions, the banker's calibration for which risk signals actually predict credit events versus which are noise, and the CFO's judgment about which regulatory requirements are material versus which are compliance theatre.

A new analyst joining a finance team can learn the tools in weeks. Learning which numbers to believe takes years.

### Legal and Compliance

Contract review and drafting, regulatory compliance monitoring, jurisdiction-specific risk assessment, and legal operations. The expertise at risk is the experienced lawyer's understanding of which clause patterns are genuinely dangerous in which contexts. A standard non-compete clause might be enforceable in one jurisdiction and meaningless in another. A data processing agreement might be compliant in Europe and insufficient in California. The senior lawyer carries this jurisdictional map in their head.

### Sales and Revenue

Lead qualification, pipeline management, outreach personalisation, and CRM data hygiene. The expertise at risk is the top performer's qualification logic: the signals, heuristics, and pattern recognitions that distinguish a prospect worth pursuing from one that will consume resources without converting. Every sales team has someone who "just knows" which leads are real. That knowledge is the deployment target.

### HR and Operations

Onboarding, policy Q&A, institutional memory management, and process documentation. The expertise at risk is the HR director's understanding of the intent behind policies, the exceptions routinely granted, and the human context that formal documentation never captures. When someone asks "Can I work from another country for three months?" the written policy says no. The experienced HR professional knows that the answer is actually "yes, if you follow this informal process that has worked for the last four cases."

### Healthcare Operations

Prior authorisation research, patient communication workflows, compliance monitoring, and clinical documentation support. This domain comes with an explicit boundary: **NOT clinical decision support or diagnosis.** The governance requirements for clinical decisions are different in kind from operational decisions, and the deployment frameworks in this book are designed for operations.

The expertise at risk is the experienced administrator's knowledge of which prior authorisation pathways are likely to succeed, which documentation patterns satisfy compliance reviewers, and which communication approaches reduce patient friction.

### Architecture and Engineering

BIM coordination, Revit queries, coordination reports, clash detection, and RFI generation. This domain uses a custom MCP server for Revit model interaction. The expertise at risk is the lead architect's spatial reasoning and coordination logic -- the ability to look at a building information model and identify clashes that the software flags as warnings but experience says are critical problems, or clashes that the software misses entirely because they require understanding construction sequence.

### Technical Documentation and Specification

PRD authoring, specification drafting, and requirements review. The expertise at risk is the senior technical writer's understanding of what constitutes a complete specification. Not complete in the sense of "all sections filled in," but complete in the sense of "a developer reading this will not need to come back with questions." That distinction between structural completeness and functional completeness is the knowledge that takes years to develop.

## Cross-Domain Methodology Transfer

Although each domain has unique expertise types, the deployment methodology is the same across all seven. Every domain deployment follows the same pattern:

1. **Identify** the institutional knowledge at risk
2. **Encode** that knowledge into agent instructions
3. **Connect** the agent to domain-specific data sources via connectors
4. **Deploy** with appropriate governance for the domain's risk profile
5. **Validate** against the expertise of the professional whose knowledge was encoded

This is why Part 3 can address seven different domains with a consistent framework. The expertise changes. The methodology does not.

## Finding Your Domain

Most professionals reading this chapter will recognise their work in one or two of these domains immediately. Some will find themselves at the intersection of multiple domains -- an architect who also writes technical specifications, a compliance officer who also manages HR policy, a sales leader who also handles financial reporting.

If your work does not map neatly to any single domain, that is normal. The domain chapters (17-23) are designed to be read selectively. Read the one closest to your expertise first. The deployment patterns you learn there will transfer to any adjacent domain.

If your work falls entirely outside these seven domains, the frameworks still apply. The maturity model, the monetisation models, the platform comparison -- all of these are domain-agnostic. The seven domain chapters simply provide the most detailed deployment guides for the domains where the infrastructure is most mature.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to explore these concepts further.

### Prompt 1: Personal Application

```
I work in [YOUR ROLE AND INDUSTRY]. Based on the seven enterprise AI
domains (Finance, Legal, Sales, HR, Healthcare Operations,
Architecture/Engineering, Technical Documentation), which domain or
combination of domains best matches my work? Identify three specific
pieces of institutional knowledge I likely hold that would be valuable
to encode into an agent.
```

**What you're learning:** How to map your own professional expertise to the domain framework. The AI will help you identify knowledge you carry unconsciously -- the judgment calls and pattern recognitions you make automatically that a new colleague would take months to develop.

### Prompt 2: Framework Analysis

```
Compare the institutional knowledge at risk in Finance and Banking
versus Sales and Revenue. What makes the knowledge different in type,
and what makes the deployment challenge similar? Use specific examples
of judgment calls that an experienced professional makes but a new
hire cannot.
```

**What you're learning:** How to distinguish between domain-specific expertise types while recognising the common deployment methodology. This analysis builds your ability to evaluate any domain through the institutional knowledge lens.

### Prompt 3: Domain Research

```
I want to understand the Healthcare Operations domain boundary better.
Why does this book explicitly exclude clinical decision support from
the healthcare domain chapter? What governance differences make
operational healthcare AI deployable with standard frameworks while
clinical AI requires fundamentally different approaches? Give me
specific regulatory examples.
```

**What you're learning:** How governance requirements shape deployment boundaries. Understanding why certain types of expertise are deployable with current frameworks and others require fundamentally different approaches is critical for scoping any enterprise AI initiative.


## Flashcards Study Aid

<Flashcards />
