import { api } from "@/src/shared/utils/http.util";
import { AuthenticatedUserType } from "./auth.type";

const authApi = {
  me() {
    return api.get<AuthenticatedUserType>("/auth/me");
  },
};

export const findCurrentUser = authApi.me;
