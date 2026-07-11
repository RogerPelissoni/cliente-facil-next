import { MutationFunction, QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

interface MutationOptions<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>;

  invalidateQueries?: QueryKey[];

  successMessage?: string;
  errorMessage?: string;

  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

export function useApiMutation<TData, TVariables>({
  mutationFn,
  invalidateQueries,
  successMessage = "Operação efetuada com sucesso",
  errorMessage = "Ocorreu um erro durante a operação",
  onSuccess,
  onError,
}: MutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    async onSuccess(data) {
      toast.success(successMessage);

      if (invalidateQueries?.length) {
        await Promise.all(
          invalidateQueries.map((queryKey) =>
            queryClient.invalidateQueries({ queryKey }),
          ),
        );
      }

      onSuccess?.(data);
    },

    onError(error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error(errorMessage);
      }

      onError?.(error as Error);
    },
  });
}
