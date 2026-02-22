import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFSRS, Rating } from "@/components/flashcards/useFSRS";
import type { FlashcardDeck } from "@/components/flashcards/types";

// ---------------------------------------------------------------------------
// Full localStorage mock — replace window.localStorage entirely
// ---------------------------------------------------------------------------

function createMockStorage() {
  let store: Record<string, string> = {};
  return {
    store,
    mock: {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        for (const key of Object.keys(store)) delete store[key];
      }),
      key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
      get length() {
        return Object.keys(store).length;
      },
    } as unknown as Storage,
    reset() {
      for (const key of Object.keys(store)) delete store[key];
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeDeck(overrides?: Partial<FlashcardDeck>): FlashcardDeck {
  return {
    deck: {
      id: "test-deck",
      title: "Test Deck",
      description: "A test deck",
      tags: ["test"],
      version: 1,
      ...overrides?.deck,
    },
    cards: overrides?.cards ?? [
      { id: "c1", front: "Q1", back: "A1" },
      { id: "c2", front: "Q2", back: "A2" },
      { id: "c3", front: "Q3", back: "A3" },
    ],
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useFSRS", () => {
  let storage: ReturnType<typeof createMockStorage>;
  let origLocalStorage: Storage;

  beforeEach(() => {
    storage = createMockStorage();
    origLocalStorage = window.localStorage;
    Object.defineProperty(window, "localStorage", {
      value: storage.mock,
      writable: true,
      configurable: true,
    });
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: origLocalStorage,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it("fresh deck: all cards have New state (state=0)", () => {
    const deck = makeDeck();
    const { result } = renderHook(() => useFSRS(deck));

    expect(result.current.cards).toHaveLength(3);
    for (const card of result.current.cards) {
      expect(card.srsState.state).toBe(0); // State.New
      expect(card.srsState.reps).toBe(0);
      expect(card.srsState.lapses).toBe(0);
    }
    expect(result.current.wasReset).toBe(false);
  });

  it("rate card: advances state and persists to localStorage", () => {
    const deck = makeDeck();
    const { result } = renderHook(() => useFSRS(deck));

    act(() => {
      result.current.rateCard("c1", Rating.Good);
    });

    const c1 = result.current.cards.find((c) => c.id === "c1")!;
    expect(c1.srsState.state).not.toBe(0);
    expect(c1.srsState.reps).toBeGreaterThan(0);

    // Verify localStorage was updated
    const stored = JSON.parse(storage.store["flashcards:test-deck"]);
    expect(stored.cards.c1).toBeDefined();
    expect(stored.cards.c1.reps).toBeGreaterThan(0);
  });

  it("deck edit: new card ID gets New state", () => {
    const deck1 = makeDeck();
    const { result } = renderHook(() => useFSRS(deck1));

    act(() => {
      result.current.rateCard("c1", Rating.Good);
    });

    // Remount with a new card added
    const deck2 = makeDeck({
      cards: [
        { id: "c1", front: "Q1", back: "A1" },
        { id: "c2", front: "Q2", back: "A2" },
        { id: "c3", front: "Q3", back: "A3" },
        { id: "c4", front: "Q4", back: "A4" },
      ],
    });
    const { result: result2 } = renderHook(() => useFSRS(deck2));

    const c4 = result2.current.cards.find((c) => c.id === "c4")!;
    expect(c4).toBeDefined();
    expect(c4.srsState.state).toBe(0); // New

    const c1 = result2.current.cards.find((c) => c.id === "c1")!;
    expect(c1.srsState.reps).toBeGreaterThan(0);
  });

  it("deck edit: removed card not in returned cards, state preserved in localStorage", () => {
    const deck1 = makeDeck();
    const { result } = renderHook(() => useFSRS(deck1));

    act(() => {
      result.current.rateCard("c2", Rating.Good);
    });

    // Remove c2 from deck
    const deck2 = makeDeck({
      cards: [
        { id: "c1", front: "Q1", back: "A1" },
        { id: "c3", front: "Q3", back: "A3" },
      ],
    });
    const { result: result2 } = renderHook(() => useFSRS(deck2));

    expect(result2.current.cards.find((c) => c.id === "c2")).toBeUndefined();

    // c2 state should still be in localStorage (tombstoned)
    const stored = JSON.parse(storage.store["flashcards:test-deck"]);
    expect(stored.cards.c2).toBeDefined();
    expect(stored.cards.c2.reps).toBeGreaterThan(0);
  });

  it("deck edit: changed content preserves SRS state", () => {
    const deck1 = makeDeck();
    const { result } = renderHook(() => useFSRS(deck1));

    act(() => {
      result.current.rateCard("c1", Rating.Good);
    });
    const repsAfterRate = result.current.cards.find(
      (c) => c.id === "c1",
    )!.srsState.reps;

    // Same ID, different content
    const deck2 = makeDeck({
      cards: [
        { id: "c1", front: "Updated Q1", back: "Updated A1" },
        { id: "c2", front: "Q2", back: "A2" },
        { id: "c3", front: "Q3", back: "A3" },
      ],
    });
    const { result: result2 } = renderHook(() => useFSRS(deck2));

    const c1 = result2.current.cards.find((c) => c.id === "c1")!;
    expect(c1.front).toBe("Updated Q1");
    expect(c1.back).toBe("Updated A1");
    expect(c1.srsState.reps).toBe(repsAfterRate);
  });

  it("version bump logs console message", () => {
    const deck1 = makeDeck();
    renderHook(() => useFSRS(deck1));

    const deck2 = makeDeck({
      deck: {
        id: "test-deck",
        title: "Test Deck",
        description: "A test deck",
        tags: ["test"],
        version: 2,
      },
    });
    renderHook(() => useFSRS(deck2));

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("version changed"),
    );
  });

  it("hydrate/dehydrate roundtrip preserves all fields with epoch-ms precision", () => {
    const deck = makeDeck();
    const { result } = renderHook(() => useFSRS(deck));

    act(() => {
      result.current.rateCard("c1", Rating.Good);
    });

    const c1State = result.current.cards.find(
      (c) => c.id === "c1",
    )!.srsState;

    const stored = JSON.parse(storage.store["flashcards:test-deck"]);
    const persistedC1 = stored.cards.c1;

    expect(persistedC1.dueMs).toBe(c1State.due.getTime());
    expect(persistedC1.stability).toBe(c1State.stability);
    expect(persistedC1.difficulty).toBe(c1State.difficulty);
    expect(persistedC1.elapsed_days).toBe(c1State.elapsed_days);
    expect(persistedC1.scheduled_days).toBe(c1State.scheduled_days);
    expect(persistedC1.reps).toBe(c1State.reps);
    expect(persistedC1.lapses).toBe(c1State.lapses);
    expect(persistedC1.state).toBe(c1State.state);
    if (c1State.last_review) {
      expect(persistedC1.lastReviewMs).toBe(c1State.last_review.getTime());
    }
  });

  it("dehydrate: undefined lastReviewMs omitted from persisted state", () => {
    const deck = makeDeck();
    renderHook(() => useFSRS(deck));

    const stored = JSON.parse(storage.store["flashcards:test-deck"]);
    const c1 = stored.cards.c1;
    expect(c1.lastReviewMs).toBeUndefined();
  });

  it("corrupted localStorage: graceful reset + wasReset flag", () => {
    storage.store["flashcards:test-deck"] = "NOT VALID JSON {{{";

    const deck = makeDeck();
    const { result } = renderHook(() => useFSRS(deck));

    expect(result.current.wasReset).toBe(true);
    expect(result.current.cards).toHaveLength(3);
    for (const card of result.current.cards) {
      expect(card.srsState.state).toBe(0);
    }
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Corrupted localStorage"),
      expect.anything(),
    );
  });

  it("localStorage quota exceeded: warning fired", () => {
    // Let init write succeed, then fail
    let writeCount = 0;
    storage.mock.setItem = vi.fn((key: string, value: string) => {
      writeCount++;
      if (writeCount <= 1) {
        storage.store[key] = value;
      } else {
        throw new DOMException("QuotaExceededError");
      }
    });

    const deck = makeDeck();
    const { result } = renderHook(() => useFSRS(deck));

    act(() => {
      result.current.rateCard("c1", Rating.Good);
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("quota exceeded"),
    );
  });

  it("concurrent writes to different decks: no interference", () => {
    const deckA = makeDeck({
      deck: {
        id: "deck-a",
        title: "Deck A",
        description: "",
        tags: [],
        version: 1,
      },
      cards: [{ id: "a1", front: "AQ", back: "AA" }],
    });
    const deckB = makeDeck({
      deck: {
        id: "deck-b",
        title: "Deck B",
        description: "",
        tags: [],
        version: 1,
      },
      cards: [{ id: "b1", front: "BQ", back: "BA" }],
    });

    const { result: resultA } = renderHook(() => useFSRS(deckA));
    const { result: resultB } = renderHook(() => useFSRS(deckB));

    act(() => {
      resultA.current.rateCard("a1", Rating.Good);
    });

    const b1 = resultB.current.cards.find((c) => c.id === "b1")!;
    expect(b1.srsState.state).toBe(0);

    const storedA = JSON.parse(storage.store["flashcards:deck-a"]);
    const storedB = JSON.parse(storage.store["flashcards:deck-b"]);
    expect(storedA.cards.a1.reps).toBeGreaterThan(0);
    expect(storedB.cards.b1.reps).toBe(0);
  });

  it("due card filtering: only cards where dueMs <= Date.now()", () => {
    const deck = makeDeck();
    const { result } = renderHook(() => useFSRS(deck));

    expect(result.current.dueCards).toHaveLength(3);

    act(() => {
      result.current.rateCard("c1", Rating.Good);
    });

    const dueIds = result.current.dueCards.map((c) => c.id);
    expect(dueIds).not.toContain("c1");
    expect(dueIds).toContain("c2");
    expect(dueIds).toContain("c3");
  });
});
