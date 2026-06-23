"use client";

import { DataTable } from "@/shared/table/DataTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { userColumns } from "./user.columns";
import { User } from "./user.types";

interface Props {
  data: User[];
}

export function UserTable({ data }: Props) {
  const table = useReactTable({
    data,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} />;
}
