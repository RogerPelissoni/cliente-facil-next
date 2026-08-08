import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await fetch(`${process.env.API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      const json = await result.json().catch(() => null);

      return NextResponse.json(
        { error: json?.message ?? json?.error ?? "Não foi possível redefinir a senha." },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Não foi possível redefinir a senha." },
      { status: 500 },
    );
  }
}
