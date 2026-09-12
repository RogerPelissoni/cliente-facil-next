import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";
import { PageResponse } from "@/src/shared/types/api.type";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";

export interface EventReportFiltersType {
  dtStart: string;
  dtEnd: string;
  tpStatus: keyof typeof EventStatusEnum | "";
  tpEvent: keyof typeof EventTypeEnum | "";
  clientId: IdentifierType | "";
  professionalId: IdentifierType | "";
  ownerId: IdentifierType | "";
}

export interface EventReportItemType {
  id: IdentifierType;
  dsTitle: string;
  dtStart: Date;
  dtEnd: Date;
  tpStatus: keyof typeof EventStatusEnum;
  tpEvent: keyof typeof EventTypeEnum;
  clientId: IdentifierType | null;
  clientName: string | null;
  professionalId: IdentifierType | null;
  professionalName: string | null;
  vlTotal: number | null;
  ownerId: IdentifierType | null;
  ownerName: string | null;
}

export interface EventReportSummaryType {
  totalEvents: number;
  totalValue: number;
  countByStatus: Partial<Record<keyof typeof EventStatusEnum, number>>;
  countByType: Partial<Record<keyof typeof EventTypeEnum, number>>;
}

export interface EventReportDataType {
  summary: EventReportSummaryType;
  obEvent: PageResponse<EventReportItemType>;
  kvClient: KeyValueType;
  kvProfessional: KeyValueType;
}
