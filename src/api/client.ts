import ky, { type BeforeRequestHook, type AfterResponseHook } from "ky";
import Cookies from "js-cookie";
import { env } from "@/env";
import { JWT_TOKEN_NAME } from "@/helpers/jwt";
import { toCamelCaseKeys, toSnakeCaseKeys } from "@/helpers/transformers";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

// ── Response Helper ──────────────────────────────────────────────────────────

/**
 * Unwraps the standard API response envelope.
 * Returns `data` on success, throws `Error(statusCode)` on failure.
 * The thrown statusCode is used as an i18n key in components.
 */
export const unwrapResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new Error(String(response.statusCode));
  }
  return response.data;
};

// ── Request Hooks ────────────────────────────────────────────────────────────

const addAuthHeader: BeforeRequestHook = (request) => {
  const token = Cookies.get(JWT_TOKEN_NAME);
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const transformRequestBody: BeforeRequestHook = async (request) => {
  const contentType = request.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  if (!isJson) return;

  const body = await request.clone().text();
  if (!body) return;

  const transformed = toSnakeCaseKeys(JSON.parse(body));
  return new Request(request, { body: JSON.stringify(transformed) });
};

// ── Response Hooks ───────────────────────────────────────────────────────────

const transformResponseBody: AfterResponseHook = async (
  _request,
  _options,
  response,
) => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  if (!isJson) return;

  try {
    const body = await response.json();
    const transformed = toCamelCaseKeys(body);

    return new Response(JSON.stringify(transformed), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch {
    // Return original response if JSON parsing fails
    return;
  }
};

// ── Client ───────────────────────────────────────────────────────────────────

export const api = ky.create({
  prefixUrl: env.VITE_API_URL,
  timeout: 30_000,
  retry: 0,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [addAuthHeader, transformRequestBody],
    afterResponse: [transformResponseBody],
  },
});
