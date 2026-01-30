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

// ──────────────────────────────────────────────
// Creation - Step 1
// ──────────────────────────────────────────────

import { z } from "zod/v4";

export const FileUploadStatus = {
  PENDING: "pending",
  UPLOADING: "uploading",
  COMPLETED: "completed",
  ERROR: "error",
} as const;

export type FileUploadStatusType =
  (typeof FileUploadStatus)[keyof typeof FileUploadStatus];

// Type pour un fichier en cours d'upload (pas de validation Zod car pas de form input)
export type UploadingFile = {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: FileUploadStatusType;
  error?: string;
};

// Schema pour la validation du formulaire étape 1
export const createOperationStep1Schema = z.object({
  name: z
    .string()
    .min(1, "validation.operationNameRequired")
    .max(100, "validation.operationNameTooLong"),
});

export type CreateOperationStep1Data = z.infer<
  typeof createOperationStep1Schema
>;

// Type complet pour l'étape 1 (form data + fichiers)
export type CreateOperationStep1 = {
  name: string;
  files: UploadingFile[];
};

// Formats de fichiers acceptés (MIME types pour react-dropzone)
export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-excel": [".xls"],
} as const;

// ──────────────────────────────────────────────
// Creation - Step 2
// ──────────────────────────────────────────────

export const SignatureStatus = {
  PRESENT: "present",
  ABSENT: "absent",
} as const;

export type SignatureStatusType =
  (typeof SignatureStatus)[keyof typeof SignatureStatus];

// Données extraites par l'API (OCR/IA)
export type ExtractedData = {
  fost: string;
  lieu: string;
  dateEngagement: string;
  signatureDetected: boolean;
};

// Payload pour créer l'opération (étape finale)
export type CreateOperationPayload = {
  name: string;
  fileIds: string[];
  fost: string;
  lieu: string;
  dateEngagement: string;
  signature: SignatureStatusType;
};

// Opération créée (réponse API)
export type CreatedOperation = {
  id: string;
  reference: string;
  name: string;
  fost: string;
  lieu: string;
  dateEngagement: string;
  signature: SignatureStatusType;
  status: string;
  createdAt: string;
};
