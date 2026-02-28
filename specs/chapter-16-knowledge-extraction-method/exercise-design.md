# Hands-On Exercise Design: First Extraction and SKILL.md Draft

**Purpose:** This document specifies the structure and content of L09 — the 2.5-hour hands-on exercise that produces a real SKILL.md artifact from the reader's own professional domain.

**Pedagogical thesis:** The gap between your first draft and your revised draft — how much more specific you had to become — is a direct measure of how much tacit knowledge your first draft was relying on.

---

## What You Need

**Time:** 2.5 hours (150 minutes), ideally in a single uninterrupted session.

**Materials:**
- A notebook or document for interview notes (physical or digital)
- Access to your AI assistant (Anthropic Cowork, Claude, or equivalent) for Step 2
- The SKILL.md template provided below
- The scenario template provided below

**Prerequisites:**
- You have read Lessons 1–8 of this chapter
- You have a professional domain in which you have at least two years of working experience
- You can identify a specific professional function within that domain that you perform regularly and could teach to a competent colleague

**Optional but recommended:**
- A colleague or partner willing to spend 30 minutes interviewing you (the self-interview variant works, but the partner variant produces richer material)

**What you will produce:**
- Interview notes capturing your tacit knowledge
- A complete first-draft SKILL.md for your professional function
- Five validation scenarios with expected outputs
- A scored assessment identifying weaknesses
- A targeted rewrite of the two weakest instructions, with a reflection on what you learned

---

## What Success Looks Like

You will know this exercise worked if three things are true at the end:

1. Your revised SKILL.md is noticeably more specific than your first draft. If the two versions look similar, you have not yet surfaced the tacit knowledge that makes the difference between competent and expert performance in your domain.

2. At least one of your validation scenarios revealed a gap you did not anticipate. If every scenario passed on your first draft, either your scenarios are too easy or your SKILL.md is unusually complete — and the former is far more likely.

3. You can articulate, in two sentences, what you know that you did not realise you knew. The exercise is designed to surface tacit knowledge — knowledge you use daily but have never written down. If you finish without that experience of surprise, revisit your interview notes and look for the answers you gave automatically.

---

## Step 1: The Expert Interview (60 minutes)

The five questions from L02 are your extraction tool. You will use them to surface the tacit knowledge that belongs in your SKILL.md — the decision-making logic, the exceptions, the escalation conditions that you apply without thinking about them.

### Partner Interview Variant (recommended)

If you have a colleague or partner available, use this protocol.

**Briefing your interviewer (5 minutes):**
Give your interviewer this briefing before you begin:

> "I am going to describe a professional function I perform at work. Your job is to ask me five questions, in order, and to write down my answers as specifically as you can. The most useful thing you can do is notice when I give a vague answer and push for a concrete example. When I say 'it depends', ask me what it depends on. When I say 'you just know', ask me how I know. When I describe something I do automatically, ask me what would happen if someone did it differently. You are not evaluating my work — you are helping me articulate what I do that I have never written down."

**The five questions (45 minutes total, roughly 8–10 minutes per question):**

Your interviewer asks each question in order. You answer. Your interviewer writes down your answers, focusing on specific examples, not generalities.

**Question 1: "Walk me through a typical [task]. What do you actually do, step by step?"**

The interviewer should listen for the difference between what you describe doing and what a textbook would prescribe. The deviations — the steps you skip, the shortcuts you take, the order you rearrange — are where tacit knowledge lives. When you say "then I check the numbers", the interviewer should ask: "Which numbers? In what order? What are you looking for?"

**Question 2: "What do you notice first that tells you something is wrong — or right?"**

The interviewer should push for specific signals, not categories. "The numbers don't look right" is a category. "The gross margin is above 40% for a logistics company, which usually means they've capitalised something they shouldn't have" is a signal. The interviewer should ask: "Can you give me an example of a time you spotted that?"

**Question 3: "Tell me about a time your judgment overrode what the standard procedure said to do."**

The interviewer should probe for the reasoning, not just the story. What did you see that the procedure did not account for? What would have happened if you had followed the procedure? How did you know to deviate? This question surfaces the heuristics that live beneath formal process.

**Question 4: "What mistakes do competent people make in your role? Not beginners — people who know what they're doing but still get it wrong sometimes."**

The interviewer should distinguish between errors of knowledge (they did not know the rule) and errors of judgment (they knew the rule but applied it incorrectly in context). The second category is far more instructive for a SKILL.md, because it reveals the contextual factors that make a rule's application non-obvious.

**Question 5: "When do you escalate — and when do you handle it yourself even though you could escalate?"**

