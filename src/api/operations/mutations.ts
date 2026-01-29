import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mockDeleteOperations } from "./mocks";
import { operationsKeys } from "./queries";

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
