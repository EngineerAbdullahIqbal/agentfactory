import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { useStudyModeAPI } from "@/components/TeachMePanel/useStudyModeAPI";

// Mock StudyModeContext
const mockAddMessage = vi.fn();
const mockSetLoading = vi.fn();
const mockSetError = vi.fn();
vi.mock("@/contexts/StudyModeContext", () => ({
  useStudyMode: vi.fn(() => ({
    mode: "teach" as const,
    getCurrentConversation: vi.fn(() => ({ messages: [] })),
    addMessage: mockAddMessage,
    setLoading: mockSetLoading,
    setError: mockSetError,
  })),
}));

// Mock LearnerProfileContext
const mockProfile = {
  learner_id: "test-user",
  name: null,
  profile_version: "1.0",
  consent_given: true,
  consent_date: null,
  expertise: {
    domain: [],
    programming: { level: "intermediate", languages: ["python"], notes: null },
    ai_ml: { level: "beginner", notes: null },
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
    primary_learning_goal: "Build AI agents",
    secondary_goals: [],
    urgency: "medium" as const,
    urgency_note: null,
    career_goal: null,
    immediate_application: null,
  },
  communication: {
    language_complexity: "professional" as const,
    preferred_structure: null,
    verbosity: "moderate" as const,
    tone: "conversational" as const,
    wants_summaries: null,
    wants_check_in_questions: null,
    format_notes: null,
    analogy_domain: null,
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
    cognitive_load_preference: "standard" as const,
    color_blind_safe: false,
    dyslexia_friendly: false,
    notes: null,
  },
  onboarding_completed: true,
  onboarding_progress: 100,
  profile_completeness: 45,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

let mockProfileValue: typeof mockProfile | null = mockProfile;

vi.mock("@/contexts/LearnerProfileContext", () => ({
  useLearnerProfile: vi.fn(() => ({
    profile: mockProfileValue,
    isLoading: false,
    needsOnboarding: false,
    refreshProfile: vi.fn(),
    updateProfile: vi.fn(),
    updateSection: vi.fn(),
    completeOnboardingPhase: vi.fn(),
    createNewProfile: vi.fn(),
    ensureProfileLoaded: vi.fn(),
  })),
}));

describe("useStudyModeAPI profile integration", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          assistantMessage: "Hello!",
          metadata: { model: "test", tokensUsed: 100, processingTimeMs: 50 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    mockProfileValue = mockProfile;
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("includes learner profile in chat request when profile exists", async () => {
    const { result } = renderHook(() => useStudyModeAPI());

    await act(async () => {
      await result.current.sendMessage("/test/lesson", "Hello");
    });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [, options] = fetchSpy.mock.calls[0];
    const body = JSON.parse(options!.body as string);
    expect(body.learnerProfile).toBeDefined();
    expect(body.learnerProfile.expertise_level).toBe("intermediate");
    expect(body.learnerProfile.communication_prefs.verbosity).toBe("moderate");
    expect(body.learnerProfile.communication_prefs.tone).toBe("conversational");
    expect(body.learnerProfile.accessibility.screen_reader).toBe(false);
    expect(body.learnerProfile.accessibility.cognitive_load_preference).toBe(
      "standard",
    );
  });

  it("does not include learner profile when profile is null", async () => {
    mockProfileValue = null;
    // Re-mock to return null
    const { useLearnerProfile } = await import(
      "@/contexts/LearnerProfileContext"
    );
    (useLearnerProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: null,
      isLoading: false,
      needsOnboarding: true,
      refreshProfile: vi.fn(),
      updateProfile: vi.fn(),
      updateSection: vi.fn(),
      completeOnboardingPhase: vi.fn(),
      createNewProfile: vi.fn(),
      ensureProfileLoaded: vi.fn(),
    });

    const { result } = renderHook(() => useStudyModeAPI());

    await act(async () => {
      await result.current.sendMessage("/test/lesson", "Hello");
    });

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [, options] = fetchSpy.mock.calls[0];
    const body = JSON.parse(options!.body as string);
    expect(body.learnerProfile).toBeUndefined();
  });
});
