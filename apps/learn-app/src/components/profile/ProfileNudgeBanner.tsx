import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Sparkles, EyeOff } from "lucide-react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useHistory, useLocation } from "@docusaurus/router";
import { useProfileNudgeVisibility } from "@/contexts/ProfileNudgeVisibilityContext";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ProfileNudgeBanner() {
  const history = useHistory();
  const location = useLocation();
  const { session } = useAuth();
  const { profile, needsOnboarding, isLoading } = useLearnerProfile();
  const { setIsProfileNudgeVisible } = useProfileNudgeVisibility();
  const [isDismissed, setIsDismissed] = useState(false);
  const onboardingHref = useBaseUrl("/onboarding");
  const profileHref = useBaseUrl("/profile");

  const userId = session?.user?.id;
  const isOptedOut = (() => {
    if (!userId) return false;
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(`learner_profile_opt_out:${userId}`) === "1";
    } catch {
      return false;
    }
  })();

  const dismissKey = useMemo(() => {
    return userId ? `profile_nudge_dismissed:${userId}` : null;
  }, [userId]);

  useEffect(() => {
    if (!dismissKey || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(dismissKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { timestamp?: number };
      const ts = parsed?.timestamp;
      const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (typeof ts === "number" && Date.now() - ts < TTL_MS) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem(dismissKey);
      }
    } catch {
      localStorage.removeItem(dismissKey);
    }
  }, [dismissKey]);

  const dismiss = () => {
    setIsDismissed(true);
    if (!dismissKey || typeof window === "undefined") return;
    try {
      localStorage.setItem(dismissKey, JSON.stringify({ timestamp: Date.now() }));
    } catch {
      // ignore
    }
  };

  const hasNoProfile = !profile && needsOnboarding;
  const hasIncompleteProfile = Boolean(profile && !profile.onboarding_completed);

  const shouldShow =
    !isLoading &&
    Boolean(session?.user) &&
    !isDismissed &&
    location.pathname !== onboardingHref &&
    !location.pathname.startsWith(`${onboardingHref}/`) &&
    location.pathname !== profileHref &&
    !location.pathname.startsWith(`${profileHref}/`) &&
    (hasNoProfile || hasIncompleteProfile);

  useIsomorphicLayoutEffect(() => {
    setIsProfileNudgeVisible(shouldShow);
    return () => setIsProfileNudgeVisible(false);
  }, [setIsProfileNudgeVisible, shouldShow]);

  if (!shouldShow) return null;

  const percent =
    profile && typeof profile.profile_completeness === "number"
      ? Math.round(profile.profile_completeness * 100)
      : null;

  const title = isOptedOut
    ? "Personalization is off"
    : hasNoProfile
      ? "Set up your Learner Profile"
      : "Finish your Learner Profile";

  const subtitle = isOptedOut
    ? "Enable your Learner Profile anytime to personalize depth, examples, and pacing."
    : hasNoProfile
      ? "Personalize depth, examples, and pacing — you can skip anything."
      : "Complete setup to improve personalization across every lesson.";

  const navigateToOnboarding = () => {
    history.push(onboardingHref);
  };

  const ctaLabel = isOptedOut
    ? "Enable personalization"
    : hasNoProfile
      ? "Start setup"
      : "Continue setup";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="w-full border-b border-border/60 bg-background/95 backdrop-blur-xl overflow-hidden"
        role="banner"
      >
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="py-2.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5 h-9 w-9 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 flex items-center justify-center shrink-0">
                {isOptedOut ? (
                  <EyeOff size={18} />
                ) : hasNoProfile ? (
                  <UserPlus size={18} />
                ) : (
                  <Sparkles size={18} />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  {typeof percent === "number" && (
                    <span className="text-xs font-medium text-muted-foreground bg-accent/40 border border-border/50 rounded-full px-2 py-0.5">
                      {percent}% complete
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {hasNoProfile && !isOptedOut && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={dismiss}
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  Not now
                </Button>
              )}
              <Button
                size="sm"
                onClick={navigateToOnboarding}
                className="h-8 text-xs font-medium shadow-sm"
              >
                {ctaLabel}
              </Button>
              <button
                onClick={dismiss}
                className="ml-1 p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent/60"
                aria-label="Dismiss banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {typeof percent === "number" && percent > 0 && percent < 100 && (
            <div className="pb-2">
              <div
                className="h-1.5 rounded-full bg-muted/60 overflow-hidden"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Learner Profile completeness: ${percent}%`}
              >
                <div
                  className="h-full bg-primary/80 transition-[width]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
