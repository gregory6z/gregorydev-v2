import { useMutation } from "@tanstack/react-query";
import { unwrapResponse } from "@/api/client";
import { cleanPhone } from "@/helpers/formatters";
import {
  mockForgotPassword,
  mockLogin,
  mockLookupSiret,
  mockRefreshToken,
  mockRegister,
  mockResetPassword,
} from "@/api/auth/mocks";
import type {
  ForgotPasswordFormData,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  ResetPasswordFormData,
} from "@/api/auth/schemas";

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

// TODO: Replace with real API call
// api.post("auth/forgot-password", { json: data }).json<ApiResponse<ForgotPasswordResponse>>()
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordFormData) =>
      unwrapResponse(await mockForgotPassword(data)),
  });
};

// TODO: Replace with real API call
// api.post("auth/reset-password", { json: { token, ...data } }).json<ApiResponse<ResetPasswordResponse>>()
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      token,
      data,
    }: {
      token: string;
      data: ResetPasswordFormData;
    }) => unwrapResponse(await mockResetPassword(token, data)),
  });
};
