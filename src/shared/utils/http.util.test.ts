import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "./http.util";
import { ApiError } from "./error.util";

// A única porta de saída HTTP do app inteiro (todo módulo passa por `api`, que por sua vez só fala
// com `/api/proxy/*`, nunca direto com o backend — ver docs/ARCHITECTURE.md). Cobre a montagem de
// querystring, corpo JSON x FormData e a extração de mensagem de erro do payload do backend.

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => "application/json" },
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  } as unknown as Response;
}

function textResponse(status: number, body: string) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => "text/plain" },
    json: () => Promise.reject(new Error("not json")),
    text: () => Promise.resolve(body),
  } as unknown as Response;
}

describe("api client (http.util)", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, { ok: true }));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("chama sempre através do proxy same-origin, nunca o backend direto", async () => {
    await api.get("/users");

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/proxy/users");
  });

  it("monta a querystring a partir de params, ignorando null/undefined", async () => {
    await api.get("/users", { params: { name: "Roger", active: undefined, page: 0 } });

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/proxy/users?name=Roger&page=0");
  });

  it("GET não envia querystring quando não há params", async () => {
    await api.get("/users");

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/proxy/users");
  });

  it("serializa body de objeto como JSON e seta o content-type", async () => {
    await api.post("/users", { name: "Roger" });

    const [, init] = fetchMock.mock.calls[0];
    const headers = init.headers as Headers;

    expect(headers.get("Content-Type")).toBe("application/json");
    expect(init.body).toBe(JSON.stringify({ name: "Roger" }));
  });

  it("não força content-type nem serializa quando o body é FormData", async () => {
    const formData = new FormData();
    formData.append("file", "conteudo");

    await api.post("/upload", formData);

    const [, init] = fetchMock.mock.calls[0];
    const headers = init.headers as Headers;

    expect(headers.get("Content-Type")).toBeNull();
    expect(init.body).toBe(formData);
  });

  it("sempre manda credentials 'include' (cookie httpOnly do proxy)", async () => {
    await api.get("/users");

    const [, init] = fetchMock.mock.calls[0];
    expect(init.cache).toBe("no-store");
    expect((init as RequestInit).credentials).toBe("include");
  });

  it("respeita cache explícito quando informado", async () => {
    await api.get("/users", { cache: "force-cache" });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.cache).toBe("force-cache");
  });

  it("retorna o corpo já parseado quando a resposta é ok", async () => {
    fetchMock.mockResolvedValue(jsonResponse(200, { id: 1, name: "Roger" }));

    const result = await api.get<{ id: number; name: string }>("/users/1");

    expect(result).toEqual({ id: 1, name: "Roger" });
  });

  it("retorna texto puro quando a resposta não é JSON", async () => {
    fetchMock.mockResolvedValue(textResponse(200, "pong"));

    const result = await api.get("/health");

    expect(result).toBe("pong");
  });

  it("lança ApiError com a mensagem de `message` do backend quando a resposta falha", async () => {
    fetchMock.mockResolvedValue(jsonResponse(400, { message: "E-mail já cadastrado" }));

    await expect(api.post("/users", { email: "a@a.com" })).rejects.toMatchObject({
      status: 400,
      message: "E-mail já cadastrado",
    });
  });

  it("cai para `error` quando não há `message` no payload", async () => {
    fetchMock.mockResolvedValue(jsonResponse(403, { error: "Acesso negado" }));

    await expect(api.get("/admin")).rejects.toMatchObject({
      status: 403,
      message: "Acesso negado",
    });
  });

  it("junta `errors[]` (validação de campo) numa mensagem só quando não há message/error", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(422, { errors: ["nome é obrigatório", "e-mail inválido"] }),
    );

    await expect(api.post("/users", {})).rejects.toMatchObject({
      status: 422,
      message: "nome é obrigatório\ne-mail inválido",
    });
  });

  it("usa mensagem genérica quando o payload de erro não tem nada reconhecível", async () => {
    fetchMock.mockResolvedValue(jsonResponse(500, {}));

    await expect(api.get("/boom")).rejects.toMatchObject({
      status: 500,
      message: "Erro ao realizar requisição.",
    });

    // e o erro lançado é mesmo um ApiError, não um Error genérico — quem chama pode checar `.status`.
    try {
      await api.get("/boom");
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
});
