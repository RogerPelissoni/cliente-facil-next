import { zIdentifier } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { ProfessionalType } from "./professional.types";

export const professionalSchema = z.object({
  personId: zIdentifier(),
});

export type ProfessionalFormInput = z.input<typeof professionalSchema>;
export type ProfessionalFormSchemaFields = z.output<typeof professionalSchema>;

export function createProfessionalDefaultValues(): ProfessionalFormInput {
  return {
    personId: "",
  };
}

export function mapProfessionalToForm(professional: ProfessionalType): ProfessionalFormInput {
  return {
    personId: String(professional.personId),
  };
}
