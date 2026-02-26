---
sidebar_position: 7
title: "Chapter 16: Reading Python Quiz"
---

# Chapter 16 Quiz

Test your understanding of reading typed Python code. Each session presents a random selection of questions with immediate feedback.

<Quiz
  title="Chapter 16: Reading Python Assessment"
  questions={[
    {
      question: "James generates 50 lines of Python with AI and ships them without reading. According to the PRIMM framework, which critical step did he skip first?",
      options: [
        "The Predict stage before running code",
        "The Modify stage after testing code",
        "The Make stage of writing new code",
        "The Deploy stage to production servers"
      ],
      correctOption: 0,
      explanation: "The Predict stage is the first step in PRIMM -- before running code, you must predict what it will do. James skipped prediction entirely by shipping without reading. The Modify stage comes later in PRIMM and involves changing existing code, not initial review. The Make stage involves writing new code from scratch, but James used AI to generate code. There is no Deploy stage in PRIMM -- the framework has five stages: Predict, Run, Investigate, Modify, Make. In the AI era, the ability to predict and verify code behavior is more critical than the ability to write it.",
      source: "Lesson 1: Why Reading Comes Before Writing"
    },
    {
      question: "A team ships AI-generated code that passes all automated tests but produces subtly wrong business reports. Which verification gap does this scenario expose?",
      options: [
        "The automated tests were written in the wrong language",
        "The AI was not configured to use the latest model",
        "Automated tools cannot verify developer intent",
        "The reports need a different output file format"
      ],
      correctOption: 2,
      explanation: "Automated tools like pyright, ruff, and pytest verify specific properties -- types match, style is consistent, tests pass -- but they cannot verify whether the code does what the developer intended. Only a human reader can verify intent by reading the code. The programming language choice is irrelevant to the verification gap. Model version does not determine whether business logic is correct. Output format is a surface issue unrelated to the intent verification problem.",
      source: "Lesson 1: Why Reading Comes Before Writing"
    },
    {
      question: "A developer reads code by scanning from top to bottom and reaching the end with a general impression. According to Lesson 1, what is this approach missing?",
      options: [
        "Running the code in a debugger with breakpoints",
        "Predicting output, tracing state, and explaining in plain English",
        "Using AI to summarize the file before reading it",
        "Compiling the code first to check for syntax errors"
      ],
      correctOption: 1,
      explanation: "Active reading requires three specific activities: predicting what code will do before running it, tracing variable state changes line by line, and explaining function purpose in plain English. Scanning produces a vague impression, not understanding. Using a debugger is a runtime activity, not a reading technique. Having AI summarize the code defeats the purpose of building your own mental model. Python is interpreted, not compiled, so compilation is not relevant.",
      source: "Lesson 1: Why Reading Comes Before Writing"
    },
    {
      question: "In the pre-AI era, the primary bottleneck for programmers was production speed. What replaced it as the primary bottleneck in the AI era?",
      options: [
        "The speed of fine-tuning AI models for tasks",
        "The cost of AI assistant subscriptions for teams",
        "The number of languages a developer can learn",
        "The ability to verify generated code is correct"
      ],
      correctOption: 3,
      explanation: "AI removed the production bottleneck -- code can be generated in seconds. The new bottleneck is verification: confirming generated code is correct and does what you intended. Fine-tuning speed is an infrastructure concern, not a developer workflow bottleneck. Subscription cost is a business concern unrelated to the skill shift. The number of languages known is irrelevant to the fundamental shift from writing to reading.",
      source: "Lesson 1: Why Reading Comes Before Writing"
    },
    {
      question: "A student makes a wrong prediction about what code will output. According to Lesson 1, why is this wrong prediction valuable?",
      options: [
        "It helps the AI improve its code generation accuracy",
        "It reveals gaps between assumptions and actual Python behavior",
        "It indicates the student should switch to an easier language",
        "It proves the PRIMM framework is not effective for all learners"
      ],
      correctOption: 1,
      explanation: "Every wrong prediction reveals a gap between what you assumed and what Python actually does. These gaps are precisely where learning happens -- they expose misconceptions that need correction. Wrong predictions do not affect AI model training at all. They do not indicate the student should change languages; they indicate a learning opportunity. Wrong predictions are a feature of PRIMM, not evidence against it -- the framework is designed around prediction and correction.",
      source: "Lesson 1: Why Reading Comes Before Writing"
    },
    {
      question: "Emma says reading code is like learning a natural language. Which parallel best captures her analogy?",
      options: [
        "Writers publish novels before reading any books",
        "Learners memorize grammar before hearing spoken words",
        "Children read thousands of sentences before writing",
        "Translators learn both languages simultaneously from day one"
      ],
      correctOption: 2,
      explanation: "The language-learning analogy states that reading comprehension comes before writing -- children read thousands of sentences before composing paragraphs. Similarly, programmers need to read patterns before producing their own code. Writers do not publish before reading; that reverses the natural order. Memorizing grammar rules without exposure is not how language acquisition works. Simultaneous learning does not match the reading-first progression described in the lesson.",
      source: "Lesson 1: Why Reading Comes Before Writing"
    },
    {
      question: "A developer sees the annotation `temperature: float = 38.5` in a codebase. Using the jar label analogy, what does this tell the reader?",
      options: [
        "The variable is a jar labeled float holding the decimal 38.5",
        "The float label restricts values to between 0.0 and 100.0",
        "The annotation automatically converts assigned values to float",
        "Python will raise an error if a non-float is assigned later"
      ],
      correctOption: 0,
      explanation: "The jar label analogy means the annotation tells readers what type of value the jar contains -- float means decimal number, and 38.5 is the current value. The float type has no range restriction between 0.0 and 100.0; it can hold any decimal number. Annotations do not perform automatic conversion; they are metadata labels only. Python does not enforce type annotations at runtime, so assigning a non-float later would not raise an error.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "Given the annotation `middle_name: str | None = None`, which reading correctly describes what this variable can hold?",
      options: [
        "The variable can hold either text or nothing and currently holds nothing",
        "The variable is a string that always equals the text None",
        "The variable converts None to an empty string when accessed",
        "The pipe means the variable switches between str and None on each read"
      ],
      correctOption: 0,
      explanation: "The str | None annotation means the variable holds either a string value or None (nothing). Currently it is assigned None, meaning it holds nothing. It does not hold the text 'None' as a string -- None is a special Python value representing absence. The annotation does not perform automatic conversion; None stays None until explicitly reassigned. The pipe symbol means 'or' in type annotations, not alternating between types on each access.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "A developer writes `bool(\"0\")` expecting it to return False. What does it actually return, and why?",
      options: [
        "It returns False because the character zero represents the number zero",
        "It raises a ValueError because strings cannot be converted to booleans",
        "It returns False because Python interprets the digit as the falsy integer",
        "It returns True because the string contains a character and is not empty"
      ],
      correctOption: 3,
      explanation: "bool('0') returns True because '0' is a non-empty string. Python's truthiness rule for strings is simple: empty string is falsy, everything else is truthy. The content of the string does not matter -- '0', 'False', and 'hello' are all truthy because they are not empty. Python does not interpret the character '0' as the number zero for truthiness. No ValueError is raised because bool() accepts any value. Python does not look at the digit's numeric meaning when evaluating string truthiness.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "Which of the following is a falsy value in Python?",
      options: [
        "The string containing a single space character",
        "An empty dictionary with no key-value pairs",
        "A list containing one element which is zero",
        "The integer negative one"
      ],
      correctOption: 1,
      explanation: "An empty dictionary {} is falsy because it contains nothing -- emptiness is the key factor for container falsiness. A string with a single space ' ' is truthy because it is not empty (it contains a character). A list containing [0] is truthy because it has one element (the list itself is not empty, even though its element is zero). The integer -1 is truthy because it is non-zero. The falsy rule: False, 0, 0.0, empty string, None, empty list, and empty dict.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "A developer writes `int(\"3.14\")` and the program crashes. What is the correct way to convert a decimal string to an integer?",
      options: [
        "Use int(float(\"3.14\")) to convert to float then truncate",
        "Use bool to convert the string to boolean first then to int",
        "Use str(3.14) to remove the decimal before converting",
        "Use float(\"3\") because float handles all string conversions"
      ],
      correctOption: 0,
      explanation: "int('3.14') raises a ValueError because int() cannot parse a string containing a decimal point. The two-step conversion int(float('3.14')) first converts the string to float 3.14, then truncates to integer 3. Converting to bool first would give True (non-empty string), then int(True) gives 1 -- completely wrong. str(3.14) gives '3.14' as a string, not a parseable integer. float('3') gives 3.0, which does not address the original problem of converting '3.14' to an integer.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "A developer reads two versions of the same function -- one without type annotations and one with. What specific advantage does the typed version provide to the reader?",
      options: [
        "The typed version runs faster due to runtime optimization",
        "The typed version prevents all bugs via strict enforcement",
        "The typed version auto-generates documentation pages",
        "The typed version reveals inputs and outputs without reading the body"
      ],
      correctOption: 3,
      explanation: "Type annotations let readers understand a function's contract -- what it accepts and returns -- without reading the body. For example, def process(data: list[int]) -> int tells you it takes a list of integers and returns an integer. Python does not optimize annotated code differently at runtime; annotations have zero performance impact. Python does not enforce annotations at runtime, so bugs are not prevented by annotations alone. Annotations do not auto-generate documentation; separate tools are needed for that.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "Which annotation form declares a variable's type without assigning a value?",
      options: [
        "result: int with no assignment on the same line",
        "result = 42 with no type annotation present",
        "result: int = 42 with both annotation and value",
        "def result() -> int: as a function returning int"
      ],
      correctOption: 0,
      explanation: "The form result: int declares that result will hold an integer but does not assign a value yet. This is annotation without assignment -- it declares intent. result = 42 with no annotation assigns a value but does not annotate the type. result: int = 42 is annotation with value -- both present on one line. def result() -> int: defines a function, not a variable annotation. The three annotation forms are: with value, without value, and function return.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "What value does `bool(\"False\")` return in Python?",
      options: [
        "False because the string matches the boolean keyword",
        "A ValueError because Python cannot convert text to boolean",
        "True because it is a non-empty string regardless of content",
        "None because the string does not match True or False exactly"
      ],
      correctOption: 2,
      explanation: "bool('False') returns True because 'False' is a non-empty string. Python does not interpret the content of a string when evaluating truthiness -- it only checks whether the string is empty or not. The string 'False' has five characters, so it is truthy. Python does not match string content to boolean keywords during conversion. No ValueError is raised because bool() accepts any value. The result is not None; bool() always returns True or False.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "Given `int(True)`, what value does Python produce?",
      options: [
        "Python raises a TypeError for boolean-to-integer conversion",
        "Python returns 1 because True converts to the integer one",
        "Python returns 0 because True is treated as falsy in conversion",
        "Python returns the string 'True' as text from the conversion"
      ],
      correctOption: 1,
      explanation: "int(True) returns 1 because Python's bool type is a subclass of int, where True equals 1 and False equals 0. No TypeError is raised because boolean-to-integer conversion is well-defined in Python. The result is not a string; int() returns integers. True is not falsy -- it is truthy by definition and converts to 1, not 0. This conversion is useful to know when reading code that uses boolean values in arithmetic expressions.",
      source: "Lesson 2: Types as Labels"
    },
    {
      question: "A developer writes `result: float = 6 / 3` and gets 2.0 instead of 2. Why does division produce a float even when the result is a whole number?",
      options: [
        "The type annotation float forces Python to convert the result",
        "Python detected the annotation and adjusted the operation accordingly",
        "The division operator always returns a float regardless of operands",
        "The number 6 is secretly stored as 6.0 making all operations return floats"
      ],
      correctOption: 2,
      explanation: "The / division operator in Python always returns a float, even when both operands are integers and the result is a whole number. 6 / 3 evaluates to 2.0, not 2. The type annotation does not influence the result of the expression -- Python ignores annotations at runtime. Python does not adjust operations based on variable annotations. The number 6 is stored as an integer, not 6.0; the float result comes from the division operator itself, not from how operands are stored.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "What does the expression `-7 // 2` evaluate to in Python?",
      options: [
        "It evaluates to -3 because floor division truncates toward zero",
        "It evaluates to -3.5 because floor division preserves the decimal",
        "It raises an error because floor division cannot handle negatives",
        "It evaluates to -4 because floor division rounds toward negative infinity"
      ],
      correctOption: 3,
      explanation: "-7 // 2 evaluates to -4 because Python's floor division rounds toward negative infinity, not toward zero. The mathematical result is -3.5, and the floor (next lower integer) of -3.5 is -4, not -3. Floor division does not truncate toward zero -- that behavior belongs to int() conversion. Floor division does not preserve decimals; it always produces an integer result. Floor division works perfectly with negative numbers; it simply floors in the negative direction.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "A developer evaluates `2 ** 3 ** 2` and expects 64. What does Python actually compute, and why?",
      options: [
        "Python computes 512 because exponentiation evaluates right-to-left",
        "Python computes 64 because exponentiation evaluates left-to-right",
        "Python computes 36 because it adds the exponents together",
        "Python raises an error because chaining exponentiation is not allowed"
      ],
      correctOption: 0,
      explanation: "Exponentiation in Python is right-associative, meaning 2 ** 3 ** 2 evaluates as 2 ** (3 ** 2) = 2 ** 9 = 512. This is different from most other operators which are left-to-right. The left-to-right interpretation (2 ** 3) ** 2 would give 64, but that is not how Python evaluates it. Python does not add exponents together. Chaining exponentiation is perfectly valid syntax -- the right-to-left rule resolves the ambiguity.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "What does the expression `-3 ** 2` evaluate to in Python?",
      options: [
        "It evaluates to 9 because the negative applies before squaring",
        "It evaluates to 6 because Python multiplies -3 by 2 instead",
        "It raises a SyntaxError because negatives cannot use exponentiation",
        "It evaluates to -9 because exponentiation binds tighter than negation"
      ],
      correctOption: 3,
      explanation: "-3 ** 2 evaluates to -9 because exponentiation (**) has higher precedence than the unary negation operator (-). Python reads this as -(3 ** 2) = -(9) = -9. To square negative three and get 9, you must write (-3) ** 2 with explicit parentheses. This is not multiplication; ** is the exponentiation operator. There is no syntax error -- this is valid Python, just surprising in its precedence. This is one of the most common prediction traps for beginners.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "Given the expression `2 + 3 * 4`, a student predicts the result is 20. What is the actual result and which precedence rule explains it?",
      options: [
        "The result is 20 because Python evaluates strictly left to right",
        "The result is 24 because Python adds all numbers then multiplies",
        "The result is 14 because multiplication precedes addition",
        "The result is 14 because Python evaluates larger numbers first"
      ],
      correctOption: 2,
      explanation: "The result is 14 because multiplication has higher precedence than addition. Python evaluates 3 * 4 first (giving 12), then adds 2 (giving 14). Python does not evaluate strictly left to right when operators have different precedence levels. Python does not add all numbers before multiplying. The size of numbers has nothing to do with evaluation order -- operator precedence determines the order. To get 20, you would need parentheses: (2 + 3) * 4.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "A student builds a trace table for code where `x` starts at 5 and line 3 executes `x = x * 2`. On line 4, they use `x = 5` in their calculation. What error did they make?",
      options: [
        "They forgot x was reassigned to 10 and used the original value",
        "They confused the trace table column for x with another variable",
        "They made a mathematical error calculating 5 times 2 incorrectly",
        "They incorrectly assumed multiplication runs before assignment"
      ],
      correctOption: 0,
      explanation: "The student used the old value of x (5) instead of the updated value (10) after the reassignment on line 3. This is the most common trace table error -- the brain takes a shortcut and skips the update step. After x = x * 2 executes with x at 5, x becomes 10. All subsequent lines must use 10, not 5. Column confusion and math errors are not described in this scenario. Python does evaluate the right side before assignment, but that is not the error here. Trace tables exist precisely to prevent this shortcut.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "What does the expression `0 or \"\" or \"found\"` evaluate to in Python?",
      options: [
        "It evaluates to True because or always returns a boolean",
        "It evaluates to the string 'found' as the first truthy value",
        "It evaluates to 0 because or returns the first value provided",
        "It evaluates to an empty string via short-circuit evaluation"
      ],
      correctOption: 1,
      explanation: "Python's or operator returns the first truthy value it encounters, or the last value if all are falsy. It checks 0 (falsy), then '' (falsy), then 'found' (truthy) -- and returns 'found'. The or operator does not always return a boolean; it returns the actual value that determined the result. It does not return the first value blindly; it evaluates truthiness. The empty string does not short-circuit because it is falsy, so or continues checking. This short-circuit behavior is commonly used for default values.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "What does `5 and 3 and 0` evaluate to in Python?",
      options: [
        "It evaluates to 0 because and returns the first falsy value",
        "It evaluates to True because all three values are present",
        "It evaluates to 3 because and stops after two truthy values",
        "It evaluates to 5 because and returns the first value always"
      ],
      correctOption: 0,
      explanation: "Python's and operator returns the first falsy value it encounters, or the last value if all are truthy. It checks 5 (truthy, continue), then 3 (truthy, continue), then 0 (falsy, stop and return 0). The and operator returns actual values, not True/False. It does not stop after two truthy values -- it continues until it finds a falsy value or reaches the end. It does not return the first value unconditionally. Understanding short-circuit evaluation is essential for reading real Python code.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "A developer writes `round(2.5)` and expects 3. What does Python actually return, and what rounding strategy explains this?",
      options: [
        "Python returns 3 because it always rounds up at exactly 0.5",
        "Python returns 2.0 as a float because round always returns floats",
        "Python raises a ValueError for halfway decimal values",
        "Python returns 2 using banker's rounding to the nearest even number"
      ],
      correctOption: 3,
      explanation: "round(2.5) returns 2, not 3. Python uses banker's rounding (round half to even): when a number is exactly halfway, it rounds to the nearest even number. Since 2 is even and 3 is odd, Python rounds down to 2. Python does not always round up at 0.5 -- that is a common misconception from grade school math. round() with a single integer argument returns an int, not a float. No ValueError is raised; round() handles any numeric value. This rounding strategy reduces cumulative bias in large datasets.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "Why does `0.1 + 0.2 == 0.3` evaluate to False in Python?",
      options: [
        "Python has a bug in its addition operator for decimals",
        "The == operator does not work with float values in Python",
        "The decimal 0.1 has no exact binary representation causing tiny errors",
        "Python rounds 0.1 and 0.2 to zero before performing the addition"
      ],
      correctOption: 2,
      explanation: "0.1 has no exact binary representation under the IEEE 754 standard that all modern computers use. When Python stores 0.1, it stores a very close approximation. Adding two approximations produces 0.30000000000000004, not exactly 0.3. This is not a Python bug; it exists in every language using binary floating-point. The == operator works correctly -- it compares the actual stored values, which genuinely differ. Python does not round 0.1 or 0.2 to zero. The correct approach is comparing with a small tolerance rather than exact equality.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "Given `word: str = \"Python\"`, what does `word[1:4]` evaluate to?",
      options: [
        "It evaluates to 'Pyth' including both start and stop indices",
        "It evaluates to 'ytho' because indices start at 1 in slicing",
        "It evaluates to 'thon' because negative indices are used here",
        "It evaluates to 'yth' including start but excluding the stop index"
      ],
      correctOption: 3,
      explanation: "word[1:4] evaluates to 'yth'. Slicing syntax s[start:stop] includes the character at the start index but excludes the character at the stop index. Index 1 is 'y', index 2 is 't', index 3 is 'h' -- giving 'yth'. Index 4 would be 'o', but it is excluded. Slicing does not include the stop index, so 'Pyth' is wrong. Python string indices always start at 0, so index 1 is the second character. Negative indices are not involved here; they are used to count from the end.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "What does `f\"{80 + 15}\"` produce when Python evaluates the f-string expression?",
      options: [
        "It produces '80 + 15' with the expression as literal text",
        "It produces '95' after evaluating the arithmetic inside braces",
        "It raises a SyntaxError because arithmetic cannot go in f-strings",
        "It produces the integer 95 as a numeric value not a string"
      ],
      correctOption: 1,
      explanation: "F-strings evaluate the expression inside the curly braces and embed the result into the string. The expression 80 + 15 evaluates to 95, which is then converted to the string '95'. F-strings do not display expressions as literal text -- the braces indicate evaluation. Arithmetic operations are perfectly valid inside f-string braces; they are one of the most common use cases. The result is a string (since f-strings produce strings), not a bare integer.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "A developer sees `0 < x < 10` in Python code. What does this comparison chaining syntax mean?",
      options: [
        "It assigns the value 0 to x then compares x to 10",
        "It creates a range from 0 to 10 and checks membership",
        "It checks whether x is greater than 0 AND less than 10",
        "It raises a SyntaxError because comparisons cannot chain"
      ],
      correctOption: 2,
      explanation: "Python supports comparison chaining, where 0 < x < 10 means 'is x greater than 0 AND less than 10?' This is a feature most other languages do not have. It does not perform assignment -- < is a comparison operator, not assignment. It does not create a range object; it evaluates two comparisons joined by an implicit 'and'. Comparison chaining is valid Python syntax and is commonly used for range checks. This syntactic sugar makes code more readable and closer to mathematical notation.",
      source: "Lesson 3: Reading Expressions and Predicting Output"
    },
    {
      question: "Emma shows James the signature `def search_notes(query: str, max_results: int = 10) -> list[str]:`. Without reading the body, what can James determine?",
      options: [
        "The function always returns exactly ten string results",
        "The function modifies a global database and returns nothing",
        "The function requires both arguments every time it is called",
        "It takes a text query and returns strings with a default limit of ten"
      ],
      correctOption: 3,
      explanation: "The signature reveals the complete contract: it accepts a required string query and an optional integer max_results (defaulting to 10), and returns a list of strings. This is the power of typed signatures -- you know inputs, outputs, and defaults without reading the body. It does not always return exactly ten results; 10 is a default maximum, not a guaranteed count. The return type list[str] means it returns a value, so it does not return nothing. The second parameter has a default, so it is optional -- only query is required.",
      source: "Lesson 4: Reading Function Signatures"
    },
    {
      question: "A function is defined as `def repeat_text(text: str, times: int = 3) -> str:`. What are the parameter values when calling `repeat_text(\"ha\")`?",
      options: [
        "The call raises a TypeError because both arguments are required",
        "text is 'ha' and times is 3 using the declared default value",
        "text is 'ha' and times is 0 because Python defaults to zero",
        "text is 'ha' and times is None for the missing argument"
      ],
      correctOption: 1,
      explanation: "When calling repeat_text('ha'), text receives 'ha' and times uses its default value of 3. Default values are specified in the signature with = after the type annotation. Python does not default to zero for missing arguments; it uses the declared default value. The call does not raise a TypeError because times has a default value, making it optional. Missing arguments do not receive None; they receive whatever default value is declared in the signature.",
      source: "Lesson 4: Reading Function Signatures"
    },
    {
      question: "A developer stores the result of calling a function with `-> None` return type. What value does the variable hold?",
      options: [
        "The variable holds the string 'None' as text",
        "The variable is undefined and raises a NameError",
        "The variable holds None because the function returned no value",
        "The variable holds zero via automatic None-to-int conversion"
      ],
      correctOption: 2,
      explanation: "A function with -> None performs a side effect (like printing) but does not return a useful value. When you store its result, the variable holds None -- Python's representation of nothing. The variable does not hold the string 'None'; None is a special Python object, not text. The variable is defined (it exists) but holds None, so accessing it does not raise NameError. None is not automatically converted to zero; None and 0 are different values in Python.",
      source: "Lesson 4: Reading Function Signatures"
    },
    {
      question: "A function uses print() internally with `-> None`, and another uses return with `-> str`. A developer calls both and stores the results. Which statement is correct?",
      options: [
        "The print version holds None; the return version holds the greeting",
        "Both hold the greeting because print and return are identical",
        "The print version holds the greeting; the return version holds None",
        "Both hold None because storing results always discards the value"
      ],
      correctOption: 0,
      explanation: "The print version sends text to the screen but returns None, so the variable holds None. The return version sends the value back to the caller without displaying anything, so the variable holds the greeting string. Print and return are fundamentally different: print displays and is gone, return stores and is reusable. They do not produce identical results. The return version does not hold None; it holds the actual string value. Storing function results does not discard them; that is the purpose of the return statement.",
      source: "Lesson 4: Reading Function Signatures"
    },
    {
      question: "Given `def create_note(title: str, content: str, priority: int = 1) -> str:`, what happens when calling `create_note(\"Meeting\")`?",
      options: [
        "Python uses defaults for both content and priority since only title was given",
        "Python raises a TypeError because content is required but missing",
        "Python assigns None to content for the missing parameter automatically",
        "Python skips content and assigns 'Meeting' to the priority parameter"
      ],
      correctOption: 1,
      explanation: "create_note('Meeting') raises a TypeError because content is a required parameter with no default value. Only priority has a default (1), making it optional. Python does not provide default values for parameters that lack them. Missing required arguments cause TypeError, not automatic None assignment. Python matches arguments to parameters left to right, so 'Meeting' goes to title (first parameter), and content (second parameter) has no argument and no default.",
      source: "Lesson 4: Reading Function Signatures"
    },
    {
      question: "A function with `-> str | None` return type is called and the result is used directly with `.upper()`. What problem does this create?",
      options: [
        "The upper method converts None to the string 'NONE' automatically",
        "Python silently skips the upper call and returns an empty string",
        "If the function returns None, .upper() crashes with AttributeError",
        "The str | None type forces Python to always return a string value"
      ],
      correctOption: 2,
      explanation: "If a function returns None and you call .upper() on it, Python crashes with AttributeError: 'NoneType' has no attribute 'upper'. None is not a string and has no string methods. Python does not convert None to 'NONE' -- that would mask a real bug. Python does not silently skip method calls on None. The str | None type means the function might return either type, not that it guarantees a string. The fix is to check for None before calling string methods.",
      source: "Lesson 4: Reading Function Signatures"
    },
    {
      question: "James writes `age: int = 25` and then `age = \"twenty-five\"`. Python runs it without error. Why does Python allow this?",
      options: [
        "Python detected the annotation and silently converted the string",
        "Python updated the annotation from int to str automatically",
        "Python raised a background warning James did not see in terminal",
        "Python is dynamically typed and ignores annotations at runtime"
      ],
      correctOption: 3,
      explanation: "Python is dynamically typed and stores annotations as metadata in __annotations__ but never checks them at runtime. The annotation int has zero effect on what values can be assigned. Python does not convert strings to integers based on annotations. Python does not update annotations when values change. Python does not raise background warnings for type mismatches -- it genuinely does not care about annotation violations at runtime. Only external tools like Pyright enforce type annotations.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "If Python ignores type annotations at runtime, what are the three reasons annotations still matter according to Lesson 5?",
      options: [
        "Documentation for humans, Pyright bug detection, and AI code reviewability",
        "Speed optimization, memory reduction, and automatic error recovery",
        "Database schema generation, API creation, and network protocol definition",
        "Syntax highlighting, code autocompletion, and version control tracking"
      ],
      correctOption: 0,
      explanation: "Annotations serve three purposes: they document what functions accept and return (for human readers), they enable static analysis tools like Pyright to catch bugs before runtime, and they make AI-generated code reviewable by letting readers verify contracts without reading implementation. Annotations do not affect execution speed or memory usage. They do not generate database schemas or API endpoints. While they help with autocompletion in IDEs, that is a tool benefit, not one of the three core reasons presented in the lesson.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "Pyright reports: `main.py:4:7 - error: Argument of type \"int\" is not assignable to parameter \"name\" of type \"str\" (reportArgumentType)`. Which part identifies the specific rule?",
      options: [
        "The file path main.py at the beginning of the message",
        "The line and column numbers 4:7 showing error location",
        "The word error indicating the severity of the problem",
        "The text reportArgumentType in parentheses at the end"
      ],
      correctOption: 3,
      explanation: "The rule name appears in parentheses at the end of each Pyright error message -- in this case, reportArgumentType. Every Pyright error follows the four-part format: file path, line:column, description, and rule name in parentheses. The file path identifies which file, not which rule. The line and column numbers identify the location of the error. The word 'error' indicates severity level, not the specific rule. Learning to read the rule name helps you categorize and understand different types of violations.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "A function is declared as `def get_count() -> int:` but its body contains `return \"forty-two\"`. Which Pyright error category does this trigger?",
      options: [
        "reportAssignmentType for a variable assigned the wrong type",
        "reportArgumentType for a wrong argument passed to a function",
        "reportReturnType because the return value mismatches the declared type",
        "reportOptionalMemberAccess because the return might be None"
      ],
      correctOption: 2,
      explanation: "This is a return type mismatch -- the signature promises int but the body returns a string. Pyright flags this as reportReturnType. It is not reportAssignmentType because no variable assignment is mismatched -- the issue is the return statement. It is not reportArgumentType because no function call has wrong arguments. It is not reportOptionalMemberAccess because there is no None-safety issue. The five Pyright categories each address a specific kind of type violation.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "A function handles scores >= 90 and >= 80 with return statements, but has no return for scores below 80. Which Pyright error category catches this?",
      options: [
        "reportReturnType because not all code paths return the declared type",
        "reportArgumentType because the score argument has the wrong type",
        "reportAssignmentType because the missing path assigns an incorrect type",
        "reportOptionalMemberAccess because the function returns None unexpectedly"
      ],
      correctOption: 0,
      explanation: "When a function declares a return type like -> str but some code paths reach the end without a return statement, Python silently returns None. Pyright flags this as reportReturnType -- the function promised str but can return None on the missing code path. It is not reportArgumentType because the function call is correct. It is not reportAssignmentType because no assignment mismatch exists. While None is involved, the root issue is a missing return statement, not accessing a member on None.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "What is gradual typing in Python, and how does it relate to the annotations in this course?",
      options: [
        "Python requires all types declared before code can execute",
        "Gradual typing means Python learns types from runtime behavior",
        "You can add type annotations incrementally and untyped code still runs",
        "Gradual typing requires Pyright installed before annotations work"
      ],
      correctOption: 2,
      explanation: "Gradual typing means you adopt type annotations at your own pace -- code without annotations runs identically to code with annotations. You can type one function today and another tomorrow. Python does not require all types before execution. Python does not learn types from runtime behavior; annotations are static metadata. Pyright is not required for annotations to exist or be valid -- they work as documentation even without Pyright. The course uses full annotations from day one to build reading habits, not because Python demands it.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "A developer writes `calculate_total(\"fifty\", 3)` where the signature is `def calculate_total(price: int, quantity: int) -> int:`. What happens without Pyright vs with Pyright?",
      options: [
        "Without Pyright Python crashes immediately on execution",
        "Both with and without Pyright the code behaves identically",
        "Without Pyright Python auto-converts the string to an integer",
        "Without Pyright Python runs silently wrong; with Pyright the mismatch is flagged"
      ],
      correctOption: 3,
      explanation: "Without Pyright, Python runs the code -- string 'fifty' multiplied by 3 produces 'fiftyfiftyfifty' via string repetition, silently generating wrong data. With Pyright, the type mismatch is caught at edit time before execution. Python does not crash because string * int is valid Python (it repeats the string). Python and Pyright do not behave identically; Python ignores annotations while Pyright enforces them. Python does not auto-convert strings to integers based on annotations. This scenario demonstrates why static analysis prevents dangerous silent bugs.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "Where does Python store type annotations at runtime?",
      options: [
        "In a file called types.py created automatically in the project",
        "In the __annotations__ dictionary as metadata Python never checks",
        "In system memory alongside variable values to enforce constraints",
        "In pyproject.toml alongside other project settings and dependencies"
      ],
      correctOption: 1,
      explanation: "Python stores annotations in the __annotations__ dictionary, which is accessible at runtime as metadata. However, Python never consults this dictionary to enforce type constraints during execution. Annotations are not stored in a separate file; they live in the __annotations__ attribute of modules, classes, and functions. They are not stored alongside variable values for enforcement. They are not stored in pyproject.toml, which is a project configuration file unrelated to runtime annotation storage.",
      source: "Lesson 5: What Python Does with Types"
    },
    {
      question: "When reviewing a function using the code review checklist, which step should a developer perform first?",
      options: [
        "Read the function body line by line for implementation logic",
        "Test the function with edge case inputs like empty strings",
        "Run the function in a debugger to observe variable state",
        "Read the function signature to understand the input-output contract"
      ],
      correctOption: 3,
      explanation: "The code review checklist starts with the signature -- it tells you the contract (what goes in, what comes out) before you read any implementation. This is the most important step because the signature reveals the function's purpose. Reading the body comes third, after signature and types. Testing with edge cases is the fourth and final step. Running a debugger is a runtime activity, not part of the static reading checklist. The four steps in order are: signature, types, body, edge cases.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "The SmartNotes function `format_title` receives the input `\"  hello   world  \"`. What does it return?",
      options: [
        "It returns 'hello world' with spaces removed but no capitalization",
        "It returns 'Hello World' with clean spaces and each word capitalized",
        "It returns '  Hello   World  ' with capitalization but original spacing",
        "It returns 'HELLO WORLD' with all characters converted to uppercase"
      ],
      correctOption: 1,
      explanation: "format_title uses raw_title.split() to break the string into words (removing all extra whitespace), then ' '.join() to reassemble with single spaces, and .title() to capitalize each word's first letter. The result is 'Hello World'. Split-then-join removes extra spaces, so the spacing claim in option C is wrong. The .title() method capitalizes first letters, not all letters like .upper() would. The output has both clean spacing and proper capitalization.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "The SmartNotes `search_notes` function is called with an empty string as the query. What does it return?",
      options: [
        "It returns all notes because an empty string is in every string",
        "It raises a ValueError because empty strings are not valid queries",
        "It returns None because there are no results for empty queries",
        "It returns an empty list because an empty query matches nothing"
      ],
      correctOption: 0,
      explanation: "In Python, an empty string '' is contained in every string -- the expression '' in 'any string' evaluates to True. Therefore search_notes with an empty query matches every note in the list and returns all of them. No ValueError is raised because empty strings are valid function arguments. The function returns list[Note], never None -- when nothing matches, it returns an empty list, not None. It does not return an empty list because every note matches. This is an important edge case for code reviewers to understand.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "The `count_by_tag` function receives notes where one note has an empty tags list. What happens during execution?",
      options: [
        "The function crashes with an IndexError accessing the first tag",
        "The function adds an empty string key with a count of one",
        "The function skips that note because the inner loop runs zero times",
        "The function returns None instead of a dictionary for missing data"
      ],
      correctOption: 2,
      explanation: "When a note has an empty tags list, the inner for loop (for tag in note.tags) runs zero times because there are no tags to iterate over. The function simply skips to the next note with no crash and no empty entry. No IndexError occurs because the for loop handles empty sequences gracefully. No empty string entry is added because the loop body never executes. The function always returns a dict[str, int], never None. This is a good example of how Python loops handle empty collections safely.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "The SmartNotes module uses `@dataclass` on the Note class. Without understanding decorators deeply, what does a reader need to know?",
      options: [
        "It converts the class into a function returning a dictionary",
        "It auto-creates an __init__ accepting the declared fields as arguments",
        "It prevents any methods from being added to the class later",
        "It makes the class immutable so no fields can ever be changed"
      ],
      correctOption: 1,
      explanation: "For reading purposes, @dataclass means Python automatically generates an __init__ method that accepts title, body, and tags as arguments. This lets you write Note(title='...', body='...', tags=[...]) without defining __init__ yourself. It does not convert the class to a function or dictionary. It does not prevent adding methods; you can add methods to a dataclass. By default, dataclasses are mutable -- fields can be changed after creation unless frozen=True is specified.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "A developer describes search_notes as 'it iterates over a list and appends matching elements to a results array.' Why is this not a good plain English explanation?",
      options: [
        "It uses jargon like iterates and appends describing syntax not meaning",
        "It is wrong because the function uses list comprehension not a loop",
        "It reveals implementation details that should be kept secret from reviewers",
        "It is too short and needs at least three paragraphs to be complete"
      ],
      correctOption: 0,
      explanation: "A good plain English explanation describes meaning, not syntax. Words like 'iterates', 'appends', and 'array' are programming jargon that a non-programmer would not understand. A better explanation: 'Searches through all your notes and returns the ones that mention a specific word.' The test is whether a non-programmer could understand your sentence. The function does use a loop, not list comprehension, so the syntax description is accurate but misses the point. Implementation details are not secret; the issue is clarity of communication. Length is not the issue -- one clear sentence is enough.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "After tracing the main() function, how many notes match the search query 'python' and why?",
      options: [
        "Two match because both 'Python Types' and 'Pyright Errors' contain p-y",
        "One matches because only 'Python Types' contains the full substring 'python'",
        "Four match because the search is case-insensitive and checks all fields",
        "Zero match because the sample notes lack 'python' in their body text"
      ],
      correctOption: 1,
      explanation: "Only 'Python Types' matches because its title lowercased ('python types') contains the substring 'python'. The other three notes -- 'Trace Tables', 'PRIMM Method', and 'Pyright Errors' -- do not contain 'python' in their titles or bodies. 'Pyright' shares the letters p-y but does not contain the full substring 'python'. The search checks both title and body, but only the first note has 'python' in either field. This careful tracing through each note is the skill the lesson develops.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    },
    {
      question: "The main() function has return type `-> None`. What does this tell a reader about the function's behavior?",
      options: [
        "The function is broken because all functions should return useful values",
        "The function can only be called once because None prevents reuse",
        "It performs side effects like printing but does not return a value",
        "It will be updated to return a string once the implementation is complete"
      ],
      correctOption: 2,
      explanation: "A -> None return type indicates a side-effect function -- it does something visible (like printing to the screen) but does not give a value back to the caller. This is a perfectly valid design for entry-point functions like main(). Functions returning None are not broken; print-based output and file writing are common side effects. None does not prevent reuse; the function can be called any number of times. The return type is a design choice, not a placeholder for future implementation.",
      source: "Lesson 6: Reading SmartNotes — Your First Code Review"
    }
  ]}
  questionsPerBatch={18}
/>
