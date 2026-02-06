import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import {
  mockExtractData,
  mockFetchOperationDetails,
  mockFetchDocumentDetails,
} from "@/api/operations/mocks";
import { CONFORMITY_STATUS_CODES } from "@/api/operations/schemas/common";
import type {
  OperationsListFilters,
  OperationsListResponse,
  SortableField,
} from "@/api/operations/schemas/list";

// ──────────────────────────────────────────────
// Query Keys Factory
// ──────────────────────────────────────────────

export const operationsKeys = {
  all: ["operations"] as const,
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

// ──────────────────────────────────────────────
// Query Params Builder (pour nestjs-paginate)
// ──────────────────────────────────────────────

const SORT_FIELD_MAP: Record<SortableField, string> = {
  title: "title",
  principal: "principal.name",
  producer: "producer.name",
  ceeEngagedAt: "cee_engaged_at",
  fost: "ceeFost.title",
  lifeCycleStatus: "lastLifeCycleStatusAssociation.conformityStatus.code",
  conformityStatus: "lastConformityStatusAssociation.conformityStatus.code",
};

const CONFORMITY_FILTER_MAP: Record<string, string> = {
  conform: CONFORMITY_STATUS_CODES.CONFORME,
  non_conform: CONFORMITY_STATUS_CODES.NON_CONFORME,
  non_analysed: CONFORMITY_STATUS_CODES.NON_ANALYSED,
};

const buildOperationsSearchParams = (
  filters: OperationsListFilters,
): URLSearchParams => {
  const params = new URLSearchParams();

  params.set("page", String(filters.page));
  params.set("limit", String(filters.perPage));

  if (filters.sortBy) {
    const backendField = SORT_FIELD_MAP[filters.sortBy];
    params.set("sortBy", `${backendField}:${filters.sortOrder.toUpperCase()}`);
  }

  if (filters.search) {
    params.set("search", filters.search);
  }

  const conformityValue = CONFORMITY_FILTER_MAP[filters.conformity];
  if (conformityValue) {
    params.set(
      "filter.lastConformityStatusAssociation.conformityStatus.code",
      `$eq:${conformityValue}`,
    );
  }

  return params;
};

// ──────────────────────────────────────────────
// Queries
// ──────────────────────────────────────────────

export const useOperations = (filters: OperationsListFilters) => {
  return useQuery({
    queryKey: operationsKeys.list(filters),
    queryFn: () => {
      const searchParams = buildOperationsSearchParams(filters);
      return unwrapResponse(
        api
          .get("operations", { searchParams })
          .json<ApiResponse<OperationsListResponse>>(),
      );
    },
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export const useExtractedData = (enabled: boolean) => {
  return useQuery({
    queryKey: operationsKeys.extractedData(),
    queryFn: () => unwrapResponse(mockExtractData()),
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
    queryFn: () => unwrapResponse(mockFetchOperationDetails(id)),
    enabled: !!id,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};

export const useDocumentDetails = (
  operationId: string,
  documentId: string,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: operationsKeys.document(operationId, documentId),
    queryFn: () =>
      unwrapResponse(mockFetchDocumentDetails(operationId, documentId)),
    enabled: enabled && !!operationId && !!documentId,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};
