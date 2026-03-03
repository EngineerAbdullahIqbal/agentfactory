# Flashcard Progress & XP Tracking

**Status**: Draft
**Level**: SDD Level 1 (Spec-First)
**Related**: progress-api, learn-app flashcards

---

## Problem

Flashcard sessions are invisible to the gamification system. Users complete decks but earn no XP, streak credit, or badges. This reduces motivation and makes flashcards feel disconnected from the platform's progression loop.

## Solution

Record flashcard session completions server-side. Award XP on first unique deck completion. Grant streak credit on all completions (including repeats).

---

## Design Decisions

| Decision             | Choice                                                      | Rationale                                                                                                                                               |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth gate            | None — gate at session complete, not at browse              | Flashcards are learning tools; gating mid-session is disruptive. Show "Sign in to claim XP" CTA on session complete for unauthenticated users.          |
| XP formula           | `(cards_correct / cards_total) * 50`, first completion only | Self-assessed scores are less reliable than quiz scores → discount to 50% of quiz XP ceiling. No diminishing multiplier needed since repeats earn 0 XP. |
| Repeat policy        | 0 XP, streak credit only                                    | Prevents farming. `activity_days` insert with `ON CONFLICT DO NOTHING`.                                                                                 |
| Completion threshold | All cards rated                                             | Matches current UI — session complete screen only appears after every card is rated.                                                                    |
| FSRS state           | Stays in localStorage                                       | Client-side SRS works well. Server only needs session-level aggregates. No offline/online merge complexity.                                             |

---

## Data Model

### New table: `flashcard_completions`

```sql
CREATE TABLE flashcard_completions (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id),
    deck_id         VARCHAR(100) NOT NULL,       -- e.g. "ch01-2025-inflection-point"
    chapter_slug    VARCHAR(200) NOT NULL,        -- e.g. "01-foundations/01-agent-factory-paradigm"
    score_pct       INTEGER NOT NULL CHECK (score_pct BETWEEN 0 AND 100),
    cards_correct   INTEGER NOT NULL,
    cards_total     INTEGER NOT NULL,
    xp_earned       INTEGER NOT NULL DEFAULT 0,
    is_first        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ix_flashcard_completions_user_deck
    ON flashcard_completions (user_id, deck_id);
```

- Every session completion creates a row (first and repeats).
- `is_first` is TRUE only on the first completion of a given deck by a given user.
- `xp_earned` is 0 for all repeats.

---

## API

### `POST /api/v1/flashcard/complete`

**Auth**: Required (Bearer token).

**Request**:

```json
{
  "deck_id": "ch01-2025-inflection-point",
  "chapter_slug": "01-foundations/01-agent-factory-paradigm",
  "cards_correct": 17,
  "cards_total": 20
}
```

**Processing** (single transaction):

1. Upsert user (same as quiz flow).
2. Check if a `flashcard_completions` row exists for this `(user_id, deck_id)`.
3. If first completion:
   - `score_pct = round(cards_correct / cards_total * 100)`
   - `xp_earned = round(cards_correct / cards_total * 50)`
   - `is_first = TRUE`
4. If repeat:
   - `xp_earned = 0`
   - `is_first = FALSE`
5. Insert `flashcard_completions` row.
6. Upsert `activity_days` (type=`"flashcard"`, reference=`deck_id`).
7. Calculate streak.
8. If first completion: update `user_progress.total_xp += xp_earned`.
9. Evaluate flashcard badges (see below).
10. Invalidate user cache.

**Response**:

```json
{
  "xp_earned": 42,
  "total_xp": 580,
  "is_first_completion": true,
  "score_pct": 85,
  "streak": { "current": 5, "longest": 12 },
  "new_badges": []
}
```

---

## Frontend Changes

### `Flashcards.tsx` — session complete callback

On the existing session complete screen (all cards rated):

- **If authenticated**: Auto-submit via `POST /api/v1/flashcard/complete`. Show XP result inline (similar to `QuizXPModal` but lighter — no modal, inline on the session complete screen).
- **If not authenticated**: Show CTA: "Sign in to earn {estimated_xp} XP" with login link. No submission.

The `cards_correct` / `cards_total` values come from the existing `ratedCards` map (count of `"gotit"` vs `"missed"`).

### Auth detection

Use the existing `useAuth()` hook (or equivalent) already used by `GatedQuiz`. No new auth infrastructure needed.

### No `GatedFlashcards` wrapper needed

Unlike quizzes, we do NOT gate access. The auth check happens only at submission time on the session complete screen.

---

## Badges (Phase 1 — Optional)

Three flashcard-specific badges, evaluated on `POST /api/v1/flashcard/complete`:

| Badge ID         | Name           | Condition                                   |
| ---------------- | -------------- | ------------------------------------------- |
| `first-deck`     | "Memory Lane"  | First flashcard deck completed              |
| `deck-master-10` | "Deck Master"  | 10 unique decks completed                   |
| `perfect-recall` | "Total Recall" | 100% score on any deck (all cards "Got It") |

These follow the existing badge pattern in `services/engine/badges.py`.

---

## Content-API Proxy (Optional)

Add `POST /api/v1/content/flashcard/complete` as a thin proxy to progress-api, matching the existing pattern for lesson completion. Only needed if the learn-skill (CLI) wants to record flashcard sessions.

**Skip for v1** — frontend calls progress-api directly, same as quizzes.

---

## Files to Create/Modify

### Progress API (new files)

- `apps/progress-api/src/progress_api/models/flashcard.py` — SQLAlchemy model
- `apps/progress-api/src/progress_api/schemas/flashcard.py` — Pydantic request/response
- `apps/progress-api/src/progress_api/routes/flashcard.py` — Route handler
- `apps/progress-api/src/progress_api/services/flashcard.py` — Service (transaction orchestration)
- Alembic migration for `flashcard_completions` table

### Progress API (modify)

- `apps/progress-api/src/progress_api/routes/__init__.py` — Register new router
- `apps/progress-api/src/progress_api/services/engine/badges.py` — Add 3 flashcard badge definitions + evaluators
- `apps/progress-api/src/progress_api/models/__init__.py` — Register model

### Learn App (modify)

- `apps/learn-app/src/components/flashcards/Flashcards.tsx` — Add onComplete submission + XP display on session complete screen
- `apps/learn-app/src/api/progress-api.ts` — Add `submitFlashcardComplete()` function

### Tests (new)

- `apps/progress-api/tests/test_flashcard_complete.py` — Unit + integration tests for the endpoint
- `apps/progress-api/tests/test_flashcard_xp.py` — XP calculation edge cases

---

## Constraints

- No changes to YAML format, remark plugin, or build pipeline
- No changes to FSRS/localStorage logic
- No new environment variables (uses existing `PROGRESS_API_URL`)
- Flashcards remain fully usable without auth — XP is additive, not gating

## Success Criteria

- [ ] Authenticated user completes a deck → XP awarded, visible in progress dashboard
- [ ] Same deck repeated → 0 XP, streak credit recorded
- [ ] Unauthenticated user completes a deck → CTA shown, no server call
- [ ] `GET /api/v1/progress/me` includes flashcard stats
- [ ] Flashcard activity counts toward daily streak
- [ ] All existing flashcard functionality unchanged (browse, flip, FSRS, shuffle, download)
