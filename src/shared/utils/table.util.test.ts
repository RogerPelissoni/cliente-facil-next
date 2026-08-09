import { describe, expect, it } from "vitest";
import { nextSorting } from "./table.util";

describe("nextSorting", () => {
  it("inverte a direção ao clicar de novo na mesma coluna", () => {
    expect(nextSorting({ field: "name", direction: "asc" }, "name")).toEqual({
      field: "name",
      direction: "desc",
    });

    expect(nextSorting({ field: "name", direction: "desc" }, "name")).toEqual({
      field: "name",
      direction: "asc",
    });
  });

  it("reinicia em 'asc' ao trocar de coluna", () => {
    expect(nextSorting({ field: "name", direction: "desc" }, "email")).toEqual({
      field: "email",
      direction: "asc",
    });
  });
});
