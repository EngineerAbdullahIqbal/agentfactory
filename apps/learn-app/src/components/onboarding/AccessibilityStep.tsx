import React from "react";
import { AccessibilityToggles } from "@/components/profile/fields";
import type { AccessibilitySection } from "@/lib/learner-profile-types";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { itemVariants, staggerContainerVariants } from "./variants";

interface AccessibilityStepProps {
  data: AccessibilitySection;
  onChange: (data: AccessibilitySection) => void;
}

export function AccessibilityStep({ data, onChange }: AccessibilityStepProps) {
  return (
    <motion.div
      className="space-y-12 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          How should we deliver content?
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          These settings adjust formatting, density, and assistive features
          across all lessons.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-8"
      >
        <AccessibilityToggles
          value={data}
          onChange={onChange}
          includeColorBlindSafe={false}
        />

        <div className="pt-6 border-t border-border/50 space-y-4">
          <Label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block">
            Content Density
          </Label>
          <RadioGroup
            value={data.cognitive_load_preference}
            onValueChange={(val: "standard" | "reduced") =>
              onChange({ ...data, cognitive_load_preference: val })
            }
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {(
              [
                {
                  value: "standard",
                  title: "Standard",
                  desc: "Full depth — deep dives, multiple examples, and thorough explanations.",
                },
                {
                  value: "reduced",
                  title: "Reduced",
                  desc: "Essential concepts only — shorter sections, fewer tangents, high signal.",
                },
              ] as const
            ).map((option) => (
              <div key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={`onboarding-cognitive-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`onboarding-cognitive-${option.value}`}
                  className="relative flex flex-col gap-2 rounded-2xl border-2 border-border/50 p-5 cursor-pointer transition-colors transition-shadow duration-300 overflow-hidden bg-background/50 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-foreground">
                      {option.title}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${data.cognitive_load_preference === option.value ? "border-primary bg-primary" : "border-muted-foreground/30"}`}
                    >
                      {data.cognitive_load_preference === option.value && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-normal text-muted-foreground leading-relaxed">
                    {option.desc}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 pt-4">
        <div className="flex justify-between items-baseline mb-2">
          <Label
            htmlFor="onboarding-a11y-notes"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Anything else we should know? (Optional)
          </Label>
          <span className="text-xs text-muted-foreground font-medium shadow-sm px-2 py-0.5 rounded-md bg-accent/50">
            {data.notes?.length || 0} / 300
          </span>
        </div>
        <Textarea
          id="onboarding-a11y-notes"
          value={data.notes || ""}
          onChange={(e) =>
            onChange({
              ...data,
              notes: e.target.value.substring(0, 300) || null,
            })
          }
          placeholder="e.g., I prefer dark mode, use keyboard navigation, or have limited screen time…"
          className="w-full text-lg rounded-2xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors min-h-[120px] resize-none font-medium"
          maxLength={300}
        />
      </motion.div>
    </motion.div>
  );
}
