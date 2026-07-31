import { useQuery } from "@tanstack/react-query";
import { findCurrentUser } from "./auth.api";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: findCurrentUser,
  });
}

// Uso: const canSend = useHasAuthority("NOTIFICATION_SEND");
// Retorna false enquanto carrega (falha fechado: some por padrão até confirmar que pode).
// Isso só controla o que a UI oferece — a permissão de verdade é sempre imposta pelo backend
// via @PreAuthorize; esconder o botão aqui evita oferecer uma ação que vai falhar com 403.
export function useHasAuthority(authority: string): boolean {
  const { data } = useCurrentUser();

  return data?.authorities.includes(authority) ?? false;
}
