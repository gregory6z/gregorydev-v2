import { useMutation } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import type { LoginFormData, LoginResponse } from "@/api/auth/schemas";

// ── Login ────────────────────────────────────────────────────────────────────

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api
        .post("users/authentication", { json: data })
        .json<ApiResponse<LoginResponse>>();
      return unwrapResponse(response);
    },
  });
};

// ── Refresh Token ────────────────────────────────────────────────────────────

/**
 * Refresh token function - appelée hors composants React
 * Utilisée par: interceptors, timers, token refresh automatique
 */
export const refreshTokenFn = async (): Promise<LoginResponse> => {
  const response = await api
    .post("users/refresh-token")
    .json<ApiResponse<LoginResponse>>();
  return unwrapResponse(response);
};
