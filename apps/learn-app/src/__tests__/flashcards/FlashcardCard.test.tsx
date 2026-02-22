import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FlashcardCard from "@/components/flashcards/FlashcardCard";
import type { FlashcardCard as FlashcardCardType } from "@/components/flashcards/types";

vi.mock("react-markdown", () => ({
  default: ({ children }: { children: string }) =>
    React.createElement("div", { "data-testid": "markdown" }, children),
}));

const baseCard: FlashcardCardType = {
  id: "test-card-1",
  front: "What is React?",
  back: "A JavaScript library for building user interfaces",
};

const cardWithWhy: FlashcardCardType = {
  ...baseCard,
  id: "test-card-why",
  why: "Understanding React is foundational for modern web development",
};

describe("FlashcardCard", () => {
  beforeEach(() => {
    // Reset matchMedia to default (no reduced motion)
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

  it("triggers flip on click", async () => {
    const onFlip = vi.fn();
    render(
      <FlashcardCard
        card={baseCard}
        isFlipped={false}
        onFlip={onFlip}
        cardNumber={1}
        totalCards={5}
      />,
    );

    const region = screen.getByRole("region");
    await userEvent.click(region);
    expect(onFlip).toHaveBeenCalledTimes(1);
  });

  it('renders "why" field when present', () => {
    render(
      <FlashcardCard
        card={cardWithWhy}
        isFlipped={true}
        onFlip={vi.fn()}
        cardNumber={1}
        totalCards={5}
      />,
    );

    expect(screen.getByText("Why?")).toBeInTheDocument();
    expect(screen.getByText(cardWithWhy.why!)).toBeInTheDocument();
  });

  it('"why" field absent when not in data', () => {
    render(
      <FlashcardCard
        card={baseCard}
        isFlipped={true}
        onFlip={vi.fn()}
        cardNumber={1}
        totalCards={5}
      />,
    );

    expect(screen.queryByText("Why?")).not.toBeInTheDocument();
  });

  it("reduced-motion: no flipped class applied", () => {
    // Mock prefers-reduced-motion to match
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });

    render(
      <FlashcardCard
        card={baseCard}
        isFlipped={true}
        onFlip={vi.fn()}
        cardNumber={1}
        totalCards={5}
      />,
    );

    const region = screen.getByRole("region");
    // The inner card div should not have the "flipped" class when reduced motion is preferred
    const cardDiv = region.querySelector("[class*='card']")!;
    expect(cardDiv.className).not.toContain("flipped");
  });
});
