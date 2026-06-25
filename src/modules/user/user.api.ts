import { PageResponse } from "@/src/shared/types/api.type";
import { Sorting } from "@/src/shared/types/table.type";
import { makeSearchRequest } from "@/src/shared/utils/form.util";
import { api } from "@/src/shared/utils/http.util";
import { UserFormInput } from "./user.schema";
import { User, UserFilters, UserScreenData } from "./user.types";

export const userApi = {
  screen(filters: UserFilters, page: number, size: number, sorting: Sorting) {
    return api.post<UserScreenData>("/users/screen", makeSearchRequest(filters, page, size, sorting));
  },

  search(filters: UserFilters, page: number, size: number, sorting: Sorting) {
    return api.post<PageResponse<User>>("/users/search", makeSearchRequest(filters, page, size, sorting));
  },

  findById(id: number) {
    return api.get<User>(`/users/${id}`);
  },

  create(data: UserFormInput) {
    return api.post<User>("/users", {
      ...data,
      companyId: Number(data.companyId),
    });
  },

  update(id: number, data: UserFormInput) {
    return api.put<User>(`/users/${id}`, {
      ...data,
      companyId: Number(data.companyId),
    });
  },

  delete(id: number) {
    return api.delete<void>(`/users/${id}`);
  },
};
