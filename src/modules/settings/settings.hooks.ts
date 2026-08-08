import { useApiMutation } from "@/src/shared/utils/mutation.util";
import { changePassword } from "./settings.api";

// Sem invalidateQueries: trocar a senha não altera nenhuma query em cache (o usuário continua
// logado com o mesmo token até expirar).
export function useChangePassword() {
  return useApiMutation({
    mutationFn: changePassword,
    successMessage: "Senha alterada com sucesso",
  });
}
