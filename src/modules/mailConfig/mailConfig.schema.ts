import { MailEncryptionEnum } from "@/src/enum/mailEncryption.enum";
import { BooleanEnum, fromBooleanEnum, toBooleanEnum } from "@/src/shared/enum/boolean.enum";
import { zEnum, zString } from "@/src/shared/utils/schema.util";
import { z } from "zod";
import { MailConfigType } from "./mailConfig.type";

// dsPassword em branco = mantém a senha já salva (mesma semântica do backend, ver
// MailConfigRequest/MailConfigService) — por isso é opcional aqui, diferente dos outros campos.
export const mailConfigSchema = z.object({
  dsHost: zString("Informe o host"),
  nrPort: z.number({ message: "Informe a porta" }).int().min(1).max(65535),
  dsUsername: z.string().trim().optional(),
  dsPassword: z.string().trim().optional(),
  tpEncryption: zEnum(MailEncryptionEnum),
  dsFromName: zString("Informe o nome do remetente"),
  dsFromAddress: zString("Informe o e-mail do remetente").email("E-mail inválido"),
  flActive: zEnum(BooleanEnum),
});

export type MailConfigFormInput = z.input<typeof mailConfigSchema>;
export type MailConfigFormSchemaFields = z.output<typeof mailConfigSchema>;

export function createMailConfigDefaultValues(): MailConfigFormInput {
  return {
    dsHost: "",
    nrPort: 587,
    dsUsername: "",
    dsPassword: "",
    tpEncryption: "TLS",
    dsFromName: "",
    dsFromAddress: "",
    flActive: "true",
  };
}

export function mapMailConfigToForm(config: MailConfigType): MailConfigFormInput {
  return {
    dsHost: config.dsHost,
    nrPort: config.nrPort,
    dsUsername: config.dsUsername ?? "",
    dsPassword: "",
    tpEncryption: config.tpEncryption as MailConfigFormInput["tpEncryption"],
    dsFromName: config.dsFromName,
    dsFromAddress: config.dsFromAddress,
    flActive: toBooleanEnum(config.flActive),
  };
}

// Converte flActive de volta pra boolean antes de mandar pro backend (MailConfigRequest.flActive é
// boolean, não a string "true"/"false" que o form/FormSelect usam internamente).
export function toMailConfigRequest(data: MailConfigFormSchemaFields) {
  return {
    ...data,
    flActive: fromBooleanEnum(data.flActive),
  };
}
