import { useState, useMemo, useCallback, useRef } from "react";
import {
  fsrs,
  createEmptyCard,
  Rating,
  State,
  type Card,
  type RecordLog,
} from "ts-fsrs";
import type {
  FlashcardDeck,
  FlashcardCard,
  PersistedDeckState,
  PersistedCardState,
} from "./types";

export { Rating };

// ---------------------------------------------------------------------------
// Hydration codec — converts between persisted (epoch-ms) and ts-fsrs (Date)
// ---------------------------------------------------------------------------

function hydrate(p: PersistedCardState): Card {
  return {
    due: new Date(p.dueMs),
    stability: p.stability,
    difficulty: p.difficulty,
    elapsed_days: p.elapsed_days,
    scheduled_days: p.scheduled_days,
    reps: p.reps,
    lapses: p.lapses,
    state: p.state as State,
    learning_steps: p.learning_steps ?? 0,
    last_review: p.lastReviewMs ? new Date(p.lastReviewMs) : undefined,
  };
}

function dehydrate(c: Card): PersistedCardState {
  return {
    dueMs: c.due.getTime(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state as 0 | 1 | 2 | 3,
    learning_steps: c.learning_steps ?? 0,
    lastReviewMs: c.last_review?.getTime(),
  };
}

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY_PREFIX = "flashcards:";
const QUOTA_WARN_RATIO = 0.8;
const ESTIMATED_QUOTA = 5 * 1024 * 1024; // 5 MB typical localStorage limit

function storageKey(deckId: string): string {
  return `${STORAGE_KEY_PREFIX}${deckId}`;
}

function readPersistedState(deckId: string): {
  state: PersistedDeckState | null;
  wasReset: boolean;
} {
  try {
    const raw = localStorage.getItem(storageKey(deckId));
    if (raw === null) return { state: null, wasReset: false };
    const parsed = JSON.parse(raw);
    // Basic structural validation
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.schemaVersion !== 1 ||
      typeof parsed.cards !== "object"
    ) {
      throw new Error("Invalid schema");
    }
    return { state: parsed as PersistedDeckState, wasReset: false };
  } catch (e) {
    console.warn(
      `[flashcards] Corrupted localStorage for deck "${deckId}", resetting.`,
      e,
    );
    try {
      localStorage.removeItem(storageKey(deckId));
    } catch {
      // ignore removal failure
    }
    return { state: null, wasReset: true };
  }
}

function writePersistedState(deckId: string, state: PersistedDeckState): void {
  const json = JSON.stringify(state);
  try {
    localStorage.setItem(storageKey(deckId), json);
  } catch {
    console.warn(
      `[flashcards] localStorage quota exceeded for deck "${deckId}".`,
    );
    return;
  }

  // Quota warning check
  try {
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        totalSize += key.length + (localStorage.getItem(key)?.length ?? 0);
      }
    }
    // Characters are roughly 2 bytes in UTF-16
    const usedBytes = totalSize * 2;
    if (usedBytes > ESTIMATED_QUOTA * QUOTA_WARN_RATIO) {
      console.warn(
        `[flashcards] localStorage usage at ~${Math.round((usedBytes / ESTIMATED_QUOTA) * 100)}% of estimated quota.`,
      );
    }
  } catch {
    // ignore quota check errors
  }
}

// ---------------------------------------------------------------------------
// State reconciliation
// ---------------------------------------------------------------------------

