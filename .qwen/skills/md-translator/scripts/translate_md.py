#!/usr/bin/env python3
"""
Markdown Translation Helper (Production v2)

Uses markdown-it-py AST to parse Markdown, extract translatable segments
with full inline formatting preserved, and reassemble after translation.

Handles MDX-specific syntax (imports, JSX components, admonitions) by
preprocessing before CommonMark parsing and restoring after reassembly.

Commands:
  extract     Parse MD/MDX file, output translatable segments as JSON
  reassemble  Rebuild MD from original + translated JSON
  validate    Check translated MD for structural integrity
  batch       Extract all .md/.mdx files in a directory
  status      Compute MD5 hashes for source files (manifest helper)

Usage:
  python translate_md.py extract <input.md> <output.json> [--lang <code>]
  python translate_md.py reassemble <input.md> <translated.json> <output.md>
  python translate_md.py validate <original.md> <translated.md>
  python translate_md.py batch <input_dir> <output_dir> [--lang <code>]
  python translate_md.py status <file_or_dir>

Requires: markdown-it-py
  pip install markdown-it-py
"""

import hashlib
import json
import sys
import re
import os
from pathlib import Path
from typing import Optional

try:
    from markdown_it import MarkdownIt
    HAS_MDIT = True
except ImportError:
    HAS_MDIT = False


# ---------------------------------------------------------------------------
# Normalize line endings
# ---------------------------------------------------------------------------

def normalize_crlf(text: str) -> tuple[str, bool]:
    """Normalize CRLF to LF. Returns (normalized_text, had_crlf)."""
    had_crlf = '\r\n' in text
    return text.replace('\r\n', '\n').replace('\r', '\n'), had_crlf


def restore_crlf(text: str, had_crlf: bool) -> str:
    """Restore CRLF if the original had it."""
    if had_crlf:
        return text.replace('\n', '\r\n')
    return text


# ---------------------------------------------------------------------------
# MD5 Hashing
# ---------------------------------------------------------------------------

def compute_md5(file_path: str) -> str:
    """Compute MD5 hash of a file."""
    h = hashlib.md5()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            h.update(chunk)
    return h.hexdigest()


# ---------------------------------------------------------------------------
# MDX Preprocessing
# ---------------------------------------------------------------------------

# Patterns for lines that should not be parsed/translated
MDX_IMPORT_RE = re.compile(r'^import\s+.+from\s+[\'"].+[\'"];?\s*$')
MDX_EXPORT_RE = re.compile(r'^export\s+')
MDX_JSX_SELF_CLOSE_RE = re.compile(r'^<(\w+)\s*.*?/>\s*$')
MDX_JSX_OPEN_RE = re.compile(r'^<(\w+)[\s>]')
MDX_JSX_CLOSE_RE = re.compile(r'^</(\w+)>\s*$')

# Known Docusaurus/MDX component names
KNOWN_COMPONENTS = {
    'Tabs', 'TabItem', 'details', 'summary', 'Admonition',
    'CodeBlock', 'Quiz', 'DocCardList', 'Highlight', 'BrowserWindow',
}

# Admonition pattern: :::type optional title
ADMONITION_RE = re.compile(r'^(:{3,})(\w+)?\s*(.*)?$')

PROTECTED_LINE_PREFIX = '<!-- __MDX_PROTECTED_'
PROTECTED_LINE_SUFFIX = ' -->'
ADMONITION_MARKER_PREFIX = '<!-- __ADMONITION_'


def preprocess_mdx(body: str) -> tuple[str, dict, list]:
    """
    Preprocess MDX-specific syntax before CommonMark parsing.

    Protects:
    - import/export statements
    - JSX component opening/closing/self-closing tags
    - Admonition markers (:::note, :::tip, etc.)

    Returns:
        (processed_body, protected_lines, admonition_info)
        - protected_lines: {line_index: original_line}
        - admonition_info: [{line_index, marker, type, title, is_close}]
    """
    lines = body.split('\n')
    protected = {}
    admonitions = []

    for i, line in enumerate(lines):
        stripped = line.strip()

        if not stripped:
            continue

        # Protect import statements
        if MDX_IMPORT_RE.match(stripped):
            protected[i] = line
            lines[i] = f'{PROTECTED_LINE_PREFIX}{i}{PROTECTED_LINE_SUFFIX}'
            continue

        # Protect export statements
        if MDX_EXPORT_RE.match(stripped):
            protected[i] = line
            lines[i] = f'{PROTECTED_LINE_PREFIX}{i}{PROTECTED_LINE_SUFFIX}'
            continue

        # Detect admonition markers
        am = ADMONITION_RE.match(stripped)
        if am:
            colons = am.group(1)
            adm_type = am.group(2) or ''
            adm_title = (am.group(3) or '').strip()
            is_close = not adm_type and not adm_title  # bare ::: is closing

            admonitions.append({
                'line_index': i,
                'marker': colons,
                'type': adm_type,
                'title': adm_title,
                'is_close': is_close,
            })
            # Replace with HTML comment so parser skips it
            lines[i] = f'{ADMONITION_MARKER_PREFIX}{i}{PROTECTED_LINE_SUFFIX}'
            continue

        # Protect JSX self-closing tags: <Component />
        if MDX_JSX_SELF_CLOSE_RE.match(stripped):
            protected[i] = line
            lines[i] = f'{PROTECTED_LINE_PREFIX}{i}{PROTECTED_LINE_SUFFIX}'
            continue

        # Protect JSX opening tags for known components: <Tabs>, <TabItem ...>
        jm = MDX_JSX_OPEN_RE.match(stripped)
        if jm and jm.group(1) in KNOWN_COMPONENTS:
            protected[i] = line
            lines[i] = f'{PROTECTED_LINE_PREFIX}{i}{PROTECTED_LINE_SUFFIX}'
            continue

        # Protect JSX closing tags for known components: </Tabs>
        cm = MDX_JSX_CLOSE_RE.match(stripped)
        if cm and cm.group(1) in KNOWN_COMPONENTS:
            protected[i] = line
            lines[i] = f'{PROTECTED_LINE_PREFIX}{i}{PROTECTED_LINE_SUFFIX}'
            continue

    return '\n'.join(lines), protected, admonitions


