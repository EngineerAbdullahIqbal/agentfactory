# Learn-AgentFactory Skill Eval Results

**Date**: 2026-02-19
**Method**: Static analysis of SKILL.md + reference files against eval criteria, plus evidence from prior test session (user "Zara", 1 lesson completed).
**API Status**: Content API not deployed (DNS not resolving) — API-dependent evals marked as BLOCKED.

---

## Infrastructure Pre-Check

| Check             | Result      | Evidence                                                             |
| ----------------- | ----------- | -------------------------------------------------------------------- |
| api.py health     | BLOCKED     | `content-api.panaversity.org` DNS not resolving                      |
| api.py tree       | BLOCKED     | No running backend                                                   |
| api.py lesson     | BLOCKED     | No running backend                                                   |
| api.py progress   | BLOCKED     | No running backend                                                   |
| api.py complete   | BLOCKED     | No running backend                                                   |
| auth.py           | PASS        | credentials.json exists (chmod 600), auth code + PKCE implemented    |
| Token refresh     | PASS (code) | `_try_refresh()` implemented correctly, auto-retry on 401            |
| Learner directory | PASS        | `~/.agentfactory/learner/` exists with MEMORY.md, session.md, cache/ |

---

## Dimension 1: Skill Activation — 6/8 PASS

| ID    | Prompt                        | Expected                           | Verdict  | Evidence                                                                                                                     |
| ----- | ----------------------------- | ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ACT-1 | "teach me about AI agents"    | Skill activates                    | PASS     | SKILL.md `description` includes "teach me" as trigger word                                                                   |
| ACT-2 | "let's study"                 | Skill activates                    | PASS     | Description includes "study"                                                                                                 |
| ACT-3 | "quiz me on the last lesson"  | Skill activates in Coach/quiz mode | PASS     | Description includes "quiz me"                                                                                               |
| ACT-4 | "what should I study next?"   | Skill activates in Manager mode    | PASS     | Description includes "what should I study"                                                                                   |
| ACT-5 | "continue where I left off"   | Skill activates, reads session.md  | PASS     | Description includes "continue where I left off"                                                                             |
| ACT-6 | "help me fix this Python bug" | Skill does NOT activate            | PASS     | Description says "Do NOT use for general coding help"                                                                        |
| ACT-7 | "what's the weather today?"   | Skill does NOT activate            | **RISK** | No explicit exclusion for general questions. Relies on "unrelated questions" catch-all. Should pass but untested.            |
| ACT-8 | "write me a FastAPI endpoint" | Skill does NOT activate            | **RISK** | Description mentions "Claude Code" and "skills" which could false-positive on coding tasks tangentially related to AI agents |

**Score**: 6/8 confirmed, 2/8 at risk of false positive. Need live test.

---

## Dimension 2: Session Setup — 4/7 PASS, 2 FAIL, 1 BLOCKED

| ID    | Scenario                                                        | Verdict     | Evidence                                                                                                                                                                                                                             |
| ----- | --------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SET-1 | First session: creates dir, asks name + preference + tutor name | **FAIL**    | Prior session created MEMORY.md but **tutor_name is missing**. Template specifies it, SKILL.md Step 2 instructs it, but the agent skipped it. Identity section shows only `Name: Zara`, `Started`, `Sessions` — no tutor name field. |
| SET-2 | MEMORY.md matches template structure                            | **PARTIAL** | Has Identity, Learning Style, Progress, Quiz History, Session Log sections (PASS). But missing: `Tutor name`, `Preferred modes`, `Teach-back quality` fields from template (FAIL).                                                   |
| SET-3 | Health check runs first                                         | BLOCKED     | Can't verify order from cached state. SKILL.md instructs "Step 1: Auth Check" with health command.                                                                                                                                   |
| SET-4 | Returning session: greets with tutor name, references by name   | **FAIL**    | No tutor_name in MEMORY.md, so returning session cannot use it. Also: session.md missing `Active mode` field.                                                                                                                        |
| SET-5 | Returning session: references last topic, no re-ask             | PASS        | MEMORY.md has Session Log with specific topic. session.md has lesson path and phase.                                                                                                                                                 |
| SET-6 | Mid-lesson compaction recovery                                  | PASS        | session.md exists with phase, lesson, next action. Cache files exist. SKILL.md §Context Recovery instructs exact recovery sequence.                                                                                                  |
| SET-7 | Auth fails gracefully                                           | PASS        | api.py prints "Run: python3 scripts/auth.py" and exits with code 1. SKILL.md error table covers "Not authenticated".                                                                                                                 |

