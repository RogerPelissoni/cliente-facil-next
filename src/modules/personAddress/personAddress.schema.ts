import { BooleanEnum, toBooleanEnum } from "@/src/shared/enum/boolean.enum";
import { toOptionalFormIdentifier, zEnum, zOptionalIdentifier, zString } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { PersonAddressType } from "./personAddress.type";

export const personAddressSchema = z.object({
  id: zOptionalIdentifier(),
  dsStreet: zString(),
  dsNumber: zString(),
  dsComplement: zString(),
  dsDistrict: zString(),
  dsCity: zString(),
  dsState: zString(),
  dsZipCode: zString(),
  flMain: zEnum(BooleanEnum),
});

export type PersonAddressFormInput = z.input<typeof personAddressSchema>;
export type PersonAddressFormSchemaFields = z.output<typeof personAddressSchema>;

export function createPersonAddressDefaultValues(): DefaultValues<PersonAddressFormInput> {
  return {
    id: undefined,
    dsStreet: "",
    dsNumber: "",
    dsComplement: "",
    dsDistrict: "",
    dsCity: "",
    dsState: "",
    dsZipCode: "",
    flMain: "false",
  };
}

export function mapPersonAddressToForm(personAddress: PersonAddressType): PersonAddressFormInput {
  return {
    id: toOptionalFormIdentifier(personAddress.id),
    dsStreet: personAddress.dsStreet,
    dsNumber: personAddress.dsNumber,
    dsComplement: personAddress.dsComplement,
    dsDistrict: personAddress.dsDistrict,
    dsCity: personAddress.dsCity,
    dsState: personAddress.dsState,
    dsZipCode: personAddress.dsZipCode,
    flMain: toBooleanEnum(personAddress.flMain),
  };
}
