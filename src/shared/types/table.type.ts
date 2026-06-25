export type SortDirection = "asc" | "desc";

export interface Sorting {
    field: string;
    direction: SortDirection;
}