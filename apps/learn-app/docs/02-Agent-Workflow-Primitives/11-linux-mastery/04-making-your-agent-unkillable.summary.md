### Core Concept
A process started in a terminal dies when the terminal closes. A systemd service survives terminal closures, reboots, and crashes — because the operating system manages it instead of your SSH session. One unit file transforms your agent from a fragile process into a production service.

### Key Mental Models
- **Phone Call vs Security Guard**: A process is a phone call — hang up and the conversation ends. A service is a security guard hired by the building — if the guard leaves, the building finds a replacement. Your agent needs to be a security guard.
- **Unit File as Job Description**: The systemd unit file answers five questions: what should run, as which user, when should it start, what if it crashes, and how much memory can it use. It is a job description written in a format Linux understands.
- **Building Manager**: systemd is the building manager that already runs every critical service on the server (database, SSH daemon, web server). Making your agent a systemd service gives it the same management as these production services.

### Critical Patterns
- Unit file at `/etc/systemd/system/<name>.service` with `[Unit]`, `[Service]`, and `[Install]` sections
- `Restart=on-failure` + `RestartSec=5` prevents crash loops while ensuring automatic recovery
- `MemoryMax=512M` prevents a memory leak from taking down the entire server
- Three commands to activate: `systemctl daemon-reload`, `systemctl enable <service>`, `systemctl start <service>`
- `journalctl -u <service>` shows service logs including crash and restart events

### Common Mistakes
- Thinking "the agent crashed" when you close the terminal — the agent did not crash; the terminal that owned the process ended, killing its children
- Confusing `Restart=always` with "never stops" — the service manager restarts it after crashes, but `RestartSec` prevents infinite crash loops
- Using tmux instead of systemd for 24/7 agents — tmux keeps sessions alive, but systemd provides crash recovery, boot persistence, and resource limits

### Connections
- **Builds on**: Lesson 3 (organized directory structure, `.env` file referenced by `EnvironmentFile=`)
- **Leads to**: Lesson 5 (Locking the Door) — the agent is unkillable but running as the wrong user with weak security
