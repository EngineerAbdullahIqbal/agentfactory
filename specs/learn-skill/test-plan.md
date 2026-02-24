# Step 0 Skill — End-to-End Test Plan

Simulate a brand-new user from first touch through Day 2 return.

---

## Prerequisites

### Terminal 1: Start SSO (port 3001)

```bash
cd /Users/mjs/Documents/code/panaversity-official/tutorsgpt/ag2
pnpm nx serve sso
```

Wait for `ready started server on 0.0.0.0:3001`.

### Terminal 2: Start Content API (port 8001)

```bash
cd /Users/mjs/Documents/code/panaversity-official/tutorsgpt/ag2
cat > apps/content-api/.env <<'EOF'
SSO_URL=http://localhost:3001
DEV_MODE=false
GITHUB_REPO=panaversity/agentfactory
LOG_LEVEL=INFO
PORT=8001
EOF

pnpm nx serve content-api
```

Wait for `Uvicorn running on http://127.0.0.1:8001`.

### Terminal 3: Verify services are up

```bash
curl -s http://localhost:8001/health | python3 -m json.tool
# Should return: {"status": "ok", "name": "Content API", ...}

curl -s http://localhost:3001 > /dev/null && echo "SSO OK" || echo "SSO FAIL"
```

### Clean slate (simulate fresh install)

```bash
rm -rf ~/.agentfactory
rm -rf ~/.agentfactory/learner
```

---

## Test 1: Day 1 — First Contact (new Claude Code session)

Open a **new** Claude Code session (Terminal 4):

```bash
cd /Users/mjs/Documents/code/panaversity-official/tutorsgpt/ag2
claude
```

Set the Content API to local:

```
export CONTENT_API_URL=http://localhost:8001
export PANAVERSITY_SSO_URL=http://localhost:3001
```

Then say:

> "I want to learn about AI agents. Teach me from the book."

### What to observe (checklist):

#### Step 0: Auth Gate

- [ ] Claude runs `health` check first (not progress)
- [ ] Claude detects "Not authenticated" on first API call
- [ ] Claude runs `scripts/auth.py` automatically
- [ ] Auth code + PKCE: browser opens for SSO login
- [ ] Callback received on localhost:9876/callback
- [ ] After approving: "Authenticated successfully!"
- [ ] Credentials saved to `~/.agentfactory/credentials.json`

#### Step 1: First Session Welcome

