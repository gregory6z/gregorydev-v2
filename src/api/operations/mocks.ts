import type {
  Operation,
  OperationsCounts,
  OperationsListResponse,
  OperationsListFilters,
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
// MOCK: Create Operation
// ──────────────────────────────────────────────

export type CreateOperationPayload = {
  name: string;
  fileIds: string[];
};

export const mockCreateOperation = (
  _payload: CreateOperationPayload,
): Promise<{ id: string; reference: string }> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const reference = `OP${String(
        Math.floor(10000000000 + Math.random() * 90000000000),
      ).slice(0, 11)}`;
      resolve({
        id: `op-${Date.now()}`,
        reference,
      });
    }, MOCK_DELAY);
  });
