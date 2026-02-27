> **LEGACY DOCUMENT** — This is the original v1.0 research input. The authoritative schema is now `spec.md` (v1.3). Key differences: `learner_id` is now auth sub string (not UUID), `topics_to_skip` merged into `topics_already_mastered`, `ai_fluency.level` standardized, accessibility section added, defaults changed from `intermediate` to `beginner`, and many other refinements. Do NOT use this file as a template for implementation.

# Learner Profile Schema for Content Personalization
**Version:** 1.0 — Static Content Personalization (SUPERSEDED by spec.md v1.1)
**Purpose:** Drives the five dimensions of content personalization (vocabulary, examples, depth, structure, tone).
**Usage:** ~~Fill out this profile for a learner, then pass it alongside the source lesson to the Content Personalization Prompt.~~ See `spec.md` for current schema.

---

## How to Fill This Profile

This profile is designed to be filled in three ways:
1. **Manually by the learner** — via an onboarding form
2. **Manually by an instructor** — based on their knowledge of the student
3. **Auto-populated from PHM session data** — if the learner has a PHM Learner Profile, map it using the field mapping table in Appendix A

Omit any field you don't know — the personalization engine will apply conservative defaults for unknown fields. A partially filled profile still produces significantly better personalization than no profile.

---

## SECTION 1 — Identity and Context

```json
{
  "learner_id": "uuid or human-readable ID",
  "name": "string | null",
  "profile_created": "ISO-8601 date",
  "profile_version": "1.0"
}
```

**Field guide:**
- `learner_id` — Unique identifier. Used to link this profile to a learner's history across multiple personalized lessons.
- `name` — Optional. Used to address the learner by name in the personalized output.

---

## SECTION 2 — Expertise Profile

*Drives: Vocabulary calibration, depth allocation, what gets skipped vs. expanded.*

```json
{
  "expertise": {
    "domain": {
      "level": "none | beginner | intermediate | advanced | expert",
      "domain_name": "string — e.g. 'logistics operations', 'financial services', 'K-12 education'",
      "notes": "string | null — any relevant specifics, e.g. 'specializes in procurement, not distribution'"
    },
    "programming": {
      "level": "none | beginner | intermediate | advanced | expert",
      "languages": ["string — e.g. 'Python', 'TypeScript'"],
      "notes": "string | null — e.g. 'knows Python basics but no async or OOP'"
    },
    "ai_ml": {
      "level": "none | conceptual | intermediate | advanced | expert",
      "notes": "string | null — e.g. 'has used ChatGPT and Copilot, understands prompting but not architectures'"
    },
    "business": {
      "level": "none | beginner | intermediate | advanced | expert",
      "notes": "string | null — e.g. 'strong in financial modeling, weaker in org strategy'"
    },
    "subject_specific": {
      "topics_already_mastered": [
        "string — topic name"
      ],
      "topics_partially_known": [
        {
          "topic": "string — topic name",
          "knowledge_state": "string — what they know and what they're missing"
        }
      ],
      "known_misconceptions": [
        {
          "topic": "string — topic name",
          "misconception": "string — what they incorrectly believe"
        }
      ],
      "topics_to_skip": [
        "string — topics that should be condensed to a single reference sentence because learner already knows them"
      ]
    }
  }
}
```

**How this drives personalization:**
- `domain.level` + `domain_name` → example and analogy selection; vocabulary register
- `programming.level` → how deeply to explain code, whether to include or skip code samples
- `ai_ml.level` → whether to define LLM/agent/RAG concepts or assume them
- `topics_already_mastered` → these sections get compressed to one-sentence references
- `known_misconceptions` → inserted pre-emptive corrections at the right point in the lesson
- `topics_to_skip` → appear in the lesson only as a brief acknowledgment ("You're already familiar with X, so we'll use it here without re-explaining")

---

## SECTION 3 — Professional Context

*Drives: Example grounding, case study selection, goal-relevance framing.*

