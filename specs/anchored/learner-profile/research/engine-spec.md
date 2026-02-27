# Personalization Engine — Input/Output Contract & Transformation Rules

**Author:** engine-specifier
**Date:** 2026-02-26
**Status:** Phase 1 Research
**Input Schema Version:** 1.0

---

## 1. Input/Output Contract

### Input

| Component | Type | Required | Description |
|---|---|---|---|
| `learner_profile` | JSON object (schema v1.0) | Yes (may be partial) | 6 sections: Identity, Expertise, Professional Context, Goals, Communication, Delivery |
| `source_lesson` | Markdown string | Yes | Original lesson content — factual source of truth |
| `lesson_metadata` | Object (title, chapter, part, prerequisites) | Recommended | Enables goal inference and prerequisite-awareness when profile fields are missing |

### Output

| Component | Type | Guarantee |
|---|---|---|
| `personalized_lesson` | Markdown string | All source concepts present; factual accuracy preserved; no hallucinated content added |
| `personalization_manifest` | JSON object | Documents which transformations were applied and why (for debugging/auditing) |

### Invariants (NEVER violated)

1. **Factual Preservation** — Every factual claim in the source lesson appears in the output. Facts may be reworded but never altered, omitted, or contradicted.
2. **Concept Completeness** — Every concept in the source appears in the output. Concepts may be compressed (one-sentence reference) but never deleted entirely.
3. **No Hallucinated Content** — The engine transforms existing content. It does NOT invent new facts, examples, or claims not derivable from the source + profile.
4. **Technical Term Integrity** — Technical terms remain correct even when simplified. "LLM" can be explained as "Large Language Model (a type of AI that processes text)" but never redefined incorrectly.
5. **Attribution Integrity** — If the source attributes a quote or finding to a specific person/paper, that attribution is preserved exactly.

---

## 2. Transformation Rule Table — Complete Field Mapping

### Personalization Dimensions

The engine operates across **five dimensions**, each driven by specific schema fields:

| Dimension | What Changes | Primary Fields |
|---|---|---|
| **Vocabulary** | Word choice, jargon level, term definitions | `communication.language_complexity`, `expertise.*` |
| **Examples** | Analogies, case studies, illustration domain | `professional_context.*`, `communication.analogy_domain`, `expertise.domain` |
| **Depth** | Expansion vs. compression of sections | `expertise.subject_specific.*`, `goals.*`, `communication.verbosity` |
| **Structure** | Organization, flow, formatting | `communication.preferred_structure`, `delivery.output_format`, `delivery.target_length` |
| **Tone** | Voice, register, interpersonal style | `communication.tone`, `communication.language_complexity` |

---

### SECTION 1 — Identity and Context

| Field | Transformation Behavior | Example |
|---|---|---|
| `learner_id` | **No output transformation.** Used for session tracking, profile lookup, and personalization manifest linkage only. | N/A |
| `name` | If non-null, address the learner by name at key touchpoints: opening ("Fatima, in this lesson..."), major transitions ("As you'll see, Raj..."), and closing ("You're now equipped, Marcus..."). Limit to 3-5 uses per lesson to avoid over-familiarity. If null, use second person ("you"). | Source: "The learner will..." -> Fatima: "Fatima, you'll..." |
| `profile_created` | **No output transformation.** Metadata for profile staleness detection. Engine SHOULD warn if profile is >6 months old. | N/A |
| `profile_version` | **No output transformation.** Used for schema compatibility checking. Engine MUST reject profiles with incompatible versions. | N/A |

**Pushback on schema:** `profile_created` and `profile_version` are metadata, not personalization drivers. They belong in an envelope/wrapper, not inside the personalization payload. This matters because the engine should not need to parse non-transformation fields. **Recommendation:** Move to a `_meta` envelope: `{ "_meta": { "version": "1.0", "created": "..." }, "profile": { ... } }`.

---

### SECTION 2 — Expertise Profile

#### 2.1 Domain Expertise

| Field | Transformation Behavior | Before (Source) | After (Fatima: advanced logistics) | After (Marcus: none) |
|---|---|---|---|---|
| `domain.level` = none | All domain-specific references explained from scratch. No assumed familiarity with any industry. | "Like an SLA violation handler..." | "Think of it like a rule that says 'if X happens, do Y automatically'..." | "Think of it like a rule that says 'if X happens, do Y automatically'..." |
| `domain.level` = beginner | Simple domain parallels. Define domain terms on first use. | (same source) | N/A | N/A |
| `domain.level` = intermediate | Domain parallels used freely. Terms defined only if obscure. | (same source) | N/A | N/A |
| `domain.level` = advanced | Rich domain integration. Use domain-specific vocabulary as primary language. Source's generic examples replaced with domain-situated ones. | "Like an SLA violation handler..." | "This works exactly like your SLA escalation workflows — when a shipment exception triggers, the agent follows the same triage logic your team uses manually today." | N/A |
| `domain.level` = expert | Peer-level domain discourse. Assume deep operational knowledge. Use domain jargon without explanation. | (same source) | N/A | N/A |
| `domain.domain_name` | Scopes which domain vocabulary and examples to use. Combined with `domain.level` to calibrate specificity. | Generic: "a business process" | Fatima: "a logistics workflow like carrier allocation" | Marcus: (no domain, use everyday examples) |
| `domain.notes` | Narrows domain reference. If "specializes in procurement, not distribution," avoid distribution examples even within logistics. | "In your logistics operations..." | "In your procurement workflows — like vendor negotiation or purchase order routing..." | N/A |

#### 2.2 Programming Expertise

| Field | Transformation Behavior | Before (Source) | After (Fatima: none) | After (Raj: advanced) |
|---|---|---|---|---|
| `programming.level` = none | Replace code blocks with plain-language process descriptions or pseudocode. Frame programming concepts as "instructions you'd give to a very literal assistant." | `def handle(event): ...` | "The agent follows a set of written instructions: first check the event type, then look up the right response, then execute it." | N/A |
| `programming.level` = beginner | Keep code samples but add extensive scaffolding. Explain every line. Use only languages from `programming.languages`. | (same source) | N/A | N/A |
| `programming.level` = intermediate | Code samples with selective annotation. Explain non-obvious patterns. Skip basics. | (same source) | N/A | N/A |
| `programming.level` = advanced | Code samples as-is or condensed. Focus on architectural patterns, not syntax. Can introduce advanced patterns (decorators, generators, type hints) without explanation. | `def handle(event): ...` | N/A | Show the code pattern; focus commentary on the agent architecture choice, not the Python syntax. |
| `programming.level` = expert | Minimal code with maximum signal. Can reference design patterns by name. Discussion focuses on tradeoffs, not mechanics. | (same source) | N/A | N/A |
| `programming.languages` | When generating or modifying code examples, use ONLY languages from this list. If the source uses a language not in the list, translate to the learner's preferred language. | TypeScript example | Keep as-is (no code shown) | Translate to Python or TypeScript (Raj knows both) |
| `programming.notes` | Fine-grain code adaptation. "knows Python basics but no async or OOP" -> avoid async/await and class-based examples; use functions and loops. | Class-based agent code | Plain-language description | Keep class structure but add a one-line note: "This uses Python classes — think of a class as a blueprint for creating objects with shared behavior." Wait — Raj is advanced. Skip the note. |

