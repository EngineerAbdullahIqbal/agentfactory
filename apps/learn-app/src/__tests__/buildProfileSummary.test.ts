import { describe, it, expect } from "vitest";
import { buildProfileSummary } from "@/lib/buildProfileSummary";
import type { ProfileResponse } from "@/lib/learner-profile-types";

function makeProfile(
  overrides: Partial<ProfileResponse> = {},
): ProfileResponse {
  return {
    learner_id: "test-id",
    name: "Test User",
    profile_version: "1.0",
    consent_given: true,
    consent_date: "2026-01-01",
    expertise: {
      domain: [
        {
          level: "intermediate",
          domain_name: "web-dev",
          is_primary: true,
          notes: null,
        },
      ],
      programming: {
        level: "advanced",
        languages: ["python", "typescript"],
        notes: null,
      },
      ai_fluency: { level: "beginner", notes: null },
      business: { level: "none", notes: null },
      subject_specific: {
        topics_already_mastered: [],
        topics_partially_known: [],
        known_misconceptions: [],
      },
    },
    professional_context: {
      current_role: "Software Engineer",
      industry: "Tech",
      organization_type: "startup",
      team_context: null,
      real_projects: [],
      tools_in_use: ["vscode", "docker"],
      constraints: null,
    },
    goals: {
      primary_learning_goal: "Build AI agents",
      secondary_goals: [],
      urgency: "medium",
      urgency_note: null,
      career_goal: null,
      immediate_application: "automate workflows",
    },
    communication: {
      language_complexity: "technical",
      preferred_structure: "examples-first",
      verbosity: "moderate",
      analogy_domain: "cooking",
      tone: "peer-to-peer",
      wants_summaries: true,
      wants_check_in_questions: false,
      format_notes: null,
    },
    delivery: {
      output_format: "structured-with-headers",
      target_length: "medium",
      include_code_samples: true,
      code_verbosity: "annotated",
      include_visual_descriptions: false,
      language: "English",
      language_proficiency: "native",
      native_language: "ur",
      preferred_code_language: "Python",
    },
    accessibility: {
      screen_reader: false,
      cognitive_load_preference: "standard",
      color_blind_safe: false,
      dyslexia_friendly: true,
      notes: null,
    },
    onboarding_completed: true,
    onboarding_sections_completed: {},
    onboarding_progress: 100,
    profile_completeness: 90,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

describe("buildProfileSummary", () => {
  it("returns undefined for null profile", () => {
    expect(buildProfileSummary(null)).toBeUndefined();
  });

  it("maps expertise_level from programming.level", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.expertise_level).toBe("advanced");
  });

  it("maps communication_prefs fields", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.communication_prefs).toEqual({
      language_complexity: "technical",
      verbosity: "moderate",
      tone: "peer-to-peer",
      preferred_structure: "examples-first",
      analogy_domain: "cooking",
    });
  });

  it("maps accessibility fields", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.accessibility).toEqual({
      screen_reader: false,
      cognitive_load_preference: "standard",
      dyslexia_friendly: true,
    });
  });

  it("maps goals fields (including immediate_application)", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.goals).toEqual({
      primary_learning_goal: "Build AI agents",
      immediate_application: "automate workflows",
    });
  });

  it("maps expertise fields (including programming_languages)", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.expertise).toEqual({
      programming_level: "advanced",
      programming_languages: ["python", "typescript"],
      ai_fluency_level: "beginner",
      domain_name: "web-dev",
      domain_level: "intermediate",
    });
  });

  it("maps professional fields (including tools_in_use)", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.professional).toEqual({
      current_role: "Software Engineer",
      tools_in_use: ["vscode", "docker"],
    });
  });

  it("maps delivery fields", () => {
    const result = buildProfileSummary(makeProfile());
    expect(result?.delivery).toEqual({
      language: "English",
      language_proficiency: "native",
      code_verbosity: "annotated",
      native_language: "ur",
      preferred_code_language: "Python",
    });
  });

  it("maps delivery fields with null native_language and preferred_code_language", () => {
    const result = buildProfileSummary(
      makeProfile({
        delivery: {
          output_format: "structured-with-headers",
          target_length: "medium",
          include_code_samples: true,
          code_verbosity: "annotated",
          include_visual_descriptions: false,
          language: "English",
          language_proficiency: "native",
          native_language: null,
          preferred_code_language: null,
        },
      }),
    );
    expect(result?.delivery?.native_language).toBeNull();
    expect(result?.delivery?.preferred_code_language).toBeNull();
  });

  it("handles missing nested objects gracefully (no crash on undefined sections)", () => {
    const sparse = makeProfile({
      expertise: {
        domain: [],
        programming: { level: "none", languages: [], notes: null },
        ai_fluency: { level: "none", notes: null },
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
    });

    const result = buildProfileSummary(sparse);
    expect(result).toBeDefined();
    expect(result?.expertise?.domain_name).toBeUndefined();
    expect(result?.expertise?.domain_level).toBeUndefined();
    expect(result?.goals?.primary_learning_goal).toBeNull();
    expect(result?.professional?.current_role).toBeNull();
  });
});
