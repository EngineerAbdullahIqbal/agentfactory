/**
 * Search utilities for integrating with @easyops-cn/docusaurus-search-local
 *
 * The plugin creates search index files that we can load and search.
 */

export interface SearchResult {
  title: string;
  url: string;
  text?: string;
  type?: string;
  score?: number;
}

// ============================================================================
// CONSTANTS - Scoring Weights and Thresholds
// ============================================================================

/**
 * Scoring weights for different match types in fallback search
 *
 * NOTE: These scores are ADDITIVE, not exclusive. A single term match
 * can trigger multiple scoring tiers. For example, "agent" matching the
 * title "Agent" exactly will score:
 *   100 (exact title) + 50 (title starts with) + 25 (substring) + 20 (exact word) = 195
 *
 * This stacking is intentional: better matches accumulate higher scores naturally.
 */
export const SCORE_WEIGHTS = {
  EXACT_TITLE: 100,           // Title exactly equals the search term
  TITLE_STARTS_WITH: 50,      // Title starts with the search term
  SUBSTRING_IN_TITLE: 25,     // Term appears anywhere in title
  EXACT_WORD_IN_TITLE: 20,    // Term matches a complete word in title
  PARTIAL_WORD_IN_TITLE: 15,  // Term matches start of a word in title
  FUZZY_WORD_IN_TITLE: 10,    // Fuzzy match (Levenshtein) on title words
  IN_BREADCRUMBS: 5,          // Term appears in breadcrumbs
  PARTIAL_IN_BREADCRUMBS: 2,  // Partial match in breadcrumbs
} as const;

/**
 * Levenshtein scoring adjustments
 */
const LEVENSHTEIN_BASE_SCORE = 10;
const LEVENSHTEIN_DISTANCE_PENALTY = 2;
const LEVENSHTEIN_MIN_SCORE = 5;

/**
 * Edit distance thresholds for fuzzy matching
 */
const FUZZY_MAX_EDITS_SHORT_TERM = 1;      // Max edits for terms < 4 chars
const FUZZY_MAX_EDITS_LONG_TERM_DIVISOR = 3; // For longer terms: length/3
const FUZZY_SHORT_TERM_THRESHOLD = 4;      // Length threshold for "short" vs "long"

/**
 * Lunr.js configuration
 */
const LUNR_CDN_URL = 'https://unpkg.com/lunr@2.3.9/lunr.min.js';
const MAX_RESULTS = 8;

// ============================================================================
// LEVENSHTEIN DISTANCE ALGORITHM
// ============================================================================

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching to handle typos and near-matches
 *
 * @param a - First string
 * @param b - Second string
 * @returns The minimum number of single-character edits (insertions, deletions, or substitutions) required to change a into b
 *
 * @example
 * levenshteinDistance("kitten", "sitting") // returns 3
 * levenshteinDistance("agent", "agnt")     // returns 1
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix using dynamic programming
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// ============================================================================
// LUNR.JS LOADING
// ============================================================================

let searchIndex: any = null;
let searchIndexLoaded = false;
let lunrLoaded = false;

/**
 * Load Lunr.js library for full-text search
 */
async function loadLunr(): Promise<boolean> {
  if (lunrLoaded || (typeof window !== 'undefined' && (window as any).lunr)) {
    return true;
  }

  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    // Check if already loaded
    if ((window as any).lunr) {
      lunrLoaded = true;
      resolve(true);
      return;
    }

    // Load Lunr.js from CDN
    const script = document.createElement('script');
    script.src = LUNR_CDN_URL;
    script.onload = () => {
      lunrLoaded = true;
      resolve(true);
    };
    script.onerror = () => {
      console.warn('Failed to load Lunr.js, using simple search');
      resolve(false);
    };
    document.head.appendChild(script);
  });
}

// ============================================================================
// SEARCH INDEX LOADING
// ============================================================================

/**
 * Load the search index from the plugin's generated files
 * Note: Search index is only available in production builds, not in dev mode (npm start)
 * But it IS available when serving the build locally (npm run serve)
 */
