import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

// Troca o JWT (só acessível aqui, no servidor, via cookie httpOnly) por um "ws-ticket": um
// token efêmero (30s) e de uso único, emitido pelo backend especificamente para autenticar a
// conexão STOMP. Assim o JS do navegador nunca tem acesso ao JWT de verdade (que vale 24h) —
// só a esse ticket de vida curtíssima, que já nasce consumido após o primeiro CONNECT.
export async function GET() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const response = await fetch(`${API_URL}/auth/ws-ticket`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Failed to issue ws ticket" }, { status: response.status });
  }

  const data: { ticket: string } = await response.json();

  return NextResponse.json({ ticket: data.ticket });
}
