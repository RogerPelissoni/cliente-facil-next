"use client";

import { LoginFormData, loginSchema } from "@/src/modules/login/login.schema";
import CoreButton from "@/src/shared/components/CoreButton";
import CardComponent from "@/src/shared/components/CardComponent";
import { FormInput } from "@/src/shared/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setError(null);

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const json = await response.json().catch(() => null);
      setError(json?.error ?? "Não foi possível entrar. Verifique suas credenciais.");
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

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex items-center justify-between mt-2">
                <Link href="/auth/forgot-password" className="text-sm underline">
                  Esqueci minha senha
                </Link>

                <CoreButton type="submit">Entrar</CoreButton>
              </div>
            </form>
          </>
        }
      />
    </div>
  );
}
