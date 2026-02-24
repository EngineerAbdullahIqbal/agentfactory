#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

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

function extractFirstJson(text) {
  if (!text || typeof text !== "string") {
    return null;
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  const candidate = text.slice(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

function commandExists(cmd) {
  const result = spawnSync("sh", ["-lc", `command -v ${cmd}`], {
    encoding: "utf-8",
  });
  return result.status === 0;
}

const CRITERIA_KEYS = [
  "minimum_information_atomicity",
  "concise_explicit_questions_under_40",
  "self_contained_questions",
  "key_terms_coverage",
  "formula_accuracy_and_coverage",
  "relationships_and_mechanisms",
  "recall_card_quality",
  "understanding_card_depth",
  "why_how_front_quality",
  "half_recall_half_understanding_balance",
  "why_field_depth",
  "answer_precision_and_completeness",
  "source_grounding_no_hallucination",
  "non_redundancy_and_variety",
  "overall_study_value",
];

const CRITICAL_KEYS = [
  "minimum_information_atomicity",
  "concise_explicit_questions_under_40",
  "self_contained_questions",
  "understanding_card_depth",
  "half_recall_half_understanding_balance",
  "source_grounding_no_hallucination",
];

function normalizeCriteria(criteria) {
  const normalized = {};
  for (const key of CRITERIA_KEYS) {
    const raw = criteria && typeof criteria[key] === "object" ? criteria[key] : {};
    let score = Number(raw.score_10);
    if (!Number.isFinite(score)) {
      score = 0;
    }
    score = Math.max(0, Math.min(10, score));
    normalized[key] = {
      score_10: Number(score.toFixed(2)),
      rationale: typeof raw.rationale === "string" ? raw.rationale : "",
    };
  }
  return normalized;
}

function buildPrompt(caseDef, trialDef, lessonTexts, deckTexts) {
  const expected = caseDef.expected || {};

  return `You are grading flashcard quality for a skill-eval harness.

Grade the generated deck(s) against Sir Zia's stated intent and project constraints.

Sir Zia intent:
1) Recall prompt intent:
   - Minimum information principle (one question, one answer)
   - Questions concise but explicit (under 40 words)
   - Self-contained, atomic cards
   - Focus on key terms, formulas, and relationships
2) Understanding prompt intent:
   - Focus on understanding, not rote memorization
   - Use Why/How to encourage deeper thinking
3) Combined intent:
   - Generate from both prompt styles, half and half
4) Output format note:
   - This project stores cards as YAML decks; do NOT penalize because output is YAML.

Case metadata:
- case_id: ${caseDef.id}
- scenario: ${caseDef.scenario}
- should_generate: ${Boolean(expected.should_generate)}
- target_decks: ${expected.target_decks}
- recall_ratio_range: ${expected.recall_ratio_min}-${expected.recall_ratio_max}
- thinking_ratio_range: ${expected.thinking_ratio_min}-${expected.thinking_ratio_max}
- formula_focus_required: ${Boolean(expected.require_formula_focus)}
- relationship_focus_required: ${Boolean(expected.require_relationship_focus)}

Source lesson(s):
${lessonTexts}

Generated deck YAML(s):
${deckTexts}

Score each criterion from 0 to 10 with concise rationale.
Use strict grading. 10 means excellent and defensible.

Return ONLY valid JSON using this exact schema:
{
  "criteria": {
    "minimum_information_atomicity": {"score_10": <number>, "rationale": "..."},
    "concise_explicit_questions_under_40": {"score_10": <number>, "rationale": "..."},
    "self_contained_questions": {"score_10": <number>, "rationale": "..."},
    "key_terms_coverage": {"score_10": <number>, "rationale": "..."},
    "formula_accuracy_and_coverage": {"score_10": <number>, "rationale": "..."},
    "relationships_and_mechanisms": {"score_10": <number>, "rationale": "..."},
    "recall_card_quality": {"score_10": <number>, "rationale": "..."},
    "understanding_card_depth": {"score_10": <number>, "rationale": "..."},
    "why_how_front_quality": {"score_10": <number>, "rationale": "..."},
    "half_recall_half_understanding_balance": {"score_10": <number>, "rationale": "..."},
    "why_field_depth": {"score_10": <number>, "rationale": "..."},
    "answer_precision_and_completeness": {"score_10": <number>, "rationale": "..."},
    "source_grounding_no_hallucination": {"score_10": <number>, "rationale": "..."},
    "non_redundancy_and_variety": {"score_10": <number>, "rationale": "..."},
    "overall_study_value": {"score_10": <number>, "rationale": "..."}
  },
  "critical_failures": ["..."],
  "top_improvements": ["..."],
  "judge_notes": "..."
}`;
}

function runJudge(prompt, model, judgeCmd) {
  if (judgeCmd) {
    const res = spawnSync("sh", ["-lc", judgeCmd], {
      input: prompt,
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    });
    return {
      ok: res.status === 0,
      stdout: res.stdout || "",
      stderr: res.stderr || "",
      status: res.status,
    };
  }

  if (!commandExists("claude")) {
    return {
      ok: false,
      stdout: "",
      stderr: "claude CLI not found",
      status: 127,
    };
  }

  const res = spawnSync("claude", ["-p", "--model", model], {
    input: prompt,
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024,
  });

  return {
    ok: res.status === 0,
    stdout: res.stdout || "",
    stderr: res.stderr || "",
    status: res.status,
  };
}

function mean(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function main() {
  const args = parseArgs(process.argv);
  const casesPath = args.cases;
  const manifestPath = args.manifest;
  const caseId = args["case-id"];
  const trialIndex = Number(args["trial-index"] || "1");
  const outputPath = args.output;
  const repoRoot = path.resolve(args["repo-root"] || process.cwd());
  const model = args.model || "haiku";
  const judgeCmd = args["judge-cmd"] ? String(args["judge-cmd"]) : "";

  if (!casesPath || !manifestPath || !caseId || !outputPath || !Number.isInteger(trialIndex) || trialIndex < 1) {
    console.error(
      "Usage: llm-judge.js --cases <cases.json> --manifest <manifest.json> --case-id <id> --trial-index <n> --output <file> [--model <name>] [--judge-cmd <cmd>] [--repo-root <root>]",
    );
    process.exit(1);
  }

  const dataset = readJson(path.resolve(repoRoot, casesPath));
  const manifest = readJson(path.resolve(repoRoot, manifestPath));

  const caseDef = (dataset.cases || []).find((c) => c.id === caseId);
  if (!caseDef) {
    console.error(`Case not found: ${caseId}`);
    process.exit(1);
  }

  const trials = manifest.cases?.[caseId]?.trials;
  if (!Array.isArray(trials) || !trials[trialIndex - 1]) {
    console.error(`Trial ${trialIndex} missing for case ${caseId}`);
    process.exit(1);
  }

  const trialDef = trials[trialIndex - 1];
  const deckPaths = Array.isArray(trialDef.deck_paths) ? trialDef.deck_paths : [];
  const shouldGenerate = Boolean(caseDef.expected?.should_generate);

  const output = {
    timestamp: new Date().toISOString(),
    case_id: caseId,
    trial_index: trialIndex,
    manifest_run_id: manifest.run_id || null,
    llm_judge: {
      skipped: false,
      reason: "",
      model,
      criteria: {},
      critical_failures: [],
      top_improvements: [],
      judge_notes: "",
      overall_score_100: 0,
      critical_pass: false,
      raw_output_excerpt: "",
    },
  };

  if (!shouldGenerate) {
    output.llm_judge.skipped = true;
    output.llm_judge.reason = "Case expects no deck generation; deterministic trigger checks are authoritative.";
    const absOutput = path.resolve(repoRoot, outputPath);
    fs.mkdirSync(path.dirname(absOutput), { recursive: true });
    fs.writeFileSync(absOutput, JSON.stringify(output, null, 2));
    console.log(`Wrote LLM judge result: ${outputPath}`);
    return;
  }

  const lessonTexts = (caseDef.input?.source_lessons || [])
    .map((rel) => {
      const abs = path.resolve(repoRoot, rel);
      if (!fs.existsSync(abs)) {
        return `--- ${rel}\n[MISSING FILE]`;
      }
      return `--- ${rel}\n${fs.readFileSync(abs, "utf-8")}`;
    })
    .join("\n\n");

  const deckTexts = deckPaths
    .map((rel) => {
      const abs = path.resolve(repoRoot, rel);
      if (!fs.existsSync(abs)) {
        return `--- ${rel}\n[MISSING FILE]`;
      }
      return `--- ${rel}\n${fs.readFileSync(abs, "utf-8")}`;
    })
    .join("\n\n");

  const prompt = buildPrompt(caseDef, trialDef, lessonTexts, deckTexts);
  const judged = runJudge(prompt, model, judgeCmd);

  if (!judged.ok) {
    output.llm_judge.skipped = true;
    output.llm_judge.reason = `Judge command failed (status ${judged.status}): ${judged.stderr.trim().slice(0, 400)}`;
    output.llm_judge.raw_output_excerpt = (judged.stdout || "").slice(0, 500);

    const absOutput = path.resolve(repoRoot, outputPath);
    fs.mkdirSync(path.dirname(absOutput), { recursive: true });
    fs.writeFileSync(absOutput, JSON.stringify(output, null, 2));
    console.log(`Wrote LLM judge result: ${outputPath}`);
    return;
  }

  const parsed = extractFirstJson(judged.stdout);
  if (!parsed || typeof parsed !== "object") {
    output.llm_judge.skipped = true;
    output.llm_judge.reason = "Judge did not return parseable JSON";
    output.llm_judge.raw_output_excerpt = judged.stdout.slice(0, 1000);

    const absOutput = path.resolve(repoRoot, outputPath);
    fs.mkdirSync(path.dirname(absOutput), { recursive: true });
    fs.writeFileSync(absOutput, JSON.stringify(output, null, 2));
    console.log(`Wrote LLM judge result: ${outputPath}`);
    return;
  }

  const criteria = normalizeCriteria(parsed.criteria || {});
  const criterionScores = Object.values(criteria).map((item) => Number(item.score_10) || 0);
  const overall10 = mean(criterionScores);
  const overall100 = Number((overall10 * 10).toFixed(2));

  const criticalPass = CRITICAL_KEYS.every((key) => criteria[key].score_10 >= 8.0) && overall100 >= 82;

  output.llm_judge.criteria = criteria;
  output.llm_judge.critical_failures = Array.isArray(parsed.critical_failures)
    ? parsed.critical_failures.slice(0, 10)
    : [];
  output.llm_judge.top_improvements = Array.isArray(parsed.top_improvements)
    ? parsed.top_improvements.slice(0, 10)
    : [];
  output.llm_judge.judge_notes = typeof parsed.judge_notes === "string" ? parsed.judge_notes : "";
  output.llm_judge.overall_score_100 = overall100;
  output.llm_judge.critical_pass = criticalPass;
  output.llm_judge.raw_output_excerpt = judged.stdout.slice(0, 1000);

  const absOutput = path.resolve(repoRoot, outputPath);
  fs.mkdirSync(path.dirname(absOutput), { recursive: true });
  fs.writeFileSync(absOutput, JSON.stringify(output, null, 2));
  console.log(`Wrote LLM judge result: ${outputPath}`);

  if (!criticalPass) {
    process.exitCode = 2;
  }
}

main();