#### 2.3 AI/ML Expertise

| Field | Transformation Behavior | Before (Source) | After (Fatima: conceptual) | After (Marcus: none) |
|---|---|---|---|---|
| `ai_ml.level` = none | Define every AI term on first use. No assumed knowledge of LLMs, prompts, agents, RAG, etc. Use analogies extensively. | "The agent uses RAG to retrieve context" | N/A | "The agent searches through documents to find relevant information (like Googling, but within your own files) and then uses that information to write its response." |
| `ai_ml.level` = conceptual | Learner knows what AI tools do (ChatGPT, Copilot) but not how. Define architectural terms; skip tool-usage explanations. | "The agent uses RAG to retrieve context" | "The agent searches through your documents to find relevant information before responding — this technique is called RAG (Retrieval-Augmented Generation). Think of it as giving the AI a research assistant." | N/A |
| `ai_ml.level` = intermediate | Terms like LLM, RAG, agent, tool-use used freely. Explain novel architectural patterns but not basics. | (same source) | N/A | N/A |
| `ai_ml.level` = advanced/expert | Peer-level AI discourse. Reference papers, architectures, benchmarks by name. | (same source) | N/A | N/A |
| `ai_ml.notes` | Fine-grain calibration. "understands prompting but not architectures" -> can skip "what is a prompt" but must explain "what is a tool-calling loop." | (same source) | Fatima: skip ChatGPT basics, explain agent architecture from scratch | N/A |

#### 2.4 Business Expertise

| Field | Transformation Behavior | Before (Source) | After (Fatima: advanced) | After (Marcus: none) |
|---|---|---|---|---|
| `business.level` = none | Explain business concepts (ROI, unit economics, go-to-market) as if they're new. | "Consider the ROI of agent-assisted workflows" | N/A | "Consider whether the time and money saved by the agent is worth the cost of building it (this is called Return on Investment, or ROI)." |
| `business.level` = advanced/expert | Use business vocabulary freely. Frame technical concepts in business terms (cost centers, margins, headcount equivalents). | "Consider the ROI" | "Model this as you would any automation business case: FTE-equivalent savings vs. development + maintenance cost, with the agent's error rate as your risk factor." | N/A |
| `business.notes` | Narrow business vocabulary. "strong in financial modeling, weaker in org strategy" -> use financial framing, avoid organizational design analogies. | (same source) | Use financial modeling language (NPV, cost-benefit) but avoid org-design concepts | N/A |

#### 2.5 Subject-Specific Knowledge

| Field | Transformation Behavior | Example |
|---|---|---|
| `topics_already_mastered` | Compress to a single-sentence reference. Pattern: "Building on your understanding of [topic]..." or "Since you already know [topic], we'll use it directly here." NEVER re-explain. NEVER delete — the reference maintains conceptual continuity. | Source has 3 paragraphs on REST APIs. Raj has mastered REST API design. -> "Building on your REST API design experience, the agent exposes its capabilities through..." |
| `topics_partially_known` | Acknowledge what they know, fill the gap. Pattern: "You know [what they know]. The piece you're missing is [gap]." | Raj partially knows AI agents (knows LLM + tools + loop, missing spec-driven approach). -> "You already understand the agent loop — LLM reasoning, tool calls, observation. What changes everything is specifying the agent's behavior BEFORE building it..." |
| `known_misconceptions` | Insert pre-emptive correction AT the point in the lesson where the misconception would be triggered. Pattern: "A common assumption is [misconception]. Actually, [correction] because [reason]." | Fatima believes AI testing is deterministic. At the testing section: "You might expect to test your agent the way you'd test a spreadsheet formula — same input, same output. AI agents don't work that way. Instead..." |
| `topics_to_skip` | Condense to a brief acknowledgment. Pattern: "You're already familiar with [topic], so we'll use it here without re-explaining." Retain the topic label for navigation but remove all explanatory content. | Raj's `topics_to_skip: ["What is Python", "What is an API"]`. Source has "What is an API?" section. -> Heading remains, content replaced with: "You're already familiar with APIs, so we'll jump straight to how agents use them." |

**Pushback on schema:** `topics_already_mastered` and `topics_to_skip` have overlapping behavior — both result in compression. The difference is degree: mastered topics get a "building on..." acknowledgment, while skip topics get minimal acknowledgment. This distinction is subtle and may confuse onboarding. **Recommendation:** Either merge them with a `compression_level` parameter (reference vs. skip), or make the distinction clearer in onboarding UX: "topics you know well" (mastered) vs. "topics you want to skip entirely" (skip).

---

### SECTION 3 — Professional Context

| Field | Transformation Behavior | Example (Fatima) | Example (Marcus) |
|---|---|---|---|
| `current_role` | Frame the learner as this role throughout. Pattern: "As a [role], you'll..." Use role-appropriate responsibilities and decision-making frames. | "As a Senior Business Analyst, you'll recognize this pattern from requirements gathering..." | "As a CS student, think of this as a programming assignment where..." |
| `industry` | Primary source for example domains. All generic examples in source are replaced with industry-situated versions. | "In logistics, this agent would monitor shipment exceptions..." | "In your coursework, this agent could help grade assignments..." |
| `organization_type` | Calibrate scale, bureaucracy, and process assumptions. Enterprise = security policies, approval chains. Startup = speed, scrappiness. Academic = learning outcomes, assignments. | "Within your enterprise, you'll need IT approval before deploying..." | "For a university project, you can prototype quickly without..." |
| `team_context` | Calibrate collaboration references. Solo = "you build and maintain." Team lead = "you coordinate your team's..." | "Working across business and IT teams, you can position this agent as..." | "Working individually, you'll handle all parts of the build..." |
| `real_projects[]` | **Primary example vehicle.** When the source uses a generic example, replace it with the learner's real project if relevant. Pattern: "In your [project_name] — [description] — this concept applies as..." | "In your Shipment Exception Agent — the one handling delay notifications — this pattern means your agent would monitor SAP TMS for exception events and..." | (no real projects; use generic examples) |
| `tools_in_use[]` | Integration examples reference their actual tools. "Connect to your CRM" becomes "Connect to Salesforce." Tool-specific configuration details where possible. | "Pull data from SAP TMS..." "Track issues in Jira..." | "Write code in VS Code..." "Test in Google Colab..." |
| `constraints` | Solutions and architectures respect stated constraints. If "no cloud access," don't suggest cloud-based deployment. If "team is non-technical," frame handoff in non-technical terms. | "Since you're working within enterprise security policies, your agent will need to..." | (no constraints stated) |

