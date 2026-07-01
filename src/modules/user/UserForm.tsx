"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleEnum } from "@/src/enum/role.enum";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { KeyValueType } from "@/src/shared/types/core.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { createSubmitHandler, resetForm } from "@/src/shared/utils/form.util";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser, useUser } from "./user.hooks";
import { createUserDefaultValues, mapUserToForm, UserFormInput, userSchema } from "./user.schema";

interface Props {
  id?: IdentifierType;
  companies: KeyValueType;
  profiles: KeyValueType;
  people: KeyValueType;
  onCancel: () => void;
  onSuccess: () => void;
}

export function UserForm({ id, companies, profiles, people, onCancel, onSuccess }: Props) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const query = useUser(id);

  const form = useForm<UserFormInput>({
    resolver: zodResolver(userSchema),
    defaultValues: createUserDefaultValues(),
  });

  useEffect(() => {
    resetForm({
      id,
      form,
      data: query.data,
      defaultValues: createUserDefaultValues(),
      mapToForm: mapUserToForm,
    });
  }, [id, query.data, form]);

  async function onSubmit(data: UserFormInput) {
    if (id) {
      await updateUser.mutateAsync({ id, data });
    } else {
      await createUser.mutateAsync(data);
    }

    onSuccess();
  }

  const onError = (errors: FieldErrors<UserFormInput>) => {
    console.log("Erros:", errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={createSubmitHandler(form, onSubmit, onError)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="name" label="Nome" placeholder="Digite o nome" />
            <FormInput form={form} name="email" label="E-mail" placeholder="Digite o e-mail" />

            <FormInput
              form={form}
              name="password"
              type="password"
              label={id ? "Nova senha" : "Senha"}
              placeholder={id ? "Informe apenas para alterar" : "Digite a senha"}
            />

            <FormSelect form={form} name="role" label="Cargo" options={toOptions(RoleEnum)} />
            <FormSelect form={form} name="personId" label="Pessoa" options={toOptions(people)} />
            <FormSelect form={form} name="profileId" label="Perfil" options={toOptions(profiles)} />
            <FormSelect form={form} name="companyId" label="Empresa" options={toOptions(companies)} />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createUser.isPending || updateUser.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
