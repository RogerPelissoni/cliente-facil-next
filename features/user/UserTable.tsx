"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/shared/table/DataTable";

import { User } from "./user.types";

interface Props {
  data: User[];

  onEdit(user: User): void;

  onDelete(user: User): void;
}

export function UserTable({ data, onEdit, onDelete }: Props) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "Código",
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "Ações",

      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex gap-2">
            <button onClick={() => onEdit(user)}>Editar</button>

            <button onClick={() => onDelete(user)}>Excluir</button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} />;
}
