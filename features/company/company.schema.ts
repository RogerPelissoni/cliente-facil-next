import { z } from "zod";

export const companySchema = z.object({
    tradeName: z
        .string()
        .min(3, "Informe o nome fantasia"),

    legalName: z
        .string()
        .min(3, "Informe a razão social"),

    document: z
        .string()
        .min(11, "Informe o documento"),

    status: z.enum([
        "ACTIVE",
        "INACTIVE",
    ]),
});

export type CompanyFormData =
    z.infer<typeof companySchema>;