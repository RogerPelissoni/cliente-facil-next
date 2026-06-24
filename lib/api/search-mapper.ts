import { Sorting } from "@/shared/types/table.types";
import { SearchRequest } from "./search-request";

export function makeSearchRequest<TFilter extends Record<string, any>>(
  filters: TFilter,
  page: number,
  size: number,
  sorting: Sorting,
): SearchRequest {
  return {
    page,
    size,

    sorts: [
      {
        field: sorting.field,
        direction: sorting.direction === "asc" ? "ASC" : "DESC",
      },
    ],

    filters: Object.entries(filters)
      .filter(([, value]) => value !== "" && value != null)
      .map(([field, value]) => ({
        field,
        operator: "LIKE",
        value: String(value),
      })),
  };
}
