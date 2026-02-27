import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { CompletenessBanner } from "@/components/profile/CompletenessBanner";

vi.mock("@docusaurus/useBaseUrl", () => ({
  default: (url: string) => url,
}));

const useLearnerProfileMock = vi.fn();
vi.mock("@/contexts/LearnerProfileContext", () => ({
  useLearnerProfile: () => useLearnerProfileMock(),
}));

const useProfileNudgeVisibilityMock = vi.fn();
vi.mock("@/contexts/ProfileNudgeVisibilityContext", () => ({
  useProfileNudgeVisibility: () => useProfileNudgeVisibilityMock(),
}));

describe("CompletenessBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useProfileNudgeVisibilityMock.mockReturnValue({
      isProfileNudgeVisible: false,
      setIsProfileNudgeVisible: vi.fn(),
    });
  });

  it("renders progress when onboarding is completed", () => {
    useLearnerProfileMock.mockReturnValue({
      profile: {
        learner_id: "u1",
        onboarding_completed: true,
        profile_completeness: 0.26,
      },
    });

    render(<CompletenessBanner />);
    expect(screen.getByText("Profile 26% complete")).toBeInTheDocument();
    expect(screen.getByText("Improve personalization")).toBeInTheDocument();
  });

  it("hides during onboarding when the nudge banner is visible", () => {
    useProfileNudgeVisibilityMock.mockReturnValue({
      isProfileNudgeVisible: true,
      setIsProfileNudgeVisible: vi.fn(),
    });

    useLearnerProfileMock.mockReturnValue({
      profile: {
        learner_id: "u1",
        onboarding_completed: false,
        profile_completeness: 0.26,
      },
    });

    render(<CompletenessBanner hideDuringOnboarding />);
    expect(screen.queryByText("Profile 26% complete")).not.toBeInTheDocument();
  });

  it("shows during onboarding when the nudge banner is not visible", () => {
    useLearnerProfileMock.mockReturnValue({
      profile: {
        learner_id: "u1",
        onboarding_completed: false,
        profile_completeness: 0.26,
      },
    });

    render(<CompletenessBanner hideDuringOnboarding />);
    expect(screen.getByText("Profile 26% complete")).toBeInTheDocument();
    expect(screen.getByText("Continue setup")).toBeInTheDocument();
  });
});
