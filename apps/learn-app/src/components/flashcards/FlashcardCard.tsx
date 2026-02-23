import React, { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import type { FlashcardCard as FlashcardCardType } from "./types";
import styles from "./Flashcards.module.css";

interface FlashcardCardProps {
  card: FlashcardCardType;
  isFlipped: boolean;
  onFlip: () => void;
  cardNumber: number;
  totalCards: number;
}

export default function FlashcardCard({
  card,
  isFlipped,
  onFlip,
  cardNumber,
  totalCards,
}: FlashcardCardProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reset hasFlippedOnce when card changes
  useEffect(() => {
    setHasFlippedOnce(false);
  }, [card.id]);

  // Track first flip
  useEffect(() => {
    if (isFlipped && !hasFlippedOnce) {
      setHasFlippedOnce(true);
    }
  }, [isFlipped, hasFlippedOnce]);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const text = isFlipped ? card.back : card.front;
      navigator.clipboard.writeText(text).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        },
        () => {
          // Clipboard unavailable (insecure context or permission denied)
        },
      );
    },
    [isFlipped, card.front, card.back],
  );

  const cardClasses = [
    styles.card,
    isFlipped && !prefersReducedMotion ? styles.flipped : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.cardWrapper}>
      <div
        className={cardClasses}
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onFlip();
          }
        }}
        role="region"
        aria-label={`Flashcard ${cardNumber} of ${totalCards}`}
        aria-live="polite"
        tabIndex={0}
      >
        <div
          className={`${styles.cardFace} ${styles.cardFront}`}
          aria-hidden={isFlipped}
        >
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            aria-label="Copy card text"
            title="Copy to clipboard"
          >
            {copied ? "\u2713" : "\u2398"}
          </button>
          <div className={styles.cardContent}>
            <Markdown>{card.front}</Markdown>
          </div>
          {!hasFlippedOnce && (
            <div className={styles.seeAnswerHint}>Click to flip</div>
          )}
        </div>
        <div
          className={`${styles.cardFace} ${styles.cardBack}`}
          aria-hidden={!isFlipped}
        >
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            aria-label="Copy card text"
            title="Copy to clipboard"
          >
            {copied ? "\u2713" : "\u2398"}
          </button>
          <div className={styles.cardContent}>
            <Markdown>{card.back}</Markdown>
          </div>
          {card.why && (
            <div className={styles.whySection}>
              <div className={styles.whyLabel}>Why?</div>
              <Markdown>{card.why}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
