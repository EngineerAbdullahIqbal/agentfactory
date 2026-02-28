---
sidebar_position: 3
title: "Conducting the Expert Interview"
description: "Learn how to brief the domain expert, take notes that capture specific rather than generic knowledge, follow the conversation where the expert's experience leads, and write the north star summary that anchors the first SKILL.md draft"
keywords:
  [
    "expert interview",
    "knowledge extraction",
    "briefing protocol",
    "note-taking",
    "north star summary",
    "Method A",
    "SKILL.md",
    "tacit knowledge",
    "interview technique",
    "credit analyst",
  ]
chapter: 16
lesson: 3
duration_minutes: 20

# HIDDEN SKILLS METADATA
skills:
  - name: "Brief a Domain Expert for Extraction"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Communication and Collaboration"
    measurable_at_this_level: "Student can describe the briefing protocol that shifts an expert from performance mode to collaborative mode, and explain why this shift matters for the quality of the extraction material"

  - name: "Capture Specific Rather Than Generic Knowledge"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can distinguish between a specific statement that translates into a SKILL.md Principle and a generic statement that does not, and can construct follow-up questions that move the conversation from generic to specific"

  - name: "Write a North Star Summary"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Content Creation"
    measurable_at_this_level: "Student can write a two-paragraph summary from interview notes that captures the most important decision-making logic and escalation condition, and can use this summary as a quality check against the first-draft SKILL.md"

learning_objectives:
  - objective: "Describe the briefing protocol that prepares a domain expert for a knowledge extraction interview and explain why framing matters for extraction quality"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student can list the three elements of an effective briefing (purpose, output, process) and explain how each shifts the expert's orientation from performance to collaboration"

  - objective: "Distinguish between specific and generic interview material and construct follow-up questions that surface actionable SKILL.md content"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a generic expert statement, student can explain why it does not translate into a useful SKILL.md instruction and propose a follow-up question that would elicit the specific version"

  - objective: "Write a north star summary from interview notes and use it to validate the first-draft SKILL.md"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a set of interview notes, student can produce a two-paragraph summary that captures the core decision-making logic and the key escalation condition, and can explain how to use it as a quality check"

cognitive_load:
  new_concepts: 3
  concepts_list:
    - "Briefing protocol (shifting from performance mode to collaborative mode)"
    - "Note-taking discipline (specific statements vs generic statements)"
    - "North star summary (the anchor for the first SKILL.md draft)"
  assessment: "3 concepts at B1 level — well within the 7-10 cognitive limit for this tier. Students have already internalised the five questions; this lesson teaches the practical execution that surrounds them."

differentiation:
  extension_for_advanced: "Record yourself answering the five questions from Lesson 2 about your own domain. Transcribe the recording and highlight every statement that is specific enough to be a SKILL.md Principle versus every statement that is too generic. Calculate the ratio. In a well-conducted interview, specific statements should outnumber generic ones by at least 3:1."
  remedial_for_struggling: "Focus on the generic-vs-specific distinction. Take this statement: 'We always prioritise risk management.' Rewrite it as a specific instruction that an agent could follow. If you can do that transformation, you understand the core note-taking skill this lesson teaches."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Interview Execution"
  key_points:
    - "The briefing shifts the expert from performance mode (presenting credentials) to collaborative mode (building something they want to use) — this shift determines extraction quality"
    - "Generic statements are not extraction failures — they are signals that a follow-up question is needed to reach the specific knowledge underneath"
    - "The north star summary is not a transcript summary; it is a two-paragraph distillation of the most important decision-making logic and escalation condition — this becomes the quality check for the SKILL.md"
    - "Allow the conversation to follow the expert's experience rather than rigidly maintaining question sequence — coverage matters, not sequence"
  misconceptions:
    - "Students may think the interview requires transcription — it does not; what matters is capturing specific examples, failure modes, and heuristics"
    - "Students may confuse the north star summary with a meeting recap — it is a synthesis of the two most important extraction outcomes, not a chronological account"
    - "Students may think a sixty-minute interview is too short — a well-structured interview with the five questions produces more actionable material than an unstructured three-hour conversation"
  discussion_prompts:
    - "Think of a time someone interviewed you about your expertise — for a job, a case study, a training programme. Did they capture what you actually do, or the official version of what you do?"
    - "What would change about the interview if the expert knows the output will be a deployed agent they get to test, versus a document they will never see again?"
  teaching_tips:
    - "The generic-vs-specific table is the most practical teaching artefact in this lesson — use it as a reference throughout the exercise in Lesson 9"
    - "Emphasise that the north star summary should be written immediately after the interview, not days later — the synthesis quality degrades rapidly with time"
  assessment_checks:
    - question: "What are the three elements of an effective expert briefing?"
      expected_response: "Explain the purpose (building a SKILL.md that encodes their expertise), describe the output (a deployable agent they will test and refine), and set the expectation (the interview is the starting point of a process, not the end). This framing shifts the expert from performance mode to collaborative mode."
    - question: "What is the difference between a generic statement and a specific statement in interview notes?"
      expected_response: "A generic statement — 'we always prioritise risk management' — cannot be translated into a testable SKILL.md instruction. A specific statement — 'when the earnings release date is within ninety days of the credit decision, we run a sensitivity against the worst-case earnings scenario rather than the base case' — translates directly into a Principle."
    - question: "What is the north star summary and when should it be written?"
      expected_response: "A two-paragraph summary written immediately after the interview. The first paragraph captures the most important decision-making logic surfaced. The second captures the most important escalation condition. It serves as the quality check for the first-draft SKILL.md — if the SKILL.md does not encode the substance of the summary, something has been lost in the translation."