**Pushback on schema:** `real_projects` is powerful but the `relevance` sub-field is vague. Who determines relevance — the learner, the instructor, or the engine? If the learner writes "Primary application for all concepts," the engine tries to use this project everywhere, even when it's a poor fit. **Recommendation:** Add a `relevance_scope` enum: `primary` (use as default example vehicle), `secondary` (use when directly applicable), `background` (mentioned for context only).

---

### SECTION 4 — Goals and Motivation

| Field | Transformation Behavior | Example (Fatima) | Example (Raj) |
|---|---|---|---|
| `primary_learning_goal` | **Three-point anchor:** (1) Opening — state goal explicitly: "By the end of this lesson, you'll be able to [goal]." (2) Major transitions — reconnect: "This brings you closer to [goal] because..." (3) Closing — confirm achievement: "You can now [goal]." | "By the end of this lesson, you'll be able to design an AI agent product and write the spec for it." | "By the end of this lesson, you'll be able to build production-grade AI agents..." |
| `secondary_goals[]` | Mentioned where relevant but not anchored. Pattern: "This also helps you [secondary_goal]." Used to justify depth in sections that might otherwise be compressed. | (none listed) | (none listed) |
| `urgency` = high | Prioritize practical application over theoretical completeness. Front-load "how to use this now." Reduce conceptual tangents. Action-oriented framing. | "Let's focus on what you need to build that spec. Here's the actionable framework..." | N/A |
| `urgency` = medium | Balance theory and practice. Standard treatment. | N/A | Standard balance for Raj. |
| `urgency` = low | Can afford fuller conceptual treatment. Include historical context, alternative approaches, deeper "why" explanations. | N/A | N/A |
| `urgency_context` | Shapes specificity of urgency response. "Client demo in 2 weeks" -> extremely action-focused, skip optional depth. "Exploring for future use" -> more conceptual latitude. | (not provided for Fatima, but urgency=high implies time pressure) | N/A |
| `career_goal` | Sections directly relevant to the career goal are EXPANDED. Sections with low career relevance are COMPRESSED. Pattern: "This is especially critical for [career_goal] because..." | Fatima's career_goal: "Transition into AI product management." Expand: product thinking sections. Compress: low-level implementation details. | Raj's career_goal: "Launch profitable AI agent SaaS." Expand: monetization, production reliability. Compress: academic theory. |
| `immediate_application` | The lesson's application/exercise section is specifically scaffolded toward this application. Pattern: "To apply this to [immediate_application], start by..." | "To apply this to designing the spec for your shipment exception notification agent, start by identifying the three core exception types..." | "To apply this to writing the production spec for CodeReviewFTE, start by defining the eval criteria..." |

---

### SECTION 5 — Communication Preferences

#### 5.1 Language Complexity

| Value | Vocabulary | Sentence Structure | Term Handling | Example Sentence |
|---|---|---|---|---|
| `plain` | Everyday words only. No jargon. | Short (8-15 words). One idea per sentence. | Every technical term defined on first use with plain-language equivalent. | "An AI agent is a computer program that can make decisions and take actions on its own." |
| `professional` | Business vocabulary. Outcome-framing. | Medium (15-25 words). Compound sentences OK. | Acronyms expanded on first use. Domain jargon avoided unless the learner's domain. | "An AI agent is an autonomous system that makes decisions and executes actions based on defined objectives." |
| `technical` | Technical vocabulary used freely. | Variable. Precision over simplicity. | Terms used without definition unless novel to the field. | "An AI agent is an LLM-powered autonomous system with tool-calling capabilities operating in a reason-act loop." |
| `expert` | Peer-level. Reference-dense. | Complex. Assumes reader can parse dense prose. | No definitions. May reference papers/specs by name. | "The agent implements a ReAct-style loop with tool-augmented generation, similar to the Yao et al. architecture." |

#### 5.2 Preferred Structure

| Value | Transformation | Structural Pattern |
|---|---|---|
| `examples-first` | Every concept opens with a concrete case. Extract the principle AFTER the example. | Example -> "Here's what happened" -> "The principle behind this is..." -> Generalize |
| `theory-first` | Lead with the definition/principle. Follow with illustration. | Definition -> Explanation -> "Here's what this looks like in practice..." |
| `story-narrative` | Continuous narrative arc. Minimal bullets. Connected prose. Transitions between ideas are explicit and flowing. | "Imagine you're building..." -> "Now, as your agent encounters..." -> "This leads us to..." |
| `reference-lookup` | Headers, tables, bullets. Scannable. Navigation-friendly. Minimal prose between structured elements. | **Concept** -> Definition (1 sentence) -> Key Properties (table) -> Example (code/bullet) |
| `problem-first` | Each section opens with a problem/challenge. The concept is introduced as the solution. | "Problem: Your agent crashes when..." -> "Solution: Use X pattern" -> "How it works..." |

#### 5.3 Other Communication Fields

| Field | Transformation Behavior | Example |
|---|---|---|
| `verbosity` = concise | Target 60% of source word count. Same information density. Cut scaffolding prose, hedging, and redundant examples. One example per concept max. | 500-word source section -> ~300 words |
| `verbosity` = moderate | Target 80-100% of source word count. Standard treatment. | 500-word source section -> ~400-500 words |
| `verbosity` = detailed | Target 120-150% of source word count. Multiple examples. Anticipatory follow-up explanations. Generous scaffolding. | 500-word source section -> ~600-750 words |
| `analogy_domain` | All analogies drawn from this domain. If null, fall back to `professional_context.industry`. If both null, use generic everyday analogies. | Fatima: "Think of the agent's decision loop like a procurement approval chain — each step has criteria, and the request only moves forward when criteria are met." |
| `tone` = formal | Third-person where possible. No contractions. Academic register. | "One should consider..." |
| `tone` = professional | Second-person. Contractions OK. Business-appropriate warmth. | "You'll want to consider..." |
| `tone` = conversational | Second-person. Casual. Friendly. Colloquialisms acceptable. | "So here's the thing — you'll want to think about..." |
| `tone` = peer-to-peer | Assumes shared expertise. Can be blunt. Technical shorthand OK. | "The obvious move here is to..." |
| `wants_summaries` = true | Add a 3-5 sentence summary at the end of each major section. Pattern: "**Key Takeaways:** ..." | Appended after each H2 section |
| `wants_summaries` = false | No summaries added. | N/A |
| `wants_check_in_questions` = true | Embed 1-2 reflection questions at the end of each major section. Pattern: "**Check Your Understanding:** [question that tests the concept just covered]" | "How would you apply this agent pattern to [learner's context]?" |
| `wants_check_in_questions` = false | No questions added. | N/A |
| `format_notes` | Apply stated formatting preferences. "Prefers tables over bullet lists" -> convert bullets to tables where semantically appropriate. | Varies by learner |

