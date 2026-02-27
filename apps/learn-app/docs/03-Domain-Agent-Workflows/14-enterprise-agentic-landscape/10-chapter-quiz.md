---
sidebar_position: 10
title: "Chapter 14: The Enterprise Agentic Landscape Quiz"
---

# Chapter 14: The Enterprise Agentic Landscape Quiz

Test your understanding of the enterprise agentic landscape — from the Pilot Trap to platform selection, monetisation models, maturity assessment, and domain mapping.

<Quiz
title="Chapter 14: The Enterprise Agentic Landscape Assessment"
questions={[
{
question: "A large insurance company has been running an AI chatbot pilot for 14 months. The team presents impressive demo slides to leadership every quarter, but no agent has been deployed into production workflows. A vendor attends every strategy meeting. Which pattern best describes this organisation's situation?",
options: [
"A successful incremental AI adoption strategy proceeding as planned",
"The Pilot Trap — AI investment producing demonstrations but not deployments",
"A technology gap where the AI models are not yet capable enough",
"A change management delay that will resolve once training is complete"
],
correctOption: 1,
explanation: "This organisation is in the Pilot Trap — the condition where AI investment produces demonstrations but not deployments. The 14-month perpetual pilot, slide-driven outcomes, and vendor dependency are three of the four classic Pilot Trap symptoms identified in Lesson 1. Option A is incorrect because no deployment has occurred after 14 months, which is stagnation, not incremental progress. Option C is wrong because the lesson explicitly states that the models were capable enough by mid-2024 — the problem is structural, not technological. Option D misidentifies the root cause; change management is a contributing factor but misses the central structural problem: the knowledge transfer gap.",
source: "Lesson 1: The Year That Did Not Deliver"
},
{
question: "A senior compliance officer at a bank deeply understands which contract clause patterns represent genuine risk in specific jurisdictions. A development team at the same bank can build and deploy software but lacks compliance expertise. What does this scenario illustrate?",
options: [
"A hiring problem that can be solved by recruiting developers with compliance backgrounds",
"A model capability limitation where AI cannot process legal language",
"The knowledge transfer gap — domain experts cannot encode knowledge, system builders cannot acquire it",
"An organisational silo issue resolved through better cross-team communication"
],
correctOption: 2,
explanation: "This directly illustrates the knowledge transfer gap — the structural divide between domain experts who understand the work and system builders who can deploy systems. The compliance officer has the knowledge but no pathway to encode it; the developers have the tools but not the domain understanding. Option A is wrong because recruiting hybrid talent does not solve a structural problem — the gap exists because there is no mechanism for encoding domain knowledge, not because individuals lack both skills. Option B is incorrect because model capability is not the limiting factor; the models are capable but require domain knowledge to be useful. Option D oversimplifies the problem — better communication does not solve the absence of a structural pathway for knowledge encoding.",
source: "Lesson 1: The Year That Did Not Deliver"
},
{
question: "An organisation deploys a ChatGPT integration in Slack that answers employee questions using the company knowledge base. According to the wrapper vs agent distinction, what has this organisation actually deployed?",
options: [
"A wrapper — a thin integration layer that performs one task in one context when asked",
"An agent — an autonomous system operating across enterprise workflows",
"A hybrid system combining wrapper convenience with agent autonomy",
"A production-grade agent that will evolve into full autonomy over time"
],
correctOption: 0,
explanation: "This is a wrapper: a single integration (Slack) performing one task (answering questions) in one context (company knowledge base) that only responds when a human asks. A wrapper adds AI capability to an existing tool but does not operate autonomously. Option B is wrong because an agent operates across multiple systems, makes decisions, sequences multi-step workflows, and acts on its own initiative — none of which a Slack chatbot does. Option C is incorrect because the system described has no autonomous capabilities; it is purely reactive. Option D is wrong because wrappers do not naturally evolve into agents — the architectural difference is fundamental, not incremental.",
source: "Lesson 1: The Year That Did Not Deliver"
},
{
question: "Why did improving AI model capability alone fail to close the enterprise AI adoption gap between 2024 and 2025?",
options: [
"Enterprise IT departments blocked AI model upgrades for security reasons",
"The models required specialised hardware that enterprises could not procure",
"Regulatory bodies prohibited the use of advanced AI models in enterprise settings",
"The bottleneck was encoding institutional knowledge into agents, not model performance"
],
correctOption: 3,
explanation: "The lesson explicitly states that no amount of model improvement closes the knowledge transfer gap. The models were capable enough by mid-2024. The problem was that no one could tell the AI what 'genuine risk in a given jurisdiction' means for a specific organisation. Option A is incorrect because the lesson does not attribute the stall to IT blocking upgrades — the problem was structural, not bureaucratic. Option B is wrong because hardware procurement was not identified as a barrier. Option C is incorrect because while compliance caution was mentioned as a contributing factor, it was not the central structural problem — that was the knowledge transfer gap.",
source: "Lesson 1: The Year That Did Not Deliver"
},
{
question: "A financial services firm proudly announces its 'AI-powered analysis platform.' Upon examination, the system generates standard ratio calculations and generic summaries. No institutional knowledge about which data sources to trust has been encoded. What does this reveal?",
options: [
"The firm has successfully deployed an agent that will improve over time through machine learning",
"The firm deployed a wrapper disguised as an agent — it lacks the domain-specific encoded knowledge that distinguishes genuine agents",
"The firm's AI platform is performing as expected for a first-generation deployment",
"The firm needs to upgrade to a more capable AI model to achieve meaningful results"
],
correctOption: 1,
explanation: "This firm has a wrapper: the system produces generic output (standard ratio calculations, generic summaries) without any encoded institutional knowledge. The key distinction from Lesson 1 is that agents carry domain-specific, encoded institutional knowledge — a senior analyst's understanding of which data sources to trust. Option A is wrong because the absence of institutional knowledge is a design problem, not something that resolves through machine learning. Option C normalises a fundamental gap; a system without domain knowledge is not performing 'as expected.' Option D repeats the fallacy that model capability is the bottleneck when the lesson identifies knowledge encoding as the central problem.",
source: "Lesson 1: The Year That Did Not Deliver"
},
{
question: "According to Lesson 1, what was the primary output of most enterprise AI initiatives by mid-2025?",
options: [
"Fully deployed autonomous agents operating across enterprise workflows",
"Technical infrastructure ready for agent deployment pending regulatory approval",
"Presentations to leadership rather than working systems deployed in production",
"Research papers documenting AI capability gaps that prevented deployment"
],
correctOption: 2,
explanation: "The Pilot Trap pattern is characterised by 'slide-driven outcomes' — the primary output of AI initiatives was presentations to leadership, not working systems. Option A directly contradicts the lesson, which states that almost no enterprises had deployed agents by end of 2025. Option B is incorrect because the infrastructure readiness was not the issue; the knowledge transfer gap was. Option D is wrong because the gap was not a capability gap (the models were capable enough) but a knowledge transfer gap.",
source: "Lesson 1: The Year That Did Not Deliver"
},
{
question: "The 2026 platform shift is best described as which type of change?",
options: [
"A model improvement — significantly more capable AI models that could handle enterprise tasks",
"A regulatory change — new government policies that enabled enterprise AI deployment",
"An architectural shift — production-grade platforms that put knowledge workers in the design seat",
"A cost reduction — AI becoming cheap enough for enterprise-scale deployment"
],
correctOption: 2,
explanation: "The lesson explicitly states the shift was 'not primarily a model improvement, though the models continued to improve. It was an architectural shift.' The platforms (Cowork and Frontier) put domain experts — not developers — in the position of designing, configuring, and deploying agents. Option A is directly contradicted by the text: the models of mid-2025 were already capable enough. Option B is wrong because no regulatory change is identified as the catalyst. Option D is incorrect because cost was not cited as the primary barrier or the primary change.",
source: "Lesson 2: What Changed in 2026"
},
{
question: "In the 2024 generation of enterprise AI tools, the primary user was the developer who builds while the domain expert advises. How did the 2026 platforms change this relationship?",
options: [
"The developer gained access to better AI tools, making domain expert input unnecessary",
"The domain expert designs the agent directly, and the platform handles deployment",
"Both the developer and domain expert now share equal responsibility for agent design",
"The domain expert selects from pre-built agent templates created by the platform vendor"
],
correctOption: 1,
explanation: "The 2026 platforms reversed the knowledge flow: instead of the expert describing needs to a developer who interprets and builds, the expert encodes knowledge directly into agent configuration. Option A is wrong because the lesson emphasises that domain expertise became more essential, not less — the entire point is that domain knowledge is the limiting factor. Option C is incorrect because the shift specifically elevated the domain expert to the primary design role, not an equal partnership. Option D is wrong because the platforms enable custom agent design by experts, not selection from vendor templates — that would recreate the same intermediary problem.",
source: "Lesson 2: What Changed in 2026"
},
{
question: "Why did the February 2026 demonstrations disrupt enterprise procurement cycles?",
options: [
"Agents were shown doing real work against live systems, crossing a threshold of accuracy and autonomy",
"The demonstrations offered significantly lower pricing than existing enterprise software",
"New regulations required enterprises to adopt AI platforms within a specific timeframe",
"The demonstrations proved that AI could replace all knowledge workers immediately"
],
correctOption: 0,
explanation: "The demonstrations showed agents operating in real enterprise workflows — querying live financial data, processing contracts, coordinating across building information models — at a level of accuracy and autonomy that crossed a threshold. They were doing the work, not just answering questions about it. Option B is wrong because pricing was not the disruptive factor — the capability demonstration was. Option C is incorrect because no regulatory mandate was involved. Option D overstates the impact; the lesson draws a careful distinction between displacement and amplification, not wholesale replacement.",
source: "Lesson 2: What Changed in 2026"
},
{
question: "Both Anthropic Cowork and OpenAI Frontier share three capabilities that the 2024 generation lacked. Which of the following is NOT one of those three?",
options: [
"Natural language configuration so domain experts describe behaviour in professional language",
"Domain knowledge encoding so experts can teach agents their institutional knowledge",
"Automated code generation that replaces the need for software developers",
"Production deployment into live enterprise workflows with security and governance"
],
correctOption: 2,
explanation: "Automated code generation replacing developers is NOT one of the three shared capabilities. The three capabilities are: natural language configuration (removing the developer bottleneck from agent design), domain knowledge encoding (closing the knowledge transfer gap), and production deployment (moving past the Pilot Trap). Option C is wrong because the platforms empower domain experts to work alongside developers, not replace them. Options A, B, and D are all correctly identified as the three shared capabilities in Lesson 2.",
source: "Lesson 2: What Changed in 2026"
},
{
question: "What is the structural implication of the 2026 platform shift for individual knowledge workers?",
options: [
"All knowledge workers will benefit equally from the platform shift regardless of their actions",
"Knowledge workers should wait for their organisations to deploy platforms before adapting",
"The platform shift primarily benefits IT departments, not individual knowledge workers",
"The professional who can encode domain expertise is in a structurally different competitive position from one who cannot"
],
correctOption: 3,
explanation: "The lesson states directly that the professional who can encode domain knowledge is in a 'structurally different position' — one whose expertise can be amplified through an agent at speed and scale. Option A is wrong because the lesson specifically warns that the gap between those who encode and those who do not will widen. Option B contradicts the lesson's urgency — 'the rest of Part 3 exists to ensure you are on the right side of it.' Option C is incorrect because the entire premise of the 2026 shift is that it specifically targets knowledge workers, not IT departments.",
source: "Lesson 2: What Changed in 2026"
},
{
question: "When a developer interprets a domain expert's requirements and translates them into code, what happens to the knowledge according to Lesson 2?",
options: [
"The knowledge is preserved accurately because developers are trained in requirements analysis",
"Information is lost at every handoff — ambiguity is introduced and edge cases are missed",
"The translation process improves the knowledge by adding technical rigour",
"Information loss only occurs if the developer lacks sufficient experience"
],
correctOption: 1,
explanation: "The lesson explicitly states that 'when a developer interprets a domain expert's requirements, information is lost at every handoff. The compliance officer explains what genuine risk means. The developer translates that into code. The translation introduces ambiguity, edge cases are missed.' Option A is incorrect because the lesson identifies this translation as inherently lossy, regardless of developer skill. Option C is wrong because technical translation does not improve domain knowledge — it degrades it through interpretation. Option D incorrectly frames this as an individual skill issue when it is a structural problem with intermediated knowledge transfer.",
source: "Lesson 2: What Changed in 2026"
},
{
question: "A contract review professional spends most of her time on two activities: first-pass scanning of standard contracts for routine clauses, and assessing complex cross-border indemnification clauses for jurisdiction-specific risk. How should she view these two activities?",
options: [
"Both activities are displacement-vulnerable because AI can read contracts faster than humans",
"First-pass scanning is displacement-vulnerable; cross-border risk assessment is amplification-eligible",
"Both activities are amplification-eligible because they require legal expertise",
"Cross-border assessment is displacement-vulnerable because AI models know more jurisdictions than any human"
],
correctOption: 1,
explanation: "First-pass scanning of standard contracts is high-volume, follows predictable rules, and requires limited contextual judgment — making it displacement-vulnerable. Cross-border indemnification assessment requires deep contextual knowledge, jurisdictional expertise accumulated over years, and professional judgment — making it amplification-eligible. Option A incorrectly treats all contract work as equal, ignoring the judgment dimension. Option C is wrong because first-pass scanning for standard clauses does not require the deep contextual knowledge that defines amplification-eligible work. Option D inverts the framework: the expertise moat is precisely that no general-purpose AI can replicate 15 years of jurisdiction-specific risk assessment experience.",
source: "Lesson 3: Knowledge Worker at the Centre"
},
{
question: "What is the 'expertise moat' and why is it defensible?",
options: [
"A technical certification that proves a knowledge worker can operate AI platforms",
"A legal protection that prevents AI from being used in regulated professional domains",
"Institutional knowledge encoded into an agent that generic AI cannot replicate because it requires years of domain-specific experience",
"A competitive advantage gained by being an early adopter of AI tools before competitors"
],
correctOption: 2,
explanation: "The expertise moat is created when a knowledge worker encodes deep domain expertise — patterns, standards, judgment criteria, edge cases that only experience reveals — into an agent. This knowledge is defensible because it takes years to accumulate, is specific to a domain and often an organisation, and cannot be replicated by downloading a more capable model. Option A is wrong because the moat is about knowledge encoding, not certification. Option B incorrectly frames it as a legal protection rather than a knowledge advantage. Option D is wrong because early adoption alone does not create a moat — the moat comes from the irreplaceable domain knowledge encoded, not the timing of platform adoption.",
source: "Lesson 3: Knowledge Worker at the Centre"
},
{
question: "The SKILL.md file is introduced in Lesson 3 as the mechanism through which domain expertise is encoded. Who is the intended author of a SKILL.md file?",
options: [
"The software developer who builds the agent's technical infrastructure",
"The domain expert — the knowledge worker whose institutional knowledge the agent will carry",
"The IT administrator who manages platform security and permissions",
"The AI vendor who provides pre-built templates for each industry"
],
correctOption: 1,
explanation: "The SKILL.md file is authored by the domain expert — the knowledge worker. This is the central innovation of the Agent Factory framework and the Cowork platform: the person who holds the institutional knowledge writes the instructions, not a developer or vendor. Option A contradicts the core lesson that the knowledge transfer gap exists precisely because developers cannot encode domain knowledge they do not possess. Option C is wrong because IT administrators handle config.yaml (guardrails and permissions), not SKILL.md (domain intelligence). Option D recreates the exact intermediary problem the platforms were designed to eliminate.",
source: "Lesson 3: Knowledge Worker at the Centre"
},
{
question: "An HR director knows that while the written policy says employees cannot work remotely from another country for three months, the actual answer is 'yes, if you follow this informal process that has worked for the last four cases.' This is an example of which concept?",
options: [
"A policy compliance failure that should be corrected rather than encoded",
"Displacement-vulnerable knowledge because a rule-based AI could learn the exception",
"General domain knowledge that could be published to a marketplace",
"Institutional knowledge that is amplification-eligible — contextual judgment that generic AI cannot replicate"
],
correctOption: 3,
explanation: "This is exactly the kind of institutional knowledge that creates an expertise moat — the HR director's understanding of the intent behind policies, the exceptions routinely granted, and the human context that formal documentation never captures. This contextual judgment is amplification-eligible because it requires years of experience and cannot be derived from the written policy alone. Option A misunderstands the nature of institutional knowledge — these informal processes represent real organisational practice, not compliance failures. Option B is wrong because a rule-based system cannot learn exceptions that exist only in one person's experiential judgment. Option C is incorrect because this is organisation-specific exception logic, not general domain knowledge suitable for a marketplace.",
source: "Lesson 3: Knowledge Worker at the Centre"
},
{
question: "What does it mean that the common narrative 'AI will replace knowledge workers' is a misreading according to Lesson 3?",
options: [
"Some tasks will be displaced, but most knowledge work involves contextual judgment that AI amplifies rather than replaces",
"AI will never be capable enough to affect knowledge worker employment",
"Knowledge workers are completely safe from AI disruption in all circumstances",
"The misreading is only about timing — AI will eventually replace all knowledge work"
],
correctOption: 0,
explanation: "The lesson acknowledges displacement is real for high-volume, lower-judgment tasks but argues the majority of knowledge work involves deep contextual judgment that AI amplifies. The misreading is not that displacement happens, but that displacement is the whole story. Option B understates AI's impact — the lesson explicitly lists displacement-vulnerable tasks. Option C overstates safety — displacement is acknowledged for certain task categories. Option D contradicts the lesson's core argument that amplification, not replacement, is the dominant dynamic for most knowledge work.",
source: "Lesson 3: Knowledge Worker at the Centre"
},
{
question: "Anthropic Cowork's architecture consists of three components. Which component does the knowledge worker author?",
options: [
"config.yaml — the metadata file setting model version, token limits, and compliance flags",
"Connector scripts — the integration layer connecting to enterprise systems via MCP",
"The semantic layer — the unified intelligence infrastructure across all systems",
"SKILL.md — a plain-English instruction document defining the agent's persona, principles, and constraints"
],
correctOption: 3,
explanation: "The knowledge worker authors the SKILL.md file, which defines the agent's persona, operating principles, domain knowledge, and constraints in plain English. It is not code or traditional configuration. Option A is wrong because config.yaml is created by the IT administrator (handling guardrails like model version, token limits, and access permissions). Option B is incorrect because connector scripts are built by developers as one-time infrastructure setup. Option C is wrong because the semantic layer is Frontier's architecture, not Cowork's.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "A 15-person litigation team at a 200-person law firm wants to build an agent for reviewing discovery documents. The senior partner has deep knowledge of the firm's review standards, and the team has its own budget. Using the three-question decision framework, which platform fits?",
options: [
"Frontier — law firms need enterprise-wide semantic intelligence for legal work",
"Cowork — the problem is contained to one team, funded from team budget, with concentrated expertise",
"Neither — law firms should wait for specialised legal AI platforms",
"Both — deploy Cowork now and migrate to Frontier later for scalability"
],
correctOption: 1,
explanation: "Applying the three questions: (1) Organisational scope — the problem is contained within the litigation team, not enterprise-wide. (2) Procurement — team budget is available without board approval. (3) Knowledge — concentrated in the senior partner. All three answers point to Cowork. Option A is wrong because Frontier is for cross-department, enterprise-wide problems sold top-down with capital expenditure. Option C is incorrect because the decision framework explicitly addresses this scenario — waiting is unnecessary when the platform fit is clear. Option D overcomplicates the decision; the framework produces a clear Cowork recommendation without hedging.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "A 5,000-person healthcare company wants to connect patient intake, clinical documentation, billing, and compliance into a single AI-driven workflow. The project has board-level sponsorship and a $2M budget. Which platform fits this scenario?",
options: [
"Cowork — because it is faster to deploy and the healthcare team can start immediately",
"Neither platform — healthcare requires specialised clinical AI that neither platform provides",
"Cowork for each department separately, then integrate the results",
"Frontier — the problem spans departments, requires capital expenditure, and knowledge is distributed across the organisation"
],
correctOption: 3,
explanation: "Applying the three questions: (1) Scope — spans patient intake, clinical documentation, billing, and compliance (enterprise-wide). (2) Procurement — $2M budget with board sponsorship (capital expenditure). (3) Knowledge — distributed across departments, no single expert holds the complete picture. All three point to Frontier. Option A ignores the enterprise scope and capital expenditure realities. Option B is incorrect because the scenario describes operational workflows, not clinical decision support — within the scope of these platforms. Option C would create siloed deployments that cannot reason across the connected workflows the organisation needs.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "What is the key architectural difference between Cowork and Frontier?",
options: [
"Cowork uses modular plugins (SKILL.md + connectors) while Frontier provides a unified semantic layer across all systems",
"Cowork is cloud-based while Frontier runs on-premises only",
"Cowork supports only small teams while Frontier works at any scale",
"Cowork uses natural language while Frontier requires programming skills"
],
correctOption: 0,
explanation: "Cowork is a modular plugin environment built around SKILL.md files and MCP connectors, designed for team-level deployment. Frontier provides a unified semantic layer — a translation service that understands the meaning of data across every system in the organisation. Option B is incorrect; the lesson does not distinguish the platforms by hosting model. Option C oversimplifies; the distinction is about deployment philosophy (bottom-up vs top-down), not absolute scale limitations. Option D is wrong because both platforms support natural language — the difference is in architecture and deployment model, not input method.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "Frontier is sold top-down through consulting firm partnerships. What is the typical procurement process for a Frontier deployment?",
options: [
"Team-level budget approval with deployment measured in weeks",
"Free trial period followed by automatic enterprise subscription",
"Capital expenditure with legal review, security assessment, and executive sponsorship — measured in quarters",
"Open-source deployment managed by the organisation's internal IT team"
],
correctOption: 2,
explanation: "Frontier's deployment model involves enterprise-wide procurement: capital expenditure, legal review, security assessment, and executive sponsorship. Deployment timelines are measured in quarters, not weeks. Option A describes Cowork's product-led growth model, not Frontier's. Option B is not mentioned in the lesson and does not match enterprise sales models. Option D is incorrect because Frontier is delivered through Forward Deployed Engineers and consulting partnerships, not as open-source software.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "The third question in the platform decision framework asks about the 'nature of knowledge.' What does this mean?",
options: [
"Whether the organisation has more tacit knowledge or explicit documentation",
"Whether the knowledge is technical or non-technical in nature",
"Whether domain knowledge is concentrated in one team or distributed across the organisation",
"Whether the knowledge has been previously digitised or remains in physical format"
],
correctOption: 2,
explanation: "The nature of knowledge question asks whether domain expertise is concentrated (one expert or small team holds it, pointing to Cowork's SKILL.md model) or distributed across the organisation (no single person holds the complete picture, pointing to Frontier's semantic layer). Option A, while a real knowledge management distinction, is not what the framework addresses. Option B is wrong because the framework does not distinguish by technical vs non-technical. Option D is incorrect because the digitisation state of knowledge is not the relevant variable — the question is about where the expertise resides organisationally.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "Why does the lesson recommend Cowork as the starting point for most Part 3 readers?",
options: [
"Cowork is technically superior to Frontier for all use cases",
"Frontier is not yet available for production deployment",
"Most readers have concentrated team-level expertise, team budgets, and want results in weeks rather than quarters",
"Cowork is free while Frontier requires significant investment"
],
correctOption: 2,
explanation: "The lesson states that most Part 3 readers have domain expertise concentrated in their team, a team-level budget, and want results in weeks — all of which align with Cowork's model. Option A is wrong because the lesson explicitly avoids ranking platforms as better or worse, emphasising fitness for context. Option B is incorrect; the lesson describes Frontier as having early adopters already deployed. Option D is not stated in the lesson and misrepresents the recommendation rationale, which is about fit rather than cost.",
source: "Lesson 4: Two Platforms, One Paradigm"
},
{
question: "A sales team deploys an AI agent that qualifies leads and hands them to sales representatives. The team wants to pay based on results. Which monetisation model fits, and what critical precondition must be met?",
options: [
"Subscription — because sales performance varies month to month",
"Success Fee — but only if a clean attribution methodology is agreed before deployment",
"License — because sales data involves sensitive customer information",
"Marketplace — because the lead qualification logic could be sold to other companies"
],
correctOption: 1,
explanation: "The success fee model fits naturally for sales because leads and revenue are directly measurable. However, the critical precondition is a clean attribution methodology agreed before deployment — determining what counts as agent-attributed, what the baseline is, and who measures. Option A is wrong because sales outcomes are directly measurable, making success fee more appropriate than subscription. Option C misapplies the license model, which is for high-stakes regulated domains, not standard sales operations. Option D may be partially true later, but the immediate question is about monetisation for this team's deployment, not marketplace publishing.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "An HR department deploys an agent that helps with recruiting, onboarding, and policy questions. The value is continuous but impossible to tie to specific revenue events. Which monetisation model is most appropriate?",
options: [
"Subscription — because the value is continuous and diffuse, making direct attribution impractical",
"Success Fee — by measuring the number of hires processed per month",
"License — because HR data involves sensitive employee information",
"Marketplace — because HR best practices are universal across organisations"
],
correctOption: 0,
explanation: "Subscription fits HR because the value is continuous across recruiting, onboarding, and policy questions — it helps every day but you cannot point to one moment and say 'that generated $X.' Option B misapplies success fee; while hires are countable, the agent's value spans far beyond hiring and attributing specific hires to the agent is problematic. Option C would be disproportionate for standard HR operations — license is for high-stakes regulated domains. Option D confuses deployable knowledge with publishable knowledge; much HR value comes from organisation-specific institutional knowledge.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "What is the key weakness of the subscription monetisation model?",
options: [
"It is too expensive for most team-level deployments",
"It requires complex attribution methodology that most organisations cannot implement",
"It does not self-justify — without active value measurement, it becomes a line item that finance questions during budget reviews",
"It only works for technology companies, not traditional enterprises"
],
correctOption: 2,
explanation: "The subscription model's weakness is that it does not self-justify. Unlike a success-fee agent that proves its value every time it generates a fee, a subscription agent requires active measurement to demonstrate the recurring cost is worth paying. Without deliberate value tracking, subscriptions become vulnerable during budget reviews. Option A is wrong because subscription ranges are specified at team-level pricing ($800-$2,500/month for HR). Option B conflates subscription with success fee — attribution methodology is the success fee's requirement. Option D is incorrect; the lesson identifies subscription as fitting HR, technical documentation, and project management across any industry.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "A law firm wants to deploy an agent for contract review that involves attorney-client privilege, malpractice risk, and regulatory compliance. Which monetisation model fits this profile?",
options: [
"Success Fee — paying per contract reviewed by the agent",
"License — annual contracts with security, legal, and compliance reviews appropriate for high-stakes regulated domains",
"Subscription — monthly fee per lawyer using the system",
"Marketplace — publishing the contract review methodology for other firms"
],
correctOption: 1,
explanation: "Legal is explicitly identified as a license domain ($40,000-$150,000/year) because of regulatory compliance, attorney-client privilege, and malpractice risk. The consequences of agent failure are severe enough that both parties need contractual protections. Option A undervalues the risk profile; success fee works for measurable outcomes in lower-stakes environments but lacks the contractual protections legal work demands. Option C is too lightweight for a domain where failure carries malpractice liability. Option D would involve publishing proprietary legal methodology, which violates the marketplace model's IP distinction.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "The marketplace monetisation model allows publishing SKILL.md files as reusable plugins. What is the critical IP boundary?",
options: [
"Any knowledge can be published as long as client names are removed",
"Only technical knowledge can be published; domain expertise must remain private",
"Organisation-specific knowledge is not publishable; general domain best practices are publishable",
"Knowledge can only be published if the organisation gives written consent"
],
correctOption: 2,
explanation: "The lesson draws a clear line: organisation-specific knowledge (internal compliance procedures, client lists, proprietary methods) is not marketplace material. General domain best practices (how to structure a regulatory review, how to approach building code analysis) are publishable and valuable. Option A understates the restriction — removing client names does not make proprietary processes publishable. Option B inverts the model, which is specifically designed for domain expertise, not just technical knowledge. Option D is not the distinction the lesson makes; the boundary is about the type of knowledge, not organisational consent.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "A finance team deploys a cost-reduction agent and wants to use the success fee model. Before deployment, what three elements must be agreed upon for clean attribution?",
options: [
"The percentage fee, the payment schedule, and the contract duration",
"What counts as agent-attributed savings, what the baseline comparison is, and who measures independently",
"The agent's access permissions, data sources, and output format",
"The team's quarterly targets, the agent's accuracy threshold, and the escalation procedure"
],
correctOption: 1,
explanation: "The lesson specifies three attribution requirements: (1) What counts as agent-attributed — did the agent identify the savings, or any savings it touched? (2) What is the baseline — what would have happened without the agent? (3) Who measures — independent measurement prevents disputes. Option A addresses commercial terms but not the attribution methodology that makes success fee viable. Option C covers technical deployment concerns, not value attribution. Option D includes operational metrics but misses the core attribution elements.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "What is the typical pricing range for a marketplace SKILL.md subscription?",
options: [
"$40,000-$150,000 per year per organisation",
"$3-$8 per transaction processed",
"Free, with revenue generated through advertising",
"$200-$900 per month per subscriber"
],
correctOption: 3,
explanation: "The marketplace model generates $200-$900/month per subscriber with effectively zero marginal cost per additional subscriber. Option A describes the license model range for legal or healthcare domains. Option B resembles success fee pricing for sales leads. Option C is not a model described in the lesson.",
source: "Lesson 5: Four Monetisation Models"
},
{
question: "An organisation where individual employees use personal ChatGPT accounts for work tasks, no AI policy exists, no budget has been allocated for AI, and AI appears only as a 'future initiative' in strategic plans is at which maturity level?",
options: [
"Level 2: Experimentation — the organisation is actively piloting AI tools",
"Level 1: Awareness — AI is on the agenda but not in operations",
"Level 3: Integration — AI tools are being integrated into workflows",
"Level 0: Pre-awareness — the organisation has not yet considered AI"
],
correctOption: 1,
explanation: "Every diagnostic indicator matches Level 1 (Awareness): personal AI accounts without organisational sanction, no AI policy, no allocated budget, and AI as a future initiative only. Option A is wrong because Level 2 requires at least one team with a real agent in active use and a designated AI lead — neither is present. Option C is wrong because Level 3 requires formal AI strategy with executive sponsorship and production system integrations. Option D does not exist in the five-level model, and the organisation is clearly aware (AI is in strategic plans).",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "What is the appropriate intervention for a Level 1 (Awareness) organisation?",
options: [
"Deploy a Cowork agent immediately to demonstrate value and build momentum",
"Hire a Chief AI Officer and begin enterprise-wide transformation planning",
"Education — awareness workshops, AI working group, acceptable use policy, and identifying a pilot team",
"Purchase a Frontier license and begin full-stack agent deployment"
],
correctOption: 2,
explanation: "Level 1 organisations need education, not deployment. The infrastructure (governance, data access, designated ownership) does not exist yet. The appropriate steps are awareness workshops, establishing an AI working group, drafting acceptable use policy, and identifying one team willing to pilot. Option A would fail because the organisation cannot support an agent — no governance, no data strategy, no AI owner. Option B is premature; a Chief AI Officer is a Level 4-5 role. Option D is wildly premature — Frontier requires governance infrastructure that Level 1 organisations lack entirely.",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "The Post-Pilot Trap is the transition zone between which two maturity levels?",
options: [
"Level 1 (Awareness) and Level 2 (Experimentation) — where organisations struggle to run their first pilot",
"Level 3 (Integration) and Level 4 (Optimisation) — where single deployments struggle to expand",
"Level 2 (Experimentation) and Level 3 (Integration) — where pilots succeed but scaling to structured deployment stalls",
"Level 4 (Optimisation) and Level 5 (Transformation) — where portfolio management struggles to become organisational redesign"
],
correctOption: 2,
explanation: "The Post-Pilot Trap occurs between Level 2 and Level 3. Pilots succeed in controlled conditions (motivated team, clear problem, executive attention), but scaling requires governance, cross-team coordination, and sustained investment that most organisations fail to achieve. Option A is wrong because Level 1 to Level 2 involves starting the first pilot, not stalling after one succeeds. Option B describes a different challenge (portfolio expansion), not the Post-Pilot Trap. Option D addresses advanced maturity transitions not covered by this specific concept.",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "A mid-size bank has a data science team that built a claims-processing agent six months ago handling 30% of routine claims. The CTO sponsors the programme, but no other department has deployed an agent. What maturity level is this organisation?",
options: [
"Level 3: Integration — because they have a production agent processing real claims",
"Level 1: Awareness — because only one department is involved",
"Level 4: Optimisation — because they are already measuring performance (30% of claims)",
"Level 2: Experimentation — at least one team has a real agent in active use, but results are isolated"
],
correctOption: 3,
explanation: "This matches Level 2 indicators: at least one team has an agent in active use (claims processing), a designated leader exists (CTO as sponsor), but results are isolated to one department. Option A is wrong because Level 3 requires formal AI strategy with executive sponsorship, IT with a defined infrastructure role, and governance policies — not just one successful pilot. Option B is incorrect because Level 1 has no agents in active use. Option C is wrong because Level 4 requires multiple agents across departments with centralised governance and performance dashboards.",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "At which maturity level does the lesson say Part 3 agents are 'most naturally at home'?",
options: [
"Level 2: Experimentation — where pilots provide a testing ground for new agents",
"Level 3: Integration — where formal strategy, IT infrastructure, governance, and production deployment exist",
"Level 4: Optimisation — where multiple agents can be coordinated across departments",
"Level 5: Transformation — where the organisation has fully redesigned around agent capability"
],
correctOption: 1,
explanation: "The lesson explicitly states 'This is where Part 3 agents are most naturally at home' about Level 3 (Integration). Level 3 provides the formal AI strategy, IT infrastructure role, governance policies, and production system connections that domain agents need. Option A is possible for initial deployment but lacks the governance infrastructure for sustained operation. Option C goes beyond what is needed for initial Part 3 deployments. Option D is the long-term destination but not a realistic near-term target for most readers.",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "Why is Level 5 (Transformation) described as the 'long-term destination, not a near-term goal' for most readers?",
options: [
"Level 5 technology has not yet been invented and will not be available until at least 2028",
"Few organisations are at Level 5 in 2026 — it requires fundamental organisational redesign including changed job descriptions and permanent AI governance",
"Level 5 is only achievable by technology companies, not traditional enterprises",
"Level 5 requires government certification that is not yet available in most jurisdictions"
],
correctOption: 1,
explanation: "Level 5 requires fundamental changes: job descriptions referencing human-agent collaboration, organisational structure changes, AI governance as a permanent function, new roles for managing human-agent workflows. Few organisations have achieved this in 2026. Option A is wrong because Level 5 is not about technology availability — it is about organisational design. Option C incorrectly limits it to technology companies. Option D fabricates a certification requirement not mentioned in the lesson.",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "An organisation has formal AI strategy with executive sponsorship, IT has a defined role in agent infrastructure, and governance policies cover data access and escalation. What is the appropriate intervention at this Level 3 stage?",
options: [
"Immediately expand to all departments to maximise return on governance investment",
"Hire a consulting firm to implement Frontier across the enterprise",
"Deploy a single vertical fully — one domain, one team, one agent, full stack — emphasising depth over breadth",
"Reduce governance overhead to enable faster experimentation"
],
correctOption: 2,
explanation: "At Level 3, the appropriate intervention is deploying a single vertical fully: SKILL.md by the domain expert, connectors to real systems by IT, governance in place, measurable value tracked. The emphasis is depth over breadth — do one deployment completely and well. Option A is premature; expanding before perfecting one deployment risks spreading thin. Option B may be appropriate at Level 4-5 but is premature at Level 3. Option D goes backward; the governance is a strength at Level 3, not an obstacle.",
source: "Lesson 6: Organisational AI Maturity Model"
},
{
question: "Why were the seven professional domains in Part 3 selected?",
options: [
"They are the only industries where AI agents can operate effectively",
"They represent where domain expertise is highly specific, encoding is difficult, and connector infrastructure supports production deployment",
"They represent the largest revenue opportunities in the AI marketplace",
"They were chosen alphabetically from a comprehensive list of all professional domains"
],
correctOption: 1,
explanation: "The lesson explicitly states the seven domains were chosen because three conditions converge: domain expertise is highly specific, encoding that expertise is currently difficult, and the connector infrastructure exists to make production deployment practical. Option A overstates exclusivity — the lesson explicitly notes that frameworks apply beyond these seven. Option C focuses on revenue rather than the stated selection criteria. Option D is obviously incorrect; the domains were chosen by strategic criteria, not alphabetical order.",
source: "Lesson 7: The Seven Domains"
},
{
question: "What problem do all seven professional domains share?",
options: [
"A shortage of qualified professionals willing to work in these fields",
"Regulatory barriers that prevent AI adoption in these industries",
"Institutional knowledge lock-in — valuable expertise exists only in the heads of experienced professionals and is lost when they leave",
"Outdated technology infrastructure that cannot support modern AI platforms"
],
correctOption: 2,
explanation: "Every domain shares the problem of institutional knowledge lock-in: when the senior analyst retires, the lead architect changes firms, or the top sales performer leaves, the organisation loses judgment, pattern recognition, and contextual understanding that was never documented. Option A misidentifies the problem — it is about knowledge transfer, not staffing shortages. Option B is incorrect because while some domains are regulated, regulation is not the common problem across all seven. Option D is wrong because infrastructure modernisation is not identified as the shared challenge.",
source: "Lesson 7: The Seven Domains"
},
{
question: "The Healthcare Operations domain comes with an explicit boundary. What is excluded and why?",
options: [
"Patient billing — because financial transactions require separate compliance frameworks",
"Clinical decision support and diagnosis — because clinical governance requirements are different in kind from operational decisions",
"Emergency room operations — because real-time decisions cannot wait for AI processing",
"Pharmaceutical prescriptions — because drug interactions require FDA-approved algorithms"
],
correctOption: 1,
explanation: "The lesson explicitly states: 'NOT clinical decision support or diagnosis. The governance requirements for clinical decisions are different in kind from operational decisions, and the deployment frameworks in this book are designed for operations.' Option A is incorrect because billing operations are not excluded. Option C fabricates a restriction not mentioned. Option D invents a specific pharmaceutical restriction not in the lesson.",
source: "Lesson 7: The Seven Domains"
},
{
question: "In the Sales and Revenue domain, what specific institutional knowledge is identified as the deployment target?",
options: [
"The CRM database structure and API configuration details",
"Historical sales data analysis and trend forecasting algorithms",
"The top performer's qualification logic — signals, heuristics, and pattern recognitions that distinguish real prospects from resource-consuming non-converters",
"Customer relationship management best practices from sales training manuals"
],
correctOption: 2,
explanation: "The lesson identifies the deployment target as 'the top performer's qualification logic: the signals, heuristics, and pattern recognitions that distinguish a prospect worth pursuing from one that will consume resources without converting.' Option A is technical infrastructure, not domain expertise. Option B describes analytical capabilities that any system could perform. Option D is documented general knowledge, not the undocumented experiential judgment of the top performer.",
source: "Lesson 7: The Seven Domains"
},
{
question: "The cross-domain methodology transfer means that although each domain has unique expertise types, what remains consistent?",
options: [
"The pricing structure for all domain agents",
"The five-step deployment methodology: identify, encode, connect, deploy, validate",
"The platform selection — all domains use Cowork",
"The governance requirements across all regulated and non-regulated domains"
],
correctOption: 1,
explanation: "The deployment methodology is consistent across all seven domains: (1) identify institutional knowledge at risk, (2) encode it into agent instructions, (3) connect to domain-specific data sources, (4) deploy with appropriate governance, (5) validate against the expert's knowledge. Option A is wrong because pricing varies significantly by domain and model. Option C is incorrect because some domains may better suit Frontier. Option D is wrong because governance requirements differ substantially — healthcare and legal have different requirements from sales or documentation.",
source: "Lesson 7: The Seven Domains"
},
{
question: "In the Architecture and Engineering domain, what makes the lead architect's expertise particularly difficult to encode?",
options: [
"Knowledge of CAD software keyboard shortcuts and menu locations",
"Understanding of building material costs and supplier pricing",
"Spatial reasoning and coordination logic — identifying clashes that software flags as warnings but experience says are critical, or misses entirely",
"Familiarity with project management timelines and milestone tracking"
],
correctOption: 2,
explanation: "The lesson identifies the lead architect's spatial reasoning and coordination logic as the expertise at risk — specifically the ability to distinguish software-flagged warnings that are actually critical from those that are not, and identifying clashes the software misses because they require understanding of construction sequence. Option A is tool proficiency, not institutional knowledge. Option B is commercial knowledge, not the spatial reasoning expertise highlighted. Option D is project management, a different domain.",
source: "Lesson 7: The Seven Domains"
},
{
question: "What is the most common mistake in enterprise AI deployment conversations, according to Lesson 8?",
options: [
"Discussing pricing too early in the conversation",
"Using too much technical jargon when speaking with business stakeholders",
"Proposing a solution before understanding the organisation's maturity level and context",
"Failing to demonstrate the AI platform with a live demo"
],
correctOption: 2,
explanation: "The lesson states: 'The most common mistake in enterprise AI conversations is proposing a solution before understanding the context.' The maturity model is explicitly called the 'qualification tool' — you must assess the organisation's level before proposing anything. Option A is a tactical concern but not identified as the most common mistake. Option B is a communication issue but not the structural error the lesson addresses. Option D is not mentioned as a common mistake; the issue is qualification, not demonstration.",
source: "Lesson 8: Starting the Conversation"
},
{
question: "A Level 1 (Awareness) organisation invites you to discuss deploying AI agents. What should you offer?",
options: [
"A detailed technical architecture proposal for their first agent deployment",
"A pilot programme with measurable success criteria",
"A Frontier license proposal with enterprise-wide transformation roadmap",
"A briefing — education about what domain agents are and why they matter, not a deployment proposal"
],
correctOption: 3,
explanation: "The lesson's stakeholder qualification table explicitly states that Level 1 organisations need education, and you should offer a briefing, not a proposal. 'Presenting a technical architecture to a Level 1 audience is the fastest way to lose the conversation.' Option A is inappropriate because the organisation lacks the infrastructure to evaluate a technical proposal. Option B is premature — pilots are appropriate for Level 2. Option C is wildly mismatched; Frontier requires governance infrastructure that Level 1 organisations completely lack.",
source: "Lesson 8: Starting the Conversation"
},
{
question: "The 'knowledge question' is described as the starting point for every deployment conversation. What are its four components?",
options: [
"Whose expertise, encoded in what form, available to whom, operating under what constraints",
"Which platform, which monetisation model, which domain, which maturity level",
"What problem, what solution, what timeline, what budget",
"Who is the sponsor, what is the ROI, when is the deadline, where is the deployment"
],
correctOption: 0,
explanation: "The knowledge question has four sub-questions: (1) Whose expertise — which professional's institutional knowledge? (2) In what form — agent instructions, decision trees, workflow automations? (3) Available to whom — the team, the department, external clients? (4) Under what constraints — regulatory, data sensitivity, risk tolerance? Option B lists chapter frameworks but not the knowledge question components. Option C describes project management questions. Option D covers stakeholder concerns but not the knowledge-first approach.",
source: "Lesson 8: Starting the Conversation"
},
{
question: "The chapter summary describes the frameworks as forming what kind of system?",
options: [
"Independent models that can be applied in any order depending on the situation",
"A connected decision system where each framework answers a specific question and determines which framework you need next",
"A rigid checklist that must be followed exactly in sequence with no flexibility",
"An academic taxonomy for classifying different types of AI deployments"
],
correctOption: 1,
explanation: "The chapter summary explicitly states the frameworks 'form a connected decision system' where each answers a specific question and the answer determines the next framework needed. The sequence matters: you cannot select a platform without understanding knowledge worker centrality, cannot frame monetisation without platform context. Option A contradicts the lesson's emphasis on sequential dependency. Option C overstates rigidity — the system is logical, not mechanistic. Option D mischaracterises practical decision tools as academic taxonomy.",
source: "Lesson 9: Chapter Summary"
},
{
question: "According to the chapter summary, what are the three core insights that tie the entire chapter together?",
options: [
"AI models are getting better; enterprises need more budget; platform selection is the most important decision",
"Cowork is better for teams; Frontier is better for enterprises; the marketplace creates passive income",
"The problem is knowledge transfer not technology; every decision flows from the knowledge question; qualification before proposal",
"Maturity levels determine everything; monetisation is secondary; domain selection is optional"
],
correctOption: 2,
explanation: "The three core insights are: (1) the problem is knowledge transfer, not technology; (2) every deployment decision flows from the knowledge question (whose expertise, in what form, for whom, under what constraints); (3) qualification before proposal (maturity model as filter, not academic framework). Option A misidentifies the central problem and misses the knowledge question entirely. Option B oversimplifies platform selection and inflates marketplace importance. Option D overweights maturity levels while dismissing monetisation and domain selection.",
source: "Lesson 9: Chapter Summary"
},
{
question: "The self-assessment checklist in the chapter summary asks readers to verify they can answer questions with what quality?",
options: [
"Speed — answering within 30 seconds to prove recall",
"Length — providing at least 500 words per answer to demonstrate depth",
"Specificity — not generalities, but precise answers demonstrating strategic vocabulary",
"Unanimity — getting the same answer as every other reader"
],
correctOption: 2,
explanation: "The summary states: 'If you can answer all of them with specificity — not generalities — you have the strategic vocabulary this chapter aimed to build.' The emphasis is on precise, context-specific answers rather than vague generalisations. Option A is not mentioned; the assessment is about quality, not speed. Option B confuses thoroughness with word count. Option D is irrelevant; the answers should be specific to each reader's own organisational context, which will naturally vary.",
source: "Lesson 9: Chapter Summary"
}
]}
/>
