import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockDeleteOperations, mockCreateOperation } from "./mocks";
import { operationsKeys } from "./queries";
import type { CreateOperationPayload } from "./schemas";

export const useDeleteOperations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => mockDeleteOperations(ids),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: operationsKeys.counts() });
      queryClient.invalidateQueries({ queryKey: operationsKeys.lists() });
    },
  });
};

export const useCreateOperation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOperationPayload) =>
      mockCreateOperation(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: operationsKeys.counts() });
      queryClient.invalidateQueries({ queryKey: operationsKeys.lists() });
    },
  });
};
