import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChipSelect } from "@/components/profile/fields/ChipSelect";

const OPTIONS = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "rust", label: "Rust" },
];

describe("ChipSelect", () => {
  it("renders all options with correct labels", () => {
    render(
      <ChipSelect
        label="Languages"
        value={[]}
        onChange={vi.fn()}
        options={OPTIONS}
      />,
    );
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
  });

  it("toggling a chip calls onChange with added value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={[]}
        onChange={onChange}
        options={OPTIONS}
      />,
    );
    await user.click(screen.getByText("Python"));
    expect(onChange).toHaveBeenCalledWith(["python"]);
  });

  it("toggling a selected chip calls onChange with value removed", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={["python", "rust"]}
        onChange={onChange}
        options={OPTIONS}
      />,
    );
    await user.click(screen.getByText("Python"));
    expect(onChange).toHaveBeenCalledWith(["rust"]);
  });

  it("respects maxSelect — disables unselected chips when at limit", () => {
    render(
      <ChipSelect
        label="Languages"
        value={["python", "javascript"]}
        onChange={vi.fn()}
        options={OPTIONS}
        maxSelect={2}
      />,
    );
    const rustChip = screen.getByText("Rust");
    expect(rustChip).toBeDisabled();
  });

  it("custom input: typing and clicking Add calls onChange", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={["python"]}
        onChange={onChange}
        options={OPTIONS}
        allowCustom
      />,
    );
    const input = screen.getByPlaceholderText("Add custom…");
    await user.type(input, "Go");
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(onChange).toHaveBeenCalledWith(["python", "Go"]);
  });

  it("custom input: pressing Enter adds value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={[]}
        onChange={onChange}
        options={OPTIONS}
        allowCustom
      />,
    );
    const input = screen.getByPlaceholderText("Add custom…");
    await user.type(input, "Elixir{Enter}");
    expect(onChange).toHaveBeenCalledWith(["Elixir"]);
  });

  it("does not add duplicate custom value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={["Go"]}
        onChange={onChange}
        options={OPTIONS}
        allowCustom
      />,
    );
    const input = screen.getByPlaceholderText("Add custom…");
    await user.type(input, "Go{Enter}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not add empty custom value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={[]}
        onChange={onChange}
        options={OPTIONS}
        allowCustom
      />,
    );
    const input = screen.getByPlaceholderText("Add custom…");
    await user.type(input, "   {Enter}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("custom chips render and can be toggled off", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ChipSelect
        label="Languages"
        value={["python", "CustomLang"]}
        onChange={onChange}
        options={OPTIONS}
      />,
    );
    expect(screen.getByText("CustomLang")).toBeInTheDocument();
    await user.click(screen.getByText("CustomLang"));
    expect(onChange).toHaveBeenCalledWith(["python"]);
  });

  it("hint text renders when provided", () => {
    render(
      <ChipSelect
        label="Languages"
        value={[]}
        onChange={vi.fn()}
        options={OPTIONS}
        hint="Select up to 3"
      />,
    );
    expect(screen.getByText("Select up to 3")).toBeInTheDocument();
  });

  it("allowCustom=false hides the input", () => {
    render(
      <ChipSelect
        label="Languages"
        value={[]}
        onChange={vi.fn()}
        options={OPTIONS}
      />,
    );
    expect(
      screen.queryByPlaceholderText("Add custom…"),
    ).not.toBeInTheDocument();
  });
});
