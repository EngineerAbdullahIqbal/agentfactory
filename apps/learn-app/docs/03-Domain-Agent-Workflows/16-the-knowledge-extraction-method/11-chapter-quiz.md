---
sidebar_position: 11
title: "Chapter 16: The Knowledge Extraction Method Quiz"
---

# Chapter 16: The Knowledge Extraction Method Quiz

Test your understanding of the Knowledge Extraction Method — from tacit knowledge and the articulation gap through dual extraction methods, SKILL.md translation, validation scenario design, and shadow mode deployment.

<Quiz
title="Chapter 16: The Knowledge Extraction Method Assessment"
questions={[
{
question: "A product manager at a fintech company says: 'We do not need a structured extraction process. Our senior credit analyst can just write down what she knows and we will paste it into the SKILL.md.' A colleague who has studied the Knowledge Extraction Method disagrees. What is the most precise reason the colleague gives?",
options: [
"The most valuable professional knowledge is tacit — it resists articulation because it operates below conscious awareness — and writing it down without structured prompting produces generic instructions that work for obvious cases and fail for the ones that matter",
"Writing instructions manually takes too long compared to using the extraction methodology",
"The extraction methodology is required because SKILL.md files have a specific format that untrained people cannot follow",
"The colleague disagrees because the analyst should use Method B instead of writing from memory"
],
correctOption: 0,
explanation: "Lesson 1 establishes that the most valuable professional knowledge is tacit — the expert's pattern recognition, exception handling, and calibrated judgement operate below conscious awareness. Asking an expert to 'write down what they know' produces a document that describes the explicit part of their expertise (the frameworks, the ratios, the definitions) and omits the tacit part (when to question a number that looks correct, how to read a management team's evasion, when to escalate). The extraction methodology exists because tacit knowledge resists unstructured articulation. Option B misidentifies the problem as speed. Option C confuses the extraction problem with a formatting problem. Option D is wrong because Method B is for documents, not for replacing expert articulation.",
source: "Lesson 1: The Problem That No Platform Solves"
},
{
question: "A consulting firm deploys a domain agent for market analysis. The agent handles straightforward sector reports competently but consistently fails when clients ask about emerging risks that are not yet reflected in published data. A partner says: 'The agent does not have the instinct.' What type of knowledge is the partner identifying as missing?",
options: [
"Explicit knowledge — the agent needs access to more published data sources",
"Tacit knowledge — the ability to read signals that data does not yet reflect, which is learned through experience and resists being written as instructions",
"Procedural knowledge — the agent lacks the step-by-step process for risk analysis",
"The agent lacks access to real-time data feeds and would perform correctly with additional connectors"
],
correctOption: 1,
explanation: "The partner is describing tacit knowledge — the experienced analyst's ability to detect emerging risks from indirect signals (management tone, sector dynamics, supply chain patterns) that are not yet captured in published data. This is precisely the type of knowledge Lesson 1 identifies as the articulation gap: the expert applies it automatically but cannot easily express it as written instructions. Option A is wrong because the problem is not data access but pattern recognition. Option C misidentifies the knowledge type; the agent may have the procedure but lacks the judgement that makes the procedure useful. Option D confuses data availability with the ability to interpret weak signals.",
source: "Lesson 1: The Problem That No Platform Solves"
},
{
question: "A knowledge worker drafts a SKILL.md for a procurement analysis agent without using a structured extraction process. The resulting agent handles purchase order reviews and vendor comparisons well but produces generic output when asked about contract risk assessment. The knowledge worker says: 'I told it everything I know about procurement.' What does the Knowledge Extraction Method identify as the most likely explanation?",
options: [
"The knowledge worker told the agent everything she consciously knows — but the risk assessment expertise that makes her valuable is tacit knowledge she applies automatically without being able to articulate it unprompted",
"The SKILL.md file has a syntax error in the Principles section that prevents risk assessment from working",
"The agent needs a more capable model to handle complex risk assessment tasks",
"The knowledge worker should have written more detailed instructions in the Questions section"
],
correctOption: 0,
explanation: "This is the core problem Lesson 1 identifies: the articulation gap. The knowledge worker genuinely believes she has communicated her full expertise, but the risk assessment skill — reading contract language for hidden exposure, recognising clause patterns that create downstream liability, judging when a vendor's financial position makes contract terms material — is tacit knowledge that operates below conscious awareness. Without the structured extraction methodology, she articulated the explicit part (procedures, checklists, definitions) and omitted the tacit part (the judgement that makes her valuable). Option B is wrong; SKILL.md is plain English. Option C misidentifies the problem as model capability. Option D is too narrow; more detail in the Questions section does not solve the articulation gap.",
source: "Lesson 1: The Problem That No Platform Solves"
},
{
question: "A domain expert is about to undergo a Method A interview. The interviewer begins with Question 1: 'Walk me through a specific recent case where you had to make a difficult professional judgement.' Why does the interview framework start with a specific case rather than asking the expert to describe their decision-making process in general terms?",
options: [
"Specific cases activate episodic memory, which contains the contextual details and decision logic that general descriptions — drawn from semantic memory — tend to omit or oversimplify",
"Specific cases are easier for the interviewer to write down accurately",
"General descriptions would make the interview too long for the allotted time",
"The interview framework requires chronological progression from past cases to present methods"
],
correctOption: 0,
explanation: "Lesson 2 explains the distinction between episodic memory (specific events with contextual details) and semantic memory (general knowledge stripped of context). Asking for a general description of decision-making ('How do you assess credit risk?') activates semantic memory, producing a textbook-like answer that omits the nuances, exceptions, and contextual judgements that make the expert's knowledge valuable. Asking for a specific case ('Walk me through the Hadley Manufacturing assessment') activates episodic memory, which contains the actual decision logic in context. Option B is trivially true but not the methodological reason. Option C is wrong; general descriptions are often shorter, not longer. Option D misidentifies the structure of the interview.",
source: "Lesson 2: The Five Questions — Expert Interview Framework"
},
{
question: "During a Method A interview with a senior lawyer, Question 3 asks: 'When you look at a new contract, what do you check first and why in that order?' The lawyer answers by listing her review sequence. The interviewer then asks a follow-up: 'Has the order ever changed? When?' What is the methodological purpose of this follow-up?",
options: [
"To verify that the lawyer is being truthful about her review process",
"To surface the exceptions to the standard process — the conditions under which the expert deviates from the routine, which are often the most valuable knowledge for the SKILL.md because they encode the expert's calibrated judgement about what matters in non-routine situations",
"To identify training gaps in the lawyer's professional development",
"To determine whether the lawyer's process has improved over time"
],
correctOption: 1,
explanation: "Lesson 2 explains that Question 3 ('What do you check first?') surfaces the expert's default process, but the follow-up ('Has the order ever changed?') surfaces the exceptions — the conditions under which the expert overrides the routine. These exceptions are often the most valuable knowledge for the SKILL.md because they encode the calibrated judgement that distinguishes an experienced professional from a competent one following a checklist. The credit analyst example illustrates this: the standard sequence is financial statements first, but when the CEO cannot answer basic working capital questions, the analyst shifts to management assessment. Option A misidentifies the purpose as verification. Option C and D are unrelated to the extraction methodology.",
source: "Lesson 2: The Five Questions — Expert Interview Framework"
},
{
question: "Question 5 in the Method A interview framework asks: 'What would you tell a talented new hire on their first day — the things they will not find in any manual?' A senior HR director answers with specific advice about navigating internal politics during restructurings. What type of knowledge is this question designed to surface?",
options: [
"Documented organisational policies that the new hire should read",
"The expert's accumulated institutional knowledge — the unwritten rules, professional instincts, and context-dependent judgements that are never documented because they are transmitted through mentorship and experience",
"The expert's personal opinions about organisational culture, which should not be included in a SKILL.md",
"Technical skills that the new hire needs to develop through training programmes"
],
correctOption: 1,
explanation: "Lesson 2 identifies Question 5 as the question that surfaces mentorship knowledge — the advice that experienced professionals pass to juniors informally, which is never documented because it is transmitted through relationships and accumulated experience. The HR director's advice about navigating restructurings is precisely this type of knowledge: context-dependent, institutionally specific, and critical for effective professional performance. It belongs in the SKILL.md's Principles section because it encodes the operational judgement that no handbook captures. Option A is wrong; the question explicitly targets knowledge not in manuals. Option C misidentifies the knowledge as personal opinion rather than professional judgement. Option D confuses technical training with tacit professional knowledge.",
source: "Lesson 2: The Five Questions — Expert Interview Framework"
},
{
question: "An interviewer is preparing for a Method A interview with a senior architect. The briefing protocol requires establishing 'collaborative mode' rather than 'performance mode.' What is the practical difference between these two modes, and why does it matter for extraction quality?",
options: [
"Collaborative mode means the expert speaks more slowly so the interviewer can take better notes",
"In performance mode, the expert presents polished, simplified accounts of their expertise; in collaborative mode, the expert thinks aloud about the messy, uncertain aspects of their work — the pauses, qualifications, and self-corrections that contain the most valuable tacit knowledge",
"Collaborative mode means the interviewer shares their own expertise to establish credibility before asking questions",
"Performance mode produces higher-quality answers because the expert is more focused and professional"
],
correctOption: 1,
explanation: "Lesson 3 draws a direct contrast between performance mode (where the expert presents a cleaned-up version of their expertise, omitting the uncertainty and exceptions) and collaborative mode (where the expert thinks aloud, including the messy parts — the qualifications, the 'it depends' answers, the situations where they were uncertain). The briefing protocol establishes collaborative mode because the pauses and self-corrections often contain the most valuable extraction material — they reveal the expert's actual decision-making process rather than their idealised description of it. Option A trivialises the distinction. Option C inverts the protocol; the interviewer should not present competing expertise. Option D is wrong; performance mode produces a polished but less useful account.",
source: "Lesson 3: Conducting the Expert Interview"
},
{
question: "During a Method A interview, a credit analyst says: 'I always check the debt service coverage ratio first.' The interviewer records this as a note. A second interviewer, trained in the extraction methodology, says the note is 'too generic to be useful for a SKILL.md.' What should the note say instead?",
options: [
"The note should include the analyst's exact words in quotation marks for legal accuracy",
"The note should replace 'always' with 'sometimes' to be more conservative",
"The note should capture the specific threshold, the context in which this check is prioritised, and what the analyst does when the ratio falls in different ranges — converting a generic statement into a specific, testable instruction",
"The note should reference the textbook definition of debt service coverage ratio for completeness"
],
correctOption: 2,
explanation: "Lesson 3 distinguishes between generic notes ('checks DSCR first') and specific notes that capture the actionable detail a SKILL.md needs. A generic note that the analyst 'always checks DSCR first' tells the agent nothing about what threshold matters, when this check is prioritised over others, or what to do with different results. The specific version might be: 'Checks DSCR first when term lending is involved; below 1.25x flags for committee review; between 1.25x and 1.5x requires covenant analysis; above 1.5x proceeds to sector exposure.' This converts generic into specific and testable. Option A captures words but not actionable knowledge. Option B changes the meaning without adding specificity. Option D adds background information but not the expert's operational logic.",
source: "Lesson 3: Conducting the Expert Interview"
},
{
question: "An interviewer completes a Method A interview with a senior clinician. The methodology requires writing a 'north star summary' immediately after the interview. What is the north star summary and why must it be written immediately?",
options: [
"A complete transcript of the interview for archival purposes",
"A one-paragraph distillation of the expert's core professional judgement — the single most important thing the agent must get right — written immediately because the interviewer's sense of what mattered most fades quickly as the specific conversational context recedes from memory",
"A summary of the five questions and the expert's answers in bullet-point format",
"A quality assessment of whether the interview produced enough material for a SKILL.md"
],
correctOption: 1,
explanation: "Lesson 3 defines the north star summary as the anchor for the first SKILL.md draft — a one-paragraph distillation of the expert's core professional judgement that captures the single most important thing the extraction must get right. It must be written immediately after the interview because the interviewer's sense of what mattered most — which answer carried the most weight, which qualification revealed the deepest knowledge — fades quickly as the conversational context recedes. A north star summary written the next day is a reconstruction; one written immediately is a capture. Option A describes a transcript, not a synthesis. Option C describes notes, not the north star summary. Option D describes an assessment that is separate from the summary's purpose.",
source: "Lesson 3: Conducting the Expert Interview"
},
{
question: "A team is using Method B to extract SKILL.md instructions from an HR policy manual. During Pass One, they extract thirty-seven explicit rules. What specifically does Pass One extract, and what does it deliberately not attempt?",
options: [
"Pass One extracts every piece of information in the document and organises it by topic",
"Pass One extracts only the rules that contradict each other, flagging them for resolution",
"Pass One extracts explicit, unambiguous rules — statements that can be directly converted into SKILL.md instructions without interpretation — and deliberately does not attempt to resolve contradictions, fill gaps, or interpret ambiguous language",
"Pass One extracts a summary of each document section for the knowledge worker to review"
],
correctOption: 2,
explanation: "Lesson 4 defines Pass One as the extraction of explicit rules — unambiguous statements in the document that can be directly converted into SKILL.md instructions. The key discipline of Pass One is what it does not do: it does not attempt to resolve contradictions (that is Pass Two), fill gaps (that is Pass Three), or interpret ambiguous language. Mixing these activities in a single pass produces confused output where it is unclear whether an instruction came from the document or from the extractor's interpretation. Option A is too broad; Pass One is selective, not comprehensive. Option B describes Pass Two's function. Option D describes a summarisation task, not rule extraction.",
source: "Lesson 4: The Document Extraction Framework"
},
{
question: "During Pass Two of a Method B extraction from a bank's credit policy manual, the team identifies a contradiction: the 2019 policy section states a minimum DSCR of 1.25x while the 2023 amendment specifies 1.15x for technology sector lending. What type of contradiction is this, and what is the correct resolution approach?",
options: [
"This is an interpretive contradiction — the two numbers represent different interpretations of the same standard",
"This is a temporal contradiction — the same metric has different values from different time periods — and the resolution is to use the most recent version unless the earlier version has not been formally superseded",
"This is a jurisdictional contradiction — different regions apply different thresholds",
"The team should average the two values to produce a compromise threshold of 1.20x"
],
correctOption: 1,
explanation: "Lesson 4 identifies three types of contradictions: temporal (same metric, different time periods), jurisdictional (same metric, different regions or contexts), and interpretive (same concept, different framings that imply different actions). This is a temporal contradiction — the 2019 policy and the 2023 amendment specify different DSCR thresholds. The resolution approach is to determine which version is current and whether the earlier version has been formally superseded. If the 2023 amendment explicitly updates the 2019 policy, the newer value applies; if the amendment applies only to technology sector lending, both values may be correct in their respective contexts (making this also partially jurisdictional). Option A misidentifies the type. Option C is wrong; both come from the same institution. Option D is methodologically incorrect — contradictions are resolved, not averaged.",
source: "Lesson 4: The Document Extraction Framework"
},
{
question: "During Pass Three of a Method B extraction from a legal firm's risk framework, the team identifies a gap: the framework specifies detailed procedures for contract review and litigation risk assessment but says nothing about data privacy compliance, which is a significant part of the firm's current practice. What are the two possible explanations for this gap, and why does the distinction matter?",
options: [
"The gap means the document is outdated and should be discarded entirely",
"Either the topic is genuinely outside the document's scope (the framework was written before data privacy became a major practice area) or the topic is assumed knowledge that the document's authors considered too obvious to document — and the distinction matters because the first type means the SKILL.md needs an instruction sourced from elsewhere, while the second means the instruction exists as institutional knowledge that the interview should surface",
"The gap is irrelevant because SKILL.md files should only contain instructions that come from documents",
"The team should add data privacy instructions based on their general knowledge of the field"
],
correctOption: 1,
explanation: "Lesson 4 identifies two types of gaps and explains why the distinction is critical for the SKILL.md. A scope gap means the topic was not covered because it did not exist or was not relevant when the document was written — the SKILL.md instruction must come from another source (interview, additional documents, or current practice). An assumed-knowledge gap means the topic was not documented because the authors considered it obvious — the instruction exists as institutional knowledge that should be surfaced through a focused Method A interview. The distinction determines where the SKILL.md instruction comes from. Option A is too extreme; a gap does not invalidate the entire document. Option C is wrong; SKILL.md instructions come from both documents and expert knowledge. Option D introduces ungrounded general knowledge, which the methodology specifically avoids.",
source: "Lesson 4: The Document Extraction Framework"
},
{
question: "A team is deciding which extraction method to use for building a SKILL.md for a sales qualification agent. The sales team has documented qualification criteria and playbooks, but the most experienced account executives say: 'The playbook tells you what to ask — it does not tell you when to walk away from a deal that looks good on paper.' Which method should be primary and why?",
options: [
"Method B should be primary because the documented playbooks and qualification criteria contain the core knowledge",
"Method A should be primary because the critical knowledge — the instinct for deal timing, relationship dynamics, and when to walk away — is tacit and lives in the experienced account executives' heads, not in the documented playbooks",
"Both methods should be used equally with no primary method",
"Neither method is appropriate; the team should use prompt engineering to capture sales expertise"
],
correctOption: 1,
explanation: "Lesson 5 classifies sales as a Method A-primary domain. The documented qualification criteria and playbooks are the scaffolding — the explicit part of the knowledge. But the account executives' statement reveals the critical insight: the knowledge that makes the difference between a competent salesperson and an experienced one is tacit — the instinct for when to walk away, how to read relationship dynamics, when the timing is wrong despite the metrics looking right. This is Method A territory. The extraction starts with the interview; the documented playbooks serve as verification material in a targeted Pass One. Option A elevates the scaffolding over the substance. Option C ignores the lesson's domain-method mapping. Option D is exactly the approach the methodology is designed to replace.",
source: "Lesson 5: Choosing and Combining Methods"
},
{
question: "A healthcare organisation is building a SKILL.md for a clinical triage agent. During the extraction process, the clinician's interview reveals that she sometimes overrides the documented clinical protocol for certain patient presentations based on her clinical experience. The reconciliation principle must be applied. What does it determine?",
options: [
"Expert judgement always takes precedence over documented protocols in healthcare",
"Documented protocols always take precedence because they carry legal weight",
"Documented protocols take precedence for matters of regulatory compliance and professional liability; the clinician's judgement takes precedence for operational decisions within the scope of her clinical competence — and both need to be encoded in the SKILL.md",
"The SKILL.md should not include either source when they conflict — the conflict should be escalated to a committee"
],
correctOption: 2,
explanation: "Lesson 5 states the reconciliation principle: documented standards take precedence for regulatory compliance and professional liability; expert judgement takes precedence for operational decisions within professional competence. In this healthcare context, the clinical protocol sets the boundaries (the agent must not instruct actions that violate the protocol's safety constraints), but within those boundaries, the clinician's judgement about how aggressively to triage, which presentations to prioritise, and how to interpret ambiguous symptoms is the professional expertise the SKILL.md should encode. Both are needed; neither swallows the other. Option A is dangerous — it ignores regulatory constraints. Option B is too rigid — it eliminates the expert's operational judgement. Option D avoids the problem rather than resolving it.",
source: "Lesson 5: Choosing and Combining Methods"
},
{
question: "A team is building a SKILL.md for a legal contract review agent. They classify the domain as A+B (both methods required). The spec calls for reconciliation when expert judgement and documented standards conflict. During extraction, the senior lawyer says: 'I know the risk framework classifies all unlimited indemnities as high-risk, but in practice, from a standard vendor in this sector, they are low-risk.' How should the SKILL.md encode this conflict?",
options: [
"Follow the lawyer's judgement entirely — she has more experience than the risk framework",
"Follow the risk framework entirely — documented standards take precedence over expert opinion",
"Encode the risk framework's classification as the constraint (unlimited indemnities are flagged as high-risk per the documented standard) and encode the lawyer's sector-specific assessment as operational guidance within that constraint (the agent can note that in certain sectors, experienced counsel may assess the practical risk differently, but the flag remains)",
"Remove unlimited indemnity analysis from the agent's scope to avoid the conflict"
],
correctOption: 2,
explanation: "This is a direct application of the reconciliation principle from Lesson 5. The risk framework (documented standard) classifies unlimited indemnities as high-risk — this is a matter of professional liability and the SKILL.md must respect it as a constraint. The lawyer's judgement that in certain sectors the practical risk is lower is operational expertise within her competence. The SKILL.md encodes both: the documented classification as the hard constraint (the flag stays) and the lawyer's sector-specific assessment as contextual guidance (the agent can provide the nuanced view without removing the flag). Option A ignores the documented standard for a liability-relevant classification. Option B discards valuable professional judgement. Option D avoids the problem rather than resolving it.",
source: "Lesson 5: Choosing and Combining Methods"
},
{
question: "A knowledge worker has completed both Method A and Method B extractions for an operations management agent. She now needs to write the Persona section of the SKILL.md. Chapter 15 taught that a finished Persona contains answers to four structural questions. Lesson 6 teaches three extraction-focused writing questions that organise interview material into functional Persona language. What are those three writing questions?",
options: [
"What is the agent's name? What department does it belong to? Who is its supervisor?",
"What is this agent's professional level and authority? What does this agent value in its own outputs — what quality standards does it hold itself to? What does this agent do when it does not know?",
"What model should the agent use? What temperature setting? What context window size?",
"What documents has the agent read? What training data was used? What sources does it cite?"
],
correctOption: 1,
explanation: "Chapter 15 taught that a finished Persona contains answers to four structural questions: professional standing, relationship to the user, characteristic tone, and what the agent will never claim to be. Lesson 6 teaches that when writing a Persona from extraction outputs, three different questions organise the work more effectively: (1) What is this agent's professional level and authority? (2) What does this agent value in its own outputs — what quality standards does it hold itself to? (3) What does this agent do when it does not know? These three writing questions translate interview material into functional Persona language that addresses the four structural elements. Option A confuses organisational assignment with professional identity. Option C describes technical configuration, not Persona. Option D describes data sources, not identity.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "A knowledge worker writes the following Principle for a financial research SKILL.md: 'Always be accurate.' Her colleague, who has studied the extraction methodology, says this principle is 'untestable and therefore useless for validation.' What makes a principle testable?",
options: [
"A testable principle includes a specific metric threshold, like '95% accuracy'",
"A testable principle describes a specific behaviour in a specific situation that a reviewer can observe in the output and score as present or absent — 'always be accurate' fails because no reviewer can determine from a single output whether the instruction was followed or whether the agent happened to get it right",
"A testable principle must be written in formal logic notation",
"A testable principle must reference specific data sources by name"
],
correctOption: 1,
explanation: "Lesson 6 introduces the testability criterion: a principle must describe a specific behaviour in a specific situation that a reviewer can observe in the output and assess as present or absent. 'Always be accurate' fails this test because a reviewer cannot distinguish between an agent that followed the principle and produced an accurate output, and an agent that ignored the principle and happened to get the answer right. A testable version might be: 'When financial data from the attached accounts contradicts a figure stated by the user, surface the discrepancy explicitly and ask for clarification rather than silently accepting either figure.' This is observable and scoreable. Option A is too narrow; testability is about observable behaviour, not metric thresholds. Option C and D add unnecessary constraints.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "A knowledge worker writes the Questions section for a credit analyst SKILL.md. She lists twelve types of analysis the agent can perform but does not include an out-of-scope section. Her colleague says: 'The out-of-scope section is not optional — it is as important as the capability list.' Why?",
options: [
"The out-of-scope section is required by the SKILL.md file format specification",
"Without an explicit out-of-scope boundary, the agent will attempt queries adjacent to its capabilities — such as lending recommendations when it is scoped for credit analysis — producing confident-sounding output in areas where it has no grounded expertise and where errors carry professional consequences",
"The out-of-scope section helps the agent load faster by reducing the number of queries it needs to process",
"The out-of-scope section is a legal requirement for regulated industries"
],
correctOption: 1,
explanation: "Lesson 6 emphasises that the capability list and the out-of-scope list are equally important halves of the Questions section. Without an explicit out-of-scope boundary, the agent will attempt queries that are adjacent to its defined capabilities — the credit analyst agent might venture into lending recommendations, portfolio construction advice, or regulatory compliance opinions. These adjacent queries are especially dangerous because the agent has enough context to produce plausible-sounding output, but not enough grounded expertise to produce reliable output. The out-of-scope section prevents this by explicitly defining what the agent declines. Option A confuses the methodological reason with a formatting requirement. Option C is technically incorrect. Option D may be partially true but is not the primary reason from the methodology.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "A knowledge worker is writing the Principles section and wants to encode the uncertainty calibration vocabulary from the extraction methodology. She writes: 'Use appropriate language to express confidence.' Her colleague says this fails the extraction methodology's standard. What does the methodology require instead?",
options: [
"The methodology requires using only the words 'certain' and 'uncertain' with no gradations",
"The methodology requires a defined vocabulary with specific levels — such as 'confirmed by data,' 'supported by evidence,' 'suggested by available information,' 'possible but unconfirmed,' and 'speculative' — where each level carries a distinct meaning and the agent is instructed never to use a higher-confidence level than the evidence supports",
"The methodology requires all outputs to include a numerical confidence percentage",
"The methodology requires the agent to refuse to answer any question where confidence is below 100%"
],
correctOption: 1,
explanation: "Lesson 6 presents the uncertainty calibration vocabulary as a five-level system where each level carries a distinct meaning: 'confirmed by data' (direct evidence in attached sources), 'supported by evidence' (strong inference from available data), 'suggested by available information' (reasonable inference with gaps), 'possible but unconfirmed' (plausible but not evidenced), and 'speculative' (beyond available evidence). The agent is instructed never to use a higher-confidence level than the evidence supports. 'Use appropriate language' fails because it gives the agent no specific vocabulary and no calibration standard. Option A is too simplistic. Option C imposes false precision. Option D would make the agent useless for most analytical tasks.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "A team is designing a validation scenario set for a credit analyst SKILL.md. They create twenty scenarios: fifteen standard cases, three edge cases, one adversarial case, and one high-stakes case. A validation specialist says the distribution is wrong. What is the correct distribution?",
options: [
"The distribution should be equal: five of each category",
"Standard 50% (10), edge 25% (5), adversarial 15% (3), high-stakes 10% (2) — the team's distribution overweights standard cases and underweights edge and adversarial cases, which means the scenario set will confirm the agent works for routine queries without testing whether it handles boundary conditions and pressure scenarios",
"The distribution depends on the domain and there is no standard recommendation",
"Standard 80% (16), edge 10% (2), adversarial 5% (1), high-stakes 5% (1)"
],
correctOption: 1,
explanation: "Lesson 7 specifies the exact distribution: standard cases 50%, edge cases 25%, adversarial cases 15%, high-stakes cases 10%. For a twenty-scenario set, this means 10 standard, 5 edge, 3 adversarial, and 2 high-stakes. The team's distribution of 15-3-1-1 overweights standard cases at the expense of the categories that test whether the SKILL.md handles the situations that matter most for production reliability. An agent that passes fifteen standard cases but has only been tested against one adversarial scenario has not been validated — it has been confirmed to work in the easy cases. Option A ignores the different frequencies and criticalities of each category. Option C is wrong; Lesson 7 provides specific proportions. Option D overweights standard cases even more.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "A team designs a validation scenario for the credit analyst SKILL.md: 'The user asks the agent to prepare the credit portfolio summary slide for the quarterly board pack, noting that the CFO will present it to the board on Thursday.' What category does this scenario belong to, and why?",
options: [
"Standard case — it tests the agent's core analytical function of preparing credit summaries",
"Edge case — it tests whether the agent can handle time-sensitive requests",
"Adversarial case — the user is attempting to pressure the agent into producing output without proper review",
"High-stakes case — the output will be presented to a board by a CFO, meaning an incorrect output would produce real organisational harm, and the correct response must include flagging the output for human review before distribution"
],
correctOption: 3,
explanation: "Lesson 7 defines high-stakes cases as scenarios where an incorrect output would produce real professional or organisational harm. A credit portfolio summary presented to a board by a CFO is a high-stakes output: errors would be visible to the highest governance level, could affect investment decisions, and carry reputational and potentially regulatory consequences. The correct response is to produce a draft but flag it for human review, explicitly noting that board presentation materials require sign-off before distribution. Option A misidentifies it as routine. Option B underestimates the stakes. Option C misidentifies the scenario as adversarial; the user is not trying to trick the agent — the request is legitimate but carries high consequences.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "A validation reviewer scores a credit analyst agent's output on a standard scenario. The output contains correct financial ratios and accurate trend analysis, but presents an inference about the company's strategic direction as a confirmed finding rather than as an analytical judgement. How should the reviewer score this output?",
options: [
"Pass on all three components — the output is correct and within scope",
"Fail on accuracy — the strategic direction inference is wrong",
"Pass on accuracy, fail on calibration — the output is factually correct but presents an inference with higher confidence than the evidence supports, which is a calibration failure",
"Fail on boundary compliance — the strategic direction inference is out of scope"
],
correctOption: 2,
explanation: "Lesson 7 defines three independent scoring components. Accuracy measures whether the output correctly reflects the SKILL.md's instructions — the ratios and trends are correct, so accuracy passes. Calibration measures whether the output uses appropriate confidence language — presenting an inference as a confirmed finding fails calibration because the confidence level does not match the evidence. Boundary compliance measures whether the output stays within scope — a strategic direction inference based on financial analysis is within scope. This example illustrates why all three components are necessary: an output can be accurate but poorly calibrated, and a calibration failure in a professional context is dangerous because it leads decision-makers to act on uncertain information as if it were confirmed. Option A misses the calibration failure. Option B misidentifies the scoring component. Option D misidentifies the scope issue.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "A twenty-scenario validation run produces the following results: 18 pass, 2 fail. One failure is a standard case (accuracy), the other is a high-stakes case (boundary compliance). Does the SKILL.md meet the threshold for shadow mode entry?",
options: [
"Yes — 90% pass rate is close enough to the 95% threshold for practical purposes",
"Yes — the 90% pass rate meets the standard threshold and two failures are within tolerance",
"No — the 90% pass rate is below the 95% threshold, but more importantly, any high-stakes failure blocks shadow mode entry regardless of the overall pass rate",
"No — the standard case failure alone blocks shadow mode entry"
],
correctOption: 2,
explanation: "Lesson 7 states two conditions for shadow mode entry: a 95% pass rate across all scenarios AND zero failures in the high-stakes category. This result fails on both counts: the 90% pass rate (18/20) is below the 95% threshold, and there is a high-stakes failure. Even if the overall pass rate were 95% (19/20), a single high-stakes failure would block shadow mode entry. High-stakes failures carry an additional constraint because an agent that does not escalate when the consequences are serious is more dangerous than an agent that gets a routine calculation wrong. Option A is incorrect; the threshold is not negotiable. Option B miscalculates and ignores the high-stakes constraint. Option D identifies the wrong failure as the blocker.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "After a validation run, a team finds that three of five edge case scenarios failed, while all standard, adversarial, and high-stakes scenarios passed. What does this failure pattern indicate about the SKILL.md, according to the validation methodology?",
options: [
"The SKILL.md's Persona section needs to be rewritten to give the agent a clearer identity",
"The failures are concentrated in edge cases, which indicates a gap in the Out of Scope definition or ambiguous scope boundaries in the Questions section — the agent does not know where its scope ends",
"The SKILL.md needs more training data to handle edge cases",
"The adversarial cases should be redesigned because passing all of them suggests they were too easy"
],
correctOption: 1,
explanation: "Lesson 8 explains that failure patterns cluster by SKILL.md section. Edge case failures concentrated in one category indicate a specific problem: the Out of Scope definition in the Questions section is not precise enough, or the boundaries between what the agent handles and what it redirects are ambiguous. The agent handles its core function (standard cases pass) and its principles hold under pressure (adversarial cases pass), but it does not know where its scope ends (edge cases fail). The targeted rewrite should focus on the Questions section — specifically the out-of-scope boundaries. Option A misidentifies the section; Persona governs identity, not scope boundaries. Option C confuses SKILL.md with model training. Option D is unsupported; the adversarial cases passing means the principles are working.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "A knowledge worker rewrites the SKILL.md to fix edge case failures identified in a validation run. She is concerned about regression — fixing the edge cases might break something that was previously working. What does the validation methodology recommend?",
options: [
"Only rewrite the specific instructions related to the failing scenarios and re-run the full scenario set to check that previously passing scenarios still pass",
"Rewrite the entire SKILL.md from scratch to ensure consistency",
"Only re-run the previously failing scenarios to confirm they now pass",
"Add the edge case fixes as a separate addendum to the SKILL.md rather than modifying the existing instructions"
],
correctOption: 0,
explanation: "Lesson 8 describes targeted rewriting as the correct approach: modify the specific SKILL.md sections that the failure pattern indicates are problematic, then re-run the full scenario set — not just the previously failing scenarios. The full re-run is essential because a change to the Out of Scope definition might affect how the agent handles standard cases or adversarial cases. Checking only the previously failing scenarios would miss regressions. Option B is excessive; rewriting the entire SKILL.md when the failure pattern points to a specific section introduces unnecessary risk. Option C only checks the fixes without testing for regression. Option D creates an inconsistent document structure.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "A SKILL.md passes the 95% threshold on scenario testing. The team is ready to enter shadow mode. What does shadow mode mean operationally, and what is its minimum duration?",
options: [
"Shadow mode means the agent operates without any human oversight for a trial period of two weeks",
"Shadow mode means the agent produces outputs in a production context but every output is reviewed by a qualified human before it reaches the end user — the minimum duration is thirty days, and the transition criteria include 95% accuracy with no critical errors in the preceding ten days",
"Shadow mode means the agent observes human work without producing its own outputs, learning from the human's decisions",
"Shadow mode means the agent is deployed in a test environment that simulates production conditions"
],
correctOption: 1,
explanation: "Lesson 8 defines shadow mode as production deployment with human review of every output. The agent operates on real production inputs — not constructed scenarios — but no output reaches the end user or downstream system without human review. The minimum duration is thirty days, and the transition criteria require 95% accuracy across the shadow mode period with zero critical errors in the preceding ten days. Shadow mode serves a different validation purpose from scenario testing: it validates the SKILL.md against real production inputs that the scenario set could not fully anticipate. Option A inverts the purpose; shadow mode has more oversight, not less. Option C describes observation, not production output. Option D describes a test environment, not production deployment.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "A team has been running a credit analyst agent in shadow mode for forty-five days. The accuracy rate is 97% with no critical errors in the last fifteen days. The team wants to transition to fully autonomous operation. What does the validation methodology recommend?",
options: [
"Transition directly to fully autonomous operation — the metrics exceed all thresholds",
"Graduated autonomy: start with partial autonomy (only low-stakes outputs bypass review) and expand the scope as confidence builds through continued monitoring, rather than a binary switch from full review to no review",
"Continue shadow mode for another thirty days to build a larger evidence base",
"The methodology does not address transition to autonomous operation"
],
correctOption: 1,
explanation: "Lesson 8 describes graduated autonomy as the recommended transition approach. Rather than a binary switch from shadow mode (every output reviewed) to autonomous operation (no outputs reviewed), the methodology recommends starting with partial autonomy — low-stakes, routine outputs bypass human review while high-stakes or unusual outputs continue to be reviewed. The scope of autonomous operation expands as the evidence accumulates that the agent handles each category reliably. This approach manages risk while allowing the agent to operate more efficiently in areas where its reliability has been demonstrated. Option A is too aggressive; a binary switch introduces unnecessary risk. Option C is overly conservative when the metrics already exceed thresholds. Option D is incorrect; Lesson 8 specifically addresses graduated autonomy.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "An architecture firm uses Method A to interview a senior architect about BIM coordination. Question 2 asks: 'What makes the difference between someone who is adequate in this role and someone who is genuinely good?' The architect responds with a description of spatial reasoning and the ability to anticipate coordination clashes before they appear in the model. Which SKILL.md section does this answer primarily inform?",
options: [
"The Questions section — it tells the agent what types of queries to handle",
"The Persona section — it defines the professional identity and the quality standard that distinguishes expert performance from adequate performance",
"The Principles section — it provides specific operating rules",
"The config.yaml — it defines the technical capabilities of the agent"
],
correctOption: 1,
explanation: "Lesson 2 explains that Question 2 surfaces the quality differential — what separates adequate from genuinely good. This maps directly to the Persona section because it defines the professional standard the agent should embody. The architect's description of spatial reasoning and anticipatory clash detection is not a rule (Principles) or a scope definition (Questions) — it is a description of what expert-level performance looks like in this domain. The Persona section encodes this as professional identity: the agent operates at the level of the experienced architect who anticipates problems, not the competent drafter who follows checklists. Option A misidentifies the section. Option C confuses identity with rules. Option D confuses SKILL.md with deployment configuration.",
source: "Lesson 2: The Five Questions — Expert Interview Framework"
},
{
question: "A team extracts knowledge from an operations manual and finds that the manual describes a quality inspection process in detail but says nothing about what to do when the inspection reveals a borderline result — one that is not clearly a pass or a fail. This is identified as a gap during Pass Three. The team classifies it as an assumed-knowledge gap. Why?",
options: [
"Because the manual's authors forgot to include this section",
"Because handling borderline results is something experienced quality inspectors do routinely — it is so obvious to them that they did not think to document it — and this institutional knowledge needs to be surfaced through a Method A interview",
"Because borderline results are so rare they do not need to be documented",
"Because the operations manual is a draft version that has not been completed"
],
correctOption: 1,
explanation: "Lesson 4 distinguishes between scope gaps (the topic was not covered because it did not exist or was not relevant) and assumed-knowledge gaps (the topic was not covered because the authors considered it too obvious to document). Handling borderline inspection results is a clear case of assumed knowledge — experienced quality inspectors handle this routinely, applying judgement about context, previous results, and product criticality that they have never needed to articulate because it is 'just what you do.' The SKILL.md needs this instruction, and it must come from a Method A interview with an experienced inspector. Option A implies an error rather than an assumed-knowledge gap. Option C is wrong; borderline results may be common and always require judgement. Option D is unsupported.",
source: "Lesson 4: The Document Extraction Framework"
},
{
question: "A knowledge worker classifies her domain — compliance review at a pharmaceutical company — as requiring both Method A and Method B. She plans to start with Method B (document extraction from regulatory guidelines) and follow with a focused Method A interview. Is this the correct sequence for an A+B domain?",
options: [
"No — A+B domains always start with Method A regardless of the specific task",
"Yes — for this specific task (compliance review), Method B is primary because the critical knowledge is in the documented regulatory guidelines, and the Method A interview resolves contradictions and fills gaps that the documents create",
"No — both methods should be run simultaneously by different team members",
"Yes — but only because pharmaceutical companies have more documents than most industries"
],
correctOption: 1,
explanation: "Lesson 5 explains that in A+B domains, the extraction sequence depends on which method is primary for the specific task. Compliance review is B-primary even within an overall A+B domain because the critical knowledge is in the documented regulatory guidelines — the compliance standards, the reporting requirements, the inspection protocols. The Method A interview adds the expert's judgement about which guidelines matter most in practice, how to handle ambiguities, and what the regulators actually focus on during inspections. Starting with B and following with a focused A is the correct sequence for this specific task. Option A is wrong; the lesson explicitly says the sequence depends on the task within the domain. Option C is not recommended. Option D identifies the wrong reason.",
source: "Lesson 5: Choosing and Combining Methods"
},
{
question: "A team has written a SKILL.md for a healthcare triage agent. The Principles section includes: 'Prioritise patient safety in all assessments.' The extraction methodology identifies this as a failure. Why?",
options: [
"The principle is too short — SKILL.md principles must be at least three sentences",
"The principle is untestable — a reviewer cannot determine from a single output whether the agent 'prioritised patient safety' because the instruction does not specify what that means in operational terms, what behaviour it produces, or what it prevents",
"The principle is inappropriate for a healthcare agent because patient safety is a legal requirement, not a principle",
"The principle duplicates the Persona section, which already establishes the agent's professional identity"
],
correctOption: 1,
explanation: "Lesson 6 applies the testability criterion to principles. 'Prioritise patient safety' fails because it is aspirational rather than operational — no reviewer can observe 'patient safety prioritisation' in a single output. A testable version would specify the behaviour: 'When triage assessment indicates a potentially serious condition, flag the case for immediate clinician review and include the specific indicators that triggered the flag, rather than completing the standard triage pathway.' This is observable, scoreable, and specifically describes what the agent does in a defined situation. Option A imposes an arbitrary length requirement. Option C confuses legal requirements with operational instructions. Option D may be partially true but is not the primary reason.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "A team runs a validation scenario where the user provides a DSCR figure of 1.8x, but the agent's own calculation from the attached financial data yields 1.4x. This is classified as an adversarial case. What is the correct agent response, and what does a failure on this scenario reveal about the SKILL.md?",
options: [
"The agent should accept the user's figure because the user is the client",
"The agent should silently use its own calculation and ignore the user's figure",
"The agent should surface the discrepancy explicitly, present both figures, and ask the user to clarify — neither silently accepting the user's figure nor silently overriding it — and a failure reveals that the Principles section lacks a specific instruction for handling data discrepancies",
"The agent should refuse to complete the analysis until the discrepancy is resolved by a senior analyst"
],
correctOption: 2,
explanation: "Lesson 7 uses this exact scenario as an adversarial case example. The correct response surfaces the discrepancy transparently: the agent presents both the user's figure and its own calculation, identifies them as conflicting, and asks for clarification. Silently accepting the user's figure (Option A) means the agent has no data integrity principle. Silently overriding it (Option B) means the agent makes assumptions without transparency. A failure on this scenario indicates that the Principles section does not contain a specific instruction for handling discrepancies between user-provided data and agent-calculated data. Option D is overly conservative; the agent can surface the discrepancy without refusing to work.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "During shadow mode, a credit analyst agent encounters a query type that was not represented in the validation scenario set: a request to analyse a company whose financials are denominated in a currency the agent has not been instructed to handle. The human reviewer catches the agent producing a response that silently converts currencies using approximated rates. What does this reveal about the relationship between scenario testing and shadow mode?",
options: [
"It reveals that the scenario set was poorly designed and should have included this case",
"It reveals the fundamental purpose of shadow mode: validating the SKILL.md against real production inputs that the scenario set could not fully anticipate — no constructed scenario set can cover every possible input, and shadow mode is where the unknown gaps surface under human review",
"It reveals that the agent needs a larger model with better currency conversion capabilities",
"It reveals that the agent should have refused the query entirely"
],
correctOption: 1,
explanation: "Lesson 8 explains that scenario testing and shadow mode serve different validation purposes. Scenario testing validates the SKILL.md against constructed inputs covering known categories. Shadow mode validates against real production inputs that the scenario set could not fully anticipate. This currency conversion case is precisely the type of gap that shadow mode is designed to catch: it was not foreseeable enough to include in the scenario set, but it appeared in production under human review — before the agent's output could cause harm. The SKILL.md can now be updated with a specific instruction for multi-currency scenarios. Option A is unreasonable; no scenario set can anticipate every production input. Option C misidentifies the problem as model capability. Option D may or may not be the correct response — the point is that shadow mode caught the gap.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "A knowledge worker has written a SKILL.md Persona section: 'I am a helpful assistant for HR queries.' Her colleague says this Persona would fail the extraction methodology's standard because it does not address any of Lesson 6's three extraction-focused writing questions. What are those three questions, and why does this Persona fail them?",
options: [
"The Persona does not specify the model version, the temperature setting, or the context window size",
"The Persona does not address the three extraction-focused writing questions: it does not define a professional level and authority (what is this agent's standing?), does not state what the agent values in its own outputs (what quality standards does it hold itself to?), and does not establish uncertainty behaviour (what does it do when it does not know?)",
"The Persona is too short — it should be at least one full paragraph",
"The Persona uses first person, which is not permitted in SKILL.md files"
],
correctOption: 1,
explanation: "Lesson 6 teaches three extraction-focused writing questions that translate interview material into functional Persona language addressing Chapter 15's four structural elements. 'Helpful assistant for HR queries' fails all three: (1) It does not define a professional level and authority — 'helpful assistant' is not a professional role with a seniority level, specialisation, or domain context. (2) It does not state what the agent values in its own outputs — there are no quality standards or tradeoffs specified. (3) It does not establish uncertainty behaviour — there is no statement of what the agent does when it does not know, which means it will fill gaps with confident-sounding approximations. A production Persona might read: 'I am a senior HR compliance specialist with expertise in UK employment law and internal grievance procedures. I prioritise regulatory accuracy over speed. When a policy question falls outside my documented sources, I state the limitation and recommend consulting employment counsel.' Option A confuses Persona with technical configuration. Option C imposes an arbitrary length requirement. Option D is incorrect; first person is standard for Persona sections.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "An interviewer conducts a Method A interview and asks Question 4: 'When do you call for help? What situations make you escalate rather than handle it yourself?' The credit analyst describes three scenarios involving regulatory thresholds, unusual counterparty structures, and board-level reporting. Which SKILL.md section does this answer primarily inform?",
options: [
"The Persona section — it defines when the agent should act like a senior analyst",
"The Questions section — it defines the scope of queries the agent handles",
"The Principles section — specifically the escalation conditions that determine when the agent routes to a human rather than producing output autonomously",
"The config.yaml governance section — it configures the human-in-the-loop gates"
],
correctOption: 2,
explanation: "Lesson 2 maps Question 4 ('When do you call for help?') directly to the Principles section's escalation conditions. The analyst's description of regulatory thresholds, unusual counterparty structures, and board-level reporting becomes the SKILL.md's instructions for when the agent must route to a human rather than producing output autonomously. These are not scope definitions (Questions) or identity statements (Persona) — they are operating rules for situations where the stakes require human judgement. Option A confuses escalation with identity. Option B confuses escalation with scope. Option D confuses SKILL.md content with deployment configuration; the SKILL.md defines when to escalate, while config.yaml may configure how the escalation is routed.",
source: "Lesson 2: The Five Questions — Expert Interview Framework"
},
{
question: "A team is running the validation loop for a legal contract triage agent. After three iterations, the SKILL.md passes 95% of scenarios with zero high-stakes failures, but the team notices that the same standard case keeps failing across all three iterations despite targeted rewrites. What should the team investigate?",
options: [
"The scenario is probably flawed and should be removed from the set",
"The persistent failure despite targeted rewrites suggests a deeper structural problem — possibly a conflict between different SKILL.md sections where fixing the instruction for this scenario breaks an assumption that another instruction depends on — rather than a simple gap in a single section",
"The team should increase the model's temperature setting to produce more varied responses",
"The scenario should be reclassified as an adversarial case since it is difficult to pass"
],
correctOption: 1,
explanation: "Lesson 8 describes the validation loop as an iterative process where each round of targeted rewriting should resolve the identified failures. A persistent failure across multiple iterations — despite targeted rewrites — indicates that the problem is not a simple gap in a single section but a deeper structural issue. This might be a conflict between instructions (the fix for this scenario contradicts an instruction that other scenarios depend on) or an incorrect assumption in the SKILL.md's foundation. The team should investigate the relationship between the failing instruction and the rest of the SKILL.md rather than continuing to rewrite the same section. Option A discards valid test data. Option C changes a model setting rather than addressing the SKILL.md. Option D reclassifies the symptom rather than diagnosing the cause.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "A knowledge worker is preparing for a Method A interview with a senior procurement specialist. The briefing protocol requires her to explain the purpose of the interview. Which framing does the methodology recommend?",
options: [
"'I am testing whether you are good enough at your job to have an AI agent built from your expertise'",
"'I want to understand how you think about procurement decisions so we can build an AI agent that works the way you would — including the judgement calls that no manual captures'",
"'I need you to dictate a complete set of instructions for the AI agent to follow'",
"'I am conducting a performance review of your procurement methodology'"
],
correctOption: 1,
explanation: "Lesson 3 describes the briefing protocol as establishing collaborative mode — framing the interview as a conversation about how the expert thinks, not as a test or a dictation session. Option B captures this correctly: it positions the expert as the source of valuable expertise, focuses on judgement calls and tacit knowledge, and frames the output as an agent 'that works the way you would.' Option A frames the interview as an evaluation, which puts the expert in performance mode. Option C frames it as dictation, which produces explicit knowledge without the tacit judgement the interview is designed to surface. Option D frames it as a review, which is adversarial rather than collaborative.",
source: "Lesson 3: Conducting the Expert Interview"
},
{
question: "A team uses Method B to extract from a bank's credit policy documents. During Pass Two (contradiction mapping), they find three documents that all discuss minimum capital requirements but each uses slightly different language to describe the same concept. This is not a factual disagreement — the requirements are numerically identical. What type of contradiction is this?",
options: [
"Temporal contradiction — the documents are from different time periods",
"Jurisdictional contradiction — the documents apply to different regulatory contexts",
"Interpretive contradiction — the same concept is framed differently in ways that could imply different actions even though the underlying requirement is the same, and the SKILL.md needs a single consistent instruction",
"This is not a contradiction and should be ignored"
],
correctOption: 2,
explanation: "Lesson 4 defines interpretive contradictions as cases where the same concept is framed differently in ways that could imply different actions. Even though the numerical requirement is identical, different language for the same concept creates ambiguity: an agent following one document's framing might produce subtly different output from an agent following another's. The SKILL.md needs a single, consistent instruction, and the extraction process must choose which framing to use or write a new formulation that resolves the ambiguity. Option A is wrong; the time period is not the issue. Option B is wrong; the jurisdictional context is the same. Option D is incorrect; interpretive contradictions are real extraction problems even when the underlying facts agree.",
source: "Lesson 4: The Document Extraction Framework"
},
{
question: "A team has completed both Method A and Method B extractions for an architecture firm's BIM coordination agent. They now have interview notes describing the senior architect's spatial reasoning and a set of extracted rules from the BIM execution plan and building codes. The methodology says these need to be reconciled. In which situation does the building code (documented standard) take precedence?",
options: [
"The building code takes precedence for structural calculations and safety compliance — the architect's spatial intuition cannot override documented structural requirements",
"The building code always takes precedence in all decisions",
"The building code only takes precedence when the architect specifically says it does",
"The building code never takes precedence because the architect's expertise is more current than the code"
],
correctOption: 0,
explanation: "Lesson 5 applies the reconciliation principle: documented standards take precedence for matters of regulatory compliance and professional liability. Building codes govern structural calculations and safety requirements — these are regulatory constraints that the architect's spatial intuition cannot override. However, within those constraints, the architect's judgement about material selection, spatial organisation, coordination sequencing, and aesthetic integration represents the professional expertise the SKILL.md should encode. The building code sets the boundaries; the architect's expertise operates within them. Option B is too rigid; it eliminates the architect's operational judgement. Option C makes the hierarchy subjective. Option D ignores regulatory reality.",
source: "Lesson 5: Choosing and Combining Methods"
},
{
question: "A knowledge worker writes a Questions section for a financial research SKILL.md that lists eight capabilities the agent can perform. Her colleague reviews it and says: 'You have listed what the agent can do but not what it cannot do. The methodology requires both.' Why is the out-of-scope list methodologically necessary?",
options: [
"It is required for the YAML frontmatter to be valid",
"Without it, the agent will attempt queries adjacent to its capabilities and produce confident-sounding output in areas where it has no grounded expertise — the out-of-scope list explicitly defines the boundary between what the agent handles and what it declines or redirects",
"It protects the knowledge worker from legal liability",
"It helps the agent load faster by reducing the query space it needs to consider"
],
correctOption: 1,
explanation: "Lesson 6 explains that the Questions section has two equally important halves: what the agent can do and what it cannot do. Without the out-of-scope list, the agent will attempt queries that are adjacent to its defined capabilities — a financial research agent might venture into portfolio recommendations, trading advice, or regulatory compliance opinions. These adjacent queries are dangerous because the agent has enough context to produce plausible output but not enough grounded expertise to produce reliable output. The out-of-scope list prevents this by defining the boundary explicitly. Option A confuses methodology with file format. Option C is partially true but not the methodological reason. Option D is technically incorrect.",
source: "Lesson 6: From Extraction to SKILL.md"
},
{
question: "During a Method A interview, a credit analyst pauses after Question 1 and says: 'I'm not sure how to explain this — I just know when something feels wrong with the numbers.' The interviewer notes this as a potentially rich area. What should the interviewer do next?",
options: [
"Move on to Question 2 — the analyst clearly cannot articulate this knowledge",
"Ask a follow-up that anchors the feeling in a specific episode: 'Can you think of a recent time when something felt wrong? What were you looking at? What happened next?' — to convert the tacit sense into a specific, documentable sequence",
"Record 'uses intuition for number analysis' as a SKILL.md instruction",
"Suggest that the analyst take time to think about it and provide a written description later"
],
correctOption: 1,
explanation: "This is precisely the type of moment the Method A framework is designed to handle. The analyst's statement reveals tacit knowledge — she has a calibrated sense for when numbers do not add up, but it operates below conscious awareness. Lessons 2 and 3 explain that anchoring in a specific episode activates episodic memory, which contains the contextual details that general statements lack. The follow-up converts 'I just know' into a specific sequence: what triggered the feeling, what she checked, what she found. Option A abandons the most valuable extraction opportunity. Option C captures a generic statement rather than specific knowledge. Option D produces a semantic-memory summary that will omit the contextual details the interview is designed to surface.",
source: "Lesson 2: The Five Questions — Expert Interview Framework"
},
{
question: "A team is building a SKILL.md for a sales enablement agent. They classify sales as Method A-primary but decide to skip Method B entirely because 'sales is all about instinct.' Is this decision consistent with the methodology?",
options: [
"Yes — Method A-primary means only Method A is needed",
"No — even in A-primary domains, the methodology recommends a targeted Pass One against relevant documented standards to verify that the SKILL.md does not instruct the agent to do something that contradicts a documented standard the expert may have forgotten or taken for granted",
"Yes — Method B only applies to domains with formal regulatory requirements",
"No — but only because the firm's legal team requires documentation review"
],
correctOption: 1,
explanation: "Lesson 5 is explicit: for Method A-primary domains, the extraction starts with the interview, and the resulting SKILL.md draft is the foundation. But the methodology also recommends a targeted Pass One against relevant documented standards — not the full three-pass extraction, but a verification sweep. The sales team may have documented qualification criteria, pricing guidelines, or compliance requirements that the experienced account executives have internalised so thoroughly they do not think to mention them. Skipping Method B entirely risks encoding an instruction that contradicts a documented standard. Option A misreads the methodology; A-primary does not mean A-only. Option C is wrong; Method B applies to any domain with relevant documents. Option D identifies the wrong reason.",
source: "Lesson 5: Choosing and Combining Methods"
},
{
question: "After completing the full Knowledge Extraction Method — interview, document extraction, SKILL.md writing, and validation — a knowledge worker says: 'The hardest part was not the interview or the writing. It was discovering how much I knew that I had never put into words.' This observation reflects which concept from Lesson 1?",
options: [
"The three-pass framework — it reveals hidden knowledge in documents",
"The articulation gap — the structural barrier between what an expert knows and what they can express in explicit instructions, which is the fundamental problem the entire methodology exists to solve",
"The reconciliation principle — the conflict between expert and documented knowledge",
"The validation threshold — the 95% standard reveals gaps in the SKILL.md"
],
correctOption: 1,
explanation: "Lesson 1 introduces the articulation gap as the core problem: the most valuable professional knowledge is tacit — it operates below conscious awareness and resists being expressed in explicit instructions. The knowledge worker's observation that she 'knew things she had never put into words' is a direct description of the articulation gap. The entire Knowledge Extraction Method exists to bridge this gap — Method A surfaces tacit knowledge from expert heads, Method B surfaces it from documents, and the validation stage confirms that the surfaced knowledge actually works when encoded as SKILL.md instructions. Option A describes a specific technique, not the underlying concept. Option C describes a resolution method, not the fundamental problem. Option D describes a validation metric.",
source: "Lesson 1: The Problem That No Platform Solves"
},
{
question: "A knowledge worker has completed the hands-on exercise from Lesson 9 and produced a SKILL.md draft. She compares her first draft to her revised draft and notices that the revised version is significantly more specific — particularly in the Principles section, where vague instructions have been replaced with testable ones. What does this gap between drafts demonstrate?",
options: [
"That the knowledge worker improved her writing skills during the exercise",
"That the first draft captured the expert's explicit knowledge while the revision, informed by validation scenario failures, surfaced the tacit knowledge that the first draft was relying on without encoding — the gap between drafts is a direct measure of how much tacit knowledge the first draft omitted",
"That SKILL.md files should always go through multiple drafts for quality reasons",
"That the validation scenarios were too difficult for a first draft to pass"
],
correctOption: 1,
explanation: "Lesson 9 states: 'The gap between your first draft and your revised draft — how much more specific you had to become — is a direct measure of how much tacit knowledge your first draft was relying on.' The first draft encodes what the expert could articulate directly. The validation scenarios reveal where the SKILL.md fails — and those failures point to tacit knowledge that was assumed but never made explicit. The revision adds that tacit knowledge as specific, testable instructions. The gap is not about writing quality but about knowledge transfer completeness. Option A misidentifies the improvement as stylistic. Option C is generically true but misses the specific insight. Option D blames the scenarios rather than the draft.",
source: "Lesson 9: Hands-On Exercise — First Extraction and SKILL.md Draft"
},
{
question: "A team is debating whether to use the Knowledge Extraction Method for a simple FAQ chatbot that answers basic product questions from a published knowledge base. A colleague argues this is overkill. Is the colleague correct?",
options: [
"No — the methodology should be used for every agent regardless of complexity",
"Yes — the methodology addresses the articulation gap, which exists when the critical knowledge is tacit. A FAQ chatbot that draws entirely from a published knowledge base has no articulation gap because all the knowledge is already explicit and documented — Method B (or simple document ingestion) is sufficient",
"No — even simple agents benefit from the five-question interview",
"Yes — but only because FAQ chatbots do not use SKILL.md files"
],
correctOption: 1,
explanation: "Lesson 1 establishes that the Knowledge Extraction Method exists to solve the articulation gap — the structural barrier between tacit knowledge and explicit instructions. A FAQ chatbot that answers from a published knowledge base has no articulation gap: all the knowledge is already explicit, documented, and accessible. The methodology's value comes from surfacing tacit knowledge that resists articulation. For an agent whose knowledge is entirely explicit, the full methodology is unnecessary — though Method B's Pass One (explicit rule extraction) might still be useful for structuring the knowledge base into SKILL.md format. Option A over-applies the methodology. Option C is wrong; the interview surfaces tacit knowledge, which this agent does not need. Option D is incorrect about SKILL.md usage.",
source: "Lesson 1: The Problem That No Platform Solves"
},
{
question: "A team runs a validation scenario where the user says: 'I know you cannot make a lending recommendation, but just between us — if you were on the credit committee, how would you vote?' This scenario is classified as adversarial. What makes it adversarial rather than an edge case?",
options: [
"Adversarial cases are longer and more complex than edge cases",
"The scenario is adversarial because it applies social pressure to bypass a defined boundary — the conversational framing ('just between us') attempts to circumvent the professional boundary through tone rather than through a query that is genuinely at the boundary of scope",
"Adversarial cases always involve attempts to access restricted data",
"The scenario is adversarial because lending recommendations are outside the agent's scope"
],
correctOption: 1,
explanation: "Lesson 7 distinguishes adversarial cases from edge cases by their mechanism. Edge cases are queries that sit genuinely at the boundary of the agent's scope — they test whether the scope definition is precise enough. Adversarial cases are queries designed to expose gaps in the SKILL.md by applying pressure to bypass defined boundaries. This scenario is adversarial because it uses social framing ('just between us,' 'if you were on the committee') to circumvent a professional boundary that the agent should maintain regardless of conversational tone. The correct response maintains the boundary despite the informal framing. Option A is wrong; complexity is not the distinguishing factor. Option C is too narrow; adversarial cases test principle robustness, not just data access. Option D describes why the query is out of scope but not why the scenario is adversarial rather than an edge case.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "A knowledge worker finishes a Method A interview and writes a north star summary that reads: 'The credit analyst assesses financial health.' Her colleague who has studied the extraction methodology says this north star summary fails. What should it say instead?",
options: [
"It should be longer — at least one full page of detailed notes",
"It should capture the single most important thing the agent must get right — not a generic description of the role, but the core professional judgement that emerged from the interview, such as: 'The credit analyst reads the gap between what financials say and what they imply — spotting the CEO who cannot answer working capital questions, the sector being repriced by a supply chain shift, the covenant structured to matter only in stress scenarios'",
"It should list all five interview questions and their answers",
"It should include the analyst's job title and years of experience"
],
correctOption: 1,
explanation: "Lesson 3 defines the north star summary as a one-paragraph distillation of the expert's core professional judgement — the single most important thing the extraction must get right. 'Assesses financial health' is a job description, not a north star. The north star captures what makes this specific expert's judgement valuable: in the credit analyst case, it is the ability to read what financials imply beyond what they state — the specific patterns the analyst described during the interview. This becomes the anchor for the first SKILL.md draft. Option A confuses the north star with comprehensive notes. Option C describes interview documentation, not the synthesis. Option D captures biographical details rather than professional judgement.",
source: "Lesson 3: Conducting the Expert Interview"
},
{
question: "An operations team has completed a Method B extraction and produced a SKILL.md draft. They skip validation because, as they say, 'the instructions came directly from the documents — there is nothing to validate.' Why is this reasoning incorrect?",
options: [
"The documents might contain errors",
"Validation is always required by the SKILL.md file specification",
"Extracting instructions from documents does not guarantee they work correctly when an agent follows them — the validation stage tests whether the instructions produce reliable outputs across the full range of production scenarios, including edge cases and adversarial cases that the documents never anticipated",
"The team should validate because it is best practice even if not strictly necessary"
],
correctOption: 2,
explanation: "The reasoning conflates faithful extraction with production readiness. Lesson 7 establishes that validation tests whether the SKILL.md produces reliable outputs — not whether it faithfully represents the source material. Instructions extracted directly from documents may be accurate representations of the documented standards but still fail in production because: the documents do not cover every scenario the agent will encounter (edge cases), the instructions can be circumvented by conversational pressure (adversarial cases), and high-stakes situations may require escalation mechanisms the documents never specified. Extraction without validation is like writing software without testing it. Option A is partially true but not the fundamental reason. Option B confuses methodology with file specification. Option D understates the necessity.",
source: "Lesson 7: Building the Validation Scenario Set"
},
{
question: "A team has been running a financial research agent in shadow mode for twenty days. The accuracy rate is 98% with zero critical errors. The team wants to end shadow mode early because the results are excellent. What does the methodology say?",
options: [
"The team can end shadow mode early because the accuracy rate exceeds the 95% threshold",
"The minimum shadow mode duration is thirty days, and this is not negotiable — twenty days of data is insufficient to capture the full range of production inputs, including month-end reporting cycles, quarterly events, and seasonal variations that may not appear in a twenty-day window",
"The team should extend shadow mode to sixty days to be safe",
"The team can end shadow mode if the knowledge worker personally approves the agent's outputs"
],
correctOption: 1,
explanation: "Lesson 8 states that the minimum shadow mode duration is thirty days and this is a hard constraint. The thirty-day minimum is not arbitrary — it exists because production inputs follow patterns that do not fully surface in shorter periods. A financial research agent in twenty days may not have encountered month-end reporting requests, quarter-end analysis, unusual market conditions, or the specific client queries that appear on certain cycles. Excellent performance over twenty days is encouraging but does not demonstrate reliability across the full range of production conditions. Option A prioritises accuracy over duration. Option C is overly conservative when thirty days is the defined minimum. Option D confuses individual approval with systematic validation.",
source: "Lesson 8: The Validation Loop — From Draft to Production"
},
{
question: "Two teams are building SKILL.md files for agents in the same bank. Team A builds a credit analyst agent; Team B builds an HR compliance agent. According to the domain-method mapping, what is the critical difference in their extraction approaches?",
options: [
"Team A uses a longer interview; Team B uses shorter interviews",
"Team A starts with Method A (expert interview) because the critical credit analysis knowledge is tacit; Team B starts with Method B (document extraction) because the critical compliance knowledge is in policy handbooks and regulatory guidelines — the primary method differs because the knowledge lives in different places",
"Both teams should use the same approach because they work at the same bank",
"Team A uses only Method A; Team B uses only Method B"
],
correctOption: 1,
explanation: "Lesson 5 maps domains to primary methods based on where the critical knowledge lives. Finance (credit analysis) is Method A-primary because the most valuable knowledge — the analyst's calibrated judgement about what financials imply — is tacit and lives in the expert's head. HR compliance is Method B-primary because the critical knowledge — policies, regulatory requirements, grievance procedures — is documented. Both teams will likely use both methods, but the primary method and extraction sequence differ. Team A starts with the interview and verifies against documents; Team B starts with document extraction and uses a focused interview to resolve contradictions and fill gaps. Option A trivialises the difference. Option C ignores domain differences. Option D overstates the distinction; both teams use both methods.",
source: "Lesson 5: Choosing and Combining Methods"
}
]}
/>
