---
sidebar_position: 2
title: "The Five Questions — Expert Interview Framework"
description: "Learn the five structured interview questions that reliably surface tacit professional knowledge — decision-making logic, exceptions and edge cases, and escalation conditions — with credit analyst examples for each"
keywords:
  [
    "expert interview",
    "five questions",
    "Method A",
    "tacit knowledge",
    "knowledge extraction",
    "episodic memory",
    "failure modes",
    "junior vs senior",
    "decision guide",
    "escalation conditions",
    "SKILL.md",
    "credit analyst",
  ]
chapter: 16
lesson: 2
duration_minutes: 30

# HIDDEN SKILLS METADATA
skills:
  - name: "Apply the Five-Question Interview Framework"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Communication and Collaboration"
    measurable_at_this_level: "Student can state each of the five interview questions, explain what type of tacit knowledge each one surfaces, and adapt the questions to a professional domain they know"

  - name: "Identify the Three Kinds of Tacit Knowledge"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can name and describe the three kinds of tacit knowledge the five questions surface — decision-making logic, exceptions and edge cases, and escalation conditions — and explain why each is necessary for a production SKILL.md"

  - name: "Distinguish Episodic from Semantic Memory Prompts"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can explain why asking for a specific recent example produces richer extraction material than asking for general best practices, and can construct follow-up questions that keep the conversation in episodic rather than semantic mode"

learning_objectives:
  - objective: "State each of the five interview questions and explain what type of tacit knowledge each one is designed to surface"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can list the five questions from memory, describe the extraction purpose of each, and identify which of the three tacit knowledge categories each question primarily targets"

  - objective: "Explain why episodic memory prompts produce richer extraction material than semantic memory prompts and construct appropriate follow-up questions"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a domain and a generic interview question, student can reformulate it as an episodic prompt and generate two follow-up questions that keep the conversation specific rather than abstract"

  - objective: "Identify how each question maps to a specific section of the SKILL.md and explain what happens when a question is skipped"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can map each question to the SKILL.md section it informs (Persona, Questions, or Principles) and describe the specific gap that appears in the SKILL.md when that question's output is missing"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Question 1: Recent success — activating episodic vs semantic memory"
    - "Question 2: Instructive failure — surfacing failure modes and defensive knowledge"
    - "Question 3: Junior vs senior gap — identifying the expertise differential"
    - "Question 4: One-page decision guide — compressing operational heuristics"
    - "Question 5: Automation boundaries — defining human-in-the-loop requirements"
  assessment: "5 concepts at B1 level — at the upper bound of the 7-10 cognitive limit for this tier. Each question is a distinct concept, but they share a common structure (question + purpose + follow-ups + credit analyst example) that provides scaffolding across the set."

differentiation:
  extension_for_advanced: "Adapt all five questions to a domain you know well. For each question, write the domain-specific version and predict what kind of answer it would elicit from the most experienced person in that domain. Then identify which SKILL.md section each answer would inform."
  remedial_for_struggling: "Focus on Questions 1 and 2 only. For Question 1, think of a time your own work went well and write down three details you would mention. For Question 2, think of a time your judgement was wrong. The difference between those two accounts — what you noticed, what you missed — is the raw material that extraction captures."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "The Five Questions"
  key_points:
    - "The five questions are not arbitrary — they are ordered to surface decision-making logic, then failure modes, then the expertise differential, then operational heuristics, then automation boundaries"
    - "Question 1 works because it activates episodic memory (specific events) rather than semantic memory (general descriptions) — this distinction is the key to rich extraction"
    - "Question 2 is the single most valuable question because the knowledge it produces — defensive expertise from personal failure — is the hardest to find anywhere else"
    - "Question 5 defines the human-in-the-loop boundaries that make the deployed agent governable — skip it and the SKILL.md has no escalation logic"
  misconceptions:
    - "Students may think the questions are a rigid script — they are a framework for a conversation, and following the expert's experience is more important than maintaining sequence"
    - "Students may undervalue Question 2 because it asks about failure — the failure modes an expert has personally encountered are the most precise and valuable extraction material"
    - "Students may assume Question 4 produces the finished SKILL.md — it produces the load-bearing principles, not the complete document"
  discussion_prompts:
    - "Why does asking 'What do you do?' produce a less useful answer than asking 'Walk me through a recent example of this work going well'?"
    - "Think of a mistake you made early in your career that you would never make now. What signal do you now recognise that you did not recognise then? That signal is exactly the kind of knowledge Question 2 surfaces."
  teaching_tips:
    - "Walk through the credit analyst examples for each question — they make the abstract framework concrete and give students a model for what good extraction looks like"
    - "Emphasise the follow-up questions for each main question — the follow-ups are where the specific, actionable material surfaces"
    - "Question 3 is often the easiest for students to engage with because everyone has observed the junior/senior gap in their own domain"
  assessment_checks:
    - question: "Why does Question 1 ask for a specific recent example rather than asking what the expert does in general?"
      expected_response: "Because a specific example activates episodic memory — the expert reconstructs a real event and includes the details that made it specific: what they noticed, what they were uncertain about, what they decided and why. Asking what they do in general activates semantic memory, which produces the official version of their expertise rather than the operational version."
    - question: "What makes Question 2 the single most valuable question in the interview?"
      expected_response: "Because it surfaces failure modes the expert has personally encountered and learned from. This knowledge is the hardest to find anywhere else — post-mortems are often sanitised, and costly mistakes are rarely documented in accessible forms. The lesson drawn from a personal failure is typically the most precise piece of domain knowledge in the interview."
    - question: "What do the answers to Question 5 produce in the SKILL.md?"
      expected_response: "Escalation conditions — the situations where the agent should route to a human rather than handle autonomously. These typically cluster into three categories: stakes too high, context too unusual for standard rules, and human relationship that cannot be delegated."
