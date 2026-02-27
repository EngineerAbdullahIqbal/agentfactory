import React from "react";
import { ExpertiseLevelSelect, ChipSelect } from "@/components/profile/fields";
import type { ExpertiseSection } from "@/lib/learner-profile-types";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface ExpertiseStepProps {
  data: ExpertiseSection;
  onChange: (data: ExpertiseSection) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function ExpertiseStep({ data, onChange }: ExpertiseStepProps) {
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
          Where are you starting from?
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          This controls the vocabulary, code depth, and concept explanations in
          every lesson.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
          <div>
            <ExpertiseLevelSelect
              label="Programming"
              value={data.programming.level}
              onChange={(level) =>
                onChange({
                  ...data,
                  programming: { ...data.programming, level: level as any },
                })
              }
            />
            <p className="text-xs text-muted-foreground/70 mt-2 pl-1">
              Determines whether lessons include code samples, and how detailed
              the explanations are.
            </p>
            {data.programming.level && data.programming.level !== "none" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-4"
              >
                <ChipSelect
                  label="Languages you know"
                  value={data.programming.languages || []}
                  onChange={(languages) =>
                    onChange({
                      ...data,
                      programming: { ...data.programming, languages },
                    })
                  }
                  options={PROGRAMMING_LANGUAGES}
                  maxSelect={10}
                  allowCustom
                  hint="Select all that apply, or add your own"
                />
              </motion.div>
            )}
          </div>
          <div className="h-px bg-border/50 w-full" />
          <div>
            <ExpertiseLevelSelect
              label="AI Fluency"
              value={data.ai_fluency.level}
              onChange={(level) =>
                onChange({
                  ...data,
                  ai_fluency: { ...data.ai_fluency, level: level as any },
                })
              }
            />
            <p className="text-xs text-muted-foreground/70 mt-2 pl-1">
              Determines whether we define terms like "agent," "RAG," and "tool
              use" or assume you know them.
            </p>
          </div>
          <div className="h-px bg-border/50 w-full" />
          <div>
            <ExpertiseLevelSelect
              label="Business Strategy"
              value={data.business.level}
              onChange={(level) =>
                onChange({
                  ...data,
                  business: { ...data.business, level: level as any },
                })
              }
            />
            <p className="text-xs text-muted-foreground/70 mt-2 pl-1">
              Determines the business framing — ROI models, go-to-market, and
              monetization depth.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 pt-6">
        <div className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <ExpertiseLevelSelect
            label="Specialized Domain (Optional)"
            value={data.domain[0]?.level || ""}
            onChange={(level) => {
              const domain = [...data.domain];
              if (domain.length === 0) {
                domain.push({
                  level: level as any,
                  domain_name: null,
                  is_primary: true,
                  notes: null,
                });
              } else {
                domain[0] = { ...domain[0], level: level as any };
                if (level === "none" || !level) {
                  domain[0].domain_name = null;
                }
              }
              onChange({ ...data, domain });
            }}
          />
          <p className="text-xs text-muted-foreground/70 -mt-2 pl-1">
            Your domain expertise lets us use examples from your field instead
            of generic ones.
          </p>

          {data.domain[0]?.level && data.domain[0].level !== "none" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pt-2"
            >
              <Label
                htmlFor="onboarding-domain-name"
                className="text-xs font-semibold tracking-wide text-muted-foreground uppercase pl-1 mb-2 block"
              >
                What is your domain?
              </Label>
              <Input
                id="onboarding-domain-name"
                type="text"
                value={data.domain[0]?.domain_name || ""}
                onChange={(e) => {
                  const domain = [...data.domain];
                  domain[0] = {
                    ...domain[0],
                    domain_name: e.target.value || null,
                  };
                  onChange({ ...data, domain });
                }}
                placeholder="e.g., Healthcare operations, FinTech lending, K-12 education…"
                className="w-full text-base h-14 rounded-xl border border-border/50 bg-background/50 px-5 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
                maxLength={100}
                autoFocus
              />
              <p className="text-xs text-muted-foreground/70 mt-2 pl-1">
                Be specific — "supply chain logistics" works better than just
                "logistics."
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
