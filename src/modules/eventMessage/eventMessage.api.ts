import { IdentifierType } from "@/src/shared/types/form.type";
import { createCrudApi } from "@/src/shared/utils/api.util";
import { api } from "@/src/shared/utils/http.util";
import { EventMessageFormSchemaFields } from "./eventMessage.schema";
import { EventMessageFiltersType, EventMessageType } from "./eventMessage.type";

const eventMessageApi = {
  ...createCrudApi<EventMessageType, EventMessageFormSchemaFields, EventMessageFiltersType>("/eventMessage"),

  findByEvent(eventId?: IdentifierType) {
    return api.get<EventMessageType[]>(`/eventMessage/event/${eventId}`);
  },
};

export const findEventMessagesByEvent = eventMessageApi.findByEvent;
export const findEventMessageById = eventMessageApi.findById;
export const createEventMessage = eventMessageApi.create;
export const updateEventMessage = eventMessageApi.update;
export const deleteEventMessage = eventMessageApi.delete;
