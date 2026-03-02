import React from "react";
import type {
  CommunicationSection,
  DeliverySection,
} from "@/lib/learner-profile-types";
import { PROGRAMMING_LANGUAGES } from "@/lib/learner-profile-types";
import {
  PREFERRED_STRUCTURE_OPTIONS,
  VERBOSITY_OPTIONS,
  TONE_OPTIONS,
  LANGUAGE_PROFICIENCY_OPTIONS,
  NATIVE_LANGUAGE_OPTIONS,
  NATIVE_LANGUAGE_OTHER_VALUE,
  RESPONSE_LANGUAGE_OPTIONS,
  RESPONSE_LANGUAGE_OTHER_VALUE,
  resolveNativeLanguageSelectState,
  resolveResponseLanguageSelectState,
} from "@/lib/profile-field-definitions";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { itemVariants, staggerContainerVariants } from "./variants";

interface QuickPreferencesStepProps {
  communication: Partial<CommunicationSection>;
  delivery: Partial<DeliverySection>;
  onChangeCommunication: (data: Partial<CommunicationSection>) => void;
  onChangeDelivery: (data: Partial<DeliverySection>) => void;
}

/** Onboarding shows a curated subset of the full option sets. */
const ONBOARDING_STRUCTURES = new Set([
  "examples-first",
  "theory-first",
  "problem-first",
]);
const ONBOARDING_TONES = new Set([
  "conversational",
  "professional",
  "peer-to-peer",
]);

const RADIO_GROUPS = [
  {
    id: "learning-style",
    label: "Learning Style",
    field: "preferred_structure" as const,
    options: PREFERRED_STRUCTURE_OPTIONS.filter((o) =>
      ONBOARDING_STRUCTURES.has(o.value),
    ),
  },
  {
    id: "detail-level",
    label: "Detail Level",
    field: "verbosity" as const,
    options: VERBOSITY_OPTIONS,
  },
  {
    id: "tone",
    label: "Tone",
    field: "tone" as const,
    options: TONE_OPTIONS.filter((o) => ONBOARDING_TONES.has(o.value)),
  },
];

