export const EventStatusEnum = {
  SCHEDULED: "Agendado",
  CONFIRMED: "Confirmado",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
  MISSED: "Não compareceu",
} as const;

export type EventStatusEnumType = (typeof EventStatusEnum)[keyof typeof EventStatusEnum];