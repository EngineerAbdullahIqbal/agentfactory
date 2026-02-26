import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAuthHeaders, ApiError } from "@/lib/api-utils";

describe("getAuthHeaders", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns Bearer header when token exists in localStorage", () => {
    localStorage.setItem("ainative_id_token", "test-jwt-token");
    const headers = getAuthHeaders();
    expect(headers).toEqual({ Authorization: "Bearer test-jwt-token" });
  });

  it("returns empty object when no token in localStorage", () => {
    const headers = getAuthHeaders();
    expect(headers).toEqual({});
  });
});

describe("ApiError", () => {
  it("has correct status, code, message, and name", () => {
    const error = new ApiError("Not found", 404, "profile_not_found");
    expect(error.message).toBe("Not found");
    expect(error.status).toBe(404);
    expect(error.code).toBe("profile_not_found");
    expect(error.name).toBe("ApiError");
  });

  it("is an instance of Error", () => {
    const error = new ApiError("fail", 500, "internal");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
  });
});
