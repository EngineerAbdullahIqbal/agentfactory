# Constitution Compliance Checklist

This checklist evaluates content against the **CoLearning Python & Agentic AI: The AI-Driven Way** project constitution (Version 2.2.0).

**Result**: Content must achieve **PASS** status on all critical items to proceed. Constitution compliance is a GATE — failures block progression regardless of weighted scores.

---

## Instructions

For each section, evaluate content and mark:

- ✅ **Pass** — Fully compliant with constitutional requirement
- ⚠️ **Partial** — Partially compliant but needs minor improvement
- ❌ **Fail** — Non-compliant, requires significant revision

**Critical Items** (marked with 🔴): ANY failure results in overall **FAIL** status.

---

## Section 1: Core Principles (11 Principles)

### Principle 1: AI-First Teaching Philosophy 🔴

**Requirement**: Every concept, example, and exercise demonstrates AI-assisted development as primary workflow.

- [ ] AI tools used throughout content (not just mentioned once)
- [ ] Code examples show both prompt/request AND AI-generated result
- [ ] Students explicitly taught to write effective prompts
- [ ] Traditional "manual coding first" approach rejected or reframed
- [ ] AI collaboration skills integrated into every exercise

**Evidence Required**: Quote specific examples showing AI-first workflow

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 2: Spec-Kit Methodology as Foundation 🔴

**Requirement**: Spec-Kit methodology introduced progressively and applied to projects.

- [ ] Spec-Kit concepts referenced appropriately for chapter placement
- [ ] Projects use Spec → Plan → Tasks → Implementation structure (where applicable)
- [ ] Students practice specification writing WITH AI (where applicable)
- [ ] Constitution, ADR, PHR concepts explained as real artifacts (where applicable)

**Evidence Required**: Note how Spec-Kit is applied or referenced

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 3: Modern Python Standards (3.13+) 🔴

**Requirement**: All code uses Python 3.13+ with mandatory type hints.

- [ ] Python 3.13+ syntax used (no legacy patterns)
- [ ] Type hints present on ALL function signatures (100% coverage)
- [ ] Modern syntax features demonstrated (match/case, structural patterns, etc.)
- [ ] No pre-3.10 type hint styles (e.g., Optional from typing module)
- [ ] Type safety validated (mypy or pyright checks mentioned or implied)

**Evidence Required**: Review all code blocks for type hints and modern syntax

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 4: Test-First Mindset 🔴

**Requirement**: Testing integrated early and practiced throughout (not relegated to late chapter).

- [ ] Testing concepts present (appropriate for chapter position)
- [ ] Significant code examples include corresponding tests (where applicable)
- [ ] Test-writing prompts shown alongside implementation prompts (where applicable)
- [ ] TDD workflow demonstrated: write test → fail → implement → pass (where applicable)
- [ ] Coverage expectations mentioned (critical functions 100%, overall >80%) (where applicable)

**Evidence Required**: Note testing integration (or explain why N/A for conceptual chapters)

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail / ⬜ N/A (conceptual chapter)

---

### Principle 5: Progressive Complexity with Clear Scaffolding 🔴

**Requirement**: Content difficulty increases gradually with appropriate scaffolding level.

- [ ] Scaffolding appropriate for chapter position:
  - Chapters 1-9: Heavy support
  - Chapters 10-30: Moderate support
  - Chapters 31-46: Minimal support
- [ ] Concepts introduced once, then referenced by name
- [ ] Explicit prerequisite chains documented or clear
- [ ] No forward references to unexplained concepts without "Chapter X covers this"
- [ ] Related concepts taught together, not scattered

**Evidence Required**: Assess complexity level and scaffolding appropriateness

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 6: Consistent Structure Across All Chapters 🔴

**Requirement**: Content uses shared infrastructure (skills, output styles, sub-agents) for consistency.

- [ ] Chapter/lesson follows identical structure from output-styles
- [ ] Python code follows identical formatting standards
- [ ] Exercises follow identical structure and approach (where applicable)
- [ ] Cross-chapter consistency maintained
- [ ] References same skills and constraints

**Evidence Required**: Confirm output style template adherence

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 7: Technical Accuracy and Currency (Always Verified) 🔴

**Requirement**: All technical claims verified, tools current, best practices demonstrated.

- [ ] Python 3.13+ version features verified
- [ ] Tool instructions tested (Claude Code, Gemini CLI, etc.) where applicable
- [ ] External links live and current (if present)
- [ ] Best practices demonstrated (PEP 8, Python idioms, modern patterns)
- [ ] Technical claims fact-checked and sourced
- [ ] Security practices demonstrated (no hardcoded secrets, error handling)

