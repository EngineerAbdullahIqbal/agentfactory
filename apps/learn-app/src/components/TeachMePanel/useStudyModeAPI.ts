/**
 * useStudyModeAPI Hook
 *
 * Handles API calls to the study mode backend
 * Works with StudyModeContext for state management
 */

import { useCallback } from 'react';
import { useStudyMode, type Message, type ChatMode } from '../../contexts/StudyModeContext';
import { useLearnerProfile } from '../../contexts/LearnerProfileContext';
import type { ProfileResponse } from '../../lib/learner-profile-types';

// =============================================================================
// Types
// =============================================================================

interface LearnerProfileSummary {
  expertise_level?: string;
  communication_prefs?: {
    language_complexity?: string | null;
    verbosity?: string | null;
    tone?: string | null;
  };
  accessibility?: {
    screen_reader?: boolean;
    cognitive_load_preference?: string;
    dyslexia_friendly?: boolean;
  };
}

interface ChatRequest {
  lessonPath: string;
  userMessage: string;
  conversationHistory: Message[];
  mode: ChatMode;
  learnerProfile?: LearnerProfileSummary;
}

interface ChatResponse {
  assistantMessage: string;
  metadata: {
    model: string;
    tokensUsed: number;
    processingTimeMs: number;
  };
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

// =============================================================================
// API Configuration
// =============================================================================

// API base URL - can be configured via window variable or defaults to ChatKit server
const API_BASE_URL = typeof window !== 'undefined'
  ? (window as unknown as { __STUDY_MODE_API_URL__?: string }).__STUDY_MODE_API_URL__ || 'http://localhost:8000/api'
  : 'http://localhost:8000/api';

// =============================================================================
// Helpers
// =============================================================================

function buildProfileSummary(profile: ProfileResponse | null): LearnerProfileSummary | undefined {
  if (!profile) return undefined;
  return {
    expertise_level: profile.expertise?.programming?.level,
    communication_prefs: {
      language_complexity: profile.communication?.language_complexity,
      verbosity: profile.communication?.verbosity,
      tone: profile.communication?.tone,
    },
    accessibility: {
      screen_reader: profile.accessibility?.screen_reader,
      cognitive_load_preference: profile.accessibility?.cognitive_load_preference,
      dyslexia_friendly: profile.accessibility?.dyslexia_friendly,
    },
  };
}

// =============================================================================
// Hook
// =============================================================================

export function useStudyModeAPI() {
  const {
    mode,
    getCurrentConversation,
    addMessage,
    setLoading,
    setError,
  } = useStudyMode();
  const { profile } = useLearnerProfile();

  /**
   * Send a message to the AI and get a response
   * @param lessonPath - The lesson path for API context
   * @param userMessage - The user's message
   * @param conversationKey - Optional key for storing conversation (defaults to lessonPath)
   * @param overrideMode - Optional mode override (use when mode state may not be updated yet)
   */
  const sendMessage = useCallback(async (
    lessonPath: string,
    userMessage: string,
    conversationKey?: string,
    overrideMode?: ChatMode
  ): Promise<void> => {
    // Use conversationKey for storage, defaults to lessonPath for backward compatibility
    const storageKey = conversationKey || lessonPath;

    // Use override mode if provided (for when React state hasn't updated yet)
    const effectiveMode = overrideMode || mode;

    // Get current conversation history
    const conversation = getCurrentConversation(storageKey);

    // Create user message
    const userMsg: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };

    // Add user message to conversation immediately
    addMessage(storageKey, userMsg);

    // Prepare request (include learner profile if available)
    const learnerProfile = buildProfileSummary(profile);
    const request: ChatRequest = {
      lessonPath,
      userMessage,
      conversationHistory: conversation.messages,
      mode: effectiveMode,
      ...(learnerProfile && { learnerProfile }),
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json() as ErrorResponse;
        throw new Error(errorData.error?.message || `Request failed: ${response.status}`);
      }

      const data = await response.json() as ChatResponse;

      // Add assistant message to conversation
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.assistantMessage,
        timestamp: new Date().toISOString(),
      };

      addMessage(storageKey, assistantMsg);
      setLoading(false);

    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'An unexpected error occurred. Please try again.';

      setError(errorMessage);
      setLoading(false);
    }
  }, [mode, profile, getCurrentConversation, addMessage, setLoading, setError]);

  return {
    sendMessage,
  };
}
