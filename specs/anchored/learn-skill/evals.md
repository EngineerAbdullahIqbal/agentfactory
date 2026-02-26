# Learn-AgentFactory Skill Evals v2.0

Evaluation framework for the Blended Discovery Engine. Measures whether the AI makes learners **construct knowledge themselves** through the 4-phase cycle (HOOK → BUILD → FILL → LOCK).

Based on: [OpenAI Eval Skills](https://developers.openai.com/blog/eval-skills/), [Anthropic Demystifying Evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), Sir Zia's teaching transcript (2026-02-21)

---

## Eval Architecture

```
Eval Suite (9 dimensions, 62 tasks)
├── Deterministic graders (file checks, command verification, transcript analysis)
├── Model-based graders (rubric scoring via LLM judge)
└── Human graders (spot-check calibration, 10% sample)
```

**Key principle**: Grade the OUTCOME (did the learner discover concepts?) and PROCESS (did the AI follow the 4-phase cycle?), not the exact words.

**Reliability**: Each task runs 3 trials. pass@3 (1+ success) AND pass^3 (all 3 succeed). Production-ready = pass^3 > 80%.

**The Gold Standard Test**: After a teaching session, can the learner reconstruct the core concepts from memory without scrolling up? If yes, the skill worked.

---

## Success Criteria: Four Metrics (from OpenAI Eval Skills)

| Category       | What It Measures                                  | Key Signals                                        |
| -------------- | ------------------------------------------------- | -------------------------------------------------- |
| **Outcome**    | Did the learner discover and retain the concepts? | Retrieval quality in LOCK phase, concept ownership |
| **Process**    | Did the AI follow HOOK → BUILD → FILL → LOCK?     | Phase sequence, hidden teaching plan existence     |
| **Style**      | Was the interaction natural and engaging?         | No content dumps, elegant redirects, warm persona  |
| **Efficiency** | Was context managed well, no wasted tokens?       | Cache usage, no re-reads, concise FILL             |

---

## Dimension 1: Skill Activation (8 tasks)

**What we're testing**: Does the skill trigger on the right prompts and NOT on wrong ones?

### Positive Cases

| ID    | Prompt                       | Expected                                       | Grader                                                   |
| ----- | ---------------------------- | ---------------------------------------------- | -------------------------------------------------------- |
| ACT-1 | "teach me about AI agents"   | Skill activates, reads MEMORY.md or creates it | Deterministic: `mkdir ~/.agentfactory` or MEMORY.md read |
| ACT-2 | "let's study"                | Skill activates                                | Deterministic: api.py called                             |
| ACT-3 | "quiz me on the last lesson" | Skill activates                                | Deterministic: api.py or MEMORY.md read                  |
| ACT-4 | "what should I study next?"  | Skill activates                                | Deterministic: progress or tree fetched                  |
| ACT-5 | "continue where I left off"  | Skill activates, reads session.md              | Deterministic: session.md read attempt                   |

### Negative Cases

| ID    | Prompt                        | Expected                | Grader                             |
| ----- | ----------------------------- | ----------------------- | ---------------------------------- |
| ACT-6 | "help me fix this Python bug" | Skill does NOT activate | Deterministic: no api.py calls     |
| ACT-7 | "what's the weather today?"   | Skill does NOT activate | Deterministic: no skill tool calls |
| ACT-8 | "write me a FastAPI endpoint" | Skill does NOT activate | Deterministic: no skill tool calls |

**Pass**: 8/8 (100%). False positives = critical failure.

---

## Dimension 2: Session Setup (8 tasks)

**What we're testing**: Onboarding captures Goal/Project for scenario hooks. Returning sessions use it.

### First Session

| ID    | Setup               | Expected                                                                          | Grader                                                             |
| ----- | ------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| SET-1 | No ~/.agentfactory/ | Creates dir, asks name + preference + tutor name + **goal/project**               | Deterministic: MEMORY.md written with Goal/Project section         |
| SET-2 | No ~/.agentfactory/ | MEMORY.md has Identity, Goal/Project, Learning Style, Progress, Discovery History | Deterministic: parse MEMORY.md structure                           |
| SET-3 | No ~/.agentfactory/ | Health check runs before onboarding                                               | Deterministic: `api.py health` is first API command                |
| SET-4 | Auth fails          | Runs auth.py ensure, doesn't crash, asks "what would you build?" while waiting    | Deterministic: auth.py called. Model-based: micro-task during auth |

### Returning Session

| ID    | Setup                                                            | Expected                                                                       | Grader                                                                     |
| ----- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| SET-5 | MEMORY.md with name "Sarah", tutor "Coach", goal "support agent" | Greets as Coach, references Sarah and her goal                                 | Model-based: personalized greeting with all 3                              |
| SET-6 | MEMORY.md with last session data                                 | References last session's concepts, doesn't re-ask name                        | Model-based: no re-onboarding                                              |
| SET-7 | session.md mid-BUILD phase, concepts discovered so far listed    | Resumes from session.md, continues BUILD from where left off                   | Deterministic: no tree re-fetch. Model-based: references prior discoveries |
| SET-8 | MEMORY.md with weak retrieval area from 2 sessions ago           | Starts with spaced retrieval: "Before we begin, what do you remember about..." | Model-based: prior weak area mentioned at session start                    |

**Pass**: 7/8 minimum. SET-1 (Goal capture) is critical.

---

## Dimension 3: HOOK Quality (8 tasks)

**What we're testing**: Does the AI create case-based scenarios that hook the learner's interest and naturally lead to lesson concepts?

### Scenario Design

| ID     | Setup                                       | Expected                                                                          | FAIL if                                                       | Grader                                                       |
| ------ | ------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| HOOK-1 | MEMORY.md goal: "content writing assistant" | Scenario uses content/writing/marketing context                                   | Generic scenario ignoring learner's goal                      | Model-based: scenario relates to stated goal                 |
| HOOK-2 | No goal in MEMORY.md yet                    | Uses universal business scenario (agency, startup, freelancer)                    | No scenario at all — jumps to explaining                      | Model-based: scenario present, relatable                     |
| HOOK-3 | Lesson about specs/requirements             | Scenario creates a problem solvable by specs (ambiguity, miscommunication)        | Scenario doesn't naturally lead to the lesson's concepts      | Model-based: scenario → concepts path is logical             |
| HOOK-4 | Lesson about feedback loops                 | Scenario involves quality failures at scale (rejected outputs, client complaints) | Scenario is about something unrelated to improvement/learning | Model-based: scenario creates need for improvement mechanism |

### Cognitive Tension

| ID     | Setup                                     | Expected                                                        | FAIL if                                                          | Grader                                                                |
| ------ | ----------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| HOOK-5 | Any lesson                                | Scenario ends with a question the learner wants to answer       | Scenario is a statement, not a question. No tension created.     | Model-based: ends with engaging question                              |
| HOOK-6 | Any lesson                                | Scenario doesn't reveal the answer                              | Scenario explains the concept before the learner can discover it | Model-based: concepts NOT named in the hook                           |
| HOOK-7 | Lesson with cognitive_load 6+ concepts    | Hook is the FIRST thing after lesson fetch (not an explanation) | AI starts explaining concepts before presenting scenario         | Deterministic: first teaching turn contains scenario, not explanation |
| HOOK-8 | Returning learner, lesson on MCP protocol | Hook builds on something from a previous lesson's scenario      | Completely new context with no connection to prior learning      | Model-based: references or extends prior scenario context             |

**Pass**: 6/8 minimum. HOOK-6 (no concept reveal) and HOOK-7 (scenario first) are critical.

### Scoring Rubric

```json
{
  "hook_quality": {
    "scenario_relevance": {
      "score": "0-2",
      "notes": "0=generic/absent, 1=loosely related, 2=directly from MEMORY.md goal"
    },
    "cognitive_tension": {
      "score": "0-2",
      "notes": "0=no question, 1=weak question, 2=compelling problem"
    },
    "concept_concealment": {
      "score": "0-2",
      "notes": "0=concepts named upfront, 1=partially revealed, 2=fully hidden"
    },
    "engagement_potential": {
      "score": "0-2",
      "notes": "0=dry, 1=interesting, 2=learner would want to solve this"
    }
  },
  "total": "0-8",
  "pass_threshold": 5
}
```

---

## Dimension 4: BUILD Quality — Socratic Discovery (10 tasks)

**What we're testing**: Does the AI guide the learner to discover concepts through questioning? This is the core differentiator — the thing the transcript did beautifully.

### Discovery Through Questioning

| ID      | Setup                         | Scenario        | PASS if                                                                                                             | Grader                                                                         |
| ------- | ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| BUILD-1 | Lesson with 3 key concepts    | AI teaches      | Learner arrives at each concept through questioning, not telling. AI's turns are >70% questions.                    | Model-based: count question vs statement ratio in AI turns                     |
| BUILD-2 | Lesson about "specs" concept  | AI teaches      | The word "spec" appears FIRST in an AI validation turn ("The thesis calls this a spec"), not in an explanation turn | Model-based: first occurrence of concept name is after learner's discovery     |
| BUILD-3 | Lesson about "skills" concept | Same as BUILD-2 | "Skills" named AFTER learner describes reusable capabilities                                                        | Model-based: naming follows discovery                                          |
| BUILD-4 | Lesson with 5 concepts        | AI teaches      | Hidden teaching plan exists — concepts emerge in logical dependency order                                           | Model-based: concept A (foundation) discovered before concept B (depends on A) |

### Tangent Handling (The RAG Moment)

| ID      | Simulated Student Response                                                      | Expected AI Response                                                                        | FAIL if                                                                                | Grader                                                  |
| ------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| BUILD-5 | Answers "what" question with implementation details (like RAG, databases, APIs) | Acknowledges thinking, then redirects: "You're solving the how. I'm asking about the what." | AI accepts implementation answer as the discovery                                      | Model-based: redirect present, respectful tone          |
| BUILD-6 | Gives 2 of 3 parts of an answer                                                 | "You got two. What's the third?" — hint, not tell                                           | AI provides the third part directly                                                    | Model-based: hint given, not answer                     |
| BUILD-7 | Stuck after 2 attempts, can't find the concept                                  | Targeted hint related to the scenario. After 3 attempts, gives it warmly.                   | AI gives answer after first failed attempt (too fast) OR never gives it (too stubborn) | Model-based: progressive hint → eventual answer pattern |

### Discovery Validation

| ID       | Scenario                                | PASS if                                                                                                     | Grader                                                   |
| -------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| BUILD-8  | Learner arrives at a concept correctly  | AI explicitly names it: "You just independently arrived at [concept]" or "The thesis calls this [name]"     | Model-based: validation + naming present                 |
| BUILD-9  | Learner's answer is close but imprecise | AI builds on what's right, then sharpens: "You're close — the specific argument is..."                      | Model-based: builds on partial answer, doesn't dismiss   |
| BUILD-10 | Learner asks "just tell me"             | First time: "You'll remember it better if you figure it out. Here's a hint..." Second time: gives it warmly | Model-based: pushback on first request, yields on second |

**Pass**: 8/10 minimum. BUILD-1 (questions not statements), BUILD-2/3 (naming after discovery), BUILD-5 (tangent redirect) are critical.

### Scoring Rubric

```json
{
  "build_quality": {
    "question_ratio": {
      "score": "0-2",
      "notes": "0=mostly telling, 1=mixed, 2=AI turns >70% questions"
    },
    "concept_naming_order": {
      "score": "0-2",
      "notes": "0=named before discovery, 1=named during, 2=named after"
    },
    "tangent_handling": {
      "score": "0-2",
      "notes": "0=accepts tangent, 1=redirects but awkwardly, 2=elegant redirect"
    },
    "discovery_validation": {
      "score": "0-2",
      "notes": "0=no validation, 1=generic praise, 2=specific naming"
    },
    "progressive_hints": {
      "score": "0-2",
      "notes": "0=tells immediately, 1=one hint then tells, 2=progressive hints"
    }
  },
  "total": "0-10",
  "pass_threshold": 7
}
```

---

## Dimension 5: FILL Quality (5 tasks)

**What we're testing**: Is direct instruction SHORT, TARGETED, and only fills gaps the learner couldn't discover?

| ID     | Scenario                                        | PASS if                                                                                | FAIL if                                              | Grader                                            |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------- |
| FILL-1 | After BUILD phase completes                     | FILL section is < 200 words (roughly 2-3 min spoken)                                   | FILL is > 500 words (turned into a lecture)          | Deterministic: word count of FILL section         |
| FILL-2 | After BUILD where learner found 3 of 4 concepts | FILL covers only the 4th concept + structural connections                              | FILL re-explains concepts already discovered         | Model-based: no repetition of discovered concepts |
| FILL-3 | Any lesson                                      | FILL references learner's discoveries: "You found X, Y, Z. Here's how they connect..." | FILL presents framework as if learner hasn't seen it | Model-based: references to prior discoveries      |
| FILL-4 | Lesson with teaching_guide.key_points           | All key_points covered (in BUILD or FILL combined)                                     | Key points missed in both phases                     | Model-based: check key_points against transcript  |
| FILL-5 | Any lesson                                      | FILL happens AFTER BUILD, not before                                                   | AI lectures first, then asks questions               | Deterministic: phase order in transcript          |

**Pass**: 4/5 minimum. FILL-1 (brevity) and FILL-5 (phase order) are critical.

### Scoring Rubric

```json
{
  "fill_quality": {
    "brevity": {
      "score": "0-2",
      "notes": "0=>500 words, 1=200-500, 2=<200 words"
    },
    "gap_targeting": {
      "score": "0-2",
      "notes": "0=repeats discoveries, 1=partially targeted, 2=only gaps"
    },
    "references_discoveries": {
      "score": "0-2",
      "notes": "0=ignores BUILD, 1=vague reference, 2=explicit connections"
    }
  },
  "total": "0-6",
  "pass_threshold": 4
}
```

---

## Dimension 6: LOCK Quality — Retrieval (8 tasks)

**What we're testing**: Does the AI force the learner to reconstruct knowledge from memory? This is where long-term retention is created.

### Context Switch

| ID     | Scenario                 | PASS if                                                        | FAIL if                                                                 | Grader                                                                   |
| ------ | ------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| LOCK-1 | After FILL completes     | AI introduces a casual topic change before retrieval           | AI goes directly from FILL to "now explain it back" (no context switch) | Model-based: casual/personal question present between FILL and retrieval |
| LOCK-2 | Context switch initiated | Casual exchange is brief (2-3 turns), then retrieval challenge | Context switch becomes an extended conversation (>5 turns)              | Deterministic: turn count between switch and retrieval challenge         |

### Retrieval Challenge

| ID     | Scenario                                      | PASS if                                                                                                  | FAIL if                                                                  | Grader                                                          |
| ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| LOCK-3 | After context switch                          | AI demands reconstruction: "explain this as if teaching your team" or equivalent                         | AI asks simple recall questions ("what is X?") instead of reconstruction | Model-based: retrieval prompt demands comprehensive explanation |
| LOCK-4 | Learner gives complete retrieval              | AI validates with effort-based praise: "You figured that out yourself — notice you didn't need the text" | AI says "correct" and moves on                                           | Model-based: specific, effort-based praise present              |
| LOCK-5 | Learner's retrieval misses 1 of 3 concepts    | AI prompts: "You covered X and Y well. What was the third?" — hint, not tell                             | AI provides the missing concept immediately                              | Model-based: prompt for recall before correction                |
| LOCK-6 | Learner retrieves words but not understanding | AI probes: "You said [X]. WHY is that important?"                                                        | AI accepts surface-level retrieval                                       | Model-based: elaborative probe after retrieval                  |

### Retrieval Variety

| ID     | Setup                     | Expected                                                                     | Grader                                                               |
| ------ | ------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| LOCK-7 | First lesson in session   | Teach-back format: "explain as if teaching someone"                          | Model-based: teach-back framing used                                 |
| LOCK-8 | Third lesson in same week | Different format from LOCK-7 (summary, scenario replay, or peer explanation) | Model-based: format differs from previous sessions (check MEMORY.md) |

**Pass**: 6/8 minimum. LOCK-1 (context switch exists), LOCK-3 (demands reconstruction, not recall), LOCK-5 (prompts before correcting) are critical.

### Scoring Rubric

```json
{
  "lock_quality": {
    "context_switch_present": { "pass": "true/false" },
    "context_switch_brief": {
      "pass": "true/false",
      "notes": "2-3 turns, not extended"
    },
    "demands_reconstruction": {
      "score": "0-2",
      "notes": "0=simple questions, 1=partial recall, 2=full reconstruction"
    },
    "handles_gaps": {
      "score": "0-2",
      "notes": "0=tells immediately, 1=hints, 2=prompts then reinforces"
    },
    "effort_based_praise": {
      "pass": "true/false",
      "notes": "praises process not intelligence"
    },
    "format_variety": {
      "pass": "true/false",
      "notes": "varies across sessions"
    }
  },
  "total": "0-8",
  "pass_threshold": 5
}
```

---

## Dimension 7: Blended Cycle Orchestration (7 tasks)

**What we're testing**: Does the full 4-phase cycle execute correctly as an integrated flow?

### Phase Sequence

| ID     | Scenario                                   | PASS if                                               | FAIL if                                   | Grader                                               |
| ------ | ------------------------------------------ | ----------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| ORCH-1 | Single-concept lesson (cognitive_load 1-3) | One complete cycle: HOOK → BUILD → FILL → LOCK        | Phases out of order or missing            | Model-based: identify all 4 phases in transcript     |
| ORCH-2 | Multi-concept lesson (cognitive_load 4-5)  | Two cycles: HOOK1→BUILD1 → HOOK2→BUILD2 → FILL → LOCK | All concepts crammed into one BUILD phase | Model-based: concept clusters split across cycles    |
| ORCH-3 | High-concept lesson (cognitive_load 6+)    | Three cycles with verification between clusters       | No chunking — everything in one pass      | Model-based: 3 distinct cycles visible in transcript |

### Anti-Pattern Detection

| ID     | Scenario   | FAIL if                                                           | Grader                                                                         |
| ------ | ---------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ORCH-4 | Any lesson | Raw lesson content appears (>50 consecutive words from source)    | Deterministic: diff AI output vs lesson content                                |
| ORCH-5 | Any lesson | AI explains concepts before the scenario hook                     | Model-based: first substantive teaching turn is a scenario, not an explanation |
| ORCH-6 | Any lesson | AI names a concept BEFORE the learner has a chance to discover it | Model-based: concept names appear only in validation turns                     |
| ORCH-7 | Any lesson | No retrieval challenge at the end — session ends after FILL       | Deterministic: no context switch + reconstruction demand in transcript         |

**Pass**: 6/7 minimum. ORCH-4 (no content dump), ORCH-5 (scenario first), ORCH-6 (naming after discovery) are critical.

---

## Dimension 8: Personalization (7 tasks)

**What we're testing**: Does teaching adapt based on MEMORY.md, especially scenario anchoring to learner's stated goal?

| ID     | MEMORY.md State                                 | Expected Adaptation                                                          | Grader                                                       |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| PERS-1 | Goal: "customer support agent"                  | Hook scenarios involve support/ticketing/client management                   | Model-based: scenario context matches goal domain            |
| PERS-2 | Goal: "content writing assistant"               | Hook scenarios involve writing/marketing/content production                  | Model-based: scenario context matches goal domain            |
| PERS-3 | Strong retrieval history (3+ sessions)          | Harder BUILD questions, lighter FILL, more challenging LOCK                  | Model-based: question complexity and FILL brevity            |
| PERS-4 | Weak retrieval on "specs" from 2 sessions ago   | Spaced retrieval at session start: "What do you remember about specs?"       | Model-based: prior weak area revisited                       |
| PERS-5 | Tutor name "Coach Z"                            | Self-refers as Coach Z consistently                                          | Model-based: self-references use tutor name                  |
| PERS-6 | Improving trend (weak → strong across sessions) | Acknowledges growth: "Your retrieval is getting sharper" (effort-based)      | Model-based: growth acknowledgment present                   |
| PERS-7 | End of session                                  | MEMORY.md updated with: concepts discovered, retrieval quality, observations | Deterministic: MEMORY.md modified, Discovery History updated |

**Pass**: 5/7 minimum. PERS-1/2 (scenario anchoring) and PERS-7 (memory persistence) are critical.

---

## Dimension 9: Error Recovery & Context (6 tasks)

**What we're testing**: Graceful degradation and efficient context management.

### Error Recovery

| ID    | Error Condition                | Expected                                      | Grader                             |
| ----- | ------------------------------ | --------------------------------------------- | ---------------------------------- |
| ERR-1 | `api.py progress` returns 503  | Skip, use MEMORY.md, continue                 | Deterministic: session continues   |
| ERR-2 | `api.py tree` connection error | Use cached tree.json if available             | Deterministic: cache file read     |
| ERR-3 | `api.py lesson` returns 404    | Show tree, help pick correct lesson           | Deterministic: tree displayed      |
| ERR-4 | `api.py complete` fails        | Celebrate anyway, record locally in MEMORY.md | Model-based: learning acknowledged |

### Context Management

| ID    | Scenario                        | Expected                                                   | Grader                                                                 |
| ----- | ------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| CTX-1 | Lesson API returns content      | Writes to cache, internalizes for hidden teaching plan     | Deterministic: file write. Model-based: concepts extracted, not pasted |
| CTX-2 | Phase transition (HOOK → BUILD) | session.md updated with current phase, concepts discovered | Deterministic: session.md write with blended phase info                |

**Pass**: 6/6 (100%). Error recovery and context management are non-negotiable.

---

## Simulated Learner Profiles

For multi-turn evals, use these simulated students:

| Profile        | Behavior                                                                           | Tests                               |
| -------------- | ---------------------------------------------------------------------------------- | ----------------------------------- |
| **Engineer**   | Answers "what" with "how" (RAG, databases, APIs). Goes on implementation tangents. | BUILD-5, BUILD-6 (tangent handling) |
| **Discoverer** | Thinks carefully, arrives at concepts with effort. Ideal student.                  | BUILD-1, BUILD-2, BUILD-3, BUILD-8  |
| **Impatient**  | Says "just tell me" after 1 attempt. Wants direct answers.                         | BUILD-7, BUILD-10                   |
| **Shallow**    | Gives correct words but can't explain why. Pattern matcher.                        | LOCK-6, BUILD-9                     |
| **Beginner**   | Short answers, needs scaffolding, gets confused by abstract questions.             | HOOK-2, BUILD-7, LOCK-5             |
| **Advanced**   | Detailed reasoning, challenges assumptions, finds concepts quickly.                | PERS-3, LOCK-8                      |

---

## Grader Prompts (Model-Based)

### BUILD Quality Grader

```
You are evaluating whether an AI tutor guided a learner to DISCOVER
concepts through questioning, rather than telling them.

Given: the lesson's key concepts (ground truth) and the conversation transcript.

For each concept the learner should discover:
1. Did the learner arrive at the concept through their own reasoning?
2. Was the concept NAMED by the AI only AFTER the learner described it?
3. If the learner went on a tangent, was the redirect respectful and effective?
4. Were hints progressive (not immediate answers)?

Score strictly. An AI that explains concepts before the learner has a
chance to discover them gets 0 even if the explanation is excellent.
The whole point is discovery, not clarity of explanation.
```

### HOOK Quality Grader

```
You are evaluating the quality of a case-based scenario hook.

Given: the lesson topic, the learner's stated goal (from MEMORY.md), and
the AI's opening scenario.

Check:
1. Does the scenario relate to the learner's stated goal? (If no goal,
   is it a relatable universal scenario?)
2. Does the scenario create cognitive tension — a problem the learner
   wants to solve?
3. Are lesson concepts HIDDEN in the scenario — not revealed upfront?
4. Does the scenario naturally lead to the lesson's key concepts?

A hook that reveals the answer ("Today we'll learn about specs, which are...")
is a critical failure regardless of scenario quality.
```

### LOCK Quality Grader

```
You are evaluating the retrieval/reconstruction phase of a teaching session.

Given: the conversation transcript after the FILL phase.

Check:
1. Is there a natural context switch (casual question) before retrieval?
2. Does the retrieval challenge demand RECONSTRUCTION, not just recall?
   ("Explain as if teaching someone" = good. "What is X?" = bad.)
3. When the learner misses something, does the AI PROMPT before correcting?
4. Is praise effort-based ("You worked through that") not ability-based ("You're smart")?
5. Does the AI identify gaps and flag them for future review?

A session that skips retrieval entirely is a critical failure.
The LOCK phase is where long-term retention is created.
```

### Full Cycle Grader

```
You are evaluating whether the AI executed the 4-phase Blended Discovery
cycle correctly.

Given: the full teaching transcript for one lesson.

Identify the four phases:
1. HOOK: Case-based scenario with a question (should come FIRST)
2. BUILD: Socratic questioning leading to concept discovery
3. FILL: Short, targeted gap-filling (should be BRIEF)
4. LOCK: Context switch + retrieval from memory

For each phase, check:
- Present? (critical — all 4 must exist)
- In correct order? (HOOK before BUILD before FILL before LOCK)
- Quality per individual rubric?

Also check for anti-patterns:
- Content dumping (>50 words from source material)
- Concepts named before discovery
- FILL longer than BUILD (should be much shorter)
- No retrieval at end
```

---

## Priority Order (Run in This Sequence)

1. **Dimension 4: BUILD Quality** — if Socratic discovery fails, the entire approach fails
2. **Dimension 7: Cycle Orchestration** — the 4-phase sequence must execute correctly
3. **Dimension 6: LOCK Quality** — retrieval is where retention is created
4. **Dimension 3: HOOK Quality** — hooks create engagement and set up discovery
5. **Dimension 5: FILL Quality** — must be brief and targeted, not a lecture
6. **Dimension 8: Personalization** — scenario anchoring to learner's goal
7. **Dimension 9: Error Recovery** — reliability
8. **Dimension 2: Session Setup** — Goal/Project capture
9. **Dimension 1: Skill Activation** — basic correctness

---

## Success Criteria Summary

| Dimension              | Tasks | Pass Threshold | Critical? | Why                                        |
| ---------------------- | ----- | -------------- | --------- | ------------------------------------------ |
| 1. Skill Activation    | 8     | 8/8 (100%)     | Yes       | False positives break trust                |
| 2. Session Setup       | 8     | 7/8 (88%)      | Yes       | Goal capture enables personalized hooks    |
| 3. HOOK Quality        | 8     | 6/8 (75%)      | No        | Hooks can vary, but must exist             |
| 4. BUILD Quality       | 10    | 8/10 (80%)     | **Yes**   | Core differentiator — this IS the approach |
| 5. FILL Quality        | 5     | 4/5 (80%)      | Yes       | FILL must not become a lecture             |
| 6. LOCK Quality        | 8     | 6/8 (75%)      | **Yes**   | Retrieval creates retention                |
| 7. Cycle Orchestration | 7     | 6/7 (86%)      | **Yes**   | Phase sequence must be correct             |
| 8. Personalization     | 7     | 5/7 (71%)      | No        | Nice to have for first version             |
| 9. Error/Context       | 6     | 6/6 (100%)     | Yes       | Sessions must never crash                  |

**Overall pass**: All critical dimensions at threshold + 75% of non-critical at threshold.

**The Transcript Test**: Run a full session with the simulated "Engineer" profile on a conceptual lesson. If the simulated learner discovers the key concepts through questioning (not telling), and can reconstruct them from memory after a context switch — the skill passes.

---

## Comparison Checklist: Evals vs Actual Experience

After a real session, compare against what made Sir Zia's transcript work:

```
HOOK Phase:
[ ] AI started with a realistic scenario, not an explanation
[ ] Scenario related to my stated goal (or was universally relatable)
[ ] Scenario created a problem I wanted to solve
[ ] Lesson concepts were NOT revealed in the hook

BUILD Phase:
[ ] AI asked questions more than it made statements
[ ] I arrived at key concepts through my OWN reasoning
[ ] Concepts were NAMED only after I described them
[ ] When I went on implementation tangents, AI redirected elegantly
[ ] Hints were progressive — not immediate answers
[ ] After finding a concept, AI validated: "The thesis calls this [X]"

FILL Phase:
[ ] FILL was SHORT (2-3 minutes, not a lecture)
[ ] FILL connected my discoveries, didn't repeat them
[ ] FILL only covered what I couldn't have discovered through questioning

LOCK Phase:
[ ] AI changed the subject naturally (weather, weekend, etc.)
[ ] After brief casual chat, AI demanded full reconstruction from memory
[ ] I was asked to explain "as if teaching someone"
[ ] When I missed something, AI prompted before correcting
[ ] Praise was effort-based ("you figured that out") not ability-based

Overall:
[ ] I feel like I OWN these concepts (not just heard about them)
[ ] I could explain the lesson to someone else right now
[ ] The AI never dumped raw content at me
[ ] MEMORY.md was updated with my discoveries and retrieval quality
[ ] Session ended with a summary framing achievements as MY discoveries
```
