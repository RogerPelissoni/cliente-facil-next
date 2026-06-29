import { PageResponse } from "@/src/shared/types/api.type";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface ClientType {
  id: number;
  personId: IdentifierType;
  personName: string;
}

export interface ClientFiltersType {
  personName: string;
}

export interface ClientScreenData {
  obClients: PageResponse<ClientType>;
  kvPerson: KeyValueType;
}
