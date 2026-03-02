"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useHistory } from "@docusaurus/router";
import { useAuth } from "@/contexts/AuthContext";
import { useLearnerProfile } from "@/contexts/LearnerProfileContext";
import { useProgress } from "@/contexts/ProgressContext";
import { ONBOARDING_PHASES } from "@/lib/learner-profile-types";
import { completeMilestone } from "@/lib/progress-api";
import { toast } from "sonner";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { WelcomeStep } from "./WelcomeStep";
import { GoalsStep } from "./GoalsStep";
import { ExpertiseStep } from "./ExpertiseStep";
import { ProfessionalStep } from "./ProfessionalStep";
import { AccessibilityStep } from "./AccessibilityStep";
import { ProjectStep } from "./ProjectStep";
import { FinishStep } from "./FinishStep";
import { QuickPreferencesStep } from "./QuickPreferencesStep";
import type {
  GoalsSection,
  ExpertiseSection,
  ProfessionalContextSection,
  AccessibilitySection,
  CommunicationSection,
  DeliverySection,
  ProfileResponse,
} from "@/lib/learner-profile-types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STEPS = [
  { key: "goals", label: "Goals", phase: "goals" as const },
  { key: "expertise", label: "Background", phase: "expertise" as const },
  {
    key: "professional",
    label: "Professional Context",
    phase: "professional_context" as const,
  },
  {
    key: "accessibility",
    label: "Accessibility",
    phase: "accessibility" as const,
  },
  {
    key: "preferences",
    label: "Quick Preferences",
    phase: "communication_preferences" as const,
  },
  { key: "project", label: "Project", phase: "ai_enrichment" as const },
] as const;

const DEFAULT_GOALS: GoalsSection = {
  primary_learning_goal: null,
  secondary_goals: [],
  urgency: null,
  urgency_note: null,
  career_goal: null,
  immediate_application: null,
};

const DEFAULT_EXPERTISE: ExpertiseSection = {
  domain: [],
  programming: { level: "beginner", languages: [], notes: null },
  ai_fluency: { level: "beginner", notes: null },
  business: { level: "beginner", notes: null },
  subject_specific: {
    topics_already_mastered: [],
    topics_partially_known: [],
    known_misconceptions: [],
  },
};

const DEFAULT_PROFESSIONAL: ProfessionalContextSection = {
  current_role: null,
  industry: null,
  organization_type: null,
  team_context: null,
  real_projects: [],
  tools_in_use: [],
  constraints: null,
};

const DEFAULT_ACCESSIBILITY: AccessibilitySection = {
  screen_reader: false,
  cognitive_load_preference: "standard",
  color_blind_safe: false,
  dyslexia_friendly: false,
  notes: null,
};

