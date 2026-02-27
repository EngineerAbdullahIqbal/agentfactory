import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DangerZone } from "@/components/profile/DangerZone";

// Mock Docusaurus context
vi.mock("@docusaurus/useDocusaurusContext", () => ({
  default: () => ({
    siteConfig: { customFields: { learnerProfileApiUrl: "http://test:8004" } },
  }),
}));

// Mock navigation
const replaceMock = vi.fn();
vi.mock("@docusaurus/router", () => ({
  useHistory: () => ({ push: vi.fn(), replace: replaceMock, goBack: vi.fn() }),
}));

// Mock baseUrl
vi.mock("@docusaurus/useBaseUrl", () => ({
  default: (url: string) => url,
}));

// Mock API functions
const mockDeleteMyProfile = vi.fn();
const mockGdprEraseMyProfile = vi.fn();
const mockRefreshProfile = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/learner-profile-api", () => ({
  deleteMyProfile: (...args: unknown[]) => mockDeleteMyProfile(...args),
  gdprEraseMyProfile: (...args: unknown[]) => mockGdprEraseMyProfile(...args),
}));

vi.mock("@/contexts/LearnerProfileContext", () => ({
  useLearnerProfile: () => ({
    refreshProfile: mockRefreshProfile,
  }),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ session: { user: { id: "test-user" } } }),
}));

describe("DangerZone", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders Delete and GDPR Erase buttons", () => {
    render(<DangerZone />);
    expect(screen.getByText("Danger Zone")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("GDPR Erase")).toBeInTheDocument();
  });

  it("shows delete confirmation on Delete click", () => {
    render(<DangerZone />);
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("hides delete confirmation on Cancel click", () => {
    render(<DangerZone />);
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Confirm Delete")).not.toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls deleteMyProfile and redirects on Confirm Delete", async () => {
    mockDeleteMyProfile.mockResolvedValueOnce(undefined);
    render(<DangerZone />);

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() => {
      expect(mockDeleteMyProfile).toHaveBeenCalledWith("http://test:8004");
    });

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/");
    });
  });

  it("shows Deleting… state during delete operation", async () => {
    let resolveDelete: () => void;
    mockDeleteMyProfile.mockReturnValueOnce(
      new Promise<void>((resolve) => {
        resolveDelete = resolve;
      }),
    );

    render(<DangerZone />);
    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    expect(screen.getByText("Deleting…")).toBeInTheDocument();

    resolveDelete!();
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/");
    });
  });

  it("shows GDPR confirmation on GDPR Erase click", () => {
    render(<DangerZone />);
    fireEvent.click(screen.getByText("GDPR Erase"));
    expect(screen.getByText("Confirm Erase")).toBeInTheDocument();
  });

  it("hides GDPR confirmation on Cancel click", () => {
    render(<DangerZone />);
    fireEvent.click(screen.getByText("GDPR Erase"));
    expect(screen.getByText("Confirm Erase")).toBeInTheDocument();

    // There are two Cancel buttons (one for each zone) — get the visible one
    const cancelButtons = screen.getAllByText("Cancel");
    fireEvent.click(cancelButtons[cancelButtons.length - 1]);
    expect(screen.queryByText("Confirm Erase")).not.toBeInTheDocument();
  });

  it("calls gdprEraseMyProfile and redirects on Confirm Erase", async () => {
    mockGdprEraseMyProfile.mockResolvedValueOnce(undefined);
    render(<DangerZone />);

    fireEvent.click(screen.getByText("GDPR Erase"));
    fireEvent.click(screen.getByText("Confirm Erase"));

    await waitFor(() => {
      expect(mockGdprEraseMyProfile).toHaveBeenCalledWith("http://test:8004");
    });

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/");
    });
  });

  it("shows Erasing… state during GDPR erase operation", async () => {
    let resolveErase: () => void;
    mockGdprEraseMyProfile.mockReturnValueOnce(
      new Promise<void>((resolve) => {
        resolveErase = resolve;
      }),
    );

    render(<DangerZone />);
    fireEvent.click(screen.getByText("GDPR Erase"));
    fireEvent.click(screen.getByText("Confirm Erase"));

    expect(screen.getByText("Erasing…")).toBeInTheDocument();

    resolveErase!();
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/");
    });
  });

  it("recovers from delete error without redirecting and shows error", async () => {
    mockDeleteMyProfile.mockRejectedValueOnce(new Error("Server error"));
    render(<DangerZone />);

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Confirm Delete"));

    await waitFor(() => {
      expect(mockDeleteMyProfile).toHaveBeenCalled();
    });

    // Should not redirect on error
    expect(replaceMock).not.toHaveBeenCalled();
    // Error message should be shown with role="alert"
    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toContain("Server error");
    });
    // Delete button should be visible again (isDeleting reset)
    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
  });
});
