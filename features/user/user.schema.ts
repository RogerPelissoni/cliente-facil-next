import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    companyId: z.string().min(
        1,
        "Selecione uma empresa",
    )
});

export type UserFormData = z.infer<typeof userSchema>;