# Chapter 14: The Enterprise Agentic Landscape — Gap Analysis & Lesson Plan

**Date**: 2026-02-27
**Manager Agent**: Phase 1 — Gap Analysis
**Chapter Path**: `apps/learn-app/docs/03-Domain-Agent-Workflows/14-enterprise-agentic-landscape/`
**Spec Source**: Inline chapter spec provided by user

---

## 1A. Spec Compliance Checklist

### Opening Epigraph
- **Spec requires**: Original epigraph: *"The enterprise doesn't have an AI problem..."*
- **Current draft**: Present in Lesson 01 (line 102) and chapter README (line 13)
- **Status**: ✅ MET

### Section: "The Year That Did Not Deliver"
- **Spec requires**: Narrative explaining 2024 optimism, Pilot Trap, knowledge transfer gap, what organisations actually deployed (wrappers vs agents)
- **Current draft**: Lesson 01 covers all of this — Pilot Trap definition, symptoms table, knowledge transfer gap, wrappers vs agents comparison
- **Status**: ✅ MET
- **Notes**: Current lesson adds pedagogical scaffolding (structured tables, section headers, "Try With AI") that the spec's flowing prose doesn't have. This is appropriate for lesson format.

### Section: "What Changed in 2026"
- **Spec requires**: Architectural platform shift, Cowork/Frontier introduction, February 2026 demonstration detail, financial market reaction, specific deployment examples (CFO, architect, compliance officer deploying agents), structural career implication
- **Current draft**: Lesson 02 covers the platform shift, shared insight, Feb 2026 demo, market reaction, structural implication
- **Status**: ⚠️ PARTIAL
- **Gap**: Spec has vivid specific examples: "a CFO can deploy a financial research agent that reflects how her organisation actually analyses credit risk. A lead architect can deploy a BIM coordination assistant that knows his firm's BIM execution plan..." These specific examples are referenced in the Part 3 README but are missing from Lesson 02 itself. The lesson is more abstract ("Querying live financial data sources" as bullet points rather than specific professional scenarios).

### Section: "The Knowledge Worker at the Centre"
- **Spec requires**: Displacement vs amplification argument, specific professional examples (architect, banker, compliance officer, HR director), SKILL.md as the moat
- **Current draft**: Lesson 03 covers displacement vs amplification, same professional examples, expertise moat concept, SKILL.md preview
- **Status**: ✅ MET

### Section: "Two Platforms, One Paradigm" — Anthropic Cowork
- **Spec requires**: SKILL.md architecture, config.yaml, connector scripts, connector ecosystem (specific connectors listed), deployment model (product-led growth), typical adopter profile
- **Current draft**: Lesson 04 covers three components (SKILL.md, config.yaml, connectors), production connectors, connector revenue model, deployment model, typical adopter profile
- **Status**: ✅ MET
- **Notes**: Lesson 04 is comprehensive and well-structured

### Section: "Two Platforms, One Paradigm" — OpenAI Frontier
- **Spec requires**: Semantic layer architecture, centralised agent identity/permissions, top-down deployment, Forward Deployed Engineers + consulting partnerships, enterprise adopters (HP, Intuit, Oracle, State Farm, Thermo Fisher, Uber), cross-departmental use cases
- **Current draft**: Lesson 04 covers semantic layer, deployment model, consulting partnerships, named enterprise adopters, cross-functional scope
- **Status**: ✅ MET
- **Notes**: Spec has richer detail on Frontier's cross-departmental use cases (customer complaint → refund → communication chain; compliance monitoring across systems). Current lesson is slightly thinner on these specific workflow examples.

### Section: "Choosing Between Them"
- **Spec requires**: Three-question decision framework (organisational scope, procurement reality, nature of knowledge)
- **Current draft**: Lesson 04 has all three questions with clear guidance
- **Status**: ✅ MET

### Section: "Four Monetisation Models"
- **Spec requires**: Success Fee (with attribution methodology), Subscription (with self-justification problem), License (with procurement requirements), Marketplace (with IP distinction)
- **Current draft**: Lesson 05 covers all four with pricing benchmarks and key risks
- **Status**: ✅ MET
- **Notes**: Spec prose is more narrative; lesson format uses tables effectively. Content alignment is strong.

