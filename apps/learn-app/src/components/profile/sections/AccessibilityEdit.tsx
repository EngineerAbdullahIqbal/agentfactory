import React from "react";
import type { AccessibilitySection } from "@/lib/learner-profile-types";
import { AccessibilityToggles } from "@/components/profile/fields/AccessibilityToggles";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AccessibilityEdit({
  data,
  onChange,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  const a11y = data as AccessibilitySection;
  const notes = a11y?.notes || "";

  return (
    <div className="space-y-4">
      <AccessibilityToggles
        value={a11y}
        onChange={(updated) => onChange(updated)}
      />
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium mb-2">Cognitive Load</legend>
        <RadioGroup
          value={a11y?.cognitive_load_preference || "standard"}
          onValueChange={(val) => onChange({ ...a11y, cognitive_load_preference: val as "standard" | "reduced" })}
          className="space-y-2"
        >
          {(["standard", "reduced"] as const).map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-md border border-input p-3 cursor-pointer hover:bg-accent/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent"
            >
              <RadioGroupItem value={option} id={`cog-${option}`} />
              <span className="text-sm font-medium capitalize">{option}</span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label htmlFor="settings-a11y-notes" className="text-sm font-medium">
            Additional Notes
          </label>
          <span className="text-xs text-muted-foreground">
            {notes.length} / 300
          </span>
        </div>
        <Textarea
          id="settings-a11y-notes"
          value={notes}
          onChange={(e) =>
            onChange({
              ...a11y,
              notes: e.target.value.substring(0, 300) || null,
            })
          }
          placeholder="Any other accessibility needs…"
          rows={3}
          maxLength={300}
        />
      </div>
    </div>
  );
}
