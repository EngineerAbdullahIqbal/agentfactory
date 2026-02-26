### Core Concept

Cowork ships with four pre-installed Skills for common document formats — docx, xlsx, pptx, and pdf — that activate automatically when you work with those file types. The critical constraint to memorize: the pdf Skill is read-only; it cannot create or edit files.

### Key Mental Models

- **Built-in = Format Mechanics, Custom = Domain Reasoning**: Built-in Skills handle file structure and formatting; custom Skills encode expertise. Combining both gives you format fidelity plus domain knowledge.
- **Capability Matrix as Decision Tool**: Not all Skills support all operations. Tracked changes only work in docx; formulas only in xlsx; pdf supports read but not create or edit.
- **Skill Composition**: A built-in Skill (docx) plus a custom Skill (legal contract review) produces output that neither could generate alone — properly formatted and domain-accurate.
- **Cross-App Orchestration**: Chaining Skills across formats (xlsx → pptx, PDF → docx) eliminates the manual glue work between applications. Individual Skills handle format mechanics; orchestration handles the pipeline.

### Critical Patterns

- Enable tracked changes when editing docx files so you review what changed rather than rewriting from scratch
- Back up xlsx files before any bulk modification, and test formula changes on a small sample first
- Provide an explicit outline when creating pptx files — structure input produces structure output
- Treat pdf as extraction-only reference material; verify important information against the original
- Chain built-in Skills across formats (e.g., analyze xlsx data then create pptx presentation) to eliminate manual export-reformat-import cycles

### Common Mistakes

- Asking Claude to create or edit a PDF — the pdf Skill reads only; it cannot write
- Expecting Claude to execute macros or VBA in Word documents — they are ignored, not run
- Treating built-in Skills and custom Skills as interchangeable — they serve different purposes and are most powerful when combined

### Connections

- **Builds on**: Lesson 28 (Plugins and Connectors — Skills as Plugin components), Lesson 29 (safety and limitations)
- **Leads to**: Final Cowork lesson on choosing between Claude Code and Claude Cowork
