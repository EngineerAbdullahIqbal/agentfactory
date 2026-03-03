# Ch 15: Cowork Architecture Fix

## Root Cause

The same fabricated "three-component model" (SKILL.md + config.yaml + connector scripts) from Ch 14 propagated into Ch 15. Ch 14 has been corrected; Ch 15 still carries the wrong model.

## Impact

Ch 15 is MORE affected than Ch 14 because L01 and L03 are entirely built on the wrong architectural model. The incorrect artifact names (config.yaml, connector scripts) and structural description (three components) appear throughout.

## Correct Architecture (Verified Sources)

Per Anthropic's official docs, the knowledge-work-plugins repo, and the Cowork help center:

- **Plugin**: A complete package bundling skills, connectors, slash commands, and sub-agents into one installable unit
- **Skills**: SKILL.md files — structured Markdown with YAML frontmatter, authored by knowledge workers
- **Connectors**: Configured via `.mcp.json` — MCP servers connecting to enterprise systems
- **Manifest**: `plugin.json` inside `.claude-plugin/` — declares plugin name, version, author
- **`config.yaml` does NOT exist** — this was fabricated
- **"Connector scripts" is misleading** — connectors are MCP servers, most ship pre-built

## Files to Audit

- L01 + summary + flashcards
- L03 + summary + flashcards
- L06 + summary + flashcards
- L08 + summary + flashcards
- L10 (chapter quiz)
- L11 + summary + flashcards

## Constraint

Preserve the three-role pedagogy (knowledge worker / developer / admin). Fix artifact names and structural descriptions only.

## Reference

Ch 14 L04 corrections (this PR) serve as the template for correct language and framing.
