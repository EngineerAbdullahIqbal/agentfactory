import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Flashcards from "@/components/flashcards/Flashcards";
import type { FlashcardDeck } from "@/components/flashcards/types";
import { State } from "ts-fsrs";

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) =>
    React.createElement("div", { "data-testid": "markdown" }, children),
}));

// Mock useFSRS hook
vi.mock("@/components/flashcards/useFSRS", () => ({
  useFSRS: (deck?: FlashcardDeck) => ({
    cards: (deck?.cards ?? []).map((c) => ({
      ...c,
      srsState: {
        due: new Date(),
        stability: 1,
        difficulty: 5,
        elapsed_days: 0,
        scheduled_days: 0,
        reps: 0,
        lapses: 0,
        state: State.New,
      },
    })),
    dueCards: (deck?.cards ?? []).slice(0, 2).map((c) => ({
      ...c,
      srsState: {
        due: new Date(),
        stability: 1,
        difficulty: 5,
        elapsed_days: 0,
        scheduled_days: 0,
        reps: 0,
        lapses: 0,
        state: State.New,
      },
    })),
    rateCard: vi.fn(),
    wasReset: false,
    deckVersion: 1,
    getSchedulingInfo: () => null,
  }),
}));

const mockDeck: FlashcardDeck = {
  deck: {
    id: "test-deck",
    title: "Test Deck",
    description: "A test deck for unit testing",
    tags: ["test"],
    version: 1,
  },
  cards: [
    {
      id: "card-1",
      front: "What is TypeScript?",
      back: "A typed superset of JavaScript",
    },
    {
      id: "card-2",
      front: "What is React?",
      back: "A UI library",
    },
    {
      id: "card-3",
      front: "What is Vitest?",
      back: "A test framework",
    },
  ],
};

describe("Flashcards", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    }) as any;
  });

  it("renders card and progress counter", () => {
    render(<Flashcards cards={mockDeck} />);

    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  it('null deck shows "not available" fallback message', () => {
    render(<Flashcards cards={null} />);

    expect(
      screen.getByText("Flashcards Study Aid is not available for this lesson yet."),
    ).toBeInTheDocument();
  });

  it("prev/next changes card via keyboard", async () => {
    // Nav buttons were replaced by Tracking Pillars.
    // Navigation is now primarily keyboard driven or via swipe (in real devices).
    render(<Flashcards cards={mockDeck} />);

    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByText("2 / 3 cards")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();
  });

  it("Space flips card, then Missed It / Got It appear", async () => {
    render(<Flashcards cards={mockDeck} />);

    // Before flip — no rating buttons
    expect(
      screen.queryByRole("button", { name: "Missed it" }),
    ).not.toBeInTheDocument();

    await userEvent.keyboard(" ");

    // After flip — rating buttons visible
    expect(
      screen.getByRole("button", { name: "Missed it" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Got it" })).toBeInTheDocument();
  });

  it("keyboard arrows navigate between cards", async () => {
    render(<Flashcards cards={mockDeck} />);

    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByText("2 / 3 cards")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowUp}");
    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();
  });

  it("utility row contains a guide link to /guide#flashcards", () => {
    render(<Flashcards cards={mockDeck} />);
    const link = screen.getByRole("link", { name: "How flashcards work" });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/guide#flashcards");
  });
});
