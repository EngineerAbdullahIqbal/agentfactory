#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
function loadYamlModule(repoRoot) {
  try {
    return require("yaml");
  } catch {
    const fallback = path.resolve(repoRoot, "apps/learn-app/node_modules/yaml");
    return require(fallback);
  }
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function safeWordCount(text) {
  if (typeof text !== "string") {
    return 0;
  }
  const cleaned = text.trim();
  if (!cleaned) {
    return 0;
  }
  return cleaned.split(/\s+/).length;
}

function isThinkingCard(card) {
  if (card && typeof card.why === "string" && card.why.trim()) {
    return true;
  }
  const front = String(card?.front || "");
  if (/\b(why|how)\b/i.test(front)) {
    return true;
  }
  return false;
}

function hasFormula(text) {
  if (typeof text !== "string") {
    return false;
  }
  return (
    /[=<>]/.test(text) ||
    /\b\d+(\.\d+)?\s*[+\-*/]\s*\d+(\.\d+)?\b/.test(text) ||
    /\b[A-Za-z][A-Za-z0-9_]*\s*=\s*/.test(text)
  );
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function check(condition, id, hard, weight, details) {
  return { id, pass: Boolean(condition), hard, weight, details: details || "" };
}

function sumWeights(checks, onlyPassed = false) {
  return checks
    .filter((c) => (onlyPassed ? c.pass : true))
    .reduce((acc, c) => acc + c.weight, 0);
}

function evaluateCase(caseDef, trialDef, repoRoot) {
  const yaml = loadYamlModule(repoRoot);
  const expected = caseDef.expected || {};
  const deckPaths = Array.isArray(trialDef?.deck_paths) ? trialDef.deck_paths : [];
  const checks = [];

  const shouldGenerate = Boolean(expected.should_generate);
  const expectedDecks = Number.isInteger(expected.target_decks)
    ? expected.target_decks
    : shouldGenerate
      ? 1
      : 0;

  checks.push(
    check(
      shouldGenerate ? deckPaths.length > 0 : deckPaths.length === 0,
      "generation_expectation_match",
      true,
      8,
      shouldGenerate
        ? `Expected decks but found ${deckPaths.length}`
        : `Expected no decks and found ${deckPaths.length}`,
    ),
  );

  checks.push(
    check(
      deckPaths.length === expectedDecks,
      "deck_count_matches_target",
      true,
      5,
      `Expected ${expectedDecks} deck(s), found ${deckPaths.length}`,
    ),
  );

  if (!shouldGenerate) {
    const totalWeight = sumWeights(checks);
    const passedWeight = sumWeights(checks, true);
    const deterministicScore = totalWeight === 0 ? 0 : Math.round((passedWeight / totalWeight) * 100);
    const hardPass = checks.every((c) => !c.hard || c.pass);

    return {
      hard_pass: hardPass,
      deterministic_score_100: deterministicScore,
      checks,
      stats: {
        deck_count: deckPaths.length,
        card_count_total: 0,
        recall_count: 0,
        thinking_count: 0,
        recall_ratio: 0,
        thinking_ratio: 0,
        formula_card_count: 0,
        relationship_card_count: 0,
      },
    };
  }

  const parsedDecks = [];
  const parseErrors = [];

  for (const relPath of deckPaths) {
    const absPath = path.resolve(repoRoot, relPath);
    if (!fs.existsSync(absPath)) {
      parseErrors.push(`Missing deck file: ${relPath}`);
      continue;
    }

    try {
      const raw = fs.readFileSync(absPath, "utf-8");
      const parsed = yaml.parse(raw);
      parsedDecks.push({ relPath, absPath, parsed });
    } catch (err) {
      parseErrors.push(`YAML parse error in ${relPath}: ${err.message}`);
    }
  }

  checks.push(
    check(
      parseErrors.length === 0,
      "yaml_parse_success",
      true,
      10,
      parseErrors.join(" | "),
    ),
  );

  const deckSchemaErrors = [];
  const cardFieldErrors = [];
  const cardIdPatternErrors = [];
  const localDupErrors = [];
  const globalDupErrors = [];
  const invalidDifficultyErrors = [];
  const missingTagsErrors = [];
  const yesNoBackErrors = [];
  const noQuestionMarkErrors = [];

  let totalCards = 0;
  let formulaCardCount = 0;
  let relationshipCardCount = 0;
  let recallCount = 0;
  let thinkingCount = 0;

  const globalCardIds = new Set();
  const frontBackSeen = new Set();
  let duplicateFrontBackCount = 0;
  let recallUnder40Count = 0;
  let recallTotalForLimit = 0;
  let thinkingHasWhyCount = 0;
  let thinkingTotalForWhy = 0;
  let recallNoWhyCount = 0;
  let recallTotalForNoWhy = 0;
  let thinkingWhyHowFrontCount = 0;

  for (const deck of parsedDecks) {
    const obj = deck.parsed;
    const deckObj = obj?.deck;
    const cards = obj?.cards;

    if (
      !deckObj ||
      typeof deckObj.id !== "string" ||
      typeof deckObj.title !== "string" ||
      typeof deckObj.description !== "string" ||
      !Array.isArray(deckObj.tags) ||
      typeof deckObj.version !== "number"
    ) {
      deckSchemaErrors.push(`Deck schema invalid in ${deck.relPath}`);
      continue;
    }

    if (!Array.isArray(cards)) {
      deckSchemaErrors.push(`Cards array missing in ${deck.relPath}`);
      continue;
    }

    const localIds = new Set();
    const deckMin = Number(expected.min_cards || 0);
    const deckMax = Number(expected.max_cards || Number.MAX_SAFE_INTEGER);

    if (cards.length < deckMin || cards.length > deckMax) {
      deckSchemaErrors.push(
        `${deck.relPath} has ${cards.length} cards outside range ${deckMin}-${deckMax}`,
      );
    }

    for (const card of cards) {
      totalCards += 1;

      const requiredFieldsPresent =
        card &&
        typeof card.id === "string" &&
        typeof card.front === "string" &&
        typeof card.back === "string" &&
        Array.isArray(card.tags) &&
        typeof card.difficulty === "string";

      if (!requiredFieldsPresent) {
        cardFieldErrors.push(`${deck.relPath} has card with missing required fields`);
        continue;
      }

      if (!card.front.trim().endsWith("?")) {
        noQuestionMarkErrors.push(`${deck.relPath}:${card.id} front should end with '?'`);
      }

      if (!localIds.has(card.id)) {
        localIds.add(card.id);
      } else {
        localDupErrors.push(`${deck.relPath}:${card.id}`);
      }

      if (!globalCardIds.has(card.id)) {
        globalCardIds.add(card.id);
      } else {
        globalDupErrors.push(`${deck.relPath}:${card.id}`);
      }

      const escapedDeckId = deckObj.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const prefixPattern = new RegExp(`^${escapedDeckId}-\\d{3}$`);
      if (!prefixPattern.test(card.id)) {
        cardIdPatternErrors.push(`${deck.relPath}:${card.id} should match ${deckObj.id}-NNN`);
      }

      if (!Array.isArray(card.tags) || card.tags.length < 1) {
        missingTagsErrors.push(`${deck.relPath}:${card.id} missing tags`);
      }

      if (!["basic", "intermediate", "advanced"].includes(card.difficulty)) {
        invalidDifficultyErrors.push(`${deck.relPath}:${card.id} has invalid difficulty`);
      }

      if (/^(yes|no)\b/i.test(card.back.trim())) {
        yesNoBackErrors.push(`${deck.relPath}:${card.id} back starts with Yes/No`);
      }

      const frontNorm = normalizeText(card.front);
      const backNorm = normalizeText(card.back);
      const pair = `${frontNorm}||${backNorm}`;
      if (!frontBackSeen.has(pair)) {
        frontBackSeen.add(pair);
      } else {
        duplicateFrontBackCount += 1;
      }

      const thinking = isThinkingCard(card);
      if (thinking) {
        thinkingCount += 1;
        thinkingTotalForWhy += 1;
        if (typeof card.why === "string" && card.why.trim()) {
          thinkingHasWhyCount += 1;
        }
        if (/\b(why|how)\b/i.test(card.front)) {
          thinkingWhyHowFrontCount += 1;
        }
      } else {
        recallCount += 1;
        recallTotalForNoWhy += 1;
        recallTotalForLimit += 1;
        if (!card.why) {
          recallNoWhyCount += 1;
        }
        if (safeWordCount(card.front) < 40) {
          recallUnder40Count += 1;
        }
      }

      if (hasFormula(card.front) || hasFormula(card.back)) {
        formulaCardCount += 1;
      }

      if (/\b(vs\.?|versus|compare|difference|relationship|leads to|because|tradeoff|trade-off)\b/i.test(`${card.front} ${card.back}`)) {
        relationshipCardCount += 1;
      }
    }
  }

  checks.push(check(deckSchemaErrors.length === 0, "deck_schema_valid", true, 8, deckSchemaErrors.join(" | ")));
  checks.push(check(cardFieldErrors.length === 0, "card_required_fields_present", true, 8, cardFieldErrors.join(" | ")));
  checks.push(check(cardIdPatternErrors.length === 0, "card_id_pattern_full_prefix", true, 8, cardIdPatternErrors.join(" | ")));
  checks.push(check(localDupErrors.length === 0, "card_id_unique_within_deck", true, 6, localDupErrors.join(" | ")));
  checks.push(check(globalDupErrors.length === 0, "card_id_unique_across_trial", true, 6, globalDupErrors.join(" | ")));
  checks.push(check(missingTagsErrors.length === 0, "tags_present_each_card", true, 4, missingTagsErrors.join(" | ")));
  checks.push(check(invalidDifficultyErrors.length === 0, "difficulty_values_valid", true, 4, invalidDifficultyErrors.join(" | ")));
  checks.push(check(yesNoBackErrors.length === 0, "back_not_yes_no", true, 6, yesNoBackErrors.join(" | ")));
  checks.push(check(noQuestionMarkErrors.length === 0, "fronts_end_with_question_mark", false, 3, noQuestionMarkErrors.join(" | ")));

  const recallRatio = totalCards === 0 ? 0 : recallCount / totalCards;
  const thinkingRatio = totalCards === 0 ? 0 : thinkingCount / totalCards;

  const recallMin = Number(expected.recall_ratio_min ?? 0);
  const recallMax = Number(expected.recall_ratio_max ?? 1);
  const thinkingMin = Number(expected.thinking_ratio_min ?? 0);
  const thinkingMax = Number(expected.thinking_ratio_max ?? 1);

  checks.push(
    check(
      recallRatio >= recallMin && recallRatio <= recallMax && thinkingRatio >= thinkingMin && thinkingRatio <= thinkingMax,
      "recall_thinking_balance",
      false,
      8,
      `recall_ratio=${recallRatio.toFixed(2)} thinking_ratio=${thinkingRatio.toFixed(2)} expected recall=${recallMin}-${recallMax} thinking=${thinkingMin}-${thinkingMax}`,
    ),
  );

  const recallUnder40Ratio = recallTotalForLimit === 0 ? 1 : recallUnder40Count / recallTotalForLimit;
  checks.push(
    check(
      recallUnder40Ratio >= 1,
      "recall_front_under_40_words",
      true,
      6,
      `recall_under_40_ratio=${recallUnder40Ratio.toFixed(2)}`,
    ),
  );

  const thinkingWhyRatio = thinkingTotalForWhy === 0 ? 0 : thinkingHasWhyCount / thinkingTotalForWhy;
  checks.push(
    check(
      thinkingWhyRatio >= 1,
      "thinking_cards_have_why",
      true,
      6,
      `thinking_with_why_ratio=${thinkingWhyRatio.toFixed(2)}`,
    ),
  );

  const recallNoWhyRatio = recallTotalForNoWhy === 0 ? 1 : recallNoWhyCount / recallTotalForNoWhy;
  checks.push(
    check(
      recallNoWhyRatio >= 1,
      "recall_cards_without_why",
      true,
      6,
      `recall_without_why_ratio=${recallNoWhyRatio.toFixed(2)}`,
    ),
  );

  const thinkingWhyHowRatio = thinkingCount === 0 ? 0 : thinkingWhyHowFrontCount / thinkingCount;
  const minWhyHowRatio = Number(expected.thinking_front_why_how_ratio_min ?? 0);
  checks.push(
    check(
      thinkingWhyHowRatio >= minWhyHowRatio,
      "thinking_fronts_why_or_how",
      false,
      5,
      `thinking_why_how_ratio=${thinkingWhyHowRatio.toFixed(2)} expected>=${minWhyHowRatio}`,
    ),
  );

  checks.push(
    check(
      duplicateFrontBackCount === 0,
      "no_duplicate_front_back_pairs",
      false,
      4,
      `duplicate_pairs=${duplicateFrontBackCount}`,
    ),
  );

  if (expected.require_formula_focus) {
    const minFormulaCards = Number(expected.min_formula_cards ?? 2);
    checks.push(
      check(
        formulaCardCount >= minFormulaCards,
        "formula_focus_coverage",
        true,
        6,
        `formula_cards=${formulaCardCount} expected>=${minFormulaCards}`,
      ),
    );
  } else {
    checks.push(
      check(true, "formula_focus_coverage", false, 2, `formula_cards=${formulaCardCount}`),
    );
  }

  if (expected.require_relationship_focus) {
    const minRelationshipCards = Number(expected.min_relationship_cards ?? 1);
    checks.push(
      check(
        relationshipCardCount >= minRelationshipCards,
        "relationship_focus_coverage",
        false,
        4,
        `relationship_cards=${relationshipCardCount} expected>=${minRelationshipCards}`,
      ),
    );
  } else {
    checks.push(
      check(true, "relationship_focus_coverage", false, 2, `relationship_cards=${relationshipCardCount}`),
    );
  }

  const totalWeight = sumWeights(checks);
  const passedWeight = sumWeights(checks, true);
  const deterministicScore = totalWeight === 0 ? 0 : Math.round((passedWeight / totalWeight) * 100);
  const hardPass = checks.every((c) => !c.hard || c.pass);

  return {
    hard_pass: hardPass,
    deterministic_score_100: deterministicScore,
    checks,
    stats: {
      deck_count: deckPaths.length,
      card_count_total: totalCards,
      recall_count: recallCount,
      thinking_count: thinkingCount,
      recall_ratio: Number(recallRatio.toFixed(4)),
      thinking_ratio: Number(thinkingRatio.toFixed(4)),
      formula_card_count: formulaCardCount,
      relationship_card_count: relationshipCardCount,
      thinking_why_how_ratio: Number(thinkingWhyHowRatio.toFixed(4)),
      duplicate_front_back_pairs: duplicateFrontBackCount,
    },
  };
}

function main() {
  const args = parseArgs(process.argv);
  const casesPath = args.cases;
  const manifestPath = args.manifest;
  const caseId = args["case-id"];
  const trialIndex = Number(args["trial-index"] || "1");
  const outputPath = args.output;
  const repoRoot = path.resolve(args["repo-root"] || process.cwd());

  if (!casesPath || !manifestPath || !caseId || !outputPath || !Number.isInteger(trialIndex) || trialIndex < 1) {
    console.error(
      "Usage: deterministic.js --cases <cases.json> --manifest <manifest.json> --case-id <id> --trial-index <n> --output <file> [--repo-root <root>]",
    );
    process.exit(1);
  }

  const dataset = readJson(path.resolve(repoRoot, casesPath));
  const manifest = readJson(path.resolve(repoRoot, manifestPath));

  const caseDef = (dataset.cases || []).find((c) => c.id === caseId);
  if (!caseDef) {
    console.error(`Case not found in dataset: ${caseId}`);
    process.exit(1);
  }

  const caseRuns = manifest.cases?.[caseId];
  if (!caseRuns || !Array.isArray(caseRuns.trials)) {
    console.error(`Case not found in manifest: ${caseId}`);
    process.exit(1);
  }

  const trialDef = caseRuns.trials[trialIndex - 1];
  if (!trialDef) {
    console.error(`Trial ${trialIndex} not found for case ${caseId}`);
    process.exit(1);
  }

  const evaluation = evaluateCase(caseDef, trialDef, repoRoot);
  const output = {
    timestamp: new Date().toISOString(),
    case_id: caseId,
    trial_index: trialIndex,
    manifest_run_id: manifest.run_id || null,
    deterministic: evaluation,
  };

  const absOutput = path.resolve(repoRoot, outputPath);
  fs.mkdirSync(path.dirname(absOutput), { recursive: true });
  fs.writeFileSync(absOutput, JSON.stringify(output, null, 2));

  console.log(`Wrote deterministic result: ${outputPath}`);
  if (!evaluation.hard_pass) {
    process.exitCode = 2;
  }
}

main();
