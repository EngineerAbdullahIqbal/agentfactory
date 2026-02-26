-- Migration: Flashcard Progress & XP Tracking
-- Run ONCE against the progress-api database before deploying the flashcard feature.
-- Safe to re-run — all statements are idempotent.

-- 1. New table: flashcard_completions
--    (create_all handles this automatically, but included here for completeness)
CREATE TABLE IF NOT EXISTS flashcard_completions (
    id              SERIAL PRIMARY KEY,
    user_id         VARCHAR NOT NULL REFERENCES users(id),
    deck_id         VARCHAR(100) NOT NULL,
    chapter_slug    VARCHAR(200) NOT NULL,
    score_pct       INTEGER NOT NULL CHECK (score_pct BETWEEN 0 AND 100),
    cards_correct   INTEGER NOT NULL CHECK (cards_correct >= 0),
    cards_total     INTEGER NOT NULL CHECK (cards_total >= 1),
    CHECK (cards_correct <= cards_total),
    xp_earned       INTEGER NOT NULL DEFAULT 0,
    is_first        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_flashcard_completions_user_deck
    ON flashcard_completions (user_id, deck_id);

-- 2. New column on user_progress (create_all does NOT alter existing tables)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'user_progress' AND column_name = 'flashcards_completed'
    ) THEN
        ALTER TABLE user_progress ADD COLUMN flashcards_completed INTEGER NOT NULL DEFAULT 0;
    END IF;
END $$;
