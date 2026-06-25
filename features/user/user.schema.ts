import { RoleEnum } from "@/enum/role.enum";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Informe o nome"),
  email: z.email("E-mail inválido"),
  password: z.string().min(6, "A senha deve possuir no mínimo 6 caracteres"),
  role: z.enum(Object.keys(RoleEnum) as [keyof typeof RoleEnum]),
  personId: z.number().min(1, "Selecione uma pessoa"),
  profileId: z.number().min(1, "Selecione um perfil"),
  companyId: z.number().min(1, "Selecione uma empresa"),
});

export type UserFormSchemaFields = z.infer<typeof userSchema>;
