### Core Concept

The Claude Chrome extension pairs with Claude Desktop to extend agentic workflows to the browser—Claude Desktop does the reasoning, the extension executes the clicks and navigation—but browser automation is inherently slower than file operations and requires selective, security-conscious activation.

### Key Mental Models

- **Remote Control Architecture**: The extension does not work standalone. Claude Desktop reasons; the extension executes. Both must be connected for browser automation to function.
- **Browser vs. File Trade-off**: Use browser integration when data lives on the web; use file-based Cowork when data is already local. Overlapping both wastes time.
- **Selective Activation as Security Practice**: Activating the extension only on specific pages you choose—not by default everywhere—is the correct security posture, not a limitation.

### Critical Patterns

- Activate the extension per-page or per-site rather than globally; exclude sensitive sites like banking and password managers.
- Watch the extension highlight elements before Claude clicks—intervene immediately if something looks wrong.
- Start with single-page tasks (summarizing a page, filling one form) before attempting multi-page navigation workflows.
- Prefer file-based operations when data is already downloaded; reserve browser automation for tasks that genuinely require live web interaction.

### Common Mistakes

- Expecting browser automation to match file operation speed—page loads add 1-5 seconds per step by design, not because something is broken.
- Assuming Claude can handle MFA flows or CAPTCHAs automatically—these always require manual intervention.
- Activating the extension on all sites by default instead of selectively per trusted site.

### Connections

- **Builds on**: Cowork's propose-approve-execute pattern from Lesson 26
- **Leads to**: Plugins and Connectors, integrating external data sources beyond local files and the open web (Lesson 28)
