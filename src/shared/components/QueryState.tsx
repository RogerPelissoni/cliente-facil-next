"use client";

import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

import { ErrorState } from "./ErrorState";
import { Loading } from "./Loading";

interface Props<TData = unknown, TError = Error> {
  query: Pick<UseQueryResult<TData, TError>, "isPending" | "error" | "refetch">;
  children: ReactNode;
}

export function QueryState<TData = unknown, TError = Error>({ query, children }: Props<TData, TError>) {
  if (query.isPending) {
    return <Loading />;
  }

  if (query.error) {
    return <ErrorState onRetry={() => void query.refetch()} />;
  }

  return <>{children}</>;
}
