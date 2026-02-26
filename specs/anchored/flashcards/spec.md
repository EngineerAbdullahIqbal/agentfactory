# Flashcards Feature — Requirement Specification

**Status**: v2.0 (Post-implementation — reflects actual code on `flash-cards` branch)
**Date**: 2026-02-23
**Author**: MJS + Claude

---

## 1. Why Flashcards — The Business Case

### The Cost Problem

The learn-agentfactory skill provides AI-powered tutoring and quizzing. Every session costs API tokens — when opened to all students, cost scales linearly. Flashcards cost nothing per student. They're static content generated at build time with a client-side SRS engine.

| Feature                | Cost per student/session | Offline | Mobile               | SRS scheduling    |
| ---------------------- | ------------------------ | ------- | -------------------- | ----------------- |
| Learn skill (AI tutor) | ~$0.02-0.10              | No      | No                   | N/A               |
| Quiz component         | $0 (static)              | Yes     | Yes (web)            | No                |
| **Flashcards**         | **$0 (static)**          | **Yes** | **Yes (responsive)** | **Yes (FSRS v6)** |

### The Cognitive Case: Building the Mental CPU Cache

Agent engineering is vocabulary-dense. Students encounter hundreds of new terms across 85 chapters: Digital FTE, MCP, tool schema, function calling, context window, RLHF, LoRA...

**Without flashcards**: Every concept requires conscious lookup — slow, fragile thinking.
**With flashcards**: Primitives become automatic recall — faster architecture design, faster debugging, less documentation dependence.

