import { PageResponse } from "@/src/shared/types/api.type";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface ProfessionalType {
  id: IdentifierType;
  personId: IdentifierType;
  personName: string;
}

export interface ProfessionalFiltersType {
  personName: string;
}

export interface ProfessionalScreenDataType {
  obProfessionals: PageResponse<ProfessionalType>;
  kvPerson: KeyValueType;
}