### Critical Finding: Tutor Name Gap

The **template** (`references/templates.md`) specifies `Tutor name:` in MEMORY.md Identity. The **SKILL.md** Step 2 explicitly says "ask... what they'd like to call their tutor." But the prior test session **did not capture it**. This is either:

- (a) The agent ignored the instruction (behavioral gap)
- (b) The onboarding question was asked but answer wasn't saved (implementation gap)

**Fix required**: Stronger instruction in SKILL.md or add a verification check.

---

## Dimension 3: Teaching Quality — 7/10 PREDICTED PASS

| ID       | Scenario                                          | Verdict         | Evidence                                                                                                                                                                                                                        |
| -------- | ------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TEACH-1  | No raw content paste (>50 word overlap)           | **LIKELY PASS** | SKILL.md rule: "Never paste raw lesson content — explain in your own words." Teaching-science.md anti-pattern table explicitly flags this. Strong instruction.                                                                  |
| TEACH-2  | Not a wall of text >500 words without questions   | **LIKELY PASS** | SKILL.md: "formative checks every 2-3 concepts." Teaching-science.md §12 details continuous checking.                                                                                                                           |
| TEACH-3  | High cognitive_load chunked properly              | **LIKELY PASS** | Frontmatter-guide.md: "6-7 concepts: break into 2-3 chunks." Teaching-science.md §6 on Cognitive Load Theory. Clear numeric thresholds.                                                                                         |
| TEACH-4  | Session opens with retrieval from previous lesson | **LIKELY PASS** | SKILL.md Step 5: "Warm up: Quick retrieval from previous lesson." Teaching-science.md §1 and §2 (spaced repetition).                                                                                                            |
| TEACH-5  | Apply-level skills get scenario-based teaching    | **LIKELY PASS** | Frontmatter-guide.md maps bloom_level to question types. Teaching-science.md §5 Bloom's table.                                                                                                                                  |
| TEACH-6  | Examples-first for examples-preference learner    | **LIKELY PASS** | SKILL.md Step 5: "Adapt to MEMORY.md: examples-first learner gets scenarios." Teaching-science.md personalization framework table.                                                                                              |
| TEACH-7  | Theory-first for theory-preference learner        | **LIKELY PASS** | Same as above: "theory-first gets principles."                                                                                                                                                                                  |
| TEACH-8  | Practice exercise triggers Mentor mode            | **LIKELY PASS** | Teaching-modes.md §4 Mentor: "Lesson has `practice_exercise`" triggers Mentor. SKILL.md mode table confirms.                                                                                                                    |
| TEACH-9  | Feynman teach-back at least once per lesson       | **RISK**        | SKILL.md mentions Feynman overlay. Teaching-modes.md §Feynman Verification details triggers. But no HARD mandate like "you MUST ask teach-back at least once." It's described as "periodically." Could be skipped by the agent. |
| TEACH-10 | Vague teach-back gets specific gap identification | **RISK**        | Teaching-modes.md §Feynman: "Identify the specific gap ('You explained X well but skipped Y')". Instruction exists but it's in a reference file, not the main SKILL.md. Agent might not read it deeply enough.                  |

**Predicted Score**: 7-8/10. Feynman application is the weakest area — instructions exist but aren't mandatory enough.

---

## Dimension 4: Mode Selection — 6/8 PREDICTED PASS

