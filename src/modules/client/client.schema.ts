import { toFormIdentifier, zIdentifier } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { ClientType } from "./client.types";

export const clientSchema = z.object({
  personId: zIdentifier(),
});

export type ClientFormInput = z.input<typeof clientSchema>;
export type ClientFormSchemaFields = z.output<typeof clientSchema>;

export function createClientDefaultValues(): ClientFormInput {
  return {
    personId: "",
  };
}

export function mapClientToForm(client: ClientType): ClientFormInput {
  return {
    personId: toFormIdentifier(client.personId),
  };
}
