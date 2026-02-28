import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { ExpertiseLevel } from "@/lib/learner-profile-types";

interface LevelOption {
  value: ExpertiseLevel;
  label: string;
  hint: string;
}

const LEVEL_HINTS: Record<string, LevelOption[]> = {
  Programming: [
    { value: "none", label: "None", hint: "Never written code" },
    {
      value: "beginner",
      label: "Beginner",
      hint: "Written scripts or simple programs",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Build apps, use APIs, debug independently",
    },
    {
      value: "advanced",
      label: "Advanced",
      hint: "Design systems, write production code",
    },
    {
      value: "expert",
      label: "Expert",
      hint: "Architect large codebases, mentor others",
    },
  ],
  "AI Fluency": [
    {
      value: "none",
      label: "None",
      hint: "New to AI — haven't used ChatGPT or similar",
    },
    {
      value: "beginner",
      label: "Beginner",
      hint: "Used ChatGPT / Copilot, understand prompting basics",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Built apps with AI APIs, understand RAG / tool use",
    },
    {
      value: "advanced",
      label: "Advanced",
      hint: "Designed agent architectures, evaluated LLM outputs",
    },
    {
      value: "expert",
      label: "Expert",
      hint: "Ship production AI systems, deep prompt engineering",
    },
  ],
  "Business Strategy": [
    { value: "none", label: "None", hint: "No business background" },
    {
      value: "beginner",
      label: "Beginner",
      hint: "Understand basic business concepts",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Make business cases, manage projects",
    },
    {
      value: "advanced",
      label: "Advanced",
      hint: "Drive strategy, model ROI, lead initiatives",
    },
    {
      value: "expert",
      label: "Expert",
      hint: "C-level / founder experience, deep domain expertise",
    },
  ],
};

const DEFAULT_LEVELS: LevelOption[] = [
  { value: "none", label: "None", hint: "No experience" },
  { value: "beginner", label: "Beginner", hint: "Just starting" },
  {
    value: "intermediate",
    label: "Intermediate",
    hint: "Can work independently",
  },
  { value: "advanced", label: "Advanced", hint: "Deep experience" },
  { value: "expert", label: "Expert", hint: "Can teach others" },
];

interface ExpertiseLevelSelectProps {
  value: ExpertiseLevel | "";
  onChange: (value: ExpertiseLevel) => void;
  label: string;
  id?: string;
}

export function ExpertiseLevelSelect({
  value,
  onChange,
  label,
  id,
}: ExpertiseLevelSelectProps) {
  const selectId =
    id || `expertise-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const levels = LEVEL_HINTS[label] || DEFAULT_LEVELS;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={selectId}
        className="text-xs font-semibold tracking-wide text-muted-foreground uppercase pl-1"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onChange as (value: string) => void}>
        <SelectTrigger
          id={selectId}
          className="h-14 text-lg text-left rounded-xl border-2 border-border/50 bg-background/50 px-4 transition-colors focus:ring-primary/20"
        >
          <SelectValue placeholder="Select level…" />
        </SelectTrigger>
        <SelectContent className="z-[120] rounded-xl border border-border/50 shadow-xl overflow-hidden">
          {levels.map((level) => (
            <SelectItem
              key={level.value}
              value={level.value}
              className="text-base py-3 cursor-pointer hover:bg-accent"
            >
              <span className="font-medium">{level.label}</span>
              <span className="text-muted-foreground ml-2">— {level.hint}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
