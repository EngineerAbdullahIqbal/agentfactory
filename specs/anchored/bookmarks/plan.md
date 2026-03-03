# Bookmarks Feature — Implementation Plan

**Spec**: `specs/anchored/bookmarks/spec.md`
**Status**: Ready for Implementation
**Created**: 2026-03-03
**Research**: `research/codebase-analysis.md`
**Estimated Effort**: 1-2 days (8-12 hours)

---

## Executive Summary

This plan breaks down the Bookmarks feature implementation into **8 focused tasks** that can be completed in 1-2 days by copying existing patterns from Flashcards, VoiceControlDock, and ProgressDashboard components.

**Key Insight from Research**: All technical patterns already exist in the codebase — we're assembling proven components, not inventing new ones.

---

## Implementation Phases

### Phase 0: Foundation (2-3 hours)

**Goal**: TypeScript types, Zod schemas, localStorage layer

#### Task 0.1: TypeScript Types & Zod Schemas
**Time**: 45 minutes
**Files to Create**:
- `src/types/bookmarks.ts`
- `src/utils/bookmarks/validation.ts`

**Implementation**:
```typescript
// src/types/bookmarks.ts
export interface Bookmark {
  id: string;                    // UUID: "bm_{10 chars}"
  createdAt: number;             // Epoch ms
  updatedAt: number;             // Epoch ms
  lessonSlug: string;            // e.g., "01-the-2025-inflection-point"
  chapterId: string;             // e.g., "01-General-Agents-Foundations"
  sectionId: string;             // e.g., "evidence-from-academia"
  sectionTitle: string;          // e.g., "Evidence from Academia"
  lessonTitle: string;           // Cached for display
  contentPreview: string;        // First 200 chars
  tags: string[];                // Phase 1: user-defined tags
  note: string | null;           // Phase 1: personal annotation
  version: number;               // Schema version
}

export interface BookmarksState {
  schemaVersion: 1;
  bookmarks: Record<string, Bookmark>;
  lastSyncMs: number | null;
}
```

```typescript
// src/utils/bookmarks/validation.ts
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

**Acceptance Criteria**:
- [ ] Types compile with no errors
- [ ] Zod schemas validate correctly
- [ ] Test: valid bookmark passes validation
- [ ] Test: invalid ID format fails validation

---

#### Task 0.2: localStorage Adapter
**Time**: 45 minutes
**Files to Create**:
- `src/utils/bookmarks/storage.ts`
- `src/utils/bookmarks/storage-adapter.ts`

**Implementation**:
```typescript
// src/utils/bookmarks/storage.ts
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
// src/utils/bookmarks/storage-adapter.ts
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

**Acceptance Criteria**:
- [ ] loadBookmarks() returns empty state when no data
- [ ] saveBookmarks() persists to localStorage
- [ ] Corrupted JSON handled gracefully
- [ ] Zod validation catches invalid data

---

#### Task 0.3: useBookmarks Hook
**Time**: 1.5 hours
**Files to Create**:
- `src/hooks/useBookmarks.ts`

**Implementation Pattern**: Copy `src/components/flashcards/useFSRS.ts`

