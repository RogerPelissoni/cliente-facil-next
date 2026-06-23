"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateUser } from "./user.api";
import { userSchema } from "./user.schema";
import { UserFormData } from "./user.types";

export function UserForm() {
  const createUser = useCreateUser();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: UserFormData) {
    await createUser.mutateAsync(data);

    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input placeholder="Nome" {...form.register("name")} />

      <input placeholder="Email" {...form.register("email")} />

      <button type="submit">Salvar</button>
    </form>
  );
}
