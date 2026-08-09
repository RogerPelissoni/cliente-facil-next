import { describe, expect, it } from "vitest";
import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("aceita e-mail e senha válidos", () => {
    const result = loginSchema.safeParse({ email: "roger@example.com", password: "123456" });
    expect(result.success).toBe(true);
  });

  it("rejeita e-mail em formato inválido", () => {
    const result = loginSchema.safeParse({ email: "não-é-email", password: "123456" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["email"]);
  });

  it("rejeita quando falta o e-mail", () => {
    const result = loginSchema.safeParse({ password: "123456" });
    expect(result.success).toBe(false);
  });
});
