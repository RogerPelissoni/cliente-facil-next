import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import {
  zString,
} from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { EventType } from "./event.types";

export const eventSchema = z.object({
  dsTitle: zString().max(100),
  dsDescription: z.string().optional(),

  dtStart: z.string(),
  dtEnd: z.string(),

  tpStatus: z.nativeEnum(EventStatusEnum),
  tpEvent: z.nativeEnum(EventTypeEnum),
});

export type EventFormInput = z.input<typeof eventSchema>;
export type EventFormSchemaFields = z.output<typeof eventSchema>;

export function createEventDefaultValues(): EventFormInput {
  return {
    dsTitle: "",
    dsDescription: "",

    dtStart: "",
    dtEnd: "",

    tpStatus: EventStatusEnum.SCHEDULED,
    tpEvent: EventTypeEnum.APPOINTMENT,
  };
}

export function mapEventToForm(event: EventType): EventFormInput {
  return {
    dsTitle: event.dsTitle,
    dsDescription: event.dsDescription ?? "",

    dtStart: event.dtStart,
    dtEnd: event.dtEnd,

    tpStatus: event.tpStatus,
    tpEvent: event.tpEvent,
  };
}