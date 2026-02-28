---
sidebar_position: 11
title: "Chapter 15: The Enterprise Agent Blueprint Quiz"
---

# Chapter 15: The Enterprise Agent Blueprint Quiz

Test your understanding of the enterprise agent blueprint — from plugin architecture and the PQP Framework to governance, ownership, and the marketplace.

<Quiz
title="Chapter 15: The Enterprise Agent Blueprint Assessment"
questions={[
{
question: "A senior procurement manager says: 'Our AI tool is just a chatbot add-on to our ERP system — it answers questions when we ask it.' A colleague replies: 'That is not what a Cowork plugin is at all.' What is the most precise distinction the colleague is making?",
options: [
"A Cowork plugin is a domain-specific agent with a defined identity, explicit instructions, enterprise system connections, a governance framework, and a performance record — not a reactive UI widget",
"A Cowork plugin is distinguished by the use of a more capable AI model than typical chatbot add-ons",
"A Cowork plugin requires developer ownership, whereas a chatbot add-on is managed by the business team",
"A Cowork plugin processes documents, whereas a chatbot add-on only handles text queries"
],
correctOption: 0,
explanation: "The colleague is pointing to the plugin package components that define a Cowork plugin: skills, agents, connectors, hooks, commands, and a manifest. A chatbot add-on that only responds when asked is a wrapper, not an agent, and lacks the governance and performance infrastructure that makes a plugin deployable in an audited environment. Option B is wrong because the model version is a plugin manifest setting, not the defining distinction. Option C is incorrect because knowledge workers — not developers — own the SKILL.md, which is the intelligence layer. Option D is too narrow; the distinction is architectural, not limited to input type.",
source: "Lesson 1: What a Plugin Actually Is"
},
{
question: "A compliance team lead reviews the deployment records for an AI system that has been running in their legal review workflow for six months. She can read the exact text that governs its behaviour, inspect which document repositories it accesses, and review every output it has produced with timestamps and user identities. Which Cowork plugin property is she exercising?",
options: [
"The performance record only — she is reviewing audit logs",
"The instructions property only — she is reading the SKILL.md",
"Transparency as an architectural property — all plugin components are inspectable by the right role",
"Governance configuration — she is verifying that the administrator set the correct policies"
],
correctOption: 2,
explanation: "The scenario describes transparency as an architectural property: every aspect of the plugin is inspectable by the right role. The compliance lead is accessing the SKILL.md (instructions), the connector configuration (connections), and the audit log (performance record) — demonstrating that no property is a black box. Option A is too narrow; she is accessing more than the audit log. Option B is too narrow; she is accessing multiple properties, not just the instructions. Option D misidentifies the activity; inspecting governance configuration is one element of what she is doing, not a description of the overall architectural property.",
source: "Lesson 1: What a Plugin Actually Is"
},
{
question: "A healthcare organisation is considering deploying an AI agent for clinical documentation. Their legal counsel says: 'We cannot deploy AI systems we cannot audit.' A Cowork plugin architect responds that this concern is addressed by design. What is the architectural basis for this claim?",
options: [
"Cowork plugins include a disclaimer that all outputs have been reviewed by a qualified professional",
"Cowork plugins run on servers located within the organisation's own data centre, ensuring data sovereignty",
"Every Cowork plugin property — identity, instructions, connections, governance, performance record — is inspectable by the appropriate role, making the system verifiable rather than requiring trust",
"Cowork plugins generate a monthly compliance report that legal teams can submit to regulators"
],
correctOption: 2,
explanation: "The architectural basis is transparency as a structural property: because every plugin property is inspectable by the right role, the organisation does not have to trust the agent — it can verify it. The compliance officer can read the SKILL.md, the IT administrator can review the connector configuration, and legal can access the complete audit log. Option A is incorrect; there is no disclaimer mechanism — transparency is structural, not asserted. Option B is wrong; the lesson does not cite data sovereignty as the basis for auditability. Option D does not exist as a Cowork feature and confuses the audit log with a reporting mechanism.",
source: "Lesson 1: What a Plugin Actually Is"
},
{
question: "An architecture firm is building its first Cowork plugin for BIM coordination. The project lead assigns the SKILL.md to the lead architect, the connectors (.mcp.json) and manifest to the IT team, and the MCP connector implementation to a developer. A junior colleague asks why the SKILL.md was not assigned to the developer, who 'knows technology better.' What is the most accurate response?",
options: [
"The developer lacks security clearance to access the SKILL.md",
"SKILL.md is a plain-English document requiring domain expertise — the lead architect understands BIM coordination; the developer does not need to",
"The developer is too junior to be trusted with the intelligence layer",
"The plugin manifest is more technically complex than the SKILL.md, so the developer is assigned there instead"
],
correctOption: 1,
explanation: "The SKILL.md is a plain-text structured document written in English, not a code file. It requires domain expertise — knowledge of BIM coordination conventions, clash detection standards, escalation protocols — not programming ability. The lead architect is the correct owner because she has that expertise. The developer builds MCP connectors, which require technical skills but not domain knowledge. Option A is wrong; there is no security clearance dimension to SKILL.md ownership. Option C misidentifies the reason — it is about expertise, not seniority. Option D is incorrect; the plugin manifest is structured JSON, but the distinction is based on what knowledge each role has, not comparative complexity.",
source: "Lesson 1: What a Plugin Actually Is"
},
{
question: "A law firm deploys a Cowork plugin for contract triage. Six months later, a trainee solicitor notices the agent is providing information about employment law clauses, which were never in scope. The lead partner says this suggests the plugin is 'missing a structural element.' Which element is most likely absent or underspecified?",
options: [
"The Persona section — the agent's professional identity is too broad",
"The out-of-scope boundary in the Questions section — the agent has no defined boundary preventing it from straying into employment law",
"The Source Integrity principle — the agent is drawing from the wrong data sources",
"The plugin manifest model setting — the AI model selected is too capable and oversteps its remit"
],
correctOption: 1,
explanation: "The agent is straying beyond its intended scope into employment law, which indicates the Questions section lacks a well-defined out-of-scope boundary. As Lesson 2 explains, an agent without an explicit out-of-scope list will attempt queries it cannot handle well, producing confident-sounding output in areas where it has no grounded expertise. Option A is possible but less precise — the Persona shapes authority and tone but the Questions section is the scope document. Option C is about data sourcing, not scope management. Option D is incorrect; model capability is not the issue — the SKILL.md has not defined what the agent should decline.",
source: "Lesson 2: The Intelligence Layer — SKILL.md"
},
{
question: "A financial analyst examines two SKILL.md Persona sections for a market research agent. Persona A reads: 'I am a helpful financial assistant who provides useful market insights.' Persona B reads: 'I am a senior equity research analyst specialising in FTSE 350 financials. I cite all sources, flag uncertainty explicitly, and do not speculate beyond available data.' When a portfolio manager asks both agents a question the data does not clearly answer, what is the most likely difference in their responses?",
options: [
"Persona A will refuse to answer; Persona B will produce a speculative but well-labelled estimate",
"Both personas will produce identical responses because the underlying model is the same",
"Persona B will state that the data does not support a confident position; Persona A may generate plausible-sounding speculation",
"Persona A will escalate to a human reviewer; Persona B will attempt to answer using all available sources"
],
correctOption: 2,
explanation: "This demonstrates the core insight from Lesson 2: identity governs ambiguous situations more reliably than rules. Persona B specifies 'I do not speculate beyond available data' as professional identity — so when data is unclear, the agent's identity dictates that it acknowledges the limitation. Persona A's vague description of helpfulness will lead the agent to try to be helpful even when data is insufficient, potentially generating speculative output. Option A inverts the likely behaviour. Option B is incorrect because the Persona section directly shapes response behaviour. Option D incorrectly attributes escalation to Persona A, which has no escalation instructions.",
source: "Lesson 2: The Intelligence Layer — SKILL.md"
},
{
question: "A clinical pharmacist drafts a Principles section for a drug interaction checking agent. She writes: 'Be accurate and helpful in all drug-related queries.' Her colleague, who has designed SKILL.md files before, says this principle is 'insufficient for a production agent.' What is the most precise reason?",
options: [
"The principle is too long — SKILL.md principles should be single sentences",
"Generic principles give the agent no actionable guidance on what accuracy means in a specific clinical context; a domain-specific principle would define exactly what to check and when to escalate",
"The principle should reference specific drug categories by their ICD-10 codes to be actionable",
"The principle addresses accuracy but not helpfulness — both dimensions must be covered separately"
],
correctOption: 1,
explanation: "Lesson 2 draws a direct contrast between generic principles ('be accurate') and domain-specific principles ('flag any interaction flagged as critical by the approved formulary; for dosage outside the validated range for the patient's renal function category, escalate immediately'). Generic principles are aspirational; they do not tell the agent what accuracy means in a clinical context, what to look for, or what constitutes a situation requiring escalation. Option A is wrong; length is not the issue. Option C is incorrect; ICD-10 codes might be appropriate in the content but are not required for the principle to be domain-specific. Option D is wrong; the problem is the generic framing of accuracy, not an omission of helpfulness.",
source: "Lesson 2: The Intelligence Layer — SKILL.md"
},
{
question: "A sales operations manager is writing the Questions section for a Cowork plugin that handles lead qualification. She lists five types of queries the agent can handle but does not include an out-of-scope section. What is the most likely consequence?",
options: [
"The agent will refuse all queries not exactly matching the five listed types",
"The agent will work correctly within scope but log out-of-scope queries for manual review",
"The agent will attempt to answer queries outside its expertise, producing confident-sounding but unreliable output in areas like legal advice or financial projections",
"The plugin manifest will automatically restrict the agent to the five listed query types without requiring an out-of-scope section"
],
correctOption: 2,
explanation: "Lesson 2 states: 'An agent without a well-defined scope will attempt to answer queries it cannot handle well. This produces confident-sounding outputs in areas where it has no grounded expertise.' Without an explicit out-of-scope boundary, a lead qualification agent may venture into areas like contract terms, pricing authority, or legal compliance — areas where its grounded expertise ends and professional liability begins. Option A inverts the problem; the agent does not refuse, it proceeds. Option B is incorrect; there is no automatic logging mechanism for scope violations. Option D is wrong; the plugin manifest governs deployment environment and connectors, not query scope.",
source: "Lesson 2: The Intelligence Layer — SKILL.md"
},
{
question: "An HR director is designing a SKILL.md for a recruitment screening agent. She includes this Persona statement: 'I am a senior talent acquisition specialist with fifteen years' experience across technology and financial services. I provide structured candidate assessments and I am not a decision-maker — I produce analysis that supports human hiring decisions.' Why is the final sentence important as a Persona statement rather than as a rule in the Principles section?",
options: [
"Persona statements are processed first by the AI model, giving them higher priority than Principles",
"Stating it as professional identity means it governs the agent's behaviour even in situations no specific rule anticipated — the agent's identity precludes it from acting as a decision-maker in any context",
"Principles sections have a character limit that makes it impractical to include this statement there",
"The Persona section is visible to users, making it a clearer disclaimer than the Principles section"
],
correctOption: 1,
explanation: "Lesson 2 explains that identity governs ambiguous situations more reliably than rules. A rule saying 'do not make hiring decisions' governs anticipated situations; the Persona statement 'I am not a decision-maker' governs even unanticipated scenarios — the agent's professional identity means it will consistently decline to frame outputs as final decisions regardless of how the query is phrased. Option A is incorrect; there is no processing-priority hierarchy described in the lesson. Option C is wrong; there is no character limit mentioned. Option D is incorrect; the SKILL.md is not directly displayed to users as a disclaimer mechanism.",
source: "Lesson 2: The Intelligence Layer — SKILL.md"
},
{
question: "A financial research team deploys a Cowork plugin. The IT administrator configures the .mcp.json with three MCP connectors: factset_mcp (read, scope: market_data, news_feed), snowflake_mcp (read, scope: internal_models), and sharepoint_mcp (read, scope: research_templates). One analyst asks whether the agent can access the Snowflake instance's HR payroll data to check a restructuring rumour. What is the correct answer?",
options: [
"Yes — if the SKILL.md instructs the agent to query Snowflake, it can access all data within Snowflake",
"No — permission boundaries are enforced by the Cowork runtime, and payroll data is outside the configured scope of snowflake_mcp",
"It depends on whether the administrator grants an exception in the governance configuration",
"Yes — but the agent will flag the query as sensitive and route it to the finance review queue"
],
correctOption: 1,
explanation: "Lesson 3 states explicitly: 'Permission boundaries are enforced by the Cowork runtime, not by the SKILL.md.' The snowflake_mcp connector's scope is limited to 'internal_models' — payroll data is outside that scope. Even if the SKILL.md instructed the agent to query payroll data, the attempt would fail safely because the Cowork runtime enforces the configured scope boundaries. Option A is incorrect; scope restrictions apply within a connector, not just at connector level. Option C is wrong; the governance configuration handles audit and HITL settings, not ad hoc data access exceptions. Option D is incorrect; the agent cannot access the data at all — routing it to a review queue is not the response to a scope boundary violation.",
source: "Lesson 3: The Configuration and Integration Layers"
},
{
question: "An operations analyst notices that her Cowork plugin's research reports contain financial figures that seem unusually specific and coherent, but she cannot verify that the factset_mcp connector was running when the reports were generated. Which connector state is she most concerned about?",
options: [
"The working state — live data returns figures that are specific by definition",
"The explicitly unavailable state — the connector reported it could not access the financial data service",
"The fabricating state — the connector was down but the agent generated plausible-looking figures from its training memory rather than live data",
"The cached state — the connector returned figures from a previous session's data cache"
],
correctOption: 2,
explanation: "Lesson 3 identifies the fabricating state as 'the dangerous failure mode.' When a connector is unavailable, a poorly configured system may produce responses that appear to be live data but are actually generated from the model's training memory. The key concern is that this is undetectable without external verification — unlike the explicitly unavailable state, which transparently reports the limitation. Option A is wrong; the analyst is concerned precisely because she cannot confirm the connector was working. Option B is the safe failure mode, not the one she should be concerned about. Option D — a cached state — is not one of the three connector states defined in the lesson.",
source: "Lesson 3: The Configuration and Integration Layers"
},
{
question: "A knowledge worker reviews the governance section of her plugin's configuration and finds: audit_log: true, output_review_required: true, escalation_routing: 'legal_review_queue', shadow_mode: false. What does output_review_required: true imply about this plugin's deployment context?",
options: [
"The agent's outputs go through a technical validation check before being stored in the audit log",
"The agent is still in shadow mode and outputs require review before reaching users",
"The agent's outputs go to a human reviewer before reaching the end user — appropriate for high-stakes or externally-facing documents",
"The knowledge worker must approve each output before the agent submits it to the escalation queue"
],
correctOption: 2,
explanation: "Lesson 3 explains that output_review_required: false means outputs go directly to the user, while the implication of true is that outputs require human review before reaching anyone. This setting is appropriate when the plugin produces client-facing documents, regulatory filings, or other outputs where human judgment is required before release. Option A incorrectly describes a technical validation step that is not part of the plugin governance model. Option B is wrong; shadow_mode: false means the agent is not in shadow mode. Option D misidentifies who does the reviewing; output review involves a qualified human reviewer, not the knowledge worker who owns the plugin.",
source: "Lesson 3: The Configuration and Integration Layers"
},
{
question: "An IT manager is explaining MCP connectors to a new team member. She says: 'You do not need to know how they work internally — but you do need to understand what infrastructure literacy means for our knowledge workers.' What does infrastructure literacy mean in this context?",
options: [
"Knowledge workers must be able to build and debug MCP connectors independently",
"Knowledge workers must understand enough about connectors to detect problems accurately, describe them precisely to IT, and recognise when to verify data provenance before acting",
"Knowledge workers must obtain an IT certification before they can use any Cowork plugin with live data connectors",
"Knowledge workers must review the connector code before each deployment to ensure it meets security standards"
],
correctOption: 1,
explanation: "Lesson 3 defines infrastructure literacy as 'knowing enough about the systems you depend on to detect problems accurately, describe them precisely, and have productive conversations with the people who fix them.' It explicitly states this is 'not about becoming a systems engineer.' Knowledge workers need sufficient awareness to confirm connectors match their workflow needs, recognise stale or fabricated data, and report problems accurately to IT. Option A inverts the ownership model — MCP connector maintenance belongs to IT. Option C is incorrect; no certification is described. Option D is wrong; knowledge workers review the connector configuration to verify connectors are set up correctly, not the connector code itself.",
source: "Lesson 3: The Configuration and Integration Layers"
},
{
question: "A compliance analyst has spent two weeks refining her SKILL.md. She adds a clear instruction: all risk summaries should be automatically formatted as structured reports and sent directly to the firm's external compliance system. Despite three revisions with different phrasings, the agent consistently routes summaries to an internal review queue instead. What is the most likely explanation?",
options: [
"The SKILL.md instruction contains a syntax error that prevents the Principles section from being processed",
"The agent has learned from user feedback to prefer internal review over direct external transmission",
"An organisation-level policy has been configured by the administrator to route all compliance-related outputs through an internal review queue before external transmission — a SKILL.md instruction cannot override this",
"The factset_mcp connector is blocking direct external data transmission as a security feature"
],
correctOption: 2,
explanation: "This is precisely the scenario used in Lesson 4 to introduce the three-level context hierarchy. Organisation-level context, set by the administrator, governs all plugins within the organisation. A financial services firm's administrator will likely have configured a policy requiring compliance outputs to pass through an internal review queue — reflecting regulatory obligations. No SKILL.md instruction can override an organisation-level policy; higher levels silently override lower levels. Option A is wrong; SKILL.md is plain English, not a programming language with syntax errors. Option B is incorrect; agents do not learn from user feedback in the way described. Option D misidentifies the source of the restriction.",
source: "Lesson 4: The Three-Level Context System"
},
{
question: "A knowledge worker at a healthcare organisation has written a SKILL.md that instructs her clinical documentation agent to send discharge summaries directly to the hospital's patient records system. The agent instead always routes summaries to a review queue. She is confused because the instruction is clearly written. What diagnostic step should she take first?",
options: [
"Rewrite the SKILL.md instruction using more specific language about the patient records system endpoint",
"Ask IT to rebuild the MCP connector that routes outputs to the patient records system",
"Check whether a platform-level constraint (Anthropic) or an organisation-level policy (administrator) prevents direct autonomous output to clinical systems — before assuming the SKILL.md has an error",
"Delete the instruction from the Principles section and add it to the Questions section instead"
],
correctOption: 2,
explanation: "Lesson 4's diagnostic sequence begins at the highest level: platform context first, organisation context second, SKILL.md last. In a healthcare context, an organisation-level policy requiring human review of clinical outputs before they reach patient records systems is highly likely and reflects clinical safety and regulatory requirements. Starting at the SKILL.md (step 3 of the diagnostic) when the constraint is probably at step 2 wastes time and produces no result. Option A is running the diagnostic from the wrong end. Option B misidentifies the issue as a connector problem. Option D is incorrect; moving the instruction between sections does not change whether it is overridden by higher-level context.",
source: "Lesson 4: The Three-Level Context System"
},
{
question: "A knowledge worker writes a SKILL.md that sets a more conservative uncertainty threshold than the organisation's default — requiring the agent to flag any finding as uncertain unless it is directly corroborated by two independent data sources. The administrator has set no such requirement at the organisation level. What will happen?",
options: [
"The SKILL.md instruction will be silently overridden because it differs from the organisation default",
"The SKILL.md instruction will be honoured — the plugin can add more-restrictive constraints than the organisation level requires",
"The instruction requires administrator approval before it becomes active",
"The agent will apply the default threshold because SKILL.md cannot modify output quality settings"
],
correctOption: 1,
explanation: "Lesson 4 is explicit: 'The SKILL.md can add more-restrictive constraints than the organisation context requires.' The knowledge worker can narrow the agent's behaviour, add more conservative uncertainty thresholds, or restrict scope beyond the organisation's defaults. What the SKILL.md cannot do is expand permissions beyond what higher levels allow. A more-restrictive addition is always honoured. Option A inverts the rule; silent override applies when SKILL.md tries to expand permissions, not when it adds restrictions. Option C is wrong; no approval process is required for additive restrictions. Option D is incorrect; quality thresholds can be encoded in the Principles section.",
source: "Lesson 4: The Three-Level Context System"
},
{
question: "A project manager explains to a new team member: 'When my agent ignores a SKILL.md instruction, I have learned to ask three questions in a specific order before touching the SKILL.md.' What is the correct order of those questions?",
options: [
"SKILL.md first (is there an error?), then organisation context (is there a policy?), then platform (is this universally restricted?)",
"Platform first (is this universally restricted?), then organisation context (is there a policy?), then SKILL.md (is there an error in the instruction?)",
"Organisation context first (is there a policy?), then SKILL.md (is there an error?), then platform (is this universally restricted?)",
"IT first (is there a connector issue?), then administrator (is there a governance setting?), then platform (is this restricted?)"
],
correctOption: 1,
explanation: "Lesson 4's diagnostic sequence mirrors the hierarchy: platform level first, organisation level second, SKILL.md last. Starting at the SKILL.md — the most natural starting point for a knowledge worker — wastes time when the constraint is actually at a higher level. The compliance analyst example in the lesson illustrates this: she rewrote her SKILL.md three times before recognising the constraint was at the organisation level. Option A runs the diagnostic in reverse. Option C skips the platform level and starts at organisation context. Option D substitutes IT and administrator for the correct three levels.",
source: "Lesson 4: The Three-Level Context System"
},
{
question: "An annotated financial research SKILL.md contains the Persona statement: 'You are not an investment adviser. You do not make recommendations about whether to buy, sell, or hold any security.' A reviewer suggests replacing this with a rule in the Principles section: 'Do not give investment recommendations.' The original author disagrees. What is the most precise argument for keeping it in the Persona?",
options: [
"The Persona section is read first, giving it higher enforcement priority than Principles",
"A rule in Principles only governs situations that were anticipated when the rule was written; stating 'you are not an investment adviser' as professional identity governs all situations — including those where a user frames a request so it does not explicitly ask for a recommendation",
"Moving the statement to Principles would require deleting it from the Persona, creating an inconsistency",
"Regulatory bodies require investment-related disclaimers to appear in the identity section of any AI financial tool"
],
correctOption: 1,
explanation: "Lesson 5 uses this exact example to demonstrate the central insight: identity constraints govern more robustly than rules. A rule ('do not give investment recommendations') can be argued around if a user frames their request as 'what factors would you weigh if you were deciding?' A professional identity ('I am not an investment adviser') governs even this reframing — the agent's identity precludes it from producing investment-flavoured analysis in any form. Option A is incorrect; there is no processing-priority hierarchy in the lesson. Option C is wrong; the statement can appear in both sections if needed. Option D is incorrect; no regulatory requirement is cited for Persona placement.",
source: "Lesson 5: The PQP Framework in Practice"
},
{
question: "The Principles section of the financial research SKILL.md includes a Source Integrity principle: 'If you cannot ground a figure in a connected source or user-provided document, say I don't have a grounded source for this figure rather than providing a number from memory.' What specific failure mode does this prevent?",
options: [
"It prevents the agent from citing sources that are not in the organisation's approved list of research templates",
"It prevents the agent from fabricating plausible-sounding financial figures drawn from its training memory when live connector data is unavailable — a hallucination risk in financial decision-making",
"It prevents users from asking the agent questions that cannot be answered by any connected data source",
"It prevents the agent from producing analysis based on data that is more than 30 days old"
],
correctOption: 1,
explanation: "Lesson 5 explains: 'A model trained on large amounts of financial data can produce plausible-looking figures — revenue numbers, market capitalisations, deal valuations — that are drawn from training memory rather than connected, current data sources. In a financial research context where decisions are made on the basis of these numbers, it is a serious risk.' The Source Integrity principle forces the agent to acknowledge the gap rather than fabricate authoritative-looking output. Option A is about source approval, not the failure mode addressed. Option C incorrectly frames it as preventing users from asking questions — the principle governs agent behaviour, not user queries. Option D describes Recency Transparency, which is a separate principle in the SKILL.md.",
source: "Lesson 5: The PQP Framework in Practice"
},
{
question: "The financial research SKILL.md includes an uncertainty calibration vocabulary: 'The data indicates...' means directly supported; 'Based on available data, it appears that...' means reasonable inferences; 'It is worth considering whether...' means hypothesis only. A portfolio manager who uses this agent regularly says this vocabulary 'makes the agent's outputs auditable.' What does she mean?",
options: [
"The vocabulary creates a paper trail that satisfies regulatory audit requirements without additional documentation",
"The consistent language conventions allow her to immediately understand what degree of reliance is appropriate for each claim — directly supported findings versus hypotheses — making outputs reviewable against professional standards",
"The vocabulary simplifies the agent's outputs, reducing the cognitive load of reading complex financial analysis",
"The calibration levels map directly to confidence percentages that can be entered into the firm's risk management system"
],
correctOption: 1,
explanation: "Lesson 5 explains uncertainty calibration as 'infrastructure for trust': the shared vocabulary between agent and professional user means outputs are auditable because the professional can read the agent's language and know immediately what degree of reliance is appropriate. 'The data indicates' signals that a claim is directly grounded; 'it is worth considering whether' signals a hypothesis. This makes the analysis reviewable: a reviewer can check whether the agent applied its calibration correctly. Option A conflates auditability with regulatory filing. Option C misidentifies the purpose as simplification. Option D invents a percentage-mapping system not described in the lesson.",
source: "Lesson 5: The PQP Framework in Practice"
},
{
question: "The financial research SKILL.md's Questions section ends with: 'For out-of-scope requests, tell the user clearly why the request is outside your remit and suggest an appropriate alternative where one exists.' A junior analyst asks why the out-of-scope section does not simply say 'refuse out-of-scope requests.' What is the best explanation?",
options: [
"Regulators require AI systems to provide alternatives rather than outright refusals",
"Positive redirection converts a dead end into useful guidance — users who receive only a refusal are stuck, whereas users who receive a redirect know what to do next",
"The SKILL.md cannot instruct the agent to refuse anything without administrator approval",
"Providing alternatives reduces the number of escalations routed to the finance review queue"
],
correctOption: 1,
explanation: "Lesson 5 explains: 'Positive redirection is more useful than refusal. If a user asks for something outside the agent's remit and receives only I cannot help with that, they are stuck. If they receive that falls outside my scope — for tax advice, contact the finance team, they know what to do next. The agent remains useful even at its boundary.' The out-of-scope section is designed to route users toward the right resource, not simply stop them. Option A invents a regulatory requirement. Option C is incorrect; the SKILL.md can instruct refusals, but positive redirection is more valuable. Option D is a plausible side effect but not the primary reason.",
source: "Lesson 5: The PQP Framework in Practice"
},
{
question: "A financial research team wants to connect its market analysis agent to S&P Global and FactSet. The IT manager says the connectors cannot be activated yet. The knowledge worker asks why — both connectors appear in the Cowork marketplace connector list. What is the most likely reason?",
options: [
"S&P Global and FactSet require HIPAA-compliant configuration before activation in any financial setting",
"Both S&P Global and FactSet are licensed subscription services — the marketplace connector provides the integration layer, but the organisation must hold a valid subscription to each service before activation",
"The connectors are in beta and require special approval from the Cowork integration team",
"Financial data connectors require custom development even when listed in the marketplace"
],
correctOption: 1,
explanation: "Lesson 6 makes clear that licensed data services like S&P Global and FactSet require valid subscriptions: the connector provides the technical integration but does not grant access to data the organisation has not licensed. The same dependency applies as with other financial data connectors: the connector cannot be activated without a valid subscription. Option A incorrectly applies HIPAA compliance, which is a clinical systems requirement, not a financial data connector requirement. Option B is the correct answer as described. Option C is incorrect; no beta or approval process is described. Option D confuses custom connector timelines with marketplace connector licensing requirements.",
source: "Lesson 6: The MCP Connector Ecosystem"
},
{
question: "A construction firm's BIM coordination team wants to connect their Cowork plugin to their Revit installation. Their IT manager checks the Cowork marketplace and cannot find a generalised Revit connector. He concludes they must commission a custom connector. Why is there no generalised Revit connector in the marketplace?",
options: [
"Autodesk prohibits third-party integrations with Revit for intellectual property reasons",
"Revit is not commonly used enough to warrant a marketplace connector",
"Each organisation's Revit environment is structured differently — different project hierarchies, custom parameters, and data schemas — making a generalised connector unworkable; a developer builds one tailored to their specific installation",
"Revit's API requires HIPAA-compliant data handling, which the marketplace does not support"
],
correctOption: 2,
explanation: "Lesson 6 explains: 'There is no generalised Revit connector in the marketplace, because each organisation's Revit environment is structured differently — different project hierarchies, different custom parameters, different data schemas.' The custom connector approach — where a developer builds a connector tailored to the specific organisation's installation — is the appropriate solution for domain-specific engineering tools with highly variable configurations. Option A invents an intellectual property restriction. Option B is incorrect; Revit is widely used in architecture and construction. Option D misapplies HIPAA, which applies to clinical systems.",
source: "Lesson 6: The MCP Connector Ecosystem"
},
{
question: "A knowledge worker needs to commission a custom connector for her company's on-premises SAP S/4HANA instance from 2018. She asks IT how long the connector will take. IT responds with a range. What is the correct planning timeline, and why?",
options: [
"A few weeks — SAP is a well-known enterprise system with a modern REST API",
"Significantly longer than a modern-API integration — the system predates modern REST APIs and may require significant investigation, custom integration work, and reverse-engineering of authentication flows",
"6-12 months — legacy ERP systems require full API modernisation before an MCP connector can be built",
"1-2 weeks — SAP connectors are pre-built by the Cowork marketplace and only require credential configuration"
],
correctOption: 1,
explanation: "Lesson 6 explains that custom connector timelines depend on the underlying system's API maturity. Systems with older protocols, sparse documentation, or custom schemas take significantly longer to integrate than those with modern REST APIs. An on-premises SAP instance from 2018 predates modern API standards and is likely to require significant investigation. The knowledge worker should work with IT to estimate a realistic timeline based on the specific system's characteristics. Option A is too optimistic; this system does not qualify as a modern-API integration. Option C invents an unrealistic timeline. Option D is wrong; SAP is not a marketplace connector.",
source: "Lesson 6: The MCP Connector Ecosystem"
},
{
question: "A sales operations team wants to deploy a Cowork plugin that helps account executives by pulling deal history from HubSpot and enriching prospect data using Clay. They also want the agent to send follow-up emails via Gmail on the account executive's behalf. What permission type does the Gmail connector require, and what additional scrutiny does this imply?",
options: [
"Read-only permission — the agent can only draft emails but cannot send them without manual approval",
"Read + Write permission — and because write permission allows the agent to act in ways that affect external parties, write permissions require considerably more scrutiny during configuration than read permissions",
"System-level permission — allowing the agent to access all mailboxes in the organisation",
"Administrative permission — requiring the administrator to approve each email before it is sent"
],
correctOption: 1,
explanation: "Lesson 6 notes that the Gmail and Outlook connectors provide 'Read + Write (drafts/sending)' when that permission has been granted. Lesson 3 explains: 'A connector with write permission would allow the agent to act — for example, an agent that drafts and sends emails would need write access to a mail connector. Write permissions require considerably more scrutiny during configuration, because they extend the agent's autonomy into consequential actions.' Option A is partially correct about drafting but wrong that sending requires manual approval — if write permission is configured, the agent can send. Option C is incorrect; the connector is scoped to specified mailboxes only. Option D is wrong; per-email administrator approval is not the scrutiny model described.",
source: "Lesson 6: The MCP Connector Ecosystem"
},
{
question: "A junior data analyst writes in a connector specification: 'Connect to our procurement system.' His manager rewrites it as: 'Connect to our on-premises SAP S/4HANA instance at the EU production environment. Retrieve open purchase orders, vendor master records, and goods receipt confirmations. Filter purchase orders by vendor ID and date range. Read-only access; exclude any rows from the executive compensation cost centre.' What principle of custom connector specification does the rewrite demonstrate?",
options: [
"Connector specifications should be written in YAML format for developer readability",
"A sufficient specification addresses four questions: which system (precisely), what data, what query types, and what permissions — including any row-level restrictions",
"Connector specifications should be reviewed by legal before submission to IT",
"Custom connectors require a signed contract with the external system provider before development begins"
],
correctOption: 1,
explanation: "Lesson 6 defines the four questions a sufficient plain-language specification addresses: which system (precisely named, including version and environment), what data (specific entities), what queries (the questions the agent will need to ask), and what permissions (read-only or read-write, row-level restrictions). The manager's rewrite addresses all four. The analyst's original specification answers none of them usefully. Option A is wrong; specifications are written in plain language, not YAML. Option C is not a step in the commissioning process described. Option D invents an external contract requirement.",
source: "Lesson 6: The MCP Connector Ecosystem"
},
{
question: "A financial services firm deploys a Cowork plugin for portfolio analysis. Junior analysts and senior portfolio managers both use it. The administrator configures role-based scoping so that all finance team members can run standard market summaries and portfolio screening, but only senior portfolio managers can trigger escalation routing to the investment committee. Which governance mechanism enables this configuration?",
options: [
"The SKILL.md Questions section defines which user roles can access which capabilities",
"IAM-integrated permissions with role-based scoping — Cowork inherits permissions from the organisation's IAM system and administrators can restrict which capabilities different roles can access within the plugin",
"The plugin manifest output_format setting controls which output types are available to different user roles",
"Shadow mode restricts escalation routing to senior users during the initial deployment period"
],
correctOption: 1,
explanation: "Lesson 7 explains that Cowork inherits permissions from the organisation's IAM system (Azure AD, Okta, or equivalent) and that 'within the population of authorised users, role-based scoping allows more granular control.' The example in the lesson specifically describes restricting escalation routing to the FP&A lead. This configuration is defined in the organisation's admin settings, not in the SKILL.md. Option A is wrong; the Questions section defines scope of content, not user role capabilities. Option C is incorrect; the output_format setting governs rendering, not role-based access. Option D misidentifies shadow mode as the access control mechanism.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A compliance officer at a financial services firm is reviewing a potential AI governance incident. An AI agent assisted with a contract review that is now being challenged by a counterparty. The compliance officer needs to demonstrate what the agent queried, what sources it consulted, and what output it produced. Which Cowork governance feature enables her to do this?",
options: [
"The shadow mode report — a summary of all outputs reviewed during the shadow mode period",
"The SKILL.md Principles section — which records the operating logic applied to each interaction",
"The audit log — which logs the user's query, data sources accessed, output generated, timestamp, and user identity for every interaction",
"The plugin manifest version history — which tracks every change to the plugin configuration"
],
correctOption: 2,
explanation: "Lesson 7 states: 'The audit trail is not a surveillance mechanism. It is a defensibility asset.' The audit log records exactly what the compliance officer needs: query, data sources, output, timestamp, user identity. The lesson makes the point explicit: 'With an audit trail, the compliance department can produce an exact account of what happened: which version of the contract the agent reviewed, which legal research databases it queried, what output it generated, when, and for whom.' Option A is wrong; shadow mode reports cover the transition period, not ongoing production interactions. Option B is incorrect; the SKILL.md records the rules, not each interaction's execution. Option D is wrong; version history tracks configuration changes, not interaction logs.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A newly deployed Cowork plugin for claims processing at an insurance firm has been in shadow mode for 22 days. The quality review shows 94% accuracy with no critical errors in the past 10 days. The business team wants to go live immediately. What is the correct response?",
options: [
"The plugin can go live — 94% accuracy exceeds the minimum threshold of 90% for shadow mode transition",
"The plugin cannot transition yet — both criteria must be met: a minimum of 30 days in shadow mode AND 95% accuracy. The 30-day minimum has not been reached, and accuracy is below the 95% threshold",
"The plugin can go live — the 10-day error-free period demonstrates the agent is ready",
"The plugin can transition with administrator approval overriding the standard thresholds"
],
correctOption: 1,
explanation: "Lesson 7 is precise: 'The standard shadow mode protocol is specific: a minimum of 30 days, with a 95% accuracy threshold across a representative sample.' Both criteria must be met: 30 days minimum AND 95% accuracy with no critical errors in the preceding 10 days. At 22 days, the time criterion is not met; at 94%, the accuracy criterion is also not met. The lesson explicitly states: 'The 30-day minimum is not negotiable.' Option A invents a 90% threshold. Option C is wrong; the error-free period is one component of a multi-criterion test. Option D incorrectly suggests administrator override of the transition protocol.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A healthcare organisation is configuring HITL gates for a clinical documentation agent. A senior clinician argues that the agent should require human review for every output, since stakes are high. A governance architect responds that this approach misunderstands the HITL principle. What is the governance architect's argument?",
options: [
"Excessive human review is prohibited by Cowork's platform-level constraints",
"Requiring human approval for every output means the agent is not functioning autonomously — it becomes a drafting tool with limited productivity gain, and governance means requiring human judgment only where it genuinely matters, not for everything",
"The 95% shadow mode threshold means the agent is reliable enough not to require review on most outputs",
"HITL gates are temporary safeguards that should be reduced as the agent builds its performance record"
],
correctOption: 1,
explanation: "Lesson 7 states: 'Governance is not an argument for requiring more human approval; it is an argument for requiring it only where it matters.' If every output requires approval, the agent is effectively a sophisticated drafting tool — 'the productivity gain is real but limited.' HITL gates are designed to be applied to actions that carry consequences requiring human accountability, not as a blanket review mechanism. Option A is wrong; there is no platform-level prohibition on human review settings. Option C is irrelevant — accuracy thresholds govern shadow mode transition, not HITL gate design. Option D is partially true but misses the point; some HITL gates are permanent because the accountability requirement is structural.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A sales operations team is designing HITL gates for their lead qualification agent. They debate whether the agent should autonomously route qualified leads to the sales pipeline, or whether a human must approve each routing decision. Applying the HITL principle correctly, what is the right framework for this decision?",
options: [
"All agent decisions affecting the sales pipeline require human approval, because the pipeline is a shared resource",
"The question is whether routing a qualified lead is a decision that requires human judgment — contextual factors, institutional history, implicit constraints — or merely human attention. If it requires only attention, the agent can be autonomous; if it genuinely needs judgment, a HITL gate applies",
"HITL gates must be applied to all actions with external consequences, including pipeline routing",
"The decision should be made by the administrator, since HITL gate design is a governance function"
],
correctOption: 1,
explanation: "Lesson 7 distinguishes between human attention (a person reads or checks something) and human judgment (a person integrates contextual factors that cannot be encoded in a SKILL.md). HITL gates govern the second category — actions where accountability must remain with a person. For routine lead qualification routing that follows well-defined criteria, human attention may suffice and autonomous operation is appropriate. For decisions involving complex relationship context or institutional history, human judgment may be genuinely required. Option A applies an overly broad rule (shared resource = human approval). Option C similarly overgeneralises external consequences as requiring HITL. Option D incorrectly assigns the design decision to the administrator rather than the knowledge worker.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A Cowork plugin's financial research reports are consistently citing a regulatory capital standard that was revised four months ago. The knowledge worker insists this must be a connector issue because 'the agent is pulling old data.' IT investigates and finds all connectors are current and functioning correctly. Whose problem is this, and why?",
options: [
"IT's problem — even if connectors are current, data formatting by the MCP connectors may be applying old transformation rules",
"The administrator's problem — governance settings may be caching outputs from before the regulatory revision",
"The knowledge worker's problem — the SKILL.md Principles section likely encodes the old regulatory standard, and only the knowledge worker can update domain-specific operating logic",
"A shared problem — both IT and the knowledge worker must update their respective components simultaneously"
],
correctOption: 2,
explanation: "Lesson 8 uses an equivalent scenario as a diagnostic example: 'The agent is consistently misclassifying a type of contract clause that has become more common in the past six months... This is a knowledge worker problem. The Principles section does not account for this clause structure because it did not exist when the SKILL.md was authored.' Similarly, a revised regulatory standard that has not been updated in the SKILL.md means the agent is applying the old standard encoded in its Principles section. IT's connectors are fine — the problem is the intelligence layer. Option A is wrong; IT has confirmed connectors are current. Option B is incorrect; governance settings do not cache regulatory standards. Option D is wrong; this is precisely the type of problem the ownership model makes unambiguous.",
source: "Lesson 8: The Division of Responsibility"
},
{
question: "Users in the compliance department of a financial services firm can no longer access a Cowork plugin that the rest of the finance team uses normally. The knowledge worker who authored the SKILL.md suspects an error in the Principles section. Is she looking in the right place?",
options: [
"Yes — if the Principles section includes a restriction on compliance team access, the agent could enforce it",
"No — access control is not governed by the SKILL.md. This is an IT or administrator problem: either a connector permission changed (IT) or the access control configuration was misconfigured (administrator)",
"Possibly — the Questions section might be restricting compliance team queries",
"Yes — the Persona section could be excluding compliance users based on their role description"
],
correctOption: 1,
explanation: "Lesson 8 includes exactly this scenario as a diagnostic example: 'Users in the compliance department can no longer access the plugin... This is an IT or administrator problem, depending on whether the issue is a connector permission change (IT) or an access control misconfiguration (admin). The knowledge worker's SKILL.md is not involved — the agent's logic has not changed, only who can reach it.' The SKILL.md governs the intelligence layer; access control belongs to IT and the administrator. Option A, C, and D all incorrectly attribute access control to different sections of the SKILL.md.",
source: "Lesson 8: The Division of Responsibility"
},
{
question: "A knowledge worker designed a plugin for contract triage 18 months ago. She has not reviewed the SKILL.md since initial deployment. Her colleague notes that the regulatory landscape in their jurisdiction has changed significantly and several court decisions have altered standard clause interpretation. What does the ownership model say about the knowledge worker's obligation?",
options: [
"The knowledge worker has no obligation to update the SKILL.md — that is the administrator's responsibility during periodic governance reviews",
"The knowledge worker should flag the regulatory changes to IT so they can update the connector data sources",
"SKILL.md maintenance is ongoing professional discipline — the knowledge worker is responsible for updating the Principles section when domain standards, regulatory requirements, or organisational context change",
"The knowledge worker should submit a ticket to the Cowork platform support team to request a regulatory update"
],
correctOption: 2,
explanation: "Lesson 8 addresses this directly: 'Authoring a SKILL.md and deploying the plugin is not the completion of the knowledge worker's responsibility — it is the beginning of the maintenance phase... A SKILL.md that is not reviewed is a SKILL.md that is becoming wrong.' The knowledge worker owns the intelligence layer, including the operating logic that encodes regulatory standards. When those standards change, the SKILL.md must be updated by the person who understands the domain. Option A incorrectly assigns this responsibility to the administrator. Option B misidentifies it as a connector data source issue. Option D invents a platform support pathway for domain content updates.",
source: "Lesson 8: The Division of Responsibility"
},
{
question: "An IT engineer decides to 'help' a knowledge worker by editing the Principles section of a SKILL.md to make the agent more conservative after receiving user complaints. The knowledge worker later discovers the edit and is concerned. What does the layer independence principle say about this situation?",
options: [
"The IT engineer's edit is acceptable because they have system access and acted in good faith",
"IT editing the SKILL.md violates the layer independence principle — IT does not have the domain expertise to determine which Principles constraints are regulatory requirements versus stylistic preferences, and the edit may have introduced errors that are invisible to anyone without domain knowledge",
"The knowledge worker must accept IT's changes because IT owns the connectors (.mcp.json) and plugin infrastructure",
"The administrator should approve or reject IT's edit after reviewing the compliance implications"
],
correctOption: 1,
explanation: "Lesson 8's layer independence principle states: 'Consider what happens if IT decides to help by editing the SKILL.md's Principles section... IT does not know enough about the domain to make that edit correctly. They do not know which constraints are regulatory requirements and which are stylistic preferences.' The model's independence is structural: each role has no incentive to intrude on the other two layers because each layer contains only what that role understands. IT's well-intentioned edit may produce an agent that is quietly wrong in ways neither IT nor users can detect. Option A confuses good intent with appropriate expertise. Option C is wrong; IT owns connectors (.mcp.json) and plugin infrastructure, not the SKILL.md. Option D incorrectly assigns adjudication to the administrator.",
source: "Lesson 8: The Division of Responsibility"
},
{
question: "A knowledge worker has been using a Cowork plugin for legal research. She notices the agent occasionally draws on client data from accounts whose matters are closed and should no longer be accessible. She reports this to her manager as 'a SKILL.md logic problem.' Is she correct?",
options: [
"Yes — the SKILL.md Principles section must include explicit exclusions for closed client matters",
"Possibly — both the SKILL.md and the connector scope may need to be reviewed",
"No — connector scope is configured in the .mcp.json and implemented in the MCP connectors, both owned by IT. The misconfiguration is in the integration layer, not the intelligence layer",
"No — this is a governance configuration issue and the administrator should restrict the plugin's data access"
],
correctOption: 2,
explanation: "Lesson 8 provides a near-identical diagnostic example: 'The agent is occasionally drawing on client data from accounts it should not have access to. Whose problem is this? This is an IT problem. Connector scope is configured in the .mcp.json and implemented in the MCP connectors — both owned by IT.' The SKILL.md cannot enforce data access restrictions that the connector configuration has not implemented — scope boundaries are a configuration layer responsibility. Option A is wrong; even if the SKILL.md excluded closed matters, the connector scope would still need to be corrected. Option B overcomplicates the diagnosis. Option D is wrong; scope configuration is IT's responsibility, not the administrator's.",
source: "Lesson 8: The Division of Responsibility"
},
{
question: "A senior contracts lawyer has spent six weeks refining a SKILL.md for contract triage that encodes her firm's clause risk standards for commercial leases in English law. A colleague asks: 'Could you publish this to the Cowork marketplace as a vertical skill pack?' The lawyer is uncertain. What is the correct publishability test to apply?",
options: [
"The technical test: is the SKILL.md written in valid markdown format without proprietary syntax?",
"The transferability test: is the knowledge general enough to be valuable to practitioners at other organisations without requiring access to this firm's proprietary systems, client relationships, or internal case history?",
"The legal test: does the firm's partnership agreement permit partners to publish proprietary work product to external platforms?",
"The completeness test: does the SKILL.md have fully specified Persona, Questions, and Principles sections?"
],
correctOption: 1,
explanation: "Lesson 9 defines the publishability test as the transferability test: 'could a practitioner at a competitor organisation, using only publicly available information and general professional training, arrive at the same knowledge independently? If yes, it is transferable. If the knowledge depends on access to your clients, your cases, your systems, or your internal documents to make sense, it is not transferable.' General commercial lease clause risk standards for English law may be transferable; the firm's twenty years of case-specific interpretations are not. Option A is not a publishability criterion. Option C is a firm governance question unrelated to the lesson's framework. Option D tests structural completeness, not publishability.",
source: "Lesson 9: The Cowork Plugin Marketplace"
},
{
question: "A financial services firm subscribes to a connector package for financial research from the Cowork marketplace. The package includes a SKILL.md template and pre-built connectors for FactSet, Snowflake, and HubSpot. What must the firm still do before deploying the plugin?",
options: [
"Nothing — connector packages are ready to deploy immediately upon subscription",
"Commission custom connectors for their specific FactSet and Snowflake configurations",
"Configure their own API credentials and permission scopes for each connector, and customise the SKILL.md with their institutional knowledge — jurisdiction-specific standards, escalation routing, and internal conventions",
"Submit the SKILL.md to a Cowork marketplace review team for approval before customising it"
],
correctOption: 2,
explanation: "Lesson 9 states: 'The subscriber still needs to provide their own API credentials and configure permission scopes appropriate to their deployment. But the connector infrastructure itself... arrives pre-built rather than requiring commissioning.' Additionally, the SKILL.md template requires customisation: 'The marketplace provides architecture; the knowledge worker inside the subscribing organisation provides the institutional knowledge that transforms a general template into a deployed agent that actually reflects how their practice works.' Option A is wrong; connector packages are starting points, not finished products. Option B is wrong; connectors are pre-built — that is the package's value. Option D is incorrect; no marketplace review team approval process is described.",
source: "Lesson 9: The Cowork Plugin Marketplace"
},
{
question: "A knowledge worker at a clinical research firm has developed deep expertise in managing Phase III clinical trial protocols under EMA regulations. She wants to publish a marketplace skill pack but is unsure what to include. Which of the following is the most appropriate candidate for inclusion in the marketplace?",
options: [
"Her firm's specific patient recruitment database schema and CRO partner contact lists",
"The general framework for structuring protocol deviation documentation and escalation thresholds under EMA ICH E6 guidelines — knowledge any qualified clinical research professional would recognise as sound",
"Her organisation's proprietary algorithm for predicting trial dropout rates based on historical patient data",
"The specific dosing calculations used in her firm's current Phase III cardiovascular study"
],
correctOption: 1,
explanation: "Lesson 9's transferability test asks: is this knowledge 'general enough to be valuable to practitioners at other organisations without requiring access to your proprietary systems, client relationships, or internal documents?' The general framework for protocol deviation documentation under EMA ICH E6 guidelines represents transferable professional knowledge — other clinical research organisations following the same regulatory framework would benefit. Options A, C, and D are all proprietary or study-specific and fail the transferability test: they depend on the firm's specific systems, historical data, or current study context.",
source: "Lesson 9: The Cowork Plugin Marketplace"
},
{
question: "A knowledge worker compares two marketplace offerings for a sales enablement domain agent. Option A is a vertical skill pack: a SKILL.md template only. Option B is a connector package: the same SKILL.md template plus pre-built HubSpot, Close, and Clay connectors. Her IT team has limited capacity this quarter. Which option is more appropriate, and why?",
options: [
"Option A — vertical skill packs are higher quality because they require more customisation effort from the subscriber",
"Option B — the connector package reduces the IT work required because the connector infrastructure is pre-built, requiring only credential configuration rather than connector commissioning",
"Option A — vertical skill packs are less expensive than connector packages and provide equivalent functionality",
"Option B — connector packages bypass the requirement to customise the SKILL.md with institutional knowledge"
],
correctOption: 1,
explanation: "Lesson 9 states: 'A connector package bundles MCP connectors alongside a SKILL.md template to enable more complete deployment from a single subscription... the connector infrastructure itself arrives pre-built rather than requiring commissioning.' For a team with limited IT capacity, the connector package reduces the time-consuming connector commissioning work to credential configuration only. Option A is wrong; the quality distinction is based on content, not customisation effort. Option C is incorrect; price comparison is not discussed in the lesson. Option D is wrong; the connector package still requires SKILL.md customisation with institutional knowledge — that requirement does not change.",
source: "Lesson 9: The Cowork Plugin Marketplace"
},
{
question: "An agent deployed for HR policy enquiries begins giving advice about an employee's specific disciplinary case — including recommending an outcome — despite having no connectors to HR case management systems. The HR director calls this a 'governance failure.' Which architectural element, if properly specified, would most directly have prevented this?",
options: [
"A shadow mode extension to 60 days would have revealed this pattern before production deployment",
"A well-specified out-of-scope section in the Questions section, with positive redirection to qualified HR advisers for specific disciplinary matters and outcome recommendations",
"An organisation-level policy blocking all HR-related queries to prevent liability",
"A write-only connector permission preventing the agent from accessing employee records"
],
correctOption: 1,
explanation: "This is a scope failure: the agent is answering queries outside its remit and producing advice that carries accountability consequences. Lesson 2 explains that without a defined out-of-scope boundary, 'the agent will attempt to answer queries it cannot handle well.' A properly specified Questions section would explicitly list specific disciplinary outcomes as out-of-scope and direct users to qualified HR advisers. This also connects to Lesson 5's principle of positive redirection. Option A addresses testing duration but not the architectural gap. Option C is an overcorrection that would make the agent useless. Option D is irrelevant — the problem is scope definition, not data access.",
source: "Lessons 2 and 5: The Intelligence Layer; The PQP Framework in Practice"
},
{
question: "A BIM coordination agent has been in shadow mode for 35 days. Its outputs have been reviewed by qualified structural engineers and MEP coordinators. The accuracy review shows 96% of outputs meeting the rubric criteria, with no critical errors in the past 12 days. The project lead wants to transition to autonomous operation. What is the correct assessment?",
options: [
"The agent cannot transition — a minimum of 45 days is required for construction industry plugins due to safety requirements",
"The agent meets both transition criteria: minimum 30 days in shadow mode (35 days achieved) and 95% accuracy threshold with no critical errors in the preceding 10 days (96% accuracy, 12 error-free days)",
"The agent cannot transition — 96% accuracy must be sustained for 30 consecutive days, not just observed in a sample",
"The agent can transition only after the administrator approves the accuracy review results"
],
correctOption: 1,
explanation: "Lesson 7 defines the shadow mode transition criteria precisely: 'a minimum of 30 days, with a 95% accuracy threshold across a representative sample... and when there have been no critical errors in the preceding 10 days.' The agent has met all three: 35 days (exceeds 30), 96% accuracy (exceeds 95%), and 12 error-free days (exceeds 10). Option A invents an industry-specific extension to the 30-day minimum. Option C invents a 30-consecutive-days accuracy requirement. Option D incorrectly adds an administrator approval step to the transition criteria.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A knowledge worker discovers that her clinical pharmacology agent has been producing dosage recommendations that occasionally exceed safe thresholds for patients with renal impairment. She is alarmed and immediately contacts IT. The IT team says all connectors are functioning correctly and data from the formulary connector is accurate. Where does the problem most likely lie?",
options: [
"In the governance layer — the administrator has not configured appropriate HITL gates for clinical outputs",
"In the connector permissions — the formulary connector should be read-only and may have been set to write, allowing incorrect data to be introduced",
"In the SKILL.md Principles section — the operating logic for dosage calculation and the escalation threshold for renal function-specific limits likely needs to be reviewed and updated by the knowledge worker",
"In the platform context — Anthropic's constraints may be preventing the agent from accessing the full formulary dataset"
],
correctOption: 2,
explanation: "With connectors confirmed as functioning correctly, the issue is in the intelligence layer — specifically the Principles section that encodes dosage calculation logic and escalation thresholds. Lesson 2 describes domain-specific principles like 'dosage verification against weight and renal function' and 'contraindication flagging.' If the SKILL.md's operating logic is insufficiently specific about renal-function-based dosage adjustments, the agent may produce outputs that appear correct but are clinically unsafe for this patient subgroup. This is a knowledge worker problem requiring SKILL.md review. Option A is possible but secondary — HITL gates would catch the outputs, not prevent the generation error. Option B is wrong; IT confirmed connectors are correct. Option D is wrong; platform constraints would prevent actions entirely, not produce incorrect recommendations.",
source: "Lessons 2 and 8: The Intelligence Layer; The Division of Responsibility"
},
{
question: "A knowledge worker is reviewing the ownership table for her Cowork plugin. She sees that 'Performance monitoring' is listed as 'Knowledge worker + IT.' Why is this the only row with shared ownership, and what does each party monitor?",
options: [
"Both roles share ownership because performance monitoring requires administrator approval before any changes are made",
"The knowledge worker monitors the quality dimension of audit logs — whether outputs are domain-correct — while IT monitors the technical dimension: connector health, latency, and error rates. The overlap is explicit and bounded to these complementary perspectives",
"IT monitors all technical performance and the knowledge worker provides periodic qualitative feedback through a formal review process",
"The shared ownership is a transitional arrangement until the plugin has passed shadow mode, after which IT takes sole ownership of monitoring"
],
correctOption: 1,
explanation: "Lesson 8 explains: 'Performance monitoring is shared because the knowledge worker reads the quality dimension of the audit log while IT monitors the technical dimension: connector health, latency, error rates. The overlap is explicit and bounded.' Quality assessment requires domain expertise — IT cannot determine whether a contract triage output correctly identified a risk clause; only the knowledge worker can. Technical monitoring requires infrastructure expertise — the knowledge worker does not assess connector latency. The shared ownership is permanent and purposeful. Option A invents an administrator approval mechanism. Option C is vague and does not reflect the explicit quality/technical split. Option D is incorrect; shared monitoring is not a transitional arrangement.",
source: "Lesson 8: The Division of Responsibility"
},
{
question: "A legal technology company wants to publish a marketplace skill pack for contract triage. They have expertise in English commercial law, GDPR compliance clauses, and standard indemnification structures. They also have twenty years of precedent from their own client portfolio. What should the marketplace listing include, and what should be excluded?",
options: [
"Everything should be included — the client precedent makes the skill pack more valuable",
"The general framework for contract clause risk assessment, GDPR compliance flagging logic, and standard indemnification risk thresholds should be included. Client-specific precedent and proprietary interpretation history should be excluded",
"Only the Persona section should be published — Questions and Principles sections contain too much proprietary information",
"The client precedent should be anonymised and then included, as anonymisation removes the IP concern"
],
correctOption: 1,
explanation: "Lesson 9's transferability test governs this decision: general best practice is publishable; organisation-specific proprietary context is not. The general framework for clause risk assessment and standard GDPR/indemnification logic represents knowledge 'a practitioner at a competitor organisation, using only publicly available information and general professional training,' could independently arrive at — it is transferable. Twenty years of client-specific precedent is proprietary institutional knowledge that fails the transferability test and must remain internal. Option A is wrong; client precedent fails the transferability test. Option C is an unnecessary restriction — the full three-section structure should be published with appropriate content. Option D is incorrect; anonymisation does not change whether the knowledge is transferable.",
source: "Lesson 9: The Cowork Plugin Marketplace"
},
{
question: "A knowledge worker designs a Cowork plugin for financial research. She wants to ensure the agent can access market data from a financial data provider and internal deal records from Snowflake, but not HR compensation records that also reside in Snowflake. Which two architectural mechanisms ensure this protection?",
options: [
"The SKILL.md Principles section explicitly prohibiting HR data access, and the shadow mode rubric excluding HR-related queries",
"The connector scope in the .mcp.json, which limits Snowflake access to specific data categories, and the Cowork runtime enforcement that enforces scope boundaries regardless of what the SKILL.md instructs",
"The audit log, which flags HR data queries for review, and the HITL gate that routes any HR-touching output to the administrator",
"The platform-level context, which prevents Claude from accessing HR data in any enterprise deployment, and the knowledge worker's Principles instruction to avoid HR queries"
],
correctOption: 1,
explanation: "Lesson 3 explains both mechanisms working together. The .mcp.json scope field narrows what the agent can see within a connector: 'Perhaps the same Snowflake environment contains HR data, executive compensation records... none of which this agent should touch. The scope definition enforces that boundary.' Lesson 3 also states: 'Permission boundaries are enforced by the Cowork runtime, not by the SKILL.md. If the Financial Research Agent's SKILL.md were somehow to instruct it to access payroll data, the attempt would fail safely — because payroll data is not within the configured scope.' Option A incorrectly assigns data access control to the SKILL.md. Option C conflates audit logging with access prevention. Option D invents a platform-level HR data restriction.",
source: "Lessons 3 and 4: The Configuration and Integration Layers; The Three-Level Context System"
},
{
question: "An enterprise AI architect is designing the governance framework for a Cowork deployment across a healthcare organisation. She is deciding whether to configure shadow_mode: true as the default for all new clinical plugins, or to require administrators to manually activate it per plugin. What does the lesson recommend, and why does shadow mode matter specifically in clinical contexts?",
options: [
"Manual activation is recommended — administrators should assess each plugin individually before shadow mode is required",
"Shadow mode as a default is appropriate for clinical contexts because the 30-day review period builds the evidence base and organisational confidence required before clinical outputs can be trusted for autonomous operation — and the 95% accuracy threshold must be calibrated to clinical safety standards, not just general accuracy",
"Shadow mode is unnecessary in healthcare because HITL gates provide sufficient protection for all clinical outputs",
"The platform-level context automatically enables shadow mode for all clinical deployments, so no configuration is required"
],
correctOption: 1,
explanation: "Lesson 7 explains that shadow mode serves two purposes: quality validation and organisational confidence-building. In clinical contexts, the lesson notes specifically that 'clinical accuracy requirements for HITL gate configuration are covered in depth in Chapter 21... The clinical context introduces additional considerations — regulatory requirements, professional liability standards, patient safety thresholds — that go beyond what the standard governance layer covers.' The 30-day period ensures the evidence base covers diverse input types, and the 95% threshold must be calibrated to clinical standards (which may be higher than 95% for certain clinical outputs). Option A is weaker — a consistent policy for clinical plugins is preferable. Option C is wrong; HITL gates govern autonomous action boundaries, not the evidence-building process. Option D invents a platform-level clinical automation.",
source: "Lesson 7: The Governance Layer"
},
{
question: "A Cowork plugin for HR analytics has been producing reports that are accurate and well-structured. A knowledge worker updates the SKILL.md to expand the agent's scope to include salary benchmarking analysis. After the update, the agent still does not produce salary benchmarking outputs. The knowledge worker has confirmed the instruction is clearly written and correctly placed in the Questions section. What should she check next?",
options: [
"Whether the SKILL.md update was saved correctly — the file may not have been committed to the plugin",
"Whether salary benchmarking data is within the configured scope of the connected data sources in the .mcp.json, and whether any organisation-level policy restricts agent access to compensation data",
"Whether the Persona section needs to be updated to explicitly authorise salary benchmarking activities",
"Whether the administrator has approved the SKILL.md update before it becomes active"
],
correctOption: 1,
explanation: "This is a three-level context diagnostic situation. The SKILL.md instruction is confirmed correct, so the knowledge worker should move up the hierarchy. Salary benchmarking requires access to compensation data, which may not be within the configured scope of existing connectors. Additionally, an organisation-level policy may restrict agent access to compensation-related data — a financial services or HR organisation might have policies preventing agents from querying compensation data without additional controls. Lesson 4's diagnostic sequence: if the SKILL.md instruction is confirmed correct, check organisation level next, then platform level. Option A is a legitimate technical check but not the analytical answer the question seeks. Option C is incorrect; the Persona section governs identity, not data access authorisation. Option D is wrong; no administrator approval for SKILL.md updates is described.",
source: "Lessons 3 and 4: The Configuration and Integration Layers; The Three-Level Context System"
},
{
question: "A knowledge worker reviews a draft SKILL.md Principles section that includes: 'Always provide the most helpful and accurate information possible based on the available data.' A senior colleague marks this as insufficient. What revision would make it domain-specific and therefore functional for a legal contract triage agent?",
options: [
"Always provide the most helpful and accurate information possible based on the available data, with a maximum response length of 500 words",
"Flag any clause that modifies the indemnity cap below the contract value, any jurisdiction reference outside England and Wales, any penalty clause with uncapped liability, and any force majeure clause excluding circumstances beyond a narrowly defined list. For each flag, state the risk and the recommended action",
"Be helpful, accurate, and transparent in all contract-related analysis, ensuring outputs meet the professional standards of the legal industry",
"Provide accurate contract analysis drawing on all available legal research databases and precedent sources"
],
correctOption: 1,
explanation: "Lesson 2 uses almost exactly this example: 'Flag any clause that modifies the indemnity cap below the contract value, any jurisdiction reference outside England and Wales, any penalty clause with an uncapped liability provision, and any force majeure clause that excludes circumstances beyond a narrowly defined list. For each flag, state the risk and the recommended action.' This is the contrast between generic principles (which the lesson identifies as insufficient) and domain-specific principles (which are actionable). Option A adds a word limit but remains generic. Option C remains aspirational without actionable guidance. Option D specifies data sources but not the operating logic for what to look for.",
source: "Lesson 2: The Intelligence Layer — SKILL.md"
},
{
question: "A Cowork administrator is configuring a new plugin for the procurement team. The knowledge worker has specified that junior buyers should be able to query supplier contract terms, but only senior buyers should be able to trigger the escalation routing that sends flagged contracts to the legal team. How is this configuration implemented?",
options: [
"In the SKILL.md Questions section, where the knowledge worker specifies different capabilities for different user types",
"In the organisation's admin settings using role-based scoping that inherits from the IAM system, restricting escalation routing capability to senior buyer credentials",
"In the plugin manifest governance section, where the knowledge worker configures per-role output permissions",
"In the connector permission scope, where IT assigns read permissions to junior buyers and write permissions to senior buyers"
],
correctOption: 1,
explanation: "Lesson 7 explains: 'Within the population of authorised users, role-based scoping allows more granular control.' The example in the lesson describes restricting escalation routing to the FP&A lead — identical to this scenario. 'This scoping is defined in the organisation's admin settings, not in the SKILL.md.' The administrator configures role-based access based on IAM identities. Option A is wrong; the SKILL.md does not configure per-role capabilities. Option C is wrong; the knowledge worker does not configure per-role permissions in the plugin manifest — that is the administrator's responsibility in org admin settings. Option D is wrong; connector permissions govern data access, not user role capability within the plugin.",
source: "Lesson 7: The Governance Layer"
}
]}
/>
