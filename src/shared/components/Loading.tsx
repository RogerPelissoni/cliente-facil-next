interface Props {
  message?: string;
}

export function Loading({ message }: Props) {
  return <div className="py-8 text-center">{message ?? "Carregando..."}</div>;
}
