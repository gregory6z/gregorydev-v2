import { useQuery } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import type { UserMeResponse } from "@/api/users/schemas";

// ── Query Keys Factory ───────────────────────────────────────────────────────

export const usersKeys = {
  all: ["users"] as const,
  me: () => [...usersKeys.all, "me"] as const,
};

// ── Queries ──────────────────────────────────────────────────────────────────

export const useUserMe = () => {
  return useQuery({
    queryKey: usersKeys.me(),
    queryFn: async () => {
      const response = await api
        .get("users/me")
        .json<ApiResponse<UserMeResponse>>();
      return unwrapResponse(response);
    },
    staleTime: Infinity, // Data stays fresh until manual invalidation
    gcTime: Infinity, // Cache persists while app is open
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
