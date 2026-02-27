import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { RequireProfile } from "@/components/RequireProfile";

const replaceMock = vi.fn();
const locationMock = { pathname: "/" };

vi.mock("@docusaurus/router", () => ({
  useHistory: () => ({ push: vi.fn(), replace: replaceMock, goBack: vi.fn() }),
  useLocation: () => locationMock,
}));

vi.mock("@docusaurus/useBaseUrl", () => ({
  default: (url: string) => url,
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ session: { user: { id: "u1" } } }),
}));

const useLearnerProfileMock = vi.fn();
vi.mock("@/contexts/LearnerProfileContext", () => ({
  useLearnerProfile: () => useLearnerProfileMock(),
}));

describe("RequireProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    locationMock.pathname = "/";
  });

  it("redirects to onboarding once when no profile exists", async () => {
    useLearnerProfileMock.mockReturnValue({
      profile: null,
      needsOnboarding: true,
      isLoading: false,
    });

    render(
      <RequireProfile>
        <div>child</div>
      </RequireProfile>,
    );

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/onboarding");
    });

    expect(localStorage.getItem("learner_profile_onboarding_redirected:u1")).toBe(
      "1",
    );
  });

  it("does not redirect again when redirect-once key is present", async () => {
    localStorage.setItem("learner_profile_onboarding_redirected:u1", "1");

    useLearnerProfileMock.mockReturnValue({
      profile: null,
      needsOnboarding: true,
      isLoading: false,
    });

    render(
      <RequireProfile>
        <div>child</div>
      </RequireProfile>,
    );

    await new Promise((r) => setTimeout(r, 0));
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("does not redirect when user opted out", async () => {
    localStorage.setItem("learner_profile_opt_out:u1", "1");

    useLearnerProfileMock.mockReturnValue({
      profile: null,
      needsOnboarding: true,
      isLoading: false,
    });

    render(
      <RequireProfile>
        <div>child</div>
      </RequireProfile>,
    );

    await new Promise((r) => setTimeout(r, 0));
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("does not redirect when already on onboarding route", async () => {
    locationMock.pathname = "/onboarding";

    useLearnerProfileMock.mockReturnValue({
      profile: null,
      needsOnboarding: true,
      isLoading: false,
    });

    render(
      <RequireProfile>
        <div>child</div>
      </RequireProfile>,
    );

    await new Promise((r) => setTimeout(r, 0));
    expect(replaceMock).not.toHaveBeenCalled();
  });
});

