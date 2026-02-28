import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OnboardingWizard from "@/components/onboarding/OnboardingWizard";
import { LearnerProfileProvider } from "@/contexts/LearnerProfileContext";
import type { ProfileResponse } from "@/lib/learner-profile-types";

const mockSession = { user: { id: "test-user" } };
let currentSession: typeof mockSession | null = mockSession;

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    session: currentSession,
    isLoading: false,
    signOut: vi.fn(),
    refreshUserData: vi.fn(),
  })),
}));

vi.mock("@/contexts/ProgressContext", () => ({
  useProgress: vi.fn(() => ({
    refreshProgress: vi.fn(),
  })),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn() },
}));

const mockGetMyProfileOrNull = vi.fn();
const mockCreateProfile = vi.fn();
const mockUpdateMyProfile = vi.fn();
const mockUpdateSection = vi.fn();
const mockCompleteOnboardingPhase = vi.fn();
const mockGetCompleteness = vi.fn();

vi.mock("@/lib/learner-profile-api", () => ({
  getMyProfileOrNull: (...args: unknown[]) => mockGetMyProfileOrNull(...args),
  createProfile: (...args: unknown[]) => mockCreateProfile(...args),
  updateMyProfile: (...args: unknown[]) => mockUpdateMyProfile(...args),
  updateSection: (...args: unknown[]) => mockUpdateSection(...args),
  completeOnboardingPhase: (...args: unknown[]) =>
    mockCompleteOnboardingPhase(...args),
  getCompleteness: (...args: unknown[]) => mockGetCompleteness(...args),
}));

function makeProfile(
  overrides: Partial<ProfileResponse> = {},
): ProfileResponse {
  return {
    learner_id: "test-user",
    name: null,
    profile_version: "1.2",
    consent_given: true,
    consent_date: "2026-01-01T00:00:00Z",
    expertise: {
      domain: [],
      programming: { level: "beginner", languages: [], notes: null },
      ai_fluency: { level: "beginner", notes: null },
      business: { level: "beginner", notes: null },
      subject_specific: {
        topics_already_mastered: [],
        topics_partially_known: [],
        known_misconceptions: [],
      },
    },
    professional_context: {
      current_role: null,
      industry: null,
      organization_type: null,
      team_context: null,
      real_projects: [],
      tools_in_use: [],
      constraints: null,
    },
    goals: {
      primary_learning_goal: null,
      secondary_goals: [],
      urgency: null,
      urgency_note: null,
      career_goal: null,
      immediate_application: null,
    },
    communication: {
      language_complexity: null,
      preferred_structure: null,
      verbosity: null,
      analogy_domain: null,
      tone: null,
      wants_summaries: null,
      wants_check_in_questions: null,
      format_notes: null,
    },
    delivery: {
      output_format: null,
      target_length: null,
      include_code_samples: null,
      code_verbosity: null,
      include_visual_descriptions: null,
      language: "English",
      language_proficiency: null,
    },
    accessibility: {
      screen_reader: false,
      cognitive_load_preference: "standard",
      color_blind_safe: false,
      dyslexia_friendly: false,
      notes: null,
    },
    onboarding_completed: false,
    onboarding_sections_completed: {},
    onboarding_progress: 0,
    profile_completeness: 0.0,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function renderWizard() {
  return render(
    <LearnerProfileProvider>
      <OnboardingWizard />
    </LearnerProfileProvider>,
  );
}

describe("OnboardingWizard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    currentSession = { user: { id: "test-user" } };

    mockGetCompleteness.mockResolvedValue({
      learner_id: "test-user",
      profile_completeness: 0.5,
      onboarding_progress: 1,
      per_section: {},
      highest_impact_missing: [],
    });
  });

  it("shows Welcome step when profile does not exist", async () => {
    const user = userEvent.setup();
    mockGetMyProfileOrNull.mockResolvedValue(null);

    renderWizard();

    expect(
      await screen.findByText("Set up your Learner Profile"),
    ).toBeInTheDocument();

    const agreeBtn = screen.getByRole("button", { name: /Agree & continue/i });
    expect(agreeBtn).toBeDisabled();

    await user.click(screen.getByLabelText(/I agree to store my profile/i));

    expect(agreeBtn).toBeEnabled();
  });

  it("creates profile on consent and moves to Goals step", async () => {
    const user = userEvent.setup();
    const created = makeProfile();
    mockGetMyProfileOrNull.mockResolvedValue(null);
    mockCreateProfile.mockResolvedValue(created);

    renderWizard();

    await screen.findByText("Set up your Learner Profile");

    await user.click(screen.getByLabelText(/I agree to store my profile/i));
    await user.click(screen.getByRole("button", { name: /Agree & continue/i }));

    await waitFor(() => {
      expect(mockCreateProfile).toHaveBeenCalledWith("http://localhost:8004", {
        consent_given: true,
      });
    });

    expect(
      await screen.findByText("What brings you here?"),
    ).toBeInTheDocument();
  });

  it("Continue on Goals saves sparse patch and advances to Expertise", async () => {
    const user = userEvent.setup();
    const existing = makeProfile();
    mockGetMyProfileOrNull.mockResolvedValue(existing);
    mockCompleteOnboardingPhase.mockResolvedValue(existing);

    renderWizard();

    await screen.findByText("What brings you here?");

    fireEvent.change(screen.getByLabelText("What do you want to achieve?"), {
      target: { value: "Build a customer support AI agent" },
    });

    await user.click(screen.getByRole("button", { name: /save & continue/i }));

    await waitFor(() => {
      expect(mockCompleteOnboardingPhase).toHaveBeenCalledWith(
        "http://localhost:8004",
        "goals",
        { primary_learning_goal: "Build a customer support AI agent" },
      );
    });

    expect(
      await screen.findByText("Where are you starting from?"),
    ).toBeInTheDocument();
  });

  it("resumes at correct step when profile has partial onboarding", async () => {
    // Goals and expertise completed, next is professional_context
    const existing = makeProfile({
      onboarding_sections_completed: {
        goals: true,
        expertise: true,
        professional_context: false,
        accessibility: false,
        communication_preferences: false,
        ai_enrichment: false,
      },
    });
    mockGetMyProfileOrNull.mockResolvedValue(existing);

    renderWizard();

    // Should show the Professional Context step (not Goals or Welcome)
    expect(
      await screen.findByText("Ground it in your world"),
    ).toBeInTheDocument();
  });

  it("Skip for now marks the phase complete without sending data", async () => {
    const user = userEvent.setup();
    const existing = makeProfile();
    mockGetMyProfileOrNull.mockResolvedValue(existing);
    mockCompleteOnboardingPhase.mockResolvedValue(existing);

    renderWizard();

    await screen.findByText("What brings you here?");

    await user.click(
      screen.getByRole("button", { name: /Skip to next step/i }),
    );

    await waitFor(() => {
      expect(mockCompleteOnboardingPhase).toHaveBeenCalledWith(
        "http://localhost:8004",
        "goals",
        undefined,
      );
    });

    expect(
      await screen.findByText("Where are you starting from?"),
    ).toBeInTheDocument();
  });
});
