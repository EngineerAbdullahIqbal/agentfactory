---
sidebar_position: 6
title: "From Extraction to SKILL.md"
description: "Learn how to translate extraction outputs into a production-quality SKILL.md — writing a Persona using three extraction-focused questions that address Chapter 15's four structural elements, a Questions section with equal precision on scope and out-of-scope, and Principles that are specific and testable rather than vague"
keywords:
  [
    "SKILL.md",
    "Persona section",
    "Questions section",
    "Principles section",
    "Agent Skills Pattern",
    "uncertainty calibration",
    "testable instructions",
    "knowledge extraction",
    "credit analyst",
    "domain agent",
    "production quality",
  ]
chapter: 16
lesson: 6
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Write a Functional Persona Section"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can write a Persona section using three extraction-focused writing questions — professional level and authority, quality standards, and behaviour under uncertainty — that address Chapter 15's four structural elements, and can identify when a Persona is too vague to govern agent behaviour in unspecified situations"

  - name: "Define Scope and Out-of-Scope with Equal Precision"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can write a Questions section that defines the agent's capabilities and its boundaries, and can explain why an agent without a defined out-of-scope boundary is dangerous"

  - name: "Write Specific, Testable Principles"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can distinguish between a vague instruction and a testable Principle, and can translate extraction material into Principles that can be validated against a scenario set"

learning_objectives:
  - objective: "Write a Persona section using three extraction-focused writing questions — professional level, quality standards, and uncertainty behaviour — that address Chapter 15's four structural elements, with sufficient precision to govern agent behaviour in situations the SKILL.md does not explicitly cover"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a domain and a set of interview notes, student can draft a Persona that addresses all three questions and passes the vagueness test (is it specific enough to predict agent behaviour in an ambiguous scenario?)"

  - objective: "Write a Questions section that defines both capability scope and out-of-scope boundaries and explain why both halves are equally important"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a set of extraction outputs, student can produce a Questions section with a capability list and an out-of-scope list, and can explain the failure mode that results from omitting the out-of-scope definition"

  - objective: "Translate extraction material into specific, testable Principles with appropriate uncertainty calibration vocabulary"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a generic instruction and the extraction material it was derived from, student can rewrite it as a testable Principle and add appropriate uncertainty calibration language"

cognitive_load:
  new_concepts: 3
  concepts_list:
    - "Persona's three extraction-focused writing questions (professional level, quality standards, uncertainty behaviour) addressing Chapter 15's four structural elements"
    - "Questions section as scope document (capabilities + out-of-scope as equal halves)"
    - "Testable Principles vs vague instructions (with uncertainty calibration vocabulary)"
  assessment: "3 concepts at B1 level — within the 7-10 cognitive limit for this tier. Students already understand the Agent Skills Pattern from Chapter 15; this lesson teaches how to write each section from extraction outputs rather than from scratch."

