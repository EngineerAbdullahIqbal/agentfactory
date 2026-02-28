---
sidebar_position: 9
title: "Chapter 11: Linux Operations for Agent Deployment Quiz"
---

# Chapter 11: Linux Operations for Agent Deployment Quiz

Test your understanding of Linux operations for deploying and managing AI agents on production servers.

<Quiz
title="Chapter 11: Linux Operations for Agent Deployment Assessment"
questions={[
{
question: "Ali's competitor-analysis agent worked perfectly on his laptop for a week. Then he closed his laptop on Friday night and went home. When he returned Monday morning, three days of data were missing. What is the fundamental reason this happened?",
options: [
"His laptop went to sleep, and processes tied to a user session stop when the session ends",
"The agent crashed due to a bug in the code over the weekend",
"His laptop lost its internet connection when he left the office",
"The database on his laptop ran out of storage space"
],
correctOption: 0,
explanation: "A laptop is tied to user sessions -- when Ali closed the laptop, the operating system suspended all running processes. A server, by contrast, runs 24/7 with no user session dependency. Option B is incorrect because the agent didn't crash; it was stopped by the OS sleep. Option C is wrong because even with internet, the process wouldn't run during sleep. Option D is incorrect because storage wasn't the issue -- the process simply wasn't running.",
source: "Lesson 1: Where Your Agent Lives"
},
{
question: "When Ali SSHed into the server for the first time, he saw 'dev@server:~$' and a blinking cursor. What does the '~' character represent in this prompt?",
options: [
"The root directory of the server",
"The temporary files directory",
"The current user's home directory",
"The SSH connection is encrypted"
],
correctOption: 2,
explanation: "The tilde (~) is a shorthand for the current user's home directory. When Ali logs in as 'dev', ~ refers to /home/dev. Option A is incorrect because the root directory is represented by /. Option B is wrong because /tmp is the temporary directory, not ~. Option D is incorrect because the ~ has nothing to do with encryption -- it's a filesystem path shorthand.",
source: "Lesson 1: Where Your Agent Lives"
},
{
question: "A server has directories /home, /var, /etc, /opt, and /tmp. Your agent's configuration files (like database connection settings) would conventionally be stored in which directory?",
options: [
"/tmp -- because configuration can be regenerated if lost",
"/home -- because it belongs to the user who created the agent",
"/etc -- because it stores configuration files for the system",
"/var -- because configuration changes over time"
],
correctOption: 2,
explanation: "/etc is the conventional directory for system-wide configuration files on Linux. Option A is incorrect because /tmp is cleared on reboot -- configuration must persist. Option B is wrong because /home stores user personal files, not system service configuration. Option D is incorrect because /var stores variable data like logs and databases, not static configuration.",
source: "Lesson 1: Where Your Agent Lives"
},
{
question: "What is the relationship between a terminal and a shell?",
options: [
"They are different names for the same program",
"The terminal is the window interface, and the shell is the program that interprets and executes commands",
"The shell is the window interface, and the terminal is the command interpreter",
"The terminal runs on the server, and the shell runs on your laptop"
],
correctOption: 1,
explanation: "The terminal is the visual interface (the 'glass window') while the shell is the program behind it that listens for instructions, runs them, and returns results. Option A is wrong because they are distinct components. Option C reverses the definitions. Option D is incorrect because both the terminal and shell can run on either machine depending on the connection context.",
source: "Lesson 1: Where Your Agent Lives"
},
{
question: "SSH uses encryption to protect the connection between your laptop and the server. What practical benefit does this provide?",
options: [
"It makes the connection faster by compressing data",
"It prevents anyone monitoring the network from reading what you type or what the server sends back",
"It automatically backs up your files between the two machines",
"It ensures the server never reboots unexpectedly"
],
correctOption: 1,
explanation: "SSH encryption ensures that all data transmitted between your laptop and the server is unreadable to anyone intercepting the network traffic. Option A is wrong because encryption doesn't primarily speed up connections. Option C is incorrect because SSH is a remote access protocol, not a backup tool. Option D is wrong because SSH has no control over server reboots.",
source: "Lesson 1: Where Your Agent Lives"
},
{
question: "Every Linux command follows a consistent structure. In the command 'ls -la /var/log', what role does '-la' play?",
options: [
"It is the object -- the target the command acts on",
"It is the verb -- the action being performed",
"It modifies how the command executes, like adverbs modify a verb",
"It specifies which user should run the command"
],
correctOption: 2,
explanation: "Flags like -la are the 'adverbs' of a command -- they modify how the verb (ls) operates. -l means 'long format' and -a means 'all files including hidden ones'. Option A is wrong because /var/log is the object. Option B is incorrect because ls is the verb. Option D is wrong because flags don't specify user context.",
source: "Lesson 2: Reading What Your Agent Does"
},
{
question: "You see this output from ps aux: 'ali 1247 0.3 2.1 458920 42880 ? Sl 09:22 1:45 python3 competitor_tracker.py'. The %MEM column shows 2.1. What does this tell you about the agent's health?",
options: [
"The agent is critically low on memory and needs immediate attention",
"The agent is using a normal, healthy amount of memory at 2.1%",
"The agent has been running for 2.1 hours",
"The agent has processed 2.1% of its total workload"
],
correctOption: 1,
explanation: "2.1% memory usage is a healthy, low value for a running Python process. Option A is wrong because 2.1% is far from critical -- you would worry at 90%+ usage. Option C is incorrect because %MEM is memory percentage, not runtime duration (TIME column shows runtime). Option D is wrong because %MEM measures system memory consumption, not workload progress.",
source: "Lesson 2: Reading What Your Agent Does"
},
{
question: "In a file permission string like 'drwxr-xr-x', what does the leading 'd' indicate?",
options: [
"The file is in the /dev directory",
"The file has delete protection enabled",
"The entry is a directory, not a regular file",
"The file requires root access to open"
],
correctOption: 2,
explanation: "The first character indicates the file type: 'd' means directory, '-' means regular file. Option A is wrong because the 'd' has nothing to do with the file's location. Option B is incorrect because there is no 'delete protection' indicator in the permission string. Option D is wrong because root access is determined by the permission characters (rwx), not the type indicator.",
source: "Lesson 2: Reading What Your Agent Does"
},
{
question: "You see the permission string '-rw-r--r--' on a file. A colleague asks you who can modify this file. What is the correct answer?",
options: [
"Anyone on the server can modify it",
"Only the owner can modify it -- group and others can only read",
"Nobody can modify it because write permission is denied for everyone",
"Only root can modify it regardless of the permission string"
],
correctOption: 1,
explanation: "Breaking down -rw-r--r--: the owner has rw- (read and write), the group has r-- (read only), and others have r-- (read only). Only the owner has the 'w' (write) permission. Option A is wrong because group and others lack the 'w' bit. Option C is incorrect because the owner does have write permission (the second character is 'w'). Option D is wrong because the permission string applies to all users including root, though root can override permissions.",
source: "Lesson 2: Reading What Your Agent Does"
},
{
question: "The command 'df -h' shows the server disk is at 48% capacity with 25 GB free. The command 'du -sh /var/log' shows the log directory is 8 GB. What is the fundamental difference between what these two commands measure?",
options: [
"df measures only system files while du measures only user files",
"df shows the total disk usage across the entire filesystem while du measures the size of a specific directory or file",
"They measure the same thing but df is faster",
"du shows current usage while df shows historical usage"
],
correctOption: 1,
explanation: "df is a 'fuel gauge' showing overall disk capacity and free space. du is a 'magnifying glass' measuring the size of specific files or directories. Option A is wrong because both commands can measure any files. Option C is incorrect because they measure fundamentally different scopes. Option D is wrong because both show current state, not historical data.",
source: "Lesson 2: Reading What Your Agent Does"
},
{
question: "When Claude Code runs a command like 'grep', what does this command do?",
options: [
"It compresses files to save disk space",
"It changes file permissions",
"It searches inside files for specific text patterns",
"It moves files between directories"
],
correctOption: 2,
explanation: "grep searches the contents of files for lines matching a text pattern. It's the 'find this word inside these files' command. Option A describes compression tools like gzip. Option B describes chmod. Option D describes mv.",
source: "Lesson 2: Reading What Your Agent Does"
},
{
question: "Ali's agent script sits in his home directory alongside vacation photos and homework files, with the database password hardcoded on line 14. What is the FIRST organizational problem this creates?",
options: [
"The agent runs slower because of the other files in the directory",
"A single accidental 'rm' or file deletion could destroy the agent alongside personal files, and anyone reading the code can see credentials",
"Linux cannot run Python scripts from the home directory",
"The vacation photos consume too much memory for the agent to function"
],
correctOption: 1,
explanation: "Mixing agent files with personal files means accidental deletion affects everything, and hardcoded secrets are visible to anyone who reads the source code. Option A is wrong because nearby files don't affect execution speed. Option C is incorrect because Python scripts can run from any directory. Option D is wrong because files on disk don't consume runtime memory.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "The recommended agent directory structure uses /opt/agents/competitor-tracker/ instead of /home/ali/competitor-tracker/. Why is /opt the better choice?",
options: [
"/opt runs programs faster than /home due to disk optimization",
"/opt is convention for optional software not bundled with the OS -- it is discoverable by other team members and can host multiple agents side by side",
"/opt has special permissions that automatically protect files from unauthorized access",
"/opt is the only directory where systemd can find service executables"
],
correctOption: 1,
explanation: "/opt is the Linux convention for optional, manually-installed software. Placing agents here makes them discoverable (/opt/agents/agent-name/) and separates them from personal user files. Option A is wrong because directory location doesn't affect execution speed. Option C is incorrect because /opt has no special automatic permissions. Option D is wrong because systemd can run executables from any path specified in ExecStart.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "Ali extracts his database password from the Python source code into a .env file and runs 'chmod 600' on it. What specific protection does chmod 600 provide?",
options: [
"It encrypts the contents of the file so they cannot be read in plain text",
"It makes the file invisible when running ls",
"It restricts access so only the file owner can read and write it -- no group or other users can access it at all",
"It prevents the file from being deleted even by the owner"
],
correctOption: 2,
explanation: "chmod 600 sets permissions to -rw------- meaning only the owner has read and write access. Group members and other users have zero access. Option A is wrong because chmod controls access permissions, not encryption. Option B is incorrect because chmod doesn't hide files (hidden files start with a dot). Option D is wrong because the owner retains full control including deletion.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "Ali's agent prints status messages to the terminal. When he closes his SSH session, all output is lost. He uses 'python3 agent.py 2>&1 | tee -a logs/agent.log' to fix this. What does '2>&1' accomplish?",
options: [
"It runs the agent twice for redundancy",
"It limits the agent to using only 2 GB of memory",
"It combines error output (stderr) with normal output (stdout) so both are captured in the log file",
"It waits 2 seconds before starting the agent"
],
correctOption: 2,
explanation: "2>&1 redirects file descriptor 2 (stderr, error messages) to file descriptor 1 (stdout, normal output), ensuring both regular output and error messages are captured by tee and written to the log file. Option A is wrong because it has nothing to do with redundancy. Option B is incorrect because memory limits are set elsewhere (e.g., systemd MemoryMax). Option D is wrong because it has nothing to do with timing.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "What is the difference between the redirect operator '>' and the 'tee' command when saving output to a file?",
options: [
"They do exactly the same thing but tee is newer",
"Redirect (>) sends output only to the file, replacing terminal display. Tee sends output to both the terminal and the file simultaneously",
"Redirect is for text files only while tee works with binary files",
"Tee is faster because it uses parallel processing"
],
correctOption: 1,
explanation: "The redirect operator (>) sends output to a file and you lose the terminal display. The tee command duplicates output to both the screen and a file. Option A is wrong because they behave differently. Option C is incorrect because both can handle any file type. Option D is wrong because the difference is about destination, not speed.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "Ali hardcoded his API key in source code and pushed it to GitHub. Why is this particularly dangerous compared to having a weak password in a .env file?",
options: [
"GitHub automatically runs the code, exposing the key to their servers",
"Source code on GitHub is searchable and permanent -- bots scan public repositories for exposed keys and can compromise accounts within minutes",
"API keys in Python files run slower than keys loaded from environment variables",
".env files are immune to all security breaches"
],
correctOption: 1,
explanation: "Public GitHub repositories are continuously scanned by automated bots looking for exposed credentials. Once pushed, the key is in Git history even if the file is deleted. Option A is wrong because GitHub doesn't execute pushed code. Option C is incorrect because key storage location doesn't affect runtime speed. Option D is wrong because .env files can still be compromised, but they are easier to keep out of version control via .gitignore.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "Why is a .env file separate from a config.yaml file? What principle determines which settings go where?",
options: [
".env files are for Python and config.yaml is for JavaScript",
"Secrets (passwords, API keys) go in .env because it must never be shared. Non-secret configuration (intervals, retry counts) goes in config files because they can be safely shared and version-controlled",
".env files are read faster than YAML files by the operating system",
"There is no meaningful difference -- it is purely a naming convention"
],
correctOption: 1,
explanation: "The separation is about security boundaries. Secrets in .env stay out of version control and are restricted with chmod 600. Configuration in config files is shareable and can be committed to Git. Option A is wrong because the distinction is about content sensitivity, not programming language. Option C is incorrect because read speed is not the motivation. Option D is wrong because the distinction has real security implications.",
source: "Lesson 3: Setting Up Your Agent's Home"
},
{
question: "When Ali starts his agent manually in an SSH session and then closes his laptop, the agent dies. What is the technical reason for this?",
options: [
"The agent's code contains a bug that detects when the user leaves",
"SSH encryption keys expire when the connection drops, crashing the program",
"The process is a child of the terminal session -- when the session ends, the OS sends a termination signal to all child processes",
"The server automatically shuts down processes to save energy when no users are connected"
],
correctOption: 2,
explanation: "Processes started in a terminal session are children of that session. When the SSH connection drops, the OS sends SIGHUP (hangup signal) to all child processes, terminating them. Option A is wrong because this is OS behavior, not application code. Option B is incorrect because SSH keys don't expire on disconnect. Option D is wrong because servers don't shut down processes based on user connections.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "What is the core difference between a process and a service?",
options: [
"A process runs faster because it has direct hardware access",
"A process is a temporary program tied to whoever started it, while a service is managed by the OS and persists independently of any user session",
"A service can only be created by the root user",
"A process uses less memory than a service running the same code"
],
correctOption: 1,
explanation: "A process is like a phone call -- it ends when you hang up. A service is like a security guard managed by the building -- if the guard leaves, the building hires a replacement. The OS (via systemd) ensures the service keeps running. Option A is wrong because both run at the same speed. Option C is incorrect because service files require root to install but run as any user. Option D is wrong because the same code uses the same memory regardless of how it's started.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "In a systemd unit file, what does 'After=network.target' specify?",
options: [
"The service should monitor network traffic after starting",
"The service should only start after the network is available, preventing failures from trying to connect before the network is ready",
"The service will automatically reconnect if the network drops",
"The service will be stopped if the network goes down"
],
correctOption: 1,
explanation: "After=network.target tells systemd to wait until the network subsystem is ready before starting the service. An agent that needs internet access would fail immediately if started before the network is up. Option A is wrong because After= controls startup ordering, not runtime behavior. Option C is incorrect because reconnection is application-level, not systemd-level. Option D is wrong because After= only affects startup order, not runtime dependencies.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "A systemd unit file contains 'Restart=on-failure' and 'RestartSec=5'. If the agent crashes due to a bug, what happens?",
options: [
"Systemd waits 5 seconds then restarts the agent. This delay prevents crash loops where a bug causes thousands of rapid restarts that flood the logs",
"The agent is permanently stopped and an admin must manually restart it",
"Systemd immediately restarts the agent without any delay",
"Systemd sends an email notification but does not restart the service"
],
correctOption: 0,
explanation: "Restart=on-failure means systemd restarts the service when it exits with a non-zero (error) exit code. RestartSec=5 introduces a 5-second delay to prevent rapid crash loops. Option B is wrong because on-failure explicitly triggers automatic restarts on crashes. Option C is incorrect because RestartSec=5 enforces a 5-second wait. Option D is wrong because systemd restarts by default, not just notifies.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "What is the difference between 'Restart=always' and 'Restart=on-failure' in a systemd service?",
options: [
"Restart=always is faster at restarting than Restart=on-failure",
"Restart=always restarts the service no matter how it exits (including intentional stops via systemctl stop), while Restart=on-failure only restarts when the process exits with a non-zero error code",
"Restart=on-failure restarts more aggressively than Restart=always",
"There is no practical difference -- both restart the service after any exit"
],
correctOption: 1,
explanation: "Restart=always restarts regardless of exit reason, which means even a deliberate 'systemctl stop' would cause a restart (systemd handles this specially). Restart=on-failure only restarts on error exits, respecting intentional stops. Option A is wrong because restart speed is controlled by RestartSec, not the restart policy. Option C reverses the behavior. Option D is wrong because they handle clean exits differently.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "The systemd unit file includes 'MemoryMax=512M'. What happens if the agent consumes 600 MB of RAM?",
options: [
"The agent slows down but continues running normally",
"A warning message is logged but no action is taken",
"Systemd terminates the agent to protect other services on the server from resource exhaustion",
"The server automatically adds more RAM to accommodate the agent"
],
correctOption: 2,
explanation: "MemoryMax is a hard limit. If the agent exceeds 512 MB, systemd's OOM (out of memory) killer terminates it. This prevents a memory leak in one agent from crashing the entire server. Option A is wrong because the limit is enforced, not advisory. Option B is incorrect because MemoryMax triggers termination, not just logging. Option D is wrong because physical RAM cannot be added dynamically.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "After creating a systemd service file, you must run 'systemctl daemon-reload' before starting the service. Why?",
options: [
"It compiles the service file into machine code for faster execution",
"It tells systemd to re-read all service files from disk so it discovers the new or changed configuration",
"It restarts all running services to apply global changes",
"It validates the service file syntax and fixes any errors"
],
correctOption: 1,
explanation: "daemon-reload tells systemd to scan its configuration directories and load any new or modified unit files. Without it, systemd doesn't know the new file exists. Option A is wrong because unit files are configuration, not compiled code. Option C is incorrect because daemon-reload only reloads configuration -- it doesn't restart services. Option D is wrong because it loads files but doesn't auto-fix syntax errors.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "The unit file directive 'WantedBy=multi-user.target' appears in the [Install] section. What does it control?",
options: [
"It limits the service to only run when multiple users are logged in",
"It ensures the service starts automatically when the server boots into its normal operating mode",
"It allows multiple instances of the service to run simultaneously",
"It requires multiple administrators to approve before the service can start"
],
correctOption: 1,
explanation: "multi-user.target is the standard Linux boot target for normal server operation. WantedBy=multi-user.target means 'start this service during normal boot.' This is what makes the agent survive server reboots. Option A is wrong because multi-user.target is a boot stage name, not a user count requirement. Option C is incorrect because this directive controls boot behavior, not instance count. Option D is wrong because there is no approval mechanism involved.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "Why does the lesson recommend systemd over tmux for running agents 24/7?",
options: [
"tmux is more expensive to run than systemd",
"systemd manages the full service lifecycle -- auto-restart on crash, start on boot, resource limits -- while tmux only keeps a terminal session alive",
"tmux cannot run Python scripts",
"systemd provides a graphical interface for monitoring agents"
],
correctOption: 1,
explanation: "tmux keeps a terminal session alive after disconnect, which is useful for interactive work. But systemd provides crash recovery (Restart=), boot persistence (enable), resource limits (MemoryMax), and centralized logging (journalctl). Option A is wrong because both are free. Option C is incorrect because tmux can run any command. Option D is wrong because systemd is command-line based.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "What is the 'ExecStart' directive in a systemd unit file, and why must it use absolute paths?",
options: [
"It is an optional description field that documents what the service does",
"It specifies the exact command to run when the service starts, using full absolute paths to eliminate ambiguity about which Python interpreter and which script to execute",
"It defines the maximum execution time before the service is killed",
"It sets the order in which services start relative to each other"
],
correctOption: 1,
explanation: "ExecStart is the command systemd runs to start the service. Absolute paths (/usr/bin/python3, not just python3) ensure the correct binary is always used regardless of the PATH environment variable. Option A is wrong because Description handles documentation. Option C is incorrect because timeout is controlled by TimeoutStartSec. Option D is wrong because ordering is controlled by After= and Before= directives.",
source: "Lesson 4: Making Your Agent Unkillable"
},
{
question: "Marcus ran his agent as root for three weeks. When he checked the auth log, he found 47,000 failed login attempts. Why is running the agent as root especially dangerous in this context?",
options: [
"Root processes consume more CPU than regular user processes",
"If any attacker succeeded in logging in, they would have complete control over the entire server -- not just the agent, but all data, services, and the ability to install malware",
"Root users cannot use SSH key authentication",
"The 47,000 attempts caused the agent to slow down"
],
correctOption: 1,
explanation: "Root has unrestricted access to every file and service on the server. A compromised root account means total server takeover. Option A is wrong because root processes don't inherently use more CPU. Option C is incorrect because root users can absolutely use SSH keys. Option D is wrong because failed login attempts don't directly affect agent performance.",
source: "Lesson 5: Locking the Door"
},
{
question: "The command 'useradd --system --no-create-home --shell /usr/sbin/nologin agentuser' creates a service account. What does '--shell /usr/sbin/nologin' accomplish?",
options: [
"It gives the user a faster shell for running commands",
"It prevents anyone from logging in interactively as this user via SSH or terminal -- the account exists only to own and run services",
"It logs the user out automatically after 30 minutes of inactivity",
"It disables all network access for processes run by this user"
],
correctOption: 1,
explanation: "Setting the shell to /usr/sbin/nologin means any attempt to start an interactive session as this user is immediately rejected. The user exists solely to own files and run services. Option A is wrong because nologin prevents sessions entirely. Option C is incorrect because it's an immediate block, not a timeout. Option D is wrong because it restricts login, not network access.",
source: "Lesson 5: Locking the Door"
},
{
question: "You check permissions on a .env file containing API keys and see '-rw-r--r--'. Why is this a security problem?",
options: [
"The file is too small to store API keys securely",
"The file should be in a different directory for security",
"The 'others' group has read permission (r--), meaning any user on the server can read the secrets inside the file",
"The file lacks execute permission, so the agent cannot load the keys"
],
correctOption: 2,
explanation: "The permission -rw-r--r-- means owner can read/write, group can read, and others can read. Any user on the server can view the API keys. The correct permission is -rw------- (chmod 600). Option A is wrong because file size doesn't affect security. Option B is incorrect because directory location alone doesn't fix permission issues. Option D is wrong because .env files are read as data, not executed.",
source: "Lesson 5: Locking the Door"
},
{
question: "What is the difference between 'chown' and 'chmod'?",
options: [
"chown changes who owns a file (the user/group), while chmod changes what actions are allowed (read/write/execute permissions)",
"They are different names for the same operation on different Linux distributions",
"chown is for directories and chmod is for files only",
"chmod changes ownership and chown changes permissions"
],
correctOption: 0,
explanation: "chown (change owner) modifies file ownership -- WHO the file belongs to. chmod (change mode) modifies file permissions -- WHAT actions are allowed for owner, group, and others. Option B is wrong because they are distinct commands on all distributions. Option C is incorrect because both work on files and directories. Option D reverses the definitions.",
source: "Lesson 5: Locking the Door"
},
{
question: "SSH keys use a pair: a private key and a public key. Which key goes on the server, and why is it safe to share?",
options: [
"The private key goes on the server because the server needs to decrypt incoming connections",
"The public key goes on the server -- it can only verify identity, not impersonate it, so sharing it poses no risk",
"Both keys must be on both machines for the connection to work",
"Neither key goes on the server -- SSH keys are only stored on the client machine"
],
correctOption: 1,
explanation: "The public key is placed on the server. It can verify that a connection was signed by the matching private key but cannot be used to impersonate the user. The private key never leaves your laptop. Option A is wrong because sharing the private key would allow anyone to impersonate you. Option C is incorrect because only the public key goes on the server. Option D is wrong because the server needs the public key for verification.",
source: "Lesson 5: Locking the Door"
},
{
question: "The principle of least privilege says to give 'the minimum access needed and nothing more.' Which of the following is a violation of this principle?",
options: [
"Giving a colleague read-only access to agent logs",
"Running the agent as a dedicated user that can only access its own directory",
"Using chmod 600 on the .env file",
"Running the agent as root because it was easier to set up and 'it works fine'"
],
correctOption: 3,
explanation: "Running as root gives the agent access to every file and service on the server, far exceeding what it needs. This violates least privilege because the agent only needs access to its own directory and dependencies. Options A, B, and C are all examples of correctly applying least privilege -- limiting access to what is actually needed.",
source: "Lesson 5: Locking the Door"
},
{
question: "Why does disabling password SSH authentication and requiring SSH keys eliminate brute-force attacks?",
options: [
"SSH keys are encrypted with a stronger algorithm than passwords",
"Brute-force attacks guess passwords. With passwords disabled, there is nothing to guess -- the server rejects all password-based login attempts regardless of what is entered",
"SSH keys automatically block IP addresses after failed attempts",
"SSH keys expire after 24 hours, limiting the attack window"
],
correctOption: 1,
explanation: "Brute-force attacks work by guessing passwords. When password authentication is disabled, the attack vector is removed entirely -- the server won't accept password attempts at all. Option A describes key strength but not why brute-force fails. Option C is incorrect because IP blocking is handled by tools like fail2ban, not SSH keys. Option D is wrong because SSH keys don't expire on a timer.",
source: "Lesson 5: Locking the Door"
},
{
question: "After setting up the dedicated agentuser, Ali updates his systemd unit file from 'User=ali' to 'User=agentuser'. Why is this change critical to the security model?",
options: [
"agentuser runs processes faster because it has fewer configuration files",
"If the agent is compromised, the attacker only gains access to the agent's directory -- not Ali's personal files, other services, or system configuration",
"systemd requires a system user and cannot run services as regular users",
"The change allows multiple instances of the agent to run simultaneously"
],
correctOption: 1,
explanation: "Running as agentuser limits the blast radius of a compromise. An attacker who exploits the agent can only access /opt/agents/competitor-tracker/, not Ali's home directory or system files. Option A is wrong because the user account doesn't affect speed. Option C is incorrect because systemd can run services as any user. Option D is wrong because the User= directive doesn't control instance count.",
source: "Lesson 5: Locking the Door"
},
{
question: "Ali's agent produced an empty report but showed no errors. His first instinct was to restart everything. Why does the LNPS method say NOT to restart first?",
options: [
"Restarting takes too long and wastes server resources",
"Restarting might fix the symptom temporarily but destroys the evidence of the root cause -- if the problem is persistent, it will return, likely at the worst possible time",
"Linux does not allow restarting services more than once per hour",
"Restarting requires root access, which violates least privilege"
],
correctOption: 1,
explanation: "Restarting can mask symptoms without addressing the underlying cause. In Ali's case, the database wasn't enabled at boot -- restarting the agent would have produced another empty report after the next reboot. Reading logs revealed the true cause in under two minutes. Option A is wrong because restarts are fast. Option C is incorrect because there's no such restriction. Option D is wrong because restarting is allowed with appropriate sudo access.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "In the LNPS method, what do the four letters stand for, and why are they in that specific order?",
options: [
"Linux, Networking, Python, Security -- ordered by technology stack layer",
"Logs, Network, Process, System -- ordered from fastest-to-answer to slowest, with each step eliminating a category of causes",
"Load, Nodes, Performance, Storage -- ordered by resource type",
"List, Navigate, Print, Search -- ordered by command complexity"
],
correctOption: 1,
explanation: "LNPS stands for Logs, Network, Process, System. Logs are checked first because the agent often states the problem directly. Network is next because connectivity failures are common. Process catches zombie or stuck services. System resources catch exhaustion. Option A, C, and D all describe incorrect expansions.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "Ali's agent logs show 'WARNING: Query returned 0 rows' but no errors or crashes. Following LNPS, what does this tell you and what should you check next?",
options: [
"The agent code has a bug in its SQL query and needs to be rewritten",
"The agent is working correctly -- the database returned empty results, so the problem is upstream. Check if the database service is running and contains data",
"The network connection to the database timed out",
"The agent's memory limit is too low to process the query results"
],
correctOption: 1,
explanation: "The agent did exactly what it was told -- queried the database, got zero rows, and saved an empty report. The problem isn't the agent; it's the data source. The next diagnostic step is checking the database service status. Option A is wrong because the query executed successfully with zero rows. Option C is incorrect because the agent connected to the database (no connection error). Option D is wrong because zero rows wouldn't trigger memory limits.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "The journalctl command 'journalctl -u competitor-tracker --since \"6 hours ago\" --priority=warning' filters logs in three ways. What do the three filters accomplish together?",
options: [
"They delete old logs, compress recent logs, and highlight warnings in red",
"They show only entries from the competitor-tracker service, only from the last 6 hours, and only messages at warning level or above -- narrowing thousands of log lines to the relevant few",
"They configure the service to produce warnings, set a 6-hour timeout, and create a priority queue",
"They back up competitor-tracker logs, schedule a 6-hour maintenance window, and escalate warnings to email"
],
correctOption: 1,
explanation: "-u filters by service unit name, --since filters by time range, and --priority filters by severity level. Together they narrow potentially thousands of log lines to just the relevant entries. Option A is wrong because journalctl reads logs, it doesn't delete or compress them. Option C is incorrect because these are read-time filters, not service configuration. Option D is wrong because journalctl is a log viewer, not a backup or scheduling tool.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "You run 'curl -I https://api.example.com/health' and get 'Connection refused'. Then you run 'ping -c 3 8.8.8.8' and it succeeds. What can you conclude?",
options: [
"The server has no internet connectivity at all",
"The server can reach the internet (ping works), but the specific API service is unreachable -- either the API server is down or a firewall is blocking that specific port",
"The DNS server is misconfigured",
"The curl command has a syntax error"
],
correctOption: 1,
explanation: "Ping to 8.8.8.8 proves general internet connectivity works. Curl failing to the API means the issue is specific to that service or port -- the API server may be down, or a firewall may be blocking port 443. Option A is wrong because ping succeeded. Option C is incorrect because ping to an IP address (8.8.8.8) bypasses DNS. Option D is wrong because 'Connection refused' is a network response, not a syntax error.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "You check a service with 'systemctl status' and see 'activating (auto-restart)'. What does this status indicate?",
options: [
"The service is starting up normally for the first time",
"The service is in a crash-restart loop -- it keeps crashing and systemd keeps restarting it per the restart policy",
"The service is being updated to a newer version",
"The service is running normally but using automatic scaling"
],
correctOption: 1,
explanation: "The 'activating (auto-restart)' status means systemd is repeatedly restarting the service after crashes. This indicates a persistent failure -- the agent crashes on startup, systemd waits RestartSec seconds, restarts it, and it crashes again. Option A is wrong because normal startup shows 'activating (start)' briefly then 'active (running)'. Option C is incorrect because updates are not reflected in service status this way. Option D is wrong because systemd doesn't handle auto-scaling.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "The system check shows disk at 96% and memory at 90%. How do these resource levels threaten your agent?",
options: [
"They don't -- modern servers handle high resource usage automatically",
"The agent will run slower but won't actually fail",
"A nearly full disk prevents writing logs and reports, and high memory triggers the OOM killer which may randomly terminate the agent or other services",
"The server automatically orders additional hardware when resources are low"
],
correctOption: 2,
explanation: "At 96% disk, services can't write logs or data files. At 90% memory, the Linux OOM (out-of-memory) killer starts terminating processes to free memory -- your agent may be killed without warning. Option A is wrong because resource exhaustion causes real failures. Option B is incorrect because full disk causes write failures, not just slowness. Option D is wrong because servers don't auto-provision hardware.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "In Ali's debugging scenario, the root cause of the empty report was that PostgreSQL wasn't enabled to start on boot. How does this connect to what he learned in Lesson 4?",
options: [
"Ali should have used tmux instead of systemd for the database",
"In Lesson 4, Ali used 'systemctl enable' for his agent but forgot to do the same for the database -- 'enable' is what makes a service survive reboots",
"The database needed a different restart policy than the agent",
"Ali's agent should have been configured to start the database automatically"
],
correctOption: 1,
explanation: "The 'systemctl enable' command (Lesson 4) makes a service start on boot. Ali enabled his agent but not PostgreSQL, so after a server reboot, the agent started but the database didn't. Option A is wrong because tmux doesn't manage services. Option C is incorrect because the restart policy wasn't the issue -- the database simply wasn't registered to start at boot. Option D describes a possible workaround but not the lesson connection.",
source: "Lesson 6: When Things Go Wrong"
},
{
question: "A deployment spec has six sections. What is the purpose of separating them into distinct sections rather than writing a single set of instructions?",
options: [
"It makes the document longer and more impressive to clients",
"Each section maps to a specific skill (server access, directory structure, application setup, service config, security, verification), allowing systematic execution and easy identification of which stage failed if something goes wrong",
"Linux requires commands to be organized into exactly six categories",
"Each section must be executed by a different team member"
],
correctOption: 1,
explanation: "The six sections create a systematic workflow where each maps to a lesson from the chapter. If deployment fails, you know exactly which stage to revisit. Option A is wrong because the structure serves execution, not appearances. Option C is incorrect because Linux has no such requirement. Option D is wrong because one person (or one AI agent) can execute all sections sequentially.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "Ali deployed his first agent in three days through trial and error. His second agent took fifteen minutes using a deployment spec. What made the difference?",
options: [
"The second server was faster and had better hardware",
"The deployment spec captured all learned knowledge into a structured execution guide, eliminating discovery and trial-and-error from the second deployment",
"The second agent was simpler and required fewer configuration steps",
"Ali memorized all the Linux commands after the first deployment"
],
correctOption: 1,
explanation: "The spec transformed scattered experiential knowledge into a repeatable, sequential checklist. Both agents had the same complexity -- the difference was structure, not skill or hardware. Option A is wrong because both used the same server. Option C is incorrect because the sentiment tracker had similar complexity (systemd, .env, permissions, verification). Option D is wrong because the spec replaced memorization with a written guide.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "The verification section of a deployment spec includes 'Survives terminal closure' and 'Survives reboot' as separate checks. Why are both necessary?",
options: [
"They test the same thing -- if it survives one, it survives the other",
"Terminal closure tests that the service is managed by systemd (not tied to a session), while reboot tests that 'systemctl enable' was run -- these are two different failure modes with different root causes",
"Terminal closure is a quick test and reboot is a thorough test of the same property",
"Only one is necessary -- the other is included for documentation completeness"
],
correctOption: 1,
explanation: "A service can survive terminal closure (it's a systemd service, not a process) but still fail after reboot (if 'enable' was never run). These are independent failure modes: session independence vs boot persistence. Ali's database failed exactly this way -- it was a service but not enabled at boot. Option A is wrong because they test different things. Option C is incorrect because they're not degrees of the same test. Option D is wrong because both checks catch distinct real-world failures.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "The deployment spec's security checklist includes 'grep for API_KEY, PASSWORD, SECRET in source code'. Why is this grep check important even when secrets are in a .env file?",
options: [
"It verifies the .env file was created correctly",
"It catches cases where secrets were missed during extraction -- developers sometimes extract most secrets but leave one or two hardcoded values behind",
"grep runs faster than manually reading all source files",
"It creates a security audit log that can be reviewed later"
],
correctOption: 1,
explanation: "Even after extracting secrets to .env, it's common to miss a hardcoded credential buried in the code. grep catches these remnants before deployment. Option A is wrong because the grep searches source code, not the .env file. Option C describes a true property of grep but not why the check matters. Option D is incorrect because grep's output is not stored as an audit log by default.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "In the capstone scenario, Ali writes the deployment spec BEFORE executing any commands. Why is writing the spec first more effective than deploying and documenting afterward?",
options: [
"Writing the spec first forces you to think through all requirements before touching the server, catching missing steps and dependencies before they become runtime errors",
"Linux requires a deployment spec file to be present before systemd services can be created",
"The spec automatically generates the systemd unit file",
"Documenting afterward is forbidden by most cloud providers"
],
correctOption: 0,
explanation: "Writing the spec first is a planning exercise that surfaces missing requirements (like environment variables or permissions) before execution begins. During execution, you follow the plan rather than discovering requirements through failure. Option B is wrong because systemd has no such requirement. Option C is incorrect because the spec is a human document, not an automation tool. Option D is wrong because there's no such restriction.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "The deployment verification includes checking that 'resource usage is within limits.' Why is this check necessary immediately after deployment rather than waiting for problems to appear?",
options: [
"Resource monitoring tools only work in the first few minutes after deployment",
"A newly deployed agent may have a memory leak or excessive CPU usage that appears normal initially but degrades over time -- catching baseline anomalies early prevents 3 AM failures",
"Server providers charge more for monitoring checks done after the first hour",
"Linux automatically disables resource monitoring after a service has been running for 24 hours"
],
correctOption: 1,
explanation: "Checking resource usage at deployment establishes a baseline and catches obvious issues (like starting at 400 MB of 512 MB limit) before they escalate. A slow memory leak might not crash for days but checking early reveals if usage is already higher than expected. Option A is wrong because monitoring tools work anytime. Option C is incorrect because there's no such pricing model. Option D is wrong because Linux doesn't disable monitoring.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "The capstone maps each deployment spec section to a lesson. Section 4 (Service Configuration) maps to Lesson 4. If a colleague says 'the agent keeps dying after reboot,' which spec section and lesson should they revisit?",
options: [
"Section 1 (Server Access) -- they probably lost their SSH connection",
"Section 3 (Application Setup) -- the agent code probably has a bug",
"Section 4 (Service Configuration) -- they likely forgot 'systemctl enable' which makes the service start on boot, as covered in Lesson 4",
"Section 6 (Verification) -- they skipped the verification step"
],
correctOption: 2,
explanation: "Dying after reboot specifically points to the service not being enabled at boot. 'systemctl enable' in Section 4 is what makes services persist across reboots. Option A is wrong because SSH access doesn't affect service persistence. Option B is incorrect because the agent runs fine until reboot. Option D describes a missed check but not the root cause.",
source: "Lesson 7: Capstone: Zero to Production"
},
{
question: "Throughout Chapter 11, Ali directs Claude Code to run commands rather than typing them himself. What skill is this teaching?",
options: [
"How to memorize Linux commands through repetition",
"How to describe intentions to an AI agent and interpret the results -- the same skill used when directing agents in production",
"How to avoid learning Linux entirely since AI handles everything",
"How to debug Claude Code when it makes mistakes"
],
correctOption: 1,
explanation: "The chapter teaches directing AI agents with clear intent and reading the output critically. This is the same skill students need for managing deployed agents -- describing what needs to happen and verifying the results. Option A is wrong because the chapter explicitly avoids memorization. Option C is incorrect because students must understand the output to verify correctness. Option D is not the primary skill being taught.",
source: "Lesson 7: Capstone: Zero to Production"
}
]}
/>
