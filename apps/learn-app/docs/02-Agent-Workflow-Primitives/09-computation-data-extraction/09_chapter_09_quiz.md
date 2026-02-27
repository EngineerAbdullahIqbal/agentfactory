---
sidebar_position: 9
title: "Chapter 9: Computation & Data Extraction Quiz"
---

# Chapter 9 Quiz

Test your understanding of computation workflows, verification patterns, CSV parsing, composable tools, and data wrangling. Each session presents a random batch of questions with immediate feedback.

<Quiz
  title="Computation & Data Extraction Assessment"
  questions={[    {
      question: "You run echo $((14.50 + 23.75)) and get a syntax error. Your colleague says 'just remove the decimals and divide later.' What is the biggest risk with that workaround?",
      options: [
        "The command runs slower without decimals",
        "Bash requires special flags for division",
        "Silent truncation produces wrong results",
        "Python cannot read integer-only output"
      ],
      correctOption: 2,
      explanation: "Silent truncation is the biggest risk because Bash integer arithmetic drops remainders without warning — $((10/3)) returns 3, not 3.333. This is worse than a syntax error because you get a result that looks plausible but is wrong. Running slower is not the issue — it is accuracy. Bash does not need special flags — it simply cannot do decimal math. Python reads any numeric format from stdin — that is not a concern.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "A teammate asks an AI to sum 500 expense amounts directly in chat. The AI returns a total that looks reasonable. Why is this approach unreliable?",
      options: [
        "LLMs predict text patterns instead of computing",
        "AI assistants refuse financial calculations",
        "Chat interfaces limit numbers to 100 items",
        "LLMs round all decimals to whole numbers"
      ],
      correctOption: 0,
      explanation: "LLMs predict the next likely token rather than executing arithmetic operations. For small sets (2-3 numbers), the prediction often matches reality, but at scale (500 numbers) errors accumulate silently. AI assistants do not refuse financial calculations — they attempt them and may get them wrong. There is no 100-item limit on chat interfaces. LLMs do not systematically round decimals — they produce plausible-looking but potentially incorrect results.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "You need to sum decimal numbers from a file. Which prompt produces the most reusable tool?",
      options: [
        "What is 127.89 plus 45.50 plus 12.99",
        "Calculate the total of my expense report",
        "Write Python to sum 127.89, 45.50, 12.99",
        "Build a script that reads numbers from stdin and prints the total"
      ],
      correctOption: 3,
      explanation: "Specifying stdin input and stdout output creates a composable Unix tool that works on any data, forever. Asking for a direct answer (A) gives a one-time result that disappears after the chat. Hardcoding specific numbers (C) creates a script for only those values. A vague request about expense reports (D) may produce an answer or a script tied to one file. The stdin/stdout specification is what makes the tool pipeable and reusable.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "Your sum.py script reads from sys.stdin and prints to stdout. A colleague asks why you did not hardcode the filename. What is the strongest reason for the stdin approach?",
      options: [
        "Hardcoded filenames cause Python import errors",
        "stdin tools compose with any command through pipes",
        "Hardcoded paths only work on one operating system",
        "stdin scripts run faster than file-reading scripts"
      ],
      correctOption: 1,
      explanation: "Reading from stdin makes the script composable — it connects to cat, grep, awk, or any other command through pipes without modification. Hardcoded filenames do not cause import errors (A) — they cause FileNotFoundError if the path is wrong, but that is a different issue. stdin is not inherently faster (B). Hardcoded paths can work across operating systems with the right syntax (C). The real value is composability through the pipe operator.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "You prompt Claude Code with 'sum my expenses' and get a direct answer of $186.38. How should you change the prompt to get a reusable tool instead?",
      options: [
        "Request a graphical interface for the calculator",
        "Ask Claude Code to use JavaScript instead of Python",
        "Add 'reads from stdin' and 'prints the total' to the prompt",
        "Tell Claude Code to save the answer in a database"
      ],
      correctOption: 2,
      explanation: "Specifying stdin and stdout signals you want a composable Unix tool, not a one-time answer. These two phrases ('reads from stdin' and 'prints the total') are what transform a throwaway response into a permanent script. Switching languages (B) does not change whether you get an answer or a tool. A graphical interface (C) is not composable with pipes. Database storage (D) adds unnecessary complexity and does not create a pipeable tool.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "You run a Python script on bank data. It outputs a total of $186.38 and returns exit code 0. What can you conclude from this information alone?",
      options: [
        "The script ran without crashing or raising exceptions",
        "The script has no bugs in its logic",
        "The total is mathematically correct and verified",
        "All input rows were processed successfully"
      ],
      correctOption: 0,
      explanation: "Exit code 0 only means the process terminated without an unhandled exception — 'did not crash.' The buggy_sum.py example proves this: it returns exit code 0 while silently skipping numbers starting with 6-9, producing wrong results. You cannot conclude the total is correct, the logic is bug-free, or all rows were processed from exit code 0 alone. Only verification with known-answer test data can establish correctness.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "buggy_sum.py returns 60 when given inputs 10, 20, 30 — which is correct. It returns 40 when given inputs 10, 60, 30 — which should be 100. What does this reveal about test data selection?",
      options: [
        "Tests should always use numbers under fifty",
        "Test inputs must include diverse digit ranges",
        "Tests should only use prime number inputs",
        "A single passing test proves script correctness"
      ],
      correctOption: 1,
      explanation: "The bug only surfaces when inputs start with digits 6-9, so test data limited to low-digit numbers misses it entirely. Using diverse digit ranges (0-9) exposes the hidden filter. Using only numbers under fifty would miss the exact bug demonstrated. Prime numbers have no special relevance to this bug. A single passing test is explicitly disproven — the 10, 20, 30 test passed while the bug remained hidden.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "You built a filter script and it passes your first test case. Your manager asks how you know it works. What is the correct next step?",
      options: [
        "Show the exit code was zero after running",
        "Explain that the AI wrote the code correctly",
        "Point to the clean output with no error messages",
        "Run additional tests with edge cases and known answers"
      ],
      correctOption: 3,
      explanation: "The zero-trust verification pattern requires multiple test cases with known answers — integers, decimals, negatives, and edge cases. A single passing test is insufficient because bugs can hide in untested input ranges. Showing the exit code was zero only means no crash. Citing AI authorship is not proof of correctness. Clean output can still contain wrong values. Only diverse test cases with hand-calculated expected values establish confidence.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "Your verification workflow has four steps. Which ordering correctly represents the zero-trust verification pattern?",
      options: [
        "Ask the AI to verify its own code, then trust the confirmation",
        "Run script on real data, check exit code, trust result, move on",
        "Calculate expected result, create test data, run script, compare output",
        "Write the script, deploy it, fix bugs when users complain"
      ],
      correctOption: 2,
      explanation: "The zero-trust pattern requires knowing the expected answer before running the tool: calculate expected, create test data, run, compare. This order ensures you have an independent baseline. Running on real data first skips verification entirely. Asking the AI to self-verify lacks independent validation. Waiting for user complaints is the opposite of proactive verification. The human contribution is choosing verifiable test data with known answers.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "You ask Claude Code to verify your sum.py. It creates test cases with integers, decimals, and negatives. Who should decide what makes good test data?",
      options: [
        "The human sets evidence criteria while the agent generates cases",
        "The project manager who approved the requirements",
        "The AI alone because it knows common failure modes",
        "Whoever has the most programming experience on the team"
      ],
      correctOption: 0,
      explanation: "The division of labor is the key insight: the human chooses the verification approach (known answers you can check mentally) and the agent generates multiple test cases covering edge cases. The AI alone knows common failure modes but does not know which answers you can verify in your head. The project manager defines requirements, not test strategy. Programming experience is less relevant than domain knowledge about the data.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "Your script outputs error messages mixed with data results, breaking the next command in your pipeline. How should error messages be handled in Unix-style scripts?",
      options: [
        "Suppress all error messages to keep output clean",
        "Write errors to stderr so they appear separately from stdout data",
        "Add error messages as extra lines in the data output",
        "Store errors in a separate log file on disk"
      ],
      correctOption: 1,
      explanation: "Writing errors to stderr (sys.stderr) keeps them visible in the terminal without polluting the data flowing through stdout to the next pipe command. Suppressing errors entirely hides problems. Adding errors as extra lines in data output is exactly the problem described. Separate log files add complexity and may be missed. stderr is the Unix convention that separates diagnostic messages from data output.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "You run awk -F',' '{print $3}' on a CSV containing the row '2024-01-07,\"AMAZON, INC.\",-89.50'. Instead of -89.50, you get 'INC.\"' as output. What caused this error?",
      options: [
        "The CSV file has an encoding error in that row",
        "awk cannot process files larger than one megabyte",
        "Python is required for any CSV with three columns",
        "awk split on the comma inside the quoted field"
      ],
      correctOption: 3,
      explanation: "awk treats every comma as a field separator, even commas inside quoted fields. 'AMAZON, INC.' becomes two fields (AMAZON and INC.), shifting column positions. The third field becomes INC.\" instead of -89.50. This is not an encoding error. awk has no file size limit. Python is not required for all three-column CSVs — only for CSVs with embedded commas in quoted fields. The issue is that awk does not understand CSV quoting rules.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "Your awk command works correctly on 29 out of 30 CSV rows but silently produces a wrong value for one row. Why is this worse than a command that crashes on all rows?",
      options: [
        "Partial failures are invisible without row-by-row inspection",
        "Crashes are easier to fix than logic errors",
        "awk does not support CSV files at all",
        "The operating system hides partial error messages"
      ],
      correctOption: 0,
      explanation: "A command that fails on one row and succeeds on 29 produces a plausible-looking total that appears correct at first glance. Only row-by-row inspection reveals the error. A crash on all rows (comparison) is immediately obvious and impossible to miss. Crashes being easier to fix (A) is true but not the core danger. awk does support CSV files (C) — just not quoted fields with embedded delimiters. The OS does not hide messages (D).",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "You need to parse a CSV exported from your bank. Which decision rule determines whether to use awk or Python's csv module?",
      options: [
        "Use awk for small files and csv module for large files",
        "Use csv module only when column names contain spaces",
        "Use awk if you control the data format, csv module for external data",
        "Use awk for numeric columns and csv module for text columns"
      ],
      correctOption: 2,
      explanation: "The decision hinges on data source, not file size. If you control the format (no embedded delimiters), awk is fast and simple. External data (bank exports, downloaded datasets) may contain commas inside quoted fields, requiring a proper CSV parser. File size (A) is irrelevant — a small external CSV can have quoting traps. Column name spaces (C) do not determine the choice. Column data type (D) does not matter — the issue is delimiter handling, not content type.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "You tell Claude Code 'sum the third column of this CSV' and it uses awk. Your data has quoted fields with commas. How should you modify your prompt?",
      options: [
        "Ask for a faster algorithm to improve performance",
        "Mention that merchant names contain embedded commas",
        "Request the output in JSON format instead of text",
        "Specify that the CSV uses UTF-8 character encoding"
      ],
      correctOption: 1,
      explanation: "Mentioning the edge case ('some merchant names have commas') steers the agent toward Python's csv module instead of naive awk. This is the director's role — your domain knowledge about the data guides the agent's tool selection. Asking for faster performance is not the issue. Requesting JSON output changes format, not parsing correctness. Specifying UTF-8 encoding is unrelated to the comma-in-quotes problem.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "You installed sum-expenses as an alias in ~/.zshrc. After closing and reopening your terminal, the command works. A week later from a different directory, you get 'command not found.' What should you check first?",
      options: [
        "Whether the terminal app needs to be reinstalled",
        "Whether the CSV data file was accidentally deleted",
        "Whether Python was updated to a new major version",
        "Whether the alias still exists in your shell config file"
      ],
      correctOption: 3,
      explanation: "The most common cause of 'command not found' for an alias is that it was removed or overwritten in the shell config file. Check the alias first, then verify the script file exists at the alias target path. A deleted data file (B) would cause a different error when running the command, not 'command not found.' A Python update (C) would cause a runtime error, not a missing command. Terminal reinstallation (D) is extremely unlikely and would not affect shell config.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "Your sum-expenses.py handles CSV parsing, column extraction, negative filtering, and summing. A colleague suggests splitting it into separate scripts. What is the primary benefit of decomposition?",
      options: [
        "Python runs decomposed scripts in parallel automatically",
        "Separate scripts use less total disk space than one file",
        "Each tool answers different questions through pipeline recombination",
        "Smaller scripts require fewer Python library imports"
      ],
      correctOption: 2,
      explanation: "Decomposition enables recombination — the same three tools answer questions about totals, averages, counts, and large transactions without code changes. You just rearrange the pipeline. Disk space (B) is negligible. Python does not auto-parallelize piped scripts (C) — the shell handles pipe buffering. Import count (D) may or may not change and is not the primary benefit. The power is in answering questions you have not thought of yet.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "extract-column.py pulls a named column from any CSV. It knows nothing about bank statements. Why is this ignorance considered a feature?",
      options: [
        "Context-free tools work in any domain without modification",
        "Generic tools crash less often than specialized ones",
        "Bank-specific scripts need security clearance to run",
        "Python enforces that scripts cannot reference domain terms"
      ],
      correctOption: 0,
      explanation: "A tool that knows nothing about its context works in every context — bank data, payroll, student grades, server logs. This is Principle 2 (Code as Universal Interface) in action. Security clearance (A) is not a real requirement. Generic tools do not inherently crash less (B) — they are tested the same way. Python has no restriction on domain terms (D). The less a tool knows about its specific use case, the more use cases it serves.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "You discover a bug in filter.py. How does having a decomposed pipeline affect the blast radius of this bug?",
      options: [
        "The bug corrupts all tools in the pipeline",
        "Only pipelines using filter.py are affected",
        "Filter bugs automatically propagate to stats.py output",
        "Decomposed pipelines cannot contain bugs by design"
      ],
      correctOption: 1,
      explanation: "In a decomposed pipeline, a bug in filter.py only affects pipe segments that include it. Pipelines using just extract-column and stats remain correct. The bug does not corrupt other tools — each tool is an independent process. While wrong filter output would produce wrong stats numbers, that is because of the incorrect input, not a bug in stats.py itself. No architecture prevents bugs by design.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "You need to find the five largest expenses in your bank data. Which pipeline answers this using your existing composable tools?",
      options: [
        "grep -c 'Amount' bank.csv | head -5 | sort -n",
        "cat bank.csv | sum-expenses --top 5 --sort descending",
        "python3 analyze.py --input bank.csv --top 5 --column Amount",
        "cat bank.csv | extract-column Amount | filter '< 0' | sort | head -5"
      ],
      correctOption: 3,
      explanation: "Chaining extract-column, filter, sort, and head uses existing composable tools without modification. Each tool does one job and connects through pipes. Adding flags to sum-expenses (B) returns to the monolithic approach the lesson warns against. A separate analyze.py (C) is a new monolithic tool. grep -c counts matches (D), which does not extract or sort amounts. The composable pipeline answers new questions with existing building blocks.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "You add median and standard deviation to stats.py. Which other tools in your pipeline need to be modified?",
      options: [
        "No other tools need any changes at all",
        "filter.py needs updated to pass statistical context",
        "extract-column.py must output additional metadata",
        "sum.py must be updated to match the new stats format"
      ],
      correctOption: 0,
      explanation: "Because each tool only reads stdin and writes stdout, adding features to stats.py does not affect any other tool. extract-column still outputs one value per line. filter still keeps matching numbers. The interface contract (numbers in, results out) is unchanged. extract-column does not need metadata (A). filter does not need statistical context (B). sum.py is independent (D). This is the benefit of composable tools — improvements propagate without rewiring.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "Your tax categorizer uses simple keyword matching: if 'DR' in description. It flags 'DR PEPPER SNAPPLE' as a medical expense. What type of error is this?",
      options: [
        "A syntax error in the Python regex engine",
        "A data corruption issue in the CSV file",
        "A false positive from overly broad pattern matching",
        "A Unicode encoding mismatch between input and script"
      ],
      correctOption: 2,
      explanation: "DR PEPPER matches the keyword 'DR' because simple substring matching does not distinguish between a doctor prefix and a brand name — this is a false positive. It is not a syntax error because the code runs correctly. The CSV data is not corrupted — 'DR PEPPER SNAPPLE' is a valid merchant name. There is no encoding mismatch. The error is in the matching logic, not the data or the language runtime.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "CVSMITH CONSULTING is incorrectly categorized as a CVS pharmacy expense. Which regex technique prevents this specific false match?",
      options: [
        "Case-insensitive matching with the re.IGNORECASE flag",
        "Anchoring the pattern to the start of the string",
        "Replacing all regex patterns with exact string comparison",
        "Using word boundaries so CVS only matches standalone words"
      ],
      correctOption: 3,
      explanation: "Word boundaries (\\bCVS\\b) ensure CVS matches only as a complete word, blocking matches within CVSMITH. Case-insensitive matching (A) does not solve the substring problem — it would still match CVS inside CVSMITH. String anchoring (B) would miss 'MY CVS RECEIPT' where CVS is not at the start. Exact string comparison (D) would be too restrictive, missing 'CVS PHARMACY #1234' and other valid variations.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "Your categorizer checks FALSE_POSITIVES before checking CATEGORIES. A colleague suggests reversing the order for efficiency. Why is the current order critical?",
      options: [
        "Python dictionaries require alphabetical key ordering",
        "Guards must exclude false matches before categorization runs",
        "Reversing the order causes Python to raise an exception",
        "Categories are computationally more expensive to check"
      ],
      correctOption: 1,
      explanation: "If categories are checked first, 'DR PEPPER' matches 'DR' in the medical category before the false positive guard can exclude it. Guards must run first to prevent incorrect matches from ever being assigned. Python dictionaries have no ordering requirement (A). Computational cost (B) is negligible for small pattern sets. No exception occurs (C) — the code runs either way, but produces wrong results if guards come second. Execution order determines correctness.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "The regex pattern \\bCVS\\b matches 'CVS PHARMACY' and 'MY CVS RECEIPT' but not 'CVSMITH'. What does the \\b boundary marker indicate?",
      options: [
        "The letters must form a complete word with edges on both sides",
        "The pattern must appear at the beginning of the line",
        "The match is restricted to uppercase characters only",
        "The pattern requires whitespace on both sides to match"
      ],
      correctOption: 0,
      explanation: "\\b marks a word boundary — the transition between a word character and a non-word character. In CVSMITH, there is no boundary between S and I (both are word characters), so \\bCVS\\b fails. In 'CVS PHARMACY,' boundaries exist before C and after S. It is not a line anchor (A) — that would be ^ and $. It is not case-restricted (B) — \\b works with any case. It does not require whitespace specifically (D) — punctuation and string edges also count as boundaries.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "Your tax categorizer works perfectly on bank data. You now need to categorize server log entries by HTTP status codes. What is the most important concept that transfers directly?",
      options: [
        "The specific regex patterns for merchant names transfer unchanged",
        "Python's csv module works identically for both data types",
        "The build-verify-guard workflow applies to any categorization domain",
        "The FALSE_POSITIVES list handles server errors automatically"
      ],
      correctOption: 2,
      explanation: "The workflow pattern — build a categorizer, verify with known data, guard against false positives — transfers to any domain. For server logs, /health returning 404 during deployments is the 'Dr. Pepper' equivalent. Merchant-specific regex patterns do not apply to server logs. While the csv module works for both domains, that is a tool detail, not the key transferable concept. The specific FALSE_POSITIVES list needs new entries for the new domain.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "A /health endpoint returns 404 during deployments, which is expected behavior. Your log analyzer counts it as a client error. This is analogous to which problem from the bank data domain?",
      options: [
        "Exit code 0 hiding a logic bug in sum.py",
        "awk splitting CSV fields on embedded commas",
        "Bash truncating decimal arithmetic to integers",
        "Dr. Pepper being categorized as a medical expense"
      ],
      correctOption: 3,
      explanation: "Both are false positives — items that match a category pattern but do not belong. DR PEPPER matches 'DR' (medical keyword) just as /health 404 matches '4xx' (client error pattern). Both require guard lists (FALSE_POSITIVES / KNOWN_BENIGN). The awk CSV splitting (B) is a parsing failure, not categorization. Bash truncation (C) is an arithmetic limitation. Exit code masking (D) is a verification gap. The false positive concept is what transfers between domains.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "You need to combine 12 monthly bank CSV files into one for annual processing. Each file has a header row. What problem does cat *.csv create?",
      options: [
        "cat cannot process more than ten files at once",
        "It includes header rows from all twelve files in the data",
        "The files are combined in random unpredictable order",
        "cat strips all commas from the combined output"
      ],
      correctOption: 1,
      explanation: "Each CSV file starts with a header row (Date,Description,Amount). Using cat *.csv concatenates all files including all 12 headers, so 11 header rows appear in the data where the script expects numbers. cat has no file count limit (B). Shell globbing expands *.csv in alphabetical order, which is predictable (C). cat does not modify content (D). The fix uses head -1 for one header and tail -n +2 for data rows from all files.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "The command 'head -1 file1.csv' followed by 'tail -n +2 -q *.csv' combines multiple CSVs. What does the -q flag do in the tail command?",
      options: [
        "Sorts the output quietly in alphabetical order",
        "Compresses the output to reduce file size on disk",
        "Suppresses filename headers so only data rows appear",
        "Validates each row against the CSV header format"
      ],
      correctOption: 2,
      explanation: "The -q (quiet) flag tells tail not to print filename prefixes (==> filename <==) when processing multiple files. Without it, filename markers would appear in the combined data and break CSV parsing. It does not sort (A) — that requires the sort command. It does not compress (C) — that requires gzip or similar. It does not validate format (D) — tail simply outputs lines. Quiet mode ensures clean data concatenation.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "Your tax-prep report includes a NEEDS REVIEW section listing 23 uncategorized transactions. A colleague says this means the categorizer failed. What is the correct interpretation?",
      options: [
        "Flagging ambiguous items for human review is intentional design",
        "All 23 transactions should be added to existing categories",
        "The categorizer has a critical bug requiring immediate patching",
        "The regex patterns need to be replaced with machine learning"
      ],
      correctOption: 0,
      explanation: "NEEDS REVIEW is a feature, not a failure. Good automation flags ambiguity for human judgment rather than making silent guesses. Regex handles the high-confidence 80%; the hard 20% requires human review. It is not a bug (A) — the categorizer correctly identified what it could not confidently classify. Adding all to existing categories (B) would risk false positives. Machine learning (D) is unnecessary complexity for this use case.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "The capstone insists on verification with test data even though you already tested the categorizer in Lesson 5. Why is re-verification necessary?",
      options: [
        "Python scripts lose their verification status after one week",
        "The test data from Lesson 5 was deleted automatically",
        "The capstone requires a different testing framework entirely",
        "Real annual data may contain new patterns not covered by tests"
      ],
      correctOption: 3,
      explanation: "Real annual data spanning 12 months likely contains merchant names, edge cases, and patterns not present in your earlier test set. A categorizer that passed testing on 20 rows may fail on 400 rows of diverse real-world data. Scripts do not lose verification status (A). Test data is not auto-deleted (B). No different framework is needed (D). The principle is that data changes, so verification must be repeated whenever the data scope changes.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "During the capstone, you use cat, head, tail, and pipes to orchestrate data flow before Python scripts process the data. Which Seven Principle does this demonstrate?",
      options: [
        "Constraints and Safety through access control",
        "Bash is the Key for orchestrating data flow",
        "Observability through detailed logging output",
        "Persisting State through database transactions"
      ],
      correctOption: 1,
      explanation: "Principle 1 (Bash is the Key) is demonstrated by using shell commands to orchestrate how data flows between Python tools. cat reads files, head/tail select rows, and pipes connect everything. Constraints and Safety (A) refers to false positive guards, not shell orchestration. Observability (B) is about printing every transaction, not about Bash usage. Persisting State (D) refers to saving scripts and reports in files, not database transactions.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "You want to process only Q1 transactions from your annual bank data. Without modifying any existing tool, how would you add date filtering to the pipeline?",
      options: [
        "Rewrite tax-prep to accept start and end date arguments",
        "Manually delete rows outside Q1 from the combined CSV",
        "Build a separate date-filter tool that reads CSV from stdin",
        "Ask the AI to remember the date range for future sessions"
      ],
      correctOption: 2,
      explanation: "Building a new single-purpose date-filter tool follows the Unix philosophy — it reads CSV from stdin, keeps rows in a date range, and writes to stdout. No existing tool changes. Rewriting tax-prep (A) violates the one-tool-one-job principle by adding a responsibility. Manual deletion (C) is error-prone and not repeatable. AI session memory (D) does not filter data. A new composable tool plugs into the existing pipeline seamlessly.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "The Vancouver Stock Exchange lost nearly half its index value over 22 months due to truncation errors. How does this historical example connect to Bash arithmetic?",
      options: [
        "Both involve truncation that produces wrong results without any error messages",
        "Both were caused by Python floating-point precision limitations",
        "Both required upgrading to a newer version of the programming language",
        "Both were detected immediately by automated monitoring systems"
      ],
      correctOption: 0,
      explanation: "The Vancouver Stock Exchange truncated to three decimal places silently, and Bash truncates to zero decimal places silently ($((10/3)) returns 3). Both produce plausible-looking wrong results without errors or warnings. Python was not involved in either case. Neither was fixed by a language upgrade — the VSE recalculated, and Bash's design is intentional. Neither was detected immediately — the VSE error ran for 22 months undetected.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "You have three expense receipts from lunch totaling about $35. Should you build a Python script to sum them?",
      options: [
        "Yes, because all calculations require verified Python scripts",
        "No, use direct prompting for low-stakes one-time calculations",
        "No, because Python cannot handle amounts under fifty dollars",
        "Yes, to practice building tools on every possible occasion"
      ],
      correctOption: 1,
      explanation: "For three low-stakes receipts, asking the AI directly is appropriate — even if it is off by a cent, nobody cares. Scripts pay for themselves when data is too large to sanity-check manually, or when being wrong has consequences. Not all calculations need scripts (B). Python handles any amount (C). Building unnecessary tools wastes time (D). The rule: if the calculation is repeated, financial at scale, or high-stakes, build the script. Otherwise, prompt directly.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "Your script uses sys.exit(1) when no input arrives and writes the error message to sys.stderr. Why does the error go to stderr instead of stdout?",
      options: [
        "stdout cannot display text strings in Python 3",
        "stdout is reserved for system-level kernel messages only",
        "Python requires all print statements to use stderr by default",
        "stderr messages bypass the pipe and appear in the terminal"
      ],
      correctOption: 3,
      explanation: "stderr is a separate output stream from stdout. In a pipeline, stdout flows to the next command while stderr appears directly in the terminal. This prevents error messages from polluting the data stream. stdout displays text fine (A). Python defaults to stdout for print (C). stdout is not reserved for kernel messages (D). Using stderr ensures that downstream tools receive clean data while the user sees diagnostic messages.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "You test filter.py with inputs 10, -5, 20 and the condition '< 0'. It correctly returns only -5. A colleague says one test proves the script works. What is wrong with this conclusion?",
      options: [
        "Single tests miss edge cases like zero, decimals, and empty input",
        "Filter scripts require at least one hundred test inputs",
        "The colleague should write the tests instead of reviewing yours",
        "Filter conditions only work with greater-than comparisons"
      ],
      correctOption: 0,
      explanation: "One passing test only proves the script works for that specific input. Edge cases like zero (is 0 less than 0?), decimal values (does -0.01 pass?), and empty input (does the script crash?) remain untested. One hundred inputs (A) is an arbitrary number — diverse edge cases matter more than volume. Who writes tests (C) is irrelevant to test coverage. Filter conditions work with any comparison (D). Multiple targeted tests with diverse inputs provide meaningful confidence.",
      source: "Lesson 2: The Testing Loop"
    },
    {
      question: "Python's csv module handles quoting, escaped quotes, and different line endings. Your bank CSV works fine with awk today. Why might you still choose the csv module?",
      options: [
        "awk is deprecated and will be removed from future operating systems",
        "csv module runs significantly faster than awk on all inputs",
        "Future data exports might introduce quoted fields with commas",
        "Python csv module is the only way to read CSV header rows"
      ],
      correctOption: 2,
      explanation: "Even if today's data is clean, external data sources can change their export format without notice. A bank might start quoting merchant names containing commas, breaking awk silently. awk is not deprecated — it remains a standard Unix tool. The csv module is not inherently faster — awk is often faster for simple cases. awk can read CSV headers just fine. The defensive choice accounts for future data changes from sources you do not control.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "You built tax-categorize.py in your project folder. From a different directory, you get 'command not found.' What two steps make a Python script into a permanent shell command?",
      options: [
        "Copy the script to every directory where you might need it",
        "Rename the file extension from .py to .sh and restart your terminal",
        "Upload the script to PyPI and install it with pip globally",
        "Move it to ~/tools and create a shell alias in your config file"
      ],
      correctOption: 3,
      explanation: "Moving to ~/tools organizes your scripts, and creating an alias (e.g., alias tax-prep='python3 ~/tools/tax-categorize.py') in ~/.zshrc or ~/.bashrc makes it available from any directory. Renaming to .sh (B) does not make Python code run as a shell script. PyPI publishing (C) is extreme overkill for personal tools. Copying everywhere (D) creates maintenance nightmares with multiple versions. The alias approach is the standard pattern for personal Unix tools.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "sum-expenses.py does four things: reads CSV, extracts a column, filters negatives, and sums. You split it into three tools. When would you still use the original monolithic script?",
      options: [
        "Never — monolithic scripts should always be deleted after decomposition",
        "As a convenient shortcut for the common expense-total use case",
        "Only when the decomposed tools produce different numerical results",
        "Only when running on operating systems that lack pipe support"
      ],
      correctOption: 1,
      explanation: "The original script is a convenient shortcut for the most common question — total expenses. You keep both: the monolithic script for quick answers and the decomposed tools for questions sum-expenses cannot answer. Deleting working code (A) is wasteful. If both produce different results (B), one has a bug. All modern operating systems support pipes (D). The decomposition does not replace the original — it reveals the composable architecture hiding inside it.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "You built extract-column, filter, and stats as separate tools. Which Principle explains why a bug in filter.py has a small blast radius?",
      options: [
        "Persisting State in Files keeps backups of tool output",
        "Observability means all bugs are logged to a central server",
        "Small Reversible Decomposition makes each tool independently testable",
        "Bash is the Key prevents Python scripts from causing damage"
      ],
      correctOption: 2,
      explanation: "Principle 4 (Small, Reversible Decomposition) means each tool is small enough to test independently with simple input. A bug in filter.py is found by running echo -e '10\\n-5\\n20' | filter '< 0' — no other tools involved. Persisting State in Files is about saving scripts and results, not blast radius. Observability is about seeing output, not centralized logging. Bash is the Key refers to shell orchestration, not preventing Python bugs.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "Your categorizer correctly identifies DR MARTINEZ MEDICAL as a medical expense after adding the DR PEPPER false positive guard. Why does DR MARTINEZ still match?",
      options: [
        "DR MARTINEZ matches via the MEDICAL keyword, not the DR keyword",
        "The false positive guard has a bug that skips some DR patterns",
        "Python regex processes patterns in reverse alphabetical order",
        "Word boundaries do not apply to names containing spaces"
      ],
      correctOption: 0,
      explanation: "DR MARTINEZ MEDICAL contains the standalone word MEDICAL, which matches the medical category keyword \\bMEDICAL\\b. The DR PEPPER guard only blocks descriptions matching the specific DR PEPPER pattern, not all descriptions containing DR. The guard is working correctly (A). Python does not process in reverse alphabetical order (C). Word boundaries work fine with spaces (D) — spaces are non-word characters that create valid boundaries.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "You are building a categorizer for a new domain. The first version 'looks right' on casual inspection. Based on the chapter's iterative workflow, what should you do before trusting it?",
      options: [
        "Deploy it to production and monitor for user complaints",
        "Ask the AI to confirm that the categorization is correct",
        "Increase the number of regex patterns until coverage reaches 100%",
        "Inspect output line by line to find false positives manually"
      ],
      correctOption: 3,
      explanation: "The iterative refinement loop requires manual inspection of categorized output to find false positives that look plausible but are wrong — like Dr. Pepper appearing as medical. Deploying without review (A) pushes silent errors to production. AI self-confirmation (B) lacks independent verification. Adding more patterns without reviewing output (D) may increase false positives rather than reducing them. Human inspection is the verification step that catches what automation misses.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    },
    {
      question: "The capstone report shows Medical: $219.12, Charitable: $100.00, Business: $89.50, and POTENTIAL DEDUCTIONS: $408.62. Your hand-calculated total before running the tool was also $408.62. What verification principle does this demonstrate?",
      options: [
        "Exit code validation confirms mathematical correctness",
        "Known-answer verification compares output against independent baseline",
        "Automated testing eliminates the need for manual calculation",
        "Running the tool twice guarantees consistent results"
      ],
      correctOption: 1,
      explanation: "You calculated expected totals by hand before running the tool, then compared the tool output against your independent baseline. This is the zero-trust verification pattern from Lesson 2 applied to the full workflow. Exit codes (A) only indicate no crash. Automated testing supplements but does not eliminate manual verification (B). Running twice (D) proves consistency, not correctness — a consistently wrong tool would pass that test.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "The capstone reflection states 'the agent wrote all the code, you made all the decisions that mattered.' Which decision could only a human make?",
      options: [
        "Deciding that DR PEPPER should not be a medical expense",
        "Writing the regex pattern for word boundary matching",
        "Choosing Python over JavaScript for the implementation",
        "Selecting the csv module instead of manual string parsing"
      ],
      correctOption: 0,
      explanation: "Whether a soda brand constitutes a medical expense is domain judgment that requires real-world knowledge the agent does not have. The agent can implement the guard once told, but it cannot independently decide that DR PEPPER is not medical. Language choice (A) is a tool decision the agent can make. Regex syntax (B) is implementation. csv module selection (C) is a technical choice. The human's irreplaceable contribution is domain knowledge about what is correct.",
      source: "Lesson 6: Capstone: Tax Season Prep"
    },
    {
      question: "The chapter teaches that every tool should read from stdin and write to stdout. Which term best describes this design characteristic?",
      options: [
        "Object-oriented polymorphism for data types",
        "Functional programming with immutable state variables",
        "Composability through standardized input and output interfaces",
        "Microservice architecture with API gateway routing"
      ],
      correctOption: 2,
      explanation: "Tools that read stdin and write stdout are composable — they connect to any other tool through pipes without modification. This standardized interface is the Unix philosophy's core design principle. Object-oriented polymorphism (A) relates to class inheritance, not pipe interfaces. Functional programming (C) is about immutability, not stdin/stdout. Microservice architecture (D) involves network APIs, not shell pipes. Composability through standard interfaces is the precise concept.",
      source: "Lesson 4: One Tool, One Job"
    },
    {
      question: "You run echo $((10 / 3)) in Bash and get the result 3. There is no error message. Why is this more dangerous than a syntax error?",
      options: [
        "Syntax errors are harder to debug than wrong answers",
        "Silent truncation produces plausible output that looks correct",
        "Bash displays wrong answers in a misleading green color",
        "Division operations are never needed in real-world scripts"
      ],
      correctOption: 1,
      explanation: "Bash silently returns 3 instead of 3.333, which looks like a valid answer. You might not realize it is wrong because there is no error message or warning. A syntax error forces you to stop and investigate. Syntax errors are actually easier to find (A) because they halt execution. Bash does not use colored output for wrong answers (B). Division is common in scripts (D). Silent truncation is the most dangerous failure mode because it produces results that pass casual inspection.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "Your bank CSV has a Debit column and a Credit column instead of a single Amount column. You tell Claude Code about your specific format. What director skill does this demonstrate?",
      options: [
        "Memorizing Python's csv module API documentation",
        "Writing the implementation code before describing the problem",
        "Testing the agent by giving intentionally wrong requirements",
        "Providing domain-specific data knowledge the agent lacks"
      ],
      correctOption: 3,
      explanation: "Describing your bank's specific schema (Debit and Credit columns instead of Amount) provides domain knowledge that the agent cannot discover on its own. The agent adapts the implementation to match your data. Memorizing APIs (A) is the agent's role. Writing code first (B) reverses the workflow. Giving wrong requirements (D) wastes time. Your irreplaceable contribution is knowing what your actual data looks like — the agent handles the code.",
      source: "Lesson 3: Parsing Real Data"
    },
    {
      question: "The chapter's central rule is: 'If it is math, ask AI to write code that calculates — never ask AI to calculate.' Which scenario correctly applies this rule?",
      options: [
        "Ask the AI to build a script that sums amounts from stdin",
        "Ask the AI to sum 200 invoice amounts in a spreadsheet",
        "Ask the AI to estimate your monthly average spending",
        "Ask the AI to round each transaction to the nearest dollar"
      ],
      correctOption: 0,
      explanation: "Asking the AI to build a script that calculates follows the rule — the computation happens in verified code, not in the AI's token prediction. Asking the AI to sum directly (A) relies on unreliable head-math at scale. Estimating spending (C) is a prediction, not precise computation. Rounding via AI (D) is still asking the AI to compute rather than write code that computes. The distinction is between executing arithmetic and predicting arithmetic.",
      source: "Lesson 1: From Broken Math to Your First Tool"
    },
    {
      question: "Your categorizer handles bank data well. A colleague asks you to categorize employee expense reports that use different merchant naming conventions. What is the most efficient way to adapt your workflow?",
      options: [
        "Rewrite the entire categorizer from scratch for expense reports",
        "Use awk instead of Python since expense reports are simpler",
        "Keep the same build-verify-guard workflow but update the keyword patterns",
        "Skip verification since the categorizer already proved correct on bank data"
      ],
      correctOption: 2,
      explanation: "The build-verify-guard workflow transfers to any categorization domain — only the patterns and false positive guards need updating for new data. Rewriting from scratch (A) discards proven architecture. awk (C) still has the same CSV quoting issues with external data. Skipping verification (D) violates the zero-trust principle — new data may contain patterns your tests never covered. The workflow is the transferable asset; the patterns are domain-specific.",
      source: "Lesson 5: Data Wrangling & Domain Transfer"
    }
  ]}
  questionsPerBatch={18}
/>
