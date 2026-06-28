"use client";

import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

import { ErrorState } from "./ErrorState";
import { Loading } from "./Loading";

interface Props<TData = unknown, TError = Error> {
  query: Pick<UseQueryResult<TData, TError>, "isPending" | "error" | "refetch">;
  loadingMessage?: string;
  children: ReactNode;
}

export function QueryState<TData = unknown, TError = Error>({ query, loadingMessage, children }: Props<TData, TError>) {
  if (query.isPending) {
    return <Loading message={loadingMessage} />;
  }

  if (query.error) {
    return <ErrorState onRetry={() => void query.refetch()} />;
  }

  return <>{children}</>;
}
