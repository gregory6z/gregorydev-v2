import type { Status } from "./common";
import type { VerificationStep } from "./conformity";

// ──────────────────────────────────────────────
// Document Details (for Document Dialog step 2 - mocks)
// ──────────────────────────────────────────────

// Document version
export type DocumentVersion = {
  id: string;
  versionNumber: 1 | 2 | 3;
  uploadedAt: string;
  fileUrl: string;
};

// Analysis verification
export type DocumentVerification = {
  id: string;
  name: string;
  status: Status;
  comment: string;
};

// Beneficiary extracted information (document)
export type DocumentBeneficiary = {
  name: string;
  address: string;
  engagementDate: string;
  ficheCEE: string;
  ficheCEEDescription: string;
  prime: number;
};

// Professional extracted information (document)
export type DocumentProfessional = {
  name: string;
  address: string;
};

// Full document details
export type DocumentDetails = {
  id: string;
  name: string;
  conformityStatus: Status;
  submissionCount: number;
  lastSubmissionAt: string;
  versions: DocumentVersion[];
  currentVersionId: string;
  beneficiary: DocumentBeneficiary;
  professional: DocumentProfessional;
  qrCodeUrl: string | null;
  verifications: DocumentVerification[];
  verificationSteps: VerificationStep[];
};
