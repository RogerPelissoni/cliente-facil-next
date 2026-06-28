import { Sorting } from "@/src/shared/types/table.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { createProfile, deleteProfile, findProfileById, searchProfiles, updateProfile } from "./profile.api";
import { ProfileFormInput } from "./profile.schema";
import { ProfileFiltersType } from "./profile.types";

export const profileKeys = {
  all: ["profile"] as const,

  list: (filters: ProfileFiltersType, page: number, size: number, sorting: Sorting) =>
    [...profileKeys.all, filters, page, size, sorting] as const,

  detail: (id: number) => [...profileKeys.all, id] as const,
};

interface UseProfilesParams {
  filters: ProfileFiltersType;
  page: number;
  size: number;
  sorting: Sorting;
}

export function useProfiles({ filters, page, size, sorting }: UseProfilesParams) {
  return useQuery({
    queryKey: profileKeys.list(filters, page, size, sorting),
    queryFn: () => searchProfiles(filters, page, size, sorting),
  });
}

export function useProfile(id: number) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => findProfileById(id),
    enabled: !!id,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProfile,

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
    mutationFn: ({ id, data }: { id: number; data: ProfileFormInput }) => updateProfile(id, data),

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
    mutationFn: deleteProfile,

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