```typescript
// src/hooks/useBookmarks.ts
import { useState, useEffect, useCallback } from 'react';
import { Bookmark, BookmarksState, AddBookmarkParams } from '../types/bookmarks';
import { LocalStorageAdapter } from '../utils/bookmarks/storage-adapter';
import { v4 as uuidv4 } from 'uuid';  // Or use crypto.randomUUID()

const adapter = new LocalStorageAdapter();

export function useBookmarks() {
  const [state, setState] = useState<BookmarksState>(() => ({
    schemaVersion: 1,
    bookmarks: {},
    lastSyncMs: null,
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load on mount
  useEffect(() => {
    adapter.load()
      .then((data) => {
        setState(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Save on change
  useEffect(() => {
    if (!isLoading) {
      adapter.save(state).catch((err) => setError(err));
    }
  }, [state, isLoading]);

  const addBookmark = useCallback(async (params: AddBookmarkParams): Promise<Bookmark> => {
    const bookmark: Bookmark = {
      id: `bm_${uuidv4().replace(/-/g, '').slice(0, 10)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...params,
      tags: [],
      note: null,
      version: 1,
    };
    
    setState((prev) => ({
      ...prev,
      bookmarks: {
        ...prev.bookmarks,
        [bookmark.id]: bookmark,
      },
    }));
    
    return bookmark;
  }, []);

  const removeBookmark = useCallback(async (bookmarkId: string) => {
    setState((prev) => {
      const { [bookmarkId]: removed, ...rest } = prev.bookmarks;
      return { ...prev, bookmarks: rest };
    });
  }, []);

  const isBookmarked = useCallback((sectionId: string) => {
    return Object.values(state.bookmarks).some(b => b.sectionId === sectionId);
  }, [state.bookmarks]);

  const getBookmarksByLesson = useCallback((lessonSlug: string) => {
    return Object.values(state.bookmarks).filter(b => b.lessonSlug === lessonSlug);
  }, [state.bookmarks]);

  const searchBookmarks = useCallback((query: string) => {
    const q = query.toLowerCase();
    return Object.values(state.bookmarks).filter(
      b => b.sectionTitle.toLowerCase().includes(q) || 
           b.contentPreview.toLowerCase().includes(q)
    );
  }, [state.bookmarks]);

  return {
    bookmarks: Object.values(state.bookmarks),
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarksByLesson,
    searchBookmarks,
    isLoading,
    error,
  };
}
```

**Acceptance Criteria**:
- [ ] Hook loads from localStorage on mount
- [ ] Hook saves to localStorage on change
- [ ] addBookmark() creates new bookmark
- [ ] removeBookmark() deletes bookmark
- [ ] isBookmarked() returns correct boolean
- [ ] searchBookmarks() filters correctly

---

### Phase 1: UI Components (4-5 hours)

#### Task 1.1: BookmarkDock Component
**Time**: 1.5 hours
**Files to Create**:
- `src/components/bookmarks/BookmarkDock.tsx`
- `src/components/bookmarks/BookmarkDock.module.css`

**Implementation Pattern**: Copy `src/components/VoiceControlDock/index.tsx`

```typescript
// src/components/bookmarks/BookmarkDock.tsx
import React, { useState } from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { BookmarkPanel } from './BookmarkPanel';
import styles from './BookmarkDock.module.css';
import { Bookmark } from 'lucide-react';

export function BookmarkDock() {
  const { bookmarks, getBookmarksByLesson } = useBookmarks();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Get current lesson from URL (simplified - use useRoute() in real impl)
  const currentLessonSlug = getCurrentLessonSlug();
  const lessonBookmarks = getBookmarksByLesson(currentLessonSlug);
  const count = lessonBookmarks.length;

  return (
    <>
      <div className={styles.bookmarkDock} onClick={() => setIsPanelOpen(true)}>
        <Bookmark className={styles.icon} />
        {count > 0 && (
          <span className={styles.badge}>{count}</span>
        )}
      </div>
      
      <BookmarkPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </>
  );
}
```

```css
/* src/components/bookmarks/BookmarkDock.module.css */
.bookmarkDock {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--ifm-color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 1000;
}

.bookmarkDock:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.icon {
  width: 24px;
  height: 24px;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4444;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  border: 2px solid white;
}
```

**Acceptance Criteria**:
- [ ] Dock appears fixed bottom-right
- [ ] Badge shows bookmark count
- [ ] Click opens panel
- [ ] Hover animation works
- [ ] SSR-safe (BrowserOnly wrapper)

---

#### Task 1.2: BookmarkPanel Component
**Time**: 2 hours
**Files to Create**:
- `src/components/bookmarks/BookmarkPanel.tsx`
- `src/components/bookmarks/BookmarkList.tsx`
- `src/components/bookmarks/BookmarkItem.tsx`
- `src/components/bookmarks/BookmarkPanel.module.css`

**Implementation Pattern**: Slide-out panel like Flashcards

```typescript
// src/components/bookmarks/BookmarkPanel.tsx
import React, { useEffect } from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { BookmarkList } from './BookmarkList';
import { BookmarkSearch } from './BookmarkSearch';
import { ExportDropdown } from './ExportDropdown';
import styles from './BookmarkPanel.module.css';
import { X } from 'lucide-react';

