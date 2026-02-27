import React from "react";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";
import { useProfileNudgeVisibility } from "@/contexts/ProfileNudgeVisibilityContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

interface CompletenessBannerProps {
  /**
   * When true, suppresses the banner until onboarding is completed.
   * Useful to avoid double-CTAs when the full-width onboarding nudge is active.
   */
  hideDuringOnboarding?: boolean;
}

export function CompletenessBanner({
  hideDuringOnboarding,
}: CompletenessBannerProps) {
  const { profile } = useLearnerProfile();
  const { isProfileNudgeVisible } = useProfileNudgeVisibility();
  const ctaHref = profile?.onboarding_completed ? "/profile" : "/onboarding";
  const ctaTo = useBaseUrl(ctaHref);
  if (!profile || profile.profile_completeness >= 1.0) return null;

  // Avoid double-CTAs: when the full-width ProfileNudgeBanner is currently visible,
  // suppress this smaller in-content card. If the nudge isn't visible (dismissed,
  // excluded route, or swizzle missing), fall back to showing this card so there is
  // still a path back to onboarding.
  if (hideDuringOnboarding && !profile.onboarding_completed && isProfileNudgeVisible) {
    return null;
  }

  const percent = Math.round(profile.profile_completeness * 100);
  const ctaLabel = profile.onboarding_completed
    ? "Improve personalization"
    : "Continue setup";

  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">
          Profile {percent}% complete
        </span>
        <Link to={ctaTo} className="text-sm text-primary hover:underline">
          {ctaLabel}
        </Link>
      </div>
      <div
        className="h-2 rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Profile completeness: ${percent}%`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
