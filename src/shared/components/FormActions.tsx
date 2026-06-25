import { Button } from "@/components/ui/button";

interface Props {
  onCancel: () => void;
  loading?: boolean;
}

export function FormActions({ onCancel, loading }: Props) {
  return (
    <div className="flex gap-2">
      <Button type="submit" disabled={loading}>
        Salvar
      </Button>

      <Button type="button" variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  );
}
