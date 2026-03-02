/**
 * Single source of truth for all learner profile field options.
 *
 * Every dropdown, radio group, toggle, and chip-select in both the
 * onboarding wizard AND the profile settings page imports from here.
 *
 * Each option has:
 *   value — stored in DB / returned by API
 *   label — short display text
 *   hint  — semantic description explaining what this value means
 *           (used in onboarding UI and available to personalization agents)
 */

import type {
  ExpertiseLevel,
  Urgency,
  LanguageComplexity,
  PreferredStructure,
  Verbosity,
  Tone,
  OutputFormat,
  TargetLength,
  CodeVerbosity,
  LanguageProficiency,
  CognitiveLoadPreference,
} from "./learner-profile-types";

// ---------------------------------------------------------------------------
// Helper types
// ---------------------------------------------------------------------------

export interface FieldOption<V extends string = string> {
  value: V;
  label: string;
  hint: string;
}

export interface ToggleOption {
  key: string;
  label: string;
  hint: string;
}

// ---------------------------------------------------------------------------
// Expertise levels — keyed by axis label
// ---------------------------------------------------------------------------

export const EXPERTISE_LEVELS: Record<string, FieldOption<ExpertiseLevel>[]> = {
  Programming: [
    { value: "none", label: "None", hint: "Never written code" },
    {
      value: "beginner",
      label: "Beginner",
      hint: "Written scripts or simple programs",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Build apps, use APIs, debug independently",
    },
    {
      value: "advanced",
      label: "Advanced",
      hint: "Design systems, write production code",
    },
    {
      value: "expert",
      label: "Expert",
      hint: "Architect large codebases, mentor others",
    },
  ],
  "AI Fluency": [
    {
      value: "none",
      label: "None",
      hint: "New to AI — haven't used ChatGPT or similar",
    },
    {
      value: "beginner",
      label: "Beginner",
      hint: "Used ChatGPT / Copilot, understand prompting basics",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Built apps with AI APIs, understand RAG / tool use",
    },
    {
      value: "advanced",
      label: "Advanced",
      hint: "Designed agent architectures, evaluated LLM outputs",
    },
    {
      value: "expert",
      label: "Expert",
      hint: "Ship production AI systems, deep prompt engineering",
    },
  ],
  "Business Strategy": [
    { value: "none", label: "None", hint: "No business background" },
    {
      value: "beginner",
      label: "Beginner",
      hint: "Understand basic business concepts",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Make business cases, manage projects",
    },
    {
      value: "advanced",
      label: "Advanced",
      hint: "Drive strategy, model ROI, lead initiatives",
    },
    {
      value: "expert",
      label: "Expert",
      hint: "C-level / founder experience, deep domain expertise",
    },
  ],
};

/** Fallback for domain expertise or any unlisted axis. */
export const DEFAULT_EXPERTISE_LEVELS: FieldOption<ExpertiseLevel>[] = [
  { value: "none", label: "None", hint: "No experience" },
  { value: "beginner", label: "Beginner", hint: "Just starting" },
  {
    value: "intermediate",
    label: "Intermediate",
    hint: "Can work independently",
  },
  { value: "advanced", label: "Advanced", hint: "Deep experience" },
  { value: "expert", label: "Expert", hint: "Can teach others" },
];

// ---------------------------------------------------------------------------
// Goals
// ---------------------------------------------------------------------------

export const URGENCY_OPTIONS: FieldOption<Urgency>[] = [
  {
    value: "low",
    label: "Low",
    hint: "Building my skill portfolio at my own pace",
  },
  {
    value: "medium",
    label: "Medium",
    hint: "Steady progress — shipping something real",
  },
  { value: "high", label: "High", hint: "Need to deploy an AI employee fast" },
];

// ---------------------------------------------------------------------------
// Communication
// ---------------------------------------------------------------------------

export const LANGUAGE_COMPLEXITY_OPTIONS: FieldOption<LanguageComplexity>[] = [
  {
    value: "plain",
    label: "Plain",
    hint: "No jargon. Every term defined on first use.",
  },
  {
    value: "professional",
    label: "Professional",
    hint: "Business vocabulary. Outcome-framing. No unexplained acronyms.",
  },
  {
    value: "technical",
    label: "Technical",
    hint: "Technical vocabulary used freely. Domain-specific precision.",
  },
  {
    value: "expert",
    label: "Expert",
    hint: "Peer-level discourse. Assumes significant prior knowledge.",
  },
];

