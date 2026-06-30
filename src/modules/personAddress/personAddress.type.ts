import { BooleanEnum } from "@/src/shared/enum/boolean.enum";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface PersonAddressType {
  id?: IdentifierType;
  dsStreet: string;
  dsNumber: string;
  dsComplement: string;
  dsDistrict: string;
  dsCity: string;
  dsState: string;
  dsZipCode: string;
  flMain: keyof typeof BooleanEnum;
}
