import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  findMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  sendNotification,
} from "./notification.api";

export const notificationKeys = {
  mine: ["notification", "mine"] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.mine,
    queryFn: findMyNotifications,
  });
}

// Marcar como lida (uma ou todas) dispara automaticamente ao abrir/clicar no sino, não é uma
// ação explícita tipo "salvar", por isso usa useMutation puro: evita um toast a cada clique.
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.mine }),
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.mine }),
  });
}

export function useDeleteNotification() {
  return useApiMutation({
    mutationFn: deleteNotification,
    invalidateQueries: [notificationKeys.mine],
    successMessage: "Notificação removida",
  });
}

export function useSendNotification() {
  return useApiMutation({
    mutationFn: sendNotification,
    successMessage: "Notificação enviada",
  });
}
