---
sidebar_position: 2
title: "Reading What Your Agent Does"
chapter: 11
lesson: 2
layer: L2
duration_minutes: 30
description: "Learn to read Linux command output, understand file permissions, and build a working vocabulary of the commands your agent uses most"
keywords:
  [
    "linux commands",
    "file permissions",
    "command anatomy",
    "server output",
    "rwx",
    "process monitoring",
    "agent deployment",
    "Claude Code",
  ]

# HIDDEN SKILLS METADATA
skills:
  - name: "Command Output Interpretation"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can read a command's output and explain what each column or field means in plain English"

  - name: "Linux Command Vocabulary"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Digital Literacy"
    measurable_at_this_level: "Student can recognize common Linux commands by name and state their purpose when seen in agent output"

  - name: "File Permission Reading"
    proficiency_level: "A2"
    category: "Technical"
    bloom_level: "Understand"
    digcomp_area: "Safety and Security"
    measurable_at_this_level: "Student can decode a permission string like drwxr-xr-x and explain who can do what"

learning_objectives:
  - objective: "Interpret the output of common Linux commands by identifying what each field means"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student reads ls -la output and correctly explains three columns (permissions, owner, size)"

  - objective: "Recognize the purpose of 15 core Linux commands when encountered in agent output"
    proficiency_level: "A1"
    bloom_level: "Remember"
    assessment_method: "Student identifies what a command does when Claude Code runs it, without needing to look it up"

  - objective: "Decode file permission strings to determine who can read, write, and execute a file"
    proficiency_level: "A2"
    bloom_level: "Understand"
    assessment_method: "Student explains why /etc/shadow has different permissions than /etc/passwd and what the security implication is"

cognitive_load:
  new_concepts: 3
  assessment: "3 concepts (command anatomy, command vocabulary, file permissions) within A2 limit of 5-7"

differentiation:
  extension_for_advanced: "Ask Claude Code to explain the numeric permission system (chmod 755 vs chmod 644) and when you would use numbers instead of letters"
  remedial_for_struggling: "Focus only on command anatomy. If you can read one command left-to-right as a sentence, you have the core skill. Vocabulary and permissions will come through repeated exposure."

teaching_guide:
  lesson_type: "core"
  session_group: 1
  session_title: "Reading Server Output"
  key_points:
    - "Commands read like sentences: verb (command), adverbs (flags), object (argument). This framing eliminates the 'commands are cryptic' barrier."
    - "The 15-command vocabulary is for recognition, not memorization. Students should feel relieved, not pressured."
    - "File permissions use a building-keycard analogy: owner/group/everyone maps to three levels of access. drwxr-xr-x becomes readable once you see the three groups."
    - "The 'What you see / What this means' pattern trains students to stop nodding through output they don't understand."
  misconceptions:
    - "Students think they need to memorize all commands before they can work with a server. The vocabulary card approach explicitly counters this: recognize, don't memorize."
    - "Students confuse the d in drwxr-xr-x as a permission. It's a file type indicator (d = directory, - = regular file), not a permission."
    - "Students may think 'execute' permission on a directory means 'run it as a program.' For directories, execute means 'allowed to enter and access contents.'"
  discussion_prompts:
    - "When Claude Code runs a command and shows you the output, what's your instinct? Do you read every line, skim for keywords, or skip to what Claude says about it?"
    - "Why do /etc/passwd and /etc/shadow have different permissions? What would happen if both were world-readable?"
    - "If you saw a process using 95% of memory in ps aux output, what would you tell Claude Code to do about it?"
  teaching_tips:
    - "Have students direct Claude Code to run ls -la on their own home directory first. Real output is more engaging than textbook examples."
    - "When teaching permissions, draw the three groups physically: owner | group | everyone. Then fill in rwx for each. The visual click happens when they see the pattern."
    - "The 'Pause.' technique works best after the command anatomy breakdown. Let the simplicity land before moving to vocabulary."
  assessment_quick_check:
    - "Show students drwxr-x--- and ask: Can 'everyone' read this directory? (No. The last three characters are ---.)"
    - "Ask students to read ls -la /var/log aloud as a sentence: 'List, long format, all files, in the /var/log directory.'"
    - "Give students a ps aux line and ask: Which column is memory usage? Which is the command name?"
---

# Reading What Your Agent Does

In the last lesson, Ali explored Dev's server. He knows where things live -- `/home` for users, `/var` for logs, `/etc` for configuration. But knowing where things are is different from understanding what they say.

When Claude Code runs a command and the output reads `drwxr-xr-x 3 ali ali 4096 Feb 14 09:22 competitor-tracker`, Ali nods and pretends he understands. He sees the words. He sees the numbers. He has no idea what most of them mean.

> **"You don't need to speak Linux. You need to read it."**

