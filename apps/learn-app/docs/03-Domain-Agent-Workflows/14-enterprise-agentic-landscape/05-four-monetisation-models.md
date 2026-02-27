---
sidebar_position: 5
title: "Four Monetisation Models"
description: "Understand the four ways domain agents create and capture value -- Success Fee, Subscription, License, and Marketplace -- with pricing benchmarks and domain-specific guidance"
keywords: ["monetisation models", "success fee", "subscription", "license", "marketplace", "agent pricing", "attribution methodology", "domain agent value"]
chapter: 14
lesson: 5
duration_minutes: 35

# HIDDEN SKILLS METADATA
skills:
  - name: "Name the Four Monetisation Models"
    proficiency_level: "A1"
    category: "Conceptual"
    bloom_level: "Remember"
    digcomp_area: "Information Literacy"
    measurable_at_this_level: "Student can list all four monetisation models (Success Fee, Subscription, License, Marketplace) and provide a one-sentence description of each"

  - name: "Match Models to Domains"
    proficiency_level: "A2"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can match a described domain (e.g., sales, HR, legal) to the most appropriate monetisation model and explain why it fits"

  - name: "Evaluate Pricing Architecture"
    proficiency_level: "B1"
    category: "Applied"
    bloom_level: "Apply"
    digcomp_area: "Problem-Solving"
    measurable_at_this_level: "Student can evaluate a proposed pricing structure for a domain agent, identify whether the model matches the value delivery pattern, and suggest adjustments"

learning_objectives:
  - objective: "List the four monetisation models and describe when each is appropriate"
    proficiency_level: "A1"
    bloom_level: "Remember"
    assessment_method: "Student names all four models and provides a correct one-sentence description for each"

  - objective: "Match a given professional domain to the most appropriate monetisation model based on value delivery patterns"
    proficiency_level: "A2"
    bloom_level: "Apply"
    assessment_method: "Given three domain descriptions, student selects the correct monetisation model for each and explains the reasoning"

  - objective: "Evaluate a pricing proposal for a domain agent and identify whether the model fits the value pattern"
    proficiency_level: "B1"
    bloom_level: "Apply"
    assessment_method: "Given a pricing proposal, student identifies mismatches between the model and the domain's value delivery pattern and suggests corrections"

cognitive_load:
  new_concepts: 5
  concepts_list:
    - "Success fee model"
    - "Subscription model"
    - "License model"
    - "Marketplace model"
    - "Attribution methodology"
  assessment: "5 concepts at the centre of the A1-A2 range (5-7). The four models form a natural group with clear distinctions, reducing interference. Attribution methodology is the one cross-cutting concept."

differentiation:
  extension_for_advanced: "Design a hybrid monetisation model that combines two approaches (e.g., subscription base + success fee bonus) for a specific domain and justify the structure"
  remedial_for_struggling: "Focus on two models only -- Success Fee and Subscription -- and practise matching them to familiar business scenarios before adding License and Marketplace"

teaching_guide:
  lesson_type: "core"
  session_group: 2
  session_title: "Value and Monetisation"
  key_points:
    - "Before deploying any domain agent, you must understand how it creates value AND how that value is captured -- technology without a value model is a cost centre"
    - "Success Fee is the most natural model for domains with measurable outcomes (sales, finance), but requires clean attribution agreed before deployment"
    - "Subscription works for continuous-value domains where attribution is difficult (HR, technical documentation)"
    - "License is appropriate for high-stakes, regulated domains where security and compliance reviews are expected"
    - "Marketplace creates a new revenue stream by publishing SKILL.md files as reusable plugins -- but only for general domain knowledge, never organisation-specific knowledge"
  misconceptions:
    - "Students assume one monetisation model works for all domains -- each model fits specific value delivery patterns"
    - "Students confuse success fee with commission -- a success fee requires a pre-agreed attribution methodology, not just a percentage"
    - "Students think the marketplace model means selling their company's proprietary knowledge -- only general domain best practices are publishable"
  discussion_prompts:
    - "If you deployed a domain agent tomorrow, which monetisation model would fit your domain and why?"
    - "What would make attribution 'clean' versus 'messy' for a success fee model in your field?"
    - "Could you publish a SKILL.md to a marketplace? What domain knowledge do you have that is general (not proprietary)?"
  teaching_tips:
    - "Start with the question 'How does this agent pay for itself?' -- this grounds the abstract models in practical business reality"
    - "Use the pricing benchmarks as discussion starters, not gospel -- actual prices vary by market, but the ranges give students a frame of reference"
    - "Emphasise that choosing the wrong monetisation model is a common deployment failure -- it is not a minor detail"
  assessment_checks:
    - question: "Why does the success fee model require an attribution methodology agreed before deployment?"
      expected_response: "Because without pre-agreed attribution, there is no way to determine which outcomes the agent caused versus outcomes that would have happened anyway. Disputes over attribution after deployment undermine the entire model."
    - question: "What is the key weakness of the subscription model?"
      expected_response: "It does not self-justify. Because the fee is paid regardless of value delivered in a given period, the organisation must actively measure value to avoid questioning whether the subscription is worth continuing."
