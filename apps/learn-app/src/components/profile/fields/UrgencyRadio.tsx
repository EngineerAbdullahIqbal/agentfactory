import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const URGENCY_OPTIONS = [
  { value: "low", label: "Low", description: "Building my skill portfolio at my own pace" },
  { value: "medium", label: "Medium", description: "Steady progress — shipping something real" },
  { value: "high", label: "High", description: "Need to deploy an AI employee fast" },
] as const;

interface UrgencyRadioProps {
  value: string | null;
  onChange: (value: string) => void;
  name?: string;
}

export function UrgencyRadio({ value, onChange, name = "urgency" }: UrgencyRadioProps) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium">Learning Urgency</legend>
      <RadioGroup
        value={value || ""}
        onValueChange={onChange}
        name={name}
        className="grid gap-3"
      >
        {URGENCY_OPTIONS.map((option) => (
          <div key={option.value}>
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="flex flex-col items-start gap-1.5 rounded-xl border-2 border-border/50 bg-background/50 p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors duration-200"
            >
              <div className="font-semibold text-lg text-foreground">{option.label}</div>
              <div className="font-normal text-sm text-muted-foreground">
                {option.description}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
