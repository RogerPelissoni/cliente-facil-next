import { IdentifierType } from "@/src/shared/types/form.type";
import { toFormIdentifier, zIdentifier, zString } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { EventMessageType } from "./eventMessage.type";

export const eventMessageSchema = z.object({
  eventId: zIdentifier().optional(),
  dsMessage: zString(),
});

export type EventMessageFormInput = z.input<typeof eventMessageSchema>;
export type EventMessageFormSchemaFields = z.output<typeof eventMessageSchema>;

export function createEventMessageDefaultValues(eventId?: IdentifierType): EventMessageFormInput {
  return {
    eventId: eventId,
    dsMessage: "",
  };
}

export function mapEventMessageToForm(eventId: IdentifierType | undefined, eventMessage: EventMessageType): EventMessageFormInput {
  return {
    eventId: toFormIdentifier(eventId),
    dsMessage: eventMessage.dsMessage,
  };
}
