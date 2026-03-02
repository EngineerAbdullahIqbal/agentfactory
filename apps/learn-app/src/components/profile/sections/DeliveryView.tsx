import React from "react";
import type { DeliverySection } from "@/lib/learner-profile-types";
import { resolveNativeLanguageLabel } from "@/lib/profile-field-definitions";
import { Badge } from "@/components/ui/badge";

export function DeliveryView({ data }: { data: unknown }) {
  const delivery = data as DeliverySection;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Output Format
          </div>
          <div className="text-sm font-medium capitalize">
            {delivery?.output_format?.replace(/-/g, " ") || "Not set"}
          </div>
        </div>
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Target Length
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1 capitalize">
            {delivery?.target_length?.replace(/-/g, " ") || "Not set"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Code Verbosity
          </div>
          <div className="text-sm font-medium capitalize">
            {delivery?.code_verbosity?.replace(/-/g, " ") || "Not set"}
          </div>
        </div>
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Language Protocol
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium">
              {delivery?.language || "Not set"}
            </span>
            {delivery?.language_proficiency && (
              <Badge variant="secondary" className="text-xs capitalize">
                {delivery.language_proficiency}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Native Language
          </div>
          <div className="text-sm font-medium">
            {resolveNativeLanguageLabel(delivery?.native_language ?? null)}
          </div>
        </div>
        <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-background/50">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Preferred Code Language
          </div>
          <div className="text-sm font-medium">
            {delivery?.preferred_code_language || "Not set"}
          </div>
        </div>
      </div>
    </div>
  );
}
