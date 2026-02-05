import { z } from "zod/v4";

// ──────────────────────────────────────────────
// Creation - Step 1
// ──────────────────────────────────────────────

export const FileUploadStatus = {
  PENDING: "pending",
  UPLOADING: "uploading",
  COMPLETED: "completed",
  ERROR: "error",
} as const;

export type FileUploadStatusType =
  (typeof FileUploadStatus)[keyof typeof FileUploadStatus];

// File being uploaded (no Zod validation - not a form input)
export type UploadingFile = {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: FileUploadStatusType;
  error?: string;
};

// Schema for step 1 form validation
export const createOperationStep1Schema = z.object({
  name: z
    .string()
    .min(1, "validation.operationNameRequired")
    .max(100, "validation.operationNameTooLong"),
});

export type CreateOperationStep1Data = z.infer<
  typeof createOperationStep1Schema
>;

// Full type for step 1 (form data + files)
export type CreateOperationStep1 = {
  name: string;
  files: UploadingFile[];
};

// Accepted file formats (MIME types for react-dropzone)
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

// Data extracted by the API (OCR/AI)
export type ExtractedData = {
  fost: string;
  lieu: string;
  dateEngagement: string;
  signatureDetected: boolean;
};

// Payload to create the operation (final step)
export type CreateOperationPayload = {
  name: string;
  fileIds: string[];
  fost: string;
  lieu: string;
  dateEngagement: string;
  signature: SignatureStatusType;
};

// Created operation (API response)
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