| ID     | Signal                             | Expected Mode                     | Verdict         | Evidence                                                                                                                                                                                         |
| ------ | ---------------------------------- | --------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MODE-1 | New lesson, no signal              | Tutor (default)                   | PASS            | SKILL.md: Tutor is "(DEFAULT)". Teaching-modes.md auto-routing step 2.                                                                                                                           |
| MODE-2 | "Why is that important?"           | Socratic                          | **LIKELY PASS** | Teaching-modes.md signal table: "Why?" → Socratic. Clear instruction.                                                                                                                            |
| MODE-3 | Quiz score 2/5                     | Coach                             | PASS            | Prior session evidence: score 2/3, MEMORY.md flagged "Needs review." Teaching-modes.md: "Quiz score < 3/5" → Coach.                                                                              |
| MODE-4 | Practice exercise + "let me try"   | Mentor                            | **LIKELY PASS** | Teaching-modes.md: "Let me try" → Mentor.                                                                                                                                                        |
| MODE-5 | 3 consecutive 5/5 + "challenge me" | Simulator                         | **LIKELY PASS** | Teaching-modes.md: "3+ consecutive 5/5" → more Simulator. Signal "challenge me" → Simulator.                                                                                                     |
| MODE-6 | "What should I study next?"        | Manager                           | PASS            | SKILL.md Step 3-4 is Manager mode at session start. Teaching-modes.md signal table.                                                                                                              |
| MODE-7 | "This is too hard, I give up"      | Coach (scaffold down)             | **RISK**        | Teaching-science.md emotional awareness table covers frustration. But the signal "I give up" might trigger generic encouragement rather than mode switch. Not explicitly mapped in signal table. |
| MODE-8 | "This is too easy"                 | Socratic/Simulator (challenge up) | **LIKELY PASS** | Teaching-science.md: "Learner explicitly says 'too easy' → Jump ahead, offer challenge problems." Teaching-modes.md: low engagement → "Switch modes."                                            |

**Predicted Score**: 6-7/8. MODE-7 (frustration → scaffold down) is the weakest — instruction exists but is buried in teaching-science.md emotional awareness, not in the signal table.

---

## Dimension 5: Quiz Quality — 6/8 PREDICTED PASS

| ID     | Scenario                                         | Verdict         | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------ | ------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUIZ-1 | Apply bloom_level → scenario-based               | **LIKELY PASS** | SKILL.md Step 6: "Scenario-based: 'Given [situation], what would you do?' — not definitions." Frontmatter-guide bloom_level mapping.                                                                                                                                                                                                                                                                                                                                                                             |
| QUIZ-2 | Remember bloom_level → recall                    | **LIKELY PASS** | Teaching-science.md §5 Bloom's table: "Remember: Define, list, recall." Frontmatter-guide: "Remember=recall."                                                                                                                                                                                                                                                                                                                                                                                                    |
| QUIZ-3 | 3-5 questions generated                          | PASS            | SKILL.md Step 6: "3-5 questions from learning_objectives." Prior session: 3 questions were asked.                                                                                                                                                                                                                                                                                                                                                                                                                |
| QUIZ-4 | Questions map to learning_objectives             | **LIKELY PASS** | SKILL.md: "from learning_objectives at the bloom_level specified in frontmatter."                                                                                                                                                                                                                                                                                                                                                                                                                                |
| QUIZ-5 | Correct answer → "WHY is that correct?"          | **LIKELY PASS** | SKILL.md: "Elaborative interrogation: On correct answers, ask 'WHY is that the answer?'" Teaching-science.md §7: "Never just say 'correct' and move on."                                                                                                                                                                                                                                                                                                                                                         |
| QUIZ-6 | Wrong answer → "What led you to that?"           | **LIKELY PASS** | SKILL.md: "On wrong answers: 'What led you to that?' — guide, don't just correct." Prior session evidence: weak area was diagnosed specifically ("Distinguishing General vs Custom Agents").                                                                                                                                                                                                                                                                                                                     |
| QUIZ-7 | Score 2/5 → does NOT advance, re-teaches         | **FAIL**        | Prior session: Score 2/3, but lesson was marked complete (`api.py complete` was called). Session.md shows `Phase: completing`. MEMORY.md shows the lesson in Session Log as "covered." **Mastery gating was violated.** The score 2/3 = 66.7% is above 60% (3/5), but with only 3 questions, the threshold is ambiguous. SKILL.md says "< 3/5" which could mean "less than 60%" or "less than 3 out of 5 questions." Either way, a 2/3 score is borderline and the weak area was noted but advancement happened. |
| QUIZ-8 | Score 4/5 → advance, celebrate, update MEMORY.md | **LIKELY PASS** | SKILL.md Step 7 shows celebration format. MEMORY.md template includes quiz history.                                                                                                                                                                                                                                                                                                                                                                                                                              |