interface BookmarkPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookmarkPanel({ isOpen, onClose }: BookmarkPanelProps) {
  const { getBookmarksByLesson, searchBookmarks } = useBookmarks();
  const currentLessonSlug = getCurrentLessonSlug();
  const bookmarks = getBookmarksByLesson(currentLessonSlug);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Bookmarks</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        
        <BookmarkSearch />
        
        <BookmarkList bookmarks={bookmarks} />
        
        <ExportDropdown bookmarks={bookmarks} />
      </div>
    </div>
  );
}
```

**Acceptance Criteria**:
- [ ] Panel slides in from right
- [ ] Overlay closes on click
- [ ] Escape key closes panel
- [ ] Lists bookmarks for current lesson
- [ ] Delete button works per bookmark

---

#### Task 1.3: BookmarkSearch Component
**Time**: 45 minutes
**Files to Create**:
- `src/components/bookmarks/BookmarkSearch.tsx`

**Implementation**:
```typescript
import React, { useState, useEffect } from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';

export function BookmarkSearch() {
  const [query, setQuery] = useState('');
  const { searchBookmarks } = useBookmarks();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchBookmarks(query);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, searchBookmarks]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search bookmarks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map(bookmark => (
            <div key={bookmark.id}>{bookmark.sectionTitle}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

#### Task 1.4: ExportDropdown Component
**Time**: 45 minutes
**Files to Create**:
- `src/components/bookmarks/ExportDropdown.tsx`
- `src/utils/bookmarks/export.ts`

**Implementation**:
```typescript
// src/utils/bookmarks/export.ts
import { Bookmark } from '../../types/bookmarks';

export function exportToMarkdown(bookmarks: Bookmark[]): string {
  let md = '# My Bookmarks\n\n';
  
  // Group by chapter
  const byChapter = bookmarks.reduce((acc, b) => {
    if (!acc[b.chapterId]) acc[b.chapterId] = [];
    acc[b.chapterId].push(b);
    return acc;
  }, {} as Record<string, Bookmark[]>);
  
  for (const [chapterId, chapterBookmarks] of Object.entries(byChapter)) {
    md += `## ${chapterId}\n\n`;
    
    for (const bookmark of chapterBookmarks) {
      md += `### ${bookmark.sectionTitle}\n\n`;
      md += `**Lesson**: ${bookmark.lessonTitle}\n\n`;
      md += `${bookmark.contentPreview}\n\n`;
      md += `---\n\n`;
    }
  }
  
  return md;
}

