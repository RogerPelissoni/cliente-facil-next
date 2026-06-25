"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function TableActions({ children }: Props) {
  return <div className="flex gap-2">{children}</div>;
}
