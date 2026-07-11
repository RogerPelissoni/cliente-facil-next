import { createCrudApi } from "@/src/shared/utils/api.util";
import { api } from "@/src/shared/utils/http.util";
import { EventFormSchemaFields } from "./event.schema";
import { EventFiltersType, EventType } from "./event.types";

const eventApi = {
  ...createCrudApi<EventType, EventFormSchemaFields, EventFiltersType>("/event"),
};

export const searchEvents = eventApi.search;
export const findEventById = eventApi.findById;
export const createEvent = eventApi.create;
export const updateEvent = eventApi.update;
export const deleteEvent = eventApi.delete;

export const findEventByAuthUser = () => {
  return api.get<EventType[]>('/event/findByAuthUser');
}
