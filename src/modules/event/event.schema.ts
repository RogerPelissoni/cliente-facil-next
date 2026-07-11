import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import {
  zDate,
  zEnum,
  zString,
} from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { EventType } from "./event.types";

export const eventSchema = z.object({
  dsTitle: zString().max(100),
  dsDescription: z.string().optional(),
  dtStart: zDate(),
  dtEnd: zDate(),
  tpStatus: zEnum(EventStatusEnum),
  tpEvent: zEnum(EventTypeEnum),
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
  };
}

export function mapEventToForm(event: EventType): EventFormInput {
  return {
    dsTitle: event.dsTitle,
    dsDescription: event.dsDescription ?? "",
    dtStart: new Date(event.dtStart),
    dtEnd: new Date(event.dtEnd),
    tpStatus: event.tpStatus,
    tpEvent: event.tpEvent,
  };
}