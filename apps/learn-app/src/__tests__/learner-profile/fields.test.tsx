import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExpertiseLevelSelect } from "@/components/profile/fields/ExpertiseLevelSelect";
import { UrgencyRadio } from "@/components/profile/fields/UrgencyRadio";
import { AccessibilityToggles } from "@/components/profile/fields/AccessibilityToggles";
import type { AccessibilitySection } from "@/lib/learner-profile-types";
import {
  NATIVE_LANGUAGE_OPTIONS,
  NATIVE_LANGUAGE_OTHER_VALUE,
} from "@/lib/profile-field-definitions";

// ---------- ExpertiseLevelSelect ----------
describe("ExpertiseLevelSelect", () => {
  it("renders with label and shows 5 options when opened", async () => {
    const user = userEvent.setup();
    render(
      <ExpertiseLevelSelect
        value="beginner"
        onChange={vi.fn()}
        label="Programming"
      />,
    );

    const trigger = screen.getByLabelText("Programming");
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(5);
    const texts = options.map((o) =>
      (o.textContent || "").replace(/\s+/g, " ").trim(),
    );
    expect(texts).toEqual([
      "None— Never written code",
      "Beginner— Written scripts or simple programs",
      "Intermediate— Build apps, use APIs, debug independently",
      "Advanced— Design systems, write production code",
      "Expert— Architect large codebases, mentor others",
    ]);
  });

  it("displays the current value", () => {
    render(
      <ExpertiseLevelSelect
        value="advanced"
        onChange={vi.fn()}
        label="AI Fluency"
      />,
    );
    const trigger = screen.getByLabelText("AI Fluency");
    expect(trigger).toHaveTextContent("Advanced");
  });

  it("calls onChange when a different option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ExpertiseLevelSelect
        value="beginner"
        onChange={onChange}
        label="Programming"
      />,
    );

    await user.click(screen.getByLabelText("Programming"));
    await user.click(screen.getByRole("option", { name: /Expert/i }));
    expect(onChange).toHaveBeenCalledWith("expert");
  });

  it("has accessible label linked to select via id/htmlFor", () => {
    render(
      <ExpertiseLevelSelect
        value="none"
        onChange={vi.fn()}
        label="Domain Knowledge"
      />,
    );
    const label = screen.getByText("Domain Knowledge");
    const trigger = screen.getByLabelText("Domain Knowledge");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("for", trigger.id);
  });

  it("uses custom id when provided", () => {
    render(
      <ExpertiseLevelSelect
        value="none"
        onChange={vi.fn()}
        label="Custom"
        id="my-custom-id"
      />,
    );
    const trigger = screen.getByLabelText("Custom");
    expect(trigger.id).toBe("my-custom-id");
  });
});

