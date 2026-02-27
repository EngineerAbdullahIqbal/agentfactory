// Thin deterministic grader for Promptfoo
// 25 checks extracted from the original, zero external dependencies
// Parses YAML manually (simple enough for flashcard format)

module.exports = async function ({ output, vars }) {
  const expected = vars._expected || {};
  const shouldGenerate = Boolean(expected.should_generate);

  // Parse YAML from model output
  const parsed = parseFlashcardYaml(output);
  const checks = [];

  // === STRUCTURAL CHECKS ===

  // 1. Did it generate when expected (or not generate when not expected)?
  const hasContent = parsed !== null && parsed.cards && parsed.cards.length > 0;
  checks.push(check(
    shouldGenerate ? hasContent : !hasContent,
    "generation_match",
    true, 8,
    shouldGenerate ? `Expected cards, got ${hasContent ? parsed.cards.length : 0}` : `Expected no cards, got ${hasContent ? "cards" : "none"}`
  ));

  // If not expected to generate, we're done
  if (!shouldGenerate) {
    return result(checks);
  }

  // If parse failed, everything else fails
  if (!parsed) {
    checks.push(check(false, "yaml_parse", true, 10, "Failed to parse YAML from output"));
    return result(checks);
  }

  const { deck, cards } = parsed;

  // 2. YAML parsed successfully
  checks.push(check(true, "yaml_parse", true, 10, "YAML parsed"));

  // 3. Deck schema (has id, title, description, tags, version)
  const schemaOk = deck && typeof deck.id === "string" && typeof deck.title === "string" &&
    typeof deck.description === "string" && Array.isArray(deck.tags);
  checks.push(check(schemaOk, "deck_schema", true, 8, schemaOk ? "Valid" : "Missing deck fields"));

  // 4. Card count in range
  const min = expected.min_cards || 0;
  const max = expected.max_cards || 999;
  checks.push(check(
    cards.length >= min && cards.length <= max,
    "card_count_range", true, 5,
    `${cards.length} cards (expected ${min}-${max})`
  ));

  // === PER-CARD CHECKS ===
  let recallCount = 0, thinkingCount = 0;
  let missingFields = 0, badIds = 0, dupIds = 0, missingTags = 0;
  let badDifficulty = 0, yesNoBack = 0, noQuestionMark = 0;
  let dupPairs = 0, compoundQ = 0, recallBackOver15 = 0;
  let thinkingBackOutOfRange = 0, thinkingMissingWhy = 0;
  let recallHasWhy = 0, thinkingNoWhyHow = 0;
  let basicCount = 0, intCount = 0, advCount = 0;
  let formulaCards = 0, sourceArgueCount = 0;

  const seenIds = new Set();
  const seenPairs = new Set();

  for (const card of cards) {
    // Required fields
    if (!card.id || !card.front || !card.back || !card.difficulty) {
      missingFields++;
      continue;
    }

    // ID uniqueness
    if (seenIds.has(card.id)) dupIds++;
    seenIds.add(card.id);

    // ID pattern (deck-id + NNN)
    if (deck && deck.id && !card.id.startsWith(deck.id)) badIds++;

    // Tags present
    if (!Array.isArray(card.tags) || card.tags.length < 1) missingTags++;

    // Difficulty valid
    if (!["basic", "intermediate", "advanced"].includes(card.difficulty)) {
      badDifficulty++;
    } else {
      if (card.difficulty === "basic") basicCount++;
      else if (card.difficulty === "intermediate") intCount++;
      else advCount++;
    }

    // Front ends with ?
    if (!card.front.trim().endsWith("?")) noQuestionMark++;

    // Back not yes/no
    if (/^(yes|no)\b/i.test(card.back.trim())) yesNoBack++;

    // Duplicate front/back pairs
    const pair = `${card.front.toLowerCase().trim()}||${card.back.toLowerCase().trim()}`;
    if (seenPairs.has(pair)) dupPairs++;
    seenPairs.add(pair);

    // Compound question detection
    if (/\b(what|why|how|which|when|where|who)\b.*\band\b.*\b(what|why|how|which|when|where|who)\b/i.test(card.front)) {
      compoundQ++;
    }

    // Source argue template
    if (/why does the\s+(text|lesson|source|chapter|book)\s+(argue|say|recommend|claim|state)/i.test(card.front)) {
      sourceArgueCount++;
    }

    // Formula detection
    if (/[=<>]/.test(card.front + card.back) || /\b\d+(\.\d+)?\s*[+\-*/]\s*\d+/.test(card.front + card.back)) {
      formulaCards++;
    }

    // Thinking vs recall classification
    const isThinking = card.why && typeof card.why === "string" && card.why.trim().length > 0;
    const backWords = wordCount(card.back);

    if (isThinking) {
      thinkingCount++;
      if (backWords < 20 || backWords > 40) thinkingBackOutOfRange++;
      if (!/\b(why|how)\b/i.test(card.front)) thinkingNoWhyHow++;
    } else {
      recallCount++;
      if (backWords > 15) recallBackOver15++;
      if (card.why) recallHasWhy++;
    }
  }

  // 5-8. Required fields, IDs, tags, difficulty
  checks.push(check(missingFields === 0, "required_fields", true, 8, `${missingFields} cards missing fields`));
  checks.push(check(badIds === 0, "id_pattern", true, 6, `${badIds} bad ID patterns`));
  checks.push(check(dupIds === 0, "id_unique", true, 6, `${dupIds} duplicate IDs`));
  checks.push(check(missingTags === 0, "tags_present", true, 4, `${missingTags} cards missing tags`));

  // 9-11. Content quality
  checks.push(check(badDifficulty === 0, "difficulty_valid", true, 4, `${badDifficulty} invalid difficulty values`));
  checks.push(check(yesNoBack === 0, "no_yes_no_back", true, 6, `${yesNoBack} yes/no answers`));
  checks.push(check(noQuestionMark === 0, "fronts_end_question", false, 3, `${noQuestionMark} fronts without ?`));

  // 12. Recall/thinking balance
  const total = recallCount + thinkingCount;
  const recallRatio = total === 0 ? 0 : recallCount / total;
  const rMin = expected.recall_ratio_min || 0;
  const rMax = expected.recall_ratio_max || 1;
  checks.push(check(
    recallRatio >= rMin && recallRatio <= rMax,
    "recall_thinking_balance", false, 8,
    `recall=${recallCount} thinking=${thinkingCount} ratio=${recallRatio.toFixed(2)} (expected ${rMin}-${rMax})`
  ));

  // 13-14. Recall constraints
  checks.push(check(recallBackOver15 === 0, "recall_back_under_15w", true, 6, `${recallBackOver15} recall backs over 15 words`));
  checks.push(check(recallHasWhy === 0, "recall_no_why", true, 6, `${recallHasWhy} recall cards have why field`));

  // 15-17. Thinking constraints
  checks.push(check(thinkingCount === 0 || thinkingBackOutOfRange === 0, "thinking_back_20_40w", false, 5, `${thinkingBackOutOfRange} thinking backs outside 20-40 words`));
  checks.push(check(thinkingCount === 0 || thinkingNoWhyHow === 0, "thinking_why_how_front", false, 5, `${thinkingNoWhyHow} thinking fronts without why/how`));

  // 18-19. Anti-patterns
  checks.push(check(dupPairs === 0, "no_duplicate_pairs", false, 4, `${dupPairs} duplicate front/back pairs`));
  checks.push(check(compoundQ === 0, "no_compound_questions", false, 4, `${compoundQ} compound questions`));
  checks.push(check(sourceArgueCount <= 2, "source_argue_limit", false, 3, `${sourceArgueCount} source-argue template cards (max 2)`));

  // 20. Difficulty distribution (20-40% basic, 40-60% int, 10-30% adv)
  const bPct = total === 0 ? 0 : basicCount / total;
  const iPct = total === 0 ? 0 : intCount / total;
  const aPct = total === 0 ? 0 : advCount / total;
  checks.push(check(
    total === 0 || (bPct >= 0.2 && bPct <= 0.4 && iPct >= 0.4 && iPct <= 0.6 && aPct >= 0.1 && aPct <= 0.3),
    "difficulty_distribution", false, 5,
    `basic=${(bPct*100).toFixed(0)}% int=${(iPct*100).toFixed(0)}% adv=${(aPct*100).toFixed(0)}%`
  ));

  // 21. Formula focus (conditional)
  if (expected.require_formula_focus) {
    const minFormula = expected.min_formula_cards || 2;
    checks.push(check(formulaCards >= minFormula, "formula_focus", true, 6, `${formulaCards} formula cards (need ${minFormula}+)`));
  }

  return result(checks);
};

