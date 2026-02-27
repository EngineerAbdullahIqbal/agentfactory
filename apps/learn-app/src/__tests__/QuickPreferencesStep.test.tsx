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

  it('language block hidden when navigator.language is "en-US"', () => {
    Object.defineProperty(navigator, "language", {
      value: "en-US",
      configurable: true,
    });
    renderStep();
    expect(screen.queryByText("Preferred Language")).not.toBeInTheDocument();
  });

  it('language block shown when navigator.language is "fr"', () => {
    Object.defineProperty(navigator, "language", {
      value: "fr",
      configurable: true,
    });
    renderStep();
    expect(screen.getByText("Preferred Language")).toBeInTheDocument();
  });

  it("changing language input calls onChangeDelivery", async () => {
    Object.defineProperty(navigator, "language", {
      value: "fr",
      configurable: true,
    });
    const onChangeDelivery = vi.fn();
    const user = userEvent.setup();
    renderStep({ onChangeDelivery });

    const input = screen.getByLabelText("Preferred Language");
    // Type a single character — the component is controlled so we can only
    // verify that onChangeDelivery is called with the right shape.
    await user.type(input, "x");

    expect(onChangeDelivery).toHaveBeenCalled();
    const lastCall =
      onChangeDelivery.mock.calls[onChangeDelivery.mock.calls.length - 1][0];
    // The component spreads delivery and sets language to e.target.value.
    // Since the input starts with "English" and we typed "x", it appends.
    expect(lastCall).toHaveProperty("language");
    expect(typeof lastCall.language).toBe("string");
    expect(lastCall.language.length).toBeGreaterThan(0);
  });

  it("proficiency options appear when language is not English", () => {
    Object.defineProperty(navigator, "language", {
      value: "fr",
      configurable: true,
    });
    renderStep({ delivery: { language: "French" } });

    expect(screen.getByText("Native")).toBeInTheDocument();
    expect(screen.getByText("Fluent")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("Basic")).toBeInTheDocument();
  });

  it("selecting proficiency calls onChangeDelivery", async () => {
    Object.defineProperty(navigator, "language", {
      value: "fr",
      configurable: true,
    });
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
