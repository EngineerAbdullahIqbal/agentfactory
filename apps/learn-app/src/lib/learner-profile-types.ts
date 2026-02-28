// Literal union types matching backend enums
export type ExpertiseLevel =
  | "none"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";
export type Urgency = "low" | "medium" | "high";
export type LanguageComplexity =
  | "plain"
  | "professional"
  | "technical"
  | "expert";
export type PreferredStructure =
  | "examples-first"
  | "theory-first"
  | "story-narrative"
  | "reference-lookup"
  | "problem-first";
export type Verbosity = "concise" | "moderate" | "detailed";
export type Tone =
  | "formal"
  | "professional"
  | "conversational"
  | "peer-to-peer";
export type OutputFormat = "prose" | "structured-with-headers" | "mixed";
export type TargetLength = "short" | "medium" | "long" | "match-source";
export type CodeVerbosity = "minimal" | "annotated" | "fully-explained";
export type LanguageProficiency =
  | "native"
  | "fluent"
  | "intermediate"
  | "basic";
export type CognitiveLoadPreference = "standard" | "reduced";
export type MasteredTopicTreatment = "reference" | "skip";

// Section interfaces matching backend exactly
export interface DomainExpertise {
  level: ExpertiseLevel;
  domain_name: string | null;
  is_primary: boolean;
  notes: string | null;
}

export interface ProgrammingExpertise {
  level: ExpertiseLevel;
  languages: string[];
  notes: string | null;
}

export interface AiFluencyExpertise {
  level: ExpertiseLevel;
  notes: string | null;
}

export interface BusinessExpertise {
  level: ExpertiseLevel;
  notes: string | null;
}

export interface MasteredTopic {
  topic: string;
  treatment: MasteredTopicTreatment;
}

export interface PartialTopic {
  topic: string;
  knowledge_state: string;
}

export interface Misconception {
  topic: string;
  misconception: string;
}

export interface SubjectSpecific {
  topics_already_mastered: MasteredTopic[];
  topics_partially_known: PartialTopic[];
  known_misconceptions: Misconception[];
}

export interface ExpertiseSection {
  domain: DomainExpertise[];
  programming: ProgrammingExpertise;
  ai_fluency: AiFluencyExpertise;
  business: BusinessExpertise;
  subject_specific: SubjectSpecific;
}

export interface RealProject {
  project_name: string;
  description: string;
}

export interface ProfessionalContextSection {
  current_role: string | null;
  industry: string | null;
  organization_type: string | null;
  team_context: string | null;
  real_projects: RealProject[];
  tools_in_use: string[];
  constraints: string | null;
}

export interface GoalsSection {
  primary_learning_goal: string | null;
  secondary_goals: string[];
  urgency: Urgency | null;
  urgency_note: string | null;
  career_goal: string | null;
  immediate_application: string | null;
}

export interface CommunicationSection {
  language_complexity: LanguageComplexity | null;
  preferred_structure: PreferredStructure | null;
  verbosity: Verbosity | null;
  analogy_domain: string | null;
  tone: Tone | null;
  wants_summaries: boolean | null;
  wants_check_in_questions: boolean | null;
  format_notes: string | null;
}

export interface DeliverySection {
  output_format: OutputFormat | null;
  target_length: TargetLength | null;
  include_code_samples: boolean | null;
  code_verbosity: CodeVerbosity | null;
  include_visual_descriptions: boolean | null;
  language: string;
  language_proficiency: LanguageProficiency | null;
}

export interface AccessibilitySection {
  screen_reader: boolean;
  cognitive_load_preference: CognitiveLoadPreference;
  color_blind_safe: boolean;
  dyslexia_friendly: boolean;
  notes: string | null;
}

// Request types
export interface ProfileCreateRequest {
  consent_given?: boolean;
  name?: string | null;
  expertise?: Partial<ExpertiseSection>;
  professional_context?: Partial<ProfessionalContextSection>;
  goals?: Partial<GoalsSection>;
  communication?: Partial<CommunicationSection>;
  delivery?: Partial<DeliverySection>;
  accessibility?: Partial<AccessibilitySection>;
}

export interface ProfileUpdateRequest {
  name?: string | null;
  expertise?: Partial<ExpertiseSection>;
  professional_context?: Partial<ProfessionalContextSection>;
  goals?: Partial<GoalsSection>;
  communication?: Partial<CommunicationSection>;
  delivery?: Partial<DeliverySection>;
  accessibility?: Partial<AccessibilitySection>;
}

// Response types
export interface ProfileResponse {
  learner_id: string;
  name: string | null;
  profile_version: string;
  consent_given: boolean;
  consent_date: string | null;
  expertise: ExpertiseSection;
  professional_context: ProfessionalContextSection;
  goals: GoalsSection;
  communication: CommunicationSection;
  delivery: DeliverySection;
  accessibility: AccessibilitySection;
  field_sources?: Record<string, "user" | "phm" | "inferred" | "default">;
  onboarding_completed: boolean;
  onboarding_sections_completed: Record<string, boolean>;
  onboarding_progress: number;
  profile_completeness: number;
  created_at: string;
  updated_at: string;
}

export interface OnboardingStatus {
  learner_id: string;
  sections_completed: Record<string, boolean>;
  overall_completed: boolean;
  next_section: string | null;
  onboarding_progress: number;
  profile_completeness: number;
}

export interface CompletenessResponse {
  learner_id: string;
  profile_completeness: number;
  onboarding_progress: number;
  per_section: Record<string, number>;
  highest_impact_missing: string[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: Record<string, unknown>;
}

// Onboarding phases
export const ONBOARDING_PHASES = [
  "goals",
  "expertise",
  "professional_context",
  "accessibility",
  "communication_preferences",
  "ai_enrichment",
] as const;
export type OnboardingPhase = (typeof ONBOARDING_PHASES)[number];

// Section names
export const SECTION_NAMES = [
  "goals",
  "expertise",
  "professional_context",
  "communication",
  "delivery",
  "accessibility",
] as const;
export type SectionName = (typeof SECTION_NAMES)[number];

// Section config registry for DRY rendering
export interface SectionConfig {
  label: string;
  description: string;
}

export const SECTION_CONFIGS: Record<SectionName, SectionConfig> = {
  goals: {
    label: "Goals & Motivation",
    description: "What you want to learn and why",
  },
  expertise: {
    label: "Expertise & Skills",
    description: "Your current knowledge levels",
  },
  professional_context: {
    label: "Professional Context",
    description: "Your role, industry, and projects",
  },
  communication: {
    label: "Communication Preferences",
    description: "How you prefer to receive information",
  },
  delivery: {
    label: "Content Delivery",
    description: "Format and language preferences",
  },
  accessibility: {
    label: "Accessibility",
    description: "Screen reader, cognitive load, and display preferences",
  },
};
