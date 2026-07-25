import { EventStatusEnum, EventStatusEnumType } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum, EventTypeEnumType } from "@/src/enum/eventType.enum";
import { KeyValueType } from "@/src/shared/types/core.type";
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

export type EventWithRelationsType = EventType & {
  eventService: {
    id: IdentifierType;
    clientId: IdentifierType;
    professionalId: IdentifierType;
    accountReceivableId: IdentifierType;
  };
  accountReceivable: {
    id: IdentifierType;
    vlTotal: number;
    daDue: Date;
  }
}

export interface EventFiltersType {
  dsTitle: string;
  tpStatus?: EventStatusEnumType;
  tpEvent?: EventTypeEnumType;
}

export interface EventScreenDataType {
  obEvent: EventType[];
  kvClient: KeyValueType;
  kvProfessional: KeyValueType;
}