def postprocess_mdx(body: str, protected: dict, admonitions: list,
                    adm_translations: dict = None) -> str:
    """
    Restore MDX-specific lines after reassembly.

    Args:
        body: The reassembled body text
        protected: {line_index: original_line} from preprocess_mdx
        admonitions: list from preprocess_mdx
        adm_translations: {line_index: translated_title} for admonition titles
    """
    lines = body.split('\n')
    adm_translations = adm_translations or {}

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Restore protected MDX lines
        if stripped.startswith(PROTECTED_LINE_PREFIX):
            # Extract the original line index from the marker
            try:
                idx_str = stripped[len(PROTECTED_LINE_PREFIX):-len(PROTECTED_LINE_SUFFIX)]
                orig_idx = int(idx_str)
                if orig_idx in protected:
                    lines[i] = protected[orig_idx]
            except (ValueError, KeyError):
                pass  # Leave the comment if we can't restore
            continue

        # Restore admonition markers
        if stripped.startswith(ADMONITION_MARKER_PREFIX):
            try:
                idx_str = stripped[len(ADMONITION_MARKER_PREFIX):-len(PROTECTED_LINE_SUFFIX)]
                orig_idx = int(idx_str)
                adm = next((a for a in admonitions if a['line_index'] == orig_idx), None)
                if adm:
                    if adm['is_close']:
                        lines[i] = adm['marker']
                    else:
                        title = adm_translations.get(orig_idx, adm['title'])
                        if title:
                            lines[i] = f"{adm['marker']}{adm['type']} {title}"
                        elif adm['type']:
                            lines[i] = f"{adm['marker']}{adm['type']}"
                        else:
                            lines[i] = adm['marker']
            except (ValueError, StopIteration):
                pass
            continue

    return '\n'.join(lines)


# ---------------------------------------------------------------------------
# YAML Frontmatter (Improved)
# ---------------------------------------------------------------------------

def split_frontmatter(text: str) -> tuple[str, str]:
    """Split YAML frontmatter from body. Returns (frontmatter, body).
    frontmatter includes the --- delimiters. Empty string if none."""
    m = re.match(r'^(---\n.*?\n---\n)', text, re.DOTALL)
    if m:
        return m.group(1), text[m.end():]
    return "", text


def extract_frontmatter_segments(frontmatter: str) -> list[dict]:
    """Extract translatable key-value pairs from YAML frontmatter.

    Handles:
    - Simple key: value pairs
    - Quoted values (single and double)
    - Multi-line scalar values (key: > or key: |)
    - Skips arrays, objects, dates, numbers, booleans
    """
    if not frontmatter:
        return []

    segments = []
    inner = frontmatter.strip().split('\n')[1:-1]  # Strip --- delimiters

    # Translatable keys (values should be translated)
    TRANSLATABLE_KEYS = {
        'title', 'description', 'sidebar_label', 'keywords',
        'abstract', 'summary',
    }
    # Keys to always skip (even if they look like text)
    SKIP_KEYS = {
        'slug', 'sidebar_position', 'id', 'pagination_label',
        'custom_edit_url', 'image', 'hide_title', 'hide_table_of_contents',
        'draft', 'last_update', 'date', 'tags', 'authors',
    }

    i = 0
    while i < len(inner):
        line = inner[i]

        # Match key: value on a single line
        m = re.match(r'^(\s*)([\w][\w_-]*)\s*:\s*(.*)$', line)
        if not m:
            i += 1
            continue

        indent = m.group(1)
        key = m.group(2).strip()
        rest = m.group(3).strip()

        # Skip non-translatable keys
        if key.lower() in SKIP_KEYS:
            i += 1
            # Skip continuation lines for multi-line values
            while i < len(inner) and (inner[i].startswith('  ') or not inner[i].strip()):
                i += 1
            continue

        # Only translate known translatable keys
        if key.lower() not in TRANSLATABLE_KEYS:
            # For unknown keys, only translate if the value looks like prose
            if not rest or _is_non_translatable_yaml(rest):
                i += 1
                continue

        # Handle multi-line scalar (> or |)
        if rest in ('>', '|', '>-', '|-'):
            # Collect continuation lines
            multi_lines = []
            j = i + 1
            while j < len(inner):
                next_line = inner[j]
                # Multi-line continues while indented more than the key
                if next_line.strip() and not next_line.startswith('  '):
                    break
                if next_line.strip():
                    multi_lines.append(next_line.strip())
                j += 1

            if multi_lines:
                full_value = ' '.join(multi_lines) if rest.startswith('>') else '\n'.join(multi_lines)
                segments.append({
                    "id": f"fm_{i}",
                    "key": key,
                    "original": full_value,
                    "translated": "",
                    "context": "frontmatter",
                    "line_in_fm": i,
                    "multiline": rest,  # > or | or >- or |-
                    "multiline_end": j - 1,
                    "quote_char": "",
                })
            i = j
            continue

        # Handle array values (key: [item1, item2]) - skip
        if rest.startswith('[') or rest.startswith('{'):
            i += 1
            continue

        # Handle array continuation (key:\n  - item) - skip
        if not rest:
            i += 1
            # Check if next lines are array items
            if i < len(inner) and re.match(r'^\s+-\s', inner[i]):
                while i < len(inner) and (inner[i].startswith('  ') or not inner[i].strip()):
                    i += 1
            continue

        # Strip quotes
        raw_value = rest
        quote_char = ""
        if (rest.startswith('"') and rest.endswith('"')) or \
           (rest.startswith("'") and rest.endswith("'")):
            quote_char = rest[0]
            raw_value = rest[1:-1]

        # Skip non-translatable values
        if _is_non_translatable_yaml(raw_value):
            i += 1
            continue

        segments.append({
            "id": f"fm_{i}",
            "key": key,
            "original": raw_value,
            "translated": "",
            "context": "frontmatter",
            "line_in_fm": i,
            "quote_char": quote_char,
        })
        i += 1

    return segments


