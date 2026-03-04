// apps/learn-app/src/hooks/useBookmarks.ts
// Template for Bookmarks hook - copy this structure

import { useState, useEffect, useCallback } from 'react';
import { Bookmark, BookmarksState, AddBookmarkParams } from '../types/bookmarks';
import { LocalStorageAdapter } from '../utils/bookmarks/storage-adapter';

interface UseBookmarksReturn {
  // Data
  bookmarks: Bookmark[];
  
  // Queries
  getBookmarkBySection: (sectionId: string) => Bookmark | undefined;
  isBookmarked: (sectionId: string) => boolean;
  getBookmarksByLesson: (lessonSlug: string) => Bookmark[];
  getBookmarksByChapter: (chapterId: string) => Bookmark[];
  searchBookmarks: (query: string) => Bookmark[];
  
  // Mutations
  addBookmark: (params: AddBookmarkParams) => Promise<Bookmark>;
  removeBookmark: (bookmarkId: string) => Promise<void>;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => Promise<void>;
  
  // State
  isLoading: boolean;
  error: Error | null;
}

const adapter = new LocalStorageAdapter();

export function useBookmarks(): UseBookmarksReturn {
  const [state, setState] = useState<BookmarksState>(() => ({
    schemaVersion: 1,
    bookmarks: {},
    lastSyncMs: null,
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load on mount
  useEffect(() => {
    adapter.load()
      .then((data) => {
        setState(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Save on change
  useEffect(() => {
    if (!isLoading) {
      adapter.save(state).catch((err) => setError(err));
    }
  }, [state, isLoading]);

  const addBookmark = useCallback(async (params: AddBookmarkParams): Promise<Bookmark> => {
    const bookmark: Bookmark = {
      id: `bm_${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...params,
      tags: [],
      note: null,
      version: 1,
    };
    
    setState((prev) => ({
      ...prev,
      bookmarks: {
        ...prev.bookmarks,
        [bookmark.id]: bookmark,
      },
    }));
    
    return bookmark;
  }, []);

  const removeBookmark = useCallback(async (bookmarkId: string) => {
    setState((prev) => {
      const { [bookmarkId]: removed, ...rest } = prev.bookmarks;
      return { ...prev, bookmarks: rest };
    });
  }, []);

  const isBookmarked = useCallback((sectionId: string) => {
    return Object.values(state.bookmarks).some(b => b.sectionId === sectionId);
  }, [state.bookmarks]);

  const getBookmarksByLesson = useCallback((lessonSlug: string) => {
    return Object.values(state.bookmarks).filter(b => b.lessonSlug === lessonSlug);
  }, [state.bookmarks]);

  const getBookmarksByChapter = useCallback((chapterId: string) => {
    return Object.values(state.bookmarks).filter(b => b.chapterId === chapterId);
  }, [state.bookmarks]);

  const searchBookmarks = useCallback((query: string) => {
    const q = query.toLowerCase();
    return Object.values(state.bookmarks).filter(
      b => b.sectionTitle.toLowerCase().includes(q) || 
           b.contentPreview.toLowerCase().includes(q) ||
           b.lessonTitle.toLowerCase().includes(q)
    );
  }, [state.bookmarks]);

  return {
    bookmarks: Object.values(state.bookmarks),
    getBookmarkBySection: (sectionId) => 
      Object.values(state.bookmarks).find(b => b.sectionId === sectionId),
    isBookmarked,
    getBookmarksByLesson,
    getBookmarksByChapter,
    searchBookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark: async (id, updates) => {
      setState((prev) => ({
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [id]: { ...prev.bookmarks[id], ...updates, updatedAt: Date.now() },
        },
      }));
    },
    isLoading,
    error,
  };
}
