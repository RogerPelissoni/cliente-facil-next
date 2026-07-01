import { toFormIdentifier, zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { CompanyType } from "./company.types";

export const companySchema = z.object({
  name: zString(),
  personId: zIdentifier(),
});

export type CompanyFormInput = z.input<typeof companySchema>;
export type CompanyFormSchemaFields = z.output<typeof companySchema>;

export function createCompanyDefaultValues(): CompanyFormInput {
  return {
    name: "",
    personId: "",
  };
}

export function mapCompanyToForm(company: CompanyType): CompanyFormInput {
  return {
    name: company.name,
    personId: toFormIdentifier(company.personId),
  };
}
