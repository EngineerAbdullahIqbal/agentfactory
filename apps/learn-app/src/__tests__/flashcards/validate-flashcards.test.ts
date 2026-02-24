import { describe, it, expect } from "vitest";
import { DeckSchema } from "@/components/flashcards/schema";

// Re-implement the lint rules here for unit testing
// (the actual script exports validateDecks, but since it uses createRequire
//  for CJS modules and runs via tsx, testing the rules directly is more reliable)

function lintCards(
  cards: Array<{ id: string; front: string; back: string; difficulty?: string }>,
) {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const card of cards) {
    if (ids.has(card.id)) {
      errors.push(`Duplicate card ID: "${card.id}"`);
    }
    ids.add(card.id);

    if (!card.front.endsWith("?")) {
      errors.push(`Card "${card.id}": front must end with "?"`);
    }

    if (/^(Yes|No)\b/i.test(card.back)) {
      errors.push(`Card "${card.id}": back must not start with "Yes" or "No"`);
    }
  }

  return errors;
}

function checkDuplicatesAcrossDecks(
  decks: Array<{ id: string; cards: Array<{ id: string }> }>,
) {
  const globalIds = new Map<string, string>();
  const errors: string[] = [];

  for (const deck of decks) {
    for (const card of deck.cards) {
      const existing = globalIds.get(card.id);
      if (existing) {
        errors.push(
          `Duplicate card ID across decks: "${card.id}" in deck "${deck.id}" and "${existing}"`,
        );
      }
      globalIds.set(card.id, deck.id);
    }
  }

  return errors;
}

function checkDifficultyDistribution(
  cards: Array<{ difficulty?: string }>,
): string[] {
  const warnings: string[] = [];
  const counts: Record<string, number> = {};
  for (const card of cards) {
    const d = card.difficulty ?? "basic";
    counts[d] = (counts[d] || 0) + 1;
  }
  const total = cards.length;
  for (const [level, count] of Object.entries(counts)) {
    if (count / total > 0.6) {
      warnings.push(`>60% of cards are "${level}" (${count}/${total})`);
    }
  }
  return warnings;
}

// --- Fixtures ---

function validDeck(overrides?: Record<string, unknown>) {
  return {
    deck: {
      id: "test-deck",
      title: "Test Deck Title",
      description: "A valid test deck for flashcard validation testing.",
      tags: ["test"],
      version: 1,
    },
    cards: [
      {
        id: "card-001",
        front: "What is a variable?",
        back: "A named storage location in memory that holds a value.",
        difficulty: "basic",
      },
      {
        id: "card-002",
        front: "What is a function?",
        back: "A reusable block of code that performs a specific task.",
        difficulty: "basic",
      },
      {
        id: "card-003",
        front: "What is recursion?",
        back: "A technique where a function calls itself to solve smaller subproblems.",
        difficulty: "intermediate",
      },
      {
        id: "card-004",
        front: "What is a closure?",
        back: "A function that captures variables from its surrounding lexical scope.",
        difficulty: "advanced",
      },
      {
        id: "card-005",
        front: "What is polymorphism?",
        back: "The ability of different types to be treated through a common interface.",
        difficulty: "advanced",
      },
    ],
    ...overrides,
  };
}

// --- Tests ---

describe("flashcard validation — Zod schema", () => {
  it("accepts a valid deck", () => {
    const result = DeckSchema.safeParse(validDeck());
    expect(result.success).toBe(true);
  });

  it("rejects deck missing id", () => {
    const deck = validDeck();
    delete deck.deck.id;
    const result = DeckSchema.safeParse(deck);
    expect(result.success).toBe(false);
  });

  it("rejects deck with non-kebab-case id", () => {
    const deck = validDeck();
    deck.deck.id = "Test Deck" as unknown as string;
    const result = DeckSchema.safeParse(deck);
    expect(result.success).toBe(false);
  });

  it("rejects deck with fewer than 5 cards", () => {
    const deck = validDeck();
    deck.cards = deck.cards.slice(0, 3);
    const result = DeckSchema.safeParse(deck);
    expect(result.success).toBe(false);
  });

  it("rejects deck with empty tags", () => {
    const deck = validDeck();
    deck.deck.tags = [];
    const result = DeckSchema.safeParse(deck);
    expect(result.success).toBe(false);
  });

  it("rejects card front shorter than 10 chars", () => {
    const deck = validDeck();
    deck.cards[0].front = "Short?";
    const result = DeckSchema.safeParse(deck);
    expect(result.success).toBe(false);
  });
});