def _is_non_translatable_yaml(value: str) -> bool:
    """Check if a YAML value should not be translated."""
    v = value.strip()
    if not v:
        return True
    # Pure numbers
    if re.match(r'^[\d.]+$', v):
        return True
    # Dates
    if re.match(r'^\d{4}-\d{2}', v):
        return True
    # Booleans
    if v.lower() in ('true', 'false', 'yes', 'no', 'null', 'none'):
        return True
    # URLs / paths
    if re.match(r'^(https?://|/|\.\.?/)', v):
        return True
    return False


def reassemble_frontmatter(frontmatter: str, fm_segments: list[dict]) -> str:
    """Replace translated values in frontmatter."""
    if not frontmatter or not fm_segments:
        return frontmatter

    lines = frontmatter.split('\n')
    inner_start = 1  # After opening ---

    fm_lookup = {}
    for seg in fm_segments:
        if seg.get("translated"):
            fm_lookup[seg["line_in_fm"]] = seg

    for idx, seg in fm_lookup.items():
        line_idx = inner_start + idx
        if line_idx >= len(lines):
            continue

        # Handle multi-line values
        if seg.get("multiline"):
            # The key line stays the same (key: > or key: |)
            # Replace the continuation lines
            multi_end = seg.get("multiline_end", idx)
            end_line_idx = inner_start + multi_end

            translated = seg["translated"]
            if seg["multiline"].startswith('>'):
                # Folded scalar: wrap as indented lines
                trans_lines = translated.split(' ')
                # Group into ~80 char lines
                wrapped = []
                current = "  "
                for word in trans_lines:
                    if len(current) + len(word) + 1 > 80 and len(current) > 2:
                        wrapped.append(current)
                        current = "  " + word
                    else:
                        current += (" " if len(current) > 2 else "") + word
                if current.strip():
                    wrapped.append(current)
            else:
                # Literal scalar: keep line breaks
                wrapped = ["  " + l for l in translated.split('\n')]

            # Replace continuation lines
            lines[line_idx + 1:end_line_idx + 1] = wrapped
            continue

        # Simple key: value
        m = re.match(r'^(\s*)([\w][\w_-]*)\s*:\s*(.*)$', lines[line_idx])
        if m:
            indent, key = m.group(1), m.group(2)
            q = seg.get("quote_char", "")
            lines[line_idx] = f"{indent}{key}: {q}{seg['translated']}{q}"

    return '\n'.join(lines)


# ---------------------------------------------------------------------------
# AST-based segment extraction
# ---------------------------------------------------------------------------

def create_parser() -> 'MarkdownIt':
    """Create a configured markdown-it-py parser."""
    if not HAS_MDIT:
        print("ERROR: markdown-it-py is required. Install with: pip install markdown-it-py")
        sys.exit(1)
    return MarkdownIt('commonmark', {'breaks': False}).enable('table')


