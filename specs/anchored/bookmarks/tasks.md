# Bookmarks Feature — Task Breakdown

**Spec**: `specs/anchored/bookmarks/spec.md`
**Plan**: `specs/anchored/bookmarks/plan.md`
**Research**: `research/codebase-analysis.md`
**Status**: Ready for Implementation
**Total Tasks**: 10 (phased: 0-3)
**Estimated Effort**: 1-2 days (10-12 hours)

---

## Research-Validated Changes from Original

| Change | Rationale |
|--------|-----------|
| **Removed Task 4 (BookmarkIndicator)** | Research: "No TOC/inline indicators for MVP — use floating dock only" |
| **Consolidated 13 → 10 tasks** | Plan: Tighter grouping, tests combined into single task |
| **Reduced 3-4 days → 1-2 days** | Research: All patterns exist (Flashcards, VoiceControlDock, Progress) |
| **Added Task 3.1 (Integration)** | Explicit wiring step for Docusaurus integration |
| **Updated file paths** | Using `apps/learn-app/src/` (verified from codebase) |

---

## Task List by Phase

### Phase 0: Foundation (2-3 hours)

#### Task 0.1: TypeScript Types & Zod Schemas
**Priority**: P0 (Foundation)
**Estimated Time**: 45 minutes
**Files to Create**:
- `apps/learn-app/src/types/bookmarks.ts`
- `apps/learn-app/src/utils/bookmarks/validation.ts`

**Implementation Notes**: Copy `apps/learn-app/src/components/flashcards/schema.ts` pattern

**Acceptance Criteria**:
- [ ] `Bookmark` interface with all fields from spec (id, lessonSlug, sectionId, etc.)
- [ ] `BookmarksState` interface defined
- [ ] `BookmarkSchema` with regex validation (ID format: `^bm_[a-z0-9]{10}$`)
- [ ] `BookmarksStateSchema` with nested validation
- [ ] Types compile with no errors
- [ ] Test: valid bookmark passes validation
- [ ] Test: invalid ID format fails validation

**Dependencies**: None

---

#### Task 0.2: localStorage Adapter
**Priority**: P0 (Foundation)
**Estimated Time**: 45 minutes
**Files to Create**:
- `apps/learn-app/src/utils/bookmarks/storage.ts`
- `apps/learn-app/src/utils/bookmarks/storage-adapter.ts`

**Implementation Notes**: Copy Flashcards localStorage pattern + add adapter interface

**Acceptance Criteria**:
- [ ] `BookmarkStorageAdapter` interface defined (load, save, sync?)
- [ ] `LocalStorageAdapter` class implements interface
- [ ] `loadBookmarks()` returns empty state when no data
- [ ] `loadBookmarks()` handles corrupted JSON gracefully
- [ ] `saveBookmarks()` validates with Zod before saving
- [ ] Storage key: `bookmarks:v1`
- [ ] Adapter pattern allows future SupabaseAdapter swap-in

**Dependencies**: Task 0.1

---

#### Task 0.3: useBookmarks Hook
**Priority**: P0 (Foundation)
**Estimated Time**: 1.5 hours
**Files to Create**:
- `apps/learn-app/src/hooks/useBookmarks.ts`

**Implementation Notes**: Copy `apps/learn-app/src/components/flashcards/useFSRS.ts` pattern

**Acceptance Criteria**:
- [ ] Hook loads from localStorage on mount
- [ ] Hook saves to localStorage on change
- [ ] `addBookmark()` creates new bookmark with UUID
- [ ] `removeBookmark()` deletes bookmark by ID
- [ ] `isBookmarked(sectionId)` returns boolean
- [ ] `getBookmarksByLesson(lessonSlug)` returns filtered array
- [ ] `searchBookmarks(query)` filters by title/content
- [ ] `isLoading` state exposed
- [ ] `error` state exposed
- [ ] Uses adapter pattern (not direct localStorage calls)

**Dependencies**: Task 0.1, Task 0.2

---

### Phase 1: UI Components (4-5 hours)

#### Task 1.1: BookmarkDock Component
**Priority**: P0 (Core UX)
**Estimated Time**: 1.5 hours
**Files to Create**:
- `apps/learn-app/src/components/bookmarks/BookmarkDock.tsx`
- `apps/learn-app/src/components/bookmarks/BookmarkDock.module.css`
- `apps/learn-app/src/components/bookmarks/index.ts`

