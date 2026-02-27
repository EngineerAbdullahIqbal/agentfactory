import React from "react";
import type { ExpertiseSection } from "@/lib/learner-profile-types";
import { Badge } from "@/components/ui/badge";

function levelLabel(level: string): string {
  const labels: Record<string, string> = {
    none: "None",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  };
  return labels[level] || level;
}

function getBadgeVariant(level: string) {
  if (level === "expert" || level === "advanced") return "default";
  if (level === "intermediate") return "secondary";
  return "outline";
}

export function ExpertiseView({ data }: { data: unknown }) {
  const expertise = data as ExpertiseSection;
  const hasNamedDomains = Boolean(
    expertise?.domain?.some((d) => Boolean(d.domain_name)),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Programming</div>
          <Badge variant={getBadgeVariant(expertise?.programming?.level || "none")} className="text-sm px-3 py-1">
            {levelLabel(expertise?.programming?.level || "none")}
          </Badge>
        </div>
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">AI Fluency</div>
          <Badge variant={getBadgeVariant(expertise?.ai_fluency?.level || "none")} className="text-sm px-3 py-1">
            {levelLabel(expertise?.ai_fluency?.level || "none")}
          </Badge>
        </div>
        <div className="space-y-2 col-span-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Business Strategy</div>
          <Badge variant={getBadgeVariant(expertise?.business?.level || "none")} className="text-sm px-3 py-1">
            {levelLabel(expertise?.business?.level || "none")}
          </Badge>
        </div>
      </div>

      {expertise?.domain?.length > 0 && hasNamedDomains && (
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Domain Expertise</div>
          <div className="flex flex-wrap gap-2 pt-1">
            {expertise.domain
              .filter((d) => Boolean(d.domain_name))
              .map((d, i) => (
              <Badge key={i} variant={getBadgeVariant(d.level)} className="text-sm px-3 py-1">
                {d.domain_name} — {levelLabel(d.level)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