export function exportToJson(bookmarks: Bookmark[]): string {
  return JSON.stringify({ bookmarks }, null, 2);
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

**Acceptance Criteria**:
- [ ] Export to Markdown downloads .md file
- [ ] Export to JSON downloads .json file
- [ ] Filename includes date

---

### Phase 2: Dashboard Page (2-3 hours)

#### Task 2.1: /bookmarks Dashboard
**Time**: 2-3 hours
**Files to Create**:
- `src/pages/bookmarks.tsx`
- `src/pages/bookmarks.module.css`

**Implementation Pattern**: Copy `src/components/progress/ProgressDashboard.tsx`

```typescript
// src/pages/bookmarks.tsx
import React from 'react';
import Layout from '@theme/Layout';
import { useBookmarks } from '../hooks/useBookmarks';
import { exportToMarkdown, exportToJson, downloadFile } from '../utils/bookmarks/export';
import styles from './bookmarks.module.css';

export default function BookmarksPage() {
  const { bookmarks, searchBookmarks } = useBookmarks();
  
  // Group by chapter
  const byChapter = bookmarks.reduce((acc, b) => {
    if (!acc[b.chapterId]) acc[b.chapterId] = [];
    acc[b.chapterId].push(b);
    return acc;
  }, {} as Record<string, typeof bookmarks>);

  const handleExportAll = () => {
    const md = exportToMarkdown(bookmarks);
    downloadFile(md, `bookmarks-${new Date().toISOString().split('T')[0]}.md`, 'text/markdown');
  };

  return (
    <Layout title="My Bookmarks" description="Your personal study guide">
      <main className={styles.container}>
        <h1>My Bookmarks</h1>
        
        <div className={styles.actions}>
          <button onClick={handleExportAll}>Export All (Markdown)</button>
        </div>
        
        {bookmarks.length === 0 ? (
          <p className={styles.empty}>
            No bookmarks yet. Start bookmarking sections as you read!
          </p>
        ) : (
          <div className={styles.chapters}>
            {Object.entries(byChapter).map(([chapterId, chapterBookmarks]) => (
              <div key={chapterId} className={styles.chapter}>
                <h2>{chapterId}</h2>
                {chapterBookmarks.map(bookmark => (
                  <div key={bookmark.id} className={styles.bookmarkCard}>
                    <h3>{bookmark.sectionTitle}</h3>
                    <p>{bookmark.lessonTitle}</p>
                    <p>{bookmark.contentPreview}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
```

**Acceptance Criteria**:
- [ ] Page accessible at `/bookmarks`
- [ ] Shows all bookmarks grouped by chapter
- [ ] Export All button works
- [ ] Empty state shown when no bookmarks
- [ ] Responsive layout

---

### Phase 3: Integration & Testing (2-3 hours)

#### Task 3.1: Wire Components into Docusaurus
**Time**: 1 hour
**Files to Modify**:
- `src/theme/DocPage/Layout/index.tsx` (or create wrapper)

**Implementation**:
```typescript
// Wrap DocPage to include BookmarkDock
import { BookmarkDock } from '../../components/bookmarks/BookmarkDock';
import { BrowserOnly } from '@docusaurus/core';

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

**Acceptance Criteria**:
- [ ] Dock appears on all doc pages
- [ ] No SSR errors
- [ ] Panel opens/closes correctly

---

#### Task 3.2: Write Tests
**Time**: 1.5 hours
**Files to Create**:
- `src/__tests__/bookmarks/useBookmarks.test.ts`
- `src/__tests__/bookmarks/storage.test.ts`
- `src/__tests__/bookmarks/BookmarkDock.test.tsx`

**Test Coverage Target**: 80%+

---

## Task Dependencies

```
Task 0.1 (Types/Schemas)
    ↓
Task 0.2 (Storage Adapter)
    ↓
Task 0.3 (useBookmarks Hook)
    ├─→ Task 1.1 (BookmarkDock)
    ├─→ Task 1.2 (BookmarkPanel)
    │   ├─→ Task 1.3 (BookmarkSearch)
    │   └─→ Task 1.4 (ExportDropdown)
    └─→ Task 2.1 (Dashboard Page)

All UI Tasks ──→ Task 3.1 (Integration)
All Tasks ─────→ Task 3.2 (Tests)
```

---

## Implementation Order (Recommended)

**Day 1**:
1. Task 0.1: Types & Schemas (45 min)
2. Task 0.2: Storage Adapter (45 min)
3. Task 0.3: useBookmarks Hook (1.5h)
4. Task 1.1: BookmarkDock (1.5h)
5. Task 1.2: BookmarkPanel (2h)

**Day 2**:
6. Task 1.3: BookmarkSearch (45 min)
7. Task 1.4: ExportDropdown (45 min)
8. Task 2.1: Dashboard Page (2-3h)
9. Task 3.1: Integration (1h)
10. Task 3.2: Tests (1.5h)

**Total**: ~11 hours

---

## Definition of Done

### Per Task
- [ ] Code implemented per spec
- [ ] TypeScript compiles with no errors
- [ ] Component renders without console warnings
- [ ] Follows existing code style (prettier, eslint)

### Per Feature
- [ ] All 10 tasks complete
- [ ] Tests passing
- [ ] No TypeScript errors
- [ ] Manual testing completed (desktop + mobile)
- [ ] progress.md updated

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| SSR errors | Use `BrowserOnly` wrapper everywhere |
| localStorage quota | Monitor size, add cleanup after 90 days (Phase 1) |
| Heading ID changes | Reconciliation logic in spec section 6.3 |
| Theme updates break integration | Use stable Docusaurus APIs, avoid DOM hacking |

---

**Plan Author**: Agent Factory (SDD-RI Methodology)
**Plan Date**: 2026-03-03
**Next Action**: Begin Task 0.1 (Types & Schemas)
