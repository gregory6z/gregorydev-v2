import type { Status } from "./common";
import type { GlobalConformityAnalysis } from "./conformity";

// ──────────────────────────────────────────────
// Operation Details (mocks - no backend endpoint yet)
// ──────────────────────────────────────────────

// File in the details list
export type OperationFile = {
  id: string;
  name: string;
  summary: string;
  date: string;
  status: Status;
};

// Beneficiary (all fields can be null - extracted by AI)
export type Beneficiary = {
  name: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
};

// RGE Professional (all fields can be null - extracted by AI)
export type ProfessionalRGE = {
  siret: string | null;
  address: string | null;
};

// Full operation details
export type OperationDetails = {
  // Required fields (system generated)
  id: string;
  reference: string;
  conformity: Status | null;
  analysisStatus: Status;
  files: OperationFile[];

  // AI-extracted fields (can be null)
  creationDate: string | null;
  engagementDate: string | null;
  fostCode: string | null;
  keywords: string[] | null;
  summary: string | null;

  // Operation mentions
  amountTTC: number | null;
  primeCEE: number | null;
  quoteSignatureDate: string | null;
  workAddress: string | null;

  // Related entities
  beneficiary: Beneficiary | null;
  professionalRGE: ProfessionalRGE | null;
  obligee: string | null;

  // Global conformity analysis (null if not yet analyzed)
  globalConformity: GlobalConformityAnalysis | null;
};
