import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ChevronRight,
  Loader2,
  Zap,
} from "lucide-react";
import { getCompleteness } from "@/lib/learner-profile-api";
import type { CompletenessResponse } from "@/lib/learner-profile-types";
import { ONBOARDING_PHASES } from "@/lib/learner-profile-types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useHistory } from "@docusaurus/router";

export function FinishStep() {
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();
  const apiUrl =
    (siteConfig.customFields?.learnerProfileApiUrl as string) ||
    "http://localhost:8004";
  const profileHref = useBaseUrl("/profile");
  const homeHref = useBaseUrl("/");
  const logoSrc = useBaseUrl("/img/logo.svg");

  const [completeness, setCompleteness] = useState<CompletenessResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompleteness(apiUrl)
      .then(setCompleteness)
      .catch((err) => console.error("Failed to fetch completeness", err))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  const strengthLabel = !completeness
    ? "Calculating…"
    : completeness.profile_completeness * 100 < 30
      ? "Low"
      : completeness.profile_completeness * 100 < 70
        ? "Medium"
        : "High";

  const formatFieldName = (fieldName: string) => {
    const parts = fieldName.split(".");
    const name = parts[parts.length - 1];
    return name
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const highestImpact = completeness?.highest_impact_missing?.[0];

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] max-w-xl mx-auto px-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-primary/20">
        <img
          src={logoSrc}
          alt="Agent Factory"
          className="w-10 h-10 object-contain"
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        You're set.
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        Your Learner Profile is ready. We'll tailor depth, examples, and pacing.
      </p>

      {/* Meters */}
      <div className="w-full space-y-6 mb-12 text-left">
        <div className="bg-background/50 border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Setup
            </span>
            <span className="font-semibold">
              {ONBOARDING_PHASES.length}/{ONBOARDING_PHASES.length} Steps
            </span>
          </div>
          <Progress value={100} className="h-2 [&>div]:bg-green-500" />
        </div>

        <div className="bg-background/50 border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Personalization Strength
            </span>
            <span className="font-semibold">{strengthLabel}</span>
          </div>
          <Progress
            value={completeness ? completeness.profile_completeness * 100 : 0}
            className="h-2 [&>div]:bg-amber-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : highestImpact ? (
        <div className="w-full bg-accent/30 border border-border/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-sm text-left">
            <span className="font-semibold">Improve in 15s: </span>
            <span className="text-muted-foreground">
              Add your {formatFieldName(highestImpact)}
            </span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => history.push(profileHref)}
            className="shrink-0 w-full sm:w-auto"
          >
            Update Profile
          </Button>
        </div>
      ) : null}

      <Button
        size="lg"
        className="w-full sm:w-auto rounded-xl px-12 shadow-md shadow-primary/20 font-medium"
        onClick={() => history.replace(homeHref)}
      >
        Enter Agent Factory <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
}
