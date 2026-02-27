import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { LessonContent } from "@/components/LessonContent";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ session: { user: { id: "u1" } }, isLoading: false }),
}));

describe("LessonContent", () => {
  it("does not crash when summaryElement appears after first render", () => {
    const { rerender } = render(<LessonContent>Lesson body</LessonContent>);

    expect(screen.getByText("Lesson body")).toBeInTheDocument();

    rerender(
      <LessonContent summaryElement={<div>Summary</div>}>
        Lesson body
      </LessonContent>,
    );

    expect(screen.getByRole("tab", { name: /Full Lesson/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Summary/i })).toBeInTheDocument();
  });
});

