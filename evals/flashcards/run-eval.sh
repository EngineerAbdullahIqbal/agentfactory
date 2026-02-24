#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
GRADERS_DIR="$SCRIPT_DIR/graders"

CASES_PATH="evals/flashcards/datasets/cases.json"
MANIFEST_PATH="evals/flashcards/fixtures/manifests/fixture-baseline-v1.json"
RUN_ID="flashcards-eval-$(date +%Y%m%d-%H%M%S)"
WITH_LLM="auto" # auto|always|never
JUDGE_MODEL="haiku"
JUDGE_CMD=""
BASELINE_PATH=""
WRITE_BASELINE_PATH=""
ONLY_CASE=""
TRIALS_LIMIT=""
GRADE_LIVE=false

usage() {
  cat <<USAGE
Usage: evals/flashcards/run-eval.sh [options]

Options:
  --cases <path>            Dataset cases JSON (default: $CASES_PATH)
  --manifest <path>         Run manifest JSON (default: $MANIFEST_PATH)
  --run-id <id>             Run id label
  --grade-live              Use live dataset + live manifest automatically
  --with-llm <mode>         auto|always|never (default: $WITH_LLM)
  --judge-model <model>     LLM judge model (default: $JUDGE_MODEL)
  --judge-cmd <cmd>         Custom judge command that reads prompt from stdin
  --baseline <path>         Compare against summary JSON baseline
  --write-baseline <path>   Write current summary JSON to baseline path
  --only-case <case_id>     Evaluate only one case
  --trials <n>              Limit number of trials per case
  --help                    Show this help
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cases)
      CASES_PATH="$2"
      shift 2
      ;;
    --manifest)
      MANIFEST_PATH="$2"
      shift 2
      ;;
    --run-id)
      RUN_ID="$2"
      shift 2
      ;;
    --with-llm)
      WITH_LLM="$2"
      shift 2
      ;;
    --judge-model)
      JUDGE_MODEL="$2"
      shift 2
      ;;
    --judge-cmd)
      JUDGE_CMD="$2"
      shift 2
      ;;
    --baseline)
      BASELINE_PATH="$2"
      shift 2
      ;;
    --write-baseline)
      WRITE_BASELINE_PATH="$2"
      shift 2
      ;;
    --grade-live)
      GRADE_LIVE=true
      shift 1
      ;;
    --only-case)
      ONLY_CASE="$2"
      shift 2
      ;;
    --trials)
      TRIALS_LIMIT="$2"
      shift 2
      ;;
    --help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

if [[ "$GRADE_LIVE" == true ]]; then
  CASES_PATH="evals/flashcards/datasets/live-docs-2026-02-24.json"
  MANIFEST_PATH="evals/flashcards/fixtures/manifests/live-run-2026-02-24.json"
  if [[ "$RUN_ID" == flashcards-eval-* ]]; then
    RUN_ID="live-$(date +%Y%m%d-%H%M%S)"
  fi
fi

RESULTS_DIR="evals/flashcards/reports/$RUN_ID"
DET_DIR="$RESULTS_DIR/deterministic"
LLM_DIR="$RESULTS_DIR/llm"
SUMMARY_JSON="$RESULTS_DIR/summary.json"
SUMMARY_MD="$RESULTS_DIR/summary.md"

mkdir -p "$DET_DIR" "$LLM_DIR"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              Flashcards Skill Eval Harness                  ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Run ID: $RUN_ID"
echo "║  Cases:  $CASES_PATH"
echo "║  Manifest: $MANIFEST_PATH"
echo "║  LLM judge: $WITH_LLM"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

ABS_CASES_PATH="$REPO_ROOT/$CASES_PATH"
ABS_MANIFEST_PATH="$REPO_ROOT/$MANIFEST_PATH"

if [[ ! -f "$ABS_CASES_PATH" ]]; then
  echo "Missing cases file: $CASES_PATH"
  exit 1
fi

