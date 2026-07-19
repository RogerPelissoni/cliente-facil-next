import { IdentifierType } from "@/src/shared/types/form.type";

export interface EventMessageType {
  id: IdentifierType;
  eventId: IdentifierType;
  dsMessage: string;
}

export interface EventMessageFiltersType {
  eventId: string;
}