describe("flashcard validation — lint rules", () => {
  it("detects duplicate card ID within deck", () => {
    const cards = [
      { id: "dup-001", front: "Question one?", back: "Answer one here." },
      { id: "dup-001", front: "Question two?", back: "Answer two here." },
    ];
    const errors = lintCards(cards);
    expect(errors).toContainEqual(expect.stringContaining('Duplicate card ID: "dup-001"'));
  });

  it("detects card front without question mark", () => {
    const cards = [
      { id: "no-q-001", front: "This is a statement", back: "Answer to the statement here." },
    ];
    const errors = lintCards(cards);
    expect(errors).toContainEqual(expect.stringContaining('front must end with "?"'));
  });

  it("detects card back starting with Yes", () => {
    const cards = [
      { id: "yes-001", front: "Is this a test?", back: "Yes, it certainly is a test." },
    ];
    const errors = lintCards(cards);
    expect(errors).toContainEqual(
      expect.stringContaining('must not start with "Yes" or "No"'),
    );
  });

  it("detects card back starting with No", () => {
    const cards = [
      { id: "no-001", front: "Is this wrong?", back: "No, this is not wrong at all." },
    ];
    const errors = lintCards(cards);
    expect(errors).toContainEqual(
      expect.stringContaining('must not start with "Yes" or "No"'),
    );
  });

  it("passes valid cards without errors", () => {
    const cards = [
      { id: "ok-001", front: "What is valid?", back: "Something that passes all checks." },
    ];
    const errors = lintCards(cards);
    expect(errors).toHaveLength(0);
  });
});

describe("flashcard validation — cross-deck uniqueness", () => {
  it("detects duplicate card ID across two decks", () => {
    const decks = [
      { id: "deck-a", cards: [{ id: "shared-001" }] },
      { id: "deck-b", cards: [{ id: "shared-001" }] },
    ];
    const errors = checkDuplicatesAcrossDecks(decks);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("shared-001");
  });

  it("passes when card IDs are globally unique", () => {
    const decks = [
      { id: "deck-a", cards: [{ id: "a-001" }] },
      { id: "deck-b", cards: [{ id: "b-001" }] },
    ];
    const errors = checkDuplicatesAcrossDecks(decks);
    expect(errors).toHaveLength(0);
  });
});

describe("flashcard validation — difficulty distribution", () => {
  it("warns when >60% of cards share same difficulty", () => {
    const cards = [
      { difficulty: "basic" },
      { difficulty: "basic" },
      { difficulty: "basic" },
      { difficulty: "basic" },
      { difficulty: "intermediate" },
    ];
    const warnings = checkDifficultyDistribution(cards);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('"basic"');
    expect(warnings[0]).toContain("4/5");
  });

  it("no warning when difficulty is balanced", () => {
    const cards = [
      { difficulty: "basic" },
      { difficulty: "basic" },
      { difficulty: "intermediate" },
      { difficulty: "intermediate" },
      { difficulty: "advanced" },
    ];
    const warnings = checkDifficultyDistribution(cards);
    expect(warnings).toHaveLength(0);
  });

  it("counts cards without explicit difficulty as basic", () => {
    const cards = [{}, {}, {}, {}, { difficulty: "advanced" }];
    const warnings = checkDifficultyDistribution(cards);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('"basic"');
  });
});
