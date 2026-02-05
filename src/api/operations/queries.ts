import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { mockFetchOperationsCounts, mockFetchOperations } from "./mocks";
import type { OperationsListFilters } from "./schemas";

// Query keys factory
export const operationsKeys = {
  all: ["operations"] as const,
  counts: () => [...operationsKeys.all, "counts"] as const,
  lists: () => [...operationsKeys.all, "list"] as const,
  list: (filters: OperationsListFilters) =>
    [...operationsKeys.lists(), filters] as const,
};

export const useOperationsCounts = () => {
  return useQuery({
    queryKey: operationsKeys.counts(),
    queryFn: () => mockFetchOperationsCounts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useOperations = (filters: OperationsListFilters) => {
  return useQuery({
    queryKey: operationsKeys.list(filters),
    queryFn: () => mockFetchOperations(filters),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
