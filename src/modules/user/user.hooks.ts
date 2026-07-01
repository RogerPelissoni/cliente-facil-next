import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { createUser, deleteUser, findUserById, screenUsers, searchUsers, updateUser } from "./user.api";
import { UserFormInput } from "./user.schema";
import { UserFiltersType, UserType } from "./user.types";

export const userKeys = {
  all: ["users"] as const,

  list: (filters: UserFiltersType, page: number, size: number, sorting: Sorting) =>
    ["users", "list", filters, page, size, sorting] as const,

  screen: (filters: UserFiltersType, page: number, size: number, sorting: Sorting) =>
    ["users", "screen", filters, page, size, sorting] as const,

  detail: (id?: IdentifierType) => ["users", "detail", id] as const,
};

export function useUserScreen({ filters, page, size, sorting }: QueryParamsType<UserFiltersType>) {
  return useQuery({
    queryKey: userKeys.screen(filters, page, size, sorting),
    queryFn: () => screenUsers(filters, page, size, sorting),
  });
}

export function useUsers({ filters, page, size, sorting }: QueryParamsType<UserFiltersType>) {
  return useQuery({
    queryKey: userKeys.list(filters, page, size, sorting),
    queryFn: () => searchUsers(filters, page, size, sorting),
  });
}

export function useUser(id?: IdentifierType) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => findUserById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  return useApiMutation({
    mutationFn: createUser,
    queryKey: userKeys.all,
  });
}

export function useUpdateUser() {
  return useApiMutation<UserType, { id: IdentifierType; data: UserFormInput }>({
    mutationFn: ({ id, data }) => updateUser(id, data),
    queryKey: userKeys.all,
  });
}

export function useDeleteUser() {
  return useApiMutation({
    mutationFn: deleteUser,
    queryKey: userKeys.all,
  });
}