This lesson makes the black box transparent. By the end, you'll read command output the way you read a dashboard -- quickly, confidently, knowing what matters and what to skip.

## Commands Are Sentences

Every Linux command follows the same structure. Once you see it, you can't unsee it.

Think of a command as a sentence. It has a **verb** (what to do), **adverbs** (how to do it), and an **object** (what to do it to).

```
ls   -la   /var/log
|     |       |
verb  adverbs object
```

- **`ls`** is the verb: "list"
- **`-la`** is two adverbs: `-l` means "long format" (show details), `-a` means "all" (include hidden files)
- **`/var/log`** is the object: the directory to list

Read it as a sentence: "**List**, in **long format**, **all** files in **/var/log**."

That's it. Every command you'll ever see follows this pattern. The verb changes. The adverbs change. The object changes. The grammar never does.

Pause.

Go back and read that command one more time. Verb. Adverbs. Object. If you can parse one command, you can parse all of them. The rest of this lesson is vocabulary, not new grammar.

## Your Agent's Vocabulary: 15 Commands

Here's the part where most tutorials hand you a list of 50 commands and tell you to memorize them. We're not doing that.

Think of these 15 commands as vocabulary cards for a language you're visiting, not moving to. You don't memorize vocabulary cards. You recognize words when you see them. When Claude Code runs `grep` in front of you, you'll think "ah, searching for text" instead of "what is that?"

### Navigation

| Command | What It Does | Read It As |
|---------|-------------|------------|
| `ls` | Lists files in a directory | "Show me what's here" |
| `cd` | Changes your current directory | "Go to this folder" |
| `pwd` | Prints your current location | "Where am I right now?" |

### Inspection

| Command | What It Does | Read It As |
|---------|-------------|------------|
| `cat` | Shows the entire contents of a file | "Read this file to me" |
| `head` | Shows the first few lines of a file | "Show me the beginning" |
| `tail` | Shows the last few lines of a file | "Show me the end" |
| `less` | Opens a file for scrolling through | "Let me browse this file" |

### Measurement

| Command | What It Does | Read It As |
|---------|-------------|------------|
| `du` | Measures disk usage of files/folders | "How big is this?" |
| `df` | Shows free disk space on the server | "How much room is left?" |
| `wc` | Counts lines, words, or characters | "How many lines in this file?" |

### Search

| Command | What It Does | Read It As |
|---------|-------------|------------|
| `find` | Locates files by name, type, or date | "Find files matching this pattern" |
| `grep` | Searches inside files for specific text | "Find this word inside these files" |

### Process

| Command | What It Does | Read It As |
|---------|-------------|------------|
| `ps` | Lists running processes | "What's running right now?" |
| `top` | Shows live resource usage | "What's using CPU and memory?" |
| `kill` | Stops a running process | "Shut this program down" |

Fifteen commands. That's the entire working vocabulary for server operations. When Claude Code runs any of these, you'll know what it's doing before it explains the result.

## Reading Real Output

Vocabulary is recognition. Now let's practice reading.

Tell Claude Code:

```
Show me everything running on this server right now with full details.
```

Claude Code will likely run something like `ps aux`. Here's what that output looks like:

```
USER       PID %CPU %MEM    VSZ   RSS TTY   STAT START   TIME COMMAND
root         1  0.0  0.1 169360 11840 ?     Ss   Feb12   0:08 /sbin/init
ali       1247  0.3  2.1 458920 42880 ?     Sl   09:22   1:45 python3 competitor_tracker.py
postgres  892   0.1  1.5 215460 30720 ?     Ss   Feb12   5:23 /usr/lib/postgresql/15/bin/postgres
root       456  0.0  0.0  72312  5888 ?     Ss   Feb12   0:01 /usr/sbin/sshd
```

**What you see:** A wall of text with columns that don't line up neatly.

**What this means:**

| Column | What It Tells You |
|--------|------------------|
| `USER` | Who owns this process. Ali's agent runs as `ali`. The database runs as `postgres`. |
| `PID` | Process ID -- a unique number for each running program. You need this to stop a specific process. |
| `%CPU` | How much processor power this process uses. Ali's agent at 0.3% is healthy. 95% would be a problem. |
| `%MEM` | How much memory this process uses. The agent at 2.1% is fine. The database at 1.5% is normal for PostgreSQL. |
| `COMMAND` | The actual program running. This is the most useful column -- it tells you what each process IS. |

Ali looks at this and sees his agent (`competitor_tracker.py`), the database it writes to (`postgres`), and the SSH service keeping him connected (`sshd`). Three processes that tell the whole story of his deployment.

Now ask Claude Code:

```
How much disk space is left on this server?
```

