"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/shared/form/FormActions";
import { FormInput } from "@/shared/form/FormInput";
import { FormSelect } from "@/shared/form/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCompanies } from "../company/company.api";
import { useCreateUser, useUpdateUser } from "./user.api";
import { UserFormData, userSchema } from "./user.schema";
import { User } from "./user.types";
import z from "zod";

interface Props {
  user?: User | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function UserForm({ user, onCancel, onSuccess }: Props) {
  const { data: companies = [] } = useCompanies();

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const form = useForm<
    z.input<typeof userSchema>,
    any,
    z.output<typeof userSchema>
  >({
    resolver: zodResolver(userSchema),

    defaultValues: {
      name: "",
      email: "",
      status: "ACTIVE",
      companyId: 0,
    },
  });

  const name = form.watch("name");

  useEffect(() => {
    if (!user) {
      form.reset({
        name: "",
        email: "",
        status: "ACTIVE",
        companyId: 0,
      });

      return;
    }

    form.reset({
      name: user.name,
      email: user.email,
      status: user.status,
      companyId: user.companyId,
    });
  }, [user, form]);

  useEffect(() => {
    // Não alterar automaticamente em edição
    if (user) {
      return;
    }

    // Limpa o e-mail se o nome for vazio
    if (!name?.trim()) {
      form.setValue("email", "", {
        shouldValidate: true,
      });

      return;
    }

    const generatedEmail = `${name
      .trim()
      .toLowerCase()
      .replaceAll(" ", ".")}@email.com`;

    form.setValue("email", generatedEmail, {
      shouldValidate: true,
    });
  }, [name, user, form]);

  async function onSubmit(data: UserFormData) {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            form={form}
            name="name"
            label="Nome"
            placeholder="Digite o nome"
          />

          <FormInput
            form={form}
            name="email"
            label="E-mail"
            placeholder="Digite o e-mail"
          />

          <FormSelect
            form={form}
            name="status"
            label="Status"
            options={[
              {
                value: "ACTIVE",
                label: "Ativo",
              },
              {
                value: "INACTIVE",
                label: "Inativo",
              },
            ]}
          />

          <FormSelect
            form={form}
            name="companyId"
            label="Empresa"
            options={companies.map((company) => ({
              value: String(company.id),
              label: company.tradeName,
            }))}
          />

          <FormActions
            onCancel={onCancel}
            loading={createUser.isPending || updateUser.isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
}
