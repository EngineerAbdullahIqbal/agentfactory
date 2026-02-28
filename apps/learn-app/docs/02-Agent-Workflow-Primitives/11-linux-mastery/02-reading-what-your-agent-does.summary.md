### Core Concept
You do not need to speak Linux — you need to read it. Every command follows the same grammar (verb, adverbs, object), there are only 15 commands worth recognizing, and file permissions use a three-level keycard system that tells you who can do what.

### Key Mental Models
- **Commands as Sentences**: Every command has a verb (`ls`), adverbs (`-la`), and an object (`/var/log`). Read it like English: "List, in long format, all files in /var/log."
- **Vocabulary Cards, Not Memorization**: 15 commands cover navigation, inspection, measurement, search, and process management. Recognize them when you see them — do not memorize them.
- **Permissions as Keycards**: `drwxr-xr-x` splits into file type + three groups of three: owner (full keycard), group (limited keycard), everyone (visitor badge). Each position is `r`ead, `w`rite, e`x`ecute, or `-` denied.

### Critical Patterns
- `ps aux` output columns: USER, PID, %CPU, %MEM, COMMAND — the COMMAND column tells you what each process IS
- `df -h` shows total disk capacity and usage; the `-h` flag means human-readable (GB instead of bytes)
- The first character in a permission string is the file type (`d` = directory, `-` = regular file), not a permission
- For directories, `x` (execute) means "allowed to enter," not "run as a program"

### Common Mistakes
- Thinking you must memorize all commands before working with a server — recognition is the goal, not memorization
- Confusing the `d` in `drwxr-xr-x` as a permission — it is a file type indicator
- Thinking execute permission on a directory means "run it as a program" — for directories it means "allowed to enter and access contents"
- Nodding through output you do not understand instead of pausing to read each column

### Connections
- **Builds on**: Lesson 1 (Where Your Agent Lives) — filesystem orientation, terminal/shell distinction
- **Leads to**: Lesson 3 (Setting Up Your Agent's Home) — using this reading skill to organize agent files and fix permission problems like the world-readable `.env`
