/** YAML deck structure as authored in .flashcards.yaml files */
export interface FlashcardDeck {
  deck: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    version: number;
  };
  cards: FlashcardCard[];
}

/** Single card from YAML */
export interface FlashcardCard {
  id: string;
  front: string;
  back: string;
  tags?: string[];
  difficulty?: "basic" | "intermediate" | "advanced";
  why?: string;
}

/** Persisted deck state in localStorage (key: `flashcards:${deck.id}`) */
export interface PersistedDeckState {
  schemaVersion: 1;
  deckVersion: number;
  cards: Record<string, PersistedCardState>;
  lastReviewMs: number;
}

/** Persisted SRS state for a single card */
export interface PersistedCardState {
  dueMs: number;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: 0 | 1 | 2 | 3; // 0=New, 1=Learning, 2=Review, 3=Relearning
  learning_steps: number;
  lastReviewMs?: number;
}

/** Props for the main Flashcards component */
export interface FlashcardsProps {
  /** Injected by remark plugin at build time. null = YAML not found. */
  cards?: FlashcardDeck | null;
  /** Filter by tags */
  tags?: string[];
  /** Filter by max difficulty */
  maxDifficulty?: "basic" | "intermediate" | "advanced";
  /** Hide Anki export button */
  hideExport?: boolean;
}
