import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { State } from "ts-fsrs";
import ReviewSession from "@/components/flashcards/ReviewSession";

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) =>
    React.createElement("div", { "data-testid": "markdown" }, children),
}));

const makeSRSCard = (id: string, front: string, back: string) => ({
  id,
  front,
  back,
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
});

const mockCards = [
  makeSRSCard("card-1", "Q1", "A1"),
  makeSRSCard("card-2", "Q2", "A2"),
  makeSRSCard("card-3", "Q3", "A3"),
];

describe("ReviewSession", () => {
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
  });

  it("shows progress counter", () => {
    render(
      <ReviewSession
        cards={mockCards}
        dueCards={mockCards}
        rateCard={vi.fn()}
        onExit={vi.fn()}
      />,
    );

    expect(screen.getByText("1 / 3 cards")).toBeInTheDocument();
  });

  it("shows session-complete summary after last card", async () => {
    const rateCard = vi.fn();
    render(
      <ReviewSession
        cards={[mockCards[0]]}
        dueCards={[mockCards[0]]}
        rateCard={rateCard}
        onExit={vi.fn()}
      />,
    );

    // Flip the card first to show rating buttons
    const region = screen.getByRole("region");
    await userEvent.click(region);

    // Rate the card
    await userEvent.click(screen.getByText("Got It"));

    expect(await screen.findByText("Session Complete")).toBeInTheDocument();
    expect(screen.getByText("1 got it")).toBeInTheDocument();
    expect(screen.getByText("Back to Deck")).toBeInTheDocument();
  });

  it("progress counter updates after rating", async () => {
    const rateCard = vi.fn();
    render(
      <ReviewSession
        cards={mockCards.slice(0, 2)}
        dueCards={mockCards.slice(0, 2)}
        rateCard={rateCard}
        onExit={vi.fn()}
      />,
    );

    expect(screen.getByText("1 / 2 cards")).toBeInTheDocument();

    // Flip card
    const region = screen.getByRole("region");
    await userEvent.click(region);

    // Rate
    await userEvent.click(screen.getByText("Got It"));

    expect(await screen.findByText("2 / 2 cards")).toBeInTheDocument();
  });
});