def extract_segments_ast(body: str, admonitions: list = None) -> tuple[list[dict], list[dict]]:
    """
    Use markdown-it-py AST to extract translatable segments.

    Each segment preserves the raw inline Markdown (bold, italic, links, etc.)
    so that reassembly can do a direct replacement without losing formatting.

    Returns:
        (body_segments, admonition_segments)
        - admonition_segments: titles that need translation
    """
    md = create_parser()
    tokens = md.parse(body)
    lines = body.split('\n')
    segments = []
    adm_segments = []
    seg_id = 0

    # Extract admonition titles as separate segments
    if admonitions:
        for adm in admonitions:
            if adm['title'] and not adm['is_close']:
                adm_segments.append({
                    "id": f"adm_{adm['line_index']}",
                    "type": "admonition_title",
                    "admonition_type": adm['type'],
                    "original": adm['title'],
                    "translated": "",
                    "line_index": adm['line_index'],
                    "context": f"admonition_{adm['type']}",
                })

    # Track context stack for nested structures
    context_stack = []
    in_table = False
    table_row_cells = []

    i = 0
    while i < len(tokens):
        tok = tokens[i]

        # --- Context tracking ---
        if tok.type == 'blockquote_open':
            context_stack.append('blockquote')
        elif tok.type == 'blockquote_close':
            if context_stack and context_stack[-1] == 'blockquote':
                context_stack.pop()
        elif tok.type == 'bullet_list_open':
            context_stack.append('bullet_list')
        elif tok.type == 'bullet_list_close':
            if context_stack and context_stack[-1] == 'bullet_list':
                context_stack.pop()
        elif tok.type == 'ordered_list_open':
            context_stack.append('ordered_list')
        elif tok.type == 'ordered_list_close':
            if context_stack and context_stack[-1] == 'ordered_list':
                context_stack.pop()

        # --- Skip non-translatable blocks ---
        elif tok.type in ('hr', 'fence', 'code_block'):
            pass

        # --- HTML blocks (includes our protected lines) ---
        elif tok.type == 'html_block':
            html_content = tok.content.strip()
            # Skip our protected MDX lines
            if html_content.startswith(PROTECTED_LINE_PREFIX) or \
               html_content.startswith(ADMONITION_MARKER_PREFIX):
                i += 1
                continue
            # Extract visible text from real HTML
            text_only = re.sub(r'<[^>]+>', '', html_content).strip()
            if text_only:
                segments.append({
                    "id": seg_id,
                    "type": "html_block",
                    "original": html_content,
                    "translated": "",
                    "line_start": tok.map[0] if tok.map else None,
                    "line_end": tok.map[1] if tok.map else None,
                    "context": "html",
                })
                seg_id += 1

        # --- Table handling ---
        elif tok.type == 'table_open':
            in_table = True
        elif tok.type == 'table_close':
            in_table = False
        elif tok.type == 'tr_open':
            table_row_cells = []
        elif tok.type == 'tr_close':
            if table_row_cells:
                row_line = table_row_cells[0].get("_line")
                segments.append({
                    "id": seg_id,
                    "type": "table_row",
                    "cells": [{"original": c["original"], "translated": ""} for c in table_row_cells],
                    "line_start": row_line,
                    "line_end": row_line + 1 if row_line is not None else None,
                    "context": "table",
                })
                seg_id += 1
                table_row_cells = []

        # --- Inline content (the actual text) ---
        elif tok.type == 'inline':
            content = tok.content
            if not content or not content.strip():
                i += 1
                continue

            line_start = tok.map[0] if tok.map else None
            line_end = tok.map[1] if tok.map else None

            if in_table:
                table_row_cells.append({
                    "original": content,
                    "_line": line_start,
                })
                i += 1
                continue

            ctx = _determine_context(context_stack, tokens, i)

            if _is_non_translatable(content):
                i += 1
                continue

            segments.append({
                "id": seg_id,
                "type": "inline",
                "original": content,
                "translated": "",
                "line_start": line_start,
                "line_end": line_end,
                "context": ctx,
            })
            seg_id += 1

        i += 1

    return segments, adm_segments


def _determine_context(context_stack: list, tokens: list, idx: int) -> str:
    """Determine the context type for an inline token."""
    if idx > 0:
        prev = tokens[idx - 1]
        if prev.type == 'heading_open':
            return f"heading_h{prev.tag[1]}" if prev.tag else "heading"
        if prev.type == 'paragraph_open':
            if 'blockquote' in context_stack:
                return "blockquote"
            if 'bullet_list' in context_stack or 'ordered_list' in context_stack:
                return "list_item"
            return "paragraph"
        if prev.type in ('th_open', 'td_open'):
            return "table_cell"
    return "paragraph"


def _is_non_translatable(content: str) -> bool:
    """Check if content is purely non-translatable."""
    stripped = content.strip()
    # Pure math formula
    if re.match(r'^[\d\s+\-*/=^().a-zA-Z]+$', stripped) and \
       re.search(r'[=+\-*/^]', stripped) and \
       not re.search(r'[a-zA-Z]{4,}', stripped):
        return True
    # Pure number/version
    if re.match(r'^[\d.]+$', stripped):
        return True
    # Protected line markers (shouldn't reach here, but safety check)
    if stripped.startswith(PROTECTED_LINE_PREFIX) or \
       stripped.startswith(ADMONITION_MARKER_PREFIX):
        return True
    return False


# ---------------------------------------------------------------------------
# Reassembly
# ---------------------------------------------------------------------------

