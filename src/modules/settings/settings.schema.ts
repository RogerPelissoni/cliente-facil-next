import { zString } from "@/src/shared/utils/schema.util";
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: zString("Informe a senha atual"),
    newPassword: zString("Informe a nova senha", 6),
    confirmPassword: zString("Confirme a nova senha", 6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormInput = z.input<typeof changePasswordSchema>;
export type ChangePasswordFormSchemaFields = z.output<typeof changePasswordSchema>;

export function createChangePasswordDefaultValues(): ChangePasswordFormInput {
  return {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
}
