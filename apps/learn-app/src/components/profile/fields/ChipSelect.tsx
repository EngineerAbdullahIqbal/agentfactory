import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChipSelectProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  maxSelect?: number;
  maxItemLength?: number;
  allowCustom?: boolean;
  id?: string;
  hint?: string;
}

export function ChipSelect({
  label,
  value,
  onChange,
  options,
  maxSelect,
  maxItemLength,
  allowCustom,
  id,
  hint,
}: ChipSelectProps) {
  const [customInput, setCustomInput] = useState("");

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (maxSelect && value.length >= maxSelect) return;
      onChange([...value, optionValue]);
    }
  };

  const addCustom = () => {
    let trimmed = customInput.trim();
    if (!trimmed) return;
    if (maxItemLength) trimmed = trimmed.substring(0, maxItemLength);
    if (value.includes(trimmed)) return;
    if (maxSelect && value.length >= maxSelect) return;
    onChange([...value, trimmed]);
    setCustomInput("");
  };

  const handleCustomKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  };

  const atMax = maxSelect !== undefined && value.length >= maxSelect;

  return (
    <fieldset className="space-y-2" id={id}>
      <legend className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block">
        {label}
      </legend>
      {hint && <p className="text-xs text-muted-foreground pl-1">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option.value);
          const disabled = !selected && atMax;
          return (
            <button
              key={option.value}
              type="button"
              role="checkbox"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => toggle(option.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border hover:border-primary/50"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {option.label}
            </button>
          );
        })}
        {/* Render custom values not in options */}
        {value
          .filter((v) => !options.some((o) => o.value === v))
          .map((custom) => (
            <button
              key={custom}
              type="button"
              role="checkbox"
              aria-checked={true}
              onClick={() => toggle(custom)}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-primary text-primary-foreground cursor-pointer"
            >
              {custom}
            </button>
          ))}
      </div>
      {allowCustom && (
        <div className="flex items-center gap-2 pt-1">
          <Input
            aria-label={`Add custom ${label}`}
            value={customInput}
            onChange={(e) =>
              setCustomInput(
                maxItemLength
                  ? e.target.value.substring(0, maxItemLength)
                  : e.target.value,
              )
            }
            onKeyDown={handleCustomKeyDown}
            placeholder="Add custom…"
            className="flex-1 h-8 text-sm"
            disabled={atMax}
          />
          <Button
            size="sm"
            type="button"
            onClick={addCustom}
            disabled={atMax || !customInput.trim()}
          >
            Add
          </Button>
        </div>
      )}
    </fieldset>
  );
}
