# Specification Directory

Specs follow a two-level system based on scope and session count.

## Decision Heuristic

| Signal                                                     | Level           | Location             |
| ---------------------------------------------------------- | --------------- | -------------------- |
| Single-session task, 1-2 files changed                     | **Lightweight** | `specs/lightweight/` |
| Multi-session feature, 3+ files, needs rollback boundaries | **Anchored**    | `specs/anchored/`    |
| Completed or abandoned work                                | **Archive**     | `specs/archive/`     |

## Required Artifacts

| Level           | Required                                                       | Optional                       |
| --------------- | -------------------------------------------------------------- | ------------------------------ |
| **Lightweight** | Single markdown file with problem, approach, and done criteria | --                             |
| **Anchored**    | `spec.md`, `plan.md`, `tasks.md`, `progress.md`                | `research/`, `notes/`, `adrs/` |

## Naming Conventions

- **Lightweight**: `specs/lightweight/<feature-name>.md`
- **Anchored**: `specs/anchored/<feature-name>/spec.md` (directory per feature)
- **Archive**: `specs/archive/<original-name>/` (preserve original name on move)

## Loose Files

Active one-off requests (like `ch3-renumber-request.md`) may live at `specs/` root temporarily. Move to `lightweight/` or delete when resolved.

## Full Methodology

See Chapter 5 in the book (`apps/learn-app/docs/`) for the complete Spec-Driven Development methodology.
