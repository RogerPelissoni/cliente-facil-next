"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input placeholder="Nome" {...form.register("name")} />
      </div>

      <div>
        <input placeholder="Email" {...form.register("email")} />
      </div>

      <div className="flex gap-2">
        <button type="submit">Salvar</button>

        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