**Implementation Notes**: Copy `apps/learn-app/src/components/VoiceControlDock/index.tsx` pattern

**Acceptance Criteria**:
- [ ] Fixed position, bottom-right (CSS like VoiceControlDock)
- [ ] Shows bookmark icon (Lucide React)
- [ ] Badge shows count for current lesson
- [ ] Tooltip: "X bookmarks in this lesson"
- [ ] Click opens BookmarkPanel
- [ ] Hover animation (translateY, box-shadow)
- [ ] SSR-safe (BrowserOnly wrapper)
- [ ] Dark mode compatible

**Dependencies**: Task 0.3

---

#### Task 1.2: BookmarkPanel Component
**Priority**: P0 (Core UX)
**Estimated Time**: 2 hours
**Files to Create**:
- `apps/learn-app/src/components/bookmarks/BookmarkPanel.tsx`
- `apps/learn-app/src/components/bookmarks/BookmarkPanel.module.css`
- `apps/learn-app/src/components/bookmarks/BookmarkList.tsx`
- `apps/learn-app/src/components/bookmarks/BookmarkItem.tsx`

**Implementation Notes**: Slide-out panel like Flashcards review panel

**Acceptance Criteria**:
- [ ] Slide-out from right (200ms animation)
- [ ] Overlay closes on click
- [ ] Header with title + close button
- [ ] Lists bookmarks for current lesson
- [ ] Delete button per bookmark
- [ ] Close on Escape key
- [ ] Focus trap when open (accessibility)
- [ ] role="dialog", aria-modal="true"

**Dependencies**: Task 0.3

---

#### Task 1.3: BookmarkSearch Component
**Priority**: P1 (UX Enhancement)
**Estimated Time**: 45 minutes
**Files to Create**:
- `apps/learn-app/src/components/bookmarks/BookmarkSearch.tsx`

**Acceptance Criteria**:
- [ ] Search input field
- [ ] Filters bookmarks by section title
- [ ] Filters by content preview
- [ ] Real-time search (onChange)
- [ ] Empty state when no results

**Dependencies**: Task 0.3

---

#### Task 1.4: ExportDropdown Component
**Priority**: P1 (Core Feature)
**Estimated Time**: 45 minutes
**Files to Create**:
- `apps/learn-app/src/components/bookmarks/ExportDropdown.tsx`
- `apps/learn-app/src/utils/bookmarks/export.ts`

**Implementation Notes**: Markdown export like study guide format

**Acceptance Criteria**:
- [ ] `exportToMarkdown(bookmarks)` function
- [ ] `exportToJson(bookmarks)` function
- [ ] Markdown includes chapter/lesson headers
- [ ] Markdown includes section title + content preview
- [ ] File download triggered (blob + anchor element)
- [ ] Filename includes date (e.g., `bookmarks-2026-03-03.md`)
- [ ] Dropdown UI with export options

**Dependencies**: Task 0.1

---

### Phase 2: Dashboard Page (2-3 hours)

#### Task 2.1: /bookmarks Dashboard
**Priority**: P0 (Core Feature)
**Estimated Time**: 2-3 hours
**Files to Create**:
- `apps/learn-app/src/pages/bookmarks.tsx`
- `apps/learn-app/src/pages/bookmarks.module.css`

**Implementation Notes**: Copy `apps/learn-app/src/components/progress/ProgressDashboard.tsx` layout

**Acceptance Criteria**:
- [ ] Route accessible at `/bookmarks`
- [ ] Shows all bookmarks grouped by chapter
- [ ] Global search across all bookmarks
- [ ] Chapter filter dropdown (Phase 1+)
- [ ] "Export All" button (Markdown)
- [ ] Empty state when no bookmarks
- [ ] Responsive layout (mobile-friendly)
- [ ] Uses Docusaurus Layout wrapper

**Dependencies**: Task 0.3

---

### Phase 3: Integration & Testing (2-3 hours)

#### Task 3.1: Docusaurus Integration
**Priority**: P0 (Integration)
**Estimated Time**: 1 hour
**Files to Modify**:
- `apps/learn-app/src/theme/DocItem/Layout/index.tsx` (or create wrapper)

**Implementation Notes**: Use BrowserOnly wrapper like LazyFlashcards