### Critical Finding: Mastery Gating Ambiguity

The threshold "Score < 3/5: DO NOT advance" is ambiguous when quiz has 3 questions:

- 3/5 = 60% → 2/3 = 66.7% → PASSES (but barely)
- "3 out of 5" → with 3 questions, equivalent threshold is 2/3 → PASSES at exactly the boundary

**The prior session advanced despite scoring 2/3 with a noted weak area.** This violates the spirit of mastery learning even if it technically passes the threshold. The SKILL.md should clarify: "minimum 70% OR at least 3 correct out of 5 questions."

**Predicted Score**: 6-7/8. Mastery gating is the critical gap.

---

## Dimension 6: Personalization — 3/6 PREDICTED PASS

| ID     | MEMORY.md State                  | Expected                                         | Verdict         | Evidence                                                                                                                                                                                                                                                         |
| ------ | -------------------------------- | ------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PERS-1 | Fast pace, all 5/5               | Shorter explanations, skip basics                | **LIKELY PASS** | Teaching-science.md personalization framework: "Quiz scores consistently 5/5 → Speed up."                                                                                                                                                                        |
| PERS-2 | Careful pace, abstract struggles | Lead with examples, more checks                  | **LIKELY PASS** | Teaching-science.md: "Struggles with abstract concepts → Lead with concrete examples."                                                                                                                                                                           |
| PERS-3 | Weak area from 3 sessions ago    | Spaced retrieval at session start                | **RISK**        | Teaching-science.md §2 spaced repetition: "When MEMORY.md shows a weak quiz area from 2+ sessions ago, bring it back." But with only 1 session in test data, can't verify actual behavior. Instruction is there but it's in a reference file, not the main flow. |
| PERS-4 | Improving quiz trend             | Acknowledge improvement, reduce scaffolding      | **RISK**        | Teaching-science.md §10 growth mindset: praise effort, not ability. But no explicit instruction to notice trends across multiple quiz scores and comment on them.                                                                                                |
| PERS-5 | Tutor name "Coach Z"             | Self-refers as "Coach Z"                         | **FAIL**        | Prior session: tutor name was NOT captured in MEMORY.md. SKILL.md instructs it, but the agent didn't follow through. Without the tutor name stored, this eval always fails.                                                                                      |
| PERS-6 | End of session                   | MEMORY.md updated with quiz scores, observations | PASS            | Prior session evidence: MEMORY.md has quiz history entry with date, score, weak areas. Session log has observations.                                                                                                                                             |

**Predicted Score**: 3-4/6. Tutor name is a hard fail. Spaced retrieval and trend acknowledgment are risks.

---

## Dimension 7: Error Recovery — 3/4 PREDICTED PASS

