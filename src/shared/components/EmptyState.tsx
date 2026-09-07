interface Props {
  message?: string;
}

export function EmptyState({ message = "Nenhum registro encontrado" }: Props) {
  return (
    <div className="text-muted-foreground py-10 text-center">{message}</div>
  );
}
