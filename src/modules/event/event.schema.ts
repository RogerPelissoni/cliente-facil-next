import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import {
  toFormIdentifier,
  zDate,
  zEnum,
  zString,
} from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { EventWithRelationsType } from "./event.types";

export const eventSchema = z
  .object({
    dsTitle: zString().max(100),
    dsDescription: z.string().optional(),
    dtStart: zDate(),
    dtEnd: zDate(),
    tpStatus: zEnum(EventStatusEnum),
    tpEvent: zEnum(EventTypeEnum),
    eventService: z.object({
      clientId: z.string().trim().optional(),
      professionalId: z.string().trim().optional(),
    }),
    accountReceivable: z.object({
      vlTotal: z.number().optional(),
      daDue: z.date().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.tpEvent !== "SERVICE") return;

    if (!data.eventService.clientId) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obrigatório",
        path: ["eventService", "clientId"],
      });
    }
    if (!data.eventService.professionalId) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obrigatório",
        path: ["eventService", "professionalId"],
      });
    }
    if (data.accountReceivable.daDue === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "Campo obrigatório",
        path: ["accountReceivable", "daDue"],
      });
    }
  });

export type EventFormInput = z.input<typeof eventSchema>;
export type EventFormSchemaFields = z.output<typeof eventSchema>;

export function createEventDefaultValues(): EventFormInput {
  return {
    dsTitle: "",
    dsDescription: "",
    dtStart: undefined,
    dtEnd: undefined,
    tpStatus: "SCHEDULED",
    tpEvent: "APPOINTMENT",
    eventService: {
      clientId: "",
      professionalId: "",
    },
    accountReceivable: {
      vlTotal: 0,
      daDue: undefined,
    },
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
      clientId: toFormIdentifier(event.eventService?.clientId),
      professionalId: toFormIdentifier(event.eventService?.professionalId),
    },
    accountReceivable: {
      vlTotal: event.accountReceivable?.vlTotal,
      daDue: new Date(event.accountReceivable?.daDue),
    },
  };
}
