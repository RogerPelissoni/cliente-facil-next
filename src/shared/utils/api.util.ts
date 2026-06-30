import { PageResponse } from "@/src/shared/types/api.type";
import { Sorting } from "@/src/shared/types/table.type";
import { IdentifierType } from "../types/form.type";
import { makeSearchRequest } from "./form.util";
import { api } from "./http.util";

export function createCrudApi<TEntity, TCreate, TFilters extends object>(resource: string) {
  return {
    findAll() {
      return api.get<TEntity[]>(resource);
    },

    findById(id?: IdentifierType) {
      return api.get<TEntity>(`${resource}/${id}`);
    },

    create(data: TCreate) {
      return api.post<TEntity>(resource, data);
    },

    update(id: IdentifierType, data: TCreate) {
      return api.put<TEntity>(`${resource}/${id}`, data);
    },

    delete(id: IdentifierType) {
      return api.delete<void>(`${resource}/${id}`);
    },

    search(filters: TFilters, page: number, size: number, sorting: Sorting) {
      return api.post<PageResponse<TEntity>>(`${resource}/search`, makeSearchRequest(filters, page, size, sorting));
    },
  };
}

export function createScreenApi<TFilters extends object, TScreen>(resource: string) {
  return {
    screen(filters: TFilters, page: number, size: number, sorting: Sorting) {
      return api.post<TScreen>(`${resource}/screen`, makeSearchRequest(filters, page, size, sorting));
    },
  };
}