async function loadSearchIndex(): Promise<any> {
  if (searchIndexLoaded && searchIndex) {
    return searchIndex;
  }

  try {
    const baseUrl = window.location.origin;
    const pathname = window.location.pathname;

    // Detect base path (e.g., /ai-native/)
    // Check if we're in a subpath by looking at the first segment
    let basePath = '';
    const pathSegments = pathname.split('/').filter(Boolean);

    // If first segment is NOT a known Docusaurus route, it's likely the basePath
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0];
      const knownRoutes = ['docs', 'blog', 'search', 'auth', 'api', 'code'];
      if (!knownRoutes.includes(firstSegment)) {
        basePath = `/${firstSegment}`;
      }
    }

    // Try different possible paths for the search index
    // The plugin puts search-index.json at the root of the build output
    const possiblePaths = [
      `${baseUrl}${basePath}/search-index.json`,
      `${baseUrl}/search-index.json`,
    ];

    for (const path of possiblePaths) {
      try {
        const response = await fetch(path, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            searchIndex = data;
            searchIndexLoaded = true;
            return data;
          }
        }
      } catch (e) {
        // Silently continue to next path
        continue;
      }
    }

    // If no index found, return null
    return null;
  } catch (error) {
    // Silently fail - search will be disabled
    return null;
  }
}

// ============================================================================
// LUNR.JS SEARCH WITH FUZZY MATCHING
// ============================================================================

/**
 * Build Lunr query clauses for a single search term with both wildcard and fuzzy matching
 *
 * NOTE: The syntax term*~2 does NOT work in Lunr.js query strings.
 * We must use the programmatic query() API to combine wildcard and fuzzy matching.
 *
 * @param lunr - The lunr global object
 * @param queryBuilder - The Lunr query builder
 * @param term - The search term to build clauses for
 */
function buildLunrQueryClauses(lunr: any, queryBuilder: any, term: string): void {
  // Determine edit distance based on term length
  const editDistance = term.length < FUZZY_SHORT_TERM_THRESHOLD
    ? FUZZY_MAX_EDITS_SHORT_TERM
    : Math.max(1, Math.floor(term.length / FUZZY_MAX_EDITS_LONG_TERM_DIVISOR));

  // 1. Exact match (highest precision)
  queryBuilder.term(term, {});

  // 2. Wildcard match for partial terms (e.g., "agen" matches "agent")
  queryBuilder.term(term, {
    wildcard: lunr.Query.wildcard.TRAILING,
    boost: 0.8,
  });

  // 3. Fuzzy match for typos (e.g., "agnt" matches "agent")
  queryBuilder.term(term, {
    editDistance,
    boost: 0.7,
  });

  // 4. Combined wildcard + fuzzy for maximum coverage
  // This handles cases like partial matches with typos
  queryBuilder.term(term, {
    wildcard: lunr.Query.wildcard.TRAILING,
    editDistance,
    boost: 0.5,
  });
}

// ============================================================================
// FALLBACK SEARCH WITH SCORING
// ============================================================================

/**
 * Calculate match score for a single document against search terms
 *
 * Uses an 8-tier scoring system where scores are ADDITIVE:
 * - Better matches naturally accumulate more points
 * - All search terms must match at least one tier for the document to be included
 *
 * PERFORMANCE: Short-circuits when an exact match is found to avoid
 * unnecessary Levenshtein calculations on large document sets.
 *
 * @param title - Document title
 * @param searchableText - Combined title and breadcrumbs
 * @param searchTerms - Array of lowercase search terms
 * @returns Total score (0 if no match)
 */