export const PREFERRED_STRUCTURE_OPTIONS: FieldOption<PreferredStructure>[] = [
  {
    value: "examples-first",
    label: "Examples first",
    hint: "Start with concrete code and real-world examples, then explain the concepts behind them.",
  },
  {
    value: "theory-first",
    label: "Theory first",
    hint: "Begin with the concept and mental model, then move to examples and practice.",
  },
  {
    value: "story-narrative",
    label: "Story / Narrative",
    hint: "Continuous narrative arc; connected prose that tells a story.",
  },
  {
    value: "reference-lookup",
    label: "Reference / Lookup",
    hint: "Headers, tables, bullets; scannable and navigation-friendly.",
  },
  {
    value: "problem-first",
    label: "Start with the problem",
    hint: "Present a challenge or question upfront, then teach whatever is needed to solve it.",
  },
];

export const VERBOSITY_OPTIONS: FieldOption<Verbosity>[] = [
  {
    value: "concise",
    label: "Keep it brief",
    hint: "Short, focused explanations. Just the essentials with minimal tangents.",
  },
  {
    value: "moderate",
    label: "Balanced",
    hint: "A mix of depth and brevity. Enough context without overwhelming.",
  },
  {
    value: "detailed",
    label: "All the details",
    hint: "Thorough explanations with deep dives, multiple examples, and full context.",
  },
];

export const TONE_OPTIONS: FieldOption<Tone>[] = [
  {
    value: "formal",
    label: "Formal",
    hint: "Structured and authoritative. Suitable for academic or executive audiences.",
  },
  {
    value: "professional",
    label: "Professional",
    hint: "Clear and polished. Structured language suited for a work setting.",
  },
  {
    value: "conversational",
    label: "Casual & friendly",
    hint: "Relaxed and approachable, like chatting with a knowledgeable friend.",
  },
  {
    value: "peer-to-peer",
    label: "Peer-to-peer",
    hint: "Direct and collaborative, like talking to a fellow engineer.",
  },
];

// ---------------------------------------------------------------------------
// Delivery
// ---------------------------------------------------------------------------

export const OUTPUT_FORMAT_OPTIONS: FieldOption<OutputFormat>[] = [
  {
    value: "prose",
    label: "Prose",
    hint: "No bullet points; connected paragraphs; narrative flow.",
  },
  {
    value: "structured-with-headers",
    label: "Structured with Headers",
    hint: "Clear section headers; bullets for lists; tables for comparisons.",
  },
  {
    value: "mixed",
    label: "Mixed",
    hint: "Prose paragraphs with structured elements where helpful.",
  },
];

export const TARGET_LENGTH_OPTIONS: FieldOption<TargetLength>[] = [
  {
    value: "short",
    label: "Short",
    hint: "500–1000 words. Aggressive compression; retain only core concepts.",
  },
  {
    value: "medium",
    label: "Medium",
    hint: "1000–2500 words. Balanced depth and conciseness.",
  },
  {
    value: "long",
    label: "Long",
    hint: "2500+ words. Fuller conceptual treatment with multiple examples.",
  },
  {
    value: "match-source",
    label: "Match Source",
    hint: "Match the length and depth of the original content.",
  },
];

export const CODE_VERBOSITY_OPTIONS: FieldOption<CodeVerbosity>[] = [
  {
    value: "minimal",
    label: "Minimal",
    hint: "Code with brief inline comments. Assumes reader can follow.",
  },
  {
    value: "annotated",
    label: "Annotated",
    hint: "Key decisions commented. Non-obvious lines explained.",
  },
  {
    value: "fully-explained",
    label: "Fully Explained",
    hint: "Every line commented; every decision explained.",
  },
];

export const LANGUAGE_PROFICIENCY_OPTIONS: FieldOption<LanguageProficiency>[] =
  [
    { value: "native", label: "Native", hint: "It's your first language." },
    {
      value: "fluent",
      label: "Fluent",
      hint: "Comfortable with complex topics in this language.",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      hint: "Can follow most content but may miss nuance.",
    },
    {
      value: "basic",
      label: "Basic",
      hint: "Prefer simpler vocabulary and shorter sentences.",
    },
  ];

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

export const COGNITIVE_LOAD_OPTIONS: FieldOption<CognitiveLoadPreference>[] = [
  {
    value: "standard",
    label: "Standard",
    hint: "Full depth — deep dives, multiple examples, and thorough explanations.",
  },
  {
    value: "reduced",
    label: "Reduced",
    hint: "Essential concepts only — shorter sections, fewer tangents, high signal.",
  },
];

export const ACCESSIBILITY_TOGGLES: ToggleOption[] = [
  {
    key: "screen_reader",
    label: "Screen Reader",
    hint: "Optimize content for screen reader users",
  },
  {
    key: "dyslexia_friendly",
    label: "Dyslexia-Friendly",
    hint: "Use dyslexia-friendly formatting",
  },
  {
    key: "color_blind_safe",
    label: "Color Blind Safe",
    hint: "Avoid relying on color alone for information",
  },
];

