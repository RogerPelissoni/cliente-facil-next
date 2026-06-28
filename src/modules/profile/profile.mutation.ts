import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { profileApi } from "./profile.api";
import { profileKeys } from "./profile.query";
import { ProfileFormInput } from "./profile.schema";

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.create,
    onSuccess() {
      toast.success("Usuário criado com sucesso");

      queryClient.invalidateQueries({
        queryKey: profileKeys.all,
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

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProfileFormInput }) => profileApi.update(id, data),
    onSuccess() {
      toast.success("Usuário atualizado com sucesso");

      queryClient.invalidateQueries({
        queryKey: profileKeys.all,
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

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.delete,
    onSuccess() {
      toast.success("Usuário removido com sucesso");

      queryClient.invalidateQueries({
        queryKey: profileKeys.all,
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
