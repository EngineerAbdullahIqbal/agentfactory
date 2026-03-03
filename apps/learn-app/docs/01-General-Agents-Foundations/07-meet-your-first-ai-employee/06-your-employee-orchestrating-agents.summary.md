---
title: "Summary: Your Employee Orchestrating Agents"
sidebar_label: "Summary"
sidebar_position: 6.5
---

# Summary: Your Employee Orchestrating Agents

## Key Concepts

- **ACP (Agent Client Protocol)**: Protocol for delegating coding tasks to external harnesses -- replaces ad-hoc natural language instructions with managed sessions
- **Harness-agnostic delegation**: ACP supports Claude Code, Codex, Pi, OpenCode, and Gemini CLI through the same `/acp spawn` interface
- **One-shot vs persistent**: One-shot runs fire-and-forget (works everywhere); persistent sessions stay alive for follow-ups (requires thread binding or focus)
- **Thread binding**: On Discord, `--thread auto` routes all thread messages to the ACP session automatically
- **Focus binding**: On TUI, `/focus <session-key>` routes messages to an unbound ACP session
- **NLP dispatch**: Plain language like "Run this as a one-shot Codex session" triggers ACP without slash commands
- **Channel limitations**: WhatsApp/Telegram support one-shot only (no thread binding); persistent sessions require Discord or TUI
- **Operator vs conversational**: Setup (plugin install, config, gateway restart) is operator-side; usage (`/acp spawn`, `/acp status`) is conversational
- **ACP vs sub-agents**: ACP for external coding harnesses; sub-agents for OpenClaw-native delegated runs

## The Delegation Chain

```
You (messaging channel) → Employee (OpenClaw) → ACP Backend → Coding Harness → Code/Files
                 ↑ reports status        ↑ /acp status verifies
```

| Layer              | Role        | What They Handle                                    |
| ------------------ | ----------- | --------------------------------------------------- |
| **You**            | Manager     | High-level instructions, review output              |
| **Your Employee**  | Coordinator | Interprets intent, routes tasks through ACP         |
| **Coding Harness** | Coder       | Writes actual code in a managed, verifiable session |

## Key Commands

| Command                                | What It Does                                      |
| -------------------------------------- | ------------------------------------------------- |
| `/acp spawn <agent> --mode persistent` | Start a persistent coding session                 |
| `/acp spawn <agent> --mode oneshot`    | Start a one-shot (fire-and-forget) session        |
| `/acp status`                          | Show session state, harness, and capabilities     |
| `/acp steer <instruction>`             | Send follow-up guidance without replacing context |
| `/acp close`                           | End session and unbind threads                    |
| `/acp doctor`                          | Check backend health and configuration            |
| `/acp sessions`                        | List all recent ACP sessions                      |
| `/acp install`                         | Print install and enable steps                    |

## Setup Checklist

0. `openclaw tui` — open the TUI
1. `/acp install` inside TUI — your employee prints the exact commands to run
2. `openclaw plugins install @openclaw/acpx` — install the backend plugin (skip if already bundled)
3. `openclaw config set plugins.entries.acpx.enabled true` — enable the plugin
4. `openclaw config set acp.defaultAgent "claude"` — set default harness for NLP dispatch
5. `openclaw gateway restart` — load the new config
6. `/acp doctor` in TUI — verify `connected | idle`
7. Test with a one-shot task in TUI to confirm end-to-end

## Common Errors

| Error                                           | Fix                                              |
| ----------------------------------------------- | ------------------------------------------------ |
| `ACP runtime backend is not configured`         | Run `/acp install` then `/acp doctor`            |
| `ACP agent "<id>" is not allowed by policy`     | Ask employee: "add claude to ACP allowed agents" |
| Status check fails or shows no session          | Focus the ACP session first (`/focus <key>`)     |
| Persistent session refused on WhatsApp/Telegram | Use `--mode oneshot` or switch to Discord/TUI    |

## What Transfers

| Concept                     | In This Lesson                                            | In Any Framework                         |
| --------------------------- | --------------------------------------------------------- | ---------------------------------------- |
| Protocol-based delegation   | ACP manages sessions and state                            | Orchestrators use protocols, not ad-hoc  |
| Harness-agnostic interface  | Same `/acp spawn` for 5 different harnesses               | Standard interfaces abstract tool choice |
| Channel-aware delegation    | One-shot everywhere, persistent where threads/focus exist | Adapting to platform constraints         |
| NLP dispatch                | "Run this as Codex" triggers ACP without slash commands   | Intent-based routing in any system       |
| Verification infrastructure | `/acp status` and output file checks                      | Logging, monitoring, audit trails        |
