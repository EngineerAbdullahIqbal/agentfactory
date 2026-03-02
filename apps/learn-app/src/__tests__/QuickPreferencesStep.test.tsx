import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickPreferencesStep } from "@/components/onboarding/QuickPreferencesStep";
import type {
  CommunicationSection,
  DeliverySection,
} from "@/lib/learner-profile-types";

function renderStep(
  overrides: {
    communication?: Partial<CommunicationSection>;
    delivery?: Partial<DeliverySection>;
    onChangeCommunication?: (data: Partial<CommunicationSection>) => void;
    onChangeDelivery?: (data: Partial<DeliverySection>) => void;
  } = {},
) {
  const props = {
    communication: overrides.communication ?? {},
    delivery: overrides.delivery ?? {},
    onChangeCommunication: overrides.onChangeCommunication ?? vi.fn(),
    onChangeDelivery: overrides.onChangeDelivery ?? vi.fn(),
  };
  return render(<QuickPreferencesStep {...props} />);
}

// Save original navigator.language so we can restore it
const originalLanguage = navigator.language;

afterEach(() => {
  Object.defineProperty(navigator, "language", {
    value: originalLanguage,
    configurable: true,
  });
});

describe("QuickPreferencesStep", () => {
  it("renders all 3 radio groups with titles", () => {
    renderStep();
    expect(screen.getByText("Learning Style")).toBeInTheDocument();
    expect(screen.getByText("Detail Level")).toBeInTheDocument();
    expect(screen.getByText("Tone")).toBeInTheDocument();
  });

  it("selecting a radio option calls onChangeCommunication", async () => {
    const onChangeCommunication = vi.fn();
    const user = userEvent.setup();
    renderStep({ onChangeCommunication });

    // Click the label for "Theory first"
    await user.click(screen.getByText("Theory first"));
    expect(onChangeCommunication).toHaveBeenCalledWith(
      expect.objectContaining({ preferred_structure: "theory-first" }),
    );
  });

  it("language block always visible regardless of navigator.language", () => {
    Object.defineProperty(navigator, "language", {
      value: "en-US",
      configurable: true,
    });
    renderStep();
    expect(screen.getByText("Preferred Language")).toBeInTheDocument();
    expect(screen.getByText("Native Language")).toBeInTheDocument();
    expect(screen.getByText("Preferred Code Language")).toBeInTheDocument();
  });

  it("changing language input calls onChangeDelivery", async () => {
    const onChangeDelivery = vi.fn();
    const user = userEvent.setup();
    renderStep({ onChangeDelivery });

    const input = screen.getByLabelText("Preferred Language");
    await user.type(input, "x");

    expect(onChangeDelivery).toHaveBeenCalled();
    const lastCall =
      onChangeDelivery.mock.calls[onChangeDelivery.mock.calls.length - 1][0];
    expect(lastCall).toHaveProperty("language");
    expect(typeof lastCall.language).toBe("string");
    expect(lastCall.language.length).toBeGreaterThan(0);
  });

  it("proficiency options appear when language is not English", () => {
    renderStep({ delivery: { language: "French" } });

    expect(screen.getByText("Native")).toBeInTheDocument();
    expect(screen.getByText("Fluent")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("Basic")).toBeInTheDocument();
  });

  it("selecting proficiency calls onChangeDelivery", async () => {
    const onChangeDelivery = vi.fn();
    const user = userEvent.setup();
    renderStep({
      delivery: { language: "French" },
      onChangeDelivery,
    });

    await user.click(screen.getByText("Fluent"));
    expect(onChangeDelivery).toHaveBeenCalledWith(
      expect.objectContaining({ language_proficiency: "fluent" }),
    );
  });

  it("native language select renders all options", () => {
    renderStep();
    // The select trigger should exist
    expect(screen.getByLabelText("Native Language")).toBeInTheDocument();
  });

  it("preferred code language select renders", () => {
    renderStep();
    expect(
      screen.getByLabelText("Preferred Code Language"),
    ).toBeInTheDocument();
  });

  it("toggling summaries calls onChangeCommunication", async () => {
    const onChangeCommunication = vi.fn();
    const user = userEvent.setup();
    renderStep({ onChangeCommunication });

    await user.click(screen.getByLabelText("Include summaries"));
    expect(onChangeCommunication).toHaveBeenCalledWith(
      expect.objectContaining({ wants_summaries: false }),
    );
  });

  it("toggling check-in questions calls onChangeCommunication", async () => {
    const onChangeCommunication = vi.fn();
    const user = userEvent.setup();
    renderStep({ onChangeCommunication });

    await user.click(screen.getByLabelText("Check-in questions"));
    expect(onChangeCommunication).toHaveBeenCalledWith(
      expect.objectContaining({ wants_check_in_questions: false }),
    );
  });
});
