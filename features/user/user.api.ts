import { api } from "@/lib/api/client";
import { makeSearchRequest } from "@/lib/api/search-mapper";
import { Sorting } from "@/shared/types/table.types";
import { UserFormData } from "./user.schema";
import { PageResponse, User, UserFilters } from "./user.types";

export const userApi = {
  findAll(filters: UserFilters, page: number, size: number, sorting: Sorting) {
    return api.post<PageResponse<User>>("/users/search", makeSearchRequest(filters, page, size, sorting));
  },

  findById(id: number) {
    return api.get<User>(`/users/${id}`);
  },

  create(data: UserFormData) {
    return api.post<User>("/users", {
      ...data,
      companyId: Number(data.companyId),
    });
  },

  update(id: number, data: UserFormData) {
    return api.put<User>(`/users/${id}`, {
      ...data,
      companyId: Number(data.companyId),
    });
  },

  delete(id: number) {
    return api.delete<void>(`/users/${id}`);
  },
};