// === HELPERS ===

function check(condition, id, hard, weight, details) {
  return { id, pass: Boolean(condition), hard, weight, details };
}

function result(checks) {
  const hardPass = checks.filter(c => c.hard).every(c => c.pass);
  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const passedWeight = checks.filter(c => c.pass).reduce((s, c) => s + c.weight, 0);
  const score = totalWeight === 0 ? 0 : passedWeight / totalWeight;

  const failed = checks.filter(c => !c.pass);
  const reason = failed.length === 0
    ? `All ${checks.length} checks passed (score: ${(score*100).toFixed(0)}%)`
    : `${failed.length}/${checks.length} checks failed: ${failed.map(c => `${c.id}${c.hard ? " [HARD]" : ""}: ${c.details}`).join("; ")}`;

  return {
    pass: hardPass && score >= 0.7,
    score,
    reason,
    componentResults: checks.map(c => ({
      pass: c.pass,
      score: c.pass ? 1 : 0,
      reason: `[${c.id}] ${c.details}`,
      assertion: null,
    })),
  };
}

function wordCount(text) {
  if (typeof text !== "string") return 0;
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

function parseFlashcardYaml(text) {
  // Simple YAML parser for flashcard format — no external dependency
  // Handles: deck metadata + cards array
  if (!text || typeof text !== "string") return null;

  // Strip markdown code fences if present
  let yaml = text.replace(/^```(?:yaml|yml)?\s*\n?/gm, "").replace(/^```\s*$/gm, "").trim();

  // Find deck: and cards: sections
  try {
    const deckMatch = yaml.match(/^deck:\s*\n([\s\S]*?)(?=^cards:)/m)
      || yaml.match(/^deck:\s*\n([\s\S]*)/m);
    const cardsMatch = yaml.match(/^cards:\s*\n([\s\S]*)/m);

    if (!deckMatch && !cardsMatch) return null;

    const deck = deckMatch ? parseDeckBlock(deckMatch[1]) : {};
    const cards = cardsMatch ? parseCardsBlock(cardsMatch[1]) : [];

    if (cards.length === 0 && !deckMatch) return null;

    return { deck, cards };
  } catch {
    return null;
  }
}

function parseDeckBlock(block) {
  const deck = {};
  const lines = block.split("\n");
  for (const line of lines) {
    const m = line.match(/^\s{2}(\w+):\s*(.+)/);
    if (m) {
      let val = m[2].trim().replace(/^["']|["']$/g, "");
      if (m[1] === "version") val = Number(val);
      if (m[1] === "tags") val = parseInlineArray(m[2]);
      deck[m[1]] = val;
    }
  }
  return deck;
}

function parseCardsBlock(block) {
  const cards = [];
  const cardChunks = block.split(/^\s{2}- /m).filter(Boolean);

  for (const chunk of cardChunks) {
    const card = {};
    const lines = ("- " + chunk).split("\n");

    for (const line of lines) {
      const m = line.match(/^\s*-?\s*(\w+):\s*(.*)/);
      if (m) {
        const key = m[1];
        let val = m[2].trim().replace(/^["']|["']$/g, "");
        if (key === "tags") val = parseInlineArray(m[2]);
        else if (key === "version") val = Number(val);
        card[key] = val;
      }
    }

    if (card.id || card.front) cards.push(card);
  }

  return cards;
}

function parseInlineArray(text) {
  const m = text.match(/\[([^\]]*)\]/);
  if (!m) return [];
  return m[1].split(",").map(s => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
}
