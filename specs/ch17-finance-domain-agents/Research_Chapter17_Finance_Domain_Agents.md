# Chapter 17: Finance Domain Agents

---

*"Excel is not a spreadsheet application. It is the operating system of the financial profession. Everything else — the presentations, the memos, the reports — is built from what lives in a spreadsheet first."*

---

## Why Excel Comes First — And Why It Reveals Something Important

Every chapter in Part 3 begins with the platform. This chapter begins with a distinction.

Finance is the domain where a single application — Excel — sits at the centre of almost everything professionals do. The corporate controller reconciles accounts in Excel. The investment banker builds deal models in Excel. The equity research analyst updates earnings forecasts in Excel. The FP&A manager presents variance analysis to the board from a PowerPoint deck built from an Excel model. If you work in finance, accounting, treasury, or investment management, Excel is the medium through which your professional judgment is expressed.

Anthropic offers two completely different ways to bring Claude's intelligence into your Excel workflow. They have different architectures, different access requirements, different use cases, and different names. Confusing them will cause real frustration — you will look for features in the wrong place, and you will miss capabilities that are actually available to you.

The distinction between these two is also an excellent illustration of a concept that runs through this entire book: the difference between an AI *assistant* embedded in a tool, and an AI *agent* orchestrating across tools. Excel is where this contrast becomes concrete and tangible, which is why it comes before everything else in this chapter.

---

> **🔑 THE CORE DISTINCTION: Assistant vs. Agent**
>
> **Claude in Excel** is an AI *assistant* embedded directly inside Microsoft Excel. It lives in a sidebar within your workbook. It reads your spreadsheet, helps you understand it, corrects errors, runs scenarios, and — through its six pre-built Agent Skills — generates professional financial models like DCF valuations and comparable company analyses, pulling live data from S&P Capital IQ, PitchBook, and Morningstar directly into your cells. It is a standalone Microsoft add-in. It does not require Cowork. It works within one application.
>
> **Cowork with Excel** involves Claude acting as an AI *agent* that orchestrates across multiple applications. Excel is one stop in a multi-step autonomous workflow. The agent can perform analysis in Excel, then carry that context forward and autonomously build a presentation in PowerPoint — without you switching applications or copying anything manually. This capability requires the Cowork platform and operates through finance plugins that bundle domain knowledge, data connectors, and workflow logic.
>
> The shorthand: Claude in Excel is a *deep companion* for financial modelling work. Cowork with Excel is a *workflow orchestrator* that treats Excel as one node in a larger automated process.

---

| | **Claude in Excel** | **Excel via Cowork** |
|---|---|---|
| **What it is** | Standalone Microsoft Excel add-in (sidebar) | Part of a broader agent/plugin ecosystem |
| **Architecture** | AI assistant embedded in one tool | AI agent orchestrating across tools |
| **Pre-built financial skills** | 6 Agent Skills: comps, DCF, due diligence packs, company teasers, earnings analyses, initiating coverage | Domain plugins (Finance, financial-services) with bundled skills and slash commands |
| **Market data connectors** | S&P Capital IQ, PitchBook, Morningstar | Daloopa, FactSet, Moody's, LSEG, S&P Global, PitchBook, Chronograph, Morningstar, MT Newswires, Aiera, Egnyte |
| **Cross-app capability** | Excel only | Excel ↔ PowerPoint orchestration (research preview) |
| **Who it's for** | Financial analysts doing modelling work directly in Excel | Enterprise teams running agent workflows across tools |
| **Access** | Beta/research preview: Max, Team, Enterprise | Team and Enterprise |
| **Requires Cowork?** | No | Yes |

This chapter is structured to teach both, in sequence. Part One covers Claude in Excel — the assistant embedded in the workbook, its general capabilities, and its six pre-built financial Agent Skills. Part Two covers the Cowork platform's Excel capabilities — the cross-app orchestration story and the finance plugins that power it. Part Three covers the enterprise extension roadmap.

Throughout, when a financial concept or accounting term appears, it is explained in a Concept Box before you are asked to use it. Every skill is taught by example. Each major section closes with a Practice Exercise.

Numbered exercises (1–14 plus a Final) run sequentially through Parts One and Three and are designed to be completed in order. The four financial-services sub-plugin exercises in Part Two (A: Investment Banking, B: Equity Research, C: Private Equity, D: Wealth Management) are lettered rather than numbered because they are modular — install and complete the ones that correspond to your professional context.

---

# Part One: Claude in Excel — The Embedded Assistant

---

## Getting Started

Claude in Excel is a Microsoft add-in that installs directly into your Excel ribbon. It is entirely separate from the Cowork platform and requires only a Claude subscription.

**Installation:** Go to the Microsoft AppSource marketplace at `marketplace.microsoft.com` and search for "Claude." Click Install. Alternatively navigate to `claude.com/claude-in-excel`. The add-in appears in Excel's ribbon under the **Claude** tab.

**Opening the panel:**
- **Mac:** Control + Option + C
- **Windows:** Control + Alt + C

A sidebar opens on the right side of your Excel window. This is where you type prompts and where Claude's responses appear. Critically, Claude's responses include *cell-level references* — when Claude tells you that revenue is driven by cell B12, clicking that reference in the sidebar navigates Excel directly to it. This cell-level transparency is one of the defining features of Claude in Excel: every action Claude takes is traceable, every change is documented in the panel.

**Plan requirement:** Available in beta/research preview for Claude Max, Team, and Enterprise subscribers.

**Supported formats:** `.xlsx` and `.xlsm`. File size limits apply by plan.

---

## What Claude in Excel Actually Does: Two Layers

Claude in Excel operates at two distinct layers, and understanding the difference helps you use it well.

**Layer 1: General workbook intelligence.** Claude reads the open workbook — all sheets, all formulas, all data — and applies general reasoning to answer questions about it, trace dependencies, test scenarios, debug errors, and build new model structures from plain-language descriptions. This layer requires no configuration and works on any workbook. It is always active.

**Layer 2: The six pre-built Agent Skills.** Claude in Excel ships with six specialist financial workflows built in — purpose-designed for investment banking, equity research, and financial analysis work. These Agent Skills go beyond general assistance: they connect to live market data terminals (S&P Capital IQ, PitchBook, Morningstar), pull real data directly into the workbook, and produce professionally structured financial deliverables that follow industry conventions. You invoke them explicitly.

The six Agent Skills are:
1. Comparable Company Analysis
2. Discounted Cash Flow Model
3. Due Diligence Data Pack
4. Company Teaser
5. Earnings Analysis
6. Initiating Coverage Report

We cover Layer 1 (general workbook intelligence) in Skills 1–4 below, then cover the six Agent Skills in Skills 5–10.

---

## Layer 1: General Workbook Intelligence

### Skill 1: Understanding a Workbook You Did Not Build

Every finance professional inherits models. A colleague leaves and you inherit their rolling forecast. A client sends a financial model for due diligence. An analyst who moved on built the comps template your team uses and nobody fully understands how it works. In each case, the model is functional — it calculates — but its internal logic is opaque to everyone in the building.

Traditional model comprehension requires manual, tedious work: tracing cell references tab by tab, following the formula chain, eventually discovering that the revenue projection in the P&L is driven by a volume assumption buried in a lookup table on Sheet 7 labelled "Assumptions (OLD)" that was never updated. For a complex model, this takes hours. It is also error-prone.

Claude in Excel compresses this process. You ask a question. Claude traces the full dependency chain and explains the logic in plain language with cell references you can verify.

---

> **📊 CONCEPT BOX: What Is a Financial Model?**
>
> A financial model is a spreadsheet that represents how a business or investment performs financially, built from inputs (assumptions) that drive calculated outputs (results). The key model types:
>
> **Three-statement model:** Links the income statement, balance sheet, and cash flow statement. A change in one flows automatically through the others.
>
> **DCF model:** Projects future cash flows and discounts them to today's value to estimate what a business is worth.
>
> **Comps model:** Compares a company to similar businesses using market-based multiples to estimate relative value.
>
> **LBO model:** Models the acquisition of a company using significant debt, projecting equity returns over a holding period.
>
> All models have **inputs** (blue cells by convention) and **outputs** (formula-calculated cells). Claude in Excel reads both.

---

#### Example: Inheriting a Model Four Hours Before a Board Call

You have just joined a company's FP&A team. Your predecessor left a five-tab Excel model. Nobody documented how it works. The CFO is asking why Q3 revenue shows a 6% variance against budget. The board call is in four hours.

Open the model. Open the Claude panel. Type:

**You:** "What drives the revenue figure in cell C15 on the P&L tab?"

**Claude:** "The revenue in C15 ($4,847K) is calculated as Unit Volume (Assumptions tab, D8: 12,450 units) multiplied by Average Selling Price (Assumptions tab, D12: $389.30). The unit volume comes from the Sales Forecast tab, cell G22, a SUMIF pulling from the regional breakdown in columns H through N. The selling price uses a VLOOKUP referencing the Price List tab, range A3:C47, matching on product code. The 6% variance against budget traces to the unit volume assumption: the budget was set using 13,200 units (Budget tab, D8), versus 12,450 units in the current forecast."

In under thirty seconds: the exact formula logic, the source cells for both inputs, the location of the volume assumption, and the specific cell driving the variance. No manual tracing. No opening Sheet 7.

**Follow-up:** "Which cells on the Assumptions tab do I need to change to model a scenario where unit volume recovers to 13,000 by month-end?"

**Claude:** "Update cell D8 on the Assumptions tab from 12,450 to 13,000. This flows through to: Sales Forecast G22 (via the SUMIF), P&L C15 (via the product formula), P&L C32 (gross profit), and Cash Flow D8 (via the linked net income line). No other cells require manual intervention."

---

#### Practice Exercise 1: Model Comprehension

**What you need:** Any multi-tab Excel workbook with formulas. A free three-statement template from Macabacus or Wall Street Prep works.

1. Find any calculated output cell and ask Claude: *"What drives the value in [cell]? Trace the full dependency chain."*
2. Navigate to each cell Claude references. Confirm they are correct.
3. Ask: *"If I wanted to change [one assumption], which cells would I update and what would flow automatically?"*
4. Ask: *"Is there any cell in this workbook that references [a source range] in an unexpected way?"*

**The discipline to build:** Always trace dependencies before touching anything. A change to a seemingly isolated cell can cascade through a large model in ways you cannot anticipate without mapping the chain first.

**Target time:** 20 minutes.

---

### Skill 2: Testing Scenarios Without Breaking Formulas

Finance professionals run scenarios constantly. What happens to company value if EBITDA margin drops 2 percentage points? What if the interest rate rises 50 basis points? What if both happen simultaneously?

Before Claude in Excel, you chose between overwriting the base case (fast but destructive) or building a scenario manager (correct but time-consuming). Claude in Excel offers a third option: describe the scenario, let Claude make the changes, review the output, and undo with Ctrl+Z to revert.

---

> **📊 CONCEPT BOX: What Is Sensitivity Analysis?**
>
> Sensitivity analysis tests how much an output (like company value) changes when you vary one or more inputs (like growth rate). It answers: *which assumptions matter most?*
>
> A **one-way table** varies one input across a range (e.g., EBITDA margin from 15% to 25%). A **two-way table** varies two inputs simultaneously (e.g., a grid of EBITDA margin × revenue growth combinations).
>
> Sensitivity analysis does not predict which scenario will occur. It shows which inputs your conclusion depends on most — so you know where to focus your analysis and how to present uncertainty honestly.

---

#### Example: The CFO's Downside Scenario

The CFO needs three scenarios for the budget review: revenue growth of 7% (versus 12% base), gross margin compression of 150 basis points, and a capex increase of $5M — all simultaneously.

**She types:** "Model a downside scenario: change revenue growth (B8) to 7%, reduce gross margin % (B14) by 1.5 percentage points from its current value, and increase Year 1 capex (C22) by 5. Tell me the impact on Year 3 free cash flow and the updated EBITDA for each year."

**Claude:** "Applied three changes: B8 to 7.0%, B14 to 36.7% (from 38.2%), C22 to $23.0M (from $18.0M).

**Year 3 Free Cash Flow (F35):** Reduced from $31.4M to $18.7M (−40.4%).

**EBITDA by year:** Year 1: $47.2M → $41.8M (−11.4%). Year 2: $54.6M → $46.9M (−14.1%). Year 3: $63.1M → $52.3M (−17.1%).

Only the three specified input cells were changed. All formula structures are intact."

She documents the results, then undoes with Ctrl+Z and tests the bull case.

---

> **📊 CONCEPT BOX: What Is a DCF (Discounted Cash Flow)?**
>
> A DCF estimates what a business is worth today based on the cash it will generate in the future. The core concept: $1 received in five years is worth less than $1 received today because today's $1 can be invested and grow.
>
> **Key components:** Free Cash Flow (the cash the business generates after operating costs and capex). Discount Rate, or WACC (the required return of investors — a higher rate produces a lower valuation). Terminal Value (the value of all cash flows beyond the projection period, usually 5–10 years).
>
> **Why sensitivity matters:** A DCF is highly sensitive to the discount rate. A 1 percentage point increase in WACC typically reduces the equity value by 10–20%. This is why every professional DCF includes a sensitivity table showing value at different WACC and terminal growth rate combinations. See the WACC Concept Box later in this chapter.

---

#### Practice Exercise 2: Scenario Testing

**What you need:** A financial model with input cells driving multiple outputs.

1. Identify three input cells: one revenue-related, one cost-related, one balance sheet.
2. Change one input via Claude and ask it to list every cell that changed as a result.
3. Count the downstream effects. Were any surprising?
4. Undo. Then run a two-input scenario simultaneously. Note how the combined impact differs from the sum of the individual impacts.

**The discipline to build:** Complex models have non-linear interactions. Two changes that each reduce profit by 10% do not combine for a 20% reduction — they compound. Claude shows you the actual combined impact.

**Target time:** 25 minutes.

---

### Skill 3: Debugging Formula Errors

Excel formula errors are among the most time-consuming problems in financial modelling. A `#REF!` in a summary cell can originate from a broken range reference three sheets away. A `#VALUE!` can come from a data type mismatch introduced when a number was accidentally formatted as text. Claude in Excel traces from symptom to source and explains both the cause and the fix.

---

> **📊 CONCEPT BOX: Common Excel Formula Errors**
>
> **#REF!** — A formula points to a cell or range that no longer exists. Usually caused by deleting rows/columns that were referenced, or by OFFSET formulas broken when the worksheet structure changed.
>
> **#VALUE!** — A formula tries to perform a mathematical operation on something that is not a number. Most common cause: a cell looks like a number but is formatted as text (left-aligned instead of right-aligned).
>
> **#DIV/0!** — Division by zero. Common in ratio calculations where a denominator is blank or zero in a forecast period.
>
> **#N/A** — A lookup formula (VLOOKUP, XLOOKUP, MATCH) cannot find the value it is searching for. Often a formatting mismatch between the lookup value and the lookup range.
>
> **Circular Reference** — A formula refers, directly or indirectly, to its own cell. Some advanced models deliberately use circular references (e.g., interest expense depending on debt, which depends on cash, which depends on profit) — but this must be enabled explicitly via iterative calculation settings and carefully documented.

---

#### Example: Tracing a #REF! Error

A valuation model that has worked correctly for three months suddenly shows `#REF!` in the DCF equity value cell after an analyst adds a new row to the assumptions section.

**He types:** "There is a #REF! error in cell F45 (DCF equity value). Trace the source."

**Claude:** "F45 traces back through F35 (Terminal Value) → F34 (Year 5 EBITDA) → Assumptions!C8. Cell Assumptions!C8 now returns #REF! — its formula is =OFFSET(C7, 1, 0), which was correct before the new row was inserted. Inserting a row above row 7 shifted the OFFSET reference to point to a row that now contains the new line item, not the EBITDA growth rate.

**Fix:** Update Assumptions!C8 to reference the EBITDA growth rate cell directly (the cell that now contains the rate after the row insertion), or adjust the OFFSET formula to account for the new row offset."

Fifteen minutes of manual tracing becomes thirty seconds.

#### Example: The Invisible Text-Number Problem

A controller's SUM formula returns $3,421 when manually adding the column gives $18,350.

**She types:** "The SUM in G42 should total G2:G41 but is returning $3,421 instead of approximately $18,350. What's happening?"

