import { zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { PersonPhoneType } from "./personPhone.type";

export const personPhoneSchema = z.object({
  id: zIdentifier().optional(),
  dsPhone: zString(),
});

export type PersonPhoneFormInput = z.input<typeof personPhoneSchema>;
export type PersonPhoneFormSchemaFields = z.output<typeof personPhoneSchema>;

export function createPersonPhoneDefaultValues(): DefaultValues<PersonPhoneFormInput> {
  return {
    id: undefined,
    dsPhone: "",
  };
}

export function mapPersonPhoneToForm(personPhone: PersonPhoneType): PersonPhoneFormInput {
  return {
    id: String(personPhone.id),
    dsPhone: personPhone.dsPhone,
  };
}
