import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { createPerson, deletePerson, findPersonById, searchPersons, updatePerson } from "./person.api";
import { PersonFormInput } from "./person.schema";
import { PersonFiltersType, PersonType } from "./person.types";

export const personKeys = {
  all: ["person"] as const,

  list: (filters: PersonFiltersType, page: number, size: number, sorting: Sorting) =>
    ["person", "list", filters, page, size, sorting] as const,

  detail: (id: IdentifierType) => ["person", "detail", id] as const,
};

export function usePersons({ filters, page, size, sorting }: QueryParamsType<PersonFiltersType>) {
  return useQuery({
    queryKey: personKeys.list(filters, page, size, sorting),
    queryFn: () => searchPersons(filters, page, size, sorting),
  });
}

export function usePerson(id: IdentifierType) {
  return useQuery({
    queryKey: personKeys.detail(id),
    queryFn: () => findPersonById(id),
    enabled: !!id,
  });
}

export function useCreatePerson() {
  return useApiMutation({
    mutationFn: createPerson,
    queryKey: personKeys.all,
  });
}

export function useUpdatePerson() {
  return useApiMutation<PersonType, { id: IdentifierType; data: PersonFormInput }>({
    mutationFn: ({ id, data }) => updatePerson(id, data),
    queryKey: personKeys.all,
  });
}

export function useDeletePerson() {
  return useApiMutation({
    mutationFn: deletePerson,
    queryKey: personKeys.all,
  });
}
