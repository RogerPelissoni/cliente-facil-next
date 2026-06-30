import { BooleanEnum, toBooleanEnum } from "@/src/shared/enum/boolean.enum";
import { zEnum, zIdentifier } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { PersonAddressType } from "./personAddress.type";

export const personAddressSchema = z.object({
  id: zIdentifier().optional(),
  dsStreet: z.string().min(1, "Rua é obrigatória"),
  dsNumber: z.string().min(1, "Número é obrigatório"),
  dsComplement: z.string(),
  dsDistrict: z.string().min(1, "Bairro é obrigatório"),
  dsCity: z.string().min(1, "Cidade é obrigatória"),
  dsState: z.string().min(1, "Estado é obrigatório"),
  dsZipCode: z.string().min(1, "CEP é obrigatório"),
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
    flMain: undefined,
  };
}

export function mapPersonAddressToForm(personAddress: PersonAddressType): PersonAddressFormInput {
  return {
    id: String(personAddress.id),
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
