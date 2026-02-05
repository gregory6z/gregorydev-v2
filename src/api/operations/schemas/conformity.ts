import type { Status } from "./common";

// ──────────────────────────────────────────────
// Global Conformity Types (mocks - no backend endpoint yet)
// ──────────────────────────────────────────────

export type SubVerification = {
  id: string;
  name: string;
  status: Status;
  comment: string;
};

export type VerificationStep = {
  id: string;
  name: string;
  subVerifications: SubVerification[];
};

export type NonConformity = {
  id: string;
  issue: string;
  correction: string;
};

export type GlobalConformityAnalysis = {
  analyzedAt: string;
  globalStatus: Status;
  summary: string;
  verificationSteps: VerificationStep[];
  nonConformities: NonConformity[];
};