---

# The Five Questions — Expert Interview Framework

Method A is used when the knowledge you need to encode lives primarily in the heads of experienced professionals rather than in documents. It applies to domains where the most important expertise is tacit: the financial analyst's risk calibration, the lead architect's coordination judgement, the compliance officer's instinct for which contract clause deserves more scrutiny than its surface reading suggests.

The method is structured around five questions. Not because five is a magic number, but because these five questions, in this order, reliably surface the three kinds of tacit knowledge that most domain agent SKILL.md files need: the decision-making logic the expert applies, the exceptions and edge cases that standard frameworks miss, and the escalation conditions that separate what the agent should handle autonomously from what it should route to a human.

The questions are designed for a conversation, not a form. They are prompts for a structured interview with the domain expert whose knowledge you are encoding — which may be yourself, a colleague, or a subject-matter expert you are engaging specifically for this purpose. A single interview of sixty to ninety minutes, conducted properly with these five questions, produces enough material to write a substantive first-draft SKILL.md. What the interview will not produce, and what no interview can produce, is a complete SKILL.md. The gap between the first draft and the production-ready version is what the Validation Loop in Lesson 8 closes.

## Question 1: Walk Me Through a Recent Example of This Work Going Well

Not "what do you do?" and not "what are the best practices for this?" Both of those questions invite the expert to perform their knowledge rather than reveal it. They produce the official version of expertise — the version that appears in job descriptions and training manuals — rather than the operational version that drives actual decisions.

Asking for a specific recent example of work going well does something different. It activates episodic memory rather than semantic memory. The expert does not retrieve a stored description of their expertise; they reconstruct a specific event. And in reconstructing it, they cannot help but include the details that make it specific: what they noticed, what they were uncertain about, what they decided and why, what happened next. These details are the raw material of the SKILL.md.

**Follow-up questions:** "What did you look for first?" "What told you this was going the right way?" "What would you have done differently if X had been the case instead?"

**Credit analyst example:** Asked to describe a recent credit assessment that went well, the analyst does not say "I evaluated the financials and checked the ratios." She says: "There was a mid-market manufacturing company applying for a term loan to fund a capacity expansion. The headline numbers were strong — DSCR above 2.0, LTV under 60%. But when I looked at the working capital cycle, I noticed the receivables days had been creeping up over three quarters while revenue was flat. That told me the revenue quality was weakening — they were extending payment terms to keep the topline steady. I flagged it, we restructured the covenant package to include a receivables concentration test, and the deal closed with tighter protections. Six months later, their largest customer went into administration. The covenant saved us."

That single account contains decision-making logic (look at working capital cycle, not just headline ratios), a specific pattern (receivables days increasing while revenue is flat signals revenue quality issues), and a protective action (restructure covenants to include a receivables concentration test). Each of those is a candidate SKILL.md Principle.

## Question 2: Tell Me About a Time This Work Went Wrong

Specifically: not because of bad luck, but because of a judgement call that turned out to be mistaken.

