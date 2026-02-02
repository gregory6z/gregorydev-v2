import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { unwrapResponse } from "@/api/client";
import {
  mockFetchOperationsCounts,
  mockFetchOperations,
  mockExtractData,
  mockFetchOperationDetails,
  mockFetchDocumentDetails,
} from "./mocks";
import type { OperationsListFilters } from "./schemas";

// Query keys factory
export const operationsKeys = {
  all: ["operations"] as const,
  counts: () => [...operationsKeys.all, "counts"] as const,
  lists: () => [...operationsKeys.all, "list"] as const,
  list: (filters: OperationsListFilters) =>
    [...operationsKeys.lists(), filters] as const,
  extractedData: () => [...operationsKeys.all, "extractedData"] as const,
  details: () => [...operationsKeys.all, "details"] as const,
  detail: (id: string) => [...operationsKeys.details(), id] as const,
  documents: () => [...operationsKeys.all, "documents"] as const,
  document: (operationId: string, documentId: string) =>
    [...operationsKeys.documents(), operationId, documentId] as const,
};

export const useOperationsCounts = () => {
  return useQuery({
    queryKey: operationsKeys.counts(),
    queryFn: async () => unwrapResponse(await mockFetchOperationsCounts()),
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
    queryFn: async () => unwrapResponse(await mockFetchOperations(filters)),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export const useExtractedData = (enabled: boolean) => {
  return useQuery({
    queryKey: operationsKeys.extractedData(),
    queryFn: async () => unwrapResponse(await mockExtractData()),
    enabled,
    staleTime: Infinity,
    gcTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useOperationDetails = (id: string) => {
  return useQuery({
    queryKey: operationsKeys.detail(id),
    queryFn: async () => unwrapResponse(await mockFetchOperationDetails(id)),
    enabled: !!id,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDocumentDetails = (
  operationId: string,
  documentId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: operationsKeys.document(operationId, documentId),
    queryFn: async () =>
      unwrapResponse(await mockFetchDocumentDetails(operationId, documentId)),
    enabled: enabled && !!operationId && !!documentId,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
