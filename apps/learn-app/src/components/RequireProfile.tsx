import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";

export function RequireProfile({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const { needsOnboarding, isLoading } = useLearnerProfile();

  useEffect(() => {
    if (!session?.user || isLoading) return;
    if (!needsOnboarding) return;

    // Don't redirect if already on onboarding or auth callback
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    if (path.includes("/onboarding") || path.includes("/auth/callback")) return;

    window.location.href = "/onboarding";
  }, [session?.user, needsOnboarding, isLoading]);

  return <>{children}</>;
}
