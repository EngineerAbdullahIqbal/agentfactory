/**
 * CI validation script for flashcard YAML files.
 * Run: pnpm exec tsx apps/learn-app/scripts/validate-flashcards.ts
 */

import path from "path";
import { createRequire } from "module";
import { DeckSchema } from "../src/components/flashcards/schema";

const require_ = createRequire(import.meta.url);
const { loadAllDecks } = require_(
  "../../../libs/docusaurus/shared/flashcardLoader",
);

interface LoadedDeck {
  filePath: string;
  deck: unknown;
}

interface ValidationError {
  file: string;
  message: string;
}

export function validateDecks(decks: LoadedDeck[]): {
  errors: ValidationError[];
  warnings: string[];
} {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];
  const globalCardIds = new Map<string, string>(); // cardId -> filePath

  for (const { filePath, deck } of decks) {
    const rel = path.relative(process.cwd(), filePath);

    // 1. Zod schema validation
    const result = DeckSchema.safeParse(deck);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: rel,
          message: `Schema: ${issue.path.join(".")} — ${issue.message}`,
        });
      }
      continue; // skip lint rules if schema fails
    }

    const parsed = result.data;

    // 2. No duplicate card IDs within a deck
    const localIds = new Set<string>();
    for (const card of parsed.cards) {
      if (localIds.has(card.id)) {
        errors.push({
          file: rel,
          message: `Duplicate card ID within deck: "${card.id}"`,
        });
      }
      localIds.add(card.id);

      // 3. Global uniqueness
      const existing = globalCardIds.get(card.id);
      if (existing) {
        errors.push({
          file: rel,
          message: `Duplicate card ID across decks: "${card.id}" (also in ${existing})`,
        });
      }
      globalCardIds.set(card.id, rel);

      // 4. Card front must end with "?"
      if (!card.front.endsWith("?")) {
        errors.push({
          file: rel,
          message: `Card "${card.id}": front must end with "?" — got "${card.front.slice(-20)}"`,
        });
      }

      // 5. Card back must not start with "Yes" or "No"
      if (/^(Yes|No)\b/i.test(card.back)) {
        errors.push({
          file: rel,
          message: `Card "${card.id}": back must not start with "Yes" or "No"`,
        });
      }
    }

    // 6. Difficulty distribution warning
    const diffCounts: Record<string, number> = {};
    for (const card of parsed.cards) {
      const d = card.difficulty ?? "basic";
      diffCounts[d] = (diffCounts[d] || 0) + 1;
    }
    const total = parsed.cards.length;
    for (const [level, count] of Object.entries(diffCounts)) {
      if (count / total > 0.6) {
        warnings.push(
          `${rel}: >60% of cards are "${level}" (${count}/${total}). Consider diversifying difficulty.`,
        );
      }
    }
  }

  return { errors, warnings };
}

// CLI entry point
if (
  process.argv[1] &&
  (process.argv[1].endsWith("validate-flashcards.ts") ||
    process.argv[1].endsWith("validate-flashcards"))
) {
  const docsDir = path.resolve(process.cwd(), "docs");
  const decks: LoadedDeck[] = loadAllDecks(docsDir);

  if (decks.length === 0) {
    console.log("No flashcard decks found.");
    process.exit(0);
  }

  const { errors, warnings } = validateDecks(decks);

  for (const w of warnings) {
    console.warn(`WARN: ${w}`);
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} validation error(s):\n`);
    for (const e of errors) {
      console.error(`  ${e.file}: ${e.message}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${decks.length} deck(s) — all passed.`);
  process.exit(0);
}
