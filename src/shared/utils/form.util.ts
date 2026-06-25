import { SearchRequest } from "../types/form.type";
import { Sorting } from "../types/table.type";

export const GRID_SIZE = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
} as const;

export type GridSize = keyof typeof GRID_SIZE;

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