differentiation:
  extension_for_advanced: "Take the north star summary you wrote (or the credit analyst example from Lesson 3) and draft a complete three-section SKILL.md outline: a Persona paragraph, five Questions section entries (three in-scope, two out-of-scope), and five Principles. For each Principle, write one test scenario that would confirm the agent follows it correctly."
  remedial_for_struggling: "Focus on the Principles section only. Take the credit analyst's heuristic 'always read the cashflow statement before the balance sheet.' Rewrite it as a testable SKILL.md Principle. Then write one scenario that would confirm the agent follows this instruction. If you can do that transformation, you have the core skill of this lesson."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Writing the SKILL.md"
  key_points:
    - "The Persona is not a marketing blurb — it is a functional specification that addresses Chapter 15's four structural elements through three extraction-focused writing questions and governs behaviour in unspecified situations"
    - "The Questions section's out-of-scope half is as important as the in-scope half — an agent without boundaries is dangerous, not helpful"
    - "The difference between a useful Principle and a useless one is testability — can you run a scenario against it and confirm the agent followed it?"
    - "Uncertainty calibration vocabulary is one of the most consistently underspecified elements of first-draft SKILL.md files and one of the most valuable to invest in"
  misconceptions:
    - "Students may write Persona sections that read like marketing copy — 'a helpful, knowledgeable, professional assistant' is not a Persona. It must specify authority level, quality standards, and uncertainty behaviour."
    - "Students may focus the Questions section entirely on capabilities and neglect the out-of-scope definition — the out-of-scope section is what prevents the agent from attempting queries it cannot handle well"
    - "Students may write Principles that are too generic to test — 'Be accurate' fails the testability criterion. 'When a specific figure cannot be confirmed against an approved data source, use the phrase my records show rather than a declarative statement' passes it."
  discussion_prompts:
    - "If an agent encounters a query that no Principle addresses, what determines how it responds? The answer is the Persona. What does that tell you about how precisely the Persona needs to be written?"
    - "Think of a Principle from your own domain that would be easy to test. Now think of one that would be hard to test. What makes the difference?"
  teaching_tips:
    - "The vague-vs-testable Principle comparison is the most effective teaching moment in this lesson — walk through the credit analyst examples side by side"
    - "Uncertainty calibration vocabulary deserves dedicated attention — it is the element most students underinvest in and the element that produces the most visible quality difference in deployed agents"
    - "Connect this lesson back to Chapter 15 Lesson 5, which showed the annotated financial research SKILL.md — students can now see how that SKILL.md was produced"
  assessment_checks:
    - question: "What three extraction-focused writing questions does Lesson 6 use to organise Persona content from interview material?"
      expected_response: "What is this agent's professional level and authority? What does this agent value in its own outputs — what quality standards does it hold itself to? And what does this agent do when it does not know?"
    - question: "Why is the out-of-scope section of Questions as important as the in-scope section?"
      expected_response: "Because an agent without a defined out-of-scope boundary will attempt queries it cannot handle well. An unfocused agent is not just unhelpful — it is dangerous, because it produces confident-sounding outputs for queries it is not equipped to answer reliably."
    - question: "What is the test for whether a Principle is specific enough?"
      expected_response: "You can run a scenario against it and confirm the agent followed it. 'Be accurate' cannot be tested against a scenario. 'When a specific figure cannot be confirmed against an approved data source, use the phrase my records show rather than a declarative statement, and flag the figure for human verification' can be tested."
---

# From Extraction to SKILL.md

The output of the Knowledge Extraction Method — whether from Method A, Method B, or their combination — is raw material. It is a set of notes, extracted instructions, a contradiction map, a gap list, and a north star summary. The work of producing a SKILL.md from this material is a writing task, not a knowledge task. It requires organising what you have learned into the three sections of the Agent Skills Pattern — Persona, Questions, and Principles — at the level of specificity that produces consistent agent behaviour.

Chapter 15 taught the architecture of these three sections: what each one is and why it matters. This lesson teaches how to write them from extraction outputs. The distinction is between understanding the structure and being able to produce the content. The structure is stable. The content is what the extraction methodology provides.

By the end of this lesson, you will be able to take the raw material from a Method A interview, a Method B document extraction, or both, and translate it into a SKILL.md draft that encodes something worth encoding. The draft will not be production-ready — that is what the Validation Loop in Lessons 7 and 8 achieves — but it will be substantive enough to test.

## Writing the Persona

The Persona section defines the agent not by its capabilities but by its professional character — the identity that governs its behaviour in situations the SKILL.md does not explicitly cover. This is where you synthesise the professional identity that emerged from the Method A interview and the authoritative context that Method B provided.

The most common error in first-draft Persona sections is vagueness. "You are an experienced financial professional who provides helpful and accurate analysis" is not a Persona. It is a marketing blurb. It does not tell the agent how to behave when the data is incomplete, when two analyses give conflicting results, when a user asks for a confidence the data does not support, or when the query is within the agent's scope but at the edge of the available information.

