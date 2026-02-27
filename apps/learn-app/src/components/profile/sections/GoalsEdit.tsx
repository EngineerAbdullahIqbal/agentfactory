import React, { useState } from "react";
import type { GoalsSection } from "@/lib/learner-profile-types";
import { UrgencyRadio } from "@/components/profile/fields/UrgencyRadio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function GoalsEdit({
  data,
  onChange,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  const goals = data as GoalsSection;

  const update = (field: keyof GoalsSection, value: unknown) => {
    onChange({ ...goals, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="settings-primary-goal" className="text-sm font-medium">
          Primary Learning Goal
        </label>
        <Textarea
          id="settings-primary-goal"
          value={goals?.primary_learning_goal || ""}
          onChange={(e) =>
            update(
              "primary_learning_goal",
              e.target.value.substring(0, 500) || null,
            )
          }
          placeholder="What do you most want to learn?"
          rows={3}
          maxLength={500}
        />
      </div>
      <UrgencyRadio
        value={goals?.urgency || null}
        onChange={(v) => update("urgency", v)}
        name="settings-urgency"
      />
      <div className="space-y-1.5">
        <label htmlFor="settings-urgency-note" className="text-sm font-medium">
          Urgency Note
        </label>
        <Input
          id="settings-urgency-note"
          type="text"
          value={goals?.urgency_note || ""}
          onChange={(e) =>
            update("urgency_note", e.target.value.substring(0, 200) || null)
          }
          placeholder="Optional context, e.g. “I have a demo in 2 weeks”"
          maxLength={200}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="settings-career-goal" className="text-sm font-medium">
          Career Goal
        </label>
        <Input
          id="settings-career-goal"
          type="text"
          value={goals?.career_goal || ""}
          onChange={(e) =>
            update("career_goal", e.target.value.substring(0, 300) || null)
          }
          placeholder="Where do you want your career to go?"
          maxLength={300}
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="settings-immediate-application"
          className="text-sm font-medium"
        >
          Immediate Application
        </label>
        <Input
          id="settings-immediate-application"
          type="text"
          value={goals?.immediate_application || ""}
          onChange={(e) =>
            update(
              "immediate_application",
              e.target.value.substring(0, 300) || null,
            )
          }
          placeholder="What will you use this knowledge for right away?"
          maxLength={300}
        />
      </div>
      <SecondaryGoalsEditor
        goals={goals?.secondary_goals || []}
        onChange={(secondary_goals) =>
          update("secondary_goals", secondary_goals)
        }
      />
    </div>
  );
}

function SecondaryGoalsEditor({
  goals,
  onChange,
}: {
  goals: string[];
  onChange: (goals: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const addGoal = () => {
    const trimmed = input.trim();
    if (!trimmed || goals.length >= 5) return;
    onChange([...goals, trimmed]);
    setInput("");
  };

  const removeGoal = (index: number) => {
    onChange(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">Secondary Goals</label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.substring(0, 200))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addGoal();
            }
          }}
          placeholder="Type a goal and press Enter"
          maxLength={200}
          disabled={goals.length >= 5}
        />
        <Button
          type="button"
          size="sm"
          onClick={addGoal}
          disabled={!input.trim() || goals.length >= 5}
        >
          Add
        </Button>
      </div>
      {goals.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {goals.map((goal, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="py-1 px-2 font-normal flex items-center gap-1"
            >
              {goal}
              <button
                type="button"
                onClick={() => removeGoal(idx)}
                className="hover:text-destructive transition-colors"
                aria-label={`Remove goal: ${goal}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {goals.length >= 5 && (
        <p className="text-xs text-muted-foreground">
          Maximum 5 goals reached.
        </p>
      )}
    </div>
  );
}
