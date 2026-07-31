import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Expõe o JWT (normalmente só acessível server-side, em cookie httpOnly) para o cliente
// STOMP autenticar o frame CONNECT — a API nativa de WebSocket do navegador não permite
// enviar esse token como header no handshake HTTP, então o cliente STOMP precisa dele em mãos
// para mandar como header do CONNECT (ver StompProvider e StompAuthChannelInterceptor no backend).
export async function GET() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ token });
}
