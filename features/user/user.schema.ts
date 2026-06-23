import { z } from "zod";

export const userSchema = z.object({
    name: z
        .string()
        .min(3, "Informe o nome"),

    email: z
        .email("E-mail inválido"),

    status: z.enum([
        "ACTIVE",
        "INACTIVE",
    ]),
});

export type UserFormData =
    z.infer<typeof userSchema>;