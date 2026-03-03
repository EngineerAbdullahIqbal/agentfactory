# Feature: Bookmarks

**Spec**: `specs/anchored/bookmarks/spec.md`
**Status**: Specification Complete — Ready for Implementation
**Created**: 2026-03-03

---

## Current Phase

**[Specification]** ✓ Complete → **[Implementation]** Pending

---

## Session Log

| Date       | Phase          | Work Done                          | Next Steps                        |
| ---------- | -------------- | ---------------------------------- | --------------------------------- |
| 2026-03-03 | Specification  | spec.md created with full SDD-RI format | Research integration patterns |
| 2026-03-03 | Research       | codebase-analysis.md completed (10 key findings) | Update spec with research |
| 2026-03-03 | Specification  | spec.md updated with research findings | Create implementation plan |
| 2026-03-03 | Planning       | plan.md created (10 tasks, 1-2 days effort) | Align tasks.md with plan |
| 2026-03-03 | Alignment      | tasks.md updated: 13→10 tasks, aligned with research | Begin Task 0.1 |

---

## Research Summary

**Key Findings**:
1. ✅ Content addressing: Use Docusaurus auto-generated heading IDs
2. ✅ Reuse patterns: `useFSRS` → `useBookmarks`, VoiceControlDock → BookmarkDock
3. ✅ Integration: Floating dock + panel (no TOC customization for MVP)
4. ✅ MVP scope: 6-8 hours implementation (1 day)
5. ✅ Engagement: Export to study guides is key differentiator

**Research Artifact**: `research/codebase-analysis.md`

---

## Implementation Plan Summary

**Plan Created**: `plan.md`

| Phase | Tasks | Time |
|-------|-------|------|
| Phase 0: Foundation | 3 tasks (types, storage, hook) | 2-3 hours |
| Phase 1: UI Components | 4 tasks (dock, panel, search, export) | 4-5 hours |
| Phase 2: Dashboard | 1 task (bookmarks page) | 2-3 hours |
| Phase 3: Integration | 2 tasks (wiring, tests) | 2-3 hours |
| **Total** | **10 tasks** | **10-12 hours (1-2 days)** |

**Next Action**: Begin Task 0.1 (TypeScript Types & Zod Schemas)

---

## Task Alignment Summary

**tasks.md Updated** (2026-03-03):

| Change | Before | After | Rationale |
|--------|--------|-------|-----------|
| **Total Tasks** | 13 | 10 | Consolidated per plan.md |
| **Time Estimate** | 3-4 days | 1-2 days | Research-validated (copy patterns) |
| **Task 4 (BookmarkIndicator)** | Included | Removed | Research: skip for MVP |
| **Task Numbering** | 1-13 | 0.1-3.2 | Phased structure from plan |
| **Tests** | 3 separate tasks | 1 task (3.2) | Consolidated |
| **Integration** | Not explicit | Task 3.1 | Added explicit wiring step |
| **File Paths** | Mixed | Verified `apps/learn-app/src/` | Codebase-verified |

---

## Implementation Plan Reference

See `plan.md` for detailed implementation plan generated from Plan Mode.

---

## Task Status

### Phase 0 (MVP)

- [ ] **Task 1**: TypeScript types and Zod schemas
- [ ] **Task 2**: localStorage adapter with cloud-sync abstraction
- [ ] **Task 3**: `useBookmarks` hook implementation
- [ ] **Task 4**: `<BookmarkIndicator />` component
- [ ] **Task 5**: `<BookmarkDock />` component
- [ ] **Task 6**: `<BookmarkPanel />` component
- [ ] **Task 7**: `/bookmarks` dashboard page
- [ ] **Task 8**: Export functionality (Markdown/JSON)
- [ ] **Task 9**: Unit tests (hooks, utils)
- [ ] **Task 10**: Component tests
- [ ] **Task 11**: Integration tests
- [ ] **Task 12**: Accessibility audit
- [ ] **Task 13**: Documentation (README, comments)

---

## Blocked Items

None currently.

---

## Decisions Made

| Decision | Rationale | Date |
|----------|-----------|------|
| Local-first with adapter pattern | Enables Phase 2 cloud-sync without refactoring | 2026-03-03 |
| Content addressing with reconciliation | Handles lesson moves/renames gracefully | 2026-03-03 |
| Bookmark at section level (h2/h3) | Balance between granularity and usability | 2026-03-03 |

---

## Open Questions

| Question | Status | Owner |
|----------|--------|-------|
| Should bookmarks support nested sections (h3, h4) or only h2? | Pending | TBD |
| Should export include lesson context? | Pending | TBD |

---

## Notes

### Research Findings

- Flashcards spec provides excellent localStorage pattern to follow
- Learner Profile spec shows Zod validation approach
- Existing components (VoiceControlDock) provide dock UI reference

### Architecture Decisions

See `adrs/` directory for formal Architecture Decision Records.

---

## Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test Coverage | >85% | - |
| Component Count | 8 | 0 |
| Hook Count | 1 | 0 |
| Utils Count | 4 | 0 |
