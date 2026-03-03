---
sidebar_position: 12
title: "Chapter 18: Intent-Driven Financial Architecture Quiz"
---

# Chapter 18: Intent-Driven Financial Architecture Quiz

Test your understanding of the Intent-Driven Financial Architecture (IDFA) — from the Coordinate Trap through the four deterministic guardrails to the five Finance Domain Agent capabilities.

<Quiz
title="Chapter 18: Intent-Driven Financial Architecture Assessment"
questions={[
{
question: "A new analyst inherits a financial model and finds the formula =B14-(C14*$F$8+D$3). They ask Claude to explain what it calculates. Claude responds with: 'This formula subtracts the product of C14 times the absolute reference F8, plus D3, from B14.' Why is this response unhelpful for financial analysis?",
options: [
"Claude can only describe cell references — it cannot infer the business logic because the formula encodes location, not intent",
"Claude gave the wrong mathematical interpretation of the formula",
"Claude should have opened the cells to check their values first",
"The formula has a syntax error that prevents Claude from analysing it"
],
correctOption: 0,
explanation: "Lesson 1 introduces Formula Rot and the core problem of coordinate-based models: formulas encode WHERE data lives, not WHAT it means. Claude can parse cell references but cannot determine whether B14 is revenue, C14 is a cost percentage, or F8 is a growth rate. The same formula rewritten as =Revenue_Y2 - (Revenue_Y2 * COGS*Pct_Y2 + Adjustment_Y2) would allow Claude to explain the business logic immediately.",
source: "Lesson 1: The Coordinate Trap"
},
{
question: "Formula Rot has four symptoms. An analyst discovers that inserting a new row in their model caused three formulas in other sheets to produce incorrect results without any error messages. Which symptom of Formula Rot does this illustrate?",
options: [
"Silent breakage — inserting a row shifts cell references without warning, causing formulas to reference wrong cells with no error indication",
"Logic diffusion — the same assumption appears in multiple cells and some were not updated",
"Audit burden — every formula must be manually traced to understand its purpose",
"AI opacity — agents cannot determine the business intent behind coordinate references"
],
correctOption: 0,
explanation: "Lesson 1 defines four symptoms of Formula Rot. Silent breakage occurs when structural changes (inserting rows, moving columns) shift cell references without producing errors. The formulas still calculate — they just calculate the wrong thing. Named Range formulas are immune to this because they reference names, not positions.",
source: "Lesson 1: The Coordinate Trap"
},
{
question: "Two analysts receive the same financial model. Analyst A's version uses coordinate formulas (=B14-C14). Analyst B's version uses Named Range formulas (=Revenue_Y2 - COGS_Y2). Both ask Claude: 'What drives Year 2 profitability?' Which statement best describes the difference in Claude's responses?",
options: [
"Claude gives Analyst B a confident business explanation identifying revenue and cost drivers, while giving Analyst A only a description of cell references with hedged, uncertain language about possible meanings",
"Both analysts receive identical responses because Claude understands Excel formulas regardless of format",
"Analyst A gets a better response because coordinate references give Claude more precise location data",
"Neither analyst gets a useful response because Claude cannot perform financial analysis"
],
correctOption: 0,
explanation: "Lesson 2 demonstrates that the same formula written in coordinate vs Named Range form produces categorically different Claude responses. With Named Ranges, Claude can identify business drivers (Revenue, COGS), explain relationships, and suggest what-if scenarios. With coordinates, Claude can only describe cell locations and guess at meaning.",
source: "Lesson 2: What Changes When AI Reads the Model"
},
{
question: "A finance team is debating whether to convert their models to IDFA. A sceptic argues: 'The AI gives the same answers either way — Named Ranges are just cosmetic.' What is the strongest counterargument from Chapter 18?",
options: [
"Named Ranges change what the agent CAN DO with the model — enabling Intent Synthesis, Deterministic What-If, Logic De-compilation, Goal-Seeking, and Stochastic Simulation — capabilities that are impossible with coordinate-based formulas",
"Named Ranges make the spreadsheet look more professional for client presentations",
"Named Ranges are required by Excel for the MCP Server to function",
"Named Ranges make formulas run faster in large models"
],
correctOption: 0,
explanation: "Lesson 2 establishes that IDFA is not cosmetic — it is architectural. The five Finance Domain Agent capabilities (validated in Lesson 11) are only possible when the model's logic is readable. An agent cannot perform Intent Synthesis on a coordinate-based model because it cannot determine what the coordinates represent.",
source: "Lesson 2: What Changes When AI Reads the Model"
},
{
question: "An IDFA-compliant model has exactly three layers. A junior analyst places the formula =Revenue_Y1 * COGS*Pct_Y1 in the Assumptions layer. What IDFA violation has occurred?",
options: [
"Calculations must never appear in the Assumptions layer — Layer 1 contains only user-modifiable inputs with no formulas",
"The formula uses the wrong naming convention for an Assumptions layer variable",
"The formula should reference cell addresses instead of Named Ranges in the Assumptions layer",
"There is no violation — any formula can appear in any layer as long as it uses Named Ranges"
],
correctOption: 0,
explanation: "Lesson 3 establishes the three-layer isolation rule. Layer 1 (Assumptions) contains only user-modifiable inputs — raw numbers, no formulas. Layer 2 (Calculations) contains all formulas using Named Ranges only. Layer 3 (Output) reads from Layer 2 for display. The formula =Revenue_Y1 * COGS_Pct_Y1 is a calculation and belongs in Layer 2.",
source: "Lesson 3: The Three Layers"
},
{
question: "When creating Named Ranges for input assumptions in IDFA, what naming convention must be followed?",
options: [
"All input assumptions must be prefixed with Inp* (e.g., Inp*Rev_Y1, Inp_COGS_Pct_Y1) so any reader can distinguish inputs from calculations at a glance",
"Input assumptions should use the sheet name as a prefix (e.g., Sheet1_Revenue)",
"Input assumptions must be written in ALL CAPS (e.g., REVENUE_Y1)",
"Input assumptions use no special prefix — the layer location is sufficient identification"
],
correctOption: 0,
explanation: "Lesson 3 specifies the IDFA naming conventions: input assumptions use the Inp* prefix, annual calculations use Variable*Yn format (e.g., Revenue_Y2), multi-period aggregates use Variable_Total, and ratios use Variable_Pct. The Inp* prefix is critical because it allows anyone — human or agent — to immediately distinguish modifiable inputs from derived calculations.",
source: "Lesson 3: The Three Layers"
},
{
question: "A financial model's Calculation layer contains this formula: =Revenue*Y1 _ 0.60. Does this pass IDFA compliance?",
options: [
"No — the hardcoded 0.60 violates layer isolation. It must be moved to the Assumptions layer as a Named Range (e.g., Inp_COGS_Pct_Y1) and the formula rewritten as =Revenue_Y1 _ Inp_COGS_Pct_Y1",
"Yes — the formula uses a Named Range (Revenue_Y1) so it is IDFA-compliant",
"No — the formula should use a cell reference instead of a Named Range",
"Yes — constants are allowed in the Calculation layer as long as they are clearly documented"
],
correctOption: 0,
explanation: "Lesson 4 (Guardrail 1: Named Range Priority) requires that no formula in the Calculation layer references hardcoded values. The value 0.60 is an assumption and must live in Layer 1 as a Named Range (Inp_COGS_Pct_Y1). Every value that could change must be a named input. This ensures the model can be modified by changing assumptions, not by editing formulas.",
source: "Lesson 4: Named Range Priority"
},
{
question: "Guardrail 1 provides a simple compliance test for any formula in the Calculation layer. What is that test?",
options: [
"If you can understand what the formula calculates without clicking on any referenced cell, it passes. If you need to navigate to understand it, it fails.",
"If the formula produces the correct numerical output, it passes",
"If the formula uses at least one Named Range, it passes",
"If the formula has fewer than 5 cell references, it passes"
],
correctOption: 0,
explanation: "Lesson 4 defines the compliance test: readability without navigation. A formula like =Revenue_Y2 - (Revenue_Y2 _ COGS_Pct_Y2) passes because you can read its business meaning directly. A formula like =B14-(B14_$C$3) fails because you must click on B14 and C3 to understand what they represent.",
source: "Lesson 4: Named Range Priority"
},
{
question: "An analyst writes a WACC formula in Excel. It looks structurally correct, but upon LaTeX verification, the following issue is discovered: the debt component is missing the (1-T) tax shield term. On a $100M acquisition, what is the likely consequence?",
options: [
"The cost of capital is overstated because the tax benefit of debt is not reflected, potentially mispricing the deal valuation by millions of dollars",
"The formula will produce an Excel error message alerting the analyst",
"The missing term has no material impact because WACC is only an estimate",
"Excel will automatically add the tax shield when the WACC function is used"
],
correctOption: 0,
explanation: "Lesson 5 (Guardrail 2: LaTeX Verification) explains that WACC errors are invisible in Excel's coordinate form but immediately obvious in LaTeX. The correct WACC formula includes (1-T) on the debt term: WACC = (E/(E+D)) × Ke + (D/(E+D)) × Kd × (1-T). Missing the tax shield overstates the discount rate, which understates the present value of future cash flows, potentially mispricing the deal.",
source: "Lesson 5: LaTeX Verification"
},
{
question: "Which four complex formulas does IDFA mandate must always undergo LaTeX verification before being written to a model?",
options: [
"WACC, NPV, IRR, and DCF Terminal Value — because errors in these formulas are most common and most consequential in financial modelling",
"SUM, AVERAGE, VLOOKUP, and INDEX/MATCH — because these are the most frequently used Excel functions",
"Revenue, COGS, Gross Profit, and EBITDA — because these are the core financial metrics",
"Any formula with more than three cell references"
],
correctOption: 0,
explanation: "Lesson 5 identifies WACC, NPV, IRR, and DCF Terminal Value (Gordon Growth Model) as the four formulas where errors are most common and most consequential. Each has specific common errors: WACC (missing tax shield), NPV (period-0 adjustment), Terminal Value (not growing final FCF by (1+g)), and IRR (verified by confirming NPV=0 at computed IRR).",
source: "Lesson 5: LaTeX Verification"
},
{
question: "When using Excel's NPV() function, a common error occurs at period 0. What is it, and how does IDFA handle it?",
options: [
"Excel's NPV() assumes cash flows start at period 1, so the initial investment at period 0 must be subtracted separately: NPV_Result = NPV(Discount_Rate, CF_Y1...CF_Y5) - Inp_Initial_Investment",
"Excel's NPV() includes period 0 automatically, so no adjustment is needed",
"The error is that NPV() cannot handle negative cash flows",
"Excel's NPV() uses a different discount rate formula than the standard financial definition"
],
correctOption: 0,
explanation: "Lesson 5 specifically calls out this common NPV error. Excel's NPV() function assumes all cash flows begin at period 1, but the initial investment typically occurs at period 0. The IDFA formula makes this explicit with Named Ranges: NPV_Result = NPV(Inp_Discount_Rate, CF_Y1, CF_Y2, ...) - Inp_Initial_Investment.",
source: "Lesson 5: LaTeX Verification"
},
{
question: "An Intent Note has five fields. A colleague's Intent Note reads: 'INTENT: Calculate Year 2 Revenue. FORMULA: Revenue_Y2 = Revenue_Y1 \* (1 + Inp_Rev_Growth). ASSUMPTIONS: Revenue_Y1, Inp_Rev_Growth.' What two fields are missing?",
options: [
"GENERATED (date/session identifier) and MODIFIED (date and modifier for each change) — these are required for the audit trail to track when formulas were created and last updated",
"AUTHOR (who wrote it) and APPROVED (who signed off) — these are governance fields",
"CONFIDENCE (how certain the formula is) and RISK (potential error impact)",
"VERSION (which model version) and SCOPE (which business unit)"
],
correctOption: 0,
explanation: "Lesson 6 specifies the five Intent Note fields: INTENT, FORMULA, ASSUMPTIONS, GENERATED, and MODIFIED. The GENERATED field records when the formula was created (date/session identifier), and the MODIFIED field is updated on each change. Together they create the temporal audit trail — auditors can see when a formula was written and every time it was changed.",
source: "Lesson 6: Intent Notes"
},
{
question: "Why does IDFA require Intent Notes specifically on AI-generated formulas rather than all formulas?",
options: [
"Because AI-generated formulas have no human author who can explain the reasoning later — the Intent Note preserves the business logic that would otherwise exist only in the AI session that created it",
"Because human-written formulas never contain errors",
"Because regulatory requirements only apply to AI-generated content",
"Because Intent Notes slow down manual formula writing too much"
],
correctOption: 0,
explanation: "Lesson 6 explains that Intent Notes solve the institutional memory problem for AI-generated work. When a human writes a formula, that person can (in theory) explain it later. When an AI generates a formula in a session, the session ends and the reasoning disappears. The Intent Note captures the business intent at generation time, making the formula self-documenting regardless of whether its author is a human or an agent.",
source: "Lesson 6: Intent Notes"
},
{
question: "A financial analyst asks Claude: 'What is Year 3 Gross Profit if I change Year 1 Revenue to $12M?' Claude responds: 'Year 3 Gross Profit would be approximately $6,098,400.' According to IDFA's Guardrail 4, what is wrong with this response?",
options: [
"The agent calculated the answer internally instead of using write_cell() to set the assumption and read_cell() to retrieve the model's deterministic output — 'approximately' indicates estimation, not model calculation",
"The agent should have asked permission before changing any assumptions",
"The answer is mathematically incorrect",
"The agent should have shown the full calculation steps"
],
correctOption: 0,
explanation: "Lesson 7 (Guardrail 4: MCP Dependency) prohibits agents from performing calculations internally. The word 'approximately' is the tell — it means the agent estimated rather than reading from the model. The correct workflow: write_cell('Inp_Rev_Y1', 12000000) → Excel calculates → read_cell('Gross_Profit_Y3') → report the exact deterministic result. Internal calculation and model calculation can produce different results; only the model result is audit-valid.",
source: "Lesson 7: MCP Dependency"
},
{
question: "The Excel MCP Server has four core tools. Which tool would you use to get a complete picture of all Named Ranges, their current values, and how they depend on each other?",
options: [
"inspect_model() — it lists all Named Ranges, values, and dependencies, providing a complete map of the model's structure",
"read_cell() called on every Named Range one at a time",
"read_formula() called on every Named Range one at a time",
"write_cell() with a special diagnostic flag"
],
correctOption: 0,
explanation: "Lesson 7 introduces the four Excel MCP Server tools: write_cell(name, value), read_cell(name), inspect_model(), and read_formula(name). The inspect_model() tool produces a comprehensive view of the entire model — all Named Ranges, their current values, and the dependency map showing which ranges feed into which others. This is the starting point for auditing, retrofitting, and Logic De-compilation.",
source: "Lesson 7: MCP Dependency"
},
{
question: "During goal-seeking, the agent needs to find the Year 1 Revenue required for Year 3 EBITDA to equal exactly $3M. What is the correct MCP workflow?",
options: [
"Iterate write_cell('Inp_Rev_Y1', value) → read_cell('EBITDA_Y3') repeatedly, adjusting the input value each iteration until EBITDA_Y3 equals $3M, then report the final Inp_Rev_Y1 value from the model",
"Calculate the required revenue algebraically using the model's formulas, then write the result",
"Use Excel's built-in Goal Seek function directly",
"Read all formulas, build an equation, solve it, and report the answer"
],
correctOption: 0,
explanation: "Lesson 7 defines goal-seeking as iterative MCP execution: the agent writes a trial value for the input assumption, reads back the output, checks if it matches the target, and adjusts. The agent must never solve the equation internally — iteration through the model ensures the result accounts for all dependencies, rounding, and non-linear relationships that algebraic solving might miss.",
source: "Lesson 7: MCP Dependency"
},
{
question: "When retrofitting an existing coordinate-based model to IDFA compliance, what is the critical principle that governs the entire process?",
options: [
"Do not change business logic during a retrofit — the objective is transparency, not improvement. Improvements happen after the logic is readable.",
"Replace all formulas simultaneously to avoid dependency conflicts",
"Start with the most complex formulas first since they benefit most from Named Ranges",
"Delete the original model and rebuild from scratch using IDFA methodology"
],
correctOption: 0,
explanation: "Lesson 8 emphasises that a retrofit is a transparency exercise, not an improvement exercise. If the original model calculates Year 2 Revenue incorrectly, the retrofitted version should calculate it incorrectly in the same way — the error is documented and fixed separately. Changing logic during retrofit means you cannot validate that the conversion was correct, because you have two variables changing at once.",
source: "Lesson 8: Retrofitting Existing Models"
},
{
question: "The retrofitting process has five phases. What is the correct sequence?",
options: [
"Full Inspection → Input Identification → Dependency Ordering → Formula Rewriting → Validation",
"Input Identification → Formula Rewriting → Validation → Full Inspection → Dependency Ordering",
"Formula Rewriting → Validation → Input Identification → Full Inspection → Dependency Ordering",
"Full Inspection → Formula Rewriting → Input Identification → Validation → Dependency Ordering"
],
correctOption: 0,
explanation: "Lesson 8 defines the five phases in strict order. Full Inspection (inspect_model()) comes first to understand the model. Input Identification distinguishes inputs from calculations. Dependency Ordering establishes the rewrite sequence — you must rewrite dependencies before dependents. Formula Rewriting converts each formula to Named Range form with LaTeX verification and Intent Notes. Validation confirms outputs match pre-retrofit values.",
source: "Lesson 8: Retrofitting Existing Models"
},
{
question: "During Phase 3 (Dependency Ordering) of a retrofit, why must you establish which calculations depend on which inputs before rewriting any formulas?",
options: [
"Because rewriting a dependent formula before its dependencies are converted would create a formula that references both Named Ranges and cell coordinates, producing inconsistent behaviour during the transition",
"Because Excel requires Named Ranges to be defined in alphabetical order",
"Because dependency ordering makes the model calculate faster",
"Because it is easier to rewrite formulas in alphabetical order"
],
correctOption: 0,
explanation: "Lesson 8 explains that dependency ordering prevents transitional errors. If Formula A depends on Formula B, and you rewrite A first using Named Ranges while B still uses coordinates, A will reference a Named Range that does not yet exist. The correct sequence: rewrite inputs first, then formulas that depend only on inputs, then formulas that depend on other formulas — always bottom-up in the dependency tree.",
source: "Lesson 8: Retrofitting Existing Models"
},
{
question: "After retrofitting, the Validation phase reveals that one output differs from the pre-retrofit value. What are the two possible explanations, and how should each be handled?",
options: [
"Either the original model had an error (surfaced by the retrofit — document and discuss with analyst) or the retrofitted formula has an inference error (correct the IDFA formula and re-validate)",
"Either Excel has a rounding error (ignore it) or the Named Range was misspelled (fix the name)",
"Either the model needs recalculation (press F9) or a circular reference was introduced (remove it)",
"Either the data changed during retrofit (lock the file) or the Named Range points to the wrong cell (reassign it)"
],
correctOption: 0,
explanation: "Lesson 8 specifies exactly two explanations for post-retrofit discrepancies: (1) a formula error in the original model that was invisible in coordinate form but surfaced when the business logic was made readable, or (2) an inference error in the retrofitted formula. The first is documented and discussed — the retrofit revealed a bug. The second is corrected and re-validated.",
source: "Lesson 8: Retrofitting Existing Models"
},
{
question: "The IDFA SKILL.md follows the agentskills.io standard. A team wants to use the same IDFA methodology across Claude Code, GitHub Copilot, and VS Code. What makes this possible?",
options: [
"The SKILL.md is a portable text file that any skills-compatible agent can read — install it once in each agent's custom instructions path and the agent applies IDFA methodology automatically",
"Each agent platform requires a completely different implementation of IDFA",
"The IDFA methodology only works with Claude and cannot be used with other agents",
"A special API integration must be built for each agent platform"
],
correctOption: 0,
explanation: "Lesson 9 teaches that the IDFA methodology is packaged as a portable plugin (panaversity/idfa-financial-architect) following the agentskills.io open standard. For Claude Code, add the marketplace and install the plugin. For Cowork, install via the plugin browser. For other agents — GitHub Copilot, VS Code, Codex — copy the SKILL.md from the plugin repo into the platform's custom instructions path. The skill transforms agent behaviour — when active, the agent automatically applies all four guardrails.",
source: "Lesson 9: The IDFA Skill"
},
{
question: "The IDFA SKILL.md includes an Agent Decision Table. When a user says 'I inherited this model', what should the agent do according to the table?",
options: [
"Offer to audit for IDFA compliance → identify coordinate-reference violations → propose a retrofitting sequence using the five-phase process",
"Delete the model and start fresh with IDFA methodology",
"Ask the user to explain every formula before proceeding",
"Run all five capability tests immediately"
],
correctOption: 0,
explanation: "Lesson 9 includes the Agent Decision Table and Trigger Phrases from the SKILL.md. 'I inherited this model' triggers the audit-and-retrofit pathway: the agent offers to inspect the model for IDFA compliance, identifies which formulas use coordinate references, and proposes a conversion sequence following the five-phase retrofitting process from Lesson 8.",
source: "Lesson 9: The IDFA Skill"
},
{
question: "A user says to Claude (with IDFA skill installed): 'What if revenue growth drops to 5%?' According to the Agent Decision Table, what sequence of actions should the agent follow?",
options: [
"write_cell() to set the new assumption → read_cell() to retrieve affected outputs → report the deterministic results without any internal calculation",
"Calculate the impact mentally and report the estimate immediately",
"Ask the user to change the cell manually and then read the results",
"Run a Monte Carlo simulation with 500 iterations"
],
correctOption: 0,
explanation: "Lesson 9's Agent Decision Table maps 'What if [assumption] changes?' to the MCP workflow: write_cell() for the assumption change, read_cell() for each affected output, and report results without internal calculation. This is Guardrail 4 (MCP Dependency) in action — the agent reasons about what to change, but Excel performs all arithmetic.",
source: "Lesson 9: The IDFA Skill"
},
{
question: "Enterprise governance requires four artefacts. Which artefact governs how AI agents interact with IDFA-compliant models?",
options: [
"The Finance Domain Agent Standards Policy — it mandates MCP Dependency for all agent interactions, requires Controller sign-off for Named Range modifications, and sets 90-day minimum retention for agent session logs",
"The IDFA Standards Document — it specifies naming conventions and layer rules",
"The Model Registry — it tracks all IDFA-compliant models in the organisation",
"The Validation Protocol — it defines the tests a model must pass before board-level use"
],
correctOption: 0,
explanation: "Lesson 10 defines four governance artefacts. The Finance Domain Agent Standards Policy specifically governs AI agent behaviour: MCP Dependency is mandatory, agents cannot modify Named Range definitions without Controller sign-off, all agent-generated formulas require LaTeX verification and Intent Notes before production, and session logs are retained for 90 days minimum.",
source: "Lesson 10: Enterprise Governance"
},
{
question: "The Model Registry requires tracking an 'Intent Note coverage %' metric. How is this calculated?",
options: [
"Number of AI-generated formulas with Intent Notes divided by total AI-generated formulas — it measures what percentage of agent-created formulas have documented business intent",
"Number of Named Ranges with notes divided by total Named Ranges",
"Number of cells with comments divided by total cells in the model",
"Number of LaTeX-verified formulas divided by total formulas"
],
correctOption: 0,
explanation: "Lesson 10 specifies that the Model Registry tracks Intent Note coverage % as: AI-generated formulas with Intent Notes / total AI-generated formulas. This metric is reviewed quarterly by the Controller and indicates the completeness of the audit trail for agent-assisted work. A model with 100% coverage means every AI-generated formula has its business intent documented.",
source: "Lesson 10: Enterprise Governance"
},
{
question: "A multi-domain financial institution has models used by both Investment Banking and FP&A teams. The IB team uses IB_EV_Entry while FP&A uses FP_Budget_Rev_Y1. What IDFA feature enables this without naming conflicts?",
options: [
"Sector-specific naming extensions — optional domain prefixes (IB*, PE*, FP*, TR*, CR*) that prevent variable collisions in multi-domain models",
"Separate Named Range namespaces per Excel sheet",
"Different IDFA Standards Documents for each department",
"A centralised naming authority that assigns prefixes"
],
correctOption: 0,
explanation: "Lesson 10 introduces sector-specific naming extensions from the IDFA reference guide. Five domain prefixes are defined: IB* (Investment Banking), PE* (Private Equity), FP* (FP&A/Corporate), TR* (Treasury), and CR* (Credit/Risk). These are optional but recommended for organisations where multiple domains share models, preventing variable name collisions.",
source: "Lesson 10: Enterprise Governance"
},
{
question: "Before a financial model can be used in a board-level or regulator-facing context, the Validation Protocol requires it to pass four checks. Which of the following is NOT one of those checks?",
options: [
"All formulas must produce results within 5% of industry benchmarks",
"All Calculation layer formulas use Named Ranges with zero coordinate references",
"All complex formulas have LaTeX verification documented",
"All AI-generated formulas have Intent Notes"
],
correctOption: 0,
explanation: "Lesson 10 lists the four Validation Protocol checks: (1) all Calculation layer formulas use Named Ranges, (2) all complex formulas have LaTeX verification, (3) all AI-generated formulas have Intent Notes, and (4) the model produces correct outputs on standard test inputs. Industry benchmarks are not part of IDFA validation — IDFA validates structure and transparency, not financial assumptions.",
source: "Lesson 10: Enterprise Governance"
},
{
question: "Capability 1 (Intent Synthesis) tests whether an agent can convert a plain-English Intent Statement into a complete IDFA model specification. What are the pass criteria?",
options: [
"Zero coordinate references in proposed formulas, all inputs prefixed with Inp*, and all calculations readable as plain-English business rules",
"The model produces correct numerical outputs when implemented",
"The agent completes the specification in under 60 seconds",
"The specification matches an existing template exactly"
],
correctOption: 0,
explanation: "Lesson 11 defines Intent Synthesis pass criteria: the agent must produce a specification with zero coordinate references, all inputs using the Inp\_ prefix, and every calculation formula readable as a plain-English business rule. The test validates that the agent can transform unstructured intent into structured IDFA architecture before any Excel implementation begins.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "Capability 2 (Deterministic What-If) has a specific pass criterion that distinguishes it from ordinary what-if analysis. What is it?",
options: [
"The agent must use write_cell() → read_cell() for every result — no instance of the agent reporting a number before reading it from the model via MCP",
"The what-if results must be within 1% of the original values",
"The agent must complete the analysis in a single MCP call",
"The agent must show the mathematical derivation of each changed value"
],
correctOption: 0,
explanation: "Lesson 11 defines the Deterministic What-If pass criterion: the agent uses write_cell()/read_cell() sequence for every result, with no instance of reporting a number before reading it from the model. The test is designed to catch agents that perform internal arithmetic — the reported answer and the MCP-verified answer must match exactly, not approximately.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "Capability 3 (Logic De-compilation) tests whether an agent can reconstruct business logic from an unfamiliar model. What accuracy threshold must be met?",
options: [
"Fewer than 5% of identified business rules are incorrect or missing, with all discrepancies explained as either ambiguity in the original or agent inference error",
"100% of business rules must be correctly identified with zero errors",
"The agent must identify at least 50% of the business rules correctly",
"The accuracy threshold depends on the complexity of the model"
],
correctOption: 0,
explanation: "Lesson 11 sets the Logic De-compilation pass criterion at fewer than 5% of identified business rules being incorrect or missing. Importantly, all discrepancies must be explained — categorised as either ambiguity in the original model (which is the model's fault) or agent inference error (which is the agent's fault). This distinction matters for validating IDFA deployment readiness.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "Capability 4 (Strategic Goal-Seeking) requires finding a specific input value to achieve a target output. Why must the agent iterate via MCP rather than solve algebraically?",
options: [
"Because iteration through the model accounts for all dependencies, rounding, and non-linear relationships that algebraic solving might miss — and the final value comes from the model, not from the agent's calculation",
"Because Excel does not support algebraic solving",
"Because iteration is faster than algebraic solving for financial models",
"Because regulatory requirements mandate iterative methods"
],
correctOption: 0,
explanation: "Lesson 11 explains that MCP iteration ensures the result accounts for the full model behaviour — non-linear relationships, rounding, and complex dependencies that algebraic solving would need to enumerate perfectly. More importantly, the final read_cell() confirms the output equals the target, providing model-verified proof rather than agent-calculated estimation.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "Capability 5 (Stochastic Simulation) requires 500 Monte Carlo iterations. Why must each iteration go through MCP rather than being simulated internally by the agent?",
options: [
"Because each iteration must use write_cell() to set random assumptions and read_cell() to collect the deterministic model output — internal simulation would bypass the model's actual calculation logic and produce results that are not audit-valid",
"Because 500 internal calculations would exceed the agent's processing capacity",
"Because MCP iterations are faster than internal calculations",
"Because Excel has built-in Monte Carlo support that the agent must use"
],
correctOption: 0,
explanation: "Lesson 11 explains that Stochastic Simulation must go through MCP for the same reason all IDFA calculations do: the model is the source of mathematical truth, not the agent. Each of the 500 iterations writes random assumption values via write_cell(), lets Excel calculate deterministically, and reads back via read_cell(). The distribution statistics (mean, median, P10, P90) are calculated from collected model results, not from internal simulation.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "The GP Waterfall worked example uses four input assumptions. What are they?",
options: [
"Inp_Rev_Y1 ($10M), Inp_Rev_Growth (10%), Inp_COGS_Pct_Y1 (60%), and Inp_COGS_Efficiency (1% improvement per year)",
"Revenue_Y1, Revenue_Y2, Revenue_Y3, and COGS_Total",
"Inp_Revenue, Inp_Costs, Inp_Growth, and Inp_Margin",
"Year_1_Sales, Year_2_Sales, Year_3_Sales, and Cost_Ratio"
],
correctOption: 0,
explanation: "The GP Waterfall intent statement ('Project a 3-year GP Waterfall. Year 1 Revenue is $10M, growing 10% YoY. COGS starts at 60% of Revenue but improves by 1% each year due to scale.') produces four Named Range inputs: Inp_Rev_Y1 = 10,000,000, Inp_Rev_Growth = 0.10, Inp_COGS_Pct_Y1 = 0.60, and Inp_COGS_Efficiency = 0.01.",
source: "Lessons 3-4: The Three Layers and Named Range Priority"
},
{
question: "In the GP Waterfall, Revenue_Y2 is calculated as Revenue_Y1 * (1 + Inp*Rev_Growth). If Inp_Rev_Y1 = $10M and Inp_Rev_Growth = 0.10, what is Revenue_Y3?",
options: [
"$12,100,000 — Revenue_Y2 is $11M, and Revenue_Y3 = $11M * (1 + 0.10) = $12,100,000",
"$13,000,000 — each year adds $1M",
"$13,310,000 — growth compounds at 10% on the original $10M",
"$11,000,000 — only one year of growth is applied"
],
correctOption: 0,
explanation: "Revenue compounds: Y1 = $10M, Y2 = $10M × 1.10 = $11M, Y3 = $11M × 1.10 = $12.1M. The IDFA formula Revenue*Y3 = Revenue_Y2 * (1 + Inp*Rev_Growth) makes the compounding explicit — each year builds on the previous year's revenue, not the original.",
source: "Lessons 3-4: The Three Layers and Named Range Priority"
},
{
question: "A model uses the formula Revenue_Y2 = Revenue_Y1 * (1 + Inp_Rev_Growth). The LaTeX verification would express this as which mathematical notation?",
options: [
"R₂ = R₁ × (1 + g) — confirming it is a standard compound growth formula where each year builds on the previous year",
"R₂ = R₀ + g — confirming it is a linear growth formula",
"R₂ = R₁ᵍ — confirming it is an exponential growth formula",
"R₂ = R₁ / (1 + g) — confirming it is a discounting formula"
],
correctOption: 0,
explanation: "Lesson 5 shows LaTeX verification for the GP Waterfall revenue formula: Rₙ = Rₙ₋₁ × (1 + g). This confirms the formula implements compound growth where each year multiplies the previous year by (1 + growth rate). LaTeX makes the mathematical structure visible, catching errors like accidentally using additive growth (R₁ + g) instead of multiplicative growth.",
source: "Lesson 5: LaTeX Verification"
},
{
question: "The Terminal Value formula (Gordon Growth Model) has a common error. What is it?",
options: [
"Using the final projection year's FCF directly without growing it by (1+g) to get the first terminal period FCF — the correct formula is TV = FCF_n × (1+g) / (WACC - g)",
"Forgetting to subtract the initial investment from the terminal value",
"Using the wrong discount rate (cost of equity instead of WACC)",
"Not accounting for inflation in the growth rate"
],
correctOption: 0,
explanation: "Lesson 5 identifies the most common Terminal Value error: using FCF_Final directly instead of FCF_Final × (1+g). The Gordon Growth Model values the cash flows starting one period AFTER the final projection year, so the final year FCF must be grown by the terminal growth rate to get the first terminal period cash flow. The IDFA formula makes this explicit: Terminal_Value = (FCF_Final \* (1 + Inp_Terminal_Growth)) / (WACC - Inp_Terminal_Growth).",
source: "Lesson 5: LaTeX Verification"
},
{
question: "IRR cannot be expressed in closed-form LaTeX. How does IDFA verify an IRR calculation?",
options: [
"By confirming that NPV equals zero at the computed IRR: IRR_Validation = NPV(IRR_Result, CF_Y1...CF_Y5) + CF_Y0 should equal 0",
"By comparing the IRR to WACC — if IRR > WACC, the formula is correct",
"By running the IRR calculation three times and averaging",
"IRR does not require verification under IDFA"
],
correctOption: 0,
explanation: "Lesson 5 explains that since IRR is an iterative function with no closed-form solution, it cannot be verified directly in LaTeX. Instead, IDFA verifies IRR by checking the defining property: NPV should equal zero at the computed IRR rate. The validation formula: IRR_Validation = NPV(IRR_Result, CF_Y1...CF_Y5) + CF_Y0, which should equal 0 (within floating point tolerance).",
source: "Lesson 5: LaTeX Verification"
},
{
question: "An Intent Note records 'MODIFIED: 2026-02-15 / J. Smith — Updated COGS efficiency from 1% to 1.5% per management guidance'. Six months later, a different analyst changes the efficiency to 2% but does not update the MODIFIED field. What has been lost?",
options: [
"The audit trail is broken — future reviewers will see J. Smith's 1.5% as the last documented change, not knowing the formula now reflects a different assumption. The divergence between the Intent Note and the formula is invisible.",
"Nothing — the formula still calculates correctly regardless of the Intent Note",
"Only the formatting is affected — the numbers are still accurate",
"The Named Range definition is corrupted and the formula will error"
],
correctOption: 0,
explanation: "Lesson 6 explains that Intent Notes are the audit trail. When a formula and its Intent Note diverge, that divergence should be visible — it is the signal that something changed. But when the MODIFIED field is not updated, the divergence becomes invisible. An auditor reviewing the model sees documentation that says 1.5% while the formula uses 2%, with no record of when or why the change happened.",
source: "Lesson 6: Intent Notes"
},
{
question: "The IDFA methodology is described as 'Panaversity original research.' What broader design principle does it apply to the specific domain of financial modelling?",
options: [
"Spec-driven, logic-first design — defining WHAT a formula means (business intent) rather than WHERE it lives (cell coordinates), the same principle that underlies the Agent Factory methodology throughout the book",
"Machine learning optimisation of spreadsheet formulas",
"Automated code generation from natural language",
"Cloud-based financial model hosting"
],
correctOption: 0,
explanation: "IDFA translates the broader principles of spec-driven, logic-first design — central to the Agent Factory methodology — into a concrete, deployable architecture for financial modelling. Just as specifications define intent before implementation in software, IDFA ensures formulas express business rules (what) rather than cell locations (where). This is what the chapter's epigraph means: 'The model is in the analyst's head. The tragedy is that the model never leaves.'",
source: "Chapter 18 Overview and Lesson 1"
},
{
question: "A team has been using IDFA for six months. They want to validate their deployment. Which of the five capabilities should they test FIRST to establish baseline compliance?",
options: [
"Capability 2 (Deterministic What-If) — because it tests the most fundamental IDFA requirement: that the agent uses MCP for all calculations rather than performing arithmetic internally",
"Capability 5 (Stochastic Simulation) — because it is the most complex test",
"Capability 1 (Intent Synthesis) — because it is listed first",
"Capability 3 (Logic De-compilation) — because it tests understanding of existing models"
],
correctOption: 0,
explanation: "Deterministic What-If tests the core IDFA contract: agent reasoning + model calculation. If this fails (agent performs internal arithmetic), all other capabilities are unreliable because results are not model-verified. Intent Synthesis tests specification quality, Logic De-compilation tests comprehension, Goal-Seeking tests iteration, and Stochastic Simulation tests scale — but all depend on the agent correctly using MCP rather than calculating internally.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "An analyst runs a What-If test (Capability 2). The agent reports Year 3 Gross Profit as $5,082,000. The analyst then asks the agent to verify by reading the cell directly. The agent reads back $5,082,000. Does this pass the Deterministic What-If test?",
options: [
"Only if the agent used write_cell() → read_cell() for the original answer too — if the agent calculated $5,082,000 internally and it happened to match, the methodology still failed even though the number is correct",
"Yes — the numbers match, so the test passes regardless of method",
"No — the numbers should never match exactly due to rounding",
"It depends on whether the model uses circular references"
],
correctOption: 0,
explanation: "Lesson 11 emphasises that Capability 2 tests the METHOD, not just the RESULT. An agent that calculates internally and happens to get the right answer has still violated Guardrail 4. The pass criterion requires that 'no instance of the agent reporting a number before reading it from the model' — the workflow must be write_cell() → read_cell() → report. Correct results from incorrect methods are not IDFA-compliant.",
source: "Lesson 11: The Five Capabilities"
},
{
question: "IDFA's naming convention uses underscores only. An analyst creates a Named Range called 'Inp Rev Y1' with spaces. What will happen?",
options: [
"Excel allows display names with spaces but formula references require underscores — the Named Range will not work correctly in formulas, creating errors that may not be immediately obvious",
"Excel will automatically convert spaces to underscores",
"The Named Range will work identically to one with underscores",
"Excel will reject the name and display an error message"
],
correctOption: 0,
explanation: "The IDFA SKILL.md (Lesson 9) includes this as one of five Common Mistakes: 'Never name a range with spaces. Excel allows display names with spaces but formula references require underscores. Use Inp_Rev_Y1 not Inp Rev Y1.' This can create subtle errors where the Named Range appears to exist but does not resolve correctly in formulas.",
source: "Lesson 9: The IDFA Skill (Common Mistakes)"
},
{
question: "A financial model passes all four IDFA guardrails but fails Capability 3 (Logic De-compilation) — the agent cannot reconstruct business logic from the Calculations layer alone. What is the most likely cause?",
options: [
"The Named Range names are technically compliant but do not clearly communicate business meaning — for example, using Calc_A instead of Revenue_Y2 makes formulas valid but not self-explaining",
"The model has too many formulas for the agent to process",
"The model uses circular references that confuse the agent",
"The Assumptions sheet is hidden, preventing the agent from reading inputs"
],
correctOption: 0,
explanation: "Logic De-compilation requires the agent to reconstruct business rules from formula names alone. If names are technically compliant (no coordinates, proper prefixes) but semantically opaque (Calc_A, Calc_B instead of Revenue_Y2, COGS_Y2), the agent can read the formulas but cannot infer their business purpose. This is why IDFA's naming conventions emphasise readable names — compliance is necessary but not sufficient; readability is the goal.",
source: "Lessons 4 and 11: Named Range Priority and The Five Capabilities"
},
{
question: "A CFO asks: 'What is the ROI of adopting IDFA across our finance team?' Based on Chapter 18, which four business outcomes would you cite?",
options: [
"Audit duration compresses (weeks to days), analyst onboarding time drops, regulatory confidence increases, and institutional memory compounds over time as Intent Notes accumulate",
"Model calculation speed improves, Excel file sizes decrease, fewer licenses are needed, and printing costs drop",
"Agent subscription costs decrease, fewer analysts are needed, meetings are shorter, and email volume drops",
"IT infrastructure costs drop, cloud storage is reduced, API calls decrease, and bandwidth usage falls"
],
correctOption: 0,
explanation: "Lesson 10 frames IDFA governance benefits at the CFO level: audit compression (Named Ranges make formula logic visible without manual tracing), onboarding reduction (new analysts read Named Ranges without walkthroughs), regulatory confidence (Validation Protocol and Intent Notes create verifiable audit trails), and institutional memory (Intent Notes accumulate organisational knowledge that survives staff turnover).",
source: "Lesson 10: Enterprise Governance"
},
{
question: "Chapter 17 taught Claude in Excel and Cowork plugins. Chapter 18 teaches IDFA. What is the relationship between them?",
options: [
"IDFA transforms the FOUNDATION those tools operate on — the same Claude in Excel gives categorically different results when the model underneath uses Named Range business rules instead of coordinate formulas",
"IDFA replaces the tools from Chapter 17 with a new methodology",
"IDFA is an alternative to using Claude in Excel",
"IDFA requires different MCP connectors than those configured in Chapter 17"
],
correctOption: 0,
explanation: "The Chapter 18 README and bridge text from Chapter 17 establish that IDFA does not replace the tools — it transforms the architecture they work on. The same Claude in Excel, the same MCP connectors, the same Cowork plugins. But when the model uses Named Ranges instead of coordinates, those tools can perform Intent Synthesis, Deterministic What-If, Logic De-compilation, Goal-Seeking, and Stochastic Simulation — capabilities impossible with coordinate-based models.",
source: "Chapter 18 README and Lesson 2"
},
{
question: "Which statement best captures IDFA's core principle?",
options: [
"Define WHAT, not WHERE — a formula that reads =Revenue_Y3 - COGS_Y3 is a business rule; a formula that reads =D8-C8 is a coordinate. IDFA ensures every formula is the first kind.",
"Automate everything — remove human judgment from financial modelling",
"Use AI to replace Excel with a better calculation engine",
"Move all financial models to cloud-based platforms"
],
correctOption: 0,
explanation: "The IDFA SKILL.md opens with this core principle: 'Define WHAT, not WHERE.' A formula that reads =Revenue_Y3 - COGS_Y3 is a business rule that survives every model change, explains itself to any reader, and enables every Finance Domain Agent capability. A formula that reads =D8-C8 is a coordinate that does none of those things. IDFA exists to ensure every formula in every model is the first kind.",
source: "Lesson 9: The IDFA Skill (Core Principle)"
}
]}
/>
