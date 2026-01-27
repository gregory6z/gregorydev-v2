import ky from "ky";
import { env } from "@/env";

// Standard API response envelope from the backend.
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  status_code: number;
}

// Retry is disabled (retry: 0) because React Query handles retries.
// This avoids duplicated retry logic (ky retry * React Query retry).
export const api = ky.create({
  prefixUrl: env.VITE_API_URL,
  timeout: 30000,
  retry: 0,
  hooks: {
    // Injects JWT token from localStorage into every request.
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