**Claude:** "7 cells (G8, G13, G17, G22, G25, G31, G38) contain numbers formatted as text — they are left-aligned, which is Excel's indicator. These 7 cells sum to $14,929. SUM ignores text-formatted values, explaining the $14,929 shortfall. Fix: select those 7 cells, go to Data → Text to Columns → Finish. This forces Excel to re-evaluate them as numbers. The text formatting likely came from a data import — accounting system exports frequently format numeric fields as text."

---

#### Practice Exercise 3: Error Diagnosis

**What you need:** A workbook with a formula error, or one you create by deleting a referenced column.

1. Ask Claude: *"There is a [error type] in [cell]. Trace the full chain back to the source."*
2. Before fixing it, predict: will other errors clear after this fix, or are there secondary errors?
3. Make the fix. Confirm.
4. Bonus: deliberately enter a text-formatted number (type `'1234`) in a cell feeding a SUM. Ask Claude why the sum is wrong.

**Target time:** 20 minutes.

---

### Skill 4: Building Model Structures from Description

Claude in Excel can draft a financial model structure — tabs, row labels, formula architecture, cell linkages — from a plain-language description. This is not automation of the analytical judgment. It is elimination of the structural setup work that precedes it.

---

> **📊 CONCEPT BOX: What Is EBITDA?**
>
> **EBITDA** = Earnings Before Interest, Tax, Depreciation and Amortisation. It measures operating profitability by stripping out financing decisions (interest), tax, and accounting policies for capital assets (D&A).
>
> **Formula:** Revenue − Cost of Goods Sold − Operating Expenses (excluding D&A)
>
> **Why it matters:** EBITDA is the basis for most enterprise valuation multiples. A company trading at "8× EBITDA" has an enterprise value eight times its annual EBITDA. If EBITDA is $50M, EV is $400M.
>
> **What EBITDA is not:** It ignores capital expenditure, working capital movements, and actual tax payments. A company with high EBITDA and high capex may generate very little actual free cash.

---

> **📊 CONCEPT BOX: The Three Financial Statements and How They Link**
>
> **Income Statement (P&L):** Revenue to net income over a period. Net income flows to the balance sheet (retained earnings) and starts the cash flow statement.
>
> **Balance Sheet:** Assets and liabilities at a point in time. Always balances: Total Assets = Total Liabilities + Equity. Cash balance comes from the cash flow statement.
>
> **Cash Flow Statement:** Reconciles net income (accounting profit) to actual cash. Starts with net income, adds non-cash items (depreciation), adjusts for working capital (receivables, inventory, payables), subtracts capex.
>
> **Integration test:** Change one revenue assumption. It should flow: higher revenue → higher net income (P&L) → higher retained earnings (balance sheet) → higher cash (cash flow statement → balance sheet). If the balance sheet does not balance after the change, there is a linkage error somewhere.

---

#### Practice Exercise 4: Build a Three-Statement Model

**What you need:** Claude in Excel open in a blank workbook.

**Part A — Commission the structure (25 min):** Type to Claude:

*"Build a two-year financial model for a small retail business: (1) Assumptions tab: revenue Year 1 $500,000, revenue growth 15%, gross margin 45%, operating expenses 30% of revenue, tax rate 20%, capex Year 1 $20,000 and Year 2 $15,000, depreciation rate 20% of opening fixed assets, debtor days 45. (2) P&L tab: revenue, COGS, gross profit, gross margin %, operating expenses, EBITDA, depreciation, EBIT, tax, net income. (3) Cash flow tab: net income, add back depreciation, change in debtors, capex, net cash flow, closing cash balance. Use blue cells for inputs, black for formulas."*

Review what Claude builds. Check: are formulas referencing the Assumptions tab? Does gross profit = revenue × gross margin? Does depreciation reduce EBIT correctly?

**Part B — Interrogate it (15 min):** Ask: *"What is gross margin % in Year 2?"* Then: *"If I increase the revenue growth rate to 20%, what happens to net income in Year 2?"* Then: *"How does the debtor days assumption affect the model?"*

**Part C — Break it deliberately (10 min):** Overtype one formula cell with a hard-coded number. Ask Claude: *"Is there any cell in this model that should be a formula but appears to be hard-coded?"*

**The discipline to build:** The quality of the model Claude builds is proportional to the specificity of your instruction. A vague prompt produces a vague model. A specific one — with named tabs, explicit line items, and stated linkage requirements — produces a working starting point.

**Target time:** 50 minutes.

---

## Layer 2: The Six Pre-Built Agent Skills

This is where Claude in Excel goes beyond general workbook intelligence into purpose-built financial analysis workflows. The six Agent Skills are pre-packaged analytical processes — each one knows the professional conventions for its deliverable type, connects to live market data, and produces output formatted the way financial professionals expect to see it.

---

> **🔑 CONCEPT BOX: What Is an Agent Skill in Claude in Excel?**
>
> An Agent Skill is a pre-built workflow that Claude in Excel invokes to perform a specific, structured financial task. Unlike general workbook assistance (where you describe what you want in free-form language), Agent Skills follow established professional templates — the DCF Skill knows how to build a three-stage DCF model; the Comps Skill knows to calculate median and quartile multiples and format them with professional colour-coding.
>
> Agent Skills also connect to live market data through Claude in Excel's built-in connectors:
> - **S&P Capital IQ** — financial statements, credit ratings, ownership data, transaction comps
> - **PitchBook** — private company data, venture and PE deal data, fund data
> - **Morningstar** — equity research, fund analysis, valuation data
>
> These connectors are Claude in Excel's own data integrations — different from the Cowork data connectors (FactSet, LSEG, Moody's, Daloopa, and others), which operate through the Cowork platform.

---

### Skill 5: Comparable Company Analysis

The Comps Agent Skill builds a complete comparable company analysis: peer group selection, LTM financial data pull from S&P Capital IQ, enterprise value calculation, multiple calculation (EV/EBITDA, EV/Revenue, P/E), median and quartile statistics, and a colour-coded Excel workbook following professional conventions.

---

> **📊 CONCEPT BOX: What Is a Comparable Company Analysis (Comps)?**
>
> Comps values a company by comparing it to similar public companies using market-based multiples. The logic: similar businesses should trade at similar multiples.
>
> **Common multiples:**
> - **EV/EBITDA:** Most widely used. Enterprise value divided by EBITDA. Capital-structure-neutral.
> - **P/E (Price-to-Earnings):** Share price divided by EPS. Simple but affected by leverage and tax.
> - **EV/Revenue:** Used for pre-profit or high-growth companies.
>
> **Process:** Identify 6–10 comparable companies. Calculate their current trading multiples. Find the median and range. Apply to your subject company's financials for an implied valuation range.
>
> **What comps does not capture:** Company-specific factors — management quality, competitive position, regulatory risk — that justify trading above or below peers. Comps is a market check, not a fundamental valuation.

---

> **📊 CONCEPT BOX: What Is Enterprise Value (EV)?**
>
> Enterprise value is what you would need to pay to acquire a company entirely, including both equity and debt.
>
> **Formula:** EV = Market Cap + Total Debt + Preferred Stock + Minority Interest − Cash
>
> **Why subtract cash?** You inherit the company's cash when you acquire it, which offsets part of the price. A company with $500M market cap, $200M debt, and $50M cash has an EV of $650M.
>
> **Example:** Company A has 100M shares at $8.50. Market cap = $850M. Debt = $150M. Cash = $30M. EV = $850M + $150M − $30M = $970M. With LTM EBITDA of $97M: EV/EBITDA = 10.0×.
>
> **Why use EV over market cap?** EV is capital-structure-neutral. Two companies with identical operations but different debt levels have different market caps but similar EVs. EV/EBITDA allows fair comparison between differently leveraged businesses.

---

#### Full Walkthrough: Comps Analysis for a Market Check

**Scenario:** You are an FP&A analyst. Your CEO wants a "market check" — how does your company's EBITDA margin and revenue growth compare to listed peers, and at what multiple are similar companies trading?

**Step 1 — Invoke the skill:** In the Claude panel, type: *"Run a comps analysis for [your industry] companies. My subject company has LTM Revenue of $340M and LTM EBITDA of $51M."*

The Comps Agent Skill activates. Claude queries S&P Capital IQ for comparable public companies in the specified industry, pulls their LTM financial data and current market data, calculates enterprise values, and builds the comps workbook.

**Step 2 — Review the output:** The generated workbook follows professional conventions: blue input cells for manually adjustable figures, black formula cells, green output cells for the multiples table. The peer group table shows each company's LTM Revenue, LTM EBITDA, EBITDA Margin %, EV, EV/EBITDA, and EV/Revenue. Summary statistics rows show Median, 25th Percentile, and 75th Percentile.

**Step 3 — Read the analysis:** Ask Claude in the panel: *"Based on this peer group, what is the implied enterprise value range for my company?"*

**Claude:** "Your EBITDA Margin of 15.0% ($51M / $340M) is below the peer median of 18.3% and below the 25th percentile of 16.7%.

The peer group trades at: Median EV/EBITDA 9.2×, 25th percentile 8.1×, 75th percentile 11.4×.

Applied to your EBITDA of $51M: at 25th percentile (8.1×): implied EV $413M. At median (9.2×): $469M. At 75th percentile (11.4×): $581M.

Note: your EBITDA margin is below the peer 25th percentile. If a potential buyer applies a discount to reflect the margin gap, the relevant multiple may be closer to 7–8×, implying an EV of $357M–$408M. This is a judgment call depending on whether the buyer views your margin as structural or correctable."

---

> **📊 CONCEPT BOX: LTM — Trailing Twelve Months**
>
> LTM (Last Twelve Months) refers to a company's financial performance over the most recent twelve-month period, regardless of fiscal year end. Used in comps to ensure all companies are compared on the same timeframe.
>
> **Calculation:** LTM = Most Recent Annual Period + Most Recent Partial Period − Prior Year Comparable Partial Period.
>
> **Example:** A company's fiscal year ends December 31. It is now October. LTM revenue = FY2024 revenue + Q1–Q3 2025 revenue − Q1–Q3 2024 revenue. This gives the twelve months ending September 30, 2025 — the most current full year available.
>
> LTM data pulled by Claude in Excel's S&P Capital IQ connector is calculated automatically. The skill surfaces the calculation methodology so you can verify it.

---

#### Practice Exercise 5: Comps Analysis

**What you need:** Claude in Excel with S&P Capital IQ connected. Choose any publicly traded industry you know.

1. Invoke the Comps Skill for your chosen industry. Review the peer group Claude selects — are these genuinely comparable companies? If not, ask Claude to swap in a specific replacement.

2. Once the table is built, ask: *"Which company has the highest EBITDA margin? Which has the lowest EV/EBITDA? What do these two facts together suggest about how the market prices profitability in this sector?"*

3. Find one company in the peer group that trades at an unusually high or low multiple. Ask: *"Why might [company] trade at [multiple]× when the peer median is [median]×? What company-specific factors could explain the premium or discount?"*

4. Now add a hypothetical subject company row with your own revenue and EBITDA figures. Ask Claude to calculate the implied EV range.

**The key learning:** A comps analysis is not arithmetic. The arithmetic takes seconds. The professional skill is choosing the right peer group and knowing when a company deserves to trade above or below the peer median.

**Target time:** 45 minutes.

---

### Skill 6: Discounted Cash Flow Model

The DCF Agent Skill builds a complete discounted cash flow model: a projection period (typically 5–10 years), a terminal value calculation, a WACC calculation (with beta sourced from S&P Capital IQ and customisable assumptions), a DCF equity value, and a sensitivity table showing equity value at different WACC and terminal growth rate combinations.

---

> **📊 CONCEPT BOX: What Is WACC?**
>
> WACC — Weighted Average Cost of Capital — is the discount rate used in a DCF. It represents the blended required return of both debt and equity investors, weighted by their proportions in the capital structure.
>
> **Formula:** WACC = (E/V × Cost of Equity) + (D/V × Cost of Debt × (1 − Tax Rate))
>
> Where E = market value of equity, D = market value of debt, V = E + D. The tax adjustment reflects that interest on debt is tax-deductible, reducing the after-tax cost of debt.
>
> **Cost of equity** is estimated via CAPM: Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium. The risk-free rate is the 10-year Treasury yield. Beta measures the company's stock volatility relative to the market.
>
> **Why WACC matters:** A 1 percentage point increase in WACC typically reduces DCF equity value by 10–20%. This sensitivity is why the WACC/terminal growth rate sensitivity table is always included in professional analysis.
>
> **Example:** A company has 60% equity, 40% debt. Cost of equity: 12%. Cost of debt: 5%. Tax rate: 25%. WACC = (0.60 × 12%) + (0.40 × 5% × 0.75) = 7.2% + 1.5% = 8.7%.

---

#### Example: DCF for an Investment Committee Presentation

An investment analyst needs to present a DCF valuation tomorrow. She invokes the skill:

**She types:** "Run a DCF for [company]. Use a 7-year projection period. Pull the current beta and balance sheet data from Capital IQ."

The DCF Agent Skill builds a complete three-stage DCF: projection period with revenue and margin assumptions linked to the Assumptions tab, a mid-cycle normalisation year, and a terminal value using the Gordon Growth Model. The WACC section shows the component calculation with Capital IQ-sourced beta. The sensitivity table shows equity value per share at WACC ranging from 7% to 11% and terminal growth from 1% to 3%.

She then adjusts the revenue growth assumption on the Assumptions tab to run her bear case:

**She types:** "Change the revenue CAGR assumption in B8 from 12% to 8% and show me the impact on the equity value at the mid-point WACC."

**Claude:** "Updated B8 from 12.0% to 8.0%. DCF equity value at mid-point WACC (9.3%): Reduced from $847M to $694M (−18.1%). Terminal value: $891M (from $1,124M). The sensitivity table has updated across all cells."

---

#### Practice Exercise 6: DCF with Sensitivity Analysis

**What you need:** Claude in Excel with S&P Capital IQ connected.

1. Choose any publicly listed company you follow. Invoke the DCF Skill.

2. Once the model is built, identify the three inputs that most affect the output. Ask Claude: *"Which three assumption changes in this model have the largest impact on the equity value?"*

3. Test each one individually. For each, ask Claude to show you the cell-level change and the downstream impact.

4. Look at the sensitivity table. Find the combination of WACC and terminal growth rate that produces the highest value and the lowest value. What is the spread between them? What does this spread tell you about the model's reliability?

5. Ask Claude: *"If the current share price is [X], what combination of WACC and terminal growth assumptions would be required to justify that price? Is that combination reasonable?"*

**The key learning:** A DCF does not produce one answer. It produces a range of answers depending on assumptions that are genuinely uncertain. The analyst's job is to anchor those assumptions with evidence and present the range honestly.

**Target time:** 45 minutes.

---

### Skill 7: Due Diligence Data Pack

The Due Diligence Agent Skill produces a structured data pack for a target company: financial summary (income statement, balance sheet, cash flow — last 3 years), key ratio analysis, capital structure summary, customer and revenue concentration data where available from S&P Capital IQ, and a flagging section that surfaces anomalies requiring deeper investigation.

---

> **📊 CONCEPT BOX: What Is Due Diligence?**
>
> Due diligence (often called "DD") is the process of investigating a company before a transaction — an acquisition, an investment, or a lending decision. The goal is to verify that the business is what it appears to be, identify risks, and surface anything that should affect the price or terms.
>
> **Financial due diligence** focuses on the quality of earnings: is the reported EBITDA a true run-rate measure, or is it inflated by one-off items? Are revenue recognition policies consistent? Are working capital levels sustainable?
>
> **Key quality of earnings adjustments:** Add back: one-time restructuring costs, non-recurring legal settlements, management compensation above market rate (in an owner-managed business). Subtract: revenue from discontinued contracts, above-normal gains on asset sales. The result is **Adjusted EBITDA** — a better proxy for ongoing profitability than reported EBITDA.
>
> **Red flags the data pack surfaces:** Revenue concentration (one customer = 40% of revenue), receivables growing faster than revenue, capex consistently below depreciation (underinvestment), or large undisclosed related-party transactions.

---

#### Example: First-Pass DD on a Potential Acquisition Target

A corporate development analyst has been asked to do a first-pass assessment of a mid-market software company before management decides whether to pursue further diligence. She has the company name and three years of public filing data. She needs a structured view in two hours.

She invokes the Due Diligence Skill in Claude in Excel. Claude queries S&P Capital IQ, pulls three years of financial data, calculates key ratios, and produces the structured pack.

She then works through it in conversation:

**She asks:** "What are the most notable trends in this company's financial history over the last three years?"

