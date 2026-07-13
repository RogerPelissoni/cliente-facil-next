import { AccountReceivableStatusEnum } from "@/src/enum/accountReceivableStatus.enum";
import {
    zDate,
    zEnum,
    zIdentifier,
    zString,
} from "@/src/shared/utils/schema.util";
import { z } from "zod";

export const accountReceivableSchema = z.object({
    personId: zIdentifier(),
    dsCode: zString().max(50),
    nrInstallment: z.number(),
    vlTotal: z.number(),
    vlBalance: z.number(),
    daDue: zDate(),
    dtPaid: zDate().optional(),
    tpStatus: zEnum(AccountReceivableStatusEnum),
    dsObservation: z.string().optional(),
});

export type AccountReceivableFormInput = z.input<typeof accountReceivableSchema>;
export type AccountReceivableFormSchemaFields = z.output<typeof accountReceivableSchema>;

export const accountReceivableEventSchema = z.object({
    vlTotal: z.number(),
    daDue: zDate(),
});

export type AccountReceivableEventFormInput = z.input<typeof accountReceivableEventSchema>;
export type AccountReceivableEventFormSchemaFields = z.output<typeof accountReceivableEventSchema>;