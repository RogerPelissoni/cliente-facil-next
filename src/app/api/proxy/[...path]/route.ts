import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

async function proxy(req: NextRequest, method: string) {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Not authenticated",
      },
      {
        status: 401,
      },
    );
  }

  const path = req.nextUrl.pathname.replace("/api/proxy", "");

  const url = new URL(`${API_URL}${path}`);

  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const headers = new Headers();

  headers.set("Authorization", `Bearer ${token}`);

  const contentType = req.headers.get("content-type");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  let body: BodyInit | undefined;

  if (method !== "GET" && method !== "DELETE") {
    body = await req.blob();
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const responseContentType = response.headers.get("content-type") ?? "";

  // Respostas com esses status não podem ter body (nem vazio) — o construtor de Response lança
  // "Invalid response status code" se tentarmos passar um ArrayBuffer, mesmo vazio, junto com elas.
  const isNullBodyStatus = [204, 205, 304].includes(response.status);

  const responseBody = isNullBodyStatus ? null : await response.arrayBuffer();

  return new NextResponse(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": responseContentType,
    },
  });
}

export async function GET(req: NextRequest) {
  return proxy(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxy(req, "POST");
}

export async function PUT(req: NextRequest) {
  return proxy(req, "PUT");
}

export async function PATCH(req: NextRequest) {
  return proxy(req, "PATCH");
}

export async function DELETE(req: NextRequest) {
  return proxy(req, "DELETE");
}
