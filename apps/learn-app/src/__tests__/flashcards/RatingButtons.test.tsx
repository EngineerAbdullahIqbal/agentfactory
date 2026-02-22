import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Rating } from "ts-fsrs";
import RatingButtons from "@/components/flashcards/RatingButtons";

describe("RatingButtons", () => {
  it("renders Missed It and Got It buttons", () => {
    render(
      <RatingButtons onRate={vi.fn()} missedCount={0} gotItCount={0} />,
    );

    expect(screen.getByText("Missed It")).toBeInTheDocument();
    expect(screen.getByText("Got It")).toBeInTheDocument();
  });

  it("clicking buttons fires correct rating", async () => {
    const onRate = vi.fn();
    render(
      <RatingButtons onRate={onRate} missedCount={0} gotItCount={0} />,
    );

    await userEvent.click(screen.getByText("Got It"));
    expect(onRate).toHaveBeenCalledWith(Rating.Good);

    await userEvent.click(screen.getByText("Missed It"));
    expect(onRate).toHaveBeenCalledWith(Rating.Again);
  });

  it("keyboard 1 triggers Missed It, 2 triggers Got It", async () => {
    const onRate = vi.fn();
    render(
      <RatingButtons onRate={onRate} missedCount={0} gotItCount={0} />,
    );

    await userEvent.keyboard("1");
    expect(onRate).toHaveBeenCalledWith(Rating.Again);

    await userEvent.keyboard("2");
    expect(onRate).toHaveBeenCalledWith(Rating.Good);
  });

  it("displays counts from props", () => {
    render(
      <RatingButtons onRate={vi.fn()} missedCount={3} gotItCount={7} />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });
});
