import { NextRequest, NextResponse } from "next/server";

// Sempre públicas, estando ou não autenticado — diferente do /auth/login (que redireciona pra
// dashboard se já tiver sessão), confirmar e-mail ou redefinir senha precisam continuar acessíveis
// mesmo com uma sessão ativa (ex: confirmar/redefinir a senha de outra conta no mesmo navegador, ou
// só o cookie de um login antigo ainda não ter expirado).
const ALWAYS_PUBLIC_PREFIXES = ["/auth/forgot-password", "/auth/reset-password", "/auth/confirm-email"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const pathname = req.nextUrl.pathname;

  if (ALWAYS_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const isAuthRoute = pathname.startsWith("/auth/login");

  // Usuário não autenticado → manda para login
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const isDashboardPath = pathname.indexOf("dashboard") !== -1;

  // Usuário logado tentando acessar login ou raiz → manda para dashboard
  if (token && !isDashboardPath) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|public|api).*)"],
};
