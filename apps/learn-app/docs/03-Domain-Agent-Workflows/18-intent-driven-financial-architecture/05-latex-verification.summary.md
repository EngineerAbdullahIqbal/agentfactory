### Core Concept

LaTeX Verification is the second of IDFA's four deterministic guardrails. It requires that every complex formula -- WACC, NPV, Terminal Value (Gordon Growth Model), and IRR -- be expressed in mathematical notation and verified for structural correctness before being committed to the model. Named Ranges (Guardrail 1) make formulas readable; LaTeX makes their mathematical structure **verifiable**. The key insight: errors that are invisible in a single line of Excel notation -- a missing tax shield, an absent growth factor, a period-0 investment included inside the NPV function -- become immediately obvious when the formula is rendered in standard mathematical notation with visible fractions, summation bounds, and isolated components.

### Key Mental Models

- **Readable is not the same as correct**: A formula can use perfect Named Range notation and still contain a structural error. LaTeX Verification catches the errors that pass Named Range Priority -- component omissions, unit mismatches, and incorrect mathematical relationships that look plausible in inline notation.
- **The four mandatory formulas**: WACC (check weights sum to 1.0, tax shield on debt only, consistent units), NPV (initial investment at period 0 subtracted outside the function), Terminal Value (numerator must include the (1+g) growth factor), and IRR (verified by confirming NPV equals zero at the computed rate -- no closed-form LaTeX exists).
- **Small formula errors, large financial consequences**: A 50 basis point WACC error from a missing tax shield moves a $100M deal valuation by $5M-$8M. The growth factor trap in Terminal Value understates value by approximately the growth rate percentage. The period-0 NPV trap can make unprofitable projects appear profitable.

### Critical Patterns

- The practical workflow: ask Claude to express a formula in LaTeX, then verify the structure yourself -- Claude provides the typesetting, you provide the verification judgement
- Three-part WACC check: weights sum to 1.0, tax shield on debt only, consistent units
- NPV period-0 check: initial investment subtracted outside the NPV function, never inside it
- Terminal Value growth check: numerator is FCF times (1+g), and denominator (WACC - g) must be positive

### Common Mistakes

- Assuming LaTeX Verification requires LaTeX software -- it simply means expressing the formula in mathematical notation by any means (pen, Markdown, Claude)
- Skipping verification for formulas that "look simple" -- WACC looks straightforward but the missing tax shield is the single most common consequential error in financial modelling
- Using the final-year FCF directly in the Terminal Value numerator without growing it by (1+g) -- a seemingly small omission that compounds to millions on large deals

### Connections

- **Builds on**: Lesson 4 established Named Range Priority (Guardrail 1) -- every formula reads as a business rule with zero coordinate references; this lesson adds the mathematical verification layer on top
- **Leads to**: Lesson 6 introduces Intent Notes (Guardrail 3) -- documenting the business intent behind each formula so that the LaTeX-verified, Named-Range-compliant formula carries a permanent audit trail