This question surfaces the failure modes that the expert has personally encountered and learned from. It is the single most valuable question in the interview because the knowledge it produces is the knowledge that is hardest to find anywhere else. Post-mortems in professional contexts are often sanitised; experts who have made costly mistakes rarely document them in forms that others can access. But in a one-to-one conversation conducted with appropriate professional trust, most experienced professionals will describe at least one instructive failure — and the lesson they drew from it is often the most precise piece of domain knowledge you will extract.

**Follow-up questions:** "At what point could the mistake have been caught?" "What would have had to be true for you to have made a different call?" "Is there a signal you now look for that you weren't looking for then?"

**Credit analyst example:** "Early in my career, I approved a facility for a property developer. The balance sheet was strong, the LTV was conservative, and the development had pre-sales. What I missed was that the pre-sales were conditional — the contracts had break clauses tied to planning permission for a second phase. When the second phase was refused, the pre-sales unwound, and the developer's cash position deteriorated faster than the financial model had projected. I now always read the underlying contracts on any pre-sale figure, not just the headline number. And when a revenue line depends on a condition outside the borrower's control, I stress-test the scenario where that condition fails."

The Principles this produces are specific and testable: "When revenue projections depend on pre-sales, verify whether the underlying contracts are conditional. When any revenue line depends on a condition outside the borrower's control, run a stress scenario where that condition fails." These are instructions that prevent a specific, real failure mode — not generic advice about being careful.

## Question 3: What Does a Junior Get Wrong That a Senior Never Does?

This question is the most efficient path to the gap between described and actual expertise. Every experienced professional can answer it immediately, because it is the knowledge they spend their career transmitting to the people who work for them. And because they are describing someone else's errors rather than their own, the defences that come up in Question 2 are lower.

The answers almost always follow a pattern: the junior professional applies the rule without reading the context, or reads the context without knowing which rules apply to it, or escalates too early because they lack confidence, or escalates too late because they lack humility.

**Follow-up questions:** "Can you give me a specific example?" "What does the senior professional see that the junior one doesn't?" "How long does it typically take someone to learn this, and why does it take that long?"

**Credit analyst example:** "The junior analyst flags every net debt increase as a concern. The senior analyst knows that a net debt increase in the context of a capital investment programme with contracted revenue is categorically different from a net debt increase driven by operating losses. The junior analyst treats a covenant breach as binary — breached or not. The senior analyst reads the covenant with the loan documentation in hand and asks whether the breach is technical or substantive, whether the remedy period has been used correctly, and whether the breach pattern suggests deterioration or an isolated event."

Each of those distinctions — context-dependent interpretation of net debt, technical vs substantive covenant breaches — is a SKILL.md Principle. They are the instructions that encode the expertise differential between a junior analyst who applies rules mechanically and a senior analyst who reads context.

## Question 4: Write a One-Page Decision Guide

If you had to write a one-page guide for this work — something that would help someone make the right call in ninety percent of situations — what would be on it?

This question asks the expert to compress their operational knowledge into transferable instructions. Most experts resist the framing initially — "it's more complicated than a one-pager can capture" — and they are correct. But the point of the question is not to produce the finished SKILL.md. It is to identify what the expert believes are the most load-bearing principles in their practice, because those are the instructions that need to appear in every version of the SKILL.md, however much else changes.

**Follow-up questions:** "What's the first thing on the page?" "What's the thing you'd most want to prevent someone from doing?" "Is there a heuristic you use that isn't in this guide because it's too hard to explain?"

That last follow-up is important. The knowledge that is too hard to explain is often the knowledge most worth encoding, and it requires more interview time to surface.

**Credit analyst example:** "First: always read the cashflow statement before the balance sheet. The balance sheet tells you what exists; the cashflow statement tells you what is happening. Second: never trust a revenue figure you cannot trace to a contract or a customer. Third: when the management narrative and the numbers tell different stories, trust the numbers. Fourth: if you cannot explain the credit risk in two sentences, you do not understand it well enough to approve it."

These four heuristics are load-bearing Principles. The first governs analytical sequence. The second governs source verification. The third governs conflict resolution between qualitative and quantitative information. The fourth is a self-test for decision readiness. All four translate directly into SKILL.md instructions.

## Question 5: What Should an Automated System Never Handle?

What are the situations where you would not trust an automated system to handle this — and why?

This question defines the human-in-the-loop requirements for the SKILL.md. Every domain has conditions under which autonomous agent operation is inappropriate: not because the technology is insufficient, but because the professional judgement required to handle those conditions correctly is genuinely irreplaceable.

The answers typically cluster into three categories.

