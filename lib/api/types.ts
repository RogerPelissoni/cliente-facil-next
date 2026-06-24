export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
}

export interface ApiClient {
  get<T>(url: string, options?: Omit<RequestOptions, "body">): Promise<T>;

  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>;

  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>;

  patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>;

  delete<T>(url: string, options?: RequestOptions): Promise<T>;
}