**Claude:** "Three trends stand out. First, revenue has grown 18% per year but accounts receivable have grown 34% per year — DSO has expanded from 47 days to 71 days, suggesting either deteriorating collection efficiency or aggressive revenue recognition close to period-end. Second, reported EBITDA margin is 22%, but EBITDA-to-operating cash flow conversion is only 61% — significantly below the software sector median of 82%. The gap is driven by the working capital build and above-sector stock-based compensation ($14.2M in Year 3 vs. $4.1M in Year 1). Third, capex has been flat at $3.2M per year while depreciation has risen to $6.8M — the company is under-investing relative to its asset base, which may be understating the true cost of maintaining the business."

**She asks:** "If I were a buyer doing full diligence, what are the three questions I would most want answered before agreeing to a price?"

**Claude:** "The first is the receivables question — specifically, whether DSO expansion reflects slower paying customers (a collections process problem that is fixable) or channel stuffing (a revenue recognition problem that requires restatement risk assessment). The second is stock-based compensation: at $14.2M in Year 3 on $48M EBITDA, SBC is already 30% of EBITDA, and if SBC is excluded from the normalisation, the company's true cash cost base is substantially higher than the headline multiple suggests. The third is customer concentration — the data pack shows the top three customers represent 41% of revenue, and one of them (unidentified in public data) accounts for approximately 22% alone. Loss of that customer would produce an immediate 22% revenue reduction and require a fundamental re-rating of growth assumptions."

That is a professionally useful first-pass in under 30 minutes. What would have required two hours of manual ratio analysis and a fresh read of three years of 10-Ks is now a structured conversation.

---

#### Practice Exercise 7: Due Diligence Data Pack

**What you need:** Claude in Excel with S&P Capital IQ connected. Choose any publicly listed company with at least three years of filing history — ideally a mid-size company you know nothing about, so the exercise is genuine discovery.

1. Invoke the Due Diligence Skill. While it runs, write down three questions you already have about the company.

2. When the pack is generated, look at the three-year financial history. Ask Claude: *"Are there any trends in this data that would raise questions in a due diligence process? Look specifically at receivables vs. revenue growth, capex vs. depreciation, and any year with an unusually large non-cash item."*

3. Ask: *"What is this company's EBITDA-to-operating cash flow conversion ratio for each of the three years? How does it compare to what you would expect for a company in this industry?"*

4. If the anomalies section is populated, ask Claude to explain each one. For each, ask: *"Is this a red flag that would require investigation, or a normal feature of this company's business model?"*

5. Ask: *"If I were a buyer and agreed to pay 10× LTM EBITDA, what would I need to believe about this company's future performance to earn a 15% return on that investment?"*

**The key learning:** Due diligence is not ratio calculation. Ratios are the starting point — they surface the questions. The professional's job is to decide which questions matter, which are explainable, and which require investigation before a price can be agreed.

**Target time:** 35 minutes.

---

### Skill 8: Company Teaser

The Company Teaser Agent Skill generates a one-to-two page blind profile for use in M&A sell-side processes — the document sent to potential buyers before the seller decides to share the company's identity. It pulls financial highlights from S&P Capital IQ, generates an anonymised business description, formats the output in a standard teaser structure, and produces the final document in the firm's registered PowerPoint or PDF template.

---

> **📊 CONCEPT BOX: What Is an M&A Teaser?**
>
> A teaser (or "blind profile") is the first document a potential buyer receives in an M&A process. It describes the business without naming it, to gauge interest before the seller decides to share confidential information. It typically covers: industry and business overview, key financial metrics (revenue, EBITDA, growth rate), competitive differentiation, and why the business is being sold.
>
> If a buyer expresses interest after receiving the teaser, they sign a Non-Disclosure Agreement (NDA) and receive the full Confidential Information Memorandum (CIM) — a detailed document that includes the company's name, customer lists, projections, and management team.
>
> A well-written teaser generates enough interest to produce 15–25 NDA signings; a poorly written one generates 3–5. The difference is usually in how compellingly the business is characterised in the anonymous description — which is exactly where Claude's language generation is most useful.

---

#### Example: Preparing a Teaser for a Family-Owned Manufacturer

An M&A banker is running a sell-side process for a privately held precision manufacturer. The owner wants to test market interest before committing to a full process. The banker needs a teaser for Monday morning but it is Friday afternoon.

**He types:** *"Generate a teaser for a precision components manufacturer. Key metrics: Revenue $47M growing 12% per year, EBITDA $9.4M (20% margin), 85% revenues from three end markets (aerospace, medical, defence), average customer tenure 11 years, no single customer above 18% of revenue. Location: Midwest US. Reason for sale: founder retirement after 30 years."*

The Teaser Skill produces a two-page PDF: an anonymised headline ("Leading Precision Components Manufacturer — Confidential Process"), a business overview describing the company's capabilities without identifying it, the financial summary with the three-year growth trend, a competitive highlights section (long customer tenure, diversified end-market exposure, proprietary tooling), and a "Transaction Overview" section describing the process timeline and how to express interest.

**He then asks:** "The teaser reads as too technical in the business overview section. Rewrite it for a private equity generalist who does not know the precision manufacturing industry."

**Claude** rewrites the business overview with less technical jargon and more emphasis on the financial characteristics — recurring revenue nature of the customer relationships, the margin profile relative to industry benchmarks, and the founder-transition narrative that creates a clear rationale for the sale.

The banker reviews, makes two adjustments to the financial figures, and sends the teaser to the buyer list by Monday morning. Two hours of work rather than a full weekend.

---

#### Practice Exercise 8: Company Teaser

**What you need:** Claude in Excel with the financial-analysis plugin (from financial-services-plugins) installed. No real company data required — you can use hypothetical figures.

1. Invent a simple business: choose an industry, give it a revenue size ($10M–$200M), an EBITDA margin, a growth rate, and a reason for sale. Write these down in 3–4 sentences.

2. Invoke the Teaser Skill with this description. Review the output. Is the anonymisation effective — could a reader identify the company from the description? If yes, ask Claude to make it more generic.

3. Ask: *"Rewrite the competitive highlights section to emphasise the characteristics that would be most compelling to a private equity buyer rather than a strategic acquirer."*

4. Ask: *"What financial information am I missing that a professional teaser would typically include? What would a sophisticated buyer want to see?"*

**The key learning:** A teaser is a marketing document, not a financial model. The analytical content matters, but the framing — why this business is distinctive, why the timing makes sense, why a buyer should spend time on it — is what drives NDA signings. Claude handles the structure and drafting; the banker's judgment is in how the business is positioned.

**Target time:** 25 minutes.

---

### Skill 9: Earnings Analysis

The Earnings Analysis Agent Skill produces a complete post-earnings update after a company reports quarterly results. It pulls actuals from S&P Capital IQ (or FactSet), compares them to consensus estimates from the connected data provider, identifies key beats and misses, updates the financial model for new actuals and revised guidance, and produces a structured research note ready for client distribution.

This is one of the highest-frequency, highest-pressure workflows in equity research. Earnings season runs six weeks out of every quarter. During peak weeks an analyst may need to cover five to eight companies in a single week, producing a note for each within hours of the earnings call. The skill compresses what previously took 2–3 hours per company to approximately 45 minutes.

---

> **📊 CONCEPT BOX: Earnings Season and Consensus Estimates**
>
> Publicly traded companies report financial results quarterly. "Earnings season" refers to the six-week period after each quarter when most companies report.
>
> **Consensus estimates** are the average of analysts' published financial forecasts for a company. If the consensus expects $100M revenue and the company reports $108M, it "beat" by $8M (8%).
>
> **Why the beat/miss matters:** Stock prices often move on earnings not based on whether results are good or bad in absolute terms, but whether they are better or worse than what analysts were already expecting. A company reporting strong growth that was already expected in the price may see its stock fall if growth came in slightly below consensus — this is called "buy the rumour, sell the news."
>
> **Equity research analysts' post-earnings workflow:** (1) Compare actuals vs. consensus on revenue, EBITDA, and EPS. (2) Update the financial model for the new actuals. (3) Revise forward estimates based on management guidance and the quarter's trends. (4) Update the price target if the valuation model changes. (5) Publish a note summarising the quarter and updated view. This workflow, previously 2–3 hours, completes in approximately 45 minutes with the Earnings Analysis Skill.

---

#### Example: Post-Earnings Update, 8:30 PM on Report Night

A technology company reports Q3 results at 4:00 PM. The earnings call ends at 5:30 PM. The analyst needs a note in clients' inboxes before markets open at 9:30 AM — that is, a complete earnings update, model revision, and price target change in under 16 hours, after a full day of back-to-back calls.

**She runs:** `/earnings [company] Q3-2025`

The Earnings Analysis Skill queries S&P Capital IQ for the reported actuals, pulls the current consensus estimates, and begins building the structured note. Within two minutes:

**Claude:** "Q3 results summary for [Company]:

**Revenue:** $1.84B reported vs. $1.79B consensus (+2.8% beat). YoY growth 14.2% vs. 12.1% in Q2 — acceleration.

**Gross margin:** 68.4% reported vs. 67.1% consensus (+130 bps beat). YoY expansion of 210 bps driven by mix shift toward higher-margin cloud subscription.

**EBITDA:** $412M reported vs. $389M consensus (+5.9% beat). Margin 22.4% vs. 21.7% consensus.

**EPS:** $0.87 reported vs. $0.82 consensus (+6.1% beat). Adjusted for $0.06 one-time tax benefit: core EPS $0.81, a slight miss of $0.01.

**Q4 guidance:** Revenue $1.88–$1.92B (midpoint $1.90B) vs. consensus $1.86B. Above consensus at midpoint. EPS guidance $0.84–$0.88 (midpoint $0.86) vs. consensus $0.85 — in line.

**Model update:** I have updated the financial model for Q3 actuals and revised Q4 estimates to guidance midpoint. Full year 2025E revenue moves to $7.24B (+$0.09B from prior model). FY2025E EBITDA moves to $1.61B, margin 22.2% (+30 bps). Based on current 18× EV/EBITDA multiple, implied EV increases $1.6B. At current share count, price target moves from $142 to $149."