---

# Four Monetisation Models

In Lesson 4, you learned how to choose between Cowork and Frontier based on your organisational context. Now the question shifts from "which platform?" to "how does this agent pay for itself?"

Before you deploy a domain agent, you need to understand how it creates value and how that value is captured. Technology without a value model is a cost centre. It gets funded once, questioned twice, and cut in the next budget cycle. The agents that survive are the ones whose value is visible, measurable, and tied to a model that the organisation understands.

The enterprise agentic landscape has converged on four monetisation models. Each fits a different pattern of value delivery. Choosing the right model is not a minor detail -- it determines whether your agent deployment is seen as an investment or an expense.

## Model 1: Success Fee

Deploy the agent. It produces a measurable outcome. Capture a percentage.

The success fee model is the most naturally compelling because value is directly visible: the agent did something, and that something produced a result you can measure. But it requires one critical precondition -- a **clean attribution methodology** agreed before deployment. Without pre-agreed attribution, you cannot determine which outcomes the agent caused versus outcomes that would have happened regardless.

### Natural Domains

| Domain | Typical Fee Structure | Why It Fits |
|--------|----------------------|-------------|
| **Sales** | $3-8 per qualified lead, 0.5-1.5% of attributed closed revenue | Leads and revenue are directly measurable |
| **Finance** | 1.5-2.5% of attributed savings identified | Cost reduction is quantifiable against baseline |
| **Architecture / Construction** | 0.5-1% of attributed project savings | Budget variance is tracked on every project |

### The Attribution Requirement

The word "attributed" is doing heavy lifting. Before deploying a success-fee agent, you must agree on:

- **What counts as agent-attributed?** A lead the agent identified, qualified, and handed to sales? Or any lead the agent touched?
- **What is the baseline?** What would have happened without the agent? You need a comparison period or control group.
- **Who measures?** An independent measurement prevents disputes.

Get attribution wrong, and the model collapses into argument. Get it right, and it is the most powerful justification for continued investment.

## Model 2: Subscription

Recurring fee regardless of value in a given period. Per-seat, per-team, or enterprise-wide.

The subscription model works when value is continuous but difficult to attribute to specific outcomes. The agent helps every day, but you cannot point to one moment and say "that generated $X."

### Natural Domains

| Domain | Why Subscription Fits | Typical Range |
|--------|----------------------|---------------|
| **HR** | Continuous value across recruiting, onboarding, policy questions -- hard to tie to specific revenue | Team-level: $800-$2,500/month |
| **Technical Documentation** | Diffuse, ongoing value across the organisation -- every employee benefits, none can be isolated | Enterprise: $5,000-$15,000/month |
| **Project Management** | Ongoing coordination value that prevents delays but cannot be attributed to specific savings | Project-based: $500-$2,000/project |

### The Self-Justification Problem

Subscription's weakness is that it **does not self-justify**. A success-fee agent proves its value every time it generates a fee. A subscription agent requires active measurement to demonstrate that the recurring cost is worth paying.

Without deliberate value tracking, subscriptions become line items that finance questions during budget reviews. The fix: build measurement into the deployment from day one. Track time saved, errors prevented, queries handled -- whatever makes the value visible even when it cannot be attributed to specific revenue.

## Model 3: License

High-stakes, regulated, or proprietary domains where security and compliance reviews are expected and the pricing reflects the risk profile.

