import { PageResponse } from "@/src/shared/types/api.type";
import { ProfilePermissionType } from "../profilePermission/profilePermission.types";

export interface Profile {
  id: number;
  name: string;
  profilePermission: ProfilePermissionType[];
}

export interface ProfileFiltersType {
  name: string;
}

export type KeyValue = Record<string, string>;

export interface ProfileScreenData {
  obProfile: PageResponse<Profile>;
}
