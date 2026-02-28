/**
 * useStudyModeAPI Hook
 *
 * Handles API calls to the study mode backend
 * Works with StudyModeContext for state management
 */

import { useCallback, useMemo } from "react";
import {
  useStudyMode,
  type Message,
  type ChatMode,
} from "../../contexts/StudyModeContext";
import { useLearnerProfile } from "../../contexts/LearnerProfileContext";
import type { ProfileResponse } from "../../lib/learner-profile-types";
import {
  buildProfileSummary,
  type LearnerProfileSummary,
} from "../../lib/buildProfileSummary";

// =============================================================================
// Types
// =============================================================================

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
const API_BASE_URL =
  typeof window !== "undefined"
    ? (window as unknown as { __STUDY_MODE_API_URL__?: string })
        .__STUDY_MODE_API_URL__ || "http://localhost:8000/api"
    : "http://localhost:8000/api";

// =============================================================================
// Helpers
// =============================================================================

// =============================================================================
// Hook
// =============================================================================

export function useStudyModeAPI() {
  const { mode, getCurrentConversation, addMessage, setLoading, setError } =
    useStudyMode();
  const { profile } = useLearnerProfile();

  // Memoize profile summary — recomputed only when profile changes, not per message
  const learnerProfileSummary = useMemo(
    () => buildProfileSummary(profile),
    [profile],
  );

  /**
   * Send a message to the AI and get a response
   * @param lessonPath - The lesson path for API context
   * @param userMessage - The user's message
   * @param conversationKey - Optional key for storing conversation (defaults to lessonPath)
   * @param overrideMode - Optional mode override (use when mode state may not be updated yet)
   */
  const sendMessage = useCallback(
    async (
      lessonPath: string,
      userMessage: string,
      conversationKey?: string,
      overrideMode?: ChatMode,
    ): Promise<void> => {
      // Use conversationKey for storage, defaults to lessonPath for backward compatibility
      const storageKey = conversationKey || lessonPath;

      // Use override mode if provided (for when React state hasn't updated yet)
      const effectiveMode = overrideMode || mode;

      // Get current conversation history
      const conversation = getCurrentConversation(storageKey);

      // Create user message
      const userMsg: Message = {
        role: "user",
        content: userMessage,
        timestamp: new Date().toISOString(),
      };

      // Add user message to conversation immediately
      addMessage(storageKey, userMsg);

      // Prepare request (include learner profile if available)
      // WARNING: Profile fields contain user-provided freetext that may include prompt injection.
      // The consuming API MUST use the sandwich pattern: system instructions ABOVE and BELOW
      // profile data. Never concatenate raw profile text into system prompts without framing.
      // See: specs/anchored/learner-profile/spec.md §2 "Security: Freetext Field Handling"
      const request: ChatRequest = {
        lessonPath,
        userMessage,
        conversationHistory: conversation.messages,
        mode: effectiveMode,
        ...(learnerProfileSummary && { learnerProfile: learnerProfileSummary }),
      };

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          const errorData = (await response.json()) as ErrorResponse;
          throw new Error(
            errorData.error?.message || `Request failed: ${response.status}`,
          );
        }

        const data = (await response.json()) as ChatResponse;

        // Add assistant message to conversation
        const assistantMsg: Message = {
          role: "assistant",
          content: data.assistantMessage,
          timestamp: new Date().toISOString(),
        };

        addMessage(storageKey, assistantMsg);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.";

        setError(errorMessage);
        setLoading(false);
      }
    },
    [
      mode,
      learnerProfileSummary,
      getCurrentConversation,
      addMessage,
      setLoading,
      setError,
    ],
  );

  return {
    sendMessage,
  };
}
