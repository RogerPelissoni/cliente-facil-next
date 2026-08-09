"use client";

import { LoginFormData, loginSchema } from "@/src/modules/login/login.schema";
import CoreButton from "@/src/shared/components/CoreButton";
import { FormInput } from "@/src/shared/components/FormInput";
import { Logo } from "@/src/shared/components/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const actualYear = new Date().getFullYear();

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
    <div className="flex min-h-[85vh] items-center justify-center p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border shadow-sm">
        {/* Painel de marca — só em telas médias+, a tela de login em si continua funcional (e mais
            simples) no celular sem esse painel competindo por espaço com o formulário. */}
        <div className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground md:flex md:w-1/2">
          <Logo inverted iconClassName="h-10 w-10" textClassName="text-2xl" />

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao Cliente Fácil</h1>
            <p className="mt-2 text-primary-foreground/80">Sistema de Gestão Empresarial</p>
          </div>

          <p className="text-sm text-primary-foreground/60">© {actualYear} Cliente Fácil</p>
        </div>

        <div className="flex w-full items-center justify-center bg-background p-8 md:w-1/2">
          <div className="w-full max-w-sm">
            <div className="mb-8 md:hidden">
              <Logo />
            </div>

            <h2 className="text-xl font-semibold">Entrar</h2>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">
              Acesse sua conta pra continuar
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput form={form} name="email" label="E-mail" placeholder="Digite o e-mail" size={12} />

              <FormInput
                form={form}
                type="password"
                name="password"
                label="Senha"
                placeholder="Digite a senha"
                size={12}
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="mt-4 flex items-center justify-between">
                <Link href="/auth/forgot-password" className="text-sm underline">
                  Esqueci minha senha
                </Link>

                <CoreButton type="submit">Entrar</CoreButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
