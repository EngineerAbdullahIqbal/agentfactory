# Translation Rules Reference

Rules for translating Docusaurus Markdown/MDX and i18n JSON files.

## Never Translate (Keep Verbatim)

- Markdown syntax tokens: `#`, `*`, `-`, `>`, `` ` ``, `|`, `---`
- Fenced code blocks (` ``` `) and indented code blocks
- Inline code (`` `code` ``)
- URLs, file paths, variable names (`user_id`, `api_key`)
- Numbers, version strings (`Python 3.11`, `HTTP 404`)
- Mathematical formulas (`$...$`, `$$...$$`)
- Escape sequences (`\*`, `\_`)
- Horizontal rules (`---`, `***`, `___`)
- Footnote markers (`[^1]`)
- JSON keys (translate only `"message"` values, keep `"description"` in English)
- Placeholder tokens in JSON: `{count}`, `{tagName}`, `{query}`, `{label}`, etc.

## Docusaurus-Specific: Never Translate

- MDX import statements: `import Tabs from '@theme/Tabs';`
- JSX component tags: `<Tabs>`, `<TabItem>`, `<details>`, `<summary>`
- Admonition markers: `:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`
- Component props/attributes: `value="python"` (keep), `label="Python"` (translate)
- Frontmatter keys (`title`, `description` values translate; all keys stay verbatim)
- `sidebar_label`, `sidebar_position`, `slug` — keep verbatim
- File paths in imports and requires
- Custom components: `<Quiz>`, `<DocCardList>`, `<Highlight>`

## Inline Markdown Handling

Preserve formatting markers around translated text:

| Element | Rule | Example |
|---------|------|---------|
| Headings | Translate text, keep `#` markers | `## Guide` → `## گائیڈ` |
| Bold/italic | Translate inner text, keep `**`/`*` | `**bold**` → `**بولڈ**` |
| Links | Translate link text, keep URL | `[text](url)` → `[ترجمہ](url)` |
| Images | Translate alt text, keep src | `![alt](img.png)` → `![ترجمہ](img.png)` |
| Tables | Translate cell text, keep `\|` structure | |
| HTML in MD | Translate visible text, keep all tags | |
| Emoji | Keep emoji symbol, translate adjacent text | |
| Footnotes | Translate text, keep `[^n]:` marker | |
| Admonitions | Translate content inside `:::` blocks, keep marker | |
| Tabs | Translate `label` prop and content, keep `value` prop | |

## Linguistic Quality

- Translate meaning contextually, not word-for-word
- Use native grammar structure of target language
- Maintain tone (formal docs stay formal)
- Use the glossary for consistent terminology
- Follow target language punctuation conventions

## RTL Languages (Urdu, Arabic)

- Markdown syntax markers (`#`, `-`, `>`, `|`) remain on the left (structural)
- Text content flows RTL naturally; do not add Unicode direction markers unless needed
- Table cell text is RTL but `|` pipe structure stays identical
- Link syntax stays LTR: `[RTL text](url)`
- Code blocks remain LTR regardless of surrounding content
- Urdu uses `۔` instead of `.` for full stops

## Preserve Exactly

- All spacing, indentation, blank lines
- Bullet nesting depth and list type (`-` stays `-`, `1.` stays `1.`)
- Line break structure (for clean Git diffs)
- CRLF vs LF line endings
- MDX component structure and nesting

## Never Do

- Add information not in the original
- Remove information from the original
- Break Markdown/MDX syntax validity
- Translate code inside code blocks or inline code
- Change list type (bullet to numbered or vice versa)
- Translate JSON keys or `"description"` fields
- Remove or modify placeholder tokens
- Change file extensions or paths
- Re-translate files already complete and unchanged
