import { useState } from "react";
import { UrgencyRadio } from "@/components/profile/fields";
import type { GoalsSection } from "@/lib/learner-profile-types";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { itemVariants, staggerContainerVariants } from "./variants";

interface GoalsStepProps {
  data: GoalsSection;
  onChange: (data: GoalsSection) => void;
}

const GOAL_EXAMPLES = [
  "Build an AI agent I can sell as a SaaS product",
  "Automate repetitive tasks at work using AI agents",
  "Understand AI agents well enough to lead a team building them",
  "Transition my career into AI product development",
];

export function GoalsStep({ data, onChange }: GoalsStepProps) {
  const [secondaryInput, setSecondaryInput] = useState("");

  const addSecondaryGoal = () => {
    const trimmed = secondaryInput.trim();
    if (!trimmed || (data.secondary_goals?.length || 0) >= 5) return;
    onChange({
      ...data,
      secondary_goals: [...(data.secondary_goals || []), trimmed],
    });
    setSecondaryInput("");
  };

  const removeSecondaryGoal = (index: number) => {
    onChange({
      ...data,
      secondary_goals: (data.secondary_goals || []).filter(
        (_, i) => i !== index,
      ),
    });
  };

  return (
    <motion.div
      className="space-y-12 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          What brings you here?
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          Your goal shapes every lesson — we'll emphasize what matters to you
          and skip what doesn't.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-baseline mb-2">
          <Label
            htmlFor="onboarding-primary-goal"
            className="font-semibold text-lg"
          >
            What do you want to achieve?
          </Label>
          <span className="text-xs text-muted-foreground font-medium shadow-sm px-2 py-0.5 rounded-md bg-accent/50">
            {data.primary_learning_goal?.length || 0} / 500
          </span>
        </div>
        <div className="relative group">
          <Textarea
            id="onboarding-primary-goal"
            value={data.primary_learning_goal || ""}
            onChange={(e) =>
              onChange({
                ...data,
                primary_learning_goal: e.target.value.substring(0, 500) || null,
              })
            }
            placeholder="Be specific — the more detail, the better we can personalize. e.g., 'Build a customer support AI agent for my e-commerce store that handles returns and order tracking'"
            className="w-full text-base min-h-[120px] rounded-xl border-2 border-border/50 bg-background/50 px-4 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium resize-y"
            maxLength={500}
            autoFocus
          />
        </div>
        <div className="space-y-2 pt-2">
          <p className="text-xs text-muted-foreground pl-1">
            Or pick one to start:
          </p>
          <div className="flex flex-wrap gap-2">
            {GOAL_EXAMPLES.map((example) => (
              <Badge
                key={example}
                variant="secondary"
                className="cursor-pointer font-normal hover:bg-primary/20 transition-colors py-1.5 px-3"
                onClick={() => {
                  onChange({
                    ...data,
                    primary_learning_goal: example,
                  });
                }}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 pt-6">
        <label className="text-lg font-semibold block">
          How urgent is this?
        </label>
        <p className="text-sm text-muted-foreground -mt-2">
          High urgency = practical shortcuts first. Low urgency = deeper
          conceptual foundations.
        </p>
        <div className="bg-transparent border-0 rounded-2xl p-0 shadow-none">
          <UrgencyRadio
            value={data.urgency}
            onChange={(value) => {
              onChange({ ...data, urgency: value as GoalsSection["urgency"] });
            }}
            name="onboarding-urgency"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <details className="rounded-2xl border border-border/50 bg-background/40 p-5">
          <summary className="cursor-pointer select-none font-semibold text-base">
            Add more context (Optional)
          </summary>
          <div className="pt-4 space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-baseline mb-2">
                <Label
                  htmlFor="onboarding-urgency-note"
                  className="font-semibold text-lg"
                >
                  Any deadline driving the urgency? (Optional)
                </Label>
                <span className="text-xs text-muted-foreground font-medium shadow-sm px-2 py-0.5 rounded-md bg-accent/50">
                  {data.urgency_note?.length || 0} / 200
                </span>
              </div>
              <Textarea
                id="onboarding-urgency-note"
                value={data.urgency_note || ""}
                onChange={(e) =>
                  onChange({
                    ...data,
                    urgency_note: e.target.value.substring(0, 200) || null,
                  })
                }
                placeholder="e.g., I’m presenting this to my team in 2 weeks"
                className="w-full text-base min-h-[96px] rounded-2xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium resize-none"
                maxLength={200}
              />
            </div>

            <div className="space-y-4">
              <Label
                htmlFor="onboarding-immediate-application"
                className="font-semibold text-lg"
              >
                What's the first thing you want to build?
              </Label>
              <Input
                id="onboarding-immediate-application"
                type="text"
                value={data.immediate_application || ""}
                onChange={(e) =>
                  onChange({
                    ...data,
                    immediate_application:
                      e.target.value.substring(0, 300) || null,
                  })
                }
                placeholder="e.g., A customer support bot for my Shopify store"
                className="w-full text-base rounded-xl border-2 border-border/50 bg-background/50 px-4 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
                maxLength={300}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-semibold text-lg">Any other goals?</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={secondaryInput}
                  onChange={(e) =>
                    setSecondaryInput(e.target.value.substring(0, 200))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSecondaryGoal();
                    }
                  }}
                  placeholder="Type a goal and press Enter or Add"
                  className="flex-1 text-base rounded-xl border-2 border-border/50 bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
                  maxLength={200}
                  disabled={(data.secondary_goals?.length || 0) >= 5}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addSecondaryGoal}
                  disabled={
                    !secondaryInput.trim() ||
                    (data.secondary_goals?.length || 0) >= 5
                  }
                  className="rounded-xl px-4 self-center"
                >
                  Add
                </Button>
              </div>
              {(data.secondary_goals?.length || 0) > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {data.secondary_goals.map((goal, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="py-1.5 px-3 font-normal flex items-center gap-1.5"
                    >
                      {goal}
                      <button
                        type="button"
                        onClick={() => removeSecondaryGoal(idx)}
                        className="hover:text-destructive transition-colors"
                        aria-label={`Remove goal: ${goal}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              {(data.secondary_goals?.length || 0) >= 5 && (
                <p className="text-xs text-muted-foreground/70 pl-1">
                  Maximum 5 goals reached.
                </p>
              )}
            </div>
          </div>
        </details>
      </motion.div>
    </motion.div>
  );
}
