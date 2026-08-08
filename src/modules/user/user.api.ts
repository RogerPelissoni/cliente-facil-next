import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createCrudApi, createScreenApi } from "@/src/shared/utils/api.util";
import { api } from "@/src/shared/utils/http.util";
import { UserFormSchemaFields } from "./user.schema";
import { UserFiltersType, UserScreenDataType, UserType } from "./user.types";

const userApi = {
  ...createCrudApi<UserType, UserFormSchemaFields, UserFiltersType>("/users"),
  ...createScreenApi<UserFiltersType, UserScreenDataType>("/users"),

  keyValue() {
    return api.get<KeyValueType>("/users/key-value");
  },

  resendConfirmation(id: IdentifierType) {
    return api.post<void>(`/users/${id}/resend-confirmation`);
  },
};

export const findUserById = userApi.findById;
export const createUser = userApi.create;
export const updateUser = userApi.update;
export const deleteUser = userApi.delete;
export const searchUsers = userApi.search;
export const screenUsers = userApi.screen;
export const findUsersKeyValue = userApi.keyValue;
export const resendUserConfirmation = userApi.resendConfirmation;
