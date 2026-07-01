import { toOptionalFormIdentifier, zOptionalIdentifier, zString } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { PersonMailType } from "./personMail.type";

export const personMailSchema = z.object({
  id: zOptionalIdentifier(),
  dsMail: zString(),
});

export type PersonMailFormInput = z.input<typeof personMailSchema>;
export type PersonMailFormSchemaFields = z.output<typeof personMailSchema>;

export function createPersonMailDefaultValues(): DefaultValues<PersonMailFormInput> {
  return {
    id: undefined,
    dsMail: "",
  };
}

export function mapPersonMailToForm(personMail: PersonMailType): PersonMailFormInput {
  return {
    id: toOptionalFormIdentifier(personMail.id),
    dsMail: personMail.dsMail,
  };
}