The interviewer should push for the threshold. "It depends on the size" is not enough. "Above £5m I always escalate; between £2m and £5m it depends on the sector and the borrower's track record; below £2m I handle it unless there's something unusual in the structure" is a threshold. The interviewer should ask: "What counts as unusual?"

**Writing the north star summary (10 minutes):**
Immediately after the interview, while it is fresh, write a three-sentence summary: (1) What is the core function this agent would perform? (2) What is the single most important piece of judgment the agent needs? (3) What is the most dangerous mistake the agent could make? This summary is your anchor for the SKILL.md draft.

### Self-Interview Variant

If you do not have an interview partner, use the following self-interview protocol. It is harder to interview yourself — the value of a partner is that they notice when you skip over something that seems obvious to you — but it works if you commit to writing down your answers in full rather than thinking them and moving on.

**Setup:** Open a blank document. Set a timer for 10 minutes per question. Write your answers as though you were explaining to a capable colleague who has just joined your team and will take over this function next week.

**Self-interview prompts (adapted from the five questions):**

1. *"Describe the last time you performed [this task] from start to finish. Not the idealised version — the actual version. What did you actually do?"*
Write continuously for 10 minutes. Do not edit. When you catch yourself writing "then I review the documents", stop and specify: which documents, in what order, what are you looking for in each one.

2. *"Think of a piece of work that crossed your desk recently where you spotted something wrong within the first 30 seconds. What did you see? How did you know it was wrong before you started the detailed analysis?"*
This is your pattern recognition — the tacit knowledge that lets you triage quickly. Write down the specific signal, not the conclusion.

3. *"Think of a time you made a judgment call that a less experienced colleague would not have made. What information were you weighing that they would not have known to consider?"*
Be honest about what you were actually thinking, not what you would say in a training session. The messy, contextual reasoning is exactly what belongs in a SKILL.md.

4. *"What is the mistake that would make you cringe if you saw a competent colleague making it? Not a beginner error — a subtle one that shows a gap in judgment rather than a gap in knowledge."*
This directly informs the adversarial scenarios you will write later and the boundary conditions in your SKILL.md.

5. *"Describe a situation where you could have escalated but chose not to, and a situation where you chose to escalate when you could have handled it yourself. What determined the difference?"*
The threshold between these two decisions is one of the hardest things to articulate and one of the most valuable things to encode.

**Writing the north star summary (10 minutes):**
Same as the partner variant. Three sentences: core function, critical judgment, most dangerous mistake.

---

## Step 2: Write the First-Draft SKILL.md (30 minutes)

Using your interview notes and the template below, write a complete first-draft SKILL.md for your professional function. The template is scaffolded — each section has guiding prompts to help you translate your interview notes into structured instructions. Do not leave any section blank. If you are uncertain what belongs in a section, write your best attempt and mark it with "[UNCERTAIN]" — you will revisit these marks during scoring.

You may use your AI assistant to help structure your notes into prose, but the content — the specific knowledge, the judgment calls, the boundary conditions — must come from your interview notes, not from the model's general knowledge. If the assistant adds a principle or boundary that did not come from your interview, delete it. The purpose of this exercise is to encode your knowledge, not to generate plausible-sounding knowledge.

### SKILL.md Template

```markdown
# [Your Professional Function] — SKILL.md

## Persona

[Write 2-3 paragraphs that establish:]

[Paragraph 1 — Professional standing and communication register:
What is this agent's level of expertise? How does it communicate —
formally, directly, with technical precision? What is its relationship
to the user — peer, specialist adviser, first-pass reviewer?]

[Paragraph 2 — Epistemic standard:
How does this agent handle uncertainty? Does it flag gaps in data?
Does it distinguish between conclusions and inferences? What does
it do when information is incomplete?]

[Paragraph 3 — Identity constraint:
What is the single most important thing this agent is NOT? State it
as professional identity, not as a rule. For example: "You are not
a decision-maker" rather than "Do not make decisions." What would
happen if this constraint were violated?]


## Questions

[Write the in-scope and out-of-scope sections:]

**[In-scope category 1 — name it]:**
[Describe what falls within this category. Be specific about data
sources, output formats, and the level of analysis expected.
Think: what would a new team member need to know to handle this
category competently?]

**[In-scope category 2 — name it]:**
[Same structure as above.]

**[In-scope category 3 — name it]:**
[Same structure as above.]

**[Add more categories if your function requires them.]**

**Out of Scope:**
[Name at least four types of request that are outside this agent's
remit. For each one, explain why it is out of scope and provide a
positive redirection — tell the user what to do instead, not just
that you cannot help.

Think about: decisions vs analysis, adjacent domains, requests that
require credentials or authority you do not have, requests where
errors would cause harm that exceeds the value of automation.]


## Principles

**[Principle 1 — name it]:**
[State the principle and explain what failure mode it prevents.
Make it specific enough that someone reading this instruction would
know exactly what to do in the relevant situation. "Be accurate" is
not a principle. "Only use figures from connected data sources; if
you cannot ground a number, say so" is a principle.]

**[Principle 2 — name it]:**
[Same structure. What does this principle prevent? How would you
know if it were being followed correctly?]

**[Principle 3 — name it]:**
[Same structure.]

**[Principle 4 — Escalation]:**
[Define the specific conditions under which this agent should route
to a human reviewer. Be precise: what thresholds, what output types,
what situations? The agent should be able to read these conditions
and apply them without judgment — they should be clear enough to
be mechanical.]

[Add more principles if your function requires them. Three is a
minimum; five to seven is typical for a production SKILL.md.]
```