export function QuickPreferencesStep({
  communication,
  delivery,
  onChangeCommunication,
  onChangeDelivery,
}: QuickPreferencesStepProps) {
  const wantsSummaries = communication.wants_summaries ?? true;
  const wantsCheckIns = communication.wants_check_in_questions ?? true;

  // Determine if native_language stored value is a known option or freetext "other"
  const {
    selectValue: nativeSelectValue,
    showOtherInput: showNativeOtherInput,
    otherText: nativeOtherText,
  } = resolveNativeLanguageSelectState(delivery.native_language ?? null, "");

  // Determine response language select state (stores full names like "English")
  const {
    selectValue: langSelectValue,
    showOtherInput: showLangOtherInput,
    otherText: langOtherText,
  } = resolveResponseLanguageSelectState(delivery.language ?? null, "");
  const currentLanguage = delivery.language ?? "English";
  const showProficiency = currentLanguage.toLowerCase() !== "english";

  return (
    <motion.div
      className="space-y-12 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          How should your AI tutor communicate?
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          These directly control the voice, depth, and structure of every
          explanation.
        </p>
      </motion.div>

      {RADIO_GROUPS.map((group) => (
        <motion.div
          key={group.id}
          variants={itemVariants}
          className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-4"
        >
          <Label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block">
            {group.label}
          </Label>
          <RadioGroup
            value={
              (communication[group.field] as string | undefined) ?? undefined
            }
            onValueChange={(val: string) =>
              onChangeCommunication({ ...communication, [group.field]: val })
            }
            className="grid grid-cols-1 gap-4"
          >
            {group.options.map((option) => (
              <div key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={`onboarding-${group.id}-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`onboarding-${group.id}-${option.value}`}
                  className="relative flex flex-col gap-2 rounded-2xl border-2 border-border/50 p-5 cursor-pointer transition-colors transition-shadow duration-300 overflow-hidden bg-background/50 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-foreground">
                      {option.label}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        communication[group.field] === option.value
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {communication[group.field] === option.value && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-normal text-muted-foreground leading-relaxed">
                    {option.hint}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>
      ))}

      <motion.div
        variants={itemVariants}
        className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-5"
      >
        <Label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block">
          Learning Aids
        </Label>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/50 p-4 transition-colors hover:border-border/80">
            <div className="space-y-1">
              <Label
                htmlFor="onboarding-wants-summaries"
                className="text-base font-medium leading-none cursor-pointer"
              >
                Include summaries
              </Label>
              <p className="text-sm text-muted-foreground pt-1">
                End sections with a short recap and next steps.
              </p>
            </div>
            <Switch
              id="onboarding-wants-summaries"
              checked={wantsSummaries}
              onCheckedChange={(checked) =>
                onChangeCommunication({
                  ...communication,
                  wants_summaries: checked,
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background/50 p-4 transition-colors hover:border-border/80">
            <div className="space-y-1">
              <Label
                htmlFor="onboarding-wants-checkins"
                className="text-base font-medium leading-none cursor-pointer"
              >
                Check-in questions
              </Label>
              <p className="text-sm text-muted-foreground pt-1">
                Ask quick “Does this make sense?” questions to confirm
                understanding.
              </p>
            </div>
            <Switch
              id="onboarding-wants-checkins"
              checked={wantsCheckIns}
              onCheckedChange={(checked) =>
                onChangeCommunication({
                  ...communication,
                  wants_check_in_questions: checked,
                })
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </motion.div>

      {/* Language block — always visible */}
      <motion.div
        variants={itemVariants}
        className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
      >
        <div className="space-y-2">
          <Label
            htmlFor="onboarding-native-language"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Native Language
          </Label>
          <Select
            value={nativeSelectValue}
            onValueChange={(val: string) => {
              if (val === NATIVE_LANGUAGE_OTHER_VALUE) {
                onChangeDelivery({
                  ...delivery,
                  native_language: NATIVE_LANGUAGE_OTHER_VALUE,
                });
              } else {
                onChangeDelivery({ ...delivery, native_language: val || null });
              }
            }}
          >
            <SelectTrigger
              id="onboarding-native-language"
              className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            >
              <SelectValue placeholder="Select your native language" />
            </SelectTrigger>
            <SelectContent className="z-[200]">
              {NATIVE_LANGUAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showNativeOtherInput && (
            <Input
              id="onboarding-native-language-other"
              type="text"
              value={nativeOtherText}
              onChange={(e) =>
                onChangeDelivery({
                  ...delivery,
                  native_language:
                    e.target.value || NATIVE_LANGUAGE_OTHER_VALUE,
                })
              }
              placeholder="Enter your language"
              className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
              maxLength={50}
            />
          )}
          <p className="text-xs text-muted-foreground/70 pl-1">
            Your mother tongue — helps the AI tutor choose vocabulary and
            analogies.
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="onboarding-language"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Preferred Language
          </Label>
          <Select
            value={langSelectValue}
            onValueChange={(val: string) => {
              if (val === RESPONSE_LANGUAGE_OTHER_VALUE) {
                onChangeDelivery({
                  ...delivery,
                  language: RESPONSE_LANGUAGE_OTHER_VALUE,
                });
              } else {
                onChangeDelivery({
                  ...delivery,
                  language: val || "English",
                });
              }
            }}
          >
            <SelectTrigger
              id="onboarding-language"
              className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            >
              <SelectValue placeholder="Select your preferred language" />
            </SelectTrigger>
            <SelectContent className="z-[200]">
              {RESPONSE_LANGUAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showLangOtherInput && (
            <Input
              id="onboarding-language-other"
              type="text"
              value={langOtherText}
              onChange={(e) =>
                onChangeDelivery({
                  ...delivery,
                  language: e.target.value || RESPONSE_LANGUAGE_OTHER_VALUE,
                })
              }
              placeholder="Enter your preferred language"
              className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
              maxLength={50}
            />
          )}
          <p className="text-xs text-muted-foreground/70 pl-1">
            Your AI tutor will respond in this language.
          </p>
        </div>

        {showProficiency && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-4"
          >
            <Label className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block">
              Proficiency in {currentLanguage}
            </Label>
            <RadioGroup
              value={delivery.language_proficiency ?? undefined}
              onValueChange={(val: string) =>
                onChangeDelivery({
                  ...delivery,
                  language_proficiency: val as any,
                })
              }
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {LANGUAGE_PROFICIENCY_OPTIONS.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`onboarding-proficiency-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`onboarding-proficiency-${option.value}`}
                    className="relative flex flex-col gap-2 rounded-2xl border-2 border-border/50 p-5 cursor-pointer transition-colors transition-shadow duration-300 overflow-hidden bg-background/50 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-base font-semibold text-foreground">
                        {option.label}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          delivery.language_proficiency === option.value
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {delivery.language_proficiency === option.value && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-normal text-muted-foreground leading-relaxed">
                      {option.hint}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="onboarding-preferred-code-language"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Preferred Code Language
          </Label>
          <Select
            value={delivery.preferred_code_language ?? ""}
            onValueChange={(val: string) =>
              onChangeDelivery({
                ...delivery,
                preferred_code_language: val || null,
              })
            }
          >
            <SelectTrigger
              id="onboarding-preferred-code-language"
              className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            >
              <SelectValue placeholder="Select your preferred language for code examples" />
            </SelectTrigger>
            <SelectContent className="z-[200]">
              {PROGRAMMING_LANGUAGES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground/70 pl-1">
            Code examples will be shown in this language when possible.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
