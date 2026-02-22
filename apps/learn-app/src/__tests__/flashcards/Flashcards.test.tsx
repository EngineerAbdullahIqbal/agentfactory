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
      screen.getByText("Flashcards are not available for this lesson yet."),
    ).toBeInTheDocument();
  });

  it("prev/next changes card", async () => {
    render(<Flashcards cards={mockDeck} />);

    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();

    const nextBtn = screen.getByLabelText("Next card");
    await userEvent.click(nextBtn);
    expect(screen.getByText("2 / 3 cards")).toBeInTheDocument();

    const prevBtn = screen.getByLabelText("Previous card");
    await userEvent.click(prevBtn);
    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();
  });

  it("Space flips card, then Missed It / Got It appear", async () => {
    render(<Flashcards cards={mockDeck} />);

    // Before flip — no rating buttons
    expect(screen.queryByText("Missed It")).not.toBeInTheDocument();

    await userEvent.keyboard(" ");

    // After flip — rating buttons visible
    expect(screen.getByText("Missed It")).toBeInTheDocument();
    expect(screen.getByText("Got It")).toBeInTheDocument();
  });

  it("keyboard arrows navigate between cards", async () => {
    render(<Flashcards cards={mockDeck} />);

    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByText("2 / 3 cards")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();
  });
});