### Section: "Organisational AI Maturity Model"
- **Spec requires**: Five levels (Awareness → Experimentation → Integration → Optimisation → Transformation) with characteristics, diagnostic indicators, and appropriate interventions
- **Current draft**: Lesson 06 covers all five levels with diagnostic indicators, appropriate interventions, and the Post-Pilot Trap concept
- **Status**: ✅ MET
- **Notes**: Current lesson adds the "Post-Pilot Trap" naming for the L2→L3 transition, which is a pedagogical enhancement beyond the spec.

### Section: "The Seven Domains"
- **Spec requires**: Profiles for Finance, Legal, Sales, HR, Healthcare, Architecture, Technical Documentation — each with specific expertise descriptions and chapter references
- **Current draft**: Lesson 07 covers all seven with institutional knowledge lock-in framing, domain profiles, and cross-domain methodology transfer
- **Status**: ✅ MET
- **Notes**: Lesson adds "Common Problem: Institutional Knowledge Lock-In" section and "Cross-Domain Methodology Transfer" section — good pedagogical additions

### Section: "Starting the Conversation"
- **Spec requires**: Knowledge question ("whose expertise, in what form, for whom, under what constraints"), conversation qualification using maturity model, stakeholder-specific value framing
- **Current draft**: Lesson 08 covers knowledge question, qualification table, stakeholder framing table, conversation sequence
- **Status**: ✅ MET

### Section: "Chapter Summary"
- **Spec requires**: Synthesis of all frameworks, forward reference to Chapter 15
- **Current draft**: Lesson 09 has decision chain table, three core insights, self-assessment checklist, Chapter 15 reference
- **Status**: ✅ MET

### Chapter Quiz
- **Spec requires**: Not explicitly specified
- **Current draft**: Lesson 10 has 50-question interactive quiz
- **Status**: ✅ MET (book standard)

### Supporting Artifacts
- **Flashcards**: All 9 lessons have `.flashcards.yaml` files ✅
- **Summaries**: All 9 lessons have `.summary.md` files ✅
- **Chapter README**: Complete with YAML frontmatter, learning objectives, lesson flow, chapter contract ✅
- **YAML Frontmatter**: All lessons have full pedagogical metadata (skills, learning objectives, cognitive load, differentiation, teaching guide) ✅

---

## 1B. Lesson Plan

### Lesson 1: The Year That Did Not Deliver
**Learning Objective:** By the end of this lesson, the reader can explain the Pilot Trap pattern and identify the structural knowledge transfer gap that caused enterprise AI to stall.
**Spec Requirement(s):** Opening section "The Year That Did Not Deliver"
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- Existing content is well-structured and complete
- Has proper YAML frontmatter with skills, learning objectives, cognitive load, teaching guide
- Three "Try With AI" prompts with learning explanations
- Flashcards reference in place
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 2: What Changed in 2026
**Learning Objective:** By the end of this lesson, the reader can describe the architectural platform shift and explain why it puts knowledge workers in the design seat.
**Spec Requirement(s):** Section "What Changed in 2026"
**Current Draft Status:** ⚠️ PARTIAL
**Implementation Notes:**
- Existing content covers the core argument well
- **Gap 1**: Missing vivid professional examples from spec (CFO deploying financial research agent, lead architect deploying BIM assistant, compliance officer configuring contract triage). These specific scenarios are more powerful than the abstract bullet points currently used.
- **Gap 2**: The spec's passage about financial market reaction and enterprise software valuation adjustment is more detailed than the current lesson's brief mention.
- Keep: The structured "Core Insight Both Platforms Share" framing is excellent
- Revise: Add 1-2 paragraphs with specific professional deployment examples after "What the Platforms Made Possible" section
- Keep: The "Structural Implication" closing is strong
**Assigned To:** Prose Writer — Narrative
**Estimated Scope:** S (add 2-3 paragraphs)

