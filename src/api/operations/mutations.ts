import { useMutation } from "@tanstack/react-query";
import { api, unwrapResponse, type ApiResponse } from "@/api/client";
import {
  mockCreateOperation,
  mockRunGlobalAnalysis,
  mockUploadNewFileVersion,
  mockAddFileToOperation,
} from "@/api/operations/mocks";
import type { CreateOperationPayload } from "@/api/operations/schemas/creation";

export const useDeleteOperations = () => {
  return useMutation({
    mutationFn: (ids: number[]) =>
      unwrapResponse(
        api.delete("operations", { json: { ids } }).json<ApiResponse<void>>(),
      ),
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
