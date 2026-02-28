import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  ExpertiseSection,
  ProfessionalContextSection,
  GoalsSection,
} from "@/lib/learner-profile-types";
import {
  MasteredTopicsEditor,
  MisconceptionsEditor,
  PartialTopicsEditor,
} from "@/components/profile/fields";

interface ProjectStepProps {
  professional: ProfessionalContextSection;
  goals: GoalsSection;
  expertise: ExpertiseSection;
  onChangeProfessional: (data: ProfessionalContextSection) => void;
  onChangeGoals: (data: GoalsSection) => void;
  onChangeExpertise: (data: ExpertiseSection) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function ProjectStep({
  professional,
  goals,
  expertise,
  onChangeProfessional,
  onChangeGoals,
  onChangeExpertise,
}: ProjectStepProps) {
  const project = professional.real_projects?.[0] || {
    project_name: "",
    description: "",
  };

  const subjectSpecific = expertise.subject_specific || {
    topics_already_mastered: [],
    topics_partially_known: [],
    known_misconceptions: [],
  };

  const handleProjectChange = (
    field: "project_name" | "description",
    value: string,
  ) => {
    const updatedProject = { ...project, [field]: value };
    const newProjects = [...(professional.real_projects || [])];
    newProjects[0] = updatedProject;
    onChangeProfessional({ ...professional, real_projects: newProjects });
  };

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
          Add a project (Optional)
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-xl">
          Tell us about the AI employee or system you want to build.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-background/50 border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
      >
        <div className="space-y-2">
          <Label
            htmlFor="onboarding-project-name"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Project Name
          </Label>
          <Input
            id="onboarding-project-name"
            type="text"
            value={project.project_name}
            onChange={(e) => handleProjectChange("project_name", e.target.value)}
            placeholder="e.g., AI Employee for Customer Onboarding"
            className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            maxLength={100}
            autoFocus
          />
        </div>

        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="flex justify-between items-baseline mb-2">
            <Label
              htmlFor="onboarding-project-desc"
              className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
            >
              1-2 Sentence Description
            </Label>
            <span className="text-xs text-muted-foreground font-medium shadow-sm px-2 py-0.5 rounded-md bg-accent/50">
              {project.description.length || 0} / 500
            </span>
          </div>
          <Textarea
            id="onboarding-project-desc"
            value={project.description}
            onChange={(e) =>
              handleProjectChange("description", e.target.value.substring(0, 500))
            }
            placeholder="I want to build a tool that reads our company PDFs and answers HR questions…"
            className="w-full text-lg rounded-2xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors min-h-[120px] resize-none font-medium"
            maxLength={500}
          />
        </div>

        <div className="space-y-2 pt-6 border-t border-border/50">
          <Label
            htmlFor="onboarding-career-goal"
            className="text-sm font-semibold tracking-wide text-muted-foreground uppercase pl-1 opacity-90 block"
          >
            Career Goal (Optional)
          </Label>
          <Input
            id="onboarding-career-goal"
            type="text"
            value={goals.career_goal || ""}
            onChange={(e) =>
              onChangeGoals({
                ...goals,
                career_goal: e.target.value.substring(0, 300) || null,
              })
            }
            placeholder="e.g., Promotion to Senior Engineer"
            className="w-full text-lg h-auto rounded-xl border border-border/50 bg-background/50 px-5 py-4 text-foreground placeholder:text-muted-foreground/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 transition-colors font-medium"
            maxLength={300}
          />
        </div>

        <div className="pt-6 border-t border-border/50">
          <details className="rounded-2xl border border-border/50 bg-background/40 p-5">
            <summary className="cursor-pointer select-none font-semibold text-base">
              Teach the tutor what to skip (Optional)
            </summary>
            <div className="pt-4 space-y-10">
              <MasteredTopicsEditor
                topics={subjectSpecific.topics_already_mastered || []}
                onChange={(topics) =>
                  onChangeExpertise({
                    ...expertise,
                    subject_specific: { ...subjectSpecific, topics_already_mastered: topics },
                  })
                }
              />

              <PartialTopicsEditor
                topics={subjectSpecific.topics_partially_known || []}
                onChange={(topics) =>
                  onChangeExpertise({
                    ...expertise,
                    subject_specific: { ...subjectSpecific, topics_partially_known: topics },
                  })
                }
              />

              <MisconceptionsEditor
                items={subjectSpecific.known_misconceptions || []}
                onChange={(items) =>
                  onChangeExpertise({
                    ...expertise,
                    subject_specific: { ...subjectSpecific, known_misconceptions: items },
                  })
                }
              />
            </div>
          </details>
        </div>
      </motion.div>
    </motion.div>
  );
}