**Evidence Required**: Verify technical accuracy of all claims and code

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 8: Accessibility and Inclusivity (No Gatekeeping) 🔴

**Requirement**: Content welcoming and accessible to diverse learners.

- [ ] No assumed CS background (jargon explained on first use)
- [ ] No ableist language ("obviously", "simply", "just", "easy")
- [ ] Code examples include clear comments explaining intent
- [ ] Diverse example names/contexts; gender-neutral language
- [ ] Multiple explanation styles: text, code, analogies
- [ ] Platform-specific instructions where setup differs (Windows/Mac/Linux) if applicable
- [ ] Free/open-source alternatives provided if applicable

**Evidence Required**: Review for inclusive language and accessibility

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 9: Show-Then-Explain Pedagogy

**Requirement**: Teaching follows show code FIRST, then explain WHAT/HOW/WHY pattern.

- [ ] Working code presented before explanations
- [ ] WHAT the code does described (high-level overview)
- [ ] HOW it works explained (step-by-step execution)
- [ ] WHY design decisions made explained
- [ ] Variations and related patterns shown
- [ ] "Common Mistakes" section included (every chapter requirement)
- [ ] "AI Exercise" included (requirement starting Ch 3)

**Evidence Required**: Confirm show-then-explain pattern throughout

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Principle 10: Real-World Project Integration

**Requirement**: Projects reflect realistic development scenarios, not contrived exercises.

- [ ] Projects use real tools (git, virtual environments, package managers, CI/CD concepts) where applicable
- [ ] File organization matches professional conventions (src/, tests/, history/, .env) where applicable
- [ ] Projects publishable to GitHub with README, license, docs (where applicable)
- [ ] Integration with real APIs and data sources with error handling (where applicable)
- [ ] Deployment considerations addressed (where applicable)
- [ ] Projects span multiple chapters showing iterative development (where applicable)

**Evidence Required**: Assess realism of projects and examples

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail / ⬜ N/A (conceptual chapter)

---

### Principle 11: Tool Diversity and Honest Comparison

**Requirement**: Multiple AI tools covered with honest comparison, not single-tool lock-in.

- [ ] Multiple AI tools mentioned or covered appropriately for chapter
- [ ] Each tool's strengths and use cases explained objectively (where applicable)
- [ ] Common workflows demonstrated across tools (where applicable)
- [ ] Students encouraged to experiment and find preferences
- [ ] No vendor lock-in language; tools presented as options
- [ ] Fallback strategies when tools unavailable (where applicable)

**Evidence Required**: Assess tool diversity and objectivity

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail / ⬜ N/A (conceptual chapter or early foundation)

---

## Section 2: Book Gaps Checklist (Required Coverage by Chapter Type)

### For ALL Chapters (Regardless of Type) 🔴

- [ ] **Factual Accuracy**: All claims verified with inline citations (e.g., [Source, Year])
- [ ] **Field Volatility**: Rapidly-changing topics include maintenance triggers (e.g., "Review annually")
- [ ] **Inclusive Language**: No gatekeeping terms; diverse examples; gender-neutral; free alternatives
- [ ] **Accessibility**: Clear terminology with definitions; multiple explanation styles; content breaks; appropriate pacing
- [ ] **Bias & Representation**: Diverse perspectives; no stereotypes; inclusive references
- [ ] **Technical Accuracy**: All claims verified; best practices; no deprecated syntax/tools

**Evidence Required**: Review entire content for these universal requirements

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### For Technical Chapters (Code-Focused)

**If chapter contains code, ALL of the following MUST be checked:**

- [ ] **Code Security**: No hardcoded secrets; secure practices demonstrated; disclaimers for generated code
- [ ] **Ethical AI Use**: AI limitations framed; responsible use cases; potential biases addressed
- [ ] **Testing & Quality**: Every code example has tests; error cases handled; cross-platform verified
- [ ] **Deployment Readiness**: Environment setup; dependency management; troubleshooting; fallbacks
- [ ] **Scalability Awareness**: Real-world constraints mentioned (performance, memory, network)
- [ ] **Real-World Context**: Realistic scenarios with error handling, not toy problems
- [ ] **Engagement**: Opening hook; content breaks; realistic complexity progression; 5-7 min sections
- [ ] **Practicality**: Cross-platform setup; common pitfalls section; explicit environment requirements