export default function OnboardingWizard() {
  const history = useHistory();
  const homeHref = useBaseUrl("/");

  const { session, isLoading: authLoading } = useAuth();
  const {
    profile,
    isLoading: contextLoading,
    needsOnboarding,
    createNewProfile,
    completeOnboardingPhase,
    updateProfile,
  } = useLearnerProfile();

  const { refreshProgress } = useProgress();
  const { siteConfig } = useDocusaurusContext();
  const progressApiUrl =
    (siteConfig.customFields?.progressApiUrl as string) ||
    "http://localhost:8002";

  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const savingRef = useRef(false);
  const initDoneRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [goalsData, setGoalsData] = useState<GoalsSection>(DEFAULT_GOALS);
  const [expertiseData, setExpertiseData] =
    useState<ExpertiseSection>(DEFAULT_EXPERTISE);
  const [professionalData, setProfessionalData] =
    useState<ProfessionalContextSection>(DEFAULT_PROFESSIONAL);
  const [accessibilityData, setAccessibilityData] =
    useState<AccessibilitySection>(DEFAULT_ACCESSIBILITY);
  const [communicationData, setCommunicationData] = useState<
    Partial<CommunicationSection>
  >({});
  const [deliveryData, setDeliveryData] = useState<Partial<DeliverySection>>(
    {},
  );

  const syncFromProfile = useCallback((next: ProfileResponse) => {
    setGoalsData(next.goals);
    setExpertiseData(next.expertise);
    setProfessionalData(next.professional_context);
    setAccessibilityData(next.accessibility);
    setCommunicationData(next.communication || {});
    setDeliveryData(next.delivery || {});
  }, []);

  const hasUnsavedChanges = useMemo(() => {
    if (!profile) return false;
    if (currentStep < 0 || currentStep >= STEPS.length) return false;

    const stepKey = STEPS[currentStep]?.key;
    try {
      if (stepKey === "goals") {
        return JSON.stringify(goalsData) !== JSON.stringify(profile.goals);
      }
      if (stepKey === "expertise") {
        return (
          JSON.stringify(expertiseData) !== JSON.stringify(profile.expertise)
        );
      }
      if (stepKey === "professional") {
        return (
          JSON.stringify(professionalData) !==
          JSON.stringify(profile.professional_context)
        );
      }
      if (stepKey === "accessibility") {
        return (
          JSON.stringify(accessibilityData) !==
          JSON.stringify(profile.accessibility)
        );
      }
      if (stepKey === "preferences") {
        return (
          JSON.stringify({
            communication: communicationData,
            delivery: deliveryData,
          }) !==
          JSON.stringify({
            communication: profile.communication,
            delivery: profile.delivery,
          })
        );
      }
      if (stepKey === "project") {
        return (
          JSON.stringify({
            professional_context: professionalData,
            goals: goalsData,
            expertise: expertiseData,
          }) !==
          JSON.stringify({
            professional_context: profile.professional_context,
            goals: profile.goals,
            expertise: profile.expertise,
          })
        );
      }
      return false;
    } catch {
      return true;
    }
  }, [
    profile,
    currentStep,
    goalsData,
    expertiseData,
    professionalData,
    accessibilityData,
    communicationData,
    deliveryData,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hasUnsavedChanges) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [currentStep]);

  useEffect(() => {
    if (authLoading || contextLoading) return;

    // Redirect unauthenticated users back to the homepage to prevent infinite loading
    if (!session?.user) {
      history.replace(homeHref);
      return;
    }

    if (initDoneRef.current) return;

    if (profile) {
      initDoneRef.current = true;
      setGoalsData(profile.goals);
      setExpertiseData(profile.expertise);
      setProfessionalData(profile.professional_context);
      setAccessibilityData(profile.accessibility);
      if (profile.communication) setCommunicationData(profile.communication);
      if (profile.delivery) setDeliveryData(profile.delivery);

      if (profile.onboarding_completed) {
        history.replace(homeHref);
        return;
      }

      // Derive onboarding state directly from profile (no separate API call needed)
      const sectionsCompleted = profile.onboarding_sections_completed || {};

      // Find the next incomplete phase
      const nextPhase = ONBOARDING_PHASES.find(
        (phase) => !sectionsCompleted[phase],
      );
      let stepIdx = STEPS.length - 1;
      if (nextPhase) {
        const found = STEPS.findIndex((s) => s.phase === nextPhase);
        if (found !== -1) stepIdx = found;
      }
      setCurrentStep(stepIdx);

      const completed = new Set<number>();
      STEPS.forEach((s, idx) => {
        if (sectionsCompleted[s.phase]) {
          completed.add(idx);
        }
      });
      setCompletedSteps(completed);
      setIsInitializing(false);
    } else if (needsOnboarding) {
      initDoneRef.current = true;
      setCurrentStep(-1);
      setIsInitializing(false);
    }
  }, [
    authLoading,
    contextLoading,
    session,
    profile,
    needsOnboarding,
    history,
    homeHref,
    syncFromProfile,
  ]);

  const handleAgree = useCallback(async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    setError(null);
    try {
      const userId = session?.user?.id;
      if (userId && typeof window !== "undefined") {
        try {
          localStorage.removeItem(`learner_profile_opt_out:${userId}`);
        } catch {
          // ignore
        }
      }

      const created = await createNewProfile({ consent_given: true });
      syncFromProfile(created);
      setCompletedSteps(new Set());
      setCurrentStep(0);
    } catch (err) {
      console.error("[OnboardingWizard] Failed to create profile:", err);
      setError("Failed to create your profile. Please try again.");
    } finally {
      setIsSaving(false);
      savingRef.current = false;
    }
  }, [createNewProfile, session?.user?.id]);

  const handleDecline = useCallback(() => {
    const userId = session?.user?.id;
    if (userId && typeof window !== "undefined") {
      try {
        localStorage.setItem(`learner_profile_opt_out:${userId}`, "1");
        localStorage.setItem(
          `learner_profile_onboarding_redirected:${userId}`,
          "1",
        );
      } catch {
        // ignore
      }
    }

    history.replace(homeHref);
  }, [history, homeHref, session?.user?.id]);

  const advanceStep = useCallback(
    async (skip: boolean) => {
      if (savingRef.current) return;
      savingRef.current = true;
      setIsSaving(true);
      setError(null);
      try {
        const step = STEPS[currentStep];
        let data: unknown;
        if (!skip) {
          const phaseDataMap: Record<string, unknown> = {
            goals: goalsData,
            expertise: expertiseData,
            professional: professionalData,
            accessibility: accessibilityData,
            preferences: {
              communication: communicationData,
              delivery: deliveryData,
            },
          };
          data = phaseDataMap[step.key];
        }
        const updated = await completeOnboardingPhase(step.phase, data);
        syncFromProfile(updated);

        setCompletedSteps((prev) => new Set(prev).add(currentStep));

        if (!skip) {
          toast.success("+20 XP Earned!", {
            description: `You completed the ${step.label} section.`,
            className: "bg-green-500/10 border-green-500/20 text-green-500",
          });
          void completeMilestone(progressApiUrl, {
            milestone_slug: `onboarding/${step.phase}`,
          }).finally(() => refreshProgress());
        }

        setCurrentStep((prev) => prev + 1);
      } catch (err) {
        const action = skip ? "skip" : "save";
        console.error(`[OnboardingWizard] Failed to ${action} step:`, err);
        setError(`Failed to ${action}. Please try again.`);
      } finally {
        setIsSaving(false);
        savingRef.current = false;
      }
    },
    [
      currentStep,
      goalsData,
      expertiseData,
      professionalData,
      accessibilityData,
      communicationData,
      deliveryData,
      completeOnboardingPhase,
      progressApiUrl,
      refreshProgress,
      syncFromProfile,
    ],
  );

  const handleNext = useCallback(() => advanceStep(false), [advanceStep]);
  const handleSkip = useCallback(() => advanceStep(true), [advanceStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleComplete = useCallback(async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    setError(null);
    try {
      const saved = await updateProfile({
        professional_context: professionalData,
        goals: goalsData,
        expertise: expertiseData,
      });
      syncFromProfile(saved);

      const completed = await completeOnboardingPhase("ai_enrichment");
      syncFromProfile(completed);

      setCurrentStep(STEPS.length);
      void refreshProgress();
    } catch (err) {
      console.error("[OnboardingWizard] Failed to finish setup:", err);
      setError("Failed to complete setup. Please try again.");
    } finally {
      setIsSaving(false);
      savingRef.current = false;
    }
  }, [
    completeOnboardingPhase,
    updateProfile,
    professionalData,
    goalsData,
    refreshProgress,
    expertiseData,
    syncFromProfile,
  ]);

  // Framer Motion Variants
  const containerVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        mass: 1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
  };

  if (isInitializing || contextLoading) {
    return (
      <MotionConfig reducedMotion="user">
        <div className="fixed inset-0 bg-background flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 text-muted-foreground"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm tracking-wide">
              Initializing your profile...
            </p>
          </motion.div>
        </div>
      </MotionConfig>
    );
  }

  const isReviewStep = currentStep === STEPS.length - 1;
  const currentStepLabel =
    currentStep >= 0 && currentStep < STEPS.length
      ? STEPS[currentStep]?.label
      : null;
  const maxWidth =
    currentStep === -1 || currentStep === STEPS.length
      ? "max-w-2xl"
      : "max-w-xl";

  const handleExitIntent = () => {
    if (isSaving) return;
    if (hasUnsavedChanges) {
      setExitConfirmOpen(true);
      return;
    }
    history.replace(homeHref);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 bg-background flex flex-col font-sans z-[100] overflow-hidden">
        <Dialog open={exitConfirmOpen} onOpenChange={setExitConfirmOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader className="text-left">
              <DialogTitle>Exit setup?</DialogTitle>
              <DialogDescription>
                This step hasn’t been saved yet. You can come back and finish
                your Learner Profile anytime.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setExitConfirmOpen(false)}
                className="rounded-xl"
              >
                Stay
              </Button>
              <Button
                onClick={() => history.replace(homeHref)}
                className="rounded-xl"
              >
                Exit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Minimal Top Bar */}
        {currentStep >= 0 && currentStep < STEPS.length && (
          <header className="fixed top-0 left-0 w-full h-16 border-b border-border/40 bg-background/80 backdrop-blur-md z-[110] flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="md:hidden font-semibold">
                {currentStepLabel}{" "}
                <span className="text-muted-foreground font-normal">
                  ({currentStep + 1}/{STEPS.length})
                </span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-semibold">Learner Profile</span>
                <span className="text-xs text-muted-foreground">
                  {currentStepLabel}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline-block">
                ~90 seconds &middot; You can skip anything
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExitIntent}
                className="text-muted-foreground hover:text-foreground"
              >
                Exit
              </Button>
            </div>
            {/* Mobile progress bar along the bottom of the header */}
            <Progress
              value={(currentStep / (STEPS.length - 1)) * 100}
              className="absolute bottom-0 left-0 w-full h-[2px] rounded-none bg-transparent [&>div]:bg-primary md:hidden"
            />
          </header>
        )}

        {/* Main Content Area - Split Layout on Desktop */}
        <div
          className={`flex-1 flex overflow-hidden ${currentStep >= 0 && currentStep < STEPS.length ? "pt-16" : ""}`}
        >
          {/* Left Stepper Desktop */}
          {currentStep >= 0 && currentStep < STEPS.length && (
            <aside className="hidden md:flex w-[280px] lg:w-[320px] flex-col border-r border-border/40 bg-accent/20 p-6 overflow-y-auto">
              <div className="space-y-6 mt-8">
                {STEPS.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isPast = idx < currentStep;
                  return (
                    <div
                      key={idx}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex items-start gap-4 ${isActive ? "text-primary" : isPast ? "text-primary/70" : "text-muted-foreground/60"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 border-2 transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary"
                            : isPast
                              ? "bg-primary/20 border-primary/30 text-primary"
                              : "bg-transparent border-muted-foreground/30"
                        }`}
                      >
                        {isPast ? "✓" : idx + 1}
                      </div>
                      <div className="flex flex-col mt-1">
                        <span
                          className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}
                        >
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          )}

          {/* Main Form Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden relative"
          >
            <div className={`px-4 sm:px-6`}>
              <div
                className={`mx-auto w-full relative min-h-[100dvh] flex flex-col justify-start py-12 pb-32 ${maxWidth}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    {currentStep === -1 && (
                      <WelcomeStep
                        onAgree={handleAgree}
                        onDecline={handleDecline}
                        isSaving={isSaving}
                      />
                    )}
                    {currentStep === 0 && (
                      <GoalsStep data={goalsData} onChange={setGoalsData} />
                    )}
                    {currentStep === 1 && (
                      <ExpertiseStep
                        data={expertiseData}
                        onChange={setExpertiseData}
                      />
                    )}
                    {currentStep === 2 && (
                      <ProfessionalStep
                        data={professionalData}
                        onChange={setProfessionalData}
                      />
                    )}
                    {currentStep === 3 && (
                      <AccessibilityStep
                        data={accessibilityData}
                        onChange={setAccessibilityData}
                      />
                    )}
                    {currentStep === 4 && (
                      <QuickPreferencesStep
                        communication={communicationData}
                        delivery={deliveryData}
                        onChangeCommunication={setCommunicationData}
                        onChangeDelivery={setDeliveryData}
                      />
                    )}
                    {isReviewStep && (
                      <ProjectStep
                        professional={professionalData}
                        goals={goalsData}
                        expertise={expertiseData}
                        onChangeProfessional={setProfessionalData}
                        onChangeGoals={setGoalsData}
                        onChangeExpertise={setExpertiseData}
                      />
                    )}
                    {currentStep === STEPS.length && <FinishStep />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Controls */}
            {currentStep >= 0 && currentStep < STEPS.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="sticky bottom-0 left-0 w-full border-t border-border/40 bg-background/80 backdrop-blur-md z-[105]"
              >
                <div className="px-4 sm:px-6 py-4">
                  <div className={`mx-auto w-full ${maxWidth} space-y-3`}>
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          className="w-full text-destructive text-sm font-medium px-4 py-3 bg-destructive/10 rounded-xl border border-destructive/20"
                          role="alert"
                          aria-live="polite"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between w-full">
                      <div className="flex">
                        {currentStep > 0 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleBack}
                            disabled={isSaving}
                            className="rounded-xl px-3 md:px-4 py-2 hover:bg-accent transition-colors"
                            aria-label="Go back to previous step"
                          >
                            Back
                          </Button>
                        ) : (
                          <div className="w-[60px]" />
                        )}
                      </div>

                      <div className="flex items-center gap-1 md:gap-3">
                        {!isReviewStep && (
                          <Button
                            type="button"
                            variant="link"
                            onClick={handleSkip}
                            disabled={isSaving}
                            className="text-muted-foreground/60 hover:text-foreground hover:no-underline rounded-xl px-3 md:px-4 transition-colors font-normal text-sm"
                            aria-label="Skip to next step"
                          >
                            Skip for now
                          </Button>
                        )}
                        {isReviewStep ? (
                          <Button
                            type="button"
                            onClick={handleComplete}
                            disabled={isSaving}
                            className="rounded-xl px-5 md:px-6 font-medium shadow-md shadow-primary/20 whitespace-nowrap"
                          >
                            {isSaving && (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            {isSaving ? (
                              "Processing…"
                            ) : (
                              <>
                                <span className="hidden sm:inline">
                                  Enter Agent Factory
                                </span>
                                <span className="sm:hidden">Finish</span>
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            onClick={handleNext}
                            disabled={isSaving}
                            className="rounded-xl px-5 md:px-6 font-medium shadow-md shadow-primary/20 whitespace-nowrap"
                          >
                            {isSaving && (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            {isSaving ? "Saving…" : "Save & Continue"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
