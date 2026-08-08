import { api } from "@/src/shared/utils/http.util";
import { MailConfigFormSchemaFields, toMailConfigRequest } from "./mailConfig.schema";
import { MailConfigType } from "./mailConfig.type";

const RESOURCE = "/mail-configs";

export type MailConfigScope = "BASE" | "COMPANY";

function scopePath(scope: MailConfigScope) {
  return scope === "BASE" ? `${RESOURCE}/base` : `${RESOURCE}/company`;
}

// Bespoke em vez de createCrudApi: mail_config é um singleton por escopo (no máximo 1 config base +
// 1 por empresa), não uma lista — mesmo espírito do MailConfigController no backend (GET/PUT em
// /base e /company, sem create/delete/search).
const mailConfigApi = {
  find(scope: MailConfigScope) {
    return api.get<MailConfigType>(scopePath(scope));
  },

  upsert(scope: MailConfigScope, data: MailConfigFormSchemaFields) {
    return api.put<MailConfigType>(scopePath(scope), toMailConfigRequest(data));
  },

  // Testa os dados ATUAIS do formulário (possivelmente não salvos), não a config persistida —
  // ver POST /mail-configs/test-draft no backend.
  testDraft(scope: MailConfigScope, data: MailConfigFormSchemaFields, to: string) {
    return api.post<void>(`${RESOURCE}/test-draft`, { ...toMailConfigRequest(data), scope, to });
  },
};

export const findMailConfig = mailConfigApi.find;
export const upsertMailConfig = mailConfigApi.upsert;
export const testMailConfigDraft = mailConfigApi.testDraft;
