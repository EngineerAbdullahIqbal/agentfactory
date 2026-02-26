# Agent Factory Constitution

## I. Architecture

The Agent Factory is an educational platform teaching domain experts to build sellable AI agents. It is an Nx monorepo with pnpm.

**Applications** (`apps/`):

- `learn-app` — Docusaurus MDX book (content in `apps/learn-app/docs/`)
- `sso` — Better Auth single sign-on (port 3001)
- `content-api` — FastAPI content service (port 8003)
- `practice-server` — Express + WebSocket terminal environment

**Agent Infrastructure** (`.claude/`):

- `skills/` — Atomic operations (SKILL.md with YAML frontmatter)
- `agents/` — Subagent definitions for orchestrated workflows
- `commands/` — Slash commands (`sp.*` prefix)
- `rules/` — Auto-loaded modular rules

**Specifications**: `specs/<feature>/` — one folder per feature, contains spec, plan, tasks, research, ADRs.

**Content structure**: Parts are top-level folders (`NN-Name/`), chapters are nested (`NN-Name/NN-chapter/`). Chapter numbers are global across the book. Always discover paths via `ls -d`, never guess.

---

## II. Technology

| Layer          | Stack                                         |
| -------------- | --------------------------------------------- |
| Frontend       | TypeScript, Docusaurus (MDX), React           |
| Backend APIs   | Python, FastAPI                               |
| Auth           | Better Auth SSO, Device Flow (RFC 8628), JWKS |
| Database       | PostgreSQL (Neon)                             |
| Build          | pnpm, Nx (affected builds, per-app serving)   |
| AI Integration | Claude Code agents, skills, MCP tools         |

---

## III. Quality

1. **Educational content is never written directly.** All lesson prose goes through the `content-implementer` subagent. Code, specs, configs, and SKILL.md are exempt.
2. **YAML frontmatter is mandatory** on all lesson files — skills, learning objectives, metadata.
3. **Facts and statistics require WebSearch verification** before publication.
4. **Live verification before commits** — start services, make real requests, check logs. "It compiles" is not verification.
5. **Skills before subagents** — check the skill list before spawning a subagent. If an atomic skill exists, use it.
6. **Read files once per session.** Summarize immediately, reference the summary. Never re-read.
7. **Pedagogical layers must match student knowledge.** L1 (Manual) through L4 (Spec-Driven) — always verify Part number to determine layer.

---

## IV. Security

1. **Never commit secrets.** No `.env`, API keys, tokens, or passwords in git. Scan every diff before committing.
2. **No force push to main** without explicit user approval.
3. **No production-destructive operations** (data deletion, migrations) without confirmation.
4. **Validate at system boundaries only** — trust internal code and framework guarantees. Validate user input and external API responses.
5. **Auth tokens**: opaque tokens validated via SSO userinfo; JWTs verified locally via JWKS (cached 1 hour).

---

## V. Workflow

1. **Spec-Driven Development (SDD)** for major features:
   - Research (parallel subagents) -> Specification (`/sp.specify`) -> Refinement (interview) -> Implementation (task delegation, atomic commits)
2. **One task per session.** Context degrades after ~20 turns. Don't mix implementation with strategic planning.
3. **Define "done" upfront.** State deliverables and acceptance criteria before starting work.
4. **Delegate implementation.** Main session orchestrates; subagents implement. Main session doing heavy work guarantees failure.
5. **Clarify ambiguity immediately.** When a term could mean multiple things, ask before assuming. Never interpret broadly when a narrow interpretation exists.
6. **Learning loop.** After any correction, capture the pattern in `rules/failure-history.md` with a prevention rule.
7. **Structured handoffs.** Use the Task Handoff Format (context, acceptance criteria, files, constraints, references) for all delegation.

---

## Governance

This constitution is the authoritative source of project principles. It supersedes ad-hoc decisions but is subordinate to explicit user instructions in the moment.

- Amendments require updating this file with a new version number and date.
- All agent work (skills, subagents, commands) must comply with these principles.
- CLAUDE.md provides operational rules that implement these principles. When in conflict, clarify with the user.

**Version**: 1.0.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26
