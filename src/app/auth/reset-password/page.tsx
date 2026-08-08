"use client";

import CardComponent from "@/src/shared/components/CardComponent";
import CoreButton from "@/src/shared/components/CoreButton";
import { FormInput } from "@/src/shared/components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setError(null);

    const response = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword: data.newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const json = await response.json().catch(() => null);
      setError(json?.error ?? "Não foi possível redefinir a senha.");
      return;
    }

    setDone(true);
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <CardComponent
        divClass="w-fit"
        title="Redefinir senha"
        content={
          !token ? (
            <p className="text-sm text-red-500">Link inválido — falta o token de redefinição.</p>
          ) : done ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Senha alterada com sucesso.</p>
              <Link href="/auth/login" className="text-sm underline">
                Ir para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput form={form} type="password" name="newPassword" label="Nova senha" placeholder="Digite a nova senha" />
              <FormInput
                form={form}
                type="password"
                name="confirmPassword"
                label="Confirmar nova senha"
                placeholder="Repita a nova senha"
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex justify-end mt-2">
                <CoreButton type="submit">Redefinir senha</CoreButton>
              </div>
            </form>
          )
        }
      />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
