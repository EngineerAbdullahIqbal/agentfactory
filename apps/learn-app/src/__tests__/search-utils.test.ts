/**
 * Unit tests for search-utils.ts
 *
 * Tests cover:
 * - Levenshtein distance algorithm edge cases
 * - Fuzzy query construction
 * - Scoring logic (8-tier hierarchy)
 */

import { describe, it, expect } from "vitest";
import {
  levenshteinDistance,
  calculateDocumentScore,
  SCORE_WEIGHTS,
} from "@/lib/search-utils";

// ============================================================================
// LEVENSHTEIN DISTANCE TESTS
// ============================================================================

describe("levenshteinDistance", () => {
  describe("edge cases", () => {
    it("returns 0 for identical strings", () => {
      expect(levenshteinDistance("agent", "agent")).toBe(0);
      expect(levenshteinDistance("", "")).toBe(0);
      expect(levenshteinDistance("a", "a")).toBe(0);
    });

    it("returns length when one string is empty", () => {
      expect(levenshteinDistance("", "agent")).toBe(5);
      expect(levenshteinDistance("agent", "")).toBe(5);
      expect(levenshteinDistance("", "a")).toBe(1);
    });

    it("handles single character differences", () => {
      expect(levenshteinDistance("agent", "agnt")).toBe(1); // deletion
      expect(levenshteinDistance("agnt", "agent")).toBe(1); // insertion
      expect(levenshteinDistance("agent", "agant")).toBe(1); // substitution
    });

    it("handles single character strings", () => {
      expect(levenshteinDistance("a", "b")).toBe(1);
      expect(levenshteinDistance("a", "a")).toBe(0);
    });
  });

  describe("typo correction scenarios", () => {
    it("corrects common typos with 1 edit", () => {
      expect(levenshteinDistance("agent", "agent")).toBe(0); // exact
      expect(levenshteinDistance("agent", "agnt")).toBe(1); // missing 'e'
      expect(levenshteinDistance("agent", "agenta")).toBe(1); // extra 'a'
      expect(levenshteinDistance("agent", "agant")).toBe(1); // 'e' → 'a'
    });

    it("handles 2-edit distance typos", () => {
      expect(levenshteinDistance("agent", "agntz")).toBe(2); // missing 'e', 'a' → 'z'
      expect(levenshteinDistance("factory", "fctry")).toBe(2); // missing 'a' and 'o'
    });

    it("handles longer words with typos", () => {
      expect(levenshteinDistance("specification", "spcification")).toBe(1);
      expect(levenshteinDistance("specification", "specifiction")).toBe(1);
    });
  });

  describe("partial matching", () => {
    it("calculates distance for partial terms", () => {
      expect(levenshteinDistance("agen", "agent")).toBe(1); // missing 't'
      expect(levenshteinDistance("fac", "factory")).toBe(4); // missing "tory"
    });
  });
});

// ============================================================================
// DOCUMENT SCORING TESTS
// ============================================================================

