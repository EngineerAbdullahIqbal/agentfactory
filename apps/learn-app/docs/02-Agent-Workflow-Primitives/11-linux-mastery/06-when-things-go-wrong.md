---
sidebar_position: 6
title: "When Things Go Wrong"
chapter: 11
lesson: 6
layer: L2
duration_minutes: 35
description: "Learn a systematic four-step method for diagnosing agent failures — because restarting is not debugging"
keywords:
  [
    "debugging",
    "troubleshooting",
    "logs",
    "journalctl",
    "diagnostics",
    "LNPS",
    "network",
    "process",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "LNPS Triage Method"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can apply the four-step LNPS method to diagnose an agent failure without restarting first"

  - name: "Log Analysis with journalctl"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Apply"
    digcomp_area: "Digital Competence"
    measurable_at_this_level: "Student can direct Claude Code to filter service logs by time range and severity level"

  - name: "Network Connectivity Diagnosis"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Problem Solving"
    measurable_at_this_level: "Student can interpret basic network diagnostic output to determine if a service is reachable"

learning_objectives:
  - objective: "Apply the LNPS triage method to diagnose an agent failure"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Student follows Logs → Network → Process → System order when presented with a broken service"

  - objective: "Direct Claude Code to filter and search service logs effectively"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Student uses journalctl with time filters and grep to find relevant error messages"

  - objective: "Explain why restarting without diagnosis is dangerous"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student describes a scenario where blind restarting masks a real problem"

cognitive_load:
  new_concepts: 3
  concepts_list:
    - "LNPS triage method (systematic diagnosis order)"
    - "journalctl filtering (finding the needle in the haystack)"
    - "Network diagnosis basics (is the service reachable?)"
  assessment: "3 concepts at B1 level — builds on L2 output reading and L4 systemd knowledge"

differentiation:
  extension_for_advanced: "Explore structured logging (JSON logs) and how they make automated analysis possible. Set up a log rotation policy to prevent /var/log from filling the disk."
  remedial_for_struggling: "Focus on just the L and N of LNPS. If you can read logs and check network connectivity, you can diagnose 80% of agent failures."

teaching_guide:
  lesson_type: "core"
  session_group: 3
  session_title: "Diagnosis and Troubleshooting"
  key_points:
    - "The LNPS method gives students a repeatable framework — without it, debugging becomes random restarting"
    - "The 'restarting is not debugging' mantra should be internalized — it's the lesson's thesis"
    - "The mystery scenario (empty report) creates genuine tension that the method resolves"
    - "journalctl filtering is the most immediately useful technical skill in this lesson"
  misconceptions:
    - "Students think restarting fixes things — it sometimes masks symptoms while the root cause persists"
    - "Students think logs are for developers only — logs are the primary diagnostic tool for anyone managing a service"
    - "Students skip straight to 'the code must be broken' — the LNPS method catches infrastructure failures before blaming code"
  discussion_prompts:
    - "Have you ever 'fixed' a computer problem by restarting, only for it to come back? What was the real cause?"
    - "Why does the LNPS method check logs first instead of jumping straight to the code?"
  teaching_tips:
    - "Walk through the mystery scenario live — show the empty report, then follow LNPS step by step"
    - "The reveal (database not enabled at boot) is satisfying because it's NOT a code bug — infrastructure failures are common and non-obvious"
    - "Have students practice journalctl filtering on their own services"
  assessment_quick_check:
    - "What are the four steps of LNPS and why are they in that order?"
    - "Your agent produces empty results but shows no error in its own logs. What do you check next?"
    - "Why is blind restarting dangerous for a data-processing agent?"

generated_by: "content-implementer v2.0.0"
created: "2026-02-28"
version: "1.0.0"
---

# When Things Go Wrong

Sunday night. Agent deployed, unkillable, locked down. Ali checks the dashboard. The latest pricing report is empty. Not an error message — just empty. The agent ran on schedule, connected to the database, generated a report, and saved it. The report contains nothing.

Board meeting at 9 AM. Twelve hours.

Ali's first instinct: restart everything. The agent. The database. Maybe the whole server.

> **"Every bad debugger has one move: restart. Every good debugger has a system."**

Restarting might fix the symptom. But if the root cause is still there, the problem comes back — probably at 3 AM before the next board meeting. Ali needs to find the cause, not mask it.

---

## The LNPS Method

When an agent fails, resist the urge to restart. Instead, follow four steps in order. Each step either finds the problem or eliminates a category of causes.

| Step | Check | What You're Asking | Tools |
|------|-------|--------------------|-------|
| **L** — Logs | Service logs | "What did the agent say happened?" | `journalctl -u service` |
| **N** — Network | Connectivity | "Can the agent reach what it needs?" | `curl`, `ping`, `ss` |
| **P** — Process | Process state | "Is the agent actually running? Is it stuck?" | `systemctl status`, `ps` |
| **S** — System | Server resources | "Does the server have enough memory, disk, CPU?" | `df -h`, `free -h`, `top` |

The order matters. Logs are the fastest path to the answer — the agent often tells you what went wrong. Network is next because connectivity failures are common and non-obvious. Process checks catch zombie or stuck services. System resources catch exhaustion problems.

---

## Step L: Read the Logs

**What you tell Claude Code**: "Show me the competitor-tracker logs from the last 6 hours. Focus on errors and warnings."

**What the agent does**:

```bash
journalctl -u competitor-tracker --since "6 hours ago" --priority=warning
```

**What you see**:

```
Feb 28 02:15:33 server competitor-tracker[4821]: Starting competitor tracker agent...
Feb 28 02:15:34 server competitor-tracker[4821]: Connected to database
Feb 28 02:15:34 server competitor-tracker[4821]: Fetching pricing data...
Feb 28 02:15:35 server competitor-tracker[4821]: WARNING: Query returned 0 rows
Feb 28 02:15:35 server competitor-tracker[4821]: Report generated: 0 entries
Feb 28 02:15:35 server competitor-tracker[4821]: Report saved to /opt/agents/competitor-tracker/data/report.csv
```

No crashes. No errors. The agent connected, queried the database, got zero rows, and dutifully saved an empty report. The agent did exactly what it was told. The problem isn't the agent — the problem is upstream.

**What you tell Claude Code**: "The agent got zero rows from the database. Check if the database service is running and if it has data."

**What the agent does**:

```bash
systemctl status postgresql
```

**What you see**:

```
● postgresql.service - PostgreSQL RDBMS
     Active: inactive (dead)
```

The database is not running. The agent connected (it's configured to retry), eventually got an empty result set, and reported it faithfully. The mystery is solved — but why is the database down?

```bash
journalctl -u postgresql --since "12 hours ago" | tail -20
```

```
Feb 27 22:00:01 server systemd[1]: Stopping PostgreSQL RDBMS...
Feb 27 22:00:03 server systemd[1]: postgresql.service: Deactivated successfully.
Feb 28 03:15:00 server systemd[1]: postgresql.service not found in boot target
```

The server rebooted for security updates at 10 PM. PostgreSQL restarted, but it was never **enabled** at boot. Ali enabled his agent with `systemctl enable competitor-tracker`. He never enabled the database.

**The fix**:

```bash
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

Pause.

The root cause wasn't a code bug. It wasn't a network problem. It wasn't a crashed agent. It was an infrastructure oversight — the database wasn't configured to start on boot. Restarting the agent would have changed nothing. Reading the logs found the answer in under two minutes.

---

## Step N: Check the Network

If the logs show connection errors instead of empty results, the problem is often network connectivity. The agent can't reach something it needs.

**What you tell Claude Code**: "Check if the agent can reach the external pricing API at api.pricingdata.com on port 443."

**What the agent does**:

```bash
curl -I https://api.pricingdata.com/health
```

**What you see if it works**:

```
HTTP/2 200
content-type: application/json
```

**What you see if it fails**:

```
curl: (7) Failed to connect to api.pricingdata.com port 443: Connection refused
```

Connection refused means either the remote server is down or a firewall is blocking the connection. Connection timed out means the packets aren't reaching the destination at all.

To check if the server can reach the internet generally:

```bash
ping -c 3 8.8.8.8
```

If ping works but curl doesn't, the problem is specific to that service or port. If ping also fails, the server has no internet connectivity — check DNS and network configuration.

---

## Step P: Check the Process

Sometimes the agent appears to be running but isn't actually doing work. It might be stuck in an infinite loop, waiting for a resource that will never become available, or consuming all available CPU without producing output.

**What you tell Claude Code**: "Is the competitor-tracker process actually running? How much CPU and memory is it using?"

**What the agent does**:

```bash
systemctl status competitor-tracker
ps aux | grep competitor-tracker
```

**What to look for**:

| Symptom | Likely Cause |
|---------|-------------|
| Status: `active (running)` but CPU is 100% | Agent stuck in infinite loop |
| Status: `active (running)` but CPU is 0% | Agent waiting/sleeping (might be normal) |
| Status: `activating (auto-restart)` | Agent crashing and restarting repeatedly |
| Status: `failed` | Agent crashed and didn't restart — check `Restart=` policy |

---

## Step S: Check System Resources

If logs, network, and process all look fine, the server itself might be running out of resources.

**What you tell Claude Code**: "Check the server's disk space, memory, and CPU usage."

**What the agent does**:

```bash
df -h /
free -h
uptime
```

**What you see**:

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   48G  2.0G  96% /

              total        used        free
Mem:          2.0Gi       1.8Gi       200Mi

 load average: 0.15, 0.10, 0.08
```

| Resource | Warning Sign | Impact |
|----------|-------------|--------|
| Disk 96%+ full | `/var/log` fills up, services can't write | Agent can't save reports or logs |
| Memory 90%+ used | OOM killer starts terminating processes | Agent gets randomly killed |
| Load average > CPU cores | Server is overloaded | Everything runs slow |

---

## The LNPS Method in Summary

Print this. Tape it to your monitor. Use it every time.

```
AGENT FAILURE TRIAGE
━━━━━━━━━━━━━━━━━━━

1. LOGS    → journalctl -u <service> --since "1 hour ago"
             What did the agent say happened?

2. NETWORK → curl <endpoint>, ping <host>
             Can the agent reach what it needs?

3. PROCESS → systemctl status <service>, ps aux
             Is the agent running? Is it stuck?

4. SYSTEM  → df -h, free -h, uptime
             Does the server have resources?

━━━━━━━━━━━━━━━━━━━
DO NOT RESTART UNTIL YOU KNOW THE CAUSE.
```

---

## Ali's Resolution

Ali followed the LNPS method. Logs revealed the database returned zero rows. Checking the database process showed it was inactive. The database journal showed it wasn't enabled at boot.

Two commands fixed it: `enable` and `start`. The database came back. The agent's next scheduled run produced a full pricing report. Ali reviewed the data, formatted the summary, and sent it to his client at 7 AM — two hours before the board meeting.

The client never knew it was a close call.

---

Monday morning. The board meeting goes well. Ali's competitor-tracker runs on Dev's server. It survives reboots, restarts after crashes, runs under a dedicated user with locked-down permissions, and Ali knows how to diagnose it when things go wrong.

He thinks: "What if I could do this from zero? Not three days of figuring things out — just sit down and deploy, following a checklist?"

---

## Try With AI

### Prompt 1: Group Errors by Type

```
Show me all the logs for my service from the last 24 hours.
Group the errors by type — how many connection errors, how many
timeout errors, how many permission errors? Which type is most
common? What does the pattern tell us about the root cause?
```

**What you're practicing:** Log analysis at scale. Individual error messages are data points. Patterns across many errors tell the real story. A dozen timeout errors at 3 AM points to a scheduled maintenance window, not a code bug.

### Prompt 2: Apply LNPS to a Different Scenario

```
My web application is slow — pages take 10 seconds to load.
Walk me through the LNPS method for this scenario. What would
you check at each step? What would the output look like for
different root causes (database slow, memory exhaustion, network
latency, application bug)?
```

**What you're practicing:** Transferring the LNPS framework to a different problem type. The method works for any service failure, not just agent failures. Slowness is a failure mode too.

### Prompt 3: Why Not Restart First?

```
I've heard "have you tried turning it off and on again?" is the
universal tech support answer. Why does the LNPS method say NOT
to restart first? Give me a concrete example where restarting
hides a serious problem that gets worse over time.
```

**What you're practicing:** Understanding why systematic diagnosis matters. Restarting is tempting because it's fast. But speed without understanding creates recurring failures and erodes trust in the system.

---

## Flashcards Study Aid

<Flashcards />
