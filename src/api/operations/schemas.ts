// ──────────────────────────────────────────────
// Enums
// ──────────────────────────────────────────────

export const OperationStatus = {
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export type OperationStatusType =
  (typeof OperationStatus)[keyof typeof OperationStatus];

export const ConformityStatus = {
  CONFORM: "conform",
  NON_CONFORM: "non_conform",
  NOT_ANALYZED: "not_analyzed",
} as const;

export type ConformityStatusType =
  (typeof ConformityStatus)[keyof typeof ConformityStatus];

// ──────────────────────────────────────────────
// Operation
// ──────────────────────────────────────────────

export type Operation = {
  id: string;
  reference: string;
  filesCount: number;
  delegataire: string;
  engagementDate: string;
  fost: string;
  status: OperationStatusType;
  conformity: ConformityStatusType;
};

// ──────────────────────────────────────────────
// Operations List
// ──────────────────────────────────────────────

export type OperationsCounts = {
  all: number;
  conform: number;
  nonConform: number;
};

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type OperationsListResponse = {
  data: Operation[];
  pagination: Pagination;
};

// ──────────────────────────────────────────────
// Filters
// ──────────────────────────────────────────────

export type ConformityFilter = "all" | "conform" | "non_conform";

export type OperationsListFilters = {
  conformity: ConformityFilter;
  search: string;
  page: number;
  perPage: number;
  sortBy: keyof Operation | null;
  sortOrder: "asc" | "desc";
};