// ---------- UrgencyRadio ----------
describe("UrgencyRadio", () => {
  it("renders 3 radio options", () => {
    render(<UrgencyRadio value={null} onChange={vi.fn()} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("calls onChange when a radio is clicked", () => {
    const onChange = vi.fn();
    render(<UrgencyRadio value={null} onChange={onChange} />);

    fireEvent.click(screen.getByRole("radio", { name: /High/i }));
    expect(onChange).toHaveBeenCalledWith("high");
  });

  it("checks the radio matching the current value", () => {
    render(<UrgencyRadio value="medium" onChange={vi.fn()} />);
    const mediumRadio = screen.getByRole("radio", { name: /Medium/i });
    expect(mediumRadio).toHaveAttribute("aria-checked", "true");

    const lowRadio = screen.getByRole("radio", { name: /Low/i });
    expect(lowRadio).toHaveAttribute("aria-checked", "false");
  });

  it("has proper fieldset/legend structure", () => {
    const { container } = render(
      <UrgencyRadio value={null} onChange={vi.fn()} />,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).toBeInTheDocument();
    const legend = container.querySelector("legend");
    expect(legend).toBeInTheDocument();
    expect(legend!.textContent).toBe("Learning Urgency");
  });

  it("shows descriptions for each option", () => {
    render(<UrgencyRadio value={null} onChange={vi.fn()} />);
    expect(screen.getByText("Learning at my own pace")).toBeInTheDocument();
    expect(
      screen.getByText("Want to make steady progress"),
    ).toBeInTheDocument();
    expect(screen.getByText("Need to learn quickly")).toBeInTheDocument();
  });

  it("handles null value (nothing checked)", () => {
    render(<UrgencyRadio value={null} onChange={vi.fn()} />);
    const radios = screen.getAllByRole("radio");
    expect(radios.every((r) => r.getAttribute("aria-checked") !== "true")).toBe(
      true,
    );
  });
});

// ---------- AccessibilityToggles ----------
describe("AccessibilityToggles", () => {
  const defaultValue: AccessibilitySection = {
    screen_reader: false,
    dyslexia_friendly: false,
    color_blind_safe: false,
    cognitive_load_preference: "standard",
    notes: null,
  };

  it("renders 3 toggle switches with labels", () => {
    render(<AccessibilityToggles value={defaultValue} onChange={vi.fn()} />);
    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(3);

    expect(screen.getByText("Screen Reader")).toBeInTheDocument();
    expect(screen.getByText("Dyslexia-Friendly")).toBeInTheDocument();
    expect(screen.getByText("Color Blind Safe")).toBeInTheDocument();
  });

  it("renders descriptions for each toggle", () => {
    render(<AccessibilityToggles value={defaultValue} onChange={vi.fn()} />);
    expect(
      screen.getByText("Optimize content for screen reader users"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Use dyslexia-friendly formatting"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Avoid relying on color alone for information"),
    ).toBeInTheDocument();
  });

  it("calls onChange with updated object when a toggle is clicked", () => {
    const onChange = vi.fn();
    render(<AccessibilityToggles value={defaultValue} onChange={onChange} />);

    const switches = screen.getAllByRole("switch");
    // Click the "Screen Reader" toggle (first switch)
    fireEvent.click(switches[0]);

    expect(onChange).toHaveBeenCalledWith({
      ...defaultValue,
      screen_reader: true,
    });
  });

  it("toggles off when already on", () => {
    const onChange = vi.fn();
    const enabledValue: AccessibilitySection = {
      ...defaultValue,
      dyslexia_friendly: true,
    };
    render(<AccessibilityToggles value={enabledValue} onChange={onChange} />);

    const switches = screen.getAllByRole("switch");
    // Click the "Dyslexia-Friendly" toggle (second switch)
    fireEvent.click(switches[1]);

    expect(onChange).toHaveBeenCalledWith({
      ...enabledValue,
      dyslexia_friendly: false,
    });
  });

  it("toggle buttons have role=switch and aria-checked", () => {
    const mixedValue: AccessibilitySection = {
      ...defaultValue,
      screen_reader: true,
      color_blind_safe: true,
    };
    render(<AccessibilityToggles value={mixedValue} onChange={vi.fn()} />);

    const switches = screen.getAllByRole("switch");
    expect(switches[0]).toHaveAttribute("aria-checked", "true");
    expect(switches[1]).toHaveAttribute("aria-checked", "false");
    expect(switches[2]).toHaveAttribute("aria-checked", "true");
  });

  it("has fieldset/legend structure", () => {
    const { container } = render(
      <AccessibilityToggles value={defaultValue} onChange={vi.fn()} />,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).toBeInTheDocument();
    const legend = container.querySelector("legend");
    expect(legend).toHaveTextContent("Accessibility Options");
  });

  it("preserves other fields in the AccessibilitySection when toggling", () => {
    const onChange = vi.fn();
    const valueWithNotes: AccessibilitySection = {
      ...defaultValue,
      cognitive_load_preference: "reduced",
      notes: "Some accessibility notes",
    };
    render(<AccessibilityToggles value={valueWithNotes} onChange={onChange} />);

    const switches = screen.getAllByRole("switch");
    fireEvent.click(switches[2]); // color_blind_safe

    expect(onChange).toHaveBeenCalledWith({
      ...valueWithNotes,
      color_blind_safe: true,
    });
  });
});

// ---------- NATIVE_LANGUAGE_OPTIONS ----------
describe("NATIVE_LANGUAGE_OPTIONS", () => {
  it("has 20 options (19 languages + Other)", () => {
    expect(NATIVE_LANGUAGE_OPTIONS).toHaveLength(20);
  });

  it("every option has value, label, and hint", () => {
    for (const option of NATIVE_LANGUAGE_OPTIONS) {
      expect(option.value).toBeTruthy();
      expect(option.label).toBeTruthy();
      expect(option.hint).toBeTruthy();
    }
  });

  it("includes common ISO 639-1 codes", () => {
    const values = NATIVE_LANGUAGE_OPTIONS.map((o) => o.value);
    expect(values).toContain("en");
    expect(values).toContain("ur");
    expect(values).toContain("hi");
    expect(values).toContain("ar");
    expect(values).toContain("zh");
    expect(values).toContain("es");
  });

  it("has 'other' as last option", () => {
    const last = NATIVE_LANGUAGE_OPTIONS[NATIVE_LANGUAGE_OPTIONS.length - 1];
    expect(last.value).toBe(NATIVE_LANGUAGE_OTHER_VALUE);
    expect(last.label).toBe("Other");
  });

  it("all values are unique", () => {
    const values = NATIVE_LANGUAGE_OPTIONS.map((o) => o.value);
    expect(new Set(values).size).toBe(values.length);
  });
});
