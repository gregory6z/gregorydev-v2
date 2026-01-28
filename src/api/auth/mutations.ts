import { useMutation } from "@tanstack/react-query";
import { unwrapResponse } from "@/api/client";
import { cleanPhone } from "@/helpers/formatters";
import {
  mockLogin,
  mockLookupSiret,
  mockRefreshToken,
  mockRegister,
} from "./mocks";
import type { LoginFormData, LoginResponse, RegisterFormData } from "./schemas";

// ── Functions (called outside React components, e.g. timers, interceptors) ──

// TODO: Replace with real API call
// api.post("auth/refresh").json<ApiResponse<LoginResponse>>()
export const refreshTokenFn = async (): Promise<LoginResponse> =>
  unwrapResponse(await mockRefreshToken());

// ── Mutations ────────────────────────────────────────────────────────────────

// TODO: Replace with real API call
// api.post("auth/login", { json: data }).json<ApiResponse<LoginResponse>>()
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginFormData) =>
      unwrapResponse(await mockLogin(data)),
  });
};

// TODO: Replace with real API call
// api.get(`sirene/${siret}`).json<ApiResponse<SiretLookupResponse>>()
export const useLookupSiret = () => {
  return useMutation({
    mutationFn: async (siret: string) =>
      unwrapResponse(await mockLookupSiret(siret)),
  });
};

// TODO: Replace with real API call
// api.post("auth/register", { json: data }).json<ApiResponse<RegisterResponse>>()
export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const payload = {
        ...data,
        phone: cleanPhone(data.phone),
        userPhone: cleanPhone(data.userPhone),
      };
      return unwrapResponse(await mockRegister(payload));
    },
  });
};
