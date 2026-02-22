import React, { useEffect } from "react";
import { Rating } from "ts-fsrs";
import styles from "./Flashcards.module.css";

interface RatingButtonsProps {
  onRate: (rating: Rating) => void;
  missedCount: number;
  gotItCount: number;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function RatingButtons({
  onRate,
  missedCount,
  gotItCount,
  containerRef,
}: RatingButtonsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") {
        e.preventDefault();
        onRate(Rating.Again);
      } else if (e.key === "2") {
        e.preventDefault();
        onRate(Rating.Good);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRate]);

  return (
    <div
      className={styles.ratingGroup}
      role="group"
      aria-label="Rate your recall"
      ref={containerRef}
      tabIndex={-1}
    >
      <button
        className={`${styles.ratingButton} ${styles.ratingMissed}`}
        onClick={() => onRate(Rating.Again)}
        aria-label="Missed it"
      >
        <span className={styles.ratingCount}>{missedCount}</span>
        Missed It
      </button>
      <button
        className={`${styles.ratingButton} ${styles.ratingGotIt}`}
        onClick={() => onRate(Rating.Good)}
        aria-label="Got it"
      >
        <span className={styles.ratingCount}>{gotItCount}</span>
        Got It
      </button>
    </div>
  );
}
