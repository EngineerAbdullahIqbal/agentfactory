---
sidebar_position: 4
title: "The Document Extraction Framework"
description: "Learn the three-pass document extraction process — explicit rule extraction, contradiction mapping, and gap identification — that converts institutional documents into SKILL.md instructions while surfacing the problems naive extraction misses"
keywords:
  [
    "Method B",
    "document extraction",
    "explicit rules",
    "contradiction mapping",
    "gap identification",
    "temporal contradiction",
    "jurisdictional contradiction",
    "interpretive contradiction",
    "policy corpus",
    "SKILL.md",
    "institutional knowledge",
  ]
chapter: 16
lesson: 4
duration_minutes: 25

# HIDDEN SKILLS METADATA
skills:
  - name: "Execute Three-Pass Document Extraction"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can describe the purpose and output of each of the three passes, execute Pass One on a provided document, and explain how the passes build on each other to produce SKILL.md-ready instructions"

  - name: "Classify Document Contradictions"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can identify contradictions between extracted instructions and classify them as temporal, jurisdictional, or interpretive, and explain the resolution approach for each type"

  - name: "Identify Policy Gaps and Determine SKILL.md Response"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can identify situations not covered by extracted instructions, classify them as low-stakes or high-stakes, and write the appropriate SKILL.md instruction for each"

learning_objectives:
  - objective: "Execute each of the three passes of the document extraction framework and explain how Pass One, Pass Two, and Pass Three build on each other"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a set of policy documents, student can produce a Pass One extraction, identify at least one contradiction in Pass Two, and identify at least one gap in Pass Three"

  - objective: "Classify document contradictions as temporal, jurisdictional, or interpretive and propose a resolution approach for each"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a pair of conflicting instructions extracted from documents, student can classify the contradiction type and describe the resolution path (authoritative resolution, policy escalation, or ambiguity flagging)"

  - objective: "Identify policy gaps and write appropriate SKILL.md instructions that handle coverage voids without overstepping the agent's authority"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a gap identified in a policy corpus, student can classify it as low-stakes or high-stakes and write a SKILL.md instruction that either applies reasonable judgment transparently or escalates to a human authority"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Three-pass framework (structure and purpose of each pass)"
    - "Pass One: explicit rule extraction as transcription, not interpretation"
    - "Pass Two: contradiction mapping with three types (temporal, jurisdictional, interpretive)"
    - "Pass Three: gap identification with two response patterns (apply-and-flag vs escalate)"
  assessment: "4 concepts at B1 level — within the 7-10 cognitive limit for this tier. The three-pass structure provides an organising framework that reduces the cognitive load of the individual pass concepts."

differentiation:
  extension_for_advanced: "Select a real policy document from your organisation. Execute a miniature three-pass extraction: extract five rules (Pass One), identify one contradiction (Pass Two), and identify one gap (Pass Three). Convert the five rules into candidate SKILL.md instructions and note how the contradiction and gap would need to be resolved."
  remedial_for_struggling: "Focus on Pass One only. Take a single policy statement from a document you know well. Rewrite it in the form: 'The agent should [do X] when [condition Y] applies.' If you can do that transformation reliably, you have the core skill of Pass One."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Document Extraction"
  key_points:
    - "The fundamental challenge with document extraction is not finding documents — it is reading them correctly. Institutional documents are written for insiders, contain contradictions, and have invisible gaps."
    - "Pass One is transcription, not interpretation — convert institutional language into instruction language without adding context or resolving ambiguity"
    - "Pass Two produces a working document (contradiction map) that generates questions for the domain expert, not a finished SKILL.md artefact"
    - "Pass Three requires domain knowledge to execute well — it is most effective when done collaboratively with the domain expert"
  misconceptions:
    - "Students may try to resolve contradictions during Pass One — this is premature. Pass One is extraction only; contradiction resolution comes in Pass Two."
    - "Students may think contradictions in documents are errors to be fixed — they are features of institutional life that the SKILL.md must handle explicitly"
    - "Students may attempt Pass Three without domain expertise — gap identification requires knowing what questions the documents should answer, which requires familiarity with the domain"
  discussion_prompts:
    - "Think of a situation where two policies in your organisation gave different answers to the same question. How was the conflict resolved in practice? Was the resolution documented?"
    - "Have you ever encountered a situation at work that no policy covered? What happened? Was the gap ever formally addressed?"
  teaching_tips:
    - "Walk through the credit analyst examples for each pass — institutional credit policies are relatable enough for most professional audiences"
    - "The contradiction taxonomy (temporal, jurisdictional, interpretive) is the most useful framework in this lesson — drill it with examples"
    - "Emphasise that Pass Three is collaborative with the domain expert — the extractor brings the gap list, the expert confirms which gaps are real"
  assessment_checks:
    - question: "What is the purpose of Pass One and what should you NOT do during it?"
      expected_response: "Pass One extracts every explicit statement of policy, standard, or required behaviour and reformulates it as a candidate SKILL.md instruction. You should NOT interpret, infer, or add context. Pass One is transcription with reformatting — completeness, not quality."
    - question: "What are the three types of document contradictions?"
      expected_response: "Temporal (newer document supersedes older but both remain in circulation), jurisdictional (global policy and local implementation guide conflict), and interpretive (two documents cover the same situation with different implied standards)."
    - question: "What are the two SKILL.md response patterns for policy gaps?"
      expected_response: "Low-stakes gaps: apply the principle most consistent with the policy's evident purpose and tell the user you are doing so. High-stakes gaps (compliance-sensitive, legal, clinical): escalate to the relevant human authority and do not attempt to fill the gap."
