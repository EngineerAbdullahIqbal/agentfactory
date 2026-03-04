---
name: bookmarks-implementation
description: >-
  Complete Bookmarks feature implementation for Docusaurus learning platform.
  Use when: (1) implementing any task from specs/anchored/bookmarks/, (2) creating
  TypeScript types/Zod schemas for bookmarks, (3) building localStorage adapters
  with cloud-sync abstraction, (4) creating React components (BookmarkDock,
  BookmarkPanel, Dashboard), (5) writing tests, or (6) integrating bookmarks
  into Docusaurus. Executes ALL tasks from plan.md following research-validated
  patterns from Flashcards, VoiceControlDock, and ProgressDashboard components.
  Local-first (localStorage) with cloud-sync ready architecture.
license: MIT
metadata:
  author: Agent Factory
  version: "1.0.0"
  spec_version: "2026-03-03"
---

# Bookmarks Implementation Skill

Complete implementation skill for the Bookmarks feature — a local-first bookmarking system for the Agent Factory Docusaurus learning platform.

## When to Use

Use this skill when:
- Implementing any task from `specs/anchored/bookmarks/tasks.md` or `plan.md`
- Creating TypeScript types and Zod schemas for bookmark data
- Building localStorage adapters with cloud-sync abstraction layer
- Creating React components (BookmarkDock, BookmarkPanel, BookmarkList, etc.)
- Writing the `useBookmarks` hook
- Building the `/bookmarks` dashboard page
- Creating tests (unit, component, integration)
- Integrating bookmarks into Docusaurus theme
- Exporting bookmarks to Markdown/JSON formats

## Quick Start

```bash
# 1. Read the spec first
read_file specs/anchored/bookmarks/spec.md

# 2. Read the implementation plan
read_file specs/anchored/bookmarks/plan.md

# 3. Read research findings
read_file specs/anchored/bookmarks/research/codebase-analysis.md

# 4. Start with Task 0.1 (Types + Schemas)
# Say: "Implement Task 0.1 from bookmarks plan"
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Bookmarks Feature                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐     ┌──────────────┐                 │
│  │ BookmarkDock │────▶│ BookmarkPanel│                 │
│  │ (floating)   │     │ (slide-out)  │                 │
│  └──────────────┘     └──────────────┘                 │
│                            │                             │
│                            ▼                             │
│                     ┌──────────────┐                    │
│                     │useBookmarks  │                    │
│                     │    Hook      │                    │
│                     └──────────────┘                    │
│                            │                             │
│              ┌─────────────┴─────────────┐              │
│              ▼                           ▼              │
│     ┌──────────────────┐        ┌──────────────────┐   │
│     │ Storage Adapter  │        │  Export Utils    │   │
│     │  (localStorage)  │        │ (MD/JSON)        │   │
│     └──────────────────┘        └──────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Implementation Tasks

### Phase 0: Foundation (2-3 hours)

#### Task 0.1: TypeScript Types + Zod Schemas
**Files**: 
- `apps/learn-app/src/types/bookmarks.ts`
- `apps/learn-app/src/utils/bookmarks/validation.ts`

**Pattern**: Copy `apps/learn-app/src/components/flashcards/schema.ts`

**Implementation**:
```typescript
// apps/learn-app/src/types/bookmarks.ts
export interface Bookmark {
  id: string;                    // Format: "bm_{10 alphanumeric}"
  createdAt: number;             // Epoch milliseconds
  updatedAt: number;             // Epoch milliseconds
  lessonSlug: string;            // e.g., "01-the-2025-inflection-point"
  chapterId: string;             // e.g., "01-General-Agents-Foundations"
  sectionId: string;             // e.g., "evidence-from-academia"
  sectionTitle: string;          // Human-readable heading
  lessonTitle: string;           // Cached for display
  contentPreview: string;        // First 200 chars of section
  tags: string[];                // Phase 1: user-defined
  note: string | null;           // Phase 1: personal annotation
  version: number;               // Schema version
}

export interface BookmarksState {
  schemaVersion: number;
  bookmarks: Record<string, Bookmark>;
  lastSyncMs: number | null;     // For Phase 2 cloud sync
}

export interface AddBookmarkParams {
  lessonSlug: string;
  chapterId: string;
  sectionId: string;
  sectionTitle: string;
  lessonTitle: string;
  contentPreview: string;
}
```

```typescript
// apps/learn-app/src/utils/bookmarks/validation.ts
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
  tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(10).default([]),
  note: z.string().max(2000).nullable().default(null),
  version: z.number().int().positive().default(1),
});