License agreements are annual contracts with significant upfront negotiation. They fit domains where the consequences of agent failure are severe enough that both parties need contractual protections.

### Natural Domains

| Domain | Typical Annual Range | Why License Fits |
|--------|---------------------|-----------------|
| **Legal** | $40,000-$150,000/year | Regulatory compliance, attorney-client privilege, malpractice risk |
| **Healthcare** | $60,000-$180,000/year | Patient safety, HIPAA compliance, clinical liability |
| **Architecture / BIM** | $60,000-$180,000/year | Building code compliance, structural safety, professional liability |

### Requirements

Deploying under a license model means passing through:

- **Security review**: How is data stored, transmitted, and accessed?
- **Legal review**: Who is liable if the agent produces incorrect output?
- **Compliance assessment**: Does the agent meet regulatory requirements specific to the domain?

This procurement process takes months, not weeks. It is appropriate for **Level 3+ maturity organisations** (you will learn about maturity levels in Lesson 6) that have the governance infrastructure to manage these reviews.

## Model 4: Marketplace

Publish your SKILL.md as a reusable plugin. Other teams or organisations subscribe.

The marketplace model turns your domain expertise into a product. You write a SKILL.md that encodes general best practices in your domain -- not your organisation's proprietary knowledge, but the knowledge that any practitioner in your field would benefit from.

### Economics

- Revenue per subscriber: $200-$900/month
- Marginal cost of each additional subscriber: effectively zero
- IP distinction: **Organisation-specific knowledge = not publishable.** General domain best practice = publishable.

### The IP Distinction

This is the critical boundary. Your company's internal compliance procedures, client lists, and proprietary methods are not marketplace material. But your knowledge of how to structure a regulatory review, how to approach building code analysis, or how to qualify a sales lead in your industry -- that general domain expertise is publishable and valuable.

### Comparison Table

| Model | Value Pattern | When to Use | Key Risk |
|-------|--------------|-------------|----------|
| **Success Fee** | Measurable, attributable outcomes | Sales, finance, cost reduction | Attribution disputes |
| **Subscription** | Continuous, diffuse value | HR, documentation, coordination | Fails to self-justify |
| **License** | High-stakes, regulated domains | Legal, healthcare, architecture | Lengthy procurement |
| **Marketplace** | Reusable domain expertise | General best practices | IP boundary confusion |

## Try With AI

Use these prompts in Anthropic Cowork or your preferred AI assistant to explore these concepts further.

### Prompt 1: Personal Application

```
I work in [YOUR DOMAIN -- e.g., "financial compliance at a regional
bank"]. If I deployed a domain agent to help with [describe a specific
task -- e.g., "reviewing loan applications against our risk criteria"],
which of the four monetisation models would best capture the value?
Walk me through each model and explain why it does or does not fit my
situation. Then recommend the best model and explain what I would need
to set up before deployment (e.g., attribution methodology, measurement
framework, compliance review).
```

**What you're learning:** You are practising model selection against your own domain. The AI forces you to evaluate each model against your specific value delivery pattern, not just pick the first one that sounds reasonable.

### Prompt 2: Framework Analysis

```
Analyse this scenario: A 40-person architecture firm wants to deploy
an AI agent that reviews building plans against local building codes
and flags potential violations before submission. The firm charges
clients per project, and a code violation caught early saves an
average of $15,000 in rework costs.

Which monetisation model fits best? Could a hybrid model work (e.g.,
subscription base + success fee per violation caught)? What are the
trade-offs of each approach?
```

**What you're learning:** You are evaluating whether a single model fits or whether a hybrid approach is needed. Real deployments often require blending models, and this prompt teaches you to think about trade-offs rather than defaulting to one answer.

### Prompt 3: Domain Research

```
Research how AI agents are currently monetised in [YOUR INDUSTRY --
e.g., "legal technology," "healthcare IT," "sales enablement"]. What
pricing models are the leading vendors using? Are they charging per
seat, per outcome, per license, or through marketplaces? How do the
prices compare to the benchmarks I learned (e.g., $3-8 per qualified
lead for sales, $40,000-$150,000/year for legal licenses)?
```

**What you're learning:** You are grounding the abstract models in current market reality. Knowing what competitors charge and how they structure pricing gives you a reference point for your own deployment decisions.


## Flashcards Study Aid

<Flashcards />
