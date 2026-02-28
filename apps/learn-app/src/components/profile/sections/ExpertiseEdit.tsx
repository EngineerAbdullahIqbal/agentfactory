import React from "react";
import type {
  ExpertiseSection,
  DomainExpertise,
} from "@/lib/learner-profile-types";
import { ExpertiseLevelSelect } from "@/components/profile/fields/ExpertiseLevelSelect";
import {
  ChipSelect,
  MasteredTopicsEditor,
  PartialTopicsEditor,
  MisconceptionsEditor,
} from "@/components/profile/fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROGRAMMING_LANGUAGES = [
  { value: "Python", label: "Python" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Java", label: "Java" },
  { value: "C#", label: "C#" },
  { value: "Go", label: "Go" },
  { value: "Rust", label: "Rust" },
  { value: "Ruby", label: "Ruby" },
  { value: "PHP", label: "PHP" },
  { value: "Swift", label: "Swift" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "C++", label: "C++" },
];

export function ExpertiseEdit({
  data,
  onChange,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
}) {
  const expertise = data as ExpertiseSection;
  const subjectSpecific = expertise.subject_specific || {
    topics_already_mastered: [],
    topics_partially_known: [],
    known_misconceptions: [],
  };

  const updateNested = (
    path: "programming" | "ai_fluency" | "business",
    value: string,
  ) => {
    onChange({
      ...expertise,
      [path]: { ...expertise[path], level: value },
    });
  };

  const domains: DomainExpertise[] = (expertise.domain || []).filter(
    (d) => d.level !== "none" || d.domain_name || d.notes,
  );

  const setDomains = (nextDomains: DomainExpertise[]) => {
    const normalized = nextDomains
      .filter((d) => d.level !== "none" || d.domain_name || d.notes)
      .slice(0, 5);

    if (normalized.length === 0) {
      onChange({ ...expertise, domain: [] });
      return;
    }

    const primaryIndex = normalized.findIndex((d) => d.is_primary);
    const primary = primaryIndex === -1 ? 0 : primaryIndex;

    onChange({
      ...expertise,
      domain: normalized.map((d, idx) => ({
        ...d,
        is_primary: idx === primary,
      })),
    });
  };

  const addDomain = () => {
    if (domains.length >= 5) return;
    setDomains([
      ...domains,
      {
        level: "beginner",
        domain_name: null,
        is_primary: domains.length === 0,
        notes: null,
      },
    ]);
  };

  const removeDomain = (index: number) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const setPrimaryDomain = (index: number) => {
    setDomains(domains.map((d, i) => ({ ...d, is_primary: i === index })));
  };

  const updateDomain = (index: number, patch: Partial<DomainExpertise>) => {
    if (patch.level === "none") {
      removeDomain(index);
      return;
    }

    setDomains(domains.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  };

  return (
    <div className="space-y-6">
      <ExpertiseLevelSelect
        label="Programming"
        value={expertise?.programming?.level || "none"}
        onChange={(v) => updateNested("programming", v)}
      />
      <ChipSelect
        label="Programming Languages"
        value={expertise?.programming?.languages || []}
        onChange={(languages) =>
          onChange({
            ...expertise,
            programming: { ...expertise.programming, languages },
          })
        }
        options={PROGRAMMING_LANGUAGES}
        maxSelect={10}
        allowCustom
      />
      <div className="space-y-1.5">
        <label
          htmlFor="settings-programming-notes"
          className="text-sm font-medium"
        >
          Programming Notes
        </label>
        <Textarea
          id="settings-programming-notes"
          value={expertise?.programming?.notes || ""}
          onChange={(e) =>
            onChange({
              ...expertise,
              programming: {
                ...expertise.programming,
                notes: e.target.value.substring(0, 300) || null,
              },
            })
          }
          placeholder="Optional: frameworks, gaps, or what you want to focus on."
          rows={3}
          maxLength={300}
        />
      </div>

      <ExpertiseLevelSelect
        label="AI Fluency"
        value={expertise?.ai_fluency?.level || "none"}
        onChange={(v) => updateNested("ai_fluency", v)}
      />
      <div className="space-y-1.5">
        <label htmlFor="settings-ai-notes" className="text-sm font-medium">
          AI Notes
        </label>
        <Textarea
          id="settings-ai-notes"
          value={expertise?.ai_fluency?.notes || ""}
          onChange={(e) =>
            onChange({
              ...expertise,
              ai_fluency: {
                ...expertise.ai_fluency,
                notes: e.target.value.substring(0, 300) || null,
              },
            })
          }
          placeholder="Optional: tools you use, what you’ve built, what’s confusing."
          rows={3}
          maxLength={300}
        />
      </div>

      <ExpertiseLevelSelect
        label="Business Strategy"
        value={expertise?.business?.level || "none"}
        onChange={(v) => updateNested("business", v)}
      />
      <div className="space-y-1.5">
        <label
          htmlFor="settings-business-notes"
          className="text-sm font-medium"
        >
          Business Notes
        </label>
        <Textarea
          id="settings-business-notes"
          value={expertise?.business?.notes || ""}
          onChange={(e) =>
            onChange({
              ...expertise,
              business: {
                ...expertise.business,
                notes: e.target.value.substring(0, 300) || null,
              },
            })
          }
          placeholder="Optional: ROI, GTM, pricing, leadership context, etc."
          rows={3}
          maxLength={300}
        />
      </div>

      <div className="rounded-lg border border-border/50 bg-accent/10 p-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium">Domain Expertise</div>
            <div className="text-xs text-muted-foreground">
              Optional — improves examples and analogies. Add up to 5 domains
              and choose a primary.
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addDomain}
            disabled={domains.length >= 5}
          >
            Add
          </Button>
        </div>

        {domains.length === 0 ? (
          <div className="text-sm text-muted-foreground">No domains added.</div>
        ) : (
          <div className="space-y-3">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border/50 bg-background/50 p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold">
                      Domain {idx + 1}
                    </div>
                    {domain.is_primary && (
                      <div className="text-xs text-primary">Primary</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!domain.is_primary && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPrimaryDomain(idx)}
                      >
                        Set primary
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDomain(idx)}
                      aria-label="Remove domain"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <ExpertiseLevelSelect
                  label="Domain"
                  id={`settings-domain-level-${idx}`}
                  value={domain.level}
                  onChange={(v) => updateDomain(idx, { level: v })}
                />

                <div className="space-y-1.5">
                  <label
                    htmlFor={`settings-domain-name-${idx}`}
                    className="text-sm font-medium"
                  >
                    Domain Name
                  </label>
                  <Input
                    id={`settings-domain-name-${idx}`}
                    type="text"
                    value={domain.domain_name || ""}
                    onChange={(e) =>
                      updateDomain(idx, {
                        domain_name: e.target.value.substring(0, 100) || null,
                      })
                    }
                    placeholder="e.g., Healthcare operations, FinTech lending…"
                    maxLength={100}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor={`settings-domain-notes-${idx}`}
                    className="text-sm font-medium"
                  >
                    Domain Notes
                  </label>
                  <Textarea
                    id={`settings-domain-notes-${idx}`}
                    value={domain.notes || ""}
                    onChange={(e) =>
                      updateDomain(idx, {
                        notes: e.target.value.substring(0, 300) || null,
                      })
                    }
                    placeholder="Optional: key workflows, terminology, constraints."
                    rows={3}
                    maxLength={300}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {domains.length >= 5 && (
          <p className="text-xs text-muted-foreground">
            Maximum 5 domains reached.
          </p>
        )}
      </div>

      <MasteredTopicsEditor
        topics={subjectSpecific?.topics_already_mastered || []}
        onChange={(topics) =>
          onChange({
            ...expertise,
            subject_specific: {
              ...subjectSpecific,
              topics_already_mastered: topics,
            },
          })
        }
      />

      <PartialTopicsEditor
        topics={subjectSpecific?.topics_partially_known || []}
        onChange={(topics) =>
          onChange({
            ...expertise,
            subject_specific: {
              ...subjectSpecific,
              topics_partially_known: topics,
            },
          })
        }
      />

      <MisconceptionsEditor
        items={subjectSpecific?.known_misconceptions || []}
        onChange={(items) =>
          onChange({
            ...expertise,
            subject_specific: {
              ...subjectSpecific,
              known_misconceptions: items,
            },
          })
        }
      />
    </div>
  );
}
