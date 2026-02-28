import { getAuthHeaders, ApiError } from "./api-utils";
import type {
  ProfileCreateRequest,
  ProfileUpdateRequest,
  ProfileResponse,
  CompletenessResponse,
  OnboardingPhase,
  ErrorResponse,
} from "./learner-profile-types";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ErrorResponse | undefined;
    try {
      errorData = await response.json();
    } catch {
      // Response body may not be JSON
    }
    let message = errorData?.message || `Request failed: ${response.status}`;
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      if (retryAfter) {
        message = `Rate limited. Please retry after ${retryAfter} seconds.`;
      } else {
        message = "Too many requests. Please wait a moment and try again.";
      }
    }
    throw new ApiError(
      message,
      response.status,
      errorData?.error || "unknown_error",
    );
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

export async function createProfile(
  baseUrl: string,
  data: ProfileCreateRequest,
): Promise<ProfileResponse> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse<ProfileResponse>(response);
}

export async function getMyProfile(baseUrl: string): Promise<ProfileResponse> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<ProfileResponse>(response);
}

export async function getMyProfileOrNull(
  baseUrl: string,
): Promise<ProfileResponse | null> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me`, {
    headers: getAuthHeaders(),
  });
  if (response.status === 404) return null;
  return handleResponse<ProfileResponse>(response);
}

export async function updateMyProfile(
  baseUrl: string,
  data: ProfileUpdateRequest,
): Promise<ProfileResponse> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse<ProfileResponse>(response);
}

export async function updateSection(
  baseUrl: string,
  section: string,
  data: unknown,
): Promise<ProfileResponse> {
  const response = await fetch(
    `${baseUrl}/api/v1/profiles/me/sections/${section}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    },
  );
  return handleResponse<ProfileResponse>(response);
}

export async function completeOnboardingPhase(
  baseUrl: string,
  phase: OnboardingPhase,
  data?: unknown,
): Promise<ProfileResponse> {
  const response = await fetch(
    `${baseUrl}/api/v1/profiles/me/onboarding/${phase}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    },
  );
  return handleResponse<ProfileResponse>(response);
}

export async function getCompleteness(
  baseUrl: string,
): Promise<CompletenessResponse> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me/completeness`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<CompletenessResponse>(response);
}

export async function deleteMyProfile(baseUrl: string): Promise<void> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<void>(response);
}

export async function gdprEraseMyProfile(baseUrl: string): Promise<void> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me/gdpr-erase`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<void>(response);
}

export async function syncFromPhm(baseUrl: string): Promise<ProfileResponse> {
  const response = await fetch(`${baseUrl}/api/v1/profiles/me/sync-from-phm`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  return handleResponse<ProfileResponse>(response);
}
