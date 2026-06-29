import { PageResponse } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { ProfilePermissionType } from "../profilePermission/profilePermission.types";

export interface ProfileType {
  id: IdentifierType;
  name: string;
  profilePermission: ProfilePermissionType[];
}

export interface ProfileFiltersType {
  name: string;
}

export interface ProfileScreenDataType {
  obProfile: PageResponse<ProfileType>;
}
