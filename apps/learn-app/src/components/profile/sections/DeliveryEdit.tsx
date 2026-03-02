import React from "react";
import type { DeliverySection } from "@/lib/learner-profile-types";
import {
  NULL_SELECT_VALUE,
  PROGRAMMING_LANGUAGES,
} from "@/lib/learner-profile-types";
import {
  OUTPUT_FORMAT_OPTIONS,
  TARGET_LENGTH_OPTIONS,
  CODE_VERBOSITY_OPTIONS,
  LANGUAGE_PROFICIENCY_OPTIONS,
  NATIVE_LANGUAGE_OPTIONS,
  NATIVE_LANGUAGE_OTHER_VALUE,
} from "@/lib/profile-field-definitions";
import { InferredBadge } from "@/components/profile/fields";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NativeLanguageField({
  delivery,
  update,
}: {
  delivery: DeliverySection;
  update: (field: keyof DeliverySection, value: unknown) => void;
}) {
  const currentValue = delivery?.native_language ?? null;
  const isKnownOption = NATIVE_LANGUAGE_OPTIONS.some(
    (o) => o.value === currentValue && o.value !== NATIVE_LANGUAGE_OTHER_VALUE,
  );
  const selectValue =
    currentValue === null
      ? NULL_SELECT_VALUE
      : isKnownOption
        ? currentValue
        : NATIVE_LANGUAGE_OTHER_VALUE;
  const showOtherInput = selectValue === NATIVE_LANGUAGE_OTHER_VALUE;
  const otherText =
    showOtherInput && currentValue !== NATIVE_LANGUAGE_OTHER_VALUE
      ? (currentValue ?? "")
      : "";

  return (
    <div className="space-y-1.5">
      <label htmlFor="native-language" className="text-sm font-medium">
        Native Language
      </label>
      <Select
        value={selectValue}
        onValueChange={(val) => {
          if (val === NULL_SELECT_VALUE) {
            update("native_language", null);
          } else if (val === NATIVE_LANGUAGE_OTHER_VALUE) {
            update("native_language", NATIVE_LANGUAGE_OTHER_VALUE);
          } else {
            update("native_language", val);
          }
        }}
      >
        <SelectTrigger id="native-language" className="w-full">
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value={NULL_SELECT_VALUE}
            className="italic text-muted-foreground"
          >
            Select…
          </SelectItem>
          {NATIVE_LANGUAGE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showOtherInput && (
        <Input
          id="native-language-other"
          type="text"
          value={otherText}
          onChange={(e) =>
            update(
              "native_language",
              e.target.value || NATIVE_LANGUAGE_OTHER_VALUE,
            )
          }
          placeholder="Enter your language"
          maxLength={50}
        />
      )}
    </div>
  );
}

