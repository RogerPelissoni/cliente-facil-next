"use client";

import CardComponent from "@/src/shared/components/CardComponent";
import CoreButton from "@/src/shared/components/CoreButton";
import { FormInput } from "@/src/shared/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setError(null);

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const json = await response.json().catch(() => null);
      setError(json?.error ?? "Não foi possível processar o pedido.");
      return;
    }

    // Mensagem sempre igual, exista ou não o e-mail — o backend também não diferencia
    // (POST /auth/forgot-password), pra não dar pista de quais e-mails têm conta no sistema.
    setSent(true);
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <CardComponent
        divClass="w-fit"
        title="Esqueci minha senha"
        content={
          sent ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Se o e-mail informado tiver uma conta, enviamos um link para redefinir a senha.
              </p>
              <Link href="/auth/login" className="text-sm underline">
                Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput form={form} name="email" label="E-mail" placeholder="Digite o e-mail" />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex items-center justify-between mt-2">
                <Link href="/auth/login" className="text-sm underline">
                  Voltar para o login
                </Link>

                <CoreButton type="submit">Enviar link</CoreButton>
              </div>
            </form>
          )
        }
      />
    </div>
  );
}
