import { PageResponse } from "@/src/shared/types/api.type";
import { Sorting } from "@/src/shared/types/table.type";
import { makeSearchRequest } from "@/src/shared/utils/form.util";
import { api } from "@/src/shared/utils/http.util";
import { ClientFormInput } from "./client.schema";
import { ClientFiltersType, ClientScreenData, ClientType } from "./client.types";

export function screenClients(filters: ClientFiltersType, page: number, size: number, sorting: Sorting) {
  return api.post<ClientScreenData>("/client/screen", makeSearchRequest(filters, page, size, sorting));
}

export function searchClients(filters: ClientFiltersType, page: number, size: number, sorting: Sorting) {
  return api.post<PageResponse<ClientType>>("/client/search", makeSearchRequest(filters, page, size, sorting));
}

export function findClientById(id: number) {
  return api.get<ClientType>(`/client/${id}`);
}

export function createClient(data: ClientFormInput) {
  return api.post<ClientType>("/client", data);
}

export function updateClient(id: number, data: ClientFormInput) {
  return api.put<ClientType>(`/client/${id}`, data);
}

export function deleteClient(id: number) {
  return api.delete<void>(`/client/${id}`);
}