---

# The Document Extraction Framework

Method B is used when the knowledge you need to encode lives primarily in documents: policy manuals, compliance frameworks, standard operating procedures, technical specifications, clinical protocols, legal guidelines, and the institutional records that accumulate in every mature organisation. It is the primary method for HR, where knowledge is distributed across employee handbooks and policy archives. It is a significant component for legal, healthcare, and architecture, where written standards carry force that expert judgement alone does not.

The fundamental challenge with document extraction is not finding the documents. It is reading them correctly. Institutional documents are written for the person who already understands the context, not for the person trying to understand it for the first time. They describe what to do, often with precision, without describing why — which means that the edge cases the document does not cover are invisible to a reader who does not already know they exist. They contradict each other, in the way that documents written at different times by different people in a changing organisation always contradict each other. And they have gaps — areas where there is no written policy because the situation has never arisen or because the answer is assumed to be obvious to anyone in the role.

All three of these problems — decontextualisation, contradiction, and gaps — produce SKILL.md errors if the document extraction is done naively. The three-pass framework is designed to surface and address all three.

## Pass One: Explicit Rule Extraction

Read the full document corpus with a single purpose: identify every explicit statement of policy, standard, or required behaviour. Write each one down as a candidate SKILL.md instruction in the form "The agent should [do X] when [condition Y] applies."

Do not interpret. Do not infer. Do not add context. In Pass One, you are a transcriptionist with a reformatting task: you are converting institutional rules from document language into instruction language. If the employee handbook says "all requests for schedule changes must be submitted at least five working days in advance," the Pass One extraction is "The agent should inform users that schedule change requests require at least five working days' notice." Nothing more.

**Credit analyst example — Pass One extractions from a bank's credit policy manual:**

| Document Statement | Pass One Extraction |
| --- | --- |
| "Debt service coverage ratio must exceed 1.25x for all term lending" | The agent should flag any term lending application where DSCR is below 1.25x |
| "Sector concentration limits apply as per Appendix B" | The agent should check the borrower's sector against current concentration limits in Appendix B |
| "All credit decisions above £10 million require dual sign-off from the credit committee" | The agent should route any credit decision above £10 million for dual sign-off |
| "Borrower financial statements must be no more than 12 months old at the time of assessment" | The agent should reject or flag financial statements older than 12 months |

The volume of Pass One output is typically large. A mid-size organisation's policy corpus will produce hundreds of candidate instructions. That is expected and correct. The purpose of Pass One is completeness — getting everything out of the documents — rather than quality. Quality comes in Passes Two and Three.

## Pass Two: Contradiction Mapping

Read the Pass One output as a set of instructions and identify every pair of instructions that conflict with each other. Do not attempt to resolve the contradictions at this stage. Map them and document them.