---

### SECTION 6 — Content Delivery Preferences

| Field | Transformation Behavior | Example |
|---|---|---|
| `output_format` = prose | No bullet points. Connected paragraphs. Narrative flow. Transition sentences between ideas. | "Building on this, the next consideration is..." |
| `output_format` = structured-with-headers | Clear H2/H3 headers. Bullets for lists. Tables for comparisons. Minimal prose between structured elements. | `## What is an AI Agent` followed by bullet definitions |
| `output_format` = mixed | Headers for navigation. Prose for explanations. Bullets/tables for reference material. Best of both worlds. | Headers + prose paragraphs + summary tables |
| `target_length` = short | Aggressive compression. Retain only core concepts and their single most relevant example. Cut tangents, historical context, alternative approaches. Target: 500-1000 words total. | 2500-word source -> 800 words |
| `target_length` = medium | Standard treatment. Retain core concepts, primary examples, key tangents. Target: 1000-2500 words. | 2500-word source -> 1500-2000 words |
| `target_length` = long | Full treatment. Retain everything. Add depth, examples, and scaffolding. Target: 2500+ words. | 2500-word source -> 3000+ words |
| `target_length` = match-source | Output length approximates source length (+-20%). | 2500-word source -> 2000-3000 words |
| `include_code_samples` = true | Retain code blocks from source. Adapt to `programming.languages` if needed. | Code shown in learner's preferred language |
| `include_code_samples` = false | Replace ALL code blocks with pseudocode or plain-language process descriptions. | `def handle(event):` -> "The agent follows these steps: 1. Check event type, 2. Look up response..." |
| `code_verbosity` = minimal | Code shown with minimal comments. Only non-obvious lines annotated. | Standard code block, few comments |
| `code_verbosity` = annotated | Key lines commented. Pattern explanations above code blocks. | Comment above block + inline comments on important lines |
| `code_verbosity` = fully-explained | Every line commented. Every decision explained. Pattern: line-by-line walkthrough after the code block. | Full code block + "Let's walk through this line by line..." |
| `include_visual_descriptions` = true | Retain or generate textual descriptions of diagrams/visuals. | "Imagine a flowchart where..." |
| `include_visual_descriptions` = false | Omit visual descriptions. | Diagram references removed |
| `visual_description_notes` | Apply specific instructions. "Describe diagrams as alt-text for screen reader use" -> use alt-text format, not inline prose. | Format visual descriptions accordingly |
| `language` | Produce the FULL personalized lesson in this language. Technical terms remain in English unless a standard translation exists in the target language. | "English" -> no translation. "Urdu" -> full Urdu output, "LLM" stays as "LLM" |

---

## 3. Conflict Resolution Matrix

When profile fields produce contradictory transformation instructions, the engine resolves conflicts using these rules.

### Priority Hierarchy

**When fields conflict, resolve using this priority order:**

1. **Invariants** (factual accuracy, concept completeness) — ALWAYS win
2. **Explicit learner preferences** (fields the learner actively set) — high priority
3. **Inferred/default values** — low priority
4. **Source fidelity** — tiebreaker: when all else is equal, match the source

### Specific Conflict Resolutions

| # | Conflict | Resolution Rule | Rationale |
|---|---|---|---|
| C1 | `verbosity: concise` + `code_verbosity: fully-explained` | **Code sections expand, prose sections compress harder.** Net word count stays within concise target by aggressively cutting non-code prose. Code explanation is treated as the learner's priority. | The learner is saying "I don't need hand-holding on concepts, but I do need it on code." These are different content types with different needs. |
| C2 | `target_length: short` + `wants_summaries: true` + `wants_check_in_questions: true` | **Include summaries and questions but count them toward the length budget.** This means the core content must be compressed further to accommodate. Summaries are shortened to 2 sentences. Questions limited to 1 per section. | The learner wants brevity but also wants structural aids. Structural aids win because they're explicit preferences, but they consume from the length budget, not in addition to it. |
| C3 | `preferred_structure: story-narrative` + `output_format: structured-with-headers` | **Narrative flow with light structural scaffolding.** Use H2 headers for major sections (navigation) but write continuous prose between them. No bullet lists. Headers serve as chapter markers in the narrative, not as information architecture. | `preferred_structure` governs HOW ideas flow. `output_format` governs formatting chrome. Narrative structure with header landmarks satisfies both. |
| C4 | `include_code_samples: false` + lesson is fundamentally about coding | **Replace code with annotated pseudocode and process descriptions.** Preserve the logical structure of the code (what happens in what order) but express it in the learner's communication preference. Add a "For Reference" appendix with actual code for later use. | Invariant: all source concepts must appear. The code's LOGIC is a concept. The code's SYNTAX is a presentation choice. We preserve the concept while adapting the presentation. |
| C5 | `expertise.programming.level: none` + `delivery.include_code_samples: true` | **Include code samples but with maximum scaffolding.** Every code block preceded by plain-language explanation of what it does. Every line annotated. `code_verbosity` effectively forced to `fully-explained` regardless of setting. | The learner said they want code shown (explicit preference) but can't read code (expertise says none). The engine respects the preference but adds enough scaffolding to make it accessible. |
| C6 | `urgency: high` + `verbosity: detailed` | **Detailed on the actionable parts, compressed on the theoretical parts.** The learner wants rich information (detailed) but is time-pressed (high urgency). Solution: allocate detail budget to practical/application sections, compress conceptual/background sections. | Urgency modulates WHERE detail goes, not WHETHER detail appears. |
| C7 | `domain.level: expert` + `language_complexity: plain` | **Plain language with domain-specific terms used freely.** The learner is a domain expert who prefers simple language. Use their domain vocabulary (which is "plain" to them) but avoid complex sentence structures and non-domain jargon. | Domain vocabulary IS plain language for domain experts. The complexity preference applies to general vocabulary and sentence structure, not to their area of expertise. |
| C8 | `career_goal` implies expanding section X + `topics_to_skip` includes topic X | **`topics_to_skip` wins.** Explicit skip request overrides inferred expansion from career goal. The learner knows what they know. | Explicit > inferred. The learner specifically said "I know this." The career goal connection is an inference the engine makes, not a learner instruction. |
| C9 | `tone: formal` + `preferred_structure: story-narrative` | **Formal narrative.** Third-person storytelling is a valid genre (case studies, white papers). Pattern: "Consider an organization that..." rather than "So imagine you're..." | Both are valid simultaneously. Formal tone constrains word choice, not structure. |
| C10 | `target_length: short` + `verbosity: detailed` | **`target_length` is the hard constraint; `verbosity` is the style within that constraint.** Produce short output but make every sentence information-rich with generous explanation per concept included. Fewer concepts covered, each covered in detail. | Length is a physical constraint (the learner has limited time/attention). Verbosity is a quality preference (when you do explain, explain well). |

