import { EventStatusEnum } from "@/src/enum/eventStatus.enum";
import { EventTypeEnum } from "@/src/enum/eventType.enum";

type EventTypeKey = keyof typeof EventTypeEnum;
type EventStatusKey = keyof typeof EventStatusEnum;

// Fundo em tom baixo (mesma cor da borda, ~10% opacidade) — o tipo já fica marcado pela borda,
// o fundo só precisa dar contraste suficiente pro texto sem competir com a cor do status (bullet).
export const EVENT_TYPE_COLORS: Record<
  EventTypeKey,
  { border: string; background: string; text: string }
> = {
  SERVICE: {
    border: "#3b82f6",
    background: "#3b82f61a",
    text: "#1d4ed8",
  },
  APPOINTMENT: {
    border: "#10b981",
    background: "#10b9811a",
    text: "#047857",
  },
  PERSONAL: {
    border: "#64748b",
    background: "#64748b1a",
    text: "#334155",
  },
};

export const EVENT_STATUS_COLORS: Record<EventStatusKey, string> = {
  SCHEDULED: "#0ea5e9",
  CONFIRMED: "#22c55e",
  IN_PROGRESS: "#f59e0b",
  COMPLETED: "#0d9488",
  CANCELLED: "#ef4444",
  MISSED: "#78716c",
};