def reassemble_body(original_body: str, segments: list[dict]) -> str:
    """
    Reassemble the Markdown body by replacing inline content at the correct
    line positions. Preserves all non-translatable lines exactly.
    """
    lines = original_body.split('\n')
    md = create_parser()

    seg_map = {}
    for seg in segments:
        if not seg.get("translated") and seg["type"] != "table_row":
            continue
        if seg["type"] == "table_row":
            if not any(c.get("translated") for c in seg.get("cells", [])):
                continue
        ls = seg.get("line_start")
        if ls is not None:
            seg_map.setdefault(ls, []).append(seg)

    result = []
    i = 0
    in_code_block = False

    while i < len(lines):
        line = lines[i]

        # Track fenced code blocks
        if re.match(r'^(\s*)(```+|~~~+)', line):
            in_code_block = not in_code_block
            result.append(line)
            i += 1
            continue

        if in_code_block:
            result.append(line)
            i += 1
            continue

        if i in seg_map:
            for seg in seg_map[i]:
                if seg["type"] == "table_row":
                    new_line = _rebuild_table_row(line, seg)
                    lines[i] = new_line
                elif seg["type"] == "html_block" and seg.get("translated"):
                    line_start = seg["line_start"]
                    line_end = seg["line_end"]
                    new_html_lines = seg["translated"].split('\n')
                    lines[line_start:line_end] = new_html_lines
                    diff = len(new_html_lines) - (line_end - line_start)
                    if diff != 0:
                        _adjust_seg_map(seg_map, line_start, diff)
                elif seg["type"] == "inline" and seg.get("translated"):
                    line_start = seg["line_start"]
                    line_end = seg["line_end"]
                    original_content = seg["original"]
                    translated_content = seg["translated"]

                    seg_lines = lines[line_start:line_end]
                    original_text = '\n'.join(seg_lines)

                    new_text = _replace_inline_content(
                        original_text, original_content, translated_content
                    )
                    new_lines = new_text.split('\n')

                    lines[line_start:line_end] = new_lines
                    diff = len(new_lines) - (line_end - line_start)
                    if diff != 0:
                        _adjust_seg_map(seg_map, line_start, diff)

            result.append(lines[i])
        else:
            result.append(lines[i])
        i += 1

    return '\n'.join(result)


def _rebuild_table_row(original_line: str, seg: dict) -> str:
    """Rebuild a table row line with translated cell content."""
    cells = seg.get("cells", [])
    stripped = original_line.strip()
    parts = stripped.split('|')

    content_start = 1 if parts[0].strip() == '' else 0
    content_end = len(parts) - 1 if parts[-1].strip() == '' else len(parts)
    content_parts = parts[content_start:content_end]

    for j, cell in enumerate(cells):
        if j < len(content_parts) and cell.get("translated"):
            orig = content_parts[j]
            pad_left = len(orig) - len(orig.lstrip())
            pad_right = len(orig) - len(orig.rstrip())
            pad_l = orig[:pad_left] if pad_left else ' '
            pad_r = orig[len(orig) - pad_right:] if pad_right else ' '
            content_parts[j] = f"{pad_l}{cell['translated']}{pad_r}"

    parts[content_start:content_end] = content_parts
    return '|'.join(parts)


def _replace_inline_content(original_text: str, original_content: str,
                            translated_content: str) -> str:
    """
    Replace the inline content within a block of text.

    Detects the structural prefix (heading, blockquote, list marker)
    and preserves it while replacing the content.
    """
    lines = original_text.split('\n')
    first_line = lines[0]
    indent = first_line[:len(first_line) - len(first_line.lstrip())]
    stripped = first_line.lstrip()

    # Heading: ## Content
    hm = re.match(r'^(#{1,6}\s+)', stripped)
    if hm:
        return indent + hm.group(1) + translated_content

    # Blockquote: > Content (possibly nested > > Content)
    bq = re.match(r'^((?:>\s*)+)', stripped)
    if bq:
        prefix = bq.group(1)
        translated_lines = translated_content.split('\n')
        result = [indent + prefix + translated_lines[0]]
        for tl in translated_lines[1:]:
            result.append(indent + prefix + tl)
        return '\n'.join(result)

    # List item: - Content or 1. Content or * Content or + Content
    lm = re.match(r'^(\s*(?:[-*+]|\d+\.)\s+)', first_line)
    if lm:
        prefix = lm.group(1)
        return prefix + translated_content

    # Default paragraph
    translated_lines = translated_content.split('\n')
    result = [indent + translated_lines[0]]
    for tl in translated_lines[1:]:
        result.append(indent + tl)
    return '\n'.join(result)