---

## 4. Fallback Behavior — Default Handling

### Appendix B Defaults (Reproduced with Engine Behavior)

| Field | Default When Unknown | Engine Behavior with Default |
|---|---|---|
| `expertise.*.level` | `intermediate` | Moderate vocabulary calibration. Define novel terms but not basics. Include code with selective annotation. |
| `communication.language_complexity` | `professional` | Business-appropriate vocabulary. Acronyms expanded once. No unexplained jargon. |
| `communication.preferred_structure` | `examples-first` | Lead each concept with a concrete example, then extract the principle. |
| `communication.verbosity` | `moderate` | ~80-100% of source word count. |
| `communication.tone` | `professional` | Second-person, warm but not casual. |
| `delivery.target_length` | `match-source` | Output length approximates source. |
| `delivery.include_code_samples` | `true` | Code blocks retained. |
| `goals.primary_learning_goal` | Inferred from lesson title/content | Opening: "In this lesson, you'll learn [lesson title]." |
| `communication.analogy_domain` | `professional_context.industry` or generic | Use industry analogies if industry is known; otherwise, everyday analogies (cooking, building, travel). |

### Edge Cases

#### Edge Case 1: Entirely Empty Profile (Cold Start)

**Input:** `{ "learner_id": "anon-001" }` — only the ID.

**Engine behavior:**
- Apply ALL defaults from Appendix B simultaneously
- Result: intermediate expertise assumed, professional tone, examples-first structure, moderate verbosity, match-source length
- This produces a "generic but competent" personalization — better than raw source because it applies examples-first structure and professional tone, but not truly personalized
- **Personalization manifest** should flag: "0/30 personalization fields provided. Output uses full default profile. Recommend completing onboarding."

#### Edge Case 2: Only Section 1 (Identity) Filled

**Input:** `{ "learner_id": "user-123", "name": "Alex", "profile_created": "2026-02-26", "profile_version": "1.0" }`

**Engine behavior:**
- Same as cold start EXCEPT: address learner as "Alex" at touchpoints
- This is effectively cosmetic personalization only
- **Personalization manifest** should flag: "1/30 personalization fields provided (name only). Output uses near-full default profile."

#### Edge Case 3: Only One Section Filled

The engine should produce progressively better personalization as more sections are filled, never worse. Each section adds a layer:

| Sections Filled | Personalization Quality |
|---|---|
| None | Generic with defaults (examples-first, professional, moderate) |
| Identity only | Cosmetic (name insertion) |
| + Expertise | Vocabulary and depth calibrated |
| + Professional Context | Examples grounded in learner's world |
| + Goals | Structure weighted toward goal relevance |
| + Communication | Tone and style matched |
| + Delivery | Format and length matched |

**Key principle: Partial profiles ALWAYS produce better output than no profile.** The engine must never produce worse output because a field is present. If a field's value would degrade output, the field is poorly designed (schema issue, not engine issue).

#### Edge Case 4: Contradictory Notes

**Example:** `expertise.programming.level: "advanced"` but `expertise.programming.notes: "only knows basic loops"`

**Resolution:** Notes override level. Notes are more specific and likely more accurate. The engine treats `level` as a coarse signal and `notes` as a fine-grain override. The personalization manifest logs: "programming.notes overrode programming.level: treating as beginner despite 'advanced' level setting."

---

## 5. Quality Gates Checklist

Every personalized output MUST pass ALL of these gates before delivery.

### Gate 1: Factual Integrity

- [ ] Every factual claim from the source appears in the output (possibly reworded)
- [ ] No facts have been altered, contradicted, or fabricated
- [ ] All attributions (quotes, paper references, named sources) are preserved exactly
- [ ] Technical terms are correctly defined/used even when simplified
- [ ] Numbers, dates, and statistics from the source are unchanged

### Gate 2: Concept Completeness

- [ ] Every concept from the source appears in the output
- [ ] Compressed concepts (via `topics_already_mastered` or `topics_to_skip`) still have a reference sentence
- [ ] No concept has been silently dropped
- [ ] Concept ordering preserves pedagogical dependencies (if concept B depends on concept A, A still comes first)

### Gate 3: Personalization Fidelity

- [ ] `language_complexity` is consistently applied throughout (not just the opening)
- [ ] `preferred_structure` governs the structural pattern of every section, not just the first
- [ ] `tone` is consistent from opening to closing
- [ ] Examples are drawn from `professional_context` / `analogy_domain`, not generic defaults
- [ ] `name` (if provided) appears 3-5 times at key touchpoints, not more
- [ ] `primary_learning_goal` is referenced in opening, at least one transition, and closing
- [ ] `career_goal` expansion/compression is applied to relevant sections

### Gate 4: Conflict Resolution Verification

- [ ] No unresolved contradictions between field effects in the output
- [ ] Conflict resolutions from Section 3 were applied correctly
- [ ] Personalization manifest documents all conflict resolutions applied

### Gate 5: Output Format Compliance

- [ ] `output_format` is correctly applied (no bullets in `prose` mode; no prose walls in `structured-with-headers` mode)
- [ ] `target_length` is within tolerance (+-20% of target)
- [ ] `include_code_samples` is respected (no code blocks when `false`)
- [ ] `code_verbosity` matches specification
- [ ] Summaries present iff `wants_summaries: true`
- [ ] Check-in questions present iff `wants_check_in_questions: true`
- [ ] Output language matches `delivery.language`

### Gate 6: No Harm

