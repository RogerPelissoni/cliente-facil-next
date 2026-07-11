import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onCancel: () => void;
  loading?: boolean;
}

export function FormActions({ children, onCancel, loading }: Props) {
  return (
    <div className="flex justify-end gap-2">
      {children}

      <Button type="submit" disabled={loading}>
        Salvar
      </Button>

      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  );
}
