---
sidebar_position: 15
title: "Chapter 15: The Enterprise Agent Blueprint"
description: "Understand the anatomy of a Cowork plugin — SKILL.md, config.yaml, and MCP connectors — the governance layer, ownership model, and marketplace that make enterprise agent deployment possible"
chapter_number: 15
part_number: 3
version: 1.0
status: draft
---

# Chapter 15: The Enterprise Agent Blueprint

> *"Most technology failures in organisations are not technical failures. They are ownership failures. Nobody knew whose job it was. The blueprint solves that problem before the technology has a chance to create it."*

Chapter 14 established why the enterprise agentic era arrived when it did, who the central figures are, and which platforms and models apply to which organisational contexts. It left one question deliberately unanswered: what, precisely, is a Cowork plugin? What does it contain, who builds each part of it, and what keeps it operating reliably once deployed? This chapter answers those questions in full.

The answer has three parts. A Cowork plugin is composed of a SKILL.md — a plain-text file that encodes the expertise of the knowledge worker who built it — a config.yaml that configures the deployment environment, and a set of MCP connector scripts that connect the agent to the live data sources it needs to do its work. Each component has a distinct owner. The knowledge worker authors the SKILL.md. IT configures the connectors. An administrator governs the deployment. These layers are independent by design, and that independence is what makes the system maintainable, diagnosable, and scalable.

This chapter describes the anatomy of a Cowork plugin in terms a knowledge worker can act on. It explains the three-level context system that determines which instructions the agent follows. It walks through a complete, annotated SKILL.md so you can recognise the difference between a production-ready file and an amateur one. It maps the MCP connector ecosystem available for the major professional domains. And it covers the governance mechanisms — permissions, audit trails, shadow mode, and human-in-the-loop gates — that make enterprise deployment of autonomous agents defensible in regulated industries. By the end, you will have the architectural vocabulary that Chapter 16 assumes.

## What You'll Learn

By the end of this chapter, you will be able to:

- Define a Cowork plugin precisely and name its three components and their respective owners
- Explain the Agent Skills Pattern — Persona, Questions, and Principles — and describe the function of each section
- Read a config.yaml and identify the plugin's permission scope, connector access, and governance settings
- Explain what MCP connector scripts do conceptually, identify which production connectors exist for your domain, and describe the failure mode when a connector becomes unavailable
- Trace the three-level context hierarchy (platform → organisation → plugin) and diagnose why a SKILL.md instruction might not be honoured
- Distinguish a production-ready SKILL.md from an amateur one using concrete quality signals
- Describe the four governance mechanisms and state the shadow mode protocol for transitioning to autonomous operation
- Map the three-way ownership model and assign any plugin issue to the correct responsible layer
- Distinguish vertical skill packs from connector packages in the marketplace and assess whether expertise is publishable

## Lesson Flow

| Lesson | Title | Duration | What You'll Walk Away With |
| --- | --- | --- | --- |
| [L01](./01-what-a-plugin-actually-is.md) | What a Plugin Actually Is | 20 min | A precise definition of a Cowork plugin and its three-component structure |
| [L02](./02-the-intelligence-layer-skill-md.md) | The Intelligence Layer — SKILL.md | 30 min | Understanding of the Agent Skills Pattern and why each section matters functionally |
| [L03](./03-configuration-and-integration-layers.md) | The Configuration and Integration Layers | 25 min | Ability to read a config.yaml and understand what connectors do and what happens when they fail |
| [L04](./04-three-level-context-system.md) | The Three-Level Context System | 20 min | The diagnostic sequence for understanding why an agent behaves as it does |
| [L05](./05-agent-skills-pattern-in-practice.md) | The Agent Skills Pattern in Practice | 30 min | The quality signals that distinguish a production-ready SKILL.md from an amateur one |
| [L06](./06-mcp-connector-ecosystem.md) | The MCP Connector Ecosystem | 25 min | A map of production connectors for your domain and the process for commissioning custom ones |
| [L07](./07-governance-layer.md) | The Governance Layer | 30 min | The four governance mechanisms and the precise shadow mode protocol |
| [L08](./08-division-of-responsibility.md) | The Division of Responsibility | 20 min | The three-way ownership model and how to assign any problem to the correct layer |
| [L09](./09-cowork-plugin-marketplace.md) | The Cowork Plugin Marketplace | 20 min | The distinction between vertical skill packs and connector packages, and the publishing path |
| [L10](./10-chapter-summary.md) | Chapter Summary | 15 min | Synthesis of the full plugin architecture, ready for Chapter 16 |
| [Quiz](./11-chapter-quiz.md) | Chapter Quiz | 50 min | 50 questions covering all ten lessons |

## Chapter Contract

By the end of this chapter, you should be able to answer these five questions:

1. What are the three components of a Cowork plugin, and who owns each one?
2. What are the three sections of the Agent Skills Pattern, and what does each section define?
3. How does the three-level context system determine which instructions are honoured, and what is the diagnostic sequence when a SKILL.md instruction is overridden?
4. What is shadow mode, and what is the standard protocol for transitioning from shadow operation to autonomous operation?
5. What distinguishes a vertical skill pack from a connector package in the marketplace, and what makes expertise publishable rather than proprietary?

## After Chapter 15

When you finish this chapter, your perspective shifts:

1. **You see the architecture.** A Cowork plugin is no longer a black box. You can look at any deployment and identify which component governs which behaviour, who owns it, and where to look when something goes wrong.
2. **You own your layer.** You understand that the SKILL.md is yours — not a developer's, not a platform's — and that the quality of the agent's expertise is a direct function of how well you have written it.
3. **You diagnose before you escalate.** When an agent behaves unexpectedly, you run the three-level diagnostic before concluding there is a bug. Most unexpected behaviour has a configuration explanation.
4. **You govern by design.** You understand that shadow mode, audit trails, and human-in-the-loop gates are architectural features, not optional additions — and that deploying without them in a regulated environment is not a shortcut but a liability.

Start with [Lesson 1: What a Plugin Actually Is](./01-what-a-plugin-actually-is.md).
