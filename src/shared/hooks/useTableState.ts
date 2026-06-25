import { useCallback, useState } from "react";

import { Sorting } from "../types/table.type";
import { useDebounce } from "./useDebounce";

interface UseTableStateProps<TFilters> {
  filters: TFilters;
  sorting: Sorting;
  page?: number;
  size?: number;
  debounce?: number;
}

export interface UseTableStateReturn<TFilters> {
  page: number;
  size: number;
  filters: TFilters;
  debouncedFilters: TFilters;
  sorting: Sorting;

  setPage(page: number): void;
  changeFilters(filters: TFilters): void;
  changeSorting(sorting: Sorting): void;
  changePageSize(size: number): void;
}

export function useTableState<TFilters>({
  filters: initialFilters,
  sorting: initialSorting,
  page: initialPage = 0,
  size: initialSize = 10,
  debounce = 500,
}: UseTableStateProps<TFilters>): UseTableStateReturn<TFilters> {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [filters, setFilters] = useState(initialFilters);
  const [sorting, setSorting] = useState(initialSorting);

  const debouncedFilters = useDebounce(filters, debounce);

  const changeFilters = useCallback((filters: TFilters) => {
    setFilters(filters);
    setPage(0);
  }, []);

  const changeSorting = useCallback((sorting: Sorting) => {
    setSorting(sorting);
    setPage(0);
  }, []);

  const changePageSize = useCallback((size: number) => {
    setSize(size);
    setPage(0);
  }, []);

  return {
    page,
    size,
    filters,
    debouncedFilters,
    sorting,

    setPage,
    changeFilters,
    changeSorting,
    changePageSize,
  };
}
