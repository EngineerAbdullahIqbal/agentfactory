import type { ProfileResponse } from "./learner-profile-types";

export interface LearnerProfileSummary {
  expertise_level?: string;
  communication_prefs?: {
    language_complexity?: string | null;
    verbosity?: string | null;
    tone?: string | null;
    preferred_structure?: string | null;
    analogy_domain?: string | null;
  };
  accessibility?: {
    screen_reader?: boolean;
    cognitive_load_preference?: string;
    dyslexia_friendly?: boolean;
  };
  goals?: {
    primary_learning_goal?: string | null;
    immediate_application?: string | null;
  };
  expertise?: {
    programming_level?: string;
    programming_languages?: string[];
    ai_fluency_level?: string;
    domain_name?: string | null;
    domain_level?: string | null;
  };
  professional?: {
    current_role?: string | null;
    tools_in_use?: string[];
  };
  delivery?: {
    language?: string;
    language_proficiency?: string | null;
    code_verbosity?: string | null;
    native_language?: string | null;
    preferred_code_language?: string | null;
  };
}

export function buildProfileSummary(
  profile: ProfileResponse | null,
): LearnerProfileSummary | undefined {
  if (!profile) return undefined;
  const primaryDomain =
    profile.expertise?.domain?.find((d) => d.is_primary) ??
    profile.expertise?.domain?.[0];
  return {
    expertise_level: profile.expertise?.programming?.level,
    communication_prefs: {
      language_complexity: profile.communication?.language_complexity,
      verbosity: profile.communication?.verbosity,
      tone: profile.communication?.tone,
      preferred_structure: profile.communication?.preferred_structure,
      analogy_domain: profile.communication?.analogy_domain,
    },
    accessibility: {
      screen_reader: profile.accessibility?.screen_reader,
      cognitive_load_preference:
        profile.accessibility?.cognitive_load_preference,
      dyslexia_friendly: profile.accessibility?.dyslexia_friendly,
    },
    goals: {
      primary_learning_goal: profile.goals?.primary_learning_goal,
      immediate_application: profile.goals?.immediate_application,
    },
    expertise: {
      programming_level: profile.expertise?.programming?.level,
      programming_languages: profile.expertise?.programming?.languages,
      ai_fluency_level: profile.expertise?.ai_fluency?.level,
      domain_name: primaryDomain?.domain_name,
      domain_level: primaryDomain?.level,
    },
    professional: {
      current_role: profile.professional_context?.current_role,
      tools_in_use: profile.professional_context?.tools_in_use,
    },
    delivery: {
      language: profile.delivery?.language,
      language_proficiency: profile.delivery?.language_proficiency,
      code_verbosity: profile.delivery?.code_verbosity,
      native_language: profile.delivery?.native_language ?? null,
      preferred_code_language:
        profile.delivery?.preferred_code_language ?? null,
    },
  };
}
