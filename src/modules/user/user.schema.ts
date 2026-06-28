import { RoleEnum } from "@/src/enum/role.enum";
import { zEnum, zIdentifier } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { User } from "./user.types";

export const userSchema = z.object({
  name: z.string().min(3, "Informe o nome"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve possuir no mínimo 6 caracteres"),
  role: zEnum(RoleEnum),
  personId: zIdentifier(),
  profileId: zIdentifier(),
  companyId: zIdentifier(),
});

export type UserFormInput = z.input<typeof userSchema>;
export type UserFormSchemaFields = z.output<typeof userSchema>;

export function createUserDefaultValues(): DefaultValues<UserFormInput> {
  return {
    name: "",
    email: "",
    password: "",
    role: undefined,
    personId: undefined,
    profileId: undefined,
    companyId: undefined,
  };
}

export function mapUserToForm(user: User): UserFormInput {
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