export function DeliveryEdit({
  data,
  onChange,
  fieldSources,
}: {
  data: unknown;
  onChange: (data: unknown) => void;
  fieldSources?: Record<string, string>;
}) {
  if (!data) return null;
  const delivery = data as DeliverySection;

  const update = (field: keyof DeliverySection, value: unknown) => {
    if (field === "include_code_samples" && value === false) {
      onChange({
        ...delivery,
        include_code_samples: false,
        code_verbosity: null,
      });
      return;
    }
    onChange({ ...delivery, [field]: value });
  };

  const language = delivery?.language || "English";
  const showLanguageProficiency = language.trim().toLowerCase() !== "english";
  const includeCode = delivery?.include_code_samples ?? true;

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label htmlFor="output-format" className="text-sm font-medium">
            Output Format
          </label>
          <InferredBadge
            fieldPath="delivery.output_format"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={delivery?.output_format || NULL_SELECT_VALUE}
          onValueChange={(val) =>
            update("output_format", val === NULL_SELECT_VALUE ? null : val)
          }
        >
          <SelectTrigger id="output-format" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={NULL_SELECT_VALUE}
              className="italic text-muted-foreground"
            >
              Select…
            </SelectItem>
            {OUTPUT_FORMAT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="target-length" className="text-sm font-medium">
          Target Length
        </label>
        <Select
          value={delivery?.target_length || NULL_SELECT_VALUE}
          onValueChange={(val) =>
            update("target_length", val === NULL_SELECT_VALUE ? null : val)
          }
        >
          <SelectTrigger id="target-length" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={NULL_SELECT_VALUE}
              className="italic text-muted-foreground"
            >
              Select…
            </SelectItem>
            {TARGET_LENGTH_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border/50 bg-accent/10 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Include code samples</div>
              <InferredBadge
                fieldPath="delivery.include_code_samples"
                fieldSources={fieldSources}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Turn off to focus on concepts and workflows.
            </div>
          </div>
          <Switch
            checked={includeCode}
            onCheckedChange={(checked) =>
              update("include_code_samples", checked)
            }
            aria-label="Toggle code samples"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">Visual descriptions</div>
            <div className="text-xs text-muted-foreground">
              Describe diagrams and visuals in text.
            </div>
          </div>
          <Switch
            checked={delivery?.include_visual_descriptions ?? false}
            onCheckedChange={(checked) =>
              update("include_visual_descriptions", checked)
            }
            aria-label="Toggle visual descriptions"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label htmlFor="code-verbosity" className="text-sm font-medium">
            Code Verbosity
          </label>
          <InferredBadge
            fieldPath="delivery.code_verbosity"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={delivery?.code_verbosity || NULL_SELECT_VALUE}
          onValueChange={(val) =>
            update("code_verbosity", val === NULL_SELECT_VALUE ? null : val)
          }
          disabled={!includeCode}
        >
          <SelectTrigger id="code-verbosity" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={NULL_SELECT_VALUE}
              className="italic text-muted-foreground"
            >
              Select…
            </SelectItem>
            {CODE_VERBOSITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!includeCode && (
          <p className="text-xs text-muted-foreground">
            Code verbosity is disabled when code samples are turned off.
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="delivery-language" className="text-sm font-medium">
          Language
        </label>
        <Input
          id="delivery-language"
          type="text"
          value={language}
          onChange={(e) =>
            update("language", e.target.value.substring(0, 50) || "English")
          }
          placeholder="English"
          maxLength={50}
        />
      </div>

      {showLanguageProficiency && (
        <div className="space-y-1.5">
          <label
            htmlFor="delivery-language-proficiency"
            className="text-sm font-medium"
          >
            Language Proficiency
          </label>
          <Select
            value={delivery?.language_proficiency || NULL_SELECT_VALUE}
            onValueChange={(val) =>
              update(
                "language_proficiency",
                val === NULL_SELECT_VALUE ? null : val,
              )
            }
          >
            <SelectTrigger
              id="delivery-language-proficiency"
              className="w-full"
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={NULL_SELECT_VALUE}
                className="italic text-muted-foreground"
              >
                Select…
              </SelectItem>
              {LANGUAGE_PROFICIENCY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <NativeLanguageField delivery={delivery} update={update} />

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <label
            htmlFor="preferred-code-language"
            className="text-sm font-medium"
          >
            Preferred Code Language
          </label>
          <InferredBadge
            fieldPath="delivery.preferred_code_language"
            fieldSources={fieldSources}
          />
        </div>
        <Select
          value={delivery?.preferred_code_language || NULL_SELECT_VALUE}
          onValueChange={(val) =>
            update(
              "preferred_code_language",
              val === NULL_SELECT_VALUE ? null : val,
            )
          }
        >
          <SelectTrigger id="preferred-code-language" className="w-full">
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={NULL_SELECT_VALUE}
              className="italic text-muted-foreground"
            >
              Select…
            </SelectItem>
            {PROGRAMMING_LANGUAGES.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Code examples will be shown in this language when possible.
        </p>
      </div>
    </div>
  );
}