```json
{
  "professional_context": {
    "current_role": "string | null — e.g. 'Senior Business Analyst', 'First-year CS Student', 'CTO at 12-person startup'",
    "industry": "string | null — e.g. 'logistics', 'healthcare', 'fintech', 'education'",
    "organization_type": "string | null — e.g. 'enterprise', 'startup', 'university', 'freelance'",
    "team_context": "string | null — e.g. 'leads a 5-person analytics team', 'solo developer', 'embedded in a product team'",
    "real_projects": [
      {
        "project_name": "string — name or brief description",
        "description": "string — what it is and what stage it's at",
        "relevance": "string — how it connects to what they're learning"
      }
    ],
    "tools_in_use": ["string — tools/platforms they work with daily, e.g. 'Salesforce', 'dbt', 'Figma'"],
    "constraints": "string | null — e.g. 'must stay within enterprise security policies', 'no cloud access', 'team is non-technical'"
  }
}
```

**How this drives personalization:**
- `current_role` + `industry` → the primary context for all examples (replaces generic examples in source)
- `real_projects` → these become the example vehicle where possible ("In your [project]...")
- `tools_in_use` → integration examples use their actual tools, not hypothetical ones
- `constraints` → solutions and examples respect real-world constraints the learner faces
- `organization_type` → enterprise examples vs startup examples vs academic examples differ significantly

---

## SECTION 4 — Goals and Motivation

*Drives: Goal-anchoring throughout the lesson, emphasis allocation, closing framing.*

```json
{
  "goals": {
    "primary_learning_goal": "string — what they most want to be able to do after this lesson",
    "secondary_goals": ["string — additional outcomes they care about"],
    "urgency": "low | medium | high",
    "urgency_context": "string | null — e.g. 'preparing for a client demo in 2 weeks', 'exploring for future use, no deadline'",
    "career_goal": "string | null — e.g. 'transition into AI product management', 'build a side business selling AI agents'",
    "immediate_application": "string | null — what they plan to do with this knowledge right after the lesson"
  }
}
```

**How this drives personalization:**
- `primary_learning_goal` → mentioned explicitly in the opening, repeated as anchor at major transitions, realized in the closing ("You can now...")
- `urgency` → high urgency → prioritize practical application depth over theoretical completeness; low urgency → can afford fuller conceptual treatment
- `career_goal` → sections directly relevant to the career goal are expanded; sections with low career relevance are compressed
- `immediate_application` → if known, the application section of the lesson specifically scaffolds toward that application

---

## SECTION 5 — Communication Preferences

*Drives: Vocabulary level, tone, sentence structure, verbosity, analogy domain selection.*

```json
{
  "communication": {
    "language_complexity": "plain | professional | technical | expert",
    "preferred_structure": "examples-first | theory-first | story-narrative | reference-lookup | problem-first",
    "verbosity": "concise | moderate | detailed",
    "analogy_domain": "string | null — the domain to draw analogies from, e.g. 'cooking', 'sports', 'finance', 'construction'. If null, use professional_context.industry",
    "tone": "formal | professional | conversational | peer-to-peer",
    "wants_summaries": true,
    "wants_check_in_questions": true,
    "format_notes": "string | null — any additional formatting preferences, e.g. 'prefers tables over bullet lists', 'dislikes excessive headers'"
  }
}
```

**How this drives personalization:**

| Field | Effect |
|---|---|
| `language_complexity: plain` | No jargon. Every term defined on first use. Short sentences. |
| `language_complexity: professional` | Business vocabulary. Outcome-framing. No unexplained acronyms. |
| `language_complexity: technical` | Technical vocabulary used freely. Domain-specific precision. |
| `language_complexity: expert` | Peer-level discourse. Assumptions of significant prior knowledge. |
| `preferred_structure: examples-first` | Lead every concept with a concrete case; extract the principle after |
| `preferred_structure: theory-first` | Lead with definition/principle; follow with illustration |
| `preferred_structure: story-narrative` | Continuous narrative arc; minimal bullets; connected prose |
| `preferred_structure: reference-lookup` | Headers, tables, bullets; scannable; navigation-friendly |
| `preferred_structure: problem-first` | Each section opens with a problem the concept solves |
| `verbosity: concise` | Dense information per sentence. Minimal scaffolding prose. |
| `verbosity: detailed` | Generous explanation. Multiple examples. Anticipate follow-up questions in the text. |
| `wants_summaries: true` | Add a 3–5 sentence summary at the end of each major section |
| `wants_check_in_questions: true` | Embed 1–2 reflection questions at the end of each major section |

