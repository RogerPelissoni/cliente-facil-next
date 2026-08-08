import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await result.json().catch(() => null);
    const token = json?.token;

    if (!token) {
      return NextResponse.json(
        { error: json?.message ?? json?.error ?? "Não foi possível entrar." },
        { status: result.status !== 200 ? result.status : 400 },
      );
    }

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Login failed" },
      { status: 500 },
    );
  }
}