if [[ ! -f "$ABS_MANIFEST_PATH" ]]; then
  echo "Missing manifest file: $MANIFEST_PATH"
  exit 1
fi

if [[ "$WITH_LLM" != "auto" && "$WITH_LLM" != "always" && "$WITH_LLM" != "never" ]]; then
  echo "Invalid --with-llm mode: $WITH_LLM"
  exit 1
fi

if [[ "$WITH_LLM" == "always" && -z "$JUDGE_CMD" ]]; then
  if ! command -v claude >/dev/null 2>&1; then
    echo "--with-llm always requested, but claude CLI is unavailable and no --judge-cmd provided"
    exit 1
  fi
fi

if [[ "$WITH_LLM" == "auto" && -z "$JUDGE_CMD" ]]; then
  if command -v claude >/dev/null 2>&1; then
    LLM_ENABLED=true
  else
    LLM_ENABLED=false
  fi
elif [[ "$WITH_LLM" == "never" ]]; then
  LLM_ENABLED=false
else
  LLM_ENABLED=true
fi

CASE_IDS_RAW="$(node -e "const d=require(process.argv[1]); for(const c of (d.cases||[])){ console.log(c.id); }" "$ABS_CASES_PATH")"
IFS=$'\n' read -r -d '' -a CASE_IDS < <(printf '%s\0' "$CASE_IDS_RAW")
EVALUATED_CASE_IDS=()

for CASE_ID in "${CASE_IDS[@]}"; do
  if [[ -n "$ONLY_CASE" && "$CASE_ID" != "$ONLY_CASE" ]]; then
    continue
  fi

  TRIALS=$(node -e "const m=require(process.argv[1]); const id=process.argv[2]; console.log((m.cases?.[id]?.trials||[]).length);" "$ABS_MANIFEST_PATH" "$CASE_ID")

  if [[ -n "$TRIALS_LIMIT" ]]; then
    if [[ "$TRIALS_LIMIT" =~ ^[0-9]+$ ]] && [[ "$TRIALS_LIMIT" -ge 1 ]] && [[ "$TRIALS_LIMIT" -lt "$TRIALS" ]]; then
      TRIALS="$TRIALS_LIMIT"
    fi
  fi

  if [[ "$TRIALS" -eq 0 ]]; then
    echo "Skipping $CASE_ID: no trials in manifest"
    continue
  fi
  EVALUATED_CASE_IDS+=("$CASE_ID")

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Case: $CASE_ID"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  for ((T=1; T<=TRIALS; T++)); do
    DET_OUT="$DET_DIR/${CASE_ID}--t${T}.json"
    LLM_OUT="$LLM_DIR/${CASE_ID}--t${T}.json"

    echo "  Trial $T: deterministic checks"
    if node "$GRADERS_DIR/deterministic.js" \
      --cases "$CASES_PATH" \
      --manifest "$MANIFEST_PATH" \
      --case-id "$CASE_ID" \
      --trial-index "$T" \
      --output "$DET_OUT" \
      --repo-root "$REPO_ROOT"; then
      echo "    deterministic: PASS"
    else
      STATUS=$?
      if [[ "$STATUS" -eq 2 ]]; then
        echo "    deterministic: FAIL (hard gate)"
      else
        echo "    deterministic: ERROR (status $STATUS)"
      fi
    fi

    if [[ "$LLM_ENABLED" == true ]]; then
      echo "  Trial $T: llm judge"
      LLM_ARGS=(
        --cases "$CASES_PATH"
        --manifest "$MANIFEST_PATH"
        --case-id "$CASE_ID"
        --trial-index "$T"
        --output "$LLM_OUT"
        --model "$JUDGE_MODEL"
        --repo-root "$REPO_ROOT"
      )
      if [[ -n "$JUDGE_CMD" ]]; then
        LLM_ARGS+=(--judge-cmd "$JUDGE_CMD")
      fi

      if node "$GRADERS_DIR/llm-judge.js" "${LLM_ARGS[@]}"; then
        echo "    llm judge: PASS"
      else
        STATUS=$?
        if [[ "$STATUS" -eq 2 ]]; then
          echo "    llm judge: FAIL (critical criteria)"
        else
          echo "    llm judge: SKIP/ERROR (status $STATUS)"
        fi
      fi
    fi
  done
  echo ""
