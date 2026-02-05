import type {
  Operation,
  OperationsCounts,
  OperationsListResponse,
  OperationsListFilters,
  ExtractedData,
  CreatedOperation,
  CreateOperationPayload,
} from "./schemas";
import { OperationStatus, ConformityStatus } from "./schemas";

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

export const mockFetchOperationsCounts = (): Promise<OperationsCounts> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const allOps = getMockOperations();

      resolve({
        all: allOps.length,
        conform: allOps.filter(
          (op) => op.conformity === ConformityStatus.CONFORM,
        ).length,
        nonConform: allOps.filter(
          (op) => op.conformity === ConformityStatus.NON_CONFORM,
        ).length,
      });
    }, MOCK_DELAY);
  });

export const mockFetchOperations = (
  filters: OperationsListFilters,
): Promise<OperationsListResponse> =>
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

      resolve({
        data: paginatedData,
        pagination: {
          page: filters.page,
          perPage: filters.perPage,
          total,
          totalPages,
        },
      });
    }, MOCK_DELAY);
  });

export const mockDeleteOperations = (ids: string[]): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (mockOperationsCache) {
        mockOperationsCache = mockOperationsCache.filter(
          (op) => !ids.includes(op.id),
        );
      }
      resolve();
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

export const mockExtractData = (): Promise<ExtractedData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * mockExtractedDataSamples.length,
      );
      resolve(mockExtractedDataSamples[randomIndex]);
    }, 800);
  });

// ──────────────────────────────────────────────
// MOCK: Create Operation
// ──────────────────────────────────────────────

export const mockCreateOperation = (
  payload: CreateOperationPayload,
): Promise<CreatedOperation> =>
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

      resolve({
        id: newId,
        reference,
        name: payload.name,
        fost: payload.fost,
        lieu: payload.lieu,
        dateEngagement: payload.dateEngagement,
        signature: payload.signature,
        status: "Non analysé",
        createdAt: new Date().toISOString(),
      });
    }, MOCK_DELAY);
  });
