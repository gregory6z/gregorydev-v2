import type { ApiResponse } from "@/api/client";
import type {
  Operation,
  OperationsCounts,
  OperationsListResponse,
  OperationsListFilters,
  ExtractedData,
  CreatedOperation,
  CreateOperationPayload,
  OperationDetails,
  OperationFile,
} from "./schemas";
import {
  OperationStatus,
  ConformityStatus,
  FileStatus,
  AnalysisStatus,
} from "./schemas";

// Helper to wrap data in ApiResponse envelope
const wrapResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
  message: "OK",
  status_code: 200,
});

const MOCK_DELAY = 500;

const generateMockOperations = (count: number): Operation[] => {
  const delegataires = ["Total", "Engie", "EDF", "Eni"];
  const fosts = ["BAR-EN-101", "BAR-TH-171", "RES-EC-104", "BAR-EN-102"];

  return Array.from({ length: count }, (_, i) => ({
    id: `op-${i + 1}`,
    reference: `OP${String(
      Math.floor(10000000000 + Math.random() * 90000000000),
    ).slice(0, 11)}`,
    filesCount: Math.floor(Math.random() * 15) + 1,
    delegataire: delegataires[Math.floor(Math.random() * delegataires.length)],
    engagementDate: new Date(
      2025,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    fost: fosts[Math.floor(Math.random() * fosts.length)],
    status:
      Math.random() > 0.4 ? OperationStatus.IN_PROGRESS : OperationStatus.DONE,
    conformity:
      Math.random() > 0.6
        ? ConformityStatus.CONFORM
        : Math.random() > 0.3
          ? ConformityStatus.NON_CONFORM
          : ConformityStatus.NOT_ANALYZED,
  }));
};

let mockOperationsCache: Operation[] | null = null;

const getMockOperations = (): Operation[] => {
  if (!mockOperationsCache) {
    mockOperationsCache = generateMockOperations(926);
  }
  return mockOperationsCache;
};

export const mockFetchOperationsCounts = (): Promise<
  ApiResponse<OperationsCounts>
> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const allOps = getMockOperations();

      resolve(
        wrapResponse({
          all: allOps.length,
          conform: allOps.filter(
            (op) => op.conformity === ConformityStatus.CONFORM,
          ).length,
          nonConform: allOps.filter(
            (op) => op.conformity === ConformityStatus.NON_CONFORM,
          ).length,
        }),
      );
    }, MOCK_DELAY);
  });

export const mockFetchOperations = (
  filters: OperationsListFilters,
): Promise<ApiResponse<OperationsListResponse>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      let operations = getMockOperations();

      // Filter by conformity
      if (filters.conformity === "conform") {
        operations = operations.filter(
          (op) => op.conformity === ConformityStatus.CONFORM,
        );
      } else if (filters.conformity === "non_conform") {
        operations = operations.filter(
          (op) => op.conformity === ConformityStatus.NON_CONFORM,
        );
      }

      // Filter by search (reference + delegataire)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        operations = operations.filter(
          (op) =>
            op.reference.toLowerCase().includes(searchLower) ||
            op.delegataire.toLowerCase().includes(searchLower),
        );
      }

      // Sort
      if (filters.sortBy) {
        operations = [...operations].sort((a, b) => {
          const aVal = a[filters.sortBy!];
          const bVal = b[filters.sortBy!];
          const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          return filters.sortOrder === "asc" ? comparison : -comparison;
        });
      }

      // Pagination
      const total = operations.length;
      const totalPages = Math.ceil(total / filters.perPage);
      const start = (filters.page - 1) * filters.perPage;
      const paginatedData = operations.slice(start, start + filters.perPage);

      resolve(
        wrapResponse({
          data: paginatedData,
          pagination: {
            page: filters.page,
            perPage: filters.perPage,
            total,
            totalPages,
          },
        }),
      );
    }, MOCK_DELAY);
  });