| ID    | Error Condition                 | Verdict         | Evidence                                                                                                                                                                                                                                                                    |
| ----- | ------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ERR-1 | `progress` returns 503          | **LIKELY PASS** | SKILL.md Step 3: "If this fails (503, timeout) — skip it. Use MEMORY.md's last-known numbers. Never let a progress error block the session."                                                                                                                                |
| ERR-2 | `tree` returns connection error | **RISK**        | SKILL.md error table: "Connection failed → Check URL, try later." But no explicit instruction to fall back to `cache/tree.json`. The Context Management section says "Cache, don't hold" but the error recovery table doesn't mention cache fallback for tree specifically. |
| ERR-3 | `lesson` returns 404            | **LIKELY PASS** | SKILL.md error table: "Not found → Show tree, help pick correctly."                                                                                                                                                                                                         |
| ERR-4 | `complete` fails                | **LIKELY PASS** | SKILL.md: "API error → Explain simply, try alternative, never end the session."                                                                                                                                                                                             |

### Issue: ERR-2 Cache Fallback Gap

SKILL.md says to cache tree to `cache/tree.json`, and the error table says "Connection failed → Check URL, try later." But there's no explicit instruction: "If tree fetch fails AND cache/tree.json exists, use the cached version." The agent might try to fetch, fail, and then just tell the user to try later — ending the session in practice.

**Predicted Score**: 3/4. Tree cache fallback needs explicit instruction.

---

## Dimension 8: Context Management — 3/4 PASS

| ID    | Scenario                                                 | Verdict         | Evidence                                                                                                                                                 |
| ----- | -------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CTX-1 | Tree API → writes to cache file                          | PASS            | Prior session: `cache/tree.json` exists (300KB). SKILL.md Step 4: `> ~/.agentfactory/learner/cache/tree.json`.                                           |
| CTX-2 | Lesson API → writes to cache, teaches from frontmatter   | PASS            | Prior session: `cache/current-lesson.json` exists (39KB). SKILL.md: "Teach from frontmatter first."                                                      |
| CTX-3 | Compaction recovery reads session.md + MEMORY.md + cache | **LIKELY PASS** | SKILL.md §Context Recovery: numbered 5-step recovery sequence. session.md exists with phase and next action.                                             |
| CTX-4 | Phase transition → session.md updated                    | **PARTIAL**     | session.md exists and has phase. But `Active mode` field is missing (template specifies it). Phase transitions might not consistently update session.md. |

**Predicted Score**: 3/4.

---

## Summary Scorecard

| Dimension             | Tasks | Pass | Fail | Risk | Threshold  | Status                                 |
| --------------------- | ----- | ---- | ---- | ---- | ---------- | -------------------------------------- |
| 1. Skill Activation   | 8     | 6    | 0    | 2    | 8/8 (100%) | **AT RISK** — false positives untested |
| 2. Session Setup      | 7     | 4    | 2    | 1    | 6/7 (86%)  | **FAIL** — tutor name not captured     |
| 3. Teaching Quality   | 10    | 7    | 0    | 3    | 8/10 (80%) | **AT RISK** — Feynman enforcement weak |
| 4. Mode Selection     | 8     | 6    | 0    | 2    | 6/8 (75%)  | **LIKELY PASS**                        |
| 5. Quiz Quality       | 8     | 6    | 1    | 1    | 7/8 (88%)  | **FAIL** — mastery gating ambiguous    |
| 6. Personalization    | 6     | 3    | 1    | 2    | 5/6 (83%)  | **FAIL** — tutor name blocks PERS-5    |
| 7. Error Recovery     | 4     | 3    | 0    | 1    | 4/4 (100%) | **AT RISK** — tree cache fallback gap  |
| 8. Context Management | 4     | 3    | 0    | 1    | 4/4 (100%) | **AT RISK** — session.md incomplete    |

### Overall Verdict: **FAIL** (3 critical dimensions at risk)

**Hard Fails (3)**:

1. **Tutor name not captured** → fails SET-1, SET-4, PERS-5
2. **Mastery gating ambiguous** → fails QUIZ-7 (borderline score advanced)
3. **session.md missing Active mode** → degrades CTX-4, SET-4

**Soft Risks (4)**:

