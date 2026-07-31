import { IdentifierType } from "@/src/shared/types/form.type";

export interface NotificationDeadLetterType {
  id: IdentifierType;
  dsPayload: string;
  dsErrorReason: string | null;
  nrDeathCount: number | null;
  dtFailedAt: string | null;
  dtResolved: string | null;
  createdAt: string;
}

export type DeadLetterStatusFilter = "ALL" | "PENDING" | "RESOLVED";

export interface NotificationDeadLetterFiltersType {
  dsErrorReason: string;
  status: DeadLetterStatusFilter;
}

export interface NotificationDeadLetterStatsType {
  totalPending: number;
  totalResolved: number;
  totalLast24h: number;
}
