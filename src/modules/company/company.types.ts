import { PageResponse } from "@/src/shared/types/api.type";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface CompanyType {
  id: IdentifierType;
  name: string;
  personId: IdentifierType;
  personName: string;
}

export interface CompanyFiltersType {
  name: string;
  personName: string;
}

export interface CompanyScreenDataType {
  obCompanies: PageResponse<CompanyType>;
  kvPerson: KeyValueType;
}
