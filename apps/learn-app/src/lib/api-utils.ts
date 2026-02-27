export function getAuthHeaders(): Record<string, string> {
  const token =
    localStorage.getItem("ainative_id_token") ||
    localStorage.getItem("ainative_access_token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
