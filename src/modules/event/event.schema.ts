import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import {
  toFormIdentifier,
  zDate,
  zEnum,
  zString,
} from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { accountReceivableEventSchema } from "../accountReceivable/accountReceivable.schema";
import { eventServiceSchema } from "../eventService/eventService.schema";
import { EventWithRelationsType } from "./event.types";

export const eventSchema = z.object({
  dsTitle: zString().max(100),
  dsDescription: z.string().optional(),
  dtStart: zDate(),
  dtEnd: zDate(),
  tpStatus: zEnum(EventStatusEnum),
  tpEvent: zEnum(EventTypeEnum),
  eventService: eventServiceSchema,
  accountReceivable: accountReceivableEventSchema,
});

export type EventFormInput = z.input<typeof eventSchema>;
export type EventFormSchemaFields = z.output<typeof eventSchema>;

export function createEventDefaultValues(): EventFormInput {
  return {
    dsTitle: "",
    dsDescription: "",
    dtStart: undefined,
    dtEnd: undefined,
    tpStatus: 'SCHEDULED',
    tpEvent: 'APPOINTMENT',
    eventService: {
      clientId: '',
      professionalId: '',
      accountReceivableId: '',
    },
    accountReceivable: {
      vlTotal: 0,
      daDue: undefined,
    }
  };
}

export function mapEventToForm(event: EventWithRelationsType): EventFormInput {
  return {
    dsTitle: event.dsTitle,
    dsDescription: event.dsDescription ?? "",
    dtStart: new Date(event.dtStart),
    dtEnd: new Date(event.dtEnd),
    tpStatus: event.tpStatus,
    tpEvent: event.tpEvent,
    eventService: {
      clientId: toFormIdentifier(event.service?.clientId),
      professionalId: toFormIdentifier(event.service?.professionalId),
      accountReceivableId: toFormIdentifier(event.service?.accountReceivableId),
    },
    accountReceivable: {
      vlTotal: event.accountReceivable?.vlTotal,
      daDue: event.accountReceivable?.daDue,
    },
  };
}