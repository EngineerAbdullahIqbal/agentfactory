### Core Concept
Agents dumped in random directories fail — not because of bad code, but because of bad organization. A proper deployment separates code, configuration, secrets, data, and logs into dedicated directories under `/opt/agents/`, extracts secrets into `.env` files with restricted permissions, and redirects log output to persistent files.

### Key Mental Models
- **Kitchen Analogy**: A kitchen with knives in the bathroom and spices under the bed might produce good food today, but the next chef will burn the place down. Organization is not cosmetics — it prevents failures.
- **Sticky Note in the Wallet vs Whiteboard**: Secrets in a `.env` file are like writing the safe combination on a note you keep in your wallet. Secrets hardcoded in source code are like writing it on the whiteboard where everyone can see.
- **Phone Call Nobody Recorded**: Terminal output that vanishes when you close the session is like relying on memory instead of taking notes during an important call. The `tee` command records the conversation.

### Critical Patterns
- Standard agent structure: `/opt/agents/<name>/` with `src/`, `config/`, `logs/`, `data/`, and `.env`
- `chmod 600 .env` restricts the secrets file to owner-only access
- `python script.py 2>&1 | tee -a logs/agent.log` writes output to both screen AND file (`2>&1` combines errors with normal output, `-a` appends)
- `tail -20 logs/agent.log` checks recent agent activity without being connected during execution

### Common Mistakes
- Thinking organization is optional cosmetics — disorganization causes real failures when files get accidentally deleted or secrets get exposed
- Confusing `.env` files with environment variables — `.env` is the file on disk, environment variables are what the OS loads from it at runtime
- Thinking redirect (`>`) and `tee` are the same — redirect replaces terminal output, `tee` duplicates it to both screen and file

### Connections
- **Builds on**: Lesson 1 (filesystem structure, `/opt` for optional software), Lesson 2 (reading permissions, understanding `chmod 600`)
- **Leads to**: Lesson 4 (Making Your Agent Unkillable) — the organized home is ready, but the agent still dies when the terminal closes
