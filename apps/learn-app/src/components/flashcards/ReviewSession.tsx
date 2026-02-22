import React, { useState, useRef, useCallback, useMemo } from "react";
import { Rating } from "ts-fsrs";
import type { FlashcardCard as FlashcardCardType } from "./types";
import type { State } from "ts-fsrs";
import FlashcardCard from "./FlashcardCard";
import RatingButtons from "./RatingButtons";
import styles from "./Flashcards.module.css";

interface CardWithSRS extends FlashcardCardType {
  srsState: {
    due: Date;
    stability: number;
    difficulty: number;
    elapsed_days: number;
    scheduled_days: number;
    reps: number;
    lapses: number;
    state: State;
    last_review?: Date;
  };
}

interface ReviewSessionProps {
  cards: CardWithSRS[];
  dueCards: CardWithSRS[];
  rateCard: (cardId: string, rating: Rating) => void;
  onExit: () => void;
}

export default function ReviewSession({
  cards,
  dueCards,
  rateCard,
  onExit,
}: ReviewSessionProps) {
  const reviewQueue = useMemo(() => {
    const dueIds = new Set(dueCards.map((c) => c.id));
    const newCards = cards.filter((c) => !dueIds.has(c.id));
    return [...dueCards, ...newCards];
  }, [cards, dueCards]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [ratedCards, setRatedCards] = useState<Map<string, "missed" | "gotit">>(
    new Map(),
  );
  const ratingRef = useRef<HTMLDivElement>(null);

  const currentCard = reviewQueue[currentIndex];
  const isComplete = currentIndex >= reviewQueue.length;
  const totalCards = reviewQueue.length;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    if (!isFlipped) {
      setTimeout(() => ratingRef.current?.focus(), 100);
    }
  }, [isFlipped]);

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!currentCard) return;
      rateCard(currentCard.id, rating);
      setRatedCards((prev) => {
        const next = new Map(prev);
        next.set(currentCard.id, rating === Rating.Again ? "missed" : "gotit");
        return next;
      });
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    },
    [currentCard, rateCard],
  );

  // Derive counts from rated cards map (prevents double-counting on re-rating)
  const missedCount = [...ratedCards.values()].filter((v) => v === "missed").length;
  const gotItCount = [...ratedCards.values()].filter((v) => v === "gotit").length;

  if (isComplete) {
    const total = missedCount + gotItCount;
    const pct = total > 0 ? Math.round((gotItCount / total) * 100) : 0;
    return (
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
        <button className={styles.exitButton} onClick={onExit}>
          Back to Deck
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.atmosphericGlow}>
        <FlashcardCard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          cardNumber={currentIndex + 1}
          totalCards={totalCards}
        />
      </div>

      {isFlipped && currentCard && (
        <RatingButtons
          onRate={handleRate}
          missedCount={missedCount}
          gotItCount={gotItCount}
          containerRef={ratingRef}
        />
      )}

      <div className={styles.reviewProgress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0}%`,
            }}
          />
        </div>
        <span className={styles.cardCounter}>
          {currentIndex + 1} / {totalCards} cards
        </span>
      </div>
    </div>
  );
}
