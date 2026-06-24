import { useQuery } from "@tanstack/react-query";

import { Sorting } from "@/shared/types/table.types";
import { userApi } from "./user.api";
import { UserFilters } from "./user.types";

export const userKeys = {
  all: ["users"] as const,

  list: (filters: UserFilters, page: number, size: number, sorting: Sorting) =>
    [...userKeys.all, filters, page, size, sorting] as const,

  detail: (id: number) => [...userKeys.all, id] as const,
};

interface UseUsersParams {
  filters: UserFilters;
  page: number;
  size: number;
  sorting: Sorting;
}

export function useUsers({ filters, page, size, sorting }: UseUsersParams) {
  return useQuery({
    queryKey: userKeys.list(filters, page, size, sorting),

    queryFn: () => userApi.findAll(filters, page, size, sorting),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),

    queryFn: () => userApi.findById(id),

    enabled: !!id,
  });
}
