import { RoleEnum } from "@/src/enum/role.enum";
import { PageResponse } from "@/src/shared/types/api.type";

export interface User {
  id: number;
  name: string;
  email: string;
  role: keyof typeof RoleEnum;
  personId: number;
  personName: string;
  profileId: number;
  profileName: string;
  companyId: number;
  companyName: string;
}

export interface UserFilters {
  name: string;
  email: string;
  role?: keyof typeof RoleEnum;
  personId?: number;
  profileId?: number;
  companyId?: number;
}

export type KeyValue = Record<string, string>;

export interface UserScreenData {
  obUser: PageResponse<User>;
  kvCompany: KeyValue;
  kvProfile: KeyValue;
  kvPerson: KeyValue;
}
