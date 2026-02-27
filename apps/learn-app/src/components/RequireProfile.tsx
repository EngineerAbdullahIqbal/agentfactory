import React, { useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useAuth } from "@/contexts/AuthContext";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";

/**
 * Initializes the LearnerProfileContext for authenticated users.
 * Redirects new users (no profile / incomplete onboarding) to /onboarding once.
 */
export function RequireProfile({ children }: { children: React.ReactNode }) {
  const history = useHistory();
  const location = useLocation();
  const { session } = useAuth();
  const { profile, needsOnboarding, isLoading } = useLearnerProfile();
  const onboardingHref = useBaseUrl("/onboarding");

  useEffect(() => {
    if (!session?.user || isLoading) return;
    if (typeof window === "undefined") return;

    const pathname = location.pathname || window.location.pathname;
    if (pathname === onboardingHref || pathname.startsWith(`${onboardingHref}/`))
      return;

    const userId = session.user.id;
    const redirectOnceKey = `learner_profile_onboarding_redirected:${userId}`;
    const optOutKey = `learner_profile_opt_out:${userId}`;

    try {
      if (localStorage.getItem(optOutKey) === "1") return;
      if (localStorage.getItem(redirectOnceKey) === "1") return;
    } catch {
      // localStorage unavailable — fall through (best effort)
    }

    const needsSetup =
      needsOnboarding || (profile !== null && !profile.onboarding_completed);
    if (!needsSetup) return;

    try {
      localStorage.setItem(redirectOnceKey, "1");
    } catch {
      // ignore
    }

    history.replace(onboardingHref);
  }, [
    history,
    onboardingHref,
    location.pathname,
    session?.user,
    isLoading,
    needsOnboarding,
    profile,
  ]);

  return <>{children}</>;
}
