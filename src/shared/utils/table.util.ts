import { Sorting } from "../types/table.type";

export function nextSorting(current: Sorting, field: string): Sorting {
  if (current.field === field) {
    return {
      field,
      direction: current.direction === "asc" ? "desc" : "asc",
    };
  }

  return {
    field,
    direction: "asc",
  };
}
