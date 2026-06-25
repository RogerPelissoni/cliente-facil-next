import axios from "axios";
import { ApiClient, HttpMethod, RequestOptions } from "../types/http.type";
import { ApiError } from "./error.util";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function buildQuery(params?: Record<string, unknown>) {
  if (!params) {
    return "";
  }

  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });

  const query = search.toString();

  return query ? `?${query}` : "";
}

function isFormData(value: unknown): value is FormData {
  return value instanceof FormData;
}

async function request<T>(method: HttpMethod, path: string, options?: RequestOptions): Promise<T> {
  const headers = new Headers(options?.headers);

  let body: BodyInit | undefined;

  if (options?.body !== undefined) {
    if (isFormData(options.body)) {
      body = options.body;
    } else {
      headers.set("Content-Type", "application/json");

      body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(`/api/proxy${path}${buildQuery(options?.params)}`, {
    method,
    credentials: "include",
    headers,
    body,
    cache: options?.cache ?? "no-store",
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      data?.message ??
      data?.error ??
      (Array.isArray(data?.errors) ? data.errors.join("\n") : "Erro ao realizar requisição.");

    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

export const api: ApiClient = {
  get: (url, options) => request("GET", url, options),

  post: (url, body, options) =>
    request("POST", url, {
      ...options,
      body,
    }),

  put: (url, body, options) =>
    request("PUT", url, {
      ...options,
      body,
    }),

  patch: (url, body, options) =>
    request("PATCH", url, {
      ...options,
      body,
    }),

  delete: (url, options) => request("DELETE", url, options),
};