Chapter 15 defined the Persona section through four structural questions — the agent's professional standing, its relationship to the user, its characteristic tone, and what it will never claim to be. Those four questions describe what a Persona contains. The extraction process surfaces the answers through a different lens — three questions that organise the interview output into functional Persona language:

**What is this agent's professional level and authority?** Not "experienced" — but the specific level of experience and the specific scope of authority. A senior analyst with credit committee authority operates differently from a junior analyst who produces recommendations for committee review. The Persona must specify which one the agent emulates, because the distinction determines how the agent frames its outputs (authoritative recommendation vs analysis for review) and what actions it considers within its scope.

**What does this agent value in its own outputs?** Not "accuracy" — but the specific quality standards the agent holds itself to. Does it prioritise completeness over speed, or speed over completeness? Does it err on the side of caution or directness? Does it present a single recommendation or multiple options with tradeoffs? The answer to these questions shapes the character of every output the agent produces.

**What does this agent do when it does not know?** This is the most important question. An agent that has been told to be helpful without being told how to handle uncertainty will fill the gap with confident-sounding approximations — which is the most dangerous failure mode in professional deployment. The Persona must specify the agent's uncertainty behaviour: what language it uses, what it discloses, and at what point it stops attempting to help and routes to a human.

The north star summary from the Method A interview is the primary source for the Persona. The specific quality standards the expert described — the epistemic rigour, the communication style, the non-negotiable constraints — translate directly into Persona language.

**Credit analyst Persona — vague vs functional:**

| Vague Persona (insufficient) | Functional Persona (production-quality) |
| --- | --- |
| "You are an experienced credit analyst who provides helpful and accurate financial analysis" | "You are a senior credit analyst with credit committee authority, specialising in mid-market corporate lending. You prioritise analytical rigour over speed — an incomplete analysis delivered on time is less valuable than a thorough analysis delivered with a stated delay. When data is insufficient to support a conclusion, you state what you can confirm, what you cannot, and what additional information would resolve the uncertainty. You never present an inference as a confirmed finding." |

The functional version governs behaviour. The vague version does not.

## Writing the Questions Section

The Questions section defines what the agent is for — and, equally importantly, what it is not for. The structure is a list of capability categories followed by an explicit Out of Scope section.

Both halves of this section are important. An agent without a clear capability definition is unfocused — it attempts everything without prioritising. An agent without a clear Out of Scope definition is dangerous — it produces confident-sounding outputs for queries it is not equipped to handle reliably.

The capability categories should come from the specific examples that appeared in the Method A interview and the explicit rules that appeared in Pass One of the Method B extraction. If the credit analyst described four specific types of analysis in the interview — initial credit assessment, annual review, covenant monitoring, and sector risk evaluation — those four types are the foundation of the Questions section.

The Out of Scope section should address the specific boundary conditions that appeared in the answer to Interview Question 5 — the situations the expert identified where they would not trust an automated system — and any gaps from Pass Three of the document extraction that have been resolved as escalation conditions rather than policy statements.

**Credit analyst Questions section (abbreviated):**

*In scope:*
- Initial credit assessment for mid-market corporate lending (£2m - £50m facilities)
- Annual credit reviews against existing covenant packages
- Covenant compliance monitoring and breach classification (technical vs substantive)
- Sector risk assessment using current concentration data

*Out of scope:*
- Credit decisions above £50 million (route to senior credit committee)
- Assessment of borrowers with board or senior executive relationships (route to independent reviewer)
- Fact patterns not previously encountered in the training corpus (flag explicitly and route to specialist)
- Client-facing communications of any kind (all external correspondence requires human review)

The Out of Scope section is not a list of things the agent "probably shouldn't do." It is a precise definition of the boundary between autonomous operation and human involvement. Every item in it should be traceable to a specific extraction output — an interview answer, a documented policy, or a gap resolution.

## Writing the Principles Section