### Lesson 3: Knowledge Worker at the Centre
**Learning Objective:** By the end of this lesson, the reader can distinguish displacement from amplification and articulate the expertise moat concept.
**Spec Requirement(s):** Section "The Knowledge Worker at the Centre"
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- Existing content matches spec intent closely
- Displacement/amplification framework is clear
- Expertise moat concept well-articulated
- SKILL.md preview properly planted
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 4: Two Platforms, One Paradigm
**Learning Objective:** By the end of this lesson, the reader can compare Cowork and Frontier architectures and apply a three-question decision framework.
**Spec Requirement(s):** Section "Two Platforms, One Paradigm" (both subsections + choosing)
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- Comprehensive coverage of both platforms
- Three-question decision framework clearly presented
- Side-by-side comparison table is a good pedagogical addition
- Minor opportunity: spec has richer Frontier use case examples (customer complaint chain, compliance monitoring chain) — could add one concrete workflow example
**Assigned To:** No major revision needed. Optional: Prose Writer — Technical (add one Frontier workflow example)
**Estimated Scope:** S (optional enhancement, 1 paragraph)

### Lesson 5: Four Monetisation Models
**Learning Objective:** By the end of this lesson, the reader can match each monetisation model to appropriate domains and evaluate pricing architectures.
**Spec Requirement(s):** Section "How Domain Agents Create Value: The Four Monetisation Models"
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- All four models covered with pricing benchmarks
- Attribution methodology well-explained
- IP distinction for Marketplace model clear
- Comparison table at bottom ties everything together
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 6: Organisational AI Maturity Model
**Learning Objective:** By the end of this lesson, the reader can assess any organisation's maturity level and recommend the appropriate intervention.
**Spec Requirement(s):** Section "The Organisational AI Maturity Model"
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- All five levels with diagnostic indicators and interventions
- Post-Pilot Trap concept adds value beyond spec
- Summary table is a clean reference tool
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 7: The Seven Domains
**Learning Objective:** By the end of this lesson, the reader can identify the seven professional domains, explain institutional knowledge lock-in, and map their own expertise.
**Spec Requirement(s):** Section "The Seven Domains"
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- All seven domains profiled with expertise-at-risk framing
- Institutional knowledge lock-in concept well-established
- Cross-domain methodology transfer section adds pedagogical value
- Healthcare boundary (operations, not clinical) clearly stated
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 8: Starting the Conversation
**Learning Objective:** By the end of this lesson, the reader can qualify deployment conversations using the maturity model, frame value for stakeholders, and apply the knowledge question.
**Spec Requirement(s):** Section "Starting the Conversation"
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- Qualification table by maturity level is excellent
- Stakeholder framing table adds practical value
- Knowledge question ("whose expertise, in what form, for whom, under what constraints") clearly presented
- Conversation sequence well-structured
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 9: Chapter Summary
**Learning Objective:** By the end of this lesson, the reader can explain how all frameworks connect as a decision system and apply them to their own context.
**Spec Requirement(s):** Chapter Summary section
**Current Draft Status:** ✅ MET
**Implementation Notes:**
- Decision chain table is an excellent synthesis tool
- Three core insights tie the chapter together
- Self-assessment checklist is actionable
- Forward reference to Chapter 15 properly placed
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

### Lesson 10: Chapter Quiz
**Learning Objective:** N/A (assessment)
**Spec Requirement(s):** N/A (book standard)
**Current Draft Status:** ✅ MET
**Assigned To:** No revision needed
**Estimated Scope:** N/A (complete)

---

## 1C. Continuity Requirements

### Chapter 13 → Chapter 14 Transition
- **Chapter 13** ends with a hackathon assignment for building a Personal AI Employee (Part 2 capstone)
- **Part 3 README** serves as the narrative bridge: "The first two parts of this book were addressed to a specific kind of person: someone who writes code... Part 3 is addressed to everyone else"
- **Chapter 14 Lesson 01** opens with the epigraph and immediately sets the enterprise context
- **Assessment**: The Part 3 README handles this transition well. Chapter 14's opening does NOT repeat Part 2 content. ✅ Good continuity.
- **Note**: The transition is Part-level, not chapter-level. The Part 3 README is the primary bridge.

