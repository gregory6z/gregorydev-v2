import { useMutation } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import { cleanPhone } from "@/helpers/formatters";
import type {
  RegisterFormData,
  RegisterResponse,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  SiretLookupResponse,
} from "@/api/users/schemas";

// ── SIRET Lookup ─────────────────────────────────────────────────────────────

export const useLookupSiret = () => {
  return useMutation({
    mutationFn: async (siret: string) => {
      const response = await api
        .get(`companies/information?siret=${siret}`)
        .json<ApiResponse<SiretLookupResponse>>();
      return unwrapResponse(response);
    },
  });
};

// ── Register ─────────────────────────────────────────────────────────────────

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const payload = {
        ...data,
        companyPhoneNumber: cleanPhone(data.companyPhoneNumber),
        userPhoneNumber: cleanPhone(data.userPhoneNumber),
      };
      const response = await api
        .post("users/register", { json: payload })
        .json<ApiResponse<RegisterResponse>>();
      return unwrapResponse(response);
    },
  });
};

// ── Forgot Password ──────────────────────────────────────────────────────────

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordFormData) => {
      const response = await api
        .post("users/renew-password", { json: data })
        .json<ApiResponse<void>>();
      return unwrapResponse(response);
    },
  });
};

// ── Reset Password ───────────────────────────────────────────────────────────

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      token,
      data,
    }: {
      token: string;
      data: ResetPasswordFormData;
    }) => {
      const payload = {
        renewPasswordToken: token,
        ...data,
      };
      const response = await api
        .post("users/reset-password", { json: payload })
        .json<ApiResponse<void>>();
      return unwrapResponse(response);
    },
  });
};
