import { PageResponse } from "@/src/shared/types/api.type";
import { FilterRequest, SearchRequest } from "@/src/shared/types/form.type";
import { IdentifierType } from "@/src/shared/types/form.type";
import { Sorting } from "@/src/shared/types/table.type";
import { api } from "@/src/shared/utils/http.util";
import { NotificationDeadLetterFiltersType, NotificationDeadLetterStatsType, NotificationDeadLetterType } from "./notificationDeadLetter.types";

const RESOURCE = "/notifications/dead-letters";

// Bespoke em vez de createCrudApi: o toggle de status precisa de IS_NULL/IS_NOT_NULL, que o
// makeSearchRequest genérico (sempre LIKE) não suporta.
function buildFilters(filters: NotificationDeadLetterFiltersType): FilterRequest[] {
  const requests: FilterRequest[] = [];

  if (filters.dsErrorReason) {
    requests.push({ field: "dsErrorReason", operator: "CONTAINS", value: filters.dsErrorReason });
  }

  if (filters.status === "PENDING") {
    requests.push({ field: "dtResolved", operator: "IS_NULL" });
  } else if (filters.status === "RESOLVED") {
    requests.push({ field: "dtResolved", operator: "IS_NOT_NULL" });
  }

  return requests;
}

export function searchDeadLetters(filters: NotificationDeadLetterFiltersType, page: number, size: number, sorting: Sorting) {
  const request: SearchRequest = {
    page,
    size,
    sorts: [{ field: sorting.field, direction: sorting.direction === "asc" ? "ASC" : "DESC" }],
    filters: buildFilters(filters),
  };

  return api.post<PageResponse<NotificationDeadLetterType>>(`${RESOURCE}/search`, request);
}

export function findDeadLetterStats() {
  return api.get<NotificationDeadLetterStatsType>(`${RESOURCE}/stats`);
}

export function resolveDeadLetter(id: IdentifierType) {
  return api.patch<NotificationDeadLetterType>(`${RESOURCE}/${id}/resolve`);
}
