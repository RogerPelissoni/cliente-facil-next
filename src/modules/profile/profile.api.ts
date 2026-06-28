import { PageResponse } from "@/src/shared/types/api.type";
import { Sorting } from "@/src/shared/types/table.type";
import { makeSearchRequest } from "@/src/shared/utils/form.util";
import { api } from "@/src/shared/utils/http.util";
import { ProfileFormInput } from "./profile.schema";
import { Profile, ProfileFiltersType } from "./profile.types";

export const profileApi = {
  search(filters: ProfileFiltersType, page: number, size: number, sorting: Sorting) {
    return api.post<PageResponse<Profile>>("/profile/search", makeSearchRequest(filters, page, size, sorting));
  },

  findById(id: number) {
    return api.get<Profile>(`/profile/${id}`);
  },

  create(data: ProfileFormInput) {
    return api.post<Profile>("/profile", data);
  },

  update(id: number, data: ProfileFormInput) {
    return api.put<Profile>(`/profile/${id}`, data);
  },

  delete(id: number) {
    return api.delete<void>(`/profile/${id}`);
  },
};
