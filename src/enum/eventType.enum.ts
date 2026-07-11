export const EventTypeEnum = {
    APPOINTMENT: "Atendimento",
    SERVICE: "Serviço",
    PERSONAL: "Compromisso Pessoal",
} as const;

export type EventTypeEnumType = (typeof EventTypeEnum)[keyof typeof EventTypeEnum];