done

EFFECTIVE_MANIFEST_PATH="$RESULTS_DIR/effective-manifest.json"
EVALUATED_CASES_CSV="$(IFS=,; echo "${EVALUATED_CASE_IDS[*]}")"

node - <<EOF
const fs = require("fs");
const path = require("path");

const srcPath = path.resolve("$REPO_ROOT", "$MANIFEST_PATH");
const outPath = path.resolve("$REPO_ROOT", "$EFFECTIVE_MANIFEST_PATH");
const onlyCase = "$ONLY_CASE";
const trialsLimitRaw = "$TRIALS_LIMIT";
const selectedCsv = "$EVALUATED_CASES_CSV";

const src = JSON.parse(fs.readFileSync(srcPath, "utf-8"));
const out = {
  run_id: "$RUN_ID",
  description: "effective manifest derived from " + path.basename(srcPath),
  cases: {},
};

const selected = new Set(
  selectedCsv
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean),
);

const limit = /^\\d+$/.test(trialsLimitRaw) ? Number(trialsLimitRaw) : null;

for (const [caseId, caseDef] of Object.entries(src.cases || {})) {
  if (selected.size > 0 && !selected.has(caseId)) {
    continue;
  }
  if (onlyCase && caseId !== onlyCase) {
    continue;
  }
  const trials = Array.isArray(caseDef.trials) ? caseDef.trials : [];
  const sliced = limit && limit > 0 ? trials.slice(0, limit) : trials;
  out.cases[caseId] = { trials: sliced };
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
EOF

AGG_ARGS=(
  --cases "$CASES_PATH"
  --manifest "$EFFECTIVE_MANIFEST_PATH"
  --results-dir "$RESULTS_DIR"
  --run-id "$RUN_ID"
  --output-json "$SUMMARY_JSON"
  --output-md "$SUMMARY_MD"
  --repo-root "$REPO_ROOT"
)

if [[ -n "$BASELINE_PATH" ]]; then
  AGG_ARGS+=(--baseline "$BASELINE_PATH")
fi

if [[ "${#EVALUATED_CASE_IDS[@]}" -gt 0 ]]; then
  CASE_FILTER_CSV="$(IFS=,; echo "${EVALUATED_CASE_IDS[*]}")"
  AGG_ARGS+=(--case-filter "$CASE_FILTER_CSV")
fi

echo "Aggregating results..."
if node "$GRADERS_DIR/aggregate.js" "${AGG_ARGS[@]}"; then
  echo "Aggregation completed"
else
  STATUS=$?
  if [[ "$STATUS" -eq 2 ]]; then
    echo "Aggregation completed with threshold failures"
  else
    echo "Aggregation failed (status $STATUS)"
    exit "$STATUS"
  fi
fi

if [[ -n "$WRITE_BASELINE_PATH" ]]; then
  mkdir -p "$(dirname "$REPO_ROOT/$WRITE_BASELINE_PATH")"
  cp "$REPO_ROOT/$SUMMARY_JSON" "$REPO_ROOT/$WRITE_BASELINE_PATH"
  echo "Wrote baseline file: $WRITE_BASELINE_PATH"
fi

echo ""
echo "Summary JSON: $SUMMARY_JSON"
echo "Summary MD:   $SUMMARY_MD"
echo ""
node -e 'const s=require(process.argv[1]); console.log(`Global -> det_mean=${s.global.deterministic_mean} llm_mean=${s.global.llm_judge_mean} pass@1=${s.global.pass_at_1_rate}% pass@k=${s.global.pass_at_k_rate}% pass^k=${s.global.pass_pow_k_rate}%`);' "$REPO_ROOT/$SUMMARY_JSON"