// ---------------------------------------------------------------------------
// Professional context
// ---------------------------------------------------------------------------

export const ORGANIZATION_TYPE_OPTIONS: FieldOption[] = [
  {
    value: "freelance",
    label: "Freelance / Solo",
    hint: "Independent work, personal projects",
  },
  {
    value: "startup",
    label: "Startup < 50",
    hint: "Early-stage company, small team",
  },
  {
    value: "small_business",
    label: "Small Business < 500",
    hint: "Established company, mid-size",
  },
  {
    value: "enterprise",
    label: "Enterprise 500+",
    hint: "Large organization with governance",
  },
  { value: "agency", label: "Agency", hint: "Client work, multiple projects" },
  {
    value: "non_profit",
    label: "Non-Profit / NGO",
    hint: "Mission-driven organization",
  },
  {
    value: "education",
    label: "Education / Academic",
    hint: "University, school, or research",
  },
  {
    value: "government",
    label: "Government / Public Sector",
    hint: "Public sector with compliance requirements",
  },
];

export const TEAM_CONTEXT_OPTIONS: FieldOption[] = [
  {
    value: "solo",
    label: "Solo / side project",
    hint: "Working alone on personal or side projects",
  },
  {
    value: "small_team",
    label: "Small team (2-10)",
    hint: "Collaborating in a small group",
  },
  {
    value: "larger_team",
    label: "Larger team (10+)",
    hint: "Part of a larger engineering organization",
  },
  {
    value: "leading",
    label: "Leading a team",
    hint: "Managing or leading others",
  },
];

export const TOOLS_OPTIONS: FieldOption[] = [
  { value: "Claude", label: "Claude", hint: "Anthropic's AI assistant" },
  { value: "ChatGPT", label: "ChatGPT", hint: "OpenAI's AI assistant" },
  {
    value: "Claude Code",
    label: "Claude Code",
    hint: "Anthropic's CLI coding agent",
  },
  {
    value: "GitHub Copilot",
    label: "GitHub Copilot",
    hint: "AI pair programmer in your IDE",
  },
  { value: "VS Code", label: "VS Code", hint: "Microsoft's code editor" },
  { value: "Cursor", label: "Cursor", hint: "AI-native code editor" },
  { value: "Docker", label: "Docker", hint: "Container platform" },
  { value: "AWS", label: "AWS", hint: "Amazon cloud platform" },
  { value: "Jira", label: "Jira", hint: "Project management" },
  { value: "Slack", label: "Slack", hint: "Team messaging" },
  { value: "Notion", label: "Notion", hint: "Knowledge base and docs" },
  { value: "Linear", label: "Linear", hint: "Issue tracking" },
  { value: "Figma", label: "Figma", hint: "Design tool" },
];

// ---------------------------------------------------------------------------
// Native language (select dropdown)
// ---------------------------------------------------------------------------

export const NATIVE_LANGUAGE_OTHER_VALUE = "other";

export const NATIVE_LANGUAGE_OPTIONS: FieldOption[] = [
  { value: "en", label: "English", hint: "English" },
  { value: "ur", label: "Urdu", hint: "اردو" },
  { value: "hi", label: "Hindi", hint: "हिन्दी" },
  { value: "ar", label: "Arabic", hint: "العربية" },
  { value: "zh", label: "Chinese", hint: "中文" },
  { value: "es", label: "Spanish", hint: "Español" },
  { value: "pt", label: "Portuguese", hint: "Português" },
  { value: "bn", label: "Bengali", hint: "বাংলা" },
  { value: "ru", label: "Russian", hint: "Русский" },
  { value: "ja", label: "Japanese", hint: "日本語" },
  { value: "fr", label: "French", hint: "Français" },
  { value: "de", label: "German", hint: "Deutsch" },
  { value: "ko", label: "Korean", hint: "한국어" },
  { value: "vi", label: "Vietnamese", hint: "Tiếng Việt" },
  { value: "tr", label: "Turkish", hint: "Türkçe" },
  { value: "fa", label: "Persian", hint: "فارسی" },
  { value: "it", label: "Italian", hint: "Italiano" },
  { value: "pl", label: "Polish", hint: "Polski" },
  { value: "id", label: "Indonesian", hint: "Bahasa Indonesia" },
  {
    value: NATIVE_LANGUAGE_OTHER_VALUE,
    label: "Other",
    hint: "Language not listed above",
  },
];

// ---------------------------------------------------------------------------
// Programming languages (chip select)
// ---------------------------------------------------------------------------

export { PROGRAMMING_LANGUAGES } from "./learner-profile-types";
