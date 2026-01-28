import type { ApiResponse } from "@/api/client";
import type {
  ForgotPasswordFormData,
  ForgotPasswordResponse,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
  ResetPasswordFormData,
  ResetPasswordResponse,
  SiretLookupResponse,
} from "./schemas";

const MOCK_DELAY = 800;

const MOCK_USER = {
  email: "gregory@houseofcoding.fr",
  password: "gregory",
};

// ── JWT Mock Helper ──────────────────────────────────────────────────────────

/** Creates a fake JWT with a valid `exp` claim. Not cryptographically signed. */
const createMockJwt = (expiresInSeconds: number): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: "mock-user-1",
      exp: Math.floor(Date.now() / 1_000) + expiresInSeconds,
    }),
  );
  const signature = btoa("mock-signature");
  return `${header}.${payload}.${signature}`;
};

// ── Auth Mocks ───────────────────────────────────────────────────────────────

export const mockLogin = (
  data: LoginFormData,
): Promise<ApiResponse<LoginResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (
        data.email === MOCK_USER.email &&
        data.password === MOCK_USER.password
      ) {
        resolve({
          success: true,
          data: { access_token: createMockJwt(900) },
          message: "LOGIN_SUCCESS",
          status_code: 200,
        });
      } else {
        resolve({
          success: false,
          data: { access_token: "" },
          message: "INVALID_CREDENTIALS",
          status_code: 401,
        });
      }
    }, MOCK_DELAY);
  });

export const mockRefreshToken = (): Promise<ApiResponse<LoginResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { access_token: createMockJwt(900) },
        message: "TOKEN_REFRESHED",
        status_code: 200,
      });
    }, MOCK_DELAY);
  });

// ── SIRET & Register Mocks ──────────────────────────────────────────────────

export const mockLookupSiret = (
  siret: string,
): Promise<ApiResponse<SiretLookupResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (siret === "10000000000008") {
        resolve({
          success: false,
          data: { companyName: "", address: "" },
          message: "SIRET_NOT_FOUND",
          status_code: 404,
        });
      } else if (siret === "10000000000016") {
        resolve({
          success: false,
          data: { companyName: "", address: "" },
          message: "COMPANY_ALREADY_REGISTERED",
          status_code: 409,
        });
      } else {
        resolve({
          success: true,
          data: {
            companyName: "House of Coding",
            address: "10 rue de la Paix, 75002 Paris",
          },
          message: "SIRET_FOUND",
          status_code: 200,
        });
      }
    }, MOCK_DELAY);
  });

export const mockRegister = (
  _data: RegisterFormData,
): Promise<ApiResponse<RegisterResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { id: "new-user-1", status: "PENDING" },
        message: "REGISTER_SUCCESS",
        status_code: 201,
      });
    }, MOCK_DELAY);
  });

// ── Forgot Password Mock ────────────────────────────────────────────────────

export const mockForgotPassword = (
  _data: ForgotPasswordFormData,
): Promise<ApiResponse<ForgotPasswordResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      // Always success (security: don't reveal if email exists or not)
      resolve({
        success: true,
        data: { success: true },
        message: "FORGOT_PASSWORD_EMAIL_SENT",
        status_code: 200,
      });
    }, MOCK_DELAY);
  });

// ── Reset Password Mock ─────────────────────────────────────────────────────

const MOCK_VALID_TOKEN = "valid-reset-token";
const MOCK_EXPIRED_TOKEN = "expired-reset-token";

export const mockResetPassword = (
  token: string,
  _data: ResetPasswordFormData,
): Promise<ApiResponse<ResetPasswordResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (token === MOCK_EXPIRED_TOKEN) {
        resolve({
          success: false,
          data: { success: true },
          message: "EXPIRED_TOKEN",
          status_code: 410,
        });
      } else if (token !== MOCK_VALID_TOKEN) {
        resolve({
          success: false,
          data: { success: true },
          message: "INVALID_TOKEN",
          status_code: 400,
        });
      } else {
        resolve({
          success: true,
          data: { success: true },
          message: "PASSWORD_RESET_SUCCESS",
          status_code: 200,
        });
      }
    }, MOCK_DELAY);
  });
