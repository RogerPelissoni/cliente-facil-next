import { Sorting } from "@/src/shared/types/table.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { createClient, deleteClient, findClientById, screenClients, searchClients, updateClient } from "./client.api";
import { ClientFormInput } from "./client.schema";
import { ClientFiltersType } from "./client.types";

export const clientKeys = {
  all: ["client"] as const,

  list: (filters: ClientFiltersType, page: number, size: number, sorting: Sorting) =>
    [...clientKeys.all, filters, page, size, sorting] as const,

  screen: (filters: ClientFiltersType, page: number, size: number, sorting: Sorting) =>
    [...clientKeys.all, "screen", filters, page, size, sorting] as const,

  detail: (id: number) => [...clientKeys.all, id] as const,
};

interface UseClientParams {
  filters: ClientFiltersType;
  page: number;
  size: number;
  sorting: Sorting;
}

export function useClientsScreen({ filters, page, size, sorting }: UseClientParams) {
  return useQuery({
    queryKey: clientKeys.screen(filters, page, size, sorting),
    queryFn: () => screenClients(filters, page, size, sorting),
  });
}

export function useClients({ filters, page, size, sorting }: UseClientParams) {
  return useQuery({
    queryKey: clientKeys.list(filters, page, size, sorting),
    queryFn: () => searchClients(filters, page, size, sorting),
  });
}

export function useClient(id: number) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => findClientById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,

    onSuccess() {
      toast.success("Usuário criado com sucesso");

      queryClient.invalidateQueries({
        queryKey: clientKeys.all,
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

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ClientFormInput }) => updateClient(id, data),

    onSuccess() {
      toast.success("Usuário atualizado com sucesso");

      queryClient.invalidateQueries({
        queryKey: clientKeys.all,
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

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,

    onSuccess() {
      toast.success("Usuário removido com sucesso");

      queryClient.invalidateQueries({
        queryKey: clientKeys.all,
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
