import type { ApiResponse } from "@/api/client";
import type { LoginFormData, LoginResponse } from "./schemas";

const MOCK_DELAY = 800;

const MOCK_USER = {
  email: "gregory@houseofocoding.fr",
  password: "gregory",
};

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
          data: { token: "mock-jwt-token-xyz" },
          message: "LOGIN_SUCCESS",
          status_code: 200,
        });
      } else {
        resolve({
          success: false,
          data: { token: "" },
          message: "INVALID_CREDENTIALS",
          status_code: 401,
        });
      }
    }, MOCK_DELAY);
  });
