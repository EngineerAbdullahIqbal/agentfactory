/**
 * Build-time Anki .apkg generator.
 * Run: node apps/learn-app/scripts/generate-anki-decks.js
 *
 * Reads all .flashcards.yaml files, generates .apkg files + manifest.json
 * into apps/learn-app/static/flashcards/
 *
 * sql.js 0.5.0 (used by anki-apkg-export) has a fixed 16 MB WASM heap.
 * To avoid OOM after ~80 decks we process batches in child processes,
 * each of which gets a fresh heap.
 */

const path = require("path");
const fs = require("fs");
const { fork } = require("child_process");
const {
  loadAllDecks,
} = require("../../../libs/docusaurus/shared/flashcardLoader");
const normalizeToDocId = require("../../../libs/docusaurus/shared/normalizeToDocId");
const siteConfig = require("../../../libs/docusaurus/shared/siteConfig");

// How many decks each child process handles before we recycle.
const BATCH_SIZE = 40;

/* ------------------------------------------------------------------ */
/*  Card styling for Anki                                             */
/* ------------------------------------------------------------------ */

const ANKI_CSS = `
.card {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #1a1a2e;
  background: #fafafa;
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5em;
}

/* ---------- Front ---------- */
.af-front {
  text-align: center;
}
.af-front .af-question {
  font-size: 1.15em;
  font-weight: 500;
}
.af-front .af-badge {
  display: inline-block;
  margin-top: 1em;
  padding: 0.15em 0.7em;
  border-radius: 12px;
  font-size: 0.7em;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.af-badge--basic        { background: #e0f2e9; color: #1b7340; }
.af-badge--intermediate { background: #e0ecf8; color: #1a5296; }
.af-badge--advanced     { background: #fce8e6; color: #a8301a; }

/* ---------- Back ---------- */
.af-back .af-answer {
  font-size: 1.05em;
  text-align: left;
}
.af-back .af-why {
  margin-top: 1.2em;
  padding: 0.8em 1em;
  background: #f0edff;
  border-left: 3px solid #7c5cfc;
  border-radius: 4px;
  font-size: 0.9em;
  color: #3d2e7c;
  text-align: left;
}
.af-back .af-why strong {
  display: block;
  margin-bottom: 0.2em;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #5a45b0;
}
.af-back .af-source {
  margin-top: 1.4em;
  text-align: center;
  font-size: 0.75em;
  color: #888;
}
.af-back .af-source a {
  color: #7c5cfc;
  text-decoration: none;
}

/* ---------- Night mode ---------- */
.nightMode .card,
.night_mode .card {
  background: #1a1a2e;
  color: #e0e0e0;
}
.nightMode .af-badge--basic,
.night_mode .af-badge--basic        { background: #1b3d2a; color: #7ee0a8; }
.nightMode .af-badge--intermediate,
.night_mode .af-badge--intermediate { background: #1a2d4a; color: #7eb3e0; }
.nightMode .af-badge--advanced,
.night_mode .af-badge--advanced     { background: #3d1a1a; color: #e09090; }
.nightMode .af-back .af-why,
.night_mode .af-back .af-why {
  background: #2a2540;
  border-left-color: #9b7fff;
  color: #c8b8ff;
}
.nightMode .af-back .af-why strong,
.night_mode .af-back .af-why strong { color: #b8a0ff; }
.nightMode .af-back .af-source,
.night_mode .af-back .af-source     { color: #666; }
.nightMode .af-back .af-source a,
.night_mode .af-back .af-source a   { color: #9b7fff; }
`;

const ANKI_QUESTION_FMT = `<div class="af-front">{{Front}}</div>`;
const ANKI_ANSWER_FMT = [
  `<div class="af-front">{{Front}}</div>`,
  `<hr id="answer">`,
  `<div class="af-back">{{Back}}</div>`,
].join("\n");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Escape HTML special characters */
function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Convert \n in YAML strings to <br> for HTML rendering */
function nl2br(str) {
  return esc(str).replace(/\\n/g, "<br>");
}

/** Build styled HTML for the Front field */
function buildFrontHtml(card) {
  const diffClass = card.difficulty ? `af-badge--${card.difficulty}` : "";
  const badge = card.difficulty
    ? `<span class="af-badge ${diffClass}">${card.difficulty}</span>`
    : "";
  return `<div class="af-question">${nl2br(card.front)}</div>${badge}`;
}

/** Build styled HTML for the Back field */
function buildBackHtml(card, sourceUrl) {
  let html = `<div class="af-answer">${nl2br(card.back)}</div>`;

  if (card.why) {
    html += `<div class="af-why"><strong>Think deeper</strong>${nl2br(card.why)}</div>`;
  }

  if (sourceUrl) {
    html += `<div class="af-source"><a href="${esc(sourceUrl)}">View lesson on Agent Factory</a></div>`;
  }

  return html;
}

/* ------------------------------------------------------------------ */
/*  Source URL builder (unchanged logic)                               */
/* ------------------------------------------------------------------ */

/**
 * Build source URL for a flashcard deck based on its co-located .md file.
 * @param {string} yamlPath - Absolute path to the .flashcards.yaml file
 * @param {string} docsDir  - Absolute path to the docs directory
 * @returns {string} Full URL to the lesson page
 */
