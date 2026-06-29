import { createCrudApi, createScreenApi } from "@/src/shared/utils/api.util";
import { ClientFormInput } from "./client.schema";
import { ClientFiltersType, ClientScreenDataType, ClientType } from "./client.types";

const clientApi = {
  ...createCrudApi<ClientType, ClientFormInput, ClientFiltersType>("/client"),
  ...createScreenApi<ClientFiltersType, ClientScreenDataType>("/client"),
};

export const searchClients = clientApi.search;
export const findClientById = clientApi.findById;
export const createClient = clientApi.create;
export const updateClient = clientApi.update;
export const deleteClient = clientApi.delete;
export const screenClients = clientApi.screen;