- [ ] Claude reads (or tries to read) `~/.agentfactory/learner/MEMORY.md`
- [ ] Detects first-time user (MEMORY.md doesn't exist)
- [ ] Introduces itself as a learning coach
- [ ] Explains what the book teaches
- [ ] Asks your name
- [ ] Asks learning preference (examples/theory/hands-on)
- [ ] Creates `~/.agentfactory/learner/MEMORY.md` with your answers

#### Step 2: Progress Check

- [ ] Runs `progress` command
- [ ] If 503 (no progress-api): gracefully skips, doesn't crash
- [ ] Moves to browsing instead of stopping

#### Step 3: Browse & Pick

- [ ] Fetches tree, writes to `~/.agentfactory/learner/cache/tree.json`
- [ ] Displays navigable outline (not raw JSON wall)
- [ ] Suggests starting with Chapter 1 Lesson 1

#### Step 4: Teach First Lesson

- [ ] Fetches lesson, writes to `~/.agentfactory/learner/cache/current-lesson.json`
- [ ] Updates `~/.agentfactory/learner/session.md`
- [ ] Reads frontmatter FIRST (title, skills, objectives, cognitive_load)
- [ ] Teaches in own words (doesn't just dump markdown)
- [ ] Uses analogies/examples
- [ ] Adapts to your stated learning preference

#### Step 5: Quiz (Prove Learning)

- [ ] Generates 3-5 questions from learning_objectives
- [ ] Questions are at Apply level ("Given X, what would you..."), not recall
- [ ] Waits for your answers
- [ ] Provides feedback (Socratic for wrong answers)
- [ ] Records quiz score in MEMORY.md

#### Step 6: Complete

- [ ] Runs `complete` command
- [ ] If 503: handles gracefully
- [ ] If success: celebrates with XP earned
- [ ] Updates MEMORY.md session log

#### Step 7: Suggest Next

- [ ] Recommends next lesson from tree
- [ ] Connects it to current lesson's concepts

### After Test 1 — verify files exist:

```bash
cat ~/.agentfactory/credentials.json | python3 -m json.tool
cat ~/.agentfactory/learner/MEMORY.md
cat ~/.agentfactory/learner/session.md
ls ~/.agentfactory/learner/cache/
```

- [ ] credentials.json has access_token + refresh_token
- [ ] MEMORY.md has your name, preferences, quiz score, session log entry
- [ ] session.md has current phase + lesson info
- [ ] cache/ has tree.json and current-lesson.json

---

## Test 2: Day 2 — Returning User (new Claude Code session)

**Close** the previous Claude Code session. Open a **new** one:

```bash
claude
```

Set env vars again (or put them in your shell profile):

```
export CONTENT_API_URL=http://localhost:8001
export PANAVERSITY_SSO_URL=http://localhost:3001
```

Then say:

> "Let's continue learning."

### What to observe:

- [ ] Claude reads MEMORY.md (does NOT ask your name again)
- [ ] Greets you by name: "Welcome back, {name}!"
- [ ] References your last session (from session log)
- [ ] Shows progress: "You've completed X lessons"
- [ ] Suggests resuming where you left off
- [ ] Teaches the next lesson (not the same one again)
- [ ] After quiz: MEMORY.md updated with new entry

### Verify memory growth:

```bash
cat ~/.agentfactory/learner/MEMORY.md
```

- [ ] Sessions count incremented
- [ ] Quiz History has 2 entries now
- [ ] Session Log has 2 entries

---

## Test 3: Token Refresh (simulated expiry)

Corrupt the access token to force a 401:

```bash
# Backup current creds
cp ~/.agentfactory/credentials.json ~/.agentfactory/credentials.json.bak

# Mangle the access token (keep refresh_token intact)
python3 -c "
import json
creds = json.load(open('$HOME/.agentfactory/credentials.json'))
creds['access_token'] = 'expired-garbage-token'
json.dump(creds, open('$HOME/.agentfactory/credentials.json', 'w'), indent=2)
"
```

In Claude Code session, say:

> "Show me the book tree"

### What to observe:

- [ ] First request gets 401
- [ ] Auto-refresh fires (uses refresh_token)
- [ ] Second request succeeds (tree is displayed)
- [ ] credentials.json now has a NEW access_token
- [ ] No "Run auth.py" error shown to user

```bash
# Verify token was refreshed
cat ~/.agentfactory/credentials.json | python3 -c "import json,sys; d=json.load(sys.stdin); print('Token starts with:', d['access_token'][:20])"
# Should NOT be "expired-garbage-token"
```

---

## Test 4: Context Compaction Recovery

During a teaching session, after Claude has loaded a lesson and is mid-teach:

1. Send many long messages to fill context (or just continue the session for a while)
2. When context compaction happens, observe:

- [ ] Claude reads session.md to recover state
- [ ] Claude reads MEMORY.md to remember who you are
- [ ] Claude reads cached lesson from cache/current-lesson.json
- [ ] Claude continues teaching (doesn't restart from scratch)
- [ ] Claude tells you: "Let me pick up where we were..."

---

## Test 5: Error Resilience

### 5a: Stop Content API mid-session

While in a Claude Code session, kill the Content API (Ctrl+C in Terminal 2).

Then say: "Show me the next lesson"

- [ ] Claude gets "Connection failed" error
- [ ] Claude doesn't crash the session
- [ ] Claude tells you the API is unreachable, suggests trying later

### 5b: Progress 503 on fresh session

Start Content API WITHOUT progress_api_url configured (default).

In a new session, say "teach me":

- [ ] Progress check returns 503
- [ ] Claude skips gracefully (uses MEMORY.md data)
- [ ] Session continues normally

---

## Failure Modes to Watch For

| If This Happens                                       | It's a Bug In                    |
| ----------------------------------------------------- | -------------------------------- |
| Claude dumps raw JSON instead of teaching             | SKILL.md teaching instructions   |
| Claude asks name on Day 2                             | MEMORY.md read/write logic       |
| Session crashes on progress 503                       | SKILL.md error handling guidance |
| Full lesson JSON in conversation (not cached to file) | SKILL.md context management      |
| Claude restarts from scratch after compaction         | SKILL.md recovery protocol       |
| auth.py hangs > 2 min in Bash timeout                 | auth.py polling or Bash timeout  |
| Token refresh doesn't fire on 401                     | api.py \_try_refresh() logic     |

---

## Quick Reset Between Tests

```bash
# Full reset (back to new user)
rm -rf ~/.agentfactory

# Partial reset (keep auth, reset learner)
rm -rf ~/.agentfactory/learner
```
