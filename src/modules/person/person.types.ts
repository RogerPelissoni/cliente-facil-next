import { PersonGenderEnum } from "@/src/enum/personGender.enum";
import { BooleanEnum } from "@/src/shared/enum/boolean.enum";
import { PageResponse } from "@/src/shared/types/api.type";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface PersonType {
  id: IdentifierType;
  name: string;
  dsDocument: string;
  tpGender: keyof typeof PersonGenderEnum;
  flActive: keyof typeof BooleanEnum;
}

export interface PersonFiltersType {
  name: string;
  dsDocument: string;
  flActive?: boolean;
}

export interface PersonScreenDataType {
  obPersons: PageResponse<PersonType>;
  kvPerson: KeyValueType;
}