The Principles section is where the tacit knowledge from the Method A interview becomes explicit agent instructions. It is the longest section of a mature SKILL.md and the one that requires the most revision as the agent's performance is validated.

Each Principle should be a specific, testable instruction. The test for specificity is simple: can you run a scenario against this instruction and confirm that the agent followed it? If the answer is no, the instruction is too vague.

| Vague Instruction (fails testability) | Testable Principle (passes testability) |
| --- | --- |
| "Be accurate" | "When a specific figure cannot be confirmed against an approved data source, use the phrase 'my records show' rather than a declarative statement, and flag the figure for human verification" |
| "Consider the context" | "When a net debt increase occurs in the context of a capital investment programme with contracted revenue, assess it as a strategic investment rather than a deterioration signal" |
| "Prioritise risk management" | "When the earnings release date is within ninety days of the credit decision, run a sensitivity against the worst-case earnings scenario rather than the base case" |
| "Be careful with unusual situations" | "When the query involves a fact pattern not previously encountered in the training corpus, flag it explicitly as novel rather than applying an existing framework that may not fit" |

The failure modes surfaced by Interview Question 2 — the cases where expert judgement went wrong — typically translate into the most important Principles. They are the instructions that prevent the specific errors the expert has personally encountered. They are also, characteristically, the instructions that are hardest to write cleanly without the interview context, because the instruction's importance only becomes clear when you understand the mistake that led to it.

## Uncertainty Calibration Vocabulary

One of the most consistently underspecified elements of first-draft SKILL.md files — and one of the most valuable to invest effort in getting right — is the uncertainty calibration vocabulary: the precise language the agent should use to distinguish data-supported conclusions from reasonable inferences from open questions.

Without explicit calibration vocabulary, agents default to one of two problematic patterns. They either present everything with equal confidence — which is misleading when the data quality varies — or they hedge everything with generic disclaimers — which is unhelpful because it provides no signal about what the agent is actually confident about.

A well-specified calibration vocabulary gives the agent graduated language that communicates confidence levels precisely.

| Confidence Level | Calibration Language | When to Use |
| --- | --- | --- |
| **Data-confirmed** | "The financial statements show..." / "The documented policy states..." | Conclusion drawn directly from a verified source |
| **Strongly supported** | "Based on the available data, the indication is..." | Conclusion drawn from multiple consistent data points |
| **Reasonable inference** | "My assessment suggests..." / "The pattern is consistent with..." | Conclusion drawn from partial data or analogous situations |
| **Uncertain** | "My records show X, but I have not been able to confirm Y" | Conclusion based on incomplete information with identified gaps |
| **Outside scope** | "This falls outside my current analysis. I recommend consulting [specific resource]" | Query that requires expertise or data the agent does not have |

Chapter 15's annotated example in Lesson 5 showed one version of this vocabulary for a financial research agent. The vocabulary is domain-specific — a legal agent's calibration language differs from a clinical agent's — but the principle is universal: the agent must have explicit language for each level of confidence, and the choice of language must be governed by the quality of the evidence, not by the agent's desire to appear helpful.

## The Translation Process

The translation from extraction outputs to SKILL.md follows a consistent sequence.

Write the Persona first. Use the north star summary as the primary source. The Persona should capture the professional identity, the quality standards, and the uncertainty behaviour in a single paragraph or short set of paragraphs.

Write the Questions section second. Use the specific examples from the Method A interview for in-scope categories and the Question 5 answers and Pass Three gap resolutions for the Out of Scope section.

Write the Principles section third. Start with the load-bearing heuristics from Interview Question 4. Add the defensive Principles from Question 2 (failure mode prevention). Add the contextual distinctions from Question 3 (junior vs senior expertise gap). Add the explicit rules from Method B's Pass One extraction that survived the contradiction mapping. Add the uncertainty calibration vocabulary.

Then check the draft against the north star summary. If the Persona does not capture the professional identity described in the summary, revise it. If the Principles do not encode the most important decision-making logic and escalation condition, something was lost in the translation.