This is backed by the **testing effect** — retrieval from memory strengthens neural pathways more than passive re-reading ([Karpicke & Roediger, 2008](https://www.science.org/doi/10.1126/science.1152408)). After 4-8 weeks of spaced repetition, students think in agent primitives automatically.

### Why We Own the Experience (Not Anki)

Code is cheap. A flip-card component with FSRS is ~400 lines of React + a 15KB npm dependency. What's expensive is ceding control.

| Factor               | Our Embedded Experience                | Anki Export                               |
| -------------------- | -------------------------------------- | ----------------------------------------- |
| Friction             | Zero — scroll down, start reviewing    | High — install app, download file, import |
| Design control       | Full — our brand, our UX, our theme    | None — Anki's UI                          |
| Mobile               | Works now — responsive web             | Requires app install                      |
| SRS quality          | FSRS v6 (same algorithm Anki uses)     | FSRS v6                                   |
| Student relationship | Stays on our site                      | Leaves our site                           |
| Content updates      | Automatic — always latest on page load | Must re-download and re-import .apkg      |
| Maintenance          | Zero server cost (localStorage)        | Zero                                      |

**Decision**: The embedded experience IS the product. Anki export is a secondary "power user" option.

### The Student Learning Pipeline

```
Stage 1: READ the lesson          → Comprehension (not memorization)
Stage 2: REVIEW flashcards        → Active recall + spaced repetition
Stage 3: RATE confidence          → Metacognitive calibration
Stage 4: BUILD by doing           → Apply with instant recall
```

Flashcards serve Stages 2-3. Lessons serve Stage 1. Exercises serve Stage 4.

---

## 2. Learning Science Foundation

Our embedded flashcard system implements five evidence-based techniques. This is what makes it better than basic Anki.

### 2.1 FSRS v6 — State-of-the-Art Scheduling

The **Free Spaced Repetition Scheduler** (FSRS) is a machine-learning-based algorithm that models memory using three components: stability, difficulty, and retrievability. It's the same algorithm Anki adopted in 2023, replacing the 30-year-old SM-2.

**Why FSRS over Leitner boxes**: FSRS achieves [99.6% superiority over SM-2](https://github.com/open-spaced-repetition/awesome-fsrs) in benchmarks — meaning for 99.6% of users, FSRS schedules reviews more efficiently. Students do 20-30% fewer reviews for the same retention.

**Implementation**: [`ts-fsrs`](https://github.com/open-spaced-repetition/ts-fsrs) (v4.x) — TypeScript, MIT license, supports ESM/CJS/UMD, FSRS v6, minimal bundle (~15KB). Card states: New → Learning → Review → Relearning.

### 2.2 Binary Confidence Rating (NotebookLM-Inspired)

After revealing the answer, students rate with two buttons: **Missed It | Got It**

This is a deliberate simplification from the 4-button FSRS native rating (Again/Hard/Good/Easy). The UX research showed that 4 granularity levels plus interval previews ("1m", "6m", "1d", "2d") caused confusion — students spent cognitive effort on rating mechanics instead of recall. The NotebookLM flashcard UX uses a similar binary approach successfully.

**Mapping to FSRS**: "Missed It" → `Rating.Again`, "Got It" → `Rating.Good`. This sacrifices scheduling precision (no Hard/Easy distinction) for a dramatically simpler UX. The FSRS algorithm still computes optimal intervals from these two signals — students who consistently miss a card will see it sooner.

This trains **metacognition** — each self-assessment forces "did I actually know this?" — without the cognitive overhead of distinguishing Hard from Good ([Brainscape CBR research](https://www.brainscape.com/academy/confidence-based-repetition-definition/)).

### 2.3 Interleaving (Mixed Practice) — Phase 1

Reviewing cards from a single lesson is **blocked practice**. Research shows [interleaved practice](https://www.retrievalpractice.org/interleaving) — mixing cards across related topics — leads to better long-term retention and transfer.

Phase 1 adds **chapter mode**: shuffled cards across all lessons in a chapter. Chapters are the natural interleaving boundary — related topics, distinct lessons.

### 2.4 Active Recall (Testing Effect)

The card always shows the **question first**. The student must attempt to recall before flipping. This is the testing effect — retrieval practice improves retention more than passive review. [Recent 2025 research](https://www.sciencedirect.com/science/article/pii/S0959475225001434) confirms this extends to complex educational concepts, not just simple facts.

The flip interaction is critical: no "show answer" autoplay, no peek. The student must commit to a mental answer first.

### 2.5 Elaborative Interrogation Hints

For intermediate/advanced cards, the back can include a **"Why?"** prompt — a brief elaborative interrogation question that pushes the student to connect the concept to their existing knowledge.

```
Front: "What are the core components of an agent?"
Back:  "Model, Tools, Memory, Instructions, State"
Why:   "Why would removing any one of these make the agent less capable?"
```

[Research shows](https://www.tandfonline.com/doi/full/10.1080/02702711.2025.2482627) elaborative interrogation activates prior knowledge and deepens encoding. It adds ~15% study time but significantly improves comprehension.

Optional per card (the `why` field). Definitions don't need it; architectural concepts benefit.

---

## 3. Solution Overview

```
Source of Truth           Web (Desktop + Mobile)          Power Users
──────────────           ──────────────────────          ───────────
flashcards.yaml    →     <Flashcards />                  .apkg export
(per lesson)              FSRS v6 scheduling              (optional download)
(version-controlled)      Confidence-based rating
                          localStorage persistence
                          Zero server cost
```

**Today**: Full-featured embedded SRS with FSRS v6 + optional Anki export
**Tomorrow**: Interleaved chapter mode, streak tracking

---

## 4. Scope

### Phase 0 (MVP — IMPLEMENTED)

- Flashcard YAML schema (with `deck.id`, `why` field, Zod validation)
- Remark plugin: `libs/docusaurus/remark-flashcards/`
- Shared utilities: `libs/docusaurus/shared/` (flashcardLoader, normalizeToDocId, siteConfig)
- React `<Flashcards />` component (10 files) with:
  - Unified single-mode UX (no separate browse/review — flip → rate → auto-advance)
  - Flip-card UI with CSS 3D animation
  - FSRS v6 scheduling via `ts-fsrs` (silently under the hood)
  - Binary rating: "Missed It" (`Rating.Again`) / "Got It" (`Rating.Good`)
  - Card state persistence (localStorage with epoch-ms wire format)
  - Session complete screen with missed/got-it counts + percentage + "Review Again"
  - Map-based rated card tracking (prevents double-counting on re-rating)
  - Shuffle (Fisher-Yates, reshuffles on each click)
  - Download dropdown: "Print as PDF" + "Anki Deck (.apkg)"
  - Code-split via `LazyFlashcards.tsx` (React.lazy + BrowserOnly for SSR safety)
- Anki `.apkg` export (build-time generation via `anki-apkg-export`)
- Pilot content: `thesis.md`, `why-ai-is-non-negotiable.md`, `preface-agent-native.md`
- CI: Zod schema validation of all `.flashcards.yaml` files
- 118 tests (111 component/hook + 7 remark plugin)

### Phase 1 (Scale + Interleaving)

- `/flashcard-author` skill for AI-assisted deck generation (lesson/chapter/part scope)
- Flashcard YAML for all 85 chapters
- Chapter mode: interleaved review across all lessons in a chapter
- Chapter/Part aggregate Anki decks

### Phase 2 (Engagement)

- Study streak tracking (localStorage)
- "Cards due today" counter badge on lessons
- Cross-chapter study sessions
- Deck content sharing via URL (share YAML content link, NOT review progress)

### Out of Scope (Permanently)

- Server-side state / user accounts for flashcard progress
- Building our own SRS algorithm (FSRS exists, ts-fsrs implements it)
- Mochi/Quizlet/Brainscape integrations
- Self-hosted flashcard backends
- Sharing review progress between devices (requires server — out of scope)

---

## 5. Flashcard Data Schema

### File Location

```
# Co-located with each lesson
apps/learn-app/docs/01-General-Agents-Foundations/01-agent-factory-paradigm/
├── 01-digital-fte-revolution.md
├── 01-digital-fte-revolution.flashcards.yaml   ← NEW
├── 02-another-lesson.md
└── 02-another-lesson.flashcards.yaml           ← NEW

# Preface-level files (pilot)
apps/learn-app/docs/
├── thesis.md
├── thesis.flashcards.yaml                      ← NEW
├── preface-agent-native.md
├── preface-agent-native.flashcards.yaml        ← NEW
├── why-ai-is-non-negotiable.md
└── why-ai-is-non-negotiable.flashcards.yaml    ← NEW
```

**Naming convention**: `{file-stem}.flashcards.yaml` — where `file-stem` is the `.md` filename without extension (e.g., `thesis.md` → `thesis.flashcards.yaml`, `01-digital-fte-revolution.md` → `01-digital-fte-revolution.flashcards.yaml`). This is the literal filename, NOT the Docusaurus route slug (which strips numeric prefixes).

### YAML Schema

```yaml
# thesis.flashcards.yaml
deck:
  id: "thesis" # REQUIRED, immutable, kebab-case
  title: "The Agent Factory Thesis"
  description: "Core concepts from the Agent Factory thesis"
  tags: ["thesis", "agent-factory", "part-0"]
  version: 1 # Increment on breaking card changes

cards:
  - id: "thesis-001"
    front: "What is a Digital FTE?"
    back: "A role-based AI system that composes tools, spawns specialist agents, and delivers outcomes at scale — functioning as a full-time digital employee."
    tags: ["definition", "core-concept"]
    difficulty: "basic"

  - id: "thesis-002"
    front: "What is the difference between an AI tool and an AI employee?"
    back: "An AI tool performs a single task when invoked. An AI employee operates autonomously within a role — managing context, composing tools, and delivering complete outcomes without step-by-step human direction."
    tags: ["distinction", "core-concept"]
    difficulty: "intermediate"
    why: "Why would a business pay 10x more for an AI employee than an AI tool?"

  - id: "thesis-003"
    front: "What does 'Spec-Driven Development' mean?"
    back: "A development methodology where human-written specifications are the source of truth, and AI agents implement from those specs. The human specifies WHAT; the agent handles HOW."
    tags: ["methodology", "sdd"]
    difficulty: "intermediate"
    why: "Why must the spec be human-written rather than AI-generated?"
```

### Schema Rules

| Field                | Required | Type     | Constraints                                                                                                                                                    |
| -------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deck.id`            | **Yes**  | string   | **Immutable.** Kebab-case, unique across all decks. Used as localStorage key and Anki deck ID. Never change after first publish.                               |
| `deck.title`         | Yes      | string   | Human-readable. Can be updated without breaking state.                                                                                                         |
| `deck.description`   | Yes      | string   | 1-2 sentences.                                                                                                                                                 |
| `deck.tags`          | Yes      | string[] | For filtering/grouping.                                                                                                                                        |
| `deck.version`       | Yes      | integer  | Start at 1. **Informational only in Phase 0** — no migration or state reset triggered. Logged to console on change. Future phases may use for migration gates. |
| `cards[].id`         | **Yes**  | string   | **Immutable.** Unique within deck, kebab-case. Maps to stable Anki note GUID and localStorage key. Never reuse a deleted ID.                                   |
| `cards[].front`      | Yes      | string   | The question. Plain text or minimal markdown. No yes/no questions.                                                                                             |
| `cards[].back`       | Yes      | string   | The answer. Max 3 sentences.                                                                                                                                   |
| `cards[].tags`       | No       | string[] | Card-level tags.                                                                                                                                               |
| `cards[].difficulty` | No       | enum     | `basic` \| `intermediate` \| `advanced`. Default: `basic`.                                                                                                     |
| `cards[].why`        | No       | string   | Elaborative interrogation prompt. Recommended for intermediate/advanced.                                                                                       |

### Immutability Rules

- `deck.id`: NEVER change. Changing resets all student progress for this deck.
- `cards[].id`: NEVER reuse. If a card is removed, its ID is retired permanently.
- `deck.title`, `deck.description`, card `front`/`back`/`why`: Safe to edit — state keys are `deck.id` + `cards[].id`.

### Content Guidelines

**What makes a good card:**

- **Front**: One clear question requiring active recall. Never yes/no.
- **Back**: Concise (1-3 sentences). The "why" not just the "what".
- **Atomic**: One concept per card. If you need "and", split it.
- **Why field**: Add for concepts where connecting to prior knowledge deepens understanding.

**Deck sizing:**

- 8-20 cards per lesson
- ~40% basic, ~40% intermediate, ~20% advanced
- Conceptual lessons (preface, thesis): 8-12 cards
- Technical lessons (Python syntax, APIs): 15-20 cards

**What NOT to card:**

- Explanations longer than 3 sentences
- Multi-step procedures (use exercises)
- Opinions or "it depends" answers
- Architecture diagrams

### CI Validation (Zod Schema)

All `.flashcards.yaml` files are validated in CI via a Zod schema:

```typescript
// scripts/validate-flashcards.ts
import { z } from "zod";

const CardSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Must be kebab-case"),
  front: z.string().min(10).max(300),
  back: z.string().min(10).max(500),
  tags: z.array(z.string()).optional(),
  difficulty: z.enum(["basic", "intermediate", "advanced"]).optional(),
  why: z.string().max(200).optional(),
});

const DeckSchema = z.object({
  deck: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(300),
    tags: z.array(z.string()).min(1),
    version: z.number().int().positive(),
  }),
  cards: z.array(CardSchema).min(5).max(30),
});

// Additional lint rules:
// - No duplicate card IDs within a deck
// - No duplicate card IDs across all decks (globally unique)
// - front must end with "?"
// - back must not start with "Yes" or "No"
// - difficulty distribution warning if >60% same level
```

**CI wiring**:

1. Add an Nx target in `apps/learn-app/project.json`:

```json
"validate-flashcards": {
  "executor": "nx:run-commands",
  "options": {
    "command": "pnpm exec tsx scripts/validate-flashcards.ts",
    "cwd": "apps/learn-app"
  }
}
```

2. Add as a dependency of the existing `lint` target:

```json
"lint": {
  "dependsOn": ["validate-flashcards"],
  // ... existing lint config
}
```

3. The validate script globs `docs/**/*.flashcards.yaml`, parses each with `yaml`, validates against the Zod schema, and exits non-zero on any failure (with file path + error details in stderr).

**Result**: `pnpm nx lint learn-app` (and `pnpm nx affected -t lint`) automatically validates all flashcard YAML. Failures block merge via existing CI pipeline.

---

## 6. State Management

### localStorage Wire Format

**[P0 fix]**: `Date` objects are not JSON-serializable. All dates stored as epoch milliseconds.

```typescript
// Storage key: `flashcards:${deck.id}`
// Example: `flashcards:thesis`

interface PersistedDeckState {
  schemaVersion: 1; // For future migrations
  deckVersion: number; // Matches deck.version from YAML
  cards: Record<string, PersistedCardState>; // Keyed by card.id
  lastReviewMs: number; // Epoch ms
}

interface PersistedCardState {
  dueMs: number; // Epoch ms — when card is next due
  stability: number; // FSRS stability
  difficulty: number; // FSRS difficulty (0-10)
  elapsed_days: number;
  scheduled_days: number;
  reps: number; // Total reviews
  lapses: number; // Times "Again" was pressed
  state: 0 | 1 | 2 | 3; // 0=New, 1=Learning, 2=Review, 3=Relearning
  lastReviewMs?: number; // Epoch ms
}
```

### Hydration Codec

```typescript
// useFSRS.ts — explicit field mapping (no spread) to prevent field leakage

function hydrate(p: PersistedCardState): Card {
  return {
    due: new Date(p.dueMs),
    stability: p.stability,
    difficulty: p.difficulty,
    elapsed_days: p.elapsed_days,
    scheduled_days: p.scheduled_days,
    reps: p.reps,
    lapses: p.lapses,
    state: p.state as State,
    last_review: p.lastReviewMs ? new Date(p.lastReviewMs) : undefined,
  };
}

function dehydrate(c: Card): PersistedCardState {
  return {
    dueMs: c.due.getTime(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state as 0 | 1 | 2 | 3,
    lastReviewMs: c.last_review?.getTime(),
  };
}
```

### State Reconciliation (Deck/Card Edits Across Releases)

When a student visits a lesson after deck content has been updated:

| Scenario                                                | Behavior                                                                                                 |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **New card added** (ID not in localStorage)             | Initialize as `state: New`. No progress lost.                                                            |
| **Card removed** (ID in localStorage but not in YAML)   | Ignore orphaned state. Don't show card. Don't delete state (avoids accidental loss if card is re-added). |
| **Card content edited** (same ID, different front/back) | Show updated content. Preserve SRS state — the student's memory of the concept carries over.             |
| **deck.version bumped**                                 | Log to console: `Flashcards deck "${id}" updated to v${version}`. No state reset.                        |
| **deck.id changed** (should never happen)               | Fresh start — old state is orphaned under old key. This is why `deck.id` is immutable.                   |
| **Unknown card IDs in localStorage**                    | Silently ignored during render. Cleaned up after 90 days of no access (Phase 2).                         |

### Storage Budget

- **Per deck**: ~2KB for 20 cards (JSON, no compression)
- **85 chapters x avg 3 lessons**: ~510KB total at full scale
- **localStorage limit**: 5-10MB (browser-dependent)
- **Headroom**: Comfortable. No compression needed.

---

## 7. Web Component: `<Flashcards />`

### Usage in MDX

```mdx
## Flashcards

<Flashcards />
```

Auto-discovers `{file-stem}.flashcards.yaml` in the same directory via remark plugin injection.

### Component UX — Unified Single Mode (NotebookLM-Inspired)

The component has **one unified flow** — no separate browse/review modes. This was a deliberate simplification after UX testing showed a "Start Review" button created unnecessary friction.

**Card view** (front — question visible):

```
┌──────────────────────────────────────────┐
│                                          │
│  ‹  ┌──────────────────────────────┐  ›  │
│     │  [Copy]              Question│     │
│     │                              │     │
│     │  What is a Digital FTE?      │     │
│     │                              │     │
│     │         See answer           │     │
│     └──────────────────────────────┘     │
│                                          │
│  ████████░░░░░░░░░░░░░  3 / 12 cards    │
│                                          │
│  [⇅ Shuffle]              [⇓ Download]  │
│                                          │
└──────────────────────────────────────────┘
```

**Card view** (back — after flip, rating buttons appear):

```
┌──────────────────────────────────────────┐
│                                          │
│  ‹  ┌──────────────────────────────┐  ›  │
│     │  [Copy]               Answer │     │
│     │                              │     │
│     │  A role-based AI system...   │     │
│     │                              │     │
│     │  Why?                        │     │
│     │  Why would removing any one  │     │
│     │  of these make it less...    │     │
│     └──────────────────────────────┘     │
│                                          │
│  ┌─────────────┐  ┌─────────────┐       │
│  │ 2 Missed It │  │ 5 Got It    │       │
│  └─────────────┘  └─────────────┘       │
│                                          │
│  ████████░░░░░░░░░░░░░  3 / 12 cards    │
│                                          │
│  [⇅ Shuffle]              [⇓ Download]  │
│                                          │
└──────────────────────────────────────────┘
```

**Session complete** (all cards rated):

```
┌──────────────────────────────────────────┐
│                                          │
│           Session Complete               │
│                                          │
│       2 missed        10 got it          │
│                                          │
│              83% correct                 │
│                                          │
│          [Review Again]                  │
│                                          │
└──────────────────────────────────────────┘
```

**Download dropdown** (on click):

```
┌───────────────┐
│ Print as PDF  │
│ Anki (.apkg)  │  ← Only shown if manifest has this deck
└───────────────┘
```

**No flashcards available** (YAML file does not exist for this lesson):

```
┌──────────────────────────────────────────┐
│  Flashcards are not available for this   │
│  lesson yet.                             │
└──────────────────────────────────────────┘
```

Component renders a subtle muted message when `cards={null}`. No error, no blank space, no layout shift.

**Note**: This state ONLY occurs when no `.flashcards.yaml` file exists for the lesson (remark plugin injects `null`). If a `.flashcards.yaml` file exists but contains invalid YAML or fails schema validation, the **build fails** (see Section 9, step 6). Invalid content never reaches the component at runtime.

### Session Tracking

Rated cards are tracked via `Map<string, "missed" | "gotit">` keyed by card ID. This prevents double-counting if a user navigates back and re-rates a card — the Map entry is overwritten, not duplicated. Counts are derived from the Map values at render time.

Session complete triggers when `ratedCards.size >= totalCards && isLastCard && !isFlipped`.

### Component Props

```typescript
interface FlashcardsProps {
  /** Injected by remark plugin at build time. null = YAML not found. undefined = not injected. */
  cards?: FlashcardDeck | null;
}
```

**Note**: The `tags`, `maxDifficulty`, and `hideExport` props from v1.1 spec were not implemented. The single `cards` prop covers Phase 0 needs. Additional filtering can be added in Phase 1 if needed.

### Interaction

| Action             | Behavior                                             | Notes                                                   |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------- |
| Click/tap card     | Flip front→back (show answer + why)                  | Also works back→front                                   |
| Space key          | Flip front→back only                                 | Does NOT toggle back→front (prevents accidental unflip) |
| Arrow left / right | Previous / Next card                                 | Also Up/Down arrows                                     |
| 1 key              | "Missed It" (Rating.Again)                           | Only active when card is flipped                        |
| 2 key              | "Got It" (Rating.Good)                               | Only active when card is flipped                        |
| ‹ / › nav arrows   | Previous / Next card                                 | Disabled at boundaries                                  |
| Shuffle button     | Fisher-Yates reshuffle, resets to card 1             | Each click produces new random order                    |
| Download button    | Opens dropdown: "Print as PDF" / "Anki Deck (.apkg)" | Anki option hidden if no manifest entry                 |

**Keyboard guards**: All keyboard handlers check `(e.target as HTMLElement).tagName` — they do NOT fire when the user is typing in INPUT, TEXTAREA, or SELECT elements (e.g., Docusaurus search bar).

### Accessibility Requirements

| Requirement                  | Implementation                                                                                                                                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **`prefers-reduced-motion`** | Replace flip animation with instant swap (opacity crossfade).                                                                                   |
| **Screen reader**            | Front and back are both in DOM. Use `aria-live="polite"` on card region. Back is `aria-hidden` until flipped, then front becomes `aria-hidden`. |
| **Keyboard-only**            | All interactions have keyboard equivalents (see table above). Space, 1/2, arrows.                                                               |
| **ARIA roles**               | Card: `role="region" aria-label="Flashcard {n} of {total}"`. Rating buttons: `role="group" aria-label="Rate your recall"`.                      |
| **Color independence**       | Rating buttons use color AND text labels + running counts. "Missed It" (red) / "Got It" (green).                                                |
| **Keyboard guards**          | Keyboard handlers skip INPUT/TEXTAREA/SELECT elements to avoid intercepting search/form typing.                                                 |

### Styling

- Follows `DESIGN_SYSTEM.md`
- Uses `--ifm-color-*` CSS variables (Docusaurus theme)
- Dark/light mode support
- Responsive: full-width on mobile, max-width 600px on desktop
- Flip: CSS `transform: rotateY(180deg)` with `perspective(1000px)` (disabled if `prefers-reduced-motion`)
- Rating buttons: pill-shaped (border-radius: 999px), "Missed It" (red) / "Got It" (green) with running count badges
- Atmospheric glow effect on card area
- NotebookLM-inspired minimal aesthetic

### Performance Budgets

| Metric                      | Target                                  |
| --------------------------- | --------------------------------------- |
| Component JS (gzipped)      | < 20KB (ts-fsrs ~15KB + component ~5KB) |
| First render (no SRS state) | < 50ms                                  |
| Flip animation              | 60fps, < 300ms duration                 |
| localStorage read/write     | < 5ms per operation                     |
| Layout shift (CLS)          | 0 — component reserves height on mount  |

---

## 8. Anki Export (Secondary)

### Build-Time .apkg Generation

```bash
node scripts/generate-anki-decks.js
```

**Output directory**: `apps/learn-app/static/flashcards/`

**Build wiring**: Both validation and Anki generation run via Nx `dependsOn` in `project.json`:

```json
"validate-flashcards": {
  "executor": "nx:run-commands",
  "options": {
    "command": "pnpm exec tsx scripts/validate-flashcards.ts",
    "cwd": "apps/learn-app"
  }
},
"generate-anki": {
  "executor": "nx:run-commands",
  "options": {
    "command": "node scripts/generate-anki-decks.js",
    "cwd": "apps/learn-app"
  }
},
"build": {
  "dependsOn": ["validate-flashcards", "generate-anki"],
  // ... existing build config
}
```

`build.sh` delegates to Nx — it does NOT duplicate the validate/generate calls (earlier review caught this double-execution bug). The `build.sh` script has `set -euo pipefail` for fail-fast behavior.

This ensures `.apkg` files and `manifest.json` exist in `static/flashcards/` before Docusaurus copies static assets.

### Manifest

The build script generates a manifest alongside the `.apkg` files:

```json
// apps/learn-app/static/flashcards/manifest.json
{
  "generated": "2026-02-21T12:00:00Z",
  "decks": {
    "thesis": {
      "apkgPath": "/flashcards/thesis.apkg",
      "title": "The Agent Factory Thesis",
      "cardCount": 12
    },
    "preface-agent-native": {
      "apkgPath": "/flashcards/preface-agent-native.apkg",
      "title": "PREFACE: The AI Agent Factory",
      "cardCount": 15
    }
  }
}
```

The `<Flashcards />` component fetches `/flashcards/manifest.json` at mount time and uses `deck.id` to look up the `.apkg` path. If the manifest fetch fails or no entry exists for this deck, the Anki option is hidden from the download dropdown (not an error). Fetch failures are logged via `console.warn`.

### Anki Deck Properties

- **Deck name**: `AgentFactory::{Part}::{Chapter}::{Lesson}`
- **Card type**: Basic (front/back) with optional "Why" field
- **Fields**: Front, Back, Why (optional), Tags, SourceURL
- **Tags**: From YAML + auto-tags (`part-1`, `ch-01`, `difficulty::basic`)
- **Note GUID**: Deterministic hash of `deck.id + card.id` — stable across rebuilds, prevents duplicates on re-import
- **SourceURL**: Resolved using the same precedence as `chapter-manifest-plugin/index.js` (line 165):

  **Resolution order**:
  1. If MDX frontmatter contains `slug:` → use it (e.g., `slug: /General-Agents-Foundations/general-agents/cross-vendor-landscape`)
  2. Else → `normalizeToDocId(filePath)` (strip `^\d+-` from each segment)

  **Single source of truth for host**: `libs/docusaurus/shared/siteConfig.js` exports `url` and `baseUrl` extracted from `docusaurus.config.ts`. Implemented as a simple CJS module with hardcoded values matching the config (avoids TSX build-time import complexity).

  The script composes: `${siteUrl}${baseUrl}docs/${route.replace(/^\/+/, "")}` (strip leading slashes from route to prevent `docs//...` double-slash).

  ```
  Example A — no frontmatter slug:
    MDX path: apps/learn-app/docs/01-General-Agents-Foundations/01-agent-factory-paradigm/01-digital-fte-revolution.md
    normalizeToDocId → General-Agents-Foundations/agent-factory-paradigm/digital-fte-revolution
    SourceURL → https://agentfactory.panaversity.org/docs/General-Agents-Foundations/agent-factory-paradigm/digital-fte-revolution

  Example B — frontmatter slug override (slug: /General-Agents-Foundations/general-agents/cross-vendor-landscape):
    route after strip leading / → General-Agents-Foundations/general-agents/cross-vendor-landscape
    SourceURL → https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents/cross-vendor-landscape
  ```

  `normalizeToDocId` is currently duplicated in `summaries-plugin/index.js` (line 27) and `chapter-manifest-plugin/index.js` (line 78). Extract to a shared utility at `libs/docusaurus/shared/normalizeToDocId.js`. All three consumers (`summaries-plugin`, `chapter-manifest-plugin`, `generate-anki-decks.js`) import from there. See File Changes Summary (Section 10).

### Library Decision

**Selected**: [`anki-apkg-export`](https://www.npmjs.com/package/anki-apkg-export) (JS, MIT license).

Criteria met:

- Generates valid `.apkg` files importable by Anki desktop, AnkiWeb, AnkiDroid
- Supports custom note types (for the "Why" field)
- Supports stable note GUIDs
- No native dependencies (pure JS — works in CI)
- Actively maintained

If `anki-apkg-export` proves insufficient at implementation time, fallback to [`@nicolecomputer/anki-apkg-export`](https://github.com/nicolecomputer/anki-apkg-export) fork. Decision must be made in implementation sprint, not deferred further.

---

## 9. Docusaurus Integration

### Remark Plugin: `libs/docusaurus/remark-flashcards/`

**Location**: `libs/docusaurus/remark-flashcards/` (follows existing convention: `remark-content-enhancements`, `remark-interactive-python`, `remark-os-tabs`)

**Structure**:

```
libs/docusaurus/remark-flashcards/
├── index.js          # Remark plugin
├── package.json      # { "name": "remark-flashcards", "main": "index.js" }
└── project.json      # Nx project config
```

**Behavior**:

1. Walk AST for `<Flashcards />` JSX nodes
2. Resolve co-located `{file-stem}.flashcards.yaml` using `(file.history?.[0] ?? file.path ?? "").replace(/\\/g, "/")` (follows `remark-interactive-python` convention at `index.js:35` — `file.history[0]` is the canonical path in VFile)
3. Parse YAML, validate against schema
4. Inject parsed deck data as `cards` prop: `<Flashcards cards={...} />`
5. If `.flashcards.yaml` not found: inject `cards={null}` — component handles gracefully
6. If `.flashcards.yaml` exists but is invalid YAML/schema: **fail the build**. Do NOT silently degrade. Invalid flashcard files are authoring bugs, not runtime conditions. Build failure forces the fix before deploy.

**Registration** in `docusaurus.config.ts`:

```typescript
remarkPlugins: [
  // ... existing plugins ...
  require("../../libs/docusaurus/remark-flashcards"),
],
```

### Dependencies

| Package            | Scope                   | Purpose                   | Size              |
| ------------------ | ----------------------- | ------------------------- | ----------------- |
| `ts-fsrs`          | learn-app runtime       | FSRS v6 SRS algorithm     | ~15KB gzipped     |
| `yaml`             | remark-flashcards build | YAML parsing              | Build only        |
| `anki-apkg-export` | scripts build           | .apkg generation          | Build/script only |
| `zod`              | scripts/CI              | Schema validation         | Build/CI only     |
| `tsx`              | scripts/CI (devDep)     | Run TS validation scripts | Build/CI only     |

### Global Registration

Register in `src/theme/MDXComponents.tsx` (note: `.tsx`, not `.ts`):

```typescript
import Flashcards from "@/components/Flashcards";

export default {
  ...MDXComponents,
  // ... existing components ...
  Flashcards,
};
```

---

## 10. File Changes Summary

### New Files

| File                                                                  | Purpose                                                   |
| --------------------------------------------------------------------- | --------------------------------------------------------- |
| `libs/docusaurus/remark-flashcards/index.js`                          | Remark plugin: YAML → prop injection                      |
| `libs/docusaurus/remark-flashcards/package.json`                      | Package config                                            |
| `libs/docusaurus/remark-flashcards/project.json`                      | Nx project config                                         |
| `libs/docusaurus/remark-flashcards/vitest.config.js`                  | Plugin test config                                        |
| `libs/docusaurus/remark-flashcards/__tests__/index.test.js`           | 7 tests for remark plugin                                 |
| `libs/docusaurus/shared/flashcardLoader.js`                           | Shared YAML loader (loadAllDecks, loadDeckForFile)        |
| `libs/docusaurus/shared/normalizeToDocId.js`                          | Shared utility: strip `^\d+-` from path segments          |
| `libs/docusaurus/shared/siteConfig.js`                                | Shared site URL/baseUrl config                            |
| `libs/docusaurus/shared/package.json`                                 | Package config for docusaurus-shared                      |
| `libs/docusaurus/shared/project.json`                                 | Nx project config (visible to dependency graph)           |
| `apps/learn-app/src/components/flashcards/Flashcards.tsx`             | Main component (unified mode, Map-based session tracking) |
| `apps/learn-app/src/components/flashcards/FlashcardCard.tsx`          | Individual card with flip animation, copy, why section    |
| `apps/learn-app/src/components/flashcards/ReviewSession.tsx`          | SRS review session (kept for future chapter mode)         |
| `apps/learn-app/src/components/flashcards/RatingButtons.tsx`          | "Missed It" / "Got It" with running count badges          |
| `apps/learn-app/src/components/flashcards/LazyFlashcards.tsx`         | Code-split wrapper: React.lazy + BrowserOnly (SSR safe)   |
| `apps/learn-app/src/components/flashcards/useFSRS.ts`                 | Hook: ts-fsrs + localStorage + hydration codec            |
| `apps/learn-app/src/components/flashcards/Flashcards.module.css`      | NotebookLM-inspired styles + flip animation               |
| `apps/learn-app/src/components/flashcards/schema.ts`                  | Zod schema (CardSchema, DeckSchema) for CI validation     |
| `apps/learn-app/src/components/flashcards/index.ts`                   | Barrel export                                             |
| `apps/learn-app/src/components/flashcards/types.ts`                   | Shared types (PersistedDeckState, FlashcardDeck, etc.)    |
| `apps/learn-app/scripts/generate-anki-decks.js`                       | Build-time .apkg + manifest generator                     |
| `apps/learn-app/scripts/validate-flashcards.ts`                       | Zod schema validation + lint rules for CI                 |
| `apps/learn-app/docs/thesis.flashcards.yaml`                          | Pilot deck 1                                              |
| `apps/learn-app/docs/preface-agent-native.flashcards.yaml`            | Pilot deck 2                                              |
| `apps/learn-app/docs/why-ai-is-non-negotiable.flashcards.yaml`        | Pilot deck 3                                              |
| `apps/learn-app/src/__tests__/flashcards/Flashcards.test.tsx`         | Main component tests (5 tests)                            |
| `apps/learn-app/src/__tests__/flashcards/FlashcardCard.test.tsx`      | Card component tests                                      |
| `apps/learn-app/src/__tests__/flashcards/RatingButtons.test.tsx`      | Rating buttons tests (4 tests)                            |
| `apps/learn-app/src/__tests__/flashcards/ReviewSession.test.tsx`      | Review session tests (3 tests)                            |
| `apps/learn-app/src/__tests__/flashcards/useFSRS.test.ts`             | Hook tests (348 lines, comprehensive)                     |
| `apps/learn-app/src/__tests__/flashcards/validate-flashcards.test.ts` | Validation tests (16 tests)                               |
| `apps/learn-app/src/__tests__/flashcards/generate-anki-decks.test.ts` | Anki generation tests (12 tests)                          |

### Modified Files

| File                                               | Change                                                                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `apps/learn-app/src/theme/MDXComponents.tsx`       | Register `<Flashcards />` via `LazyFlashcards`                                                              |
| `apps/learn-app/docusaurus.config.ts`              | Add `remark-flashcards` to remarkPlugins                                                                    |
| `apps/learn-app/package.json`                      | Add `ts-fsrs`, `react-markdown` runtime; `anki-apkg-export`, `zod`, `tsx` dev deps                          |
| `apps/learn-app/project.json`                      | Add `validate-flashcards` + `generate-anki` Nx targets; `build.dependsOn`; `docusaurus-shared` implicit dep |
| `apps/learn-app/scripts/build.sh`                  | Delegates to nx dependsOn (removed duplicate validate/generate calls)                                       |
| `apps/learn-app/.gitignore`                        | Add `static/flashcards/` (build-time generated)                                                             |
| `libs/docusaurus/summaries-plugin/index.js`        | Import `normalizeToDocId` from `../shared/normalizeToDocId.js` instead of defining locally                  |
| `libs/docusaurus/chapter-manifest-plugin/index.js` | Import `normalizeToDocId` from `../shared/normalizeToDocId.js` instead of defining locally                  |
| `apps/learn-app/docs/thesis.md`                    | Add `<Flashcards />` section                                                                                |
| `apps/learn-app/docs/preface-agent-native.md`      | Add `<Flashcards />` section                                                                                |
| `apps/learn-app/docs/why-ai-is-non-negotiable.md`  | Add `<Flashcards />` section                                                                                |
| `pnpm-lock.yaml`                                   | Updated with new dependencies                                                                               |

---

## 11. Requirements Traceability

### Functional Requirements

| ID        | Requirement                                              | Status | Acceptance Test                                                                                                           | Phase |
| --------- | -------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- | ----- |
| **FR-01** | Card flip animation shows front then back on interaction | ✅     | Unit: click triggers flip state. Visual: CSS 3D transform renders. Reduced-motion fallback tested.                        | 0     |
| **FR-02** | FSRS v6 schedules next review based on rating            | ✅     | Unit: `useFSRS` returns correct `due` after rating. 348-line test suite covers hydration, persistence, reconciliation.    | 0     |
| **FR-03** | Binary rating: "Missed It" / "Got It"                    | ✅     | Unit: buttons fire Rating.Again / Rating.Good. Keyboard 1/2 tested. Counts displayed via Map-derived values.              | 0     |
| **FR-04** | Session complete after rating all cards                  | ✅     | Map-based tracking: `ratedCards.size >= totalCards && isLastCard && !isFlipped`. Shows percentage + "Review Again".       | 0     |
| **FR-05** | State persists in localStorage across reloads            | ✅     | Integration: write state, reload page, verify state restored. Quota exceeded and corruption recovery tested.              | 0     |
| **FR-06** | Elaborative "Why?" shown on back for cards that have it  | ✅     | Unit: `why` field renders when present, absent when not.                                                                  | 0     |
| **FR-07** | Prev/next navigation with keyboard and arrows            | ✅     | Unit: arrow keys and buttons change current card index. Keyboard guards skip INPUT/TEXTAREA/SELECT.                       | 0     |
| **FR-08** | Anki export via download dropdown with correct SourceURL | ✅     | Unit tests for SourceURL: normalizeToDocId, frontmatter.slug, no double-slash. Download dropdown with PDF + Anki options. | 0     |
| **FR-09** | Remark plugin injects YAML data at build time            | ✅     | 7 tests: null/error/valid/multiple-nodes/skip-existing paths. AST structure including estree nodes verified.              | 0     |
| **FR-10** | Missing .flashcards.yaml shows graceful fallback         | ✅     | Unit: `cards={null}` renders muted "not available" message.                                                               | 0     |
| **FR-11** | State reconciliation handles added/removed cards         | ✅     | Unit: new card ID → New state; removed card ID → tombstoned (kept in state but not shown).                                | 0     |
| **FR-12** | Invalid .flashcards.yaml fails the build                 | ✅     | Remark plugin throws with file path context. Zod validation runs as nx lint dependency.                                   | 0     |
| **FR-13** | Shuffle deck on demand                                   | ✅     | Fisher-Yates shuffle via counter increment. Resets to card 1 on each click.                                               | 0     |
| **FR-14** | Code-split for SSR safety                                | ✅     | LazyFlashcards.tsx: React.lazy + BrowserOnly wrapper prevents SSR hydration errors.                                       | 0     |
| **FR-15** | Interleaved chapter mode                                 | —      | Future: aggregate cards across lessons in a chapter.                                                                      | 1     |

### Non-Functional Requirements

| ID         | Requirement                       | Metric                                                                            | Phase |
| ---------- | --------------------------------- | --------------------------------------------------------------------------------- | ----- |
| **NFR-01** | Component JS budget               | < 20KB gzipped (ts-fsrs + component)                                              | 0     |
| **NFR-02** | No layout shift                   | CLS = 0 for pages with flashcards                                                 | 0     |
| **NFR-03** | Mobile responsive                 | Readable and functional at 375px viewport                                         | 0     |
| **NFR-04** | Animation respects reduced motion | `prefers-reduced-motion: reduce` → no flip, use crossfade                         | 0     |
| **NFR-05** | Screen reader accessible          | `aria-live`, `aria-hidden` toggling, focus management                             | 0     |
| **NFR-06** | localStorage budget               | < 600KB for full 85-chapter deployment                                            | 0     |
| **NFR-07** | Build time impact                 | < 5s added to both `pnpm build` (CI path) and `pnpm nx build learn-app` (Nx path) | 0     |
| **NFR-08** | Keyboard navigable                | All interactions via keyboard (Space, 1-2, arrows). Guards skip form elements.    | 0     |
| **NFR-09** | Dark/light theme                  | Renders correctly in both Docusaurus themes                                       | 0     |

---

## 12. Success Criteria

### Phase 0 — Implementation Status

**Component (FR-01 through FR-07, FR-10, FR-11, FR-13, FR-14):**

- [x] `<Flashcards />` renders in all 3 pilot pages
- [x] Card flip animation works (CSS 3D, smooth, reduced-motion fallback)
- [x] Unified mode: flip → "Missed It" / "Got It" → auto-advance → session complete
- [x] Prev/next navigation with arrows and keyboard
- [x] "Why?" prompt renders on applicable cards
- [x] State persists across reloads (wire format with epoch ms)
- [x] State reconciliation: new cards initialize, removed cards tombstoned
- [x] Missing YAML: graceful fallback message
- [x] Session complete with missed/got-it counts + percentage + "Review Again"
- [x] Shuffle reshuffles deck on each click
- [x] Download dropdown: "Print as PDF" + "Anki Deck (.apkg)"
- [x] Code-split via LazyFlashcards (React.lazy + BrowserOnly)

**Accessibility (NFR-04, NFR-05, NFR-08):**

- [x] `prefers-reduced-motion` disables flip animation
- [x] Screen reader: aria-live on card, aria-hidden toggling
- [x] Keyboard navigation: Space (flip front→back only), 1/2 (rate), arrows (navigate)
- [x] Keyboard guards skip INPUT/TEXTAREA/SELECT elements
- [x] Color + text labels + count badges on rating buttons

**Anki export (FR-08):**

- [x] Download dropdown with "Anki Deck (.apkg)" option (manifest lookup)
- [x] SourceURL correct for non-slug lesson (normalizeToDocId path)
- [x] SourceURL correct for slug-override lesson (frontmatter.slug path)
- [x] No double-slash in any generated SourceURL
- [x] Anki option hidden when no manifest entry exists
- [ ] Manual verification: imports into Anki desktop + AnkiDroid without errors

**Error handling (post-review fixes):**

- [x] `writePersistedState` returns boolean, typed catch distinguishes quota vs other
- [x] All 4 empty catch blocks replaced with console.warn/error logging
- [x] Per-file error isolation in `loadAllDecks` (one bad YAML won't kill batch)
- [x] `loadDeckForFile` wraps YAML parse errors with file path context
- [x] `generate-anki-decks.js` validates deck structure before destructuring
- [x] Clipboard API failure handled in FlashcardCard

**Infrastructure (FR-09, FR-12, NFR-01, NFR-02, NFR-07):**

- [x] Remark plugin in `libs/docusaurus/remark-flashcards/` works
- [x] Invalid `.flashcards.yaml` fails the build with file path + error
- [x] `build.sh` has `set -euo pipefail` — delegates to nx dependsOn (no duplicate calls)
- [x] `docusaurus-shared` has project.json (visible to nx dependency graph)
- [x] Node 20 LTS compatible (uses `fs.readdirSync` recursive, not `fs.globSync`)
- [x] CI validates all `.flashcards.yaml` via Zod (lint target dependency)

**Tests (118 total):**

- [x] `useFSRS` hook: 348 lines — hydration, dehydration, scheduling, corruption recovery, concurrent decks (in `useFSRS.test.ts`)
- [x] Component rendering: Flashcards (5), FlashcardCard, RatingButtons (4), ReviewSession (3)
- [x] Validation: 16 tests (Zod schema + lint rules)
- [x] Anki generation: 12 tests (helpers + manifest structure)
- [x] Remark plugin: 7 tests (null/error/valid/multiple/skip paths)
- [x] All tests in existing Vitest setup (`src/__tests__/flashcards/`)

---

## 13. Flashcard Authoring Skill (Phase 1)

### `/flashcard-author` Skill

**Scope**: Generate `.flashcards.yaml` for a lesson, chapter, or part.

**Invocation**:

```
/flashcard-author lesson apps/learn-app/docs/.../01-digital-fte-revolution.md
/flashcard-author chapter 5
/flashcard-author part 2
```

**Behavior**:

1. Read target lesson(s)
2. Extract atomic concepts (definitions, primitives, protocols, commands, constraints)
3. Generate YAML following schema + content guidelines
4. Validate output against Zod schema
5. Write `.flashcards.yaml` files co-located with lessons

**Quality rules** (built into skill):

- No yes/no fronts
- Back ≤ 3 sentences
- 8-20 cards per lesson
- ~40% basic / ~40% intermediate / ~20% advanced
- `why` field on intermediate/advanced architectural cards
- IDs follow `{deck-id}-{nnn}` convention

**Output**: Human reviews generated YAML, commits. AI-generated + human-curated workflow.

---

## 14. Decisions Made

| Decision               | Choice                                                | Rationale                                                                                                                                                                               |
| ---------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary experience     | Embedded web component                                | Zero friction, full UX control, works on mobile web                                                                                                                                     |
| SRS algorithm          | FSRS v6 via `ts-fsrs` v4.x                            | Same as Anki, 99.6% better than SM-2, MIT, TypeScript                                                                                                                                   |
| State storage          | localStorage (epoch ms wire format)                   | Zero server cost, serializable, acceptable loss on clear                                                                                                                                |
| State key              | `flashcards:${deck.id}`                               | Immutable deck.id prevents key instability                                                                                                                                              |
| Anki role              | Secondary in download dropdown, hidden if no manifest | Power users only — "Print as PDF" is the primary download option                                                                                                                        |
| Rating system          | Binary: "Missed It" / "Got It"                        | **Changed from 4-button (Again/Hard/Good/Easy)** — 4 buttons + interval previews confused users. NotebookLM-style binary is simpler. Maps to Rating.Again / Rating.Good under the hood. |
| UX mode                | Unified single mode (no browse/review split)          | **Changed from dual-mode** — separate "Start Review" button was unnecessary friction. Flip → rate → advance.                                                                            |
| Session tracking       | `Map<string, "missed" \| "gotit">` by card ID         | Prevents double-counting if user navigates back and re-rates. Counts derived at render time.                                                                                            |
| Data format            | YAML co-located with lessons                          | Version-controlled, human-reviewable, CI-validatable via Zod                                                                                                                            |
| `why` field            | Optional per card                                     | Elaborative interrogation — deepens encoding                                                                                                                                            |
| Remark plugin          | `libs/docusaurus/remark-flashcards/`                  | Follows existing convention (remark-os-tabs, etc.)                                                                                                                                      |
| Component registration | `MDXComponents.tsx` via `LazyFlashcards`              | Code-split with React.lazy + BrowserOnly for SSR safety                                                                                                                                 |
| Anki library           | `anki-apkg-export`                                    | Pure JS, MIT, supports custom note types + stable GUIDs                                                                                                                                 |
| Shared utilities       | `libs/docusaurus/shared/`                             | DRY extraction: flashcardLoader, normalizeToDocId (was duplicated), siteConfig                                                                                                          |
| Node compatibility     | `fs.readdirSync({ recursive: true })`                 | **Changed from `fs.globSync`** — globSync requires Node 22+; readdirSync recursive works on Node 18.17+ (LTS)                                                                           |
| Build pipeline         | nx `dependsOn` only (not duplicated in build.sh)      | **Changed** — review caught double execution. build.sh delegates to nx.                                                                                                                 |
| Error handling         | Typed catches, per-file isolation                     | **Post-review fix** — replaced 4 empty catch blocks with logging. writePersistedState returns boolean.                                                                                  |
| Deck sharing (Phase 2) | Content link only, NOT progress                       | No server = no cross-device progress sync                                                                                                                                               |
| Invalid YAML at build  | Fail the build (not degrade)                          | Invalid flashcard files are authoring bugs, not runtime                                                                                                                                 |
| `deck.version` role    | Informational only (Phase 0)                          | Console log on change; no migration/reset. Future phases may gate on it                                                                                                                 |
| SourceURL derivation   | frontmatter.slug first, else `normalizeToDocId`       | Config-driven host (`siteConfig.url` + `baseUrl`), matches `chapter-manifest-plugin` precedence                                                                                         |

## 15. How We're Better Than Basic Anki

| Capability                | Basic Anki                    | Our Embedded Experience                     |
| ------------------------- | ----------------------------- | ------------------------------------------- |
| SRS algorithm             | FSRS v6                       | FSRS v6 (identical, running silently)       |
| Zero friction start       | Install app → import → review | Scroll down → flip → rate                   |
| Rating UX                 | Again/Hard/Good/Easy          | "Missed It" / "Got It" (simpler, faster)    |
| Session feedback          | Stats after review            | Running counts + session complete %         |
| Elaborative interrogation | Not built-in                  | "Why?" prompts on complex cards             |
| Context-aware             | Cards isolated from content   | Cards live inside the lesson                |
| Interleaving (Phase 1)    | Manual deck management        | One-click chapter mode                      |
| Theming                   | Anki's UI                     | NotebookLM-inspired, dark/light, responsive |
| Mobile                    | Requires app install          | Works in browser now                        |
| Content updates           | Must re-import .apkg          | Automatic on page load                      |
| Download options          | .apkg only                    | PDF print + .apkg download dropdown         |
| Reduced-motion support    | Limited                       | Full `prefers-reduced-motion` support       |

---

## References

### Learning Science

- [Testing Effect — Karpicke & Roediger (2008)](https://www.science.org/doi/10.1126/science.1152408)
- [FSRS Algorithm — 99.6% superiority over SM-2](https://github.com/open-spaced-repetition/awesome-fsrs)
- [Confidence-Based Repetition — Brainscape](https://www.brainscape.com/academy/confidence-based-repetition-definition/)
- [Interleaving — Retrieval Practice org](https://www.retrievalpractice.org/interleaving)
- [Elaborative Interrogation (2025)](https://www.tandfonline.com/doi/full/10.1080/02702711.2025.2482627)
- [Retrieval Practice for Complex Concepts (2025)](https://www.sciencedirect.com/science/article/pii/S0959475225001434)
- [Desirable Difficulties & Distributed Practice](https://journals.physiology.org/doi/full/10.1152/advan.00173.2025)
- [Spaced Repetition Algorithms Comparison](https://www.brainscape.com/academy/comparing-spaced-repetition-algorithms/)

### Implementation

- [ts-fsrs v4.x — TypeScript FSRS v6](https://github.com/open-spaced-repetition/ts-fsrs)
- [anki-apkg-export](https://www.npmjs.com/package/anki-apkg-export)
- [Open Spaced Repetition project](https://github.com/open-spaced-repetition)

### Existing Infrastructure

- `<Quiz />` — `apps/learn-app/src/components/quiz/Quiz.tsx` (precedent for interactive MDX)
- `MDXComponents.tsx` — `apps/learn-app/src/theme/MDXComponents.tsx` (registration point)
- `libs/docusaurus/remark-*` — existing remark plugin convention
- `vitest.config.ts` — test setup with `@/` alias, jsdom, CSS modules
- `DESIGN_SYSTEM.md` — styling guidelines
