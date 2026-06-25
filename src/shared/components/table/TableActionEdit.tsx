"use client";

import { Button } from "@/components/ui/button";

interface Props {
  onClick(): void;
  disabled?: boolean;
}

export function TableActionEdit({ onClick, disabled }: Props) {
  return (
    <Button size="sm" variant="outline" onClick={onClick} disabled={disabled}>
      Editar
    </Button>
  );
}
