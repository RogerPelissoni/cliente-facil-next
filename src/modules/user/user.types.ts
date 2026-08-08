import { RoleEnum } from "@/src/enum/role.enum";
import { PageResponse } from "@/src/shared/types/api.type";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface UserType {
  id: IdentifierType;
  name: string;
  email: string;
  role: keyof typeof RoleEnum;
  personId: IdentifierType;
  personName: string;
  profileId: IdentifierType;
  profileName: string;
  companyId: IdentifierType;
  companyName: string;
  dtEmailConfirmedAt: string | null;
}

export interface UserFiltersType {
  name: string;
  email: string;
  role?: keyof typeof RoleEnum;
  personId?: IdentifierType;
  profileId?: IdentifierType;
  companyId?: IdentifierType;
}

export interface UserScreenDataType {
  obUser: PageResponse<UserType>;
  kvCompany: KeyValueType;
  kvProfile: KeyValueType;
  kvPerson: KeyValueType;
}
