export const AccountReceivableStatusEnum = {
  PENDING: "Aguardando pagamento",
  PARTIALLY_PAID: "Pagamento parcial",
  PAID: "Pago integralmente",
  OVERDUE: "Vencido",
  CANCELLED: "Cancelado",
} as const;

export type AccountReceivableStatusEnumType = (typeof AccountReceivableStatusEnum)[keyof typeof AccountReceivableStatusEnum];