function calculateDocumentScore(
  title: string,
  searchableText: string,
  searchTerms: string[]
): number {
  const titleLower = title.toLowerCase();
  const titleWords = titleLower.split(/\s+/);

  // PERFORMANCE OPTIMIZATION:
  // If we find exact matches for all terms, skip Levenshtein entirely
  // This avoids expensive O(m×n) calculations when not needed
  const exactMatchCounts = new Map<number, boolean>();
  for (let i = 0; i < searchTerms.length; i++) {
    exactMatchCounts.set(i, false);
  }

  let totalScore = 0;
  let allTermsMatched = true;

  for (let termIndex = 0; termIndex < searchTerms.length; termIndex++) {
    const term = searchTerms[termIndex];
    let termScore = 0;
    let termMatched = false;

    // Tier 1: Exact match in title (highest priority)
    if (titleLower === term) {
      termScore += SCORE_WEIGHTS.EXACT_TITLE;
      termMatched = true;
      exactMatchCounts.set(termIndex, true);
    }

    // Tier 2: Title starts with term (e.g., "agent" matches "agent factory")
    if (titleLower.startsWith(term)) {
      termScore += SCORE_WEIGHTS.TITLE_STARTS_WITH;
      termMatched = true;
    }

    // Tier 3: Exact substring match in title
    if (titleLower.includes(term)) {
      termScore += SCORE_WEIGHTS.SUBSTRING_IN_TITLE;
      termMatched = true;
    }

    // Tier 4: Match any word in title (exact word match)
    if (titleWords.some(word => word === term)) {
      termScore += SCORE_WEIGHTS.EXACT_WORD_IN_TITLE;
      termMatched = true;
    }

    // Tier 5: Partial word match in title (fuzzy partial)
    if (titleWords.some(word => word.startsWith(term) && word.length > term.length)) {
      termScore += SCORE_WEIGHTS.PARTIAL_WORD_IN_TITLE;
      termMatched = true;
    }

    // Tier 6: Fuzzy match using Levenshtein distance
    // PERFORMANCE: Skip if we already have exact matches for all terms
    const hasExactMatches = Array.from(exactMatchCounts.values()).every(v => v);
    if (!hasExactMatches) {
      const maxEdits = Math.max(FUZZY_MAX_EDITS_SHORT_TERM, Math.floor(term.length / FUZZY_MAX_EDITS_LONG_TERM_DIVISOR));
      for (const word of titleWords) {
        const distance = levenshteinDistance(term, word);
        if (distance <= maxEdits) {
          // Score decreases as edit distance increases
          const fuzzyScore = Math.max(
            LEVENSHTEIN_MIN_SCORE,
            LEVENSHTEIN_BASE_SCORE - (distance * LEVENSHTEIN_DISTANCE_PENALTY)
          );
          termScore += fuzzyScore;
          termMatched = true;
          break;
        }
      }
    }

    // Tier 7: Match in breadcrumbs/content
    if (searchableText.includes(term)) {
      termScore += SCORE_WEIGHTS.IN_BREADCRUMBS;
      termMatched = true;
    }

    // Tier 8: Partial match in breadcrumbs
    const wordsInText = searchableText.split(/\s+/);
    if (wordsInText.some(word => word.startsWith(term) && word.length >= term.length)) {
      termScore += SCORE_WEIGHTS.PARTIAL_IN_BREADCRUMBS;
      termMatched = true;
    }

    if (termMatched) {
      totalScore += termScore;
    } else {
      allTermsMatched = false;
      break; // No need to continue if any term doesn't match
    }
  }

  return allTermsMatched ? totalScore : 0;
}

// ============================================================================
// MAIN SEARCH FUNCTION
// ============================================================================

/**
 * Perform a search query using the loaded index
 * Uses Lunr.js if available, otherwise falls back to simple text search
 *
 * @param query - The search query string
 * @returns Array of search results, sorted by relevance
 */
