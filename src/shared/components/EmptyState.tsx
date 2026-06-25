interface Props {
  message?: string;
}

export function EmptyState({ message = "Nenhum registro encontrado" }: Props) {
  return (
    <div className="py-10 text-center text-muted-foreground">{message}</div>
  );
}