---

## SECTION 6 — Content Delivery Preferences

*Drives: Output format, length, inclusion of code samples, inclusion of visuals descriptions.*

```json
{
  "delivery": {
    "output_format": "prose | structured-with-headers | mixed",
    "target_length": "short (500-1000 words) | medium (1000-2500 words) | long (2500+ words) | match-source",
    "include_code_samples": true,
    "code_verbosity": "minimal | annotated | fully-explained",
    "include_visual_descriptions": true,
    "visual_description_notes": "string | null — e.g. 'describe diagrams as alt-text for screen reader use'",
    "language": "string — output language, e.g. 'English', 'Urdu', 'Spanish'. Default: 'English'"
  }
}
```

**How this drives personalization:**
- `output_format: prose` → no bullet points; connected paragraphs; narrative flow
- `output_format: structured-with-headers` → clear section headers; bullets for lists; tables for comparisons
- `include_code_samples: false` → replace all code in the source with pseudocode or plain-language process descriptions
- `code_verbosity: fully-explained` → every line commented; every decision explained
- `target_length: short` → aggressive compression of source; retain only core concepts and their most relevant examples
- `language` → produce the full personalized lesson in this language while keeping technical terms in English unless a standard translation exists

---

## COMPLETE PROFILE TEMPLATE

Copy and fill this template. Omit fields you don't know — the engine handles unknowns with conservative defaults.

```json
{
  "learner_id": "",
  "name": "",
  "profile_created": "",
  "profile_version": "1.0",

  "expertise": {
    "domain": {
      "level": "",
      "domain_name": "",
      "notes": ""
    },
    "programming": {
      "level": "",
      "languages": [],
      "notes": ""
    },
    "ai_ml": {
      "level": "",
      "notes": ""
    },
    "business": {
      "level": "",
      "notes": ""
    },
    "subject_specific": {
      "topics_already_mastered": [],
      "topics_partially_known": [],
      "known_misconceptions": [],
      "topics_to_skip": []
    }
  },

  "professional_context": {
    "current_role": "",
    "industry": "",
    "organization_type": "",
    "team_context": "",
    "real_projects": [],
    "tools_in_use": [],
    "constraints": ""
  },

  "goals": {
    "primary_learning_goal": "",
    "secondary_goals": [],
    "urgency": "",
    "urgency_context": "",
    "career_goal": "",
    "immediate_application": ""
  },

  "communication": {
    "language_complexity": "",
    "preferred_structure": "",
    "verbosity": "",
    "analogy_domain": "",
    "tone": "",
    "wants_summaries": true,
    "wants_check_in_questions": false,
    "format_notes": ""
  },

  "delivery": {
    "output_format": "",
    "target_length": "",
    "include_code_samples": true,
    "code_verbosity": "",
    "include_visual_descriptions": true,
    "visual_description_notes": "",
    "language": "English"
  }
}
```

---

## SECTION 7 — Three Example Profiles

### Example A — Fatima (Career-Switching Business Analyst)

