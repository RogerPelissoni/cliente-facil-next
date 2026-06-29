import { createCrudApi, createScreenApi } from "@/src/shared/utils/api.util";
import { UserFormInput } from "./user.schema";
import { UserFiltersType, UserScreenDataType, UserType } from "./user.types";

const userApi = {
  ...createCrudApi<UserType, UserFormInput, UserFiltersType>("/users"),
  ...createScreenApi<UserFiltersType, UserScreenDataType>("/users"),
};

export const findUserById = userApi.findById;
export const createUser = userApi.create;
export const updateUser = userApi.update;
export const deleteUser = userApi.delete;
export const searchUsers = userApi.search;
export const screenUsers = userApi.screen;
