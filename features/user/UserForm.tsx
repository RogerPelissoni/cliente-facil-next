"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleEnum } from "@/enum/role.enum";
import { FormGrid } from "@/shared/components/FormGrid";
import { FormActions } from "@/shared/form/FormActions";
import { FormInput } from "@/shared/form/FormInput";
import { FormSelect } from "@/shared/form/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser } from "./user.mutation";
import { UserFormSchemaFields, userSchema } from "./user.schema";
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
  console.log("people", people);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const form = useForm<UserFormSchemaFields>({
    resolver: zodResolver(userSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      personId: undefined,
      profileId: undefined,
      companyId: undefined,
    },
  });

  useEffect(() => {
    if (!user) {
      form.reset({
        name: "",
        email: "",
        password: "",
        role: undefined,
        personId: undefined,
        profileId: undefined,
        companyId: undefined,
      });

      return;
    }

    form.reset({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      personId: user.personId,
      profileId: user.profileId,
      companyId: user.companyId,
    });
  }, [user, form]);

  async function onSubmit(data: UserFormSchemaFields) {
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

            <FormSelect
              form={form}
              name="role"
              label="Cargo"
              options={Object.entries(RoleEnum).map(([value, label]) => ({
                value,
                label,
              }))}
            />

            <FormSelect
              form={form}
              name="personId"
              label="Pessoa"
              options={Object.entries(people).map(([value, label]) => ({
                value,
                label,
              }))}
            />

            <FormSelect
              form={form}
              name="profileId"
              label="Perfil"
              options={Object.entries(profiles).map(([value, label]) => ({
                value,
                label,
              }))}
            />

            <FormSelect
              form={form}
              name="companyId"
              label="Empresa"
              options={Object.entries(companies).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </FormGrid>

          <FormActions onCancel={onCancel} loading={createUser.isPending || updateUser.isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
