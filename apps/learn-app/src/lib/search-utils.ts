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
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching to handle typos and near-matches
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

  // Fill matrix
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
    script.src = 'https://unpkg.com/lunr@2.3.9/lunr.min.js';
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

/**
 * Perform a search query using the loaded index
 * Uses Lunr.js if available, otherwise falls back to simple text search
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

        // Enable fuzzy search with ~ for typo tolerance (allows 2 edits by default)
        // Also enable wildcard * for partial word matching
        const fuzzyQuery = query
          .trim()
          .split(/\s+/)
          .filter((term) => term.length > 0)
          .map((term) => {
            // For short terms (<4 chars), use exact match or 1 edit
            // For longer terms, allow 2 edits (fuzzy matching)
            const edits = term.length < 4 ? 1 : 2;
            // Add wildcard at end for partial matching: term*~2
            return `${term}*~\${edits}`;
          })
          .join(' ');

        const searchResults = idx.search(fuzzyQuery);

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
        return results.slice(0, 8);
      } catch (error) {
        // Lunr search failed, fall back to simple search
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

    const titleLower = title.toLowerCase();
    const titleWords = titleLower.split(/\s+/);

    // Check each search term with fuzzy matching
    let hasMatch = false;
    let totalScore = 0;

    for (const term of searchTerms) {
      let termScore = 0;
      let termMatched = false;

      // 1. Exact match in title (highest priority)
      if (titleLower === term) {
        termScore += 100;
        termMatched = true;
      }

      // 2. Title starts with term (e.g., "agent" matches "agent factory")
      if (titleLower.startsWith(term)) {
        termScore += 50;
        termMatched = true;
      }

      // 3. Exact substring match in title
      if (titleLower.includes(term)) {
        termScore += 25;
        termMatched = true;
      }

      // 4. Match any word in title (exact word match)
      if (titleWords.some(word => word === term)) {
        termScore += 20;
        termMatched = true;
      }

      // 5. Partial word match in title (fuzzy partial)
      if (titleWords.some(word => word.startsWith(term) && word.length > term.length)) {
        termScore += 15;
        termMatched = true;
      }

      // 6. Fuzzy match: calculate Levenshtein distance for title words
      // Allow 1-2 character differences based on term length
      const maxEdits = Math.max(1, Math.floor(term.length / 3));
      for (const word of titleWords) {
        const distance = levenshteinDistance(term, word);
        if (distance <= maxEdits) {
          termScore += Math.max(5, 10 - distance * 2); // Higher score for closer matches
          termMatched = true;
          break;
        }
      }

      // 7. Match in breadcrumbs/content
      if (searchableText.includes(term)) {
        termScore += 5;
        termMatched = true;
      }

      // 8. Partial match in breadcrumbs
      const wordsInText = searchableText.split(/\s+/);
      if (wordsInText.some(word => word.startsWith(term) && word.length >= term.length)) {
        termScore += 2;
        termMatched = true;
      }

      if (termMatched) {
        totalScore += termScore;
        hasMatch = true;
      }
    }

    if (hasMatch) {
      results.push({
        title: title || url.split('/').pop() || 'Untitled',
        url: url,
        text: breadcrumbs.length > 0 ? breadcrumbs.join(' > ') : '',
        type: 'doc',
        score: totalScore,
      } as any);
    }
  });

  // Sort by relevance score (higher score first)
  results.sort((a: any, b: any) => {
    const aScore = (a as any).score || 0;
    const bScore = (b as any).score || 0;
    return bScore - aScore;
  });

  return results.slice(0, 8);
}
