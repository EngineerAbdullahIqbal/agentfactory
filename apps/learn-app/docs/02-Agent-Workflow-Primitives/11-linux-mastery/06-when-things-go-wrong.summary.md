### Core Concept
Restarting is not debugging. When an agent fails, follow the LNPS method — Logs, Network, Process, System — in order. Each step either finds the root cause or eliminates a category of problems, turning panic into systematic diagnosis.

### Key Mental Models
- **LNPS Triage Method**: A four-step diagnostic framework applied in order: (L) read the logs — the agent often tells you what happened; (N) check network connectivity — can the agent reach what it needs; (P) check the process — is it running, stuck, or crash-looping; (S) check system resources — disk, memory, CPU exhaustion.
- **Restarting Masks Symptoms**: Restarting is like taking painkillers for a broken bone — the pain stops temporarily but the bone is still broken. The root cause persists and returns, usually at the worst possible time.
- **The Agent Did Exactly What It Was Told**: Ali's empty report was not an error — the agent queried an empty database and faithfully reported zero results. The real problem was upstream: PostgreSQL was not enabled at boot.

### Critical Patterns
- `journalctl -u <service> --since "6 hours ago" --priority=warning` filters logs by time and severity
- `curl -I https://endpoint/health` tests if an external service is reachable; `ping -c 3 8.8.8.8` tests general internet connectivity
- `systemctl status <service>` reveals process state: `active (running)`, `activating (auto-restart)`, or `failed`
- `df -h`, `free -h`, `uptime` check disk (96%+ is critical), memory (90%+ triggers OOM killer), and CPU load

### Common Mistakes
- Restarting first without reading logs — this sometimes masks symptoms while the root cause persists and recurs
- Thinking logs are only for developers — logs are the primary diagnostic tool for anyone managing a service
- Jumping straight to "the code must be broken" — the LNPS method catches infrastructure failures (like a database not enabled at boot) before blaming code
- Skipping the order — logs first because they are the fastest path to the answer; system resources last because they are the least common cause

### Connections
- **Builds on**: Lesson 2 (reading command output), Lesson 4 (systemd services, `journalctl`, `systemctl status`)
- **Leads to**: Lesson 7 (Capstone: Zero to Production) — the LNPS method becomes Section 6 (Verification) of the deployment spec
