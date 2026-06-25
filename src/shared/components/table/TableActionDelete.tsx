"use client";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "../ConfirmDialog";

interface Props {
  title: string;
  description: string;
  onConfirm(): void;
  disabled?: boolean;
}

export function TableActionDelete({ title, description, onConfirm, disabled }: Props) {
  return (
    <ConfirmDialog
      title={title}
      description={description}
      onConfirm={onConfirm}
      trigger={
        <Button size="sm" variant="destructive" disabled={disabled}>
          Excluir
        </Button>
      }
    />
  );
}
