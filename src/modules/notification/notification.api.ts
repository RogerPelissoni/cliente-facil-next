import { IdentifierType } from "@/src/shared/types/form.type";
import { api } from "@/src/shared/utils/http.util";
import { NotificationType, NotificationTypeEnum } from "./notification.type";

const notificationApi = {
  findMine() {
    return api.get<NotificationType[]>("/notifications");
  },

  markAllAsRead() {
    return api.patch<NotificationType[]>("/notifications/read-all");
  },

  markAsRead(id: IdentifierType) {
    return api.patch<NotificationType>(`/notifications/${id}/read`);
  },

  delete(id: IdentifierType) {
    return api.delete<void>(`/notifications/${id}`);
  },

  publishTest(data: { content: string; type?: NotificationTypeEnum }) {
    return api.post<void>("/notifications/test", data);
  },

  send(data: { userIds: IdentifierType[]; title: string; message: string; type?: NotificationTypeEnum }) {
    return api.post<void>("/notifications/send", data);
  },
};

export const findMyNotifications = notificationApi.findMine;
export const markAllNotificationsAsRead = notificationApi.markAllAsRead;
export const markNotificationAsRead = notificationApi.markAsRead;
export const deleteNotification = notificationApi.delete;
export const publishTestNotification = notificationApi.publishTest;
export const sendNotification = notificationApi.send;
