import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { FlashcardsProps } from "./types";
import { Rating } from "ts-fsrs";
import FlashcardCard from "./FlashcardCard";
import RatingButtons from "./RatingButtons";
import { useFSRS } from "./useFSRS";
import styles from "./Flashcards.module.css";

export default function Flashcards({ cards: deck }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [ankiUrl, setAnkiUrl] = useState<string | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [missedCount, setMissedCount] = useState(0);
  const [gotItCount, setGotItCount] = useState(0);

  const { cards, rateCard, wasReset } = useFSRS(deck ?? undefined);

  // Shuffle seed — increment to reshuffle
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const shuffledIndices = useMemo(() => {
    if (!deck) return [];
    const indices = deck.cards.map((_, i) => i);
    if (shuffleSeed === 0) return indices;
    // Fisher-Yates shuffle
    const shuffled = [...indices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [deck, shuffleSeed]);

  // Show toast when localStorage was reset
  useEffect(() => {
    if (wasReset) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [wasReset]);

  // Fetch Anki manifest
  useEffect(() => {
    if (!deck) return;
    fetch("/flashcards/manifest.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((manifest) => {
        if (manifest?.decks?.[deck.deck.id]?.apkgPath) {
          setAnkiUrl(manifest.decks[deck.deck.id].apkgPath);
        }
      })
      .catch(() => {});
  }, [deck]);

  // Close download menu on outside click
  useEffect(() => {
    if (!showDownloadMenu) return;
    const close = () => setShowDownloadMenu(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showDownloadMenu]);

  const totalCards = deck?.cards.length ?? 0;
  const isLastCard = currentIndex >= totalCards - 1;

  const goToNext = useCallback(() => {
    if (isLastCard) return;
    setCurrentIndex((prev) => prev + 1);
    setIsFlipped(false);
  }, [isLastCard]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setIsFlipped(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!deck) return;
      const realIndex = shuffledIndices[currentIndex] ?? currentIndex;
      const card = deck.cards[realIndex];
      if (!card) return;

      rateCard(card.id, rating);

      if (rating === Rating.Again) {
        setMissedCount((prev) => prev + 1);
      } else {
        setGotItCount((prev) => prev + 1);
      }

      // Advance to next card
      if (!isLastCard) {
        setCurrentIndex((prev) => prev + 1);
      }
      setIsFlipped(false);
    },
    [deck, shuffledIndices, currentIndex, isLastCard, rateCard],
  );

  const handleShuffle = useCallback(() => {
    setShuffleSeed((prev) => prev + 1);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  if (!deck) {
    return (
      <div className={styles.container}>
        <p className={styles.fallbackMessage}>
          Flashcards are not available for this lesson yet.
        </p>
      </div>
    );
  }

  // Session complete — rated last card
  const sessionDone =
    isLastCard && isFlipped === false && missedCount + gotItCount >= totalCards;
  if (sessionDone) {
    const total = missedCount + gotItCount;
    const pct = total > 0 ? Math.round((gotItCount / total) * 100) : 0;
    return (
      <div className={styles.container}>
        <div className={styles.sessionComplete}>
          <div className={styles.sessionCompleteTitle}>Session Complete</div>
          <div className={styles.sessionStats}>
            <div className={`${styles.stat} ${styles.statMissed}`}>
              {missedCount} missed
            </div>
            <div className={`${styles.stat} ${styles.statGotIt}`}>
              {gotItCount} got it
            </div>
          </div>
          <div className={styles.sessionPct}>{pct}% correct</div>
          <button
            className={styles.exitButton}
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
              setMissedCount(0);
              setGotItCount(0);
            }}
          >
            Review Again
          </button>
        </div>
      </div>
    );
  }

  const realIndex = shuffledIndices[currentIndex] ?? currentIndex;
  const currentCard = deck.cards[realIndex];
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.browseLayout}>
        <button
          className={styles.navArrow}
          onClick={goToPrev}
          disabled={currentIndex === 0}
          aria-label="Previous card"
        >
          &#8249;
        </button>

        <div className={`${styles.cardArea} ${styles.atmosphericGlow}`}>
          {currentCard && (
            <FlashcardCard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
              cardNumber={currentIndex + 1}
              totalCards={totalCards}
            />
          )}
        </div>

        <button
          className={styles.navArrow}
          onClick={goToNext}
          disabled={isLastCard}
          aria-label="Next card"
        >
          &#8250;
        </button>
      </div>

      {isFlipped && (
        <RatingButtons
          onRate={handleRate}
          missedCount={missedCount}
          gotItCount={gotItCount}
        />
      )}

      <div className={styles.progressRow}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.cardCounter}>
          {currentIndex + 1} / {totalCards} cards
        </span>
      </div>

      <div className={styles.utilityRow}>
        <button
          className={styles.utilityButton}
          onClick={handleShuffle}
          aria-label="Shuffle cards"
        >
          &#8645; Shuffle
        </button>
        <div className={styles.downloadWrapper}>
          <button
            className={styles.utilityButton}
            onClick={(e) => {
              e.stopPropagation();
              setShowDownloadMenu((prev) => !prev);
            }}
            aria-label="Download flashcards"
            aria-expanded={showDownloadMenu}
          >
            &#8615; Download
          </button>
          {showDownloadMenu && (
            <div className={styles.downloadMenu}>
              <button
                className={styles.downloadOption}
                onClick={() => {
                  window.print();
                  setShowDownloadMenu(false);
                }}
              >
                Print as PDF
              </button>
              {ankiUrl && (
                <a
                  className={styles.downloadOption}
                  href={ankiUrl}
                  download
                  onClick={() => setShowDownloadMenu(false)}
                >
                  Anki Deck (.apkg)
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <div className={styles.toast} role="alert">
          Flashcard progress was reset due to a deck update.
        </div>
      )}
    </div>
  );
}