export const BookmarksStateSchema = z.object({
  schemaVersion: z.number().int().positive().default(1),
  bookmarks: z.record(BookmarkSchema),
  lastSyncMs: z.number().positive().nullable().optional(),
});
```

**Validation**:
```bash
cd apps/learn-app && npx tsc --noEmit
```

---

#### Task 0.2: localStorage Adapter
**Files**:
- `apps/learn-app/src/utils/bookmarks/storage.ts`
- `apps/learn-app/src/utils/bookmarks/storage-adapter.ts`

**Pattern**: Copy `apps/learn-app/src/components/flashcards/useFSRS.ts` storage logic

**Implementation**:
```typescript
// apps/learn-app/src/utils/bookmarks/storage.ts
import { BookmarksState, BookmarksStateSchema } from './validation';

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

```typescript
// apps/learn-app/src/utils/bookmarks/storage-adapter.ts
import { BookmarksState } from './validation';
import { loadBookmarks, saveBookmarks } from './storage';

export interface BookmarkStorageAdapter {
  load(): Promise<BookmarksState>;
  save(state: BookmarksState): Promise<void>;
  sync?(): Promise<void>;  // Phase 2: cloud sync
}

export class LocalStorageAdapter implements BookmarkStorageAdapter {
  async load(): Promise<BookmarksState> {
    return loadBookmarks();
  }
  
  async save(state: BookmarksState): Promise<void> {
    saveBookmarks(state);
  }
}
```

---

#### Task 0.3: useBookmarks Hook
**File**: `apps/learn-app/src/hooks/useBookmarks.ts`

**Pattern**: Copy `apps/learn-app/src/components/flashcards/useFSRS.ts` structure

**Implementation**: See `references/useBookmarks-template.ts`

---

### Phase 1: UI Components (4-5 hours)

#### Task 1.1: BookmarkDock Component
**Files**:
- `apps/learn-app/src/components/bookmarks/BookmarkDock.tsx`
- `apps/learn-app/src/components/bookmarks/BookmarkDock.module.css`

**Pattern**: Copy `apps/learn-app/src/components/VoiceControlDock/index.tsx`

**Key Points**:
- Fixed position: `bottom: 20px; right: 20px;`
- Badge shows bookmark count
- Click opens BookmarkPanel
- Use Lucide React `Bookmark` icon
- SSR-safe with BrowserOnly wrapper

---

#### Task 1.2: BookmarkPanel Component
**Files**:
- `apps/learn-app/src/components/bookmarks/BookmarkPanel.tsx`
- `apps/learn-app/src/components/bookmarks/BookmarkPanel.module.css`
- `apps/learn-app/src/components/bookmarks/BookmarkList.tsx`
- `apps/learn-app/src/components/bookmarks/BookmarkItem.tsx`

**Pattern**: Slide-out panel like Flashcards review panel

**Key Points**:
- Slide-out animation: 200ms ease-in-out
- Focus trap for accessibility
- Close on Escape key
- role="dialog", aria-modal="true"
- Delete button per bookmark

---

#### Task 1.3: BookmarkSearch Component
**File**: `apps/learn-app/src/components/bookmarks/BookmarkSearch.tsx`

**Implementation**: Simple search input with real-time filtering

---

#### Task 1.4: ExportDropdown Component
**Files**:
- `apps/learn-app/src/components/bookmarks/ExportDropdown.tsx`
- `apps/learn-app/src/utils/bookmarks/export.ts`

**Implementation**: See `references/export-utils.ts`

---

### Phase 2: Dashboard Page (2-3 hours)

#### Task 2.1: /bookmarks Dashboard
**Files**:
- `apps/learn-app/src/pages/bookmarks.tsx`
- `apps/learn-app/src/pages/bookmarks.module.css`

**Pattern**: Copy `apps/learn-app/src/components/progress/ProgressDashboard.tsx` layout

**Key Points**:
- Group by chapter → lesson
- Global search
- Export All button (Markdown)
- Empty state when no bookmarks
- Uses Docusaurus Layout wrapper

---

### Phase 3: Integration & Testing (2-3 hours)

#### Task 3.1: Docusaurus Integration
**File**: Modify `apps/learn-app/src/theme/DocItem/Layout/index.tsx`

**Implementation**:
```typescript
import { BrowserOnly } from '@docusaurus/core';
import { BookmarkDock } from '@/components/bookmarks/BookmarkDock';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <BrowserOnly>
        {() => <BookmarkDock />}
      </BrowserOnly>
    </>
  );
}
```

