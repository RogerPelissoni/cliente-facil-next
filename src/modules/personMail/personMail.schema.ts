import { zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { PersonMailType } from "./personMail.type";

export const personMailSchema = z.object({
  id: zIdentifier(),
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
    id: String(personMail.id),
    dsMail: personMail.dsMail,
  };
}
