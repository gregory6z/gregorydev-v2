import ky from "ky";
import Cookies from "js-cookie";
import { env } from "@/env";
import { JWT_TOKEN_NAME } from "@/helpers/jwt";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  status_code: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Unwraps the standard API response envelope.
 * Returns `data` on success, throws `Error(status_code)` on failure.
 * The thrown status_code is used as an i18n key in components.
 */
export const unwrapResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new Error(String(response.status_code));
  }
  return response.data;
};

// ── Client ───────────────────────────────────────────────────────────────────

export const api = ky.create({
  prefixUrl: env.VITE_API_URL,
  timeout: 30_000,
  retry: 0, // React Query handles retries
  throwHttpErrors: false, // Handle errors manually via unwrapResponse
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get(JWT_TOKEN_NAME);
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
