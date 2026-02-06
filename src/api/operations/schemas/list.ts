import type { Status } from "./common";

// ──────────────────────────────────────────────
// Operation (list) - aligned with OperationListItemDto in backend
// ──────────────────────────────────────────────

export type OperationCompanySummary = {
  id: number;
  name: string;
};

export type OperationFost = {
  id: number;
  title: string;
};

export type Operation = {
  id: number;
  title: string;
  filesCount: number;
  principal: OperationCompanySummary | null;
  producer: OperationCompanySummary | null;
  ceeEngagedAt: string | null;
  fost: OperationFost | null;
  lifeCycleStatus: Status;
  conformityStatus: Status | null;
  createdAt: string;
};

// ──────────────────────────────────────────────
// Operations List Response (aligned with OperationListResponseDto)
// ──────────────────────────────────────────────

export type OperationsCounts = {
  all: number;
  conforme: number;
  nonConforme: number;
  nonAnalysed: number;
};

export type OperationsMeta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  counts: OperationsCounts;
};

export type OperationsListResponse = {
  data: Operation[];
  meta: OperationsMeta;
};

// ──────────────────────────────────────────────
// Filters
// ──────────────────────────────────────────────

export type ConformityFilter =
  | "all"
  | "conform"
  | "non_conform"
  | "non_analysed";

export type SortableField =
  | "title"
  | "principal"
  | "producer"
  | "ceeEngagedAt"
  | "fost"
  | "lifeCycleStatus"
  | "conformityStatus";

export type OperationsListFilters = {
  conformity: ConformityFilter;
  search: string;
  page: number;
  perPage: number;
  sortBy: SortableField | null;
  sortOrder: "asc" | "desc";
};
