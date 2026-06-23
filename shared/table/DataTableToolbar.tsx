import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function DataTableToolbar({ children }: Props) {
  return <div className="mb-6 rounded-lg border p-4">{children}</div>;
}
