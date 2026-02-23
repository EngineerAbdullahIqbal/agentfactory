# Card Type Taxonomy

Six card types to ensure variety and deep engagement.

## Target Distribution

| Type        | %   | Bloom's Level       | Purpose                         |
| ----------- | --- | ------------------- | ------------------------------- |
| Definition  | 20% | Remember/Understand | Establish vocabulary            |
| Comparison  | 15% | Analyze             | Discriminative contrast         |
| Application | 30% | Apply               | Transfer knowledge to scenarios |
| Causation   | 15% | Analyze/Evaluate    | Understand mechanisms           |
| Enumeration | 10% | Remember            | Structured recall of components |
| Reversal    | 10% | Understand          | Strengthen bidirectional links  |

## Type Details

### Definition (20%)

**Front pattern**: Term or concept name
**Back pattern**: Concise definition with key attributes

```yaml
- id: "ch01-003"
  front: "Spec-Driven Development (SDD)"
  back: "Human-written specifications are the source of truth.\nHumans specify WHAT; agents handle HOW."
  difficulty: "basic"
```

Use sparingly. Convert to Application type when possible.

### Comparison (15%)

**Front pattern**: "[A] vs [B]" or "How does [A] differ from [B]?"
**Back pattern**: Parallel structure showing contrast

```yaml
- id: "ch01-007"
  front: "SaaS vs. Agent Factory"
  back: "SaaS: Pay for a 'seat' to click buttons.\nAgents: Pay for an autonomous system to deliver outcomes."
  difficulty: "intermediate"
  why: "Why is the pricing model fundamentally different, not just the technology?"
```

Dual coding: always use `\n` to create visual parallel structure.

### Application (30%)

**Front pattern**: Scenario + question
**Back pattern**: Analysis with reasoning

```yaml
- id: "ch01-012"
  front: "A team builds AI agents and cloud infrastructure, but customers aren't buying. According to the Agent Factory model, what's likely missing?"
  back: "The business model pillar — selling verified outcomes rather than software access. Technology alone doesn't generate revenue."
  difficulty: "advanced"
  why: "What signal would confirm the business model was the gap, not the technology?"
```

This is the most valuable type. Always prefer application over definition.

### Causation (15%)

**Front pattern**: "Why does [X] happen?" or "What causes [Y]?"
**Back pattern**: Causal mechanism with chain of reasoning

```yaml
- id: "ch01-015"
  front: "Why did SaaS stocks drop after open-source agent plugins launched?"
  back: "Autonomous agents proved they could deliver outcomes that previously required expensive SaaS subscriptions, threatening the seat-based revenue model."
  difficulty: "intermediate"
```

Forces understanding of mechanisms, not just facts.

### Enumeration (10%)

**Front pattern**: "[N] elements/steps/types of [X]"
**Back pattern**: Numbered or bulleted list

```yaml
- id: "ch01-018"
  front: "4 Elements of Industrialized Execution"
  back: "1. Specs\n2. Reusable Skills\n3. Standard Tool Protocols (MCP)\n4. Cloud-native Infrastructure"
  difficulty: "basic"
  why: "What breaks if you remove MCP from this stack?"
```

Use dual coding (numbered list). Add `why` to push beyond mere listing.

### Reversal (10%)

**Front pattern**: The typical "answer" becomes the prompt
**Back pattern**: The typical "question" becomes the answer

```yaml
- id: "ch01-021"
  front: "A methodology where human-written specifications are the source of truth and agents handle implementation"
  back: "Spec-Driven Development (SDD)"
  difficulty: "intermediate"
```

Strengthens bidirectional memory links. The student must recognize concepts from their description, not just their name.

## Interleaving Rule

When ordering cards in the YAML, ensure no more than 3 consecutive cards share the same type. Alternate between types to force discriminative processing.