```json
{
  "learner_id": "fatima-001",
  "name": "Fatima",
  "expertise": {
    "domain": { "level": "advanced", "domain_name": "logistics operations and process optimization" },
    "programming": { "level": "none", "languages": [] },
    "ai_ml": { "level": "conceptual", "notes": "Has used ChatGPT; understands AI as a tool, not architecturally" },
    "business": { "level": "advanced", "notes": "Strong in ROI modeling, cost-benefit analysis, workflow design" },
    "subject_specific": {
      "topics_already_mastered": ["FTE costing models", "process documentation", "business requirements"],
      "topics_partially_known": [],
      "known_misconceptions": [
        { "topic": "AI testing", "misconception": "Assumes AI output can be tested like deterministic software" }
      ],
      "topics_to_skip": []
    }
  },
  "professional_context": {
    "current_role": "Senior Business Analyst",
    "industry": "logistics",
    "organization_type": "enterprise",
    "team_context": "Works with cross-functional teams; interfaces between business and IT",
    "real_projects": [
      { "project_name": "Shipment Exception Agent", "description": "Wants to build an AI agent to handle shipment delay notifications", "relevance": "Primary application for all concepts being learned" }
    ],
    "tools_in_use": ["Jira", "Excel", "Confluence", "SAP TMS"]
  },
  "goals": {
    "primary_learning_goal": "Be able to design an AI agent product and write the spec for it",
    "urgency": "high",
    "career_goal": "Transition into AI product management",
    "immediate_application": "Design the spec for the shipment exception notification agent"
  },
  "communication": {
    "language_complexity": "professional",
    "preferred_structure": "examples-first",
    "verbosity": "moderate",
    "analogy_domain": "logistics and contract management",
    "tone": "professional",
    "wants_summaries": true,
    "wants_check_in_questions": true
  },
  "delivery": {
    "output_format": "mixed",
    "target_length": "medium",
    "include_code_samples": false,
    "language": "English"
  }
}
```

### Example B — Raj (Experienced Full-Stack Developer)

```json
{
  "learner_id": "raj-001",
  "name": "Raj",
  "expertise": {
    "domain": { "level": "intermediate", "domain_name": "SaaS product development" },
    "programming": { "level": "advanced", "languages": ["Python", "TypeScript", "SQL"], "notes": "8 years full-stack; strong in system design and API architecture" },
    "ai_ml": { "level": "intermediate", "notes": "Built RAG apps; understands LLM + tools pattern; no production agent experience" },
    "business": { "level": "intermediate", "notes": "Understands SaaS metrics and unit economics" },
    "subject_specific": {
      "topics_already_mastered": ["LangChain basics", "RAG architecture", "REST API design", "Docker/CI-CD"],
      "topics_partially_known": [
        { "topic": "AI agents", "knowledge_state": "Understands agent = LLM + tools + loop; missing: spec-driven approach, production reliability patterns" }
      ],
      "known_misconceptions": [
        { "topic": "Production agents", "misconception": "Believes infrastructure reliability (monitoring, failover) is the primary gap between prototype and production agent — misses spec-driven approach as the fundamental gap" }
      ],
      "topics_to_skip": ["What is Python", "What is an API", "What is a database"]
    }
  },
  "professional_context": {
    "current_role": "Senior Full-Stack Developer",
    "industry": "B2B SaaS",
    "organization_type": "enterprise",
    "team_context": "Solo on side projects; senior IC at day job",
    "real_projects": [
      { "project_name": "CodeReviewFTE", "description": "Building an AI agent for automated code review as a SaaS side business", "relevance": "Primary vehicle for applying all concepts" }
    ],
    "tools_in_use": ["GitHub", "Claude API", "Vercel", "PostgreSQL", "OpenAI Agents SDK"]
  },
  "goals": {
    "primary_learning_goal": "Build production-grade AI agents and sell them as a side business",
    "urgency": "medium",
    "career_goal": "Launch profitable AI agent SaaS product",
    "immediate_application": "Write the production spec for CodeReviewFTE and build the eval pipeline"
  },
  "communication": {
    "language_complexity": "technical",
    "preferred_structure": "problem-first",
    "verbosity": "concise",
    "analogy_domain": "software architecture",
    "tone": "peer-to-peer",
    "wants_summaries": false,
    "wants_check_in_questions": false
  },
  "delivery": {
    "output_format": "structured-with-headers",
    "target_length": "medium",
    "include_code_samples": true,
    "code_verbosity": "minimal",
    "language": "English"
  }
}
```

