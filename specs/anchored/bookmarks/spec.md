# Bookmarks Feature — Specification

**Status**: Ready for Implementation (Research Complete)
**Date**: 2026-03-03
**Author**: Agent Factory (SDD-RI Methodology)
**Level**: SDD Level 2 (Spec-Anchored)
**Research**: `research/codebase-analysis.md`

---

## 1. Executive Summary

### 1.1 The Problem

Students reading the 85-chapter Agent Factory book need a way to:
- Mark important passages for quick return during study sessions
- Build a personalized index of key concepts across chapters
- Resume reading from specific points after interruptions
- Export their reading highlights for note-taking systems

**Current gap**: No native bookmarking system exists. Students must rely on browser bookmarks (page-level only, not section-level) or manual note-taking.

**Research insight**: Analysis of existing components (Flashcards, VoiceControlDock, Progress) shows clear patterns to copy — reducing implementation risk.

### 1.2 The Solution

A **Local-First bookmarking system** embedded in the Docusaurus learning platform that allows students to:
- Add/remove bookmarks at any section heading (h2) within a lesson
- View all bookmarks in a dedicated dashboard with navigation
- Filter bookmarks by chapter or search terms
- Export bookmarks to Markdown or JSON for external note-taking

**Architecture principle**: Local-first (localStorage) with clean abstraction layer to enable cloud-sync (Supabase/Neon) in a future phase without refactoring.

**Research validation**: Flashcards component already proved localStorage + Zod + hooks pattern works in this codebase.

### 1.3 Business Case

| Factor | Without Bookmarks | With Bookmarks |
|--------|------------------|----------------|
| Study efficiency | Manual scrolling/finding | One-click navigation |
| Retention | Passive reading | Active curation (testing effect) |
| Cross-chapter study | No personal index | Tagged knowledge map |
| Export to notes | Manual copy-paste | One-click study guide |

**Cost**: ~300 lines of React + localStorage wrapper (zero server cost in Phase 0)
**Value**: Improved study workflow, increased time-on-platform, foundation for cloud-sync personalization

**Engagement hook**: "Build your personalized study guide" — export bookmarks as revision document

---

## 2. Learning Science Foundation

### 2.1 Active Curation Effect

Research shows that **active selection** of content (marking, highlighting, curating) improves retention more than passive reading. The act of deciding "this is important enough to bookmark" creates an additional encoding pass.

> "The generation effect demonstrates that information is better remembered when it is actively generated or selected by the learner rather than passively received." — *Nelson & Narens, 1994*

### 2.2 Distributed Practice Navigation

Students using spaced repetition (via our Flashcards feature) need efficient ways to return to source material. Bookmarks serve as **navigation anchors** that reduce friction in the review cycle:

```
Flashcard triggers knowledge gap → Bookmark provides instant return to source → Re-encoding strengthens memory
```

### 2.3 Personal Knowledge Construction

Bookmarks allow students to construct a **personal knowledge graph** across the curriculum. By tagging and organizing bookmarks, students externalize their mental model of how concepts connect.

---

## 3. Scope & Phases

### Phase 0 (MVP — This Specification)

- Bookmark data schema (YAML frontmatter + localStorage persistence)
- React `<Bookmarks />` component with:
  - Add/remove bookmark at current section
  - Bookmark indicator in table of contents
  - Bookmark management panel (view, filter, delete)
  - Search across bookmarked content
- `/bookmarks` dashboard page listing all bookmarks
- Export to Markdown and JSON
- localStorage persistence with cloud-sync abstraction layer
- Zod schema validation for bookmark data

### Phase 1 (Engagement)

- Tagging system (add custom tags to bookmarks)
- Bookmark notes (personal annotations per bookmark)
- Cross-chapter bookmark collections
- "Bookmarks due for review" nudge (integrates with flashcard schedule)

### Phase 2 (Cloud Sync)

- Supabase/Neon backend integration
- User authentication tie-in
- Cross-device sync
- Bookmark sharing (public collections)

### Out of Scope (Permanently)