| Category | What It Means | SKILL.md Output |
| --- | --- | --- |
| **Stakes too high** | The consequences of a systematic error are unacceptable at any rate | Explicit routing rules with thresholds |
| **Context too unusual** | Standard rules do not apply and the agent cannot know it does not know | Uncertainty recognition instructions |
| **Relationship is the service** | The human interaction is part of the professional value | Boundary conditions on delegation |

**Follow-up questions:** "What is the threshold where you would want a human involved regardless of the system's track record?" "Can you describe a situation where the context was so unusual that no standard procedure applied?"

**Credit analyst example:** "Any credit decision above £25 million goes to the senior credit committee regardless of how strong the analysis looks — the reputational risk of a single large default is too high to accept any systematic error rate. Any situation where the borrower has a relationship with a board member or senior executive gets routed to an independent reviewer — the conflict of interest makes automated analysis inappropriate. And any credit assessment where I encounter a fact pattern I genuinely have not seen before — a novel industry structure, a regulatory regime I am not familiar with — I flag it explicitly and bring in a specialist rather than applying a framework that may not fit."

These three answers produce three distinct types of SKILL.md escalation conditions: threshold-based routing (£25 million), relationship-based routing (conflict of interest), and uncertainty-based routing (novel fact patterns). All three are essential for a production-quality SKILL.md in this domain.

## How the Five Questions Map to the SKILL.md

The five questions are not random probes. Each one targets specific raw material for specific sections of the Agent Skills Pattern.

| Question | Primary Target | SKILL.md Section |
| --- | --- | --- |
| Q1: Recent success | Decision-making logic, analytical sequence | Principles (operational logic) |
| Q2: Instructive failure | Defensive knowledge, error prevention | Principles (what NOT to do) |
| Q3: Junior vs senior | Expertise differential, contextual judgement | Principles (nuanced distinctions) |
| Q4: One-page guide | Load-bearing heuristics, core operating rules | Principles (non-negotiable rules) |
| Q5: Automation boundaries | Escalation conditions, human-in-the-loop gates | Questions (out of scope) + Principles (routing logic) |

The Persona section draws from all five questions — the professional identity that emerges from the interview as a whole. But the Principles section is where the majority of the extraction material lands, because the Principles are where tacit knowledge becomes explicit instruction.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to practise the interview framework.

### Prompt 1: Self-Interview

```
I want to practise the Knowledge Extraction Method on myself.
I work as [YOUR ROLE] in [YOUR INDUSTRY].

Ask me the five extraction questions in sequence. For each question:
1. Ask the main question
2. Wait for my answer
3. Ask two follow-up questions based on what I actually said
   (not generic follow-ups)
4. After my follow-up answers, summarise the tacit knowledge
   that surfaced and identify which SKILL.md section it maps to

After all five questions, produce a "north star summary" — two
paragraphs describing the most important decision-making logic
and the most important escalation condition that emerged.
```

**What you're learning:** The five questions work on any domain, including your own. By experiencing them as the interviewee, you develop intuition for what rich answers feel like versus surface-level ones — which is essential preparation for conducting the interview with someone else. The north star summary at the end previews the synthesis technique taught in Lesson 3.

### Prompt 2: Question Design Analysis

```
Analyse why the five extraction questions are ordered the way they are.
For each question, explain:

1. What psychological state is the interviewee in at this point in
   the conversation?
2. Why does THIS question work better at this position than earlier
   or later?
3. What does the question's output provide that earlier questions
   have not yet surfaced?

Then identify what would go wrong if the questions were asked in
reverse order (5, 4, 3, 2, 1). What kind of extraction material
would you lose and why?
```

**What you're learning:** The question sequence is a designed progression, not an arbitrary list. Understanding the design logic helps you adapt the questions to domains where the standard sequence may need adjustment — for example, when an expert is most forthcoming about failures early in the conversation rather than after building trust through a success story.

### Prompt 3: Domain Adaptation

```
I need to adapt the five extraction questions for [SPECIFIC DOMAIN:
e.g., contract law, clinical nursing, software architecture,
management consulting].

For each of the five questions, generate:
1. The domain-adapted version (same intent, domain-specific framing)
2. Three domain-specific follow-up questions
3. A realistic example of what a senior professional in this domain
   might answer
4. The SKILL.md Principle that would emerge from that answer

Present the results as five blocks, one per question.
```

**What you're learning:** The five questions are a framework, not a script. Adapting them to a specific domain requires understanding their extraction purpose well enough to reformulate them without losing their effectiveness. This exercise also produces a working interview guide you can use in your own extraction work.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 3: Conducting the Expert Interview →](./03-conducting-the-expert-interview.md)
