"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleEnum } from "@/src/enum/role.enum";
import { FormActions } from "@/src/shared/components/FormActions";
import { FormGrid } from "@/src/shared/components/FormGrid";
import { FormInput } from "@/src/shared/components/FormInput";
import { FormSelect } from "@/src/shared/components/FormSelect";
import { toOptions } from "@/src/shared/utils/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser } from "./user.mutation";
import { createUserDefaultValues, mapUserToForm, UserFormInput, userSchema } from "./user.schema";
import { KeyValue, User } from "./user.types";

interface Props {
  user?: User | null;
  companies: KeyValue;
  profiles: KeyValue;
  people: KeyValue;
  onCancel: () => void;
  onSuccess: () => void;
}

export function UserForm({ user, companies, profiles, people, onCancel, onSuccess }: Props) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const form = useForm<UserFormInput>({
    resolver: zodResolver(userSchema),
    defaultValues: createUserDefaultValues(),
  });

  useEffect(() => {
    if (user) {
      form.reset(mapUserToForm(user));
    } else {
      form.reset(createUserDefaultValues());
    }
  }, [user]);

  async function onSubmit(data: UserFormInput) {
    if (user) {
      await updateUser.mutateAsync({
        id: user.id,
        data,
      });
    } else {
      await createUser.mutateAsync(data);
    }

    onSuccess();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormGrid>
            <FormInput form={form} name="name" label="Nome" placeholder="Digite o nome" />
            <FormInput form={form} name="email" label="E-mail" placeholder="Digite o e-mail" />

            <FormInput
              form={form}
              name="password"
              type="password"
              label={user ? "Nova senha" : "Senha"}
              placeholder={user ? "Informe apenas para alterar" : "Digite a senha"}
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
