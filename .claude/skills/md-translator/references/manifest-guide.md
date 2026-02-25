# Translation Manifest Guide

The manifest at `apps/learn-app/translation-work/manifest.json` is the single source
of truth for translation progress. It tracks every file, its status, and whether
source content has changed.

## Schema

```json
{
  "version": 1,
  "last_updated": "<date>",
  "locales": {
    "<locale>": {
      "files": {
        "docs/<relative-path>.md": {
          "status": "<status>",
          "source_md5": "<hash>",
          "segments_file": "<locale>/<name>_<locale>_segments.json",
          "translated_file": "<locale>/<name>_<locale>_translated.json",
          "output_path": "i18n/<locale>/docusaurus-plugin-content-docs/current/<path>",
          "total_segments": 0,
          "translated_segments": 0,
          "last_extracted": "<date>",
          "last_translated": "<date>",
          "last_assembled": "<date>"
        }
      },
      "json_files": {
        "code.json": { "status": "<status>", "last_updated": "<date>" },
        "navbar.json": { "status": "<status>", "last_updated": "<date>" },
        "footer.json": { "status": "<status>", "last_updated": "<date>" },
        "current.json": { "status": "<status>", "last_updated": "<date>" }
      }
    }
  }
}
```

## File Status Lifecycle

| Status | Meaning | Next Step |
|--------|---------|-----------|
| `extracted` | Segments JSON created, not yet translated | Translate segments |
| `translated` | All segments have translated text | Reassemble to MD |
| `assembled` | Final MD written to i18n output path | Validate |
| `validated` | Passed structural validation | Done |
| `stale` | Source file changed since last translation | Re-extract, re-translate |
| `needs_retranslation` | Translated JSON has fake/wrong content | Delete bad JSON, redo |
| `wrong_language` | File contains wrong language text | Re-translate correctly |

## Decision Tree

```
Want to translate file X to locale Y?
│
├── Is X in manifest[Y].files?
│   ├── YES, status = "validated" or "assembled"
│   │   └── Is source_md5 still current?
│   │       ├── YES → SKIP (already done)
│   │       └── NO  → Mark "stale", re-extract, re-translate
│   ├── YES, status = "translated"
│   │   └── Reassemble only
│   ├── YES, status = "extracted"
│   │   └── Translate segments only
│   └── NO
│       └── Full pipeline: extract → translate → reassemble → validate
```

## Updating the Manifest

After EVERY pipeline step, update the manifest:

| After Step | Set Status | Set Fields |
|-----------|-----------|------------|
| Extract | `extracted` | `last_extracted`, `total_segments` |
| Translate | `translated` | `last_translated`, `translated_segments` |
| Reassemble | `assembled` | `last_assembled` |
| Validate | `validated` | — |

## Creating the Manifest (First Time)

If no manifest exists, scan existing artifacts to build one:

```bash
# Scan for existing work
ls apps/learn-app/translation-work/<locale>/

# Scan for already-assembled output
find apps/learn-app/i18n/<locale>/docusaurus-plugin-content-docs/current/ -name "*.md"

# Compute MD5 of each source file
md5sum apps/learn-app/docs/<path>/<file>.md
# PowerShell: Get-FileHash -Algorithm MD5 <file>
```

Set status based on what exists:
- Has `*_translated.json` AND `.md` in i18n → `assembled`
- Has `*_translated.json` but no `.md` → `translated`
- Has `*_segments.json` but no `*_translated.json` → `extracted`

## Detecting New/Changed Content

Compare `docs/` against the manifest:

```bash
# Count all source docs
find apps/learn-app/docs/ -name "*.md" -not -name "README.md" | wc -l

# Compare MD5 of each manifest entry to current file
# If MD5 differs → mark as "stale"
```

Report format:
```
Translation Status for <locale>:
- Total source files: N
- Validated: N
- Assembled: N
- In progress: N
- Stale: N
- Not started: N
```
