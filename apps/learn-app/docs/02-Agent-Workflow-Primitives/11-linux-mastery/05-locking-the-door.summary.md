### Core Concept
An unkillable agent running as root is a disaster waiting to happen. Security means creating dedicated users with minimal access, locking down file permissions so secrets stay secret, replacing password SSH with key-based authentication, and following the principle of least privilege — give the mailbox key, not the front door key.

### Key Mental Models
- **Users as Building Badges**: Root is the master key that opens every door. A dedicated `agentuser` is a badge that opens only one office. If stolen, the damage is contained to that one room.
- **Permissions as Keycards (Applied)**: The three-level keycard system from Lesson 2 now becomes actionable — `chmod 600` on `.env` means only the owner can read secrets, `chmod 750` on the directory means others cannot even enter.
- **Fingerprint vs House Key**: A password is a house key anyone can copy if they see it. An SSH key is a fingerprint scanner — even if someone watches you use it, they cannot replicate it. This is why 47,000 brute-force attempts fail against key authentication.
- **Least Privilege**: Give the delivery driver a key to the mailbox, not the front door. Every permission decision should grant the minimum access needed and nothing more.

### Critical Patterns
- `useradd --system --no-create-home --shell /usr/sbin/nologin agentuser` creates a service account that cannot be logged into
- `chown -R agentuser:agentuser /opt/agents/<name>` transfers ownership; `chmod 600 .env` locks secrets to owner-only
- `ssh-keygen -t ed25519` generates a key pair; `ssh-copy-id` deploys the public key to the server
- Disabling password authentication in `/etc/ssh/sshd_config` eliminates brute-force attacks entirely
- Update the systemd unit file `User=agentuser` to match the new dedicated user

### Common Mistakes
- Thinking "nobody would hack my little server" — automated bots attack every server on the internet; 47,000 failed login attempts is typical
- Confusing file ownership (`chown`) with file permissions (`chmod`) — ownership is WHO owns the file, permissions is WHAT they can do with it
- Disabling password SSH before verifying the key works — this locks you out of the server permanently

### Connections
- **Builds on**: Lesson 2 (reading `drwxr-xr-x` permission strings), Lesson 4 (systemd service running as `User=ali` that needs updating)
- **Leads to**: Lesson 6 (When Things Go Wrong) — the agent is secure and unkillable, but Ali still needs to diagnose failures when they occur
