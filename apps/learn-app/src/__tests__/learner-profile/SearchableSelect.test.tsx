import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchableSelect } from "@/components/ui/searchable-select";

const OPTIONS = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
];

describe("SearchableSelect", () => {
  it("renders placeholder when no value", () => {
    render(
      <SearchableSelect
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
        placeholder="Pick one"
      />,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("Pick one");
  });

  it("shows selected label when value set", () => {
    render(
      <SearchableSelect value="fr" onValueChange={vi.fn()} options={OPTIONS} />,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("French");
  });

  it("opens on click and shows search input", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect value="" onValueChange={vi.fn()} options={OPTIONS} />,
    );
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("filters options as user types", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect value="" onValueChange={vi.fn()} options={OPTIONS} />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Search…"), "Fre");
    expect(screen.getByText("French")).toBeInTheDocument();
    expect(screen.queryByText("Spanish")).not.toBeInTheDocument();
  });

  it("calls onValueChange on item select", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchableSelect
        value=""
        onValueChange={onValueChange}
        options={OPTIONS}
      />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Spanish"));
    expect(onValueChange).toHaveBeenCalledWith("es");
  });

  it("closes after selection", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect value="" onValueChange={vi.fn()} options={OPTIONS} />,
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("German"));
    expect(screen.queryByPlaceholderText("Search…")).not.toBeInTheDocument();
  });

  it("shows 'Other' when allowOther=true", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
        allowOther
        otherValue="__other__"
      />,
    );
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("does not show 'Other' when allowOther is false", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect value="" onValueChange={vi.fn()} options={OPTIONS} />,
    );
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByText("Other")).not.toBeInTheDocument();
  });

  it("disabled prevents opening", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
        disabled
      />,
    );
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByPlaceholderText("Search…")).not.toBeInTheDocument();
  });

  it("forwards id to trigger button", () => {
    render(
      <SearchableSelect
        id="my-select"
        value=""
        onValueChange={vi.fn()}
        options={OPTIONS}
      />,
    );
    expect(document.getElementById("my-select")).toBeInTheDocument();
  });
});