def _adjust_seg_map(seg_map: dict, after_line: int, diff: int) -> None:
    """Adjust segment line numbers after a line count change."""
    if diff == 0:
        return
    keys_to_adjust = [k for k in seg_map if k > after_line]
    for k in sorted(keys_to_adjust, reverse=(diff > 0)):
        seg_map[k + diff] = seg_map.pop(k)
        for seg in seg_map[k + diff]:
            if seg.get("line_start") is not None:
                seg["line_start"] += diff
            if seg.get("line_end") is not None:
                seg["line_end"] += diff


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate_translation(original_path: str, translated_path: str) -> list[str]:
    """
    Validate a translated Markdown file against the original.
    Returns a list of issues found.
    """
    md = create_parser()

    try:
        orig_text = Path(original_path).read_text(encoding='utf-8')
    except FileNotFoundError:
        return [f"ERROR: Original file not found: {original_path}"]
    except UnicodeDecodeError:
        return [f"ERROR: Cannot read original file (encoding issue): {original_path}"]

    try:
        trans_text = Path(translated_path).read_text(encoding='utf-8')
    except FileNotFoundError:
        return [f"ERROR: Translated file not found: {translated_path}"]
    except UnicodeDecodeError:
        return [f"ERROR: Cannot read translated file (encoding issue): {translated_path}"]

    orig_text, _ = normalize_crlf(orig_text)
    trans_text, _ = normalize_crlf(trans_text)

    # Check for empty files
    if not orig_text.strip():
        return ["WARNING: Original file is empty"]
    if not trans_text.strip():
        return ["ERROR: Translated file is empty"]

    issues = []

    # 1. Check frontmatter structure
    orig_fm, orig_body = split_frontmatter(orig_text)
    trans_fm, trans_body = split_frontmatter(trans_text)

    if bool(orig_fm) != bool(trans_fm):
        issues.append("FRONTMATTER: Original has frontmatter but translated does not (or vice versa)")
    elif orig_fm and trans_fm:
        orig_keys = re.findall(r'^(\s*[\w][\w_-]*)\s*:', orig_fm, re.MULTILINE)
        trans_keys = re.findall(r'^(\s*[\w][\w_-]*)\s*:', trans_fm, re.MULTILINE)
        if orig_keys != trans_keys:
            issues.append(f"FRONTMATTER: Key mismatch. Original: {orig_keys}, Translated: {trans_keys}")

    # Preprocess MDX before parsing (strip out MDX lines for fair comparison)
    orig_body_clean, _, _ = preprocess_mdx(orig_body)
    trans_body_clean, _, _ = preprocess_mdx(trans_body)

    # 2. Parse both and compare structure
    orig_tokens = md.parse(orig_body_clean)
    trans_tokens = md.parse(trans_body_clean)

    orig_structure = [t.type for t in orig_tokens if t.type != 'inline']
    trans_structure = [t.type for t in trans_tokens if t.type != 'inline']

    if orig_structure != trans_structure:
        issues.append(f"STRUCTURE: Block structure mismatch. "
                      f"Original has {len(orig_structure)} blocks, "
                      f"translated has {len(trans_structure)}")
        for j, (a, b) in enumerate(zip(orig_structure, trans_structure)):
            if a != b:
                issues.append(f"  First diff at position {j}: original='{a}', translated='{b}'")
                break

    # 3. Check code blocks are identical
    orig_code = _extract_code_blocks(orig_tokens)
    trans_code = _extract_code_blocks(trans_tokens)

    if len(orig_code) != len(trans_code):
        issues.append(f"CODE: Different number of code blocks. "
                      f"Original: {len(orig_code)}, Translated: {len(trans_code)}")
    else:
        for j, (oc, tc) in enumerate(zip(orig_code, trans_code)):
            if oc != tc:
                issues.append(f"CODE: Code block {j} content differs (code should NOT be translated)")

    # 4. Check links preserved
    orig_links = _extract_links(orig_tokens)
    trans_links = _extract_links(trans_tokens)

    if orig_links != trans_links:
        missing = set(orig_links) - set(trans_links)
        added = set(trans_links) - set(orig_links)
        if missing:
            issues.append(f"LINKS: Missing URLs: {missing}")
        if added:
            issues.append(f"LINKS: Added URLs: {added}")

    # 5. Check image sources preserved
    orig_imgs = _extract_images(orig_tokens)
    trans_imgs = _extract_images(trans_tokens)

    if orig_imgs != trans_imgs:
        issues.append(f"IMAGES: Image sources changed. "
                      f"Original: {orig_imgs}, Translated: {trans_imgs}")

    # 6. Check table structure
    orig_tables = _count_table_structure(orig_tokens)
    trans_tables = _count_table_structure(trans_tokens)

    if orig_tables != trans_tables:
        issues.append(f"TABLES: Structure mismatch. "
                      f"Original: {orig_tables}, Translated: {trans_tables}")

    # 7. Check heading count and levels
    orig_headings = [t.tag for t in orig_tokens if t.type == 'heading_open']
    trans_headings = [t.tag for t in trans_tokens if t.type == 'heading_open']

    if len(orig_headings) != len(trans_headings):
        issues.append(f"HEADINGS: Count mismatch. "
                      f"Original: {len(orig_headings)}, Translated: {len(trans_headings)}")
    elif orig_headings != trans_headings:
        issues.append(f"HEADINGS: Level mismatch. "
                      f"Original: {orig_headings}, Translated: {trans_headings}")

    # 8. Check inline code preserved
    orig_inline_code = _extract_inline_code(orig_tokens)
    trans_inline_code = _extract_inline_code(trans_tokens)

    if orig_inline_code != trans_inline_code:
        missing_code = set(orig_inline_code) - set(trans_inline_code)
        if missing_code:
            issues.append(f"INLINE_CODE: Missing inline code: {missing_code}")

    # 9. Check admonition markers preserved (compare raw text)
    orig_adm = re.findall(r'^(:{3,}\w+)', orig_body, re.MULTILINE)
    trans_adm = re.findall(r'^(:{3,}\w+)', trans_body, re.MULTILINE)
    if orig_adm != trans_adm:
        issues.append(f"ADMONITIONS: Marker mismatch. "
                      f"Original: {orig_adm}, Translated: {trans_adm}")

    if not issues:
        issues.append("OK: No structural issues found")

    return issues


