import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTableState } from "./useTableState";

describe("useTableState", () => {
  function setup() {
    return renderHook(() =>
      useTableState<{ name: string }>({
        filters: { name: "" },
        sorting: { field: "name", direction: "asc" },
      }),
    );
  }

  it("começa na página 0 com o tamanho padrão (10)", () => {
    const { result } = setup();
    expect(result.current.page).toBe(0);
    expect(result.current.size).toBe(10);
  });

  it("setPage muda só a página", () => {
    const { result } = setup();

    act(() => result.current.setPage(3));
    expect(result.current.page).toBe(3);
  });

  it("changeFilters atualiza os filtros e volta pra página 0", () => {
    const { result } = setup();

    act(() => result.current.setPage(3));
    act(() => result.current.changeFilters({ name: "Roger" }));

    expect(result.current.filters).toEqual({ name: "Roger" });
    expect(result.current.page).toBe(0);
  });

  it("changeSorting atualiza a ordenação e volta pra página 0", () => {
    const { result } = setup();

    act(() => result.current.setPage(2));
    act(() => result.current.changeSorting({ field: "email", direction: "desc" }));

    expect(result.current.sorting).toEqual({ field: "email", direction: "desc" });
    expect(result.current.page).toBe(0);
  });

  it("changePageSize atualiza o tamanho e volta pra página 0", () => {
    const { result } = setup();

    act(() => result.current.setPage(2));
    act(() => result.current.changePageSize(50));

    expect(result.current.size).toBe(50);
    expect(result.current.page).toBe(0);
  });
});