- [ ] Personalization has not introduced bias or stereotypes (e.g., assuming a female learner prefers certain examples)
- [ ] Simplification has not introduced inaccuracy (Gate 1 catches this, but double-check)
- [ ] The personalized output would not embarrass the learner if shared (no patronizing tone for `plain` complexity, no intimidating tone for `none` expertise)

---

## 6. Worked Example — "What is an AI Agent?"

### Source Lesson Excerpt (500 words)

> **What is an AI Agent?**
>
> An AI agent is a software system that uses a large language model (LLM) as its reasoning engine to autonomously perform tasks. Unlike a simple chatbot that responds to one prompt at a time, an agent operates in a loop: it receives a goal, reasons about how to achieve it, takes actions (like calling APIs, searching databases, or writing code), observes the results, and then decides what to do next.
>
> The core architecture of an agent has four components:
> 1. **The LLM** — the reasoning engine that decides what to do
> 2. **Tools** — external capabilities the agent can invoke (APIs, databases, file systems)
> 3. **Memory** — context the agent maintains across steps (conversation history, retrieved documents)
> 4. **The Loop** — the orchestration logic that cycles between reasoning and acting
>
> Here's a simple example in Python:
>
> ```python
> def agent_loop(goal, tools, max_steps=10):
>     memory = [{"role": "user", "content": goal}]
>     for step in range(max_steps):
>         response = llm.chat(memory)
>         if response.tool_calls:
>             results = execute_tools(response.tool_calls, tools)
>             memory.append(response)
>             memory.extend(results)
>         else:
>             return response.content
>     return "Max steps reached"
> ```
>
> This loop is deceptively simple but remarkably powerful. The agent can handle tasks it has never seen before, as long as it has the right tools. For example, a customer support agent might have tools for looking up order status, processing refunds, and escalating to a human — and it decides which tool to use based on the customer's question.
>
> The key insight is that agents don't follow a fixed script. They reason about each situation dynamically. This makes them fundamentally different from traditional automation (like if-then rules in Zapier) which can only handle predefined scenarios.
>
> Agents shine when tasks require judgment, multi-step reasoning, or integration across multiple systems. They struggle when tasks require perfect accuracy with no tolerance for error (like financial calculations) or when the cost of a mistake is very high.

---

### Transformation for Fatima (Career-Switching Business Analyst)

**Active fields:** programming=none, ai_ml=conceptual, domain=advanced logistics, business=advanced, language_complexity=professional, preferred_structure=examples-first, verbosity=moderate, tone=professional, include_code_samples=false, urgency=high, career_goal="AI product management", real_project="Shipment Exception Agent"

**Transformation decisions:**
- Lead with a logistics example (examples-first + domain=advanced logistics)
- No code (include_code_samples=false) — replace with process description
- Professional vocabulary, no jargon (language_complexity=professional)
- AI terms defined on first use (ai_ml=conceptual)
- Frame toward product management (career_goal)
- Use Shipment Exception Agent as example vehicle (real_projects)
- Compress: code architecture details. Expand: business application, product thinking.

> **What is an AI Agent?**
>
> Fatima, imagine your Shipment Exception Agent is running overnight. A container ship is delayed in Rotterdam, and three downstream deliveries are at risk. Today, someone on your team would check SAP TMS, identify the affected shipments, notify the carriers, and update the clients. An AI agent does exactly this — autonomously.
>
> An AI agent is a system that receives a goal, figures out the steps to achieve it, takes those actions, checks the results, and decides what to do next — all without human intervention. Think of it as a highly capable team member who follows your standard operating procedures, but can work 24/7 and handle hundreds of exceptions simultaneously.
>
> Unlike the simple automation rules you might set up in a workflow tool ("if shipment is delayed, send email"), an agent reasons about each situation dynamically. If the Rotterdam delay affects a high-priority client, the agent might escalate immediately. If it's a low-priority shipment with buffer time, it might just log it and monitor. The judgment is built in.
>
> Every agent has four components — and as someone moving into AI product management, this is the vocabulary your engineering team will use:
>
> - **The reasoning engine** — the AI model that makes decisions (like the experienced analyst who knows what to do when an exception arrives)
> - **Tools** — the systems the agent can interact with (in your case: SAP TMS for shipment data, Jira for ticket creation, email for client notifications)
> - **Memory** — the context the agent maintains as it works through a problem (the shipment history, client preferences, previous exception patterns)
> - **The coordination loop** — the process that cycles between "think about what to do" and "do it," checking results at each step
>
> The agent follows a straightforward process: it receives an exception alert, analyzes the situation using its reasoning engine, selects the appropriate action (notify carrier, update client, escalate to human), executes that action through its tools, observes the result, and decides if more action is needed.
>
> This is especially critical for your transition into AI product management — the ability to articulate these four components clearly is what separates a product manager who can spec an AI agent from one who can only spec traditional software.
>
> Where agents shine: tasks requiring judgment across multiple systems — exactly like shipment exception handling. Where they struggle: tasks requiring perfect numerical accuracy with zero error tolerance, like financial reconciliation.
>
> **Key Takeaways:**
> An AI agent is an autonomous system that reasons about goals, takes actions, and adapts — unlike fixed automation rules. As you design the Shipment Exception Agent, you'll need to define all four components: what reasons, what tools it uses, what it remembers, and how it loops. This is the foundation of every agent spec you'll write.
>
> **Check Your Understanding:** Looking at your shipment exception handling process today, which parts require judgment (agent-appropriate) and which require exact calculations (agent-risky)?

---

### Transformation for Raj (Experienced Full-Stack Developer)

**Active fields:** programming=advanced, ai_ml=intermediate, language_complexity=technical, preferred_structure=problem-first, verbosity=concise, tone=peer-to-peer, code_verbosity=minimal, include_code_samples=true, career_goal="Launch profitable AI agent SaaS", real_project="CodeReviewFTE", wants_summaries=false, wants_check_in_questions=false

**Transformation decisions:**
- Open with a problem (problem-first)
- Technical vocabulary, no hand-holding (technical + peer-to-peer)
- Concise — cut scaffolding prose, keep signal (verbosity=concise)
- Code shown, minimal annotation (code_verbosity=minimal)
- topics_already_mastered includes LangChain, RAG, REST API, Docker — compress these
- known_misconception: thinks infrastructure reliability is the primary gap -> insert correction
- Frame toward SaaS business (career_goal) using CodeReviewFTE (real_project)

