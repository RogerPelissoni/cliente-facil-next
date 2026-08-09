import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("access_token", "", {
    httpOnly: true,
    // NODE_ENV, não ENV — a mesma variável que api/login/route.ts usa pra setar o cookie. ENV nunca é
    // definida em lugar nenhum do projeto, então essa condição sempre avaliava false, mesmo em
    // produção (achado ao levantar as env vars reais do projeto pro .env.example).
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // remove o cookie
  });

  return response;
}
