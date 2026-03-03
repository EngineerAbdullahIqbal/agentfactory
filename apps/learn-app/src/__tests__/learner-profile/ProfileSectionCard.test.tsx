import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProfileSectionCard } from "@/components/profile/ProfileSectionCard";
import type { ProfileResponse } from "@/lib/learner-profile-types";

// Mock AuthContext
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    session: { user: { id: "test-user" } },
    isLoading: false,
    signOut: vi.fn(),
    refreshUserData: vi.fn(),
  })),
}));

// Mock Docusaurus context
vi.mock("@docusaurus/useDocusaurusContext", () => ({
  default: () => ({
    siteConfig: { customFields: { learnerProfileApiUrl: "http://test:8004" } },
  }),
}));

// Mock LearnerProfileContext
const mockUpdateSection = vi.fn();
const mockProfile: ProfileResponse = {
  learner_id: "test-user",
  name: "Test User",
  profile_version: "1.0",
  consent_given: true,
  consent_date: "2026-01-01T00:00:00Z",
  expertise: {
    domain: [],
    programming: { level: "beginner", languages: [], notes: null },
    ai_fluency: { level: "none", notes: null },
    business: { level: "none", notes: null },
    subject_specific: {
      topics_already_mastered: [],
      topics_partially_known: [],
      known_misconceptions: [],
    },
  },
  professional_context: {
    current_role: "Developer",
    industry: "Tech",
    organization_type: "startup",
    team_context: null,
    real_projects: [],
    tools_in_use: [],
    constraints: null,
  },
  goals: {
    primary_learning_goal: "Learn AI agents",
    secondary_goals: [],
    urgency: "medium",
    urgency_note: null,
    career_goal: null,
    immediate_application: null,
  },
  communication: {
    language_complexity: "professional",
    preferred_structure: "examples-first",
    verbosity: "moderate",
    analogy_domain: null,
    tone: "conversational",
    wants_summaries: null,
    wants_check_in_questions: null,
    format_notes: null,
  },
  delivery: {
    output_format: "structured-with-headers",
    target_length: "medium",
    include_code_samples: null,
    code_verbosity: "annotated",
    include_visual_descriptions: null,
    language: "en",
    language_proficiency: null,
    native_language: null,
    preferred_code_language: null,
  },
  accessibility: {
    screen_reader: false,
    cognitive_load_preference: "standard",
    color_blind_safe: false,
    dyslexia_friendly: false,
    notes: null,
  },
  onboarding_completed: true,
  onboarding_sections_completed: {},
  onboarding_progress: 100,
  profile_completeness: 65,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

vi.mock("@/contexts/LearnerProfileContext", () => ({
  useLearnerProfile: vi.fn(() => ({
    profile: mockProfile,
    isLoading: false,
    needsOnboarding: false,
    refreshProfile: vi.fn(),
    updateProfile: vi.fn(),
    updateSection: mockUpdateSection,
    completeOnboardingPhase: vi.fn(),
    createNewProfile: vi.fn(),
    ensureProfileLoaded: vi.fn(),
  })),
}));

// Simple View and Edit test components
function TestView({ data }: { data: unknown }) {
  const d = data as { primary_learning_goal?: string };
  return <div data-testid="view">{d?.primary_learning_goal || "empty"}</div>;
}

function TestEdit({
  data,
  onChange,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  const d = data as { primary_learning_goal?: string };
  return (
    <input
      data-testid="edit-input"
      value={d?.primary_learning_goal || ""}
      onChange={(e) => onChange({ ...d, primary_learning_goal: e.target.value })}
    />
  );
}

describe("ProfileSectionCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders view mode by default with section label and description", () => {
    render(
      <ProfileSectionCard
        section="goals"
        ViewComponent={TestView}
        EditComponent={TestEdit}
      />,
    );
    expect(screen.getByText("Goals & Motivation")).toBeInTheDocument();
    expect(
      screen.getByText("What you want to learn and why"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("view")).toBeInTheDocument();
    expect(screen.getByText("Learn AI agents")).toBeInTheDocument();
  });

  it("switches to edit mode on Edit click", () => {
    render(
      <ProfileSectionCard
        section="goals"
        ViewComponent={TestView}
        EditComponent={TestEdit}
      />,
    );
    fireEvent.click(screen.getByLabelText("Edit Goals & Motivation"));
    expect(screen.getByTestId("edit-input")).toBeInTheDocument();
  });

  it("cancels edit and reverts to view mode", () => {
    render(
      <ProfileSectionCard
        section="goals"
        ViewComponent={TestView}
        EditComponent={TestEdit}
      />,
    );
    fireEvent.click(screen.getByLabelText("Edit Goals & Motivation"));
    expect(screen.getByTestId("edit-input")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByTestId("view")).toBeInTheDocument();
    expect(screen.queryByTestId("edit-input")).not.toBeInTheDocument();
  });

  it("saves changes and returns to view mode on success", async () => {
    mockUpdateSection.mockResolvedValueOnce(mockProfile);
    render(
      <ProfileSectionCard
        section="goals"
        ViewComponent={TestView}
        EditComponent={TestEdit}
      />,
    );
    fireEvent.click(screen.getByLabelText("Edit Goals & Motivation"));
    fireEvent.change(screen.getByTestId("edit-input"), {
      target: { value: "New goal" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(mockUpdateSection).toHaveBeenCalledWith("goals", {
        primary_learning_goal: "New goal",
        secondary_goals: [],
        urgency: "medium",
        urgency_note: null,
        career_goal: null,
        immediate_application: null,
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("view")).toBeInTheDocument();
    });
  });

  it("shows error message on save failure and keeps edit mode open", async () => {
    mockUpdateSection.mockRejectedValueOnce(
      new Error("Validation failed: invalid field"),
    );
    render(
      <ProfileSectionCard
        section="goals"
        ViewComponent={TestView}
        EditComponent={TestEdit}
      />,
    );
    fireEvent.click(screen.getByLabelText("Edit Goals & Motivation"));
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Validation failed: invalid field");
    });

    // Edit mode should still be open
    expect(screen.getByTestId("edit-input")).toBeInTheDocument();
  });

  it("shows Saving… text while save is in progress", async () => {
    let resolveUpdate: (value: ProfileResponse) => void;
    mockUpdateSection.mockReturnValueOnce(
      new Promise<ProfileResponse>((resolve) => {
        resolveUpdate = resolve;
      }),
    );

    render(
      <ProfileSectionCard
        section="goals"
        ViewComponent={TestView}
        EditComponent={TestEdit}
      />,
    );
    fireEvent.click(screen.getByLabelText("Edit Goals & Motivation"));
    fireEvent.click(screen.getByText("Save Changes"));

    expect(screen.getByText("Saving…")).toBeInTheDocument();

    // Resolve the promise
    resolveUpdate!(mockProfile);
    await waitFor(() => {
      expect(screen.queryByText("Saving…")).not.toBeInTheDocument();
    });
  });
});