export const mockDeleteOperations = (
  ids: string[],
): Promise<ApiResponse<void>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (mockOperationsCache) {
        mockOperationsCache = mockOperationsCache.filter(
          (op) => !ids.includes(op.id),
        );
      }
      resolve(wrapResponse(undefined));
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: File Upload
// ──────────────────────────────────────────────

type UploadProgressCallback = (progress: number) => void;

export const mockUploadFile = (
  _file: File,
  onProgress: UploadProgressCallback,
): Promise<void> =>
  new Promise((resolve, reject) => {
    let progress = 0;
    const increment = Math.random() * 15 + 5; // 5-20% per tick
    const intervalTime = Math.random() * 200 + 100; // 100-300ms per tick

    const interval = setInterval(() => {
      progress += increment;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100);

        // 5% chance d'échec pour tester le retry
        if (Math.random() < 0.05) {
          reject(new Error("upload_failed"));
        } else {
          resolve();
        }
      } else {
        onProgress(Math.min(progress, 99));
      }
    }, intervalTime);
  });

// ──────────────────────────────────────────────
// MOCK: Extract Data (OCR/IA)
// ──────────────────────────────────────────────

const mockExtractedDataSamples: ExtractedData[] = [
  {
    fost: "BAR-EN-101",
    lieu: "Pennes Mirabeau",
    dateEngagement: "27/03/24",
    signatureDetected: true,
  },
  {
    fost: "BAR-TH-106",
    lieu: "Marseille",
    dateEngagement: "15/04/24",
    signatureDetected: false,
  },
  {
    fost: "BAR-EN-103",
    lieu: "Aix-en-Provence",
    dateEngagement: "02/05/24",
    signatureDetected: true,
  },
];

export const mockExtractData = (): Promise<ApiResponse<ExtractedData>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * mockExtractedDataSamples.length,
      );
      resolve(wrapResponse(mockExtractedDataSamples[randomIndex]));
    }, 800);
  });

// ──────────────────────────────────────────────
// MOCK: Create Operation
// ──────────────────────────────────────────────

export const mockCreateOperation = (
  payload: CreateOperationPayload,
): Promise<ApiResponse<CreatedOperation>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const reference = `OP${String(
        Math.floor(10000000000 + Math.random() * 90000000000),
      ).slice(0, 11)}`;
      const newId = `op-${Date.now()}`;

      // Add to cache so it appears in the list
      if (mockOperationsCache) {
        const newOperation: Operation = {
          id: newId,
          reference,
          filesCount: payload.fileIds.length,
          delegataire: "Total", // Default delegataire for new operations
          engagementDate: new Date().toISOString(),
          fost: payload.fost,
          status: OperationStatus.IN_PROGRESS,
          conformity: ConformityStatus.NOT_ANALYZED,
        };
        mockOperationsCache.unshift(newOperation);
      }

      resolve(
        wrapResponse({
          id: newId,
          reference,
          name: payload.name,
          fost: payload.fost,
          lieu: payload.lieu,
          dateEngagement: payload.dateEngagement,
          signature: payload.signature,
          status: "Non analysé",
          createdAt: new Date().toISOString(),
        }),
      );
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Operation Details
// ──────────────────────────────────────────────