function buildSourceUrl(yamlPath, docsDir) {
  const dir = path.dirname(yamlPath);
  const stem = path.basename(yamlPath).replace(".flashcards.yaml", "");
  const mdPath = path.join(dir, `${stem}.md`);
  const mdxPath = path.join(dir, `${stem}.mdx`);

  let route = "";

  const actualMdPath = fs.existsSync(mdPath)
    ? mdPath
    : fs.existsSync(mdxPath)
      ? mdxPath
      : null;
  if (actualMdPath) {
    try {
      const content = fs.readFileSync(actualMdPath, "utf-8");
      const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
      if (fmMatch) {
        const slugMatch = fmMatch[1].match(/^slug:\s*(.+)$/m);
        if (slugMatch) {
          route = slugMatch[1].trim().replace(/^["']|["']$/g, "");
        }
      }
    } catch (err) {
      console.warn(
        `[generate-anki-decks] Could not read frontmatter from "${actualMdPath}", falling back to path-based URL: ${err.message}`,
      );
    }
  }

  if (!route) {
    const relPath = path.relative(docsDir, yamlPath);
    const relNoExt = relPath.replace(".flashcards.yaml", "");
    route = normalizeToDocId(relNoExt);
  }

  const base = siteConfig.baseUrl.endsWith("/")
    ? siteConfig.baseUrl
    : siteConfig.baseUrl + "/";
  const cleanRoute = route.replace(/^\/+/, "");
  return `${siteConfig.url}${base}docs/${cleanRoute}`;
}

/* ------------------------------------------------------------------ */
/*  Worker mode — entered when this script is forked with IPC          */
/* ------------------------------------------------------------------ */

if (process.env.__ANKI_WORKER__) {
  // anki-apkg-export uses default export via babel
  const createAnkiExport =
    require("anki-apkg-export").default || require("anki-apkg-export");

  process.on("message", async ({ items, outputDir }) => {
    const results = {};
    let skipped = 0;

    for (const { deckId, title, cards, sourceUrl } of items) {
      const apkg = createAnkiExport(title, {
        questionFormat: ANKI_QUESTION_FMT,
        answerFormat: ANKI_ANSWER_FMT,
        css: ANKI_CSS,
      });

      for (const card of cards) {
        const frontHtml = buildFrontHtml(card);
        const backHtml = buildBackHtml(card, sourceUrl);
        const tags = [...(card.tags || [])];
        if (card.difficulty) tags.push(`difficulty:${card.difficulty}`);
        apkg.addCard(frontHtml, backHtml, { tags });
      }

      const zip = await apkg.save();
      const apkgPath = path.join(outputDir, `${deckId}.apkg`);
      fs.writeFileSync(apkgPath, zip, "binary");

      results[deckId] = {
        apkgPath: `/flashcards/${deckId}.apkg`,
        title,
        cardCount: cards.length,
        sourceUrl,
      };

      console.log(`  Generated: ${deckId}.apkg (${cards.length} cards)`);
    }

    process.send({ results, skipped });
  });

  // Keep worker alive until parent disconnects
  return;
}

/* ------------------------------------------------------------------ */
/*  Main (orchestrator) — discovers decks, dispatches to workers       */
/* ------------------------------------------------------------------ */

function runBatch(items, outputDir) {
  return new Promise((resolve, reject) => {
    const child = fork(__filename, [], {
      env: { ...process.env, __ANKI_WORKER__: "1" },
      stdio: ["pipe", "inherit", "inherit", "ipc"],
    });

    child.on("message", (msg) => {
      child.disconnect();
      resolve(msg);
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0 && code !== null) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });

    child.send({ items, outputDir });
  });
}

async function main() {
  const docsDir = path.resolve(__dirname, "../docs");
  const outputDir = path.resolve(__dirname, "../static/flashcards");

  fs.mkdirSync(outputDir, { recursive: true });

  const decks = loadAllDecks(docsDir);

  if (decks.length === 0) {
    console.log("No flashcard decks found.");
    return;
  }

  // Pre-process: validate decks and resolve source URLs in the main process
  const validItems = [];
  let skipped = 0;

  for (const { filePath, deck } of decks) {
    if (!deck?.deck?.id || !Array.isArray(deck?.cards)) {
      console.error(
        `  Skipping ${filePath}: invalid deck structure (missing deck.id or cards array)`,
      );
      skipped++;
      continue;
    }
    const { deck: meta, cards } = deck;
    validItems.push({
      deckId: meta.id,
      title: meta.title,
      cards,
      sourceUrl: buildSourceUrl(filePath, docsDir),
    });
  }

  // Split into batches and process each in a fresh child process
  const manifest = {
    generated: new Date().toISOString(),
    decks: {},
  };

  for (let i = 0; i < validItems.length; i += BATCH_SIZE) {
    const batch = validItems.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(validItems.length / BATCH_SIZE);

    if (totalBatches > 1) {
      console.log(
        `\n  Batch ${batchNum}/${totalBatches} (${batch.length} decks)`,
      );
    }

    const { results } = await runBatch(batch, outputDir);
    Object.assign(manifest.decks, results);
  }

  const manifestPath = path.join(outputDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${manifestPath}`);
  console.log(`Generated ${validItems.length} deck(s).`);

  if (skipped > 0) {
    console.error(`\n${skipped} deck(s) skipped due to invalid structure.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Failed to generate Anki decks:", err);
  process.exit(1);
});

// Export for testing
module.exports = { buildSourceUrl };
