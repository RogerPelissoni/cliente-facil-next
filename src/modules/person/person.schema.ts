import { PersonGenderEnum } from "@/src/enum/personGender.enum";
import { BooleanEnum, toBooleanEnum } from "@/src/shared/enum/boolean.enum";
import { zEnum, zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { mapPersonAddressToForm, personAddressSchema } from "../personAddress/personAddress.schema";
import { mapPersonMailToForm, personMailSchema } from "../personMail/personMail.schema";
import { mapPersonPhoneToForm, personPhoneSchema } from "../personPhone/personPhone.schema";
import { PersonType } from "./person.types";

export const personSchema = z.object({
  id: zIdentifier(),
  name: zString(),
  dsDocument: zString(),
  tpGender: zEnum(PersonGenderEnum).optional(),
  flActive: zEnum(BooleanEnum),
  personAddresses: z.array(personAddressSchema),
  personMails: z.array(personMailSchema),
  personPhones: z.array(personPhoneSchema),
});

export type PersonFormInput = z.input<typeof personSchema>;
export type PersonFormSchemaFields = z.output<typeof personSchema>;

export function createPersonDefaultValues(): PersonFormInput {
  return {
    id: "",
    name: "",
    dsDocument: "",
    tpGender: undefined,
    flActive: "true",
    personAddresses: [],
    personMails: [],
    personPhones: [],
  };
}

export function mapPersonToForm(person: PersonType): PersonFormInput {
  return {
    id: String(person.id),
    name: person.name,
    dsDocument: person.dsDocument,
    tpGender: person.tpGender,
    flActive: toBooleanEnum(person.flActive),
    personAddresses: person.personAddresses?.map(mapPersonAddressToForm) ?? [],
    personMails: person.personMails?.map(mapPersonMailToForm) ?? [],
    personPhones: person.personPhones?.map(mapPersonPhoneToForm) ?? [],
  };
}