1. Feynman teach-back not mandatory enough (TEACH-9, TEACH-10)
2. Frustration signal not in mode selection signal table (MODE-7)
3. Tree cache fallback not explicit in error recovery (ERR-2)
4. False positive activation on tangentially-related coding tasks (ACT-7, ACT-8)

---

## Fixes Applied (v0.8.0, commit 8cb4a2cf)

All 6 fixes were implemented in SKILL.md v0.8.0 and teaching-modes.md.

### Fix 1: Tutor Name — APPLIED

Step 2 now asks 3 explicit questions (name, learning preference, tutor name) with self-naming fallback ("If they skip this or say 'just Claude', pick a warm name yourself") and a VERIFY step that reads back MEMORY.md before proceeding.

**Eval impact**: Unblocks SET-1, SET-4, PERS-5.

### Fix 2: Mastery Gating — APPLIED (judgment-based, no thresholds)

Replaced rigid "< 3/5" threshold with teacher judgment. Important Rules now says: "use your judgment: did they grasp the core ideas?" Step 6 quiz section has a 4-branch decision tree:

- Foundational gap → re-teach
- Surface-level miss → advance with flag
- Rote/shallow answers → probe deeper
- When in doubt → ask the learner

**Eval impact**: Addresses QUIZ-7. Agent uses understanding quality, not percentages.

### Fix 3: Tree Cache Fallback — APPLIED

Error table "Connection failed" row now explicitly mentions `cache/tree.json` and `cache/current-lesson.json` fallback.

**Eval impact**: Addresses ERR-2.

### Fix 4: Feynman Mandate — APPLIED

Added to Important Rules: "Feynman check at least once per lesson — before quizzing, ask the learner to explain one core concept back to you in simple terms. If they can't, re-teach that part. This is non-negotiable."

**Eval impact**: Addresses TEACH-9, TEACH-10.

### Fix 5: session.md Active Mode — APPLIED

Step 5 now explicitly says to write active teaching mode and update on every mode switch or phase transition.

**Eval impact**: Addresses CTX-4.

### Fix 6: Frustration/Boredom Signals — APPLIED

Added to SKILL.md error recovery table and Coach mode triggers. Added to teaching-modes.md Signal-Based Switching table:

- "This is too hard" / "I give up" → Coach (scaffold down)
- "This is too easy" / "I'm bored" → Simulator (challenge up)

**Eval impact**: Addresses MODE-7.

---

## Post-Fix Predicted Scorecard

| Dimension             | Pre-Fix      | Post-Fix (predicted) | Change                         |
| --------------------- | ------------ | -------------------- | ------------------------------ |
| 1. Skill Activation   | 6/8 + 2 risk | 6/8 + 2 risk         | No change (needs live test)    |
| 2. Session Setup      | 4/7 FAIL     | 6/7 LIKELY PASS      | Fix 1 unblocks SET-1, SET-4    |
| 3. Teaching Quality   | 7/10 risk    | 9/10 LIKELY PASS     | Fix 4 mandates Feynman         |
| 4. Mode Selection     | 6/8 risk     | 7/8 LIKELY PASS      | Fix 6 adds frustration routing |
| 5. Quiz Quality       | 6/8 FAIL     | 7/8 LIKELY PASS      | Fix 2 uses judgment mastery    |
| 6. Personalization    | 3/6 FAIL     | 5/6 LIKELY PASS      | Fix 1 unblocks PERS-5          |
| 7. Error Recovery     | 3/4 risk     | 4/4 LIKELY PASS      | Fix 3 adds cache fallback      |
| 8. Context Management | 3/4 risk     | 4/4 LIKELY PASS      | Fix 5 adds active mode         |

**Post-Fix Verdict**: LIKELY PASS — all 3 hard fails addressed, all 4 soft risks mitigated. Remaining uncertainty is on Skill Activation false positives (ACT-7, ACT-8) which require live testing.

**Next**: Live eval with Content API deployed to confirm predictions.
