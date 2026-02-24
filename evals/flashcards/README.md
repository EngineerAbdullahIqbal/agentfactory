# Flashcards Skill Eval Harness

This harness evaluates the flashcard skill **before** deck regeneration.

It combines:

1. Deterministic checks (schema, IDs, balance, constraints)
2. LLM-as-judge scoring (15 criteria aligned to Sir Zia intent)
3. Consistency metrics across repeated trials (`pass@1`, `pass@k`, `pass^k`, variance)
4. Baseline diff for regression tracking

## Why This Exists

This addresses the stated requirement:

- Improve flashcard content quality
- Enforce minimum information principle
- Keep questions concise and explicit
- Ensure self-contained atomic cards
- Generate half recall and half deep-understanding cards

## Directory Layout

- `datasets/cases.json` - 5 evaluation cases with expectations
- `fixtures/lessons/` - source lesson inputs for the cases
- `fixtures/outputs/` - golden output decks for baseline bootstrapping
- `fixtures/manifests/` - run manifests (`fixture-baseline-v1.json`, `live-template.json`)
- `graders/deterministic.js` - hard/soft deterministic grading
- `graders/llm-judge.js` - model grading with structured JSON output
- `graders/aggregate.js` - pass rates, variance, consistency, baseline diff
- `scripts/upsert-live-trial.js` - record live output deck paths into manifest
- `run-eval.sh` - main orchestrator

## Dataset Cases (5)

1. `F01_explicit_dual_prompt_single_lesson`
2. `F02_implicit_request_single_lesson`
3. `F03_negative_control_no_flashcards`
4. `F04_formula_heavy_single_lesson`
5. `F05_chapter_mode_two_lessons`

Each case defines input lessons, prompt style, and expected output constraints.

## Deterministic Checks

The deterministic grader evaluates these checks per trial:

1. generation expectation match
2. deck count matches target
3. YAML parse success
4. deck schema valid
5. card required fields present
6. card ID pattern `{deck.id}-NNN`
7. card ID uniqueness within deck
8. card ID uniqueness across all decks in trial
9. tags present on every card
10. difficulty values valid
11. card back does not start with Yes/No
12. recall/thinking balance in expected range
13. recall card fronts under 40 words
14. thinking cards include `why` field
15. recall cards do not include `why`
16. thinking fronts include Why/How at required ratio
17. no duplicate front/back pairs
18. formula coverage (for formula-focused cases)
19. relationship/mechanism coverage (when required)
20. recall card backs ≤15 words (hard gate)
21. thinking card backs 20-40 words (soft gate)
22. no compound questions (two question words joined by "and")
23. "Why does the [source]..." template ≤2 per deck
24. difficulty distribution: 20-40% basic, 40-60% intermediate, 10-30% advanced

Hard-gate failures mark the trial as failed.

## LLM Judge Criteria (15)

The LLM judge scores each criterion 0-10:

1. minimum information atomicity
2. concise explicit questions under 40 words
3. self-contained questions
4. key terms coverage
5. formula accuracy and coverage
6. relationships and mechanisms
7. recall card quality
8. understanding card depth
9. Why/How front quality
10. half recall / half understanding balance
11. `why` field depth
12. answer precision and completeness
13. source grounding / no hallucination
14. non-redundancy and variety
15. overall study value

Critical criteria must score >= 8, and overall LLM score must be >= 82 for critical pass.

## Running the Harness

### 1) Run fixture baseline (deterministic only)

```bash
./evals/flashcards/run-eval.sh --with-llm never
```

### 2) Run fixture baseline with LLM judge (auto if `claude` CLI exists)

```bash
./evals/flashcards/run-eval.sh --with-llm auto --judge-model haiku
```

### 3) Save a baseline snapshot

```bash
./evals/flashcards/run-eval.sh \
  --with-llm never \
  --run-id baseline-v1 \
  --write-baseline evals/flashcards/baselines/baseline-v1.json
```

### 4) Compare a new run against baseline

```bash
./evals/flashcards/run-eval.sh \
  --manifest evals/flashcards/fixtures/manifests/fixture-baseline-v1.json \
  --run-id candidate-v2 \
  --baseline evals/flashcards/baselines/baseline-v1.json
```

## Evaluating Live Outputs

### Quick: use `--grade-live`

```bash
./evals/flashcards/run-eval.sh --grade-live --with-llm never
```

This automatically uses the live dataset and manifest files.

### Manual: custom live manifests

1. Copy `live-template.json` to a live manifest path.
2. Record each generated trial output with `upsert-live-trial.js`.
3. Run harness using the live manifest.

### Record live trial output

```bash
node evals/flashcards/scripts/upsert-live-trial.js \
  --manifest evals/flashcards/fixtures/manifests/live-run.json \
  --case-id F01_explicit_dual_prompt_single_lesson \
  --trial-index 1 \
  --deck-paths apps/learn-app/docs/some-lesson.flashcards.yaml
```

### Run live eval

```bash
./evals/flashcards/run-eval.sh \
  --manifest evals/flashcards/fixtures/manifests/live-run.json \
  --run-id live-2026-02-24 \
  --baseline evals/flashcards/baselines/baseline-v1.json \
  --with-llm auto
```

## Outputs

Each run writes:

- `reports/<run-id>/deterministic/*.json`
- `reports/<run-id>/llm/*.json`
- `reports/<run-id>/summary.json`
- `reports/<run-id>/summary.md`

`summary.json` contains:

- global pass rates (`pass@1`, `pass@k`, `pass^k`)
- mean deterministic and LLM scores
- consistency score from variance
- per-case failures and score spread
- baseline deltas (if baseline provided)

## Suggested Improvement Loop

1. Freeze baseline (`baseline-v1.json`).
2. Change skill prompt/rules.
3. Re-run harness on same dataset.
4. Reject changes that regress critical metrics.
5. Add real failure cases from live runs back into `datasets/cases.json`.
