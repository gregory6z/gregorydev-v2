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
    mutationFn: (ids: string[]) => unwrapResponse(mockDeleteOperations(ids)),
  });
};

export const useCreateOperation = () => {
  return useMutation({
    mutationFn: (payload: CreateOperationPayload) =>
      unwrapResponse(mockCreateOperation(payload)),
  });
};

export const useRunGlobalAnalysis = () => {
  return useMutation({
    mutationFn: (operationId: string) =>
      unwrapResponse(mockRunGlobalAnalysis(operationId)),
  });
};

export const useUploadNewFileVersion = () => {
  return useMutation({
    mutationFn: ({
      operationId,
      fileId,
      file,
    }: {
      operationId: string;
      fileId: string;
      file: File;
    }) => unwrapResponse(mockUploadNewFileVersion(operationId, fileId, file)),
  });
};

export const useAddFileToOperation = () => {
  return useMutation({
    mutationFn: ({ operationId, file }: { operationId: string; file: File }) =>
      unwrapResponse(mockAddFileToOperation(operationId, file)),
  });
};
