import ky, {
  type BeforeRequestHook,
  type AfterResponseHook,
  isTimeoutError,
} from "ky";
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

// ── Error Handling ───────────────────────────────────────────────────────────

const ERROR_CODES = {
  NETWORK: "network_error",
  TIMEOUT: "timeout_error",
} as const;

const isNetworkError = (error: unknown): boolean =>
  error instanceof TypeError && error.message.includes("fetch");

/**
 * Unwraps the API response envelope.
 * Handles network errors and converts them to i18n-compatible codes.
 */
export async function unwrapResponse<T>(
  request: Promise<ApiResponse<T>>,
): Promise<T> {
  let response: ApiResponse<T>;

  try {
    response = await request;
  } catch (error) {
    if (isNetworkError(error)) throw new Error(ERROR_CODES.NETWORK);
    if (isTimeoutError(error)) throw new Error(ERROR_CODES.TIMEOUT);
    throw error;
  }

  if (!response.success) {
    throw new Error(String(response.statusCode));
  }

  return response.data;
}

// ── Hooks ────────────────────────────────────────────────────────────────────

const addAuthHeader: BeforeRequestHook = (request) => {
  const token = Cookies.get(JWT_TOKEN_NAME);
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const transformRequestBody: BeforeRequestHook = async (request) => {
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) return;

  const body = await request.clone().text();
  if (!body) return;

  return new Request(request, {
    body: JSON.stringify(toSnakeCaseKeys(JSON.parse(body))),
  });
};

const transformResponseBody: AfterResponseHook = async (_, __, response) => {
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) return;

  try {
    const body = await response.json();
    return new Response(JSON.stringify(toCamelCaseKeys(body)), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch {
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
