import { useMutation } from "@tanstack/react-query";
import { mockLogin } from "./mocks";
import type { LoginFormData } from "./schemas";

// TODO: Replace mockLogin with real API call when back-end is ready
// api.post("auth/login", { json: data }).json<ApiResponse<LoginResponse>>()

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await mockLogin(data);

      if (!response.success) {
        throw new Error(String(response.status_code));
      }

      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};
