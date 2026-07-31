import { IdentifierType } from "@/src/shared/types/form.type";

export type NotificationTypeEnum = "INFO" | "SUCCESS" | "WARNING" | "ERROR";
export type NotificationStatusEnum = "UNREAD" | "READ" | "ARCHIVED";

export interface NotificationType {
  id: IdentifierType;
  userId: IdentifierType;
  tpType: NotificationTypeEnum;
  tpStatus: NotificationStatusEnum;
  dsTitle: string;
  dsMessage: string;
  dtRead: string | null;
  createdAt: string;
}
