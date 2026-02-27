import React, { useMemo } from "react";
import type {
  CommunicationSection,
  DeliverySection,
} from "@/lib/learner-profile-types";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface QuickPreferencesStepProps {
  communication: Partial<CommunicationSection>;
  delivery: Partial<DeliverySection>;
  onChangeCommunication: (data: Partial<CommunicationSection>) => void;
  onChangeDelivery: (data: Partial<DeliverySection>) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const RADIO_GROUPS = [
  {
    id: "learning-style",
    label: "Learning Style",
    field: "preferred_structure" as const,
    options: [
      {
        value: "examples-first",
        title: "Examples first",
        desc: "Start with concrete code and real-world examples, then explain the concepts behind them.",
      },
      {
        value: "theory-first",
        title: "Theory first",
        desc: "Begin with the concept and mental model, then move to examples and practice.",
      },
      {
        value: "problem-first",
        title: "Start with the problem",
        desc: "Present a challenge or question upfront, then teach whatever is needed to solve it.",
      },
    ],
  },
  {
    id: "detail-level",
    label: "Detail Level",
    field: "verbosity" as const,
    options: [
      {
        value: "concise",
        title: "Keep it brief",
        desc: "Short, focused explanations. Just the essentials with minimal tangents.",
      },
      {
        value: "moderate",
        title: "Balanced",
        desc: "A mix of depth and brevity. Enough context without overwhelming.",
      },
      {
        value: "detailed",
        title: "All the details",
        desc: "Thorough explanations with deep dives, multiple examples, and full context.",
      },
    ],
  },
  {
    id: "tone",
    label: "Tone",
    field: "tone" as const,
    options: [
      {
        value: "conversational",
        title: "Casual & friendly",
        desc: "Relaxed and approachable, like chatting with a knowledgeable friend.",
      },
      {
        value: "professional",
        title: "Professional",
        desc: "Clear and polished. Structured language suited for a work setting.",
      },
      {
        value: "peer-to-peer",
        title: "Peer-to-peer",
        desc: "Direct and collaborative, like talking to a fellow engineer.",
      },
    ],
  },
] as const;

const PROFICIENCY_OPTIONS = [
  {
    value: "native",
    title: "Native",
    desc: "It's your first language.",
  },
  {
    value: "fluent",
    title: "Fluent",
    desc: "Comfortable with complex topics in this language.",
  },
  {
    value: "intermediate",
    title: "Intermediate",
    desc: "Can follow most content but may miss nuance.",
  },
  {
    value: "basic",
    title: "Basic",
    desc: "Prefer simpler vocabulary and shorter sentences.",
  },
] as const;

export function QuickPreferencesStep({
  communication,
  delivery,
  onChangeCommunication,
  onChangeDelivery,
}: QuickPreferencesStepProps) {
  const showLanguageBlock = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const lang = navigator.language || "";
    return !lang.startsWith("en");
  }, []);

  const currentLanguage = delivery.language ?? "English";
  const showProficiency = currentLanguage.toLowerCase() !== "english";
  const wantsSummaries = communication.wants_summaries ?? true;
  const wantsCheckIns = communication.wants_check_in_questions ?? true;

  return (
    <motion.div
      className="space-y-12 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
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
                      {option.title}
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
                    {option.desc}
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
                Ask quick “Does this make sense?” questions to confirm understanding.
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

      {/* Language block — shown when browser locale is not English */}
      {showLanguageBlock && (
        <motion.div
          variants={itemVariants}
          className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="onboarding-language"
              className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
            >
              Preferred Language
            </Label>
            <Input
              id="onboarding-language"
              type="text"
              value={currentLanguage}
              onChange={(e) =>
                onChangeDelivery({
                  ...delivery,
                  language: e.target.value || "English",
                })
              }
              placeholder="English"
              className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
              maxLength={50}
            />
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
                {PROFICIENCY_OPTIONS.map((option) => (
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
                          {option.title}
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
                        {option.desc}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
