import { Sorting } from "@/src/shared/types/table.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { createUser, deleteUser, findUserById, screenUsers, searchUsers, updateUser } from "./user.api";
import { UserFormInput } from "./user.schema";
import { UserFilters } from "./user.types";

export const userKeys = {
  all: ["users"] as const,

  list: (filters: UserFilters, page: number, size: number, sorting: Sorting) =>
    [...userKeys.all, filters, page, size, sorting] as const,

  screen: (filters: UserFilters, page: number, size: number, sorting: Sorting) =>
    [...userKeys.all, "screen", filters, page, size, sorting] as const,

  detail: (id: number) => [...userKeys.all, id] as const,
};

interface UseUsersParams {
  filters: UserFilters;
  page: number;
  size: number;
  sorting: Sorting;
}

export function useUserScreen({ filters, page, size, sorting }: UseUsersParams) {
  return useQuery({
    queryKey: userKeys.screen(filters, page, size, sorting),
    queryFn: () => screenUsers(filters, page, size, sorting),
  });
}

export function useUsers({ filters, page, size, sorting }: UseUsersParams) {
  return useQuery({
    queryKey: userKeys.list(filters, page, size, sorting),
    queryFn: () => searchUsers(filters, page, size, sorting),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => findUserById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,

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
    mutationFn: ({ id, data }: { id: number; data: UserFormInput }) => updateUser(id, data),

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
    mutationFn: deleteUser,

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
