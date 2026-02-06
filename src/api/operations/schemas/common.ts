// ──────────────────────────────────────────────
// Status (common type - maps to OperationStatusSummaryDto in backend)
// ──────────────────────────────────────────────

export type Status = {
  id: number;
  code: string;
  title: string;
};

// ──────────────────────────────────────────────
// Status Codes
// ──────────────────────────────────────────────

// Life cycle status codes (LifeCycleStatusCode in backend)
export const LIFE_CYCLE_STATUS_CODES = {
  IN_PROGRESS: "100",
  DONE: "200",
} as const;

// Conformity status codes (ConformityStatusCode in backend)
// Used for: operation conformity, files (same operation_status table)
export const CONFORMITY_STATUS_CODES = {
  NON_ANALYSED: "100",
  ANALYSIS_IN_PROGRESS: "200",
  CONFORME: "300",
  NON_CONFORME: "400",
  ANALYSIS_ERROR: "500",
} as const;

// ──────────────────────────────────────────────
// StatusBadge types
// ──────────────────────────────────────────────

export type StatusBadgeType = "lifeCycle" | "conformity";