Claude Code runs `df -h`. The `-h` flag means "human-readable" -- show sizes in GB instead of raw bytes.

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   23G   25G  48% /
tmpfs           2.0G   12M  2.0G   1% /dev/shm
```

**What you see:** Two rows of numbers.

**What this means:** The server has a 50 GB disk. 23 GB is used. 25 GB is free. At 48% capacity, Ali has room. If this number were 90%, he'd need to investigate what's eating space -- and he already knows the command for that (`du`).

## File Permissions: Who Can Do What

This is the one that makes people's eyes glaze over. It shouldn't. Permissions are a building with three levels of keycards.

Tell Claude Code:

```
Show me the detailed file listing for Ali's home directory.
```

Claude Code runs `ls -la /home/ali` and you see:

```
drwxr-xr-x  5 ali ali  4096 Feb 14 09:22 .
drwxr-xr-x  3 root root 4096 Feb 12 14:30 ..
-rw-------  1 ali ali   220 Feb 12 14:30 .bash_history
-rw-r--r--  1 ali ali  3526 Feb 12 14:30 .bashrc
drwxr-xr-x  2 ali ali  4096 Feb 14 09:22 competitor-tracker
-rw-rw-r--  1 ali ali   892 Feb 14 09:25 .env
```

Focus on the first column. Take `drwxr-xr-x`:

```
d   rwx   r-x   r-x
|    |      |      |
|    |      |      +-- Everyone else: read + execute
|    |      +--------- Group: read + execute
|    +---------------- Owner: read + write + execute
+-- Type: d = directory
```

The first character is the file type. `d` means directory. `-` means regular file.

Then come three groups of three characters. Each group represents a level of keycard:

- **Owner** (positions 2-4): The person who owns the file. Full keycard.
- **Group** (positions 5-7): People in the same team. Limited keycard.
- **Everyone** (positions 8-10): Any user on the server. Visitor badge.

Each position is either a letter (permission granted) or a dash (permission denied):

| Letter | Permission | For Files | For Directories |
|--------|-----------|-----------|-----------------|
| `r` | Read | View the contents | List what's inside |
| `w` | Write | Modify the contents | Add or delete files inside |
| `x` | Execute | Run as a program | Enter the directory |
| `-` | Denied | Cannot do this | Cannot do this |

Now decode Ali's files:

- **`drwxr-xr-x competitor-tracker`** -- Directory. Ali can do everything. Group and everyone can enter and look, but not modify.
- **`-rw------- .bash_history`** -- File. Only Ali can read and write it. Nobody else can see his command history.
- **`-rw-rw-r-- .env`** -- File. Ali can read and write. His group can read and write. Everyone can read (but not write).

That `.env` file permission is a problem. The `.env` file contains API keys and database passwords. "Everyone can read" means any user on the server could see Ali's secrets. In Lesson 5, Ali will fix this. For now, he can read the warning sign.

## Putting It Together

Ali directs Claude Code to run a health check:

```
You: Check if my competitor-tracker agent is running and healthy.
     Show me the process, resources, and whether the log file is growing.
```

Claude Code runs `ps aux | grep competitor_tracker`, `tail -5 /var/log/competitor-tracker/agent.log`, and `du -sh /var/log/competitor-tracker/`. Three commands. Thirty seconds. Ali sees his agent is running (PID 1247, 0.3% CPU, 2.1% memory), the log shows fresh entries with no errors, and the log folder is a manageable 12 MB.

He didn't type any of those commands. He directed Claude Code with a single sentence, then read the results. That's the skill. Not typing commands. Reading their output.

## Try With AI

### Prompt 1: Read Process Output

```
Show me all running processes on this machine with full details.
Pick any three lines from the output and explain each column to me.
What process is using the most memory?
```

**What you're learning:** How to read `ps aux` output. The column headers (USER, PID, %CPU, %MEM, COMMAND) are the same on every Linux server. Once you can read one, you can read them all.

### Prompt 2: Explain Permissions on Real Files

```
Show me the permissions on /etc/passwd and /etc/shadow.
Why are they different? What would happen if shadow had
the same permissions as passwd?
```

**What you're learning:** Why permissions matter for security. `/etc/passwd` is world-readable (every program needs it to map usernames to IDs). `/etc/shadow` stores password hashes and is locked down. This is the most concrete example of "permissions protect secrets."

### Prompt 3: du vs df

```
Run du -sh /var/log and df -h for me. What's the difference
between these two commands? When would I use one vs the other?
```

**What you're learning:** The difference between measuring a specific folder (`du` -- "how big is this thing?") and measuring the entire disk (`df` -- "how much room is left?"). Both answer questions about space, but from different angles. `du` is a magnifying glass. `df` is a fuel gauge.

---

## Flashcards Study Aid

<Flashcards />

You can read the server now. Process lists, disk usage, file permissions -- none of it is a black box anymore. But Ali's agent files are scattered. The script lives in one place, the config in another, and the logs are vanishing into a default location nobody checks. Time to build a proper home.