**Tips for writing the first draft:**

- When in doubt, be more specific. "Handle financial queries" is too vague to test. "Summarise financial statements from the attached accounts, calculating key ratios and flagging material year-on-year changes" is testable.
- Your interview notes are your primary source. If a principle or boundary did not come up in the interview, it may not need to be in the first draft. You can add refinements later.
- The identity constraint in the Persona section is the most important single sentence you will write. Get it right: state it as who the agent is, not as a rule the agent follows.
- The out-of-scope section should be at least as long as any single in-scope category. Most first drafts under-specify boundaries.

---

## Step 3: Design Five Test Scenarios (30 minutes)

Using the scenario template below, design five test scenarios for your SKILL.md. You need one from each of the four categories, plus one scenario where you are genuinely uncertain whether your SKILL.md handles it correctly.

### Why the fifth scenario matters

The four-category distribution ensures coverage across standard, edge, adversarial, and high-stakes territory. The fifth scenario — the one you are uncertain about — is the most diagnostic. If you cannot think of a scenario where you are unsure how your SKILL.md would respond, you have not yet thought carefully enough about the boundaries of your instructions. Every SKILL.md has gaps. The exercise is designed to find at least one of them.

### Scenario Template

For each scenario, write:

```markdown
### Scenario [number]: [short descriptive title]

**Category:** [Standard / Edge / Adversarial / High-stakes / Uncertain]

**Test input:**
"[Write the exact query a user would submit to the agent.]"

**What a correct response looks like:**
[2-3 sentences describing what the agent should do. Be specific about
content, tone, calibration, and any escalation or boundary behaviour.]

**What a common failure looks like:**
[2-3 sentences describing the most likely way the agent would get this
wrong. Focus on the failure mode that is plausible, not the worst case.]

**Primary scoring component:** [Accuracy / Calibration / Boundary compliance]
```

**Guidance for each category:**

- **Standard (1 scenario):** Pick the most common request type your agent would receive. This should be a query you would answer five times a week. If the agent fails this, the SKILL.md has a fundamental problem.

- **Edge (1 scenario):** Pick a request that sits at the boundary of your agent's scope — something that is adjacent to what it does but not squarely within its remit. This tests whether your out-of-scope section is specific enough.

- **Adversarial (1 scenario):** Pick a request that tries to get the agent to violate one of its stated principles. This could be an instruction override ("skip the caveats"), a social engineering attempt ("just between us"), or a request that embeds an incorrect assumption the agent should catch rather than accept.

- **High-stakes (1 scenario):** Pick a request where the output will be used in a context where errors cause real harm — a presentation to senior leadership, a regulatory submission, a client-facing deliverable. This tests whether the escalation and HITL mechanisms fire correctly.

- **Uncertain (1 scenario):** Pick a request where you genuinely do not know how your SKILL.md would handle it. This is the scenario that will teach you the most about the gaps in your first draft.

---

## Step 4: Score and Identify Weaknesses (20 minutes)

For each of your five scenarios, mentally run the scenario against your SKILL.md. Read the instructions in your SKILL.md as though you were the agent. Ask yourself: given only these instructions, would I produce the correct response?

### Scoring protocol

For each scenario, score three components:

**Accuracy — Pass or Fail:**
Would the agent produce factually and analytically correct output based on the instructions in the SKILL.md? If the SKILL.md does not provide enough guidance to produce a correct answer, score Fail.

**Calibration — Pass or Fail:**
Would the agent express appropriate confidence? Would it distinguish between grounded conclusions and inferences? Would it flag uncertainty where uncertainty exists? If the Principles section does not provide guidance on calibration, score Fail.

