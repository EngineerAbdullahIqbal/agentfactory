### Core Concept

Setting up Claude Cowork is a one-time configuration of three things—installing the Desktop app, switching to the Cowork tab, and granting folder access—after which Claude can act on your files with your approval at each step.

### Key Mental Models

- **Folder Access as Security Boundary**: Claude can only see what you explicitly approve. A dedicated workspace folder, not your home directory, is the right starting scope.
- **Propose → Approve → Execute**: Reads happen automatically; every write, move, rename, or delete requires your explicit confirmation before Claude proceeds.
- **Workspace Design Before Tasking**: Setting up the right folder structure before starting a task makes Claude's context more accurate and outputs more reliable.

### Critical Patterns

- Switch to the Cowork tab (not Chat) to activate filesystem access—the folder access panel confirms you are in the right mode.
- Review the Execution Panel before approving—it shows exactly which files will change and how.
- Start with a dedicated test folder (`~/test-cowork`) before granting access to important documents.
- Use the Artifacts Panel to preview generated files before they are saved to disk.

### Common Mistakes

- Granting access to the entire home directory for convenience—use a project-specific folder to limit blast radius.
- Assuming Cowork mode is always active—you must explicitly select the Cowork tab each session.
- Approving operations without reading the execution plan—the plan describes every file change Claude intends to make.

### Connections

- **Builds on**: Claude Cowork concepts and the agent vs. chatbot distinction from Lesson 24
- **Leads to**: Practical Cowork workflows for documents and file operations (Lesson 26)
