import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { userApi } from "./user.api";
import { userKeys } from "./user.query";
import { UserFormData } from "./user.schema";
import { ApiError } from "@/lib/api";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.create,

    onSuccess() {
      toast.success("Usuário criado com sucesso");

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },

    onError(error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
        return;
      }

      toast.error("Erro ao criar usuário");
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserFormData }) => userApi.update(id, data),

    onSuccess() {
      toast.success("Usuário atualizado com sucesso");

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },

    onError(error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
        return;
      }

      toast.error("Erro ao atualizar usuário");
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.delete,

    onSuccess() {
      toast.success("Usuário removido com sucesso");

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },

    onError(error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
        return;
      }

      toast.error("Erro ao remover usuário");
    },
  });
}
