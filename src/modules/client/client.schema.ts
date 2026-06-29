import { zIdentifier } from "@/src/shared/utils/schema.util";
import { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { ClientType } from "./client.types";

export const clientSchema = z.object({
  personId: zIdentifier(),
});

export type ClientFormInput = z.input<typeof clientSchema>;
export type ClientFormSchemaFields = z.output<typeof clientSchema>;

export function createClientDefaultValues(): DefaultValues<ClientFormInput> {
  return {
    personId: undefined,
  };
}

export function mapClientToForm(client: ClientType): ClientFormInput {
  return {
    personId: String(client.personId),
  };
}
