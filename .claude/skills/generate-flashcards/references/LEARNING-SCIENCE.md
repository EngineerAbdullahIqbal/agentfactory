# Learning Science Foundations

Three principles that matter. Everything else is noise.

## 1. Minimum Information Principle

**Source**: Wozniak (1999). "Effective Learning: Twenty Rules of Formulating Knowledge."

One card, one concept. Break complex material into the simplest possible items. If a card tests two things, split it.

**For recall cards**: Front is a concise, explicit question (**under 40 words**). Back is the atomic answer — **under 15 words**, no explanation, no filler. Focus on **key terms, formulas, and relationships**. If the back needs a "because" or an explanation, it's a thinking card — reclassify.
**For thinking cards**: Front is a single scenario or **Why/How** question focused on **understanding, not just rote memorization**. Back explains the reasoning for that one thing in **20-40 words** — lead with the insight, add one reasoning step.

**Anti-patterns**:

- "What are the three pillars and how do they interact?" → Split into a recall card (name them) and a thinking card (how they interact).
- Recall back that's a paragraph → Trim to just the fact. "AI employees (Digital FTEs)" not "AI employees — role-based systems that compose tools, spawn specialist agents, and deliver outcomes at scale."
- Thinking card whose back is a memorizable comparison → That's disguised recall. The back must contain BECAUSE/THEREFORE reasoning.

## 2. Retrieval Practice

**Source**: Roediger & Karpicke (2006). "Test-Enhanced Learning."

The act of pulling information from memory strengthens the memory trace more than re-reading. Cards must force genuine recall, not passive recognition.

**Rules**:

- Front must never contain or hint at the answer
- No Yes/No questions (tests recognition, not recall)
- Anchor generic terms in context ("In the Agent Factory model, what is Intent?" not "What is Intent?")

**Anti-pattern**: "Is SDD the methodology where specs are the source of truth?" → Yes. (Student recognized it, didn't recall it.)

## 3. Elaborative Interrogation

**Source**: Pressley et al. (1987). "Elaborative Interrogation facilitates acquisition of confusing facts."

Asking "why" and "how" forces deeper processing and stronger encoding.

**For thinking cards**: The front question itself should be a Why/How question. The `why` field pushes one level deeper — asking about implications, adjacent mechanisms, or what would happen if things changed.

**The `why` field is NOT**:

- A repeat of the front question in different words
- "Can you explain more about X?"
- Present on recall cards (they don't need it)

**The `why` field IS**:

- A different angle: Front asks "Why did X happen?" → `why` asks "How would you prevent X?"
- A connection: Front asks about concept A → `why` asks how A relates to concept B
- An implication: Front asks about a mechanism → `why` asks what breaks if the mechanism fails

## How These Map to Card Types

| Principle                 | Recall Cards                    | Thinking Cards                     |
| ------------------------- | ------------------------------- | ---------------------------------- |
| Minimum Information       | One fact per card               | One mechanism per card             |
| Retrieval Practice        | Direct question → atomic answer | Scenario → reasoned answer         |
| Elaborative Interrogation | Not used                        | Front = Why/How, `why` = go deeper |
