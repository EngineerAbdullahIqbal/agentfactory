# Validation Guide

Quality gates and validation procedures for translations.

## Structural Validation (Script)

Run after reassembly:

```bash
python scripts/translate_md.py validate <original.md> <translated.md>
```

Checks performed:
- Block structure matches (headings, paragraphs, lists, tables, blockquotes)
- Code blocks are identical (not translated)
- All link URLs preserved
- All image sources preserved
- Table structure matches (same rows and cells)
- Heading count and levels match
- Inline code preserved

## Translation Quality Gate (MANDATORY)

**Run this self-check BEFORE marking any file as `translated`.**

For each translated segment where the original contains human-readable text:

- [ ] Translated text is DIFFERENT from the original
- [ ] Contains ZERO language tags like `[UR]`, `[ES]`, `[FR]`
- [ ] Contains actual target-script characters (see character sets below)
- [ ] Is actual fluent text, not "Simulated translation" or "Placeholder"

**If >20% of translatable segments fail ANY check, DO NOT mark as translated.**
Mark as `needs_retranslation` and inform the user.

### Target-Script Character Sets

| Language | Characters |
|----------|-----------|
| Urdu | ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ہ ی |
| Hindi | अ आ इ ई उ ऊ ए ऐ ओ औ क ख ग घ च छ ज झ ट ठ ड ढ ण त थ |
| Arabic | ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي |
| Chinese | Any CJK characters (中文) |
| French/Spanish/German | Accented Latin characters are fine |

### Why This Gate Exists

A previous session appended `[UR]` to English text and marked 535 segments as
"translated". The fake translation passed structural validation (structure was
preserved) but the content was still English. This wasted an entire session.

## JSON Validation Checklist

For `code.json`, `navbar.json`, `footer.json`, `current.json`:

- [ ] All keys from source exist in translated file
- [ ] No new keys added
- [ ] All `{placeholder}` tokens preserved in messages
- [ ] Pluralization `|` separators preserved
- [ ] Valid JSON (no trailing commas, proper escaping)
- [ ] `"description"` fields unchanged (kept in English)
- [ ] Messages are in the CORRECT language (Urdu is NOT Arabic)

## What Correct vs Wrong Translation Looks Like

**Correct:**
```json
{
  "original": "Welcome to the **installation guide**.",
  "translated": "**انسٹالیشن گائیڈ** میں خوش آمدید۔"
}
```

**Wrong (NEVER do these):**
```json
// Appending language tag
{ "original": "Welcome", "translated": "Welcome [UR]" }

// Copying English unchanged
{ "original": "Welcome", "translated": "Welcome" }

// Placeholder text
{ "original": "Welcome", "translated": "PLACEHOLDER_URDU_TEXT" }

// Simulating translation
{ "original": "Welcome", "translated": "Simulated Urdu translation here" }
```

## Quick Reference Commands

```bash
# Validate single file
python scripts/translate_md.py validate <original.md> <translated.md>

# Check manifest status
cat apps/learn-app/translation-work/manifest.json | python -m json.tool

# Count translated vs source files
find apps/learn-app/docs/ -name "*.md" -not -name "README.md" | wc -l
find apps/learn-app/i18n/<locale>/docusaurus-plugin-content-docs/current/ -name "*.md" | wc -l
```
