"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormActions } from "@/shared/form/FormActions";
import { FormInput } from "@/shared/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateUser, useUpdateUser } from "./user.api";
import { userSchema } from "./user.schema";
import { User, UserFormData } from "./user.types";

interface Props {
  user?: User | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export function UserForm({ user, onCancel, onSuccess }: Props) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!user) {
      form.reset({
        name: "",
        email: "",
      });

      return;
    }

    form.reset({
      name: user.name,
      email: user.email,
    });
  }, [user, form]);

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

          <FormActions
            onCancel={onCancel}
            loading={createUser.isPending || updateUser.isPending}
          />
        </form>
      </CardContent>
    </Card>
  );
}
