import { Sorting } from "./table.type";

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type QueryParamsType<TFilters> = {
  filters: TFilters;
  page: number;
  size: number;
  sorting: Sorting;
};
