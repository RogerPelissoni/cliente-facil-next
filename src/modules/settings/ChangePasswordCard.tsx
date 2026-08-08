"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { createSubmitHandler, parseSubmit } from "@/src/shared/utils/form.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useChangePassword } from "./settings.hooks";
import {
  ChangePasswordFormInput,
  ChangePasswordFormSchemaFields,
  changePasswordSchema,
  createChangePasswordDefaultValues,
} from "./settings.schema";

export function ChangePasswordCard() {
  const changePassword = useChangePassword();

  const form = useForm<ChangePasswordFormInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: createChangePasswordDefaultValues(),
  });

  async function onSubmit(payload: ChangePasswordFormSchemaFields) {
    await changePassword.mutateAsync(payload);
    form.reset(createChangePasswordDefaultValues());
  }

  const onError = (errors: FieldErrors<ChangePasswordFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, parseSubmit(changePasswordSchema, onSubmit), onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="currentPassword" label="Senha atual" type="password" size={12} />
            <FormInput form={form} name="newPassword" label="Nova senha" type="password" size={6} />
            <FormInput form={form} name="confirmPassword" label="Confirmar nova senha" type="password" size={6} />
          </FormGrid>

          <div className="flex justify-end">
            <Button type="submit" disabled={changePassword.isPending}>
              Alterar senha
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