export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const index = await loadSearchIndex();
  if (!index) {
    // In dev mode, search index is not available (only generated during build)
    // Return empty results silently
    return [];
  }

  const searchTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  const results: SearchResult[] = [];

  // The plugin uses an array format: [{ documents: [...], index: {...} }]
  // We need to get documents and Lunr index from the array items
  let documents: any[] = [];
  let lunrIndex: any = null;

  if (Array.isArray(index)) {
    // The index is an array of language objects: [{ documents: [...], index: {...} }]
    // Get documents and Lunr index from first language object (usually 'en')
    const langObj = index.find((obj: any) => obj.documents) || index[0];
    if (langObj) {
      if (langObj.documents && Array.isArray(langObj.documents)) {
        documents = langObj.documents;
      }
      if (langObj.index) {
        lunrIndex = langObj.index;
      }
    }
  } else if (index.documents && Array.isArray(index.documents)) {
    documents = index.documents;
    lunrIndex = index.index;
  } else if (index.docs && Array.isArray(index.docs)) {
    documents = index.docs;
  }

  if (documents.length === 0) {
    return [];
  }

  // Try to use Lunr.js for full-text search with fuzzy matching
  if (lunrIndex) {
    const lunrAvailable = await loadLunr();

    if (
      lunrAvailable &&
      typeof window !== 'undefined' &&
      (window as any).lunr
    ) {
      try {
        const lunr = (window as any).lunr;
        const idx = lunr.Index.load(lunrIndex);

        // Use programmatic query API to combine wildcard and fuzzy matching
        // The query string approach "term*~2" does NOT work in Lunr.js
        const searchResults = idx.query((queryBuilder: any) => {
          for (const term of searchTerms) {
            buildLunrQueryClauses(lunr, queryBuilder, term);
          }
        });

        // Map Lunr results to our format
        searchResults.forEach((result: any) => {
          // result.ref is the document ID (string), match with doc.i (also string)
          const doc = documents.find(
            (d: any) => String(d.i) === String(result.ref)
          );
          if (doc) {
            const title = doc.t || '';
            const url = doc.u || '';
            // Breadcrumbs can be array or JSON string, parse if needed
            let breadcrumbs: string[] = [];
            if (Array.isArray(doc.b)) {
              breadcrumbs = doc.b;
            } else if (
              typeof doc.b === 'string' &&
              doc.b.trim().startsWith('[')
            ) {
              try {
                breadcrumbs = JSON.parse(doc.b);
              } catch (e) {
                breadcrumbs = [];
              }
            }

            results.push({
              title: title || url.split('/').pop() || 'Untitled',
              url: url,
              text: breadcrumbs.length > 0 ? breadcrumbs.join(' > ') : '',
              type: 'doc',
              score: result.score || 0,
            } as any);
          }
        });

        // Sort by score
        results.sort((a: any, b: any) => (b.score || 0) - (a.score || 0));
        return results.slice(0, MAX_RESULTS);
      } catch (error) {
        // Lunr search failed, fall back to simple search
        console.warn('Lunr search failed, falling back to simple search:', error);
      }
    }
  }

  // Fallback: Simple text search through title and breadcrumbs with fuzzy matching
  documents.forEach((doc: any) => {
    const title = doc.t || doc.title || '';
    const url = doc.u || doc.url || doc.href || '';
    // Breadcrumbs can be array or JSON string, parse if needed
    let breadcrumbs: string[] = [];
    if (Array.isArray(doc.b)) {
      breadcrumbs = doc.b;
    } else if (typeof doc.b === 'string' && doc.b.trim().startsWith('[')) {
      try {
        breadcrumbs = JSON.parse(doc.b);
      } catch (e) {
        breadcrumbs = [];
      }
    }

    // Combine title and breadcrumbs for searching
    const searchableText = [title, ...breadcrumbs]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const score = calculateDocumentScore(title, searchableText, searchTerms);

    if (score > 0) {
      results.push({
        title: title || url.split('/').pop() || 'Untitled',
        url: url,
        text: breadcrumbs.length > 0 ? breadcrumbs.join(' > ') : '',
        type: 'doc',
        score,
      } as any);
    }
  });

  // Sort by relevance score (higher score first)
  results.sort((a: any, b: any) => {
    const aScore = (a as any).score || 0;
    const bScore = (b as any).score || 0;
    return bScore - aScore;
  });

  return results.slice(0, MAX_RESULTS);
}

// ============================================================================
// EXPORTS FOR TESTING
// ============================================================================

/**
 * Export Levenshtein function for testing
 * @internal
 */
export { levenshteinDistance };

/**
 * Export score calculation function for testing
 * @internal
 */
export { calculateDocumentScore };
