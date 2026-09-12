"use client";

import { UseQueryResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

import { ErrorState } from "./ErrorState";
import { Loading } from "./Loading";

interface Props<TData = unknown, TError = Error> {
  query: Pick<
    UseQueryResult<TData, TError>,
    "isLoading" | "isFetching" | "error" | "refetch"
  >;
  loadingMessage?: string;
  children: ReactNode;
}

export function QueryState<TData = unknown, TError = Error>({
  query,
  loadingMessage,
  children,
}: Props<TData, TError>) {
  if (query.isLoading) {
    return <Loading message={loadingMessage} />;
  }

  if (query.error) {
    return <ErrorState onRetry={() => void query.refetch()} />;
  }

  return (
    <div className="relative">
      {children}

      {query.isFetching && (
        <div className="bg-background/60 absolute inset-0 z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
