"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MailEncryptionEnum } from "@/src/enum/mailEncryption.enum";
import { useCurrentUser, useHasAuthority } from "@/src/modules/auth/auth.hooks";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormNumberInput } from "@/src/shared/components/FormNumberInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { BooleanEnum } from "@/src/shared/enum/boolean.enum";
import { createSubmitHandler, parseSubmit } from "@/src/shared/utils/form.util";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { MailConfigScope } from "./mailConfig.api";
import { useMailConfig, useTestMailConfigDraft, useUpsertMailConfig } from "./mailConfig.hooks";
import {
  createMailConfigDefaultValues,
  MailConfigFormInput,
  MailConfigFormSchemaFields,
  mailConfigSchema,
  mapMailConfigToForm,
} from "./mailConfig.schema";

interface Props {
  // COMPANY = config da empresa autenticada (card em /dashboard/settings); BASE = config do sistema,
  // usada como fallback pra e-mails sem empresa associada (tela admin, mesma permissão do backend —
  // ver MailConfigController).
  scope?: MailConfigScope;
}

export function MailConfigCard({ scope = "COMPANY" }: Props) {
  const canManage = useHasAuthority("MAIL_CONFIG_MANAGE");
  const currentUser = useCurrentUser();

  const query = useMailConfig(scope);
  const upsertMailConfig = useUpsertMailConfig(scope);
  const testMailConfigDraft = useTestMailConfigDraft(scope);

  const [testTo, setTestTo] = useState("");

  const form = useForm<MailConfigFormInput>({
    resolver: zodResolver(mailConfigSchema),
    defaultValues: createMailConfigDefaultValues(),
  });

  useEffect(() => {
    if (query.data) {
      form.reset(mapMailConfigToForm(query.data));
    }
  }, [query.data, form]);

  useEffect(() => {
    if (currentUser.data?.email && !testTo) {
      setTestTo(currentUser.data.email);
    }
  }, [currentUser.data, testTo]);

  async function onSubmit(payload: MailConfigFormSchemaFields) {
    await upsertMailConfig.mutateAsync(payload);
  }

  const onError = (errors: FieldErrors<MailConfigFormInput>) => {
    console.log("Erros:", errors);
  };

  async function onTestConnection() {
    const valid = await form.trigger();

    if (!valid || !testTo) {
      return;
    }

    const data = mailConfigSchema.parse(form.getValues());

    await testMailConfigDraft.mutateAsync({ data, to: testTo });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{scope === "BASE" ? "Configuração de E-mail — Base do Sistema" : "Configurações de E-mail"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, parseSubmit(mailConfigSchema, onSubmit), onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="dsHost" label="Host SMTP" placeholder="smtp.exemplo.com" size={8} />
            <FormNumberInput form={form} name="nrPort" label="Porta" size={4} min={1} max={65535} />
            <FormInput form={form} name="dsUsername" label="Usuário" size={6} />
            <FormInput
              form={form}
              name="dsPassword"
              label="Senha"
              type="password"
              placeholder={query.data?.hasPassword ? "Deixe em branco para manter a atual" : ""}
              size={6}
            />
            <FormSelect form={form} name="tpEncryption" label="Criptografia" options={toOptions(MailEncryptionEnum)} size={4} />
            <FormInput form={form} name="dsFromName" label="Nome do remetente" size={4} />
            <FormInput form={form} name="dsFromAddress" label="E-mail do remetente" size={4} />
            <FormSelect form={form} name="flActive" label="Ativo" options={toOptions(BooleanEnum)} size={4} />
          </FormGrid>

          {canManage && (
            <FormGrid>
              <div className="col-span-12 space-y-2 md:col-span-8">
                <label className="text-sm font-medium">Enviar teste para</label>
                <Input value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="destinatario@exemplo.com" />
              </div>
            </FormGrid>
          )}

          {canManage && (
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onTestConnection}
                disabled={testMailConfigDraft.isPending}
              >
                Testar Conexão
              </Button>

              <Button type="submit" disabled={upsertMailConfig.isPending}>
                Salvar
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