---

# Conducting the Expert Interview

The five questions from Lesson 2 are the framework. This lesson teaches the execution: how to brief the expert so the interview produces operational knowledge rather than performed expertise, how to take notes that capture specific rather than generic material, how to follow the conversation where the expert's experience leads, and how to write the north star summary that anchors the first SKILL.md draft.

A single interview of sixty to ninety minutes, conducted well, produces enough material to write a substantive first-draft SKILL.md. Conducted poorly — with a defensive expert, unfocused notes, and no immediate synthesis — the same ninety minutes produces a transcript of general statements that are too vague to become agent instructions. The difference is not the expert's knowledge. It is the extraction technique.

This lesson is practical. By the end of it, you should be able to sit down with a domain expert — or with yourself, as your own first test subject — and conduct an extraction interview that produces the raw material for a SKILL.md that encodes something worth encoding.

## Briefing the Expert

The interview works best when the expert knows in advance what it is for. Brief them on the Knowledge Extraction Method before you begin. The briefing has three elements, and each one shifts the expert's orientation in a way that improves the quality of the material they produce.

**Explain the purpose.** You are building a SKILL.md that encodes their domain expertise. This is not a competency assessment, not a process documentation exercise, and not a performance review. It is a collaborative effort to capture the professional judgement that makes their work valuable — the knowledge that their junior colleagues are trying to absorb and that no manual currently documents.

**Describe the output.** The output will be a deployable agent they will have the opportunity to test and refine. This matters because it shifts the expert's motivation from "help the interviewer understand my job" to "help build something I want to work." Experts who understand the output invest more effort in specificity because they can see how vague answers will produce a vague agent.

**Set the process expectation.** The interview is the starting point of a process, not the end of one. The first-draft SKILL.md will be tested against scenarios, and the expert will review the results and refine the instructions. This framing reduces the pressure to get everything perfect in a single conversation — which paradoxically makes the expert more willing to share uncertain or provisional knowledge rather than limiting themselves to what they are certain about.

The briefing matters because it determines which version of the expert's knowledge you access. Without it, the expert defaults to performance mode — presenting their expertise as they would in a job interview, an industry panel, or a training presentation. Performance mode produces the official narrative: polished, accurate at the headline level, and missing the operational specificity that a SKILL.md needs. With the briefing, the expert enters collaborative mode — helping you build something they want to work. Collaborative mode produces operational knowledge: the specific examples, the failure patterns, the heuristics that exist below the official narrative.

## Taking Notes That Matter

The goal during the interview is not to transcribe every word. It is to capture the specific examples, the specific failure modes, and the specific heuristics that appear in answers to the five questions. The distinction between specific and generic material is the most important note-taking skill in the extraction process.

| What You Hear | Type | What To Do |
| --- | --- | --- |
| "We always prioritise risk management" | Generic | Follow up: "Can you give me a recent example where risk management changed what you actually did?" |
| "When the earnings release date is within ninety days, we run worst-case sensitivity rather than base case" | Specific | Capture verbatim — this is a candidate SKILL.md Principle |
| "Experience matters a lot in this work" | Generic | Follow up: "What does experience let you see that someone without it misses? Can you give me an example?" |
| "I look for the gap between what the management says about working capital and what the cashflow statement shows" | Specific | Capture verbatim — this is decision-making logic |
| "It depends on the situation" | Generic (but promising) | Follow up: "Walk me through two situations where it went differently. What was different about the context?" |

The pattern is consistent. Generic statements are not failures — they are signals that a follow-up question is needed. Underneath every generic statement is a specific one. "We always prioritise risk management" becomes "when earnings are within ninety days, we run worst-case sensitivity." The follow-up question is what makes the transition happen.

Record the interview if the expert agrees and if you have a practical transcription mechanism available. But do not rely on the recording as a substitute for real-time note-taking. The act of capturing specific statements in the moment forces you to listen for specificity, which in turn shapes the follow-up questions you ask. Interviewers who rely on recordings tend to ask fewer follow-up questions because they assume they can extract the detail later — and the detail is often not there because it was never surfaced.

## Following the Conversation

The five questions are a framework, not a script. Allow the conversation to go where the expert's experience takes it. If Question 2 produces a long and detailed answer that covers material relevant to Questions 3 and 4, follow it rather than interrupting to keep to the sequence. The sequence is designed to ensure coverage, not to impose a rigid structure.

