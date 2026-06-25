"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Erro ao carregar dados",
  description = "Ocorreu um erro inesperado.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <TriangleAlert className="h-10 w-10 text-destructive" />

      <div className="text-center">
        <h3 className="font-semibold">{title}</h3>

        <p className="text-muted-foreground">{description}</p>
      </div>

      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
