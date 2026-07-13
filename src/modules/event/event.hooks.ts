import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import {
  createEvent,
  deleteEvent,
  findEventByAuthUser,
  findEventById,
  screenEvent,
  searchEvents,
  updateEvent,
} from "./event.api";
import { EventFormSchemaFields } from "./event.schema";
import { EventFiltersType, EventType } from "./event.types";

export const eventKeys = {
  all: ["event"] as const,

  list: (filters: EventFiltersType, page: number, size: number, sorting: Sorting) =>
    ["event", "list", filters, page, size, sorting] as const,

  screen: () => ["users", "screen"] as const,

  detail: (id?: IdentifierType) => ["event", "detail", id] as const,

  byAuthUser: () => ["event", "byAuthUser"] as const,
};

export function useEventScreen() {
  return useQuery({
    queryKey: eventKeys.screen(),
    queryFn: () => screenEvent(),
  });
}

export function useEvents({ filters, page, size, sorting }: QueryParamsType<EventFiltersType>) {
  return useQuery({
    queryKey: eventKeys.list(filters, page, size, sorting),
    queryFn: () => searchEvents(filters, page, size, sorting),
  });
}

export function useEvent(id?: IdentifierType) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => findEventById(id),
    enabled: !!id,
  });
}

export function useEventByAuthUser() {
  return useQuery({
    queryKey: eventKeys.byAuthUser(),
    queryFn: () => findEventByAuthUser(),
  })
}

export function useCreateEvent() {
  return useApiMutation({
    mutationFn: createEvent,
    invalidateQueries: [eventKeys.all, eventKeys.byAuthUser()],
  });
}

export function useUpdateEvent() {
  return useApiMutation<EventType, { id: IdentifierType; data: EventFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateEvent(id, data),
    invalidateQueries: [eventKeys.all, eventKeys.byAuthUser()],
  });
}

export function useDeleteEvent() {
  return useApiMutation({
    mutationFn: deleteEvent,
    invalidateQueries: [eventKeys.all, eventKeys.byAuthUser()],
  });
}