The analyst reviews the analysis. She makes one adjustment (she uses a 19× multiple, not 18×, reflecting the company's above-sector growth), adds two paragraphs of her own qualitative commentary on management's commentary about international expansion, and has the note ready by 9:00 PM.

The cell-level transparency is critical here. Every number in the note is traceable to a source cell in the updated model. When a client calls asking why her EPS estimate changed, she can show them exactly which line changed and why.

---

#### Practice Exercise 9: Post-Earnings Analysis Using Claude in Excel

**What you need:** Claude in Excel with S&P Capital IQ or FactSet connected. Choose a company that has reported earnings in the last two weeks — the more recent the better, so actual results are available.

1. Run `/earnings [company] [most recent quarter]`. Review the beats and misses. Were any surprising?

2. Ask Claude: *"What does the beat/miss pattern — which lines beat and which missed — suggest about where the business is performing ahead of or behind expectations?"*

3. Look at the guidance the company provided for the next quarter. Ask: *"Is the guidance conservative or aggressive relative to the trend in the last three quarters? What would a company typically need to do to hit or miss this guidance?"*

4. Ask: *"If I owned this stock at the price before the earnings release and the stock is now up/down X% after-hours, does that movement make sense based on the results? Or does it seem like an overreaction or underreaction?"*

5. Ask Claude to draft a two-paragraph client note summarising the quarter and your view. Then edit it: add your own qualitative perspective on one aspect of the results that matters to you.

**The key learning:** Earnings analysis is a data processing task and a judgment task. The Skill handles the data processing — actuals vs. consensus, model updates, price target arithmetic. Your judgment is the qualitative framing: what this quarter means for the long-term thesis, what management credibility looks like after this result, and whether the market's reaction is pricing the right things.

**Target time:** 40 minutes.

---

### Skill 10: Initiating Coverage Report

The Initiating Coverage Agent Skill produces the structural framework and populated data sections for an initiating coverage report — the comprehensive research note an equity analyst publishes when beginning coverage of a company for the first time. It generates: a company overview (business description, market position, revenue breakdown by segment), a financial summary table (three years of actuals plus two years of estimates), a linked DCF model, a comps table, an investment thesis section with bull and bear case arguments, key risks, and a price target with methodology.

Initiating coverage is the most time-intensive deliverable in equity research. A typical initiation takes 4–8 weeks and produces a 25–50 page document. The skill handles the structural setup and data population — which represents roughly 60% of the elapsed time. The analyst contributes the investment thesis, the qualitative judgments about competitive position and management quality, and the decision on which risks are material.

---

> **📊 CONCEPT BOX: What Is an Initiating Coverage Report?**
>
> An initiating coverage report is a comprehensive equity research document — typically 25–50 pages — that introduces an analyst's view on a company to institutional investors. It includes: the investment thesis (why the stock should be bought, held, or sold), business description, industry overview, financial model (DCF, comps), valuation, key risks, and a price target with a rating (Buy / Hold / Sell or equivalent).
>
> **Why initiating coverage matters:** An analyst cannot publish ongoing earnings updates, price target changes, or buy/sell recommendations on a company without first publishing an initiation. Initiations are how research franchises are built — a high-quality initiation on a company in a sector investors are watching generates significant institutional interest. A weak one gets ignored.
>
> **The analyst's job in an initiation:** The framework and models are standard. What differentiates an initiation is the insight — a non-consensus view on the company's competitive position, a financial analysis that surfaces something the market is not pricing, or a variant view on the industry that changes how a portfolio manager thinks about the stock. Claude handles the standard parts. The analyst supplies the insight.

---

#### Example: Initiating Coverage on a Consumer Technology Company

An equity analyst has been asked by her firm to initiate coverage on a consumer technology company that has just gone public. She has three weeks before the initiation is expected to publish.

**She runs:** `/initiating-coverage [company]`

Within five minutes, the Skill has produced:

- A 12-tab Excel model: three-statement financials (three years actuals, five years estimates), a DCF with sensitivity table, and a comps table with 12 peers populated from S&P Capital IQ
- A Word document framework: all standard sections pre-populated with company data — business description (from SEC filings), revenue segment breakdown, management team, key metrics table, industry overview
- An investment thesis template with bull case and bear case headers, key catalyst tracking section, and risk factor framework

**She then works through the thesis with Claude:**

**She asks:** "Based on the comps table, is this company expensive or cheap relative to its peer group?"

**Claude:** "On LTM EV/Revenue, the company trades at 8.4× versus the peer median of 6.1× — a 38% premium. On forward EV/Revenue (NTM), the premium narrows to 24% (7.2× vs. 5.8×) as the market is pricing faster growth. The premium appears justified only if the company can sustain revenue growth above 25% for the next three years. The peer median growth rate is 14%. Of the 12 peers, only two have sustained 25%+ growth for three consecutive years, and both were earlier in their product cycle than this company currently is. This suggests the current multiple prices in a best-case scenario rather than a base case."

That is the kind of quantitative framing that goes directly into the investment thesis section — and it took 30 seconds rather than the hour it would have taken to calculate manually across 12 peers.

She then writes the qualitative sections herself: her view on the company's competitive moat, her assessment of management credibility based on the IPO roadshow, and her non-consensus thesis about the addressable market.

---

#### Practice Exercise 10: Initiating Coverage Framework

**What you need:** Claude in Excel with S&P Capital IQ connected. Choose any company that has gone public within the last two years — these tend to have interesting coverage gaps and enough data for a meaningful exercise.

1. Run the Initiating Coverage Skill. Review the comps table that is generated. Are the peer group selections reasonable? Identify one company in the list you would remove and one you would add.

2. Ask Claude: *"Based on the comps table, at what revenue growth rate would this company need to grow to justify its current EV/Revenue multiple, assuming the peer group maintains its current multiples?"*

3. Look at the DCF model. Find the WACC assumption. Ask: *"Is this WACC appropriate for a company of this size, growth profile, and capital structure? What range would you consider reasonable, and how much does the equity value change across that range?"*

4. Draft a three-sentence investment thesis: one sentence describing what the company does, one sentence describing the bull case, one sentence describing the key risk to the thesis.

5. Ask Claude: *"What is the strongest bear case argument against this company that a sceptical investor would make? What would they need to see to be convinced the bull case was right?"*

**The key learning:** An initiating coverage report is the hardest thing an equity analyst writes, and the Skill makes the easy half of it fast. The hard half — the non-consensus insight that makes the report worth reading — is entirely the analyst's work. The right way to use this skill is to spend less time building the model and more time developing the view.

**Target time:** 50 minutes.

---

## What Claude in Excel Does Not Do: Non-Negotiable Boundaries

**Claude in Excel does not provide investment advice.** It does not tell you whether to buy or sell, whether a valuation is attractive, or whether a deal should proceed. These judgments carry regulatory and fiduciary implications. Claude provides the analytical infrastructure; the professional provides the judgment.

**Claude makes mistakes and must be verified.** Every output — especially the Agent Skills — should be reviewed against the underlying data before it goes to a client or regulator. Cell-level citations make this verification efficient, but the responsibility for accuracy rests with the professional, not the tool.

**Claude does not validate your assumptions.** Revenue growing at 25% for ten years is a model Claude will build. Whether that assumption is reasonable is your professional judgment to apply.

**Claude does not replace an audit.** Outputs are not audited financial statements. Any output filed with a regulator or relied upon in a legal transaction requires the same professional review and sign-off it would without Claude.

---

# Part Two: Excel via Cowork — The Orchestrating Agent

---

## The Architecture Shift: From One Tool to Many

Claude in Excel, for all its capability, operates within one application. The workbook is the boundary of its world. You close the workbook and the context is gone. You finish the analysis and you move to PowerPoint — but that transition is yours to make. Claude cannot follow you.

Cowork changes this. When Claude operates through the Cowork platform, it is not embedded in Excel the way a sidebar is embedded in a workbook. It is an agent that can act across applications, carry context from one tool to another, and execute multi-step workflows that span the entire production process of a financial deliverable.

The most significant current example of this capability is the Excel-to-PowerPoint cross-app orchestration, available in research preview. An analyst asks Claude to analyse a company's quarterly performance in Excel and build a presentation summarising the findings for the investment committee. Claude: opens the financial data in Excel, performs the analysis, then — without the analyst switching applications — takes that analysis and autonomously builds the PowerPoint deck, slides formatted with the analysis it just performed. The deliverable that would have required the analyst to complete two sequential manual tasks — model, then deck — is produced in one prompt.

---

> **🔑 CONCEPT BOX: What Is Cross-App Orchestration?**
>
> Cross-app orchestration is the ability of an AI agent to execute multi-step workflows across multiple applications — carrying context from one tool to the next and completing the full sequence autonomously.
>
> **Why this matters:** Most professional finance deliverables are not single-application tasks. A client presentation starts as Excel analysis, moves to PowerPoint slides, includes a Word executive summary, and ends with an email to the client. Each transition — copying numbers, formatting slides, writing the summary — is manual work that takes time and introduces error.
>
> **What cross-app orchestration does:** It treats these transitions as steps in a single workflow rather than as separate tasks. The analyst specifies the outcome (a formatted presentation with the analysis). Claude manages the sequence.
>
> **Current status:** Excel ↔ PowerPoint orchestration is available in research preview through Cowork for Team and Enterprise plans. Further cross-app capabilities are in development.

---

## The Finance Plugins in Cowork

Within Cowork, the finance plugins are how Claude's domain knowledge is packaged for enterprise deployment. A plugin bundles together: a SKILL.md (the domain knowledge layer), a config.yaml (configuration managed by IT), and connector scripts (the data integrations). Skills within the plugin fire passively in the background when relevant — unlike slash commands, which are explicitly invoked.

Two plugin repositories cover finance:

---

> **📊 CONCEPT BOX: Skills vs. Slash Commands in Cowork**
>
> In the Cowork plugin architecture, **Skills** and **slash commands** both provide Claude with domain expertise, but they work differently:
>
> **Skills** are passive. They are instructions encoded in the SKILL.md that fire automatically when Claude judges them relevant. A finance skill might say "whenever a variance exceeds 10%, present it as a table with volume, price, and mix components." Claude applies this without being told to every time the condition is met.
>
> **Slash commands** are active. They are explicitly invoked by typing `/command-name`. They trigger a specific, defined workflow. `/finance:reconciliation` always runs the reconciliation workflow. It does not fire unless you call it.
>
> The combination — passive skills for consistent standards, explicit commands for specific tasks — is what makes Cowork plugins behave like trained specialists rather than general assistants.

---

### knowledge-work-plugins / finance

The `anthropics/knowledge-work-plugins` finance plugin is a finance and accounting plugin primarily designed for Cowork but also fully compatible with Claude Code. It supports month-end close, journal entry preparation, account reconciliation, financial statement generation, variance analysis, and SOX audit support.

**GitHub:** `https://github.com/anthropics/knowledge-work-plugins/tree/main/finance`

**Who it serves:** Corporate FP&A teams, controllers, accounting managers, finance business partners, and internal audit teams. This is the operational finance plugin — the one that keeps the books clean, the close on schedule, and the audit trail intact.

**What it explicitly does not do:** This plugin assists with finance and accounting workflows but does not provide financial, tax, or audit advice. All outputs must be reviewed by qualified financial professionals before use in financial reporting, regulatory filings, or audit documentation.

**Install:**
```bash
claude plugin marketplace add anthropics/knowledge-work-plugins
claude plugin install finance@knowledge-work-plugins
```

Or install directly from Cowork → Plugins → Browse → Finance.

---

#### Plugin Structure

Every plugin in the knowledge-work-plugins collection follows the same file architecture:

```
finance/
├── .claude-plugin/plugin.json   # Manifest: name, description, version
├── .mcp.json                    # Tool connections (data sources)
├── CONNECTORS.md                # Documentation of connected tools
├── commands/                    # Slash commands you invoke explicitly
│   ├── income-statement.md
│   ├── journal-entry.md
│   ├── reconciliation.md
│   ├── sox-testing.md
│   └── variance-analysis.md
└── skills/                      # Domain knowledge Claude draws on automatically
    ├── audit-support/SKILL.md
    ├── close-management/SKILL.md
    ├── financial-statements/SKILL.md
    ├── journal-entry-prep/SKILL.md
    ├── reconciliation/SKILL.md
    └── variance-analysis/SKILL.md
```

The separation is architecturally important: **commands** are what you explicitly invoke; **skills** are what Claude draws on automatically. You call `/reconciliation` when you want to run a reconciliation. Claude draws on the reconciliation skill file whenever reconciliation is contextually relevant — such as when you paste a trial balance and ask a question about it, even without invoking the command.

---

#### The Five Commands

**`/journal-entry [type] [period]`** — Generate journal entries with proper debits, credits, and supporting detail.

```
/journal-entry ap-accrual 2025-03
/journal-entry fixed-asset-addition 2025-03
/journal-entry prepaid-expense 2025-03
/journal-entry payroll 2025-03
/journal-entry revenue-recognition 2025-03
```

For each entry type, the command produces: the full debit/credit structure, the accounting rationale (which GAAP/IFRS standard applies), the required supporting documentation, and a note on the review and approval workflow your organisation should follow. Without a connected ERP, you provide the figures; with a connected ERP (NetSuite, SAP), the command pulls the transaction data automatically.

**`/reconciliation [account] [period]`** — Compare GL balances to subledger, bank, or third-party balances and identify reconciling items.

```
/reconciliation accounts-receivable 2025-03
/reconciliation accounts-payable 2025-03
/reconciliation bank-USD 2025-03
/reconciliation intercompany 2025-03
```

The output is a structured reconciliation workpaper: the GL balance, the source of truth balance, the net difference, each reconciling item categorised (timing difference, in-transit item, error requiring correction, or item requiring investigation), and an aging summary for items that have been outstanding for more than one period.

---

> **📊 CONCEPT BOX: What Is a GL Reconciliation?**
>
> A GL (General Ledger) reconciliation compares the balance recorded in your accounting system to an independent source of truth — a bank statement, a subledger, or a third-party confirmation — and explains every difference. The goal is to confirm that every dollar in the GL is real, correctly classified, and properly supported.
>
> **Why it matters:** A GL balance that has not been reconciled is an unverified number. In an audit, unreconciled balances are a control weakness. In a month-end close, outstanding reconciling items from prior periods that have not been investigated are a red flag — they may indicate errors, fraud, or simply sloppy bookkeeping.
>
> **Categories of reconciling items:**
> - **Timing difference:** A transaction is in the GL but not yet in the bank statement (e.g., a check issued but not yet cleared). Will resolve automatically next period.
> - **In-transit item:** A deposit recorded in the GL that has not yet been credited by the bank. Also resolves automatically.
> - **Error:** A transaction was posted incorrectly — wrong amount, wrong account, wrong period. Requires a correcting entry.
> - **Item requiring investigation:** A difference with no obvious explanation. The most important category to resolve before closing.

---

**`/income-statement [period-type] [period]`** — Generate an income statement with period-over-period comparison and variance analysis, highlighting material variances for investigation.

```
/income-statement monthly 2025-03
/income-statement quarterly 2025-Q1
/income-statement ytd 2025-03
```

The output follows a standard GAAP income statement format: revenue (by type), cost of revenue, gross profit with margin %, operating expenses (R&D, S&M, G&A), total operating expenses, EBIT, interest, tax, and net income — with current period, prior period, variance ($), variance (%), budget amount, and budget variance for every line. Material variances (above a configurable materiality threshold) are flagged for investigation with suggested explanatory narratives.

**`/variance-analysis [area] [period-vs-period]`** — Decompose variances into drivers with narrative explanations and waterfall analysis.

```
/variance-analysis revenue 2025-Q1 vs 2025-Q4
/variance-analysis opex 2025-03 vs budget
/variance-analysis gross-margin 2025-Q1 vs 2024-Q1
/variance-analysis cogs 2025-03 vs budget
```

This is the most analytically sophisticated command in the finance plugin. It does not just calculate the variance — it decomposes it. Revenue variances are split into volume, price, and mix components. Operating expense variances are split into volume-driven (the expense is higher because activity is higher) and rate-driven (the expense is higher because the unit cost has increased). The output includes a narrative summary of the top three drivers and, when connected to a BI tool, a waterfall chart showing the bridge from prior period to current period.

**`/sox-testing [process] [period]`** — Generate SOX 404 control testing workpapers for a specified process and period.

```
/sox-testing revenue-recognition 2025-Q1
/sox-testing procure-to-pay 2025-Q1
/sox-testing financial-close 2025-Q1
/sox-testing payroll 2025-Q1
```

The output follows the SOX 404 methodology: control objective, control description, test of design, sample selection (with the statistical basis for the sample size), test of operating effectiveness, and deficiency classification template if exceptions are found. This command saves 3–5 hours per control area of workpaper preparation time during quarterly and annual audit seasons.

---

#### The Six Skills

Skills fire automatically when Claude detects that their domain is relevant — you do not invoke them, they activate in the background.

| Skill | When it activates | What it adds |
|---|---|---|
| **journal-entry-prep** | When preparing or reviewing journal entries | JE best practices, standard accrual types, documentation requirements, review workflows |
| **reconciliation** | When reconciling accounts or investigating differences | Methodology for GL-to-subledger, bank recs, and intercompany; reconciling item categorisation and aging standards |
| **financial-statements** | When generating or reviewing financial statements | Income statement, balance sheet, and cash flow formats; GAAP presentation standards; flux analysis methodology |
| **variance-analysis** | When explaining or investigating variances | Decomposition techniques (price/volume, rate/mix); materiality thresholds; narrative generation standards; waterfall chart methodology |
| **close-management** | When managing the month-end or quarter-end close | Close checklist by day, task sequencing, dependency mapping, status tracking, and common close activities by day of close |
| **audit-support** | When preparing for or responding to audit requests | SOX 404 control testing methodology; sample selection standards; documentation requirements; deficiency classification |

The close-management skill is particularly valuable as a passive layer. It activates whenever you are in a close context — even if you are just asking Claude a general question about an account balance — and applies the close checklist lens automatically: is this resolved? Does it need to be resolved before Day X? Who owns it?

---

#### Connectors

The finance plugin works best when connected to your financial data sources. Without connections, you can paste data or upload files; with connections, commands pull data automatically.

**Required for full automation:**
- **ERP / Accounting system** (e.g., NetSuite, SAP): Pulls trial balances, subledger data, and journal entries for reconciliation and statement generation
- **Data warehouse** (e.g., Snowflake, BigQuery): Queries financial data, runs variance analysis, and pulls historical comparisons

**Enhances output quality:**
- **Spreadsheets** (Google Sheets, Excel): Generates reconciliation workpapers and financial model templates directly
- **BI / Analytics platform** (Tableau, Looker): Pulls dashboards, KPIs, and trend data to enrich variance narratives
- **Document storage**: Accesses accounting policies, prior period workpapers, and support documentation
- **Email**: Sends reports and routes approval requests

Configure connectors by editing `.mcp.json` in the finance plugin directory.

---

> **📊 CONCEPT BOX: What Is a Month-End Close?**
>
> The month-end close is the process by which a company's accounting team finalises the financial records for a completed calendar month — reconciling all accounts, posting final journal entries, and producing the management accounts. For most organisations it takes 3–10 business days after month-end.
>
> **Key close tasks (by day):** Day 1–2: subledger feeds, bank statement receipt, preliminary trial balance. Day 2–3: AR/AP reconciliation, payroll posting, fixed asset depreciation. Day 3–5: accruals, prepaids, intercompany eliminations. Day 5–7: income statement and balance sheet preparation, flux analysis. Day 7–10: management review, CFO sign-off, distribution.
>
> The close-management skill knows this sequence. When you invoke `/reconciliation` on Day 3, it contextualises the output within where you are in the close — flagging items that must be resolved before Day 5, not just listing them without urgency.

---

#### Example: The Full Month-End Close Workflow

**Day 1:** The controller opens Cowork and types: *"Let's start the March close."* The close-management skill activates automatically. Claude queries the connected data warehouse for the current state of each close checklist item, produces the Day 1 status report, and surfaces two blockers: a $3,420 bank reconciliation discrepancy on the USD operating account and a missing intercompany settlement confirmation from the Singapore entity.

**Day 3:** `/reconciliation bank-USD 2025-03`

Claude queries the connected bank data, runs the reconciliation against the GL, and produces a structured workpaper. The $3,420 discrepancy breaks down as: four timing differences totalling $2,180 (checks issued in March, clearing in April — normal), two bank charges totalling $840 not yet posted to the GL (requires journal entry), and one unidentified item of $400 (requires investigation before close can proceed).

**Day 4:** `/journal-entry bank-charges 2025-03`

Claude generates the journal entry for the $840 in bank charges: debit Bank Charges Expense $840, credit Cash — USD Operating $840, with the bank statement date, the transaction references, and a note that this entry should be reviewed by the controller before posting.

**Day 5:** `/variance-analysis revenue 2025-Q1 vs budget`

Claude pulls the Q1 actuals from the connected data warehouse and the budget from the BI platform. The variance report shows revenue $2.3M below budget (-4.1%), decomposed as: volume shortfall $3.1M adverse (unit volume 8.2% below budget), price $0.8M favourable (ASP 2.1% above budget due to product mix shift toward premium SKUs). Narrative generated. Waterfall chart generated. CFO-ready in 15 minutes rather than the usual half-day.

**Day 6:** `/income-statement monthly 2025-03`

The full management P&L, with current month, prior month, YTD actual, YTD budget, and YTD variance columns, formatted in the firm's standard template, with all material variances flagged and narrative summaries for the top three. Ready for distribution to the management team.

**SOX season:** `/sox-testing revenue-recognition 2025-Q1`

Claude produces the revenue recognition control testing workpapers: the control objective (revenue is recognised in accordance with ASC 606), the test of design (15 minutes of work), the sample selection (statistical sampling methodology with the sample size justified), the test of operating effectiveness template (with the exception documentation fields pre-populated), and the deficiency classification guide. The auditors receive workpapers that meet their quality standards rather than bare spreadsheets that require three rounds of comments.

---

### financial-services-plugins

The `anthropics/financial-services-plugins` suite is a specialist collection that turns Claude into a professional-grade analyst for investment banking, equity research, private equity, and wealth management. Built for Claude Cowork, also compatible with Claude Code.

**GitHub:** `https://github.com/anthropics/financial-services-plugins`

**Scale:** 41 skills, 38 commands, 11 MCP integrations across 5 plugins plus 2 partner-built plugins.

**Architecture note:** All MCP data connectors are centralised in the `financial-analysis` core plugin and shared across all add-ons. This means you configure your data connections once — in the core plugin's `.mcp.json` — and every add-on you install inherits them automatically.

**Install order is mandatory.** The core plugin must be installed first; all add-ons depend on it.

```bash
claude plugin marketplace add anthropics/financial-services-plugins

# Install the core plugin FIRST — required
claude plugin install financial-analysis@financial-services-plugins

# Then add function-specific plugins
claude plugin install investment-banking@financial-services-plugins
claude plugin install equity-research@financial-services-plugins
claude plugin install private-equity@financial-services-plugins
claude plugin install wealth-management@financial-services-plugins
```

Or install from `claude.com/plugins`.

---

#### MCP Data Connectors (All in the Core Plugin)

| Provider | What it provides | MCP URL |
|---|---|---|
| **Daloopa** | Automated financial model data extraction | `https://mcp.daloopa.com/server/mcp` |
| **Morningstar** | Equity research, fund analysis, valuation data | `https://mcp.morningstar.com/mcp` |
| **S&P Global** | Capital IQ financial data, credit ratings, ownership | `https://kfinance.kensho.com/integrations/mcp` |
| **FactSet** | Market data, financial analytics, portfolio data | `https://mcp.factset.com/mcp` |
| **Moody's** | Credit ratings, fixed income analytics | `https://api.moodys.com/genai-ready-data/m1/mcp` |
| **MT Newswires** | Real-time financial news feeds | `https://vast-mcp.blueskyapi.com/mtnewswires` |
| **Aiera** | Earnings call transcripts, corporate event intelligence | `https://mcp-pub.aiera.com` |
| **LSEG** | Market data, analytics (also available as partner plugin) | `https://api.analytics.lseg.com/lfa/mcp` |
| **PitchBook** | Private company, VC, and PE deal data | `https://premium.mcp.pitchbook.com/mcp` |
| **Chronograph** | Private markets portfolio monitoring | `https://ai.chronograph.pe/mcp` |
| **Egnyte** | Document management for deal files | `https://mcp-server.egnyte.com/mcp` |

*MCP access requires a subscription or API key from each provider.*

---

#### End-to-End Workflows the Suite Enables

The plugins are designed for complete workflows — not point tools. The README explicitly describes five workflow patterns:

**Research to Report:** Pull real-time data from MCP providers, analyse earnings results, and generate publication-ready equity research reports — all in a single session.

**Spreadsheet Analysis:** Build comparable company analyses, DCF models, and LBO models as fully functional Excel workbooks with live formulas, sensitivity tables, and industry-standard blue/black/green colour-coding conventions.

**Financial Modelling:** Populate three-statement models from SEC filings, cross-check assumptions against peer data, and stress-test scenarios.

**Deal Materials:** Draft CIMs, teasers, and process letters, then generate pitch deck slides and strip profiles using the firm's branded PowerPoint templates.

**Portfolio to Presentation:** Screen opportunities, run diligence checklists, build IC memos, and track portfolio KPIs — moving from data to deliverable in a single session.

---

#### Plugin 1: financial-analysis (Core — Install First)

**What it does:** Build comps, DCF models, LBO models, and three-statement financials. QC presentations and create reusable PowerPoint templates. Provides the shared foundation and all MCP data connectors for the entire suite.

**Core commands:**

```
/comps [company]         — Comparable company analysis as Excel workbook
/dcf [company]           — DCF valuation model with sensitivity tables
/lbo [company]           — LBO model with entry/exit scenarios
/one-pager [company]     — One-page company profile in firm's PPT template
/ppt-template            — Register firm's branded PowerPoint template
```

The `/comps` command produces a fully formatted Excel workbook: the peer group table with LTM financials pulled from connected MCP providers, enterprise value calculations, EV/EBITDA and EV/Revenue multiples for each peer, a statistical summary (median, 25th percentile, 75th percentile), and the subject company row with implied valuation range. Blue input cells, black formula cells, green output cells — the Wall Street colour-coding convention built in.

The `/dcf` command produces a three-stage DCF: detailed projection period (typically 5–10 years), a normalisation year, terminal value using both the Gordon Growth Model and an exit multiple (so the reader can see the range), WACC calculation with beta sourced from the connected data provider, and a two-way sensitivity table (WACC × terminal growth rate) as the final output. The model is a working Excel file with live formulas — change an assumption on the Assumptions tab and the sensitivity table updates automatically.

The `/lbo` command produces a leveraged buyout model: deal structure (sources and uses of funds), operating model (revenue and EBITDA projections), debt schedule (amortisation, PIK, revolver), exit analysis (multiple scenarios), and returns summary (IRR and MOIC at different entry/exit multiple combinations). Also fully functional Excel with live formulas.

---

> **📊 CONCEPT BOX: What Is an LBO Model?**
>
> A Leveraged Buyout (LBO) model values the acquisition of a company using significant borrowed money — typically 50–70% debt. The acquired company's own cash flows service the debt. Private equity firms use LBOs to acquire companies, improve them over 3–7 years, and sell at a profit.
>
> **Why debt amplifies returns:** Buy a company for $100M using $30M equity and $70M debt. Sell for $130M five years later (after repaying debt from operating cash flows, leaving $60M net). Equity return: $60M on $30M invested = 100% total return (15% IRR). Without leverage, the same $30M → $39M gain ($130M × 30% equity proportion) = 30% total return on $30M. Debt amplification works in both directions — an LBO in a business that underperforms can wipe out equity entirely.
>
> **Key LBO metrics:**
> - **Entry multiple:** EV/EBITDA at the time of purchase
> - **Exit multiple:** EV/EBITDA at the time of sale (assumed, not known at purchase)
> - **IRR (Internal Rate of Return):** Annualised equity return. Target: 20–25% for most PE firms.
> - **MOIC (Multiple on Invested Capital):** Total equity proceeds ÷ equity invested. Target: 3–5× over 5 years.
>
> The LBO model's sensitivity table shows returns at every combination of entry price, exit multiple, and holding period — giving the investment committee the full risk-return picture rather than a single scenario.

---

The `/ppt-template` command registers the firm's branded PowerPoint template. After registration, every deck output — one-pagers, IC memos, earnings summaries — uses the firm's template automatically, with the correct logo, fonts, colour scheme, and footer.

---

#### Plugin 2: investment-banking

**What it does:** Draft CIMs, teasers, and process letters. Build buyer lists, run merger models, create strip profiles, and track live deals through milestones.

**Key capabilities and workflows:**
- **CIM (Confidential Information Memorandum):** Full draft document for a sell-side M&A process — executive summary, business overview, financial performance (with Daloopa-sourced financial data), management team, competitive positioning, and transaction rationale. Produced in the firm's branded Word or PDF template.
- **Teaser:** Blind profile for initial buyer outreach, anonymous until NDA is signed.
- **Process letter:** Bid process management documentation for structured auction processes.
- **Buyer list:** Strategic and financial buyer identification using PitchBook data — screened by sector, geography, size, and acquisition history.
- **Merger model:** Accretion/dilution analysis and synergy modelling for buy-side transactions.
- **Strip profile:** Rapid company summary for pitch books, in the firm's standard one-page format.
- **Deal tracking:** Milestone tracking for live processes — NDA status, management presentation scheduling, bid round status, exclusivity.

**Cross-app output:** The `/cim` and `/one-pager` commands produce PowerPoint and Word files using the firm's registered template. When the investment banker registers their firm's template with `/ppt-template`, every deal document is automatically formatted to house style.

---

#### Practice Exercise A: Investment Banking Workflow

**What you need:** Cowork with the investment-banking plugin installed (requires financial-analysis core first). If Cowork is not yet available to you, you can run the equivalent with Claude in Excel using the Agent Skills — the Teaser Skill in Claude in Excel produces comparable output to the Cowork plugin's teaser workflow.

1. Choose a publicly listed company in a sector you know. Run `/one-pager [company]`. Review the output: is the business description accurate? Are the financial figures correct? Note which data came from live MCP providers and which required manual input.

2. Now draft the buyer list question: type *"Identify likely strategic acquirers and financial buyers for [company]. Strategic: companies in adjacent industries with acquisition history and balance sheet capacity. Financial: PE firms with relevant sector thesis and fund size appropriate for this company's EV."* Review the output against your own intuition.

3. Ask: *"Draft a one-paragraph teaser introduction for [company] that could be sent to a PE buyer who does not know the sector. Emphasise the financial characteristics rather than the technical ones."*

4. Ask: *"What are the most important risk factors a buyer's counsel would want to investigate in a due diligence process for a company in this sector?"*

**Target time:** 30 minutes.

---

#### Plugin 3: equity-research

**What it does:** Write earnings updates and initiating coverage reports. Maintain investment theses, track catalysts, draft morning notes, and screen for new ideas.

**Key capabilities and workflows:**
- **Earnings update:** Post-earnings note after a company reports quarterly results. Pulls actual results from connected MCP providers (S&P Global, FactSet), compares against consensus, identifies key beats and misses, updates the financial model for new actuals, and produces a structured note. The full workflow — which previously took 2–3 hours — completes in approximately 45 minutes.
- **Initiating coverage:** Structural framework for a first-time coverage report — company overview, investment thesis (bull, base, bear), comps, DCF, key risks, and price target. The template and linked models are produced automatically; the analyst provides the judgment.
- **Investment thesis maintenance:** Tracks the key assumptions behind a thesis and flags when events (earnings, news, sector data) challenge those assumptions.
- **Morning note:** Daily market summary note in the analyst's house style, pulling overnight news from MT Newswires and Aiera earnings call transcripts.
- **Screening:** New idea generation based on valuation, momentum, or fundamental criteria specified by the analyst.

**Command:**
```
/earnings [company] [quarter]   — Post-earnings update report and model update
```

---

> **📊 CONCEPT BOX: What Is a Sell-Side vs. Buy-Side Analyst?**
>
> **Sell-side analysts** work for investment banks and brokerage firms. They publish equity research reports (with buy/hold/sell ratings and price targets) primarily to institutional investor clients, who use the research to inform their investment decisions. The "sell side" refers to selling investment products and services to those clients.
>
> **Buy-side analysts** work for institutional investors — asset managers, hedge funds, pension funds. They conduct analysis to support their own firm's investment decisions. They do not publish research externally.
>
> The equity-research plugin is primarily designed for sell-side analysts. Its earnings update and initiating coverage workflows follow sell-side research conventions: consensus estimates comparison, price target methodology, and publication-ready note format.

---

#### Practice Exercise B: Equity Research Workflow

**What you need:** Cowork with the equity-research plugin installed. Alternatively, this exercise can be approximated using the Earnings Analysis Agent Skill in Claude in Excel directly.

1. Choose a company that reported earnings within the last month. Run `/earnings [company] [quarter]`. Review the note structure: does it cover beats/misses, model updates, and forward guidance?

2. Ask: *"Which line item in this quarter's results was most surprising relative to consensus — and is it a positive or negative surprise for the forward thesis?"*

3. Ask: *"Draft the opening paragraph of an earnings update note that I would send to institutional clients. Make it informative but concise — the client is reading 12 notes this morning."*

4. Now test the investment thesis skill: ask *"What are the three key assumptions that would need to hold for this company to hit consensus revenue estimates over the next two years? For each assumption, how confident should I be that it will materialise?"*

5. Ask: *"If I were a sceptical portfolio manager reading this update, what is the one question I would ask the analyst that is most uncomfortable to answer?"*

**Target time:** 35 minutes.

---

#### Plugin 4: private-equity

**What it does:** Source and screen deals, run diligence checklists, analyse unit economics and returns, draft IC memos, and monitor portfolio company KPIs.

**Key capabilities and workflows:**
- **Deal sourcing:** Query PitchBook and Chronograph for deals matching specified criteria (sector, geography, revenue range, growth profile, ownership type). Returns a scored list with key metrics for each opportunity.
- **Diligence checklist:** Structured due diligence checklist for a new investment, covering commercial, financial, legal, operational, and management diligence workstreams.
- **Unit economics analysis:** Cohort analysis, LTV/CAC calculation, and payback period for software/consumer businesses where unit economics drive the investment thesis.
- **Returns analysis:** Entry IRR and MOIC modelling across scenarios, sensitivity to exit timing and exit multiple.
- **IC memo:** Investment committee memorandum — the formal document presented to the investment committee when recommending a new investment. Structured sections: executive summary, company overview, investment thesis, financial performance, valuation, risk factors, and recommendation.
- **Portfolio monitoring:** KPI dashboard for portfolio companies — revenue, EBITDA, cash, headcount, and key operating metrics — pulled from Chronograph and compiled into a portfolio-level view.

**Commands:**
```
/source [criteria]          — Deal sourcing query
/ic-memo [project name]     — Investment committee memo
```

---

> **📊 CONCEPT BOX: What Is an IC Memo?**
>
> An IC (Investment Committee) memo is the formal document an investment professional presents when recommending a new investment to the firm's decision-making body. It is one of the most important documents in the investment process — the memo must be comprehensive enough to justify the recommendation and honest enough to surface the key risks.
>
> **Standard sections:** (1) Executive summary with recommendation. (2) Company and market overview. (3) Investment thesis — why this investment, why now. (4) Financial performance and projections. (5) Valuation — entry multiple, DCF, comps. (6) Return analysis — base, bull, bear case IRR and MOIC. (7) Key risks and mitigants. (8) Proposed deal structure and terms.
>
> The IC memo plugin produces the structure and populates the data sections from connected sources. The investment thesis, risk assessment, and recommendation are the professional's judgment — the plugin does not write those sections from scratch, it creates a structured framework for the professional to complete and review.

---

#### Practice Exercise C: Private Equity Workflow

**What you need:** Cowork with the private-equity plugin installed (requires financial-analysis core first). PitchBook access is needed for the sourcing step; the IC memo can be run with manually provided data if PitchBook is not connected.

1. Run `/source [criteria]` with a simple brief: specify a sector you know, a revenue range (e.g., $20M–$100M), geography, and ownership type (founder-owned, carve-out, or PE-backed). Review the returned list. Are the companies genuinely in-criteria? Are any obvious omissions?

2. Pick one company from the sourcing output. Ask: *"For this company, what are the three most important diligence questions I should answer in the first two weeks? Focus on questions that could kill the deal rather than questions that would refine the price."*

3. Draft a one-paragraph investment thesis for the company as if presenting to the investment committee. Include: why this company, why now, what you would do to create value, and what the exit looks like.

4. Ask: *"Build a simple returns model: assume $50M entry EV at 7× EBITDA, 60% debt, 5-year hold, EBITDA growing 15% per year. At exit multiples of 7× and 8×, what is the IRR and MOIC?"* Verify the arithmetic manually.

5. Ask: *"What are the three most common reasons PE-backed companies in this sector underperform the entry thesis? How would I test for each of these risks in diligence?"*

**Target time:** 40 minutes.

---

#### Plugin 5: wealth-management

**What it does:** Prep for client meetings, build financial plans, rebalance portfolios, generate client reports, and identify tax-loss harvesting opportunities.

**Key capabilities and workflows:**
- **Client meeting prep:** Pre-meeting brief — portfolio performance summary, allocation vs. target, recent news on held positions, tax-loss harvesting opportunities, and suggested agenda items.
- **Financial planning:** Goal-based planning analysis — retirement projections, college funding, estate planning considerations — with scenario modelling.
- **Portfolio rebalancing:** Drift analysis against target allocation, trade recommendations to rebalance, IPS (Investment Policy Statement — see Extension 6 for a full explanation) constraint check before recommending any trade.
- **Client reporting:** Quarterly and annual performance reports in the adviser's branded template.
- **Tax-loss harvesting:** Identifies positions with unrealised losses that could be realised to offset gains, with wash-sale rule compliance check.

**Command:**
```
/client-review [client name]   — Client meeting preparation document
```

---

#### Practice Exercise D: Wealth Management Workflow

**What you need:** Cowork with the wealth-management plugin installed. If client data is not connected, you can complete this exercise using hypothetical client details.

1. Create a hypothetical client profile: name, age (e.g., 58), occupation (e.g., retired executive), portfolio size ($2M), asset allocation (60% equities, 30% bonds, 10% alternatives), primary goal (fund retirement income of $120K/year for 30 years), and one constraint (no tobacco or weapons companies).

2. Ask Claude: *"Given this profile, does the current asset allocation align with the client's income objectives and risk tolerance? What is the probability of success — generating $120K/year for 30 years without portfolio depletion — at this allocation?"*

3. Ask: *"Which positions in a standard 60/30/10 allocation would violate the client's ESG constraint? What replacements would maintain the sector allocation while satisfying the constraint?"*

4. Ask: *"Draft a pre-meeting preparation note for a quarterly review with this client. Include: portfolio performance context, three topics I should proactively raise, and two questions I should ask the client to check whether their objectives have changed."*

5. Ask: *"The client calls and says they want to move 20% of the portfolio to cash because they are worried about market volatility. How do I respond in a way that addresses their concern without being dismissive — and what do I need to document to comply with my fiduciary obligations?"*

**Target time:** 30 minutes.

---

#### Partner-Built Plugins

Two additional plugins are built and maintained by Anthropic's data partners, bringing their proprietary data directly into Claude workflows.

**LSEG Plugin** (built by LSEG)

Prices bonds, analyses yield curves, evaluates FX carry trades, values options, and builds macro dashboards using LSEG financial data and analytics. 8 commands covering fixed income, FX, equities, and macro analysis.

```bash
claude plugin install lseg@financial-services-plugins
```

**S&P Global Plugin** (built by S&P Global)

Generates company tearsheets, earnings previews, and funding digests powered by S&P Capital IQ data. Supports multiple audience types: equity research, IB/M&A, corporate development, and sales.

```bash
claude plugin install spglobal@financial-services-plugins
```

---

#### Making the Plugins Yours

The financial-services-plugins README is explicit: these plugins are starting points, not finished products. The real power comes when you customise them for your firm.

**Swap connectors.** Edit `.mcp.json` to point at your specific data providers. If your firm uses Bloomberg rather than FactSet, configure Bloomberg's MCP connector and deprioritise FactSet. If your firm has a proprietary deal database, your IT team can add a custom MCP server.

**Add firm context.** Drop your terminology, deal processes, and formatting standards into the skill files. If your firm calls comparable company analyses "trading comps" rather than "comps," update the skill file. If your IC memo requires a section on ESG factors, add it.

**Bring your templates.** Use `/ppt-template` to teach Claude your firm's branded PowerPoint layout. Every deck output — one-pagers, IC memos, earnings summaries — will match your style guide.

**Adjust workflows.** Modify skill instructions to match how your team actually does analysis. The plugin's skill files are plain Markdown — readable and editable without technical knowledge.

**Build new plugins.** Follow the standard structure (SKILL.md, commands/, .mcp.json) to build entirely new plugins for workflows the collection does not yet cover. Fork the repo, build your plugin, and submit a PR.

---

## The Excel ↔ PowerPoint Cross-App Workflow

The most powerful demonstration of Cowork's Excel capabilities is not any individual command but the cross-app orchestration that connects Excel analysis to PowerPoint deliverables.

**Scenario:** An equity research analyst has just run an earnings analysis on a company. She needs to send a client an updated model and a two-slide summary of the quarter. Previously: run the earnings update in Excel (45 minutes), then build the PowerPoint summary manually (30 minutes). Total: 75 minutes, plus transition time and the risk of transcription errors copying numbers from Excel to PowerPoint.

**With Cowork cross-app orchestration:**

She runs `/earnings [company] [quarter]` in Cowork. The plugin updates the Excel model with the new actuals, calculates the beats and misses against consensus, and flags the key drivers.

She then types: *"Build a two-slide summary of this earnings analysis for a client. Slide 1: headline financial metrics vs. consensus and prior year. Slide 2: three key takeaways and the impact on my price target. Use my firm's PowerPoint template."*

Claude carries the analysis context — the numbers, the beats, the key drivers — from the Excel model directly into PowerPoint, populates the slides, and formats them in the firm's branded template. The analyst reviews both the Excel model and the PowerPoint slides, makes any adjustments, and sends the client package.

Two separate 30–45 minute tasks become one continuous workflow.

---

> **🔑 CONCEPT BOX: Why the Cross-App Capability Is Architecturally Different**
>
> It is worth pausing on why this matters beyond the time saving.
>
> When you copy numbers from an Excel model to a PowerPoint slide manually, you introduce a point of failure: the numbers in the deck can become disconnected from the model. An updated model does not automatically update the deck. If you revise an assumption and re-run the model, you must remember to also update every slide that referenced the old numbers.
>
> When Cowork orchestrates the Excel-to-PowerPoint workflow, the PowerPoint is produced from the model in a single pass. There is no copy-paste step. The numbers in the deck correspond to the model as it stood when the agent produced the output — and if you need to revise, you run the workflow again. Consistency is structural rather than dependent on the analyst remembering to update every reference.
>
> This is what it means for an AI to act as an agent rather than an assistant. An assistant helps you do the task. An agent executes the workflow.

---

> **⚠️ ACCESS NOTE:** Practice Exercise 11 requires a Cowork Team or Enterprise subscription with the financial-analysis plugin and PowerPoint add-in enabled. If you are on a Claude Max plan or your organisation has not yet deployed Cowork, you cannot run this exercise as written. **Alternative for Max-plan users:** Complete steps 1 and 2 using Claude in Excel alone (install the financial-services-plugins via Claude Code if available), then manually copy the three data points to a PowerPoint slide. Compare the time and error risk of that manual approach to what steps 3–4 describe. That comparison is the lesson the exercise teaches.

#### Practice Exercise 11: Cross-App Orchestration

**What you need:** Cowork Team or Enterprise with the financial-analysis plugin installed and PowerPoint add-in access.

1. Run `/one-pager [company]` for any publicly listed company. Review the PowerPoint output. Check: are the financial figures sourced from the connected data provider or from Claude's training knowledge?

2. Now open the company's comps table in Excel (use the `/comps` command). Review the Excel workbook in Claude in Excel — use Control+Option+C to open the sidebar and ask: *"Is the EV/EBITDA formula in row 8 correctly structured? Show me the cell references."*

3. From within the same Cowork session, ask: *"Take the three most relevant data points from this comps analysis and add them to the one-pager I just generated as a 'Valuation Context' section."*

4. Note what happens: Claude carries context from the Excel comps to the PowerPoint one-pager without you switching applications or copying anything.

**The thing to observe:** The combination of Cowork plugin (generates the output) and Claude in Excel (interrogates and verifies it) is the production pattern for financial services work. Cowork orchestrates the workflow. Claude in Excel is where you audit the model.

**Target time:** 35 minutes.

---

# Part Three: Extending the Finance Plugins for Your Enterprise

---

## The Eleven Extension Areas

The generic plugins cover workflows common across financial organisations. They do not encode what makes your firm's analysis distinctive. The following eleven extensions address the most consistently identified gaps across corporate banking, investment management, FP&A, and treasury. Each follows the same structure as Chapter 16's SKILL.md writing guidance: Persona, Questions, Principles.

---

> **📊 CONCEPT BOX: Variance Analysis (Full)**
>
> Variance analysis compares actual results against a plan (budget or forecast) or prior period to explain *why* performance differed.
>
> **Volume variance:** Difference explained by selling more or fewer units than planned.
> **Price variance:** Difference explained by selling at a higher or lower price.
> **Mix variance:** Difference explained by a different product mix — even if total volume and average price were on plan, a shift toward lower-margin products reduces profitability.
>
> **Example:** Budget: 1,000 units at $100 = $100,000. Actual: 950 units at $103 = $97,850. Revenue variance: −$2,150. Volume component: 50 fewer units × $100 = −$5,000. Price component: 950 units × $3 upside = +$2,850. Total: −$2,150. A complete variance analysis always shows these components separately.

---

### Extension 1: Credit Risk Framework

**What the generic plugin lacks.** Standard credit metrics without your institution's sector leverage thresholds, management quality assessment protocols, or loss-history-derived escalation conditions.

**What the extension adds.** Your firm's actual credit methodology — the specific leverage thresholds per sector, the five ratios on the first page of every credit file, the signals your experienced credit officers read as proxies for management quality.

---

> **📊 CONCEPT BOX: Key Credit Ratios**
>
> **Interest Coverage Ratio:** EBIT ÷ Interest Expense. How many times operating profit covers interest payments. Below 2.0× is stressed; below 1.0× means operating income cannot cover interest.
>
> **Net Debt / EBITDA:** Leverage measure. Debt minus cash, divided by EBITDA. Above 4.0× is typically considered highly leveraged for most industries.
>
> **DSCR (Debt Service Coverage Ratio):** Cash available for debt service ÷ total debt service (principal + interest). Below 1.0× means insufficient cash to meet debt obligations.
>
> **Working Capital Ratios:**
> - **DSO (Days Sales Outstanding):** (Receivables ÷ Revenue) × 365. How quickly customers pay.
> - **DPO (Days Payable Outstanding):** How long the company takes to pay suppliers.
> - **DIO (Days Inventory Outstanding):** How long inventory sits before sale.
>
> **Cash Conversion Cycle:** DSO + DIO − DPO. A shorter or negative cycle means the company collects cash from customers before paying suppliers — a sign of strong working capital management.

---

**Key SKILL.md instructions to write:**
- Sector-specific leverage thresholds (cyclical sectors carry lower acceptable leverage than defensive sectors at the same credit grade)
- The five financial ratios required on the first page of every credit file, in your institution's format
- Management quality signals your experienced credit officers use as proxies for depth and reliability
- Non-negotiable escalation conditions: transaction size thresholds, heightened-risk sectors, borrowers with prior credit events

#### Practice Exercise 12: Credit Analysis SKILL.md

**What you need:** 30 minutes. No software required.

Apply the Method A interview framework to a credit scenario you have observed.

1. Describe a credit situation — real or hypothetical — where the outcome was better or worse than expected. Write 200 words.

2. Extract one credit signal from that situation. Write it as a SKILL.md instruction: *"When [condition], [action]."*

3. Identify the ratio or analysis that would surface that signal. Write it: *"Calculate [ratio] as [formula]. Flag as a concern if [threshold]."*

4. Write a five-instruction Principles section encoding the most important credit judgment calls you have seen made well or badly.

**The key learning:** A SKILL.md built from a real credit scenario encodes the judgment call that saved or cost money — not a textbook definition of credit analysis. The Method A interview framework (Chapter 16) applied to credit produces instructions that reflect how experienced credit officers actually think, not how the training manual says they should. A credit agent built on this material will ask the right questions. One built on generic ratios will calculate them correctly and miss what matters.

**Target time:** 30 minutes.

---

### Extension 2: Regulatory Reporting Automation

**What the generic plugin lacks.** Standard financial statements without your regulator's specific return formats, calculation methodologies, and submission workflows.

**What the extension adds.** Returns populated from connected data with regulator-defined calculations and a mandatory sign-off sequence before submission.

**Pakistan / SBP-specific note.** The State Bank of Pakistan's prudential regulations for banks and DFIs have specific requirements for capital adequacy reporting, liquidity coverage ratios, and large exposure limits. A custom SBP reporting skill encodes these formats, the quarterly submission timelines, and the materiality thresholds in SBP's Banking Supervision Department circular. Commands: `/finance:sbp-return`, `/finance:car-report`, `/finance:lcr-report`.

---

> **📊 CONCEPT BOX: Regulatory Capital Ratios**
>
> Bank regulators require banks to hold minimum capital relative to their risk-weighted assets.
>
> **CET1 Ratio (Common Equity Tier 1):** Highest quality capital (ordinary shares + retained earnings) as a % of risk-weighted assets. Basel III minimum: 4.5% plus 2.5% conservation buffer. Most large banks target 11–14%.
>
> **Total Capital Ratio:** All regulatory capital tiers as a % of risk-weighted assets. Minimum 8% under Basel III.
>
> **Leverage Ratio:** Tier 1 capital as a % of total (non-risk-weighted) exposures. Backstop measure. Minimum 3%.
>
> **Why this matters for extensions:** Capital ratio calculations are highly specific to each regulator's Basel III implementation. SBP rules differ from the Fed's DFAST requirements and from the EBA's CRR/CRD implementation. A regulatory reporting agent applying the wrong methodology produces a materially incorrect filing.

---

**United States — specific note.** The US landscape distributes oversight across multiple regulators. The correct extension depends on institution type.

**Commercial banks** file the Call Report (FFIEC CDR) quarterly. Large holding companies additionally file the FR Y-9C with the Federal Reserve. The SKILL.md maps your chart of accounts to the FFIEC taxonomy (schedules RC, RC-B, RC-C, RC-E, RC-K, RC-L, RC-R, and others per your activities) and the quarterly submission calendar.

**Broker-dealers** file the FOCUS Report under SEC Rule 17a-5. The SKILL.md encodes the net capital calculation under Rule 15c3-1 and the customer reserve formula under Rule 15c3-3.

**SEC-registered investment advisers** file Form ADV — Part 1 annual update via IARD, due within 90 days of fiscal year end. The SKILL.md encodes the regulatory AUM calculation and the material change assessment process.

**US publicly listed companies** file: 10-K (annual, due 60/75/90 days post fiscal year-end by filer category), 10-Q (quarterly, 40/45 days), and 8-K (current reports, 4 business days). Commands: `/finance:10k-draft`, `/finance:10q-draft`, `/finance:8k-draft`.

**DFAST/CCAR stress-tested banks** require nine-quarter projection modelling and capital plan narratives for institutions above the relevant asset thresholds.

**Non-negotiable governance principle:** No filing leaves without General Counsel or CCO sign-off. SEC filings additionally require SOX Section 302/906 certifying officer certification. This is an unconditional escalation condition in every regulatory reporting SKILL.md.

---

### Extension 3: Treasury and Cash Management

**What the generic plugin lacks.** Neither the knowledge-work finance plugin nor the financial-services suite addresses treasury operations — the specialist function that manages daily cash positioning, foreign currency exposure, hedging programme compliance, and intercompany loan administration. These workflows require knowledge of the firm's specific banking relationships, treasury policy constraints, and intercompany structure that no generic plugin can infer.

**What the extension adds.** A treasury management skill that knows your organisation's actual cash structure — which banks hold which accounts, what the sweep mechanics are, what minimum operating balances are required by currency — and applies your treasury policy when monitoring FX exposures and hedging positions.

---

> **📊 CONCEPT BOX: FX Hedging**
>
> FX hedging uses financial instruments to reduce losses from currency movements. A US company with European revenue in euros faces the risk that the dollar strengthens and those euro payments are worth less in dollar terms. A hedge locks in or floors the exchange rate.
>
> **Forward contract:** Sell €1M forward at today's six-month forward rate, guaranteeing the dollar amount to be received in six months. No premium, but you give up upside if the euro strengthens.
>
> **Currency option:** Right (not obligation) to buy or sell at a fixed rate. More flexible than a forward — you can let the option expire if the rate moves in your favour. Costs a premium.
>
> **Cross-currency swap:** Exchange of principal and interest in two currencies. Used for longer-duration exposures and intercompany loans in different currencies.
>
> **Treasury policy** specifies which exposures must be hedged, by how much (hedging ratio), at what tenor (duration), and using which instruments. Without this policy encoded in the SKILL.md, a treasury agent applies generic logic that may violate the firm's actual risk mandate or board-approved policy.

---

**What the extension enables in practice.** A treasury analyst starts Monday morning by asking the agent: "What is our net FX exposure by currency as of Friday close, and which exposures are outside our policy hedging ratios?" Without the extension, this requires pulling data from four banking portals and calculating manually. With the extension connected to your treasury management system and banks via MCP, the answer arrives in seconds — and the agent flags which positions require new hedges to be placed before market open.

**Key SKILL.md instructions to write:**

- **Hedging policy rules:** Which exposure categories are hedged (committed transactions only vs. forecast exposures), minimum exposure size triggering a hedge, acceptable instruments by exposure type, and maximum tenor for each instrument class
- **Banking relationship structure:** Which banks hold which accounts, which currencies, sweep mechanics (overnight sweeps, notional pooling, zero-balance accounts), and minimum operating balances by currency and account
- **FX rate source for valuation:** Whether positions are valued at mid-market, bid/offer, or a specific fixing (e.g., ECB daily reference rate) — may differ from the rate used in management accounts
- **Intercompany loan structure:** Which entities lend to which, the currencies and interest rates, the transfer pricing methodology, and the maturity schedule

---

#### Practice Exercise 13: Treasury Exposure Mapping

**What you need:** 20 minutes. No software required. This is a preparation exercise for building the extension.

1. List every currency your organisation has material cash flows in (receivables, payables, payroll in foreign locations, intercompany transfers).

2. For each currency: what is the approximate monthly gross exposure? Is it hedged? If yes, using what instrument and at what ratio?

3. Identify the three most significant gaps between your current hedging programme and your written treasury policy (or, if no written policy exists, between current practice and best practice).

4. Write these three gaps as SKILL.md escalation conditions: *"When [situation], flag for treasury manager review before proceeding."*

**The key learning:** A treasury extension built without a completed exposure map will handle the obvious positions and miss the ones nobody thinks about until they cause a problem — the intercompany loan that creates an unhedged FX position, the zero-balance account that sweeps into a currency you thought was flat. This exercise is not the extension; it is the foundation the extension is built on. The 20 minutes here determines whether the extension is comprehensive or merely plausible.

**Target time:** 20 minutes.

---

### Extension 4: FP&A Planning and Forecasting Methodology

**What the generic plugin lacks.** The variance analysis command computes variances and decomposes them into drivers — but it does not know your planning cycle. It does not know your annual budget timetable, how your rolling forecast works, what variance magnitude triggers a formal reforecast versus a commentary note, or what the CFO's preferred bridge format is. These are the conventions that determine whether the variance output is immediately usable or requires significant reformatting before it can go to leadership.

**What the extension adds.** A planning and forecasting skill that applies your organisation's specific conventions: the volume/price/mix bridge format your CFO expects, the reforecast trigger thresholds, the seasonal adjustment factors for each P&L line, and the forward-looking disclaimer language appropriate for your IR disclosure framework.

**The practical difference.** A generic variance report shows that revenue is $2.3M below budget. Your CFO's preferred bridge format shows: volume shortfall $3.1M, price offset $0.8M — and explicitly labels whether each driver is within or outside management's control. The extension encodes this format so the output is CFO-ready rather than analyst-ready.

**Key SKILL.md instructions to write:**

- **Variance bridge format:** Specify the exact bridge your CFO expects — whether revenue variances must always be split between volume, price, and mix components; whether cost variances must distinguish volume-driven (higher because activity was higher) from rate-driven (higher because unit costs increased); the preferred presentation order and labelling convention
- **Reforecast policy:** The variance magnitude (in absolute dollars and as a percentage of budget) that triggers a formal reforecast submission vs. a commentary note; which lines trigger at which thresholds (revenue thresholds are typically lower than operating expense thresholds); the submission timeline for formal reforecasts
- **Seasonal adjustment factors:** Which P&L lines have known seasonal patterns (e.g., marketing spend peaks in Q4, revenue dips in Q1); the adjustment factor for each; and the reasoning so the agent can explain seasonal adjustments in narrative form rather than treating them as unexplained variances
- **Forward-looking statement standards:** The standard disclaimer language your IR team requires on any document containing forecasts; whether the agent should apply it automatically to all forward-looking outputs or flag for manual review

---

#### Practice Exercise 14: Variance Bridge

**What you need:** Your three-statement model from Exercise 4, or any simple P&L with a Budget and Actuals column.

1. Add a Budget column: revenue $500K, gross margin 45%, operating expenses $150K. Actuals: revenue $465K, gross margin 43%, operating expenses $158K.

2. Ask Claude in Excel: *"Run a variance analysis between the Budget and Actuals columns. Show $ and % variance for each line. Identify the three largest drivers of the net income variance."*

3. Ask: *"Split the revenue variance into a volume component and a price component. Assume budget was 5,000 units at $100 each, actual was 4,650 units at $100 each."*

4. Ask: *"Write a three-sentence narrative for the CFO explaining this variance."*

5. Edit the narrative: replace any accounting jargon with plain language. Note the changes you make.

6. Now write a SKILL.md instruction encoding your preferred bridge format: *"When presenting revenue variances, always decompose into volume, price, and mix components. Identify whether each component is within management control. Present in [your preferred order] with $ impact first, % impact second."*

**The key learning:** The discipline this exercise builds is not variance calculation — Claude will always calculate variances correctly. It is the CFO-ready framing: knowing which components to name, how to sequence them, and how to translate the numbers into the language of decisions rather than the language of accounting. Step 6 is the most important step. The SKILL.md instruction you write encodes this framing permanently, so every variance report the agent produces is already formatted the way your CFO expects it.

**Target time:** 30 minutes.

---

### Extension 5: Mergers and Acquisitions Institutional Memory

**What the generic plugin lacks.** The investment-banking plugin knows how to build a comps table and draft a CIM. It does not know your firm's specific deal experience — the leverage thresholds your deal teams have learned to apply sector by sector, the earnout structures your firm has historically accepted or refused, the counterparty relationships that require wall-crossing approval before anyone calls a potential buyer, or the three due diligence questions your senior partners always ask in the first management meeting. This is the difference between a structurally correct M&A analysis and one that reflects how your firm actually does deals.

**What the extension adds.** An M&A institutional memory skill that encodes your firm's transaction history and deal judgment as reusable instruction. When any banker on your team invokes the deal-related commands, they get outputs calibrated to your firm's standards — not a generic approximation of Wall Street conventions.

**Why this extension has disproportionate value.** M&A deal execution is where analyst errors have the highest consequence. A comparable company analysis that uses the wrong peer group, a teaser that frames the wrong competitive positioning, or a buyer list that misses a strategic acquirer — these are not abstract quality lapses. They affect deal terms, timelines, and outcomes. Institutional memory encoded in a skill file means new analysts apply the judgment of experienced ones from day one.

---

> *For LBO mechanics — sources and uses, debt schedule, IRR and MOIC calculations — see the **LBO Model concept box** in the financial-analysis plugin section (Plugin 1) earlier in this chapter. The M&A institutional memory extension does not change how an LBO model works; it adds your firm's specific entry multiple discipline, preferred leverage ratios by sector, and deal structure history on top of that foundation.*

---

**Key SKILL.md instructions to write:**

- **Valuation discipline:** The minimum comparable set required before stating an indicative valuation range (e.g., "a minimum of six comparable transactions within the past three years and five trading comparables"), the floor conditions for a DCF (e.g., "never use a terminal growth rate above GDP plus inflation in a mature sector"), and the sectoral leverage thresholds your team applies — these protect against the junior analyst who builds a technically correct model with a heroic terminal growth assumption
- **Deal structure preferences:** The security types your firm has historically preferred (common equity vs. preferred vs. convertible), typical leverage ratios by sector based on your deal history, earnout mechanics your firm has accepted and the conditions under which they are appropriate, and — critically — earnout structures your firm has refused and why (often because of post-close management incentive misalignment)
- **Counterparty relationship protocols:** Which potential buyers or sellers are subject to relationship flagging before outreach — existing clients, companies where a conflict of interest might exist, regulated entities requiring regulatory clearance — and the routing path for relationship approval
- **Confidentiality and wall-crossing:** The specific compliance protocol for approaching a potential buyer who may be a current counterparty on another transaction: who must be notified, what Chinese Wall procedures apply, and the minimum conditions before a banker is permitted to have a substantive conversation

**SKILL.md tone guidance:** M&A deal judgment is not rules-based — it is pattern recognition accumulated over dozens of transactions. The skill file should encode the patterns, not the rules. Rather than writing "always do X," write "when you observe [condition], experienced deal teams at this firm have typically found [approach] produces better outcomes, because [reason]." That framing is more accurate about what institutional memory actually is, and it teaches new analysts rather than just constraining them.

---

### Extension 6: Investment Policy Statement Compliance (Wealth Management)

**What the generic plugin lacks.** The wealth-management plugin knows how to generate a client meeting prep document, run a rebalancing analysis, and produce a performance report. It does not know that Client A has a 20% maximum in any single equity, that Client B prohibits tobacco and weapons, that Client C is in a restricted period that prevents trading in their employer's stock, or that Client D's IPS requires a minimum 30% allocation to fixed income regardless of market conditions. Without these constraints, every portfolio recommendation is analytically sound and potentially non-compliant.

**What the extension adds.** A mandatory IPS compliance layer that runs before any portfolio recommendation reaches the client — verifying IPS constraints, flagging violations, documenting the compliance check, and routing edge cases where a constraint appears to conflict with client interests to advisor judgment. The compliance check is not optional and not skippable. It is the first output of every recommendation workflow.

**Why automated IPS compliance matters beyond efficiency.** A compliance failure in a wealth management context is not a process error — it is a potential regulatory violation and a client relationship risk. An RIA that recommends a portfolio that violates a client's IPS, even inadvertently because an analyst forgot a constraint, has a problem the firm must document, disclose, and potentially remediate. An automated IPS check that runs every time, with every recommendation, eliminates the "I forgot" failure mode. It does not replace advisor judgment — it ensures advisor judgment is applied where it is needed, not to routine constraint verification.

---

> **📊 CONCEPT BOX: What Is an Investment Policy Statement (IPS)?**
>
> An IPS is a document that defines the investment objectives, constraints, and governance for a client's portfolio. It is the contract between the advisor and the client on how the portfolio will be managed.
>
> **Standard IPS sections:** Investment objectives (return target, income requirements, time horizon), risk tolerance (maximum drawdown, volatility tolerance), constraints (prohibited securities, concentration limits, liquidity requirements, ESG screens), and governance (how changes to the IPS are authorised, review frequency).
>
> **Why IPS compliance is non-trivial:** A typical wealth management firm manages hundreds or thousands of client portfolios, each with a unique IPS. Remembering every constraint for every client is not a realistic expectation for a human advisor with a large book. The IPS compliance extension automates this: the client's constraints are encoded once and verified automatically with every recommendation.

---

**United States — specific note.** The RIA/broker-dealer distinction determines the standard of care and the documentation requirements.

**RIAs under the Investment Advisers Act** are fiduciaries continuously. The SKILL.md must encode:
- Every recommendation must be traceable to specific client objectives and risk tolerance stated in the IPS
- Every conflict of interest must be identified and disclosed before the recommendation is made, not after
- Record retention under Rule 204-2: five years for advisory contracts, correspondence, and recommendation records; three years for client account records
- A mandatory conflict-of-interest check as part of every recommendation workflow — not as a one-time annual disclosure but as a per-transaction verification

**Broker-dealers under Regulation Best Interest (Reg BI)** must satisfy four written obligations. The SKILL.md encodes each as a compliance gate:
- **Care obligation:** Reasonable diligence, care, and skill appropriate for the specific recommendation. The compliance check verifies that the recommended product or strategy is appropriate for the client's stated profile.
- **Conflict of interest obligation:** Identify and disclose material conflicts, and mitigate or eliminate those that cannot be disclosed. The check flags any potential conflict between the recommendation and the firm's compensation structure.
- **Disclosure obligation:** Form CRS (Client Relationship Summary) at relationship initiation and on material changes. The skill tracks Form CRS status and flags clients who have not received a current Form CRS before any recommendation is made.
- **Compliance obligation:** Written supervisory procedures that are reasonably designed to achieve compliance with Reg BI. The SKILL.md encodes the supervision workflow for each recommendation type.

Add a `/reg-bi-review` command that generates a Reg BI compliance checklist for any recommendation, documenting how each of the four obligations has been satisfied. This documentation is the supervisory record the firm must maintain.

**Key SKILL.md instructions to write:**

- **Client constraint database structure:** How each client's IPS constraints are encoded — the format for concentration limits (hard cap vs. target vs. floor), the taxonomy for excluded securities (individual securities vs. sectors vs. ESG screens), the format for liquidity requirements, and how restricted period rules are handled
- **Constraint verification logic:** The sequence in which constraints are checked — hard caps first (violation is never permissible), then concentration targets (violation requires advisor sign-off), then screening exclusions (violation requires client waiver), then liquidity requirements (violation triggers flagging for senior advisor review)
- **Edge case routing:** The specific conditions that require advisor judgment rather than automated compliance — when a constraint appears to conflict with the client's stated return objective, when a market event has caused a position to breach a concentration limit through appreciation rather than trading, when a client requests a trade that would violate their own IPS
- **Documentation standards:** The minimum documentation required for every recommendation — the IPS constraint check result, the advisor's confirmation, and — for any case requiring judgment — the advisor's written rationale. This documentation is not optional; it is the evidence of fiduciary compliance in any regulatory examination or client dispute

---

### Extension 7: Sector-Specific Valuation Conventions

**What the generic plugin lacks.** The financial-analysis plugin builds technically correct DCF and comps models, but it applies general-purpose conventions. It does not know that banks are never valued on EV/EBITDA, that real estate analysts use cap rates and NAV rather than earnings multiples, or that a growth-stage software company trading at 15× revenue is not expensive if its NRR is 135%. Sector-specific valuation errors are not arithmetic errors — they are the wrong framework applied to the right numbers.

**What the extension adds.** A sector valuation skill file that encodes the primary and secondary metrics for your industry, the adjustments that are standard in your sector but non-obvious to a generalist, and the ranges that are normal versus distressed versus stretched in your market. When a professional applies the comps or DCF commands, the sector skill fires automatically and ensures the output reflects how that industry is actually analysed, not how a generalist would analyse it.

**The problem this solves concretely.** A healthcare analyst using the generic comps command gets a table with EV/EBITDA and P/E multiples. But pre-commercial biotech companies have no EBITDA and no earnings — the correct metrics are EV/pipeline asset, development-stage risk-adjusted NPV, and cash runway. The sector extension teaches this. Without it, the comps table is structurally correct and professionally useless.

---

> **📊 CONCEPT BOX: Net Interest Margin (NIM) and Bank Valuation**
>
> **NIM:** (Interest Income − Interest Expense) ÷ Average Earning Assets. The primary bank profitability metric. A 2.5% NIM is typical for large commercial banks; community banks often show 3–4%.
>
> **Why banks use P/B not EV/EBITDA:** Interest expense is a core operating cost for a bank, not a financing cost — so EBITDA is meaningless. Banks are valued on **Price-to-Book**: share price ÷ book value per share. A bank trading at 1.5× book is worth 1.5 times its net assets.
>
> **ROTE (Return on Tangible Equity):** Net Income ÷ Average Tangible Equity. The profitability measure that justifies a premium P/B. A bank with ROTE above its cost of equity should trade above 1× book.

---

**Key sector skill files to write:**

*Banking:* Price-to-Book and ROTE as primary metrics; NIM and credit cost as the two value drivers that explain most of the P/B variation; efficiency ratio (non-interest expense ÷ revenue) as the operational benchmark; Basel capital framework governing how leverage affects the denominator in all ratio calculations. For Pakistani banks: SBP's specific capital adequacy framework, the NPL ratio conventions, and the spread income dynamics that differ from Western markets.

*Real estate:* NAV per share as the primary valuation metric; cap rate methodology by property type (office, retail, industrial, residential) and geography; discount-to-NAV as the entry/exit signal; FFO and AFFO as the cash generation metrics that replace earnings for REITs; LTV and ICR as the debt capacity metrics that constrain distribution capacity.

*Technology (growth stage):* EV/NTM Revenue as the primary trading multiple; ARR growth rate and Net Revenue Retention (NRR) as the two quality indicators that determine whether the multiple is justified; SBC treatment in the EBITDA bridge (should always be included as a cash cost when assessing normalised profitability); Rule of 40 (revenue growth % + EBITDA margin %) as the standard health check.

*Energy:* Reserve-adjusted metrics (EV/BOE proved reserves, EV/BOE proved-and-probable) alongside standard EBITDA multiples; the commodity price deck used (analyst's own deck vs. strip pricing) as a material disclosure in every valuation; decommissioning liability treatment and its effect on enterprise value; production decline curves as a fundamental input to any DCF.

*Healthcare / Pharmaceuticals:* For commercial-stage companies: standard EV/EBITDA with pipeline NPV as an additive layer. For pre-commercial biotech: risk-adjusted NPV of pipeline assets as the primary metric; probability of technical success (PTS) by development stage; cash runway as the non-negotiable constraint that determines whether the NPV can be realised.

**SKILL.md structure for a sector extension:** One section encoding the primary metric with its calculation formula and the normal range in your sector. One section encoding the secondary metrics in priority order. One section listing the standard adjustments — items that are always added back, always subtracted, always disclosed separately. One section encoding the red flags specific to your sector (for banks: rapid loan growth without margin expansion; for SaaS: NRR declining toward 100%; for energy: capex-to-depreciation ratio below 1.0×).

---

### Extension 8: Board and Investor Relations Pack Automation

**What the generic plugin lacks.** Board packs and investor relations materials are among the most governance-sensitive documents a finance team produces. A generic plugin can generate a financial summary, draft management commentary, and format a presentation — but it cannot enforce the approval workflows, legal review gates, and disclosure obligations that govern these materials. An IR pack distributed without Reg FD compliance is not just a poor output; it is a regulatory violation.

**What the extension adds.** A board and IR skill that encodes your specific governance requirements — who reviews what, in what sequence, before anything is distributed — alongside the content standards for each document type (board pack, earnings release, investor presentation, earnings call script). The skill also encodes the mandatory disclosure language that must appear in forward-looking documents.

**The governance architecture the skill must encode.** Every output type requires a different review path. A board pack goes to the CFO, then the Audit Committee Chair before distribution to the full board. An earnings release goes to CFO → General Counsel → CEO → external auditors for comfort letter → disclosure committee sign-off. An earnings call script goes to CFO → General Counsel (Reg FD review) → external securities counsel (if guidance is being revised) → CEO. The skill file must encode all of these sequences as conditional routing rules — not as guidelines, but as non-negotiable gates that appear as compliance headers on every draft.

**Pakistan — specific note.** The Securities and Exchange Commission of Pakistan (SECP) requires listed companies to disclose price-sensitive information promptly through the Pakistan Stock Exchange (PSX). The SKILL.md encodes PSX's Material Information disclosure framework: events requiring immediate notification (regulatory action, significant contracts above the PSX materiality threshold, management changes at board or CEO level), the 24-hour filing window, and the requirement that investor communications are simultaneously published on the company's website. The SECP's Code of Corporate Governance also governs board pack content — specifically the requirement for independent directors to receive board papers at least seven days before meetings.

**United States — specific note.** Four legal obligations shape every US IR output.

**Regulation FD:** Prohibits selective disclosure of material non-public information. The SKILL.md must include a mandatory MNPI screen as the first step in every draft review: any output containing information not yet publicly disclosed routes to the General Counsel before distribution. Non-optional. The penalty for violation is an SEC enforcement action against the company and potentially individual executives.

**PSLRA safe harbour language:** Every section with forward-looking statements must include your company's standard safe harbour disclaimer referencing material risks in your most recent 10-K. The agent applies this automatically — it does not wait for the human to remember to add it.

**Earnings call script governance:** The mandatory review sequence is: agent draft → CFO review → General Counsel Reg FD review → external securities counsel if guidance is being revised → CEO sign-off. No script proceeds to the IR team without this sequence completed and documented.

**8-K trigger awareness:** The SKILL.md encodes the events that trigger an 8-K filing (SEC Items 1.01–9.01) and routes any IR communication referencing such events immediately to legal. An agent that drafts a press release about a material contract without triggering the 8-K review is creating legal exposure, not saving time.

**Key SKILL.md instructions to write beyond the US/Pakistan regulatory requirements:**

- Board pack structure and content standards: financial summary format, management commentary structure, KPI dashboard layout, and the specific metrics your board and Audit Committee track
- The materiality thresholds your organisation uses for requiring board-level reporting of individual items
- Tone and language standards: the difference between the formal register required for regulatory filings and the more accessible language appropriate for investor presentations
- The quarterly calendar for each document type: when drafting begins, when each review gate occurs, and the hard deadline for each deliverable

---

### Extension 9: Multi-Entity and Intercompany Consolidation

**What the generic plugin lacks.** Multi-entity consolidation is one of the most technically complex recurring tasks in corporate finance. The knowledge-work finance plugin can generate a P&L and balance sheet for a single entity. It cannot consolidate five entities across three currencies, apply different consolidation methods to each (full consolidation vs. equity method vs. proportionate), eliminate intercompany transactions that exist in three different ledger systems, and translate the result into the group's reporting currency using the correct rates. This is institutional knowledge encoded in spreadsheets, policies, and the heads of two or three accountants who have been running the consolidation for years.

**What the extension adds.** A consolidation skill file that encodes your specific group structure — every entity, its ownership percentage, its functional currency, its consolidation method, and its fiscal year alignment — along with the complete intercompany elimination matrix and the foreign currency translation rules your group applies. When the consolidation agent runs, it applies your actual methodology rather than a generic one.

**Why this extension carries disproportionate risk if wrong.** A consolidation error in the group accounts is not a footnote error — it flows into revenue, EBITDA, total assets, and net assets simultaneously. If the intercompany elimination rules are incomplete (e.g., the Singapore entity's intercompany interest income is not eliminated against the UK entity's interest expense), the group reports revenue and profit that do not exist. The extension must be built carefully, tested against historical consolidations before live deployment, and reviewed by the group controller before any automated output is used in financial statements.

**Key SKILL.md instructions to write:**

- **Group structure:** A complete entity table — entity name, jurisdiction, functional currency, ownership percentage, consolidation method (full consolidation for >50% owned subsidiaries, equity method for 20–50% associates, proportionate consolidation for joint ventures where applicable), and fiscal year end date if it differs from the group's
- **Intercompany elimination matrix:** Which entities trade with each other (intercompany revenue and cost of sales), which entities have intercompany loans and the interest rates on them, which entities have management fee arrangements, and the cut-off date after which intercompany transactions are matched — eliminations that fail to match due to timing differences must be flagged, not silently dropped
- **Foreign currency translation methodology:** Closing rate for balance sheet items, average rate for income statement items, and the treatment of the resulting translation difference (OCI under IFRS and US GAAP, but with different detailed requirements); which rate source is used (central bank rates, group treasury rates, or Bloomberg/Reuters fixing); and whether non-controlling interest is translated at historical or current rate
- **Non-standard fiscal year end treatment:** If any subsidiary has a different year-end, the lag period permitted for inclusion without a special close, and the adjustments required for material transactions in the gap period
- **Goodwill and purchase price allocation (PPA) tracking:** For each acquired entity, the original acquisition date, purchase price, goodwill recognised, and any PPA adjustments that amortise through the group income statement — this is often held in a spreadsheet outside the ERP and is the most common source of consolidation errors

**Practice note.** Before building this extension, map the consolidation manually for one quarter — listing every intercompany elimination on a piece of paper, with the source entity, receiving entity, amount, currency, and eliminating entry. This map is the raw material for the SKILL.md. An extension built without this map will eliminate the visible intercompany transactions and miss the ones nobody thinks about until an auditor finds them.

---

### Extension 10: Credit Portfolio Monitoring (Banking)

**Pakistan / SBP note.** SBP's prudential regulations define NPL classification — Substandard, Doubtful, and Loss — with specific provisioning requirements per category. The monitoring SKILL.md encodes these criteria, the quarterly NPL reporting format, and the large exposure limits (single borrower: 25% of net equity, group: 35%) as mandatory concentration checks.

**United States — specific note.** US banks operate under CECL (ASC 326) rather than IFRS 9. CECL requires lifetime expected credit losses from origination using forward-looking economic forecasts. The monitoring SKILL.md encodes: your CECL methodology (DCF, loss rate, vintage analysis, or PD/LGD), your economic forecast scenarios and weightings, your Q-factor overlay governance (authority, documentation, quarterly review process), and — for OCC or Fed-supervised banks — tracking of open MRAs and MRIAs as mandatory inputs to portfolio health assessment. CRA compliance requires tracking LMI lending activity automatically in the portfolio review output.

---

### Extension 11: Finance Agent for Non-Finance Stakeholders

**The gap.** The hardest finance communication problem is not writing an earnings release — it is explaining to a regional sales director why their territory is $340K below budget, in a way that connects to decisions they can actually make. Operational managers interact with financial data constantly: budget trackers, cost centre reports, variance commentary, capital approval requests, headcount reconciliations. The interface they receive was built by accountants for accountants. The result is that managers either ignore the numbers, escalate every question to finance, or make decisions based on misread reports.

A Finance Business Partner — a senior finance professional who sits close to an operational team and translates between accounting conventions and operational decisions — is the traditional solution. FBPs are expensive, scarce, and typically available only to the largest budget holders. A finance agent extension can replicate a significant fraction of this capability at scale.

**What the extension adds.** A Finance Business Partner persona baked into the SKILL.md: one that translates terminology automatically, always connects financial movements to operational causes, answers questions in the decision-relevant frame ("you have $47K of unbudgeted spend remaining this quarter; at current run rate you will exceed your envelope by $12K"), and routes accounting questions to the appropriate finance specialist rather than attempting to answer them in place of a professional.

**The translation layer must be explicit.** The SKILL.md cannot just say "use plain language." It must encode specific translations that are non-obvious:

- "Adverse variance" → "you spent more than planned" or "you generated less revenue than planned" (specify direction)
- "EBITDA" → "operating profit before depreciation — what the business earned from operations before accounting for asset wear-and-tear"
- "Accrual" → "an expense recognised in the accounts even though the invoice hasn't arrived yet, because the service was received this period"
- "Working capital" → "the cash tied up in your operation — what you've billed customers but not yet collected, plus inventory, minus what you owe suppliers"
- "Capital expenditure vs. operating expenditure" → "capex is money spent on assets that last more than a year (equipment, systems); opex is recurring costs. Capex shows up on the balance sheet and depreciates gradually; opex hits the P&L immediately"

Each translation should specify when it applies (what the manager is likely trying to understand) and what operational context to add (what the number means for their day-to-day decisions).

**The operational context rules are equally important.** The extension should encode: never present a financial result without naming its operational cause. Revenue below budget because of fewer orders (volume driver) requires a different response from revenue below budget because of a price discount (price driver). An agent that reports "revenue $340K adverse" without naming the cause forces the manager to ask a follow-up question they should not have to ask. The SKILL.md instruction: "When presenting a variance, always identify the primary operational driver in plain language. If the driver is unknown, say so explicitly and identify who in the organisation can determine it."

**Key SKILL.md instructions to write:**

- **Terminology translation table:** Every accounting term a manager is likely to encounter in your organisation's reports, with its plain-language equivalent and a one-sentence operational explanation
- **Decision-relevant framing rules:** For each common query type — budget status, cost overrun, headcount, capital request — the framing that connects the financial answer to the manager's actual decision (not "you have $47K remaining" but "you have $47K remaining; the threshold for requiring CFO approval on unbudgeted spend is $25K, so any single item above $25K requires a separate approval request")
- **Escalation routing:** Questions about accounting treatment → Finance Business Partner or controller. Questions about tax → Tax team. Questions about a specific accrual or journal entry → Controller. Questions about capital approval thresholds → CFO's office. The agent routes, does not improvise answers to technical accounting questions
- **Tone calibration:** The FBP persona is collaborative, not condescending. The SKILL.md should specify: assume the manager is commercially sophisticated even if they do not know accounting vocabulary; never imply that not knowing an accounting term is a gap; focus on what the numbers mean for their decisions, not on the accounting mechanics

**What this extension is not.** It is not a substitute for financial literacy training. A manager who understands the basics of a P&L and a budget tracker will use the agent better than one who does not. The extension handles the translation; it does not eliminate the need for the manager to understand what questions to ask.

---

## Prioritising the Extension Roadmap

**Where the pain is greatest.** For a corporate bank with a large credit portfolio: Extensions 10 or 1. For a multi-entity group with intercompany complexity: Extension 9. For a wealth manager with IPS-constrained portfolios: Extension 6.

**Where knowledge is most at risk.** The extension encoding expertise held by individuals who could leave creates the most durable institutional value.

**Where regulatory exposure is highest.** Regulatory reporting, client suitability, and credit risk classification carry compliance urgency that overrides other prioritisation criteria.

**Practical sequencing.** Run three extensions in parallel in the first quarter: one for the highest-volume workflow, one for the highest-risk compliance area, one for the knowledge most at risk. Sequence the remainder in quarters two and three.

---

#### Final Practice Exercise: Design Your Extension Roadmap

**What you need:** 30 minutes. A blank document.

1. Write one sentence describing your role and your organisation's finance function.

2. From the eleven extensions, identify the three most relevant to your context. For each: (a) the specific gap in the generic plugin that matters most in your context, and (b) the one SKILL.md instruction that would close the most important part of that gap.

3. Rank the three by pain, knowledge risk, and regulatory exposure.

4. Write a one-paragraph specification for the first extension: what the SKILL.md should do, what data sources it needs, and what three test scenarios would validate it.

This specification is the starting point of a real deployment.

**Target time:** 30 minutes.

---

## Chapter Summary

This chapter began with a distinction that runs through the entire chapter and through the architecture of AI in professional finance: the difference between an AI assistant embedded in a tool and an AI agent orchestrating across tools.

**Claude in Excel** is the assistant: a standalone Microsoft add-in that lives inside your workbook, providing general workbook intelligence (model comprehension, scenario testing, error debugging, model building) and six pre-built Agent Skills (Comparable Company Analysis, Discounted Cash Flow Model, Due Diligence Data Pack, Company Teaser, Earnings Analysis, Initiating Coverage Report). These Agent Skills connect to live market data through Claude in Excel's own connectors — S&P Capital IQ, PitchBook, and Morningstar — and produce professionally structured financial deliverables without requiring the Cowork platform. Skills 1–4 teach the general workbook intelligence layer; Skills 5–10 teach the Agent Skills individually, each with a worked example showing the professional scenario, the specific prompts, and the kind of analysis the skill produces.

**Excel via Cowork** is the agent: Claude operating across applications, carrying context from Excel analysis through to PowerPoint presentation in a single orchestrated workflow. The finance plugins in Cowork — the knowledge-work finance plugin for corporate finance teams and the financial-services plugin suite for investment professionals — provide domain-specific commands and passive skills that are architecturally different from Claude in Excel's add-in model. The Cowork data connectors (Daloopa, FactSet, Moody's, LSEG, S&P Global, PitchBook, Chronograph, MT Newswires, Aiera, Morningstar, and Egnyte) are separate from Claude in Excel's connectors and are configured by IT through the Cowork platform.

The two tools are not alternatives. They are complementary. The Cowork plugin generates the model; Claude in Excel is where you interrogate and verify it. Practice Exercise 11 demonstrated this combination explicitly: running a comps analysis via the Cowork financial-analysis plugin, then auditing the generated workbook using Claude in Excel's dependency tracing — two tools in one professional workflow.

The financial-services plugin suite covers five professional domains: financial-analysis (core), investment-banking, equity-research, private-equity, and wealth-management. Each sub-plugin has its own worked example, its own set of commands, and its own practice exercise (lettered A–D rather than numbered, because they are modular — readers install and complete the ones relevant to their professional context). Concept boxes are placed before the exercises that require them: the sell-side vs. buy-side box precedes the equity-research exercise; the IC Memo box precedes the private-equity exercise. The core plugin carries an LBO concept box at the point where the `/lbo` command is introduced.

The eleven enterprise extension areas cover the institutional knowledge generic plugins cannot provide. Extensions 1, 2, and 10 cover credit risk, regulatory reporting, and credit portfolio monitoring — including Pakistan/SBP prudential regulation and the full US regulatory taxonomy. Extensions 3 and 4 cover treasury and FP&A planning, each with a full description of what the generic plugin lacks, what the extension adds, and how to build the SKILL.md. Extension 5 covers M&A institutional memory — the deal judgment, leverage discipline, earnout preferences, and counterparty relationship protocols that distinguish your firm's transaction practice from a generic approximation — with a specific note on how to frame SKILL.md instructions as pattern recognition rather than rules. Extension 6 covers IPS compliance with a full IPS concept box, the US RIA/broker-dealer distinction (fiduciary standard vs. Reg BI's four obligations), and the constraint verification logic and documentation standards that constitute the compliance record. Extension 7 covers sector-specific valuation conventions across banking, real estate, growth technology, energy, and healthcare, including the SKILL.md architecture for encoding sector red flags. Extension 8 covers board and IR pack automation with full governance architecture, Pakistan/SECP and US/SEC legal obligations, and the review sequence requirements for each document type. Extension 9 covers multi-entity consolidation with the intercompany elimination matrix, foreign currency translation methodology, and the goodwill and PPA tracking requirement. Extension 11 covers the Finance Business Partner persona for non-finance stakeholders, including the explicit terminology translation table and the decision-relevant framing rules that distinguish this extension from simply "using plain language."

Extension prioritisation follows three criteria: where the operational pain is greatest, where institutional knowledge is most at risk, and where regulatory exposure is highest.

The practice exercises are designed to build capability progressively — model comprehension before scenario testing, the Agent Skills before the Cowork plugins, the plugin workflows before the SKILL.md authoring exercises that connect Claude's capabilities to your organisation's specific knowledge. Exercises 1–14 run sequentially through Parts One and Three; sub-plugin exercises A–D in Part Two are modular by professional role. Each numbered exercise includes a "key learning" or discipline statement that names the professional judgment skill the exercise develops, not just the technical task it trains. Exercise 11 (Cross-App Orchestration) carries an access note for Max-plan users who cannot run it directly, with an alternative comparison exercise that teaches the same architectural lesson.

Chapter 18 turns to the legal domain, where the governance requirements are stricter, the domain knowledge is even more specific to jurisdiction and practice area, and the stakes for systematic error are highest.

---

*Continue to Chapter 18: Legal and Compliance Domain Agents →*