The coverage check comes at the end of the interview, not during it. After the expert has finished responding to the fifth question — or after the natural conclusion of the conversation, whichever comes first — review your notes against the five-question framework and identify any areas that were not covered. If Question 3 was only lightly touched because Questions 2 and 4 absorbed the material, that is fine. If Question 5 was never addressed and the automation boundaries are missing from your notes, ask it before the conversation ends.

There is one conversational discipline that matters more than maintaining the question sequence: redirecting from general to specific. When the expert moves from a specific account to a general principle — "and that is why we always check the covenant documentation before making a credit decision" — acknowledge the principle and then redirect back to the specific: "Can you give me an example where checking the covenant documentation changed your assessment? What would have happened if you had not checked it?"

The redirect is gentle and consistent. You are not challenging the expert's general statements. You are using them as springboards to reach the specific knowledge that sits underneath.

## The North Star Summary

After the interview, before you begin writing the SKILL.md, write a two-paragraph summary of what you learned. Do this immediately — within thirty minutes of the interview ending, while the specific details are still fresh. The quality of this synthesis degrades rapidly with time. A summary written the next day is noticeably less precise than one written within the hour.

**The first paragraph** captures the most important decision-making logic the interview surfaced. What is the core analytical process the expert applies? What are the key signals they look for? What is the sequence in which they evaluate information?

**The second paragraph** captures the most important escalation condition the interview identified. What are the situations where human judgement is genuinely irreplaceable? Where are the boundaries of what the agent should handle autonomously?

**Credit analyst north star summary example:**

*The most important decision-making logic this interview surfaced is the analyst's practice of reading cashflow statements before balance sheets and checking revenue quality through working capital cycle analysis rather than trusting headline figures. When receivables days increase while revenue is flat, the analyst treats revenue as weakening regardless of what the income statement shows. Contracts underlying pre-sale figures are read for conditionality rather than taken at face value. When the management narrative and the financial data diverge, the analyst trusts the data.*

*The critical escalation condition is a three-part boundary. Credit decisions above £25 million go to the senior committee regardless of analysis quality. Assessments involving borrowers connected to board members or senior executives are routed to an independent reviewer. Any fact pattern the analyst has not previously encountered — a novel industry structure, an unfamiliar regulatory regime — is flagged and referred to a specialist rather than assessed using a framework that may not apply.*

This summary is your north star for the first draft. If the SKILL.md you write does not clearly encode the substance of both paragraphs, something has been lost in the translation from interview to instructions. Every revision of the SKILL.md should be checked against it.

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to practise the interview execution skills.

### Prompt 1: Briefing Rehearsal

```
I need to brief a domain expert before conducting a knowledge extraction
interview. The expert is a [ROLE, e.g., senior compliance officer,
lead architect, clinical nurse specialist] who has agreed to a
sixty-minute interview.

Help me prepare the briefing. For each of the three briefing elements
(purpose, output, process), draft the specific language I would use,
adapted to this expert's likely concerns and professional context.

Then identify the three most likely ways this expert might default to
performance mode rather than collaborative mode, and suggest a redirect
for each.
```

**What you're learning:** Briefing is a skill that adapts to context. A compliance officer has different concerns about the interview process than an architect or a clinician. Practising the briefing language for a specific role builds the adaptive communication skill you need to conduct effective extraction interviews across professional domains.

### Prompt 2: Generic-to-Specific Transformation

```
Here are five generic statements a domain expert might make during an
interview. For each one, generate:

1. The specific follow-up question that would surface the operational
   knowledge underneath
2. A realistic example of what the expert might say in response
3. The SKILL.md Principle that would emerge from the specific response

Generic statements:
- "We always double-check the numbers"
- "Client relationships are really important"
- "You develop a sense for what looks right"
- "We follow the regulatory framework closely"
- "Experience teaches you what to watch out for"
```

**What you're learning:** The ability to transform generic statements into specific SKILL.md Principles is the core note-taking skill in knowledge extraction. Every generic statement contains a specific one — the follow-up question is what surfaces it. This exercise trains you to recognise generic language instantly and respond with the question that produces actionable material.

### Prompt 3: North Star Summary Practice

```
I am going to share a set of interview notes from a knowledge extraction
session with [DOMAIN EXPERT ROLE]. After I paste the notes, help me
write the north star summary.

The summary must be exactly two paragraphs:
- Paragraph 1: The most important decision-making logic surfaced
- Paragraph 2: The most important escalation condition identified

After writing the summary, assess it: Is the decision-making logic
specific enough to produce SKILL.md Principles? Is the escalation
condition specific enough to produce routing rules? If either is
too vague, identify what follow-up questions I should have asked
during the interview.

[Paste your own interview notes or use the credit analyst examples
from Lessons 2 and 3 as practice material.]
```

**What you're learning:** The north star summary is the bridge between the interview and the SKILL.md. Writing it well requires distinguishing the most important extraction material from the rest — a judgement that improves with practice. Assessing your own summary's specificity also trains you to evaluate whether your interview produced enough actionable material or whether a follow-up session is needed.

## Flashcards Study Aid

<Flashcards />

---

Continue to [Lesson 4: The Document Extraction Framework →](./04-the-document-extraction-framework.md)
