import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { createClient, deleteClient, findClientById, screenClients, searchClients, updateClient } from "./client.api";
import { ClientFormSchemaFields } from "./client.schema";
import { ClientFiltersType, ClientType } from "./client.types";

export const clientKeys = {
  all: ["client"] as const,

  list: (filters: ClientFiltersType, page: number, size: number, sorting: Sorting) =>
    ["client", "list", filters, page, size, sorting] as const,

  screen: (filters: ClientFiltersType, page: number, size: number, sorting: Sorting) =>
    ["client", "screen", filters, page, size, sorting] as const,

  detail: (id?: IdentifierType) => ["client", "detail", id] as const,
};

export function useClientsScreen({ filters, page, size, sorting }: QueryParamsType<ClientFiltersType>) {
  return useQuery({
    queryKey: clientKeys.screen(filters, page, size, sorting),
    queryFn: () => screenClients(filters, page, size, sorting),
  });
}

export function useClients({ filters, page, size, sorting }: QueryParamsType<ClientFiltersType>) {
  return useQuery({
    queryKey: clientKeys.list(filters, page, size, sorting),
    queryFn: () => searchClients(filters, page, size, sorting),
  });
}

export function useClient(id?: IdentifierType) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => findClientById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  return useApiMutation({
    mutationFn: createClient,
    queryKey: clientKeys.all,
  });
}

export function useUpdateClient() {
  return useApiMutation<ClientType, { id: IdentifierType; data: ClientFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateClient(id, data),
    queryKey: clientKeys.all,
  });
}

export function useDeleteClient() {
  return useApiMutation({
    mutationFn: deleteClient,
    queryKey: clientKeys.all,
  });
}
