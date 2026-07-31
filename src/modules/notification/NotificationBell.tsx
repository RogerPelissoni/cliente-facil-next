"use client";

import { Button } from "@/components/ui/button";
import { CoreModal } from "@/src/shared/components/CoreModal";
import { useHasAuthority } from "@/src/modules/auth/auth.hooks";
import { useStompSubscription } from "@/src/shared/hooks/useStompSubscription";
import { Bell, Check, Send, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  notificationKeys,
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "./notification.hooks";
import { SendNotificationModal } from "./SendNotificationModal";
import { NotificationTypeEnum } from "./notification.type";

const typeStyles: Record<NotificationTypeEnum, string> = {
  INFO: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  SUCCESS: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  WARNING: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  ERROR: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
};

export function NotificationBell() {
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useNotifications();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: deleteNotification } = useDeleteNotification();
  const canSendNotification = useHasAuthority("NOTIFICATION_SEND");

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);

  const handleNewNotification = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: notificationKeys.mine });
  }, [queryClient]);

  useStompSubscription("/user/queue/notifications", handleNewNotification);

  const unreadCount = notifications.filter((notification) => notification.tpStatus === "UNREAD").length;

  function handleNotificationsOpenChange(open: boolean) {
    setIsNotificationsOpen(open);

    if (open && unreadCount > 0) {
      markAllAsRead();
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => handleNotificationsOpenChange(true)}
      >
        <Bell className="h-[1.2rem] w-[1.2rem]" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      <CoreModal
        open={isNotificationsOpen}
        title="Notificações"
        description="Últimas notificações recebidas"
        size="sm"
        onOpenChange={handleNotificationsOpenChange}
      >
        <div className="flex flex-col gap-3">
          {canSendNotification && (
            <Button type="button" variant="outline" className="self-end" onClick={() => setIsSendOpen(true)}>
              <Send className="h-4 w-4" />
              Enviar notificação
            </Button>
          )}

          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma notificação recebida ainda.</p>
          ) : (
            <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`flex items-start justify-between gap-2 rounded-md border p-2 text-sm ${typeStyles[notification.tpType]}`}
                >
                  <div>
                    <p className="font-medium">{notification.dsTitle}</p>
                    <p>{notification.dsMessage}</p>
                    <p className="text-xs opacity-70">{new Date(notification.createdAt).toLocaleString("pt-BR")}</p>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    {notification.tpStatus === "UNREAD" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        title="Marcar como lida"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      title="Excluir"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CoreModal>

      <SendNotificationModal open={isSendOpen} onOpenChange={setIsSendOpen} />
    </>
  );
}
