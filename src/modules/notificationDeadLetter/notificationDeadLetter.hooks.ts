import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  findDeadLetterStats,
  resolveDeadLetter,
  searchDeadLetters,
  simulateEmailFailure,
  simulateNotificationFailure,
} from "./notificationDeadLetter.api";
import { NotificationDeadLetterFiltersType, NotificationDeadLetterType } from "./notificationDeadLetter.types";

// Falha simulada é assíncrona: publica na fila e só cai na DLQ depois do retry esgotar (~3s, ver
// application.yml). Reinvalida a lista um pouco depois do sucesso da chamada, pra já puxar o
// registro novo sem o usuário precisar dar refresh manual.
const SIMULATE_FAILURE_DELAY_MS = 4000;

export const deadLetterKeys = {
  all: ["notificationDeadLetter"] as const,

  list: (filters: NotificationDeadLetterFiltersType, page: number, size: number, sorting: Sorting) =>
    ["notificationDeadLetter", "list", filters, page, size, sorting] as const,

  stats: ["notificationDeadLetter", "stats"] as const,
};

export function useDeadLetters({ filters, page, size, sorting }: QueryParamsType<NotificationDeadLetterFiltersType>) {
  return useQuery({
    queryKey: deadLetterKeys.list(filters, page, size, sorting),
    queryFn: () => searchDeadLetters(filters, page, size, sorting),
  });
}

export function useDeadLetterStats() {
  return useQuery({
    queryKey: deadLetterKeys.stats,
    queryFn: findDeadLetterStats,
  });
}

export function useResolveDeadLetter() {
  return useApiMutation<NotificationDeadLetterType, IdentifierType>({
    mutationFn: resolveDeadLetter,
    invalidateQueries: [deadLetterKeys.all],
    successMessage: "Registro marcado como resolvido",
  });
}

export function useSimulateNotificationFailure() {
  const queryClient = useQueryClient();

  return useApiMutation<void, void>({
    mutationFn: simulateNotificationFailure,
    successMessage: "Falha simulada disparada — deve aparecer na lista em alguns segundos",
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries({ queryKey: deadLetterKeys.all }), SIMULATE_FAILURE_DELAY_MS);
    },
  });
}

export function useSimulateEmailFailure() {
  const queryClient = useQueryClient();

  return useApiMutation<void, void>({
    mutationFn: simulateEmailFailure,
    successMessage: "Falha simulada disparada — deve aparecer na lista em alguns segundos",
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries({ queryKey: deadLetterKeys.all }), SIMULATE_FAILURE_DELAY_MS);
    },
  });
}
