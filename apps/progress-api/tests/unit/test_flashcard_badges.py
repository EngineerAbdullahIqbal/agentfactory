"""Tests for flashcard badge evaluation engine."""

from progress_api.services.engine.badges import (
    BADGE_DEFINITIONS,
    evaluate_flashcard_badges,
)


class TestFlashcardBadgeDefinitions:
    """Verify flashcard badge definitions exist."""

    def test_seventeen_badges_defined(self):
        """14 original + 3 flashcard badges = 17 total."""
        assert len(BADGE_DEFINITIONS) == 17

    def test_flashcard_badges_exist(self):
        assert "first-deck" in BADGE_DEFINITIONS
        assert "deck-master-10" in BADGE_DEFINITIONS
        assert "perfect-recall" in BADGE_DEFINITIONS

    def test_flashcard_badge_fields(self):
        for badge_id in ["first-deck", "deck-master-10", "perfect-recall"]:
            badge = BADGE_DEFINITIONS[badge_id]
            assert badge.id == badge_id
            assert badge.name
            assert badge.description
            assert badge.category


class TestFirstDeckBadge:
    """first-deck: awarded on first flashcard deck ever."""

    def test_first_deck_awards_badge(self):
        badges = evaluate_flashcard_badges(
            score_pct=80,
            is_first_deck_ever=True,
            unique_decks_completed=1,
            current_streak=1,
            existing_badge_ids=set(),
        )
        assert "first-deck" in badges

    def test_not_first_deck_no_badge(self):
        badges = evaluate_flashcard_badges(
            score_pct=100,
            is_first_deck_ever=False,
            unique_decks_completed=2,
            current_streak=1,
            existing_badge_ids=set(),
        )
        assert "first-deck" not in badges


class TestPerfectRecallBadge:
    """perfect-recall: awarded on 100% score."""

    def test_perfect_score_awards_badge(self):
        badges = evaluate_flashcard_badges(
            score_pct=100,
            is_first_deck_ever=False,
            unique_decks_completed=1,
            current_streak=1,
            existing_badge_ids=set(),
        )
        assert "perfect-recall" in badges

    def test_ninety_nine_no_badge(self):
        badges = evaluate_flashcard_badges(
            score_pct=99,
            is_first_deck_ever=False,
            unique_decks_completed=1,
            current_streak=1,
            existing_badge_ids=set(),
        )
        assert "perfect-recall" not in badges


class TestDeckMasterBadge:
    """deck-master-10: awarded when 10 unique decks completed."""

    def test_ten_decks_awards_badge(self):
        badges = evaluate_flashcard_badges(
            score_pct=80,
            is_first_deck_ever=False,
            unique_decks_completed=10,
            current_streak=1,
            existing_badge_ids=set(),
        )
        assert "deck-master-10" in badges

    def test_nine_decks_no_badge(self):
        badges = evaluate_flashcard_badges(
            score_pct=80,
            is_first_deck_ever=False,
            unique_decks_completed=9,
            current_streak=1,
            existing_badge_ids=set(),
        )
        assert "deck-master-10" not in badges


class TestFlashcardStreakBadges:
    """Streak badges are also awarded via flashcard activity."""

    def test_three_day_streak_from_flashcards(self):
        badges = evaluate_flashcard_badges(
            score_pct=80,
            is_first_deck_ever=False,
            unique_decks_completed=1,
            current_streak=3,
            existing_badge_ids=set(),
        )
        assert "on-fire" in badges

    def test_seven_day_streak(self):
        badges = evaluate_flashcard_badges(
            score_pct=80,
            is_first_deck_ever=False,
            unique_decks_completed=1,
            current_streak=7,
            existing_badge_ids=set(),
        )
        assert "on-fire" in badges
        assert "week-warrior" in badges

    def test_thirty_day_streak(self):
        badges = evaluate_flashcard_badges(
            score_pct=80,
            is_first_deck_ever=False,
            unique_decks_completed=1,
            current_streak=30,
            existing_badge_ids=set(),
        )
        assert "dedicated" in badges


class TestFlashcardBadgeIdempotency:
    """Badges already earned are not re-awarded."""

    def test_all_flashcard_badges_already_earned(self):
        badges = evaluate_flashcard_badges(
            score_pct=100,
            is_first_deck_ever=True,
            unique_decks_completed=10,
            current_streak=30,
            existing_badge_ids={
                "first-deck",
                "perfect-recall",
                "deck-master-10",
                "on-fire",
                "week-warrior",
                "dedicated",
            },
        )
        assert badges == []

    def test_partial_existing(self):
        badges = evaluate_flashcard_badges(
            score_pct=100,
            is_first_deck_ever=True,
            unique_decks_completed=1,
            current_streak=1,
            existing_badge_ids={"first-deck"},
        )
        assert "first-deck" not in badges
        assert "perfect-recall" in badges


class TestCombinedFlashcardBadges:
    """Multiple badges can be earned simultaneously."""

    def test_first_deck_perfect_with_streak(self):
        badges = evaluate_flashcard_badges(
            score_pct=100,
            is_first_deck_ever=True,
            unique_decks_completed=10,
            current_streak=7,
            existing_badge_ids=set(),
        )
        assert set(badges) == {
            "first-deck",
            "perfect-recall",
            "deck-master-10",
            "on-fire",
            "week-warrior",
        }
