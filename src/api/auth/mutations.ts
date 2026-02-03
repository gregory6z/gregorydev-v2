import { useMutation } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import type { LoginFormData, LoginResponse } from "@/api/auth/schemas";

// ── Login ────────────────────────────────────────────────────────────────────

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) =>
      unwrapResponse(
        api
          .post("users/authentication", { json: data })
          .json<ApiResponse<LoginResponse>>(),
      ),
  });
};

// ── Refresh Token ────────────────────────────────────────────────────────────

export const refreshTokenFn = () =>
  unwrapResponse(
    api.post("users/refresh-token").json<ApiResponse<LoginResponse>>(),
  );
