/**
 * Build-time Anki .apkg generator.
 * Run: node apps/learn-app/scripts/generate-anki-decks.js
 *
 * Reads all .flashcards.yaml files, generates .apkg files + manifest.json
 * into apps/learn-app/static/flashcards/
 */

const path = require("path");
const fs = require("fs");
const {
  loadAllDecks,
} = require("../../../libs/docusaurus/shared/flashcardLoader");
const normalizeToDocId = require("../../../libs/docusaurus/shared/normalizeToDocId");
const siteConfig = require("../../../libs/docusaurus/shared/siteConfig");

// anki-apkg-export uses default export via babel
const createAnkiExport =
  require("anki-apkg-export").default || require("anki-apkg-export");

/**
 * Build source URL for a flashcard deck based on its co-located .md file.
 * @param {string} yamlPath - Absolute path to the .flashcards.yaml file
 * @param {string} docsDir  - Absolute path to the docs directory
 * @returns {string} Full URL to the lesson page
 */
function buildSourceUrl(yamlPath, docsDir) {
  // thesis.flashcards.yaml -> thesis.md
  const dir = path.dirname(yamlPath);
  const stem = path.basename(yamlPath).replace(".flashcards.yaml", "");
  const mdPath = path.join(dir, `${stem}.md`);
  const mdxPath = path.join(dir, `${stem}.mdx`);

  let route = "";

  // Check for frontmatter slug override
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
    // Compute from file path
    const relPath = path.relative(docsDir, yamlPath);
    const relNoExt = relPath.replace(".flashcards.yaml", "");
    route = normalizeToDocId(relNoExt);
  }

  // Compose full URL, preventing double slashes
  const base = siteConfig.baseUrl.endsWith("/")
    ? siteConfig.baseUrl
    : siteConfig.baseUrl + "/";
  const cleanRoute = route.replace(/^\/+/, "");
  return `${siteConfig.url}${base}docs/${cleanRoute}`;
}

async function main() {
  const docsDir = path.resolve(__dirname, "../docs");
  const outputDir = path.resolve(__dirname, "../static/flashcards");

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  const decks = loadAllDecks(docsDir);

  if (decks.length === 0) {
    console.log("No flashcard decks found.");
    return;
  }

  const manifest = {
    generated: new Date().toISOString(),
    decks: {},
  };

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
    const deckId = meta.id;
    const apkg = createAnkiExport(meta.title);

    for (const card of cards) {
      let backHtml = card.back;
      if (card.why) {
        backHtml += `<br><br><strong>Why?</strong> ${card.why}`;
      }

      const tags = card.tags || [];
      if (card.difficulty) {
        tags.push(`difficulty:${card.difficulty}`);
      }

      apkg.addCard(card.front, backHtml, { tags });
    }

    const zip = await apkg.save();
    const apkgPath = path.join(outputDir, `${deckId}.apkg`);
    fs.writeFileSync(apkgPath, zip, "binary");

    const sourceUrl = buildSourceUrl(filePath, docsDir);

    manifest.decks[deckId] = {
      apkgPath: `/flashcards/${deckId}.apkg`,
      title: meta.title,
      cardCount: cards.length,
      sourceUrl,
    };

    console.log(`  Generated: ${deckId}.apkg (${cards.length} cards)`);
  }

  const manifestPath = path.join(outputDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${manifestPath}`);
  console.log(`Generated ${decks.length} deck(s).`);

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