def _extract_code_blocks(tokens: list) -> list[str]:
    return [t.content for t in tokens if t.type in ('fence', 'code_block')]


def _extract_links(tokens: list) -> list[str]:
    urls = []
    for t in tokens:
        if t.type == 'inline' and t.children:
            for c in t.children:
                if c.type == 'link_open' and c.attrs:
                    href = c.attrs.get('href', '')
                    if href:
                        urls.append(href)
    return urls


def _extract_images(tokens: list) -> list[str]:
    srcs = []
    for t in tokens:
        if t.type == 'inline' and t.children:
            for c in t.children:
                if c.type == 'image' and c.attrs:
                    src = c.attrs.get('src', '')
                    if src:
                        srcs.append(src)
    return srcs


def _extract_inline_code(tokens: list) -> list[str]:
    codes = []
    for t in tokens:
        if t.type == 'inline' and t.children:
            for c in t.children:
                if c.type == 'code_inline':
                    codes.append(c.content)
    return codes


def _count_table_structure(tokens: list) -> list[tuple]:
    tables = []
    current_rows = 0
    current_cells = 0
    in_table = False
    for t in tokens:
        if t.type == 'table_open':
            in_table = True
            current_rows = 0
            current_cells = 0
        elif t.type == 'table_close':
            tables.append((current_rows, current_cells))
            in_table = False
        elif t.type == 'tr_open' and in_table:
            current_rows += 1
        elif t.type in ('th_open', 'td_open') and in_table:
            current_cells += 1
    return tables


# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------

