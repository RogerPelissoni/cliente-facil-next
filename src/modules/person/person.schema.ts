import { PersonGenderEnum } from "@/src/enum/personGender.enum";
import { BooleanEnum, toBooleanEnum } from "@/src/shared/enum/boolean.enum";
import { zEnum, zIdentifier } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { personAddressSchema } from "../personAddress/personAddress.schema";
import { PersonType } from "./person.types";

export const personSchema = z.object({
  id: zIdentifier(),
  name: z.string().min(1, "Nome é obrigatório"),
  dsDocument: z.string().min(1, "Documento é obrigatório"),
  tpGender: zEnum(PersonGenderEnum),
  flActive: zEnum(BooleanEnum),
  personAddresses: z.array(personAddressSchema),
});

export type PersonFormInput = z.input<typeof personSchema>;
export type PersonFormSchemaFields = z.output<typeof personSchema>;

export function createPersonDefaultValues(): DefaultValues<PersonFormInput> {
  return {
    id: undefined,
    name: "",
    dsDocument: "",
    tpGender: undefined,
    flActive: undefined,
    personAddresses: [],
  };
}

export function mapPersonToForm(person: PersonType): PersonFormInput {
  return {
    id: String(person.id),
    name: person.name,
    dsDocument: person.dsDocument,
    tpGender: person.tpGender,
    flActive: toBooleanEnum(person.flActive),
    personAddresses: person.personAddresses ?? [],
  };
}
