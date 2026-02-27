import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";
import { SECTION_NAMES } from "@/lib/learner-profile-types";
import type { SectionName } from "@/lib/learner-profile-types";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { CompletenessBanner } from "./CompletenessBanner";
import { DangerZone } from "./DangerZone";
import * as sections from "./sections";
import { motion, MotionConfig } from "framer-motion";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

const SECTION_COMPONENTS: Record<
  SectionName,
  {
    View: React.ComponentType<{ data: unknown }>;
    Edit: React.ComponentType<{
      data: unknown;
      onChange: (data: unknown) => void;
      fieldSources?: Record<string, string>;
    }>;
  }
> = {
  goals: { View: sections.GoalsView, Edit: sections.GoalsEdit },
  expertise: { View: sections.ExpertiseView, Edit: sections.ExpertiseEdit },
  professional_context: {
    View: sections.ProfessionalView,
    Edit: sections.ProfessionalEdit,
  },
  communication: {
    View: sections.CommunicationView,
    Edit: sections.CommunicationEdit,
  },
  delivery: { View: sections.DeliveryView, Edit: sections.DeliveryEdit },
  accessibility: {
    View: sections.AccessibilityView,
    Edit: sections.AccessibilityEdit,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function ProfileSettings() {
  const { session } = useAuth();
  const { profile, isLoading } = useLearnerProfile();
  const onboardingHref = useBaseUrl("/onboarding");

  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground font-medium text-lg">
          Sign in to view your Learner Profile.
        </p>
      </div>
    );
  }

  if (isLoading && !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground tracking-wide uppercase text-sm font-semibold">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <p className="text-xl font-medium text-muted-foreground">
          You don’t have a Learner Profile yet.
        </p>
        <Link
          to={onboardingHref}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
        >
          Start setup
        </Link>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background/50 relative">
        {/* Background ambient glow */}
        <div className="absolute top-[-10%] inset-x-0 h-[500px] w-full bg-primary/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative z-10 flex flex-col pt-24 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Learner Profile
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Control how Agent Factory explains concepts, chooses examples, and
              sets depth. Update anytime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CompletenessBanner />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {SECTION_NAMES.map((section) => {
              const components = SECTION_COMPONENTS[section];
              if (!components) return null;
              return (
                <motion.div
                  key={section}
                  variants={itemVariants}
                  layout="position"
                >
                  <ProfileSectionCard
                    section={section}
                    ViewComponent={components.View}
                    EditComponent={components.Edit}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-12 mt-12 border-t border-border/50"
          >
            <DangerZone />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
