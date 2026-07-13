import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import {
  createProfessional,
  deleteProfessional,
  findProfessionalById,
  screenProfessionals,
  searchProfessionals,
  updateProfessional,
} from "./professional.api";
import { ProfessionalFormSchemaFields } from "./professional.schema";
import { ProfessionalFiltersType, ProfessionalType } from "./professional.types";

export const professionalKeys = {
  all: ["professional"] as const,

  list: (filters: ProfessionalFiltersType, page: number, size: number, sorting: Sorting) =>
    ["professional", "list", filters, page, size, sorting] as const,

  screen: (filters: ProfessionalFiltersType, page: number, size: number, sorting: Sorting) =>
    ["professional", "screen", filters, page, size, sorting] as const,

  detail: (id?: IdentifierType) => ["professional", "detail", id] as const,
};

export function useProfessionalsScreen({ filters, page, size, sorting }: QueryParamsType<ProfessionalFiltersType>) {
  return useQuery({
    queryKey: professionalKeys.screen(filters, page, size, sorting),
    queryFn: () => screenProfessionals(filters, page, size, sorting),
  });
}

export function useProfessionals({ filters, page, size, sorting }: QueryParamsType<ProfessionalFiltersType>) {
  return useQuery({
    queryKey: professionalKeys.list(filters, page, size, sorting),
    queryFn: () => searchProfessionals(filters, page, size, sorting),
  });
}

export function useProfessional(id?: IdentifierType) {
  return useQuery({
    queryKey: professionalKeys.detail(id),
    queryFn: () => findProfessionalById(id),
    enabled: !!id,
  });
}

export function useCreateProfessional() {
  return useApiMutation({
    mutationFn: createProfessional,
    invalidateQueries: [professionalKeys.all],
  });
}

export function useUpdateProfessional() {
  return useApiMutation<ProfessionalType, { id: IdentifierType; data: ProfessionalFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateProfessional(id, data),
    invalidateQueries: [professionalKeys.all],
  });
}

export function useDeleteProfessional() {
  return useApiMutation({
    mutationFn: deleteProfessional,
    invalidateQueries: [professionalKeys.all],
  });
}