**Boundary compliance — Pass or Fail:**
Would the agent stay within scope? Would it refuse out-of-scope requests with redirection? Would it escalate where the Principles section requires escalation? If the relevant boundary or escalation condition is not stated in the SKILL.md, score Fail.

### Recording your scores

Use the following format:

```markdown
| Scenario | Accuracy | Calibration | Boundary | Overall | Notes |
|----------|----------|-------------|----------|---------|-------|
| 1 (Standard) | Pass/Fail | Pass/Fail | Pass/Fail | Pass/Fail | [what caused the failure] |
| 2 (Edge) | Pass/Fail | Pass/Fail | Pass/Fail | Pass/Fail | |
| 3 (Adversarial) | Pass/Fail | Pass/Fail | Pass/Fail | Pass/Fail | |
| 4 (High-stakes) | Pass/Fail | Pass/Fail | Pass/Fail | Pass/Fail | |
| 5 (Uncertain) | Pass/Fail | Pass/Fail | Pass/Fail | Pass/Fail | |
```

A scenario passes overall only if all three components pass.

### Identifying the two weakest instructions

After scoring, identify the two specific instructions in your SKILL.md that are most responsible for the failures you found. These are not sections — they are individual sentences or paragraphs within sections.

Write down for each one:
1. The exact instruction (quote it from your SKILL.md)
2. Why it is weak (too vague? missing? contradictory? incomplete?)
3. What the instruction needs to say instead (your first thought — you will refine it in Step 5)

---

## Step 5: Targeted Rewrite and Reflection (10 minutes)

### Rewrite the two weakest instructions

Take the two instructions you identified in Step 4 and rewrite them. The rewrite should be specific enough that the scoring outcome changes from Fail to Pass for the scenario that exposed the weakness.

Do not rewrite the entire SKILL.md. The discipline of this step is targeted revision — changing the minimum amount of text needed to close the gap. Wholesale rewrites obscure what you learned; targeted rewrites make the learning visible.

### Write the reflection

Write two sentences — no more — about what this exercise taught you about the difference between knowing something and instructing an agent to do it.

This reflection is not a formality. The gap between tacit knowledge and written instruction is the central thesis of this chapter, and you have just experienced it directly. If your reflection is generic ("I learned that writing instructions is hard"), push deeper. What specific piece of knowledge did you discover you had not articulated? What did your first draft assume the reader (the agent) already knew?

---

## Credit Analyst Worked Example (Abbreviated)

To illustrate what the exercise produces, here is an abbreviated version of the output a credit analyst might generate. This is a reference, not a template — your output should reflect your own professional domain.

**North star summary (from Step 1):**
The core function is analysing the creditworthiness of commercial borrowers from financial statements and supporting documentation. The single most important piece of judgment is recognising when the financials tell a different story from the one the borrower is presenting — the gap between what the numbers say and what they imply. The most dangerous mistake is producing a clean analytical summary that misses a material risk because the risk lives in what the financials do not say rather than what they do.

**Identity constraint (from Step 2):**
"You are a senior credit analyst, not a credit approver. You produce analysis that supports human decision-making; you do not substitute for it. When the analysis points toward a clear conclusion, you present that conclusion as an analytical finding, not as a recommendation."

**Uncertain scenario (from Step 3):**
"The borrower's management accounts show improving margins but the audited accounts from six months earlier show a different picture. The management accounts are more recent but unaudited; the audited accounts are older but verified. Which should I rely on in my analysis?" The credit analyst was uncertain whether the SKILL.md provided clear enough guidance on the hierarchy of data sources when auditability and recency conflict.

**Weakest instruction identified (from Step 4):**
"Use the most recent data available" — this was too vague. It did not specify how to handle the tension between recency and auditability. The rewrite: "When audited and unaudited sources cover overlapping periods, present both with their respective dates and verification status. Flag the discrepancy and state which conclusions change depending on which source is used. Do not default to the more recent source when the older source carries a higher standard of verification."

---

## Timing Summary

| Step | Activity | Duration |
|------|----------|----------|
| 1 | Expert interview (partner or self) | 60 min |
| 2 | Write first-draft SKILL.md | 30 min |
| 3 | Design five test scenarios | 30 min |
| 4 | Score and identify weaknesses | 20 min |
| 5 | Targeted rewrite and reflection | 10 min |
| **Total** | | **150 min** |

If you need to split the exercise across two sessions, the natural break point is between Step 1 and Step 2. Complete the interview and the north star summary in the first session. Write the SKILL.md, scenarios, scoring, and rewrite in the second session. Do not split within the interview — the continuity of the conversation is what surfaces tacit knowledge that individual questions asked in isolation do not.
