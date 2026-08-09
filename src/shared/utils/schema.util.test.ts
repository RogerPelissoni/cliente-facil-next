import { describe, expect, it } from "vitest";
import {
  toFormIdentifier,
  toOptionalFormIdentifier,
  zDate,
  zEnum,
  zIdentifier,
  zOptionalIdentifier,
  zString,
} from "./schema.util";

// Estes builders são reutilizados por todos os *.schema.ts do projeto (17 módulos hoje) — um bug
// aqui quebra validação em cascata em todo formulário do sistema. Testar os builders cobre todos os
// usos sem precisar de um teste por schema (mesmo raciocínio do teste genérico de templates de
// e-mail no backend).

describe("zIdentifier", () => {
  it("aceita string não vazia", () => {
    expect(zIdentifier().parse("abc")).toBe("abc");
  });

  it("remove espaços nas pontas", () => {
    expect(zIdentifier().parse("  abc  ")).toBe("abc");
  });

  it("rejeita string vazia com a mensagem padrão", () => {
    const result = zIdentifier().safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Campo obrigatório");
  });

  it("rejeita string só com espaços", () => {
    expect(zIdentifier().safeParse("   ").success).toBe(false);
  });

  it("aceita mensagem customizada", () => {
    const result = zIdentifier("Informe o nome").safeParse("");
    expect(result.error?.issues[0].message).toBe("Informe o nome");
  });
});

describe("zOptionalIdentifier", () => {
  it("aceita string vazia e undefined", () => {
    expect(zOptionalIdentifier().parse("")).toBe("");
    expect(zOptionalIdentifier().parse(undefined)).toBeUndefined();
  });
});

describe("zString", () => {
  it("respeita o tamanho mínimo customizado", () => {
    const schema = zString("Mínimo 3 caracteres", 3);
    expect(schema.safeParse("ab").success).toBe(false);
    expect(schema.parse("abc")).toBe("abc");
  });
});

describe("zEnum", () => {
  const StatusEnum = { ACTIVE: "ACTIVE", INACTIVE: "INACTIVE" } as const;

  it("aceita uma chave válida do enum", () => {
    expect(zEnum(StatusEnum).parse("ACTIVE")).toBe("ACTIVE");
  });

  it("rejeita string vazia (placeholder de select não escolhido)", () => {
    const result = zEnum(StatusEnum).safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Campo obrigatório");
  });

  it("rejeita valor fora do enum", () => {
    expect(zEnum(StatusEnum).safeParse("SOMETHING_ELSE").success).toBe(false);
  });
});

describe("zDate", () => {
  it("aceita um Date válido", () => {
    const date = new Date("2026-01-01T00:00:00Z");
    expect(zDate().parse(date)).toBe(date);
  });

  it("rejeita undefined com a mensagem de campo obrigatório", () => {
    const result = zDate().safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Campo obrigatório");
  });

  it("rejeita valores que não são Date nem undefined", () => {
    expect(zDate().safeParse("2026-01-01").success).toBe(false);
  });
});

describe("toFormIdentifier", () => {
  it("converte null/undefined em string vazia", () => {
    expect(toFormIdentifier(null)).toBe("");
    expect(toFormIdentifier(undefined)).toBe("");
  });

  it("converte número em string", () => {
    expect(toFormIdentifier(42)).toBe("42");
  });
});

describe("toOptionalFormIdentifier", () => {
  it("converte null, undefined e string vazia em undefined", () => {
    expect(toOptionalFormIdentifier(null)).toBeUndefined();
    expect(toOptionalFormIdentifier(undefined)).toBeUndefined();
    expect(toOptionalFormIdentifier("")).toBeUndefined();
  });

  it("converte valor presente em string", () => {
    expect(toOptionalFormIdentifier(42)).toBe("42");
  });
});
