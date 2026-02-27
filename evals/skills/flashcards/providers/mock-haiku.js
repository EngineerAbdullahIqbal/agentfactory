// Mock provider that returns golden flashcard YAML
// Used for testing the eval pipeline without API keys
// Run: npx promptfoo eval -c evals/skills/flashcards/promptfooconfig.mock.yaml

module.exports = class MockHaikuProvider {
  id() { return "mock:haiku"; }
  toString() { return "MockHaiku"; }

  async callApi(prompt) {
    // Detect negative control (no flashcards expected)
    if (/do not generate flashcards/i.test(prompt) || /summarize.*bullet/i.test(prompt)) {
      return {
        output: `Here are the key points from the lesson:\n\n1. Agent memory persists context across sessions\n2. Short-term and long-term memory serve different roles\n3. RAG retrieves external documents for context\n4. Vector databases enable semantic search\n5. Memory consolidation prevents token waste`,
      };
    }

    // Return well-formed flashcard YAML for all other cases
    return {
      output: `deck:
  id: eval-test
  title: Lesson Flashcards
  description: Generated flashcards for eval testing
  tags: [eval, test, memory]
  version: 1

cards:
  - id: eval-test001
    front: What is agent memory used for?
    back: Persisting context across interactions
    difficulty: basic
    tags: [memory, core]
  - id: eval-test002
    front: What are the two main types of agent memory?
    back: Short-term working memory and long-term persistent memory
    difficulty: basic
    tags: [memory, types]
  - id: eval-test003
    front: What does RAG stand for?
    back: Retrieval-Augmented Generation
    difficulty: basic
    tags: [RAG, definition]
  - id: eval-test004
    front: How does RAG improve agent responses?
    back: RAG retrieves relevant documents from external storage and injects them into the prompt context, allowing agents to access knowledge beyond training data without fine-tuning.
    difficulty: intermediate
    tags: [RAG, mechanism]
    why: Why is retrieval preferred over simply expanding context windows?
  - id: eval-test005
    front: Why is memory consolidation critical for long-running agents?
    back: Without consolidation, agents accumulate redundant information that wastes context window tokens and degrades retrieval quality, requiring periodic summarization and pruning of stored memories.
    difficulty: intermediate
    tags: [consolidation, efficiency]
    why: What happens when agent memory grows without bounds?
  - id: eval-test006
    front: What role do embeddings play in memory systems?
    back: Convert text into vector representations for similarity search
    difficulty: intermediate
    tags: [embeddings, vectors]
  - id: eval-test007
    front: How do vector databases enable scalable retrieval?
    back: Vector databases index embeddings for fast approximate nearest-neighbor search, enabling agents to find semantically relevant memories in milliseconds across millions of entries without scanning everything.
    difficulty: advanced
    tags: [vector-db, scaling]
    why: Why not use traditional keyword search for memory retrieval?
  - id: eval-test008
    front: What is episodic memory in agent systems?
    back: Memory of specific past interactions and outcomes
    difficulty: intermediate
    tags: [episodic, types]
  - id: eval-test009
    front: Why must agents balance memory breadth against context limits?
    back: Loading too much memory crowds out space for user input and reasoning, forcing agents to be selective about which memories to retrieve for each interaction to maintain response quality.
    difficulty: advanced
    tags: [context-window, trade-offs]
    why: What is the cost of retrieving every possibly relevant memory?
  - id: eval-test010
    front: What is the minimum information principle?
    back: Store the smallest unit of information that is independently meaningful
    difficulty: intermediate
    tags: [principles, storage]`,
    };
  }
};
