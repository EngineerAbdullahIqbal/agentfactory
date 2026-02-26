import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import {
  LearnerProfileProvider,
  useLearnerProfile,
} from "@/contexts/LearnerProfileContext";
import type { ProfileResponse } from "@/lib/learner-profile-types";

// Mock AuthContext
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

// Mock the API module
const mockGetMyProfileOrNull = vi.fn();
const mockCreateProfile = vi.fn();
const mockUpdateMyProfile = vi.fn();
const mockApiUpdateSection = vi.fn();
const mockApiCompleteOnboardingPhase = vi.fn();

vi.mock("@/lib/learner-profile-api", () => ({
  getMyProfileOrNull: (...args: unknown[]) => mockGetMyProfileOrNull(...args),
  createProfile: (...args: unknown[]) => mockCreateProfile(...args),
  updateMyProfile: (...args: unknown[]) => mockUpdateMyProfile(...args),
  updateSection: (...args: unknown[]) => mockApiUpdateSection(...args),
  completeOnboardingPhase: (...args: unknown[]) =>
    mockApiCompleteOnboardingPhase(...args),
}));

const mockProfile: ProfileResponse = {
  learner_id: "test-user",
  name: "Test User",
  profile_version: "1.0",
  consent_given: true,
  consent_date: "2026-01-01T00:00:00Z",
  expertise: {
    domain: [],
    programming: { level: "beginner", languages: [], notes: null },
    ai_ml: { level: "none", notes: null },
    business: { level: "none", notes: null },
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
  onboarding_progress: 0,
  profile_completeness: 0.1,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// Test consumer component that displays context state
function TestConsumer() {
  const { profile, isLoading, needsOnboarding } = useLearnerProfile();
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="needs-onboarding">{String(needsOnboarding)}</span>
      <span data-testid="profile-name">{profile?.name ?? "none"}</span>
    </div>
  );
}

// Consumer with mutation actions
function MutationConsumer() {
  const { profile, updateProfile, updateSection, createNewProfile } =
    useLearnerProfile();
  return (
    <div>
      <span data-testid="profile-name">{profile?.name ?? "none"}</span>
      <button
        data-testid="update-profile"
        onClick={() => updateProfile({ name: "Updated" })}
      />
      <button
        data-testid="update-section"
        onClick={() =>
          updateSection("goals", { primary_learning_goal: "Learn AI" })
        }
      />
      <button
        data-testid="create-profile"
        onClick={() => createNewProfile({ consent_given: true })}
      />
    </div>
  );
}

describe("LearnerProfileContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentSession = { user: { id: "test-user" } };
    mockGetMyProfileOrNull.mockResolvedValue(mockProfile);
  });

  it("does not fetch until context is consumed (lazy-fetch)", async () => {
    // Render just the provider with no consumer
    render(
      <LearnerProfileProvider>
        <div data-testid="child">hello</div>
      </LearnerProfileProvider>,
    );

    expect(screen.getByTestId("child")).toHaveTextContent("hello");
    // API should NOT be called — no consumer triggered it
    expect(mockGetMyProfileOrNull).not.toHaveBeenCalled();
  });

  it("fetches profile when context is consumed", async () => {
    render(
      <LearnerProfileProvider>
        <TestConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(mockGetMyProfileOrNull).toHaveBeenCalledWith(
        "http://localhost:8004",
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("Test User");
    });
  });

  it("sets needsOnboarding=true when GET /me returns null (404)", async () => {
    mockGetMyProfileOrNull.mockResolvedValue(null);

    render(
      <LearnerProfileProvider>
        <TestConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("needs-onboarding")).toHaveTextContent("true");
    });
  });

  it("sets needsOnboarding=false when profile exists", async () => {
    render(
      <LearnerProfileProvider>
        <TestConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("needs-onboarding")).toHaveTextContent("false");
    });
  });

  it("updates profile state from mutation response (no extra fetch)", async () => {
    const updatedProfile = { ...mockProfile, name: "Updated" };
    mockUpdateMyProfile.mockResolvedValue(updatedProfile);

    render(
      <LearnerProfileProvider>
        <MutationConsumer />
      </LearnerProfileProvider>,
    );

    // Wait for initial fetch
    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("Test User");
    });

    // Clear call count
    mockGetMyProfileOrNull.mockClear();

    // Trigger mutation
    await act(async () => {
      screen.getByTestId("update-profile").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("Updated");
    });

    // No additional fetch after mutation
    expect(mockGetMyProfileOrNull).not.toHaveBeenCalled();
  });

  it("updates profile state from updateSection response", async () => {
    const updatedProfile = {
      ...mockProfile,
      goals: { ...mockProfile.goals, primary_learning_goal: "Learn AI" },
    };
    mockApiUpdateSection.mockResolvedValue(updatedProfile);

    render(
      <LearnerProfileProvider>
        <MutationConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("Test User");
    });

    mockGetMyProfileOrNull.mockClear();

    await act(async () => {
      screen.getByTestId("update-section").click();
    });

    // No extra fetch
    expect(mockGetMyProfileOrNull).not.toHaveBeenCalled();
  });

  it("prevents duplicate concurrent fetches via fetchingRef", async () => {
    // Make the fetch slow so two consumers could race
    let resolvePromise: (v: ProfileResponse | null) => void;
    mockGetMyProfileOrNull.mockImplementation(
      () =>
        new Promise<ProfileResponse | null>((resolve) => {
          resolvePromise = resolve;
        }),
    );

    function DualConsumer() {
      useLearnerProfile();
      useLearnerProfile();
      return <div data-testid="dual">ok</div>;
    }

    render(
      <LearnerProfileProvider>
        <DualConsumer />
      </LearnerProfileProvider>,
    );

    // Only one API call despite two consumers
    expect(mockGetMyProfileOrNull).toHaveBeenCalledTimes(1);

    // Resolve the pending promise
    await act(async () => {
      resolvePromise!(mockProfile);
    });
  });

  it("clears profile state on sign-out (session becomes null)", async () => {
    const { rerender } = render(
      <LearnerProfileProvider>
        <TestConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("Test User");
    });

    // Simulate sign-out
    currentSession = null;

    rerender(
      <LearnerProfileProvider>
        <TestConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("none");
      expect(screen.getByTestId("needs-onboarding")).toHaveTextContent("false");
    });
  });

  it("createNewProfile updates state from response", async () => {
    mockGetMyProfileOrNull.mockResolvedValue(null);
    const createdProfile = { ...mockProfile, name: "New User" };
    mockCreateProfile.mockResolvedValue(createdProfile);

    render(
      <LearnerProfileProvider>
        <MutationConsumer />
      </LearnerProfileProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("none");
    });

    await act(async () => {
      screen.getByTestId("create-profile").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("profile-name")).toHaveTextContent("New User");
    });
  });
});
