import { useMutation } from "@tanstack/react-query";
import { unwrapResponse } from "@/api/client";
import {
  mockDeleteOperations,
  mockCreateOperation,
  mockRunGlobalAnalysis,
  mockUploadNewFileVersion,
  mockAddFileToOperation,
} from "@/api/operations/mocks";
import type { CreateOperationPayload } from "@/api/operations/schemas";

export const useDeleteOperations = () => {
  return useMutation({
    mutationFn: async (ids: string[]) =>
      unwrapResponse(await mockDeleteOperations(ids)),
  });
};

export const useCreateOperation = () => {
  return useMutation({
    mutationFn: async (payload: CreateOperationPayload) =>
      unwrapResponse(await mockCreateOperation(payload)),
  });
};

export const useRunGlobalAnalysis = () => {
  return useMutation({
    mutationFn: async (operationId: string) =>
      unwrapResponse(await mockRunGlobalAnalysis(operationId)),
  });
};

export const useUploadNewFileVersion = () => {
  return useMutation({
    mutationFn: async ({
      operationId,
      fileId,
      file,
    }: {
      operationId: string;
      fileId: string;
      file: File;
    }) =>
      unwrapResponse(await mockUploadNewFileVersion(operationId, fileId, file)),
  });
};

export const useAddFileToOperation = () => {
  return useMutation({
    mutationFn: async ({
      operationId,
      file,
    }: {
      operationId: string;
      file: File;
    }) => unwrapResponse(await mockAddFileToOperation(operationId, file)),
  });
};
