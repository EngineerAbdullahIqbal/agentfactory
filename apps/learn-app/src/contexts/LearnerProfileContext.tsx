import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { useLearnerProfileApiUrl } from "@/lib/api-utils";
import {
  getMyProfileOrNull,
  createProfile,
  updateMyProfile,
  updateSection as apiUpdateSection,
  completeOnboardingPhase as apiCompleteOnboardingPhase,
} from "@/lib/learner-profile-api";
import { buildSparsePatch } from "@/lib/buildSparsePatch";
import type {
  ProfileResponse,
  ProfileCreateRequest,
  ProfileUpdateRequest,
  OnboardingPhase,
} from "@/lib/learner-profile-types";

// =============================================================================
// localStorage Cache
// =============================================================================

const LEGACY_CACHE_KEY = "learner_profile_cache";
const CACHE_KEY_PREFIX = "learner_profile_cache";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

interface CachedProfile {
  profile: ProfileResponse;
  timestamp: number;
}

function cacheKeyForUser(userId: string): string {
  return `${CACHE_KEY_PREFIX}:${userId}`;
}

function clearLegacyCache(): void {
  try {
    localStorage.removeItem(LEGACY_CACHE_KEY);
  } catch {
    // ignore
  }
}

function getCachedProfile(userId: string): ProfileResponse | null {
  clearLegacyCache();
  try {
    const raw = localStorage.getItem(cacheKeyForUser(userId));
    if (!raw) return null;
    const cached: CachedProfile = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(cacheKeyForUser(userId));
      return null;
    }
    return cached.profile;
  } catch {
    try {
      localStorage.removeItem(cacheKeyForUser(userId));
    } catch {
      // ignore
    }
    return null;
  }
}

function setCachedProfile(userId: string, profile: ProfileResponse): void {
  clearLegacyCache();
  try {
    localStorage.setItem(
      cacheKeyForUser(userId),
      JSON.stringify({ profile, timestamp: Date.now() }),
    );
  } catch {
    // localStorage full or unavailable — ignore
  }
}

function clearCachedProfile(userId: string): void {
  clearLegacyCache();
  try {
    localStorage.removeItem(cacheKeyForUser(userId));
  } catch {
    // ignore
  }
}

// =============================================================================
// Context
// =============================================================================

interface LearnerProfileContextType {
  profile: ProfileResponse | null;
  isLoading: boolean;
  needsOnboarding: boolean;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: ProfileUpdateRequest) => Promise<ProfileResponse>;
  updateSection: (section: string, data: unknown) => Promise<ProfileResponse>;
  completeOnboardingPhase: (
    phase: OnboardingPhase,
    data?: unknown,
  ) => Promise<ProfileResponse>;
  createNewProfile: (data?: ProfileCreateRequest) => Promise<ProfileResponse>;
  /** @internal Trigger lazy fetch — called automatically by useLearnerProfile */
  ensureProfileLoaded: () => Promise<void>;
}

const LearnerProfileContext = createContext<
  LearnerProfileContextType | undefined
>(undefined);

