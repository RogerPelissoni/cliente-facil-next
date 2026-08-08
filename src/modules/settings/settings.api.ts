import { api } from "@/src/shared/utils/http.util";
import { ChangePasswordFormSchemaFields } from "./settings.schema";

const settingsApi = {
  changePassword(data: ChangePasswordFormSchemaFields) {
    const { currentPassword, newPassword } = data;
    return api.patch<void>("/users/me/password", { currentPassword, newPassword });
  },
};

export const changePassword = settingsApi.changePassword;