def cmd_extract(input_path: str, output_path: str, lang: str = ""):
    """Extract translatable segments to JSON."""
    try:
        md_text = Path(input_path).read_text(encoding='utf-8')
    except FileNotFoundError:
        print(f"ERROR: File not found: {input_path}")
        sys.exit(1)
    except UnicodeDecodeError:
        print(f"ERROR: Cannot read file (try UTF-8 encoding): {input_path}")
        sys.exit(1)

    if not md_text.strip():
        print(f"WARNING: File is empty: {input_path}")
        result = {
            "source_file": str(Path(input_path).resolve()),
            "source_md5": compute_md5(input_path),
            "target_language": lang,
            "had_crlf": False,
            "total_segments": 0,
            "frontmatter_segments": [],
            "body_segments": [],
            "admonition_segments": [],
        }
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        Path(output_path).write_text(
            json.dumps(result, ensure_ascii=False, indent=2),
            encoding='utf-8'
        )
        print(f"Empty file — 0 segments extracted to {output_path}")
        return

    md_text, had_crlf = normalize_crlf(md_text)

    frontmatter, body = split_frontmatter(md_text)
    fm_segments = extract_frontmatter_segments(frontmatter)

    # Preprocess MDX before parsing
    processed_body, protected_lines, admonitions = preprocess_mdx(body)
    body_segments, adm_segments = extract_segments_ast(processed_body, admonitions)

    result = {
        "source_file": str(Path(input_path).resolve()),
        "source_md5": compute_md5(input_path),
        "target_language": lang,
        "had_crlf": had_crlf,
        "total_segments": len(fm_segments) + len(body_segments) + len(adm_segments),
        "frontmatter_segments": fm_segments,
        "body_segments": body_segments,
        "admonition_segments": adm_segments,
        "mdx_protected_lines": {str(k): v for k, v in protected_lines.items()},
        "admonition_markers": admonitions,
    }

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(output_path).write_text(
        json.dumps(result, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )
    total = result['total_segments']
    print(f"Extracted {total} translatable segments to {output_path}")
    if adm_segments:
        print(f"  (includes {len(adm_segments)} admonition title(s))")
    if protected_lines:
        print(f"  (protected {len(protected_lines)} MDX line(s) from translation)")


def cmd_reassemble(input_path: str, translated_json_path: str, output_path: str):
    """Reassemble Markdown with translated segments."""
    try:
        md_text = Path(input_path).read_text(encoding='utf-8')
    except FileNotFoundError:
        print(f"ERROR: Source file not found: {input_path}")
        sys.exit(1)

    try:
        translated = json.loads(Path(translated_json_path).read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f"ERROR: Translated JSON not found: {translated_json_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON in {translated_json_path}: {e}")
        sys.exit(1)

    md_text, had_crlf = normalize_crlf(md_text)

    if "had_crlf" in translated:
        had_crlf = translated["had_crlf"]

    frontmatter, body = split_frontmatter(md_text)

    # Reassemble frontmatter
    new_frontmatter = reassemble_frontmatter(
        frontmatter, translated.get("frontmatter_segments", [])
    )

    # Preprocess body for MDX
    processed_body, protected_lines, admonitions = preprocess_mdx(body)

    # Override with stored MDX data if available
    if "mdx_protected_lines" in translated:
        protected_lines = {int(k): v for k, v in translated["mdx_protected_lines"].items()}
    if "admonition_markers" in translated:
        admonitions = translated["admonition_markers"]

    # Reassemble body segments
    new_body = reassemble_body(processed_body, translated.get("body_segments", []))

    # Build admonition title translations
    adm_translations = {}
    for adm_seg in translated.get("admonition_segments", []):
        if adm_seg.get("translated"):
            adm_translations[adm_seg["line_index"]] = adm_seg["translated"]

    # Restore MDX lines and admonition markers
    new_body = postprocess_mdx(new_body, protected_lines, admonitions, adm_translations)

    result = new_frontmatter + new_body
    result = restore_crlf(result, had_crlf)

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(output_path).write_text(result, encoding='utf-8')
    print(f"Reassembled translated Markdown to {output_path}")


def cmd_validate(original_path: str, translated_path: str):
    """Validate translated Markdown against original."""
    issues = validate_translation(original_path, translated_path)
    for issue in issues:
        if issue.startswith("OK:"):
            prefix = "PASS"
        elif issue.startswith("WARNING:"):
            prefix = "WARN"
        elif issue.startswith("ERROR:"):
            prefix = "FAIL"
        else:
            prefix = "FAIL"
        print(f"[{prefix}] {issue}")

    has_errors = any(not i.startswith("OK:") and not i.startswith("WARNING:") for i in issues)
    if has_errors:
        error_count = sum(1 for i in issues if not i.startswith("OK:") and not i.startswith("WARNING:"))
        print(f"\nFound {error_count} issue(s)")
        sys.exit(1)
    else:
        print("\nValidation passed")


def cmd_batch(input_dir: str, output_dir: str, lang: str = ""):
    """Extract segments from all .md/.mdx files in a directory."""
    in_path = Path(input_dir)
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    md_files = sorted(list(in_path.rglob('*.md')) + list(in_path.rglob('*.mdx')))
    # Skip README files
    md_files = [f for f in md_files if f.name.upper() != 'README.MD']

    if not md_files:
        print(f"No .md/.mdx files found in {input_dir}")
        sys.exit(1)

    print(f"Found {len(md_files)} Markdown files")
    errors = []

    for md_file in md_files:
        rel = md_file.relative_to(in_path)
        json_out = out_path / rel.with_suffix('.json')
        json_out.parent.mkdir(parents=True, exist_ok=True)

        print(f"  Extracting: {rel}")
        try:
            cmd_extract(str(md_file), str(json_out), lang)
        except SystemExit:
            errors.append(str(rel))
            print(f"  WARNING: Failed to extract {rel}, skipping")

    print(f"\nBatch extraction complete. Output in {output_dir}")
    if errors:
        print(f"  {len(errors)} file(s) had errors: {errors}")


def cmd_status(target: str):
    """Compute MD5 hashes for source file(s). Manifest helper."""
    target_path = Path(target)

    if target_path.is_file():
        md5 = compute_md5(target)
        print(f"{md5}  {target}")
    elif target_path.is_dir():
        md_files = sorted(
            list(target_path.rglob('*.md')) + list(target_path.rglob('*.mdx'))
        )
        md_files = [f for f in md_files if f.name.upper() != 'README.MD']

        if not md_files:
            print(f"No .md/.mdx files found in {target}")
            return

        for md_file in md_files:
            md5 = compute_md5(str(md_file))
            rel = md_file.relative_to(target_path)
            print(f"{md5}  {rel}")

        print(f"\n{len(md_files)} file(s) scanned")
    else:
        print(f"ERROR: Path not found: {target}")
        sys.exit(1)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def print_usage():
    print(__doc__)


def main():
    if len(sys.argv) < 2:
        print_usage()
        sys.exit(1)

    command = sys.argv[1]

    if command == "extract":
        if len(sys.argv) < 4:
            print("Usage: translate_md.py extract <input.md> <output.json> [--lang <code>]")
            sys.exit(1)
        lang = ""
        if "--lang" in sys.argv:
            li = sys.argv.index("--lang")
            if li + 1 < len(sys.argv):
                lang = sys.argv[li + 1]
        cmd_extract(sys.argv[2], sys.argv[3], lang)

    elif command == "reassemble":
        if len(sys.argv) < 5:
            print("Usage: translate_md.py reassemble <input.md> <translated.json> <output.md>")
            sys.exit(1)
        cmd_reassemble(sys.argv[2], sys.argv[3], sys.argv[4])

    elif command == "validate":
        if len(sys.argv) < 4:
            print("Usage: translate_md.py validate <original.md> <translated.md>")
            sys.exit(1)
        cmd_validate(sys.argv[2], sys.argv[3])

    elif command == "batch":
        if len(sys.argv) < 4:
            print("Usage: translate_md.py batch <input_dir> <output_dir> [--lang <code>]")
            sys.exit(1)
        lang = ""
        if "--lang" in sys.argv:
            li = sys.argv.index("--lang")
            if li + 1 < len(sys.argv):
                lang = sys.argv[li + 1]
        cmd_batch(sys.argv[2], sys.argv[3], lang)

    elif command == "status":
        if len(sys.argv) < 3:
            print("Usage: translate_md.py status <file_or_dir>")
            sys.exit(1)
        cmd_status(sys.argv[2])

    else:
        print_usage()
        sys.exit(1)


if __name__ == "__main__":
    main()