> **What is an AI Agent?**
>
> **Problem:** You've built RAG apps and LLM integrations. They work in demos. They fail in production. The gap isn't infrastructure — it's specification.
>
> You already know the agent = LLM + tools + loop pattern. Here's what to focus on: agents reason dynamically per-request rather than following fixed control flow. That's the difference between your Zapier automations and a system that handles novel situations.
>
> The architecture you know:
>
> ```python
> def agent_loop(goal, tools, max_steps=10):
>     memory = [{"role": "user", "content": goal}]
>     for step in range(max_steps):
>         response = llm.chat(memory)
>         if response.tool_calls:
>             results = execute_tools(response.tool_calls, tools)
>             memory.append(response)
>             memory.extend(results)
>         else:
>             return response.content
>     return "Max steps reached"
> ```
>
> For CodeReviewFTE, this loop is where your agent decides: read the diff, check style rules, look up past review patterns, then compose the review. Each invocation reasons differently based on the code it's reviewing.
>
> A common assumption: the gap between prototype and production agent is reliability infrastructure — monitoring, failover, retries. It's not. The fundamental gap is specifying agent behavior upfront: what it should do, what it shouldn't, how it handles edge cases. Infrastructure matters, but without a spec, you're scaling a system you can't predict.
>
> This matters for your SaaS play: customers pay for predictable agent behavior, not impressive demos. The spec-driven approach you'll learn here is what makes CodeReviewFTE sellable.
>
> Agents excel at: judgment calls across systems (code review across style, logic, security). They're risky for: zero-tolerance accuracy tasks (financial calc, compliance reporting).

---

### Transformation for Marcus (First-Year CS Student)

**Active fields:** programming=beginner, ai_ml=none, domain=none, business=none, language_complexity=plain, preferred_structure=story-narrative, verbosity=detailed, tone=conversational, code_verbosity=fully-explained, target_length=long, wants_summaries=true, wants_check_in_questions=true

**Transformation decisions:**
- Story-narrative: continuous flow, minimal bullets, like telling a story (preferred_structure)
- Plain language: every term defined, short sentences (language_complexity=plain)
- Conversational: friendly, approachable (tone=conversational)
- AI terms all defined from scratch (ai_ml=none)
- Code kept but fully explained line by line (include_code_samples=true + code_verbosity=fully-explained)
- Detailed: generous explanation, multiple examples (verbosity=detailed)
- Everyday analogies (analogy_domain="everyday life — food, games, household tasks")

> **What is an AI Agent?**
>
> Marcus, let's start with something you already know. Think about ordering food from a delivery app. You open the app, pick a restaurant, choose your food, pay, and wait. Simple, right? Now imagine you had a really helpful friend who could do ALL of that for you. You just say, "Hey, I'm hungry — get me something good for lunch," and they handle every step: picking the restaurant based on your preferences, ordering the food, paying with your card, and texting you when it arrives.
>
> That helpful friend? That's basically what an AI agent is — but it's a computer program instead of a person.
>
> Here's the more precise definition: an AI agent is a program that takes a goal (like "get me lunch" or "answer this customer's question"), figures out the steps to achieve it, does those steps, checks if they worked, and keeps going until the goal is complete. The key word is "figures out" — the agent isn't following a fixed recipe. It makes decisions along the way, just like your friend would.
>
> This is different from the simple automation you might have seen before. Think about an alarm clock — it does one thing at one time, no matter what. It doesn't care if you're already awake or if it's a holiday. An AI agent is more like a smart assistant that looks at the situation and decides what to do.
>
> So how does an agent actually work inside? It has four parts, and they're easier to understand than you might think:
>
> First, there's the **brain** — this is an AI model (called a Large Language Model, or LLM) that reads text and writes text. You've used one before if you've used ChatGPT. The brain is what does the thinking and deciding.
>
> Second, there are **tools** — these are things the agent can use to interact with the world. Just like your friend uses the delivery app to order food, the agent uses tools like searching the internet, reading files, or sending messages. Without tools, the agent can only think and talk — it can't actually DO anything.
>
> Third, there's **memory** — this is how the agent remembers what it's been doing. Without memory, every step would feel like starting from scratch. With memory, the agent knows "I already checked the first restaurant and they were closed, so let me try the next one."
>
> Fourth, there's **the loop** — this is the process where the agent keeps cycling between thinking and doing until the goal is complete. Think, act, check, think again, act again. Over and over until done.
>
> Let's look at what this looks like in Python. Don't worry if every line isn't immediately clear — we'll walk through each one:
>
> ```python
> def agent_loop(goal, tools, max_steps=10):
>     memory = [{"role": "user", "content": goal}]
>     for step in range(max_steps):
>         response = llm.chat(memory)
>         if response.tool_calls:
>             results = execute_tools(response.tool_calls, tools)
>             memory.append(response)
>             memory.extend(results)
>         else:
>             return response.content
>     return "Max steps reached"
> ```
>
> Let's walk through this line by line:
>
> - `def agent_loop(goal, tools, max_steps=10):` — We're creating a function called `agent_loop`. It takes in a goal (what we want the agent to do), some tools (what the agent can use), and a maximum number of steps (so it doesn't run forever — like telling your friend "if you can't figure it out after 10 tries, just stop").
> - `memory = [{"role": "user", "content": goal}]` — We start the agent's memory with the goal. This is like writing "Get me lunch" on a sticky note and handing it to your friend.
> - `for step in range(max_steps):` — The agent tries up to 10 times. This is the loop — the "keep going until done" part.
> - `response = llm.chat(memory)` — The agent's brain (the LLM) looks at everything in memory and decides what to do next. This is the "thinking" step.
> - `if response.tool_calls:` — Did the brain decide to use a tool? If yes, we need to actually use that tool.
> - `results = execute_tools(...)` — Use the tool and get the results. Like your friend opening the delivery app and seeing what restaurants are available.
> - `memory.append(response)` and `memory.extend(results)` — Save what the agent decided and what happened into memory. Now it remembers this step for next time.
> - `else: return response.content` — If the brain decided it's done (no more tools needed), give back the final answer.
> - `return "Max steps reached"` — If the agent tried 10 times and still isn't done, it gives up gracefully.
>
> The truly powerful thing about agents is that they handle situations they've never seen before. A customer support agent might know how to look up orders, process refunds, and call for human help — and it figures out which one to use based on what the customer is asking. No one programmed "if customer says X, do Y" for every possible question.
>
> Where do agents work best? Tasks that need judgment and involve multiple steps across different systems — like a helpful friend who can check your calendar, book a restaurant, AND tell your friends the plan. Where do they struggle? Tasks that need perfect math with zero mistakes, like calculating your taxes. For that, you want regular programming, not an AI agent.
>
> **Key Takeaways:** An AI agent is a program with four parts — a brain (LLM), tools, memory, and a loop. It takes a goal, figures out the steps, takes action, checks results, and keeps going. Unlike simple automation (like an alarm clock), agents make decisions dynamically, just like a smart friend would. The Python code we saw is the basic blueprint that all agents follow.
>
> **Check Your Understanding:** Think about a task you do regularly that involves multiple steps and some judgment calls. Could an AI agent handle it? What tools would it need?

