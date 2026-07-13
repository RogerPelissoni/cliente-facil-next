import { zIdentifier } from "@/src/shared/utils/schema.util";
import { z } from "zod";

export const eventServiceSchema = z.object({
  clientId: zIdentifier(),
  professionalId: zIdentifier(),
  accountReceivableId: zIdentifier(),
});

export type EventServiceFormInput = z.input<typeof eventServiceSchema>;
export type EventServiceFormSchemaFields = z.output<typeof eventServiceSchema>;