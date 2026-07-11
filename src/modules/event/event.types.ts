import { EventStatusEnum, EventStatusEnumType } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum, EventTypeEnumType } from "@/src/enum/eventType.enum";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface EventType {
  id: IdentifierType;
  dsTitle: string;
  dsDescription: string | null;
  dtStart: Date;
  dtEnd: Date;
  tpStatus: keyof typeof EventStatusEnum;
  tpEvent: keyof typeof EventTypeEnum;
}

export interface EventFiltersType {
  dsTitle: string;
  tpStatus?: EventStatusEnumType;
  tpEvent?: EventTypeEnumType;
}