export function LearnerProfileProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const apiUrl = useLearnerProfileApiUrl();

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const fetchingRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);

  // Helper: set profile in both React state and localStorage
  const setProfileWithCache = useCallback(
    (data: ProfileResponse) => {
      setProfile(data);
      const userId = session?.user?.id;
      if (userId) setCachedProfile(userId, data);
    },
    [session?.user?.id],
  );

  // Lazy trigger — called when context is consumed via useLearnerProfile
  const ensureProfileLoaded = useCallback(async () => {
    if (hasAttemptedFetch || fetchingRef.current || !session?.user) return;
    fetchingRef.current = true;

    const userId = session.user.id;

    // Check localStorage cache first — avoids API call on hard refresh
    const cached = getCachedProfile(userId);
    if (cached) {
      setProfile(cached);
      setNeedsOnboarding(!cached.onboarding_completed);
      setHasAttemptedFetch(true);
      fetchingRef.current = false;
      return;
    }

    setIsLoading(true);
    try {
      const data = await getMyProfileOrNull(apiUrl);
      if (data) {
        setProfileWithCache(data);
        setNeedsOnboarding(false);
      } else {
        setNeedsOnboarding(true);
      }
      setHasAttemptedFetch(true);
    } catch (err) {
      console.error("[LearnerProfileContext] Failed to load profile:", err);
      // Do NOT set hasAttemptedFetch on failure — allow retry on next mount
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, [hasAttemptedFetch, session?.user, apiUrl, setProfileWithCache]);

  // Clear state on sign-out (or when switching users)
  useEffect(() => {
    const currentUserId = session?.user?.id ?? null;
    const lastUserId = lastUserIdRef.current;

    if (lastUserId && lastUserId !== currentUserId) {
      clearCachedProfile(lastUserId);
      setProfile(null);
      setNeedsOnboarding(false);
      setHasAttemptedFetch(false);
      fetchingRef.current = false;
    }

    if (!currentUserId) {
      setProfile(null);
      setNeedsOnboarding(false);
      setHasAttemptedFetch(false);
      fetchingRef.current = false;
    }

    lastUserIdRef.current = currentUserId;
  }, [session?.user?.id]);

  // Force-refresh: clear cache, fetch fresh from API
  const refreshProfile = useCallback(async () => {
    if (!session?.user) return;
    clearCachedProfile(session.user.id);
    setIsLoading(true);
    try {
      const data = await getMyProfileOrNull(apiUrl);
      if (data) {
        setProfileWithCache(data);
        setNeedsOnboarding(false);
      } else {
        setProfile(null);
        setNeedsOnboarding(true);
      }
    } catch (err) {
      console.error("[LearnerProfileContext] Failed to refresh profile:", err);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user, apiUrl, setProfileWithCache]);

  const updateProfile = useCallback(
    async (data: ProfileUpdateRequest): Promise<ProfileResponse> => {
      const baseline = profile;
      if (!baseline) {
        const updated = await updateMyProfile(apiUrl, data);
        setProfileWithCache(updated);
        setNeedsOnboarding(false);
        return updated;
      }

      const patch: ProfileUpdateRequest = {};

      if (data.name !== undefined && data.name !== baseline.name) {
        patch.name = data.name;
      }

      const sectionKeys = [
        "expertise",
        "professional_context",
        "goals",
        "communication",
        "delivery",
        "accessibility",
      ] as const;

      for (const key of sectionKeys) {
        const nextValue = data[key];
        if (nextValue === undefined) continue;

        const sectionPatch = buildSparsePatch(baseline[key], nextValue);
        if (sectionPatch !== undefined) {
          (patch as any)[key] = sectionPatch;
        }
      }

      if (Object.keys(patch).length === 0) return baseline;

      const updated = await updateMyProfile(apiUrl, patch);
      setProfileWithCache(updated);
      setNeedsOnboarding(false);
      return updated;
    },
    [apiUrl, profile, setProfileWithCache],
  );

  const updateSectionFn = useCallback(
    async (section: string, data: unknown): Promise<ProfileResponse> => {
      const baseline = profile as unknown as Record<string, unknown> | null;
      const baselineSection = baseline?.[section];
      const patch = buildSparsePatch(baselineSection, data);

      if (patch === undefined) {
        if (!profile) {
          throw new Error("Profile not loaded");
        }
        return profile;
      }

      const updated = await apiUpdateSection(apiUrl, section, patch);
      setProfileWithCache(updated);
      return updated;
    },
    [apiUrl, profile, setProfileWithCache],
  );

  const completeOnboardingPhaseFn = useCallback(
    async (
      phase: OnboardingPhase,
      data?: unknown,
    ): Promise<ProfileResponse> => {
      let payload = data;

      if (data !== undefined && profile) {
        if (phase === "communication_preferences") {
          const incoming = data as {
            communication?: unknown;
            delivery?: unknown;
          };

          const communicationPatch =
            incoming.communication !== undefined
              ? buildSparsePatch(profile.communication, incoming.communication)
              : undefined;
          const deliveryPatch =
            incoming.delivery !== undefined
              ? buildSparsePatch(profile.delivery, incoming.delivery)
              : undefined;

          const merged: Record<string, unknown> = {};
          if (communicationPatch !== undefined)
            merged.communication = communicationPatch;
          if (deliveryPatch !== undefined) merged.delivery = deliveryPatch;

          payload = Object.keys(merged).length > 0 ? merged : {};
        } else if (
          phase === "goals" ||
          phase === "expertise" ||
          phase === "professional_context" ||
          phase === "accessibility"
        ) {
          const sectionBaseline = (
            profile as unknown as Record<string, unknown>
          )[phase];
          const patch = buildSparsePatch(sectionBaseline, data);
          payload = patch !== undefined ? patch : {};
        }
      }

      const updated = await apiCompleteOnboardingPhase(apiUrl, phase, payload);
      setProfileWithCache(updated);
      setNeedsOnboarding(false);
      return updated;
    },
    [apiUrl, profile, setProfileWithCache],
  );

  const createNewProfile = useCallback(
    async (data?: ProfileCreateRequest): Promise<ProfileResponse> => {
      const created = await createProfile(apiUrl, data || {});
      setProfileWithCache(created);
      setNeedsOnboarding(false);
      return created;
    },
    [apiUrl, setProfileWithCache],
  );

  const contextValue = useMemo(
    () => ({
      profile,
      isLoading,
      needsOnboarding,
      refreshProfile,
      updateProfile,
      updateSection: updateSectionFn,
      completeOnboardingPhase: completeOnboardingPhaseFn,
      createNewProfile,
      ensureProfileLoaded,
    }),
    [
      profile,
      isLoading,
      needsOnboarding,
      refreshProfile,
      updateProfile,
      updateSectionFn,
      completeOnboardingPhaseFn,
      createNewProfile,
      ensureProfileLoaded,
    ],
  );

  return (
    <LearnerProfileContext.Provider value={contextValue}>
      {children}
    </LearnerProfileContext.Provider>
  );
}

export function useLearnerProfile() {
  const context = useContext(LearnerProfileContext);
  if (context === undefined) {
    throw new Error(
      "useLearnerProfile must be used within a LearnerProfileProvider",
    );
  }

  // Trigger lazy fetch on first render of a consumer
  useEffect(() => {
    context.ensureProfileLoaded();
  }, [context.ensureProfileLoaded]);

  return context;
}