The draft that emerges from this process is a first draft, not a finished product. It encodes the extraction material faithfully, but it has not been tested against scenarios that reveal gaps, ambiguities, and instructions that conflict with each other under edge conditions. That testing — the Validation Loop — is what Lessons 7 and 8 teach.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to practise the SKILL.md writing process.

### Prompt 1: Persona Writing

```
I need to write a Persona section for a SKILL.md in [YOUR DOMAIN].
The agent will [BRIEF DESCRIPTION OF WHAT THE AGENT DOES].

Help me answer the three Persona questions:
1. What is this agent's professional level and authority?
   (Not just "experienced" — specific level and scope)
2. What does this agent value in its own outputs?
   (Not just "accuracy" — specific quality standards and tradeoffs)
3. What does this agent do when it does not know?
   (Specific uncertainty behaviour, not generic hedging)

After I answer each question, draft the Persona paragraph and assess
it: Would this Persona govern the agent's behaviour in an ambiguous
situation that no Principle explicitly addresses? If not, what is
missing?
```

**What you're learning:** Writing a Persona that governs behaviour rather than describing role is the hardest single skill in SKILL.md authorship. The three questions force precision that casual drafting avoids. Testing the Persona against an ambiguous scenario reveals whether it is functional or merely decorative — and the gap between those two is the gap between a SKILL.md that works in production and one that fails under pressure.

### Prompt 2: Testability Audit

```
Here are five candidate SKILL.md Principles. For each one, assess
whether it is specific enough to be testable:

1. "Provide thorough and accurate analysis"
2. "When receivables days increase for three consecutive quarters
   while revenue remains flat, flag the revenue line as potentially
   weakening and recommend working capital cycle investigation"
3. "Always follow relevant regulations"
4. "When the management narrative in the annual report describes
   working capital as 'well-managed' but the cashflow statement shows
   a deteriorating collection cycle, note the discrepancy and trust
   the cashflow data"
5. "Use professional judgement in complex situations"

For each Principle that fails the testability check:
- Explain why it cannot be tested against a scenario
- Rewrite it as a testable instruction using domain-specific
  language from the credit analyst examples in this chapter
- Write one test scenario that would confirm the agent follows the
  revised instruction
```

**What you're learning:** The testability criterion is the single most important quality check for SKILL.md Principles. Principles that feel reasonable in the abstract — "be accurate," "use professional judgement" — are operationally useless because they cannot be validated. This exercise builds the reflex of asking "Can I test this?" for every Principle you write, which directly improves the quality of your extraction-to-SKILL.md translation.

### Prompt 3: Uncertainty Calibration Design

```
I need to design an uncertainty calibration vocabulary for a SKILL.md
in [YOUR DOMAIN]. The agent will produce [TYPE OF OUTPUT: e.g.,
financial analysis, legal risk assessments, clinical summaries,
project status reports].

Help me design a five-level calibration vocabulary:
1. Data-confirmed: language for conclusions drawn from verified sources
2. Strongly supported: language for conclusions from multiple
   consistent signals
3. Reasonable inference: language for conclusions from partial data
4. Uncertain: language for conclusions with identified knowledge gaps
5. Outside scope: language for redirecting to appropriate resources

For each level, provide:
- The specific phrases the agent should use
- An example output sentence using that language
- The evidence threshold that distinguishes this level from
  the adjacent ones

The vocabulary should be natural and professional — not robotic
disclaimers — and appropriate for [TARGET AUDIENCE: e.g., board
members, clinical teams, project managers].
```

**What you're learning:** Uncertainty calibration vocabulary is domain-specific and audience-specific. A board presentation requires different confidence language from a clinical summary or a project status report. Designing the vocabulary explicitly — rather than leaving the agent to improvise — prevents the two most common failure modes: overconfident outputs that mislead users and over-hedged outputs that provide no signal about what the agent actually knows.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 7: Building the Validation Scenario Set →](./07-building-the-validation-scenario-set.md)
