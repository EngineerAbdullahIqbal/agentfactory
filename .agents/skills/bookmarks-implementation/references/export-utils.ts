// apps/learn-app/src/utils/bookmarks/export.ts
// Template for export utilities

import { Bookmark } from '../../types/bookmarks';

/**
 * Export bookmarks to Markdown format
 * Groups by chapter → lesson → section
 */
export function exportToMarkdown(bookmarks: Bookmark[]): string {
  let md = '# My Bookmarks\n\n';
  md += `Generated: ${new Date().toISOString().split('T')[0]}\n\n`;
  md += `Total: ${bookmarks.length} bookmarks\n\n`;
  md += '---\n\n';
  
  // Group by chapter
  const byChapter = bookmarks.reduce((acc, b) => {
    if (!acc[b.chapterId]) acc[b.chapterId] = [];
    acc[b.chapterId].push(b);
    return acc;
  }, {} as Record<string, Bookmark[]>);
  
  for (const [chapterId, chapterBookmarks] of Object.entries(byChapter)) {
    md += `## ${chapterId}\n\n`;
    
    // Group by lesson within chapter
    const byLesson = chapterBookmarks.reduce((acc, b) => {
      if (!acc[b.lessonSlug]) acc[b.lessonSlug] = [];
      acc[b.lessonSlug].push(b);
      return acc;
    }, {} as Record<string, Bookmark[]>);
    
    for (const [lessonSlug, lessonBookmarks] of Object.entries(byLesson)) {
      md += `### ${lessonBookmarks[0].lessonTitle}\n\n`;
      
      for (const bookmark of lessonBookmarks) {
        md += `#### ${bookmark.sectionTitle}\n\n`;
        md += `${bookmark.contentPreview}\n\n`;
        md += `---\n\n`;
      }
    }
  }
  
  return md;
}

/**
 * Export bookmarks to JSON format
 * Matches BookmarksState schema for easy re-import
 */
export function exportToJson(bookmarks: Bookmark[]): string {
  return JSON.stringify({
    bookmarks,
    exportedAt: new Date().toISOString(),
    total: bookmarks.length,
  }, null, 2);
}

/**
 * Download file to user's computer
 */
export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Combined export function
 */
export function exportBookmarks(
  bookmarks: Bookmark[], 
  format: 'markdown' | 'json'
): void {
  const date = new Date().toISOString().split('T')[0];
  
  if (format === 'markdown') {
    const content = exportToMarkdown(bookmarks);
    downloadFile(content, `bookmarks-${date}.md`, 'text/markdown');
  } else {
    const content = exportToJson(bookmarks);
    downloadFile(content, `bookmarks-${date}.json`, 'application/json');
  }
}
