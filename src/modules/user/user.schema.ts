import { RoleEnum } from "@/src/enum/role.enum";
import { zEnum } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { User } from "./user.types";

export const userSchema = z.object({
  name: z.string().min(3, "Informe o nome"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve possuir no mínimo 6 caracteres"),
  role: zEnum(RoleEnum),
  personId: z.coerce.number().min(1, "Selecione uma pessoa"),
  profileId: z.coerce.number().min(1, "Selecione um perfil"),
  companyId: z.coerce.number().min(1, "Selecione uma empresa"),
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
    personId: user.personId,
    profileId: user.profileId,
    companyId: user.companyId,
  };
}
