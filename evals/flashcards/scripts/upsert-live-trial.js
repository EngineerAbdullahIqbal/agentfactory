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

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function main() {
  const args = parseArgs(process.argv);
  const manifestPath = args.manifest;
  const caseId = args["case-id"];
  const trialIndex = Number(args["trial-index"] || "1");
  const deckPathsRaw = args["deck-paths"] || "";
  const runId = args["run-id"] || "live-run";
  const repoRoot = path.resolve(args["repo-root"] || process.cwd());

  if (!manifestPath || !caseId || !Number.isInteger(trialIndex) || trialIndex < 1) {
    console.error(
      "Usage: upsert-live-trial.js --manifest <manifest.json> --case-id <id> --trial-index <n> --deck-paths <comma-separated> [--run-id <id>] [--repo-root <root>]",
    );
    process.exit(1);
  }

  const absManifest = path.resolve(repoRoot, manifestPath);
  const deckPaths = deckPathsRaw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  let manifest;
  if (fs.existsSync(absManifest)) {
    manifest = readJson(absManifest);
  } else {
    manifest = {
      run_id: runId,
      description: "Live flashcard generation outputs",
      cases: {},
    };
  }

  if (!manifest.cases || typeof manifest.cases !== "object") {
    manifest.cases = {};
  }

  if (!manifest.cases[caseId]) {
    manifest.cases[caseId] = { trials: [] };
  }

  if (!Array.isArray(manifest.cases[caseId].trials)) {
    manifest.cases[caseId].trials = [];
  }

  while (manifest.cases[caseId].trials.length < trialIndex) {
    manifest.cases[caseId].trials.push({
      trial_id: manifest.cases[caseId].trials.length + 1,
      deck_paths: [],
      source: "live",
    });
  }

  manifest.cases[caseId].trials[trialIndex - 1] = {
    trial_id: trialIndex,
    deck_paths: deckPaths,
    source: "live",
    updated_at: new Date().toISOString(),
  };

  writeJson(absManifest, manifest);
  console.log(`Updated ${manifestPath} case=${caseId} trial=${trialIndex} decks=${deckPaths.length}`);
}

main();