---

#### Task 3.2: Tests
**Files**:
- `apps/learn-app/src/__tests__/bookmarks/useBookmarks.test.ts`
- `apps/learn-app/src/__tests__/bookmarks/storage.test.ts`
- `apps/learn-app/src/__tests__/bookmarks/BookmarkDock.test.tsx`
- `apps/learn-app/src/__tests__/bookmarks/BookmarkPanel.test.tsx`

**Pattern**: Copy existing test patterns from `src/__tests__/flashcards/`

---

## Codebase Conventions

### File Paths
- ✅ CORRECT: `apps/learn-app/src/components/bookmarks/`
- ❌ WRONG: `src/components/bookmarks/`

### Imports
```typescript
// ✅ Use @/ alias
import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark } from '@/types/bookmarks';

// ✅ Docusaurus packages
import Link from '@docusaurus/Link';
import { BrowserOnly } from '@docusaurus/core';

// ✅ Third-party
import { Bookmark, X } from 'lucide-react';
import { z } from 'zod';
```

### TypeScript Strict Mode
- No `any` types
- Explicit return types on functions
- Typed event handlers
- Component props interfaces

### CSS + Tailwind
```typescript
// ✅ Tailwind for layout
<div className="flex items-center gap-2 p-4">

// ✅ CSS modules for component styles
import styles from './BookmarkPanel.module.css';
<div className={styles.panel}>

// ✅ Dark mode
<div className="bg-white dark:bg-gray-800">
```

### SSR Safety
```typescript
// ✅ BrowserOnly wrapper
<BrowserOnly fallback={<div>Loading...</div>}>
  {() => {
    const Component = require('./Component').default;
    return <Component />;
  }}
</BrowserOnly>

// ✅ useEffect for client-side
useEffect(() => {
  localStorage.getItem('bookmarks:v1');
}, []);
```

---

## Validation Commands

After implementing each task:

```bash
# TypeScript compilation
cd apps/learn-app && npx tsc --noEmit

# Linting
cd apps/learn-app && pnpm nx lint learn-app

# Tests (once created)
cd apps/learn-app && pnpm nx test learn-app --testPathPattern=bookmarks

# Build (full verification)
cd apps/learn-app && pnpm nx build learn-app
```

---

## Reference Components

Study these existing components for patterns:

| Component | File | Use For |
|-----------|------|---------|
| **Flashcards** | `src/components/flashcards/` | localStorage, SSR safety, Zod |
| **VoiceControlDock** | `src/components/VoiceControlDock/` | Fixed-position dock UI |
| **ProgressDashboard** | `src/components/progress/` | Page layout |
| **LazyFlashcards** | `src/components/flashcards/LazyFlashcards.tsx` | BrowserOnly pattern |
| **useFSRS** | `src/components/flashcards/useFSRS.ts` | Hook structure |

---

## Accessibility Checklist

- [ ] Semantic HTML (`<button>`, `<nav>`, `<section>`)
- [ ] ARIA labels (`aria-label`, `aria-labelledby`)
- [ ] Keyboard navigation (Tab, Enter/Space, Escape)
- [ ] Focus trap in modals
- [ ] Focus restoration on close
- [ ] role="dialog", aria-modal="true" for panels
- [ ] Visible focus indicators
- [ ] Color contrast WCAG AA (4.5:1)

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| Using `any` types | Use proper interfaces |
| Direct localStorage in component body | Use useEffect or hook |
| Missing BrowserOnly wrapper | Add for all client-only components |
| Wrong file paths | Use `apps/learn-app/src/` from repo root |
| Skipping Zod validation | Always validate before save |
| No error handling | Add try/catch + error state |
| Forgetting epoch ms | Store dates as `Date.now()` |
| Inline styles | Use Tailwind + CSS modules |

---

## Testing Guide

### Unit Tests (Hooks/Utils)

```typescript
// __tests__/bookmarks/useBookmarks.test.ts
import { renderHook, act } from '@testing-library/react';
import { useBookmarks } from '@/hooks/useBookmarks';

describe('useBookmarks', () => {
  it('loads from localStorage on mount', () => {});
  it('saves to localStorage on change', () => {});
  it('addBookmark creates new bookmark', () => {});
  it('removeBookmark deletes bookmark', () => {});
});
```

### Component Tests

