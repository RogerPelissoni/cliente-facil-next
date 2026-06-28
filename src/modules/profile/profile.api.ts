import { PageResponse } from "@/src/shared/types/api.type";
import { Sorting } from "@/src/shared/types/table.type";
import { makeSearchRequest } from "@/src/shared/utils/form.util";
import { api } from "@/src/shared/utils/http.util";
import { ProfilePermissionType } from "../profilePermission/profilePermission.types";
import { ProfileFormInput } from "./profile.schema";
import { Profile, ProfileFiltersType } from "./profile.types";

export function searchProfiles(filters: ProfileFiltersType, page: number, size: number, sorting: Sorting) {
  return api.post<PageResponse<Profile>>("/profile/search", makeSearchRequest(filters, page, size, sorting));
}

export function findProfileById(id: number) {
  return api.get<Profile>(`/profile/${id}`);
}

export function findProfilePermissionsByProfile(id: number | undefined = 0) {
  return api.get<ProfilePermissionType[]>(`/profile/permissionsByProfile/${id}`);
}

export function createProfile(data: ProfileFormInput) {
  return api.post<Profile>("/profile", data);
}

export function updateProfile(id: number, data: ProfileFormInput) {
  return api.put<Profile>(`/profile/${id}`, data);
}

export function deleteProfile(id: number) {
  return api.delete<void>(`/profile/${id}`);
}
