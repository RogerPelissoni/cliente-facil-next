"use client";

import CardComponent from "@/src/shared/components/CardComponent";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>(token ? "loading" : "error");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    fetch("/api/confirm-email", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (cancelled) {
          return;
        }

        if (!response.ok) {
          const json = await response.json().catch(() => null);
          setError(json?.error ?? "Não foi possível confirmar o e-mail.");
          setStatus("error");
          return;
        }

        setStatus("success");
      })
      .catch(() => {
        if (!cancelled) {
          setError("Não foi possível confirmar o e-mail.");
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <CardComponent
        divClass="w-fit"
        title="Confirmação de e-mail"
        content={
          <div className="space-y-4">
            {status === "loading" && <p className="text-sm text-muted-foreground">Confirmando seu e-mail...</p>}

            {status === "success" && (
              <p className="text-sm text-muted-foreground">E-mail confirmado com sucesso. Você já pode entrar.</p>
            )}

            {status === "error" && <p className="text-sm text-red-500">{error ?? "Link inválido — falta o token de confirmação."}</p>}

            <Link href="/auth/login" className="text-sm underline">
              Ir para o login
            </Link>
          </div>
        }
      />
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmEmailContent />
    </Suspense>
  );
}