- Server-side state in Phase 0 (must be localStorage)
- Real-time collaboration on bookmarks
- Social bookmarking (seeing others' bookmarks)
- Browser extension integration

---

## 4. Bookmark Data Schema

### 4.1 Data Model

```typescript
interface Bookmark {
  // Identity
  id: string;                    // UUID v4, immutable
  createdAt: number;             // Epoch ms
  updatedAt: number;             // Epoch ms
  
  // Location (content address)
  lessonSlug: string;            // e.g., "01-digital-fte-revolution"
  chapterId: string;             // e.g., "01-General-Agents-Foundations"
  sectionId: string;             // HTML id of heading (e.g., "#what-is-a-digital-fte")
  sectionTitle: string;          // Human-readable heading text
  lessonTitle: string;           // Cached lesson title (for display if lesson deleted)
  
  // Content snapshot
  contentPreview: string;        // First 200 chars of section content (for search/export)
  
  // User metadata
  tags: string[];                // User-defined tags (Phase 1)
  note: string | null;           // Personal annotation (Phase 1)
  
  // System metadata
  version: number;               // Schema version (for migrations)
}
```

### 4.2 localStorage Wire Format

**Storage key**: `bookmarks:v1`

```typescript
interface BookmarksState {
  schemaVersion: 1;
  bookmarks: Record<string, Bookmark>;  // Keyed by bookmark.id
  lastSyncMs: number | null;            // For Phase 2 cloud sync
}
```

**Example stored value**:
```json
{
  "schemaVersion": 1,
  "bookmarks": {
    "bm_7f3a9c2e1d": {
      "id": "bm_7f3a9c2e1d",
      "createdAt": 1741017600000,
      "updatedAt": 1741017600000,
      "lessonSlug": "01-digital-fte-revolution",
      "chapterId": "01-General-Agents-Foundations",
      "sectionId": "what-is-a-digital-fte",
      "sectionTitle": "What is a Digital FTE?",
      "lessonTitle": "The Digital FTE Revolution",
      "contentPreview": "A Digital FTE (Full-Time Employee) is a role-based AI system that composes tools...",
      "tags": [],
      "note": null,
      "version": 1
    }
  },
  "lastSyncMs": null
}
```

### 4.3 Content Addressing Strategy

**Problem**: Lesson slugs and section IDs may change across book revisions, breaking bookmark links.

**Solution**: Use a **hybrid addressing** approach:

1. **Primary key**: `lessonSlug + sectionId` (fast, human-readable)
2. **Fallback**: Store lesson `frontmatter.id` (immutable UUID in YAML frontmatter)
3. **Reconciliation**: On page load, if bookmark's `lessonSlug` doesn't match, search for lesson with matching `frontmatter.id`

```typescript
// Reconciliation on navigation
function resolveBookmarkLocation(bookmark: Bookmark): ResolvedLocation {
  // Try direct slug match first (fast path)
  const lesson = getLessonBySlug(bookmark.lessonSlug);
  if (lesson) {
    const section = document.getElementById(bookmark.sectionId);
    if (section) return { lesson, section, status: 'resolved' };
  }
  
  // Fallback: search by frontmatter.id (content moved)
  const lessonById = getLessonByFrontmatterId(bookmark.lessonId);
  if (lessonById) {
    // Section may have changed — try to match by title
    const sectionByTitle = findSectionByTitle(lessonById, bookmark.sectionTitle);
    if (sectionByTitle) return { lesson: lessonById, section: sectionByTitle, status: 'relocated' };
  }
  
  return { status: 'orphaned', bookmark };
}
```

### 4.4 Zod Schema Validation

```typescript
import { z } from "zod";

export const BookmarkSchema = z.object({
  id: z.string().regex(/^bm_[a-z0-9]{10}$/, "Invalid bookmark ID format"),
  createdAt: z.number().positive(),
  updatedAt: z.number().positive(),
  lessonSlug: z.string().regex(/^[a-z0-9-]+$/),
  chapterId: z.string().regex(/^[a-z0-9-]+$/),
  sectionId: z.string().regex(/^[a-z0-9-]+$/),
  sectionTitle: z.string().min(1).max(200),
  lessonTitle: z.string().min(1).max(200),
  contentPreview: z.string().max(500),
  tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(10).optional().default([]),
  note: z.string().max(2000).nullable().optional(),
  version: z.number().int().positive().default(1),
  lessonId: z.string().uuid().optional(), // For content addressing fallback
});

export const BookmarksStateSchema = z.object({
  schemaVersion: z.number().int().positive().default(1),
  bookmarks: z.record(BookmarkSchema),
  lastSyncMs: z.number().positive().nullable().optional(),
});
```

---

## 5. Component Architecture

### 5.1 Component Tree

**Research finding**: Copy Flashcards architecture pattern — lazy loading + BrowserOnly for SSR safety.

```
<DocPage>                              // Docusaurus doc page wrapper
│
├── <BookmarkDock />                   // Fixed-position dock (bottom-right)
│   ├── Shows bookmark count badge    // Like VoiceControlDock
│   └── Opens <BookmarkPanel /> on click
│
└── <BookmarkPanel />                  // Slide-out panel
    ├── <BookmarkList />               // List of bookmarks for current lesson
    │   └── <BookmarkItem /> × N       // Individual bookmark with delete action
    │
    ├── <BookmarkSearch />             // Search/filter input
    │
    └── <ExportDropdown />             // Export to Markdown/JSON
```

**Integration approach** (MVP — research-validated):
- **No TOC customization** (too complex for Phase 0)
- **Floating dock** like VoiceControlDock (proven pattern)
- **Per-lesson panel** (like Flashcards component)

### 5.2 Bookmark Dock — Primary Interaction Point

**Placement**: Fixed position, bottom-right corner (above VoiceControlDock if both present)

**States**:
```
Idle (no bookmarks):     [🔖 0]
                         Tooltip: "No bookmarks yet"

Has bookmarks:           [🔖 3]
                         Tooltip: "3 bookmarks in this lesson"

Active (panel open):     [🔖 3] (blue highlight)
                         Click closes panel
```

**Research insight**: VoiceControlDock uses custom CSS class `voice-control-dock`. We'll use `bookmark-dock` with identical positioning logic.

### 5.3 Dashboard Page: `/bookmarks`

**Research finding**: Adapt ProgressDashboard layout — grouped cards, search, export.

```
┌────────────────────────────────────────────────────────────┐
│  My Bookmarks                                 [Export All] │
├────────────────────────────────────────────────────────────┤
│  Search: [________________]  Filter: [All Chapters ▼]     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📁 Chapter 1: General Agents Foundations (8 bookmarks)   │
│  ├─ The 2025 Inflection Point                             │
│  │  └─ "Evidence from Academia" → [View] [Delete]        │
│  ├─ Agent Maturity Model                                  │
│  │  └─ "Incubator Stage" → [View] [Delete]               │
│                                                            │
│  📁 Chapter 2: Agent Workflow Primitives (12 bookmarks)   │
│  ├─ OODA Loop in Agent Design                             │
│  │  └─ "Orient Phase" → [View] [Delete]                  │
│                                                            │
│  ...                                                       │
└────────────────────────────────────────────────────────────┘
```

### 5.4 Component Specifications

#### `<BookmarkDock />`

**Props**: None (uses `useBookmarks` hook internally)

**File**: `src/components/bookmarks/BookmarkDock.tsx`

**Implementation pattern**: Copy `VoiceControlDock/index.tsx` structure
- Fixed position CSS
- Badge with count
- Click handler to toggle panel
- BrowserOnly wrapper for SSR safety

#### `<BookmarkPanel />`

**Props**: `{ isOpen, onClose }`

**File**: `src/components/bookmarks/BookmarkPanel.tsx`

**Features**:
- Slide-out from right (200ms animation)
- Lists current lesson bookmarks
- Search within lesson
- Delete per bookmark
- Export dropdown (lesson-level)
- Close on Escape key
- Focus trap (accessibility)

#### `<BookmarksDashboard />`

**Route**: `/bookmarks`

**File**: `src/pages/bookmarks.tsx`

**Features**:
- All bookmarks grouped by chapter
- Global search
- Chapter filter dropdown
- Export all (Markdown/JSON)
- Bulk delete (Phase 1)

---

## 6. State Management

### 6.1 Custom Hook: `useBookmarks()`

**Research finding**: Copy `useFSRS.ts` pattern from Flashcards — load on mount, save on change, Zod validation.

```typescript
interface UseBookmarksReturn {
  // Queries
  bookmarks: Bookmark[];
  getBookmarkBySection: (sectionId: string) => Bookmark | undefined;
  isBookmarked: (sectionId: string) => boolean;
  getBookmarksByLesson: (lessonSlug: string) => Bookmark[];
  getBookmarksByChapter: (chapterId: string) => Bookmark[];
  searchBookmarks: (query: string) => Bookmark[];

  // Mutations
  addBookmark: (params: AddBookmarkParams) => Promise<Bookmark>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => Promise<void>;

  // Export
  exportBookmarks: (format: 'markdown' | 'json', filter?: BookmarkFilter) => string;

  // State
  isLoading: boolean;
  error: Error | null;
}
```

**File**: `src/hooks/useBookmarks.ts`

### 6.2 localStorage Wire Format

**Research finding**: Flashcards use `flashcards:${deck.id}` key pattern. We'll use `bookmarks:v1` for entire state.

**Storage key**: `bookmarks:v1`

```typescript
interface BookmarksState {
  schemaVersion: 1;
  bookmarks: Record<string, Bookmark>;  // Keyed by bookmark.id
  lastSyncMs: number | null;            // For Phase 2 cloud sync
}
```

**Example stored value**:
```json
{
  "schemaVersion": 1,
  "bookmarks": {
    "bm_7f3a9c2e1d": {
      "id": "bm_7f3a9c2e1d",
      "createdAt": 1741017600000,
      "updatedAt": 1741017600000,
      "lessonSlug": "01-the-2025-inflection-point",
      "chapterId": "01-General-Agents-Foundations",
      "sectionId": "evidence-from-academia",
      "sectionTitle": "Evidence from Academia",
      "lessonTitle": "The 2025 Inflection Point",
      "contentPreview": "The ICPC competition results showed AI achieving perfect scores...",
      "tags": [],
      "note": null,
      "version": 1
    }
  },
  "lastSyncMs": null
}
```

### 6.3 Content Addressing Strategy

**Research finding**: Docusaurus auto-generates heading IDs from markdown headings.

```markdown
## Evidence from Academia
→ becomes id="evidence-from-academia"

### The ICPC Competition
→ becomes id="the-icpc-competition"
```

**Hybrid addressing** (validated by research):

1. **Primary key**: `lessonSlug + sectionId` (fast, human-readable)
2. **Fallback**: Store `sectionTitle` for reconciliation
3. **Reconciliation**: On page load, if sectionId doesn't match, search by `sectionTitle`

```typescript
// Reconciliation on navigation
function resolveBookmarkLocation(bookmark: Bookmark): ResolvedLocation {
  // Try direct slug match first (fast path)
  const lesson = getLessonBySlug(bookmark.lessonSlug);
  if (lesson) {
    const section = document.getElementById(bookmark.sectionId);
    if (section) return { lesson, section, status: 'resolved' };
  }
  
  // Fallback: search by section title (content moved)
  const sectionByTitle = findSectionByTitle(lesson, bookmark.sectionTitle);
  if (sectionByTitle) return { lesson, section: sectionByTitle, status: 'relocated' };
  
  return { status: 'orphaned', bookmark };
}
```

### 6.4 localStorage Codec

```typescript
// utils/bookmarks/storage.ts

const STORAGE_KEY = 'bookmarks:v1';

export function loadBookmarks(): BookmarksState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { schemaVersion: 1, bookmarks: {} };

    const parsed = JSON.parse(raw);
    return BookmarksStateSchema.parse(parsed);
  } catch (error) {
    console.error('Failed to load bookmarks:', error);
    return { schemaVersion: 1, bookmarks: {} };
  }
}

export function saveBookmarks(state: BookmarksState): void {
  try {
    BookmarksStateSchema.parse(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save bookmarks:', error);
    throw new Error('Failed to save bookmarks');
  }
}

export function clearBookmarks(): void {
  localStorage.removeItem(STORAGE_KEY);
}
```

### 6.5 Cloud-Sync Abstraction Layer

**Research finding**: Flashcards don't have this — we're adding it for Phase 2 readiness.

```typescript
// utils/bookmarks/storage-adapter.ts

export interface BookmarkStorageAdapter {
  load(): Promise<BookmarksState>;
  save(state: BookmarksState): Promise<void>;
  sync?(): Promise<void>;  // For cloud sync in Phase 2
}

export class LocalStorageAdapter implements BookmarkStorageAdapter {
  async load(): Promise<BookmarksState> {
    return loadBookmarks();
  }

  async save(state: BookmarksState): Promise<void> {
    saveBookmarks(state);
  }
}

// Future: SupabaseAdapter implements BookmarkStorageAdapter with cloud sync
```

**Hook uses adapter**:
```typescript
// hooks/useBookmarks.ts
const adapter = new LocalStorageAdapter();

export function useBookmarks(): UseBookmarksReturn {
  // All storage calls use adapter.load() / adapter.save()
}
```

// Future: SupabaseAdapter implements BookmarkStorageAdapter with cloud sync
```

**Hook uses adapter**:
```typescript
// hooks/useBookmarks.ts

const adapter = new LocalStorageAdapter();

export function useBookmarks(): UseBookmarksReturn {
  // All storage calls use adapter.load() / adapter.save()
}
```

---

## 7. UI/UX Specifications

### 7.1 Visual Design

**Icon**: Bookmark icon from Lucide React (`lucide-react`'s `<Bookmark />` or `<BookmarkCheck />`).

**Colors** (Tailwind):
- Bookmarked: `text-yellow-500 dark:text-yellow-400`
- Hover: `text-yellow-600 dark:text-yellow-300`
- Dock badge: `bg-blue-600`

**Animations**:
- Add bookmark: Icon fills with scale animation (150ms ease-out)
- Remove bookmark: Icon fades to outline (150ms ease-in)
- Panel slide: 200ms ease-in-out

### 7.2 Interaction Patterns

**Add bookmark**:
1. Click bookmark icon near heading
2. Icon animates to filled state
3. Toast notification: "Bookmark added: [section title]"
4. Dock badge updates

**Remove bookmark**:
1. Click filled bookmark icon OR delete from panel
2. Confirmation dialog (if bookmark has tags/notes): "This bookmark has tags. Remove anyway?"
3. Icon animates to outline state
4. Toast: "Bookmark removed"

**Navigate to bookmark**:
1. Click bookmark in panel/dashboard
2. Smooth scroll to section (or navigate to lesson + scroll)
3. Brief highlight flash on section (yellow background, 1s fade)

### 7.3 Accessibility

- All interactive elements: `aria-label`, keyboard accessible (Enter/Space)
- Icon states: `aria-pressed` for toggle
- Panel: `role="dialog"`, `aria-modal="true"`, focus trap
- Dashboard: Proper heading hierarchy, skip links
- Screen reader announcements for add/remove actions

---

## 8. Implementation Approach

### 8.1 File Structure

**Research finding**: Match Flashcards component structure for consistency.

```
apps/learn-app/
├── src/
│   ├── components/
│   │   └── bookmarks/
│   │       ├── BookmarkDock.tsx       ← Like VoiceControlDock
│   │       ├── BookmarkPanel.tsx      ← Like Flashcards panel
│   │       ├── BookmarkList.tsx
│   │       ├── BookmarkItem.tsx
│   │       ├── BookmarkSearch.tsx
│   │       ├── ExportDropdown.tsx
│   │       └── index.ts
│   │
│   ├── pages/
│   │   └── bookmarks.tsx              # Dashboard page (like ProgressDashboard)
│   │
│   ├── hooks/
│   │   └── useBookmarks.ts            # Like useFSRS
│   │
│   ├── utils/
│   │   └── bookmarks/
│   │       ├── storage.ts             # localStorage codec
│   │       ├── storage-adapter.ts     # Cloud-sync abstraction
│   │       ├── export.ts              # Markdown/JSON export
│   │       └── validation.ts          # Zod schemas
│   │
│   └── types/
│       └── bookmarks.ts               # TypeScript interfaces
```

### 8.2 Integration Points

**Research validated** — no theme customization needed for MVP:

| Integration | How | Complexity |
|-------------|-----|------------|
| **SSR Safety** | `BrowserOnly` wrapper (like LazyFlashcards) | Low |
| **Dock Position** | Fixed CSS (like VoiceControlDock) | Low |
| **Dashboard** | New page at `/bookmarks` | Low |
| **localStorage** | `bookmarks:v1` key (like Flashcards) | Low |
| **Zod Validation** | Copy schema.ts pattern | Low |

### 8.3 Phased Implementation

**Research insight**: MVP scope reduced from 3-4 days to 1-2 days by copying existing patterns.

**Week 1 (MVP — 1-2 days)**:
- Day 1: Core infrastructure (types, storage, hook) + Dock component
- Day 2: Panel component + Dashboard page + Export
- Day 3: Testing + polish

**Phase 1 (Engagement)**:
- Tagging system
- Bookmark notes
- Cross-chapter collections

**Phase 2 (Cloud Sync)**:
- Supabase/Neon backend
- User authentication
- Cross-device sync

---

## 9. Testing Strategy

### 9.1 Unit Tests

```typescript
// __tests__/bookmarks/useBookmarks.test.ts
describe('useBookmarks', () => {
  it('should add a bookmark and persist to localStorage', () => {});
  it('should remove a bookmark', () => {});
  it('should return isBookmarked for current section', () => {});
  it('should search bookmarks by content', () => {});
});

// __tests__/bookmarks/storage.test.ts
describe('LocalStorageAdapter', () => {
  it('should load empty state when no data exists', () => {});
  it('should save and load bookmarks', () => {});
  it('should handle corrupted data gracefully', () => {});
});
```

### 9.2 Component Tests

```typescript
// __tests__/bookmarks/BookmarkIndicator.test.tsx
describe('BookmarkIndicator', () => {
  it('should show outline icon when not bookmarked', () => {});
  it('should show filled icon when bookmarked', () => {});
  it('should call addBookmark on click', () => {});
  it('should call removeBookmark on click when bookmarked', () => {});
});
```

### 9.3 Integration Tests

```typescript
// __tests__/bookmarks/bookmarks-flow.test.tsx
describe('Bookmarks flow', () => {
  it('should complete full bookmark lifecycle', () => {
    // 1. Navigate to lesson
    // 2. Add bookmark
    // 3. Verify in panel
    // 4. Navigate away and back
    // 5. Verify bookmark persists
    // 6. Remove bookmark
    // 7. Verify removal
  });
});
```

### 9.4 Test Coverage Target

- Hooks: 90%+
- Components: 80%+
- Utils: 100%
- E2E: Critical paths only

---

## 10. Success Criteria

### Functional

- [ ] User can add bookmark from any lesson section
- [ ] User can remove bookmark from indicator or panel
- [ ] Bookmarks persist across page reloads (localStorage)
- [ ] Dashboard shows all bookmarks grouped by chapter
- [ ] Search filters bookmarks by section title and content preview
- [ ] Export generates valid Markdown and JSON files
- [ ] Navigation from bookmark scrolls to correct section

### Non-Functional

- [ ] localStorage operations complete in <50ms
- [ ] No console errors during normal operation
- [ ] Accessible: passes axe-core audit
- [ ] Responsive: works on mobile (320px+)
- [ ] TypeScript: no `any` types, strict mode compliant

### Quality

- [ ] Unit test coverage >85%
- [ ] Component test coverage >80%
- [ ] Zod validation catches all invalid states
- [ ] Error boundaries handle edge cases gracefully

---

## 11. Constraints

### Technical

- **NO server-side state** in Phase 0 (localStorage only)
- **NO new npm dependencies** (use existing: Zod, Lucide, Tailwind)
- **Must be SSR-safe** (Docusaurus requirement — use `BrowserOnly` or `useEffect`)
- **Must support dark mode** (Tailwind `dark:` classes)
- **Must be TypeScript strict mode** (no `any`, proper types)

### Architectural

- **Cloud-sync abstraction required** (adapter pattern for Phase 2)
- **Content addressing must handle lesson moves** (reconciliation logic)
- **No breaking changes to localStorage format** (schema versioning for migrations)

### UX

- **No modal overload** (use toast notifications, not alerts)
- **No layout shift** (dock/panel must not push content)
- **No performance degradation** (lazy load dashboard, virtualize long lists)

---

## 12. Open Questions

| Question | Impact | Decision Needed By |
|----------|--------|-------------------|
| Should bookmarks support nested sections (h3, h4) or only h2? | Scope of bookmarkable content | Phase 0 |
| Should export include lesson context (chapter title, lesson number)? | Export format design | Phase 0 |
| Should there be a max bookmark limit per lesson? | Edge case handling | Phase 1 |
| Should bookmarks sync with browser history API? | Navigation behavior | Phase 1 |

---

## 13. Appendix

### 13.1 Related Features

- **Flashcards** (`specs/anchored/flashcards/spec.md`): Similar localStorage pattern, FSRS scheduling
- **Learner Profile** (`specs/anchored/learner-profile/`): localStorage persistence, Zod validation
- **Progress Tracking** (`src/components/progress/`): XP, badges, similar dashboard patterns

### 13.2 Reference Implementations

- **MDN Web Docs**: Simple bookmark/highlight system
- **O'Reilly Learning**: Section-level bookmarks with notes
- **Cursor IDE**: Local-first with cloud-sync architecture

### 13.3 Glossary

| Term | Definition |
|------|------------|
| **Content Addressing** | Identifying content by its intrinsic properties (slug + section ID) rather than database ID |
| **Local-First** | Data stored on client device; cloud is optional sync layer |
| **Schema Version** | Integer tracking data format for migration purposes |
| **Reconciliation** | Process of resolving bookmark locations after content changes |

---

## 14. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-03-03 | Agent Factory | Initial specification draft |