Contradictions in institutional documents fall into three categories.

**Temporal contradictions** occur when a newer document supersedes an older one but both remain in circulation. The 2019 credit policy says the maximum unsecured exposure is £5 million; the 2023 update says £8 million; the 2019 document was never formally withdrawn. Both are in the corpus. Pass One extracted both. Pass Two identifies them as contradictory.

**Jurisdictional contradictions** occur when a global policy and a local implementation guide conflict. The group credit policy says all lending decisions require a sector risk assessment; the regional implementation guide exempts facilities under £2 million from sector assessment because the administrative cost exceeds the risk management benefit. The global standard and the local practice give different answers.

**Interpretive contradictions** occur when two documents cover the same situation but with different implied standards. The data retention policy says "financial records must be retained for seven years" and the data privacy policy says "personal data should not be retained beyond its purpose." A customer financial record containing personal data falls under both policies — and they give different instructions about how long to keep it.

| Contradiction Type | How It Arises | How It Appears in Pass Two |
| --- | --- | --- |
| **Temporal** | Newer policy supersedes older; older not withdrawn | Two instructions with different thresholds, limits, or requirements for the same situation |
| **Jurisdictional** | Global and local policies cover the same situation differently | Two instructions that apply to the same query but give different answers depending on scope |
| **Interpretive** | Two policies overlap with different implied standards | Two instructions that are both individually correct but produce conflict when a query falls under both |

The contradiction map is a working document, not a SKILL.md artefact. Its purpose is to generate a list of questions for the domain expert. Before you complete the SKILL.md, you need an answer for each mapped contradiction. In most cases, the answer is authoritative: someone in the organisation has decision-making authority over the policy in question and can resolve the contradiction definitively. In some cases, the answer is that the contradiction is unresolved at the organisational level — which means the agent needs an instruction for how to handle it: typically, to flag the ambiguity to the user rather than applying either version of the conflicting rule.

**Credit analyst example — Pass Two contradiction:** The group credit policy requires a full sector risk assessment for all lending. The regional guide exempts facilities under £2 million. Resolution question for the domain expert: "Which policy takes precedence for the regional portfolio, and should the agent apply the exemption automatically or flag it for human confirmation?"

## Pass Three: Gap Identification

Re-read the Pass One extraction with the question: "What common situations in this domain are not covered by any instruction in this set?"

Gap identification is the hardest of the three passes because it requires you to have enough domain knowledge to know what questions the document corpus should answer but does not. For this reason, Pass Three is most effectively done in collaboration with the domain expert, ideally in a thirty-minute follow-up session after the Method A interview. You bring the gap list; the expert confirms which gaps are real policy voids that need resolution and which are situations the policy covers by implication that you did not recognise.

Real policy voids — situations genuinely not covered by any document — produce one of two SKILL.md instructions.

**Low-stakes gaps:** The void is in an area where the consequences of a reasonable judgement call are manageable. The SKILL.md instruction is: "For situations not covered by the documented policy, apply the principle most consistent with the policy's evident purpose and tell the user that you are doing so."

**High-stakes gaps:** The void is in a compliance-sensitive, legal, clinical, or financially material area. The SKILL.md instruction is: "For any situation not covered by documented policy in a compliance-sensitive area, escalate to the relevant human authority and do not attempt to resolve the ambiguity."

**Credit analyst example — Pass Three gap:** The credit policy specifies how to assess borrowers with audited financial statements. It does not address borrowers who provide management accounts only (common in mid-market lending). This is a real gap. Resolution: the expert confirms that management accounts require additional verification steps — independent revenue confirmation, site visits, or third-party references — none of which are documented. These become SKILL.md Principles.

## The Three Passes in Sequence

The three passes build on each other. Pass One produces the raw material. Pass Two tests its internal consistency. Pass Three tests its completeness against the real world.

| Pass | Input | Purpose | Output |
| --- | --- | --- | --- |
| **One** | Full document corpus | Extract all explicit rules | Candidate SKILL.md instructions (high volume, unfiltered) |
| **Two** | Pass One output | Map contradictions between instructions | Contradiction map + questions for domain expert |
| **Three** | Pass One output + domain knowledge | Identify situations not covered | Gap list with low-stakes/high-stakes classification |

