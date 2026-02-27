import React from "react";
import type { ProfessionalContextSection } from "@/lib/learner-profile-types";
import { ChipSelect } from "@/components/profile/fields";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TOOLS_OPTIONS = [
  { value: "VS Code", label: "VS Code" },
  { value: "Cursor", label: "Cursor" },
  { value: "GitHub Copilot", label: "GitHub Copilot" },
  { value: "Claude", label: "Claude" },
  { value: "ChatGPT", label: "ChatGPT" },
  { value: "Docker", label: "Docker" },
  { value: "AWS", label: "AWS" },
  { value: "Jira", label: "Jira" },
  { value: "Slack", label: "Slack" },
  { value: "Notion", label: "Notion" },
  { value: "Linear", label: "Linear" },
  { value: "Figma", label: "Figma" },
];

interface ProfessionalStepProps {
  data: ProfessionalContextSection;
  onChange: (data: ProfessionalContextSection) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function ProfessionalStep({ data, onChange }: ProfessionalStepProps) {
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
          Ground it in your world
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          Lessons will use examples from your industry and role instead of
          generic ones.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="space-y-6 bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm"
      >
        <div className="space-y-2">
          <Label
            htmlFor="onboarding-current-role"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Current Role
          </Label>
          <Input
            id="onboarding-current-role"
            type="text"
            value={data.current_role || ""}
            onChange={(e) =>
              onChange({ ...data, current_role: e.target.value || null })
            }
            placeholder="e.g., Product Manager at a SaaS startup"
            className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            maxLength={100}
            autoFocus
          />
          <p className="text-xs text-muted-foreground/70 pl-1">
            Include seniority + context for better examples. "CTO at a 10-person
            fintech" beats "Manager."
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-border/50">
          <Label
            htmlFor="onboarding-industry"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Primary Industry
          </Label>
          <Input
            id="onboarding-industry"
            type="text"
            value={data.industry || ""}
            onChange={(e) =>
              onChange({ ...data, industry: e.target.value || null })
            }
            placeholder="e.g., B2B SaaS, Healthcare IT, E-Commerce"
            className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground/70 pl-1">
            This drives analogies — "healthcare" gets patient triage examples,
            "e-commerce" gets order fulfillment.
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-border/50">
          <Label
            htmlFor="onboarding-team-context"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Team Context (Optional)
          </Label>
          <Select
            value={data.team_context || ""}
            onValueChange={(val) =>
              onChange({ ...data, team_context: val === "none" ? null : val })
            }
          >
            <SelectTrigger
              id="onboarding-team-context"
              className="w-full h-auto text-lg rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground transition-colors"
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent className="z-[120] rounded-xl">
              <SelectItem value="none" className="text-muted-foreground italic">
                Skip
              </SelectItem>
              <SelectItem value="solo">Solo / side project</SelectItem>
              <SelectItem value="small_team">Small team (2-10)</SelectItem>
              <SelectItem value="larger_team">Larger team (10+)</SelectItem>
              <SelectItem value="leading">Leading a team</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground/70 pl-1">
            Solo learners get individual workflows. Team leads get delegation
            patterns.
          </p>
        </div>

        <div className="space-y-2 pt-6 border-t border-border/50">
          <Label
            htmlFor="onboarding-org-type"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Organization Scale (Optional)
          </Label>
          <Select
            value={data.organization_type || ""}
            onValueChange={(val) =>
              onChange({
                ...data,
                organization_type: val === "none" ? null : val,
              })
            }
          >
            <SelectTrigger
              id="onboarding-org-type"
              className="w-full h-auto text-lg rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground transition-colors"
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent className="z-[120] rounded-xl">
              <SelectItem value="none" className="text-muted-foreground italic">
                Skip
              </SelectItem>
              <SelectItem value="freelance">Freelance / Solo</SelectItem>
              <SelectItem value="startup">Startup &lt; 50</SelectItem>
              <SelectItem value="small_business">
                Small Business &lt; 500
              </SelectItem>
              <SelectItem value="enterprise">Enterprise 500+</SelectItem>
              <SelectItem value="non_profit">Non-Profit / NGO</SelectItem>
              <SelectItem value="education">Education / Academic</SelectItem>
              <SelectItem value="government">
                Government / Public Sector
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground/70 pl-1">
            Startup examples focus on speed and scrappiness. Enterprise examples
            address governance and scale.
          </p>
        </div>

        <div className="space-y-2 pt-6 border-t border-border/50">
          <ChipSelect
            label="Tools You Use"
            value={data.tools_in_use || []}
            onChange={(tools) => onChange({ ...data, tools_in_use: tools })}
            options={TOOLS_OPTIONS}
            maxSelect={20}
            maxItemLength={50}
            allowCustom
            hint="Helps us reference tools you already know in examples"
          />
        </div>

        <div className="pt-6 border-t border-border/50">
          <details className="rounded-2xl border border-border/50 bg-background/40 p-5">
            <summary className="cursor-pointer select-none font-semibold text-base">
              Add constraints (Optional)
            </summary>
            <div className="pt-4 space-y-3">
              <div className="flex justify-between items-baseline mb-2">
                <Label
                  htmlFor="onboarding-constraints"
                  className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
                >
                  Constraints
                </Label>
                <span className="text-xs text-muted-foreground font-medium shadow-sm px-2 py-0.5 rounded-md bg-accent/50">
                  {data.constraints?.length || 0} / 300
                </span>
              </div>
              <Textarea
                id="onboarding-constraints"
                value={data.constraints || ""}
                onChange={(e) =>
                  onChange({
                    ...data,
                    constraints: e.target.value.substring(0, 300) || null,
                  })
                }
                placeholder="e.g., No cloud access, must use Python, limited time each day, I can’t install new software…"
                className="w-full text-base min-h-[110px] rounded-2xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium resize-none"
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground/70 pl-1">
                Helps the tutor choose realistic tools, architectures, and examples.
              </p>
            </div>
          </details>
        </div>
      </motion.div>
    </motion.div>
  );
}
