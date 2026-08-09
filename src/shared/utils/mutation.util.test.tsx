import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useApiMutation } from "./mutation.util";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

function wrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useApiMutation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    // sem retry aqui: o wiring de sucesso/erro do hook é o alvo, não o retry do react-query em si.
    queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  });

  it("no sucesso: mostra toast de sucesso, invalida as queries informadas e chama onSuccess", async () => {
    const onSuccess = vi.fn();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(
      () =>
        useApiMutation<{ id: number }, { name: string }>({
          mutationFn: async (vars) => ({ id: 1, ...vars }) as unknown as { id: number },
          successMessage: "Usuário criado",
          invalidateQueries: [["users"]],
          onSuccess,
        }),
      { wrapper: wrapper(queryClient) },
    );

    result.current.mutate({ name: "Roger" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(toast.success).toHaveBeenCalledWith("Usuário criado");
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["users"] });
    expect(onSuccess).toHaveBeenCalledWith({ id: 1, name: "Roger" });
  });

  it("usa a mensagem de sucesso padrão quando nenhuma é informada", async () => {
    const { result } = renderHook(
      () => useApiMutation({ mutationFn: async () => "ok" }),
      { wrapper: wrapper(queryClient) },
    );

    result.current.mutate(undefined);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(toast.success).toHaveBeenCalledWith("Operação efetuada com sucesso");
  });

  it("no erro: mostra a mensagem do erro lançado e chama onError", async () => {
    const onError = vi.fn();

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn: async () => {
            throw new Error("E-mail já cadastrado");
          },
          onError,
        }),
      { wrapper: wrapper(queryClient) },
    );

    result.current.mutate(undefined);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(toast.error).toHaveBeenCalledWith("E-mail já cadastrado");
    expect(onError).toHaveBeenCalled();
  });

  it("não invalida nenhuma query quando invalidateQueries não é informado", async () => {
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useApiMutation({ mutationFn: async () => "ok" }), {
      wrapper: wrapper(queryClient),
    });

    result.current.mutate(undefined);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
