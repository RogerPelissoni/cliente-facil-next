import { QueryParamsType } from "@/src/shared/types/api.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { useQuery } from "@tanstack/react-query";
import { findDeadLetterStats, resolveDeadLetter, searchDeadLetters } from "./notificationDeadLetter.api";
import { NotificationDeadLetterFiltersType, NotificationDeadLetterType } from "./notificationDeadLetter.types";

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