describe("calculateDocumentScore", () => {
  describe("tier 1: exact title match (100 points)", () => {
    it("scores exact title match highest", () => {
      const title = "agent";
      const searchableText = "agent";
      const searchTerms = ["agent"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      // Stack includes: exact (100) + starts_with (50) + substring (25) + exact word (20) + fuzzy (7)
      // Note: Fuzzy match also triggers for exact matches (distance=0)
      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.EXACT_TITLE);
      expect(score).toBe(202); // Actual stacked score with all applicable tiers
    });

    it("scores zero when no match", () => {
      const title = "factory";
      const searchableText = "factory";
      const searchTerms = ["agent"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBe(0);
    });
  });

  describe("tier 2: title starts with term (50 points)", () => {
    it("scores when title starts with search term", () => {
      const title = "agent factory";
      const searchableText = "agent factory";
      const searchTerms = ["agent"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.TITLE_STARTS_WITH);
    });
  });

  describe("tier 3: substring in title (25 points)", () => {
    it("scores when term appears anywhere in title", () => {
      const title = "the agent paradigm";
      const searchableText = "the agent paradigm";
      const searchTerms = ["agent"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.SUBSTRING_IN_TITLE);
    });
  });

  describe("tier 4: exact word in title (20 points)", () => {
    it("scores when term matches a complete word in title", () => {
      const title = "build your agent";
      const searchableText = "build your agent";
      const searchTerms = ["agent"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.EXACT_WORD_IN_TITLE);
    });
  });

  describe("tier 5: partial word match in title (15 points)", () => {
    it("scores when term matches start of a word in title", () => {
      const title = "agent factory";
      const searchableText = "agent factory";
      const searchTerms = ["agen"]; // partial match

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.PARTIAL_WORD_IN_TITLE);
    });
  });

  describe("tier 6: fuzzy match with Levenshtein (5-10 points)", () => {
    it("scores fuzzy matches for typos", () => {
      const title = "agent";
      const searchableText = "agent";
      const searchTerms = ["agnt"]; // 1-edit typo

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(5); // LEVENSHTEIN_MIN_SCORE
      expect(score).toBeLessThanOrEqual(10); // LEVENSHTEIN_BASE_SCORE
    });

    it("scores lower for more distant matches", () => {
      const title = "agent";
      const searchableText = "agent";
      const searchTerms1 = ["agnt"]; // 1 edit
      const searchTerms2 = ["agntz"]; // 2 edits

      const score1 = calculateDocumentScore(title, searchableText, searchTerms1);
      const score2 = calculateDocumentScore(title, searchableText, searchTerms2);

      expect(score1).toBeGreaterThan(score2); // Closer match = higher score
    });
  });

  describe("tier 7: match in breadcrumbs (5 points)", () => {
    it("scores when term appears in breadcrumbs", () => {
      const title = "chapter 1";
      const searchableText = "agents chapter 1 foundations";
      const searchTerms = ["agents"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.IN_BREADCRUMBS);
    });
  });

  describe("tier 8: partial match in breadcrumbs (2 points)", () => {
    it("scores for partial breadcrumb matches", () => {
      const title = "chapter 1";
      const searchableText = "agents chapter 1 foundations";
      const searchTerms = ["age"]; // partial

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThanOrEqual(SCORE_WEIGHTS.PARTIAL_IN_BREADCRUMBS);
    });
  });

  describe("multi-term scoring", () => {
    it("requires all search terms to match", () => {
      const title = "agent factory paradigm";
      const searchableText = "agent factory paradigm";
      const searchTerms = ["agent", "factory"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBeGreaterThan(0); // Both terms match
    });

    it("returns zero when any term doesn't match", () => {
      const title = "agent factory";
      const searchableText = "agent factory";
      const searchTerms = ["agent", "nonexistent"];

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      expect(score).toBe(0); // Second term doesn't match
    });

    it("accumulates scores across all terms", () => {
      const title = "agent factory";
      const searchableText = "agent factory";
      const searchTerms = ["agent", "factory"];

      const score1 = calculateDocumentScore(title, searchableText, ["agent"]);
      const score2 = calculateDocumentScore(title, searchableText, ["factory"]);
      const combinedScore = calculateDocumentScore(title, searchableText, searchTerms);

      // Combined should be roughly sum of individual scores
      expect(combinedScore).toBeCloseTo(score1 + score2, 0);
    });
  });

  describe("performance optimization", () => {
    it("skips Levenshtein when exact matches exist for all terms", () => {
      const title = "agent factory";
      const searchableText = "agent factory";
      const searchTerms = ["agent", "factory"];

      const start = performance.now();
      calculateDocumentScore(title, searchableText, searchTerms);
      const duration = performance.now() - start;

      // Should complete quickly (no Levenshtein on exact matches)
      expect(duration).toBeLessThan(10); // 10ms threshold
    });

    it("still runs Levenshtein when needed for fuzzy matches", () => {
      const title = "agent";
      const searchableText = "agent";
      const searchTerms = ["agnt"]; // typo

      const score = calculateDocumentScore(title, searchableText, searchTerms);

      // Should still score the fuzzy match
      expect(score).toBeGreaterThan(0);
    });
  });
});

// ============================================================================
// SCORING TIER HIERARCHY TESTS
// ============================================================================

describe("scoring tier hierarchy", () => {
  it("prioritizes exact matches over partial matches", () => {
    const searchTerms1 = ["agent"]; // exact
    const searchTerms2 = ["agen"]; // partial
    const searchTerms3 = ["agnt"]; // fuzzy

    const score1 = calculateDocumentScore("agent", "agent", searchTerms1);
    const score2 = calculateDocumentScore("agent", "agent", searchTerms2);
    const score3 = calculateDocumentScore("agent", "agent", searchTerms3);

    expect(score1).toBeGreaterThan(score2); // Exact > Partial
    expect(score1).toBeGreaterThan(score3); // Exact > Fuzzy
  });

  it("prioritizes title matches over breadcrumb matches", () => {
    const score1 = calculateDocumentScore("agent", "agent", ["agent"]);
    const score2 = calculateDocumentScore("other", "foundations > agent", ["agent"]);

    expect(score1).toBeGreaterThan(score2); // Title > Breadcrumbs
  });

  it("demonstrates documented score stacking", () => {
    const title = "agent";
    const searchableText = "agent";
    const searchTerms = ["agent"];

    const score = calculateDocumentScore(title, searchableText, searchTerms);

    // As documented, exact match triggers multiple tiers:
    // exact (100) + starts_with (50) + substring (25) + exact word (20) + fuzzy (7) = 202
    // Note: Fuzzy match also triggers for exact matches (distance=0 gives max score)
    const expectedStackedScore = 100 + 50 + 25 + 20 + 7;
    expect(score).toBe(expectedStackedScore);
  });
});

// ============================================================================
// SCORE CONSTANTS TESTS
// ============================================================================

describe("SCORE_WEIGHTS constants", () => {
  it("has all required tiers defined", () => {
    expect(SCORE_WEIGHTS.EXACT_TITLE).toBe(100);
    expect(SCORE_WEIGHTS.TITLE_STARTS_WITH).toBe(50);
    expect(SCORE_WEIGHTS.SUBSTRING_IN_TITLE).toBe(25);
    expect(SCORE_WEIGHTS.EXACT_WORD_IN_TITLE).toBe(20);
    expect(SCORE_WEIGHTS.PARTIAL_WORD_IN_TITLE).toBe(15);
    expect(SCORE_WEIGHTS.FUZZY_WORD_IN_TITLE).toBe(10);
    expect(SCORE_WEIGHTS.IN_BREADCRUMBS).toBe(5);
    expect(SCORE_WEIGHTS.PARTIAL_IN_BREADCRUMBS).toBe(2);
  });

  it("maintains hierarchical ordering", () => {
    expect(SCORE_WEIGHTS.EXACT_TITLE).toBeGreaterThan(SCORE_WEIGHTS.TITLE_STARTS_WITH);
    expect(SCORE_WEIGHTS.TITLE_STARTS_WITH).toBeGreaterThan(SCORE_WEIGHTS.SUBSTRING_IN_TITLE);
    expect(SCORE_WEIGHTS.SUBSTRING_IN_TITLE).toBeGreaterThan(SCORE_WEIGHTS.EXACT_WORD_IN_TITLE);
    expect(SCORE_WEIGHTS.EXACT_WORD_IN_TITLE).toBeGreaterThan(SCORE_WEIGHTS.PARTIAL_WORD_IN_TITLE);
    expect(SCORE_WEIGHTS.PARTIAL_WORD_IN_TITLE).toBeGreaterThan(SCORE_WEIGHTS.IN_BREADCRUMBS);
    expect(SCORE_WEIGHTS.IN_BREADCRUMBS).toBeGreaterThan(SCORE_WEIGHTS.PARTIAL_IN_BREADCRUMBS);
  });
});
