import { useMutation } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import { cleanPhone } from "@/helpers/formatters";
import type {
  RegisterFormData,
  RegisterResponse,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  SiretLookupResponse,
  UpdatePersonalInfoFormData,
  ChangePasswordFormData,
  UpdateUserMeResponse,
} from "@/api/users/schemas";

// ── SIRET Lookup ─────────────────────────────────────────────────────────────

export const useLookupSiret = () => {
  return useMutation({
    mutationFn: (siret: string) =>
      unwrapResponse(
        api
          .get(`companies/information?siret=${siret}`)
          .json<ApiResponse<SiretLookupResponse>>(),
      ),
  });
};

// ── Register ─────────────────────────────────────────────────────────────────

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterFormData) => {
      const payload = {
        ...data,
        companyPhoneNumber: cleanPhone(data.companyPhoneNumber),
        userPhoneNumber: cleanPhone(data.userPhoneNumber),
      };
      return unwrapResponse(
        api
          .post("users/register", { json: payload })
          .json<ApiResponse<RegisterResponse>>(),
      );
    },
  });
};

// ── Forgot Password ──────────────────────────────────────────────────────────

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) =>
      unwrapResponse(
        api
          .post("users/renew-password", { json: data })
          .json<ApiResponse<void>>(),
      ),
  });
};

// ── Reset Password ───────────────────────────────────────────────────────────

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string;
      data: ResetPasswordFormData;
    }) => {
      const payload = { renewPasswordToken: token, ...data };
      return unwrapResponse(
        api
          .post("users/reset-password", { json: payload })
          .json<ApiResponse<void>>(),
      );
    },
  });
};

// ── Update Personal Info ─────────────────────────────────────────────────────

export const useUpdatePersonalInfo = () => {
  return useMutation({
    mutationFn: (data: UpdatePersonalInfoFormData) => {
      const payload = {
        ...data,
        phoneNumber: cleanPhone(data.phoneNumber),
      };
      return unwrapResponse(
        api
          .put("users/me", { json: payload })
          .json<ApiResponse<UpdateUserMeResponse>>(),
      );
    },
  });
};

// ── Change Password ──────────────────────────────────────────────────────────

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordFormData) =>
      unwrapResponse(
        api
          .put("users/me", { json: data })
          .json<ApiResponse<UpdateUserMeResponse>>(),
      ),
  });
};
