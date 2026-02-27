import React from "react";
import type { CommunicationSection } from "@/lib/learner-profile-types";
import { InferredBadge } from "@/components/profile/fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGE_COMPLEXITY_OPTIONS = [
  { value: "", label: "Select…" },
  { value: "plain", label: "Plain" },
  { value: "professional", label: "Professional" },
  { value: "technical", label: "Technical" },
  { value: "expert", label: "Expert" },
];

const STRUCTURE_OPTIONS = [
  { value: "", label: "Select…" },
  { value: "examples-first", label: "Examples First" },
  { value: "theory-first", label: "Theory First" },
  { value: "story-narrative", label: "Story / Narrative" },
  { value: "reference-lookup", label: "Reference / Lookup" },
  { value: "problem-first", label: "Problem First" },
];

const VERBOSITY_OPTIONS = [
  { value: "", label: "Select…" },
  { value: "concise", label: "Concise" },
  { value: "moderate", label: "Moderate" },
  { value: "detailed", label: "Detailed" },
];

const TONE_OPTIONS = [
  { value: "", label: "Select…" },
  { value: "formal", label: "Formal" },
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "peer-to-peer", label: "Peer to Peer" },
];

export function CommunicationEdit({
  data,
  onChange,
  fieldSources,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
  fieldSources?: Record<string, string>;
}) {
  const comm = data as CommunicationSection;

  const update = (field: keyof CommunicationSection, value: unknown) => {
    onChange({ ...comm, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label htmlFor="language-complexity" className="text-sm font-medium">
            Language Complexity
          </label>
          <InferredBadge
            fieldPath="communication.language_complexity"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={comm?.language_complexity || "none"}
          onValueChange={(val) =>
            update("language_complexity", val === "none" ? null : val)
          }
        >
          <SelectTrigger id="language-complexity" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-muted-foreground">
              Select…
            </SelectItem>
            {LANGUAGE_COMPLEXITY_OPTIONS.filter((opt) => opt.value !== "").map(
              (opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label htmlFor="preferred-structure" className="text-sm font-medium">
            Preferred Structure
          </label>
          <InferredBadge
            fieldPath="communication.preferred_structure"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={comm?.preferred_structure || "none"}
          onValueChange={(val) =>
            update("preferred_structure", val === "none" ? null : val)
          }
        >
          <SelectTrigger id="preferred-structure" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-muted-foreground">
              Select…
            </SelectItem>
            {STRUCTURE_OPTIONS.filter((opt) => opt.value !== "").map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label htmlFor="verbosity" className="text-sm font-medium">
            Verbosity
          </label>
          <InferredBadge
            fieldPath="communication.verbosity"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={comm?.verbosity || "none"}
          onValueChange={(val) =>
            update("verbosity", val === "none" ? null : val)
          }
        >
          <SelectTrigger id="verbosity" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-muted-foreground">
              Select…
            </SelectItem>
            {VERBOSITY_OPTIONS.filter((opt) => opt.value !== "").map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label htmlFor="tone" className="text-sm font-medium">
            Tone
          </label>
          <InferredBadge
            fieldPath="communication.tone"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={comm?.tone || "none"}
          onValueChange={(val) => update("tone", val === "none" ? null : val)}
        >
          <SelectTrigger id="tone" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="italic text-muted-foreground">
              Select…
            </SelectItem>
            {TONE_OPTIONS.filter((opt) => opt.value !== "").map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="analogy-domain" className="text-sm font-medium">
          Analogy Domain
        </label>
        <Input
          id="analogy-domain"
          type="text"
          value={comm?.analogy_domain || ""}
          onChange={(e) =>
            update("analogy_domain", e.target.value.substring(0, 100) || null)
          }
          placeholder="Optional: e.g., cooking, sports, finance"
          maxLength={100}
        />
      </div>

      <div className="rounded-lg border border-border/50 bg-accent/10 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">Include summaries</div>
            <div className="text-xs text-muted-foreground">
              End responses with a quick recap.
            </div>
          </div>
          <Switch
            checked={comm?.wants_summaries ?? true}
            onCheckedChange={(checked) => update("wants_summaries", checked)}
            aria-label="Toggle summaries"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">Check-in questions</div>
            <div className="text-xs text-muted-foreground">
              Ask quick questions to confirm understanding.
            </div>
          </div>
          <Switch
            checked={comm?.wants_check_in_questions ?? true}
            onCheckedChange={(checked) =>
              update("wants_check_in_questions", checked)
            }
            aria-label="Toggle check-in questions"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="format-notes" className="text-sm font-medium">
          Formatting Notes
        </label>
        <Textarea
          id="format-notes"
          value={comm?.format_notes || ""}
          onChange={(e) =>
            update("format_notes", e.target.value.substring(0, 200) || null)
          }
          placeholder="Optional: e.g., “Use bullet points and code blocks; avoid long paragraphs.”"
          rows={3}
          maxLength={200}
        />
      </div>
    </div>
  );
}
