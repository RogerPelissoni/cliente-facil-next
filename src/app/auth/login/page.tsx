"use client";

import { LoginFormData, loginSchema } from "@/src/modules/login/login.schema";
import CoreButton from "@/src/shared/components/CoreButton";
import CardComponent from "@/src/shared/components/CardComponent";
import { FormInput } from "@/src/shared/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <CardComponent
        divClass="w-fit"
        title="Login"
        content={
          <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                form={form}
                name="email"
                label="E-mail"
                placeholder="Digite o e-mail"
              />

              <FormInput
                form={form}
                type="password"
                name="password"
                label="Senha"
                placeholder="Digite a senha"
              />

              <div className="flex justify-end">
                <CoreButton type="submit">Entrar</CoreButton>
              </div>
            </form>
          </>
        }
      />
    </div>
  );
}
