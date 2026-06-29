import { zIdentifier } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { CompanyType } from "./company.types";

export const companySchema = z.object({
  name: z.string().min(3, "Informe o nome"),
  personId: zIdentifier(),
});

export type CompanyFormInput = z.input<typeof companySchema>;
export type CompanyFormSchemaFields = z.output<typeof companySchema>;

export function createCompanyDefaultValues(): DefaultValues<CompanyFormInput> {
  return {
    name: "",
    personId: undefined,
  };
}

export function mapCompanyToForm(company: CompanyType): CompanyFormInput {
  return {
    name: company.name,
    personId: String(company.personId),
  };
}
