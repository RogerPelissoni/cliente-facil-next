import { RoleEnum } from "@/src/enum/role.enum";
import { zEnum, zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { UserType } from "./user.types";

export const userSchema = z.object({
  name: zString(),
  email: z.email("E-mail inválido"),
  password: zString().min(6, "A senha deve possuir no mínimo 6 caracteres"),
  role: zEnum(RoleEnum),
  personId: zIdentifier(),
  profileId: zIdentifier(),
  companyId: zIdentifier(),
});

export type UserFormInput = z.input<typeof userSchema>;
export type UserFormSchemaFields = z.output<typeof userSchema>;

export function createUserDefaultValues(): UserFormInput {
  return {
    name: "",
    email: "",
    password: "",
    role: undefined,
    personId: "",
    profileId: "",
    companyId: "",
  };
}

export function mapUserToForm(user: UserType): UserFormInput {
  return {
    name: user.name,
    email: user.email,
    password: "",
    role: user.role,
    personId: String(user.personId),
    profileId: String(user.profileId),
    companyId: String(user.companyId),
  };
}
