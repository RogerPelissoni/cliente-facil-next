import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { createUser, deleteUser, findUserById, findUsersKeyValue, screenUsers, searchUsers, updateUser } from "./user.api";
import { UserFormSchemaFields } from "./user.schema";
import { UserFiltersType, UserType } from "./user.types";

export const userKeys = {
  all: ["users"] as const,

  keyValue: ["users", "keyValue"] as const,

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

export function useUsersKeyValue() {
  return useQuery({
    queryKey: userKeys.keyValue,
    queryFn: findUsersKeyValue,
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
    invalidateQueries: [userKeys.all],
  });
}

export function useUpdateUser() {
  return useApiMutation<UserType, { id: IdentifierType; data: UserFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateUser(id, data),
    invalidateQueries: [userKeys.all],
  });
}

export function useDeleteUser() {
  return useApiMutation({
    mutationFn: deleteUser,
    invalidateQueries: [userKeys.all],
  });
}
