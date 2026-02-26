# Chapter 3: Renumber Request (Deferred)

## Context

Lessons 22 (Worktrees) and 23 (Remote Control) were inserted into Section C (`03-extensibility-teams/`). This pushes existing lessons 22-32 (Sections D and E) to need renumbering as 24-34.

## Scope of Renumbering

### Files to Rename (Section D: `04-claude-cowork/`)

Current filenames → New filenames:

| Current | New | Title |
|---------|-----|-------|
| `22-cowork-terminal-to-desktop.md` | `24-cowork-terminal-to-desktop.md` | Terminal to Desktop |
| `23-cowork-getting-started.md` | `25-cowork-getting-started.md` | Getting Started |
| `24-cowork-practical-workflows.md` | `26-cowork-practical-workflows.md` | Practical Workflows |
| `25-browser-integration-claude-chrome.md` | `27-browser-integration-claude-chrome.md` | Browser Integration |
| `26-plugins-and-connectors.md` | `28-plugins-and-connectors.md` | Plugins and Connectors |
| `27-safety-limitations-whats-coming.md` | `29-safety-limitations-whats-coming.md` | Safety & Limitations |
| `28-cowork-built-in-skills.md` | `30-cowork-built-in-skills.md` | Built-in Skills |

Each `.md` file has companion files that also need renaming:
- `.flashcards.yaml`
- `.summary.md`

### Files to Rename (Section E: `05-capstone/`)

Check for lessons 29-32 in `05-capstone/` and renumber to 31-34.

### Internal Updates Required

For each renamed file, update:
1. `sidebar_position` in YAML frontmatter
2. `lesson` number in YAML frontmatter
3. Flashcard deck `id` fields (e.g., `ch03-22-*` → `ch03-24-*`)
4. Flashcard card `id` prefixes

### Cross-Reference Updates

1. **L20 (Agent Teams)**: "What's Next" section references "Lesson 22" — update to "Lesson 24"
2. **L21 (Agent Teams Exercises)**: Check for forward references
3. **L22 (Worktrees)**: "What's Next" references L23 — this is correct (new L23)
4. **L23 (Remote Control)**: "What's Next" references next section — verify target lesson number
5. **Section READMEs**: Update any lesson number references in `README.md` files for sections C, D, E

### README Updates

- `03-extensibility-teams/README.md` — add L22 and L23 to lesson list
- `04-claude-cowork/README.md` — update all lesson numbers
- `05-capstone/README.md` — update all lesson numbers if applicable

## Execution Notes

- Use `git mv` for renames to preserve history
- Run all renames first, then update internal references
- Verify with `grep -r "Lesson 22\|Lesson 23\|Lesson 24" apps/learn-app/docs/01-General-Agents-Foundations/03-general-agents/` after completion
- Test that Docusaurus builds successfully after renumbering

## Priority

Low — the new lessons work correctly at positions 22-23 without renumbering. Renumbering is a cleanup task to maintain consistent numbering across sections.
