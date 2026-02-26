### Core Concept
Safe, effective Cowork use rests on one security principle — folder access is your primary boundary — and one planning principle: know which limitations have workarounds today and which features are still coming.

### Key Mental Models
- **Folder Access as Security Boundary**: Granting Claude access to the wrong folder is the highest-risk mistake a new user can make. Dedicated workspaces prevent accidents before they happen.
- **Approval Workflow as Safety Net**: Before clicking approve, read the plan, review file lists, and check for red flags (deleting unmentioned files, unexpected folder access, unknown network requests).
- **Present vs. Future Capabilities**: General memory (available since late 2025) captures preferences automatically. Knowledge Bases — structured, curated repositories — are still coming. Plan accordingly.

### Critical Patterns
- Grant Claude access to a dedicated `~/cowork-workspace` folder, never the entire home directory
- Back up target folders before any bulk deletion or reorganization operation
- Create a `project-context.md` file in each workspace to provide detailed session continuity that general memory doesn't capture
- End complex sessions by summarizing progress in a notes file; start the next session by having Claude read it

### Common Mistakes
- Assuming Claude remembers nothing between sessions — general memory has been active since late 2025 and captures preferences and conventions automatically
- Treating prompt injection as a theoretical concern — any file from an untrusted source can contain instructions that manipulate Claude's behavior
- Confusing current limitations with the tool being unready — Cowork is production-capable within its current scope

### Connections
- **Builds on**: Lessons 24-28 (full Cowork chapter — agentic tasks, Skills, browser integration, Plugins)
- **Leads to**: Lesson 30 (Cowork built-in skills)
