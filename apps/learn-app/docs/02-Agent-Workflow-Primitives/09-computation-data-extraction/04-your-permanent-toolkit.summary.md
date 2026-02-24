### Core Concept

If you have to remember where a tool lives, it's not a tool yet. A script becomes a real tool when you can run it by name from any directory. Shell aliases stored in config files (`.bashrc` or `.zshrc`) make commands permanent across terminal sessions. The test: close your terminal, open a new one, and the command still works.

### Key Mental Models

- **Script vs tool gap**: A script in a random folder requires remembering the full path every time. A tool is available everywhere by name. Twenty minutes of setup now prevents hours of "I know I built this already" frustration later.
- **Config file persistence**: Your shell reads `.bashrc` or `.zshrc` every time a terminal opens. Anything in that file is permanent. `source` reloads it without reopening.
- **Two things that make it work**: The shebang (`#!/usr/bin/env python3`) tells the OS which interpreter to use when running the file directly — without it, `chmod +x` alone won't work. Shell config files run on terminal startup — that's the entire persistence mechanism, not magic.

### Critical Patterns

- Prompt pattern: "I want to use [script] from anywhere. Make it a permanent command I can run like: `cat file.csv | sum-expenses`"
- The setup sequence: `mkdir -p ~/tools` → `cp script.py ~/tools/` → `chmod +x` → add alias to shell config → `source` to reload
- The agent checks `echo $SHELL` first — `.zshrc` for zsh, `.bashrc` for bash — before editing the config

### Command Reference

| Command                | What It Does                       | Memory Trick                      |
| ---------------------- | ---------------------------------- | --------------------------------- |
| `mkdir -p ~/tools`     | Creates your personal tools folder | **p** = create **p**arents too    |
| `chmod +x script.py`   | Makes file executable              | **ch**ange **mod**e + e**x**ecute |
| `alias name='command'` | Creates a shortcut                 | Like a **nickname** for a command |
| `source ~/.zshrc`      | Reloads shell config               | Load the **source** of settings   |

### Diagnostic Chain: When It Breaks

The lesson includes a troubleshooting section for when tools stop working months later. Three things can break, checked in order:

1. **Does the alias exist?** `alias sum-expenses` — if "not found," the shell config didn't load it
2. **Does the script exist where the alias points?** `ls -la ~/tools/sum-expenses.py` — if missing, the script was moved or deleted
3. **Can the script actually run?** `python3 ~/tools/sum-expenses.py <<< "10"` — if error, Python version mismatch or missing shebang

| Symptom | Check | Fix |
|---------|-------|-----|
| "command not found" | `alias sum-expenses` | Re-add alias to shell config, then `source` |
| "No such file" | `ls ~/tools/sum-expenses.py` | Script was moved — update the alias path |
| "Permission denied" | `ls -la ~/tools/sum-expenses.py` | Re-run `chmod +x ~/tools/sum-expenses.py` |
| Script errors on run | `python3 --version` | Python version changed — check shebang line |

This is the difference between someone who set up a tool and someone who *owns* a tool. For portability, the lesson suggests keeping `~/tools` as a git repository so setup on any new machine is `git clone` + copy alias lines.

### Common Mistakes

- Forgetting to run `source ~/.zshrc` after adding an alias — the current terminal won't see the new alias until the config is reloaded
- Not testing in a fresh terminal — `source` proves the alias works now, but only a new terminal proves it's truly permanent
- Leaving scripts scattered across project folders instead of organizing them in one place like `~/tools` — people rebuild scripts from scratch months later because they can't find the original
- Assuming `chmod +x` alone is enough — the shebang line is also required so the OS knows what interpreter to use
- Not knowing the diagnostic chain when a tool breaks months later — check alias → check file → check Python, in that order

### Try With AI Prompts

- **Prompt 1 (Batch Install)**: Install multiple scripts at once — `sum.py`, `sum-expenses.py`, `count-lines.py` — into `~/tools` and create aliases for all of them. Teaches the agent-handles-repetition principle: describe the full scope once and let the agent repeat the setup pattern across scripts.
- **Prompt 2 (PATH vs Aliases)**: Add `~/tools` to PATH instead of using aliases. Teaches advanced tool installation and the tradeoff between aliases (simple, explicit) and PATH modification (system-wide, no alias needed) — when each approach is the better choice.
- **Prompt 3 (Diagnose Broken Installation)**: Walk through diagnosing "command not found" after a fresh terminal open. Teaches troubleshooting the installation chain: three root causes — alias not in the config file, config file not being loaded, or script path changed. Builds understanding of how the pieces connect, not just how to set them up.

### Connections

- **Builds on**: sum-expenses.py from Lesson 3
- **Leads to**: Tax categorization with regex (Lesson 5) — your tools can sum totals, but they can't distinguish "DR PEPPER SNAPPLE" from a doctor visit; categorization requires pattern matching across merchant names
