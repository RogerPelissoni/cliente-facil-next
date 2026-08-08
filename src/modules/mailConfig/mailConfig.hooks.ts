import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { findMailConfig, MailConfigScope, testMailConfigDraft, upsertMailConfig } from "./mailConfig.api";
import { MailConfigFormSchemaFields } from "./mailConfig.schema";

export const mailConfigKeys = {
  detail: (scope: MailConfigScope) => ["mailConfig", scope] as const,
};

// A empresa (ou o sistema, no caso do escopo BASE) pode ainda não ter uma config salva — o backend
// responde com erro nesse caso (não é uma condição excepcional de verdade, é o estado inicial
// esperado), então tratamos como "formulário vazio" (data = null) em vez de propagar como erro de
// query (evita mostrar uma tela de erro só porque ninguém salvou uma config ainda).
export function useMailConfig(scope: MailConfigScope) {
  return useQuery({
    queryKey: mailConfigKeys.detail(scope),
    queryFn: async () => {
      try {
        return await findMailConfig(scope);
      } catch {
        return null;
      }
    },
  });
}

export function useUpsertMailConfig(scope: MailConfigScope) {
  return useApiMutation({
    mutationFn: (data: MailConfigFormSchemaFields) => upsertMailConfig(scope, data),
    invalidateQueries: [mailConfigKeys.detail(scope)],
    successMessage: "Configuração de e-mail salva com sucesso",
  });
}

export function useTestMailConfigDraft(scope: MailConfigScope) {
  return useApiMutation<void, { data: MailConfigFormSchemaFields; to: string }>({
    mutationFn: ({ data, to }) => testMailConfigDraft(scope, data, to),
    successMessage: "E-mail de teste enviado com sucesso",
  });
}
