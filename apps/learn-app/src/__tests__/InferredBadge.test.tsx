import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InferredBadge } from "@/components/profile/fields/InferredBadge";

describe("InferredBadge", () => {
  it('renders "auto-set" when fieldSources[fieldPath] === "inferred"', () => {
    render(
      <InferredBadge
        fieldPath="goals.primary"
        fieldSources={{ "goals.primary": "inferred" }}
      />,
    );
    expect(screen.getByText("auto-set")).toBeInTheDocument();
  });

  it("renders nothing when fieldSources is undefined", () => {
    const { container } = render(<InferredBadge fieldPath="goals.primary" />);
    expect(container.innerHTML).toBe("");
  });

  it('renders nothing when field source is "user"', () => {
    const { container } = render(
      <InferredBadge
        fieldPath="goals.primary"
        fieldSources={{ "goals.primary": "user" }}
      />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("click handler fires on click", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <InferredBadge
        fieldPath="goals.primary"
        fieldSources={{ "goals.primary": "inferred" }}
        onClick={onClick}
      />,
    );
    await user.click(screen.getByText("auto-set"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("click handler fires on Enter key", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <InferredBadge
        fieldPath="goals.primary"
        fieldSources={{ "goals.primary": "inferred" }}
        onClick={onClick}
      />,
    );
    screen.getByText("auto-set").focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("click handler fires on Space key", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <InferredBadge
        fieldPath="goals.primary"
        fieldSources={{ "goals.primary": "inferred" }}
        onClick={onClick}
      />,
    );
    screen.getByText("auto-set").focus();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledOnce();
  });
});