const mockOperationDetailsData: OperationDetails = {
  id: "op-001",
  reference: "OP6548764651321",
  conformity: ConformityStatus.NOT_ANALYZED,
  analysisStatus: AnalysisStatus.NOT_ANALYZED,

  creationDate: "2025-09-05",
  engagementDate: "2026-03-10",
  fostCode: "BAR-EN-101",
  keywords: ["Isolation", "Extérieur", "Polystyrène", "Hydraulique"],
  summary:
    "Travaux d'isolation thermique par l'extérieur avec polystyrène 140 mm isolation thermique par l'extérieur en 140 mm d'épaisseur, avec 2 couches d'enduit hydraulique (plaque en polystyrène collé et chevillé, armé d'un treillis, polystyrène SINIAT unimat façade: résistance thermique = 3.70",

  amountTTC: 43174.29,
  primeCEE: 2296.58,
  quoteSignatureDate: "2023-02-01",
  workAddress: "141, route des Rémouleurs - 84000 Avignon",

  beneficiary: {
    name: "Jean Courty NIBOULIES",
    address: "3 rue de la gare - 84 000 Avignon",
    email: "jeancourty@gmail.com",
    phone: "06 87 98 65 21",
  },

  professionalRGE: {
    siret: "83815597600023",
    address: "27, avenue Dausmenil - 84000 Avignon",
  },

  obligee: "PICOTY",

  files: [
    {
      id: "file-1",
      name: "Facture 6846513",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-06-12",
      status: FileStatus.NON_CONFORM,
    },
    {
      id: "file-2",
      name: "Facture 684651GKHD",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-09-05",
      status: FileStatus.NON_CONFORM,
    },
    {
      id: "file-3",
      name: "Facture JHG354351",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-12-11",
      status: FileStatus.CONFORM,
    },
    {
      id: "file-4",
      name: "Attestation sur l'honneur",
      summary:
        "Attestation sur l'honneur pour une opération CEE d'isolation de combles/toiture, référence OP156200. Engagement le 2024-03-27, travaux le 2025-01-08, facture FACT0801255305. Surface 175 m2, résistance thermique R=7, épaisseur 350 mm. Site aux Pennes-Mirabeau. Bénéficiaire Laurent Garcia.",
      date: "2025-10-28",
      status: FileStatus.ANALYZING,
    },
    {
      id: "file-5",
      name: "Devis signé",
      summary:
        "Devis CEVOHA du 2024-03-27 pour soufflage de ouate en combles perdus, avec protections électriques et rehausse de trappe. Montant HT 4025.00, TVA 221.38, TTC 4246.38. Ecoprime Picoty déduite 1137.50, net à payer 3108.88. Offre valable jusqu'au 2024-04-26.",
      date: "2026-01-01",
      status: FileStatus.CONFORM,
    },
    {
      id: "file-6",
      name: "Devis 67865",
      summary:
        "Devis CEVOHA du 2024-03-27 pour soufflage de ouate en combles perdus, avec protections électriques et rehausse de trappe. Montant HT 4025.00, TVA 221.38, TTC 4246.38. Ecoprime Picoty déduite 1137.50, net à payer 3108.88. Offre valable jusqu'au 2024-04-26.",
      date: "2026-02-15",
      status: FileStatus.NON_CONFORM,
    },
    {
      id: "file-7",
      name: "Cadre de contribution",
      summary:
        "Engagement de Picoty SAS à verser une prime CEE pour des travaux d'isolation de combles/toitures, avec montants conditionnés aux ressources. Bénéficiaire identifié, adresse des travaux, surface, fiche CEE BAR-EN-101, date de proposition 2024-12-20.",
      date: "2026-03-20",
      status: FileStatus.CONFORM,
    },
  ],
};

export const mockFetchOperationDetails = (
  _id: string,
): Promise<ApiResponse<OperationDetails>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(wrapResponse(mockOperationDetailsData));
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Run Global Analysis
// ──────────────────────────────────────────────

export const mockRunGlobalAnalysis = (
  _id: string,
): Promise<ApiResponse<void>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(wrapResponse(undefined));
    }, MOCK_DELAY * 2);
  });

// ──────────────────────────────────────────────
// MOCK: Upload New File Version
// ──────────────────────────────────────────────

export const mockUploadNewFileVersion = (
  _operationId: string,
  _fileId: string,
  _file: File,
): Promise<ApiResponse<void>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(wrapResponse(undefined));
    }, MOCK_DELAY);
  });

// ──────────────────────────────────────────────
// MOCK: Add File to Operation
// ──────────────────────────────────────────────

export const mockAddFileToOperation = (
  _operationId: string,
  _file: File,
): Promise<ApiResponse<OperationFile>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        wrapResponse({
          id: `file-${Date.now()}`,
          name: "Nouveau fichier",
          summary: "En attente d'analyse...",
          date: new Date().toISOString().split("T")[0],
          status: FileStatus.ANALYZING,
        }),
      );
    }, MOCK_DELAY);
  });