---

## 7. Cross-Dimensional Interaction Effects

Some fields interact in non-obvious ways across sections. The engine must account for these compound effects.

| Interaction | Fields Involved | Compound Effect |
|---|---|---|
| **Example Saturation** | `analogy_domain` + `professional_context.industry` + `real_projects` | If all three are set and aligned, every example comes from the same domain. Risk: monotonous. Engine should introduce 20% variety from adjacent domains. |
| **Compression Stacking** | `topics_already_mastered` + `topics_to_skip` + `urgency: high` + `target_length: short` | Multiple compression forces stack. Risk: output becomes too thin. Engine must enforce a minimum: no section compressed below its topic sentence + one example. |
| **Expansion Stacking** | `verbosity: detailed` + `target_length: long` + `code_verbosity: fully-explained` + `wants_summaries: true` + `wants_check_in_questions: true` | Multiple expansion forces stack. Risk: output becomes bloated and repetitive. Engine must cap total expansion at 200% of source length. |
| **Expertise-Tone Mismatch** | `expertise.*.level: none` + `tone: peer-to-peer` | Peer tone assumes shared expertise. If expertise is none, peer tone becomes patronizing or confusing. Engine should soften to `conversational` when expertise is uniformly low. |
| **Goal-Content Disconnect** | `primary_learning_goal` doesn't match lesson content | If the stated goal is "build a chatbot" but the lesson is about "database design," the engine shouldn't force connections. Anchor to the goal only where genuinely relevant. |

---

## 8. Schema Pushback Summary — Fields That Need Attention

These are fields where the engine spec reveals schema design issues:

| Issue | Field(s) | Problem | Recommendation |
|---|---|---|---|
| **Non-transformation metadata in profile** | `profile_created`, `profile_version` | These don't drive personalization. Including them in the profile payload adds noise. | Move to `_meta` envelope outside the profile. |
| **Overlapping compression semantics** | `topics_already_mastered`, `topics_to_skip` | Both compress content. Difference is subtle (acknowledgment vs. minimal mention). | Merge into single list with `compression_level: reference \| skip` per item. |
| **Vague relevance field** | `real_projects[].relevance` | Free-text relevance is unstructurable. Engine can't reliably decide how heavily to use a project. | Add `relevance_scope: primary \| secondary \| background` enum. |
| **No negative preferences** | Communication section | Learner can say what they want but not what they dislike. "I hate bullet lists" has no field. | Add `format_dislikes: string[]` or expand `format_notes` to explicitly cover aversions. |
| **Missing accessibility fields** | Delivery section | `visual_description_notes` hints at accessibility but there's no field for dyslexia-friendly formatting, color-blindness notes, or cognitive load preferences. | Add `accessibility_needs: string[]` for explicit accessibility requirements. |
| **No confidence/uncertainty signal** | Expertise section | Learner self-reports expertise levels but there's no way to express uncertainty. "I think I'm intermediate but I might be beginner" has no encoding. | Add optional `confidence: low \| medium \| high` to each expertise level. Low confidence -> engine verifies comprehension more actively. |
| **`ai_ml.level` has different enum than others** | `ai_ml.level` | Uses `none \| conceptual \| intermediate \| advanced \| expert` while others use `none \| beginner \| intermediate \| advanced \| expert`. "Conceptual" replaces "beginner" but with different semantics. | Either standardize all to the same enum, or document the distinction clearly. "Conceptual" means "knows what it does, not how" which is genuinely different from "beginner" (knows little). I'd keep it but document it. |

---

## 9. Personalization Manifest Specification

Every engine output MUST include a manifest documenting what happened. This is essential for debugging, quality auditing, and iterating on profiles.

```json
{
  "manifest_version": "1.0",
  "learner_id": "fatima-001",
  "source_lesson": "what-is-an-ai-agent.md",
  "timestamp": "2026-02-26T14:30:00Z",
  "profile_completeness": {
    "fields_provided": 22,
    "fields_total": 30,
    "sections_filled": ["identity", "expertise", "professional_context", "goals", "communication", "delivery"],
    "sections_empty": []
  },
  "transformations_applied": [
    {
      "field": "expertise.programming.level",
      "value": "none",
      "transformation": "Replaced code blocks with plain-language process descriptions",
      "sections_affected": ["agent-architecture", "code-example"]
    },
    {
      "field": "professional_context.real_projects[0]",
      "value": "Shipment Exception Agent",
      "transformation": "Used as primary example vehicle in 3 sections",
      "sections_affected": ["opening", "architecture", "application"]
    }
  ],
  "conflicts_resolved": [
    {
      "conflict": "C4 — include_code_samples:false + coding lesson",
      "resolution": "Replaced code with annotated pseudocode. Added 'For Reference' appendix.",
      "rule_applied": "C4"
    }
  ],
  "defaults_used": [
    {
      "field": "goals.secondary_goals",
      "default": "none",
      "reason": "Field not provided in profile"
    }
  ],
  "quality_gates_passed": ["factual_integrity", "concept_completeness", "personalization_fidelity", "conflict_resolution", "output_format", "no_harm"],
  "output_stats": {
    "source_word_count": 500,
    "output_word_count": 620,
    "compression_ratio": 1.24,
    "sections_expanded": 2,
    "sections_compressed": 1,
    "concepts_from_source": 8,
    "concepts_in_output": 8
  }
}
```

---

## 10. Open Questions for Team Discussion

1. **Profile Staleness:** How should the engine handle profiles that haven't been updated in months? The learner may have progressed. Should there be a `last_verified` timestamp with engine warnings?

2. **Multi-Lesson Consistency:** If a learner gets personalized versions of Lesson 1, 2, and 3, should the engine ensure consistency across lessons (e.g., same analogy domain used throughout)? This requires cross-lesson state.

3. **Feedback Loop:** Should the personalization manifest feed back into profile updates? If the engine consistently overrides a field's default, that suggests the learner's profile should be updated.

4. **A/B Testing:** Should the engine support generating two variants of the same lesson (e.g., examples-first vs. problem-first) for the learner to choose? This would accelerate profile refinement.

5. **Source Lesson Requirements:** The engine assumes source lessons are well-structured markdown with identifiable concepts, sections, and code blocks. What happens when a source lesson is poorly structured? Should there be a "source quality gate" before personalization?
