import { EventStatusEnumType } from "@/src/enum/eventStatus.enum";
import { EventTypeEnumType } from "@/src/enum/eventType.enum";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface EventType {
  id: IdentifierType;

  dsTitle: string;
  dsDescription: string | null;

  dtStart: string;
  dtEnd: string;

  tpStatus: EventStatusEnumType;
  tpEvent: EventTypeEnumType;
}

export interface EventFiltersType {
  dsTitle: string;
  tpStatus?: EventStatusEnumType;
  tpEvent?: EventTypeEnumType;
}