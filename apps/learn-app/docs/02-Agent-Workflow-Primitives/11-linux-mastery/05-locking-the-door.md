---
sidebar_position: 5
title: "Locking the Door"
chapter: 11
lesson: 5
layer: L2
duration_minutes: 30
description: "Secure your agent's server with dedicated users, proper file permissions, and SSH keys — because an unkillable agent running as root is a disaster waiting to happen"
keywords:
  [
    "security",
    "users",
    "permissions",
    "ssh keys",
    "least privilege",
    "hardening",
    "chmod",
    "chown",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "User and Group Management"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can explain why agents need dedicated users and can direct Claude Code to create one"

  - name: "File Permission Model"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can read rwx permission strings and explain who has access to a given file"

  - name: "SSH Key Authentication"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can direct Claude Code to set up SSH key authentication and disable password login"

  - name: "Least Privilege Principle"
    proficiency_level: "A2"
    category: "Conceptual"
    bloom_level: "Understand"
    digcomp_area: "Safety"
    measurable_at_this_level: "Student can identify over-permissioned configurations and explain why they're dangerous"

learning_objectives:
  - objective: "Explain why running an agent as root is dangerous"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student describes what an attacker could do with root access vs limited user access"

  - objective: "Direct Claude Code to create a dedicated service user and set file permissions"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student creates agentuser, transfers ownership, and restricts .env to owner-only"

  - objective: "Read file permissions and identify security problems"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student explains why -rw-r--r-- on .env is dangerous and what it should be"

  - objective: "Explain why SSH keys are more secure than passwords"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student describes the difference between guessable passwords and cryptographic key pairs"

cognitive_load:
  new_concepts: 4
  concepts_list:
    - "Users and groups (employee badges and departments)"
    - "File permission model (three levels of keycards)"
    - "SSH keys vs passwords (fingerprints vs house keys)"
    - "Least privilege (mailbox key, not front door key)"
  assessment: "4 concepts at A2-B1 boundary — connects back to L2 permission reading and forward to Ch13 deployment security"

differentiation:
  extension_for_advanced: "Explore UFW (Uncomplicated Firewall) to restrict which ports accept connections. Set up fail2ban to automatically block IP addresses after repeated failed login attempts."
  remedial_for_struggling: "Focus on the building analogy: root = master key that opens every door. agentuser = badge that opens only the agent's office. This single distinction is the core insight."

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Security Hardening"
  key_points:
    - "The 47,000 failed login attempts hook makes security feel real and urgent — this isn't theoretical"
    - "Connecting back to L2 permission reading (drwxr-xr-x) gives students a payoff — they already know how to read these"
    - "The chmod/chown commands are presented as 'tell Claude Code' not 'type this' — consistency with L2 pattern"
    - "Disabling password SSH is the highest-impact security change with the lowest effort"
  misconceptions:
    - "Students think 'nobody would hack my little server' — the failed login count proves bots attack everything"
    - "Students confuse file ownership (chown) with file permissions (chmod) — ownership is WHO, permissions is WHAT"
    - "Students think SSH keys are complicated — the analogy of fingerprint vs house key makes the concept accessible"
  discussion_prompts:
    - "If your agent has root access and gets compromised, what could an attacker do? What if it only has access to its own directory?"
    - "Why do companies require SSH keys instead of passwords for server access?"
  teaching_tips:
    - "The failed login count is the hook — if possible, demonstrate on a real server or show realistic numbers"
    - "Draw the permission model on the board: three columns (owner/group/other) x three rows (read/write/execute)"
    - "The .env permission check is a practical exercise every student should try on their own setup"
  assessment_quick_check:
    - "Why should your agent never run as root?"
    - "What do the permissions -rw------- mean in plain English?"
    - "What's the difference between chown and chmod?"

generated_by: "content-implementer v2.0.0"
created: "2026-02-28"
version: "1.0.0"
---

# Locking the Door

Ali's agent is unkillable. It survives reboots, restarts after crashes, runs under memory limits. He feels accomplished.

Then Dev checks the server status and goes pale.

"Your agent is running as root," Dev says. "And you still have password SSH enabled."

Ali shrugs. "So?"

Dev pulls up the auth log.

---

## 47,000 Reasons to Care

Marcus ran his agent as root for three weeks. He never checked the server's authentication log. When a friend showed him how, they found this:

**What you tell Claude Code**: "Show me how many failed login attempts are in the auth log."

**What the agent does**:

```bash
grep "Failed password" /var/log/auth.log | wc -l
```

**What you see**:

```
47,291
```

Forty-seven thousand attempts. From IP addresses in six countries. Automated bots scanning the internet for servers with weak passwords, trying common combinations: admin/admin, root/password, user/123456.

None had succeeded. Yet.

Marcus's agent had root access. If even one bot had guessed the password, the attacker would have had complete control over the server. Not just the agent — everything. The database. The other services. The ability to install malware, mine cryptocurrency, or launch attacks on other servers.

> **"Security isn't a feature. It's a constraint that makes everything else possible."**

Ali's server has the same problem. Let's fix it.

---

## Concept 1: Users Are Badges

Think of a server like a building with restricted areas. Every person who enters gets a badge. The badge determines which doors they can open.

**Root** is the master key. It opens every door in the building. The server room, the executive offices, the supply closet, the safe. If someone steals the master key, they own the building.

Your agent doesn't need a master key. It needs a badge that opens one office — its own directory — and nothing else.

**What you tell Claude Code**: "Create a dedicated user called agentuser for running my competitor-tracker agent. It shouldn't have a password or a home directory — it's only for running the service."

**What the agent does**:

```bash
sudo useradd --system --no-create-home --shell /usr/sbin/nologin agentuser
```

**What this means**: `--system` creates a service account (not a human user). `--no-create-home` skips creating a home directory (the agent already has `/opt/agents/competitor-tracker`). `--shell /usr/sbin/nologin` means nobody can SSH in as this user. It exists only to own and run the agent.

---

## Concept 2: Permissions Are Keycards

In Lesson 2, you learned to read `drwxr-xr-x`. Now that reading pays off.

Every file on Linux has three levels of access for three groups of people:

| Group | Who | Analogy |
|-------|-----|---------|
| **Owner** | The user who owns the file | Master keycard holder |
| **Group** | Users in the same group | Department keycard holders |
| **Others** | Everyone else on the system | Visitor badge holders |

Each group can have three types of access:

| Permission | Letter | Meaning |
|-----------|--------|---------|
| Read | `r` | Can see the contents |
| Write | `w` | Can change the contents |
| Execute | `x` | Can run it as a program |

So `rwxr-xr-x` means: owner can do everything, group can read and execute, others can read and execute. And `-rw-r--r--` means: owner can read and write, everyone else can only read.

Now look at Ali's `.env` file — the one with his database password and API keys:

**What you tell Claude Code**: "Check the permissions on my .env file."

**What the agent does**:

```bash
ls -la /opt/agents/competitor-tracker/.env
```

**What you see**:

```
-rw-r--r-- 1 ali ali 256 Feb 28 02:10 .env
```

Pause.

Read that permission string. `-rw-r--r--`. Owner can read and write. Group can read. **Others can read.** Every user on this server can read Ali's database password.

**What you tell Claude Code**: "Transfer ownership of the entire competitor-tracker directory to agentuser. Then restrict the .env file so only the owner can read it."

**What the agent does**:

```bash
sudo chown -R agentuser:agentuser /opt/agents/competitor-tracker
sudo chmod 750 /opt/agents/competitor-tracker
sudo chmod 600 /opt/agents/competitor-tracker/.env
```

**What this means**:

- `chown -R agentuser:agentuser` — Change ownership of the directory and everything inside it to agentuser. The `-R` means recursive — every file and subdirectory.
- `chmod 750` on the directory — Owner (agentuser) can do everything. Group members can read and enter the directory. Others get nothing.
- `chmod 600` on `.env` — Owner can read and write. Nobody else can do anything. The database password is locked down.

Verify:

```bash
ls -la /opt/agents/competitor-tracker/.env
```

```
-rw------- 1 agentuser agentuser 256 Feb 28 02:10 .env
```

`-rw-------`. Only the owner can read it. The door is locked.

---

## Concept 3: Keys Beat Passwords

Ali connects to Dev's server with a password. Every time he SSHes in, he types it. The problem: passwords can be guessed. That's what those 47,000 bots were doing — guessing passwords.

SSH keys work differently. Instead of a password you remember, you generate a **key pair**: a private key (stays on your laptop, never shared) and a public key (goes on the server).

Think of it this way. A password is a house key — anyone who sees it can make a copy. An SSH key is a fingerprint scanner — even if someone sees you use it, they can't replicate your fingerprint.

**What you tell Claude Code**: "Set up SSH key authentication. Generate a key pair on my local machine, copy the public key to the server, and then disable password authentication."

**What the agent does on your local machine**:

```bash
ssh-keygen -t ed25519 -C "ali@laptop"
```

This creates two files:
- `~/.ssh/id_ed25519` — Your private key. Never share this. Never move this.
- `~/.ssh/id_ed25519.pub` — Your public key. Safe to share. Put it on every server you need access to.

**What the agent does to copy the key**:

```bash
ssh-copy-id ali@devs-server.com
```

Now your public key lives on the server. The next time you SSH in, the server checks your fingerprint instead of asking for a password.

**What the agent does to disable passwords**:

```bash
sudo sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

:::caution
Before disabling password authentication, make SURE your SSH key works. Test by opening a new terminal and connecting with the key. If the key doesn't work and you disable passwords, you'll lock yourself out of the server.
:::

---

## Concept 4: Least Privilege

Every decision in this lesson follows one principle: **give the minimum access needed and nothing more**.

| Instead of... | Do this | Why |
|---------------|---------|-----|
| Running agent as root | Create agentuser | If compromised, attacker gets one directory, not the whole server |
| Password SSH | SSH keys only | Eliminates brute-force attacks entirely |
| `.env` readable by everyone | `chmod 600` | Secrets are visible only to the service that needs them |
| Agent can write anywhere | `chmod 750` on its directory | Agent can't modify system files even if exploited |

This is the principle of **least privilege**: give the delivery driver a key to the mailbox, not the front door.

---

## Update the Service

One more step. The systemd unit file from Lesson 4 says `User=ali`. It should say `User=agentuser`.

**What you tell Claude Code**: "Update the competitor-tracker systemd service to run as agentuser instead of ali, then restart it."

**What the agent does**:

```bash
sudo sed -i 's/User=ali/User=agentuser/' /etc/systemd/system/competitor-tracker.service
sudo systemctl daemon-reload
sudo systemctl restart competitor-tracker
systemctl status competitor-tracker
```

The agent now runs as a dedicated, limited user with access only to its own directory and secrets locked down.

---

Sunday night. Agent deployed. Unkillable. Locked down. Ali checks the dashboard — the latest report is empty. The agent ran on schedule but produced nothing. Something broke. Board meeting at 9 AM.

---

## Try With AI

### Prompt 1: Audit Your .env

```
Check the permissions on my .env file. Who can read it right now?
If the permissions show -rw-r--r--, explain why that's a security
risk. What should the permissions be instead? Fix them.
```

**What you're practicing:** Reading permissions on real files and identifying security gaps. The most common server vulnerability isn't a sophisticated hack — it's a readable secrets file.

### Prompt 2: Read-Only Access for a Colleague

```
I have a colleague who needs to view my agent's logs but should
NOT be able to modify any files or restart the service. Create
a new user for them with the minimum permissions needed. What
group membership and file permissions do they need?
```

**What you're practicing:** Applying least privilege to a real scenario. Different people need different levels of access. Designing permissions is thinking about who needs what.

### Prompt 3: Why Keys Beat Passwords

```
Explain the math behind SSH key security. How many possible
combinations does a 4096-bit RSA key have compared to an
8-character password? Why does this make brute-force attacks
against SSH keys essentially impossible?
```

**What you're practicing:** Understanding the quantitative security difference. "Keys are better than passwords" is a claim. The math is the proof.

---

## Flashcards Study Aid

<Flashcards />
