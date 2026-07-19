import { IdentifierType } from "@/src/shared/types/form.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { createEventMessage, deleteEventMessage, findEventMessageById, findEventMessagesByEvent, updateEventMessage } from "./eventMessage.api";
import { EventMessageFormSchemaFields } from "./eventMessage.schema";
import { EventMessageType } from "./eventMessage.type";

export const eventMessageKeys = {
  byEvent: ["messagesByEvent"] as const,
  byId: ["byId"] as const,
};

export function useEventMessagesByEvent(eventId?: IdentifierType) {
  return useQuery({
    queryKey: eventMessageKeys.byEvent,
    queryFn: () => findEventMessagesByEvent(eventId),
    enabled: !!eventId,
  });
}

export function useEventMessage(id?: IdentifierType) {
  return useQuery({
    queryKey: eventMessageKeys.byId,
    queryFn: () => findEventMessageById(id),
    enabled: !!id,
  });
}

export function useCreateEventMessage() {
  return useApiMutation({
    mutationFn: createEventMessage,
    invalidateQueries: [eventMessageKeys.byEvent, eventMessageKeys.byId],
  });
}

export function useUpdateEventMessage() {
  return useApiMutation<EventMessageType, { id: IdentifierType; data: EventMessageFormSchemaFields }>({
    mutationFn: ({ id, data }) => updateEventMessage(id, data),
    invalidateQueries: [eventMessageKeys.byEvent, eventMessageKeys.byId],
  });
}

export function useDeleteEventMessage() {
  return useApiMutation({
    mutationFn: deleteEventMessage,
    invalidateQueries: [eventMessageKeys.byEvent, eventMessageKeys.byId],
  });
}