### Chapter 14 → Chapter 15 Transition
- **Spec requires**: Chapter 14 closes with "Chapter 15 describes what that agent looks like from the inside. Chapter 15 opens the blueprint."
- **Current draft**: Lesson 08 ends with "Chapter 15 opens the blueprint." Lesson 09 ends with "Chapter 15 gives you the technical architecture that makes deployment real."
- **Note**: Chapter 15 (`03-Domain-Agent-Workflows/15-enterprise-agent-blueprint/`) does NOT exist yet in the filesystem. This is a forward reference to content that has not been written.
- **Assessment**: ⚠️ Forward reference is planted but target chapter doesn't exist yet. Not a Chapter 14 problem per se.

### Forward References to Chapters 17-24
- Lesson 07 (Seven Domains) references Chapters 17-23 by domain
- Lesson 06 (Maturity Model) references Chapter 24 for portfolio strategy
- Lesson 04 (Two Platforms) references Chapter 24 for platform decision revisit
- **Assessment**: ✅ Forward references adequately planted

### Callbacks to Part 1 / Part 2
- Chapter 14 is the opening of Part 3, which has a fundamentally different audience (knowledge workers, not developers)
- The Part 3 README handles the callback to Parts 1-2 explicitly
- Chapter 14's lessons do not explicitly reference Part 1/2 concepts (appropriate — the audience may not have read them)
- **Assessment**: ✅ Appropriate — Part 3 README bridges; Chapter 14 stands independently

---

## 1D. Quality Criteria

### Structural Checks
- [x] Every lesson from the plan is present in the final chapter (9 lessons + quiz)
- [x] Every spec requirement is addressed (see compliance checklist)
- [x] Section order matches pedagogical flow (diagnosis → shift → centrality → platforms → value → readiness → domains → conversation → synthesis)
- [x] Chapter summary reflects what was actually written (decision chain matches lesson content)

### Voice Checks
- [ ] ⚠️ **Bullet points/numbered lists in prose body**: Lessons 02 and 03 use bullet-point lists for examples (e.g., Lesson 02 line 129-133 has a bulleted list of demo capabilities; Lesson 03 lines 109-113 and 118-121 have bulleted lists). The spec prose style avoids these. However, in lesson format, structured lists serve pedagogical purposes (scanning, quick reference). **Decision needed: enforce pure prose or accept pedagogical formatting?**
- [x] No hedging language detected in current drafts
- [x] No filler transitions detected
- [x] Consistent tense usage

### Accuracy Checks
- [ ] ⚠️ **Platform claims need date qualification**: Some claims about Cowork connectors, Frontier adopters, and pricing benchmarks are stated as current facts. Since these are forward-looking (book is set in 2026), they should either be qualified or accepted as the book's narrative frame.
- [ ] ⚠️ **Enterprise customer names**: HP, Intuit, Oracle, State Farm, Thermo Fisher, Uber listed as Frontier adopters — these should be verified against publicly available information.
- [x] Maturity model levels are mutually exclusive and collectively exhaustive
- [x] Pricing ranges are internally consistent across lessons

### Continuity Checks
- [x] Opening connects to Part 2 via Part 3 README
- [x] Closing sets up Chapter 15 opening
- [x] Forward references to Chapters 17-24 planted
- [x] No orphan references

---

## Summary

**Overall Status**: The chapter is **substantially complete and well-aligned with the spec**. Out of 11 spec sections checked:
- **9 sections**: ✅ MET
- **2 sections**: ⚠️ PARTIAL (Lesson 02 vivid examples, minor Frontier use case depth)
- **0 sections**: ❌ MISSING
- **0 sections**: 🔀 MISALIGNED

**Recommended Action**: Targeted revisions only, not a full rewrite. Specifically:
1. **Lesson 02**: Add 2-3 paragraphs of specific professional deployment examples
2. **Lesson 04**: Optional — add one concrete Frontier cross-departmental workflow example
3. **Voice review**: Decision on bullet points in prose sections (Lessons 02, 03)
4. **Fact verification**: Platform claims and enterprise customer names need verification

**Estimated effort**: Small (S) — 2-3 targeted paragraphs added, no structural changes.
