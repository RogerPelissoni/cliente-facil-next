import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import {
  createProfile,
  deleteProfile,
  findProfileById,
  findProfilePermissionsByProfile,
  searchProfiles,
  updateProfile,
} from "./profile.api";
import { ProfileFormSchemaFields } from "./profile.schema";
import { ProfileFiltersType, ProfileType } from "./profile.types";

export const profileKeys = {
  all: ["profile"] as const,

  list: (filters: ProfileFiltersType, page: number, size: number, sorting: Sorting) =>
    ["profile", "list", filters, page, size, sorting] as const,

  detail: (id?: IdentifierType) => ["profile", "detail", id] as const,

  profilePermission: (id: IdentifierType | undefined) => ["profile", "profilePermission", id] as const,
};

export function useProfiles({ filters, page, size, sorting }: QueryParamsType<ProfileFiltersType>) {
  return useQuery({
    queryKey: profileKeys.list(filters, page, size, sorting),
    queryFn: () => searchProfiles(filters, page, size, sorting),
  });
}

export function useProfile(id?: IdentifierType) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => findProfileById(id),
    enabled: !!id,
  });
}

export function useProfilePermission(id: IdentifierType | undefined) {
  return useQuery({
    queryKey: profileKeys.profilePermission(id),
    queryFn: () => findProfilePermissionsByProfile(id),
  });
}

export function useCreateProfile() {
  return useApiMutation({
    mutationFn: createProfile,
    queryKey: profileKeys.all,
  });
}

export function useUpdateProfile() {
  return useApiMutation<ProfileType, { id: IdentifierType; data: ProfileFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateProfile(id, data),
    queryKey: profileKeys.all,
  });
}

export function useDeleteProfile() {
  return useApiMutation({
    mutationFn: deleteProfile,
    queryKey: profileKeys.all,
  });
}
