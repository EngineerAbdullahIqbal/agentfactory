/**
 * Shared flashcard YAML loader.
 * Used by: remark-flashcards plugin, validate-flashcards script, generate-anki-decks script.
 */

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

/**
 * Load all flashcard decks from a docs directory.
 * @param {string} docsDir - Absolute path to the docs directory
 * @returns {Array<{filePath: string, deck: object}>}
 */
function loadAllDecks(docsDir) {
  const yamlFiles = fs.globSync("**/*.flashcards.yaml", {
    cwd: docsDir,
  }).map((rel) => path.resolve(docsDir, rel));

  return yamlFiles.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const deck = yaml.parse(content);
    return { filePath, deck };
  });
}

/**
 * Load a single flashcard deck co-located with an MD file.
 * @param {string} mdFilePath - Absolute path to the .md file
 * @returns {{filePath: string, deck: object} | null}
 */
function loadDeckForFile(mdFilePath) {
  // thesis.md → thesis.flashcards.yaml
  const dir = path.dirname(mdFilePath);
  const stem = path.basename(mdFilePath, path.extname(mdFilePath));
  const yamlPath = path.join(dir, `${stem}.flashcards.yaml`);

  if (!fs.existsSync(yamlPath)) {
    return null;
  }

  const content = fs.readFileSync(yamlPath, "utf-8");
  const deck = yaml.parse(content);
  return { filePath: yamlPath, deck };
}

module.exports = { loadAllDecks, loadDeckForFile };