```typescript
// __tests__/bookmarks/BookmarkDock.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BookmarkDock } from '@/components/bookmarks/BookmarkDock';

describe('BookmarkDock', () => {
  it('renders with zero bookmarks', () => {});
  it('shows badge with count', () => {});
  it('opens panel on click', () => {});
});
```

### Integration Tests

```typescript
// __tests__/bookmarks/bookmarks-flow.test.tsx
describe('Bookmarks flow', () => {
  it('completes full lifecycle', () => {
    // 1. Add bookmark
    // 2. Verify persists after reload
    // 3. Remove bookmark
    // 4. Verify removal
  });
});
```

---

## Export Formats

### Markdown Export

```markdown
# My Bookmarks

## 01-General-Agents-Foundations

### The 2025 Inflection Point

#### Evidence from Academia

**Lesson**: The 2025 Inflection Point

The ICPC competition results showed AI achieving perfect scores...

---
```

### JSON Export

```json
{
  "bookmarks": [
    {
      "id": "bm_7f3a9c2e1d",
      "createdAt": 1741017600000,
      "sectionTitle": "Evidence from Academia",
      "lessonTitle": "The 2025 Inflection Point",
      "contentPreview": "The ICPC competition..."
    }
  ]
}
```

---

## Content Addressing

**Problem**: Lesson slugs may change, breaking bookmark links.

**Solution**: Reconciliation logic

```typescript
function resolveBookmarkLocation(bookmark: Bookmark) {
  // Try direct slug match first
  const lesson = getLessonBySlug(bookmark.lessonSlug);
  if (lesson) {
    const section = document.getElementById(bookmark.sectionId);
    if (section) return { status: 'resolved', lesson, section };
  }
  
  // Fallback: search by section title
  const sectionByTitle = findSectionByTitle(lesson, bookmark.sectionTitle);
  if (sectionByTitle) return { status: 'relocated', section: sectionByTitle };
  
  return { status: 'orphaned', bookmark };
}
```

---

## Cloud-Sync Abstraction

**Phase 2 Ready**: All storage goes through adapter interface

```typescript
export interface BookmarkStorageAdapter {
  load(): Promise<BookmarksState>;
  save(state: BookmarksState): Promise<void>;
  sync?(): Promise<void>;  // Phase 2: cloud sync
}

// Current: LocalStorageAdapter
// Future: SupabaseAdapter implements same interface
```

---

## Report Format

After implementing a task, output:

```
## Task X.X Complete ✅

**Files Created**:
- `apps/learn-app/src/path/to/file.ts`

**Patterns Used**:
- Copied from: [Reference Component]
- Modified for: [Bookmarks-specific changes]

**Validations Run**:
- [ ] TypeScript compiles
- [ ] Linting passes
- [ ] Follows existing conventions

**Next Steps**:
- [Task dependency to implement next]
```

---

## References

- **Spec**: `specs/anchored/bookmarks/spec.md`
- **Plan**: `specs/anchored/bookmarks/plan.md`
- **Tasks**: `specs/anchored/bookmarks/tasks.md`
- **Research**: `specs/anchored/bookmarks/research/codebase-analysis.md`
- **Flashcards Pattern**: `apps/learn-app/src/components/flashcards/`
- **VoiceControlDock**: `apps/learn-app/src/components/VoiceControlDock/`
- **ProgressDashboard**: `apps/learn-app/src/components/progress/ProgressDashboard.tsx`

---

## Quick Commands

```bash
# Read spec
read_file specs/anchored/bookmarks/spec.md

# Read plan
read_file specs/anchored/bookmarks/plan.md

# Read research
read_file specs/anchored/bookmarks/research/codebase-analysis.md

# List existing patterns
ls apps/learn-app/src/components/flashcards/
ls apps/learn-app/src/components/VoiceControlDock/

# Validate implementation
cd apps/learn-app && npx tsc --noEmit && pnpm nx lint learn-app
```

---

## Getting Started

To implement the Bookmarks feature:

1. **Read the spec**: `specs/anchored/bookmarks/spec.md`
2. **Read the plan**: `specs/anchored/bookmarks/plan.md`
3. **Start with Task 0.1**: Say "Implement Task 0.1 from bookmarks plan"
4. **Follow the tasks in order**: Each task builds on previous
5. **Validate after each task**: Run TypeScript + linting
6. **Test before committing**: Run test suite

**Estimated Time**: 6-8 hours with this skill (vs 10-12 hours without)

**Ready to start?** Say: "Let's implement Task 0.1"
