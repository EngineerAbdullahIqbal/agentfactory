#!/usr/bin/env python3
"""
Fix Urdu translation YAML metadata - proper YAML-based version.

Machine-readable fields (bloom_level, category, digcomp_area, assessment_method)
must stay in English. User-facing fields (title, description, body) remain in Urdu.
"""

import sys
from pathlib import Path
from typing import Any


# Fields that MUST be in English (code-level, enums, etc.)
ENGLISH_ONLY_FIELDS = {
    "bloom_level",
    "category", 
    "digcomp_area",
    "assessment_method",
    "proficiency_level"
}


def extract_frontmatter_and_body(content: str) -> tuple[str, str]:
    """Extract YAML frontmatter and body content."""
    if not content.startswith("---"):
        return "", content
    
    lines = content.split("\n")
    yaml_end = -1
    
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            yaml_end = i
            break
    
    if yaml_end == -1:
        return "", content
    
    yaml_content = "\n".join(lines[1:yaml_end])
    body = "\n".join(lines[yaml_end + 1:])
    
    return yaml_content, body


def simple_yaml_fix(yaml_content: str, english_yaml_content: str) -> str:
    """
    Fix metadata fields using simple line-by-line parsing.
    Extract English values from reference and apply to Urdu.
    """
    
    # Build a map of field names to English values from the English YAML
    english_values = {}
    
    in_skills = False
    in_learning = False
    skill_index = -1
    objective_index = -1
    
    for line in english_yaml_content.split("\n"):
        stripped = line.strip()
        
        if stripped.startswith("skills:"):
            in_skills = True
            in_learning = False
            skill_index = 0
        elif stripped.startswith("learning_objectives:"):
            in_learning = True
            in_skills = False
            objective_index = 0
        elif stripped.startswith("- ") and (in_skills or in_learning):
            # New list item
            if in_skills:
                skill_index += 1
            else:
                objective_index += 1
        elif stripped and ":" in stripped and (in_skills or in_learning):
            parts = stripped.split(":", 1)
            field_name = parts[0].strip()
            
            if field_name in ENGLISH_ONLY_FIELDS and len(parts) > 1:
                value = parts[1].strip().strip('"\'')
                if in_skills:
                    key = f"skill_{skill_index}_{field_name}"
                else:
                    key = f"obj_{objective_index}_{field_name}"
                english_values[key] = value
    
    # Now apply these values to the Urdu YAML
    result_lines = []
    in_skills = False
    in_learning = False
    skill_index = -1
    objective_index = -1
    
    for line in yaml_content.split("\n"):
        stripped = line.strip()
        
        if stripped.startswith("skills:"):
            in_skills = True
            in_learning = False
            skill_index = 0
            result_lines.append(line)
        elif stripped.startswith("learning_objectives:"):
            in_learning = True
            in_skills = False
            objective_index = 0
            result_lines.append(line)
        elif stripped.startswith("- ") and (in_skills or in_learning):
            # New list item
            if in_skills:
                skill_index += 1
            else:
                objective_index += 1
            result_lines.append(line)
        elif stripped and ":" in stripped and (in_skills or in_learning):
            parts = stripped.split(":", 1)
            field_name = parts[0].strip()
            
            if field_name in ENGLISH_ONLY_FIELDS:
                if in_skills:
                    key = f"skill_{skill_index}_{field_name}"
                else:
                    key = f"obj_{objective_index}_{field_name}"
                
                if key in english_values:
                    # Replace with English value
                    indent = len(line) - len(stripped)
                    result_lines.append(" " * indent + f"{field_name}: \"{english_values[key]}\"")
                else:
                    result_lines.append(line)
            else:
                result_lines.append(line)
        else:
            result_lines.append(line)
    
    return "\n".join(result_lines)


def process_file(urdu_path: Path, english_path: Path) -> bool:
    """Process one Urdu file, fixing metadata from corresponding English file."""
    
    try:
        # Read files
        with open(english_path, "r", encoding="utf-8") as f:
            english_content = f.read()
        with open(urdu_path, "r", encoding="utf-8") as f:
            urdu_content = f.read()
        
        # Extract YAML and bodies
        eng_yaml_str, _ = extract_frontmatter_and_body(english_content)
        urdu_yaml_str, urdu_body = extract_frontmatter_and_body(urdu_content)
        
        # Fix metadata in Urdu YAML
        fixed_yaml_str = simple_yaml_fix(urdu_yaml_str, eng_yaml_str)
        
        # Reconstruct file
        fixed_content = f"---\n{fixed_yaml_str}\n---\n{urdu_body}"
        
        # Write back
        with open(urdu_path, "w", encoding="utf-8") as f:
            f.write(fixed_content)
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def get_english_path(urdu_path: Path) -> Path:
    """Convert Urdu i18n path to English docs path."""
    path_str = str(urdu_path)
    
    # Replace i18n structure with docs
    english_str = path_str.replace(
        "i18n\\ur\\docusaurus-plugin-content-docs\\current\\",
        "docs\\"
    ).replace(
        "i18n/ur/docusaurus-plugin-content-docs/current/",
        "docs/"
    )
    
    return Path(english_str)


def main():
    """Main entry point."""
    
    urdu_dir = Path("apps/learn-app/i18n/ur")
    
    if not urdu_dir.exists():
        print(f"❌ Directory not found: {urdu_dir}\n")
        sys.exit(1)
    
    # Find all Urdu lesson files
    urdu_files = [f for f in urdu_dir.rglob("*.md") if not f.name.endswith(".summary.md")]
    
    if not urdu_files:
        print("ℹ️  No Urdu lessons found\n")
        return
    
    print(f"\n📋 Processing {len(urdu_files)} Urdu lesson files...\n")
    
    success = 0
    failed = 0
    
    for urdu_file in sorted(urdu_files):
        english_file = get_english_path(urdu_file)
        
        if not english_file.exists():
            print(f"⏭️  Skipped {urdu_file.name:40} (English source not found)")
            failed += 1
            continue
        
        if process_file(urdu_file, english_file):
            print(f"✅ Fixed  {urdu_file.name:40}")
            success += 1
        else:
            print(f"❌ Failed {urdu_file.name:40}")
            failed += 1
    
    # Summary
    print(f"\n{'='*70}")
    print(f"✅ Fixed:    {success:3d}")
    print(f"❌ Failed:   {failed:3d}")
    print(f"{'='*70}\n")


if __name__ == "__main__":
    main()
