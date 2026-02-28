import { describe, it, expect, beforeEach, vi } from "vitest";
import { ApiError } from "@/lib/api-utils";
import {
  createProfile,
  getMyProfile,
  getMyProfileOrNull,
  updateMyProfile,
  updateSection,
  completeOnboardingPhase,
  getCompleteness,
  deleteMyProfile,
  gdprEraseMyProfile,
  syncFromPhm,
} from "@/lib/learner-profile-api";

const BASE_URL = "http://localhost:8004";

const mockProfile = {
  learner_id: "user-1",
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

function mockFetchResponse(body: unknown, status = 200) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

function mockFetchError(
  status: number,
  errorBody?: { error: string; message: string },
  headers?: Record<string, string>,
) {
  const headerMap = new Map(Object.entries(headers || {}));
  return vi.fn().mockResolvedValue({
    ok: false,
    status,
    headers: { get: (key: string) => headerMap.get(key) ?? null },
    json: () =>
      errorBody
        ? Promise.resolve(errorBody)
        : Promise.reject(new Error("no body")),
  });
}

describe("learner-profile-api", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    localStorage.setItem("ainative_id_token", "test-token");
  });

  describe("createProfile", () => {
    it("sends POST with body and returns profile", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile, 201);
      const result = await createProfile(BASE_URL, { consent_given: true });
      expect(result).toEqual(mockProfile);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "Bearer test-token",
          }),
        }),
      );
    });

    it("throws ApiError on 409 conflict", async () => {
      globalThis.fetch = mockFetchError(409, {
        error: "profile_exists",
        message: "Profile already exists",
      });
      await expect(createProfile(BASE_URL, {})).rejects.toThrow(ApiError);
      try {
        await createProfile(BASE_URL, {});
      } catch (e) {
        expect((e as ApiError).status).toBe(409);
        expect((e as ApiError).code).toBe("profile_exists");
      }
    });
  });

  describe("getMyProfile", () => {
    it("sends GET and returns profile", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      const result = await getMyProfile(BASE_URL);
      expect(result).toEqual(mockProfile);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-token",
          }),
        }),
      );
    });

    it("throws ApiError on 404", async () => {
      globalThis.fetch = mockFetchError(404, {
        error: "profile_not_found",
        message: "Profile not found",
      });
      await expect(getMyProfile(BASE_URL)).rejects.toThrow(ApiError);
    });
  });

  describe("getMyProfileOrNull", () => {
    it("returns profile when it exists", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      const result = await getMyProfileOrNull(BASE_URL);
      expect(result).toEqual(mockProfile);
    });

    it("returns null on 404", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: () =>
          Promise.resolve({
            error: "profile_not_found",
            message: "Not found",
          }),
      });
      const result = await getMyProfileOrNull(BASE_URL);
      expect(result).toBeNull();
    });

    it("throws on non-404 errors (500)", async () => {
      globalThis.fetch = mockFetchError(500, {
        error: "internal_error",
        message: "Server error",
      });
      await expect(getMyProfileOrNull(BASE_URL)).rejects.toThrow(ApiError);
    });
  });

  describe("updateMyProfile", () => {
    it("sends PATCH with body and returns updated profile", async () => {
      const updated = { ...mockProfile, name: "Updated" };
      globalThis.fetch = mockFetchResponse(updated);
      const result = await updateMyProfile(BASE_URL, { name: "Updated" });
      expect(result.name).toBe("Updated");
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me`,
        expect.objectContaining({ method: "PATCH" }),
      );
    });

    it("throws ApiError on 422 validation error", async () => {
      globalThis.fetch = mockFetchError(422, {
        error: "validation_error",
        message: "Invalid data",
      });
      await expect(updateMyProfile(BASE_URL, {})).rejects.toThrow(ApiError);
      try {
        await updateMyProfile(BASE_URL, {});
      } catch (e) {
        expect((e as ApiError).status).toBe(422);
      }
    });
  });

  describe("updateSection", () => {
    it("sends PATCH to section endpoint", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      const result = await updateSection(BASE_URL, "goals", {
        primary_learning_goal: "Learn AI",
      });
      expect(result).toEqual(mockProfile);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me/sections/goals`,
        expect.objectContaining({ method: "PATCH" }),
      );
    });
  });

  describe("completeOnboardingPhase", () => {
    it("sends PATCH to onboarding phase endpoint with data", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      const result = await completeOnboardingPhase(BASE_URL, "goals", {
        primary_learning_goal: "Build agents",
      });
      expect(result).toEqual(mockProfile);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me/onboarding/goals`,
        expect.objectContaining({
          method: "PATCH",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("sends PATCH without body when no data provided", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      await completeOnboardingPhase(BASE_URL, "ai_enrichment");
      const call = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(call[1].body).toBeUndefined();
    });
  });

  describe("getCompleteness", () => {
    it("returns completeness data", async () => {
      const data = {
        learner_id: "user-1",
        profile_completeness: 0.5,
        onboarding_progress: 0.8,
        per_section: { goals: 1.0, expertise: 0.3 },
        highest_impact_missing: ["expertise"],
      };
      globalThis.fetch = mockFetchResponse(data);
      const result = await getCompleteness(BASE_URL);
      expect(result).toEqual(data);
    });
  });

  describe("deleteMyProfile", () => {
    it("sends DELETE and handles 204 No Content", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
        json: () => Promise.reject(new Error("no body")),
      });
      await expect(deleteMyProfile(BASE_URL)).resolves.toBeUndefined();
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me`,
        expect.objectContaining({ method: "DELETE" }),
      );
    });
  });

  describe("gdprEraseMyProfile", () => {
    it("sends DELETE to gdpr-erase endpoint", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
        json: () => Promise.reject(new Error("no body")),
      });
      await expect(gdprEraseMyProfile(BASE_URL)).resolves.toBeUndefined();
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me/gdpr-erase`,
        expect.objectContaining({ method: "DELETE" }),
      );
    });
  });

  describe("syncFromPhm", () => {
    it("sends POST and returns profile", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      const result = await syncFromPhm(BASE_URL);
      expect(result).toEqual(mockProfile);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v1/profiles/me/sync-from-phm`,
        expect.objectContaining({ method: "POST" }),
      );
    });
  });

  describe("auth headers included", () => {
    it("includes Authorization header in every request", async () => {
      globalThis.fetch = mockFetchResponse(mockProfile);
      await getMyProfile(BASE_URL);
      const call = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(call[1].headers.Authorization).toBe("Bearer test-token");
    });

    it("omits Authorization header when no token", async () => {
      localStorage.clear();
      globalThis.fetch = mockFetchResponse(mockProfile);
      await getMyProfile(BASE_URL);
      const call = (globalThis.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      expect(call[1].headers.Authorization).toBeUndefined();
    });
  });

  describe("error handling", () => {
    it("throws ApiError on 429 rate limit", async () => {
      globalThis.fetch = mockFetchError(429, {
        error: "rate_limited",
        message: "Too many requests",
      });
      await expect(getMyProfile(BASE_URL)).rejects.toThrow(ApiError);
      try {
        await getMyProfile(BASE_URL);
      } catch (e) {
        expect((e as ApiError).status).toBe(429);
        expect((e as ApiError).code).toBe("rate_limited");
        expect((e as ApiError).message).toContain("wait a moment");
      }
    });

    it("includes Retry-After in 429 error message when header present", async () => {
      globalThis.fetch = mockFetchError(
        429,
        { error: "rate_limited", message: "Too many requests" },
        { "Retry-After": "30" },
      );
      try {
        await getMyProfile(BASE_URL);
      } catch (e) {
        expect((e as ApiError).status).toBe(429);
        expect((e as ApiError).message).toContain("30 seconds");
      }
    });

    it("handles non-JSON error response gracefully", async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        headers: { get: () => null },
        json: () => Promise.reject(new Error("not json")),
      });
      try {
        await getMyProfile(BASE_URL);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect((e as ApiError).status).toBe(502);
        expect((e as ApiError).code).toBe("unknown_error");
        expect((e as ApiError).message).toContain("502");
      }
    });

    it("propagates network errors (fetch throws TypeError) as-is", async () => {
      globalThis.fetch = vi
        .fn()
        .mockRejectedValue(new TypeError("Failed to fetch"));
      await expect(getMyProfile(BASE_URL)).rejects.toThrow(TypeError);
    });
  });
});
