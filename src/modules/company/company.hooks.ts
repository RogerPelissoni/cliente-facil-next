import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import {
  createCompany,
  deleteCompany,
  findCompanyById,
  screenCompanys,
  searchCompanys,
  updateCompany,
} from "./company.api";
import { CompanyFormSchemaFields } from "./company.schema";
import { CompanyFiltersType, CompanyType } from "./company.types";

export const companyKeys = {
  all: ["company"] as const,

  list: (filters: CompanyFiltersType, page: number, size: number, sorting: Sorting) =>
    ["company", "list", filters, page, size, sorting] as const,

  screen: (filters: CompanyFiltersType, page: number, size: number, sorting: Sorting) =>
    ["company", "screen", filters, page, size, sorting] as const,

  detail: (id?: IdentifierType) => ["company", "detail", id] as const,
};

export function useCompanysScreen({ filters, page, size, sorting }: QueryParamsType<CompanyFiltersType>) {
  return useQuery({
    queryKey: companyKeys.screen(filters, page, size, sorting),
    queryFn: () => screenCompanys(filters, page, size, sorting),
  });
}

export function useCompanys({ filters, page, size, sorting }: QueryParamsType<CompanyFiltersType>) {
  return useQuery({
    queryKey: companyKeys.list(filters, page, size, sorting),
    queryFn: () => searchCompanys(filters, page, size, sorting),
  });
}

export function useCompany(id?: IdentifierType) {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => findCompanyById(id),
    enabled: !!id,
  });
}

export function useCreateCompany() {
  return useApiMutation({
    mutationFn: createCompany,
    invalidateQueries: [companyKeys.all],
  });
}

export function useUpdateCompany() {
  return useApiMutation<CompanyType, { id: IdentifierType; data: CompanyFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateCompany(id, data),
    invalidateQueries: [companyKeys.all],
  });
}

export function useDeleteCompany() {
  return useApiMutation({
    mutationFn: deleteCompany,
    invalidateQueries: [companyKeys.all],
  });
}
