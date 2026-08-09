import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { makeSearchRequest, parseSubmit, resetForm } from "./form.util";

describe("makeSearchRequest", () => {
  it("mapeia sorting 'asc'/'desc' para 'ASC'/'DESC' esperado pelo backend", () => {
    const request = makeSearchRequest({}, 0, 10, { field: "name", direction: "asc" });
    expect(request.sorts).toEqual([{ field: "name", direction: "ASC" }]);

    const desc = makeSearchRequest({}, 0, 10, { field: "name", direction: "desc" });
    expect(desc.sorts).toEqual([{ field: "name", direction: "DESC" }]);
  });

  it("repassa page e size sem transformação", () => {
    const request = makeSearchRequest({}, 2, 25, { field: "name", direction: "asc" });
    expect(request.page).toBe(2);
    expect(request.size).toBe(25);
  });

  it("descarta filtros vazios ('' e null/undefined), mantendo os preenchidos", () => {
    const request = makeSearchRequest(
      { name: "Roger", email: "", document: null, active: undefined, age: 0 },
      0,
      10,
      { field: "name", direction: "asc" },
    );

    // age: 0 é um valor "presente" (só '' e null/undefined são descartados) — 0 sobrevive ao filtro.
    expect(request.filters).toEqual([
      { field: "name", operator: "LIKE", value: "Roger" },
      { field: "age", operator: "LIKE", value: "0" },
    ]);
  });

  it("converte valores não-string (número/boolean) para string via String()", () => {
    const request = makeSearchRequest({ active: true, count: 5 }, 0, 10, {
      field: "name",
      direction: "asc",
    });

    expect(request.filters).toEqual(
      expect.arrayContaining([
        { field: "active", operator: "LIKE", value: "true" },
        { field: "count", operator: "LIKE", value: "5" },
      ]),
    );
  });
});

describe("parseSubmit", () => {
  const schema = z.object({ name: z.string().trim().min(1) });

  it("valida com o schema e repassa o resultado parseado pro onSubmit", () => {
    const onSubmit = vi.fn();
    const handler = parseSubmit(schema, onSubmit);

    handler({ name: "  Roger  " });

    expect(onSubmit).toHaveBeenCalledWith({ name: "Roger" });
  });

  it("lança se os dados não passarem no schema", () => {
    const handler = parseSubmit(schema, vi.fn());

    expect(() => handler({ name: "" })).toThrow();
  });
});

describe("resetForm", () => {
  function fakeForm() {
    return { reset: vi.fn() } as unknown as UseFormReturn<{ name: string }>;
  }

  it("reseta com os dados mapeados quando id e data existem (modo edição)", () => {
    const form = fakeForm();
    const mapToForm = vi.fn().mockReturnValue({ name: "mapeado" });

    resetForm({
      form,
      id: 1,
      data: { name: "original" },
      defaultValues: { name: "" },
      mapToForm,
    });

    expect(mapToForm).toHaveBeenCalledWith({ name: "original" });
    expect(form.reset).toHaveBeenCalledWith({ name: "mapeado" });
  });

  it("reseta com defaultValues quando não há id (modo criação)", () => {
    const form = fakeForm();
    const mapToForm = vi.fn();

    resetForm({
      form,
      id: undefined,
      data: { name: "original" },
      defaultValues: { name: "" },
      mapToForm,
    });

    expect(mapToForm).not.toHaveBeenCalled();
    expect(form.reset).toHaveBeenCalledWith({ name: "" });
  });

  it("reseta com defaultValues quando há id mas data ainda não chegou (loading)", () => {
    const form = fakeForm();

    resetForm({
      form,
      id: 1,
      data: undefined,
      defaultValues: { name: "" },
      mapToForm: vi.fn(),
    });

    expect(form.reset).toHaveBeenCalledWith({ name: "" });
  });
});
