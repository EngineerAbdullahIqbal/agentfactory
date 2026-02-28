### Core Concept
A deployment spec turns three days of discovery into fifteen minutes of execution. By capturing everything learned in Lessons 1-6 into a structured six-section document, Ali deploys a second agent without repeating any mistakes — the spec is the checklist, the executor, and the auditor in one file.

### Key Mental Models
- **Spec as Execution Guide**: A deployment spec is not documentation — it is the plan you feed to Claude Code section by section. Each section maps to a lesson: Server Access (L1), Directory Structure (L3), Application Setup (L2/L3), Service Configuration (L4), Security Checklist (L5), Verification (L6).
- **Three Days vs Fifteen Minutes**: The first deployment was learning through crisis. The second deployment was executing a plan. The difference is not skill — it is structure. The spec captures scattered knowledge and turns it into sequential execution.
- **Verification as the Quality Gate**: No deployment is done until every verification check passes — service running, survives terminal closure, survives reboot, logs writing, output correct, resources within limits. "It started, so it works" is not production-ready.

### Critical Patterns
- Six-section deployment spec: Server Access, Directory Structure, Application Setup, Service Configuration, Security Checklist, Verification
- Feed the spec to Claude Code one section at a time — each section becomes a focused conversation
- `grep` for API_KEY, PASSWORD, SECRET in source code as part of the security checklist
- The verification checklist includes survival tests (terminal closure, reboot) not just "is it running right now"

### Common Mistakes
- Thinking specs are busywork — the speed comparison (three days vs fifteen minutes) proves their value as execution accelerators
- Thinking you need to remember all the commands — the spec captures the knowledge so you do not have to
- Skipping verification — a deployed service that is not verified is a time bomb that fails when a client checks the dashboard or you are asleep
- Trying to deploy a third agent from memory instead of writing a spec — you will repeat mistakes the spec would have prevented

### Connections
- **Builds on**: All six previous lessons — each spec section directly maps to a lesson's core skill
- **Leads to**: Chapter 13 — turning Linux deployment into a repeatable business process for selling agent services
