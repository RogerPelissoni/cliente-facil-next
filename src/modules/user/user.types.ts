import { RoleEnum } from "@/src/enum/role.enum";
import { PageResponse } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface User {
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
}

export interface UserFilters {
  name: string;
  email: string;
  role?: keyof typeof RoleEnum;
  personId?: IdentifierType;
  profileId?: IdentifierType;
  companyId?: IdentifierType;
}

export type KeyValue = Record<string, string>;

export interface UserScreenData {
  obUser: PageResponse<User>;
  kvCompany: KeyValue;
  kvProfile: KeyValue;
  kvPerson: KeyValue;
}
