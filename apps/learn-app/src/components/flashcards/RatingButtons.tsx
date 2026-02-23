import React, { useEffect, useState } from "react";
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
  const [selected, setSelected] = useState<Rating | null>(null);

  const handleRateClick = (rating: Rating) => {
    setSelected(rating);
    // Give the React render cycle 1 tick to apply the CSS class before calling onRate 
    // (which triggers the 250ms parent fade-out).
    setTimeout(() => onRate(rating), 10);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "1") {
        e.preventDefault();
        setSelected(Rating.Again);
        setTimeout(() => onRate(Rating.Again), 10);
      } else if (e.key === "2") {
        e.preventDefault();
        setSelected(Rating.Good);
        setTimeout(() => onRate(Rating.Good), 10);
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
      <span className={`${styles.trackerCount} ${styles.trackerMissed}`}>{missedCount}</span>
      <button
        className={`${styles.ratingButton} ${styles.ratingMissed} ${selected === Rating.Again ? styles.selected : ""}`}
        onClick={() => handleRateClick(Rating.Again)}
        aria-label="Missed it"
      >
        Missed It
      </button>
      <button
        className={`${styles.ratingButton} ${styles.ratingGotIt} ${selected === Rating.Good ? styles.selected : ""}`}
        onClick={() => handleRateClick(Rating.Good)}
        aria-label="Got it"
      >
        Got It
      </button>
      <span className={`${styles.trackerCount} ${styles.trackerGotIt}`}>{gotItCount}</span>
    </div>
  );
}
