import { env } from "@/env";

export const JWT_TOKEN_NAME = "energer_portal_jwt_token";

/** Time before expiration to trigger a proactive refresh (default: 10 min) */
export const REFRESH_BUFFER = env.VITE_REFRESH_BUFFER_MINUTES * 60 * 1_000;

/**
 * Decodes the payload of a JWT token (base64).
 * Does NOT validate the signature — only reads claims.
 */
export const decodeToken = (token: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

/**
 * Returns the token expiration time in milliseconds (from `exp` claim).
 * Returns null if the token is invalid or has no `exp`.
 */
export const getTokenExpiration = (token: string): number | null => {
  const payload = decodeToken(token);
  if (!payload || typeof payload.exp !== "number") return null;
  return payload.exp * 1_000;
};
