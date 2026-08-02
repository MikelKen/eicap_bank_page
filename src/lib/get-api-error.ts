import { AxiosError } from "axios";

export function getApiError(
  error: unknown,
  fallback = "Error desconocido",
): string {
  if (typeof error === "object" && error !== null) {
    if ("details" in error) {
      const details = (error as { details?: Record<string, string> }).details;
      if (details) {
        const values = Object.values(details);
        if (values.length > 0) return values[0];
      }
    }

    if (error instanceof AxiosError && error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error instanceof Error) {
      return error.message;
    }
  }
  return fallback;
}
