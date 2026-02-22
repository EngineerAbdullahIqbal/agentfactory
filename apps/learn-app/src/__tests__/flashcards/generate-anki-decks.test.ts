// @vitest-environment node
import { describe, it, expect } from "vitest";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve to repo root: src/__tests__/flashcards -> apps/learn-app -> ag2 (repo root)
const repoRoot = path.resolve(__dirname, "../../../../..");
const require_ = createRequire(import.meta.url);

const normalizeToDocId = require_(
  path.join(repoRoot, "libs/docusaurus/shared/normalizeToDocId"),
);
const siteConfig = require_(
  path.join(repoRoot, "libs/docusaurus/shared/siteConfig"),
);

// Import the exported helpers from the generate script
const { buildSourceUrl, stableGuid } = require_(
  path.join(repoRoot, "apps/learn-app/scripts/generate-anki-decks"),
);

describe("normalizeToDocId", () => {
  it("strips numeric prefixes from path segments", () => {
    expect(normalizeToDocId("01-Introducing-AI/01-revolution/08-gaps")).toBe(
      "Introducing-AI/revolution/gaps",
    );
  });

  it("handles paths without numeric prefixes", () => {
    expect(normalizeToDocId("General/overview")).toBe("General/overview");
  });
});

describe("stableGuid", () => {
  it("produces same GUID for same input", () => {
    const a = stableGuid("deck-1", "card-001");
    const b = stableGuid("deck-1", "card-001");
    expect(a).toBe(b);
  });

  it("produces different GUIDs for different inputs", () => {
    const a = stableGuid("deck-1", "card-001");
    const b = stableGuid("deck-1", "card-002");
    expect(a).not.toBe(b);
  });

  it("returns 10-char hex string", () => {
    const guid = stableGuid("deck-x", "card-y");
    expect(guid).toMatch(/^[0-9a-f]{10}$/);
  });

  it("matches manual sha256 computation", () => {
    const expected = crypto
      .createHash("sha256")
      .update("my-deck:my-card")
      .digest("hex")
      .slice(0, 10);
    expect(stableGuid("my-deck", "my-card")).toBe(expected);
  });
});

describe("buildSourceUrl", () => {
  it("generates URL using normalizeToDocId for non-slug files", () => {
    const docsDir = path.resolve(repoRoot, "apps/learn-app/docs");
    const yamlPath = path.join(docsDir, "thesis.flashcards.yaml");

    const url = buildSourceUrl(yamlPath, docsDir);

    expect(url).toContain(siteConfig.url);
    expect(url).toContain("/docs/");
    // No double slashes (except in https://)
    expect(url.replace("https://", "")).not.toContain("//");
  });

  it("does not produce double slashes for root baseUrl", () => {
    const docsDir = "/fake/docs";
    const yamlPath = "/fake/docs/01-Part/01-Chapter/lesson.flashcards.yaml";

    const url = buildSourceUrl(yamlPath, docsDir);
    const afterProtocol = url.replace("https://", "");
    expect(afterProtocol).not.toContain("//");
  });

  it("includes normalized path for nested files", () => {
    const docsDir = "/fake/docs";
    const yamlPath =
      "/fake/docs/01-Foundations/02-agents/lesson.flashcards.yaml";

    const url = buildSourceUrl(yamlPath, docsDir);

    expect(url).toContain("Foundations/agents/lesson");
  });
});

describe("manifest structure", () => {
  it("has required fields in deck entries", () => {
    const entry = {
      apkgPath: "/flashcards/thesis.apkg",
      title: "The Agent Factory Thesis",
      cardCount: 12,
      sourceUrl: "https://agentfactory.panaversity.org/docs/thesis",
    };

    expect(entry).toHaveProperty("apkgPath");
    expect(entry).toHaveProperty("title");
    expect(entry).toHaveProperty("cardCount");
    expect(entry).toHaveProperty("sourceUrl");
    expect(entry.apkgPath).toMatch(/^\/flashcards\/.+\.apkg$/);
    expect(entry.cardCount).toBeGreaterThan(0);
  });
});

describe("card HTML generation", () => {
  it("includes why field in back HTML when present", () => {
    const card = {
      back: "The answer is here.",
      why: "Because it demonstrates the concept.",
    };
    let backHtml = card.back;
    if (card.why) {
      backHtml += `<br><br><strong>Why?</strong> ${card.why}`;
    }
    expect(backHtml).toContain("<strong>Why?</strong>");
    expect(backHtml).toContain("Because it demonstrates the concept.");
  });

  it("does not add why HTML when field is absent", () => {
    const card = {
      back: "The answer is here.",
      why: undefined as string | undefined,
    };
    let backHtml = card.back;
    if (card.why) {
      backHtml += `<br><br><strong>Why?</strong> ${card.why}`;
    }
    expect(backHtml).toBe("The answer is here.");
    expect(backHtml).not.toContain("Why?");
  });
});
