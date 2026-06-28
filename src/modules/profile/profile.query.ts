import { Sorting } from "@/src/shared/types/table.type";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "./profile.api";
import { ProfileFiltersType } from "./profile.types";

export const profileKeys = {
  all: ["profile"] as const,

  list: (filters: ProfileFiltersType, page: number, size: number, sorting: Sorting) =>
    [...profileKeys.all, filters, page, size, sorting] as const,

  detail: (id: number) => [...profileKeys.all, id] as const,
};

interface UseProfileParams {
  filters: ProfileFiltersType;
  page: number;
  size: number;
  sorting: Sorting;
}

export function useProfiles({ filters, page, size, sorting }: UseProfileParams) {
  return useQuery({
    queryKey: profileKeys.list(filters, page, size, sorting),
    queryFn: () => profileApi.search(filters, page, size, sorting),
  });
}

export function useProfile(id: number) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => profileApi.findById(id),
    enabled: !!id,
  });
}