After all three passes, you have three artefacts: a large set of candidate instructions (many of which will survive into the SKILL.md), a contradiction map that needs authoritative resolution, and a gap list that needs expert input. The candidate instructions become the foundation of the Principles section. The contradiction resolutions become explicit instructions about which policy takes precedence under which conditions. The gap resolutions become either judgement-with-transparency instructions or escalation instructions, depending on the stakes.

The three-pass framework does not replace Method A. It complements it. In domains where knowledge lives primarily in documents — HR, operations, regulatory compliance — Method B is the primary extraction method, and Method A serves primarily to resolve the contradictions and gaps that Method B surfaces. In domains where knowledge lives primarily in expert heads — finance, sales, creative work — Method A is primary, and Method B provides the documented standards against which expert judgement is calibrated. Lesson 5 teaches how to choose and combine the two methods.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to practise the document extraction framework.

### Prompt 1: Pass One Practice

```
I want to practise Pass One of the document extraction framework.
Here is a policy document (or excerpt) from my organisation:

[PASTE A POLICY DOCUMENT OR USE THIS EXAMPLE:
"Employee Travel Policy v3.2 — All domestic travel requires manager
approval. International travel requires VP approval and must be
booked at least 14 days in advance. Economy class is standard for
flights under 6 hours. Business class may be approved for flights
over 6 hours at VP discretion. All expenses must be submitted within
30 days of travel completion with original receipts."]

Extract every explicit rule as a candidate SKILL.md instruction in the
format: "The agent should [do X] when [condition Y] applies."

Do NOT interpret, infer, or add context. Transcribe and reformat only.
After extraction, count the instructions and note any statements that
are ambiguous (could be extracted in more than one way).
```

**What you're learning:** Pass One is mechanical but requires discipline. The temptation to interpret or add context is strong — practising the extraction as pure transcription-with-reformatting builds the restraint that keeps Pass One output clean and uncontaminated by assumptions. Ambiguous statements identified here become candidates for Pass Two and Pass Three analysis.

### Prompt 2: Contradiction Detection

```
Here are six SKILL.md instructions extracted from a corporate policy
corpus. Identify any contradictions between them and classify each
as temporal, jurisdictional, or interpretive:

1. "The agent should require VP approval for all international travel"
2. "The agent should allow senior directors to self-approve travel
   within their regional budget"
3. "The agent should retain employee records for 7 years after
   termination"
4. "The agent should delete personal data within 90 days of an
   employee's data deletion request"
5. "The agent should apply the global compensation framework to all
   salary decisions"
6. "The agent should apply regional cost-of-living adjustments that
   may exceed global framework bands"

For each contradiction pair, explain why they conflict and draft the
resolution question you would ask the domain expert.
```

**What you're learning:** Contradiction detection requires reading instructions as a set, not individually. Each instruction may be perfectly reasonable on its own — the conflict only appears when two instructions apply to the same situation. Training your eye to spot these conflicts is the core skill of Pass Two. The resolution questions you draft are the bridge to the domain expert who can resolve them authoritatively.

### Prompt 3: Gap Analysis

```
I have completed Pass One extraction for a [DOMAIN, e.g., HR policy,
credit policy, clinical protocol]. Here are the categories my
extracted instructions cover:

[LIST THE CATEGORIES, e.g.:
- Hiring and onboarding
- Leave and absence
- Performance reviews
- Termination procedures
- Compensation and benefits]

Help me identify gaps by asking: "What common situations in this
domain are NOT covered by any of these categories?" Generate ten
candidate gaps — situations a professional in this domain would
regularly encounter that fall between or outside these categories.

For each gap, classify it as low-stakes (apply reasonable judgement
and flag) or high-stakes (escalate without attempting to resolve).
```

**What you're learning:** Gap identification is the hardest extraction skill because it requires knowing what should be there, not just what is there. Working with AI to generate candidate gaps builds your ability to see the negative space in a policy corpus — the situations that are conspicuous by their absence. The low-stakes/high-stakes classification directly produces the two types of SKILL.md gap-handling instructions.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 5: Choosing and Combining Methods →](./05-choosing-and-combining-methods.md)
