import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "Nome inválido"),
    email: z.email("E-mail inválido"),
});

export type UserFormData = z.infer<typeof userSchema>;