function reconcile(
  deck: FlashcardDeck,
  persisted: PersistedDeckState | null,
): { cardStates: Record<string, Card>; deckVersion: number } {
  const now = new Date();
  const existingStates: Record<string, Card> = {};

  // Hydrate existing persisted states (including tombstoned cards)
  if (persisted) {
    for (const [id, ps] of Object.entries(persisted.cards)) {
      existingStates[id] = hydrate(ps);
    }
  }

  const deckCardIds = new Set(deck.cards.map((c) => c.id));
  const result: Record<string, Card> = {};

  // For each card in the current deck
  for (const card of deck.cards) {
    if (existingStates[card.id]) {
      // Existing card: preserve SRS state (content may have changed)
      result[card.id] = existingStates[card.id];
    } else {
      // New card: create empty (New state)
      result[card.id] = createEmptyCard(now);
    }
  }

  // Tombstone removed cards: keep in persisted state but won't be shown
  for (const [id, card] of Object.entries(existingStates)) {
    if (!deckCardIds.has(id)) {
      result[id] = card;
    }
  }

  // Log version changes
  if (persisted && persisted.deckVersion !== deck.deck.version) {
    console.log(
      `[flashcards] Deck "${deck.deck.id}" version changed: ${persisted.deckVersion} -> ${deck.deck.version}`,
    );
  }

  return { cardStates: result, deckVersion: deck.deck.version };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface CardWithSRS extends FlashcardCard {
  srsState: Card;
}

export interface UseFSRSReturn {
  cards: CardWithSRS[];
  dueCards: CardWithSRS[];
  rateCard: (cardId: string, rating: Rating) => void;
  wasReset: boolean;
  deckVersion: number;
  getSchedulingInfo: (cardId: string) => RecordLog | null;
}

const EMPTY_RETURN: UseFSRSReturn = {
  cards: [],
  dueCards: [],
  rateCard: () => {},
  wasReset: false,
  deckVersion: 0,
  getSchedulingInfo: () => null,
};

export function useFSRS(deck: FlashcardDeck | undefined): UseFSRSReturn {
  const scheduler = useRef(fsrs());

  // Initialize from localStorage
  const [{ cardStates, wasReset, deckVersion }, setState] = useState(() => {
    if (!deck) return { cardStates: {} as Record<string, Card>, wasReset: false, deckVersion: 0 };

    const { state: persisted, wasReset: reset } = readPersistedState(
      deck.deck.id,
    );
    const { cardStates: cs, deckVersion: dv } = reconcile(deck, persisted);

    // Persist reconciled state
    const persistedState: PersistedDeckState = {
      schemaVersion: 1,
      deckVersion: dv,
      cards: Object.fromEntries(
        Object.entries(cs).map(([id, c]) => [id, dehydrate(c)]),
      ),
      lastReviewMs: Date.now(),
    };
    writePersistedState(deck.deck.id, persistedState);

    return { cardStates: cs, wasReset: reset, deckVersion: dv };
  });

  // Merge deck cards with SRS state (only cards in the current deck)
  const deckCards = deck?.cards ?? [];
  const deckId = deck?.deck.id;

  const deckCardIds = useMemo(
    () => new Set(deckCards.map((c) => c.id)),
    [deckCards],
  );

  const cards = useMemo<CardWithSRS[]>(
    () =>
      deckCards
        .filter((c) => deckCardIds.has(c.id))
        .map((c) => ({
          ...c,
          srsState: cardStates[c.id] ?? createEmptyCard(),
        })),
    [deckCards, cardStates, deckCardIds],
  );

  const dueCards = useMemo<CardWithSRS[]>(() => {
    const now = Date.now();
    return cards.filter((c) => c.srsState.due.getTime() <= now);
  }, [cards]);

  const rateCard = useCallback(
    (cardId: string, rating: Rating) => {
      if (!deckId) return;
      setState((prev) => {
        const card = prev.cardStates[cardId];
        if (!card) return prev;

        const result = scheduler.current.repeat(card, new Date());
        const updated = result[rating].card;

        const newCardStates = { ...prev.cardStates, [cardId]: updated };

        // Persist
        const persistedState: PersistedDeckState = {
          schemaVersion: 1,
          deckVersion: prev.deckVersion,
          cards: Object.fromEntries(
            Object.entries(newCardStates).map(([id, c]) => [id, dehydrate(c)]),
          ),
          lastReviewMs: Date.now(),
        };
        writePersistedState(deckId, persistedState);

        return { ...prev, cardStates: newCardStates };
      });
    },
    [deckId],
  );

  const getSchedulingInfo = useCallback(
    (cardId: string): RecordLog | null => {
      const card = cardStates[cardId];
      if (!card) return null;
      return scheduler.current.repeat(card, new Date());
    },
    [cardStates],
  );

  if (!deck) return EMPTY_RETURN;

  return {
    cards,
    dueCards,
    rateCard,
    wasReset,
    deckVersion,
    getSchedulingInfo,
  };
}
