### Core Concept
Your agent runs on a Linux server, not your laptop, because servers never sleep. Understanding the server means learning four things: why servers exist, how terminals and shells differ, how the filesystem is organized as a tree from `/`, and how SSH creates a secure tunnel to get you there.

### Key Mental Models
- **Server vs Laptop**: A server is a computer that never sleeps — no screen, no keyboard, no desktop. Your agent needs 24/7 uptime, which your laptop cannot provide.
- **Glass Window and Voice**: The terminal is the glass window you look through; the shell is the voice on the other end executing commands. You talk to Claude Code; Claude Code talks to the shell.
- **Building Analogy**: The filesystem is a building where `/` is the front door. `/home` is apartments (user files), `/var` is the mailroom (logs), `/etc` is the manager's office (config), `/opt` is storage units (optional software), `/tmp` is the lobby whiteboard (erased on reboot).
- **SSH as Phone Call**: SSH is a secure, encrypted tunnel between your laptop and the server — like a phone call to a computer that has no screen.

### Critical Patterns
- Everything on Linux lives in a tree starting from `/` — five key directories (`/home`, `/var`, `/etc`, `/opt`, `/tmp`) cover most agent needs
- `ssh user@address` reads left to right: open secure tunnel, log in as user, at this address
- The `~` in `dev@server:~$` means "you are in your home directory"

### Common Mistakes
- Thinking a server has a hidden desktop you cannot see — it has no graphical interface at all
- Confusing terminal and shell — terminal is the window, shell is the program reading commands
- Thinking `/home` is like the C: drive — it only contains user directories, not the whole system
- Thinking SSH requires special software — it is built into every modern operating system

### Connections
- **Builds on**: General agent concepts from earlier chapters; Ali's competitor-tracker agent
- **Leads to**: Lesson 2 (Reading What Your Agent Does) — understanding command output and file permissions
