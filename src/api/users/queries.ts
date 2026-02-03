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
    queryFn: () =>
      unwrapResponse(api.get("users/me").json<ApiResponse<UserMeResponse>>()),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