### Example C — Marcus (First-Year CS Student)

```json
{
  "learner_id": "marcus-001",
  "name": "Marcus",
  "expertise": {
    "domain": { "level": "none" },
    "programming": { "level": "beginner", "languages": ["Python"], "notes": "Knows basic Python: loops, functions, lists. No classes, no async, no frameworks." },
    "ai_ml": { "level": "none", "notes": "No prior exposure. Only mental model is Jarvis from Iron Man and ChatGPT." },
    "business": { "level": "none" },
    "subject_specific": {
      "topics_already_mastered": ["Basic Python syntax", "For loops", "Functions"],
      "topics_partially_known": [],
      "known_misconceptions": [],
      "topics_to_skip": []
    }
  },
  "professional_context": {
    "current_role": "First-year Computer Science student",
    "industry": "education",
    "organization_type": "university",
    "team_context": "Individual student, no team",
    "real_projects": [],
    "tools_in_use": ["VS Code", "Google Colab"]
  },
  "goals": {
    "primary_learning_goal": "Understand what AI agents are and how to build a basic one",
    "urgency": "medium",
    "urgency_context": "Course requirement with assignments",
    "career_goal": null,
    "immediate_application": "Complete a course assignment on building a simple specification"
  },
  "communication": {
    "language_complexity": "plain",
    "preferred_structure": "story-narrative",
    "verbosity": "detailed",
    "analogy_domain": "everyday life — food, games, household tasks",
    "tone": "conversational",
    "wants_summaries": true,
    "wants_check_in_questions": true
  },
  "delivery": {
    "output_format": "prose",
    "target_length": "long",
    "include_code_samples": true,
    "code_verbosity": "fully-explained",
    "language": "English"
  }
}
```

---

## APPENDIX A — Mapping from PHM Session Profile to Content Profile

If you have an existing PHM Learner Profile (from live tutoring sessions), use this mapping to generate a Content Personalization Profile automatically.

| PHM Field | Content Profile Field |
|---|---|
| `expertise_level.domain_expertise` | `expertise.domain.level` |
| `expertise_level.programming_experience` | `expertise.programming.level` |
| `expertise_level.ai_ml_familiarity` | `expertise.ai_ml.level` |
| `expertise_level.business_experience` | `expertise.business.level` |
| `knowledge_map.mastered[].topic` | `expertise.subject_specific.topics_already_mastered[]` |
| `knowledge_map.known_misconceptions[]` | `expertise.subject_specific.known_misconceptions[]` |
| `professional_context.current_role` | `professional_context.current_role` |
| `professional_context.industry` | `professional_context.industry` |
| `professional_context.real_projects[]` | `professional_context.real_projects[]` |
| `motivation_and_goals.primary_goal` | `goals.primary_learning_goal` |
| `motivation_and_goals.urgency` | `goals.urgency` |
| `communication_preferences.language_complexity` | `communication.language_complexity` |
| `communication_preferences.preferred_analogy_domain` | `communication.analogy_domain` |
| `communication_preferences.verbosity_preference` | `communication.verbosity` |
| `learning_style_signals.prefers_examples_before_theory` | `communication.preferred_structure` → `examples-first` or `theory-first` |

---

## APPENDIX B — Field Defaults for Unknown Values

When a field is omitted or unknown, the personalization engine applies these conservative defaults:

| Field | Default When Unknown |
|---|---|
| `expertise.*.level` | `intermediate` — safe middle ground |
| `communication.language_complexity` | `professional` — neutral register |
| `communication.preferred_structure` | `examples-first` — research shows this is most broadly effective |
| `communication.verbosity` | `moderate` |
| `communication.tone` | `professional` |
| `delivery.target_length` | `match-source` |
| `delivery.include_code_samples` | `true` |
| `goals.primary_learning_goal` | Inferred from lesson title/content |
| `communication.analogy_domain` | `professional_context.industry` if available, otherwise generic |