**Acceptance Criteria**:
- [ ] BookmarkDock appears on all doc pages
- [ ] No SSR errors (console clean)
- [ ] Panel opens/closes correctly
- [ ] Dock doesn't appear on `/bookmarks` page (optional)

**Dependencies**: Task 1.1, Task 1.2

---

#### Task 3.2: Tests
**Priority**: P0 (Quality)
**Estimated Time**: 1.5 hours
**Files to Create**:
- `apps/learn-app/src/__tests__/bookmarks/useBookmarks.test.ts`
- `apps/learn-app/src/__tests__/bookmarks/storage.test.ts`
- `apps/learn-app/src/__tests__/bookmarks/BookmarkDock.test.tsx`
- `apps/learn-app/src/__tests__/bookmarks/BookmarkPanel.test.tsx`

**Acceptance Criteria**:
- [ ] useBookmarks hook tests (add, remove, search)
- [ ] LocalStorageAdapter tests (load, save, error handling)
- [ ] BookmarkDock tests (render, badge count, click)
- [ ] BookmarkPanel tests (render, delete, close on Escape)
- [ ] Test coverage >80%
- [ ] All tests pass (`pnpm nx test learn-app`)

**Dependencies**: Task 0.3, Task 1.1, Task 1.2

---

## Task Dependencies Graph

```
Task 0.1 (Types/Schemas)
    ↓
Task 0.2 (Storage Adapter)
    ↓
Task 0.3 (useBookmarks Hook)
    ├─→ Task 1.1 (BookmarkDock) ──→ Task 3.1 (Integration)
    ├─→ Task 1.2 (BookmarkPanel) ──┘
    ├─→ Task 1.3 (BookmarkSearch)
    ├─→ Task 1.4 (ExportDropdown)
    └─→ Task 2.1 (Dashboard Page)

All Implementation Tasks ──→ Task 3.2 (Tests)
```

---

## Implementation Order (Recommended)

### Day 1: Foundation + Core UI (5-6 hours)
1. **Task 0.1**: Types & Schemas (45 min)
2. **Task 0.2**: Storage Adapter (45 min)
3. **Task 0.3**: useBookmarks Hook (1.5h)
4. **Task 1.1**: BookmarkDock (1.5h)
5. **Task 1.2**: BookmarkPanel (2h)

### Day 2: Complete UI + Integration (5-6 hours)
6. **Task 1.3**: BookmarkSearch (45 min)
7. **Task 1.4**: ExportDropdown (45 min)
8. **Task 2.1**: Dashboard Page (2-3h)
9. **Task 3.1**: Docusaurus Integration (1h)
10. **Task 3.2**: Tests (1.5h)

**Total**: 10-12 hours (1-2 days)

---

## Removed from Original tasks.md

| Original Task | Reason for Removal |
|---------------|-------------------|
| Task 4: BookmarkIndicator | Research: "No inline/TOC indicators for MVP" |
| Task 9-11: Separate test tasks | Consolidated into Task 3.2 |
| Task 12: Accessibility Audit | Built into component acceptance criteria |
| Task 13: Documentation | JSDoc added during implementation |

---

## Definition of Done (Per Task)

- [ ] Code implemented per spec and plan
- [ ] TypeScript compiles with no errors
- [ ] Component renders without console warnings
- [ ] Follows existing code style (prettier, eslint)
- [ ] Dark mode compatible (if UI component)
- [ ] SSR-safe (BrowserOnly wrapper where needed)

---

## Definition of Done (Feature)

- [ ] All 10 tasks complete
- [ ] Tests passing (`pnpm nx test learn-app`)
- [ ] No TypeScript errors (`pnpm nx lint learn-app`)
- [ ] Manual testing completed (desktop + mobile)
- [ ] progress.md updated with completion date
- [ ] Spec updated with any implementation changes

---

## Path Verification

**Verified from codebase** (`apps/learn-app/src/`):
- ✅ `components/` directory exists
- ✅ `hooks/` directory exists (has `useCredits.ts`, `useUserDisplayName.ts`)
- ✅ `pages/` directory exists (Docusaurus convention)
- ✅ `utils/` directory exists
- ✅ `types/` directory exists
- ✅ `__tests__/` directory exists

**File path format**: `apps/learn-app/src/components/bookmarks/...`

---

**Last Updated**: 2026-03-03 (aligned with plan.md and research)
