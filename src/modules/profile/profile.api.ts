import { IdentifierType } from "@/src/shared/types/form.type";
import { createCrudApi } from "@/src/shared/utils/api.util";
import { api } from "@/src/shared/utils/http.util";
import { ProfilePermissionType } from "../profilePermission/profilePermission.types";
import { ProfileFormInput } from "./profile.schema";
import { ProfileFiltersType, ProfileType } from "./profile.types";

const profileApi = createCrudApi<ProfileType, ProfileFormInput, ProfileFiltersType>("/profile");

export const searchProfiles = profileApi.search;
export const findProfileById = profileApi.findById;
export const createProfile = profileApi.create;
export const updateProfile = profileApi.update;
export const deleteProfile = profileApi.delete;

export function findProfilePermissionsByProfile(id: IdentifierType = "0") {
  return api.get<ProfilePermissionType[]>(`/profile/permissionsByProfile/${id}`);
}