**Evidence Required**: Review all code examples and exercises

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail / ⬜ N/A (non-technical chapter)

---

### For Conceptual/Narrative Chapters (Non-Code)

**If chapter is conceptual/narrative, ALL of the following MUST be checked:**

- [ ] **Evidence-Based Claims**: Assertions backed by data, research, examples; sources cited inline
- [ ] **Diverse Perspectives**: Multiple viewpoints; objections addressed; not monolithic narrative
- [ ] **Real-World Relevance**: Specific, concrete examples relevant to readers' context
- [ ] **Narrative Flow**: Engaging opening hook; natural progression; compelling storytelling
- [ ] **Reflection Prompts**: Thought-provoking questions; personal relevance to reader
- [ ] **Contextual Grounding**: Explains why NOW matters; historical parallels; forward-looking implications
- [ ] **Professional Polish**: No hype; realistic assessment of opportunities/risks; balanced tone
- [ ] **Accessibility**: Concepts explained with analogies; no jargon gatekeeping; 15-30 min reading time

**Evidence Required**: Review narrative structure and engagement

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail / ⬜ N/A (technical chapter)

---

### For Hybrid Chapters (Mixed Content)

**If chapter mixes code and narrative:**

- [ ] All items from "For ALL Chapters" checked
- [ ] Technical items checked for code-containing sections
- [ ] Narrative items checked for conceptual sections
- [ ] Clear section-type identification present

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail / ⬜ N/A (not hybrid)

---

## Section 3: Non-Negotiable Rules (ALWAYS/NEVER)

### What We ALWAYS Do 🔴

**Every item MUST be checked:**

- [ ] Use specialized skills and subagents appropriately
- [ ] Include type hints on every function without exception (technical chapters)
- [ ] Test all code before publication (technical chapters)
- [ ] Explain WHY, not just HOW (design decisions and reasoning)
- [ ] Provide working code examples with expected output (technical chapters)
- [ ] Use Python 3.13+ modern syntax (technical chapters)
- [ ] Include "Common Mistakes" section in every chapter
- [ ] Include "AI Exercise" in every chapter (starting Ch 3)
- [ ] Validate against Constitution before publication
- [ ] Assume readers know nothing (no gatekeeping)
- [ ] Show both prompt/request and AI result
- [ ] Encourage verification and iteration with AI tools

**Evidence Required**: Confirm all applicable "ALWAYS" rules followed

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### What We NEVER Do 🔴

**NONE of these items can be present:**

- [ ] ✅ No vague gatekeeping terms without explanation ("easy", "simple", "obvious")
- [ ] ✅ No untested or broken code
- [ ] ✅ No assumptions about reader knowledge or background
- [ ] ✅ No deprecated Python syntax
- [ ] ✅ No skipped type hints for "simple" functions
- [ ] ✅ No condescension to readers
- [ ] ✅ No hardcoded secrets, tokens, API keys, passwords
- [ ] ✅ No technical claims without verification
- [ ] ✅ No placeholder text or TODOs in content
- [ ] ✅ No contradictions with earlier chapters without explicit explanation
- [ ] ✅ No single AI tool presented as mandatory

**Evidence Required**: Confirm NONE of the "NEVER" violations present

**Verdict**: ⬜ Pass / ⬜ Fail (If ANY violation, automatic FAIL)

---

## Section 4: Domain Skills Application (The 9 CoLearning Skills)

### Skill Application Verification

Verify appropriate application of the 9 domain skills for chapter type:

**1. learning-objectives** 🔴

