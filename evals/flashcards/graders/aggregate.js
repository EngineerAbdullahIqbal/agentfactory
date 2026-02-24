#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

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

function mean(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stddev(values) {
  if (values.length <= 1) {
    return 0;
  }
  const m = mean(values);
  const variance = mean(values.map((v) => (v - m) ** 2));
  return Math.sqrt(variance);
}

function loadResult(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return readJson(filePath);
  } catch {
    return null;
  }
}

function pct(num, den) {
  if (!den) {
    return 0;
  }
  return (num / den) * 100;
}

function pick(obj, keyPath, fallback = null) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object" || !(p in cur)) {
      return fallback;
    }
    cur = cur[p];
  }
  return cur;
}

function markdown(summary) {
  const lines = [];
  lines.push(`# Flashcards Skill Eval Summary`);
  lines.push("");
  lines.push(`- Run ID: ${summary.run_id}`);
  lines.push(`- Cases: ${summary.global.total_cases}`);
  lines.push(`- Trials: ${summary.global.total_trials}`);
  lines.push(`- Deterministic hard pass rate: ${summary.global.hard_pass_rate.toFixed(2)}%`);
  lines.push(`- pass@1: ${summary.global.pass_at_1_rate.toFixed(2)}%`);
  lines.push(`- pass@k: ${summary.global.pass_at_k_rate.toFixed(2)}%`);
  lines.push(`- pass^k: ${summary.global.pass_pow_k_rate.toFixed(2)}%`);
  lines.push(`- Deterministic mean score: ${summary.global.deterministic_mean.toFixed(2)}`);
  lines.push(`- LLM judge mean score: ${summary.global.llm_judge_mean.toFixed(2)}`);
  lines.push(`- Consistency score: ${summary.global.consistency_score.toFixed(2)}`);
  lines.push("");

  if (summary.baseline_diff) {
    lines.push(`## Baseline Diff`);
    lines.push("");
    lines.push(`- Baseline file: ${summary.baseline_diff.baseline_file}`);
    lines.push(`- Δ Deterministic mean: ${summary.baseline_diff.delta_deterministic_mean.toFixed(2)}`);
    lines.push(`- Δ LLM judge mean: ${summary.baseline_diff.delta_llm_judge_mean.toFixed(2)}`);
    lines.push(`- Δ pass@1: ${summary.baseline_diff.delta_pass_at_1_rate.toFixed(2)}%`);
    lines.push(`- Δ pass@k: ${summary.baseline_diff.delta_pass_at_k_rate.toFixed(2)}%`);
    lines.push(`- Δ pass^k: ${summary.baseline_diff.delta_pass_pow_k_rate.toFixed(2)}%`);
    lines.push("");
  }

  lines.push(`## Per-Case`);
  lines.push("");
  for (const c of summary.cases) {
    lines.push(`### ${c.case_id}`);
    lines.push(`- pass@1: ${c.pass_at_1 ? "PASS" : "FAIL"}`);
    lines.push(`- pass@k: ${c.pass_at_k ? "PASS" : "FAIL"}`);
    lines.push(`- pass^k: ${c.pass_pow_k ? "PASS" : "FAIL"}`);
    lines.push(`- deterministic mean: ${c.deterministic_mean.toFixed(2)} (stddev ${c.deterministic_stddev.toFixed(2)})`);
    lines.push(`- llm judge mean: ${c.llm_judge_mean.toFixed(2)}`);
    lines.push(`- recall ratio stddev: ${c.recall_ratio_stddev.toFixed(4)}`);
    if (c.failing_hard_checks.length) {
      lines.push(`- failing hard checks: ${c.failing_hard_checks.join(", ")}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv);
  const casesPath = args.cases;
  const manifestPath = args.manifest;
  const resultsDir = args["results-dir"];
  const runId = args["run-id"];
  const outputJson = args["output-json"];
  const outputMd = args["output-md"];
  const baselinePath = args.baseline || "";
  const caseFilterArg = args["case-filter"] || "";
  const repoRoot = path.resolve(args["repo-root"] || process.cwd());

  if (!casesPath || !manifestPath || !resultsDir || !runId || !outputJson || !outputMd) {
    console.error(
      "Usage: aggregate.js --cases <cases.json> --manifest <manifest.json> --results-dir <dir> --run-id <id> --output-json <file> --output-md <file> [--baseline <summary.json>] [--case-filter <id1,id2>] [--repo-root <root>]",
    );
    process.exit(1);
  }

  const dataset = readJson(path.resolve(repoRoot, casesPath));
  const manifest = readJson(path.resolve(repoRoot, manifestPath));
  const absResultsDir = path.resolve(repoRoot, resultsDir);
  const caseFilter = caseFilterArg
    ? new Set(
        caseFilterArg
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
      )
    : null;

  const caseSummaries = [];

  let totalTrials = 0;
  let hardPassTrials = 0;
  let passAt1Count = 0;
  let passAtKCount = 0;
  let passPowKCount = 0;

  const allDetScores = [];
  const allLlmScores = [];

  for (const caseDef of dataset.cases || []) {
    if (caseFilter && !caseFilter.has(caseDef.id)) {
      continue;
    }
    const caseId = caseDef.id;
    const trials = manifest.cases?.[caseId]?.trials || [];

    const trialDet = [];
    const trialLlm = [];
    const failingHardCheckNames = new Set();

    for (let i = 0; i < trials.length; i += 1) {
      const t = i + 1;
      totalTrials += 1;

      const detPath = path.join(absResultsDir, "deterministic", `${caseId}--t${t}.json`);
      const llmPath = path.join(absResultsDir, "llm", `${caseId}--t${t}.json`);

      const det = loadResult(detPath);
      const llm = loadResult(llmPath);

      if (det && det.deterministic) {
        trialDet.push(det.deterministic);
        allDetScores.push(Number(det.deterministic.deterministic_score_100) || 0);
        if (det.deterministic.hard_pass) {
          hardPassTrials += 1;
        } else {
          for (const chk of det.deterministic.checks || []) {
            if (chk.hard && !chk.pass) {
              failingHardCheckNames.add(chk.id);
            }
          }
        }
      } else {
        trialDet.push({
          hard_pass: false,
          deterministic_score_100: 0,
          checks: [
            { id: "missing_deterministic_result", hard: true, pass: false, weight: 0, details: "Missing result file" },
          ],
          stats: { recall_ratio: 0, thinking_ratio: 0 },
        });
        failingHardCheckNames.add("missing_deterministic_result");
      }

      if (llm && llm.llm_judge && !llm.llm_judge.skipped) {
        trialLlm.push(llm.llm_judge);
        allLlmScores.push(Number(llm.llm_judge.overall_score_100) || 0);
      }
    }

    const hardPassFlags = trialDet.map((d) => Boolean(d.hard_pass));
    const passAt1 = hardPassFlags[0] || false;
    const passAtK = hardPassFlags.some(Boolean);
    const passPowK = hardPassFlags.every(Boolean) && hardPassFlags.length > 0;

    if (passAt1) {
      passAt1Count += 1;
    }
    if (passAtK) {
      passAtKCount += 1;
    }
    if (passPowK) {
      passPowKCount += 1;
    }

    const detScores = trialDet.map((d) => Number(d.deterministic_score_100) || 0);
    const llmScores = trialLlm.map((l) => Number(l.overall_score_100) || 0);
    const recallRatios = trialDet.map((d) => Number(pick(d, "stats.recall_ratio", 0)) || 0);

    caseSummaries.push({
      case_id: caseId,
      trials: trials.length,
      pass_at_1: passAt1,
      pass_at_k: passAtK,
      pass_pow_k: passPowK,
      deterministic_mean: Number(mean(detScores).toFixed(2)),
      deterministic_stddev: Number(stddev(detScores).toFixed(2)),
      llm_judge_mean: Number(mean(llmScores).toFixed(2)),
      llm_judge_trials_scored: llmScores.length,
      recall_ratio_stddev: Number(stddev(recallRatios).toFixed(4)),
      failing_hard_checks: Array.from(failingHardCheckNames).sort(),
    });
  }

  const detStddevAvg = mean(caseSummaries.map((c) => c.deterministic_stddev));
  const recallStddevAvg = mean(caseSummaries.map((c) => c.recall_ratio_stddev));

  let consistencyScore = 100 - detStddevAvg * 2 - recallStddevAvg * 100;
  consistencyScore = Math.max(0, Math.min(100, consistencyScore));

  const summary = {
    run_id: runId,
    timestamp: new Date().toISOString(),
    dataset: path.relative(repoRoot, path.resolve(repoRoot, casesPath)),
    manifest: path.relative(repoRoot, path.resolve(repoRoot, manifestPath)),
    global: {
      total_cases: caseSummaries.length,
      total_trials: totalTrials,
      hard_pass_rate: Number(pct(hardPassTrials, totalTrials).toFixed(2)),
      pass_at_1_rate: Number(pct(passAt1Count, caseSummaries.length).toFixed(2)),
      pass_at_k_rate: Number(pct(passAtKCount, caseSummaries.length).toFixed(2)),
      pass_pow_k_rate: Number(pct(passPowKCount, caseSummaries.length).toFixed(2)),
      deterministic_mean: Number(mean(allDetScores).toFixed(2)),
      llm_judge_mean: Number(mean(allLlmScores).toFixed(2)),
      consistency_score: Number(consistencyScore.toFixed(2)),
      deterministic_stddev_avg: Number(detStddevAvg.toFixed(2)),
      recall_ratio_stddev_avg: Number(recallStddevAvg.toFixed(4)),
    },
    cases: caseSummaries,
    baseline_diff: null,
  };

  if (baselinePath) {
    const baselineAbs = path.resolve(repoRoot, baselinePath);
    if (fs.existsSync(baselineAbs)) {
      const base = readJson(baselineAbs);
      summary.baseline_diff = {
        baseline_file: path.relative(repoRoot, baselineAbs),
        baseline_run_id: base.run_id || null,
        delta_deterministic_mean: Number((summary.global.deterministic_mean - Number(base.global?.deterministic_mean || 0)).toFixed(2)),
        delta_llm_judge_mean: Number((summary.global.llm_judge_mean - Number(base.global?.llm_judge_mean || 0)).toFixed(2)),
        delta_pass_at_1_rate: Number((summary.global.pass_at_1_rate - Number(base.global?.pass_at_1_rate || 0)).toFixed(2)),
        delta_pass_at_k_rate: Number((summary.global.pass_at_k_rate - Number(base.global?.pass_at_k_rate || 0)).toFixed(2)),
        delta_pass_pow_k_rate: Number((summary.global.pass_pow_k_rate - Number(base.global?.pass_pow_k_rate || 0)).toFixed(2)),
      };
    }
  }

  const absOutJson = path.resolve(repoRoot, outputJson);
  const absOutMd = path.resolve(repoRoot, outputMd);
  fs.mkdirSync(path.dirname(absOutJson), { recursive: true });
  fs.mkdirSync(path.dirname(absOutMd), { recursive: true });

  fs.writeFileSync(absOutJson, JSON.stringify(summary, null, 2));
  fs.writeFileSync(absOutMd, markdown(summary));

  console.log(`Wrote summary JSON: ${outputJson}`);
  console.log(`Wrote summary Markdown: ${outputMd}`);

  if (summary.global.pass_pow_k_rate < 60 || summary.global.deterministic_mean < 85) {
    process.exitCode = 2;
  }
}

main();
