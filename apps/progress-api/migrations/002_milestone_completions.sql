-- Migration: Milestone Completions
-- Run ONCE against the progress-api database before deploying the milestone feature.
-- Safe to re-run — all statements are idempotent.

CREATE TABLE IF NOT EXISTS milestone_completions (
    user_id         VARCHAR NOT NULL REFERENCES users(id),
    milestone_slug  VARCHAR NOT NULL,
    xp_earned       INTEGER NOT NULL DEFAULT 20,
    completed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, milestone_slug)
);

CREATE INDEX IF NOT EXISTS ix_milestone_completions_user
    ON milestone_completions (user_id);