- [ ] Clear, measurable learning outcomes stated (Bloom's taxonomy)
- [ ] 3-4 learning objectives appropriate for content scope

**2. concept-scaffolding** 🔴

- [ ] Complex topics broken into progressive steps
- [ ] 3-4 core concepts per lesson (optimal cognitive load)
- [ ] Clear prerequisite chains

**3. exercise-pack**

- [ ] Effective practice exercises aligned with learning objectives
- [ ] Range of difficulty levels
- [ ] Clear prompts and model solutions

**4. assessment-architect**

- [ ] Meaningful quizzes, Quick Checks, or evaluations embedded
- [ ] Assessments test stated learning objectives
- [ ] Multiple Bloom's taxonomy levels

**5. technical-clarity** 🔴

- [ ] Clear, accessible explanations free of jargon gatekeeping
- [ ] Technical terms defined on first use
- [ ] Multiple explanation styles used

**6. concept-scaffolding**

- [ ] Content structure appropriate for book position
- [ ] Clear narrative continuity with previous chapters
- [ ] Cognitive load appropriate for scaffolding level

**7. ai-collaborate-teaching** 🔴

- [ ] AI tools effectively integrated as learning partners
- [ ] "Learning WITH AI" philosophy demonstrated
- [ ] AI used for understanding, not just code generation

**Evidence Required**: Note which skills applied and how

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

## Section 5: Output Style Compliance

### Output Style Template Adherence 🔴

**Required Elements (from `.claude/output-styles/lesson.md` or `.claude/output-styles/chapters.md`):**

- [ ] YAML frontmatter with required fields (sidebar_position, title, duration/reading time)
- [ ] H1 title matches frontmatter title
- [ ] Proper heading hierarchy (H2 main sections, H3 subsections)
- [ ] No skipped heading levels
- [ ] Opening hook present (2-3 paragraphs before main content)
- [ ] Appropriate word count (2,000-2,500 for technical; 1,200-2,500 for conceptual)
- [ ] Strong closing with reflection or transition
- [ ] Consistent formatting throughout

**Evidence Required**: Compare content structure to output style template

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

## Section 6: Structural Requirements

### File Organization and Naming 🔴

**Verify alignment with `specs/book/directory-structure.md`:**

- [ ] File path matches directory structure specification
- [ ] File naming conventions followed
- [ ] Content placed in correct part/chapter folder
- [ ] References to other chapters use correct paths

**Evidence Required**: Verify file path and organization

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

### Chapter Integration

**Content must integrate with book structure:**

- [ ] Builds on previous chapters with clear prerequisites
- [ ] Prepares for upcoming chapters (forward momentum)
- [ ] No contradictions with earlier content
- [ ] Cross-references valid and accurate
- [ ] Consistent with part-level narrative

**Evidence Required**: Assess integration with broader book context

**Verdict**: ⬜ Pass / ⬜ Partial / ⬜ Fail

---

## Final Compliance Verdict

### Critical Items Summary

**Count critical failures (🔴 items marked Fail):**

- Principle 1 (AI-First Teaching): ⬜ Pass / ⬜ Fail
- Principle 2 (Spec-Kit): ⬜ Pass / ⬜ Fail
- Principle 3 (Python 3.13+): ⬜ Pass / ⬜ Fail
- Principle 4 (Test-First): ⬜ Pass / ⬜ Fail
- Principle 5 (Progressive Complexity): ⬜ Pass / ⬜ Fail
- Principle 6 (Consistent Structure): ⬜ Pass / ⬜ Fail
- Principle 7 (Technical Accuracy): ⬜ Pass / ⬜ Fail
- Principle 8 (Accessibility): ⬜ Pass / ⬜ Fail
- Book Gaps (ALL Chapters): ⬜ Pass / ⬜ Fail
- ALWAYS Rules: ⬜ Pass / ⬜ Fail
- NEVER Rules: ⬜ Pass / ⬜ Fail
- Domain Skills Application: ⬜ Pass / ⬜ Fail
- Output Style Compliance: ⬜ Pass / ⬜ Fail
- Structural Requirements: ⬜ Pass / ⬜ Fail

---

### Overall Constitution Compliance Verdict

**✅ PASS** — All critical items pass; content may proceed to weighted evaluation

**⚠️ CONDITIONAL PASS** — Minor issues in non-critical items; address before final publication

**❌ FAIL** — One or more critical items failed; content MUST be revised before proceeding

---

## Evidence Summary

**Strengths (Constitution Compliance)**:

- [List specific areas where content excels in constitutional adherence]

**Violations or Gaps**:

- [List specific constitutional violations with evidence]

**Required Actions**:

- [Prioritized list of revisions needed for constitutional compliance]

---

## Notes for Evaluators

**How to Use This Checklist:**

1. **Read content completely first** before evaluating
2. **Work through checklist systematically** section by section
3. **Mark each item** with specific evidence from content
4. **Flag critical failures immediately** (🔴 items)
5. **Document specific violations** with quotes and line numbers
6. **Provide actionable recommendations** for each failure
7. **Determine overall verdict** based on critical items

**Remember:**

- Constitution compliance is a **GATE** — fails block all progress
- Be objective and evidence-based in assessments
- Cite specific passages for every verdict
- Prioritize critical items (🔴) first
- Provide clear, actionable guidance for revisions

---

**This checklist ensures rigorous constitutional compliance for all CoLearning Python book content.**
