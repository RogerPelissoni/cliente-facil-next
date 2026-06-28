import { PageResponse } from "@/src/shared/types/api.type";
import { Sorting } from "@/src/shared/types/table.type";
import { makeSearchRequest } from "@/src/shared/utils/form.util";
import { api } from "@/src/shared/utils/http.util";
import { UserFormInput } from "./user.schema";
import { User, UserFilters, UserScreenData } from "./user.types";

export function screenUsers(filters: UserFilters, page: number, size: number, sorting: Sorting) {
  return api.post<UserScreenData>("/users/screen", makeSearchRequest(filters, page, size, sorting));
}

export function searchUsers(filters: UserFilters, page: number, size: number, sorting: Sorting) {
  return api.post<PageResponse<User>>("/users/search", makeSearchRequest(filters, page, size, sorting));
}

export function findUserById(id: number) {
  return api.get<User>(`/users/${id}`);
}

export function createUser(data: UserFormInput) {
  return api.post<User>("/users", {
    ...data,
    companyId: Number(data.companyId),
  });
}

export function updateUser(id: number, data: UserFormInput) {
  return api.put<User>(`/users/${id}`, {
    ...data,
    companyId: Number(data.companyId),
  });
}

export function deleteUser(id: number) {
  return api.delete<void>(`/users/${id}`);
}
